# Hacienda Plugin Factory Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an internal Hacienda plugin factory that creates, documents, validates, and harmonizes plugins using the strict engineering structure observed in the local Claude Legal reference while keeping all shipped content Hacienda-only.

**Architecture:** Add a small TypeScript workspace under `tools/hacienda-plugin-factory` with focused modules for registry loading, contract validation, documentation generation, and plugin scaffolding. The registry becomes the source of truth for marketplace/tests/docs, and Vitest tests call the same validator instead of duplicating rules.

**Tech Stack:** Node 20, TypeScript `NodeNext`, Vitest, npm workspaces, JSON manifests, Markdown templates, no heavy runtime dependencies.

---

## File Structure

- Create `plugins/registry.json`: declarative registry for active plugins.
- Create `tools/hacienda-plugin-factory/package.json`: workspace package for factory commands.
- Create `tools/hacienda-plugin-factory/tsconfig.json`: TypeScript build config.
- Create `tools/hacienda-plugin-factory/src/types.ts`: shared types for registry, plugins, validation findings.
- Create `tools/hacienda-plugin-factory/src/paths.ts`: repo-root and path helpers.
- Create `tools/hacienda-plugin-factory/src/registry.ts`: load and validate registry JSON.
- Create `tools/hacienda-plugin-factory/src/validate-plugin.ts`: central validator and CLI.
- Create `tools/hacienda-plugin-factory/src/generate-docs.ts`: marketplace regeneration from registry.
- Create `tools/hacienda-plugin-factory/src/create-plugin.ts`: plugin scaffolding CLI.
- Create `tools/hacienda-plugin-factory/src/add-skill.ts`: skill scaffolding CLI.
- Create `tools/hacienda-plugin-factory/src/add-agent.ts`: agent scaffolding CLI.
- Create `tools/hacienda-plugin-factory/src/harmonize-plugin.ts`: first harmonization helper.
- Create `tools/hacienda-plugin-factory/src/compare-with-reference.ts`: structural comparison against the local reference path when available.
- Create template files under `tools/hacienda-plugin-factory/templates/`.
- Modify `package.json`: add workspace and npm scripts.
- Modify `packages/core/test/hacienda-marketplace.test.ts`: derive expected plugins from registry.
- Create `packages/core/test/hacienda-plugin-contract.test.ts`: assert validator passes for active plugins.
- Modify `packages/core/test/hacienda-skill-guardrails.test.ts`: reuse validator coverage or narrow it to regression coverage.

---

### Task 1: Add Plugin Registry Source Of Truth

**Files:**
- Create: `plugins/registry.json`
- Modify: `packages/core/test/hacienda-marketplace.test.ts`

- [ ] **Step 1: Write the failing registry-aware marketplace test**

Replace the hard-coded `expectedPlugins` block in `packages/core/test/hacienda-marketplace.test.ts` with registry loading:

```ts
type PluginRegistryEntry = {
  name: string;
  type: "source-foundation" | "legal-domain" | "legal-domain-with-mcp" | "transversal-research";
  source: string;
  description: string;
  skills: string[];
  agents: string[];
  mcp: {
    mode: "none" | "references-source-foundation" | "own-stdio-server";
  };
};

type PluginRegistry = {
  plugins: PluginRegistryEntry[];
};

const registry = JSON.parse(
  readFileSync(resolve(root, "plugins/registry.json"), "utf8")
) as PluginRegistry;

const expectedPlugins = registry.plugins.map((plugin) => plugin.name);
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
npm --workspace @hacienda/core test -- --run test/hacienda-marketplace.test.ts
```

Expected: failure because `plugins/registry.json` does not exist.

- [ ] **Step 3: Create `plugins/registry.json`**

Create:

```json
{
  "plugins": [
    {
      "name": "hacienda-sources-officielles",
      "type": "source-foundation",
      "source": "./plugins/hacienda-sources-officielles",
      "description": "Accès local aux sources officielles françaises : Légifrance, BOFiP, JORF, KALI et jurisprudence via PISTE.",
      "skills": ["entretien-demarrage"],
      "agents": [],
      "mcp": {
        "mode": "references-source-foundation"
      }
    },
    {
      "name": "hacienda-recherche-documentaire",
      "type": "transversal-research",
      "source": "./plugins/hacienda-recherche-documentaire",
      "description": "Recherche supervisée dans les bases documentaires utilisées par les avocats, avec vérification des sources primaires.",
      "skills": [
        "entretien-demarrage",
        "preparation-requete",
        "recherche-doctrine",
        "recherche-lefebvre-dalloz",
        "recherche-lexis",
        "recherche-lextenso",
        "comparaison-bases",
        "controle-copyright",
        "dossier-documentaire",
        "extraction-references",
        "verification-sources-primaires"
      ],
      "agents": ["consolidateur-recherche", "controleur-sources", "veilleur-documentaire"],
      "mcp": {
        "mode": "references-source-foundation"
      }
    },
    {
      "name": "hacienda-social",
      "type": "legal-domain",
      "source": "./plugins/hacienda-social",
      "description": "Droit social français : Code du travail, conventions collectives, licenciement, CSE et contentieux prud'homal.",
      "skills": [
        "entretien-demarrage",
        "recherche-sociale",
        "analyser-licenciement",
        "analyser-rupture-conventionnelle",
        "analyser-convention-collective",
        "analyser-temps-travail",
        "analyser-cse",
        "rediger-politique-rh",
        "memo-risque-prudhomal",
        "classification-emploi",
        "analyse-remuneration-variable"
      ],
      "agents": [
        "veilleur-conventions-collectives",
        "suivi-contentieux-prudhomal",
        "suivi-procedure-licenciement",
        "veilleur-reformes-sociales"
      ],
      "mcp": {
        "mode": "references-source-foundation"
      }
    },
    {
      "name": "hacienda-propriete-intellectuelle",
      "type": "legal-domain-with-mcp",
      "source": "./plugins/hacienda-propriete-intellectuelle",
      "description": "Propriété intellectuelle : droit d'auteur, logiciel, marques, open source, clauses PI et contrefaçon.",
      "skills": [
        "entretien-demarrage",
        "clearance-marque",
        "revue-clause-pi",
        "revue-open-source",
        "portefeuille-pi",
        "tri-contrefacon",
        "mise-en-demeure-pi",
        "depot-preuve-creation",
        "revue-logiciel-donnees",
        "strategie-defense-pi"
      ],
      "agents": [
        "bopi-watcher",
        "contrefacon-web",
        "surveillant-oss",
        "veilleur-contrefacon",
        "veilleur-marques",
        "veilleur-renouvellements-pi"
      ],
      "mcp": {
        "mode": "own-stdio-server"
      }
    }
  ]
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run:

```bash
npm --workspace @hacienda/core test -- --run test/hacienda-marketplace.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add plugins/registry.json packages/core/test/hacienda-marketplace.test.ts
git commit -m "test: derive marketplace plugins from registry"
```

---

### Task 2: Create Factory Workspace Skeleton

**Files:**
- Modify: `package.json`
- Create: `tools/hacienda-plugin-factory/package.json`
- Create: `tools/hacienda-plugin-factory/tsconfig.json`
- Create: `tools/hacienda-plugin-factory/src/types.ts`
- Create: `tools/hacienda-plugin-factory/src/paths.ts`
- Create: `tools/hacienda-plugin-factory/src/registry.ts`

- [ ] **Step 1: Write the failing typecheck command expectation**

Edit root `package.json` workspaces to include the tools package:

```json
"workspaces": [
  "packages/*",
  "plugins/*/mcp-server",
  "tools/hacienda-plugin-factory"
]
```

Add scripts:

```json
"plugin:validate": "npm --workspace @hacienda/plugin-factory run validate",
"plugin:docs": "npm --workspace @hacienda/plugin-factory run docs",
"plugin:create": "npm --workspace @hacienda/plugin-factory run create",
"plugin:add-skill": "npm --workspace @hacienda/plugin-factory run add-skill",
"plugin:add-agent": "npm --workspace @hacienda/plugin-factory run add-agent",
"plugin:harmonize": "npm --workspace @hacienda/plugin-factory run harmonize",
"plugin:compare-claude-legal": "npm --workspace @hacienda/plugin-factory run compare-claude-legal"
```

- [ ] **Step 2: Run typecheck and verify it fails**

Run:

```bash
npm run typecheck
```

Expected: npm workspace error because `tools/hacienda-plugin-factory/package.json` does not exist.

- [ ] **Step 3: Create the package files**

Create `tools/hacienda-plugin-factory/package.json`:

```json
{
  "name": "@hacienda/plugin-factory",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "./dist/validate-plugin.js",
  "types": "./dist/types.d.ts",
  "scripts": {
    "build": "tsc -p .",
    "typecheck": "tsc -p . --noEmit",
    "validate": "node dist/validate-plugin.js",
    "docs": "node dist/generate-docs.js",
    "create": "node dist/create-plugin.js",
    "add-skill": "node dist/add-skill.js",
    "add-agent": "node dist/add-agent.js",
    "harmonize": "node dist/harmonize-plugin.js",
    "compare-claude-legal": "node dist/compare-with-reference.js"
  },
  "dependencies": {},
  "devDependencies": {
    "typescript": "^5.7.0",
    "@types/node": "^22.10.0"
  },
  "license": "AGPL-3.0-or-later"
}
```

Create `tools/hacienda-plugin-factory/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

- [ ] **Step 4: Create shared types**

Create `tools/hacienda-plugin-factory/src/types.ts`:

