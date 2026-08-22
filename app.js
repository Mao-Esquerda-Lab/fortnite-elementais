const STORAGE_KEY = "fortnite-sprites-collection-v1";
const LANG_KEY = "fortnite-elementals-lang";
const SORT_KEY = "fortnite-elementals-sort";
const CODES_KEY = "fortnite-lobby-codes-v1";
const VIEW_KEY = "fortnite-elementals-view";

const RARITY_COLORS = {
  Rare: "var(--rare)",
  Epic: "var(--epic)",
  Legendary: "var(--legendary)",
  Mythic: "var(--mythic)",
  // Sprites "Em breve" que a Epic ainda não classificou.
  Unknown: "var(--muted)",
};

const TRANSLATIONS = {
  pt: {
    htmlLang: "pt-BR",
    docTitle: "Fortnite Sprites Locker",
    title: "Fortnite Sprites Locker",
    subtitle: "Acompanhe quais Elementais do Fortnite Battle Royale você já possui",
    backToTop: "Voltar ao topo",
    navExpand: "Mostrar todos os Elementais",
    navCollapse: "Recolher o menu",
    exportLabel: "Exportar resumo",
    exportTitle: "Abre uma imagem com o resumo da sua coleção",
    exportFile: "sprites-resumo",
    exportDownload: "Baixar",
    exportCopy: "Copiar",
    exportCopied: "Copiado! ✓",
    exportShare: "Compartilhar",
    exportTotal: (total) => `${total} itens (Base + variantes)`,
    shareLabel: "Comparar",
    shareTitle: "Gera um link para comparar sua coleção com a de um amigo",
    shareLinkLabel: "Seu link de comparação",
    shareCopyLink: "Copiar link",
    sharePasteLabel: "Cole aqui o código ou link de um amigo",
    sharePasteButton: "Comparar",
    compareTitle: "Comparação de coleção",
    compareYou: "Você",
    compareThem: "Amigo(a)",
    compareOnlyYou: "Só você tem",
    compareOnlyThem: "Só ele(a) tem",
    compareNone: "Nada exclusivo aqui",
    compareInvalidCode: "Este link de comparação é inválido ou está corrompido.",
    backupLabel: "Backup",
    backupTitle: "Leva sua coleção inteira para outro aparelho",
    backupIntro:
      "O backup leva tudo: coletados, dominados, favoritos e os códigos que você já resgatou. Copie o código (ou baixe o arquivo) neste aparelho e cole no outro.",
    backupExportLabel: "Código deste aparelho",
    backupCopy: "Copiar código",
    backupDownload: "Baixar arquivo",
    backupFileName: "sprites-backup",
    backupImportLabel: "Cole aqui o código do outro aparelho",
    backupImportButton: "Importar",
    backupFileLabel: "…ou escolha o arquivo baixado",
    backupInvalid: "Este backup é inválido ou está corrompido.",
    backupEmpty: "Este backup não tem nenhum Sprite marcado.",
    backupConfirm: (mine, theirs) =>
      `Este aparelho tem ${mine} marcação(ões) e o backup tem ${theirs}. Substituir apaga o que está aqui; juntar mantém as duas coleções.`,
    backupReplace: "Substituir tudo",
    backupMerge: "Juntar as duas",
    backupCancel: "Cancelar",
    backupDone: (total) => `Pronto — ${total} marcação(ões) neste aparelho agora.`,
    viewSprites: "Sprites",
    viewCodes: "Códigos",
    codesIntro:
      "Códigos do Painel de Admin: no menu principal, clique na caixa “… / admin panel” no canto superior direito, digite e confirme. Marque aqui os que já resgatou.",
    codesThDone: "Resgatei",
    codesThCode: "Código",
    codesThReward: "Recompensa",
    codesNew: "Novo",
    codesCopy: "Copiar código",
    codesProgress: (done, total) => `${done} / ${total} resgatados`,
    codesSource:
      'Lista do <a href="https://www.ign.com/wikis/fortnite/All_Admin_Panel_Lobby_Hack_Codes_For_Free_Rewards" target="_blank" rel="noopener noreferrer">wiki do IGN</a>. Os textos das recompensas são tradução nossa, não o texto oficial do jogo.',
    tabAll: "Todos",
    tabOwned: "Tenho",
    tabNotOwned: "Não tenho",
    tabMastered: "Dominados",
    tabNotMastered: "Não dominados",
    tabFavorites: "Favoritos ★",
    sortLabel: "Ordenar por",
    sortDefault: "Padrão",
    sortRarity: "Raridade",
    sortAlpha: "Nome (A–Z)",
    progressOwned: (owned, total) => `${owned} / ${total} coletados`,
    progressMastered: (mastered, total) => `${mastered} / ${total} dominados`,
    owned: "Tenho",
    mastered: "Dominado",
    favorite: "Favoritar",
    refresh: "Atualizar",
    close: "Fechar",
    costLabel: "Custo de invocação (Pó de Elemental)",
    costTitle:
      "Quanto de Pó de Elemental custa para invocar este Elemental numa partida",
    costVariants: "Variantes",
    collectionLabel: "Coleção",
    baseVariant: "Base",
    upcoming: "Em breve",
    empty: "Nenhum Elemental encontrado.",
    installTitle: "📱 Instale como aplicativo",
    installButton: "Instalar aplicativo",
    installGeneric:
      "Este site funciona como aplicativo: no menu do navegador (⋮), toque em “Instalar aplicativo” ou “Adicionar à tela inicial”.",
    installIos:
      "No iPhone/iPad: toque no botão Compartilhar (□↑) do Safari e escolha “Adicionar à Tela de Início”.",
    installOffline:
      "Depois de instalado, o app abre offline: seu progresso e os ícones já vistos ficam salvos no aparelho.",
    footer:
      'Sprites, arte e códigos do <a href="https://www.ign.com/wikis/fortnite/Sprites_Checklist_and_Guide_(Chapter_7_Season_4)_-_All_Variants_List" target="_blank" rel="noopener noreferrer">wiki do IGN</a>; raridades da <a href="https://fortnite.fandom.com/wiki/Sprites" target="_blank" rel="noopener noreferrer">Fortnite Wiki</a>. Projeto de fã, sem vínculo com a Epic Games. Seu progresso fica salvo só neste navegador — use o Backup para levá-lo a outro aparelho.',
    costUnknown: "ainda não revelado",
    rarities: {
      Rare: "Raro",
      Epic: "Épico",
      Legendary: "Lendário",
      Mythic: "Mítico",
      Unknown: "Raridade a definir",
    },
  },
  en: {
    htmlLang: "en",
    docTitle: "Fortnite Sprites Locker",
    title: "Fortnite Sprites Locker",
    subtitle: "Track which Fortnite Battle Royale Elementals you already own",
    backToTop: "Back to top",
    navExpand: "Show all Elementals",
    navCollapse: "Collapse the menu",
    exportLabel: "Export summary",
    exportTitle: "Opens an image summarizing your collection",
    exportFile: "sprites-summary",
    exportDownload: "Download",
    exportCopy: "Copy",
    exportCopied: "Copied! ✓",
    exportShare: "Share",
    exportTotal: (total) => `${total} items (Base + variants)`,
    shareLabel: "Compare",
    shareTitle: "Generates a link to compare your collection with a friend's",
    shareLinkLabel: "Your comparison link",
    shareCopyLink: "Copy link",
    sharePasteLabel: "Paste a friend's code or link here",
    sharePasteButton: "Compare",
    compareTitle: "Collection comparison",
    compareYou: "You",
    compareThem: "Friend",
    compareOnlyYou: "Only you have",
    compareOnlyThem: "Only they have",
    compareNone: "Nothing exclusive here",
    compareInvalidCode: "This comparison link is invalid or corrupted.",
    backupLabel: "Backup",
    backupTitle: "Move your whole collection to another device",
    backupIntro:
      "A backup carries everything: collected, mastered, favourites and the codes you have redeemed. Copy the code (or download the file) on this device and paste it on the other one.",
    backupExportLabel: "This device's code",
    backupCopy: "Copy code",
    backupDownload: "Download file",
    backupFileName: "sprites-backup",
    backupImportLabel: "Paste the other device's code here",
    backupImportButton: "Import",
    backupFileLabel: "…or pick the downloaded file",
    backupInvalid: "This backup is invalid or corrupted.",
    backupEmpty: "This backup has no Sprites marked.",
    backupConfirm: (mine, theirs) =>
      `This device has ${mine} mark(s) and the backup has ${theirs}. Replacing wipes what is here; merging keeps both collections.`,
    backupReplace: "Replace everything",
    backupMerge: "Merge both",
    backupCancel: "Cancel",
    backupDone: (total) => `Done — ${total} mark(s) on this device now.`,
    viewSprites: "Sprites",
    viewCodes: "Codes",
    codesIntro:
      "Admin Panel codes: on the main menu, click the “… / admin panel” box in the top right, type the code and submit. Tick here the ones you have already redeemed.",
    codesThDone: "Redeemed",
    codesThCode: "Code",
    codesThReward: "Reward",
    codesNew: "New",
    codesCopy: "Copy code",
    codesProgress: (done, total) => `${done} / ${total} redeemed`,
    codesSource:
      'List from the <a href="https://www.ign.com/wikis/fortnite/All_Admin_Panel_Lobby_Hack_Codes_For_Free_Rewards" target="_blank" rel="noopener noreferrer">IGN wiki</a>. Reward wording is our own translation, not the game\'s official text.',
    tabAll: "All",
    tabOwned: "Owned",
    tabNotOwned: "Not owned",
    tabMastered: "Mastered",
    tabNotMastered: "Not mastered",
    tabFavorites: "Favorites ★",
    sortLabel: "Sort by",
    sortDefault: "Default",
    sortRarity: "Rarity",
    sortAlpha: "Name (A–Z)",
    progressOwned: (owned, total) => `${owned} / ${total} collected`,
    progressMastered: (mastered, total) => `${mastered} / ${total} mastered`,
    owned: "Owned",
    mastered: "Mastered",
    favorite: "Favorite",
    refresh: "Refresh",
    close: "Close",
    costLabel: "Summon cost (Sprite Dust)",
    costTitle: "How much Sprite Dust it costs to summon this Sprite in a match",
    costVariants: "Variants",
    collectionLabel: "Collection",
    baseVariant: "Base",
    upcoming: "Upcoming",
    empty: "No Elementals found.",
    installTitle: "📱 Install as an app",
    installButton: "Install app",
    installGeneric:
      "This site works as an app: open the browser menu (⋮) and tap “Install app” or “Add to Home screen”.",
    installIos:
      "On iPhone/iPad: tap Safari's Share button (□↑) and choose “Add to Home Screen”.",
    installOffline:
      "Once installed, the app opens offline: your progress and previously viewed icons stay saved on your device.",
    footer:
      'Sprites, art and codes from the <a href="https://www.ign.com/wikis/fortnite/Sprites_Checklist_and_Guide_(Chapter_7_Season_4)_-_All_Variants_List" target="_blank" rel="noopener noreferrer">IGN wiki</a>; rarities from the <a href="https://fortnite.fandom.com/wiki/Sprites" target="_blank" rel="noopener noreferrer">Fortnite Wiki</a>. A fan project, not affiliated with Epic Games. Your progress is saved in this browser only — use Backup to move it to another device.',
    costUnknown: "not revealed yet",
    rarities: {
      Rare: "Rare",
      Epic: "Epic",
      Legendary: "Legendary",
      Mythic: "Mythic",
      Unknown: "Rarity TBD",
    },
  },
};

