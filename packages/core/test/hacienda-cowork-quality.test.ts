import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const pluginsRoot = resolve(root, "plugins");

const qualityMarkers = [
  "profil de pratique",
  "Mode silencieux",
  "Arbre de decision",
  "Note de revue",
  "validation humaine",
  "[à vérifier]",
  "source officielle",
  "dossier de preuve"
];

type PluginTarget = {
  expectedSkills: string[];
  expectedAgents: string[];
};

const read = (plugin: string, rel: string) =>
  readFileSync(resolve(pluginsRoot, plugin, rel), "utf8");

const pluginTargets: Record<string, PluginTarget> = {
  "hacienda-propriete-intellectuelle": {
    expectedSkills: [
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
    expectedAgents: [
      "veilleur-renouvellements-pi",
      "veilleur-marques",
      "surveillant-oss",
      "veilleur-contrefacon"
    ]
  }
};

describe("hacienda cowork plugin quality", () => {
  for (const [plugin, target] of Object.entries(pluginTargets)) {
    it(`${plugin} has required files, skills, agents and quality markers`, () => {
      expect(existsSync(resolve(pluginsRoot, plugin, ".claude-plugin/plugin.json"))).toBe(true);
      expect(existsSync(resolve(pluginsRoot, plugin, "CLAUDE.md"))).toBe(true);
      expect(existsSync(resolve(pluginsRoot, plugin, "README.md"))).toBe(true);
      expect(existsSync(resolve(pluginsRoot, plugin, ".mcp.json"))).toBe(true);
      expect(existsSync(resolve(pluginsRoot, plugin, "hooks/hooks.json"))).toBe(true);

      for (const skill of target.expectedSkills) {
        expect(existsSync(resolve(pluginsRoot, plugin, `skills/${skill}/SKILL.md`)), `${plugin}/${skill}`).toBe(true);
      }

      for (const agent of target.expectedAgents) {
        expect(existsSync(resolve(pluginsRoot, plugin, `agents/${agent}.md`)), `${plugin}/${agent}`).toBe(true);
      }

      const combined = [
        read(plugin, "CLAUDE.md"),
        read(plugin, "README.md"),
        ...target.expectedSkills.map((skill) => read(plugin, `skills/${skill}/SKILL.md`)),
        ...target.expectedAgents.map((agent) => read(plugin, `agents/${agent}.md`))
      ].join("\n");

      for (const marker of qualityMarkers) {
        expect(combined).toContain(marker);
      }
    });
  }
});
