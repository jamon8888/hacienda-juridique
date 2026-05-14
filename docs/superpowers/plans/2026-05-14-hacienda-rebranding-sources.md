# Rebranding Hacienda Et Sources Officielles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Renommer le socle existant en Hacienda et transformer le serveur MCP Légifrance/BOFiP en plugin `hacienda-sources-officielles`.

**Architecture:** Le package partagé devient `@hacienda/core`, expose `createHaciendaServer`, et garde les tools Légifrance/BOFiP déjà finalisés. Le plugin existant `plugins/hacienda` devient `plugins/hacienda-sources-officielles`; les chemins de credentials passent de `~/.config/hacienda` à `~/.config/hacienda`. Les anciens plugins métier sont renommés ou remplacés dans les plans suivants, sans conserver de référence visible à l'ancien branding.

**Tech Stack:** TypeScript, Node.js 20, MCP SDK, Vitest, esbuild, npm workspaces, Markdown plugins Claude.

---

## Fichiers À Créer Ou Modifier

- Créer : `scripts/check-hacienda-branding.mjs`
- Modifier : `package.json`
- Modifier : `package-lock.json`
- Modifier : `.claude-plugin/marketplace.json`
- Modifier : `packages/core/package.json`
- Modifier : `packages/core/src/config.ts`
- Modifier : `packages/core/src/index.ts`
- Modifier : `packages/core/src/tools/status.ts`
- Modifier : `packages/core/test/smoke.test.ts`
- Modifier : `packages/core/test/config.test.ts` si ce fichier existe ; sinon créer `packages/core/test/config.test.ts`
- Renommer : `plugins/hacienda/` vers `plugins/hacienda-sources-officielles/`
- Modifier : `plugins/hacienda-sources-officielles/.claude-plugin/plugin.json`
- Modifier : `plugins/hacienda-sources-officielles/mcp-server/package.json`
- Modifier : `plugins/hacienda-sources-officielles/mcp-server/src/index.ts`
- Modifier : `plugins/hacienda-sources-officielles/README.md`
- Modifier : `plugins/hacienda-sources-officielles/INSTALL.md`
- Modifier : `plugins/hacienda-sources-officielles/hooks/hooks.json`
- Modifier : `plugins/hacienda-sources-officielles/scripts/setup-credentials.mjs`
- Modifier : `plugins/hacienda-sources-officielles/scripts/check-piste-env.mjs`
- Modifier : `plugins/hacienda-sources-officielles/scripts/verify-piste.mjs`
- Créer : `plugins/hacienda-sources-officielles/skills/verifier-citation/SKILL.md`
- Créer : `plugins/hacienda-sources-officielles/skills/dossier-preuve/SKILL.md`
- Créer : `plugins/hacienda-sources-officielles/skills/verifier-version/SKILL.md`
- Créer : `plugins/hacienda-sources-officielles/skills/cartographier-sources/SKILL.md`
- Créer : `plugins/hacienda-sources-officielles/skills/classer-autorite/SKILL.md`
- Créer : `plugins/hacienda-sources-officielles/agents/veilleur-sources.md`
- Créer : `plugins/hacienda-sources-officielles/agents/controleur-citations.md`

## Task 1: Ajouter Le Garde-Fou De Branding

**Files:**
- Create: `scripts/check-hacienda-branding.mjs`
- Modify: `package.json`

- [ ] **Step 1: Créer le script de scan**

Créer `scripts/check-hacienda-branding.mjs` :

