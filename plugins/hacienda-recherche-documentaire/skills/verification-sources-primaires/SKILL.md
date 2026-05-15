---
name: verification-sources-primaires
description: Envoie les textes, décisions et doctrines primaires citées vers Hacienda Sources Officielles.
argument-hint: "<liste de références primaires>"
---

# Vérification Des Sources Primaires

## Tools À Utiliser Conceptuellement

```text
legifrance_get_article
legifrance_get_jurisprudence
legifrance_get_loda
legifrance_get_jorf
bofip_consulter
legifrance_rechercher
```

## Procédure

1. Extraire les articles, textes, décisions, JORF et BOFiP cités par les bases documentaires.
2. Interroger le tool Hacienda le plus précis.
3. Comparer la référence primaire avec la source éditoriale.
4. Marquer `[à vérifier]` si la source officielle n'a pas été consultée.
5. Ajouter chaque source contrôlée au dossier documentaire.
