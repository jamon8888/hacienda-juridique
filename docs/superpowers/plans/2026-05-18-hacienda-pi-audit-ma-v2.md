# Audit PI M&A V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework `audit-pi-ma` into a structured M&A PI orchestrator with explicit modes, routing to specialized PI skills, normalized findings, and transaction-grade outputs.

**Architecture:** Keep `plugins/hacienda-propriete-intellectuelle/skills/audit-pi-ma/SKILL.md` as the single entrypoint, but refactor it around four modes and a common output contract. Add one focused M&A reference file to stabilize routing rules, findings fields, and buyer/seller distinctions without duplicating detailed logic already owned by `portefeuille-pi`, `revue-open-source`, `revue-logiciel-donnees`, `depot-preuve-creation`, and `contrats-pi`.

**Tech Stack:** Markdown skills, Hacienda PI plugin conventions, existing cross-skill routing contracts, repo verification via npm/vitest/tsc/build scripts.

---

## File Structure

- Modify: `plugins/hacienda-propriete-intellectuelle/skills/audit-pi-ma/SKILL.md`
  - Replace the current monolithic report flow with the V2 orchestrator contract.
- Create: `plugins/hacienda-propriete-intellectuelle/skills/audit-pi-ma/references/audit-ma-routing-and-findings.md`
  - Short reference for mode-specific routing, findings schema, and transaction actions.
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
  - Reposition `audit-pi-ma` in the plugin capability list if its role changes visibly.
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
  - Record the V2 redesign.

Optional only if needed during implementation:
- Modify: `plugins/hacienda-propriete-intellectuelle/references/dashboard-template.md`
  - Only if the skill text needs tighter alignment with the already documented future dashboard direction.

## Task 1: Baseline and Contract Mapping

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/audit-pi-ma/SKILL.md`
- Read for context:
  - `plugins/hacienda-propriete-intellectuelle/skills/portefeuille-pi/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/skills/revue-open-source/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/skills/revue-logiciel-donnees/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/skills/depot-preuve-creation/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/skills/contrats-pi/SKILL.md`

- [ ] **Step 1: Snapshot the current audit skill before editing**

Run:

```powershell
Get-Content "plugins/hacienda-propriete-intellectuelle/skills/audit-pi-ma/SKILL.md" | Select-Object -First 320
```

Expected: confirm the current file is still the monolithic V1 report with buyer/seller intake and no mode-based routing contract.

- [ ] **Step 2: List the routing boundaries to preserve**

Use this checklist while reading the neighboring skills:

```text
- portefeuille-pi -> lecture consolidee titres, lecture seule
- revue-open-source -> OSS component-level audit
- revue-logiciel-donnees -> chain of title logiciel/data
- depot-preuve-creation -> pieces, preuves, trous documentaires
- contrats-pi -> clauses PI / regularisation contractuelle
```

Expected: no new routing target is invented outside the existing PI plugin surface.

- [ ] **Step 3: Write down the exact V2 mode names to lock consistency**

Use these exact mode labels in the implementation:

```text
buyer-dd
seller-clean-room
red-flag
deal-summary
```

Expected: later tasks reuse these exact names without drift.

## Task 2: Rewrite `audit-pi-ma` Intake and Positioning

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/audit-pi-ma/SKILL.md`

- [ ] **Step 1: Replace the top-level positioning block**

Introduce a new opening section with this content shape:

```markdown
> **Orchestrateur de due diligence PI, pas opinion juridique finale.**
>
> `audit-pi-ma` cadre un dossier transactionnel PI, ouvre les branches
> specialisees necessaires, puis consolide les findings pour la transaction.
> Il ne remplace ni un avocat M&A, ni un expert valuation, ni un audit
> technique autonome, ni un registre officiel.
```

Expected: the first screen tells the user this is now an orchestrator, not a catch-all report writer.

