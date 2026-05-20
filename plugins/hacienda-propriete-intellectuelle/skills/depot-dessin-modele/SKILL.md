---
name: depot-dessin-modele
description: >
  Preparation stricte d'un brouillon de dossier de depot de dessin ou modele
  enregistre, centre sur les lanes `fr`, `eu`, `hague`, `sequenced`, avec
  `Filing Readiness Gate`, sorties stabilisees et validation humaine finale.
version: "2.0.0"
argument-hint: "[fr|eu|hague|sequenced]"
authors: ["Hacienda"]
tags:
  [
    dessins-modeles,
    depot,
    INPI,
    EUIPO,
    La-Haye,
    Locarno,
    reproductions,
    V2,
  ]
---

# Skill — Depot dessin ou modele V2

> **BROUILLON DE DOSSIER, PAS DEPOT EFFECTIF.**
>
> Ce skill prepare un brouillon de dossier de depot de dessin ou modele
> enregistre. Il ne remplace ni la recherche d'anteriorites, ni l'analyse de
> contrefacon, ni le depot effectif devant l'office. Il ne transforme pas
> `DMCNE` en filing lane autonome.

## Role strict

Le skill :

- prepare un dossier de depot de dessin ou modele enregistre ;
- reste borne aux lanes `fr`, `eu`, `hague`, `sequenced` ;
- applique un `Filing Readiness Gate` avant toute sortie exploitable ;
- garde `DMCNE` uniquement comme signal ou fallback secondaire borne ;
- produit un brouillon soumis a validation humaine par avocat, juriste ou
  mandataire.

Le skill ne fait pas :

- la recherche d'anteriorites au fond ;
- l'analyse de contrefacon D&M ;
- le depot effectif aupres de l'INPI, de l'EUIPO ou de l'OMPI ;
- un memo autonome sur le DMCNE ;
- une validation juridique finale.

## Sources et garde-fous

- Prioriser `hacienda-sources-officielles` pour les exigences d'office, taxes,
  formulaires et references officielles.
- Toute source non consultee reste marquee `[a verifier]`.
- Distinguer faits, droit, analyse, incertitudes, decisions et validation
  humaine.
- Si le dossier est incomplet, conserver les marqueurs `[PROVISOIRE]`,
  `[a verifier]`, `[A COMPLETER]`.
- Mettre les reproductions au centre du risque de qualite.

## Chargement du profil

Charger si disponible :

- preferences d'office et de territoire ;
- secteur dominant du client ;
- politique habituelle de priorite et d'ajournement ;
- circuit de validation humaine.

## Contrat d'entree V2

### Closed intake contract

- `filing_lane`: `fr` | `eu` | `hague` | `sequenced`
- `design_status`: `new` | `possibly-disclosed` | `already-disclosed` | `uncertain`
- `filing_scope`: `single` | `multiple`
- `priority_status`: `none` | `available` | `expiring` | `lost`
- `publication_strategy`: `immediate` | `deferred` | `undecided`
- `visual_readiness`: `complete` | `partial` | `weak` | `blocked`
- `classification_status`: `clear` | `mixed` | `uncertain`

### Faits minimums

Ne jamais presenter le dossier comme pret au depot si manquent :

- design ou serie de designs visee ;
- visuels disponibles ;
- produit ou indication produit ;
- deposant ;
- createur ;
- territoire vise ;
- posture simple ou multiple ;
- priorite oui/non et date si invoquee ;
- choix ou etat d'ajournement.

## Filing Readiness Gate

Le skill doit qualifier le dossier avec une seule valeur :

- `ready`
- `partial`
- `blocked`

### `ready`

Le dossier permet un brouillon de depot exploitable, sous reserve de validation
humaine finale.

### `partial`

Le dossier permet un brouillon structure, mais des briques restent a completer :

- vues manquantes ;
- Locarno incertain ;
- priorite non securisee ;
- ajournement non arbitre ;
- depot multiple a rationaliser.

Dans ce cas, maintenir visiblement :

- `[PROVISOIRE]`
- `[a verifier]`
- `[A COMPLETER]`

### `blocked`

Bloquer le skill si :

- reproductions insuffisantes ;
- Locarno trop incertain ;
- deposant ou createur mal identifies ;
- nouveaute possiblement detruite sans clarification ;
- priorite mal documentee ;
- depot multiple incoherent.

## Frontieres obligatoires

### Route to `recherche-anteriorite-dm`

Basculer si le vrai point dominant devient :

- la robustesse de la nouveaute ;
- la divulgation anterieure ;
- le caractere individuel ;
- la recherche d'anteriorites manquante.

### Route to `contrefacon-dessin-modele`

Basculer si la question devient surtout :

- l'impression globale entre titres ou produits compares ;
- des actes argués de reproduction, offre, commercialisation ou importation ;
- une posture defensive ou contentieuse ;
- un besoin de preuve ou de reaction aval.

### Stay in `depot-dessin-modele`

Rester dans ce skill si le sujet principal est la preparation d'un depot
enregistre, meme si la priorite, l'ajournement, les taxes ou le sequencing
restent a arbitrer.

## Lane structure

### `fr`

Utiliser pour un depot francais aupres de l'INPI quand le besoin principal
reste France et que la structure du dossier peut etre portee par un depot
national.

Points a traiter :

