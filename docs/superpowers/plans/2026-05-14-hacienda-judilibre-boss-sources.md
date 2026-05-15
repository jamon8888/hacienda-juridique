# Hacienda Judilibre BOSS Sources Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Judilibre and BOSS as first-class official sources in `packages/core`, with MCP tools, proof-ready citations, and robust BOSS diagnostics.

**Architecture:** Judilibre is an authenticated PISTE JSON API client using `KeyId`, independent from the existing Légifrance OAuth client. BOSS is an official HTML source with a conservative fetch/status layer, Cheerio parser, local in-memory/file-friendly index primitives, and no browser automation.

**Tech Stack:** TypeScript, Vitest, MCP SDK, `undici`, `zod`, internal conservative BOSS HTML/robots parsing.

---

## Scope

Implement the approved design in `docs/superpowers/specs/2026-05-14-hacienda-judilibre-boss-sources-design.md`.

This plan does not build `hacienda-social`, does not finish the Hacienda rebrand, and does not add Playwright/Crawlee. It works against the current `@hacienda/core` package name and `createHaciendaServer` entry point.

## File Structure

- Create `packages/core/src/sources/types.ts`: shared `OfficialSource`, `ProofStatus`, `SourceCitation`, `SourceSearchHit`.
- Create `packages/core/src/judilibre/config.ts`: Judilibre env/base URL/key loading.
- Create `packages/core/src/judilibre/client.ts`: PISTE Judilibre GET client with `KeyId`.
- Create `packages/core/src/judilibre/schemas.ts`: tolerant Zod schemas for search and decision payloads.
- Create `packages/core/src/judilibre/format.ts`: Markdown formatters and citation helpers.
- Create `packages/core/src/tools/judilibre.ts`: MCP tool functions and registration.
- Create `packages/core/src/boss/status.ts`: non-indexing BOSS probe.
- Create `packages/core/src/boss/client.ts`: URL validation, robots handling, official HTML fetch.
- Create `packages/core/src/boss/parser.ts`: internal BOSS HTML document extraction.
- Create `packages/core/src/boss/index.ts`: normalized search index utilities.
- Create `packages/core/src/boss/format.ts`: Markdown output for BOSS hits/documents.
- Create `packages/core/src/tools/boss.ts`: MCP tool functions and registration.
- Modify `packages/core/src/index.ts`: export/register new tools and modules.
- Modify `packages/core/test/smoke.test.ts`: expect `judilibre_*` and `boss_*` tools.
- Add tests under `packages/core/test/`: `sources.test.ts`, `judilibre-config.test.ts`, `judilibre-client.test.ts`, `judilibre-tools.test.ts`, `boss-client.test.ts`, `boss-status.test.ts`, `boss-parser.test.ts`, `boss-index.test.ts`, `boss-tools.test.ts`.
- Add fixtures under `packages/core/test/fixtures/boss/`: `avantages-en-nature.html`, `robots-allow.txt`, `robots-disallow.txt`.

---

### Task 1: Shared Source Types

**Files:**
- Create: `packages/core/src/sources/types.ts`
- Create: `packages/core/test/sources.test.ts`
- Modify: `packages/core/src/index.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/core/test/sources.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import type { OfficialSource, SourceCitation, SourceSearchHit } from "../src/sources/types.js";

describe("source proof types", () => {
  it("accepts the four official source identifiers used by Hacienda", () => {
    const sources: OfficialSource[] = ["LEGIFRANCE", "BOFIP", "JUDILIBRE", "BOSS"];
    expect(sources).toEqual(["LEGIFRANCE", "BOFIP", "JUDILIBRE", "BOSS"]);
  });

  it("models a proof citation and a search hit with official URLs", () => {
    const citation: SourceCitation = {
      source: "BOSS",
      title: "Avantages en nature",
      url: "https://boss.gouv.fr/portail/accueil/autres-elements-de-remuneration/avantages-en-nature.html",
      retrievedAt: "2026-05-14T18:00:00.000Z",
      status: "vérifié",
      tool: "boss_get_document",
    };
    const hit: SourceSearchHit = {
      source: "JUDILIBRE",
      id: "abc",
      title: "Cass. soc.",
      url: "https://www.courdecassation.fr/decision/abc",
      retrievedAt: "2026-05-14T18:00:00.000Z",
      score: 1,
    };

    expect(citation.status).toBe("vérifié");
    expect(hit.source).toBe("JUDILIBRE");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm --prefix packages/core test -- sources.test.ts
```

Expected: FAIL with `Cannot find module '../src/sources/types.js'`.

- [ ] **Step 3: Add source types**

Create `packages/core/src/sources/types.ts`:

```ts
export type OfficialSource = "LEGIFRANCE" | "BOFIP" | "JUDILIBRE" | "BOSS";

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

Add exports to `packages/core/src/index.ts` near other type exports:

```ts
export type {
  OfficialSource,
  ProofStatus,
  SourceCitation,
  SourceSearchHit,
} from "./sources/types.js";
```

- [ ] **Step 4: Run the test to verify it passes**

Run:

```bash
npm --prefix packages/core test -- sources.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/core/src/sources/types.ts packages/core/src/index.ts packages/core/test/sources.test.ts
git commit -m "feat: add official source proof types"
```

---

### Task 2: Judilibre Config, Schemas, And Client

**Files:**
- Create: `packages/core/src/judilibre/config.ts`
- Create: `packages/core/src/judilibre/schemas.ts`
- Create: `packages/core/src/judilibre/client.ts`
- Create: `packages/core/test/judilibre-config.test.ts`
- Create: `packages/core/test/judilibre-client.test.ts`

- [ ] **Step 1: Write config tests**

Create `packages/core/test/judilibre-config.test.ts`:

```ts
import { afterEach, describe, expect, it } from "vitest";
import { loadJudilibreConfig } from "../src/judilibre/config.js";

const OLD_ENV = { ...process.env };

afterEach(() => {
  process.env = { ...OLD_ENV };
});

