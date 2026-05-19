# Strategie Extension Internationale V2 Design

## Summary

Objectif : faire evoluer `strategie-extension-internationale` vers un skill V2
centre sur la **decision territoriale et le sequencement d'extension** d'une
famille brevet, sans le transformer en orchestrateur global de prosecution ou
de portefeuille.

Le skill doit aider a arbitrer entre :
- `stay-fr-only`
- `EP`
- `PCT`
- `sequenced`

en tenant compte prioritairement :
- de la fenetre de priorite,
- des marches cibles,
- de la base FR disponible,
- de la posture budget,
- de la posture maintenance.

Les couts, annuites et contraintes de traduction restent dans le skill, mais
comme **contraintes de decision** et non comme finalite autonome.

## Problem Statement

Le skill actuel est riche sur le fond mais reste un monolithe ancien format :
- il melange l'intake, le calcul de priorite, la comparaison des voies,
  les couts indicatifs, les recommandations par profil et les checklists
  de passage mandataire ;
- il ne force pas un contrat d'entree V2 ferme ;
- il ne borne pas assez clairement le routage final ;
- il risque de chevaucher `preparation-depot-brevet` sur la partie
  preparation du dossier, alors que son role doit rester la **decision de
  route territoriale**.

La V2 doit conserver le niveau d'information utile, mais avec une structure
plus stable, plus lisible et plus coherente avec les autres skills brevets
deja migrés.

## Goals

- Recentrer le skill sur la **strategie d'extension territoriale**.
- Fermer le contrat d'entree autour d'un petit nombre de statuts explicites.
- Introduire un `Extension Readiness Gate`.
- Normaliser la sortie en 9 blocs stables.
- Garder les couts et annuites comme facteurs de pression economique.
- Rendre explicites les frontieres avec les skills brevets voisins.
- Produire un `Decision Routing` ferme.

## Non-Goals

- Le skill ne prepare pas le dossier technique de depot.
- Le skill ne depose pas une demande EP ou PCT.
- Le skill ne devient pas un outil de gestion de portefeuille global.
- Le skill ne remplace pas l'analyse de brevetabilite, de validite ou
  d'office action.
- Le skill ne fournit pas un budget d'entreprise complet ni un business plan.

## Recommended Approach

Conserver **un seul skill public** et le structurer comme un skill V2 de
**strategie territoriale / sequencement**, avec :

- un intake borne ;
- un gate initial ;
- une comparaison standardisee des routes ;
- une recommandation principale ;
- des voies de repli bornees.

Cette approche preserve la valeur pratique du skill tout en evitant un overlap
avec :
- `recherche-anteriorite-brevet`,
- `preparation-depot-brevet`,
- `analyse-refus-inpi`,
- `revue-portefeuille-brevets`.

## Alternatives Considered

### 1. Strategie territoriale stricte avec couts secondaires

Option recommandee.

Le skill tranche d'abord la voie territoriale et le sequencement. Les couts et
annuites servent a tester la soutenabilite de la voie choisie.

Avantages :
- frontiere nette ;
- sortie plus lisible ;
- meilleure coherence avec les autres skills V2.

Inconvenient :
- ne couvre pas toute la profondeur d'un arbitrage portefeuille multi-familles.

### 2. Strategie territoriale et budget au meme niveau

Le skill donnerait autant de poids a la logique budgetaire qu'a la logique de
route territoriale.

Avantage :
- plus proche d'une note comex / CFO.

Inconvenients :
- derive rapidement vers un outil de portefeuille ;
- augmente le chevauchement avec `revue-portefeuille-brevets`.

### 3. Orchestrateur global brevet international

Le skill piloterait extension, depot, refus, portefeuille et annuites.

Inconvenients :
- scope trop large ;
- forte duplication avec les autres skills ;
- risque de brouiller les responsabilites.

## User-Facing Contract

### Positioning

`strategie-extension-internationale` V2 est un skill de **decision
territoriale et de sequencement**. Il aide a choisir :
- rester en FR seul ;
- preparer une voie EP ;
- preparer une voie PCT ;
- preparer une voie sequencee.

