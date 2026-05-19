# Tableau contrefacon brevet - routing and output

Reference de travail non normative. En cas d'ecart, seul
`plugins/hacienda-propriete-intellectuelle/skills/tableau-contrefacon-brevet/SKILL.md`
fait foi.

## 1. Intake V2

- `assertion_mode`
- `patent_status`
- `evidence_coverage`
- `claim_scope_status`
- `enforcement_goal`

Bloc de faits minimum :

- `patent_reference`
- `claims_targeted`
- `product_or_process_target`
- `technical_sources_used`
- `fr_market_status`
- `commercial_context`
- `known_missing_evidence`

## 2. Chart Readiness Gate

- `ready`
- `partial`
- `blocked`

Checks minimum :

- revendications exploitables
- preuves techniques suffisantes
- mapping faisable
- base minimale pour l'equivalence si invoquee

## 3. Output blocks

- `Case Snapshot`
- `Patent and Claim Scope`
- `Evidence Coverage`
- `Literal Mapping Table`
- `Equivalence Review`
- `Critical Gaps and Unknowns`
- `Enforcement Use Assessment`
- `Decision Routing`
- `Human Validation`

## 4. Route boundaries

- `mise-en-demeure-pi`
  - offensive ecrite supportable
- `saisie-contrefacon`
  - besoin principal = acquisition probatoire coercitive
- `contentieux-pi`
  - besoin principal = strategie judiciaire globale
- `anteriorite-invalidite`
  - besoin principal = validite / nullite / defense
- `recherche-anteriorite-brevet`
  - besoin principal = prior art amont

## 5. Closed Decision Routing values

- `prepare-cease-and-desist`
- `prepare-seizure-brief`
- `prepare-litigation-brief`
- `fill-evidence-gaps`
- `re-scope-claims`
- `route-to-invalidity-defense`
- `hold-insufficient-basis`
