# Handoff — Cycle distressed-M&A #4 : asset-vs-share-distress livré, MOAT COMPLET (2026-06-15)

> Contexte pour reprendre dans une nouvelle session. Repo :
> `jamon8888/hacienda-juridique`. Plugin : `plugins/hacienda-droit-affaires` (DA).
> Suite du handoff `docs/handoff/handoff-2026-06-15-cession-actifs-isoles.md`.

## Ce qui a été fait cette session

**Objectif** : cycle distressed-M&A #4 — **asset vs share deal en distress**, skill
**routeur amont** qui chapeaute le moat (arbitrage de structuration titres vs actifs).

**Résultat : skill `asset-vs-share-distress` livré, gate-clean ADMIS 1,0 (sans faute au
1er cycle), DA bumpé en v0.9.0. PR #56 ouverte vers `main`**
(https://github.com/jamon8888/hacienda-juridique/pull/56).

**🏰 Le moat distressed-M&A est désormais COMPLET (4 skills) :**
`prevention-difficultes` (préventif) → `pre-pack-cession` (montage amont confidentiel)
→ `reprise-a-la-barre` (plan de cession en RJ/LJ) → `cession-actifs-isoles` (actifs
isolés en LJ), le tout orienté en amont par **`asset-vs-share-distress`** (entonnoir
titres vs actifs).

### Le skill
- `plugins/hacienda-droit-affaires/skills/asset-vs-share-distress/SKILL.md` (moule V2).
- **Livrable** : note d'**orientation** côté repreneur, mode unique. **Décide et route,
  n'exécute pas** (ne déroule pas L.642-x, ne rédige aucun acte) ; **aucun conseil
  fiscal** (flag + renvoi).
- **Double gate** :
  - **Gate 1 — diagnostic niveau de difficulté + routage** : CP > 45 j sans procédure →
    déclaration / `prevention-difficultes` ; sinon route vers `pre-pack-cession` /
    `reprise-a-la-barre` / `cession-actifs-isoles` / `spa-review`.
  - **Gate 2 — responsabilité repreneur** : (a) share deal ne purge **aucun** passif ;
    (b) période suspecte **L.632-1 / L.632-2** (acquisition pré-procédure annulable).
- Opère aussi : arbitrage titres/actifs distress-aware, L.1224-1 (social), solidarité
  fiscale L.1684 CGI (flag), extension/confusion de patrimoine, insuffisance d'actif
  L.651-2, passif environnemental ICPE.
- Design : `docs/superpowers/specs/2026-06-15-hacienda-da-asset-vs-share-distress-design.md`.
- Plan : `docs/superpowers/plans/2026-06-15-hacienda-da-asset-vs-share-distress.md`.

### Scoring blind (dataset `plugins/hacienda-droit-affaires/tests/datasets/da-asset-vs-share-distress/`)
| Cycle | Code | Score | Verdict |
|---|---|---|---|
| 1 | AVS1RT | **1,0** | **ADMIS gate-clean (9 CRITIQUE / 9)** — sans faute au 1er cycle |

- **Grille (ground-truth.md)** : 25 critères, **9 CRITIQUE / 13 MAJEUR / 3 MINEUR**.
- **Checkpoint gates fait** (relu en Opus) : 9 gates CRITIQUE tous gate-piège binaires
  propres (PASS = complément exact du FAIL). Les 2 points subtils pré-identifiés
  (routage CP>45j C-003, Verdeval change-of-control C-010) sont PASS en live.
- **Live exécuté en Sonnet** (barre représentative Cowork, pas d'Opus qui flatte).
- Base de preuve = **1 cycle gate-clean ADMIS** (run unique ; option run de confirmation
  écartée — grille relue + pièges subtils passés).

## Reste à faire

1. **Merger PR #56** (bump v0.9.0). Une fois mergé → DA en v0.9.0, moat distressed-M&A
   complet.
2. **Pistes futures éventuelles** (le moat de base est complet — ces pistes sont
   optionnelles, à cadrer au brainstorming si on veut élargir) :
   - **Côté cédant/débiteur** : tous les skills du moat sont côté repreneur ; un pendant
     côté cédant (vendre une entreprise en difficulté) serait un nouveau pan.
   - **Mode `--review`** sur les skills distress (relire une offre/structure déjà
     rédigée) — reporté en v1 partout.
   - **Cibles cotées** (AMF) — anticipé v2, source AMF non dans core v1.

## Acquis méthodologiques (cette session)

- **Sonnet pour les sessions fraîches Phase 3 live** : test plus représentatif des
  utilisateurs Cowork, lecture honnête du plancher du skill (Opus a tendance à flatter
  en comblant les trous). Garder le **même modèle live sur tous les cycles d'un skill**.
  Cf. [[feedback-proactive-cost-model-advice]].
- **Checkpoint gates AVANT la Phase 3 live** : ici le live a été lancé avant le
  checkpoint. Récupérable car je n'avais pas lu le live-output → j'ai pu relire la grille
  sans la tuner au résultat (intégrité blind préservée). Règle : ne JAMAIS modifier la
  grille en connaissant le résultat du live ; si correction nécessaire, re-run le live.
- **ENOSPC tmpfs (récurrent, aggravé)** : les jobs de vérif en arrière-plan remplissent
  `/private/tmp/claude-501/.../tasks/*.output`. Parade : `export CLAUDE_CODE_TMPDIR=~/.claude-tmp`,
  rediriger la sortie vers un log home (`~/x.log`) et la **lire avec l'outil Read** (qui
  ne passe pas par le tmpfs de capture). Purger : `find /private/tmp/claude-501 -name "*.output" -delete`.
- **Smoke test `sources-officielles` rouge = panne PISTE externe** (403/503/401), pas une
  régression skill. Le blanchir par `git diff --name-only main...HEAD` (le diff DA ne
  touche aucun fichier core/sources-officielles). Le test qui valide un skill DA, c'est
  `hacienda-droit-affaires-cowork-structure` (count des skills).

## Conventions skill V2 (rappel)

- Frontmatter `version: "2.0.0"` + `argument-hint`. Headings canoniques : Examples /
  Chargement du profil / Intake / Gate non-juriste / Outils MCP / Emplacement / Sortie.
- Wrapper `commands/h-da/<skill>.md` + entrée README `/h-da:<skill>` + **count hardcodé**
  dans `hacienda-droit-affaires-cowork-structure.test.ts` (désormais `toBe(26)`).
- Version : bumper **les 5 fichiers** (version.json, manifest.json, mcp-server/package.json,
  .claude-plugin/plugin.json, .claude-plugin/marketplace.json — 6 occurrences, marketplace
  en a 2) + CHANGELOG.
- **Allocation modèle moat DA** : plan/doctrine + analyse gate-driven = Opus ; build
  T1-T4 + Phase 3 live = Sonnet ; Phase 2/4 = Codex.
