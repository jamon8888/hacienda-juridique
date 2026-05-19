# Plan - contrefacon-dessin-modele V2

## Objective

Migrer `contrefacon-dessin-modele` vers un skill V2 centre sur
l'**analyse D&M stricte**, avec :

- titre et opposabilite ;
- impression globale ;
- actes argués ;
- preuve ;
- defenses et exposition nullite ;
- fallback concurrence deloyale / parasitisme uniquement secondaire.

## Scope

### In scope

- `plugins/hacienda-propriete-intellectuelle/skills/contrefacon-dessin-modele/SKILL.md`
- un nouveau memo de reference dedie au routage et au contrat de sortie
- mise a jour de :
  - `plugins/hacienda-propriete-intellectuelle/README.md`
  - `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
- ajout de la spec et de ce plan au repo

### Out of scope

- modification de `recherche-anteriorite-dm`
- modification de `depot-dessin-modele`
- modification de `mise-en-demeure-pi`
- modification de `saisie-contrefacon`
- modification de `contentieux-pi`

Sauf micro-ajustement documentaire si un renvoi est manifestement faux.

## Target Contract

Le skill V2 doit :

- distinguer clairement `attack` et `defense` ;
- garder l'analyse D&M comme role principal ;
- separer validite du titre, impression globale, actes, preuve et defenses ;
- produire 9 blocs de sortie stables ;
- finir sur un `Decision Routing` ferme ;
- rappeler que la sortie est un brouillon soumis a validation humaine.

## Files To Create Or Update

### Update

- `plugins/hacienda-propriete-intellectuelle/skills/contrefacon-dessin-modele/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/README.md`
- `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

### Create

- `plugins/hacienda-propriete-intellectuelle/skills/contrefacon-dessin-modele/references/contrefacon-dessin-modele-routing-and-output.md`
- `docs/superpowers/specs/2026-05-19-hacienda-pi-contrefacon-dessin-modele-v2-design.md`
- `docs/superpowers/plans/2026-05-19-hacienda-pi-contrefacon-dessin-modele-v2.md`

## Implementation Steps

### 1. Restructure the skill header and positioning

Update the top of `SKILL.md` to make the role explicit:

- V2 analysis skill ;
- bi-mode `attack` / `defense` ;
- D&M strict core ;
- fallback unfair competition as secondary only ;
- non-goals around letter, seizure, and global litigation.

### 2. Introduce the V2 intake contract

Replace loose intake framing with an explicit contract:

- `mode`
- `title_status`
- `validity_posture`
- `visual_similarity_posture`
- `creator_freedom_profile`
- `proof_posture`
- `enforcement_goal`

Add a clearly labeled minimal fact set.

### 3. Add routing boundaries up front

Insert a boundary section clarifying:

- when to route to `recherche-anteriorite-dm`
- when to route to `depot-dessin-modele`
- when to route to `mise-en-demeure-pi`
- when to route to `saisie-contrefacon`
- when to route to `contentieux-pi`

This needs to come before the detailed substantive analysis.

### 4. Reframe the substantive analysis around stable axes

Reorganize the skill body into V2 axes:

1. title baseline
2. protected scope
3. global impression
4. acts map
5. probative posture
6. defense exposure
7. fallback secondary branch

Keep useful doctrine, but move it under these axes instead of keeping a long
linear memo.

### 5. Introduce the readiness gate

Add `Design Infringement Readiness Gate` with:

- `ready`
- `partial`
- `blocked`

Define each status concretely and make `blocked` suppress pseudo-strong
conclusions.

### 6. Stabilize the output contract

End the skill with 9 fixed sections:

1. `Case Snapshot`
2. `Design Infringement Readiness Gate`
3. `Title And Protected Scope Baseline`
4. `Global Impression Review`
5. `Acts And Territory Map`
6. `Evidence And Defense Exposure`
7. `Fallback Secondary Branch`
8. `Decision Routing`
9. `Human Validation`

### 7. Close the routing set

`Decision Routing` must use only:

- `route-to-prior-art-review`
- `route-to-title-regularization`
- `prepare-cease-and-desist`
- `prepare-seizure-brief`
- `prepare-litigation-brief`
- `prepare-fallback-unfair-competition`
- `hold-insufficient-basis`

Each route should name the downstream skill or owner clearly.

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

Update `README.md` to describe `contrefacon-dessin-modele` as:

- a V2 D&M analysis skill ;
- centered on title validity, global impression and defense exposure ;
- connected to prior art, filing, letter, seizure and litigation.

Update `CHANGELOG.md` with a new top entry documenting:

- V2 migration
- readiness gate
- stabilized output
- closed routing
- secondary fallback branch
- clarified boundaries

## Review Checklist

Before verification, confirm:

- `attack` and `defense` are distinct early in the skill
- the fallback branch does not overtake the main D&M analysis
- no part implies the skill sends a letter itself
- no part implies it files a seizure request or judicial act itself
- no route label drifts from the spec
- title fragility and nullity risk remain visible
- `Human Validation` keeps the brouillon / non-final-act reminder

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

- `codex/contrefacon-dessin-modele-v2`

Recommended commit:

- `feat: restructure design infringement analysis skill`

After merge to `main`:

```bash
npx gitnexus analyze
```

Then restore any hook-regenerated `dist/` noise if needed and verify the repo
is clean.
