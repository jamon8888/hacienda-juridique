import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { PisteHttpClient } from "../http.js";
import { GetArticleResponseSchema, SearchResponseSchema, type Article } from "../schemas.js";
import { summarizeArticle, formatArticleAsMarkdown, normalizeLegiDate } from "../format.js";
import { resolveLegitext, listKnownCodes, normalizeArticleNum } from "../codes-legitext.js";
import { log } from "../logger.js";

/**
 * `getArticleWithIdAndNum` ne renvoie pas les articles au statut `ABROGE_DIFF`
 * (abrogation différée) alors qu'ils sont toujours en vigueur — ex. C.com.
 * L441-10, abrogé au 2027-01-01 mais applicable aujourd'hui. Quand l'appel
 * direct renvoie `article: null`, on retrouve la version en vigueur via
 * `/search` (toutes les versions de l'article, tous codes confondus — le
 * filtre NOM_CODE s'est montré peu fiable), puis on confirme chaque
 * candidat avec `/consult/getArticle` (LEGITEXT + fenêtre de vigueur).
 * Borné pour éviter une rafale d'appels PISTE sur un numéro ambigu.
 */
const MAX_FALLBACK_CANDIDATES = 5;

async function findInForceArticleAcrossCodes(
  http: PisteHttpClient,
  legitext: string,
  num: string,
): Promise<Article | undefined> {
  const searchBody = {
    fond: "CODE_ETAT",
    recherche: {
      champs: [
        {
          typeChamp: "NUM_ARTICLE",
          operateur: "ET",
          criteres: [{ valeur: num, operateur: "ET", typeRecherche: "EXACTE" }],
        },
      ],
      operateur: "ET",
      pageNumber: 1,
      pageSize: 20,
      sort: "PERTINENCE",
      typePagination: "DEFAUT",
    },
  };

  // Une recherche à 0 résultat n'est pas fiable à figer 1h : ça pourrait être
  // un hoquet transitoire côté PISTE plutôt qu'une absence réelle de version.
  const cacheableSearch = (parsed: unknown): boolean =>
    ((parsed as { results?: unknown[] } | undefined)?.results?.length ?? 0) > 0;

  const rawSearch = await http.post("/search", searchBody, { cacheable: cacheableSearch });
  const parsedSearch = SearchResponseSchema.safeParse(rawSearch);
  if (!parsedSearch.success) {
    log.warn("get-article fallback: unexpected /search shape", {
      issues: parsedSearch.error.issues.slice(0, 5),
    });
    return undefined;
  }

  const candidateIds: string[] = [];
  outer: for (const result of parsedSearch.data.results ?? []) {
    for (const section of result.sections ?? []) {
      for (const extract of section.extracts ?? []) {
        if (!extract.id) continue;
        if (extract.num && normalizeArticleNum(extract.num) !== num) continue;
        if (!candidateIds.includes(extract.id)) candidateIds.push(extract.id);
        if (candidateIds.length >= MAX_FALLBACK_CANDIDATES) break outer;
      }
    }
  }

  const today = new Date().toISOString().slice(0, 10);
  const cacheableArticle = (parsed: unknown): boolean =>
    Boolean((parsed as { article?: unknown } | undefined)?.article);
  const targetLegitext = legitext.toUpperCase();

  for (const candidateId of candidateIds) {
    const rawArticle = await http.post(
      "/consult/getArticle",
      { id: candidateId },
      { cacheable: cacheableArticle },
    );
    const parsedArticle = GetArticleResponseSchema.safeParse(rawArticle);
    if (!parsedArticle.success || !parsedArticle.data.article) continue;
    const article = parsedArticle.data.article;

    const articleLegitext = (article.cidTexte ?? article.idTexte ?? "").toUpperCase();
    if (articleLegitext !== targetLegitext) continue;

    const dateDebut = normalizeLegiDate(article.dateDebut);
    const dateFin = normalizeLegiDate(article.dateFin);
    const inForce = (!dateDebut || dateDebut <= today) && (!dateFin || dateFin > today);
    if (!inForce) continue;

    return article;
  }
  return undefined;
}

