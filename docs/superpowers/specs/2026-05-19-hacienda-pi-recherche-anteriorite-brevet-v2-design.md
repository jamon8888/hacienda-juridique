---
title: "Hacienda PI — recherche-anteriorite-brevet V2"
date: "2026-05-19"
authors:
  - "Hacienda"
status: "proposed"
---

# Summary

Objectif : faire passer `recherche-anteriorite-brevet` d'un gros skill de
triage brevet encore lineaire a un **skill V2 de premier passage strict**,
centre sur :
- les exclusions de brevetabilite ;
- la couverture effective de recherche ;
- les signaux de nouveaute ;
- les signaux d'activite inventive ;
- le routage vers les workflows brevets aval.

Le skill reste borne a un **premier passage** :
- il ne rend pas une opinion de brevetabilite ;
- il ne rend pas une FTO ;
- il ne remplace pas un mandataire brevets ou un avocat PI ;
- il ne devient pas un workflow de redaction de depot ;
- il ne traite pas a lui seul l'invalidite ou la contrefacon.

La cible est un skill plus stable, plus facile a relire, et mieux articule avec
la stack brevets du plugin.

# Why This Change

`recherche-anteriorite-brevet` est deja solide sur le fond, mais il reste un
monolithe old-generation. Il accumule aujourd'hui :
- intake technique ;
- exclusions L.611-10 ;
- logique multi-sources ;
- lecture nouveaute ;
- approche probleme-solution ;
- hygiene de sources et recommandations aval.

Le skill est utile, mais il est encore trop long et trop lineaire. Or la stack
PI a deja bascule vers des contrats V2 plus nets sur les lanes marques, et les
gros orchestrateurs transverses ont deja ete reserres.

Pour la lane brevets, `recherche-anteriorite-brevet` doit devenir la brique de
**premier passage strict** qui :
1. ecarte les faux dossiers ;
2. mesure la couverture de recherche reelle ;
3. remonte les documents les plus proches ;
4. structure les signaux techniques ;
5. route vers depot / invalidite / review humaine.

# Product Positioning

`recherche-anteriorite-brevet` V2 devient le skill de :
- triage technique initial ;
- premier passage d'anteriorites sur bases connectees ;
- lecture preliminaire nouveaute / activite inventive ;
- routage vers les briques aval.

Il n'est pas le skill de :
- brevetabilite finale ;
- liberte d'exploitation ;
- redaction du depot ;
- opposition / invalidite approfondie ;
- contrefacon brevet.

# Approaches

## Option 1 — Premier passage strict avec gates et sorties stables

Le skill reste focalise sur :
- exclusions ;
- couverture de recherche ;
- prior art nearest hits ;
- novelty / inventive step signals ;
- routing ferme.

Avantages :
- frontiere claire ;
- bonne coherence avec les autres migrations V2 ;
- moins de confusion avec FTO et depot.

Inconvenients :
- il faut assumer des redirections explicites au lieu de tout garder dans un
  seul memo.

## Option 2 — Orchestrateur complet brevetabilite/FTO/depot

Le skill deviendrait une porte d'entree unique pour invention, FTO, depot,
invalidite et contentieux.

Avantages :
- experience centralisee en apparence.

Inconvenients :
- overlap direct avec `preparation-depot-brevet`,
  `anteriorite-invalidite`, `tableau-contrefacon-brevet` ;
- frontieres faibles ;
- risque de conclusions trompeuses.

## Option 3 — Refonte minimale

Conserver la structure et seulement la nettoyer.

Avantages :
- peu d'effort.

Inconvenients :
- ne corrige pas le probleme de contrat et de lisibilite.

## Recommendation

Retenir **Option 1**.

# Scope

## In Scope

- recentrer `recherche-anteriorite-brevet` sur le premier passage strict ;
- ajouter un contrat d'entree V2 ;
- formaliser un `Search Coverage Gate` ;
- stabiliser les blocs de sortie ;
- clarifier les frontieres avec les skills brevets voisins ;
- mettre a jour README et changelog PI.

## Out of Scope

- opinion de brevetabilite finale ;
- FTO complete ;
- redaction de revendications ;
- depot effectif ;
- nullite / invalidite approfondie ;
- claim chart contrefacon.

# V2 Skill Contract

## Input Contract

Avant l'analyse detaillee, le skill doit expliciter :

- `technical_domain`: `mechanical`, `chemical`, `pharma-biotech`, `software-cie`, `electronics-telecom`, `mixed`, `unknown`
- `filing_track`: `fr`, `ep`, `pct`, `mixed`, `unknown`
- `classification_status`: `known-cpc-cib`, `proposed`, `missing`
- `search_coverage_status`: `full-connected`, `partial-connected`, `no-connectors`
- `disclosure_urgency`: `pre-disclosure`, `disclosed`, `imminent-disclosure`, `unknown`
- `known_prior_art_status`: `provided`, `partial`, `none`

Faits a rendre visibles ensuite :

- `invention_problem_statement`
- `invention_solution_statement`
- `priority_date_or_target`
- `territories_requested`
- `known_classifications`
- `known_prior_art_items`
- `available_sources`

