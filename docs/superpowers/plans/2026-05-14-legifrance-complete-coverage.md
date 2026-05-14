# Legifrance Complete Coverage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a complete, Swagger-backed Legifrance capability layer while keeping the public MCP facade small, lawyer-oriented, and compatible with existing tools.

**Architecture:** Implement an internal endpoint registry for every non-ping route in `docs/Légifrance.json`, then add a typed route client, identifier resolver, normalized models, and workflow tools. Existing OAuth, cache, retries, and current tools remain the foundation and must keep passing.

**Tech Stack:** TypeScript ESM, Node.js >= 20, `@modelcontextprotocol/sdk`, `undici`, `zod`, Vitest, current npm workspaces.

---

## Scope

This plan is the foundation and first complete-coverage pass. It does not attempt to perfect every domain formatter in one step. It does ensure every non-ping Swagger route is represented, reachable through controlled infrastructure, and assigned to a domain/status so later domain phases can be implemented safely.

Key review corrections included:

- Add BODMR as a catalog/system-official-publication domain.
- Treat `LEGI` / `/consult/legiPart` as a first-class consult target distinct from CODE and LODA.
- Treat written parliamentary questions as list/search records unless a consult endpoint is verified.
- Make expert API calls support `pathParams`, `query`, GET, and POST.
- Add `JUFI` to search domain handling or explicitly map it as supported by search.
- Include BOCC/BODMR identifiers in the resolver as catalog references where available.

## File Structure

Create:

- `packages/core/src/legifrance/endpoints.ts`  
  Static endpoint registry entries generated from the local Swagger and curated with domain/status/TTL metadata.

- `packages/core/src/legifrance/route-client.ts`  
  Registry-aware wrapper over `PisteHttpClient`.

- `packages/core/src/legifrance/identity-resolver.ts`  
  Identifier detection and accent-insensitive common-reference resolution.

- `packages/core/src/legifrance/models.ts`  
  Normalized internal legal model types.

- `packages/core/src/legifrance/workflows/search.ts`  
  Workflow implementation behind the new `legifrance_rechercher` and current `legifrance_recherche`.

- `packages/core/src/legifrance/workflows/consult.ts`  
  Workflow implementation behind `legifrance_consulter`, `bofip_consulter`, and existing specific consult tools over time.

- `packages/core/src/tools/api-call.ts`  
  Expert/debug tool `legifrance_api_call`.

- `packages/core/src/tools/bofip.ts`  
  BOFiP aliases `bofip_rechercher` and `bofip_consulter`.

- `packages/core/test/endpoint-registry.test.ts`
- `packages/core/test/route-client.test.ts`
- `packages/core/test/identity-resolver.test.ts`
- `packages/core/test/api-call.test.ts`
- `packages/core/test/bofip-alias.test.ts`

Modify:

- `packages/core/src/index.ts`  
  Export/register new modules and tools.

- `packages/core/src/schemas.ts`  
  Add `JUFI` if still intended, plus minimal generic schemas for registry-driven route calls.

- `packages/core/src/search-builder.ts`  
  Keep old search path working; align domain naming with new workflow.

- `packages/core/src/tools/recherche.ts`  
  Preserve current tool name and add/bridge to `legifrance_rechercher`.

- `packages/core/test/smoke.test.ts`  
  Expect new public tools.

- `docs/superpowers/specs/2026-05-14-legifrance-complete-coverage-design.md`  
  Patch review findings: BODMR, LEGI, written-question wording, expert call shape, JUFI.

---

### Task 1: Patch The Design Spec With Swagger Review Findings

**Files:**
- Modify: `docs/superpowers/specs/2026-05-14-legifrance-complete-coverage-design.md`

- [ ] **Step 1: Update the domain list**

Add `LEGI`, `BOCC`, `BODMR`, and `JUFI` to the API registry domain list around the existing domain bullet.

Expected replacement:

```markdown
- legal domain: code, LEGI, LODA, JORF, JURI, JUFI, CETAT, CONSTIT, KALI, ACCO, CIRC/BOFiP, CNIL, parliamentary, BOCC, BODMR, system;
```

- [ ] **Step 2: Clarify expert call inputs**

Update the `legifrance_api_call` input list to:

```markdown
- endpoint key or registered path;
- method;
- path parameters for templated routes such as `/chrono/textCid/{textCid}`;
- query parameters for GET routes if the API adds them later;
- JSON body for POST routes;
- bypass cache;
- raw output flag.
```

- [ ] **Step 3: Correct written parliamentary questions**

Change consultation wording so written parliamentary questions are listed as catalog/search records, not consultable documents.

Expected replacement in consultation section:

```markdown
- parliamentary dossiers and debates;
- BOFiP/CIRC.
```

Expected addition in catalogue section:

```markdown
- list written parliamentary questions as records for search and watch workflows;
- list BODMR bulletins.
```

- [ ] **Step 4: Run a placeholder scan**

Run:

```powershell
rg -n "TBD|TODO|PLACEHOLDER|FIXME|\?\?" docs\superpowers\specs\2026-05-14-legifrance-complete-coverage-design.md
```

Expected: no matches.

- [ ] **Step 5: Commit**

Run:

```powershell
git add docs/superpowers/specs/2026-05-14-legifrance-complete-coverage-design.md
git commit -m "docs: align legifrance design with swagger review"
```

Expected: commit succeeds with only the design spec changed.

---

### Task 2: Add Endpoint Registry Types And Full Route Inventory

**Files:**
- Create: `packages/core/src/legifrance/endpoints.ts`
- Test: `packages/core/test/endpoint-registry.test.ts`

- [ ] **Step 1: Write the failing registry tests**

