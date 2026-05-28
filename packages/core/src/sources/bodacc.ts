import { log } from "../logger.js";

const BODACC_BASE_URL =
  "https://bodacc-datadila.opendatasoft.com/api/explore/v2.1";

export interface BodaccAnnonce {
  id: string;
  registre: string;
  dateparution: string;
  typeavis: string;
  familleavis: string;
  publicationavis: string;
  numerodepartement?: string;
  ville?: string;
  raw: unknown;
}

export class BodaccClient {
  constructor(private readonly baseUrl: string = BODACC_BASE_URL) {}

  async searchBySiren(
    siren: string,
    limit: number = 20
  ): Promise<BodaccAnnonce[]> {
    const params = new URLSearchParams({
      where: `registre LIKE "%${siren}%"`,
      order_by: "dateparution DESC",
      limit: String(limit),
    });
    const url = `${this.baseUrl}/catalog/datasets/annonces-commerciales/records?${params}`;
    try {
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) {
        log.warn("BODACC HTTP error", { status: res.status, siren });
        return [];
      }
      const data = (await res.json()) as { results: unknown[] };
      return (data.results ?? []).map((r) => this.parseAnnonce(r));
    } catch (err) {
      log.warn("BODACC fetch failed", { err: String(err), siren });
      return [];
    }
  }

  async searchProcedures(siren: string): Promise<BodaccAnnonce[]> {
    const params = new URLSearchParams({
      where: `registre LIKE "%${siren}%" AND familleavis = "procedures-collectives"`,
      order_by: "dateparution DESC",
      limit: "50",
    });
    const url = `${this.baseUrl}/catalog/datasets/annonces-commerciales/records?${params}`;
    try {
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) return [];
      const data = (await res.json()) as { results: unknown[] };
      return (data.results ?? []).map((r) => this.parseAnnonce(r));
    } catch (err) {
      log.warn("BODACC procedures fetch failed", { err: String(err), siren });
      return [];
    }
  }

  private parseAnnonce(raw: unknown): BodaccAnnonce {
    const r = raw as Record<string, unknown>;
    return {
      id: String(r.id ?? ""),
      registre: String(r.registre ?? ""),
      dateparution: String(r.dateparution ?? ""),
      typeavis: String(r.typeavis_lib ?? ""),
      familleavis: String(r.familleavis_lib ?? ""),
      publicationavis: String(r.publicationavis_facette ?? ""),
      numerodepartement: r.numerodepartement
        ? String(r.numerodepartement)
        : undefined,
      ville: r.ville ? String(r.ville) : undefined,
      raw,
    };
  }
}
