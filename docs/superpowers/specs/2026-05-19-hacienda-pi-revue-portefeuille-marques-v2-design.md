# Revue Portefeuille Marques V2 Design

## Summary

Objectif : faire evoluer `revue-portefeuille-marques` vers un skill V2 de
**pilotage portefeuille** centre sur :

- `report`
- `audit`
- dashboard HTML
- priorisation echeances / renouvellements / gaps de registre

Le CRUD du registre `portfolio.yaml` reste disponible, mais devient secondaire
et explicitement subordonne au role principal du skill : fournir une lecture
operationnelle fiable du portefeuille marques.

## Problem Statement

Le skill actuel melange deux usages differents :

- un usage **registre** (`add`, `update`, `remove`, `list`) ;
- un usage **portefeuille / gouvernance** (`report`, `audit`, dashboard,
  renouvellements, cross-watchlist, gaps de surveillance).

Le contenu est deja utile, mais le skill reste percu comme un CRUD + audit a
parts egales. Cela dilue sa vraie valeur produit : il est plus utile comme hub
de pilotage que comme simple editeur YAML.

La V2 doit garder les modes CRUD pour la maintenance du registre, sans laisser
ces modes definir l'identite principale du skill.

## Goals

- Recentrer le skill comme **hub portefeuille marques**.
- Garder `report` et `audit` comme modes dominants.
- Maintenir `add`, `update`, `remove`, `list` comme modes secondaires.
- Introduire un gate clair de **portfolio readiness** pour `report` / `audit`.
- Stabiliser la sortie V2 des rapports et du dashboard.
- Clarifier les frontieres avec :
  - `recherche-anteriorite-marque`
  - `depot-marque-fr`
  - `surveillance-marque`
  - `analyse-opposition-marque`
  - `audit-pi-ma`
  - `portefeuille-pi`

## Non-Goals

- Le skill ne renouvelle pas les marques aupres des offices.
- Le skill ne paie pas les taxes de renouvellement.
- Le skill ne depose pas de nouvelle marque.
- Le skill ne remplace pas un IPMS ou un docketing professionnel.
- Le skill ne devient pas un orchestrateur opposition / contentieux.

## Recommended Approach

Conserver un seul skill public avec deux couches explicites :

1. **Hub portefeuille principal**
   - `report`
   - `audit`
   - dashboard
   - priorisation echeances et surveillance
   - findings transverses

2. **Registre secondaire**
   - `add`
   - `update`
   - `remove`
   - `list`

Le skill doit le dire clairement : le portefeuille est la surface primaire ;
le CRUD est une maintenance du registre.

## Alternatives Considered

### 1. Hub portefeuille avec CRUD secondaire

Option recommandee.

Avantages :
- meilleure coherence produit ;
- meilleure lisibilite du skill ;
- aligne le skill avec `revue-portefeuille-brevets` V2.

Inconvenient :
- demande de reformuler la doc et le contrat d'entree.

### 2. CRUD + audit a parts egales

Avantage :
- changement editorial minimal.

Inconvenients :
- maintient l'ambiguite actuelle ;
- sous-vend la fonction portefeuille ;
- eloigne la lane marques de la lane brevets.

### 3. Scinder en deux skills

Un skill CRUD et un skill portefeuille.

Inconvenients :
- trop de fragmentation ;
- casse potentielle des usages existants ;
- complexite inutile a ce stade.

## User-Facing Contract

### Positioning

`revue-portefeuille-marques` V2 est un skill de **pilotage portefeuille**.

Il sert d'abord a :
- produire un rapport portefeuille ;
- auditer le registre ;
- prioriser les renouvellements et regularisations ;
- verifier les gaps de surveillance ;
- generer un dashboard HTML standardise.

Il sert ensuite, de maniere secondaire, a maintenir le registre
`portfolio.yaml`.

### Modes

Modes principaux :
- `report`
- `audit`

Modes secondaires :
- `add`
- `update`
- `remove`
- `list`

### Intake Contract For `report` / `audit`

Le skill doit expliciter ou deriver :

- `portfolio_source_status`
  - `present`
  - `missing`
  - `partial`

- `renewal_visibility_status`
  - `clear`
  - `partial`
  - `blocked`

- `ownership_visibility_status`
  - `clear`
  - `partial`
  - `blocked`

- `watchlist_status`
  - `available`
  - `missing`
  - `partial`

- `dashboard_mode`
  - `markdown-only`
  - `markdown-plus-dashboard`
  - `dashboard-required`

- `portfolio_readiness`
  - `ready`
  - `partial`
  - `blocked`

### Minimal Fact Set

