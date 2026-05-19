# Saisie Contrefacon V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition `saisie-contrefacon` as a V2 multi-rights skill for strict preparation of seizure measures, with a closed intake contract, a `Seizure Readiness Gate`, a stable output contract, and clear boundaries with enforcement and litigation skills.

**Architecture:** Keep one public skill entrypoint and refactor its contract around a procedural role only: prepare the request, scope the seizure, structure execution instructions, frame trade-secret handling, and route the immediate post-seizure next steps. Preserve multi-right coverage through an explicit `rights_track` branch rather than separate skills.

**Tech Stack:** Markdown skill files, Hacienda PI skill conventions, npm test/typecheck/build/branding verification, Git worktree workflow

---

## File Map

- Modify: `plugins/hacienda-propriete-intellectuelle/skills/saisie-contrefacon/SKILL.md`
  - Main V2 contract, `rights_track`, gate, output contract, boundaries, execution pack.
- Create: `plugins/hacienda-propriete-intellectuelle/skills/saisie-contrefacon/references/saisie-contrefacon-routing-and-output.md`
  - Compact routing / output memo aligned with V2 contract.
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
  - Reposition the skill as seizure-measure preparation, not general litigation handling.
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
  - Record the V2 migration and contract change.
- Keep: `docs/superpowers/specs/2026-05-19-hacienda-pi-saisie-contrefacon-v2-design.md`
  - Approved design reference carried with the change set.

## Task 1: Create Isolated Worktree And Baseline

**Files:**
- Create worktree: `.worktrees/saisie-contrefacon-v2`

- [ ] **Step 1: Create the worktree from `main`**

Run:

```powershell
git worktree add .worktrees/saisie-contrefacon-v2 -b codex/saisie-contrefacon-v2 main
```

Expected: new worktree created on branch `codex/saisie-contrefacon-v2`.

- [ ] **Step 2: Install dependencies if needed**

Run:

```powershell
npm install
```

Expected: local dependencies are available in the worktree.

- [ ] **Step 3: Build once to restore generated runtime artifacts required by tests**

Run:

```powershell
npm run build
```

Expected: build passes and generated runtime files exist in the worktree.

- [ ] **Step 4: Verify a clean baseline before edits**

Run:

```powershell
git status --short
```

Expected: no unexpected dirty files before implementation begins.

## Task 2: Reframe The Skill Around A Single Procedural Role

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/saisie-contrefacon/SKILL.md`

- [ ] **Step 1: Locate the current sections mixing procedure and broader litigation**

Run:

```powershell
rg -n "^## |^### |post-saisie|requête|Instructions|Spécificités par droit|Gestion post-saisie|Risques de rétractation|Examples" plugins/hacienda-propriete-intellectuelle/skills/saisie-contrefacon/SKILL.md
```

Expected: anchors for the sections that currently define the old V1 flow.

- [ ] **Step 2: Rewrite the top-level positioning**

Update `plugins/hacienda-propriete-intellectuelle/skills/saisie-contrefacon/SKILL.md` so the introduction clearly says:

```md
`saisie-contrefacon` V2 est un skill de preparation stricte de mesure probatoire.
Il sert a preparer la requete, le perimetre de saisie, les instructions
d'execution et le routage immediat post-saisie. Il ne depose pas la requete,
ne remplace pas l'avocat ou le commissaire de justice, et ne pilote pas seul
la strategie contentieuse globale.
```

Expected: the skill no longer reads like a broad litigation orchestrator.

- [ ] **Step 3: Add a short “this skill does not do” section**

Add bullets such as:

```md
- ne depose pas la requete
- ne remplace pas l'analyse de fond complete de la contrefacon
- ne remplace pas `contentieux-pi`
- ne remplace pas `mise-en-demeure-pi`
- ne remplace pas `tableau-contrefacon-brevet`
```

Expected: the procedural perimeter is explicit from the top.

## Task 3: Add The Closed V2 Intake Contract

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/saisie-contrefacon/SKILL.md`

