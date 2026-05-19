# Analyse Opposition Marque V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure `analyse-opposition-marque` into a strict INPI opposition-analysis skill with an explicit V2 input contract, explicit routing boundaries, a bounded settlement/coexistence branch, and a fixed output contract.

**Architecture:** Keep `plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/SKILL.md` as the only public entrypoint for INPI opposition work. Do not turn it into a broader trademark orchestrator. Instead, stabilize the skill around a V2 intake, a visible procedural gate, a structured decomposition of opposition grounds, and a closed `Decision Routing` block. Treat coexistence/transaction as a secondary strategic branch inside the opposition workflow, not as a peer mode.

**Tech Stack:** Markdown skills, Hacienda PI plugin conventions, existing README/changelog docs, repo verification via npm/vitest/tsc/build scripts.

---

## File Structure

- Modify: `plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/SKILL.md`
  - Rework positioning, V2 intake, routing boundaries, coexistence branch, and output contract.
- Create: `plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/references/analyse-opposition-marque-routing-and-output.md`
  - Short helper for intake dimensions, procedural gate, route boundaries, and mandatory output blocks.
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
  - Reposition the skill in the public capabilities list if the V2 role changes visibly.
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
  - Record the V2 restructuring.

Read for context only unless contradiction requires a doc fix:

- `plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-marque/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/surveillance-marque/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/depot-marque-fr/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md`

## Task 1: Baseline and Opposition-INPI Boundary Lock

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/SKILL.md`
- Read:
  - `plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-marque/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/skills/surveillance-marque/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/skills/depot-marque-fr/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md`

- [ ] **Step 1: Snapshot the current opposition skill**

Run:

```powershell
Get-Content "plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/SKILL.md" | Select-Object -First 360
```

Expected: confirm the current file already has strong doctrine and guardrails, but still presents intake and outputs in a broad procedural memo style.

- [ ] **Step 2: Snapshot neighboring trademark workflow boundaries**

Run:

```powershell
Get-Content "plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-marque/SKILL.md" | Select-Object -First 220
Get-Content "plugins/hacienda-propriete-intellectuelle/skills/surveillance-marque/SKILL.md" | Select-Object -First 220
Get-Content "plugins/hacienda-propriete-intellectuelle/skills/depot-marque-fr/SKILL.md" | Select-Object -First 220
Get-Content "plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md" | Select-Object -First 220
```

Expected: confirm those skills already own first-pass search, monitoring, filing preparation, and judicial escalation.

- [ ] **Step 3: Lock the public V2 dimension names**

Use these exact values in the implementation:

```text
mode:
- form
- respond

opposition_basis:
- likelihood-of-confusion
- reputation
- other-prior-right
- mixed

procedure_stage:
- pre-filing-window
- drafting
- filed-waiting-response
- response-window
- reply-phase
- decision-pending

filing_deadline_status:
- green
- amber
- red
- expired

evidence_strength:
- strong
- mixed
- weak
- unknown
```

Expected: no drift in names later in the skill, helper note, or docs.

## Task 2: Rewrite Positioning and V2 Intake

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/SKILL.md`

- [ ] **Step 1: Preserve and foreground the official-procedure guardrail**

Keep the top-level warning in this shape:

```markdown
> **Analyse argumentaire, pas procedure officielle.**
> Cette sortie prepare l'opposition ou la defense INPI, mais ne depose pas la
> tele-procedure officielle et ne remplace pas la validation d'un mandataire
> ou d'un avocat.
```

Expected: the first screen still makes it impossible to mistake the skill for a filed act.

- [ ] **Step 2: Add a V2 input contract section near the mode intake**

Insert a dedicated section in this shape:

```markdown
## Contrat d'entree V2

- `mode`
- `opposition_basis`
- `procedure_stage`
- `filing_deadline_status`
- `evidence_strength`

Bloc de faits:
- `target_mark`
- `opposing_rights`
- `publication_or_notification_date`
- `goods_services_overlap`
- `argument_scope`
- `settlement_posture`
- `search_and_record_limitations`
```

