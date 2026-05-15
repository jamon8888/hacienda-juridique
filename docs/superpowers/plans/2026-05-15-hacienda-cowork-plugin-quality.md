# Hacienda Cowork Plugin Quality Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reprendre tous les plugins Hacienda un par un pour les transformer en plugins Cowork de qualite juridique, structures sur `haciendas/hacienda-juridique` et adaptes au droit francais.

**Architecture:** Le chantier ajoute d'abord un standard qualite commun et un test transversal qui empeche les plugins de rester des squelettes. Chaque plugin est ensuite traite dans une boucle TDD courte : test rouge, profil de pratique riche, skills operationnels, agents de suivi, README, verification et commit. Les references locales sont `C:\Users\NMarchitecte\anno\hacienda-juridique` et les skills Hacienda installes dans `C:\Users\NMarchitecte\.codex\skills\create-cowork-plugin` et `C:\Users\NMarchitecte\.codex\skills\cowork-plugin-customizer`.

**Tech Stack:** Markdown plugins Claude/Cowork, manifests `.claude-plugin`, skills `SKILL.md`, agents markdown, Vitest dans `packages/core`, npm workspaces.

---

## Regles De Travail

- Travailler un plugin a la fois.
- Ne pas modifier l'ancien repo `C:\Users\NMarchitecte\anno\legal`.
- Utiliser `C:\Users\NMarchitecte\hacienda-juridique`.
- Ne jamais copier du contenu Hacienda tel quel : reprendre la structure, les patterns et le niveau de detail.
- Garder la langue produit en francais.
- Garder le branding `Hacienda` et `https://hacienda.diy`.
- Toute source juridique non consultee reste marquee `[a verifier]`.
- Toute sortie substantielle contient `Note de revue`, `Arbre de decision`, `dossier de preuve`, `source officielle`, `validation humaine`, `profil de pratique` et `Mode silencieux`.
- Un plugin ne passe pas tant que son test qualite n'est pas vert.

## Mapping Reference Claude Legal

| Plugin Hacienda | References locales Claude Legal | But |
| --- | --- | --- |
| `hacienda-hub-confiance` | `legal-builder-hub`, `cowork-plugin-management` | Marketplace, installation, QA, confiance, customisation plugin |
| `hacienda-produit-consommation` | `product-legal`, `commercial-legal` | Launch review, claims, consommation, plateformes |
| `hacienda-reglementaire` | `regulatory-legal` | Veille, gaps, politiques, autorites sectorielles |
| `hacienda-gouvernance-ia` | `ai-governance-legal`, `privacy-legal` | AI Act, RGPD, vendor AI, registre IA |
| `hacienda-propriete-intellectuelle` | `ip-legal` | Marques, logiciel, open source, PI contractuelle |
| `hacienda-droit-public` | `litigation-legal`, `regulatory-legal` | Commande publique, urbanisme, collectivites, contentieux administratif |
| `hacienda-permanences-juridiques` | `legal-clinic` | Accueil, triage, supervision, handoff avocat |
| `hacienda-contrats` | `commercial-legal` | Contrats commerciaux, playbooks, renewals |
| `hacienda-societes` | `corporate-legal` | Gouvernance, M&A, closing, entites |
| `hacienda-social` | `employment-legal` | Travail, RH, licenciement, enquete, paie |
| `hacienda-contentieux` | `litigation-legal` | Portefeuille, delais, actes, pieces, jurisprudence |
| `hacienda-donnees-personnelles` | `privacy-legal` | RGPD, CNIL, DPA, AIPD, violations |
| `hacienda-fiscal` | `regulatory-legal`, `litigation-legal` | BOFiP, CGI, controle, rescrit, contentieux fiscal |
| `hacienda-recherche-documentaire` | `legal-builder-hub`, `litigation-legal` | Recherche privee + verification source primaire |
| `hacienda-sources-officielles` | Connecteur socle Hacienda | Verification Légifrance, BOFiP, JORF, KALI, jurisprudence |

## Definition Of Done Par Plugin

Un plugin est considere termine quand :

