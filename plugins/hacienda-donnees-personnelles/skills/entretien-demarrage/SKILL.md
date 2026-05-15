---
name: entretien-demarrage
description: Configure le profil de pratique RGPD/CNIL Hacienda a partir d'un entretien structure.
argument-hint: "[optionnel: --reconfigurer | --mode-silencieux]"
---

# Entretien De Demarrage

## But

Creer ou mettre a jour le profil de pratique dans :

```text
~/.claude/plugins/config/hacienda-juridique/hacienda-donnees-personnelles/CLAUDE.md
```

L'entretien doit produire un profil exploitable par les autres skills sans marqueur `[A CONFIGURER]`. Il apprend la pratique reelle du cabinet, les sources, les playbooks, les dossiers de reference et les seuils de validation humaine.

## Avant De Commencer

1. Lire le profil cabinet partage s'il existe.
2. Lire le profil de pratique existant s'il existe.
3. Identifier les elements deja connus et ne demander que les manques.
4. Si le mode silencieux est demande, proposer un profil provisoire mais marquer les inconnues `[a verifier]`.

## Questions Cabinet

1. Quel est votre role principal : avocat, juriste, DPO, RSSI, legal ops, consultant, expert-comptable, autre ?
2. Pour qui travaillez-vous le plus souvent : responsables de traitement, sous-traitants, responsables conjoints, groupes internationaux, startups, collectivites, associations ?
3. Quels secteurs reviennent le plus : RH, sante, finance, SaaS, e-commerce, education, immobilier, secteur public, marketing, IA, contentieux ?
4. Quels territoires sont habituels : France seule, UE/EEE, Royaume-Uni, Etats-Unis, autres pays tiers ?
5. Qui valide les livrables sensibles : associe, DPO, client, RSSI, direction juridique, direction produit, direction RH ?

## Questions Playbook RGPD

1. Quelles bases legales sont frequentes et lesquelles doivent etre validees manuellement ?
2. Quelles categories de donnees sensibles ou a risque apparaissent dans vos dossiers ?
3. Quels traitements declenchent toujours une AIPD dans votre pratique ?
4. Quels seuils declenchent une escalade : mineurs, sante, IA, scoring, surveillance, grande echelle, donnees RH, transfert hors UE/EEE ?
5. Quelle position par defaut adopter si une source CNIL, RGPD, Loi Informatique et Libertes ou EDPB n'a pas ete consultee ?

## Questions DPA Et Contrats

1. Avez-vous un modele DPA responsable de traitement ?
2. Avez-vous un modele DPA sous-traitant ?
3. Quelles clauses sont non negociables : audit, violation, sous-traitants ulterieurs, restitution, assistance, responsabilite, transferts ?
4. Quelles clauses doivent etre marquees `[review]` avant signature ?
5. Quels contrats ou DPA historiques peuvent servir de seed documents ?

## Questions AIPD, Registre Et Droits

1. Avez-vous un modele AIPD maison ou client ?
2. Comment structurez-vous le registre de traitements : table, outil GRC, tableur, export SaaS ?
3. Quels champs sont obligatoires dans vos registres ?
4. Quelle procedure utilisez-vous pour les demandes d'acces, effacement, opposition, portabilite et limitation ?
5. Quels refus de droits ou exemptions doivent etre valides par un avocat ou DPO ?

## Questions Cookies Et Violations

1. Quels outils CMP, analytics, advertising ou tag manager utilisez-vous ?
2. Avez-vous une politique cookies de reference ?
3. Avez-vous une procedure de violation de donnees ?
4. Qui est contacte en urgence : DPO, RSSI, client, assureur cyber, avocat contentieux, communication ?
5. Quelle forme de dossier de preuve attendez-vous pour notification CNIL, communication personnes et post-mortem ?

## Questions Sources Et Recherche

1. Quelles sources officielles doivent etre prioritaires : CNIL, RGPD, Loi Informatique et Libertes, EDPB, CJUE, Conseil d'Etat, CPCE ?
2. Quelles bases professionnelles orientees recherche utilisez-vous : Doctrine, Lefebvre Dalloz, Lexis, Lamyline, Navis, Dalloz, Lexbase ?
3. Quelles sources internes peuvent etre lues : politiques, registres, DPA, AIPD, tickets, exports, contrats, emails ?
4. Ou conserver les livrables et le dossier de preuve ?
5. Faut-il proposer un tableau de suivi ou rester en livrables ponctuels ?

## Sortie Attendue

Produire un profil complet avec :

- mission et role de l'utilisateur ;
- sources et ordre de verification ;
- empreinte reglementaire ;
- playbook DPA responsable et sous-traitant ;
- criteres AIPD ;
- processus droits des personnes ;
- processus cookies ;
- processus violation de donnees ;
- regles de transferts internationaux ;
- espace dossier et conventions de nommage ;
- seuils de validation humaine ;
- format de Note de revue ;
- Arbre de decision ;
- Mode silencieux.

## Garde-Fous

- Ne pas inventer une source officielle consultee.
- Marquer `[a verifier]` les informations non documentees.
- Conserver les points subjectifs sous `[review]`.
- Ne pas remplacer l'avis d'un avocat, DPO ou responsable de traitement.
