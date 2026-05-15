import { describe, it, expect, vi } from "vitest";
import { readFileSync } from "node:fs";
import {
  InpiMarqueSchema,
  InpiClient,
  InpiCredentialsMissingError,
} from "../../src/sources/inpi-marques.js";

describe("InpiMarqueSchema", () => {
  it("parse une réponse de détails INPI", () => {
    const raw = JSON.parse(
      readFileSync(
        new URL("../fixtures/inpi/details-marque-fr-1234567.json", import.meta.url),
        "utf8"
      )
    );
    const parsed = InpiMarqueSchema.parse(raw);
    expect(typeof parsed.numero).toBe("string");
    expect(Array.isArray(parsed.classes)).toBe(true);
    expect(parsed.titulaire.length).toBeGreaterThan(0);
  });
});

describe("InpiClient", () => {
  it("authenticate réutilise le token tant que non expiré", async () => {
    const fetchMock = vi.fn(async () =>
      new Response(
        JSON.stringify({ access_token: "tok-1", expires_in: 3600 }),
        { status: 200 }
      )
    );
    const client = new InpiClient({
      login: "user",
      password: "pwd",
      fetch: fetchMock as unknown as typeof fetch,
    });
    await client.authenticate();
    await client.authenticate();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("sans credentials lève InpiCredentialsMissingError", () => {
    expect(() => new InpiClient({ login: "", password: "" })).toThrow(
      InpiCredentialsMissingError
    );
  });
});
