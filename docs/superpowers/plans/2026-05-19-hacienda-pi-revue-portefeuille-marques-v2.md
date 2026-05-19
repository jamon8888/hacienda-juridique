# Revue Portefeuille Marques V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition `revue-portefeuille-marques` as a V2 trademark portfolio hub centered on `report` / `audit` / dashboard, while keeping CRUD modes as secondary registry maintenance.

**Architecture:** Keep one public skill entrypoint and refactor its contract around a dominant portfolio layer (`report`, `audit`) plus a secondary registry layer (`add`, `update`, `remove`, `list`). Reuse the existing dashboard renderer, preserve internal-registry guardrails, and align README / changelog with the new product posture.

**Tech Stack:** Markdown skill files, YAML portfolio registry, Hacienda dashboard renderer, npm test/typecheck/build/branding verification, Git worktree workflow

---

## File Map

- Modify: `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-marques/SKILL.md`
  - Main V2 contract, portfolio gate, report/audit output contract, CRUD demotion, boundary text.
- Create: `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-marques/references/revue-portefeuille-marques-routing-and-output.md`
  - Compact routing / output memo aligned with V2 contract.
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
  - Reposition the skill as a portfolio hub rather than CRUD-first registry tool.
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
  - Record the V2 migration and contract change.
- Keep: `docs/superpowers/specs/2026-05-19-hacienda-pi-revue-portefeuille-marques-v2-design.md`
  - Approved design reference carried with the change set.

## Task 1: Create Isolated Worktree And Baseline

**Files:**
- Create worktree: `.worktrees/revue-portefeuille-marques-v2`

- [ ] **Step 1: Create the worktree from `main`**

Run:

```powershell
git worktree add .worktrees/revue-portefeuille-marques-v2 -b codex/revue-portefeuille-marques-v2 main
```

Expected: new worktree created on branch `codex/revue-portefeuille-marques-v2`.

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

## Task 2: Reframe The Skill As A Portfolio Hub

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-marques/SKILL.md`

- [ ] **Step 1: Locate the current mode and output sections**

Run:

```powershell
rg -n "Mode `--report|Mode `--audit|Mode `--add|Mode `--update|Mode `--remove|Mode `--list|Format de sortie|Ce que ce skill NE fait PAS|renderDashboard|dashboard" plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-marques/SKILL.md
```

Expected: anchors for the sections that define the old CRUD+audit balance.

- [ ] **Step 2: Rewrite the top-level positioning**

Update `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-marques/SKILL.md` so the introduction clearly says:

```md
`revue-portefeuille-marques` V2 est un skill de pilotage portefeuille.
Il sert d'abord a produire un rapport, auditer le registre et prioriser les
echeances / renouvellements / gaps de surveillance. Les modes CRUD restent
supportes, mais comme maintenance secondaire du registre.
```

Expected: the skill no longer reads as CRUD-first.

- [ ] **Step 3: Define the V2 mode hierarchy**

Add a dedicated section in `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-marques/SKILL.md`:

```md
Modes principaux :
- `report`
- `audit`

Modes secondaires :
- `add`
- `update`
- `remove`
- `list`
```

Expected: the contract explicitly distinguishes primary and secondary modes.

## Task 3: Add The Portfolio Readiness Gate

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-marques/SKILL.md`

- [ ] **Step 1: Add the closed intake contract for `report` / `audit`**

Refactor the skill so `report` / `audit` explicitly derive these statuses:

```md
- `portfolio_source_status`: `present` / `missing` / `partial`
- `renewal_visibility_status`: `clear` / `partial` / `blocked`
- `ownership_visibility_status`: `clear` / `partial` / `blocked`
- `watchlist_status`: `available` / `missing` / `partial`
- `dashboard_mode`: `markdown-only` / `markdown-plus-dashboard` / `dashboard-required`
- `portfolio_readiness`: `ready` / `partial` / `blocked`
```

Expected: `report` / `audit` no longer rely on an open-ended narrative intake.

- [ ] **Step 2: Define the minimal fact set**

Add the V2 minimum facts:

```md
- `portfolio_path`
- `asset_count`
- `last_audit`
- `renewal_entries_present`
- `territory_entries_present`
- `strategic_levels_present`
- `business_owner_coverage`
- `mandataire_coverage`
- `watchlist_cross_reference_status`
```

Expected: the report and audit modes operate on a clear minimum data contract.

- [ ] **Step 3: Add the `Portfolio Readiness Gate`**

Insert a dedicated section:

```md
## Portfolio Readiness Gate

Statuts :
- `ready`
- `partial`
- `blocked`

Passer en `blocked` si :
- le registre est absent et ne peut pas etre cree proprement ;
- les echeances sont trop lacunaires ;
- les owners / mandataires critiques sont trop incomplets pour prioriser.
```

Expected: `report` / `audit` can stop on missing critical registry quality instead of producing false confidence.

## Task 4: Stabilize The `report` Output Contract

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-marques/SKILL.md`

- [ ] **Step 1: Replace the free-form report structure with the V2 9-block contract**

Refactor `report` output to exactly these blocks:

```md
1. `Portfolio Snapshot`
2. `Portfolio Readiness Gate`
3. `Renewal Priority`
4. `Coverage And Territories`
5. `Ownership And Coverage`
6. `Watchlist Signals`
7. `Critical Gaps`
8. `Decision Routing`
9. `Human Validation`
```

Expected: report mode has a stable, closed structure centered on portfolio oversight.

- [ ] **Step 2: Close the report routing vocabulary**

Constrain `Decision Routing` to outcomes such as:

```md
- `prepare-renewal-escalation`
- `prepare-watchlist-regularization`
- `prepare-portfolio-cleanup`
- `prepare-territory-review`
- `hold-for-registry-regularization`
```

Expected: the hub produces a bounded next-step recommendation set instead of open-ended advice.

- [ ] **Step 3: Reassert internal-registry legal guardrails in the output contract**

Make sure each generated report still requires:

```md
- registre interne != registre officiel
- renouvellement note dans le registre != renouvellement confirme office
- verification mandataire / office avant action
- `[a verifier]` and `[PROVISOIRE]` remain visible when applicable
```

Expected: V2 does not regress legal-risk guardrails while simplifying structure.

## Task 5: Reframe `audit` And Demote CRUD

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-marques/SKILL.md`

