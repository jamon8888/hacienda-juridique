import { describe, it, expect, beforeEach } from "vitest";
import { loadInpiCredentials, loadEuipoCredentials, loadOebCredentials } from "../src/config.js";

describe("loadInpiCredentials", () => {
  beforeEach(() => {
    delete process.env.INPI_DATA_LOGIN;
    delete process.env.INPI_DATA_PASSWORD;
  });

  it("lit INPI_DATA_LOGIN/PASSWORD", () => {
    process.env.INPI_DATA_LOGIN = "user";
    process.env.INPI_DATA_PASSWORD = "pwd";
    const c = loadInpiCredentials();
    expect(c?.login).toBe("user");
    expect(c?.password).toBe("pwd");
  });

  it("retourne null si manquant", () => {
    delete process.env.INPI_DATA_LOGIN;
    delete process.env.INPI_DATA_PASSWORD;
    expect(loadInpiCredentials()).toBe(null);
  });
});

describe("loadEuipoCredentials", () => {
  beforeEach(() => {
    delete process.env.EUIPO_API_KEY;
  });

  it("lit EUIPO_API_KEY", () => {
    process.env.EUIPO_API_KEY = "key";
    expect(loadEuipoCredentials()?.apiKey).toBe("key");
  });

  it("retourne null si manquant", () => {
    expect(loadEuipoCredentials()).toBe(null);
  });
});

describe("loadOebCredentials", () => {
  beforeEach(() => {
    delete process.env.OEB_CONSUMER_KEY;
    delete process.env.OEB_CONSUMER_SECRET;
  });

  it("lit OEB_CONSUMER_KEY/SECRET", () => {
    process.env.OEB_CONSUMER_KEY = "key";
    process.env.OEB_CONSUMER_SECRET = "secret";
    const c = loadOebCredentials();
    expect(c?.consumerKey).toBe("key");
    expect(c?.consumerSecret).toBe("secret");
  });

  it("retourne null si manquant", () => {
    expect(loadOebCredentials()).toBe(null);
  });
});
