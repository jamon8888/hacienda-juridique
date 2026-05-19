# Plan - logiciels-pi V2

## Architecture

Conserver `plugins/hacienda-propriete-intellectuelle/skills/logiciels-pi/SKILL.md`
 comme unique entree publique, mais le restructurer autour :

- d'un contrat d'entree V2 ;
- de frontieres de routage centralisees ;
- d'un contrat de sortie stable ;
- d'un bloc `Next Step Routing` a issues fermees.

## Files

- Modify:
  - `plugins/hacienda-propriete-intellectuelle/skills/logiciels-pi/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/README.md`
  - `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
- Create:
  - `plugins/hacienda-propriete-intellectuelle/skills/logiciels-pi/references/logiciels-pi-routing-and-output.md`
  - `docs/superpowers/specs/2026-05-19-hacienda-pi-logiciels-v2-design.md`

## Tasks

### Task 1 - Reposition the skill

- keep software regime analysis
- remove any ambiguity with drafting, OSS audit, or chain-of-title review

### Task 2 - Normalize intake

- add `development_model`, `distribution_model`, `oss_posture`
- keep the factual questions under those dimensions

### Task 3 - Centralize routing

- gather routing to `revue-open-source`, `revue-logiciel-donnees`,
  `cession-droit-auteur`, `licence-droit-auteur`,
  `contrefacon-droit-auteur`

### Task 4 - Normalize output

- replace the current long output skeleton with 9 stable blocks
- add `Next Step Routing` with allowed outcome values

### Task 5 - Add a short reference file

- non-normative routing/output memo linked from the skill

### Task 6 - Realign docs

- update plugin README and changelog

### Task 7 - Verify

Run:

```text
npm test
npm run typecheck
npm run build
npm run branding:check
git diff --check
```

And grep for:

- `development_model`
- `distribution_model`
- `oss_posture`
- `Software Regime Snapshot`
- `Next Step Routing`
- `review-oss-operationally`
- `prepare-software-enforcement`

