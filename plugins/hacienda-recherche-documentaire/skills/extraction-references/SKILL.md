---
name: extraction-references
description: Extrait uniquement les métadonnées utiles d'une base documentaire, sans copie longue de contenu protégé.
argument-hint: "<résultat ou page consultée>"
---

# Extraction Des Références

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
