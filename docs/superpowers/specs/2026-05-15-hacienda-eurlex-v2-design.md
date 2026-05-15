# Hacienda EUR-Lex V2 - Spécification De Conception

## Objectif

Étendre l'intégration EUR-Lex V1 pour passer d'une recherche/consultation CELEX de base à une couche européenne exploitable en production par les plugins métier Hacienda.

V2 doit permettre de comprendre un acte européen dans son cycle de vie : texte initial, versions consolidées, actes modificateurs, citations, thésaurus EuroVoc, langues disponibles, formats Cellar et liens de preuve.

## État De Départ

EUR-Lex V1 est déjà intégré dans `hacienda-sources-officielles` avec :

- `eurlex_status` ;
- `eurlex_recherche` ;
- `eurlex_consulter` ;
- `eurlex_metadata` ;
- validation CELEX ;
- client Publications Office SPARQL + Cellar REST ;
- redirection Cellar `303` suivie ;
- sorties Markdown avec CELEX, URL officielle et date de consultation.

V2 ne remplace pas cette base. Elle ajoute des outils spécialisés au-dessus des modules existants `packages/core/src/eurlex/*`.

## Périmètre V2

### Outils MCP À Ajouter

```text
eurlex_consolidated
eurlex_citations
eurlex_eurovoc
eurlex_versions
eurlex_formats
```

### Hors Périmètre

V2 ne doit pas :

- exposer un outil SPARQL libre ;
- contourner EUR-Lex ou Cellar ;
- aspirer massivement les textes ;
- construire une base locale complète EUR-Lex ;
- remplacer les analyses métier des plugins spécialisés.

## Cas D'Usage

### Données Personnelles

Un utilisateur demande l'état applicable du RGPD ou de l'AI Act. Hacienda doit :

- retrouver l'acte par CELEX ;
- identifier la version consolidée pertinente ;
- citer l'URL officielle ;
- lister les actes modificateurs et citations principales ;
- signaler les langues et formats disponibles.

### Fiscal

Un utilisateur analyse une directive TVA ou DAC. Hacienda doit :

- retrouver les versions applicables à une date ;
- distinguer directive, règlement, décision et actes préparatoires ;
- relier l'acte aux concepts EuroVoc ;
- produire une preuve réutilisable dans un mémo fiscal.

### Contentieux

Un utilisateur travaille sur une question préjudicielle ou une décision CJUE. Hacienda doit :

- accepter les CELEX de jurisprudence ;
- lister les documents liés ;
- récupérer les métadonnées et citations ;
- ne pas mélanger jurisprudence, acte législatif et document préparatoire.

## Architecture

Créer des modules ciblés, sans gonfler `client.ts` :

```text
packages/core/src/eurlex/
  consolidated.ts
  citations.ts
  eurovoc.ts
  versions.ts
  formats.ts
```

Mettre à jour :

```text
packages/core/src/tools/eurlex.ts
packages/core/src/index.ts
packages/core/test/smoke.test.ts
```

Chaque module doit exposer :

- des types d'arguments ;
- un builder SPARQL ou Cellar typé ;
- une fonction de mapping ;
- une fonction de format Markdown ;
- des tests unitaires avec fixtures.

## Modèle De Données

### Versions Consolidées

```ts
export interface EurlexConsolidatedVersion {
  celexId: string;
  baseCelexId: string;
  dateVersion: string;
  language: EurlexLanguage;
  url: string;
  title?: string;
}
```

### Citations Et Relations

```ts
export type EurlexRelationKind =
  | "amends"
  | "amended_by"
  | "cites"
  | "cited_by"
  | "repeals"
  | "repealed_by"
  | "basis";

export interface EurlexRelation {
  kind: EurlexRelationKind;
  sourceCelexId: string;
  targetCelexId: string;
  title?: string;
  date?: string;
  url: string;
}
```

### EuroVoc

```ts
export interface EurlexEurovocConcept {
  id: string;
  label: string;
  language: EurlexLanguage;
  uri: string;
}
```

### Formats Cellar

```ts
export interface EurlexAvailableFormat {
  celexId: string;
  language: EurlexLanguage;
  format: "html" | "xhtml" | "xml" | "pdf" | "rdf" | "txt";
  url: string;
  contentType?: string;
}
```

## Outils MCP

### `eurlex_consolidated`

But : lister ou récupérer les versions consolidées d'un acte.

Entrées :

- `celex_id`: string ;
- `language`: `FRA | ENG | DEU`, défaut `FRA` ;
- `date`: optionnel `YYYY-MM-DD` ;
- `mode`: `list | nearest | fetch`, défaut `list` ;
- `max_chars`: défaut `20000`, max `50000`.