Il ne depose rien. Il ne remplace pas le mandataire. Il ne redige pas le
dossier technique de depot.

### Intake Contract

Le skill doit reformuler ou inferrer les champs suivants :

- `priority_window_status`
  - `open-safe`
  - `open-tight`
  - `expired`
  - `unknown`

- `territory_posture`
  - `fr-only`
  - `eu-focused`
  - `global-flex`
  - `named-countries`

- `market_profile`
  - `local`
  - `regional`
  - `transatlantic`
  - `global`
  - `unclear`

- `budget_posture`
  - `tight`
  - `moderate`
  - `broad`
  - `unknown`

- `maintenance_posture`
  - `systematic`
  - `selective`
  - `defensive`
  - `unknown`

- `filing_baseline_status`
  - `confirmed-fr-base`
  - `partial-fr-base`
  - `unclear-fr-base`

Le skill peut demander les faits sous-jacents librement, mais l'analyse doit
toujours converger vers ce schema ferme.

## Extension Readiness Gate

Le skill doit introduire un `Extension Readiness Gate` au debut du raisonnement.

Statuts :
- `ready`
- `partial`
- `blocked`

### Ready

Utiliser `ready` si :
- la date de depot / priorite est connue ;
- la base FR est suffisamment claire ;
- les marches cibles sont exploitables ;
- le budget est connu ou assez borne pour orienter la recommandation.

### Partial

Utiliser `partial` si :
- un ou deux elements sont incomplets ;
- une recommandation provisoire reste possible ;
- l'analyse doit signaler explicitement les hypothese `[a verifier]`.

### Blocked

Utiliser `blocked` si :
- la fenetre de priorite est inconnue ou inexploitable ;
- la base FR est trop incertaine ;
- les marches cibles sont trop flous ;
- le budget est absent alors qu'il conditionne directement le choix de route.

En `blocked`, le skill ne doit pas sur-conclure. Il doit router vers une
clarification ou une escalation mandataire.

## Output Contract

La sortie V2 doit etre stabilisee en 9 blocs.

### 1. Case Snapshot

Doit resumer :
- reference FR ;
- date de depot / priorite ;
- statut de base ;
- marche vise ;
- posture budget ;
- posture maintenance.

### 2. Priority Window and Baseline

Doit expliquer :
- la fenetre de priorite ;
- le niveau d'urgence ;
- la qualite de la base FR ;
- les consequences d'un depassement ou d'une incertitude.

### 3. Target Market Posture

Doit qualifier :
- les zones visees ;
- l'intensite de besoin de couverture ;
- l'horizon commercial ;
- les incoherences eventuelles entre ambition geographique et budget.

### 4. Route Comparison

Doit comparer au minimum :
- `FR only`
- `EP`
- `PCT`
- `sequenced`

avec, pour chaque voie :
- pertinence dans le cas ;
- flexibilite ;
- complexite ;
- exposition cout / annuites ;
- contrainte de calendrier.

### 5. Cost and Maintenance Pressure

Doit traiter :
- cout initial relatif ;
- cout de maintien relatif ;
- pression d'annuites ;
- soutenabilite de la voie au regard de la posture maintenance.

Ce bloc reste un facteur de decision, pas une sortie portefeuille complete.

### 6. Primary Recommendation

Doit conclure clairement sur une voie principale, par exemple :
- `stay-fr-only`
- `prepare-ep-route`
- `prepare-pct-route`
- `prepare-sequenced-route`

avec une justification factuelle courte.

### 7. Fallback Paths

Doit proposer des alternatives bornees si :
- le budget se resserre ;
- la priorite se tend ;
- les marches changent ;
- la base FR doit etre consolidee.

### 8. Decision Routing

Le routing doit etre ferme sur :
- `stay-fr-only`
- `prepare-ep-route`
- `prepare-pct-route`
- `prepare-sequenced-route`
- `hold-for-market-clarification`
- `hold-for-budget-clarification`
- `hold-priority-risk`

