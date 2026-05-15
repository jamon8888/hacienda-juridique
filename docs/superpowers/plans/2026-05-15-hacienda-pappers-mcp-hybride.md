# Hacienda Pappers MCP Hybride Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a hybrid Pappers MCP integration for business-law workflows without treating Pappers as a normative official source or committing secrets.

**Architecture:** Keep Pappers as an optional external Streamable HTTP MCP connector declared in selected plugin manifests and documented through domain skills. Add a small discovery script and tests so Hacienda can inspect Pappers tools safely, verify no API key is committed, and gate full-power workflows behind credited-key validation.

**Tech Stack:** TypeScript/Node 20+, `@modelcontextprotocol/sdk` `Client` + `StreamableHTTPClientTransport`, JSON plugin manifests, Vitest, existing Hacienda marketplace tests.

---

## File Structure

- Modify `packages/core/src/sources/types.ts`
  - Add `BusinessDataSource`, `BUSINESS_DATA_SOURCES`, and `BusinessDataCitation`.
  - Keep `OFFICIAL_SOURCES` unchanged.
- Modify `packages/core/test/sources.test.ts`
  - Assert Pappers is a business data source and not an official source.
- Create `packages/core/test/pappers-hybrid.test.ts`
  - Verify Pappers connector declarations use environment-variable URL templates only and targeted plugins mention Pappers in docs/skills.
- Create `scripts/pappers-mcp-discover.mjs`
  - Discovers tools via `PAPPERS_API_KEY`, masks secrets, supports summary JSON output, and exits clearly on missing key or insufficient transport support.
- Modify plugin `.mcp.json` files:
  - `plugins/hacienda-societes/.mcp.json`
  - `plugins/hacienda-contrats/.mcp.json`
  - `plugins/hacienda-contentieux/.mcp.json`
  - `plugins/hacienda-fiscal/.mcp.json`
  - `plugins/hacienda-hub-confiance/.mcp.json`
- Modify plugin READMEs and `CLAUDE.md` files for the four business plugins plus hub confiance.
- Create or modify focused skills:
  - `plugins/hacienda-societes/skills/due-diligence-cocontractant/SKILL.md`
  - `plugins/hacienda-contrats/skills/verification-pouvoir-signataire/SKILL.md`
  - `plugins/hacienda-contentieux/skills/analyse-solvabilite-adversaire/SKILL.md`
  - `plugins/hacienda-hub-confiance/skills/audit-pappers-mcp/SKILL.md`

---

## Task 1: Business Data Source Types

**Files:**
- Modify: `packages/core/src/sources/types.ts`
- Modify: `packages/core/test/sources.test.ts`

- [ ] **Step 1: Write the failing source classification test**

Update `packages/core/test/sources.test.ts` to include this test:

```ts
import {
  BUSINESS_DATA_SOURCES,
  OFFICIAL_SOURCES,
  type BusinessDataCitation,
  type BusinessDataSource,
} from "../src/sources/types.js";

it("classifies Pappers as business data, not an official legal source", () => {
  expect(OFFICIAL_SOURCES).toEqual(["LEGIFRANCE", "BOFIP", "JUDILIBRE", "BOSS", "EURLEX"]);
  expect(BUSINESS_DATA_SOURCES).toEqual(["PAPPERS"]);

  const source = "PAPPERS" satisfies BusinessDataSource;
  const citation: BusinessDataCitation = {
    source,
    title: "Fiche entreprise Pappers",
    retrievedAt: "2026-05-15T10:00:00.000Z",
    status: "à vérifier",
    tool: "informations-entreprise",
    id: "552100554",
    fields: ["siren", "nom_entreprise"],
  };

  expect(citation.source).toBe("PAPPERS");
  expect(OFFICIAL_SOURCES).not.toContain("PAPPERS");
});
```

- [ ] **Step 2: Run the failing test**

Run:

```bash
npm --prefix packages/core test -- sources.test.ts
```

Expected: FAIL because `BUSINESS_DATA_SOURCES`, `BusinessDataSource`, and `BusinessDataCitation` do not exist.

- [ ] **Step 3: Implement business data source types**

Update `packages/core/src/sources/types.ts`:

```ts
export type OfficialSource = "LEGIFRANCE" | "BOFIP" | "JUDILIBRE" | "BOSS" | "EURLEX";

export const OFFICIAL_SOURCES = ["LEGIFRANCE", "BOFIP", "JUDILIBRE", "BOSS", "EURLEX"] as const satisfies readonly OfficialSource[];

export type BusinessDataSource = "PAPPERS";

export const BUSINESS_DATA_SOURCES = ["PAPPERS"] as const satisfies readonly BusinessDataSource[];

export type ProofStatus =
  | "vérifié"
  | "à vérifier"
  | "ambigu"
  | "non trouvé"
  | "source secondaire uniquement";

export interface SourceCitation {
  source: OfficialSource;
  title: string;
  url: string;
  retrievedAt: string;
  status: ProofStatus;
  id?: string;
  date?: string;
  paragraph?: string;
  tool?: string;
}

export interface BusinessDataCitation {
  source: BusinessDataSource;
  title: string;
  retrievedAt: string;
  status: ProofStatus;
  tool: string;
  id?: string;
  fields?: string[];
  url?: string;
  recoupedWithOfficialSource?: boolean;
  creditStatus?: "unknown" | "available" | "insufficient";
}

export interface SourceSearchHit {
  source: OfficialSource;
  id: string;
  title: string;
  url: string;
  retrievedAt: string;
  excerpt?: string;
  date?: string;
  score?: number;
}
```

- [ ] **Step 4: Run the source tests**

Run:

```bash
npm --prefix packages/core test -- sources.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/core/src/sources/types.ts packages/core/test/sources.test.ts
git commit -m "feat: classify pappers as business data source"
```

---

## Task 2: Safe Pappers Discovery Script

**Files:**
- Create: `scripts/pappers-mcp-discover.mjs`
- Create: `packages/core/test/pappers-discovery-script.test.ts`

- [ ] **Step 1: Write failing tests for the discovery script**

Create `packages/core/test/pappers-discovery-script.test.ts`:

```ts
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const scriptPath = resolve(import.meta.dirname, "../../../scripts/pappers-mcp-discover.mjs");
const script = readFileSync(scriptPath, "utf8");

describe("Pappers MCP discovery script", () => {
  it("uses the MCP Streamable HTTP transport", () => {
    expect(script).toContain("@modelcontextprotocol/sdk/client/streamableHttp.js");
    expect(script).toContain("StreamableHTTPClientTransport");
  });

  it("reads the key from the environment without embedding secrets", () => {
    expect(script).toContain("process.env.PAPPERS_API_KEY");
    expect(script).not.toMatch(/[a-f0-9]{40,}/iu);
  });

  it("prints only tool summaries by default", () => {
    expect(script).toContain("inputSchemaSummary");
    expect(script).toContain("required");
    expect(script).toContain("properties");
  });
});
```

- [ ] **Step 2: Run the failing test**

Run:

```bash
npm --prefix packages/core test -- pappers-discovery-script.test.ts
```

Expected: FAIL because the script does not exist.

- [ ] **Step 3: Create the discovery script**

Create `scripts/pappers-mcp-discover.mjs`:

```js
#!/usr/bin/env node
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const key = process.env.PAPPERS_API_KEY;

if (!key) {
  console.error("PAPPERS_API_KEY is required. The key must be provided via environment variable and must not be committed.");
  process.exit(2);
}

const endpoint = new URL(`https://mcp.pappers.fr/${key}`);
const client = new Client({ name: "hacienda-pappers-discovery", version: "0.1.0" });
const transport = new StreamableHTTPClientTransport(endpoint);

