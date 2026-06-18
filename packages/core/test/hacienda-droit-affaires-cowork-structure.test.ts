import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { afterEach, describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const pluginRoot = resolve(root, "plugins/hacienda-droit-affaires");
const droitAffairesCommandNamespace = "h-da";

type PluginManifest = { version: string };
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

const expectedDroitAffairesTools = [
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
  "bofip_rechercher",
  "bofip_consulter",
  "boss_status",
  "boss_recherche",
  "boss_get_document",
  "bodacc_by_siren",
  "bodacc_procedures",
  "company_full_profile"
] as const;

const unexpectedDroitAffairesTools = [
  "inpi_search_marques",
  "inpi_marque_details",
  "inpi_search_brevets",
  "espacenet_search",
  "piste_cache_clear",
  "legifrance_api_call"
] as const;

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

function collectSkillFiles(): string[] {
  const skillsDir = resolve(pluginRoot, "skills");

  return readdirSync(skillsDir)
    .filter((skillName) => existsSync(resolve(skillsDir, skillName, "SKILL.md")))
    .map((skillName) => resolve(skillsDir, skillName, "SKILL.md"))
    .sort();
}

function collectCommandFiles(): string[] {
  const commandsDir = resolve(pluginRoot, "commands", droitAffairesCommandNamespace);

  if (!existsSync(commandsDir)) {
    return [];
  }

  return readdirSync(commandsDir)
    .filter((fileName) => extname(fileName) === ".md")
    .map((fileName) => resolve(commandsDir, fileName))
    .sort();
}

function frontmatterValue(content: string, key: string): string | undefined {
  const stripped = content.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const frontmatter = stripped.match(/^---\n([\s\S]*?)\n---/)?.[1];
  return frontmatter?.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1];
}

function skillNameFromFile(file: string): string {
  return dirname(file).split(/[\\/]/).at(-1)!;
}

function collectTextFiles(dir: string): string[] {
  const files: string[] = [];

  for (const entry of readdirSync(dir)) {
    const absolutePath = resolve(dir, entry);
    const stats = statSync(absolutePath);

    if (stats.isDirectory()) {
      // Les fixtures de test (tests/datasets) enregistrent des sorties modèle
      // brutes (scoring blind) ; elles ne sont pas des fichiers livrés et ne
      // sont pas soumises au lint d'hygiène des renvois inter-plugins.
      if (entry === "tests") {
        continue;
      }
      files.push(...collectTextFiles(absolutePath));
      continue;
    }

    if ([".md", ".json", ".yaml", ".yml"].includes(extname(absolutePath))) {
      files.push(absolutePath);
    }
  }

  return files;
}

