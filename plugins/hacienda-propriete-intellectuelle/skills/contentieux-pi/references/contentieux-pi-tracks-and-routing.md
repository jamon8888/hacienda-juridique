# Contentieux PI - tracks and routing

Reference de travail non normative. Elle sert d'aide-memo rapide pour le
routage et les sorties. En cas d'ecart, seul
`plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md`
fait foi.

## 1. When to stay in contentieux-pi

- assignation deja recue ou preparee
- refere envisage ou deja lance
- procedure au fond deja decidee ou quasi decidee
- recours dans la fenetre procedurale ou appel en cours
- pilotage procedurale, budgetaire et calendrier d'affaire

## 2. When to route away

- `tri-contrefacon` : signal faible, qualification initiale, priorisation
  enforcement
- `mise-en-demeure-pi` : lettre, reponse amiable, escalation formelle hors
  saisine
- `depot-preuve-creation` : preuve de creation, anteriorite, titularite,
  timeline ou bundle avant choix contentieux fiable
- `strategie-defense-pi` : allegation ou menace encore incomplete, avec
  plusieurs branches defensives encore ouvertes

## 3. Core output blocks

- `Case Snapshot`
- `Forum and Admissibility`
- `Claims and Defenses Map`
- `Evidence and Proof Gaps`
- `Procedural Strategy`
- `Budget Timing and Exposure`
- `Decision Memo`
- `Human Validation`

## 4. Decision Memo values

- `Attack` : `go`, `go conditionnel`, `settle first`, `no-go`
- `Defense` : `contest and defend`, `defend and negotiate`,
  `challenge title`, `contain and settle`,
  `no-substantive-response-at-this-stage`
- `Appeal` : `appeal`, `appeal if conditions met`, `no appeal`,
  `negotiate instead`

## 5. Confidence floor

- Si `mode`, `contentious_track` ou `procedure_stage` manque, limiter la sortie
  a un cadrage prudent.
- Si `forum`, `procedure_stage` ou `evidence_status` est flou, contradictoire
  ou incomplet, indiquer une confiance reduite.
