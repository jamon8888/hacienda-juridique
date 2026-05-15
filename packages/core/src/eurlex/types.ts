import type { EurlexLanguage } from "./celex.js";

export type EurlexResourceType = "any" | "regulation" | "directive" | "decision" | "case-law";

export interface EurlexSearchArgs {
  query: string;
  resourceType?: EurlexResourceType;
  language?: EurlexLanguage;
  limit?: number;
  dateFrom?: string;
  dateTo?: string;
}

export interface EurlexSearchResult {
  celexId: string;
  title: string;
  url: string;
  language: EurlexLanguage;
  resourceType: EurlexResourceType;
  date?: string;
}

export interface EurlexSearchResponse {
  query: string;
  retrievedAt: string;
  results: EurlexSearchResult[];
}

export interface EurlexMetadata {
  celexId: string;
  title?: string;
  language: EurlexLanguage;
  url: string;
  dateDocument?: string;
  dateEffect?: string;
  resourceType?: EurlexResourceType;
  authors: string[];
  eurovoc: string[];
  directoryCodes: string[];
  retrievedAt: string;
}
