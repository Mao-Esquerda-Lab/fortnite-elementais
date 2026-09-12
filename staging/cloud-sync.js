// Login/senha opcional para sincronizar a coleção entre aparelhos, via
// Firebase Authentication (e-mail/senha) + Firestore. Único arquivo que
// conhece o Firebase: fala com app.js só por dois canais — o evento
// "spriteslocker:data-changed" (disparado a cada save local) e o objeto
// window.SpritesLockerBridge (exposto no fim de app.js). Removendo este
// arquivo, o app volta a ser 100% local, sem nenhuma outra mudança.
//
// Sem window.FIREBASE_CONFIG preenchido (ver firebase-config.js), nem chega
// a importar o SDK do Firebase — o botão "Conta" só mostra um aviso.

const SDK_VERSION = "12.19.0";
const SDK_BASE = `https://www.gstatic.com/firebasejs/${SDK_VERSION}`;
const LAST_SYNCED_UID_KEY = "fortnite-sprites-last-synced-uid";

// Campos do snapshot sincronizado (ver backupSnapshot() em app.js). Usado com
// setDoc(..., { mergeFields }) em vez de um merge:true genérico: "codes" tem
// remoção de chave de verdade quando o usuário desmarca um código resgatado,
// e um merge:true recursivo do Firestore mantém chaves ausentes do payload
// novo em vez de apagá-las — o código desmarcado "voltaria" sozinho no
// próximo download. mergeFields troca essas chaves por inteiro (igual a hoje)
// e deixa `friendCode` (e o que mais vier depois) intocado.
const SYNC_FIELDS = ["app", "v", "exportedAt", "collection", "codes", "customCodes"];

// Sem 0/O, 1/I/L — evita confusão ao digitar um código à mão.
const FRIEND_CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const FRIEND_CODE_LENGTH = 7;

function isFirebaseConfigured() {
  const cfg = window.FIREBASE_CONFIG;
  if (!cfg) return false;
  return [
    "apiKey",
    "authDomain",
    "projectId",
    "storageBucket",
    "messagingSenderId",
    "appId",
  ].every(
    (key) => typeof cfg[key] === "string" && cfg[key] && !cfg[key].startsWith("PASTE_")
  );
}

const lastSyncedUid = {
  get() {
    try {
      return localStorage.getItem(LAST_SYNCED_UID_KEY);
    } catch {
      return null;
    }
  },
  set(uid) {
    try {
      localStorage.setItem(LAST_SYNCED_UID_KEY, uid);
    } catch {
      /* sem persistência */
    }
  },
};

const AUTH_ERROR_KEYS = {
  "auth/wrong-password": "accountErrorWrongPassword",
  "auth/user-not-found": "accountErrorWrongPassword",
  "auth/invalid-credential": "accountErrorWrongPassword",
  "auth/email-already-in-use": "accountErrorEmailInUse",
  "auth/invalid-email": "accountErrorInvalidEmail",
  "auth/weak-password": "accountErrorWeakPassword",
  "auth/too-many-requests": "accountErrorTooMany",
  "auth/network-request-failed": "accountErrorNetwork",
  // Provedor Email/Password ainda não habilitado em Authentication → Sign-in
  // method no console do Firebase.
  "auth/operation-not-allowed": "accountErrorAuthDisabled",
  "permission-denied": "accountErrorPermission",
};

function authErrorMessage(bridge, error) {
  const code = error && error.code;
  // Sem isso, um código que ainda não mapeamos vira só "não deu certo",
  // sem pista nenhuma de por quê — o console é o único lugar que mostra o
  // código de verdade que o Firebase devolveu.
  console.error("[cloud-sync]", code || error);
  const key = AUTH_ERROR_KEYS[code] || "accountErrorGeneric";
  return bridge.t()[key];
}

