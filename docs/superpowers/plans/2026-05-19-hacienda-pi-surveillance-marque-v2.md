# Hacienda PI surveillance-marque V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure `surveillance-marque` into a strict trademark monitoring skill with clear mode boundaries, a monitoring gate for `report`, and closed routing into the rest of the trademark stack.

**Architecture:** Keep the public modes (`report`, `add`, `update`, `remove`, `list`, `audit`) but tighten each one around a V2 role. Focus the migration on the report contract, watchlist hygiene, and explicit routing to `recherche-anteriorite-marque`, `analyse-opposition-marque`, `mise-en-demeure-pi`, and `tri-contrefacon`.

**Tech Stack:** Markdown skill files, plugin README/changelog, npm verification commands, Git worktree workflow.

---

## File Map

- Modify: `plugins/hacienda-propriete-intellectuelle/skills/surveillance-marque/SKILL.md`
- Create: `plugins/hacienda-propriete-intellectuelle/skills/surveillance-marque/references/surveillance-marque-routing-and-report.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
- Create: `docs/superpowers/specs/2026-05-19-hacienda-pi-surveillance-marque-v2-design.md`
- Create: `docs/superpowers/plans/2026-05-19-hacienda-pi-surveillance-marque-v2.md`

### Task 1: Create the isolated workspace

**Files:**
- Use existing worktree directory: `.worktrees/`

- [ ] **Step 1: Create the worktree and branch**

Run:

```bash
git worktree add ".worktrees/surveillance-marque-v2" -b "codex/surveillance-marque-v2"
```

Expected: new worktree created from current `main`.

- [ ] **Step 2: Verify the worktree baseline**

Run:

```bash
git status --short --untracked-files=no
git branch --show-current
```

Expected: clean worktree on `codex/surveillance-marque-v2`.

### Task 2: Rewrite `surveillance-marque` as a V2 monitoring skill

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/surveillance-marque/SKILL.md`

- [ ] **Step 1: Review the current sections and pin the V2 rewrite anchors**

Run:

```bash
Select-String -Path "plugins/hacienda-propriete-intellectuelle/skills/surveillance-marque/SKILL.md" -Pattern "Mode `--report|Mode `--add|Mode `--update|Mode `--remove|Mode `--list|Mode `--audit|Ce que ce skill NE fait PAS" -Context 0,2
```

Expected: locate the current mode blocks and boundary wording before editing.

- [ ] **Step 2: Add the V2 mode contract and monitoring gate**

Implement in `SKILL.md` a clear V2 section that states:

```md
## Contrat V2 des modes

- `report` : detection, deduplication, priorisation, routage
- `add` : ajout d'une entree watchlist
- `update` : mise a jour d'une entree existante
- `remove` : suppression avec garde-fous
- `list` : lecture synthese
- `audit` : hygiene structurelle de la watchlist

## Monitoring Gate

Le mode `report` ne doit pas produire un faux "aucun signal" si :
- la watchlist est vide ;
- aucune source utile n'est disponible ;
- la fenetre depasse le cadre supporte ;
- les entrees principales sont invalides ou trop generiques.
```

- [ ] **Step 3: Add the report input contract**

Implement a dedicated section with these fields:

```md
- `report_scope`: `fr-only`, `fr-eu`, `custom`
- `window_days`: 1-30
- `source_coverage`: `inpi-only`, `inpi-euipo`, `partial`, `none`
- `watchlist_status`: `ready`, `empty`, `stale`, `invalid`
- `deduplication_mode`: `watchlist-history`, `none`
```

Also make visible:
- `watch_count`
- `territories_covered`
- `publications_detected`
- `already_notified_count`
- `urgent_hits_count`
- `coverage_gaps`

- [ ] **Step 4: Normalize the `report` output into 9 blocks**

Replace the loose report structure with these exact headings:

```md
## 1. Monitoring Scope and Gate
## 2. Watchlist Coverage Snapshot
## 3. Urgent Opposition Window
## 4. Prepare-to-Review Window
## 5. Monitor-and-Hold Window
## 6. Agent-Managed or External Coverage
## 7. Data Quality and Coverage Gaps
## 8. Decision Routing
## 9. Human Validation
```

- [ ] **Step 5: Close the routing vocabulary**

Restrict `Decision Routing` to these values only:

```md
- `run-first-pass-confusion-review`
- `prepare-opposition-review`
- `keep-monitoring`
- `fix-watchlist-entry`
- `expand-source-coverage`
- `escalate-human-review`
- `insufficient-monitoring-record`
```

- [ ] **Step 6: Tighten boundaries with downstream skills**

Rewrite the boundary section so the skill says explicitly:
- `recherche-anteriorite-marque` handles confusion review after a signal
- `analyse-opposition-marque` handles opposition substance, not detection
- `mise-en-demeure-pi` is not triggered from mere publication alerts
- `tri-contrefacon` only applies when there is already exploited infringing use

