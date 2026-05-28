# Saisie Contrefacon V2 - Routing And Output

## Role

`saisie-contrefacon` est un skill multi-droits de preparation stricte de
mesure probatoire :

- requete ;
- perimetre de saisie ;
- execution ;
- secret des affaires ;
- delai post-saisie ;
- routage immediat.

## Closed Intake

- `rights_track`: `patent` / `trademark` / `design` / `copyright` /
  `software` / `mixed`
- `title_status`: `valid` / `uncertain` / `blocked`
- `proof_posture`: `strong` / `mixed` / `weak` / `none`
- `target_location_status`: `identified` / `partial` / `unknown`
- `seizure_scope`: `descriptive` / `real` / `documents` / `internet` /
  `mixed` / `unclear`
- `execution_urgency`: `routine` / `heightened` / `critical` / `unclear`
- `trade_secret_risk`: `low` / `medium` / `high` / `unclear`
- `post_seizure_readiness`: `ready` / `partial` / `blocked`

## Minimal Fact Set

- titre(s) invoque(s), titulaire et statut d'exploitabilite ;
- cible visee, lieu(x) ou environnement(s) de saisie envisage(s) ;
- commencement de preuve deja disponible ;
- type de saisie recherche (`descriptive`, `real`, `documents`,
  `internet`, `mixed`) ;
- urgence d'execution et risque de depérdition de preuve ;
- contraintes identifiees de secret des affaires ;
- capacite reelle a assigner dans le delai post-saisie.

## Seizure Readiness Gate

### `ready`

- titre exploitable ;
- commencement de preuve suffisant ;
- cible localisable ;
- perimetre formulable ;
- delai post-saisie tenable.

### `partial`

- mesure envisageable ;
- mais certains points doivent rester `[à vérifier]`.

### `blocked`

- titre trop incertain ;
- preuve trop faible ;
- cible non localisable ;
- mesure disproportionnee ou mal fondee.

Consequence :

- ne pas simuler de requete ni de pack d'execution ;
- sortir en `hold-insufficient-basis` ;
- lister les manques a combler avant toute nouvelle tentative.

## Output Contract

1. `Case Snapshot`
2. `Seizure Readiness Gate`
3. `Rights Track And Legal Basis`
4. `Proposed Seizure Scope`
5. `Evidence And Proportionality`
6. `Trade Secret And Execution Constraints`
7. `Drafting And Execution Pack`
8. `Decision Routing`
9. `Human Validation`

## Closed Routing

- `prepare-filing-pack` : pack de requete a finaliser et deposer par le
  conseil ;
- `prepare-execution-pack` : instructions operationnelles et garde-fous pour
  l'execution avec commissaire de justice ;
- `prepare-post-seizure-assignment` : bascule vers `contentieux-pi` pour
  l'assignation dans le delai post-saisie ;
- `prepare-evidence-hardening` : renforcer preuve, perimetre ou
  proportionalite avant de retenter la mesure ;
- `route-to-substantive-infringement-review` : bascule vers
  `tableau-contrefacon-brevet`, `contrefacon-droit-auteur` ou
  `contrefacon-dessin-modele` selon le `rights_track` ;
- `hold-insufficient-basis` : blocage explicite, sans pseudo-requete.

## Boundaries

- `tri-contrefacon`: intake enforcement initial
- `mise-en-demeure-pi`: lettre
- `contentieux-pi`: strategie judiciaire globale
- `tableau-contrefacon-brevet`: claim chart brevet
- `contrefacon-droit-auteur`: fond auteur
- `contrefacon-dessin-modele`: fond D&M
