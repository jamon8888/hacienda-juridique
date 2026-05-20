# Droits Voisins OGC V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework `droits-voisins-ogc` into a V2 skill for strict neighboring-rights and OGC analysis, with bounded `gen-ai-signal` and `nft-signal` branches, a `Neighboring Rights Readiness Gate`, and a stable 9-block output.

**Architecture:** Keep one public skill file, but reorganize it around a strict neighboring-rights / collective-management core. Add one compact routing/output memo, then align the plugin README and changelog so the boundaries with adjacent auteur, contract, and litigation skills are explicit.

**Tech Stack:** Markdown skill files, plugin README/changelog, Hacienda PI skill conventions, npm verification commands, GitNexus post-merge analyze.

---

## File Map

- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/droits-voisins-ogc/SKILL.md`
  - Replace the V1 mixed neighboring-rights / OGC / AI / NFT memo with the V2 intake, gate, bounded secondary branches, and stable routing.
- Create: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/droits-voisins-ogc/references/droits-voisins-ogc-routing-and-output.md`
  - Short memo for intake, gate, rights-holder map, OGC posture, secondary signals, routing, and output.
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/README.md`
  - Update public skill inventory and current-version note.
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
  - Add the V2 migration entry.
- Reference: `C:/Users/NMarchitecte/hacienda-juridique/docs/superpowers/specs/2026-05-20-hacienda-pi-droits-voisins-ogc-v2-design.md`
  - Keep implementation aligned with the approved design.

### Task 1: Create the isolated worktree

**Files:**
- Create: `C:/Users/NMarchitecte/hacienda-juridique/.worktrees/droits-voisins-ogc-v2`

- [ ] **Step 1: Create the branch and worktree**

Run:

```powershell
git worktree add .worktrees/droits-voisins-ogc-v2 -b codex/droits-voisins-ogc-v2 main
```

Expected: a new worktree checked out on `codex/droits-voisins-ogc-v2`.

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
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/droits-voisins-ogc/SKILL.md`

- [ ] **Step 1: Convert frontmatter to V2 metadata**

Update frontmatter so it includes:

```yaml
version: "2.0.0"
argument-hint: "[performer-rights|phonogram-producer|videogram-producer|broadcast-organization|press-publisher|mixed]"
```

Keep `name`, `authors`, and neighboring-rights / OGC tags aligned with Hacienda naming.

Expected: the skill advertises itself as a V2 neighboring-rights contract.

- [ ] **Step 2: Rewrite the top role block**

Replace the current V1 intro with short V2 framing that says the skill:

```markdown
- performs neighboring-rights and OGC readiness analysis
- does not replace final specialist review
- does not become a full AI Act memo
- does not become a blockchain / NFT generalist note
- keeps `gen-ai-signal` and `nft-signal` bounded
```

Expected: the first screen makes the V2 boundary obvious.

- [ ] **Step 3: Preserve the strict neighboring-rights identity**

Add explicit positioning that:

```markdown
- rights-holder qualification and exploitation mapping are the core paths
- OGC / remuneration posture stays inside the core
- `gen-ai-signal` and `nft-signal` stay secondary
```

Expected: the skill cannot drift into a broad IP-emerging-tech memo.

- [ ] **Step 4: Review the header diff**

Run:

```powershell
git diff -- plugins/hacienda-propriete-intellectuelle/skills/droits-voisins-ogc/SKILL.md
```

Expected: the V2 role boundary is visible before intake work starts.

### Task 3: Add the closed intake contract and `Neighboring Rights Readiness Gate`

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/droits-voisins-ogc/SKILL.md`

- [ ] **Step 1: Insert the closed V2 intake fields**

Add exactly these intake fields:

```markdown
- `primary_track`: `performer-rights` | `phonogram-producer` | `videogram-producer` | `broadcast-organization` | `press-publisher` | `mixed`
- `management_posture`: `direct-licensing` | `ogc-membership` | `equitable-remuneration` | `mixed`
- `rights_chain_status`: `clear` | `mixed` | `uncertain` | `blocked`
- `exploitation_mode`: `fixation` | `reproduction` | `communication-public` | `streaming` | `platform-use` | `mixed`
- `emerging_signal`: `none` | `gen-ai` | `nft` | `both`
- `territory_scope`: `fr` | `eu` | `international`
```

Expected: intake becomes a closed contract instead of a loose questionnaire.

- [ ] **Step 2: Add the minimum fact set**

Insert the required facts:

```markdown
- titulaire ou categorie de titulaire
- prestation / enregistrement / publication identifie
- acte d'exploitation vise
- role du producteur, diffuseur, plateforme ou OGC
- territoire
- sources consultees et datees
```

And optional facts:

```markdown
- contrat ou clause
- preuve de fixation / publication
- adhesion OGC et posture de repartition
- signal IA ou NFT documente
- indices de remuneration equitable
```

Expected: the skill can refuse weak neighboring-rights dossiers without inventing facts.

- [ ] **Step 3: Add the `Neighboring Rights Readiness Gate`**

Create a gate with:

```markdown
- `ready`
- `partial`
- `blocked`
```

And explicit block conditions for:

```markdown
- aucun titulaire ou categorie de titulaire identifiable
- aucun acte d'exploitation cible formulable
- `rights_chain_status = blocked`
- sujet reel principalement auteur, contrat global, ou contentieux
- aucune source effectivement consultee et datee ne peut etre documentee
```

Expected: the skill can stop cleanly before outputting a false-positive analysis.

- [ ] **Step 4: Preserve provisional markers**

State clearly that `partial` outputs must keep:

```markdown
- `[PROVISOIRE]`
- `[a verifier]`
- `[A COMPLETER]`
```

Expected: partial analyses stay visibly incomplete.

### Task 4: Rebuild the core neighboring-rights logic and bounded secondary branches

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/droits-voisins-ogc/SKILL.md`

