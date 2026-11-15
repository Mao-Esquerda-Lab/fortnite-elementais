// Recompensas grátis dos Baús do Tesouro (Fortnite Chapter 7 Season 5
// "Treasure Hunters"). A cada "Captain's Day" (toda sexta, 14h UTC) o pool
// de recompensas de baú muda. Acesso à Loja Pirata e os 5 Gizmos abaixo
// ficam fixos a temporada toda; o resto (traje, veículo, picareta/aderência,
// faixa jam, tela de carregamento) muda toda semana — tudo achado ao acaso
// ao abrir qualquer baú, sem precisar de código.
//
// Fonte: wiki do IGN, "All Free Treasure Chest Rewards List - Odds and
// Schedule" (checado em 15/nov/2026). Textos em PT são tradução nossa, NÃO
// o texto oficial do cliente brasileiro.
//
// TREASURE_SCHEDULE cobre a temporada inteira (já anunciada: 5 semanas, até
// 05/dez/2026) — datas não mudam, por isso ficam fixas aqui. As recompensas
// de cada semana só existem quando a Epic/o IGN revela, por isso TREASURE_WEEKS
// só tem as semanas já confirmadas (1 e 2); semanas novas chegam sozinhas via
// data/treasure-rewards-auto.js (scripts/update-sprites.mjs) e devem ser
// movidas pra cá ao traduzir.
const TREASURE_SCHEDULE = [
  { week: 1, startsAt: "2026-11-01T14:00:00Z", endsAt: "2026-11-08T13:59:00Z" },
  { week: 2, startsAt: "2026-11-08T14:00:00Z", endsAt: "2026-11-15T13:59:00Z" },
  { week: 3, startsAt: "2026-11-15T14:00:00Z", endsAt: "2026-11-22T13:59:00Z" },
  { week: 4, startsAt: "2026-11-22T14:00:00Z", endsAt: "2026-11-29T13:59:00Z" },
  { week: 5, startsAt: "2026-11-29T14:00:00Z", endsAt: "2026-12-05T13:59:00Z" },
];

// Fixas a temporada toda (mesmas todas as semanas — o app mostra uma vez só,
// não repete por semana).
const TREASURE_SEASON_REWARDS = [
  {
    id: "pirate-shop-access",
    odds: "1 em 137.500",
    name: { pt: "Acesso à Loja Pirata", en: "Pirate Shop Access" },
  },
  {
    id: "extraction-accelerator",
    odds: "1 em 127",
    name: { pt: "Acelerador de Extração", en: "Extraction Accelerator" },
  },
  {
    id: "portable-extractor",
    odds: "1 em 127",
    name: { pt: "Extrator Portátil", en: "Portable Extractor" },
  },
  {
    id: "golden-firework",
    odds: "1 em 127",
    name: { pt: "Fogos de Artifício Dourados", en: "Golden Firework" },
  },
  {
    id: "sprite-locator",
    odds: "1 em 127",
    name: { pt: "Localizador de Sprites", en: "Sprite Locator" },
  },
  {
    id: "lucky-locator",
    odds: "1 em 127",
    name: { pt: "Localizador da Sorte", en: "Lucky Locator" },
  },
];

const TREASURE_WEEKS = [
  {
    week: 1,
    rewards: [
      {
        id: "w1-outfit",
        odds: "1 em 1.562.500",
        name: {
          pt: "Traje A$AP Rocky Ouro Maciço",
          en: "Solid Gold A$AP Rocky Outfit",
        },
      },
      {
        id: "w1-pickaxe",
        odds: "1 em 568",
        name: {
          pt: "Picareta Manopla de A$AP Rocky Ouro Maciço",
          en: "Solid Gold A$AP Rocky's Gauntlet Pickaxe",
        },
      },
      {
        id: "w1-loading-screen",
        odds: "1 em 272",
        name: {
          pt: 'Tela de Carregamento "Saque no Paraíso" A$AP Rocky',
          en: '"Plunder In Paradise" A$AP Rocky Loading Screen',
        },
      },
      {
        id: "w1-jam-track",
        odds: "1 em 391",
        name: {
          pt: 'Faixa Jam "Entrada Proibida" A$AP Rocky',
          en: '"No Trespassing" A$AP Rocky Jam Track',
        },
      },
      {
        id: "w1-vehicle",
        odds: "1 em 7.813",
        name: {
          pt: "Veículo Mercedes-AMG G 63 G-Wagon",
          en: "Mercedes-AMG G 63 G-Wagon Vehicle",
        },
      },
    ],
  },
  {
    week: 2,
    rewards: [
      {
        id: "w2-outfit",
        odds: "1 em 1.562.500",
        name: {
          pt: "Traje Lil' Uzi Vert Ouro Maciço",
          en: "Solid Gold Lil' Uzi Vert Outfit",
        },
      },
      {
        id: "w2-vehicle",
        odds: "1 em 7.813",
        name: {
          pt: "Veículo Cadillac CT5-V Blackwing (com Decalque da Lhama Dourada)",
          en: "Cadillac CT5-V Blackwing Vehicle (with Golden Llama Crew Decal)",
        },
      },
      {
        id: "w2-back-bling",
        odds: "1 em 568",
        name: {
          pt: "Aderência nas Costas Diamante e Ouro",
          en: "Diamond and Gold Back Bling",
        },
      },
      {
        id: "w2-jam-track",
        odds: "1 em 391",
        name: {
          pt: "Faixa Jam \"Londres\" Lil' Uzi Vert",
          en: "\"London\" Lil' Uzi Vert Jam Track",
        },
      },
      {
        id: "w2-loading-screen",
        odds: "1 em 272",
        name: {
          pt: "Tela de Carregamento Tão Kawaii",
          en: "So Kawaii Loading Screen",
        },
      },
    ],
  },
];
