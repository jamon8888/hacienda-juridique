---
description: >
  Post-flight de validation juridique. Pour chaque article cite dans une
  sortie skill (art. NNN C.civ, L.NNN-N C.com., etc.), interroge Legifrance
  via packages/core pour verifier existence + version en vigueur +
  non-abrogation. Annote la sortie. Mode degrade si PISTE non configure.
argument-hint: "[sortie ou liste de citations à vérifier]"
---

Use the `verifier-citations` skill with these arguments:

$ARGUMENTS

Delegate all legal workflow, source-verification, PII, and validation-human guardrails to the skill. Do not duplicate or reinterpret the business logic in this command wrapper.
