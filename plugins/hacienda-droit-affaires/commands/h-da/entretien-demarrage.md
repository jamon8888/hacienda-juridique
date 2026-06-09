---
description: >
  Onboarding du plugin droit des affaires : configure le profil cabinet (side
  principal M&A / procédures collectives / mixte), vérifie les connexions aux
  sources externes (Légifrance, Pappers, BODACC, Judilibre), réutilise un
  profil cabinet partagé s'il existe à ~/.claude/plugins/config/hacienda-juridique/company-profile.md.
  Mode --check-integrations pour relancer uniquement le diagnostic.
argument-hint: "[--redo ou --check-integrations]"
---

Use the `entretien-demarrage` skill with these arguments:

$ARGUMENTS

Delegate all legal workflow, source-verification, PII, and validation-human guardrails to the skill. Do not duplicate or reinterpret the business logic in this command wrapper.
