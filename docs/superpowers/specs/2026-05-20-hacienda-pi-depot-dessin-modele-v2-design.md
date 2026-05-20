# Spec V2 — `depot-dessin-modele`

Date: 2026-05-20
Plugin: `hacienda-propriete-intellectuelle`
Skill cible: `plugins/hacienda-propriete-intellectuelle/skills/depot-dessin-modele/SKILL.md`
Statut: design valide pour passage au plan

## 1. Objectif

Faire passer `depot-dessin-modele` d'un V1 compact a un V2 de
**preparation de depot enregistre stricte**, avec :

- un contrat d'entree ferme ;
- un `Filing Readiness Gate` ;
- des lanes explicites `fr`, `eu`, `hague`, `sequenced` ;
- une sortie stabilisee ;
- un signal secondaire borne pour le `DMCNE`, sans en faire une lane egale
  au depot enregistre.

## 2. Probleme du skill actuel

Le skill actuel est utile, mais il melange :

- preparation du depot ;
- strategie de territoire ;
- checklist reproductions ;
- priorite unioniste ;
- ajournement ;
- taxes ;
- signal non enregistre implicite.

Le probleme n'est pas le fond. Le probleme est l'absence de contrat V2 ferme
et de hierarchie claire entre :

- le coeur depot enregistre ;
- les options strategiques ;
- le fallback non enregistre.

## 3. Positionnement V2

`depot-dessin-modele` V2 devient le skill de :

1. preparation stricte d'un dossier de depot D&M enregistre ;
2. choix de lane `fr`, `eu`, `hague` ou `sequenced` ;
3. verification des preconditions de depot ;
4. cadrage des reproductions, de la classification, de la priorite et de
   l'ajournement ;
5. production d'un brouillon de dossier pret a deposer ;
6. routage ferme vers la bonne brique amont ou aval.

Le skill ne doit pas :

- remplacer la recherche d'anteriorites ;
- remplacer l'analyse de contrefacon D&M ;
- devenir un memo autonome sur le DMCNE ;
- produire un depot effectif ;
- produire un dossier final non relu par un mandataire ou un avocat.

## 4. Approches ecartees

### Option A — Depot enregistre pur sans fallback

Ne parler que du depot FR / EU / Hague.

Probleme :
- trop rigide ;
- ne gere pas bien les cas ou la divulgation a deja eu lieu ;
- ne signale pas assez la posture non enregistree UE quand elle devient
  tactiquement utile.

### Option B — DMCNE comme lane egale

Ajouter une lane `unregistered-eu-design` au meme niveau que `fr`, `eu`,
`hague`.

Probleme :
- brouille l'identite du skill ;
- fait croire que le non-enregistre est une forme de depot alternatif ;
- dilue la qualite du coeur enregistre.

### Option C — Recommandee

Garder le depot enregistre comme coeur, avec :

- `fr`
- `eu`
- `hague`
- `sequenced`

Et conserver `DMCNE` uniquement comme **signal ou fallback borne** dans la
strategie finale.

## 5. Architecture fonctionnelle retenue

### 5.1 Coeur du skill

Le coeur V2 traite :

- office et lane de depot ;
- produit et classification ;
- reproductions ;
- deposant et createur ;
- depot simple ou multiple ;
- priorite ;
- publication differee ;
- taxes et mecanique de depot.

### 5.2 Signal secondaire `DMCNE`

Le skill garde un bloc borne de signalement `DMCNE` pour les cas ou :

- la divulgation a peut-etre deja eu lieu ;
- l'option non enregistree peut encore avoir une utilite pratique ;
- le depot enregistre n'est plus optimal ou doit etre accompagne d'une
  analyse complementaire.

Ce bloc ne remplace pas la lane principale de depot.

## 6. Contrat d'entree V2

Le skill doit expliciter ou deriver :

- `filing_lane` :
  - `fr`
  - `eu`
  - `hague`
  - `sequenced`
- `design_status` :
  - `new`
  - `possibly-disclosed`
  - `already-disclosed`
  - `uncertain`
- `filing_scope` :
  - `single`
  - `multiple`
- `priority_status` :
  - `none`
  - `available`
  - `expiring`
  - `lost`
- `publication_strategy` :
  - `immediate`
  - `deferred`
  - `undecided`
- `visual_readiness` :
  - `complete`
  - `partial`
  - `weak`
  - `blocked`
- `classification_status` :
  - `clear`
  - `mixed`
  - `uncertain`

### Faits minimums

Le skill doit refuser une sortie "prete au depot" si manquent :

- design ou serie de designs visee ;
- visuels disponibles ;
- produit ou indication produit ;
- deposant ;
- createur ;
- territoire vise ;
- posture simple ou multiple ;
- priorite oui/non et date si invoquee ;
- choix ou etat d'ajournement.

