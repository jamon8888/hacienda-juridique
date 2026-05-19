# Contrefacon Droit Auteur V2 - Routing And Output

## Role

`contrefacon-droit-auteur` est un skill V2 d'analyse au fond stricte de la
contrefacon auteur :

- originalite mobilisable ;
- titularite et qualite pour agir ;
- comparaison des oeuvres ;
- qualification des atteintes ;
- evaluation des preuves ;
- exposition aux defenses ;
- routage vers la brique enforcement suivante.

La branche `platform-notice` reste secondaire.

## Closed Intake

- `infringement_track`: `reproduction` / `representation` / `adaptation` /
  `moral-rights` / `mixed`
- `work_type`: `text` / `image` / `music` / `audiovisual` / `software` /
  `database` / `character` / `mixed-media` / `other`
- `originality_status`: `established` / `plausible` / `uncertain` /
  `blocked`
- `title_status`: `clear` / `partial` / `uncertain` / `blocked`
- `proof_posture`: `strong` / `mixed` / `weak` / `none`
- `distribution_context`: `offline` / `website` / `platform` /
  `marketplace` / `social-media` / `mixed`
- `enforcement_goal`: `internal-assessment` / `cease-and-desist` /
  `platform-notice` / `seizure-prep` / `litigation-prep`

## Minimal Fact Set

- oeuvre originale et elements invoques comme protegeables ;
- auteur, titulaire, cessions eventuelles, qualite pour agir ;
- oeuvre ou contenu adverse vise ;
- nature exacte de la reprise ou diffusion ;
- preuves de creation, de date et d'acces ;
- preuves de reprise et de diffusion ;
- contexte economique et moral ;
- antecedents de contact, de retrait ou de signalement.

## Copyright Infringement Readiness Gate

### `ready`

- originalite mobilisable ;
- titre exploitable ;
- comparaison exploitable ;
- preuve suffisante pour une prochaine etape.

### `partial`

- dossier exploitable ;
- mais avec hypotheses ou faiblesses `[a verifier]`.

### `blocked`

- originalite trop incertaine ;
- titularite bloquante ;
- comparaison trop pauvre ;
- preuve trop faible.

Consequence :

- ne pas simuler de lettre forte, de saisie ou de contentieux comme si le
  dossier etait pret ;
- sortir en `hold-insufficient-basis` ou vers la brique de clarification
  appropriee ;
- lister les manques a combler.

## Output Contract

1. `Case Snapshot`
2. `Copyright Infringement Readiness Gate`
3. `Originality And Title Baseline`
4. `Comparative Similarity Review`
5. `Infringement Track Analysis`
6. `Evidence And Defense Exposure`
7. `Platform Notice Posture`
8. `Decision Routing`
9. `Human Validation`

## Closed Routing

- `route-to-proof-hardening` : bascule vers `depot-preuve-creation`
- `route-to-originality-review` : bascule vers `qualification-oeuvre`
- `prepare-cease-and-desist` : bascule vers `mise-en-demeure-pi`
- `prepare-platform-notice` : bascule vers `mise-en-demeure-pi`, avec
  adaptation humaine finale au canal plateforme / hebergeur
- `prepare-seizure-brief` : bascule vers `saisie-contrefacon`
- `prepare-litigation-brief` : bascule vers `contentieux-pi`
- `route-to-database-analysis` : bascule vers `bases-de-donnees`
- `hold-insufficient-basis` : blocage explicite, sans pseudo-escalade

## Boundaries

- `qualification-oeuvre` : originalite et categorie d'oeuvre avant logique
  contradictoire
- `depot-preuve-creation` : chronologie, pieces, bundle probatoire
- `mise-en-demeure-pi` : lettre ou reponse structuree
- `saisie-contrefacon` : mesure probatoire judiciaire
- `contentieux-pi` : strategie judiciaire globale
- `bases-de-donnees` : regime sui generis ou structure de base de donnees
