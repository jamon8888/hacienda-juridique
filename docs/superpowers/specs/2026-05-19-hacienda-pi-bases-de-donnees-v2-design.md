# Bases De Donnees V2 Design

## Summary

`bases-de-donnees` doit passer d'un memo V1 large a un skill V2 centre sur la
**qualification stricte des regimes de protection** d'une base de donnees :

- droit d'auteur sur la structure ;
- droit sui generis sur le contenu / l'investissement ;
- qualification du producteur / titulaire / exploitant ;
- qualification des risques d'extraction / reutilisation ;
- signalement RGPD si des donnees personnelles sont impliquees.

Une **branche contractuelle structuree** peut rester presente, mais comme
**issue secondaire et bornee**, jamais comme axe principal du skill.

## Problem

Le skill actuel est utile, mais il melange encore :

- qualification du droit d'auteur sur la structure ;
- qualification du droit sui generis ;
- choix de regime d'acces ;
- options contractuelles ;
- alertes RGPD ;
- perspectives scraping / contentieux.

Le probleme n'est pas l'absence de matiere. Le probleme est l'absence d'un
contrat V2 ferme qui distingue clairement :

- la **qualification des regimes de protection** ;
- la **posture d'acces et de reutilisation** ;
- la **branche contractuelle** ;
- la **branche RGPD** ;
- la **branche enforcement**.

## Goals

1. Recentrer `bases-de-donnees` sur la qualification des regimes de
   protection.
2. Introduire un contrat d'entree V2 ferme.
3. Stabiliser une sortie V2 en blocs relisibles et reutilisables.
4. Garder la branche contractuelle, mais comme couche secondaire.
5. Clarifier les frontieres avec :
   - `qualification-oeuvre`
   - `logiciels-pi`
   - `contrefacon-droit-auteur`
   - `licence-droit-auteur`
   - le plugin donnees personnelles
   - `contentieux-pi`

## Non-Goals

- Le skill ne devient pas un DPA ou un audit RGPD complet.
- Le skill ne devient pas un skill contractuel principal.
- Le skill ne remplace pas `licence-droit-auteur` pour la redaction detaillee
  d'une licence.
- Le skill ne remplace pas `logiciels-pi` pour la chaine de droits logiciel.
- Le skill ne pilote pas seul un contentieux scraping / extraction.

## Recommended Approach

Conserver un seul skill public, mais imposer un vrai contrat V2 :

1. **Role central**
   - qualifier les protections applicables ;
   - et rien de plus au coeur du workflow.

2. **Branche contractuelle secondaire**
   - `proprietary-license`
   - `open-data-release`
   - `api-access-license`
   - `authorized-scraping-license`
   - `hold-for-rgpd-review`

3. **Sortie fermee**
   - structure auteur ;
   - investissement sui generis ;
   - acces et reutilisation ;
   - signal RGPD ;
   - posture contractuelle ;
   - prochaine brique.

## Alternatives Considered

### 1. Qualification stricte + posture contractuelle secondaire

Option recommandee.

Avantages :
- garde le coeur juridique clair ;
- reste utile pour l'exploitation reelle ;
- evite l'overlap direct avec `licence-droit-auteur`.

### 2. Qualification + contrat a parts egales

Avantage :
- plus complet en apparence.

Inconvenient :
- frontiere plus floue ;
- risque de skill "tout-en-un".

### 3. Skill contractuel dominant

Inconvenients :
- overlap direct avec les skills contrats / licence ;
- dilution de la question centrale : qu'est-ce qui est protege et sur quel
  fondement ?

## User-Facing Contract

### Positioning

`bases-de-donnees` V2 est le skill de :

- qualification du droit d'auteur sur la structure ;
- qualification du droit sui generis ;
- qualification du producteur / titulaire / exploitant ;
- cartographie des risques de reutilisation, extraction ou scraping ;
- signalement RGPD ;
- routage vers la bonne posture contractuelle ou contentieuse.

Il ne sert pas a :

- faire un audit RGPD complet ;
- rediger a lui seul la documentation contractuelle finale ;
- remplacer une analyse detaillee de chaine de droits logiciel ;
- remplacer une analyse autonome de contrefaçon auteur ;
- piloter seul le contentieux.

## Input Contract

Le skill doit expliciter en tete de son intake :

- `database_type`: `private`, `public-sector`, `saas`, `api`, `mixed`
- `structure_originality_status`: `strong`, `mixed`, `weak`, `unknown`
- `investment_posture`: `strong`, `mixed`, `weak`, `unknown`
- `data_personal_status`: `yes`, `no`, `mixed`, `unknown`
- `access_model`: `internal`, `b2b-license`, `open-data`, `public-api`,
  `scraping-risk`
