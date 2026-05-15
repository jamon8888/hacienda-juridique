import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const pluginDir = resolve(root, "plugins/hacienda-societes");

const expectedSkills = [
  "recherche-societes",
  "audit-societes",
  "reviser-pacte-associes",
  "reviser-cession-titres",
  "preparer-assemblee",
  "rediger-proces-verbal",
  "checklist-closing",
  "calendrier-vie-sociale",
  "tableau-garanties",
  "analyse-gouvernance"
];

function read(rel: string) {
  return readFileSync(resolve(pluginDir, rel), "utf8");
}

describe("hacienda-societes", () => {
  it("déclare les skills sociétés attendues", () => {
    for (const skill of expectedSkills) {
      expect(existsSync(resolve(pluginDir, `skills/${skill}/SKILL.md`)), skill).toBe(true);
    }
  });

  it("impose le croisement Code de commerce Code civil RCS-INPI et le dossier de preuve", () => {
    const combined = [
      read("CLAUDE.md"),
      read("skills/recherche-societes/SKILL.md"),
      read("skills/audit-societes/SKILL.md"),
      read("skills/reviser-pacte-associes/SKILL.md"),
      read("skills/preparer-assemblee/SKILL.md"),
      read("skills/checklist-closing/SKILL.md")
    ].join("\n");

    expect(combined).toContain("Code de commerce");
    expect(combined).toContain("Code civil");
    expect(combined).toContain("RCS-INPI");
    expect(combined).toContain("BODACC");
    expect(combined).toContain("Cour de cassation");
    expect(combined).toContain("dossier de preuve");
    expect(combined).toContain("[à vérifier]");
    expect(combined).toContain("validation humaine");
  });
});
