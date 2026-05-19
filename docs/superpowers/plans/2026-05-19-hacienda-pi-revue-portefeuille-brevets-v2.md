# Revue Portefeuille Brevets V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition `revue-portefeuille-brevets` as a V2 patent portfolio hub centered on `report` / `audit` / dashboard, while keeping CRUD modes as secondary registry maintenance.

**Architecture:** Keep one public skill entrypoint and refactor its contract around a dominant portfolio layer (`report`, `audit`) plus a secondary registry layer (`add`, `update`, `remove`, `list`). Reuse the existing dashboard renderer, preserve internal-registry guardrails, and align README / changelog with the new product posture.

**Tech Stack:** Markdown skill files, YAML portfolio registry, Hacienda dashboard renderer, npm test/typecheck/build/branding verification, Git worktree workflow

---

## File Map

- Modify: `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-brevets/SKILL.md`
  - Main V2 contract, portfolio gate, report/audit output contract, CRUD demotion, boundary text.
- Create: `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-brevets/references/revue-portefeuille-brevets-routing-and-output.md`
  - Compact routing / output memo aligned with V2 contract.
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
  - Reposition the skill as a portfolio hub rather than CRUD-first registry tool.
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
  - Record the V2 migration and contract change.
- Keep: `docs/superpowers/specs/2026-05-19-hacienda-pi-revue-portefeuille-brevets-v2-design.md`
  - Approved design reference carried with the change set.

## Task 1: Create Isolated Worktree And Baseline

**Files:**
- Create worktree: `.worktrees/revue-portefeuille-brevets-v2`

- [ ] **Step 1: Create the worktree from `main`**

Run:

```powershell
git worktree add .worktrees/revue-portefeuille-brevets-v2 -b codex/revue-portefeuille-brevets-v2 main
```

Expected: new worktree created on branch `codex/revue-portefeuille-brevets-v2`.

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
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-brevets/SKILL.md`

- [ ] **Step 1: Locate the current mode and output sections**

Run:

```powershell
rg -n "Mode `--report|Mode `--audit|Mode `--add|Mode `--update|Mode `--remove|Mode `--list|Format de sortie|Ce que ce skill NE fait PAS|Ton" plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-brevets/SKILL.md
```

Expected: anchors for the sections that define the old CRUD+audit balance.

- [ ] **Step 2: Rewrite the top-level positioning**

Update `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-brevets/SKILL.md` so the introduction clearly says:

```md
`revue-portefeuille-brevets` V2 est un skill de pilotage portefeuille.
Il sert d'abord a produire un rapport, auditer le registre et prioriser les
annuites / expirations / gaps. Les modes CRUD restent supportes, mais comme
maintenance secondaire du registre.
```

Expected: the skill no longer reads as CRUD-first.

- [ ] **Step 3: Define the V2 mode hierarchy**

Add a dedicated section in `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-brevets/SKILL.md`:

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
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-brevets/SKILL.md`

- [ ] **Step 1: Add the closed intake contract for `report` / `audit`**

Refactor the skill so `report` / `audit` explicitly derive these statuses:

```md
- `portfolio_source_status`: `present` / `missing` / `partial`
- `annuity_visibility_status`: `clear` / `partial` / `blocked`
- `ownership_visibility_status`: `clear` / `partial` / `blocked`
- `cross_registry_status`: `available` / `missing` / `partial`
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
- `annuity_entries_present`
- `expiring_assets_present`
- `strategic_levels_present`
- `business_owner_coverage`
- `mandataire_coverage`
- `cross_reference_marques_status`
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
- les annuites sont trop lacunaires ;
- les owners / mandataires critiques sont trop incomplets pour prioriser.
```

Expected: `report` / `audit` can stop on missing critical registry quality instead of producing false confidence.

