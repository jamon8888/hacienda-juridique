# Handoff — Pan cédant/débiteur : `responsabilite-dirigeant` ADMIS gate-clean (2026-06-24)

> **État au moment du handoff : DA en v0.12.0 sur `main` (poussé sur `origin`).**
> Skill `responsabilite-dirigeant` livré, mergé (merge no-ff `0ba8d33`), scoring
> blind **ADMIS gate-clean 1,0 au 1ᵉʳ cycle (RDG1RT)**. Aucun reste à faire
> bloquant — point d'arrêt propre.

> Contexte pour reprendre dans une nouvelle session. Repo :
> `jamon8888/hacienda-juridique`. Plugin : `plugins/hacienda-droit-affaires` (DA).
> Suite du handoff `docs/handoff/handoff-2026-06-19-pan-cedant-debiteur-dcp.md`.

## Ce qui a été fait cette session

### Skill `responsabilite-dirigeant` — livré, mergé, ADMIS (v0.12.0)
- **2ᵉ feuille du pan cédant/débiteur.** Évalue ce que `declaration-cessation-paiements`
  (DCP) **nomme** : la responsabilité personnelle du dirigeant.
- `/h-da:responsabilite-dirigeant` : approche **tout-en-un, triage interne**, sur
  **4 axes** systématiquement évalués (aucun skip silencieux) :
  1. **L.651-2** contribution à l'insuffisance d'actif (+ sous-cas **L.652-1**
     confusion de patrimoine / fictivité).
  2. **L.653-x** sanctions personnelles (interdiction de gérer L.653-8 ; faillite
     personnelle L.653-3 s. ; durée max 15 ans L.653-11).
  3. **L.654-1 banqueroute — NOMMÉE, jamais évaluée** (renvoi pénaliste ; parallèle
     exact à DCP qui nomme L.651-2). Aucune note 🟢🟡🟠🔴 sur cet axe.
  4. **Cautions personnelles** : sort selon la phase (observation L.622-28/L.631-14,
     plan L.626-11, clôture LJ L.643-11) + recours créancier hors procédure.
- **Qualification + facteurs** (🟢🟡🟠🔴 + aggravants/atténuants), **jamais de
  quantum**, **jamais de mémoire en défense** (renvoi contentieuiste si action
  engagée). **Tous stades** couverts (pré-CdP imminente / RJ-LJ ouverte / action
  engagée), gate intake « stade de procédure » obligatoire.
- **Anti-fabrication verrouillé dès le design** (G1 dates relatives / G2 no-quantum
  / G3 faits en indices / G4 banqueroute nommée / G5 cautions). Cf.
  [[feedback-date-fabrication-scoring-variance]].
- Renvois **DCP → C** branchés (2 spots), **ligne de routage `cas`** ajoutée.
- Design : `docs/superpowers/specs/2026-06-24-hacienda-da-responsabilite-dirigeant-design.md`.
- Plan : `docs/superpowers/plans/2026-06-24-hacienda-da-responsabilite-dirigeant.md`.
- DA bumpé **v0.11.0 → v0.12.0** (28 → 29 skills).

### Scoring blind (dataset `tests/datasets/da-responsabilite-dirigeant/`)
| Cycle | Statut | Score | Gates | majeur | mineur |
|---|---|---|---|---|---|
| **RDG1RT** | **ADMIS** | **1,0** | **clean** | 1,0 | 1,0 |

- **ADMIS au premier coup** (DCP avait pris 4 cycles). Live en **Sonnet**.
- **Checkpoint gates pré-live décisif** : 3 gates CRITIQUE étaient des gate-recall
  (zone orpheline → faux REJETÉ). Recalibrés **avant** Phase 3 (PASS = complément
  exact du FAIL, FAIL inchangé) : **C-006** (conditions cumulatives L.651-2),
  **C-021** (banqueroute), **C-025** (suspension caution en observation). Les
  attentes affirmatives déplacées restent couvertes en MAJEUR (C-001, C-027).
  Cf. [[feedback-gate-calibration-scoring]].
- ⚠️ **Bug wrapper corrigé** : le code par défaut `RD1RT` était invalide (5 car.,
  le validateur en exige 6) → corrigé en **`RDG1RT`** (`a1a0fe4`). Pattern à
  respecter pour les futurs skills : code 6 caractères (ex. `XXX1RT`).
- Artefacts conservés : `ground-truth.md`, `live-output.md` (+ archive
  `live-output-RDG1RT.md`), `verdicts-RDG1RT.json`, `scenario.md`.

