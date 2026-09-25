---
description: >
  Onboarding du plugin droit des affaires : configure le profil cabinet (side
  principal M&A / procédures collectives / mixte), vérifie les connexions aux
  sources externes (Légifrance, Pappers, BODACC, Judilibre), réutilise un
  profil cabinet partagé s'il existe à ~/.claude/plugins/config/hacienda-juridique/company-profile.md.
  Mode --check-integrations pour relancer uniquement le diagnostic.
argument-hint: "[--redo ou --check-integrations]"
---

Point d'entrée `/h-da:entretien-demarrage` du plugin Hacienda Droit des Affaires.

Le déroulé complet de cette commande (étapes, vérification des sources, format de sortie, garde-fous) est défini dans le skill `hacienda-droit-affaires:entretien-demarrage` du même plugin. Pour traiter la demande, charge ce skill avec l'outil Skill en lui transmettant les éléments ci-dessous, puis suis ses instructions.

Éléments transmis par l'utilisateur :

$ARGUMENTS
