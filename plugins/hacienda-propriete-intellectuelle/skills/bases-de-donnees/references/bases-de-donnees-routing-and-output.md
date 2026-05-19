# Bases De Donnees V2 - Routing And Output

## Role

`bases-de-donnees` est un skill V2 de qualification stricte des regimes de
protection d'une base de donnees :

- structure auteur ;
- droit sui generis ;
- producteur / titulaire / exploitant ;
- acces, extraction et reutilisation ;
- signal RGPD ;
- routage vers la bonne brique suivante.

La posture contractuelle reste secondaire.

## Closed Intake

- `database_type`: `private` / `public-sector` / `saas` / `api` / `mixed`
- `structure_originality_status`: `strong` / `mixed` / `weak` / `unknown`
- `investment_posture`: `strong` / `mixed` / `weak` / `unknown`
- `data_personal_status`: `yes` / `no` / `mixed` / `unknown`
- `access_model`: `internal` / `b2b-license` / `open-data` / `public-api` /
  `scraping-risk`
- `dispute_posture`: `none` / `licensing` / `scraping` / `misuse` /
  `unclear`

## Minimal Fact Set

- nature et contenu de la base ;
- structure, taxonomie, architecture de classement ;
- investissement documente ;
- producteur, auteur de la structure, exploitant ;
- mode d'acces actuel ou projete ;
- donnees personnelles presentes ou non ;
- usage tiers constate ou redoute ;
- CGU, licence ou contrat deja en place si existants.

## Database Protection Readiness Gate

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

- ne pas simuler de protection certaine ;
- ne pas pousser une posture contractuelle ferme comme si les fondements
  etaient stabilises ;
- lister explicitement les manques a combler.

## Output Contract

1. `Case Snapshot`
2. `Database Protection Readiness Gate`
3. `Copyright Structure Analysis`
4. `Sui Generis Analysis`
5. `Producer And Title Map`
6. `Access And Reuse Risk Map`
7. `RGPD Signal`
8. `Contract Posture And Decision Routing`
9. `Human Validation`

## Closed Routing

- `route-to-copyright-structure-review` : bascule vers
  `qualification-oeuvre`
- `route-to-investment-documentation` : owner interne finance / ops / data
  pour documenter l'investissement et clarifier producteur / exploitant, puis
  relance de `bases-de-donnees`
- `prepare-proprietary-license` : bascule vers `licence-droit-auteur`
- `prepare-open-data-release` : owner juridique open data avec validation
  humaine, et bascule vers le plugin donnees personnelles si la branche RGPD
  devient dominante
- `prepare-api-access-license` : bascule vers `licence-droit-auteur`
- `prepare-scraping-enforcement-brief` : bascule vers `contentieux-pi`
- `hold-for-rgpd-review` : bascule vers le plugin donnees personnelles
- `hold-insufficient-basis` : blocage explicite, sans pseudo-certitude

## Boundaries

- `qualification-oeuvre` : originalite dominante hors logique base de donnees
- `logiciels-pi` : chaine de droits logiciel / SaaS / dataset comme produit
- `contrefacon-droit-auteur` : reprise contradictoire auteur
- `licence-droit-auteur` : redaction detaillee de licence
- plugin donnees personnelles : conformite RGPD complete
- `contentieux-pi` : contentieux scraping / extraction / reutilisation
