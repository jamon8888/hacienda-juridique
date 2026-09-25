---
description: >
  Revue d'un contrat commercial entrant contre le playbook du cabinet : CGV,
  distribution, franchise, prestation de services, bail commercial, SPA, NDA
  commercial. Analyse clause par clause, génère liste de points (issues list)
  avec criticité 🟢/🟡/🟠/🔴, identifie risques juridiques avec articles
  applicables et jurisprudence Judilibre. Renvoie vers PI:contrats-pi si le
  contrat est PI-centric. Brouillon soumis à validation humaine (avocat).
argument-hint: "[contrat, type, side, playbook cabinet]"
---

Point d'entrée `/h-da:reviser-contrat` du plugin Hacienda Droit des Affaires.

Le déroulé complet de cette commande (étapes, vérification des sources, format de sortie, garde-fous) est défini dans le skill `hacienda-droit-affaires:reviser-contrat` du même plugin. Pour traiter la demande, charge ce skill avec l'outil Skill en lui transmettant les éléments ci-dessous, puis suis ses instructions.

Éléments transmis par l'utilisateur :

$ARGUMENTS
