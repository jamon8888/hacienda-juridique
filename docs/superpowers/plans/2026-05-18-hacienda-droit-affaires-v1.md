# Hacienda Droit des Affaires v1 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Livrer en 6-8 semaines le plugin `hacienda-droit-affaires` v1 — 9 skills + 3 agents + 4 references + CLAUDE.md complet + MCP wrapper minimal + ajouts à `packages/core` — au niveau de qualité de `hacienda-propriete-intellectuelle` v0.16, testé par deux personas réels (frère cabinet M&A, ami procédures collectives).

**Architecture:** Plugin monoplugin consommant `packages/core` pour les sources (Légifrance, Pappers, BODACC, Judilibre, BOSS, Eurlex, BOFiP). MCP server local est un wrapper minimal (~30 lignes) sans logique métier. Le pattern unified credentials (`~/.config/Hacienda/credentials.json`) sert pour tous les secrets. Skills suivent le format canonique `contrats-pi` / `contentieux-pi`. Mode dégradé sans Pappers (fallback BODACC) et sans PISTE (citations taguées `[à vérifier]`).

**Tech Stack:** TypeScript (Node 20+), vitest (tests), `@modelcontextprotocol/sdk` (MCP), `@hacienda/core` (workspace). Skills et CLAUDE.md en Markdown avec YAML frontmatter. Aucun framework UI.

**Spec:** `docs/superpowers/specs/2026-05-18-hacienda-droit-affaires-design.md`

---

## File Structure (locked decomposition)

### Nouveau plugin
```
plugins/hacienda-droit-affaires/
├── .claude-plugin/
│   ├── plugin.json
│   └── marketplace.json
├── .mcp.json
├── CLAUDE.md
├── README.md
├── CHANGELOG.md
├── skills/
│   ├── entretien-demarrage/SKILL.md
│   ├── reviser-contrat/SKILL.md
│   ├── reviser-nda/SKILL.md
│   ├── liste-de-points/SKILL.md
│   ├── revue-tabulaire/SKILL.md
│   ├── gap-review/SKILL.md
│   ├── declaration-creance/SKILL.md
│   ├── verifier-citations/SKILL.md
│   └── check-pii/SKILL.md
├── agents/
│   ├── bodacc-watcher.md
│   ├── bodacc-procedures-watcher.md
│   └── echeances-societaires.md
├── references/
│   ├── clauses-sensibles-fr.md
│   ├── sources-fr.md
│   ├── taxonomie-contrats-fr.md
│   └── articles-c-civ-c-com-index.md
├── mcp-server/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/index.ts
└── hooks/
    └── hooks.json
```

### Ajouts à `packages/core`
```
packages/core/
├── src/
│   ├── config.ts                            (modifier : ajouter loadPappersCredentials si manquant)
│   ├── sources/
│   │   └── bodacc.ts                        (NOUVEAU)
│   └── tools/
│       ├── bodacc-by-siren.ts               (NOUVEAU)
│       ├── bodacc-procedures.ts             (NOUVEAU)
│       └── company-full-profile.ts          (NOUVEAU)
└── test/
    ├── bodacc.test.ts                       (NOUVEAU)
    ├── bodacc-tools.test.ts                 (NOUVEAU)
    ├── company-full-profile.test.ts         (NOUVEAU)
    └── hacienda-droit-affaires.test.ts      (NOUVEAU — cross-plugin)
```

### Responsabilités

| Fichier | Responsabilité unique |
|---|---|
| `core/src/sources/bodacc.ts` | Client HTTP BODACC OpenDataSoft (sans auth), parsing JSON → modèles typés |
| `core/src/tools/bodacc-by-siren.ts` | Outil MCP : annonces BODACC par SIREN |
| `core/src/tools/bodacc-procedures.ts` | Outil MCP : procédures collectives par SIREN |
| `core/src/tools/company-full-profile.ts` | Composite : essaie Pappers d'abord, fallback BODACC + Annuaire DINUM |
| `core/test/hacienda-droit-affaires.test.ts` | Cross-plugin : valide que core répond aux besoins exposés par les skills |
| `plugin/mcp-server/src/index.ts` | Wrapper MCP — enregistre les tools de core auprès du protocole stdio |
| `plugin/CLAUDE.md` | Profil cabinet d'affaires + 11 sections garde-fous (calqué PI v0.16) |
| `plugin/skills/*/SKILL.md` | Workflow ou wrapper (format canonique frontmatter+disclaimer+examples+intake+étapes) |
| `plugin/agents/*.md` | Spécification agent (cadence + sources + déclencheurs d'alerte) |
| `plugin/references/*.md` | Données structurées juridiques (clauses, sources, taxonomie, articles indexés) |

---

## Waves overview

| Wave | Périmètre | Dépendances | Durée estimée |
|---|---|---|---|
| **Wave 0** | Plugin skeleton + ajouts core (BODACC + outils + composite) + cross-plugin test scaffold | aucune | 1 semaine |
| **Wave 1** | CLAUDE.md complet + entretien-demarrage | Wave 0 | 1 semaine |
| **Wave 2** | Skills transversaux (check-pii + verifier-citations) | Wave 1 | 1 semaine |
| **Wave 3** | References (4 fichiers) | Wave 1 (CLAUDE.md sert de référence) | 1 semaine (en parallèle Wave 2) |
| **Wave 4** | Skills contrats (reviser-contrat, reviser-nda, liste-de-points, revue-tabulaire) | Waves 1+2+3 | 2 semaines |
| **Wave 5** | Skills M&A et procédures (gap-review, declaration-creance) | Wave 4 | 1 semaine |
| **Wave 6** | Agents (3) | Wave 0 (sources BODACC dans core) | 1 semaine (en parallèle Wave 5) |
| **Wave 7** | MCP wrapper + intégration end-to-end + dataset testeurs | toutes | 1 semaine |

Total : 6-8 semaines selon parallélisation.

---

## Wave 0 — Foundation

### Task 0.1: Plugin skeleton

**Files:**
- Create: `plugins/hacienda-droit-affaires/.claude-plugin/plugin.json`
- Create: `plugins/hacienda-droit-affaires/.claude-plugin/marketplace.json`
- Create: `plugins/hacienda-droit-affaires/.mcp.json`
- Create: `plugins/hacienda-droit-affaires/README.md`
- Create: `plugins/hacienda-droit-affaires/CHANGELOG.md`
- Create: `plugins/hacienda-droit-affaires/hooks/hooks.json`
- Create: empty dirs `skills/`, `agents/`, `references/`, `mcp-server/src/` with `.gitkeep`

- [ ] **Step 1: Create plugin.json**

File: `plugins/hacienda-droit-affaires/.claude-plugin/plugin.json`
```json
{
  "name": "hacienda-droit-affaires",
  "version": "0.1.0",
  "description": "Droit des affaires français : revue de contrats commerciaux, M&A (GAP, due diligence, term sheet), procédures collectives côté créancier (déclarations de créance L.622-24, suivi de forclusion), avec validation des citations Légifrance et détection PII embarquée.",
  "author": { "name": "Hacienda", "url": "https://hacienda.diy" },
  "repository": "https://github.com/jamon8888/hacienda-juridique",
  "license": "AGPL-3.0-or-later",
  "keywords": [
    "hacienda", "droit-des-affaires", "ma-corporate", "contrats-commerciaux",
    "procedures-collectives", "gap", "due-diligence", "spa", "pacte-associes",
    "declaration-creance", "bodacc", "pappers", "legifrance"
  ]
}
```

- [ ] **Step 2: Create marketplace.json**

File: `plugins/hacienda-droit-affaires/.claude-plugin/marketplace.json`
```json
{
  "name": "hacienda-droit-affaires-marketplace",
  "owner": { "name": "Hacienda" },
  "metadata": {
    "description": "Plugin droit des affaires français pour cabinets M&A et indépendants procédures collectives",
    "version": "0.1.0"
  },
  "plugins": [{
    "name": "hacienda-droit-affaires",
    "description": "Revue de contrats commerciaux, M&A léger (GAP, DD, SPA), procédures collectives côté créancier",
    "version": "0.1.0",
    "source": "./",
    "category": "droit-des-affaires",
    "tags": ["ma-corporate", "contrats", "procedures-collectives"],
    "author": { "name": "Hacienda" }
  }]
}
```

- [ ] **Step 3: Create .mcp.json (declarative only, no secrets)**

File: `plugins/hacienda-droit-affaires/.mcp.json`
```json
{
  "mcpServers": {
    "Hacienda Droit des Affaires": {
      "type": "stdio",
      "title": "Hacienda Droit des Affaires",
      "description": "Revue contrats, M&A (GAP, DD, term sheet), procédures collectives. Sources : Légifrance, Pappers (payant — fallback BODACC gratuit), Judilibre."
    }
  },
  "recommendedCategories": [
    "droit-des-affaires", "contrats-commerciaux", "ma-corporate",
    "procedures-collectives", "registres-officiels"
  ]
}
```

- [ ] **Step 4: Create hooks/hooks.json (minimal)**

File: `plugins/hacienda-droit-affaires/hooks/hooks.json`
```json
{
  "hooks": {}
}
```

- [ ] **Step 5: Create README.md (placeholder for now, finalisé en Wave 7)**

File: `plugins/hacienda-droit-affaires/README.md`
```markdown
# Hacienda Droit des Affaires

Plugin pour cabinets d'avocats d'affaires et indépendants en procédures collectives.

Status : v1 en cours de développement.

Voir `docs/superpowers/specs/2026-05-18-hacienda-droit-affaires-design.md` pour la spec.
```

- [ ] **Step 6: Create CHANGELOG.md**

File: `plugins/hacienda-droit-affaires/CHANGELOG.md`
```markdown
# Changelog

## [0.1.0] - en cours

Première version — skeleton initial.
```

- [ ] **Step 7: Create empty dirs with .gitkeep**

Run:
```bash
mkdir -p plugins/hacienda-droit-affaires/{skills,agents,references,mcp-server/src}
touch plugins/hacienda-droit-affaires/{skills,agents,references}/.gitkeep
```

- [ ] **Step 8: Verify plugin loads (smoke test)**

Run:
```bash
cat plugins/hacienda-droit-affaires/.claude-plugin/plugin.json | jq .name
```
Expected: `"hacienda-droit-affaires"`

- [ ] **Step 9: Commit**

```bash
git add plugins/hacienda-droit-affaires/
git commit -m "feat(droit-affaires): plugin skeleton v0.1.0"
```

---

### Task 0.2: Vérifier que loadPappersCredentials existe dans core, l'ajouter sinon

**Files:**
- Read: `packages/core/src/config.ts`
- Potentially modify: `packages/core/src/config.ts`
- Test: `packages/core/test/config-credentials.test.ts`

- [ ] **Step 1: Read config.ts and check for loadPappersCredentials**

Run:
```bash
grep -n "loadPappersCredentials\|PAPPERS_API_KEY" packages/core/src/config.ts
```

If function exists, skip to Step 5 (mark task as already-done and commit a no-op note in CHANGELOG). If not, continue.

- [ ] **Step 2: Write failing test for loadPappersCredentials**

Add to `packages/core/test/config-credentials.test.ts`:
```typescript
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { loadPappersCredentials } from "../src/config.js";

describe("loadPappersCredentials", () => {
  const ORIGINAL_ENV = { ...process.env };
  beforeEach(() => {
    delete process.env.PAPPERS_API_KEY;
    delete process.env.HACIENDA_CREDENTIALS_FILE;
  });
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it("returns null when no env var and no file", () => {
    expect(loadPappersCredentials()).toBeNull();
  });

  it("reads PAPPERS_API_KEY from env", () => {
    process.env.PAPPERS_API_KEY = "test-key";
    expect(loadPappersCredentials()).toEqual({ apiKey: "test-key" });
  });

  it("ignores literal ${VAR} placeholder", () => {
    process.env.PAPPERS_API_KEY = "${PAPPERS_API_KEY}";
    expect(loadPappersCredentials()).toBeNull();
  });
});
```

- [ ] **Step 3: Run test, verify it fails**

Run:
```bash
cd packages/core && npx vitest run test/config-credentials.test.ts -t "loadPappersCredentials"
```
Expected: FAIL (`loadPappersCredentials is not a function` or similar)

- [ ] **Step 4: Implement loadPappersCredentials in config.ts**

Add to `packages/core/src/config.ts` (after existing loadEuipoCredentials):
```typescript
export interface PappersCredentials { apiKey: string }

export function loadPappersCredentials(): PappersCredentials | null {
  const fileCreds = loadCredentialsFile();
  const apiKey = readCredential(process.env.PAPPERS_API_KEY, fileCreds?.PAPPERS_API_KEY);
  if (!apiKey) return null;
  return { apiKey };
}
```

Also ensure `CredentialsFile` interface has `PAPPERS_API_KEY?: string` (it should per the spec, verify).

- [ ] **Step 5: Run tests, verify they pass**

Run:
```bash
cd packages/core && npx vitest run test/config-credentials.test.ts -t "loadPappersCredentials"
```
Expected: 3 tests PASS

- [ ] **Step 6: Commit**

```bash
git add packages/core/src/config.ts packages/core/test/config-credentials.test.ts
git commit -m "feat(core): loadPappersCredentials with env + file + placeholder cleanup"
```

---

### Task 0.3: Ajouter source BODACC à packages/core (TDD)

**Files:**
- Create: `packages/core/src/sources/bodacc.ts`
- Create: `packages/core/test/bodacc.test.ts`

- [ ] **Step 1: Write failing test for BodaccClient interface**

File: `packages/core/test/bodacc.test.ts`
```typescript
import { describe, it, expect } from "vitest";
import { BodaccClient, BodaccAnnonce } from "../src/sources/bodacc.js";

describe("BodaccClient", () => {
  it("constructs without credentials (BODACC is public)", () => {
    const client = new BodaccClient();
    expect(client).toBeDefined();
  });

  it("exposes searchBySiren method", () => {
    const client = new BodaccClient();
    expect(typeof client.searchBySiren).toBe("function");
  });

  it("exposes searchProcedures method", () => {
    const client = new BodaccClient();
    expect(typeof client.searchProcedures).toBe("function");
  });
});
```

- [ ] **Step 2: Run test, verify it fails**

Run:
```bash
cd packages/core && npx vitest run test/bodacc.test.ts
```
Expected: FAIL (module not found)

- [ ] **Step 3: Implement minimal BodaccClient skeleton**

File: `packages/core/src/sources/bodacc.ts`
```typescript
import { log } from "../logger.js";

const BODACC_BASE_URL = "https://bodacc-datadila.opendatasoft.com/api/explore/v2.1";

export interface BodaccAnnonce {
  id: string;
  registre: string;
  dateparution: string;
  typeavis: string;
  familleavis: string;
  publicationavis: string;
  numerodepartement?: string;
  ville?: string;
  raw: unknown;
}

export class BodaccClient {
  constructor(private readonly baseUrl: string = BODACC_BASE_URL) {}

  async searchBySiren(siren: string, limit: number = 20): Promise<BodaccAnnonce[]> {
    return [];
  }

  async searchProcedures(siren: string): Promise<BodaccAnnonce[]> {
    return [];
  }
}
```

- [ ] **Step 4: Run tests, verify they pass**

Run:
```bash
cd packages/core && npx vitest run test/bodacc.test.ts
```
Expected: 3 PASS

- [ ] **Step 5: Add test for searchBySiren returning parsed results (mock fetch)**

Add to `test/bodacc.test.ts`:
```typescript
import { vi } from "vitest";

describe("BodaccClient.searchBySiren", () => {
  it("returns parsed announcements", async () => {
    const mockResponse = {
      results: [
        {
          id: "abc123",
          registre: "['123456789']",
          dateparution: "2026-04-15",
          typeavis_lib: "Avis initial",
          familleavis_lib: "modifications",
          publicationavis_facette: "BODACC A",
          numerodepartement: "75",
          ville: "PARIS",
        },
      ],
    };
    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const client = new BodaccClient();
    const result = await client.searchBySiren("123456789");

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("abc123");
    expect(result[0].registre).toContain("123456789");
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining("bodacc-datadila.opendatasoft.com"),
      expect.any(Object)
    );
    fetchSpy.mockRestore();
  });

  it("returns empty array on HTTP error", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    const client = new BodaccClient();
    const result = await client.searchBySiren("123456789");
    expect(result).toEqual([]);
  });
});
```

- [ ] **Step 6: Run test, verify failure on first test**

Run:
```bash
cd packages/core && npx vitest run test/bodacc.test.ts -t "returns parsed announcements"
```
Expected: FAIL (empty array returned, expected length 1)

- [ ] **Step 7: Implement searchBySiren with real HTTP call**

Replace `searchBySiren` in `bodacc.ts`:
```typescript
async searchBySiren(siren: string, limit: number = 20): Promise<BodaccAnnonce[]> {
  const params = new URLSearchParams({
    where: `registre LIKE "%${siren}%"`,
    order_by: "dateparution DESC",
    limit: String(limit),
  });
  const url = `${this.baseUrl}/catalog/datasets/annonces-commerciales/records?${params}`;
  try {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) {
      log.warn("BODACC HTTP error", { status: res.status, siren });
      return [];
    }
    const data = (await res.json()) as { results: unknown[] };
    return (data.results ?? []).map((r) => this.parseAnnonce(r));
  } catch (err) {
    log.warn("BODACC fetch failed", { err: String(err), siren });
    return [];
  }
}

private parseAnnonce(raw: unknown): BodaccAnnonce {
  const r = raw as Record<string, unknown>;
  return {
    id: String(r.id ?? ""),
    registre: String(r.registre ?? ""),
    dateparution: String(r.dateparution ?? ""),
    typeavis: String(r.typeavis_lib ?? ""),
    familleavis: String(r.familleavis_lib ?? ""),
    publicationavis: String(r.publicationavis_facette ?? ""),
    numerodepartement: r.numerodepartement ? String(r.numerodepartement) : undefined,
    ville: r.ville ? String(r.ville) : undefined,
    raw,
  };
}
```

- [ ] **Step 8: Run tests, verify they pass**

Run:
```bash
cd packages/core && npx vitest run test/bodacc.test.ts
```
Expected: all PASS

- [ ] **Step 9: Add test for searchProcedures (filtered by familleavis)**

Add to `test/bodacc.test.ts`:
```typescript
describe("BodaccClient.searchProcedures", () => {
  it("filters only procedures collectives", async () => {
    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ results: [] }),
    } as Response);

    const client = new BodaccClient();
    await client.searchProcedures("123456789");

    const callArg = fetchSpy.mock.calls[0][0] as string;
    expect(callArg).toContain("familleavis");
    expect(callArg).toMatch(/procedures-collectives|procedure_collective/i);
    fetchSpy.mockRestore();
  });
});
```

- [ ] **Step 10: Run test, verify failure**

Expected: FAIL (searchProcedures still returns `[]` without filter)

- [ ] **Step 11: Implement searchProcedures**

Replace `searchProcedures`:
```typescript
async searchProcedures(siren: string): Promise<BodaccAnnonce[]> {
  const params = new URLSearchParams({
    where: `registre LIKE "%${siren}%" AND familleavis = "procedures-collectives"`,
    order_by: "dateparution DESC",
    limit: "50",
  });
  const url = `${this.baseUrl}/catalog/datasets/annonces-commerciales/records?${params}`;
  try {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) return [];
    const data = (await res.json()) as { results: unknown[] };
    return (data.results ?? []).map((r) => this.parseAnnonce(r));
  } catch (err) {
    log.warn("BODACC procedures fetch failed", { err: String(err), siren });
    return [];
  }
}
```

- [ ] **Step 12: Run all tests, verify they pass**

Run:
```bash
cd packages/core && npx vitest run test/bodacc.test.ts
```
Expected: all PASS (5-6 tests)

- [ ] **Step 13: Commit**

```bash
git add packages/core/src/sources/bodacc.ts packages/core/test/bodacc.test.ts
git commit -m "feat(core): BODACC OpenDataSoft source — searchBySiren + searchProcedures"
```

---

### Task 0.4: MCP tools BODACC dans core (TDD)

**Files:**
- Create: `packages/core/src/tools/bodacc-by-siren.ts`
- Create: `packages/core/src/tools/bodacc-procedures.ts`
- Create: `packages/core/test/bodacc-tools.test.ts`

- [ ] **Step 1: Write failing test for bodacc-by-siren tool**

File: `packages/core/test/bodacc-tools.test.ts`
```typescript
import { describe, it, expect, vi } from "vitest";
import { bodaccBySirenTool } from "../src/tools/bodacc-by-siren.js";

describe("bodaccBySirenTool", () => {
  it("exposes MCP tool schema", () => {
    expect(bodaccBySirenTool.name).toBe("bodacc_by_siren");
    expect(bodaccBySirenTool.description).toContain("annonces BODACC");
    expect(bodaccBySirenTool.inputSchema.properties).toHaveProperty("siren");
  });

  it("calls client.searchBySiren and returns formatted result", async () => {
    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ results: [{ id: "x", registre: "['123456789']", dateparution: "2026-04-15" }] }),
    } as Response);

    const result = await bodaccBySirenTool.handler({ siren: "123456789" });
    expect(result.content[0].text).toContain("123456789");
    fetchSpy.mockRestore();
  });
});
```

- [ ] **Step 2: Run test, verify it fails**

Expected: FAIL (module not found)

- [ ] **Step 3: Implement bodacc-by-siren tool**

File: `packages/core/src/tools/bodacc-by-siren.ts`
```typescript
import { BodaccClient } from "../sources/bodacc.js";

export const bodaccBySirenTool = {
  name: "bodacc_by_siren" as const,
  description:
    "Récupère les annonces BODACC publiées pour un SIREN. Couvre immatriculations, modifications, radiations, procédures collectives. Source publique sans authentification.",
  inputSchema: {
    type: "object" as const,
    properties: {
      siren: {
        type: "string",
        description: "Numéro SIREN à 9 chiffres",
        pattern: "^[0-9]{9}$",
      },
      limit: {
        type: "number",
        description: "Nombre max d'annonces à retourner (défaut 20)",
        default: 20,
      },
    },
    required: ["siren"],
  },
  async handler(args: { siren: string; limit?: number }) {
    const client = new BodaccClient();
    const annonces = await client.searchBySiren(args.siren, args.limit ?? 20);
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(annonces, null, 2),
        },
      ],
    };
  },
};
```

- [ ] **Step 4: Run tests, verify they pass**

Run:
```bash
cd packages/core && npx vitest run test/bodacc-tools.test.ts -t "bodaccBySirenTool"
```
Expected: 2 PASS

- [ ] **Step 5: Add failing test for bodacc-procedures tool**

Add to `test/bodacc-tools.test.ts`:
```typescript
import { bodaccProceduresTool } from "../src/tools/bodacc-procedures.js";

describe("bodaccProceduresTool", () => {
  it("exposes MCP tool schema for procedures only", () => {
    expect(bodaccProceduresTool.name).toBe("bodacc_procedures");
    expect(bodaccProceduresTool.description.toLowerCase()).toContain("procédures collectives");
  });

  it("filters by procedures collectives", async () => {
    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ results: [] }),
    } as Response);

    await bodaccProceduresTool.handler({ siren: "123456789" });
    const callArg = fetchSpy.mock.calls[0][0] as string;
    expect(callArg).toContain("procedures-collectives");
    fetchSpy.mockRestore();
  });
});
```

- [ ] **Step 6: Run test, verify it fails**

Expected: FAIL (module not found)

- [ ] **Step 7: Implement bodacc-procedures tool**

File: `packages/core/src/tools/bodacc-procedures.ts`
```typescript
import { BodaccClient } from "../sources/bodacc.js";

export const bodaccProceduresTool = {
  name: "bodacc_procedures" as const,
  description:
    "Récupère uniquement les procédures collectives BODACC publiées pour un SIREN : sauvegarde, redressement judiciaire, liquidation, plans, jugements d'ouverture. Source publique sans authentification.",
  inputSchema: {
    type: "object" as const,
    properties: {
      siren: {
        type: "string",
        description: "Numéro SIREN à 9 chiffres",
        pattern: "^[0-9]{9}$",
      },
    },
    required: ["siren"],
  },
  async handler(args: { siren: string }) {
    const client = new BodaccClient();
    const procedures = await client.searchProcedures(args.siren);
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(procedures, null, 2),
        },
      ],
    };
  },
};
```

- [ ] **Step 8: Run all tests**

Run:
```bash
cd packages/core && npx vitest run test/bodacc-tools.test.ts
```
Expected: 4 PASS

- [ ] **Step 9: Commit**

```bash
git add packages/core/src/tools/bodacc-by-siren.ts packages/core/src/tools/bodacc-procedures.ts packages/core/test/bodacc-tools.test.ts
git commit -m "feat(core): MCP tools bodacc_by_siren + bodacc_procedures"
```

---

### Task 0.5: Composite tool company_full_profile (Pappers → BODACC fallback)

**Files:**
- Create: `packages/core/src/tools/company-full-profile.ts`
- Create: `packages/core/test/company-full-profile.test.ts`

- [ ] **Step 1: Write failing test for happy path Pappers**

File: `packages/core/test/company-full-profile.test.ts`
```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { companyFullProfileTool } from "../src/tools/company-full-profile.js";

describe("companyFullProfileTool", () => {
  beforeEach(() => {
    delete process.env.PAPPERS_API_KEY;
    delete process.env.HACIENDA_CREDENTIALS_FILE;
  });

  it("uses Pappers when credentials present", async () => {
    process.env.PAPPERS_API_KEY = "test-key";
    const fetchSpy = vi.spyOn(global, "fetch").mockImplementation(async (url) => {
      const u = String(url);
      if (u.includes("pappers.fr") || u.includes("api.pappers")) {
        return { ok: true, json: async () => ({ siren: "123456789", denomination: "ACME SA" }) } as Response;
      }
      return { ok: false, status: 404 } as Response;
    });

    const result = await companyFullProfileTool.handler({ siren: "123456789" });
    expect(result.content[0].text).toContain("source");
    expect(result.content[0].text).toContain("pappers");
    fetchSpy.mockRestore();
  });

  it("falls back to BODACC when Pappers credentials absent", async () => {
    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ results: [{ id: "x", registre: "['123456789']", dateparution: "2026-01-01" }] }),
    } as Response);

    const result = await companyFullProfileTool.handler({ siren: "123456789" });
    const txt = result.content[0].text;
    expect(txt).toContain("bodacc-public");
    expect(txt).toContain("Pappers non configuré");
    fetchSpy.mockRestore();
  });

  it("returns explicit error when both Pappers and BODACC fail", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({ ok: false, status: 500 } as Response);

    const result = await companyFullProfileTool.handler({ siren: "123456789" });
    expect(result.content[0].text.toLowerCase()).toContain("aucune source");
  });
});
```

- [ ] **Step 2: Run tests, verify failure**

Expected: FAIL (module not found)

- [ ] **Step 3: Implement company-full-profile composite**

File: `packages/core/src/tools/company-full-profile.ts`
```typescript
import { BodaccClient } from "../sources/bodacc.js";
import { loadPappersCredentials } from "../config.js";

// Note : ce composite essaie Pappers d'abord (riche), fallback BODACC
// public (gratuit). Si une fonction pappers existe déjà ailleurs dans
// core, l'importer ; sinon faire l'appel HTTP inline pour cette version.

async function tryPappers(siren: string): Promise<unknown | null> {
  const creds = loadPappersCredentials();
  if (!creds) return null;
  try {
    const url = `https://api.pappers.fr/v2/entreprise?siren=${siren}&api_token=${creds.apiKey}`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export const companyFullProfileTool = {
  name: "company_full_profile" as const,
  description:
    "Récupère le profil complet d'une entreprise FR par SIREN. Essaie Pappers d'abord (riche : bilans, dirigeants, bénéficiaires effectifs) si la clé API est configurée, sinon fallback gratuit sur BODACC public (annonces uniquement). Indique la source dans la réponse.",
  inputSchema: {
    type: "object" as const,
    properties: {
      siren: {
        type: "string",
        description: "Numéro SIREN à 9 chiffres",
        pattern: "^[0-9]{9}$",
      },
    },
    required: ["siren"],
  },
  async handler(args: { siren: string }) {
    const pappersData = await tryPappers(args.siren);
    if (pappersData) {
      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({ source: "pappers", data: pappersData }, null, 2),
        }],
      };
    }

    const bodaccClient = new BodaccClient();
    const annonces = await bodaccClient.searchBySiren(args.siren);
    if (annonces.length === 0) {
      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            source: "none",
            message: "Aucune source disponible — Pappers non configuré et BODACC sans résultats (ou en erreur).",
            siren: args.siren,
          }, null, 2),
        }],
      };
    }
    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          source: "bodacc-public",
          message: "Pappers non configuré — données via BODACC public uniquement (annonces, sans bilans ni dirigeants enrichis).",
          siren: args.siren,
          annonces,
        }, null, 2),
      }],
    };
  },
};
```

- [ ] **Step 4: Run tests, verify they pass**

Run:
```bash
cd packages/core && npx vitest run test/company-full-profile.test.ts
```
Expected: 3 PASS

- [ ] **Step 5: Commit**

```bash
git add packages/core/src/tools/company-full-profile.ts packages/core/test/company-full-profile.test.ts
git commit -m "feat(core): company_full_profile composite — Pappers + BODACC fallback"
```

---

### Task 0.6: Cross-plugin test scaffold

**Files:**
- Create: `packages/core/test/hacienda-droit-affaires.test.ts`

- [ ] **Step 1: Write scaffold test that asserts each tool is exported and exposes correct schema**

File: `packages/core/test/hacienda-droit-affaires.test.ts`
```typescript
import { describe, it, expect } from "vitest";

