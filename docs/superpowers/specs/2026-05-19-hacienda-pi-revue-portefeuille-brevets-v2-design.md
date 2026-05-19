# Revue Portefeuille Brevets V2 Design

## Summary

Objectif : faire evoluer `revue-portefeuille-brevets` vers un skill V2 de
**pilotage portefeuille** centre sur :

- `report`
- `audit`
- dashboard HTML
- priorisation annuites / expirations / gaps de registre

Le CRUD du registre `portfolio-brevets.yaml` reste disponible, mais devient
secondaire et explicitement subordonne au role principal du skill : fournir une
lecture operationnelle fiable du portefeuille brevets.

## Problem Statement

Le skill actuel melange deux usages differents :

- un usage **registre** (`add`, `update`, `remove`, `list`) ;
- un usage **portefeuille / gouvernance** (`report`, `audit`, dashboard,
  annuites, cross-check marques, familles, expirations).

Le contenu est riche, mais le skill est encore presente comme un CRUD + audit a
parts egales. Cela dilue sa vraie valeur produit : il est plus utile comme hub
de pilotage que comme editeur YAML.

La V2 doit garder les modes CRUD pour la maintenance du registre, sans laisser
ces modes definir l'identite principale du skill.

## Goals

- Recentrer le skill comme **hub portefeuille brevets**.
- Garder `report` et `audit` comme modes dominants.
- Maintenir `add`, `update`, `remove`, `list` comme modes secondaires.
- Introduire un gate clair de **portfolio readiness** pour `report` / `audit`.
- Stabiliser la sortie V2 des rapports et du dashboard.
- Clarifier les frontieres avec :
  - `preparation-depot-brevet`
  - `strategie-extension-internationale`
  - `analyse-refus-inpi`
  - `anteriorite-invalidite`
  - `tableau-contrefacon-brevet`
  - `audit-pi-ma`

## Non-Goals

- Le skill ne paie pas les annuites.
- Le skill ne renouvelle pas les droits aupres des offices.
- Le skill ne depose pas de nouveaux brevets.
- Le skill ne remplace pas un IPMS complet.
- Le skill ne devient pas un orchestrateur contentieux ou prosecution.

## Recommended Approach

Conserver un seul skill public avec deux couches explicites :

1. **Hub portefeuille principal**
   - `report`
   - `audit`
   - dashboard
   - priorisation
   - findings transverses

2. **Registre secondaire**
   - `add`
   - `update`
   - `remove`
   - `list`

Le skill doit le dire clairement dans son contrat : le portefeuille est la
surface primaire ; le CRUD est une maintenance du registre.

## Alternatives Considered

### 1. Hub portefeuille avec CRUD secondaire

Option recommandee.

Avantages :
- meilleure coherence produit ;
- meilleure lisibilite du skill ;
- aligne le skill avec les autres V2 hubs / orchestrateurs du plugin.

Inconvenient :
- demande de reformuler la doc et le contrat d'entree.

### 2. CRUD + audit a parts egales

Avantage :
- peu de changement editorial.

Inconvenients :
- maintient l'ambiguite actuelle ;
- sous-vend la vraie fonction portefeuille.

### 3. Scinder en deux skills

Un skill CRUD et un skill portefeuille.

Inconvenients :
- trop de fragmentation ;
- casse potentielle des usages existants ;
- complexite inutile a ce stade.

## User-Facing Contract

### Positioning

`revue-portefeuille-brevets` V2 est un skill de **pilotage portefeuille**.

Il sert d'abord a :
- produire un rapport portefeuille ;
- auditer le registre ;
- prioriser les annuites, expirations et gaps ;
- generer un dashboard HTML standardise.

Il sert ensuite, de maniere secondaire, a maintenir le registre
`portfolio-brevets.yaml`.

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

- `annuity_visibility_status`
  - `clear`
  - `partial`
  - `blocked`

- `ownership_visibility_status`
  - `clear`
  - `partial`
  - `blocked`

- `cross_registry_status`
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
- `annuity_entries_present`
- `expiring_assets_present`
- `strategic_levels_present`
- `business_owner_coverage`
- `mandataire_coverage`
- `cross_reference_marques_status`

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
- les annuites sont suffisamment renseignees ;
- les owners / mandataires sont exploitables ;
- le rapport peut prioriser correctement les risques.

### Partial

Utiliser `partial` si :
- le registre existe mais reste incomplet ;
- certaines sections sont auditées avec hypotheses `[a verifier]`.

### Blocked