describe("loadJudilibreConfig", () => {
  it("defaults to production and reads JUDILIBRE_KEY_ID first", () => {
    process.env.JUDILIBRE_KEY_ID = "jud-key";
    process.env.PISTE_KEY_ID = "piste-key";
    delete process.env.JUDILIBRE_ENV;

    expect(loadJudilibreConfig()).toEqual({
      env: "production",
      baseUrl: "https://api.piste.gouv.fr/cassation/judilibre/v1.0",
      keyId: "jud-key",
      keySource: "JUDILIBRE_KEY_ID",
    });
  });

  it("falls back to PISTE_KEY_ID and sandbox URL", () => {
    delete process.env.JUDILIBRE_KEY_ID;
    process.env.PISTE_KEY_ID = "piste-key";
    process.env.JUDILIBRE_ENV = "sandbox";

    expect(loadJudilibreConfig()).toEqual({
      env: "sandbox",
      baseUrl: "https://sandbox-api.piste.gouv.fr/cassation/judilibre/v1.0",
      keyId: "piste-key",
      keySource: "PISTE_KEY_ID",
    });
  });

  it("returns missing key metadata without throwing", () => {
    delete process.env.JUDILIBRE_KEY_ID;
    delete process.env.PISTE_KEY_ID;
    delete process.env.JUDILIBRE_ENV;

    const config = loadJudilibreConfig();

    expect(config.keyId).toBeUndefined();
    expect(config.keySource).toBe("none");
  });
});
```

- [ ] **Step 2: Write client tests**

Create `packages/core/test/judilibre-client.test.ts`:

```ts
import { MockAgent, setGlobalDispatcher } from "undici";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { JudilibreClient, JudilibreCredentialsMissingError, JudilibreHttpError } from "../src/judilibre/client.js";

let mockAgent: MockAgent;

beforeEach(() => {
  mockAgent = new MockAgent();
  mockAgent.disableNetConnect();
  setGlobalDispatcher(mockAgent);
});

afterEach(async () => {
  await mockAgent.close();
});

describe("JudilibreClient", () => {
  it("sends KeyId and query params to /search", async () => {
    const pool = mockAgent.get("https://api.piste.gouv.fr");
    pool
      .intercept({
        method: "GET",
        path: "/cassation/judilibre/v1.0/search?query=licenciement&page_size=5&page=0",
        headers: { KeyId: "secret-key" },
      })
      .reply(200, { results: [{ id: "abc", decision_datetime: "2024-01-02" }], total: 1 });

    const client = new JudilibreClient({
      env: "production",
      baseUrl: "https://api.piste.gouv.fr/cassation/judilibre/v1.0",
      keyId: "secret-key",
      keySource: "JUDILIBRE_KEY_ID",
    });

    const result = await client.search({ query: "licenciement", pageSize: 5, page: 0 });

    expect(result.total).toBe(1);
    expect(result.results[0]!.id).toBe("abc");
  });

  it("throws a friendly missing credentials error before network I/O", async () => {
    const client = new JudilibreClient({
      env: "production",
      baseUrl: "https://api.piste.gouv.fr/cassation/judilibre/v1.0",
      keyId: undefined,
      keySource: "none",
    });

    await expect(client.search({ query: "faute grave" })).rejects.toBeInstanceOf(JudilibreCredentialsMissingError);
  });

  it("wraps non-2xx responses with status and body preview", async () => {
    const pool = mockAgent.get("https://api.piste.gouv.fr");
    pool
      .intercept({
        method: "GET",
        path: "/cassation/judilibre/v1.0/decision/abc",
      })
      .reply(403, { message: "forbidden" });

    const client = new JudilibreClient({
      env: "production",
      baseUrl: "https://api.piste.gouv.fr/cassation/judilibre/v1.0",
      keyId: "secret-key",
      keySource: "JUDILIBRE_KEY_ID",
    });

    await expect(client.getDecision("abc")).rejects.toBeInstanceOf(JudilibreHttpError);
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run:

```bash
npm --prefix packages/core test -- judilibre-config.test.ts judilibre-client.test.ts
```

Expected: FAIL with missing Judilibre modules.

- [ ] **Step 4: Implement Judilibre config and schemas**

Create `packages/core/src/judilibre/config.ts`:

```ts
export type JudilibreEnv = "production" | "sandbox";

export interface JudilibreConfig {
  env: JudilibreEnv;
  baseUrl: string;
  keyId: string | undefined;
  keySource: "JUDILIBRE_KEY_ID" | "PISTE_KEY_ID" | "none";
}

function cleanEnv(value: string | undefined): string | undefined {
  if (!value) return undefined;
  if (/^\$\{[^}]+\}$/.test(value)) return undefined;
  return value;
}

export function loadJudilibreConfig(env = process.env): JudilibreConfig {
  const judilibreKey = cleanEnv(env.JUDILIBRE_KEY_ID);
  const pisteKey = cleanEnv(env.PISTE_KEY_ID);
  const envName: JudilibreEnv = cleanEnv(env.JUDILIBRE_ENV) === "sandbox" ? "sandbox" : "production";
  const baseUrl =
    envName === "sandbox"
      ? "https://sandbox-api.piste.gouv.fr/cassation/judilibre/v1.0"
      : "https://api.piste.gouv.fr/cassation/judilibre/v1.0";

  if (judilibreKey) {
    return { env: envName, baseUrl, keyId: judilibreKey, keySource: "JUDILIBRE_KEY_ID" };
  }
  if (pisteKey) {
    return { env: envName, baseUrl, keyId: pisteKey, keySource: "PISTE_KEY_ID" };
  }
  return { env: envName, baseUrl, keyId: undefined, keySource: "none" };
}
```

Create `packages/core/src/judilibre/schemas.ts`:

```ts
import { z } from "zod";

export const JudilibreDecisionSummarySchema = z.object({
  id: z.string().optional(),
  decision_datetime: z.string().optional(),
  jurisdiction: z.string().optional(),
  chamber: z.string().optional(),
  formation: z.string().optional(),
  solution: z.string().optional(),
  ecli: z.string().optional(),
  text: z.string().optional(),
  themes: z.array(z.string()).optional(),
}).passthrough();

export const JudilibreSearchResponseSchema = z.object({
  results: z.array(JudilibreDecisionSummarySchema).default([]),
  total: z.number().optional(),
  page: z.number().optional(),
  page_size: z.number().optional(),
}).passthrough();

export const JudilibreDecisionSchema = JudilibreDecisionSummarySchema.extend({
  zones: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

export type JudilibreSearchResponse = z.infer<typeof JudilibreSearchResponseSchema>;
export type JudilibreDecision = z.infer<typeof JudilibreDecisionSchema>;
```

- [ ] **Step 5: Implement Judilibre client**

Create `packages/core/src/judilibre/client.ts`:

```ts
import { request } from "undici";
import type { JudilibreConfig } from "./config.js";
import {
  JudilibreDecisionSchema,
  JudilibreSearchResponseSchema,
  type JudilibreDecision,
  type JudilibreSearchResponse,
} from "./schemas.js";

export interface JudilibreSearchArgs {
  query: string;
  pageSize?: number;
  page?: number;
  dateStart?: string;
  dateEnd?: string;
  jurisdiction?: string;
  chamber?: string;
  publication?: string;
  solution?: string;
}

export class JudilibreCredentialsMissingError extends Error {
  constructor() {
    super("Credential Judilibre manquant. Définissez JUDILIBRE_KEY_ID ou PISTE_KEY_ID.");
    this.name = "JudilibreCredentialsMissingError";
  }
}

export class JudilibreHttpError extends Error {
  constructor(
    public status: number,
    public path: string,
    public body: string,
  ) {
    super(`Judilibre HTTP ${status} sur ${path}: ${body.slice(0, 300)}`);
    this.name = "JudilibreHttpError";
  }
}

export class JudilibreClient {
  constructor(private readonly config: JudilibreConfig) {}

  async search(args: JudilibreSearchArgs): Promise<JudilibreSearchResponse> {
    const params = new URLSearchParams();
    params.set("query", args.query);
    if (args.pageSize !== undefined) params.set("page_size", String(args.pageSize));
    if (args.page !== undefined) params.set("page", String(args.page));
    if (args.dateStart) params.set("date_start", args.dateStart);
    if (args.dateEnd) params.set("date_end", args.dateEnd);
    if (args.jurisdiction) params.set("jurisdiction", args.jurisdiction);
    if (args.chamber) params.set("chamber", args.chamber);
    if (args.publication) params.set("publication", args.publication);
    if (args.solution) params.set("solution", args.solution);

    const raw = await this.getJson(`/search?${params.toString()}`);
    return JudilibreSearchResponseSchema.parse(raw);
  }

  async getDecision(id: string): Promise<JudilibreDecision> {
    const raw = await this.getJson(`/decision/${encodeURIComponent(id)}`);
    return JudilibreDecisionSchema.parse(raw);
  }

  private async getJson(path: string): Promise<unknown> {
    if (!this.config.keyId) throw new JudilibreCredentialsMissingError();
    const res = await request(`${this.config.baseUrl}${path}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        KeyId: this.config.keyId,
      },
    });
    const text = await res.body.text();
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw new JudilibreHttpError(res.statusCode, path, text);
    }
    return text ? JSON.parse(text) : {};
  }
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run:

