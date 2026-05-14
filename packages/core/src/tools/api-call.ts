import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { LegifranceRouteClient } from "../legifrance/route-client.js";
import { getEndpoint } from "../legifrance/endpoints.js";

const stringNumberValue = z.union([z.string(), z.number()]);
const queryValue = z.union([z.string(), z.number(), z.boolean()]);

export const LegifranceApiCallArgsSchema = z.object({
  endpoint: z.string().min(1).describe("Endpoint key from the Légifrance endpoint registry, e.g. consult.getArticle."),
  pathParams: z.record(z.string(), stringNumberValue).optional().describe("Path parameters for templated endpoints."),
  query: z.record(z.string(), queryValue).optional().describe("Query parameters appended to the endpoint path."),
  body: z.unknown().optional().describe("Request body for POST endpoints."),
  bypassCache: z.boolean().optional().describe("When true, bypass the local HTTP response cache."),
});

export type LegifranceApiCallArgs = z.infer<typeof LegifranceApiCallArgsSchema>;

function textResult(text: string, isError?: true) {
  return {
    ...(isError ? { isError } : {}),
    content: [{ type: "text" as const, text }],
  };
}

export async function callLegifranceApiExpert(route: LegifranceRouteClient, args: unknown) {
  try {
    const parsedArgs = LegifranceApiCallArgsSchema.parse(args);
    const endpoint = getEndpoint(parsedArgs.endpoint);
    const data = await route.call(parsedArgs.endpoint, {
      pathParams: parsedArgs.pathParams,
      query: parsedArgs.query,
      body: parsedArgs.body,
      bypassCache: parsedArgs.bypassCache,
    });

    return textResult(
      JSON.stringify(
        {
          endpoint: {
            key: endpoint.key,
            path: endpoint.path,
            status: endpoint.status,
          },
          data,
        },
        null,
        2,
      ),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return textResult(message, true);
  }
}

export function registerApiCall(server: McpServer, route: LegifranceRouteClient) {
  server.registerTool(
    "legifrance_api_call",
    {
      title: "Appel expert API Légifrance",
      description: [
        "Appelle un endpoint Légifrance par sa clé de registre.",
        "Outil expert : utiliser lorsque les tools dédiés ne couvrent pas l'endpoint nécessaire.",
        "Accepte pathParams, query, body et bypassCache puis retourne le JSON brut avec les métadonnées d'endpoint.",
      ].join("\n"),
      inputSchema: LegifranceApiCallArgsSchema.shape,
    },
    async (args) => callLegifranceApiExpert(route, args),
  );
}
