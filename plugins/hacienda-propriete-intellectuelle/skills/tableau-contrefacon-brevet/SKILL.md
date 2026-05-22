---
name: tableau-contrefacon-brevet
version: "2.0.0"
description: >
  Claim chart brevet V2 offensif strict pour confronter un brevet et un
  produit ou procédé cible, élément par élément, avant revue humaine. Ce skill
  ne qualifié pas juridiquement la contrefaçon et ne remplace ni la mise en
  demeure, ni la saisie, ni la stratégie contentieuse.
argument-hint: "[brevet | produit/procédé cible | literal/equivalence/both]"
---

# Skill - Tableau contrefaçon brevet V2

> **Confrontation technique, pas qualification de contrefaçon.**
> `tableau-contrefacon-brevet` produit un tableau de contrefaçon offensif strict,
> destiné à confronter un brevet et un produit ou procédé cible. Il ne
> qualifié pas juridiquement la contrefaçon, ne construit pas une défense,
> ne rédige pas la mise en demeure et ne remplace pas la stratégie
> contentieuse.

Référence de travail utile :
`references/tableau-contrefacon-brevet-routing-and-output.md`

## Positionnement

`tableau-contrefacon-brevet` sert à :

1. selectionner les revendications offensives utiles ;
2. comparer élément par élément avec la preuve produit ;
3. séparer littéralité, equivalence et inconnus ;
4. évaluer la préparation du tableau de contrefaçon ;
5. router vers la bonne suite enforcement.

Le skill est strictement offensif. Il ne doit pas absorber :

- la défense contre un tableau de contrefaçon adverse ;
- la nullité / invalidité du brevet oppose ;
- la stratégie judiciaire generale.

## Ce skill ne fait pas

- ne conclut pas à la contrefaçon ;
- ne produit pas une défense contre une allégation adverse ;
- n'attaque pas la validité du brevet en profondeur ;
- ne rédige pas la mise en demeure ;
- ne prépare pas la requête de saisie complète ;
- ne remplace pas `contentieux-pi`.

## Contrat d'entrée V2

Le skill doit expliciter ou dériver :

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

1. `~/.claude/extensions/config/hacienda-juridique/company-profile.md`
2. `~/.claude/extensions/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Rattacher ensuite :

- le rôle utilisateur ;
- la posture enforcement ;
- les approbateurs ;
- le mandataire ou avocat de validation ;
- les integrations et sources techniques disponibles.

Si le profil contient `[A CONFIGURER]`, le dire explicitement et tagger la
sortie `[PROVISOIRE]`.

## Cadrage initial

Demander en un seul batch, puis mapper la réponse au contrat V2 :

1. référence du brevet et revendications visées ;
2. produit ou procédé cible ;
3. sources techniques disponibles ;
4. theorie souhaitee : `literal`, `equivalence`, `both` ;
5. objectif enforcement ;
6. contexte commercial FR ;
7. preuves ou lacunes déjà connues.

Guidance de mapping minimale :

- brevet FR en vigueur ou exploité sur FR -> `patent_status: fr`
- brevet EP avec partie FR utile -> `patent_status: ep-fr`
- route PCT / titre encore flou sur FR -> `patent_status: pct-fr`
- seulement revendication independante -> `claim_scope_status: independent-only`
- independante + dependantes cles -> `claim_scope_status: independent-plus-key-dependent`
- documentation produit riche et technique -> `evidence_coverage: strong`
- documentation utile mais incomplète -> `evidence_coverage: mixed`
- documentation maigre ou partiale -> `evidence_coverage: weak`
- quasi aucune documentation exploitable -> `evidence_coverage: none`

Si la documentation produit est trop maigre, le skill doit le dire tout de
suite et baisser le seuil plutôt que remplir les trous par spéculation.

## Seuil de préparation du tableau

Le skill doit conclure explicitement sur :

- `ready`
  - revendications exploitables
  - documentation produit/procédé suffisante
  - mapping élémentaire faisable
- `partial`
  - base exploitable mais lacunaire
  - certains éléments restent `unknown` ou `review`
- `blocked`
  - brevet ou revendications non exploitables
  - documentation produit trop pauvre
  - theorie d'equivalence sans base minimale

Contrôles minimaux du seuil :

- revendications cibles lisibles et assez stables ;
- preuve produit/procédé exploitable ;
- objectif enforcement cohérent ;
- base suffisante pour un mapping sérieux.

Si `evidence_coverage = none`, le skill doit bloquer.

Si `assertion_mode = equivalence` et qu'aucune base technique minimale
ne permet d'exposer fonction / moyen / resultat, le skill doit bloquer
ou basculer en `partial` tres réserve.

## Mapping discipline

Le cœur du skill reste un tableau de contrefaçon élément par élément.

Pour chaque élément revendiqué, il faut :

- isoler l'élément de revendication ;
- rattacher une preuve produit ou procédé ;
- attribuer un statut fermé ;
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
défaut. Quand la preuve manque, le statut reste `unknown`.

## Revue de l'équivalence

Actif seulement si `assertion_mode = equivalence` ou `both`.

Analyser :

- fonction
- moyen
- resultat

Ne jamais maquiller les points fragiles. Les éléments douteux restent
`[review]` ou `unknown`.

Le bloc doit aussi dire quand l'equivalence semble trop fragile pour
soutenir une escalade immédiate.

## Frontieres de routage

- `mise-en-demeure-pi` : si le tableau de contrefaçon supporté une offensive ecrite
- `saisie-contrefacon` : si le besoin devient l'acquisition probatoire
- `contentieux-pi` : si le besoin devient la stratégie judiciaire globale
- `anteriorite-invalidite` : si la vraie question devient la validité ou la défense
- `recherche-anteriorite-brevet` : si la vraie question est le prior art amont

## Format de sortie V2

La sortie doit être structurée ainsi :

1. `Synthèse du dossier`
2. `Brevet et portée des revendications`
3. `Couverture probatoire`
4. `Literal Mapping Table`
5. `Revue de l'équivalence`
6. `Critical Gaps and Unknowns`
7. `Enforcement Use Assessment`
8. `Routage de décision`
9. `Validation humaine`

