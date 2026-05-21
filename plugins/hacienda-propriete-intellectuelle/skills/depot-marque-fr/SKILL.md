---
name: depot-marque-fr
version: "2.0.0"
description: >
  Preparation stricte d'un depot de marque V2 pour structurer un dossier FR,
  EU ou Madrid avant revue humaine. Ce skill ne depose pas et ne remplace
  jamais la recherche amont ni la validation par mandataire ou avocat.
argument-hint: "[signe | produits/services | FR/EU/Madrid]"
---

# Skill - Depot marque FR V2

> **Preparation de depot, pas depot ni opinion de disponibilite.**
> `depot-marque-fr` intervient uniquement quand le dossier a deja franchi un
> premier passage de recherche exploitable et qu'il faut preparer le paquet de
> depot. Il ne remplace ni `recherche-anteriorite-marque`, ni une clearance
> professionnelle, ni le depot formel par mandataire ou avocat.

Reference de travail utile :
`references/depot-marque-fr-routing-and-output.md`

## Positionnement

`depot-marque-fr` reste la brique de preparation de depot de la lane marques :

1. recherche amont exploitable ;
2. choix de lane de depot ;
3. preparation du paquet signe / classes / libelles / deposant / priorite ;
4. validation humaine avant depot formel.

Le skill est strictement borne a la preparation de depot :

- il ne conclut jamais qu'une marque est disponible ;
- il ne traite pas la surveillance post-publication ;
- il ne traite pas une opposition deja nee ;
- il ne fait pas revivre `clearance-marque` comme workflow autonome.

## Ce skill ne fait pas

- Ne depose pas la marque.
- Ne paye pas les taxes.
- Ne rend pas une opinion finale de disponibilite.
- Ne remplace pas un mandataire en marques ou un avocat.
- Ne fait pas la surveillance post-depot.
- Ne traite pas une opposition ou une defense d'opposition.

## Contrat d'entree V2

Le skill doit expliciter ou deriver les dimensions suivantes :

- `filing_lane`: `fr-national`, `eu-eutm`, `madrid-international`, `undecided`
- `search_status`: `usable-first-pass`, `partial`, `not-run`, `conflicts-flagged`
- `readiness_status`: `ready`, `needs-clarification`, `blocked`
- `mark_format`: `word`, `figurative`, `composite`, `other`, `unknown`
- `priority_status`: `none`, `possible-claim`, `claimed`, `unclear`

Bloc de faits a exposer explicitement :

- `proposed_sign`
- `goods_services_scope`
- `nice_classes`
- `target_territories`
- `applicant_identity`
- `mandate_status`
- `priority_or_base_mark`
- `search_report_reference`

## Chargement du profil pratique

Avant tout, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Rattacher ensuite :

- le role utilisateur ;
- les territoires de pratique habituels ;
- le mandataire ou l'avocat de reference si connu ;
- les hypotheses de prudence si le profil est incomplet.

Si le profil contient `[A CONFIGURER]`, le dire explicitement et tagger la
sortie `[PROVISOIRE]`.

## Intake

Demander en un seul batch, puis mapper la reponse au contrat V2 :

1. signe exact, stylisation eventuelle et type apparent ;
2. produits ou services reels, avec usage concret vise ;
3. classes Nice deja identifiees ou a proposer ;
4. lane de depot visee : FR, EU, Madrid, ou indecis ;
5. deposant exact et statut de mandataire ;
6. priorite revendiquee ou marque de base deja disponible ;
7. reference de la recherche amont ou limites connues.

Guidance de mapping minimale :

- FR seul -> `filing_lane: fr-national`
- EUTM -> `filing_lane: eu-eutm`
- Madrid -> `filing_lane: madrid-international`
- lane encore ouverte -> `filing_lane: undecided`
- recherche amont exploitable -> `search_status: usable-first-pass`
- recherche partielle -> `search_status: partial`
- pas de recherche -> `search_status: not-run`
- conflits deja remontes -> `search_status: conflicts-flagged`

Si les produits ou services restent vagues, pousser une fois pour obtenir une
description concrete. Si l'information reste floue, marquer
`readiness_status: needs-clarification`.

## Filing Readiness Gate

Avant toute recommandation de depot, verifier explicitement :

1. recherche amont disponible et exploitable ;
2. motifs absolus au moins passes en revue au niveau preparation ;
3. produits ou services assez concrets pour rediger les libelles ;
4. deposant identifiable ;
5. prerequis de lane satisfaits ;
6. trous critiques visibilises.

Le gate ne peut sortir que sur trois etats :

- `ready`
- `needs-clarification`
- `blocked`

Declencheurs usuels de blocage :

- `search_status: not-run`
- conflits majeurs deja signales sans arbitrage humain ;
- lane Madrid sans base FR ou EU exploitable ;
- description trop vague pour rediger les libelles ;
- deposant ou priorite non identifiables.

## Absolute Grounds Reminder

Ce skill ne remplace pas `recherche-anteriorite-marque`, mais il doit verifier
que les motifs absolus n'ont pas ete ignores au moment de preparer le depot.

Passer au minimum en revue :

- distinctivite insuffisante ;
- descriptif ;
- devenu usuel ;
- forme imposee si pertinent ;
- ordre public ou signe protege ;
- caractere trompeur.

Si un point est douteux, le faire remonter comme risque de depot, pas comme
verdict final.

## FR / EU / Madrid lanes

### `fr-national`

