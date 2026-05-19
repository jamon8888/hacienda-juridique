# Strategie Extension Internationale V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure `strategie-extension-internationale` into a V2 territorial routing skill with a closed intake contract, an `Extension Readiness Gate`, and stable output/routing.

**Architecture:** Keep one public skill entrypoint and refactor only the skill contract, routing memo, and plugin docs. The skill remains focused on territorial sequencing (`FR`, `EP`, `PCT`, `sequenced`) while costs and maintenance stay as decision constraints rather than portfolio management outputs.

**Tech Stack:** Markdown skill files, Hacienda plugin docs, npm test/typecheck/build/branding verification, Git worktree workflow

---

## File Map

- Modify: `plugins/hacienda-propriete-intellectuelle/skills/strategie-extension-internationale/SKILL.md`
  - Public V2 contract, gate, stable outputs, closed routing, boundary text.
- Create: `plugins/hacienda-propriete-intellectuelle/skills/strategie-extension-internationale/references/strategie-extension-internationale-routing-and-output.md`
  - Short routing memo aligned with V2 outputs and allowed final routes.
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
  - Reposition skill as territorial strategy and sequencing, not filing or portfolio management.
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
  - Record V2 migration and behavior changes.
- Keep: `docs/superpowers/specs/2026-05-19-hacienda-pi-strategie-extension-internationale-v2-design.md`
  - Approved design reference carried with this change set.

## Task 1: Create Isolated Worktree And Baseline

**Files:**
- Create worktree: `.worktrees/strategie-extension-internationale-v2`

- [ ] **Step 1: Create the worktree from `main`**

Run:

```powershell
git worktree add .worktrees/strategie-extension-internationale-v2 -b codex/strategie-extension-internationale-v2 main
```

Expected: a new worktree created on branch `codex/strategie-extension-internationale-v2`.

- [ ] **Step 2: Install dependencies in the new worktree if needed**

Run:

```powershell
npm install
```

Expected: lockfile unchanged and local dependencies available for `vitest`, `tsc`, and build scripts.

- [ ] **Step 3: Build once to restore generated runtime artifacts required by tests**

Run:

```powershell
npm run build
```

Expected: build passes and `packages/core/dist` exists in the worktree.

- [ ] **Step 4: Capture a clean baseline before edits**

Run:

```powershell
git status --short
```

Expected: no unexpected dirty files before editing.

## Task 2: Restructure The Skill Contract In `SKILL.md`

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/strategie-extension-internationale/SKILL.md`

- [ ] **Step 1: Inspect the current skill and identify sections to replace**

Run:

```powershell
rg -n "Charger le profil|Intake|Arbre decisionnel|Format de sortie|Ce que ce skill NE fait PAS|Ton" plugins/hacienda-propriete-intellectuelle/skills/strategie-extension-internationale/SKILL.md
```

Expected: line anchors for the old monolithic sections.

- [ ] **Step 2: Rewrite the intake around the V2 closed contract**

Update `plugins/hacienda-propriete-intellectuelle/skills/strategie-extension-internationale/SKILL.md` so the intake converges to:

```md
- `priority_window_status`: `open-safe` / `open-tight` / `expired` / `unknown`
- `territory_posture`: `fr-only` / `eu-focused` / `global-flex` / `named-countries`
- `market_profile`: `local` / `regional` / `transatlantic` / `global` / `unclear`
- `budget_posture`: `tight` / `moderate` / `broad` / `unknown`
- `maintenance_posture`: `systematic` / `selective` / `defensive` / `unknown`
- `filing_baseline_status`: `confirmed-fr-base` / `partial-fr-base` / `unclear-fr-base`
```

Expected: the skill no longer relies on an open-ended five-question intake as its primary contract.

- [ ] **Step 3: Add the `Extension Readiness Gate`**

Insert a dedicated V2 gate section in `plugins/hacienda-propriete-intellectuelle/skills/strategie-extension-internationale/SKILL.md`:

```md
## Extension Readiness Gate

Classer le dossier :
- `ready`
- `partial`
- `blocked`

