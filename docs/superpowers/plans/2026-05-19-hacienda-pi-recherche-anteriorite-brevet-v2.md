# Hacienda PI recherche-anteriorite-brevet V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure `recherche-anteriorite-brevet` into a strict patent first-pass search skill with a visible search-coverage gate, stable output blocks, and bounded routing to the rest of the patent stack.

**Architecture:** Keep the public skill name and the strong legal guardrail, but tighten the internal flow around a V2 input contract, an exclusions/search gate, and a stable routing/output contract. Limit the change set to the skill file, a compact reference memo, and plugin documentation.

**Tech Stack:** Markdown skill files, plugin README/changelog, npm verification commands, Git worktree workflow.

---

## File Map

- Modify: `plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-brevet/SKILL.md`
- Create: `plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-brevet/references/recherche-anteriorite-brevet-routing-and-output.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
- Create: `docs/superpowers/specs/2026-05-19-hacienda-pi-recherche-anteriorite-brevet-v2-design.md`
- Create: `docs/superpowers/plans/2026-05-19-hacienda-pi-recherche-anteriorite-brevet-v2.md`

### Task 1: Create the isolated workspace

**Files:**
- Use existing worktree directory: `.worktrees/`

- [ ] **Step 1: Create the worktree and branch**

Run:

```bash
git worktree add ".worktrees/recherche-anteriorite-brevet-v2" -b "codex/recherche-anteriorite-brevet-v2"
```

Expected: new worktree created from current `main`.

- [ ] **Step 2: Verify the worktree baseline**

Run:

```bash
git status --short --untracked-files=no
git branch --show-current
```

Expected: clean worktree on `codex/recherche-anteriorite-brevet-v2`.

### Task 2: Rewrite the patent first-pass skill

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-brevet/SKILL.md`

- [ ] **Step 1: Review the current anchors**

Run:

```bash
Select-String -Path "plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-brevet/SKILL.md" -Pattern "Intake|Knockout|Recherche multi-sources|nouveaute|activite inventive|Ce que ce skill NE fait PAS|Format de sortie" -Context 0,2
```

Expected: identify the current sections to be normalized into the V2 contract.

- [ ] **Step 2: Add the V2 input contract**

Implement a dedicated section with these fields:

```md
- `technical_domain`: `mechanical`, `chemical`, `pharma-biotech`, `software-cie`, `electronics-telecom`, `mixed`, `unknown`
- `filing_track`: `fr`, `ep`, `pct`, `mixed`, `unknown`
- `classification_status`: `known-cpc-cib`, `proposed`, `missing`
- `search_coverage_status`: `full-connected`, `partial-connected`, `no-connectors`
- `disclosure_urgency`: `pre-disclosure`, `disclosed`, `imminent-disclosure`, `unknown`
- `known_prior_art_status`: `provided`, `partial`, `none`
```

The skill must also surface:
- `invention_problem_statement`
- `invention_solution_statement`
- `priority_date_or_target`
- `territories_requested`
- `known_classifications`
- `known_prior_art_items`
- `available_sources`

- [ ] **Step 3: Add the `Search Coverage Gate`**

Implement a visible gate that checks:
- connectors present or not
- technical description usable or not
- classification plausible or not
- disclosure/priority timing known or not
- known prior art provided or not

The gate must use only these statuses:

```md
- `usable`
- `partial`
- `degraded`
- `blocked`
```

- [ ] **Step 4: Tighten the boundary section**

Rewrite the neighboring-skill boundaries so the file clearly states:
- `preparation-depot-brevet` is the drafting/deposit-prep lane
- `anteriorite-invalidite` is for attacking an existing patent
- `tableau-contrefacon-brevet` is for infringement comparison
- `logiciels-pi` comes first when the issue is still software regime rather than technical patentability

- [ ] **Step 5: Normalize the output contract to 9 blocks**

Implement these exact headings:

```md
## 1. Invention Snapshot
## 2. Exclusions Gate
## 3. Search Coverage and Source Gate
## 4. Nearest Prior Art
## 5. Novelty Signals
## 6. Inventive Step Signals
## 7. Disclosure and Timing Risk
## 8. Decision Routing
## 9. Human Validation
```

- [ ] **Step 6: Close the routing vocabulary**

Restrict `Decision Routing` to these values only:

```md
- `prepare-patent-drafting`
- `expand-search-coverage`
- `technical-clarification-needed`
- `software-regime-review-first`
- `invalidity-track-review`
- `hold-or-do-not-file`
- `insufficient-search-record`
```

- [ ] **Step 7: Re-read the legal guardrail and keep it stronger than the routing**

Confirm the file still states, prominently:
- not an opinion of patentability
- not an FTO
- no final conclusion on patentability

Run:

```bash
Select-String -Path "plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-brevet/SKILL.md" -Pattern "pas une opinion de brevetabilite|FTO|liberte d'exploitation"
```

- [ ] **Step 8: Review the skill diff**

Run:

```bash
git diff -- "plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-brevet/SKILL.md"
```

Expected: a structural rewrite limited to the patent first-pass skill.

### Task 3: Add the patent routing memo

**Files:**
- Create: `plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-brevet/references/recherche-anteriorite-brevet-routing-and-output.md`

- [ ] **Step 1: Create the compact V2 memo**

Add a memo with:

```md
# recherche-anteriorite-brevet V2 - routing and output

## Input contract
## Search coverage gate
## Output blocks
## Closed routing values
## Neighbor skill boundaries
```