```js
#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const blocked = [
  /\bHacienda\b/,
  /\bhacienda\b/,
  /@hacienda\//,
  /HACIENDA_/,
  /\.config[\\/]+hacienda/,
  /plugin_hacienda/,
  /hacienda-suite/,
];

const ignoredDirs = new Set([
  ".git",
  ".gitnexus",
  ".cache",
  ".worktrees",
  "node_modules",
  "dist",
]);

const ignoredFiles = new Set([
  "docs/superpowers/specs/2026-05-14-legifrance-complete-coverage-design.md",
  "docs/superpowers/plans/2026-05-14-legifrance-complete-coverage.md",
]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const rel = relative(root, path).replaceAll("\\", "/");
    const stat = statSync(path);
    if (rel.startsWith("docs/superpowers/")) continue;
    if (stat.isDirectory()) {
      if (!ignoredDirs.has(name)) walk(path, out);
      continue;
    }
    if (!stat.isFile()) continue;
    if (ignoredFiles.has(rel)) continue;
    if (/\.(png|jpg|jpeg|gif|ico|map|db|zip)$/i.test(name)) continue;
    out.push(path);
  }
  return out;
}

const findings = [];
for (const file of walk(root)) {
  const rel = relative(root, file).replaceAll("\\", "/");
  const text = readFileSync(file, "utf8");
  const lines = text.split(/\r?\n/);
  lines.forEach((line, index) => {
    if (blocked.some((pattern) => pattern.test(line))) {
      findings.push(`${rel}:${index + 1}: ${line.trim()}`);
    }
  });
}

if (findings.length > 0) {
  console.error("Références à l'ancien branding détectées:");
  for (const finding of findings) console.error(`- ${finding}`);
  process.exit(1);
}

console.log("Branding Hacienda vérifié.");
```

- [ ] **Step 2: Ajouter le script npm**

Dans `package.json`, ajouter :

```json
"branding:check": "node scripts/check-hacienda-branding.mjs"
```

Le bloc `scripts` devient :

```json
"scripts": {
  "build": "npm run build --workspaces --if-present",
  "test": "npm run test --workspaces --if-present",
  "typecheck": "npm run typecheck --workspaces --if-present",
  "branding:check": "node scripts/check-hacienda-branding.mjs"
}
```

- [ ] **Step 3: Vérifier que le garde-fou échoue avant rebranding**

Run:

```bash
npm run branding:check
```

Expected: FAIL avec plusieurs références à l'ancien branding.

- [ ] **Step 4: Commit**

```bash
git add package.json scripts/check-hacienda-branding.mjs
git commit -m "test: add hacienda branding guard"
```

## Task 2: Renommer Le Package Core Et L'API Serveur

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `packages/core/package.json`
- Modify: `packages/core/src/index.ts`
- Modify: `plugins/hacienda/mcp-server/package.json`
- Modify: `plugins/hacienda/mcp-server/src/index.ts`
- Test: `packages/core/test/smoke.test.ts`

- [ ] **Step 1: Modifier le nom du monorepo**

Dans `package.json`, remplacer :

```json
"name": "hacienda-suite"
```

par :

```json
"name": "hacienda-juridique"
```

Remplacer la description par :

```json
"description": "Place de marché de plugins juridiques français Hacienda — sources officielles Légifrance/BOFiP via PISTE et workflows métiers pour professionnels du droit."
```

- [ ] **Step 2: Modifier le package core**

Dans `packages/core/package.json`, remplacer :

```json
"name": "@hacienda/core"
```

par :

```json
"name": "@hacienda/core"
```

Remplacer la description par :

```json
"description": "Bibliothèque partagée Hacienda : client PISTE OAuth, cache local, schémas Zod, tools Légifrance et BOFiP."
```

- [ ] **Step 3: Renommer l'export serveur**

Dans `packages/core/src/index.ts`, remplacer `createHaciendaServer` par `createHaciendaServer`.

Le bloc final doit exposer :

```ts
export function createHaciendaServer(opts: CreateServerOptions): CreatedServer {
  const config = loadConfig();
  log.info(`${opts.name} mcp server starting`, { env: config.env });

  const cache = new ResponseCache({ path: `${config.cacheDir}/cache.db` });
  const auth = new PisteClient(config);
  const http = new PisteHttpClient(config, auth, { cache });
  const route = new LegifranceRouteClient(http);

  const server = new McpServer({ name: opts.name, version: opts.version });

  registerStatus(server, config, cache, auth, http);
  registerGetArticle(server, http);
  registerGetCode(server, http);
  registerGetLoda(server, http);
  registerGetJurisprudence(server, http);
  registerGetJorf(server, http);
  registerGetCirculaire(server, http);
  registerRecherche(server, http);
  registerSuggest(server, http);
  registerCacheClear(server, cache);
  registerApiCall(server, route);
  registerBofipAliases(server, http);

  const start = async () => {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    log.info(`${opts.name} mcp server connected`);

    const shutdown = () => {
      log.info(`${opts.name} mcp server shutting down`);
      cache.close();
      process.exit(0);
    };
    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  };

  return { server, start };
}
```

