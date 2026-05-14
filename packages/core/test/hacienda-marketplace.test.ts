import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");

const expectedPlugins = [
  "hacienda-sources-officielles",
  "hacienda-recherche-documentaire",
  "hacienda-fiscal",
  "hacienda-social",
  "hacienda-contrats",
  "hacienda-societes",
  "hacienda-contentieux",
  "hacienda-donnees-personnelles",
  "hacienda-produit-consommation",
  "hacienda-reglementaire",
  "hacienda-gouvernance-ia",
  "hacienda-propriete-intellectuelle",
  "hacienda-droit-public",
  "hacienda-permanences-juridiques",
  "hacienda-hub-confiance"
];

function readJson(path: string) {
  return JSON.parse(readFileSync(path, "utf8")) as {
    name?: string;
    plugins?: { name: string; source: string }[];
  };
}

describe("hacienda marketplace", () => {
  it("déclare tous les plugins attendus", () => {
    const marketplace = readJson(resolve(root, ".claude-plugin/marketplace.json"));
    const names = marketplace.plugins?.map((plugin) => plugin.name) ?? [];

    expect(names).toEqual(expectedPlugins);
  });

  it("chaque plugin a les fichiers structurants", () => {
    for (const plugin of expectedPlugins) {
      const dir = resolve(root, "plugins", plugin);
      expect(existsSync(resolve(dir, ".claude-plugin/plugin.json")), `${plugin} plugin.json`).toBe(true);
      expect(existsSync(resolve(dir, ".mcp.json")), `${plugin} .mcp.json`).toBe(true);
      expect(existsSync(resolve(dir, "CLAUDE.md")), `${plugin} CLAUDE.md`).toBe(true);
      expect(existsSync(resolve(dir, "README.md")), `${plugin} README.md`).toBe(true);
      expect(existsSync(resolve(dir, "skills/entretien-demarrage/SKILL.md")), `${plugin} entretien-demarrage`).toBe(true);
      expect(existsSync(resolve(dir, "hooks/hooks.json")), `${plugin} hooks`).toBe(true);
    }
  });
});
