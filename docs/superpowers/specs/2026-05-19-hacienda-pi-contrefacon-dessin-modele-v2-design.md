# Contrefacon Dessin Modele V2 Design

## Summary

`contrefacon-dessin-modele` doit passer d'un memo V1 large a un skill V2
centre sur l'**analyse D&M stricte** :

- validite et opposabilite du titre ;
- distinction enregistre / non enregistre ;
- impression globale ;
- liberte du createur ;
- actes argués de contrefacon ;
- preuve disponible ;
- defenses et exposition nullite.

Le skill reste **bi-mode** :

- `attack`
- `defense`

Une branche `fallback-unfair-competition` peut rester presente, mais comme
**issue secondaire et bornee**, jamais comme axe principal du skill.

## Problem

Le skill actuel est utile, mais il melange encore :

- analyse de validite du titre ;
- analyse de l'impression globale ;
- constitution du dossier de preuves ;
- preparation `mise-en-demeure-pi` ;
- saisie-contrefacon ;
- strategie contentieuse complete ;
- fallback nullite / concurrence deloyale.

Le probleme n'est pas l'absence de matiere. Le probleme est l'absence d'un
contrat V2 ferme qui distingue clairement :

- l'**analyse D&M au fond** ;
- la **preuve** ;
- la **lettre / escalation** ;
- la **mesure probatoire** ;
- la **strategie contentieuse** ;
- le **fallback hors titre**.

## Goals

1. Recentrer `contrefacon-dessin-modele` sur l'analyse au fond D&M.
2. Garder un seul skill public avec deux branches nettes `attack` /
   `defense`.
3. Introduire un contrat d'entree V2 ferme.
4. Stabiliser une sortie V2 en blocs relisibles et reutilisables.
5. Garder un fallback concurrence deloyale / parasitisme uniquement comme
   issue secondaire.
6. Clarifier les frontieres avec :
   - `recherche-anteriorite-dm`
   - `depot-dessin-modele`
   - `mise-en-demeure-pi`
   - `saisie-contrefacon`
   - `contentieux-pi`

## Non-Goals

- Le skill ne depose pas un titre D&M.
- Le skill ne redige pas la lettre finale.
- Le skill ne prepare pas seul la requete de saisie.
- Le skill ne pilote pas seul le contentieux judiciaire complet.
- Le skill ne devient pas un skill generaliste de concurrence deloyale.

## Recommended Approach

Conserver un seul skill public, mais imposer un vrai contrat V2 :

1. **Mode ferme**
   - `attack`
   - `defense`

2. **Role central**
   - validite et opposabilite du titre ;
   - impression globale ;
   - actes argués ;
   - preuve ;
   - defenses.

3. **Fallback secondaire**
   - `fallback-unfair-competition`
   - seulement si le titre est trop fragile ou mal exploitable.

4. **Sortie fermee**
   - baseline titre ;
   - comparaison visuelle ;
   - posture attaque / defense ;
   - preuve ;
   - exposition nullite ;
   - prochaine brique.

## Alternatives Considered

### 1. Analyse D&M stricte + fallback secondaire

Option recommandee.

Avantages :
- garde un coeur D&M clair ;
- reste utile si le titre est fragile ;
- evite l'overlap direct avec les autres skills enforcement.

### 2. Analyse D&M pure sans fallback

Avantage :
- frontiere plus propre.

Inconvenient :
- trop pauvre en pratique si le titre est attaque ou inopposable.

### 3. Skill contentieux global D&M

Inconvenients :
- overlap direct avec `mise-en-demeure-pi`, `saisie-contrefacon`,
  `contentieux-pi` ;
- dilution du role central.

## User-Facing Contract

### Positioning

`contrefacon-dessin-modele` V2 est le skill de :

- verification du titre D&M ;
- analyse de l'impression globale ;
- qualification des actes argués ;
- evaluation de la preuve disponible ;
- anticipation des defenses adverses ;
- routage vers la brique d'escalade adaptee.

Il ne sert pas a :

- deposer un modele ;
- rediger la lettre finale ;
- deposer une requete de saisie ;
- piloter seul le contentieux ;
- remplacer un skill autonome de concurrence deloyale.

## Input Contract

Le skill doit expliciter en tete de son intake :

