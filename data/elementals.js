// Dados dos Elementais ("Sprites") do Fortnite Battle Royale.
// ESCOPO: apenas a Temporada 5 "Treasure Hunters" (Chapter 7, a partir de
// 01/nov/2026) — os Sprites da Temporada 4 "Override" e anteriores foram
// removidos a pedido do usuário (histórico no git); só ficam os desta.
// Fonte: cobertura da comunidade (spritecatch.com etc.) no dia do
// lançamento — a Epic não publicou raridades oficiais e o IGN/wiki ainda
// não listam esses Sprites. Raridade, custos e textos em PT são
// PROVISÓRIOS e devem ser conferidos no cliente pt-BR.
// Esta é a lista CURADA (nomes em PT, habilidades, exceções de variantes).
// Os nomes e textos em PT devem ser os DO JOGO (pt-BR), não traduções
// livres: "Killswitch" é "Disruptor" e "Cheat Master" é "Trapaceiro" no
// cliente brasileiro. Sites de fã (spritelocker, IGN) traduzem por conta
// própria e divergem — servem para raridade/arte, não para o texto em PT.
// Sprites novos chegam sozinhos via data/elementals-auto.js (workflow
// update-sprites.yml) e devem ser movidos para cá ao serem traduzidos.
//
// As imagens vêm da Fortnite Wiki via Special:FilePath (redireciona para o
// arquivo atual da wiki). Os arquivos seguem o padrão
// "{Nome} - Item - Fortnite.png" (ex.: "Water Sprite - Item - Fortnite.png",
// "Gold Water Sprite - Item - Fortnite.png"). Se uma imagem falhar, o app
// usa o ícone SVG local como fallback.
// Quando esse padrão não bate com o nome real do arquivo na wiki (Sprite
// muito novo, nome de exibição diferente do nome do arquivo etc.), dá pra
// definir `image` direto na entrada do Elemental com um link completo —
// ela nunca é sobrescrita pela URL adivinhada (ver ELEMENTALS.forEach no
// fim do arquivo).
const WIKI_ITEM = (fileBase) =>
  `https://fortnite.fandom.com/wiki/Special:FilePath/${encodeURIComponent(
    `${fileBase} - Item - Fortnite.png`
  )}`;

// O IGN e a Fortnite Wiki não tinham os arquivos dos Sprites da Temporada 5
// no lançamento. A arte (256x256) veio do spritecatch.com e fica no próprio
// repositório, em img/sprites/{id}-{base|fortune|cursed}.png — assim não
// depende de site de terceiros, funciona offline e não trava a imagem de
// resumo por CORS. Quando o IGN/wiki publicarem a arte oficial, dá pra
// trocar `image`/`variantImages` por links completos.
const IGN_ITEM = (fileBase) =>
  `https://oyster.ignimgs.com/mediawiki/apis.ign.com/fortnite/${fileBase}.png`;
const IGN_ART = {};

const ignArt = (elementalId, variantId) => {
  const art = IGN_ART[elementalId];
  return art && art[variantId] ? IGN_ITEM(art[variantId]) : null;
};

// Todas as variantes herdam a raridade do Sprite base. A Temporada 5 usa
// Valioso (Fortune) + Amaldiçoado (Cursed) (`onlyVariants`). O Dourado volta em 12/nov/2026,
// mas a Epic não disse em quais Sprites — só entra no `onlyVariants`
// quando for confirmado.
//
// Custo de invocação por raridade (tabela do hotfix de 24/jul/2026,
// ESTIMATIVA — nenhuma fonte cita o valor exato desta temporada): Raro
// 100/2700; Épico 2700/4000; Lendário 4500/6750; Mítico 6750/10000.
const SPRITE_VARIANTS = [
  {
    id: "gold",
    name: { pt: "Dourado", en: "Gold" },
    effect: {
      pt: "3x XP bônus em eliminações",
      en: "3x bonus XP on eliminations",
    },
  },
];

// Variantes exclusivas da Temporada 5. Nomes em PT são tradução nossa
// provisória — corrigir ao conferir no cliente pt-BR.
const EXTRA_VARIANTS = {
  fortune: {
    id: "fortune",
    name: { pt: "Valioso", en: "Fortune" },
    effect: {
      pt: "Revela os baús por perto.",
      en: "Reveals nearby Chests.",
    },
  },
  cursed: {
    id: "cursed",
    name: { pt: "Amaldiçoado", en: "Cursed" },
    effect: {
      pt: "Aumenta a chance de achar variantes raras de Sprites, mas a água causa dano enquanto está equipada.",
      en: "Improves your odds of finding rare Sprite variants, but water damages you while equipped.",
    },
  },
};

const variantImage = (elemental, v) =>
  (elemental.variantImages && elemental.variantImages[v.id]) ||
  ignArt(elemental.id, v.id) ||
  WIKI_ITEM(`${v.name.en} ${elemental.wikiName}`);

const resolveVariant = (id) =>
  SPRITE_VARIANTS.find((v) => v.id === id) || EXTRA_VARIANTS[id];

const makeVariants = (elemental) => {
  // `onlyVariants`: lista explícita de variantes. `lockedVariants`: já
  // anunciada mas ainda não colecionável (aparece com cadeado no app).
  const unlocked = elemental.onlyVariants
    ? elemental.onlyVariants.map(resolveVariant)
    : [
        ...SPRITE_VARIANTS,
        ...(elemental.extraVariants || []).map((id) => EXTRA_VARIANTS[id]),
      ];
  const locked = (elemental.lockedVariants || []).map((id) => ({
    ...resolveVariant(id),
    locked: true,
  }));
  return [...unlocked, ...locked].map((v) => ({
    ...v,
    image: variantImage(elemental, v),
  }));
};

