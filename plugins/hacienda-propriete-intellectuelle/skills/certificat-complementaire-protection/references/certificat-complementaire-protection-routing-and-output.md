# Certificat complementaire de protection V2 - Routing and Output

## Role and non-goals

`certificat-complementaire-protection` V2 prepare une readiness stricte CCP
pour medicaments et produits phytopharmaceutiques. Le skill est centre sur
`eligibility` et `apply`. `check` reste secondaire et borne.

Le skill ne remplace pas :

- `analyse-refus-inpi` ;
- `anteriorite-invalidite` ;
- `revue-portefeuille-brevets` ;
- `recherche-anteriorite-brevet` ;
- `preparation-depot-brevet` ;
- le depot effectif ;
- la validation humaine finale.

## Closed intake contract

- `mode`: `eligibility` | `apply` | `check`
- `product_track`: `medicinal` | `plant-protection`
- `base_patent_status`: `clear` | `mixed` | `weak` | `unknown`
- `authorization_posture`: `valid-first-eu` |
  `valid-but-first-eu-unclear` | `authorization-unclear` | `blocked`
- `claim_match_posture`: `strong` | `mixed` | `weak` | `unknown`
- `pediatric_extension_status`: `not-applicable` | `possible` |
  `documented` | `unclear`
- `waiver_posture`: `none` | `export-signal` | `stockpiling-signal` | `mixed`

Faits minimums :

- produit cible ;
- track retenu ;
- brevet de base avec numero, office, date de depot et statut apparent ;
- date d'expiration attendue ou horizon equivalent ;
- revendications ou logique de couverture produit ;
- autorisation invoquee avec date et autorite ;
- posture premiere AMM UE ;
- verifications minimales de duplication CCP ;
- sources consultees et datees.

## CCP Readiness Gate

- `ready`
- `partial`
- `blocked`

Bloquer si :

- aucune autorisation exploitable ;
- brevet de base inutilisable ou non identifiable ;
- date de depot du brevet de base ou base minimale d'expiration non etablie ;
- produit non identifiable ;
- aucune base serieuse sur le lien revendications / produit ;
- premiere AMM UE impossible a cadrer alors qu'elle conditionne la conclusion ;
- base insuffisante en `eligibility` pour conclure sur l'article 3 ou la duree ;
- fenetre de depot non calculable ou manifestement hors delai en `apply` ;
- aucun CCP cible identifiable en `check` ou pas de pieces minimales de
  verification ;
- aucune source consultee datee.

En `partial`, conserver :

- `[PROVISOIRE]`
- `[a verifier]`
- `[A COMPLETER]`

## Core logic summary

- article 3(a) : match produit / brevet ;
- article 3(b) : autorisation valide ;
- article 3(c) : absence de duplication CCP ;
- article 3(d) : premiere AMM UE / EEE ;
- duree : date premiere AMM UE moins date de depot brevet moins 5 ans, plafond
  5 ans ;
- extension pediatrique : seulement si `documented`, sinon reserve visible ;
- fenetre de depot : article 7, 6 mois apres AMM ou delivrance du brevet selon
  le cas ;
- `check` : verification secondaire du CCP existant ;
- `manufacturing-waiver-signal` : signal aval borne seulement.
- notifications et formalites waiver a verifier ;
- pression apparente d'entree generique ou de stockage a qualifier ;

## Risk matrix

| Signal dominant | Gate typique | Route typique | Niveau |
| --- | --- | --- | --- |
| brevet clair, AMM claire, premiere AMM UE claire, pas de duplication visible | `ready` | `prepare-ccp-application` | modere |
| base suffisante mais premiere AMM UE ou extension pediatrique incomplete | `partial` | `prepare-ccp-application-with-caution` | modere a eleve |
| doute fort sur revendications / produit | `partial` ou `blocked` | `hold-for-claim-scope-review` | eleve |
| doute fort sur premiere AMM UE | `partial` ou `blocked` | `hold-for-first-amm-review` | eleve |
| duplication CCP plausible ou non ecartee | `partial` ou `blocked` | `hold-for-duplicate-ccp-review` | eleve |
| faiblesse dominante du brevet de base | `blocked` | `route-to-patent-invalidity-review` | eleve |
| portefeuille multi-brevets ou arbitrage titres / pays | `partial` | `route-to-patent-portfolio-review` | modere a eleve |
| waiver export / stockage comme fait saillant aval | `ready` ou `partial` | `signal-manufacturing-waiver-posture` | contextuel |
| base minimale absente | `blocked` | `hold-insufficient-basis` | critique |

## Routing reminders

- notification de prosecution du brevet de base -> `analyse-refus-inpi`
- doute dominant sur match revendications / produit -> `hold-for-claim-scope-review`, puis `route-to-patent-invalidity-review` si la faiblesse porte sur le brevet de base lui-meme
- logique portefeuille, calendrier multi-titres ou arbitrage pays / families -> `route-to-patent-portfolio-review`

## Closed routing list

Une seule route finale :

- `prepare-ccp-application`
- `prepare-ccp-application-with-caution`
- `hold-for-claim-scope-review`
- `hold-for-first-amm-review`
- `hold-for-duplicate-ccp-review`
- `signal-manufacturing-waiver-posture`
- `route-to-patent-invalidity-review`
- `route-to-patent-portfolio-review`
- `hold-insufficient-basis`

## 9-block output

1. `Case Snapshot`
2. `CCP Readiness Gate`
3. `Base Patent And Product Match`
4. `Authorization And First EU Marketing Posture`
5. `Article 3 Eligibility` (avec posture globale)
6. `Duration And Extension Calculation`
7. `Filing Window Or Existing CCP Check`
8. `Decision Routing`
9. `Human Validation`
