// ARQUIVO GERADO AUTOMATICAMENTE — não edite à mão.
// Gerado por scripts/update-sprites.mjs (workflow update-sprites.yml), que
// consulta a página "Sprites" da Fortnite Wiki todo dia e ADICIONA aqui os
// Sprites do Chapter 7 em diante que ainda não existem em
// data/elementals.js. Sprites de capítulos anteriores ficam fora do app.
//
// Para traduzir/curar um Sprite desta lista (nome em PT, habilidade,
// variantes especiais etc.), MOVA a entrada para data/elementals.js: o
// gerador pula Sprites que já estão na lista manual e a cópia daqui some na
// próxima execução.
const AUTO_ELEMENTALS = [
  {
    "id": "sir-oscar-the-second",
    "name": {
      "pt": "Sir Oscar the Second",
      "en": "Sir Oscar the Second"
    },
    "wikiName": "Sir Oscar the Second Sprite",
    "rarity": "Unknown",
    "autoAdded": "2026-11-09",
    "ability": {
      "pt": "Habilidade ainda não revelada.",
      "en": "Ability not yet revealed."
    },
    "noVariants": true,
    "upcoming": true,
    "image": "img/sprites/sir-oscar-the-second-base.png"
  },
  {
    "id": "mini-miku",
    "name": {
      "pt": "Mini Miku",
      "en": "Mini Miku"
    },
    "wikiName": "Mini Miku Sprite",
    "rarity": "Unknown",
    "autoAdded": "2026-11-13",
    "ability": {
      "pt": "Habilidade ainda não revelada.",
      "en": "Ability not yet revealed."
    },
    "noVariants": true,
    "upcoming": true,
    "image": "img/sprites/mini-miku-base.png"
  },
  {
    "id": "squiplash",
    "name": {
      "pt": "Squiplash",
      "en": "Squiplash"
    },
    "wikiName": "Squiplash Sprite",
    "rarity": "Unknown",
    "autoAdded": "2026-11-13",
    "ability": {
      "pt": "Habilidade ainda não revelada.",
      "en": "Ability not yet revealed."
    },
    "noVariants": true,
    "upcoming": true
  }
];

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
