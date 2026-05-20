# Spec - Migration V2 du skill `droits-voisins-ogc`

Date: 2026-05-20
Auteur: Codex
Statut: proposed

## 1. Resume executif

Le skill `droits-voisins-ogc` doit passer d'un V1 large et heterogene a un V2
centre sur un contrat plus strict :

- un coeur **droits voisins + OGC** ;
- une sortie stabilisee ;
- des frontieres nettes avec auteur, contrats et contentieux ;
- des branches secondaires bornees pour `gen-ai-signal` et `nft-signal`.

La logique cible n'est pas de faire un hub PI emergente generaliste. Le coeur
doit rester :

- l'identification du titulaire de droits voisins ;
- la cartographie des actes d'exploitation ;
- la posture OGC / remuneration equitable / gestion collective ;
- la qualite minimale de la chaine de droits.

## 2. Probleme du skill actuel

Le V1 melange dans une meme surface :

- droits voisins classiques ;
- OGC et adhesion ;
- IA generative ;
- NFT ;
- recommandations de contrats ;
- prospective reglementaire.

Le probleme n'est pas la matiere. Le probleme est l'absence d'un contrat V2
qui distingue clairement :

- le **coeur voisins / OGC** ;
- les **signals IA / NFT** ;
- les **routes de contrats** ;
- la **route contentieuse** ;
- la **validation humaine finale**.

## 3. Positionnement V2

### 3.1 Coeur du skill

`droits-voisins-ogc` V2 devient un skill d'analyse stricte de :

- droits des artistes-interpretes ;
- droits des producteurs de phonogrammes ;
- droits des producteurs de videogrammes ;
- droits des entreprises de communication audiovisuelle ;
- droits voisins des editeurs de presse quand ils sont reellement en cause ;
- gestion collective, remuneration equitable et posture OGC.

### 3.2 Branche secondaire `gen-ai-signal`

Le skill garde un signal borne `gen-ai-signal` pour :

- rappeler le doute sur la protegebilite d'outputs IA ;
- signaler un risque training / opt-out / style mimicry ;
- rerouter vers une revue plus specialisee si le sujet dominant devient la
  conformite IA, pas les droits voisins eux-memes.

Cette branche ne transforme pas le skill en audit AI Act autonome.

### 3.3 Branche secondaire `nft-signal`

Le skill garde un signal borne `nft-signal` pour :

- rappeler qu'un NFT ne transfere pas les droits ;
- qualifier les risques de mint sans autorisation ou de confusion de titularite ;
- rerouter vers contrat / contentieux si le sujet devient principalement
  operationnel ou adversarial.

Cette branche ne transforme pas le skill en memo blockchain generaliste.

## 4. Approches ecartees

### Option A - Tout garder au meme niveau

Conserver voisins, OGC, IA et NFT au meme niveau.

Problemes :

- skill trop flou ;
- identite produit instable ;
- recouvrements directs avec auteur, contrats et contentieux.

### Option B - Skill uniquement OGC administratif

Ne garder que l'adhesion OGC, la repartition et la remuneration equitable.

Problemes :

- trop etroit ;
- perd la qualification amont des titulaires et des actes ;
- sous-exploite la valeur juridique du skill.

### Option C - Coeur voisins / OGC avec signaux secondaires

Option retenue.

## 5. Architecture fonctionnelle retenue

### 5.1 Tracks principaux

Le skill doit partir d'un `primary_track` ferme :

- `performer-rights`
- `phonogram-producer`
- `videogram-producer`
- `broadcast-organization`
- `press-publisher`
- `mixed`

### 5.2 Posture OGC / remuneration

Le skill doit aussi fermer `management_posture` :

- `direct-licensing`
- `ogc-membership`
- `equitable-remuneration`
- `mixed`

### 5.3 Signaux secondaires

- `emerging_signal` :
  - `none`
  - `gen-ai`
  - `nft`
  - `both`

## 6. Contrat d'entree V2

### Closed intake contract

- `primary_track`:
  - `performer-rights`
  - `phonogram-producer`
  - `videogram-producer`
  - `broadcast-organization`
  - `press-publisher`
  - `mixed`