- `.claude-plugin/plugin.json` existe, porte le branding Hacienda et decrit le plugin sans reference obsolete.
- `.mcp.json` distingue connecteurs obligatoires, recommandes et optionnels.
- `CLAUDE.md` contient un profil de pratique vivant, les sources prioritaires, les playbooks, les gates d'escalade, le format de sortie et le Mode silencieux.
- `README.md` contient mission, premier lancement, commandes/skills, agents, sources, livrables, limites et apprentissage.
- `skills/entretien-demarrage/SKILL.md` collecte role, secteurs, sources, seed documents, playbooks, risques, sorties et seuils de validation.
- Les skills metier ont toutes les sections : `Avant De Commencer`, `Contexte Dossier`, `Sources A Verifier`, `Workflow`, `Garde-Fous Et Escalade`, `Format De Sortie`, `Dossier De Preuve`, `Arbre De Decision`.
- Les agents ont role, entrees surveillees, cadence, sources, limites, gates d'escalade et format de sortie.
- Les tests du plugin et le test transversal passent.

---

### Task 1: Standard Qualite Cowork Hacienda

**Files:**
- Create: `docs/superpowers/specs/2026-05-15-hacienda-cowork-plugin-quality-standard.md`
- Create: `packages/core/test/hacienda-cowork-quality.test.ts`

- [ ] **Step 1: Write the standard document**

Create `docs/superpowers/specs/2026-05-15-hacienda-cowork-plugin-quality-standard.md` with these sections:

```markdown
# Hacienda Cowork Plugin Quality Standard

## But

Chaque plugin Hacienda doit etre un plugin de pratique juridique exploitable dans Cowork, pas un squelette documentaire.

## References

- `C:\Users\NMarchitecte\anno\hacienda-juridique`
- `C:\Users\NMarchitecte\.codex\skills\create-cowork-plugin`
- `C:\Users\NMarchitecte\.codex\skills\cowork-plugin-customizer`

## Sections Obligatoires CLAUDE.md

- Mission
- Profil cabinet et profil de pratique
- Sources prioritaires
- Espace dossier
- Playbooks ou grilles de decision
- Format de sortie standard
- Note de revue
- Arbre de decision
- Mode silencieux
- Garde-fous

## Sections Obligatoires Skill

- Avant De Commencer
- Contexte Dossier
- Sources A Verifier
- Workflow
- Garde-Fous Et Escalade
- Format De Sortie
- Dossier De Preuve
- Arbre De Decision

## Sections Obligatoires Agent

- Role
- Entrees A Surveiller
- Sources Et Verification
- Cadence
- Garde-Fous Et Escalade
- Format De Sortie
- Note de revue

## Marqueurs Obligatoires

- `[a verifier]`
- `validation humaine`
- `source officielle`
- `dossier de preuve`
- `Note de revue`
- `Arbre de decision`
- `Mode silencieux`
- `profil de pratique`
```

- [ ] **Step 2: Write the failing transversal test**

Create `packages/core/test/hacienda-cowork-quality.test.ts`:

```ts
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

const read = (plugin: string, rel: string) =>
  readFileSync(resolve(pluginsRoot, plugin, rel), "utf8");

const pluginTargets = {
  "hacienda-hub-confiance": {
    minSkills: 10,
    minAgents: 4,
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
    minSkills: 10,
    minAgents: 4,
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
    minSkills: 10,
    minAgents: 4,
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
    minSkills: 10,
    minAgents: 4,
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
    minSkills: 10,
    minAgents: 4,
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
    minSkills: 10,
    minAgents: 4,
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
    minSkills: 10,
    minAgents: 4,
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
} as const;

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
```

- [ ] **Step 3: Run test to verify it fails**

Run:

```bash
npm run test --workspace packages/core -- hacienda-cowork-quality.test.ts
```

Expected: FAIL on the seven skeleton plugins.

- [ ] **Step 4: Commit standard and red test**

Run:

```bash
git add docs/superpowers/specs/2026-05-15-hacienda-cowork-plugin-quality-standard.md packages/core/test/hacienda-cowork-quality.test.ts
git commit -m "test: define cowork plugin quality standard"
```

---

### Task 2: Hacienda Hub Confiance

