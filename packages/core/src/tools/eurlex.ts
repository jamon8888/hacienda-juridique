import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { request } from "undici";
import { z } from "zod";
import { EurlexClient, SPARQL_ENDPOINT } from "../eurlex/client.js";
import { formatEurlexDocument, formatEurlexMetadata, formatEurlexSearchResults } from "../eurlex/format.js";
import { defaultEurlexStatusUnavailable, probeEurlexStatusFromResponses, type EurlexStatus } from "../eurlex/status.js";
import type { EurlexLanguage } from "../eurlex/celex.js";
import type { EurlexMetadata, EurlexResourceType, EurlexSearchArgs, EurlexSearchResponse } from "../eurlex/types.js";

export interface EurlexRechercheArgs {
  query: string;
  resource_type?: EurlexResourceType;
  language?: EurlexLanguage;
  limit?: number;
  date_from?: string;
  date_to?: string;
}

export interface EurlexConsulterArgs {
  celex_id: string;
  language?: EurlexLanguage;
  format?: "plain" | "xhtml";
  max_chars?: number;
}

export interface EurlexMetadataArgs {
  celex_id: string;
  language?: EurlexLanguage;
}

export interface EurlexClientLike {
  search(args: EurlexSearchArgs): Promise<EurlexSearchResponse>;
  fetchDocument(celexId: string, language?: EurlexLanguage): Promise<string>;
  metadata(celexId: string, language?: EurlexLanguage): Promise<EurlexMetadata>;
}

export type EurlexProbe = () => Promise<EurlexStatus>;

function textResult(text: string, isError?: true) {
  return {
    ...(isError ? { isError } : {}),
    content: [{ type: "text" as const, text }],
  };
}

function errorMessage(prefix: string, error: unknown): string {
  const detail = error instanceof Error ? error.message : String(error);
  return `${prefix} : ${detail.slice(0, 500)}`;
}

export async function callEurlexStatus(probe: EurlexProbe) {
  try {
    return textResult(JSON.stringify(await probe(), null, 2));
  } catch (error) {
    return textResult(JSON.stringify(defaultEurlexStatusUnavailable(error), null, 2));
  }
}

export async function callEurlexRecherche(client: EurlexClientLike, args: EurlexRechercheArgs) {
  try {
    const response = await client.search({
      query: args.query,
      resourceType: args.resource_type ?? "any",
      language: args.language ?? "FRA",
      limit: args.limit ?? 10,
      dateFrom: args.date_from,
      dateTo: args.date_to,
    });

    return textResult(formatEurlexSearchResults(response.results, response.query, response.retrievedAt));
  } catch (error) {
    return textResult(errorMessage("Erreur EUR-Lex pendant la recherche", error), true);
  }
}

export async function callEurlexConsulter(client: EurlexClientLike, args: EurlexConsulterArgs) {
  try {
    const language = args.language ?? "FRA";
    const [body, metadata] = await Promise.all([
      client.fetchDocument(args.celex_id, language),
      client.metadata(args.celex_id, language).catch(() => undefined),
    ]);

    return textResult(
      formatEurlexDocument({
        celexId: args.celex_id,
        language,
        title: metadata?.title,
        body,
        retrievedAt: metadata?.retrievedAt ?? new Date().toISOString(),
        maxChars: args.max_chars ?? 20_000,
      }),
    );
  } catch (error) {
    return textResult(errorMessage("Erreur EUR-Lex pendant la consultation du document", error), true);
  }
}

export async function callEurlexMetadata(client: EurlexClientLike, args: EurlexMetadataArgs) {
  try {
    const metadata = await client.metadata(args.celex_id, args.language ?? "FRA");
    return textResult(formatEurlexMetadata(metadata));
  } catch (error) {
    return textResult(errorMessage("Erreur EUR-Lex pendant la lecture des métadonnées", error), true);
  }
}

export function registerEurlexTools(server: McpServer, client: EurlexClientLike = new EurlexClient()) {
  server.registerTool(
    "eurlex_status",
    {
      title: "État de la connexion EUR-Lex",
      description: "Diagnostic de disponibilité EUR-Lex / Publications Office, incluant SPARQL et consultation CELEX.",
      inputSchema: z.object({}).shape,
    },
    () => callEurlexStatus(liveEurlexProbe),
  );

  server.registerTool(
    "eurlex_recherche",
    {
      title: "Recherche EUR-Lex",
      description: "Recherche dans EUR-Lex via le SPARQL endpoint du Publications Office et retourne les documents CELEX pertinents.",
      inputSchema: {
        query: z.string().min(3).max(500).describe("Termes à rechercher dans EUR-Lex."),
        resource_type: z.enum(["any", "regulation", "directive", "decision", "case-law"]).default("any"),
        language: z.enum(["FRA", "ENG", "DEU"]).default("FRA"),
        limit: z.number().int().min(1).max(50).default(10),
        date_from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/u).optional(),
        date_to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/u).optional(),
      },
    },
    (args) => callEurlexRecherche(client, args),
  );

  server.registerTool(
    "eurlex_consulter",
    {
      title: "Consulter un document EUR-Lex",
      description: "Récupère un document EUR-Lex par identifiant CELEX et retourne un document Markdown lisible.",
      inputSchema: {
        celex_id: z.string().min(5).describe("Identifiant CELEX, par exemple 32016R0679."),
        language: z.enum(["FRA", "ENG", "DEU"]).default("FRA"),
        format: z.enum(["plain", "xhtml"]).default("plain"),
        max_chars: z.number().int().min(1000).max(50_000).default(20_000),
      },
    },
    (args) => callEurlexConsulter(client, args),
  );

  server.registerTool(
    "eurlex_metadata",
    {
      title: "Métadonnées EUR-Lex",
      description: "Récupère les métadonnées d'un document EUR-Lex par identifiant CELEX.",
      inputSchema: {
        celex_id: z.string().min(5).describe("Identifiant CELEX, par exemple 32016R0679."),
        language: z.enum(["FRA", "ENG", "DEU"]).default("FRA"),
      },
    },
    (args) => callEurlexMetadata(client, args),
  );
}

async function liveEurlexProbe(): Promise<EurlexStatus> {
  try {
    const [sparql, cellar] = await Promise.allSettled([
      request(`${SPARQL_ENDPOINT}?query=${encodeURIComponent("ASK {}")}&format=application/sparql-results+json`, {
        method: "GET",
        headersTimeout: 10_000,
        bodyTimeout: 10_000,
      }),
      request("https://publications.europa.eu/resource/celex/32016R0679", {
        method: "GET",
        headersTimeout: 10_000,
        bodyTimeout: 10_000,
      }),
    ]);

    const sparqlProbe =
      sparql.status === "fulfilled"
        ? { statusCode: sparql.value.statusCode }
        : { error: sparql.reason instanceof Error ? sparql.reason.message : String(sparql.reason) };
    const cellarProbe =
      cellar.status === "fulfilled"
        ? { statusCode: cellar.value.statusCode, contentType: headerToString(cellar.value.headers["content-type"]) }
        : { error: cellar.reason instanceof Error ? cellar.reason.message : String(cellar.reason) };

    if (sparql.status === "fulfilled") {
      await sparql.value.body.text();
    }
    if (cellar.status === "fulfilled") {
      await cellar.value.body.text();
    }

    return probeEurlexStatusFromResponses({ sparql: sparqlProbe, cellar: cellarProbe });
  } catch (error) {
    return defaultEurlexStatusUnavailable(error);
  }
}

function headerToString(header: string | string[] | undefined): string | undefined {
  return Array.isArray(header) ? header.join(", ") : header;
}
