# Complete Legifrance Coverage Design

Date: 2026-05-14
Project: Hacienda
Status: Draft for user review

## Goal

Hacienda should cover the full Legifrance API surface without exposing lawyers to a raw Swagger-shaped interface. The product should feel like a French legal research assistant: users ask legal questions, cite sources, compare versions, run watch workflows, and retrieve official documents without choosing low-level endpoints.

The selected design is a hybrid architecture:

- an exhaustive internal API registry for all Legifrance routes available through PISTE;
- a normalization layer that turns heterogeneous DILA responses into stable legal objects;
- a compact MCP facade made of workflow-oriented tools;
- a small number of domain aliases, starting with BOFiP, where lawyers naturally think in a source-specific way.

## Non-Goals

- Do not expose one MCP tool per Swagger endpoint by default.
- Do not replace the current PISTE OAuth, retry, cache, and diagnostic foundation.
- Do not require a remote Hacienda service or centralized credentials.
- Do not promise legal advice. Hacienda provides official-source access, citation support, research workflows, and drafting assistance.

## Current State

The current `@hacienda/core` implementation already provides:

- PISTE OAuth client credentials flow;
- production and sandbox configuration;
- local response cache;
- resilient HTTP handling for 401, 403, 429, 5xx, and known empty-body 400 PISTE incidents;
- `piste_status`;
- `legifrance_recherche`;
- article, code, LODA, JORF, jurisprudence, circulaire/BOFiP, and suggest tools.

The local Legifrance Swagger contains 68 routes. The current implementation uses the core subset required for V1, but leaves many routes unused: versioning, chronology, section navigation, KALI, ACCO, BOCC, parliamentary records, CNIL, article links, catalog lists, and alternate identifier resolution.

## Product Principle

The implementation should cover all of Legifrance as capabilities, not as clutter. Lawyers should see a small set of meaningful actions:

- search;
- consult;
- determine the applicable version;
- compare versions;
- inspect links and context;
- run watch workflows;
- browse catalogs;
- resolve identifiers;
- diagnose PISTE;
- perform expert/debug API calls when necessary.

The raw route names remain internal implementation details unless the user explicitly needs an expert escape hatch.

## Architecture

### 1. PISTE API Registry

Create an internal `endpoint-registry` that describes every Legifrance route from the Swagger.

Each endpoint entry should include:

- stable internal key;
- path;
- method;
- controller family: `consult`, `list`, `search`, `suggest`, `chrono`, `misc`;
- legal domain: code, LEGI, LODA, JORF, JURI, JUFI, CETAT, CONSTIT, KALI, ACCO, CIRC/BOFiP, CNIL, parliamentary, BOCC, BODMR, system;
- input builder or schema;
- output schema, tolerant by default;
- default cache TTL;
- support status: `supported`, `experimental`, `expert-only`, or `ignored-diagnostic`;
- formatter or normalizer target;
- notes from real API behavior where the Swagger is unreliable.

The registry is internal. MCP tools call workflows, workflows call registry entries.

### 2. Route Client

Add a route client above the existing `PisteHttpClient`.

Responsibilities:

- look up endpoint metadata by key;
- validate or build request bodies;
- call `PisteHttpClient`;
- parse with tolerant schemas;
- attach endpoint metadata to errors;
- centralize cache policy overrides;
- expose a controlled expert call path.

This should reuse the existing OAuth, retry, cache, and diagnostics instead of replacing them.

### 3. Identifier Resolver

Create an `identity-resolver` for legal identifiers and common user inputs.

It should detect and normalize:

- `LEGIARTI`;
- `LEGITEXT`;
- `LEGISCTA`;
- `JORFTEXT`;
- `JORFARTI`;
- `JURITEXT`;
- `CETATEXT`;
- `CONSTEXT`;
- `KALI*`;
- `IDCC`;
- `BOI-*`;
- `NOR`;
- `ELI`;
- old identifiers where supported by the API;
- common code names, with accent-insensitive matching.

It should return a typed resolution result with confidence, source route used, canonical ID, and suggested next action.

### 4. Normalized Legal Models

Normalize DILA responses into stable internal models consumed by formatters and tools.

Primary models:

- `LegalSearchResult`;
- `LegalDocument`;
- `LegalArticle`;
- `LegalSection`;
- `LegalVersion`;
- `LegalTimeline`;
- `LegalDiff`;
- `LegalLink`;
- `CollectiveAgreement`;
- `CompanyAgreement`;
- `FiscalDoctrine`;
- `ParliamentaryRecord`;
- `RegulatoryRecord`;
- `CnilRecord`;

Normalization should keep the original raw payload available behind a debug flag, but default output should be concise and useful to a lawyer.

## MCP Facade

Expose a compact set of tools.

### `legifrance_rechercher`

Search official legal sources.

Inputs should support:

- query;
- source/domain;
- dates;
- nature;
- code name or ID;
- jurisdiction;
- legal status;
- page size and page number;
- search mode: exact phrase, all words, any words.

Domains should include codes, LODA, JORF, JURI, CETAT, CONSTIT, KALI, ACCO, CIRC/BOFiP, CNIL, and all sources.

