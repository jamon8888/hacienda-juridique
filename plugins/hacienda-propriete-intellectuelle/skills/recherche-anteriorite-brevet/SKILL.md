---
name: recherche-anteriorite-brevet
description: >
  Premier passage strict de recherche d'anteriorite brevet pour signaler les
  exclusions, l'art anterieur proche, les lacunes de couverture et les routes
  amont ou aval avant revue humaine. Ce skill ne conclut jamais qu'une
  invention est brevetable ni exploitable.
argument-hint: "[description invention | CIB/CPC | FR/EP/PCT]"
---

# Skill - Recherche d'anteriorite brevet V2

> **Premier passage, pas une opinion de brevetabilite ni de FTO.**
> `recherche-anteriorite-brevet` sert a faire un premier triage structure de
> nouveaute et d'activite inventive sur la base des sources reellement
> interrogees. Il ne remplace ni une recherche professionnelle exhaustive, ni
> un mandataire brevets, ni une analyse de contrefacon, ni une analyse de
> nullite.

Reference de travail utile :
`references/recherche-anteriorite-brevet-routing-and-output.md`

## Positionnement

`recherche-anteriorite-brevet` reste la premiere brique de la lane brevets :

1. cadrage technique initial ;
2. premier passage sur exclusions, classifications et art anterieur proche ;
3. gate de couverture de recherche ;
4. routage vers depot, invalidite, claim chart ou regime logiciel selon
   l'issue.

Ce skill est strictement borne au premier passage :

- il ne conclut jamais "brevetable" ;
- il ne conclut jamais "liberte d'exploitation acquise" ;
- il ne redige pas le dossier de depot ;
- il ne monte pas un dossier de nullite ou de contrefacon.

## Ce skill ne fait pas

- Ne rend pas une opinion finale de brevetabilite.
- Ne rend pas une opinion FTO.
- Ne remplace pas une recherche exhaustive brevets + NPL.
- Ne redige pas une demande de brevet.
- Ne prepare pas un dossier d'invalidite contentieuse.
- Ne fait pas un claim chart de contrefacon.

## Contrat d'entree V2

Le skill doit expliciter ou deriver les dimensions suivantes :

- `invention_type`: `device`, `process`, `composition`, `software-implemented`,
  `biotech-medical`, `mixed`, `unknown`
- `search_intent`: `pre-filing`, `portfolio-extension`, `defensive-check`,
  `research-check`, `unknown`
- `territory_scope`: `fr`, `ep`, `pct`, `fr-ep`, `multi-territory`, `unknown`
- `classification_status`: `known`, `proposed`, `mixed`, `unclear`
- `search_coverage_gate`: `sufficient-first-pass`, `partial`, `degraded`,
  `none`

Bloc de faits a exposer explicitement :

- `proposed_invention`
- `technical_problem`
- `technical_solution`
- `known_classifications`
- `priority_reference_date`
- `known_prior_art`
- `search_limitations`

## Chargement du profil pratique

Avant tout, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Rattacher ensuite :

- le role utilisateur ;
- les territoires cibles habituels ;
- le domaine technique dominant ;
- la posture de prudence ;
- les integrations reellement disponibles.

Si le profil contient `[A CONFIGURER]`, le dire explicitement et tagger la
sortie `[PROVISOIRE]`.

## Intake

Demander en un seul batch, puis mapper la reponse au contrat V2 :

1. probleme technique et solution technique ;
2. type d'invention ou contexte technique ;
3. CIB ou CPC deja connues, sinon domaine a classifier ;
4. date de priorite ou de reference visee ;
5. territoires cibles ;
6. art anterieur deja connu ;
7. limites deja identifiees de la recherche.

Guidance de mapping minimale :