**Files:**
- Modify: `plugins/hacienda-hub-confiance/CLAUDE.md`
- Modify: `plugins/hacienda-hub-confiance/README.md`
- Modify: `plugins/hacienda-hub-confiance/.mcp.json`
- Modify: `plugins/hacienda-hub-confiance/skills/entretien-demarrage/SKILL.md`
- Create: `plugins/hacienda-hub-confiance/skills/registre-plugins/SKILL.md`
- Create: `plugins/hacienda-hub-confiance/skills/evaluer-skill/SKILL.md`
- Create: `plugins/hacienda-hub-confiance/skills/installer-plugin/SKILL.md`
- Create: `plugins/hacienda-hub-confiance/skills/personnaliser-plugin-cowork/SKILL.md`
- Create: `plugins/hacienda-hub-confiance/skills/audit-manifest/SKILL.md`
- Create: `plugins/hacienda-hub-confiance/skills/audit-mcp/SKILL.md`
- Create: `plugins/hacienda-hub-confiance/skills/surveiller-mises-a-jour/SKILL.md`
- Create: `plugins/hacienda-hub-confiance/skills/desactiver-plugin/SKILL.md`
- Create: `plugins/hacienda-hub-confiance/skills/generer-pack-publication/SKILL.md`
- Create: `plugins/hacienda-hub-confiance/agents/veilleur-registres-plugins.md`
- Create: `plugins/hacienda-hub-confiance/agents/surveillant-mises-a-jour.md`
- Create: `plugins/hacienda-hub-confiance/agents/auditeur-confiance.md`
- Create: `plugins/hacienda-hub-confiance/agents/gardien-connecteurs.md`

- [ ] **Step 1: Read references**

Read:

```powershell
Get-Content C:\Users\NMarchitecte\anno\hacienda-juridique\legal-builder-hub\README.md
Get-Content C:\Users\NMarchitecte\anno\hacienda-juridique\legal-builder-hub\CLAUDE.md
Get-Content C:\Users\NMarchitecte\.codex\skills\create-cowork-plugin\SKILL.md
Get-Content C:\Users\NMarchitecte\.codex\skills\cowork-plugin-customizer\SKILL.md
```

- [ ] **Step 2: Upgrade profile**

`CLAUDE.md` must define:

- mission as Hacienda trust hub;
- local plugin registries;
- allowlist model;
- trust review;
- raw-source review;
- prompt-injection heuristic scan;
- MCP connector risk;
- plugin publication pack;
- plugin disable/uninstall policy;
- human approval gate before writes;
- Mode silencieux and Note de revue.

- [ ] **Step 3: Add skills**

Each skill must include the required sections from the standard. Use this role split:

- `registre-plugins`: maps installed, local, marketplace and candidate plugins.
- `evaluer-skill`: reviews a skill against design, legal safety, prompt injection and connector risk.
- `installer-plugin`: gated install workflow with raw source display and explicit approval.
- `personnaliser-plugin-cowork`: adapts a plugin for a firm, based on Hacienda cowork customizer.
- `audit-manifest`: checks `.claude-plugin/plugin.json`, `.mcp.json`, hooks and metadata.
- `audit-mcp`: analyzes connector trust, scopes, secrets and data access.
- `surveiller-mises-a-jour`: compares installed versions, diffs and trust changes.
- `desactiver-plugin`: safe disable/uninstall path.
- `generer-pack-publication`: creates publication checklist and release notes.

- [ ] **Step 4: Add agents**

Agents must monitor registries, updates, trust posture and connector changes. No agent may auto-install or auto-update.

- [ ] **Step 5: Run focused tests**

Run:

```bash
npm run test --workspace packages/core -- hacienda-cowork-quality.test.ts
```

Expected: hub-confiance assertions PASS, other skeleton plugins still FAIL.

- [ ] **Step 6: Commit**

Run:

```bash
git add plugins/hacienda-hub-confiance packages/core/test/hacienda-cowork-quality.test.ts
git commit -m "feat: upgrade hub confiance cowork quality"
```

---

### Task 3: Product, Regulatory, AI And IP Plugins

**Files:**
- Modify/Create files under:
  - `plugins/hacienda-produit-consommation`
  - `plugins/hacienda-reglementaire`
  - `plugins/hacienda-gouvernance-ia`
  - `plugins/hacienda-propriete-intellectuelle`

- [ ] **Step 1: Upgrade `hacienda-produit-consommation`**

Read:

```powershell
Get-Content C:\Users\NMarchitecte\anno\hacienda-juridique\product-legal\README.md
Get-Content C:\Users\NMarchitecte\anno\hacienda-juridique\product-legal\CLAUDE.md
```

Implement target skills:

