import type { JudilibreDecision, JudilibreSearchResponse } from "./schemas.js";

const MAX_DECISION_TEXT_CHARS = 6000;
const MAX_SEARCH_EXCERPT_CHARS = 700;

export function judilibreDecisionUrl(id: string): string {
  return `https://www.courdecassation.fr/decision/${encodeURIComponent(id)}`;
}

function asRecord(value: JudilibreDecision): Record<string, unknown> {
  return value as Record<string, unknown>;
}

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function formatPublication(value: JudilibreDecision["publication"]): string | undefined {
  if (Array.isArray(value)) {
    const filtered = value.filter((item) => typeof item === "string" && item.trim());
    return filtered.length ? filtered.join(", ") : undefined;
  }

  return optionalString(value);
}

function truncateText(text: string, maxChars: number, suffix: string): string {
  return text.length > maxChars ? `${text.slice(0, maxChars).trimEnd()}\n\n${suffix}` : text;
}

function metadataFor(decision: JudilibreDecision): string[] {
  const extra = asRecord(decision);
  const metadata: string[] = [];

  if (decision.decision_datetime) metadata.push(`Date : ${decision.decision_datetime}`);
  if (decision.jurisdiction) metadata.push(`Juridiction : ${decision.jurisdiction}`);
  if (decision.chamber) metadata.push(`Chambre : ${decision.chamber}`);
  if (optionalString(extra.formation)) metadata.push(`Formation : ${optionalString(extra.formation)}`);
  if (decision.number) metadata.push(`Numéro : ${decision.number}`);
  if (decision.solution) metadata.push(`Solution : ${decision.solution}`);
  const publication = formatPublication(decision.publication);
  if (publication) metadata.push(`Publication : ${publication}`);
  if (optionalString(extra.ecli)) metadata.push(`ECLI : ${optionalString(extra.ecli)}`);

  return metadata;
}

function decisionId(decision: JudilibreDecision, fallback: string): string {
  return decision.id?.trim() || fallback;
}

export function formatJudilibreSearch(response: JudilibreSearchResponse, query: string): string {
  const lines: string[] = [];
  lines.push(`# Judilibre — résultats pour "${query}"`);
  lines.push("");
  lines.push(`Total : ${response.total ?? response.results.length}`);
  if (response.page !== undefined || response.page_size !== undefined) {
    const page = response.page !== undefined ? response.page : "?";
    const pageSize = response.page_size !== undefined ? response.page_size : "?";
    lines.push(`Page : ${page} · Taille : ${pageSize}`);
  }
  lines.push("");

  if (!response.results.length) {
    lines.push("Aucun résultat.");
  }

  response.results.forEach((decision, index) => {
    const id = decisionId(decision, "(sans identifiant)");
    lines.push(`## ${index + 1}. ${id}`);
    const metadata = metadataFor(decision);
    if (metadata.length) lines.push(`_${metadata.join(" · ")}_`);

    const excerptSource = decision.summary || decision.text;
    if (excerptSource) {
      lines.push("");
      lines.push(truncateText(excerptSource, MAX_SEARCH_EXCERPT_CHARS, "...(extrait tronqué)"));
    }

    lines.push("");
    lines.push(`[Cour de cassation](${judilibreDecisionUrl(id)})`);
    lines.push("");
  });

  lines.push(`Consultation : ${new Date().toISOString()}`);
  return lines.join("\n").trimEnd();
}

export function formatJudilibreDecision(decision: JudilibreDecision, idInput: string): string {
  const id = decisionId(decision, idInput);
  const lines: string[] = [];
  lines.push(`# Judilibre — décision ${id}`);
  const metadata = metadataFor(decision);
  if (metadata.length) {
    lines.push("");
    lines.push(`_${metadata.join(" · ")}_`);
  }

  if (decision.summary) {
    lines.push("");
    lines.push("## Résumé");
    lines.push(decision.summary);
  }

  if (decision.text) {
    lines.push("");
    lines.push("## Texte");
    lines.push(
      truncateText(
        decision.text,
        MAX_DECISION_TEXT_CHARS,
        "...(texte tronqué - utilisez le lien Cour de cassation pour le texte intégral)",
      ),
    );
  }

  lines.push("");
  lines.push(`[Cour de cassation](${judilibreDecisionUrl(id)})`);
  lines.push(`Consultation : ${new Date().toISOString()}`);

  return lines.join("\n");
}
