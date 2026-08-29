// Dados dos Elementais ("Sprites") do Fortnite Battle Royale.
// ESCOPO: apenas a Temporada 4 "Override" (Chapter 7, a partir de
// 20/ago/2026) — os Sprites de temporadas anteriores foram removidos a
// pedido do usuário; só ficam os desta.
// Fonte: cobertura da comunidade (GameSpot, Destructoid etc.), já que a
// wiki ainda não lista esses Sprites — ver nota antes da lista abaixo.
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

// A Fortnite Wiki NÃO tem os arquivos dos Sprites desta temporada — o
// Special:FilePath dela não resolve para nenhum deles, e por isso as
// imagens não carregavam. A arte vem do wiki do IGN, que tem os 12 Sprites
// nas três variantes; o hotlink a partir do domínio do Pages foi conferido.
const IGN_ITEM = (fileBase) =>
  `https://oyster.ignimgs.com/mediawiki/apis.ign.com/fortnite/${fileBase}.png`;

// Caminho da arte no CDN do IGN, por Sprite e por variante ("base" é o
// Sprite sem variante). O trecho "a/a3" é o hash do arquivo no MediaWiki
// deles: muda se a imagem for reenviada, então se alguma sumir é só pegar a
// URL nova na página do IGN. Sprite que não estiver aqui cai no WIKI_ITEM.
const IGN_ART = {
  "8-bit": {
    base: "0/0b/Fortnite_8bit_sprite",
    gold: "9/9e/Fortnite_gold_8bit_sprite",
    "cheat-master": "8/84/Fortnite_cheat_master_8bit_sprite",
  },
  "adventure": {
    base: "d/db/Fortnite_adventure_sprite",
    gold: "7/71/Fortnite_gold_adventure_sprite",
    "cheat-master": "1/19/Fortnite_cheat_master_adventure_sprite",
  },
  "bush": {
    base: "2/28/Fortnite_bush_sprite",
    gold: "f/fa/Fortnite_gold_bush_sprite",
    "cheat-master": "6/6d/Fortnite_cheat_master_bush_sprite",
  },
  "jonesy": {
    base: "e/ed/Fortnite_jonesy_sprite",
    gold: "6/68/Fortnite_gold_jonesy_sprite",
    "cheat-master": "2/2a/Fortnite_cheat_master_jonesy_sprite",
  },
  "sonic": {
    base: "a/ab/Fortnite_sonic_sprite",
    gold: "5/55/Fortnite_gold_sonic_sprite",
    "cheat-master": "7/7b/Fortnite_cheat_master_sonic_sprite",
  },
  "tails": {
    base: "8/8a/Fortnite_tails_sprite",
    gold: "7/7c/Fortnite_gold_tails_sprite",
    "cheat-master": "d/d8/Fortnite_cheat_master_tails_sprite",
  },
  "shadow": {
    base: "6/64/Fortnite_shadow_sprite",
    gold: "3/3c/Fortnite_gold_shadow_sprite",
    "cheat-master": "6/6d/Fortnite_cheat_master_shadow_sprite",
  },
  "killswitch": {
    base: "a/a0/Fortnite_killswitch_sprite",
    gold: "7/76/Fortnite_gold_killswitch_sprite",
    "cheat-master": "1/18/Fortnite_cheat_master_killswitch_sprite",
  },
  "jackrabbit": {
    base: "1/18/Fortnite_jackrabbit_sprite",
    gold: "3/3e/Fortnite_gold_jackrabbit_sprite",
    "cheat-master": "1/1f/Fortnite_cheat_master_jackrabbit_sprite",
  },
  "crown": {
    base: "b/b2/Fortnite_crown_sprite",
    gold: "5/59/Fortnite_gold_crown_sprite",
    "cheat-master": "1/17/Fortnite_cheat_master_crown_sprite",
  },
  "klombo": {
    base: "8/8e/Fortnite_klombo_sprite",
    gold: "c/ce/Fortnite_gold_klombo_sprite",
    "cheat-master": "1/1e/Fortnite_cheat_master_klombo_sprite",
  },
  "storm-scout": {
    base: "a/a3/Fortnite_storm_scout_sprite",
    gold: "6/64/Fortnite_gold_storm_scout_sprite",
    "cheat-master": "3/31/Fortnite_cheat_master_storm_scout_sprite",
  },};

