import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { parseBossDocument } from "../src/boss/parser.js";
import type { BossStatus } from "../src/boss/status.js";
import {
  callBossGetDocument,
  callBossRecherche,
  callBossStatus,
} from "../src/tools/boss.js";

const fixturesDir = join(import.meta.dirname, "fixtures", "boss");
const fixture = readFileSync(join(fixturesDir, "avantages-en-nature.html"), "utf8");
const sourceUrl = "https://boss.gouv.fr/portail/accueil/autres-elements-de-remuneration/avantages-en-nature.html";
const retrievedAt = "2026-05-14T18:00:00.000Z";

function textFrom(result: { content: { type: "text"; text: string }[] }): string {
  return result.content[0]!.text;
}

describe("BOSS MCP tools", () => {
  it("callBossStatus returns JSON status", async () => {
    const status: BossStatus = {
      homeUrl: "https://boss.gouv.fr/portail/accueil.html",
      network: "ok",
      robots: { status: "lu" },
      canReadHtml: true,
      cacheEntries: 0,
      lastError: null,
      recommendation: "utilisable",
    };

    const result = await callBossStatus(async () => status);

    expect(JSON.parse(textFrom(result))).toEqual(status);
  });

  it("callBossRecherche searches supplied docs and formats BOSS results", () => {
    const document = parseBossDocument(fixture, sourceUrl, retrievedAt);

    const result = callBossRecherche([document], { query: "avantages cotisations" });
    const text = textFrom(result);

    expect(text).toContain("Avantages en nature");
    expect(text).toContain("https://boss.gouv.fr/");
  });

  it("callBossGetDocument calls injected fetcher and returns parsed formatted document", async () => {
    const fetcher = vi.fn().mockResolvedValue({
      url: sourceUrl,
      statusCode: 200,
      contentType: "text/html; charset=utf-8",
      text: fixture,
    });

    const result = await callBossGetDocument(fetcher, { url: sourceUrl });
    const text = textFrom(result);

    expect(fetcher).toHaveBeenCalledWith(sourceUrl);
    expect(text).toContain("# Avantages en nature");
    expect(text).toContain("Chapitre 1 - Principes généraux");
    expect(text).toContain(sourceUrl);
  });

  it("callBossGetDocument returns MCP errors for non-html and HTTP failures", async () => {
    const nonHtmlFetcher = vi.fn().mockResolvedValue({
      url: sourceUrl,
      statusCode: 200,
      contentType: "application/json",
      text: "{}",
    });
    const httpErrorFetcher = vi.fn().mockResolvedValue({
      url: sourceUrl,
      statusCode: 500,
      contentType: "text/html",
      text: "<html><body>Erreur</body></html>",
    });

    await expect(callBossGetDocument(nonHtmlFetcher, { url: sourceUrl })).resolves.toMatchObject({ isError: true });
    await expect(callBossGetDocument(httpErrorFetcher, { url: sourceUrl })).resolves.toMatchObject({ isError: true });
  });
});
