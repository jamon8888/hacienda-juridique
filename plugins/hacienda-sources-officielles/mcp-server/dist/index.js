import { createHaciendaServer, log } from "@hacienda/core";
const { start } = createHaciendaServer({
    name: "hacienda-sources-officielles",
    version: "0.1.0"
});
start().catch((error) => {
    log.error("hacienda-sources-officielles mcp server failed", {
        error: error instanceof Error ? error.message : String(error)
    });
    process.exit(1);
});
//# sourceMappingURL=index.js.map