- [ ] **Step 2: Replace the old buyer/seller-only intake with the V2 intake**

Add an intake section that explicitly requires:

```markdown
1. `mode`
2. `cote transactionnel`
3. `type de transaction`
4. `cible / perimetre`
5. `secteur`
6. `juridictions critiques`
7. `sources disponibles`
8. `objectif de la revue`
9. `delai`
```

Also list the useful complements from the spec:

```markdown
- actif central de la these d'investissement
- dependance au logiciel ou a la marque
- pays de chiffre d'affaires critiques
- contentieux connus
- exigence de rapport court ou detaille
```

Expected: the skill no longer starts from a simplistic `--buyer / --seller` contract.

- [ ] **Step 3: Define the four modes inline**

For each mode, add:

```markdown
### Mode `buyer-dd`
Usage:
- audit PI cote acquereur
- identification des risques de deal, protections SPA et conditions suspensives
Sortie attendue:
- inventaire des branches ouvertes
- findings par severite
- protections transactionnelles recommandees
- priorites pre-closing / post-closing
```

Repeat for:

```markdown
seller-clean-room
red-flag
deal-summary
```

Expected: each mode clearly states when it is used and what it must produce.

## Task 3: Add Explicit Routing and Findings Schema

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/audit-pi-ma/SKILL.md`
- Create: `plugins/hacienda-propriete-intellectuelle/skills/audit-pi-ma/references/audit-ma-routing-and-findings.md`

- [ ] **Step 1: Add a visible routing model to the skill**

Insert a section `## Routing Model` with five explicit branches:

```markdown
### Route `portefeuille-pi`
### Route `revue-open-source`
### Route `revue-logiciel-donnees`
### Route `depot-preuve-creation`
### Route `contrats-pi`
```

Each branch must say:

```markdown
- quand l'ouvrir
- ce qu'elle couvre
- ce qu'elle ne couvre pas
```

Expected: `audit-pi-ma` stops duplicating the depth already owned by specialized skills.

- [ ] **Step 2: Add the normalized findings schema to the skill**

Add a `## Findings Model` section with these exact fields:

```markdown
- `id`
- `severity`
- `asset_type`
- `asset_name`
- `issue_category`
- `summary`
- `evidence_seen`
- `missing_inputs`
- `deal_impact`
- `recommended_action`
- `timing`
- `owner`
- `status`
```

And these exact severity values:

```markdown
Critical
High
Medium
Low
```

Expected: later dashboard and reporting work can rely on a stable findings shape.

- [ ] **Step 3: Create the M&A routing/reference helper**

Create `plugins/hacienda-propriete-intellectuelle/skills/audit-pi-ma/references/audit-ma-routing-and-findings.md` with three short sections:

```markdown
# Audit M&A - routing and findings

## 1. Quand ouvrir chaque branche
- portefeuille-pi
- revue-open-source
- revue-logiciel-donnees
- depot-preuve-creation
- contrats-pi

## 2. Champs minimaux d'un finding
| Field | Meaning |
| --- | --- |
| id | identifiant stable du finding |
| severity | Critical / High / Medium / Low |
| asset_type | type d'actif concerne |
| asset_name | nom ou reference de l'actif |
| issue_category | titularite, OSS, registre, contentieux, etc. |
| summary | resume court du probleme |
| evidence_seen | pieces ou sources lues |
| missing_inputs | pieces ou donnees manquantes |
| deal_impact | impact transactionnel |
| recommended_action | action recommandee |
| timing | pre-closing / closing / post-closing |
| owner | responsable propose |
| status | open / mitigable / blocked / validated |

## 3. Timing transactionnel
- pre-closing
- closing
- post-closing
```

Expected: the skill body stays focused while the reference stabilizes repeatable transaction logic.

