---
name: personnaliser-plugin-cowork
description: Personnalise un plugin Cowork pour un cabinet ou une direction juridique.
argument-hint: "<plugin a personnaliser>"
---

# Personnaliser Plugin Cowork

## Avant De Commencer

Lire le profil de pratique et le plugin cible. Ne pas renommer le plugin, ses skills ou ses fichiers sauf demande explicite.

## Contexte Dossier

Identifier organisation, outils, workflows, sources, roles, validation humaine, sorties attendues et restrictions de donnees.

## Sources A Verifier

- plugin source ;
- placeholders ou zones de configuration ;
- `.mcp.json` ;
- README et skills ;
- references du skill Hacienda `cowork-plugin-customizer`.

## Workflow

1. Localiser le plugin.
2. Lire manifests, README, skills et MCP.
3. Identifier personnalisations utiles.
4. Recueillir informations manquantes.
5. Modifier seulement le scope demande.
6. Auditer les changements.
7. Produire pack de validation.

## Garde-Fous Et Escalade

Escalader pour tout changement de connecteur, secret, destination externe, script, hook ou permission.

## Format De Sortie

Lister ce qui a ete appris, modifie, laisse `[a verifier]`, et ce qui attend validation humaine.

## Dossier De Preuve

Conserver diff, sources, decisions, fichiers modifies et Note de revue.

## Arbre De Decision

- Plugin introuvable : arreter.
- Scope precis : modifier seulement ce scope.
- Scope general : proposer options avant modification.
- MCP sensible : audit MCP.

## Mode silencieux

Utiliser le profil et les documents disponibles avant de poser des questions.
