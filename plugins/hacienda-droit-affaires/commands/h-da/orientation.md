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

Use the `orientation` skill with these arguments:

$ARGUMENTS

Delegate all triage, routing, anonymization-gate and validation-human guardrails to the skill. Do not duplicate or reinterpret the business logic in this command wrapper.
