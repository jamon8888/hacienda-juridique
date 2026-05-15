import { describe, expect, it } from "vitest";
import { BOSS_HOME_URL } from "../src/boss/client.js";
import { defaultBossStatusUnavailable, diagnoseBossProbeError, probeBossStatusFromResponses } from "../src/boss/status.js";

describe("probeBossStatusFromResponses", () => {
  it("recommends usable when robots and homepage are readable HTML", () => {
    const status = probeBossStatusFromResponses({
      homeUrl: BOSS_HOME_URL,
      robots: { statusCode: 200, text: "User-agent: *\nAllow: /" },
      homepage: { statusCode: 200, contentType: "text/html; charset=utf-8", text: "<html><body>BOSS</body></html>" },
      cacheEntries: 2,
    });

    expect(status).toEqual({
      homeUrl: BOSS_HOME_URL,
      recommendation: "utilisable",
      robotsStatusCode: 200,
      canCrawl: true,
      canReadHtml: true,
      cacheEntries: 2,
    });
  });

  it("recommends robots unavailable when robots response is missing or empty", () => {
    const status = probeBossStatusFromResponses({
      homeUrl: BOSS_HOME_URL,
      robots: { statusCode: 503, text: "" },
      homepage: { statusCode: 200, contentType: "text/html", text: "<html></html>" },
      cacheEntries: 0,
    });

    expect(status.recommendation).toBe("robots indisponible");
    expect(status.canCrawl).toBe(false);
    expect(status.canReadHtml).toBe(true);
  });
});

describe("diagnoseBossProbeError", () => {
  it("identifies ECONNRESET as a blocked network", () => {
    expect(diagnoseBossProbeError(Object.assign(new Error("read ECONNRESET"), { code: "ECONNRESET" }))).toContain(
      "réseau bloqué",
    );
  });
});

describe("defaultBossStatusUnavailable", () => {
  it("returns a network blocked status for ECONNRESET", () => {
    const status = defaultBossStatusUnavailable(new Error("read ECONNRESET"));

    expect(status.homeUrl).toBe(BOSS_HOME_URL);
    expect(status.recommendation).toBe("réseau bloqué");
    expect(status.canReadHtml).toBe(false);
    expect(status.cacheEntries).toBe(0);
  });
});
