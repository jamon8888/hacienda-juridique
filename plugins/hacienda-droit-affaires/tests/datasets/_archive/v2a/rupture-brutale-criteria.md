# Criteria atomiques — `analyser-rupture-brutale` (scénario v2a)

> **Pilote format criteria atomiques.** Conversion de la vérité terrain du scénario
> rupture-brutale (faits désormais isolés dans [`scenario.md`](../da-rupture-brutale/scenario.md))
> en critères PASS/FAIL atomiques, à la manière du `task.json` Harvey LAB, mais
> adaptés à la doctrine FR et aux conventions Hacienda (échelle 🔴🟠🟡🟢, tags `[review]`).
>
> **Cible** : revue humaine du format (les criteria capturent-ils la doctrine
> rupture brutale ?), puis scoring via Codex P4 (option 3, sans harness).
> **Skill évalué** : `analyser-rupture-brutale --review --side=victime`
> **Livrable scoré** : `outputs/analyse-rupture-brutale-*.md`

---

## Niveaux de criticité du criterion

Contrairement à l'all-pass strict de Harvey (`score=1.0 ssi tous PASS`), un
scoring juridique a besoin de **gates** : certains FAIL invalident le livrable
quelle que soit la réussite des autres.

| Niveau | Sens | Effet sur le score |
|---|---|---|
| `CRITIQUE` | Erreur doctrinale grave / bug connu du skill | FAIL ⇒ livrable **rejeté** (gate), score plafonné |
| `MAJEUR` | Finding central attendu | compte plein dans le taux de réussite |
| `MINEUR` | Précision ou hygiène de forme | compte, pondéré plus faible |

---

## Axe 0 — Pré-flight et identification

| ID | Niveau | Criterion (PASS si… / FAIL si…) |
|---|---|---|
| C-001 | MAJEUR | PASS si le side est identifié comme **victime** (B, distributeur). FAIL si side auteur ou non déterminé. |
| C-002 | MINEUR | PASS si le livrable note l'**absence de composante PI dominante** → pas de renvoi `PI:contrats-pi`. FAIL si renvoi PI injustifié déclenché. |
| C-003 | MINEUR | PASS si le livrable note l'**absence de procédure collective** → pas de renvoi `declaration-creance`. FAIL si renvoi injustifié. |

## Axe 1 — Qualification « relation commerciale établie »

