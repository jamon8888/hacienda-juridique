---
name: desactiver-plugin
description: Prepare la desactivation, le rollback ou le retrait d'un plugin a risque.
argument-hint: "<plugin>"
---

# Desactiver Plugin

## Avant De Commencer

Lire le profil de pratique et verifier que le plugin cible n'est pas un composant critique sans plan de remplacement.

## Contexte Dossier

Identifier installation, dependants, donnees generees, MCP actifs, automations, hooks et raisons de desactivation.

## Sources A Verifier

- manifest ;
- config utilisateur ;
- logs d'installation ;
- hooks ;
- MCP ;
- dossier de preuve d'origine.

## Workflow

1. Confirmer le plugin cible.
2. Evaluer impact de desactivation.
3. Sauvegarder configuration si necessaire.
4. Proposer disable, uninstall ou quarantine.
5. Demander validation humaine.
6. Produire rollback.

## Garde-Fous Et Escalade

Escalader si suppression de donnees, retrait d'un plugin first-party, conflit de dependance ou risque de perte de preuve.

## Format De Sortie

Plan de retrait, impact, sauvegarde, rollback, points `[a verifier]`, validation humaine et Note de revue.

## Dossier De Preuve

Conserver raison, fichiers impactes, sauvegardes, decision et horodatage.

## Arbre De Decision

- Risque actif : quarantine.
- Plugin non critique : disable.
- Plugin critique : plan de remplacement.
- Donnees a conserver : sauvegarde avant action.

## Mode silencieux

Ne pas demander les raisons deja documentees, mais demander validation humaine avant toute suppression.