```bash
npm --prefix packages/core test -- judilibre-config.test.ts judilibre-client.test.ts
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add packages/core/src/judilibre packages/core/test/judilibre-config.test.ts packages/core/test/judilibre-client.test.ts
git commit -m "feat: add judilibre client"
```

---

### Task 3: Judilibre Formatters And MCP Tools

**Files:**
- Create: `packages/core/src/judilibre/format.ts`
- Create: `packages/core/src/tools/judilibre.ts`
- Create: `packages/core/test/judilibre-tools.test.ts`
- Modify: `packages/core/src/index.ts`

- [ ] **Step 1: Write tool tests**

Create `packages/core/test/judilibre-tools.test.ts`:

```ts
import { describe, expect, it, vi } from "vitest";
import { callJudilibreGetDecision, callJudilibreRecherche, callJudilibreStatus } from "../src/tools/judilibre.js";

function textFrom(result: { content: { type: "text"; text: string }[] }): string {
  return result.content[0]!.text;
}

describe("Judilibre tools", () => {
  it("reports status without leaking the key", async () => {
    const result = await callJudilibreStatus({
      env: "production",
      baseUrl: "https://api.piste.gouv.fr/cassation/judilibre/v1.0",
      keyId: "secret-value",
      keySource: "JUDILIBRE_KEY_ID",
    });

    const json = JSON.parse(textFrom(result)) as { hasKeyId: boolean; keyPreview: string };
    expect(json.hasKeyId).toBe(true);
    expect(json.keyPreview).toBe("secr…");
    expect(textFrom(result)).not.toContain("secret-value");
  });

  it("formats search results with official source metadata", async () => {
    const client = {
      search: vi.fn(async () => ({
        total: 1,
        results: [{ id: "abc", jurisdiction: "cc", chamber: "soc", decision_datetime: "2024-01-02", solution: "Cassation", ecli: "ECLI:FR:CCASS:2024:SO00001", text: "licenciement disciplinaire" }],
      })),
    };

    const result = await callJudilibreRecherche(client as never, { query: "licenciement", pageSize: 5 });

    expect(client.search).toHaveBeenCalledWith({ query: "licenciement", pageSize: 5, page: undefined });
    expect(textFrom(result)).toContain("Judilibre");
    expect(textFrom(result)).toContain("ECLI:FR:CCASS:2024:SO00001");
  });

  it("formats a decision by id", async () => {
    const client = {
      getDecision: vi.fn(async () => ({ id: "abc", chamber: "soc", text: "Motifs de la décision." })),
    };

    const result = await callJudilibreGetDecision(client as never, { id: "abc" });

    expect(client.getDecision).toHaveBeenCalledWith("abc");
    expect(textFrom(result)).toContain("Motifs de la décision");
    expect(textFrom(result)).toContain("abc");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
npm --prefix packages/core test -- judilibre-tools.test.ts
```

Expected: FAIL with missing tool module.

- [ ] **Step 3: Implement Judilibre formatters**

Create `packages/core/src/judilibre/format.ts`:

```ts
import type { JudilibreDecision, JudilibreSearchResponse } from "./schemas.js";

const COUR_DECISION_URL = "https://www.courdecassation.fr/decision";

function cleanText(value: string | undefined, max = 700): string {
  const text = (value ?? "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

export function judilibreDecisionUrl(id: string): string {
  return `${COUR_DECISION_URL}/${encodeURIComponent(id)}`;
}

export function formatJudilibreSearch(response: JudilibreSearchResponse, query: string): string {
  const lines = [`# Judilibre — résultats pour "${query}"`, "", `Total annoncé : ${response.total ?? response.results.length}`, ""];
  for (const item of response.results) {
    const id = item.id ?? "(id absent)";
    const meta = [item.jurisdiction, item.chamber, item.formation, item.decision_datetime, item.solution, item.ecli].filter(Boolean).join(" · ");
    lines.push(`## ${id}`);
    if (meta) lines.push(`_${meta}_`);
    if (item.text) lines.push(cleanText(item.text));
    if (item.id) lines.push(`[Cour de cassation](${judilibreDecisionUrl(item.id)})`);
    lines.push("");
  }
  lines.push(`Consultation : ${new Date().toISOString()}`);
  return lines.join("\n");
}

export function formatJudilibreDecision(decision: JudilibreDecision, idInput: string): string {
  const id = decision.id ?? idInput;
  const lines = [`# Judilibre — décision ${id}`];
  const meta = [decision.jurisdiction, decision.chamber, decision.formation, decision.decision_datetime, decision.solution, decision.ecli].filter(Boolean).join(" · ");
  if (meta) lines.push(`_${meta}_`, "");
  if (decision.text) {
    lines.push("## Texte", cleanText(decision.text, 6000), "");
  }
  lines.push(`[Cour de cassation](${judilibreDecisionUrl(id)})`);
  lines.push(`Consultation : ${new Date().toISOString()}`);
  return lines.join("\n");
}
```

- [ ] **Step 4: Implement Judilibre tool functions and registration**

Create `packages/core/src/tools/judilibre.ts`:

```ts
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { JudilibreConfig } from "../judilibre/config.js";
import { JudilibreClient } from "../judilibre/client.js";
import { formatJudilibreDecision, formatJudilibreSearch } from "../judilibre/format.js";

