# Recherche Anteriorite DM V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework `recherche-anteriorite-dm` into a V2 skill for strict first-pass D&M availability review with a closed intake contract, a `Prior Art Readiness Gate`, a stable 9-block output, and a bounded reverse-nullity signal.

**Architecture:** Keep one public skill file, but reorganize it around a strict filing-clearance core and a secondary `reverse-nullity-signal` branch. Add one compact routing/output memo, then align the plugin README and changelog so the boundaries with `depot-dessin-modele` and `contrefacon-dessin-modele` are explicit.

**Tech Stack:** Markdown skill files, plugin README/changelog, Hacienda PI skill conventions, npm verification commands, GitNexus post-merge analyze.

---

## File Map

- Modify: `C:/Users/NMarchitecte/hacienda-juridique/.worktrees/recherche-anteriorite-dm-v2/plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-dm/SKILL.md`
  - Replace the V1 mixed availability/nullity structure with the V2 intake, gate, bounded reverse-nullity signal, and stable routing.
- Create: `C:/Users/NMarchitecte/hacienda-juridique/.worktrees/recherche-anteriorite-dm-v2/plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-dm/references/recherche-anteriorite-dm-routing-and-output.md`
  - Short memo for intake, gate, search coverage, risk matrix, routing, and output.
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/.worktrees/recherche-anteriorite-dm-v2/plugins/hacienda-propriete-intellectuelle/README.md`
  - Update public skill inventory and current-version note.
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/.worktrees/recherche-anteriorite-dm-v2/plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
  - Add the V2 migration entry.
- Reference: `C:/Users/NMarchitecte/hacienda-juridique/.worktrees/recherche-anteriorite-dm-v2/docs/superpowers/specs/2026-05-20-hacienda-pi-recherche-anteriorite-dm-v2-design.md`
  - Keep implementation aligned with the approved design.

### Task 1: Create the isolated worktree

**Files:**
- Create: `C:/Users/NMarchitecte/hacienda-juridique/.worktrees/recherche-anteriorite-dm-v2`

- [ ] **Step 1: Create the branch and worktree**

Run:

```powershell
git worktree add .worktrees/recherche-anteriorite-dm-v2 -b codex/recherche-anteriorite-dm-v2 main
```

Expected: a new worktree checked out on `codex/recherche-anteriorite-dm-v2`.

- [ ] **Step 2: Install dependencies if the worktree is fresh**

Run:

```powershell
npm install
```

Expected: dependencies are present and any lockfile drift can be restored before commit.

- [ ] **Step 3: Prime the baseline build**

Run:

```powershell
npm run build
```

Expected: generated server artifacts exist before later verification.

- [ ] **Step 4: Check initial status**

Run:

```powershell
git status --short
```

Expected: clean status or only known generated baseline noise to ignore before edits.

### Task 2: Restructure the skill header and role boundary

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/.worktrees/recherche-anteriorite-dm-v2/plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-dm/SKILL.md`

- [ ] **Step 1: Convert frontmatter to V2 metadata**

Update frontmatter so it includes:

```yaml
version: "2.0.0"
argument-hint: "[filing-clearance|reverse-nullity-signal]"
```

Keep `name`, `authors`, and D&M tags aligned with Hacienda naming.

Expected: the skill advertises itself as a V2 prior-art contract.

- [ ] **Step 2: Rewrite the top role block**

Replace the current V1 intro with short V2 framing that says the skill:

```markdown
- performs first-pass D&M availability review before filing
- does not guarantee validity
- does not replace filing preparation
- does not replace infringement/contentious analysis
- does not provide exhaustive certainty on `DMCNE` or informal disclosures
```

Expected: the first screen makes the V2 boundary obvious.

- [ ] **Step 3: Preserve the strict first-pass identity**

Add explicit positioning that:

```markdown
- `filing-clearance` is the core mode
- `reverse-nullity-signal` is only a bounded secondary route
```

Expected: the skill cannot drift into a general D&M nullity memo.

- [ ] **Step 4: Review the header diff**

Run:

```powershell
git diff -- plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-dm/SKILL.md
```

Expected: the V2 role boundary is visible before intake work starts.