Sortie :

- liste des versions consolidées ;
- version la plus proche si `nearest` ;
- texte Markdown tronqué si `fetch`.

### `eurlex_citations`

But : lister les relations juridiques d'un document.

Entrées :

- `celex_id`: string ;
- `relation`: enum optionnel ;
- `direction`: `incoming | outgoing | both`, défaut `both` ;
- `limit`: 1..100, défaut 25 ;
- `language`: défaut `FRA`.

Sortie :

- tableau Markdown des relations ;
- CELEX source/cible ;
- type de relation ;
- URL officielle ;
- date de consultation.

### `eurlex_eurovoc`

But : récupérer les concepts EuroVoc attachés à un document ou chercher les documents par concept.

Entrées :

- `celex_id`: optionnel ;
- `concept_uri`: optionnel ;
- `query`: optionnel ;
- `language`: défaut `FRA` ;
- `limit`: 1..50, défaut 20.

Règle : au moins un des champs `celex_id`, `concept_uri`, `query` est requis.

### `eurlex_versions`

But : exposer les documents liés au cycle de vie d'un acte : acte initial, consolidations, rectificatifs, actes préparatoires si disponibles.

Entrées :

- `celex_id`: string ;
- `language`: défaut `FRA` ;
- `include_preparatory`: boolean, défaut `false`.

### `eurlex_formats`

But : diagnostiquer les formats et langues disponibles pour un CELEX.

Entrées :

- `celex_id`: string ;
- `language`: optionnel ;
- `format`: optionnel.

Sortie :

- formats disponibles ;
- URL Cellar directe ;
- URL EUR-Lex lisible ;
- indication si le format est récupérable par Hacienda.

## Requêtes Et Sécurité

Les requêtes doivent rester dans des builders typés.

Règles obligatoires :

- aucune entrée utilisateur ne devient une IRI sans validation ;
- `concept_uri` doit commencer par `http://eurovoc.europa.eu/` ;
- CELEX passe toujours par `assertCelexId` ;
- `limit` est borné par Zod et par builder ;
- les textes sont tronqués ;
- les redirections Cellar sont limitées à 5 ;
- tout endpoint live a timeout explicite.

## Cache

V2 introduit un cache léger optionnel, mais pas une base documentaire.

Clés recommandées :

```text
eurlex:consolidated:<celex>:<lang>
eurlex:citations:<celex>:<relation>:<direction>:<lang>
eurlex:eurovoc:<celex-or-concept>:<lang>
eurlex:formats:<celex>
```

TTL :

- métadonnées, citations, EuroVoc : 7 jours ;
- versions consolidées : 24 heures ;
- textes récupérés : pas de cache par défaut en V2, sauf configuration explicite.

## Sorties Markdown

Chaque sortie doit inclure :

- CELEX ;
- langue ;
- URL EUR-Lex lisible ;
- URL Publications Office si pertinente ;
- date de consultation ;
- avertissement si données partielles ;
- statut de troncature si texte.

Les citations doivent être exploitables directement dans les plugins métier.

## Tests

Tests unitaires requis :

- builders SPARQL V2 ;
- validation `concept_uri` EuroVoc ;
- mapping relations ;
- mapping versions consolidées ;
- formats Cellar et redirections ;
- formatters Markdown ;
- handlers MCP avec clients injectés ;
- erreurs réseau et réponses partielles ;
- smoke test listant les nouveaux tools.

Tests live optionnels :

- `eurlex_consolidated` sur `32016R0679` ;
- `eurlex_citations` sur `32016R0679` ou `32024R1689` ;
- `eurlex_eurovoc` sur `32016R0679` ;
- `eurlex_formats` sur `32016R0679`.

Les tests live doivent être désactivés par défaut et activés par `EURLEX_LIVE_TESTS=1`.

## Critères D'Acceptation

- Les cinq nouveaux tools MCP sont visibles dans le smoke test.
- `eurlex_consolidated` liste au moins les versions consolidées disponibles pour un acte stable.
- `eurlex_citations` distingue relations entrantes et sortantes.
- `eurlex_eurovoc` retourne des concepts validés et ne permet pas d'IRI arbitraire.
- `eurlex_versions` donne une vue cycle de vie exploitable par les plugins métier.
- `eurlex_formats` explique clairement quels formats/langues sont récupérables.
- Toutes les sorties sont en français.
- Aucun outil SPARQL libre n'est exposé.
- `npm --prefix packages/core test`, `npm run typecheck` et `npm run build` passent.