// Cada item aqui é opcional na política (Authentication → Password policy no
// console) — só vira exigência de verdade quando a chave correspondente
// existe em `customStrengthOptions`. Uma tabela só, usada tanto pra montar a
// dica de requisitos quanto pra listar o que falta numa tentativa.
const PASSWORD_POLICY_CHECKS = [
  { key: "containsUppercaseLetter", labelKey: "accountPolicyUppercase" },
  { key: "containsLowercaseLetter", labelKey: "accountPolicyLowercase" },
  { key: "containsNumericCharacter", labelKey: "accountPolicyNumber" },
  { key: "containsNonAlphanumericCharacter", labelKey: "accountPolicySpecial" },
];

// Lista todos os requisitos da política (pra mostrar como dica, antes de o
// usuário digitar qualquer coisa).
function passwordRequirementLabels(bridge, customStrengthOptions) {
  const opts = customStrengthOptions || {};
  const s = bridge.t();
  const items = [];
  if (opts.minPasswordLength) items.push(s.accountPolicyMinLength(opts.minPasswordLength));
  PASSWORD_POLICY_CHECKS.forEach(({ key, labelKey }) => {
    if (opts[key]) items.push(s[labelKey]);
  });
  return items;
}

// Lista só o que uma senha específica não atende, a partir do resultado de
// `validatePassword()` — usada pra dizer exatamente o que falta.
function missingPasswordRequirements(bridge, status) {
  const opts = (status.passwordPolicy && status.passwordPolicy.customStrengthOptions) || {};
  const s = bridge.t();
  const items = [];
  if (opts.minPasswordLength && !status.meetsMinPasswordLength) {
    items.push(s.accountPolicyMinLength(opts.minPasswordLength));
  }
  PASSWORD_POLICY_CHECKS.forEach(({ key, labelKey }) => {
    if (opts[key] && !status[key]) items.push(s[labelKey]);
  });
  return items;
}

function randomFriendCode() {
  let code = "";
  for (let i = 0; i < FRIEND_CODE_LENGTH; i++) {
    code += FRIEND_CODE_ALPHABET[Math.floor(Math.random() * FRIEND_CODE_ALPHABET.length)];
  }
  return code;
}

