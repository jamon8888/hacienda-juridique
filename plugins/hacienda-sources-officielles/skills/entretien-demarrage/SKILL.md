---
name: entretien-demarrage
description: Configure le profil de pratique Hacienda pour ce plugin.
argument-hint: "[optionnel: --reconfigurer]"
version: "2.0.0"
---

# Entretien De Démarrage

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Sources Officielles` est disponible. Une source officielle non consultée directement reste `[à vérifier]`.

- Statut et administration PISTE : `piste_status`, `piste_cache_clear`.
- Légifrance / JORF / KALI : `legifrance_recherche`, `legifrance_rechercher`, `legifrance_get_article`, `legifrance_get_code`, `legifrance_get_loda`, `legifrance_get_jurisprudence`, `legifrance_get_jorf`, `legifrance_get_circulaire`, `legifrance_suggest`, `legifrance_api_call`.
- Jurisprudence, UE, fiscal et social : `judilibre_status`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`, `bofip_rechercher`, `bofip_consulter`, `boss_recherche`, `boss_get_document`.
- Registres spécialisés exposés par le socle : `inpi_search_marques`, `inpi_marque_details`, `inpi_search_brevets`, `inpi_brevet_details`, `espacenet_search`, `espacenet_brevet_details`, `bodacc_by_siren`, `bodacc_procedures`, `company_full_profile`.

## But

Créer ou mettre à jour le profil de pratique dans `~/.claude/plugins/config/hacienda-juridique/hacienda-sources-officielles/CLAUDE.md`.

## Questions

1. Quel est votre rôle : avocat, juriste, expert-comptable, fiscaliste, autre professionnel ?
2. Quel type de structure utilisez-vous : cabinet, direction juridique, cabinet comptable, institution, autre ?
3. Quels livrables voulez-vous produire avec ce plugin ?
4. Quelles sources ou bases documentaires utilisez-vous déjà ?
5. Quel niveau de risque impose une validation humaine avant sortie ?
6. Où doivent être conservés les dossiers de preuve ?
7. Quelles integrations sont disponibles, configurees ou verifiees ?
8. La distribution Hacienda + Anno Desktop est-elle active pour relier le
   contexte local des dossiers aux recherches officielles ?

## Integrations

Appliquer la logique simple de `docs/integrations/mcp-configuration-simple.md` :

- `.mcp.json` signifie disponible, pas connecte.
- `piste_status` doit reussir avant de marquer `Hacienda Sources Officielles` connecte.
- Si un connecteur ne peut pas etre teste, marquer `configure but not verified`.
- Si PISTE ou une source officielle manque, les citations restent `[à vérifier]`.

## Mode Anno Desktop Optionnel

Si Anno Desktop est disponible, documenter seulement son usage de contexte local.
Il ne valide jamais une citation juridique.

Règles à écrire dans le profil :

- appeler `anno_health` avant tout outil Anno ;
- appeler `detect` ou appliquer une gestion PII Anno équivalente avant toute
  pièce client ;
- utiliser `legal_search` et `legal_graph_query` seulement sur un corpus déjà
  ingéré et autorisé ;
- en cas d'indisponibilité, poursuivre en mode Hacienda ;
- classer tout passage Anno comme source interne Anno, jamais comme source primaire.

La vérification juridique reste faite par `hacienda-sources-officielles`.

## Sortie

Créer un profil complet sans marqueur `[A CONFIGURER]`, avec une section `Available integrations` indiquant `connected`, `configured but not verified` ou `not configured`.
