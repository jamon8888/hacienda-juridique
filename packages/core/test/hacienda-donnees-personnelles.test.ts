import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const pluginDir = resolve(root, "plugins/hacienda-donnees-personnelles");

const expectedSkills = [
  "entretien-demarrage",
  "qualification-traitement",
  "reviser-dpa",
  "generer-aipd",
  "registre-traitements",
  "reponse-droits-personnes",
  "conformite-cookies",
  "reponse-violation-donnees",
  "analyse-transferts",
  "analyse-gap-cnil-rgpd",
  "surveillance-politique-confidentialite"
];

const expectedAgents = [
  "veilleur-doctrine-cnil",
  "suivi-demandes-droits",
  "suivi-violations-donnees",
  "veilleur-transferts-internationaux"
];

function read(rel: string) {
  return readFileSync(resolve(pluginDir, rel), "utf8");
}

describe("hacienda-donnees-personnelles", () => {
  it("declare les skills et agents RGPD attendus", () => {
    for (const skill of expectedSkills) {
      expect(existsSync(resolve(pluginDir, `skills/${skill}/SKILL.md`)), skill).toBe(true);
    }

    for (const agent of expectedAgents) {
      expect(existsSync(resolve(pluginDir, `agents/${agent}.md`)), agent).toBe(true);
    }
  });

  it("impose un niveau privacy-legal francais avec sources, revue et preuve", () => {
    const combined = [
      read("CLAUDE.md"),
      read("README.md"),
      read("skills/qualification-traitement/SKILL.md"),
      read("skills/reviser-dpa/SKILL.md"),
      read("skills/generer-aipd/SKILL.md"),
      read("skills/reponse-violation-donnees/SKILL.md"),
      read("skills/analyse-transferts/SKILL.md"),
      read("agents/veilleur-doctrine-cnil.md")
    ].join("\n");

    expect(combined).toContain("RGPD");
    expect(combined).toContain("CNIL");
    expect(combined).toContain("Loi Informatique et Libertes");
    expect(combined).toContain("EDPB");
    expect(combined).toContain("AIPD");
    expect(combined).toContain("dossier de preuve");
    expect(combined).toContain("[a verifier]");
    expect(combined).toContain("validation humaine");
    expect(combined).toContain("Note de revue");
    expect(combined).toContain("Arbre de decision");
    expect(combined).toContain("Mode silencieux");
    expect(combined).toContain("source officielle");
    expect(combined).toContain("profil de pratique");
    expect(combined).toContain("espace dossier");
  });
});
