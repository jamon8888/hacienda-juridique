# Plan - contrefacon-droit-auteur V2

## Objective

Migrer `contrefacon-droit-auteur` vers un skill V2 centre sur
l'**analyse au fond stricte** de la contrefacon auteur, avec une branche
`platform-notice` secondaire et bornee, sans le laisser redevenir un skill
enforcement global.

## Scope

### In scope

- `plugins/hacienda-propriete-intellectuelle/skills/contrefacon-droit-auteur/SKILL.md`
- un nouveau memo de reference dedie au routage et au contrat de sortie
- mise a jour de :
  - `plugins/hacienda-propriete-intellectuelle/README.md`
  - `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
- ajout de la spec et de ce plan au repo

### Out of scope

- modification de `qualification-oeuvre`
- modification de `depot-preuve-creation`
- modification de `mise-en-demeure-pi`
- modification de `saisie-contrefacon`
- modification de `contentieux-pi`
- modification de `bases-de-donnees`

Sauf micro-ajustement documentaire si un renvoi est manifestement faux.

## Target Contract

Le skill V2 doit :

- prendre un intake ferme ;
- distinguer proprement :
  - originalite mobilisable ;
  - titularite / qualite pour agir ;
  - comparaison des oeuvres ;
  - type d'atteinte ;
  - solidite probatoire ;
  - exposition aux defenses ;
  - voie plateforme eventuelle ;
- produire 9 blocs de sortie stables ;
- finir sur un `Decision Routing` ferme ;
- rappeler que la sortie est un brouillon soumis a validation humaine.

## Files To Create Or Update

### Update

- `plugins/hacienda-propriete-intellectuelle/skills/contrefacon-droit-auteur/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/README.md`
- `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

### Create

- `plugins/hacienda-propriete-intellectuelle/skills/contrefacon-droit-auteur/references/contrefacon-droit-auteur-routing-and-output.md`
- `docs/superpowers/specs/2026-05-19-hacienda-pi-contrefacon-droit-auteur-v2-design.md`
- `docs/superpowers/plans/2026-05-19-hacienda-pi-contrefacon-droit-auteur-v2.md`

## Implementation Steps

### 1. Restructure the skill header and positioning

Update the top of `SKILL.md` to make the role explicit:

- V2 analysis skill
- analysis au fond stricte
- branche plateforme secondaire
- non-goals enforcement/global litigation

Preserve existing legal caution language, but align it to the V2 role.

### 2. Introduce the V2 intake contract

Replace loose intake framing with an explicit contract:

- `infringement_track`
- `work_type`
- `originality_status`
- `title_status`
- `proof_posture`
- `distribution_context`
- `enforcement_goal`

Add a clearly labeled minimal fact set.

### 3. Add routing boundaries up front

Insert a boundary section early in the skill clarifying:

- when to route to `qualification-oeuvre`
- when to route to `depot-preuve-creation`
- when to route to `mise-en-demeure-pi`
- when to route to `saisie-contrefacon`
- when to route to `contentieux-pi`
- when to route to `bases-de-donnees`

This is important to stop overlap before the substantive analysis begins.

### 4. Reframe the substantive analysis around stable axes

Reorganize the body of the skill into V2 analysis axes:

1. originality floor
2. title and standing
3. access and comparative similarity
4. infringement track analysis
5. evidence posture
6. defense exposure
7. platform / LCEN posture

Keep the doctrine already present when it is still useful, but move it under
these axes rather than leaving a long linear memo.

### 5. Introduce the readiness gate

Add `Copyright Infringement Readiness Gate` with:

- `ready`
- `partial`
- `blocked`

Define each status with concrete criteria and require `blocked` outputs to
avoid pseudo-strong conclusions.

### 6. Stabilize the output contract

End the skill with 9 fixed sections:

1. `Case Snapshot`
2. `Copyright Infringement Readiness Gate`
3. `Originality And Title Baseline`
4. `Comparative Similarity Review`
5. `Infringement Track Analysis`
6. `Evidence And Defense Exposure`
7. `Platform Notice Posture`
8. `Decision Routing`
9. `Human Validation`

### 7. Close the routing set

`Decision Routing` must use only:

- `route-to-proof-hardening`
- `route-to-originality-review`
- `prepare-cease-and-desist`
- `prepare-platform-notice`
- `prepare-seizure-brief`
- `prepare-litigation-brief`
- `route-to-database-analysis`
- `hold-insufficient-basis`

Each route should state the downstream skill or action owner clearly.

### 8. Add the routing/output memo

Create a compact reference file summarizing:

- role
- intake contract
- minimal fact set
- readiness gate
- output contract
- closed routing
- boundaries

It should match the final skill exactly.

### 9. Update plugin documentation

Update `README.md` to describe `contrefacon-droit-auteur` as:

- a V2 analysis skill;
- centered on author-rights infringement analysis;
- connected to proof, letter, seizure, litigation, and database review.

Update `CHANGELOG.md` with a new top entry documenting:

- V2 migration
- new gate
- stabilized output
- closed routing
- clarified boundaries

## Review Checklist

Before verification, confirm:

- no part of the skill implies it sends a platform notice itself
- no part implies it files a seizure request or judicial act itself
- no route label drifts from the spec
- `platform-notice` stays secondary
- originality / title / evidence weaknesses stay visible
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

- `codex/contrefacon-droit-auteur-v2`

Recommended commit:

- `feat: restructure copyright infringement analysis skill`

After merge to `main`:

```bash
npx gitnexus analyze
```

Then restore any hook-regenerated `dist/` noise if needed and verify the repo
is clean.
