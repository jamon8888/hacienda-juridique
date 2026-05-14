import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export type ToolPayload = Record<string, JsonValue>;

export function jsonResult(payload: ToolPayload): CallToolResult {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(payload, null, 2)
      }
    ]
  };
}

export function notConnectedResult(tool: string, source: string): CallToolResult {
  return jsonResult({
    outil: tool,
    source,
    statut: "à configurer",
    message:
      "Le tool est disponible. Configurez PISTE_CLIENT_ID et PISTE_CLIENT_SECRET pour interroger la source officielle.",
    dossierPreuve: {
      source,
      reference: null,
      identifiant: null,
      versionDate: null,
      consultation: new Date().toISOString(),
      outil: tool,
      statut: "à vérifier"
    }
  });
}

export function expertApiCallResult(): CallToolResult {
  return jsonResult({
    outil: "legifrance_api_call",
    statut: "outil expert",
    message:
      "L'appel expert est réservé aux endpoints enregistrés. L'implémentation réseau PISTE sera ajoutée derrière validation de schéma et authentification.",
    endpoints: [
      "codes",
      "articles",
      "loda",
      "jurisprudence",
      "jorf",
      "circulaires",
      "kali",
      "suggest"
    ]
  });
}

export function clearCacheResult(): CallToolResult {
  return jsonResult({
    outil: "piste_cache_clear",
    statut: "ok",
    message: "Aucun cache persistant n'est encore actif dans cette fondation."
  });
}