// localStorage pode estar indisponível (ex.: iframe em sandbox);
// nesse caso o app funciona sem persistência.
const storage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* sem persistência */
    }
  },
};

function loadCollection() {
  try {
    return JSON.parse(storage.get(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveCollection(collection) {
  storage.set(STORAGE_KEY, JSON.stringify(collection));
}

// Códigos do lobby já resgatados: { [id do código]: true }. Guardado à parte
// da coleção porque não tem nada a ver com Sprites — some junto no backup,
// mas fica fora do código de comparação (comparar é sobre a coleção).
function loadCodes() {
  try {
    const raw = JSON.parse(storage.get(CODES_KEY)) || {};
    return sanitizeCodes(raw);
  } catch {
    return {};
  }
}

function sanitizeCodes(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const clean = {};
  Object.entries(raw).forEach(([id, done]) => {
    if (done === true) clean[id] = true;
  });
  return clean;
}

function saveCodes() {
  storage.set(CODES_KEY, JSON.stringify(redeemedCodes));
}

function loadLang() {
  const saved = storage.get(LANG_KEY);
  return saved === "en" || saved === "pt" ? saved : "pt";
}

let collection = loadCollection();
let redeemedCodes = loadCodes();
let activeView = storage.get(VIEW_KEY) === "codes" ? "codes" : "sprites";
let lang = loadLang();
let activeFilter = "all";
let sortMode = ["default", "rarity", "alpha"].includes(storage.get(SORT_KEY))
  ? storage.get(SORT_KEY)
  : "default";

const grid = document.getElementById("elemental-grid");
const emptyState = document.getElementById("empty-state");
const progressBarOwned = document.getElementById("progress-bar-owned");
const progressBarMastered = document.getElementById("progress-bar-mastered");
const progressLabelOwned = document.getElementById("progress-label-owned");
const progressLabelMastered = document.getElementById("progress-label-mastered");
const filterTabs = document.getElementById("filter-tabs");
const langSwitch = document.getElementById("lang-switch");
const spriteNav = document.getElementById("sprite-nav");
const spriteNavIcons = document.getElementById("sprite-nav-icons");
const spriteNavToggle = document.getElementById("sprite-nav-toggle");
const backToTop = document.getElementById("back-to-top");

function t() {
  return TRANSLATIONS[lang];
}

// Sprites "Em breve" ainda não têm custo divulgado: nesses casos `n` vem
// indefinido e o card mostra "ainda não revelado" no lugar do número.
function fmtNumber(n) {
  if (n == null) return t().costUnknown;
  return n.toLocaleString(lang === "pt" ? "pt-BR" : "en-US");
}

// O parâmetro source permite ler uma coleção "estrangeira" (ex.: a de um
// amigo, decodificada de um link de comparação) com a mesma normalização,
// sem nunca tocar na coleção real do usuário.
function getEntry(id, source = collection) {
  const entry = source[id] || {
    owned: false,
    mastered: false,
    favorite: false,
  };
  if (!("mastered" in entry)) entry.mastered = false;
  if (!entry.variants) entry.variants = {};
  // Migração do formato antigo, em que a variante era só um boolean.
  Object.keys(entry.variants).forEach((key) => {
    if (typeof entry.variants[key] === "boolean") {
      entry.variants[key] = { owned: entry.variants[key], mastered: false };
    }
  });
  return entry;
}

function getVariantEntry(entry, variantId) {
  return entry.variants[variantId] || { owned: false, mastered: false };
}

function setEntry(id, patch) {
  collection[id] = { ...getEntry(id), ...patch };
  saveCollection(collection);
}

// ---- Código de comparação (compartilhar/comparar coleção com um amigo) ----
// Sem backend: o código descreve só o que tem estado não-padrão, chaveado
// pelo id estável do Elemental (nunca por posição no array — a ordem de
// ELEMENTALS não é garantida entre curadorias). "favorite" fica de fora (é
// curadoria pessoal) e "upcoming" também (não conta no progresso e não tem
// checkbox habilitado).
const SHARE_CODE_VERSION = 1;
const VARIANT_CODES = {
  gold: "g",
  gummy: "u",
  galaxy: "x",
  gem: "e",
  holofoil: "h",
  cube: "c",
  quack: "q",
  "cheat-master": "m",
};
const VARIANT_CODES_REV = Object.fromEntries(
  Object.entries(VARIANT_CODES).map(([id, code]) => [code, id])
);

function tileBits(state) {
  return (state.owned ? 1 : 0) | (state.mastered ? 2 : 0);
}

function bitsToState(bits) {
  return { owned: (bits & 1) !== 0, mastered: (bits & 2) !== 0 };
}

function encodeCollectionCode(source = collection) {
  const segments = [];
  ELEMENTALS.forEach((e) => {
    if (e.upcoming) return;
    const entry = getEntry(e.id, source);
    let seg = "";
    const baseBits = tileBits(entry);
    if (baseBits) seg += String(baseBits);
    e.variants.forEach((v) => {
      const bits = tileBits(getVariantEntry(entry, v.id));
      if (bits) seg += `,${VARIANT_CODES[v.id] || v.id}${bits}`;
    });
    if (seg) segments.push(`${e.id}.${seg}`);
  });
  const payload = `${SHARE_CODE_VERSION}|${segments.join(";")}`;
  return btoa(payload)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Nunca lança: qualquer formato inesperado (versão desconhecida, base64
// corrompido, dígitos fora de 0-3) resulta em null — quem chama decide o
// que fazer (ignorar silenciosamente ou avisar o usuário).
function decodeCollectionCode(code) {
  try {
    const base64 = code.trim().replace(/-/g, "+").replace(/_/g, "/");
    const payload = atob(base64);
    const sepIdx = payload.indexOf("|");
    if (sepIdx === -1) return null;
    if (Number(payload.slice(0, sepIdx)) !== SHARE_CODE_VERSION) return null;
    const body = payload.slice(sepIdx + 1);

    const result = {};
    if (!body) return result;

    for (const segment of body.split(";")) {
      if (!segment) continue;
      const dotIdx = segment.indexOf(".");
      if (dotIdx <= 0) return null; // sem id ou sem separador: código corrompido
      const id = segment.slice(0, dotIdx);
      const parts = segment.slice(dotIdx + 1).split(",");

      const entry = { owned: false, mastered: false, favorite: false, variants: {} };
      if (parts[0]) {
        const bits = Number(parts[0]);
        if (!Number.isInteger(bits) || bits < 0 || bits > 3) return null;
        Object.assign(entry, bitsToState(bits));
      }
      for (const part of parts.slice(1)) {
        if (!part) continue;
        const variantId = VARIANT_CODES_REV[part[0]];
        // Código de variante desconhecido (link de uma versão mais nova do
        // app): ignora só essa variante, não o resto da entrada — nem tenta
        // validar os bits, que nesse caso nem são confiáveis.
        if (!variantId) continue;
        const bits = Number(part.slice(1));
        if (!Number.isInteger(bits) || bits < 0 || bits > 3) return null;
        entry.variants[variantId] = bitsToState(bits);
      }
      result[id] = entry;
    }
    return result;
  } catch {
    return null;
  }
}

// Soma tenho/dominados de uma coleção (a real ou uma decodificada de um
// link) contra os Elementais conhecidos NESTA versão do app — assim os dois
// lados de uma comparação são sempre proporcionais, mesmo que o link tenha
// vindo de uma versão com Elementais que este app ainda não conhece.
function computeTotals(source) {
  let total = 0;
  let owned = 0;
  let mastered = 0;
  ELEMENTALS.forEach((e) => {
    if (e.upcoming) return;
    const entry = getEntry(e.id, source);
    const states = [entry, ...e.variants.map((v) => getVariantEntry(entry, v.id))];
    total += states.length;
    states.forEach((st) => {
      if (st.owned) owned += 1;
      if (st.mastered) mastered += 1;
    });
  });
  return { total, owned, mastered };
}

// Classifica cada quadradinho (Base + variantes) em: ambos têm, só eu tenho,
// só o outro tem, ou nenhum tem. Ids desconhecidos de "theirs" (Elemental
// novo demais para este app) nunca aparecem — a iteração é sempre sobre os
// ELEMENTALS conhecidos aqui.
function diffCollections(mine, theirs) {
  const s = t();
  return ELEMENTALS.filter((e) => !e.upcoming).map((e) => {
    const mineEntry = getEntry(e.id, mine);
    const theirEntry = getEntry(e.id, theirs);
    const tileList = [
      { name: s.baseVariant, mineState: mineEntry, theirState: theirEntry },
      ...e.variants.map((v) => ({
        name: v.name[lang],
        mineState: getVariantEntry(mineEntry, v.id),
        theirState: getVariantEntry(theirEntry, v.id),
      })),
    ].map((tile) => ({
      name: tile.name,
      status: tile.mineState.owned && tile.theirState.owned
        ? "both"
        : tile.mineState.owned
          ? "mine"
          : tile.theirState.owned
            ? "theirs"
            : "neither",
    }));
    return { elemental: e, tiles: tileList };
  });
}

// Filtros de coleção valem por quadradinho (Base e cada variante), não só
// pelo Sprite: retorna o teste a aplicar em cada um, ou null quando o filtro
// ativo não é de coleção (todos os quadradinhos aparecem).
function tileFilter() {
  if (activeFilter === "owned") return (state) => state.owned;
  if (activeFilter === "not-owned") return (state) => !state.owned;
  if (activeFilter === "mastered") return (state) => state.mastered;
  // "Não dominados" só faz sentido pro que você já tem — senão listaria
  // praticamente a coleção inteira, incluindo o que nem foi coletado ainda.
  if (activeFilter === "not-mastered")
    return (state) => state.owned && !state.mastered;
  return null;
}

function matchesFilter(elemental) {
  if (activeFilter === "all") return true;
  if (activeFilter === "favorites") return getEntry(elemental.id).favorite;

  // O card aparece se qualquer quadradinho dele passa no filtro de coleção.
  const byTile = tileFilter();
  if (byTile) {
    const entry = getEntry(elemental.id);
    return (
      byTile(entry) ||
      elemental.variants.some((v) => byTile(getVariantEntry(entry, v.id)))
    );
  }

  return elemental.rarity === activeFilter;
}

function sortElementals(list) {
  if (sortMode === "alpha") {
    return [...list].sort((a, b) =>
      a.name[lang].localeCompare(b.name[lang], lang === "pt" ? "pt-BR" : "en")
    );
  }
  if (sortMode === "rarity") {
    // Raridade desconhecida ("Em breve") não está em RARITY_ORDER: indexOf
    // devolveria -1 e jogaria esses Sprites para o começo — vão para o fim.
    const rank = (e) => {
      const i = RARITY_ORDER.indexOf(e.rarity);
      return i === -1 ? RARITY_ORDER.length : i;
    };
    return [...list].sort(
      (a, b) =>
        rank(a) - rank(b) ||
        a.name[lang].localeCompare(b.name[lang], lang === "pt" ? "pt-BR" : "en")
    );
  }
  return list; // ordem padrão dos dados
}

function applyLanguage() {
  const s = t();
  document.documentElement.lang = s.htmlLang;
  document.title = s.docTitle;
  document.getElementById("app-title").textContent = s.title;
  document.getElementById("app-subtitle").textContent = s.subtitle;
  document.getElementById("app-footer").innerHTML = s.footer;
  emptyState.textContent = s.empty;
  backToTop.title = s.backToTop;
  backToTop.setAttribute("aria-label", s.backToTop);

  [...filterTabs.children].forEach((tab) => {
    const key = tab.dataset.rarity;
    if (key === "all") tab.textContent = s.tabAll;
    else if (key === "owned") tab.textContent = s.tabOwned;
    else if (key === "not-owned") tab.textContent = s.tabNotOwned;
    else if (key === "mastered") tab.textContent = s.tabMastered;
    else if (key === "not-mastered") tab.textContent = s.tabNotMastered;
    else if (key === "favorites") tab.textContent = s.tabFavorites;
    else tab.textContent = s.rarities[key];
  });

  const exportBtn = document.getElementById("export-btn");
  exportBtn.title = s.exportTitle;
  document.getElementById("export-label").textContent = s.exportLabel;
  document.getElementById("export-download").textContent = s.exportDownload;
  document.getElementById("export-copy").textContent = s.exportCopy;
  document.getElementById("export-share").textContent = s.exportShare;
  document.getElementById("export-close").textContent = s.close;

  const shareBtn = document.getElementById("share-btn");
  shareBtn.title = s.shareTitle;
  document.getElementById("share-label").textContent = s.shareLabel;
  document.getElementById("share-link-label").textContent = s.shareLinkLabel;
  document.getElementById("share-copy-btn").textContent = s.shareCopyLink;
  document.getElementById("share-paste-label").textContent = s.sharePasteLabel;
  document.getElementById("share-paste-btn").textContent = s.sharePasteButton;
  document.getElementById("share-close").textContent = s.close;
  document.getElementById("compare-title").textContent = s.compareTitle;
  document.getElementById("compare-close").textContent = s.close;

  [...viewTabs.children].forEach((tab) => {
    tab.textContent = tab.dataset.view === "codes" ? s.viewCodes : s.viewSprites;
  });
  document.getElementById("codes-intro").textContent = s.codesIntro;
  document.getElementById("codes-th-done").textContent = s.codesThDone;
  document.getElementById("codes-th-code").textContent = s.codesThCode;
  document.getElementById("codes-th-reward").textContent = s.codesThReward;
  // Tem link para a página de origem, então precisa de innerHTML.
  document.getElementById("codes-source").innerHTML = s.codesSource;

  const backupBtn = document.getElementById("backup-btn");
  backupBtn.title = s.backupTitle;
  document.getElementById("backup-label").textContent = s.backupLabel;
  document.getElementById("backup-intro").textContent = s.backupIntro;
  document.getElementById("backup-export-label").textContent = s.backupExportLabel;
  document.getElementById("backup-copy-btn").textContent = s.backupCopy;
  document.getElementById("backup-download").textContent = s.backupDownload;
  document.getElementById("backup-import-label").textContent = s.backupImportLabel;
  document.getElementById("backup-import-btn").textContent = s.backupImportButton;
  document.getElementById("backup-file-label").textContent = s.backupFileLabel;
  document.getElementById("backup-merge-btn").textContent = s.backupMerge;
  document.getElementById("backup-replace-btn").textContent = s.backupReplace;
  document.getElementById("backup-cancel-btn").textContent = s.backupCancel;
  document.getElementById("backup-close").textContent = s.close;

  document.getElementById("sort-label").textContent = s.sortLabel;
  const sortSelect = document.getElementById("sort-select");
  const sortNames = {
    default: s.sortDefault,
    rarity: s.sortRarity,
    alpha: s.sortAlpha,
  };
  [...sortSelect.options].forEach((opt) => {
    opt.textContent = sortNames[opt.value];
  });
  sortSelect.value = sortMode;

  const refreshBtn = document.getElementById("refresh-btn");
  refreshBtn.title = s.refresh;
  refreshBtn.setAttribute("aria-label", s.refresh);
  document.getElementById("refresh-label").textContent = s.refresh;
  document.getElementById("install-close").title = s.close;

  [...langSwitch.children].forEach((btn) =>
    btn.classList.toggle("active", btn.dataset.lang === lang)
  );

  renderNav(); // os títulos dos ícones seguem o idioma
  renderNavToggle();
  renderInstallBox();
}

// ---- Instalação como aplicativo (PWA) ----
const INSTALL_TOAST_KEY = "install-toast-dismissed";
const installBox = document.getElementById("install-box");
const installBtn = document.getElementById("install-btn");
let deferredInstallPrompt = null;

// Detecta a versão instalada (app): o toast de instalação só existe na web.
const isStandalone = () =>
  ["standalone", "fullscreen", "minimal-ui", "window-controls-overlay"].some(
    (mode) => window.matchMedia(`(display-mode: ${mode})`).matches
  ) || window.navigator.standalone === true;

const isIos = () =>
  /iphone|ipad|ipod/i.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

function renderInstallBox() {
  const s = t();
  if (isStandalone() || storage.get(INSTALL_TOAST_KEY)) {
    // Já está rodando como app instalado, ou o usuário fechou o aviso.
    installBox.hidden = true;
    return;
  }
  installBox.hidden = false;
  document.getElementById("install-title").textContent = s.installTitle;
  document.getElementById("install-text").textContent = deferredInstallPrompt
    ? ""
    : isIos()
      ? s.installIos
      : s.installGeneric;
  document.getElementById("install-offline").textContent = s.installOffline;
  installBtn.hidden = !deferredInstallPrompt;
  installBtn.textContent = s.installButton;
}

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  renderInstallBox();
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  installBox.hidden = true;
});

installBtn.addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  renderInstallBox();
});

document.getElementById("install-close").addEventListener("click", () => {
  storage.set(INSTALL_TOAST_KEY, "1");
  installBox.hidden = true;
});

// Service worker: cache do app e das imagens já vistas, para uso offline.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      /* offline/cache indisponível — o site continua funcionando online */
    });
  });
}

