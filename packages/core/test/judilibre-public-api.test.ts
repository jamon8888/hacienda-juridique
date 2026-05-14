import { describe, expect, it } from "vitest";
import {
  JudilibreClient,
  JudilibreSearchResponseSchema,
  loadJudilibreConfig,
} from "../src/index.js";

describe("Judilibre public API", () => {
  it("exports config, client, and schemas from the package root", () => {
    expect(typeof loadJudilibreConfig).toBe("function");
    expect(typeof JudilibreClient).toBe("function");
    expect(JudilibreSearchResponseSchema.parse({ results: [], total: 0 })).toEqual({
      results: [],
      total: 0,
    });
  });
});
