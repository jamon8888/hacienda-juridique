import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { afterEach, describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const pluginRoot = resolve(root, "plugins/hacienda-propriete-intellectuelle");

type PiPluginManifest = { version: string };
type VersionFile = { version: string };
type ServerPackage = { version: string };
type McpServerConfig = {
  type?: string;
  command?: string;
  args?: string[];
  title?: string;
  description?: string;
};
type McpManifest = {
  mcpServers?: Record<string, McpServerConfig>;
};

const expectedPiTools = [
  "piste_status",
  "legifrance_recherche",
  "legifrance_rechercher",
  "legifrance_get_article",
  "legifrance_get_code",
  "legifrance_get_loda",
  "legifrance_get_jurisprudence",
  "legifrance_get_jorf",
  "legifrance_get_circulaire",
  "legifrance_suggest",
  "judilibre_status",
  "judilibre_recherche",
  "judilibre_get_decision",
  "eurlex_status",
  "eurlex_recherche",
  "eurlex_consulter",
  "eurlex_metadata",
  "eurlex_consolidated",
  "eurlex_citations",
  "eurlex_eurovoc",
  "eurlex_versions",
  "eurlex_formats",
  "inpi_search_marques",
  "inpi_marque_details",
  "inpi_marques_publications_recentes",
  "euipo_tmview_search",
  "bopi_dernieres_publications",
  "inpi_search_brevets",
  "inpi_brevet_details",
  "espacenet_search",
  "espacenet_brevet_details"
] as const;

const unexpectedPiTools = [
  "legifrance_api_call",
  "piste_cache_clear",
  "bofip_rechercher",
  "bofip_consulter",
  "boss_status",
  "boss_recherche",
  "boss_get_document"
] as const;

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

function collectTextFiles(dir: string): string[] {
  const files: string[] = [];

  for (const entry of readdirSync(dir)) {
    const absolutePath = resolve(dir, entry);
    const stats = statSync(absolutePath);

    if (stats.isDirectory()) {
      files.push(...collectTextFiles(absolutePath));
      continue;
    }

    if ([".md", ".json", ".yaml"].includes(extname(absolutePath))) {
      files.push(absolutePath);
    }
  }

  return files;
}

describe("hacienda PI cowork packaging", () => {
  let client: Client | undefined;

  afterEach(async () => {
    await client?.close();
    client = undefined;
  });

  it("adds a version file and aligns visible plugin versions", () => {
    const versionPath = resolve(pluginRoot, "version.json");
    expect(existsSync(versionPath)).toBe(true);

    const pluginManifest = readJson<PiPluginManifest>(
      resolve(pluginRoot, ".claude-plugin/plugin.json")
    );
    const versionFile = readJson<VersionFile>(versionPath);
    const serverPackage = readJson<ServerPackage>(
      resolve(pluginRoot, "mcp-server/package.json")
    );
    const runtimeVersionSource = readFileSync(
      resolve(pluginRoot, "mcp-server/src/version.ts"),
      "utf8"
    );

    expect(pluginManifest.version).toBe(versionFile.version);
    expect(serverPackage.version).toBe(versionFile.version);
    expect(runtimeVersionSource).toContain(`import pluginVersion from "../../version.json"`);
    expect(runtimeVersionSource).toContain(
      "export const PI_PLUGIN_VERSION = pluginVersion.version;"
    );
  });

  it("declares the PI server as an executable stdio MCP in .mcp.json", () => {
    const manifest = readJson<McpManifest>(resolve(pluginRoot, ".mcp.json"));
    const piServer = manifest.mcpServers?.["Hacienda Propriété Intellectuelle"];

    expect(piServer).toBeDefined();
    expect(piServer?.type).toBe("stdio");
    expect(piServer?.command).toBe("node");
    expect(piServer?.args).toEqual([
      "./plugins/hacienda-propriete-intellectuelle/mcp-server/dist/index.js"
    ]);
    expect(piServer?.title).toBe("Hacienda Propriété Intellectuelle");
    expect(piServer?.description?.toLowerCase()).toContain("serveur mcp pi");
  });

  it("starts the PI server from the manifest and exposes only the scoped PI toolset", async () => {
    const manifest = readJson<McpManifest>(resolve(pluginRoot, ".mcp.json"));
    const piServer = manifest.mcpServers?.["Hacienda Propriété Intellectuelle"];
    expect(piServer?.command).toBeDefined();
    expect(piServer?.args).toBeDefined();

    client = new Client({
      name: "hacienda-pi-cowork-test",
      version: "0.1.0"
    });

    const transport = new StdioClientTransport({
      command: piServer!.command!,
      args: piServer!.args!,
      cwd: root,
      stderr: "pipe"
    });

    await client.connect(transport);
    const tools = await client.listTools();
    const toolNames = tools.tools.map((tool) => tool.name).sort();

    expect(toolNames).toEqual([...expectedPiTools].sort());

    for (const tool of unexpectedPiTools) {
      expect(toolNames).not.toContain(tool);
    }
  });

  it("removes Anthropic / claude-for-legal branding from shipped PI files", () => {
    const shippedFiles = collectTextFiles(pluginRoot);
    const forbiddenPatterns = [/claude-for-legal/iu, /Anthropic ip-legal/iu];

    for (const file of shippedFiles) {
      const content = readFileSync(file, "utf8");

      for (const pattern of forbiddenPatterns) {
        expect(content, file).not.toMatch(pattern);
      }
    }
  });
});