const RARITY_ORDER = ["Rare", "Epic", "Legendary", "Mythic"];

// Barra segmentada: cada raridade contribui com uma fatia na sua cor.
function renderProgressBar(bar, byRarity, total) {
  const s = t();
  bar.innerHTML = RARITY_ORDER.map((rarity) => {
    const count = byRarity[rarity] || 0;
    const width = total === 0 ? 0 : (count / total) * 100;
    return `<div class="progress-seg" style="width:${width}%; background:${RARITY_COLORS[rarity]}"
                 title="${s.rarities[rarity]}: ${count}"></div>`;
  }).join("");
}

function renderProgress() {
  let total = 0;
  const owned = { count: 0, byRarity: {} };
  const mastered = { count: 0, byRarity: {} };

  const tally = (bucket, rarity, flag) => {
    if (!flag) return;
    bucket.count += 1;
    bucket.byRarity[rarity] = (bucket.byRarity[rarity] || 0) + 1;
  };

  ELEMENTALS.forEach((e) => {
    if (e.upcoming) return; // não lançados não contam no progresso
    const entry = getEntry(e.id);
    total += 1 + e.variants.length;
    tally(owned, e.rarity, entry.owned);
    tally(mastered, e.rarity, entry.mastered);
    e.variants.forEach((v) => {
      const state = getVariantEntry(entry, v.id);
      tally(owned, e.rarity, state.owned);
      tally(mastered, e.rarity, state.mastered);
    });
  });

  const s = t();
  renderProgressBar(progressBarOwned, owned.byRarity, total);
  renderProgressBar(progressBarMastered, mastered.byRarity, total);
  progressLabelOwned.textContent = s.progressOwned(owned.count, total);
  progressLabelMastered.textContent = s.progressMastered(mastered.count, total);
}

