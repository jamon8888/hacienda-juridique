---
title: Hacienda PI - preparation-depot-brevet V2
date: 2026-05-19
status: proposed
owners:
  - hacienda-propriete-intellectuelle
summary: >
  Recentrer preparation-depot-brevet comme skill de preparation stricte au
  depot, avec gate de readiness, lanes FR/EP/PCT/sequenced, et branche
  secondaire bornee de strategie de priorite.
---

# Contexte

`preparation-depot-brevet` est deja un skill substantiel, mais il reste
construit comme un memo lineaire ancien format. La lane brevets a maintenant
un premier passage V2 clair avec `recherche-anteriorite-brevet`, qui reste
strictement borne au triage de nouveaute / activite inventive et refuse toute
opinion finale de brevetabilite ou de FTO.

Il manque donc une brique V2 de preparation au depot qui :

- prenne le relais apres un premier passage de recherche exploitable ;
- structure un dossier de travail pour le mandataire ou l'avocat ;
- distingue la preparation technique du choix formel de depot ;
- expose une strategie de priorite / sequencement sans devenir un orchestrateur
  global de prosecution brevets.

# Probleme

Le skill actuel melange plusieurs niveaux :

- cadrage invention ;
- hygiene de divulgation ;
- titularite / inventeurs ;
- structure de description ;
- revendications candidates ;
- choix FR / EP / PCT ;
- rappels juridiques et proceduraux.

Ce melange rend le skill moins lisible, plus difficile a router, et moins
coherent avec les V2 deja poses dans la lane marques et dans
`recherche-anteriorite-brevet`.

# Objectifs

## Objectifs principaux

1. Faire de `preparation-depot-brevet` un skill V2 de **preparation stricte**
   au depot.
2. Introduire un **Filing Readiness Gate** explicite.
3. Formaliser les lanes :
   - `FR`
   - `EP`
   - `PCT`
   - `sequenced`
4. Ajouter une branche secondaire structuree de **strategie de priorite**,
   sans deplacer le coeur du skill hors de la preparation technique.
5. Normaliser la sortie pour la rendre plus reutilisable par un avocat, un
   juriste PI, un mandataire brevets ou une equipe d'innovation.

## Non-objectifs

Le skill V2 ne doit pas :

- deposer un brevet ;
- rendre une opinion finale de brevetabilite ;
- rendre une opinion FTO ;
- remplacer la redaction finale d'un mandataire brevets ;
- devenir un orchestrateur global de prosecution internationale ;
- absorber `strategie-extension-internationale` ;
- absorber `anteriorite-invalidite` ;
- absorber `tableau-contrefacon-brevet`.

# Utilisateurs cibles

- avocat PI ;
- mandataire brevets / equipe de mandataires ;
- juriste IP interne ;
- responsable innovation / CTO accompagne par conseil ;
- equipe venture / deeptech preparant un premier brief de depot.

# Principes de design

1. **Preparation d'abord.** Le skill doit produire un brouillon de travail
   exploitable, pas une illusion de depot final.
2. **Gate explicite.** Le skill doit dire clairement si le dossier est :
   - `ready`
   - `partial`
   - `blocked`
3. **Strategie bornee.** La route FR/EP/PCT est une sortie structuree utile,
   mais elle reste secondaire au brief de redaction.
4. **Frontieres nettes.** Les transitions vers les skills voisins doivent etre
   explicites.
5. **Validation humaine obligatoire.** Le skill doit rester ferme sur le fait
   qu'un depot mal cadre ou mal redige se paie en validite et en portee.

# Approches considerees

## Option 1 - Preparation stricte seule

Le skill produit un brief de redaction et s'arrete avant toute suggestion de
route FR/EP/PCT.

### Avantages

- scope plus simple ;
- peu de risque d'empiement strategique.

### Inconvenients

- trop pauvre pour l'usage reel ;
- laisse un trou operationnel immediat apres la preparation technique.

