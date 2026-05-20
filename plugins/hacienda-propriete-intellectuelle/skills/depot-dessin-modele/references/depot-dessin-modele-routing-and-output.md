# Depot dessin modele V2 — Routing and Output

## Role and non-goals

`depot-dessin-modele` V2 prepare un brouillon de dossier de depot de dessin ou
modele enregistre. Le skill reste strictement borne aux lanes `fr`, `eu`,
`hague`, `sequenced`.

Le skill ne remplace pas :

- `recherche-anteriorite-dm` ;
- `contrefacon-dessin-modele` ;
- le depot effectif ;
- la validation humaine finale.

`DMCNE` reste un signal ou fallback secondaire. Ce n'est pas une filing lane.

## Closed intake contract

- `filing_lane`: `fr` | `eu` | `hague` | `sequenced`
- `design_status`: `new` | `possibly-disclosed` | `already-disclosed` | `uncertain`
- `filing_scope`: `single` | `multiple`
- `priority_status`: `none` | `available` | `expiring` | `lost`
- `publication_strategy`: `immediate` | `deferred` | `undecided`
- `visual_readiness`: `complete` | `partial` | `weak` | `blocked`
- `classification_status`: `clear` | `mixed` | `uncertain`

Faits minimums :

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

- `ready`
- `partial`
- `blocked`

Bloquer si :

- reproductions insuffisantes ;
- Locarno trop incertain ;
- deposant ou createur mal identifies ;
- nouveaute possiblement detruite sans clarification ;
- priorite mal documentee ;
- depot multiple incoherent.

En `partial`, conserver :

- `[PROVISOIRE]`
- `[a verifier]`
- `[A COMPLETER]`

## Lane summary

- `fr` : depot francais INPI
- `eu` : depot UE EUIPO
- `hague` : depot international OMPI / La Haye
- `sequenced` : trajectoire de depot par etapes avec priorite et extension

## Bounded `DMCNE` signal

Utiliser seulement pour signaler :

- possible prior disclosure ;
- possible residual unregistered-EU posture ;
- need for complementary downstream analysis.

Ne jamais utiliser `DMCNE` comme lane principale.

## Closed routing list

Une seule route finale :

- `prepare-fr-filing`
- `prepare-eu-filing`
- `prepare-hague-filing`
- `prepare-sequenced-filing`
- `hold-for-prior-art-review`
- `hold-for-visual-cleanup`
- `signal-unregistered-eu-design-posture`
- `hold-insufficient-basis`

## 9-block output

1. `Case Snapshot`
2. `Filing Readiness Gate`
3. `Office And Lane Selection`
4. `Design And Product Definition`
5. `Reproductions And Visual Scope`
6. `Priority And Publication Strategy`
7. `Fees And Filing Mechanics`
8. `Decision Routing`
9. `Human Validation`
