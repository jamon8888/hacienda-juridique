---
description: >
  Rédige une déclaration de créance art. L.622-24 C.com. dans le cadre d'une
  procédure collective (sauvegarde, redressement, liquidation). Calcule
  automatiquement la date de forclusion (2 mois post-publication BODACC,
  4 mois si créancier hors UE/EEE). Lookup BODACC via
  `bodacc_procedures` de `@hacienda/core` pour récupérer
  type de procédure, date jugement, date publication et mandataire désigné
  (extraction depuis `raw`, fallback `[à vérifier]` si parsing échoue).
  Format conforme aux usages mandataire judiciaire. Brouillon, validation
  avocat/mandataire obligatoire.
argument-hint: "[SIREN débiteur, créance, jugement, publication BODACC ; --releve-forclusion pour la requête L.622-26]"
---

Use the `declaration-creance` skill with these arguments:

$ARGUMENTS

Delegate all legal workflow, source-verification, PII, and validation-human guardrails to the skill. Do not duplicate or reinterpret the business logic in this command wrapper.
