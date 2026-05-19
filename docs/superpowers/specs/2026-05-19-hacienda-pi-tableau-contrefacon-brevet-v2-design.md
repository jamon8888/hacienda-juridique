---
title: Hacienda PI - tableau-contrefacon-brevet V2
date: 2026-05-19
status: proposed
owners:
  - hacienda-propriete-intellectuelle
summary: >
  Recentrer tableau-contrefacon-brevet comme skill V2 offensif strict de claim
  chart brevet, avec Chart Readiness Gate, mapping litteral / equivalence et
  routing ferme vers mise en demeure, saisie ou contentieux.
---

# Contexte

`tableau-contrefacon-brevet` est deja un skill riche sur le fond. Il couvre le
claim chart, la theorie d'equivalence et les interfaces avec mise en demeure,
saisie-contrefacon et contentieux PI.

Le probleme n'est pas le niveau de substance. Le probleme est surtout
structurel :

- gros monolithe lineaire ;
- scope encore trop melange entre confrontation technique et suites
  precontentieuses / judiciaires ;
- contrat d'entree implicite ;
- sortie tres riche mais pas encore stabilisee en blocs V2 ;
- frontiere a clarifier avec `anteriorite-invalidite` pour la defense ou
  l'attaque du brevet lui-meme.

# Probleme

Le skill doit servir de brique offensive claire dans la lane brevets :

1. lire un brevet et un produit/procede cible ;
2. cartographier element par element ;
3. distinguer litteralite, equivalence et inconnus ;
4. dire si la base technique est exploitable ;
5. router vers la bonne suite enforcement.

Aujourd'hui, la logique metier existe, mais la forme reste trop proche d'un
memo ancien format. Le V2 doit la rendre plus fermee, plus lisible et plus
coherente avec les autres skills V2 du plugin.

# Decision de scope

`tableau-contrefacon-brevet` V2 sera **strictement offensif**.

Il ne doit pas absorber :

- la defense contre un claim chart adverse ;
- la nullite / invalidite du brevet oppose ;
- la strategie judiciaire generale.

Ces sujets restent du ressort de :

- `anteriorite-invalidite`
- `contentieux-pi`

# Objectifs

## Objectifs principaux

1. Recentrer `tableau-contrefacon-brevet` comme skill V2 de **claim chart
   offensif strict**.
2. Introduire un **Chart Readiness Gate** explicite.
3. Fermer le contrat d'entree autour de la theorie invoquee, du scope des
   revendications et de la couverture de preuve.
4. Stabiliser la sortie en blocs V2 reutilisables.
5. Clarifier les routes vers `mise-en-demeure-pi`, `saisie-contrefacon` et
   `contentieux-pi`.

## Non-objectifs

Le skill V2 ne doit pas :

- conclure juridiquement a la contrefacon ;
- produire une defense contre une allegation adverse ;
- attaquer la validite du brevet en profondeur ;
- rediger la mise en demeure ;
- preparer la requete de saisie complete ;
- devenir le chef d'orchestre du contentieux entier.

# Utilisateurs cibles

- avocat PI ;
- mandataire brevets ;
- equipe contentieux PI ;
- juriste IP interne preparant un dossier pour revue externe ;
- equipe enforcement technique en amont de la decision d'action.

# Principes de design

1. **Confrontation technique seulement.** Le skill reste un outil de
   confrontation, pas de qualification.
2. **Offensive only.** On compare pour preparer une action, pas pour organiser
   une defense.
3. **Evidence-first.** Sans preuve produit suffisante, le skill doit le dire et
   baisser la confiance.
4. **Element-by-element.** Le coeur du skill reste la lecture rigoureuse des
   revendications et leur confrontation.
5. **Validation humaine obligatoire.** Les suites externes restent reservees au
   mandataire ou a l'avocat.

# Approches considerees

## Option 1 - Offensif strict

Le skill couvre le claim chart pour preparer mise en demeure, saisie ou action,
sans branche defense.

### Avantages

- frontiere nette ;
- meilleur alignement avec `anteriorite-invalidite` ;
- meilleure lisibilite produit.

### Inconvenients

- necessite de router explicitement la defense ailleurs.

## Option 2 - Offensif + defense

Le skill couvre aussi le demontage d'un claim chart adverse.

### Avantages

- surface plus large.

### Inconvenients

- recouvre trop `anteriorite-invalidite` ;
- brouille la posture du skill ;
- alourdit la sortie et les gates.

## Recommandation

Retenir **Option 1**.

# Contrat d'entree V2

Le skill doit expliciter ou deriver :

- `assertion_mode` :
  - `literal`
  - `equivalence`
  - `both`
- `patent_status` :
  - `fr`
  - `ep-fr`
  - `pct-fr`
  - `unknown`
- `evidence_coverage` :
  - `strong`
  - `mixed`
  - `weak`
  - `none`
- `claim_scope_status` :
  - `independent-only`
  - `independent-plus-key-dependent`
  - `unclear`
- `enforcement_goal` :
  - `cease-and-desist`
  - `seizure-prep`
  - `litigation-prep`
  - `internal-review`

Bloc de faits minimum :

