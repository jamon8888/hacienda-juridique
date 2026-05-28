import { createHaciendaServer, log } from "@hacienda/core";

const { start } = createHaciendaServer({
  name: "hacienda-droit-affaires",
  version: "0.1.0",
  toolGroups: ["legal_research", "company_registries", "fiscal_sources", "social_sources"]
});

start().catch((error: unknown) => {
  log.error("hacienda-droit-affaires mcp server failed", {
    error: error instanceof Error ? error.message : String(error)
  });
  process.exit(1);
});
