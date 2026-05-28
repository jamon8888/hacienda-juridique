---
name: entretien-demarrage
description: Configure les plateformes de recherche documentaire et les règles de sécurité du cabinet.
argument-hint: "[optionnel: --reconfigurer]"
version: "2.0.0"
---

# Entretien De Démarrage

## Outils MCP à privilégier

Ce plugin ne contient pas de serveur MCP propre. Pour vérifier une source primaire, appeler les outils du socle `Hacienda Sources Officielles` par leur nom exact ; une référence éditoriale non recoupée reste `[à vérifier]`.

- Socle officiel : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Sources spécialisées utiles selon le dossier : `bofip_rechercher`, `bofip_consulter`, `boss_recherche`, `boss_get_document`, `inpi_search_marques`, `inpi_search_brevets`, `bodacc_by_siren`, `company_full_profile`.
- Les bases Doctrine, Lefebvre Dalloz, Lexis, Lextenso et assimilées restent consultées sous accès utilisateur autorisé ; ne pas automatiser d'extraction massive ni contourner leurs limites.

## Questions

1. Quelles bases utilisez-vous : Doctrine, Lefebvre Dalloz, Lexis, Lextenso, Lexbase, Dalloz, Navis, Elnet, Lamyline ?
2. Le cabinet autorise-t-il Claude dans Chrome sur ces domaines ?
3. Le cabinet autorise-t-il l'upload de pièces client dans ces plateformes ?
4. Quels types de contenus peuvent être cités : références uniquement, courts extraits, liens internes ?
5. Quel niveau de validation humaine est requis avant d'utiliser une source éditoriale dans un livrable ?
6. Le cabinet utilise-t-il la distribution Hacienda + Anno Desktop pour un RAG local de dossier client ?
7. Si oui, qui peut demander `legal_ingest` et sur quels dossiers locaux ?
8. Quelle règle de validation humaine s'applique avant `rehydrate` ou `legal_rehydrate_citation` ?

## Sortie

Écrire le profil dans :

```text
~/.claude/plugins/config/hacienda-juridique/hacienda-recherche-documentaire/CLAUDE.md
```

Le profil doit préciser les règles de validation humaine, les bases autorisées,
les limites de citation, le dossier de preuve attendu et, si Anno est activé,
les règles d'usage de `anno_health`, `detect`, `legal_ingest`, `legal_search`,
`legal_graph_query` et `legal_rehydrate_citation`. Toute source non consultée
directement reste marquée `[à vérifier]`.