- `patent_reference`
- `claims_targeted`
- `product_or_process_target`
- `technical_sources_used`
- `fr_market_status`
- `commercial_context`
- `known_missing_evidence`

# Gate central : Chart Readiness Gate

Le skill doit conclure explicitement sur :

## `ready`

- revendications exploitables ;
- documentation produit/procede suffisante ;
- mapping elementaire faisable ;
- theorie demandee supportable.

## `partial`

- base exploitable mais lacunaire ;
- certains elements restent `unknown` ou `review` ;
- suite possible sous reserve de combler des trous de preuve.

## `blocked`

- brevet ou revendications non exploitables ;
- documentation produit trop pauvre ;
- theorie d'equivalence invoquee sans base minimale ;
- impossibilite de faire un claim chart serieux.

# Structure de sortie V2

La sortie doit etre stabilisee en 9 blocs.

## 1. `Case Snapshot`

- brevet ;
- produit/procede ;
- objectif enforcement ;
- mode d'assertion ;
- statut global.

## 2. `Patent and Claim Scope`

- revendications cibles ;
- statut de scope ;
- limites visibles du perimetre retenu.

## 3. `Evidence Coverage`

- sources techniques exploitees ;
- qualite de couverture ;
- trous documentaires.

## 4. `Literal Mapping Table`

- tableau element par element ;
- colonnes minimales :
  - `claim element`
  - `product evidence`
  - `status`
  - `comment`
- statuts :
  - `match`
  - `possible-match`
  - `no-match`
  - `unknown`

## 5. `Equivalence Review`

- actif uniquement si `assertion_mode = equivalence` ou `both` ;
- elements non litteraux potentiellement equivalents ;
- fonction / moyen / resultat ;
- points fragiles a reviewer.

## 6. `Critical Gaps and Unknowns`

- trous de preuve critiques ;
- elements ambigus ;
- points de fragilite qui empechent toute escalade propre.

## 7. `Enforcement Use Assessment`

- utilite du claim chart pour :
  - mise en demeure
  - saisie
  - action
- ce que le tableau supporte ;
- ce qu'il ne supporte pas encore.

## 8. `Decision Routing`

- une seule route finale retenue ;
- justification ;
- 2 a 4 actions concretes.

## 9. `Human Validation`

- ce qui doit etre valide par le mandataire ou l'avocat ;
- ce qui reste `[a verifier]` ;
- reserve explicite sur la qualification juridique.

# Frontieres explicites

## `mise-en-demeure-pi`

Si le claim chart est suffisamment exploitable pour une premiere offensive
ecrite, rerouter vers la lettre.

## `saisie-contrefacon`

Si le claim chart revele un besoin d'acquisition probatoire coercitive ou de
preuve technique non accessible autrement, rerouter.

## `contentieux-pi`

Si le besoin devient la strategie judiciaire globale ou le pilotage procedural,
rerouter.

## `anteriorite-invalidite`

Si la vraie question devient la validite du brevet, la nullite, ou la defense
contre une allegation de contrefacon, rerouter.

## `recherche-anteriorite-brevet`

Le skill n'est pas une revue de brevetabilite ni de prior art.

# Decision routing ferme

Le skill doit conclure avec une seule valeur :

- `prepare-cease-and-desist`
- `prepare-seizure-brief`
- `prepare-litigation-brief`
- `fill-evidence-gaps`
- `re-scope-claims`
- `route-to-invalidity-defense`
- `hold-insufficient-basis`

# Documentation impactee

Mettre a jour :

- `plugins/hacienda-propriete-intellectuelle/README.md`
- `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

Le README doit expliciter que `tableau-contrefacon-brevet` est :

- un claim chart brevet offensif strict ;
- distinct de la defense / invalidite ;
- structure autour d'un Chart Readiness Gate ;
- raccorde a `mise-en-demeure-pi`, `saisie-contrefacon`, `contentieux-pi`.

# Verification attendue

Verification repo standard :

- `npm test`
- `npm run typecheck`
- `npm run build`
- `npm run branding:check`
- `git diff --check`

Verification qualitative :

- garde-fou visible "confrontation technique, pas qualification" ;
- `Chart Readiness Gate` visible ;
- contrat d'entree V2 ferme ;
- sortie en 9 blocs ;
- frontieres explicites avec les skills enforcement voisins ;
- routing final ferme.

# Risques

## Risque 1 - Skill trop proche d'un memo contentieux global

### Mitigation

Garder la sortie focalisee sur le claim chart et router la strategie judiciaire
vers `contentieux-pi`.

## Risque 2 - Equivalence traitee trop legerement

### Mitigation

Ne jamais laisser la branche equivalence produire un faux sentiment de force ;
marquer les points fragiles et imposer la validation humaine.

## Risque 3 - Preuve produit trop pauvre

### Mitigation

`Chart Readiness Gate` ferme et bloc `Critical Gaps and Unknowns` explicite.

# Decision

Passer `tableau-contrefacon-brevet` en V2 comme **skill offensif strict** de
claim chart brevet, avec :

- contrat d'entree V2 ferme ;
- `Chart Readiness Gate` ;
- mapping litteral / equivalence structure ;
- sortie en 9 blocs ;
- routing ferme vers mise en demeure, saisie, contentieux ou repli.
