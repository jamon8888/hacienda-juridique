# Contrefacon Droit Auteur V2 Design

## Summary

`contrefacon-droit-auteur` doit passer d'un memo V1 large a un skill V2
centre sur l'**analyse au fond de la contrefacon auteur**, avec :

- qualification de l'originalite mobilisable ;
- verification de la titularite et de la qualite pour agir ;
- qualification des atteintes :
  - reproduction ;
  - representation ;
  - adaptation ;
  - atteinte au droit moral ;
- evaluation des preuves et de la comparabilite ;
- routage ferme vers les briques enforcement voisines.

Une branche `platform-notice` peut rester presente, mais comme **issue
secondaire et bornee**, jamais comme axe principal du skill.

## Problem

Le skill actuel est utile, mais il melange encore plusieurs couches :

- qualification oeuvre / originalite ;
- analyse contradictoire de la reprise ;
- preparation `mise-en-demeure-pi` ;
- saisie-contrefacon ;
- contentieux ;
- notification plateforme / hebergeur.

Le probleme n'est pas l'absence de matiere. Le probleme est l'absence d'un
contrat V2 ferme qui distingue clairement :

- l'**analyse au fond** de la contrefacon auteur ;
- la **preuve** et le bundle probatoire ;
- la **lettre / escalation** ;
- la **mesure probatoire** ;
- la **strategie contentieuse** ;
- la **voie plateforme / LCEN**.

## Goals

1. Recentrer `contrefacon-droit-auteur` sur l'analyse au fond de la
   contrefacon auteur.
2. Introduire un contrat d'entree V2 ferme.
3. Stabiliser une sortie V2 en blocs relisibles et reutilisables.
4. Garder une branche plateforme/LCEN seulement comme issue secondaire.
5. Clarifier les frontieres avec :
   - `qualification-oeuvre`
   - `depot-preuve-creation`
   - `mise-en-demeure-pi`
   - `saisie-contrefacon`
   - `contentieux-pi`
   - `bases-de-donnees`

## Non-Goals

- Le skill ne devient pas un orchestrateur enforcement global.
- Le skill ne remplace pas `qualification-oeuvre` pour les cas ou
  l'originalite est encore entierement incertaine.
- Le skill ne construit pas a lui seul le bundle probatoire complet.
- Le skill ne redige pas la lettre finale de mise en demeure.
- Le skill ne prepare pas seul la requete de saisie.
- Le skill ne pilote pas le contentieux judiciaire complet.
- Le skill ne devient pas une analyse autonome des bases de donnees.

## Recommended Approach

Conserver un seul skill public, mais imposer un vrai contrat V2 :

1. **Role central**
   - analyse contradictoire de la contrefacon auteur ;
   - et rien de plus.

2. **Tracks d'atteinte fermes**
   - `reproduction`
   - `representation`
   - `adaptation`
   - `moral-rights`
   - `mixed`

3. **Branche secondaire**
   - `platform-notice`
   - uniquement comme issue de routage, jamais comme coeur du skill.

4. **Sortie fermee**
   - originalite mobilisable ;
   - titularite ;
   - comparaison ;
   - types d'atteinte ;
   - solidite probatoire ;
   - exposition defenses adverses ;
   - options d'escalade ;
   - validation humaine.

## Alternatives Considered

### 1. Analyse au fond + branche LCEN secondaire

Option recommandee.

Avantages :
- garde le coeur auteur clair ;
- reste operationnel pour les cas web / plateformes ;
- evite l'overlap direct avec les autres skills enforcement.

Inconvenient :
- exige un routage tres explicite pour ne pas redevenir un skill fourre-tout.

### 2. Analyse au fond pure

Avantage :
- frontiere maximale et design tres propre.

Inconvenient :
- moins utile en pratique pour les cas de diffusion en ligne ou marketplace.

### 3. Skill enforcement complet auteur

Inconvenients :
- overlap direct avec `mise-en-demeure-pi`, `saisie-contrefacon` et
  `contentieux-pi` ;
- dilution du role central du skill.

## User-Facing Contract

### Positioning

`contrefacon-droit-auteur` V2 est le skill de :

- qualification contradictoire de la reprise ;
- cartographie des similitudes protegeables ;
- qualification des atteintes patrimoniales et morales ;
- evaluation de la preuve disponible ;
- preparation du routage vers la brique enforcement suivante.

Il ne sert pas a :

- qualifier initialement une oeuvre sans logique contradictoire ;
- deposer une requete de saisie ;
- envoyer la lettre finale ;
- piloter seul le contentieux ;
- trancher definitivement la condamnation probable.

## Input Contract

Le skill doit expliciter en tete de son intake :

- `infringement_track`:
  `reproduction` / `representation` / `adaptation` / `moral-rights` / `mixed`
- `work_type`:
  `text` / `image` / `music` / `audiovisual` / `software` / `database` /
  `character` / `mixed-media` / `other`
