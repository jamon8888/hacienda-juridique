---
description: >
  Detection PII pre-flight pour tout skill traitant un document utilisateur.
  Compte les identifiants (categorie A) et alerte au seuil B sur les categories
  sensibles (IBAN, NIR, ID, sante, montants > 10kEUR). Propose l'installation de
  hacienda-ghost si non installe. Politique configurable au cold-start :
  passive / active (defaut, = B+A) / strict.
argument-hint: "[texte, dossier ou chemin à contrôler]"
---

Point d'entrée `/h-da:check-pii` du plugin Hacienda Droit des Affaires.

Le déroulé complet de cette commande (étapes, vérification des sources, format de sortie, garde-fous) est défini dans le skill `hacienda-droit-affaires:check-pii` du même plugin. Pour traiter la demande, charge ce skill avec l'outil Skill en lui transmettant les éléments ci-dessous, puis suis ses instructions.

Éléments transmis par l'utilisateur :

$ARGUMENTS
