# Plan - bases-de-donnees V2

## Objective

Migrer `bases-de-donnees` vers un skill V2 centre sur la **qualification
stricte des regimes de protection** d'une base de donnees :

- droit d'auteur sur la structure ;
- droit sui generis ;
- producteur / titulaire / exploitant ;
- acces, extraction et reutilisation ;
- signal RGPD ;
- posture contractuelle comme couche secondaire.

## Scope

### In scope

- `plugins/hacienda-propriete-intellectuelle/skills/bases-de-donnees/SKILL.md`
- un nouveau memo de reference dedie au routage et au contrat de sortie
- mise a jour de :
  - `plugins/hacienda-propriete-intellectuelle/README.md`
  - `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
- ajout de la spec et de ce plan au repo

### Out of scope

- modification de `qualification-oeuvre`
- modification de `logiciels-pi`
- modification de `contrefacon-droit-auteur`
- modification de `licence-droit-auteur`
- modification du plugin donnees personnelles
- modification de `contentieux-pi`

Sauf micro-ajustement documentaire si un renvoi est manifestement faux.

## Target Contract

Le skill V2 doit :

- garder la qualification des protections comme coeur du workflow ;
- distinguer proprement structure auteur, investissement sui generis,
  producteur / titulaire, acces / reutilisation et signal RGPD ;
- produire 9 blocs de sortie stables ;
- finir sur un `Decision Routing` ferme ;
- rappeler que la sortie est un brouillon soumis a validation humaine.

## Files To Create Or Update

### Update

- `plugins/hacienda-propriete-intellectuelle/skills/bases-de-donnees/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/README.md`
- `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

### Create

- `plugins/hacienda-propriete-intellectuelle/skills/bases-de-donnees/references/bases-de-donnees-routing-and-output.md`
- `docs/superpowers/specs/2026-05-19-hacienda-pi-bases-de-donnees-v2-design.md`
- `docs/superpowers/plans/2026-05-19-hacienda-pi-bases-de-donnees-v2.md`

## Implementation Steps

### 1. Restructure the skill header and positioning

Update the top of `SKILL.md` to make the role explicit:

- V2 analysis skill ;
- strict protection-regime qualification ;
- contract posture secondary ;
- RGPD only as signal, not full compliance review ;
- non-goals around contract drafting and full privacy work.

### 2. Introduce the V2 intake contract

Replace loose intake framing with an explicit contract:

- `database_type`
- `structure_originality_status`
- `investment_posture`
- `data_personal_status`
- `access_model`
- `dispute_posture`

Add a clearly labeled minimal fact set.

### 3. Add routing boundaries up front

Insert a boundary section clarifying:

- when to route to `qualification-oeuvre`
- when to route to `logiciels-pi`
- when to route to `contrefacon-droit-auteur`
- when to route to `licence-droit-auteur`
- when to route to the data-protection plugin
- when to route to `contentieux-pi`

This needs to appear before the substantive legal analysis.

### 4. Reframe the substantive analysis around stable axes

Reorganize the skill body into V2 axes:

1. copyright structure analysis
2. sui generis analysis
3. producer and title map
4. access and reuse risk map
5. RGPD signal
6. contract posture

Keep useful doctrine, but move it under these axes instead of keeping a long
linear memo.

### 5. Introduce the readiness gate

Add `Database Protection Readiness Gate` with:

- `ready`
- `partial`
- `blocked`

Define each status concretely and make `blocked` suppress pseudo-certainty.

### 6. Stabilize the output contract

End the skill with 9 fixed sections:

1. `Case Snapshot`
2. `Database Protection Readiness Gate`
3. `Copyright Structure Analysis`
4. `Sui Generis Analysis`
5. `Producer And Title Map`
6. `Access And Reuse Risk Map`
7. `RGPD Signal`
8. `Contract Posture And Decision Routing`
9. `Human Validation`

### 7. Close the routing set

`Decision Routing` must use only:

- `route-to-copyright-structure-review`
- `route-to-investment-documentation`
- `prepare-proprietary-license`
- `prepare-open-data-release`
- `prepare-api-access-license`
- `prepare-scraping-enforcement-brief`
- `hold-for-rgpd-review`
- `hold-insufficient-basis`

Each route should identify the downstream skill, owner, or review lane clearly.

### 8. Add the routing/output memo

Create a compact reference file summarizing:

- role
- intake contract
- minimal fact set
- readiness gate
- output contract
- closed routing
- boundaries

It should mirror the final skill exactly.

### 9. Update plugin documentation

Update `README.md` to describe `bases-de-donnees` as:

- a V2 strict database-protection qualification skill ;
- centered on author structure, sui generis protection, producer/title map,
  access/reuse risk and RGPD signal ;
- connected to contract, privacy and enforcement follow-up lanes.

Update `CHANGELOG.md` with a new top entry documenting:

- V2 migration
- readiness gate
- stabilized output
- closed routing
- secondary contract posture
- clarified boundaries

## Review Checklist

Before verification, confirm:

- contract posture stays secondary
- RGPD stays a signal, not a full compliance memo
- no route label drifts from the spec
- `hold-for-rgpd-review` is explicit when privacy dominates
- investment documentation gaps stay visible
- `Human Validation` keeps the brouillon / non-final-advice reminder

## Verification

Run:

```bash
npm test
npm run typecheck
npm run build
npm run branding:check
git diff --check
```

If the known MCP stdio flaky tests fail:

1. rerun `npm run build`
2. rerun the failing focused tests
3. rerun full `npm test`

## Git Integration

Recommended branch:

- `codex/bases-de-donnees-v2`

Recommended commit:

- `feat: restructure database protection analysis skill`

After merge to `main`:

```bash
npx gitnexus analyze
```

Then restore any hook-regenerated `dist/` noise if needed and verify the repo
is clean.
