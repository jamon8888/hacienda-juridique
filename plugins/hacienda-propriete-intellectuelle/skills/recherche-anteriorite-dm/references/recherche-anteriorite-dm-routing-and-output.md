# Recherche anteriorite D&M V2 - Routing and Output

## Role and non-goals

`recherche-anteriorite-dm` V2 est un skill de premier passage strict sur la
disponibilite apparente d'un dessin ou modele.

Le skill :

- couvre principalement `filing-clearance` ;
- maintient `reverse-nullity-signal` comme branche secondaire bornee ;
- ne remplace ni une clearance juridique finale, ni `depot-dessin-modele`, ni
  `contrefacon-dessin-modele`.

La recherche reste non exhaustive. Les divulgations non enregistrees, non
datees ou non indexees doivent rester visibles dans les limites du dossier.

## Closed intake contract

- `research_mode`: `filing-clearance` | `reverse-nullity-signal`
- `territory_scope`: `fr` | `eu` | `international` | `mixed`
- `design_visibility_status`: `new` | `possibly-disclosed` |
  `already-disclosed` | `uncertain`
- `locarno_status`: `clear` | `mixed` | `uncertain`
- `search_coverage_target`: `registers-minimum` |
  `registers-plus-open-web` | `enhanced-sector-scan`
- `evidence_posture`: `strong` | `mixed` | `weak` | `blocked`

Minimum facts :

- design cible ;
- visuels ou descriptions comparables ;
- produit ou gamme ;
- territoire ;
- date pivot ;
- statut de divulgation ;
- Locarno connu, mixte ou incertain ;
- objectif principal ;
- sources consultees et date de consultation.

## Prior Art Readiness Gate

- `ready`
- `partial`
- `blocked`

Bloquer si :

- design non identifiable ;
- absence de visuels ou de description exploitable ;
- date pivot non etablissable ;
- aucune source effectivement consultee et datee ne peut etre documentee ;
- divulgation trop incertaine pour cadrer la recherche ;
- impossibilite de determiner au moins une hypothese Locarno raisonnable ;
- absence de consultation du minimum registres requis ;
- en `reverse-nullity-signal`, absence d'anteriorite plausible ou de preuve
  minimale a securiser.

En `partial`, conserver :

- `[PROVISOIRE]`
- `[a verifier]`
- `[A COMPLETER]`

## Source coverage stack

### Registers minimum

- INPI dessins et modeles
- EUIPO DesignView ou equivalent
- OMPI / Hague Express si le scope international ou mixte le justifie

### Open web complements

- sites marchands
- catalogues en ligne
- recherche web ouverte et resultats image
- portfolios, reseaux sociaux, pages produit datees

### Enhanced sector scan

- bases sectorielles
- salons
- catalogues professionnels
- archives de marque
- marketplaces specialisees

## Findings schema

Chaque finding proche doit etre resume autour de :

- `source`
- `date`
- `class`
- `visual proximity`
- `novelty risk`
- `individual character risk`
- `creator freedom`

## Prior-art risk matrix

| Scenario | Reading | Route |
|---|---|---|
| No meaningful prior art found | Disponibilite apparente exploitable, sous reserve des limites hors registre | `prepare-filing` |
| Close but non-destructive prior art | Depot envisageable, mais avec prudence et comparaison motivee | `prepare-filing-with-caution` |
| Destructive novelty prior art | Le design parait trop proche ou quasi identique | `hold-for-design-adjustment` |
| Weak or partial search coverage | La conclusion reste trop fragile sans extension de recherche | `hold-for-expanded-search` |
| Reverse-nullity signal plausible | Une anteriorite destructrice plausible merite securisation de preuve et reroutage | `signal-reverse-nullity-posture` |

## Bounded reverse nullity branch

`reverse-nullity-signal` sert seulement a :

- signaler une anteriorite destructive plausible ;
- dire quelle preuve doit etre securisee ;
- rerouter vers `contrefacon-dessin-modele` si une posture attack / defense
  devient dominante.

Le skill ne devient pas un memo autonome de nullite ou de contentieux.

## Closed routing list

Une seule route finale :

- `prepare-filing`
- `prepare-filing-with-caution`
- `hold-for-design-adjustment`
- `hold-for-expanded-search`
- `signal-reverse-nullity-posture`
- `route-to-design-infringement-analysis`
- `hold-insufficient-basis`

## 9-block output

1. `Case Snapshot`
2. `Prior Art Readiness Gate`
3. `Search Scope And Sources`
4. `Closest Prior Art Findings`
5. `Novelty Risk`
6. `Individual Character Risk`
7. `Coverage Limits And Unknowns`
8. `Decision Routing`
9. `Human Validation`