- dispositif ou systeme materiel -> `invention_type: device`
- procede de fabrication ou de traitement -> `invention_type: process`
- molecule, formulation, alliage, matiere -> `invention_type: composition`
- invention informatique avec effet technique revendique -> `invention_type: software-implemented`
- invention biomedicale ou medtech -> `invention_type: biotech-medical`
- CIB/CPC fournies -> `classification_status: known`
- CIB/CPC seulement esquissees -> `classification_status: mixed`
- simple domaine sans code -> `classification_status: proposed`
- description trop vague -> `classification_status: unclear`
- FR seul -> `territory_scope: fr`
- EP seul -> `territory_scope: ep`
- PCT seul -> `territory_scope: pct`
- FR + EP -> `territory_scope: fr-ep`
- plusieurs routes nationales ou mixte -> `territory_scope: multi-territory`

Si la description reste vague, pousser une fois pour obtenir un effet technique
mesurable. Si elle reste floue, reduire la confiance et marquer
`classification_status: unclear`.

## Couche 1 - Exclusions et eligibilite minimum

Le premier passage doit passer au minimum les exclusions ou fragilites
intrinseques suivantes :

- decouverte ou theorie pure ;
- methode mathematique abstraite ;
- plan, methode intellectuelle ou business method ;
- logiciel en tant que tel ;
- presentation d'information ;
- methode therapeutique / chirurgicale / diagnostic in vivo ;
- autre point d'eligibilite evident selon le domaine.

Ce bloc signale des risques d'eligibilite ; il ne tranche pas seul le depot.

## Couche 2 - Search Coverage Gate

Avant de commenter les documents trouves, decrire explicitement la couverture
reelle :

- bases interrogees ;
- classifications couvertes ;
- mots-cles ou axes couverts ;
- territoire ou familles couverts ;
- NPL couverte ou non ;
- limites restantes.

Le gate ne peut sortir que sur :

- `sufficient-first-pass`
- `partial`
- `degraded`
- `none`

Si aucune base brevets n'est interrogee, le gate doit etre `none`.

## Couche 3 - Art anterieur proche

L'objectif est de faire remonter les documents potentiellement pertinents, pas
de trancher la revendication finale.

Pour chaque document trouve ou fourni, capturer si possible :

- numero ou identifiant ;
- source ;
- titre ;
- classifications principales ;
- deposant ;
- date de publication ;
- date de priorite si disponible ;
- type de signal : proche, potentiellement X, potentiellement Y, contexte ;
- note de pertinence.

Pas de supplementation silencieuse. Si une donnee manque, l'ecrire comme
indisponible.

## Couche 4 - Classifications voisines et NPL

Le skill doit rendre visible si les classifications voisines et la litterature
non-brevet ont ete couvertes, proposees ou ignorees.

Le minimum attendu :

1. proposer des CIB/CPC voisines plausibles ;
2. dire si elles ont ete confirmees ou non ;
3. lister les bases NPL recommandees quand la couverture NPL manque ;
4. expliciter l'impact de cette lacune sur la force du triage.

## Couche 5 - Signaux de nouveaute et d'activite inventive

Presenter les signaux, pas une conclusion ferme.

Analyser comme signaux :

- closest prior art plausible ;
- caracteristiques distinctives apparentes ;
- effet technique annonce ou visible ;
- probleme technique objectif plausible ;
- signaux contre la nouveaute ;
- signaux contre l'activite inventive.

Regles de prudence :

- ne jamais conclure "invention brevetable" ;
- si la couverture est incomplete, reduire la portee de toute recommandation ;
- distinguer clairement nouveaute, activite inventive et FTO.

## Routing Boundaries

### Route to `preparation-depot-brevet`

- pas de blocage majeur evident au premier passage ;
- couverture minimale exploitable pour structurer un depot ;
- validation humaine encore obligatoire avant redaction et depot.

### Route to `anteriorite-invalidite`

- le besoin principal devient la contestation d'un brevet tiers ;
- l'art anterieur doit etre structure pour une nullite ou une defense ;
- le dossier a deja bascule vers une logique d'attaque ou de defense sur un
  titre existant.