const ignArt = (elementalId, variantId) => {
  const art = IGN_ART[elementalId];
  return art && art[variantId] ? IGN_ITEM(art[variantId]) : null;
};

// Todas as variantes herdam a raridade do Sprite base — são versões
// "especiais" com drop menor, não um tier de raridade próprio.
// A Temporada 4 (Override) usa um sistema de variantes novo: só Dourado +
// Cheat Master (`onlyVariants`, ver makeVariants abaixo) — nada de
// Gelatinoso/Galáctico/Gema/Metalizado/Cúbico/Pato, que eram das
// temporadas anteriores (removidas do app).
//
// Custo de invocação por raridade (tabela do hotfix de 24/jul/2026, ainda
// vigente): Raro 100/2700; Épico 2700/4000; Lendário 4500/6750;
// Mítico 6750/10000.
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

// Variante de colecionador exclusiva da Temporada 4 (Override) — substitui
// as variantes padrão nos Sprites dela (ver `onlyVariants`).
const EXTRA_VARIANTS = {
  "cheat-master": {
    id: "cheat-master",
    name: { pt: "Trapaceiro", en: "Cheat Master" },
    effect: {
      pt: "Deixa qualquer código digitado no console de Cheat Codes sempre correto, não importa o que você digite.",
      en: "Makes any input at a Cheat Code console count as correct, no matter what you type.",
    },
  },
};

// Ordem de preferência da arte de uma variante: link explícito na entrada
// (`variantImages`, usado pelo gerador automático) > tabela do IGN > nome
// adivinhado na wiki, que usa sempre o nome em inglês da variante.
const variantImage = (elemental, v) =>
  (elemental.variantImages && elemental.variantImages[v.id]) ||
  ignArt(elemental.id, v.id) ||
  WIKI_ITEM(`${v.name.en} ${elemental.wikiName}`);

const makeVariants = (elemental) => {
  // `onlyVariants`: lista explícita de variantes (substitui a regra padrão
  // Dourado/Gelatinoso/Galáctico/Gema/Metalizado + extras) — usada pelos
  // Sprites da Temporada 4, que só têm Dourado + Cheat Master.
  if (elemental.onlyVariants) {
    return elemental.onlyVariants
      .map((id) => SPRITE_VARIANTS.find((v) => v.id === id) || EXTRA_VARIANTS[id])
      .map((v) => ({ ...v, image: variantImage(elemental, v) }));
  }
  const base = SPRITE_VARIANTS.filter(
    (v) => !(elemental.noHolofoil && v.id === "holofoil")
  );
  const extras = (elemental.extraVariants || []).map((id) => EXTRA_VARIANTS[id]);
  return [...base, ...extras].map((v) => ({
    ...v,
    image: variantImage(elemental, v),
  }));
};