- `management_posture`:
  - `direct-licensing`
  - `ogc-membership`
  - `equitable-remuneration`
  - `mixed`
- `rights_chain_status`:
  - `clear`
  - `mixed`
  - `uncertain`
  - `blocked`
- `exploitation_mode`:
  - `fixation`
  - `reproduction`
  - `communication-public`
  - `streaming`
  - `platform-use`
  - `mixed`
- `emerging_signal`:
  - `none`
  - `gen-ai`
  - `nft`
  - `both`
- `territory_scope`:
  - `fr`
  - `eu`
  - `international`

### Faits minimums

Le skill ne doit pas presenter la sortie comme exploitable sans au moins :

- titulaire ou categorie de titulaire identifie ;
- prestation, enregistrement ou publication identifie ;
- acte d'exploitation cible identifie ;
- role d'un producteur, diffuseur, plateforme ou OGC si pertinent ;
- territoire minimal ;
- sources consultees et datees.

Ajouter selon les cas :

- contrat ou clause disponible ;
- preuve de fixation / publication / premiere communication ;
- adhesion OGC, organisme et posture de repartition ;
- signal IA ou NFT documente ;
- indices de remuneration equitable.

Tout manque reste `[a verifier]`.

## 7. Neighboring Rights Readiness Gate

Le skill doit conclure sur une seule valeur :

- `ready`
- `partial`
- `blocked`

### `ready`

Le dossier permet une analyse voisins / OGC exploitable en brouillon avec
titulaire, acte et posture de gestion suffisamment identifies.

### `partial`

Le dossier permet un brouillon structure, mais avec trous ou fragilites.

Cas frequents :

- titulaire plausible mais chaine de droits `mixed` ;
- acte d'exploitation connu mais consentement incomplet ;
- OGC probable mais perimetre ou repartition a verifier ;
- signal IA / NFT present mais secondaire.

La sortie garde alors :

- `[PROVISOIRE]`
- `[a verifier]`
- `[A COMPLETER]`

### `blocked`

Bloquer si :

- `rights_chain_status = blocked` ;
- aucun titulaire ou categorie de titulaire ne peut etre identifie ;
- aucun acte d'exploitation cible ne peut etre formule ;
- le sujet reel devient principalement auteur, contrat global ou contentieux ;
- aucune source consultee et datee ne peut etre documentee.

## 8. Frontieres

### Route to `qualification-oeuvre`

Si la question dominante devient l'originalite ou la qualification auteur de
l'oeuvre elle-meme.

### Route to `licence-droit-auteur`

Si le besoin reel devient la structuration d'une licence d'exploitation.

### Route to `cession-droit-auteur`

Si le besoin reel devient un transfert patrimonial ou un chain-of-title cleanup.

### Route to `contrefacon-droit-auteur`

Si le sujet principal devient une atteinte auteur au fond.

### Route to `contentieux-pi`

Si le sujet principal devient la strategie judiciaire ou pre-judiciaire.

### Route to `contrats-pi`

Si la question releve d'un montage contractuel PI plus large qu'une simple
lecture voisins / OGC.

### Outside scope

Le skill reste dans son couloir si la question porte bien sur :

- droits voisins ;
- gestion collective ;
- remuneration equitable ;
- signal borne IA / NFT en tant qu'accessoire.

## 9. Sortie V2

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

## 10. Decision Routing ferme

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

## 11. Impact documentaire attendu

Le lot V2 devra mettre a jour :

- `plugins/hacienda-propriete-intellectuelle/skills/droits-voisins-ogc/SKILL.md`
- un memo compact de routing / output
- `plugins/hacienda-propriete-intellectuelle/README.md`
- `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

## 12. Resultat attendu

Apres migration, `droits-voisins-ogc` doit etre lisible comme :

- un skill strict de qualification voisins / OGC ;
- distinct de l'auteur, des contrats et du contentieux ;
- avec IA et NFT gardes comme signaux secondaires ;
- avec un gate clair, un routing ferme et une sortie stable.
