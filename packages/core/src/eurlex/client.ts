import { request, type Dispatcher } from "undici";
import { assertCelexId, eurlexDocumentUrl, publicationsCelexUrl, type EurlexLanguage } from "./celex.js";
import type { EurlexMetadata, EurlexResourceType, EurlexSearchArgs, EurlexSearchResponse, EurlexSearchResult } from "./types.js";

export const SPARQL_ENDPOINT = "https://publications.europa.eu/webapi/rdf/sparql";
export const CELLAR_REST_BASE = "https://publications.europa.eu/resource/celex";
export const EURLEX_REQUEST_TIMEOUT_MS = 30_000;

type SparqlValue = { value?: string };
type SparqlBinding = Record<string, SparqlValue | undefined>;
type SparqlResponse = { results?: { bindings?: SparqlBinding[] } };

const RESOURCE_TYPES: Record<Exclude<EurlexResourceType, "any">, string> = {
  regulation: "regulation",
  directive: "directive",
  decision: "decision",
  "case-law": "case-law",
};

export class EurlexHttpError extends Error {
  constructor(
    public status: number,
    public path: string,
    public body: string,
  ) {
    super(`EUR-Lex request failed (HTTP ${status}) for ${path}. Body: ${body}`);
    this.name = "EurlexHttpError";
  }
}

