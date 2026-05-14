---
name: verifier-citation
description: Vérifier une citation juridique française contre une source officielle avant de l'utiliser dans un livrable.
argument-hint: "<citation libre> [--date YYYY-MM-DD]"
---

# Vérifier Une Citation

## Objectif

Transformer une citation libre en référence exploitable et traçable. La sortie ne
doit jamais présenter la citation comme vérifiée si la source primaire n'a pas
été consultée pendant la session.

## Sources Prioritaires

1. Légifrance pour codes, articles, textes LODA, JORF, circulaires, KALI et
   jurisprudence officielle.
2. BOFiP pour doctrine fiscale.
3. Document fourni par l'utilisateur si la source officielle est inaccessible.
4. Base documentaire professionnelle seulement comme aide de repérage.

## Procédure

1. Identifier le type de citation : article, texte, décision, BOFiP, convention
   collective, circulaire ou référence ambiguë.
2. Interroger le tool Hacienda le plus précis disponible.
3. Comparer la référence demandée avec la source récupérée.
4. Vérifier la version applicable à la date demandée ou à la date du jour.
5. Marquer explicitement les incertitudes : référence incomplète, homonymie,
   version abrogée, source non trouvée ou source secondaire uniquement.

## Format De Sortie

```markdown
## Vérification De Citation

**Citation demandée :** ...
**Statut :** vérifié | à vérifier | ambigu | source secondaire uniquement | non trouvé
**Source officielle :** ...
**Identifiant :** ...
**Version/date :** ...
**Lien :** ...

## Dossier De Preuve

| Source | Référence | Identifiant | Version/date | Consultation | Outil | Statut |
|---|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... | ... |
```

## Garde-Fous

- Ne pas inventer d'identifiant Légifrance, BOFiP ou JORF.
- Si le tool n'a pas consulté la source, utiliser `à vérifier`.
- Si une base éditoriale a aidé à repérer la source, la citer comme source
  secondaire, pas comme preuve primaire.
- Pour un livrable avocat, signaler les points nécessitant jugement juridique
  avec `[revue]`.
