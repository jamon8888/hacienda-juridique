# Contentieux PI V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure `contentieux-pi` into a judicial-only PI litigation skill with explicit contentious tracks, procedure stages, and stable strategy outputs.

**Architecture:** Keep `plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md` as the only public entrypoint, but refactor it around a strict judicial trigger, explicit `contentious_track` and `procedure_stage` dimensions, and a fixed eight-block output contract. Add one focused reference file to stabilize routing boundaries and track/stage mapping, then realign plugin docs so `contentieux-pi` no longer overlaps with `strategie-defense-pi`, `tri-contrefacon`, `mise-en-demeure-pi`, or `depot-preuve-creation`.

**Tech Stack:** Markdown skills, Hacienda PI plugin conventions, existing README/changelog docs, repo verification via npm/vitest/tsc/build scripts.

---

## File Structure

- Modify: `plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md`
  - Rework positioning, inputs, routing boundaries, tracks, procedure stages, and output contract.
- Create: `plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/references/contentieux-pi-tracks-and-routing.md`
  - Short helper for judicial trigger, routing boundaries, track definitions, and mandatory output blocks.
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
  - Reposition `contentieux-pi` in the capability list if its role changes visibly.
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
  - Record the V2 restructuring.

Read for context only unless contradiction requires a doc fix:

- `plugins/hacienda-propriete-intellectuelle/skills/strategie-defense-pi/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/tri-contrefacon/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/mise-en-demeure-pi/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/depot-preuve-creation/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/analyse-refus-inpi/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/tableau-contrefacon-brevet/SKILL.md`

## Task 1: Baseline and Judicial Boundary Lock

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md`
- Read:
  - `plugins/hacienda-propriete-intellectuelle/skills/strategie-defense-pi/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/skills/mise-en-demeure-pi/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/skills/tri-contrefacon/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/skills/depot-preuve-creation/SKILL.md`

- [ ] **Step 1: Snapshot the current `contentieux-pi` skill**

Run:

```powershell
Get-Content "plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md" | Select-Object -First 320
```

Expected: confirm the current file still includes pre-contentious branches such as transaction, mise en demeure, or mediation alongside judicial strategy.

- [ ] **Step 2: Snapshot the neighboring routing boundaries**

Run:

```powershell
Get-Content "plugins/hacienda-propriete-intellectuelle/skills/strategie-defense-pi/SKILL.md" | Select-Object -First 200
Get-Content "plugins/hacienda-propriete-intellectuelle/skills/mise-en-demeure-pi/SKILL.md" | Select-Object -First 180
Get-Content "plugins/hacienda-propriete-intellectuelle/skills/tri-contrefacon/SKILL.md" | Select-Object -First 180
Get-Content "plugins/hacienda-propriete-intellectuelle/skills/depot-preuve-creation/SKILL.md" | Select-Object -First 180
```

Expected: confirm those skills already own triage, letter drafting, and proof-building.

- [ ] **Step 3: Lock the exact public dimension names**

Use these exact values in the implementation:

```text
mode:
- attack
- defense

contentious_track:
- brevet-infringement
- marque-infringement
- dm-infringement
- copyright-infringement
- nullity-revocation
- unfair-competition
- appeal

procedure_stage:
- pre-filing
- urgent-relief
- on-the-merits
- pending-case
- appeal-window
- appeal-ongoing
```

Expected: no drift in naming later in the file or docs.

## Task 2: Rewrite Positioning and Entry Conditions

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md`

- [ ] **Step 1: Replace the top-level positioning block**

Insert a new opening block shaped like this:

```markdown
> **Strategie judiciaire et pilotage procedurale, pas acte de procedure ni
> simple precontentieux.**
>
> `contentieux-pi` commence quand le dossier a deja bascule dans une logique
> judiciaire ou quasi judiciaire. Il ne remplace pas `strategie-defense-pi`,
> `mise-en-demeure-pi`, `tri-contrefacon` ou `depot-preuve-creation`.
```

Expected: the first screen immediately makes the judicial-only scope visible.

- [ ] **Step 2: Add an explicit judicial trigger section**

Create a `## Scope Trigger` section that states the skill applies when at least one of these is true:

```markdown
1. assignation deja recue ou preparee
2. refere envisage ou deja lance
3. procedure au fond deja decidee ou quasi decidee
4. recours contre decision deja dans la fenetre procedurale
5. besoin d'un pilotage judiciaire, budgetaire et calendrier d'affaire
```

Expected: the skill no longer starts from vague contentieux-like situations.

- [ ] **Step 3: Remove pre-contentious-only framing**

Delete or rewrite any section that makes `contentieux-pi` the default place for:

```markdown
- simple mise en demeure
- negotiation precontentieuse simple
- mediation as first-line branch
- evidence collection before a real litigation decision
```

Expected: the skill stops competing with upstream skills.

