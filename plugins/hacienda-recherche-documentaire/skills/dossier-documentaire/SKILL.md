---
name: dossier-documentaire
description: Produit le dossier documentaire Hacienda à partir des sources éditoriales et officielles vérifiées.
argument-hint: "<résultats consolidés>"
version: "2.0.0"
---

# Dossier Documentaire Hacienda

## Outils MCP à privilégier

Ce plugin ne contient pas de serveur MCP propre. Pour vérifier une source primaire, appeler les outils du socle `Hacienda Sources Officielles` par leur nom exact ; une référence éditoriale non recoupée reste `[à vérifier]`.

- Socle officiel : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Sources spécialisées utiles selon le dossier : `bofip_rechercher`, `bofip_consulter`, `boss_recherche`, `boss_get_document`, `inpi_search_marques`, `inpi_search_brevets`, `bodacc_by_siren`, `company_full_profile`.
- Les bases Doctrine, Lefebvre Dalloz, Lexis, Lextenso et assimilées restent consultées sous accès utilisateur autorisé ; ne pas automatiser d'extraction massive ni contourner leurs limites.

## Format Imposé

```markdown
# Dossier Documentaire Hacienda

## Question
## Hypothèses
## Sources Internes Anno
## Sources Officielles Vérifiées
## Résultats Doctrine
## Résultats Lexis
## Résultats Lefebvre Dalloz
## Résultats Lextenso
## Convergences
## Divergences
## Sources Primaires Confirmées
## Sources À Relire Manuellement
## Pistes D'Argumentation
## Angles Morts
```

## Garde-Fous

- La section Sources Internes Anno est optionnelle et seulement disponible dans la distribution Hacienda + Anno Desktop.
- Avant d'utiliser des passages Anno : `anno_health`, puis `detect` ou gestion PII Anno équivalente.
- Utiliser `legal_search` et `legal_graph_query` seulement sur un corpus client déjà ingéré.
- Utiliser `legal_rehydrate_citation` uniquement pour une sortie locale destinée à l'utilisateur autorisé.
- Ne jamais présenter un passage Anno comme source officielle ou source primaire.
- Séparer les sources éditoriales et sources officielles vérifiées.
- Ne jamais transformer un commentaire doctrinal en source primaire.
- Indiquer les sources à relire manuellement.
- Conserver les hypothèses et angles morts visibles.
- Toute source non consultée directement reste marquée `[à vérifier]`.
- La validation humaine est requise avant intégration dans une consultation.
- Conserver un dossier de preuve avec provenance, date de consultation et statut.