// Nunca lança — devolve null pra qualquer coisa que não seja um código válido
// (formato errado, vazio, etc.), pra quem chama só precisar checar um `if`.
function normalizeFriendCode(rawInput) {
  const trimmed = (rawInput || "").trim().toUpperCase();
  if (trimmed.length !== FRIEND_CODE_LENGTH) return null;
  for (const ch of trimmed) {
    if (!FRIEND_CODE_ALPHABET.includes(ch)) return null;
  }
  return trimmed;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

async function main() {
  const bridge = window.SpritesLockerBridge;

  const els = {
    overlay: document.getElementById("account-overlay"),
    btn: document.getElementById("account-btn"),
    label: document.getElementById("account-label"),
    modalTitle: document.getElementById("account-title"),
    close: document.getElementById("account-close"),
    unconfiguredText: document.getElementById("account-unconfigured-text"),
    modeTabs: document.getElementById("account-mode-tabs"),
    tabLogin: document.getElementById("account-tab-login"),
    tabSignup: document.getElementById("account-tab-signup"),
    loginForm: document.getElementById("account-login-form"),
    loginEmailInput: document.getElementById("account-login-email-input"),
    loginPasswordInput: document.getElementById("account-login-password-input"),
    signupForm: document.getElementById("account-signup-form"),
    signupEmailInput: document.getElementById("account-signup-email-input"),
    signupUsernameInput: document.getElementById("account-signup-username-input"),
    signupPasswordInput: document.getElementById("account-signup-password-input"),
    passwordHint: document.getElementById("account-password-hint"),
    authError: document.getElementById("account-auth-error"),
    forgotLink: document.getElementById("account-forgot-link"),
    signedIn: document.getElementById("account-signed-in"),
    signedInEmail: document.getElementById("account-signed-in-email"),
    syncStatus: document.getElementById("account-sync-status"),
    accountUsernameDisplay: document.getElementById("account-username-display"),
    resyncBtn: document.getElementById("account-resync-btn"),
    logoutBtn: document.getElementById("account-logout-btn"),
    friendsTab: document.querySelector('#view-tabs [data-view="friends"]'),
    viewFriends: document.getElementById("view-friends"),
    friendsSection: document.getElementById("friends-section"),
    friendsSignedOutHint: document.getElementById("friends-signed-out-hint"),
    friendAddInput: document.getElementById("friend-add-input"),
    friendAddBtn: document.getElementById("friend-add-btn"),
    friendAddError: document.getElementById("friend-add-error"),
    friendList: document.getElementById("friend-list"),
    friendListEmpty: document.getElementById("friend-list-empty"),
    friendCodeBanner: document.getElementById("friend-code-banner"),
    friendCodeBannerValue: document.getElementById("friend-code-banner-value"),
    friendCodeBannerCopyBtn: document.getElementById("friend-code-banner-copy"),
    accountFriendCodeInput: document.getElementById("account-friend-code-input"),
    accountFriendCodeCopyBtn: document.getElementById("account-friend-code-copy-btn"),
  };

  function openModal() {
    els.overlay.hidden = false;
  }
  function closeModal() {
    els.overlay.hidden = true;
  }
  els.btn.addEventListener("click", openModal);
  els.close.addEventListener("click", closeModal);
  els.overlay.addEventListener("click", (e) => {
    if (e.target === els.overlay) closeModal();
  });

  let currentPanel = "unconfigured";
  let authMode = "login";

  function render() {
    els.unconfiguredText.hidden = currentPanel !== "unconfigured";
    els.modeTabs.hidden = currentPanel !== "signed-out";
    els.loginForm.hidden = !(currentPanel === "signed-out" && authMode === "login");
    els.signupForm.hidden = !(currentPanel === "signed-out" && authMode === "signup");
    els.signedIn.hidden = currentPanel !== "signed-in";
    els.tabLogin.classList.toggle("active", authMode === "login");
    els.tabSignup.classList.toggle("active", authMode === "signup");
  }

  function showPanel(name) {
    currentPanel = name;
    if (name === "signed-out") setAuthError("");
    render();
  }

  function setAuthMode(mode) {
    authMode = mode;
    setAuthError("");
    render();
  }
  els.tabLogin.addEventListener("click", () => setAuthMode("login"));
  els.tabSignup.addEventListener("click", () => setAuthMode("signup"));

  if (!isFirebaseConfigured()) {
    showPanel("unconfigured");
    return;
  }

  let authApi;
  let dbApi;
  let auth;
  let db;
  try {
    const [{ initializeApp }, authMod, dbMod] = await Promise.all([
      import(`${SDK_BASE}/firebase-app.js`),
      import(`${SDK_BASE}/firebase-auth.js`),
      import(`${SDK_BASE}/firebase-firestore.js`),
    ]);
    authApi = authMod;
    dbApi = dbMod;
    const app = initializeApp(window.FIREBASE_CONFIG);
    auth = authApi.getAuth(app);
    db = dbApi.getFirestore(app);
    // Já é o padrão do SDK num navegador comum, mas fica explícito de
    // propósito: garante a sessão sobrevivendo a fechar a aba/o navegador
    // mesmo que algum ambiente específico (extensão, build diferente do
    // SDK) tivesse um padrão menos persistente. Não resolve limitações do
    // próprio navegador (Safari apaga o IndexedDB de um site não visitado
    // há 7+ dias, e o modo anônimo/privado nunca persiste nada) — falha
    // silenciosa aqui só significa "login não sobrevive a fechar a aba
    // desta vez", nunca perda de progresso (o merge ao logar de novo cobre
    // isso).
    authApi
      .setPersistence(auth, authApi.browserLocalPersistence)
      .catch((err) => console.warn("[cloud-sync] não deu pra fixar a persistência do login:", err));
  } catch (err) {
    console.warn("[cloud-sync] Firebase indisponível:", err);
    showPanel("unconfigured");
    els.unconfiguredText.textContent = bridge.t().accountErrorNetwork;
    return;
  }

  showPanel("signed-out");

  // Lê a política de senha configurada no console (Authentication → Password
  // policy) direto do Firebase — nunca fica hardcoded aqui, então continua
  // válida se a política mudar sem precisar mexer no código. Passar uma
  // senha vazia só serve pra pegar a política de volta; `isValid` é
  // descartado (é claro que "" não é válida).
  let passwordPolicy = null;
  try {
    const probe = await authApi.validatePassword(auth, "");
    passwordPolicy = probe.passwordPolicy;
  } catch (err) {
    console.warn("[cloud-sync] não deu pra carregar a política de senha:", err);
  }

  function renderPasswordHint() {
    const enforced = passwordPolicy && passwordPolicy.enforcementState === "ENFORCE";
    els.passwordHint.hidden = !enforced;
    if (!enforced) return;
    const opts = passwordPolicy.customStrengthOptions || {};
    if (opts.minPasswordLength) els.signupPasswordInput.minLength = opts.minPasswordLength;
    els.passwordHint.textContent = bridge
      .t()
      .accountPasswordRequirements(passwordRequirementLabels(bridge, opts));
  }
  renderPasswordHint();

  let signedInUid = null;
  let pushTimer = null;
  let friendCode = null;
  let myUsername = null;
  // Definido só entre o submit do cadastro e o primeiro onAuthStateChanged
  // da conta nova — handleAuthChange() grava e limpa em seguida.
  let pendingUsername = null;
  let friendsCache = []; // [{ uid, code, username, mutual }]

  function schedulePush() {
    if (!signedInUid) return;
    const targetUid = signedInUid;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(async () => {
      // O login pode ter mudado de conta (ou saído) enquanto o debounce
      // esperava — nesse caso o push é descartado, nunca redirecionado.
      if (signedInUid !== targetUid) return;
      try {
        await dbApi.setDoc(dbApi.doc(db, "users", targetUid), bridge.getSnapshotJSON(), {
          mergeFields: SYNC_FIELDS,
        });
      } catch (err) {
        console.warn("[cloud-sync] falha ao sincronizar:", err);
      }
    }, 800);
  }
  window.addEventListener("spriteslocker:data-changed", schedulePush);

  function setAccountLabel(signedIn) {
    els.label.textContent = signedIn
      ? bridge.t().accountLabelSignedIn
      : bridge.t().accountLabelSignedOut;
    els.modalTitle.textContent = signedIn
      ? bridge.t().accountModalTitleSignedIn
      : bridge.t().accountModalTitleSignedOut;
  }

  function renderSignedIn(user, statusKey) {
    els.signedInEmail.textContent = bridge.t().accountSignedInAs(user.email);
    if (statusKey) els.syncStatus.textContent = bridge.t()[statusKey];
    els.btn.classList.add("signed-in");
    setAccountLabel(true);
    showPanel("signed-in");
    bridge.setCompareAvailable(true);
    // Gera/busca o código de amigo e recarrega a lista de amigos já ao
    // logar, sem esperar um clique na aba "Comparar" — é o que deixa o
    // banner do topo, o perfil e a própria aba (se já for a que está aberta,
    // ex.: depois do botão Atualizar com a sessão sendo restaurada) com a
    // informação certa em vez de vazia.
    refreshFriendsSection().then(() => {
      if (myUsername) {
        els.accountUsernameDisplay.textContent = bridge.t().accountUsernameDisplay(myUsername);
      }
    });
  }

  window.addEventListener("spriteslocker:lang-changed", () => {
    const user = auth.currentUser;
    if (user && signedInUid) {
      els.signedInEmail.textContent = bridge.t().accountSignedInAs(user.email);
      if (myUsername) {
        els.accountUsernameDisplay.textContent = bridge.t().accountUsernameDisplay(myUsername);
      }
    }
    setAccountLabel(!!signedInUid);
    renderPasswordHint();
    if (!els.friendsSection.hidden) renderFriendsList();
  });

  async function handleAuthChange(user) {
    if (!user) {
      signedInUid = null;
      friendCode = null;
      myUsername = null;
      friendsCache = [];
      els.friendsSection.hidden = true;
      els.friendsSignedOutHint.hidden = false;
      setFriendCodeDisplays(null);
      els.btn.classList.remove("signed-in");
      setAccountLabel(false);
      showPanel("signed-out");
      bridge.setCompareAvailable(false);
      return;
    }

    const docRef = dbApi.doc(db, "users", user.uid);
    let snap;
    try {
      snap = await dbApi.getDoc(docRef);
    } catch (err) {
      signedInUid = user.uid;
      renderSignedIn(user, null);
      els.syncStatus.textContent = authErrorMessage(bridge, err);
      return;
    }

    const previouslyPaired = lastSyncedUid.get() === user.uid;

    if (!snap.exists()) {
      // Conta nova (ou primeira vez sincronizando): semeia a nuvem com o que
      // já existe neste aparelho, mesmo que seja nada.
      signedInUid = user.uid;
      await dbApi.setDoc(docRef, bridge.getSnapshotJSON(), { mergeFields: SYNC_FIELDS });
      if (pendingUsername) {
        await dbApi.setDoc(docRef, { username: pendingUsername }, { mergeFields: ["username"] });
        pendingUsername = null;
      }
      lastSyncedUid.set(user.uid);
      renderSignedIn(user, "accountSyncedUp");
      return;
    }

    if (previouslyPaired) {
      // Aparelho já conhecido desta conta: mescla (união, nunca destrutivo)
      // e sobe o resultado, sem perguntar nada.
      signedInUid = user.uid;
      bridge.applyRemoteSnapshot(snap.data(), "merge");
      await dbApi.setDoc(docRef, bridge.getSnapshotJSON(), { mergeFields: SYNC_FIELDS });
      renderSignedIn(user, "accountSyncedOk");
      return;
    }

    if (!bridge.hasLocalMarks()) {
      // Aparelho novo para esta conta, mas sem nada local para perder.
      signedInUid = user.uid;
      bridge.applyRemoteSnapshot(snap.data(), "replace");
      lastSyncedUid.set(user.uid);
      renderSignedIn(user, "accountSyncedDown");
      return;
    }

    // Conflito de verdade: aparelho novo para esta conta E com progresso
    // local. Mostra a comparação e deixa o usuário escolher (mesmo fluxo já
    // usado para importar um backup de outro aparelho).
    signedInUid = user.uid;
    lastSyncedUid.set(user.uid);
    closeModal();
    bridge.openReviewModal(snap.data());
    renderSignedIn(user, "accountSyncNotDone");
  }

  authApi.onAuthStateChanged(auth, (user) => {
    handleAuthChange(user).catch((err) => console.warn("[cloud-sync]", err));
  });

  // ---- Amigos: comparação ao vivo via conta, sem trocar link ----
  // Só fica visível/ativa quando há sessão (signedInUid). O código de amigo é
  // gerado uma vez por conta (fica salvo em users/{uid}.friendCode) e a
  // "amizade" só libera a leitura da coleção do outro quando os dois lados
  // se adicionaram — ver a regra do Firestore que acompanha este PR.

  function setFriendError(message) {
    els.friendAddError.textContent = message || "";
    els.friendAddError.hidden = !message;
  }

  // Mesmo código em dois lugares: no banner do topo da página e no "Meu
  // perfil" — a aba Comparar não repete mais (fica só no banner, ali em
  // cima). Os dois refletem o mesmo estado.
  function setFriendCodeDisplays(code) {
    els.accountFriendCodeInput.value = code || "";
    els.friendCodeBanner.hidden = !code;
    els.friendCodeBannerValue.textContent = code || "";
  }

  async function ensureFriendCode() {
    try {
      const snap = await dbApi.getDoc(dbApi.doc(db, "users", signedInUid));
      if (snap.exists()) {
        myUsername = snap.data().username || null;
        if (friendCode) return friendCode;
        if (snap.data().friendCode) {
          friendCode = snap.data().friendCode;
          return friendCode;
        }
      } else if (friendCode) {
        return friendCode;
      }
    } catch (err) {
      console.warn("[cloud-sync] falha ao buscar código de amigo:", err);
    }
    // Tenta um código aleatório por vez, sem checar antes se já existe: uma
    // escrita numa doc que já existe conta como "update" pro Firestore (não
    // "create"), e só "create" é permitido pela regra — então uma colisão
    // simplesmente falha, e tenta de novo. Nunca faz getDoc-antes-de-escrever
    // (isso reintroduziria a mesma corrida que essa técnica evita).
    let lastError = null;
    for (let i = 0; i < 8; i++) {
      const candidate = randomFriendCode();
      try {
        await dbApi.setDoc(dbApi.doc(db, "friendCodes", candidate), {
          uid: signedInUid,
          username: myUsername,
        });
        await dbApi.setDoc(
          dbApi.doc(db, "users", signedInUid),
          { friendCode: candidate },
          { mergeFields: ["friendCode"] }
        );
        friendCode = candidate;
        return friendCode;
      } catch (err) {
        // Pode ser colisão de verdade (permission-denied esperado — tenta
        // outro código) ou qualquer outro erro (regras ainda não publicadas,
        // banco não criado, etc.) — guarda pra reportar se todas falharem.
        lastError = err;
      }
    }
    console.warn("[cloud-sync] não foi possível gerar um código de amigo:", lastError);
    setFriendError(authErrorMessage(bridge, lastError));
    return null;
  }

  async function resolveFriendCode(code) {
    try {
      const snap = await dbApi.getDoc(dbApi.doc(db, "friendCodes", code));
      if (!snap.exists()) return null;
      return { uid: snap.data().uid, username: snap.data().username || null };
    } catch (err) {
      console.warn("[cloud-sync] falha ao resolver código de amigo:", err);
      return null;
    }
  }

  async function loadFriends() {
    try {
      const snaps = await dbApi.getDocs(dbApi.collection(db, "users", signedInUid, "friends"));
      const list = [];
      snaps.forEach((docSnap) =>
        list.push({
          uid: docSnap.id,
          code: docSnap.data().code,
          username: docSnap.data().username || null,
        })
      );
      return list;
    } catch (err) {
      console.warn("[cloud-sync] falha ao carregar amigos:", err);
      return [];
    }
  }

  // Só existe uma forma de ler isto sem poder listar a lista de amigos
  // inteira de outra pessoa: pedir o documento exato (o meu uid dentro da
  // lista dela), nunca a coleção toda — é o que a regra do Firestore permite.
  async function checkMutual(friendUid) {
    try {
      const snap = await dbApi.getDoc(dbApi.doc(db, "users", friendUid, "friends", signedInUid));
      return snap.exists();
    } catch {
      return false;
    }
  }

  function renderFriendsList() {
    const s = bridge.t();
    els.friendList.hidden = friendsCache.length === 0;
    els.friendListEmpty.hidden = friendsCache.length !== 0;
    els.friendList.innerHTML = friendsCache
      .map((f) => {
        const status = f.mutual ? "" : escapeHtml(s.friendWaitingMutual);
        const compareBtn = f.mutual
          ? `<button class="export-copy" data-compare-uid="${escapeHtml(f.uid)}" type="button">${escapeHtml(s.sharePasteButton)}</button>`
          : "";
        // O nome sempre ocupa a mesma coluna (mesmo vazio, em contas raras de
        // antes dessa função existir) — é o que mantém as linhas 100%
        // alinhadas independente do tamanho de cada nome.
        const codeClass = f.username ? "friend-row-code friend-row-code-secondary" : "friend-row-code";
        return `<li class="friend-row">
          <span class="friend-row-name">${escapeHtml(f.username || "")}</span>
          <span class="${codeClass}">${escapeHtml(f.code)}</span>
          <span class="friend-row-status">${status}</span>
          <div class="friend-row-actions">
            ${compareBtn}
            <button class="friend-remove-btn" data-remove-uid="${escapeHtml(f.uid)}" type="button"
                    title="${escapeHtml(s.friendRemoveButton)}" aria-label="${escapeHtml(s.friendRemoveButton)}">✕</button>
          </div>
        </li>`;
      })
      .join("");
  }

  async function refreshFriendsSection() {
    if (!signedInUid) {
      els.friendsSection.hidden = true;
      els.friendsSignedOutHint.hidden = false;
      return;
    }
    els.friendsSection.hidden = false;
    els.friendsSignedOutHint.hidden = true;
    setFriendError("");

    const code = await ensureFriendCode();
    setFriendCodeDisplays(code);

    const list = await loadFriends();
    const mutuals = await Promise.allSettled(list.map((f) => checkMutual(f.uid)));
    friendsCache = list.map((f, i) => ({
      ...f,
      mutual: mutuals[i].status === "fulfilled" && mutuals[i].value,
    }));
    renderFriendsList();
  }

  async function addFriend(rawInput) {
    setFriendError("");
    const normalized = normalizeFriendCode(rawInput);
    if (!normalized) return setFriendError(bridge.t().friendErrorInvalidCode);
    if (normalized === friendCode) return setFriendError(bridge.t().friendErrorOwnCode);
    if (friendsCache.some((f) => f.code === normalized)) {
      return setFriendError(bridge.t().friendErrorAlreadyAdded);
    }
    const resolved = await resolveFriendCode(normalized);
    if (!resolved) return setFriendError(bridge.t().friendErrorNotFound);
    if (resolved.uid === signedInUid) return setFriendError(bridge.t().friendErrorOwnCode);

    try {
      await dbApi.setDoc(dbApi.doc(db, "users", signedInUid, "friends", resolved.uid), {
        code: normalized,
        username: resolved.username,
        addedAt: new Date().toISOString(),
      });
    } catch (err) {
      return setFriendError(authErrorMessage(bridge, err));
    }
    els.friendAddInput.value = "";
    friendsCache.push({ uid: resolved.uid, code: normalized, username: resolved.username, mutual: false });
    renderFriendsList();
    // A checagem de mutualidade é assíncrona e não bloqueia a linha aparecer.
    checkMutual(resolved.uid).then((mutual) => {
      const entry = friendsCache.find((f) => f.uid === resolved.uid);
      if (entry) entry.mutual = mutual;
      renderFriendsList();
    });
  }

  async function removeFriend(friendUid) {
    try {
      await dbApi.deleteDoc(dbApi.doc(db, "users", signedInUid, "friends", friendUid));
    } catch (err) {
      console.warn("[cloud-sync] falha ao remover amigo:", err);
      return;
    }
    friendsCache = friendsCache.filter((f) => f.uid !== friendUid);
    renderFriendsList();
  }

  async function compareWithFriend(friendUid) {
    setFriendError("");
    try {
      const snap = await dbApi.getDoc(dbApi.doc(db, "users", friendUid));
      if (!snap.exists() || !snap.data().collection) {
        return setFriendError(bridge.t().friendCompareUnavailable);
      }
      bridge.openCompareModal(snap.data().collection);
    } catch {
      setFriendError(bridge.t().friendCompareUnavailable);
    }
  }

  // Também recarrega ao clicar na aba (não só ao logar) — pega amigos que
  // viraram mútuos etc. sem precisar de um F5. O caso "aba Comparar já
  // estava aberta quando a sessão foi restaurada" (ex.: botão Atualizar)
  // é coberto por renderSignedIn() chamar refreshFriendsSection() direto,
  // não por uma checagem aqui: essa checagem rodaria antes do
  // onAuthStateChanged assíncrono resolver e sempre perderia a corrida,
  // achando "deslogado" e nunca mais tentando de novo.
  els.friendsTab.addEventListener("click", refreshFriendsSection);

  // Usado pelos dois botões "copiar código" (banner do topo, perfil) —
  // fazem a mesma coisa, só muda qual botão/texto/campo.
  async function copyFriendCode(button, text, fallbackInput) {
    try {
      await navigator.clipboard.writeText(text);
      const original = button.textContent;
      button.textContent = bridge.t().exportCopied;
      setTimeout(() => {
        button.textContent = original;
      }, 2000);
    } catch {
      if (fallbackInput) fallbackInput.select();
    }
  }

  els.friendCodeBannerCopyBtn.addEventListener("click", () =>
    copyFriendCode(els.friendCodeBannerCopyBtn, friendCode || "")
  );
  els.accountFriendCodeCopyBtn.addEventListener("click", () =>
    copyFriendCode(
      els.accountFriendCodeCopyBtn,
      els.accountFriendCodeInput.value,
      els.accountFriendCodeInput
    )
  );

  els.friendAddBtn.addEventListener("click", () => addFriend(els.friendAddInput.value));

  els.friendList.addEventListener("click", (e) => {
    const compareBtn = e.target.closest("[data-compare-uid]");
    if (compareBtn) return compareWithFriend(compareBtn.dataset.compareUid);
    const removeBtn = e.target.closest("[data-remove-uid]");
    if (removeBtn) removeFriend(removeBtn.dataset.removeUid);
  });

  function setAuthError(message) {
    els.authError.textContent = message || "";
    els.authError.hidden = !message;
  }

  els.loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    setAuthError("");
    try {
      await authApi.signInWithEmailAndPassword(
        auth,
        els.loginEmailInput.value,
        els.loginPasswordInput.value
      );
    } catch (err) {
      setAuthError(authErrorMessage(bridge, err));
    }
  });

  els.signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    setAuthError("");
    const username = els.signupUsernameInput.value.trim();
    if (!username) return setAuthError(bridge.t().accountErrorUsernameRequired);
    // Confere a senha contra a política de verdade ANTES de gastar uma
    // tentativa no Firebase — evita o "weak-password" genérico e diz
    // exatamente o que falta.
    if (passwordPolicy && passwordPolicy.enforcementState === "ENFORCE") {
      const status = await authApi.validatePassword(auth, els.signupPasswordInput.value);
      if (!status.isValid) {
        setAuthError(
          bridge.t().accountPasswordRequirements(missingPasswordRequirements(bridge, status))
        );
        return;
      }
    }
    // Grava ANTES de criar a conta: handleAuthChange() reage ao
    // onAuthStateChanged, que pode disparar antes de qualquer código daqui
    // rodar depois do await — pendingUsername precisa já estar pronto.
    pendingUsername = username;
    try {
      await authApi.createUserWithEmailAndPassword(
        auth,
        els.signupEmailInput.value,
        els.signupPasswordInput.value
      );
    } catch (err) {
      pendingUsername = null;
      setAuthError(authErrorMessage(bridge, err));
    }
  });

  els.forgotLink.addEventListener("click", async () => {
    setAuthError("");
    if (!els.loginEmailInput.value) {
      setAuthError(bridge.t().accountErrorInvalidEmail);
      return;
    }
    try {
      await authApi.sendPasswordResetEmail(auth, els.loginEmailInput.value);
      setAuthError(bridge.t().accountResetSent);
    } catch (err) {
      setAuthError(authErrorMessage(bridge, err));
    }
  });

  els.resyncBtn.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      const snap = await dbApi.getDoc(dbApi.doc(db, "users", user.uid));
      if (!snap.exists()) return;
      if (bridge.hasLocalMarks()) {
        closeModal();
        bridge.openReviewModal(snap.data());
      } else {
        bridge.applyRemoteSnapshot(snap.data(), "replace");
        renderSignedIn(user, "accountSyncedDown");
      }
    } catch (err) {
      els.syncStatus.textContent = authErrorMessage(bridge, err);
    }
  });

  els.logoutBtn.addEventListener("click", () => {
    authApi.signOut(auth);
  });
}

main();
