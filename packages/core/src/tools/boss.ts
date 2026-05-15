import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  BOSS_HOME_URL,
  BOSS_ORIGIN,
  fetchBossText,
  type BossTextResponse,
} from "../boss/client.js";
import { formatBossDocument, formatBossSearchResults } from "../boss/format.js";
import {
  buildBossSearchIndex,
  searchBossIndex,
  type BossSearchArgs,
} from "../boss/index.js";
import { parseBossDocument, type BossDocument } from "../boss/parser.js";
import {
  defaultBossStatusUnavailable,
  probeBossStatusFromResponses,
  type BossStatus,
} from "../boss/status.js";

export interface BossRechercheArgs {
  query: string;
  rubrique?: string;
  pageSize?: number;
}

export interface BossGetDocumentArgs {
  url: string;
}

export type BossProbe = () => Promise<BossStatus>;
export type BossFetcher = (url: string) => Promise<BossTextResponse>;

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

export async function callBossStatus(probe: BossProbe) {
  try {
    return textResult(JSON.stringify(await probe(), null, 2));
  } catch (error) {
    return textResult(JSON.stringify(defaultBossStatusUnavailable(error), null, 2));
  }
}

export function callBossRecherche(documents: BossDocument[], args: BossRechercheArgs) {
  try {
    const index = buildBossSearchIndex(documents);
    const hits = searchBossIndex(index, args satisfies BossSearchArgs);
    return textResult(formatBossSearchResults(hits, args.query));
  } catch (error) {
    return textResult(errorMessage("Erreur BOSS pendant la recherche", error), true);
  }
}

export async function callBossGetDocument(fetcher: BossFetcher, args: BossGetDocumentArgs) {
  try {
    const response = await fetcher(args.url);
    if (response.statusCode !== 200) {
      throw new Error(`HTTP ${response.statusCode} pour ${response.url}`);
    }

    if (!response.contentType || !/html/i.test(response.contentType)) {
      throw new Error(`Type de contenu BOSS inattendu pour ${response.url}: ${response.contentType ?? "absent"}`);
    }

    return textResult(formatBossDocument(parseBossDocument(response.text, response.url)));
  } catch (error) {
    return textResult(errorMessage("Erreur BOSS pendant la consultation du document", error), true);
  }
}

export function registerBossTools(server: McpServer, documents: BossDocument[] = []) {
  server.registerTool(
    "boss_status",
    {
      title: "État de la connexion BOSS",
      description:
        "Diagnostic de disponibilité du Bulletin officiel de la Sécurité sociale (BOSS), incluant robots.txt et lecture HTML.",
      inputSchema: z.object({}).shape,
    },
    () => callBossStatus(liveBossProbe),
  );

  server.registerTool(
    "boss_recherche",
    {
      title: "Recherche BOSS",
      description:
        "Recherche dans les documents BOSS fournis au serveur et retourne des résultats Markdown avec liens officiels.",
      inputSchema: {
        query: z.string().min(1).describe("Termes à rechercher dans le BOSS."),
        rubrique: z.string().min(1).optional().describe("Filtre optionnel sur le fil d'Ariane / rubrique BOSS."),
        pageSize: z.number().int().min(1).max(50).default(10).describe("Nombre de résultats (max 50)."),
      },
    },
    (args) => callBossRecherche(documents, args),
  );

  server.registerTool(
    "boss_get_document",
    {
      title: "Consulter un document BOSS",
      description: "Récupère une page HTML BOSS par URL officielle et retourne un document Markdown lisible.",
      inputSchema: {
        url: z.string().url().describe("URL https://boss.gouv.fr/ du document BOSS à consulter."),
      },
    },
    (args) => callBossGetDocument(fetchBossText, args),
  );
}

async function liveBossProbe(): Promise<BossStatus> {
  try {
    const [robots, homepage] = await Promise.all([
      fetchBossText(`${BOSS_ORIGIN}/robots.txt`),
      fetchBossText(BOSS_HOME_URL),
    ]);

    return probeBossStatusFromResponses({
      homeUrl: BOSS_HOME_URL,
      robots: {
        statusCode: robots.statusCode,
        text: robots.text,
      },
      homepage: {
        statusCode: homepage.statusCode,
        contentType: homepage.contentType,
        text: homepage.text,
      },
      cacheEntries: 0,
    });
  } catch (error) {
    return defaultBossStatusUnavailable(error);
  }
}