function inputSchemaSummary(schema) {
  const properties = schema?.properties && typeof schema.properties === "object" ? Object.keys(schema.properties) : [];
  const required = Array.isArray(schema?.required) ? schema.required : [];
  return { required, properties };
}

try {
  await client.connect(transport);
  const result = await client.listTools();
  const tools = result.tools.map((tool) => ({
    name: tool.name,
    title: tool.title ?? tool.name,
    description: tool.description ?? "",
    inputSchema: inputSchemaSummary(tool.inputSchema),
  }));

  console.log(JSON.stringify({ endpoint: "https://mcp.pappers.fr/[masked]", count: tools.length, tools }, null, 2));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Pappers MCP discovery failed: ${message}`);
  process.exit(1);
} finally {
  await client.close().catch(() => undefined);
}
```

- [ ] **Step 4: Run script tests**

Run:

```bash
npm --prefix packages/core test -- pappers-discovery-script.test.ts
```

Expected: PASS.

- [ ] **Step 5: Run missing-key behavior manually**

Run:

```bash
node scripts/pappers-mcp-discover.mjs
```

Expected: exit code 2 and error mentioning `PAPPERS_API_KEY is required`.

- [ ] **Step 6: Commit**

```bash
git add scripts/pappers-mcp-discover.mjs packages/core/test/pappers-discovery-script.test.ts
git commit -m "feat: add pappers mcp discovery script"
```

---

## Task 3: MCP Manifest Declarations

**Files:**
- Modify: `plugins/hacienda-societes/.mcp.json`
- Modify: `plugins/hacienda-contrats/.mcp.json`
- Modify: `plugins/hacienda-contentieux/.mcp.json`
- Modify: `plugins/hacienda-fiscal/.mcp.json`
- Modify: `plugins/hacienda-hub-confiance/.mcp.json`
- Create: `packages/core/test/pappers-hybrid.test.ts`

- [ ] **Step 1: Write failing manifest tests**

Create `packages/core/test/pappers-hybrid.test.ts`:

```ts
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "../../..");
const pluginNames = [
  "hacienda-societes",
  "hacienda-contrats",
  "hacienda-contentieux",
  "hacienda-fiscal",
  "hacienda-hub-confiance",
];

function readJson(path: string): unknown {
  return JSON.parse(readFileSync(resolve(root, path), "utf8")) as unknown;
}

function readText(path: string): string {
  return readFileSync(resolve(root, path), "utf8");
}

describe("Pappers hybrid MCP integration", () => {
  it("declares Pappers as an optional streamable-http connector without committing a key", () => {
    for (const pluginName of pluginNames) {
      const manifest = readJson(`plugins/${pluginName}/.mcp.json`) as {
        mcpServers?: Record<string, { type?: string; url?: string; env?: Record<string, string>; optional?: boolean }>;
      };
      const pappers = manifest.mcpServers?.["Pappers"];

      expect(pappers, pluginName).toBeDefined();
      expect(pappers?.type, pluginName).toBe("streamable-http");
      expect(pappers?.optional, pluginName).toBe(true);
      expect(pappers?.url, pluginName).toBe("https://mcp.pappers.fr/${PAPPERS_API_KEY}");
      expect(JSON.stringify(pappers), pluginName).not.toMatch(/[a-f0-9]{40,}/iu);
    }
  });

  it("documents Pappers as non normative business data", () => {
    for (const pluginName of pluginNames) {
      const readme = readText(`plugins/${pluginName}/README.md`);
      expect(readme, pluginName).toContain("Pappers");
      expect(readme, pluginName).toContain("source officielle normative");
    }
  });
});
```

- [ ] **Step 2: Run the failing tests**

Run:

```bash
npm --prefix packages/core test -- pappers-hybrid.test.ts
```

Expected: FAIL because Pappers is not declared yet.

- [ ] **Step 3: Add Pappers to the five `.mcp.json` files**

For each target `.mcp.json`, add this entry under `mcpServers` while preserving existing entries:

```json
"Pappers": {
  "type": "streamable-http",
  "title": "Pappers",
  "description": "Connecteur externe optionnel pour donnees entreprise, dirigeants, beneficiaires, comptes, BODACC et diligence affaires. Utilise PAPPERS_API_KEY et ne constitue pas une source officielle normative Hacienda.",
  "url": "https://mcp.pappers.fr/${PAPPERS_API_KEY}",
  "optional": true,
  "profiles": [
    "pappers-core-business"
  ]
}
```

For `hacienda-contentieux`, include:

```json
"profiles": [
  "pappers-core-business",
  "pappers-litigation"
]
```

For `hacienda-hub-confiance`, include:

```json
"profiles": [
  "pappers-core-business",
  "pappers-risk-compliance",
  "pappers-litigation",
  "pappers-public-affairs"
]
```

- [ ] **Step 4: Run manifest tests**

Run:

```bash
npm --prefix packages/core test -- pappers-hybrid.test.ts
```

Expected: FAIL only on README documentation if manifests are correct.

- [ ] **Step 5: Commit manifest changes only**

```bash
git add plugins/hacienda-societes/.mcp.json plugins/hacienda-contrats/.mcp.json plugins/hacienda-contentieux/.mcp.json plugins/hacienda-fiscal/.mcp.json plugins/hacienda-hub-confiance/.mcp.json packages/core/test/pappers-hybrid.test.ts
git commit -m "feat: declare pappers mcp connector"
```

---

## Task 4: Plugin Documentation

**Files:**
- Modify: `plugins/hacienda-societes/README.md`
- Modify: `plugins/hacienda-societes/CLAUDE.md`
- Modify: `plugins/hacienda-contrats/README.md`
- Modify: `plugins/hacienda-contrats/CLAUDE.md`
- Modify: `plugins/hacienda-contentieux/README.md`
- Modify: `plugins/hacienda-contentieux/CLAUDE.md`
- Modify: `plugins/hacienda-fiscal/README.md`
- Modify: `plugins/hacienda-fiscal/CLAUDE.md`
- Modify: `plugins/hacienda-hub-confiance/README.md`
- Modify: `plugins/hacienda-hub-confiance/CLAUDE.md`

- [ ] **Step 1: Add the shared README paragraph to each target plugin**

Add this section to each target README, adapted only by the final use-case sentence:

```md
## Connecteur Pappers

Pappers est un connecteur MCP externe optionnel pour les donnees d'entreprise, dirigeants, beneficiaires effectifs, comptes, BODACC, cartographies et signaux de risque. Il utilise `PAPPERS_API_KEY` via `https://mcp.pappers.fr/${PAPPERS_API_KEY}` et ne doit jamais etre configure avec une cle en clair dans le depot.

Pappers n'est pas une source officielle normative Hacienda. Les donnees Pappers peuvent enrichir le dossier de preuve, mais toute conclusion juridique ou citation normative doit etre recoupee avec `hacienda-sources-officielles` ou les pieces du dossier. Les champs PPE, sanctions, scoring financier et scoring non financier exigent une intention explicite et une validation humaine.
```

For `hacienda-societes`, add:

```md
Usage prioritaire : due diligence societe, cartographie groupe, dirigeants, beneficiaires effectifs, comptes, BODACC et preparation M&A.
```

For `hacienda-contrats`, add:

```md
Usage prioritaire : verification cocontractant, pouvoirs du signataire, solvabilite et adaptation des clauses au risque.
```

For `hacienda-contentieux`, add:

```md
Usage prioritaire : solvabilite adversaire, procedures collectives, actifs immobiliers, cartographie groupe et decisions associees.
```

For `hacienda-fiscal`, add:

```md
Usage prioritaire : contexte groupe, comptes, ratios, filiales, actionnaires, maison mere et verification d'identite entreprise.
```

For `hacienda-hub-confiance`, add:

```md
Usage prioritaire : audit du connecteur Pappers, classification des tools, controle des secrets, credits, PPE, sanctions, scoring et donnees personnelles.
```

- [ ] **Step 2: Add CLAUDE guardrails**

Add this section to each target `CLAUDE.md`:

```md
## Pappers MCP

Pappers peut etre utilise comme connecteur externe optionnel lorsque `PAPPERS_API_KEY` est configure et que le dossier justifie des donnees entreprise. Ne jamais traiter Pappers comme une source officielle normative. Les resultats doivent indiquer le tool Pappers utilise, la date de consultation, le SIREN/SIRET ou identifiant, les champs lus et le statut de recoupement.

Si la cle est absente, si les credits sont insuffisants ou si le tool Pappers n'a pas ete appele, marquer les donnees Pappers `[a verifier]`. Les champs PPE, sanctions, scoring financier et scoring non financier necessitent une demande explicite et une validation humaine.
```

- [ ] **Step 3: Run documentation tests**

Run:

```bash
npm --prefix packages/core test -- pappers-hybrid.test.ts hacienda-marketplace.test.ts
```

Expected: PASS.

- [ ] **Step 4: Commit documentation changes**

```bash
git add plugins/hacienda-societes/README.md plugins/hacienda-societes/CLAUDE.md plugins/hacienda-contrats/README.md plugins/hacienda-contrats/CLAUDE.md plugins/hacienda-contentieux/README.md plugins/hacienda-contentieux/CLAUDE.md plugins/hacienda-fiscal/README.md plugins/hacienda-fiscal/CLAUDE.md plugins/hacienda-hub-confiance/README.md plugins/hacienda-hub-confiance/CLAUDE.md
git commit -m "docs: document pappers hybrid connector"
```

---

## Task 5: Business Skills

**Files:**
- Create: `plugins/hacienda-societes/skills/due-diligence-cocontractant/SKILL.md`
- Create: `plugins/hacienda-contrats/skills/verification-pouvoir-signataire/SKILL.md`
- Create: `plugins/hacienda-contentieux/skills/analyse-solvabilite-adversaire/SKILL.md`
- Create: `plugins/hacienda-hub-confiance/skills/audit-pappers-mcp/SKILL.md`
- Modify: related plugin `README.md` skill lists if present.

- [ ] **Step 1: Create Societes due diligence skill**

Create `plugins/hacienda-societes/skills/due-diligence-cocontractant/SKILL.md`:

```md
---
name: due-diligence-cocontractant
description: Prepare une due diligence societe/cocontractant avec Pappers optionnel, sources officielles et dossier de preuve.
argument-hint: "<nom, SIREN/SIRET ou dossier>"
---

# Due Diligence Cocontractant

## Objectif

Identifier et qualifier une societe cible ou un cocontractant avant operation corporate, M&A, closing, contrat sensible ou entree en relation.

## Sources Et Connecteurs

- Pappers MCP si `PAPPERS_API_KEY` est configure.
- `hacienda-sources-officielles` pour les sources normatives.
- Pieces du dossier : statuts, Kbis, registres, pacte, PV, data room.

## Workflow

1. Identifier SIREN/SIRET avec `sirenisateur` si le SIREN est inconnu.
2. Lire `informations-entreprise` avec champs minimum : `siren`, `nom_entreprise`, `siege`, `forme_juridique`, `representants`, `beneficiaires_effectifs`, `procedures_collectives`, `publications_bodacc`.
3. Lire `comptes-entreprise` si solvabilite ou garantie est en jeu.
4. Lire `cartographie-entreprise` si groupe, filiales, dirigeants lies ou beneficiaires sont pertinents.
5. Recouper les points juridiques avec `hacienda-sources-officielles` et les pieces.
6. Produire une note avec faits, risques, sources, incertitudes et validations humaines.

## Garde-Fous

- Pappers n'est pas une source officielle normative.
- Si Pappers est indisponible ou sans credits, marquer les donnees entreprise `[a verifier]`.
- PPE, sanctions et scoring exigent une demande explicite.
- Donnees personnelles minimales dans le livrable.

## Livrable

Conserver SIREN/SIRET, tools Pappers appeles, champs lus, date de consultation, pieces recoupees, sources officielles consultees et decisions de validation.
```

- [ ] **Step 2: Create Contrats signatory skill**

Create `plugins/hacienda-contrats/skills/verification-pouvoir-signataire/SKILL.md`:

```md
---
name: verification-pouvoir-signataire
description: Verifie l'identite du cocontractant, les dirigeants et les pouvoirs apparents du signataire avec Pappers optionnel.
argument-hint: "<contrat, societe, signataire>"
---

# Verification Pouvoir Signataire

## Objectif

Preparer une verification des pouvoirs avant signature d'un contrat d'affaires.

## Workflow

1. Identifier la societe par SIREN/SIRET ou `sirenisateur`.
2. Lire `informations-entreprise` pour `representants`, `siege`, `forme_juridique`, `statut_rcs`, `procedures_collectives`.
3. Utiliser `recherche-dirigeants` si le signataire n'apparait pas clairement dans la fiche.
4. Recouper avec statuts, delegation, pouvoir, Kbis, PV ou extrait fourni.
5. Verifier les textes applicables via `hacienda-sources-officielles` si la capacite ou la representation depend d'une regle juridique.

## Garde-Fous

- Ne jamais conclure que le signataire a pouvoir sans piece ou source recoupee.
- Marquer `[a verifier]` si Pappers, Kbis, statuts ou delegation manquent.
- PPE, sanctions et scoring uniquement sur demande explicite.

## Livrable

Memo pouvoirs avec faits lus, pieces recoupees, points bloquants, incertitudes et validation humaine.
```

- [ ] **Step 3: Create Contentieux solvency skill**

Create `plugins/hacienda-contentieux/skills/analyse-solvabilite-adversaire/SKILL.md`:

```md
---
name: analyse-solvabilite-adversaire
description: Analyse solvabilite, procedures collectives, groupe et actifs d'une partie adverse avec Pappers optionnel.
argument-hint: "<partie adverse ou SIREN>"
---

# Analyse Solvabilite Adversaire

## Objectif

Evaluer l'interet economique et les risques d'un contentieux, recouvrement, mesure conservatoire ou transaction.

## Workflow

1. Identifier la partie par SIREN/SIRET.
2. Lire `informations-entreprise` pour statut, siege, procedures collectives et BODACC.
3. Lire `comptes-entreprise` pour chiffre d'affaires, resultat, capitaux propres et ratios disponibles.
4. Lire `cartographie-entreprise` pour groupe, dirigeants, filiales et beneficiaires.
5. Utiliser `recherche-parcelles` si actifs immobiliers ou suretes sont pertinents.
6. Utiliser `recherche-decisions-justice` seulement comme signal, puis recouper toute decision normative via `hacienda-sources-officielles`.

## Garde-Fous

- Scoring et sanctions exigent demande explicite.
- Donnees Pappers non recoupees restent `[a verifier]`.
- Ne pas presenter une strategie contentieuse comme decision finale sans validation humaine.

## Livrable

Note adverse party litigation avec solvabilite, actifs, procedures, groupe, sources, limites et recommandations a valider.
```

- [ ] **Step 4: Create Hub Confiance audit skill**

Create `plugins/hacienda-hub-confiance/skills/audit-pappers-mcp/SKILL.md`:

```md
---
name: audit-pappers-mcp
description: Audite le connecteur MCP Pappers, ses tools, credits, secrets, donnees personnelles et profils d'activation.
argument-hint: "<plugin ou .mcp.json>"
---

# Audit Pappers MCP

## Objectif

Verifier que Pappers est declare et utilise comme connecteur externe optionnel sans secret commite ni promesse non validee.

## Workflow

1. Lire le `.mcp.json` cible et verifier `type: streamable-http`, `optional: true`, URL avec variable d'environnement et absence de cle.
2. Lancer `node scripts/pappers-mcp-discover.mjs` seulement si `PAPPERS_API_KEY` est configure dans l'environnement.
3. Classer les tools actifs par profil : core business, risk compliance, litigation, public affairs.
4. Verifier que PPE, sanctions, scoring et donnees personnelles ont une validation humaine.
5. Verifier que les workflows normatifs recoupent avec `hacienda-sources-officielles`.
6. Produire une decision : accepte, accepte avec restrictions, bloque.

## Garde-Fous

- Secret en clair : bloquer et demander rotation.
- Credits insuffisants : accepter la config mais refuser l'activation full power.
- Tools justice/politique/territoire : validation specifique avant activation.

## Sortie

Table MCP / tools / donnees / cout-credit / risque / restrictions / decision / validation humaine.
```

- [ ] **Step 5: Update README skill lists**

Add the new skill names to the relevant README `## Skills` lists:

```md
- `due-diligence-cocontractant` : prépare une due diligence société/cocontractant avec Pappers optionnel et sources recoupées.
```

```md
- `verification-pouvoir-signataire` : vérifie l'identité du cocontractant et les pouvoirs apparents du signataire.
```

```md
- `analyse-solvabilite-adversaire` : analyse solvabilité, procédures, groupe et actifs d'une partie adverse.
```

```md
- `audit-pappers-mcp` : audite le connecteur Pappers, ses tools, crédits, secrets et profils d'activation.
```

- [ ] **Step 6: Extend tests for skill presence**

Update `packages/core/test/pappers-hybrid.test.ts` with:

```ts
it("adds focused Pappers business skills", () => {
  const skillPaths = [
    "plugins/hacienda-societes/skills/due-diligence-cocontractant/SKILL.md",
    "plugins/hacienda-contrats/skills/verification-pouvoir-signataire/SKILL.md",
    "plugins/hacienda-contentieux/skills/analyse-solvabilite-adversaire/SKILL.md",
    "plugins/hacienda-hub-confiance/skills/audit-pappers-mcp/SKILL.md",
  ];

  for (const skillPath of skillPaths) {
    const skill = readText(skillPath);
    expect(skill).toContain("Pappers");
    expect(skill).toContain("hacienda-sources-officielles");
    expect(skill).not.toMatch(/[a-f0-9]{40,}/iu);
  }
});
```

- [ ] **Step 7: Run skill tests**

Run:

```bash
npm --prefix packages/core test -- pappers-hybrid.test.ts hacienda-marketplace.test.ts
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add plugins/hacienda-societes/skills/due-diligence-cocontractant/SKILL.md plugins/hacienda-contrats/skills/verification-pouvoir-signataire/SKILL.md plugins/hacienda-contentieux/skills/analyse-solvabilite-adversaire/SKILL.md plugins/hacienda-hub-confiance/skills/audit-pappers-mcp/SKILL.md plugins/hacienda-societes/README.md plugins/hacienda-contrats/README.md plugins/hacienda-contentieux/README.md plugins/hacienda-hub-confiance/README.md packages/core/test/pappers-hybrid.test.ts
git commit -m "feat: add pappers business workflow skills"
```

---

## Task 6: Validation Matrix Documentation

**Files:**
- Create: `docs/integrations/pappers-mcp-validation.md`
- Modify: `README.md`

- [ ] **Step 1: Create validation runbook**

Create `docs/integrations/pappers-mcp-validation.md`:

```md
# Pappers MCP Validation

## Purpose

This runbook validates the external Pappers MCP connector before Hacienda enables full-power business-law workflows.

## Secret Handling

Set the key only in the shell environment:

```powershell
$env:PAPPERS_API_KEY = "<rotated-key>"
```

Never commit the key. Rotate any key pasted into chat, logs or source files.

## Discovery

```powershell
node scripts/pappers-mcp-discover.mjs
```

Expected with a valid key:

- endpoint is printed as `https://mcp.pappers.fr/[masked]`;
- tool count is visible;
- no API key appears in output.

## Credited Validation Matrix

Run only with a credited key and record the result in the client matter file or internal validation log.

| Capability | Tool | Minimal arguments | Activation condition |
| --- | --- | --- | --- |
| SIREN lookup | `sirenisateur` | company name and country | at least one match |
| Company identity | `informations-entreprise` | `siren`, safe return fields | identity fields returned |
| Accounts | `comptes-entreprise` | `siren`, one year | structured account data or empty official response |
| Group map | `cartographie-entreprise` | `siren` | nodes and links returned |
| Directors | `recherche-dirigeants` | name query | result table returned |
| Beneficial owners | `recherche-beneficiaires` | safe query | result table or empty structured response |
| BODACC | `informations-entreprise` | `publications_bodacc` | publications or empty structured response |
| Litigation signal | `recherche-decisions-justice` | one legal query | decisions returned |

## Statuses

- `missing_key`: `PAPPERS_API_KEY` absent.
- `tools_visible`: discovery works.
- `credits_insufficient`: Pappers returns a credit error.
- `validated`: credited live call returned structured data.
- `blocked`: secret exposure, unexpected write capability, or unreviewed sensitive profile.
```

- [ ] **Step 2: Add README integration pointer**

Add to root `README.md` under the relevant documentation section:

```md
- Pappers MCP hybrid validation: `docs/integrations/pappers-mcp-validation.md`
```

- [ ] **Step 3: Add test for runbook**

Update `packages/core/test/pappers-hybrid.test.ts`:

```ts
it("documents credited validation before full-power activation", () => {
  const runbook = readText("docs/integrations/pappers-mcp-validation.md");
  expect(runbook).toContain("credits_insufficient");
  expect(runbook).toContain("validated");
  expect(runbook).toContain("PAPPERS_API_KEY");
  expect(runbook).not.toMatch(/[a-f0-9]{40,}/iu);
});
```

- [ ] **Step 4: Run tests**

Run:

```bash
npm --prefix packages/core test -- pappers-hybrid.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add docs/integrations/pappers-mcp-validation.md README.md packages/core/test/pappers-hybrid.test.ts
git commit -m "docs: add pappers mcp validation runbook"
```

---

## Task 7: Full Verification

**Files:**
- All files changed by previous tasks.

- [ ] **Step 1: Run core tests**

Run:

```bash
npm --prefix packages/core test
```

Expected: all tests pass.

- [ ] **Step 2: Run root typecheck**

Run:

```bash
npm run typecheck
```

Expected: all workspaces typecheck.

- [ ] **Step 3: Run root build**

Run:

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 4: Run branding check**

Run:

```bash
npm run branding:check
```

Expected: no forbidden branding.

- [ ] **Step 5: Run diff whitespace check**

Run:

```bash
git diff --check
```

Expected: no whitespace errors.

- [ ] **Step 6: Inspect git status**

Run:

```bash
git status --short --branch
```

Expected: clean working tree on the implementation branch or `main`, depending on execution choice.

---

## Self-Review

- Spec coverage: source classification, manifest declaration, documentation, skills, Pappers discovery, credited validation, and guardrails are each mapped to tasks.
- Completeness scan: no deferred implementation markers.
- Type consistency: `BusinessDataSource`, `BUSINESS_DATA_SOURCES`, and `BusinessDataCitation` are introduced in Task 1 and reused consistently.
