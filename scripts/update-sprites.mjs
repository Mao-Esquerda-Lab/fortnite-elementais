#!/usr/bin/env node
// Detecta Sprites novos e os acrescenta em data/elementals-auto.js (só
// adiciona, nunca remove). Roda diariamente no GitHub Actions
// (.github/workflows/update-sprites.yml).
//
// FONTES (mudou em 22/ago/2026):
//   1. wiki do IGN — PRINCIPAL. É a única que lista os Sprites da Temporada
//      4 (Override), com a seção "Unreleased Sprites List" dos que ainda não
//      saíram e com a arte de cada variante.
//   2. Fortnite Wiki (Fandom) — SECUNDÁRIA e best-effort. Só serve para a
//      raridade, que o IGN não publica por Sprite. O WAF da Fandom responde
//      403 para clientes não-navegador (inclusive dos IPs do Actions), então
//      a falha dela NÃO derruba a execução: sem ela, os Sprites novos entram
//      com raridade "Unknown" e a curadoria manual preenche depois.
//
// Uso:
//   node scripts/update-sprites.mjs                   # busca as páginas reais
//   node scripts/update-sprites.mjs --fixture x.html  # usa HTML do IGN local
//
// Sai com código != 0 quando a fonte principal não pôde ser lida ou o parse
// parece quebrado — nesses casos NADA é escrito (fail-closed).

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MANUAL_FILE = join(ROOT, "data", "elementals.js");
const AUTO_FILE = join(ROOT, "data", "elementals-auto.js");
const CODES_MANUAL_FILE = join(ROOT, "data", "cheat-codes.js");
const CODES_AUTO_FILE = join(ROOT, "data", "cheat-codes-auto.js");

// O WAF da Fandom bloqueia clientes "não navegador" (ver pages.yml).
const UA =
  "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0";

const PAGE = "Sprites";
const API_URL = `https://fortnite.fandom.com/api.php?action=parse&page=${PAGE}&prop=wikitext&format=json`;
const RAW_URL = `https://fortnite.fandom.com/wiki/${PAGE}?action=raw`;

// Fonte principal: o wiki do IGN da temporada atual. Ao virar a temporada,
// troque esta URL pela página nova (o título traz o capítulo/temporada).
const IGN_URL =
  "https://www.ign.com/wikis/fortnite/" +
  "Sprites_Checklist_and_Guide_(Chapter_7_Season_4)_-_All_Variants_List";

// Segunda página do IGN: os códigos do Painel de Admin. Ao virar a
// temporada, confira se ela continua sendo a lista da temporada corrente.
const IGN_CODES_URL =
  "https://www.ign.com/wikis/fortnite/" +
  "All_Admin_Panel_Lobby_Hack_Codes_For_Free_Rewards";

// O IGN serve a arte do wiki dele por este CDN.
const IGN_IMAGE = /https:\/\/oyster\.ignimgs\.com\/mediawiki\/apis\.ign\.com\/fortnite\/[0-9a-f]\/[0-9a-f]{2}\/Fortnite_([a-z0-9_]+)_sprite\.png/g;

// O app cobre apenas Sprites do Chapter 7 em diante.
const MIN_CHAPTER = 7;

// Sprites confirmados como de capítulos anteriores (fora do escopo do app),
// citados na página sem contexto de capítulo detectável. Remova daqui se
// algum deles ganhar uma versão do Chapter 7+.
const EXCLUDED_SPRITES = [
  "Dash Sprite",
  "Superman Sprite",
  // Sprites de temporadas anteriores à 4 (Override), removidos do app a
  // pedido do usuário em 20/ago/2026 — o app cobre só a temporada atual.
  // A wiki continua listando-os (é um catálogo histórico), então sem essa
  // exclusão o scraper tentaria "readicioná-los" como se fossem novos.
  "Water Sprite",
  "Earth Sprite",
  "Fire Sprite",
  "Fishy Sprite",
  "Air Sprite",
  "Duck Sprite",
  "Ghost Sprite",
  "Demon Sprite",
  "King Sprite",
  "Aura Sprite",
  "Striker Sprite",
  "Dream Sprite",
  "Punk Sprite",
  "Boss Sprite",
  "Peeky Peely Sprite",
  "Lootin' Llama Sprite",
  "Seven Sprite",
  "Zero Point Sprite",
  "Burnt Peanut",
  "Grim Sprite",
  "Batman Sprite",
  "Pollo Sprite",
  "Vini Jr. Sprite",
  "Ironmouse Sprite",
  "John Wick Sprite",
];

