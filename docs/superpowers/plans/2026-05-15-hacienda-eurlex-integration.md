# Hacienda EUR-Lex Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add EUR-Lex to the Hacienda official sources layer with status, search, consult by CELEX, and metadata tools.

**Architecture:** Implement EUR-Lex natively in `packages/core`, following the existing BOSS and Judilibre patterns: focused source modules, injectable network clients, MCP handlers in `packages/core/src/tools`, exports from `packages/core/src/index.ts`, and refreshed plugin bundles. The implementation targets the current code layout and does not perform the full Hacienda rebrand.

**Tech Stack:** TypeScript, Node 20+, undici, Zod v4, Vitest, MCP SDK `server.registerTool`, existing esbuild bundle scripts.

---

## Scope

Implement:

- `eurlex_status`
- `eurlex_recherche`
- `eurlex_consulter`
- `eurlex_metadata`

Do not implement in this MVP:

- `eurlex_consolidated`
- `eurlex_citations`
- `eurlex_eurovoc`
- full repository rebranding

## Files

Create:

- `packages/core/src/eurlex/celex.ts`
- `packages/core/src/eurlex/types.ts`
- `packages/core/src/eurlex/client.ts`
- `packages/core/src/eurlex/search.ts`
- `packages/core/src/eurlex/format.ts`
- `packages/core/src/eurlex/status.ts`
- `packages/core/src/tools/eurlex.ts`
- `packages/core/test/eurlex-celex.test.ts`
- `packages/core/test/eurlex-client.test.ts`
- `packages/core/test/eurlex-search.test.ts`
- `packages/core/test/eurlex-format.test.ts`
- `packages/core/test/eurlex-status.test.ts`
- `packages/core/test/eurlex-tools.test.ts`
- `packages/core/test/fixtures/eurlex/search-ai-act.json`
- `packages/core/test/fixtures/eurlex/metadata-gdpr.json`
- `packages/core/test/fixtures/eurlex/gdpr.xhtml`

Modify:

- `packages/core/src/sources/types.ts`
- `packages/core/src/index.ts`
- `packages/core/test/sources.test.ts`
- `packages/core/test/smoke.test.ts`
- generated plugin bundles under `plugins/*/mcp-server/dist/index.js`

## Task 1: Source Type

- [ ] **Step 1: Write failing test**

Update `packages/core/test/sources.test.ts` to expect:

```ts
expect(OFFICIAL_SOURCES).toEqual(["LEGIFRANCE", "BOFIP", "JUDILIBRE", "BOSS", "EURLEX"]);
const source: OfficialSource = "EURLEX";
expect(source).toBe("EURLEX");
```

- [ ] **Step 2: Run failing test**

```bash
npm --prefix packages/core test -- sources.test.ts
```

Expected: fails because `EURLEX` is absent.

- [ ] **Step 3: Implement**

Update `packages/core/src/sources/types.ts`:

```ts
export type OfficialSource = "LEGIFRANCE" | "BOFIP" | "JUDILIBRE" | "BOSS" | "EURLEX";

export const OFFICIAL_SOURCES = ["LEGIFRANCE", "BOFIP", "JUDILIBRE", "BOSS", "EURLEX"] as const satisfies readonly OfficialSource[];
```

- [ ] **Step 4: Verify and commit**

```bash
npm --prefix packages/core test -- sources.test.ts
git add packages/core/src/sources/types.ts packages/core/test/sources.test.ts
git commit -m "feat: add eurlex official source type"
```

## Task 2: CELEX Helpers

- [ ] **Step 1: Write tests**

Create `packages/core/test/eurlex-celex.test.ts` covering:

- `normalizeCelexId(" 32024r1689 ")` returns `32024R1689`
- `normalizeCelexId("62014cj0131")` returns `62014CJ0131`
- `normalizeCelexId("02016R0679-20160504")` returns same uppercase value
- invalid CELEX values throw `CELEX invalide`
- `eurlexDocumentUrl("32024R1689", "FRA")` returns `https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R1689`
- `publicationsCelexUrl("32024R1689")` returns `https://publications.europa.eu/resource/celex/32024R1689`