## Task 4: Replace the Old Report Template with the V2 Output Contract

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/audit-pi-ma/SKILL.md`

- [ ] **Step 1: Define the common output blocks**

Replace the old report-only template with these common blocks:

```markdown
1. `Transaction Snapshot`
2. `Scope and Sources`
3. `Asset Coverage`
4. `Findings Table`
5. `Deal Risks`
6. `Validation humaine requise`
```

Expected: every mode shares one transaction-grade backbone.

- [ ] **Step 2: Define the buyer/seller/red-flag/deal-summary additions**

Add a section `## Mode-Specific Additions` and specify:

```markdown
### `buyer-dd`
- `Buyer Protection Pack`
- `Closing Conditions`
- `Post-Closing Remediation`

### `seller-clean-room`
- `Seller Clean-Up Priorities`
- `Data Room Requests`
- `Readiness Assessment`

### `red-flag`
- `Red Flag Summary`
- `Go / No-Go / Go With Conditions`

### `deal-summary`
- `Management Summary`
- `Decision Points`
```

Expected: each mode has a concrete final form instead of one generic report skeleton.

- [ ] **Step 3: Add the canonical findings table format**

Use this exact table header in the skill:

```markdown
| ID | Severite | Actif | Categorie | Resume | Impact deal | Action | Timing |
| --- | --- | --- | --- | --- | --- | --- | --- |
```

Expected: transaction outputs become consistent and easy to consolidate later.

## Task 5: Realign Guardrails, README, and Changelog

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/audit-pi-ma/SKILL.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Update guardrails in `audit-pi-ma`**

Ensure the skill states clearly:

```markdown
- aucune sortie n'est une opinion juridique finale
- toute source non consultee reste `[a verifier]`
- toute valorisation reste indicative
- aucune titularite ne doit etre affirmee sans piece
- les branches OSS / data / chain of title ne doivent pas etre resolues superficiellement
```

Expected: the new orchestration role stays bounded and defensible.

- [ ] **Step 2: Update the plugin README description for `audit-pi-ma`**

Replace any generic listing with wording close to:

```markdown
- `audit-pi-ma` : orchestrateur de due diligence PI M&A, avec modes acheteur,
  vendeur, red flags et synthese de deal, s'appuyant sur les skills
  specialises du plugin.
```

Expected: README reflects the actual role after V2.

- [ ] **Step 3: Add a changelog entry for the V2 redesign**

Add a bullet under the PI changelog describing:

```markdown
- `audit-pi-ma` passe d'un rapport monolithique a un orchestrateur M&A PI
  structure avec routing, findings normalises et sorties buyer/seller/red-flag.
```

Expected: the redesign is visible in plugin release history.

## Task 6: Verification and Final Review

**Files:**
- Verify:
  - `plugins/hacienda-propriete-intellectuelle/skills/audit-pi-ma/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/skills/audit-pi-ma/references/audit-ma-routing-and-findings.md`
  - `plugins/hacienda-propriete-intellectuelle/README.md`
  - `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Search for stale V1 patterns in the rewritten skill**

Run:

```powershell
rg -n --glob "*.md" "`--buyer|`--seller|Format de sortie|Étape 1|Étape 2|Étape 3|Étape 4|Étape 5|Étape 6" plugins/hacienda-propriete-intellectuelle/skills/audit-pi-ma
```

Expected: no stale monolithic report scaffolding remains unless intentionally preserved and renamed.

- [ ] **Step 2: Run plugin branding/format sanity checks**

Run:

```powershell
git diff --check
npm run branding:check
```

Expected:

```text
git diff --check -> no whitespace errors (CRLF warnings acceptable)
Branding Hacienda OK
```

- [ ] **Step 3: Review the skill against the spec**

Checklist:

```text
- 4 modes present with exact names
- routing model present
- findings schema present
- common output contract present
- mode-specific additions present
- buyer/seller differences explicit
- dashboard trajectory mentioned but not over-promised
- guardrails and [a verifier] rules preserved
```

Expected: no spec gap remains before implementation is declared done.
