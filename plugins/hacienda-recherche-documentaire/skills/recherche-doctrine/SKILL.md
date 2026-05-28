---
name: recherche-doctrine
description: Guide une recherche supervisée dans Doctrine sans extraction massive ni contournement.
version: "2.0.0"
argument-hint: "[dossier | source | question | objectif]"
---

# Recherche Doctrine

## Outils MCP à privilégier

Ce plugin ne contient pas de serveur MCP propre. Pour vérifier une source primaire, appeler les outils du socle `Hacienda Sources Officielles` par leur nom exact ; une référence éditoriale non recoupée reste `[à vérifier]`.

- Socle officiel : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Sources spécialisées utiles selon le dossier : `bofip_rechercher`, `bofip_consulter`, `boss_recherche`, `boss_get_document`, `inpi_search_marques`, `inpi_search_brevets`, `bodacc_by_siren`, `company_full_profile`.
- Les bases Doctrine, Lefebvre Dalloz, Lexis, Lextenso et assimilées restent consultées sous accès utilisateur autorisé ; ne pas automatiser d'extraction massive ni contourner leurs limites.

## Règles

- Utiliser le compte de l'utilisateur déjà connecté.
- Utiliser le mode demander avant d'agir.
- Extraire uniquement références, titres, auteurs, dates, liens et courts extraits utiles.
- Ne pas télécharger en masse.
- Ne pas copier de longs contenus.
- Envoyer les sources primaires citées vers `hacienda-sources-officielles`.
- Respecter les conditions d'utilisation de Doctrine et ne pas contourner les limitations d'accès.
- Toute source non consultée directement reste marquée `[à vérifier]`.
- La validation humaine est requise avant reprise dans une consultation.
- Conserver un dossier de preuve avec base, auteur, date, référence et extrait.
