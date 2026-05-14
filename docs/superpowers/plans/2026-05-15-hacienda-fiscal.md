# Hacienda Fiscal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire le plugin `hacienda-fiscal` avec ses garde-fous, skills fiscaux et agents de suivi.

**Architecture:** Le plugin reste déclaratif et dépend de `hacienda-sources-officielles` pour vérifier CGI, LPF, BOFiP, JORF, LODA et jurisprudence. Les skills produisent des livrables fiscaux exploitables mais marquent toute source non consultée comme `[à vérifier]`.

**Tech Stack:** Markdown plugins Claude, manifests JSON, Vitest pour tests de structure et garde-fous.

---

## Task 1: Ajouter Le Test Fiscal

**Files:**
- Create: `packages/core/test/hacienda-fiscal.test.ts`

- [ ] **Step 1: Écrire le test**

Créer `packages/core/test/hacienda-fiscal.test.ts` :

```ts
import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const pluginDir = resolve(root, "plugins/hacienda-fiscal");

const expectedSkills = [
  "recherche-fiscale",
  "verifier-bofip",
  "analyse-tva",
  "analyse-impot-societes",
  "analyse-impot-revenu",
  "controle-fiscal",
  "rediger-rescrit",
  "memo-contentieux-fiscal",
  "analyse-abus-de-droit",
  "analyse-plus-value"
];

function read(rel: string) {
  return readFileSync(resolve(pluginDir, rel), "utf8");
}

describe("hacienda-fiscal", () => {
  it("déclare les skills fiscaux attendus", () => {
    for (const skill of expectedSkills) {
      expect(existsSync(resolve(pluginDir, `skills/${skill}/SKILL.md`)), skill).toBe(true);
    }
  });

  it("impose le croisement CGI LPF BOFiP et le dossier de preuve", () => {
    const combined = [
      read("CLAUDE.md"),
      read("skills/recherche-fiscale/SKILL.md"),
      read("skills/verifier-bofip/SKILL.md"),
      read("skills/controle-fiscal/SKILL.md")
    ].join("\n");

    expect(combined).toContain("CGI");
    expect(combined).toContain("LPF");
    expect(combined).toContain("BOFiP");
    expect(combined).toContain("Conseil d'État");
    expect(combined).toContain("dossier de preuve");
    expect(combined).toContain("[à vérifier]");
  });
});
```

- [ ] **Step 2: Vérifier que le test échoue**

Run:

```bash
npm run test --workspace packages/core -- hacienda-fiscal.test.ts
```

Expected: FAIL car les skills fiscaux n'existent pas encore.

- [ ] **Step 3: Commit**

```bash
git add packages/core/test/hacienda-fiscal.test.ts
git commit -m "test: define fiscal plugin safeguards"
```

## Task 2: Renforcer Le Profil Fiscal

**Files:**
- Modify: `plugins/hacienda-fiscal/CLAUDE.md`
- Modify: `plugins/hacienda-fiscal/skills/entretien-demarrage/SKILL.md`

- [ ] **Step 1: Remplacer `CLAUDE.md`**

Le profil doit mentionner CGI, LPF, BOFiP, Conseil d'État, sources JORF/LODA, dossier de preuve, validation humaine et `[à vérifier]`.

- [ ] **Step 2: Adapter l'entretien**

L'entretien doit demander impôts couverts, sources fiscales, seuils de validation, usages BOFiP, contrôle fiscal, rescrits et conservation du dossier de preuve.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-fiscal/CLAUDE.md plugins/hacienda-fiscal/skills/entretien-demarrage/SKILL.md
git commit -m "feat: add fiscal practice profile"
```

## Task 3: Ajouter Les Skills Fiscaux

**Files:**
- Create: `plugins/hacienda-fiscal/skills/recherche-fiscale/SKILL.md`
- Create: `plugins/hacienda-fiscal/skills/verifier-bofip/SKILL.md`
- Create: `plugins/hacienda-fiscal/skills/analyse-tva/SKILL.md`
- Create: `plugins/hacienda-fiscal/skills/analyse-impot-societes/SKILL.md`
- Create: `plugins/hacienda-fiscal/skills/analyse-impot-revenu/SKILL.md`
- Create: `plugins/hacienda-fiscal/skills/controle-fiscal/SKILL.md`
- Create: `plugins/hacienda-fiscal/skills/rediger-rescrit/SKILL.md`
- Create: `plugins/hacienda-fiscal/skills/memo-contentieux-fiscal/SKILL.md`
- Create: `plugins/hacienda-fiscal/skills/analyse-abus-de-droit/SKILL.md`
- Create: `plugins/hacienda-fiscal/skills/analyse-plus-value/SKILL.md`

- [ ] **Step 1: Créer les skills**

Chaque skill doit être en français et inclure :

```text
Sources à vérifier
Analyse
Points de validation humaine
Dossier de preuve
```

Les skills fiscaux doivent rappeler le croisement CGI / LPF / BOFiP / jurisprudence lorsque pertinent.

- [ ] **Step 2: Vérifier**

Run:

```bash
npm run test --workspace packages/core -- hacienda-fiscal.test.ts
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-fiscal/skills packages/core/test/hacienda-fiscal.test.ts
git commit -m "feat: add fiscal research skills"
```

## Task 4: Ajouter Agents Et README Fiscal

**Files:**
- Create: `plugins/hacienda-fiscal/agents/veilleur-bofip.md`
- Create: `plugins/hacienda-fiscal/agents/suivi-controle-fiscal.md`
- Create: `plugins/hacienda-fiscal/agents/veilleur-reformes-fiscales.md`
- Create: `plugins/hacienda-fiscal/agents/suivi-delais-fiscaux.md`
- Modify: `plugins/hacienda-fiscal/README.md`

- [ ] **Step 1: Créer les agents**

Chaque agent doit être déclaratif, sans outil par défaut, et rappeler qu'il ne publie pas de conclusion fiscale sans source officielle vérifiée.

- [ ] **Step 2: Mettre à jour le README**

Le README doit présenter la mission fiscale, les sources prioritaires, les skills, les agents et les livrables.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-fiscal/agents plugins/hacienda-fiscal/README.md
git commit -m "feat: add fiscal agents and documentation"
```

## Task 5: Vérification Finale

- [ ] **Step 1: Lancer les vérifications**

```bash
npm run branding:check
npm run typecheck --workspaces --if-present
npm run test --workspaces --if-present
npm run build --workspaces --if-present
npm audit --audit-level=moderate
git diff --check
```

Expected: exit 0.

- [ ] **Step 2: Vérifier absence ancien branding**

```bash
rg -n "HACIENDA|hacienda|Hacienda|hacienda|https://hacienda\\.com" .
```

Expected: aucune sortie.
