---
name: depot-marque-fr
version: "2.0.0"
description: >
  Préparation stricte d'un dépôt de marque V2 pour structurer un dossier FR,
  UE ou Madrid avant revue humaine. Ce skill ne dépose pas et ne remplace
  jamais la recherche amont ni la validation par mandataire ou avocat.
argument-hint: "[signe | produits/services | FR/EU/Madrid]"
authors: ["Hacienda"]
tags: [marques, depot, INPI, classes-Nice, L711-2]
---

# Skill - Dépôt marque FR V2

> **Préparation de dépôt, pas dépôt ni opinion de disponibilité.**
> `depot-marque-fr` intervient uniquement quand le dossier a déjà franchi un
> premier passage de recherche exploitable et qu'il faut préparer le paquet de
> dépôt. Il ne remplace ni `recherche-anteriorite-marque`, ni une vérification
> professionnelle, ni le dépôt formel par mandataire ou avocat.

Référence de travail utile :
`references/depot-marque-fr-routing-and-output.md`

## Examples

<example>
<user>/h-pi:depot-marque-fr [signe | produits/services | FR/EU/Madrid]</user>
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
- Marques, BOPI et EUIPO : `inpi_search_marques`, `inpi_marque_details`, `inpi_marques_publications_recentes`, `euipo_tmview_search`, `bopi_dernieres_publications`.
- Anno, quand disponible, reste une source interne de dossier : jamais un registre officiel INPI, EUIPO, OEB, OMPI ou BOPI.

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/` ou `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`.

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

## Positionnement

`depot-marque-fr` reste la brique de préparation de dépôt de la voie marques :

1. recherche amont exploitable ;
2. choix de voie de dépôt ;
3. préparation du paquet signe / classes / libellés / déposant / priorité ;
4. validation humaine avant dépôt formel.

Le skill est strictement borné à la préparation de dépôt :

- il ne conclut jamais qu'une marque est disponible ;
- il ne traite pas la surveillance post-publication ;
- il ne traite pas une opposition déjà née ;
- il ne fait pas revivre `clearance-marque` comme flux de travail autonome.

## Ce skill ne fait pas

- Ne dépose pas la marque.
- Ne paye pas les taxes.
- Ne rend pas une opinion finale de disponibilité.
- Ne remplace pas un mandataire en marques ou un avocat.
- Ne fait pas la surveillance post-dépôt.
- Ne traite pas une opposition ou une défense d'opposition.

## Contrat d'entrée V2

Le skill doit expliciter ou deriver les dimensions suivantes :

- `filing_lane`: `fr-national`, `eu-eutm`, `madrid-international`, `undecided`
- `search_status`: `usable-first-pass`, `partial`, `not-run`, `conflicts-flagged`
- `readiness_status`: `ready`, `needs-clarification`, `blocked`
- `mark_format`: `word`, `figurative`, `composite`, `other`, `unknown`
- `priority_status`: `none`, `possible-claim`, `claimed`, `unclear`

Bloc de faits à exposer explicitement :

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

- le rôle utilisateur ;
- les territoires de pratique habituels ;
- le mandataire ou l'avocat de référence si connu ;
- les hypothèses de prudence si le profil est incomplet.

Si le profil contient `[A CONFIGURER]`, le dire explicitement et tagger la
sortie `[PROVISOIRE]`.

## Cadrage initial

Demander en un seul batch, puis mapper la réponse au contrat V2 :

1. signe exact, stylisation éventuelle et type apparent ;
2. produits ou services réels, avec usage concret visé ;
3. classes Nice déjà identifiées ou à proposer ;
4. voie de dépôt visée : FR, EU, Madrid, ou indécis ;
5. déposant exact et statut de mandataire ;
6. priorité revendiquée ou marque de base déjà disponible ;
7. référence de la recherche amont ou limites connues.

Guidance de mapping minimale :

- FR seul -> `filing_lane: fr-national`
- EUTM -> `filing_lane: eu-eutm`
- Madrid -> `filing_lane: madrid-international`
- voie encore ouverte -> `filing_lane: undecided`
- recherche amont exploitable -> `search_status: usable-first-pass`
- recherche partielle -> `search_status: partial`
- pas de recherche -> `search_status: not-run`
- conflits déjà remontés -> `search_status: conflicts-flagged`

Si les produits ou services restent vagues, pousser une fois pour obtenir une
description concrète. Si l'information reste floue, marquer
`readiness_status: needs-clarification`.

## Seuil de préparation du dépôt

Avant toute recommandation de dépôt, vérifier explicitement :

1. recherche amont disponible et exploitable ;
2. motifs absolus au moins passés en revue au niveau préparation ;
3. produits ou services assez concrets pour rédiger les libellés ;
4. déposant identifiable ;
5. prérequis de voie satisfaits ;
6. trous critiques visibilisés.

Le seuil ne peut sortir que sur trois états :

- `ready`
- `needs-clarification`
- `blocked`

Déclencheurs usuels de blocage :

- `search_status: not-run`
- conflits majeurs déjà signalés sans arbitrage humain ;
- voie Madrid sans base FR ou EU exploitable ;
- description trop vague pour rédiger les libellés ;
- déposant ou priorité non identifiables.

## Absolute Grounds Reminder

Ce skill ne remplace pas `recherche-anteriorite-marque`, mais il doit vérifier
que les motifs absolus n'ont pas été ignorés au moment de préparer le dépôt.

Passer au minimum en revue :

- distinctivite insuffisante ;
- descriptif ;
- devenu usuel ;
- forme imposée si pertinent ;
- ordre public ou signe protégé ;
- caractère trompeur.

Si un point est douteux, le faire remonter comme risque de dépôt, pas comme
verdict final.

## FR / EU / Madrid voies

### `fr-national`

Utiliser cette voie quand :

- la cible est d'abord française ;
- le budget et la portée restent nationaux ;
- aucun besoin immédiat de couverture UE entière n'est établi.

Points de préparation dominants :

- adéquation signe / classes / libellés FR ;
- déposant et adresse exploitables ;
- priorité éventuelle ;
- articulation avec une extension ultérieure à 6 mois si pertinente.

### `eu-eutm`

Utiliser cette voie quand :

- la cible commerciale est UE large ;
- une couverture unitaire EUTM est recherchée ;
- le dossier justifie une exposition plus large qu'un FR seul.

Points de préparation dominants :

- cohérence des produits/services à l'échelle UE ;
- risque plus large de conflit ou d'attaque centralisee ;
- statut du représentant si le déposant n'est pas résident UE ;
- intérêt d'un FR d'abord vs EUTM direct.

### `madrid-international`

Utiliser cette voie quand :

- le besoin principal est une désignation internationale ciblee ;
- les pays visés sont identifiés ;
- une base FR ou EU existe déjà ou doit être posee d'abord.

Points de préparation dominants :

- existence et statut de la marque de base ;
- liste des pays designes ;
- dépendance à la base ;
- route de préparation si la base n'existe pas encore.

## Limites de routage

### Router vers `recherche-anteriorite-marque`

- pas de recherche amont exploitable ;
- couverture de recherche partielle ou trop faible ;
- conflit ou doute de disponibilité à requalifier avant dépôt ;
- motifs absolus encore trop incertains au premier passage.

### Router vers `surveillance-marque`

- la marque est déjà déposée ou doit surtout être suivie après dépôt ;
- le besoin principal = monitorage des publications ou watchlist ;
- le travail de préparation de dépôt est secondaire ou déjà fait.

### Router vers `analyse-opposition-marque`

- une opposition, menace d'opposition ou conflit contradictoire concret existe ;
- le sujet principal n'est plus la préparation de dépôt mais la réponse
  procédurale ou l'analyse de droits/grounds ;
- une limitation ou un changement de libellés dépend d'une analyse d'opposition.

### Router vers `clearance-marque`

- uniquement si un ancien flux de travail heritage l'appelle encore ;
- à présenter comme alias de compatibilité ;
- rerouter vers `recherche-anteriorite-marque`, jamais comme voie autonome.

### Rester dans `depot-marque-fr`

- recherche amont exploitable déjà disponible ;
- besoin principal = préparer le dossier de dépôt ;
- choix de voie, libellés, déposant, priorité et formalités restent la
  question centrale.

## Contrat de sortie V2

La sortie doit produire exactement les neuf blocs suivants, dans cet ordre :

1. `Filing Cadrage initial Snapshot`
2. `Seuil de préparation du dépôt`
3. `Absolute Grounds Reminder`
4. `Search Baseline and Dependencies`
5. `Choix de voie`
6. `Goods and Services Draft`
7. `Applicant Priority and Formalities`
8. `Routage de prochaine étape`
9. `Validation humaine`

### 1. `Filing Cadrage initial Snapshot`

- signe ;
- type de marque ;
- classes et produits/services resumes ;
- voie envisagée ;
- déposant ;
- priorité/base si applicable.

### 2. `Seuil de préparation du dépôt`

- état `ready`, `needs-clarification` ou `blocked` ;
- raisons du seuil ;
- bloqueurs ou clarifications concrètes.

### 3. `Absolute Grounds Reminder`

- motifs absolus regardes ;
- flags ou points neutres ;
- limites du contrôle à ce stade.

### 4. `Search Baseline and Dependencies`

- référence du premier passage ;
- ce que la recherche couvrait ;
- lacunes restantes ;
- dépendances avant dépôt ou avant voie internationale.

### 5. Choix de voie

- voie retenue ;
- pourquoi ;
- alternatives ecartees ;
- prérequis specifiques FR / EU / Madrid.

### 6. `Goods and Services Draft`

- classes retenues ;
- propositions de libellés ;
- points à restreindre, élargir ou confirmer ;
- adéquation avec l'usage réel.

### 7. `Applicant Priority and Formalities`

- déposant ;
- mandataire ou avocat ;
- priorité revendiquée ou non ;
- base FR/EU si Madrid ;
- points de formulaire ou pièces à réunir.

### 8. `Routage de prochaine étape`

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

Associer la valeur choisie à 2-4 actions concrètes et à sa justification.

### 9. `Validation humaine`

- rappeler que ce skill prépare mais ne dépose pas ;
- nommer les validations humaines requises ;
- rappeler les points `[à vérifier]` avant dépôt.

## Règles de sûreté

- Ce skill ne rend jamais un dépôt "prêt juridiquement" sans validation
  humaine.
- Une recherche absente ou partielle reste un bloqueur visible.
- Madrid sans base FR ou EU doit rester bloqué ou reroute.
- `clearance-marque` ne doit jamais revenir comme voie normale.
- Les libellés restent des propositions à valider, pas une rédaction finale.

## Niveaux de criticité

Échelle canonique appliquée à l'appréciation de la qualité d'un dossier pré-dépôt FR/EU/Madrid (motifs absolus L.711-2 self-checked, classes Nice cohérentes, libellé précis, titularité claire) :

| Niveau | Icône | Signification dans le contexte de ce skill |
|---|---|---|
| Faible | 🟢 | Dossier prêt : signe arbitraire ou fantaisiste, classes resserrées et précises selon Nice, libellé conforme aux directives INPI/EUIPO, titulaire qualifié, recherche d'antériorités amont sans hit bloquant. Dépôt à fort taux d'enregistrement direct. |
| Moyen | 🟡 | Dossier exploitable mais perfectible : un ou deux libellés trop larges à resserrer, classe additionnelle d'opportunité à arbitrer, distinctivité moyenne (signe évocateur acceptable mais examinateur-dépendant). Dépôt possible avec ajustements. |
| Élevé | 🟠 | Dossier fragile : signe à risque (suggestif fort, partiellement descriptif), libellés probablement objectés par l'examinateur, classes mal alignées sur l'usage réel, ou base FR/EU manquante pour Madrid. Refus partiel probable. Re-travailler avant dépôt. |
| Bloquant | 🔴 | Dépôt à proscrire en l'état : signe descriptif, déceptif ou non distinctif manifeste (motif absolu L.711-2 patent), signe contenant un emblème protégé (art. 6ter CUP), ou conflit d'antériorité identique signalé en amont. Refus quasi certain et coût taxes perdu. Reprendre le signe ou abandonner. |

Plancher cross-skill (CLAUDE.md §4) : ce skill ne peut pas dégrader silencieusement une cote 🔴 amont (par ex. d'une `recherche-anteriorite-marque` ou d'un audit de motifs absolus antérieur) vers 🟡 ou inférieur sans déclaration explicite.

## Rappel final à conserver

- préparation stricte de dépôt uniquement ;
- jamais une opinion de disponibilité ;
- validation humaine obligatoire avant tout dépôt FR, EU ou Madrid.