Create `packages/core/test/endpoint-registry.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  ENDPOINTS,
  getEndpoint,
  listEndpoints,
  nonPingEndpoints,
} from "../src/legifrance/endpoints.js";

describe("Legifrance endpoint registry", () => {
  it("contains every non-ping route from the local Swagger", () => {
    expect(nonPingEndpoints()).toHaveLength(62);
    expect(getEndpoint("chrono.textCid").path).toBe("/chrono/textCid");
    expect(getEndpoint("consult.legiPart").path).toBe("/consult/legiPart");
    expect(getEndpoint("list.bodmr").path).toBe("/list/bodmr");
    expect(getEndpoint("search.canonicalArticleVersion").path).toBe("/search/canonicalArticleVersion");
    expect(getEndpoint("suggest.acco").path).toBe("/suggest/acco");
  });

  it("does not expose ping routes as supported capabilities", () => {
    const paths = listEndpoints().map((endpoint) => endpoint.path);
    expect(paths).not.toContain("/chrono/ping");
    expect(paths).not.toContain("/consult/ping");
    expect(paths).not.toContain("/list/ping");
    expect(paths).not.toContain("/search/ping");
    expect(paths).not.toContain("/suggest/ping");
  });

  it("assigns review-sensitive routes to explicit domains", () => {
    expect(getEndpoint("list.bodmr")).toMatchObject({ domain: "BODMR", family: "list" });
    expect(getEndpoint("consult.legiPart")).toMatchObject({ domain: "LEGI", family: "consult" });
    expect(getEndpoint("list.questionsEcritesParlementaires")).toMatchObject({
      domain: "parliamentary",
      family: "list",
    });
  });

  it("marks diagnostic and expert routes deliberately", () => {
    expect(getEndpoint("misc.commitId").status).toBe("supported");
    expect(getEndpoint("consult.codeTableMatieres").status).toBe("expert-only");
    expect(ENDPOINTS.every((endpoint) => endpoint.status)).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```powershell
npm run test --workspace @hacienda/core -- endpoint-registry.test.ts
```

Expected: FAIL because `../src/legifrance/endpoints.js` does not exist.

- [ ] **Step 3: Implement endpoint registry**

Create `packages/core/src/legifrance/endpoints.ts`:

```ts
export type EndpointFamily = "chrono" | "consult" | "list" | "misc" | "search" | "suggest";

export type EndpointMethod = "GET" | "POST";

export type EndpointStatus = "supported" | "experimental" | "expert-only" | "ignored-diagnostic";

export type EndpointDomain =
  | "ACCO"
  | "BOCC"
  | "BODMR"
  | "CIRC_BOFIP"
  | "CNIL"
  | "CODE"
  | "CONSTIT"
  | "JOF"
  | "JORF"
  | "JURI"
  | "JUFI"
  | "KALI"
  | "LEGI"
  | "LODA"
  | "parliamentary"
  | "system";

export interface LegifranceEndpoint {
  key: string;
  path: string;
  method: EndpointMethod;
  family: EndpointFamily;
  domain: EndpointDomain;
  summary: string;
  status: EndpointStatus;
  defaultTtlMs?: number;
}

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