- [ ] **Step 1: Tighten the `audit` contract**

Rewrite the `audit` mode so it follows the same portfolio-first logic:

```md
- gate
- critical findings
- severity
- regularization actions
- human validation
```

Expected: audit is clearly a portfolio health check, not a side effect of CRUD.

- [ ] **Step 2: Keep CRUD, but explicitly subordinate it**

For `add`, `update`, `remove`, `list`, add framing such as:

```md
Ces modes maintiennent le registre, mais ne redefinissent pas la promesse
principale du skill, qui reste `report` / `audit`.
```

Expected: CRUD remains supported without competing with the hub identity.

## Task 6: Preserve Dashboard Reuse And Clarify Boundaries

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-marques/SKILL.md`

- [ ] **Step 1: Keep the dashboard contract explicit**

Preserve the rule that the skill reuses `renderDashboard` and does not define a separate HTML contract by hand.

Expected wording to preserve or tighten:

```md
- reutilise strictement `renderDashboard`
- ne cree pas un template HTML parallele
- le dashboard reste secondaire par rapport au Markdown
```

- [ ] **Step 2: Clarify skill boundaries**

Add or tighten a dedicated boundary section that explicitly distinguishes:

```md
- `recherche-anteriorite-marque`
- `depot-marque-fr`
- `surveillance-marque`
- `analyse-opposition-marque`
- `audit-pi-ma`
- `portefeuille-pi`
```

Expected: no ambiguity remains about what this skill does versus neighboring marque workflows.

## Task 7: Add The V2 Routing / Output Memo

**Files:**
- Create: `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-marques/references/revue-portefeuille-marques-routing-and-output.md`

- [ ] **Step 1: Create the reference memo**

Add a compact memo covering:

```md
# Revue Portefeuille Marques V2 - Routing And Output

## Role
...

## Closed Intake For `report` / `audit`
...

## Portfolio Readiness Gate
...

## `report` Output Contract
...

## `audit` Output Contract
...

## Closed Routing
...

## Boundaries
...
```

Expected: nearby workers and future migrations can reuse a compact contract reference without reading the full skill.

## Task 8: Update README And Changelog

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Update README skill inventory**

Rewrite the `revue-portefeuille-marques` description so it reads as a portfolio hub first, for example:

```md
- `revue-portefeuille-marques` : hub portefeuille marques V2, centre sur
  `report` et `audit`, avec `Portfolio Readiness Gate`, priorisation des
  renouvellements, dashboard HTML optionnel et CRUD maintenu comme couche
  secondaire du registre interne
```

Expected: the README matches the migrated contract.

- [ ] **Step 2: Update README current-version summary if needed**

If the README has a `Version Courante` section, add a short bullet for the new migration so the headline status does not lag behind the changelog.

Expected: top-level plugin documentation reflects the newly migrated skill.

- [ ] **Step 3: Add changelog entry**

Add a new top changelog entry, for example:

```md
## 0.18.2 — 2026-05-19

### Alignement documentaire
- `revue-portefeuille-marques` est documente en V2 comme hub portefeuille,
  centre sur `report` et `audit`, et non plus comme skill CRUD + audit a
  parts egales
- ajout d'un `Portfolio Readiness Gate`
- sortie `report` stabilisee
- dashboard maintenu via `renderDashboard`
- CRUD conserve comme maintenance secondaire
```

Expected: the migration is discoverable in the plugin history.

## Task 9: Verification And Scope Cleanup

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

## Task 10: Commit, Merge, Push, And Refresh Index

**Files:**
- Stage only the intended skill/doc files

- [ ] **Step 1: Stage the intended files**

Run:

```powershell
git add `
  plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-marques/SKILL.md `
  plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-marques/references/revue-portefeuille-marques-routing-and-output.md `
  plugins/hacienda-propriete-intellectuelle/README.md `
  plugins/hacienda-propriete-intellectuelle/CHANGELOG.md `
  docs/superpowers/specs/2026-05-19-hacienda-pi-revue-portefeuille-marques-v2-design.md `
  docs/superpowers/plans/2026-05-19-hacienda-pi-revue-portefeuille-marques-v2.md
```

Expected: staged scope matches the migration only.

- [ ] **Step 2: Commit**

Run:

```powershell
git commit -m "feat: restructure trademark portfolio review skill"
```

Expected: one focused commit for the migration.

- [ ] **Step 3: Backup any same-name untracked spec/plan files in main before merge**

If the main workspace already has untracked copies of the same spec/plan paths, back them up to `%TEMP%` and remove them before merge.

Expected: fast-forward merge is not blocked by untracked-file conflicts.

- [ ] **Step 4: Merge into `main`**

Run in the main workspace:

```powershell
git merge --ff-only codex/revue-portefeuille-marques-v2
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
git worktree remove .worktrees/revue-portefeuille-marques-v2 --force
git branch -d codex/revue-portefeuille-marques-v2
```

Expected: local cleanup complete.

