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
    "id": "vampire",
    "name": {
      "pt": "Vampire",
      "en": "Vampire"
    },
    "wikiName": "Vampire Sprite",
    "rarity": "Unknown",
    "autoAdded": "2026-10-01",
    "ability": {
      "pt": "Habilidade ainda não revelada.",
      "en": "Ability not yet revealed."
    },
    "onlyVariants": [
      "gold",
      "cheat-master"
    ],
    "image": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/fortnite/5/5a/Fortnite_vampire_sprite.png",
    "variantImages": {
      "cheat-master": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/fortnite/6/6d/Fortnite_cheat_master_vampire_sprite.png",
      "gold": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/fortnite/7/7e/Fortnite_gold_vampire_sprite.png"
    }
  },
  {
    "id": "the-deer",
    "name": {
      "pt": "The Deer",
      "en": "The Deer"
    },
    "wikiName": "The Deer Sprite",
    "rarity": "Unknown",
    "autoAdded": "2026-10-01",
    "ability": {
      "pt": "Habilidade ainda não revelada.",
      "en": "Ability not yet revealed."
    },
    "onlyVariants": [
      "gold",
      "cheat-master"
    ],
    "image": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/fortnite/6/6d/Fortnite_the_deer_sprite.png",
    "variantImages": {
      "cheat-master": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/fortnite/e/ee/Fortnite_cheat_master_the_deer_sprite.png",
      "gold": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/fortnite/9/97/Fortnite_gold_the_deer_sprite.png"
    }
  },
  {
    "id": "spooky-dash",
    "name": {
      "pt": "Spooky Dash",
      "en": "Spooky Dash"
    },
    "wikiName": "Spooky Dash Sprite",
    "rarity": "Unknown",
    "autoAdded": "2026-10-01",
    "ability": {
      "pt": "Habilidade ainda não revelada.",
      "en": "Ability not yet revealed."
    },
    "onlyVariants": [
      "gold",
      "cheat-master"
    ],
    "image": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/fortnite/d/d1/Fortnite_spooky_dash_sprite.png",
    "variantImages": {
      "cheat-master": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/fortnite/0/07/Fortnite_cheat_master_spooky_dash_sprite.png",
      "gold": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/fortnite/2/2f/Fortnite_gold_spooky_dash_sprite.png"
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
