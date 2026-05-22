---
name: depot-dessin-modele
description: >
  Préparation stricte d'un brouillon de dossier de dépôt de dessin ou modèle
  enregistré, centré sur les voies `fr`, `eu`, `hague`, `sequenced`, avec
  `Seuil de préparation du dépôt`, sorties stabilisées et validation humaine finale.
version: "2.0.0"
argument-hint: "[fr|eu|hague|sequenced]"
authors: ["Hacienda"]
tags:
  [
    dessins-modèles,
    dépôt,
    INPI,
    EUIPO,
    La-Haye,
    Locarno,
    reproductions,
    V2,
  ]
---

# Skill — Dépôt dessin ou modèle V2

> **BROUILLON DE DOSSIER, PAS DÉPÔT EFFECTIF.**
>
> Ce skill prépare un brouillon de dossier de dépôt de dessin ou modèle
> enregistré. Il ne remplace ni la recherche d'antériorités, ni l'analyse de
> contrefaçon, ni le dépôt effectif devant l'office. Il ne transforme pas
> `DMCNE` en filing voie autonome.

## Rôle strict

Le skill :

- prépare un dossier de dépôt de dessin ou modèle enregistré ;
- reste borné aux voies `fr`, `eu`, `hague`, `sequenced` ;
- applique un `Seuil de préparation du dépôt` avant toute sortie exploitable ;
- garde `DMCNE` uniquement comme signal ou solution de repli secondaire borné ;
- produit un brouillon soumis à validation humaine par avocat, juriste ou
  mandataire.

Le skill ne fait pas :

- la recherche d'antériorités au fond ;
- l'analyse de contrefaçon D&M ;
- le dépôt effectif auprès de l'INPI, de l'EUIPO ou de l'OMPI ;
- un mémo autonome sur le DMCNE ;
- une validation juridique finale.

## Sources et garde-fous

- Prioriser `hacienda-sources-officielles` pour les exigences d'office, taxes,
  formulaires et références officielles.
- Toute source non consultée reste marquée `[à vérifier]`.
- Distinguer faits, droit, analyse, incertitudes, décisions et validation
  humaine.
- Si le dossier est incomplet, conserver les marqueurs `[PROVISOIRE]`,
  `[à vérifier]`, `[À COMPLÉTER]`.
- Mettre les reproductions au centre du risque de qualité.

## Chargement du profil

Charger si disponible :

- préférences d'office et de territoire ;
- secteur dominant du client ;
- politique habituelle de priorité et d'ajournement ;
- circuit de validation humaine.

## Contrat d'entrée V2

### Closed cadrage initial contract

- `filing_lane`: `fr` | `eu` | `hague` | `sequenced`
- `design_status`: `new` | `possibly-disclosed` | `already-disclosed` | `uncertain`
- `filing_scope`: `single` | `multiple`
- `priority_status`: `none` | `available` | `expiring` | `lost`
- `publication_strategy`: `immediate` | `deferred` | `undecided`
- `visual_readiness`: `complete` | `partial` | `weak` | `blocked`
- `classification_status`: `clear` | `mixed` | `uncertain`

### Faits minimums

Ne jamais présenter le dossier comme prêt au dépôt si manquent :

- design ou série de designs visée ;
- visuels disponibles ;
- produit ou indication produit ;
- déposant ;
- créateur ;
- territoire visé ;
- posture simple ou multiple ;
- priorité oui/non et date si invoquée ;
- choix ou état d'ajournement.

## Seuil de préparation du dépôt

Le skill doit qualifier le dossier avec une seule valeur :

- `ready`
- `partial`
- `blocked`

### `ready`

Le dossier permet un brouillon de dépôt exploitable, sous réserve de validation
humaine finale.

### `partial`

Le dossier permet un brouillon structuré, mais des briques restent à compléter :

- vues manquantes ;
- Locarno incertain ;
- priorité non sécurisée ;
- ajournement non arbitré ;
- dépôt multiple à rationaliser.

Dans ce cas, maintenir visiblement :

- `[PROVISOIRE]`
- `[à vérifier]`
- `[À COMPLÉTER]`

