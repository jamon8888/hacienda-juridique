# Hacienda EUR-Lex V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add advanced EUR-Lex V2 tools for consolidated versions, citations, EuroVoc, document lifecycle views, and available Cellar formats.

**Architecture:** Extend the existing EUR-Lex V1 modules in `packages/core/src/eurlex` with focused V2 modules instead of expanding `client.ts`. Each module owns typed query builders, mapping, formatting, and tests; `packages/core/src/tools/eurlex.ts` only adapts these capabilities into MCP handlers.

**Tech Stack:** TypeScript, Node 20+, undici, Zod v4, Vitest, MCP SDK `server.registerTool`, existing Hacienda core build.

---

## Current Baseline

EUR-Lex V1 already provides:

- `packages/core/src/eurlex/celex.ts`
- `packages/core/src/eurlex/client.ts`
- `packages/core/src/eurlex/format.ts`
- `packages/core/src/eurlex/search.ts`
- `packages/core/src/eurlex/status.ts`
- `packages/core/src/eurlex/types.ts`
- `packages/core/src/tools/eurlex.ts`

Existing MCP tools:

- `eurlex_status`
- `eurlex_recherche`
- `eurlex_consulter`
- `eurlex_metadata`

V2 adds:

- `eurlex_consolidated`
- `eurlex_citations`
- `eurlex_eurovoc`
- `eurlex_versions`
- `eurlex_formats`

## Files

Create:

- `packages/core/src/eurlex/consolidated.ts`
- `packages/core/src/eurlex/citations.ts`
- `packages/core/src/eurlex/eurovoc.ts`
- `packages/core/src/eurlex/versions.ts`
- `packages/core/src/eurlex/formats.ts`
- `packages/core/test/eurlex-consolidated.test.ts`
- `packages/core/test/eurlex-citations.test.ts`
- `packages/core/test/eurlex-eurovoc.test.ts`
- `packages/core/test/eurlex-versions.test.ts`
- `packages/core/test/eurlex-formats.test.ts`
- `packages/core/test/eurlex-v2-tools.test.ts`
- `packages/core/test/fixtures/eurlex/consolidated-gdpr.json`
- `packages/core/test/fixtures/eurlex/citations-gdpr.json`
- `packages/core/test/fixtures/eurlex/eurovoc-gdpr.json`
- `packages/core/test/fixtures/eurlex/formats-gdpr.json`

Modify:

- `packages/core/src/eurlex/types.ts`
- `packages/core/src/eurlex/client.ts`
- `packages/core/src/tools/eurlex.ts`
- `packages/core/src/index.ts`
- `packages/core/test/smoke.test.ts`

---

## Task 1: Shared V2 Types And Cache Keys

**Files:**

- Modify: `packages/core/src/eurlex/types.ts`
- Test: `packages/core/test/eurlex-v2-types.test.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/core/test/eurlex-v2-types.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  buildEurlexV2CacheKey,
  type EurlexAvailableFormat,
  type EurlexConsolidatedVersion,
  type EurlexEurovocConcept,
  type EurlexRelation,
} from "../src/eurlex/types.js";

describe("EUR-Lex V2 shared types", () => {
  it("models consolidated versions, relations, EuroVoc and formats", () => {
    const version: EurlexConsolidatedVersion = {
      celexId: "02016R0679-20160504",
      baseCelexId: "32016R0679",
      dateVersion: "2016-05-04",
      language: "FRA",
      url: "https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:02016R0679-20160504",
      title: "RGPD consolidé",
    };
    const relation: EurlexRelation = {
      kind: "amended_by",
      sourceCelexId: "32016R0679",
      targetCelexId: "32018R1725",
      title: "Acte modificateur",
      date: "2018-10-23",
      url: "https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32018R1725",
    };
    const concept: EurlexEurovocConcept = {
      id: "1234",
      label: "protection des données",
      language: "FRA",
      uri: "http://eurovoc.europa.eu/1234",
    };
    const format: EurlexAvailableFormat = {
      celexId: "32016R0679",
      language: "FRA",
      format: "xhtml",
      url: "https://publications.europa.eu/resource/cellar/gdpr/full",
      contentType: "application/xhtml+xml",
    };

    expect(version.baseCelexId).toBe("32016R0679");
    expect(relation.kind).toBe("amended_by");
    expect(concept.uri).toBe("http://eurovoc.europa.eu/1234");
    expect(format.format).toBe("xhtml");
  });

  it("builds stable V2 cache keys", () => {
    expect(buildEurlexV2CacheKey("citations", ["32016R0679", "both", "FRA"])).toBe(
      "eurlex:citations:32016R0679:both:FRA",
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm --prefix packages/core test -- eurlex-v2-types.test.ts
```

Expected: FAIL because V2 types and `buildEurlexV2CacheKey` are not exported.

- [ ] **Step 3: Implement shared types**

Append to `packages/core/src/eurlex/types.ts`:

```ts
export interface EurlexConsolidatedVersion {
  celexId: string;
  baseCelexId: string;
  dateVersion: string;
  language: EurlexLanguage;
  url: string;
  title?: string;
}

export type EurlexRelationKind = "amends" | "amended_by" | "cites" | "cited_by" | "repeals" | "repealed_by" | "basis";

export interface EurlexRelation {
  kind: EurlexRelationKind;
  sourceCelexId: string;
  targetCelexId: string;
  title?: string;
  date?: string;
  url: string;
}

export interface EurlexEurovocConcept {
  id: string;
  label: string;
  language: EurlexLanguage;
  uri: string;
}

export type EurlexDocumentFormat = "html" | "xhtml" | "xml" | "pdf" | "rdf" | "txt";

export interface EurlexAvailableFormat {
  celexId: string;
  language: EurlexLanguage;
  format: EurlexDocumentFormat;
  url: string;
  contentType?: string;
}

export type EurlexV2CacheNamespace = "consolidated" | "citations" | "eurovoc" | "formats" | "versions";

export function buildEurlexV2CacheKey(namespace: EurlexV2CacheNamespace, parts: readonly string[]): string {
  return ["eurlex", namespace, ...parts.map((part) => part.trim())].join(":");
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm --prefix packages/core test -- eurlex-v2-types.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/core/src/eurlex/types.ts packages/core/test/eurlex-v2-types.test.ts
git commit -m "feat: add eurlex v2 shared types"
```

---

## Task 2: Consolidated Versions Module

**Files:**

- Create: `packages/core/src/eurlex/consolidated.ts`
- Test: `packages/core/test/eurlex-consolidated.test.ts`
- Fixture: `packages/core/test/fixtures/eurlex/consolidated-gdpr.json`

- [ ] **Step 1: Add fixture**

Create `packages/core/test/fixtures/eurlex/consolidated-gdpr.json`:

```json
{
  "head": { "vars": ["celex", "title", "dateVersion"] },
  "results": {
    "bindings": [
      {
        "celex": { "type": "literal", "value": "02016R0679-20160504" },
        "title": { "type": "literal", "value": "Règlement général sur la protection des données - version consolidée" },
        "dateVersion": { "type": "literal", "value": "2016-05-04" }
      },
      {
        "celex": { "type": "literal", "value": "02016R0679-20180525" },
        "title": { "type": "literal", "value": "Règlement général sur la protection des données - version applicable" },
        "dateVersion": { "type": "literal", "value": "2018-05-25" }
      }
    ]
  }
}
```

- [ ] **Step 2: Write the failing test**

Create `packages/core/test/eurlex-consolidated.test.ts`:

```ts
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  buildConsolidatedVersionsQuery,
  findNearestConsolidatedVersion,
  formatEurlexConsolidatedVersions,
  mapConsolidatedVersions,
} from "../src/eurlex/consolidated.js";

const fixture = JSON.parse(
  readFileSync(join(import.meta.dirname, "fixtures", "eurlex", "consolidated-gdpr.json"), "utf8"),
) as unknown;

describe("EUR-Lex consolidated versions", () => {
  it("builds a typed SPARQL query for consolidated versions", () => {
    const query = buildConsolidatedVersionsQuery("32016R0679", "FRA");

    expect(query).toContain("02016R0679");
    expect(query).toContain("owl:sameAs");
    expect(query).toContain("cdm:expression_title");
    expect(query).not.toContain("SELECT *");
  });

  it("maps consolidated versions and finds the nearest version", () => {
    const versions = mapConsolidatedVersions(fixture, "32016R0679", "FRA");

    expect(versions).toHaveLength(2);
    expect(versions[0]).toMatchObject({ celexId: "02016R0679-20160504", baseCelexId: "32016R0679" });
    expect(findNearestConsolidatedVersion(versions, "2018-01-01")?.celexId).toBe("02016R0679-20160504");
    expect(findNearestConsolidatedVersion(versions, "2018-06-01")?.celexId).toBe("02016R0679-20180525");
  });

  it("formats consolidated versions as Markdown", () => {
    const versions = mapConsolidatedVersions(fixture, "32016R0679", "FRA");
    const output = formatEurlexConsolidatedVersions(versions, "32016R0679", "2026-05-15T10:00:00.000Z");

    expect(output).toContain("# Versions consolidées EUR-Lex - 32016R0679");
    expect(output).toContain("02016R0679-20180525");
    expect(output).toContain("Consulté le 2026-05-15T10:00:00.000Z");
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

```bash
npm --prefix packages/core test -- eurlex-consolidated.test.ts
```

Expected: FAIL because `../src/eurlex/consolidated.js` does not exist.

- [ ] **Step 4: Implement module**

Create `packages/core/src/eurlex/consolidated.ts`:

```ts
import { assertCelexId, eurlexDocumentUrl, type EurlexLanguage } from "./celex.js";
import type { EurlexConsolidatedVersion } from "./types.js";

type SparqlValue = { value?: string };
type SparqlBinding = Record<string, SparqlValue | undefined>;
type SparqlResponse = { results?: { bindings?: SparqlBinding[] } };

export function buildConsolidatedVersionsQuery(celexIdInput: string, language: EurlexLanguage = "FRA"): string {
  const celexId = assertCelexId(celexIdInput);
  const consolidatedPrefix = `0${celexId.slice(1)}`;

  return [
    "PREFIX cdm: <http://publications.europa.eu/ontology/cdm#>",
    "PREFIX owl: <http://www.w3.org/2002/07/owl#>",
    "PREFIX purl: <http://purl.org/dc/elements/1.1/>",
    "SELECT DISTINCT ?celex ?title ?dateVersion WHERE {",
    "  ?work owl:sameAs ?celexUri .",
    `  FILTER(STRSTARTS(STR(?celexUri), "http://publications.europa.eu/resource/celex/${consolidatedPrefix}"))`,
    '  BIND(REPLACE(STR(?celexUri), "^.*resource/celex/", "") AS ?celex)',
    "  OPTIONAL {",
    "    ?expr cdm:expression_belongs_to_work ?work ;",
    "          cdm:expression_uses_language ?lang ;",
    "          cdm:expression_title ?title .",
    "    ?lang purl:identifier ?langCode .",
    `    FILTER(STR(?langCode) = "${language}")`,
    "  }",
    "  BIND(REPLACE(?celex, \"^.*-\", \"\") AS ?rawDateVersion)",
    "  BIND(CONCAT(SUBSTR(?rawDateVersion, 1, 4), \"-\", SUBSTR(?rawDateVersion, 5, 2), \"-\", SUBSTR(?rawDateVersion, 7, 2)) AS ?dateVersion)",
    "}",
    "ORDER BY ?dateVersion",
  ].join("\n");
}

export function mapConsolidatedVersions(
  response: unknown,
  baseCelexIdInput: string,
  language: EurlexLanguage = "FRA",
): EurlexConsolidatedVersion[] {
  const baseCelexId = assertCelexId(baseCelexIdInput);
  const bindings = (response as SparqlResponse).results?.bindings ?? [];

  return bindings
    .map((binding) => {
      const celexId = binding.celex?.value;
      const dateVersion = binding.dateVersion?.value;

      if (!celexId || !dateVersion) {
        return undefined;
      }

      return {
        celexId,
        baseCelexId,
        dateVersion,
        language,
        url: eurlexDocumentUrl(celexId, language),
        title: binding.title?.value,
      } satisfies EurlexConsolidatedVersion;
    })
    .filter((value): value is EurlexConsolidatedVersion => Boolean(value));
}

export function findNearestConsolidatedVersion(
  versions: EurlexConsolidatedVersion[],
  date: string,
): EurlexConsolidatedVersion | undefined {
  const sorted = [...versions].sort((a, b) => a.dateVersion.localeCompare(b.dateVersion));
  return sorted.filter((version) => version.dateVersion <= date).at(-1) ?? sorted[0];
}

