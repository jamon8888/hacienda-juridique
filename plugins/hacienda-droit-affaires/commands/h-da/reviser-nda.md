---
description: >
  Triage rapide d'un NDA / accord de confidentialité commercial : VERT (OK
  signer), ORANGE (négocier 1-2 points), ROUGE (refuser ou renégocier
  largement). Couvre champ confidentialité, exceptions standard, durée,
  juridiction, et clause de non-concurrence salariée (si présente : vérifie
  contrepartie financière obligatoire selon jurisp soc. 10 juil. 2002). Renvoie
  vers PI:contrats-pi si NDA partenariat R&D PI-centric.
argument-hint: "[NDA, side, contexte, niveau de triage]"
---

Point d'entrée `/h-da:reviser-nda` du plugin Hacienda Droit des Affaires.

Le déroulé complet de cette commande (étapes, vérification des sources, format de sortie, garde-fous) est défini dans le skill `hacienda-droit-affaires:reviser-nda` du même plugin. Pour traiter la demande, charge ce skill avec l'outil Skill en lui transmettant les éléments ci-dessous, puis suis ses instructions.

Éléments transmis par l'utilisateur :

$ARGUMENTS