- [ ] **Step 7: Clarify admin-mode expectations**

Refactor `add`, `update`, `remove`, `list`, and `audit` so each mode has:
- one clear role
- minimal required fields
- clear guardrails

At minimum:
- `add` must require usable watch terms, classes, territories
- `remove` must enforce stronger confirmation on high-priority entries
- `audit` must clearly separate data hygiene from legal review

- [ ] **Step 8: Review the skill diff**

Run:

```bash
git diff -- "plugins/hacienda-propriete-intellectuelle/skills/surveillance-marque/SKILL.md"
```

Expected: a structural rewrite limited to the monitoring skill.

### Task 3: Add the monitoring reference memo

**Files:**
- Create: `plugins/hacienda-propriete-intellectuelle/skills/surveillance-marque/references/surveillance-marque-routing-and-report.md`

- [ ] **Step 1: Create the compact V2 memo**

Add a memo with:

```md
# surveillance-marque V2 - routing and output

## Mode contract
## Report input contract
## Monitoring gate
## Report output blocks
## Closed routing values
## Admin-mode guardrails
```

- [ ] **Step 2: Verify memo vocabulary matches the main skill**

Run:

```bash
Select-String -Path "plugins/hacienda-propriete-intellectuelle/skills/surveillance-marque/SKILL.md","plugins/hacienda-propriete-intellectuelle/skills/surveillance-marque/references/surveillance-marque-routing-and-report.md" -Pattern "run-first-pass-confusion-review|prepare-opposition-review|keep-monitoring|fix-watchlist-entry|expand-source-coverage|insufficient-monitoring-record"
```

Expected: the same routing vocabulary appears in both files.

### Task 4: Update plugin documentation

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Update README positioning**

Adjust the README so `surveillance-marque` is described as:
- a strict monitoring and prioritization skill
- distinct from first-pass search
- distinct from opposition analysis
- distinct from enforcement

- [ ] **Step 2: Add changelog notes**

Add a concise V2 migration note covering:
- clarified modes
- monitoring gate
- normalized report contract
- bounded routing

- [ ] **Step 3: Review the docs diff**

Run:

```bash
git diff -- "plugins/hacienda-propriete-intellectuelle/README.md" "plugins/hacienda-propriete-intellectuelle/CHANGELOG.md"
```

Expected: only surveillance-skill positioning changes.

### Task 5: Add the spec and plan into the worktree

**Files:**
- Create in worktree:
  - `docs/superpowers/specs/2026-05-19-hacienda-pi-surveillance-marque-v2-design.md`
  - `docs/superpowers/plans/2026-05-19-hacienda-pi-surveillance-marque-v2.md`

- [ ] **Step 1: Copy the spec into the worktree**

Run:

```bash
mkdir -p "docs/superpowers/specs"
cp "../docs/superpowers/specs/2026-05-19-hacienda-pi-surveillance-marque-v2-design.md" "docs/superpowers/specs/2026-05-19-hacienda-pi-surveillance-marque-v2-design.md"
```

On Windows/PowerShell, use the repo-equivalent copy command.

- [ ] **Step 2: Copy the plan into the worktree**

Run:

```bash
mkdir -p "docs/superpowers/plans"
cp "../docs/superpowers/plans/2026-05-19-hacienda-pi-surveillance-marque-v2.md" "docs/superpowers/plans/2026-05-19-hacienda-pi-surveillance-marque-v2.md"
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

Expected: existing suite passes.

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

Expected: pass. If `dist/` files regenerate, review and restore them unless intentionally included.

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
- Stage only the surveillance V2 files

- [ ] **Step 1: Stage the intended files**

Run:

```bash
git add \
  "plugins/hacienda-propriete-intellectuelle/skills/surveillance-marque/SKILL.md" \
  "plugins/hacienda-propriete-intellectuelle/skills/surveillance-marque/references/surveillance-marque-routing-and-report.md" \
  "plugins/hacienda-propriete-intellectuelle/README.md" \
  "plugins/hacienda-propriete-intellectuelle/CHANGELOG.md" \
  "docs/superpowers/specs/2026-05-19-hacienda-pi-surveillance-marque-v2-design.md" \
  "docs/superpowers/plans/2026-05-19-hacienda-pi-surveillance-marque-v2.md"
```

- [ ] **Step 2: Commit**

Run:

```bash
git commit -m "feat: restructure trademark monitoring skill"
```

- [ ] **Step 3: Merge and push after review**

Run from the main workspace only after final review:

```bash
git merge --ff-only codex/surveillance-marque-v2
git push origin main
```

Expected: branch integrated cleanly, then remove the worktree and local branch.

---

## Self-Review

- Spec coverage: covered mode contract, report contract, monitoring gate, stack boundaries, output contract, admin-mode guardrails, docs, and verification.
- Placeholder scan: no `TODO`, `TBD`, or unresolved placeholders remain.
- Type consistency: routing values and field names are consistent with the spec.
