---
title: "Hacienda PI — surveillance-marque V2"
date: "2026-05-19"
authors:
  - "Hacienda"
status: "proposed"
---

# Summary

Objectif : faire passer `surveillance-marque` d'un skill melant gestion de
watchlist, rapport de surveillance et hygiene de registre a un **skill V2 de
surveillance stricte**, centre sur la detection de publications recentes,
l'evaluation de l'urgence procedurale et le routage ferme vers la bonne brique
aval.

Le skill reste borne a la **surveillance** :
- il ne rend pas une opinion de confusion finale ;
- il ne devient pas un moteur d'opposition ;
- il ne devient pas un workflow enforcement ;
- il ne remplace pas la recherche d'anteriorite ;
- il ne transforme pas les alertes en action sans gate explicite.

La cible est un skill plus propre pour les watchlists marques, avec un contrat
plus stable et une meilleure articulation avec le reste de la lane marques.

# Why This Change

`surveillance-marque` est deja riche en logique de watchlist, de fenetre
temporelle et de severite. Mais il continue a superposer :
- administration de la watchlist ;
- rapport de publications ;
- triage d'urgence d'opposition ;
- hygiene / audit de portefeuille surveille ;
- routage vers d'autres skills.

Le fond est bon, mais la structure est encore old-generation. Or la lane
marques a deja ete recadree :
- `recherche-anteriorite-marque` = premier passage strict ;
- `depot-marque-fr` = preparation stricte au depot ;
- `analyse-opposition-marque` = opposition INPI stricte.

`surveillance-marque` doit donc devenir la brique qui :
1. surveille ;
2. classe ;
3. route ;
4. ne decide pas a la place du mandataire ou de l'avocat.

# Product Positioning

`surveillance-marque` V2 devient le skill de :
- gestion structuree de watchlist ;
- surveillance des publications recentes INPI / EUIPO selon le scope configure ;
- classement par fenetre d'opposition et severite de monitoring ;
- routage vers analyse de conflit, opposition ou maintien en veille.

Il n'est pas le skill de :
- clearance ou opinion de disponibilite ;
- depot ;
- argumentaire d'opposition au fond ;
- mise en demeure ;
- tri enforcement au sens contentieux.

# Approaches

## Option 1 — Surveillance stricte avec modes clarifies

Conserver les modes existants (`report`, `add`, `update`, `remove`, `list`,
`audit`) mais leur donner un contrat V2 plus net :
- `report` = moteur de surveillance et de priorisation ;
- `add/update/remove/list` = administration watchlist ;
- `audit` = hygiene et rationalisation de la watchlist.

Avantages :
- respecte l'existant ;
- pas de casse produit ;
- clarifie la place du skill.

Inconvenients :
- demande un vrai nettoyage structurel du `SKILL.md`.

## Option 2 — Hub marques post-depot

Le skill deviendrait la porte d'entree unique apres depot : surveillance,
opposition, coexistence, enforcement.

Avantages :
- experience unifiee en apparence.

Inconvenients :
- overlap direct avec `analyse-opposition-marque`, `mise-en-demeure-pi` et
  `tri-contrefacon` ;
- frontieres plus floues.

## Option 3 — Refonte minimale

Conserver la structure actuelle et ne faire qu'un toilettage.

Avantages :
- effort faible.

Inconvenients :
- la structure old-generation reste en place ;
- peu de gain de lisibilite.

## Recommendation

Retenir **Option 1**.

# Scope

## In Scope

- recentrer `surveillance-marque` sur la surveillance stricte ;
- ajouter un contrat d'entree V2 par mode ;
- formaliser un `Monitoring Gate` pour le mode `report` ;
- stabiliser les blocs de sortie du rapport ;
- clarifier les routes vers `recherche-anteriorite-marque`,
  `analyse-opposition-marque`, `mise-en-demeure-pi`, `tri-contrefacon` ;
- mettre a jour README et changelog PI.

## Out of Scope

- automation externe du watcher ;
- opposition au fond ;
- mise en demeure ;
- analyse de confusion finale ;
- modification du serveur MCP ou des tools sources ;
- surveillance des noms de domaine ou marketplaces.

# V2 Skill Contract

## Mode Families

Le skill conserve ses modes publics existants, mais leur role est clarifie :

- `report` : detection, deduplication, priorisation, routage
- `add` : ajout d'une entree de watchlist
- `update` : mise a jour d'une entree existante
- `remove` : suppression avec garde-fous
- `list` : lecture synthese
- `audit` : hygiene structurelle de la watchlist

## Report Input Contract

Avant l'execution du rapport, le skill expose ou derive :

- `report_scope`: `fr-only`, `fr-eu`, `custom`
- `window_days`: entier 1-30
- `source_coverage`: `inpi-only`, `inpi-euipo`, `partial`, `none`
- `watchlist_status`: `ready`, `empty`, `stale`, `invalid`
- `deduplication_mode`: `watchlist-history`, `none`

Faits a rendre visibles ensuite :

- `watch_count`
- `territories_covered`
- `publications_detected`
- `already_notified_count`
- `urgent_hits_count`
- `coverage_gaps`

## Monitoring Gate

Le mode `report` ne doit pas produire un faux rapport exploitable si :
- la watchlist est vide ;
- aucune source utile n'est disponible ;
- la fenetre demandee depasse le cadre supporte ;
- les entrees principales sont invalides ou trop generiques.