### Task 3: Add the closed intake contract and `Prior Art Readiness Gate`

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/.worktrees/recherche-anteriorite-dm-v2/plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-dm/SKILL.md`

- [ ] **Step 1: Insert the closed V2 intake fields**

Add exactly these intake fields:

```markdown
- `research_mode`: `filing-clearance` | `reverse-nullity-signal`
- `territory_scope`: `fr` | `eu` | `international` | `mixed`
- `design_visibility_status`: `new` | `possibly-disclosed` | `already-disclosed` | `uncertain`
- `locarno_status`: `clear` | `mixed` | `uncertain`
- `search_coverage_target`: `registers-minimum` | `registers-plus-open-web` | `enhanced-sector-scan`
- `evidence_posture`: `strong` | `mixed` | `weak` | `blocked`
```

Expected: intake becomes a closed contract instead of a loose checklist.

- [ ] **Step 2: Add the minimum fact set**

Insert the required facts:

```markdown
- description du design vise
- visuels ou equivalent exploitable
- produit ou secteur
- classe Locarno ou hypothese raisonnable
- territoire vise
- date de depot, priorite ou reference temporelle pertinente
- contexte `filing-clearance` ou `reverse-nullity-signal`
```

Expected: the skill can refuse weak dossiers without inventing missing facts.

- [ ] **Step 3: Add the `Prior Art Readiness Gate`**

Create a gate with:

```markdown
- `ready`
- `partial`
- `blocked`
```

And explicit block conditions for:

```markdown
- design trop mal defini
- absence de visuels ou de description exploitable
- reference temporelle introuvable
- impossibilite de determiner au moins une hypothese Locarno
- demande trop speculative pour produire une synthese honnete
```

Expected: the skill can stop cleanly before outputting a false-confidence search report.

- [ ] **Step 4: Preserve provisional markers**

State clearly that `partial` outputs must keep:

```markdown
- `[PROVISOIRE]`
- `[a verifier]`
- `[A COMPLETER]`
```

Expected: provisional dossiers stay visibly incomplete.

### Task 4: Rebuild the search logic and bounded reverse-nullity branch

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/.worktrees/recherche-anteriorite-dm-v2/plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-dm/SKILL.md`

- [ ] **Step 1: Rewrite the source coverage section**

Restructure the source logic around:

```markdown
- registres minimum: INPI, DesignView, Hague Express
- open web complements: catalogues, sites, marketplaces, social media, reverse image search
- sector scan only when justified by product category
```

Expected: source coverage is explicit and ordered by confidence.

- [ ] **Step 2: Reframe the findings section**

Replace the generic V1 findings table with a V2 prior-art finding template that captures:

```markdown
- source
- date
- class / sector
- visual proximity
- novelty risk
- individual character risk
- notes on creator freedom
```

Expected: findings are reusable and comparable across searches.

- [ ] **Step 3: Add the bounded `reverse-nullity-signal` branch**

Add a short branch that says, when `research_mode = reverse-nullity-signal`, the skill:

```markdown
- only signals plausible destructive prior art
- identifies what proof must be secured
- does not run full contentious analysis
- routes to `contrefacon-dessin-modele` if the matter becomes adversarial
```

Expected: reverse analysis exists, but cannot take over the skill.

- [ ] **Step 4: Recheck the skill diff**

Run:

```powershell
git diff -- plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-dm/SKILL.md
```

Expected: the skill now reads as V2 availability review, not mixed memo.

### Task 5: Stabilize the 9-block output and decision routing

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/.worktrees/recherche-anteriorite-dm-v2/plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-dm/SKILL.md`

- [ ] **Step 1: Replace the V1 report format with the 9-block V2 output**

Use exactly these blocks:

```markdown
1. `Case Snapshot`
2. `Prior Art Readiness Gate`
3. `Search Scope And Sources`
4. `Closest Prior Art Findings`
5. `Novelty Risk`
6. `Individual Character Risk`
7. `Coverage Limits And Unknowns`
8. `Decision Routing`
9. `Human Validation`
```

Expected: output contract matches the approved spec.

- [ ] **Step 2: Add the closed routing set**

Bound `Decision Routing` to:

```markdown
- `prepare-filing`
- `prepare-filing-with-caution`
- `hold-for-design-adjustment`
- `hold-for-expanded-search`
- `signal-reverse-nullity-posture`
- `route-to-design-infringement-analysis`
- `hold-insufficient-basis`
```

Expected: downstream paths are explicit and finite.

- [ ] **Step 3: Clarify mandatory limits**

State that every output must mention:

```markdown
- non-exhaustive nature of D&M search
- `DMCNE` uncertainty
- informal disclosures
- visual-search and classification limits
```

Expected: no output can be mistaken for a guarantee of validity.

- [ ] **Step 4: Review the final skill structure**

Run:

```powershell
rg -n "Prior Art Readiness Gate|Decision Routing|reverse-nullity-signal|DMCNE" plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-dm/SKILL.md
```

Expected: all V2 structural anchors are present.

### Task 6: Add the routing/output memo

**Files:**
- Create: `C:/Users/NMarchitecte/hacienda-juridique/.worktrees/recherche-anteriorite-dm-v2/plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-dm/references/recherche-anteriorite-dm-routing-and-output.md`

- [ ] **Step 1: Create the memo skeleton**

Add sections for:

```markdown
- role and non-goals
- intake contract
- gate
- search coverage
- prior-art risk matrix
- decision routing
- stable output
```

Expected: the memo mirrors the skill in compact form.

- [ ] **Step 2: Encode the risk matrix**

Include a short matrix covering:

```markdown
- no meaningful prior art found
- close but non-destructive prior art
- destructive novelty prior art
- weak/partial search coverage
- reverse-nullity signal plausible
```

Expected: workers can classify outcomes consistently.

- [ ] **Step 3: Add routing reminders**

State explicitly:

```markdown
- filing prep -> `depot-dessin-modele`
- adversarial D&M analysis -> `contrefacon-dessin-modele`
- insufficient basis -> hold
```

Expected: memo reinforces the intended boundaries.

### Task 7: Align public plugin documentation

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/.worktrees/recherche-anteriorite-dm-v2/plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/.worktrees/recherche-anteriorite-dm-v2/plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Update the README skill description**

Adjust the `recherche-anteriorite-dm` entry so it says the skill now covers:

```markdown
- first-pass D&M availability review
- novelty and individual-character risk
- bounded reverse-nullity signal
- explicit routing to filing or infringement analysis
```

Expected: README matches the real contract.

- [ ] **Step 2: Add the changelog entry**

Record the V2 migration with notes for:

```markdown
- closed intake
- `Prior Art Readiness Gate`
- stable 9-block output
- bounded reverse-nullity branch
- clarified boundaries with `depot-dessin-modele` and `contrefacon-dessin-modele`
```

Expected: changelog reflects the migration scope.

- [ ] **Step 3: Review docs diff**

Run:

```powershell
git diff -- plugins/hacienda-propriete-intellectuelle/README.md plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
```

Expected: documentation changes are limited to the D&M prior-art migration.

### Task 8: Verify the worktree before integration

**Files:**
- Test: `C:/Users/NMarchitecte/hacienda-juridique/.worktrees/recherche-anteriorite-dm-v2/plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-dm/SKILL.md`
- Test: `C:/Users/NMarchitecte/hacienda-juridique/.worktrees/recherche-anteriorite-dm-v2/plugins/hacienda-propriete-intellectuelle/README.md`
- Test: `C:/Users/NMarchitecte/hacienda-juridique/.worktrees/recherche-anteriorite-dm-v2/plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Check formatting drift**

