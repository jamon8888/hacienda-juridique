# Contrats PI V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure `contrats-pi` into a family-based PI contract orchestrator with a tighter boundary against `revue-clause-pi` and a more stable output contract.

**Architecture:** Keep `plugins/hacienda-propriete-intellectuelle/skills/contrats-pi/SKILL.md` as the single public entrypoint, but refactor it around one shared intake plus explicit `contract_family` branches. Add one focused reference file for family routing and mandatory output blocks, then realign plugin docs so `contrats-pi` is clearly positioned as the full-contract lane while `revue-clause-pi` remains the clause-review lane.

**Tech Stack:** Markdown skills, Hacienda PI plugin conventions, existing README/changelog docs, repo verification via npm/vitest/tsc/build scripts.

---

## File Structure

- Modify: `plugins/hacienda-propriete-intellectuelle/skills/contrats-pi/SKILL.md`
  - Rework positioning, intake, family structure, and output contract.
- Create: `plugins/hacienda-propriete-intellectuelle/skills/contrats-pi/references/contrats-pi-families-and-routing.md`
  - Short helper for family selection, routing boundaries, and common output blocks.
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
  - Reposition `contrats-pi` in the capability list and legacy/new-structure map if needed.
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
  - Record the V2 restructuring.

Existing neighboring skills to read but not modify unless a contradiction appears:

- `plugins/hacienda-propriete-intellectuelle/skills/revue-clause-pi/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/licence-droit-auteur/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/bases-de-donnees/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/revue-logiciel-donnees/SKILL.md`

## Task 1: Baseline and Boundary Lock

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/contrats-pi/SKILL.md`
- Read:
  - `plugins/hacienda-propriete-intellectuelle/skills/revue-clause-pi/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/README.md`
  - `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Snapshot the current `contrats-pi` skill**

Run:

```powershell
Get-Content "plugins/hacienda-propriete-intellectuelle/skills/contrats-pi/SKILL.md" | Select-Object -First 260
```

Expected: confirm the current file is V1.0.0 with only `--draft` and `--review`, broad family coverage, and no explicit family contract.

- [ ] **Step 2: Snapshot the current `revue-clause-pi` boundary**

Run:

```powershell
Get-Content "plugins/hacienda-propriete-intellectuelle/skills/revue-clause-pi/SKILL.md" | Select-Object -First 140
```

Expected: confirm `revue-clause-pi` already owns clause-level review for broader contracts.

- [ ] **Step 3: Lock the exact family names**

Use these exact `contract_family` values in the implementation:

```text
patent-tech-transfer
nda-secret-knowhow
rnd-collaboration
trademark-coexistence-franchise
mta-life-sciences
```

Expected: later edits reuse these exact names with no drift.

## Task 2: Rewrite Positioning and Intake

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/contrats-pi/SKILL.md`

- [ ] **Step 1: Replace the top-level positioning block**

Insert a new opening block shaped like this:

```markdown
> **Brouillon de contrat PI complet ou note de revue complete, pas acte definitif.**
>
> `contrats-pi` couvre les contrats dont l'objet principal est la propriete
> intellectuelle. Il ne remplace pas `revue-clause-pi`, qui traite les clauses
> PI inserees dans des contrats plus larges.
```

Expected: the first screen clearly distinguishes full PI contracts from clause review.

- [ ] **Step 2: Replace the old intake with the V2 common intake**

Add a required intake section with these exact fields:

```markdown
1. `mode`
2. `contract_family`
3. `parties`
4. `notre_role`
5. `ip_scope`
6. `territory`
7. `duration`
8. `financial_model`
9. `business_context`
10. `jurisdiction`
```

Then add useful complements:

```markdown
- exclusivite
- titres exacts concernes
- contexte precontentieux ou transactionnel
- dependance a des registres d'opposabilite
- contraintes export / concurrence / RGPD
- calendrier de signature ou de closing
```

Expected: `contrats-pi` now starts from a stable intake that can support all target families.

- [ ] **Step 3: Keep mode names simple and explicit**

Retain only these public mode names:

```markdown
draft
review
```

Expected: avoid inventing extra public modes when the real branching happens through `contract_family`.

## Task 3: Add Family-Based Structure

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/contrats-pi/SKILL.md`
- Create: `plugins/hacienda-propriete-intellectuelle/skills/contrats-pi/references/contrats-pi-families-and-routing.md`

- [ ] **Step 1: Add a `## Contract Families` section**

Create one subsection per family with this content shape:

```markdown
### `patent-tech-transfer`

Usage:
- licence de brevet
- cession de brevet
- licence de savoir-faire
- transfert de technologie

Enjeux dominants:
- perimetre des titres
- exclusivite
- royalties
- grant-back
- registres
- TTBER / art. 101 TFUE
```

Repeat the same structure for:

```markdown
nda-secret-knowhow
rnd-collaboration
trademark-coexistence-franchise
mta-life-sciences
```

Expected: the file becomes navigable by family instead of reading as one long undifferentiated contract memo.

- [ ] **Step 2: Add a visible routing boundary section**

Insert a `## Routing Boundaries` section with three blocks:

```markdown
### Route to `revue-clause-pi`
### Route to auteur/data/software skills
### Stay in `contrats-pi`
```

For `Route to revue-clause-pi`, include:

```markdown
- la PI n'est qu'un bloc d'un contrat plus large
- la sortie attendue est une note de revue ciblee
- il faut une fallback redline sur quelques clauses
```

Expected: the user can see when not to use `contrats-pi`.

- [ ] **Step 3: Create the routing helper reference**

Create `plugins/hacienda-propriete-intellectuelle/skills/contrats-pi/references/contrats-pi-families-and-routing.md` with these sections:

