# Certificat Complementaire Protection V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework `certificat-complementaire-protection` into a V2 skill for strict CCP readiness with a closed intake contract, a `CCP Readiness Gate`, a stable 9-block output, and bounded `check` / `manufacturing-waiver-signal` branches.

**Architecture:** Keep one public skill file, but reorganize it around a strict eligibility / calculation / application-readiness core. Add one compact routing/output memo, then align the plugin README and changelog so the boundaries with adjacent patent skills are explicit.

**Tech Stack:** Markdown skill files, plugin README/changelog, Hacienda PI skill conventions, npm verification commands, GitNexus post-merge analyze.

---

## File Map

- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/certificat-complementaire-protection/SKILL.md`
  - Replace the V1 mixed eligibility/check/waiver memo with the V2 intake, gate, bounded secondary branches, and stable routing.
- Create: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/certificat-complementaire-protection/references/certificat-complementaire-protection-routing-and-output.md`
  - Short memo for intake, gate, article 3 review, duration logic, risk matrix, routing, and output.
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/README.md`
  - Update public skill inventory and current-version note.
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
  - Add the V2 migration entry.
- Reference: `C:/Users/NMarchitecte/hacienda-juridique/docs/superpowers/specs/2026-05-20-hacienda-pi-certificat-complementaire-protection-v2-design.md`
  - Keep implementation aligned with the approved design.

### Task 1: Create the isolated worktree

**Files:**
- Create: `C:/Users/NMarchitecte/hacienda-juridique/.worktrees/certificat-complementaire-protection-v2`

- [ ] **Step 1: Create the branch and worktree**

Run:

```powershell
git worktree add .worktrees/certificat-complementaire-protection-v2 -b codex/certificat-complementaire-protection-v2 main
```

Expected: a new worktree checked out on `codex/certificat-complementaire-protection-v2`.

- [ ] **Step 2: Reuse or install dependencies**

Run:

```powershell
npm install
```

Expected: dependencies are available for verification commands.

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
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/certificat-complementaire-protection/SKILL.md`

- [ ] **Step 1: Convert frontmatter to V2 metadata**

Update frontmatter so it includes:

```yaml
version: "2.0.0"
argument-hint: "[eligibility|apply|check]"
```

Keep `name`, `authors`, and life-sciences tags aligned with Hacienda naming.

Expected: the skill advertises itself as a V2 CCP contract.

- [ ] **Step 2: Rewrite the top role block**

Replace the current V1 intro with short V2 framing that says the skill:

```markdown
- performs CCP eligibility and readiness analysis
- does not file the CCP
- does not replace final specialist review
- does not become a full generic-entry strategy memo
- keeps `check` and `manufacturing-waiver-signal` bounded
```

Expected: the first screen makes the V2 boundary obvious.

- [ ] **Step 3: Preserve the strict CCP identity**

Add explicit positioning that:

```markdown
- `eligibility` and `apply` are the core paths
- `check` is secondary
- `manufacturing-waiver-signal` is only a bounded signal
```

Expected: the skill cannot drift into a broad patent-litigation memo.

- [ ] **Step 4: Review the header diff**

Run:

```powershell
git diff -- plugins/hacienda-propriete-intellectuelle/skills/certificat-complementaire-protection/SKILL.md
```

Expected: the V2 role boundary is visible before intake work starts.