## Task 4: Stabilize The `report` Output Contract

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-brevets/SKILL.md`

- [ ] **Step 1: Replace the free-form report structure with the V2 9-block contract**

Refactor `report` output to exactly these blocks:

```md
1. `Portfolio Snapshot`
2. `Portfolio Readiness Gate`
3. `Annuity Priority`
4. `Expirations And Lifecycle`
5. `Ownership And Coverage`
6. `Cross-Registry Signals`
7. `Critical Gaps`
8. `Decision Routing`
9. `Human Validation`
```

Expected: report mode has a stable, closed structure centered on portfolio oversight.

- [ ] **Step 2: Close the report routing vocabulary**

Constrain `Decision Routing` to outcomes such as:

```md
- `prepare-annuity-escalation`
- `prepare-portfolio-cleanup`
- `prepare-succession-review`
- `prepare-cross-registry-review`
- `hold-for-registry-regularization`
```

Expected: the hub produces a bounded next-step recommendation set instead of open-ended advice.

- [ ] **Step 3: Reassert internal-registry legal guardrails in the output contract**

Make sure each generated report still requires:

```md
- registre interne != registre officiel
- annuite marquee payee != paiement confirme office
- verification partenaire annuites / office avant action
- `[a verifier]` and `[PROVISOIRE]` remain visible when applicable
```

Expected: V2 does not regress legal-risk guardrails while simplifying structure.

## Task 5: Reframe `audit` And Demote CRUD

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-brevets/SKILL.md`

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
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-brevets/SKILL.md`

- [ ] **Step 1: Keep the dashboard contract explicit**

Ensure the dashboard section still says, in substance:

```md
- reuse `renderDashboard`
- no local HTML divergence
- skill builds data, core renders dashboard
```

Expected: V2 preserves the dashboard standard rather than drifting into one-off rendering.

- [ ] **Step 2: Tighten explicit boundaries with neighboring skills**

Add / refine explicit boundaries against:

```md
- `preparation-depot-brevet`
- `strategie-extension-internationale`
- `analyse-refus-inpi`
- `anteriorite-invalidite`
- `tableau-contrefacon-brevet`
- `audit-pi-ma`
```

Expected: the portfolio hub does not absorb prosecution, litigation, or M&A workflows.

## Task 7: Add The V2 Routing Memo

**Files:**
- Create: `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-brevets/references/revue-portefeuille-brevets-routing-and-output.md`

- [ ] **Step 1: Create the new reference file**

Add `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-brevets/references/revue-portefeuille-brevets-routing-and-output.md` with:

```md
# Revue portefeuille brevets V2 - routing and output

## Primary modes

- `report`
- `audit`

## Secondary modes

- `add`
- `update`
- `remove`
- `list`

## Intake statuses for `report` / `audit`

- `portfolio_source_status`: `present` / `missing` / `partial`
- `annuity_visibility_status`: `clear` / `partial` / `blocked`
- `ownership_visibility_status`: `clear` / `partial` / `blocked`
- `cross_registry_status`: `available` / `missing` / `partial`
- `dashboard_mode`: `markdown-only` / `markdown-plus-dashboard` / `dashboard-required`
- `portfolio_readiness`: `ready` / `partial` / `blocked`

## Report blocks

1. `Portfolio Snapshot`
2. `Portfolio Readiness Gate`
3. `Annuity Priority`
4. `Expirations And Lifecycle`
5. `Ownership And Coverage`
6. `Cross-Registry Signals`
7. `Critical Gaps`
8. `Decision Routing`
9. `Human Validation`

## Routing

- `prepare-annuity-escalation`
- `prepare-portfolio-cleanup`
- `prepare-succession-review`
- `prepare-cross-registry-review`
- `hold-for-registry-regularization`
```

Expected: future maintenance has a compact V2 memo aligned with the hub contract.

- [ ] **Step 2: Reference the memo from the main skill**

If the skill already points to adjacent references, add a short pointer to:

```md
`references/revue-portefeuille-brevets-routing-and-output.md`
```

Expected: the main skill and the memo stay linked.

## Task 8: Realign README And Changelog

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Update the README positioning**

Adjust the `revue-portefeuille-brevets` entry so it says, in substance:

```md
- `revue-portefeuille-brevets` : hub portefeuille V2, centre sur `report`,
  `audit`, dashboard HTML et priorisation annuites / expirations / gaps,
  avec CRUD de registre conserve mais secondaire.
