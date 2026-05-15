# Hacienda Contrats Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire le plugin `hacienda-contrats` pour la revue, rédaction et négociation de contrats commerciaux français avec preuve officielle et validation humaine.

**Architecture:** Le plugin reste déclaratif et dépend de `hacienda-sources-officielles` pour vérifier Code civil, Code de commerce, Code de la consommation, JORF/LODA et jurisprudence. Les skills couvrent les workflows contractuels les plus fréquents : revue générale, NDA, SaaS, CGV/CGU, distribution, rupture brutale, bail commercial, redlines et résumé opérationnel.

**Tech Stack:** Markdown plugins Claude, manifests JSON existants, Vitest pour tests de structure et garde-fous.

---

## Task 1: Ajouter Le Test Contrats

**Files:**
- Create: `packages/core/test/hacienda-contrats.test.ts`

- [ ] **Step 1: Écrire le test**

Créer `packages/core/test/hacienda-contrats.test.ts` avec les skills attendues et les garde-fous Code civil / Code de commerce / Code de la consommation / Cour de cassation / dossier de preuve.

- [ ] **Step 2: Vérifier que le test échoue**

Run:

```bash
npm run test --workspace packages/core -- hacienda-contrats.test.ts
```

Expected: FAIL car les skills contrats n'existent pas encore.

- [ ] **Step 3: Commit**

```bash
git add packages/core/test/hacienda-contrats.test.ts
git commit -m "test: define contracts plugin safeguards"
```

## Task 2: Renforcer Le Profil Contrats

**Files:**
- Modify: `plugins/hacienda-contrats/CLAUDE.md`
- Modify: `plugins/hacienda-contrats/skills/entretien-demarrage/SKILL.md`

- [ ] **Step 1: Remplacer `CLAUDE.md`**

Le profil doit mentionner Code civil, Code de commerce, Code de la consommation, jurisprudence de la Cour de cassation, JORF/LODA, dossier de preuve, validation humaine et `[à vérifier]`.

- [ ] **Step 2: Adapter l'entretien**

L'entretien doit demander : types de contrats, côté client/fournisseur, secteurs, clauses sensibles, CGV/CGU, SaaS, distribution, baux commerciaux, seuils de validation, politique de redlines et conservation du dossier de preuve.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-contrats/CLAUDE.md plugins/hacienda-contrats/skills/entretien-demarrage/SKILL.md
git commit -m "feat: add contracts practice profile"
```

## Task 3: Ajouter Les Skills Contrats

**Files:**
- Create: `plugins/hacienda-contrats/skills/recherche-contractuelle/SKILL.md`
- Create: `plugins/hacienda-contrats/skills/reviser-contrat/SKILL.md`
- Create: `plugins/hacienda-contrats/skills/reviser-nda/SKILL.md`
- Create: `plugins/hacienda-contrats/skills/reviser-saas/SKILL.md`
- Create: `plugins/hacienda-contrats/skills/reviser-cgv-cgu/SKILL.md`
- Create: `plugins/hacienda-contrats/skills/analyser-distribution/SKILL.md`
- Create: `plugins/hacienda-contrats/skills/analyser-rupture-brutale/SKILL.md`
- Create: `plugins/hacienda-contrats/skills/reviser-bail-commercial/SKILL.md`
- Create: `plugins/hacienda-contrats/skills/proposer-redlines/SKILL.md`
- Create: `plugins/hacienda-contrats/skills/resume-operationnel/SKILL.md`

- [ ] **Step 1: Créer les skills**

Chaque skill doit être en français et inclure :

```text
Sources à vérifier
Analyse
Points de validation humaine
Dossier de preuve
```

Les skills doivent rappeler le croisement Code civil / Code de commerce / Code de la consommation / jurisprudence lorsque pertinent.

- [ ] **Step 2: Vérifier**

Run:

```bash
npm run test --workspace packages/core -- hacienda-contrats.test.ts
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-contrats/skills packages/core/test/hacienda-contrats.test.ts
git commit -m "feat: add contracts law skills"
```

## Task 4: Ajouter Agents Et README Contrats

**Files:**
- Create: `plugins/hacienda-contrats/agents/veilleur-clauses-sensibles.md`
- Create: `plugins/hacienda-contrats/agents/suivi-negociation-contractuelle.md`
- Create: `plugins/hacienda-contrats/agents/suivi-renouvellements-resiliations.md`
- Create: `plugins/hacienda-contrats/agents/veilleur-reformes-contractuelles.md`
- Modify: `plugins/hacienda-contrats/README.md`

- [ ] **Step 1: Créer les agents**

Chaque agent doit être déclaratif, sans outil par défaut, et rappeler qu'il ne publie pas de conclusion contractuelle sans source officielle vérifiée.

- [ ] **Step 2: Mettre à jour le README**

Le README doit présenter mission, sources prioritaires, règle de preuve, skills, agents et livrables.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-contrats/agents plugins/hacienda-contrats/README.md
git commit -m "feat: add contracts agents and documentation"
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
