# Fortnite Sprites Locker

[🇧🇷 Português](README.md) | 🇺🇸 English

Web app (PWA) to track your **Sprite (Elemental)** collection in Fortnite Battle Royale — which ones you own, which ones you've mastered (including the Gold and special variants), and which Admin Panel codes ("Lobby Hack codes") you've already redeemed.

Current scope: **Chapter 7, Season 4 "Override"**.

🔗 Production: deployed via GitHub Pages from the `main` branch (see [Deploy](#deploy)).

## Features

- **Sprite collection** — mark each Elemental as owned and/or mastered, including its variants (Base, Gold, special).
- **Filters and sorting** — by rarity, owned/not owned, mastered/not mastered, favorites; sort by rarity or alphabetically.
- **Lobby codes** — list of Admin Panel codes, with a checklist of redeemed ones and the option to manually add a new code before the bot publishes it.
- **Export summary** — generates an image (PNG) with a summary of your collection to share.
- **Backup/restore** — exports your entire collection (items, favorites, codes) as a code/file and imports it on another device, with the option to merge or replace.
- **Compare with friends** — via link/code (no account needed) or, with an account, a friends list with live comparison.
- **Optional account (cloud sync)** — email/password login via Firebase to sync your collection across devices. Without `firebase-config.js` set up, the app works 100% locally, just without that option.
- **Installable, offline-capable PWA** — works installed (Android/iOS/desktop) and keeps working without internet via a service worker.
- **PT/EN** — interface available in Portuguese and English.

## Stack

Plain HTML, CSS and JavaScript (no framework, no build/bundler) + PWA (`manifest.webmanifest` and `sw.js`). Firebase (Authentication + Firestore) is only used for the optional account sync, loaded dynamically by `cloud-sync.js`.

## Project structure

```
index.html            App shell (HTML)
styles.css             Styles
app.js                 Core logic (collection, filters, export, backup, i18n)
icons.js                SVG icons used in the UI
cloud-sync.js           Optional login/sync via Firebase (only talks to app.js through events)
firebase-config.js       Firebase project config (not a secret, see the comment in the file)
sw.js                    Service worker (caches the app shell and Sprite images)
manifest.webmanifest      PWA manifest
data/
  elementals.js           Curated list of Sprites (PT/EN, rarity, abilities)
  elementals-auto.js       Newly detected Sprites, not yet curated
  cheat-codes.js           Curated list of Admin Panel codes
  cheat-codes-auto.js      Newly detected codes, not yet translated
scripts/
  update-sprites.mjs       Script that scrapes the IGN wiki and updates the *-auto.js files
.github/workflows/
  update-sprites.yml       Runs the script above daily and opens a PR with the new entries
  pages.yml                 Production deploy (main → gh-pages) via GitHub Pages
  pages-staging.yml         Staging deploy (staging branch → gh-pages/staging)
```

## Running locally

There's no build step or dependencies — just serve the static files from the project root, for example:

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000`. Account sync (Firebase) needs internet access to download the SDK from its CDN; without it, the app works the same, just without login.

## Automatic data updates

The `update-sprites.yml` workflow runs daily, scrapes the IGN wiki for new Sprites and codes, and adds them to `data/elementals-auto.js`/`data/cheat-codes-auto.js` (it never removes anything), opening a pull request against `main`. Manual curation then moves the new entries into `data/elementals.js`/`data/cheat-codes.js`, filling in the Portuguese text **as it appears in the game** (pt-BR).

## Deploy

- `pages.yml`: on every push to `main`, publishes the repository root to the `gh-pages` branch (served by GitHub Pages).
- `pages-staging.yml`: on every push to the `staging` branch, publishes to `gh-pages/staging`, to review changes before they go to production.
