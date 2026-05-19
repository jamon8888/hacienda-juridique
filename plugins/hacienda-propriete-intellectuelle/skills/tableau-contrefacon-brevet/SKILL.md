---
name: tableau-contrefacon-brevet
description: >
  Claim chart brevet V2 offensif strict pour confronter un brevet et un
  produit ou procede cible, element par element, avant revue humaine. Ce skill
  ne qualifie pas juridiquement la contrefacon et ne remplace ni la mise en
  demeure, ni la saisie, ni la strategie contentieuse.
argument-hint: "[brevet | produit/procede cible | literal/equivalence/both]"
---

# Skill - Tableau contrefacon brevet V2

> **Confrontation technique, pas qualification de contrefacon.**
> `tableau-contrefacon-brevet` produit un claim chart offensif strict,
> destine a confronter un brevet et un produit ou procede cible. Il ne
> qualifie pas juridiquement la contrefacon, ne construit pas une defense,
> ne redige pas la mise en demeure et ne remplace pas la strategie
> contentieuse.

Reference de travail utile :
`references/tableau-contrefacon-brevet-routing-and-output.md`

## Positionnement

`tableau-contrefacon-brevet` sert a :

1. selectionner les revendications offensives utiles ;
2. comparer element par element avec la preuve produit ;
3. separer litteralite, equivalence et inconnus ;
4. evaluer la readiness du claim chart ;
5. router vers la bonne suite enforcement.

Le skill est strictement offensif. Il ne doit pas absorber :

- la defense contre un claim chart adverse ;
- la nullite / invalidite du brevet oppose ;
- la strategie judiciaire generale.

## Ce skill ne fait pas

- ne conclut pas a la contrefacon ;
- ne produit pas une defense contre une allegation adverse ;
- n'attaque pas la validite du brevet en profondeur ;
- ne redige pas la mise en demeure ;
- ne prepare pas la requete de saisie complete ;
- ne remplace pas `contentieux-pi`.

## Contrat d'entree V2

Le skill doit expliciter ou deriver :

- `assertion_mode`: `literal`, `equivalence`, `both`
- `patent_status`: `fr`, `ep-fr`, `pct-fr`, `unknown`
- `evidence_coverage`: `strong`, `mixed`, `weak`, `none`
- `claim_scope_status`: `independent-only`,
  `independent-plus-key-dependent`, `unclear`
- `enforcement_goal`: `cease-and-desist`, `seizure-prep`,
  `litigation-prep`, `internal-review`

Bloc de faits minimum :

- `patent_reference`
- `claims_targeted`
- `product_or_process_target`
- `technical_sources_used`
- `fr_market_status`
- `commercial_context`
- `known_missing_evidence`

## Chargement du profil pratique

Avant tout, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Rattacher ensuite :

- le role utilisateur ;
- la posture enforcement ;
- les approbateurs ;
- le mandataire ou avocat de validation ;
- les integrations et sources techniques disponibles.

Si le profil contient `[A CONFIGURER]`, le dire explicitement et tagger la
sortie `[PROVISOIRE]`.

## Intake

Demander en un seul batch, puis mapper la reponse au contrat V2 :

1. reference du brevet et revendications visees ;
2. produit ou procede cible ;
3. sources techniques disponibles ;
4. theorie souhaitee : `literal`, `equivalence`, `both` ;
5. objectif enforcement ;
6. contexte commercial FR ;
7. preuves ou lacunes deja connues.

Guidance de mapping minimale :

- brevet FR en vigueur ou exploite sur FR -> `patent_status: fr`
- brevet EP avec partie FR utile -> `patent_status: ep-fr`
- route PCT / titre encore flou sur FR -> `patent_status: pct-fr`
- seulement revendication independante -> `claim_scope_status: independent-only`
- independante + dependantes cles -> `claim_scope_status: independent-plus-key-dependent`
- documentation produit riche et technique -> `evidence_coverage: strong`
- documentation utile mais incomplete -> `evidence_coverage: mixed`
- documentation maigre ou partiale -> `evidence_coverage: weak`
- quasi aucune documentation exploitable -> `evidence_coverage: none`

Si la documentation produit est trop maigre, le skill doit le dire tout de
suite et baisser le gate plutot que remplir les trous par speculation.

## Chart Readiness Gate

Le skill doit conclure explicitement sur :

- `ready`
  - revendications exploitables
  - documentation produit/procede suffisante
  - mapping elementaire faisable
- `partial`
  - base exploitable mais lacunaire
  - certains elements restent `unknown` ou `review`
- `blocked`
  - brevet ou revendications non exploitables
  - documentation produit trop pauvre
  - theorie d'equivalence sans base minimale

