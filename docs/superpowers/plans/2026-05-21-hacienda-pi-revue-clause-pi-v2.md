# Revue Clause PI V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure `revue-clause-pi` into a strict clause-review V2 skill for PI clauses embedded in broader contracts, with a closed intake, a stable output contract, and explicit routing boundaries.

**Architecture:** Keep `plugins/hacienda-propriete-intellectuelle/skills/revue-clause-pi/SKILL.md` as the single public entrypoint, but rebuild it around a shared `Clause Review Readiness Gate`, closed tracks for contract posture and IP focus, and three bounded modes. Add one compact routing/output memo, then realign plugin docs so the boundary with `contrats-pi` and the neighboring auteur/data/software skills is explicit.

**Tech Stack:** Markdown skills, Hacienda PI plugin conventions, existing README/changelog docs, repo verification via npm/vitest/tsc/build scripts.

---

## File Structure

- Modify: `plugins/hacienda-propriete-intellectuelle/skills/revue-clause-pi/SKILL.md`
  - Rework positioning, intake, readiness gate, mode behavior, routing, and output contract.
- Create: `plugins/hacienda-propriete-intellectuelle/skills/revue-clause-pi/references/revue-clause-pi-routing-and-output.md`
  - Short helper for posture/focus routing and mandatory output blocks.
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
  - Reposition `revue-clause-pi` as an explicit V2 clause-review lane and remove the legacy marker.
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
  - Record the V2 restructuring.

Neighboring skills to read but not rewrite in this lot:

- `plugins/hacienda-propriete-intellectuelle/skills/contrats-pi/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/licence-droit-auteur/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/revue-open-source/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/revue-logiciel-donnees/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/bases-de-donnees/SKILL.md`

## Task 1: Lock the Boundary and Public Positioning

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/revue-clause-pi/SKILL.md`
- Read:
  - `plugins/hacienda-propriete-intellectuelle/skills/contrats-pi/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/README.md`
  - `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Snapshot the current clause-review skill**

Run:

```powershell
Get-Content "plugins/hacienda-propriete-intellectuelle/skills/revue-clause-pi/SKILL.md" | Select-Object -First 240
```

Expected: confirm the current file is V1.0.0, already oriented toward clause review, but still missing a closed V2 contract.

- [ ] **Step 2: Lock the public role**

The opening block must make these points explicit:

```text
- revue ciblee de clauses PI dans un contrat large
- pas contrat PI autonome complet
- sorties = note de revue / issue list / fallback redline
- validation humaine obligatoire avant signature ou redline finale
```

Expected: the first screen distinguishes `revue-clause-pi` from `contrats-pi`.

## Task 2: Close the Intake Contract

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/revue-clause-pi/SKILL.md`

- [ ] **Step 1: Add the exact V2 intake fields**

Use these exact public fields:

```text
mode
contract_posture
ip_clause_focus
our_role
negotiation_posture
source_completeness
```

Expected: no free-form intake is left as the primary contract.

- [ ] **Step 2: Lock the exact enum values**

Use these exact values:

```text
contract_posture:
- msa-services
- sow-deliverables
- saas-platform
- commercial-distribution
- employment-consulting
- procurement-vendor
- partnership-mixed
- other-large-contract

ip_clause_focus:
- ownership-assignment
- license-use-rights
- inventions-improvements
- oss-third-party
- data-database
- ai-model-output
- warranties-indemnities
- confidentiality-trade-secrets
- mixed

negotiation_posture:
- protective
- balanced
- concessionary

source_completeness:
- full-text
- partial-extract
- clause-only
- summary-only
```

Expected: later sections reuse the same names with no drift.

## Task 3: Add the Readiness Gate and Stable Outputs

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/revue-clause-pi/SKILL.md`
- Create: `plugins/hacienda-propriete-intellectuelle/skills/revue-clause-pi/references/revue-clause-pi-routing-and-output.md`

- [ ] **Step 1: Add `Clause Review Readiness Gate`**

Use these exact states:

```text
ready
partial
blocked
```

And make `partial` preserve:

