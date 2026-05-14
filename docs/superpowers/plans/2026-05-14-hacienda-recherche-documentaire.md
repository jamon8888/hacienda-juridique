# Hacienda Recherche Documentaire Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Créer le plugin `hacienda-recherche-documentaire` pour orchestrer la recherche dans Doctrine, Lexis, Lefebvre Dalloz, Lextenso et autres bases, via mode manuel ou Claude dans Chrome supervisé.

**Architecture:** Le plugin est principalement déclaratif : profils, skills, commandes et agents. Il ne contourne aucune plateforme et ne stocke aucun identifiant éditeur. Il prépare les requêtes, guide la navigation Chrome, extrait des références limitées, puis renvoie les sources primaires à `hacienda-sources-officielles`.

**Tech Stack:** Markdown plugins Claude, JSON manifests, Claude dans Chrome, MCP sources officielles, tests Vitest de structure et de garde-fous.

---

## Fichiers À Créer Ou Modifier

- Create: `plugins/hacienda-recherche-documentaire/.claude-plugin/plugin.json`
- Create: `plugins/hacienda-recherche-documentaire/.mcp.json`
- Create: `plugins/hacienda-recherche-documentaire/CLAUDE.md`
- Create: `plugins/hacienda-recherche-documentaire/README.md`
- Create: `plugins/hacienda-recherche-documentaire/hooks/hooks.json`
- Create: `plugins/hacienda-recherche-documentaire/skills/entretien-demarrage/SKILL.md`
- Create: `plugins/hacienda-recherche-documentaire/skills/preparation-requete/SKILL.md`
- Create: `plugins/hacienda-recherche-documentaire/skills/recherche-doctrine/SKILL.md`
- Create: `plugins/hacienda-recherche-documentaire/skills/recherche-lefebvre-dalloz/SKILL.md`
- Create: `plugins/hacienda-recherche-documentaire/skills/recherche-lexis/SKILL.md`
- Create: `plugins/hacienda-recherche-documentaire/skills/recherche-lextenso/SKILL.md`
- Create: `plugins/hacienda-recherche-documentaire/skills/comparaison-bases/SKILL.md`
- Create: `plugins/hacienda-recherche-documentaire/skills/extraction-references/SKILL.md`
- Create: `plugins/hacienda-recherche-documentaire/skills/controle-copyright/SKILL.md`
- Create: `plugins/hacienda-recherche-documentaire/skills/verification-sources-primaires/SKILL.md`
- Create: `plugins/hacienda-recherche-documentaire/skills/dossier-documentaire/SKILL.md`
- Create: `plugins/hacienda-recherche-documentaire/agents/veilleur-documentaire.md`
- Create: `plugins/hacienda-recherche-documentaire/agents/consolidateur-recherche.md`
- Create: `plugins/hacienda-recherche-documentaire/agents/controleur-sources.md`
- Create: `packages/core/test/hacienda-recherche-documentaire.test.ts`

## Task 1: Ajouter Le Test De Garde-Fous

**Files:**
- Create: `packages/core/test/hacienda-recherche-documentaire.test.ts`

- [ ] **Step 1: Écrire le test**

Créer `packages/core/test/hacienda-recherche-documentaire.test.ts` :

```ts
import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(__dirname, "../../..");
const pluginDir = resolve(root, "plugins/hacienda-recherche-documentaire");

function read(rel: string) {
  return readFileSync(resolve(pluginDir, rel), "utf8");
}

describe("hacienda-recherche-documentaire", () => {
  it("déclare le plugin et les skills principaux", () => {
    expect(existsSync(resolve(pluginDir, ".claude-plugin/plugin.json"))).toBe(true);
    expect(existsSync(resolve(pluginDir, "skills/preparation-requete/SKILL.md"))).toBe(true);
    expect(existsSync(resolve(pluginDir, "skills/extraction-references/SKILL.md"))).toBe(true);
    expect(existsSync(resolve(pluginDir, "skills/verification-sources-primaires/SKILL.md"))).toBe(true);
    expect(existsSync(resolve(pluginDir, "skills/dossier-documentaire/SKILL.md"))).toBe(true);
  });

  it("interdit les comportements incompatibles avec les bases éditeurs", () => {
    const combined = [
      read("CLAUDE.md"),
      read("skills/controle-copyright/SKILL.md"),
      read("skills/extraction-references/SKILL.md"),
    ].join("\n");

    expect(combined).toContain("pas de contournement de paywall");
    expect(combined).toContain("pas de contournement de CAPTCHA");
    expect(combined).toContain("pas de copie longue");
    expect(combined).toContain("pas de stockage d'identifiants");
    expect(combined).toContain("mode demander avant d'agir");
  });
});
```

