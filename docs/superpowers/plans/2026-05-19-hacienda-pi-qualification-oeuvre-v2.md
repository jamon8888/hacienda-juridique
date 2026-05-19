# Plan - qualification-oeuvre V2

## Architecture

Conserver `plugins/hacienda-propriete-intellectuelle/skills/qualification-oeuvre/SKILL.md`
 comme unique entree publique, mais le redecouper autour :

- d'un positionnement V2 plus strict ;
- d'un intake avec dimensions explicites ;
- de frontieres de routage centralisees ;
- d'un contrat de sortie en 9 blocs ;
- d'un bloc `Next Step Routing` borne a des issues fermees.

## Files

- Modify:
  - `plugins/hacienda-propriete-intellectuelle/skills/qualification-oeuvre/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/README.md`
  - `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
- Create:
  - `plugins/hacienda-propriete-intellectuelle/skills/qualification-oeuvre/references/qualification-oeuvre-routing-and-output.md`
  - `docs/superpowers/specs/2026-05-19-hacienda-pi-qualification-oeuvre-v2-design.md`

## Tasks

### Task 1 - Reposition the skill

- tighten the role to copyright qualification only
- keep explicit non-goals for assignment, licence, infringement, and chain of
  title software/data

### Task 2 - Normalize intake

- introduce `objective_mode`, `work_type`, `creation_context`
- keep the factual questions, but align them to those dimensions

### Task 3 - Centralize routing boundaries

- gather routing to `revue-logiciel-donnees`, `depot-preuve-creation`,
  `cession-droit-auteur`, `licence-droit-auteur`,
  `contrefacon-droit-auteur`

### Task 4 - Normalize the output

- replace the current long-form output skeleton with 9 stable blocks
- add `Next Step Routing` with allowed outcome values

### Task 5 - Add a short reference file

- create a non-normative aide-memo for routing and output blocks
- link it from the skill and say `SKILL.md` prevails

### Task 6 - Realign docs

- update plugin README
- add changelog bullets for the structural migration

### Task 7 - Verify

Run:

```text
npm test
npm run typecheck
npm run build
npm run branding:check
git diff --check
```

Plus targeted grep checks for:

- `objective_mode`
- `work_type`
- `creation_context`
- `Qualification Snapshot`
- `Next Step Routing`
- `hold-and-document`
- `prepare-copyright-attack`

