import { createHaciendaServer } from "@hacienda/core";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const { server } = createHaciendaServer();
const transport = new StdioServerTransport();

await server.connect(transport);
