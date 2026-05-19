# Spec V2 — `cession-droit-auteur`

Date: 2026-05-19
Plugin: `hacienda-propriete-intellectuelle`
Skill cible: `plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur/SKILL.md`
Statut: design valide pour passage au plan

## 1. Objectif

Faire passer `cession-droit-auteur` d'un V1 monolithique a un V2 centre sur la
**cession patrimoniale stricte**, avec :

- un contrat d'entree ferme ;
- un gate de readiness ;
- une sortie stabilisee ;
- des frontieres nettes avec `qualification-oeuvre`,
  `licence-droit-auteur`, `logiciels-pi` et `contrats-pi` ;
- une branche secondaire de **chain-of-title cleanup** pour bloquer ou
  regulariser les dossiers mal securises.

## 2. Probleme du skill actuel

Le skill actuel est riche, mais trop large :

- il melange redaction de cession, qualification amont, chaines de titularite,
  editions, audiovisuel, commande, salariat et guardrails doctrinaux ;
- il manque d'un contrat V2 lisible ;
- il ne separe pas assez la **redaction de cession** du **nettoyage de chaine
  de droits** ;
- il exploite mal les frontieres V2 deja posees ailleurs.

Le probleme n'est pas le fond juridique. Le probleme est la structure.

## 3. Positionnement V2

`cession-droit-auteur` V2 devient le skill de :

1. preparation d'une cession de droits patrimoniaux d'auteur ;
2. verification des preconditions `L.131-3`, `L.131-4` et `L.131-1` ;
3. choix du bon `transfer_track` ;
4. calibration des droits cedes, des domaines d'exploitation, du territoire,
   de la duree et de la remuneration ;
5. mesure du risque de nullite ou de requalification ;
6. routage vers une regularisation de chaine de droits quand la cession ne peut
   pas encore etre proprement redigee.

Le skill ne doit pas :

- remplacer la qualification d'une oeuvre encore incertaine ;
- remplacer une licence quand une simple autorisation suffit ;
- remplacer le regime logiciel ;
- remplacer un contrat PI global ;
- produire un instrument final signable sans validation humaine.

## 4. Approches ecartees

### Option A — Cession pure seulement

Ne garder que la redaction de cession.

Probleme :
- trop theorique ;
- ne gere pas bien les vrais blocages de chain-of-title ;
- conduit a sur-rediger des cessions sur bases instables.

### Option B — Cession et chain-of-title au meme niveau

Faire du skill un double coeur :

- cession
- audit de chaine de droits

Probleme :
- le skill redevient un monolithe ;
- le flux de redaction devient moins net.

### Option C — Recommandee

Garder :

- un coeur de **cession patrimoniale stricte**
- une branche secondaire **chain-of-title cleanup**

La branche cleanup sert a :

- bloquer proprement ;
- lister les regularisations requises ;
- router vers la bonne action amont.

## 5. Architecture fonctionnelle retenue

### 5.1 Coeur du skill

Le coeur V2 traite :

- l'oeuvre cedee ;
- le cedant ;
- le cessionnaire ;
- les droits cedes ;
- les domaines d'exploitation ;
- le territoire ;
- la duree ;
- la remuneration ;
- l'exclusivite ;
- les garanties ;
- le droit moral comme limite non cessible.

### 5.2 Branche secondaire

La branche `title-chain-cleanup` traite les blocages de type :

- coauteurs non securises ;
- signatures manquantes ;
- prestataire sans cession valable ;
- employeur hors logiciel croyant detenir automatiquement les droits ;
- personne morale sans base de titularite ;
- oeuvre collective revendiquee sans base suffisante ;
- cession anterieure non documentee ;
- ayants droit non identifies.

Cette branche ne doit pas devenir un audit general. Elle ne sert qu'a preparer
une cession propre ou a bloquer la sortie.

## 6. Contrat d'entree V2

Le skill doit expliciter ou deriver :

- `transfer_track` :
  - `full-assignment`
  - `partial-assignment`
  - `exclusive-assignment`
  - `non-exclusive-assignment`
- `creation_context` :
  - `independent-author`
  - `commissioned-work`
  - `employee-non-software`
  - `collective-work-claim`
  - `collaborative-work`
  - `audiovisual`
  - `publishing`
- `title_chain_status` :
  - `clear`
  - `mixed`
  - `uncertain`
  - `blocked`
- `work_status` :
  - `qualified`
  - `partially-qualified`
  - `uncertain`
- `economic_model` :
  - `royalty`
  - `flat-fee`
  - `advance-plus-royalty`
  - `mixed`
- `scope_posture` :
  - `narrow`
  - `standard`
  - `broad`
  - `all-current-uses`
- `counterparty_profile` :
  - `publisher`
  - `producer`
  - `brand`
  - `platform`
  - `customer`
  - `internal-group`
  - `mixed`

