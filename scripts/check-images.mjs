#!/usr/bin/env node
// Verifica se as imagens dos Sprites (base + cada variante) ainda carregam.
// Só relata os links quebrados — não escreve nada. A escolha do link certo
// pra substituir uma imagem quebrada é uma decisão de curadoria (a wiki
// pode ter renomeado o arquivo, trocado o hash etc.), não algo pra corrigir
// sozinho: ver IGN_ART e o comentário de `variantImage` em data/elementals.js.
//
// Uso:
//   node scripts/check-images.mjs
//
// Sai com código 1 se algum link estiver quebrado (dá pra usar em CI), 0 se
// todos carregarem. Erro de rede num link individual conta como quebrado;
// erro ao carregar os próprios dados (bug de parse) sobe e aborta o script.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MANUAL_FILE = join(ROOT, "data", "elementals.js");
const AUTO_FILE = join(ROOT, "data", "elementals-auto.js");

// Mesmo UA de scripts/update-sprites.mjs: a Fandom bloqueia clientes
// "não navegador".
const UA =
  "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0";

const TIMEOUT_MS = 15_000;
const CONCURRENCY = 8;

function loadElementals() {
  const manual = readFileSync(MANUAL_FILE, "utf8");
  const auto = readFileSync(AUTO_FILE, "utf8");
  return new Function(`${manual}\n${auto}\n;return ELEMENTALS;`)();
}

// Devolve { ok, status | error } pra uma URL. Tenta HEAD primeiro (mais
// barato); alguns CDNs recusam HEAD (405/403), então cai pra GET nesse caso.
async function checkUrl(url) {
  for (const method of ["HEAD", "GET"]) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        method,
        headers: { "User-Agent": UA },
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (res.ok) return { ok: true };
      if (method === "HEAD" && [403, 405, 501].includes(res.status)) continue;
      return { ok: false, error: `HTTP ${res.status}` };
    } catch (err) {
      clearTimeout(timer);
      if (method === "HEAD") continue;
      return { ok: false, error: err.message };
    }
  }
  return { ok: false, error: "método não suportado" };
}

// A Fandom bloqueia com 403 qualquer cliente de IP de datacenter/CI (ver
// comentário sobre o WAF dela em scripts/update-sprites.mjs) — inclusive
// navegador de verdade rodando de uma nuvem, não só bot. Um 403 vindo de lá
// não prova que a imagem sumiu pro usuário final, só que não dá pra checar
// daqui — então entra à parte, sem contar como link quebrado de verdade.
const isUnverifiable = (url, error) =>
  new URL(url).hostname === "fortnite.fandom.com" && error === "HTTP 403";

async function checkAll(targets) {
  const broken = [];
  const unverifiable = [];
  let next = 0;
  async function worker() {
    while (next < targets.length) {
      const target = targets[next++];
      const result = await checkUrl(target.url);
      if (result.ok) continue;
      if (isUnverifiable(target.url, result.error)) {
        unverifiable.push({ ...target, error: result.error });
      } else {
        broken.push({ ...target, error: result.error });
      }
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, targets.length) }, worker)
  );
  return { broken, unverifiable };
}

async function main() {
  const elementals = loadElementals();

  // De-duplica por URL: a mesma arte às vezes é reaproveitada entre
  // Sprites/variantes, não faz sentido checar duas vezes.
  const byUrl = new Map();
  for (const e of elementals) {
    const label = `${e.wikiName} (base)`;
    if (e.image && !byUrl.has(e.image)) {
      byUrl.set(e.image, { url: e.image, label, id: e.id });
    }
    for (const v of e.variants || []) {
      if (!v.image) continue;
      const vLabel = `${e.wikiName} (${v.name.en})`;
      if (!byUrl.has(v.image)) {
        byUrl.set(v.image, { url: v.image, label: vLabel, id: e.id });
      }
    }
  }

  const targets = [...byUrl.values()];
  console.log(`Checando ${targets.length} imagens únicas de ${elementals.length} Sprites...`);

  const { broken, unverifiable } = await checkAll(targets);

  if (unverifiable.length) {
    console.log(
      `\n${unverifiable.length} imagem(ns) da Fandom não verificável(is) (403 do WAF dela pra IP de nuvem — não é sinal de link quebrado):`
    );
    for (const u of unverifiable) {
      console.log(`  - [${u.id}] ${u.label}: ${u.url}`);
    }
  }

  if (!broken.length) {
    console.log("\nNenhuma imagem quebrada (fora as não verificáveis acima, se houver).");
    return;
  }

  console.log(`\n${broken.length} imagem(ns) quebrada(s):`);
  for (const b of broken) {
    console.log(`  - [${b.id}] ${b.label}: ${b.url} (${b.error})`);
  }
  process.exitCode = 1;
}

main().catch((err) => {
  console.error(err.message);
  process.exit(2);
});
