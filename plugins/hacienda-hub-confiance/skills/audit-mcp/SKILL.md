---
name: audit-mcp
description: Analyse les connecteurs MCP d'un plugin, leurs scopes, secrets et risques donnees.
argument-hint: "<.mcp.json ou plugin>"
---

# Audit MCP

## Avant De Commencer

Lire le profil de pratique, la politique connecteurs et le fichier MCP cible. Tout secret est masque dans la sortie.

## Contexte Dossier

Identifier les serveurs MCP, leurs categories, commandes, env vars, scopes, donnees accessibles et fallback.

## Sources A Verifier

- `.mcp.json` ;
- documentation officielle du connecteur ;
- scripts locaux ;
- politique interne ;
- source officielle uniquement pour les connecteurs juridiques normatifs.

## Workflow

1. Lister chaque MCP.
2. Classer risque : low, medium, high, blocked.
3. Identifier donnees lues et ecrites.
4. Rechercher secrets, tokens, env vars et scopes larges.
5. Verifier fallback sans MCP.
6. Proposer restrictions ou refus.

## Garde-Fous Et Escalade

Escalader si MCP lit email, drive, Slack, calendrier, documents client, secrets, shell local ou systeme de production.

## Format De Sortie

Table MCP / donnees / ecriture / secrets / risque / decision / validation humaine.

## Dossier De Preuve

Conserver fichier MCP lu, sources, hypotheses, points `[a verifier]` et Note de revue.

## Arbre De Decision

- MCP sans docs : bloquer.
- Secret en clair : bloquer et rotation.
- Lecture sensible : validation humaine.
- Ecriture externe : validation explicite.

## Mode silencieux

Utiliser la matrice de connecteurs du profil de pratique, mais ne jamais approuver un nouveau MCP seul.