export function registerGetArticle(server: McpServer, http: PisteHttpClient) {
  server.registerTool(
    "legifrance_get_article",
    {
      title: "Article d'un code (Légifrance)",
      description: [
        "Récupère le texte intégral d'un article d'un code français (Code civil, Code pénal, CGI, etc.).",
        "Deux modes d'invocation :",
        "1. Par identifiant LEGIARTI : passer `articleId` (ex. `LEGIARTI000006417707`).",
        "2. Par code et numéro : passer `code` (nom usuel ex. `Code civil`, ou un LEGITEXT directement) + `num` (ex. `1240`, `L611-3` ; `L. 611-3` est aussi accepté).",
        `Codes connus : ${listKnownCodes().slice(0, 12).join(", ")}…`,
        "Retourne : numéro, texte, état (VIGUEUR/ABROGE/MODIFIE…), dates, lien Légifrance.",
        "Si l'article est en abrogation différée (encore en vigueur mais abrogé à une date future), c'est signalé explicitement.",
      ].join("\n"),
      inputSchema: {
        articleId: z.string().optional().describe("Identifiant LEGIARTI… de l'article."),
        code: z.string().optional().describe("Nom usuel du code (ex. 'Code civil') ou identifiant LEGITEXT…"),
        num: z.string().optional().describe("Numéro de l'article (ex. '1240', 'L421-1' ; 'L. 421-1' est normalisé)."),
      },
    },
    async (args) => {
      if (!args.articleId && !(args.code && args.num)) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "Erreur : il faut fournir soit `articleId` (LEGIARTI…), soit le couple `code` + `num`.",
            },
          ],
        };
      }

      // Une réponse 200 sans `article` (non trouvé) n'est mise en cache que si
      // c'est un vrai "introuvable" — sinon un hoquet transitoire côté PISTE
      // figerait un faux négatif pour 24h (voir RequestOptions.cacheable).
      const cacheable = (parsed: unknown): boolean =>
        Boolean((parsed as { article?: unknown } | undefined)?.article);

      let raw: unknown;
      let legitext: string | undefined;
      let normalizedNum: string | undefined;
      if (args.articleId) {
        raw = await http.post("/consult/getArticle", { id: args.articleId }, { cacheable });
      } else {
        legitext = resolveLegitext(args.code!);
        if (!legitext) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: `Code "${args.code}" non reconnu. Codes connus : ${listKnownCodes().join(", ")}. Vous pouvez aussi passer un identifiant LEGITEXT directement.`,
              },
            ],
          };
        }
        normalizedNum = normalizeArticleNum(args.num!);
        raw = await http.post(
          "/consult/getArticleWithIdAndNum",
          {
            id: legitext,
            num: normalizedNum,
          },
          { cacheable },
        );
      }

      const parsed = GetArticleResponseSchema.safeParse(raw);
      if (!parsed.success) {
        log.warn("get-article: response shape unexpected", { issues: parsed.error.issues.slice(0, 5) });
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Réponse Légifrance inattendue. Détail : ${parsed.error.message.slice(0, 300)}`,
            },
          ],
        };
      }

      let article = parsed.data.article;

      // `getArticleWithIdAndNum` ne renvoie pas les articles ABROGE_DIFF.
      // Repli : chercher la version en vigueur via /search, tous codes
      // confondus, puis confirmer le LEGITEXT et la fenêtre de vigueur.
      if (!article && legitext && normalizedNum) {
        article = await findInForceArticleAcrossCodes(http, legitext, normalizedNum);
      }

      if (!article) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "Article introuvable. Vérifiez l'identifiant ou le couple code/num (Légifrance/PISTE).",
            },
          ],
        };
      }

      const summary = summarizeArticle(article);
      return {
        content: [{ type: "text", text: formatArticleAsMarkdown(summary) }],
      };
    },
  );
}