- `dispute_posture`: `none`, `licensing`, `scraping`, `misuse`, `unclear`

### Minimal Fact Set

- nature et contenu de la base ;
- structure, taxonomie, architecture de classement ;
- investissement documente ;
- producteur, auteur de la structure, exploitant ;
- mode d'acces actuel ou projete ;
- donnees personnelles presentes ou non ;
- usage tiers constate ou redoute ;
- CGU, licence ou contrat deja en place si existants.

Tout manque reste `[a verifier]`.

## Routing Boundaries

### Route to `qualification-oeuvre`

Si la vraie question dominante est l'originalite d'une structure ou d'un
ensemble creatif, hors logique principale base de donnees.

### Route to `logiciels-pi`

Si la vraie question dominante porte sur :

- logiciel ;
- SaaS ;
- chaine de droits code / repo / dataset ;
- droits d'utilisation du produit logiciel.

### Route to `contrefacon-droit-auteur`

Si la logique dominante devient contradictoire sur la reprise d'une structure
ou d'un contenu protege au titre du droit d'auteur.

### Route to `licence-droit-auteur`

Si la qualification est suffisamment stabilisee et que le besoin devient la
redaction detaillee d'une licence.

### Route to plugin donnees personnelles

Si la vraie question dominante devient :

- base legale ;
- DPA ;
- registre ;
- AIPD ;
- gouvernance RGPD complete.

### Route to `contentieux-pi`

Si le dossier bascule au stade judiciaire ou precontentieux structure sur
scraping, extraction substantielle ou reutilisation illicite.

## Protection Analysis Contract

Le skill doit imposer une analyse separee par axes :

1. **Copyright structure analysis**
   - originalite de la structure, taxonomie, architecture de classement.

2. **Sui generis analysis**
   - investissement substantiel ;
   - constitution / verification / presentation ;
   - distinction entre creation du contenu et collecte du contenu.

3. **Producer and title map**
   - qui est producteur ;
   - qui est auteur ;
   - qui exploite ;
   - qui peut agir.

4. **Access and reuse risk map**
   - acces interne ;
   - B2B ;
   - open data ;
   - API ;
   - scraping ;
   - extraction / reutilisation.

5. **RGPD signal**
   - simple signalement et point d'attention ;
   - pas d'audit complet.

6. **Contract posture**
   - traduction secondaire du regime retenu vers la bonne famille
     contractuelle.

## Readiness Gate

Le skill doit introduire un `Database Protection Readiness Gate` :

- `ready`
- `partial`
- `blocked`

### `ready`

- structure et / ou investissement suffisamment qualifiables ;
- posture d'acces ou de reutilisation suffisamment comprise ;
- signal RGPD suffisamment borne ;
- prochaine etape exploitable.

### `partial`

- analyse exploitable ;
- mais avec hypotheses ou incertitudes `[a verifier]`.

### `blocked`

- structure insuffisamment comprise ;
- investissement non documente ;
- posture d'acces trop floue ;
- base personnelle / non personnelle trop incertaine.

Consequence :

- pas de pseudo-certitude sur la protection ;
- routage vers clarification, documentation d'investissement ou revue RGPD ;
- liste explicite des manques a combler.

## Output Contract

Le skill doit produire 9 blocs stables :

1. `Case Snapshot`
2. `Database Protection Readiness Gate`
3. `Copyright Structure Analysis`
4. `Sui Generis Analysis`
5. `Producer And Title Map`
6. `Access And Reuse Risk Map`
7. `RGPD Signal`
8. `Contract Posture And Decision Routing`
9. `Human Validation`

## Decision Routing Contract

Le bloc final doit utiliser un jeu ferme de sorties :

- `route-to-copyright-structure-review`
- `route-to-investment-documentation`
- `prepare-proprietary-license`
- `prepare-open-data-release`
- `prepare-api-access-license`
- `prepare-scraping-enforcement-brief`
- `hold-for-rgpd-review`
- `hold-insufficient-basis`

## Validation And Guardrails

- Toujours distinguer :
  - faits ;
  - droit ;
  - analyse ;
  - incertitudes ;
  - prochaine etape ;
  - validation humaine.
- Toute source non consultee reste `[a verifier]`.
- Toute affirmation factuelle non documentee reste `[PROVISOIRE]`.
- Le skill doit rappeler que la sortie est un **brouillon** et non un avis
  juridique final ni un contrat final.
