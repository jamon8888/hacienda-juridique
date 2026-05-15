# Hacienda Donnees Personnelles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformer `hacienda-donnees-personnelles` en plugin RGPD/CNIL de qualite marketplace, inspire structurellement par `haciendas/hacienda-juridique/privacy-legal` mais adapte au droit francais.

**Architecture:** Le plugin reste autonome: profil de pratique vivant dans `CLAUDE.md`, entretien de demarrage, skills operationnelles, agents de suivi, README et tests de presence/qualite. Les skills doivent produire des sorties auditables avec dossier de preuve, note de revue, sources officielles et gates de validation humaine.

**Tech Stack:** Markdown de plugin Claude/Hacienda, Vitest pour tests de structure, npm workspaces.

---

## Contexte Et Niveau Qualite

Le plugin ne doit pas etre une liste minimale de commandes. Il doit reprendre les bons patterns observes dans `hacienda-juridique/privacy-legal`:

- profil vivant relu avant les skills;
- entretien de demarrage qui apprend le cabinet, les sources, les playbooks et les dossiers de reference;
- workflows riches avec contexte dossier, verification des sources, gates d'escalade, dossier de preuve et note de revue;
- agents avec role, entrees, cadence, limites et seuils d'escalade;
- toute conclusion juridique marquee comme provisoire tant que les sources officielles n'ont pas ete verifiees.

## Fichiers

- Create: `docs/superpowers/plans/2026-05-15-hacienda-donnees-personnelles.md`
- Create: `packages/core/test/hacienda-donnees-personnelles.test.ts`
- Modify: `plugins/hacienda-donnees-personnelles/CLAUDE.md`
- Modify: `plugins/hacienda-donnees-personnelles/README.md`
- Modify: `plugins/hacienda-donnees-personnelles/skills/entretien-demarrage/SKILL.md`
- Create: `plugins/hacienda-donnees-personnelles/skills/qualification-traitement/SKILL.md`
- Create: `plugins/hacienda-donnees-personnelles/skills/reviser-dpa/SKILL.md`
- Create: `plugins/hacienda-donnees-personnelles/skills/generer-aipd/SKILL.md`
- Create: `plugins/hacienda-donnees-personnelles/skills/registre-traitements/SKILL.md`
- Create: `plugins/hacienda-donnees-personnelles/skills/reponse-droits-personnes/SKILL.md`
- Create: `plugins/hacienda-donnees-personnelles/skills/conformite-cookies/SKILL.md`
- Create: `plugins/hacienda-donnees-personnelles/skills/reponse-violation-donnees/SKILL.md`
- Create: `plugins/hacienda-donnees-personnelles/skills/analyse-transferts/SKILL.md`
- Create: `plugins/hacienda-donnees-personnelles/skills/analyse-gap-cnil-rgpd/SKILL.md`
- Create: `plugins/hacienda-donnees-personnelles/skills/surveillance-politique-confidentialite/SKILL.md`
- Create: `plugins/hacienda-donnees-personnelles/agents/veilleur-doctrine-cnil.md`
- Create: `plugins/hacienda-donnees-personnelles/agents/suivi-demandes-droits.md`
- Create: `plugins/hacienda-donnees-personnelles/agents/suivi-violations-donnees.md`
- Create: `plugins/hacienda-donnees-personnelles/agents/veilleur-transferts-internationaux.md`

### Task 1: Plan

**Files:**
- Create: `docs/superpowers/plans/2026-05-15-hacienda-donnees-personnelles.md`

- [x] **Step 1: Save this implementation plan**

Create the plan file with the exact scope above.

- [ ] **Step 2: Commit the plan**

Run:

```bash
git add docs/superpowers/plans/2026-05-15-hacienda-donnees-personnelles.md
git commit -m "docs: plan hacienda privacy plugin"
```

### Task 2: Test-First Quality Gate

**Files:**
- Create: `packages/core/test/hacienda-donnees-personnelles.test.ts`

- [ ] **Step 1: Write the failing test**

The test must assert all expected skill files exist and that combined plugin content contains privacy-specific guardrails:

```ts
import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const pluginDir = resolve(root, "plugins/hacienda-donnees-personnelles");

const expectedSkills = [
  "entretien-demarrage",
  "qualification-traitement",
  "reviser-dpa",
  "generer-aipd",
  "registre-traitements",
  "reponse-droits-personnes",
  "conformite-cookies",
  "reponse-violation-donnees",
  "analyse-transferts",
  "analyse-gap-cnil-rgpd",
  "surveillance-politique-confidentialite"
];

const expectedAgents = [
  "veilleur-doctrine-cnil",
  "suivi-demandes-droits",
  "suivi-violations-donnees",
  "veilleur-transferts-internationaux"
];

function read(rel: string) {
  return readFileSync(resolve(pluginDir, rel), "utf8");
}

describe("hacienda-donnees-personnelles", () => {
  it("declare les skills et agents RGPD attendus", () => {
    for (const skill of expectedSkills) {
      expect(existsSync(resolve(pluginDir, `skills/${skill}/SKILL.md`)), skill).toBe(true);
    }

    for (const agent of expectedAgents) {
      expect(existsSync(resolve(pluginDir, `agents/${agent}.md`)), agent).toBe(true);
    }
  });

  it("impose un niveau privacy-legal francais avec sources, revue et preuve", () => {
    const combined = [
      read("CLAUDE.md"),
      read("README.md"),
      read("skills/qualification-traitement/SKILL.md"),
      read("skills/reviser-dpa/SKILL.md"),
      read("skills/generer-aipd/SKILL.md"),
      read("skills/reponse-violation-donnees/SKILL.md"),
      read("skills/analyse-transferts/SKILL.md"),
      read("agents/veilleur-doctrine-cnil.md")
    ].join("\n");

    expect(combined).toContain("RGPD");
    expect(combined).toContain("CNIL");
    expect(combined).toContain("Loi Informatique et Libertes");
    expect(combined).toContain("EDPB");
    expect(combined).toContain("AIPD");
    expect(combined).toContain("dossier de preuve");
    expect(combined).toContain("[a verifier]");
    expect(combined).toContain("validation humaine");
    expect(combined).toContain("Note de revue");
    expect(combined).toContain("Arbre de decision");
    expect(combined).toContain("Mode silencieux");
    expect(combined).toContain("source officielle");
    expect(combined).toContain("profil de pratique");
    expect(combined).toContain("espace dossier");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm run test --workspace packages/core -- hacienda-donnees-personnelles.test.ts
```

