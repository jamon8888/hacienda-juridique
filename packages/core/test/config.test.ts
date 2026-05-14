import { describe, expect, it } from "vitest";
import { loadConfig } from "../src/config.js";

describe("loadConfig", () => {
  it("ignore les placeholders et utilise le namespace Hacienda", () => {
    process.env.PISTE_CLIENT_ID = "${PISTE_CLIENT_ID}";
    process.env.PISTE_CLIENT_SECRET = "${PISTE_CLIENT_SECRET}";
    process.env.HACIENDA_CREDENTIALS_FILE = "__missing_hacienda_credentials__.json";

    const config = loadConfig();

    expect(config.credentialsSource).toBe("none");
    expect(config.clientId).toBeUndefined();
    expect(config.clientSecret).toBeUndefined();
  });
});