// Fallback: se a imagem da wiki não carregar, mostra o ícone SVG local.
// Sem SVG local (ex.: Sprites "Em breve", que não têm ícone desenhado),
// mostra a inicial do nome — mesmo comportamento do menu de navegação.
function iconFallback(img, id) {
  const holder = img.closest(".elemental-icon");
  if (!holder) return;
  const elemental = ELEMENTALS.find((e) => e.id === id);
  holder.innerHTML =
    ELEMENTAL_ICONS[id] ||
    `<span class="nav-letter">${elemental ? elemental.name[lang][0] : "?"}</span>`;
}
window.iconFallback = iconFallback;

// Mesmo fallback para os ícones do menu de navegação rápida.
// Sem SVG local (ex.: Elementais "Em breve"), mostra a inicial do nome.
function navIconFallback(img, id) {
  const holder = img.closest(".nav-icon");
  if (!holder) return;
  const elemental = ELEMENTALS.find((e) => e.id === id);
  holder.innerHTML =
    ELEMENTAL_ICONS[id] ||
    `<span class="nav-letter">${elemental ? elemental.name[lang][0] : "?"}</span>`;
}
window.navIconFallback = navIconFallback;

// Menu de navegação rápida: um botão com o ícone de cada Elemental base.
function renderNav() {
  spriteNavIcons.innerHTML = ELEMENTALS.map(
    (e) => `
    <button class="nav-icon${e.upcoming ? " upcoming" : ""}" type="button"
            data-nav="${e.id}" title="${e.name[lang]}" aria-label="${e.name[lang]}"
            style="--rarity-color:${RARITY_COLORS[e.rarity]}">
      <img src="${e.image}" alt="" width="32" height="32" loading="lazy"
           onerror="navIconFallback(this, '${e.id}')" />
    </button>`
  ).join("");
}

// Recolhido: uma linha rolável. Expandido: várias linhas com todos os ícones.
const NAV_OPEN_KEY = "fortnite-elementals-nav-open";
let navExpanded = storage.get(NAV_OPEN_KEY) !== "0";

function renderNavToggle() {
  const s = t();
  spriteNav.classList.toggle("expanded", navExpanded);
  spriteNavToggle.textContent = navExpanded ? "▴" : "▾";
  const label = navExpanded ? s.navCollapse : s.navExpand;
  spriteNavToggle.title = label;
  spriteNavToggle.setAttribute("aria-label", label);
  spriteNavToggle.setAttribute("aria-expanded", navExpanded ? "true" : "false");
  updateCardScrollOffset();
}

// A barra de navegação é sticky e muda de altura entre recolhida (uma
// linha) e expandida (várias linhas). Guarda essa altura numa variável CSS
// para os cards saberem quanto espaço reservar ao rolar até eles, em vez de
// precisar recolher a barra antes de navegar.
function updateCardScrollOffset() {
  const navTop = parseFloat(getComputedStyle(spriteNav).top) || 0;
  const offset = navTop + spriteNav.offsetHeight + 8;
  document.documentElement.style.setProperty("--card-scroll-offset", `${offset}px`);
}
window.addEventListener("resize", updateCardScrollOffset);

function setNavExpanded(value) {
  navExpanded = value;
  storage.set(NAV_OPEN_KEY, value ? "1" : "0");
  renderNavToggle();
}

spriteNavToggle.addEventListener("click", () => {
  setNavExpanded(!navExpanded);
});

spriteNav.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-nav]");
  if (!btn) return;

  const id = btn.dataset.nav;
  let card = document.getElementById(`card-${id}`);
  if (!card) {
    // O card está oculto pelo filtro atual — limpa o filtro para navegar.
    activeFilter = "all";
    [...filterTabs.children].forEach((el) =>
      el.classList.toggle("active", el.dataset.rarity === "all")
    );
    render();
    card = document.getElementById(`card-${id}`);
  }
  if (!card) return;

  card.scrollIntoView({ behavior: "smooth", block: "start" });
  // Reinicia a animação de destaque mesmo em cliques repetidos.
  card.classList.remove("nav-flash");
  void card.offsetWidth;
  card.classList.add("nav-flash");
});