describe("Hacienda Droit des Affaires — cross-plugin checks", () => {
  it("expose bodacc_by_siren depuis core", async () => {
    const { bodaccBySirenTool } = await import("../src/tools/bodacc-by-siren.js");
    expect(bodaccBySirenTool.name).toBe("bodacc_by_siren");
  });

  it("expose bodacc_procedures depuis core", async () => {
    const { bodaccProceduresTool } = await import("../src/tools/bodacc-procedures.js");
    expect(bodaccProceduresTool.name).toBe("bodacc_procedures");
  });

  it("expose company_full_profile depuis core", async () => {
    const { companyFullProfileTool } = await import("../src/tools/company-full-profile.js");
    expect(companyFullProfileTool.name).toBe("company_full_profile");
  });

  it("loadPappersCredentials est exporté", async () => {
    const { loadPappersCredentials } = await import("../src/config.js");
    expect(typeof loadPappersCredentials).toBe("function");
  });

  it("le client Légifrance existe (pour verifier-citations)", async () => {
    // Adapter le chemin selon ce qui existe en core
    const mod = await import("../src/sources/piste-legifrance.js").catch(() => null);
    expect(mod).not.toBeNull();
  });

  it("le client Judilibre existe (pour verifier-citations jurisp)", async () => {
    const mod = await import("../src/sources/judilibre.js").catch(() => null);
    expect(mod).not.toBeNull();
  });
});
```

- [ ] **Step 2: Run tests**

Run:
```bash
cd packages/core && npx vitest run test/hacienda-droit-affaires.test.ts
```
Expected: First 4 PASS. Last 2 may need adaptation of path based on actual core layout — adjuster les chemins selon `ls packages/core/src/sources/`.

- [ ] **Step 3: Adjust paths if needed and re-run**

Run:
```bash
ls packages/core/src/sources/
```
Update the test paths for piste-legifrance and judilibre if filenames differ.

- [ ] **Step 4: Run full core test suite to verify no regression**

Run:
```bash
cd packages/core && npx vitest run
```
Expected: all PASS (existing tests + new ones)

- [ ] **Step 5: Run typecheck and build**

Run:
```bash
cd packages/core && npx tsc --noEmit
cd ../.. && npm run build
```
Expected: no errors

- [ ] **Step 6: Commit**

```bash
git add packages/core/test/hacienda-droit-affaires.test.ts
git commit -m "test(core): cross-plugin assertions for droit-affaires dependencies"
```

---

## Wave 1 — CLAUDE.md template + entretien-demarrage

### Task 1.1: Copy PI CLAUDE.md structure as starting point

**Files:**
- Create: `plugins/hacienda-droit-affaires/CLAUDE.md`

- [ ] **Step 1: Copy PI CLAUDE.md as starting skeleton**

Run:
```bash
cp plugins/hacienda-propriete-intellectuelle/CLAUDE.md plugins/hacienda-droit-affaires/CLAUDE.md
```

- [ ] **Step 2: Replace plugin name and titles throughout**

Use editor or sed (verify before applying):
```bash
sed -i.bak 's/Propriété intellectuelle/Droit des affaires/g; s/propriete-intellectuelle/droit-affaires/g; s/PI/droit affaires/g' plugins/hacienda-droit-affaires/CLAUDE.md
rm plugins/hacienda-droit-affaires/CLAUDE.md.bak
```
**Manual verification**: read the file, ensure "PI" was not replaced where it shouldn't (e.g. "PII" remains "PII", not "Pdroit affairesI"). If sed produced unwanted replacements, restore from PI and do manual replacements.

- [ ] **Step 3: Commit baseline before adaptation**

```bash
git add plugins/hacienda-droit-affaires/CLAUDE.md
git commit -m "docs(droit-affaires): CLAUDE.md initial copy from PI v0.16 baseline"
```

---

### Task 1.2: Adapter Section 1 — Profil cabinet d'affaires

**Files:**
- Modify: `plugins/hacienda-droit-affaires/CLAUDE.md` (Section 1)

- [ ] **Step 1: Replace PI-specific profile fields with droit-affaires fields**

In Section 1, replace the entire `## 1. Profil cabinet et profil de pratique PI` block with droit-affaires-specific fields. Keep the format of PI (labels `[A CONFIGURER — ...]`, mêmes patterns de tableaux). Champs à inclure :

