---
name: generer-pack-publication
description: Prepare le pack de publication d'un plugin Hacienda ou Cowork.
argument-hint: "<plugin>"
---

# Generer Pack Publication

## Avant De Commencer

Lire le profil de pratique, le plugin cible et le standard qualite Hacienda. Aucune publication externe sans validation humaine.

## Contexte Dossier

Identifier public cible, version, changelog, licence, README, manifests, skills, agents, MCP, hooks et tests.

## Sources A Verifier

- plugin complet ;
- standard qualite ;
- resultats de tests ;
- audit manifest ;
- audit MCP ;
- licence ;
- source officielle si promesse juridique.

## Workflow

1. Verifier structure.
2. Verifier branding.
3. Verifier README et premier lancement.
4. Verifier skills et agents.
5. Verifier MCP, hooks, scripts.
6. Compiler dossier de preuve.
7. Produire checklist de release et notes.

## Garde-Fous Et Escalade

Bloquer si test rouge, licence manquante, MCP non audite, source non lue, ancien branding ou promesse de conseil final.

## Format De Sortie

Checklist, risques, statut publication, release notes, points `[a verifier]`, validation humaine et Note de revue.

## Dossier De Preuve

Conserver audits, tests, diff, version, approbateur et artefacts.

## Arbre De Decision

- Test rouge : pas de publication.
- Audit incomplet : completer.
- Risque acceptable : validation humaine.
- Publication approuvee : generer pack.

## Mode silencieux

Utiliser les conventions de publication du profil de pratique, mais ne jamais publier seul.
