---
name: anteriorite-invalidite
version: "2.0.0"
description: >
  Analyse de validité stricte d'un brevet adverse en mode `attack` ou
  `défense`. Structure les moyens de nullite, évalue la solidité de l'art
  antérieur et des autres bases d'invalidité, puis route vers la bonne suite
  brevets/contentieux. Ne qualifié pas la contrefaçon et ne remplace pas la
  procédure judiciaire.
argument-hint: "[num brevet cible | attack/défense | novelty/inventive-step/mixed]"
---

# Skill - Antériorité invalidité V2

> **Préparation argumentaire, pas procédure judiciaire.**
> `anteriorite-invalidite` prépare une analyse de validité stricte d'un
> brevet adverse, en mode `attack` ou `defense`. Il ne forme pas
> l'assignation, ne pilote pas tout le contentieux, ne negocie pas un
> settlement et ne remplace pas le tableau de contrefaçon produit/revendications.

Référence de travail utile :
`references/anteriorite-invalidite-routing-and-output.md`

## Examples

<example>
<user>/h-pi:anteriorite-invalidite [num brevet cible | attack/défense | novelty/inventive-step/mixed]</user>
<response>
Brouillon de travail structuré, avec faits, droit, analyse, incertitudes, sources consultées, points `[à vérifier]` et validation humaine obligatoire.
</response>
</example>

## Chargement du profil

Avant tout travail substantiel, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Si le profil est absent, incomplet ou contient `[A CONFIGURER]`, demander `/h-pi:entretien-demarrage` et garder les marqueurs `[à vérifier]` visibles.

## Intake

Identifier au minimum : demande, actif ou droit concerné, parties, territoire, dates utiles, documents disponibles, source officielle à consulter, urgence, sortie attendue et niveau de validation humaine requis.

## Gate non-juriste

Si l'utilisateur n'est pas juriste ou avocat, produire une explication opérationnelle, signaler les limites, refuser toute conclusion présentée comme avis juridique final et demander validation par un professionnel habilité avant usage externe.

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Propriété Intellectuelle` est disponible. Ne pas inventer de tool hors périmètre ; si une source ou un registre n'a pas été consulté directement, garder `[à vérifier]`.

- Socle textes, jurisprudence et droit UE : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Anno, quand disponible, reste une source interne de dossier : jamais un registre officiel INPI, EUIPO, OEB, OMPI ou BOPI.

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/` ou `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`.

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

## Positionnement

`anteriorite-invalidite` sert à :

1. cadrer le mode `attack` ou `defense` ;
2. structurer les moyens de nullité ;
3. évaluer la force de l'art antérieur et des autres motifs ;
4. poser un `Invalidity Readiness Gate` explicite ;
5. router vers la bonne suite brevets/contentieux.

## Ce skill ne fait pas

- ne qualifié pas la contrefaçon ;
- ne produit pas un tableau de contrefaçon offensif ;
- ne forme pas l'action ou les conclusions ;
- ne negocie pas licence, transaction ou settlement ;
- ne remplace pas `contentieux-pi` ;
- ne remplace pas `tableau-contrefacon-brevet`.

## Contrat d'entrée V2

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

Rattacher à l'analyse :

- rôle de l'utilisateur ;
- posture du cabinet ou de l'equipe ;
- approbateurs internes ou externes ;
- niveau de validation attendu par mandataire brevets ou avocat.

Si le profil est absent ou `[A CONFIGURER]`, travailler en mode provisoire et
taguer les hypothèses critiques `[PROVISOIRE]`.

## Cadrage initial

Si aucun mode n'est fourni, demander d'abord :

- `attack`
- `defense`

Puis adapter l'cadrage initial.

### Branche `attack`

Vérifier :

- pourquoi attaquer le brevet ;
- quelles revendications doivent tomber ;
- quelle pression business ou concurrentielle existe déjà ;
- quels documents de prior art sont déjà identifiés.

### Branche `defense`

Vérifier :

- quelle menace ou action existe déjà ;
- quelles revendications sont opposees ;
- si un tableau de contrefaçon existe déjà ;
- quelles bases de nullité peuvent soutenir la défense.

Si `mode = defense` et qu'un tableau de contrefaçon existe déjà, l'utiliser comme contexte
de défense, sans absorber sa logique de comparaison produit/revendications.

## Seuil de préparation de l'invalidité

Le skill doit conclure explicitement sur :

- `ready`
  - base d'art antérieur ou autre motif exploitable ;
  - revendications cibles identifiées ;
  - articulation des moyens faisable.
- `partial`
  - arguments plausibles mais incomplets ;
  - art antérieur ou dates encore à consolider ;
  - certains moyens restent exploratoires.
- `blocked`
  - aucun motif sérieux exploitable ;
  - prior art trop faible ;
  - dates ou revendications trop incertaines ;
  - impossibilité de soutenir une nullité proprement.

Contrôles du seuil :

