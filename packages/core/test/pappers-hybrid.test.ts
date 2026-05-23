import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "../../..");
function readJson(path: string): unknown {
  return JSON.parse(readFileSync(resolve(root, path), "utf8")) as unknown;
}

function readText(path: string): string {
  return readFileSync(resolve(root, path), "utf8");
}

describe("Pappers hybrid MCP integration", () => {
  it("does not ship active Pappers plugin connectors after business plugins removal", () => {
    const marketplace = readJson(".claude-plugin/marketplace.json") as {
      plugins?: Array<{ name: string; source: string }>;
    };
    const activePlugins = marketplace.plugins ?? [];

    for (const plugin of activePlugins) {
      const manifest = readJson(`${plugin.source.replace("./", "")}/.mcp.json`) as {
        mcpServers?: Record<string, unknown>;
      };
      expect(manifest.mcpServers?.["Pappers"], plugin.name).toBeUndefined();
    }
  });

  it("documents credited validation before full-power activation", () => {
    const runbook = readText("docs/integrations/pappers-mcp-validation.md");
    expect(runbook).toContain("credits_insufficient");
    expect(runbook).toContain("validated");
    expect(runbook).toContain("PAPPERS_API_KEY");
    expect(runbook).not.toMatch(/[a-f0-9]{40,}/iu);
  });

  it("documents the Pappers orchestration doctrine for skills and agents", () => {
    const doctrine = readText("docs/integrations/pappers-agents-skills.md");
    expect(doctrine).toContain("business intelligence");
    expect(doctrine).toContain("sources officielles");
    expect(doctrine).toContain("needs_official_recoupement");
    expect(doctrine).toContain("credits_insufficient");
    expect(doctrine).toContain("Pappers MCP");
    expect(doctrine).not.toMatch(/[a-f0-9]{40,}/iu);
  });

});