- [ ] **Step 1: Replace the open intake list with a closed V2 contract**

Refactor the intake so the skill explicitly derives:

```md
- `rights_track`: `patent` / `trademark` / `design` / `copyright` / `software` / `mixed`
- `title_status`: `valid` / `uncertain` / `blocked`
- `proof_posture`: `strong` / `mixed` / `weak` / `none`
- `target_location_status`: `identified` / `partial` / `unknown`
- `seizure_scope`: `descriptive` / `real` / `documents` / `internet` / `mixed` / `unclear`
- `execution_urgency`: `routine` / `heightened` / `critical` / `unclear`
- `trade_secret_risk`: `low` / `medium` / `high` / `unclear`
- `post_seizure_readiness`: `ready` / `partial` / `blocked`
```

Expected: the skill no longer relies on a narrative intake only.

- [ ] **Step 2: Define the minimal fact set**

Add the V2 minimum facts:

```md
- `right_invoked`
- `title_reference`
- `title_validity_status`
- `suspected_infringer`
- `target_locations`
- `suspected_acts`
- `available_pre_evidence`
- `requested_seizure_type`
- `expert_need`
- `urgency_context`
- `expected_court`
```

Expected: the seizure-preparation flow has a clear minimum data contract.

## Task 4: Add The `Seizure Readiness Gate`

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/saisie-contrefacon/SKILL.md`

- [ ] **Step 1: Insert a dedicated `Seizure Readiness Gate` section**

Add:

```md
## Seizure Readiness Gate

Statuts :
- `ready`
- `partial`
- `blocked`
```

Expected: the gate becomes a first-class contract element.

- [ ] **Step 2: Define `ready` / `partial` / `blocked` criteria**

Include wording equivalent to:

```md
Passer en `blocked` si :
- le titre est trop incertain ;
- le commencement de preuve est trop faible ;
- les lieux ou objets ne sont pas localisables ;
- la mesure serait proceduralement mal fondee ou disproportionnee.
```

Expected: the skill can stop on insufficient seizure basis rather than drafting a weak pseudo-request.

- [ ] **Step 3: Add blocked-mode behavior**

Explicitly require:

```md
En `blocked`, produire un constat de blocage et une suite de preparation,
pas une pseudo-requete de saisie.
```

Expected: the gate has real behavioral consequences.

## Task 5: Stabilize The V2 Output Contract

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/saisie-contrefacon/SKILL.md`

- [ ] **Step 1: Replace the loose output flow with the V2 9-block contract**

Refactor the output to exactly these blocks:

```md
1. `Case Snapshot`
2. `Seizure Readiness Gate`
3. `Rights Track And Legal Basis`
4. `Proposed Seizure Scope`
5. `Evidence And Proportionality`
6. `Trade Secret And Execution Constraints`
7. `Drafting And Execution Pack`
8. `Decision Routing`
9. `Human Validation`
```

Expected: the skill has a stable, closed V2 structure.

- [ ] **Step 2: Fold the current request and execution sections into the new contract**

Map the current “Projet de requête”, “Instructions huissier”, “Gestion post-saisie” and “Risques de rétractation” material into:

```md
- `Drafting And Execution Pack`
- `Evidence And Proportionality`
- `Trade Secret And Execution Constraints`
- `Decision Routing`
```

Expected: no important procedural substance is lost, but the structure becomes V2-consistent.

- [ ] **Step 3: Preserve the mandatory human guardrails**

Make sure the output still requires:

```md
- validation avocat obligatoire
- coordination commissaire de justice
- verification du delai 20 jours ouvrables / 31 jours civils
- `brouillon`, pas acte de procedure final
```

Expected: V2 does not regress legal-risk guardrails.