- [ ] **Step 1: Reframe the rights-holder core**

Restructure the analysis around:

```markdown
- artistes-interpretes
- producteurs de phonogrammes
- producteurs de videogrammes
- entreprises de communication audiovisuelle
- editeurs de presse quand reellement pertinents
```

Expected: rights-holder qualification becomes a stable review block instead of a broad catalogue.

- [ ] **Step 2: Reframe exploitation and collective-management logic**

Make the core sections explicitly cover:

```markdown
- acte d'exploitation cible
- consentement / autorisation necessaire
- duree / remuneration equitable
- OGC / mandat / repartition / direct licensing
```

Expected: OGC and remuneration logic are consistent and reusable.

- [ ] **Step 3: Add the bounded `gen-ai-signal` branch**

Add a short branch that says the skill may:

```markdown
- signal output protectability doubt
- signal training / opt-out / style-mimicry risk
- reroute if the dominant issue becomes AI compliance or AI contracting
```

Expected: AI analysis stays bounded and subordinate.

- [ ] **Step 4: Add the bounded `nft-signal` branch**

Add a short branch that says the skill may:

```markdown
- remind that NFT minting does not transfer rights
- signal mint-without-authorization risk
- signal title confusion
- reroute if the dominant issue becomes contract or litigation
```

Expected: NFT analysis remains bounded and subordinate.

### Task 5: Stabilize the 9-block output and decision routing

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/droits-voisins-ogc/SKILL.md`

- [ ] **Step 1: Replace the V1 report format with the 9-block V2 output**

Add exactly these blocks:

```markdown
1. `Case Snapshot`
2. `Neighboring Rights Readiness Gate`
3. `Rights Holder And Title Chain`
4. `Exploitation And Consent Map`
5. `Duration And Remuneration Posture`
6. `OGC And Collective Management Posture`
7. `Emerging Signal`
8. `Decision Routing`
9. `Human Validation`
```

Expected: every output follows one stable surface.

- [ ] **Step 2: Close the routing list**

Limit the final routing to:

```markdown
- `proceed-with-neighboring-rights-brief`
- `clarify-title-chain`
- `clarify-exploitation-scope`
- `review-ogc-membership-and-remuneration`
- `route-to-work-qualification`
- `route-to-copyright-license`
- `route-to-copyright-assignment`
- `route-to-copyright-infringement`
- `route-to-pi-litigation`
- `hold-insufficient-basis`
```

Expected: no open-ended routing remains.

- [ ] **Step 3: Add the adjacency boundaries**

Make the routing notes explicitly cover:

```markdown
- originalite / oeuvre -> `qualification-oeuvre`
- licence -> `licence-droit-auteur`
- cession / title cleanup -> `cession-droit-auteur`
- atteinte auteur -> `contrefacon-droit-auteur`
- strategie judiciaire -> `contentieux-pi`
- contrat PI large -> `contrats-pi`
```

Expected: neighboring-rights routing closes cleanly against the rest of the plugin.

- [ ] **Step 4: Review the stabilized output diff**

Run:

```powershell
git diff -- plugins/hacienda-propriete-intellectuelle/skills/droits-voisins-ogc/SKILL.md
```

Expected: the 9-block output and closed routing are visible.

### Task 6: Add the compact routing/output memo

**Files:**
- Create: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/droits-voisins-ogc/references/droits-voisins-ogc-routing-and-output.md`

- [ ] **Step 1: Create the memo structure**

Create sections:

```markdown
# Droits Voisins OGC V2 - Routing and Output
## Role and non-goals
## Closed intake contract
## Neighboring Rights Readiness Gate
## Core logic summary
## Risk matrix
## Closed routing list
## 9-block output
```

