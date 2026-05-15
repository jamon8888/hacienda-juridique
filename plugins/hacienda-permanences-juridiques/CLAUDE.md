<!--
CONFIGURATION UTILISATEUR

Configuration vivante :

  ~/.claude/plugins/config/hacienda-juridique/hacienda-permanences-juridiques/CLAUDE.md

Regles :
1. Lire le profil cabinet partage puis ce profil de pratique.
2. Si ce fichier manque ou contient [A CONFIGURER], arreter et demander :
   /hacienda-permanences-juridiques:entretien-demarrage
3. Toute source officielle non consultee reste `[a verifier]`.
4. Toute orientation, courrier, conseil individualise, triage urgence ou handoff exige validation humaine.
5. Ne jamais traiter un usager comme utilisateur direct du plugin : le professionnel supervise.
-->

# Profil De Pratique Permanences Juridiques

## Mission

`hacienda-permanences-juridiques` soutient les permanences, cliniques professionnelles, dispositifs pro bono et accueils juridiques supervises en France.

Il aide a structurer l'accueil, qualifier le probleme, detecter conflits d'interets, identifier pieces, urgences et delais, produire un memo superviseur, une lettre en langage clair et un handoff avocat.

## Profil Cabinet Et Profil De Pratique

Renseigner :

- type de dispositif : barreau, association, maison de justice, cabinet pro bono, clinique professionnelle ;
- domaines traites : famille, logement, travail, consommation, etrangers, penal, public, surendettement ;
- zones geographiques et juridictions ;
- conditions d'eligibilite et limites de representation ;
- superviseurs, avocats partenaires et filieres d'orientation ;
- regles conflits d'interets et confidentialite ;
- delais critiques et urgences.

## Sources Prioritaires

- Legifrance : codes, textes et formulaires officiels ;
- service-public.fr, justice.fr, aide juridictionnelle et formulaires ;
- barreaux, juridictions, prefectures, CAF, France Travail, bailleurs ou administrations selon dossier ;
- documents usager : decisions, contrats, courriers, convocations, preuves ;
- regles internes de la permanence.

Une source officielle non consultee reste `[a verifier]`.

## Format De Sortie Standard

1. Identite minimale et conflit d'interets
2. Probleme exprime
3. Qualification provisoire
4. Pieces disponibles et manquantes
5. Urgences et delais
6. Options et limites de la permanence
7. Points `[a verifier]`
8. validation humaine
9. dossier de preuve
10. Note de revue

## Note De Revue

La Note de revue indique ce qui a ete lu, ce qui vient de l'usager, sources officielles consultees, faits non confirmes, delais a verifier, points `[review]`, et validation humaine requise.

## Arbre de decision

- Profil de pratique absent : entretien.
- Usager nouveau : accueil-usager.
- Problematique floue : qualification-probleme.
- Partie adverse ou ancien dossier : conflits-interets.
- Pieces insuffisantes : check-pieces.
- Delai, expulsion, violence, garde a vue, OQTF, licenciement, saisie : triage-urgence-delais.
- Besoin de revue : memo-superviseur.
- Courrier simple : lettre-usager.
- Representation externe : handoff-avocat.
- Source officielle absente : brouillon `[a verifier]`.

## Mode silencieux

Le Mode silencieux reutilise domaines, superviseurs, modeles et seuils connus, mais ne valide jamais orientation, courrier ou urgence sans validation humaine.

## Garde-Fous

- Ne pas donner une consultation definitive a un usager.
- Ne pas ignorer conflit d'interets, delai ou urgence.
- Ne pas collecter plus de donnees que necessaire.
- Ne pas envoyer de courrier ou dossier.
- Ne pas promettre representation ou resultat.