### `legifrance_consulter`

Consult one official document or document part.

It should accept:

- ID;
- optional type;
- optional date;
- optional section/article number;
- optional output mode: summary, full, structured, raw debug.

It should route to article, code, LODA, JORF, jurisprudence, KALI, ACCO, CNIL, parliamentary, or BOFiP consultation based on identifier resolution and input type.

### `legifrance_versions`

Find applicable versions and version history.

Use chronology and canonical version routes to answer:

- what version was applicable on a date;
- whether a text has multiple versions;
- what versions exist for an article or text;
- what the nearest version is when an exact date is not available.

### `legifrance_comparer`

Compare two versions of an article or text.

Inputs:

- ID or canonical text/article reference;
- date A;
- date B;
- optional article/section selector.

Output:

- added text;
- removed text;
- changed text;
- effective dates;
- official links;
- short legal impact summary.

The first implementation can use text diff on normalized plaintext. Later implementations can use section-aware or article-aware diffs.

### `legifrance_liens`

Return legal context around an article or document.

Coverage:

- related links;
- concordance links;
- Service-Public links;
- same-number article history;
- parent sections;
- table of contents;
- official Legifrance URL.

### `legifrance_veille`

Run watch-oriented retrieval.

Coverage:

- latest JO;
- LODA texts by period;
- JORF by period;
- new or changed texts;
- annual tables;
- dates without JO;
- topic-based search watch.

Output should be suitable for a French legal watch note: title, source, date, nature, identifier, link, and concise relevance note.

### `legifrance_catalogue`

Browse source catalogs.

Coverage:

- list codes;
- list LODA;
- list conventions;
- list BOCC and BOCC texts;
- list BODMR bulletins;
- list parliamentary dossiers;
- list debates;
- list/search written parliamentary questions records;
- list documents administratifs;
- list legislatures.

This tool is for exploration and disambiguation before consultation.

### `legifrance_resoudre_identifiant`

Resolve identifiers and user-facing references.

Examples:

- `Code civil article 1240`;
- `BOI-IS-BASE-30-30-20-20`;
- `IDCC 1486`;
- a NOR;
- an ELI URL;
- an old Legifrance ID.

Output should include canonical ID, detected type, candidate documents, confidence, and recommended follow-up tool call.

### `legifrance_status`

Continue the existing PISTE diagnostic tool, with possible expansion:

- credentials source;
- OAuth result;
- API ping;
- cache stats;
- active environment;
- known issue hints;
- subscription-oriented diagnosis.

### `legifrance_api_call`

Expert/debug escape hatch.

Inputs:

- endpoint key or registered path;
- method;
- path parameters for templated routes like `/chrono/textCid/{textCid}`;
- query parameters for GET routes;
- JSON body for POST routes;
- bypass cache;
- raw output flag.

Guardrails:

- describe it as expert/debug;
- validate path against the endpoint registry;
- never allow arbitrary external URLs;
- redact credentials from all logs and errors;
- return clear warnings when route status is experimental.

## BOFiP Alias Strategy

Keep unified `legifrance_*` tools as the canonical MCP facade, but add two visible BOFiP aliases:

- `bofip_rechercher`;
- `bofip_consulter`.

These aliases call the same internal workflows with BOFiP/CIRC/fiscal defaults. They exist because fiscal lawyers and accountants think of BOFiP as a standalone source, and Claude is more likely to choose the correct tool when the user says "BOFiP", "BOI", "doctrine fiscale", "micro-BNC", or "regime mere-fille".

Do not add many aliases in the first complete-coverage iteration. Reconsider aliases later for KALI/CCN or JORF if tool selection data shows confusion.

## Workflow Coverage

### 1. Search

Search must work across all indexed sources and with source-specific defaults.

Priority improvements:

- richer filters;
- better code-name resolution;
- KALI, ACCO, CNIL, BOFiP-specific output shaping;
- stable search result model.

### 2. Consultation

Consultation should handle all major document types:

- articles;
- codes;
- sections;
- LODA;
- JORF;
- JURI/CETAT/CONSTIT;
- KALI conventions and articles;
- ACCO company agreements;
- BOCC metadata and texts;
- CNIL;
- parliamentary dossiers and debates;
- BOFiP/CIRC.

### 3. Applicable Version

Version lookup is a high-value lawyer workflow. It should be prioritized before broad catalog completeness.

Required capabilities:

- article version by date;
- text version by date;
- canonical version lookup;
- nearest version lookup;
- same-number article history;
- chronology display.

### 4. Comparison

Comparison should start with a robust plaintext diff of normalized article or text versions.

Output must avoid overclaiming. It should distinguish:

- textual change detected;
- date of version A and version B;
- official source IDs;
- potential legal significance as a short non-advice note.

### 5. Links and Context

Legal context should cover:

- related article links;
- concordance links;
- Service-Public links;
- table of contents;
- parent sections;
- same-number history.

### 6. Watch

Watch workflows should support:

- latest JO;
- topic watch through search;
- LODA lists;
- JORF lists;
- annual tables;
- dates without JO;
- practical note formatting.

### 7. Social