- [ ] **Step 2: Verify routing vocabulary matches the main skill**

Run:

```bash
Select-String -Path "plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-brevet/SKILL.md","plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-brevet/references/recherche-anteriorite-brevet-routing-and-output.md" -Pattern "prepare-patent-drafting|expand-search-coverage|technical-clarification-needed|software-regime-review-first|invalidity-track-review|hold-or-do-not-file|insufficient-search-record"
```

Expected: the same routing vocabulary appears in both files.

### Task 4: Update plugin documentation

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Update README positioning**

Adjust the README so `recherche-anteriorite-brevet` is described as:
- a strict first-pass patent search
- distinct from patent drafting/deposit prep
- distinct from invalidity review
- distinct from patent infringement comparison

- [ ] **Step 2: Add changelog notes**

Add a concise migration note covering:
- V2 input contract
- search coverage gate
- normalized output blocks
- bounded routing

- [ ] **Step 3: Review the docs diff**

Run:

```bash
git diff -- "plugins/hacienda-propriete-intellectuelle/README.md" "plugins/hacienda-propriete-intellectuelle/CHANGELOG.md"
```

Expected: only patent-search positioning changes.

### Task 5: Add the spec and plan into the worktree

**Files:**
- Create in worktree:
  - `docs/superpowers/specs/2026-05-19-hacienda-pi-recherche-anteriorite-brevet-v2-design.md`
  - `docs/superpowers/plans/2026-05-19-hacienda-pi-recherche-anteriorite-brevet-v2.md`

- [ ] **Step 1: Copy the spec into the worktree**

Run:

```bash
mkdir -p "docs/superpowers/specs"
cp "../docs/superpowers/specs/2026-05-19-hacienda-pi-recherche-anteriorite-brevet-v2-design.md" "docs/superpowers/specs/2026-05-19-hacienda-pi-recherche-anteriorite-brevet-v2-design.md"
```

Use the PowerShell equivalent in this repo context if needed.

- [ ] **Step 2: Copy the plan into the worktree**

Run:

```bash
mkdir -p "docs/superpowers/plans"
cp "../docs/superpowers/plans/2026-05-19-hacienda-pi-recherche-anteriorite-brevet-v2.md" "docs/superpowers/plans/2026-05-19-hacienda-pi-recherche-anteriorite-brevet-v2.md"
```

### Task 6: Verify the worktree

**Files:**
- Verify the whole worktree

- [ ] **Step 1: Install dependencies if the worktree lacks `node_modules`**

Run:

```bash
npm test
```

If the failure is `vitest` not found, run:

```bash
npm install
```

Then continue.

- [ ] **Step 2: Run the test suite**

Run:

```bash
npm test
```

Expected: existing suite passes. If `hacienda-pi-cowork-structure.test.ts` shows the known transient MCP stdio failure, rerun that targeted test once, then rerun the full suite.

- [ ] **Step 3: Run typecheck**

Run:

```bash
npm run typecheck
```

Expected: pass.

- [ ] **Step 4: Run build**

Run:

```bash
npm run build
```

Expected: pass. If generated `dist/` files change only because of build, restore them unless intentionally included.

- [ ] **Step 5: Run branding check**

Run:

```bash
npm run branding:check
```

Expected: pass.

- [ ] **Step 6: Run diff check**

Run:

```bash
git diff --check
```

Expected: no diff-format failures beyond tolerated CRLF warnings.

- [ ] **Step 7: Clean non-scope build/install noise**

If `package-lock.json` or generated `dist/` files changed only because of install/build, restore them:

```bash
git checkout -- package-lock.json "plugins/hacienda-propriete-intellectuelle/mcp-server/dist/index.js" "plugins/hacienda-propriete-intellectuelle/mcp-server/dist/version.js" "plugins/hacienda-sources-officielles/mcp-server/dist/index.js"
```

- [ ] **Step 8: Confirm final scoped change set**

Run:

```bash
git status --short
git diff --stat
```

Expected: only the skill, reference memo, README, changelog, spec, and plan remain.

### Task 7: Commit and integrate

**Files:**
- Stage only the patent-search V2 files

- [ ] **Step 1: Stage the intended files**

Run:

```bash
git add \
  "plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-brevet/SKILL.md" \
  "plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-brevet/references/recherche-anteriorite-brevet-routing-and-output.md" \
  "plugins/hacienda-propriete-intellectuelle/README.md" \
  "plugins/hacienda-propriete-intellectuelle/CHANGELOG.md" \
  "docs/superpowers/specs/2026-05-19-hacienda-pi-recherche-anteriorite-brevet-v2-design.md" \
  "docs/superpowers/plans/2026-05-19-hacienda-pi-recherche-anteriorite-brevet-v2.md"
```

- [ ] **Step 2: Commit**

Run:

```bash
git commit -m "feat: restructure patent first-pass search skill"
```

- [ ] **Step 3: Merge and push after review**

Run from the main workspace only after final review:

```bash
git merge --ff-only codex/recherche-anteriorite-brevet-v2
git push origin main
```

Expected: branch integrated cleanly, then remove the worktree and local branch.

---

## Self-Review

- Spec coverage: covered input contract, search coverage gate, output contract, neighboring patent-skill boundaries, docs, and verification.
- Placeholder scan: no `TODO`, `TBD`, or unresolved placeholders remain.
- Type consistency: routing values and field names are consistent with the spec.
