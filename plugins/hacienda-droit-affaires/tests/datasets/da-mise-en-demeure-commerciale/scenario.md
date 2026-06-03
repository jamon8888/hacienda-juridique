# Scénario blind — Mise en demeure commerciale B2B (mode payer)

> **INPUT BLIND UNIQUEMENT.** Faits fictifs seuls. Le corrigé attendu et les
> criteria iront dans `ground-truth.md` (NE PAS ouvrir en Phase 3). Aucune donnée
> réelle — parties, montants et SIREN fictifs.
>
> **Entry point :** `/h-droit-affaires:mise-en-demeure-commerciale --draft --type=payer ./faits.md`
> **Side :** créancier (SAS OPTIMA-FOURNITURES).
> **Code de cycle :** à générer au scoring (Phase 2).

---

## Faits fictifs

```
Parties (fictives) :

- OPTIMA-FOURNITURES — SAS, SIREN-FICTIF-555111222, France métropolitaine,
  siège à Roubaix (59). Grossiste en fournitures de bureau et consommables.
- NOVEXA SERVICES — SAS, SIREN-FICTIF-666333444, France métropolitaine,
  siège à Lille (59). Société de services informatiques, environ 40 salariés.
  Cliente d'OPTIMA depuis 2022, compte courant fournisseur.

État de la contrepartie :

- Aucune procédure collective connue à ce jour : aucune annonce BODACC de
  sauvegarde, redressement ou liquidation pour NOVEXA SERVICES.
- Société active, comptes déposés, pas d'incident de paiement publié.

Conditions générales de vente OPTIMA (acceptées par NOVEXA à l'ouverture du
compte en 2022) :

- Art. 6 « Délai de paiement — Les factures sont payables à 30 jours date de
  facture. »
- Art. 7 « Intérêts de retard — Tout retard de paiement entraîne, de plein
  droit et sans mise en demeure préalable, des intérêts de retard au taux
  d'intérêt légal applicable aux créances professionnelles majoré de cinq
  points, ainsi que l'indemnité forfaitaire de recouvrement prévue par la loi. »
- Art. 8 « Clause pénale — En cas de recouvrement contentieux, une indemnité
  égale à 12 % des sommes dues en principal sera due à titre de clause pénale,
  avec un minimum de 300 €. »

Factures impayées :

| Référence    | Date facture | Échéance (30 j) | Montant TTC |
|--------------|--------------|-----------------|-------------|
| FA-2025-0731 | 15 oct 2025  | 14 nov 2025     | 4 380,00 €  |
| FA-2025-0802 | 3 nov 2025   | 3 déc 2025      | 6 210,00 €  |
| **Total**    |              |                 | **10 590,00 €** |

Historique de recouvrement :

- Relance amiable par e-mail le 8 décembre 2025 (sans formule comminatoire),
  restée sans réponse.
- Aucune contestation écrite des factures reçue de NOVEXA. Les marchandises
  ont été livrées et réceptionnées sans réserve (bons de livraison signés).
- Aucun paiement partiel, aucun avoir, aucune créance réciproque.

Contexte :

- OPTIMA souhaite une mise en demeure formelle de payer avant d'envisager une
  injonction de payer.
- Date d'aujourd'hui (cadre du travail) : 5 janvier 2026.
- Posture cabinet supposée : équilibrée (ferme et factuelle).
```

---

*Cadre : `--draft --type=payer`. Sortie attendue dans* `live-output.md`.