Checks de gate minimaux :

- revendications cibles lisibles et assez stables ;
- preuve produit/procede exploitable ;
- objectif enforcement coherent ;
- base suffisante pour un mapping serieux.

Si `evidence_coverage = none`, le skill doit bloquer.

Si `assertion_mode = equivalence` et qu'aucune base technique minimale
ne permet d'exposer fonction / moyen / resultat, le skill doit bloquer
ou basculer en `partial` tres reserve.

## Mapping discipline

Le coeur du skill reste un claim chart element par element.

Pour chaque element revendique, il faut :

- isoler l'element de revendication ;
- rattacher une preuve produit ou procede ;
- attribuer un statut ferme ;
- noter l'incertitude ou l'interpretation utile.

## Literal Mapping Table

Colonnes minimales :

- `claim element`
- `product evidence`
- `status`
- `comment`

Statuts :

- `match`
- `possible-match`
- `no-match`
- `unknown`

Le skill ne doit pas transformer un manque documentaire en `no-match` par
defaut. Quand la preuve manque, le statut reste `unknown`.

## Equivalence Review

Actif seulement si `assertion_mode = equivalence` ou `both`.

Analyser :

- fonction
- moyen
- resultat

Ne jamais maquiller les points fragiles. Les elements douteux restent
`[review]` ou `unknown`.

Le bloc doit aussi dire quand l'equivalence semble trop fragile pour
soutenir une escalade immediate.

## Frontieres de routage

- `mise-en-demeure-pi` : si le claim chart supporte une offensive ecrite
- `saisie-contrefacon` : si le besoin devient l'acquisition probatoire
- `contentieux-pi` : si le besoin devient la strategie judiciaire globale
- `anteriorite-invalidite` : si la vraie question devient la validite ou la defense
- `recherche-anteriorite-brevet` : si la vraie question est le prior art amont

## Format de sortie V2

La sortie doit etre structuree ainsi :

1. `Case Snapshot`
2. `Patent and Claim Scope`
3. `Evidence Coverage`
4. `Literal Mapping Table`
5. `Equivalence Review`
6. `Critical Gaps and Unknowns`
7. `Enforcement Use Assessment`
8. `Decision Routing`
9. `Human Validation`

### 1. `Case Snapshot`

- brevet ;
- produit/procede ;
- objectif enforcement ;
- mode d'assertion ;
- statut global.

### 2. `Patent and Claim Scope`

- revendications cibles ;
- statut de scope ;
- limites visibles du perimetre retenu.

### 3. `Evidence Coverage`

- sources techniques exploitees ;
- qualite de couverture ;
- trous documentaires ;
- effet pratique sur la fiabilite du chart.

### 4. `Literal Mapping Table`

- tableau element par element ;
- application stricte des quatre statuts fermes ;
- commentaires courts, sourcables et lisibles.

### 5. `Equivalence Review`

- actif uniquement si la theorie le justifie ;
- elements non litteraux potentiellement equivalents ;
- fonction / moyen / resultat ;
- points fragiles a reviewer.

### 6. `Critical Gaps and Unknowns`

- trous de preuve critiques ;
- elements ambigus ;
- points de fragilite qui empechent toute escalade propre.

### 7. `Enforcement Use Assessment`

- utilite du claim chart pour :
  - mise en demeure
  - saisie
  - action
- ce que le tableau supporte ;
- ce qu'il ne supporte pas encore.

### 8. `Decision Routing`

Conclure avec une seule valeur :

- `prepare-cease-and-desist`
- `prepare-seizure-brief`
- `prepare-litigation-brief`
- `fill-evidence-gaps`
- `re-scope-claims`
- `route-to-invalidity-defense`
- `hold-insufficient-basis`

Associer la valeur choisie a 2-4 actions concretes et a sa justification.

### 9. `Human Validation`

- ce qui doit etre valide par le mandataire ou l'avocat ;
- ce qui reste `[a verifier]` ;
- reserve explicite sur la qualification juridique.

## Regles de surete

- Le garde-fou "confrontation technique, pas qualification de contrefacon"
  doit rester visible.
- Le `Chart Readiness Gate` doit etre explicite.
- Une preuve produit faible ou absente ne doit jamais etre maquillee.
- La branche equivalence ne doit jamais produire un faux sentiment de force.
- Le skill doit rester offensif strict et router la defense / invalidite
  ailleurs.

## Rappel final a conserver

- claim chart offensif strict uniquement ;
- jamais qualification juridique de contrefacon ;
- validation humaine obligatoire avant mise en demeure, saisie ou contentieux.
