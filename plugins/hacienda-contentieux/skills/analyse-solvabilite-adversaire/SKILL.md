---
name: analyse-solvabilite-adversaire
description: Analyse solvabilite, procedures collectives, groupe et actifs d'une partie adverse avec Pappers optionnel.
argument-hint: "<partie adverse ou SIREN>"
---

# Analyse Solvabilite Adversaire

## Objectif

Evaluer l'interet economique et les risques d'un contentieux, recouvrement, mesure conservatoire ou transaction.

## Workflow

1. Identifier la partie par SIREN/SIRET.
2. Lire `informations-entreprise` pour statut, siege, procedures collectives et BODACC.
3. Lire `comptes-entreprise` pour chiffre d'affaires, resultat, capitaux propres et ratios disponibles.
4. Lire `cartographie-entreprise` pour groupe, dirigeants, filiales et beneficiaires.
5. Utiliser `recherche-parcelles` si actifs immobiliers ou suretes sont pertinents.
6. Utiliser `recherche-decisions-justice` seulement comme signal, puis recouper toute decision normative via `hacienda-sources-officielles`.

## Garde-Fous

- Scoring et sanctions exigent demande explicite.
- Donnees Pappers non recoupees restent `[a verifier]`.
- Ne pas presenter une strategie contentieuse comme decision finale sans validation humaine.

## Livrable

Note adverse party litigation avec solvabilite, actifs, procedures, groupe, sources, limites et recommandations a valider.