Passer en `blocked` si :
- la fenetre de priorite est inconnue ou inexploitable ;
- la base FR est trop incertaine ;
- les marches cibles sont trop flous ;
- le budget manque alors qu'il conditionne directement l'arbitrage.
```

Expected: the skill stops over-concluding when prerequisites are missing.

- [ ] **Step 4: Replace the old output template with the V2 9-block contract**

Refactor the output section so it emits exactly these blocks:

```md
1. `Case Snapshot`
2. `Priority Window and Baseline`
3. `Target Market Posture`
4. `Route Comparison`
5. `Cost and Maintenance Pressure`
6. `Primary Recommendation`
7. `Fallback Paths`
8. `Decision Routing`
9. `Human Validation`
```

Expected: the output contract matches the approved spec and no longer uses the older free-form recommendation layout.

- [ ] **Step 5: Close the final routing vocabulary**

Update the final routing section in `plugins/hacienda-propriete-intellectuelle/skills/strategie-extension-internationale/SKILL.md` so only these routes are allowed:

```md
- `stay-fr-only`
- `prepare-ep-route`
- `prepare-pct-route`
- `prepare-sequenced-route`
- `hold-for-market-clarification`
- `hold-for-budget-clarification`
- `hold-priority-risk`
```

Expected: no other implicit or ad hoc route labels remain.

- [ ] **Step 6: Tighten boundaries with neighboring patent skills**

Add or update explicit boundary text against:

```md
- `recherche-anteriorite-brevet`
- `preparation-depot-brevet`
- `analyse-refus-inpi`
- `anteriorite-invalidite`
- `revue-portefeuille-brevets`
```

Expected: the skill clearly owns territorial decisioning only.

- [ ] **Step 7: Preserve and normalize the profile-loading guardrail**

Make sure `plugins/hacienda-propriete-intellectuelle/skills/strategie-extension-internationale/SKILL.md` still instructs loading:

```md
1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`
```

and still requires `[PROVISOIRE]` or `[a verifier]` defaults when the profile is absent or incomplete.

Expected: this V2 matches the guardrail discipline restored in recent brevet skills.

## Task 3: Add The V2 Routing Memo

**Files:**
- Create: `plugins/hacienda-propriete-intellectuelle/skills/strategie-extension-internationale/references/strategie-extension-internationale-routing-and-output.md`

- [ ] **Step 1: Create the new reference file**

Add `plugins/hacienda-propriete-intellectuelle/skills/strategie-extension-internationale/references/strategie-extension-internationale-routing-and-output.md` with:

```md
# Strategie Extension Internationale V2 — Routing And Output

## Allowed intake statuses

- `priority_window_status`: `open-safe` / `open-tight` / `expired` / `unknown`
- `territory_posture`: `fr-only` / `eu-focused` / `global-flex` / `named-countries`
- `market_profile`: `local` / `regional` / `transatlantic` / `global` / `unclear`
- `budget_posture`: `tight` / `moderate` / `broad` / `unknown`
- `maintenance_posture`: `systematic` / `selective` / `defensive` / `unknown`
- `filing_baseline_status`: `confirmed-fr-base` / `partial-fr-base` / `unclear-fr-base`

## Gate

- `ready`
- `partial`
- `blocked`

## Output blocks

1. `Case Snapshot`
2. `Priority Window and Baseline`
3. `Target Market Posture`
4. `Route Comparison`
5. `Cost and Maintenance Pressure`
6. `Primary Recommendation`
7. `Fallback Paths`
8. `Decision Routing`
9. `Human Validation`

## Allowed routes

- `stay-fr-only`
- `prepare-ep-route`
- `prepare-pct-route`
- `prepare-sequenced-route`
- `hold-for-market-clarification`
- `hold-for-budget-clarification`
- `hold-priority-risk`
```

Expected: a compact routing memo exists for future maintenance and review.

- [ ] **Step 2: Reference the memo from the main skill if useful**

If the skill already cites adjacent references, add a short reference line in `plugins/hacienda-propriete-intellectuelle/skills/strategie-extension-internationale/SKILL.md` pointing to:

```md
`references/strategie-extension-internationale-routing-and-output.md`
```

Expected: the skill and memo stay linked without duplicating large narrative sections.

## Task 4: Realign Plugin README And Changelog

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Update the README positioning**

Adjust the `strategie-extension-internationale` bullet or subsection in `plugins/hacienda-propriete-intellectuelle/README.md` so it says, in substance:

```md
- `strategie-extension-internationale` : skill V2 de decision territoriale et de sequencement
  (`FR`, `EP`, `PCT`, `sequenced`) avec `Extension Readiness Gate`, comparaison
  des routes, pression cout / annuites, et routing ferme ; il ne prepare pas le
  dossier de depot et n'absorbe pas `preparation-depot-brevet`.
```

