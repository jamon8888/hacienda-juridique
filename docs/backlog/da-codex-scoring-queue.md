# DA — File de scoring Codex (état + priorités par persona)

**But** : savoir, quand tu as des crédits Codex, **quoi scorer en premier** pour le
livrable v0.2.0 du plugin, et avec quelles commandes. Priorité = **persona ami /
procédures collectives** (décision de cadrage), puis transversal cabinet, puis frère M&A.

**Branche** : `feat/da-pc-foundation`. **Mis à jour** : 2026-06-03.

---

## Rappel — coût et workflow d'un cycle

Mode d'emploi complet : [`scripts/README-codex-blind-scoring.md`](../../scripts/README-codex-blind-scoring.md) §« Variante criteria atomiques tiered-gated ».

| Phase | Qui | Coût Codex |
|---|---|---|
| 2 — vérité terrain criteria (`phase2-criteria`, GPT-5.5 **HIGH**) | toi | 1 session |
| 3 — exécution live (session Claude **fraîche**, sans ground-truth) | toi | 0 (gratuit) |
| 4 — scoring (`phase4-criteria`, GPT-5.5 medium) → JSON verdicts | toi | 1 session |
| agrégation | `python3 scripts/tiered_scoring.py <ground-truth> <verdicts.json>` | 0 |

- **Cycle complet** (skill jamais scoré) ≈ **2 sessions Codex**.
- **Re-score** (grille déjà faite) = Phase 3 + Phase 4 ≈ **1 session Codex**.

---

## 🔴 P1 — cœur persona ami + transversal (livrable v0.2.0)

| # | Skill | Scénario blind | Grille (Phase 2) | État scoring | Prochaine action Codex |
|---|---|---|---|---|---|
| 1 | **declaration-creance** | ✅ `da-declaration-creance/scenario.md` | ✅ `ground-truth.md` (25 criteria, recalibrée B) | ✅ scoré 3× — **CBO94O : RÉSERVES** (score 0,85, **gate ouvert**, majeur 81 %, mineur 100 % ; IKJ4AF était INSUFFISANT, ZG7Q5O REJETÉ) | **A+B+D validés** (finding D fermé : C-011/C-012/C-023 FAIL→PASS en aveugle). **Finding F ouvert** : régressions C-006 (échues/à échoir) + C-009 (liste pièces) ; C-014 (base clause pénale) toujours FAIL. **Releasable v0.2.0** (pas de gate). ADMIS = brancher PISTE + traiter F en v0.3.0 |
| 2 | **mise-en-demeure-commerciale** | ✅ `da-mise-en-demeure-commerciale/scenario.md` | ✅ `ground-truth.md` (22 criteria, JSON pur) | ✅ scoré 2× — **FCQDWM : ADMIS** (score 0,95, **gate fermé**, majeur 100 %, mineur 75 % ; AOV4CS était REJETÉ) | **E1 fermé** (garde-fou L.622-21 rendu visible dans la note du relecteur → C-018 PASS en aveugle) ; **E2 tranché** ; E3 sans objet (C-007 couvert par template, C-012 attend bien « à parfaire »). **Releasable v0.2.0** |
| 3 | **declaration-creance `--releve-forclusion`** | ✅ `da-releve-forclusion/scenario.md` | ❌ à générer | jamais scoré | **CYCLE COMPLET** (P2 + P3 + P4) — mode distinct ; gate sur le délai d'action 6 mois + cause du relevé |
| 4 | **prevention-difficultes** | ✅ `da-prevention-difficultes/scenario.md` | ✅ `ground-truth.md` (Codex, 24 criteria, 6 gates) | ✅ scoré 1× — **WVGUC1 : RÉSERVES 0,87** (gate-clean **dès le cycle 1, sans correctif** ; 6/6 gates dont cessation des paiements 45j, L.631-1, new money L.611-11) | **Releasable RÉSERVES.** Résiduels non gating (M1) : C-008 (exclusion des concours antérieurs du privilège), C-016/C-018 (mineurs) |
| 5 | **analyser-rupture-brutale** | ✅ `da-rupture-brutale/scenario.md` | 🟡 `v2a/rupture-brutale-criteria.md` (format-pilote, **non blind**) | jamais scoré blind | **CYCLE** : régénérer une grille **blind** (P2) puis P3 + P4 |

### Commandes — P1 #1 (re-score declaration-creance)

