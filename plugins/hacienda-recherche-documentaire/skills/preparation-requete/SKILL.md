---
name: preparation-requete
description: Prépare les requêtes documentaires multi-bases avant toute navigation ou recherche supervisée.
argument-hint: "<question juridique>"
---

# Préparation De Requête

## Objectif

Qualifier une question juridique et produire des requêtes adaptées aux bases documentaires du cabinet, sans lancer de navigation non approuvée.

## Sortie Attendue

```text
Question qualifiée
Domaine
Période
Sources primaires à vérifier
Requêtes Doctrine
Requêtes Lexis
Requêtes Lefebvre Dalloz
Requêtes Lextenso
Critères d'exclusion
```

## Procédure

1. Identifier domaine, période, juridiction, type de livrable et profondeur attendue.
2. Lister les sources primaires à vérifier avec `hacienda-sources-officielles`.
3. Proposer des requêtes distinctes pour Doctrine, Lexis, Lefebvre Dalloz et Lextenso.
4. Indiquer les critères d'exclusion pour éviter les résultats hors sujet.
5. Demander validation avant toute navigation Chrome ou recherche dans une plateforme.
6. Marquer `[à vérifier]` toute source non consultée directement.
7. Conserver un dossier de preuve des requêtes proposées, filtres et validations humaines.
8. Exiger une validation humaine avant de lancer une recherche dans une base privée ou sur des pièces client.
