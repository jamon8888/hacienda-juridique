# Hacienda Propriete Intellectuelle

`hacienda-propriete-intellectuelle` est le plugin PI de la marketplace Hacienda : marques, portefeuille, clauses PI, open source, logiciel, preuves de creation, contrefacon, mises en demeure et strategie de defense.

Les sorties du plugin restent des brouillons de travail pour avocat ou juriste.
Selon le workflow, elles peuvent inclure sources officielles ou `[a verifier]`,
note de revue, arbre de decision, validation humaine et, si necessaire,
dossier de preuve.

## Ce Que Couvre Le Plugin

Le plugin PI couvre aujourd'hui :

- marques : recherche d'anteriorite premier passage, surveillance BOPI,
  depot, opposition, portefeuille, routage clearance et contentieux ;
- brevets : recherche d'anteriorite, preparation depot, reponse a
  notification INPI/OEB, extension internationale, nullite, portefeuille et
  claim chart ;
- dessins et modeles : recherche d'anteriorite, depot et contrefacon ;
- droit d'auteur et logiciel : qualification, cession, licence, bases de
  donnees, open source et enforcement ;
- contrats PI, audit PI M&A, saisie-contrefacon et contentieux PI ;
- droits voisins, OGC et enjeux IA generative.

## Premier Lancement

```text
/hacienda-propriete-intellectuelle:entretien-demarrage
```

## Packaging Du Plugin

Le plugin PI est livre comme un bundle plugin MCP :

- `.claude-plugin/plugin.json` : manifest du plugin ;
- `.mcp.json` : declaration MCP executable du serveur PI local ;
- `version.json` : source unique de version du plugin ;
- `CLAUDE.md` : template versionne du profil pratique ;
- `skills/`, `agents/`, `hooks/` : surfaces fonctionnelles du plugin.

Le profil utilisateur reste stocke hors du depot, dans :

```text
~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md
```

## Sources Prioritaires

- INPI, EUIPO, WIPO, EPO ;
- Code de la propriete intellectuelle et Legifrance ;
- registres domaines, depots, portefeuilles ;
- SBOM, notices OSS, contrats et licences ;
- preuves de creation, captures et correspondances.

## Configuration Des Sources PI

Le plugin PI lit ses credentials de source via `~/.config/Hacienda/credentials.json`,
avec priorite a l'environnement du processus MCP si les variables sont deja presentes.

| Source | Tools principaux | Credentials requis | Variables |
| --- | --- | --- | --- |
| INPI Data marques | `inpi_search_marques`, `inpi_marque_details`, `inpi_marques_publications_recentes` | oui | `INPI_DATA_LOGIN`, `INPI_DATA_PASSWORD` |
| BOPI | `bopi_dernieres_publications` | non pour le cache local | aucune |
| EUIPO TMview | `euipo_tmview_search` | oui | `EUIPO_API_KEY` |
| INPI brevets | `inpi_search_brevets`, `inpi_brevet_details` | oui | `INPI_DATA_LOGIN`, `INPI_DATA_PASSWORD` |
| OEB Espacenet | `espacenet_search`, `espacenet_brevet_details` | oui | `OEB_CONSUMER_KEY`, `OEB_CONSUMER_SECRET` |

Configuration recommandee :

```text
~/.config/Hacienda/credentials.json
```

```json
{
  "INPI_DATA_LOGIN": "<login-inpi>",
  "INPI_DATA_PASSWORD": "<password-inpi>",
  "EUIPO_API_KEY": "<euipo-api-key>",
  "OEB_CONSUMER_KEY": "<oeb-consumer-key>",
  "OEB_CONSUMER_SECRET": "<oeb-consumer-secret>"
}
```

Override ponctuel PowerShell :

```powershell
$env:INPI_DATA_LOGIN = "<login-inpi>"
$env:INPI_DATA_PASSWORD = "<password-inpi>"
$env:EUIPO_API_KEY = "<euipo-api-key>"
$env:OEB_CONSUMER_KEY = "<oeb-consumer-key>"
$env:OEB_CONSUMER_SECRET = "<oeb-consumer-secret>"
```