### `blocked`

Bloquer le skill si :

- reproductions insuffisantes ;
- Locarno trop incertain ;
- déposant ou créateur mal identifiés ;
- nouveauté possiblement détruite sans clarification ;
- priorité mal documentée ;
- dépôt multiple incohérent.

## Frontieres obligatoires

### Router vers `recherche-anteriorite-dm`

Basculer si le vrai point dominant devient :

- la robustesse de la nouveauté ;
- la divulgation antérieure ;
- le caractère individuel ;
- la recherche d'antériorités manquante.

### Router vers `contrefacon-dessin-modele`

Basculer si la question devient surtout :

- l'impression globale entre titres ou produits compares ;
- des actes argués de reproduction, offre, commercialisation ou importation ;
- une posture défensive ou contentieuse ;
- un besoin de preuve ou de reaction aval.

### Rester dans `depot-dessin-modele`

Rester dans ce skill si le sujet principal est la préparation d'un dépôt
enregistré, même si la priorité, l'ajournement, les taxes ou le sequencing
restent à arbitrer.

## Structure de voie

### `fr`

Utiliser pour un dépôt français auprès de l'INPI quand le besoin principal
reste France et que la structure du dossier peut être portée par un dépôt
national.

Points à traiter :

- produit et indication produit en français ;
- créateur correctement désigné ;
- cohérence du simple ou multiple ;
- compatibilité des reproductions avec les exigences INPI ;
- publication immédiate ou différée selon la stratégie retenue.

### `eu`

Utiliser pour un dépôt auprès de l'EUIPO quand la protection ciblee est
l'Union europeenne.

Points à traiter :

- cohérence des dessins dans un multiple ;
- qualification de la publication immédiate ou différée ;
- dépendance des taxes au nombre de dessins ;
- risque de divulgation déjà intervenue en UE ou hors UE ;
- articulation avec une éventuelle priorité encore disponible.

### `hague`

Utiliser pour une trajectoire OMPI / systeme de La Haye quand plusieurs
désignations internationales sont visées.

Points à traiter :

- liste des désignations ;
- dépendance du coût à la désignation ;
- vérification des exigences de representation et de publication ;
- articulation avec une priorité et avec une désignation UE éventuelle ;
- validation humaine renforcee en cas de divergences de périmètre.

### `sequenced`

Utiliser pour une stratégie sequentielle, par exemple FR puis extension UE ou
internationale, lorsque la priorité reste tactiquement utile.

Points à traiter :

- premier dépôt ou dépôt source ;
- date de priorité, délai restant, risque d'expiration ;
- ordre des dépôts à venir ;
- cohérence entre le premier visuel, les reproductions ultérieures et le
  périmètre produit ;
- justification economique et territoriale du sequencing.

## Axes d'analyse stables

### 1. Sélection office et voie

Justifier le choix entre :

- `fr`
- `eu`
- `hague`
- `sequenced`

Expliquer en quelques lignes :

- le territoire utile ;
- la logique de sequencing si applicable ;
- les preconditions specifiques à l'office ;
- les points qui restent `[à vérifier]`.

### 2. Design And Product Definition

Rendre lisibles :

- le design ou la série de designs ;
- le produit ou l'indication produit ;
- la classe Locarno et son niveau de certitude ;
- la posture `single` ou `multiple` ;
- la cohérence interne du multiple.

### 3. Reproductions et périmètre visuel

Traiter en priorité :

- nombre et qualité des vues ;
- cohérence visuelle entre vues ;
- parties revendiquees / non revendiquees ;
- suffisance des reproductions pour définir l'étendue du titre ;
- travaux visuels encore nécessaires.

### 4. Priorité et stratégie de publication

Toujours traiter :

- priorité oui/non ;
- délai restant ou perte de priorité ;
- publication immédiate ou différée ;
- intérêt de l'ajournement ;
- effet de la divulgation déjà intervenue.

### 5. Taxes et mécanique de dépôt

Toujours rendre visibles :

- taxes attendues ;
- dépendance au nombre de dessins ;
- dépendance à l'ajournement ;
- dépendance à l'office choisi ;
- tout montant ou bareme restant `[à vérifier]` si la source primaire n'a pas
  été consultée.

