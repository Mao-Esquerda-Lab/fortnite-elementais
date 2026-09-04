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
const AUTO_CHEAT_CODES = [
  {
    "id": "insertcointocontinue",
    "code": "InsertCoinToContinue",
    "autoAdded": "2026-09-04",
    "reward": {
      "pt": "Transforms you into an arcade machine temporarily",
      "en": "Transforms you into an arcade machine temporarily"
    },
    "untranslated": true,
    "isNew": true
  },
  {
    "id": "chatwheredoyoufindthekey",
    "code": "ChatWhereDoYouFindTheKey",
    "autoAdded": "2026-09-04",
    "reward": {
      "pt": "2x Extraction Accelerator",
      "en": "2x Extraction Accelerator"
    },
    "untranslated": true,
    "isNew": true
  },
  {
    "id": "invalidcheat",
    "code": "INVALIDCHEAT",
    "autoAdded": "2026-09-04",
    "reward": {
      "pt": "2x Cheat Code Locator",
      "en": "2x Cheat Code Locator"
    },
    "untranslated": true,
    "isNew": true
  },
  {
    "id": "yourthoughtsaremine",
    "code": "YourThoughtsAreMine",
    "autoAdded": "2026-09-04",
    "reward": {
      "pt": "5,000 Sprite Dust e Void Master Geno Skin Edit Style e Void Conduits of Power Back Bling Edit Style e (Must complete e Geno's Story quests first e before you can redeem)",
      "en": "5,000 Sprite Dust e Void Master Geno Skin Edit Style e Void Conduits of Power Back Bling Edit Style e (Must complete e Geno's Story quests first e before you can redeem)"
    },
    "untranslated": true,
    "isNew": true
  }
];

const AUTO_EXPIRED_CODES = [];

AUTO_CHEAT_CODES.forEach((c) => {
  if (!CHEAT_CODES.some((x) => x.id === c.id)) CHEAT_CODES.push(c);
});

// Reatribui sempre (e não só marca): um código que reaparecer na página sai
// da lista de expirados e volta a valer.
const AUTO_EXPIRED_SET = new Set(AUTO_EXPIRED_CODES);
CHEAT_CODES.forEach((c) => {
  c.expired = AUTO_EXPIRED_SET.has(c.id);
});
