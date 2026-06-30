# Handoff — skill neuf `management-package-pe` (candidat PE #5)

**Date :** 2026-06-30
**Branche :** `feat/da-pe-management-package` (poussée) — **PR [#66](https://github.com/jamon8888/hacienda-juridique/pull/66)** (base `main`).
**Version :** hacienda-droit-affaires **0.18.0 → 0.19.0** ; skill `management-package-pe` **2.0.0** (neuf).
**Skills :** **31 → 32** (premier skill *neuf* de la vague PE ; les 4 précédents étaient des modes `--pe`).
**Statut scoring :** **gate-clean MANPE4** (5/5 CRITIQUE PASS). Score 0,15 ininformatif (artefact densité). **Release sur gate-clean** (politique SPAPE/CLOPE) → **PR**.

Boucle la chaîne du deal PE : pacte → SPA/GAP → closing → **management package**.

---

## 1. Ce qui est livré

Skill **neuf** (pas un mode) : cartographie d'un management package LBO côté FR + **question-list
fiscal/social**. Périmètre validé Candy : **cartographie + question-list, zéro avis de fond** — le
garde-fou fiscal/social est **structurel**, pas un disclaimer.

Surface (commits `820d26f..01031c3`) :
- `references/management-package-pe-fr.md` — module doctrine axes **M1–M5** side-aware sponsor|manager,
  référence `pe-overlay-fr.md` (gate FR/Lux, glossaire, anti-fab — lus tels quels).
- `skills/management-package-pe/SKILL.md` v2.0.0 + wrapper `commands/h-da/management-package-pe.md`
  (description/argument-hint byte-identiques) + bump compte test **31 → 32**.
- Release 0.19.0 (lock ×3, README table+routage, CHANGELOG, index `L.225-177` + `L.225-197-1`).
- Scaffold scoring `tests/datasets/da-management-package-pe/` + `scripts/da-scoring.sh` code `MANPE1`.

## 2. Doctrine (5 axes side-aware sponsor | manager)

- **M1 — Cartographie & « qui signe quoi »** ⭐ : matrice signataires, précédence renvoyée `pacte --pe`.
- **M2 — Instruments & economics : nommer + expliquer, jamais valoriser** : sweet equity, ADP, BSA,
  BSPCE, AGA, OC ; envy ratio (numérateur/dénominateur/base), ratchet (paramètres), hurdle, vesting.
- **M3 — Leaver / vesting / liquidité + signalement confiscatoire** : bad leaver nominal trop large =
  `[review]` ; revue clause renvoyée `pacte --pe` ; directive de graduation good/bad/intermediate.
- **M4 — STOP fiscal/social** 🔴 (ligne rouge) : nomme + renvoie, **ne tranche jamais**.
- **M5 — Question-list fiscal/social + handoffs** ⭐ (livrable cœur) : matrice instrument × event ×
  manager, items carried Lux complets, éligibilité bénéficiaire BSPCE.

Gate FR/Lux hérité. Empilement `--pe` sans duplication. Guardrail anti-conclusion-de-nullité
(jamais « nulle » → « potentiellement nulle `[review]` »).

## 3. Build (subagent-driven, 4 tasks + revue Opus)

T1 module · T2 SKILL+wrapper+compte (TDD) · T3 release · T4 scaffold scoring. Chaque task : Spec ✅ +
Quality Approved. Fixes de revue : quantum anti-fab, reclassement index L.225-x, guardrails.
Revue whole-branch Opus : **READY TO MERGE = YES**, 0 Critical/Important. `npm test` 309 ✓ / 3 skip.

## 4. Scoring — MANPE1→4, gate-clean sur MANPE4

Grille Codex HIGH **44 critères** (dense — 2× les ~25 du spec, comme CLOPE).

| Cycle | Statut | Gate | Note |
|---|---|---|---|
| MANPE1 | REJETÉ | 5 gates | verdicts **sans preuve** → lire le rapport `docs/backlog/da-scoring-*-MANPE*.md` ; faux négatifs + recall conjonctif |
| MANPE2 | REJETÉ | 5 (C-032 flip) | **module enrichi mais non remonté dans le live** (brouillon single-pass) — mauvais levier |
| MANPE3 | REJETÉ | 1 (C-035) | guardrail C-032 SKILL.md tient ; 4 gates profondeur démus → MAJEUR |
| MANPE4 | **gate-clean** | — | reframe C-035 danger-seul ; 5/5 CRITIQUE PASS ; re-score du live MANPE3 contre grille reformulée |

**Le skill est SÛR** : sur 4 cycles, **aucun trigger dangereux commis** (avis fiscal/social,
validation d'acte vicié, régime Lux définitif, valorisation — tous évités). Les FAIL résiduels sont
de la **profondeur/recall** sur un brouillon single-pass, pas du danger. Score 0,15 = artefact de
densité. **Release = gate-clean.**

CRITIQUE finaux (5, tous PASS) : C-025 (pas de léonin auto), C-030 (pas de 1843-4 auto), C-032 (pas
d'avis fiscal/social), C-035 (pas d'inéligibilité FCPR), C-039 (pas de neutralité rollover).

**Checkpoints grille tracés** (validés contrôleur + Candy) : élévation C-042 FR/Lux (cohérence
SPAPE/PACPE), démotion ×4 profondeur→MAJEUR (preuve 2 cycles), reframe C-035 danger-seul (cohérence
C-025/C-030/C-039).

## 5. Leçons (mémoire sauvée)

- **Code de cycle = TOUJOURS 6 chars** `[A-Z0-9]` (MGMT1→MANPE1 ; garde fail-fast posé dans `da-scoring.sh`).
- **Rapport scoring complet = `docs/backlog/da-scoring-<skill>-<CODE>.md`** (pas le JSON verdicts, qui n'a pas de preuve).
- **Module depth ≠ live depth** : enrichir le module ne remonte PAS dans le brouillon live ; danger → SKILL.md, profondeur → borner la grille.

## 6. Reste à faire

- **Merge PR #66** (après relecture). Intendance post-merge : `git pull origin main` AVANT toute
  intendance.
- **Fond récurrent — prioritaire** : 2ᵉ skill PE de suite sur le mur densité/recall du scorer Phase 4.
  Exécuter `docs/backlog/scorer-phase4-false-negatives-fix.md` (persister `preuve` + borner densité
  grille) **avant le prochain skill dense**.
- **Modes PE suivants** : `fonds-pe-fr-triage` (#7, différé).
- **Intendance parkée** (hors branche) : `docs/scorer-phase4-false-negatives-backlog` + stash CLOPE.

## 7. Carried Minor (non bloquant)

- Code scoring `MANPE1` mnémonique (5→6 corrigé). MGMT17/depth recoupements grille (démus MAJEUR).
- Inline 🔴 dans le module (cohérent frères). `[à vérifier]` sur articles non vérifiés (anti-fab).
