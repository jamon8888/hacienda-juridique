---
name: recherche-anteriorite-brevet
version: "2.0.0"
description: >
  Premier passage strict de recherche d'antériorité brevet pour signaler les
  exclusions, l'art antérieur proche, les lacunes de couverture et les routes
  amont ou aval avant revue humaine. Ce skill ne conclut jamais qu'une
  invention est brevetable ni exploitable.
argument-hint: "[description invention | CIB/CPC | FR/EP/PCT]"
---

# Skill - Recherche d'antériorité brevet V2

> **Premier passage, pas une opinion de brevetabilité ni de FTO.**
> `recherche-anteriorite-brevet` sert à faire un premier triage structuré de
> nouveauté et d'activité inventive sur la base des sources réellement
> interrogées. Il ne remplace ni une recherche professionnelle exhaustive, ni
> un mandataire brevets, ni une analyse de contrefaçon, ni une analyse de
> nullité.

Référence de travail utile :
`references/recherche-anteriorite-brevet-routing-and-output.md`

## Positionnement

`recherche-anteriorite-brevet` reste la première brique de la voie brevets :

1. cadrage technique initial ;
2. premier passage sur exclusions, classifications et art antérieur proche ;
3. seuil de couverture de recherche ;
4. routage vers dépôt, invalidité, tableau de contrefaçon ou régime logiciel selon
   l'issue.

Ce skill est strictement borné au premier passage :

- il ne conclut jamais "brevetable" ;
- il ne conclut jamais "liberté d'exploitation acquise" ;
- il ne rédige pas le dossier de dépôt ;
- il ne monte pas un dossier de nullité ou de contrefaçon.

## Ce skill ne fait pas

- Ne rend pas une opinion finale de brevetabilité.
- Ne rend pas une opinion FTO.
- Ne remplace pas une recherche exhaustive brevets + NPL.
- Ne rédige pas une demande de brevet.
- Ne prépare pas un dossier d'invalidité contentieuse.
- Ne fait pas un tableau de contrefaçon de contrefaçon.

## Contrat d'entrée V2

Le skill doit expliciter ou dériver les dimensions suivantes :

- `invention_type`: `device`, `process`, `composition`, `software-implemented`,
  `biotech-medical`, `mixed`, `unknown`
- `search_intent`: `pre-filing`, `portfolio-extension`, `défensive-check`,
  `research-check`, `unknown`
- `territory_scope`: `fr`, `ep`, `pct`, `fr-ep`, `multi-territory`, `unknown`
- `classification_status`: `known`, `proposed`, `mixed`, `unclear`
- `search_coverage_gate`: `sufficient-first-pass`, `partial`, `degraded`,
  `none`

Bloc de faits à exposer explicitement :

- `proposed_invention`
- `technical_problem`
- `technical_solution`
- `known_classifications`
- `priority_reference_date`
- `known_prior_art`
- `search_limitations`

## Chargement du profil pratique

Avant tout, lire :