- [ ] **Step 2: Run failing test**

```bash
npm --prefix packages/core test -- eurlex-celex.test.ts
```

Expected: module missing.

- [ ] **Step 3: Implement**

Create `packages/core/src/eurlex/celex.ts` with:

```ts
export type EurlexLanguage = "FRA" | "ENG" | "DEU";

const CELEX_PATTERN = /^[0-9][0-9A-Z]{4,}(?:-[0-9]{8})?$/u;
const LANGUAGE_PATH: Record<EurlexLanguage, string> = { FRA: "FR", ENG: "EN", DEU: "DE" };

export class EurlexCelexError extends Error {
  constructor(input: string) {
    super(`CELEX invalide: ${input}. Exemple attendu: 32024R1689, 32016R0679 ou 62014CJ0131.`);
    this.name = "EurlexCelexError";
  }
}

export function normalizeCelexId(input: string): string {
  return input.trim().toUpperCase();
}

export function assertCelexId(input: string): string {
  const celexId = normalizeCelexId(input);
  if (!CELEX_PATTERN.test(celexId)) throw new EurlexCelexError(input);
  return celexId;
}

export function eurlexDocumentUrl(input: string, language: EurlexLanguage = "FRA"): string {
  const celexId = assertCelexId(input);
  return `https://eur-lex.europa.eu/legal-content/${LANGUAGE_PATH[language]}/TXT/?uri=CELEX:${celexId}`;
}

export function publicationsCelexUrl(input: string): string {
  return `https://publications.europa.eu/resource/celex/${assertCelexId(input)}`;
}
```

- [ ] **Step 4: Verify and commit**

```bash
npm --prefix packages/core test -- eurlex-celex.test.ts
git add packages/core/src/eurlex/celex.ts packages/core/test/eurlex-celex.test.ts
git commit -m "feat: add eurlex celex helpers"
```

## Task 3: Client

- [ ] **Step 1: Add fixtures**

Create:

- `packages/core/test/fixtures/eurlex/search-ai-act.json` with duplicated `32024R1689` SPARQL binding.
- `packages/core/test/fixtures/eurlex/metadata-gdpr.json` with one `32016R0679` metadata binding.
- `packages/core/test/fixtures/eurlex/gdpr.xhtml` containing a short XHTML paragraph.

- [ ] **Step 2: Write tests**

Create `packages/core/test/eurlex-client.test.ts` using `MockAgent`.

Cover:

- `escapeSparqlString`
- `buildSearchQuery`
- `search` deduplicates CELEX
- `fetchDocument` calls `/resource/celex/32016R0679`
- `metadata` maps title, dates, resource type, authors, EuroVoc and directory codes

- [ ] **Step 3: Run failing tests**

```bash
npm --prefix packages/core test -- eurlex-client.test.ts
```

Expected: modules missing.

- [ ] **Step 4: Implement types**

Create `packages/core/src/eurlex/types.ts` with:

- `EurlexResourceType`
- `EurlexSearchArgs`
- `EurlexSearchResult`
- `EurlexSearchResponse`
- `EurlexMetadata`

Use language type from `celex.ts`.

- [ ] **Step 5: Implement client**

Create `packages/core/src/eurlex/client.ts`.

Requirements:

- use `undici.request`
- optional `Dispatcher` constructor argument
- constants `SPARQL_ENDPOINT`, `CELLAR_REST_BASE`, `EURLEX_REQUEST_TIMEOUT_MS`
- `EurlexHttpError`
- `escapeSparqlString`
- `buildSearchQuery`
- `search`
- `fetchDocument`
- `buildMetadataQuery`
- `metadata`
- explicit `headersTimeout` and `bodyTimeout`
- default language `FRA`
- default resource type `any`
- default limit `10`
- deduplicate search results by CELEX

- [ ] **Step 6: Verify and commit**

```bash
npm --prefix packages/core test -- eurlex-client.test.ts
git add packages/core/src/eurlex/types.ts packages/core/src/eurlex/client.ts packages/core/test/eurlex-client.test.ts packages/core/test/fixtures/eurlex
git commit -m "feat: add eurlex cellar client"
```

## Task 4: Mapping And Formatting

- [ ] **Step 1: Write tests**

Create:

- `packages/core/test/eurlex-search.test.ts`
- `packages/core/test/eurlex-format.test.ts`

Cover `SourceSearchHit` mapping, Markdown search output, XHTML stripping, truncation, document formatting and metadata formatting.

- [ ] **Step 2: Run failing tests**

```bash
npm --prefix packages/core test -- eurlex-search.test.ts eurlex-format.test.ts
```

Expected: modules missing.

- [ ] **Step 3: Implement search mapping**

Create `packages/core/src/eurlex/search.ts`:

```ts
import type { SourceSearchHit } from "../sources/types.js";
import type { EurlexSearchResult } from "./types.js";

