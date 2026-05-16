---
name: portefeuille-pi
description: Maintient le registre portefeuille PI, statuts et echeances.
argument-hint: "[list | add | due | export]"
---

> **⚠️ Skill en format v0.1.** Ce skill produit des sorties de qualité limitée
> par rapport au standard V1 (style Anthropic ip-legal). Pour une recherche
> d'antériorité marque de qualité Harvey-grade, utiliser
> `/hacienda-propriete-intellectuelle:recherche-anteriorite-marque`.
> Migration de ce skill prévue en V1.1.

# Portefeuille PI

## Objectif

Centraliser actifs, depots, classes, pays, deadlines, preuves et responsables.

## Workflow

1. Lire registre existant.
2. Normaliser actifs et statuts.
3. Verifier ou taguer `[a verifier]` les numeros et echeances.
4. Identifier renouvellements et actions.
5. Ne jamais supprimer un actif sans validation humaine.

## Sortie

Registre, calendrier, gaps, source officielle, Note de revue et dossier de preuve.
