import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { loadConfig, type HaciendaConfig } from "../config.js";
import { jsonResult } from "./api-call.js";

export function createStatusResult(config: HaciendaConfig = loadConfig()): CallToolResult {
  return jsonResult({
    outil: "piste_status",
    statut: config.credentialsSource === "none" ? "credentials absents" : "configuré",
    credentialsSource: config.credentialsSource,
    environnement: config.env,
    clientIdPresent: Boolean(config.clientId),
    clientSecretPresent: Boolean(config.clientSecret),
    message:
      config.credentialsSource === "none"
        ? "Aucun credential PISTE exploitable. Les sources restent marquées à vérifier."
        : "Credentials PISTE détectés. Les appels réseau seront effectués par les tools spécialisés."
  });
}
