import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { afterEach, describe, expect, it } from "vitest";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const currentDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(currentDir, "../../..");
const serverPath = resolve(root, "plugins/hacienda-sources-officielles/mcp-server/dist/index.js");

const expectedTools = [
  "piste_status",
  "legifrance_recherche",
  "legifrance_rechercher",
  "legifrance_get_article",
  "legifrance_get_code",
  "legifrance_get_loda",
  "legifrance_get_jurisprudence",
  "legifrance_get_jorf",
  "legifrance_get_circulaire",
  "legifrance_suggest",
  "legifrance_api_call",
  "bofip_rechercher",
  "bofip_consulter",
  "piste_cache_clear"
];

describe("hacienda sources officielles mcp", () => {
  let client: Client | undefined;

  afterEach(async () => {
    await client?.close();
    client = undefined;
  });

  it("expose les tools sources officielles attendus", async () => {
    client = new Client({
      name: "hacienda-smoke-test",
      version: "0.1.0"
    });

    const transport = new StdioClientTransport({
      command: process.execPath,
      args: [serverPath],
      cwd: root,
      stderr: "pipe"
    });

    await client.connect(transport);
    const result = await client.listTools();
    const names = result.tools.map((tool) => tool.name).sort();

    expect(names).toEqual([...expectedTools].sort());
  });
});
