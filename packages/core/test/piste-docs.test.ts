import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "../../..");

function readText(path: string): string {
  return readFileSync(resolve(root, path), "utf8");
}

describe("PISTE installer documentation", () => {
  it("explains that PISTE is consumed through Hacienda MCP, not installed as an external MCP", () => {
    const doc = readText("docs/integrations/piste-connection.md");

    expect(doc).toContain("PISTE n'est pas un serveur MCP externe");
    expect(doc).toContain("Hacienda Sources Officielles");
    expect(doc).toContain("PISTE_CLIENT_ID");
    expect(doc).toContain("PISTE_CLIENT_SECRET");
    expect(doc).toContain("piste_status");
    expect(doc).toContain("~/.config/Hacienda/credentials.json");
    expect(doc).toContain("subscription required");
    expect(doc).not.toMatch(/[a-f0-9]{40,}/iu);
  });

  it("links the PISTE connection guide from global and source plugin READMEs", () => {
    const rootReadme = readText("README.md");
    const sourcesReadme = readText("plugins/hacienda-sources-officielles/README.md");

    expect(rootReadme).toContain("docs/integrations/piste-connection.md");
    expect(sourcesReadme).toContain("docs/integrations/piste-connection.md");
    expect(sourcesReadme).toContain("PISTE n'est pas un MCP externe");
  });
});
