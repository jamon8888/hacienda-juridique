---
name: cession-droit-auteur
version: "2.0.0"
description: >
  Skill V2 strict de preparation d'une cession de droits patrimoniaux
  d'auteur. Il fixe un contrat d'entree ferme, un Assignment Readiness Gate,
  une branche bornee de title-chain cleanup, une sortie stabilisee en 9
  blocs, et un routage ferme vers la bonne voie PI. Il ne remplace pas la
  qualification de l'oeuvre, la licence, le regime logiciel, ni un contrat PI
  plus large.
argument-hint: "[full-assignment|partial-assignment|exclusive-assignment|non-exclusive-assignment]"
---

# /cession-droit-auteur

Ce skill prepare un **brouillon de cession patrimoniale stricte**. Il ne
produit pas un contrat final signable, ne remplace pas l'avocat, ne remplace
pas la qualification de l'oeuvre, ne remplace pas une licence quand un
transfert de titularite est inutile, ne remplace pas le regime logiciel, et ne
se transforme pas en orchestrateur de portefeuille.

## Profil pratique a charger avant analyse

Avant toute redaction, charger :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Le profil pratique calibre la posture de travail, le niveau de prudence, et la
forme des avertissements. Si le profil est incomplet ou non configure, garder
les marqueurs de brouillon et les faire apparaitre explicitement :

- `[PROVISOIRE]`
- `[a verifier]`
- `[A COMPLETER]`

Toute source, tout fait de contexte, ou toute base de titularite non verifies
reste marque `[a verifier]`.

## Garde-fous juridiques permanents

Le skill doit toujours garder visibles les limites suivantes :

- `L.131-3` : ecrit, enumeration des droits, domaines d'exploitation,
  territoires, duree, remuneration
- `L.131-4` : principe de remuneration proportionnelle et cas limits du forfait
- `L.131-1` : interdiction de la cession globale des oeuvres futures hors
  exception
- le droit moral est inalienable et ne se cede pas
- la sortie distingue toujours faits, droit, analyse, risques, decision et
  validation humaine

## Contrat d'entree ferme

Le skill doit deriver ou expliciter un des statuts fermes suivants pour chaque
dossier :

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

Les statuts sont fermes. Le skill ne doit pas inventer de semi-vrai centre ou
de prose libre a la place du contrat d'entree.

## Faits minimums requis

Ne pas produire une sortie propre si manquent :

- l'oeuvre ou le corpus vise
- l'identite du cedant
- l'identite du cessionnaire
- la base de titularite du cedant
- les droits vises
- le territoire
- la duree
- le modele economique
- le contexte de creation
- le statut coauteur / employeur / prestataire si pertinent

Si les faits sont incomplets mais que le dossier reste exploitable, produire un
brouillon `partial` et garder les marqueurs `[PROVISOIRE]`, `[a verifier]` et
`[A COMPLETER]` visibles dans la sortie.

## Assignment Readiness Gate

Le skill applique un gate ferme avec trois issues :

- `ready`
- `partial`
- `blocked`

### `ready`

Le dossier permet un brouillon de cession exploitable. La base de titularite
est suffisante, le contexte est lisible, et le track retenu est coherent avec
la demande.

### `partial`

Le dossier permet un brouillon, mais certains points restent a confirmer. La
sortie doit alors conserver les marqueurs :

- `[PROVISOIRE]`
- `[a verifier]`
- `[A COMPLETER]`

### `blocked`

Bloquer si au moins un de ces cas domine :

- chaine de titularite trop incertaine pour une cession propre
- cession globale d'oeuvres futures hors exception admise
- une simple licence suffit manifestement
- personne morale qui pretend ceder sans base de titularite claire
- coauteurs ou ayants droit necessaires non securises

Quand le gate est bloque, le skill doit orienter vers la bonne branche ou
arreter proprement avec les regularisations a faire.

## Axe 1 - Work And Title Preconditions

Cette premiere bloc doit verifier et resumer :

- la qualification minimale de l'oeuvre
- la qualite du cedant
- la presence de coauteurs ou ayants droit
- le contexte salarie, commande, collaboration, edition ou audiovisuel
- l'existence d'une cession anterieure ou d'une chaine de droits
- la limite absolue du droit moral

Si l'oeuvre elle-meme n'est pas encore qualifiable, router hors du skill.

## Axe 2 - Chosen Transfer Track

Le skill choisit clairement un seul track principal parmi :

- cession totale
- cession partielle
- exclusivite
- non-exclusivite

Le track retenu doit etre justifie par la structure de l'exploitation, la
position du cessionnaire, la posture de la chaine de titre, et le niveau de
risque residuel.

## Axe 3 - Rights Scope And Exploitation Structure

Le skill doit toujours rendre lisibles :

- les droits cedes
- les domaines d'exploitation
- le territoire
- la duree
- les supports et usages vises
- les usages exclus

