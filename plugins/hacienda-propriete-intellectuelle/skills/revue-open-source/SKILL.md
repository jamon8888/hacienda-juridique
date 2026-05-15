---
name: revue-open-source
description: Controle les obligations de licences open source et risques de compatibilite.
argument-hint: "[repo | SBOM | package-list]"
---

# Revue Open Source

## Objectif

Analyser dependances, licences, copyleft, attribution, distribution, SaaS et obligations internes.

## Workflow

1. Lire SBOM ou liste packages.
2. Identifier licences et usages.
3. Distinguer build, runtime, distribution et SaaS.
4. Marquer informations package non verifiees `[a verifier]`.
5. Escalader copyleft fort, licence inconnue ou conflit politique.

## Sortie

Rapport OSS, actions engineering, source officielle quand disponible, validation humaine, Note de revue et dossier de preuve.
