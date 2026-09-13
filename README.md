# Fortnite Sprites Locker

App web (PWA) para acompanhar sua coleção de **Sprites (Elementais)** do Fortnite Battle Royale — quais você já tem, quais já dominou (incluindo as variantes Dourada e especial) e quais códigos do Painel de Admin ("Lobby Hack codes") você já resgatou.

Escopo atual: **Chapter 7, Temporada 4 "Override"**.

🔗 Produção: publicado via GitHub Pages a partir da branch `main` (veja [Deploy](#deploy)).

## Funcionalidades

- **Coleção de Sprites** — marque cada Elemental como possuído e/ou dominado, com suas variantes (Base, Dourada, especial).
- **Filtros e ordenação** — por raridade, possuído/não possuído, dominado/não dominado, favoritos; ordenar por raridade ou ordem alfabética.
- **Códigos do lobby** — lista dos códigos do Painel de Admin, com checklist de resgatados e opção de cadastrar à mão um código novo antes de ele ser publicado pelo robô.
- **Exportar resumo** — gera uma imagem (PNG) com o resumo da coleção para compartilhar.
- **Backup/restauração** — exporta a coleção inteira (itens, favoritos, códigos) como código/arquivo e importa em outro aparelho, com opção de mesclar ou substituir.
- **Comparar com amigos** — por link/código (sem conta) ou, com conta, uma lista de amigos com comparação ao vivo.
- **Conta opcional (sincronização na nuvem)** — login por e-mail/senha via Firebase para sincronizar a coleção entre aparelhos. Sem `firebase-config.js` configurado, o app funciona 100% local, só sem essa opção.
- **PWA instalável e offline** — funciona instalado (Android/iOS/desktop) e continua funcionando sem internet via service worker.
- **PT/EN** — interface em português e inglês.

## Stack

HTML, CSS e JavaScript puro (sem framework, sem build/bundler) + PWA (`manifest.webmanifest` e `sw.js`). Firebase (Authentication + Firestore) é usado só para a sincronização opcional via conta, carregado dinamicamente pelo `cloud-sync.js`.

## Estrutura do projeto

```
index.html            Shell do app (HTML)
styles.css             Estilos
app.js                 Lógica principal (coleção, filtros, export, backup, i18n)
icons.js                Ícones SVG usados na interface
cloud-sync.js           Login/sincronização opcional via Firebase (só fala com app.js por eventos)
firebase-config.js       Configuração do projeto Firebase (não é segredo, ver comentário no arquivo)
sw.js                    Service worker (cache do app shell e das imagens dos Sprites)
manifest.webmanifest      Manifesto do PWA
data/
  elementals.js           Lista curada de Sprites (PT/EN, raridade, habilidades)
  elementals-auto.js       Sprites novos detectados automaticamente, ainda não curados
  cheat-codes.js           Lista curada de códigos do Painel de Admin
  cheat-codes-auto.js      Códigos novos detectados automaticamente, ainda não traduzidos
scripts/
  update-sprites.mjs       Script que raspa o wiki do IGN e atualiza os arquivos *-auto.js
.github/workflows/
  update-sprites.yml       Roda o script acima diariamente e abre um PR com as novidades
  pages.yml                 Deploy de produção (main → gh-pages) via GitHub Pages
  pages-staging.yml         Deploy de homologação (branch staging → gh-pages/staging)
```

## Rodando localmente

Não há build nem dependências — é só servir os arquivos estáticos a partir da raiz do projeto, por exemplo:

```bash
python3 -m http.server 8000
# ou
npx serve .
```

E abrir `http://localhost:8000`. A sincronização via conta (Firebase) precisa de acesso à internet para baixar o SDK do CDN; sem ela, o app funciona igual, só sem login.

## Atualização automática de dados

O workflow `update-sprites.yml` roda diariamente, raspa o wiki do IGN em busca de Sprites e códigos novos e os adiciona em `data/elementals-auto.js`/`data/cheat-codes-auto.js` (nunca remove nada), abrindo um pull request para a `main`. Depois, a curadoria manual move as entradas novas para `data/elementals.js`/`data/cheat-codes.js`, preenchendo o texto em português **como aparece no jogo** (pt-BR).

## Deploy

- `pages.yml`: a cada push na `main`, publica a raiz do repositório na branch `gh-pages` (servida pelo GitHub Pages).
- `pages-staging.yml`: a cada push na branch `staging`, publica em `gh-pages/staging`, para revisar mudanças antes de irem para produção.