Si le perimetre est trop large sans base solide, le score de readiness baisse
et le dossier peut basculer en `partial` ou `blocked`.

## Axe 4 - Economic Structure

Le skill doit rendre visible :

- la logique proportionnelle de `L.131-4`
- le cas exceptionnel justifiant un forfait, si forfait il y a
- l'avance ou l'acompte quand il accompagne une logique proportionnelle
- le risque de requalification ou de faiblesse de structuration

Ne pas masquer un forfait non justifie sous une formule prudente.

## Axe 5 - Title-Chain Cleanup Or Blocking Points

Quand `title_chain_status` n'est pas `clear`, la sortie doit identifier :

- le point de rupture
- la personne manquante
- le document manquant
- la regularisation requise
- la consequence sur la route finale

La branche de cleanup ne doit jamais simuler un dossier complet alors que la
chaine de titre reste instable.

### Branche bornee `title-chain-cleanup`

Cette branche sert uniquement a regulariser ou bloquer. Elle couvre :

- coauteurs non securises
- signatures manquantes
- prestation commandee sans cession valable
- salarie hors logiciel mal compris
- personne morale sans base de titularite
- oeuvre collective revendiquee sans base suffisante
- cession anterieure non documentee
- ayants droit non identifies

Elle ne devient pas un audit general du portefeuille. Elle ne remplace pas le
skill `contrats-pi`, ni `qualification-oeuvre`, ni `licence-droit-auteur`.

## Frontieres obligatoires

### Route to `qualification-oeuvre`

Si la qualification de l'oeuvre, son originalite, ou la titularite initiale
restent trop incertaines.

### Route to `licence-droit-auteur`

Si la demande releve en realite d'une autorisation d'exploitation et non d'un
transfert de titularite.

### Route to `logiciels-pi`

Si le coeur du sujet est le regime logiciel, notamment :

- `L.113-9`
- code source
- droit d'utilisation logiciel
- licence logicielle dominante

### Route to `contrats-pi`

Si la cession n'est qu'un volet d'un contrat PI plus large.

## Sortie V2 stabilisee en 9 blocs

La sortie doit toujours utiliser exactement ces 9 blocs et aucun autre titre
de bloc de haut niveau :

1. `Case Snapshot`
2. `Assignment Readiness Gate`
3. `Work And Title Preconditions`
4. `Chosen Transfer Track`
5. `Rights Scope And Exploitation Structure`
6. `Economic Structure`
7. `Title-Chain Cleanup Or Blocking Points`
8. `Decision Routing`
9. `Human Validation`

### Attendus par bloc

- `Case Snapshot` : resume ferme des faits, du contexte, du track pressenti et
  du niveau de certitude
- `Assignment Readiness Gate` : statut `ready`, `partial` ou `blocked`,
  justifie de maniere concise
- `Work And Title Preconditions` : qualification, titularite, auteurs, chaine
  de droits, contexte
- `Chosen Transfer Track` : track retenu et raison
- `Rights Scope And Exploitation Structure` : droits, domaines, territoire,
  duree, usages, exclusions
- `Economic Structure` : logique remuneration, proportionnel ou forfait
  justifie, risques
- `Title-Chain Cleanup Or Blocking Points` : rupture, manque, regularisation ou
  blocage
- `Decision Routing` : une seule issue fermee
- `Human Validation` : validation humaine requise avant toute suite

Les brouillons `partial` conservent partout ou necessaire les marqueurs
`[PROVISOIRE]`, `[a verifier]` et `[A COMPLETER]`.

## Decision Routing ferme

Le skill doit terminer par une seule route principale parmi :

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

### Usage de chaque route

- `prepare-full-assignment-draft` : cession large, base solide, title chain
  clair
- `prepare-partial-assignment-draft` : cession ciblee avec zones reservees ou
  facts incomplets mais exploitables
- `prepare-exclusive-assignment-draft` : transfert exclusif securise
- `prepare-non-exclusive-assignment-draft` : transfert non exclusif securise
- `route-to-work-qualification` : qualification amont encore insuffisante
- `route-to-license-instead` : exploitation a autoriser, pas a transferer
- `route-to-title-chain-cleanup` : regularisation de titre avant cession
- `route-to-software-regime-review` : regime logiciel dominant
- `route-to-broader-pi-contract` : cession incluse dans un contrat PI plus large
- `hold-insufficient-basis` : base insuffisante ou blocage non resolu

Ne pas inventer de semantique de routage supplementaire.

## Ton et validation humaine

Le ton doit rester juridique, precis et ferme. Le skill doit :

- rappeler que le droit moral ne se cede pas
- garder les garde-fous `L.131-3`, `L.131-4`, `L.131-1`
- distinguer faits, droit, analyse, risques, decision et validation humaine
- assumer un brouillon structure, jamais un contrat final valide

La validation humaine est obligatoire a la fin de chaque sortie.
