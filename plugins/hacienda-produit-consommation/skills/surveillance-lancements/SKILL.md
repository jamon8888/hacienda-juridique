---
name: surveillance-lancements
description: Suit les lancements et changements produit susceptibles d'exiger une revue juridique.
argument-hint: "[tracker, periode ou liste de lancements]"
---

# Surveillance Lancements

## Avant De Commencer

Lire le profil de pratique, le tracker et les seuils de risque. Sans tracker connecte, travailler depuis la liste fournie.

## Contexte Dossier

Identifier lancements, dates, owners, pays, claims, prix, donnees, audience et statut revue.

## Sources A Verifier

Tickets, PRD, calendriers, Code de la consommation, DGCCRF, CNIL/RGPD, source officielle si citee.

## Workflow

1. Lister lancements.
2. Filtrer par seuils de revue.
3. Prioriser selon date et severite.
4. Produire alertes.
5. Mettre a jour registre de risque.

## Garde-Fous Et Escalade

Escalader lancement imminent, mineurs, prix, claims, donnees sensibles, marketplace ou changement public.

## Format De Sortie

Table lancement / date / risque / source / action / validation humaine / Note de revue.

## Dossier De Preuve

Conserver tracker, tickets, decisions, sources et `[a verifier]`.

## Arbre De Decision

- Date proche + risque : revue immediate.
- Risque bas : watch list.
- Source absente : demander PRD.

## Mode silencieux

Utiliser tracker et seuils du profil de pratique sans redemander.
