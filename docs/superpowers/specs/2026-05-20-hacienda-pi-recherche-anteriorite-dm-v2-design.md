# Spec V2 — `recherche-anteriorite-dm`

Date: 2026-05-20
Plugin: `hacienda-propriete-intellectuelle`
Skill cible: `plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-dm/SKILL.md`
Statut: design valide pour passage au plan

## 1. Objectif

Faire passer `recherche-anteriorite-dm` d'un V1 compact a un V2 de
**premier passage strict sur la disponibilite D&M**, avec :

- un contrat d'entree ferme ;
- un `Prior Art Readiness Gate` ;
- un coeur recentre sur nouveaute et caractere individuel avant depot ;
- une sortie stabilisee ;
- une branche secondaire bornee pour la lecture inverse de nullite, sans en
  faire un second coeur du skill.

## 2. Probleme du skill actuel

Le skill actuel est utile, mais il melange :

- recherche avant depot ;
- lecture inverse contre un depot concurrent ;
- registres et divulgations web ;
- rappel des limites `DMCNE` ;
- matrice de risque unique ;
- synthese amont et contentieuse dans un meme flux.

Le probleme n'est pas le fond. Le probleme est l'absence d'un contrat V2
ferme qui distingue clairement :

- le **premier passage disponibilite / nouveaute** ;
- le **signal de nullite inverse** ;
- la **preparation du depot** ;
- le **contentieux D&M**.

## 3. Positionnement V2

`recherche-anteriorite-dm` V2 devient le skill de :

1. recherche d'anteriorites avant depot D&M ;
2. evaluation de la nouveaute et du caractere individuel ;
3. cadrage de la couverture de recherche par registres et sources ouvertes ;
4. synthese prudente du risque de disponibilite ;
5. signalement borne des limites structurelles, notamment `DMCNE` et
   divulgations non indexees ;
6. routage ferme vers la brique amont ou aval adaptee.

Le skill ne doit pas :

- garantir la validite d'un futur depot ;
- remplacer `depot-dessin-modele` ;
- remplacer `contrefacon-dessin-modele` ;
- devenir un memo autonome de nullite contentieuse ;
- produire une pseudo-certitude sur les `DMCNE` ou les divulgations
  informelles.

## 4. Approches ecartees

### Option A — Disponibilite pure sans lecture inverse

Ne traiter que la recherche avant depot.

Probleme :
- trop rigide ;
- ne couvre pas les cas frequents de lecture inverse contre un depot tiers ;
- oblige a dupliquer un minimum d'analyse ailleurs.

### Option B — Double coeur depot + nullite

Mettre la recherche avant depot et la nullite inverse au meme niveau.

Probleme :
- brouille l'identite du skill ;
- overlap direct avec `contrefacon-dessin-modele` ;
- degrade la clarte du routage.

### Option C — Recommandee

Garder la **disponibilite avant depot** comme coeur, avec une branche
secondaire bornee `reverse-nullity-signal` pour les cas ou un design propre
ou une divulgation anterieure peut fragiliser un depot concurrent.

## 5. Architecture fonctionnelle retenue

### 5.1 Coeur du skill

Le coeur V2 traite :

- le design cible ;
- la classe ou sous-classe Locarno ;
- les territoires vises ;
- la date de priorite ou de depot cible ;
- les sources interrogees ;
- les anterorites pertinentes ;
- l'impression globale ;
- la liberte du createur dans le secteur ;
- la synthese de risque disponibilite.

### 5.2 Branche secondaire `reverse-nullity-signal`

Le skill garde une branche secondaire bornee quand :

- un concurrent a deja depose ;
- le demandeur dispose d'un design ou d'une divulgation anterieure ;
- la question minimale est de savoir si une anteriorite destructrice est
  plausible.

Cette branche ne remplace pas l'analyse contentieuse ou contradictoire
complete. Elle sert uniquement a :

- signaler une base de nullite potentielle ;
- cadrer les preuves a securiser ;
- router vers `contrefacon-dessin-modele` si le dossier devient litigieux.

## 6. Contrat d'entree V2

Le skill doit expliciter ou deriver :

- `research_mode` :
  - `filing-clearance`
  - `reverse-nullity-signal`
- `territory_scope` :
  - `fr`
  - `eu`
  - `international`
  - `mixed`
- `design_visibility_status` :
  - `new`
  - `possibly-disclosed`
  - `already-disclosed`
  - `uncertain`
- `locarno_status` :
  - `clear`
  - `mixed`
  - `uncertain`
- `search_coverage_target` :
  - `registers-minimum`
  - `registers-plus-open-web`
  - `enhanced-sector-scan`
- `evidence_posture` :
  - `strong`
  - `mixed`
  - `weak`
  - `blocked`

### Faits minimums

Le skill doit refuser une conclusion forte si manquent :

