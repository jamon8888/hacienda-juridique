# Discovery V1.1.0 — INPI Data publications récentes

**Date** : 2026-05-16
**Mode** : Spéculatif (pas de credentials Data INPI)

## Hypothèses retenues

- Endpoint : `GET /services/marques/publications` (à confirmer)
- Paramètres : `since` (ISO YYYY-MM-DD, fenêtre max 30 j), `classes` (CSV Nice), `motCle` (recherche dans le signe), `titulaire` (raison sociale), `limit` (1-200, défaut 50)
- Auth : même OAuth password grant que `inpi_search_marques`
- Réponse : `{ publications: [{numero, signe, classes, titulaire, datePublication, urlSource}], total, dateMaxBase }`
- Le champ `dateOpposition_limite` est calculé côté tool : `datePublication + 2 mois` (CPI L.712-4)

## Fallback si endpoint dédié inexistant

- B : étendre `inpi_search_marques` avec `dateDepotMin`/`dateDepotMax`
- C : RSS BOPI INPI + scraping HTML — différé V1.1.1

## Risques

- Refactor du tool si shape API diffère (impact : `packages/core/src/sources/inpi-marques.ts` méthode `marquesPublicationsRecentes`, `packages/core/src/tools/inpi-marques-publications-recentes.ts`, et la fixture associée)
