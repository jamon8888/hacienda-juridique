---
description: >
  Extraction structurée de N documents en parallèle vers un tableau, colonnes
  paramétrables. Brique atomique : remplace la revue manuelle "10 NDA à
  passer en revue". Réutilisée comme building block par
  due-diligence-dataroom (v1.1). Exemple : extraire durée + non-conc + loi
  + juridiction sur 12 NDA d'un coup.
argument-hint: "[documents, colonnes à extraire, format de sortie]"
---

Point d'entrée `/h-da:revue-tabulaire` du plugin Hacienda Droit des Affaires.

Le déroulé complet de cette commande (étapes, vérification des sources, format de sortie, garde-fous) est défini dans le skill `hacienda-droit-affaires:revue-tabulaire` du même plugin. Pour traiter la demande, charge ce skill avec l'outil Skill en lui transmettant les éléments ci-dessous, puis suis ses instructions.

Éléments transmis par l'utilisateur :

$ARGUMENTS
