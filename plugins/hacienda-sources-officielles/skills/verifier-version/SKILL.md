---
name: verifier-version
description: Vérifier la version applicable d'un texte, article, BOFiP ou identifiant officiel à une date donnée.
argument-hint: "<référence ou identifiant> [--date YYYY-MM-DD]"
---

# Vérifier Une Version

## Objectif

Déterminer si une référence était en vigueur, modifiée, abrogée ou incertaine à
la date pertinente pour le dossier.

## Procédure

1. Identifier la source et l'identifiant.
2. Déterminer la date d'application demandée. À défaut, utiliser la date du jour
   et l'indiquer.
3. Interroger la source officielle appropriée.
4. Comparer les dates de début, fin, modification, abrogation ou publication.
5. Signaler les versions concurrentes ou lacunes de consolidation.

## Format De Sortie

```markdown
## Vérification De Version

**Référence :** ...
**Date contrôlée :** ...
**Statut :** en vigueur | modifié | abrogé | incertain | non trouvé
**Version applicable :** ...
**Période de validité :** ...
**Avertissement :** ...

## Dossier De Preuve

| Source | Référence | Identifiant | Version/date | Consultation | Outil | Statut |
|---|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... | ... |
```

## Garde-Fous

- Une version "en vigueur aujourd'hui" ne prouve pas la version applicable à une
  date passée.
- Une date de publication, une date d'entrée en vigueur et une date de
  consolidation ne sont pas interchangeables.
- Si la source officielle ne permet pas de conclure, écrire `incertain`.