- description du design vise ;
- visuels ou equivalent exploitable ;
- produit ou secteur ;
- classe Locarno ou hypothese raisonnable ;
- territoire vise ;
- date de depot, priorite ou reference temporelle pertinente ;
- contexte `filing-clearance` ou `reverse-nullity-signal`.

## 7. Gate central

Le skill ajoute un `Prior Art Readiness Gate` :

- `ready`
- `partial`
- `blocked`

### `ready`

Le dossier permet une recherche exploitable et une synthese de risque
raisonnable.

### `partial`

Le dossier permet une recherche utile, mais avec fragilites :

- Locarno incertain ;
- visuels incomplets ;
- territoire mal borne ;
- divulgation createur a clarifier ;
- couverture web ou sectorielle inegale.

La sortie garde alors :

- `[PROVISOIRE]`
- `[a verifier]`
- `[A COMPLETER]`

### `blocked`

Le skill doit bloquer si :

- design trop mal defini ;
- absence de visuels ou de description exploitable ;
- reference temporelle introuvable ;
- impossibilite de determiner au moins une hypothese Locarno ;
- demande trop speculative pour produire une synthese honnete.

## 8. Frontieres obligatoires

### Route to `depot-dessin-modele`

Si la vraie question dominante devient la preparation du depot enregistre,
les reproductions, la priorite, l'ajournement ou le choix de lane.

### Route to `contrefacon-dessin-modele`

Si la vraie question dominante devient l'analyse contradictoire d'un titre,
de l'impression globale adverse, des actes argués ou d'une strategie de
nullite / defense structuree.

### Stay in `recherche-anteriorite-dm`

Si la demande porte bien sur un premier passage de disponibilite, meme avec
des incertitudes sur la nouveaute ou une lecture inverse encore exploratoire.

## 9. Sortie V2

La sortie doit etre stabilisee en 9 blocs :

1. `Case Snapshot`
2. `Prior Art Readiness Gate`
3. `Search Scope And Sources`
4. `Closest Prior Art Findings`
5. `Novelty Risk`
6. `Individual Character Risk`
7. `Coverage Limits And Unknowns`
8. `Decision Routing`
9. `Human Validation`

## 10. Contenu attendu par axe

### 10.1 Search Scope And Sources

Le skill doit dire clairement :

- quels registres ont ete interroges ;
- quelles sources web ou sectorielles ont ete completees ;
- ce qui n'a pas pu etre couvert ;
- pourquoi la couverture est suffisante ou non pour une conclusion prudente.

### 10.2 Closest Prior Art Findings

Pour chaque anteriorite significative, le skill doit rendre lisible :

- la source ;
- la date ;
- la classe ou secteur ;
- la pertinence ;
- l'impression globale ;
- le niveau de proximite.

### 10.3 Novelty Risk

Le skill doit distinguer clairement :

- absence d'anteriorite destructrice visible ;
- anteriorite proche mais non identique ;
- anteriorite quasi identique ou a details insignifiants.

### 10.4 Individual Character Risk

Le skill doit expliciter :

- l'utilisateur averti ;
- la liberte du createur ;
- les similitudes dominantes ;
- les differences notables ;
- le risque que l'impression globale ne soit pas suffisamment differente.

### 10.5 Coverage Limits And Unknowns

Le skill doit toujours rappeler :

- `DMCNE` non repertories de maniere exhaustive ;
- divulgations salons, catalogues, reseaux sociaux, marketplaces ;
- limites de la recherche visuelle ;
- limites liees a la terminologie ou a la classification.

## 11. Routing ferme

`Decision Routing` doit rester borne a :

- `prepare-filing`
- `prepare-filing-with-caution`
- `hold-for-design-adjustment`
- `hold-for-expanded-search`
- `signal-reverse-nullity-posture`
- `route-to-design-infringement-analysis`
- `hold-insufficient-basis`

## 12. Impacts documentaires

### 12.1 Skill cible

Refondre `plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-dm/SKILL.md`
pour :

- expliciter le positionnement V2 ;
- fermer l'intake ;
- ajouter le `Prior Art Readiness Gate` ;
- stabiliser la sortie ;
- borner la branche `reverse-nullity-signal` ;
- clarifier les frontieres avec depot et contrefacon D&M.

### 12.2 Reference dediee

Ajouter :

- `plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-dm/references/recherche-anteriorite-dm-routing-and-output.md`

Cette reference doit resumer :

- intake V2 ;
- gate ;
- logique de couverture ;
- matrice de risque ;
- routing final.

### 12.3 README / changelog

Mettre a jour :

- `plugins/hacienda-propriete-intellectuelle/README.md`
- `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

pour refleter :

- le recentrage sur la disponibilite avant depot ;
- la branche secondaire de nullite inverse ;
- les nouvelles frontieres avec `depot-dessin-modele` et
  `contrefacon-dessin-modele`.

## 13. Verification attendue

Avant integration :

- `npm test`
- `npm run typecheck`
- `npm run build`
- `npm run branding:check`
- `git diff --check`

Apres commit / merge :

- `npx gitnexus analyze`

