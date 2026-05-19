# Depot marque FR - routing and output

Reference de travail non normative. Elle sert d'aide-memo rapide pour
l'intake V2, le filing readiness gate, les lanes FR / EU / Madrid et les
blocs de sortie. En cas d'ecart, seul
`plugins/hacienda-propriete-intellectuelle/skills/depot-marque-fr/SKILL.md`
fait foi.

## 1. V2 intake dimensions

- `filing_lane`
- `search_status`
- `readiness_status`
- `mark_format`
- `priority_status`

Bloc de faits :

- `proposed_sign`
- `goods_services_scope`
- `nice_classes`
- `target_territories`
- `applicant_identity`
- `mandate_status`
- `priority_or_base_mark`
- `search_report_reference`

## 2. Filing readiness gate minimum

- recherche amont exploitable
- motifs absolus non ignores
- produits/services assez concrets
- deposant identifiable
- prerequis de lane satisfaits
- bloqueurs et lacunes visibles

Gate values :

- `ready`
- `needs-clarification`
- `blocked`

## 3. Lane selection

- `fr-national`
  - cible surtout francaise
  - besoin de paquet FR
- `eu-eutm`
  - couverture UE large
  - coherence EUTM a confirmer
- `madrid-international`
  - pays designes identifies
  - base FR/EU requise
- `undecided`
  - lane encore non tranchee

## 4. Route boundaries

- `recherche-anteriorite-marque`
  - recherche absente, partielle ou insuffisante
  - doute de disponibilite encore central
- `surveillance-marque`
  - besoin principal = suivi post-depot / watch
- `analyse-opposition-marque`
  - opposition ou conflit contradictoire concret
- `clearance-marque`
  - compatibilite historique seulement
- stay in `depot-marque-fr`
  - dossier deja dans une logique preparation de depot

## 5. Output blocks

- `Filing Intake Snapshot`
- `Filing Readiness Gate`
- `Absolute Grounds Reminder`
- `Search Baseline and Dependencies`
- `Lane Selection`
- `Goods and Services Draft`
- `Applicant Priority and Formalities`
- `Next Step Routing`
- `Human Validation`

## 6. Closed Next Step Routing values

- `prepare-fr-filing-pack`
- `prepare-eu-filing-pack`
- `prepare-madrid-filing-pack`
- `prepare-base-before-madrid`
- `return-to-first-pass-search`
- `seek-professional-clearance`
- `set-up-post-filing-monitoring`
- `prepare-opposition-position`
- `hold-or-rename`