- `portfolio_path`
- `asset_count`
- `last_audit`
- `renewal_entries_present`
- `territory_entries_present`
- `strategic_levels_present`
- `business_owner_coverage`
- `mandataire_coverage`
- `watchlist_cross_reference_status`

## Portfolio Readiness Gate

Le skill doit introduire un `Portfolio Readiness Gate` pour `report` et
`audit`.

Statuts :
- `ready`
- `partial`
- `blocked`

### Ready

Utiliser `ready` si :
- le registre existe ;
- les echeances de renouvellement sont suffisamment renseignees ;
- les owners / mandataires sont exploitables ;
- le rapport peut prioriser correctement les risques.

### Partial

Utiliser `partial` si :
- le registre existe mais reste incomplet ;
- certaines sections sont auditees avec hypotheses `[a verifier]`.

### Blocked

Utiliser `blocked` si :
- le registre est absent et ne peut pas etre cree proprement ;
- les dates de renouvellement sont trop lacunaires ;
- les champs critiques rendent toute priorisation peu fiable.

En `blocked`, le skill doit produire un constat de blocage et une suite de
regularisation, pas un faux rapport portefeuille.

## Output Contract For `report`

La sortie `report` doit etre stabilisee en 9 blocs.

### 1. Portfolio Snapshot

- taille du portefeuille ;
- nombre de territoires ;
- niveaux strategiques ;
- dernier audit ;
- posture enforcement / maintenance.

### 2. Portfolio Readiness Gate

- `ready` / `partial` / `blocked`
- raison simple ;
- fiabilite generale du registre.

### 3. Renewal Priority

- buckets critiques ;
- echeances proches ;
- actifs a risque.

### 4. Coverage And Territories

- coherence des territoires ;
- actifs sans couverture claire ;
- trous de perimetre FR / EU / OMPI.

### 5. Ownership And Coverage

- `business_owner` manquants ;
- mandataires absents ;
- titulaire / coherence registre.

### 6. Watchlist Signals

- marques surveillees vs non surveillees ;
- marques `core` non watchlist ;
- desalignement portefeuille / surveillance.

### 7. Critical Gaps

- champs manquants ;
- incoherences ;
- sections `[a verifier]`.

### 8. Decision Routing

Contrainte a un vocabulaire ferme :

- `prepare-renewal-escalation`
- `prepare-watchlist-regularization`
- `prepare-portfolio-cleanup`
- `prepare-territory-review`
- `hold-for-registry-regularization`

### 9. Human Validation

- validation mandataire / avocat ;
- verification source officielle avant action ;
- approbateurs si decision de non-renouvellement.

## Output Contract For `audit`

L'audit doit etre recentre sur la sante portefeuille :

1. `Portfolio Readiness Gate`
2. `Critical Findings`
3. `Severity`
4. `Regularization Actions`
5. `Human Validation`

## Dashboard Contract

Le dashboard reste permis, mais :

- ne remplace pas le Markdown ;
- reutilise strictement `renderDashboard` ;
- reste coherent avec les 9 blocs du rapport ;
- ne doit pas creer un second contrat de sortie parallele.

## Boundary Rules

- `recherche-anteriorite-marque` : premier passage recherche, pas hub
  portefeuille
- `depot-marque-fr` : preparation de depot
- `surveillance-marque` : monitoring et priorisation publication / watchlist
- `analyse-opposition-marque` : opposition INPI
- `audit-pi-ma` : lecture transactionnelle M&A
- `portefeuille-pi` : hub consolide multi-actifs

## Compatibility

Compatibilite a preserver :

- nom du skill `revue-portefeuille-marques`
- modes existants `report`, `add`, `update`, `remove`, `list`, `audit`
- registre user-stable `portfolio.yaml`
- dashboard HTML standard existant

Tolerance au changement :

- reformulation profonde du positionnement
- reorganisation du contrat d'entree
- stabilisation du rapport et de l'audit
- clarification des frontieres vers les autres skills marques

## Documentation Impact

Mettre a jour :

- `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-marques/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-marques/references/...`
- `plugins/hacienda-propriete-intellectuelle/README.md`
- `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

## Risks

- creer un doublon partiel avec `surveillance-marque` si le role watchlist
  n'est pas borne ;
- affaiblir les guardrails officiels si le registre interne est presente comme
  plus fiable qu'il ne l'est ;
- laisser le dashboard deriver d'un contrat Markdown non stabilise.

## Recommendation

Migrer `revue-portefeuille-marques` exactement dans le meme esprit que
`revue-portefeuille-brevets` :

- hub portefeuille d'abord ;
- CRUD secondaire ;
- gate explicite ;
- sortie `report` fermee ;
- audit recentre ;
- dashboard comme vue secondaire, pas comme identite primaire.