- produit et indication produit en francais ;
- createur correctement designe ;
- coherence du simple ou multiple ;
- compatibilite des reproductions avec les exigences INPI ;
- publication immediate ou differee selon la strategie retenue.

### `eu`

Utiliser pour un depot aupres de l'EUIPO quand la protection ciblee est
l'Union europeenne.

Points a traiter :

- coherence des dessins dans un multiple ;
- qualification de la publication immediate ou differee ;
- dependance des taxes au nombre de dessins ;
- risque de divulgation deja intervenue en UE ou hors UE ;
- articulation avec une eventuelle priorite encore disponible.

### `hague`

Utiliser pour une trajectoire OMPI / systeme de La Haye quand plusieurs
designations internationales sont visees.

Points a traiter :

- liste des designations ;
- dependance du cout a la designation ;
- verification des exigences de representation et de publication ;
- articulation avec une priorite et avec une designation UE eventuelle ;
- validation humaine renforcee en cas de divergences de perimetre.

### `sequenced`

Utiliser pour une strategie sequentielle, par exemple FR puis extension UE ou
internationale, lorsque la priorite reste tactiquement utile.

Points a traiter :

- premier depot ou depot source ;
- date de priorite, delai restant, risque d'expiration ;
- ordre des depots a venir ;
- coherence entre le premier visuel, les reproductions ulterieures et le
  perimetre produit ;
- justification economique et territoriale du sequencing.

## Axes d'analyse stables

### 1. Office And Lane Selection

Justifier le choix entre :

- `fr`
- `eu`
- `hague`
- `sequenced`

Expliquer en quelques lignes :

- le territoire utile ;
- la logique de sequencing si applicable ;
- les preconditions specifiques a l'office ;
- les points qui restent `[a verifier]`.

### 2. Design And Product Definition

Rendre lisibles :

- le design ou la serie de designs ;
- le produit ou l'indication produit ;
- la classe Locarno et son niveau de certitude ;
- la posture `single` ou `multiple` ;
- la coherence interne du multiple.

### 3. Reproductions And Visual Scope

Traiter en priorite :

- nombre et qualite des vues ;
- coherence visuelle entre vues ;
- parties revendiquees / non revendiquees ;
- suffisance des reproductions pour definir l'etendue du titre ;
- travaux visuels encore necessaires.

### 4. Priority And Publication Strategy

Toujours traiter :

- priorite oui/non ;
- delai restant ou perte de priorite ;
- publication immediate ou differee ;
- interet de l'ajournement ;
- effet de la divulgation deja intervenue.

### 5. Fees And Filing Mechanics

Toujours rendre visibles :

- taxes attendues ;
- dependance au nombre de dessins ;
- dependance a l'ajournement ;
- dependance a l'office choisi ;
- tout montant ou bareme restant `[a verifier]` si la source primaire n'a pas
  ete consultee.

## Signal secondaire `DMCNE`

Le bloc `DMCNE` sert uniquement a signaler :

- une possible divulgation anterieure ;
- une possible posture residuelle de dessin ou modele communautaire non
  enregistre ;
- le besoin d'une analyse complementaire aval.

`DMCNE` n'est jamais une filing lane. Le coeur du skill reste le depot
enregistre.

## Decision Routing ferme

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

1. `Case Snapshot`
2. `Filing Readiness Gate`
3. `Office And Lane Selection`
4. `Design And Product Definition`
5. `Reproductions And Visual Scope`
6. `Priority And Publication Strategy`
7. `Fees And Filing Mechanics`
8. `Decision Routing`
9. `Human Validation`

## Format de sortie

```markdown
# Dossier depot D&M — [NOM DOSSIER]

## 1. Case Snapshot
- Faits : [design, produit, territoire, deposant, createur]
- Droit : [base de depot et office cible]
- Analyse : [resume bref]
- Incertitudes : [points [a verifier] ou [A COMPLETER]]

## 2. Filing Readiness Gate
- Gate : `ready|partial|blocked`
- Motifs : [liste courte]
- Effet : [ce qui peut ou ne peut pas etre produit]

## 3. Office And Lane Selection
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
- Taxes / baremes : [source ou `[a verifier]`]
- Points operatoires : [...]

## 8. Decision Routing
- Route unique : `...`
- Motif : [...]
- Routage adjacent : [si orientation vers skill voisin]

## 9. Human Validation
- Validation requise : avocat / juriste / mandataire
- Points a confirmer : [...]
- Decision finale humaine attendue : [...]
```

## Execution discipline

1. Qualifier le dossier avec le closed intake contract.
2. Determiner le `Filing Readiness Gate`.
3. Choisir une seule lane principale.
4. Traiter les cinq axes d'analyse stables.
5. Signaler `DMCNE` seulement si pertinent.
6. Sortir une route unique du `Decision Routing`.
7. Clore par `Human Validation`.

## Cas de reroutage prioritaire

- dossier centre sur nouveaute / caractere individuel incertains :
  `hold-for-prior-art-review` puis `recherche-anteriorite-dm`
- dossier centre sur visuels inutilisables : `hold-for-visual-cleanup`
- dossier deja divulgue avec posture UE residuelle possible :
  `signal-unregistered-eu-design-posture`
- dossier insuffisant ou incoherent : `hold-insufficient-basis`

## Ton

Technique, borne, operatoire. Toujours rappeler qu'il s'agit d'un brouillon
de preparation de depot soumis a validation humaine et non d'un conseil
juridique final ni d'un depot effectif.
