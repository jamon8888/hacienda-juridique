# Anteriorite invalidite - routing and output

Reference de travail non normative. En cas d'ecart, seul
`plugins/hacienda-propriete-intellectuelle/skills/anteriorite-invalidite/SKILL.md`
fait foi.

## 1. Intake V2

- `mode`
- `patent_status`
- `invalidity_basis_status`
- `prior_art_coverage`
- `litigation_pressure`

Faits minimums :

- `patent_reference`
- `claims_targeted`
- `priority_date_status`
- `known_prior_art`
- `consulted_sources_status`
- `business_context`
- `why_attack_or_defend`
- `known_claim_chart_status`
- `known_missing_evidence`

## 2. Invalidity Readiness Gate

- `ready`
- `partial`
- `blocked`

Checks minimum :

- `patent_status` stabilise ou reserve explicite ;
- revendications ciblees identifiees ;
- base de prior art ou autre motif exploitable ;
- dates suffisamment stabilisees ;
- articulation des moyens faisable.

## 3. Output blocks

- `Case Snapshot`
- `Patent and Procedural Posture`
- `Prior Art and Basis Coverage`
- `Novelty Attack Map`
- `Inventive Step Attack Map`
- `Other Invalidity Grounds`
- `Critical Gaps and Litigation Risk`
- `Decision Routing`
- `Human Validation`

## 4. Route boundaries

- `tableau-contrefacon-brevet`
- `contentieux-pi`
- `recherche-anteriorite-brevet`
- `preparation-depot-brevet`

## 5. Closed Decision Routing values

- `prepare-nullity-brief`
- `prepare-defense-invalidity-brief`
- `expand-prior-art-record`
- `refine-claim-targeting`
- `route-to-claim-chart`
- `route-to-contentious-strategy`
- `hold-insufficient-basis`

## 6. Source discipline

- pas de prior art exploitable sans source consultee ;
- pas de citation utile sans date et point d'appui minimaux ;
- les bases non interrogees ou documents non consultes restent visibles comme
  gaps.
