---
name: analyse-solvabilite-adversaire
description: Analyse solvabilite, procedures collectives, groupe et actifs d'une partie adverse avec Pappers optionnel.
argument-hint: "<partie adverse ou SIREN>"
---

# Analyse Solvabilite Adversaire

## Objectif

Evaluer l'interet economique et les risques d'un contentieux, recouvrement, mesure conservatoire ou transaction.

## Sources Et Connecteurs

- Pappers MCP si `PAPPERS_API_KEY` est configure.
- `hacienda-sources-officielles` pour les sources normatives et decisions a citer.
- Pieces du dossier : titres, contrats, mises en demeure, decisions, informations client.
- Doctrine commune : `docs/integrations/pappers-agents-skills.md`.

## Statuts Operationnels

- `missing_key` : cle absente, investigation manuelle.
- `tools_visible` : decouverte MCP OK, appels metier non encore valides.
- `credits_insufficient` : credits absents, solvabilite Pappers non exploitable.
- `needs_official_recoupement` : signal Pappers a recouper avant conclusion.
- `validated` : donnees recoupees, dossier de preuve et validation humaine disponibles.

## Workflow

1. Identifier la partie par SIREN/SIRET.
2. Lire `informations-entreprise` pour statut, siege, procedures collectives et BODACC.
3. Lire `comptes-entreprise` pour chiffre d'affaires, resultat, capitaux propres et ratios disponibles.
4. Lire `cartographie-entreprise` pour groupe, dirigeants, filiales et beneficiaires.
5. Utiliser `recherche-parcelles` si actifs immobiliers ou suretes sont pertinents.
6. Classer le statut operationnel.
7. Utiliser `recherche-decisions-justice` seulement comme signal, puis recouper toute decision normative via `hacienda-sources-officielles`.

## Garde-Fous

- Scoring et sanctions exigent demande explicite.
- Donnees Pappers non recoupees restent `[a verifier]`.
- Ne pas presenter une strategie contentieuse comme decision finale sans validation humaine.
- Toute mesure, transaction ou abandon exige validation humaine.

## Dossier De Preuve

Conserver un dossier de preuve : partie, SIREN/SIRET, tools Pappers, champs lus, date, statut operationnel, pieces recoupees, sources officielles, limites et valideur humain.

## Livrable

Note adverse party litigation avec solvabilite, actifs, procedures, groupe, sources, statut, limites, options et recommandations a valider.