```bash
# nouveau code de cycle
python3 -c "import secrets,string;print(''.join(secrets.choice(string.ascii_uppercase+string.digits) for _ in range(6)))"

# Phase 3 : session Claude FRAÎCHE, input = scenario.md seul, sortie → live-output.md (écraser l'ancien)
#   /h-droit-affaires:declaration-creance .../da-declaration-creance/scenario.md

# Phase 4 (la grille recalibrée a 25 criteria ; l'ancien verdicts-ZG7Q5O.json est périmé)
python3 scripts/codex-blind-scoring.py phase4-criteria \
  --skill declaration-creance --skill-version 2.0.0 --code <NOUVEAU_CODE> \
  --scenario plugins/hacienda-droit-affaires/tests/datasets/da-declaration-creance/scenario.md \
  --ground-truth plugins/hacienda-droit-affaires/tests/datasets/da-declaration-creance/ground-truth.md \
  --live-output plugins/hacienda-droit-affaires/tests/datasets/da-declaration-creance/live-output.md \
  --date <YYYY-MM-DD> \
  --output docs/backlog/da-scoring-declaration-creance-<NOUVEAU_CODE>.md
# sauver le JSON verdicts → .../da-declaration-creance/verdicts-<NOUVEAU_CODE>.json (UTF-8, pas /tmp)
python3 scripts/tiered_scoring.py \
  plugins/hacienda-droit-affaires/tests/datasets/da-declaration-creance/ground-truth.md \
  plugins/hacienda-droit-affaires/tests/datasets/da-declaration-creance/verdicts-<NOUVEAU_CODE>.json
```

### Commandes — P1 #2 (cycle mise-en-demeure)

```bash
# Phase 2 criteria (Codex HIGH)
python3 scripts/codex-blind-scoring.py phase2-criteria \
  --skill mise-en-demeure-commerciale \
  --skill-description "Mise en demeure commerciale B2B : qualification créance, sommes (intérêts 1344-1, forfait 40 € L.441-10, clause pénale 1231-5), délai raisonnable, garde-fou procédure collective L.622-21." \
  --domain droit-affaires --mode "draft payer côté créancier" \
  --scenario plugins/hacienda-droit-affaires/tests/datasets/da-mise-en-demeure-commerciale/scenario.md \
  --output plugins/hacienda-droit-affaires/tests/datasets/da-mise-en-demeure-commerciale/ground-truth.md

# nouveau code de cycle
python3 -c "import secrets,string;print(''.join(secrets.choice(string.ascii_uppercase+string.digits) for _ in range(6)))"

# Phase 3 : session Claude FRAÎCHE, input = scenario.md seul (PAS ground-truth.md)
#   /h-droit-affaires:mise-en-demeure-commerciale --draft --type=payer .../da-mise-en-demeure-commerciale/scenario.md
#   → sauver da-mise-en-demeure-commerciale/live-output.md

# Phase 4 criteria (Codex medium)
python3 scripts/codex-blind-scoring.py phase4-criteria \
  --skill mise-en-demeure-commerciale --skill-version 2.0.0 --code <CODE> \
  --scenario plugins/hacienda-droit-affaires/tests/datasets/da-mise-en-demeure-commerciale/scenario.md \
  --ground-truth plugins/hacienda-droit-affaires/tests/datasets/da-mise-en-demeure-commerciale/ground-truth.md \
  --live-output plugins/hacienda-droit-affaires/tests/datasets/da-mise-en-demeure-commerciale/live-output.md \
  --date <YYYY-MM-DD> \
  --output docs/backlog/da-scoring-mise-en-demeure-commerciale-<CODE>.md
# sauver le JSON verdicts → da-mise-en-demeure-commerciale/verdicts-<CODE>.json (UTF-8, pas /tmp), puis agréger :
python3 scripts/tiered_scoring.py \
  plugins/hacienda-droit-affaires/tests/datasets/da-mise-en-demeure-commerciale/ground-truth.md \
  plugins/hacienda-droit-affaires/tests/datasets/da-mise-en-demeure-commerciale/verdicts-<CODE>.json
```

> ⚠️ À surveiller à la lecture de la grille mise-en-demeure : ≥ 1 gate CRITIQUE sur la
> **détection procédure collective** (si débiteur en RJ → STOP, pas de mise en demeure) ;
> base intérêts/forfait taguée `[à vérifier]` (pas de taux inventé).

---

## 🟠 P2 — couverture ami à CONSTRUIRE puis scorer

| Workflow | Type | État | Note |
|---|---|---|---|
| #2 relevé de forclusion L.622-26 | mode sur `declaration-creance` | ✅ **construit** (`ee665fc`) → remonté en P1 #3 | — |
| #3 prévention difficultés (mandat ad hoc, conciliation, sauvegarde accélérée) | nouveau skill | ✅ **construit** (`f3d5081`) → remonté en P1 #4 | — |

