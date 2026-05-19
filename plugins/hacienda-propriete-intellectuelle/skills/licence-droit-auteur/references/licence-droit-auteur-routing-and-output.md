# Licence droit auteur V2 - Routing and output memo

## Role

`licence-droit-auteur` V2 sert a preparer un brouillon de licence de droits
d'auteur. Il ne remplace pas :

- `qualification-oeuvre`
- `cession-droit-auteur`
- `logiciels-pi`
- `bases-de-donnees`
- `contrats-pi`
- le plugin donnees personnelles

## Closed intake contract

- `license_track`: `exclusive` | `non-exclusive` | `creative-commons` |
  `software-eula` | `saas-user-content`
- `work_status`: `qualified` | `partially-qualified` | `uncertain`
- `title_status`: `clear` | `mixed` | `uncertain`
- `counterparty_profile`: `publisher` | `producer` | `platform` |
  `customer` | `internal-group` | `public` | `mixed`
- `economic_model`: `royalty` | `flat-fee` | `free-open` |
  `subscription` | `mixed`
- `reuse_scope`: `narrow` | `standard` | `broad` | `global-platform`
- `data_personal_status`: `yes` | `no` | `mixed` | `unknown`

## License Readiness Gate

- `ready`
- `partial`
- `blocked`

Bloquer si :

- oeuvre trop incertaine ;
- titularite trop incertaine ;
- demande assimilable a une cession ;
- sujet dominamment logiciel ou base de donnees sans analyse amont ;
- contrat plus large qu'une simple licence.

## Lane summary

- `exclusive` : exclusivite, duree, territoire, minimum d'exploitation,
  reversion, risque de requalification
- `non-exclusive` : usage, support, audience, restrictions, sous-licence
- `creative-commons` : variante, attribution, SA / ND / NC, irrevocabilite,
  risques de diffusion
- `software-eula` : usage, utilisateurs, acces, mises a jour, support,
  restrictions usuelles
- `saas-user-content` : droits techniques plateforme, moderation, duree,
  donnees personnelles, articulation CGU / DPA

## Closed routing

- `prepare-exclusive-license-draft`
- `prepare-non-exclusive-license-draft`
- `prepare-creative-commons-release`
- `prepare-software-eula-draft`
- `prepare-saas-user-content-license`
- `route-to-work-qualification`
- `route-to-assignment`
- `route-to-software-regime-review`
- `route-to-database-regime-review`
- `route-to-broader-pi-contract`
- `hold-for-rgpd-review`
- `hold-insufficient-basis`

## Output contract

1. `Case Snapshot`
2. `License Readiness Gate`
3. `Work And Title Preconditions`
4. `Chosen License Track`
5. `Economic And Exploitation Structure`
6. `Critical Clauses`
7. `Requalification And Compliance Risks`
8. `Decision Routing`
9. `Human Validation`

## Mandatory provisional markers

If the gate is not fully `ready`, keep visible:

- `[PROVISOIRE]`
- `[a verifier]`
- `[A COMPLETER]`