function variantImgFallback(img) {
  img.style.visibility = "hidden";
}
window.variantImgFallback = variantImgFallback;

function spriteTile(elemental, s, { variantId, name, image, title, state }) {
  const checkbox = (action, checked, label) => `
    <label class="tile-check">
      <input type="checkbox" ${checked ? "checked" : ""}
             ${elemental.upcoming ? "disabled" : ""}
             data-action="${action}" data-id="${elemental.id}"
             data-variant="${variantId}" />
      ${label}
    </label>`;

  return `
    <div class="sprite-tile${state.owned ? " owned" : ""}${state.mastered ? " mastered" : ""}"
         title="${title}">
      <img class="tile-img" src="${image}" alt="" width="36" height="36"
           loading="lazy" onerror="variantImgFallback(this)" />
      <span class="tile-name">${name}</span>
      <div class="tile-checks">
        ${checkbox("own", state.owned, s.owned)}
        ${checkbox("master", state.mastered, s.mastered)}
      </div>
    </div>`;
}

function collectionTiles(elemental, entry, s) {
  // Quadradinho do Sprite base em cima, um para cada variante abaixo.
  // Com um filtro de coleção ativo, só os quadradinhos que passam no
  // filtro aparecem (ex.: "Não tenho" lista apenas o que falta).
  const byTile = tileFilter();

  const baseTile =
    !byTile || byTile(entry)
      ? spriteTile(elemental, s, {
          variantId: "base",
          name: s.baseVariant,
          image: elemental.image,
          title: `${elemental.name[lang]} — ${s.baseVariant}`,
          state: entry,
        })
      : "";

  const variantTiles = elemental.variants
    .filter((v) => !byTile || byTile(getVariantEntry(entry, v.id)))
    .map((v) =>
      spriteTile(elemental, s, {
        variantId: v.id,
        name: v.name[lang],
        image: v.image,
        title: `${v.name[lang]} — ${v.effect[lang]}`,
        state: getVariantEntry(entry, v.id),
        isBase: false,
      })
    )
    .join("");

  return `
    <div class="variants">
      <span class="variants-label">${s.collectionLabel}</span>
      <div class="sprite-tiles">${baseTile}${variantTiles}</div>
    </div>`;
}

function createCard(elemental) {
  const s = t();
  const entry = getEntry(elemental.id);
  const card = document.createElement("article");
  card.id = `card-${elemental.id}`;
  card.className = "elemental-card" + (entry.owned ? " owned" : "");
  card.style.setProperty("--rarity-color", RARITY_COLORS[elemental.rarity]);

  card.innerHTML = `
    <div class="card-head">
      <div class="elemental-icon">
        <img src="${elemental.image}" alt="${elemental.name[lang]}" width="56" height="56"
             loading="lazy" onerror="iconFallback(this, '${elemental.id}')" />
      </div>
      <div class="card-title">
        <h3 class="elemental-name">${elemental.name[lang]}</h3>
        <span class="rarity-badge">${s.rarities[elemental.rarity]}</span>
        ${elemental.upcoming ? `<span class="upcoming-badge">${s.upcoming}</span>` : ""}
      </div>
    </div>
    <p class="elemental-ability">${elemental.ability[lang]}</p>
    ${collectionTiles(elemental, entry, s)}
    <div class="costs-block" title="${s.costTitle}">
      <span class="variants-label">${s.costLabel}</span>
      <div class="elemental-costs">
        <span>💠 ${s.baseVariant}: ${fmtNumber(elemental.dust)}</span>
        ${
          elemental.variants.length
            ? `<span>🪙 ${s.costVariants}: ${fmtNumber(elemental.variantCost)}</span>`
            : ""
        }
      </div>
    </div>
    <button class="favorite-btn ${entry.favorite ? "active" : ""}" data-action="favorite" data-id="${elemental.id}" title="${s.favorite}">
      ${entry.favorite ? "★" : "☆"}
    </button>
  `;

  return card;
}

function render() {
  const visible = sortElementals(ELEMENTALS.filter((e) => matchesFilter(e)));

  grid.innerHTML = "";
  visible.forEach((elemental) => grid.appendChild(createCard(elemental)));

  emptyState.hidden = visible.length > 0;
  renderProgress();
}

grid.addEventListener("click", (e) => {
  const target = e.target.closest("[data-action]");
  if (!target) return;

  const id = target.dataset.id;
  const action = target.dataset.action;

  if (action === "own" || action === "master") {
    const variantId = target.dataset.variant;
    const checked = target.checked;
    const entry = getEntry(id);

    // "Dominado" marcado implica "Possui"; desmarcar "Possui" limpa "Dominado".
    const apply = (state) => {
      if (action === "master") {
        return { owned: checked ? true : state.owned, mastered: checked };
      }
      return { owned: checked, mastered: checked ? state.mastered : false };
    };

    if (variantId === "base") {
      setEntry(id, apply(entry));
    } else {
      const variants = { ...entry.variants };
      variants[variantId] = apply(getVariantEntry(entry, variantId));
      setEntry(id, { variants });
    }
    render();
  } else if (action === "favorite") {
    setEntry(id, { favorite: !getEntry(id).favorite });
    render();
  }
});

// ---- Exportar resumo da coleção como PNG ----
// Desenha tudo em canvas com formas e texto (sem imagens externas: as da
// wiki são cross-origin e "sujariam" o canvas, impedindo o toBlob).
// Cores fixas do tema escuro, iguais às de styles.css.
const EXPORT_COLORS = {
  bg: "#0f1115",
  surface: "#1a1d24",
  border: "#2b2f38",
  text: "#f2f3f5",
  muted: "#9aa1ac",
  star: "#f2a33d",
  rarity: {
    Rare: "#5b9bd5",
    Epic: "#b16fe0",
    Legendary: "#f2a33d",
    Mythic: "#ef5b7c",
  },
};

// Ajusta o texto ao espaço SEM usar o maxWidth do fillText: no WebKit/Safari
// textos maiores que o maxWidth podem simplesmente não ser desenhados
// (quadrinhos "vazios" no resumo). Mede de verdade: diminui a fonte até
// caber e, em último caso, corta com reticências. Deixa ctx.font ajustada.
function fitText(ctx, text, maxWidth, size, weight, font) {
  for (let s = size; s >= 8; s--) {
    ctx.font = `${weight} ${s}px ${font}`;
    if (ctx.measureText(text).width <= maxWidth) return text;
  }
  let cut = text;
  while (cut.length > 1 && ctx.measureText(`${cut}…`).width > maxWidth) {
    cut = cut.slice(0, -1);
  }
  return `${cut}…`;
}

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.rect(x, y, w, h);
  }
}

// Carrega uma imagem da wiki com CORS liberado para poder desenhá-la no
// canvas sem "sujá-lo". O ?cors=1 evita colidir com as respostas opacas já
// guardadas pelo service worker. Resolve null se falhar ou demorar demais —
// nesse caso a linha usa a bolinha colorida com a inicial.
function loadCorsImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    let settled = false;
    const done = (ok) => {
      if (!settled) {
        settled = true;
        resolve(ok ? img : null);
      }
    };
    img.onload = () => done(true);
    img.onerror = () => done(false);
    setTimeout(() => done(false), 5000);
    img.src = `${url}${url.includes("?") ? "&" : "?"}cors=1`;
  });
}

