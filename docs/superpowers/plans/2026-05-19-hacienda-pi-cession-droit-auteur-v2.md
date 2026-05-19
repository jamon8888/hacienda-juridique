# Cession Droit D'Auteur V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework `cession-droit-auteur` into a V2 skill for strict copyright assignment drafting with a closed intake contract, an `Assignment Readiness Gate`, a stable 9-block output, and a bounded `title-chain-cleanup` branch.

**Architecture:** Keep one public skill, but split its behavior into a strict assignment core and a secondary chain-of-title cleanup branch. Add one compact routing/output memo, then align the plugin README and changelog so the V2 boundaries with `qualification-oeuvre`, `licence-droit-auteur`, `logiciels-pi`, and `contrats-pi` are explicit.

**Tech Stack:** Markdown skill files, plugin README/changelog, Hacienda PI skill conventions, npm verification commands, GitNexus post-merge analyze.

---

## File Map

- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur/SKILL.md`
  - Replace the V1 monolith structure with a V2 contract and stable routing.
- Create: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur/references/cession-droit-auteur-routing-and-output.md`
  - Short memo for intake, gate, title-chain cleanup, routing, and output blocks.
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/README.md`
  - Update the public skill inventory and version note.
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
  - Add the V2 migration entry.
- Reference: `C:/Users/NMarchitecte/hacienda-juridique/docs/superpowers/specs/2026-05-19-hacienda-pi-cession-droit-auteur-v2-design.md`
  - Keep implementation aligned with the approved design.

### Task 1: Create the isolated worktree

**Files:**
- Create: `C:/Users/NMarchitecte/hacienda-juridique/.worktrees/cession-droit-auteur-v2`

- [ ] **Step 1: Create the branch and worktree**

Run:

```powershell
git worktree add .worktrees/cession-droit-auteur-v2 -b codex/cession-droit-auteur-v2 main
```

Expected: new worktree checked out on `codex/cession-droit-auteur-v2`.

- [ ] **Step 2: Install dependencies if the worktree is fresh**

Run:

```powershell
npm install
```

Expected: dependencies are present and no unexpected lockfile drift is introduced in the final commit.

- [ ] **Step 3: Prime the baseline build**

Run:

```powershell
npm run build
```

Expected: the workspace builds once so generated server artifacts exist before later verification.

- [ ] **Step 4: Check initial status**

Run:

```powershell
git status --short
```

Expected: clean status or only known generated baseline noise to ignore before edits.

### Task 2: Restructure the skill header and role boundary

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur/SKILL.md`

- [ ] **Step 1: Turn the frontmatter into V2 metadata**

Update frontmatter so it includes:

```yaml
version: "2.0.0"
argument-hint: "[full-assignment|partial-assignment|exclusive-assignment|non-exclusive-assignment]"
```

Keep `name`, `authors`, and PI tags aligned with Hacienda naming.

Expected: the skill advertises itself as a V2 contract-driven skill.

- [ ] **Step 2: Rewrite the top positioning block**

Replace the current V1 intro with short V2 framing that says the skill:

```markdown
- prepares a copyright assignment draft
- does not replace work qualification
- does not replace a license when a transfer is unnecessary
- does not replace software-regime review
- does not produce a final signable contract
```

Expected: the first screen tells the user exactly what the skill is and is not.

- [ ] **Step 3: Keep the core legal guardrails, but compress them into stable V2 sections**

Preserve explicit references to:

```markdown
- `L.131-3`
- `L.131-4`
- `L.131-1`
- non-transferability of moral rights
```

Move them under a dedicated V2 analysis structure instead of repeating them across many long warning blocks.

Expected: legal rigor is preserved without keeping the V1 monolith shape.

- [ ] **Step 4: Review the header diff**

Run:

```powershell
git diff -- plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur/SKILL.md
```

Expected: frontmatter and role boundary are clearly converted before intake work starts.

