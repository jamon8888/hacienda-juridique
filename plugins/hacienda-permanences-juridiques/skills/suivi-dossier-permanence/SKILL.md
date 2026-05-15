---
name: suivi-dossier-permanence
description: Suit statut, actions, delais, handoffs et prochaines relances.
argument-hint: "[dossier | update | tableau]"
---

# Suivi Dossier Permanence

## Objectif

Maintenir une vue simple des dossiers ouverts, actions, delais, superviseur et handoffs.

## Workflow

1. Lire dossier et historique.
2. Ajouter evenement sans supprimer l'historique.
3. Mettre a jour delais et prochaines actions.
4. Escalader retard ou urgence.
5. Documenter validation humaine et dossier de preuve.

## Sortie

Statut, relances, delais, points `[a verifier]`, Note de revue et Mode silencieux.
