# Hacienda PI depot-marque-fr V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure `depot-marque-fr` into a strict filing-preparation skill with explicit `FR` / `EU` / `Madrid` lanes, a readiness gate, and bounded routing to the rest of the trademark stack.

**Architecture:** Keep the public skill name and the existing legal posture, but tighten the internal flow around a V2 input contract, a readiness gate, and a stable output contract. Limit the change set to the skill file, its reference memo, and plugin documentation so the migration stays structurally focused.

**Tech Stack:** Markdown skill files, plugin README/changelog, npm test/typecheck/build/branding checks, Git worktree workflow.

---

## File Map

- Modify: `plugins/hacienda-propriete-intellectuelle/skills/depot-marque-fr/SKILL.md`
- Create: `plugins/hacienda-propriete-intellectuelle/skills/depot-marque-fr/references/depot-marque-fr-routing-and-output.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
- Create: `docs/superpowers/specs/2026-05-19-hacienda-pi-depot-marque-fr-v2-design.md`
- Create: `docs/superpowers/plans/2026-05-19-hacienda-pi-depot-marque-fr-v2.md`

### Task 1: Set up isolated workspace

**Files:**
- Use existing worktree directory: `.worktrees/`

- [ ] **Step 1: Create a dedicated worktree and branch**

Run:

```bash
git worktree add ".worktrees/depot-marque-fr-v2" -b "codex/depot-marque-fr-v2"
```

Expected: new worktree created from current `main`.

- [ ] **Step 2: Verify clean baseline in the worktree**

Run:

```bash
git status --short --untracked-files=no
```

Expected: no tracked changes before implementation.

### Task 2: Rewrite the skill contract in `SKILL.md`

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/depot-marque-fr/SKILL.md`

- [ ] **Step 1: Review the current structure and identify V2 insertion points**

Check for sections covering:
- guardrail
- intake
- antériorité prerequisite
- motifs absolus
- libellés
- outputs

Run:

```bash
Select-String -Path "plugins/hacienda-propriete-intellectuelle/skills/depot-marque-fr/SKILL.md" -Pattern "Intake|Recherche antériorité|motifs absolus|libellés|Sortie" -Context 0,2
```

Expected: concrete anchors for the V2 rewrite.

- [ ] **Step 2: Add the V2 input contract and filing readiness gate**

Implement in `SKILL.md`:

```md
## Contrat d'entree V2

- `filing_lane`: `fr-inpi`, `eu-eutm`, `madrid-ompi`, `undecided`
- `search_status`: `not-run`, `partial`, `first-pass-complete`, `review-required`
- `sign_format`: `word`, `figurative`, `composite`, `sound`, `position`, `multimedia`, `other`
- `goods_services_maturity`: `draft`, `rough`, `structured`, `reviewed`
- `applicant_readiness`: `complete`, `partial`, `missing`
- `priority_status`: `none`, `claimed-within-window`, `claimed-out-of-window`, `unclear`

## Filing Readiness Gate

Avant tout brouillon de depot, verifier explicitement :
- recherche d'anteriorite exploitable ;
- produits/services suffisamment precis ;
- lane FR / EU / Madrid identifiee ;
- identite deposant exploitable ;
- priorite plausible et documentee ;
- pieces minimales presentes pour les signes non verbaux.
```

- [ ] **Step 3: Rewrite the intake so it serves filing preparation rather than generic discussion**

The intake must collect:
- sign and sign format
- business goal
- goods/services description
- classes candidates
- territory lane
- applicant identity
- representative status
- priority claim
- search status

The skill must not proceed as if filing-ready when `search_status = not-run`.

- [ ] **Step 4: Formalize the three filing lanes**

Implement dedicated subsections in `SKILL.md`:

```md
## Lane `fr-inpi`
## Lane `eu-eutm`
## Lane `madrid-ompi`
```

Each lane must define:
- when it applies
- mandatory checks
- route blockers
- what a usable draft package must contain

- [ ] **Step 5: Tighten boundaries with adjacent trademark skills**

Add explicit routing rules to:
- `recherche-anteriorite-marque`
- `surveillance-marque`
- `analyse-opposition-marque`
- `clearance-marque`

The wording must prevent silent overlap.

- [ ] **Step 6: Normalize the output contract into 9 blocks**

Implement these exact headings:

```md
## 1. Filing Lane and Readiness Gate
## 2. Sign Snapshot
## 3. Absolute Grounds and Registrability Red Flags
## 4. Goods / Services and Nice Map
## 5. Applicant and Mandate Readiness
## 6. Priority and Territory Strategy
## 7. Filing Package Draft
## 8. Next Step Routing
## 9. Human Validation
```

