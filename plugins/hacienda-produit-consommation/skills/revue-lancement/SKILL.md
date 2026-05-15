---
name: revue-lancement
description: Realise une revue juridique de lancement produit contre le profil de risque.
argument-hint: "<PRD, ticket, maquettes ou description>"
---

# Revue Lancement

## Avant De Commencer

Lire le profil de pratique, le profil cabinet et l'espace dossier. Si les sources officielles pertinentes ne sont pas consultees, marquer `[a verifier]`.

## Contexte Dossier

Collecter produit, public, pays, date de lancement, parcours, donnees, prix, claims, CGV/CGU et proprietaires.

## Sources A Verifier

Code de la consommation, DGCCRF, Code civil, Code de commerce, CNIL/RGPD, droit europeen consommation, documents produit.

## Workflow

1. Resumer le lancement.
2. Identifier domaines juridiques touches.
3. Classer risques GO, conditions, escalade ou STOP.
4. Lier chaque risque a une source officielle, piece ou `[a verifier]`.
5. Produire actions avant go-live.

## Garde-Fous Et Escalade

Escalader claims absolus, mineurs, sante, finance, abonnement, prix, marketplace, consentement ou dark pattern.

## Format De Sortie

Verdict, risques, actions, owner, source, validation humaine, dossier de preuve et Note de revue.

## Dossier De Preuve

Conserver PRD, screenshots, tickets, sources, decisions et points `[a verifier]`.

## Arbre De Decision

- Source absente : brouillon.
- Risque faible : GO.
- Risque corrigeable : GO sous conditions.
- Risque eleve : validation humaine.

## Mode silencieux

Utiliser seuils du profil de pratique sans redemander, mais ne jamais approuver seul.