Tout fait non documente reste `[a verifier]`.

## Search Coverage Gate

Le skill ne doit pas glisser directement de l'intake aux conclusions de
nouveaute.

Il doit controler au minimum :
- presence ou absence de connecteurs brevets ;
- presence d'une description technique exploitable ;
- presence ou absence d'une classification suffisamment plausible ;
- date de priorite ou temporalite de divulgation ;
- statut de l'art anterieur deja connu.

Le gate doit rendre visible si le triage est :
- exploitable ;
- partiel ;
- degrade ;
- bloque.

# Boundaries With Other Skills

## `preparation-depot-brevet`

Frontiere :
- `recherche-anteriorite-brevet` = premier passage strict ;
- `preparation-depot-brevet` = structuration du dossier de depot.

Regle :
- pas de bascule silencieuse en redaction de depot ;
- si les signaux restent tolerables mais qu'un depot est envisage, router vers
  `preparation-depot-brevet`.

## `anteriorite-invalidite`

Frontiere :
- `recherche-anteriorite-brevet` traite une invention ou un projet de depot ;
- `anteriorite-invalidite` traite un titre deja existant ou une strategie
  d'attaque/invalidite.

Regle :
- si le besoin principal devient l'attaque d'un brevet tiers, sortir vers
  `anteriorite-invalidite`.

## `tableau-contrefacon-brevet`

Frontiere :
- `tableau-contrefacon-brevet` traite la comparaison produit/revendication en
  logique contrefacon ;
- `recherche-anteriorite-brevet` traite l'amont brevetabilite.

Regle :
- aucun glissement vers claim chart ou analyse de contrefacon.

## `logiciels-pi`

Frontiere :
- `logiciels-pi` traite le regime droit d'auteur logiciel ;
- `recherche-anteriorite-brevet` ne prend le relais que si une invention mise
  en oeuvre par ordinateur franchit le filtre d'effet technique.

Regle :
- si le dossier reste purement regime logiciel sans contribution technique
  brevetable plausible, le dire et ne pas forcer la lane brevets.

# Output Contract

La sortie V2 doit produire les blocs suivants.

## 1. Invention Snapshot

Contient :
- probleme technique ;
- solution technique ;
- domaine technique ;
- track de depot vise.

## 2. Exclusions Gate

Contient :
- revue des exclusions L.611-10 ;
- flags de non-invention ou d'exclusion ;
- points ambigus.

## 3. Search Coverage and Source Gate

Contient :
- bases interrogees ;
- bases manquantes ;
- classification ;
- statut de couverture reelle.

## 4. Nearest Prior Art

Contient :
- documents les plus proches ;
- source ;
- date ;
- classification ;
- pourquoi ils sont proches.

## 5. Novelty Signals

Contient :
- signaux favorables ou defavorables de nouveaute ;
- elements potentiellement destructeurs ;
- limites de l'analyse.

## 6. Inventive Step Signals

Contient :
- premiere lecture probleme-solution ;
- proximites combinables ;
- signaux evidents vs non-evidents ;
- fragilites.

## 7. Disclosure and Timing Risk

Contient :
- risque de divulgation ;
- priorite ;
- temporalite critique ;
- effets pratiques.

## 8. Decision Routing

Valeurs fermees :
- `prepare-patent-drafting`
- `expand-search-coverage`
- `technical-clarification-needed`
- `software-regime-review-first`
- `invalidity-track-review`
- `hold-or-do-not-file`
- `insufficient-search-record`

## 9. Human Validation

Bloc final obligatoire :
- rappeler qu'il s'agit d'un premier passage ;
- rappeler l'absence d'opinion de brevetabilite ou FTO ;
- rappeler la validation mandataire / avocat ;
- rappeler les `[a verifier]`.

# Error Handling

Le skill doit traiter explicitement :
- invention trop vague ;
- classification absente ;
- connecteurs absents ;
- art anterieur deja connu mais mal documente ;
- divulgation deja intervenue ;
- sujet purement logiciel sans effet technique plausible ;
- dossier qui bascule en invalidite plutot qu'en depot.

Dans ces cas, la sortie doit rester utile mais conclure en gate ou en routage
ferme, pas en faux signal de brevetabilite.

# Testing and Review Targets

La migration V2 doit etre verifiee au minimum sur :

1. invention mecanique avec CIB connue et connecteurs complets ;
2. invention logicielle avec doute sur l'effet technique ;
3. dossier sans connecteurs brevets ;
4. invention deja divulguee ;
5. dossier qui route vers `preparation-depot-brevet` ;
6. dossier qui route vers `anteriorite-invalidite`.

# Documentation Updates

Mettre a jour :
- `plugins/hacienda-propriete-intellectuelle/README.md`
- `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

Le README doit presenter `recherche-anteriorite-brevet` comme :
- un premier passage strict ;
- distinct de la redaction de depot ;
- distinct de l'invalidite ;
- distinct de la contrefacon brevet.

# Assumptions

- le nom public `recherche-anteriorite-brevet` est conserve ;
- le garde-fou "pas une opinion de brevetabilite ni FTO" reste central ;
- la migration est structurelle, pas un changement de tools live ou
  d'integrations.
