---
description: >
  Detection PII pre-flight pour tout skill traitant un document utilisateur.
  Compte les identifiants (categorie A) et alerte au seuil B sur les categories
  sensibles (IBAN, NIR, ID, sante, montants > 10kEUR). Propose l'installation de
  hacienda-ghost si non installe. Politique configurable au cold-start :
  passive / active (defaut, = B+A) / strict.
argument-hint: "[texte, dossier ou chemin à contrôler]"
---

Use the `check-pii` skill with these arguments:

$ARGUMENTS

Delegate all legal workflow, source-verification, PII, and validation-human guardrails to the skill. Do not duplicate or reinterpret the business logic in this command wrapper.
