# Licence Droit D'Auteur V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework `licence-droit-auteur` into a V2 skill for strict copyright-license preparation with closed tracks, a readiness gate, stable output blocks, and explicit routing to adjacent PI skills.

**Architecture:** Keep a single public skill file, but reorganize it around a closed intake contract, a `License Readiness Gate`, closed `license_track` lanes, and a fixed output contract. Add one routing/output memo file, then align plugin docs so the README and changelog describe the real V2 boundary.

**Tech Stack:** Markdown skill files, plugin README/changelog, existing Hacienda PI skill conventions, npm test/typecheck/build/branding verification, GitNexus post-merge analyze.

---

## File Map

- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/licence-droit-auteur/SKILL.md`
  - Convert V1 mixed skill into V2 structure with closed tracks and routing.
- Create: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/licence-droit-auteur/references/licence-droit-auteur-routing-and-output.md`
  - Compact memo for intake, gate, lane boundaries, and output contract.
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/README.md`
  - Update user-facing plugin inventory and current version note.
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
  - Add migration entry for the V2 contract.
- Reference: `C:/Users/NMarchitecte/hacienda-juridique/docs/superpowers/specs/2026-05-19-hacienda-pi-licence-droit-auteur-v2-design.md`
  - Keep implementation aligned with the approved design.

### Task 1: Prepare isolated branch and baseline

**Files:**
- Create: `C:/Users/NMarchitecte/hacienda-juridique/.worktrees/licence-droit-auteur-v2` (git worktree)

- [ ] **Step 1: Create the worktree and branch**

Run:

```powershell
git worktree add .worktrees/licence-droit-auteur-v2 -b codex/licence-droit-auteur-v2 main
```

Expected: a new worktree checked out on `codex/licence-droit-auteur-v2`.

- [ ] **Step 2: Install dependencies in the new worktree if needed**

Run:

```powershell
npm install
```

Expected: dependencies installed without removing lockfile changes you did not intend.

- [ ] **Step 3: Build the baseline once**

Run:

```powershell
npm run build
```

Expected: build completes so MCP/server generated artifacts exist before testing.

- [ ] **Step 4: Commit nothing yet**

Run:

```powershell
git status --short
```

Expected: either clean or only known generated baseline noise to ignore before feature work.

### Task 2: Restructure the main skill contract

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/licence-droit-auteur/SKILL.md`

- [ ] **Step 1: Write the failing structural assertions as a checklist**

Use this checklist while editing:

```text
- version must become 2.0.0
- intro must define strict role and explicit non-goals
- intake must expose closed license_track values
- gate must exist with ready/partial/blocked
- output must be stabilized in 9 blocks
- routing must be closed and explicit
```

Expected: all six conditions are currently false or only partially true in V1.

- [ ] **Step 2: Replace the V1 positioning with the V2 boundary**

Update the top sections of `SKILL.md` so they explicitly say the skill:

```markdown
- prepares a copyright license draft
- does not qualify originality when uncertain
- does not draft an assignment
- does not replace software, database, or broader PI contract analysis
- always produces a draft for human validation
```

Expected: the first screen of the skill makes the boundary obvious before any examples or lane detail.

- [ ] **Step 3: Add the closed V2 intake contract**

Insert a dedicated intake section containing exactly these closed fields:

```markdown
- `license_track`: `exclusive` | `non-exclusive` | `creative-commons` | `software-eula` | `saas-user-content`
- `work_status`: `qualified` | `partially-qualified` | `uncertain`
- `title_status`: `clear` | `mixed` | `uncertain`
- `counterparty_profile`: `publisher` | `producer` | `platform` | `customer` | `internal-group` | `public` | `mixed`
- `economic_model`: `royalty` | `flat-fee` | `free-open` | `subscription` | `mixed`
- `reuse_scope`: `narrow` | `standard` | `broad` | `global-platform`
- `data_personal_status`: `yes` | `no` | `mixed` | `unknown`
```

Also add the minimum factual set:

```markdown
- oeuvre ou corpus vise
- identite du concedant
- identite du licencie ou du public cible
- perimetre des droits accordes
- duree
- territoire
- modele economique minimal
- sous-licence oui/non/incertain
```

Expected: intake becomes a closed contract instead of a loose questionnaire.

- [ ] **Step 4: Add the `License Readiness Gate`**

Add a gate section with:

```markdown
- `ready`
- `partial`
- `blocked`
```

And block conditions for:

```markdown
- oeuvre trop incertaine
- titularite trop incertaine
- demande ressemblant a une cession
- sujet dominamment logiciel ou base de donnees sans analyse amont
- contrat plus large qu'une simple licence
```