Le skill ne doit pas emettre d'autres issues implicites.

### 9. Human Validation

Doit rappeler :
- les points a faire valider par le mandataire ;
- les chiffres `[a verifier]` ;
- les decisions non automatisables ;
- les limites de la recommandation.

## Boundaries With Neighbor Skills

### `recherche-anteriorite-brevet`

Reste le skill de premier passage sur la recherche d'anteriorites.
`strategie-extension-internationale` ne doit pas requalifier la brevetabilite.

### `preparation-depot-brevet`

Reste le skill de preparation stricte du dossier technique et du `drafting
brief`.
`strategie-extension-internationale` choisit la route ; il ne prepare pas les
pieces de depot.

### `analyse-refus-inpi`

Reste le skill de reponse a notification `INPI` / `OEB`.
`strategie-extension-internationale` ne traite pas un office action.

### `anteriorite-invalidite`

Reste le skill de validite offensive / defensive.
`strategie-extension-internationale` ne construit pas une these de nullite.

### `revue-portefeuille-brevets`

Reste le skill de vision portefeuille et de gouvernance multi-actifs.
`strategie-extension-internationale` raisonne sur une decision d'extension,
pas sur toute la politique de portefeuille.

## Error Handling And Guardrails

- Si la fenetre de priorite est inconnue, le skill doit passer au minimum en
  `partial`, voire `blocked`.
- Si la priorite est tres courte, le skill doit privilegier l'alerte et le
  routage mandataire plutot qu'une longue dissertation.
- Si le budget est `unknown`, la recommandation doit etre marquee
  `[PROVISOIRE]` ou `[a verifier]`.
- Les chiffres de taxes et d'annuites non verifies dans l'instant doivent
  rester explicites comme indicatifs.
- Le skill doit continuer de charger :
  - `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
  - `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`
- Si le profil est absent ou incomplet, l'analyse doit utiliser des defaults
  conservateurs et l'indiquer explicitement.

## Documentation Impact

La migration V2 devra realigner :
- `plugins/hacienda-propriete-intellectuelle/README.md`
- `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

Le README devra decrire le skill comme :
- une decision de route territoriale ;
- non un outil de depot ;
- non un orchestrateur portefeuille.

## Test Plan

Verifier au moins les scenarios suivants :

1. **FR only coherent**
   - marche local
   - budget `tight`
   - priorite ouverte
   - route finale `stay-fr-only`

2. **EP coherent**
   - marche EU
   - budget `moderate`
   - base FR claire
   - route finale `prepare-ep-route`

3. **PCT coherent**
   - marche global / transatlantique
   - budget `broad`
   - priorite ouverte
   - route finale `prepare-pct-route`

4. **Sequenced coherent**
   - besoin de flexibilite
   - priorite `open-safe`
   - besoin de sequencement sans risque prioritaire immediat
   - route finale `prepare-sequenced-route`

5. **Priority risk hold**
   - priorite `open-tight` ou `expired`
   - route finale `hold-priority-risk`

6. **Budget clarification hold**
   - marche ambitieux
   - budget `unknown`
   - route finale `hold-for-budget-clarification`

7. **Market clarification hold**
   - marches trop flous
   - route finale `hold-for-market-clarification`

## Implementation Notes

- Le skill doit rester un seul point d'entree public.
- Un aide-memoire dedie de routing / output V2 sera utile, sur le modele des
  autres skills migrés.
- La V2 doit conserver le garde-fou fort sur :
  - absence de depot effectif ;
  - validation mandataire ;
  - risque de perte de priorite.

## Success Criteria

La V2 est reussie si :
- le skill produit une recommandation territoriale plus nette ;
- les sorties sont structurees de maniere stable ;
- le routage est ferme ;
- les frontieres avec les autres skills brevets sont lisibles ;
- le skill n'empiète pas sur `preparation-depot-brevet` ;
- README et changelog racontent correctement le nouveau positionnement.
