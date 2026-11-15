// ARQUIVO GERADO AUTOMATICAMENTE — não edite à mão.
// Gerado por scripts/update-sprites.mjs (workflow update-sprites.yml), que
// consulta a página de Baús do Tesouro do IGN todo dia e ADICIONA aqui as
// semanas que ainda não estão em data/treasure-rewards.js.
//
// Para traduzir/curar uma semana desta lista, MOVA a entrada pra
// data/treasure-rewards.js: o gerador pula semanas que já estão na lista
// manual e a cópia daqui some na próxima execução.
const AUTO_TREASURE_WEEKS = [];

// Anexa as semanas que ainda não estão na lista manual.
AUTO_TREASURE_WEEKS.forEach((w) => {
  if (TREASURE_WEEKS.some((x) => x.week === w.week)) return;
  TREASURE_WEEKS.push(w);
});

