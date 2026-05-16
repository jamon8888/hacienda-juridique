import { createHaciendaServer, log } from "@hacienda/core";
const { start } = createHaciendaServer({
    name: "hacienda-propriete-intellectuelle",
    version: "0.2.0"
});
start().catch((error) => {
    log.error("hacienda-propriete-intellectuelle mcp server failed", {
        error: error instanceof Error ? error.message : String(error)
    });
    process.exit(1);
});
//# sourceMappingURL=index.js.map