---
description: >
  Triage rapide d'un NDA / accord de confidentialité commercial : VERT (OK
  signer), ORANGE (négocier 1-2 points), ROUGE (refuser ou renégocier
  largement). Couvre champ confidentialité, exceptions standard, durée,
  juridiction, et clause de non-concurrence salariée (si présente : vérifie
  contrepartie financière obligatoire selon jurisp soc. 10 juil. 2002). Renvoie
  vers PI:contrats-pi si NDA partenariat R&D PI-centric.
argument-hint: "[NDA, side, contexte, niveau de triage]"
---

Use the `reviser-nda` skill with these arguments:

$ARGUMENTS

Delegate all legal workflow, source-verification, PII, and validation-human guardrails to the skill. Do not duplicate or reinterpret the business logic in this command wrapper.
