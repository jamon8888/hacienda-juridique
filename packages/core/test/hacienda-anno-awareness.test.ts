import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const piRoot = resolve(root, "plugins/hacienda-propriete-intellectuelle");

function readPiSkill(skillName: string): string {
  return readFileSync(resolve(piRoot, "skills", skillName, "SKILL.md"), "utf8");
}

const priorityPiSkills = [
  "audit-pi-ma",
  "revue-clause-pi",
  "contrats-pi",
  "revue-logiciel-donnees",
  "revue-open-source",
  "contentieux-pi",
  "tri-contrefacon",
  "mise-en-demeure-pi",
  "portefeuille-pi",
  "depot-preuve-creation"
] as const;

describe("hacienda anno awareness", () => {
  it("makes priority PI skills aware of Anno Tabular operating objects", () => {
    for (const skillName of priorityPiSkills) {
      const content = readPiSkill(skillName);

      expect(content, skillName).toContain("matter_vault");
      expect(content, skillName).toContain("workflow_blueprint");
      expect(content, skillName).toContain("grid_to_work_product");
      expect(content, skillName).toMatch(/revue tabulaire|tabular_review/iu);
      expect(content, skillName).toContain("decision_status");
      expect(content, skillName).toContain("fallback_hacienda");
      expect(content, skillName).toContain("source interne Anno");
      expect(content, skillName).toContain("[à vérifier]");
    }
  });

  it("adds prescription and validation tools to contentious PI workflows", () => {
    for (const skillName of ["contentieux-pi", "tri-contrefacon", "mise-en-demeure-pi"]) {
      const content = readPiSkill(skillName);

      expect(content, skillName).toContain("legal_prescription_check");
      expect(content, skillName).toContain("legal_validate_field");
    }
  });

  it("keeps Anno from becoming an official source in PI skills", () => {
    for (const skillName of priorityPiSkills) {
      const content = readPiSkill(skillName);

      expect(content, skillName).toContain("jamais comme source primaire");
      expect(content, skillName).toContain("hacienda-sources-officielles");
    }
  });
});
