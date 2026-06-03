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
| 1 | **declaration-creance** | ✅ `da-declaration-creance/scenario.md` | ✅ `ground-truth.md` (25 criteria, recalibrée B) | scoré 1× **REJETÉ** (ZG7Q5O, *pré-correctifs A/B*) | **RE-SCORE** (P2 déjà faite) : Phase 3 sur skill corrigé + Phase 4 contre grille recalibrée → confirmer passage du gate C-001 et chiffrer le gain |
| 2 | **mise-en-demeure-commerciale** | ✅ `da-mise-en-demeure-commerciale/scenario.md` | ❌ à générer | jamais scoré | **CYCLE COMPLET** (P2 + P3 + P4) |
| 3 | **analyser-rupture-brutale** | ✅ `da-rupture-brutale/scenario.md` | 🟡 `v2a/rupture-brutale-criteria.md` (format-pilote, **non blind**) | jamais scoré blind | **CYCLE** : régénérer une grille **blind** (P2) puis P3 + P4 |

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
# puis Phase 3 (session Claude fraîche) → live-output.md, puis Phase 4 comme ci-dessus.
```

> ⚠️ À surveiller à la lecture de la grille mise-en-demeure : ≥ 1 gate CRITIQUE sur la
> **détection procédure collective** (si débiteur en RJ → STOP, pas de mise en demeure) ;
> base intérêts/forfait taguée `[à vérifier]` (pas de taux inventé).

---

## 🟠 P2 — couverture ami à CONSTRUIRE puis scorer

| Workflow | Type | État | Note |
|---|---|---|---|
| #2 relevé de forclusion L.622-26 | mode sur `declaration-creance` | à construire | gate sur computation du délai d'action |
| #3 prévention difficultés (mandat ad hoc, conciliation, sauvegarde accélérée) | nouveau skill | à construire | borné aux 3 dispositifs (spec §5.3) |

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
| declaration-creance | **mesurer le gain A+B** | ⏳ bloqué sur re-score P1 #1 |

---

## Budget Codex indicatif pour clore P1

- P1 #1 re-score : ~1 session Codex.
- P1 #2 cycle complet : ~2 sessions.
- P1 #3 cycle complet : ~2 sessions.
- **Total P1 ≈ 5 sessions Codex** (les Phases 3 Claude sont gratuites).

Quand P1 est vert (pas de gate CRITIQUE FAIL sur les 3) → **bump DA v0.1.0 → v0.2.0** (avec README + CHANGELOG + `npm test`/`branding:check`).