export function formatEurlexConsolidatedVersions(
  versions: EurlexConsolidatedVersion[],
  baseCelexId: string,
  retrievedAt = new Date().toISOString(),
): string {
  const header = `# Versions consolidées EUR-Lex - ${baseCelexId}`;
  if (versions.length === 0) {
    return `${header}\n\nAucune version consolidée trouvée.\n\nConsulté le ${retrievedAt}`;
  }

  const rows = versions.map((version, index) =>
    [
      `## ${index + 1}. ${version.celexId}`,
      version.title,
      `Date version: ${version.dateVersion}`,
      `Langue: ${version.language}`,
      `URL EUR-Lex: ${version.url}`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [header, ...rows, `Consulté le ${retrievedAt}`].join("\n\n");
}
```

- [ ] **Step 5: Verify and commit**

```bash
npm --prefix packages/core test -- eurlex-consolidated.test.ts
git add packages/core/src/eurlex/consolidated.ts packages/core/test/eurlex-consolidated.test.ts packages/core/test/fixtures/eurlex/consolidated-gdpr.json
git commit -m "feat: add eurlex consolidated versions"
```

---

## Task 3: Citations And Legal Relations Module

**Files:**

- Create: `packages/core/src/eurlex/citations.ts`
- Test: `packages/core/test/eurlex-citations.test.ts`
- Fixture: `packages/core/test/fixtures/eurlex/citations-gdpr.json`

- [ ] **Step 1: Add fixture**

Create `packages/core/test/fixtures/eurlex/citations-gdpr.json`:

```json
{
  "head": { "vars": ["kind", "sourceCelex", "targetCelex", "title", "date"] },
  "results": {
    "bindings": [
      {
        "kind": { "type": "literal", "value": "amended_by" },
        "sourceCelex": { "type": "literal", "value": "32016R0679" },
        "targetCelex": { "type": "literal", "value": "32018R1725" },
        "title": { "type": "literal", "value": "Règlement modificateur" },
        "date": { "type": "literal", "value": "2018-10-23" }
      },
      {
        "kind": { "type": "literal", "value": "basis" },
        "sourceCelex": { "type": "literal", "value": "32016R0679" },
        "targetCelex": { "type": "literal", "value": "12012E016" },
        "title": { "type": "literal", "value": "Base juridique TFUE" },
        "date": { "type": "literal", "value": "2012-10-26" }
      }
    ]
  }
}
```

- [ ] **Step 2: Write failing test**

Create `packages/core/test/eurlex-citations.test.ts`:

```ts
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  buildEurlexRelationsQuery,
  formatEurlexRelations,
  mapEurlexRelations,
} from "../src/eurlex/citations.js";

const fixture = JSON.parse(readFileSync(join(import.meta.dirname, "fixtures", "eurlex", "citations-gdpr.json"), "utf8"));

describe("EUR-Lex citations and relations", () => {
  it("builds relation queries without exposing arbitrary SPARQL", () => {
    const query = buildEurlexRelationsQuery({ celexId: "32016R0679", direction: "both", relation: "amended_by", language: "FRA", limit: 25 });

    expect(query).toContain("32016R0679");
    expect(query).toContain("amended_by");
    expect(query).toContain("LIMIT 25");
    expect(query).not.toContain("SELECT *");
  });

  it("maps relation bindings to typed relations", () => {
    const relations = mapEurlexRelations(fixture, "FRA");

    expect(relations).toHaveLength(2);
    expect(relations[0]).toMatchObject({
      kind: "amended_by",
      sourceCelexId: "32016R0679",
      targetCelexId: "32018R1725",
    });
  });

  it("formats relation tables", () => {
    const output = formatEurlexRelations(mapEurlexRelations(fixture, "FRA"), "32016R0679", "2026-05-15T10:00:00.000Z");

    expect(output).toContain("# Relations EUR-Lex - 32016R0679");
    expect(output).toContain("amended_by");
    expect(output).toContain("32018R1725");
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

```bash
npm --prefix packages/core test -- eurlex-citations.test.ts
```

Expected: FAIL because `citations.ts` does not exist.

- [ ] **Step 4: Implement module**

Create `packages/core/src/eurlex/citations.ts`:

```ts
import { assertCelexId, eurlexDocumentUrl, type EurlexLanguage } from "./celex.js";
import type { EurlexRelation, EurlexRelationKind } from "./types.js";

export interface EurlexRelationsQueryArgs {
  celexId: string;
  relation?: EurlexRelationKind;
  direction?: "incoming" | "outgoing" | "both";
  language?: EurlexLanguage;
  limit?: number;
}

type SparqlValue = { value?: string };
type SparqlBinding = Record<string, SparqlValue | undefined>;
type SparqlResponse = { results?: { bindings?: SparqlBinding[] } };

export function buildEurlexRelationsQuery(args: EurlexRelationsQueryArgs): string {
  const celexId = assertCelexId(args.celexId);
  const direction = args.direction ?? "both";
  const limit = Math.min(100, Math.max(1, Math.trunc(args.limit ?? 25)));
  const relationFilter = args.relation ? `FILTER(?kind = "${args.relation}")` : "";

  return [
    "PREFIX cdm: <http://publications.europa.eu/ontology/cdm#>",
    "PREFIX owl: <http://www.w3.org/2002/07/owl#>",
    "SELECT ?kind ?sourceCelex ?targetCelex ?title ?date WHERE {",
    `  BIND("${celexId}" AS ?pivotCelex)`,
    `  BIND("${direction}" AS ?direction)`,
    "  ?source owl:sameAs ?sourceUri .",
    "  ?target owl:sameAs ?targetUri .",
    '  FILTER(STRSTARTS(STR(?sourceUri), "http://publications.europa.eu/resource/celex/"))',
    '  FILTER(STRSTARTS(STR(?targetUri), "http://publications.europa.eu/resource/celex/"))',
    '  BIND(REPLACE(STR(?sourceUri), "^.*resource/celex/", "") AS ?sourceCelex)',
    '  BIND(REPLACE(STR(?targetUri), "^.*resource/celex/", "") AS ?targetCelex)',
    "  VALUES ?kind { \"amends\" \"amended_by\" \"cites\" \"cited_by\" \"repeals\" \"repealed_by\" \"basis\" }",
    "  FILTER(?sourceCelex = ?pivotCelex || ?targetCelex = ?pivotCelex)",
    '  FILTER(?direction = "both" || (?direction = "outgoing" && ?sourceCelex = ?pivotCelex) || (?direction = "incoming" && ?targetCelex = ?pivotCelex))',
    relationFilter,
    "  OPTIONAL { ?target cdm:work_date_document ?date . }",
    "  OPTIONAL { ?target cdm:resource_legal_title ?title . }",
    "}",
    `LIMIT ${limit}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function mapEurlexRelations(response: unknown, language: EurlexLanguage = "FRA"): EurlexRelation[] {
  const bindings = (response as SparqlResponse).results?.bindings ?? [];

  return bindings
    .map((binding) => {
      const kind = binding.kind?.value as EurlexRelationKind | undefined;
      const sourceCelexId = binding.sourceCelex?.value;
      const targetCelexId = binding.targetCelex?.value;

      if (!kind || !sourceCelexId || !targetCelexId) {
        return undefined;
      }

      return {
        kind,
        sourceCelexId,
        targetCelexId,
        title: binding.title?.value,
        date: binding.date?.value,
        url: eurlexDocumentUrl(targetCelexId, language),
      } satisfies EurlexRelation;
    })
    .filter((value): value is EurlexRelation => Boolean(value));
}

export function formatEurlexRelations(relations: EurlexRelation[], celexId: string, retrievedAt = new Date().toISOString()): string {
  const header = `# Relations EUR-Lex - ${celexId}`;
  if (relations.length === 0) {
    return `${header}\n\nAucune relation trouvée.\n\nConsulté le ${retrievedAt}`;
  }

  const rows = relations.map((relation) =>
    [
      `- ${relation.kind}: ${relation.sourceCelexId} -> ${relation.targetCelexId}`,
      relation.title ? `  Titre: ${relation.title}` : undefined,
      relation.date ? `  Date: ${relation.date}` : undefined,
      `  URL: ${relation.url}`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [header, ...rows, `Consulté le ${retrievedAt}`].join("\n\n");
}
```

- [ ] **Step 5: Verify and commit**

```bash
npm --prefix packages/core test -- eurlex-citations.test.ts
git add packages/core/src/eurlex/citations.ts packages/core/test/eurlex-citations.test.ts packages/core/test/fixtures/eurlex/citations-gdpr.json
git commit -m "feat: add eurlex citations mapping"
```

---

## Task 4: EuroVoc Module

**Files:**

- Create: `packages/core/src/eurlex/eurovoc.ts`
- Test: `packages/core/test/eurlex-eurovoc.test.ts`
- Fixture: `packages/core/test/fixtures/eurlex/eurovoc-gdpr.json`

- [ ] **Step 1: Add fixture**

Create `packages/core/test/fixtures/eurlex/eurovoc-gdpr.json`:

```json
{
  "head": { "vars": ["concept", "label"] },
  "results": {
    "bindings": [
      {
        "concept": { "type": "uri", "value": "http://eurovoc.europa.eu/1234" },
        "label": { "type": "literal", "value": "protection des données" }
      },
      {
        "concept": { "type": "uri", "value": "http://eurovoc.europa.eu/5678" },
        "label": { "type": "literal", "value": "vie privée" }
      }
    ]
  }
}
```

- [ ] **Step 2: Write failing test**

Create `packages/core/test/eurlex-eurovoc.test.ts`:

```ts
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  assertEurovocUri,
  buildEurovocQuery,
  formatEurlexEurovocConcepts,
  mapEurovocConcepts,
} from "../src/eurlex/eurovoc.js";

const fixture = JSON.parse(readFileSync(join(import.meta.dirname, "fixtures", "eurlex", "eurovoc-gdpr.json"), "utf8"));

describe("EUR-Lex EuroVoc", () => {
  it("validates EuroVoc URIs", () => {
    expect(assertEurovocUri("http://eurovoc.europa.eu/1234")).toBe("http://eurovoc.europa.eu/1234");
    expect(() => assertEurovocUri("https://example.com/1234")).toThrow("URI EuroVoc invalide");
  });

  it("requires at least one query input", () => {
    expect(() => buildEurovocQuery({ language: "FRA" })).toThrow("au moins un critère");
  });

  it("builds query by CELEX and maps concepts", () => {
    const query = buildEurovocQuery({ celexId: "32016R0679", language: "FRA", limit: 20 });
    const concepts = mapEurovocConcepts(fixture, "FRA");

    expect(query).toContain("32016R0679");
    expect(query).toContain("LIMIT 20");
    expect(concepts).toEqual([
      { id: "1234", label: "protection des données", language: "FRA", uri: "http://eurovoc.europa.eu/1234" },
      { id: "5678", label: "vie privée", language: "FRA", uri: "http://eurovoc.europa.eu/5678" },
    ]);
  });

  it("formats concepts", () => {
    const output = formatEurlexEurovocConcepts(mapEurovocConcepts(fixture, "FRA"), "32016R0679", "2026-05-15T10:00:00.000Z");

    expect(output).toContain("# Concepts EuroVoc EUR-Lex - 32016R0679");
    expect(output).toContain("protection des données");
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

```bash
npm --prefix packages/core test -- eurlex-eurovoc.test.ts
```

Expected: FAIL because `eurovoc.ts` does not exist.

- [ ] **Step 4: Implement module**

Create `packages/core/src/eurlex/eurovoc.ts`:

```ts
import { assertCelexId, type EurlexLanguage } from "./celex.js";
import { escapeSparqlString } from "./client.js";
import type { EurlexEurovocConcept } from "./types.js";

type SparqlValue = { value?: string };
type SparqlBinding = Record<string, SparqlValue | undefined>;
type SparqlResponse = { results?: { bindings?: SparqlBinding[] } };

export interface EurlexEurovocQueryArgs {
  celexId?: string;
  conceptUri?: string;
  query?: string;
  language?: EurlexLanguage;
  limit?: number;
}

export function assertEurovocUri(input: string): string {
  const uri = input.trim();
  if (!/^http:\/\/eurovoc\.europa\.eu\/[A-Za-z0-9_-]+$/u.test(uri)) {
    throw new Error(`URI EuroVoc invalide: ${input}`);
  }
  return uri;
}

export function buildEurovocQuery(args: EurlexEurovocQueryArgs): string {
  const language = args.language ?? "FRA";
  const limit = Math.min(50, Math.max(1, Math.trunc(args.limit ?? 20)));

  if (!args.celexId && !args.conceptUri && !args.query) {
    throw new Error("eurlex_eurovoc exige au moins un critère: celex_id, concept_uri ou query.");
  }

  const filters: string[] = [];
  if (args.celexId) {
    filters.push(`FILTER(?celex = "${assertCelexId(args.celexId)}")`);
  }
  if (args.conceptUri) {
    filters.push(`FILTER(?concept = <${assertEurovocUri(args.conceptUri)}>)`);
  }
  if (args.query) {
    filters.push(`FILTER(CONTAINS(LCASE(?label), LCASE("${escapeSparqlString(args.query)}")))`);
  }

  return [
    "PREFIX cdm: <http://publications.europa.eu/ontology/cdm#>",
    "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>",
    "PREFIX owl: <http://www.w3.org/2002/07/owl#>",
    "SELECT DISTINCT ?concept ?label WHERE {",
    "  ?work owl:sameAs ?celexUri .",
    '  FILTER(STRSTARTS(STR(?celexUri), "http://publications.europa.eu/resource/celex/"))',
    '  BIND(REPLACE(STR(?celexUri), "^.*resource/celex/", "") AS ?celex)',
    "  ?work cdm:resource_legal_is_about_concept_eurovoc ?concept .",
    "  ?concept skos:prefLabel ?label .",
    `  FILTER(LANG(?label) = "${language.toLowerCase()}")`,
    ...filters.map((filter) => `  ${filter}`),
    "}",
    `LIMIT ${limit}`,
  ].join("\n");
}

export function mapEurovocConcepts(response: unknown, language: EurlexLanguage = "FRA"): EurlexEurovocConcept[] {
  const bindings = (response as SparqlResponse).results?.bindings ?? [];
  return bindings
    .map((binding) => {
      const uri = binding.concept?.value;
      const label = binding.label?.value;
      if (!uri || !label) {
        return undefined;
      }
      return {
        id: uri.replace(/^.*\//u, ""),
        label,
        language,
        uri,
      } satisfies EurlexEurovocConcept;
    })
    .filter((value): value is EurlexEurovocConcept => Boolean(value));
}

export function formatEurlexEurovocConcepts(
  concepts: EurlexEurovocConcept[],
  subject: string,
  retrievedAt = new Date().toISOString(),
): string {
  const header = `# Concepts EuroVoc EUR-Lex - ${subject}`;
  if (concepts.length === 0) {
    return `${header}\n\nAucun concept EuroVoc trouvé.\n\nConsulté le ${retrievedAt}`;
  }

  const rows = concepts.map((concept) => `- ${concept.label} (${concept.id})\n  URI: ${concept.uri}`);
  return [header, ...rows, `Consulté le ${retrievedAt}`].join("\n\n");
}
```

- [ ] **Step 5: Verify and commit**

```bash
npm --prefix packages/core test -- eurlex-eurovoc.test.ts
git add packages/core/src/eurlex/eurovoc.ts packages/core/test/eurlex-eurovoc.test.ts packages/core/test/fixtures/eurlex/eurovoc-gdpr.json
git commit -m "feat: add eurlex eurovoc support"
```

---

## Task 5: Formats Module

**Files:**

- Create: `packages/core/src/eurlex/formats.ts`
- Test: `packages/core/test/eurlex-formats.test.ts`
- Fixture: `packages/core/test/fixtures/eurlex/formats-gdpr.json`

- [ ] **Step 1: Add fixture**

Create `packages/core/test/fixtures/eurlex/formats-gdpr.json`:

```json
[
  {
    "celexId": "32016R0679",
    "language": "FRA",
    "format": "xhtml",
    "url": "https://publications.europa.eu/resource/cellar/gdpr/full",
    "contentType": "application/xhtml+xml"
  },
  {
    "celexId": "32016R0679",
    "language": "FRA",
    "format": "pdf",
    "url": "https://eur-lex.europa.eu/legal-content/FR/TXT/PDF/?uri=CELEX:32016R0679",
    "contentType": "application/pdf"
  }
]
```

- [ ] **Step 2: Write failing test**

Create `packages/core/test/eurlex-formats.test.ts`:

```ts
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  buildEurlexFormatCandidates,
  filterEurlexFormats,
  formatEurlexAvailableFormats,
} from "../src/eurlex/formats.js";
import type { EurlexAvailableFormat } from "../src/eurlex/types.js";

const fixture = JSON.parse(readFileSync(join(import.meta.dirname, "fixtures", "eurlex", "formats-gdpr.json"), "utf8")) as EurlexAvailableFormat[];

describe("EUR-Lex formats", () => {
  it("builds candidate URLs for known formats", () => {
    const candidates = buildEurlexFormatCandidates("32016R0679", "FRA");

    expect(candidates.map((candidate) => candidate.format)).toContain("xhtml");
    expect(candidates.map((candidate) => candidate.format)).toContain("pdf");
    expect(candidates[0]?.celexId).toBe("32016R0679");
  });

  it("filters formats by language and format", () => {
    expect(filterEurlexFormats(fixture, { language: "FRA", format: "pdf" })).toHaveLength(1);
  });

  it("formats available formats", () => {
    const output = formatEurlexAvailableFormats(fixture, "32016R0679", "2026-05-15T10:00:00.000Z");

    expect(output).toContain("# Formats EUR-Lex - 32016R0679");
    expect(output).toContain("application/pdf");
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

```bash
npm --prefix packages/core test -- eurlex-formats.test.ts
```

Expected: FAIL because `formats.ts` does not exist.

- [ ] **Step 4: Implement module**

Create `packages/core/src/eurlex/formats.ts`:

```ts
import { assertCelexId, eurlexDocumentUrl, publicationsCelexUrl, type EurlexLanguage } from "./celex.js";
import type { EurlexAvailableFormat, EurlexDocumentFormat } from "./types.js";

export interface EurlexFormatFilter {
  language?: EurlexLanguage;
  format?: EurlexDocumentFormat;
}

export function buildEurlexFormatCandidates(celexIdInput: string, language: EurlexLanguage = "FRA"): EurlexAvailableFormat[] {
  const celexId = assertCelexId(celexIdInput);
  const htmlUrl = eurlexDocumentUrl(celexId, language);

  return [
    { celexId, language, format: "xhtml", url: publicationsCelexUrl(celexId), contentType: "application/xhtml+xml" },
    { celexId, language, format: "html", url: htmlUrl, contentType: "text/html" },
    { celexId, language, format: "pdf", url: htmlUrl.replace("/TXT/?", "/TXT/PDF/?"), contentType: "application/pdf" },
    { celexId, language, format: "xml", url: htmlUrl.replace("/TXT/?", "/TXT/XML/?"), contentType: "application/xml" },
    { celexId, language, format: "rdf", url: publicationsCelexUrl(celexId), contentType: "application/rdf+xml" },
    { celexId, language, format: "txt", url: htmlUrl, contentType: "text/plain" },
  ];
}

export function filterEurlexFormats(formats: EurlexAvailableFormat[], filter: EurlexFormatFilter): EurlexAvailableFormat[] {
  return formats.filter((format) => {
    if (filter.language && format.language !== filter.language) {
      return false;
    }
    if (filter.format && format.format !== filter.format) {
      return false;
    }
    return true;
  });
}

export function formatEurlexAvailableFormats(
  formats: EurlexAvailableFormat[],
  celexId: string,
  retrievedAt = new Date().toISOString(),
): string {
  const header = `# Formats EUR-Lex - ${celexId}`;
  if (formats.length === 0) {
    return `${header}\n\nAucun format disponible trouvé.\n\nConsulté le ${retrievedAt}`;
  }

  const rows = formats.map((format) =>
    [
      `- ${format.format} (${format.language})`,
      `  URL: ${format.url}`,
      format.contentType ? `  Content-Type: ${format.contentType}` : undefined,
      `  Récupérable par Hacienda: ${format.format === "pdf" ? "non en texte brut" : "oui"}`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [header, ...rows, `Consulté le ${retrievedAt}`].join("\n\n");
}
```

- [ ] **Step 5: Verify and commit**

```bash
npm --prefix packages/core test -- eurlex-formats.test.ts
git add packages/core/src/eurlex/formats.ts packages/core/test/eurlex-formats.test.ts packages/core/test/fixtures/eurlex/formats-gdpr.json
git commit -m "feat: add eurlex format diagnostics"
```

---

## Task 6: Versions Lifecycle Module

**Files:**

- Create: `packages/core/src/eurlex/versions.ts`
- Test: `packages/core/test/eurlex-versions.test.ts`

- [ ] **Step 1: Write failing test**

Create `packages/core/test/eurlex-versions.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { formatEurlexLifecycle, mergeEurlexLifecycle } from "../src/eurlex/versions.js";
import type { EurlexConsolidatedVersion, EurlexRelation } from "../src/eurlex/types.js";

describe("EUR-Lex lifecycle versions", () => {
  it("merges initial act, consolidations and relations into a lifecycle view", () => {
    const consolidations: EurlexConsolidatedVersion[] = [
      {
        celexId: "02016R0679-20180525",
        baseCelexId: "32016R0679",
        dateVersion: "2018-05-25",
        language: "FRA",
        url: "https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:02016R0679-20180525",
      },
    ];
    const relations: EurlexRelation[] = [
      {
        kind: "amended_by",
        sourceCelexId: "32016R0679",
        targetCelexId: "32018R1725",
        url: "https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32018R1725",
      },
    ];

    const lifecycle = mergeEurlexLifecycle({ celexId: "32016R0679", language: "FRA", consolidations, relations });

    expect(lifecycle.initialAct.celexId).toBe("32016R0679");
    expect(lifecycle.consolidations).toHaveLength(1);
    expect(lifecycle.relations).toHaveLength(1);
  });

  it("formats lifecycle output", () => {
    const lifecycle = mergeEurlexLifecycle({ celexId: "32016R0679", language: "FRA", consolidations: [], relations: [] });
    const output = formatEurlexLifecycle(lifecycle, "2026-05-15T10:00:00.000Z");

    expect(output).toContain("# Cycle de vie EUR-Lex - 32016R0679");
    expect(output).toContain("Acte initial");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm --prefix packages/core test -- eurlex-versions.test.ts
```

Expected: FAIL because `versions.ts` does not exist.

- [ ] **Step 3: Implement module**

Create `packages/core/src/eurlex/versions.ts`:

```ts
import { assertCelexId, eurlexDocumentUrl, type EurlexLanguage } from "./celex.js";
import type { EurlexConsolidatedVersion, EurlexRelation } from "./types.js";

export interface EurlexLifecycle {
  initialAct: {
    celexId: string;
    language: EurlexLanguage;
    url: string;
  };
  consolidations: EurlexConsolidatedVersion[];
  relations: EurlexRelation[];
}

export interface MergeEurlexLifecycleArgs {
  celexId: string;
  language: EurlexLanguage;
  consolidations: EurlexConsolidatedVersion[];
  relations: EurlexRelation[];
}

export function mergeEurlexLifecycle(args: MergeEurlexLifecycleArgs): EurlexLifecycle {
  const celexId = assertCelexId(args.celexId);

  return {
    initialAct: {
      celexId,
      language: args.language,
      url: eurlexDocumentUrl(celexId, args.language),
    },
    consolidations: [...args.consolidations].sort((a, b) => a.dateVersion.localeCompare(b.dateVersion)),
    relations: [...args.relations],
  };
}

export function formatEurlexLifecycle(lifecycle: EurlexLifecycle, retrievedAt = new Date().toISOString()): string {
  const consolidationRows =
    lifecycle.consolidations.length > 0
      ? lifecycle.consolidations.map((version) => `- ${version.celexId} (${version.dateVersion})\n  URL: ${version.url}`).join("\n")
      : "Aucune version consolidée trouvée.";
  const relationRows =
    lifecycle.relations.length > 0
      ? lifecycle.relations.map((relation) => `- ${relation.kind}: ${relation.sourceCelexId} -> ${relation.targetCelexId}\n  URL: ${relation.url}`).join("\n")
      : "Aucune relation trouvée.";

  return [
    `# Cycle de vie EUR-Lex - ${lifecycle.initialAct.celexId}`,
    "## Acte initial",
    `CELEX: ${lifecycle.initialAct.celexId}`,
    `Langue: ${lifecycle.initialAct.language}`,
    `URL EUR-Lex: ${lifecycle.initialAct.url}`,
    "## Versions consolidées",
    consolidationRows,
    "## Relations",
    relationRows,
    `Consulté le ${retrievedAt}`,
  ].join("\n\n");
}
```

- [ ] **Step 4: Verify and commit**

```bash
npm --prefix packages/core test -- eurlex-versions.test.ts
git add packages/core/src/eurlex/versions.ts packages/core/test/eurlex-versions.test.ts
git commit -m "feat: add eurlex lifecycle view"
```

---

## Task 7: Client V2 Methods

**Files:**

- Modify: `packages/core/src/eurlex/client.ts`
- Test: `packages/core/test/eurlex-client-v2.test.ts`

- [ ] **Step 1: Write failing test**

Create `packages/core/test/eurlex-client-v2.test.ts`:

```ts
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { MockAgent } from "undici";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { EurlexClient } from "../src/eurlex/client.js";

const fixturesDir = join(import.meta.dirname, "fixtures", "eurlex");
const consolidatedFixture = readFileSync(join(fixturesDir, "consolidated-gdpr.json"), "utf8");
const citationsFixture = readFileSync(join(fixturesDir, "citations-gdpr.json"), "utf8");
const eurovocFixture = readFileSync(join(fixturesDir, "eurovoc-gdpr.json"), "utf8");

let mockAgent: MockAgent;

beforeEach(() => {
  mockAgent = new MockAgent();
  mockAgent.disableNetConnect();
});

afterEach(async () => {
  await mockAgent.close();
});

describe("EUR-Lex client V2 methods", () => {
  it("fetches consolidated versions", async () => {
    mockAgent.get("https://publications.europa.eu").intercept({ method: "GET", path: /\/webapi\/rdf\/sparql\?/ }).reply(200, consolidatedFixture);

    const client = new EurlexClient(mockAgent);
    const versions = await client.consolidatedVersions("32016R0679", "FRA");

    expect(versions).toHaveLength(2);
  });

  it("fetches relations", async () => {
    mockAgent.get("https://publications.europa.eu").intercept({ method: "GET", path: /\/webapi\/rdf\/sparql\?/ }).reply(200, citationsFixture);

    const client = new EurlexClient(mockAgent);
    const relations = await client.relations({ celexId: "32016R0679", language: "FRA" });

    expect(relations[0]?.kind).toBe("amended_by");
  });

  it("fetches EuroVoc concepts", async () => {
    mockAgent.get("https://publications.europa.eu").intercept({ method: "GET", path: /\/webapi\/rdf\/sparql\?/ }).reply(200, eurovocFixture);

    const client = new EurlexClient(mockAgent);
    const concepts = await client.eurovoc({ celexId: "32016R0679", language: "FRA" });

    expect(concepts.map((concept) => concept.label)).toContain("protection des données");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm --prefix packages/core test -- eurlex-client-v2.test.ts
```

Expected: FAIL because `EurlexClient` has no V2 methods.

- [ ] **Step 3: Add public client methods**

Modify `packages/core/src/eurlex/client.ts` imports:

```ts
import { buildConsolidatedVersionsQuery, mapConsolidatedVersions } from "./consolidated.js";
import { buildEurlexRelationsQuery, mapEurlexRelations, type EurlexRelationsQueryArgs } from "./citations.js";
import { buildEurovocQuery, mapEurovocConcepts, type EurlexEurovocQueryArgs } from "./eurovoc.js";
import type { EurlexConsolidatedVersion, EurlexEurovocConcept, EurlexRelation } from "./types.js";
```

Add methods inside `EurlexClient`:

```ts
async consolidatedVersions(celexId: string, language: EurlexLanguage = "FRA"): Promise<EurlexConsolidatedVersion[]> {
  const query = buildConsolidatedVersionsQuery(celexId, language);
  return mapConsolidatedVersions(await this.getSparqlJson(query), celexId, language);
}

async relations(args: EurlexRelationsQueryArgs): Promise<EurlexRelation[]> {
  const language = args.language ?? "FRA";
  return mapEurlexRelations(await this.getSparqlJson(buildEurlexRelationsQuery(args)), language);
}

async eurovoc(args: EurlexEurovocQueryArgs): Promise<EurlexEurovocConcept[]> {
  const language = args.language ?? "FRA";
  return mapEurovocConcepts(await this.getSparqlJson(buildEurovocQuery(args)), language);
}
```

Change `private async getSparqlJson` to `async getSparqlJson` only if tests or modules need direct injection. Prefer leaving it private and using the public methods above.

- [ ] **Step 4: Verify and commit**

```bash
npm --prefix packages/core test -- eurlex-client-v2.test.ts eurlex-client.test.ts
npm --prefix packages/core run typecheck
git add packages/core/src/eurlex/client.ts packages/core/test/eurlex-client-v2.test.ts
git commit -m "feat: add eurlex v2 client methods"
```

---

## Task 8: MCP Tool Handlers

**Files:**

- Modify: `packages/core/src/tools/eurlex.ts`
- Test: `packages/core/test/eurlex-v2-tools.test.ts`

- [ ] **Step 1: Write failing test**

Create `packages/core/test/eurlex-v2-tools.test.ts`:

```ts
import { describe, expect, it, vi } from "vitest";
import {
  callEurlexCitations,
  callEurlexConsolidated,
  callEurlexEurovoc,
  callEurlexFormats,
  callEurlexVersions,
  type EurlexClientLike,
} from "../src/tools/eurlex.js";

function textFrom(result: { content: { type: "text"; text: string }[] }): string {
  return result.content[0]!.text;
}

const client = {
  search: vi.fn(),
  fetchDocument: vi.fn().mockResolvedValue("<p>Texte consolidé</p>"),
  metadata: vi.fn(),
  consolidatedVersions: vi.fn().mockResolvedValue([
    {
      celexId: "02016R0679-20180525",
      baseCelexId: "32016R0679",
      dateVersion: "2018-05-25",
      language: "FRA",
      url: "https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:02016R0679-20180525",
    },
  ]),
  relations: vi.fn().mockResolvedValue([
    {
      kind: "amended_by",
      sourceCelexId: "32016R0679",
      targetCelexId: "32018R1725",
      url: "https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32018R1725",
    },
  ]),
  eurovoc: vi.fn().mockResolvedValue([
    { id: "1234", label: "protection des données", language: "FRA", uri: "http://eurovoc.europa.eu/1234" },
  ]),
} satisfies EurlexClientLike;

describe("EUR-Lex V2 MCP tools", () => {
  it("formats consolidated versions", async () => {
    const result = await callEurlexConsolidated(client, { celex_id: "32016R0679", mode: "list", language: "FRA" });
    expect(textFrom(result)).toContain("02016R0679-20180525");
  });

  it("formats citations", async () => {
    const result = await callEurlexCitations(client, { celex_id: "32016R0679", direction: "both", language: "FRA" });
    expect(textFrom(result)).toContain("amended_by");
  });

  it("formats EuroVoc concepts", async () => {
    const result = await callEurlexEurovoc(client, { celex_id: "32016R0679", language: "FRA" });
    expect(textFrom(result)).toContain("protection des données");
  });

  it("formats lifecycle versions", async () => {
    const result = await callEurlexVersions(client, { celex_id: "32016R0679", language: "FRA", include_preparatory: false });
    expect(textFrom(result)).toContain("Cycle de vie EUR-Lex");
  });

  it("formats available format candidates", async () => {
    const result = await callEurlexFormats({ celex_id: "32016R0679", language: "FRA" });
    expect(textFrom(result)).toContain("Formats EUR-Lex");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm --prefix packages/core test -- eurlex-v2-tools.test.ts
```

Expected: FAIL because V2 tool handlers do not exist.

- [ ] **Step 3: Extend `EurlexClientLike`**

Modify `packages/core/src/tools/eurlex.ts`:

```ts
import type {
  EurlexConsolidatedVersion,
  EurlexEurovocConcept,
  EurlexRelation,
} from "../eurlex/types.js";
```

Extend `EurlexClientLike`:

```ts
consolidatedVersions(celexId: string, language?: EurlexLanguage): Promise<EurlexConsolidatedVersion[]>;
relations(args: EurlexRelationsQueryArgs): Promise<EurlexRelation[]>;
eurovoc(args: EurlexEurovocQueryArgs): Promise<EurlexEurovocConcept[]>;
```

- [ ] **Step 4: Add handler args and calls**

Add interfaces:

```ts
export interface EurlexConsolidatedArgs {
  celex_id: string;
  language?: EurlexLanguage;
  date?: string;
  mode?: "list" | "nearest" | "fetch";
  max_chars?: number;
}

export interface EurlexCitationsArgs {
  celex_id: string;
  relation?: EurlexRelationKind;
  direction?: "incoming" | "outgoing" | "both";
  language?: EurlexLanguage;
  limit?: number;
}

export interface EurlexEurovocArgs {
  celex_id?: string;
  concept_uri?: string;
  query?: string;
  language?: EurlexLanguage;
  limit?: number;
}

export interface EurlexVersionsArgs {
  celex_id: string;
  language?: EurlexLanguage;
  include_preparatory?: boolean;
}

export interface EurlexFormatsArgs {
  celex_id: string;
  language?: EurlexLanguage;
  format?: EurlexDocumentFormat;
}
```

Add functions:

```ts
export async function callEurlexConsolidated(client: EurlexClientLike, args: EurlexConsolidatedArgs) {
  try {
    const language = args.language ?? "FRA";
    const versions = await client.consolidatedVersions(args.celex_id, language);
    const selected = args.date ? findNearestConsolidatedVersion(versions, args.date) : undefined;

    if (args.mode === "fetch") {
      const version = selected ?? versions.at(-1);
      if (!version) throw new Error("Aucune version consolidée disponible.");
      const body = await client.fetchDocument(version.celexId, language);
      return textResult(formatEurlexDocument({ celexId: version.celexId, language, title: version.title, body, retrievedAt: new Date().toISOString(), maxChars: args.max_chars ?? 20_000 }));
    }

    if (args.mode === "nearest" && selected) {
      return textResult(formatEurlexConsolidatedVersions([selected], args.celex_id));
    }

    return textResult(formatEurlexConsolidatedVersions(versions, args.celex_id));
  } catch (error) {
    return textResult(errorMessage("Erreur EUR-Lex pendant la lecture des versions consolidées", error), true);
  }
}
```

Use analogous wrappers:

```ts
export async function callEurlexCitations(client: EurlexClientLike, args: EurlexCitationsArgs) {
  try {
    const language = args.language ?? "FRA";
    const relations = await client.relations({
      celexId: args.celex_id,
      relation: args.relation,
      direction: args.direction ?? "both",
      language,
      limit: args.limit ?? 25,
    });
    return textResult(formatEurlexRelations(relations, args.celex_id));
  } catch (error) {
    return textResult(errorMessage("Erreur EUR-Lex pendant la lecture des citations", error), true);
  }
}

export async function callEurlexEurovoc(client: EurlexClientLike, args: EurlexEurovocArgs) {
  try {
    const language = args.language ?? "FRA";
    const concepts = await client.eurovoc({
      celexId: args.celex_id,
      conceptUri: args.concept_uri,
      query: args.query,
      language,
      limit: args.limit ?? 20,
    });
    return textResult(formatEurlexEurovocConcepts(concepts, args.celex_id ?? args.concept_uri ?? args.query ?? "requête"));
  } catch (error) {
    return textResult(errorMessage("Erreur EUR-Lex pendant la lecture EuroVoc", error), true);
  }
}

export async function callEurlexVersions(client: EurlexClientLike, args: EurlexVersionsArgs) {
  try {
    const language = args.language ?? "FRA";
    const [consolidations, relations] = await Promise.all([
      client.consolidatedVersions(args.celex_id, language),
      client.relations({ celexId: args.celex_id, direction: "both", language, limit: args.include_preparatory ? 100 : 50 }),
    ]);
    return textResult(formatEurlexLifecycle(mergeEurlexLifecycle({ celexId: args.celex_id, language, consolidations, relations })));
  } catch (error) {
    return textResult(errorMessage("Erreur EUR-Lex pendant la lecture du cycle de vie", error), true);
  }
}

export async function callEurlexFormats(args: EurlexFormatsArgs) {
  try {
    const formats = filterEurlexFormats(buildEurlexFormatCandidates(args.celex_id, args.language ?? "FRA"), {
      language: args.language,
      format: args.format,
    });
    return textResult(formatEurlexAvailableFormats(formats, args.celex_id));
  } catch (error) {
    return textResult(errorMessage("Erreur EUR-Lex pendant la lecture des formats", error), true);
  }
}
```

- [ ] **Step 5: Register five tools**

Inside `registerEurlexTools`, add `server.registerTool` calls:

```ts
server.registerTool("eurlex_consolidated", { title: "Versions consolidées EUR-Lex", description: "Liste ou récupère les versions consolidées d'un acte par CELEX.", inputSchema: { celex_id: z.string().min(5), language: z.enum(["FRA", "ENG", "DEU"]).default("FRA"), date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/u).optional(), mode: z.enum(["list", "nearest", "fetch"]).default("list"), max_chars: z.number().int().min(1000).max(50_000).default(20_000) } }, (args) => callEurlexConsolidated(client, args));
server.registerTool("eurlex_citations", { title: "Citations EUR-Lex", description: "Liste les relations juridiques entrantes et sortantes d'un document CELEX.", inputSchema: { celex_id: z.string().min(5), relation: z.enum(["amends", "amended_by", "cites", "cited_by", "repeals", "repealed_by", "basis"]).optional(), direction: z.enum(["incoming", "outgoing", "both"]).default("both"), language: z.enum(["FRA", "ENG", "DEU"]).default("FRA"), limit: z.number().int().min(1).max(100).default(25) } }, (args) => callEurlexCitations(client, args));
server.registerTool("eurlex_eurovoc", { title: "EuroVoc EUR-Lex", description: "Récupère les concepts EuroVoc d'un document ou recherche par concept.", inputSchema: { celex_id: z.string().min(5).optional(), concept_uri: z.string().optional(), query: z.string().min(2).max(200).optional(), language: z.enum(["FRA", "ENG", "DEU"]).default("FRA"), limit: z.number().int().min(1).max(50).default(20) } }, (args) => callEurlexEurovoc(client, args));
server.registerTool("eurlex_versions", { title: "Cycle de vie EUR-Lex", description: "Expose acte initial, consolidations et relations juridiques d'un CELEX.", inputSchema: { celex_id: z.string().min(5), language: z.enum(["FRA", "ENG", "DEU"]).default("FRA"), include_preparatory: z.boolean().default(false) } }, (args) => callEurlexVersions(client, args));
server.registerTool("eurlex_formats", { title: "Formats EUR-Lex", description: "Liste les formats et langues récupérables pour un CELEX.", inputSchema: { celex_id: z.string().min(5), language: z.enum(["FRA", "ENG", "DEU"]).optional(), format: z.enum(["html", "xhtml", "xml", "pdf", "rdf", "txt"]).optional() } }, (args) => callEurlexFormats(args));
```

- [ ] **Step 6: Verify and commit**

```bash
npm --prefix packages/core test -- eurlex-v2-tools.test.ts eurlex-tools.test.ts
npm --prefix packages/core run typecheck
git add packages/core/src/tools/eurlex.ts packages/core/test/eurlex-v2-tools.test.ts
git commit -m "feat: add eurlex v2 mcp handlers"
```

---

## Task 9: Exports And Smoke Registration

**Files:**

- Modify: `packages/core/src/index.ts`
- Modify: `packages/core/test/smoke.test.ts`

- [ ] **Step 1: Update smoke test first**

In `packages/core/test/smoke.test.ts`, add to `expectedTools`:

```ts
"eurlex_consolidated",
"eurlex_citations",
"eurlex_eurovoc",
"eurlex_versions",
"eurlex_formats",
```

- [ ] **Step 2: Run smoke test to verify it fails**

```bash
npm run build
npm --prefix packages/core test -- smoke.test.ts
```

Expected: FAIL until V2 tools are registered in the compiled plugin bundle.

- [ ] **Step 3: Export V2 modules**

Add exports to `packages/core/src/index.ts`:

```ts
export {
  buildConsolidatedVersionsQuery,
  findNearestConsolidatedVersion,
  formatEurlexConsolidatedVersions,
  mapConsolidatedVersions,
} from "./eurlex/consolidated.js";
export {
  buildEurlexRelationsQuery,
  formatEurlexRelations,
  mapEurlexRelations,
} from "./eurlex/citations.js";
export type { EurlexRelationsQueryArgs } from "./eurlex/citations.js";
export {
  assertEurovocUri,
  buildEurovocQuery,
  formatEurlexEurovocConcepts,
  mapEurovocConcepts,
} from "./eurlex/eurovoc.js";
export type { EurlexEurovocQueryArgs } from "./eurlex/eurovoc.js";
export {
  formatEurlexLifecycle,
  mergeEurlexLifecycle,
} from "./eurlex/versions.js";
export type { EurlexLifecycle, MergeEurlexLifecycleArgs } from "./eurlex/versions.js";
export {
  buildEurlexFormatCandidates,
  filterEurlexFormats,
  formatEurlexAvailableFormats,
} from "./eurlex/formats.js";
export type { EurlexFormatFilter } from "./eurlex/formats.js";
```

Add V2 tool handler exports:

```ts
export {
  callEurlexCitations,
  callEurlexConsolidated,
  callEurlexEurovoc,
  callEurlexFormats,
  callEurlexVersions,
} from "./tools/eurlex.js";
export type {
  EurlexCitationsArgs,
  EurlexConsolidatedArgs,
  EurlexEurovocArgs,
  EurlexFormatsArgs,
  EurlexVersionsArgs,
} from "./tools/eurlex.js";
```

- [ ] **Step 4: Verify and commit**

```bash
npm run build
npm --prefix packages/core test -- smoke.test.ts eurlex-v2-tools.test.ts
npm run typecheck
git add packages/core/src/index.ts packages/core/test/smoke.test.ts
git commit -m "feat: expose eurlex v2 tools"
```

---

## Task 10: Optional Live Smoke Tests Script

**Files:**

- Create: `packages/core/test/eurlex-live-v2.test.ts`

- [ ] **Step 1: Write gated live tests**

Create `packages/core/test/eurlex-live-v2.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { EurlexClient } from "../src/eurlex/client.js";
import { buildEurlexFormatCandidates } from "../src/eurlex/formats.js";

const runLive = process.env.EURLEX_LIVE_TESTS === "1";
const maybe = runLive ? describe : describe.skip;

maybe("EUR-Lex V2 live smoke", () => {
  it("queries consolidated versions for GDPR", async () => {
    const client = new EurlexClient();
    const versions = await client.consolidatedVersions("32016R0679", "FRA");
    expect(Array.isArray(versions)).toBe(true);
  }, 30_000);

  it("queries relations for GDPR", async () => {
    const client = new EurlexClient();
    const relations = await client.relations({ celexId: "32016R0679", language: "FRA", limit: 5 });
    expect(Array.isArray(relations)).toBe(true);
  }, 30_000);

  it("builds format candidates without network", () => {
    expect(buildEurlexFormatCandidates("32016R0679", "FRA").length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run skipped by default**

```bash
npm --prefix packages/core test -- eurlex-live-v2.test.ts
```

Expected: PASS with skipped suite.

- [ ] **Step 3: Run live manually**

```bash
$env:EURLEX_LIVE_TESTS='1'; npm --prefix packages/core test -- eurlex-live-v2.test.ts
```

Expected: PASS if EUR-Lex endpoints respond. If the public endpoint times out, keep mocked tests authoritative and report the live failure.

- [ ] **Step 4: Commit**

```bash
git add packages/core/test/eurlex-live-v2.test.ts
git commit -m "test: add eurlex v2 live smoke"
```

---

## Task 11: Full Verification

- [ ] **Step 1: Run all core tests**

```bash
npm --prefix packages/core test
```

Expected: all tests pass.

- [ ] **Step 2: Run root typecheck**

```bash
npm run typecheck
```

Expected: all workspaces typecheck.

- [ ] **Step 3: Run root build**

```bash
npm run build
```

Expected: build succeeds and `plugins/hacienda-sources-officielles/mcp-server/dist/index.js` is current.

- [ ] **Step 4: Inspect git diff**

```bash
git status --short --branch
git diff --stat
```

Expected: only intentional EUR-Lex V2 source/test/docs changes.

- [ ] **Step 5: Commit build artifacts if changed**

If build changed tracked plugin dist files:

```bash
git add plugins/hacienda-sources-officielles/mcp-server/dist/index.js plugins/hacienda-sources-officielles/mcp-server/dist/index.d.ts
git commit -m "build: refresh hacienda sources officielles bundle for eurlex v2"
```

If no dist files changed, do not create an empty commit.

---

## Self-Review Checklist

- V2 tools are all covered: `eurlex_consolidated`, `eurlex_citations`, `eurlex_eurovoc`, `eurlex_versions`, `eurlex_formats`.
- No free SPARQL tool is introduced.
- `concept_uri` validation is explicit.
- CELEX validation goes through `assertCelexId`.
- Limits are bounded in builders and Zod schemas.
- Markdown outputs include CELEX, language, official URLs and retrieval date.
- Live tests are gated by `EURLEX_LIVE_TESTS=1`.
- Full verification commands are listed.

