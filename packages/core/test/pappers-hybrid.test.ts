import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "../../..");
const pluginNames = [
  "hacienda-societes",
  "hacienda-contrats",
  "hacienda-contentieux",
  "hacienda-fiscal",
  "hacienda-hub-confiance",
];

function readJson(path: string): unknown {
  return JSON.parse(readFileSync(resolve(root, path), "utf8")) as unknown;
}

function readText(path: string): string {
  return readFileSync(resolve(root, path), "utf8");
}

describe("Pappers hybrid MCP integration", () => {
  it("declares Pappers as an optional streamable-http connector without committing a key", () => {
    for (const pluginName of pluginNames) {
      const manifest = readJson(`plugins/${pluginName}/.mcp.json`) as {
        mcpServers?: Record<string, { type?: string; url?: string; env?: Record<string, string>; optional?: boolean }>;
      };
      const pappers = manifest.mcpServers?.["Pappers"];

      expect(pappers, pluginName).toBeDefined();
      expect(pappers?.type, pluginName).toBe("streamable-http");
      expect(pappers?.optional, pluginName).toBe(true);
      expect(pappers?.url, pluginName).toBe("https://mcp.pappers.fr/${PAPPERS_API_KEY}");
      expect(JSON.stringify(pappers), pluginName).not.toMatch(/[a-f0-9]{40,}/iu);
    }
  });

  it("documents Pappers as non normative business data", () => {
    for (const pluginName of pluginNames) {
      const readme = readText(`plugins/${pluginName}/README.md`);
      expect(readme, pluginName).toContain("Pappers");
      expect(readme, pluginName).toContain("source officielle normative");
    }
  });

  it("adds focused Pappers business skills", () => {
    const skillPaths = [
      "plugins/hacienda-societes/skills/due-diligence-cocontractant/SKILL.md",
      "plugins/hacienda-contrats/skills/verification-pouvoir-signataire/SKILL.md",
      "plugins/hacienda-contentieux/skills/analyse-solvabilite-adversaire/SKILL.md",
      "plugins/hacienda-hub-confiance/skills/audit-pappers-mcp/SKILL.md",
    ];

    for (const skillPath of skillPaths) {
      const skill = readText(skillPath);
      expect(skill).toContain("Pappers");
      expect(skill).toContain("hacienda-sources-officielles");
      expect(skill).not.toMatch(/[a-f0-9]{40,}/iu);
    }
  });
});