## Option 2 - Preparation stricte + strategie de priorite bornee

Le skill produit un brief de redaction complet et ajoute une branche
secondaire de priorite / sequencement.

### Avantages

- meilleur equilibre entre utilite pratique et discipline de scope ;
- colle a la vraie question utilisateur apres la preparation ;
- s'aligne avec la logique V2 des autres skills.

### Inconvenients

- demande une frontiere explicite avec `strategie-extension-internationale`.

## Option 3 - Orchestrateur depot global

Le skill couvre preparation, strategie, invalidite, extension, et suites.

### Avantages

- apparent confort d'usage.

### Inconvenients

- overlap majeur avec plusieurs skills existants ;
- retour a un monolithe difficile a maintenir ;
- incoherent avec le mouvement V2 du plugin.

## Recommandation

Retenir **Option 2**.

# Contrat d'entree V2

Le skill doit expliciter ou deriver les dimensions suivantes :

- `invention_type` :
  - `device`
  - `process`
  - `composition`
  - `software-implemented`
  - `biotech-medical`
  - `mixed`
  - `unknown`
- `filing_lane` :
  - `fr`
  - `ep`
  - `pct`
  - `sequenced`
  - `unknown`
- `priority_strategy_status` :
  - `single-lane`
  - `fr-then-ep`
  - `fr-then-pct`
  - `ep-direct`
  - `pct-direct`
  - `unclear`
- `readiness_status` :
  - `ready`
  - `partial`
  - `blocked`
  - `unknown`
- `inventorship_status` :
  - `clear`
  - `needs-review`
  - `contested-or-unclear`
- `disclosure_status` :
  - `no-known-disclosure`
  - `planned-disclosure`
  - `already-disclosed`
  - `unclear`

Le bloc de faits minimum doit faire apparaitre :

- `proposed_invention`
- `technical_problem`
- `technical_solution`
- `known_prior_art_status`
- `inventors`
- `applicant`
- `territories_targeted`
- `public_disclosure_timeline`
- `known_examples_and_variants`
- `known_drawings_status`
- `known_data_or_test_support`

# Gate central : Filing Readiness Gate

Le skill doit evaluer explicitement si le dossier est :

## `ready`

Le dossier contient suffisamment de matiere pour produire un briefing coherent
de redaction et une route de depot exploitable sous validation humaine.

## `partial`

Le dossier est exploitable mais incomplet. Il faut signaler ce qui manque,
notamment :

- variantes non decrites ;
- figures absentes ;
- tests ou effets techniques non documentes ;
- inventorship / applicant a confirmer ;
- prior art connu encore trop lacunaire.

## `blocked`

Le skill doit bloquer la suite quand le risque est structurellement trop fort,
par exemple :

- divulgation deja intervenue avec risque majeur sur la nouveaute ;
- invention trop vague pour supporter une description serieuse ;
- chaine de titularite trop incertaine ;
- contradiction majeure entre demande de depot et matiere fournie.

# Sortie V2

La sortie doit etre stabilisee en 9 blocs.

## 1. `Case Snapshot`

- nature de l'invention ;
- lane envisagee ;
- objectif du travail ;
- statut general du dossier.

## 2. `Inventorship and Ownership Check`

- inventeurs identifies ;
- deposant envisage ;
- points de vigilance sur `L.611-7` ou cessions ;
- validation humaine requise.

## 3. `Disclosure Risk Check`

- divulgations connues ou prevues ;
- effet potentiel sur la nouveaute ;
- urgence ou blocage.

## 4. `Drafting Brief`

- probleme technique ;
- solution ;
- avantages techniques revendicables ;
- vocabulaire technique cle ;
- architecture generale du dossier.

## 5. `Claim Architecture Candidate`

- revendication independante candidate ;
- sous-combinaisons plausibles ;
- dependantes structurantes ;
- points a ne pas sur-figer.

## 6. `Description Coverage`

