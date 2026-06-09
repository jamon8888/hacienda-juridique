---
description: >
  Extraction structurée de N documents en parallèle vers un tableau, colonnes
  paramétrables. Brique atomique : remplace la revue manuelle "10 NDA à
  passer en revue". Réutilisée comme building block par
  due-diligence-dataroom (v1.1). Exemple : extraire durée + non-conc + loi
  + juridiction sur 12 NDA d'un coup.
argument-hint: "[documents, colonnes à extraire, format de sortie]"
---

Use the `revue-tabulaire` skill with these arguments:

$ARGUMENTS

Delegate all legal workflow, source-verification, PII, and validation-human guardrails to the skill. Do not duplicate or reinterpret the business logic in this command wrapper.
