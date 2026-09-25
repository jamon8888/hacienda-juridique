---
description: >
  Post-flight de validation juridique. Pour chaque article cite dans une
  sortie skill (art. NNN C.civ, L.NNN-N C.com., etc.), interroge Legifrance
  via packages/core pour verifier existence + version en vigueur +
  non-abrogation. Annote la sortie. Mode degrade si PISTE non configure.
argument-hint: "[sortie ou liste de citations à vérifier]"
---

Point d'entrée `/h-da:verifier-citations` du plugin Hacienda Droit des Affaires.

Le déroulé complet de cette commande (étapes, vérification des sources, format de sortie, garde-fous) est défini dans le skill `hacienda-droit-affaires:verifier-citations` du même plugin. Pour traiter la demande, charge ce skill avec l'outil Skill en lui transmettant les éléments ci-dessous, puis suis ses instructions.

Éléments transmis par l'utilisateur :

$ARGUMENTS
