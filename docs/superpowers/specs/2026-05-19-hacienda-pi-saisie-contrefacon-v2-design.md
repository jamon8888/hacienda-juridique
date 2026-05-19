# Saisie Contrefacon V2 Design

## Summary

Objectif : faire evoluer `saisie-contrefacon` vers un skill V2 de
**preparation stricte de mesure probatoire** centre sur :

- la requete de saisie-contrefacon ;
- le perimetre de saisie ;
- le type de saisie ;
- les instructions commissaire de justice ;
- le secret des affaires ;
- le delai d'assignation ;
- le routage post-saisie.

Le skill reste **multi-droits**, mais il ne doit plus deriver en
orchestrateur contentieux general.

## Problem Statement

Le skill actuel est riche en substance et deja transversal :

- brevets ;
- marques ;
- dessins et modeles ;
- droit d'auteur ;
- logiciel.

Le probleme n'est pas l'absence de matiere. Le probleme est l'absence d'un
contrat V2 ferme qui distingue clairement :

- la **mesure probatoire** ;
- l'**analyse au fond** de la contrefacon ;
- la **strategie contentieuse** ;
- la **lettre / escalation precontentieuse**.

La V2 doit garder la transversalite multi-droits, tout en recentrant le skill
sur la preparation de la mesure, sans le laisser absorber l'ensemble de la
lane enforcement / contentieux.

## Goals

- Recentrer `saisie-contrefacon` comme skill de **mesure probatoire stricte**.
- Garder une structure **multi-droits** dans un seul skill.
- Introduire un `rights_track` ferme.
- Introduire un `Seizure Readiness Gate`.
- Stabiliser la sortie V2 en blocs fermes.
- Clarifier les frontieres avec :
  - `tri-contrefacon`
  - `mise-en-demeure-pi`
  - `contentieux-pi`
  - `tableau-contrefacon-brevet`
  - `contrefacon-droit-auteur`
  - `contrefacon-dessin-modele`

## Non-Goals

- Le skill ne depose pas la requete reelle.
- Le skill ne remplace ni l'avocat ni le commissaire de justice.
- Le skill ne tranche pas seul l'opportunite contentieuse globale.
- Le skill ne fait pas une analyse au fond complete de la contrefacon.
- Le skill ne devient pas un orchestrateur defense / nullite / transaction.

## Recommended Approach

Conserver un seul skill public, mais imposer un vrai contrat V2 :

1. **Track droit ferme**
   - `patent`
   - `trademark`
   - `design`
   - `copyright`
   - `software`
   - `mixed`

2. **Role unique**
   - preparation de la mesure probatoire
   - et rien de plus

3. **Sortie fermee**
   - requete
   - perimetre
   - type de saisie
   - secret des affaires
   - instructions execution
   - delai
   - routage post-saisie

## Alternatives Considered

### 1. Multi-droits dans un skill V2 ferme

Option recommandee.

Avantages :
- garde la coherence procedurale ;
- evite la duplication par droit ;
- reste alignable avec les autres skills V2.

Inconvenient :
- exige un branchage plus explicite par `rights_track`.

### 2. Decouper en plusieurs skills par droit

Avantage :
- granularite forte.

Inconvenients :
- duplication importante ;
- perte de coherence procedurale ;
- inflation de surface plugin sans gain immediat.

### 3. En faire un orchestrateur enforcement

Inconvenients :
- overlap direct avec `tri-contrefacon`, `mise-en-demeure-pi`,
  `contentieux-pi` ;
- retour a un skill flou.

## User-Facing Contract

### Positioning

`saisie-contrefacon` V2 est un skill de **preparation stricte de mesure
probatoire**.

Il sert a :
- qualifier le track droit applicable ;
- verifier si une saisie est proceduralement exploitable ;
- structurer le projet de requete ;
- cadrer le perimetre de saisie ;
- preparer les instructions d'execution ;
- borner les suites immediates apres execution.

Il ne sert pas a :
- deposer la requete ;
- piloter seul le contentieux global ;
- faire une defense de nullite ;
- se substituer a l'analyse de fond du droit viole.

### Rights Track

Le skill doit expliciter ou deriver :

- `rights_track`
  - `patent`
  - `trademark`
  - `design`
  - `copyright`
  - `software`
  - `mixed`

### Intake Contract

Le skill doit expliciter ou deriver :

- `rights_track`
- `title_status`
  - `valid`
  - `uncertain`
  - `blocked`
- `proof_posture`
  - `strong`
  - `mixed`
  - `weak`
  - `none`
- `target_location_status`
  - `identified`
  - `partial`
  - `unknown`
- `seizure_scope`
  - `descriptive`
  - `real`
  - `documents`
  - `internet`
  - `mixed`
  - `unclear`
