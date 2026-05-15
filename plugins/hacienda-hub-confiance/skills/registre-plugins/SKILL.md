---
name: registre-plugins
description: Cartographie les plugins installes, locaux, candidats et leur statut de confiance.
argument-hint: "[chemin, marketplace ou registre]"
---

# Registre Plugins

## Avant De Commencer

Lire le profil de pratique, les registries autorises et l'espace dossier. Ne pas scanner un chemin hors perimetre sans validation humaine.

## Contexte Dossier

Identifier le perimetre : marketplace Hacienda, plugins locaux, plugins Cowork importes, depot GitHub, ou dossier client.

## Sources A Verifier

- manifests `.claude-plugin/plugin.json` et `.codex-plugin/plugin.json` ;
- README, licences, hooks, scripts, `.mcp.json` ;
- source officielle si un plugin revendique une couverture normative ;
- registry ou commit d'origine.

## Workflow

1. Lister les plugins trouves.
2. Lire chaque manifest.
3. Classer auteur, licence, version, source et categorie.
4. Identifier hooks, scripts, MCP et chemins sensibles.
5. Noter statut : interne, autorise, a examiner, bloque, `[a verifier]`.
6. Produire une matrice de confiance.

## Garde-Fous Et Escalade

Escalader si un plugin demande secrets, ecriture fichiers, email, drive, Slack, calendrier, shell, hooks ou publication externe.

## Format De Sortie

Table : plugin, source, version, auteur, statut, risques, prochaine action, validation humaine.

## Dossier De Preuve

Conserver manifests lus, chemins, checksums si disponibles, commit, sources et Note de revue.

## Arbre De Decision

- Source interne Hacienda : controle qualite.
- Source autorisee : audit leger.
- Source inconnue : audit complet.
- Risque critique : bloquer.

## Mode silencieux

Reutiliser les registries connus du profil de pratique, mais marquer tout plugin non reconnu `[a verifier]`.
