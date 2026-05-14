import { describe, expect, it } from "vitest";
import type { OfficialSource, SourceCitation, SourceSearchHit } from "../src/sources/types.js";

describe("source proof types", () => {
  it("accepts the four official source identifiers used by Hacienda", () => {
    const sources: OfficialSource[] = ["LEGIFRANCE", "BOFIP", "JUDILIBRE", "BOSS"];
    expect(sources).toEqual(["LEGIFRANCE", "BOFIP", "JUDILIBRE", "BOSS"]);
  });

  it("models a proof citation and a search hit with official URLs", () => {
    const citation: SourceCitation = {
      source: "BOSS",
      title: "Avantages en nature",
      url: "https://boss.gouv.fr/portail/accueil/autres-elements-de-remuneration/avantages-en-nature.html",
      retrievedAt: "2026-05-14T18:00:00.000Z",
      status: "vérifié",
      tool: "boss_get_document",
    };
    const hit: SourceSearchHit = {
      source: "JUDILIBRE",
      id: "abc",
      title: "Cass. soc.",
      url: "https://www.courdecassation.fr/decision/abc",
      retrievedAt: "2026-05-14T18:00:00.000Z",
      score: 1,
    };

    expect(citation.status).toBe("vérifié");
    expect(hit.source).toBe("JUDILIBRE");
  });
});
