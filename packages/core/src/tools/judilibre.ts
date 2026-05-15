import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { JudilibreClient } from "../judilibre/client.js";
import type { JudilibreConfig } from "../judilibre/config.js";
import { formatJudilibreDecision, formatJudilibreSearch } from "../judilibre/format.js";

export interface JudilibreRechercheArgs {
  query: string;
  pageSize?: number;
  page?: number;
}

export interface JudilibreGetDecisionArgs {
  id: string;
}

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

export function previewSecret(value: string | undefined): string | null {
  if (!value) return null;
  if (value.length <= 4) return "***";
  return `${value.slice(0, 4)}…`;
}

export function callJudilibreStatus(config: JudilibreConfig) {
  const result = {
    env: config.env,
    baseUrl: config.baseUrl,
    hasKeyId: Boolean(config.keyId),
    keySource: config.keySource,
    keyPreview: previewSecret(config.keyId),
    diagnostic: config.keyId
      ? "Configuration Judilibre présente. Utilisez judilibre_recherche pour tester un appel API."
      : "Credentials Judilibre manquants. Définissez JUDILIBRE_KEY_ID ou PISTE_KEY_ID.",
  };

  return textResult(JSON.stringify(result, null, 2));
}

export async function callJudilibreRecherche(client: JudilibreClient, args: JudilibreRechercheArgs) {
  try {
    const response = await client.search({
      query: args.query,
      pageSize: args.pageSize,
      page: args.page,
    });
    return textResult(formatJudilibreSearch(response, args.query));
  } catch (error) {
    return textResult(errorMessage("Erreur Judilibre pendant la recherche", error), true);
  }
}

export async function callJudilibreGetDecision(client: JudilibreClient, args: JudilibreGetDecisionArgs) {
  try {
    const decision = await client.getDecision(args.id);
    return textResult(formatJudilibreDecision(decision, args.id));
  } catch (error) {
    return textResult(errorMessage("Erreur Judilibre pendant la consultation de décision", error), true);
  }
}

export function registerJudilibreTools(
  server: McpServer,
  config: JudilibreConfig,
  client = new JudilibreClient(config),
) {
  server.registerTool(
    "judilibre_status",
    {
      title: "État de la connexion Judilibre",
      description:
        "Diagnostic local de la configuration Judilibre/PISTE pour la jurisprudence judiciaire. Ne révèle jamais la clé complète.",
      inputSchema: z.object({}).shape,
    },
    () => callJudilibreStatus(config),
  );

  server.registerTool(
    "judilibre_recherche",
    {
      title: "Recherche Judilibre",
      description:
        "Recherche des décisions judiciaires dans Judilibre (Cour de cassation) et retourne des résultats Markdown avec métadonnées et liens officiels.",
      inputSchema: {
        query: z.string().min(1).describe("Termes à rechercher dans Judilibre."),
        pageSize: z.number().int().min(1).max(50).default(10).describe("Nombre de résultats (max 50)."),
        page: z.number().int().min(0).optional().describe("Page de résultats Judilibre."),
      },
    },
    (args) => callJudilibreRecherche(client, args),
  );

  server.registerTool(
    "judilibre_get_decision",
    {
      title: "Consulter une décision Judilibre",
      description:
        "Récupère une décision Judilibre par identifiant et retourne un document Markdown lisible avec lien Cour de cassation.",
      inputSchema: {
        id: z.string().min(1).describe("Identifiant Judilibre de la décision."),
      },
    },
    (args) => callJudilibreGetDecision(client, args),
  );
}
