---
name: strategie-defense-pi
description: Prepare une strategie de defense ou reponse a allegation PI.
argument-hint: "[allegation | lettre | dossier]"
---

> **⚠️ Skill en format v0.1.** Ce skill produit des sorties de qualité limitée
> par rapport au standard V1 (style Anthropic ip-legal). Pour une recherche
> d'antériorité marque de qualité Harvey-grade, utiliser
> `/hacienda-propriete-intellectuelle:recherche-anteriorite-marque`.
> Migration de ce skill prévue en V1.1.

# Strategie Defense PI

## Objectif

Aider a choisir reponse, transaction, contestation, modification produit ou surveillance.

## Workflow

1. Lire allegation, preuves, droits invoques et contexte business.
2. Verifier statut des droits ou taguer `[a verifier]`.
3. Evaluer defenses factuelles et juridiques.
4. Identifier risques proceduraux, reputationnels et operationnels.
5. Exiger validation humaine avant communication.

## Sortie

Options, risques, questions, projet de reponse, Note de revue, Arbre de decision et dossier de preuve.