### Task 3: Add the closed intake contract and `CCP Readiness Gate`

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/certificat-complementaire-protection/SKILL.md`

- [ ] **Step 1: Insert the closed V2 intake fields**

Add exactly these intake fields:

```markdown
- `mode`: `eligibility` | `apply` | `check`
- `product_track`: `medicinal` | `plant-protection`
- `base_patent_status`: `clear` | `mixed` | `weak` | `unknown`
- `authorization_posture`: `valid-first-eu` | `valid-but-first-eu-unclear` | `authorization-unclear` | `blocked`
- `claim_match_posture`: `strong` | `mixed` | `weak` | `unknown`
- `pediatric_extension_status`: `not-applicable` | `possible` | `documented` | `unclear`
- `waiver_posture`: `none` | `export-signal` | `stockpiling-signal` | `mixed`
```

Expected: intake becomes a closed contract instead of a loose checklist.

- [ ] **Step 2: Add the minimum fact set**

Insert the required facts:

```markdown
- numero et statut du brevet de base
- date de depot du brevet
- date d'expiration du brevet ou base raisonnable pour la determiner
- produit ou substance active visee
- reference AMM, autorite et date
- qualification medicament / phyto
- contexte `eligibility`, `apply` ou `check`
```

Expected: the skill can refuse weak CCP dossiers without inventing missing facts.

- [ ] **Step 3: Add the `CCP Readiness Gate`**

Create a gate with:

```markdown
- `ready`
- `partial`
- `blocked`
```

And explicit block conditions for:

```markdown
- brevet de base non identifiable ou non exploitable
- aucune AMM exploitable documentee
- produit non rattachable au brevet de base
- date de depot ou d'expiration non etablissable
- pieces minimales absentes pour le mode choisi
- aucune source effectivement consultee et datee ne peut etre documentee
```

Expected: the skill can stop cleanly before outputting a false-positive CCP analysis.

- [ ] **Step 4: Preserve provisional markers**

State clearly that `partial` outputs must keep:

```markdown
- `[PROVISOIRE]`
- `[a verifier]`
- `[A COMPLETER]`
```

Expected: partial CCP analyses stay visibly incomplete.

### Task 4: Rebuild the core CCP logic and bounded secondary branches

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/certificat-complementaire-protection/SKILL.md`

- [ ] **Step 1: Reframe the article 3 review**

Restructure the eligibility logic around:

```markdown
- article 3(a): product protected by the base patent
- article 3(b): valid authorization
- article 3(c): no prior CCP for the product
- article 3(d): first EU marketing authorization
```

Expected: article 3 becomes a stable review block instead of scattered doctrine.

- [ ] **Step 2: Reframe the duration logic**

Make the duration section explicitly cover:

```markdown
- article 13 formula
- dates used
- zero-or-negative result handling
- pediatric extension treatment
```

Expected: duration and extension logic are consistent and reusable.

- [ ] **Step 3: Add the bounded `check` branch**

Add a short branch that says, when `mode = check`, the skill:

```markdown
- verifies an existing CCP baseline
- recomputes apparent expiry
- identifies visible fragility points
- does not replace a full contentious validity review
```

Expected: verification use exists, but cannot take over the skill.

- [ ] **Step 4: Add the bounded `manufacturing-waiver-signal` branch**

Add a short branch that says the skill may:

```markdown
- signal export / stockpiling waiver posture
- identify notifications to verify
- highlight apparent generic-entry timing pressure
- not become a full generic-entry memo
```

Expected: waiver analysis remains bounded and subordinate.

### Task 5: Stabilize the 9-block output and decision routing

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/certificat-complementaire-protection/SKILL.md`

- [ ] **Step 1: Replace the V1 report format with the 9-block V2 output**

Use exactly these blocks:

```markdown
1. `Case Snapshot`
2. `CCP Readiness Gate`
3. `Base Patent And Product Match`
4. `Authorization And First EU Marketing Posture`
5. `Article 3 Eligibility`
6. `Duration And Extension Calculation`
7. `Filing Window Or Existing CCP Check`
8. `Decision Routing`
9. `Human Validation`
```

Expected: output contract matches the approved spec.

- [ ] **Step 2: Add the closed routing set**

Bound `Decision Routing` to:

```markdown
- `prepare-ccp-application`
- `prepare-ccp-application-with-caution`
- `hold-for-claim-scope-review`
- `hold-for-first-amm-review`
- `hold-for-duplicate-ccp-review`
- `signal-manufacturing-waiver-posture`
- `route-to-patent-invalidity-review`
- `route-to-patent-portfolio-review`
- `hold-insufficient-basis`
```

Expected: downstream paths are explicit and finite.

- [ ] **Step 3: Clarify recurring limits**

State that every output must mention, when relevant:

```markdown
- specialist confirmation required for claim/product match
- AMM chronology may still require office-grade verification
- pediatric extension evidence may be incomplete
- waiver posture is only a bounded signal
```

Expected: no output can be mistaken for a final filing opinion.

- [ ] **Step 4: Review the final skill structure**

Run:

```powershell
Select-String -Path plugins/hacienda-propriete-intellectuelle/skills/certificat-complementaire-protection/SKILL.md -Pattern "CCP Readiness Gate|Decision Routing|manufacturing-waiver-signal|Article 3"
```

Expected: all V2 structural anchors are present.

### Task 6: Add the routing/output memo

**Files:**
- Create: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/certificat-complementaire-protection/references/certificat-complementaire-protection-routing-and-output.md`

