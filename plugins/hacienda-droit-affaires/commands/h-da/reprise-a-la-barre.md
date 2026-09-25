---
description: >
  Playbook tactique côté candidat-repreneur pour construire, optimiser et
  défendre une offre de reprise sur une entreprise déjà placée en redressement
  ou liquidation judiciaire, dans le cadre d'un appel d'offres ouvert (plan de
  cession, L.642-1 s.). Double gate : (1) porte d'entrée — la cible est-elle déjà
  en RJ/LJ avec appel d'offres ouvert ? sinon, si la cession peut être préparée
  confidentiellement en amont, renvoi `pre-pack-cession` ; (2) recevabilité de
  l'offre — éligibilité du repreneur (L.642-3, interdictions / interposition
  prohibée) et offre ferme et écrite (L.642-2), pas une LOI indicative. Opère les
  mentions de l'offre (L.642-2), les contrats repris désignés (L.642-7), les
  critères de choix du tribunal (L.642-5), le sort des sûretés (L.642-12) et les
  voies de recours (L.661-6). Côté repreneur uniquement. Ne rédige pas l'acte de
  cession → `spa-review` / `gap-review` / `closing-checklist-fr`. Brouillon,
  validation humaine (avocat) OBLIGATOIRE.
argument-hint: "[note tactique (mode unique), cible en RJ ou LJ ?, appel d'offres ouvert ?, offre ferme ou LOI ?, côté repreneur]"
---

Point d'entrée `/h-da:reprise-a-la-barre` du plugin Hacienda Droit des Affaires.

Le déroulé complet de cette commande (étapes, vérification des sources, format de sortie, garde-fous) est défini dans le skill `hacienda-droit-affaires:reprise-a-la-barre` du même plugin. Pour traiter la demande, charge ce skill avec l'outil Skill en lui transmettant les éléments ci-dessous, puis suis ses instructions.

Éléments transmis par l'utilisateur :

$ARGUMENTS
