import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const pluginDir = resolve(root, "plugins/hacienda-fiscal");

const expectedSkills = [
  "recherche-fiscale",
  "verifier-bofip",
  "analyse-tva",
  "analyse-impot-societes",
  "analyse-impot-revenu",
  "controle-fiscal",
  "rediger-rescrit",
  "memo-contentieux-fiscal",
  "analyse-abus-de-droit",
  "analyse-plus-value"
];

function read(rel: string) {
  return readFileSync(resolve(pluginDir, rel), "utf8");
}

describe("hacienda-fiscal", () => {
  it("déclare les skills fiscaux attendus", () => {
    for (const skill of expectedSkills) {
      expect(existsSync(resolve(pluginDir, `skills/${skill}/SKILL.md`)), skill).toBe(true);
    }
  });

  it("impose le croisement CGI LPF BOFiP et le dossier de preuve", () => {
    const combined = [
      read("CLAUDE.md"),
      read("skills/recherche-fiscale/SKILL.md"),
      read("skills/verifier-bofip/SKILL.md"),
      read("skills/controle-fiscal/SKILL.md")
    ].join("\n");

    expect(combined).toContain("CGI");
    expect(combined).toContain("LPF");
    expect(combined).toContain("BOFiP");
    expect(combined).toContain("Conseil d'État");
    expect(combined).toContain("dossier de preuve");
    expect(combined).toContain("[à vérifier]");
  });
});
