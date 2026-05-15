import { request } from "undici";

export const BOSS_HOME_URL = "https://boss.gouv.fr/portail/accueil.html";
export const BOSS_ORIGIN = "https://boss.gouv.fr";
export const BOSS_USER_AGENT = "HaciendaSourcesOfficielles/0.1 (+https://boss.gouv.fr)";

const BOSS_ACCEPT_HEADER = "text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8,*/*;q=0.5";

export class BossUrlError extends Error {
  constructor(input: string) {
    super(`URL BOSS invalide: ${input}`);
    this.name = "BossUrlError";
  }
}

export class BossRobotsUnavailableError extends Error {
  constructor() {
    super("robots.txt BOSS indisponible");
    this.name = "BossRobotsUnavailableError";
  }
}

export class BossRobotsBlockedError extends Error {
  constructor(url: string) {
    super(`robots.txt BOSS bloque la lecture de ${url}`);
    this.name = "BossRobotsBlockedError";
  }
}

type RobotsRule = {
  kind: "allow" | "disallow";
  path: string;
};

export type BossRobotsGate = {
  canFetch(url: string): boolean;
};

export type BossTextResponse = {
  url: string;
  statusCode: number;
  contentType: string | undefined;
  text: string;
};

export function assertBossUrl(input: string): URL {
  let url: URL;

  try {
    url = new URL(input);
  } catch {
    throw new BossUrlError(input);
  }

  if (url.protocol !== "https:" || url.hostname !== "boss.gouv.fr") {
    throw new BossUrlError(input);
  }

  return url;
}

export function createBossRobotsGate(robotsUrl: string, body: string): BossRobotsGate {
  assertBossUrl(robotsUrl);

  if (body.trim().length === 0) {
    throw new BossRobotsUnavailableError();
  }

  const rules = parseRobotsRules(body);

  return {
    canFetch(urlInput: string): boolean {
      const url = assertBossUrl(urlInput);
      const path = url.pathname || "/";
      const matchingRules = rules.filter((rule) => path.startsWith(rule.path));

      if (matchingRules.length === 0) {
        return true;
      }

      const bestRule = [...matchingRules].sort((a: RobotsRule, b: RobotsRule) => {
        const pathDelta = b.path.length - a.path.length;

        if (pathDelta !== 0) {
          return pathDelta;
        }

        return a.kind === "allow" ? -1 : 1;
      })[0]!;

      return bestRule.kind === "allow";
    },
  };
}

export async function fetchBossText(urlInput: string): Promise<BossTextResponse> {
  const url = assertBossUrl(urlInput);
  const response = await request(url, {
    method: "GET",
    headers: {
      accept: BOSS_ACCEPT_HEADER,
      "user-agent": BOSS_USER_AGENT,
    },
  });

  const contentType = headerToString(response.headers["content-type"]);

  return {
    url: url.href,
    statusCode: response.statusCode,
    contentType,
    text: await response.body.text(),
  };
}

export async function fetchBossDocumentWithRobots(urlInput: string, robotsBody: string): Promise<BossTextResponse> {
  const url = assertBossUrl(urlInput);
  const gate = createBossRobotsGate(`${BOSS_ORIGIN}/robots.txt`, robotsBody);

  if (!gate.canFetch(url.href)) {
    throw new BossRobotsBlockedError(url.href);
  }

  return fetchBossText(url.href);
}

function parseRobotsRules(body: string): RobotsRule[] {
  const rules: RobotsRule[] = [];
  let appliesToBossClient = false;

  for (const line of body.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (trimmed.length === 0 || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf(":");

    if (separatorIndex === -1) {
      continue;
    }

    const field = trimmed.slice(0, separatorIndex).trim().toLowerCase();
    const value = trimmed.slice(separatorIndex + 1).trim();

    if (field === "user-agent") {
      appliesToBossClient = value === "*";
      continue;
    }

    if (!appliesToBossClient || value.length === 0) {
      continue;
    }

    if (field === "allow") {
      rules.push({ kind: "allow", path: value });
    }

    if (field === "disallow") {
      rules.push({ kind: "disallow", path: value });
    }
  }

  return rules;
}

function headerToString(header: string | string[] | undefined): string | undefined {
  if (Array.isArray(header)) {
    return header.join(", ");
  }

  return header;
}