## Task 3: Replace the Input Contract

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md`

- [ ] **Step 1: Replace the old intake with the V2 judicial intake**

Add a required input section with these exact fields:

```markdown
1. `mode`
2. `contentious_track`
3. `procedure_stage`
4. `rights_at_issue`
5. `parties`
6. `forum`
7. `known_facts`
8. `evidence_status`
9. `business_objective`
```

Then add useful complements:

```markdown
- urgence business
- budget disponible
- portefeuille ou titres relies
- risques reconventionnels connus
- calendrier externe
```

Expected: `contentieux-pi` now starts from a litigation-grade input contract instead of a generic enforcement intake.

- [ ] **Step 2: Keep `mode` limited to judicial posture**

Retain only:

```markdown
attack
defense
```

Expected: avoid inventing hybrid posture labels.

- [ ] **Step 3: Add a note for incomplete judicial inputs**

Add guidance in the intake section saying that if `forum`, `procedure_stage`, or `evidence_status` is unclear, the skill must reduce the confidence of its recommendation and mark the gap `[a verifier]`.

Expected: safer degradation when the case is not fully formed.

## Task 4: Add Judicial Routing Boundaries

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md`
- Create: `plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/references/contentieux-pi-tracks-and-routing.md`

- [ ] **Step 1: Insert a `## Routing Boundaries` section**

Add these exact subsection titles:

```markdown
### Route to `tri-contrefacon`
### Route to `mise-en-demeure-pi`
### Route to `depot-preuve-creation`
### Route to `strategie-defense-pi`
### Stay in `contentieux-pi`
```

Expected: the neighboring skill contract is visible in one place.

- [ ] **Step 2: Define the routing rules concisely**

For each subsection, include rules in this shape:

```markdown
### Route to `tri-contrefacon`
- suspicion ou signal d'atteinte
- intake enforcement encore faible
- pas de decision procedurale prise
```

And:

```markdown
### Stay in `contentieux-pi`
- dossier deja judiciaire ou quasi judiciaire
- besoin de choix de voie procedurale
- besoin de pilotage affaire / budget / calendrier
```

Expected: readers can decide quickly whether the skill is the right entrypoint.

- [ ] **Step 3: Create the routing helper reference**

Create `plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/references/contentieux-pi-tracks-and-routing.md` with these sections:

```markdown
# Contentieux PI - tracks and routing

## 1. When to stay in contentieux-pi
- assignation
- refere
- fond
- recours
- pilotage procedurale

## 2. When to route away
- tri-contrefacon
- mise-en-demeure-pi
- depot-preuve-creation
- strategie-defense-pi

## 3. Core output blocks
- Case Snapshot
- Forum and Admissibility
- Claims and Defenses Map
- Evidence and Proof Gaps
- Procedural Strategy
- Budget Timing and Exposure
- Decision Memo
- Human Validation
```

Expected: the skill gets one short reference instead of repeating the same routing logic in multiple places.

## Task 5: Add Track-Based Structure

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md`

- [ ] **Step 1: Add a `## Contentious Tracks` section**

Create one subsection per track in this shape:

```markdown
### `brevet-infringement`

Couvre:
- action en contrefacon brevet
- refere-interdiction brevet
- defense a action brevet
- articulation avec nullite reconventionnelle

Enjeux dominants:
- competence TJ Paris
- validite du titre
- equivalence / technique
- expert judiciaire
- prejudice
```

Repeat the same structure for:

```markdown
marque-infringement
dm-infringement
copyright-infringement
nullity-revocation
unfair-competition
appeal
```

Expected: the file becomes navigable by litigation track instead of reading as one undifferentiated procedure memo.

- [ ] **Step 2: Preserve the substantive tables where they belong**

Keep or rehome existing useful doctrine for:

```markdown
- competence
- recevabilite
- prejudice
- prescription
- moyens de defense
```

Expected: V2 remains substantively useful while being structurally clearer.

## Task 6: Add Procedure Stage Structure

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md`

- [ ] **Step 1: Add a `## Procedure Stages` section**

Create one subsection per stage with this shape:

```markdown
### `pre-filing`

Le contentieux est decide ou presque, mais l'assignation n'est pas encore
partie. Le skill prepare la logique contentieuse, pas la lettre.
```

Repeat for:

```markdown
urgent-relief
on-the-merits
pending-case
appeal-window
appeal-ongoing
```

Expected: the user can see that the skill output changes with procedural maturity.

- [ ] **Step 2: Tie stage to procedural priorities**

For each stage, add short bullets clarifying the main emphasis, for example:

```markdown
- urgent-relief -> urgence, mesure provisoire, preuve immediate, calendrier court
- on-the-merits -> articulation demandes/moyens, budget, duree, preuve au fond
- appeal-window -> delai, interet a agir, chances, cout, effet strategique
```

Expected: stage is not just a label; it affects the work product.

## Task 7: Normalize the Output Contract

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md`

- [ ] **Step 1: Add common output rules**

Add a `## Common Output Rules` section requiring separation of:

