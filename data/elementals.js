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

// Sprites que a Fortnite Wiki ainda não tem (os "Em breve" mais recentes)
// aparecem no wiki do IGN, que serve as imagens deste CDN. Usado só onde a
// wiki falha — a fonte preferida continua sendo WIKI_ITEM.
const IGN_ITEM = (fileBase) =>
  `https://oyster.ignimgs.com/mediawiki/apis.ign.com/fortnite/${fileBase}.png`;

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

// O nome do arquivo na wiki usa sempre o nome em inglês da variante.
// `variantImages` (opcional) sobrescreve isso por variante, para Sprites cujo
// arquivo ainda não existe na wiki — ver IGN_ITEM acima.
const variantImage = (elemental, v) =>
  (elemental.variantImages && elemental.variantImages[v.id]) ||
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
  {
    // Único "Em breve" com arte já publicada (as três variantes) e com
    // habilidade descrita — datamine noticiado pelo accountshark.net.
    // A raridade NÃO foi anunciada pela Epic ("Its rarity has not been
    // announced"); o spritelocker.com chuta Raro no catálogo dele, mas aqui
    // fica "Unknown" até sair confirmação.
    id: "storm-scout",
    name: { pt: "Storm Scout", en: "Storm Scout" },
    wikiName: "Storm Scout Sprite",
    rarity: "Unknown",
    upcoming: true,
    onlyVariants: ["gold", "cheat-master"],
    image: IGN_ITEM("a/a3/Fortnite_storm_scout_sprite"),
    variantImages: {
      gold: IGN_ITEM("6/64/Fortnite_gold_storm_scout_sprite"),
      "cheat-master": IGN_ITEM("3/31/Fortnite_cheat_master_storm_scout_sprite"),
    },
    ability: {
      pt: "Aplica Sobrecarga automaticamente depois que você toma dano da tempestade e, no nível máximo, revela onde os próximos círculos vão fechar.",
      en: "Applies Overdrive automatically after you take storm damage, and at max level reveals where future circles will land.",
    },
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
  e.image = e.image || WIKI_ITEM(e.wikiName);
  e.variants = e.noVariants ? [] : makeVariants(e);
});
