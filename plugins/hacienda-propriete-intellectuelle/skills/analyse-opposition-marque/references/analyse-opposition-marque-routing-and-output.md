# Analyse opposition marque - routing and output

Reference de travail non normative. Elle sert d'aide-memo rapide pour le
routage, le gate procedurale et les blocs de sortie. En cas d'ecart, seul
`plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/SKILL.md`
fait foi.

## 1. V2 intake dimensions

- `mode`
- `opposition_basis`
- `procedure_stage`
- `filing_deadline_status`
- `evidence_strength`

Bloc de faits :

- `target_mark`
- `opposing_rights`
- `publication_or_notification_date`
- `goods_services_overlap`
- `argument_scope`
- `settlement_posture`
- `search_and_record_limitations`

## 2. Procedural gate minimum

- delai
- statut du dossier
- fondement principal
- limites du dossier

## 3. Route boundaries

- `recherche-anteriorite-marque`
  - premier passage sur le signe
  - pas encore de publication ou notification exploitable
- `surveillance-marque`
  - besoin principal = suivi des publications
- `depot-marque-fr`
  - besoin principal = preparation ou limitation de depot
- `contentieux-pi`
  - logique judiciaire ou recours hors opposition INPI
- stay in `analyse-opposition-marque`
  - opposition ou defense INPI identifiable
  - travail principal = analyse contradictoire dans le cadre INPI

## 4. Output blocks

- `Procedure Gate and Deadline`
- `Rights and Grounds Snapshot`
- `Arguments and Counter-Arguments Map`
- `Evidence and Record Gaps`
- `Procedural Strategy`
- `Settlement and Coexistence Option`
- `Decision Routing`
- `Human Validation`

## 5. Closed Decision Routing values

- `file-opposition`
- `prepare-defense`
- `seek-coexistence`
- `limit-goods-services`
- `escalate-to-contentieux`
- `insufficient-record`
- `deadline-critical`
