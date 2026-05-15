---
name: registre-gaps
description: Maintient le registre des gaps reglementaires ouverts et clos.
argument-hint: "[ouvrir | lister | fermer | exporter]"
---

# Registre Gaps

## Objectif

Centraliser les gaps avec source officielle, decision, owner, deadline, preuve et statut de validation humaine.

## Workflow

1. Lire le registre existant.
2. Normaliser severite, source, owner, deadline et statut.
3. Ajouter ou mettre a jour les gaps.
4. Ne jamais clore un gap sans preuve et validation humaine.
5. Produire une vue dashboard si la liste est volumineuse.

## Sortie

Registre, deltas, points `[a verifier]`, Note de revue, dossier de preuve et Arbre de decision.