- `mode`: `attack` / `defense`
- `title_status`: `registered`, `unregistered-eu`, `uncertain`, `blocked`
- `validity_posture`: `strong`, `mixed`, `weak`, `unknown`
- `visual_similarity_posture`: `high`, `medium`, `low`, `unclear`
- `creator_freedom_profile`: `narrow`, `medium`, `wide`, `unclear`
- `proof_posture`: `strong`, `mixed`, `weak`, `none`
- `enforcement_goal`: `internal-assessment`, `cease-and-desist`,
  `seizure-prep`, `litigation-prep`

### Minimal Fact Set

- titre invoque, office, numero, date, statut, renouvellements ;
- design adverse vise ;
- visuels comparables ;
- actes argués (fabrication, offre, vente, import, export, detention, usage) ;
- territoire ;
- preuves disponibles ;
- urgence ;
- antecedents de contact ou de retrait.

Tout manque reste `[a verifier]`.

## Routing Boundaries

### Route to `recherche-anteriorite-dm`

Si la vraie question dominante est l'amont :

- nouveaute ;
- paysage anterieur ;
- baseline art anterieur ;
- prior art avant depot ou avant defense structurée.

### Route to `depot-dessin-modele`

Si le besoin principal devient la preparation ou regularisation d'un depot.

### Route to `mise-en-demeure-pi`

Si l'analyse au fond est suffisamment stabilisee et que le besoin devient la
lettre ou la reponse structuree.

### Route to `saisie-contrefacon`

Si la mesure probatoire judiciaire devient prioritaire.

### Route to `contentieux-pi`

Si le dossier bascule au stade judiciaire ou pre-assignation structuree.

## Design Infringement Analysis Contract

Le skill doit imposer une analyse separee par axes :

1. **Title baseline**
   - validite, opposabilite, renouvellement, chaine de titularite.

2. **Protected scope**
   - ce que couvre raisonnablement le titre ou le DM non enregistre.

3. **Global impression**
   - comparaison sur utilisateur averti ;
   - similitudes dominantes ;
   - differences notables ;
   - effet de la liberte du createur.

4. **Acts map**
   - quels actes sont documentes ;
   - quels actes ne le sont pas encore.

5. **Probative posture**
   - ce qui est fort ;
   - ce qui est faible ;
   - ce qu'il faut securiser.

6. **Defense exposure**
   - nullite ;
   - impression globale differente ;
   - titre inopposable ;
   - prior art destructeur ;
   - liberte du createur trop etroite.

## Readiness Gate

Le skill doit introduire un `Design Infringement Readiness Gate` :

- `ready`
- `partial`
- `blocked`

### `ready`

- titre ou droit non enregistre suffisamment exploitable ;
- comparaison visuelle exploitable ;
- actes documentes ;
- preuve suffisante pour une prochaine etape.

### `partial`

- dossier exploitable ;
- mais avec fragilites ou hypotheses `[a verifier]`.

### `blocked`

- titre trop fragile ;
- comparaison trop pauvre ;
- actes non documentes ;
- preuve trop faible.

Consequence :

- pas de pseudo-conclusion forte ;
- routage vers preuve / anterorite / hold ;
- liste explicite des manques a combler.

## Fallback Secondary Branch

Si `title_status` ou `validity_posture` rendent le titre trop faible, le skill
peut ajouter une branche secondaire :

- `fallback-unfair-competition`

Elle doit rester bornee :

- signaler qu'il s'agit d'un axe secondaire ;
- ne pas remplacer silencieusement l'analyse D&M ;
- ne pas transformer le skill en memo generaliste de concurrence deloyale.

## Output Contract

Le skill doit produire 9 blocs stables :

1. `Case Snapshot`
2. `Design Infringement Readiness Gate`
3. `Title And Protected Scope Baseline`
4. `Global Impression Review`
5. `Acts And Territory Map`
6. `Evidence And Defense Exposure`
7. `Fallback Secondary Branch`
8. `Decision Routing`
9. `Human Validation`

## Decision Routing Contract

Le bloc `Decision Routing` doit utiliser un jeu ferme de sorties :

- `route-to-prior-art-review`
- `route-to-title-regularization`
- `prepare-cease-and-desist`
- `prepare-seizure-brief`
- `prepare-litigation-brief`
- `prepare-fallback-unfair-competition`
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
  juridique final ni un acte de procedure.
