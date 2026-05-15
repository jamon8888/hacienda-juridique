# Hacienda Social Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire le plugin `hacienda-social` pour les recherches et livrables de droit social français avec preuve officielle, conventions collectives et validation humaine.

**Architecture:** Le plugin reste déclaratif et dépend de `hacienda-sources-officielles` pour vérifier Code du travail, KALI/IDCC, JORF/LODA et jurisprudence. Les skills couvrent les workflows avocat les plus fréquents : licenciement, rupture conventionnelle, temps de travail, CSE, prud'hommes, classification et rémunération.

**Tech Stack:** Markdown plugins Claude, manifests JSON existants, Vitest pour tests de structure et garde-fous.

---

## Task 1: Ajouter Le Test Social

**Files:**
- Create: `packages/core/test/hacienda-social.test.ts`

- [ ] **Step 1: Écrire le test**

Créer `packages/core/test/hacienda-social.test.ts` avec les skills attendues et les garde-fous Code du travail / KALI / Cour de cassation / prud'hommes.

- [ ] **Step 2: Vérifier que le test échoue**

Run:

```bash
npm run test --workspace packages/core -- hacienda-social.test.ts
```

Expected: FAIL car les skills sociales n'existent pas encore.

- [ ] **Step 3: Commit**

```bash
git add packages/core/test/hacienda-social.test.ts
git commit -m "test: define social plugin safeguards"
```

## Task 2: Renforcer Le Profil Social

**Files:**
- Modify: `plugins/hacienda-social/CLAUDE.md`
- Modify: `plugins/hacienda-social/skills/entretien-demarrage/SKILL.md`

- [ ] **Step 1: Remplacer `CLAUDE.md`**

Le profil doit mentionner Code du travail, KALI/IDCC, jurisprudence de la Cour de cassation, JORF/LODA, dossier de preuve, validation humaine et `[à vérifier]`.

- [ ] **Step 2: Adapter l'entretien**

L'entretien doit demander : côté employeur/salarié, conventions collectives, IDCC, effectifs, CSE, prud'hommes, licenciements, rupture conventionnelle, temps de travail, politiques RH, seuils de validation et conservation du dossier de preuve.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-social/CLAUDE.md plugins/hacienda-social/skills/entretien-demarrage/SKILL.md
git commit -m "feat: add social practice profile"
```

## Task 3: Ajouter Les Skills Sociales

**Files:**
- Create: `plugins/hacienda-social/skills/recherche-sociale/SKILL.md`
- Create: `plugins/hacienda-social/skills/analyser-licenciement/SKILL.md`
- Create: `plugins/hacienda-social/skills/analyser-rupture-conventionnelle/SKILL.md`
- Create: `plugins/hacienda-social/skills/analyser-convention-collective/SKILL.md`
- Create: `plugins/hacienda-social/skills/analyser-temps-travail/SKILL.md`
- Create: `plugins/hacienda-social/skills/analyser-cse/SKILL.md`
- Create: `plugins/hacienda-social/skills/rediger-politique-rh/SKILL.md`
- Create: `plugins/hacienda-social/skills/memo-risque-prudhomal/SKILL.md`
- Create: `plugins/hacienda-social/skills/classification-emploi/SKILL.md`
- Create: `plugins/hacienda-social/skills/analyse-remuneration-variable/SKILL.md`

- [ ] **Step 1: Créer les skills**

Chaque skill doit être en français et inclure :

```text
Sources à vérifier
Analyse
Points de validation humaine
Dossier de preuve
```

Les skills doivent rappeler le croisement Code du travail / KALI ou IDCC / jurisprudence lorsque pertinent.

- [ ] **Step 2: Vérifier**

Run:

```bash
npm run test --workspace packages/core -- hacienda-social.test.ts
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-social/skills packages/core/test/hacienda-social.test.ts
git commit -m "feat: add social law skills"
```

## Task 4: Ajouter Agents Et README Social

**Files:**
- Create: `plugins/hacienda-social/agents/veilleur-conventions-collectives.md`
- Create: `plugins/hacienda-social/agents/suivi-contentieux-prudhomal.md`
- Create: `plugins/hacienda-social/agents/suivi-procedure-licenciement.md`
- Create: `plugins/hacienda-social/agents/veilleur-reformes-sociales.md`
- Modify: `plugins/hacienda-social/README.md`

- [ ] **Step 1: Créer les agents**

Chaque agent doit être déclaratif, sans outil par défaut, et rappeler qu'il ne publie pas de conclusion sociale sans source officielle vérifiée.

- [ ] **Step 2: Mettre à jour le README**

Le README doit présenter mission, sources prioritaires, règle de preuve, skills, agents et livrables.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-social/agents plugins/hacienda-social/README.md
git commit -m "feat: add social agents and documentation"
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