function textResult(text: string, isError?: true) {
  return { ...(isError ? { isError } : {}), content: [{ type: "text" as const, text }] };
}

export async function callJudilibreStatus(config: JudilibreConfig) {
  return textResult(JSON.stringify({
    env: config.env,
    baseUrl: config.baseUrl,
    hasKeyId: Boolean(config.keyId),
    keySource: config.keySource,
    keyPreview: config.keyId ? `${config.keyId.slice(0, 4)}…` : null,
    diagnostic: config.keyId ? "Judilibre configuré." : "Credential Judilibre manquant. Définissez JUDILIBRE_KEY_ID ou PISTE_KEY_ID.",
  }, null, 2));
}

export interface JudilibreRechercheArgs {
  query: string;
  pageSize?: number;
  page?: number;
}

export async function callJudilibreRecherche(client: Pick<JudilibreClient, "search">, args: JudilibreRechercheArgs) {
  try {
    const result = await client.search({ query: args.query, pageSize: args.pageSize, page: args.page });
    return textResult(formatJudilibreSearch(result, args.query));
  } catch (error) {
    return textResult(error instanceof Error ? error.message : String(error), true);
  }
}

export async function callJudilibreGetDecision(client: Pick<JudilibreClient, "getDecision">, args: { id: string }) {
  try {
    const result = await client.getDecision(args.id);
    return textResult(formatJudilibreDecision(result, args.id));
  } catch (error) {
    return textResult(error instanceof Error ? error.message : String(error), true);
  }
}

export function registerJudilibreTools(server: McpServer, config: JudilibreConfig, client = new JudilibreClient(config)) {
  server.registerTool("judilibre_status", {
    title: "État Judilibre",
    description: "Diagnostique la configuration Judilibre PISTE KeyId sans exposer le secret.",
    inputSchema: z.object({}).shape,
  }, () => callJudilibreStatus(config));

  server.registerTool("judilibre_recherche", {
    title: "Recherche Judilibre",
    description: "Recherche des décisions judiciaires open data via l'API Judilibre de la Cour de cassation.",
    inputSchema: {
      query: z.string().min(1),
      pageSize: z.number().int().min(1).max(50).default(10),
      page: z.number().int().min(0).optional(),
    },
  }, (args) => callJudilibreRecherche(client, args));

  server.registerTool("judilibre_get_decision", {
    title: "Consulter une décision Judilibre",
    description: "Récupère une décision Judilibre par identifiant.",
    inputSchema: { id: z.string().min(1) },
  }, (args) => callJudilibreGetDecision(client, args));
}
```

- [ ] **Step 5: Wire exports and registration**

Modify `packages/core/src/index.ts`:

```ts
import { loadJudilibreConfig } from "./judilibre/config.js";
import { registerJudilibreTools } from "./tools/judilibre.js";
```

Add exports near the existing tool exports:

```ts
export { loadJudilibreConfig } from "./judilibre/config.js";
export type { JudilibreConfig, JudilibreEnv } from "./judilibre/config.js";
export { JudilibreClient, JudilibreCredentialsMissingError, JudilibreHttpError } from "./judilibre/client.js";
export { registerJudilibreTools, callJudilibreStatus, callJudilibreRecherche, callJudilibreGetDecision } from "./tools/judilibre.js";
```

Inside `createHaciendaServer`, before `const server = ...`:

```ts
const judilibreConfig = loadJudilibreConfig();
```

After `registerBofipAliases(server, http);`:

```ts
registerJudilibreTools(server, judilibreConfig);
```

- [ ] **Step 6: Run tests and typecheck**

Run:

```bash
npm --prefix packages/core test -- judilibre-tools.test.ts
npm --prefix packages/core run typecheck
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add packages/core/src/judilibre/format.ts packages/core/src/tools/judilibre.ts packages/core/src/index.ts packages/core/test/judilibre-tools.test.ts
git commit -m "feat: add judilibre mcp tools"
```

---

### Task 4: BOSS Status And Safe Fetch Client

**Files:**
- Create: `packages/core/src/boss/client.ts`
- Create: `packages/core/src/boss/status.ts`
- Create: `packages/core/test/boss-client.test.ts`
- Create: `packages/core/test/boss-status.test.ts`
- Create: `packages/core/test/fixtures/boss/robots-allow.txt`
- Create: `packages/core/test/fixtures/boss/robots-disallow.txt`

- [ ] **Step 1: Add robot fixtures**

Create `packages/core/test/fixtures/boss/robots-allow.txt`:

```txt
User-agent: *
Allow: /
```

Create `packages/core/test/fixtures/boss/robots-disallow.txt`:

```txt
User-agent: *
Disallow: /
```

- [ ] **Step 2: Write BOSS client tests**

Create `packages/core/test/boss-client.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { assertBossUrl, BossRobotsUnavailableError, createBossRobotsGate } from "../src/boss/client.js";

describe("BOSS client URL guard", () => {
  it("accepts official HTTPS BOSS URLs", () => {
    expect(assertBossUrl("https://boss.gouv.fr/portail/accueil.html").href).toBe("https://boss.gouv.fr/portail/accueil.html");
  });

  it("rejects non-BOSS URLs", () => {
    expect(() => assertBossUrl("https://example.com/portail/accueil.html")).toThrow(/URL BOSS officielle/);
  });

  it("rejects HTTP URLs", () => {
    expect(() => assertBossUrl("http://boss.gouv.fr/portail/accueil.html")).toThrow(/HTTPS/);
  });
});

describe("BOSS robots gate", () => {
  it("allows crawl when robots allows the user agent", () => {
    const gate = createBossRobotsGate("https://boss.gouv.fr/robots.txt", "User-agent: *\nAllow: /\n");
    expect(gate.canFetch("https://boss.gouv.fr/portail/accueil.html")).toBe(true);
  });

  it("blocks crawl when robots disallows the user agent", () => {
    const gate = createBossRobotsGate("https://boss.gouv.fr/robots.txt", "User-agent: *\nDisallow: /\n");
    expect(gate.canFetch("https://boss.gouv.fr/portail/accueil.html")).toBe(false);
  });

  it("throws a typed error when indexing is requested without robots", () => {
    expect(() => createBossRobotsGate("https://boss.gouv.fr/robots.txt", "")).toThrow(BossRobotsUnavailableError);
  });
});
```

- [ ] **Step 3: Write BOSS status tests**

Create `packages/core/test/boss-status.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { diagnoseBossProbeError, probeBossStatusFromResponses } from "../src/boss/status.js";

