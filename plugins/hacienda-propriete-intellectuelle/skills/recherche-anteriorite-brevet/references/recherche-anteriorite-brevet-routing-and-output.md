# Recherche anteriorite brevet - routing and output

Reference de travail non normative. Elle sert d'aide-memo rapide pour
l'intake V2, le gate de couverture, les routes aval et les blocs de sortie.
En cas d'ecart, seul
`plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-brevet/SKILL.md`
fait foi.

## 1. V2 intake dimensions

- `invention_type`
- `search_intent`
- `territory_scope`
- `classification_status`
- `search_coverage_gate`

Bloc de faits :

- `proposed_invention`
- `technical_problem`
- `technical_solution`
- `known_classifications`
- `priority_reference_date`
- `known_prior_art`
- `search_limitations`

## 2. Search coverage gate minimum

- bases brevets interrogees
- classifications visibles
- mots-cles ou axes visibles
- NPL couverte ou absente
- limites explicites

Gate values :

- `sufficient-first-pass`
- `partial`
- `degraded`
- `none`

## 3. Route boundaries

- `preparation-depot-brevet`
  - pas de blocage majeur evident
  - premier passage exploitable avant depot
- `anteriorite-invalidite`
  - besoin principal = nullite / contestation de brevet tiers
- `tableau-contrefacon-brevet`
  - besoin principal = analyse revendications vs produit/procede
- `logiciels-pi`
  - coeur du sujet = regime logiciel / licences / titularite
- stay in `recherche-anteriorite-brevet`
  - besoin principal = premier passage d'anteriorite

## 4. Output blocks

- `Eligibility Snapshot`
- `Search Coverage Gate`
- `Classification and Search Scope`
- `Closest Prior Art`
- `NPL and Adjacent Coverage`
- `Novelty Signals`
- `Inventive Step Signals`
- `Next Step Routing`
- `Human Validation`

## 5. Closed Next Step Routing values

- `prepare-drafting-brief`
- `expand-search-coverage`
- `seek-patentability-review`
- `pivot-to-invalidity-analysis`
- `pivot-to-infringement-chart`
- `route-to-software-regime-review`
- `hold-or-do-not-file`