Validation rapide :

```text
inpi_search_marques q="apexleaf"
inpi_marque_details numero="FR1234567"
euipo_tmview_search q="apexleaf"
inpi_search_brevets q="graphene"
espacenet_search q="graphene"
```

Comportement sans credentials :

- les tools INPI retournent `INPI not configured` ;
- `euipo_tmview_search` retourne `EUIPO not configured` ;
- les tools OEB retournent `OEB not configured` ;
- `bopi_dernieres_publications` depend d'un cache local et ne remplace pas une
  verification live de registre.

Les secrets PI ne doivent pas etre commites. Sur `main`, les tools PI Hacienda
lisent `credentials.json` et retombent sur l'environnement si celui-ci est deja
configure.

## Skills

### Skills actuellement mis en avant

- Selection de skills deja positionnes dans le plugin.
- Cette liste n'est pas une vue exhaustive de toutes les capabilities non-legacy.

- `entretien-demarrage`
- `recherche-anteriorite-marque` : premier passage strict de recherche de
  marque, structure autour des motifs absolus, de la couverture de recherche,
  du balayage de famille adjacente et du routage vers clearance
  professionnelle, depot, surveillance ou analyse d'opposition
- `depot-marque-fr` : skill V2 strict de preparation au depot, separe du
  premier passage de recherche, de l'opposition et de la surveillance,
  structure par lanes FR / EU / Madrid avec readiness gate avant tout depot
  effectif
- `surveillance-marque` : skill V2 strict de monitoring et de priorisation,
  distinct du premier passage de recherche, de la substance de l'opposition et
  de l'enforcement, avec modes clarifies et monitoring gate avant toute
  escalation
- `revue-portefeuille-marques` : hub portefeuille marques V2, centre sur
  `report` et `audit`, avec `Portfolio Readiness Gate`, priorisation des
  renouvellements, dashboard HTML optionnel et CRUD maintenu comme maintenance
  secondaire du registre interne
- `analyse-opposition-marque` : skill d'opposition INPI strict, structure
  autour du gate procedurale, de la cartographie droits / motifs et d'une
  branche coexistence / transaction bornee avant toute escalade hors cadre
- `recherche-anteriorite-brevet` : premier passage brevet V2 strict, distinct
  de la redaction / preparation de depot, de la revue d'invalidite et du
  tableau de comparaison contrefacon, avec search coverage gate avant toute
  suite
- `preparation-depot-brevet` : skill V2 de preparation stricte au depot,
  distinct du premier passage d'anteriorite, de la revue d'invalidite et du
  claim chart contrefacon, avec Filing Readiness Gate et lanes FR / EP / PCT /
  sequenced
- `strategie-extension-internationale` : skill V2 territorial et de
  sequencement, distinct du brief de depot, de l'invalidite adverse et du
  claim chart, centre sur un `Extension Readiness Gate` et un routing ferme
  entre voies FR / EP / PCT / `sequenced` ou holds de clarification, y
  compris `hold-priority-risk`, sans devenir un orchestrateur de portefeuille
- `revue-portefeuille-brevets` : hub portefeuille brevets V2, centre sur
  `report` et `audit`, avec `Portfolio Readiness Gate`, priorisation des
  annuites et expirations, dashboard HTML optionnel et CRUD maintenu comme
  maintenance secondaire du registre interne
- `analyse-refus-inpi` : skill V2 bi-office `INPI` / `OEB` de reponse a
  notification, centre sur l'analyse argumentaire, distinct de la recherche
  amont, du depot, de la strategie internationale et de l'invalidite adverse,
  avec `Response Readiness Gate` avant toute suite
- `tableau-contrefacon-brevet` : skill V2 de claim chart brevet offensif
  strict, distinct de la defense / invalidite, structure autour d'un Chart
  Readiness Gate et raccorde a `mise-en-demeure-pi`, `saisie-contrefacon` et
  `contentieux-pi`
- `anteriorite-invalidite` : skill V2 de validite stricte du brevet adverse,
  bi-mode `attack` / `defense`, distinct du claim chart, de la preparation de
  depot et de la recherche amont, structure autour d'un `Invalidity Readiness Gate`
