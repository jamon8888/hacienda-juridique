---
description: >
  Génère une issues list (liste de points à négocier) à partir d'une analyse
  de contrat. Appelable directement OU comme composant interne par
  reviser-contrat / gap-review. Format tableau standardisé criticité
  décroissante 🔴 → 🟢, avec position souhaitée et formulation alternative
  pour chaque point.
argument-hint: "[contrat ou analyse source, position client]"
---

Point d'entrée `/h-da:liste-de-points` du plugin Hacienda Droit des Affaires.

Le déroulé complet de cette commande (étapes, vérification des sources, format de sortie, garde-fous) est défini dans le skill `hacienda-droit-affaires:liste-de-points` du même plugin. Pour traiter la demande, charge ce skill avec l'outil Skill en lui transmettant les éléments ci-dessous, puis suis ses instructions.

Éléments transmis par l'utilisateur :

$ARGUMENTS
