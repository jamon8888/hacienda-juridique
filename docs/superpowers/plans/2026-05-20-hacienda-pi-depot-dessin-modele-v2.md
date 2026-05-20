# Depot Dessin Modele V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework `depot-dessin-modele` into a V2 skill for strict registered-design filing preparation with closed filing lanes, a `Filing Readiness Gate`, a stable 9-block output, and a bounded `DMCNE` signal.

**Architecture:** Keep one public skill file, but reorganize it around a closed intake contract, a strict filing core (`fr`, `eu`, `hague`, `sequenced`), and a bounded secondary `DMCNE` signal. Add one compact routing/output memo, then align the plugin README and changelog so the boundaries with `recherche-anteriorite-dm` and `contrefacon-dessin-modele` are explicit.

**Tech Stack:** Markdown skill files, plugin README/changelog, Hacienda PI skill conventions, npm verification commands, GitNexus post-merge analyze.

---

## File Map

- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/depot-dessin-modele/SKILL.md`
  - Replace the V1 filing checklist structure with the V2 contract and stable routing.
- Create: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/depot-dessin-modele/references/depot-dessin-modele-routing-and-output.md`
  - Short memo for intake, gate, lanes, `DMCNE` signal, routing, and output.
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/README.md`
  - Update public skill inventory and current-version note.
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
  - Add the V2 migration entry.
- Reference: `C:/Users/NMarchitecte/hacienda-juridique/docs/superpowers/specs/2026-05-20-hacienda-pi-depot-dessin-modele-v2-design.md`
  - Keep implementation aligned with the approved design.

### Task 1: Create the isolated worktree

**Files:**
- Create: `C:/Users/NMarchitecte/hacienda-juridique/.worktrees/depot-dessin-modele-v2`

- [ ] **Step 1: Create the branch and worktree**

Run:

```powershell
git worktree add .worktrees/depot-dessin-modele-v2 -b codex/depot-dessin-modele-v2 main
```

Expected: a new worktree checked out on `codex/depot-dessin-modele-v2`.

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
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/depot-dessin-modele/SKILL.md`

- [ ] **Step 1: Convert frontmatter to V2 metadata**

Update frontmatter so it includes:

```yaml
version: "2.0.0"
argument-hint: "[fr|eu|hague|sequenced]"
```

Keep `name`, `authors`, and PI tags aligned with Hacienda naming.

Expected: the skill advertises itself as a V2 filing-preparation contract.

- [ ] **Step 2: Rewrite the top role block**

Replace the current V1 intro with short V2 framing that says the skill:

```markdown
- prepares a registered design filing dossier
- does not replace prior-art review
- does not replace infringement analysis
- does not perform the actual filing
- does not turn `DMCNE` into a filing lane
```

Expected: the first screen makes the V2 boundary obvious.

- [ ] **Step 3: Preserve the strict filing identity**

Add explicit positioning that:

```markdown
- `fr`, `eu`, `hague`, `sequenced` are the core lanes
- `DMCNE` is only a bounded signal / fallback
```

Expected: the skill cannot drift into a general D&M memo.

- [ ] **Step 4: Review the header diff**

Run:

```powershell
git diff -- plugins/hacienda-propriete-intellectuelle/skills/depot-dessin-modele/SKILL.md
```

Expected: the V2 role boundary is visible before intake work starts.