- `recherche-anteriorite-dm`
- `depot-dessin-modele`
- `contrefacon-dessin-modele`
- `contrats-pi` : contrats PI complets structures par famille
  (`patent-tech-transfer`, `nda-secret-knowhow`, `rnd-collaboration`,
  `trademark-coexistence-franchise`, `mta-life-sciences`), distincts de
  `revue-clause-pi`
- `audit-pi-ma` : orchestrateur de due diligence PI M&A, avec modes
  `buyer-dd`, `seller-clean-room`, `red-flag` et `deal-summary`, s'appuyant
  sur les skills specialises du plugin
- `qualification-oeuvre` : qualification droit d'auteur V2 structuree autour
  de l'originalite, de la titularite initiale, des consequences en droits et
  du routage vers preuve, cession, licence ou contrefacon
- `logiciels-pi` : regime logiciel V2 structure autour de `L.113-9`, des
  droits d'utilisation, du triage OSS de haut niveau et du routage vers
  OSS, chaine de droits, cession, licence ou enforcement
- `saisie-contrefacon`
- `contentieux-pi` : strategie judiciaire PI, structuree par `contentious_track`
  et `procedure_stage`, distincte du triage, de la lettre et de la collecte
  probatoire
- `certificat-complementaire-protection`
- `droits-voisins-ogc`

### Skills legacy en migration

Ces skills restent visibles soit comme nouvelles briques structurees, soit
comme points d'entree maintenus pour compatibilite.

| Skill | Statut | Cible |
| --- | --- | --- |
| `depot-preuve-creation` | V1 structure | brique probatoire canonique |
| `tri-contrefacon` | V1 structure | intake enforcement marques |
| `mise-en-demeure-pi` | V1 structure | moteur de lettre PI |
| `revue-open-source` | V1 structure | audit OSS operationnel |
| `revue-logiciel-donnees` | V1 recentre | chaine de droits logiciel/data |
| `portefeuille-pi` | V1 lecture seule | hub federé marques + brevets |
| `revue-clause-pi` | V1 structure | revue ciblee des clauses PI |
| `strategie-defense-pi` | orchestrateur leger | cadrage et routage defense |
| `clearance-marque` | compatibilite historique | alias + sunset |

Lecture de cette table :

- `V1 structure` : skill remis au format structure, avec contrat d'entree et
  sortie stable ;
- `V1 recentre` : skill recadre sur un perimetre specialise ;
- `V1 lecture seule` : hub de consolidation sans maintenance de registre ;
- `orchestrateur leger` : couche de cadrage et de routage, sans remplacer les
  skills d'execution ;
- `compatibilite historique` : point d'entree conserve pour rediriger les
  anciens usages.

Positionnement marque V2 a retenir :

- `recherche-anteriorite-marque` n'est pas une clearance juridique finale ;
- le skill fait un premier passage structure sur signes, classes,
  couverture de recherche et motifs absolus ;
- il impose un balayage de famille adjacente quand le signe ou le portefeuille
  le justifie ;
- il route ensuite vers une clearance professionnelle, un depot,
  une surveillance ou `analyse-opposition-marque` selon le niveau de risque et
  l'objectif.
- `depot-marque-fr` est une brique stricte de preparation au depot, pas un
  moteur de recherche premier passage, pas un skill d'opposition et pas un
  workflow de surveillance ;
- le skill organise la preparation par lanes FR / EU / Madrid et verifie un
  readiness gate avant toute recommandation de depot effectif ;
- `surveillance-marque` est une brique stricte de monitoring et de
  priorisation, pas un premier passage de recherche, pas une analyse
  substantielle d'opposition et pas un workflow d'enforcement ;
- le skill clarifie ses modes de surveillance et applique un monitoring gate
  avant toute recommandation d'escalade vers l'opposition ou d'autres suites ;
- `analyse-opposition-marque` intervient uniquement sur une opposition INPI
  recevable ou imminente, avec controle du gate procedurale avant toute
  analyse au fond ;
- le skill cartographie les droits invoques, les motifs mobilisables et leur
  articulation procedurale avant de recommander la suite ;
