---
name: audit-manifest
description: Audite manifests Claude/Codex, metadata, chemins, branding, licence et packaging.
argument-hint: "<plugin>"
---

# Audit Manifest

## Avant De Commencer

Lire le profil de pratique et identifier le type de plugin : Hacienda, Cowork, Claude Code ou Codex.

## Contexte Dossier

Relever nom, version, auteur, repository, licence, description, chemins skills, hooks, MCP, apps et assets.

## Sources A Verifier

- `.claude-plugin/plugin.json` ;
- `.codex-plugin/plugin.json` ;
- `.claude-plugin/marketplace.json` ;
- README ;
- licence ;
- source officielle si une promesse juridique est faite.

## Workflow

1. Valider nom, version, auteur et branding.
2. Verifier chemins relatifs.
3. Verifier categories, mots-cles et descriptions.
4. Comparer README, manifests et fichiers reels.
5. Identifier references obsoletes ou tiers non autorises.
6. Produire corrections proposees.

## Garde-Fous Et Escalade

Escalader si licence absente, auteur trompeur, source inconnue, plugin masquant MCP/hooks/scripts ou promesse juridique non limitee.

## Format De Sortie

Table champ / constat / risque / correction / statut source / validation humaine.

## Dossier De Preuve

Conserver manifests lus, diff recommande, statut `[a verifier]` et Note de revue.

## Arbre De Decision

- Manifest absent : bloquant.
- Branding incorrect : corriger.
- Chemin faux : corriger avant publication.
- Licence inconnue : bloquer publication.

## Mode silencieux

Appliquer les conventions Hacienda sans redemander si le profil de pratique les contient.
