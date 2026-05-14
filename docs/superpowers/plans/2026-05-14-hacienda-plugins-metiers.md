# Hacienda Plugins Métiers Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Créer la place de marché de plugins métiers Hacienda, entièrement en français, selon une structure inspirée des plugins juridiques de référence.

**Architecture:** Chaque plugin métier est un bundle autonome avec `.claude-plugin/plugin.json`, `.mcp.json`, `CLAUDE.md`, `README.md`, `skills/`, `agents/` et `hooks/`. Tous les plugins recommandent `hacienda-sources-officielles` comme couche de preuve et utilisent des noms de workflows français. Le plan crée d'abord des squelettes cohérents, puis les implementations détaillées de skills seront ajoutées par domaine.

**Tech Stack:** Markdown plugins Claude, JSON manifests, npm workspaces pour tests de structure, Vitest pour validation marketplace.

---

## Plugins À Créer

```text
hacienda-fiscal
hacienda-social
hacienda-contrats
hacienda-societes
hacienda-contentieux
hacienda-donnees-personnelles
hacienda-produit-consommation
hacienda-reglementaire
hacienda-gouvernance-ia
hacienda-propriete-intellectuelle
hacienda-droit-public
hacienda-permanences-juridiques
hacienda-hub-confiance
```

`hacienda-recherche-documentaire` est traité dans son propre plan.

## Task 1: Ajouter Un Test De Structure Marketplace

**Files:**
- Create: `packages/core/test/hacienda-marketplace.test.ts`

- [ ] **Step 1: Écrire le test**

Créer `packages/core/test/hacienda-marketplace.test.ts` :

```ts
import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(__dirname, "../../..");

const expectedPlugins = [
  "hacienda-sources-officielles",
  "hacienda-recherche-documentaire",
  "hacienda-fiscal",
  "hacienda-social",
  "hacienda-contrats",
  "hacienda-societes",
  "hacienda-contentieux",
  "hacienda-donnees-personnelles",
  "hacienda-produit-consommation",
  "hacienda-reglementaire",
  "hacienda-gouvernance-ia",
  "hacienda-propriete-intellectuelle",
  "hacienda-droit-public",
  "hacienda-permanences-juridiques",
  "hacienda-hub-confiance",
];

function readJson(path: string) {
  return JSON.parse(readFileSync(path, "utf8")) as { name?: string; plugins?: { name: string; source: string }[] };
}

describe("hacienda marketplace", () => {
  it("déclare tous les plugins attendus", () => {
    const marketplace = readJson(resolve(root, ".claude-plugin/marketplace.json"));
    const names = marketplace.plugins?.map((plugin) => plugin.name) ?? [];

    expect(names).toEqual(expectedPlugins);
  });

  it("chaque plugin a les fichiers structurants", () => {
    for (const plugin of expectedPlugins) {
      const dir = resolve(root, "plugins", plugin);
      expect(existsSync(resolve(dir, ".claude-plugin/plugin.json")), `${plugin} plugin.json`).toBe(true);
      expect(existsSync(resolve(dir, ".mcp.json")), `${plugin} .mcp.json`).toBe(true);
      expect(existsSync(resolve(dir, "CLAUDE.md")), `${plugin} CLAUDE.md`).toBe(true);
      expect(existsSync(resolve(dir, "README.md")), `${plugin} README.md`).toBe(true);
      expect(existsSync(resolve(dir, "skills/entretien-demarrage/SKILL.md")), `${plugin} entretien-demarrage`).toBe(true);
      expect(existsSync(resolve(dir, "hooks/hooks.json")), `${plugin} hooks`).toBe(true);
    }
  });
});
```

- [ ] **Step 2: Vérifier que le test échoue**

Run:

```bash
npm run test --workspace packages/core -- hacienda-marketplace.test.ts
```

Expected: FAIL car les plugins n'existent pas encore tous.

- [ ] **Step 3: Commit**

```bash
git add packages/core/test/hacienda-marketplace.test.ts
git commit -m "test: define hacienda marketplace structure"
```

## Task 2: Mettre À Jour Le Manifeste Marketplace

**Files:**
- Modify: `.claude-plugin/marketplace.json`

- [ ] **Step 1: Remplacer le manifeste par la liste complète**

Utiliser exactement cette structure :