Run:

```powershell
git diff --check
```

Expected: no whitespace or merge-marker issues.

- [ ] **Step 2: Run tests**

Run:

```powershell
npm test
```

Expected: passing test suite; PISTE `401/403/503` logs may appear as known simulated cases.

- [ ] **Step 3: Run typecheck**

Run:

```powershell
npm run typecheck
```

Expected: no type errors.

- [ ] **Step 4: Run build**

Run:

```powershell
npm run build
```

Expected: build succeeds; generated `dist/` noise can be discarded before merge if unchanged in scope.

- [ ] **Step 5: Run branding check**

Run:

```powershell
npm run branding:check
```

Expected: branding check passes with Hacienda-only references.

### Task 9: Integrate, verify scope, and publish

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/.worktrees/recherche-anteriorite-dm-v2/docs/superpowers/specs/2026-05-20-hacienda-pi-recherche-anteriorite-dm-v2-design.md`
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/.worktrees/recherche-anteriorite-dm-v2/docs/superpowers/plans/2026-05-20-hacienda-pi-recherche-anteriorite-dm-v2.md`

- [ ] **Step 1: Check GitNexus affected scope before commit**

Run:

```powershell
npx gitnexus detect-changes
```

Expected: only the intended skill, memo, README, changelog, spec, and plan are in scope.

- [ ] **Step 2: Commit in the worktree**

Run:

```powershell
git add plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-dm/SKILL.md plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-dm/references/recherche-anteriorite-dm-routing-and-output.md plugins/hacienda-propriete-intellectuelle/README.md plugins/hacienda-propriete-intellectuelle/CHANGELOG.md docs/superpowers/specs/2026-05-20-hacienda-pi-recherche-anteriorite-dm-v2-design.md docs/superpowers/plans/2026-05-20-hacienda-pi-recherche-anteriorite-dm-v2.md
git commit -m "feat: restructure design prior art search skill"
```

Expected: one focused commit on the worktree branch.

- [ ] **Step 3: Merge to `main` and push**

Run:

```powershell
git checkout main
git merge --ff-only codex/recherche-anteriorite-dm-v2
git push origin main
```

Expected: fast-forward merge and clean push.

- [ ] **Step 4: Refresh GitNexus index**

Run:

```powershell
npx gitnexus analyze
```

Expected: repository index is fresh after merge.

- [ ] **Step 5: Clean branch/worktree**

Run:

```powershell
git branch -d codex/recherche-anteriorite-dm-v2
git worktree remove .worktrees/recherche-anteriorite-dm-v2
```

Expected: no leftover isolated branch or worktree after successful merge.

## Self-Review

- Spec coverage:
  - V2 first-pass positioning -> Tasks 2, 4, 5
  - closed intake and gate -> Task 3
  - bounded reverse-nullity branch -> Task 4
  - stable 9-block output and closed routing -> Task 5
  - routing/output memo -> Task 6
  - README/changelog alignment -> Task 7
  - verification and integration -> Tasks 8 and 9
- Placeholder scan:
  - no `TODO`, `TBD`, or deferred implementation markers kept in plan steps
- Type consistency:
  - `research_mode`, `Prior Art Readiness Gate`, `reverse-nullity-signal`, and routing labels are used consistently across tasks

