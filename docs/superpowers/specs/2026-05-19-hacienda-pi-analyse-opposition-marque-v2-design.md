# Spec - analyse-opposition-marque V2

## Summary

`analyse-opposition-marque` reste le skill public du plugin pour preparer une
opposition INPI ou une defense a opposition recue. La V2 conserve le coeur du
skill comme **analyse argumentaire INPI stricte**, sans le transformer en
orchestrateur general de la lane marques.

La nouveaute de structure est la suivante :

- contrat d'entree V2 explicite ;
- frontieres plus nettes avec recherche, depot, surveillance et contentieux ;
- sortie normalisee par blocs stables ;
- branche transaction/coexistence formalisée, mais **subordonnee** a l'analyse
  d'opposition, jamais equivalente a elle.

## Problem

Le skill actuel est doctrinalement riche et deja tres exploitable. En revanche,
il reste encore structure comme un grand memo proceduriel.

Les ecarts a corriger sont :

- contrat d'entree encore trop narratif ;
- frontiere insuffisamment explicite avec `recherche-anteriorite-marque`,
  `surveillance-marque`, `depot-marque-fr` et `contentieux-pi` ;
- branche coexistence/transaction presente, mais pas assez bornee comme issue
  strategique secondaire ;
- sortie moins standardisee que les V2 recents du plugin.

## Goals

1. Garder `analyse-opposition-marque` comme skill **argumentaire INPI**.
2. Stabiliser un contrat d'entree V2 utilisable en `form` et `respond`.
3. Formaliser une branche transaction/coexistence comme option strategique
   secondaire, jamais comme substitut silencieux de l'analyse d'opposition.
4. Rendre explicites les handoffs avec :
   - `recherche-anteriorite-marque`
   - `surveillance-marque`
   - `depot-marque-fr`
   - `contentieux-pi`
5. Normaliser la sortie en blocs stables, reutilisables par avocat,
   mandataire, direction et workflow interne.

## Non-Goals

- Ne pas deposer l'opposition formelle INPI.
- Ne pas rediger la tele-procedure officielle complete.
- Ne pas faire une clearance marque initiale.
- Ne pas remplacer un contentieux judiciaire si le dossier a deja bascule
  hors de la procedure d'opposition INPI.
- Ne pas faire de la coexistence un mode principal autonome du skill.

## Positioning

Le skill doit etre formule comme la brique **opposition INPI** de la lane
marques :

1. recherche / surveillance / publication detectee
2. `analyse-opposition-marque`
3. selon issue :
   - depot opposition / memoire en defense
   - coexistence / limitation / sortie negociee
   - escalation vers contentieux judiciaire si necessaire

La coexistence reste une **issue** du dossier, pas un skill rival au coeur
du workflow.

## Input Contract

Le skill doit expliciter un contrat V2 avec :

- `mode` : `form`, `respond`
- `opposition_basis` :
  - `likelihood-of-confusion`
  - `reputation`
  - `other-prior-right`
  - `mixed`
- `procedure_stage` :
  - `pre-filing-window`
  - `drafting`
  - `filed-waiting-response`
  - `response-window`
  - `reply-phase`
  - `decision-pending`
- `filing_deadline_status` :
  - `green`
  - `amber`
  - `red`
  - `expired`
- `evidence_strength` :
  - `strong`
  - `mixed`
  - `weak`
  - `unknown`

Le bloc de faits doit ensuite exposer :

- `target_mark`
- `opposing_rights`
- `publication_or_notification_date`
- `goods_services_overlap`
- `argument_scope`
- `settlement_posture`
- `search_and_record_limitations`

## Coverage Rules

### Procedural Gate

La V2 doit rendre visible en tete :

- si le delai est encore exploitable ;
- si le dossier est en formation ou en defense ;
- si les informations procedurales sont suffisantes pour une note fiable ;
- si une restauration ou une autre voie doit etre seulement flaggee `[a verifier]`.

### Opposition Grounds

Le skill doit continuer a decomposer les motifs CPI, mais sous un contrat plus
stable :

- droit anterieur invoque ;
- branche(s) juridiques pertinentes ;
- force apparente ;
- pieces critiques ;
- points de fragilite.

### Settlement / Coexistence Branch

La branche coexistence/transaction doit etre formalisée comme une couche
strategique distincte :

- proposee seulement si coherent avec la posture du dossier ;
- jamais substituee silencieusement a l'analyse opposition ;
- toujours rattachee a un niveau de risque, de preuve et de calendrier.

## Routing Boundaries

### Route to `recherche-anteriorite-marque`

Quand le sujet est encore un premier passage sur un signe, sans publication
BOPI ou notification d'opposition exploitable.

### Route to `surveillance-marque`

Quand le besoin principal est le suivi des publications ou la detection
systematique de nouvelles marques, pas encore l'analyse d'une opposition
identifiee.

### Route to `depot-marque-fr`

Quand le sujet principal redevient la preparation du depot ou la limitation
du libelle en amont, sans vrai dossier d'opposition forme.

### Route to `contentieux-pi`

Quand le dossier a deja bascule vers une logique judiciaire, de recours ou
d'action contentieuse hors du perimetre normal de la procedure d'opposition
INPI.

## Output Contract

Le skill doit produire 8 blocs stables :

1. `Procedure Gate and Deadline`
2. `Rights and Grounds Snapshot`
3. `Arguments and Counter-Arguments Map`
4. `Evidence and Record Gaps`
5. `Procedural Strategy`
6. `Settlement and Coexistence Option`
7. `Decision Routing`
8. `Human Validation`

## Decision Routing Values

Les issues V2 doivent etre bornees a :

- `file-opposition`
- `prepare-defense`
- `seek-coexistence`
- `limit-goods-services`
- `escalate-to-contentieux`
- `insufficient-record`
- `deadline-critical`

## Compatibility Notes

- Le garde-fou "analyse argumentaire, pas procedure officielle" doit rester
  visible en tete de sortie.
- Les modes `--form` et `--respond` restent les deux entrees publiques.
- La coexistence est preservee, mais comme branche secondaire et bornee.
- Les integrations INPI et la chronologie BOPI doivent rester decrites
  honnetement quand elles manquent ou sont partielles.

## Files

- Modify:
  - `plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/README.md`
  - `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
- Create:
  - `plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/references/analyse-opposition-marque-routing-and-output.md`