```json
{
  "name": "hacienda-juridique",
  "owner": {
    "name": "Hacienda",
    "url": "https://hacienda.diy"
  },
  "plugins": [
    {
      "name": "hacienda-sources-officielles",
      "source": "./plugins/hacienda-sources-officielles",
      "description": "Accès local aux sources officielles françaises : Légifrance, BOFiP, JORF, KALI et jurisprudence via PISTE."
    },
    {
      "name": "hacienda-recherche-documentaire",
      "source": "./plugins/hacienda-recherche-documentaire",
      "description": "Recherche supervisée dans les bases documentaires utilisées par les avocats, avec vérification des sources primaires."
    },
    {
      "name": "hacienda-fiscal",
      "source": "./plugins/hacienda-fiscal",
      "description": "Fiscalité française : CGI, LPF, BOFiP, TVA, impôts directs, contrôle fiscal, rescrit et contentieux fiscal."
    },
    {
      "name": "hacienda-social",
      "source": "./plugins/hacienda-social",
      "description": "Droit social français : Code du travail, conventions collectives, licenciement, CSE et contentieux prud'homal."
    },
    {
      "name": "hacienda-contrats",
      "source": "./plugins/hacienda-contrats",
      "description": "Contrats commerciaux français : CGV, CGU, SaaS, NDA, distribution, baux commerciaux et clauses sensibles."
    },
    {
      "name": "hacienda-societes",
      "source": "./plugins/hacienda-societes",
      "description": "Droit des sociétés : gouvernance, assemblées, pactes, cessions, M&A, closing et vie sociale."
    },
    {
      "name": "hacienda-contentieux",
      "source": "./plugins/hacienda-contentieux",
      "description": "Contentieux français : chronologie, pièces, moyens, jurisprudence, assignations, conclusions et stratégie."
    },
    {
      "name": "hacienda-donnees-personnelles",
      "source": "./plugins/hacienda-donnees-personnelles",
      "description": "Données personnelles : RGPD, CNIL, DPA, AIPD, registre de traitements, cookies et violations de données."
    },
    {
      "name": "hacienda-produit-consommation",
      "source": "./plugins/hacienda-produit-consommation",
      "description": "Revue de lancement produit, droit de la consommation, marketing, plateformes et parcours utilisateurs."
    },
    {
      "name": "hacienda-reglementaire",
      "source": "./plugins/hacienda-reglementaire",
      "description": "Veille réglementaire française et européenne : JORF, LODA, autorités sectorielles et écarts de conformité."
    },
    {
      "name": "hacienda-gouvernance-ia",
      "source": "./plugins/hacienda-gouvernance-ia",
      "description": "Gouvernance IA : AI Act, RGPD, contrats fournisseurs, politiques internes et registre des cas d'usage."
    },
    {
      "name": "hacienda-propriete-intellectuelle",
      "source": "./plugins/hacienda-propriete-intellectuelle",
      "description": "Propriété intellectuelle : droit d'auteur, logiciel, marques, open source, clauses PI et contrefaçon."
    },
    {
      "name": "hacienda-droit-public",
      "source": "./plugins/hacienda-droit-public",
      "description": "Droit public : commande publique, urbanisme, collectivités, fonction publique et contentieux administratif."
    },
    {
      "name": "hacienda-permanences-juridiques",
      "source": "./plugins/hacienda-permanences-juridiques",
      "description": "Permanences juridiques et dispositifs pro bono supervisés : accueil, qualification, pièces, délais et handoff."
    },
    {
      "name": "hacienda-hub-confiance",
      "source": "./plugins/hacienda-hub-confiance",
      "description": "Hub de confiance pour installer, évaluer et maintenir des skills juridiques tiers avec contrôles de sécurité."
    }
  ]
}
```

- [ ] **Step 2: Vérifier que le test échoue encore sur les dossiers manquants**

Run:

```bash
npm run test --workspace packages/core -- hacienda-marketplace.test.ts
```

Expected: FAIL avec fichiers manquants.

- [ ] **Step 3: Commit**

```bash
git add .claude-plugin/marketplace.json
git commit -m "feat: define hacienda marketplace plugins"
```

## Task 3: Créer Le Squelette Commun Des Plugins Métiers

**Files:**
- Create directories under `plugins/<plugin>/`

