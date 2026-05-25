import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const pluginRoot = resolve(root, "plugins/hacienda-sources-officielles");

function readPluginFile(path: string): string {
  return readFileSync(resolve(pluginRoot, path), "utf8");
}

describe("hacienda sources officielles plugin", () => {
  it("documents optional Anno context without making Anno a primary source", () => {
    const combined = [
      "CLAUDE.md",
      "README.md",
      "skills/entretien-demarrage/SKILL.md"
    ]
      .map(readPluginFile)
      .join("\n");

    expect(combined).toContain("Mode Anno Desktop Optionnel");
    expect(combined).toContain("anno_health");
    expect(combined).toContain("detect");
    expect(combined).toContain("legal_search");
    expect(combined).toContain("legal_graph_query");
    expect(combined).toContain("poursuivre en mode Hacienda");
    expect(combined).toContain("source interne Anno");
    expect(combined).toContain("jamais comme source primaire");
    expect(combined).toContain("ne valide jamais une citation juridique");
    expect(combined).toContain("hacienda-sources-officielles");
  });
});