describe("BOSS status", () => {
  it("reports usable when robots and homepage HTML are readable", () => {
    const status = probeBossStatusFromResponses({
      homeUrl: "https://boss.gouv.fr/portail/accueil.html",
      robots: { ok: true, allowed: true },
      homepage: { ok: true, statusCode: 200, contentType: "text/html", title: "Accueil - Boss.gouv.fr" },
      cacheEntries: 0,
    });

    expect(status.recommendation).toBe("utilisable");
    expect(status.canReadHtml).toBe(true);
  });

  it("reports robots_unavailable without allowing automatic indexing", () => {
    const status = probeBossStatusFromResponses({
      homeUrl: "https://boss.gouv.fr/portail/accueil.html",
      robots: { ok: false, error: "ECONNRESET" },
      homepage: { ok: true, statusCode: 200, contentType: "text/html", title: "Accueil - Boss.gouv.fr" },
      cacheEntries: 0,
    });

    expect(status.recommendation).toBe("robots indisponible");
    expect(status.robots.status).toBe("indisponible");
  });

  it("keeps ECONNRESET as a network-blocked diagnostic", () => {
    expect(diagnoseBossProbeError(new Error("read ECONNRESET"))).toContain("réseau bloqué");
  });
});
```

- [ ] **Step 4: Run tests to verify they fail**

Run:

```bash
npm --prefix packages/core test -- boss-client.test.ts boss-status.test.ts
```

Expected: FAIL with missing BOSS modules.

- [ ] **Step 5: Implement BOSS client**

Create `packages/core/src/boss/client.ts`:

```ts
import robotsParser from "robots-parser";
import { request } from "undici";

export const BOSS_HOME_URL = "https://boss.gouv.fr/portail/accueil.html";
export const BOSS_ORIGIN = "https://boss.gouv.fr";
export const BOSS_USER_AGENT = "HaciendaSourcesOfficielles/0.1 (+https://boss.gouv.fr)";

export class BossUrlError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BossUrlError";
  }
}

export class BossRobotsUnavailableError extends Error {
  constructor() {
    super("robots.txt BOSS indisponible : indexation automatique refusée par prudence.");
    this.name = "BossRobotsUnavailableError";
  }
}

export class BossRobotsBlockedError extends Error {
  constructor(url: string) {
    super(`robots.txt interdit le crawl de ${url}.`);
    this.name = "BossRobotsBlockedError";
  }
}

export function assertBossUrl(input: string): URL {
  const url = new URL(input);
  if (url.protocol !== "https:") throw new BossUrlError("Une URL BOSS officielle doit utiliser HTTPS.");
  if (url.hostname !== "boss.gouv.fr") throw new BossUrlError("URL BOSS officielle attendue sur boss.gouv.fr.");
  return url;
}

export function createBossRobotsGate(robotsUrl: string, body: string) {
  if (!body.trim()) throw new BossRobotsUnavailableError();
  const parser = robotsParser(robotsUrl, body);
  return {
    canFetch(url: string): boolean {
      return parser.isAllowed(url, BOSS_USER_AGENT) !== false;
    },
  };
}

export async function fetchBossText(urlInput: string): Promise<{ url: string; statusCode: number; contentType: string; text: string }> {
  const url = assertBossUrl(urlInput);
  const res = await request(url, {
    method: "GET",
    headers: {
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "user-agent": BOSS_USER_AGENT,
    },
  });
  const text = await res.body.text();
  return {
    url: url.href,
    statusCode: res.statusCode,
    contentType: String(res.headers["content-type"] ?? ""),
    text,
  };
}

export async function fetchBossDocumentWithRobots(urlInput: string, robotsBody: string) {
  const url = assertBossUrl(urlInput);
  const gate = createBossRobotsGate(`${BOSS_ORIGIN}/robots.txt`, robotsBody);
  if (!gate.canFetch(url.href)) throw new BossRobotsBlockedError(url.href);
  return fetchBossText(url.href);
}
```

- [ ] **Step 6: Implement BOSS status**

Create `packages/core/src/boss/status.ts`:

```ts
import { BOSS_HOME_URL } from "./client.js";

export interface BossProbeInput {
  homeUrl: string;
  robots: { ok: true; allowed: boolean } | { ok: false; error: string };
  homepage: { ok: true; statusCode: number; contentType: string; title?: string } | { ok: false; error: string };
  cacheEntries: number;
}

export interface BossStatus {
  homeUrl: string;
  network: "ok" | "bloqué" | "erreur";
  robots: { status: "lu" | "interdit" | "indisponible" | "erreur"; error?: string };
  canReadHtml: boolean;
  cacheEntries: number;
  lastError: string | null;
  recommendation: "utilisable" | "crawl bloqué" | "réseau bloqué" | "robots indisponible" | "parser à revoir";
}

export function diagnoseBossProbeError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  if (/ECONNRESET|fetch failed|socket|TLS/i.test(message)) {
    return `réseau bloqué ou coupure HTTPS applicative : ${message}`;
  }
  return message;
}

export function probeBossStatusFromResponses(input: BossProbeInput): BossStatus {
  const robotsStatus = input.robots.ok ? (input.robots.allowed ? "lu" : "interdit") : "indisponible";
  const canReadHtml = input.homepage.ok && input.homepage.statusCode === 200 && /html/i.test(input.homepage.contentType);
  const lastError = [
    input.robots.ok ? null : input.robots.error,
    input.homepage.ok ? null : input.homepage.error,
  ].filter(Boolean).join(" | ") || null;

  let recommendation: BossStatus["recommendation"] = "utilisable";
  if (!input.robots.ok) recommendation = "robots indisponible";
  else if (!input.robots.allowed) recommendation = "crawl bloqué";
  else if (!input.homepage.ok && /ECONNRESET|fetch failed|socket|TLS/i.test(input.homepage.error)) recommendation = "réseau bloqué";
  else if (!canReadHtml) recommendation = "parser à revoir";

  return {
    homeUrl: input.homeUrl,
    network: input.homepage.ok ? "ok" : recommendation === "réseau bloqué" ? "bloqué" : "erreur",
    robots: { status: robotsStatus, ...(!input.robots.ok ? { error: input.robots.error } : {}) },
    canReadHtml,
    cacheEntries: input.cacheEntries,
    lastError,
    recommendation,
  };
}