```ts
export type PluginType =
  | "source-foundation"
  | "legal-domain"
  | "legal-domain-with-mcp"
  | "transversal-research";

export type McpMode = "none" | "references-source-foundation" | "own-stdio-server";

export type PluginRegistryEntry = {
  name: string;
  type: PluginType;
  source: string;
  description: string;
  skills: string[];
  agents: string[];
  mcp: {
    mode: McpMode;
  };
};

export type PluginRegistry = {
  plugins: PluginRegistryEntry[];
};

export type ValidationSeverity = "error" | "warning";

export type ValidationFinding = {
  severity: ValidationSeverity;
  code: string;
  path: string;
  message: string;
};

export type ValidationResult = {
  ok: boolean;
  findings: ValidationFinding[];
};
```

- [ ] **Step 5: Create path helpers**

Create `tools/hacienda-plugin-factory/src/paths.ts`:

```ts
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFile);

export const repoRoot = resolve(currentDir, "../../..");
export const pluginsRoot = resolve(repoRoot, "plugins");
export const registryPath = resolve(pluginsRoot, "registry.json");
export const marketplacePath = resolve(repoRoot, ".claude-plugin/marketplace.json");
```

- [ ] **Step 6: Create registry loader**

Create `tools/hacienda-plugin-factory/src/registry.ts`:

```ts
import { readFileSync } from "node:fs";
import { registryPath } from "./paths.js";
import type { PluginRegistry } from "./types.js";

export function loadRegistry(path = registryPath): PluginRegistry {
  const parsed = JSON.parse(readFileSync(path, "utf8")) as PluginRegistry;

  if (!Array.isArray(parsed.plugins)) {
    throw new Error("plugins/registry.json must contain a plugins array");
  }

  const seen = new Set<string>();
  for (const plugin of parsed.plugins) {
    if (!plugin.name || !plugin.name.startsWith("hacienda-")) {
      throw new Error(`Invalid plugin name in registry: ${plugin.name}`);
    }
    if (seen.has(plugin.name)) {
      throw new Error(`Duplicate plugin in registry: ${plugin.name}`);
    }
    seen.add(plugin.name);
  }

  return parsed;
}
```

- [ ] **Step 7: Run typecheck and build**

Run:

```bash
npm run typecheck
npm run build
```

Expected: both PASS.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json tools/hacienda-plugin-factory
git commit -m "feat: add Hacienda plugin factory workspace"
```

---

### Task 3: Build Central Plugin Validator

**Files:**
- Create: `tools/hacienda-plugin-factory/src/validate-plugin.ts`
- Create: `packages/core/test/hacienda-plugin-contract.test.ts`

- [ ] **Step 1: Write failing contract test**

Create `packages/core/test/hacienda-plugin-contract.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../../..");