- [ ] **Step 1: Créer les dossiers**

Run:

```bash
mkdir plugins/hacienda-fiscal plugins/hacienda-social plugins/hacienda-contrats plugins/hacienda-societes plugins/hacienda-contentieux plugins/hacienda-donnees-personnelles plugins/hacienda-produit-consommation plugins/hacienda-reglementaire plugins/hacienda-gouvernance-ia plugins/hacienda-propriete-intellectuelle plugins/hacienda-droit-public plugins/hacienda-permanences-juridiques plugins/hacienda-hub-confiance
```

Expected: dossiers créés. Si un dossier existe déjà après rebranding, le conserver et adapter son contenu.

- [ ] **Step 2: Créer l'arborescence commune dans chaque plugin**

Pour chaque plugin ci-dessus, créer :

```text
.claude-plugin/
skills/entretien-demarrage/
agents/
hooks/
```

- [ ] **Step 3: Ajouter `hooks/hooks.json` dans chaque plugin**

Contenu commun :

```json
{
  "hooks": {}
}
```

- [ ] **Step 4: Ajouter `.mcp.json` dans chaque plugin métier**

Contenu commun pour tous les plugins métier :

```json
{
  "mcpServers": {
    "Hacienda Sources Officielles": {
      "type": "stdio",
      "title": "Hacienda Sources Officielles",
      "description": "Accès local aux sources officielles françaises via PISTE."
    }
  },
  "recommendedCategories": [
    "recherche-juridique",
    "sources-officielles",
    "droit-francais"
  ]
}
```

Ne pas inclure de chemin local absolu dans cette première version.

- [ ] **Step 5: Commit**

```bash
git add plugins/hacienda-*
git commit -m "feat: scaffold hacienda practice plugins"
```

## Task 4: Ajouter Les Manifestes Plugin

**Files:**
- Create: `plugins/<plugin>/.claude-plugin/plugin.json`

- [ ] **Step 1: Créer les manifestes**

Créer les manifestes avec ces noms et descriptions :

```json
{"name":"hacienda-fiscal","version":"0.1.0","description":"Fiscalité française : CGI, LPF, BOFiP, TVA, impôts directs, contrôle fiscal, rescrit et contentieux fiscal.","author":{"name":"Hacienda","url":"https://hacienda.diy"},"repository":"https://github.com/jamon8888/hacienda-juridique","license":"EUPL-1.2","keywords":["hacienda","fiscal","bofip","cgi","lpf","tva","controle-fiscal"]}
```

```json
{"name":"hacienda-social","version":"0.1.0","description":"Droit social français : Code du travail, conventions collectives, licenciement, CSE et contentieux prud'homal.","author":{"name":"Hacienda","url":"https://hacienda.diy"},"repository":"https://github.com/jamon8888/hacienda-juridique","license":"EUPL-1.2","keywords":["hacienda","droit-social","code-du-travail","kali","idcc","prudhommes"]}
```

```json
{"name":"hacienda-contrats","version":"0.1.0","description":"Contrats commerciaux français : CGV, CGU, SaaS, NDA, distribution, baux commerciaux et clauses sensibles.","author":{"name":"Hacienda","url":"https://hacienda.diy"},"repository":"https://github.com/jamon8888/hacienda-juridique","license":"EUPL-1.2","keywords":["hacienda","contrats","cgv","cgu","saas","nda","distribution"]}
```

```json
{"name":"hacienda-societes","version":"0.1.0","description":"Droit des sociétés : gouvernance, assemblées, pactes, cessions, M&A, closing et vie sociale.","author":{"name":"Hacienda","url":"https://hacienda.diy"},"repository":"https://github.com/jamon8888/hacienda-juridique","license":"EUPL-1.2","keywords":["hacienda","societes","gouvernance","assemblees","pacte","cession","mna"]}
```

```json
{"name":"hacienda-contentieux","version":"0.1.0","description":"Contentieux français : chronologie, pièces, moyens, jurisprudence, assignations, conclusions et stratégie.","author":{"name":"Hacienda","url":"https://hacienda.diy"},"repository":"https://github.com/jamon8888/hacienda-juridique","license":"EUPL-1.2","keywords":["hacienda","contentieux","conclusions","assignation","jurisprudence","procedure"]}
```

