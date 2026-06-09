---
description: >
  Génère une issues list (liste de points à négocier) à partir d'une analyse
  de contrat. Appelable directement OU comme composant interne par
  reviser-contrat / gap-review. Format tableau standardisé criticité
  décroissante 🔴 → 🟢, avec position souhaitée et formulation alternative
  pour chaque point.
argument-hint: "[contrat ou analyse source, position client]"
---

Use the `liste-de-points` skill with these arguments:

$ARGUMENTS

Delegate all legal workflow, source-verification, PII, and validation-human guardrails to the skill. Do not duplicate or reinterpret the business logic in this command wrapper.