Expected: README reflects the new scope and boundary.

- [ ] **Step 2: Add the changelog entry**

Add a new top entry in `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md` similar to:

```md
- `strategie-extension-internationale` passe en V2 comme skill de decision
  territoriale et de sequencement (`FR`, `EP`, `PCT`, `sequenced`), avec
  `Extension Readiness Gate`, sortie stabilisee en 9 blocs, et `Decision Routing`
  ferme ; les couts et annuites restent des contraintes de decision, sans faire
  du skill un orchestrateur de portefeuille.
```

Expected: the migration is documented consistently with the other V2 skill moves.

## Task 5: Verify Scope And Quality

**Files:**
- Verify: modified files only

- [ ] **Step 1: Check formatting and whitespace**

Run:

```powershell
git diff --check
```

Expected: no diff-check errors.

- [ ] **Step 2: Run focused text sanity checks**

Run:

```powershell
rg -n "marqueur de travail" plugins/hacienda-propriete-intellectuelle/skills/strategie-extension-internationale plugins/hacienda-propriete-intellectuelle/README.md plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
```

Expected: no marker matches in the changed scope.

- [ ] **Step 3: Run the full repository verification set**

Run:

```powershell
npm test
npm run typecheck
npm run build
npm run branding:check
git diff --check
```

Expected: all commands pass. If `hacienda-pi-cowork-structure.test.ts` or `smoke.test.ts` flakes on MCP stdio, rerun `npm run build`, then rerun the targeted tests and the full suite.

- [ ] **Step 4: Confirm only expected files changed**

Run:

```powershell
git status --short
git diff --name-only
```

Expected changed files:

```text
plugins/hacienda-propriete-intellectuelle/skills/strategie-extension-internationale/SKILL.md
plugins/hacienda-propriete-intellectuelle/skills/strategie-extension-internationale/references/strategie-extension-internationale-routing-and-output.md
plugins/hacienda-propriete-intellectuelle/README.md
plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
docs/superpowers/specs/2026-05-19-hacienda-pi-strategie-extension-internationale-v2-design.md
docs/superpowers/plans/2026-05-19-hacienda-pi-strategie-extension-internationale-v2.md
```

## Task 6: Commit, Merge, Push, And Refresh The Index

**Files:**
- Commit only expected scope

- [ ] **Step 1: Stage only the intended files**

Run:

```powershell
git add plugins/hacienda-propriete-intellectuelle/skills/strategie-extension-internationale/SKILL.md
git add plugins/hacienda-propriete-intellectuelle/skills/strategie-extension-internationale/references/strategie-extension-internationale-routing-and-output.md
git add plugins/hacienda-propriete-intellectuelle/README.md
git add plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
git add docs/superpowers/specs/2026-05-19-hacienda-pi-strategie-extension-internationale-v2-design.md
git add docs/superpowers/plans/2026-05-19-hacienda-pi-strategie-extension-internationale-v2.md
```

Expected: only the V2 strategy-extension files are staged.

- [ ] **Step 2: Commit in the worktree**

Run:

```powershell
git commit -m "feat: restructure international patent extension strategy skill"
```

Expected: one focused commit on `codex/strategie-extension-internationale-v2`.

- [ ] **Step 3: Merge fast-forward into `main`**

Run from the main workspace:

```powershell
git checkout main
git merge --ff-only codex/strategie-extension-internationale-v2
```

Expected: fast-forward merge succeeds.

- [ ] **Step 4: Push and refresh GitNexus**

Run:

```powershell
git push origin main
npx gitnexus analyze
```

Expected: `main` equals `origin/main` and the index is refreshed after the merge.

- [ ] **Step 5: Restore hook-generated noise if needed and confirm clean state**

Run:

```powershell
git status --short
```

Expected: clean repo. If pre-push hooks dirtied `AGENTS.md`, `CLAUDE.md`, or
`plugins/hacienda-propriete-intellectuelle/mcp-server/dist/*`, restore them
before finishing.

## Self-Review

- Spec coverage: this plan covers the V2 intake contract, gate, 9-block output,
  closed routing, skill boundaries, reference memo, README, changelog, and full
  verification/merge flow.
- Scan de marqueurs: no unresolved filler steps remain.
- Type consistency: the plan uses the same route labels, gate labels, and intake
  status names as the approved spec.