- `execution_urgency`
  - `routine`
  - `heightened`
  - `critical`
  - `unclear`
- `trade_secret_risk`
  - `low`
  - `medium`
  - `high`
  - `unclear`
- `post_seizure_readiness`
  - `ready`
  - `partial`
  - `blocked`

### Minimal Fact Set

- `right_invoked`
- `title_reference`
- `title_validity_status`
- `suspected_infringer`
- `target_locations`
- `suspected_acts`
- `available_pre_evidence`
- `requested_seizure_type`
- `expert_need`
- `urgency_context`
- `expected_court`

## Seizure Readiness Gate

Le skill doit introduire un `Seizure Readiness Gate`.

Statuts :
- `ready`
- `partial`
- `blocked`

### Ready

Utiliser `ready` si :
- le titre ou fondement est exploitable ;
- un commencement de preuve existe ;
- les lieux ou cibles de saisie sont identifiables ;
- le perimetre de mesure peut etre formule proprement ;
- le calendrier post-saisie est tenable.

### Partial

Utiliser `partial` si :
- la saisie reste envisageable ;
- mais certains points critiques doivent etre confirms ou tags
  `[a verifier]`.

### Blocked

Utiliser `blocked` si :
- le titre est trop incertain ;
- le commencement de preuve est trop faible ;
- les lieux ou objets ne sont pas localisables ;
- la mesure serait disproportionnee ou proceduralement mal fondee.

En `blocked`, produire un constat de blocage et une suite de preparation, pas
une pseudo-requete.

## Output Contract

La sortie V2 doit etre stabilisee en 9 blocs.

### 1. Case Snapshot

- droit invoque ;
- titre ;
- cible ;
- actes suspectes ;
- urgence.

### 2. Seizure Readiness Gate

- `ready` / `partial` / `blocked`
- raison simple ;
- niveau d'exploitabilite de la mesure.

### 3. Rights Track And Legal Basis

- base legale par droit ;
- specificite du track ;
- conditions particulieres.

### 4. Proposed Seizure Scope

- type de saisie ;
- locaux / objets / supports vises ;
- perimetre recommande ;
- points a exclure.

### 5. Evidence And Proportionality

- commencement de preuve ;
- adequation de la mesure ;
- limites de proportionalite ;
- points faibles.

### 6. Trade Secret And Execution Constraints

- secret des affaires ;
- scelles ;
- expert ;
- execution pratique ;
- points de friction previsibles.

### 7. Drafting And Execution Pack

- structure de requete ;
- instructions commissaire de justice ;
- pieces a joindre ;
- personnes a mobiliser.

### 8. Decision Routing

Contrainte a un vocabulaire ferme :

- `prepare-filing-pack`
- `prepare-execution-pack`
- `prepare-post-seizure-assignment`
- `prepare-evidence-hardening`
- `route-to-substantive-infringement-review`
- `hold-insufficient-basis`

### 9. Human Validation

- validation avocat obligatoire ;
- coordination commissaire de justice ;
- revue des delais post-saisie ;
- verification humaine finale.

## Boundary Rules

- `tri-contrefacon` : intake enforcement initial
- `mise-en-demeure-pi` : lettre et posture precontentieuse
- `contentieux-pi` : strategie judiciaire globale
- `tableau-contrefacon-brevet` : claim chart offensif brevet
- `contrefacon-droit-auteur` : analyse de fond auteur
- `contrefacon-dessin-modele` : analyse de fond D&M

## Compatibility

Compatibilite a preserver :

- nom du skill `saisie-contrefacon`
- perimetre multi-droits
- references aux articles sources
- idee de requete + instructions execution + delai post-saisie

Tolerance au changement :

- refonte forte du contrat d'entree
- gate explicite
- sortie V2 fermee
- frontieres plus strictes avec les autres skills contentieux/enforcement

## Documentation Impact

Mettre a jour :

- `plugins/hacienda-propriete-intellectuelle/skills/saisie-contrefacon/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/saisie-contrefacon/references/...`
- `plugins/hacienda-propriete-intellectuelle/README.md`
- `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

## Risks

- laisser le skill trop procedural sans verifier la base probatoire ;
- recreer un doublon avec `contentieux-pi` ;
- perdre la lisibilite multi-droits si le `rights_track` n'est pas impose ;
- sous-traiter trop tot l'analyse de fond a la requete.

## Recommendation

Migrer `saisie-contrefacon` en V2 comme **skill multi-droits, mais role
unique** :

- mesure probatoire stricte ;
- gate explicite ;
- sortie fermee ;
- routage post-saisie borne ;
- frontieres nettes avec la lettre, l'intake enforcement, le claim chart et le
  contentieux global.
