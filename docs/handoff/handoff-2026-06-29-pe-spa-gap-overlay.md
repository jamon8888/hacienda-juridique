# Handoff — overlay `--pe` (side sponsor) sur `spa-review` / `gap-review`

**Date :** 2026-06-29
**Branche :** `feat/da-pe-spa-gap-overlay` (12 commits build/scoring, non mergée — voir §6)
**Version :** hacienda-droit-affaires **0.16.0 → 0.17.0** ; skills spa-review / gap-review **2.0.0 inchangé** (mode, pas skill)
**Skills :** **31 inchangé**
**Statut scoring :** **RÉSERVES gate-clean** sur 3 cycles (`SPAPE1/2/3`) — score 0,91 / 0,91 / 0,87, **0 gate failure** à chaque cycle. **Release décidée sur gate-clean** (cf. §4).

Modes PE suivants de [`handoff-2026-06-26-pacte-pe-overlay.md`](handoff-2026-06-26-pacte-pe-overlay.md) §4, candidats #2 et #3.

---

## 1. Ce qui est livré

Un **mode `--pe`** (lentille Private Equity, **side sponsor**) sur **`spa-review`** et
**`gap-review`** — les deux revues d'acte du deal PE (SPA d'acquisition LBO + GAP sous
l'angle W&I/disclosure). Hors `--pe`, les deux revues standard sont **strictement
inchangées** (zéro régression confirmée). Architecture **isomorphe à l'overlay
`--distressed`** : un flag + un **module frère partagé** + une étape conditionnelle par skill.

Surface livrée (commits `0e444b7..c0af435`) :
- `references/pe-spa-gap-overlay-fr.md` (module frère : axes **S1–S5** SPA + **W1–W3**
  GAP/W&I, side-aware sponsor) qui **référence** `pe-overlay-fr.md` pour le gate
  France/Lux, le glossaire ~100 termes et l'anti-fabrication PE (**lus tels quels, zéro
  édition de la doctrine pacte ADMIS 1,0**).
- `skills/spa-review/SKILL.md` : intake `--pe --side=sponsor|cedant` + **Étape 9ter** +
  section livrable + « Ce skill ne fait pas ».
- `skills/gap-review/SKILL.md` : intake `--pe` + **Étape 6ter** (matrice W&I) + livrable +
  « Ce skill ne fait pas ».
- `pe-overlay-fr.md` (Renvois uniquement, forward-refs `spa-review --pe` / `gap-review --pe`
  passées en live), README, CHANGELOG, version 0.17.0 (lock 3-way).
- `scripts/da-scoring.sh` (entrée `spa-review-pe`, code `SPAPE1`) + dataset
  `tests/datasets/da-spa-review-pe/` (scénario fictif, ground-truth, live-output, verdicts ×3).

## 2. Doctrine du module (side-aware sponsor)

**SPA `--pe` :** S1 mécanisme de prix (locked box vs completion accounts ; date locked box
déterminée + comptes ; définition élargie du leakage) · S2 certain funds & financement
(CP financement, ECL/DCL, BidCo SPV) · S3 MAC & période intercalaire (antitrust/IEF/CSE) ·
S4 rollover & management package (cash-out→reinvest→accession ; **fondateurs rollover =
triple qualité vendeur/garant/investisseur + accession deed** ; requalif fiscale/sociale
**nommée et renvoyée**) · S5 garanties, W&I & funds flow.

**GAP `--pe` :** W1 matrice GAP/W&I/disclosure · W2 recours limité côté cédant sponsor
(GAP nil/1 € adossée W&I ; **fraude/leakage/fundamentals/covenants préservés hors police** ;
sandbagging) · W3 discipline disclosure FR (1112-1 / 1137 C.civ `[à vérifier]`).

**Gate France/Lux** (hérité) : jambe FR couverte, docs fonds Lux hors périmètre.
**Empilement** : `--pe` et `--distressed` s'empilent sans se dupliquer.

## 3. Build (subagent-driven, 3 dispatches Sonnet + revue Opus)

- **A** (module), **B** (wiring spa+gap), **C** (release + scoring scaffolding). Revue par
  dispatch (Sonnet) → findings corrigés (A : `[à compléter]`→`[review]` sample statement,
  accord ; B/C : RAS / 0 finding).
