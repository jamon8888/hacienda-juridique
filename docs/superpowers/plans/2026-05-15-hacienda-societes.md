# Hacienda Sociétés Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire le plugin `hacienda-societes` pour les opérations de droit des sociétés françaises, gouvernance, M&A, vie sociale et closing avec preuve officielle et validation humaine.

**Architecture:** Le plugin reste déclaratif et dépend de `hacienda-sources-officielles` pour vérifier Code de commerce, Code civil, Code monétaire et financier, JORF/LODA et jurisprudence. Les skills couvrent les workflows corporate les plus fréquents : audit, pacte, cession de titres, assemblée, procès-verbal, closing, calendrier de vie sociale, garanties et gouvernance.

**Tech Stack:** Markdown plugins Claude, manifests JSON existants, Vitest pour tests de structure et garde-fous.

---

## Task 1: Ajouter Le Test Sociétés

**Files:**
- Create: `packages/core/test/hacienda-societes.test.ts`

- [ ] **Step 1: Écrire le test**

Créer `packages/core/test/hacienda-societes.test.ts` avec les skills attendues et les garde-fous Code de commerce / Code civil / RCS-INPI / Cour de cassation / dossier de preuve.

- [ ] **Step 2: Vérifier que le test échoue**

Run:

```bash
npm run test --workspace packages/core -- hacienda-societes.test.ts
```

Expected: FAIL car les skills sociétés n'existent pas encore.

- [ ] **Step 3: Commit**

```bash
git add packages/core/test/hacienda-societes.test.ts
git commit -m "test: define corporate plugin safeguards"
```

## Task 2: Renforcer Le Profil Sociétés

**Files:**
- Modify: `plugins/hacienda-societes/CLAUDE.md`
- Modify: `plugins/hacienda-societes/skills/entretien-demarrage/SKILL.md`

- [ ] **Step 1: Remplacer `CLAUDE.md`**

Le profil doit mentionner Code de commerce, Code civil, RCS/INPI, BODACC, statuts, pactes, jurisprudence de la Cour de cassation, dossier de preuve, validation humaine et `[à vérifier]`.

- [ ] **Step 2: Adapter l'entretien**

L'entretien doit demander : formes sociales, opérations couvertes, gouvernance, pactes, M&A, closing, registre, seuils de validation, modèles corporate et conservation du dossier de preuve.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-societes/CLAUDE.md plugins/hacienda-societes/skills/entretien-demarrage/SKILL.md
git commit -m "feat: add corporate practice profile"
```

## Task 3: Ajouter Les Skills Sociétés

**Files:**
- Create: `plugins/hacienda-societes/skills/recherche-societes/SKILL.md`
- Create: `plugins/hacienda-societes/skills/audit-societes/SKILL.md`
- Create: `plugins/hacienda-societes/skills/reviser-pacte-associes/SKILL.md`
- Create: `plugins/hacienda-societes/skills/reviser-cession-titres/SKILL.md`
- Create: `plugins/hacienda-societes/skills/preparer-assemblee/SKILL.md`
- Create: `plugins/hacienda-societes/skills/rediger-proces-verbal/SKILL.md`
- Create: `plugins/hacienda-societes/skills/checklist-closing/SKILL.md`
- Create: `plugins/hacienda-societes/skills/calendrier-vie-sociale/SKILL.md`
- Create: `plugins/hacienda-societes/skills/tableau-garanties/SKILL.md`
- Create: `plugins/hacienda-societes/skills/analyse-gouvernance/SKILL.md`

- [ ] **Step 1: Créer les skills**

Chaque skill doit être en français et inclure :

```text
Sources à vérifier
Analyse
Points de validation humaine
Dossier de preuve
```

Les skills doivent rappeler le croisement Code de commerce / Code civil / statuts / RCS-INPI / jurisprudence lorsque pertinent.

- [ ] **Step 2: Vérifier**

Run:

```bash
npm run test --workspace packages/core -- hacienda-societes.test.ts
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-societes/skills packages/core/test/hacienda-societes.test.ts
git commit -m "feat: add corporate law skills"
```

## Task 4: Ajouter Agents Et README Sociétés

**Files:**
- Create: `plugins/hacienda-societes/agents/veilleur-vie-sociale.md`
- Create: `plugins/hacienda-societes/agents/suivi-closing.md`
- Create: `plugins/hacienda-societes/agents/suivi-gouvernance.md`
- Create: `plugins/hacienda-societes/agents/veilleur-reformes-corporate.md`
- Modify: `plugins/hacienda-societes/README.md`

- [ ] **Step 1: Créer les agents**

Chaque agent doit être déclaratif, sans outil par défaut, et rappeler qu'il ne publie pas de conclusion corporate sans source officielle vérifiée.

- [ ] **Step 2: Mettre à jour le README**

Le README doit présenter mission, sources prioritaires, règle de preuve, skills, agents et livrables.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-societes/agents plugins/hacienda-societes/README.md
git commit -m "feat: add corporate agents and documentation"
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
npm run branding:check
```

Expected: exit 0.
