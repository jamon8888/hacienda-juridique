---
description: >
  Note d'orientation / arbitrage de structuration côté candidat-repreneur pour
  décider COMMENT acquérir une cible en difficulté — rachat de titres (share
  deal) ou rachat d'actifs (asset deal) — et router vers le bon playbook
  d'exécution. Entonnoir amont du moat distressed-M&A : il décide et oriente, il
  n'exécute pas. Double gate : (1) diagnostic du niveau de difficulté + routage —
  in bonis / amiable / RJ / LJ ; cessation des paiements > 45 j sans procédure →
  renvoi `prevention-difficultes` ; (2) responsabilité repreneur — un share deal
  d'une société en difficulté ne purge AUCUN passif (on hérite dettes,
  procédures, litiges), et une acquisition pré-procédure peut être annulée au
  titre de la période suspecte (L.632-1 nullités de droit / L.632-2
  facultatives). Cartographie aussi L.1224-1 (transfert social), la solidarité
  fiscale L.1684 CGI (cession de fonds), l'extension de procédure / confusion de
  patrimoine, l'insuffisance d'actif L.651-2 et le passif environnemental ICPE.
  Route vers `prevention-difficultes` / `pre-pack-cession` / `reprise-a-la-barre`
  / `cession-actifs-isoles` / `spa-review`. Côté repreneur uniquement. N'exécute
  pas (ni offre, ni SPA, ni acte de cession) et ne donne AUCUN conseil fiscal.
  Brouillon, validation humaine (avocat) OBLIGATOIRE.
argument-hint: "[note d'orientation (mode unique), cible à quel stade de difficulté ?, titres ou actifs envisagés ?, acquisition avant ou après jugement ?, côté repreneur]"
---

Point d'entrée `/h-da:asset-vs-share-distress` du plugin Hacienda Droit des Affaires.

Le déroulé complet de cette commande (étapes, vérification des sources, format de sortie, garde-fous) est défini dans le skill `hacienda-droit-affaires:asset-vs-share-distress` du même plugin. Pour traiter la demande, charge ce skill avec l'outil Skill en lui transmettant les éléments ci-dessous, puis suis ses instructions.

Éléments transmis par l'utilisateur :

$ARGUMENTS
