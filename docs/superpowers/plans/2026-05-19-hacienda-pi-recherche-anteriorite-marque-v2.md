# Recherche Anteriorite Marque V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure `recherche-anteriorite-marque` into a strict first-pass trademark clearance skill with an explicit V2 input contract, explicit search coverage reporting, and a fixed routing/output contract.

**Architecture:** Keep `plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-marque/SKILL.md` as the only public entrypoint for first-pass trademark screening. Do not turn it into a broader trademark orchestrator. Instead, stabilize the skill around a V2 intake, a bounded coverage model, a mandatory adjacent-family sweep, and a closed `Next Step Routing` block that hands off to filing, monitoring, or opposition analysis.

**Tech Stack:** Markdown skills, Hacienda PI plugin conventions, existing README/changelog docs, repo verification via npm/vitest/tsc/build scripts.

---

## File Structure

- Modify: `plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-marque/SKILL.md`
  - Rework positioning, input contract, coverage rules, routing boundaries, and output contract.
- Create: `plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-marque/references/recherche-anteriorite-marque-routing-and-output.md`
  - Short helper for intake dimensions, adjacent-family sweep, route boundaries, and mandatory output blocks.
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
  - Reposition the skill in the public capabilities list if the V2 role changes visibly.
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
  - Record the V2 restructuring.

Read for context only unless contradiction requires a doc fix:

- `plugins/hacienda-propriete-intellectuelle/skills/depot-marque-fr/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/surveillance-marque/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/clearance-marque/SKILL.md`

## Task 1: Baseline and First-Pass Boundary Lock

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-marque/SKILL.md`
- Read:
  - `plugins/hacienda-propriete-intellectuelle/skills/depot-marque-fr/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/skills/surveillance-marque/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/skills/clearance-marque/SKILL.md`

- [ ] **Step 1: Snapshot the current trademark search skill**

Run:

```powershell
Get-Content "plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-marque/SKILL.md" | Select-Object -First 360
```

Expected: confirm the current file already contains the strong non-availability disclaimer, adjacent-family sweep, and broad first-pass search flow.

- [ ] **Step 2: Snapshot the neighboring trademark workflows**

Run:

```powershell
Get-Content "plugins/hacienda-propriete-intellectuelle/skills/depot-marque-fr/SKILL.md" | Select-Object -First 200
Get-Content "plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/SKILL.md" | Select-Object -First 220
Get-Content "plugins/hacienda-propriete-intellectuelle/skills/surveillance-marque/SKILL.md" | Select-Object -First 220
Get-Content "plugins/hacienda-propriete-intellectuelle/skills/clearance-marque/SKILL.md" | Select-Object -First 120
```

Expected: confirm those skills already own filing, opposition analysis, monitoring, and historical aliasing.

- [ ] **Step 3: Lock the public V2 dimension names**

Use these exact values in the implementation:

```text
mark_type:
- word
- figurative
- composite
- semi-figurative
- unknown

filing_intent:
- exploratory
- pre-filing
- pre-launch
- portfolio-extension
- reactive-check

territory_scope:
- fr
- eu
- fr-eu
- international-subset
- unknown

goods_services_scope:
- known-classes
- described-only
- mixed
- unclear

adjacent_families_status:
- pending-confirmation
- confirmed
- not-run
- insufficient-input
```

Expected: no drift in names later in the skill, helper note, or docs.

## Task 2: Rewrite Positioning and Input Contract

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-marque/SKILL.md`

- [ ] **Step 1: Preserve and foreground the non-availability guardrail**

Keep the top-level warning in this shape:

```markdown
> **Premier passage, pas une opinion de disponibilite.**
> Une opinion de disponibilite exige une recherche professionnelle complete et
> le jugement d'un mandataire en marques ou d'un avocat.
```

Expected: the first screen still makes it impossible to mistake the skill for a filing opinion.

- [ ] **Step 2: Add a V2 input contract section near the intake**

Insert a dedicated section in this shape:

```markdown
## Contrat d'entree V2

- `mark_type`
- `filing_intent`
- `territory_scope`
- `goods_services_scope`
- `adjacent_families_status`

Bloc de faits:
- `proposed_sign`
- `claimed_goods_services`
- `nice_classes`
- `market_appearance`
- `known_related_names`
- `search_limitations`
```

Expected: the intake becomes a stable contract instead of a free-form questionnaire only.

- [ ] **Step 3: Keep the factual intake but map it to the V2 dimensions**

Refactor the existing intake instructions so they still ask for:

```markdown
- signe propose
- produits/services reels
- classes Nice
- territoires
- apparence en marche
```

But add mapping guidance such as:

```markdown
- mot seul => `mark_type: word`
- logo ou element graphique dominant => `mark_type: figurative`
- classes deja donnees => `goods_services_scope: known-classes`
- simple description business => `goods_services_scope: described-only`
```

Expected: the skill stays practical for users while producing a normalized structure.

## Task 3: Stabilize Coverage and Adjacent-Family Rules

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-marque/SKILL.md`

- [ ] **Step 1: Create a dedicated `Search Coverage` framing**

Add or rewrite a section so the skill explicitly records:

```markdown
- bases interrogees
- classes couvertes
- territoires couverts
- type de recherche (exacte, proche, phonetique, partielle)
- statut du balayage des familles adjacentes
- limitations restantes
```

Expected: the search perimeter is visible before any conclusion-like language.

- [ ] **Step 2: Keep the `L.711-2 CPI` knockout but make its output contract explicit**

Add wording in this shape:

```markdown
Le resultat du knockout ne doit pas etre un tableau plat de pass/fail.
Pour chaque motif pertinent, produire soit :
- aucun probleme identifie
- soit un flag motive et concret
```

Expected: the skill keeps qualitative legal triage instead of flattening absolute grounds.

- [ ] **Step 3: Formalize the adjacent-family sweep as mandatory**

Retain the current adjacent-family logic, but add a V2 rule in this shape:

```markdown
Le balayage des familles adjacentes est requis avant de conclure.
Si l'utilisateur n'a pas confirme la liste, exposer
`adjacent_families_status: pending-confirmation`
ou `insufficient-input`, et reduire la confiance du triage.
```

Expected: adjacent-family coverage becomes a tracked state, not just a good practice note.

## Task 4: Add Routing Boundaries and Fixed Output

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-marque/SKILL.md`
- Create: `plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-marque/references/recherche-anteriorite-marque-routing-and-output.md`

