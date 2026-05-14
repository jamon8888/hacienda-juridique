import { describe, expect, it } from "vitest";
import { callBofipConsulter, callBofipRechercher } from "../src/tools/bofip.js";

class FakeHttp {
  calls: { path: string; body: unknown }[] = [];

  constructor(private readonly response: unknown) {}

  async post(path: string, body: unknown): Promise<unknown> {
    this.calls.push({ path, body });
    return this.response;
  }
}

describe("BOFiP alias tools", () => {
  it("callBofipRechercher uses /search with fond CIRC and mentions query", async () => {
    const http = new FakeHttp({
      totalResultNumber: 1,
      results: [
        {
          titles: [
            {
              id: "BOI-BNC-DECLA-10",
              cid: "BOI-BNC-DECLA-10",
              title: "Régime micro-BNC",
            },
          ],
          text: "Extrait sur le régime micro-BNC",
          origin: "CIRC",
          sections: [
            {
              extracts: [{ values: ["Extrait sur le régime micro-BNC"] }],
            },
          ],
        },
      ],
    });

    const result = await callBofipRechercher(http as never, { query: "micro-BNC" });

    expect(http.calls).toHaveLength(1);
    expect(http.calls[0]).toMatchObject({
      path: "/search",
      body: { fond: "CIRC" },
    });
    expect(result.content[0]!.text).toContain('pour "micro-BNC"');
    expect(result.content[0]!.text).toContain("BOFiP");
  });

  it("callBofipConsulter uses /consult/circulaire with id and includes title", async () => {
    const http = new FakeHttp({
      circulaire: {
        id: "BOI-BNC-DECLA-10",
        titre: "Régime déclaratif spécial ou micro-BNC",
        etat: "VIGUEUR",
        texteHtml: "<p>Texte de doctrine fiscale.</p>",
      },
    });

    const result = await callBofipConsulter(http as never, { id: "BOI-BNC-DECLA-10" });

    expect(http.calls).toEqual([
      { path: "/consult/circulaire", body: { id: "BOI-BNC-DECLA-10" } },
    ]);
    expect(result.content[0]!.text).toContain("Régime déclaratif spécial ou micro-BNC");
    expect(result.content[0]!.text).toContain("BOFiP");
  });
});