- la coexistence ou la transaction y reste une branche bornee, utile seulement
  si elle soutient la posture INPI sans remplacer l'analyse d'opposition.

Positionnement brevet V2 a retenir :

- `recherche-anteriorite-brevet` est un premier passage strict de recherche
  brevet, pas une brique de redaction ou de preparation de depot ;
- le skill reste distinct de `anteriorite-invalidite` pour la revue
  d'invalidite et de `tableau-contrefacon-brevet` pour la comparaison
  contrefacon ;
- il expose un search coverage gate avant toute recommandation de suite,
  afin de distinguer clairement ce qui a ete cherche, ce qui manque encore et
  quand une revue humaine ou un skill voisin doit prendre le relais ;
- `preparation-depot-brevet` est une brique de preparation stricte au depot,
  pas un depot final, pas un premier passage de recherche, pas une revue
  d'invalidite et pas un workflow de comparaison contrefacon ;
- le skill applique un Filing Readiness Gate explicite (`ready`, `partial`,
  `blocked`) avant toute recommandation de suite ;
- il structure la preparation autour de lanes `FR`, `EP`, `PCT` et
  `sequenced`, avec une branche de priorite / sequencement bornee sans
  absorber `strategie-extension-internationale` ;
- `strategie-extension-internationale` est la brique territoriale et de
  sequencement, pas un orchestrateur de portefeuille ;
- le skill cadre FR / EP / PCT / `sequenced`, applique un
  `Extension Readiness Gate` explicite (`ready`, `partial`, `blocked`) et
  retourne une seule issue fermee, soit une voie territoriale (`stay-fr-only`,
  `prepare-ep-route`, `prepare-pct-route`, `prepare-sequenced-route`) soit un
  hold de clarification ou de risque priorite, selon marche, budget et
  priorite ;
- `analyse-refus-inpi` est un skill V2 bi-office `INPI` / `OEB` de reponse a
  notification, pas une reponse officielle deposee, pas un premier passage
  prior art amont, pas une preparation de depot et pas une revue
  d'invalidite du brevet adverse ;
- le skill reste centre sur l'analyse de la notification, la cartographie
  citations / objections, la faisabilite d'amendement, la strategie
  argumentative et une decision procedurale immediate bornee ;
- il applique un `Response Readiness Gate` explicite (`ready`, `partial`,
  `blocked`) selon l'etat de la notification consultee, du delai, des
  revendications objectees, des citations connues et de la base reelle pour
  amender ou argumenter ;
- la sortie V2 est stabilisee autour d'un `Case Snapshot`, d'une posture
  office / delai, d'une cartographie objections / citations, de la
  faisabilite d'amendement, d'une strategie d'argumentation, des risques de
  priorite / ajout de matiere, des gaps critiques, d'un `Decision Routing` et
  d'une validation humaine finale ;
- il reste distinct de `recherche-anteriorite-brevet`,
  `preparation-depot-brevet`, `strategie-extension-internationale` et
  `anteriorite-invalidite`, avec reroutage vers ces briques quand le besoin
  principal sort de la reponse a notification ;
- `tableau-contrefacon-brevet` est un skill offensif strict de claim chart,
  pas une qualification juridique finale, pas une defense contre une allegation
  adverse et pas une revue d'invalidite du brevet ;
- le skill applique un `Chart Readiness Gate` explicite (`ready`, `partial`,
  `blocked`) selon la qualite du brevet, du mapping et de la preuve produit ;
- il reste focalise sur la confrontation technique litterale / equivalence,
  puis route vers `mise-en-demeure-pi`, `saisie-contrefacon` ou
  `contentieux-pi` selon la base enforcement disponible ;
- `anteriorite-invalidite` reste centre sur la validite du brevet adverse,
  en bi-mode `attack` / `defense`, pas sur la confrontation produit /
  revendications ;
- le skill applique un `Invalidity Readiness Gate` explicite (`ready`,
  `partial`, `blocked`) selon la qualite de l'art anterieur, des dates et des
  moyens de nullite ;