- [ ] **Step 7: Run a focused diff review on the skill**

Run:

```bash
git diff -- "plugins/hacienda-propriete-intellectuelle/skills/depot-marque-fr/SKILL.md"
```

Expected: only `depot-marque-fr` structure changes, no unrelated edits.

### Task 3: Add the routing memo

**Files:**
- Create: `plugins/hacienda-propriete-intellectuelle/skills/depot-marque-fr/references/depot-marque-fr-routing-and-output.md`

- [ ] **Step 1: Create a compact V2 reference memo**

Add a focused memo covering:
- input contract
- readiness gate
- lanes
- output blocks
- routing values

Suggested structure:

```md
# depot-marque-fr V2 - routing and output

## Input contract
## Filing readiness gate
## Filing lanes
## Output contract
## Closed routing values
```

- [ ] **Step 2: Verify the memo matches the main skill**

Run:

```bash
Select-String -Path "plugins/hacienda-propriete-intellectuelle/skills/depot-marque-fr/SKILL.md","plugins/hacienda-propriete-intellectuelle/skills/depot-marque-fr/references/depot-marque-fr-routing-and-output.md" -Pattern "run-first-pass-search|prepare-fr-filing|prepare-eu-filing|prepare-madrid-filing|insufficient-record"
```

Expected: the same routing vocabulary appears in both files.

### Task 4: Update plugin documentation

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Update README positioning**

Adjust the plugin README so `depot-marque-fr` is described as:
- strict filing preparation
- distinct from first-pass search
- distinct from opposition
- distinct from surveillance
- structured by `FR` / `EU` / `Madrid` lanes

- [ ] **Step 2: Add changelog entry**

Add a concise changelog note for the V2 migration of `depot-marque-fr`, including:
- V2 input contract
- readiness gate
- filing lanes
- stable routing/output contract

- [ ] **Step 3: Review documentation diff**

Run:

```bash
git diff -- "plugins/hacienda-propriete-intellectuelle/README.md" "plugins/hacienda-propriete-intellectuelle/CHANGELOG.md"
```

Expected: only the filing-skill positioning changes.

### Task 5: Verify the worktree

**Files:**
- Verify entire worktree

- [ ] **Step 1: Run tests**

Run:

```bash
npm test
```

Expected: existing suite passes in the worktree.

- [ ] **Step 2: Run typecheck**

Run:

```bash
npm run typecheck
```

Expected: pass.

- [ ] **Step 3: Run build**

Run:

```bash
npm run build
```

Expected: pass. If `dist/` files regenerate, review and restore them unless they are intentionally part of the change.

- [ ] **Step 4: Run branding check**

Run:

```bash
npm run branding:check
```

Expected: pass.

- [ ] **Step 5: Run diff check**

Run:

```bash
git diff --check
```

Expected: no diff formatting errors beyond tolerated CRLF warnings.

- [ ] **Step 6: Confirm scoped change set**

Run:

```bash
git status --short
git diff --stat
```

Expected: only the skill, reference memo, README, changelog, spec, and plan are changed.

### Task 6: Commit and integrate

**Files:**
- Stage only the intended filing-skill V2 files

- [ ] **Step 1: Stage the scoped files**

Run:

```bash
git add \
  "plugins/hacienda-propriete-intellectuelle/skills/depot-marque-fr/SKILL.md" \
  "plugins/hacienda-propriete-intellectuelle/skills/depot-marque-fr/references/depot-marque-fr-routing-and-output.md" \
  "plugins/hacienda-propriete-intellectuelle/README.md" \
  "plugins/hacienda-propriete-intellectuelle/CHANGELOG.md" \
  "docs/superpowers/specs/2026-05-19-hacienda-pi-depot-marque-fr-v2-design.md" \
  "docs/superpowers/plans/2026-05-19-hacienda-pi-depot-marque-fr-v2.md"
```

- [ ] **Step 2: Commit**

Run:

```bash
git commit -m "feat: restructure trademark filing preparation skill"
```

- [ ] **Step 3: Merge and push after review**

Run from the main workspace only after final review:

```bash
git merge --ff-only codex/depot-marque-fr-v2
git push origin main
```

Expected: branch integrated cleanly, then clean up worktree and local branch.

---

## Self-Review

- Spec coverage: covered input contract, readiness gate, filing lanes, stack boundaries, output contract, docs, and verification.
- Placeholder scan: no `TODO`, `TBD`, or unresolved placeholders left in the plan.
- Type consistency: routing values and field names are consistent with the spec.
