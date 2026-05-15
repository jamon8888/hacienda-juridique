---
name: generer-aipd
description: Prepare une AIPD structurée avec risques, mesures et decision residuelle.
argument-hint: "<traitement, produit, projet ou registre>"
---

# Generer AIPD

## Avant De Commencer

Lire le profil de pratique, le dossier de qualification, le registre et les documents produit. Si le traitement n'a pas ete qualifie, lancer d'abord `qualification-traitement`.

L'AIPD est un projet de travail. La decision finale et l'acceptation du risque residuel exigent validation humaine.

## Contexte Dossier

Documenter :

- finalites et contexte metier ;
- flux de donnees et systemes ;
- personnes concernees ;
- donnees traitees ;
- base legale et information personnes ;
- sous-traitants, transferts et mesures techniques ;
- risques pour droits et libertes ;
- parties prenantes : metier, DPO, RSSI, produit, avocat.

## Sources A Verifier

- RGPD article 35 et considerants lies au risque ;
- listes et lignes directrices CNIL relatives aux AIPD ;
- lignes directrices EDPB sur DPIA/AIPD ;
- Loi Informatique et Libertes ;
- documentation securite, architecture, registre, DPA, notices et specs produit.

## Workflow

1. Resumer le traitement et confirmer le perimetre.
2. Justifier pourquoi l'AIPD est requise, recommandee ou prudente.
3. Evaluer necessite et proportionnalite : finalite, minimisation, duree, transparence, droits.
4. Identifier menaces et evenements redoutes pour les personnes.
5. Evaluer vraisemblance, gravite et risque initial.
6. Relier chaque risque a des mesures existantes ou a creer.
7. Evaluer le risque residuel apres mesures.
8. Signaler les mesures sans proprietaire, sans deadline ou non prouvees `[a verifier]`.
9. Preparer la decision : acceptable, acceptable sous conditions, consultation CNIL a envisager, STOP.

## Garde-Fous Et Escalade

Escalade obligatoire si :

- risque residuel eleve persistant ;
- donnees sensibles ou mineurs ;
- surveillance systematique ;
- decision automatisee produisant effets juridiques ou similaires ;
- impossibilite de respecter droits, transparence ou minimisation ;
- consultation CNIL potentiellement requise.

## Format De Sortie

Inclure :

- synthese executif ;
- description du traitement ;
- necessite et proportionnalite ;
- table risques / mesures / proprietaire / statut ;
- risque residuel ;
- decision proposee ;
- points `[a verifier]`.

### Note de revue

Lister sources, documents techniques, hypotheses, lacunes, points `[review]` et personne devant valider le risque residuel.

## Dossier De Preuve

Conserver version de l'AIPD, registre lie, captures d'architecture, DPA, notices, sources CNIL/EDPB et decisions de validation humaine.

## Arbre de decision

- Qualification absente : qualifier.
- Donnees a risque ou grande echelle : AIPD obligatoire ou fortement recommandee.
- Mesures non prouvees : conditions avant lancement.
- Risque residuel eleve : validation DPO/avocat et consultation CNIL a etudier.
