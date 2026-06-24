# Handoff — Routeur `cas` + pan cédant/débiteur ouvert avec DCP ADMIS (2026-06-19)

> **État au moment du handoff : DA en v0.11.0 sur `main`.** PR #58 (`cas`) et
> PR #59 (`declaration-cessation-paiements`) **mergées**. Branches features
> nettoyées. Aucun reste à faire bloquant — la session s'arrête sur un point
> d'arrêt propre.

> Contexte pour reprendre dans une nouvelle session. Repo :
> `jamon8888/hacienda-juridique`. Plugin : `plugins/hacienda-droit-affaires` (DA).
> Suite du handoff `docs/handoff/handoff-2026-06-15-asset-vs-share-distress.md`.

## Ce qui a été fait cette session

### 1. Skill routeur d'entrée `cas` — MERGÉ (PR #58)
- `/h-da:cas` : **point de départ** de toute requête DA dans Cowork. Trie par TYPE
  de dossier, rappelle l'anonymisation avant ingestion, route vers le bon skill ou
  sous-routeur (`asset-vs-share-distress`). **Oriente, n'exécute pas.** Agnostique
  au side (le side reste demandé par le skill cible). Front-door + auto-activation.
- **Non-doctrinal → pas de scoring blind** ; validé par **éval de routage live 15/15**
  (pièges anti-interception + gate anonymisation inclus).
- Fix au passage : préfixe périmé `/h-droit-affaires:` → `/h-da:` dans `entretien-demarrage`.
- DA bumpé **v0.9.0 → v0.10.0** (26 → 27 skills). PR #58 **mergée**.
- Design : `docs/superpowers/specs/2026-06-17-hacienda-da-orientation-router-design.md`.
- Nom retenu `cas` côté persona avocat (« j'ai un cas ») — pas `aide` (un avocat
  n'aime pas être en position d'aidé). Cf. [[feedback-naming-persona-avocat]].

### 2. Pan cédant/débiteur ouvert — skill `declaration-cessation-paiements` ADMIS (PR #59, à merger)
- **1er skill du pendant côté cédant/débiteur** du moat distressed (les skills
  existants étaient ~100 % repreneur). Miroir débiteur de `declaration-creance`.
- `/h-da:declaration-cessation-paiements` : prépare la **déclaration de cessation
  des paiements** (« dépôt de bilan ») à déposer au greffe. Gate CdP (L.631-1) →
  renvoi `prevention-difficultes` si pas en CdP ; délai 45 j (L.631-4/L.640-4) en
  lecture **conditionnelle** ; **alerte expo dirigeant** (L.653-8/L.651-2/période
  suspecte) **nommée, pas évaluée** ; pièces R.631-1 complètes ; orientation
  tribunal + RJ/LJ sans trancher ; **anti-fabrication de dates strict**.
- DA bumpé **v0.10.0 → v0.11.0** (27 → 28 skills). **PR #59 mergée.**
- Design : `docs/superpowers/specs/2026-06-18-hacienda-da-declaration-cessation-paiements-design.md`.
- Plan : `docs/superpowers/plans/2026-06-18-hacienda-da-declaration-cessation-paiements.md`.

### Scoring blind DCP (dataset `tests/datasets/da-declaration-cessation-paiements/`)
| Cycle | Statut | Score | Gates | majeur_rate |
|---|---|---|---|---|
| DCP1RT | REJETÉ | 0,0 | C-008, C-029 | 0,68 |
| DCP2RT | RÉSERVES | 0,872 | clean | 0,84 |
| DCP3RT | REJETÉ | 0,0 | C-029 | 0,92 |
| **DCP4RT** | **ADMIS** | **1,0** | **clean** | **1,0** |

- Grille (`ground-truth.md`) **verrouillée dès Phase 2**, inchangée sur les 4 cycles.
  Live en **Sonnet**. Checkpoint gates fait avant Phase 3 (C-013 reformulé pré-live).
- **Fragilité récurrente = fabrication de dates** (axe C-008/C-029) : verrouillée
  (rester en semaines relatives, jamais de date calendaire ni de retard précis ;
  1er impayé = indice, pas la date). Cf. [[feedback-date-fabrication-scoring-variance]].
- Backlog + artefacts par cycle conservés (`da-scoring-…-DCPxRT.md`,
  `verdicts-DCPxRT.json`, `live-output-DCPxRT.md`). Synthèse release en tête du
  backlog DCP4RT.

### 3. Wrapper `scripts/da-scoring.sh` durci (anti-footgun code de cycle)
- `aggregate` : lit le `verdicts-*.json` **le plus récent** quand `CODE` absent +
  **affiche le fichier lu** (fini les lectures stale silencieuses).
