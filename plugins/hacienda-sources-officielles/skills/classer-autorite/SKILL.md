---
name: classer-autorite
description: Classer une référence selon sa nature et sa force probatoire dans une analyse juridique française.
argument-hint: "<référence juridique>"
---

# Classer Une Autorité

## Objectif

Qualifier une référence pour éviter de mélanger texte contraignant, doctrine
administrative, jurisprudence, source éditoriale et document de travail.

## Catégories

- Constitution, bloc de constitutionnalité.
- Loi, ordonnance, code.
- Règlement : décret, arrêté, instruction publiée.
- Jurisprudence.
- Doctrine administrative : BOFiP, circulaire, rescrit publié.
- Convention collective ou accord collectif.
- Autorité administrative : CNIL, AMF, ACPR, autorité sectorielle.
- Source éditoriale ou base documentaire.
- Document utilisateur.

## Procédure

1. Identifier la nature de la référence.
2. Vérifier si une source officielle existe.
3. Classer la force de la référence : contraignante, persuasive, administrative,
   documentaire ou factuelle.
4. Indiquer comment elle peut être utilisée dans un livrable.
5. Ajouter une ligne au dossier de preuve si la source a été consultée.

## Format De Sortie

```markdown
## Classement D'Autorité

**Référence :** ...
**Catégorie :** ...
**Force :** contraignante | persuasive | administrative | documentaire | factuelle | à vérifier
**Usage recommandé :** ...
**Limites :** ...

## Dossier De Preuve

| Source | Référence | Identifiant | Version/date | Consultation | Outil | Statut |
|---|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... | ... |
```

## Garde-Fous

- Une source éditoriale peut expliquer le droit, mais ne remplace pas le texte,
  l'arrêt ou la doctrine officielle citée.
- Une décision isolée ne doit pas être présentée comme jurisprudence constante
  sans vérification.
- Une doctrine administrative peut être opposable dans certaines conditions,
  mais ce point doit être analysé au cas par cas.
