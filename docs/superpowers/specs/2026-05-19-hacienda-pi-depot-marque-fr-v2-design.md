---
title: "Hacienda PI — depot-marque-fr V2"
date: "2026-05-19"
authors:
  - "Hacienda"
status: "proposed"
---

# Summary

Objectif : faire passer `depot-marque-fr` d'un gros skill de preparation de
depot encore lineaire a un **skill V2 de preparation stricte**, centre sur le
brief de depot et la production d'un brouillon de package depot, sans le
transformer en orchestrateur global de la stack marques.

Le skill reste limite a la **preparation de depot** :
- il ne rend pas d'opinion de disponibilite ;
- il ne remplace pas la recherche d'anteriorite ;
- il ne depose pas ;
- il ne bascule pas silencieusement en opposition ou en surveillance ;
- il structure une branche `FR`, `EU` ou `Madrid` avec des gates explicites.

La cible est un skill plus net, plus court a executer, et plus defensible
commercialement pour les dossiers marques France / UE / international.

# Why This Change

`depot-marque-fr` est deja riche sur le fond, mais il melange aujourd'hui :
- pre-checks de disponibilite et motifs absolus ;
- cadrage du territoire ;
- qualification du deposant / mandataire ;
- redaction des libelles ;
- elements de strategie internationale.

Le resultat est utile, mais encore trop lineaire. Depuis les migrations V2
recentes :
- `recherche-anteriorite-marque` est deja le **premier passage strict** ;
- `analyse-opposition-marque` est deja le **skill d'opposition INPI stricte** ;
- `surveillance-marque` couvre deja la **watchlist et les alertes**.

`depot-marque-fr` doit donc etre recadre comme la brique qui prend un dossier
deja suffisamment derisque et produit un **brouillon de depot actionnable**.

# Product Positioning

`depot-marque-fr` V2 devient le skill de :
- **preparation du depot** ;
- **choix de lane** `FR` / `EU` / `Madrid` ;
- **structuration des classes et libelles** ;
- **verification de preparation du deposant et du mandataire** ;
- **mise en forme du package de depot** pour relecture humaine.

Il n'est pas le skill de :
- clearance juridique finale ;
- recherche d'anteriorite initiale ;
- opposition ;
- surveillance ;
- enforcement.

# Recommended Approach

## Option 1 — Preparation stricte avec lanes FR / EU / Madrid

Le skill reste focalise sur le depot et formalise :
- un contrat d'entree V2 ;
- un gate de readiness ;
- une branche `filing_lane` ;
- des blocs de sortie stables.

Avantages :
- frontiere propre avec les autres skills marques ;
- meilleure lisibilite produit ;
- moins de confusion entre depot et clearance.

Inconvenients :
- il faut assumer des redirections explicites vers la recherche ou la
  surveillance quand le dossier n'est pas pret.

## Option 2 — Orchestrateur global marque

Le skill deviendrait une porte d'entree unique pour recherche, depot,
surveillance et opposition.

Avantages :
- plus simple a vendre en apparence.

Inconvenients :
- overlap direct avec les skills deja restructures ;
- frontieres floues ;
- risque de regressions documentaires et de confusion utilisateur.

## Option 3 — Refonte minimale

On garde l'ossature actuelle et on ne fait qu'un nettoyage leger.

Avantages :
- effort faible.

Inconvenients :
- ne corrige pas le probleme de structure ;
- laisse un monolithe old-generation dans la lane marques.

## Recommendation

Retenir **Option 1**.

# Scope

## In Scope

- recentrer `depot-marque-fr` sur la preparation de depot ;
- ajouter un contrat d'entree V2 ;
- formaliser les lanes `FR`, `EU`, `Madrid` ;
- ajouter un `Filing Readiness Gate` explicite ;
- stabiliser les blocs de sortie ;
- documenter les frontieres avec la stack marques existante ;
- mettre a jour README et changelog du plugin PI.

## Out of Scope

- depot automatise INPI / EUIPO / OMPI ;
- paiement des taxes ;
- opinion de disponibilite finale ;
- recherche d'anteriorite initiale complete ;
- opposition INPI/EUIPO ;
- surveillance recurrente ;
- contentieux.

# V2 Skill Contract

## Input Contract

Avant l'intake detaille, le skill expose et renseigne explicitement :

- `filing_lane`: `fr-inpi`, `eu-eutm`, `madrid-ompi`, `undecided`
- `search_status`: `not-run`, `partial`, `first-pass-complete`, `review-required`
- `sign_format`: `word`, `figurative`, `composite`, `sound`, `position`, `multimedia`, `other`
- `goods_services_maturity`: `draft`, `rough`, `structured`, `reviewed`
- `applicant_readiness`: `complete`, `partial`, `missing`
- `priority_status`: `none`, `claimed-within-window`, `claimed-out-of-window`, `unclear`

Champs de faits a exposer ensuite :

- `sign_text_or_asset`
- `products_services_description`
- `nice_classes_candidate`
- `territories_requested`
- `applicant_identity`
- `representative_status`
- `priority_claim_details`
- `business_goal`

Tout fait non documente reste `[a verifier]`.

## Filing Readiness Gate

Le skill ne doit plus glisser directement de l'intake au brouillon.

Il doit controler au minimum :
- statut de la recherche d'anteriorite ;
- precision suffisante des produits/services ;
- lane de depot identifiee ;
- identite deposant suffisamment complete ;
- priorite revendiquee dans une fenetre juridiquement plausible ;
- pieces minimales disponibles pour les signes non verbaux.

Si le gate echoue, la sortie reste utile mais se termine en routage ferme et
non en faux package "pret a deposer".