Expected: FAIL because the new skill and agent files do not exist yet.

- [ ] **Step 3: Commit the red test**

Run:

```bash
git add packages/core/test/hacienda-donnees-personnelles.test.ts
git commit -m "test: define privacy plugin safeguards"
```

### Task 3: Practice Profile And Onboarding

**Files:**
- Modify: `plugins/hacienda-donnees-personnelles/CLAUDE.md`
- Modify: `plugins/hacienda-donnees-personnelles/skills/entretien-demarrage/SKILL.md`

- [ ] **Step 1: Replace the minimal profile with a detailed French privacy practice profile**

The profile must define: configuration path, shared cabinet profile, stop rule for placeholders, sources, user roles, regulatory footprint, controller/processor posture, DPA playbooks, DSAR process, AIPD triggers, cookies, breach escalation, workspace isolation, reviewer note, quiet mode and source verification.

- [ ] **Step 2: Expand the onboarding interview**

The interview must collect: role, sector, territories, DPO, client types, typical processing, data categories, sensitive data, transfer posture, tools, seed documents, DPA templates, AIPD examples, register conventions, DSAR process, breach playbook, cookie/CMP state, output folder and escalation thresholds.

- [ ] **Step 3: Commit profile and onboarding**

Run:

```bash
git add plugins/hacienda-donnees-personnelles/CLAUDE.md plugins/hacienda-donnees-personnelles/skills/entretien-demarrage/SKILL.md
git commit -m "feat: add privacy practice profile"
```

### Task 4: Rich RGPD/CNIL Skills

**Files:**
- Create the ten non-onboarding skill files listed in the file map.

- [ ] **Step 1: Add each skill with a complete workflow**

Each skill must include these sections:

- `Avant De Commencer`
- `Contexte Dossier`
- `Sources A Verifier`
- `Workflow`
- `Garde-Fous Et Escalade`
- `Format De Sortie`
- `Dossier De Preuve`
- `Arbre De Decision`

Each skill must include `Note de revue`, `[a verifier]`, `validation humaine` and source-status language.

- [ ] **Step 2: Run the focused test**

Run:

```bash
npm run test --workspace packages/core -- hacienda-donnees-personnelles.test.ts
```

Expected: still FAIL until agents and README are done, but skill file failures should be resolved.

- [ ] **Step 3: Commit skills**

Run:

```bash
git add plugins/hacienda-donnees-personnelles/skills packages/core/test/hacienda-donnees-personnelles.test.ts
git commit -m "feat: add privacy data protection skills"
```

### Task 5: Agents And README

**Files:**
- Create: `plugins/hacienda-donnees-personnelles/agents/*.md`
- Modify: `plugins/hacienda-donnees-personnelles/README.md`

- [ ] **Step 1: Add four workflow agents**

Agents must specify role, inputs, source checks, cadence, escalation gates, limitations and output format. They must not claim official-source verification unless `hacienda-sources-officielles` or the user provides source evidence.

- [ ] **Step 2: Expand README**

README must cover mission, first run, commands, sources, skills, agents, how the plugin learns, outputs, limits and a warning that outputs require attorney/DPO validation.

- [ ] **Step 3: Run focused test**

Run:

```bash
npm run test --workspace packages/core -- hacienda-donnees-personnelles.test.ts
```

Expected: PASS.

- [ ] **Step 4: Commit docs and agents**

Run:

```bash
git add plugins/hacienda-donnees-personnelles/agents plugins/hacienda-donnees-personnelles/README.md
git commit -m "feat: add privacy agents and documentation"
```

### Task 6: Final Verification And Push

**Files:**
- No new files expected.

- [ ] **Step 1: Run full verification**

Run:

```bash
npm run branding:check
npm run typecheck --workspaces --if-present
npm run test --workspaces --if-present
npm run build --workspaces --if-present
npm audit --audit-level=moderate
git diff --check
rg -n "HACIENDA|hacienda|Hacienda|hacienda|https://hacienda\\.com" .
```

Expected: all pass, and the old-branding search returns no matches.

- [ ] **Step 2: Check Markdown fences**

Run:

```powershell
$errors = @(); foreach ($path in (rg --files -g '*.md')) { $count = (Select-String -LiteralPath $path -Pattern '```' -AllMatches).Matches.Count; if (($count % 2) -ne 0) { $errors += "$path has odd fence count $count" } }; if ($errors.Count) { $errors; exit 1 } else { 'Markdown fences OK' }
```

Expected: `Markdown fences OK`.

- [ ] **Step 3: Push branch**

Run:

```bash
git push -u origin codex/hacienda-donnees-personnelles-plugin
```
