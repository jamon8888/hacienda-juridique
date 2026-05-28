import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BodaccClient } from "../sources/bodacc.js";

export function registerBodaccProcedures(server: McpServer): void {
  server.registerTool(
    "bodacc_procedures",
    {
      title: "Procédures collectives BODACC par SIREN",
      description:
        "Récupère uniquement les procédures collectives BODACC publiées pour un SIREN : sauvegarde, redressement judiciaire, liquidation, plans, jugements d'ouverture. Source publique BODACC OpenDataSoft sans authentification.",
      inputSchema: {
        siren: z
          .string()
          .regex(/^[0-9]{9}$/)
          .describe("Numéro SIREN à 9 chiffres"),
      },
    },
    async (args) => {
      const client = new BodaccClient();
      const procedures = await client.searchProcedures(args.siren);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(procedures, null, 2),
          },
        ],
      };
    },
  );
}
