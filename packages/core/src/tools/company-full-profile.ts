import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BodaccClient } from "../sources/bodacc.js";
import { loadPappersCredentials } from "../config.js";

async function tryPappers(siren: string): Promise<unknown | null> {
  const creds = loadPappersCredentials();
  if (!creds) return null;
  try {
    const url = `https://api.pappers.fr/v2/entreprise?siren=${siren}&api_token=${creds.apiKey}`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export function registerCompanyFullProfile(server: McpServer): void {
  server.registerTool(
    "company_full_profile",
    {
      title: "Profil entreprise FR (Pappers + fallback BODACC)",
      description:
        "Récupère le profil complet d'une entreprise FR par SIREN. Essaie Pappers d'abord (riche : bilans, dirigeants, bénéficiaires effectifs) si la clé API est configurée, sinon fallback gratuit sur BODACC public (annonces uniquement). Indique la source dans la réponse.",
      inputSchema: {
        siren: z
          .string()
          .regex(/^[0-9]{9}$/)
          .describe("Numéro SIREN à 9 chiffres"),
      },
    },
    async (args) => {
      const pappersData = await tryPappers(args.siren);
      if (pappersData) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                { source: "pappers", data: pappersData },
                null,
                2,
              ),
            },
          ],
        };
      }

      const bodaccClient = new BodaccClient();
      const annonces = await bodaccClient.searchBySiren(args.siren);
      if (annonces.length === 0) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  source: "none",
                  message:
                    "Aucune source disponible — Pappers non configuré et BODACC sans résultats (ou en erreur).",
                  siren: args.siren,
                },
                null,
                2,
              ),
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                source: "bodacc-public",
                message:
                  "Pappers non configuré — données via BODACC public uniquement (annonces, sans bilans ni dirigeants enrichis).",
                siren: args.siren,
                annonces,
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );
}