### Route to `tableau-contrefacon-brevet`

- le sujet principal devient la comparaison revendications / produit ou
  procede accuse ;
- il faut analyser une contrefacon potentielle ou une defense technique
  d'atteinte ;
- la question n'est plus la brevetabilite initiale de l'invention proposee.

### Route to `logiciels-pi`

- le sujet principal est le regime logiciel, la titularite, les licences ou
  l'OSS ;
- la question brevets n'est pas le coeur du dossier ;
- il faut d'abord qualifier la couche logiciel avant de pousser une piste
  brevet.

### Stay in `recherche-anteriorite-brevet`

- besoin principal = premier passage d'anteriorite ;
- exclusions, couverture et art anterieur proche restent la question centrale ;
- le dossier n'est pas encore dans une logique depot, nullite, contrefacon ou
  regime logiciel plus specialisee.

## Contrat de sortie V2

La sortie doit produire exactement les neuf blocs suivants, dans cet ordre :

1. `Eligibility Snapshot`
2. `Search Coverage Gate`
3. `Classification and Search Scope`
4. `Closest Prior Art`
5. `NPL and Adjacent Coverage`
6. `Novelty Signals`
7. `Inventive Step Signals`
8. `Next Step Routing`
9. `Human Validation`

### 1. `Eligibility Snapshot`

- type d'invention ;
- exclusions ou fragilites d'eligibilite ;
- points neutres et flags.

### 2. `Search Coverage Gate`

- etat du gate ;
- bases interrogees ;
- limites majeures ;
- effet pratique sur la fiabilite du triage.

### 3. `Classification and Search Scope`

- CIB/CPC retenues ou proposees ;
- mots-cles ou axes couverts ;
- territoires couverts ;
- portee reelle du premier passage.

### 4. `Closest Prior Art`

- documents les plus proches ;
- source et donnees cle ;
- raison du signalement ;
- eventuel signal X/Y/contexte si pertinent.

### 5. `NPL and Adjacent Coverage`

- CIB/CPC voisines proposees ;
- statut de confirmation ;
- NPL couverte ou non ;
- impacts des trous de couverture.

### 6. `Novelty Signals`

- signaux contre ou en faveur de la nouveaute ;
- documents potentiellement destructeurs ;
- caracteristiques apparemment deja connues ou encore distinctes ;
- prudence sur les trous de lecture.

### 7. `Inventive Step Signals`

- closest prior art ;
- caracteristiques distinctives plausibles ;
- effet technique ;
- probleme technique objectif ;
- signaux pour ou contre l'activite inventive.

### 8. `Next Step Routing`

Ce bloc doit utiliser uniquement l'une des valeurs suivantes :

- `prepare-drafting-brief`
- `expand-search-coverage`
- `seek-patentability-review`
- `pivot-to-invalidity-analysis`
- `pivot-to-infringement-chart`
- `route-to-software-regime-review`
- `hold-or-do-not-file`

Associer la valeur choisie a 2-4 actions concretes et a sa justification.

### 9. `Human Validation`

- rappeler qu'il s'agit d'un premier passage ;
- nommer les validations humaines requises ;
- rappeler les points `[a verifier]` avant depot, communication publique ou
  investissement industriel.

## Regles de surete

- Ce skill ne conclut jamais a la brevetabilite.
- Ce skill ne conclut jamais a la FTO.
- Une base non interrogee ou une NPL absente reste une lacune visible.
- `logiciels-pi` doit etre utilise quand le coeur du sujet est le regime
  logiciel plutot que l'art anterieur brevet.
- Les numeros, dates, classifications et statuts doivent rester relies a une
  source ouvrable avant d'etre cites comme appui.

## Rappel final a conserver

- premier passage strict uniquement ;
- jamais opinion de brevetabilite ni FTO ;
- revue humaine obligatoire avant depot, communication publique ou
  industrialisation.
