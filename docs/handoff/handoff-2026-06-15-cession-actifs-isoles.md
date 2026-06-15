# Handoff — Cycle distressed-M&A #3 : cession-actifs-isoles livré (2026-06-15)

> Contexte pour reprendre dans une nouvelle session. Repo :
> `jamon8888/hacienda-juridique`. Plugin : `plugins/hacienda-droit-affaires` (DA).
> Suite du handoff `docs/handoff/handoff-2026-06-15-reprise-a-la-barre.md`.

## Ce qui a été fait cette session

**Objectif** : cycle distressed-M&A #3 — **cession d'actifs isolés en LJ (L.642-19)**,
complément naturel de `reprise-a-la-barre` (qui l'exclut explicitement « hors plan de
cession »), zéro chevauchement.

**Résultat : skill `cession-actifs-isoles` livré, gate-clean RÉSERVES 0,9385, DA bumpé
en v0.8.0. PR #55 ouverte vers `main`** (https://github.com/jamon8888/hacienda-juridique/pull/55).

### Le skill
- `plugins/hacienda-droit-affaires/skills/cession-actifs-isoles/SKILL.md` (moule V2).
- **Livrable** : note tactique **côté repreneur uniquement**, mode unique (pas de `--review`).
- **Périmètre** : L.642-19 (mobiliers/incorporels/fonds/IP/stock/créances). **Immeubles
  L.642-18 hors-scope** (flag + renvoi).
- **Double gate** :
  - **Gate 1 — qualification** : actif **isolé** vs entreprise/unité de production en
    going concern. Si going concern → **renvoi `reprise-a-la-barre`** ; si amont
    confidentiel → **renvoi `pre-pack-cession`**. Porte la frontière anti-chevauchement.
  - **Gate 2 — recevabilité** : (a) éligibilité **L.642-20→L.642-3** (interdictions /
    interposition) ; (b) **ordonnance du juge-commissaire L.642-19** (une offre au
    liquidateur ne vaut pas vente).
- Opère : sort des sûretés (report droit de préférence sur prix, **droit de rétention
  non purgé** art. 2286, purge au paiement), **L.642-7 a contrario** (pas de transfert
  auto des contrats), **L.1224-1** (transfert auto des salariés si entité autonome —
  piège inverse), **L.632-1** (période suspecte), recours L.661-x.
- Design : `docs/superpowers/specs/2026-06-15-hacienda-da-cession-actifs-isoles-design.md`.
- Plan : `docs/superpowers/plans/2026-06-15-hacienda-da-cession-actifs-isoles.md`.

### Les 2 cycles de scoring blind (dataset `plugins/hacienda-droit-affaires/tests/datasets/da-cession-actifs-isoles/`)
| Cycle | Code | Score | Verdict | Action |
|---|---|---|---|---|
| 1 | CAI1QU | 0,877 | RÉSERVES gate-clean | **C-006 + C-016 MAJEUR FAIL** (résiduels, pas de gate) |
| 2 | CAI2EN | **0,9385** | **RÉSERVES gate-clean (8 CRITIQUE / 8)** | C-006/C-016 fermés ; résiduel C-019 |

- **Grille (ground-truth.md)** : 22 critères, **8 CRITIQUE / 13 MAJEUR / 1 MINEUR**.
- **Checkpoint gates fait cette fois** (leçon reprise) : les 8 CRITIQUE sont des gates
  binaires propres (PASS = complément exact du FAIL), pas de « piège + recall ». Aucun
  faux REJETÉ.
- **Correctifs cycle 1 → 2** (enrichissement MAJEUR, pas de gate) : **C-006** —
  éligibilité reformulée en *faits à établir* (qualité exacte à l'ouverture, dirigeance
  de fait, interposition, bénéficiaire effectif) au lieu d'une nullité tranchée ;
  **C-016** — ligne DD sur consistance/valeur réelle des actifs (inventaire, péremption,
  propriété, assurance).
- **Résiduel non-gating** : **C-019** (arbitrages client enchérir/retrait) — variance de
  scoreur (PASS au cycle 1, non touché par l'enrichissement).

## Reste à faire

1. **Merger PR #55** (bump v0.8.0). Une fois mergé → DA en v0.8.0.
2. **Prochain cycle distressed-M&A** (dernier candidat du moat identifié) :
   | Candidat | Périmètre | Articles |
   |---|---|---|
   | **Asset vs share deal en distress** | arbitrage de structuration quand la cible est en difficulté (rachat d'actifs vs rachat de titres), responsabilité du repreneur, risque de nullités | L.632-1, L.632-2, responsabilité repreneur |
   → C'est l'angle « décision de structuration amont » qui chapeaute `reprise-a-la-barre`
   (plan de cession), `cession-actifs-isoles` (actifs isolés) et `pre-pack-cession`
   (montage confidentiel). À cadrer au brainstorming : risque de redondance à surveiller
   (il devra *router* vers les 3 skills existants plutôt que les dupliquer).

## Acquis méthodologiques (cette session)

- **Piège `PASS_WITH_RESERVE`** : Codex émet parfois un verdict hors barème binaire
  (`tiered_scoring.py` n'accepte que PASS|FAIL → ValueError). Normaliser **conservateur
  = FAIL** (ne pas sur-vendre un ADMIS sur un critère hedgé), documenter dans le commit.
  Si MAJEUR non-gating, ça ne change pas la décision gate-clean.
- **Checkpoint gates Phase 2→3 fait** (le saut avait coûté un faux REJETÉ sur reprise) :
  vérifier que chaque gate CRITIQUE a un trigger FAIL binaire et que PASS = complément
  exact. Ici les 8 étaient propres → 8/8 PASS en live dès le cycle 1.
- **Variance de scoreur** : un critère peut flipper PASS↔FAIL entre deux runs blind sur
  un contenu non modifié (C-019). Ne pas sur-interpréter comme une régression ; vérifier
  que l'enrichissement a bien touché *ce* critère avant de conclure.
- **Code défaut par cycle** : bumper `code_for` dans `da-scoring.sh` à chaque cycle
  (CAI1QU → CAI2EN) pour que `phase4`/`aggregate` lisent le bon `verdicts-<CODE>.json`.
- **Dataset sous le plugin** : `DATASET_ROOT` pointe
  `plugins/hacienda-droit-affaires/tests/datasets/` (pas la racine `tests/`).

## Pièges environnement (récurrents)

- ENOSPC intermittent sur le FS temp : rediriger vers un log hors `/tmp` (`~/x.log`) puis
  Read.
- Heredoc imbriqué dans `gh pr create` → écrire le corps dans un fichier + `--body-file`.
- PR : cibler `main` directement ; vérifier que `main` n'a pas avancé avant push.
- `live-output.md` à garder sous le dataset, jamais à la racine.

## Conventions skill V2 (rappel)

- Frontmatter `version: "2.0.0"` + `argument-hint`. Headings canoniques : Examples /
  Chargement du profil / Intake / Gate non-juriste / Outils MCP / Emplacement / Sortie.
- Wrapper `commands/h-da/<skill>.md` (description + argument-hint identiques au SKILL.md)
  + entrée README `/h-da:<skill>` + **count hardcodé** dans
  `hacienda-droit-affaires-cowork-structure.test.ts` (désormais `toBe(25)`).
- Version : bumper **les 5 fichiers** (version.json, manifest.json, mcp-server/package.json,
  .claude-plugin/plugin.json, .claude-plugin/marketplace.json — 6 occurrences, marketplace
  en a 2) + CHANGELOG.
