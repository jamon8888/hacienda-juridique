import { assertCelexId, eurlexDocumentUrl, type EurlexLanguage } from "./celex.js";
import type { EurlexRelation, EurlexRelationKind } from "./types.js";

export interface EurlexRelationsQueryArgs {
  celexId: string;
  relation?: EurlexRelationKind;
  direction?: "incoming" | "outgoing" | "both";
  language?: EurlexLanguage;
  limit?: number;
}

type SparqlValue = { value?: string };
type SparqlBinding = Record<string, SparqlValue | undefined>;
type SparqlResponse = { results?: { bindings?: SparqlBinding[] } };

export function buildEurlexRelationsQuery(args: EurlexRelationsQueryArgs): string {
  const celexId = assertCelexId(args.celexId);
  const direction = args.direction ?? "both";
  const limit = Math.min(100, Math.max(1, Math.trunc(args.limit ?? 25)));
  const relationFilter = args.relation ? `FILTER(?kind = "${args.relation}")` : "";

  return [
    "PREFIX cdm: <http://publications.europa.eu/ontology/cdm#>",
    "PREFIX owl: <http://www.w3.org/2002/07/owl#>",
    "SELECT ?kind ?sourceCelex ?targetCelex ?title ?date WHERE {",
    `  BIND("${celexId}" AS ?pivotCelex)`,
    `  BIND("${direction}" AS ?direction)`,
    "  ?source owl:sameAs ?sourceUri .",
    "  ?target owl:sameAs ?targetUri .",
    '  FILTER(STRSTARTS(STR(?sourceUri), "http://publications.europa.eu/resource/celex/"))',
    '  FILTER(STRSTARTS(STR(?targetUri), "http://publications.europa.eu/resource/celex/"))',
    '  BIND(REPLACE(STR(?sourceUri), "^.*resource/celex/", "") AS ?sourceCelex)',
    '  BIND(REPLACE(STR(?targetUri), "^.*resource/celex/", "") AS ?targetCelex)',
    '  VALUES ?kind { "amends" "amended_by" "cites" "cited_by" "repeals" "repealed_by" "basis" }',
    "  FILTER(?sourceCelex = ?pivotCelex || ?targetCelex = ?pivotCelex)",
    '  FILTER(?direction = "both" || (?direction = "outgoing" && ?sourceCelex = ?pivotCelex) || (?direction = "incoming" && ?targetCelex = ?pivotCelex))',
    relationFilter,
    "  OPTIONAL { ?target cdm:work_date_document ?date . }",
    "  OPTIONAL { ?target cdm:resource_legal_title ?title . }",
    "}",
    `LIMIT ${limit}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function mapEurlexRelations(response: unknown, language: EurlexLanguage = "FRA"): EurlexRelation[] {
  const bindings = (response as SparqlResponse).results?.bindings ?? [];

  return bindings
    .map((binding) => {
      const kind = binding.kind?.value as EurlexRelationKind | undefined;
      const sourceCelexId = binding.sourceCelex?.value;
      const targetCelexId = binding.targetCelex?.value;

      if (!kind || !sourceCelexId || !targetCelexId) {
        return undefined;
      }

      const relation: EurlexRelation = {
        kind,
        sourceCelexId,
        targetCelexId,
        url: eurlexDocumentUrl(targetCelexId, language),
      };

      if (binding.title?.value) {
        relation.title = binding.title.value;
      }

      if (binding.date?.value) {
        relation.date = binding.date.value;
      }

      return relation;
    })
    .filter((value): value is EurlexRelation => Boolean(value));
}

export function formatEurlexRelations(relations: EurlexRelation[], celexId: string, retrievedAt = new Date().toISOString()): string {
  const header = `# Relations EUR-Lex - ${celexId}`;
  if (relations.length === 0) {
    return `${header}\n\nAucune relation trouvée.\n\nConsulté le ${retrievedAt}`;
  }

  const rows = relations.map((relation) =>
    [
      `- ${relation.kind}: ${relation.sourceCelexId} -> ${relation.targetCelexId}`,
      relation.title ? `  Titre: ${relation.title}` : undefined,
      relation.date ? `  Date: ${relation.date}` : undefined,
      `  URL: ${relation.url}`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [header, ...rows, `Consulté le ${retrievedAt}`].join("\n\n");
}