export const ENDPOINTS = [
  { key: "chrono.textCid", path: "/chrono/textCid", method: "POST", family: "chrono", domain: "LEGI", summary: "Version d'un texte", status: "experimental", defaultTtlMs: DAY },
  { key: "chrono.hasTextCid", path: "/chrono/textCid/{textCid}", method: "GET", family: "chrono", domain: "LEGI", summary: "Vérifie si un texte possède des versions", status: "experimental", defaultTtlMs: DAY },
  { key: "chrono.textCidAndElementCid", path: "/chrono/textCidAndElementCid", method: "POST", family: "chrono", domain: "LEGI", summary: "Extrait d'une version d'un texte", status: "experimental", defaultTtlMs: DAY },

  { key: "consult.acco", path: "/consult/acco", method: "POST", family: "consult", domain: "ACCO", summary: "Contenu d'un accord d'entreprise", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.circulaire", path: "/consult/circulaire", method: "POST", family: "consult", domain: "CIRC_BOFIP", summary: "Contenu d'une circulaire", status: "supported", defaultTtlMs: DAY },
  { key: "consult.cnil", path: "/consult/cnil", method: "POST", family: "consult", domain: "CNIL", summary: "Contenu texte fonds CNIL", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.code", path: "/consult/code", method: "POST", family: "consult", domain: "CODE", summary: "Contenu texte type CODE", status: "supported", defaultTtlMs: DAY },
  { key: "consult.codeTableMatieres", path: "/consult/code/tableMatieres", method: "POST", family: "consult", domain: "CODE", summary: "Contenu table des matières d'un CODE déprécié", status: "expert-only", defaultTtlMs: DAY },
  { key: "consult.concordanceLinksArticle", path: "/consult/concordanceLinksArticle", method: "POST", family: "consult", domain: "LEGI", summary: "Liste des liens de concordance d'un article", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.debat", path: "/consult/debat", method: "POST", family: "consult", domain: "parliamentary", summary: "Contenu d'un débat parlementaire", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.dossierLegislatif", path: "/consult/dossierLegislatif", method: "POST", family: "consult", domain: "parliamentary", summary: "Contenu d'un dossier législatif", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.eliAndAliasRedirectionTexte", path: "/consult/eliAndAliasRedirectionTexte", method: "POST", family: "consult", domain: "JORF", summary: "Contenu des textes du JO par ELI ou alias", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.getArticle", path: "/consult/getArticle", method: "POST", family: "consult", domain: "LEGI", summary: "Contenu d'un article", status: "supported", defaultTtlMs: DAY },
  { key: "consult.getArticleByCid", path: "/consult/getArticleByCid", method: "POST", family: "consult", domain: "LEGI", summary: "Contenu des versions d'un article", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.getArticleWithIdAndNum", path: "/consult/getArticleWithIdAndNum", method: "POST", family: "consult", domain: "CODE", summary: "Contenu d'un article en vigueur par ID et numéro", status: "supported", defaultTtlMs: DAY },
  { key: "consult.getArticleWithIdEliOrAlias", path: "/consult/getArticleWithIdEliOrAlias", method: "POST", family: "consult", domain: "LEGI", summary: "Contenu d'un article par ID, ELI ou alias", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.getBoccTextPdfMetadata", path: "/consult/getBoccTextPdfMetadata", method: "POST", family: "consult", domain: "BOCC", summary: "Métadonnées d'un PDF lié à un texte unitaire BOCC", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.getCnilWithAncienId", path: "/consult/getCnilWithAncienId", method: "POST", family: "consult", domain: "CNIL", summary: "Contenu d'un texte CNIL avec ancien ID", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.getCodeWithAncienId", path: "/consult/getCodeWithAncienId", method: "POST", family: "consult", domain: "CODE", summary: "Contenu d'un code avec ancien ID", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.getJoWithNor", path: "/consult/getJoWithNor", method: "POST", family: "consult", domain: "JORF", summary: "Contenu d'un JO par NOR", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.getJuriPlanClassement", path: "/consult/getJuriPlanClassement", method: "POST", family: "consult", domain: "JURI", summary: "Plan de classement JURI", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.getJuriWithAncienId", path: "/consult/getJuriWithAncienId", method: "POST", family: "consult", domain: "JURI", summary: "Contenu d'un texte JURI avec ancien ID", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.getSectionByCid", path: "/consult/getSectionByCid", method: "POST", family: "consult", domain: "LEGI", summary: "Contenu d'une section", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.getTables", path: "/consult/getTables", method: "POST", family: "consult", domain: "system", summary: "Liste des tables annuelles", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.hasServicePublicLinksArticle", path: "/consult/hasServicePublicLinksArticle", method: "POST", family: "consult", domain: "LEGI", summary: "Articles possédant des liens Service-Public", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.jorf", path: "/consult/jorf", method: "POST", family: "consult", domain: "JORF", summary: "Contenu texte fonds JORF", status: "supported", defaultTtlMs: DAY },
  { key: "consult.jorfCont", path: "/consult/jorfCont", method: "POST", family: "consult", domain: "JORF", summary: "Liste de sommaire JORF", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.jorfPart", path: "/consult/jorfPart", method: "POST", family: "consult", domain: "JORF", summary: "Contenu texte fonds JORF partiel", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.juri", path: "/consult/juri", method: "POST", family: "consult", domain: "JURI", summary: "Contenu texte fonds JURI", status: "supported", defaultTtlMs: DAY },
  { key: "consult.kaliArticle", path: "/consult/kaliArticle", method: "POST", family: "consult", domain: "KALI", summary: "Contenu des conventions collectives depuis un article", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.kaliCont", path: "/consult/kaliCont", method: "POST", family: "consult", domain: "KALI", summary: "Contenu des conteneurs des conventions collectives", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.kaliContIdcc", path: "/consult/kaliContIdcc", method: "POST", family: "consult", domain: "KALI", summary: "Contenu des conteneurs des conventions collectives par IDCC", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.kaliSection", path: "/consult/kaliSection", method: "POST", family: "consult", domain: "KALI", summary: "Contenu des conventions collectives depuis une section", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.kaliText", path: "/consult/kaliText", method: "POST", family: "consult", domain: "KALI", summary: "Contenu des conventions collectives", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.lastNJo", path: "/consult/lastNJo", method: "POST", family: "consult", domain: "JORF", summary: "Derniers journaux officiels", status: "experimental", defaultTtlMs: HOUR },
  { key: "consult.lawDecree", path: "/consult/lawDecree", method: "POST", family: "consult", domain: "LODA", summary: "Contenu texte type LODA", status: "supported", defaultTtlMs: DAY },
  { key: "consult.legiTableMatieres", path: "/consult/legi/tableMatieres", method: "POST", family: "consult", domain: "LEGI", summary: "Contenu table des matières d'un texte LODA ou CODE", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.legiPart", path: "/consult/legiPart", method: "POST", family: "consult", domain: "LEGI", summary: "Contenu texte fonds LEGI", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.relatedLinksArticle", path: "/consult/relatedLinksArticle", method: "POST", family: "consult", domain: "LEGI", summary: "Liste des liens relatifs d'un article", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.sameNumArticle", path: "/consult/sameNumArticle", method: "POST", family: "consult", domain: "LEGI", summary: "Liste des articles ayant eu le même numéro", status: "experimental", defaultTtlMs: DAY },
  { key: "consult.servicePublicLinksArticle", path: "/consult/servicePublicLinksArticle", method: "POST", family: "consult", domain: "LEGI", summary: "Liste des liens Service-Public d'un article", status: "experimental", defaultTtlMs: DAY },

  { key: "list.bocc", path: "/list/bocc", method: "POST", family: "list", domain: "BOCC", summary: "Liste paginée des bulletins officiels des conventions collectives", status: "experimental", defaultTtlMs: HOUR },
  { key: "list.boccTexts", path: "/list/boccTexts", method: "POST", family: "list", domain: "BOCC", summary: "Liste paginée des textes unitaires des BOCC", status: "experimental", defaultTtlMs: HOUR },
  { key: "list.boccsAndTexts", path: "/list/boccsAndTexts", method: "POST", family: "list", domain: "BOCC", summary: "Liste paginée des BOCC et textes", status: "experimental", defaultTtlMs: HOUR },
  { key: "list.bodmr", path: "/list/bodmr", method: "POST", family: "list", domain: "BODMR", summary: "Liste des bulletins officiels des décorations, médailles et récompenses", status: "experimental", defaultTtlMs: HOUR },
  { key: "list.code", path: "/list/code", method: "POST", family: "list", domain: "CODE", summary: "Liste paginée des codes", status: "experimental", defaultTtlMs: HOUR },
  { key: "list.conventions", path: "/list/conventions", method: "POST", family: "list", domain: "KALI", summary: "Liste paginée des conventions", status: "experimental", defaultTtlMs: HOUR },
  { key: "list.debatsParlementaires", path: "/list/debatsParlementaires", method: "POST", family: "list", domain: "parliamentary", summary: "Liste des débats parlementaires", status: "experimental", defaultTtlMs: HOUR },
  { key: "list.docsAdmins", path: "/list/docsAdmins", method: "POST", family: "list", domain: "system", summary: "Liste des documents administratifs", status: "experimental", defaultTtlMs: HOUR },
  { key: "list.dossiersLegislatifs", path: "/list/dossiersLegislatifs", method: "POST", family: "list", domain: "parliamentary", summary: "Liste paginée des dossiers législatifs", status: "experimental", defaultTtlMs: HOUR },
  { key: "list.legislatures", path: "/list/legislatures", method: "POST", family: "list", domain: "parliamentary", summary: "Liste des législatures", status: "experimental", defaultTtlMs: HOUR },
  { key: "list.loda", path: "/list/loda", method: "POST", family: "list", domain: "LODA", summary: "Liste paginée des textes LODA", status: "experimental", defaultTtlMs: HOUR },
  { key: "list.questionsEcritesParlementaires", path: "/list/questionsEcritesParlementaires", method: "POST", family: "list", domain: "parliamentary", summary: "Liste paginée des questions écrites parlementaires", status: "experimental", defaultTtlMs: HOUR },

  { key: "misc.commitId", path: "/misc/commitId", method: "GET", family: "misc", domain: "system", summary: "Informations déploiement et versionning", status: "supported", defaultTtlMs: HOUR },
  { key: "misc.datesWithoutJo", path: "/misc/datesWithoutJo", method: "GET", family: "misc", domain: "JORF", summary: "Liste des dates sans JO", status: "experimental", defaultTtlMs: DAY },
  { key: "misc.yearsWithoutTable", path: "/misc/yearsWithoutTable", method: "GET", family: "misc", domain: "system", summary: "Liste des années sans table", status: "experimental", defaultTtlMs: DAY },

  { key: "search.search", path: "/search", method: "POST", family: "search", domain: "system", summary: "Recherche générique des documents indexés", status: "supported", defaultTtlMs: HOUR },
  { key: "search.canonicalArticleVersion", path: "/search/canonicalArticleVersion", method: "POST", family: "search", domain: "LEGI", summary: "Récupération des versions de l'article", status: "experimental", defaultTtlMs: DAY },
  { key: "search.canonicalVersion", path: "/search/canonicalVersion", method: "POST", family: "search", domain: "LEGI", summary: "Récupération des infos de la version canonique", status: "experimental", defaultTtlMs: DAY },
  { key: "search.nearestVersion", path: "/search/nearestVersion", method: "POST", family: "search", domain: "LEGI", summary: "Récupération des infos de la version la plus proche", status: "experimental", defaultTtlMs: DAY },

  { key: "suggest.suggest", path: "/suggest", method: "POST", family: "suggest", domain: "system", summary: "Suggestions de résultats", status: "supported", defaultTtlMs: HOUR },
  { key: "suggest.acco", path: "/suggest/acco", method: "POST", family: "suggest", domain: "ACCO", summary: "Suggestions des SIRET et raisons sociales pour les accords", status: "experimental", defaultTtlMs: HOUR },
  { key: "suggest.pdc", path: "/suggest/pdc", method: "POST", family: "suggest", domain: "JURI", summary: "Suggestions des libellés pour les plans de classement", status: "experimental", defaultTtlMs: HOUR },
] as const satisfies readonly LegifranceEndpoint[];

const byKey = new Map<string, LegifranceEndpoint>(ENDPOINTS.map((endpoint) => [endpoint.key, endpoint]));

export function listEndpoints(): LegifranceEndpoint[] {
  return [...ENDPOINTS];
}

export function nonPingEndpoints(): LegifranceEndpoint[] {
  return listEndpoints();
}

export function getEndpoint(key: string): LegifranceEndpoint {
  const endpoint = byKey.get(key);
  if (!endpoint) {
    throw new Error(`Unknown Legifrance endpoint key: ${key}`);
  }
  return endpoint;
}

export function findEndpointByPath(path: string): LegifranceEndpoint | undefined {
  return ENDPOINTS.find((endpoint) => endpoint.path === path);
}
```

- [ ] **Step 4: Run registry test**

Run:

```powershell
npm run test --workspace @hacienda/core -- endpoint-registry.test.ts
```

Expected: PASS.

- [ ] **Step 5: Run typecheck**

Run:

```powershell
npm run typecheck --workspace @hacienda/core
```

Expected: PASS.

- [ ] **Step 6: Commit**

Run:

```powershell
git add packages/core/src/legifrance/endpoints.ts packages/core/test/endpoint-registry.test.ts
git commit -m "feat: add legifrance endpoint registry"
```

Expected: commit succeeds.

---

### Task 3: Add Registry-Aware Route Client

**Files:**
- Create: `packages/core/src/legifrance/route-client.ts`
- Test: `packages/core/test/route-client.test.ts`

- [ ] **Step 1: Write failing route-client tests**

Create `packages/core/test/route-client.test.ts`:

```ts
import { describe, expect, it, vi } from "vitest";
import { LegifranceRouteClient, fillPathParams } from "../src/legifrance/route-client.js";
import type { PisteHttpClient } from "../src/http.js";

describe("LegifranceRouteClient", () => {
  it("fills templated path params for GET routes", () => {
    expect(fillPathParams("/chrono/textCid/{textCid}", { textCid: "LEGITEXT000006070721" })).toBe(
      "/chrono/textCid/LEGITEXT000006070721",
    );
  });

  it("throws when a templated path param is missing", () => {
    expect(() => fillPathParams("/chrono/textCid/{textCid}", {})).toThrow(/Missing path param textCid/);
  });

  it("calls GET endpoints with path params", async () => {
    const http = {
      get: vi.fn().mockResolvedValue({ ok: true }),
      post: vi.fn(),
    } as unknown as PisteHttpClient;
    const client = new LegifranceRouteClient(http);
    await expect(
      client.call("chrono.hasTextCid", { pathParams: { textCid: "LEGITEXT000006070721" } }),
    ).resolves.toEqual({ ok: true });
    expect(http.get).toHaveBeenCalledWith("/chrono/textCid/LEGITEXT000006070721", {
      ttlMs: 86_400_000,
    });
  });

  it("calls POST endpoints with a JSON body", async () => {
    const http = {
      get: vi.fn(),
      post: vi.fn().mockResolvedValue({ article: { id: "LEGIARTI1" } }),
    } as unknown as PisteHttpClient;
    const client = new LegifranceRouteClient(http);
    await client.call("consult.getArticle", { body: { id: "LEGIARTI1" }, bypassCache: true });
    expect(http.post).toHaveBeenCalledWith(
      "/consult/getArticle",
      { id: "LEGIARTI1" },
      { bypassCache: true, ttlMs: 86_400_000 },
    );
  });

  it("rejects unknown endpoint keys", async () => {
    const http = { get: vi.fn(), post: vi.fn() } as unknown as PisteHttpClient;
    const client = new LegifranceRouteClient(http);
    await expect(client.call("unknown.key", {})).rejects.toThrow(/Unknown Legifrance endpoint key/);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```powershell
npm run test --workspace @hacienda/core -- route-client.test.ts
```

Expected: FAIL because `route-client.ts` does not exist.

- [ ] **Step 3: Implement route client**

Create `packages/core/src/legifrance/route-client.ts`:

```ts
import type { RequestOptions, PisteHttpClient } from "../http.js";
import { getEndpoint } from "./endpoints.js";

export interface RouteCallOptions {
  pathParams?: Record<string, string | number>;
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  bypassCache?: boolean;
  ttlMs?: number;
}

export function fillPathParams(path: string, params: Record<string, string | number> = {}): string {
  return path.replace(/\{([^}]+)\}/g, (_match, name: string) => {
    const value = params[name];
    if (value === undefined || value === null || value === "") {
      throw new Error(`Missing path param ${name} for Legifrance endpoint ${path}`);
    }
    return encodeURIComponent(String(value));
  });
}

function appendQuery(path: string, query: RouteCallOptions["query"]): string {
  if (!query) return path;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) params.set(key, String(value));
  }
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}

export class LegifranceRouteClient {
  constructor(private http: PisteHttpClient) {}

  async call<T = unknown>(endpointKey: string, opts: RouteCallOptions = {}): Promise<T> {
    const endpoint = getEndpoint(endpointKey);
    const path = appendQuery(fillPathParams(endpoint.path, opts.pathParams), opts.query);
    const requestOpts: RequestOptions = {
      bypassCache: opts.bypassCache,
      ttlMs: opts.ttlMs ?? endpoint.defaultTtlMs,
    };

    if (endpoint.method === "GET") {
      return this.http.get<T>(path, requestOpts);
    }

    return this.http.post<T>(path, opts.body ?? {}, requestOpts);
  }
}
```

- [ ] **Step 4: Run route-client tests**

Run:

```powershell
npm run test --workspace @hacienda/core -- route-client.test.ts
```

Expected: PASS.

- [ ] **Step 5: Run core tests**

Run:

```powershell
npm run test --workspace @hacienda/core
```

Expected: PASS.

- [ ] **Step 6: Commit**

Run:

```powershell
git add packages/core/src/legifrance/route-client.ts packages/core/test/route-client.test.ts
git commit -m "feat: add legifrance route client"
```

Expected: commit succeeds.

---

### Task 4: Add Identifier Resolver

**Files:**
- Create: `packages/core/src/legifrance/identity-resolver.ts`
- Test: `packages/core/test/identity-resolver.test.ts`

- [ ] **Step 1: Write failing resolver tests**

Create `packages/core/test/identity-resolver.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { normalizeLookupText, resolveLegalIdentifier } from "../src/legifrance/identity-resolver.js";

describe("identity resolver", () => {
  it("normalizes accents and punctuation for lookup", () => {
    expect(normalizeLookupText("Code pénal")).toBe("code penal");
    expect(normalizeLookupText("  Code   de l'urbanisme ")).toBe("code de l urbanisme");
  });

  it("detects common Legifrance identifiers", () => {
    expect(resolveLegalIdentifier("LEGIARTI000006417707")).toMatchObject({ kind: "article", id: "LEGIARTI000006417707" });
    expect(resolveLegalIdentifier("LEGITEXT000006070721")).toMatchObject({ kind: "text", id: "LEGITEXT000006070721" });
    expect(resolveLegalIdentifier("JURITEXT000047000001")).toMatchObject({ kind: "juri", id: "JURITEXT000047000001" });
    expect(resolveLegalIdentifier("JORFTEXT000000000001")).toMatchObject({ kind: "jorf", id: "JORFTEXT000000000001" });
    expect(resolveLegalIdentifier("IDCC 1486")).toMatchObject({ kind: "idcc", id: "1486" });
    expect(resolveLegalIdentifier("BOI-IS-BASE-30-30-20-20")).toMatchObject({ kind: "bofip", id: "BOI-IS-BASE-30-30-20-20" });
  });

  it("resolves common code names accent-insensitively", () => {
    expect(resolveLegalIdentifier("Code penal")).toMatchObject({
      kind: "code",
      id: "LEGITEXT000006070719",
      confidence: "high",
    });
  });

  it("detects catalog references for BOCC and BODMR", () => {
    expect(resolveLegalIdentifier("BOCC 2024-12")).toMatchObject({ kind: "bocc", confidence: "medium" });
    expect(resolveLegalIdentifier("BODMR 2023")).toMatchObject({ kind: "bodmr", confidence: "medium" });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```powershell
npm run test --workspace @hacienda/core -- identity-resolver.test.ts
```

Expected: FAIL because module does not exist.

- [ ] **Step 3: Implement resolver**

Create `packages/core/src/legifrance/identity-resolver.ts`:

```ts
import { COMMON_CODES_LEGITEXT } from "../codes-legitext.js";

export type ResolvedIdentifierKind =
  | "acco"
  | "article"
  | "bocc"
  | "bodmr"
  | "bofip"
  | "code"
  | "cnil"
  | "eli"
  | "idcc"
  | "jorf"
  | "juri"
  | "kali"
  | "nor"
  | "section"
  | "text"
  | "unknown";

export interface ResolvedIdentifier {
  kind: ResolvedIdentifierKind;
  input: string;
  id?: string;
  confidence: "high" | "medium" | "low";
  suggestedEndpointKey?: string;
}

const normalizedCodes = new Map(
  Object.entries(COMMON_CODES_LEGITEXT).map(([name, id]) => [normalizeLookupText(name), id]),
);

export function normalizeLookupText(input: string): string {
  return input
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\p{Letter}\p{Number}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function resolveLegalIdentifier(input: string): ResolvedIdentifier {
  const trimmed = input.trim();
  const upper = trimmed.toUpperCase();
  const normalized = normalizeLookupText(trimmed);

  const codeId = normalizedCodes.get(normalized);
  if (codeId) {
    return { kind: "code", input, id: codeId, confidence: "high", suggestedEndpointKey: "consult.code" };
  }

  if (/^LEGIARTI\d+$/i.test(trimmed)) {
    return { kind: "article", input, id: upper, confidence: "high", suggestedEndpointKey: "consult.getArticle" };
  }
  if (/^LEGISCTA\d+$/i.test(trimmed)) {
    return { kind: "section", input, id: upper, confidence: "high", suggestedEndpointKey: "consult.getSectionByCid" };
  }
  if (/^LEGITEXT\d+$/i.test(trimmed)) {
    return { kind: "text", input, id: upper, confidence: "high", suggestedEndpointKey: "consult.legiPart" };
  }
  if (/^JORFTEXT\d+$/i.test(trimmed) || /^JORFARTI\d+$/i.test(trimmed)) {
    return { kind: "jorf", input, id: upper, confidence: "high", suggestedEndpointKey: "consult.jorf" };
  }
  if (/^(JURITEXT|CETATEXT|CONSTEXT)\d+$/i.test(trimmed)) {
    return { kind: "juri", input, id: upper, confidence: "high", suggestedEndpointKey: "consult.juri" };
  }
  if (/^KALI[A-Z]*\d+$/i.test(trimmed)) {
    return { kind: "kali", input, id: upper, confidence: "high", suggestedEndpointKey: "consult.kaliText" };
  }
  const idcc = upper.match(/\bIDCC\s*(\d{2,5})\b/);
  if (idcc) {
    return { kind: "idcc", input, id: idcc[1], confidence: "high", suggestedEndpointKey: "consult.kaliContIdcc" };
  }
  if (/^BOI-[A-Z0-9-]+$/i.test(trimmed)) {
    return { kind: "bofip", input, id: upper, confidence: "high", suggestedEndpointKey: "consult.circulaire" };
  }
  if (/^https?:\/\/.*eli\//i.test(trimmed) || /^ELI[:\s]/i.test(trimmed)) {
    return { kind: "eli", input, id: trimmed, confidence: "medium", suggestedEndpointKey: "consult.eliAndAliasRedirectionTexte" };
  }
  if (/^[A-Z]{4}\d{7}[A-Z]$/i.test(trimmed)) {
    return { kind: "nor", input, id: upper, confidence: "medium", suggestedEndpointKey: "consult.getJoWithNor" };
  }
  if (/^BOCC\b/i.test(trimmed)) {
    return { kind: "bocc", input, id: trimmed, confidence: "medium", suggestedEndpointKey: "list.bocc" };
  }
  if (/^BODMR\b/i.test(trimmed)) {
    return { kind: "bodmr", input, id: trimmed, confidence: "medium", suggestedEndpointKey: "list.bodmr" };
  }

  return { kind: "unknown", input, confidence: "low" };
}
```

- [ ] **Step 4: Run resolver tests**

Run:

```powershell
npm run test --workspace @hacienda/core -- identity-resolver.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

Run:

```powershell
git add packages/core/src/legifrance/identity-resolver.ts packages/core/test/identity-resolver.test.ts
git commit -m "feat: add legifrance identifier resolver"
```

Expected: commit succeeds.

---

### Task 5: Add Expert API Call Tool

**Files:**
- Create: `packages/core/src/tools/api-call.ts`
- Modify: `packages/core/src/index.ts`
- Test: `packages/core/test/api-call.test.ts`
- Modify: `packages/core/test/smoke.test.ts`

- [ ] **Step 1: Write tool unit tests**

Create `packages/core/test/api-call.test.ts`:

```ts
import { describe, expect, it, vi } from "vitest";
import { callLegifranceApiExpert } from "../src/tools/api-call.js";

describe("legifrance_api_call", () => {
  it("rejects unknown endpoint keys", async () => {
    const route = { call: vi.fn() };
    await expect(callLegifranceApiExpert(route as never, { endpoint: "missing.route" })).resolves.toMatchObject({
      isError: true,
    });
  });

  it("passes body and bypassCache to the route client", async () => {
    const route = { call: vi.fn().mockResolvedValue({ ok: true }) };
    const result = await callLegifranceApiExpert(route as never, {
      endpoint: "consult.getArticle",
      body: { id: "LEGIARTI1" },
      bypassCache: true,
    });
    expect(route.call).toHaveBeenCalledWith("consult.getArticle", {
      body: { id: "LEGIARTI1" },
      bypassCache: true,
      pathParams: undefined,
      query: undefined,
    });
    expect(result.content[0]!.text).toContain('"ok": true');
  });

  it("supports path params for GET routes", async () => {
    const route = { call: vi.fn().mockResolvedValue({ hasVersions: true }) };
    await callLegifranceApiExpert(route as never, {
      endpoint: "chrono.hasTextCid",
      pathParams: { textCid: "LEGITEXT000006070721" },
    });
    expect(route.call).toHaveBeenCalledWith("chrono.hasTextCid", {
      pathParams: { textCid: "LEGITEXT000006070721" },
      body: undefined,
      bypassCache: undefined,
      query: undefined,
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```powershell
npm run test --workspace @hacienda/core -- api-call.test.ts
```

Expected: FAIL because `api-call.ts` does not exist.

- [ ] **Step 3: Implement expert tool**

Create `packages/core/src/tools/api-call.ts`:

```ts
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getEndpoint } from "../legifrance/endpoints.js";
import type { LegifranceRouteClient } from "../legifrance/route-client.js";

const ApiCallArgsSchema = z.object({
  endpoint: z.string().describe("Registered endpoint key, for example consult.getArticle or chrono.hasTextCid."),
  pathParams: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
  query: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
  body: z.unknown().optional(),
  bypassCache: z.boolean().optional(),
});

export type ApiCallArgs = z.infer<typeof ApiCallArgsSchema>;

export async function callLegifranceApiExpert(route: LegifranceRouteClient, args: ApiCallArgs) {
  try {
    const endpoint = getEndpoint(args.endpoint);
    const data = await route.call(args.endpoint, {
      pathParams: args.pathParams,
      query: args.query,
      body: args.body,
      bypassCache: args.bypassCache,
    });
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              endpoint: endpoint.key,
              path: endpoint.path,
              status: endpoint.status,
              data,
            },
            null,
            2,
          ),
        },
      ],
    };
  } catch (err) {
    return {
      isError: true,
      content: [
        {
          type: "text" as const,
          text: err instanceof Error ? err.message : String(err),
        },
      ],
    };
  }
}

export function registerApiCall(server: McpServer, route: LegifranceRouteClient) {
  server.registerTool(
    "legifrance_api_call",
    {
      title: "Appel expert d'une route Légifrance enregistrée",
      description:
        "Outil expert/debug. Appelle une route Légifrance déclarée dans le registre interne. À utiliser seulement lorsqu'aucun tool métier ne couvre le cas.",
      inputSchema: ApiCallArgsSchema.shape,
    },
    async (args) => callLegifranceApiExpert(route, args),
  );
}
```

- [ ] **Step 4: Wire route client and tool into server**

Modify `packages/core/src/index.ts`:

```ts
import { LegifranceRouteClient } from "./legifrance/route-client.js";
import { registerApiCall } from "./tools/api-call.js";
```

Inside `createHaciendaServer`, after `const http = ...`:

```ts
  const route = new LegifranceRouteClient(http);
```

After `registerCacheClear(server, cache);`:

```ts
  registerApiCall(server, route);
```

Add exports:

```ts
export { LegifranceRouteClient } from "./legifrance/route-client.js";
export { registerApiCall } from "./tools/api-call.js";
```

- [ ] **Step 5: Update smoke test expected tools**

Modify `packages/core/test/smoke.test.ts` expected tools array and add:

```ts
"legifrance_api_call",
```

- [ ] **Step 6: Run API call and smoke tests**

Run:

```powershell
npm run test --workspace @hacienda/core -- api-call.test.ts smoke.test.ts
```

Expected: PASS.

- [ ] **Step 7: Run typecheck**

Run:

```powershell
npm run typecheck --workspaces --if-present
```

Expected: PASS.

- [ ] **Step 8: Commit**

Run:

```powershell
git add packages/core/src/tools/api-call.ts packages/core/src/index.ts packages/core/test/api-call.test.ts packages/core/test/smoke.test.ts
git commit -m "feat: add expert legifrance api call tool"
```

Expected: commit succeeds.

---

### Task 6: Add BOFiP Alias Tools

**Files:**
- Create: `packages/core/src/tools/bofip.ts`
- Modify: `packages/core/src/index.ts`
- Test: `packages/core/test/bofip-alias.test.ts`
- Modify: `packages/core/test/smoke.test.ts`

- [ ] **Step 1: Write failing BOFiP alias tests**

Create `packages/core/test/bofip-alias.test.ts`:

```ts
import { describe, expect, it, vi } from "vitest";
import { callBofipConsulter, callBofipRechercher } from "../src/tools/bofip.js";

describe("BOFiP alias tools", () => {
  it("searches BOFiP through CIRC search defaults", async () => {
    const http = { post: vi.fn().mockResolvedValue({ totalResultNumber: 0, results: [] }) };
    const result = await callBofipRechercher(http as never, { query: "micro-BNC", pageSize: 5, pageNumber: 1 });
    expect(http.post).toHaveBeenCalledWith(
      "/search",
      expect.objectContaining({ fond: "CIRC" }),
    );
    expect(result.content[0]!.text).toContain("micro-BNC");
  });

  it("consults BOFiP documents through consult/circulaire", async () => {
    const http = {
      post: vi.fn().mockResolvedValue({
        circulaire: { id: "BOI-IS-BASE-30-30-20-20", titre: "BOFiP test", texteHtml: "<p>Texte</p>" },
      }),
    };
    const result = await callBofipConsulter(http as never, { id: "BOI-IS-BASE-30-30-20-20" });
    expect(http.post).toHaveBeenCalledWith("/consult/circulaire", { id: "BOI-IS-BASE-30-30-20-20" });
    expect(result.content[0]!.text).toContain("BOFiP test");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```powershell
npm run test --workspace @hacienda/core -- bofip-alias.test.ts
```

Expected: FAIL because `bofip.ts` does not exist.

- [ ] **Step 3: Implement BOFiP aliases**

Create `packages/core/src/tools/bofip.ts`:

```ts
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { PisteHttpClient } from "../http.js";
import { buildSearchRequest } from "../search-builder.js";
import { SearchResponseSchema, ConsultCirculaireResponseSchema } from "../schemas.js";
import { summarizeSearchResponse, formatSearchResultsAsMarkdown } from "../format.js";
import { registerGetCirculaire } from "./get-circulaire.js";

const BofipSearchArgsSchema = z.object({
  query: z.string().min(1),
  pageSize: z.number().int().min(1).max(50).default(10),
  pageNumber: z.number().int().min(1).default(1),
});

const BofipConsultArgsSchema = z.object({
  id: z.string().min(1).describe("Identifiant BOFiP, par exemple BOI-IS-BASE-30-30-20-20."),
});

export async function callBofipRechercher(
  http: Pick<PisteHttpClient, "post">,
  args: z.infer<typeof BofipSearchArgsSchema>,
) {
  const body = buildSearchRequest({
    query: args.query,
    fond: "CIRC",
    pageSize: args.pageSize,
    pageNumber: args.pageNumber,
  });
  const raw = await http.post("/search", body);
  const parsed = SearchResponseSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      isError: true,
      content: [{ type: "text" as const, text: `Réponse BOFiP/Légifrance inattendue : ${parsed.error.message.slice(0, 300)}` }],
    };
  }
  const { total, hits } = summarizeSearchResponse(parsed.data);
  return {
    content: [{ type: "text" as const, text: formatSearchResultsAsMarkdown(total, hits, "BOFiP", args.query) }],
  };
}

export async function callBofipConsulter(
  http: Pick<PisteHttpClient, "post">,
  args: z.infer<typeof BofipConsultArgsSchema>,
) {
  const raw = await http.post("/consult/circulaire", { id: args.id });
  const parsed = ConsultCirculaireResponseSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      isError: true,
      content: [{ type: "text" as const, text: `Réponse BOFiP/Légifrance inattendue : ${parsed.error.message.slice(0, 300)}` }],
    };
  }
  const c = parsed.data.circulaire;
  if (!c) {
    return {
      isError: true,
      content: [{ type: "text" as const, text: `Document BOFiP introuvable : ${args.id}` }],
    };
  }
  const title = c.titre ?? args.id;
  const text = c.texteHtml ? c.texteHtml.replace(/<[^>]+>/g, "").trim() : "";
  return {
    content: [
      {
        type: "text" as const,
        text: [`# ${title}`, "", text, "", `Identifiant : \`${args.id}\``].join("\n"),
      },
    ],
  };
}

export function registerBofipAliases(server: McpServer, http: PisteHttpClient) {
  server.registerTool(
    "bofip_rechercher",
    {
      title: "Recherche BOFiP",
      description: "Alias fiscal de recherche dans la doctrine BOFiP via Légifrance/PISTE.",
      inputSchema: BofipSearchArgsSchema.shape,
    },
    async (args) => callBofipRechercher(http, args),
  );

  server.registerTool(
    "bofip_consulter",
    {
      title: "Consulter une fiche BOFiP",
      description: "Alias fiscal pour consulter une fiche BOFiP par identifiant BOI-* via Légifrance/PISTE.",
      inputSchema: BofipConsultArgsSchema.shape,
    },
    async (args) => callBofipConsulter(http, args),
  );

  void registerGetCirculaire;
}
```

- [ ] **Step 4: Wire aliases into server**

Modify `packages/core/src/index.ts`:

```ts
import { registerBofipAliases } from "./tools/bofip.js";
```

After existing tool registrations:

```ts
  registerBofipAliases(server, http);
```

Add export:

```ts
export { registerBofipAliases } from "./tools/bofip.js";
```

- [ ] **Step 5: Update smoke test expected tools**

Modify expected tools array in `packages/core/test/smoke.test.ts` and add:

```ts
"bofip_rechercher",
"bofip_consulter",
```

- [ ] **Step 6: Run BOFiP and smoke tests**

Run:

```powershell
npm run test --workspace @hacienda/core -- bofip-alias.test.ts smoke.test.ts
```

Expected: PASS.

- [ ] **Step 7: Commit**

Run:

```powershell
git add packages/core/src/tools/bofip.ts packages/core/src/index.ts packages/core/test/bofip-alias.test.ts packages/core/test/smoke.test.ts
git commit -m "feat: add bofip alias tools"
```

Expected: commit succeeds.

---

### Task 7: Add `JUFI` To Search Schema And Preserve Existing Search

**Files:**
- Modify: `packages/core/src/schemas.ts`
- Test: `packages/core/test/search.test.ts`

- [ ] **Step 1: Add a failing test for JUFI**

Add to `packages/core/test/search.test.ts`:

```ts
it("accepts JUFI as a search fond", () => {
  const body = buildSearchRequest({ query: "impôt", fond: "JUFI" });
  expect(body.fond).toBe("JUFI");
  expect(body.recherche.sort).toBe("PERTINENCE");
});
```

- [ ] **Step 2: Run test**

Run:

```powershell
npm run test --workspace @hacienda/core -- search.test.ts
```

Expected: PASS if `JUFI` is already present, otherwise FAIL.

- [ ] **Step 3: Patch schema if needed**

If the test fails, add `"JUFI"` to `FOND_VALUES` in `packages/core/src/schemas.ts`:

```ts
  "JUFI",
```

- [ ] **Step 4: Run search tests**

Run:

```powershell
npm run test --workspace @hacienda/core -- search.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

Run:

```powershell
git add packages/core/src/schemas.ts packages/core/test/search.test.ts
git commit -m "test: cover jufi search fond"
```

Expected: commit succeeds. If only the test changed because `JUFI` already existed, commit only the test.

---

### Task 8: Add Normalized Model Types

**Files:**
- Create: `packages/core/src/legifrance/models.ts`
- Test: `packages/core/test/models.test.ts`

- [ ] **Step 1: Write model type smoke test**

Create `packages/core/test/models.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import type { LegalDocument, LegalSearchResult } from "../src/legifrance/models.js";

describe("normalized legal models", () => {
  it("supports stable search and document shapes", () => {
    const hit: LegalSearchResult = {
      id: "LEGIARTI000006417707",
      source: "LEGI",
      title: "Article 1240",
      officialUrl: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006417707/",
      snippets: ["Tout fait quelconque..."],
    };
    const doc: LegalDocument = {
      id: hit.id,
      source: hit.source,
      title: hit.title,
      officialUrl: hit.officialUrl,
      text: "Tout fait quelconque...",
    };
    expect(doc.id).toBe(hit.id);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```powershell
npm run test --workspace @hacienda/core -- models.test.ts
```

Expected: FAIL because module does not exist.

- [ ] **Step 3: Implement normalized model types**

Create `packages/core/src/legifrance/models.ts`:

```ts
export type LegalSource =
  | "ACCO"
  | "BOCC"
  | "BODMR"
  | "BOFiP"
  | "CIRC"
  | "CNIL"
  | "CODE"
  | "CONSTIT"
  | "JORF"
  | "JURI"
  | "JUFI"
  | "KALI"
  | "LEGI"
  | "LODA"
  | "PARLIAMENTARY";

export interface LegalSearchResult {
  id?: string;
  cid?: string;
  source: LegalSource;
  title?: string;
  date?: string;
  nature?: string;
  status?: string;
  officialUrl?: string;
  snippets: string[];
}

export interface LegalDocument {
  id: string;
  cid?: string;
  source: LegalSource;
  title?: string;
  date?: string;
  nature?: string;
  status?: string;
  officialUrl?: string;
  text?: string;
  raw?: unknown;
}

export interface LegalArticle extends LegalDocument {
  articleNumber?: string;
  parentTextId?: string;
  sectionTitle?: string;
  startDate?: string;
  endDate?: string;
}

export interface LegalVersion {
  id: string;
  cid?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  text?: string;
  officialUrl?: string;
}

export interface LegalDiff {
  from: LegalVersion;
  to: LegalVersion;
  added: string[];
  removed: string[];
  changed: string[];
  summary: string;
}

export interface LegalLink {
  type: "related" | "concordance" | "service-public" | "parent" | "same-number" | "official";
  title?: string;
  id?: string;
  url?: string;
}
```

- [ ] **Step 4: Run model test**

Run:

```powershell
npm run test --workspace @hacienda/core -- models.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

Run:

```powershell
git add packages/core/src/legifrance/models.ts packages/core/test/models.test.ts
git commit -m "feat: add normalized legal model types"
```

Expected: commit succeeds.

---

### Task 9: Run Full Verification

**Files:**
- No source changes expected unless a verification failure exposes a defect.

- [ ] **Step 1: Run full build**

Run:

```powershell
npm run build --workspaces --if-present
```

Expected: PASS.

- [ ] **Step 2: Run full typecheck**

Run:

```powershell
npm run typecheck --workspaces --if-present
```

Expected: PASS.

- [ ] **Step 3: Run full tests**

Run:

```powershell
npm run test --workspaces --if-present
```

Expected: PASS.

- [ ] **Step 4: Run audit and record status**

Run:

```powershell
npm audit --audit-level=moderate
```

Expected: currently may report existing transitive vulnerabilities. Do not fix in this feature unless directly caused by the feature branch. Record the audit result in the final implementation summary.

- [ ] **Step 5: Inspect Git changes**

Run:

```powershell
git status --short
git diff --stat
```

Expected: only intended files changed; generated plugin bundles may change after build and should be reviewed before commit.

- [ ] **Step 6: Final commit if verification changed tracked files**

If build updated committed bundles or package metadata intentionally, run:

```powershell
git add <intended-files>
git commit -m "chore: verify legifrance complete coverage foundation"
```

Expected: commit contains only intended generated or verification-related files.

## Follow-On Plans

After this foundation lands, split the remaining work into separate implementation plans:

1. `legifrance_versions` and `legifrance_comparer`;
2. `legifrance_liens` and section/table-of-contents navigation;
3. KALI/IDCC/BOCC/ACCO social coverage;
4. BOFiP fiscal normalization and citation formatting;
5. watch/catalog workflows;
6. parliamentary and CNIL workflows.

Each follow-on plan should include live fixture capture only behind `PISTE_LIVE_TESTS=1`.

## Self-Review

- Spec coverage: This plan covers the registry, route client, resolver, expert call, BOFiP aliases, JUFI, BODMR, LEGI, and review corrections. It intentionally defers deep domain formatters to follow-on plans.
- Placeholder scan: no `TBD`, `TODO`, or placeholder-only steps should remain.
- Type consistency: endpoint keys use dotted registry names; route-client call options consistently use `pathParams`, `query`, `body`, `bypassCache`, and `ttlMs`.