Social coverage should include:

- KALI text by ID;
- KALI article;
- KALI section;
- KALI container;
- KALI by IDCC;
- list conventions;
- BOCC bulletins and text metadata;
- ACCO agreements;
- ACCO suggestions by SIRET or company name.

This is especially important for `hacienda-social`.

### 8. Parliamentary

Parliamentary coverage should include:

- dossiers legislatifs;
- debates;
- written questions;
- legislatures.

This supports travaux preparatoires and statutory interpretation.

### 9. Fiscal and BOFiP

Fiscal/BOFiP is a first-class product domain.

Coverage:

- search BOFiP by `BOI-*`, tax, series, topic, and keywords;
- consult BOFiP item with title, paragraphs, opposability date, status, official link;
- resolve partial IDs and common topics;
- cite as `BOI-...`, with paragraph references when available;
- cross-reference CGI, LPF, BOFiP, JORF, and Conseil d'Etat jurisprudence;
- compare versions if exposed data allows it.

## Error Handling

Keep the current PISTE error philosophy:

- 401: refresh token and retry once;
- 403: explain likely subscription problem;
- 429: backoff;
- 5xx: retry and explain infrastructure issue;
- empty-body 400: preserve the known DILA gateway diagnosis;
- schema mismatch: return a clear "unexpected Legifrance response" message and log concise schema issues.

Add workflow-level errors:

- ambiguous identifier;
- unsupported document type;
- route available only in expert mode;
- version not found for date;
- comparison impossible because one side has no text;
- source not subscribed or unavailable.

## Testing Strategy

### Unit Tests

Cover:

- endpoint registry validation;
- request body builders;
- identity resolver;
- normalizers;
- formatters;
- workflow route selection;
- diff generation.

### HTTP Mock Tests

Continue testing:

- OAuth success and failure;
- token refresh;
- cache hit and miss;
- 401, 403, 429, 5xx;
- empty-body 400 retry behavior.

### Fixture Tests

Capture real responses for representative endpoints:

- article;
- code;
- LODA;
- JORF;
- JURI;
- KALI;
- ACCO;
- CNIL;
- BOFiP/CIRC;
- dossier legislatif;
- versioning;
- links;
- catalog list.

Do not overtype responses from Swagger alone. Prefer schemas based on real responses, with `.passthrough()` for fields that are not directly consumed.

### MCP Smoke Tests

Verify:

- all public tools are listed;
- `legifrance_status` works without credentials;
- missing credentials produce clear messages;
- expert tool rejects unknown paths.

### Live Tests

Live tests should be opt-in:

- `PISTE_LIVE_TESTS=1`;
- require credentials;
- avoid broad searches by default;
- run a small API ping and a tiny set of stable sample calls.

## Phasing

### Phase 1: Foundation

- Add endpoint registry.
- Add route client.
- Add identity resolver.
- Add normalized model types.
- Keep existing public tools working.

### Phase 2: Versioning and Diff

- Add `legifrance_versions`.
- Add `legifrance_comparer`.
- Cover chronology, canonical version, nearest version, article-by-CID, and same-number routes.

### Phase 3: Navigation and Links

- Add `legifrance_liens`.
- Add table of contents and section consultation.
- Add related, concordance, and Service-Public links.

### Phase 4: Social Coverage

- Add KALI, IDCC, BOCC, ACCO routes and normalizers.
- Improve `hacienda-social` prompts to use these capabilities.

### Phase 5: Fiscal Coverage

- Add `bofip_rechercher` and `bofip_consulter` aliases.
- Add `FiscalDoctrine` normalizer and citation formatting.
- Add cross-source fiscal retrieval patterns.

### Phase 6: Watch and Catalogs

- Add `legifrance_veille`.
- Add `legifrance_catalogue`.
- Cover list routes, latest JO, annual tables, and dates without JO.

### Phase 7: Parliamentary and CNIL

- Add parliamentary normalizers and consultation.
- Add CNIL consultation and old-ID resolution.

### Phase 8: Expert API Call

- Add `legifrance_api_call`.
- Restrict to registry paths.
- Mark experimental routes clearly.

## Open Decisions

The following choices should be made during implementation planning:

- exact TypeScript file layout for registry entries;
- whether endpoint schemas are handwritten or generated then simplified;
- whether raw payload debug output is available on all tools or only expert calls;
- how much BOFiP versioning is possible with the data exposed through PISTE;
- whether KALI/CCN deserves aliases in a later iteration.

## Acceptance Criteria

The complete-coverage project is successful when:

- every non-ping route in the local Legifrance Swagger is represented in the endpoint registry;
- public MCP tools remain compact and workflow-oriented;
- existing tools continue to work;
- `legifrance_api_call` can reach any registered non-ping endpoint in expert mode;
- version lookup works for articles and texts;
- comparison works for two article/text versions;
- KALI/IDCC workflows are usable by `hacienda-social`;
- BOFiP workflows are discoverable through `bofip_rechercher` and `bofip_consulter`;
- tests cover route selection, core normalizers, error handling, and smoke MCP behavior;
- live PISTE tests remain opt-in and do not run in normal CI by default.