async function exportSummary() {
  const s = t();
  const c = EXPORT_COLORS;
  const list = ELEMENTALS.filter((e) => !e.upcoming);

  // Ícones oficiais dos Sprites (os que falharem viram bolinha + inicial).
  const icons = await Promise.all(list.map((e) => loadCorsImage(e.image)));

  const W = 840;
  const HEADER = 196;
  const ROW = 46;
  const FOOTER = 44;
  const H = HEADER + list.length * ROW + FOOTER;

  const canvas = document.createElement("canvas");
  const scale = 2; // nitidez em telas retina e no zoom
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext("2d");
  ctx.scale(scale, scale);

  const FONT = '-apple-system, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = c.bg;
  ctx.fillRect(0, 0, W, H);

  // Totais: tenho / não tenho e dominados / não dominados (de um total
  // que conta o Base e cada variante de todos os Elementais lançados).
  const { total, owned, mastered } = computeTotals(collection);

  ctx.fillStyle = c.text;
  ctx.font = `700 24px ${FONT}`;
  ctx.textBaseline = "middle";
  ctx.fillText(s.title, 24, 34);

  const date = new Date().toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US");
  ctx.font = `400 14px ${FONT}`;
  ctx.fillStyle = c.muted;
  ctx.fillText(`${date} — ${s.exportTotal(total)}`, 24, 62);

  // Números grandes, um bloco por total.
  const stats = [
    { value: owned, label: `✓ ${s.tabOwned}`, color: "#7dd3fc" },
    { value: total - owned, label: s.tabNotOwned, color: c.muted },
    { value: mastered, label: `★ ${s.tabMastered}`, color: c.star },
    { value: total - mastered, label: s.tabNotMastered, color: c.muted },
  ];
  stats.forEach((stat, i) => {
    const x = 24 + i * 200;
    ctx.fillStyle = stat.color;
    ctx.font = `700 42px ${FONT}`;
    ctx.fillText(String(stat.value), x, 116);
    ctx.fillStyle = c.muted;
    ctx.font = `600 13px ${FONT}`;
    ctx.fillText(stat.label, x, 150);
  });

  ctx.strokeStyle = c.border;
  ctx.beginPath();
  ctx.moveTo(24, HEADER - 14);
  ctx.lineTo(W - 24, HEADER - 14);
  ctx.stroke();

  // Uma linha por Elemental: bolinha na cor da raridade com a inicial,
  // nome e um chip por quadradinho (Base + variantes).
  const NAME_X = 62;
  const CHIPS_X = 218;
  const CHIP_W = 72;
  const CHIP_H = 26;
  const CHIP_GAP = 4;

  list.forEach((e, i) => {
    const y = HEADER + i * ROW + ROW / 2;
    const entry = getEntry(e.id);
    const color = c.rarity[e.rarity];

    if (icons[i]) {
      ctx.drawImage(icons[i], 21, y - 17, 34, 34);
    } else {
      ctx.beginPath();
      ctx.arc(38, y, 13, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.fillStyle = c.bg;
      ctx.font = `700 13px ${FONT}`;
      ctx.textAlign = "center";
      ctx.fillText(e.name[lang][0].toUpperCase(), 38, y + 1);
      ctx.textAlign = "left";
    }

    ctx.fillStyle = c.text;
    const name = fitText(ctx, e.name[lang], CHIPS_X - NAME_X - 12, 15, 700, FONT);
    ctx.fillText(name, NAME_X, y);

    const items = [
      { label: s.baseVariant, state: entry },
      ...e.variants.map((v) => ({
        label: v.name[lang],
        state: getVariantEntry(entry, v.id),
      })),
    ];

    items.forEach((item, j) => {
      const x = CHIPS_X + j * (CHIP_W + CHIP_GAP);
      roundedRect(ctx, x, y - CHIP_H / 2, CHIP_W, CHIP_H, 7);
      if (item.state.owned) {
        ctx.fillStyle = color;
        ctx.fill();
        ctx.fillStyle = c.bg;
      } else {
        ctx.fillStyle = c.surface;
        ctx.fill();
        ctx.strokeStyle = c.border;
        ctx.stroke();
        ctx.fillStyle = c.muted;
      }
      const mark = item.state.mastered ? "★ " : item.state.owned ? "✓ " : "";
      const label = fitText(ctx, `${mark}${item.label}`, CHIP_W - 14, 11, 600, FONT);
      ctx.fillText(label, x + 8, y + 1);
    });
  });

  // Rodapé.
  ctx.fillStyle = c.muted;
  ctx.font = `400 12px ${FONT}`;
  ctx.fillText("fortnite-elementais — GitHub Pages", 24, H - FOOTER / 2);

  // Mostra a imagem num visualizador com opção de baixar,
  // em vez de disparar o download direto.
  canvas.toBlob((blob) => {
    if (!blob) return;
    exportBlob = blob;
    exportCopyBtn.textContent = s.exportCopy;
    exportUrl = URL.createObjectURL(blob);
    exportImg.src = exportUrl;
    exportDownloadLink.href = exportUrl;
    exportDownloadLink.download = `${s.exportFile}-${new Date()
      .toISOString()
      .slice(0, 10)}.png`;
    exportOverlay.hidden = false;
  }, "image/png");
}

const exportOverlay = document.getElementById("export-overlay");
const exportImg = document.getElementById("export-img");
const exportDownloadLink = document.getElementById("export-download");
const exportCopyBtn = document.getElementById("export-copy");
const exportShareBtn = document.getElementById("export-share");
let exportUrl = null;
let exportBlob = null;

// Copiar imagem só existe onde o navegador suporta imagem no clipboard
// (Chrome/Edge/Safari; Firefox ainda não).
exportCopyBtn.hidden = !(navigator.clipboard && window.ClipboardItem);

exportCopyBtn.addEventListener("click", async () => {
  if (!exportBlob) return;
  try {
    await navigator.clipboard.write([
      new ClipboardItem({ "image/png": exportBlob }),
    ]);
    exportCopyBtn.textContent = t().exportCopied;
    setTimeout(() => {
      exportCopyBtn.textContent = t().exportCopy;
    }, 2000);
  } catch {
    /* usuário negou permissão ou o clipboard falhou — mantém o botão */
  }
});

// Compartilhar (Web Share API com arquivo) só existe onde o navegador
// suporta compartilhar imagens — sobretudo celular (Android/iOS); a maioria
// dos navegadores desktop não implementa canShare com arquivos.
function canShareFiles() {
  if (!navigator.canShare) return false;
  try {
    return navigator.canShare({
      files: [new File([""], "x.png", { type: "image/png" })],
    });
  } catch {
    return false;
  }
}
// Onde dá pra compartilhar arquivo, o botão de compartilhar substitui o de
// baixar (no celular, compartilhar já cobre "salvar" como uma das opções).
const shareSupported = canShareFiles();
exportShareBtn.hidden = !shareSupported;
exportDownloadLink.hidden = shareSupported;

exportShareBtn.addEventListener("click", async () => {
  if (!exportBlob) return;
  const file = new File([exportBlob], exportDownloadLink.download || "sprites.png", {
    type: "image/png",
  });
  try {
    // Só o arquivo — sem title/text, pra não anexar texto no compartilhamento.
    await navigator.share({ files: [file] });
  } catch {
    /* usuário cancelou o compartilhamento — sem tratamento especial */
  }
});

function closeExportOverlay() {
  exportOverlay.hidden = true;
  exportImg.removeAttribute("src");
  if (exportUrl) {
    URL.revokeObjectURL(exportUrl);
    exportUrl = null;
  }
}

document.getElementById("export-close").addEventListener("click", closeExportOverlay);
exportOverlay.addEventListener("click", (e) => {
  // Clique no fundo escuro (fora da caixa) também fecha.
  if (e.target === exportOverlay) closeExportOverlay();
});

document.getElementById("export-btn").addEventListener("click", () => {
  exportSummary();
});

// ---- Aba dos códigos do Painel de Admin ----
const viewTabs = document.getElementById("view-tabs");
const viewSprites = document.getElementById("view-sprites");
const viewCodes = document.getElementById("view-codes");
const codesBody = document.getElementById("codes-body");
const codesProgressBar = document.getElementById("codes-progress-bar");
const codesProgressLabel = document.getElementById("codes-progress-label");

const codesDone = () =>
  CHEAT_CODES.filter((c) => redeemedCodes[c.id] === true).length;

function renderCodes() {
  const s = t();
  codesBody.innerHTML = CHEAT_CODES.map((c) => {
    const done = redeemedCodes[c.id] === true;
    return `
      <tr class="code-row${done ? " done" : ""}">
        <td class="code-check-cell">
          <input type="checkbox" class="code-check" ${done ? "checked" : ""}
                 data-code="${c.id}" aria-label="${s.codesThDone}" />
        </td>
        <td>
          <div class="code-cell">
            <code class="code-text">${c.code}</code>
            ${c.isNew ? `<span class="code-new">${s.codesNew}</span>` : ""}
            <button class="code-copy" type="button" data-copy="${c.id}"
                    title="${s.codesCopy}" aria-label="${s.codesCopy}">⧉</button>
          </div>
        </td>
        <td>
          <span class="code-reward">${c.reward[lang]}</span>
          ${c.note ? `<span class="code-note">${c.note[lang]}</span>` : ""}
        </td>
      </tr>`;
  }).join("");

  const done = codesDone();
  const total = CHEAT_CODES.length;
  const width = total === 0 ? 0 : (done / total) * 100;
  codesProgressBar.innerHTML = `<div class="progress-seg" style="width:${width}%; background:var(--accent)"></div>`;
  codesProgressLabel.textContent = s.codesProgress(done, total);
}

function applyView() {
  viewSprites.hidden = activeView !== "sprites";
  viewCodes.hidden = activeView !== "codes";
  [...viewTabs.children].forEach((tab) =>
    tab.classList.toggle("active", tab.dataset.view === activeView)
  );
  // O menu de navegação rápida é grudento e só faz sentido com a grade.
  spriteNav.hidden = activeView !== "sprites";
  if (activeView === "codes") renderCodes();
}

viewTabs.addEventListener("click", (e) => {
  const tab = e.target.closest("[data-view]");
  if (!tab || tab.dataset.view === activeView) return;
  activeView = tab.dataset.view;
  storage.set(VIEW_KEY, activeView);
  applyView();
});

codesBody.addEventListener("click", async (e) => {
  const copy = e.target.closest("[data-copy]");
  if (copy) {
    const entry = CHEAT_CODES.find((c) => c.id === copy.dataset.copy);
    if (!entry) return;
    try {
      await navigator.clipboard.writeText(entry.code);
      copy.textContent = "✓";
      setTimeout(() => {
        copy.textContent = "⧉";
      }, 1500);
    } catch {
      // Sem clipboard: seleciona o texto do código para copiar na mão.
      const range = document.createRange();
      range.selectNodeContents(copy.closest(".code-cell").querySelector(".code-text"));
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
});

codesBody.addEventListener("change", (e) => {
  const box = e.target.closest(".code-check");
  if (!box) return;
  if (box.checked) redeemedCodes[box.dataset.code] = true;
  else delete redeemedCodes[box.dataset.code];
  saveCodes();
  renderCodes();
});

// ---- Backup: levar a coleção inteira de um aparelho para outro ----
// Diferente do código de comparação, que é enxuto e omite o que não interessa
// ao amigo, o backup é FIEL: leva favoritos e os Sprites "Em breve" também,
// porque o objetivo é o aparelho novo ficar idêntico ao antigo.
const BACKUP_APP = "fortnite-sprites-locker";
const BACKUP_VERSION = 1;

// btoa/atob trabalham byte a byte: passar direto uma string com acento
// gera "InvalidCharacterError". Converte para UTF-8 antes (e de volta na
// leitura). O laço evita estourar a pilha que o spread causaria.
function toBase64Url(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(code) {
  const binary = atob(code.replace(/-/g, "+").replace(/_/g, "/"));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

// `codes` foi acrescentado depois, mantendo a versão 1 de propósito: é um
// campo novo e opcional, então backups gerados antes dele continuam válidos
// (importam com nenhum código resgatado) em vez de virarem "inválidos".
function encodeBackup() {
  return toBase64Url(
    JSON.stringify({
      app: BACKUP_APP,
      v: BACKUP_VERSION,
      exportedAt: new Date().toISOString(),
      collection,
      codes: redeemedCodes,
    })
  );
}

const bool = (value) => value === true;

// Normaliza o que veio de fora: só booleanos, só os campos conhecidos.
// Ids desconhecidos são MANTIDOS de propósito — o outro aparelho pode estar
// numa versão mais nova, com Sprites que este ainda não tem, e descartá-los
// perderia progresso de verdade.
function sanitizeCollection(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const clean = {};
  Object.entries(raw).forEach(([id, entry]) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) return;
    const variants = {};
    Object.entries(entry.variants || {}).forEach(([variantId, state]) => {
      // Formato antigo da variante: booleano em vez de objeto.
      if (typeof state === "boolean") {
        variants[variantId] = { owned: state, mastered: false };
      } else if (state && typeof state === "object") {
        variants[variantId] = {
          owned: bool(state.owned),
          mastered: bool(state.mastered),
        };
      }
    });
    clean[id] = {
      owned: bool(entry.owned),
      mastered: bool(entry.mastered),
      favorite: bool(entry.favorite),
      variants,
    };
  });
  return clean;
}

// Aceita as duas formas que o usuário tem em mãos: o código de uma linha
// (copiar/colar) e o JSON do arquivo baixado. Nunca lança — devolve null.
function decodeBackup(text) {
  const trimmed = (text || "").trim();
  if (!trimmed) return null;
  let payload = null;
  try {
    payload = JSON.parse(trimmed);
  } catch {
    try {
      payload = JSON.parse(fromBase64Url(trimmed));
    } catch {
      return null;
    }
  }
  if (!payload || payload.app !== BACKUP_APP) return null;
  if (Number(payload.v) !== BACKUP_VERSION) return null;
  const collectionPart = sanitizeCollection(payload.collection);
  if (!collectionPart) return null;
  return { collection: collectionPart, codes: sanitizeCodes(payload.codes) };
}

// Quantas marcações um backup tem — é o número que o usuário reconhece
// ("tenho 20 coisas marcadas") e o que a confirmação de importar mostra.
// Conta os códigos resgatados junto, já que o backup leva os dois.
function countBackupMarks(backup) {
  return (
    countMarks(backup.collection) + Object.keys(backup.codes || {}).length
  );
}

function countMarks(source) {
  let total = 0;
  Object.values(source || {}).forEach((entry) => {
    if (entry.owned) total += 1;
    if (entry.mastered) total += 1;
    if (entry.favorite) total += 1;
    Object.values(entry.variants || {}).forEach((state) => {
      if (state.owned) total += 1;
      if (state.mastered) total += 1;
    });
  });
  return total;
}

// União: na dúvida, mantém o marcado. Importar juntando nunca desmarca nada.
function mergeCollections(mine, theirs) {
  const merged = {};
  const ids = new Set([...Object.keys(mine), ...Object.keys(theirs)]);
  ids.forEach((id) => {
    const a = mine[id] || {};
    const b = theirs[id] || {};
    const variants = {};
    const variantIds = new Set([
      ...Object.keys(a.variants || {}),
      ...Object.keys(b.variants || {}),
    ]);
    variantIds.forEach((variantId) => {
      const va = (a.variants || {})[variantId] || {};
      const vb = (b.variants || {})[variantId] || {};
      variants[variantId] = {
        owned: bool(va.owned) || bool(vb.owned),
        mastered: bool(va.mastered) || bool(vb.mastered),
      };
    });
    merged[id] = {
      owned: bool(a.owned) || bool(b.owned),
      mastered: bool(a.mastered) || bool(b.mastered),
      favorite: bool(a.favorite) || bool(b.favorite),
      variants,
    };
  });
  return merged;
}

// ---- Compartilhar/comparar coleção com um amigo (sem backend) ----
const shareOverlay = document.getElementById("share-overlay");
const shareLinkInput = document.getElementById("share-link-input");
const shareCopyBtn = document.getElementById("share-copy-btn");
const sharePasteInput = document.getElementById("share-paste-input");
const sharePasteBtn = document.getElementById("share-paste-btn");
const sharePasteError = document.getElementById("share-paste-error");
const compareOverlay = document.getElementById("compare-overlay");
const compareStats = document.getElementById("compare-stats");
const compareOnlyYou = document.getElementById("compare-only-you");
const compareOnlyThem = document.getElementById("compare-only-them");

function openShareModal() {
  const s = t();
  shareLinkInput.value = `${location.origin}${location.pathname}#c=${encodeCollectionCode()}`;
  shareCopyBtn.textContent = s.shareCopyLink;
  sharePasteInput.value = "";
  sharePasteError.hidden = true;
  shareOverlay.hidden = false;
}

function closeShareModal() {
  shareOverlay.hidden = true;
}

// Aceita tanto o link inteiro colado quanto só o código puro.
function parseSharePaste(text) {
  const trimmed = (text || "").trim();
  const match = trimmed.match(/[#?]c=([^&\s]+)/);
  return match ? match[1] : trimmed;
}

// A comparação só olha para "tenho": "dominado" não entra na conta.
function statTile(label, totals) {
  const s = t();
  return `
    <div class="compare-stat">
      <span class="compare-stat-label">${label}</span>
      <span class="compare-stat-value">${s.progressOwned(totals.owned, totals.total)}</span>
    </div>`;
}

function compareListColumn(title, labels) {
  const s = t();
  const body = labels.length
    ? `<ul class="compare-list">${labels.map((l) => `<li>${l}</li>`).join("")}</ul>`
    : `<p class="compare-list-empty">${s.compareNone}</p>`;
  return `<h3>${title}</h3>${body}`;
}

// Nunca mexe em collection/localStorage: theirCollection só existe como
// variável local, passada por parâmetro para os helpers somente-leitura.
function openCompareModal(theirCollection) {
  const s = t();
  const rows = diffCollections(collection, theirCollection);

  compareStats.innerHTML =
    statTile(s.compareYou, computeTotals(collection)) +
    statTile(s.compareThem, computeTotals(theirCollection));

  const onlyMine = [];
  const onlyTheirs = [];
  rows.forEach((row) => {
    row.tiles.forEach((tile) => {
      const label = `${row.elemental.name[lang]} — ${tile.name}`;
      if (tile.status === "mine") onlyMine.push(label);
      if (tile.status === "theirs") onlyTheirs.push(label);
    });
  });

  compareOnlyYou.innerHTML = compareListColumn(s.compareOnlyYou, onlyMine);
  compareOnlyThem.innerHTML = compareListColumn(s.compareOnlyThem, onlyTheirs);

  closeShareModal();
  compareOverlay.hidden = false;
}

function closeCompareModal() {
  compareOverlay.hidden = true;
  // Tira o #c=... da URL para um refresh não reabrir a comparação —
  // o estado por baixo nunca foi tocado, então "normal" já está intacto.
  history.replaceState(null, "", location.pathname + location.search);
}

// Ao abrir um link de comparação recebido: decodifica e mostra o modal.
// Falhou (link corrompido/inválido)? Ignora silenciosamente — não é um erro
// do usuário no boot da página, e nada foi alterado na coleção dele.
// Também reage a "hashchange": se a página já estava aberta em index.html
// (sem hash) e o link chega na MESMA aba, o navegador trata como navegação
// same-document — só dispara hashchange, sem recarregar o script.
function readShareHashOnLoad() {
  const match = location.hash.match(/^#c=(.+)$/);
  if (!match) return;
  const theirCollection = decodeCollectionCode(match[1]);
  if (!theirCollection) return;
  openCompareModal(theirCollection);
}
window.addEventListener("hashchange", readShareHashOnLoad);

document.getElementById("share-btn").addEventListener("click", openShareModal);
document.getElementById("share-close").addEventListener("click", closeShareModal);
shareOverlay.addEventListener("click", (e) => {
  if (e.target === shareOverlay) closeShareModal();
});

shareCopyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(shareLinkInput.value);
    shareCopyBtn.textContent = t().exportCopied;
    setTimeout(() => {
      shareCopyBtn.textContent = t().shareCopyLink;
    }, 2000);
  } catch {
    // Sem permissão/API de clipboard: seleciona o texto para Ctrl+C manual.
    shareLinkInput.select();
  }
});

sharePasteBtn.addEventListener("click", () => {
  const code = parseSharePaste(sharePasteInput.value);
  const theirCollection = code ? decodeCollectionCode(code) : null;
  if (!theirCollection) {
    sharePasteError.textContent = t().compareInvalidCode;
    sharePasteError.hidden = false;
    return;
  }
  openCompareModal(theirCollection);
});

document.getElementById("compare-close").addEventListener("click", closeCompareModal);
compareOverlay.addEventListener("click", (e) => {
  if (e.target === compareOverlay) closeCompareModal();
});

// ---- Modal de backup ----
const backupOverlay = document.getElementById("backup-overlay");
const backupCodeInput = document.getElementById("backup-code-input");
const backupCopyBtn = document.getElementById("backup-copy-btn");
const backupDownload = document.getElementById("backup-download");
const backupPasteInput = document.getElementById("backup-paste-input");
const backupImportBtn = document.getElementById("backup-import-btn");
const backupFileInput = document.getElementById("backup-file-input");
const backupError = document.getElementById("backup-error");
const backupConfirm = document.getElementById("backup-confirm");
const backupConfirmText = document.getElementById("backup-confirm-text");
const backupDone = document.getElementById("backup-done");

// Coleção decodificada aguardando o usuário escolher substituir ou juntar.
let pendingBackup = null;
// URL do Blob do arquivo .json; revogada ao fechar, para não vazar memória.
let backupFileUrl = null;

function openBackupModal() {
  const s = t();
  const code = encodeBackup();
  backupCodeInput.value = code;

  if (backupFileUrl) URL.revokeObjectURL(backupFileUrl);
  const blob = new Blob([fromBase64Url(code)], { type: "application/json" });
  backupFileUrl = URL.createObjectURL(blob);
  backupDownload.href = backupFileUrl;
  backupDownload.download = `${s.backupFileName}-${new Date()
    .toISOString()
    .slice(0, 10)}.json`;

  backupCopyBtn.textContent = s.backupCopy;
  backupPasteInput.value = "";
  backupFileInput.value = "";
  backupError.hidden = true;
  backupDone.hidden = true;
  backupConfirm.hidden = true;
  pendingBackup = null;
  backupOverlay.hidden = false;
}

function closeBackupModal() {
  backupOverlay.hidden = true;
  if (backupFileUrl) {
    URL.revokeObjectURL(backupFileUrl);
    backupFileUrl = null;
  }
  pendingBackup = null;
}

function backupFail(message) {
  backupError.textContent = message;
  backupError.hidden = false;
  backupConfirm.hidden = true;
  pendingBackup = null;
}

// Importar sobrescreve dados do aparelho: nunca aplica direto — mostra os
// números dos dois lados e deixa o usuário escolher substituir ou juntar.
function proposeBackup(text) {
  const s = t();
  backupDone.hidden = true;
  const theirs = decodeBackup(text);
  if (!theirs) return backupFail(s.backupInvalid);
  const theirMarks = countBackupMarks(theirs);
  if (theirMarks === 0) return backupFail(s.backupEmpty);

  pendingBackup = theirs;
  backupError.hidden = true;
  backupConfirmText.textContent = s.backupConfirm(
    countBackupMarks({ collection, codes: redeemedCodes }),
    theirMarks
  );
  backupConfirm.hidden = false;
}

function applyBackup(merge) {
  if (!pendingBackup) return;
  collection = merge
    ? mergeCollections(collection, pendingBackup.collection)
    : pendingBackup.collection;
  // Códigos resgatados são só booleanos: juntar é somar as chaves.
  redeemedCodes = merge
    ? { ...redeemedCodes, ...pendingBackup.codes }
    : { ...pendingBackup.codes };
  saveCollection(collection);
  saveCodes();
  pendingBackup = null;
  backupConfirm.hidden = true;
  backupPasteInput.value = "";
  backupFileInput.value = "";
  backupDone.textContent = t().backupDone(
    countBackupMarks({ collection, codes: redeemedCodes })
  );
  backupDone.hidden = false;
  render();
  applyView();
  // O código exportado precisa refletir a coleção nova, caso o usuário
  // queira repassar este aparelho adiante sem fechar o modal.
  backupCodeInput.value = encodeBackup();
}

document.getElementById("backup-btn").addEventListener("click", openBackupModal);
document.getElementById("backup-close").addEventListener("click", closeBackupModal);
backupOverlay.addEventListener("click", (e) => {
  if (e.target === backupOverlay) closeBackupModal();
});

backupCopyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(backupCodeInput.value);
    backupCopyBtn.textContent = t().exportCopied;
    setTimeout(() => {
      backupCopyBtn.textContent = t().backupCopy;
    }, 2000);
  } catch {
    // Sem permissão/API de clipboard: seleciona para o Ctrl+C manual.
    backupCodeInput.select();
  }
});