- `entretien-demarrage`
- `revue-lancement`
- `revue-parcours-consommateur`
- `revue-claims-marketing`
- `qualification-pratique-commerciale`
- `revue-cgv-cgu`
- `analyse-prix-promotions`
- `controle-marketplace-plateforme`
- `note-risque-produit`
- `surveillance-lancements`

Implement agents:

- `veilleur-lancements`
- `veilleur-pratiques-commerciales`
- `surveillant-claims`
- `registre-risques-produit`

Run:

```bash
npm run test --workspace packages/core -- hacienda-cowork-quality.test.ts
```

Commit:

```bash
git add plugins/hacienda-produit-consommation
git commit -m "feat: upgrade product consumer cowork plugin"
```

- [ ] **Step 2: Upgrade `hacienda-reglementaire`**

Read:

```powershell
Get-Content C:\Users\NMarchitecte\anno\hacienda-juridique\regulatory-legal\README.md
Get-Content C:\Users\NMarchitecte\anno\hacienda-juridique\regulatory-legal\CLAUDE.md
```

Implement target skills:

- `entretien-demarrage`
- `veille-reglementaire`
- `diff-reglementaire`
- `analyse-gap-conformite`
- `rediger-politique`
- `suivi-consultations`
- `cartographie-obligations`
- `registre-gaps`
- `briefing-direction`
- `surveillance-autorites`

Implement agents:

- `veilleur-jorf-loda`
- `veilleur-autorites-sectorielles`
- `tracker-gaps`
- `calendrier-consultations`

Commit:

```bash
git add plugins/hacienda-reglementaire
git commit -m "feat: upgrade regulatory cowork plugin"
```

- [ ] **Step 3: Upgrade `hacienda-gouvernance-ia`**

Read:

```powershell
Get-Content C:\Users\NMarchitecte\anno\hacienda-juridique\ai-governance-legal\README.md
Get-Content C:\Users\NMarchitecte\anno\hacienda-juridique\ai-governance-legal\CLAUDE.md
```

Implement target skills:

- `entretien-demarrage`
- `qualification-cas-usage-ia`
- `analyse-ai-act`
- `revue-fournisseur-ia`
- `generer-aia`
- `registre-systemes-ia`
- `politique-ia-interne`
- `analyse-gap-ia`
- `revue-rgpd-ia`
- `surveillance-ia-policy`

Implement agents:

- `veilleur-ai-act`
- `registre-cas-usage-ia`
- `surveillant-fournisseurs-ia`
- `veilleur-ia-rgpd`

Commit:

```bash
git add plugins/hacienda-gouvernance-ia
git commit -m "feat: upgrade ai governance cowork plugin"
```

- [ ] **Step 4: Upgrade `hacienda-propriete-intellectuelle`**

Read:

```powershell
Get-Content C:\Users\NMarchitecte\anno\hacienda-juridique\ip-legal\README.md
Get-Content C:\Users\NMarchitecte\anno\hacienda-juridique\ip-legal\CLAUDE.md
```

Implement target skills:

- `entretien-demarrage`
- `clearance-marque`
- `revue-clause-pi`
- `revue-open-source`
- `portefeuille-pi`
- `tri-contrefacon`
- `mise-en-demeure-pi`
- `depot-preuve-creation`
- `revue-logiciel-donnees`
- `strategie-defense-pi`

Implement agents:

- `veilleur-renouvellements-pi`
- `veilleur-marques`
- `surveillant-oss`
- `veilleur-contrefacon`

Commit:

```bash
git add plugins/hacienda-propriete-intellectuelle
git commit -m "feat: upgrade ip cowork plugin"
```

---

### Task 4: Droit Public And Permanences

**Files:**
- Modify/Create files under:
  - `plugins/hacienda-droit-public`
  - `plugins/hacienda-permanences-juridiques`

- [ ] **Step 1: Upgrade `hacienda-droit-public`**

Use `litigation-legal` and `regulatory-legal` patterns. Implement target skills:

- `entretien-demarrage`
- `qualification-dossier-public`
- `revue-marche-public`
- `analyse-urbanisme`
- `fonction-publique`
- `collectivites-actes`
- `contentieux-administratif`
- `veille-jurisprudence-admin`
- `controle-legalite`
- `note-risque-public`

Implement agents:

- `veilleur-boamp-marches`
- `veilleur-jurisprudence-admin`
- `suivi-delais-admin`
- `veilleur-collectivites`

Commit:

```bash
git add plugins/hacienda-droit-public
git commit -m "feat: upgrade public law cowork plugin"
```

- [ ] **Step 2: Upgrade `hacienda-permanences-juridiques`**

Read:

```powershell
Get-Content C:\Users\NMarchitecte\anno\hacienda-juridique\legal-clinic\README.md
Get-Content C:\Users\NMarchitecte\anno\hacienda-juridique\legal-clinic\CLAUDE.md
```

Implement target skills:

- `entretien-demarrage`
- `accueil-usager`
- `qualification-probleme`
- `conflits-interets`
- `check-pieces`
- `triage-urgence-delais`
- `memo-superviseur`
- `lettre-usager`
- `handoff-avocat`
- `suivi-dossier-permanence`

Implement agents:

- `suivi-delais-permanence`
- `file-attente-supervision`
- `veille-urgences`
- `suivi-handoffs`

Commit:

```bash
git add plugins/hacienda-permanences-juridiques
git commit -m "feat: upgrade legal clinic cowork plugin"
```

---

### Task 5: Harmonize Already Started Practice Plugins

**Files:**
- Modify existing files under:
  - `plugins/hacienda-contrats`
  - `plugins/hacienda-societes`
  - `plugins/hacienda-social`
  - `plugins/hacienda-contentieux`
  - `plugins/hacienda-donnees-personnelles`
  - `plugins/hacienda-fiscal`

- [ ] **Step 1: Audit against quality standard**

For each plugin, run:

```powershell
rg -n "Note de revue|Arbre de decision|Mode silencieux|profil de pratique|source officielle|validation humaine|dossier de preuve|\\[a verifier\\]" plugins/<plugin>
```

Record gaps in the plan task notes before editing.

- [ ] **Step 2: Upgrade `hacienda-contrats`**

Use `commercial-legal` as reference. Ensure the plugin covers contract playbook polarity, renewals, escalation routing, amendment history, stakeholder summary and matter workspace.

Commit:

```bash
git add plugins/hacienda-contrats packages/core/test
git commit -m "feat: harmonize contracts cowork quality"
```

- [ ] **Step 3: Upgrade `hacienda-societes`**

Use `corporate-legal` as reference. Ensure the plugin covers M&A, board/corporate secretary, entities, closing, diligence and integration.

Commit:

```bash
git add plugins/hacienda-societes packages/core/test
git commit -m "feat: harmonize corporate cowork quality"
```

- [ ] **Step 4: Upgrade `hacienda-social`**

Use `employment-legal` as reference. Ensure jurisdiction footprint, handbook, terminations, hiring, worker classification, leaves, investigations and expansion are reflected in French law.

Commit:

```bash
git add plugins/hacienda-social packages/core/test
git commit -m "feat: harmonize employment cowork quality"
```

- [ ] **Step 5: Upgrade `hacienda-contentieux`**

Use `litigation-legal` as reference. Ensure matter intake, matter history, portfolio status, docket/deadline watcher, claims/moyens, legal hold equivalent, chronology and outside-counsel status are covered.

Commit:

```bash
git add plugins/hacienda-contentieux packages/core/test
git commit -m "feat: harmonize litigation cowork quality"
```

- [ ] **Step 6: Upgrade `hacienda-donnees-personnelles`**

Use `privacy-legal` as reference. This plugin is already the closest to the target. Add only missing matter workspace, policy monitor and reviewer-note consistency if the audit finds gaps.

Commit:

```bash
git add plugins/hacienda-donnees-personnelles packages/core/test
git commit -m "feat: harmonize privacy cowork quality"
```

- [ ] **Step 7: Upgrade `hacienda-fiscal`**

Use `regulatory-legal` and `litigation-legal` patterns. Ensure BOFiP/CGI/LPF sources, rescrit, controle fiscal, reclamation, contentieux fiscal, due dates, risk memo and doctrine drift are covered.

Commit:

```bash
git add plugins/hacienda-fiscal packages/core/test
git commit -m "feat: harmonize tax cowork quality"
```

---

### Task 6: Sources And Research Plugins

**Files:**
- Modify existing files under:
  - `plugins/hacienda-sources-officielles`
  - `plugins/hacienda-recherche-documentaire`

- [ ] **Step 1: Upgrade `hacienda-sources-officielles`**

Do not replace the MCP server. Improve the plugin wrapper:

- profile that explains source tiers;
- skill for source coverage;
- skill for citation audit;
- skill for official-source proof bundle;
- agent for API coverage drift;
- README that explains PISTE, Légifrance, BOFiP, JORF, KALI, Judilibre and gaps.

Commit:

```bash
git add plugins/hacienda-sources-officielles packages/core/test
git commit -m "feat: upgrade official sources cowork quality"
```

- [ ] **Step 2: Upgrade `hacienda-recherche-documentaire`**

Make this the bridge to Doctrine, Lefebvre Dalloz, Lexis, Lamyline, Dalloz, Lexbase, Navis and web research, with mandatory primary-source verification through `hacienda-sources-officielles`.

Commit:

```bash
git add plugins/hacienda-recherche-documentaire packages/core/test
git commit -m "feat: upgrade legal research cowork quality"
```

---

### Task 7: Marketplace, Packaging And Cowork Fit

**Files:**
- Modify: `.claude-plugin/marketplace.json`
- Modify: `README.md`
- Modify: `AGENTS.md`
- Optional create: `docs/cowork/plugin-quality-matrix.md`

- [ ] **Step 1: Add marketplace quality metadata**

Review `.claude-plugin/marketplace.json`. Ensure every plugin entry has a description aligned with its upgraded scope.

- [ ] **Step 2: Add a quality matrix doc**

Create `docs/cowork/plugin-quality-matrix.md` listing every plugin, reference Claude Legal plugin, completion status, source dependencies, and whether it has skills, agents, profile and tests.

- [ ] **Step 3: Update README**

Document:

- install path for Cowork;
- plugin order;
- first-run flow;
- source verification model;
- which plugin to start with by practice type;
- warning that outputs require professional review.

- [ ] **Step 4: Commit marketplace docs**

Run:

```bash
git add .claude-plugin/marketplace.json README.md AGENTS.md docs/cowork/plugin-quality-matrix.md
git commit -m "docs: document cowork plugin quality matrix"
```

---

### Task 8: Final Verification

**Files:**
- No new files expected.

- [ ] **Step 1: Run full verification**

Run:

```bash
npm run branding:check
npm run typecheck --workspaces --if-present
npm run test --workspaces --if-present
npm run build --workspaces --if-present
npm audit --audit-level=moderate
git diff --check
```

Expected:

- branding OK;
- typecheck OK;
- all tests OK;
- build OK;
- audit reports 0 vulnerabilities or documented existing warnings;
- no whitespace errors.

- [ ] **Step 2: Search for old branding**

Run:

```powershell
$oldBrandPattern = ('D' + 'EMERYS') + '|' + ('de' + 'merys') + '|' + ('Berry' + 'er') + '|' + ('berry' + 'er') + '|' + ('https://de' + 'merys\\.com')
rg -n $oldBrandPattern .
```

Expected: no matches.

- [ ] **Step 3: Check Markdown fences**

Run:

```powershell
$fence = [string]::new([char]96, 3); $errors = @(); foreach ($path in (rg --files -g '*.md')) { $count = (Select-String -LiteralPath $path -Pattern $fence -AllMatches).Matches.Count; if (($count % 2) -ne 0) { $errors += "$path has odd fence count $count" } }; if ($errors.Count) { $errors; exit 1 } else { 'Markdown fences OK' }
```

Expected: `Markdown fences OK`.

- [ ] **Step 4: Push branch**

Run:

```bash
git push -u origin codex/hacienda-cowork-plugin-quality
```

---

## Execution Order Recommendation

Use separate implementation branches after this plan is approved:

1. `codex/hacienda-cowork-quality-standard`
2. `codex/hacienda-hub-confiance-quality`
3. `codex/hacienda-product-regulatory-ai-ip-quality`
4. `codex/hacienda-public-clinic-quality`
5. `codex/hacienda-core-practices-harmonize`
6. `codex/hacienda-sources-research-quality`
7. `codex/hacienda-cowork-marketplace-docs`

This avoids one oversized PR and keeps each plugin reviewable.

## Self-Review

- No incomplete marker remains.
- The plan maps every Hacienda plugin to a local reference or Hacienda-specific source role.
- Each implementation task has files, commands, expected outcomes and commit boundaries.
- The first test intentionally fails until skeleton plugins are upgraded.
- The plan is large but decomposed into reviewable branches and plugin batches.
