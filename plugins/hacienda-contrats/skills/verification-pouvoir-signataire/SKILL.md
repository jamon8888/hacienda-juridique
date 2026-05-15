---
name: verification-pouvoir-signataire
description: Verifie l'identite du cocontractant, les dirigeants et les pouvoirs apparents du signataire avec Pappers optionnel.
argument-hint: "<contrat, societe, signataire>"
---

# Verification Pouvoir Signataire

## Objectif

Preparer une verification des pouvoirs avant signature d'un contrat d'affaires.

## Workflow

1. Identifier la societe par SIREN/SIRET ou `sirenisateur`.
2. Lire `informations-entreprise` pour `representants`, `siege`, `forme_juridique`, `statut_rcs`, `procedures_collectives`.
3. Utiliser `recherche-dirigeants` si le signataire n'apparait pas clairement dans la fiche.
4. Recouper avec statuts, delegation, pouvoir, Kbis, PV ou extrait fourni.
5. Verifier les textes applicables via `hacienda-sources-officielles` si la capacite ou la representation depend d'une regle juridique.

## Garde-Fous

- Ne jamais conclure que le signataire a pouvoir sans piece ou source recoupee.
- Marquer `[a verifier]` si Pappers, Kbis, statuts ou delegation manquent.
- PPE, sanctions et scoring uniquement sur demande explicite.

## Livrable

Memo pouvoirs avec faits lus, pieces recoupees, points bloquants, incertitudes et validation humaine.
