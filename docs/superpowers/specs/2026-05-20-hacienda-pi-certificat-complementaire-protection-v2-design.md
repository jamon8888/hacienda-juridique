# Spec V2 - `certificat-complementaire-protection`

Date: 2026-05-20
Plugin: `hacienda-propriete-intellectuelle`
Skill cible: `plugins/hacienda-propriete-intellectuelle/skills/certificat-complementaire-protection/SKILL.md`
Statut: design valide pour passage au plan

## 1. Objectif

Faire passer `certificat-complementaire-protection` d'un V1 compact a un V2
de **readiness CCP strict**, avec :

- un contrat d'entree ferme ;
- un `CCP Readiness Gate` ;
- un coeur recentre sur l'eligibilite, le calcul de duree et la preparation
  du dossier ;
- une sortie stabilisee ;
- des branches secondaires bornees pour `check` et
  `manufacturing-waiver-signal`.

## 2. Probleme du skill actuel

Le skill actuel est utile, mais il melange :

- analyse d'eligibilite ;
- calcul de duree ;
- preparation de demande ;
- verification d'un CCP existant ;
- extension pediatrique ;
- manufacturing waiver ;
- posture princeps et entree generique.

Le probleme n'est pas la matiere. Le probleme est l'absence d'un contrat V2
ferme qui distingue clairement :

- le **coeur eligibility / readiness** ;
- la **verification d'un CCP existant** ;
- le **signal waiver** ;
- la **validation finale specialistes pharma / PI**.

## 3. Positionnement V2

`certificat-complementaire-protection` V2 devient le skill de :

1. qualification d'un dossier CCP medicament ou phyto ;
2. verification des conditions d'eligibilite article 3 ;
3. calcul de duree et de fenetre de depot ;
4. signalement de l'extension pediatrique si pertinente ;
5. preparation d'un brouillon de dossier de demande ou d'une note de
   verification ;
6. routage ferme vers la bonne brique voisine.

Le skill ne doit pas :

- deposer effectivement une demande CCP ;
- remplacer la revue finale mandataire brevets / avocat life sciences ;
- devenir un memo complet d'entree generique ;
- remplacer une analyse de validite offensive ou defensive du brevet de base ;
- se substituer a un audit portefeuille pharma complet.

## 4. Approches ecartees

### Option A - Eligibility pure sans `check` ni `waiver`

Ne traiter que les cas de preparation de demande.

Probleme :
- trop etroit pour l'usage reel ;
- ignore les usages frequents de verification de CCP existant ;
- laisse un trou operationnel autour du `manufacturing waiver`.

### Option B - Eligibility et defense generique au meme niveau

Traiter la demande CCP et la posture d'entree generique comme deux coeurs
equivalents.

Probleme :
- brouille l'identite du skill ;
- overlap direct avec contentieux / portefeuille / strategie plus larges ;
- dilue la qualite du coeur readiness.

### Option C - Recommandee

Garder **eligibility / calcul / readiness** comme coeur, avec :

- `eligibility`
- `apply`
- `check`

Et conserver `manufacturing-waiver-signal` uniquement comme **branche
secondaire bornee** quand la situation l'impose.

## 5. Architecture fonctionnelle retenue

### 5.1 Coeur du skill

Le coeur V2 traite :

- brevet de base ;
- produit ;
- AMM ;
- premiere AMM UE ;
- article 3(a) a 3(d) ;
- calcul de duree article 13 ;
- delai de depot article 7 ;
- extension pediatrique ;
- readiness du brouillon.

### 5.2 Branche secondaire `check`

Le skill garde une branche `check` pour :

- verifier un CCP existant ;
- recalculer son expiration apparente ;
- signaler les points de fragilite evidents ;
- preparer un reroutage si la question devient contentieuse ou portefeuille.

Cette branche ne remplace pas une analyse contradictoire complete.

### 5.3 Branche secondaire `manufacturing-waiver-signal`

Le skill garde un signal borne de `manufacturing waiver` pour :

- rappeler les fenetres export / stockage ;
- identifier les notifications a verifier ;
- qualifier un risque d'entree generique apparent.

Cette branche ne transforme pas le skill en memo d'entree generique autonome.

## 6. Contrat d'entree V2

Le skill doit expliciter ou deriver :

- `mode` :
  - `eligibility`
  - `apply`
  - `check`
- `product_track` :
  - `medicinal`
  - `plant-protection`
- `base_patent_status` :
  - `clear`
  - `mixed`
  - `weak`
  - `unknown`
- `authorization_posture` :
  - `valid-first-eu`
  - `valid-but-first-eu-unclear`
  - `authorization-unclear`
  - `blocked`
- `claim_match_posture` :
  - `strong`
  - `mixed`
  - `weak`
  - `unknown`
- `pediatric_extension_status` :
  - `not-applicable`
  - `possible`
  - `documented`
  - `unclear`
- `waiver_posture` :
  - `none`
  - `export-signal`
  - `stockpiling-signal`
  - `mixed`

### Faits minimums

Le skill doit refuser une sortie exploitable si manquent :

- numero et statut du brevet de base ;
- date de depot du brevet ;
- date d'expiration du brevet ou base raisonnable pour la determiner ;
- produit ou substance active visee ;
- reference AMM, autorite et date ;
- qualification medicament / phyto ;
- contexte `eligibility`, `apply` ou `check`.

Selon le mode, ajouter si disponible :

- en `apply` : pieces de dossier et office cible ;
- en `check` : reference CCP, date de delivrance, extension pediatrique oui/non ;
- en signal `waiver` : notifications recues ou fenetre presumee d'entree.

