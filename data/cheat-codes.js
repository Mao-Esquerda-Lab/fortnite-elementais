// Códigos do Painel de Admin ("Lobby Hack codes") do Fortnite Chapter 7
// Season 4. São os que você digita no lobby, na caixinha "... / admin panel"
// do canto superior direito do menu principal — diferentes dos Cheat Codes
// de setinhas que aparecem nas paredes durante a partida.
//
// Fonte: wiki do IGN, "All Admin Panel Lobby Hack Codes For Free Rewards"
// (checado em 22/ago/2026). O IGN diz testar cada código antes de publicar.
//
// ATENÇÃO à tradução: os textos em PT abaixo são tradução nossa, NÃO o texto
// oficial do cliente brasileiro — a Epic não publica essa lista traduzida.
// Onde o app já tem um termo próprio (Pó de Elemental, Trapaceiro), o texto
// segue o do app. Corrija ao conferir no jogo.
//
// O `code` é digitado exatamente como está aqui: a caixa do jogo costuma
// aceitar qualquer caixa (maiúscula/minúscula), mas mantemos a grafia do IGN
// porque é a que eles testaram. O `id` é a chave estável do que já foi
// resgatado (nunca mude: quebraria o progresso salvo e os backups antigos).
//
// Ordem: os mais novos entram no COMEÇO da lista, não no fim — e só o mais
// recente carrega `isNew: true` (tira o `isNew` do que tinha antes).
const CHEAT_CODES = [
  {
    id: "beammeup",
    code: "BEAMMEUP",
    isNew: true,
    reward: {
      pt: "2x Acelerador de Extração",
      en: "2x Extraction Accelerator",
    },
  },
  {
    id: "sayh12wr1x3l",
    code: "SAYH12WR1X3L",
    reward: {
      pt: "Spray Retrato de Herói do Wrixel",
      en: "Wrixel's Hero Portrait Spray",
    },
  },
  {
    id: "playtolevelup",
    code: "PlayToLevelUp",
    reward: { pt: "2.000 de Pó de Elemental", en: "2,000 Sprite Dust" },
  },
  {
    id: "dustinthewind",
    code: "DustInTheWind",
    reward: { pt: "5.000 de Pó de Elemental", en: "5,000 Sprite Dust" },
  },
  {
    // Some da página do IGN — ver AUTO_EXPIRED_CODES em cheat-codes-auto.js.
    id: "noprollama",
    code: "NOPROLLAMA",
    reward: {
      pt: "1x Entrega de Suprimentos de Lhama",
      en: "1x Llama Supply Drop",
    },
  },
  {
    id: "insertcointocontinue",
    code: "InsertCoinToContinue",
    reward: {
      pt: "Transforma você numa máquina de fliperama temporariamente",
      en: "Transforms you into an arcade machine temporarily",
    },
  },
  {
    id: "chatwheredoyoufindthekey",
    code: "ChatWhereDoYouFindTheKey",
    reward: {
      pt: "2x Acelerador de Extração",
      en: "2x Extraction Accelerator",
    },
  },
  {
    id: "invalidcheat",
    code: "INVALIDCHEAT",
    reward: {
      pt: "2x Localizador de Cheat Code",
      en: "2x Cheat Code Locator",
    },
  },
  {
    id: "yourthoughtsaremine",
    code: "YourThoughtsAreMine",
    reward: {
      pt: "5.000 de Pó de Elemental, Estilo Alternativo da Skin Geno Mestre do Vazio e Estilo Alternativo do Acessório de Costas Condutos de Poder do Vazio",
      en: "5,000 Sprite Dust, Void Master Geno Skin Edit Style and Void Conduits of Power Back Bling Edit Style",
    },
    note: {
      pt: "Só funciona depois de completar as missões da história do Geno.",
      en: "Only redeemable after completing Geno's Story quests first.",
    },
  },
  {
    id: "whereisthedustytree",
    code: "WhereIsTheDustyTree",
    reward: { pt: "5.000 de Pó de Elemental", en: "5,000 Sprite Dust" },
  },
  {
    // Mesmo lançamento do WhereIsTheDustyTree (04/set/2026), achado no
    // r/FortniteOver40 — não estava na tabela do IGN ainda.
    id: "brb",
    code: "brb",
    reward: {
      pt: "Transforma você numa privada temporariamente",
      en: "Transforms you into a toilet temporarily",
    },
  },
  {
    id: "h0p0nvc",
    code: "H0p0nVC",
    reward: { pt: "2.000 de Pó de Elemental", en: "2,000 Sprite Dust" },
  },
  {
    id: "gatherandcraft",
    code: "GatherAndCraft",
    reward: {
      pt: "Elemental Arbusto Trapaceiro",
      en: "Cheat Master Bush Sprite",
    },
    note: {
      pt: "Só funciona depois de completar a Parte 1 da missão do Wrixel (Ziggy).",
      en: "Only redeemable after completing Part 1 of the Wrixel (Ziggy) Story Quest.",
    },
  },
  {
    id: "play4all",
    code: "Play4All",
    reward: { pt: "Elemental Jonesy Trapaceiro", en: "Cheat Master Jonesy Sprite" },
  },
  {
    id: "gottagofast",
    code: "GottaGoFast",
    reward: { pt: "Elemental Sonic Trapaceiro", en: "Cheat Master Sonic Sprite" },
  },
  {
    id: "iwannaflyhigh",
    code: "IWannaFlyHigh",
    reward: { pt: "Elemental Tails Trapaceiro", en: "Cheat Master Tails Sprite" },
  },
  {
    id: "8bitblast",
    code: "8BitBlast",
    reward: { pt: "Elemental 8-Bit Trapaceiro", en: "Cheat Master 8-Bit Sprite" },
  },
  {
    id: "born2play",
    code: "BORN2PLAY",
    reward: {
      pt: "Elemental Aventura Trapaceiro",
      en: "Cheat Master Adventure Sprite",
    },
  },
  {
    // Detectado pelo robô em 26/ago/2026 e traduzido na mão em seguida.
    id: "jonesyisgolden",
    code: "JONESYISGOLDEN",
    reward: { pt: "Elemental Jonesy Dourado", en: "Gold Jonesy Sprite" },
  },
  {
    id: "overridexp",
    code: "OverrideXP",
    reward: { pt: "40.000 de XP", en: "40,000 XP" },
  },
  {
    id: "o2override",
    code: "O2OVERRIDE",
    reward: {
      pt: "1x Entrega de Suprimentos de Lhama e 5x Extrator Portátil",
      en: "1x Llama Supply Drop and 5x Portable Extractor",
    },
  },
  {
    id: "takeyourheart",
    code: "TakeYourHeart",
    reward: {
      pt: "2x Acelerador de Extração",
      en: "2x Extraction Accelerator",
    },
  },
  {
    id: "survivethenight",
    code: "SurviveTheNight",
    reward: {
      pt: "2x Localizador de Cheat Code",
      en: "2x Cheat Code Locator",
    },
  },
  {
    id: "finditchat",
    code: "FindItChat",
    reward: {
      pt: "2x Localizador de Cheat Code",
      en: "2x Cheat Code Locator",
    },
  },
  {
    id: "perfectorder",
    code: "PerfectOrder",
    reward: { pt: "4x Taco Picante", en: "4x Spicy Taco" },
  },
  {
    id: "magilume",
    code: "Magilume",
    reward: { pt: "2.000 de Pó de Elemental", en: "2,000 Sprite Dust" },
  },
  {
    id: "chispambo",
    code: "Chispambo",
    reward: { pt: "2.000 de Pó de Elemental", en: "2,000 Sprite Dust" },
  },
  {
    id: "abgestaubt",
    code: "abgestaubt",
    reward: { pt: "2.000 de Pó de Elemental", en: "2,000 Sprite Dust" },
  },
  {
    id: "perlimpinpin",
    code: "Perlimpinpin",
    reward: { pt: "2.000 de Pó de Elemental", en: "2,000 Sprite Dust" },
  },
  {
    id: "reachyourimpossible",
    code: "REACHYOURIMPOSSIBLE",
    reward: {
      pt: "Tela de carregamento Block Party",
      en: "Block Party Loading Screen",
    },
  },
  {
    id: "bemorealien",
    code: "BeMoreAlien",
    reward: {
      pt: "Tela de carregamento Override Ready",
      en: "Override Ready Loading Screen",
    },
  },
  {
    id: "letsblockandroll",
    code: "LetsBlockAndRoll",
    reward: {
      pt: "Transforma você num bloco de Tetris temporariamente",
      en: "Transforms you into a Tetris block temporarily",
    },
  },
  {
    id: "dontblockme",
    code: "DontBlockMe",
    reward: {
      pt: "Transforma você num bloco de Tetris temporariamente",
      en: "Transforms you into a Tetris block temporarily",
    },
  },
];