- `phase4` : **refuse de tourner sans `CODE` explicite** dès qu'un cycle existe
  (évite d'écraser/réutiliser un code périmé) ; affiche le code retenu.
- Nouvelle commande **`cycles <skill>`** : liste tous les cycles + verdict agrégé.
- `declaration-cessation-paiements` enregistré dans la table SKILLS (code défaut DCP1RT).

## Reste à faire (pour la prochaine session)

**Le cycle DCP est entièrement soldé.** DA est en **v0.11.0 sur `main`** ; branches
`feat/da-orientation-router` (PR #58) et `feat/da-declaration-cessation-paiements`
(PR #59) supprimées en local. Le pan cédant/débiteur a son 1er skill livré, ADMIS
gate-clean au 4ᵉ cycle.

**Suite du pan cédant/débiteur** (chaque skill = son cycle spec → plan → impl → scoring,
à brainstormer en début de prochaine session) :

- **C — Responsabilité du dirigeant** : évaluation faute de gestion / insuffisance
  d'actif **L.651-2** / interdiction de gérer **L.653-8** / sort des cautions perso.
  Le skill DCP **nomme** l'exposition et y renvoie → C l'**évaluera**. ⚠️ Verrouiller
  l'anti-fabrication de dates **dès le design** (même piège récurrent que DCP, axe
  C-008/C-029 — cf. [[feedback-date-fabrication-scoring-variance]]).
- **A — Orientation/arbitrage cédant** (routeur miroir de `asset-vs-share-distress`
  côté vendeur, mais 100 % débiteur cédant) : à construire **en dernier** (feuilles
  d'abord, comme pour le moat repreneur), il coiffera le pan et routera vers
  `prevention-difficultes` / `pre-pack-cession` / `declaration-cessation-paiements`
  / futur C.

**Pistes annexes optionnelles** (à arbitrer si tu veux les sortir avant C/A) :
- Mode `--review` sur les skills distress (relire une déclaration / une offre déjà
  rédigée). Audience étroite, gain incrémental.
- Cibles cotées / AMF (anticipation v2, source AMF non dans core v1).

**Intendance** :
- Modifs locales pré-existantes non liées au pan : `AGENTS.md`, `CLAUDE.md`, `.claude/`
  (toujours présentes depuis le début de la session, hors PR — à arbitrer séparément).
- Index GitNexus stale (`668345e`) : un `npx gitnexus analyze` rafraîchira la base.

## Acquis méthodologiques (cette session)

- **Nommage par persona** : nommer les commandes par le besoin de l'avocat (mot natif,
  scannable en palette), pas par la mécanique ; filtre psychologique (un avocat n'aime
  pas être « aidé »). L'auto-activation porte le quotidien ; le nom ne sert qu'au
  filet palette. Cf. [[feedback-naming-persona-avocat]].
- **Fabrication de dates** = piège récurrent des skills doctrinaux à calcul de délai ;
  fermer le chemin de fabrication dans le wording (semaines relatives), pas seulement
  le déconseiller. Cf. [[feedback-date-fabrication-scoring-variance]].
- **`SEUIL_ADMIS = 1.0`** (tous MAJEUR) sensible à la variance run+scorer : borner
  l'effort (« N cycles puis on assume »), corriger les vraies causes (jamais tuner la
  grille post-live), garder les artefacts par cycle pour distinguer régression vs bruit.
- **Footgun code de cycle** dans le wrapper de scoring : toujours `CODE=<cycle>` pour
  un re-run ; `cycles <skill>` pour vérifier l'historique avant de conclure.
- **Skill non-doctrinal (routeur)** → pas de scoring blind, éval de routage légère
  suffit (`cas`). Skill **doctrinal** (livrable à conséquences) → scoring blind 4 phases.

## Conventions skill V2 (rappel)

- Frontmatter `version: "2.0.0"` + `argument-hint`. Headings canoniques imposés par
  `hacienda-droit-affaires-cowork-structure.test.ts` : Examples / Chargement du profil
  / Intake / Gate non-juriste / Outils MCP / Emplacement / Sortie (section MCP doit
  contenir `piste_status`/`legifrance_recherche`/`judilibre_recherche`/`eurlex_recherche`).
- Wrapper `commands/h-da/<skill>.md` (description + argument-hint identiques au SKILL.md)
  + entrée README `/h-da:<skill>` + **count hardcodé** dans le test (désormais `toBe(28)`).
- Version : bumper version.json, manifest.json, mcp-server/package.json,
  .claude-plugin/plugin.json, .claude-plugin/marketplace.json (×2) + CHANGELOG.
- **Allocation modèle** : plan/doctrine + analyse gate-driven = Opus ; build T1-T4 +
  Phase 3 live = Sonnet ; Phase 2/4 = Codex. **Token economy : Candy lance les
  commandes de scoring** (wrapper), Claude prépare les prompts.
