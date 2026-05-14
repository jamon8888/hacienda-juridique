---
name: dossier-preuve
description: Constituer une annexe de sources vérifiées pour une note, consultation, mémo, audit ou conclusion.
argument-hint: "<liste de sources consultées>"
---

# Dossier De Preuve

## Objectif

Produire une annexe de preuve normalisée qui indique exactement quelles sources
ont été consultées, avec quelle version et quel statut de vérification.

## Entrées Attendues

- Liste de sources consultées pendant le travail.
- Références libres extraites d'un livrable.
- Résultats des tools `hacienda-sources-officielles`.
- Date de consultation ou date d'application demandée.

## Procédure

1. Regrouper les sources par autorité : Légifrance, BOFiP, JORF, KALI,
   jurisprudence, document utilisateur, base documentaire.
2. Dédupliquer les références identiques.
3. Conserver la date de consultation réelle, même si la donnée vient d'un cache.
4. Affecter un statut parmi les statuts autorisés.
5. Ajouter une section "Sources Restant À Vérifier" si une source n'a pas été
   consultée sur source primaire.

## Statuts Autorisés

- `vérifié`
- `à vérifier`
- `ambigu`
- `source secondaire uniquement`
- `non trouvé`

## Format De Sortie

```markdown
## Dossier De Preuve

| Source | Référence | Identifiant | Version/date | Consultation | Outil | Statut |
|---|---|---|---|---|---|---|
| Légifrance | art. 1240 C. civ. | LEGIARTI... | en vigueur au ... | ... | legifrance_get_article | vérifié |

## Sources Restant À Vérifier

- ...
```

## Garde-Fous

- Ne jamais convertir une source secondaire en source officielle.
- Ne pas supprimer les lignes `à vérifier`; elles sont utiles au relecteur.
- Toute source sans identifiant officiel doit rester prudente.
