# Spec V2 — `licence-droit-auteur`

Date: 2026-05-19
Plugin: `hacienda-propriete-intellectuelle`
Skill cible: `plugins/hacienda-propriete-intellectuelle/skills/licence-droit-auteur/SKILL.md`
Statut: design valide pour passage au plan

## 1. Objectif

Faire passer `licence-droit-auteur` d'un skill V1 monolithique a un skill V2 de
**preparation de licence stricte**, avec des lanes explicites et des frontieres
fermes avec les autres skills auteur / logiciel / donnees / contrats.

Le skill doit rester le point d'entree pour preparer un **brouillon de licence**
sur une oeuvre protegee par le droit d'auteur, sans deriver :

- vers une cession de droits,
- vers une qualification amont de l'oeuvre,
- vers un contrat PI plus large,
- vers un audit logiciel ou donnees,
- ni vers une analyse contentieuse.

## 2. Probleme du skill actuel

Le skill actuel :

- couvre a la fois les licences bilaterales negociees et les politiques de
  diffusion ouverte ;
- melange les sujets auteur, logiciel, SaaS, bases de donnees et RGPD ;
- manque d'un contrat d'entree V2 ferme ;
- ne formalise pas assez le risque de glissement vers une cession ;
- ne stabilise pas les sorties ni les routes aval.

Le resultat est un skill utile mais trop large, qui ne profite pas encore des
frontieres V2 deja posees dans :

- `qualification-oeuvre`
- `logiciels-pi`
- `bases-de-donnees`
- `contrats-pi`
- `cession-droit-auteur`

## 3. Positionnement V2

`licence-droit-auteur` V2 devient le skill de :

- preparation d'une **licence de droits d'auteur** ;
- choix du **type de licence** ;
- verification des garde-fous `L.131-3` et `L.131-4` CPI ;
- cadrage du risque de **requalification en cession** ;
- production d'un **brouillon structure** avec clauses critiques ;
- orientation fermee vers les autres skills quand le sujet sort de son perimetre.

Le skill ne doit pas :

- qualifier l'originalite ou la titularite si elles sont encore incertaines ;
- rediger une cession ;
- remplacer le regime logiciel ;
- remplacer le regime bases de donnees ;
- remplacer un contrat PI global ;
- rendre un instrument final signable.

## 4. Approches ecartees

### Option A — Tout garder au meme niveau

Garder `exclusive`, `non-exclusive`, `creative-commons`, `software-eula`,
`saas-user-content` sur le meme plan fonctionnel.

Probleme :
- le skill reste flou ;
- les lanes standardisees et negociees ne repondent pas a la meme logique ;
- cela brouille la profondeur attendue des sorties.

### Option B — Sortir totalement l'open content

Retirer `creative-commons` et `open-content` du skill.

Probleme :
- perte d'un cas d'usage naturel ;
- fragmentation inutile ;
- moins bonne experience produit.

### Option C — Recommandee

Conserver toutes les lanes, mais avec une hierarchie claire :

- coeur du skill = licences commerciales / bilaterales / d'usage ;
- branche secondaire = politique de diffusion ouverte standardisee.

## 5. Architecture fonctionnelle retenue

### 5.1 Lanes fermees

`license_track` devient ferme :

- `exclusive`
- `non-exclusive`
- `creative-commons`
- `software-eula`
- `saas-user-content`

### 5.2 Hierarchie des lanes

#### Lanes coeur

- `exclusive`
- `non-exclusive`
- `software-eula`
- `saas-user-content`

Ces lanes doivent produire un vrai brouillon structure de licence.

#### Lane secondaire

- `creative-commons`

Cette lane reste dans le skill, mais comme **politique de diffusion ouverte** :
- choix de variante ;
- obligations d'attribution ;
- partage a l'identique ;
- non commercial ;
- pas de modification ;
- irrevocabilite ;
- compatibilites / incompatibilites ;
- risques avant diffusion.

Elle ne doit pas etre traitee comme un faux contrat negocie sur mesure.

## 6. Contrat d'entree V2

Le skill doit demander ou inferrer explicitement :

- `license_track` :
  - `exclusive`
  - `non-exclusive`
  - `creative-commons`
  - `software-eula`
  - `saas-user-content`
- `work_status` :
  - `qualified`
  - `partially-qualified`
  - `uncertain`
- `title_status` :
  - `clear`
  - `mixed`
  - `uncertain`
- `counterparty_profile` :
  - `publisher`
  - `producer`
  - `platform`
  - `customer`
  - `internal-group`
  - `public`
  - `mixed`
- `economic_model` :
  - `royalty`
  - `flat-fee`
  - `free-open`
  - `subscription`
  - `mixed`
- `reuse_scope` :
  - `narrow`
  - `standard`
  - `broad`
  - `global-platform`
- `data_personal_status` :
  - `yes`
  - `no`
  - `mixed`
  - `unknown`

### Faits minimums

Le skill doit refuser de produire une sortie "preparation solide" si les faits
minimums suivants manquent :

- oeuvre ou corpus vise ;
- identite du concedant ;
- identite du licencie ou du public cible ;
- perimetre des droits accordes ;
- duree ;
- territoire ;
- modele economique minimal ;
- sous-licence oui/non/incertain.

## 7. Gate central

