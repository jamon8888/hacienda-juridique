---
name: anteriorite-invalidite
version: "2.0.0"
description: >
  Analyse de validite stricte d'un brevet adverse en mode `attack` ou
  `defense`. Structure les moyens de nullite, evalue la solidite de l'art
  anterieur et des autres bases d'invalidite, puis route vers la bonne suite
  brevets/contentieux. Ne qualifie pas la contrefacon et ne remplace pas la
  procedure judiciaire.
argument-hint: "[num brevet cible | attack/defense | novelty/inventive-step/mixed]"
---

# Skill - Anteriorite invalidite V2

> **Preparation argumentaire, pas procedure judiciaire.**
> `anteriorite-invalidite` prepare une analyse de validite stricte d'un
> brevet adverse, en mode `attack` ou `defense`. Il ne forme pas
> l'assignation, ne pilote pas tout le contentieux, ne negocie pas un
> settlement et ne remplace pas le claim chart produit/revendications.

Reference de travail utile :
`references/anteriorite-invalidite-routing-and-output.md`

## Positionnement

`anteriorite-invalidite` sert a :

1. cadrer le mode `attack` ou `defense` ;
2. structurer les moyens de nullite ;
3. evaluer la force de l'art anterieur et des autres motifs ;
4. poser un `Invalidity Readiness Gate` explicite ;
5. router vers la bonne suite brevets/contentieux.

## Ce skill ne fait pas

- ne qualifie pas la contrefacon ;
- ne produit pas un claim chart offensif ;
- ne forme pas l'action ou les conclusions ;
- ne negocie pas licence, transaction ou settlement ;
- ne remplace pas `contentieux-pi` ;
- ne remplace pas `tableau-contrefacon-brevet`.

## Contrat d'entree V2

Le skill doit expliciter ou deriver :

- `mode` : `attack`, `defense`
- `patent_status` : `fr`, `ep-fr`, `pct-fr`, `unknown`
- `invalidity_basis_status` :
  `novelty`, `inventive-step`, `added-matter`, `insufficiency`, `mixed`,
  `unclear`
- `prior_art_coverage` : `strong`, `mixed`, `weak`, `none`
- `litigation_pressure` :
  `none-yet`, `pre-suit-threat`, `active-suit`, `urgent-defense`

Bloc de faits minimum :

- `patent_reference`
- `claims_targeted`
- `priority_date_status`
- `known_prior_art`
- `consulted_sources_status`
- `business_context`
- `why_attack_or_defend`
- `known_claim_chart_status`
- `known_missing_evidence`

## Charger le profil pratique avant de commencer

Avant tout, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Rattacher a l'analyse :

- role de l'utilisateur ;
- posture du cabinet ou de l'equipe ;
- approbateurs internes ou externes ;
- niveau de validation attendu par mandataire brevets ou avocat.

Si le profil est absent ou `[A CONFIGURER]`, travailler en mode provisoire et
taguer les hypotheses critiques `[PROVISOIRE]`.

## Intake

Si aucun mode n'est fourni, demander d'abord :

- `attack`
- `defense`

Puis adapter l'intake.

### Branche `attack`

Verifier :

- pourquoi attaquer le brevet ;
- quelles revendications doivent tomber ;
- quelle pression business ou concurrentielle existe deja ;
- quels documents de prior art sont deja identifies.

### Branche `defense`

Verifier :

- quelle menace ou action existe deja ;
- quelles revendications sont opposees ;
- si un claim chart existe deja ;
- quelles bases de nullite peuvent soutenir la defense.

Si `mode = defense` et qu'un claim chart existe deja, l'utiliser comme contexte
de defense, sans absorber sa logique de comparaison produit/revendications.

## Invalidity Readiness Gate

Le skill doit conclure explicitement sur :

- `ready`
  - base d'art anterieur ou autre motif exploitable ;
  - revendications cibles identifiees ;
  - articulation des moyens faisable.
- `partial`
  - arguments plausibles mais incomplets ;
  - prior art ou dates encore a consolider ;
  - certains moyens restent exploratoires.
- `blocked`
  - aucun motif serieux exploitable ;
  - prior art trop faible ;
  - dates ou revendications trop incertaines ;
  - impossibilite de soutenir une nullite proprement.

Checks de gate :

- si `prior_art_coverage = none`, bloquer ;
- si `patent_status = unknown`, rester `partial` ou `blocked` tant que le
  titre et sa posture procedurale ne sont pas stabilises ;
