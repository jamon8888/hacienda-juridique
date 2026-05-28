import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BodaccClient } from "../sources/bodacc.js";

export function registerBodaccBySiren(server: McpServer): void {
  server.registerTool(
    "bodacc_by_siren",
    {
      title: "Annonces BODACC par SIREN",
      description:
        "Récupère les annonces BODACC publiées pour un SIREN. Couvre immatriculations, modifications, radiations, procédures collectives. Source publique BODACC OpenDataSoft sans authentification.",
      inputSchema: {
        siren: z
          .string()
          .regex(/^[0-9]{9}$/)
          .describe("Numéro SIREN à 9 chiffres"),
        limit: z
          .number()
          .int()
          .min(1)
          .max(100)
          .default(20)
          .describe("Nombre max d'annonces à retourner (défaut 20, max 100)"),
      },
    },
    async (args) => {
      const client = new BodaccClient();
      const annonces = await client.searchBySiren(args.siren, args.limit ?? 20);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(annonces, null, 2),
          },
        ],
      };
    },
  );
}