### 1. `Synthèse du dossier`

- brevet ;
- produit/procédé ;
- objectif enforcement ;
- mode d'assertion ;
- statut global.

### 2. `Brevet et portée des revendications`

- revendications cibles ;
- statut de scope ;
- limites visibles du périmètre retenu.

### 3. `Couverture probatoire`

- sources techniques exploitees ;
- qualité de couverture ;
- trous documentaires ;
- effet pratique sur la fiabilité du chart.

### 4. `Literal Mapping Table`

- tableau élément par élément ;
- application stricte des quatre statuts fermés ;
- commentaires courts, sourcables et lisibles.

### 5. `Revue de l'équivalence`

- actif uniquement si la theorie le justifie ;
- éléments non littéraux potentiellement équivalents ;
- fonction / moyen / resultat ;
- points fragiles à revoir.

### 6. `Critical Gaps and Unknowns`

- trous de preuve critiques ;
- éléments ambigus ;
- points de fragilite qui empechent toute escalade propre.

### 7. `Enforcement Use Assessment`

- utilite du tableau de contrefaçon pour :
  - mise en demeure
  - saisie
  - action
- ce que le tableau supporté ;
- ce qu'il ne supporté pas encore.

### 8. `Routage de décision`

Conclure avec une seule valeur :

- `prepare-cease-and-desist`
- `prepare-seizure-brief`
- `prepare-litigation-brief`
- `fill-evidence-gaps`
- `re-scope-claims`
- `route-to-invalidity-defense`
- `hold-insufficient-basis`

Associer la valeur choisie à 2-4 actions concrètes et à sa justification.

### 9. `Validation humaine`

- ce qui doit être valide par le mandataire ou l'avocat ;
- ce qui reste `[à vérifier]` ;
- réserve explicite sur la qualification juridique.

## Règles de sûreté

- Le garde-fou "confrontation technique, pas qualification de contrefaçon"
  doit rester visible.
- Le `Chart Readiness Gate` doit être explicite.
- Une preuve produit faible ou absente ne doit jamais être maquillee.
- La branche equivalence ne doit jamais produire un faux sentiment de force.
- Le skill doit rester offensif strict et router la défense / invalidité
  ailleurs.

## Rappel final à conserver

- tableau de contrefaçon offensif strict uniquement ;
- jamais qualification juridique de contrefaçon ;
- validation humaine obligatoire avant mise en demeure, saisie ou contentieux.