Tout manque reste `[a verifier]`.

## 7. Gate central

Le skill ajoute un `CCP Readiness Gate` :

- `ready`
- `partial`
- `blocked`

### `ready`

Le dossier permet une conclusion exploitable sur l'eligibilite ou un
brouillon de preparation de demande.

### `partial`

Le dossier permet une analyse utile, mais avec angles morts :

- premiere AMM UE encore a confirmer ;
- match revendications / produit encore fragile ;
- extension pediatrique seulement plausible ;
- pieces de depot pas encore toutes verifiees ;
- signal waiver a consolider.

La sortie garde alors :

- `[PROVISOIRE]`
- `[a verifier]`
- `[A COMPLETER]`

### `blocked`

Le skill doit bloquer si :

- le brevet de base n'est pas identifiable ou n'est pas en posture exploitable ;
- aucune AMM exploitable n'est documentee ;
- le produit cible ne peut pas etre rattache au brevet de base ;
- la date de depot ou d'expiration du brevet ne peut pas etre etablie ;
- le mode choisi impose des pieces minimales absentes ;
- aucune source effectivement consultee et datee ne peut etre documentee.

En `blocked`, ne pas simuler une eligibilite favorable. Sortir en
`hold-insufficient-basis`.

## 8. Frontieres obligatoires

### Route to `preparation-depot-brevet`

Si la vraie question dominante redevient la preparation du brevet de base ou
de ses revendications, pas le CCP.

### Route to `analyse-refus-inpi`

Si la question dominante devient une notification de prosecution du brevet,
pas la couche CCP.

### Route to `anteriorite-invalidite`

Si la question dominante devient la validite offensive ou defensive du brevet
de base.

### Route to `revue-portefeuille-brevets`

Si le besoin principal devient la vision portefeuille, calendrier,
renouvellements, expiration et priorisation multi-actifs.

### Stay in `certificat-complementaire-protection`

Si la question porte bien sur eligibility, calcul, depot, verification de
CCP, extension pediatrique ou signal waiver borne.

## 9. Sortie V2

La sortie doit etre stabilisee en 9 blocs :

1. `Case Snapshot`
2. `CCP Readiness Gate`
3. `Base Patent And Product Match`
4. `Authorization And First EU Marketing Posture`
5. `Article 3 Eligibility`
6. `Duration And Extension Calculation`
7. `Filing Window Or Existing CCP Check`
8. `Decision Routing`
9. `Human Validation`

## 10. Contenu attendu par axe

### 10.1 Base Patent And Product Match

Le skill doit rendre lisibles :

- le brevet de base ;
- le produit ;
- la force du match revendications / produit ;
- les points de doute sur l'article 3(a).

### 10.2 Authorization And First EU Marketing Posture

Le skill doit dire clairement :

- quelle AMM est retenue ;
- si elle parait valide ;
- pourquoi elle parait ou non etre la premiere AMM UE pertinente ;
- ce qui manque pour verrouiller l'article 3(d).

### 10.3 Article 3 Eligibility

Le skill doit distinguer explicitement :

- article 3(a) produit protege ;
- article 3(b) AMM valide ;
- article 3(c) absence de CCP anterieur ;
- article 3(d) premiere AMM UE ;
- etat global de l'eligibilite.

### 10.4 Duration And Extension Calculation

Le skill doit expliciter :

- formule de calcul ;
- dates retenues ;
- resultat ;
- extension pediatrique oui/non/incertaine ;
- tout plafonnement ou resultat nul.

### 10.5 Filing Window Or Existing CCP Check

Le skill doit rendre visible :

- fenetre de depot si `eligibility` ou `apply` ;
- reference et expiration si `check` ;
- signal `manufacturing waiver` si pertinent, sans en faire le coeur du
  dossier.

## 11. Routing ferme

`Decision Routing` doit rester borne a :

- `prepare-ccp-application`
- `prepare-ccp-application-with-caution`
- `hold-for-claim-scope-review`
- `hold-for-first-amm-review`
- `hold-for-duplicate-ccp-review`
- `signal-manufacturing-waiver-posture`
- `route-to-patent-invalidity-review`
- `route-to-patent-portfolio-review`
- `hold-insufficient-basis`

## 12. Impacts documentaires

### 12.1 Skill cible

Refondre
`plugins/hacienda-propriete-intellectuelle/skills/certificat-complementaire-protection/SKILL.md`
pour :

- expliciter le positionnement V2 ;
- fermer l'intake ;
- ajouter le `CCP Readiness Gate` ;
- stabiliser la sortie ;
- borner `check` et `manufacturing-waiver-signal` ;
- clarifier les frontieres avec la lane brevets.

### 12.2 Reference dediee

Ajouter :

- `plugins/hacienda-propriete-intellectuelle/skills/certificat-complementaire-protection/references/certificat-complementaire-protection-routing-and-output.md`

Cette reference doit resumer :

- intake V2 ;
- gate ;
- article 3 ;
- calcul de duree ;
- matrice de risque ;
- routing final.

### 12.3 README / changelog

Mettre a jour :

- `plugins/hacienda-propriete-intellectuelle/README.md`
- `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

pour refleter :

- le recentrage readiness CCP ;
- les branches secondaires bornees ;
- les nouvelles frontieres avec les skills brevets voisins.

## 13. Verification attendue

Avant integration :

- `npm test`
- `npm run typecheck`
- `npm run build`
- `npm run branding:check`
- `git diff --check`

Apres commit / merge :

- `npx gitnexus analyze`

