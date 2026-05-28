---
name: verification-sources-primaires
description: Envoie les textes, décisions et doctrines primaires citées vers Hacienda Sources Officielles.
argument-hint: "<liste de références primaires>"
version: "2.0.0"
---

# Vérification Des Sources Primaires

## Outils MCP à privilégier

Ce plugin ne contient pas de serveur MCP propre. Pour vérifier une source primaire, appeler les outils du socle `Hacienda Sources Officielles` par leur nom exact ; une référence éditoriale non recoupée reste `[à vérifier]`.

- Socle officiel : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Sources spécialisées utiles selon le dossier : `bofip_rechercher`, `bofip_consulter`, `boss_recherche`, `boss_get_document`, `inpi_search_marques`, `inpi_search_brevets`, `bodacc_by_siren`, `company_full_profile`.
- Les bases Doctrine, Lefebvre Dalloz, Lexis, Lextenso et assimilées restent consultées sous accès utilisateur autorisé ; ne pas automatiser d'extraction massive ni contourner leurs limites.

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
