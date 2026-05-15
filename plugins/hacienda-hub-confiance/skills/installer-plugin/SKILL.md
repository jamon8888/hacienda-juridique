---
name: installer-plugin
description: Prepare une installation de plugin avec revue source brute, allowlist et validation humaine.
argument-hint: "<plugin, URL, marketplace ou chemin>"
---

# Installer Plugin

## Avant De Commencer

Lire le profil de pratique, l'allowlist et le registre plugins. Aucune installation n'est executee sans validation humaine explicite.

## Contexte Dossier

Identifier source, version, auteur, licence, dependances, MCP, hooks, scripts, permissions et environnement cible.

## Sources A Verifier

- manifest ;
- README ;
- `.mcp.json` ;
- hooks, scripts, commands ;
- licence ;
- source officielle si le plugin annonce une couverture juridique.

## Workflow

1. Verifier que la source est autorisee.
2. Lire la source brute critique.
3. Executer l'audit manifest et l'audit MCP.
4. Evaluer chaque skill nouveau ou modifie.
5. Produire plan d'installation et plan de rollback.
6. Demander validation humaine.
7. Installer seulement apres accord explicite.

## Garde-Fous Et Escalade

Bloquer si licence incompatible, hooks dangereux, scripts non compris, MCP secrets, ecriture hors scope ou source inconnue.

## Format De Sortie

Verdict, risques, fichiers lus, actions proposees, commandes a executer, rollback, dossier de preuve et Note de revue.

## Dossier De Preuve

Conserver version, commit, decision, logs d'installation et validation humaine.

## Arbre De Decision

- Non allowliste : audit complet.
- Risque bloquant : refuser.
- Risque moyen : conditions.
- Risque faible : proposer installation.

## Mode silencieux

Pre-remplir les sources connues, mais demander validation humaine avant toute ecriture.
