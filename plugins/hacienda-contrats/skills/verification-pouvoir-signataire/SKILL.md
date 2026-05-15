---
name: verification-pouvoir-signataire
description: Verifie l'identite du cocontractant, les dirigeants et les pouvoirs apparents du signataire avec Pappers optionnel.
argument-hint: "<contrat, societe, signataire>"
---

# Verification Pouvoir Signataire

## Objectif

Preparer une verification des pouvoirs avant signature d'un contrat d'affaires.

## Sources Et Connecteurs

- Pappers MCP si `PAPPERS_API_KEY` est configure.
- `hacienda-sources-officielles` pour les textes, jurisprudences et sources normatives.
- Pieces du dossier : contrat, Kbis, statuts, PV, delegation, mandat, pouvoir special.
- Doctrine commune : `docs/integrations/pappers-agents-skills.md`.

## Statuts Operationnels

- `missing_key` : cle absente, controle manuel par pieces.
- `tools_visible` : decouverte MCP OK, appels metier non encore valides.
- `credits_insufficient` : credits absents, ne pas conclure sur les donnees manquantes.
- `needs_official_recoupement` : signal Pappers a recouper avec pieces ou sources officielles.
- `validated` : pouvoirs recoupes et validation humaine documentee.

## Workflow

1. Identifier la societe par SIREN/SIRET ou `sirenisateur`.
2. Lire `informations-entreprise` pour `representants`, `siege`, `forme_juridique`, `statut_rcs`, `procedures_collectives`.
3. Utiliser `recherche-dirigeants` si le signataire n'apparait pas clairement dans la fiche.
4. Classer le statut operationnel.
5. Recouper avec statuts, delegation, pouvoir, Kbis, PV ou extrait fourni.
6. Verifier les textes applicables via `hacienda-sources-officielles` si la capacite ou la representation depend d'une regle juridique.

## Garde-Fous

- Ne jamais conclure que le signataire a pouvoir sans piece ou source recoupee.
- Marquer `[a verifier]` si Pappers, Kbis, statuts ou delegation manquent.
- PPE, sanctions et scoring uniquement sur demande explicite.
- Toute signature ou acceptation de pouvoir exige validation humaine.

## Dossier De Preuve

Conserver un dossier de preuve : contrat, societe, signataire, tools Pappers, champs lus, statut operationnel, pieces recoupees, sources officielles, ecarts, limites et valideur humain.

## Livrable

Memo pouvoirs avec faits lus, pieces recoupees, points bloquants, incertitudes, statut et validation humaine.
