# Scénario blind — Revue de pacte d'associés (SAS)

> **INPUT BLIND UNIQUEMENT.** Ce fichier ne contient que les faits fictifs.
> Le corrigé attendu et les criteria sont dans `ground-truth.md` (NE PAS ouvrir
> en Phase 3). Aucune donnée réelle — parties, montants et chiffres fictifs.
>
> **Entry point :** `/h-droit-affaires:pacte-associes-review ./faits.md --review`
> **Side :** investisseur entrant (CAPITAL NOVA SAS).

---

## Faits fictifs

```
Contexte (fictif) :

- Société : ORBIA TECH SAS, éditeur de logiciels, France métropolitaine,
  environ 30 salariés.
- Fondateurs : M. G et Mme H (via FONDATEURS ORBIA, holding commune), ensemble
  majoritaires.
- Investisseur entrant : CAPITAL NOVA SAS, fonds, qui souscrit une augmentation
  de capital représentant 25 % du capital à l'issue du tour.
- Le conseil qui relit agit pour l'investisseur entrant (CAPITAL NOVA).
- Un projet de pacte d'associés est soumis à la signature concomitante à
  l'investissement. Extraits fictifs des clauses :

Article P.1 — Inaliénabilité
  Les Fondateurs s'engagent à conserver l'intégralité de leurs titres pendant
  une durée de douze (12) ans à compter de la signature du pacte.

Article P.2 — Agrément
  Toute cession de titres par un associé est soumise à l'agrément préalable des
  Fondateurs.

Article P.3 — Préemption
  En cas de projet de cession, les Fondateurs bénéficient d'un droit de
  préemption prioritaire sur les titres offerts.

Article P.4 — Cession forcée (drag-along)
  Si les Fondateurs décident de céder leurs titres à un tiers, ils peuvent
  exiger des autres associés qu'ils cèdent l'intégralité de leurs titres au
  même acquéreur. Les autres associés consentiront alors les déclarations et
  garanties demandées par l'acquéreur.

Article P.6 — Ajustement anti-dilution
  En cas d'émission ultérieure de titres à un prix par action inférieur à celui
  du présent tour, l'Investisseur recevra un nombre de titres complémentaires
  calculé selon la méthode du full ratchet, ramenant son prix d'entrée au prix
  le plus bas.

Article P.7 — Départ d'un Fondateur (leaver)
  En cas de cessation des fonctions d'un Fondateur, pour quelque cause que ce
  soit, ses titres seront rachetés à leur valeur nominale.

Article P.8 — Promesse de rachat
  À défaut de cession ou d'introduction en bourse dans un délai de cinq (5) ans,
  les Fondateurs s'engagent à racheter les titres de l'Investisseur à un prix
  garantissant à ce dernier un taux de rendement interne minimum de 15 % par an.

Article P.9 — Non-concurrence des associés
  Chaque associé s'interdit, pendant quatre (4) ans après la cession de la
  totalité de ses titres, toute activité concurrente de la Société, en France
  et à l'étranger.

Article P.10 — Droits de véto de l'Investisseur
  Aucune décision de la Société ne pourra être prise sans l'accord préalable de
  l'Investisseur, y compris les décisions de gestion courante : recrutements,
  signature des contrats commerciaux, engagements de dépenses, politique
  tarifaire et organisation interne.

Article P.12 — Liquidité
  Les parties rechercheront une fenêtre de liquidité (cession ou cotation) à
  un horizon de sept (7) ans.

Le pacte ne comporte pas de clause de sortie conjointe (tag-along) au profit de
l'Investisseur, ni de seuil chiffré de déclenchement du drag-along.

Date d'aujourd'hui (cadre du travail) : 20 septembre 2026.
La revue du pacte est demandée avant signature par l'investisseur.
```

---

*Cadre : `--review --side=investisseur`, SAS ; sortie attendue dans* `live-output.md`.
*(Le code de cycle est généré au moment du scoring, hors de ce fichier blind.)*
