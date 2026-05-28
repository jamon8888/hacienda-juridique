---
name: comparaison-bases
description: Compare les résultats issus de plusieurs bases documentaires.
argument-hint: "<résultats structurés>"
version: "2.0.0"
---

# Comparaison Des Bases

## Outils MCP à privilégier

Ce plugin ne contient pas de serveur MCP propre. Pour vérifier une source primaire, appeler les outils du socle `Hacienda Sources Officielles` par leur nom exact ; une référence éditoriale non recoupée reste `[à vérifier]`.

- Socle officiel : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Sources spécialisées utiles selon le dossier : `bofip_rechercher`, `bofip_consulter`, `boss_recherche`, `boss_get_document`, `inpi_search_marques`, `inpi_search_brevets`, `bodacc_by_siren`, `company_full_profile`.
- Les bases Doctrine, Lefebvre Dalloz, Lexis, Lextenso et assimilées restent consultées sous accès utilisateur autorisé ; ne pas automatiser d'extraction massive ni contourner leurs limites.

## Objectif

Comparer les résultats documentaires sans confondre consensus éditorial et source officielle vérifiée.

## Axes Obligatoires

```text
convergences
divergences
source isolée
source éditoriale dominante
jurisprudence confirmée
source primaire manquante
source interne Anno
```

## Sortie

- synthèse courte ;
- tableau des convergences ;
- tableau des divergences ;
- sources primaires à vérifier ;
- angles morts à relire manuellement.

## Garde-Fous

- Les résultats Anno sont des sources internes de dossier client, pas des bases éditoriales et pas des sources primaires.
- Avant d'intégrer un résultat Anno : `anno_health`, puis `detect` ou gestion PII Anno équivalente.
- Utiliser `legal_search` et `legal_graph_query` seulement sur un corpus déjà ingéré et validé par l'utilisateur.
- Toute source non consultée directement reste marquée `[à vérifier]`.
- Les divergences entre bases restent des signaux de recherche, pas des conclusions.
- La validation humaine est requise avant réutilisation dans un livrable client.
- Conserver un dossier de preuve avec base consultée, date, requête et extrait utile.