describe("hacienda plugin contract", () => {
  it("validates all active plugins against the Hacienda contract", () => {
    const output = execFileSync("npm", ["run", "plugin:validate"], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"]
    });

    expect(output).toContain("Hacienda plugin contract OK");
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
npm --workspace @hacienda/core test -- --run test/hacienda-plugin-contract.test.ts
```

Expected: FAIL because `dist/validate-plugin.js` does not exist or validator is not implemented.

- [ ] **Step 3: Implement validator**

Create `tools/hacienda-plugin-factory/src/validate-plugin.ts`:

```ts
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { loadRegistry } from "./registry.js";
import { marketplacePath, pluginsRoot, repoRoot } from "./paths.js";
import type { PluginRegistryEntry, ValidationFinding, ValidationResult } from "./types.js";

function readJson(path: string): unknown {
  return JSON.parse(readFileSync(path, "utf8")) as unknown;
}

function readText(path: string): string {
  return readFileSync(path, "utf8");
}

function add(findings: ValidationFinding[], code: string, path: string, message: string): void {
  findings.push({ severity: "error", code, path, message });
}

function requireFile(findings: ValidationFinding[], path: string, code: string): void {
  if (!existsSync(path)) {
    add(findings, code, path, "Required file is missing");
  }
}

function validateManifest(findings: ValidationFinding[], plugin: PluginRegistryEntry): void {
  const manifestPath = resolve(repoRoot, plugin.source, ".claude-plugin/plugin.json");
  requireFile(findings, manifestPath, "manifest.missing");
  if (!existsSync(manifestPath)) return;

  const manifest = readJson(manifestPath) as {
    name?: string;
    author?: { name?: string; url?: string };
    repository?: string;
    license?: string;
  };

  if (manifest.name !== plugin.name) add(findings, "manifest.name", manifestPath, "Manifest name must match registry name");
  if (manifest.author?.name !== "Hacienda") add(findings, "manifest.author", manifestPath, "Manifest author must be Hacienda");
  if (manifest.author?.url !== "https://hacienda.diy") add(findings, "manifest.author_url", manifestPath, "Manifest author URL must be Hacienda");
  if (manifest.repository !== "https://github.com/jamon8888/hacienda-juridique") add(findings, "manifest.repository", manifestPath, "Manifest repository must point to jamon8888/hacienda-juridique");
  if (manifest.license !== "AGPL-3.0-or-later") add(findings, "manifest.license", manifestPath, "Manifest license must be AGPL-3.0-or-later");
}

function validateMcp(findings: ValidationFinding[], plugin: PluginRegistryEntry): void {
  const mcpPath = resolve(repoRoot, plugin.source, ".mcp.json");
  requireFile(findings, mcpPath, "mcp.missing");
  if (!existsSync(mcpPath)) return;

  const mcp = readJson(mcpPath) as {
    mcpServers?: Record<string, { type?: string; command?: string; args?: string[] }>;
  };

  const servers = Object.values(mcp.mcpServers ?? {});
  if (plugin.mcp.mode === "own-stdio-server") {
    const hasExecutableServer = servers.some((server) => server.type === "stdio" && server.command && Array.isArray(server.args));
    if (!hasExecutableServer) {
      add(findings, "mcp.own_stdio", mcpPath, "own-stdio-server plugins must declare a stdio server with command and args");
    }
  }

  if (plugin.mcp.mode === "none" && servers.length > 0) {
    add(findings, "mcp.none", mcpPath, "mcp mode none must not declare mcpServers");
  }
}

function validateSkill(findings: ValidationFinding[], plugin: PluginRegistryEntry, skill: string): void {
  const skillPath = resolve(repoRoot, plugin.source, "skills", skill, "SKILL.md");
  requireFile(findings, skillPath, "skill.missing");
  if (!existsSync(skillPath)) return;

  const content = readText(skillPath);
  if (!content.match(/^---\r?\n/)) add(findings, "skill.frontmatter", skillPath, "Skill must start with YAML frontmatter");
  if (!content.match(/name:\s*.+/iu)) add(findings, "skill.name", skillPath, "Skill frontmatter must include name");
  if (!content.match(/description:\s*.+/iu)) add(findings, "skill.description", skillPath, "Skill frontmatter must include description");
  if (!content.match(/validation humaine/iu)) add(findings, "skill.human_review", skillPath, "Skill must mention validation humaine");
  if (!content.match(/\[(?:a verifier|à vérifier)\]/iu)) add(findings, "skill.verify_tag", skillPath, "Skill must include [à vérifier] guardrail");
}

function validateAgent(findings: ValidationFinding[], plugin: PluginRegistryEntry, agent: string): void {
  const agentPath = resolve(repoRoot, plugin.source, "agents", `${agent}.md`);
  requireFile(findings, agentPath, "agent.missing");
  if (!existsSync(agentPath)) return;

  const content = readText(agentPath);
  if (!content.match(/validation humaine|review|relecture/iu)) add(findings, "agent.review", agentPath, "Agent must mention human review or relecture");
  if (!content.match(/ne (?:pas|jamais)|pas d'envoi|pas de depot|pas de dépôt/iu)) add(findings, "agent.limits", agentPath, "Agent must state operational limits");
}

function validatePlugin(findings: ValidationFinding[], plugin: PluginRegistryEntry): void {
  const pluginDir = resolve(repoRoot, plugin.source);
  requireFile(findings, pluginDir, "plugin.missing");
  requireFile(findings, resolve(pluginDir, "CLAUDE.md"), "claude.missing");
  requireFile(findings, resolve(pluginDir, "README.md"), "readme.missing");
  requireFile(findings, resolve(pluginDir, "hooks/hooks.json"), "hooks.missing");
  requireFile(findings, resolve(pluginDir, "skills/entretien-demarrage/SKILL.md"), "cold_start.missing");

  validateManifest(findings, plugin);
  validateMcp(findings, plugin);

  for (const skill of plugin.skills) validateSkill(findings, plugin, skill);
  for (const agent of plugin.agents) validateAgent(findings, plugin, agent);
}

export function validateAllPlugins(): ValidationResult {
  const findings: ValidationFinding[] = [];
  const registry = loadRegistry();
  const marketplace = readJson(marketplacePath) as { plugins?: Array<{ name: string; source: string }> };
  const marketplaceNames = (marketplace.plugins ?? []).map((plugin) => plugin.name);
  const registryNames = registry.plugins.map((plugin) => plugin.name);

  if (JSON.stringify(marketplaceNames) !== JSON.stringify(registryNames)) {
    add(findings, "marketplace.registry_mismatch", marketplacePath, "Marketplace plugin order and names must match plugins/registry.json");
  }

  const diskPlugins = readdirSync(pluginsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  for (const diskPlugin of diskPlugins) {
    if (!registryNames.includes(diskPlugin)) {
      add(findings, "registry.extra_plugin", resolve(pluginsRoot, diskPlugin), "Plugin directory is not declared in registry");
    }
  }

  for (const plugin of registry.plugins) validatePlugin(findings, plugin);

  return { ok: findings.length === 0, findings };
}

function main(): number {
  const result = validateAllPlugins();
  if (!result.ok) {
    for (const finding of result.findings) {
      console.error(`${finding.severity.toUpperCase()} ${finding.code} ${finding.path}: ${finding.message}`);
    }
    return 1;
  }

  console.log("Hacienda plugin contract OK");
  return 0;
}

if (process.argv[1]?.endsWith("validate-plugin.js")) {
  process.exitCode = main();
}
```

- [ ] **Step 4: Build and run validator**

Run:

```bash
npm --workspace @hacienda/plugin-factory run build
npm run plugin:validate
```

Expected: initial failures may identify real plugin gaps. Fix only structural mismatches that are part of this task, then rerun until PASS.

- [ ] **Step 5: Run contract test**

Run:

```bash
npm --workspace @hacienda/core test -- --run test/hacienda-plugin-contract.test.ts
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add tools/hacienda-plugin-factory/src/validate-plugin.ts packages/core/test/hacienda-plugin-contract.test.ts
git commit -m "test: validate active plugins against Hacienda contract"
```

---

### Task 4: Generate Marketplace From Registry

**Files:**
- Create: `tools/hacienda-plugin-factory/src/generate-docs.ts`
- Modify: `.claude-plugin/marketplace.json`

- [ ] **Step 1: Write generator implementation**

Create `tools/hacienda-plugin-factory/src/generate-docs.ts`:

```ts
import { writeFileSync } from "node:fs";
import { loadRegistry } from "./registry.js";
import { marketplacePath } from "./paths.js";

export function buildMarketplaceJson(): string {
  const registry = loadRegistry();
  const marketplace = {
    $schema: "https://anthropic.com/claude-code/marketplace.schema.json",
    name: "hacienda-juridique",
    description: "marketplace de plugins juridiques francais Hacienda pour workflows avocats, juristes et equipes legal ops.",
    owner: {
      name: "Hacienda",
      url: "https://hacienda.diy"
    },
    plugins: registry.plugins.map((plugin) => ({
      name: plugin.name,
      source: plugin.source,
      description: plugin.description,
      author: {
        name: "Hacienda",
        url: "https://hacienda.diy"
      }
    }))
  };

  return `${JSON.stringify(marketplace, null, 2)}\n`;
}

function main(): void {
  writeFileSync(marketplacePath, buildMarketplaceJson(), "utf8");
  console.log(`Updated ${marketplacePath}`);
}

if (process.argv[1]?.endsWith("generate-docs.js")) {
  main();
}
```

- [ ] **Step 2: Build and run docs generator**

Run:

```bash
npm --workspace @hacienda/plugin-factory run build
npm run plugin:docs
```

Expected: `.claude-plugin/marketplace.json` is regenerated with the same four active plugins.

- [ ] **Step 3: Verify no unintended marketplace diff**

Run:

```bash
git diff -- .claude-plugin/marketplace.json
```

Expected: either no diff, or only formatting/order consistent with registry.

- [ ] **Step 4: Run validation**

Run:

```bash
npm run plugin:validate
npm --workspace @hacienda/core test -- --run test/hacienda-marketplace.test.ts
```

Expected: both PASS.

- [ ] **Step 5: Commit**

```bash
git add tools/hacienda-plugin-factory/src/generate-docs.ts .claude-plugin/marketplace.json
git commit -m "feat: generate marketplace from plugin registry"
```

---

### Task 5: Add Templates And Create Plugin Command

**Files:**
- Create: `tools/hacienda-plugin-factory/templates/plugin/CLAUDE.md`
- Create: `tools/hacienda-plugin-factory/templates/plugin/README.md`
- Create: `tools/hacienda-plugin-factory/templates/plugin/plugin.json`
- Create: `tools/hacienda-plugin-factory/templates/plugin/mcp.json`
- Create: `tools/hacienda-plugin-factory/templates/plugin/hooks.json`
- Create: `tools/hacienda-plugin-factory/src/create-plugin.ts`
- Create: `packages/core/test/hacienda-plugin-factory.test.ts`

- [ ] **Step 1: Write failing factory test**

Create `packages/core/test/hacienda-plugin-factory.test.ts`:

```ts
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

describe("hacienda plugin factory", () => {
  it("creates a legal-domain plugin skeleton in a target directory", () => {
    const temp = mkdtempSync(join(tmpdir(), "hacienda-plugin-factory-"));
    try {
      const output = execFileSync(
        "node",
        [
          "tools/hacienda-plugin-factory/dist/create-plugin.js",
          "--name",
          "hacienda-test-plugin",
          "--type",
          "legal-domain",
          "--description",
          "Plugin de test Hacienda.",
          "--root",
          temp
        ],
        { encoding: "utf8" }
      );

      expect(output).toContain("Created hacienda-test-plugin");
    } finally {
      rmSync(temp, { recursive: true, force: true });
    }
  });
});
```

- [ ] **Step 2: Run test and verify it fails**

Run:

```bash
npm --workspace @hacienda/core test -- --run test/hacienda-plugin-factory.test.ts
```

Expected: FAIL because `create-plugin.js` is missing.

- [ ] **Step 3: Implement create command**

Create `tools/hacienda-plugin-factory/src/create-plugin.ts` with focused argument parsing and file writes:

```ts
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

type Args = {
  name: string;
  type: string;
  description: string;
  root: string;
};

function parseArgs(argv: string[]): Args {
  const values = new Map<string, string>();
  for (let index = 0; index < argv.length; index += 2) {
    const key = argv[index];
    const value = argv[index + 1];
    if (!key?.startsWith("--") || value === undefined) {
      throw new Error(`Invalid argument pair near ${key ?? "<empty>"}`);
    }
    values.set(key.slice(2), value);
  }

  const name = values.get("name");
  const type = values.get("type");
  const description = values.get("description");
  const root = values.get("root") ?? process.cwd();

  if (!name?.startsWith("hacienda-")) throw new Error("--name must start with hacienda-");
  if (!type) throw new Error("--type is required");
  if (!description) throw new Error("--description is required");

  return { name, type, description, root };
}

function titleFromName(name: string): string {
  return name
    .replace(/^hacienda-/, "")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function write(path: string, content: string): void {
  writeFileSync(path, content, { encoding: "utf8", flag: "wx" });
}

export function createPlugin(args: Args): void {
  const pluginDir = resolve(args.root, "plugins", args.name);
  const title = titleFromName(args.name);

  mkdirSync(resolve(pluginDir, ".claude-plugin"), { recursive: true });
  mkdirSync(resolve(pluginDir, "hooks"), { recursive: true });
  mkdirSync(resolve(pluginDir, "skills", "entretien-demarrage"), { recursive: true });
  mkdirSync(resolve(pluginDir, "agents"), { recursive: true });

  write(resolve(pluginDir, ".claude-plugin", "plugin.json"), `${JSON.stringify({
    name: args.name,
    version: "0.1.0",
    description: args.description,
    author: { name: "Hacienda", url: "https://hacienda.diy" },
    repository: "https://github.com/jamon8888/hacienda-juridique",
    license: "AGPL-3.0-or-later",
    keywords: ["hacienda"]
  }, null, 2)}\n`);

  write(resolve(pluginDir, ".mcp.json"), `${JSON.stringify({
    mcpServers: {},
    recommendedCategories: ["droit-francais"]
  }, null, 2)}\n`);

  write(resolve(pluginDir, "hooks", "hooks.json"), "{\n}\n");
  write(resolve(pluginDir, "README.md"), `# Hacienda ${title}\n\n${args.description}\n\nToute sortie est une aide de travail soumise à validation humaine.\n`);
  write(resolve(pluginDir, "CLAUDE.md"), `# Hacienda ${title}\n\nLire \\`~/.claude/plugins/config/hacienda-juridique/company-profile.md\\`, puis \\`~/.claude/plugins/config/hacienda-juridique/${args.name}/CLAUDE.md\\` avant tout travail substantiel.\n\nToute source non consultée reste marquée \\`[à vérifier]\\`. Validation humaine obligatoire avant usage externe.\n`);
  write(resolve(pluginDir, "skills", "entretien-demarrage", "SKILL.md"), `---\nname: entretien-demarrage\ndescription: Configure le profil de pratique Hacienda pour ${title}.\n---\n\n# Entretien De Démarrage\n\nCollecter le contexte de pratique, les sources disponibles, les seuils d'escalade et les besoins de validation humaine.\n\nToute source non consultée reste marquée \\`[à vérifier]\\`.\n`);
}

function main(): void {
  const args = parseArgs(process.argv.slice(2));
  createPlugin(args);
  console.log(`Created ${args.name}`);
}

if (process.argv[1]?.endsWith("create-plugin.js")) {
  main();
}
```

- [ ] **Step 4: Build and run factory test**

Run:

```bash
npm --workspace @hacienda/plugin-factory run build
npm --workspace @hacienda/core test -- --run test/hacienda-plugin-factory.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add tools/hacienda-plugin-factory/src/create-plugin.ts packages/core/test/hacienda-plugin-factory.test.ts
git commit -m "feat: scaffold Hacienda plugins"
```

---

### Task 6: Add Skill And Agent Scaffolding

**Files:**
- Create: `tools/hacienda-plugin-factory/src/add-skill.ts`
- Create: `tools/hacienda-plugin-factory/src/add-agent.ts`
- Modify: `packages/core/test/hacienda-plugin-factory.test.ts`

- [ ] **Step 1: Extend factory test**

Add tests that call:

```ts
execFileSync("node", [
  "tools/hacienda-plugin-factory/dist/add-skill.js",
  "--plugin",
  "hacienda-test-plugin",
  "--skill",
  "analyse-test",
  "--root",
  temp
]);

execFileSync("node", [
  "tools/hacienda-plugin-factory/dist/add-agent.js",
  "--plugin",
  "hacienda-test-plugin",
  "--agent",
  "veilleur-test",
  "--root",
  temp
]);
```

Assert generated files contain `validation humaine` and `[à vérifier]`.

- [ ] **Step 2: Run and verify failure**

Run:

```bash
npm --workspace @hacienda/core test -- --run test/hacienda-plugin-factory.test.ts
```

Expected: FAIL because add commands are missing.

- [ ] **Step 3: Implement `add-skill.ts`**

Create a command that writes `plugins/<plugin>/skills/<skill>/SKILL.md` with:

```md
---
name: analyse-test
description: Workflow Hacienda pour analyse-test.
---

# Analyse Test

## Objectif

Produire une aide de travail structurée, jamais un conseil juridique final.

## Sources

Toute source non consultée reste marquée `[à vérifier]`.

## Validation Humaine

Validation humaine obligatoire avant usage externe, dépôt, envoi ou décision.
```

- [ ] **Step 4: Implement `add-agent.ts`**

Create a command that writes `plugins/<plugin>/agents/<agent>.md` with:

```md
# veilleur-test

## Mission

Surveiller les signaux configurés et préparer une synthèse pour validation humaine.

## Limites

Pas d'envoi, pas de dépôt, pas de paiement, pas de conseil juridique final.

## Routage

Router tout travail substantiel vers les skills du plugin et marquer les sources non consultées `[à vérifier]`.
```

- [ ] **Step 5: Build and test**

Run:

```bash
npm --workspace @hacienda/plugin-factory run build
npm --workspace @hacienda/core test -- --run test/hacienda-plugin-factory.test.ts
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add tools/hacienda-plugin-factory/src/add-skill.ts tools/hacienda-plugin-factory/src/add-agent.ts packages/core/test/hacienda-plugin-factory.test.ts
git commit -m "feat: scaffold Hacienda skills and agents"
```

---

### Task 7: Harmonize Existing Plugin Profiles

**Files:**
- Modify: `plugins/hacienda-sources-officielles/CLAUDE.md`
- Modify: `plugins/hacienda-social/CLAUDE.md`
- Modify: `plugins/hacienda-recherche-documentaire/CLAUDE.md`
- Modify: `packages/core/test/hacienda-plugin-contract.test.ts`

- [ ] **Step 1: Add profile convention assertion**

Extend the validator to require `company-profile.md` in active plugin `CLAUDE.md` files and reject `profil-cabinet.md` for new contract compliance.

Expected implementation in `validate-plugin.ts`:

```ts
const claudePath = resolve(pluginDir, "CLAUDE.md");
if (existsSync(claudePath)) {
  const claude = readText(claudePath);
  if (!claude.includes("company-profile.md")) {
    add(findings, "claude.company_profile", claudePath, "CLAUDE.md must use company-profile.md as shared profile convention");
  }
  if (claude.includes("profil-cabinet.md")) {
    add(findings, "claude.legacy_profile", claudePath, "CLAUDE.md must not use legacy profil-cabinet.md convention");
  }
}
```

- [ ] **Step 2: Run validator and verify failure**

Run:

```bash
npm --workspace @hacienda/plugin-factory run build
npm run plugin:validate
```

Expected: FAIL on non-PI `CLAUDE.md` files using `profil-cabinet.md`.

- [ ] **Step 3: Update non-PI CLAUDE files**

For `hacienda-sources-officielles`, `hacienda-social`, and `hacienda-recherche-documentaire`, replace:

```text
~/.claude/plugins/config/hacienda-juridique/profil-cabinet.md
```

with:

```text
~/.claude/plugins/config/hacienda-juridique/company-profile.md
```

Keep each plugin's own profile path unchanged.

- [ ] **Step 4: Run validation and focused tests**

Run:

```bash
npm run plugin:validate
npm --workspace @hacienda/core test -- --run test/hacienda-plugin-contract.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add tools/hacienda-plugin-factory/src/validate-plugin.ts plugins/hacienda-sources-officielles/CLAUDE.md plugins/hacienda-social/CLAUDE.md plugins/hacienda-recherche-documentaire/CLAUDE.md
git commit -m "refactor: standardize Hacienda plugin profile paths"
```

---

### Task 8: Clarify MCP Modes

**Files:**
- Modify: `plugins/registry.json`
- Modify: `tools/hacienda-plugin-factory/src/validate-plugin.ts`
- Modify: `plugins/hacienda-sources-officielles/.mcp.json`
- Modify: `plugins/hacienda-social/.mcp.json`
- Modify: `plugins/hacienda-recherche-documentaire/.mcp.json`

- [ ] **Step 1: Make symbolic MCP references explicit**

For plugins with `references-source-foundation`, require `.mcp.json` to include:

```json
{
  "mcpServers": {},
  "references": [
    "hacienda-sources-officielles"
  ],
  "recommendedCategories": [
    "recherche-juridique",
    "sources-officielles",
    "droit-francais"
  ]
}
```

- [ ] **Step 2: Update validator**

In `validateMcp`, for `references-source-foundation`, reject any `stdio` server without `command` and require `references` to include `hacienda-sources-officielles`.

- [ ] **Step 3: Run validator and verify failure**

Run:

```bash
npm --workspace @hacienda/plugin-factory run build
npm run plugin:validate
```

Expected: FAIL until symbolic `.mcp.json` files are updated.

- [ ] **Step 4: Update symbolic `.mcp.json` files**

Apply the explicit shape to:

- `plugins/hacienda-sources-officielles/.mcp.json`
- `plugins/hacienda-social/.mcp.json`
- `plugins/hacienda-recherche-documentaire/.mcp.json`

For `hacienda-sources-officielles`, if it remains the source foundation and does not expose its own command from the plugin, set registry mode to `references-source-foundation` and keep the symbolic reference explicit.

- [ ] **Step 5: Run validation**

Run:

```bash
npm run plugin:validate
npm test
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add plugins/registry.json tools/hacienda-plugin-factory/src/validate-plugin.ts plugins/hacienda-sources-officielles/.mcp.json plugins/hacienda-social/.mcp.json plugins/hacienda-recherche-documentaire/.mcp.json
git commit -m "refactor: clarify Hacienda MCP contract modes"
```

---

### Task 9: Add Claude Legal Structural Comparison

**Files:**
- Create: `tools/hacienda-plugin-factory/src/compare-with-reference.ts`

- [ ] **Step 1: Implement comparison command**

Create a command that reads default path:

```text
C:\Users\NMarchitecte\AppData\Local\Temp\claude-for-legal-verify
```

and accepts `--reference <path>`.

It should report:

```text
Reference plugins: N
Reference has marketplace: yes/no
Reference structural files observed:
- .claude-plugin/plugin.json
- .mcp.json
- CLAUDE.md
- README.md
- hooks/hooks.json
- skills/*/SKILL.md
- agents/*.md
Hacienda active plugins: N
Hacienda structural parity: OK
```

- [ ] **Step 2: Keep comparison non-blocking**

If the reference path is missing, print:

```text
Claude Legal reference not found; skipping structural comparison.
```

and exit 0.

- [ ] **Step 3: Build and run**

Run:

```bash
npm --workspace @hacienda/plugin-factory run build
npm run plugin:compare-claude-legal
```

Expected: PASS, with a human-readable report.

- [ ] **Step 4: Commit**

```bash
git add tools/hacienda-plugin-factory/src/compare-with-reference.ts
git commit -m "feat: compare Hacienda plugin structure with legal reference"
```

---

### Task 10: Full Verification And Integration

**Files:**
- Modify as needed from previous tasks only.

- [ ] **Step 1: Run generated docs**

Run:

```bash
npm run plugin:docs
```

Expected: marketplace remains derived from `plugins/registry.json`.

- [ ] **Step 2: Run plugin validation**

Run:

```bash
npm run plugin:validate
```

Expected: `Hacienda plugin contract OK`.

- [ ] **Step 3: Run required repo checks**

Run:

```bash
npm test
npm run typecheck
npm run build
npm run branding:check
npm audit --audit-level=moderate
git diff --check
```

Expected: all pass. `npm audit` may print the existing local `NODE_TLS_REJECT_UNAUTHORIZED=0` warning; that warning is environment-level and not a repo failure if audit exits 0.

- [ ] **Step 4: Run GitNexus status**

Run:

```bash
npx gitnexus status
```

Expected: index status is readable. If stale, run:

```bash
npx gitnexus analyze
```

- [ ] **Step 5: Review changed scope**

Run:

```bash
git status --short
git diff --stat
```

Expected: changes are limited to plugin factory, registry, structural tests, generated marketplace/docs, and intentional plugin harmonization.

- [ ] **Step 6: Commit final integration**

```bash
git add .
git commit -m "feat: add Hacienda plugin factory"
```

---

## Self-Review

Spec coverage:

- Creation of new plugins: Tasks 2, 5, and 6.
- Harmonization of existing plugins: Tasks 3, 7, and 8.
- Registry source of truth: Task 1.
- Marketplace generation: Task 4.
- Claude Legal structural parity: Task 9.
- Guardrails and validation: Tasks 3, 7, 8, and 10.
- Tests and verification: Tasks 1, 3, 5, 6, and 10.

No incomplete task markers remain. The plan intentionally keeps the first generator small and then strengthens validation, because a strict generator without a shared validator would recreate the current drift.
