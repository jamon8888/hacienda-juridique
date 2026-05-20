# Droits Voisins OGC V2 - Routing and Output

## Role and non-goals

`droits-voisins-ogc` V2 est un skill strict de qualification droits voisins + OGC.
Il reste centre sur le titulaire, l'acte d'exploitation, la posture de gestion
collective ou de remuneration equitable, et la robustesse minimale de la chaine
de droits.

Non-goals :

- pas de memo AI Act autonome ;
- pas de note NFT / blockchain generaliste ;
- pas de licence auteur complete ;
- pas de cession auteur complete ;
- pas de strategie contentieuse PI globale.

## Closed intake contract

- `primary_track`: `performer-rights` | `phonogram-producer` | `videogram-producer` | `broadcast-organization` | `press-publisher` | `mixed`
- `management_posture`: `direct-licensing` | `ogc-membership` | `equitable-remuneration` | `mixed`
- `rights_chain_status`: `clear` | `mixed` | `uncertain` | `blocked`
- `exploitation_mode`: `fixation` | `reproduction` | `communication-public` | `streaming` | `platform-use` | `mixed`
- `emerging_signal`: `none` | `gen-ai` | `nft` | `both`
- `territory_scope`: `fr` | `eu` | `international`

Faits minimums :

- titulaire ou categorie de titulaire ;
- prestation, enregistrement ou publication identifie ;
- acte d'exploitation cible ;
- role du producteur, diffuseur, plateforme ou OGC ;
- territoire ;
- sources consultees et datees.

## Neighboring Rights Readiness Gate

- `ready` : base suffisante pour un brouillon voisins/OGC exploitable ;
- `partial` : brouillon possible mais incomplet, avec `[PROVISOIRE]`,
  `[a verifier]`, `[A COMPLETER]` obligatoires ;
- `blocked` : pas de titulaire identifiable, pas d'acte formulable,
  `rights_chain_status = blocked`, sujet dominant hors voisins/OGC, ou absence
  totale de sources consultees et datees.

## Core logic summary

Verifier en priorite :

- track principal : artiste-interprete, producteur de phonogrammes, producteur
  de videogrammes, entreprise de communication audiovisuelle, editeur de
  presse si pertinent ;
- acte d'exploitation vise et consentement/autorisation necessaire ;
- duree apparente et pression remuneration equitable ;
- OGC, mandat, adherence, repartition, direct licensing ;
- fragilites de title chain avant toute route finale.

Signals secondaires bornes :

- `gen-ai-signal` : protegebilite douteuse, training/opt-out/style mimicry,
  puis reroutage si le sujet devient principalement IA ;
- `nft-signal` : pas de transfert automatique de droits, risque de mint sans
  autorisation, confusion de titularite, puis reroutage si le sujet devient
  principalement contractuel ou contentieux.

## Risk matrix

| Situation | Gate / pressure | Route |
| --- | --- | --- |
| Titulaire clair, exploitation claire, enjeu OGC/remuneration clair | `ready` | `proceed-with-neighboring-rights-brief` |
| Chaine de titre faible, contradictoire ou lacunaire | `partial` | `clarify-title-chain` |
| Acte d'exploitation, consentement ou perimetre plateforme mal qualifies | `partial` | `clarify-exploitation-scope` |
| OGC, mandat, repartition ou remuneration equitable ambigus | `partial` | `review-ogc-membership-and-remuneration` |
| Sujet dominant sur l'originalite ou la qualification auteur | `blocked` hors couloir | `route-to-work-qualification` |
| Sujet dominant sur la licence auteur | `blocked` hors couloir | `route-to-copyright-license` |
| Sujet dominant sur la cession / cleanup patrimonial | `blocked` hors couloir | `route-to-copyright-assignment` |
| Sujet dominant sur l'atteinte auteur au fond | `blocked` hors couloir | `route-to-copyright-infringement` |
| Sujet dominant sur la strategie precontentieuse ou judiciaire | `blocked` hors couloir | `route-to-pi-litigation` |
| Base factuelle insuffisante ou aucune source consultee/datee | `blocked` | `hold-insufficient-basis` |

## Closed routing list

Une seule route finale :

- `proceed-with-neighboring-rights-brief`
- `clarify-title-chain`
- `clarify-exploitation-scope`
- `review-ogc-membership-and-remuneration`
- `route-to-work-qualification`
- `route-to-copyright-license`
- `route-to-copyright-assignment`
- `route-to-copyright-infringement`
- `route-to-pi-litigation`
- `hold-insufficient-basis`

Rappels de frontiere :

- originalite / oeuvre -> `qualification-oeuvre`
- licence -> `licence-droit-auteur`
- cession / title cleanup -> `cession-droit-auteur`
- atteinte auteur -> `contrefacon-droit-auteur`
- strategie judiciaire -> `contentieux-pi`
- contrat PI large -> `contrats-pi`

## 9-block output

1. `Case Snapshot`
2. `Neighboring Rights Readiness Gate`
3. `Rights Holder And Title Chain`
4. `Exploitation And Consent Map`
5. `Duration And Remuneration Posture`
6. `OGC And Collective Management Posture`
7. `Emerging Signal`
8. `Decision Routing`
9. `Human Validation`