- sections attendues ;
- modes de realisation deja supportes ;
- trous de support ;
- besoins de variantes / exemples additionnels.

## 7. `Figures and Examples Checklist`

- figures attendues ;
- schemas ou flowcharts utiles ;
- donnees / essais / tableaux comparatifs manquants.

## 8. `Priority and Filing Path`

- FR / EP / PCT / sequence recommandee ;
- raison de la route suggeree ;
- conditions ou reserves ;
- quand rerouter vers `strategie-extension-internationale`.

## 9. `Human Validation`

- ce qui doit etre valide par un mandataire ou avocat ;
- ce qui reste `[a verifier]` ;
- decision finale reservee au professionnel.

# Frontieres explicites avec les skills voisins

## `recherche-anteriorite-brevet`

Amont strict pour le premier passage de recherche. Si la couverture de recherche
est insuffisante, `preparation-depot-brevet` ne doit pas maquiller le manque.

## `strategie-extension-internationale`

Ne doit prendre le relais que si le besoin principal devient la strategie de
portefeuille ou d'extension internationale, et non plus le brief de depot
initial.

## `anteriorite-invalidite`

Si le besoin principal devient l'attaque d'un brevet tiers ou la nullite,
rerouter.

## `tableau-contrefacon-brevet`

Si le besoin principal devient la comparaison revendications vs produit/procede,
rerouter.

## `logiciels-pi`

Si la vraie question porte sur le regime logiciel, la titularite, les licences
ou l'OSS plus que sur un depot brevet, rerouter.

# Decision routing ferme

Le skill doit conclure avec une valeur de routage fermee :

- `prepare-drafting-brief`
- `fill-readiness-gaps`
- `expand-prior-art-review`
- `hold-due-to-disclosure-risk`
- `route-to-extension-strategy`
- `route-to-invalidity-analysis`
- `route-to-infringement-chart`
- `route-to-software-regime-review`

# Impacts documentation

Mettre a jour :

- `plugins/hacienda-propriete-intellectuelle/README.md`
- `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

Le README doit expliciter que `preparation-depot-brevet` est :

- une brique de preparation au depot ;
- distincte du premier passage d'anteriorite ;
- distincte de la revue d'invalidite ;
- distincte du claim chart contrefacon ;
- dotee d'un readiness gate et d'une route FR/EP/PCT bornee.

# Tests et verification attendus

Verification repo standard :

- `npm test`
- `npm run typecheck`
- `npm run build`
- `npm run branding:check`
- `git diff --check`

Verification qualitative du skill :

- presence visible du garde-fou "preparation, pas depot final" ;
- presence du `Filing Readiness Gate` ;
- sortie en 9 blocs ;
- frontieres explicites avec les skills brevets voisins ;
- route de priorite bornee, sans basculer en orchestrateur global.

# Risques

## Risque 1 - Skill trop strategique

Si la branche priorite prend trop de place, le skill redevient flou.

### Mitigation

Maintenir `Drafting Brief` et `Claim Architecture Candidate` comme coeur du
skill, et garder `Priority and Filing Path` en aval.

## Risque 2 - Skill trop procedural

Si le skill multiplie les details office par office, il overlap avec
`strategie-extension-internationale`.

### Mitigation

Limiter la route FR/EP/PCT a une recommandation structuree et reservee, sans
ouvrir un guide complet de prosecution.

## Risque 3 - Faux sentiment de readiness

Le skill pourrait donner l'impression qu'un dossier est "pret" alors que la
matiere technique est faible.

### Mitigation

Gate explicite, reserves fermes, et validation humaine obligatoire.

# Decision

Passer `preparation-depot-brevet` en V2 comme **skill de preparation stricte**
avec :

- `Filing Readiness Gate` ;
- lanes `FR`, `EP`, `PCT`, `sequenced` ;
- sortie en 9 blocs ;
- branche secondaire structuree de priorite / sequencement ;
- frontieres explicites avec la lane brevets voisine.