- [ ] **Step 2: Vérifier que le test échoue**

Run:

```bash
npm run test --workspace packages/core -- hacienda-recherche-documentaire.test.ts
```

Expected: FAIL car le plugin n'existe pas encore.

- [ ] **Step 3: Commit**

```bash
git add packages/core/test/hacienda-recherche-documentaire.test.ts
git commit -m "test: define documentary research safeguards"
```

## Task 2: Créer Le Manifeste Et La Configuration Plugin

**Files:**
- Create: `plugins/hacienda-recherche-documentaire/.claude-plugin/plugin.json`
- Create: `plugins/hacienda-recherche-documentaire/.mcp.json`
- Create: `plugins/hacienda-recherche-documentaire/hooks/hooks.json`

- [ ] **Step 1: Créer `plugin.json`**

```json
{
  "name": "hacienda-recherche-documentaire",
  "version": "0.1.0",
  "description": "Recherche supervisée dans les bases documentaires utilisées par les avocats, avec vérification des sources primaires via Hacienda Sources Officielles.",
  "author": {
    "name": "Hacienda",
    "url": "https://hacienda.diy"
  },
  "repository": "https://github.com/jamon8888/hacienda-juridique",
  "license": "EUPL-1.2",
  "keywords": [
    "hacienda",
    "recherche-documentaire",
    "doctrine",
    "lexis",
    "lefebvre-dalloz",
    "lextenso",
    "avocat"
  ]
}
```

- [ ] **Step 2: Créer `.mcp.json`**

```json
{
  "mcpServers": {
    "Hacienda Sources Officielles": {
      "type": "stdio",
      "title": "Hacienda Sources Officielles",
      "description": "Vérification des sources primaires françaises via PISTE."
    }
  },
  "recommendedCategories": [
    "recherche-documentaire",
    "sources-officielles",
    "navigateur",
    "droit-francais"
  ]
}
```

- [ ] **Step 3: Créer `hooks/hooks.json`**

```json
{
  "hooks": {}
}
```

- [ ] **Step 4: Commit**

```bash
git add plugins/hacienda-recherche-documentaire/.claude-plugin/plugin.json plugins/hacienda-recherche-documentaire/.mcp.json plugins/hacienda-recherche-documentaire/hooks/hooks.json
git commit -m "feat: add documentary research plugin manifest"
```

## Task 3: Ajouter Le Profil De Pratique

**Files:**
- Create: `plugins/hacienda-recherche-documentaire/CLAUDE.md`
- Create: `plugins/hacienda-recherche-documentaire/skills/entretien-demarrage/SKILL.md`

- [ ] **Step 1: Créer `CLAUDE.md`**

Le fichier doit contenir :

````markdown
# Hacienda Recherche Documentaire

## Configuration

Lire le profil cabinet partagé :

```text
~/.claude/plugins/config/hacienda-juridique/profil-cabinet.md
```

Lire ensuite le profil de ce plugin :

```text
~/.claude/plugins/config/hacienda-juridique/hacienda-recherche-documentaire/CLAUDE.md
```

Si le profil manque ou contient `[A CONFIGURER]`, arrêter et demander :

```text
/hacienda-recherche-documentaire:entretien-demarrage
```

## Règles De Sécurité