### Faits minimums

Le skill doit refuser une sortie "propre" si manquent :

- oeuvre ou corpus vise ;
- identite du cedant ;
- identite du cessionnaire ;
- base de titularite du cedant ;
- droits vises ;
- territoire ;
- duree ;
- modele economique ;
- contexte de creation ;
- statut coauteur / employeur / prestataire si pertinent.

## 7. Gate central

Le skill ajoute un `Assignment Readiness Gate` :

- `ready`
- `partial`
- `blocked`

### `ready`

Le dossier permet un brouillon de cession exploitable.

### `partial`

Le skill peut produire un brouillon, mais doit conserver :

- `[PROVISOIRE]`
- `[a verifier]`
- `[A COMPLETER]`

### `blocked`

Le skill doit bloquer si :

- la chaine de titularite est trop incertaine ;
- la demande porte sur une cession globale d'oeuvres futures hors exception ;
- une simple licence suffit manifestement ;
- une personne morale pretend ceder sans base de titularite claire ;
- des coauteurs ou ayants droit necessaires ne sont pas securises.

## 8. Frontieres obligatoires

### Route to `qualification-oeuvre`

Si l'oeuvre, son originalite ou sa qualification restent trop incertaines.

### Route to `licence-droit-auteur`

Si la demande releve en realite d'une autorisation d'exploitation plutot que
d'un transfert patrimonial.

### Route to `logiciels-pi`

Si le coeur du sujet est le regime logiciel, notamment :

- devolution `L.113-9` ;
- code source ;
- interop ;
- logic licensing dominante.

### Route to `contrats-pi`

Si la cession n'est qu'un volet d'un contrat PI global plus large.

## 9. Sortie V2

La sortie doit etre stabilisee en 9 blocs :

1. `Case Snapshot`
2. `Assignment Readiness Gate`
3. `Work And Title Preconditions`
4. `Chosen Transfer Track`
5. `Rights Scope And Exploitation Structure`
6. `Economic Structure`
7. `Title-Chain Cleanup Or Blocking Points`
8. `Decision Routing`
9. `Human Validation`

## 10. Contenu attendu par axe

### 10.1 Work and title preconditions

Verifier :

- qualification de l'oeuvre ;
- qualite du cedant ;
- existence de coauteurs ;
- contexte salarie / commande / prestataire ;
- eventuelle cession anterieure ;
- limite absolue du droit moral.

### 10.2 Transfer track

Le skill doit choisir clairement entre :

- cession large ;
- cession partielle ;
- exclusivite ;
- non-exclusivite ;
- et expliquer pourquoi ce track est retenu.

### 10.3 Rights scope and exploitation structure

Toujours traiter :

- droits cedes ;
- domaines d'exploitation ;
- territoire ;
- duree ;
- supports ;
- usages exclus.

### 10.4 Economic structure

Toujours rendre visible :

- `L.131-4` ;
- posture proportionnelle ;
- cas de forfait si invoque ;
- justification du forfait ;
- risque de lésion ou de faiblesse de structuration.

### 10.5 Title-chain cleanup

Quand `title_chain_status` n'est pas `clear`, la sortie doit :

- identifier le point de rupture ;
- dire qui manque ;
- dire quel document manque ;
- dire quelle regularisation est necessaire ;
- ne pas cacher le blocage sous un faux brouillon complet.

## 11. Decision Routing ferme

Le skill doit se terminer par une seule route principale :

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

## 12. Exigences redactionnelles

Le skill doit :

- garder le rappel constant que le droit moral ne se cede pas ;
- maintenir les garde-fous `L.131-3`, `L.131-4`, `L.131-1` ;
- distinguer faits, droit, analyse, risques, decisions et validation humaine ;
- conserver les marqueurs `[PROVISOIRE]`, `[a verifier]`, `[A COMPLETER]` ;
- assumer un ton de brouillon structure, jamais de contrat final valide.

## 13. Tests de validation

Le lot V2 devra etre verifie au moins sur :

1. cession totale de commande design ;
2. cession partielle d'illustrations pour campagne limitee ;
3. cas edition auteur personne physique ;
4. cas audiovisuel avec presomption / garde-fous ;
5. cas ou une licence suffit et doit etre reroutee ;
6. cas salarie hors logiciel mal compris ;
7. cas personne morale sans chaine de titularite propre ;
8. cas coauteurs non securises ;
9. cas oeuvre future globalement cédée hors exception -> blocage.

## 14. Impact attendu

Apres migration :

- `cession-droit-auteur` devient plus lisible et plus exploitable ;
- la frontiere avec `licence-droit-auteur` et `qualification-oeuvre` devient
  nette ;
- les faux brouillons de cession sur chaines instables diminuent ;
- la regularisation de chaine de droits devient une issue structuree, sans
  noyer le coeur du skill.
