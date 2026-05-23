# Discovery PI Marques — 2026-05-15

Document préparatoire à la Phase 1 du plan `docs/superpowers/plans/2026-05-15-hacienda-pi-marques-v1.md`.

## Mode

Spéculatif — pas de credentials INPI/EUIPO disponibles, pas de curl réel exécuté. Les schémas et endpoints documentés ci-dessous sont des hypothèses raisonnables tirées de la documentation publique INPI Data et EUIPO TMview. À valider lors du premier run réel avec credentials.

Tant que les credentials ne sont pas disponibles, toute sortie de tool marques doit être marquée `[a verifier]` conformément à la règle 2 de `CLAUDE.md`.

## Hypothèses INPI Data

- **Base URL** : `https://api.inpi.fr`
- **Authentification** : OAuth2 password grant.
  - Path : `POST /services/sso/login`
  - Body JSON : `{ "username": "<email>", "password": "<password>" }`
  - Réponse JSON : `{ "access_token": "<jwt>", "token_type": "Bearer", "expires_in": 3600 }`
  - Token réutilisé via header `Authorization: Bearer <access_token>` sur les appels suivants.
- **Recherche marques** (assumé) :
  - Path : `GET /services/marques/search`
  - Query params attendus : `q` (texte libre), `classes` (CSV Nice, ex. `9,42`), `type` (`verbal|figurative|semi-figurative|3D|sonore`), `status` (`enregistree|deposee|expiree|refusee`), `similarity` (`exacte|proche|phonetique`), `limit` (entier).
  - Réponse : enveloppe paginée `{ total, items: [...] }` avec items typés `MarqueINPIResume`.
- **Détail marque** (assumé) :
  - Path : `GET /services/marques/{numero}`
  - Réponse : objet `MarqueINPIDetail` (titulaire, classes Nice, dates dépôt/enregistrement/expiration, statut, historique).
- **Cadence de mise à jour** : hebdomadaire, publication le vendredi (documenté publiquement par l'INPI). Pas de webhook ; refresh client par polling planifié.

## Hypothèses EUIPO TMview

- **Base URL** : `https://www.tmdn.org/tmview/api/search/results`
- **Authentification** : header `Ocp-Apim-Subscription-Key: <key>` (Azure API Management standard EUIPO).
- **Query params** :
  - `basicSearch` : terme texte.
  - `pageSize` : nombre de résultats (défaut supposé 30, max 200).
  - `offices` : CSV des codes offices (`EM` pour EUIPO, `FR`, `DE`, `IT`, `ES`, `WO` pour OMPI/Madrid…).
  - `niceClass` : CSV de classes Nice.
  - `status` : code statut TMview (`Registered`, `Filed`, `Expired`, `Ended`).
- **Réponse** : objet `{ tradeMarks: [...] , totalResults }` ; chaque entrée porte `applicationNumber`, `markVerbalElement`, `officeCode`, `niceClasses`, `status`, dates clés.

## Hypothèses BOPI

Pas d'API JSON officielle confirmée à ce jour pour le Bulletin Officiel de la Propriété Industrielle. La V1.0 du tool `marques.surveiller_bopi` retournera donc un fallback documenté pointant vers `https://bopi.inpi.fr`, accompagné de la date de parution la plus récente déduite du calendrier hebdomadaire INPI (vendredi). Le parsing PDF/HTML des bulletins est explicitement reporté en V1.1.

## Décision tools registry

Tous les nouveaux tools `marques.*` sont enregistrés dans `createHaciendaServer` du package `@hacienda/core`. Conséquence : ils sont exposés par TOUS les MCP servers de plugins Hacienda (pas de filtrage par plugin en V1.0). Un mécanisme de filtrage par plugin sera ajouté en V1.1 si l'usage révèle du bruit pour des plugins non concernés.

## Fixtures à créer

Pour permettre le développement et les tests sans credentials, on crée des fixtures JSON inventées mais structurellement plausibles :

- `packages/core/test/fixtures/inpi/search-marque-verbale.json`
- `packages/core/test/fixtures/inpi/search-multiclasse.json`
- `packages/core/test/fixtures/inpi/detail-marque.json`
- `packages/core/test/fixtures/inpi/auth-token.json`
- `packages/core/test/fixtures/euipo/search-basic.json`
- `packages/core/test/fixtures/euipo/search-multi-offices.json`
- `packages/core/test/fixtures/euipo/empty-results.json`

Ces fixtures sont marquées comme spéculatives en tête de fichier (`"_spec": "fixture spéculative — à remplacer par capture réelle"`). Elles seront remplacées par des captures réelles dès l'obtention des credentials.

## Risques

Si le format réel des API diffère significativement des hypothèses ci-dessus (chemins, noms de champs, pagination, codes de statut), un refactor sera nécessaire. L'impact est néanmoins circonscrit aux fichiers suivants :

- `packages/core/src/sources/inpi-marques.ts` (client HTTP + parsing).
- `packages/core/src/sources/euipo-tmview.ts` (client HTTP + parsing).
- Schémas Zod associés (`packages/core/src/schemas/marques.ts` prévu).
- Fixtures `packages/core/test/fixtures/{inpi,euipo}/*.json`.

Les tools MCP exposés (`marques.rechercher_inpi`, `marques.rechercher_euipo`, `marques.surveiller_bopi`, etc.) conservent leur signature publique : un changement de schéma INPI/EUIPO n'a pas d'impact sur les plugins consommateurs ni sur les prompts.
