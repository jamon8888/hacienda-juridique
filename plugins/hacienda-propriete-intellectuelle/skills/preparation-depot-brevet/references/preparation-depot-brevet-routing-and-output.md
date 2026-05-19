# Preparation depot brevet - routing and output

Reference de travail non normative. En cas d'ecart, seul
`plugins/hacienda-propriete-intellectuelle/skills/preparation-depot-brevet/SKILL.md`
fait foi.

## 1. Intake V2

- `invention_type`
- `filing_lane`
- `priority_strategy_status`
- `readiness_status`
- `inventorship_status`
- `disclosure_status`

Bloc de faits minimum :

- `proposed_invention`
- `technical_problem`
- `technical_solution`
- `known_prior_art_status`
- `inventors`
- `applicant`
- `territories_targeted`
- `public_disclosure_timeline`
- `known_examples_and_variants`
- `known_drawings_status`
- `known_data_or_test_support`

## 2. Filing Readiness Gate

- `ready`
- `partial`
- `blocked`

Checks minimum :

- matiere technique exploitable
- prior art connu assez cadre
- inventorship / applicant visibles
- disclosure risk visible
- support technique minimal

## 3. Filing lanes

- `FR`
- `EP`
- `PCT`
- `sequenced`

## 4. Route boundaries

- `recherche-anteriorite-brevet`
  - recherche amont insuffisante
- `strategie-extension-internationale`
  - besoin principal = strategie d'extension
- `anteriorite-invalidite`
  - besoin principal = attaque d'un brevet tiers
- `tableau-contrefacon-brevet`
  - besoin principal = comparaison revendications / produit
- `logiciels-pi`
  - besoin principal = regime logiciel

## 5. Output blocks

- `Case Snapshot`
- `Inventorship and Ownership Check`
- `Disclosure Risk Check`
- `Drafting Brief`
- `Claim Architecture Candidate`
- `Description Coverage`
- `Figures and Examples Checklist`
- `Priority and Filing Path`
- `Human Validation`

## 6. Closed Next Step Routing values

- `prepare-drafting-brief`
- `fill-readiness-gaps`
- `expand-prior-art-review`
- `hold-due-to-disclosure-risk`
- `route-to-extension-strategy`
- `route-to-invalidity-analysis`
- `route-to-infringement-chart`
- `route-to-software-regime-review`
