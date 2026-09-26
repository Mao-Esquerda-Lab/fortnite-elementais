// ARQUIVO GERADO AUTOMATICAMENTE — não edite à mão.
// Gerado por scripts/update-sprites.mjs (workflow update-sprites.yml), que
// lê a página de códigos do Painel de Admin no wiki do IGN todo dia.
//
// AUTO_CHEAT_CODES: códigos que ainda não estão em data/cheat-codes.js.
// Entram com a recompensa em inglês nos dois idiomas (untranslated: true)
// até serem curados — para curar, MOVA a entrada para data/cheat-codes.js
// traduzindo o texto: o gerador pula o que já está na lista manual e a
// cópia daqui some na próxima execução.
//
// AUTO_EXPIRED_CODES: ids que o IGN deixou de listar. Ficam visíveis no app
// marcados como expirados, em vez de sumirem — assim dá para saber que não
// adianta mais tentar. Se um código voltar à página, sai desta lista sozinho.
//
// Ordem: os mais novos ficam no COMEÇO de AUTO_CHEAT_CODES (mesma regra de
// data/cheat-codes.js). Por não terem sido curados ainda, são a coisa mais
// recente que o app conhece — por isso entram no início de CHEAT_CODES, na
// frente até da lista manual, em vez de no fim: assim aparecem sempre no
// topo da tabela, não enterrados atrás de códigos antigos.
const AUTO_CHEAT_CODES = [
  {
    "id": "whocrackedthecode",
    "code": "WhoCrackedTheCode",
    "autoAdded": "2026-09-26",
    "reward": {
      "pt": "40,000 XP",
      "en": "40,000 XP"
    },
    "untranslated": true,
    "isNew": true
  },
  {
    "id": "wearetheworldchampionstoday",
    "code": "WeAreTheWorldChampionsToday",
    "autoAdded": "2026-09-26",
    "reward": {
      "pt": "FNCS Sentry Back Bling",
      "en": "FNCS Sentry Back Bling"
    },
    "untranslated": true,
    "isNew": true
  },
  {
    "id": "dustysprites",
    "code": "DustySprites",
    "autoAdded": "2026-09-26",
    "reward": {
      "pt": "5,000 Sprite Dust",
      "en": "5,000 Sprite Dust"
    },
    "untranslated": true,
    "isNew": true
  },
  {
    "id": "almostscaringseason",
    "code": "AlmostScaringSeason",
    "autoAdded": "2026-09-21",
    "reward": {
      "pt": "2x Cheat Code Locator",
      "en": "2x Cheat Code Locator"
    },
    "untranslated": true,
    "isNew": true
  },
  {
    "id": "9years",
    "code": "9YEARS",
    "autoAdded": "2026-09-21",
    "reward": {
      "pt": "9th Birthday Sprite Spray",
      "en": "9th Birthday Sprite Spray"
    },
    "untranslated": true,
    "isNew": true
  }
];

const AUTO_EXPIRED_CODES = [
  "brb",
  "noprollama"
];

CHEAT_CODES.unshift(
  ...AUTO_CHEAT_CODES.filter((c) => !CHEAT_CODES.some((x) => x.id === c.id))
);

// Reatribui sempre (e não só marca): um código que reaparecer na página sai
// da lista de expirados e volta a valer.
const AUTO_EXPIRED_SET = new Set(AUTO_EXPIRED_CODES);
CHEAT_CODES.forEach((c) => {
  c.expired = AUTO_EXPIRED_SET.has(c.id);
});