### Task 3: Add the closed intake contract and readiness gate

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur/SKILL.md`

- [ ] **Step 1: Add the closed V2 intake fields**

Insert an intake contract with exactly these fields:

```markdown
- `transfer_track`: `full-assignment` | `partial-assignment` | `exclusive-assignment` | `non-exclusive-assignment`
- `creation_context`: `independent-author` | `commissioned-work` | `employee-non-software` | `collective-work-claim` | `collaborative-work` | `audiovisual` | `publishing`
- `title_chain_status`: `clear` | `mixed` | `uncertain` | `blocked`
- `work_status`: `qualified` | `partially-qualified` | `uncertain`
- `economic_model`: `royalty` | `flat-fee` | `advance-plus-royalty` | `mixed`
- `scope_posture`: `narrow` | `standard` | `broad` | `all-current-uses`
- `counterparty_profile`: `publisher` | `producer` | `brand` | `platform` | `customer` | `internal-group` | `mixed`
```

Expected: the V2 contract is closed and reviewable.

- [ ] **Step 2: Add the minimum fact set**

Insert the required facts:

```markdown
- oeuvre ou corpus vise
- identite du cedant
- identite du cessionnaire
- base de titularite du cedant
- droits vises
- territoire
- duree
- modele economique
- contexte de creation
- statut coauteur / employeur / prestataire si pertinent
```

Expected: the skill can refuse weak dossiers instead of filling gaps silently.

- [ ] **Step 3: Add the `Assignment Readiness Gate`**

Create a gate with:

```markdown
- `ready`
- `partial`
- `blocked`
```

And explicit block conditions for:

```markdown
- title chain too uncertain
- global future-work assignment outside allowed exception
- request should be a license instead
- legal person asserting title without basis
- missing coauthors or heirs
```

Expected: the skill can stop cleanly before generating a false-comfort draft.

- [ ] **Step 4: Preserve provisional markers**

State clearly that `partial` outputs must keep:

```markdown
- `[PROVISOIRE]`
- `[a verifier]`
- `[A COMPLETER]`
```

Expected: incomplete assignment dossiers remain visibly incomplete.

### Task 4: Split the core assignment flow from title-chain cleanup

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur/SKILL.md`

- [ ] **Step 1: Create a dedicated core section for assignment drafting**

Reorganize the middle of the skill around these stable axes:

```markdown
1. Work and title preconditions
2. Chosen transfer track
3. Rights scope and exploitation structure
4. Economic structure
5. Title-chain cleanup or blocking points
```

Expected: the skill reads like one coherent V2 pipeline.

- [ ] **Step 2: Make chain-of-title cleanup secondary, not co-equal**

Add a bounded branch that explicitly covers:

```markdown
- missing coauthors
- missing signatures
- commissioned work without valid assignment
- employee non-software title misunderstanding
- legal person without title basis
- weak collective-work claim
- prior assignment not documented
- heirs not identified
```

And state that this branch is for blocking and regularization, not a full standalone audit.

Expected: the cleanup branch helps without becoming the main purpose.

- [ ] **Step 3: Tighten the boundaries to adjacent skills**

Add route sections for:

```markdown
### Route to `qualification-oeuvre`
### Route to `licence-droit-auteur`
### Route to `logiciels-pi`
### Route to `contrats-pi`
```

Expected: each adjacent skill boundary is explicit and not implied.

- [ ] **Step 4: Replace generic redirection prose with closed decision routes**

Add a final routing block restricted to:

```markdown
- `prepare-full-assignment-draft`
- `prepare-partial-assignment-draft`
- `prepare-exclusive-assignment-draft`
- `prepare-non-exclusive-assignment-draft`
- `route-to-work-qualification`
- `route-to-license-instead`
- `route-to-title-chain-cleanup`
- `route-to-software-regime-review`
- `route-to-broader-pi-contract`
- `hold-insufficient-basis`
```

Expected: downstream behavior is finite and testable.

### Task 5: Stabilize the V2 output and memo

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur/SKILL.md`
- Create: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur/references/cession-droit-auteur-routing-and-output.md`

