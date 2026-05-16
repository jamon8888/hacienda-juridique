# Discovery PI Brevets V2.0 — 2026-05-16

Document préparatoire à la Phase 1 du plan `docs/superpowers/plans/2026-05-16-hacienda-pi-brevets-v2.0-mvp.md`.

## Mode

Spéculatif — pas de credentials INPI Brevets ni OEB OPS disponibles, pas de curl réel exécuté. Les schémas et endpoints ci-dessous sont des hypothèses raisonnables tirées de la documentation publique INPI Data et OEB OPS 3.2. À valider lors du premier run réel avec credentials.

Tant que les credentials ne sont pas disponibles, toute sortie de tool brevets doit être marquée `[a verifier]` conformément à la règle 2 de `CLAUDE.md`.

## Hypothèses INPI Brevets

- **Base URL** : `https://api.inpi.fr` (même que marques V1.0).
- **Authentification** : OAuth2 password grant, identique à `InpiClient` V1.0.
  - Path : `POST /services/sso/login`
  - Body JSON : `{ "username": "<email>", "password": "<password>" }`
  - Réponse : `{ "access_token": "<jwt>", "token_type": "Bearer", "expires_in": 3600 }`
- **Recherche brevets** (assumé) :
  - Path : `GET /services/brevets/search`
  - Query params attendus : `q` (texte libre), `cib` (codes CIB CSV, ex. `B01D 71/02,C01B 32/19`), `deposant` (raison sociale), `type` (`FR|EP|PCT|CCP`), `status` (`demande|publiee|delivree|rejetee|retiree|decheance`), `limit` (entier).
  - Réponse : enveloppe paginée `{ total, resultats: [...], dateBase }`.
- **Détail brevet** (assumé) :
  - Path : `GET /services/brevets/{numero}`
  - Réponse : objet enrichi avec `revendications: string[]`, `historique`, `statut`, `abregeText`, `inventeurs`.
- **Identifiants** : FR + 7 chiffres (`FR2700123`), EP + 7 chiffres (`EP1234567`), WO/PCT au format `WO2020/123456`.

## Hypothèses OEB Espacenet OPS 3.2

- **Base URL** : `https://ops.epo.org`
- **Authentification** : OAuth2 `client_credentials`.
  - Path : `POST /3.2/auth/accesstoken`
  - Header : `Authorization: Basic base64(<consumer_key>:<consumer_secret>)`
  - Body (form-urlencoded) : `grant_type=client_credentials`
  - Réponse JSON : `{ "access_token": "<token>", "token_type": "BearerToken", "expires_in": 1200 }` (TTL 20 min).
- **Recherche** :
  - Path : `GET /3.2/rest-services/published-data/search`
  - Query params : `q` (syntaxe CQL OEB, ex. `ti=graphene AND ic=B01D`), `Range` via header pour pagination.
  - Header recommandé : `Accept: application/json` (sinon réponse XML par défaut).
- **Détails biblio** :
  - Path : `GET /3.2/rest-services/published-data/publication/EP/<numero>/biblio`
  - Variantes : `/claims`, `/description`, `/equivalents`, `/family`, `/legal`.
- **Quota** : 4 Go/semaine en niveau gratuit (OPS Developer). Cache 24h obligatoire sur chaque numéro de publication consulté pour ne pas brûler le quota.
- **Format** : JSON via `Accept: application/json`. La structure réelle est un `exchange-document` enveloppé ; on aplatit côté client en `{ resultats: [...], totalCount }`.

## Décision tools registry

Les 4 nouveaux tools brevets (`inpi_search_brevets`, `inpi_brevet_details`, `espacenet_search`, `espacenet_brevet_details`) sont enregistrés dans `createHaciendaServer` du package `@hacienda/core` — même décision qu'en V1.0 pour les marques. Conséquence : ils sont exposés par TOUS les MCP servers de plugins Hacienda (pas de filtrage par plugin). Un mécanisme de filtrage par plugin sera ajouté en V2.1 si l'usage révèle du bruit pour les plugins non concernés.

## Fixtures à créer (spéculatives)

- `packages/core/test/fixtures/inpi/search-graphene-filtration.json` (3-5 brevets FR/EP, classification CIB `B01D 71/02`)
- `packages/core/test/fixtures/inpi/details-brevet-fr2700123.json` (revendications + historique + statut `delivree`)
- `packages/core/test/fixtures/espacenet/search-graphene.json` (multi-pays EP/WO/US)
- `packages/core/test/fixtures/espacenet/details-ep1234567.json` (biblio OEB)

## Risques

Si le format réel des API diffère (chemins, noms de champs, pagination, CQL OEB), un refactor sera nécessaire. L'impact est circonscrit à :

- `packages/core/src/sources/inpi-brevets.ts`
- `packages/core/src/sources/espacenet.ts`
- Fixtures `packages/core/test/fixtures/{inpi,espacenet}/*.json`

Les tools MCP exposés conservent leur signature publique ; les prompts skills ne sont pas affectés par un changement de schéma source.