## 7. Gate central

Le skill ajoute un `Filing Readiness Gate` :

- `ready`
- `partial`
- `blocked`

### `ready`

Le dossier permet un brouillon de depot exploitable.

### `partial`

Le dossier permet un brouillon, mais certaines briques restent a completer :

- vues manquantes ;
- Locarno incertain ;
- priorite non securisee ;
- ajournement non arbitre ;
- depot multiple encore a rationaliser.

La sortie garde alors :

- `[PROVISOIRE]`
- `[a verifier]`
- `[A COMPLETER]`

### `blocked`

Le skill doit bloquer si :

- reproductions insuffisantes ;
- Locarno trop incertain ;
- deposant ou createur mal identifies ;
- nouveaute possiblement detruite sans clarification ;
- priorite mal documentee ;
- depot multiple incoherent.

## 8. Frontieres obligatoires

### Route to `recherche-anteriorite-dm`

Si le vrai point bloquant est la recherche d'anteriorites ou la robustesse de
la nouveaute / du caractere individuel.

### Route to `contrefacon-dessin-modele`

Si la vraie question dominante devient contentieuse ou contradictoire sur un
titre D&M ou un droit non enregistre.

### Stay in `depot-dessin-modele`

Si la demande porte bien sur un depot, meme avec des arbitrages de priorite,
de publication ou de scope encore ouverts.

## 9. Sortie V2

La sortie doit etre stabilisee en 9 blocs :

1. `Case Snapshot`
2. `Filing Readiness Gate`
3. `Office And Lane Selection`
4. `Design And Product Definition`
5. `Reproductions And Visual Scope`
6. `Priority And Publication Strategy`
7. `Fees And Filing Mechanics`
8. `Decision Routing`
9. `Human Validation`

## 10. Contenu attendu par axe

### 10.1 Office And Lane Selection

Le skill doit justifier clairement le choix entre :

- FR ;
- EU ;
- Hague ;
- sequenced.

### 10.2 Design And Product Definition

Le skill doit rendre lisibles :

- produit ;
- classe Locarno ;
- eventuel depot simple ou multiple ;
- coherence entre les dessins du multiple.

### 10.3 Reproductions And Visual Scope

Le skill doit insister sur :

- nombre et qualite des vues ;
- coherence visuelle ;
- parties revendiquees / non revendiquees ;
- suffisance des reproductions pour definir l'etendue du titre.

### 10.4 Priority And Publication Strategy

Le skill doit toujours traiter :

- priorite oui/non ;
- delai restant ;
- perte ou non de priorite ;
- publication immediate ou differee ;
- interet de l'ajournement.

### 10.5 Fees And Filing Mechanics

Le skill doit rendre visibles :

- taxes attendues ;
- dependance au nombre de dessins ;
- dependance a l'ajournement ;
- dependance a l'office choisi.

### 10.6 `DMCNE` signal

Le skill doit signaler, sans changer de coeur, si :

- une divulgation a deja pu faire naitre un droit non enregistre UE ;
- le depot enregistre doit etre complete par une analyse aval ;
- le dossier n'est plus dans une posture de depot optimal.

## 11. Decision Routing ferme

Le skill doit se terminer par une seule route principale :

- `prepare-fr-filing`
- `prepare-eu-filing`
- `prepare-hague-filing`
- `prepare-sequenced-filing`
- `hold-for-prior-art-review`
- `hold-for-visual-cleanup`
- `signal-unregistered-eu-design-posture`
- `hold-insufficient-basis`

## 12. Exigences redactionnelles

Le skill doit :

- rappeler que le livrable est un brouillon de dossier, pas le depot effectif ;
- distinguer faits, droit, analyse, incertitudes, decisions et validation
  humaine ;
- conserver les marqueurs `[PROVISOIRE]`, `[a verifier]`, `[A COMPLETER]` ;
- garder le ton technique et borne ;
- mettre les reproductions au centre du risque de qualite.

## 13. Tests de validation

Le lot V2 devra etre verifie au moins sur :

1. depot INPI simple avec vues completes ;
2. depot EU multiple coherent ;
3. depot Hague avec designations internationales ;
4. trajectoire `sequenced` avec priorite encore disponible ;
5. dossier bloque faute de vues suffisantes ;
6. dossier bloque faute de Locarno assez solide ;
7. dossier reroute vers `recherche-anteriorite-dm` ;
8. dossier avec signal `DMCNE` secondaire.

## 14. Impact attendu

Apres migration :

- `depot-dessin-modele` devient plus precis, plus lisible et plus exploitable ;
- la frontiere avec `recherche-anteriorite-dm` et
  `contrefacon-dessin-modele` devient nette ;
- le coeur depot enregistre est protege contre la derive doctrinale ;
- le `DMCNE` reste visible, mais ne brouille plus l'identite du skill.