- [ ] **Step 1: Replace the existing output structure with 9 stable blocks**

Set the output contract to exactly:

```markdown
1. `Case Snapshot`
2. `Assignment Readiness Gate`
3. `Work And Title Preconditions`
4. `Chosen Transfer Track`
5. `Rights Scope And Exploitation Structure`
6. `Economic Structure`
7. `Title-Chain Cleanup Or Blocking Points`
8. `Decision Routing`
9. `Human Validation`
```

Expected: all assignment outputs become structurally predictable.

- [ ] **Step 2: Keep the moral-rights reminder visible in the output path**

Ensure the output skeleton still makes clear that:

```markdown
le droit moral ne se cede pas
```

Expected: the V2 simplification does not weaken the core legal limit.

- [ ] **Step 3: Add the routing/output memo file**

Create `references/cession-droit-auteur-routing-and-output.md` with compact sections for:

```markdown
- role and non-goals
- closed intake contract
- readiness gate
- core assignment axes
- title-chain cleanup branch
- closed routing list
- 9-block output contract
```

Expected: the memo mirrors the live behavior in a short, operational form.

- [ ] **Step 4: Check the focused diff**

Run:

```powershell
git diff -- plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur/SKILL.md plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur/references/cession-droit-auteur-routing-and-output.md
```

Expected: the skill now reads as a V2 contract, not a patched V1.

### Task 6: Align README and changelog

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Update the README inventory line**

Add or revise the `cession-droit-auteur` entry so it states that the skill is:

```markdown
- a V2 strict assignment-preparation skill
- centered on closed transfer tracks
- guarded by `Assignment Readiness Gate`
- able to route into title-chain cleanup
```

Expected: the README describes the new V2 boundary accurately.

- [ ] **Step 2: Add the changelog migration entry**

Add a new top entry:

```markdown
## <next-version> — 2026-05-19
- migration de `cession-droit-auteur` vers un contrat V2
- `Assignment Readiness Gate`
- tracks fermes
- branche `title-chain-cleanup` bornee
- sortie stabilisee en 9 blocs
- routage ferme
```

Use the next logical version number after the current changelog head.

Expected: the migration is recorded and auditable.

- [ ] **Step 3: Confirm both docs describe the same boundary**

Run:

```powershell
rg -n "cession-droit-auteur|Assignment Readiness Gate|title-chain-cleanup" plugins/hacienda-propriete-intellectuelle/README.md plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
```

Expected: both docs talk about the same V2 contract.

### Task 7: Verify the change set in the worktree

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

Expected: all commands pass. If a fresh worktree fails because dependencies are missing, run `npm install` once, then rerun verification.

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
plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur/SKILL.md
plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur/references/cession-droit-auteur-routing-and-output.md
plugins/hacienda-propriete-intellectuelle/README.md
plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
```

Expected: `APPROVED`, or apply the review fixes before continuing.

- [ ] **Step 2: Stage and commit in the worktree**

Run:

```powershell
git add plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur/SKILL.md `
        plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur/references/cession-droit-auteur-routing-and-output.md `
        plugins/hacienda-propriete-intellectuelle/README.md `
        plugins/hacienda-propriete-intellectuelle/CHANGELOG.md `
        docs/superpowers/specs/2026-05-19-hacienda-pi-cession-droit-auteur-v2-design.md `
        docs/superpowers/plans/2026-05-19-hacienda-pi-cession-droit-auteur-v2.md
git commit -m "feat: restructure copyright assignment skill"
```

Expected: one clean feature commit.

- [ ] **Step 3: Merge fast-forward and push**

Run:

```powershell
git checkout main
git merge --ff-only codex/cession-droit-auteur-v2
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
git worktree remove .worktrees/cession-droit-auteur-v2 --force
git branch -D codex/cession-droit-auteur-v2
```

Expected: no leftover worktree for this lot.