- Utiliser le mode demander avant d'agir dans Claude dans Chrome.
- Ne jamais contourner un paywall.
- Ne jamais contourner un CAPTCHA.
- Ne jamais utiliser d'API privée non autorisée.
- Ne jamais stocker d'identifiants Doctrine, Lexis, Lefebvre Dalloz, Lextenso ou autre base.
- Ne jamais faire de copie longue de contenus éditoriaux protégés.
- Ne jamais uploader de pièce client sans validation explicite.
- Ne jamais conclure uniquement sur la réponse IA d'un éditeur.

## Sources

Les bases éditoriales aident à trouver, comprendre et hiérarchiser. Les sources primaires doivent être vérifiées via `hacienda-sources-officielles`.
````

- [ ] **Step 2: Créer `entretien-demarrage`**

Créer `skills/entretien-demarrage/SKILL.md` :

````markdown
---
name: entretien-demarrage
description: Configure les plateformes de recherche documentaire et les règles de sécurité du cabinet.
argument-hint: "[optionnel: --reconfigurer]"
---

# Entretien De Démarrage

## Questions

1. Quelles bases utilisez-vous : Doctrine, Lefebvre Dalloz, Lexis, Lextenso, Lexbase, Dalloz, Navis, Elnet, Lamyline ?
2. Le cabinet autorise-t-il Claude dans Chrome sur ces domaines ?
3. Le cabinet autorise-t-il l'upload de pièces client dans ces plateformes ?
4. Quels types de contenus peuvent être cités : références uniquement, courts extraits, liens internes ?
5. Quel niveau de validation humaine est requis avant d'utiliser une source éditoriale dans un livrable ?

## Sortie

Écrire le profil dans :

```text
~/.claude/plugins/config/hacienda-juridique/hacienda-recherche-documentaire/CLAUDE.md
```
````

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-recherche-documentaire/CLAUDE.md plugins/hacienda-recherche-documentaire/skills/entretien-demarrage/SKILL.md
git commit -m "feat: add documentary research practice profile"
```

## Task 4: Ajouter Les Skills De Recherche

**Files:**
- Create: skill files listed below

- [ ] **Step 1: Créer `preparation-requete`**

Le skill doit produire :

```text
Question qualifiée
Domaine
Période
Sources primaires à vérifier
Requêtes Doctrine
Requêtes Lexis
Requêtes Lefebvre Dalloz
Requêtes Lextenso
Critères d'exclusion
```

- [ ] **Step 2: Créer les skills plateforme**

Créer :

```text
skills/recherche-doctrine/SKILL.md
skills/recherche-lefebvre-dalloz/SKILL.md
skills/recherche-lexis/SKILL.md
skills/recherche-lextenso/SKILL.md
```

Chaque skill doit suivre ce canevas :

```markdown
---
name: recherche-<plateforme>
description: Guide une recherche supervisée dans <plateforme> sans extraction massive ni contournement.
---

# Recherche <Plateforme>

## Règles

- Utiliser le compte de l'utilisateur déjà connecté.
- Utiliser le mode demander avant d'agir.
- Extraire uniquement références, titres, auteurs, dates, liens et courts extraits utiles.
- Ne pas télécharger en masse.
- Ne pas copier de longs contenus.
- Envoyer les sources primaires citées vers `hacienda-sources-officielles`.
```

- [ ] **Step 3: Créer `comparaison-bases`**

Le skill doit comparer :

```text
convergences
divergences
source isolée
source éditoriale dominante
jurisprudence confirmée
source primaire manquante
```

- [ ] **Step 4: Créer `extraction-references`**

Le skill doit imposer :

```text
Titre
Auteur
Base
Revue ou collection
Date
Référence
Lien
Court extrait
Source primaire citée
Utilité pour le dossier
```

Inclure explicitement : "pas de copie longue".

- [ ] **Step 5: Créer `controle-copyright`**

Inclure les interdictions exactes :

```text
pas de contournement de paywall
pas de contournement de CAPTCHA
pas de copie longue
pas de stockage d'identifiants
pas de scraping massif
pas d'API privée non autorisée
```

- [ ] **Step 6: Créer `verification-sources-primaires`**

Le skill doit appeler conceptuellement :

```text
legifrance_get_article
legifrance_get_jurisprudence
legifrance_get_loda
legifrance_get_jorf
bofip_consulter
legifrance_rechercher
```

- [ ] **Step 7: Créer `dossier-documentaire`**

Le format imposé :

```markdown
# Dossier Documentaire Hacienda