```json
{"name":"hacienda-donnees-personnelles","version":"0.1.0","description":"Données personnelles : RGPD, CNIL, DPA, AIPD, registre de traitements, cookies et violations de données.","author":{"name":"Hacienda","url":"https://hacienda.diy"},"repository":"https://github.com/jamon8888/hacienda-juridique","license":"EUPL-1.2","keywords":["hacienda","rgpd","cnil","dpa","aipd","cookies"]}
```

```json
{"name":"hacienda-produit-consommation","version":"0.1.0","description":"Revue de lancement produit, droit de la consommation, marketing, plateformes et parcours utilisateurs.","author":{"name":"Hacienda","url":"https://hacienda.diy"},"repository":"https://github.com/jamon8888/hacienda-juridique","license":"EUPL-1.2","keywords":["hacienda","produit","consommation","marketing","plateforme"]}
```

```json
{"name":"hacienda-reglementaire","version":"0.1.0","description":"Veille réglementaire française et européenne : JORF, LODA, autorités sectorielles et écarts de conformité.","author":{"name":"Hacienda","url":"https://hacienda.diy"},"repository":"https://github.com/jamon8888/hacienda-juridique","license":"EUPL-1.2","keywords":["hacienda","reglementaire","jorf","loda","veille","conformite"]}
```

```json
{"name":"hacienda-gouvernance-ia","version":"0.1.0","description":"Gouvernance IA : AI Act, RGPD, contrats fournisseurs, politiques internes et registre des cas d'usage.","author":{"name":"Hacienda","url":"https://hacienda.diy"},"repository":"https://github.com/jamon8888/hacienda-juridique","license":"EUPL-1.2","keywords":["hacienda","ia","ai-act","rgpd","gouvernance"]}
```

```json
{"name":"hacienda-propriete-intellectuelle","version":"0.1.0","description":"Propriété intellectuelle : droit d'auteur, logiciel, marques, open source, clauses PI et contrefaçon.","author":{"name":"Hacienda","url":"https://hacienda.diy"},"repository":"https://github.com/jamon8888/hacienda-juridique","license":"EUPL-1.2","keywords":["hacienda","propriete-intellectuelle","droit-auteur","logiciel","marques","open-source"]}
```

```json
{"name":"hacienda-droit-public","version":"0.1.0","description":"Droit public : commande publique, urbanisme, collectivités, fonction publique et contentieux administratif.","author":{"name":"Hacienda","url":"https://hacienda.diy"},"repository":"https://github.com/jamon8888/hacienda-juridique","license":"EUPL-1.2","keywords":["hacienda","droit-public","commande-publique","urbanisme","collectivites"]}
```

```json
{"name":"hacienda-permanences-juridiques","version":"0.1.0","description":"Permanences juridiques et dispositifs pro bono supervisés : accueil, qualification, pièces, délais et handoff.","author":{"name":"Hacienda","url":"https://hacienda.diy"},"repository":"https://github.com/jamon8888/hacienda-juridique","license":"EUPL-1.2","keywords":["hacienda","permanences","pro-bono","accueil","qualification"]}
```

```json
{"name":"hacienda-hub-confiance","version":"0.1.0","description":"Hub de confiance pour installer, évaluer et maintenir des skills juridiques tiers avec contrôles de sécurité.","author":{"name":"Hacienda","url":"https://hacienda.diy"},"repository":"https://github.com/jamon8888/hacienda-juridique","license":"EUPL-1.2","keywords":["hacienda","hub","confiance","skills","securite","licence"]}
```

- [ ] **Step 2: Commit**

```bash
git add plugins/hacienda-*/.claude-plugin/plugin.json
git commit -m "feat: add hacienda plugin manifests"
```

## Task 5: Ajouter Les Profils CLAUDE.md Et Entretien De Démarrage

**Files:**
- Create: `plugins/<plugin>/CLAUDE.md`
- Create: `plugins/<plugin>/skills/entretien-demarrage/SKILL.md`

- [ ] **Step 1: Créer le `CLAUDE.md` commun adapté par plugin**

Chaque `CLAUDE.md` doit commencer par :