1. `~/.claude/extensions/config/hacienda-juridique/company-profile.md`
2. `~/.claude/extensions/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Rattacher ensuite :

- le rôle utilisateur ;
- les territoires cibles habituels ;
- le domaine technique dominant ;
- la posture de prudence ;
- les intégrations réellement disponibles.

Si le profil contient `[A CONFIGURER]`, le dire explicitement et tagger la
sortie `[PROVISOIRE]`.

## Cadrage initial

Demander en un seul batch, puis mapper la réponse au contrat V2 :

1. problème technique et solution technique ;
2. type d'invention ou contexte technique ;
3. CIB ou CPC déjà connues, sinon domaine à classifier ;
4. date de priorité ou de référence visée ;
5. territoires cibles ;
6. art antérieur déjà connu ;
7. limites déjà identifiées de la recherche.

Guidance de mapping minimale :

- dispositif ou système matériel -> `invention_type: device`
- procédé de fabrication ou de traitement -> `invention_type: process`
- molécule, formulation, alliage, matière -> `invention_type: composition`
- invention informatique avec effet technique revendiqué -> `invention_type: software-implemented`
- invention biomédicale ou medtech -> `invention_type: biotech-medical`
- CIB/CPC fournies -> `classification_status: known`
- CIB/CPC seulement esquissées -> `classification_status: mixed`
- simple domaine sans code -> `classification_status: proposed`
- description trop vague -> `classification_status: unclear`
- FR seul -> `territory_scope: fr`
- EP seul -> `territory_scope: ep`
- PCT seul -> `territory_scope: pct`
- FR + EP -> `territory_scope: fr-ep`
- plusieurs routes nationales ou mixte -> `territory_scope: multi-territory`

Si la description reste vague, pousser une fois pour obtenir un effet technique
mesurable. Si elle reste floue, réduire la confiance et marquer
`classification_status: unclear`.

## Couche 1 - Exclusions et éligibilité minimum

Le premier passage doit passer au minimum les exclusions ou fragilités
intrinsèques suivantes :

- découverte ou théorie pure ;
- méthode mathématique abstraite ;
- plan, méthode intellectuelle ou business method ;
- logiciel en tant que tel ;
- présentation d'information ;
- méthode thérapeutique / chirurgicale / diagnostic in vivo ;
- autre point d'éligibilité évident selon le domaine.

Ce bloc signale des risques d'éligibilité ; il ne tranche pas seul le dépôt.

## Couche 2 - Seuil de couverture de recherche

Avant de commenter les documents trouvés, décrire explicitement la couverture
réelle :

- bases interrogées ;
- classifications couvertes ;
- mots-clés ou axes couverts ;
- territoire ou familles couverts ;
- NPL couverte ou non ;
- limites restantes.

Le gate ne peut sortir que sur :

- `sufficient-first-pass`
- `partial`
- `degraded`
- `none`

Si aucune base brevets n'est interrogée, le seuil doit être `none`.

## Couche 3 - Art antérieur proche

L'objectif est de faire remonter les documents potentiellement pertinents, pas
de trancher la revendication finale.

Pour chaque document trouvé ou fourni, capturer si possible :

- numéro ou identifiant ;
- source ;
- titre ;
- classifications principales ;
- déposant ;
- date de publication ;
- date de priorité si disponible ;
- type de signal : proche, potentiellement X, potentiellement Y, contexte ;
- note de pertinence.

Pas de supplémentation silencieuse. Si une donnée manque, l'écrire comme
indisponible.

## Couche 4 - Classifications voisines et NPL

Le skill doit rendre visible si les classifications voisines et la littérature
non-brevet ont été couvertes, proposées ou ignorées.

Le minimum attendu :

1. proposer des CIB/CPC voisines plausibles ;
2. dire si elles ont été confirmées ou non ;
3. lister les bases NPL recommandées quand la couverture NPL manque ;
4. expliciter l'impact de cette lacune sur la force du triage.

## Couche 5 - Signaux de nouveauté et d'activité inventive

Présenter les signaux, pas une conclusion fermée.

Analyser comme signaux :

- closest prior art plausible ;
- caractéristiques distinctives apparentes ;
- effet technique annoncé ou visible ;
- problème technique objectif plausible ;
- signaux contre la nouveauté ;
- signaux contre l'activité inventive.

Règles de prudence :

- ne jamais conclure "invention brevetable" ;
- si la couverture est incomplète, réduire la portée de toute recommandation ;
- distinguer clairement nouveauté, activité inventive et FTO.

## Limites de routage

### Router vers `preparation-depot-brevet`

- pas de blocage majeur évident au premier passage ;
- couverture minimale exploitable pour structurer un dépôt ;
- validation humaine encore obligatoire avant rédaction et dépôt.

### Router vers `anteriorite-invalidite`

- le besoin principal devient la contestation d'un brevet tiers ;
- l'art antérieur doit être structuré pour une nullité ou une défense ;
- le dossier a déjà basculé vers une logique d'attaque ou de défense sur un
  titre existant.

### Router vers `tableau-contrefacon-brevet`

- le sujet principal devient la comparaison revendications / produit ou
  procédé accusé ;
- il faut analyser une contrefaçon potentielle ou une défense technique
  d'atteinte ;
- la question n'est plus la brevetabilité initiale de l'invention proposée.

### Router vers `logiciels-pi`

- le sujet principal est le régime logiciel, la titularité, les licences ou
  l'OSS ;
- la question brevets n'est pas le cœur du dossier ;
- il faut d'abord qualifier la couche logiciel avant de pousser une piste
  brevet.

### Rester dans `recherche-anteriorite-brevet`

- besoin principal = premier passage d'antériorité ;
- exclusions, couverture et art antérieur proche restent la question centrale ;
- le dossier n'est pas encore dans une logique dépôt, nullité, contrefaçon ou
  régime logiciel plus spécialisée.

## Contrat de sortie V2

La sortie doit produire exactement les neuf blocs suivants, dans cet ordre :

1. `Synthèse d'éligibilité`
2. `Seuil de couverture de recherche`
3. `Classification et périmètre de recherche`
4. `Art antérieur le plus proche`
5. `Couverture NPL et voisine`
6. `Signaux de nouveauté`
7. `Signaux d'activité inventive`
8. `Routage de prochaine étape`
9. `Validation humaine`