- [ ] **Step 4: Mettre à jour l'entrée serveur actuelle**

Dans `plugins/hacienda/mcp-server/src/index.ts`, remplacer le contenu par :

```ts
#!/usr/bin/env node
import { createHaciendaServer, log } from "@hacienda/core";

const { start } = createHaciendaServer({ name: "hacienda-sources-officielles", version: "0.1.0" });

start().catch((err) => {
  log.error("fatal", { err: err instanceof Error ? err.message : String(err) });
  process.exit(1);
});
```

- [ ] **Step 5: Modifier le package du serveur actuel**

Dans `plugins/hacienda/mcp-server/package.json`, remplacer :

```json
"name": "@hacienda/plugin-hacienda-server"
```

par :

```json
"name": "@hacienda/plugin-sources-officielles-server"
```

Remplacer la dépendance :

```json
"@hacienda/core": "*"
```

par :

```json
"@hacienda/core": "*"
```

- [ ] **Step 6: Mettre à jour le lockfile**

Run:

```bash
npm install --package-lock-only
```

Expected: exit 0.

- [ ] **Step 7: Vérifier le build**

Run:

```bash
npm run build --workspaces --if-present
```

Expected: exit 0.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json packages/core/package.json packages/core/src/index.ts plugins/hacienda/mcp-server/package.json plugins/hacienda/mcp-server/src/index.ts
git commit -m "refactor: rename core package to hacienda"
```

## Task 3: Renommer La Configuration Locale

**Files:**
- Modify: `packages/core/src/config.ts`
- Create or Modify: `packages/core/test/config.test.ts`
- Modify: `packages/core/test/smoke.test.ts`
- Modify: `plugins/hacienda/scripts/setup-credentials.mjs`
- Modify: `plugins/hacienda/scripts/check-piste-env.mjs`
- Modify: `plugins/hacienda/scripts/verify-piste.mjs`

- [ ] **Step 1: Ajouter les tests de configuration**

Créer ou modifier `packages/core/test/config.test.ts` :

```ts
import { afterEach, describe, expect, it } from "vitest";
import { loadConfig } from "../src/config.js";

const originalEnv = { ...process.env };

afterEach(() => {
  process.env = { ...originalEnv };
});