export function mapEurlexSearchHits(results: EurlexSearchResult[], retrievedAt = new Date().toISOString()): SourceSearchHit[] {
  return results.map((result, index) => ({
    source: "EURLEX",
    id: result.celexId,
    title: result.title,
    url: result.url,
    retrievedAt,
    date: result.date || undefined,
    excerpt: `Type EUR-Lex: ${result.resourceType}`,
    score: Math.max(1, results.length - index),
  }));
}
```

- [ ] **Step 4: Implement formatting**

Create `packages/core/src/eurlex/format.ts` with:

- `formatEurlexSearchResults`
- `formatEurlexDocument`
- `formatEurlexMetadata`
- `stripXhtml`
- `truncateText`

Output must include CELEX, official EUR-Lex URL, language, retrieval date and truncation status where applicable.

- [ ] **Step 5: Verify and commit**

```bash
npm --prefix packages/core test -- eurlex-search.test.ts eurlex-format.test.ts
git add packages/core/src/eurlex/search.ts packages/core/src/eurlex/format.ts packages/core/test/eurlex-search.test.ts packages/core/test/eurlex-format.test.ts
git commit -m "feat: format eurlex source results"
```

## Task 5: Status

- [ ] **Step 1: Write tests**

Create `packages/core/test/eurlex-status.test.ts`.

Cover:

- both probes pass -> `network: "ok"`
- search only passes -> `network: "partiel"`
- no probe passes -> `network: "erreur"`
- `defaultEurlexStatusUnavailable(new Error("socket closed"))`

- [ ] **Step 2: Run failing test**

```bash
npm --prefix packages/core test -- eurlex-status.test.ts
```

Expected: module missing.

- [ ] **Step 3: Implement**

Create `packages/core/src/eurlex/status.ts` with:

- `EurlexStatusProbeResponse`
- `EurlexStatusInput`
- `EurlexStatus`
- `probeEurlexStatusFromResponses`
- `defaultEurlexStatusUnavailable`

- [ ] **Step 4: Verify and commit**

```bash
npm --prefix packages/core test -- eurlex-status.test.ts
git add packages/core/src/eurlex/status.ts packages/core/test/eurlex-status.test.ts
git commit -m "feat: add eurlex status diagnostics"
```

## Task 6: MCP Tools

- [ ] **Step 1: Write tests**

Create `packages/core/test/eurlex-tools.test.ts`.

Use injected fake clients to test:

- `callEurlexRecherche`
- `callEurlexConsulter`
- `callEurlexMetadata`
- `callEurlexStatus`
- error paths with `isError: true`

- [ ] **Step 2: Run failing test**

```bash
npm --prefix packages/core test -- eurlex-tools.test.ts
```

Expected: tool module missing.

- [ ] **Step 3: Implement**

Create `packages/core/src/tools/eurlex.ts`.

Must export:

- `EurlexRechercheArgs`
- `EurlexConsulterArgs`
- `EurlexMetadataArgs`
- `EurlexProbe`
- `callEurlexStatus`
- `callEurlexRecherche`
- `callEurlexConsulter`
- `callEurlexMetadata`
- `registerEurlexTools`

Use `server.registerTool`, not `server.tool`.

Schemas:

- `query`: string min 3 max 500
- `resource_type`: resource type enum, default `any`
- `language`: `FRA | ENG | DEU`, default `FRA`
- `limit`: int 1..50, default 10
- `date_from` and `date_to`: optional `YYYY-MM-DD`
- `celex_id`: string min 5
- `format`: `plain | xhtml`, default `plain`
- `max_chars`: int 1000..50000, default 20000

- [ ] **Step 4: Verify and commit**

```bash
npm --prefix packages/core test -- eurlex-tools.test.ts eurlex-format.test.ts eurlex-search.test.ts
git add packages/core/src/tools/eurlex.ts packages/core/test/eurlex-tools.test.ts
git commit -m "feat: add eurlex mcp tools"
```

## Task 7: Exports And Registration

- [ ] **Step 1: Update smoke test first**

Modify `packages/core/test/smoke.test.ts` to expect:

```ts
"eurlex_status",
"eurlex_recherche",
"eurlex_consulter",
"eurlex_metadata",
```

- [ ] **Step 2: Run failing smoke test**

```bash
npm --prefix packages/core test -- smoke.test.ts
```

Expected: tools missing.

- [ ] **Step 3: Export APIs**

Modify `packages/core/src/index.ts` to export client, CELEX helpers, formatters, search mapper, status helpers, types and tool handlers.

- [ ] **Step 4: Register tools**

In `packages/core/src/index.ts`, import `registerEurlexTools` and call it after `registerBossTools(server);`.

- [ ] **Step 5: Verify and commit**

```bash
npm --prefix packages/core test -- smoke.test.ts eurlex-tools.test.ts sources.test.ts
npm --prefix packages/core run typecheck
git add packages/core/src/index.ts packages/core/test/smoke.test.ts
git commit -m "feat: register eurlex tools"
```

## Task 8: Full Verification And Bundles

- [ ] **Step 1: Full tests**

```bash
npm --prefix packages/core test
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