export function escapeSparqlString(input: string): string {
  return input.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

export function buildSearchQuery(args: EurlexSearchArgs): string {
  const limit = normalizeLimit(args.limit);
  const language = args.language ?? "FRA";
  const escapedQuery = escapeSparqlString(args.query.trim());
  const filters = [`FILTER(CONTAINS(LCASE(?title), LCASE("${escapedQuery}")))`];

  if (args.resourceType && args.resourceType !== "any") {
    filters.push(`FILTER(LCASE(?type) = "${RESOURCE_TYPES[args.resourceType]}")`);
  }

  if (args.dateFrom) {
    filters.push(`FILTER(?date >= "${escapeSparqlString(args.dateFrom)}"^^xsd:date)`);
  }

  if (args.dateTo) {
    filters.push(`FILTER(?date <= "${escapeSparqlString(args.dateTo)}"^^xsd:date)`);
  }

  return [
    "PREFIX cdm: <http://publications.europa.eu/ontology/cdm#>",
    "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>",
    "SELECT ?celex ?title ?date ?type WHERE {",
    "  ?work cdm:resource_legal_id_celex ?celex .",
    "  OPTIONAL { ?work cdm:work_date_document ?date . }",
    "  OPTIONAL { ?work cdm:resource_type ?type . }",
    `  ?work cdm:work_title ?title .`,
    `  FILTER(LANG(?title) = "${language.toLowerCase()}")`,
    ...filters.map((filter) => `  ${filter}`),
    "}",
    "ORDER BY DESC(?date)",
    `LIMIT ${limit}`,
  ].join("\n");
}

export function buildMetadataQuery(celexIdInput: string, language: EurlexLanguage = "FRA"): string {
  const celexId = assertCelexId(celexIdInput);
  return [
    "PREFIX cdm: <http://publications.europa.eu/ontology/cdm#>",
    "SELECT ?celex ?title ?dateDocument ?dateEffect ?type ?author ?eurovoc ?directoryCode WHERE {",
    "  ?work cdm:resource_legal_id_celex ?celex .",
    `  FILTER(?celex = "${celexId}")`,
    "  OPTIONAL { ?work cdm:work_title ?title . }",
    `  FILTER(!BOUND(?title) || LANG(?title) = "${language.toLowerCase()}")`,
    "  OPTIONAL { ?work cdm:work_date_document ?dateDocument . }",
    "  OPTIONAL { ?work cdm:resource_legal_date_entry-into-force ?dateEffect . }",
    "  OPTIONAL { ?work cdm:resource_type ?type . }",
    "  OPTIONAL { ?work cdm:work_created_by_agent ?author . }",
    "  OPTIONAL { ?work cdm:resource_legal_is_about_concept_eurovoc ?eurovoc . }",
    "  OPTIONAL { ?work cdm:resource_legal_in-force_directory-code ?directoryCode . }",
    "}",
    "LIMIT 50",
  ].join("\n");
}

export class EurlexClient {
  constructor(private dispatcher?: Dispatcher) {}

  async search(args: EurlexSearchArgs): Promise<EurlexSearchResponse> {
    const language = args.language ?? "FRA";
    const query = buildSearchQuery({ ...args, language });
    const json = await this.getSparqlJson(query);
    const bindings = getBindings(json);
    const seen = new Set<string>();
    const results: EurlexSearchResult[] = [];

    for (const binding of bindings) {
      const celexId = valueOf(binding, "celex");
      if (!celexId || seen.has(celexId)) {
        continue;
      }

      seen.add(celexId);
      results.push({
        celexId,
        title: valueOf(binding, "title") ?? celexId,
        url: eurlexDocumentUrl(celexId, language),
        language,
        resourceType: normalizeResourceType(valueOf(binding, "type")),
        date: valueOf(binding, "date"),
      });
    }

    return {
      query: args.query,
      retrievedAt: new Date().toISOString(),
      results,
    };
  }

  async fetchDocument(celexIdInput: string, language: EurlexLanguage = "FRA"): Promise<string> {
    const celexId = assertCelexId(celexIdInput);
    const url = `${CELLAR_REST_BASE}/${celexId}`;
    const response = await request(url, {
      method: "GET",
      headers: {
        accept: language === "FRA" ? "application/xhtml+xml,text/html,text/plain;q=0.8,*/*;q=0.5" : "application/xhtml+xml,text/html,*/*;q=0.5",
        "accept-language": language.toLowerCase(),
        "user-agent": "HaciendaSourcesOfficielles/0.1 (+https://eur-lex.europa.eu)",
      },
      dispatcher: this.dispatcher,
      bodyTimeout: EURLEX_REQUEST_TIMEOUT_MS,
      headersTimeout: EURLEX_REQUEST_TIMEOUT_MS,
    });
    const body = await response.body.text();

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new EurlexHttpError(response.statusCode, `/resource/celex/${celexId}`, body.slice(0, 500));
    }

    return body;
  }

  async metadata(celexIdInput: string, language: EurlexLanguage = "FRA"): Promise<EurlexMetadata> {
    const celexId = assertCelexId(celexIdInput);
    const json = await this.getSparqlJson(buildMetadataQuery(celexId, language));
    const bindings = getBindings(json);
    const first = bindings[0] ?? {};

    return {
      celexId,
      title: valueOf(first, "title"),
      language,
      url: publicationsCelexUrl(celexId),
      dateDocument: valueOf(first, "dateDocument"),
      dateEffect: valueOf(first, "dateEffect"),
      resourceType: normalizeResourceType(valueOf(first, "type")),
      authors: uniqueValues(bindings, "author"),
      eurovoc: uniqueValues(bindings, "eurovoc"),
      directoryCodes: uniqueValues(bindings, "directoryCode"),
      retrievedAt: new Date().toISOString(),
    };
  }

  private async getSparqlJson(query: string): Promise<SparqlResponse> {
    const params = new URLSearchParams({
      query,
      format: "application/sparql-results+json",
    });
    const url = `${SPARQL_ENDPOINT}?${params.toString()}`;
    const response = await request(url, {
      method: "GET",
      headers: {
        accept: "application/sparql-results+json,application/json",
        "user-agent": "HaciendaSourcesOfficielles/0.1 (+https://eur-lex.europa.eu)",
      },
      dispatcher: this.dispatcher,
      bodyTimeout: EURLEX_REQUEST_TIMEOUT_MS,
      headersTimeout: EURLEX_REQUEST_TIMEOUT_MS,
    });
    const body = await response.body.text();

    if (response.statusCode < 200 || response.statusCode >= 300) {
      const parsedUrl = new URL(url);
      throw new EurlexHttpError(response.statusCode, parsedUrl.pathname + parsedUrl.search, body.slice(0, 500));
    }

    return JSON.parse(body) as SparqlResponse;
  }
}

function normalizeLimit(limit: number | undefined): number {
  if (!limit) {
    return 10;
  }

  return Math.min(50, Math.max(1, Math.trunc(limit)));
}

function normalizeResourceType(value: string | undefined): EurlexResourceType {
  const lower = value?.toLowerCase() ?? "";

  if (lower.includes("regulation")) {
    return "regulation";
  }

  if (lower.includes("directive")) {
    return "directive";
  }

  if (lower.includes("decision")) {
    return "decision";
  }

  if (lower.includes("case")) {
    return "case-law";
  }

  return "any";
}

function getBindings(response: SparqlResponse): SparqlBinding[] {
  return response.results?.bindings ?? [];
}

function valueOf(binding: SparqlBinding, key: string): string | undefined {
  return binding[key]?.value;
}

function uniqueValues(bindings: SparqlBinding[], key: string): string[] {
  return [...new Set(bindings.map((binding) => valueOf(binding, key)).filter((value): value is string => Boolean(value)))];
}
