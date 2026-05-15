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
  "[a verifier]",
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
  "hacienda-hub-confiance": {
    expectedSkills: [
      "entretien-demarrage",
      "registre-plugins",
      "evaluer-skill",
      "installer-plugin",
      "personnaliser-plugin-cowork",
      "audit-manifest",
      "audit-mcp",
      "surveiller-mises-a-jour",
      "desactiver-plugin",
      "generer-pack-publication"
    ],
    expectedAgents: [
      "veilleur-registres-plugins",
      "surveillant-mises-a-jour",
      "auditeur-confiance",
      "gardien-connecteurs"
    ]
  },
  "hacienda-produit-consommation": {
    expectedSkills: [
      "entretien-demarrage",
      "revue-lancement",
      "revue-parcours-consommateur",
      "revue-claims-marketing",
      "qualification-pratique-commerciale",
      "revue-cgv-cgu",
      "analyse-prix-promotions",
      "controle-marketplace-plateforme",
      "note-risque-produit",
      "surveillance-lancements"
    ],
    expectedAgents: [
      "veilleur-lancements",
      "veilleur-pratiques-commerciales",
      "surveillant-claims",
      "registre-risques-produit"
    ]
  },
  "hacienda-reglementaire": {
    expectedSkills: [
      "entretien-demarrage",
      "veille-reglementaire",
      "diff-reglementaire",
      "analyse-gap-conformite",
      "rediger-politique",
      "suivi-consultations",
      "cartographie-obligations",
      "registre-gaps",
      "briefing-direction",
      "surveillance-autorites"
    ],
    expectedAgents: [
      "veilleur-jorf-loda",
      "veilleur-autorites-sectorielles",
      "tracker-gaps",
      "calendrier-consultations"
    ]
  },
  "hacienda-gouvernance-ia": {
    expectedSkills: [
      "entretien-demarrage",
      "qualification-cas-usage-ia",
      "analyse-ai-act",
      "revue-fournisseur-ia",
      "generer-aia",
      "registre-systemes-ia",
      "politique-ia-interne",
      "analyse-gap-ia",
      "revue-rgpd-ia",
      "surveillance-ia-policy"
    ],
    expectedAgents: [
      "veilleur-ai-act",
      "registre-cas-usage-ia",
      "surveillant-fournisseurs-ia",
      "veilleur-ia-rgpd"
    ]
  },
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
  },
  "hacienda-droit-public": {
    expectedSkills: [
      "entretien-demarrage",
      "qualification-dossier-public",
      "revue-marche-public",
      "analyse-urbanisme",
      "fonction-publique",
      "collectivites-actes",
      "contentieux-administratif",
      "veille-jurisprudence-admin",
      "controle-legalite",
      "note-risque-public"
    ],
    expectedAgents: [
      "veilleur-boamp-marches",
      "veilleur-jurisprudence-admin",
      "suivi-delais-admin",
      "veilleur-collectivites"
    ]
  },
  "hacienda-permanences-juridiques": {
    expectedSkills: [
      "entretien-demarrage",
      "accueil-usager",
      "qualification-probleme",
      "conflits-interets",
      "check-pieces",
      "triage-urgence-delais",
      "memo-superviseur",
      "lettre-usager",
      "handoff-avocat",
      "suivi-dossier-permanence"
    ],
    expectedAgents: [
      "suivi-delais-permanence",
      "file-attente-supervision",
      "veille-urgences",
      "suivi-handoffs"
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
