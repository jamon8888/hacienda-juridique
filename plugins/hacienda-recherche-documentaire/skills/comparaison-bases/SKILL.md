---
name: comparaison-bases
description: Compare les résultats issus de plusieurs bases documentaires.
argument-hint: "<résultats structurés>"
---

# Comparaison Des Bases

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
