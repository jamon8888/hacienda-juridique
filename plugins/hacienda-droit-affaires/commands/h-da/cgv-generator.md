---
description: >
  Génère des CGV (B2B, Code de commerce) ou des CGU/CGV (B2C, Code de la
  consommation) sous forme de brouillon assisté : chaque clause appelant un
  arbitrage est taguée [review]. Détecte le régime à l'intake et applique le
  cadre correspondant. Ne produit jamais un document prêt à publier. Brouillon
  soumis à validation humaine (avocat).
argument-hint: "[B2B/B2C, secteur, canal, clauses à générer ou réviser]"
---

Point d'entrée `/h-da:cgv-generator` du plugin Hacienda Droit des Affaires.

Le déroulé complet de cette commande (étapes, vérification des sources, format de sortie, garde-fous) est défini dans le skill `hacienda-droit-affaires:cgv-generator` du même plugin. Pour traiter la demande, charge ce skill avec l'outil Skill en lui transmettant les éléments ci-dessous, puis suis ses instructions.

Éléments transmis par l'utilisateur :

$ARGUMENTS