Expected: the intake becomes a stable contract instead of a narrative-only questionnaire.

- [ ] **Step 3: Keep the practical intake but map it to the V2 dimensions**

Refactor the existing intake instructions so they still gather:

```markdown
- numero marque attaquee ou opposee
- date de publication ou notification
- droits anterieurs invoques
- motifs retenus
- strategie ou position envisagee
- posture transaction / coexistence
```

But add mapping guidance such as:

```markdown
- opposition en preparation avant depot INPI => `procedure_stage: pre-filing-window`
- dossier d'opposition en cours de redaction => `procedure_stage: drafting`
- notification recue + memoire defense a preparer => `procedure_stage: response-window`
- moins de 7 jours restants => `filing_deadline_status: red`
- pieces fortes sur usage / renommee / similitude => `evidence_strength: strong`
```

Expected: the skill stays practical while producing normalized structure.

## Task 3: Add Procedural Gate and Grounds Coverage Framing

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/SKILL.md`

- [ ] **Step 1: Create a dedicated `Procedure Gate` framing**

Add or rewrite a section so the skill explicitly records:

```markdown
- type de dossier (`form` / `respond`)
- point de depart du delai
- statut du delai (`green` / `amber` / `red` / `expired`)
- suffisance ou insuffisance des donnees procedurales
- risque de dossier incomplet ou hors delai
```

Expected: the procedural perimeter is visible before doctrinal argument mapping.

- [ ] **Step 2: Keep the grounds analysis but make its output contract explicit**

Add wording in this shape:

```markdown
Pour chaque motif invoque ou oppose, produire :
- droit anterieur invoque
- branche juridique pertinente
- force apparente
- pieces critiques
- points de fragilite
```

Expected: the doctrine remains rich, but under a repeatable V2 structure.

- [ ] **Step 3: Make the settlement/coexistence branch explicitly subordinate**

Add a V2 rule in this shape:

```markdown
La coexistence ou la transaction est une issue strategique secondaire.
Elle ne remplace jamais silencieusement l'analyse opposition.
Elle ne doit etre proposee que si elle est coherente avec le delai, la force
probatoire, la posture du dossier et l'objectif business.
```

Expected: the skill stops drifting toward a parallel coexistence workflow.

## Task 4: Add Routing Boundaries and Fixed Output

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/SKILL.md`
- Create: `plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/references/analyse-opposition-marque-routing-and-output.md`

- [ ] **Step 1: Insert a `## Routing Boundaries` section**

Add these exact subsection titles:

```markdown
### Route to `recherche-anteriorite-marque`
### Route to `surveillance-marque`
### Route to `depot-marque-fr`
### Route to `contentieux-pi`
### Stay in `analyse-opposition-marque`
```

Expected: the handoffs are visible in one place.

- [ ] **Step 2: Define the routing rules concisely**

For each subsection, use rules in this shape:

```markdown
### Route to `recherche-anteriorite-marque`
- pas encore de publication BOPI exploitable
- pas encore de notification d'opposition
- besoin principal = premier passage sur le signe
```

And:

```markdown
### Route to `contentieux-pi`
- dossier deja hors simple opposition INPI
- recours ou escalation judiciaire envisage
- besoin principal = strategie contentieuse formelle
```

Expected: the next workflow becomes deterministic enough for internal use.

- [ ] **Step 3: Replace the tail of the skill with the V2 output contract**

Add a fixed output section with these exact blocks:

```markdown
1. `Procedure Gate and Deadline`
2. `Rights and Grounds Snapshot`
3. `Arguments and Counter-Arguments Map`
4. `Evidence and Record Gaps`
5. `Procedural Strategy`
6. `Settlement and Coexistence Option`
7. `Decision Routing`
8. `Human Validation`
```

And restrict `Decision Routing` to:

```markdown
- `file-opposition`
- `prepare-defense`
- `seek-coexistence`
- `limit-goods-services`
- `escalate-to-contentieux`
- `insufficient-record`
- `deadline-critical`
```