backupImportBtn.addEventListener("click", () => {
  proposeBackup(backupPasteInput.value);
});

backupFileInput.addEventListener("change", () => {
  const file = backupFileInput.files && backupFileInput.files[0];
  if (!file) return;
  file
    .text()
    .then((text) => proposeBackup(text))
    .catch(() => backupFail(t().backupInvalid));
});

document.getElementById("backup-merge-btn").addEventListener("click", () => {
  applyBackup(true);
});
document.getElementById("backup-replace-btn").addEventListener("click", () => {
  applyBackup(false);
});
document.getElementById("backup-cancel-btn").addEventListener("click", () => {
  pendingBackup = null;
  backupConfirm.hidden = true;
});

// Botão flutuante de voltar ao topo: aparece depois de rolar um pouco.
window.addEventListener(
  "scroll",
  () => {
    backToTop.hidden = window.scrollY < 400;
  },
  { passive: true }
);

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

filterTabs.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-tab");
  if (!btn) return;

  const clicked = btn.dataset.rarity;
  // Clicar no filtro já ativo desfaz o filtro (volta para "Todos").
  activeFilter = clicked !== "all" && clicked === activeFilter ? "all" : clicked;
  [...filterTabs.children].forEach((el) =>
    el.classList.toggle("active", el.dataset.rarity === activeFilter)
  );
  render();
});

document.getElementById("refresh-btn").addEventListener("click", () => {
  window.location.reload();
});

document.getElementById("sort-select").addEventListener("change", (e) => {
  sortMode = e.target.value;
  storage.set(SORT_KEY, sortMode);
  render();
});

langSwitch.addEventListener("click", (e) => {
  const btn = e.target.closest(".lang-btn");
  if (!btn || btn.dataset.lang === lang) return;

  lang = btn.dataset.lang;
  storage.set(LANG_KEY, lang);
  applyLanguage();
  render();
  applyView(); // recompõe a tabela de códigos no idioma novo
});

applyLanguage();
render();
applyView();
readShareHashOnLoad();
