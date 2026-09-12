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

async function main() {
  const bridge = window.SpritesLockerBridge;

  const els = {
    overlay: document.getElementById("account-overlay"),
    btn: document.getElementById("account-btn"),
    close: document.getElementById("account-close"),
    unconfiguredText: document.getElementById("account-unconfigured-text"),
    form: document.getElementById("account-form"),
    emailInput: document.getElementById("account-email-input"),
    passwordInput: document.getElementById("account-password-input"),
    authError: document.getElementById("account-auth-error"),
    loginBtn: document.getElementById("account-login-btn"),
    signupBtn: document.getElementById("account-signup-btn"),
    forgotLink: document.getElementById("account-forgot-link"),
    signedIn: document.getElementById("account-signed-in"),
    signedInEmail: document.getElementById("account-signed-in-email"),
    syncStatus: document.getElementById("account-sync-status"),
    resyncBtn: document.getElementById("account-resync-btn"),
    logoutBtn: document.getElementById("account-logout-btn"),
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

  function showPanel(name) {
    els.unconfiguredText.hidden = name !== "unconfigured";
    els.form.hidden = name !== "signed-out";
    els.signedIn.hidden = name !== "signed-in";
  }

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
  } catch (err) {
    console.warn("[cloud-sync] Firebase indisponível:", err);
    showPanel("unconfigured");
    els.unconfiguredText.textContent = bridge.t().accountErrorNetwork;
    return;
  }

  showPanel("signed-out");

  let signedInUid = null;
  let pushTimer = null;

  function schedulePush() {
    if (!signedInUid) return;
    const targetUid = signedInUid;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(async () => {
      // O login pode ter mudado de conta (ou saído) enquanto o debounce
      // esperava — nesse caso o push é descartado, nunca redirecionado.
      if (signedInUid !== targetUid) return;
      try {
        await dbApi.setDoc(dbApi.doc(db, "users", targetUid), bridge.getSnapshotJSON());
      } catch (err) {
        console.warn("[cloud-sync] falha ao sincronizar:", err);
      }
    }, 800);
  }
  window.addEventListener("spriteslocker:data-changed", schedulePush);

  function renderSignedIn(user, statusKey) {
    els.signedInEmail.textContent = bridge.t().accountSignedInAs(user.email);
    if (statusKey) els.syncStatus.textContent = bridge.t()[statusKey];
    els.btn.classList.add("signed-in");
    showPanel("signed-in");
  }

  window.addEventListener("spriteslocker:lang-changed", () => {
    const user = auth.currentUser;
    if (user && signedInUid) {
      els.signedInEmail.textContent = bridge.t().accountSignedInAs(user.email);
    }
  });

  async function handleAuthChange(user) {
    if (!user) {
      signedInUid = null;
      els.btn.classList.remove("signed-in");
      showPanel("signed-out");
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
      await dbApi.setDoc(docRef, bridge.getSnapshotJSON());
      lastSyncedUid.set(user.uid);
      renderSignedIn(user, "accountSyncedUp");
      return;
    }

    if (previouslyPaired) {
      // Aparelho já conhecido desta conta: mescla (união, nunca destrutivo)
      // e sobe o resultado, sem perguntar nada.
      signedInUid = user.uid;
      bridge.applyRemoteSnapshot(snap.data(), "merge");
      await dbApi.setDoc(docRef, bridge.getSnapshotJSON());
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

  function setAuthError(message) {
    els.authError.textContent = message || "";
    els.authError.hidden = !message;
  }

  els.form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setAuthError("");
    try {
      await authApi.signInWithEmailAndPassword(
        auth,
        els.emailInput.value,
        els.passwordInput.value
      );
    } catch (err) {
      setAuthError(authErrorMessage(bridge, err));
    }
  });

  els.signupBtn.addEventListener("click", async () => {
    if (!els.form.reportValidity()) return;
    setAuthError("");
    try {
      await authApi.createUserWithEmailAndPassword(
        auth,
        els.emailInput.value,
        els.passwordInput.value
      );
    } catch (err) {
      setAuthError(authErrorMessage(bridge, err));
    }
  });

  els.forgotLink.addEventListener("click", async () => {
    setAuthError("");
    if (!els.emailInput.value) {
      setAuthError(bridge.t().accountErrorInvalidEmail);
      return;
    }
    try {
      await authApi.sendPasswordResetEmail(auth, els.emailInput.value);
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
