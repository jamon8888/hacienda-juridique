import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { InpiMarqueSchema } from "../../src/sources/inpi-marques.js";

describe("InpiMarqueSchema", () => {
  it("parse une réponse de détails INPI", () => {
    const raw = JSON.parse(
      readFileSync(
        new URL("../fixtures/inpi/details-marque-fr-1234567.json", import.meta.url),
        "utf8"
      )
    );
    const parsed = InpiMarqueSchema.parse(raw);
    expect(typeof parsed.numero).toBe("string");
    expect(Array.isArray(parsed.classes)).toBe(true);
    expect(parsed.titulaire.length).toBeGreaterThan(0);
  });
});