```markdown
1. faits etablis
2. allegations ou hypotheses
3. pieces consultees
4. pieces manquantes
5. risques proceduraux
6. risques business
7. validation humaine obligatoire
```

Expected: outputs stop blending evidence and assumptions.

- [ ] **Step 2: Replace the old output format with the V2 block contract**

Add this exact ordered list:

```markdown
1. `Case Snapshot`
2. `Forum and Admissibility`
3. `Claims and Defenses Map`
4. `Evidence and Proof Gaps`
5. `Procedural Strategy`
6. `Budget Timing and Exposure`
7. `Decision Memo`
8. `Human Validation`
```

Expected: the skill gets a stable reusable format across all tracks.

- [ ] **Step 3: Add decision memo branches by posture**

Document the expected `Decision Memo` outputs:

```markdown
Attack:
- go
- go conditionnel
- settle first
- no-go

Defense:
- contest and defend
- defend and negotiate
- challenge title
- contain and settle
- no-substantive-response-at-this-stage

Appeal:
- appeal
- appeal if conditions met
- no appeal
- negotiate instead
```

Expected: the final recommendation becomes explicit and comparable from case to case.

## Task 8: Tighten Guardrails

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md`

- [ ] **Step 1: Add limiting conditions**

Insert a `## Error Handling and Guardrails` section with these triggers:

```markdown
- forum non identifie
- titre ou droit invoque flou
- pieces probatoires trop faibles
- stade procedurale incertain
- objectif business non clarifie
- calendrier ou urgence inconnus alors qu'ils conditionnent le choix
```

Expected: the skill visibly scales back when litigation readiness is weak.

- [ ] **Step 2: Add the safe-response rule**

Include this exact rule shape:

```markdown
1. expliciter l'hypothese
2. marquer `[a verifier]`
3. reduire les recommandations offensives ou irreversibles
4. router en amont si le dossier n'est pas encore contentieux en realite
```

Expected: no overconfident litigation recommendation from weak inputs.

## Task 9: Realign Plugin Documentation

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Update the README positioning**

Add or revise the `contentieux-pi` description so it reads in substance like:

```markdown
- `contentieux-pi` : strategie judiciaire PI, structuree par track contentieux
  et stade procedurale, distincte du triage, de la lettre et de la collecte
  probatoire
```

Expected: the README reflects the judicial-only role.

- [ ] **Step 2: Add a changelog entry**

Add a concise changelog bullet set covering:

```markdown
- `contentieux-pi` passe d'un flux mixte a un scope judiciaire strict
- introduction de `contentious_track` et `procedure_stage`
- frontiere explicite avec `strategie-defense-pi`, `tri-contrefacon`,
  `mise-en-demeure-pi` et `depot-preuve-creation`
```

Expected: the repo history explains the structural change.

## Task 10: Verify the Change Set

**Files:**
- Verify:
  - `plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/references/contentieux-pi-tracks-and-routing.md`
  - `plugins/hacienda-propriete-intellectuelle/README.md`
  - `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
  - `docs/superpowers/specs/2026-05-19-hacienda-pi-contentieux-v2-design.md`

- [ ] **Step 1: Run targeted diff hygiene**

Run:

```powershell
git diff --check -- "plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md" "plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/references/contentieux-pi-tracks-and-routing.md" "plugins/hacienda-propriete-intellectuelle/README.md" "plugins/hacienda-propriete-intellectuelle/CHANGELOG.md" "docs/superpowers/specs/2026-05-19-hacienda-pi-contentieux-v2-design.md"
```

Expected: no patch-format or whitespace issues, aside from possible CRLF warnings on Windows.

- [ ] **Step 2: Run repo verification**

Run:

```powershell
npm test
npm run typecheck
npm run build
npm run branding:check
git diff --check
```

Expected: all commands pass; if a pre-existing unrelated failure appears, record it explicitly before committing.

- [ ] **Step 3: Sanity-check the new judicial contract**

Run:

```powershell
rg -n "brevet-infringement|marque-infringement|nullity-revocation|urgent-relief|Case Snapshot|Decision Memo|strategie-defense-pi|mise-en-demeure-pi|tri-contrefacon|depot-preuve-creation" plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi plugins/hacienda-propriete-intellectuelle/README.md plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
```

Expected: all new track names, stage names, output block names, and routing references appear where intended and nowhere contradictory.

## Self-Review

Spec coverage checked:

- judicial-only repositioning -> Tasks 2 and 4
- new input contract -> Task 3
- new `contentious_track` / `procedure_stage` dimensions -> Tasks 5 and 6
- stable output blocks -> Task 7
- stricter guardrails -> Task 8
- doc alignment -> Task 9
- repo verification -> Task 10

Placeholder scan:

- no placeholder markers
- no forward references without a defining task

Type consistency:

- `mode` remains `attack` / `defense`
- `contentious_track` labels are fixed in Task 1 and reused later
- `procedure_stage` labels are fixed in Task 1 and reused later
- output block labels are introduced once and reused verbatim

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-19-hacienda-pi-contentieux-v2.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
