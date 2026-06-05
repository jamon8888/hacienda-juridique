# DA — File de scoring Codex frère M&A (état + priorités)

**But** : prioriser le scoring blind du persona **frère M&A trade** (vague suivante,
hors livrable v0.2.0 déjà sorti). Critère de priorité retenu : **fréquence d'usage
réelle par un avocat M&A trade**, pondérée par l'exposition au risque (jugement avocat,
parties binding du deal).

**Créé** : 2026-06-05 (après release DA v0.2.0, persona ami).

---

## Critère de priorité

Cycle de vie d'un deal trade : NDA → LOI/term sheet → due diligence → SPA → GAP →
closing → post-closing. Tous les skills frère sont sur quasi **chaque** deal ; on
départage par l'**exposition** (parties binding = prix, garanties, indemnisation =
jugement avocat max).

## File frère (M&A trade)

| Rang | Skill | Scénario blind | Grille (P2) | État scoring | Critère dominant |
|---|---|---|---|---|---|
| **F1** | **spa-review** | 🟡 à construire (source non-blind : `v2-spa/spa-review-scenario.md`) | ❌ | jamais scoré blind | contrat central, binding, jugement max |
| **F2** | **gap-review** | ❌ à construire | ❌ | jamais scoré blind | garanties/indemnisation, binding, enjeu max |
| **F3** | **loi-term-sheet** | 🟡 à construire (source : `v1.1/loi-term-sheet-test.md`) | ❌ | jamais scoré blind | **100 % des deals + gate d'ouverture + calibration grille** |
| **F4** | **due-diligence-dataroom** | 🟡 à construire (source : `v1.1/data-room-test/`) | ❌ | jamais scoré blind | plus gros volume horaire, mais extraction/triage |
| **F5** | **pacte-associes-review** | 🟡 à construire (source : `v1.1/pacte-test.md`) | ❌ | jamais scoré blind | trade pur → dépend du type, plus rare |
| **F6** | **closing-checklist-fr** | 🟡 à construire (source : `v1.1/closing-scenario.md`) | ❌ | jamais scoré blind | mécanique/checklist, moins de jugement |

> ⚠️ Les scénarios `v2-spa/` et `v1.1/` sont des **fixtures de cycle non-blind**
> (ils embarquent la vérité terrain + critères de succès). Chaque cycle frère
> nécessite de **reconstruire un `scenario.md` blind** (faits seuls, cycle-agnostique :
> pas de code de cycle, pas de findings) puis P2 (Codex HIGH) + P3 + P4.

## Workflow (identique à l'ami)

Voir [`da-codex-scoring-queue.md`](da-codex-scoring-queue.md) §workflow et
[`scripts/README-codex-blind-scoring.md`](../../scripts/README-codex-blind-scoring.md).
Cycle complet ≈ 2 sessions Codex (P2 HIGH + P4 medium ; P3 Claude gratuite).

## Budget indicatif

6 cycles complets ≈ **12 sessions Codex**. Cadrage probable : scorer F1+F2+F3
(le cœur trade exposé, ~6 sessions) pour un bump frère, F4-F6 vague d'après.