```markdown
## 1. Profil cabinet et profil de pratique droit des affaires

**Cabinet / entité :** [A CONFIGURER — raison sociale complète]
**Cadre d'exercice :** [A CONFIGURER — cabinet d'avocats / direction juridique in-house / notaire / juriste solo]
**Side principal :** [A CONFIGURER — M&A et corporate / procédures collectives / contrats commerciaux / mixte]
**Juridictions habituelles :** [A CONFIGURER — Paris / province / transfrontalier UE]
**Taille équipe :** [A CONFIGURER — 1 / 2-10 / 11-50 / 50+]

**Rôle de l'utilisateur courant :** [A CONFIGURER — Avocat inscrit barreau français | Notaire | Juriste in-house | Non-juriste avec accès avocat]
**Avocat référent (si non-avocat) :** [A CONFIGURER]

### Bloc M&A / Corporate
**Side habituel :** [A CONFIGURER — cédant / acquéreur / conseil des deux]
**Taille de deals typique :** [A CONFIGURER — < 5M€ / 5-50M€ / > 50M€]
**Secteurs cibles :** [A CONFIGURER]
**Posture DD :** [A CONFIGURER — thèmes prioritaires / seuil de matérialité]
**Posture GAP :** [A CONFIGURER — durée / plafond / franchise / panier]

### Bloc procédures collectives
**Position dominante :** [A CONFIGURER — créancier / débiteur / mandataire / mixte]
**Tribunaux habituels :** [A CONFIGURER — TC Paris / TC province]
**Cadence dossiers actifs :** [A CONFIGURER]

### Bloc contrats commerciaux
**Posture par défaut :** [A CONFIGURER — protecteur / équilibré / facilitateur]
**Clauses "jamais acceptées" :** [A CONFIGURER]
**Position clause pénale (1231-5 C.civ) :** [A CONFIGURER]
**Position limitation responsabilité :** [A CONFIGURER]
**Position droit applicable + juridiction :** [A CONFIGURER]
**Position non-concurrence (avec contrepartie obligatoire) :** [A CONFIGURER]

### Matrice d'approbateurs
| Type d'acte | Approbateur | Déclencheur d'escalade |
|---|---|---|
| Revue contrat standard | [A CONFIGURER] | clause 🔴 détectée |
| Mise en demeure | [A CONFIGURER] | absence de réponse 30j |
| Signature SPA | [A CONFIGURER — avocat + GC + sponsor business] | — |
| Déclaration de créance > 100k€ | [A CONFIGURER] | contestation reçue |

### Politique PII / confidentialité
**politique_pii :** [A CONFIGURER — passive / active / strict — défaut: active]
**Seuil B (alerte ferme) :** 50 identifiants OU 1+ catégorie sensible
**Catégories sensibles activées :** [A CONFIGURER — IBAN, NIR, ID, santé, montants > 10k€, mots-clés "confidentiel/secret affaires"]
```

- [ ] **Step 2: Commit**

```bash
git add plugins/hacienda-droit-affaires/CLAUDE.md
git commit -m "docs(droit-affaires): CLAUDE.md §1 — profil cabinet droit des affaires"
```

---

### Task 1.3: Adapter Section 2 — Sorties standardisées (en-têtes par rôle)

**Files:**
- Modify: `plugins/hacienda-droit-affaires/CLAUDE.md` (Section 2)

- [ ] **Step 1: Adapter les en-têtes confidentialité au droit des affaires**

Garder la structure PI mais adapter les rôles : remplacer le rôle "mandataire en marques INPI" par "notaire", ajouter ligne pour "juriste in-house non avocat". Les en-têtes finaux :

```
- Avocat inscrit à un barreau français : `CONFIDENTIEL — DOCUMENT DE TRAVAIL — Secret professionnel art. 66-5 loi n°71-1130 du 31 décembre 1971`
- Notaire (officier public) : `CONFIDENTIEL — TRAVAIL NOTARIAL — Devoir de discrétion art. 23 loi 25 ventôse an XI`
- Juriste in-house (non avocat) : `NOTES DE TRAVAIL INTERNES — NE CONSTITUE PAS UN AVIS JURIDIQUE — Faire valider par un avocat avant tout acte`
- Non-juriste avec accès avocat : `NOTES DE TRAVAIL — Faire valider par [avocat référent configuré] avant tout usage externe`
```

