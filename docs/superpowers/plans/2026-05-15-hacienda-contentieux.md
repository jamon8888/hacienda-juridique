# Hacienda Contentieux Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire le plugin `hacienda-contentieux` pour les dossiers contentieux français : analyse, pièces, chronologie, actes, conclusions, jurisprudence, stratégie et transaction avec preuve officielle.

**Architecture:** Le plugin reste déclaratif et dépend de `hacienda-sources-officielles` pour vérifier Code de procédure civile, Code civil, Code de commerce, Code de justice administrative, JORF/LODA et jurisprudence officielle. Les skills couvrent les workflows contentieux les plus fréquents : ouverture de dossier, chronologie, matrice de pièces, moyens, jurisprudence, mise en demeure, assignation, conclusions, risque et transaction.

**Tech Stack:** Markdown plugins Claude, manifests JSON existants, Vitest pour tests de structure et garde-fous.

---

## Task 1: Ajouter Le Test Contentieux

**Files:**
- Create: `packages/core/test/hacienda-contentieux.test.ts`

- [ ] **Step 1: Écrire le test**

Créer `packages/core/test/hacienda-contentieux.test.ts` avec les skills attendues et les garde-fous Code de procédure civile / Code civil / Cour de cassation / Conseil d'État / dossier de preuve.

- [ ] **Step 2: Vérifier que le test échoue**

Run:

```bash
npm run test --workspace packages/core -- hacienda-contentieux.test.ts
```

Expected: FAIL car les skills contentieux n'existent pas encore.

- [ ] **Step 3: Commit**

```bash
git add packages/core/test/hacienda-contentieux.test.ts
git commit -m "test: define litigation plugin safeguards"
```

## Task 2: Renforcer Le Profil Contentieux

**Files:**
- Modify: `plugins/hacienda-contentieux/CLAUDE.md`
- Modify: `plugins/hacienda-contentieux/skills/entretien-demarrage/SKILL.md`

- [ ] **Step 1: Remplacer `CLAUDE.md`**

Le profil doit mentionner Code de procédure civile, Code civil, Code de commerce, Code de justice administrative, Cour de cassation, Conseil d'État, dossier de preuve, validation humaine et `[à vérifier]`.

- [ ] **Step 2: Adapter l'entretien**

L'entretien doit demander : types de contentieux, juridictions, côté demandeur/défendeur, actes, délais, pièces, jurisprudence, stratégie transactionnelle, seuils de validation et conservation du dossier de preuve.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-contentieux/CLAUDE.md plugins/hacienda-contentieux/skills/entretien-demarrage/SKILL.md
git commit -m "feat: add litigation practice profile"
```

## Task 3: Ajouter Les Skills Contentieux

**Files:**
- Create: `plugins/hacienda-contentieux/skills/ouverture-dossier/SKILL.md`
- Create: `plugins/hacienda-contentieux/skills/chronologie/SKILL.md`
- Create: `plugins/hacienda-contentieux/skills/matrice-pieces/SKILL.md`
- Create: `plugins/hacienda-contentieux/skills/analyse-moyens/SKILL.md`
- Create: `plugins/hacienda-contentieux/skills/cartographie-jurisprudence/SKILL.md`
- Create: `plugins/hacienda-contentieux/skills/rediger-mise-en-demeure/SKILL.md`
- Create: `plugins/hacienda-contentieux/skills/rediger-assignation/SKILL.md`
- Create: `plugins/hacienda-contentieux/skills/rediger-conclusions/SKILL.md`
- Create: `plugins/hacienda-contentieux/skills/memo-risque-contentieux/SKILL.md`
- Create: `plugins/hacienda-contentieux/skills/strategie-transactionnelle/SKILL.md`

- [ ] **Step 1: Créer les skills**

Chaque skill doit être en français et inclure :

```text
Sources à vérifier
Analyse
Points de validation humaine
Dossier de preuve
```

Les skills doivent rappeler le croisement procédure / fond / jurisprudence / pièces lorsque pertinent.

- [ ] **Step 2: Vérifier**

Run:

```bash
npm run test --workspace packages/core -- hacienda-contentieux.test.ts
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-contentieux/skills packages/core/test/hacienda-contentieux.test.ts
git commit -m "feat: add litigation skills"
```

## Task 4: Ajouter Agents Et README Contentieux

**Files:**
- Create: `plugins/hacienda-contentieux/agents/suivi-delais-procedure.md`
- Create: `plugins/hacienda-contentieux/agents/veilleur-jurisprudence-contentieux.md`
- Create: `plugins/hacienda-contentieux/agents/suivi-mise-en-etat.md`
- Create: `plugins/hacienda-contentieux/agents/suivi-transaction-contentieuse.md`
- Modify: `plugins/hacienda-contentieux/README.md`

- [ ] **Step 1: Créer les agents**

Chaque agent doit être déclaratif, sans outil par défaut, et rappeler qu'il ne publie pas de conclusion contentieuse sans source officielle vérifiée.

- [ ] **Step 2: Mettre à jour le README**

Le README doit présenter mission, sources prioritaires, règle de preuve, skills, agents et livrables.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-contentieux/agents plugins/hacienda-contentieux/README.md
git commit -m "feat: add litigation agents and documentation"
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