// Prefixos de variantes: "Gold Water Sprite" não é um Sprite novo.
const VARIANT_PREFIXES = [
  "Base",
  "Gold",
  // Variante exclusiva da Temporada 4 — sem isto, "Cheat Master Klombo
  // Sprite" entraria como se fosse um Sprite novo.
  "Cheat Master",
  "Gummy",
  "Galaxy",
  "Gem",
  "Holofoil",
  "Cube",
  "Quack",
  "Rift",
];

const RARITIES = ["Mythic", "Legendary", "Epic", "Rare"];

// Custos (invocação / variantes) por raridade, iguais aos da lista manual.
const COSTS = {
  Rare: { dust: 100, variantCost: 4000 },
  Epic: { dust: 3000, variantCost: 6000 },
  Legendary: { dust: 5000, variantCost: 10000 },
  Mythic: { dust: 7500, variantCost: 15000 },
};

// Se o parse "encontrar" mais novidades que isso de uma vez, é quase certo
// que o formato da página mudou e o parser quebrou — aborta sem escrever.
const MAX_NEW_PER_RUN = 10;

// Travas da lista de códigos. Marcar como expirado é a única operação que
// "tira" algo do app, então ela é a mais desconfiada das duas: se a página
// vier com poucos códigos (parse quebrado, página de erro) ou se muitos
// sumirem de uma vez, nada é escrito.
const MIN_CODES_ON_PAGE = 8;
const MAX_EXPIRED_PER_RUN = 5;

async function fetchWikitext() {
  const attempts = [
    async () => {
      const res = await fetch(API_URL, { headers: { "User-Agent": UA } });
      if (!res.ok) throw new Error(`api.php HTTP ${res.status}`);
      const data = await res.json();
      const text = data?.parse?.wikitext?.["*"];
      if (!text) throw new Error("api.php sem wikitext na resposta");
      return text;
    },
    async () => {
      const res = await fetch(RAW_URL, { headers: { "User-Agent": UA } });
      if (!res.ok) throw new Error(`action=raw HTTP ${res.status}`);
      return res.text();
    },
  ];

  let lastError;
  for (const attempt of attempts) {
    try {
      return await attempt();
    } catch (err) {
      lastError = err;
      console.warn(`Tentativa de download falhou: ${err.message}`);
    }
  }
  throw new Error(`Não consegui baixar a página ${PAGE}: ${lastError.message}`);
}

async function fetchIgnHtml() {
  const res = await fetch(IGN_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`IGN HTTP ${res.status}`);
  return res.text();
}

