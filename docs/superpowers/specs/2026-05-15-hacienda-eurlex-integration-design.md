# Hacienda EUR-Lex - Spécification De Conception

## Objectif

Ajouter EUR-Lex à `hacienda-sources-officielles` comme source officielle européenne, au même niveau de preuve que Légifrance, BOFiP, Judilibre et BOSS.

L'intégration doit permettre aux plugins métier Hacienda de rechercher, consulter et citer le droit de l'Union européenne à partir des identifiants CELEX, des métadonnées EUR-Lex et des textes publiés via Cellar.

## Contexte Projet

Le dépôt actif est `jamon8888/hacienda-juridique`. Les branches métier en cours sont `hacienda-social`, `hacienda-fiscal`, `hacienda-contentieux`, `hacienda-contrats`, `hacienda-societes`, `hacienda-donnees-personnelles`, `hacienda-recherche-documentaire` et `hacienda-marketplace-plugins`.

Le code exécutable peut encore contenir des noms transitoires hérités. L'implémentation doit viser le code actuel sans lancer le rebranding complet dans la même passe.

## Référence Externe

Le dépôt `Honeyfield-Org/eurlex-mcp-server` fournit une base fonctionnelle utile : recherche SPARQL Cellar, consultation REST Cellar par CELEX, métadonnées, versions consolidées, citations, EuroVoc, langues `DEU`, `ENG`, `FRA`, sans clé API.

Décision : reprendre l'architecture fonctionnelle et les requêtes pertinentes, mais ne pas dépendre de ce serveur MCP en runtime.

## Architecture

Créer une intégration native dans `packages/core` :

```text
packages/core/src/eurlex/
  celex.ts
  types.ts
  client.ts
  search.ts
  format.ts
  status.ts
packages/core/src/tools/eurlex.ts
```

Les outils MVP exposés :

```text
eurlex_status
eurlex_recherche
eurlex_consulter
eurlex_metadata
```

Les outils phase 2 restent hors MVP :

```text
eurlex_consolidated
eurlex_citations
eurlex_eurovoc
```

## Source Commune

Ajouter `EURLEX` au modèle partagé :

```ts
export type OfficialSource =
  | "LEGIFRANCE"
  | "BOFIP"
  | "JUDILIBRE"
  | "BOSS"
  | "EURLEX";
```

Les résultats de recherche doivent produire des `SourceSearchHit` avec `source: "EURLEX"`, `id` égal au CELEX, URL officielle, date, extrait et date de consultation.

## Langues Et Identifiants

Langue par défaut : `FRA`.

Langues acceptées :

```text
FRA
ENG
DEU
```

Identifiant pivot : CELEX. La validation doit accepter les actes classiques (`32024R1689`), la jurisprudence CJUE (`62014CJ0131`) et les versions consolidées (`02016R0679-20160504`).

## Sécurité

Les requêtes SPARQL doivent être construites par builders typés, pas par concaténation libre exposée aux utilisateurs.

Règles :

- échapper `\`, `"`, retours ligne, tabulations ;
- limiter `limit` côté Zod ;
- refuser les IRIs EuroVoc dangereuses en phase 2 ;
- ne pas créer d'outil SPARQL libre.

## Cache Et Timeouts

MVP sans cache dédié. Le client doit cependant appliquer des timeouts explicites sur SPARQL et REST Cellar.

Les textes doivent être tronqués par `max_chars`, défaut `20000`, maximum `50000`.

## Intégration Plugins Hacienda

`hacienda-sources-officielles` expose EUR-Lex comme source primaire européenne.

Les plugins métier l'utilisent ainsi :

- `hacienda-social` : temps de travail, détachement, égalité, sécurité sociale UE, CJUE sociale.
- `hacienda-donnees-personnelles` : RGPD, ePrivacy, DSA/DMA, AI Act.
- `hacienda-fiscal` : TVA, DAC, fiscalité transfrontalière.
- `hacienda-contentieux` : CJUE, questions préjudicielles, primauté, effet direct.
- `hacienda-contrats` et `hacienda-societes` : consommation, concurrence, contrats et sociétés UE.

`hacienda-recherche-documentaire` doit vérifier les références européennes repérées dans les bases secondaires via EUR-Lex avant de les marquer comme vérifiées.

## Tests

Tests requis :

- validation CELEX ;
- échappement SPARQL ;
- construction des requêtes ;
- mapping `SourceSearchHit` ;
- formatage Markdown ;
- handlers MCP ;
- status ;
- smoke test listant les nouveaux tools.

Tests live optionnels sous variable `EURLEX_LIVE_TESTS=1`, avec CELEX stables `32016R0679` ou `32024R1689`.

## Critères D'Acceptation

- `EURLEX` est dans `OfficialSource`.
- `eurlex_recherche` retourne des résultats en `FRA` par défaut.
- `eurlex_consulter` récupère un texte par CELEX et signale la troncature.
- `eurlex_metadata` retourne titre, date, type, auteurs/EuroVoc si disponibles.
- `eurlex_status` distingue service disponible, partiel et indisponible.
- Les sorties contiennent CELEX, URL officielle et date de consultation.
- Typecheck, tests et build passent.