- si `priority_date_status` n'est pas stabilise, rester `partial` ou `blocked` ;
- si `claims_targeted` sont trop floues, rester `partial` ou `blocked` ;
- si les autres motifs (`added-matter`, `insufficiency`) sont invoques sans
  base textuelle exploitable, ne pas les sur-vendre.

## Families de moyens

Le skill doit structurer les moyens selon trois familles V2 :

- `Novelty Attack Map`
- `Inventive Step Attack Map`
- `Other Invalidity Grounds`

### Novelty Attack Map

Pour chaque revendication ciblee :

- identifier les documents destructeurs ou quasi-destructeurs ;
- distinguer ce qui est explicitement divulgue, implicitement supporte ou
  manquant ;
- marquer `unknown` si la citation n'est pas assez exploitable.

### Inventive Step Attack Map

Pour chaque combinaison plausible :

- identifier le document le plus proche ;
- formuler le probleme technique objectif ;
- expliciter la motivation de combinaison ;
- signaler tout raisonnement fragile ou retrospectif.

### Other Invalidity Grounds

Traiter seulement si une base serieuse existe :

- ajout de matiere ;
- insuffisance ;
- autre moyen connexe de validite.

Les points non verifies restent `[a verifier]` ou `[review]`.

## Frontieres de routage

- `tableau-contrefacon-brevet` : si la vraie question devient la comparaison
  produit/revendications ;
- `contentieux-pi` : si le besoin devient le pilotage global du dossier
  judiciaire ;
- `recherche-anteriorite-brevet` : si le besoin principal reste un premier
  passage prior art amont ;
- `preparation-depot-brevet` : si le sujet concerne notre propre depot et non
  la validite d'un brevet tiers.

## Format de sortie V2

La sortie doit etre stabilisee en 9 blocs.

### 1. Case Snapshot

- brevet ;
- mode `attack` / `defense` ;
- pression contentieuse ;
- statut global du gate.

### 2. Patent and Procedural Posture

- titre concerne ;
- revendications ciblees ;
- contexte procedural utile ;
- posture du dossier.

### 3. Prior Art and Basis Coverage

- prior art retenu ;
- qualite de couverture ;
- dates critiques ;
- sources effectivement consultees et sources non encore consultees ;
- niveau d'appui citation par citation (date, revendication, passage utile) ;
- trous documentaires.

### 4. Novelty Attack Map

- documents destructeurs ou quasi-destructeurs ;
- mapping nouveaute ;
- points forts et faibles.

### 5. Inventive Step Attack Map

- closest prior art ;
- probleme technique objectif ;
- combinaison ou evidence ;
- fragilites.

### 6. Other Invalidity Grounds

- ajout de matiere ;
- insuffisance ;
- autres moyens eventuels ;
- statut `[a verifier]` si besoin.

### 7. Critical Gaps and Litigation Risk

- lacunes probatoires ;
- risques de faiblesse de l'attaque ou de la defense ;
- ce qui peut faire tomber le raisonnement.

### 8. Decision Routing

Conclure avec une seule valeur :

- `prepare-nullity-brief`
- `prepare-defense-invalidity-brief`
- `expand-prior-art-record`
- `refine-claim-targeting`
- `route-to-claim-chart`
- `route-to-contentious-strategy`
- `hold-insufficient-basis`

Associer a la route :

- une justification breve ;
- 2 a 4 actions concretes ;
- le point de validation humaine requis avant usage externe.

### 9. Human Validation

- ce qui doit etre valide par mandataire ou avocat ;
- les reserves ;
- tout ce qui reste `[a verifier]`.

## Regles de surete

- Toujours rappeler en tete : `Preparation argumentaire, pas procedure
  judiciaire`.
- Ne jamais presenter une base de nullite faible comme exploitable sans reserve.
- Ne jamais confondre validite du brevet et contrefacon du produit.
- Ne jamais citer un prior art comme appui sans source consultee, date
  exploitable et rattachement minimal a la revendication attaquee.
- Si certaines bases n'ont pas ete interrogees ou si un document n'a pas ete
  consulte directement, l'indiquer explicitement dans `Prior Art and Basis
  Coverage` ou `Critical Gaps and Litigation Risk`.
- Si la recherche d'art anterieur est trop preliminaire, router vers
  `recherche-anteriorite-brevet`.
- Si la strategie devient principalement contentieuse, router vers
  `contentieux-pi`.

## Rappel final a conserver

`anteriorite-invalidite` V2 est un skill de validite stricte seulement.
Il structure une attaque ou une defense en nullite, mais ne remplace ni le
claim chart offensif, ni la strategie contentieuse globale, ni la validation
humaine finale avant toute action externe.
