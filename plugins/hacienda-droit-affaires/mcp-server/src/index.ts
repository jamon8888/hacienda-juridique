import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  bodaccBySirenTool,
  bodaccProceduresTool,
  companyFullProfileTool,
  log,
} from "@hacienda/core";

const TOOLS = [bodaccBySirenTool, bodaccProceduresTool, companyFullProfileTool];

const server = new Server(
  { name: "hacienda-droit-affaires", version: "0.1.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS.map((t) => ({
    name: t.name,
    description: t.description,
    inputSchema: t.inputSchema,
  })),
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const tool = TOOLS.find((t) => t.name === req.params.name);
  if (!tool) throw new Error(`Unknown tool: ${req.params.name}`);
  return await tool.handler(req.params.arguments as any);
});

const start = async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  log.info("hacienda-droit-affaires mcp server connected");

  const shutdown = () => {
    log.info("hacienda-droit-affaires mcp server shutting down");
    process.exit(0);
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
};

start().catch((error: unknown) => {
  log.error("hacienda-droit-affaires mcp server failed", {
    error: error instanceof Error ? error.message : String(error),
  });
  process.exit(1);
});