Le skill ajoute un `License Readiness Gate` avec :

- `ready`
- `partial`
- `blocked`

### `ready`

Le skill peut preparer un brouillon structure exploitable.

### `partial`

Le skill peut produire un brouillon provisoire avec :

- `[PROVISOIRE]`
- `[a verifier]`
- `[A COMPLETER]`

### `blocked`

Le skill doit bloquer si :

- la qualification de l'oeuvre est trop incertaine ;
- la titularite est trop incertaine ;
- le dossier ressemble en realite a une cession ;
- le sujet est dominamment logiciel ou base de donnees sans analyse amont ;
- le contrat vise est plus large qu'une simple licence.

## 8. Frontieres obligatoires

### Route to `qualification-oeuvre`

Si l'originalite, la qualification de l'oeuvre ou la chaine de creation ne sont
pas assez etablies.

### Route to `cession-droit-auteur`

Si la demande ressemble a :

- un transfert complet ;
- une exclusivite trop large et quasi definitive ;
- une logique de vente de droits plutot que d'autorisation d'exploitation.

### Route to `logiciels-pi`

Si le coeur du sujet est le regime logiciel, notamment :

- interop ;
- retro-ingenierie ;
- code source ;
- architecture de diffusion open source ;
- questions licence logicielle techniques dominantes.

### Route to `bases-de-donnees`

Si le coeur du sujet est :

- structure auteur d'une base ;
- droit sui generis ;
- extraction / reutilisation de donnees ;
- API / scraping / open data.

### Route to `contrats-pi`

Si la licence n'est qu'un volet d'un contrat plus large :

- partenariat R&D ;
- distribution complexe ;
- franchise ;
- coexistence ;
- transfert technologique plus large.

### Route to plugin donnees personnelles

Si la question centrale devient la conformite RGPD plutot que la licence.

## 9. Sortie V2

La sortie doit etre stabilisee en 9 blocs.

1. `Case Snapshot`
2. `License Readiness Gate`
3. `Work And Title Preconditions`
4. `Chosen License Track`
5. `Economic And Exploitation Structure`
6. `Critical Clauses`
7. `Requalification And Compliance Risks`
8. `Decision Routing`
9. `Human Validation`

## 10. Contenu attendu par lane

### 10.1 `exclusive`

Le skill doit insister sur :

- perimetre exact des droits ;
- duree raisonnable ;
- territoire ;
- exclusivite precise ;
- minimum d'exploitation ;
- audit ;
- sous-licence ;
- sortie / reversion ;
- risque de requalification.

### 10.2 `non-exclusive`

Le skill doit insister sur :

- usage autorise ;
- supports ;
- audience ;
- duree ;
- territoire ;
- restrictions ;
- attribution ;
- sous-licence interdite ou encadree.

### 10.3 `creative-commons`

Le skill doit produire :

- variante proposee ;
- obligations d'attribution ;
- effet SA / ND / NC ;
- irrevocabilite ;
- risques de diffusion ;
- incompatibilites principales ;
- validation humaine avant mise en ligne.

### 10.4 `software-eula`

Le skill doit rester sur la structure de licence et renvoyer au besoin vers
`logiciels-pi` pour le fond technique du regime logiciel.

Points cibles :

- usage autorise ;
- postes / utilisateurs ;
- acces ;
- mise a jour ;
- support ;
- interdictions usuelles ;
- reversibilite si necessaire.

### 10.5 `saas-user-content`

Le skill doit couvrir :

- droits techniques minimums de la plateforme ;
- affichage / reproduction serveur / adaptation technique ;
- moderation et retrait ;
- duree apres cloture ;
- donnees personnelles ;
- sous-licence a des tiers si applicable ;
- articulation CGU / DPA / politique contenus.

## 11. Decision Routing ferme

Le skill doit se terminer par l'une de ces routes :

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

## 12. Exigences redactionnelles

Le skill doit :

- charger le profil organisationnel quand disponible ;
- maintenir les marqueurs `[PROVISOIRE]`, `[a verifier]`, `[A COMPLETER]` ;
- rappeler que la sortie est un **brouillon soumis a validation humaine** ;
- distinguer clairement :
  - faits,
  - droit,
  - analyse,
  - risques,
  - decisions,
  - clauses critiques.

## 13. Tests de validation

Le lot V2 devra etre verifie au moins sur :

1. licence exclusive editeur France 5 ans ;
2. licence non-exclusive photo / banque d'images ;
3. diffusion `CC BY-SA` d'un corpus editorial ;
4. EULA logiciel proprietaire simple ;
5. licence SaaS sur contenus utilisateur ;
6. dossier qui doit etre reroute vers `cession-droit-auteur` ;
7. dossier qui doit etre reroute vers `bases-de-donnees` ;
8. dossier bloque pour qualification insuffisante.

## 14. Impact attendu

Apres migration :

- `licence-droit-auteur` devient plus court a raisonner, plus stable, plus
  coherent avec la stack V2 ;
- les sorties auteur deviennent plus predictibles ;
- la frontiere avec `cession-droit-auteur`, `qualification-oeuvre`,
  `logiciels-pi`, `bases-de-donnees` et `contrats-pi` devient exploitable ;
- la lane `creative-commons` reste disponible sans diluer le coeur commercial du
  skill.
