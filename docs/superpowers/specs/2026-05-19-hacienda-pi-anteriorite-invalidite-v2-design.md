---
title: Hacienda PI - anteriorite-invalidite V2
date: 2026-05-19
status: proposed
owners:
  - hacienda-propriete-intellectuelle
summary: >
  Recentrer anteriorite-invalidite comme skill V2 strictement centre sur la
  validite du brevet, avec branches `attack` et `defense`, Invalidity
  Readiness Gate, et routage ferme vers contentieux ou autres skills brevets.
---

# Contexte

`anteriorite-invalidite` est deja un skill substantiel qui couvre :

- nullite offensive preventive ;
- nullite en defense face a action contrefacon ;
- recherche d'art anterieur destructeur ;
- structuration des moyens de nullite.

Le fond est solide. Le sujet reste structurel :

- mode `attack` et mode `defense` encore trop melanges ;
- contrat d'entree implicite ;
- sortie riche mais peu stabilisee ;
- frontieres a raffermir avec `tableau-contrefacon-brevet`,
  `contentieux-pi` et `recherche-anteriorite-brevet`.

# Probleme

Le skill doit devenir la brique V2 de **validite du brevet adverse** :

1. identifier si le besoin est une nullite offensive ou une defense en nullite ;
2. structurer l'art anterieur et les motifs pertinents ;
3. evaluer si la base d'invalidite est assez forte pour etre exploitee ;
4. separer ce travail de la confrontation contrefacon et du pilotage
   contentieux global.

Aujourd'hui, la logique metier est forte, mais le skill reste un grand memo
ancien format. Le V2 doit le rendre plus ferme, plus lisible et plus
predictible.

# Decision de scope

`anteriorite-invalidite` V2 reste **strictement centre sur la validite** du
brevet.

Il ne doit pas absorber :

- la transaction / licence / settlement ;
- le claim chart offensif ;
- la strategie judiciaire complete.

Ces sujets restent du ressort de :

- `tableau-contrefacon-brevet`
- `contentieux-pi`
- `mise-en-demeure-pi` quand il y a une branche lettre

# Objectifs

## Objectifs principaux

1. Recentrer `anteriorite-invalidite` comme skill V2 de validite stricte.
2. Maintenir les deux modes :
   - `attack`
   - `defense`
3. Introduire un **Invalidity Readiness Gate** explicite.
4. Stabiliser la sortie en blocs V2.
5. Rendre explicites les frontieres avec les autres skills brevets.

## Non-objectifs

Le skill V2 ne doit pas :

- former l'assignation ou les conclusions ;
- negocier un settlement ;
- rediger la lettre de negociation ;
- produire un claim chart offensif ;
- remplacer `contentieux-pi`.

# Utilisateurs cibles

- avocat brevets / contentieux PI ;
- mandataire brevets EQE ;
- juriste PI interne preparant une revue externe ;
- equipe defense / attaque brevets.

# Principes de design

1. **Validite seulement.** Le skill regarde si le brevet tient, pas s'il est
   contrefait.
2. **Deux branches nettes.** `attack` et `defense` doivent diverger des
   l'intake.
3. **Prior art first.** Sans base d'art anterieur ou autre motif serieux, le
   skill doit le dire.
4. **Gate explicite.** La force de l'invalidite ne doit pas etre implicite.
5. **Validation humaine obligatoire.** L'action ou la defense restent du
   ressort du mandataire ou de l'avocat.

# Approches considerees

## Option 1 - Validite stricte bi-mode

Le skill garde `attack` et `defense`, mais les structure clairement autour de
la validite du brevet.

### Avantages

- respecte la surface metier existante ;
- garde la valeur pratique ;
- evite le dedoublement artificiel en deux skills.

### Inconvenients

- demande un cadrage rigoureux des frontieres.

## Option 2 - Split en deux skills

Un skill pour nullite offensive, un autre pour defense en nullite.

### Avantages

- separation maximale.

### Inconvenients

- plus de duplication ;
- plus de maintenance ;
- peu utile si la structure V2 suffit.

## Recommandation

Retenir **Option 1**.

# Contrat d'entree V2

Le skill doit expliciter ou deriver :

- `mode` :
  - `attack`
  - `defense`
- `patent_status` :
  - `fr`
  - `ep-fr`
  - `pct-fr`
  - `unknown`
- `invalidity_basis_status` :
  - `novelty`
  - `inventive-step`
  - `added-matter`
  - `insufficiency`
  - `mixed`
  - `unclear`
- `prior_art_coverage` :
  - `strong`
  - `mixed`
  - `weak`
  - `none`
- `litigation_pressure` :
  - `none-yet`
  - `pre-suit-threat`
  - `active-suit`
  - `urgent-defense`