| ID | Niveau | Criterion |
|---|---|---|
| C-004 | MAJEUR | PASS si la relation est qualifiée **🟢 établie**. FAIL si 🟡 borderline ou ⛔ non établie. |
| C-005 | MAJEUR | PASS si l'**ancienneté de 8 ans** (contrat du 1er mars 2018) est relevée comme caractérisant la relation. FAIL si l'ancienneté n'est pas chiffrée ou erronée. |
| C-006 | MAJEUR | PASS si la qualification s'appuie sur un **faisceau d'indices** citant au moins ancienneté + exclusivité + dépendance. FAIL si conclusion 🟢 affirmée sans faisceau. |
| C-007 | MAJEUR | PASS si la **dépendance économique ≈ 70 % du CA de B** est identifiée et qualifiée d'élevée. FAIL si non mentionnée. |
| C-008 | MINEUR | PASS si la **double exclusivité** (territoriale ET d'approvisionnement) est relevée. FAIL si une seule ou aucune. |
| C-009 | MINEUR | PASS si l'**intuitu personae** est étayé par les investissements dédiés (plateforme logistique + 3 commerciaux dédiés). FAIL si l'investissement spécifique n'est pas relié à l'intuitu personae. |
| C-010 | **CRITIQUE** | PASS si le fondement est cité strictement **« L.442-1, II C.com. »**. FAIL si cité « L.442-1 » sans préciser le II, ou confondu avec le I (déséquilibre significatif). |
| C-011 | MINEUR | PASS si l'**ex-numérotation L.442-6, I, 5°** est mentionnée pour traçabilité (ord. 2019-359 du 24 avril 2019). FAIL si absente. |

## Axe 2 — Préavis raisonnable

| ID | Niveau | Criterion |
|---|---|---|
| C-012 | MAJEUR | PASS si le **plancher règle de pouce = 8 mois** (1 mois × 8 ans) est calculé. FAIL si plancher absent ou faux. |
| C-013 | MAJEUR | PASS si le préavis raisonnable est exprimé en **fourchette 10-12 mois** (majoration du plancher pour dépendance + investissement spécifique). FAIL si hors plage ≈ 9-14 mois. |
| C-014 | **CRITIQUE** | PASS si le préavis est exprimé en **fourchette** (min-max). FAIL si un **chiffre figé unique** (ex. « 11 mois ») est donné sans fourchette — dégradation explicitement proscrite par le scénario. |
| C-015 | MAJEUR | PASS si le **préavis effectif = 3 mois** (15 fév 2026 → 15 mai 2026) est identifié. FAIL sinon. |
| C-016 | MAJEUR | PASS si le statut est **🔴 manifestement insuffisant** (3 mois < bas de fourchette). FAIL si 🟠 ou 🟢. |
| C-017 | MAJEUR | PASS si le **safe harbor 18 mois est déclaré NON invocable par A** (préavis effectif < 18 mois). FAIL si non mentionné. |
| C-018 | **CRITIQUE** | PASS si le safe harbor n'est **jamais présenté comme un plafond** du préavis dû. FAIL — bug critique — si une formulation du type « le préavis dû ne peut excéder 18 mois » / « la victime ne peut réclamer plus de 18 mois » apparaît. |
| C-019 | MINEUR | PASS si la fourchette de préavis porte le tag **`[review]`**. FAIL si présentée comme certitude. |

## Axe 3 — Préjudice indemnisable

| ID | Niveau | Criterion |
|---|---|---|
| C-020 | **CRITIQUE** | PASS si la base de calcul est la **marge brute**. FAIL — erreur doctrinale grave — si le préjudice est calculé sur le **chiffre d'affaires**. |
| C-021 | MAJEUR | PASS si la **marge brute mensuelle ≈ 50 000 €** (2 000 000 × 30 % ÷ 12) est utilisée. FAIL si montant matériellement différent. |
| C-022 | MAJEUR | PASS si le **préjudice principal ≈ 350 000-450 000 €** (7-9 mois manquants × 50 k€). FAIL si hors ordre de grandeur. |
| C-023 | MINEUR | PASS si le préjudice est exprimé en **fourchette `[review]`**. FAIL si chiffre figé présenté comme certain. |
| C-024 | MINEUR | PASS si les **postes accessoires sont documentés sans chiffrage figé** (VNC plateforme ≈ 220 k€, stock résiduel ≈ 180 k€). FAIL si chiffrés comme certains ou omis. |
| C-025 | MINEUR | PASS si le livrable note que la **marge brute manquante est le poste dominant et le plus solide** juridiquement. FAIL si absent. |

## Axe 4 — Dispense de préavis

| ID | Niveau | Criterion |
|---|---|---|
| C-026 | MAJEUR | PASS si la conclusion est **aucune dispense défensible** (aucune inexécution alléguée, aucune force majeure invoquée). FAIL si une dispense est présentée comme soutenable. |
| C-027 | MAJEUR | PASS si le motif « **réorganisation stratégique du réseau** » est qualifié de **décision unilatérale, PAS une dispense légale**. FAIL si traité comme exonératoire. |

## Axe 5 — Liste de points et recommandation

| ID | Niveau | Criterion |
|---|---|---|
| C-028 | MAJEUR | PASS si la recommandation finale est **Engager**. FAIL si Négocier ou Renoncer. |
| C-029 | MINEUR | PASS si la liste de points est **triée par criticité décroissante** avec le point préavis en **🔴** en tête. FAIL si tri absent ou préavis sous-coté (plancher de sévérité). |
| C-030 | MINEUR | PASS si l'**arbre 5 options** est présent, option 1 **Rédiger** (mise en demeure chiffrée) comme défaut côté victime. FAIL si arbre absent ou défaut incohérent. |

## Axe transverse — hygiène de sortie

| ID | Niveau | Criterion |
|---|---|---|
| C-031 | MINEUR | PASS si la **note du relecteur** (5 champs en gras) est présente en tête. FAIL si absente. |
| C-032 | MINEUR | PASS si l'**en-tête de confidentialité** adapté au rôle est présent. FAIL si absent. |
| C-033 | MINEUR | PASS si toute citation d'article est **vérifiée ou taguée `[à vérifier]`** (pas de citation présentée comme certaine sans vérification). FAIL sinon. |

---

## Synthèse

- **33 criteria** : 5 CRITIQUES (gates), 16 MAJEURS, 12 MINEURS.
- **Gates doctrinaux** (C-010, C-014, C-018, C-020) — les 4 bugs que le scénario
  désigne explicitement comme rédhibitoires : confusion I/II, chiffre figé,
  safe harbor-plafond, préjudice sur CA. Un seul FAIL ⇒ livrable rejeté.

## Format machine (prototype harness)

Extrait du format que consommera le futur harness TS. Le judge reçoit, par
criterion : le livrable scopé, le `match_criteria`, et le `niveau` (jamais le SKILL.md).

```json
{
  "skill": "analyser-rupture-brutale",
  "scenario": "da-rupture-brutale/scenario.md",
  "scoring": "tiered-gated",
  "criteria": [
    {
      "id": "C-018",
      "niveau": "CRITIQUE",
      "axe": "preavis",
      "match_criteria": "PASS si le safe harbor 18 mois n'est jamais présenté comme un plafond du préavis dû. FAIL si une formulation du type 'le préavis dû ne peut excéder 18 mois' apparaît."
    },
    {
      "id": "C-020",
      "niveau": "CRITIQUE",
      "axe": "prejudice",
      "match_criteria": "PASS si le préjudice est calculé sur la marge brute. FAIL s'il est calculé sur le chiffre d'affaires."
    }
  ]
}
```