Expected: the memo mirrors the V2 contract in a compact reference.

- [ ] **Step 2: Fill the memo with V2 content**

Summarize:

```markdown
- core rights-holder tracks
- OGC / remuneration posture
- bounded AI / NFT signals
- gate meanings
- routing reminders to adjacent skills
```

Expected: the working memo is enough to steer the skill without rereading the full file.

- [ ] **Step 3: Add the risk matrix**

Cover at least:

```markdown
- clear holder / clear exploitation / clear OGC issue -> proceed
- title-chain weakness -> clarify-title-chain
- exploitation ambiguity -> clarify-exploitation-scope
- OGC / remuneration ambiguity -> review-ogc-membership-and-remuneration
- dominant auteur issue -> route-to-work-qualification or route-to-copyright-infringement
- missing factual base -> hold-insufficient-basis
```

Expected: routing pressure cases are visible at a glance.

- [ ] **Step 4: Check the new memo**

Run:

```powershell
Get-Content plugins/hacienda-propriete-intellectuelle/skills/droits-voisins-ogc/references/droits-voisins-ogc-routing-and-output.md
```

Expected: the memo is complete, compact, and aligned with the main skill.

### Task 7: Align README and changelog

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Update the README inventory entry**

Replace the bare legacy mention with a V2 summary that says:

```markdown
- strict neighboring-rights + OGC core
- `Neighboring Rights Readiness Gate`
- bounded `gen-ai-signal` and `nft-signal`
- explicit boundaries with auteur, contracts, and litigation
```

Expected: the public plugin inventory reflects the new contract.

- [ ] **Step 2: Update the README current-version section**

Add a version note that mentions:

```markdown
- V2 migration of `droits-voisins-ogc`
- strict neighboring-rights / OGC identity
- stable output and closed routing
```

Expected: the README public version note matches the migration.

- [ ] **Step 3: Add the changelog entry**

Add a new top entry summarizing:

```markdown
- V2 migration
- closed intake contract
- `Neighboring Rights Readiness Gate`
- bounded AI / NFT signals
- routing memo
- explicit frontiers
```

Expected: changelog records the migration at plugin level.

- [ ] **Step 4: Review documentation diff**

Run:

```powershell
git diff -- plugins/hacienda-propriete-intellectuelle/README.md plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
```

Expected: README/changelog only describe the approved V2 behavior.

### Task 8: Verify, clean, and integrate

**Files:**
- Verify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/droits-voisins-ogc/SKILL.md`
- Verify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/droits-voisins-ogc/references/droits-voisins-ogc-routing-and-output.md`
- Verify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/README.md`
- Verify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Run the repository checks in the worktree**

Run:

```powershell
git diff --check
npm test
npm run typecheck
npm run build
npm run branding:check
```

Expected: all commands pass; only known simulated PISTE `401/403/503` logs may appear during tests.

- [ ] **Step 2: Remove unrelated generated noise**

Run if needed:

```powershell
git restore -- package-lock.json plugins/hacienda-propriete-intellectuelle/mcp-server/dist/index.js plugins/hacienda-propriete-intellectuelle/mcp-server/dist/version.js plugins/hacienda-sources-officielles/mcp-server/dist/index.js
```

Expected: the diff contains only the V2 neighboring-rights files.

- [ ] **Step 3: Stage and commit the migration**

Run:

```powershell
git add docs/superpowers/specs/2026-05-20-hacienda-pi-droits-voisins-ogc-v2-design.md docs/superpowers/plans/2026-05-21-hacienda-pi-droits-voisins-ogc-v2.md plugins/hacienda-propriete-intellectuelle/skills/droits-voisins-ogc/SKILL.md plugins/hacienda-propriete-intellectuelle/skills/droits-voisins-ogc/references/droits-voisins-ogc-routing-and-output.md plugins/hacienda-propriete-intellectuelle/README.md plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
git commit -m "feat: restructure neighboring rights OGC skill"
```

Expected: one focused commit in the worktree branch.

- [ ] **Step 4: Merge and push**

Run from the main checkout:

```powershell
git merge --ff-only codex/droits-voisins-ogc-v2
git push origin main
npx gitnexus analyze
```

Expected: `main` is updated, pushed, and GitNexus is refreshed.

## Self-Review

- Spec coverage: the plan covers the V2 role boundary, closed intake, readiness gate, bounded `gen-ai-signal` / `nft-signal`, 9-block output, closed routing, memo, README, and changelog.
- Placeholder scan: no `TODO`, `TBD`, or open-ended “handle appropriately” instructions remain.
- Type consistency: intake fields, gate name, routing names, and output-block names are consistent with the approved spec.
