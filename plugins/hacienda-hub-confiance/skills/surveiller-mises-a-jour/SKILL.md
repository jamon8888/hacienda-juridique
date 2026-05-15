---
name: surveiller-mises-a-jour
description: Compare versions, diffs et risques avant mise a jour d'un plugin ou skill.
argument-hint: "<plugin ou registry>"
---

# Surveiller Mises A Jour

## Avant De Commencer

Lire le profil de pratique et les preferences update. Les mises a jour automatiques sont interdites par defaut.

## Contexte Dossier

Identifier version installee, version candidate, source, changelog, diff, nouveaux MCP, hooks, scripts et skills modifies.

## Sources A Verifier

- tag ou commit installe ;
- tag ou commit candidat ;
- changelog ;
- manifests ;
- fichiers modifies ;
- source officielle si un contenu juridique change.

## Workflow

1. Comparer versions.
2. Lire changelog et diff.
3. Classer changements : docs, skills, MCP, hooks, scripts, licences.
4. Evaluer nouvelles surfaces de risque.
5. Produire recommandation : appliquer, attendre, refuser, demander revue.

## Garde-Fous Et Escalade

Escalader toute modification de MCP, hook, script, permission, licence, source juridique ou comportement d'installation.

## Format De Sortie

Resume diff, risques, fichiers touches, statut `[a verifier]`, validation humaine et Note de revue.

## Dossier De Preuve

Conserver diff, versions, changelog, verdict et decision.

## Arbre De Decision

- Diff introuvable : refuser.
- Changement sensible : audit complet.
- Patch docs simple : validation rapide.
- Risque critique : bloquer.

## Mode silencieux

Utiliser preferences update connues, mais ne jamais appliquer automatiquement.
