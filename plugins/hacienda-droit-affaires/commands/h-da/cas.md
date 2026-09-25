---
description: >
  Point de départ de toute requête droit des affaires dans Cowork : aiguille
  l'utilisateur (débutant comme confirmé) qui ne sait pas quel skill lancer, ou
  qui décrit un dossier sans nommer d'outil — « j'ai un dossier de…, par où je
  commence ? », « comment je traite ça ? », « quel outil pour… ? ». Trie par
  TYPE de dossier (contrat / litige-impayé / M&A / entreprise en difficulté /
  créance en procédure / vie sociale), rappelle d'activer l'anonymisation AVANT
  de coller des données client, puis route vers le bon skill ou sous-routeur
  (`asset-vs-share-distress` pour le distressed). Routeur agnostique au side : il
  ne demande pas si tu es cédant ou acquéreur, c'est le skill cible qui le fera.
  Il ORIENTE, il n'exécute pas et ne produit aucune analyse juridique. Ne pas
  déclencher quand l'utilisateur nomme déjà l'action (« révise ce contrat »,
  « rédige une mise en demeure ») : laisser le skill direct s'activer.
argument-hint: "[décris ta situation ou ton type de dossier — ex : « reprise d'une société en difficulté », « contrat reçu à relire », « impayé client »]"
---

Point d'entrée `/h-da:cas` du plugin Hacienda Droit des Affaires.

Le déroulé complet de cette commande (étapes, vérification des sources, format de sortie, garde-fous) est défini dans le skill `hacienda-droit-affaires:cas` du même plugin. Pour traiter la demande, charge ce skill avec l'outil Skill en lui transmettant les éléments ci-dessous, puis suis ses instructions.

Éléments transmis par l'utilisateur :

$ARGUMENTS