### Task 3: Add the closed intake contract and `Filing Readiness Gate`

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/depot-dessin-modele/SKILL.md`

- [ ] **Step 1: Insert the closed V2 intake fields**

Add exactly these intake fields:

```markdown
- `filing_lane`: `fr` | `eu` | `hague` | `sequenced`
- `design_status`: `new` | `possibly-disclosed` | `already-disclosed` | `uncertain`
- `filing_scope`: `single` | `multiple`
- `priority_status`: `none` | `available` | `expiring` | `lost`
- `publication_strategy`: `immediate` | `deferred` | `undecided`
- `visual_readiness`: `complete` | `partial` | `weak` | `blocked`
- `classification_status`: `clear` | `mixed` | `uncertain`
```

Expected: intake becomes a closed contract instead of a loose checklist.

- [ ] **Step 2: Add the minimum fact set**

Insert the required facts:

```markdown
- design ou serie de designs visee
- visuels disponibles
- produit ou indication produit
- deposant
- createur
- territoire vise
- posture simple ou multiple
- priorite oui/non et date si invoquee
- choix ou etat d'ajournement
```

Expected: the skill can refuse weak dossiers without inventing missing facts.

- [ ] **Step 3: Add the `Filing Readiness Gate`**

Create a gate with:

```markdown
- `ready`
- `partial`
- `blocked`
```

And explicit block conditions for:

```markdown
- reproductions insuffisantes
- Locarno trop incertain
- deposant ou createur mal identifies
- nouveaute possiblement detruite sans clarification
- priorite mal documentee
- depot multiple incoherent
```

Expected: the skill can stop cleanly before outputting a false-ready filing pack.

- [ ] **Step 4: Preserve provisional markers**

State clearly that `partial` outputs must keep:

```markdown
- `[PROVISOIRE]`
- `[a verifier]`
- `[A COMPLETER]`
```

Expected: incomplete filing dossiers stay visibly incomplete.

### Task 4: Rebuild the lane structure and bounded `DMCNE` signal

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/depot-dessin-modele/SKILL.md`

- [ ] **Step 1: Create explicit lane sections**

Restructure the core around:

```markdown
### `fr`
### `eu`
### `hague`
### `sequenced`
```

Expected: each filing route is explicit and no implicit lane remains.

- [ ] **Step 2: Add stable core analysis axes**

Reorganize the middle of the skill around:

```markdown
1. Office And Lane Selection
2. Design And Product Definition
3. Reproductions And Visual Scope
4. Priority And Publication Strategy
5. Fees And Filing Mechanics
```

Expected: the filing workflow is predictable and easier to review.

- [ ] **Step 3: Add a bounded `DMCNE` signal block**

Add a dedicated section stating that `DMCNE` is only used to signal:

```markdown
- possible prior disclosure
- possible residual unregistered-EU posture
- need for complementary downstream analysis
```

And state that `DMCNE` is not a filing lane.

Expected: fallback logic is visible without changing the skill identity.

- [ ] **Step 4: Tighten adjacent skill boundaries**

Add route sections for:

```markdown
### Route to `recherche-anteriorite-dm`
### Route to `contrefacon-dessin-modele`
### Stay in `depot-dessin-modele`
```

Expected: prior-art and infringement boundaries are explicit, not implied.

### Task 5: Stabilize the V2 output and memo

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/depot-dessin-modele/SKILL.md`
- Create: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/depot-dessin-modele/references/depot-dessin-modele-routing-and-output.md`

- [ ] **Step 1: Replace the current output format with the 9-block V2 contract**

Set the output blocks to exactly:

```markdown
1. `Case Snapshot`
2. `Filing Readiness Gate`
3. `Office And Lane Selection`
4. `Design And Product Definition`
5. `Reproductions And Visual Scope`
6. `Priority And Publication Strategy`
7. `Fees And Filing Mechanics`
8. `Decision Routing`
9. `Human Validation`
```

Expected: all filing outputs share one stable skeleton.

- [ ] **Step 2: Add closed decision routing**

Restrict the final routing block to:

```markdown
- `prepare-fr-filing`
- `prepare-eu-filing`
- `prepare-hague-filing`
- `prepare-sequenced-filing`
- `hold-for-prior-art-review`
- `hold-for-visual-cleanup`
- `signal-unregistered-eu-design-posture`
- `hold-insufficient-basis`
```

Expected: downstream behavior is finite and testable.

- [ ] **Step 3: Create the routing/output memo file**

Create `references/depot-dessin-modele-routing-and-output.md` with concise sections for:

```markdown
- role and non-goals
- closed intake contract
- filing readiness gate
- lane summary
- bounded `DMCNE` signal
- closed routing list
- 9-block output
```

Expected: the memo mirrors the live V2 contract in short operational form.

- [ ] **Step 4: Review the focused diff**

Run:

```powershell
git diff -- plugins/hacienda-propriete-intellectuelle/skills/depot-dessin-modele/SKILL.md plugins/hacienda-propriete-intellectuelle/skills/depot-dessin-modele/references/depot-dessin-modele-routing-and-output.md
```

Expected: the skill now reads like a V2 contract instead of a V1 checklist with extra notes.

### Task 6: Align README and changelog

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Update the README inventory line**

Add or revise the `depot-dessin-modele` entry so it states that the skill is:

```markdown
- a V2 strict registered-design filing preparation skill
- centered on closed filing lanes
- guarded by `Filing Readiness Gate`
- bounded from prior-art and infringement analysis
- keeping `DMCNE` only as a signal/fallback
```

Expected: the README describes the new V2 boundary accurately.

- [ ] **Step 2: Add the changelog migration entry**

Add a new top entry:

```markdown
## <next-version> — 2026-05-20
- migration de `depot-dessin-modele` vers un contrat V2
- `Filing Readiness Gate`
- lanes fermees
- signal `DMCNE` borne
- sortie stabilisee en 9 blocs
- routage ferme
```

Use the next logical version number after the current changelog head.

Expected: the migration is recorded and auditable.

- [ ] **Step 3: Confirm both docs describe the same boundary**

Run:

```powershell
rg -n "depot-dessin-modele|Filing Readiness Gate|DMCNE|signal-unregistered-eu-design-posture" plugins/hacienda-propriete-intellectuelle/README.md plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
```

Expected: both docs talk about the same V2 contract.

### Task 7: Verify the lot in the worktree

**Files:**
- Verify only the expected files from Tasks 2-6

- [ ] **Step 1: Run whitespace verification**

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

Expected: all commands pass. If a fresh worktree is missing dependencies, run `npm install` once, then rerun verification.

- [ ] **Step 3: Inspect the final file set**

Run:

```powershell
git status --short
```

Expected: only the intended skill, reference memo, README, changelog, spec, and plan are changed, plus any known generated `dist/` noise to restore before commit.

### Task 8: Review, commit, merge, and clean up

**Files:**
- Commit the verified lot from Task 7

- [ ] **Step 1: Request final review over the lot**

Review these files together:

```text
plugins/hacienda-propriete-intellectuelle/skills/depot-dessin-modele/SKILL.md
plugins/hacienda-propriete-intellectuelle/skills/depot-dessin-modele/references/depot-dessin-modele-routing-and-output.md
plugins/hacienda-propriete-intellectuelle/README.md
plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
```

Expected: `APPROVED`, or apply review fixes before continuing.

- [ ] **Step 2: Stage and commit in the worktree**

Run:

```powershell
git add plugins/hacienda-propriete-intellectuelle/skills/depot-dessin-modele/SKILL.md `
        plugins/hacienda-propriete-intellectuelle/skills/depot-dessin-modele/references/depot-dessin-modele-routing-and-output.md `
        plugins/hacienda-propriete-intellectuelle/README.md `
        plugins/hacienda-propriete-intellectuelle/CHANGELOG.md `
        docs/superpowers/specs/2026-05-20-hacienda-pi-depot-dessin-modele-v2-design.md `
        docs/superpowers/plans/2026-05-20-hacienda-pi-depot-dessin-modele-v2.md
git commit -m "feat: restructure design filing preparation skill"
```

Expected: one clean feature commit.

- [ ] **Step 3: Merge fast-forward and push**

Run:

```powershell
git checkout main
git merge --ff-only codex/depot-dessin-modele-v2
git push origin main
```

Expected: `main` is updated remotely.

- [ ] **Step 4: Refresh GitNexus and restore hook noise**

Run:

```powershell
npx gitnexus analyze
git restore AGENTS.md CLAUDE.md plugins/hacienda-propriete-intellectuelle/mcp-server/dist/index.js plugins/hacienda-propriete-intellectuelle/mcp-server/dist/version.js
git status --short
```

Expected: GitNexus is fresh and repo status is clean.

- [ ] **Step 5: Remove the worktree and local branch**

Run:

```powershell
git worktree remove .worktrees/depot-dessin-modele-v2 --force
git branch -D codex/depot-dessin-modele-v2
```

Expected: no leftover worktree for this lot.
