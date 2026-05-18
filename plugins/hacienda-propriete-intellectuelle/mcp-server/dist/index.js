import { createHaciendaServer, log } from "@hacienda/core";
import { PI_PLUGIN_VERSION } from "./version.js";
const { start } = createHaciendaServer({
    name: "hacienda-propriete-intellectuelle",
    version: PI_PLUGIN_VERSION,
    toolGroups: ["legal_research", "pi_registries"]
});
start().catch((error) => {
    log.error("hacienda-propriete-intellectuelle mcp server failed", {
        error: error instanceof Error ? error.message : String(error)
    });
    process.exit(1);
});
//# sourceMappingURL=index.js.map