// O HTML do wiki chega escapado dentro do payload JSON do Next.js do IGN.
const unescapeIgn = (raw) =>
  raw
    .replace(/\\u003c/g, "<")
    .replace(/\\u003e/g, ">")
    .replace(/\\u0026/g, "&")
    .replace(/\\"/g, '"')
    .replace(/\\n/g, "\n");

// Divide a página nas seções <h2> para saber quais Sprites estão sob o
// bloco de não lançados ("Upcoming Sprites List" / "Unreleased Sprites List").
function ignSections(html) {
  const sections = [];
  const pattern = /<h2>\s*<span class="mw-headline"[^>]*>([^<]+)<\/span>/g;
  let current = { title: "", start: 0 };
  let match;
  while ((match = pattern.exec(html)) !== null) {
    current.end = match.index;
    sections.push(current);
    current = { title: match[1].trim(), start: match.index };
  }
  current.end = html.length;
  sections.push(current);
  return sections;
}

const IGN_VARIANT_SLUGS = { gold_: "gold", cheat_master_: "cheat-master" };

// Extrai de um nome de arquivo do IGN ("Fortnite_gold_klombo_sprite.png") o
// Sprite base e a variante — devolve null para nomes fora do padrão.
function ignImageTarget(slug) {
  for (const [prefix, variant] of Object.entries(IGN_VARIANT_SLUGS)) {
    if (slug.startsWith(prefix)) return { variant, base: slug.slice(prefix.length) };
  }
  return { variant: "base", base: slug };
}

const compact = (text) => text.toLowerCase().replace(/[^a-z0-9]/g, "");

// Devolve Map: "X Sprite" -> { upcoming, image, variantImages }.
function parseIgnSprites(rawHtml) {
  const html = unescapeIgn(rawHtml);
  const found = new Map();

  for (const section of ignSections(html)) {
    const body = html.slice(section.start, section.end);
    // O bloco de não lançados é marcado tanto pelo heading quanto pelo
    // cabeçalho da tabela — aceitar os dois evita quebrar se o IGN mexer
    // em um deles.
    const upcoming =
      /unreleased|upcoming/i.test(section.title) ||
      /Unreleased Sprites List/i.test(body);

    for (const match of body.matchAll(/<b>([A-Z0-9][^<]{0,40}? Sprite)<\/b>/g)) {
      const name = match[1].trim();
      if (startsWithVariant(name)) continue;
      if (EXCLUDED_SPRITES.includes(name)) continue;
      if (!found.has(name)) found.set(name, { upcoming, variantImages: {} });
    }

    IGN_IMAGE.lastIndex = 0;
    for (const match of body.matchAll(IGN_IMAGE)) {
      const { variant, base } = ignImageTarget(match[1]);
      for (const [name, record] of found) {
        if (compact(name.replace(/ Sprite$/, "")) !== compact(base)) continue;
        if (variant === "base") record.image = match[0];
        else record.variantImages[variant] = match[0];
      }
    }
  }
  return found;
}

// Avalia os arquivos de dados do app (JS puro e autossuficiente) para obter
// a lista atual de Sprites conhecidos.
function loadKnownElementals() {
  const manual = readFileSync(MANUAL_FILE, "utf8");
  const auto = readFileSync(AUTO_FILE, "utf8");
  return new Function(`${manual}\n${auto}\n;return ELEMENTALS;`)();
}

function loadAutoEntries() {
  const auto = readFileSync(AUTO_FILE, "utf8");
  return new Function(
    `const ELEMENTALS=[],WIKI_ITEM=()=>"",makeVariants=()=>[];` +
      `${auto}\n;return AUTO_ELEMENTALS;`
  )();
}

const startsWithVariant = (name) =>
  VARIANT_PREFIXES.some((p) => name === p || name.startsWith(`${p} `));

// Extrai os nomes "X Sprite" citados na página (links, templates e arquivos),
// junto com a raridade encontrada na mesma linha, quando houver.
// Só aceita Sprites do Chapter >= MIN_CHAPTER: o capítulo vem da subpágina
// do link ([[X Sprite/Chapter 6|...]]) ou, na falta dela, do heading de
// seção mais recente que cite um capítulo. Sem contexto nenhum, aceita.
function parseSprites(wikitext) {
  const found = new Map(); // nome -> raridade | null

  // ":" fora das classes evita capturar prefixos como "File:".
  // O grupo 2 do padrão de link é a subpágina (ex.: "Chapter 7").
  const linkPattern =
    /\[\[([A-Z][^[\]|#/{}:\n]*? Sprite)(?:\/([^[\]|]*))?(?:\|[^[\]]*)?\]\]/g;
  const otherPatterns = [
    // {{Item|Water Sprite|...}} e afins
    /\{\{[^{}|]*\|\s*([A-Z][^{}|=:\n]*? Sprite)\s*[|}]/g,
    // File:Water Sprite - Item - Fortnite.png
    /([A-Z][^[\]{}|=:\n]*? Sprite) - Item - Fortnite\.(?:png|webp|jpg)/g,
  ];

  const chapterOf = (text) => {
    const m = text && text.match(/Chapter\s*(\d+)/i);
    return m ? Number(m[1]) : null;
  };

  let sectionChapter = null; // último heading que citou um capítulo

  for (const line of wikitext.split("\n")) {
    const heading = line.match(/^=+\s*(.+?)\s*=+\s*$/);
    if (heading) {
      const chapter = chapterOf(heading[1]);
      if (chapter !== null) sectionChapter = chapter;
      continue;
    }

    const rarity =
      RARITIES.find((r) => new RegExp(`\\b${r}\\b`, "i").test(line)) || null;

    const add = (rawName, explicitChapter) => {
      const name = rawName.trim();
      if (startsWithVariant(name)) return;
      if (EXCLUDED_SPRITES.includes(name)) return;
      const chapter = explicitChapter ?? sectionChapter;
      if (chapter !== null && chapter < MIN_CHAPTER) return;
      if (!found.has(name) || (rarity && !found.get(name))) {
        found.set(name, rarity);
      }
    };

    linkPattern.lastIndex = 0;
    for (const match of line.matchAll(linkPattern)) {
      add(match[1], chapterOf(match[2]));
    }
    for (const pattern of otherPatterns) {
      pattern.lastIndex = 0;
      for (const match of line.matchAll(pattern)) {
        add(match[1], null);
      }
    }
  }
  return found;
}

// ---- Códigos do Painel de Admin (segunda fonte, mesma página-mãe) ----

async function fetchIgnCodesHtml() {
  const res = await fetch(IGN_CODES_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`IGN (códigos) HTTP ${res.status}`);
  return res.text();
}

// O HTML do IGN traz entidades numéricas (&#x2022; nos bullets) que o
// replace de tags sozinho não resolve.
const unescapeEntities = (text) =>
  text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

// Extrai as linhas de texto "limpas" de uma célula da tabela (tags viram
// quebra de linha, entidades são resolvidas, linhas em branco somem).
const cellLines = (cell) =>
  unescapeEntities(cell.replace(/<[^>]+>/g, "\n"))
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

// Cada código ocupa duas linhas da tabela (mudou em 03/set/2026): a
// primeira traz o código dentro de <checkbox copyable="true">, a segunda
// tem o rótulo "Reward:" e a recompensa. Sem o atributo copyable, o
// <checkbox> é só um nome de recompensa (ex.: um Sprite ganho), não código.
const CODE_ROW = /<checkbox copyable="true"[^>]*>([^<]+)<\/checkbox>/;
const REWARD_ROW =
  /class="gh-blue-cell"[^>]*>\s*Reward:[\s\S]*?<td[^>]*>([\s\S]*?)<\/td>/;

// Devolve Map: id -> { code, isNew, note, reward }.
function parseIgnCodes(rawHtml) {
  const html = unescapeIgn(rawHtml);
  const found = new Map();

  const rows = [...html.matchAll(/<tr>(.*?)<\/tr>/gs)].map((m) => m[1]);
  for (let i = 0; i < rows.length; i++) {
    const codeMatch = rows[i].match(CODE_ROW);
    if (!codeMatch) continue;

    const code = codeMatch[1].trim();
    // Os códigos do jogo são alfanuméricos; qualquer outra coisa é texto
    // solto que não deve virar entrada.
    if (!/^[A-Za-z0-9]{4,32}$/.test(code)) continue;

    const id = slug(code);
    // A página renderiza a mesma tabela duas vezes; vale a primeira.
    if (found.has(id)) continue;

    const rewardMatch = (rows[i + 1] || "").match(REWARD_ROW);
    if (!rewardMatch) continue;
    const right = cellLines(rewardMatch[1]);
    if (!right.length) continue;

    found.set(id, {
      code,
      isNew: /NEW CODE/i.test(rows[i]),
      note: null,
      // Recompensas com mais de um item vêm em bullets separados.
      reward: right.map((line) => line.replace(/^•\s*/, "")).join(" e "),
    });
  }
  return found;
}

function loadKnownCodes() {
  const manual = readFileSync(CODES_MANUAL_FILE, "utf8");
  let auto = "";
  try {
    auto = readFileSync(CODES_AUTO_FILE, "utf8");
  } catch {
    // Primeira execução: o arquivo automático ainda não existe.
  }
  return new Function(`${manual}\n${auto}\n;return CHEAT_CODES;`)();
}

function loadAutoCodes() {
  let auto = "";
  try {
    auto = readFileSync(CODES_AUTO_FILE, "utf8");
  } catch {
    return [];
  }
  return new Function(
    `const CHEAT_CODES=[];${auto}\n;return AUTO_CHEAT_CODES;`
  )();
}

// Código novo entra sem tradução: o texto em PT repete o inglês até alguém
// curar, do mesmo jeito que Sprite novo entra com "ainda não revelada".
function makeCodeEntry(id, info, today) {
  const entry = {
    id,
    code: info.code,
    autoAdded: today,
    reward: { pt: info.reward, en: info.reward },
    untranslated: true,
  };
  if (info.isNew) entry.isNew = true;
  if (info.note) entry.note = { pt: info.note, en: info.note };
  return entry;
}

function writeCodesAutoFile(entries, expiredIds) {
  const content = `// ARQUIVO GERADO AUTOMATICAMENTE — não edite à mão.
// Gerado por scripts/update-sprites.mjs (workflow update-sprites.yml), que
// lê a página de códigos do Painel de Admin no wiki do IGN todo dia.
//
// AUTO_CHEAT_CODES: códigos que ainda não estão em data/cheat-codes.js.
// Entram com a recompensa em inglês nos dois idiomas (untranslated: true)
// até serem curados — para curar, MOVA a entrada para data/cheat-codes.js
// traduzindo o texto: o gerador pula o que já está na lista manual e a
// cópia daqui some na próxima execução.
//
// AUTO_EXPIRED_CODES: ids que o IGN deixou de listar. Ficam visíveis no app
// marcados como expirados, em vez de sumirem — assim dá para saber que não
// adianta mais tentar. Se um código voltar à página, sai desta lista sozinho.
const AUTO_CHEAT_CODES = ${JSON.stringify(entries, null, 2)};

const AUTO_EXPIRED_CODES = ${JSON.stringify(expiredIds, null, 2)};

AUTO_CHEAT_CODES.forEach((c) => {
  if (!CHEAT_CODES.some((x) => x.id === c.id)) CHEAT_CODES.push(c);
});

// Reatribui sempre (e não só marca): um código que reaparecer na página sai
// da lista de expirados e volta a valer.
const AUTO_EXPIRED_SET = new Set(AUTO_EXPIRED_CODES);
CHEAT_CODES.forEach((c) => {
  c.expired = AUTO_EXPIRED_SET.has(c.id);
});
`;
  writeFileSync(CODES_AUTO_FILE, content);
}

// Devolve o resumo do que mudou (ou null quando nada muda), já tendo
// escrito o arquivo. Erros de rede/parse sobem para quem chama.
async function updateCodes(fixtureHtml, today) {
  const html = fixtureHtml ?? (await fetchIgnCodesHtml());
  const parsed = parseIgnCodes(html);
  console.log(`Códigos citados no IGN: ${parsed.size}`);

  // Fail-closed 1: página curta demais é parse quebrado ou página de erro.
  if (parsed.size < MIN_CODES_ON_PAGE) {
    throw new Error(
      `Parse suspeito: só ${parsed.size} códigos na página ` +
        `(mínimo ${MIN_CODES_ON_PAGE}). Nada foi alterado.`
    );
  }

  const known = loadKnownCodes();
  const knownIds = new Set(known.map((c) => c.id));

  const newIds = [...parsed.keys()].filter((id) => !knownIds.has(id));
  const expiredIds = known
    .filter((c) => !parsed.has(c.id))
    .map((c) => c.id)
    .sort();

  // Fail-closed 2: muitos sumindo de uma vez é sinal de página reformulada,
  // não de expiração real.
  const newlyExpired = expiredIds.filter(
    (id) => !known.find((c) => c.id === id)?.expired
  );
  if (newlyExpired.length > MAX_EXPIRED_PER_RUN) {
    throw new Error(
      `Parse suspeito: ${newlyExpired.length} códigos sumiriam de uma vez ` +
        `(limite ${MAX_EXPIRED_PER_RUN}). Nada foi alterado.`
    );
  }

  const unexpired = known
    .filter((c) => c.expired && parsed.has(c.id))
    .map((c) => c.id);

  if (!newIds.length && !newlyExpired.length && !unexpired.length) {
    console.log("Nenhum código novo nem expirado — nada a fazer.");
    return null;
  }

  const entries = [
    ...loadAutoCodes(),
    ...newIds.map((id) => makeCodeEntry(id, parsed.get(id), today)),
  ];
  writeCodesAutoFile(entries, expiredIds);
  return {
    added: newIds.map((id) => parsed.get(id).code),
    expired: newlyExpired,
    unexpired,
  };
}

const slug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function makeEntry(wikiName, info, today) {
  const display = wikiName.replace(/ Sprite$/, "");
  const rarity = info.rarity || "Unknown";
  const costs = COSTS[rarity];
  const entry = {
    id: slug(display),
    name: { pt: display, en: display },
    wikiName,
    rarity,
    // Marca a origem e a data para facilitar a curadoria manual.
    autoAdded: today,
    ability: {
      pt: "Habilidade ainda não revelada.",
      en: "Ability not yet revealed.",
    },
    // A Temporada 4 só tem estas duas variantes (ver SPRITE_VARIANTS e
    // EXTRA_VARIANTS em data/elementals.js).
    onlyVariants: ["gold", "cheat-master"],
  };
  // Não lançados entram travados no app (selo "Em breve", caixinhas
  // desabilitadas) e sem custo: a Epic ainda não divulgou nenhum.
  if (info.upcoming) entry.upcoming = true;
  if (costs) {
    entry.dust = costs.dust;
    entry.variantCost = costs.variantCost;
  }
  // A Fandom não tem a arte destes Sprites; quando o IGN tem, usa a dele.
  if (info.image) entry.image = info.image;
  if (info.variantImages && Object.keys(info.variantImages).length) {
    entry.variantImages = info.variantImages;
  }
  return entry;
}

function writeAutoFile(entries) {
  const body = JSON.stringify(entries, null, 2);
  const content = `// ARQUIVO GERADO AUTOMATICAMENTE — não edite à mão.
// Gerado por scripts/update-sprites.mjs (workflow update-sprites.yml), que
// consulta a página "Sprites" da Fortnite Wiki todo dia e ADICIONA aqui os
// Sprites do Chapter 7 em diante que ainda não existem em
// data/elementals.js. Sprites de capítulos anteriores ficam fora do app.
//
// Para traduzir/curar um Sprite desta lista (nome em PT, habilidade,
// variantes especiais etc.), MOVA a entrada para data/elementals.js: o
// gerador pula Sprites que já estão na lista manual e a cópia daqui some na
// próxima execução.
const AUTO_ELEMENTALS = ${body};

// Anexa à lista principal os que ainda não existem lá, montando imagem e
// variantes com os mesmos helpers de data/elementals.js.
AUTO_ELEMENTALS.forEach((e) => {
  if (ELEMENTALS.some((x) => x.id === e.id || x.wikiName === e.wikiName)) {
    return;
  }
  e.image = e.image || WIKI_ITEM(e.wikiName);
  e.variants = e.noVariants ? [] : makeVariants(e);
  ELEMENTALS.push(e);
});
`;
  writeFileSync(AUTO_FILE, content);
}

async function updateSprites(fixtureHtml, today) {
  const ignHtml = fixtureHtml ?? (await fetchIgnHtml());

  const known = loadKnownElementals();
  const knownNames = new Set(known.map((e) => e.wikiName));
  // Só os Sprites já lançados servem de trava de sanidade: os "Em breve"
  // podem sair da lista de não lançados a qualquer momento (é justamente o
  // que acontece quando lançam). A denylist também fica de fora, para dados
  // antigos não conflitarem com ela.
  const releasedNames = known
    .filter((e) => !e.upcoming && !EXCLUDED_SPRITES.includes(e.wikiName))
    .map((e) => e.wikiName);

  const parsed = parseIgnSprites(ignHtml);
  console.log(`Sprites citados no IGN: ${parsed.size}`);
  for (const [name, info] of parsed) {
    console.log(`  - ${name}${info.upcoming ? " (não lançado)" : ""}`);
  }

  // Fail-closed: todos os Sprites já lançados precisam continuar aparecendo
  // na página. Se algum sumiu, ou a página mudou de formato, ou recebemos
  // uma página de erro/bloqueio — não mexe em nada.
  const missing = releasedNames.filter((n) => !parsed.has(n));
  if (missing.length > 0) {
    throw new Error(
      `Parse suspeito: o IGN não lista mais ${missing.join(", ")}. ` +
        "Nada foi alterado."
    );
  }

  const newNames = [...parsed.keys()].filter((n) => !knownNames.has(n));
  if (newNames.length > MAX_NEW_PER_RUN) {
    throw new Error(
      `Parse suspeito: ${newNames.length} Sprites "novos" de uma vez ` +
        `(limite ${MAX_NEW_PER_RUN}). Nada foi alterado.`
    );
  }

  if (newNames.length === 0) {
    console.log("Nenhum Sprite novo — nada a fazer.");
    return;
  }

  // A raridade só existe na Fandom, e ela costuma bloquear os IPs do
  // Actions: se não vier, o Sprite entra com "Unknown" e a curadoria manual
  // preenche. Nunca derruba a execução.
  const rarities = await fetchRarities(newNames);

  const entries = [
    ...loadAutoEntries(),
    ...newNames.map((n) =>
      makeEntry(n, { ...parsed.get(n), rarity: rarities.get(n) }, today)
    ),
  ];
  writeAutoFile(entries);
  console.log(`Adicionados: ${newNames.join(", ")}`);
}

// Best-effort: devolve Map nome -> raridade com o que a Fandom souber dizer
// sobre os Sprites informados. Erro de rede/WAF vira Map vazio, com aviso.
async function fetchRarities(names) {
  const found = new Map();
  let wikitext;
  try {
    wikitext = await fetchWikitext();
  } catch (err) {
    console.warn(
      `Sem raridades da Fandom (${err.message}). ` +
        'Os Sprites novos entram como "Unknown".'
    );
    return found;
  }
  const parsed = parseSprites(wikitext);
  for (const name of names) {
    const rarity = parsed.get(name);
    if (rarity) found.set(name, rarity);
  }
  return found;
}

// As duas fontes são independentes: uma quebrar não impede a outra de
// atualizar. O processo só sai com erro no fim, para o Actions marcar a
// execução como falha e alguém olhar.
async function main() {
  const fixture = (flag) => {
    const idx = process.argv.indexOf(flag);
    return idx === -1 ? null : readFileSync(process.argv[idx + 1], "utf8");
  };
  const today = new Date().toISOString().slice(0, 10);
  const failures = [];

  try {
    await updateSprites(fixture("--fixture"), today);
  } catch (err) {
    console.error(`Sprites: ${err.message}`);
    failures.push("Sprites");
  }

  try {
    const changed = await updateCodes(fixture("--codes-fixture"), today);
    if (changed) {
      if (changed.added.length)
        console.log(`Códigos adicionados: ${changed.added.join(", ")}`);
      if (changed.expired.length)
        console.log(`Códigos marcados como expirados: ${changed.expired.join(", ")}`);
      if (changed.unexpired.length)
        console.log(`Códigos que voltaram à página: ${changed.unexpired.join(", ")}`);
    }
  } catch (err) {
    console.error(`Códigos: ${err.message}`);
    failures.push("Códigos");
  }

  if (failures.length) {
    throw new Error(`Falhou em: ${failures.join(" e ")}.`);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