Utiliser `blocked` si :
- le registre est absent et ne peut pas etre cree proprement ;
- les annuites sont trop lacunaires ;
- les champs critiques rendent toute priorisation peu fiable.

En `blocked`, le skill doit produire un constat de blocage et une suite de
regularisation, pas un faux rapport portefeuille.

## Output Contract For `report`

La sortie `report` doit etre stabilisee en 9 blocs.

### 1. Portfolio Snapshot

- taille du portefeuille ;
- familles ;
- niveaux strategiques ;
- dernier audit ;
- posture maintenance.

### 2. Portfolio Readiness Gate

- `ready` / `partial` / `blocked`
- raison simple ;
- fiabilite generale du registre.

### 3. Annuity Priority

- buckets critiques ;
- annuites proches ;
- actifs a risque.

### 4. Expirations And Lifecycle

- expirations proches ;
- actifs en fin de vie ;
- besoins de succession / continuation.

### 5. Ownership And Coverage

- `business_owner` manquants ;
- mandataires absents ;
- inventeurs / titulaire / coherence registre.

### 6. Cross-Registry Signals

- liens avec portefeuille marques ;
- marques core sans brevet associe ;
- brevets relies a marques non coherentes.

### 7. Critical Gaps

- champs manquants ;
- incoherences ;
- sections `[a verifier]`.

### 8. Decision Routing

Le routing doit rester ferme sur des suites du type :
- `prepare-annuity-escalation`
- `prepare-portfolio-cleanup`
- `prepare-succession-review`
- `prepare-cross-registry-review`
- `hold-for-registry-regularization`

### 9. Human Validation

- paiement / renouvellement hors skill ;
- verification office / partenaire annuites ;
- validation mandataire / business owner / approbateurs.

## Output Contract For `audit`

Le mode `audit` reste plus court, mais doit suivre la meme logique :

- gate ;
- findings critiques ;
- severite ;
- actions de regularisation ;
- validation humaine.

## CRUD Contract

Les modes `add`, `update`, `remove`, `list` restent supportes, mais :

- ils n'ont pas vocation a definir la promesse principale du skill ;
- ils doivent rester structures et bornes ;
- ils ne doivent pas prendre le pas sur `report` / `audit` dans la doc.

## Dashboard Contract

Le dashboard doit continuer a reutiliser le module standard
`renderDashboard`.

Contraintes :
- aucune divergence visuelle locale ;
- aucune logique HTML ad hoc dans le skill ;
- le skill construit les donnees, le core rend le dashboard.

## Boundaries With Neighbor Skills

### `preparation-depot-brevet`

Le skill portefeuille n'ouvre pas un nouveau depot.

### `strategie-extension-internationale`

Le skill portefeuille peut signaler un manque de route d'extension, mais ne
fait pas l'arbitrage territorial detaille.

### `analyse-refus-inpi`

Le skill portefeuille peut signaler un dossier prosecution sensible, mais ne
repond pas a la notification.

### `anteriorite-invalidite`

Le skill portefeuille peut signaler un brevet a risque ou critique, mais ne
construit pas la these de nullite.

### `tableau-contrefacon-brevet`

Le skill portefeuille peut signaler un actif offensif fort, mais ne construit
pas le claim chart.

### `audit-pi-ma`

Le skill portefeuille nourrit la vue M&A, mais ne se substitue pas a
`audit-pi-ma`.

## Error Handling And Guardrails

- Registre interne != registre officiel.
- Toute annuite marquee payee reste interne tant qu'elle n'est pas recoupee.
- Tout champ critique non verifie reste `[a verifier]`.
- Tout profil incomplet reste `[PROVISOIRE]`.
- Le skill doit garder visible que paiement et renouvellement sont hors scope.

## Documentation Impact

La migration V2 devra realigner :

- `plugins/hacienda-propriete-intellectuelle/README.md`
- `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

Le README devra presenter `revue-portefeuille-brevets` comme :
- hub portefeuille ;
- rapport/audit/dashboard d'abord ;
- CRUD ensuite.

## Test Plan

Verifier au moins :

1. `report` avec registre complet
2. `report` partiel avec trous annuites / owners
3. `audit` avec findings critiques
4. `blocked` si registre absent ou trop lacunaire
5. dashboard genere sur seuil volume
6. CRUD toujours fonctionnel sans redefinir le skill

## Success Criteria

La V2 est reussie si :
- `revue-portefeuille-brevets` est percu comme hub portefeuille ;
- `report` / `audit` dominent clairement le contrat ;
- le dashboard reste standardise ;
- le CRUD reste utile mais secondaire ;
- les frontieres avec les autres skills brevets sont plus nettes.