```text
[PROVISOIRE]
[a verifier]
[A COMPLETER]
```

Expected: incomplete files no longer look like final clause reviews.

- [ ] **Step 2: Normalize the common output contract**

Make the required output blocks read in this order:

```text
1. Case Snapshot
2. Clause Review Readiness Gate
3. Clause Map and Source Coverage
4. Risk Findings
5. Negotiation Position
6. Escalation Points
7. Mode-Specific Deliverable
8. Decision Routing
9. Human Validation
```

Expected: every mode lands on the same stable skeleton.

- [ ] **Step 3: Create the compact routing/output memo**

Create `plugins/hacienda-propriete-intellectuelle/skills/revue-clause-pi/references/revue-clause-pi-routing-and-output.md` with these sections:

```markdown
# Revue Clause PI - routing and output

## 1. Contract posture selection
## 2. IP clause focus selection
## 3. When to route away
## 4. Stable output blocks
```

Expected: the skill gets one short reference instead of duplicating routing guidance.

## Task 4: Bound the Modes and Neighbor Routing

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/revue-clause-pi/SKILL.md`

- [ ] **Step 1: Keep exactly three modes**

The public modes remain:

```text
review
fallback-redline
issue-list
```

Expected: no extra mode creep.

- [ ] **Step 2: Route to neighboring skills explicitly**

Add explicit route blocks for:

```text
contrats-pi
licence-droit-auteur
cession-droit-auteur
revue-open-source
revue-logiciel-donnees
bases-de-donnees
contentieux-pi
```

Expected: clause review no longer absorbs broader contract drafting or specialized standalone analyses.

## Task 5: Align Plugin Docs

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Update README capability lines**

Revise the `revue-clause-pi` description so it reads in substance like:

```text
revue-clause-pi : revue ciblee des clauses PI dans les contrats larges, avec issue list, fallback redline et frontiere nette avec contrats-pi
```

Expected: the README reflects the V2 boundary.

- [ ] **Step 2: Remove the legacy status marker**

Replace any remaining `V1 structure` wording for `revue-clause-pi`.

Expected: docs no longer advertise it as an unfinished migration.

- [ ] **Step 3: Add the changelog note**

Record these substantive changes:

```text
- revue-clause-pi passe en V2
- intake ferme
- Clause Review Readiness Gate
- sortie stabilisee
- frontieres explicites avec contrats-pi et les skills specialises
```

Expected: the changelog matches the shipped contract.

## Task 6: Verify the Dual-Lane Contract

**Files:**
- Verify:
  - `plugins/hacienda-propriete-intellectuelle/skills/revue-clause-pi/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/skills/revue-clause-pi/references/revue-clause-pi-routing-and-output.md`
  - `plugins/hacienda-propriete-intellectuelle/README.md`
  - `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Run focused structural checks**

Run:

```powershell
git diff --check -- "plugins/hacienda-propriete-intellectuelle/skills/revue-clause-pi/SKILL.md" "plugins/hacienda-propriete-intellectuelle/skills/revue-clause-pi/references/revue-clause-pi-routing-and-output.md" "plugins/hacienda-propriete-intellectuelle/README.md" "plugins/hacienda-propriete-intellectuelle/CHANGELOG.md"
```

Expected: no whitespace or conflict-marker issues.

- [ ] **Step 2: Grep the key V2 markers**

Run:

```powershell
rg -n "version: \"2.0.0\"|Clause Review Readiness Gate|contract_posture|ip_clause_focus|fallback-redline|issue-list|Decision Routing" plugins/hacienda-propriete-intellectuelle/skills/revue-clause-pi plugins/hacienda-propriete-intellectuelle/README.md plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
```

Expected: all V2 markers appear in the intended files.

- [ ] **Step 3: Summarize spec coverage**

Confirm this mapping before closing:

```text
- strict clause-review core -> Tasks 1 and 4
- closed intake -> Task 2
- readiness gate and stable outputs -> Task 3
- explicit routing boundaries -> Tasks 3 and 4
- README / changelog alignment -> Task 5
```

Expected: no spec gap remains.