describe("hacienda droit affaires cowork packaging", () => {
  let client: Client | undefined;

  afterEach(async () => {
    await client?.close();
    client = undefined;
  });

  it("aligns visible plugin versions with a single version file", () => {
    const versionPath = resolve(pluginRoot, "version.json");
    expect(existsSync(versionPath)).toBe(true);

    const pluginManifest = readJson<PluginManifest>(
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
      "export const DROIT_AFFAIRES_PLUGIN_VERSION = pluginVersion.version;"
    );
  });

  it("ships distribution parity files and a bundled MCP server", () => {
    expect(existsSync(resolve(pluginRoot, ".gitignore"))).toBe(true);
    expect(existsSync(resolve(pluginRoot, ".mcpbignore"))).toBe(true);
    expect(existsSync(resolve(pluginRoot, "manifest.json"))).toBe(true);
    expect(existsSync(resolve(pluginRoot, "logs/README.md"))).toBe(true);
    expect(existsSync(resolve(pluginRoot, "logs/.gitkeep"))).toBe(true);
    expect(existsSync(resolve(pluginRoot, "mcp-server/dist/mcpb-index.cjs"))).toBe(true);

    const mcpbManifest = readJson<{ server?: { entry_point?: string } }>(
      resolve(pluginRoot, "manifest.json")
    );
    expect(mcpbManifest.server?.entry_point).toBe("mcp-server/dist/mcpb-index.cjs");
  });

  it("declares the Droit des affaires server as an executable stdio MCP", () => {
    const manifest = readJson<McpManifest>(resolve(pluginRoot, ".mcp.json"));
    const server = manifest.mcpServers?.["Hacienda Droit des Affaires"];

    expect(server).toBeDefined();
    expect(server?.type).toBe("stdio");
    expect(server?.command).toBe("node");
    expect(server?.args).toEqual([
      "${CLAUDE_PLUGIN_ROOT}/mcp-server/dist/mcpb-index.cjs"
    ]);
    expect(server?.title).toBe("Hacienda Droit des Affaires");
    expect(server?.description?.toLowerCase()).toContain("droit des affaires");
  });

  it("starts from the manifest and exposes only the scoped Droit des affaires toolset", async () => {
    const manifest = readJson<McpManifest>(resolve(pluginRoot, ".mcp.json"));
    const server = manifest.mcpServers?.["Hacienda Droit des Affaires"];
    expect(server?.command).toBeDefined();
    expect(server?.args).toBeDefined();

    client = new Client({
      name: "hacienda-droit-affaires-cowork-test",
      version: "0.1.0"
    });

    const transport = new StdioClientTransport({
      command: server!.command!,
      args: server!.args!.map((arg) => arg.replace("${CLAUDE_PLUGIN_ROOT}", pluginRoot)),
      cwd: root,
      stderr: "pipe"
    });

    await client.connect(transport);
    const tools = await client.listTools();
    const toolNames = tools.tools.map((tool) => tool.name).sort();

    expect(toolNames).toEqual([...expectedDroitAffairesTools].sort());

    for (const tool of unexpectedDroitAffairesTools) {
      expect(toolNames).not.toContain(tool);
    }
  }, 30000);

  it("declares explicit V2 metadata and command hints on every skill", () => {
    const skillFiles = collectSkillFiles();

    expect(skillFiles.length).toBe(27);

    for (const file of skillFiles) {
      const content = readFileSync(file, "utf8");

      expect(content, file).toMatch(/^version:\s*"2\.0\.0"/m);
      expect(content, file).toMatch(/^argument-hint:/m);
      expect(content, file).not.toMatch(/^version:\s*"?1\.0\.0"?/m);
      expect(content, file).not.toContain("\r\n");
    }
  });

  it("ships a thin h-da slash command wrapper for every skill", () => {
    const skillFiles = collectSkillFiles();
    const commandFiles = collectCommandFiles();

    expect(commandFiles.length).toBe(skillFiles.length);

    for (const skillFile of skillFiles) {
      const skillName = skillNameFromFile(skillFile);
      const commandFile = resolve(
        pluginRoot,
        "commands",
        droitAffairesCommandNamespace,
        `${skillName}.md`
      );

      expect(existsSync(commandFile), skillName).toBe(true);

      const skillContent = readFileSync(skillFile, "utf8");
      const commandContent = readFileSync(commandFile, "utf8");

      expect(frontmatterValue(commandContent, "description"), skillName).toBe(
        frontmatterValue(skillContent, "description")
      );
      expect(frontmatterValue(commandContent, "argument-hint"), skillName).toBe(
        frontmatterValue(skillContent, "argument-hint")
      );
      expect(commandContent, skillName).toContain(`Use the \`${skillName}\` skill`);
      expect(commandContent, skillName).toContain("$ARGUMENTS");
      expect(commandContent, skillName).not.toContain("/h-droit-affaires:");
    }
  });

  it("documents every skill as an invokable short factory-prefixed command", () => {
    const readme = readFileSync(resolve(pluginRoot, "README.md"), "utf8");
    const claudeTemplate = readFileSync(resolve(pluginRoot, "CLAUDE.md"), "utf8");

    for (const file of collectSkillFiles()) {
      const skillName = skillNameFromFile(file);

      expect(readme, skillName).toContain(`/${droitAffairesCommandNamespace}:${skillName}`);
    }

    expect(readme).not.toContain("/h-droit-affaires:");
    expect(readme).not.toContain("/hacienda-droit-affaires:");
    expect(claudeTemplate).not.toContain("/h-droit-affaires:");
    expect(claudeTemplate).not.toContain("/hacienda-droit-affaires:");
  });

  it("keeps Droit des affaires referrals aligned to the short PI command namespace", () => {
    const shippedFiles = collectTextFiles(pluginRoot);
    const combined = shippedFiles.map((file) => readFileSync(file, "utf8")).join("\n");

    expect(combined).not.toContain("/hacienda-propriete-intellectuelle:");
    expect(combined).not.toContain("/hacienda-droit-affaires:");
    expect(combined).not.toContain("companyFullProfile");
    expect(combined).not.toContain("bodaccProcedures");
    expect(combined).not.toContain("bodaccBySiren");
    expect(combined).not.toContain("judilibreSearch");
    expect(combined).toContain("/h-pi:contrats-pi");
  });

  it("documents optional Anno orchestration for high-value Droit des affaires workflows", () => {
    const annoAwareFiles = [
      "CLAUDE.md",
      "README.md",
      "skills/entretien-demarrage/SKILL.md",
      "skills/reviser-contrat/SKILL.md",
      "skills/reviser-nda/SKILL.md",
      "skills/revue-tabulaire/SKILL.md",
      "skills/due-diligence-dataroom/SKILL.md",
      "skills/spa-review/SKILL.md",
      "skills/gap-review/SKILL.md",
      "skills/declaration-creance/SKILL.md",
      "skills/gouvernance-ag/SKILL.md"
    ].map((relativePath) => resolve(pluginRoot, relativePath));
    const combined = annoAwareFiles
      .map((file) => readFileSync(file, "utf8"))
      .join("\n");

    expect(combined).toContain("Mode Anno Desktop Optionnel");
    expect(combined).toContain("anno_health");
    expect(combined).toContain("detect");
    expect(combined).toContain("legal_ingest");
    expect(combined).toContain("legal_search");
    expect(combined).toContain("legal_graph_query");
    expect(combined).toContain("legal_extract_contract");
    expect(combined).toContain("legal_risk_review");
    expect(combined).toContain("legal_mandatory_clause_audit");
    expect(combined).toContain("legal_timeline");
    expect(combined).toContain("legal_prescription_check");
    expect(combined).toContain("legal_validate_field");
    expect(combined).toContain("review_create");
    expect(combined).toContain("review_add_rows");
    expect(combined).toContain("review_extract");
    expect(combined).toContain("review_refine_cell");
    expect(combined).toContain("source interne");
    expect(combined).toContain("jamais comme source primaire");
  });

  it("declares exact MCP tool names inside every Droit des affaires skill", () => {
    for (const file of collectSkillFiles()) {
      const content = readFileSync(file, "utf8");

      expect(content, file).toContain("## Outils MCP à privilégier");
      expect(content, file).toContain("piste_status");
      expect(content, file).toContain("legifrance_recherche");
      expect(content, file).toContain("judilibre_recherche");
      expect(content, file).toContain("eurlex_recherche");
    }
  });

  it("keeps every Droit des affaires skill on the canonical Hacienda V2 skill skeleton", () => {
    const requiredHeadings = [
      "## Examples",
      "## Chargement du profil",
      "## Intake",
      "## Gate non-juriste",
      "## Outils MCP à privilégier",
      "## Emplacement des sorties",
      "## Sortie"
    ];
    const orderedHeadings = [
      "## Examples",
      "## Chargement du profil",
      "## Intake",
      "## Gate non-juriste",
      "## Mode Anno Desktop Optionnel",
      "## Outils MCP à privilégier",
      "## Emplacement des sorties",
      "## Sortie"
    ];

    for (const file of collectSkillFiles()) {
      const content = readFileSync(file, "utf8");

      for (const heading of requiredHeadings) {
        expect(content, `${file} is missing ${heading}`).toContain(heading);
      }

      const presentHeadings = orderedHeadings.filter((heading) => content.includes(heading));
      const headingIndexes = presentHeadings.map((heading) => content.indexOf(heading));

      for (let index = 1; index < headingIndexes.length; index += 1) {
        expect(
          headingIndexes[index],
          `${file}: ${presentHeadings[index]} should appear after ${presentHeadings[index - 1]}`
        ).toBeGreaterThan(headingIndexes[index - 1]);
      }
    }
  });
});