describe("loadConfig", () => {
  it("ignore les placeholders Cowork et utilise HACIENDA_CREDENTIALS_FILE", () => {
    process.env.PISTE_CLIENT_ID = "${PISTE_CLIENT_ID}";
    process.env.PISTE_CLIENT_SECRET = "${PISTE_CLIENT_SECRET}";
    process.env.HACIENDA_CREDENTIALS_FILE = "__hacienda_missing_credentials__.json";
    delete process.env.HACIENDA_CREDENTIALS_FILE;

    const config = loadConfig();

    expect(config.clientId).toBeUndefined();
    expect(config.clientSecret).toBeUndefined();
    expect(config.credentialsSource).toBe("none");
  });
});
```

- [ ] **Step 2: Exécuter le test pour constater l'échec**

Run:

```bash
npm run test --workspace packages/core -- config.test.ts
```

Expected: FAIL car `HACIENDA_CREDENTIALS_FILE` n'est pas encore lu.

- [ ] **Step 3: Modifier `config.ts`**

Remplacer les références de configuration :

```ts
process.env.HACIENDA_CREDENTIALS_FILE
resolve(homedir(), ".config", "hacienda", "credentials.json")
```

par :

```ts
process.env.HACIENDA_CREDENTIALS_FILE
resolve(homedir(), ".config", "hacienda", "credentials.json")
```

Mettre à jour les commentaires pour parler de Hacienda.

- [ ] **Step 4: Modifier le smoke test**

Dans `packages/core/test/smoke.test.ts`, remplacer :

```ts
HACIENDA_CREDENTIALS_FILE: "__hacienda_smoke_missing_credentials__.json",
```

par :

```ts
HACIENDA_CREDENTIALS_FILE: "__hacienda_smoke_missing_credentials__.json",
```

- [ ] **Step 5: Modifier les scripts credentials**

Dans les trois scripts sous `plugins/hacienda/scripts/`, remplacer :

```js
resolve(homedir(), ".config", "hacienda", "credentials.json")
```

par :

```js
resolve(homedir(), ".config", "hacienda", "credentials.json")
```

Remplacer les textes utilisateurs par "Hacienda".

- [ ] **Step 6: Vérifier le test**

Run:

```bash
npm run test --workspace packages/core -- config.test.ts
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add packages/core/src/config.ts packages/core/test/config.test.ts packages/core/test/smoke.test.ts plugins/hacienda/scripts/setup-credentials.mjs plugins/hacienda/scripts/check-piste-env.mjs plugins/hacienda/scripts/verify-piste.mjs
git commit -m "refactor: move credentials config to hacienda"
```

## Task 4: Renommer Le Plugin Socle

**Files:**
- Move: `plugins/hacienda/` to `plugins/hacienda-sources-officielles/`
- Modify: `.claude-plugin/marketplace.json`
- Modify: `plugins/hacienda-sources-officielles/.claude-plugin/plugin.json`
- Modify: `plugins/hacienda-sources-officielles/mcp-server/package.json`
- Modify: `packages/core/test/smoke.test.ts`

- [ ] **Step 1: Renommer le dossier plugin**

Run:

```bash
git mv plugins/hacienda plugins/hacienda-sources-officielles
```

Expected: dossier renommé.

- [ ] **Step 2: Modifier le manifeste plugin**

Dans `plugins/hacienda-sources-officielles/.claude-plugin/plugin.json`, utiliser :

```json
{
  "name": "hacienda-sources-officielles",
  "version": "0.1.0",
  "description": "Hacienda Sources Officielles — accès local aux sources officielles françaises : Légifrance, BOFiP, JORF, KALI et jurisprudence via PISTE.",
  "author": {
    "name": "Hacienda",
    "url": "https://hacienda.diy"
  },
  "repository": "https://github.com/hacienda/hacienda-juridique",
  "license": "EUPL-1.2",
  "keywords": [
    "hacienda",
    "légifrance",
    "bofip",
    "jorf",
    "kali",
    "jurisprudence",
    "piste",
    "sources-officielles",
    "avocat"
  ]
}
```

- [ ] **Step 3: Modifier le manifeste marketplace**

Dans `.claude-plugin/marketplace.json`, garder uniquement le socle au terme de cette tâche :

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
    }
  ]
}
```

- [ ] **Step 4: Modifier le chemin serveur du smoke test**

Dans `packages/core/test/smoke.test.ts`, remplacer le chemin serveur par :

```ts
const SERVER = resolve(__dirname, "../../../plugins/hacienda-sources-officielles/mcp-server/dist/index.js");
```

Renommer le `describe` :

```ts
describe("hacienda sources officielles mcp server — smoke", () => {
```

- [ ] **Step 5: Vérifier build et smoke**

Run:

```bash
npm run build --workspaces --if-present
npm run test --workspace packages/core -- smoke.test.ts
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add .claude-plugin/marketplace.json packages/core/test/smoke.test.ts plugins/hacienda-sources-officielles
git commit -m "refactor: rename source plugin to hacienda"
```

## Task 5: Ajouter Les Skills De Preuve Du Socle