Conserver la note "Portée FR du secret professionnel" telle que dans PI (l'arrêt Michaud reste pertinent).

- [ ] **Step 2: Adapter la note du relecteur — sources spécifiques droit affaires**

Dans le bloc note du relecteur, remplacer les exemples PI (INPI Data, EUIPO TMview) par exemples droit affaires :
```
> - **Sources :** [bases consultées : Légifrance ✓ / Pappers ✓ / BODACC public ✓ / Judilibre ✓ — ou marquer ✗ si non connectée]
```

- [ ] **Step 3: Garder mode silencieux + arbre de décision 5 options + question hors checklist + offre dashboard HTML**

Ces sections sont génériques, garder tel quel mais adapter les exemples au droit affaires (livrables = mise en demeure / déclaration de créance / note GAP / liste de points / etc. au lieu de mise en demeure PI).

- [ ] **Step 4: Commit**

```bash
git add plugins/hacienda-droit-affaires/CLAUDE.md
git commit -m "docs(droit-affaires): CLAUDE.md §2 — sorties standardisées droit affaires"
```

---

### Task 1.4: Adapter Sections 3-11 (garde-fous, juridictions, sources prioritaires, workspaces)

**Files:**
- Modify: `plugins/hacienda-droit-affaires/CLAUDE.md` (Sections 3 à 11)

- [ ] **Step 1: Adapter §3 (posture jugements subjectifs)**

Garder structure PI. Adapter l'échelle : `🟢 Faible / 🟡 Moyen / 🟠 Élevé / 🔴 Bloquant` (canonique, identique à PI). Exemples de seuils subjectifs adaptés au droit affaires : clause borderline déséquilibre L.442-1, qualification d'une obligation essentielle (1170 C.civ), recevabilité d'une déclaration de créance hors délai (relevé de forclusion).

- [ ] **Step 2: Adapter §4 (garde-fous transversaux)**

Le vocabulaire de tags canoniques devient :
- `[Légifrance]` / `[Pappers]` / `[BODACC]` / `[Judilibre]` / `[Eurlex]` / `[BOFiP]` / `[BOSS]`
- `[utilisateur fourni]` / `[recherche web — à vérifier]` / `[connaissance modèle — à vérifier]` / `[stable — vérifié le YYYY-MM-DD]` / `[verify]` / `[review]`

Trigger fraîcheur : Cour de cassation ch. com., AMF Décisions, réformes droit affaires (ordonnances M&A, loi PACTE, etc.).

- [ ] **Step 3: Adapter §5 (juridictions)**

Cadre FR + UE par défaut. Référentiels UE : Rome I (loi applicable), Bruxelles I bis (compétence). Tests à ne pas appliquer aux mauvaises juridictions : test de déséquilibre L.442-1 français vs unfair terms UK / unconscionability US.

- [ ] **Step 4: Garder §6 et §7 identiques à PI** (contenu récupéré = données, échafaudage pas œillères — universels)

- [ ] **Step 5: Adapter §8 (questions ad-hoc)**

Adapter la phrase d'amorce : "Quand l'utilisateur pose une question dans la matière du plugin — droit des sociétés, droit commercial, M&A, procédures collectives — lire le profil et y répondre comme un confrère."

Chemin du profil :
```
~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/CLAUDE.md
```

- [ ] **Step 6: Garder §9 (proportionnalité) en adaptant les exemples**

Exemples d'arbitrages :
- "Peut-on signer ce NDA standard ?" → 3 phrases + caveat
- "Faut-il négocier cette clause pénale ?" → fix proposé + une FAQ
- "Faut-il assigner pour rupture brutale L.442-1 ?" → analyse business + juridique complète

- [ ] **Step 7: Adapter §10 (sources prioritaires)**

Table droit affaires :
```
| Sujet | Source primaire |
|---|---|
| Code civil, Code de commerce | Légifrance |
| Jurisprudence ch. com. Cour de cass. | Judilibre |
| Identification entreprise enrichie | Pappers (si configuré) |
| Identification entreprise basique | BODACC OpenDataSoft + Annuaire DINUM |
| Procédures collectives | BODACC (familleavis = procedures-collectives) |
| Doctrine fiscale (DD M&A) | BOFiP |
| Droit social (clauses non-conc salariées) | BOSS |
| Droit UE (Rome I, Bruxelles I bis) | Eurlex |
| AMF (cibles cotées — anticipation v2) | AMF Décisions (web, pas dans core v1) |
```

- [ ] **Step 8: Adapter §11 (workspaces de dossier)**

Garder structure PI. Indiquer "Activé : ✗ — disponible en V1.1". Chemin matters :
```
~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/matters/<slug-dossier>/
```

- [ ] **Step 9: Sanity check — lire le CLAUDE.md complet**

Run:
```bash
wc -l plugins/hacienda-droit-affaires/CLAUDE.md
```
Expected: ~500-700 lignes (cible 600).

- [ ] **Step 10: Commit**

```bash
git add plugins/hacienda-droit-affaires/CLAUDE.md
git commit -m "docs(droit-affaires): CLAUDE.md §§3-11 — garde-fous, juridictions, sources, workspaces"
```

---

### Task 1.5: Skill entretien-demarrage

**Files:**
- Create: `plugins/hacienda-droit-affaires/skills/entretien-demarrage/SKILL.md`

- [ ] **Step 1: Créer le skeleton du SKILL.md avec frontmatter**

File: `plugins/hacienda-droit-affaires/skills/entretien-demarrage/SKILL.md`
```markdown
---
name: entretien-demarrage
description: >
  Onboarding du plugin droit des affaires : configure le profil cabinet (side
  principal M&A / procédures collectives / mixte), vérifie les connexions aux
  sources externes (Légifrance, Pappers, BODACC, Judilibre), réutilise un
  profil cabinet partagé s'il existe à ~/.config/Hacienda/profil-cabinet.md.
  Mode --check-integrations pour relancer uniquement le diagnostic.
version: "1.0.0"
authors: ["Hacienda"]
tags: [onboarding, profil-cabinet, integrations, credentials]
---

# Skill — Entretien de démarrage

> **Configuration initiale du plugin droit des affaires.**
>
> Lance ce skill au premier usage (15-20 min). Peuple `CLAUDE.md`, propose
> de configurer les sources externes, vérifie l'état des credentials.
> Relançable avec `--redo` pour recommencer ou `--check-integrations` pour
> ne refaire que le diagnostic connexions.

## Examples

<example>
<user>/hacienda-droit-affaires:entretien-demarrage</user>
<response>
1. Détecte si ~/.config/Hacienda/profil-cabinet.md existe → propose
   réutiliser/enrichir/recommencer
2. Pose les questions du profil cabinet (15 min) → écrit profil partagé
3. Pose les questions spécifiques droit-affaires (5 min) → écrit dans
   CLAUDE.md du plugin
4. Diagnostic des connexions externes (loadConfig → credentialsSource)
5. Propose configuration des clés manquantes
</response>
</example>

<example>
<user>/hacienda-droit-affaires:entretien-demarrage --check-integrations</user>
<response>
Diagnostic uniquement, pas de relance des questions profil. Affiche le
tableau des sources avec ✓ / ? / ✗ et instructions de configuration.
</response>
</example>

<example>
<user>/hacienda-droit-affaires:entretien-demarrage --redo</user>
<response>
Recommence depuis zéro. Demande confirmation avant d'écraser le profil
existant.
</response>
</example>

## Chargement du profil

> Au démarrage : vérifier l'existence du profil partagé
> `~/.config/Hacienda/profil-cabinet.md`. Si présent et non vide, lire
> les sections existantes et proposer 3 options : réutiliser /
> enrichir / recommencer.

## Intake

1. **Mode** — `--redo` (recommencer) | `--check-integrations` (diagnostic seul) | par défaut: complet
2. **Détection profil partagé** — recherche `~/.config/Hacienda/profil-cabinet.md`
3. **Si présent** — afficher résumé (cabinet, side principal, juridiction) et proposer [r]éutiliser / [e]nrichir / [n]ouveau
4. **Si absent** — démarrer le questionnaire complet

## Étape 1 — Profil cabinet partagé

Questions à poser séquentiellement (une par message, attendre réponse) :

1. Cabinet / entité (raison sociale complète)
2. Cadre d'exercice (cabinet avocats solo / petit / moyen-grand / direction juridique / notaire)
3. Side principal (M&A & corporate / procédures collectives / contrats commerciaux / mixte)
4. Juridictions habituelles (Paris / province / transfrontalier UE)
5. Taille équipe (1 / 2-10 / 11-50 / 50+)
6. Rôle de l'utilisateur (avocat inscrit / notaire / juriste in-house / non-juriste avec accès avocat)
7. Si non-juriste : avocat référent

**Écriture** : à la fin, écrire/mettre à jour `~/.config/Hacienda/profil-cabinet.md` avec ces réponses.

## Étape 2 — Profil spécifique droit-affaires

Selon le "Side principal" sélectionné en Étape 1, poser uniquement les questions des blocs concernés :

**Si M&A & corporate ou mixte** :
- Side habituel deals (cédant / acquéreur / conseil des deux)
- Taille typique deals (< 5M€ / 5-50M€ / > 50M€)
- Secteurs cibles
- Posture DD (thèmes prioritaires)
- Posture GAP (durée / plafond / franchise / panier)

**Si procédures collectives ou mixte** :
- Position dominante (créancier / débiteur / mandataire / mixte)
- Tribunaux habituels
- Cadence dossiers actifs

**Si contrats commerciaux ou mixte** :
- Posture par défaut (protecteur / équilibré / facilitateur)
- Clauses "jamais acceptées"
- Positions clés (clause pénale, limitation responsabilité, droit applicable, non-concurrence)

**Matrice d'approbateurs** : 4 questions (revue contrat standard / mise en demeure / signature SPA / déclaration créance > 100k€)

**Politique PII** : 1 question (passive / active / strict — défaut active)

**Écriture** : à la fin, mettre à jour `plugins/hacienda-droit-affaires/CLAUDE.md` (les valeurs `[A CONFIGURER]`) ou plutôt le fichier de config utilisateur `~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/CLAUDE.md` (Claude charge ce dernier en priorité).

## Étape 3 — Diagnostic des connexions externes

Appeler `loadConfig()`, `loadPappersCredentials()`, `loadInpiCredentials()` etc. Afficher le tableau suivant :

```
Vérification des connexions :

[✓] BODACC public          — opérationnel (sans configuration)
[✓] Annuaire DINUM         — opérationnel (sans configuration)
[?] Pappers                — PAPPERS_API_KEY absente
    → Ajouter dans ~/.config/Hacienda/credentials.json
    → Sans clé : fallback BODACC public (données moins enrichies)
[?] Légifrance (PISTE)     — clés OAuth absentes
    → Ajouter PISTE_CLIENT_ID + PISTE_CLIENT_SECRET
    → Sans clé : verifier-citations tourne en mode dégradé
       (toutes citations taguées [à vérifier])
[✓] Judilibre              — opérationnel (sans configuration)

Mode dégradé actif : Pappers + PISTE non configurés.
```

Si l'utilisateur veut configurer maintenant, le guider vers :
```bash
mkdir -p ~/.config/Hacienda
cat > ~/.config/Hacienda/credentials.json <<EOF
{
  "PISTE_CLIENT_ID": "...",
  "PISTE_CLIENT_SECRET": "...",
  "PAPPERS_API_KEY": "..."
}
EOF
chmod 600 ~/.config/Hacienda/credentials.json
```

Avec instructions pour obtenir les clés :
- PISTE : https://piste.gouv.fr/ (créer une appli, gratuit)
- Pappers : https://www.pappers.fr/api (payant)

## Sortie — Format livrable

```
✓ Profil cabinet enregistré : ~/.config/Hacienda/profil-cabinet.md
✓ Configuration droit-affaires : ~/.claude/plugins/config/.../CLAUDE.md
✓ Diagnostic connexions : [état] mode [opérationnel/dégradé]

Prochaines étapes recommandées :
- /hacienda-droit-affaires:reviser-contrat <fichier>  (pour tester)
- /hacienda-droit-affaires:declaration-creance <fichier>
- /hacienda-droit-affaires:entretien-demarrage --check-integrations
  (à relancer si vous configurez des clés API plus tard)
```
```

- [ ] **Step 2: Manual smoke test**

Run (depuis une nouvelle session Claude avec le plugin chargé) :
```
/hacienda-droit-affaires:entretien-demarrage
```
Expected : le skill répond par la séquence Étape 1 → Étape 2 → Étape 3, et écrit les fichiers attendus.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-droit-affaires/skills/entretien-demarrage/
git commit -m "feat(droit-affaires): skill entretien-demarrage + cold-start partagé"
```

---

## Wave 2 — Skills transversaux (check-pii + verifier-citations)

### Task 2.1: Skill check-pii (pré-flight + CTA ghost)

**Files:**
- Create: `plugins/hacienda-droit-affaires/skills/check-pii/SKILL.md`

- [x] **Step 1: Créer SKILL.md avec frontmatter et structure**

File: `plugins/hacienda-droit-affaires/skills/check-pii/SKILL.md`
```markdown
---
name: check-pii
description: >
  Détection PII pré-flight pour tout skill traitant un document utilisateur.
  Compte les identifiants (catégorie A) et alerte au seuil B sur les catégories
  sensibles (IBAN, NIR, ID, santé, montants > 10k€). Propose l'installation de
  hacienda-ghost si non installé. Politique configurable au cold-start :
  passive / active (défaut, = B+A) / strict.
version: "1.0.0"
authors: ["Hacienda"]
tags: [pii, confidentialite, pre-flight, conversion-ghost]
---

# Skill — Détection PII pré-flight

> **DÉTECTION EMBARQUÉE LÉGÈRE.**
>
> Ce skill ne remplace pas l'anonymisation. Il rend visible la PII détectée
> et propose `hacienda-ghost` pour l'anonymisation réelle. Sans ghost, les
> données sont envoyées en clair à Claude. Le skill avertit selon la
> politique configurée.

## Examples

<example>
<user>(appelé automatiquement par reviser-contrat sur un SPA contenant 47 noms, 3 SIREN, 8 montants > 100k€)</user>
<response>
⚠ Ce document contient des données très sensibles.
- 47 identifiants détectés (noms, SIREN, adresses)
- 8 montants nominatifs > 10k€ → catégorie sensible B atteinte

Sans hacienda-ghost, ces données seront envoyées en clair à Claude.

[continuer une fois] [ne plus demander pour ce dossier] [installer hacienda-ghost ↗]
</response>
</example>

<example>
<user>(appelé sur un NDA standard avec 12 identifiants, aucune catégorie sensible)</user>
<response>
(Aucun prompt, traitement continue. En fin de sortie skill appelant :)

---
*Ce skill a traité 12 mentions identifiantes. Pour anonymiser automatiquement
avant envoi à Claude, installer `hacienda-ghost`.*
</response>
</example>

## Chargement du profil

> Lire la section "Politique PII / confidentialité" du CLAUDE.md :
> - `politique_pii` : passive | active | strict
> - `seuil_b` : nombre d'identifiants déclenchant l'alerte (défaut 50)
> - `categories_sensibles_actives` : liste

## Intake

1. **document** — chemin ou contenu du document à scanner
2. **politique** (optionnel) — override depuis le skill appelant (défaut: profil cabinet)

## Étape 1 — Détection Catégorie A (compteur global)

Regex/heuristiques appliquées en parallèle sur le contenu texte du document :

| Catégorie A | Pattern |
|---|---|
| Noms propres | `\b[A-ZÀ-Ý][a-zà-ÿ]+(?:\s+[A-ZÀ-Ý][a-zà-ÿ]+)+\b` + filtre par dictionnaire prénoms FR |
| SIREN | `\b[0-9]{9}\b` + validation Luhn |
| SIRET | `\b[0-9]{14}\b` + validation Luhn étendue |
| Email | regex RFC 5322 simplifiée |
| Téléphone FR | `\b0[1-9](?:[ .-]?[0-9]{2}){4}\b` ou format +33 |
| Adresse | combinaison numéro voie + nom voie + CP (5 chiffres) + ville |

Retourner : `{ total: N, parCategorie: { ... } }`

## Étape 2 — Détection Catégorie B (sensible)

| Catégorie B | Pattern + validation |
|---|---|
| Montant nominatif > 10k€ | `\b[0-9]{1,3}(?:[ .]?[0-9]{3})+(?:[,.][0-9]{2})?\s*(€|EUR)\b` + parse > 10000 |
| IBAN | `\b[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}\b` + validation modulo 97 |
| NIR (sécu sociale) | `\b[12][0-9]{14}\b` + clé Luhn-like |
| Numéro CNI / passeport | patterns FR |
| Données santé | lexique trigger (pathologie / médicament / handicap / etc.) |
| Mots-clés "confidentiel" | "confidentiel", "secret affaires", "non-divulgable", etc. |

Retourner : `{ total: N, parCategorie: { ... }, contenuB: bool }`

## Étape 3 — Décision selon politique

```
si politique == "strict" :
  toujours prompt B avant exécution (même sans catégorie sensible)

si politique == "active" (défaut) :
  si total_A > seuil_b OU contenuB == true :
    → prompt B avant exécution avec choix
  sinon :
    → footer A à la fin de la sortie du skill appelant

si politique == "passive" :
  toujours footer A, jamais de prompt bloquant
```

## Étape 4 — Format prompt B

```
⚠ Ce document contient des données très sensibles.
- {total_A} identifiants détectés ({détail catégorie A})
- {détail catégorie B} → catégorie sensible B atteinte

Sans hacienda-ghost, ces données seront envoyées en clair à Claude.

[continuer une fois] [ne plus demander pour ce dossier] [installer hacienda-ghost ↗]
```

CTA installer ghost = lien vers la marketplace du plugin.

## Étape 5 — Format footer A

```
---
*Ce skill a traité {total_A} mentions identifiantes. Pour anonymiser
automatiquement avant envoi à Claude, installer
[hacienda-ghost](marketplace://hacienda-ghost).*
```

## Sortie — Format livrable

Le skill renvoie une structure que le skill appelant exploite :
```json
{
  "totalA": 47,
  "categoriesA": {"noms": 12, "siren": 3, "adresses": 24, "tel": 8},
  "contenuB": true,
  "categoriesB": {"montants_nominatifs": 8},
  "politique": "active",
  "action": "prompt_b",
  "messagePrompt": "⚠ Ce document...",
  "footer": null
}
```

ou en mode passive sous seuil :
```json
{
  "totalA": 12,
  "contenuB": false,
  "action": "footer_only",
  "footer": "---\n*Ce skill a traité 12...*"
}
```

Le skill appelant insère `messagePrompt` avant exécution, ou append `footer` après sortie.
```

- [x] **Step 2: Manual test**

Run sur 5 docs synthétiques avec catégories sensibles connues. Vérifier détection ≥ 90% par catégorie. Documenter les faux positifs/négatifs dans CHANGELOG (à corriger en v1.1 si nécessaire).

- [x] **Step 3: Commit**

```bash
git add plugins/hacienda-droit-affaires/skills/check-pii/
git commit -m "feat(droit-affaires): skill check-pii (pré-flight + CTA ghost)"
```

---

### Task 2.2: Skill verifier-citations (post-flight Légifrance)

**Files:**
- Create: `plugins/hacienda-droit-affaires/skills/verifier-citations/SKILL.md`

- [x] **Step 1: Créer SKILL.md**

File: `plugins/hacienda-droit-affaires/skills/verifier-citations/SKILL.md`
```markdown
---
name: verifier-citations
description: >
  Post-flight de validation juridique. Pour chaque article cité dans une
  sortie skill (art. NNN C.civ, L.NNN-N C.com., etc.), interroge Légifrance
  via packages/core pour vérifier existence + version en vigueur +
  non-abrogation. Annote la sortie. Mode dégradé si PISTE non configuré.
version: "1.0.0"
authors: ["Hacienda"]
tags: [validation, legifrance, post-flight, citations]
---

# Skill — Vérification des citations juridiques

> **POST-FLIGHT AUTOMATIQUE.**
>
> Ce skill est invoqué automatiquement par tous les skills produisant
> du texte juridique. Vérifie que chaque article cité existe et n'est
> pas abrogé. Mode dégradé documenté si PISTE absent.

## Examples

<example>
<user>(appelé automatiquement par reviser-contrat après production de la sortie)</user>
<response>
Analyse la sortie, extrait 12 citations :
- art. 1171 C.civ → [Légifrance ✓] en vigueur
- L.442-1 C.com. → [Légifrance ✓] en vigueur
- art. 1100 C.civ (ancien) → [abrogé 🔴 — remplacé par art. 1101 réforme 2016]
- Cass. com. 10 juil. 2002 n° 00-12.345 → [Judilibre ✓] existe

Remonté en note du relecteur : "1 citation abrogée détectée — voir l'article
1100 ancien remplacé par 1101 réforme 2016".
</response>
</example>

<example>
<user>(appelé sur une sortie contenant 8 citations, PISTE non configuré)</user>
<response>
Sans PISTE : toutes citations taguées [à vérifier] (mode dégradé).
Note du relecteur : "verifier-citations non exécuté — clés PISTE absentes,
8 citations à valider manuellement contre Légifrance".
</response>
</example>

## Chargement du profil

> Vérifier `loadConfig().credentialsSource` :
> - `"env"` ou `"file"` → mode opérationnel
> - `"none"` → mode dégradé

## Intake

1. **sortie** — texte de la sortie produit par le skill appelant
2. **type_citations** (optionnel) — `articles` (défaut) | `jurisprudence` | `both`

## Étape 1 — Extraction des citations

Regex à appliquer sur le texte :

| Type | Pattern |
|---|---|
| Article C.civ | `\bart(?:icle)?\.?\s*(\d+(?:-\d+)?)\s*(?:du\s+)?C\.?civ(?:il)?` |
| Article C.com. | `\bart(?:icle)?\.?\s*L\.?(\d+-\d+(?:-\d+)?)\s*(?:du\s+)?C\.?com(?:merce)?` |
| Article CPI | `\bart(?:icle)?\.?\s*L\.?(\d+-\d+(?:-\d+)?)\s*(?:du\s+)?CPI` |
| Article RGPD | `\bart(?:icle)?\.?\s*(\d+(?:-\d+)?)\s*(?:du\s+)?RGPD` |
| Loi numérotée | `loi\s+n[°o]\s*(\d+-\d+)\s+du\s+(\d+\s+\w+\s+\d+)` |
| Arrêt Cour cass. | `Cass\.\s+(com|civ|soc|crim|com|ass)\.?\s+(\d+\s+\w+\s+\d{4})(?:\s+n[°o]\s*(\d+-\d+\.\d+))?` |
| Arrêt CJUE | `CJUE\s+(\d+\s+\w+\s+\d{4})(?:\s+aff\.\s+(C-\d+/\d+))?` |

Retourner liste : `[{ type, refRaw, refNorm, position }]`

## Étape 2 — Lookup Légifrance (mode opérationnel)

Pour chaque article extrait :
```typescript
import { legifranceCheckArticle } from "@hacienda/core";

const result = await legifranceCheckArticle({
  code: "CODE_CIVIL" | "CODE_COMMERCE" | etc.,
  numero: "1171",
});
// → { existe: bool, version_en_vigueur: bool, abroge: bool, dateMaj: string }
```

## Étape 3 — Lookup Judilibre (jurisprudence)

Pour chaque arrêt Cour cass / CJUE / TPI :
```typescript
import { judilibreSearch } from "@hacienda/core";

const result = await judilibreSearch({ query: refRaw });
// → { trouve: bool, decision?: {...} }
```

## Étape 4 — Annotation de la sortie

Pour chaque citation, ajouter le tag approprié dans la sortie :
- `[Légifrance ✓]` — article existe, en vigueur
- `[à vérifier]` — non récupérable (mode dégradé ou erreur)
- `[abrogé 🔴]` — article abrogé → remonté en note relecteur en bloquant
- `[obsolète 🟠]` — version antérieure citée alors qu'une plus récente existe
- `[Judilibre ✓]` — arrêt existe
- `[Judilibre — non trouvé ⚠]` — arrêt cité non trouvé dans la base

## Étape 5 — Note relecteur

Si abrogations détectées, remonter dans la note du relecteur :
```
- **Sources :** Légifrance ✓ / Judilibre ✓
- **Citations vérifiées :** 12 sur 12
- **🔴 ALERTE : 1 article abrogé** — art. 1100 C.civ ancien (réforme 2016).
  À remplacer par art. 1101 dans la sortie.
```

## Mode dégradé (PISTE absent)

Si `loadConfig().credentialsSource === "none"` :
- Ne pas appeler legifrance/judilibre
- Taguer toutes les citations `[à vérifier]`
- Note relecteur explicite :
  ```
  - **verifier-citations :** non exécuté (clés PISTE absentes)
  - **Action :** vérifier manuellement les {N} citations contre Légifrance
  - **Pour activer :** configurer PISTE_CLIENT_ID dans
    ~/.config/Hacienda/credentials.json puis lancer
    /hacienda-droit-affaires:entretien-demarrage --check-integrations
  ```

## Sortie — Format livrable

Retourne au skill appelant :
```json
{
  "sortieAnnotee": "...texte avec tags inline...",
  "citationsVerifiees": 12,
  "alertes": [
    { "type": "abroge", "ref": "art. 1100 C.civ", "remplacement": "art. 1101" }
  ],
  "modeDegrade": false,
  "noteRelecteur": "- **Sources :** Légifrance ✓..."
}
```
```

- [x] **Step 2: Manual test on 20 citations**

Préparer dataset de 20 citations (10 valides en vigueur, 10 abrogées ou fausses). Lancer le skill et vérifier détection ≥ 95%.

- [x] **Step 3: Commit**

```bash
git add plugins/hacienda-droit-affaires/skills/verifier-citations/
git commit -m "feat(droit-affaires): skill verifier-citations (post-flight Légifrance + Judilibre)"
```

---

## Wave 3 — References (4 fichiers)

### Task 3.1: clauses-sensibles-fr.md (15 clauses pilotes)

**Files:**
- Create: `plugins/hacienda-droit-affaires/references/clauses-sensibles-fr.md`

- [x] **Step 1: Créer le fichier avec structure standardisée pour les 15 clauses**

Structure par clause (15 clauses × ~25 lignes = ~400 lignes total) :
```markdown
## N. <Nom clause>

**Article fondateur :** [art. xxx du Code xxx]
**Jurisprudence clé :** [Cass. com. date n°] (le cas échéant)
**Posture playbook par défaut :** [protecteur / équilibré / facilitateur]

**Libellé typique à détecter :**
> [exemple de formulation à repérer dans un contrat]

**Risque juridique :**
[1-2 phrases sur le risque concret]

**Position playbook recommandée :**
[3-5 lignes : comment réagir selon posture du cabinet]

**Formulations alternatives :**
- **Protecteur :** [formulation type]
- **Équilibré :** [formulation type]
- **Facilitateur :** [formulation type]

**Articles à vérifier dans la sortie :** [liste pour verifier-citations]

---
```

Les 15 clauses pilotes à documenter (selon spec §References v1) :
1. Clause pénale (art. 1231-5 C.civ + jurisp révision judiciaire)
2. Non-concurrence salariée (jurisp soc. Cour cass. 10 juil. 2002 — contrepartie financière obligatoire)
3. Exclusivité (L.420-1 C.com. — risque entente)
4. Durée + tacite reconduction (L.215-1 C.conso si applicable, 1212 C.civ)
5. Résolution / résiliation post-réforme 2016 (art. 1224 et s. C.civ)
6. Force majeure post-réforme (art. 1218 C.civ)
7. Déséquilibre significatif B2B (L.442-1 C.com.)
8. Clauses abusives (art. 1171 C.civ contrats d'adhésion)
9. Limitation de responsabilité (art. 1170 si vide obligation essentielle)
10. Droit applicable + juridiction (Rome I, Bruxelles I bis)
11. Confidentialité (L.151-1 secret affaires)
12. Propriété résultats (renvoyer vers PI:contrats-pi si PI-centric)
13. Audit (clauses standard, durée droit d'audit)
14. Sous-traitance (loi 1975, validation maître d'ouvrage)
15. Changement de contrôle (clauses typiques M&A)

- [x] **Step 2: Sanity check — lire le fichier**

Run:
```bash
wc -l plugins/hacienda-droit-affaires/references/clauses-sensibles-fr.md
```
Expected: ~350-450 lignes

- [x] **Step 3: Commit**

```bash
git add plugins/hacienda-droit-affaires/references/clauses-sensibles-fr.md
git commit -m "docs(droit-affaires): references clauses-sensibles-fr 15 clauses pilotes"
```

---

### Task 3.2: sources-fr.md (catalogue avec colonne "intégré core")

**Files:**
- Create: `plugins/hacienda-droit-affaires/references/sources-fr.md`

- [x] **Step 1: Créer le catalogue structuré**

```markdown
# Sources officielles droit des affaires français

## Légende
- ✓ **Intégré core** — accessible via outils MCP `@hacienda/core`
- 🔌 **Companion** — disponible si un autre plugin Hacienda est installé
- 🌐 **Web** — accessible par recherche web, à taguer `[recherche web — à vérifier]`
- 🧠 **Modèle** — connaissance modèle uniquement, à taguer `[connaissance modèle — à vérifier]`

## Sources accessibles

| Source | Statut | Outil core | Usage |
|---|---|---|---|
| Légifrance (PISTE) | ✓ | `legifranceCheckArticle`, `legifranceGetArticle` | Articles C.civ, C.com., CPI, codes consolidés |
| JORF (lois, décrets, ordonnances) | ✓ | Via Légifrance | Textes promulgués |
| Judilibre (Cour de cassation Open Data) | ✓ | `judilibreSearch` | Arrêts ch. com., ch. soc., ch. civ. |
| Pappers | ✓ | `pappersCompanyProfile` (si key) | Identification entreprise enrichie : bilans, dirigeants, BO |
| BODACC OpenDataSoft | ✓ | `bodaccBySiren`, `bodaccProcedures` | Annonces publiques (immatriculations, modifications, procédures) |
| Annuaire DINUM (recherche-entreprises.api.gouv.fr) | ✓ | Via composite `companyFullProfile` | Lookup par nom (sans auth) |
| Eurlex (droit UE) | ✓ | Modules eurlex core | Rome I, Bruxelles I bis, règlements UE |
| BOFiP (doctrine fiscale) | ✓ | `bofipQuery` | Pertinent DD M&A |
| BOSS (Bulletin officiel sécurité sociale) | ✓ | `bossQuery` | Pertinent clauses non-conc salariées |
| AMF Décisions | 🌐 | — | Cibles cotées (anticipation v2) |
| CJUE | 🌐 | — | Arrêts UE non couverts par Eurlex |
| INPI Data marques/brevets | 🔌 hacienda-propriete-intellectuelle | — | Renvoyer vers PI plugin |

## Configuration credentials

Tous les secrets dans `~/.config/Hacienda/credentials.json` :
- `PISTE_CLIENT_ID` + `PISTE_CLIENT_SECRET` — Légifrance (gratuit après inscription piste.gouv.fr)
- `PAPPERS_API_KEY` — Pappers (payant)

Sans clé : mode dégradé documenté dans chaque skill concerné.
```

- [x] **Step 2: Commit**

```bash
git add plugins/hacienda-droit-affaires/references/sources-fr.md
git commit -m "docs(droit-affaires): references sources-fr — catalogue avec statut core"
```

---

### Task 3.3: taxonomie-contrats-fr.md (avec colonne "skill recommandé")

**Files:**
- Create: `plugins/hacienda-droit-affaires/references/taxonomie-contrats-fr.md`

- [x] **Step 1: Créer la taxonomie**

```markdown
# Taxonomie des contrats — droit français

## Légende skill recommandé
- 🟢 **droit-affaires:reviser-contrat** — workflow contrat commercial standard
- 🟠 **PI:contrats-pi** — workflow contrat PI (renvoi vers plugin PI)
- 🔵 **droit-affaires:gap-review** — workflow GAP M&A
- 🟣 **droit-affaires:declaration-creance** — procédure collective

## Contrats commerciaux standards

| Type | Caractéristiques | Skill |
|---|---|---|
| CGV / CGA | Conditions générales vente/achat — L.441-1 C.com. | 🟢 reviser-contrat |
| Distribution exclusive | Exclusivité territoriale ou produit — L.420-1 risque entente | 🟢 reviser-contrat |
| Distribution sélective | Réseau qualitatif — règlement UE 330/2010 | 🟢 reviser-contrat |
| Franchise | DIP obligatoire L.330-3 C.com. + savoir-faire | 🟢 reviser-contrat (volet commercial) + 🟠 PI:contrats-pi (volet marque) |
| Prestation de services | 1101+ C.civ — obligation de moyens/résultat | 🟢 reviser-contrat |
| Mandat / agence commerciale | Statut protecteur L.134-1+ C.com. | 🟢 reviser-contrat |
| Bail commercial | Loi 1953 codifiée — L.145-1+ C.com. | 🟢 reviser-contrat |

## Contrats M&A et corporate

| Type | Caractéristiques | Skill |
|---|---|---|
| LOI / Term sheet | Engagement précontractuel — bonne foi 1104 C.civ | v1.1 |
| SPA (protocole de cession) | Cession actions/parts — L.228-23 C.com. | 🟢 reviser-contrat |
| Pacte d'associés | Clauses préemption, agrément, drag/tag along | v1.1 |
| GAP (garantie d'actif et passif) | Spécificité FR — pas d'équivalent R&W US | 🔵 gap-review |
| Closing checklist | Documentation finale signature | v1.1 |

## Contrats PI (renvoyer vers plugin PI)

| Type | Skill |
|---|---|
| Licence de brevet, marque, D&M | 🟠 PI:contrats-pi |
| Cession de droits PI | 🟠 PI:contrats-pi |
| Accord de coexistence marques | 🟠 PI:contrats-pi |
| NDA partenariat R&D | 🟠 PI:contrats-pi |
| Contrat R&D collaborative | 🟠 PI:contrats-pi |
| Transfert de technologie | 🟠 PI:contrats-pi |

## NDA / Confidentialité

| Type | Caractéristiques | Skill |
|---|---|---|
| NDA commercial pur | Pas de composante PI majeure | 🟢 reviser-nda |
| NDA partenariat R&D | Avec composante PI/savoir-faire | 🟠 PI:contrats-pi |

## Procédures collectives

| Type | Caractéristiques | Skill |
|---|---|---|
| Déclaration de créance | L.622-24 C.com. — délai 2 mois | 🟣 declaration-creance |
| Contestation de créance | Requête juge-commissaire | v1.2 |
| Requête en relevé de forclusion | L.622-26 C.com. | v1.2 |
| Plan de continuation/cession | Suivi mandataire | v2 |
```

- [x] **Step 2: Commit**

```bash
git add plugins/hacienda-droit-affaires/references/taxonomie-contrats-fr.md
git commit -m "docs(droit-affaires): taxonomie-contrats-fr avec routing skill"
```

---

### Task 3.4: articles-c-civ-c-com-index.md (avec ID Légifrance)

**Files:**
- Create: `plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md`

- [x] **Step 1: Créer l'index**

```markdown
# Index articles C.civ + C.com. — droit des affaires

> Articles fréquemment cités par les skills droit-affaires. ID Légifrance
> (LEGIARTI...) à compléter lors de la première lecture via PISTE.

## Code civil — réforme du droit des contrats 2016

| Article | Libellé court | LEGIARTI |
|---|---|---|
| 1100-1 | Définition contrat | LEGIARTI000032041419 |
| 1101 | Définition contrat (post-réforme) | [à compléter] |
| 1104 | Bonne foi | LEGIARTI000032040999 |
| 1112-1 | Devoir précontractuel d'information | LEGIARTI000032040904 |
| 1124 | Promesse unilatérale | [à compléter] |
| 1158 | Action interrogatoire | [à compléter] |
| 1170 | Clause supprimant l'obligation essentielle | LEGIARTI000032040956 |
| 1171 | Clauses abusives contrats d'adhésion | LEGIARTI000032041039 |
| 1190 | Interprétation favorable à celui qui s'engage | [à compléter] |
| 1217 | Sanctions inexécution | LEGIARTI000032041419 |
| 1218 | Force majeure | LEGIARTI000032041472 |
| 1219 | Exception inexécution | [à compléter] |
| 1224 | Résolution | [à compléter] |
| 1226 | Résolution unilatérale par notification | [à compléter] |
| 1231-5 | Clause pénale + révision judiciaire | LEGIARTI000032041594 |
| 1240 | Responsabilité civile délictuelle (ancien 1382) | LEGIARTI000032041553 |

## Code de commerce

| Article | Libellé court | LEGIARTI |
|---|---|---|
| L.134-1 | Statut agent commercial | [à compléter] |
| L.145-1 | Champ bail commercial | [à compléter] |
| L.210-1 | Définition société commerciale | [à compléter] |
| L.215-1 | Tacite reconduction (renvoi C.conso) | [à compléter] |
| L.227-1+ | SAS — règles spécifiques | [à compléter] |
| L.228-23 | Cession actions société non cotée | [à compléter] |
| L.233-7 | Franchissements seuils (anticipation v2 cotées) | [à compléter] |
| L.330-3 | Document d'information précontractuelle (DIP franchise) | [à compléter] |
| L.420-1 | Entente / pratiques anticoncurrentielles | [à compléter] |
| L.420-2 | Abus de position dominante | [à compléter] |
| L.441-1 | Conditions générales de vente | [à compléter] |
| L.441-10 | Délais de paiement | [à compléter] |
| L.442-1 | Déséquilibre significatif B2B | [à compléter] |
| L.442-2 | Rupture brutale relations commerciales établies | [à compléter] |
| L.611-1 | Prévention difficultés entreprises | [à compléter] |
| L.620-1 | Définition procédure de sauvegarde | [à compléter] |
| L.622-24 | Déclaration de créance — délai 2 mois | [à compléter] |
| L.622-26 | Relevé de forclusion | [à compléter] |
| L.631-1 | Redressement judiciaire | [à compléter] |
| L.640-1 | Liquidation judiciaire | [à compléter] |

## Autres références fréquentes

| Référence | Texte | Usage |
|---|---|---|
| Art. 66-5 loi 71-1130 | Secret professionnel avocat | Toutes sorties skills (en-tête confidentialité) |
| Art. 23 loi 25 ventôse an XI | Devoir de discrétion notaire | En-tête confidentialité notaire |
| Loi 2018-670 | Secret des affaires (transposition directive UE 2016/943) | Clauses confidentialité B2B |
| Loi 75-1334 | Sous-traitance — agrément + garantie de paiement | Skill v2 sous-traitance |
| Règlement UE 593/2008 (Rome I) | Loi applicable obligations contractuelles | Cross-border contrats |
| Règlement UE 1215/2012 (Bruxelles I bis) | Compétence juridictionnelle | Cross-border litiges |

## Jurisprudence clés (Judilibre)

| Décision | Apport | Skill concerné |
|---|---|---|
| Cass. soc. 10 juil. 2002 n° 00-45.135 | Non-conc salariée — contrepartie financière obligatoire | reviser-contrat, reviser-nda |
| Cass. com. 22 oct. 1996 n° 93-18.632 (Chronopost) | Obligation essentielle / clause limitative | reviser-contrat |
| Cass. com. arrêts récents L.442-1 | Déséquilibre significatif B2B | reviser-contrat |
| CJUE Sabel, Canon, Lloyd | Risque de confusion marques (renvoyer vers PI) | — |
```

- [x] **Step 2: Commit**

```bash
git add plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md
git commit -m "docs(droit-affaires): articles-c-civ-c-com-index avec IDs Légifrance"
```

---

## Wave 4 — Skills contrats (4 skills)

### Task 4.1: Skill reviser-contrat (le plus volumineux)

**Files:**
- Create: `plugins/hacienda-droit-affaires/skills/reviser-contrat/SKILL.md`

- [ ] **Step 1: Créer le skeleton avec frontmatter + disclaimer + 4 examples**

File: `plugins/hacienda-droit-affaires/skills/reviser-contrat/SKILL.md`
```markdown
---
name: reviser-contrat
description: >
  Revue d'un contrat commercial entrant contre le playbook du cabinet : CGV,
  distribution, franchise, prestation de services, bail commercial, SPA, NDA
  commercial. Analyse clause par clause, génère liste de points (issues list)
  avec criticité 🟢/🟡/🟠/🔴, identifie risques juridiques avec articles
  applicables et jurisprudence Judilibre. Renvoie vers PI:contrats-pi si le
  contrat est PI-centric. Brouillon soumis à validation avocat.
version: "1.0.0"
authors: ["Hacienda"]
tags: [contrats, revue, playbook, ma, distribution, prestation, bail, spa]
---

# Skill — Revue de contrat commercial

> **BROUILLON DE REVUE, PAS AVIS JURIDIQUE.**
>
> Analyse documentaire du contrat contre le playbook configuré. Identifie
> les clauses sensibles, propose des reformulations, signale les risques.
> Toute sortie doit être validée par un avocat avant transmission ou
> signature.
>
> **Si le contrat est PI-centric** (licence brevet, accord coexistence
> marques, NDA partenariat R&D, transfert technologie) : renvoyer vers
> `/hacienda-propriete-intellectuelle:contrats-pi`.

## Examples

<example>
<user>/hacienda-droit-affaires:reviser-contrat ./SPA-cession-X.pdf --review</user>
<response>
1. Pré-flight check-pii (47 identifiants → seuil B → prompt user)
2. Identification (SPA, parties, droit français applicable)
3. Lecture playbook (posture équilibré, GAP plafond 20% prix)
4. Si SIREN détecté : company_full_profile (Pappers ou fallback BODACC)
5. Analyse clause par clause vs clauses-sensibles-fr.md
6. Génération liste de points (tableau criticité décroissante)
7. Post-flight verifier-citations (12 articles vérifiés, 0 alerte)
8. Sortie : en-tête confidentialité + note relecteur + résumé exécutif +
   liste de points + recommandation + arbre de décision 5 options
</response>
</example>

<example>
<user>/hacienda-droit-affaires:reviser-contrat ./contrat-licence-brevet.pdf</user>
<response>
Détection contrat PI-centric (licence brevet) → renvoi :
"Ce contrat porte principalement sur une licence de brevet. Le skill
le mieux adapté est /hacienda-propriete-intellectuelle:contrats-pi
qui couvre les spécificités PI (revendications licenciées, TTBER,
inscription RNB pour opposabilité). Souhaites-tu (a) lancer
contrats-pi à la place, (b) continuer avec reviser-contrat sur les
seules clauses commerciales du contrat (paiement, durée, juridiction),
(c) faire les deux en séquence ?"
</response>
</example>

<example>
<user>/hacienda-droit-affaires:reviser-contrat ./CGV-fournisseur.pdf --review</user>
<response>
Identification CGV B2B → vérifications spécifiques :
- L.441-1 (transparence prix, conditions de règlement)
- L.442-1 (déséquilibre significatif)
- 1171 C.civ (clauses abusives — si contrat d'adhésion)
- 1170 C.civ (clause limitant l'obligation essentielle)
- Délais de paiement L.441-10
Sortie complète avec issues list.
</response>
</example>

<example>
<user>/hacienda-droit-affaires:reviser-contrat ./bail-commercial.pdf</user>
<response>
Identification bail commercial L.145-1+ → vérifications spécifiques :
- Durée minimale 9 ans, droit au renouvellement
- Indexation loyer (ILC obligatoire, pas IRL)
- Charges récupérables (décret 2014-1317)
- Clause résolutoire (commandement 1 mois)
Sortie adaptée bail commercial.
</response>
</example>

## Chargement du profil

> Lire depuis CLAUDE.md :
> - **Posture par défaut** (protecteur / équilibré / facilitateur)
> - **Clauses "jamais acceptées"**
> - **Positions clés** (clause pénale, limitation responsabilité, droit
>   applicable, non-concurrence)
> - **Matrice d'approbateurs** (selon type de contrat)
> - **Politique PII** (pour check-pii)

## Intake

1. **Mode** — `--review` (analyser un contrat existant — par défaut)
2. **Fichier contrat** — chemin du PDF/DOCX/MD
3. **Side** (optionnel) — `--side=fournisseur` | `--side=client` (auto-détecté si non précisé)
4. **Posture override** (optionnel) — `--posture=protecteur` (force une posture pour cette revue)

## Étape 1 — Pré-flight et identification

1. Lancer `check-pii` sur le document → décider continue/prompt/abort
2. Lire le profil cabinet (CLAUDE.md)
3. Détecter le type de contrat (voir taxonomie-contrats-fr.md)
4. **Si PI-centric détecté** → renvoyer vers `PI:contrats-pi` (option a/b/c)
5. Identifier parties et droit applicable

## Étape 2 — Détection SIREN et enrichissement entreprise

Si SIREN détecté dans le document (regex `\b[0-9]{9}\b` + Luhn) :
```typescript
import { companyFullProfile } from "@hacienda/core";
const profile = await companyFullProfile(siren);
```
Tag dans la sortie : `[Pappers]` ou `[BODACC public]` selon la source utilisée.

Cas particulier : si procédure collective en cours détectée via BODACC → alerte 🟠
dans la sortie ("La contrepartie est en {sauvegarde|redressement|liquidation}
depuis {date}. Vérifier la qualité du signataire.").

## Étape 3 — Analyse clause par clause

Pour chaque clause sensible identifiée (voir `references/clauses-sensibles-fr.md`) :

| # | Champs |
|---|---|
| Citation | Numéro de clause + libellé court (5-15 mots) |
| Comparaison playbook | Conforme / écart léger / écart majeur |
| Statut | 🟢 OK / 🟡 À discuter / 🟠 À négocier / 🔴 Bloquant |
| Article applicable | art. xxx + [tag provenance] |
| Risque | 1-2 phrases concrètes |
| Position souhaitée | Selon posture playbook |
| Formulation proposée | Texte de remplacement |

Tags inline `[review]` sur les jugements subjectifs (clauses borderline).

## Étape 4 — Liste de points (issues list)

Génération du tableau via appel interne au skill `liste-de-points` :
```
| # | Clause | Statut | Risque | Position souhaitée | Formulation proposée |
```
Trié par criticité décroissante (🔴 → 🟢).

## Étape 5 — Post-flight verifier-citations

Appel automatique du skill `verifier-citations` sur la sortie complète.
Si alertes (article abrogé) → remontées dans la note du relecteur en 🔴.

## Étape 6 — Sortie

### Format livrable

```
[⚠️ Note du relecteur]
- **Sources :** Légifrance ✓ / Judilibre ✓ / Pappers ✓ / BODACC ✓
- **Lecture :** intégrale ({N} pages)
- **Signalé :** {N} clauses [review]
- **Fraîcheur :** recherche jurisp post-2024 — {N} arrêts intégrés
- **Avant de t'appuyer :** {action concrète}

[En-tête confidentialité selon rôle utilisateur]

# Résumé exécutif (3 phrases pour DG/DAF)

# Liste de points
| # | Clause | Statut | Risque | Position | Reformulation |

# Recommandation
{Signer / Négocier / Refuser} — {justification 2-3 lignes}

# Une question hors de ma checklist habituelle
{observation transversale OU omettre si rien d'honnête à dire}

# Que veux-tu faire ? Choisis une option :
1. **Rédiger** — je produis un projet de courrier de négociation à la contrepartie
2. **Escalader** — note d'escalade vers {approbateur configuré}
3. **Compléter les faits** — questions à poser pour avancer
4. **Surveiller** — ajouter au tracker dossier
5. **Autre** — précise

[Footer A si check-pii passive sous seuil, sinon rien]
```
```

- [ ] **Step 2: Manual test sur 5 contrats de référence**

Tester sur 5 contrats anonymisés (1 SPA, 1 NDA, 1 distribution, 1 prestation, 1 bail commercial). Vérifier :
- Structure 100% (note relecteur + en-tête + arbre décision présents)
- Renvoi PI:contrats-pi fonctionne si contrat licence brevet
- Détection SIREN + enrichissement fonctionne
- Validation manuelle frère sur le fond juridique (cible 80%+ alignement)

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-droit-affaires/skills/reviser-contrat/
git commit -m "feat(droit-affaires): skill reviser-contrat — workflow profond avec routing PI"
```

---

### Task 4.2: Skill reviser-nda (triage VERT/ORANGE/ROUGE)

**Files:**
- Create: `plugins/hacienda-droit-affaires/skills/reviser-nda/SKILL.md`

- [ ] **Step 1: Créer SKILL.md**

File: `plugins/hacienda-droit-affaires/skills/reviser-nda/SKILL.md`
```markdown
---
name: reviser-nda
description: >
  Triage rapide d'un NDA / accord de confidentialité commercial : VERT (OK
  signer), ORANGE (négocier 1-2 points), ROUGE (refuser ou renégocier
  largement). Couvre champ confidentialité, exceptions standard, durée,
  juridiction, et clause de non-concurrence salariée (si présente : vérifie
  contrepartie financière obligatoire selon jurisp soc. 10 juil. 2002). Renvoie
  vers PI:contrats-pi si NDA partenariat R&D PI-centric.
version: "1.0.0"
authors: ["Hacienda"]
tags: [nda, confidentialite, triage, non-concurrence]
---

# Skill — Revue rapide NDA / accord de confidentialité

> **TRIAGE RAPIDE, PAS REVUE COMPLÈTE.**
>
> Pour une revue exhaustive d'un contrat complexe, utiliser
> `/hacienda-droit-affaires:reviser-contrat`. Ce skill est calibré pour
> traiter un NDA standard en 2-3 min.
>
> **Si NDA partenariat R&D ou contenu PI substantiel** → renvoyer vers
> `/hacienda-propriete-intellectuelle:contrats-pi`.

## Examples

<example>
<user>/hacienda-droit-affaires:reviser-nda ./NDA-standard.pdf</user>
<response>
Pré-flight check-pii → continue.
Identification NDA commercial (unilatéral, droit FR).
Analyse 8 points clés :
- Définition info confidentielles ✓
- Exceptions standard (domaine public, dev indépendant, obligation légale) ✓
- Durée 3 ans ⚠️ (limite haute usuelle 3-5 ans, OK)
- Juridiction TC Paris ✓
- Pas de clause non-concurrence ✓
Verdict : 🟢 VERT — signer en l'état.
</response>
</example>

<example>
<user>/hacienda-droit-affaires:reviser-nda ./NDA-fournisseur.pdf</user>
<response>
Verdict : 🟠 ORANGE — négocier 2 points :
1. Durée 10 ans → ramener à 5 ans (au-delà = restriction excessive,
   jurisp tendance limitation)
2. Clause non-concurrence post-mission 2 ans sans contrepartie financière
   → Si salarié = NULLE (jurisp Cour cass. soc. 10 juil. 2002).
   Demander contrepartie minimum 25% rémunération sur durée.
</response>
</example>

<example>
<user>/hacienda-droit-affaires:reviser-nda ./NDA-R&D-tech.pdf</user>
<response>
Détection NDA R&D avec composante PI substantielle (mention "savoir-faire,
brevets, résultats de recherche").
→ Renvoyer vers /hacienda-propriete-intellectuelle:contrats-pi
qui couvre les spécificités PI (clauses attribution PI co-développée,
TTBER règlement UE 316/2014, secret affaires L.151-1).
</response>
</example>

## Chargement du profil

> Lire depuis CLAUDE.md :
> - Posture par défaut
> - Clauses "jamais acceptées"
> - Position non-concurrence
> - Politique PII

## Intake

1. **Fichier NDA** — chemin du document
2. **Side** (optionnel) — émetteur / récepteur (auto-détecté si possible)

## Étape 1 — Pré-flight + détection routing

1. check-pii sur le document
2. Détecter si NDA R&D / PI substantiel → renvoyer vers PI:contrats-pi
3. Identifier unilatéral/bilatéral et droit applicable

## Étape 2 — Analyse 8 points clés

| # | Point | Conforme = | À surveiller = | Bloquant = |
|---|---|---|---|---|
| 1 | Définition info confidentielles | Précise (catégories listées) | Trop large (toute info) | Définition manquante |
| 2 | Exceptions standard | 5 exceptions classiques | 3-4 sur 5 | Aucune (info publique inclue) |
| 3 | Durée | 2-5 ans | 5-10 ans | > 10 ans ou indéterminée |
| 4 | Sort de l'info en fin de contrat | Destruction/restitution | Mention vague | Aucune |
| 5 | Juridiction | TC/CCom Paris ou neutre | Étranger pour partie FR | Juridiction abusive |
| 6 | Loi applicable | FR ou UE | Common law neutre | Pays sans état de droit fiable |
| 7 | Clause pénale | Montant raisonnable + révision possible 1231-5 | Montant disproportionné | Astreinte journalière abusive |
| 8 | Non-concurrence (si présente, salarié) | Avec contrepartie ≥ 25% rémunération | Contrepartie symbolique | **Sans contrepartie = NULLE** (jurisp 10 juil. 2002) |

## Étape 3 — Verdict

```
🟢 VERT  — Signer en l'état (8/8 conformes)
🟠 ORANGE — Négocier 1-2 points avant signature
🔴 ROUGE — Refus ou renégociation large nécessaire
```

## Étape 4 — Post-flight verifier-citations

Si articles cités → invoquer verifier-citations.

## Sortie — Format livrable

```
[Note du relecteur condensée]
[En-tête confidentialité]

# Verdict : 🟢 / 🟠 / 🔴

# Tableau 8 points
| # | Point | État | Commentaire |

# Recommandations
[liste numérotée des points à négocier OU "rien à négocier, signer"]

# Que veux-tu faire ?
1. Rédiger un mail de négociation
2. Escalader vers {approbateur}
3. Signer en l'état
4. Demander précisions à la contrepartie
5. Autre
```
```

- [ ] **Step 2: Manual test sur 3 NDA (1 VERT, 1 ORANGE, 1 ROUGE)**

Préparer 3 NDA test avec issues attendues. Vérifier triage correct sur 3/3.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-droit-affaires/skills/reviser-nda/
git commit -m "feat(droit-affaires): skill reviser-nda — triage VERT/ORANGE/ROUGE 8 points"
```

---

### Task 4.3: Skill liste-de-points (issues list composable)

**Files:**
- Create: `plugins/hacienda-droit-affaires/skills/liste-de-points/SKILL.md`

- [ ] **Step 1: Créer SKILL.md**

File: `plugins/hacienda-droit-affaires/skills/liste-de-points/SKILL.md`
```markdown
---
name: liste-de-points
description: >
  Génère une issues list (liste de points à négocier) à partir d'une analyse
  de contrat. Appelable directement OU comme composant interne par
  reviser-contrat / gap-review. Format tableau standardisé criticité
  décroissante 🔴 → 🟢, avec position souhaitée et formulation alternative
  pour chaque point.
version: "1.0.0"
authors: ["Hacienda"]
tags: [issues-list, negotiation, composable]
---

# Skill — Liste de points (issues list)

> **COMPOSANT RÉUTILISABLE.**
>
> Appelable seul sur un contrat déjà analysé, OU invoqué automatiquement
> par reviser-contrat et gap-review pour générer leur section "Liste de
> points".

## Examples

<example>
<user>/hacienda-droit-affaires:liste-de-points ./analyse-contrat.md</user>
<response>
Lit l'analyse existante, extrait les findings, génère le tableau formaté.
</response>
</example>

<example>
<user>(appelé en interne par reviser-contrat avec une liste de findings en input)</user>
<response>
Reçoit findings structurés, génère le tableau formaté avec position
souhaitée et formulation alternative pour chaque ligne.
</response>
</example>

## Chargement du profil

> Lire posture par défaut + positions clés pour calibrer les
> "positions souhaitées" et les "formulations proposées".

## Intake

1. **Mode** — `--from-analysis ./fichier.md` (lit une analyse) OU appel programmatique avec findings
2. **Posture override** (optionnel) — force une posture spécifique
3. **Filter** (optionnel) — `--min-criticite=orange` pour ne montrer que 🟠 et 🔴

## Étape 1 — Lire ou recevoir les findings

Si `--from-analysis` : parser le markdown pour extraire les findings (sections "Clause", "Statut", "Risque").

Si appel programmatique : recevoir un array `[{ clause, statut, risque, article, ... }]`.

## Étape 2 — Calibrer position et formulation selon posture

Pour chaque finding, ajouter :
- Position souhaitée selon posture playbook
- Formulation proposée alignée sur la position

## Étape 3 — Format tableau

```
| # | Clause | Statut | Risque | Position souhaitée | Formulation proposée |
|---|--------|--------|--------|---------------------|----------------------|
| 1 | art. X — durée 10 ans | 🟠 | restriction excessive | ramener à 5 ans | "La présente convention est conclue pour 5 ans à compter de..." |
| 2 | art. Y — clause pénale 100k€ | 🟡 | disproportionnée | indexer ou plafonner | "...sans pouvoir excéder 30% du montant du contrat..." |
```

Trié par criticité décroissante 🔴 → 🟠 → 🟡 → 🟢.

## Sortie — Format livrable

Markdown — uniquement le tableau (réutilisable en composant). Si appelé seul, ajouter en-tête et note du relecteur.
```

- [ ] **Step 2: Manual test composable**

Tester (a) appelé seul sur une analyse markdown, (b) intégré dans reviser-contrat.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-droit-affaires/skills/liste-de-points/
git commit -m "feat(droit-affaires): skill liste-de-points (composable)"
```

---

### Task 4.4: Skill revue-tabulaire (brique atomique multi-docs)

**Files:**
- Create: `plugins/hacienda-droit-affaires/skills/revue-tabulaire/SKILL.md`

- [ ] **Step 1: Créer SKILL.md**

File: `plugins/hacienda-droit-affaires/skills/revue-tabulaire/SKILL.md`
```markdown
---
name: revue-tabulaire
description: >
  Extraction structurée de N documents en parallèle vers un tableau, colonnes
  paramétrables. Brique atomique : remplace la revue manuelle "10 NDA à
  passer en revue". Réutilisée comme building block par
  due-diligence-dataroom (v1.1). Exemple : extraire durée + non-conc + loi
  + juridiction sur 12 NDA d'un coup.
version: "1.0.0"
authors: ["Hacienda"]
tags: [extraction, multi-docs, tableau, brique-atomique]
---

# Skill — Revue tabulaire multi-documents

> **EXTRACTION STRUCTURÉE PARALLÈLE.**
>
> Brique atomique : prend N documents + une liste de colonnes, retourne
> un tableau. Pas d'analyse juridique en profondeur (utiliser
> reviser-contrat pour ça). Idéal pour comparer un portefeuille de
> contrats sur quelques critères clés.

## Examples

<example>
<user>/hacienda-droit-affaires:revue-tabulaire ./contrats/*.pdf --columns=duree,non-conc,loi,juridiction,resiliation</user>
<response>
Extraction des 5 colonnes sur les 12 contrats trouvés.
Tableau de sortie + dashboard HTML automatique (10+ lignes).
</response>
</example>

<example>
<user>/hacienda-droit-affaires:revue-tabulaire ./NDA-portefeuille/*.pdf --columns=parties,duree,exceptions,jurid</user>
<response>
Tableau 4 colonnes × N lignes. Lignes avec extraction incomplète marquées
⚠️ pour révision manuelle.
</response>
</example>

## Chargement du profil

> Politique PII (check-pii agrégé sur l'ensemble des documents)

## Intake

1. **Pattern documents** — glob ou liste de fichiers
2. **Colonnes** — `--columns=col1,col2,col3` (alias ou définitions custom)
3. **Format sortie** — `--format=markdown` (défaut) | `--format=html` | `--format=both`
4. **Limit** (optionnel) — `--limit=20` (sécurité, évite traitement de 200 docs accidentellement)

## Étape 1 — Pré-flight check-pii agrégé

Lancer check-pii sur l'ensemble (somme des identifiants détectés). Si seuil B atteint sur l'agrégat → prompt utilisateur.

## Étape 2 — Alias colonnes droit affaires

| Alias | Extrait |
|---|---|
| `duree` | Durée du contrat / durée engagement |
| `non-conc` | Clause non-concurrence (oui/non + caractéristiques) |
| `loi` | Droit applicable |
| `juridiction` | Tribunal/arbitrage désigné |
| `resiliation` | Conditions de résiliation |
| `exclusivite` | Exclusivité oui/non + portée |
| `parties` | Identité des parties |
| `objet` | Objet principal du contrat |
| `prix` | Montant ou mode de calcul |
| `clause-penale` | Présence + montant |
| `confidentialite` | Durée + portée |
| `force-majeure` | Présence + définition |

Colonnes custom : `--columns=duree,custom:"présence d'une clause d'audit"`

## Étape 3 — Extraction parallèle

Pour chaque document :
1. Lire le contenu
2. Pour chaque colonne, extraire l'information (LLM-driven extraction guidée par le libellé colonne)
3. Si extraction incertaine, marquer `⚠️ à vérifier`
4. Si information absente, marquer `—`

## Étape 4 — Format tableau

```
| Document | Colonne 1 | Colonne 2 | ... |
|----------|-----------|-----------|-----|
| NDA-A.pdf | 3 ans | Oui, 2 ans, FR | ... |
| NDA-B.pdf | 5 ans | Non | ... |
| NDA-C.pdf | ⚠️ à vérifier | Oui, sans durée | ... |
```

## Étape 5 — Dashboard HTML (si > 10 lignes)

Appel `renderDashboard()` de `@hacienda/core` pour générer un HTML autonome
(filtrable, sortable, XSS-safe) à côté du markdown.

## Sortie — Format livrable

Markdown tableau + (si >10 lignes ou `--format=html`) fichier `revue-tabulaire-{timestamp}.html` à côté du markdown.

Note du relecteur :
```
- **Documents traités :** {N} sur {M} (échecs lecture : {liste})
- **Lignes incomplètes :** {N} marquées ⚠️
- **Avant de t'appuyer :** vérifier les lignes ⚠️ + croiser avec reviser-contrat sur les contrats critiques
```
```

- [ ] **Step 2: Manual test lot de 10 NDA**

Tester sur 10 NDA anonymisés. Critère succès : extraction correcte ≥ 9/10 lignes.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-droit-affaires/skills/revue-tabulaire/
git commit -m "feat(droit-affaires): skill revue-tabulaire brique atomique multi-docs"
```

---

## Wave 5 — Skills M&A et Procédures (2 skills)

### Task 5.1: Skill gap-review (Garantie d'Actif et de Passif)

**Files:**
- Create: `plugins/hacienda-droit-affaires/skills/gap-review/SKILL.md`

- [ ] **Step 1: Créer SKILL.md complet (~600 lignes cibles)**

File: `plugins/hacienda-droit-affaires/skills/gap-review/SKILL.md`
```markdown
---
name: gap-review
description: >
  Revue de Garantie d'Actif et de Passif (GAP) — spécificité française
  sans équivalent direct R&W US. Couvre 5 axes : (1) périmètre garantie,
  (2) mécanique financière (plafond, franchise, panier, durée), (3) procédure
  de mise en œuvre, (4) clauses sensibles (knowledge qualifier, best
  knowledge, garantie de la garantie), (5) confrontation findings DD.
  Brouillon validation avocat M&A obligatoire.
version: "1.0.0"
authors: ["Hacienda"]
tags: [gap, ma, garantie-actif-passif, cession]
---

# Skill — Revue Garantie d'Actif et de Passif (GAP)

> **BROUILLON, VALIDATION AVOCAT M&A OBLIGATOIRE.**
>
> Spécificité droit français (pas d'équivalent direct R&W US).
> Travail très technique, side-dependent (cédant vs acquéreur),
> très sensible aux usages de marché.

## Examples

<example>
<user>/hacienda-droit-affaires:gap-review ./GAP-cession-Y.pdf --side=acquereur --prix=15000000</user>
<response>
1. Pré-flight check-pii (typique : montants > 100k€ → seuil B)
2. Lecture profil bloc M&A (posture acquéreur, plafond cible 20-25%)
3. Analyse 5 axes (périmètre / mécanique / procédure / clauses sensibles / DD)
4. Findings 🟢/🟡/🟠/🔴 par sous-point
5. Sortie : résumé exécutif + analyse par axe + liste de points consolidée +
   recommandation Accepter/Négocier/Refuser
Exemple finding : plafond 12% prix → 🟠 (sous la fourchette acquéreur 20-25%) →
recommandation négocier hausse vers 20% ou exiger compléments (garantie
spécifique fiscale-sociale).
</response>
</example>

<example>
<user>/hacienda-droit-affaires:gap-review ./GAP-projet.pdf --side=cedant --prix=8000000</user>
<response>
Posture inverse côté cédant : plafond cible 10-15%, refuser knowledge
qualifier, accepter best knowledge si bien défini. Findings calibrés
en miroir.
</response>
</example>

<example>
<user>/hacienda-droit-affaires:gap-review ./GAP.pdf --side=acquereur --dd-findings=./rapport-dd.md --prix=20000000</user>
<response>
Axe 5 activé : confrontation findings DD ↔ garanties.
Tableau gap analysis : pour chaque finding matériel, garantie applicable +
couverture (Oui/Partielle/Non) + recommandation (clause ad hoc / réduction
de prix / abandon point).
Exemple : finding "litige fiscal pendant 450k€" → garantie fiscale standard
couvre, mais plafond commun GAP à 1M€ insuffisant si autre passif révélé →
recommander plafond fiscal séparé minimum 500k€.
</response>
</example>

<example>
<user>/hacienda-droit-affaires:gap-review ./GAP-FR-UK-deal.pdf --side=acquereur</user>
<response>
Détection clauses common law importées (waiver, indemnification,
representations & warranties) → recommandations de traduction en concepts FR
(GAP française, déclarations et garanties au sens du droit FR, renonciation
explicite vs implicite). Note relecteur : "Doc bilingue détecté — ce skill
applique le cadre FR, la version UK doit être confrontée séparément."
</response>
</example>

## Chargement du profil

> Lire depuis CLAUDE.md bloc M&A :
> - Side habituel (cédant / acquéreur)
> - Posture GAP par défaut (durée / plafond / franchise / panier)
> - Approbateur signature SPA

## Intake

1. **Fichier GAP** — chemin du document
2. **Side** — `--side=cedant` | `--side=acquereur` (obligatoire)
3. **Findings DD** (optionnel) — `--dd-findings=./rapport-dd.md` à confronter
4. **Prix cession** (optionnel) — pour calculer ratios plafond/prix

## Étape 1 — Pré-flight et lecture

1. check-pii (probabilité élevée seuil B atteint — montants nominatifs)
2. Lecture profil bloc M&A
3. Identification side + prix cession + date référence
4. Si --dd-findings fourni : indexer les findings

## Étape 2 — Axe 1 : Périmètre de la garantie

Vérifier :
- Actifs garantis (vs périmètre de cession) — cohérence
- Exclusions et réserves déclarées
- Date de référence (closing ou signing ?)
- Date de réalisation (effet de la garantie)

Findings 🟢/🟡/🟠/🔴 par sous-point.

## Étape 3 — Axe 2 : Mécanique financière

Vérifier :
- Plafond global (% du prix) → comparer aux usages marché (15-25% standard)
- Plafonds par garantie (fiscale/sociale élevés, environnement spécifique)
- Franchise / seuil de déclenchement (panier)
- Franchise absolue vs franchise déduite (impact économique majeur)
- Durée par garantie (fiscale/sociale prescription allongée 3 ans min)

Tableau récap avec écarts à l'usage marché.

## Étape 4 — Axe 3 : Procédure de mise en œuvre

- Notification (formalisme, délai)
- Délai de contestation
- Mode de règlement (compensation séquestre / paiement direct)
- Juridiction (TC Paris standard / arbitrage CMAP-CCI)

## Étape 5 — Axe 4 : Clauses sensibles

| Clause | Côté acquéreur | Côté cédant |
|---|---|---|
| Knowledge qualifier (connaissance du cessionnaire) | ✗ Refuser | ✓ Demander |
| Best knowledge (meilleure connaissance cédant) | ✗ Refuser ou définir | ✓ Demander |
| Plafond / prix ratio | Cible 20-25% | Cible 10-15% |
| Garantie de la garantie (caution/séquestre) | ✓ Exiger | ✗ Refuser |

## Étape 6 — Axe 5 : Confrontation findings DD (si fourni)

Pour chaque finding matériel de la DD :
- Identifier la garantie applicable
- Gap analysis : finding couvert ? clause ad hoc nécessaire ? réduction de prix ?

Tableau :
```
| Finding DD | Sévérité | Garantie applicable | Couvert ? | Recommandation |
```

## Étape 7 — Post-flight verifier-citations

## Sortie — Format livrable

```
[Note du relecteur]
[En-tête confidentialité]

# Résumé exécutif (3 phrases pour comité d'investissement / direction)

# Analyse par axe
## Axe 1 — Périmètre
## Axe 2 — Mécanique financière
## Axe 3 — Procédure
## Axe 4 — Clauses sensibles
## Axe 5 — Confrontation DD (si fourni)

# Liste de points consolidée (appel liste-de-points)

# Recommandation
{Accepter / Négocier / Refuser} — {justification}

# Une question hors de ma checklist habituelle

# Que veux-tu faire ?
1. Rédiger un courrier de négociation au cédant
2. Escalader vers {approbateur SPA}
3. Compléter les faits (questions au cédant)
4. Demander une seconde lecture interne
5. Autre
```
```

- [ ] **Step 2: Manual test sur 2 GAP de référence**

Tester sur 2 GAP anonymisés. Validation manuelle frère sur couverture 5 axes.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-droit-affaires/skills/gap-review/
git commit -m "feat(droit-affaires): skill gap-review 5 axes (spécificité FR)"
```

---

### Task 5.2: Skill declaration-creance (procédures collectives)

**Files:**
- Create: `plugins/hacienda-droit-affaires/skills/declaration-creance/SKILL.md`

- [ ] **Step 1: Créer SKILL.md**

File: `plugins/hacienda-droit-affaires/skills/declaration-creance/SKILL.md`
```markdown
---
name: declaration-creance
description: >
  Rédige une déclaration de créance L.622-24 C.com. dans le cadre d'une
  procédure collective (sauvegarde, redressement, liquidation). Calcule
  automatiquement la date de forclusion (2 mois post-publication BODACC,
  4 mois si créancier étranger). Vérifie BODACC pour récupérer le
  mandataire désigné. Format conforme exigences mandataire judiciaire.
version: "1.0.0"
authors: ["Hacienda"]
tags: [procedures-collectives, declaration-creance, forclusion, bodacc, l622-24]
---

# Skill — Déclaration de créance L.622-24

> **BROUILLON, VALIDATION AVOCAT/MANDATAIRE OBLIGATOIRE.**
>
> Le délai de forclusion (2 mois) est une **règle dure** : passé ce
> délai, sauf relevé de forclusion exceptionnel (L.622-26), la
> créance est éteinte. Vérification calendrier OBLIGATOIRE.

## Examples

<example>
<user>/hacienda-droit-affaires:declaration-creance --siren=123456789 --montant=85000 --nature=facture</user>
<response>
1. Pré-flight check-pii
2. Lookup BODACC procedures sur SIREN
   → Trouve : RJ ouvert 15 mars 2026, jugement publié BODACC 22 mars
   → Mandataire : Maître X (cabinet Y)
3. Calcul forclusion : 22 mars + 2 mois = 22 mai 2026 (encore 18 jours)
4. Génération déclaration de créance format mandataire
5. Note relecteur : "⚠ Délai forclusion dans 18 jours — envoi recommandé sous 5 jours"
</response>
</example>

<example>
<user>/hacienda-droit-affaires:declaration-creance --siren=987654321 --montant=12000 --nature=loyer-impayes</user>
<response>
Lookup BODACC : liquidation publiée 1er février 2026.
Calcul forclusion : 1er février + 2 mois = 1er avril 2026.
Aujourd'hui : 18 mai 2026 — FORCLUSION DÉPASSÉE de 47 jours.

🔴 ALERTE : Délai L.622-24 expiré.
Options :
1. Requête en relevé de forclusion L.622-26 (recevabilité strictement
   exceptionnelle : démontrer que la non-déclaration n'est pas due à
   ton fait + que la créance n'est pas connue du débiteur)
2. Abandon de la créance (perte définitive)

Veux-tu que je rédige la requête en relevé ? (validation avocat
obligatoire avant dépôt)
</response>
</example>

## Chargement du profil

> Lire depuis CLAUDE.md bloc procédures collectives :
> - Position dominante (créancier — devrait être le cas)
> - Tribunaux habituels
> - Approbateur déclaration > 100k€

## Intake

1. **SIREN débiteur** — `--siren=123456789`
2. **Montant créance** — `--montant=85000` (en euros)
3. **Nature créance** — `--nature=facture|loyer|prestation|salaire|...`
4. **Justificatifs** (optionnel) — `--docs=./facture.pdf,./bon-livraison.pdf`
5. **Date naissance créance** (optionnel) — si non précisé, demande
6. **Privilège revendiqué** (optionnel) — `--privilege=conservateur|nantissement|...`

## Étape 1 — Pré-flight + lookup BODACC

1. check-pii (montants nominatifs présents → catégorie B fréquent)
2. `bodaccProcedures(siren)` via core
3. Identifier :
   - Type de procédure (sauvegarde / RJ / LJ)
   - Date jugement ouverture
   - Date publication BODACC (point de départ délai)
   - Mandataire désigné (nom + adresse)

## Étape 2 — Calcul forclusion L.622-24

```
date_forclusion = date_publication_bodacc + 2 mois
si créancier_etranger : + 2 mois supplémentaires (= 4 mois)
si défaillance jugement : règle particulière (à signaler)

aujourd'hui_vs_forclusion :
  si jours_restants > 30 : 🟢 OK envoi normal
  si jours_restants 7-30 : 🟠 envoi prioritaire
  si jours_restants 0-6  : 🔴 URGENT envoi sous 24-48h
  si jours_restants < 0  : 🔴🔴 FORCLUSION — proposer requête en relevé L.622-26
```

## Étape 3 — Calcul créance

Composantes :
- Principal
- Intérêts contractuels jusqu'à date jugement (arrêt cours intérêts L.622-28 — sauf exceptions)
- Frais accessoires (clause pénale arrêtée à la date jugement L.622-29)
- TVA si applicable

Total déclaré + détail.

## Étape 4 — Privilège (le cas échéant)

Si privilège revendiqué :
- Privilège général (sécu sociale, fisc)
- Privilège spécial (vendeur, créancier nanti, conservateur)
- Sûreté réelle (hypothèque, nantissement, gage)

Documentation à joindre selon le privilège.

## Étape 5 — Rédaction déclaration

Format conforme aux usages mandataires :

```
[En-tête identifiant créancier]
[Référence procédure : tribunal, numéro RG, date jugement]
[Mandataire destinataire]

DÉCLARATION DE CRÉANCE

Conformément à l'article L.622-24 du Code de commerce,

Le créancier soussigné [...] déclare au passif de [débiteur, SIREN] la
créance suivante :

| Nature | Montant principal | Intérêts arrêtés au [date jugement] | Total |
|--------|-------------------|--------------------------------------|-------|

Justificatifs joints : [liste]

Privilège revendiqué (le cas échéant) : [type + fondement]

Signature, date, qualité du signataire.
```

## Étape 6 — Post-flight verifier-citations (L.622-24, L.622-26, L.622-28, L.622-29)

## Sortie — Format livrable

```
[Note du relecteur]
[En-tête confidentialité]

# 🔴/🟠/🟢 Statut forclusion
Date publication BODACC : [date]
Date forclusion : [date]
Jours restants : [N]
Action recommandée : [envoi immédiat / dans X jours / requête relevé]

# Récapitulatif procédure
- Tribunal : [TC X]
- N° RG : [...]
- Type : [sauvegarde/RJ/LJ]
- Mandataire : [nom + adresse]

# Déclaration de créance (projet)
[texte complet ci-dessus]

# Pièces à joindre
- [liste]

# Que veux-tu faire ?
1. Envoyer au mandataire (générer courrier recommandé)
2. Escalader vers {approbateur} (si > seuil)
3. Compléter les justificatifs manquants
4. Vérifier le calcul avec compta avant envoi
5. Autre
```
```

- [ ] **Step 2: Manual test sur 3 déclarations avec dates connues**

Tester sur 3 dossiers procédures co anonymisés (ami). Vérifier calcul forclusion correct sur 3/3 et format conforme aux exigences mandataire.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-droit-affaires/skills/declaration-creance/
git commit -m "feat(droit-affaires): skill declaration-creance L.622-24 + calcul forclusion"
```

---

## Wave 6 — Agents (3)

### Task 6.1: Agent bodacc-watcher (cibles M&A)

**Files:**
- Create: `plugins/hacienda-droit-affaires/agents/bodacc-watcher.md`

- [ ] **Step 1: Créer l'agent**

File: `plugins/hacienda-droit-affaires/agents/bodacc-watcher.md`
```markdown
---
name: bodacc-watcher
description: >
  Surveillance quotidienne BODACC sur portefeuille SIREN configuré
  (cibles M&A, clients existants, fournisseurs critiques). Alerte sur
  modifications statuts, changements dirigeants, procédures collectives
  ouvertes. Digest hebdo + alertes immédiates sur événements critiques.
cadence: quotidien
sources:
  - bodaccBySiren (via @hacienda/core)
  - companyFullProfile (enrichissement Pappers si configuré)
---

# Agent — BODACC Watcher (cibles M&A)

## Mission

Surveiller le portefeuille SIREN configuré (cibles M&A potentielles,
clients/fournisseurs existants) et alerter sur les événements BODACC
pertinents.

## Configuration

Watchlist SIREN dans :
`~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/watchlist-siren.yaml`

Format :
```yaml
sirens:
  - siren: "123456789"
    label: "Cible Project Alpha"
    category: "cible-ma"
    alert_level: "haut"
  - siren: "987654321"
    label: "Client critique X"
    category: "client"
    alert_level: "moyen"
```

## Niveaux d'alerte

| Événement BODACC | Sévérité |
|---|---|
| Procédure collective ouverte | 🔴 immédiat |
| Changement contrôle / cession | 🔴 immédiat |
| Modification statuts substantielle | 🟠 digest hebdo |
| Changement dirigeants | 🟠 digest hebdo |
| Dépôt comptes | 🟡 digest hebdo |
| Modification adresse | 🟢 silencieux |

## Cadence

- Quotidien : scan watchlist, comparaison vs dernier état connu
- Si événement 🔴 : alerte immédiate (canal configuré dans CLAUDE.md)
- Si événement 🟠 : agrégé dans digest hebdo (vendredi)

## Sortie

Digest hebdo Markdown + dashboard HTML pour > 10 alertes.

Format alerte immédiate :
```
🔴 ALERTE BODACC — [date]
{label} (SIREN {siren}) :
- {événement détecté}
- Source : BODACC publication [date]
- Action recommandée : [vérifier dossier / appeler / etc.]
```

## Mode dégradé

Si BODACC inaccessible : log + retry dans 1h. Pas de fail silent.
```

- [ ] **Step 2: Commit**

```bash
git add plugins/hacienda-droit-affaires/agents/bodacc-watcher.md
git commit -m "feat(droit-affaires): agent bodacc-watcher (surveillance cibles M&A)"
```

---

### Task 6.2: Agent bodacc-procedures-watcher (forclusion créances)

**Files:**
- Create: `plugins/hacienda-droit-affaires/agents/bodacc-procedures-watcher.md`

- [ ] **Step 1: Créer l'agent**

File: `plugins/hacienda-droit-affaires/agents/bodacc-procedures-watcher.md`
```markdown
---
name: bodacc-procedures-watcher
description: >
  Surveillance spécifique procédures collectives sur portefeuille débiteurs
  + monitoring forclusion des déclarations de créance en cours. Alerte ferme
  30 jours avant forclusion L.622-24. Digest hebdo des nouvelles procédures
  affectant les débiteurs surveillés.
cadence: quotidien + alerte critique
sources:
  - bodaccProcedures (via @hacienda/core)
---

# Agent — BODACC Procédures Watcher

## Mission

Pour les indépendants procédures collectives : surveiller les débiteurs
du portefeuille, alerter sur nouvelles procédures, **alerter
fermement 30 jours avant chaque forclusion L.622-24** sur déclarations
en cours.

## Configuration

`~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/debiteurs.yaml` :
```yaml
debiteurs:
  - siren: "123456789"
    label: "Dossier client A vs débiteur X"
    montant_creance: 85000
    date_jugement_ouverture: "2026-03-15"
    date_publication_bodacc: "2026-03-22"
    statut_declaration: "envoyee" # | "en_cours" | "à_faire"
    date_envoi: "2026-04-01"
```

## Calcul forclusion

Pour chaque débiteur avec `statut_declaration: "à_faire"` :
```
date_forclusion = date_publication_bodacc + 60 jours
jours_restants = date_forclusion - today

si jours_restants > 30 : silencieux
si jours_restants 15-30 : 🟠 digest hebdo
si jours_restants 7-14  : 🟠 alerte 2x/semaine
si jours_restants 0-6   : 🔴 alerte quotidienne urgente
si jours_restants < 0   : 🔴🔴 FORCLUSION — basculer proposition relevé L.622-26
```

## Surveillance nouvelles procédures

Quotidien : scan BODACC procédures sur tous SIREN du portefeuille
de débiteurs (au-delà des dossiers actifs — tout débiteur connu).
Alerte si nouvelle procédure ouverte sur SIREN historique.

## Sortie

### Format alerte forclusion 🔴
```
🔴 FORCLUSION IMMINENTE — [jours_restants] jours

Dossier : {label}
Débiteur : SIREN {siren}
Procédure : {type} ouverte le {date_jugement}
Publication BODACC : {date_pub}
Date forclusion : {date_forclusion}

Action OBLIGATOIRE :
→ /hacienda-droit-affaires:declaration-creance --siren={siren} --montant={montant}

Si déclaration déjà envoyée, marquer dans debiteurs.yaml :
  statut_declaration: envoyee
  date_envoi: YYYY-MM-DD
```

### Format digest hebdo

Tableau des dossiers actifs avec statut forclusion + tableau nouvelles
procédures détectées sur SIREN historiques.

## Mode dégradé

Si BODACC inaccessible : retry + alerte. **JAMAIS de fail silent** sur
un agent de forclusion (risque déontologique majeur).
```

- [ ] **Step 2: Commit**

```bash
git add plugins/hacienda-droit-affaires/agents/bodacc-procedures-watcher.md
git commit -m "feat(droit-affaires): agent bodacc-procedures-watcher + alerte forclusion"
```

---

### Task 6.3: Agent echeances-societaires

**Files:**
- Create: `plugins/hacienda-droit-affaires/agents/echeances-societaires.md`

- [ ] **Step 1: Créer l'agent**

File: `plugins/hacienda-droit-affaires/agents/echeances-societaires.md`
```markdown
---
name: echeances-societaires
description: >
  Rappel hebdomadaire des échéances sociétaires sur portefeuille clients :
  dépôts comptes annuels (date de clôture + 7 mois), renouvellement
  mandats sociaux, tenue AGO obligatoire (dans les 6 mois post-clôture).
  Source : Pappers (date clôture, dirigeants) avec fallback BODACC public.
cadence: hebdomadaire
sources:
  - pappersCompanyProfile (si configuré)
  - bodaccBySiren (fallback)
---

# Agent — Échéances sociétaires

## Mission

Rappeler hebdomadairement les obligations sociétaires à venir pour les
clients du cabinet : dépôt des comptes, renouvellement mandats, AGO.

## Configuration

`~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/clients-societes.yaml` :
```yaml
clients:
  - siren: "123456789"
    label: "SAS Alpha"
    date_cloture_exercice: "12-31"  # 31 décembre
    forme: "SAS"
    notes: "dépôt comptes via expert-comptable"
```

## Échéances surveillées

| Obligation | Calcul délai | Sévérité base |
|---|---|---|
| Dépôt comptes annuels | Clôture + 7 mois (L.232-23 C.com.) | 🟠 si < 30 jours |
| Tenue AGO | Clôture + 6 mois | 🟠 si < 60 jours |
| Renouvellement mandat | Date fin mandat - 90 jours | 🟡 préparation |

## Cadence

Hebdomadaire (lundi matin). Digest groupé par sévérité.

## Sortie

### Format digest hebdo

```
Échéances sociétaires — semaine du [date]

## 🟠 Dans les 30 prochains jours

| Client | SIREN | Obligation | Date butoir | Jours restants |
|--------|-------|------------|-------------|----------------|

## 🟡 Préparation (30-90 jours)

[tableau]

## Notes

- Vérifier auprès des experts-comptables clients X, Y, Z (notes config)
```

## Mode dégradé

Si Pappers + BODACC inaccessibles : digest partiel avec mention des SIREN
non vérifiables ce jour-là, retry au prochain run.
```

- [ ] **Step 2: Commit**

```bash
git add plugins/hacienda-droit-affaires/agents/echeances-societaires.md
git commit -m "feat(droit-affaires): agent echeances-societaires (dépôts comptes + mandats)"
```

---

## Wave 7 — MCP wrapper + intégration

### Task 7.1: MCP server wrapper

**Files:**
- Create: `plugins/hacienda-droit-affaires/mcp-server/package.json`
- Create: `plugins/hacienda-droit-affaires/mcp-server/tsconfig.json`
- Create: `plugins/hacienda-droit-affaires/mcp-server/src/index.ts`

- [ ] **Step 1: Créer package.json**

File: `plugins/hacienda-droit-affaires/mcp-server/package.json`
```json
{
  "name": "@hacienda/mcp-droit-affaires",
  "version": "0.1.0",
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "@hacienda/core": "*",
    "@modelcontextprotocol/sdk": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0"
  }
}
```

- [ ] **Step 2: Créer tsconfig.json**

File: `plugins/hacienda-droit-affaires/mcp-server/tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

- [ ] **Step 3: Créer index.ts (wrapper minimal ~30 lignes)**

File: `plugins/hacienda-droit-affaires/mcp-server/src/index.ts`
```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  bodaccBySirenTool,
  bodaccProceduresTool,
  companyFullProfileTool,
} from "@hacienda/core";

const TOOLS = [bodaccBySirenTool, bodaccProceduresTool, companyFullProfileTool];

const server = new Server(
  { name: "hacienda-droit-affaires", version: "0.1.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS.map((t) => ({
    name: t.name,
    description: t.description,
    inputSchema: t.inputSchema,
  })),
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const tool = TOOLS.find((t) => t.name === req.params.name);
  if (!tool) throw new Error(`Unknown tool: ${req.params.name}`);
  return await tool.handler(req.params.arguments as any);
});

await server.connect(new StdioServerTransport());
```

- [ ] **Step 4: Build et test**

Run:
```bash
cd plugins/hacienda-droit-affaires/mcp-server && npm install && npm run build && node dist/index.js < /dev/null
```
Expected: démarre sans erreur (puis termine sur EOF stdin)

- [ ] **Step 5: Commit**

```bash
git add plugins/hacienda-droit-affaires/mcp-server/
git commit -m "feat(droit-affaires): MCP server wrapper (registers core tools)"
```

---

### Task 7.2: Finaliser README.md utilisateur

**Files:**
- Modify: `plugins/hacienda-droit-affaires/README.md`

- [ ] **Step 1: Réécrire README.md complet**

File: `plugins/hacienda-droit-affaires/README.md`
```markdown
# Hacienda Droit des Affaires

Plugin Hacienda pour cabinets d'avocats d'affaires, juristes in-house en
direction juridique, notaires corporate et indépendants en procédures
collectives.

## Périmètre v1

| Bloc | Skills |
|---|---|
| Contrats commerciaux | `reviser-contrat`, `reviser-nda`, `liste-de-points`, `revue-tabulaire` |
| M&A léger | `gap-review` |
| Procédures collectives | `declaration-creance` |
| Transversal | `entretien-demarrage`, `verifier-citations`, `check-pii` |
| Agents | `bodacc-watcher`, `bodacc-procedures-watcher`, `echeances-societaires` |

## Installation

```bash
claude plugins marketplace add /chemin/vers/hacienda-juridique
claude plugins install hacienda-droit-affaires
```

## Configuration des sources

Les sources externes sont configurées dans `~/.config/Hacienda/credentials.json`
(pattern unifié — mêmes clés partagées avec les autres plugins Hacienda) :

```bash
mkdir -p ~/.config/Hacienda
cat > ~/.config/Hacienda/credentials.json <<EOF
{
  "PISTE_CLIENT_ID": "...",
  "PISTE_CLIENT_SECRET": "...",
  "PAPPERS_API_KEY": "..."
}
EOF
chmod 600 ~/.config/Hacienda/credentials.json
```

| Clé | Source | Obtention | Optionnel ? |
|---|---|---|---|
| `PISTE_CLIENT_ID` + `_SECRET` | Légifrance | piste.gouv.fr (gratuit) | Recommandé (sans : `verifier-citations` mode dégradé) |
| `PAPPERS_API_KEY` | Pappers | www.pappers.fr/api (payant) | Optionnel (sans : fallback BODACC public gratuit) |

## Premier lancement

```
/hacienda-droit-affaires:entretien-demarrage
```

Configure votre profil cabinet (réutilisé par les autres plugins
Hacienda via `~/.config/Hacienda/profil-cabinet.md`) et vérifie l'état
des connexions.

## Plugin compagnon recommandé

`hacienda-ghost` — anonymise les données PII avant envoi à Claude.
Sans ghost, ce plugin fonctionne mais avertit lorsque des données
sensibles sont traitées en clair (`check-pii`).

## Plugins liés

- `hacienda-propriete-intellectuelle` — pour les contrats PI (licences
  brevet, accords coexistence marques, NDA partenariat R&D). Le skill
  `reviser-contrat` renvoie automatiquement vers PI quand pertinent.
- `hacienda-sources-officielles` — si installé, ses outils sont aussi
  accessibles à ce plugin (mécanisme MCP standard).

## Licence

AGPL-3.0-or-later
```

- [ ] **Step 2: Update CHANGELOG**

File: `plugins/hacienda-droit-affaires/CHANGELOG.md`
```markdown
# Changelog

## [0.1.0] - 2026-XX-XX

### Added
- 9 skills (entretien-demarrage, reviser-contrat, reviser-nda, liste-de-points,
  revue-tabulaire, gap-review, declaration-creance, verifier-citations, check-pii)
- 3 agents (bodacc-watcher, bodacc-procedures-watcher, echeances-societaires)
- 4 références (clauses-sensibles, sources, taxonomie, articles-index)
- CLAUDE.md complet (11 sections calquées PI v0.16)
- MCP server wrapper (registers core tools)
- Cold-start partagé via ~/.config/Hacienda/profil-cabinet.md
- Mode dégradé sans Pappers (fallback BODACC) et sans PISTE
- CTA hacienda-ghost intégré dans check-pii
```

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-droit-affaires/README.md plugins/hacienda-droit-affaires/CHANGELOG.md
git commit -m "docs(droit-affaires): README utilisateur + CHANGELOG v0.1.0"
```

---

### Task 7.3: Vérification globale et acceptance

**Files:**
- Run: vérifications cross-projet

- [ ] **Step 1: Run full test suite core**

Run:
```bash
cd packages/core && npx vitest run
```
Expected: all PASS (incl. nouveaux tests bodacc + tools + cross-plugin)

- [ ] **Step 2: Run typecheck global**

Run:
```bash
npm run typecheck
```
Expected: 0 erreur

- [ ] **Step 3: Run build global**

Run:
```bash
npm run build
```
Expected: tout compile

- [ ] **Step 4: Run branding:check**

Run:
```bash
npm run branding:check
```
Expected: PASS

- [ ] **Step 5: Run git diff --check**

Run:
```bash
git diff --check
```
Expected: pas d'espaces/tabs en fin de ligne

- [ ] **Step 6: Smoke test installation locale**

Run:
```bash
claude plugins marketplace add $(pwd)
claude plugins install hacienda-droit-affaires
```
Puis dans une session Claude :
```
/hacienda-droit-affaires:entretien-demarrage --check-integrations
```
Expected: répond avec le tableau de diagnostic des connexions.

- [ ] **Step 7: Lancer le dataset de validation acceptance**

Pour chaque critère technique du spec §Acceptance Criteria :
- verifier-citations sur 20 citations test → mesurer taux détection (cible ≥ 95%)
- check-pii sur 5 documents sensibles → mesurer détection par catégorie (cible ≥ 90%)
- Vérifier 50 sorties tests : 0 hallucination d'article, 100% en-tête conforme
- Vérifier mode dégradé sans Pappers : OUI fonctionnel
- Vérifier mode dégradé sans PISTE : OUI fonctionnel

Documenter résultats dans `docs/superpowers/specs/2026-05-18-hacienda-droit-affaires-acceptance-results.md` (nouveau fichier).

- [ ] **Step 8: Validation utilisateurs réels (4 semaines en parallèle des dev)**

Suivi à part dans `docs/testing/2026-05-droit-affaires-poc-tracking.md` :
- Sessions frère : compteur par semaine (cible ≥ 3/sem)
- Dossiers ami : compteur cumulé (cible ≥ 5)
- Erreurs juridiques bloquantes signalées (cible 0)
- Skills jugés "à garder" : sondage hebdo

- [ ] **Step 9: Bump version v0.1.0 → v1.0.0 si acceptance OK**

Update `plugin.json` version, CHANGELOG, README header.

- [ ] **Step 10: Commit version stable v1.0.0**

```bash
git add plugins/hacienda-droit-affaires/.claude-plugin/plugin.json plugins/hacienda-droit-affaires/CHANGELOG.md plugins/hacienda-droit-affaires/README.md docs/
git commit -m "chore(droit-affaires): bump 0.1.0 → 1.0.0 — acceptance v1 validée"
```

---

## Post-v1

Une fois v1 livrée et acceptance OK, créer une nouvelle spec et plan pour v1.1 (due-diligence-dataroom, pacte-associes-review, loi-term-sheet, closing-checklist-fr, activation workspaces de dossier).

---

*Fin du plan v1. Total estimé : 30-35 tâches sur 6-8 semaines à 1-2 personnes (PO + Claude).*
