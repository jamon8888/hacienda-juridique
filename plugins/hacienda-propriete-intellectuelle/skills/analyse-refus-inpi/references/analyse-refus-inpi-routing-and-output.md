# Analyse refus INPI V2 - routing and output

Reference de travail non normative. En cas d'ecart, seul
`plugins/hacienda-propriete-intellectuelle/skills/analyse-refus-inpi/SKILL.md`
fait foi.

## 1. Intake V2

Champs fermes a expliciter ou deriver :

- `office`: `inpi`, `oeb`
- `notification_type`:
  - `search-report`
  - `substantive-refusal`
  - `rule-132`
  - `other-office-action`
- `deadline_status`:
  - `comfortable`
  - `tight`
  - `critical`
  - `expired-or-unknown`
- `citation_profile`:
  - `x-heavy`
  - `y-heavy`
  - `mixed`
  - `light`
  - `unclear`
- `claim_amendment_posture`:
  - `amendment-open`
  - `amendment-limited`
  - `argument-only`
  - `unclear`
- `response_goal`:
  - `amend`
  - `argue`
  - `amend-and-argue`
  - `divide`
  - `request-extension`
  - `abandon`

Bloc minimum :

- `application_reference`
- `office_document_reference`
- `consulted_notification_status`
- `claims_objected`
- `known_citations`
- `current_claim_set_status`
- `priority_or_added_matter_risk_status`
- `language_and_filing_context`
- `known_missing_material`

## 2. Response Readiness Gate

Valeurs possibles :

- `ready`
- `partial`
- `blocked`

Checks durs :

- `expired-or-unknown` exclut `ready` ;
- notification non consultee => `partial` ou `blocked` ;
- revendications objectees instables => `partial` ou `blocked` ;
- citations non rattachees a une source ou une objection => gap explicite.

## 3. Output blocks

La sortie V2 garde 9 blocs :

1. `Case Snapshot`
2. `Office and Deadline Posture`
3. `Citation and Objection Map`
4. `Amendment Feasibility`
5. `Argument Strategy`
6. `Priority Risks and Procedural Constraints`
7. `Critical Gaps`
8. `Decision Routing`
9. `Human Validation`

## 4. Closed Decision Routing values

Une seule route finale :

- `amend`
- `argue`
- `amend-and-argue`
- `divide`
- `request-extension`
- `abandon`
- `insufficient-basis`

## 5. Boundary routing

Rerouter si le besoin principal devient :

- `recherche-anteriorite-brevet` : recherche amont / premier passage prior art ;
- `preparation-depot-brevet` : depot ou nouveau jeu de revendications avant
  notification ;
- `strategie-extension-internationale` : arbitrage territorial ou portefeuille ;
- `anteriorite-invalidite` : validite d'un brevet adverse.

## 6. Mandatory close

Toujours rappeler :

> **Analyse argumentaire, pas reponse officielle.**

Et toujours finir par :

- une justification de la route retenue ;
- 2 a 4 actions concretes ;
- une validation humaine mandataire ou avocat ;
- les points encore `[a verifier]`.
