import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");

function collectSkillFiles(pluginName: string): string[] {
  const skillsDir = resolve(root, "plugins", pluginName, "skills");

  return readdirSync(skillsDir)
    .filter((skillName) => existsSync(resolve(skillsDir, skillName, "SKILL.md")))
    .map((skillName) => resolve(skillsDir, skillName, "SKILL.md"))
    .sort();
}

describe("hacienda transversal plugins structure", () => {
  it("keeps Hacienda Sources Officielles skills on V2 metadata and explicit MCP tools", () => {
    const skillFiles = collectSkillFiles("hacienda-sources-officielles");

    expect(skillFiles.length).toBeGreaterThan(0);

    for (const file of skillFiles) {
      const content = readFileSync(file, "utf8");

      expect(content, file).toMatch(/^version:\s*"2\.0\.0"/m);
      expect(content, file).toMatch(/^argument-hint:/m);
      expect(content, file).toContain("## Outils MCP à privilégier");
      expect(content, file).toContain("piste_status");
      expect(content, file).toContain("legifrance_recherche");
      expect(content, file).toContain("judilibre_recherche");
      expect(content, file).toContain("eurlex_recherche");
      expect(content, file).toContain("[à vérifier]");
      expect(content, file).not.toContain("[a verifier]");
    }
  });

  it("keeps Hacienda Recherche Documentaire skills on V2 metadata and source-foundation routing", () => {
    const pluginName = "hacienda-recherche-documentaire";
    const readme = readFileSync(resolve(root, "plugins", pluginName, "README.md"), "utf8");
    const skillFiles = collectSkillFiles(pluginName);

    expect(skillFiles.length).toBe(11);

    for (const file of skillFiles) {
      const skillName = dirname(file).split(/[\\/]/).at(-1);
      const content = readFileSync(file, "utf8");

      expect(content, file).toMatch(/^version:\s*"2\.0\.0"/m);
      expect(content, file).toMatch(/^argument-hint:/m);
      expect(content, file).toContain("## Outils MCP à privilégier");
      expect(content, file).toContain("Hacienda Sources Officielles");
      expect(content, file).toContain("legifrance_recherche");
      expect(content, file).toContain("judilibre_recherche");
      expect(content, file).toContain("[à vérifier]");
      expect(content, file).not.toContain("[a verifier]");
      expect(readme, skillName).toContain(`/h-recherche-documentaire:${skillName}`);
    }

    expect(readme).not.toContain("/hacienda-recherche-documentaire:");
  });
});