```markdown
# Contrats PI - families and routing

## 1. Family selection
- patent-tech-transfer
- nda-secret-knowhow
- rnd-collaboration
- trademark-coexistence-franchise
- mta-life-sciences

## 2. When to route away
- revue-clause-pi
- cession-droit-auteur
- licence-droit-auteur
- bases-de-donnees
- revue-logiciel-donnees

## 3. Common output blocks
- Contract Snapshot
- Critical PI Terms
- Registration and Opposability Actions
- Competition and Regulatory Issues
- Human Validation
```

Expected: the skill gains one short reusable reference instead of repeating the routing logic in several scattered places.

## Task 4: Normalize the Output Contract

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/contrats-pi/SKILL.md`

- [ ] **Step 1: Replace the old generic output section with common rules**

Add a `## Common Output Rules` section stating that every output must separate:

```markdown
1. faits lus
2. hypotheses
3. clauses ou informations manquantes
4. risques juridiques
5. arbitrages business
6. formalites / actions post-signature
7. validation humaine obligatoire
```

Expected: outputs stop mixing established facts and assumptions.

- [ ] **Step 2: Define the exact required blocks for `draft`**

Add this list verbatim:

```markdown
1. `Contract Snapshot`
2. `Clause Architecture`
3. `Critical PI Terms`
4. `Registration and Opposability Actions`
5. `Competition and Regulatory Issues`
6. `Negotiation Variables`
7. `Draft Contract`
8. `Human Validation`
```

Expected: the drafting output becomes more stable and easier to review.

- [ ] **Step 3: Define the exact required blocks for `review`**

Add this list verbatim:

```markdown
1. `Contract Snapshot`
2. `Critical PI Terms`
3. `Issue List`
4. `Registration and Opposability Actions`
5. `Competition and Regulatory Issues`
6. `Negotiation Position`
7. `Red Flags and Missing Inputs`
8. `Human Validation`
```

Expected: review outputs become clearly distinct from drafting outputs.

## Task 5: Tighten Guardrails

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/contrats-pi/SKILL.md`

- [ ] **Step 1: Add missing-input guardrails**

Insert a `## Error Handling and Guardrails` section with these limiting conditions:

```markdown
- titres ou actif PI non identifies
- territoire inconnu
- role exact des parties non etabli
- texte contractuel incomplet en `review`
- structure financiere non connue alors qu'elle conditionne le montage
- contrainte concurrence plausible mais parts de marche inconnues
```

Then add the response rule:

```markdown
1. expliciter l'hypothese
2. marquer la zone `[a verifier]`
3. reduire toute recommandation agressive ou definitive
```

Expected: the skill degrades safely when the contract file or business context is incomplete.

- [ ] **Step 2: Recheck the formalities and competition sections**

While editing, ensure the existing substantive tables remain available for:

```markdown
- formalites d'opposabilite
- TTBER
- art. 101 TFUE
- accords R&D
```

Expected: V2 is a structural rewrite, not a loss of substantive guidance.

## Task 6: Realign Plugin Documentation

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Update the README positioning**

Add or revise the `contrats-pi` description so it reads in substance like:

```markdown
- `contrats-pi` : contrats PI complets (licence/cession brevet, NDA secret,
  R&D collaborative, coexistence/franchise, transfert de technologie),
  structures par famille et distincts de `revue-clause-pi`
```

Expected: the README reflects the new product boundary.

- [ ] **Step 2: Add a changelog entry**

Add a concise changelog bullet set covering:

```markdown
- `contrats-pi` passe d'un flux lineaire a une structure par familles
- frontiere explicite avec `revue-clause-pi`
- contrat d'entree et de sortie normalises
```

Expected: the repo history explains the structural change.

## Task 7: Verify the Documentation Change Set

**Files:**
- Verify:
  - `plugins/hacienda-propriete-intellectuelle/skills/contrats-pi/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/skills/contrats-pi/references/contrats-pi-families-and-routing.md`
  - `plugins/hacienda-propriete-intellectuelle/README.md`
  - `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Run targeted diff hygiene**

Run:

```powershell
git diff --check -- "plugins/hacienda-propriete-intellectuelle/skills/contrats-pi/SKILL.md" "plugins/hacienda-propriete-intellectuelle/skills/contrats-pi/references/contrats-pi-families-and-routing.md" "plugins/hacienda-propriete-intellectuelle/README.md" "plugins/hacienda-propriete-intellectuelle/CHANGELOG.md"
```

Expected: no whitespace or patch-format issues, aside from possible CRLF warnings on Windows.

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

- [ ] **Step 3: Sanity-check the new skill contract**

Run:

```powershell
rg -n "patent-tech-transfer|nda-secret-knowhow|rnd-collaboration|trademark-coexistence-franchise|mta-life-sciences|Contract Snapshot|Human Validation" plugins/hacienda-propriete-intellectuelle/skills/contrats-pi plugins/hacienda-propriete-intellectuelle/README.md plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
```

Expected: all family names and output block names appear in the intended files and nowhere contradictory.

## Self-Review

Spec coverage checked:

- family-based restructure -> Tasks 2 and 3
- stronger boundary with `revue-clause-pi` -> Tasks 1, 3, and 6
- normalized outputs -> Task 4
- safer handling of incomplete data -> Task 5
- doc realignment -> Task 6
- repo verification -> Task 7

Placeholder scan:

- no placeholder markers
- no forward references without a defining task

Type consistency:

- public modes stay `draft` / `review`
- family labels are fixed in Task 1 and reused consistently later
- output block labels are introduced once and reused verbatim

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-19-hacienda-pi-contrats-v2.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
