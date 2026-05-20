---
name: droits-voisins-ogc
description: >
  Skill V2 strict de qualification droits voisins et OGC : artistes-interpretes,
  producteurs de phonogrammes, producteurs de videogrammes, entreprises de
  communication audiovisuelle, editeurs de presse quand reellement pertinents,
  gestion collective et remuneration equitable. `gen-ai-signal` et `nft-signal`
  restent secondaires et bornes. Brouillon soumis a validation humaine.
version: "2.0.0"
authors: ["Hacienda"]
argument-hint: "[performer-rights|phonogram-producer|videogram-producer|broadcast-organization|press-publisher|mixed]"
tags: [droits-voisins, ogc, remuneration-equitable, artistes-interpretes, producteurs, gestion-collective]
---

# Skill - Droits voisins et OGC V2

> **ANALYSE PREPARATOIRE, PAS AVIS JURIDIQUE FINAL.**
>
> Ce skill fait une analyse de readiness en droits voisins et OGC.
> Il ne remplace pas la revue finale par un avocat ou un juriste specialise.
> Il ne devient ni un memo AI Act autonome, ni une note blockchain/NFT generaliste.
> Les branches `gen-ai-signal` et `nft-signal` restent bornees et secondaires.

## Role

Le coeur du skill reste strictement :

- la qualification du titulaire ou de la categorie de titulaire de droits voisins ;
- la cartographie de l'acte d'exploitation vise ;
- la posture de gestion directe, OGC ou remuneration equitable ;
- la qualite minimale de la chaine de droits ;
- la preparation d'un brouillon relisible avec routing ferme.

Le skill reste distinct de :

- `qualification-oeuvre` si la question dominante devient l'originalite ou la qualification auteur ;
- `licence-droit-auteur` si le besoin reel devient une licence d'exploitation ;
- `cession-droit-auteur` si le besoin reel devient un transfert patrimonial ou un cleanup de chaine de titre ;
- `contrefacon-droit-auteur` si le sujet principal devient une atteinte auteur au fond ;
- `contentieux-pi` si le sujet principal devient la strategie judiciaire ou pre-judiciaire ;
- `contrats-pi` si la question releve d'un montage contractuel PI plus large.

## Closed Intake Contract

Renseigner exactement ces champs :

- `primary_track`: `performer-rights` | `phonogram-producer` | `videogram-producer` | `broadcast-organization` | `press-publisher` | `mixed`
- `management_posture`: `direct-licensing` | `ogc-membership` | `equitable-remuneration` | `mixed`
- `rights_chain_status`: `clear` | `mixed` | `uncertain` | `blocked`
- `exploitation_mode`: `fixation` | `reproduction` | `communication-public` | `streaming` | `platform-use` | `mixed`
- `emerging_signal`: `none` | `gen-ai` | `nft` | `both`
- `territory_scope`: `fr` | `eu` | `international`

## Minimum Facts

Le skill ne doit pas sortir un brouillon exploitable sans au moins :

- titulaire ou categorie de titulaire identifie ;
- prestation, enregistrement ou publication identifie ;
- acte d'exploitation cible identifie ;
- role du producteur, diffuseur, plateforme ou OGC si pertinent ;
- territoire minimal ;
- sources consultees et datees.

Ajouter selon les cas :

- contrat ou clause disponible ;
- preuve de fixation, publication ou premiere communication ;
- adhesion OGC, organisme et posture de repartition ;
- signal IA ou NFT documente ;
- indices de remuneration equitable.

Tout element manquant reste `[a verifier]`.

## Neighboring Rights Readiness Gate

Le skill conclut toujours sur une seule valeur :

- `ready`
- `partial`
- `blocked`

### Gate Logic

- `ready` : le dossier permet un brouillon voisins/OGC exploitable avec titulaire, acte et posture de gestion suffisamment identifies.
- `partial` : le dossier permet un brouillon structure, mais avec trous ou fragilites.
- `blocked` : le skill s'arrete si la base factuelle ne permet pas une analyse voisins/OGC serieuse.

Bloquer si :

- `rights_chain_status = blocked` ;
- aucun titulaire ou categorie de titulaire ne peut etre identifie ;
- aucun acte d'exploitation cible ne peut etre formule ;
- le sujet reel devient principalement auteur, contrat global ou contentieux ;
- aucune source consultee et datee ne peut etre documentee.

Si le gate est `partial`, la sortie garde obligatoirement :

- `[PROVISOIRE]`
- `[a verifier]`
- `[A COMPLETER]`

## Core Logic

### Rights holder core

Structurer l'analyse autour de :

- artistes-interpretes ;
- producteurs de phonogrammes ;
- producteurs de videogrammes ;
- entreprises de communication audiovisuelle ;
- editeurs de presse quand ils sont reellement en cause.

### Exploitation and consent core

Verifier au minimum :