```

Expected: README reflects the portfolio-first posture.

- [ ] **Step 2: Add the changelog entry**

Add a top entry such as:

```md
- `revue-portefeuille-brevets` passe en V2 comme hub portefeuille brevets :
  `report` / `audit` dominent le contrat, `Portfolio Readiness Gate`,
  sortie stabilisee, dashboard standardise conserve, CRUD maintenu comme
  couche secondaire de registre.
```

Expected: the migration is documented consistently with the other V2 skill shifts.

## Task 9: Verify Scope And Quality

**Files:**
- Verify: modified files only

- [ ] **Step 1: Check formatting and whitespace**

Run:

```powershell
git diff --check
```

Expected: no diff-check errors.

- [ ] **Step 2: Run focused placeholder scan**

Run:

```powershell
rg -n "TODO|TBD|placeholder" plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-brevets plugins/hacienda-propriete-intellectuelle/README.md plugins/hacienda-propriete-intellectuelle/CHANGELOG.md docs/superpowers/specs/2026-05-19-hacienda-pi-revue-portefeuille-brevets-v2-design.md docs/superpowers/plans/2026-05-19-hacienda-pi-revue-portefeuille-brevets-v2.md
```

Expected: no placeholder matches in the changed scope.

- [ ] **Step 3: Run the full repository verification set**

Run:

```powershell
npm test
npm run typecheck
npm run build
npm run branding:check
git diff --check
```

Expected: all commands pass. If the known MCP stdio tests flake, rerun `npm run build`, then rerun the targeted tests and the full suite.

- [ ] **Step 4: Confirm only expected files changed**

Run:

```powershell
git status --short
git diff --name-only
```

Expected changed files:

```text
plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-brevets/SKILL.md
plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-brevets/references/revue-portefeuille-brevets-routing-and-output.md
plugins/hacienda-propriete-intellectuelle/README.md
plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
docs/superpowers/specs/2026-05-19-hacienda-pi-revue-portefeuille-brevets-v2-design.md
docs/superpowers/plans/2026-05-19-hacienda-pi-revue-portefeuille-brevets-v2.md
```

## Task 10: Commit, Merge, Push, Refresh Index

**Files:**
- Commit only expected scope

- [ ] **Step 1: Stage only the intended files**

Run:

```powershell
git add plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-brevets/SKILL.md
git add plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-brevets/references/revue-portefeuille-brevets-routing-and-output.md
git add plugins/hacienda-propriete-intellectuelle/README.md
git add plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
git add docs/superpowers/specs/2026-05-19-hacienda-pi-revue-portefeuille-brevets-v2-design.md
git add docs/superpowers/plans/2026-05-19-hacienda-pi-revue-portefeuille-brevets-v2.md
```

Expected: only the V2 portfolio-brevets files are staged.

- [ ] **Step 2: Commit in the worktree**

Run:

```powershell
git commit -m "feat: restructure patent portfolio review skill"
```

Expected: one focused commit on `codex/revue-portefeuille-brevets-v2`.

- [ ] **Step 3: Merge fast-forward into `main`**

Run from the main workspace:

```powershell
git checkout main
git merge --ff-only codex/revue-portefeuille-brevets-v2
```

Expected: fast-forward merge succeeds.

- [ ] **Step 4: Push and refresh GitNexus**

Run:

```powershell
git push origin main
npx gitnexus analyze
```

Expected: `main` equals `origin/main` and the index is refreshed.

- [ ] **Step 5: Restore hook-generated noise and confirm clean state**

Run:

```powershell
git status --short
```

Expected: clean repo. If hooks dirtied `AGENTS.md`, `CLAUDE.md`, or `dist/*`, restore them before finishing.

## Self-Review

- Spec coverage: this plan covers the hub-first positioning, intake statuses, readiness gate, report/audit outputs, CRUD demotion, dashboard reuse, README/changelog, and full verify/merge flow.
- Placeholder scan: no unresolved placeholders remain.
- Type consistency: mode names, gate names, and route labels match the approved design.