## Signal secondaire `DMCNE`

Le bloc `DMCNE` sert uniquement à signaler :

- une possible divulgation antérieure ;
- une possible posture résiduelle de dessin ou modèle communautaire non
  enregistré ;
- le besoin d'une analyse complémentaire aval.

`DMCNE` n'est jamais une voie de filing. Le coeur du skill reste le dépôt
enregistré.

## Routage de décision fermé

La sortie doit se terminer par une seule route principale :

- `prepare-fr-filing`
- `prepare-eu-filing`
- `prepare-hague-filing`
- `prepare-sequenced-filing`
- `hold-for-prior-art-review`
- `hold-for-visual-cleanup`
- `signal-unregistered-eu-design-posture`
- `hold-insufficient-basis`

## Sortie V2 stable

Produire exactement les 9 blocs suivants :

1. `Synthèse du dossier`
2. `Seuil de préparation du dépôt`
3. `Office et voie de dépôt`
4. `Design And Product Definition`
5. `Reproductions And Visual Scope`
6. `Priority And Publication Strategy`
7. `Fees And Filing Mechanics`
8. `Routage de décision`
9. `Validation humaine`

## Format de sortie

```markdown
# Dossier depot D&M — [NOM DOSSIER]

## 1. Synthèse du dossier
- Faits : [design, produit, territoire, deposant, createur]
- Droit : [base de depot et office cible]
- Analyse : [resume bref]
- Incertitudes : [points [à vérifier] ou [À COMPLÉTER]]

## 2. Filing Readiness Gate
- Gate : `ready|partial|blocked`
- Motifs : [liste courte]
- Effet : [ce qui peut ou ne peut pas etre produit]

## 3. Office et voie de dépôt
- Lane retenue : `fr|eu|hague|sequenced`
- Justification : [pourquoi cette lane]
- Alternatives ecartees : [si utile]

## 4. Design And Product Definition
- Produit / indication produit : [...]
- Locarno : `clear|mixed|uncertain`
- Scope : `single|multiple`
- Coherence du multiple : [...]

## 5. Reproductions And Visual Scope
- Etat visuel : `complete|partial|weak|blocked`
- Vues disponibles : [...]
- Parties revendiquees / non revendiquees : [...]
- Nettoyage visuel requis : [...]

## 6. Priority And Publication Strategy
- Priorite : `none|available|expiring|lost`
- Publication : `immediate|deferred|undecided`
- Divulgation / DMCNE : [...]
- Arbitrages requis : [...]

## 7. Fees And Filing Mechanics
- Office et mecanique de depot : [...]
- Taxes / barèmes : [source ou `[à vérifier]`]
- Points operatoires : [...]

## 8. Decision Routing
- Route unique : `...`
- Motif : [...]
- Routage adjacent : [si orientation vers skill voisin]

## 9. Human Validation
- Validation requise : avocat / juriste / mandataire
- Points à confirmer : [...]
- Decision finale humaine attendue : [...]
```

## Exécution discipline

1. Qualifier le dossier avec le closed cadrage initial contract.
2. Déterminer le `Seuil de préparation du dépôt`.
3. Choisir une seule voie principale.
4. Traiter les cinq axes d'analyse stables.
5. Signaler `DMCNE` seulement si pertinent.
6. Sortir une route unique du `Routage de décision`.
7. Clore par `Validation humaine`.

## Cas de reroutage prioritaire

- dossier centré sur nouveauté / caractère individuel incertains :
  `hold-for-prior-art-review` puis `recherche-anteriorite-dm`
- dossier centré sur visuels inutilisables : `hold-for-visual-cleanup`
- dossier déjà divulgué avec posture UE résiduelle possible :
  `signal-unregistered-eu-design-posture`
- dossier insuffisant ou incohérent : `hold-insufficient-basis`

## Ton

Technique, borné, opératoire. Toujours rappeler qu'il s'agit d'un brouillon
de préparation de dépôt soumis à validation humaine et non d'un conseil
juridique final ni d'un dépôt effectif.