- `originality_status`:
  `established` / `plausible` / `uncertain` / `blocked`
- `title_status`:
  `clear` / `partial` / `uncertain` / `blocked`
- `proof_posture`:
  `strong` / `mixed` / `weak` / `none`
- `distribution_context`:
  `offline` / `website` / `platform` / `marketplace` / `social-media` /
  `mixed`
- `enforcement_goal`:
  `internal-assessment` / `cease-and-desist` / `platform-notice` /
  `seizure-prep` / `litigation-prep`

### Minimal Fact Set

- oeuvre originale et elements invoques comme protegeables ;
- auteur, titulaire, cessions eventuelles, qualite pour agir ;
- oeuvre ou contenu adverse vise ;
- nature exacte de la reprise ou diffusion ;
- preuves de creation, de date et d'acces si disponibles ;
- preuves de reprise et de diffusion ;
- contexte economique et moral du prejudice ;
- antecedents de contact ou retrait.

Tout manque reste `[a verifier]`.

## Routing Boundaries

### Route to `qualification-oeuvre`

Si la vraie question dominante est encore :

- l'existence meme de l'originalite ;
- la categorie d'oeuvre ;
- la titularite initiale hors contradiction.

### Route to `depot-preuve-creation`

Si le vrai point bloquant est :

- la date ;
- la paternite ;
- la chronologie ;
- le registre des pieces ;
- le bundle probatoire.

### Route to `mise-en-demeure-pi`

Si l'analyse au fond est suffisamment stabilisee et que le besoin devient la
lettre ou la reponse structuree.

### Route to `saisie-contrefacon`

Si la mesure probatoire judiciaire devient prioritaire avant escalation.

### Route to `contentieux-pi`

Si le dossier est deja au stade judiciaire ou pre-assignation structuree.

### Route to `bases-de-donnees`

Si la question dominante releve du droit sui generis ou de la structure de
base de donnees plus que du seul droit d'auteur.

## Infringement Analysis Contract

Le skill doit imposer une analyse separee par axes :

1. **Originality floor**
   - quels elements peuvent raisonnablement etre invoques comme originaux.

2. **Access and similarity**
   - acces direct ou plausible ;
   - similitudes protegeables ;
   - differences non decisives ;
   - risques d'idee libre / style libre / banalite.

3. **Type of infringement**
   - reproduction ;
   - representation ;
   - adaptation ;
   - atteinte au droit moral.

4. **Probative posture**
   - ce qui est fort ;
   - ce qui est faible ;
   - ce qu'il manque avant escalation.

5. **Defense exposure**
   - contestation de l'originalite ;
   - contestation de titularite ;
   - absence d'acces ;
   - inspiration licite ;
   - exception invoquee ;
   - qualification base de donnees / logiciel a clarifier.

## Platform / LCEN Secondary Branch

Si `distribution_context` inclut `website`, `platform`, `marketplace` ou
`social-media`, le skill peut produire une branche secondaire :

- recevabilite pratique d'une notification ;
- pieces minimales a joindre ;
- limites d'une voie plateforme ;
- articulation avec `mise-en-demeure-pi` ou `contentieux-pi`.

Cette branche ne doit jamais remplacer l'analyse au fond.

## Readiness Gate

Le skill doit introduire un `Copyright Infringement Readiness Gate` :

- `ready`
- `partial`
- `blocked`

### `ready`

- originalite mobilisable ;
- titre / qualite pour agir suffisamment clairs ;
- comparaison exploitable ;
- preuves d'atteinte suffisantes pour une prochaine etape.

### `partial`

- dossier exploitable ;
- mais avec faiblesses ou hypotheses `[a verifier]` qui doivent rester
  visibles.

### `blocked`

- originalite trop incertaine ;
- titularite bloquante ;
- comparaison trop pauvre ;
- preuve de reprise ou de diffusion trop faible.

Consequence :

- pas de pseudo-conclusion forte ;
- routage vers preuve / qualification / hold ;
- liste explicite des manques a combler.

## Output Contract

Le skill doit produire 9 blocs stables :

1. `Case Snapshot`
2. `Copyright Infringement Readiness Gate`
3. `Originality And Title Baseline`
4. `Comparative Similarity Review`
5. `Infringement Track Analysis`
6. `Evidence And Defense Exposure`
7. `Platform Notice Posture`
8. `Decision Routing`
9. `Human Validation`

## Decision Routing Contract

Le bloc `Decision Routing` doit utiliser un jeu ferme de sorties :

- `route-to-proof-hardening`
- `route-to-originality-review`
- `prepare-cease-and-desist`
- `prepare-platform-notice`
- `prepare-seizure-brief`
- `prepare-litigation-brief`
- `route-to-database-analysis`
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
  juridique final.
- Le skill ne promet ni condamnation, ni retrait, ni succes d'une
  notification plateforme.