- le claim chart offensif reste du ressort de `tableau-contrefacon-brevet`,
  le premier passage prior art amont reste du ressort de
  `recherche-anteriorite-brevet`, et la preparation de notre propre depot
  reste du ressort de `preparation-depot-brevet` ;
- le pilotage judiciaire global reste du ressort de `contentieux-pi` ;

## Agents

- `veilleur-renouvellements-pi` : surveille echeances portefeuille.
- `veilleur-marques` : surveille marques et oppositions.
- `surveillant-oss` : surveille licences et dependances.
- `veilleur-contrefacon` : surveille signaux d'atteinte.
- `contrefacon-web` : surveillance contrefaçon en ligne (marketplaces, réseaux sociaux, web).

## Tools MCP

Le serveur MCP du plugin PI s'appuie sur le socle `@hacienda/core`, mais
declare maintenant un perimetre MCP PI explicite. Il expose :

- recherche et consultation Legifrance, JORF, KALI, jurisprudence et EUR-Lex,
  utiles au travail PI ;
- `inpi_search_marques` ;
- `inpi_marque_details` ;
- `euipo_tmview_search` ;
- `bopi_dernieres_publications` ;
- `inpi_marques_publications_recentes` ;
- `inpi_search_brevets` ;
- `inpi_brevet_details` ;
- `espacenet_search` ;
- `espacenet_brevet_details`.

Il n'expose pas dans le plugin PI les tools d'administration bas niveau ou les
sources hors perimetre PI direct comme `legifrance_api_call`,
`piste_cache_clear`, `bofip_*` ou `boss_*`. Ces outils restent du ressort du
plugin `hacienda-sources-officielles`.

Ces tools servent a alimenter les analyses PI, mais ne remplacent jamais la
relecture humaine ni les formalites officielles de depot ou de contentieux.

Le serveur local est declare dans `.mcp.json` comme un `stdio` executable
pointant vers `plugins/hacienda-propriete-intellectuelle/mcp-server/dist/index.js`.

## Livrables

- dossier de preuve ;
- note de clearance ;
- revue de clauses ;
- rapport OSS ;
- vue portefeuille consolidee ;
- tableau ou dashboard HTML quand le workflow s'y prete ;
- projet de mise en demeure ;
- Note de revue.

## Positionnement

Le plugin PI n'est pas un robot de depot. Il aide a :

- cadrer les faits et les titres ;
- rechercher les sources et registres utiles ;
- preparer un dossier de travail coherent ;
- produire une analyse relisible et un arbre de decision ;
- conserver la validation humaine au bon endroit.

## Mode Silencieux

Le Mode silencieux limite les alertes au portefeuille, aux renouvellements, aux risques OSS et aux signaux d'atteinte au-dessus des seuils. Il ne remplace pas la validation humaine.

## Version Courante

- V0.18.2 : migration de `revue-portefeuille-marques` vers un hub
  portefeuille V2, centre sur `report` et `audit`, avec
  `Portfolio Readiness Gate`, sortie `report` stabilisee et dashboard HTML
  maintenu comme vue secondaire ;
- V0.18.1 : migration de `revue-portefeuille-brevets` vers un hub
  portefeuille V2, centre sur `report` et `audit`, avec
  `Portfolio Readiness Gate`, sortie `report` stabilisee et dashboard HTML
  maintenu comme vue secondaire ;
- V0.18 : migration de `strategie-extension-internationale` vers un skill V2
  territorial et de sequencement, avec `Extension Readiness Gate`, contrat
  d'entree ferme, routing ferme et reference dediee ;
- V0.17 : alignement packaging du plugin et runtime MCP, avec `.mcp.json`
  executable, `version.json` et version unifiee sur les surfaces visibles ;
- serveur MCP PI scope explicitement sur la recherche juridique utile et les
  registres PI, sans reexposer les tools fiscaux, sociaux ou admin bas niveau ;
- README, changelog et fichiers livres realignes avec le runtime reel du
  plugin.

Jalons documentes :

- voir [CHANGELOG.md](C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/CHANGELOG.md) pour l'historique de versions documentees et leur perimetre ;
- le README reste centre sur l'etat courant du plugin et la cartographie des skills.
