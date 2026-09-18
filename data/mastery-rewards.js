// Recompensas por marco de Sprites Dominados no total (Fortnite Chapter 7
// Season 4). Desbloqueiam sozinhas ao atingir a contagem — nada para
// resgatar, diferente dos códigos do Painel de Admin. A contagem usada é a
// mesma da barra "Dominados" do app (soma Base + cada variante marcada como
// Dominada em cada Elemental), já que o jogo não deixa claro se conta
// diferente disso.
//
// Fonte: wiki do IGN, seção "Fortnite Sprite Mastery Rewards" (checado em
// 18/set/2026) — a Epic ainda não revelou os níveis depois do 28º.
//
// ATENÇÃO à tradução: os textos em PT são tradução nossa, não o texto
// oficial do cliente — corrija ao conferir no jogo. Onde o app já tem um
// termo próprio (Pó de Elemental, Taco Picante etc.), o texto segue o do app.
const MASTERY_REWARDS = [
  { level: 1, reward: { pt: "40.000 de XP", en: "40,000 Season XP" } },
  {
    level: 2,
    reward: { pt: "3x Localizador de Cheat Code", en: "3x Cheat Code Locator" },
  },
  { level: 3, reward: { pt: "5.000 de Pó de Elemental", en: "5,000 Sprite Dust" } },
  { level: 4, reward: { pt: "4x Taco Picante", en: "4x Spicy Taco" } },
  { level: 5, reward: { pt: "40.000 de XP", en: "40,000 Season XP" } },
  { level: 6, reward: { pt: "5.000 de Pó de Elemental", en: "5,000 Sprite Dust" } },
  { level: 7, reward: { pt: "2x Extrator Portátil", en: "2x Portable Extractor" } },
  {
    level: 8,
    reward: { pt: "3x Acelerador de Extração", en: "3x Extraction Accelerator" },
  },
  { level: 9, reward: { pt: "40.000 de XP", en: "40,000 Season XP" } },
  {
    level: 10,
    reward: { pt: "3x Localizador de Cheat Code", en: "3x Cheat Code Locator" },
  },
  { level: 11, reward: { pt: "5.000 de Pó de Elemental", en: "5,000 Sprite Dust" } },
  { level: 12, reward: { pt: "2x Extrator Portátil", en: "2x Portable Extractor" } },
  { level: 13, reward: { pt: "40.000 de XP", en: "40,000 Season XP" } },
  {
    level: 14,
    reward: {
      pt: "2x Entrega de Suprimentos de Lhama",
      en: "2x Llama Supply Drop",
    },
  },
  { level: 15, reward: { pt: "5.000 de Pó de Elemental", en: "5,000 Sprite Dust" } },
  {
    level: 16,
    reward: { pt: "3x Localizador de Cheat Code", en: "3x Cheat Code Locator" },
  },
  { level: 17, reward: { pt: "40.000 de XP", en: "40,000 Season XP" } },
  { level: 18, reward: { pt: "5x Taco Picante", en: "5x Spicy Taco" } },
  {
    level: 19,
    reward: { pt: "3x Acelerador de Extração", en: "3x Extraction Accelerator" },
  },
  { level: 20, reward: { pt: "40.000 de XP", en: "40,000 Season XP" } },
  { level: 21, reward: { pt: "1x Localizador da Sorte", en: "1x Lucky Locator" } },
  {
    level: 22,
    reward: { pt: "3x Acelerador de Extração", en: "3x Extraction Accelerator" },
  },
  { level: 23, reward: { pt: "40.000 de XP", en: "40,000 Season XP" } },
  { level: 24, reward: { pt: "2x Extrator Portátil", en: "2x Portable Extractor" } },
  {
    level: 25,
    reward: {
      pt: "2x Entrega de Suprimentos de Lhama",
      en: "2x Llama Supply Drop",
    },
  },
  { level: 26, reward: { pt: "5.000 de Pó de Elemental", en: "5,000 Sprite Dust" } },
  { level: 27, reward: { pt: "40.000 de XP", en: "40,000 Season XP" } },
  { level: 28, reward: { pt: "Skin Pixel Polli", en: "Pixel Polli Skin" } },
];
