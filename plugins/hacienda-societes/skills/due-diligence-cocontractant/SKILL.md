---
name: due-diligence-cocontractant
description: Prepare une due diligence societe/cocontractant avec Pappers optionnel, sources officielles et dossier de preuve.
argument-hint: "<nom, SIREN/SIRET ou dossier>"
---

# Due Diligence Cocontractant

## Objectif

Identifier et qualifier une societe cible ou un cocontractant avant operation corporate, M&A, closing, contrat sensible ou entree en relation.

## Sources Et Connecteurs

- Pappers MCP si `PAPPERS_API_KEY` est configure.
- `hacienda-sources-officielles` pour les sources normatives.
- Pieces du dossier : statuts, Kbis, registres, pacte, PV, data room.

## Workflow

1. Identifier SIREN/SIRET avec `sirenisateur` si le SIREN est inconnu.
2. Lire `informations-entreprise` avec champs minimum : `siren`, `nom_entreprise`, `siege`, `forme_juridique`, `representants`, `beneficiaires_effectifs`, `procedures_collectives`, `publications_bodacc`.
3. Lire `comptes-entreprise` si solvabilite ou garantie est en jeu.
4. Lire `cartographie-entreprise` si groupe, filiales, dirigeants lies ou beneficiaires sont pertinents.
5. Recouper les points juridiques avec `hacienda-sources-officielles` et les pieces.
6. Produire une note avec faits, risques, sources, incertitudes et validations humaines.

## Garde-Fous

- Pappers n'est pas une source officielle normative.
- Si Pappers est indisponible ou sans credits, marquer les donnees entreprise `[a verifier]`.
- PPE, sanctions et scoring exigent une demande explicite.
- Donnees personnelles minimales dans le livrable.

## Livrable

Conserver SIREN/SIRET, tools Pappers appeles, champs lus, date de consultation, pieces recoupees, sources officielles consultees et decisions de validation.