## Reste à faire (prochaine session)

**Le cycle responsabilité est entièrement soldé.** DA est en **v0.12.0 sur `main`**
(poussé). Le pan cédant/débiteur a maintenant **2 feuilles** (DCP + responsabilité)
+ `prevention-difficultes`.

**Suite du pan — A : Routeur/arbitrage cédant** (dernière pièce, à brainstormer en
début de session) :
- Miroir de `asset-vs-share-distress` mais **100 % côté cédant/débiteur**.
- **C'est le bon moment** : avec 3 destinations réelles (`prevention-difficultes`
  / `declaration-cessation-paiements` / `responsabilite-dirigeant` — plus
  `pre-pack-cession` côté montage), le routeur a enfin un vrai arbre de décision.
  Construit feuilles-d'abord comme le moat repreneur : A coiffe le pan.
- **Non-doctrinal → pas de scoring blind** (comme `cas`) : éval de routage live
  suffit. Cf. acquis méthodo DCP.

**Pistes annexes optionnelles** (à arbitrer) :
- Futur **`defense-comblement-passif`** : mémoire en défense quand une action
  L.651-2 / L.653-8 est engagée (C qualifie, ne rédige pas la défense — frontière
  posée dans le design de C). Audience contentieuse, plus étroite.
- Mode `--review` distressed sur `spa-review` / `gap-review` (relire un SPA sous
  l'angle « cible en difficulté ») — touche le quotidien M&A/PE, pas seulement les
  dossiers procédure.
- Cibles cotées / AMF — anticipation v2, source AMF hors core v1.

**Intendance** :
- Modifs locales pré-existantes hors PR : `AGENTS.md`, `CLAUDE.md`, `.claude/`
  (présentes depuis plusieurs sessions — à arbitrer séparément).
- Index GitNexus stale (`0ba8d33` + commits depuis) : `npx gitnexus analyze`.
- `docs/handoff/latest.md` figé au 28 mai (non maintenu à travers les handoffs
  récents) — décider de le resynchroniser ou de le supprimer.

## Acquis méthodologiques (cette session)

- **Verrouiller l'anti-fabrication dans le DESIGN, pas après le 1ᵉʳ rejet.** DCP a
  appris le piège en 4 cycles ; C l'a fermé d'emblée (G1-G5 dans le SKILL.md dès
  le build) → ADMIS au 1ᵉʳ cycle. Cf. [[feedback-date-fabrication-scoring-variance]].
- **Le checkpoint gates (entre Phase 2 et Phase 3) est le filet anti-faux-REJETÉ.**
  Relire les CRITIQUE et reformuler tout gate-recall (PASS doit être le complément
  exact du FAIL) **avant** le live, jamais après (intégrité blind). 3 gates
  recalibrés ici ont probablement évité un cycle perdu. Cf.
  [[feedback-gate-calibration-scoring]].
- **Codes de cycle : 6 caractères alphanumériques majuscules** (le wrapper valide
  strictement). `RD1RT` (5 car.) a été rejeté → `RDG1RT`.
- **Skill tout-en-un avec triage interne** quand le client pose UNE question (« je
  risque quoi ? ») et ne sait pas quel régime mord : le skill diagnostique, l'avocat
  ne pré-qualifie pas en palette. 4 axes évalués systématiquement, criticité max en
  tête.

## Conventions skill V2 (rappel)

- Frontmatter `version: "2.0.0"` + `argument-hint`. Headings canoniques imposés par
  `hacienda-droit-affaires-cowork-structure.test.ts` ; section MCP doit contenir
  `piste_status`/`legifrance_recherche`/`judilibre_recherche`/`eurlex_recherche`.
- Wrapper `commands/h-da/<skill>.md` (description + argument-hint identiques au
  SKILL.md) + entrée README `/h-da:<skill>` + **count hardcodé** dans le test
  (désormais `toBe(29)`).
- Version : bumper version.json, manifest.json, mcp-server/package.json,
  .claude-plugin/plugin.json, .claude-plugin/marketplace.json (×2) + CHANGELOG.
- **Allocation modèle** : design/doctrine + analyse gate-driven = Opus ; build
  T1-T4 + Phase 3 live = Sonnet ; Phase 2/4 = Codex (HIGH/medium). **Token economy :
  Candy lance les commandes de scoring** (wrapper) ; Claude prépare les prompts.
  Cf. [[feedback-token-economy-codex]], [[feedback-scoring-wrapper-workflow]].
