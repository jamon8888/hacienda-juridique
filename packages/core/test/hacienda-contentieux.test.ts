import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const pluginDir = resolve(root, "plugins/hacienda-contentieux");

const expectedSkills = [
  "ouverture-dossier",
  "chronologie",
  "matrice-pieces",
  "analyse-moyens",
  "cartographie-jurisprudence",
  "rediger-mise-en-demeure",
  "rediger-assignation",
  "rediger-conclusions",
  "memo-risque-contentieux",
  "strategie-transactionnelle"
];

function read(rel: string) {
  return readFileSync(resolve(pluginDir, rel), "utf8");
}

describe("hacienda-contentieux", () => {
  it("déclare les skills contentieux attendues", () => {
    for (const skill of expectedSkills) {
      expect(existsSync(resolve(pluginDir, `skills/${skill}/SKILL.md`)), skill).toBe(true);
    }
  });

  it("impose le croisement procédure fond jurisprudence et dossier de preuve", () => {
    const combined = [
      read("CLAUDE.md"),
      read("skills/ouverture-dossier/SKILL.md"),
      read("skills/analyse-moyens/SKILL.md"),
      read("skills/cartographie-jurisprudence/SKILL.md"),
      read("skills/rediger-assignation/SKILL.md"),
      read("skills/rediger-conclusions/SKILL.md")
    ].join("\n");

    expect(combined).toContain("Code de procédure civile");
    expect(combined).toContain("Code civil");
    expect(combined).toContain("Code de justice administrative");
    expect(combined).toContain("Cour de cassation");
    expect(combined).toContain("Conseil d'État");
    expect(combined).toContain("dossier de preuve");
    expect(combined).toContain("[à vérifier]");
    expect(combined).toContain("validation humaine");
  });
});