// Os 11 Sprites de lançamento (01/nov/2026). Novos Sprites (ex.: Lil' Uzi
// Vert Jr., previsto ~07/nov) chegam via data/elementals-auto.js ou entram
// aqui com `upcoming: true` até serem lançados.
const COSTS = {
  Rare: { dust: 100, variantCost: 2700 },
  Epic: { dust: 2700, variantCost: 4000 },
  Legendary: { dust: 4500, variantCost: 6750 },
  Mythic: { dust: 6750, variantCost: 10000 },
};
const S5 = ["fortune", "cursed"];
const ELEMENTALS = [
  ["halfpeel-d", "Halfpeel'd", "Rare", S5,
    "Marca eliminações no mapa; o alcance de detecção aumenta a cada nível.",
    "Marks eliminations on the map, with a detection range that grows each level.", "Descascadinho"],
  ["re-pete", "Re-Pete", "Rare", S5,
    "Recarrega mais rápido, com chance de recuperar munição.",
    "Reloads faster, with a chance to get ammo back.", "Repetácio"],
  ["barry-o-fish", "Barry O'Fish", "Rare", S5,
    "Gasta menos estamina ao correr na água; ganha efeito de Tapa no nível máximo.",
    "Uses less stamina sprinting in water; gains a Slap effect at max level.", "Barrilson"],
  ["wayfinder", "Wayfinder", "Epic", S5,
    "Mostra Sprites por perto e adiciona saque extra aos Baús Enterrados.",
    "Shows nearby Sprites; adds extra loot to Buried Chests.", "Localizador"],
  ["kelper", "Kelper", "Epic", S5,
    "Cura você aos poucos na água, com mais cura a cada nível.",
    "Heals you over time in water, with bigger heals each level.", "Apatilda"],
  ["exmarks", "Exmarks", "Legendary", S5,
    "Mostra Mapas do Tesouro e Cartazes de Procurado por perto; gera um Mapa do Tesouro no nível máximo.",
    "Shows nearby Treasure Maps and Wanted Posters; spawns a Treasure Map at max level.", "Xisconde"],
  ["chester", "Chester", "Legendary", S5,
    "Baús podem gerar saque extra; cancela o dano de queda.",
    "Chests may spawn extra loot; cancels fall damage.", "Baunardo"],
  ["lil-squibbly", "Lil' Squibbly", "Legendary", S5,
    "Pule em buracos de pesca para ganhar peixes e saque bônus.",
    "Jump into fishing holes for fish and bonus loot.", "Polvitozinho"],
  ["lil-flacko", "Lil' Flacko", "Legendary", S5,
    "Ao pousar, cria uma pequena onda de choque que empurra os oponentes.",
    "Landing creates a small shockwave that knocks opponents back.", "Flacko Jr."],
  ["plundarrgh", "Plundarrgh", "Mythic", S5,
    "Abrir baús aumenta a velocidade da picareta e de movimento.",
    "Opening Chests boosts Pickaxe and movement speed.", "Moedonho"],
  ["sweet-dreams", "Sweet Dreams", "Mythic", [],
    "Concede um item aleatório a cada nível; saque Mítico no nível máximo.",
    "Grants a random item each level-up, with Mythic loot at max level."],
  // Raridade Lendário confirmada pelo usuário (custos estimados pela tabela
  // por raridade). Variantes não confirmadas (GameRant lista só a base; a
  // Destructoid diz que todos os Sprites têm Valioso/Amaldiçoado).
  // Nome em PT confirmado pelo usuário.
  ["transponder-snail", "Transponder Snail", "Legendary", [],
    "Concede recursos extras ao coletar itens, para você e seu grupo; o bônus aumenta a cada nível.",
    "Get extra resources from pickups for yourself and all party members; the bonus grows each level.", "Caracol Telepático"],
].map(([id, en, rarity, variants, pt, abEn, namePt]) => ({
  id,
  name: { pt: namePt || en, en },
  wikiName: `${en} Sprite`,
  rarity,
  ...(variants.length ? { onlyVariants: variants } : { noVariants: true }),
  ability: { pt, en: abEn },
  ...COSTS[rarity],
  image: `img/sprites/${id}-base.png`,
  variantImages: Object.fromEntries(
    variants.map((v) => [v, `img/sprites/${id}-${v}.png`])
  ),
}));

// Número do Sprite na tela de Sprites do jogo (a Temporada 5 passou a
// numerá-los). Preencha por id; quem não tiver número vai para o fim, na
// ordem em que está na lista. O app mostra o número no cartão e usa a
// ordem numérica como padrão.
const SPRITE_NUMBERS = {
  // "halfpeel-d": 1,
};
ELEMENTALS.forEach((e) => {
  e.image = e.image || ignArt(e.id, "base") || WIKI_ITEM(e.wikiName);
  e.variants = e.noVariants ? [] : makeVariants(e);
  if (SPRITE_NUMBERS[e.id] != null) e.number = SPRITE_NUMBERS[e.id];
});
// Ordem padrão = numérica (sort estável: sem número, mantém a ordem da lista).
ELEMENTALS.sort(
  (a, b) => (a.number ?? Infinity) - (b.number ?? Infinity) || 0
);
