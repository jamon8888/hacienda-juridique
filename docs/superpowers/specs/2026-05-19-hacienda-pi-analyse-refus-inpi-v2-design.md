---
title: Hacienda PI - analyse-refus-inpi V2
date: 2026-05-19
status: proposed
owners:
  - hacienda-propriete-intellectuelle
summary: >
  Recentrer analyse-refus-inpi comme skill V2 bi-office INPI/OEB de reponse
  a notification, avec contrat d'entree ferme, Response Readiness Gate, et
  decision procedurale bornee.
---

# Contexte

`analyse-refus-inpi` est deja un skill riche sur le fond :

- notification INPI `R.612-66 CPI` ;
- communication OEB `Rule 132 EPC` ;
- classification des citations `X/Y/A/E` ;
- logique d'amendement et d'argumentation ;
- projet de reponse FR/EN.

Le probleme n'est pas la profondeur metier. Le probleme est structurel :

- le skill reste un grand memo ancien format ;
- le contrat d'entree est encore trop implicite ;
- la distinction INPI / OEB existe mais n'est pas assez fermee ;
- la decision procedurale finale n'est pas stabilisee comme sortie V2.

# Probleme

Le plugin a maintenant une lane brevets V2 plus nette :

- `recherche-anteriorite-brevet` pour le premier passage prior art ;
- `preparation-depot-brevet` pour la preparation stricte au depot ;
- `tableau-contrefacon-brevet` pour le claim chart offensif ;
- `anteriorite-invalidite` pour la validite stricte d'un brevet adverse.

`analyse-refus-inpi` doit devenir la brique V2 de **reponse a notification de
prosecution**, sans se transformer en orchestrateur global du portefeuille ou
de la strategie internationale.

# Decision de scope

`analyse-refus-inpi` V2 reste un skill **bi-office** :

- `INPI`
- `OEB`

Il reste centre sur :

- l'analyse de la notification ;
- la cartographie des objections et citations ;
- la faisabilite d'amendement ;
- la strategie argumentative ;
- une decision procedurale finale bornee.

Il ne doit pas absorber :

- la strategie internationale globale ;
- la gestion portefeuille ;
- la validite offensive d'un brevet adverse ;
- la redaction finale et le depot effectif de la reponse officielle.

# Objectifs

## Objectifs principaux

1. Recentrer `analyse-refus-inpi` comme skill V2 bi-office de reponse a
   notification.
2. Fermer le contrat d'entree.
3. Introduire un `Response Readiness Gate` explicite.
4. Stabiliser une sortie V2 en 9 blocs.
5. Fermer la decision procedurale finale dans un jeu limite d'issues.

## Non-objectifs

Le skill V2 ne doit pas :

- deposer la reponse sur la teleprocedure INPI ou MyEPO ;
- piloter toute la prosecution du dossier ;
- arbitrer la strategie internationale globale ;
- refaire un skill complet de recherche prior art amont ;
- remplacer la validation mandataire ou avocat.

# Utilisateurs cibles

- mandataire brevets EQE ;
- avocat PI en prosecution ou contentieux brevet ;
- juriste PI interne preparant une relecture externe ;
- equipe innovation / R&D encadree par conseil externe.

# Principes de design

1. **Notification first.** Le point de depart est une objection reelle de
   l'office.
2. **Bi-office explicite.** Les differences `INPI` / `OEB` doivent etre
   visibles des l'intake.
3. **Gate explicite.** Le skill doit dire si une reponse exploitable est
   prete, partielle ou bloquee.
4. **Decision fermee.** La sortie doit conclure par une route procedurale
   bornee.
5. **Discipline de sources.** Les objections, citations et delais doivent
   rester relies aux documents consultes ou etre marques comme gaps.
6. **Validation humaine obligatoire.** L'envoi externe reste du ressort du
   mandataire ou de l'avocat.

# Approches considerees

## Option 1 - Skill bi-office avec decision procedurale bornee

Le skill garde `INPI` et `OEB`, mais ferme son contrat d'entree, son gate et
sa sortie.

### Avantages

- respecte la surface metier existante ;
- evite la duplication entre flux INPI et OEB ;
- reste directement utile en pratique.

### Inconvenients

- demande un cadrage net des differences procedurales.

## Option 2 - Split INPI / OEB

Deux skills distincts.

### Avantages

- separation maximale.

### Inconvenients

- duplication forte ;
- maintenance plus lourde ;
- peu utile tant que la structure V2 suffit.

## Recommandation

Retenir **Option 1**.

# Contrat d'entree V2

Le skill doit expliciter ou deriver :

- `office` :
  - `inpi`
  - `oeb`
- `notification_type` :
  - `search-report`
  - `substantive-refusal`
  - `rule-132`
  - `other-office-action`
- `deadline_status` :
  - `comfortable`
  - `tight`
  - `critical`
  - `expired-or-unknown`
- `citation_profile` :
  - `x-heavy`
  - `y-heavy`
  - `mixed`
  - `light`
  - `unclear`
- `claim_amendment_posture` :
  - `amendment-open`
  - `amendment-limited`
  - `argument-only`
  - `unclear`
- `response_goal` :
  - `amend`
  - `argue`
  - `amend-and-argue`
  - `divide`
  - `request-extension`
  - `abandon`