Bloc de faits minimum :

- `patent_reference`
- `claims_targeted`
- `priority_date_status`
- `known_prior_art`
- `business_context`
- `why_attack_or_defend`
- `known_claim_chart_status`
- `known_missing_evidence`

# Gate central : Invalidity Readiness Gate

Le skill doit conclure explicitement sur :

## `ready`

- base d'art anterieur ou autre motif de nullite suffisamment exploitable ;
- revendications cibles identifiees ;
- articulation des moyens faisable.

## `partial`

- arguments plausibles mais incomplets ;
- prior art ou dates encore a consolider ;
- certains moyens restent exploratoires.

## `blocked`

- aucun motif serieux exploitable ;
- prior art trop faible ;
- dates ou revendications trop incertaines ;
- impossibilite de soutenir une nullite proprement.

# Structure de sortie V2

La sortie doit etre stabilisee en 9 blocs.

## 1. `Case Snapshot`

- brevet ;
- mode `attack` / `defense` ;
- pression contentieuse ;
- statut global.

## 2. `Patent and Procedural Posture`

- titre concerné ;
- revendications cibles ;
- contexte procedural utile ;
- posture du dossier.

## 3. `Prior Art and Basis Coverage`

- prior art retenu ;
- qualite de couverture ;
- dates critiques ;
- trous documentaires.

## 4. `Novelty Attack Map`

- documents destructeurs ou quasi-destructeurs ;
- mapping nouveaute ;
- points forts / faibles.

## 5. `Inventive Step Attack Map`

- document le plus proche ;
- probleme technique ;
- combinaison ou evidence ;
- fragilites.

## 6. `Other Invalidity Grounds`

- ajout de matiere ;
- insuffisance ;
- autres moyens eventuels ;
- statut `[a verifier]` si besoin.

## 7. `Critical Gaps and Litigation Risk`

- lacunes probatoires ;
- risques de faiblesse de l'attaque ou de la defense ;
- ce qui peut faire tomber le raisonnement.

## 8. `Decision Routing`

- une seule route finale ;
- justification ;
- 2 a 4 actions concretes.

## 9. `Human Validation`

- ce qui doit etre valide par mandataire / avocat ;
- reserves ;
- ce qui reste `[a verifier]`.

# Frontieres explicites

## `tableau-contrefacon-brevet`

Si la vraie question devient la confrontation produit / revendications, rerouter
vers le claim chart.

## `contentieux-pi`

Si le besoin devient le pilotage global du dossier judiciaire, rerouter.

## `recherche-anteriorite-brevet`

Si le besoin principal reste le premier passage prior art amont, rerouter.

## `preparation-depot-brevet`

Si le sujet concerne notre propre depot et non la validite d'un brevet tiers,
rerouter.

# Decision routing ferme

Le skill doit conclure avec une seule valeur :

- `prepare-nullity-brief`
- `prepare-defense-invalidity-brief`
- `expand-prior-art-record`
- `refine-claim-targeting`
- `route-to-claim-chart`
- `route-to-contentious-strategy`
- `hold-insufficient-basis`

# Documentation impactee

Mettre a jour :

- `plugins/hacienda-propriete-intellectuelle/README.md`
- `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

Le README doit expliciter que `anteriorite-invalidite` est :

- un skill V2 de validite stricte ;
- bi-mode `attack` / `defense` ;
- distinct du claim chart et du pilotage contentieux global ;
- structure autour d'un `Invalidity Readiness Gate`.

# Verification attendue

Verification repo standard :

- `npm test`
- `npm run typecheck`
- `npm run build`
- `npm run branding:check`
- `git diff --check`

Verification qualitative :

- garde-fou visible "preparation argumentaire, pas procedure judiciaire" ;
- `Invalidity Readiness Gate` visible ;
- contrat d'entree V2 ferme ;
- sortie en 9 blocs ;
- frontieres explicites avec les skills voisins ;
- routing final ferme.

# Risques

## Risque 1 - Skill trop proche du contentieux global

### Mitigation

Garder le skill centre sur les moyens de validite et router le reste vers
`contentieux-pi`.

## Risque 2 - Prior art trop faible mais presente comme exploitable

### Mitigation

Gate ferme, bloc `Critical Gaps and Litigation Risk`, et reserves visibles.

## Risque 3 - Defense et attaque encore melangees

### Mitigation

Separation nette du `mode` des l'intake et dans la sortie.

# Decision

Passer `anteriorite-invalidite` en V2 comme **skill de validite stricte**,
avec :

- modes `attack` et `defense` ;
- `Invalidity Readiness Gate` ;
- sortie en 9 blocs ;
- frontieres nettes avec claim chart et contentieux ;
- routing ferme vers les suites appropriees.