- [ ] **Step 1: Insert a `## Routing Boundaries` section**

Add these exact subsection titles:

```markdown
### Route to `depot-marque-fr`
### Route to `surveillance-marque`
### Route to `analyse-opposition-marque`
### Route to `clearance-marque`
### Stay in `recherche-anteriorite-marque`
```

Expected: the handoffs are visible in one place.

- [ ] **Step 2: Define the routing rules concisely**

For each subsection, use rules in this shape:

```markdown
### Route to `depot-marque-fr`
- pas de blocage majeur evident au premier passage
- couverture minimale exploitable pour preparer un depot
- validation humaine encore obligatoire avant depot
```

And:

```markdown
### Route to `analyse-opposition-marque`
- conflit proche emerge
- comparaison contradictoire plus fine requise
- produits/services ou priorites doivent etre approfondis
```

Expected: the next workflow becomes deterministic enough for internal use.

- [ ] **Step 3: Replace the tail of the skill with the V2 output contract**

Add a fixed output section with these exact blocks:

```markdown
1. `Absolute Grounds Snapshot`
2. `Search Coverage`
3. `Closest Conflicts`
4. `Adjacent Family Sweep`
5. `Confusion Risk Signals`
6. `Uncertainty and Missing Coverage`
7. `Next Step Routing`
8. `Human Validation`
```

And restrict `Next Step Routing` to:

```markdown
- `proceed-to-professional-clearance`
- `prepare-filing`
- `monitor-before-filing`
- `prepare-opposition-risk-review`
- `insufficient-search-coverage`
- `abandon-or-rename`
```

Expected: the skill now matches the V2 formatting pattern used by the rest of the plugin.

- [ ] **Step 4: Create the routing/output helper note**

Create `plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-marque/references/recherche-anteriorite-marque-routing-and-output.md` with these sections:

```markdown
# Recherche anteriorite marque - routing and output

## 1. V2 intake dimensions
- mark_type
- filing_intent
- territory_scope
- goods_services_scope
- adjacent_families_status

## 2. Search coverage minimum
- absolute grounds
- similar marks
- adjacent families
- explicit limitations

## 3. Route boundaries
- depot-marque-fr
- surveillance-marque
- analyse-opposition-marque
- clearance-marque (historical only)

## 4. Output blocks
- Absolute Grounds Snapshot
- Search Coverage
- Closest Conflicts
- Adjacent Family Sweep
- Confusion Risk Signals
- Uncertainty and Missing Coverage
- Next Step Routing
- Human Validation
```

Expected: the skill has a short stable helper like the other V2 skills.

## Task 5: Realign Public Plugin Docs

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Update the README skill description**

Revise the `recherche-anteriorite-marque` bullet so it reads in this shape:

```markdown
- `recherche-anteriorite-marque` : premier passage marque V2, structure autour
  des motifs absolus, de la couverture de recherche, du balayage des familles
  adjacentes et du routage vers clearance professionnelle, depot, surveillance
  ou analyse d'opposition
```

Expected: the README reflects the strict first-pass role.

- [ ] **Step 2: Add changelog bullets for the V2 restructuring**

Add bullets in this shape:

```markdown
- `recherche-anteriorite-marque` passe en V2 avec contrat d'entree explicite
  (`mark_type`, `filing_intent`, `territory_scope`,
  `goods_services_scope`, `adjacent_families_status`)
- la couverture de recherche et le balayage des familles adjacentes sont
  exposes comme couches stables
- la sortie est normalisee en 8 blocs avec `Next Step Routing` borne
```

Expected: changelog captures the visible user-facing changes.

## Task 6: Verification and Scope Hygiene

**Files:**
- Verify:
  - `plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-marque/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-marque/references/recherche-anteriorite-marque-routing-and-output.md`
  - `plugins/hacienda-propriete-intellectuelle/README.md`
  - `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Grep for the new V2 contract and routing markers**

Run:

```powershell
rg "mark_type|filing_intent|territory_scope|goods_services_scope|adjacent_families_status|Absolute Grounds Snapshot|Next Step Routing|prepare-opposition-risk-review|abandon-or-rename" "plugins/hacienda-propriete-intellectuelle"
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

- [ ] **Step 3: Check that only the expected trademark V2 surface changed**

Run:

```powershell
git diff --name-only
```

Expected:

```text
docs/superpowers/specs/2026-05-19-hacienda-pi-recherche-anteriorite-marque-v2-design.md
docs/superpowers/plans/2026-05-19-hacienda-pi-recherche-anteriorite-marque-v2.md
plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-marque/SKILL.md
plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-marque/references/recherche-anteriorite-marque-routing-and-output.md
plugins/hacienda-propriete-intellectuelle/README.md
plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
```

If build regenerated unrelated `dist/` files, restore them before staging this feature:

```powershell
git checkout -- "plugins/hacienda-propriete-intellectuelle/mcp-server/dist/index.js" "plugins/hacienda-propriete-intellectuelle/mcp-server/dist/version.js"
```

Expected: no unrelated runtime artifacts remain in the final diff.