Utiliser cette lane quand :

- la cible est d'abord francaise ;
- le budget et la portee restent nationaux ;
- aucun besoin immediat de couverture UE entiere n'est etabli.

Points de preparation dominants :

- adequation signe / classes / libelles FR ;
- deposant et adresse exploitables ;
- priorite eventuelle ;
- articulation avec une extension ulterieure a 6 mois si pertinente.

### `eu-eutm`

Utiliser cette lane quand :

- la cible commerciale est UE large ;
- une couverture unitaire EUTM est recherchee ;
- le dossier justifie une exposition plus large qu'un FR seul.

Points de preparation dominants :

- coherence des produits/services a l'echelle UE ;
- risque plus large de conflit ou d'attaque centralisee ;
- statut du representant si le deposant n'est pas resident UE ;
- interet d'un FR d'abord vs EUTM direct.

### `madrid-international`

Utiliser cette lane quand :

- le besoin principal est une designation internationale ciblee ;
- les pays vises sont identifies ;
- une base FR ou EU existe deja ou doit etre posee d'abord.

Points de preparation dominants :

- existence et statut de la marque de base ;
- liste des pays designes ;
- dependance a la base ;
- route de preparation si la base n'existe pas encore.

## Routing Boundaries

### Route to `recherche-anteriorite-marque`

- pas de recherche amont exploitable ;
- couverture de recherche partielle ou trop faible ;
- conflit ou doute de disponibilite a requalifier avant depot ;
- motifs absolus encore trop incertains au premier passage.

### Route to `surveillance-marque`

- la marque est deja deposee ou doit surtout etre suivie apres depot ;
- le besoin principal = monitorage des publications ou watchlist ;
- le travail de preparation de depot est secondaire ou deja fait.

### Route to `analyse-opposition-marque`

- une opposition, menace d'opposition ou conflit contradictoire concret existe ;
- le sujet principal n'est plus la preparation de depot mais la reponse
  procedurale ou l'analyse de droits/grounds ;
- une limitation ou un changement de libelles depend d'une analyse d'opposition.

### Route to `clearance-marque`

- uniquement si un ancien workflow heritage l'appelle encore ;
- a presenter comme alias de compatibilite ;
- rerouter vers `recherche-anteriorite-marque`, jamais comme lane autonome.

### Stay in `depot-marque-fr`

- recherche amont exploitable deja disponible ;
- besoin principal = preparer le dossier de depot ;
- choix de lane, libelles, deposant, priorite et formalites restent la
  question centrale.

## Contrat de sortie V2

La sortie doit produire exactement les neuf blocs suivants, dans cet ordre :

1. `Filing Intake Snapshot`
2. `Filing Readiness Gate`
3. `Absolute Grounds Reminder`
4. `Search Baseline and Dependencies`
5. `Lane Selection`
6. `Goods and Services Draft`
7. `Applicant Priority and Formalities`
8. `Next Step Routing`
9. `Human Validation`

### 1. `Filing Intake Snapshot`

- signe ;
- type de marque ;
- classes et produits/services resumes ;
- lane envisagee ;
- deposant ;
- priorite/base si applicable.

### 2. `Filing Readiness Gate`

- etat `ready`, `needs-clarification` ou `blocked` ;
- raisons du gate ;
- bloqueurs ou clarifications concretes.

### 3. `Absolute Grounds Reminder`

- motifs absolus regardes ;
- flags ou points neutres ;
- limites du controle a ce stade.

### 4. `Search Baseline and Dependencies`

- reference du premier passage ;
- ce que la recherche couvrait ;
- lacunes restantes ;
- dependances avant depot ou avant lane internationale.

### 5. `Lane Selection`

- lane retenue ;
- pourquoi ;
- alternatives ecartees ;
- prerequis specifiques FR / EU / Madrid.

### 6. `Goods and Services Draft`

- classes retenues ;
- propositions de libelles ;
- points a restreindre, elargir ou confirmer ;
- adequation avec l'usage reel.

### 7. `Applicant Priority and Formalities`

- deposant ;
- mandataire ou avocat ;
- priorite revendiquee ou non ;
- base FR/EU si Madrid ;
- points de formulaire ou pieces a reunir.

### 8. `Next Step Routing`

Ce bloc doit utiliser uniquement l'une des valeurs suivantes :

- `prepare-fr-filing-pack`
- `prepare-eu-filing-pack`
- `prepare-madrid-filing-pack`
- `prepare-base-before-madrid`
- `return-to-first-pass-search`
- `seek-professional-clearance`
- `set-up-post-filing-monitoring`
- `prepare-opposition-position`
- `hold-or-rename`

Associer la valeur choisie a 2-4 actions concretes et a sa justification.

### 9. `Human Validation`

- rappeler que ce skill prepare mais ne depose pas ;
- nommer les validations humaines requises ;
- rappeler les points `[a verifier]` avant depot.

## Regles de surete

- Ce skill ne rend jamais un depot "pret juridiquement" sans validation
  humaine.
- Une recherche absente ou partielle reste un bloqueur visible.
- Madrid sans base FR ou EU doit rester bloque ou reroute.
- `clearance-marque` ne doit jamais revenir comme voie normale.
- Les libelles restent des propositions a valider, pas une redaction finale.

## Rappel final a conserver

- preparation stricte de depot uniquement ;
- jamais une opinion de disponibilite ;
- validation humaine obligatoire avant tout depot FR, EU ou Madrid.