Bloc de faits minimum :

- `application_reference`
- `office_document_reference`
- `consulted_notification_status`
- `claims_objected`
- `known_citations`
- `current_claim_set_status`
- `priority_or_added_matter_risk_status`
- `language_and_filing_context`
- `known_missing_material`

# Gate central : Response Readiness Gate

Le skill doit conclure explicitement sur :

## `ready`

- notification consultee et objections identifiees ;
- delai suffisamment stabilise ;
- citations et revendications rattachees au dossier ;
- posture d'amendement ou d'argumentation exploitable.

## `partial`

- reponse plausible mais encore incomplete ;
- manque de support textuel, de jeu de revendications ou de cartographie
  citation/objection ;
- delai serre mais pas encore perdu.

## `blocked`

- notification non consultee ou trop incomplete ;
- delai inconnu ou probablement depasse ;
- aucune base serieuse pour amender ou argumenter ;
- dependances documentaires trop fortes pour produire une reponse exploitable.

Checks de gate attendus :

- si `consulted_notification_status` est incomplet, rester `partial` ou
  `blocked` ;
- si `deadline_status = expired-or-unknown`, ne jamais sortir `ready` ;
- si `claims_objected` ou `current_claim_set_status` ne sont pas stabilises,
  rester `partial` ou `blocked` ;
- si les citations sont mentionnees sans source consultee ou sans lien avec les
  objections, les garder en gap explicite.

# Structure de sortie V2

La sortie doit etre stabilisee en 9 blocs.

## 1. `Case Snapshot`

- office ;
- demande ou brevet ;
- type de notification ;
- statut global du gate.

## 2. `Office and Deadline Posture`

- cadre `INPI` ou `OEB` ;
- delai utile ;
- urgence procedurale ;
- risques immediats.

## 3. `Citation and Objection Map`

- citations retenues ;
- objections principales ;
- lien citation / objection / revendication ;
- bases non encore verifiees.

## 4. `Amendment Feasibility`

- latitude d'amendement ;
- risques d'ajout de matiere ;
- dependance au support dans la description ;
- revendications les plus exposables.

## 5. `Argument Strategy`

- arguments repondant aux objections ;
- points forts et faibles ;
- options `amend`, `argue` ou combinees ;
- reserves `[a verifier]` si necessaire.

## 6. `Priority Risks and Procedural Constraints`

- risques de priorite ;
- risques d'ajout de matiere ;
- contraintes INPI/OEB ;
- limites de procedure utiles a la reponse.

## 7. `Critical Gaps`

- pieces ou informations manquantes ;
- zones documentaires non consultees ;
- points pouvant faire tomber la reponse.

## 8. `Decision Routing`

- une seule route finale ;
- justification ;
- 2 a 4 actions concretes.

## 9. `Human Validation`

- ce qui doit etre valide par mandataire ou avocat ;
- points encore provisoires ;
- ce qui reste `[a verifier]`.

# Decision Routing ferme

Le skill doit conclure avec une seule valeur :

- `amend`
- `argue`
- `amend-and-argue`
- `divide`
- `request-extension`
- `abandon`
- `insufficient-basis`

# Frontieres explicites

## `recherche-anteriorite-brevet`

Si le besoin principal reste de refaire un premier passage prior art amont,
rerouter.

## `preparation-depot-brevet`

Si le sujet devient la preparation structuree du depot ou d'un nouveau jeu de
revendications avant notification, rerouter.

## `strategie-extension-internationale`

Si l'arbitrage devient principalement territorial ou portefeuille, rerouter.

## `anteriorite-invalidite`

Si le besoin devient la validite d'un brevet adverse en attaque ou defense,
rerouter.

# Documentation impactee

Mettre a jour :

- `plugins/hacienda-propriete-intellectuelle/README.md`
- `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

Le README doit expliciter que `analyse-refus-inpi` est :

- un skill V2 bi-office `INPI` / `OEB` ;
- centre sur la reponse a notification ;
- structure autour d'un `Response Readiness Gate` ;
- distinct de la recherche amont, du depot, de l'invalidite et de la strategie
  internationale.

# Verification attendue

Verification repo standard :

- `npm test`
- `npm run typecheck`
- `npm run build`
- `npm run branding:check`
- `git diff --check`

Verification qualitative :

- garde-fou visible "analyse argumentaire, pas reponse officielle" ;
- `Response Readiness Gate` visible ;
- contrat d'entree V2 ferme ;
- sortie en 9 blocs ;
- routing final ferme ;
- frontieres explicites avec les autres skills brevets.

# Risques

## Risque 1 - Skill trop proche d'un orchestrateur prosecution global

### Mitigation

Limiter le skill a la notification et a la decision procedurale immediate.

## Risque 2 - Objections et citations insuffisamment sourcees

### Mitigation

Exiger une discipline explicite de sources et garder visibles les gaps.

## Risque 3 - Delai traite trop legerement

### Mitigation

Faire du `deadline_status` un element dur du gate.

# Decision

Passer `analyse-refus-inpi` en V2 comme **skill bi-office de reponse a
notification**, avec :

- contrat d'entree ferme ;
- `Response Readiness Gate` ;
- sortie en 9 blocs ;
- decision procedurale bornee ;
- frontieres nettes avec les autres briques brevets du plugin.
