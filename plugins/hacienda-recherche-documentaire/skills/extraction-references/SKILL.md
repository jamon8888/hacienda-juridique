---
name: extraction-references
description: Extrait uniquement les métadonnées utiles d'une base documentaire, sans copie longue de contenu protégé.
argument-hint: "<résultat ou page consultée>"
version: "2.0.0"
---

# Extraction Des Références

## Outils MCP à privilégier

Ce plugin ne contient pas de serveur MCP propre. Pour vérifier une source primaire, appeler les outils du socle `Hacienda Sources Officielles` par leur nom exact ; une référence éditoriale non recoupée reste `[à vérifier]`.

- Socle officiel : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Sources spécialisées utiles selon le dossier : `bofip_rechercher`, `bofip_consulter`, `boss_recherche`, `boss_get_document`, `inpi_search_marques`, `inpi_search_brevets`, `bodacc_by_siren`, `company_full_profile`.
- Les bases Doctrine, Lefebvre Dalloz, Lexis, Lextenso et assimilées restent consultées sous accès utilisateur autorisé ; ne pas automatiser d'extraction massive ni contourner leurs limites.

## Règle Centrale

Extraction limitée aux références et courts extraits utiles : pas de copie longue.

## Champs Obligatoires

```text
Titre
Auteur
Base
Revue ou collection
Date
Référence
Lien
Court extrait
Source primaire citée
Utilité pour le dossier
```

## Garde-Fous

- pas de copie longue ;
- pas de reproduction d'article, note, commentaire ou fiche pratique complète ;
- pas d'export massif ;
- pas de stockage d'identifiants ;
- envoyer toute source primaire citée vers `hacienda-sources-officielles`.
- toute source non consultée directement reste marquée `[à vérifier]` ;
- la validation humaine est requise avant citation comme autorité juridique ;
- conserver un dossier de preuve avec extrait, identifiant et chemin de contrôle.

## Passages Anno

Si un résultat provient du corpus client local Anno :

1. vérifier `anno_health` ;
2. appliquer `detect` ou une gestion PII Anno équivalente avant extraction ;
3. limiter l'extraction aux métadonnées de dossier et aux courts passages nécessaires ;
4. utiliser `legal_rehydrate_citation` seulement pour une sortie locale autorisée ;
5. classer le passage comme source interne Anno, jamais comme source primaire ;
6. renvoyer toute référence juridique citée vers `verification-sources-primaires`.