Expected: the skill now matches the V2 formatting pattern used by the rest of the plugin.

- [ ] **Step 4: Create the routing/output helper note**

Create `plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/references/analyse-opposition-marque-routing-and-output.md` with these sections:

```markdown
# Analyse opposition marque - routing and output

## 1. V2 intake dimensions
- mode
- opposition_basis
- procedure_stage
- filing_deadline_status
- evidence_strength

## 2. Procedural gate minimum
- delai
- statut du dossier
- fondement principal
- limites du dossier

## 3. Route boundaries
- recherche-anteriorite-marque
- surveillance-marque
- depot-marque-fr
- contentieux-pi

## 4. Output blocks
- Procedure Gate and Deadline
- Rights and Grounds Snapshot
- Arguments and Counter-Arguments Map
- Evidence and Record Gaps
- Procedural Strategy
- Settlement and Coexistence Option
- Decision Routing
- Human Validation

## 5. Closed Decision Routing values
- file-opposition
- prepare-defense
- seek-coexistence
- limit-goods-services
- escalate-to-contentieux
- insufficient-record
- deadline-critical
```

Expected: the skill has a short stable helper like the other V2 skills.

## Task 5: Realign Public Plugin Docs

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Update the README skill description**

Revise the `analyse-opposition-marque` bullet so it reads in this shape:

```markdown
- `analyse-opposition-marque` : opposition INPI V2, structuree autour du
  gate procedurale, des droits et motifs invoques, des arguments
  contradictoires, et d'une branche coexistence/transaction bornee
```

Expected: the README reflects the strict opposition role.

- [ ] **Step 2: Add changelog bullets for the V2 restructuring**

Add bullets in this shape:

```markdown
- `analyse-opposition-marque` passe en V2 avec contrat d'entree explicite
  (`mode`, `opposition_basis`, `procedure_stage`,
  `filing_deadline_status`, `evidence_strength`)
- la procedure et les motifs d'opposition sont exposes sous un gate
  procedural stable
- la branche coexistence/transaction est preservee comme issue secondaire
  et la sortie est normalisee en 8 blocs avec `Decision Routing` borne
```

Expected: changelog captures the visible user-facing changes.

## Task 6: Verification and Scope Hygiene

**Files:**
- Verify:
  - `plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/references/analyse-opposition-marque-routing-and-output.md`
  - `plugins/hacienda-propriete-intellectuelle/README.md`
  - `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Grep for the new V2 contract and routing markers**

Run:

```powershell
rg "opposition_basis|procedure_stage|filing_deadline_status|evidence_strength|Procedure Gate and Deadline|Decision Routing|seek-coexistence|deadline-critical" "plugins/hacienda-propriete-intellectuelle"
```

Expected: hits in the skill, helper note, and docs only where intended.

- [ ] **Step 2: Run the repo verification commands**

Run:

```powershell
npm test
npm run typecheck
npm run build
npm run branding:check
git diff --check
```

Expected: all commands pass; `git diff --check` may still show CRLF warnings only.

- [ ] **Step 3: Check that only the expected opposition V2 surface changed**

Run:

```powershell
git diff --name-only
```

Expected:

```text
docs/superpowers/specs/2026-05-19-hacienda-pi-analyse-opposition-marque-v2-design.md
docs/superpowers/plans/2026-05-19-hacienda-pi-analyse-opposition-marque-v2.md
plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/SKILL.md
plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/references/analyse-opposition-marque-routing-and-output.md
plugins/hacienda-propriete-intellectuelle/README.md
plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
```

If build regenerated unrelated `dist/` files, restore them before staging this feature:

```powershell
git checkout -- "plugins/hacienda-propriete-intellectuelle/mcp-server/dist/index.js" "plugins/hacienda-propriete-intellectuelle/mcp-server/dist/version.js"
git checkout -- "plugins/hacienda-sources-officielles/mcp-server/dist/index.js"
```

Expected: no unrelated runtime artifacts remain in the final diff.
