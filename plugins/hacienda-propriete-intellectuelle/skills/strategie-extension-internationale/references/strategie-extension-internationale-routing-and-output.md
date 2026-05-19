# Strategie extension internationale - routing and output

Reference de travail non normative. En cas d'ecart, seul
`plugins/hacienda-propriete-intellectuelle/skills/strategie-extension-internationale/SKILL.md`
fait foi.

## 1. Intake V2

- `priority_window_status`
  - `open-safe`
  - `open-tight`
  - `expired`
  - `unknown`
- `territory_posture`
  - `fr-only`
  - `eu-focused`
  - `global-flex`
  - `named-countries`
- `market_profile`
  - `local`
  - `regional`
  - `transatlantic`
  - `global`
  - `unclear`
- `budget_posture`
  - `tight`
  - `moderate`
  - `broad`
  - `unknown`
- `maintenance_posture`
  - `systematic`
  - `selective`
  - `defensive`
  - `unknown`
- `filing_baseline_status`
  - `confirmed-fr-base`
  - `partial-fr-base`
  - `unclear-fr-base`

Interpretation rapide de `priority_window_status` :

- `open-safe` : fenetre encore exploitable sans tension immediate ;
- `open-tight` : fenetre encore ouverte mais deja sous tension calendrier ;
- `expired` : priorite depassee ou perdue ;
- `unknown` : date utile pas assez fiable pour arbitrer.

Bloc de faits minimum :

- `fr_initial_reference`
- `fr_initial_filing_date`
- `priority_deadline_date`
- `territories_targeted`
- `market_priority_assumption`
- `budget_12m_estimate`
- `budget_10y_estimate`
- `maintenance_posture`
- `known_launch_or_disclosure_constraints`
- `profile_practice_context`

Obtention minimum :

- preferer `inpi_brevet_details` quand `fr_initial_reference` est exploitable ;
- si la date de depot FR, la date de priorite ou le statut manquent, demander
  le fallback utilisateur, y compris marches cibles, posture budget et
  posture maintenance, puis marquer `[utilisateur fourni]` ;
- si une date critique reste seulement inferee, la marquer `[a verifier]`.
- si le rôle est `non-juriste`, garder la sortie preparatoire et prevoir une
  escalation visible vers mandataire EQE / avocat PI.

## 2. Extension Readiness Gate

- `ready`
- `partial`
- `blocked`

Checks minimum :

- date de depot / priorite connue
- base FR suffisamment claire
- marches cibles exploitables
- budget connu ou assez borne
- route territoriale exploitable
- `priority_window_status = open-tight` doit pousser vers `hold-priority-risk`
- `priority_window_status = expired` doit pousser vers `hold-priority-risk`
- tout element non verifie reste `[a verifier]`
- tout manque de profil pratique reste `[PROVISOIRE]`

## 3. Territorial / sequencing routes

- `stay-fr-only`
- `prepare-ep-route`
- `prepare-pct-route`
- `prepare-sequenced-route`
- `hold-for-market-clarification`
- `hold-for-budget-clarification`
- `hold-priority-risk`

## 4. Output blocks

- chaque livrable reaffiche qu'il s'agit d'une decision territoriale et de
  sequencement, pas d'une demarche officielle
- chaque livrable expose la provenance des faits critiques et les zones
  d'incertitude
- chaque livrable distingue faits, droit, analyse, incertitudes, decisions et
  validation humaine
- chaque livrable integre, dans `Human Validation`, l'escalade mandataire si
  le rôle est `non-juriste` ou si le support EQE n'est pas clairement
  identifié
- `Case Snapshot`
- `Priority Window and Baseline`
- `Target Market Posture`
- `Route Comparison`
- `Cost and Maintenance Pressure`
- `Primary Recommendation`
- `Fallback Paths`
- `Decision Routing`
- `Human Validation`

## 5. Closed Decision Routing values

- `stay-fr-only`
- `prepare-ep-route`
- `prepare-pct-route`
- `prepare-sequenced-route`
- `hold-for-market-clarification`
- `hold-for-budget-clarification`
- `hold-priority-risk`

## 6. Boundary routing

- `recherche-anteriorite-brevet`
  - besoin principal = premier passage prior art.
- `preparation-depot-brevet`
  - besoin principal = brief de depot ou preparation redactionnelle.
- `analyse-refus-inpi`
  - besoin principal = reponse a notification de prosecution.
- `anteriorite-invalidite`
  - besoin principal = validite d'un brevet adverse.
- `tableau-contrefacon-brevet`
  - besoin principal = comparaison revendications / produit.
- `revue-portefeuille-brevets`
  - besoin principal = consolidation, suivi ou pilotage d'un portefeuille
    de brevets.
