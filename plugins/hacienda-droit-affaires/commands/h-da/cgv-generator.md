---
description: >
  Génère des CGV (B2B, Code de commerce) ou des CGU/CGV (B2C, Code de la
  consommation) sous forme de brouillon assisté : chaque clause appelant un
  arbitrage est taguée [review]. Détecte le régime à l'intake et applique le
  cadre correspondant. Ne produit jamais un document prêt à publier. Brouillon
  soumis à validation humaine (avocat).
argument-hint: "[B2B/B2C, secteur, canal, clauses à générer ou réviser]"
---

Use the `cgv-generator` skill with these arguments:

$ARGUMENTS

Delegate all legal workflow, source-verification, PII, and validation-human guardrails to the skill. Do not duplicate or reinterpret the business logic in this command wrapper.
