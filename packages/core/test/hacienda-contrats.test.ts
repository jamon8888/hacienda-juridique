import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const pluginDir = resolve(root, "plugins/hacienda-contrats");

const expectedSkills = [
  "recherche-contractuelle",
  "reviser-contrat",
  "reviser-nda",
  "reviser-saas",
  "reviser-cgv-cgu",
  "analyser-distribution",
  "analyser-rupture-brutale",
  "reviser-bail-commercial",
  "proposer-redlines",
  "resume-operationnel"
];

function read(rel: string) {
  return readFileSync(resolve(pluginDir, rel), "utf8");
}

describe("hacienda-contrats", () => {
  it("déclare les skills contrats attendues", () => {
    for (const skill of expectedSkills) {
      expect(existsSync(resolve(pluginDir, `skills/${skill}/SKILL.md`)), skill).toBe(true);
    }
  });

  it("impose le croisement des codes, de la jurisprudence et du dossier de preuve", () => {
    const combined = [
      read("CLAUDE.md"),
      read("skills/recherche-contractuelle/SKILL.md"),
      read("skills/reviser-contrat/SKILL.md"),
      read("skills/reviser-cgv-cgu/SKILL.md"),
      read("skills/analyser-rupture-brutale/SKILL.md"),
      read("skills/reviser-bail-commercial/SKILL.md")
    ].join("\n");

    expect(combined).toContain("Code civil");
    expect(combined).toContain("Code de commerce");
    expect(combined).toContain("Code de la consommation");
    expect(combined).toContain("Cour de cassation");
    expect(combined).toContain("dossier de preuve");
    expect(combined).toContain("[à vérifier]");
    expect(combined).toContain("validation humaine");
  });
});
