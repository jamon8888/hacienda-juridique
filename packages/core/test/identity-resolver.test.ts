import { describe, expect, it } from "vitest";
import { normalizeLookupText, resolveLegalIdentifier } from "../src/legifrance/identity-resolver.js";

describe("Legifrance identity resolver", () => {
  it("normalizes lookup text", () => {
    expect(normalizeLookupText("Code pénal")).toBe("code penal");
    expect(normalizeLookupText("  Code   de l'urbanisme ")).toBe("code de l urbanisme");
  });

  it("detects stable legal identifiers", () => {
    expect(resolveLegalIdentifier("LEGIARTI000006417707")).toMatchObject({
      kind: "article",
      id: "LEGIARTI000006417707",
    });
    expect(resolveLegalIdentifier("LEGITEXT000006070721")).toMatchObject({
      kind: "text",
      id: "LEGITEXT000006070721",
    });
    expect(resolveLegalIdentifier("JURITEXT000047000001")).toMatchObject({
      kind: "juri",
      id: "JURITEXT000047000001",
    });
    expect(resolveLegalIdentifier("JORFTEXT000000000001")).toMatchObject({
      kind: "jorf",
      id: "JORFTEXT000000000001",
    });
  });

  it("detects specialized collection identifiers", () => {
    expect(resolveLegalIdentifier("IDCC 1486")).toMatchObject({
      kind: "idcc",
      id: "1486",
    });
    expect(resolveLegalIdentifier("BOI-IS-BASE-30-30-20-20")).toMatchObject({
      kind: "bofip",
      id: "BOI-IS-BASE-30-30-20-20",
    });
  });

  it("resolves common code names to LEGITEXT ids", () => {
    expect(resolveLegalIdentifier("Code penal")).toMatchObject({
      kind: "code",
      id: "LEGITEXT000006070719",
      confidence: "high",
    });
  });

  it("detects bulletin references with medium confidence", () => {
    expect(resolveLegalIdentifier("BOCC 2024-12")).toMatchObject({
      kind: "bocc",
      id: "2024-12",
      confidence: "medium",
    });
    expect(resolveLegalIdentifier("BODMR 2023")).toMatchObject({
      kind: "bodmr",
      id: "2023",
      confidence: "medium",
    });
  });
});