# Filing Lanes

## Lane `fr-inpi`

Usage :
- depot France seul ;
- premiere priorite ou protection ciblee France.

Points de sortie attendus :
- adequation du signe au depot FR ;
- classes/libelles candidats pour INPI ;
- gate mandataire / deposant ;
- priorite eventuelle ;
- brouillon package FR.

## Lane `eu-eutm`

Usage :
- protection uniforme UE ;
- strategie de marque unique sur plusieurs Etats membres.

Points de sortie attendus :
- rappel de l'effet unitaire EUTM ;
- sensibilite accrue au risque si la clearance reste partielle ;
- gate representation si necessaire ;
- package EUTM candidat.

## Lane `madrid-ompi`

Usage :
- extension internationale basee sur FR ou EU.

Points de sortie attendus :
- verification presence d'une marque de base ;
- controle des pays designes ;
- verification priorite / fenetre ;
- package Madrid candidat ;
- route explicite si la base FR/EU n'est pas suffisamment posee.

# Boundaries With Other Skills

## `recherche-anteriorite-marque`

Frontiere :
- `recherche-anteriorite-marque` = premier passage strict de disponibilite ;
- `depot-marque-fr` = preparation de depot une fois la recherche suffisamment
  avancee.

Regle :
- si `search_status = not-run`, router d'abord vers
  `recherche-anteriorite-marque` ;
- si `search_status = partial`, le signaler comme `[review]` et ne pas presenter
  le dossier comme pret.

## `surveillance-marque`

Frontiere :
- `surveillance-marque` gere la watchlist et les alertes post-publication ;
- `depot-marque-fr` ne gere pas le monitoring.

Regle :
- si l'utilisateur veut attendre avant depot ou suivre le marche, router vers
  `surveillance-marque` ;
- ne pas convertir un doute de depot en logique de surveillance sans le dire.

## `analyse-opposition-marque`

Frontiere :
- `analyse-opposition-marque` ne s'active que sur opposition recevable ou
  imminente ;
- `depot-marque-fr` ne traite pas le fond d'une opposition.

Regle :
- si l'utilisateur est deja bloque par une opposition, sortir du skill et
  router vers `analyse-opposition-marque`.

## `clearance-marque`

Frontiere :
- `clearance-marque` reste un alias / sunset de compatibilite ;
- `depot-marque-fr` ne doit pas le prendre comme dependance fonctionnelle.

# Output Contract

La sortie V2 doit etre stabilisee dans les blocs suivants.

## 1. Filing Lane and Readiness Gate

Contient :
- lane retenue ;
- statut de preparation ;
- points bloquants ou manquants.

## 2. Sign Snapshot

Contient :
- signe ;
- type de signe ;
- observations de forme ;
- pieces a fournir si le signe n'est pas purement verbal.

## 3. Absolute Grounds and Registrability Red Flags

Contient :
- red flags intrinseques utiles au depot ;
- distinction entre points regardes et points non confirmes.

## 4. Goods / Services and Nice Map

Contient :
- classes candidates ;
- libelles candidats ;
- points de sur-largeur / sous-couverture ;
- coherence avec le business goal.

## 5. Applicant and Mandate Readiness

Contient :
- identite deposant ;
- statut mandataire ;
- trous documentaires ;
- gates de representation.

## 6. Priority and Territory Strategy

Contient :
- priorite ;
- territoire ;
- logique FR / EU / Madrid ;
- points de sequence a arbitrer.

## 7. Filing Package Draft

Contient :
- brouillon synthese du package de depot ;
- checklist des elements a mettre dans le dossier humain final.

## 8. Next Step Routing

Valeurs fermees :
- `run-first-pass-search`
- `expand-search-coverage`
- `prepare-fr-filing`
- `prepare-eu-filing`
- `prepare-madrid-base-first`
- `prepare-madrid-filing`
- `wait-and-monitor`
- `abandon-or-rename`
- `insufficient-record`

## 9. Human Validation

Bloc final obligatoire :
- validation par mandataire / avocat ;
- limites du skill ;
- points `[a verifier]`.

# Error Handling

Le skill doit traiter explicitement :

- signe trop vague ou mal decrit ;
- produits/services trop vagues ;
- absence de recherche d'anteriorite exploitable ;
- lane Madrid sans base FR/EU ;
- priorite hors delai ou insuffisamment documentee ;
- absence de pieces pour signe figuratif / sonore / multimedia ;
- deposant ou mandataire incomplet.

Dans ces cas, la sortie doit rester exploitable mais se terminer en gate rouge
ou en routage ferme, jamais en faux "pret au depot".

# Testing and Review Targets

La migration V2 doit etre verifiee au minimum sur :

1. depot FR simple avec recherche de premier passage deja faite ;
2. depot EU avec couverture de recherche partielle ;
3. scenario Madrid sans base suffisante ;
4. signe figuratif avec pieces manquantes ;
5. produits/services trop vagues ;
6. cas de reroutage vers `analyse-opposition-marque`.

# Documentation Updates

Mettre a jour :
- `plugins/hacienda-propriete-intellectuelle/README.md`
- `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

Le README doit raconter `depot-marque-fr` comme :
- un skill de **preparation stricte de depot** ;
- distinct de la recherche, de l'opposition et de la surveillance ;
- structure par lane FR / EU / Madrid.

# Assumptions

- la stack marques recemment migree reste la reference de frontiere ;
- le skill conserve son nom public `depot-marque-fr` ;
- on ne change pas la posture "preparation, pas depot" ;
- cette V2 est une normalisation structurelle, pas une refonte metier complete.
