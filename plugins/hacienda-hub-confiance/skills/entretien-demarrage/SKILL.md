---
name: entretien-demarrage
description: Configure le profil de pratique du hub de confiance Hacienda.
argument-hint: "[optionnel: --reconfigurer | --mode-silencieux]"
---

# Entretien De Demarrage

## Avant De Commencer

Lire le profil cabinet partage et le profil de pratique existant. Si le mode silencieux est demande, reutiliser les informations connues mais marquer toute inconnue `[a verifier]`.

## Contexte Dossier

L'entretien configure le hub pour une organisation : cabinet, direction juridique, legal ops, DPO, RSSI ou administrateur Cowork.

## Sources A Verifier

- registries de plugins internes ou publics ;
- auteurs et organisations autorises ;
- connecteurs MCP disponibles ;
- politiques internes de securite ;
- references `legal-builder-hub`, `create-cowork-plugin` et `cowork-plugin-customizer`.

## Workflow

1. Identifier le role de l'utilisateur et le validateur humain.
2. Lister les registries autorises et ceux a bloquer.
3. Lister les auteurs, organisations et depots de confiance.
4. Classer les connecteurs MCP acceptables par risque.
5. Definir les actions permises : lecture, audit, personnalisation, installation, publication.
6. Definir les seuils de validation humaine.
7. Definir le format du dossier de preuve.
8. Ecrire le profil de pratique sans marqueur incomplet.

## Garde-Fous Et Escalade

Escalader si le profil autorise installation automatique, acces secrets, MCP email/drive/slack, hooks, scripts ou publication externe.

## Format De Sortie

Produire le profil, la matrice de confiance, les registries, les gates et la Note de revue.

## Dossier De Preuve

Conserver les reponses, sources, decisions et points `[a verifier]`.

## Arbre De Decision

- Profil absent : lancer l'entretien.
- Registry inconnu : bloquer par defaut.
- MCP sensible : audit obligatoire.
- Ecriture demandee : validation humaine.

## Mode silencieux

Ne pas redemander une valeur deja presente dans le profil de pratique, mais ne jamais approuver une action sensible par defaut.