- si `prior_art_coverage = none`, bloquer ;
- si `patent_status = unknown`, rester `partial` ou `blocked` tant que le
  titre et sa posture procédurale ne sont pas stabilisés ;
- si `priority_date_status` n'est pas stabilisé, rester `partial` ou `blocked` ;
- si `claims_targeted` sont trop floues, rester `partial` ou `blocked` ;
- si les autres motifs (`added-matter`, `insufficiency`) sont invoqués sans
  base textuelle exploitable, ne pas les sur-vendre.

## Families de moyens

Le skill doit structurer les moyens selon trois familles V2 :

- `Novelty Attack Map`
- `Inventive Step Attack Map`
- `Other Invalidity Grounds`

### Carte d’attaque par nouveauté

Pour chaque revendication ciblee :

- identifier les documents destructeurs ou quasi-destructeurs ;
- distinguer ce qui est explicitement divulgué, implicitement supporte ou
  manquant ;
- marquer `unknown` si la citation n'est pas assez exploitable.

### Carte d’attaque par activité inventive

Pour chaque combinaison plausible :

- identifier le document le plus proche ;
- formuler le probleme technique objectif ;
- expliciter la motivation de combinaison ;
- signaler tout raisonnement fragile ou retrospectif.

### Other Invalidity Grounds

Traiter seulement si une base sérieuse existe :

- ajout de matière ;
- insuffisance ;
- autre moyen connexe de validité.

Les points non vérifiés restent `[à vérifier]` ou `[review]`.

## Frontieres de routage

- `tableau-contrefacon-brevet` : si la vraie question devient la comparaison
  produit/revendications ;
- `contentieux-pi` : si le besoin devient le pilotage global du dossier
  judiciaire ;
- `recherche-anteriorite-brevet` : si le besoin principal reste un premier
  passage prior art amont ;
- `preparation-depot-brevet` : si le sujet concerné notre propre dépôt et non
  la validité d'un brevet tiers.

## Format de sortie V2

La sortie doit être stabilisée en 9 blocs.

### 1. Synthèse du dossier

- brevet ;
- mode `attack` / `defense` ;
- pression contentieuse ;
- statut global du seuil.

### 2. Brevet et posture procédurale

- titre concerné ;
- revendications ciblees ;
- contexte procédural utile ;
- posture du dossier.

### 3. Couverture de l’art antérieur et des fondements

- prior art retenu ;
- qualité de couverture ;
- dates critiques ;
- sources effectivement consultées et sources non encore consultées ;
- niveau d'appui citation par citation (date, revendication, passage utile) ;
- trous documentaires.

### 4. Carte d’attaque par nouveauté

- documents destructeurs ou quasi-destructeurs ;
- mapping nouveauté ;
- points forts et faibles.

### 5. Carte d’attaque par activité inventive

- closest prior art ;
- probleme technique objectif ;
- combinaison ou evidence ;
- fragilites.

### 6. Other Invalidity Grounds

- ajout de matière ;
- insuffisance ;
- autres moyens éventuels ;
- statut `[à vérifier]` si besoin.

### 7. Lacunes critiques et risque contentieux

- lacunes probatoires ;
- risques de faiblesse de l'attaque ou de la défense ;
- ce qui peut faire tomber le raisonnement.

### 8. Routage de décision

Conclure avec une seule valeur :

- `prepare-nullity-brief`
- `prepare-defense-invalidity-brief`
- `expand-prior-art-record`
- `refine-claim-targeting`
- `route-to-claim-chart`
- `route-to-contentious-strategy`
- `hold-insufficient-basis`

Associer à la route :

- une justification breve ;
- 2 à 4 actions concrètes ;
- le point de validation humaine requis avant usage externe.

### 9. Validation humaine

- ce qui doit être valide par mandataire ou avocat ;
- les réserves ;
- tout ce qui reste `[à vérifier]`.

## Règles de sûreté

- Toujours rappeler en tete : `Préparation argumentaire, pas procédure
  judiciaire`.
- Ne jamais présenter une base de nullité faible comme exploitable sans réserve.
- Ne jamais confondre validité du brevet et contrefaçon du produit.
- Ne jamais citer un prior art comme appui sans source consultée, date
  exploitable et rattachement minimal à la revendication attaquee.
- Si certaines bases n'ont pas été interrogees ou si un document n'a pas été
  consulté directement, l'indiquer explicitement dans `Prior Art and Basis
  Coverage` ou `Lacunes critiques et risque contentieux`.
- Si la recherche d'art antérieur est trop préliminaire, router vers
  `recherche-anteriorite-brevet`.
- Si la stratégie devient principalement contentieuse, router vers
  `contentieux-pi`.

## Rappel final à conserver

`anteriorite-invalidite` V2 est un skill de validité stricte seulement.
Il structure une attaque ou une défense en nullité, mais ne remplace ni le
tableau de contrefaçon offensif, ni la stratégie contentieuse globale, ni la validation
humaine finale avant toute action externe.
