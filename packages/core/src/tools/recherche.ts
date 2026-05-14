import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { notConnectedResult } from "./api-call.js";

export type SourceToolDefinition = {
  name: string;
  title: string;
  description: string;
  source: string;
};

export const sourceToolDefinitions: SourceToolDefinition[] = [
  {
    name: "legifrance_recherche",
    title: "Recherche Légifrance",
    description: "Recherche transversale dans les fonds Légifrance.",
    source: "Légifrance"
  },
  {
    name: "legifrance_rechercher",
    title: "Rechercher Sur Légifrance",
    description: "Alias conservé pour les workflows qui utilisent le nom français historique.",
    source: "Légifrance"
  },
  {
    name: "legifrance_get_article",
    title: "Article Légifrance",
    description: "Récupère un article par identifiant officiel.",
    source: "Légifrance"
  },
  {
    name: "legifrance_get_code",
    title: "Code Légifrance",
    description: "Récupère un code ou une section de code.",
    source: "Légifrance"
  },
  {
    name: "legifrance_get_loda",
    title: "Texte LODA",
    description: "Récupère un texte législatif ou réglementaire consolidé.",
    source: "Légifrance"
  },
  {
    name: "legifrance_get_jurisprudence",
    title: "Jurisprudence Officielle",
    description: "Recherche ou récupère une décision de jurisprudence officielle.",
    source: "Jurisprudence officielle"
  },
  {
    name: "legifrance_get_jorf",
    title: "JORF",
    description: "Recherche ou récupère une publication du Journal officiel.",
    source: "JORF"
  },
  {
    name: "legifrance_get_circulaire",
    title: "Circulaire",
    description: "Recherche ou récupère une circulaire administrative.",
    source: "Circulaires"
  },
  {
    name: "legifrance_suggest",
    title: "Suggestion Légifrance",
    description: "Suggère des références ou identifiants Légifrance.",
    source: "Légifrance"
  },
  {
    name: "bofip_rechercher",
    title: "Recherche BOFiP",
    description: "Recherche dans la doctrine fiscale BOFiP.",
    source: "BOFiP"
  },
  {
    name: "bofip_consulter",
    title: "Consultation BOFiP",
    description: "Consulte une entrée BOFiP par identifiant ou référence.",
    source: "BOFiP"
  }
];

export function createSourceToolResult(definition: SourceToolDefinition): CallToolResult {
  return notConnectedResult(definition.name, definition.source);
}