- [ ] **Step 3: Build**

```bash
npm run build
```

- [ ] **Step 4: Commit bundles**

```bash
git add plugins/berryer/mcp-server/dist/index.js plugins/berryer-social/mcp-server/dist/index.js plugins/berryer-affaires/mcp-server/dist/index.js
git commit -m "build: refresh bundles for eurlex tools"
```

## Task 9: Optional Live Smoke

- [ ] **Step 1: Build core**

```bash
npm --prefix packages/core run build
```

- [ ] **Step 2: Live search**

```bash
node --input-type=module -e "import { EurlexClient } from './packages/core/dist/index.js'; const c = new EurlexClient(); const r = await c.search({ query: 'intelligence artificielle', language: 'FRA', limit: 3 }); console.log(JSON.stringify({ count: r.results.length, first: r.results[0] }, null, 2));"
```

Expected: `count` greater than `0`.

- [ ] **Step 3: Live fetch**

```bash
node --input-type=module -e "import { EurlexClient } from './packages/core/dist/index.js'; const c = new EurlexClient(); const text = await c.fetchDocument('32016R0679', 'FRA'); console.log(text.length);"
```

Expected: length greater than `1000`.

If the public endpoint times out, mocked tests remain authoritative for the MVP; report the live endpoint failure separately.

## Self-Review

- Source model: Task 1.
- CELEX: Task 2.
- SPARQL and REST: Task 3.
- Mapping and formatting: Task 4.
- Status: Task 5.
- MCP tools: Task 6.
- Registration: Task 7.
- Verification and bundles: Task 8.
- Live smoke: Task 9.
- No full rebrand.
- No phase 2 tools.
- No runtime dependency on `eurlex-mcp-server`.
