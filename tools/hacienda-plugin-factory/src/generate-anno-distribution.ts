import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  assertSafeOutputDir,
  buildAnnoCoordinatorMarkdown,
  buildAnnoMatterVaultMarkdown,
  buildAnnoOverlayMarkdown,
  buildAnnoTabularMarkdown,
  buildAnnoWorkflowBlueprintsMarkdown,
  buildClaudeDesktopConfig,
  buildClientReadme,
  buildEngineCompat,
  buildPluginAnnoWorkflowMarkdown,
  defaultAnnoBinary,
  defaultAnnoDistributionDir,
  resolvePluginDestination,
  resolvePluginSource
} from "./anno-distribution.js";
import { loadRegistry } from "./registry.js";
import type { AnnoDistributionOptions } from "./types.js";

function readArg(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

function hasFlag(name: string): boolean {
  return process.argv.includes(name);
}

function buildOptions(): AnnoDistributionOptions {
  return {
    outputDir: assertSafeOutputDir(readArg("--out") ?? defaultAnnoDistributionDir),
    annoBinary: readArg("--anno-binary") ?? defaultAnnoBinary,
    blockDownloads: !hasFlag("--allow-downloads")
  };
}

function writeJson(path: string, value: unknown): void {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export const pluginDistributionDirectories = [
  ".claude-plugin",
  "agents",
  "hooks",
  "references",
  "skills"
] as const;

export const pluginDistributionFiles = [
  ".mcp.json",
  "CHANGELOG.md",
  "CLAUDE.md",
  "README.md",
  "version.json"
] as const;

export const pluginMcpServerDistributionFiles = ["dist", "package.json"] as const;

function copyIfExists(source: string, destination: string): void {
  if (!existsSync(source)) {
    return;
  }

  cpSync(source, destination, { recursive: true });
}

function copyActivePlugins(outputDir: string): void {
  const registry = loadRegistry();
  const outputPluginsDir = resolve(outputDir, "plugins");
  mkdirSync(outputPluginsDir, { recursive: true });
  writeJson(resolve(outputPluginsDir, "registry.json"), registry);

  for (const plugin of registry.plugins) {
    const source = resolvePluginSource(plugin);
    const destination = resolvePluginDestination(outputDir, plugin);

    mkdirSync(destination, { recursive: true });
    for (const directory of pluginDistributionDirectories) {
      copyIfExists(resolve(source, directory), resolve(destination, directory));
    }

    for (const file of pluginDistributionFiles) {
      copyIfExists(resolve(source, file), resolve(destination, file));
    }

    const mcpSource = resolve(source, "mcp-server");
    const mcpDestination = resolve(destination, "mcp-server");
    for (const file of pluginMcpServerDistributionFiles) {
      copyIfExists(resolve(mcpSource, file), resolve(mcpDestination, file));
    }
  }
}

function writePluginAnnoWorkflows(outputDir: string): void {
  const registry = loadRegistry();

  for (const plugin of registry.plugins) {
    const destination = resolvePluginDestination(outputDir, plugin);
    writeFileSync(
      resolve(destination, "ANNO-WORKFLOWS.md"),
      buildPluginAnnoWorkflowMarkdown(plugin.name),
      "utf8"
    );
  }
}

export function generateAnnoDistribution(options: AnnoDistributionOptions): void {
  const outputDir = assertSafeOutputDir(options.outputDir);

  rmSync(outputDir, { recursive: true, force: true });
  mkdirSync(outputDir, { recursive: true });

  copyActivePlugins(outputDir);
  writePluginAnnoWorkflows(outputDir);
  writeJson(
    resolve(outputDir, "claude_desktop_config.windows.json"),
    buildClaudeDesktopConfig(options)
  );
  writeJson(resolve(outputDir, "hacienda-anno.mcp.json"), buildClaudeDesktopConfig(options));
  writeJson(resolve(outputDir, "engine-compat.json"), buildEngineCompat());
  writeFileSync(resolve(outputDir, "ANNO-OVERLAY.md"), buildAnnoOverlayMarkdown(), "utf8");
  writeFileSync(
    resolve(outputDir, "ANNO-COORDINATOR.md"),
    buildAnnoCoordinatorMarkdown(),
    "utf8"
  );
  writeFileSync(resolve(outputDir, "ANNO-TABULAR.md"), buildAnnoTabularMarkdown(), "utf8");
  writeFileSync(
    resolve(outputDir, "ANNO-MATTER-VAULT.md"),
    buildAnnoMatterVaultMarkdown(),
    "utf8"
  );
  writeFileSync(
    resolve(outputDir, "ANNO-WORKFLOW-BLUEPRINTS.md"),
    buildAnnoWorkflowBlueprintsMarkdown(),
    "utf8"
  );
  writeFileSync(resolve(outputDir, "README.md"), buildClientReadme(options), "utf8");
}

function main(): void {
  const options = buildOptions();
  generateAnnoDistribution(options);
  console.log(`Generated Hacienda + Anno Desktop distribution at ${options.outputDir}`);
}

if (process.argv[1]?.endsWith("generate-anno-distribution.js")) {
  main();
}