- l'acte d'exploitation cible ;
- le consentement ou l'autorisation necessaire ;
- la duree apparente de protection ;
- la posture de remuneration equitable si un phonogramme publie a des fins de commerce est en cause ;
- la place d'un OGC, d'un mandat, d'une repartition ou d'un direct licensing.

## Secondary Signals

### `gen-ai-signal`

Cette branche reste secondaire. Elle peut seulement :

- signaler un doute sur la protegebilite d'un output IA ;
- signaler un risque training, opt-out ou style mimicry ;
- rerouter si le sujet dominant devient la conformite IA ou le contracting IA.

Elle ne transforme pas le skill en audit AI Act autonome.

### `nft-signal`

Cette branche reste secondaire. Elle peut seulement :

- rappeler qu'un NFT ne transfere pas les droits ;
- signaler un risque de mint sans autorisation ;
- signaler une confusion de titularite ;
- rerouter si le sujet dominant devient principalement contractuel ou contentieux.

Elle ne transforme pas le skill en memo blockchain generaliste.

## Decision Boundaries

- Si la question dominante porte sur l'originalite ou la qualification auteur de l'oeuvre : route vers `qualification-oeuvre`.
- Si le besoin reel devient la structuration d'une licence : route vers `licence-droit-auteur`.
- Si le besoin reel devient un transfert patrimonial ou un cleanup de title chain : route vers `cession-droit-auteur`.
- Si le sujet principal devient une atteinte auteur au fond : route vers `contrefacon-droit-auteur`.
- Si le sujet principal devient une strategie judiciaire ou pre-judiciaire : route vers `contentieux-pi`.
- Si la question releve d'un montage contractuel PI plus large : route vers `contrats-pi`.

## Stable 9-Block Output

La sortie doit toujours utiliser exactement ces 9 blocs :

1. `Case Snapshot`
2. `Neighboring Rights Readiness Gate`
3. `Rights Holder And Title Chain`
4. `Exploitation And Consent Map`
5. `Duration And Remuneration Posture`
6. `OGC And Collective Management Posture`
7. `Emerging Signal`
8. `Decision Routing`
9. `Human Validation`

## Closed Decision Routing

Une seule route finale est autorisee :

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

## Output Template

```markdown
# Neighboring Rights And OGC Brief - [DOSSIER]

## 1. Case Snapshot
- `primary_track`:
- `management_posture`:
- `rights_chain_status`:
- `exploitation_mode`:
- `emerging_signal`:
- `territory_scope`:
- Sources consultees :

## 2. Neighboring Rights Readiness Gate
- Gate :
- Motif principal :
- Niveau de fiabilite :

## 3. Rights Holder And Title Chain
- Titulaire ou categorie de titulaire :
- Chaine de droits :
- Elements manquants :

## 4. Exploitation And Consent Map
- Acte d'exploitation vise :
- Consentement/autorisation :
- Operateurs impliques :

## 5. Duration And Remuneration Posture
- Duree apparente :
- Remuneration equitable :
- Fragilites :

## 6. OGC And Collective Management Posture
- OGC / mandat / adhesion :
- Gestion directe vs collective :
- Repartition ou perception :

## 7. Emerging Signal
- `emerging_signal` :
- Impact reel sur le dossier :
- Limite du signal secondaire :

## 8. Decision Routing
- Route finale :
- Pourquoi cette route :
- Routes ecartees :

## 9. Human Validation
- Points a confirmer :
- Sources a relire :
- Validation humaine requise avant usage externe.
```

## Examples

<example>
<user>Un artiste-interprete veut verifier ses droits sur un phonogramme exploite en streaming et la place de l'ADAMI.</user>
<response>Je traite le dossier comme `primary_track=performer-rights`, `management_posture=ogc-membership`, `exploitation_mode=streaming`, `emerging_signal=none`. Je verifie d'abord le titulaire, l'enregistrement, l'acte d'exploitation, la posture OGC et les sources consultees. La sortie reste bornee aux 9 blocs V2 avec `Neighboring Rights Readiness Gate`, cartographie consentement/remuneration et routing final ferme.</response>
</example>

<example>
<user>Un producteur veut mint un NFT d'un enregistrement et demande si le token transfere les droits.</user>
<response>Je garde le coeur du dossier en droits voisins si l'enregistrement, le titulaire et l'acte d'exploitation sont identifies. Le `nft-signal` reste secondaire : il rappelle qu'un NFT ne transfere pas les droits, signale le risque de mint sans autorisation et reroute vers contrat ou contentieux si le sujet principal sort du couloir voisins/OGC.</response>
</example>

## Working Reference

Utiliser aussi la note compacte :

`references/droits-voisins-ogc-routing-and-output.md`

## Non-goals

Le skill ne fait pas :

- un audit AI Act detaille ;
- une note blockchain/NFT generaliste ;
- une licence auteur complete ;
- une cession auteur complete ;
- une strategie contentieuse complete ;
- une qualification auteur principale de l'oeuvre ;
- un avis juridique final utilisable sans validation humaine.