### 1. `Synthèse d'éligibilité`

- type d'invention ;
- exclusions ou fragilités d'éligibilité ;
- points neutres et flags.

### 2. `Seuil de couverture de recherche`

- état du seuil ;
- bases interrogées ;
- limites majeures ;
- effet pratique sur la fiabilité du triage.

### 3. `Classification et périmètre de recherche`

- CIB/CPC retenues ou proposées ;
- mots-clés ou axes couverts ;
- territoires couverts ;
- portée réelle du premier passage.

### 4. `Art antérieur le plus proche`

- documents les plus proches ;
- source et données clé ;
- raison du signalement ;
- éventuel signal X/Y/contexte si pertinent.

### 5. `Couverture NPL et voisine`

- CIB/CPC voisines proposées ;
- statut de confirmation ;
- NPL couverte ou non ;
- impacts des trous de couverture.

### 6. `Signaux de nouveauté`

- signaux contre ou en faveur de la nouveauté ;
- documents potentiellement destructeurs ;
- caractéristiques apparemment déjà connues ou encore distinctes ;
- prudence sur les trous de lecture.

### 7. `Signaux d'activité inventive`

- closest prior art ;
- caractéristiques distinctives plausibles ;
- effet technique ;
- problème technique objectif ;
- signaux pour ou contre l'activité inventive.

### 8. `Routage de prochaine étape`

Ce bloc doit utiliser uniquement l'une des valeurs suivantes :

- `prepare-drafting-brief`
- `expand-search-coverage`
- `seek-patentability-review`
- `pivot-to-invalidity-analysis`
- `pivot-to-infringement-chart`
- `route-to-software-regime-review`
- `hold-or-do-not-file`

Associer la valeur choisie à 2-4 actions concrètes et à sa justification.

### 9. `Validation humaine`

- rappeler qu'il s'agit d'un premier passage ;
- nommer les validations humaines requises ;
- rappeler les points `[à vérifier]` avant dépôt, communication publique ou
  investissement industriel.

## Règles de sûreté

- Ce skill ne conclut jamais à la brevetabilité.
- Ce skill ne conclut jamais à la FTO.
- Une base non interrogée ou une NPL absente reste une lacune visible.
- `logiciels-pi` doit être utilisé quand le cœur du sujet est le régime
  logiciel plutôt que l'art antérieur brevet.
- Les numéros, dates, classifications et statuts doivent rester reliés à une
  source ouvrable avant d'être cités comme appui.

## Rappel final à conserver

- premier passage strict uniquement ;
- jamais opinion de brevetabilité ni FTO ;
- revue humaine obligatoire avant dépôt, communication publique ou
  industrialisation.
