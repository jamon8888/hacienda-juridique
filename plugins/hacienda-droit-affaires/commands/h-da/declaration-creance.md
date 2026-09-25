---
description: >
  Rédige une déclaration de créance art. L.622-24 C.com. dans le cadre d'une
  procédure collective (sauvegarde, redressement, liquidation). Calcule
  automatiquement la date de forclusion (2 mois post-publication BODACC,
  4 mois si créancier hors UE/EEE). Lookup BODACC via
  `bodacc_procedures` de `@hacienda/core` pour récupérer
  type de procédure, date jugement, date publication et mandataire désigné
  (extraction depuis `raw`, fallback `[à vérifier]` si parsing échoue).
  Format conforme aux usages mandataire judiciaire. Brouillon, validation
  avocat/mandataire obligatoire.
argument-hint: "[SIREN débiteur, créance, jugement, publication BODACC ; --releve-forclusion pour la requête L.622-26]"
---

Point d'entrée `/h-da:declaration-creance` du plugin Hacienda Droit des Affaires.

Le déroulé complet de cette commande (étapes, vérification des sources, format de sortie, garde-fous) est défini dans le skill `hacienda-droit-affaires:declaration-creance` du même plugin. Pour traiter la demande, charge ce skill avec l'outil Skill en lui transmettant les éléments ci-dessous, puis suis ses instructions.

Éléments transmis par l'utilisateur :

$ARGUMENTS