## Task 6: Add A Closed `Decision Routing`

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/saisie-contrefacon/SKILL.md`

- [ ] **Step 1: Add the closed routing vocabulary**

Constrain `Decision Routing` to:

```md
- `prepare-filing-pack`
- `prepare-execution-pack`
- `prepare-post-seizure-assignment`
- `prepare-evidence-hardening`
- `route-to-substantive-infringement-review`
- `hold-insufficient-basis`
```

Expected: the skill recommends bounded next steps instead of open-ended procedural advice.

- [ ] **Step 2: Tie each route to the right neighboring skill or actor**

Add explicit routing notes such as:

```md
- `route-to-substantive-infringement-review` -> `tableau-contrefacon-brevet`,
  `contrefacon-droit-auteur`, or `contrefacon-dessin-modele` depending on track
- `prepare-post-seizure-assignment` -> `contentieux-pi`
```

Expected: the boundaries with neighboring skills are operational, not only descriptive.

## Task 7: Make The Multi-Rights Branching Explicit

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/saisie-contrefacon/SKILL.md`

- [ ] **Step 1: Reframe the per-right material under `rights_track`**

Keep the substance for brevet / marque / D&M / auteur / logiciel, but recast it as explicit track-specific notes under a V2 section such as:

```md
## Rights Track Notes

### `patent`
...

### `trademark`
...

### `design`
...

### `copyright`
...

### `software`
...
```

Expected: the skill stays multi-rights without looking like five partially separate mini-skills.

- [ ] **Step 2: Preserve the software-specific legal distinction**

Keep the current software-specific seizure considerations distinct from generic copyright language, since the current skill already highlights code-source / expert-informatique needs.

Expected: the `software` track remains a real branch, not a footnote under copyright.

## Task 8: Clarify Boundaries With Neighbor Skills

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/saisie-contrefacon/SKILL.md`

- [ ] **Step 1: Add a dedicated boundary section**

Explicitly distinguish:

```md
- `tri-contrefacon`
- `mise-en-demeure-pi`
- `contentieux-pi`
- `tableau-contrefacon-brevet`
- `contrefacon-droit-auteur`
- `contrefacon-dessin-modele`
```

Expected: the seizure skill is no longer ambiguous about where it starts and stops.

- [ ] **Step 2: Remove or tighten language that implies end-to-end litigation orchestration**

If any remaining phrasing suggests that `saisie-contrefacon` itself decides the whole litigation path, replace it with routing language.

Expected: the skill stays procedural and scoped.

## Task 9: Add The V2 Routing / Output Memo

**Files:**
- Create: `plugins/hacienda-propriete-intellectuelle/skills/saisie-contrefacon/references/saisie-contrefacon-routing-and-output.md`

- [ ] **Step 1: Create the reference memo**

Add a compact memo covering:

```md
# Saisie Contrefacon V2 - Routing And Output

## Role
...

## Closed Intake
...

## Seizure Readiness Gate
...

## Output Contract
...

## Closed Routing
...

## Boundaries
...
```

Expected: future workers can reuse the V2 contract without reading the full skill.

## Task 10: Update README And Changelog

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Update README skill inventory**

Rewrite the `saisie-contrefacon` description so it reads as seizure-measure preparation, for example:

```md
- `saisie-contrefacon` : skill V2 multi-droits de preparation stricte de
  mesure probatoire, centre sur la requete, le perimetre de saisie, les
  contraintes d'execution et le routage post-saisie, sans se substituer au
  contentieux global
```

Expected: the README matches the migrated contract.

- [ ] **Step 2: Update README current-version summary if needed**

If the README has a `Version Courante` section, add a short bullet for the new migration so the headline status does not lag behind the changelog.

Expected: top-level plugin documentation reflects the newly migrated skill.

- [ ] **Step 3: Add changelog entry**

Add a new top changelog entry, for example:

```md
## 0.18.3 — 2026-05-19

### Alignement documentaire
- `saisie-contrefacon` est documente en V2 comme skill multi-droits de
  preparation stricte de mesure probatoire