export function defaultBossStatusUnavailable(error: unknown): BossStatus {
  const diagnostic = diagnoseBossProbeError(error);
  return {
    homeUrl: BOSS_HOME_URL,
    network: diagnostic.includes("réseau bloqué") ? "bloqué" : "erreur",
    robots: { status: "indisponible", error: diagnostic },
    canReadHtml: false,
    cacheEntries: 0,
    lastError: diagnostic,
    recommendation: diagnostic.includes("réseau bloqué") ? "réseau bloqué" : "robots indisponible",
  };
}
```

- [ ] **Step 7: Run tests to verify they pass**

Run:

```bash
npm --prefix packages/core test -- boss-client.test.ts boss-status.test.ts
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add packages/core/src/boss/client.ts packages/core/src/boss/status.ts packages/core/test/boss-client.test.ts packages/core/test/boss-status.test.ts packages/core/test/fixtures/boss
git commit -m "feat: add boss safe fetch diagnostics"
```

---

### Task 5: BOSS Parser, Search Index, And Formatters

**Files:**
- Create: `packages/core/src/boss/parser.ts`
- Create: `packages/core/src/boss/index.ts`
- Create: `packages/core/src/boss/format.ts`
- Create: `packages/core/test/boss-parser.test.ts`
- Create: `packages/core/test/boss-index.test.ts`
- Create: `packages/core/test/fixtures/boss/avantages-en-nature.html`

- [ ] **Step 1: Add HTML fixture**

Create `packages/core/test/fixtures/boss/avantages-en-nature.html`:

```html
<!doctype html>
<html lang="fr">
  <head>
    <title>Avantages en nature - Boss.gouv.fr</title>
    <link rel="canonical" href="https://boss.gouv.fr/portail/accueil/autres-elements-de-remuneration/avantages-en-nature.html">
  </head>
  <body>
    <nav aria-label="Fil d'Ariane">
      <a>Accueil</a><a>Autres éléments de rémunération</a>
    </nav>
    <main>
      <h1>Avantages en nature</h1>
      <h2 id="titre-chapitre-1">Chapitre 1 - Principes généraux</h2>
      <p>Les avantages en nature sont soumis à cotisations sociales.</p>
      <h3 id="titre-section-1">Section 1 - Nourriture</h3>
      <p>La nourriture peut être évaluée forfaitairement.</p>
    </main>
  </body>
</html>
```

- [ ] **Step 2: Write parser tests**

Create `packages/core/test/boss-parser.test.ts`:

```ts
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { parseBossDocument } from "../src/boss/parser.js";

describe("parseBossDocument", () => {
  it("extracts title, canonical URL, breadcrumb, sections and text", () => {
    const html = readFileSync(resolve(__dirname, "fixtures/boss/avantages-en-nature.html"), "utf-8");
    const doc = parseBossDocument(html, "https://boss.gouv.fr/portail/accueil/autres-elements-de-remuneration/avantages-en-nature.html");

    expect(doc.title).toBe("Avantages en nature");
    expect(doc.canonicalUrl).toBe("https://boss.gouv.fr/portail/accueil/autres-elements-de-remuneration/avantages-en-nature.html");
    expect(doc.breadcrumb).toContain("Autres éléments de rémunération");
    expect(doc.sections.map((s) => s.heading)).toContain("Chapitre 1 - Principes généraux");
    expect(doc.text).toContain("soumis à cotisations sociales");
  });
});
```

- [ ] **Step 3: Write index tests**

Create `packages/core/test/boss-index.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { buildBossSearchIndex, searchBossIndex } from "../src/boss/index.js";