```markdown
<!--
CONFIGURATION UTILISATEUR

La configuration de ce plugin vit dans :

  ~/.claude/plugins/config/hacienda-juridique/<NOM_PLUGIN>/CLAUDE.md

Règles :
1. Lire le profil cabinet partagé : ~/.claude/plugins/config/hacienda-juridique/profil-cabinet.md
2. Lire ce profil de pratique avant tout travail substantiel.
3. Si ce fichier n'existe pas ou contient encore [A CONFIGURER], arrêter et demander d'exécuter /<NOM_PLUGIN>:entretien-demarrage.
4. Ne jamais présenter une source juridique comme vérifiée sans hacienda-sources-officielles.
-->
```

Puis inclure :

```markdown
# Profil De Pratique

## Qui Nous Sommes

[A CONFIGURER]

## Qui Utilise Le Plugin

[A CONFIGURER]

## Sources Et Vérification

Toute citation juridique doit être vérifiée via `hacienda-sources-officielles`. Si la source officielle n'a pas été consultée via MCP, la citation doit être marquée `[à vérifier]`.

## Livrables

Chaque livrable professionnel inclut un dossier de preuve ou une section "sources à vérifier".
```

- [ ] **Step 2: Créer `entretien-demarrage/SKILL.md`**

Chaque plugin reçoit un entretien adapté avec ce socle :

```markdown
---
name: entretien-demarrage
description: Configure le profil de pratique Hacienda pour ce plugin.
argument-hint: "[optionnel: --reconfigurer]"
---

# Entretien De Démarrage

## But

Créer ou mettre à jour le profil de pratique dans `~/.claude/plugins/config/hacienda-juridique/<NOM_PLUGIN>/CLAUDE.md`.

## Questions

1. Quel est votre rôle : avocat, juriste, expert-comptable, fiscaliste, autre professionnel ?
2. Quel type de structure utilisez-vous : cabinet, direction juridique, cabinet comptable, institution, autre ?
3. Quels livrables voulez-vous produire avec ce plugin ?
4. Quelles sources ou bases documentaires utilisez-vous déjà ?
5. Quel niveau de risque impose une validation humaine avant sortie ?
6. Où doivent être conservés les dossiers de preuve ?

## Sortie

Créer un profil complet sans marqueur `[A CONFIGURER]`.
```

Remplacer `<NOM_PLUGIN>` par le nom réel dans chaque fichier.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-*/CLAUDE.md plugins/hacienda-*/skills/entretien-demarrage/SKILL.md
git commit -m "feat: add hacienda practice profiles"
```

## Task 6: Ajouter README Et Première Liste De Skills Par Plugin

**Files:**
- Create: `plugins/<plugin>/README.md`

- [ ] **Step 1: Créer les README**

Chaque README doit contenir :

````markdown
# <Nom Lisible>

## Mission

<mission du plugin depuis la spec>

## Sources

Ce plugin dépend de `hacienda-sources-officielles` pour les sources primaires.

## Commande De Démarrage

```text
/<nom-plugin>:entretien-demarrage
```

## Livrables

- dossier de preuve ;
- note ou mémo professionnel ;
- sources vérifiées ;
- points à relire manuellement.
````

- [ ] **Step 2: Ajouter la liste exacte de skills par README**

Utiliser les listes de la spec `2026-05-14-hacienda-plugins-metiers-design.md`. Ne pas créer encore tous les fichiers `SKILL.md` sauf `entretien-demarrage`; les prochains plans par plugin détailleront leur contenu.

- [ ] **Step 3: Vérifier le test marketplace**

Run:

```bash
npm run test --workspace packages/core -- hacienda-marketplace.test.ts
```

Expected: PASS si `hacienda-recherche-documentaire` existe ; sinon FAIL sur ce plugin jusqu'au plan dédié.

- [ ] **Step 4: Commit**

```bash
git add plugins/hacienda-*/README.md
git commit -m "docs: add hacienda plugin readmes"
```

## Task 7: Vérification Globale Marketplace

**Files:**
- Modify: files reported by checks

- [ ] **Step 1: Lancer les vérifications**

Run:

```bash
npm run branding:check
npm run test --workspace packages/core -- hacienda-marketplace.test.ts
git diff --check
```

Expected: exit 0 pour chaque commande.

- [ ] **Step 2: Commit final si corrections**

```bash
git add .
git commit -m "test: verify hacienda marketplace skeleton"
```
