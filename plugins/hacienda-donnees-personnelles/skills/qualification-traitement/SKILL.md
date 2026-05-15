---
name: qualification-traitement
description: Qualifie un traitement de donnees personnelles et decide s'il peut proceder, requiert une AIPD ou doit etre bloque.
argument-hint: "<description du traitement ou dossier>"
---

# Qualification Traitement

## Avant De Commencer

Lire le profil de pratique, le profil cabinet et l'espace dossier. Si le profil manque, arreter et demander `/hacienda-donnees-personnelles:entretien-demarrage`.

Verifier si les sources RGPD, CNIL, Loi Informatique et Libertes et EDPB ont ete consultees via `hacienda-sources-officielles`. Toute source non consultee reste `[a verifier]`.

Mode silencieux : utiliser les informations deja presentes dans le profil et les pieces, mais ne jamais inventer une base legale, une finalite, une mesure de securite ou une source officielle.

## Contexte Dossier

Collecter ou confirmer :

- finalite du traitement ;
- responsable, sous-traitant, responsables conjoints et destinataires ;
- categories de personnes concernees ;
- categories de donnees, dont donnees sensibles, mineurs, RH, sante, geolocalisation, scoring ou IA ;
- base legale proposee ;
- duree de conservation ;
- recipients, transferts hors UE/EEE et sous-traitants ;
- documents lus et documents manquants.

## Sources A Verifier

- RGPD articles 5, 6, 9, 12 a 22, 24, 25, 30, 32 et 35 ;
- Loi Informatique et Libertes ;
- doctrine CNIL applicable au secteur ;
- lignes directrices EDPB sur bases legales, transparence, interets legitimes, AIPD et transferts ;
- documents utilisateur : registre, notice, politique, contrat, specs produit, exports techniques.

## Workflow

1. Reformuler le traitement en une fiche courte : finalite, donnees, personnes, acteurs, systemes, pays.
2. Verifier si la finalite est determinee, explicite et legitime.
3. Tester la minimisation : chaque categorie de donnees doit etre reliee a une finalite.
4. Classer la base legale et signaler les bases fragiles `[review]`.
5. Chercher les signaux AIPD : grande echelle, donnees sensibles, surveillance, scoring, IA, mineurs, RH, exclusion automatique.
6. Verifier coherence registre, information personnes, DPA, cookies et transferts.
7. Produire une decision : `PROCEDER`, `AIPD REQUISE`, `AIPD OBLIGATOIRE` ou `STOP`.
8. Lister les conditions de passage et les preuves a obtenir.

## Garde-Fous Et Escalade

Escalade en validation humaine si :

- base legale incertaine ou interets legitimes delicats ;
- donnees sensibles, sante, mineurs, surveillance, scoring, IA ou grande echelle ;
- transfert hors UE/EEE ;
- finalite incompatible avec une politique existante ;
- absence de notice, registre ou DPA alors que le traitement demarre.

## Format De Sortie

Inclure :

- qualification synthetique ;
- decision ;
- conditions avant mise en production ;
- sources consultees et sources `[a verifier]` ;
- contradictions avec les documents dossier ;
- prochaine action.

### Note de revue

Indiquer les pieces lues, sources officielles consultees, hypotheses, points `[review]` et decision de validation humaine.

## Dossier De Preuve

Conserver la fiche traitement, la base legale, les sources, les pieces lues, les screenshots ou exports techniques, les inconnues `[a verifier]` et les personnes ayant valide.

## Arbre de decision

- Profil absent : arreter.
- Source officielle absente : brouillon seulement.
- Risque faible et preuves completes : `PROCEDER`.
- Risque incertain : `AIPD REQUISE`.
- Critere CNIL/EDPB de risque eleve : `AIPD OBLIGATOIRE`.
- Base legale impossible ou collecte excessive : `STOP`.