describe("BOSS search index", () => {
  it("finds documents by normalized words and returns stable scores", () => {
    const index = buildBossSearchIndex([
      {
        id: "avantages-en-nature",
        title: "Avantages en nature",
        canonicalUrl: "https://boss.gouv.fr/portail/accueil/autres-elements-de-remuneration/avantages-en-nature.html",
        breadcrumb: ["Accueil", "Autres éléments de rémunération"],
        text: "Les avantages en nature sont soumis à cotisations sociales.",
        sections: [],
        retrievedAt: "2026-05-14T18:00:00.000Z",
      },
    ]);

    const hits = searchBossIndex(index, { query: "cotisations avantages", pageSize: 5 });

    expect(hits).toHaveLength(1);
    expect(hits[0]!.source).toBe("BOSS");
    expect(hits[0]!.title).toBe("Avantages en nature");
    expect(hits[0]!.score).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 4: Run tests to verify they fail**

Run:

```bash
npm --prefix packages/core test -- boss-parser.test.ts boss-index.test.ts
```

Expected: FAIL with missing parser/index modules.

- [ ] **Step 5: Implement parser**

Create `packages/core/src/boss/parser.ts`:

```ts
import * as cheerio from "cheerio";

export interface BossSection {
  id?: string;
  heading: string;
  text: string;
}

export interface BossDocument {
  id: string;
  title: string;
  canonicalUrl: string;
  breadcrumb: string[];
  text: string;
  sections: BossSection[];
  retrievedAt: string;
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function idFromUrl(url: string): string {
  const parsed = new URL(url);
  return parsed.pathname.split("/").filter(Boolean).at(-1)?.replace(/\.html$/, "") ?? parsed.pathname;
}

export function parseBossDocument(html: string, sourceUrl: string, retrievedAt = new Date().toISOString()): BossDocument {
  const $ = cheerio.load(html);
  const canonicalUrl = $("link[rel='canonical']").attr("href") ?? sourceUrl;
  const main = $("main").first();
  const title = normalizeText(main.find("h1").first().text() || $("title").text().replace(/ - Boss\.gouv\.fr$/i, ""));
  const breadcrumb = $("nav[aria-label*='Ariane'] a, nav[aria-label*='Fil'] a")
    .map((_, el) => normalizeText($(el).text()))
    .get()
    .filter(Boolean);

  const sections: BossSection[] = [];
  main.find("h2, h3").each((_, heading) => {
    const h = $(heading);
    const parts: string[] = [];
    let cursor = h.next();
    while (cursor.length && !["h2", "h3"].includes(cursor.get(0)?.tagName?.toLowerCase() ?? "")) {
      const text = normalizeText(cursor.text());
      if (text) parts.push(text);
      cursor = cursor.next();
    }
    sections.push({ id: h.attr("id"), heading: normalizeText(h.text()), text: parts.join("\n\n") });
  });

  return {
    id: idFromUrl(canonicalUrl),
    title,
    canonicalUrl,
    breadcrumb,
    text: normalizeText(main.text()),
    sections,
    retrievedAt,
  };
}
```

- [ ] **Step 6: Implement index and formatters**

Create `packages/core/src/boss/index.ts`:

```ts
import type { SourceSearchHit } from "../sources/types.js";
import type { BossDocument } from "./parser.js";

export interface BossSearchIndex {
  documents: BossDocument[];
}

export interface BossSearchArgs {
  query: string;
  rubrique?: string;
  pageSize?: number;
}

function normalize(value: string): string[] {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .split(/[^a-z0-9]+/u)
    .filter((token) => token.length > 1);
}

export function buildBossSearchIndex(documents: BossDocument[]): BossSearchIndex {
  return { documents: [...documents] };
}

export function searchBossIndex(index: BossSearchIndex, args: BossSearchArgs): SourceSearchHit[] {
  const queryTokens = normalize(args.query);
  const hits = index.documents
    .filter((doc) => !args.rubrique || doc.breadcrumb.join(" ").toLowerCase().includes(args.rubrique.toLowerCase()))
    .map((doc) => {
      const haystack = normalize(`${doc.title} ${doc.breadcrumb.join(" ")} ${doc.text}`);
      const score = queryTokens.reduce((sum, token) => sum + haystack.filter((word) => word === token).length, 0);
      return { doc, score };
    })
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, args.pageSize ?? 10);

  return hits.map(({ doc, score }) => ({
    source: "BOSS",
    id: doc.id,
    title: doc.title,
    url: doc.canonicalUrl,
    retrievedAt: doc.retrievedAt,
    excerpt: doc.text.slice(0, 400),
    score,
  }));
}
```

Create `packages/core/src/boss/format.ts`:

```ts
import type { SourceSearchHit } from "../sources/types.js";
import type { BossDocument } from "./parser.js";

export function formatBossSearchResults(hits: SourceSearchHit[], query: string): string {
  const lines = [`# BOSS — résultats pour "${query}"`, ""];
  if (!hits.length) return `${lines.join("\n")}Aucun résultat dans l'index BOSS local.`;
  for (const hit of hits) {
    lines.push(`## ${hit.title}`);
    lines.push(`Score : ${hit.score ?? 0}`);
    if (hit.excerpt) lines.push(hit.excerpt);
    lines.push(`[BOSS](${hit.url})`);
    lines.push(`Consultation : ${hit.retrievedAt}`);
    lines.push("");
  }
  return lines.join("\n");
}

export function formatBossDocument(doc: BossDocument): string {
  const lines = [`# BOSS — ${doc.title}`, ""];
  if (doc.breadcrumb.length) lines.push(`_${doc.breadcrumb.join(" > ")}_`, "");
  for (const section of doc.sections) {
    lines.push(`## ${section.heading}`);
    if (section.text) lines.push(section.text, "");
  }
  if (!doc.sections.length) lines.push(doc.text, "");
  lines.push(`[BOSS](${doc.canonicalUrl})`);
  lines.push(`Consultation : ${doc.retrievedAt}`);
  return lines.join("\n");
}
```

- [ ] **Step 7: Run tests to verify they pass**

Run:

```bash
npm --prefix packages/core test -- boss-parser.test.ts boss-index.test.ts
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add packages/core/src/boss/parser.ts packages/core/src/boss/index.ts packages/core/src/boss/format.ts packages/core/test/boss-parser.test.ts packages/core/test/boss-index.test.ts packages/core/test/fixtures/boss/avantages-en-nature.html
git commit -m "feat: add boss parser and search index"
```

---

### Task 6: BOSS MCP Tools And Server Wiring

**Files:**
- Create: `packages/core/src/tools/boss.ts`
- Create: `packages/core/test/boss-tools.test.ts`
- Modify: `packages/core/src/index.ts`
- Modify: `packages/core/test/smoke.test.ts`

- [ ] **Step 1: Write BOSS tool tests**

Create `packages/core/test/boss-tools.test.ts`:

```ts
import { describe, expect, it, vi } from "vitest";
import { callBossGetDocument, callBossRecherche, callBossStatus } from "../src/tools/boss.js";

function textFrom(result: { content: { type: "text"; text: string }[] }): string {
  return result.content[0]!.text;
}

const bossDoc = {
  id: "avantages-en-nature",
  title: "Avantages en nature",
  canonicalUrl: "https://boss.gouv.fr/portail/accueil/autres-elements-de-remuneration/avantages-en-nature.html",
  breadcrumb: ["Accueil", "Autres éléments de rémunération"],
  text: "Les avantages en nature sont soumis à cotisations sociales.",
  sections: [{ heading: "Chapitre 1", text: "Les avantages en nature sont soumis à cotisations sociales." }],
  retrievedAt: "2026-05-14T18:00:00.000Z",
};

describe("BOSS tools", () => {
  it("returns JSON status", async () => {
    const result = await callBossStatus(async () => ({
      homeUrl: "https://boss.gouv.fr/portail/accueil.html",
      network: "ok",
      robots: { status: "lu" },
      canReadHtml: true,
      cacheEntries: 0,
      lastError: null,
      recommendation: "utilisable",
    }));

    expect(JSON.parse(textFrom(result)).recommendation).toBe("utilisable");
  });

  it("searches the supplied local index", async () => {
    const result = await callBossRecherche([bossDoc], { query: "cotisations", pageSize: 5 });

    expect(textFrom(result)).toContain("Avantages en nature");
    expect(textFrom(result)).toContain("https://boss.gouv.fr/");
  });

  it("fetches and parses an explicit BOSS URL", async () => {
    const fetcher = vi.fn(async () => ({
      url: bossDoc.canonicalUrl,
      statusCode: 200,
      contentType: "text/html",
      text: "<main><h1>Avantages en nature</h1><p>Cotisations sociales.</p></main>",
    }));

    const result = await callBossGetDocument(fetcher, { url: bossDoc.canonicalUrl });

    expect(fetcher).toHaveBeenCalledWith(bossDoc.canonicalUrl);
    expect(textFrom(result)).toContain("Avantages en nature");
  });
});
```

- [ ] **Step 2: Run tool tests to verify they fail**

Run:

```bash
npm --prefix packages/core test -- boss-tools.test.ts
```

Expected: FAIL with missing tool module.

- [ ] **Step 3: Implement BOSS tools**

Create `packages/core/src/tools/boss.ts`:

```ts
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BOSS_HOME_URL, fetchBossText } from "../boss/client.js";
import { formatBossDocument, formatBossSearchResults } from "../boss/format.js";
import { buildBossSearchIndex, searchBossIndex } from "../boss/index.js";
import { parseBossDocument, type BossDocument } from "../boss/parser.js";
import { defaultBossStatusUnavailable, probeBossStatusFromResponses, type BossStatus } from "../boss/status.js";

function textResult(text: string, isError?: true) {
  return { ...(isError ? { isError } : {}), content: [{ type: "text" as const, text }] };
}

export async function callBossStatus(probe: () => Promise<BossStatus>) {
  try {
    return textResult(JSON.stringify(await probe(), null, 2));
  } catch (error) {
    return textResult(JSON.stringify(defaultBossStatusUnavailable(error), null, 2));
  }
}

export async function callBossRecherche(documents: BossDocument[], args: { query: string; rubrique?: string; pageSize?: number }) {
  const index = buildBossSearchIndex(documents);
  const hits = searchBossIndex(index, args);
  return textResult(formatBossSearchResults(hits, args.query));
}

export async function callBossGetDocument(
  fetcher: (url: string) => Promise<{ url: string; statusCode: number; contentType: string; text: string }>,
  args: { url: string },
) {
  try {
    const response = await fetcher(args.url);
    if (response.statusCode !== 200 || !/html/i.test(response.contentType)) {
      return textResult(`Réponse BOSS inexploitable: HTTP ${response.statusCode}, content-type ${response.contentType}`, true);
    }
    return textResult(formatBossDocument(parseBossDocument(response.text, response.url)));
  } catch (error) {
    return textResult(error instanceof Error ? error.message : String(error), true);
  }
}

async function liveBossProbe(): Promise<BossStatus> {
  try {
    const [robots, homepage] = await Promise.allSettled([
      fetchBossText("https://boss.gouv.fr/robots.txt"),
      fetchBossText(BOSS_HOME_URL),
    ]);
    return probeBossStatusFromResponses({
      homeUrl: BOSS_HOME_URL,
      robots: robots.status === "fulfilled" && robots.value.statusCode === 200
        ? { ok: true, allowed: !/Disallow:\s*\/\s*$/m.test(robots.value.text) }
        : { ok: false, error: robots.status === "rejected" ? String(robots.reason) : `HTTP ${robots.value.statusCode}` },
      homepage: homepage.status === "fulfilled"
        ? { ok: true, statusCode: homepage.value.statusCode, contentType: homepage.value.contentType }
        : { ok: false, error: String(homepage.reason) },
      cacheEntries: 0,
    });
  } catch (error) {
    return defaultBossStatusUnavailable(error);
  }
}

export function registerBossTools(server: McpServer, documents: BossDocument[] = []) {
  server.registerTool("boss_status", {
    title: "État BOSS",
    description: "Diagnostique l'accès à boss.gouv.fr sans lancer d'indexation.",
    inputSchema: z.object({}).shape,
  }, () => callBossStatus(liveBossProbe));

  server.registerTool("boss_recherche", {
    title: "Recherche BOSS",
    description: "Recherche dans l'index local BOSS officiel.",
    inputSchema: {
      query: z.string().min(1),
      rubrique: z.string().optional(),
      pageSize: z.number().int().min(1).max(50).default(10),
    },
  }, (args) => callBossRecherche(documents, args));

  server.registerTool("boss_get_document", {
    title: "Consulter BOSS",
    description: "Récupère une URL officielle boss.gouv.fr et retourne un document structuré.",
    inputSchema: { url: z.string().url() },
  }, (args) => callBossGetDocument(fetchBossText, args));
}
```

- [ ] **Step 4: Wire exports and registration**

Modify `packages/core/src/index.ts`:

```ts
import { registerBossTools } from "./tools/boss.js";
```

Add exports:

```ts
export { registerBossTools, callBossStatus, callBossRecherche, callBossGetDocument } from "./tools/boss.js";
export { BOSS_HOME_URL, BOSS_ORIGIN, BOSS_USER_AGENT, assertBossUrl, fetchBossText } from "./boss/client.js";
export { parseBossDocument } from "./boss/parser.js";
export type { BossDocument, BossSection } from "./boss/parser.js";
```

After `registerJudilibreTools(server, judilibreConfig);`:

```ts
registerBossTools(server);
```

- [ ] **Step 5: Update smoke expected tool list**

In `packages/core/test/smoke.test.ts`, append these names to `expected`:

```ts
"judilibre_status",
"judilibre_recherche",
"judilibre_get_decision",
"boss_status",
"boss_recherche",
"boss_get_document",
```

- [ ] **Step 6: Run tests to verify they pass**

Run:

```bash
npm --prefix packages/core test -- boss-tools.test.ts smoke.test.ts
npm --prefix packages/core run typecheck
```

Expected: PASS. If `smoke.test.ts` fails because plugin dist is stale, run `npm run build` at repo root, then repeat the smoke test.

- [ ] **Step 7: Commit**

```bash
git add packages/core/src/tools/boss.ts packages/core/src/index.ts packages/core/test/boss-tools.test.ts packages/core/test/smoke.test.ts
git commit -m "feat: add boss mcp tools"
```

---

### Task 7: Final Verification And Documentation Sync

**Files:**
- Modify: `docs/superpowers/specs/2026-05-14-hacienda-judilibre-boss-sources-design.md` only if implementation reveals a factual mismatch

- [ ] **Step 1: Verify BOSS dependency decision**

Run:

```bash
npm --prefix packages/core ls cheerio robots-parser p-limit playwright puppeteer crawlee
```

Expected: all listed packages are absent. BOSS v1 uses the internal conservative parser/robots gate and does not add Playwright, Puppeteer, Crawlee, Cheerio, robots-parser, or p-limit.

- [ ] **Step 2: Run package tests**

Run:

```bash
npm --prefix packages/core test
```

Expected: PASS.

- [ ] **Step 3: Run typecheck**

Run:

```bash
npm --prefix packages/core run typecheck
```

Expected: PASS.

- [ ] **Step 4: Run build**

Run:

```bash
npm --prefix packages/core run build
```

Expected: PASS and updated `packages/core/dist` only if the repo tracks build output. If `dist` is ignored, no source diff appears from this command.

- [ ] **Step 5: Verify dependency constraint**

Run:

```bash
npm ls --workspace packages/core cheerio robots-parser p-limit playwright puppeteer crawlee
```

Expected: all listed packages absent or unmet, because none are required by BOSS v1.

- [ ] **Step 6: Review diff for secrets and accidental source changes**

Run:

```bash
git diff -- packages/core docs/superpowers
```

Expected: no credentials, no generated fixture from URLScan, no broad rebrand churn.

- [ ] **Step 7: Commit**

```bash
git add docs/superpowers/specs/2026-05-14-hacienda-judilibre-boss-sources-design.md docs/superpowers/plans/2026-05-14-hacienda-judilibre-boss-sources.md
git commit -m "docs: align boss source dependency plan"
```

---

## Final Verification

- [ ] Run full repo build:

```bash
npm run build
```

Expected: PASS.

- [ ] Run full core tests:

```bash
npm --prefix packages/core test
```

Expected: PASS.

- [ ] Run final git status:

```bash
git status --short
```

Expected: clean worktree after commits, or only intentional uncommitted files called out in the final response.

## Self-Review

Spec coverage:

- Judilibre config/client/status/search/get decision: Tasks 2 and 3.
- BOSS status/probe/robots/network diagnostics: Task 4 and Task 6.
- BOSS HTML parsing/index/search/get document: Task 5 and Task 6.
- MCP tool listing and startup without credentials: Task 6 smoke update.
- No browser automation and no unused BOSS dependencies: Task 7.
- Proof-ready official URLs and consultation timestamps: Tasks 3 and 5.

Placeholder scan:

- No placeholder markers, no open-ended error handling instruction, and each code-changing step includes concrete code or exact edits.

Type consistency:

- `BossDocument`, `BossStatus`, `JudilibreConfig`, `JudilibreClient`, and tool function names match across tasks.
