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
6. Bloquer toute conclusion définitive en cas de discordance non résolue.
7. Exiger une validation humaine avant citation comme source opposable.

## Résultats Anno

Si une référence primaire provient d'un passage Anno :

1. traiter le passage comme source interne de dossier ;
2. ne jamais présenter Anno comme provenance officielle ;
3. utiliser `legal_rehydrate_citation` seulement si l'utilisateur autorisé demande une citation locale ;
4. vérifier la référence avec `hacienda-sources-officielles` ;
5. conserver le lien entre passage Anno, source officielle consultée et statut `[à vérifier]`.
