---
name: revue-clause-pi
description: Relit clauses de propriete intellectuelle dans contrats, licences, MSA, SOW ou cessions.
argument-hint: "[contrat | clause]"
---

> **⚠️ Skill en format v0.1.** Ce skill produit des sorties de qualité limitée
> par rapport au standard V1 (style Anthropic ip-legal). Pour une recherche
> d'antériorité marque de qualité Harvey-grade, utiliser
> `/hacienda-propriete-intellectuelle:recherche-anteriorite-marque`.
> Migration de ce skill prévue en V1.1.

# Revue Clause PI

## Objectif

Identifier cessions, licences, restrictions, indemnites, garanties, OSS, donnees, livrables et exceptions.

## Workflow

1. Lire contrat et contexte commercial.
2. Relever chaines de titularite et droits concedes.
3. Comparer avec la position du profil.
4. Marquer `[review]` les choix de nego.
5. Demander validation humaine avant redline finale.

## Sortie

Tableau clauses, risques, redlines proposees, points `[a verifier]`, Note de revue et dossier de preuve.