**Files:**
- Create: `plugins/hacienda-sources-officielles/skills/verifier-citation/SKILL.md`
- Create: `plugins/hacienda-sources-officielles/skills/dossier-preuve/SKILL.md`
- Create: `plugins/hacienda-sources-officielles/skills/verifier-version/SKILL.md`
- Create: `plugins/hacienda-sources-officielles/skills/cartographier-sources/SKILL.md`
- Create: `plugins/hacienda-sources-officielles/skills/classer-autorite/SKILL.md`

- [ ] **Step 1: Créer `verifier-citation`**

Contenu attendu :

````markdown
---
name: verifier-citation
description: Vérifie une citation juridique française en la rapprochant d'une source officielle via Hacienda Sources Officielles.
argument-hint: "[citation juridique]"
---

# Vérifier Une Citation

## But

Transformer une citation libre en référence vérifiée, ou la marquer explicitement `[à vérifier]`.

## Sources

Utiliser dans cet ordre :

1. `legifrance_get_article` pour les articles de code.
2. `legifrance_get_jurisprudence` pour les décisions.
3. `legifrance_get_loda` ou `legifrance_get_jorf` pour les textes.
4. `bofip_consulter` pour les références BOFiP.
5. `legifrance_rechercher` si l'identifiant exact manque.

## Sortie

```text
Citation analysée :
Source officielle :
Identifiant :
Version/date :
Date de consultation :
Statut : vérifié | ambigu | non trouvé | à vérifier
Lien officiel :
Observation :
```
````

- [ ] **Step 2: Créer `dossier-preuve`**

Le skill doit imposer le tableau :

```markdown
| Source | Référence | Identifiant | Version/date | Consultation | Outil | Statut |
|---|---|---|---|---|---|---|
```

Statuts autorisés : `vérifié`, `à vérifier`, `ambigu`, `source secondaire uniquement`, `non trouvé`.

- [ ] **Step 3: Créer `verifier-version`**

Inclure les règles :

```text
Ne jamais supposer qu'un article actuel était applicable à une date passée.
Si la version applicable n'est pas récupérée, marquer [à vérifier].
Toujours préciser date de consultation et date d'application.
```

- [ ] **Step 4: Créer `cartographier-sources`**

Inclure la matrice :

```text
Fiscal -> CGI, LPF, BOFiP, CE.
Social -> Code du travail, KALI/IDCC, Cass. soc., JORF.
Contrats -> Code civil, Code de commerce, Cass. com.
Contentieux -> Code de procédure, texte de fond, jurisprudence.
Droit public -> CJA, CCP, CGCT, Code urbanisme, CETAT.
```

- [ ] **Step 5: Créer `classer-autorite`**

Inclure les catégories :

```text
loi
règlement
jurisprudence
doctrine administrative
convention collective
source éditoriale
document utilisateur
```

- [ ] **Step 6: Commit**

```bash
git add plugins/hacienda-sources-officielles/skills
git commit -m "feat: add official source proof skills"
```

## Task 6: Nettoyer Les Références Anciennes Et Vérifier

**Files:**
- Modify: all files reported by `npm run branding:check`

- [ ] **Step 1: Lancer le scan**

Run:

```bash
npm run branding:check
```

Expected: FAIL tant que les anciens plugins métier non renommés existent.

- [ ] **Step 2: Supprimer ou exclure les anciens plugins métier de la marketplace**

Si `plugins/hacienda-affaires` et `plugins/hacienda-social` existent encore, ne pas les laisser dans `.claude-plugin/marketplace.json`. Ils seront traités dans le plan marketplace métiers.

- [ ] **Step 3: Remplacer les références restantes dans docs et scripts actifs**

Remplacer les textes utilisateurs par Hacienda. Ne pas conserver d'alias public vers l'ancien nom.

- [ ] **Step 4: Lancer les vérifications complètes**

Run:

```bash
npm run branding:check
npm run build --workspaces --if-present
npm run typecheck --workspaces --if-present
npm run test --workspaces --if-present
npm audit --audit-level=moderate
```

Expected: tous exit 0.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: remove legacy branding references"
```
