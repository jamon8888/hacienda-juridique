# Cession Droit D'Auteur V2 - Routing And Output Memo

## Role

`cession-droit-auteur` est un skill V2 strict de preparation d'une cession de
droits patrimoniaux d'auteur. Il prepare un brouillon structure, mais ne
remplace pas la qualification de l'oeuvre, la licence, le regime logiciel, ni
un contrat PI plus large.

## Non-goals

- ne pas produire un contrat final signable
- ne pas remplacer l'avocat
- ne pas devenir un hub portefeuille
- ne pas traiter la cession globale d'oeuvres futures hors exception
- ne pas absorber `qualification-oeuvre`, `licence-droit-auteur`,
  `logiciels-pi` ou `contrats-pi`

## Profile Loading

Charger avant analyse :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Si le profil est incomplet, garder les marqueurs :

- `[PROVISOIRE]`
- `[à vérifier]`
- `[A COMPLETER]`

## Closed Intake Contract

- `transfer_track`: `full-assignment` | `partial-assignment` |
  `exclusive-assignment` | `non-exclusive-assignment`
- `creation_context`: `independent-author` | `commissioned-work` |
  `employee-non-software` | `collective-work-claim` | `collaborative-work` |
  `audiovisual` | `publishing`
- `title_chain_status`: `clear` | `mixed` | `uncertain` | `blocked`
- `work_status`: `qualified` | `partially-qualified` | `uncertain`
- `economic_model`: `royalty` | `flat-fee` | `advance-plus-royalty` | `mixed`
- `scope_posture`: `narrow` | `standard` | `broad` | `all-current-uses`
- `counterparty_profile`: `publisher` | `producer` | `brand` | `platform` |
  `customer` | `internal-group` | `mixed`

## Assignment Readiness Gate

- `ready` : dossier exploitable
- `partial` : brouillon possible, marqueurs provisoires conserves
- `blocked` : base insuffisante, titre trop incertain, cession inadaptée, ou
  autre blocage dominant

## Core Assignment Axes

Le coeur V2 suit toujours ces axes :

1. `Work And Title Preconditions`
2. `Chosen Transfer Track`
3. `Rights Scope And Exploitation Structure`
4. `Economic Structure`
5. `Title-Chain Cleanup Or Blocking Points`

### `Work And Title Preconditions`

- qualification minimale de l'oeuvre
- qualite du cedant
- contexte de creation
- coauteurs, ayants droit ou cessions anterieures
- rappel que le droit moral ne se cede pas

### `Chosen Transfer Track`

- `full-assignment`
- `partial-assignment`
- `exclusive-assignment`
- `non-exclusive-assignment`

### `Rights Scope And Exploitation Structure`

- droits cedes
- domaines d'exploitation
- territoire
- duree
- usages vises et exclus

### `Economic Structure`

- logique `L.131-4`
- remuneration proportionnelle ou forfait justifie
- risque de faiblesse economique ou de requalification

## Bounded Title-Chain Cleanup

La branche `title-chain-cleanup` est bornee. Elle sert a regulariser ou
bloquer, pas a faire un audit general.

Cas couverts :

- coauteurs non securises
- signatures manquantes
- prestation commandee sans cession valable
- salarie hors logiciel mal compris
- personne morale sans base de titularite
- oeuvre collective revendiquee sans base suffisante
- cession anterieure non documentee
- ayants droit non identifies

## Boundary Routes

Le skill doit router hors perimetre vers :

- `qualification-oeuvre`
- `licence-droit-auteur`
- `logiciels-pi`
- `contrats-pi`

## Output Contract

Sortie stabilisee en 9 blocs exactement :

1. `Case Snapshot`
2. `Assignment Readiness Gate`
3. `Work And Title Preconditions`
4. `Chosen Transfer Track`
5. `Rights Scope And Exploitation Structure`
6. `Economic Structure`
7. `Title-Chain Cleanup Or Blocking Points`
8. `Decision Routing`
9. `Human Validation`

En `partial`, conserver les marqueurs `[PROVISOIRE]`, `[à vérifier]` et
`[A COMPLETER]` partout ou les faits ou la base de titularite restent incomplets.

## Decision Routing

Une seule route principale par sortie, choisie parmi :

- `prepare-full-assignment-draft`
- `prepare-partial-assignment-draft`
- `prepare-exclusive-assignment-draft`
- `prepare-non-exclusive-assignment-draft`
- `route-to-work-qualification`
- `route-to-license-instead`
- `route-to-title-chain-cleanup`
- `route-to-software-regime-review`
- `route-to-broader-pi-contract`
- `hold-insufficient-basis`

Ne pas introduire d'autre semantique de route.
