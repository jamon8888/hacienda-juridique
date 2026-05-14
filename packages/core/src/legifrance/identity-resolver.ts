import { COMMON_CODES_LEGITEXT } from "../codes-legitext.js";

export type ResolvedIdentifierKind =
  | "article"
  | "section"
  | "text"
  | "code"
  | "juri"
  | "jorf"
  | "idcc"
  | "bofip"
  | "bocc"
  | "bodmr";

export type ResolvedIdentifier = {
  kind: ResolvedIdentifierKind;
  id: string;
  confidence: "high" | "medium";
  endpointKey?: string;
};

type IdentifierPattern = {
  kind: ResolvedIdentifierKind;
  pattern: RegExp;
  endpointKey?: string;
  confidence?: ResolvedIdentifier["confidence"];
  normalizeId?: (id: string) => string;
};

const DIRECT_IDENTIFIER_PATTERNS: IdentifierPattern[] = [
  {
    kind: "article",
    pattern: /^(LEGIARTI\d+)$/i,
    endpointKey: "consult.getArticle",
  },
  {
    kind: "section",
    pattern: /^(LEGISCTA\d+)$/i,
    endpointKey: "consult.getSectionByCid",
  },
  {
    kind: "text",
    pattern: /^(LEGITEXT\d+)$/i,
    endpointKey: "consult.legiPart",
  },
  {
    kind: "juri",
    pattern: /^(JURITEXT\d+)$/i,
  },
  {
    kind: "jorf",
    pattern: /^(JORFTEXT\d+)$/i,
  },
  {
    kind: "idcc",
    pattern: /^IDCC\s+(\d+)$/i,
    endpointKey: "consult.kaliContIdcc",
  },
  {
    kind: "bofip",
    pattern: /^(BOI-[A-Z0-9]+(?:-[A-Z0-9]+)*)$/i,
    endpointKey: "consult.circulaire",
    normalizeId: (id) => id.toUpperCase(),
  },
  {
    kind: "bocc",
    pattern: /^BOCC\s+(\d{4}(?:-\d{1,2})?)$/i,
    endpointKey: "list.bocc",
    confidence: "medium",
  },
  {
    kind: "bodmr",
    pattern: /^BODMR\s+(\d{4}(?:-\d{1,2})?)$/i,
    endpointKey: "list.bodmr",
    confidence: "medium",
  },
];

const NORMALIZED_COMMON_CODES = new Map(
  Object.entries(COMMON_CODES_LEGITEXT).map(([name, id]) => [normalizeLookupText(name), id]),
);

export function normalizeLookupText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

export function resolveLegalIdentifier(input: string): ResolvedIdentifier | undefined {
  const trimmed = input.trim();
  if (!trimmed) return undefined;

  for (const identifierPattern of DIRECT_IDENTIFIER_PATTERNS) {
    const match = identifierPattern.pattern.exec(trimmed);
    if (!match) continue;

    const matchedId = match[1] ?? match[0];
    return {
      kind: identifierPattern.kind,
      id: identifierPattern.normalizeId?.(matchedId) ?? matchedId.toUpperCase(),
      confidence: identifierPattern.confidence ?? "high",
      endpointKey: identifierPattern.endpointKey,
    };
  }

  const codeId = NORMALIZED_COMMON_CODES.get(normalizeLookupText(trimmed));
  if (codeId) {
    return {
      kind: "code",
      id: codeId,
      confidence: "high",
      endpointKey: "consult.legiPart",
    };
  }

  return undefined;
}
