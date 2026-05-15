import {
  BOSS_HOME_URL,
  BossRobotsUnavailableError,
  createBossRobotsGate,
} from "./client.js";

export type BossRecommendation =
  | "utilisable"
  | "crawl bloqué"
  | "réseau bloqué"
  | "robots indisponible"
  | "parser à revoir";

export type BossProbeResponseSummary = {
  statusCode?: number;
  contentType?: string;
  text?: string;
};

export type BossProbeInput = {
  homeUrl?: string;
  robots?: BossProbeResponseSummary;
  homepage?: BossProbeResponseSummary;
  cacheEntries?: number;
  error?: unknown;
};

export type BossStatus = {
  homeUrl: string;
  recommendation: BossRecommendation;
  robotsStatusCode?: number;
  canCrawl: boolean;
  canReadHtml: boolean;
  cacheEntries: number;
  diagnostic?: string;
};

export function diagnoseBossProbeError(error: unknown): string {
  const diagnosticSource = errorDiagnosticSource(error);

  if (/(econnreset|fetch failed|socket|tls)/i.test(diagnosticSource)) {
    return `réseau bloqué: ${diagnosticSource}`;
  }

  return diagnosticSource;
}

export function probeBossStatusFromResponses(input: BossProbeInput): BossStatus {
  const homeUrl = input.homeUrl ?? BOSS_HOME_URL;
  const cacheEntries = input.cacheEntries ?? 0;
  const canReadHtml = canReadHomepageHtml(input.homepage);
  const baseStatus = {
    homeUrl,
    robotsStatusCode: input.robots?.statusCode,
    canReadHtml,
    cacheEntries,
  };

  if (input.error) {
    const diagnostic = diagnoseBossProbeError(input.error);

    if (diagnostic.includes("réseau bloqué")) {
      return { ...baseStatus, recommendation: "réseau bloqué", canCrawl: false, diagnostic };
    }
  }

  try {
    const gate = createBossRobotsGate("https://boss.gouv.fr/robots.txt", input.robots?.text ?? "");
    const canCrawl = gate.canFetch(homeUrl);

    if (!canCrawl) {
      return { ...baseStatus, recommendation: "crawl bloqué", canCrawl };
    }

    if (!canReadHtml) {
      return { ...baseStatus, recommendation: "parser à revoir", canCrawl };
    }

    return { ...baseStatus, recommendation: "utilisable", canCrawl };
  } catch (error) {
    if (error instanceof BossRobotsUnavailableError) {
      return { ...baseStatus, recommendation: "robots indisponible", canCrawl: false };
    }

    throw error;
  }
}

export function defaultBossStatusUnavailable(error: unknown): BossStatus {
  const diagnostic = diagnoseBossProbeError(error);

  return {
    homeUrl: BOSS_HOME_URL,
    recommendation: diagnostic.includes("réseau bloqué") ? "réseau bloqué" : "robots indisponible",
    canCrawl: false,
    canReadHtml: false,
    cacheEntries: 0,
    diagnostic,
  };
}

function canReadHomepageHtml(response: BossProbeResponseSummary | undefined): boolean {
  if (!response || response.statusCode !== 200) {
    return false;
  }

  const contentType = response.contentType?.toLowerCase() ?? "";
  const text = response.text?.trim() ?? "";

  return contentType.includes("html") && /<html[\s>]/i.test(text);
}

function errorDiagnosticSource(error: unknown): string {
  if (error instanceof Error) {
    const errorWithCode = error as Error & { code?: unknown };
    const code = typeof errorWithCode.code === "string" ? errorWithCode.code : "";
    const cause = typeof error.cause === "string" ? error.cause : "";

    return [error.message, code, cause].filter(Boolean).join(" ");
  }

  return String(error);
}
