import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { z } from "zod";

export type CredentialsSource = "env" | "file" | "none";

export type HaciendaConfig = {
  clientId?: string;
  clientSecret?: string;
  credentialsSource: CredentialsSource;
  env: "production" | "sandbox";
};

export type LoadConfigOptions = {
  env?: NodeJS.ProcessEnv;
  homeDir?: string;
};

const credentialsSchema = z.object({
  clientId: z.string().optional(),
  clientSecret: z.string().optional(),
  pisteClientId: z.string().optional(),
  pisteClientSecret: z.string().optional(),
  env: z.enum(["production", "sandbox"]).optional()
});

function usable(value: string | undefined): string | undefined {
  const trimmed = value?.trim();

  if (!trimmed || (trimmed.startsWith("${") && trimmed.endsWith("}"))) {
    return undefined;
  }

  return trimmed;
}

function readCredentialsFile(path: string): Partial<HaciendaConfig> | undefined {
  if (!existsSync(path)) {
    return undefined;
  }

  const parsed = credentialsSchema.parse(JSON.parse(readFileSync(path, "utf8")));
  const clientId = usable(parsed.clientId) ?? usable(parsed.pisteClientId);
  const clientSecret = usable(parsed.clientSecret) ?? usable(parsed.pisteClientSecret);

  if (!clientId || !clientSecret) {
    return undefined;
  }

  return {
    clientId,
    clientSecret,
    credentialsSource: "file",
    env: parsed.env ?? "production"
  };
}

export function loadConfig(options: LoadConfigOptions = {}): HaciendaConfig {
  const env = options.env ?? process.env;
  const clientId = usable(env.PISTE_CLIENT_ID);
  const clientSecret = usable(env.PISTE_CLIENT_SECRET);
  const pisteEnv = env.PISTE_ENV === "sandbox" ? "sandbox" : "production";

  if (clientId && clientSecret) {
    return {
      clientId,
      clientSecret,
      credentialsSource: "env",
      env: pisteEnv
    };
  }

  const homeDir = options.homeDir ?? homedir();
  const configuredPath = usable(env.HACIENDA_CREDENTIALS_FILE);
  const credentialPaths = [
    configuredPath ? resolve(configuredPath) : undefined,
    join(homeDir, ".config", "hacienda", "credentials.json")
  ].filter((path): path is string => Boolean(path));

  for (const path of credentialPaths) {
    const credentials = readCredentialsFile(path);

    if (credentials?.clientId && credentials.clientSecret) {
      return {
        clientId: credentials.clientId,
        clientSecret: credentials.clientSecret,
        credentialsSource: "file",
        env: credentials.env ?? pisteEnv
      };
    }
  }

  return {
    credentialsSource: "none",
    env: pisteEnv
  };
}
