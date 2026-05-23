export type PluginType =
  | "source-foundation"
  | "legal-domain"
  | "legal-domain-with-mcp"
  | "transversal-research";

export type McpMode = "none" | "references-source-foundation" | "own-stdio-server";

export type PluginRegistryEntry = {
  name: string;
  type: PluginType;
  source: string;
  description: string;
  skills: string[];
  agents: string[];
  mcp: {
    mode: McpMode;
  };
};

export type PluginRegistry = {
  plugins: PluginRegistryEntry[];
};

export type ValidationSeverity = "error" | "warning";

export type ValidationFinding = {
  severity: ValidationSeverity;
  code: string;
  path: string;
  message: string;
};

export type ValidationResult = {
  ok: boolean;
  findings: ValidationFinding[];
};