- ajout d'un `Seizure Readiness Gate`
- sortie V2 stabilisee en 9 blocs
- routage post-saisie ferme
- frontieres explicites avec intake enforcement, lettre, claim chart et contentieux
```

Expected: the migration is discoverable in the plugin history.

## Task 11: Verification And Scope Cleanup

**Files:**
- Verify all changed files above

- [ ] **Step 1: Run tests**

Run:

```powershell
npm test
```

Expected: full suite passes. If flaky MCP stdio tests fail once, rebuild and rerun the targeted test before rerunning the full suite.

- [ ] **Step 2: Run typecheck**

Run:

```powershell
npm run typecheck
```

Expected: passes cleanly.

- [ ] **Step 3: Run build**

Run:

```powershell
npm run build
```

Expected: passes cleanly.

- [ ] **Step 4: Run branding check**

Run:

```powershell
npm run branding:check
```

Expected: `Branding Hacienda OK`.

- [ ] **Step 5: Check whitespace / patch hygiene**

Run:

```powershell
git diff --check
```

Expected: no diff-check failures; CRLF warnings may appear on Windows.

- [ ] **Step 6: Remove generated noise from the worktree**

If `package-lock.json` or `dist/` files changed only due to `npm install` / `build`, restore them:

```powershell
git restore package-lock.json `
  plugins/hacienda-propriete-intellectuelle/mcp-server/dist/index.js `
  plugins/hacienda-propriete-intellectuelle/mcp-server/dist/version.js `
  plugins/hacienda-sources-officielles/mcp-server/dist/index.js
```

Expected: only the intended skill/doc files remain dirty.

## Task 12: Commit, Merge, Push, And Refresh Index

**Files:**
- Stage only the intended skill/doc files

- [ ] **Step 1: Stage the intended files**

Run:

```powershell
git add `
  plugins/hacienda-propriete-intellectuelle/skills/saisie-contrefacon/SKILL.md `
  plugins/hacienda-propriete-intellectuelle/skills/saisie-contrefacon/references/saisie-contrefacon-routing-and-output.md `
  plugins/hacienda-propriete-intellectuelle/README.md `
  plugins/hacienda-propriete-intellectuelle/CHANGELOG.md `
  docs/superpowers/specs/2026-05-19-hacienda-pi-saisie-contrefacon-v2-design.md `
  docs/superpowers/plans/2026-05-19-hacienda-pi-saisie-contrefacon-v2.md
```

Expected: staged scope matches the migration only.

- [ ] **Step 2: Commit**

Run:

```powershell
git commit -m "feat: restructure seizure measure preparation skill"
```

Expected: one focused commit for the migration.

- [ ] **Step 3: Backup any same-name untracked spec/plan files in main before merge**

If the main workspace already has untracked copies of the same spec/plan paths, back them up to `%TEMP%` and remove them before merge.

Expected: fast-forward merge is not blocked by untracked-file conflicts.

- [ ] **Step 4: Merge into `main`**

Run in the main workspace:

```powershell
git merge --ff-only codex/saisie-contrefacon-v2
```

Expected: fast-forward merge succeeds.

- [ ] **Step 5: Push**

Run:

```powershell
git push origin main
```

Expected: pre-push checks pass and `origin/main` updates.

- [ ] **Step 6: Refresh GitNexus index on `main`**

Run:

```powershell
npx gitnexus analyze
```

Expected: main repo index refreshes successfully.

- [ ] **Step 7: Restore hook-generated noise**

If the push hook dirties tracked files such as PI `dist/`, `AGENTS.md`, or `CLAUDE.md`, restore them:

```powershell
git restore `
  plugins/hacienda-propriete-intellectuelle/mcp-server/dist/index.js `
  plugins/hacienda-propriete-intellectuelle/mcp-server/dist/version.js `
  AGENTS.md `
  CLAUDE.md
```

Expected: main workspace returns to a clean state.

- [ ] **Step 8: Remove worktree and local branch**

Run:

```powershell
git worktree remove .worktrees/saisie-contrefacon-v2 --force
git branch -d codex/saisie-contrefacon-v2
```

Expected: local cleanup complete.

