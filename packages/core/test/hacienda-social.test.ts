import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const pluginDir = resolve(root, "plugins/hacienda-social");

const expectedSkills = [
  "recherche-sociale",
  "analyser-licenciement",
  "analyser-rupture-conventionnelle",
  "analyser-convention-collective",
  "analyser-temps-travail",
  "analyser-cse",
  "rediger-politique-rh",
  "memo-risque-prudhomal",
  "classification-emploi",
  "analyse-remuneration-variable"
];

function read(rel: string) {
  return readFileSync(resolve(pluginDir, rel), "utf8");
}

describe("hacienda-social", () => {
  it("déclare les skills sociales attendues", () => {
    for (const skill of expectedSkills) {
      expect(existsSync(resolve(pluginDir, `skills/${skill}/SKILL.md`)), skill).toBe(true);
    }
  });

  it("impose le croisement Code du travail KALI jurisprudence et le dossier de preuve", () => {
    const combined = [
      read("CLAUDE.md"),
      read("skills/recherche-sociale/SKILL.md"),
      read("skills/analyser-licenciement/SKILL.md"),
      read("skills/analyser-convention-collective/SKILL.md"),
      read("skills/memo-risque-prudhomal/SKILL.md")
    ].join("\n");

    expect(combined).toContain("Code du travail");
    expect(combined).toContain("KALI");
    expect(combined).toContain("IDCC");
    expect(combined).toContain("Cour de cassation");
    expect(combined).toContain("conseil de prud'hommes");
    expect(combined).toContain("dossier de preuve");
    expect(combined).toContain("[à vérifier]");
    expect(combined).toContain("validation humaine");
  });
});
