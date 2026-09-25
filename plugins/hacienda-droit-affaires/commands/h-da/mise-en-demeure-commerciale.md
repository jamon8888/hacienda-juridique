---
description: >
  Rédige, relit ou gradue une mise en demeure commerciale B2B (mise en demeure
  de payer ou d'exécuter, relance amiable, sommation) en droit français. Calcule
  les sommes dues (principal, intérêts moratoires art. 1344-1 C.civ, indemnité
  forfaitaire de recouvrement 40 € L.441-10 C.com., clause pénale 1231-5),
  accorde un délai raisonnable et calibre la fermeté selon la posture cabinet.
  Garde-fou procédure collective : si le débiteur est en sauvegarde/RJ/LJ,
  l'arrêt des poursuites L.622-21 interdit la mise en demeure d'une créance
  antérieure -> renvoi declaration-creance. Brouillon, validation humaine (avocat)
  et matrice d'approbateurs OBLIGATOIRE.
argument-hint: "[--draft (défaut) | --relance | --sommation, --type=payer|executer, créance/obligation, contrat, side créancier]"
---

Point d'entrée `/h-da:mise-en-demeure-commerciale` du plugin Hacienda Droit des Affaires.

Le déroulé complet de cette commande (étapes, vérification des sources, format de sortie, garde-fous) est défini dans le skill `hacienda-droit-affaires:mise-en-demeure-commerciale` du même plugin. Pour traiter la demande, charge ce skill avec l'outil Skill en lui transmettant les éléments ci-dessous, puis suis ses instructions.

Éléments transmis par l'utilisateur :

$ARGUMENTS