- **Revue whole-branch (Opus) : READY TO MERGE = YES**, 0 Critical, 1 Important corrigé
  (vocab `--side=sponsor≡acquéreur`).
- `npm test` **309 ✓ (3 skip eurlex-live)**, typecheck/build/branding verts, structure
  11/11, count 31, version-lock 0.17.0. Zéro régression standard confirmée.

## 4. Scoring — 3 cycles `SPAPE1/2/3`, décision release sur gate-clean

Grille Codex high **25 critères** (5 CRITIQUE, 1 par piège planté — incl. **C-025 gate Lux**
ajouté au checkpoint, miroir du C-027 PACPE1, pour fermer la zone orpheline).

| Cycle | Score | Gate | MAJEUR | MAJEUR ratés |
|---|---|---|---|---|
| SPAPE1 | 0,911 | **clean** | 0,889 | C-003, C-004 |
| SPAPE2 | 0,911 | **clean** | 0,889 | C-011, C-020 |
| SPAPE3 | 0,867 | **clean** | 0,833 | C-004, C-011, C-017 |

**Lecture.** Les 5 CRITIQUE passent aux 3 cycles → **aucune erreur qui trompe le client**.
Les MAJEUR ratés **changent à chaque run** ; aucun critère ne tombe sur les 3 cycles.
Surtout : **C-004 et C-011 ont été tightenés à la source** (commits 73015fc, c0af435) et ont
**re-raté en SPAPE3** — preuve que le module *contient* la doctrine mais que le **single-pass
live ne restitue pas tous les sous-items conjonctifs** à chaque fois. C'est de la **variance
de couverture sur grille dense**, pas un trou skill. Conformément à
[[feedback-date-fabrication-scoring-variance]] (« SEUIL_ADMIS=1.0 sensible à la variance,
borner les cycles »), les cycles ont été bornés à 3.

**Décision (validée Candy) :** la **barre release de ce mode = gate-clean**. Le mode ne
trompe pas le client (gate stablement propre ×3) ; les MAJEUR variables sont de la
profondeur, pas du danger. Écart assumé au critère #4 de la spec (objectif ADMIS 1,0),
documenté ici. Checkpoint gates effectué avant chaque Phase 3 (gate-piège pas gate-recall —
[[feedback-gate-calibration-scoring]]).

## 5. Acquis méthodo / tooling (commit `0143f22`)

- **Bug verdicts récurrent corrigé** : Codex rendait les verdicts en table markdown (ou
  recopiait la grille sans `verdict`) → `aggregate` KeyError. Deux fix : (1) **prompt Phase 4
  durci** (marqueur `===VERDICTS_JSON===` + JSON brut, interdiction de recopier la grille,
  clés `{id,niveau,verdict}` + auto-vérif) ; (2) **`scripts/extract-verdicts.py`** — récupère
  les verdicts depuis marqueur/JSON/table, niveau autoritatif du ground-truth (testé ==
  reconstruction manuelle). Journal templates + README à jour.

## 6. Reste à faire

- **Merge / PR** : release décidée sur gate-clean → la branche est prête. Décision merge/PR
  = Candy (comme PACPE1, non mergée d'office).
- **Modes PE suivants** (spec §10 / handoff pacte §4) : `closing-checklist-fr --pe-funds-flow`
  (#4), skill neuf `management-package-pe` (#5, garde-fous fiscal/social verrouillés),
  `fonds-pe-fr-triage` (#7). Tous réutilisent le module + glossaire partagés.
- **Intendance** (hors branche) : index GitNexus stale ; trailing-space dans les noms de
  rapport `da-scoring-*` générés par le wrapper (corrigé manuellement ici, à fixer à la
  source dans `codex-blind-scoring.py`).

## 7. Carried Minor (non bloquant)

- Inline `🔴` dans le module (Axe S5) — cohérent avec `distressed-overlay-fr.md` (même
  pattern), jugé acceptable en revue Opus.
- Intake item 1 de spa-review en ligne longue (`--pe` appendé à l'item `--distressed`) —
  mirroir du pattern établi.