→ construire le SKILL.md + scénario blind (gratuit, sans Codex), puis remonter en P1.

---

## 🟡 P3 — cœur persona frère M&A (vague suivante, hors livrable v0.2.0)

Aucun scoré blind. Scénarios partiels existants (`v2-spa/`, `v1.1/`). À scorer
seulement quand le cycle ami sera clos : `spa-review`, `gap-review`,
`loi-term-sheet`, `due-diligence-dataroom`, `closing-checklist-fr`,
`pacte-associes-review`.

---

## Findings ouverts

| Skill | Finding | État |
|---|---|---|
| declaration-creance | A — correctifs skill (prorogation, certification, escalade revendication) | ✅ fait (`733f362`) |
| declaration-creance | B — recalibrage grille (split C-001/C-025, C-012, C-023) | ✅ fait (`94fe91e`) |
| tooling | C — niveau autoritatif depuis ground-truth | ✅ fait (`aa4d400`) |
| declaration-creance | mesurer le gain A+B | ✅ fait (IKJ4AF : REJETÉ→INSUFFISANT, gate fermé, 3 correctifs A confirmés en aveugle) |
| declaration-creance | **D — chiffrage** : taux légal inventé (C-011), clause pénale sur mauvaise base (C-014), total incohérent (C-023) | ✅ **fermé (CBO94O)** : C-011/C-012/C-023 FAIL→PASS en aveugle. NB : C-014 (base clause pénale) reste FAIL → bascule finding F |
| declaration-creance | **F — régressions + clause pénale** : C-006 (échues vs à échoir, F-2026-0012 mal classée), C-009 (liste pièces trop générique) régressées entre IKJ4AF et CBO94O ; C-014 (base clause pénale) jamais passé | ⏳ **v0.3.0** — non gating (3 MAJEUR, gate ouvert). Investiguer effet de bord du correctif D sur C-006 |
| mise-en-demeure-commerciale | **E1 (gate)** — garde-fou L.622-21 fait en silence, pas affiché | ✅ **fermé (FCQDWM)** : ligne « Procédure collective » obligatoire ajoutée à la note du relecteur + Étape 1 → C-018 PASS en aveugle, ADMIS 0,95 |
| mise-en-demeure-commerciale | **E2** — tension « ne jamais inventer un taux » (finding D) vs grille qui exige le taux vérifié (C-011) | ✅ **tranché (2 couches)** : (1) skill `mise-en-demeure` **et** `declaration-creance` doivent **consulter Légifrance/PISTE** pour le taux (`[à vérifier]` = repli dégradé seulement) ; (2) C-011 mise-en-demeure **assouplie** (PASS si taux+source OU `[à vérifier]` correct en dégradé). **Infra : brancher PISTE en Phase 3 pour un re-score représentatif** |
| mise-en-demeure-commerciale | **E3** — lettre non datée (C-007), intérêts « à parfaire » (C-012) | ✅ **sans objet** : template lettre impose déjà `[Ville], le [date]` (C-007) ; C-012 attend justement « à parfaire jusqu'au complet paiement » (PASS). Finding imprécis, clos |
| tooling | **ground-truth markdown vs JSON** : `tiered_scoring` exige du JSON pur ; Codex sort du markdown+JSON | ⏳ soit doc « sauver le bloc JSON seul », soit rendre le loader robuste (extraire le JSON d'un markdown) |

---

## Budget Codex indicatif pour clore P1

- P1 #1 re-score `declaration-creance` : ~1 session Codex.
- P1 #2 cycle `mise-en-demeure-commerciale` : ~2 sessions.
- P1 #3 cycle `--releve-forclusion` : ~2 sessions.
- P1 #4 cycle `prevention-difficultes` : ~2 sessions.
- P1 #5 cycle `rupture-brutale` : ~2 sessions.
- **Total P1 ≈ 9 sessions Codex** (les Phases 3 Claude sont gratuites).

> **Cadrage budget** : si les crédits sont serrés, scorer d'abord **P1 #1 (re-score, ~1 session)** + **P1 #2 et #4** (les deux nouveaux skills 🔴 les plus exposés). `--releve-forclusion` et `rupture-brutale` peuvent attendre la vague suivante.

Quand P1 est vert (pas de gate CRITIQUE FAIL sur les 3) → **bump DA v0.1.0 → v0.2.0** (avec README + CHANGELOG + `npm test`/`branding:check`).
