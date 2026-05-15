---
name: diff-reglementaire
description: Compare un changement reglementaire avec une politique ou pratique existante.
argument-hint: "[texte | politique | dossier]"
---

# Diff Reglementaire

## Objectif

Identifier ce qui change entre une source officielle et les politiques internes, puis separer ecart textuel, gap operationnel et choix juridique.

## Workflow

1. Lire le texte source et la politique.
2. Verifier couverture de lecture dans la Note de revue.
3. Construire un tableau obligation / politique actuelle / gap / action.
4. Marquer `[a verifier]` si une source officielle n'a pas ete consultee.
5. Exiger validation humaine avant toute conclusion de conformite.

## Sortie

Diff, severite, owner, deadline, evidence, dossier de preuve et Arbre de decision.