- [ ] **Step 1: Create the memo skeleton**

Add sections for:

```markdown
- role and non-goals
- intake contract
- gate
- article 3 review
- duration logic
- risk matrix
- decision routing
- stable output
```

Expected: the memo mirrors the skill in compact form.

- [ ] **Step 2: Encode the risk matrix**

Include a short matrix covering:

```markdown
- article 3 conditions apparently satisfied
- claim/product match fragile
- first EU authorization unclear
- duplicate CCP risk
- waiver signal plausible
```

Expected: workers can classify CCP outcomes consistently.

- [ ] **Step 3: Add routing reminders**

State explicitly:

```markdown
- claim-scope doubt -> `anteriorite-invalidite` or claim-scope review hold
- portfolio/timeline question -> `revue-portefeuille-brevets`
- prosecution issue on the base patent -> `analyse-refus-inpi`
```

Expected: memo reinforces the intended patent-lane boundaries.

### Task 7: Align public plugin documentation

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Update the README skill description**

Adjust the CCP entry so it says the skill now covers:

```markdown
- strict CCP readiness
- article 3 eligibility and duration calculation
- bounded `check` branch
- bounded `manufacturing-waiver-signal`
- explicit routing to adjacent patent skills
```

Expected: README matches the real contract.

- [ ] **Step 2: Add the changelog entry**

Record the V2 migration with notes for:

```markdown
- closed intake
- `CCP Readiness Gate`
- stable 9-block output
- bounded `check` and waiver signal
- clarified boundaries with adjacent patent skills
```

Expected: changelog reflects the migration scope.

- [ ] **Step 3: Review docs diff**

Run:

```powershell
git diff -- plugins/hacienda-propriete-intellectuelle/README.md plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
```

Expected: documentation changes are limited to the CCP migration.

### Task 8: Verify the worktree before integration

**Files:**
- Test: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/certificat-complementaire-protection/SKILL.md`
- Test: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/README.md`
- Test: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

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
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/docs/superpowers/specs/2026-05-20-hacienda-pi-certificat-complementaire-protection-v2-design.md`
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/docs/superpowers/plans/2026-05-20-hacienda-pi-certificat-complementaire-protection-v2.md`

- [ ] **Step 1: Inspect command availability and scope**

Run:

```powershell
npx gitnexus --help
git diff --stat
```

Expected: confirm available GitNexus CLI commands and visually verify only the intended CCP files are in scope.

- [ ] **Step 2: Commit in the worktree**

Run:

```powershell
git add plugins/hacienda-propriete-intellectuelle/skills/certificat-complementaire-protection/SKILL.md plugins/hacienda-propriete-intellectuelle/skills/certificat-complementaire-protection/references/certificat-complementaire-protection-routing-and-output.md plugins/hacienda-propriete-intellectuelle/README.md plugins/hacienda-propriete-intellectuelle/CHANGELOG.md docs/superpowers/specs/2026-05-20-hacienda-pi-certificat-complementaire-protection-v2-design.md docs/superpowers/plans/2026-05-20-hacienda-pi-certificat-complementaire-protection-v2.md
git commit -m "feat: restructure supplementary protection certificate skill"
```

Expected: one focused commit on the worktree branch.

- [ ] **Step 3: Merge to `main` and push**

Run:

```powershell
git checkout main
git merge --ff-only codex/certificat-complementaire-protection-v2
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
git branch -d codex/certificat-complementaire-protection-v2
git worktree remove .worktrees/certificat-complementaire-protection-v2
```

Expected: no leftover isolated branch or worktree after successful merge.

## Self-Review

- Spec coverage:
  - V2 CCP readiness positioning -> Tasks 2, 4, 5
  - closed intake and gate -> Task 3
  - bounded `check` / `manufacturing-waiver-signal` branches -> Task 4
  - stable 9-block output and closed routing -> Task 5
  - routing/output memo -> Task 6
  - README/changelog alignment -> Task 7
  - verification and integration -> Tasks 8 and 9
- Placeholder scan:
  - no `TODO`, `TBD`, or deferred implementation markers kept in plan steps
- Type consistency:
  - `CCP Readiness Gate`, `mode`, `product_track`, and routing labels are used consistently across tasks

