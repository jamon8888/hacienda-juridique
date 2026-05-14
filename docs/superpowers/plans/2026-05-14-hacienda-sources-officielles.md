# Hacienda Sources Officielles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire depuis zéro le plugin `hacienda-sources-officielles`, socle MCP des sources primaires françaises.

**Architecture:** Le plugin expose un serveur MCP local et un package partagé `@hacienda/core`. Les tools haut niveau couvrent Légifrance, BOFiP, JORF, KALI et jurisprudence officielle. Les plugins métiers ne manipulent pas directement les endpoints experts sauf nécessité documentée.

**Tech Stack:** TypeScript, Node.js 20, MCP SDK, Vitest, esbuild, npm workspaces, PISTE, Zod.

---

## Task 1: Initialiser Le Monorepo Technique

**Files:**
- Create: `package.json`
- Create: `tsconfig.base.json`
- Create: `packages/core/package.json`
- Create: `plugins/hacienda-sources-officielles/mcp-server/package.json`

- [ ] **Step 1: Créer `package.json`**

```json
{
  "name": "hacienda-juridique",
  "version": "0.1.0",
  "private": true,
  "description": "Place de marché Hacienda pour plugins juridiques français.",
  "workspaces": [
    "packages/*",
    "plugins/*/mcp-server"
  ],
  "scripts": {
    "build": "npm run build --workspaces --if-present",
    "test": "npm run test --workspaces --if-present",
    "typecheck": "npm run typecheck --workspaces --if-present"
  },
  "engines": {
    "node": ">=20"
  },
  "author": "Hacienda (https://hacienda.diy)",
  "license": "EUPL-1.2"
}
```

- [ ] **Step 2: Installer les dépendances**

Run:

```bash
npm install @modelcontextprotocol/sdk zod undici
npm install -D typescript vitest @types/node esbuild
```

Expected: `package-lock.json` créé.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json tsconfig.base.json packages plugins
git commit -m "chore: initialize hacienda sources workspace"
```

## Task 2: Implémenter La Configuration PISTE

**Files:**
- Create: `packages/core/src/config.ts`
- Create: `packages/core/test/config.test.ts`

- [ ] **Step 1: Écrire le test**

```ts
import { describe, expect, it } from "vitest";
import { loadConfig } from "../src/config.js";

describe("loadConfig", () => {
  it("ignore les placeholders et utilise le namespace Hacienda", () => {
    process.env.PISTE_CLIENT_ID = "${PISTE_CLIENT_ID}";
    process.env.PISTE_CLIENT_SECRET = "${PISTE_CLIENT_SECRET}";
    process.env.HACIENDA_CREDENTIALS_FILE = "__missing_hacienda_credentials__.json";

    const config = loadConfig();

    expect(config.credentialsSource).toBe("none");
    expect(config.clientId).toBeUndefined();
    expect(config.clientSecret).toBeUndefined();
  });
});
```

- [ ] **Step 2: Implémenter `loadConfig`**

La configuration doit lire :

```text
PISTE_CLIENT_ID
PISTE_CLIENT_SECRET
PISTE_ENV
HACIENDA_CREDENTIALS_FILE
~/.config/hacienda/credentials.json
```

- [ ] **Step 3: Vérifier**

Run:

```bash
npm run test --workspace packages/core -- config.test.ts
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add packages/core/src/config.ts packages/core/test/config.test.ts
git commit -m "feat: add hacienda piste configuration"
```

## Task 3: Ajouter Le Serveur MCP Et Les Tools Sources

**Files:**
- Create: `packages/core/src/index.ts`
- Create: `packages/core/src/tools/status.ts`
- Create: `packages/core/src/tools/recherche.ts`
- Create: `packages/core/src/tools/api-call.ts`
- Create: `plugins/hacienda-sources-officielles/mcp-server/src/index.ts`
- Create: `packages/core/test/smoke.test.ts`

- [ ] **Step 1: Écrire le smoke test**

Le test doit démarrer `plugins/hacienda-sources-officielles/mcp-server/dist/index.js` et vérifier la présence de :

```text
piste_status
legifrance_recherche
legifrance_rechercher
legifrance_get_article
legifrance_get_code
legifrance_get_loda
legifrance_get_jurisprudence
legifrance_get_jorf
legifrance_get_circulaire
legifrance_suggest
legifrance_api_call
bofip_rechercher
bofip_consulter
piste_cache_clear
```

- [ ] **Step 2: Implémenter `createHaciendaServer`**

Exporter :

```ts
export function createHaciendaServer(opts: CreateServerOptions): CreatedServer
```

Le serveur doit enregistrer tous les tools ci-dessus.

- [ ] **Step 3: Vérifier**

Run:

```bash
npm run build --workspaces --if-present
npm run test --workspace packages/core -- smoke.test.ts
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add packages/core plugins/hacienda-sources-officielles/mcp-server
git commit -m "feat: add hacienda official sources mcp"
```

## Task 4: Ajouter Les Skills De Preuve

**Files:**
- Create: `plugins/hacienda-sources-officielles/skills/verifier-citation/SKILL.md`
- Create: `plugins/hacienda-sources-officielles/skills/dossier-preuve/SKILL.md`
- Create: `plugins/hacienda-sources-officielles/skills/verifier-version/SKILL.md`
- Create: `plugins/hacienda-sources-officielles/skills/cartographier-sources/SKILL.md`
- Create: `plugins/hacienda-sources-officielles/skills/classer-autorite/SKILL.md`

- [ ] **Step 1: Créer les skills**

Chaque skill doit être en français et imposer le dossier de preuve :

```text
Source
Référence
Identifiant
Version/date
Date de consultation
Outil utilisé
Statut
```

- [ ] **Step 2: Commit**

```bash
git add plugins/hacienda-sources-officielles/skills
git commit -m "feat: add hacienda proof skills"
```

## Task 5: Vérification Finale

- [ ] **Step 1: Lancer les vérifications**

```bash
npm run build --workspaces --if-present
npm run typecheck --workspaces --if-present
npm run test --workspaces --if-present
npm audit --audit-level=moderate
```

Expected: tous exit 0.

- [ ] **Step 2: Vérifier l'identité Hacienda**

```bash
rg -n "Hacienda|hacienda|hacienda\\.diy|jamon8888" README.md docs
```

Expected: les sorties concernent uniquement l'identité Hacienda et le dépôt `jamon8888/hacienda-juridique`.

- [ ] **Step 3: Commit si corrections**

```bash
git add .
git commit -m "chore: verify clean hacienda sources foundation"
```
