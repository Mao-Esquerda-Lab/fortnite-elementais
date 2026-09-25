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
    "id": "birthday",
    "name": {
      "pt": "Birthday",
      "en": "Birthday"
    },
    "wikiName": "Birthday Sprite",
    "rarity": "Unknown",
    "autoAdded": "2026-09-17",
    "ability": {
      "pt": "Habilidade ainda não revelada.",
      "en": "Ability not yet revealed."
    },
    "onlyVariants": [
      "gold",
      "cheat-master"
    ],
    "upcoming": true,
    "image": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/fortnite/f/fe/Fortnite_birthday_sprite.png",
    "variantImages": {
      "gold": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/fortnite/d/da/Fortnite_gold_birthday_sprite.png",
      "cheat-master": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/fortnite/2/2c/Fortnite_cheat_master_birthday_sprite.png"
    }
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
