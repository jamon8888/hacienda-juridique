---
description: >
  Assistance à la constitution de société : mode --comparer (aide au choix
  de forme SAS/SARL/SA) et mode --draft (brouillon assisté de statuts, chaque
  point de décision tagué [review]). Détecte la bifurcation acte sous seing
  privé vs notarié obligatoire. Brouillon soumis à validation humaine (avocat)/notaire.
argument-hint: "[--comparer ou --draft, forme envisagée, associés, activité]"
---

Point d'entrée `/h-da:constitution-societe` du plugin Hacienda Droit des Affaires.

Le déroulé complet de cette commande (étapes, vérification des sources, format de sortie, garde-fous) est défini dans le skill `hacienda-droit-affaires:constitution-societe` du même plugin. Pour traiter la demande, charge ce skill avec l'outil Skill en lui transmettant les éléments ci-dessous, puis suis ses instructions.

Éléments transmis par l'utilisateur :

$ARGUMENTS