Expected: the skill can now stop cleanly instead of over-answering weak dossiers.

- [ ] **Step 5: Run a focused diff review**

Run:

```powershell
git diff -- plugins/hacienda-propriete-intellectuelle/skills/licence-droit-auteur/SKILL.md
```

Expected: the skill header, role, intake, and gate now reflect the V2 contract before lane detail is added.

### Task 3: Rebuild the lane structure and closed routing

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/licence-droit-auteur/SKILL.md`

- [ ] **Step 1: Reorganize the lane section around closed `license_track` values**

Restructure lane headings so they map one-to-one to:

```markdown
### `exclusive`
### `non-exclusive`
### `creative-commons`
### `software-eula`
### `saas-user-content`
```

Expected: no extra implicit track remains.

- [ ] **Step 2: Make the hierarchy explicit**

Add short framing text stating:

```markdown
- `exclusive`, `non-exclusive`, `software-eula`, `saas-user-content` are core drafting lanes
- `creative-commons` is a bounded open-content release lane
```

Expected: open-content stays available without dominating the skill.

- [ ] **Step 3: Encode lane-specific drafting points**

For each lane, ensure the skill lists the exact drafting focus:

```markdown
exclusive -> exclusivite, duree, territoire, minimum d'exploitation, audit, reversion, requalification risk
non-exclusive -> scope, supports, audience, duration, territory, restrictions, attribution, sublicensing
creative-commons -> variant, attribution, SA/ND/NC effects, irrevocability, distribution risks, compatibility
software-eula -> authorized use, seats/users, access, updates, support, standard prohibitions, reversibility if needed
saas-user-content -> technical rights, hosting/display/adaptation, moderation/removal, post-termination duration, personal data, sublicensing, CGU/DPA posture
```

Expected: each lane has a concrete role and no longer reads like a generic essay.

- [ ] **Step 4: Replace open-ended redirects with closed routing**

Add a final `Decision Routing` section using only:

```markdown
- `prepare-exclusive-license-draft`
- `prepare-non-exclusive-license-draft`
- `prepare-creative-commons-release`
- `prepare-software-eula-draft`
- `prepare-saas-user-content-license`
- `route-to-work-qualification`
- `route-to-assignment`
- `route-to-software-regime-review`
- `route-to-database-regime-review`
- `route-to-broader-pi-contract`
- `hold-for-rgpd-review`
- `hold-insufficient-basis`
```

Expected: downstream behavior is fixed and reviewable.

- [ ] **Step 5: Make the adjacent-skill boundaries explicit**

Add short route sections tied to these skills:

```markdown
- `qualification-oeuvre`
- `cession-droit-auteur`
- `logiciels-pi`
- `bases-de-donnees`
- `contrats-pi`
- plugin donnees personnelles
```

Expected: overlap with adjacent V2 skills is materially reduced.

### Task 4: Stabilize the output contract and memo

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/licence-droit-auteur/SKILL.md`
- Create: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/licence-droit-auteur/references/licence-droit-auteur-routing-and-output.md`

- [ ] **Step 1: Replace the current output format with the 9-block V2 contract**

Set the output blocks to exactly:

```markdown
1. `Case Snapshot`
2. `License Readiness Gate`
3. `Work And Title Preconditions`
4. `Chosen License Track`
5. `Economic And Exploitation Structure`
6. `Critical Clauses`
7. `Requalification And Compliance Risks`
8. `Decision Routing`
9. `Human Validation`
```

Expected: all responses follow one stable skeleton regardless of lane.

- [ ] **Step 2: Preserve provisional drafting markers**

Ensure the skill explicitly requires:

```markdown
- `[PROVISOIRE]`
- `[a verifier]`
- `[A COMPLETER]`
```

when the gate is `partial`.

Expected: incomplete dossiers remain visibly incomplete.

- [ ] **Step 3: Add the routing/output memo file**

Create `references/licence-droit-auteur-routing-and-output.md` with concise sections for:

```markdown
- role and non-goals
- closed intake contract
- readiness gate
- lane summary
- closed routing list
- 9-block output
```

Expected: the memo mirrors the live contract in a short operational form.

- [ ] **Step 4: Run a file-focused quality pass**

Run:

```powershell
git diff -- plugins/hacienda-propriete-intellectuelle/skills/licence-droit-auteur/SKILL.md plugins/hacienda-propriete-intellectuelle/skills/licence-droit-auteur/references/licence-droit-auteur-routing-and-output.md
```

Expected: the diff shows a coherent V2 structure rather than isolated text tweaks.

### Task 5: Align plugin docs

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Update the README skill inventory**

Add or revise the `licence-droit-auteur` bullet so it clearly says the skill is:

```markdown
- a V2 skill for strict copyright-license preparation
- centered on closed license tracks
- bounded by qualification, assignment, software, database, and broader PI contract routes
```

Expected: the README no longer describes the old mixed-scope skill.

- [ ] **Step 2: Add the changelog entry**

Add a new top entry documenting:

```markdown
## <next-version> — 2026-05-19
- migration de `licence-droit-auteur` vers un contrat V2
- `License Readiness Gate`
- lanes fermees
- sortie stabilisee en 9 blocs
- routage ferme vers les skills adjacents
```

Use the next appropriate plugin version number based on the current changelog head.

Expected: the migration is discoverable in release history.

- [ ] **Step 3: Check doc wording for real boundaries**

Run:

```powershell
rg -n "licence-droit-auteur" plugins/hacienda-propriete-intellectuelle/README.md plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
```

Expected: both files describe the same V2 scope.

### Task 6: Verify the lot in the worktree

**Files:**
- Verify only the expected files from Tasks 2-5

- [ ] **Step 1: Run formatting and whitespace verification**

Run:

```powershell
git diff --check
```

Expected: no whitespace errors; CRLF warnings alone are acceptable on Windows.

- [ ] **Step 2: Run the repo verification suite**

Run:

```powershell
npm test
npm run typecheck
npm run build
npm run branding:check
```

Expected: all commands pass. If the known MCP stdio flake appears, rebuild and rerun the failing targeted tests, then rerun `npm test`.

- [ ] **Step 3: Inspect the final changed file set**

Run:

```powershell
git status --short
```

Expected: only:

```text
M plugins/hacienda-propriete-intellectuelle/skills/licence-droit-auteur/SKILL.md
A plugins/hacienda-propriete-intellectuelle/skills/licence-droit-auteur/references/licence-droit-auteur-routing-and-output.md
M plugins/hacienda-propriete-intellectuelle/README.md
M plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
M docs/superpowers/specs/2026-05-19-hacienda-pi-licence-droit-auteur-v2-design.md
A docs/superpowers/plans/2026-05-19-hacienda-pi-licence-droit-auteur-v2.md
```

plus any known generated `dist/` noise to restore before commit.

### Task 7: Review, commit, merge, and clean up

**Files:**
- Commit the verified lot from Task 6

- [ ] **Step 1: Request final review before merge**

Use a subagent review pass over:

```text
plugins/hacienda-propriete-intellectuelle/skills/licence-droit-auteur/SKILL.md
plugins/hacienda-propriete-intellectuelle/skills/licence-droit-auteur/references/licence-droit-auteur-routing-and-output.md
plugins/hacienda-propriete-intellectuelle/README.md
plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
```

Expected: `APPROVED`, or apply review fixes before continuing.

- [ ] **Step 2: Stage and commit in the worktree**

Run:

```powershell
git add plugins/hacienda-propriete-intellectuelle/skills/licence-droit-auteur/SKILL.md `
        plugins/hacienda-propriete-intellectuelle/skills/licence-droit-auteur/references/licence-droit-auteur-routing-and-output.md `
        plugins/hacienda-propriete-intellectuelle/README.md `
        plugins/hacienda-propriete-intellectuelle/CHANGELOG.md `
        docs/superpowers/specs/2026-05-19-hacienda-pi-licence-droit-auteur-v2-design.md `
        docs/superpowers/plans/2026-05-19-hacienda-pi-licence-droit-auteur-v2.md
git commit -m "feat: restructure copyright licensing skill"
```

Expected: one clean feature commit in the worktree.

- [ ] **Step 3: Merge fast-forward into `main` and push**

Run:

```powershell
git checkout main
git merge --ff-only codex/licence-droit-auteur-v2
git push origin main
```

Expected: `main` updated remotely.

- [ ] **Step 4: Refresh GitNexus and restore known hook noise**

Run:

```powershell
npx gitnexus analyze
git restore AGENTS.md CLAUDE.md plugins/hacienda-propriete-intellectuelle/mcp-server/dist/index.js plugins/hacienda-propriete-intellectuelle/mcp-server/dist/version.js
git status --short
```

Expected: clean repo after analyze and restore.

- [ ] **Step 5: Remove the worktree and local branch**

Run:

```powershell
git worktree remove .worktrees/licence-droit-auteur-v2 --force
git branch -D codex/licence-droit-auteur-v2
```

Expected: no leftover local worktree for this lot.
