import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const pluginDir = resolve(root, "plugins/hacienda-recherche-documentaire");

function read(rel: string) {
  return readFileSync(resolve(pluginDir, rel), "utf8");
}

describe("hacienda-recherche-documentaire", () => {
  it("déclare le plugin et les skills principaux", () => {
    expect(existsSync(resolve(pluginDir, ".claude-plugin/plugin.json"))).toBe(true);
    expect(existsSync(resolve(pluginDir, "skills/preparation-requete/SKILL.md"))).toBe(true);
    expect(existsSync(resolve(pluginDir, "skills/extraction-references/SKILL.md"))).toBe(true);
    expect(existsSync(resolve(pluginDir, "skills/verification-sources-primaires/SKILL.md"))).toBe(true);
    expect(existsSync(resolve(pluginDir, "skills/dossier-documentaire/SKILL.md"))).toBe(true);
  });

  it("interdit les comportements incompatibles avec les bases éditeurs", () => {
    const combined = [
      read("CLAUDE.md"),
      read("skills/controle-copyright/SKILL.md"),
      read("skills/extraction-references/SKILL.md")
    ].join("\n");

    expect(combined).toContain("pas de contournement de paywall");
    expect(combined).toContain("pas de contournement de CAPTCHA");
    expect(combined).toContain("pas de copie longue");
    expect(combined).toContain("pas de stockage d'identifiants");
    expect(combined).toContain("mode demander avant d'agir");
  });
});
