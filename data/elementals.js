// Dados dos Elementais ("Sprites") do Fortnite Battle Royale
// (Capítulo 7, Temporada 3 + evento "Gone Wild").
// Fonte: fortnite.fandom.com/wiki/Sprites e cobertura da comunidade (jul/2026).
// ESCOPO: apenas Sprites do Chapter 7 em diante — os do Chapter 6 (e
// anteriores) não fazem parte do app.
// Esta é a lista CURADA (nomes em PT, habilidades, exceções de variantes).
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

// Variantes padrão dos Sprites. Exceções (conforme a wiki):
//  - Burnt Peanut (Mítico) não tem variante nenhuma (noVariants);
//  - Dream e Punk não têm a variante Metalizado/Holofoil (noHolofoil);
//  - Cúbico e Quack existem só para alguns Sprites (extraVariants).
// Todas as variantes herdam a raridade do Sprite base — são versões
// "especiais" com drop menor, não um tier de raridade próprio.
// Linha do tempo: Gelatinoso habilitado em 11/jun, Galáctico em 18/jun; Gema e
// Metalizado chegaram nas Fendas Anômalas (Sprite Hunt Rift Anomalies) e
// foram desabilitadas em 25/jun; o Metalizado voltou em 09/jul/2026 (a
// Gema segue desabilitada no jogo, mas continua aqui para quem já tem);
// Quack foi ao ar em 30/jul/2026 para Água, Fogo, Terra e Ponto Zero.
const SPRITE_VARIANTS = [
  {
    id: "gold",
    name: { pt: "Dourado", en: "Gold" },
    effect: {
      pt: "3x XP bônus em eliminações",
      en: "3x bonus XP on eliminations",
    },
  },
  {
    id: "gummy",
    name: { pt: "Gelatinoso", en: "Gummy" },
    effect: {
      pt: "+20% de Pó de Elemental ao extrair",
      en: "20% more Sprite Dust on extraction",
    },
  },
  {
    id: "galaxy",
    name: { pt: "Galáctico", en: "Galaxy" },
    effect: {
      pt: "+30% de munição ao saquear",
      en: "30% more ammo when looting",
    },
  },
  {
    id: "gem",
    name: { pt: "Gema", en: "Gem" },
    effect: { pt: "-30% de dano de queda", en: "30% less fall damage" },
  },
  {
    id: "holofoil",
    name: { pt: "Metalizado", en: "Holofoil" },
    effect: {
      pt: "30% de chance do esquadrão achar Sprites raros em contêineres",
      en: "30% chance for your squad to find rare Sprites from containers",
    },
  },
];

// Variantes especiais de colecionador, exclusivas de alguns Sprites.
// O efeito delas ainda não foi revelado (a wiki lista como "??").
const EXTRA_VARIANTS = {
  cube: {
    id: "cube",
    name: { pt: "Cúbico", en: "Cube" },
    effect: { pt: "Efeito ainda não revelado", en: "Effect not yet revealed" },
  },
  quack: {
    id: "quack",
    name: { pt: "Pato", en: "Quack" },
    effect: { pt: "Efeito ainda não revelado", en: "Effect not yet revealed" },
  },
};

// O nome do arquivo na wiki usa sempre o nome em inglês da variante.
const makeVariants = (elemental) => {
  const base = SPRITE_VARIANTS.filter(
    (v) => !(elemental.noHolofoil && v.id === "holofoil")
  );
  const extras = (elemental.extraVariants || []).map((id) => EXTRA_VARIANTS[id]);
  return [...base, ...extras].map((v) => ({
    ...v,
    image: WIKI_ITEM(`${v.name.en} ${elemental.wikiName}`),
  }));
};

