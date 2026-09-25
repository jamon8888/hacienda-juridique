---
description: >
  Génère une checklist de closing M&A adaptée au droit français : conditions
  suspensives à lever, séquençage signing/closing, documentation à réunir,
  formalités post-closing (dépôt au greffe, registre de mouvements de titres,
  droits d'enregistrement). Brouillon soumis à validation humaine (avocat).
  Mode `--pe` : lentille closing LBO (funds flow / sources & uses, mécanique day-1, assistance financière).
argument-hint: "[deal, side, conditions suspensives, calendrier] [--pe --side=sponsor|cedant]"
---

Point d'entrée `/h-da:closing-checklist-fr` du plugin Hacienda Droit des Affaires.

Le déroulé complet de cette commande (étapes, vérification des sources, format de sortie, garde-fous) est défini dans le skill `hacienda-droit-affaires:closing-checklist-fr` du même plugin. Pour traiter la demande, charge ce skill avec l'outil Skill en lui transmettant les éléments ci-dessous, puis suis ses instructions.

Éléments transmis par l'utilisateur :

$ARGUMENTS
