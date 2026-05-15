---
name: entretien-demarrage
description: Configure le profil product counsel consommation Hacienda.
argument-hint: "[optionnel: --reconfigurer | --mode-silencieux]"
---

# Entretien De Demarrage

## Avant De Commencer

Lire le profil cabinet partage et le profil de pratique existant. En Mode silencieux, reutiliser les donnees connues et marquer les inconnues `[a verifier]`.

## Contexte Dossier

Configurer produits, marches, trackers, seuils de risque, sources et formats de livrables.

## Sources A Verifier

Code de la consommation, DGCCRF, Code civil, Code de commerce, CNIL/RGPD, droit europeen consommation, ARPP, PRD et maquettes.

## Workflow

1. Identifier produits et audiences.
2. Identifier pays et canaux.
3. Lister trackers et seed launch reviews.
4. Definir claims sensibles.
5. Definir seuils GO, GO sous conditions, ESCALADE, STOP.
6. Definir validateur humain et dossier de preuve.
7. Ecrire le profil de pratique.

## Garde-Fous Et Escalade

Escalader si mineurs, sante, finance, abonnement, reconduction, prix, avis clients, marketplace ou pratique commerciale sensible.

## Format De Sortie

Profil, sources, playbooks, seuils, Mode silencieux, Note de revue et Arbre de decision.

## Dossier De Preuve

Conserver reponses, sources, seed reviews, trackers et points `[a verifier]`.

## Arbre De Decision

- Profil absent : entretien.
- Source inconnue : `[a verifier]`.
- Produit sensible : validation humaine.

## Mode silencieux

Ne jamais valider un lancement par defaut.
