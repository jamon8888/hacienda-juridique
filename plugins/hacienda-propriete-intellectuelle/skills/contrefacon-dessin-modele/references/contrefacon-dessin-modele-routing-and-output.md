# Contrefacon Dessin Modele V2 - Routing And Output

## Role

`contrefacon-dessin-modele` est un skill V2 d'analyse D&M stricte :

- titre et opposabilite ;
- impression globale ;
- actes argués ;
- preuve ;
- defenses et exposition nullite ;
- routage vers la brique d'escalade suivante.

Le fallback concurrence deloyale / parasitisme reste secondaire.

## Closed Intake

- `mode`: `attack` / `defense`
- `title_status`: `registered` / `unregistered-eu` / `uncertain` /
  `blocked`
- `validity_posture`: `strong` / `mixed` / `weak` / `unknown`
- `visual_similarity_posture`: `high` / `medium` / `low` / `unclear`
- `creator_freedom_profile`: `narrow` / `medium` / `wide` / `unclear`
- `proof_posture`: `strong` / `mixed` / `weak` / `none`
- `enforcement_goal`: `internal-assessment` / `cease-and-desist` /
  `seizure-prep` / `litigation-prep`

## Minimal Fact Set

- titre invoque, office, numero, date, statut, renouvellements ;
- design adverse vise ;
- visuels comparables ;
- actes argués ;
- territoire ;
- preuves disponibles ;
- urgence ;
- antecedents de contact ou de retrait.

## Design Infringement Readiness Gate

### `ready`

- titre ou droit non enregistre exploitable ;
- comparaison visuelle exploitable ;
- actes documentes ;
- preuve suffisante pour une prochaine etape.

### `partial`

- dossier exploitable ;
- mais avec hypotheses ou fragilites `[a verifier]`.

### `blocked`

- titre trop fragile ;
- comparaison trop pauvre ;
- actes non documentes ;
- preuve trop faible.

Consequence :

- ne pas simuler de lettre forte, de saisie ou de contentieux comme si le
  dossier etait pret ;
- sortir en `hold-insufficient-basis` ou vers la brique de clarification ;
- lister les manques a combler.

## Output Contract

1. `Case Snapshot`
2. `Design Infringement Readiness Gate`
3. `Title And Protected Scope Baseline`
4. `Global Impression Review`
5. `Acts And Territory Map`
6. `Evidence And Defense Exposure`
7. `Fallback Secondary Branch`
8. `Decision Routing`
9. `Human Validation`

## Closed Routing

- `route-to-prior-art-review` : bascule vers `recherche-anteriorite-dm`
- `route-to-title-regularization` : bascule vers `depot-dessin-modele`
- `prepare-cease-and-desist` : bascule vers `mise-en-demeure-pi`
- `prepare-seizure-brief` : bascule vers `saisie-contrefacon`
- `prepare-litigation-brief` : bascule vers `contentieux-pi`
- `prepare-fallback-unfair-competition` : bascule vers `contentieux-pi`,
  avec axe secondaire concurrence deloyale / parasitisme a valider
  humainement hors coeur D&M
- `hold-insufficient-basis` : blocage explicite, sans pseudo-escalade

## Boundaries

- `recherche-anteriorite-dm` : baseline art anterieur et nouveaute
- `depot-dessin-modele` : depot, regularisation ou extension du titre
- `mise-en-demeure-pi` : lettre ou reponse structuree
- `saisie-contrefacon` : mesure probatoire judiciaire
- `contentieux-pi` : strategie judiciaire globale