## Question
## Hypothèses
## Sources Officielles Vérifiées
## Résultats Doctrine
## Résultats Lexis
## Résultats Lefebvre Dalloz
## Résultats Lextenso
## Convergences
## Divergences
## Sources Primaires Confirmées
## Sources À Relire Manuellement
## Pistes D'Argumentation
## Angles Morts
```

- [ ] **Step 8: Commit**

```bash
git add plugins/hacienda-recherche-documentaire/skills
git commit -m "feat: add documentary research skills"
```

## Task 5: Ajouter Les Agents

**Files:**
- Create: `plugins/hacienda-recherche-documentaire/agents/veilleur-documentaire.md`
- Create: `plugins/hacienda-recherche-documentaire/agents/consolidateur-recherche.md`
- Create: `plugins/hacienda-recherche-documentaire/agents/controleur-sources.md`

- [ ] **Step 1: Créer `veilleur-documentaire.md`**

```markdown
---
name: veilleur-documentaire
description: Prépare une veille documentaire supervisée dans les bases configurées, sans automatisation non autorisée.
tools: []
---

Tu prépares les recherches et les requêtes. Tu ne navigues pas sans plan approuvé. Tu ne copies pas de contenu long. Tu demandes la vérification des sources primaires via Hacienda Sources Officielles.
```

- [ ] **Step 2: Créer `consolidateur-recherche.md`**

```markdown
---
name: consolidateur-recherche
description: Consolide les résultats issus de plusieurs bases documentaires.
tools: []
---

Tu compares les références, identifies les convergences et divergences, puis produis une synthèse séparant sources éditoriales et sources officielles vérifiées.
```

- [ ] **Step 3: Créer `controleur-sources.md`**

```markdown
---
name: controleur-sources
description: Contrôle que les sources primaires citées ont été vérifiées et que les sources éditoriales ne sont pas présentées comme officielles.
tools: []
---

Tu refuses toute citation non vérifiée présentée comme certaine. Tu marques `[à vérifier]` lorsque la source officielle n'a pas été consultée.
```

- [ ] **Step 4: Commit**

```bash
git add plugins/hacienda-recherche-documentaire/agents
git commit -m "feat: add documentary research agents"
```

## Task 6: Ajouter Le README Et Vérifier

**Files:**
- Create: `plugins/hacienda-recherche-documentaire/README.md`

- [ ] **Step 1: Créer le README**

Le README doit contenir :

```markdown
# Hacienda Recherche Documentaire

## Mission

Orchestrer les recherches dans les bases documentaires utilisées par les avocats, sans remplacer ces bases et sans contourner leurs règles.

## Modes

1. Mode manuel sécurisé.
2. Mode Chrome supervisé.
3. Mode connecteur officiel si disponible.

## Plateformes

- Doctrine
- Lefebvre Dalloz / GenIA-L
- Lexis 360 / Lexis+ AI
- Lextenso
- Lexbase
- Dalloz
- Navis
- Elnet
- Lamyline

## Règle De Preuve

Toute source primaire citée doit être vérifiée via `hacienda-sources-officielles`.
```

- [ ] **Step 2: Lancer les tests**

Run:

```bash
npm run test --workspace packages/core -- hacienda-recherche-documentaire.test.ts
npm run test --workspace packages/core -- hacienda-marketplace.test.ts
```

Expected: PASS.

- [ ] **Step 3: Lancer les scans**

Run:

```bash
npm run branding:check
git diff --check
```

Expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add plugins/hacienda-recherche-documentaire packages/core/test/hacienda-recherche-documentaire.test.ts
git commit -m "feat: add hacienda documentary research plugin"
```
