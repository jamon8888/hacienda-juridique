#!/usr/bin/env node
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const key = process.env.PAPPERS_API_KEY;

if (!key) {
  console.error("PAPPERS_API_KEY is required. The key must be provided via environment variable and must not be committed.");
  process.exit(2);
}

const endpoint = new URL(`https://mcp.pappers.fr/${key}`);
const client = new Client({ name: "hacienda-pappers-discovery", version: "0.1.0" });
const transport = new StreamableHTTPClientTransport(endpoint);

function inputSchemaSummary(schema) {
  const properties = schema?.properties && typeof schema.properties === "object" ? Object.keys(schema.properties) : [];
  const required = Array.isArray(schema?.required) ? schema.required : [];
  return { required, properties };
}

try {
  await client.connect(transport);
  const result = await client.listTools();
  const tools = result.tools.map((tool) => ({
    name: tool.name,
    title: tool.title ?? tool.name,
    description: tool.description ?? "",
    inputSchema: inputSchemaSummary(tool.inputSchema),
  }));

  console.log(JSON.stringify({ endpoint: "https://mcp.pappers.fr/[masked]", count: tools.length, tools }, null, 2));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Pappers MCP discovery failed: ${message}`);
  process.exit(1);
} finally {
  await client.close().catch(() => undefined);
}
