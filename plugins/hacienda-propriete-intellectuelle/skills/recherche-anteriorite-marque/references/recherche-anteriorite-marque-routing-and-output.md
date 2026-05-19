# Recherche anteriorite marque - routing and output

Reference de travail non normative. Elle sert d'aide-memo rapide pour le
routage, la couverture et les blocs de sortie. En cas d'ecart, seul
`plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-marque/SKILL.md`
fait foi.

## 1. V2 intake dimensions

- `mark_type`
- `filing_intent`
- `territory_scope`
- `goods_services_scope`
- `adjacent_families_status`

Bloc de faits :

- `proposed_sign`
- `claimed_goods_services`
- `nice_classes`
- `market_appearance`
- `known_related_names`
- `search_limitations`

## 2. Search coverage minimum

- motifs absolus
- marques proches
- familles adjacentes
- limitations explicites

## 3. Route boundaries

- `depot-marque-fr`
  - pas de blocage majeur evident
  - couverture minimale exploitable
  - validation humaine avant depot
- `surveillance-marque`
  - besoin principal = suivi / monitorage
  - pas d'escalade immediate plus utile
- `analyse-opposition-marque`
  - conflit proche emerge
  - analyse contradictoire plus fine requise
- `clearance-marque`
  - compatibilite historique seulement
- stay in `recherche-anteriorite-marque`
  - premier passage strict
  - motifs absolus + couverture + conflits proches

## 4. Output blocks

- `Absolute Grounds Snapshot`
- `Search Coverage`
- `Closest Conflicts`
- `Adjacent Family Sweep`
- `Confusion Risk Signals`
- `Uncertainty and Missing Coverage`
- `Next Step Routing`
- `Human Validation`

## 5. Next Step Routing values

- `proceed-to-professional-clearance`
- `prepare-filing`
- `monitor-before-filing`
- `prepare-opposition-risk-review`
- `insufficient-search-coverage`
- `abandon-or-rename`
