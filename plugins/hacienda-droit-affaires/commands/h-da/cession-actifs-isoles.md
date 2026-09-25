---
description: >
  Playbook tactique côté candidat-repreneur pour construire et défendre une
  offre d'acquisition d'actifs isolés (mobiliers, incorporels, fonds de
  commerce, IP, stocks, créances) auprès d'un débiteur en liquidation
  judiciaire, hors plan de cession (cession de gré à gré ou aux enchères,
  L.642-19). Double gate : (1) qualification — s'agit-il d'un actif isolé et
  non d'une entreprise / unité de production en going concern ? si going
  concern, renvoi `reprise-a-la-barre` ; si la cession peut être préparée
  confidentiellement en amont, renvoi `pre-pack-cession` ; (2) recevabilité —
  éligibilité de l'acquéreur (L.642-20 renvoyant à L.642-3 : interdictions /
  interposition) et autorisation du juge-commissaire (L.642-19 : une offre
  adressée au liquidateur ne vaut pas vente tant que le JC n'a pas ordonné).
  Opère le sort des sûretés (report du droit de préférence sur le prix, droit
  de rétention non purgé, purge au paiement du prix), l'absence de transfert
  automatique des contrats (L.642-7 a contrario), le transfert automatique des
  salariés si entité économique autonome (L.1224-1) et les recours contre
  l'ordonnance (L.661-x). Côté repreneur uniquement. Immeubles (L.642-18) hors
  périmètre. Ne rédige pas l'acte de cession → `spa-review` / `gap-review` /
  `closing-checklist-fr`. Brouillon, validation humaine (avocat) OBLIGATOIRE.
argument-hint: "[note tactique (mode unique), actif isolé ou entreprise en going concern ?, débiteur en LJ ?, ordonnance du juge-commissaire ?, côté repreneur]"
---

Point d'entrée `/h-da:cession-actifs-isoles` du plugin Hacienda Droit des Affaires.

Le déroulé complet de cette commande (étapes, vérification des sources, format de sortie, garde-fous) est défini dans le skill `hacienda-droit-affaires:cession-actifs-isoles` du même plugin. Pour traiter la demande, charge ce skill avec l'outil Skill en lui transmettant les éléments ci-dessous, puis suis ses instructions.

Éléments transmis par l'utilisateur :

$ARGUMENTS