Dans ces cas, la sortie doit rester exploitable mais conclure en gate rouge ou
en routage ferme, pas en faux "aucun signal".

# Boundaries With Other Skills

## `recherche-anteriorite-marque`

Frontiere :
- `surveillance-marque` detecte et priorise ;
- `recherche-anteriorite-marque` analyse le risque de confusion au premier
  passage sur un signe ou un depot detecte.

Regle :
- toute alerte actionnable qui exige une evaluation plus fine doit router vers
  `recherche-anteriorite-marque` avant toute opposition serieuse.

## `analyse-opposition-marque`

Frontiere :
- `surveillance-marque` ne traite pas le fond de l'opposition ;
- `analyse-opposition-marque` intervient quand une opposition recevable ou une
  reponse d'opposition est la vraie question.

Regle :
- une alerte en fenetre critique n'est pas automatiquement un dossier
  d'opposition ; elle devient un routage vers opposition quand le gate procedurale
  et la base factuelle le justifient.

## `mise-en-demeure-pi`

Frontiere :
- `surveillance-marque` suit des publications ou signaux de registre ;
- `mise-en-demeure-pi` traite une lettre precontentieuse structuree.

Regle :
- ne jamais router vers `mise-en-demeure-pi` sur la seule base d'une
  publication de marque sans usage litigieux exploite ou sans strategie
  humaine explicite.

## `tri-contrefacon`

Frontiere :
- `tri-contrefacon` intervient sur des usages litigieux deja exploites ;
- `surveillance-marque` reste sur la publication et la veille.

Regle :
- pas de bascule enforcement automatique a partir du seul BOPI / TMview.

# Output Contract

Le mode `report` doit produire les blocs suivants.

## 1. Monitoring Scope and Gate

Contient :
- fenetre ;
- sources ;
- etat watchlist ;
- gate global.

## 2. Watchlist Coverage Snapshot

Contient :
- nombre d'entrees ;
- territoires couverts ;
- entrees effectivement executees ;
- trous de couverture.

## 3. Urgent Opposition Window

Contient :
- alertes avec opposition proche ou immediate ;
- rationale de severite ;
- route de revue.

## 4. Prepare-to-Review Window

Contient :
- alertes significatives encore preparables ;
- fenetre de travail restante ;
- prochaines actions recommandees.

## 5. Monitor-and-Hold Window

Contient :
- nouveaux depots a faible urgence ;
- motifs de maintien en veille ;
- eventuels points de degradation a surveiller.

## 6. Agent-Managed or External Coverage

Contient :
- entrees watchlist externalisees ou suivies hors skill ;
- points de coordination manquants.

## 7. Data Quality and Coverage Gaps

Contient :
- erreurs de source ;
- trous de watchlist ;
- entrees trop generiques ou invalides ;
- absence de base exploitable.

## 8. Decision Routing

Valeurs fermees :
- `run-first-pass-confusion-review`
- `prepare-opposition-review`
- `keep-monitoring`
- `fix-watchlist-entry`
- `expand-source-coverage`
- `escalate-human-review`
- `insufficient-monitoring-record`

## 9. Human Validation

Bloc final obligatoire :
- rappeler que la surveillance n'est pas une opinion ;
- rappeler le role du mandataire ou de l'avocat ;
- rappeler les limites de source et les `[a verifier]`.

# Mode Admin Expectations

## `add`

Doit :
- exiger un mot-cle ou signe exploitable ;
- forcer une classe ou un motif explicite d'absence ;
- fixer les territoires ;
- capter le niveau d'alerte et le business owner si utile.

## `update`

Doit :
- afficher l'entree cible ;
- limiter les edits ambigus ;
- conserver un statut comprehensible de suivi.

## `remove`

Doit :
- imposer confirmation ;
- durcir la confirmation pour les entrees hautes priorites.

## `list`

Doit :
- rester synthese et lisible ;
- exposer seulement les champs utiles a la gestion.

## `audit`

Doit :
- identifier doublons, genericite, stale entries et trous de classes/territoires ;
- produire des recommandations de nettoyage, pas un faux rapport de fond.

# Error Handling

Le skill doit traiter explicitement :
- watchlist vide ;
- source INPI indisponible ;
- source EUIPO absente ou partielle ;
- entree trop generique ;
- entree stale ;
- fenetre hors limites ;
- donnees historiques incoherentes ;
- publications deja notifiees.

Dans ces cas, la sortie doit expliquer la limite et router proprement.

# Testing and Review Targets

La migration V2 doit etre verifiee au minimum sur :

1. `report` FR seul avec alertes severes ;
2. `report` FR + EU avec couverture partielle ;
3. watchlist vide ;
4. `audit` avec doublons et genericite ;
5. alerte BOPI qui route vers `recherche-anteriorite-marque` ;
6. cas qui ne doit PAS router vers enforcement.

# Documentation Updates

Mettre a jour :
- `plugins/hacienda-propriete-intellectuelle/README.md`
- `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

Le README doit presenter `surveillance-marque` comme :
- une brique stricte de surveillance et de priorisation ;
- distincte de la recherche premier passage ;
- distincte de l'opposition au fond ;
- distincte de l'enforcement.

# Assumptions

- la lane marques V2 deja migree reste la reference de frontiere ;
- le nom public `surveillance-marque` est conserve ;
- les modes publics existants sont conserves ;
- la migration est structurelle, pas un changement de toolset ou d'integration
  live.
