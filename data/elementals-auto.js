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
//
// Exceção em 09/nov/2026: o campo "image" do Sir Oscar the Second foi
// ACRESCENTADO À MÃO (usuário reportou o ícone faltando). O IGN só tem uma
// arte "teaser" pra ele (Sprite ainda não lançado), com o arquivo fora do
// padrão "Fortnite_{slug}_sprite.png" que IGN_IMAGE reconhece
// (scripts/update-sprites.mjs) — por isso o gerador não achou sozinho.
// Baixada pra img/sprites/sir-oscar-the-second-base.png. Se rodar o
// gerador de novo sem reconciliar, ele reescreve esta entrada do zero e
// perde o campo; conferir antes de sobrescrever.
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