// A página da wiki (fonte normal do update-sprites.mjs) ainda não lista
// esses Sprites — confirmado rodando o scraper manualmente no dia do
// lançamento. Nome/raridade/habilidade vêm de cobertura da comunidade
// (GameSpot, Destructoid, IGN etc.), não das patch notes oficiais da
// Epic, então podem estar incompletos ou levemente errados até a wiki
// atualizar. Custo de invocação é uma ESTIMATIVA pela tabela de raridade
// do hotfix de 24/jul (nenhuma fonte cita valor exato pra estes ainda).
// Os Sprites ainda não lançados entram com `upcoming: true`: aparecem no
// app com o selo "Em breve", com as caixinhas travadas, e ficam de fora do
// progresso, do código de comparação e da imagem de resumo. Fonte da lista:
// a seção "Unreleased Sprites List" do wiki do IGN (checada em 22/ago/2026).
// Conforme forem lançando, é só tirar o `upcoming` e preencher raridade,
// habilidade e custos.
//
// Sprites de temporadas anteriores entram aqui de novo só se a curadoria
// futura decidir voltar a cobri-los (removidos a pedido do usuário em
// 20/ago/2026 — ver histórico do git para os dados originais).
const ELEMENTALS = [
  {
    id: "8-bit",
    name: { pt: "8-Bit", en: "8-Bit" },
    wikiName: "8-Bit Sprite",
    rarity: "Rare",
    onlyVariants: ["gold", "cheat-master"],
    ability: {
      pt: "Garante uma Espingarda 8-Bit no primeiro baú que você abrir, com multiplicador de pontuação.",
      en: "Find an 8-Bit Shotgun in your first Chest and gain a score multiplier for it.",
    },
    dust: 100,
    variantCost: 2700,
  },
  {
    id: "adventure",
    name: { pt: "Aventura", en: "Adventure" },
    wikiName: "Adventure Sprite",
    rarity: "Rare",
    onlyVariants: ["gold", "cheat-master"],
    ability: {
      pt: "Melhora um item aleatório do seu inventário a cada nível.",
      en: "Upgrade a random item in your inventory at each Level.",
    },
    dust: 100,
    variantCost: 2700,
  },
  {
    id: "bush",
    name: { pt: "Arbusto", en: "Bush" },
    wikiName: "Bush Sprite",
    rarity: "Rare",
    onlyVariants: ["gold", "cheat-master"],
    ability: {
      pt: "Cria um Arbusto em você depois de um tempo. No nível máximo, ganha outro a cada eliminação.",
      en: "Spawns a Bush on you after a duration. At max Level, gain a Bush on elimination.",
    },
    dust: 100,
    variantCost: 2700,
  },
  {
    id: "jonesy",
    name: { pt: "Jonesy", en: "Jonesy" },
    wikiName: "Jonesy Sprite",
    rarity: "Rare",
    onlyVariants: ["gold", "cheat-master"],
    ability: {
      pt: "Recupera um pouco de vida ou escudo pouco depois de levar dano.",
      en: "After a short duration, recover some Health or Shield after being damaged.",
    },
    dust: 100,
    variantCost: 2700,
  },
  {
    // Lançado em 29/ago/2026, no fim de semana da Sonic Power Hour, com as
    // três variantes de uma vez (base, Dourado e Trapaceiro). Raridade Rara
    // confirmada pela cobertura do lançamento — antes disso ficava como
    // "Unknown" porque os rastreadores divergiam entre Rara e Lendária.
    id: "storm-scout",
    name: { pt: "Storm Scout", en: "Storm Scout" },
    wikiName: "Storm Scout Sprite",
    rarity: "Rare",
    onlyVariants: ["gold", "cheat-master"],
    ability: {
      pt: "Concede Sobrecarga e Energia infinita depois que você toma 10 de dano da tempestade e, no nível máximo, revela onde os próximos círculos vão fechar.",
      en: "Grants Overdrive and unlimited Energy after you take 10 Storm damage, and at max level reveals where future circles will land.",
    },
    dust: 100,
    variantCost: 2700,
  },
  {
    id: "sonic",
    name: { pt: "Sonic", en: "Sonic" },
    wikiName: "Sonic Sprite",
    rarity: "Epic",
    onlyVariants: ["gold", "cheat-master"],
    ability: {
      pt: "Aumenta a velocidade de corrida.",
      en: "Sprint faster.",
    },
    dust: 2700,
    variantCost: 4000,
  },
  {
    id: "tails",
    name: { pt: "Tails", en: "Tails" },
    wikiName: "Tails Sprite",
    rarity: "Epic",
    onlyVariants: ["gold", "cheat-master"],
    ability: {
      pt: "Permite pairar no ar com a ajuda da cauda, anulando todo o dano de queda.",
      en: "Hover in mid-air with the help of Tails, and cancels all fall damage.",
    },
    dust: 2700,
    variantCost: 4000,
  },
  {
    id: "shadow",
    name: { pt: "Shadow", en: "Shadow" },
    wikiName: "Shadow Sprite",
    rarity: "Epic",
    onlyVariants: ["gold", "cheat-master"],
    ability: {
      pt: "Recarrega as armas automaticamente com o tempo, mesmo as que não estão equipadas.",
      en: "Automatically reload weapons over time, even when unequipped.",
    },
    dust: 2700,
    variantCost: 4000,
  },
  {
    id: "killswitch",
    name: { pt: "Disruptor", en: "Killswitch" },
    wikiName: "Killswitch Sprite",
    rarity: "Epic",
    onlyVariants: ["gold", "cheat-master"],
    ability: {
      pt: "Ative a câmera lenta com precisão melhorada ao mirar enquanto pula.",
      en: "Enter Hangtime with improved accuracy.",
    },
    dust: 2700,
    variantCost: 4000,
  },
  {
    id: "jackrabbit",
    name: { pt: "Jackrabbit", en: "Jackrabbit" },
    wikiName: "Jackrabbit Sprite",
    rarity: "Legendary",
    onlyVariants: ["gold", "cheat-master"],
    ability: {
      pt: "Permite dar mais um pulo enquanto está no ar.",
      en: "Perform another jump while mid-air.",
    },
    dust: 4500,
    variantCost: 6750,
  },
  {
    id: "crown",
    name: { pt: "Coroa", en: "Crown" },
    wikiName: "Crown Sprite",
    rarity: "Mythic",
    onlyVariants: ["gold", "cheat-master"],
    ability: {
      pt: "Ganha Coroas extras (Crown Wins) depois de uma Vitória Royale.",
      en: "Gain extra Crown Wins after getting a Victory Royale.",
    },
    dust: 6750,
    variantCost: 10000,
  },
  {
    id: "klombo",
    name: { pt: "Klombo", en: "Klombo" },
    wikiName: "Klombo Sprite",
    rarity: "Mythic",
    onlyVariants: ["gold", "cheat-master"],
    ability: {
      pt: "Concede itens aleatórios a cada nível. Só sobe de nível usando itens consumíveis que dão vida ou escudo.",
      en: "Grants random items at each level. You can only level it up by using consumable items that give Health or Shield.",
    },
    dust: 6750,
    variantCost: 10000,
  },
  // Vencedores do concurso Design-A-Sprite, confirmados pela Epic mas ainda
  // sem arte, raridade, habilidade ou custo divulgados — por isso entram só
  // com nome e autor.
  ...[
    { id: "bullet", pt: "Bala", en: "Bullet", author: "Enorull" },
    {
      id: "dumpster-dive",
      pt: "Mergulho na Lixeira",
      en: "Dumpster Dive",
      author: "StinkyPrincessGoose",
    },
    { id: "honey", pt: "Mel", en: "Honey", author: "Conejito_sam" },
    { id: "pond", pt: "Lago", en: "Pond", author: "Pine & Kiri" },
    { id: "x-ray", pt: "Raio-X", en: "X-Ray", author: "Avila215" },
  ].map((c) => ({
    id: c.id,
    name: { pt: c.pt, en: c.en },
    wikiName: `${c.en} Sprite`,
    rarity: "Unknown",
    upcoming: true,
    noVariants: true,
    ability: {
      pt: `Vencedor do concurso Design-A-Sprite (por ${c.author}). Habilidade ainda não revelada.`,
      en: `Design-A-Sprite Contest winner (by ${c.author}). Ability not revealed yet.`,
    },
  })),
];

// Se `image` já vier preenchida na entrada (link direto, ex.: quando a URL
// adivinhada a partir de wikiName não bate com o nome real do arquivo na
// wiki), ela tem prioridade — nunca é sobrescrita pela URL adivinhada.
ELEMENTALS.forEach((e) => {
  e.image = e.image || ignArt(e.id, "base") || WIKI_ITEM(e.wikiName);
  e.variants = e.noVariants ? [] : makeVariants(e);
});