const ELEMENTALS = [
  {
    id: "water",
    name: { pt: "Água", en: "Water" },
    wikiName: "Water Sprite",
    rarity: "Rare",
    extraVariants: ["quack"],
    ability: {
      pt: "Regenera o escudo seu e do seu esquadrão enquanto vocês estiverem na água.",
      en: "Regenerates shields for you and your squad while you're in water.",
    },
    dust: 100,
    variantCost: 4000,
  },
  {
    id: "earth",
    name: { pt: "Terra", en: "Earth" },
    wikiName: "Earth Sprite",
    rarity: "Rare",
    extraVariants: ["cube", "quack"],
    ability: {
      pt: "Aumenta a chance de encontrar itens raros dentro de baús.",
      en: "Increases your chance of finding rare items in chests.",
    },
    dust: 100,
    variantCost: 4000,
  },
  {
    id: "fire",
    name: { pt: "Fogo", en: "Fire" },
    wikiName: "Fire Sprite",
    rarity: "Rare",
    extraVariants: ["cube", "quack"],
    ability: {
      pt: "Cria uma explosão de dano extra depois de acertar o mesmo inimigo repetidas vezes.",
      en: "Creates a burst of extra damage after hitting the same enemy repeatedly.",
    },
    dust: 100,
    variantCost: 4000,
  },
  {
    id: "fishy",
    name: { pt: "Peixoto", en: "Fishy" },
    wikiName: "Fishy Sprite",
    rarity: "Rare",
    extraVariants: ["cube"],
    ability: {
      pt: "Aumenta bastante a velocidade de natação e dá um boost de velocidade ao levar dano.",
      en: "Greatly increases swim speed and grants a speed boost when you take damage.",
    },
    dust: 100,
    variantCost: 4000,
  },
  {
    id: "air",
    name: { pt: "Ar", en: "Air" },
    wikiName: "Air Sprite",
    rarity: "Rare",
    ability: {
      pt: "Aumenta a velocidade de corrida e a altura do pulo, e anula dano de queda.",
      en: "Increases sprint speed and jump height, and nullifies fall damage.",
    },
    dust: 100,
    variantCost: 4000,
  },
  {
    id: "duck",
    name: { pt: "Pato", en: "Duck" },
    wikiName: "Duck Sprite",
    rarity: "Epic",
    ability: {
      pt: "Emotar ou usar o Jam recupera escudo.",
      en: "Emoting or Jamming replenishes shields.",
    },
    dust: 3000,
    variantCost: 6000,
  },
  {
    id: "ghost",
    name: { pt: "Fantasma", en: "Ghost" },
    wikiName: "Ghost Sprite",
    rarity: "Epic",
    ability: {
      pt: "Concede uma breve janela furtiva sempre que você recarrega a arma.",
      en: "Grants a brief stealth window whenever you reload.",
    },
    dust: 3000,
    variantCost: 6000,
  },
  {
    id: "demon",
    name: { pt: "Demônio", en: "Demon" },
    wikiName: "Demon Sprite",
    rarity: "Epic",
    ability: {
      pt: "Rouba um pouco de vida e escudo ao eliminar um oponente.",
      en: "Siphons some health and shields when you eliminate an opponent.",
    },
    dust: 3000,
    variantCost: 6000,
  },
  {
    id: "king",
    name: { pt: "Rei", en: "King" },
    wikiName: "King Sprite",
    rarity: "Epic",
    ability: {
      pt: "Sua picareta causa mais dano.",
      en: "Your pickaxe deals more damage.",
    },
    dust: 3000,
    variantCost: 6000,
  },
  {
    id: "aura",
    name: { pt: "Aura", en: "Aura" },
    wikiName: "Aura Sprite",
    rarity: "Epic",
    ability: {
      pt: "Ganha uma carga de Shock Rock ao causar dano suficiente em inimigos.",
      en: "Gain a Shock Rock charge when you deal enough damage to enemies.",
    },
    dust: 3000,
    variantCost: 6000,
  },
  {
    id: "striker",
    name: { pt: "Atacante", en: "Striker" },
    wikiName: "Striker Sprite",
    rarity: "Epic",
    ability: {
      pt: "Ganha Overdrive ao subir (Mantle) ou saltar obstáculos (Hurdle).",
      en: "Gain Overdrive when you Mantle or Hurdle.",
    },
    dust: 3000,
    variantCost: 6000,
  },
  {
    id: "dream",
    name: { pt: "Sonhos", en: "Dream" },
    wikiName: "Dream Sprite",
    rarity: "Legendary",
    noHolofoil: true,
    extraVariants: ["cube"],
    ability: {
      pt: "Dropa loot aleatório a cada level up, culminando em itens lendários no nível máximo.",
      en: "Drops random loot at every level up, culminating in legendary items at max level.",
    },
    dust: 5000,
    variantCost: 10000,
  },
  {
    id: "punk",
    name: { pt: "Punk", en: "Punk" },
    wikiName: "Punk Sprite",
    rarity: "Legendary",
    noHolofoil: true,
    extraVariants: ["cube"],
    ability: {
      pt: "Chance de munição infinita ou recarga automática.",
      en: "Chance for infinite ammo or auto-reload.",
    },
    dust: 5000,
    variantCost: 10000,
  },
  {
    id: "boss",
    name: { pt: "Chefe", en: "Boss" },
    wikiName: "Boss Sprite",
    rarity: "Legendary",
    extraVariants: ["cube"],
    ability: {
      pt: "Aumenta o HP e o Shield máximos.",
      en: "Increases your maximum HP and Shield.",
    },
    dust: 5000,
    variantCost: 10000,
  },
  {
    id: "peely",
    name: { pt: "Peely", en: "Peely" },
    // Nome completo "Peeky Peely" — usado para as imagens porque a wiki já
    // tem uma página "Peely" para o personagem/skin, então o item Sprite é
    // catalogado com o nome completo para não colidir.
    wikiName: "Peeky Peely Sprite",
    rarity: "Legendary",
    ability: {
      pt: "Marca Sprites de variantes raras (e quem estiver com eles) por perto, mas também revela sua localização.",
      en: "Marks nearby rare Sprite variants (and whoever's carrying them), but also reveals your location.",
    },
    dust: 5000,
    variantCost: 10000,
  },
  {
    id: "lootin-llama",
    name: { pt: "Lootin' Llama", en: "Lootin' Llama" },
    wikiName: "Lootin' Llama Sprite",
    rarity: "Legendary",
    ability: {
      pt: "Chance de ganhar uma melhoria de arma ao abrir caixas de munição.",
      en: "Chance to get a weapon upgrade when opening ammo boxes.",
    },
    dust: 5000,
    variantCost: 10000,
  },
  {
    id: "seven",
    name: { pt: "Sete", en: "Seven" },
    wikiName: "Seven Sprite",
    rarity: "Legendary",
    ability: {
      pt: "Revela ao seu esquadrão os rastros de passos dos inimigos.",
      en: "Makes enemy foot trails visible to your squad.",
    },
    dust: 5000,
    variantCost: 10000,
  },
  {
    id: "zero-point",
    name: { pt: "Ponto Zero", en: "Zero Point" },
    wikiName: "Zero Point Sprite",
    rarity: "Mythic",
    extraVariants: ["cube", "quack"],
    ability: {
      pt: "Cria automaticamente uma Shield Bubble Jr. sempre que você se cura.",
      en: "Automatically deploys a Shield Bubble Jr. whenever you heal.",
    },
    dust: 7500,
    variantCost: 15000,
  },
  {
    id: "burnt-peanut",
    name: { pt: "Amendoim Queimado", en: "Burnt Peanut" },
    wikiName: "Burnt Peanut",
    rarity: "Mythic",
    noVariants: true,
    ability: {
      pt: "Mais chance de encontrar loot extra ao eliminar jogadores.",
      en: "Higher chance of finding extra loot when eliminating players.",
    },
    // Custo reduzido de 7.500 para 6.750 em 24/jul/2026 (balanceamento),
    // junto com os outros Míticos sem variante (Pollo, Vini Jr.).
    dust: 6750,
    variantCost: 15000,
  },
  {
    id: "grim-reaper",
    name: { pt: "Ceifador", en: "Grim" },
    wikiName: "Grim Sprite",
    rarity: "Mythic",
    extraVariants: ["cube"],
    ability: {
      pt: "Marca no seu HUD, por um tempo, qualquer inimigo que te atacar.",
      en: "Marks any enemy who attacks you on your HUD for a duration.",
    },
    dust: 7500,
    variantCost: 15000,
  },
  {
    id: "batman",
    name: { pt: "Batman", en: "Batman" },
    wikiName: "Batman Sprite",
    rarity: "Mythic",
    extraVariants: ["cube"],
    ability: {
      pt: "Permite lançar-se no ar e abrir a Capa do Batman, funcionando como um planador extra durante a partida.",
      en: "Lets you launch into the air and deploy the Bat Cape, working as an extra glider during the match.",
    },
    dust: 7500,
    variantCost: 15000,
  },
  {
    id: "pollo",
    name: { pt: "Pollo", en: "Pollo" },
    wikiName: "Pollo Sprite",
    rarity: "Mythic",
    noVariants: true,
    ability: {
      pt: "Regenera aos poucos o escudo seu e do seu esquadrão por um tempo após uma eliminação.",
      en: "Slowly regenerates shield for you and your squad for a while after an elimination.",
    },
    dust: 6750,
    variantCost: 15000,
  },
  {
    id: "vini-jr",
    name: { pt: "Vini Jr.", en: "Vini Jr." },
    wikiName: "Vini Jr. Sprite",
    rarity: "Mythic",
    noVariants: true,
    ability: {
      pt: "Deixa o deslizar destrutivo por um tempo após correr, derrubando estruturas e inimigos; acertar um inimigo com o deslizar aumenta a cadência de tiro e a recarga.",
      en: "Makes sliding destructive for a while after sprinting, breaking structures and hitting enemies; slide-kicking an enemy boosts fire rate and reload speed.",
    },
    dust: 6750,
    variantCost: 15000,
  },
  {
    id: "ironmouse",
    name: { pt: "Ironmouse", en: "Ironmouse" },
    wikiName: "Ironmouse Sprite",
    rarity: "Mythic",
    ability: {
      pt: "Regenera vida aos poucos quando ela está baixa, ficando furtivo e com gravidade reduzida enquanto isso.",
      en: "Regenerates health over time when it's low, gaining Cloak and low gravity while regenerating.",
    },
    dust: 7500,
    variantCost: 15000,
  },
  {
    id: "john-wick",
    name: { pt: "John Wick", en: "John Wick" },
    wikiName: "John Wick Sprite",
    // A wiki ainda não tem a imagem certa (Sprite lançou em 30/jul); link
    // manual do fortnite.gg (parece ser um ícone placeholder genérico da
    // Epic, "FillerGrunt" — melhor que a letra de fallback mesmo assim).
    image: "https://fortnite.gg/img/x/sprites/icons/T_Icon_Reload_FillerGrunt_icon_L.webp",
    rarity: "Mythic",
    noVariants: true,
    ability: {
      pt: "Revela inimigos próximos depois de eliminar ou nocautear alguém.",
      en: "Reveals nearby enemies after eliminating or knocking someone.",
    },
    dust: 7500,
    variantCost: 15000,
  },
  // Sprites já listados na wiki mas ainda não lançados no jogo entram aqui
  // (upcoming: true desabilita os checkboxes e tira do progresso).
];

// Se `image` já vier preenchida na entrada (link direto, ex.: quando a URL
// adivinhada a partir de wikiName não bate com o nome real do arquivo na
// wiki), ela tem prioridade — nunca é sobrescrita pela URL adivinhada.
ELEMENTALS.forEach((e) => {
  e.image = e.image || WIKI_ITEM(e.wikiName);
  e.variants = e.noVariants ? [] : makeVariants(e);
});
