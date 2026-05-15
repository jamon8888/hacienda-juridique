---
name: reviser-dpa
description: Revise un accord de traitement de donnees en distinguant posture responsable, sous-traitant ou responsables conjoints.
argument-hint: "<DPA, contrat SaaS ou clause donnees personnelles>"
---

# Reviser DPA

## Avant De Commencer

Lire le profil de pratique, le playbook DPA et l'espace dossier. Identifier si le client agit comme responsable de traitement, sous-traitant, responsable conjoint ou importateur/exportateur de donnees.

Ne pas recommander de signature sans validation humaine. Toute source RGPD, CNIL, Loi Informatique et Libertes ou EDPB non consultee reste `[a verifier]`.

## Contexte Dossier

Relever :

- parties, roles et chaine contractuelle ;
- traitement couvert, finalites, categories de donnees et personnes ;
- instructions documentees ;
- sous-traitants ulterieurs ;
- transferts internationaux ;
- securite, violation, assistance, audit, restitution et suppression ;
- responsabilite, indemnisation et ordre de priorite contractuel.

## Sources A Verifier

- RGPD articles 26, 28, 32, 33, 34 et 44 a 49 ;
- clauses contractuelles types et position EDPB applicable ;
- doctrine CNIL sur sous-traitance et securite ;
- contrat principal, annexes securite, DPA client, politique de confidentialite, registre ;
- playbook interne du profil de pratique.

## Workflow

1. Detecter la direction de revue : client responsable ou client sous-traitant.
2. Comparer le DPA au playbook interne clause par clause.
3. Classer chaque clause : conforme, acceptable, a negocier, bloquante, `[a verifier]`.
4. Controler les obligations art. 28 RGPD : objet, duree, nature, finalites, donnees, personnes, obligations du sous-traitant.
5. Controler violation de donnees : delai, contenu, canal, coordination et couts.
6. Controler audit : proportionnalite, confidentialite, frequence, certification, couts.
7. Controler transferts : pays, SCC, TIA, mesures supplementaires, sous-traitance en cascade.
8. Produire une table de redlines chirurgicales avec justification.

## Garde-Fous Et Escalade

Escalade en validation humaine si le DPA contient :

- transfert hors UE/EEE non documente ;
- responsabilite illimitee ou incoherente avec le contrat principal ;
- audit intrusif ou operationnellement impossible ;
- obligation de notification trop courte ;
- sous-traitants ulterieurs non maitrises ;
- donnees sensibles, mineurs, sante ou IA.

## Format De Sortie

Produire :

- resume de posture ;
- matrice clauses / risque / recommandation / source ;
- redlines proposees ;
- questions au client ou a l'autre partie ;
- conditions de signature.

### Note de revue

Mentionner les documents lus, les clauses non lues, la source officielle consultee, les citations `[a verifier]`, les points `[review]` et la validation humaine requise avant signature.

## Dossier De Preuve

Conserver version revue, version redline, table des clauses, sources officielles, hypotheses et decisions de negociation.

## Arbre de decision

- Role non clair : demander clarification.
- DPA incomplet sur art. 28 : redline obligatoire.
- Transfert non couvert : suspendre signature.
- Risque contractuel fort : escalade avocat associe.
- Ecarts mineurs : proposer redlines et note de revue.
