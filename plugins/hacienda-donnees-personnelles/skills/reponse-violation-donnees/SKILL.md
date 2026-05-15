---
name: reponse-violation-donnees
description: Triage et prepare la reponse a une violation de donnees personnelles.
argument-hint: "<incident, ticket securite ou chronologie>"
---

# Reponse Violation Donnees

## Avant De Commencer

Lire le profil de pratique, le playbook incident, l'espace dossier et les preuves techniques disponibles. Travailler en mode urgence : horodater les faits et separer ce qui est prouve de ce qui est `[a verifier]`.

Ne pas conclure a l'absence de notification CNIL sans validation humaine.

## Contexte Dossier

Collecter :

- heure de detection et heure de connaissance ;
- systemes concernes ;
- categories et volume de donnees ;
- personnes concernees ;
- cause probable ;
- mesures prises ;
- exposition publique, exfiltration ou ransomware ;
- contacts DPO, RSSI, client, assureur, avocat.

## Sources A Verifier

- RGPD articles 33 et 34 ;
- lignes directrices CNIL sur violations de donnees ;
- lignes directrices EDPB sur notification ;
- Loi Informatique et Libertes ;
- logs, tickets, rapport RSSI, chronologie, communications internes.

## Workflow

1. Construire une chronologie minute par minute si possible.
2. Qualifier confidentialite, integrite, disponibilite.
3. Evaluer risque pour les droits et libertes.
4. Determiner notification CNIL sous 72 heures : oui, non, incertain.
5. Determiner communication aux personnes : oui, non, incertain.
6. Preparer un projet de notification avec zones `[a verifier]`.
7. Lister actions immediates : containment, preuve, communication, correctifs, post-mortem.
8. Maintenir un registre de violation meme si non notifiee.

## Garde-Fous Et Escalade

Escalade immediate si donnees sensibles, mineurs, grande volumetrie, exfiltration, ransomware, exposition publique, risque financier, usurpation, contentieux ou presse.

## Format De Sortie

Inclure : chronologie, qualification, evaluation du risque, decision de notification proposee, projet CNIL, communication personnes, actions et owners.

### Note de revue

Documenter sources techniques, incertitudes, statut source officielle, points `[review]`, delai 72h et validation humaine.

## Dossier De Preuve

Conserver logs, tickets, captures, notifications, communications, analyse de risque, decision DPO/avocat et registre.

## Arbre de decision

- Heure de connaissance inconnue : etablir au plus vite.
- Risque absent mais incertain : registre + validation humaine.
- Risque probable : notification CNIL.
- Risque eleve : communication personnes.
- Preuve insuffisante : containment et `[a verifier]`.
