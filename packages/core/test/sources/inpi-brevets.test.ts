import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import {
  InpiBrevetSchema,
  InpiBrevetSearchResponseSchema,
} from "../../src/sources/inpi-brevets.js";

describe("InpiBrevetSchema", () => {
  it("parse une réponse de recherche brevets", () => {
    const raw = JSON.parse(
      readFileSync(
        new URL("../fixtures/inpi/search-graphene-filtration.json", import.meta.url),
        "utf8"
      )
    );
    const parsed = InpiBrevetSearchResponseSchema.parse(raw);
    expect(parsed.resultats.length).toBeGreaterThan(0);
    const first = parsed.resultats[0];
    const second = InpiBrevetSchema.parse(first);
    expect(second.numero).toMatch(/^[A-Z]{2}\d+/);
    expect(Array.isArray(second.classificationCIB)).toBe(true);
    expect(second.classificationCIB.length).toBeGreaterThan(0);
    expect(["FR", "EP", "PCT", "CCP"]).toContain(second.type);
  });
});
