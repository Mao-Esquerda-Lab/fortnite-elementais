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
    // Variantes confirmadas pelo usuário em 15/nov/2026.
    "onlyVariants": ["fortune", "cursed"],
    "lockedVariants": ["gold"],
    "number": 6,
    "image": "img/sprites/sir-oscar-the-second-base.png",
    "variantImages": {
      "fortune": "img/sprites/sir-oscar-the-second-fortune.png",
      "cursed": "img/sprites/sir-oscar-the-second-cursed.png",
      "gold": "img/sprites/sir-oscar-the-second-gold.png"
    }
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
    "onlyVariants": ["fortune", "cursed"],
    "lockedVariants": ["gold"],
    "number": 7,
    "image": "img/sprites/mini-miku-base.png",
    "variantImages": {
      "fortune": "img/sprites/mini-miku-fortune.png",
      "cursed": "img/sprites/mini-miku-cursed.png",
      "gold": "img/sprites/mini-miku-gold.png"
    }
  },
  {
    "id": "squiplash",
    // Nome em PT ("Mô Lusco") e ícone (fortnite.gg, id 321) confirmados
    // pelo usuário em 15/nov/2026 — ver comentário no topo do arquivo sobre
    // exceções de hand-edit.
    "name": {
      "pt": "Mô Lusco",
      "en": "Squiplash"
    },
    "wikiName": "Squiplash Sprite",
    "rarity": "Unknown",
    "autoAdded": "2026-11-13",
    "ability": {
      "pt": "Habilidade ainda não revelada.",
      "en": "Ability not yet revealed."
    },
    "onlyVariants": ["fortune", "cursed"],
    "lockedVariants": ["gold"],
    "number": 9,
    "image": "img/sprites/squiplash-base.png",
    "variantImages": {
      "fortune": "img/sprites/squiplash-fortune.png",
      "cursed": "img/sprites/squiplash-cursed.png",
      "gold": "img/sprites/squiplash-gold.png"
    }
  },
  {
    "id": "zee",
    // Confirmado pelo usuário em 15/nov/2026 (fortnite.gg, id 338) — Sprite
    // novo que nem o IGN nem a busca na web tinham citado ainda. Ícone
    // hand-added (fortnite.gg); sem variantes (confirmado: a página dele lá
    // não tem a seção "Variants").
    // Nome em pt-BR confirmado pelo usuário em 21/nov/2026: o cliente
    // brasileiro do jogo traduz "Zee" como "Ponto Zé" (trocadilho com o
    // som da letra Z em inglês), não é uma transliteração literal.
    "name": {
      "pt": "Ponto Zé",
      "en": "Zee"
    },
    "wikiName": "Zee Sprite",
    "rarity": "Unknown",
    "autoAdded": "2026-11-15",
    "ability": {
      "pt": "Habilidade ainda não revelada.",
      "en": "Ability not yet revealed."
    },
    "noVariants": true,
    "number": 2,
    "image": "img/sprites/zee-base.png"
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
