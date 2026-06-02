# Scénario blind — Analyse de rupture brutale (L.442-1, II)

> **INPUT BLIND UNIQUEMENT.** Ce fichier ne contient que les faits fictifs.
> La vérité terrain et les criteria sont dans `ground-truth.md` (NE PAS ouvrir
> en Phase 3). Aucune donnée réelle — parties, montants et SIREN fictifs.
>
> **Entry point :** `/h-droit-affaires:analyser-rupture-brutale ./contrat-A-B.pdf ./notification-rupture.pdf --review --side=victime`

---

## Faits fictifs

```
Parties (fictives) :

- FOURNISSEUR A — SAS, SIREN-FICTIF-111111111, France métropolitaine.
  Industriel français, fabrique des équipements techniques.
- DISTRIBUTEUR B — SARL, SIREN-FICTIF-222222222, France métropolitaine.
  Distributeur indépendant, revend les équipements de A sur le marché FR.

Relation commerciale :

- Contrat-cadre de distribution exclusive France signé le 1er mars 2018
  (il y a 8 ans à la date de notification ci-dessous).
- Renouvellement annuel par tacite reconduction, sans manquement signalé.
- Exclusivité territoriale ET exclusivité d'approvisionnement : B ne peut
  s'approvisionner qu'auprès de A pour la gamme contractuelle, et A
  s'interdit de vendre directement ou via d'autres distributeurs sur le
  territoire FR.
- Volume : les ventes des équipements de A représentent environ 70 %
  du chiffre d'affaires de B sur les trois derniers exercices clos
  (2023, 2024, 2025).
- B a investi en 2019 dans une plateforme logistique dédiée à la gamme de A
  (amortissement linéaire 10 ans, valeur nette comptable résiduelle
  significative).
- B emploie 3 commerciaux dédiés exclusivement à la gamme de A.

Événement de rupture :

- Lettre recommandée du 15 février 2026 de A à B :
  "Cher Partenaire, nous vous informons par la présente, en application
  de l'article X du contrat-cadre, de notre décision de mettre fin à notre
  relation commerciale à effet du 15 mai 2026, soit un préavis de trois
  mois. Cette décision s'inscrit dans une réorganisation stratégique de
  notre réseau de distribution. Nous vous remercions pour la qualité de
  notre collaboration passée."
- Aucune inexécution n'est alléguée contre B dans la lettre.
- Aucune force majeure n'est invoquée.
- A ne s'engage à aucune indemnisation.
- A précise qu'il ne reprendra pas le stock résiduel.

Données comptables (fournies par B) :

- Chiffre d'affaires moyen de B sur les ventes de la gamme A :
  ≈ 2 000 000 € HT / an sur 2023-2024-2025.
- Marge brute de B sur la gamme A : ≈ 30 % du CA HT.
- Marge brute mensuelle moyenne de B sur la gamme A :
  ≈ 50 000 € (= 2 000 000 × 30 % ÷ 12).
- Stock résiduel non repris par A à la date d'effet : ≈ 180 000 € HT
  (à écouler par B sur le marché secondaire à perte probable).
- Investissement plateforme logistique 2019 : VNC résiduelle ≈ 220 000 €.
```

---

*Side attendu : victime (B). Mode : `--review`. Sortie Phase 3 →* `live-output.md`.
