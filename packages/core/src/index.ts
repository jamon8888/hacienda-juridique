import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { expertApiCallResult, clearCacheResult } from "./tools/api-call.js";
import { createSourceToolResult, sourceToolDefinitions } from "./tools/recherche.js";
import { createStatusResult } from "./tools/status.js";

export type CreateServerOptions = {
  name?: string;
  version?: string;
};

export type CreatedServer = {
  server: McpServer;
  toolNames: string[];
};

const textQuerySchema = {
  query: z.string().optional(),
  identifiant: z.string().optional(),
  date: z.string().optional()
};

export function createHaciendaServer(options: CreateServerOptions = {}): CreatedServer {
  const server = new McpServer({
    name: options.name ?? "hacienda-sources-officielles",
    version: options.version ?? "0.1.0"
  });
  const toolNames: string[] = [];

  function track(name: string) {
    toolNames.push(name);
  }

  server.registerTool(
    "piste_status",
    {
      title: "Statut PISTE",
      description: "Diagnostique la configuration PISTE locale sans exposer les secrets."
    },
    () => createStatusResult()
  );
  track("piste_status");

  for (const definition of sourceToolDefinitions) {
    server.registerTool(
      definition.name,
      {
        title: definition.title,
        description: definition.description,
        inputSchema: textQuerySchema
      },
      () => createSourceToolResult(definition)
    );
    track(definition.name);
  }

  server.registerTool(
    "legifrance_api_call",
    {
      title: "Appel Expert Légifrance",
      description: "Appel expert réservé aux endpoints Légifrance enregistrés.",
      inputSchema: {
        endpoint: z.string().optional(),
        payload: z.record(z.unknown()).optional()
      }
    },
    () => expertApiCallResult()
  );
  track("legifrance_api_call");

  server.registerTool(
    "piste_cache_clear",
    {
      title: "Vider Le Cache PISTE",
      description: "Vide le cache local des réponses PISTE lorsque celui-ci est actif."
    },
    () => clearCacheResult()
  );
  track("piste_cache_clear");

  return { server, toolNames };
}

export { loadConfig } from "./config.js";
