---
name: controle-copyright
description: Vérifie qu'une recherche documentaire respecte les droits éditeurs, accès autorisés et limites d'extraction.
argument-hint: "<plan ou résultat de recherche>"
version: "2.0.0"
---

# Contrôle Copyright Et Accès

## Outils MCP à privilégier

Ce plugin ne contient pas de serveur MCP propre. Pour vérifier une source primaire, appeler les outils du socle `Hacienda Sources Officielles` par leur nom exact ; une référence éditoriale non recoupée reste `[à vérifier]`.

- Socle officiel : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Sources spécialisées utiles selon le dossier : `bofip_rechercher`, `bofip_consulter`, `boss_recherche`, `boss_get_document`, `inpi_search_marques`, `inpi_search_brevets`, `bodacc_by_siren`, `company_full_profile`.
- Les bases Doctrine, Lefebvre Dalloz, Lexis, Lextenso et assimilées restent consultées sous accès utilisateur autorisé ; ne pas automatiser d'extraction massive ni contourner leurs limites.

## Interdictions Exactes

```text
pas de contournement de paywall
pas de contournement de CAPTCHA
pas de copie longue
pas de stockage d'identifiants
pas de scraping massif
pas d'API privée non autorisée
```

## Décision

- Autoriser : recherche manuelle, extraction de références, courts extraits nécessaires.
- Demander validation : upload de pièces client, navigation Chrome, réutilisation d'un extrait.
- Refuser : contournement, extraction massive, stockage d'identifiants, copie longue.

## Sortie

Classer chaque action en `autorisé`, `validation requise` ou `refusé`, avec la raison.

## Garde-Fous

- Toute source non consultée directement reste marquée `[à vérifier]`.
- Ne pas reproduire de longs extraits protégés sans base légale ou autorisation.
- La validation humaine est requise avant publication ou transmission client.
- Conserver un dossier de preuve avec source, licence, date et justification d'usage.
