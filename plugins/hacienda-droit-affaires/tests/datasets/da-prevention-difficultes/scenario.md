# Scénario blind — Prévention des difficultés (conciliation + new money)

> **INPUT BLIND UNIQUEMENT.** Faits fictifs seuls. Le corrigé attendu et les
> criteria iront dans `ground-truth.md` (NE PAS ouvrir en Phase 3). Aucune donnée
> réelle — parties, montants et SIREN fictifs.
>
> **Entry point :** `/h-droit-affaires:prevention-difficultes --orienter ./situation.md`
> **Side :** débiteur (SAS MÉCA-NORD).
> **Code de cycle :** à générer au scoring (Phase 2).

---

## Faits fictifs

```
Entreprise (fictive) :

- MÉCA-NORD — SAS, SIREN-FICTIF-999555111, France métropolitaine, siège à
  Valenciennes (59). Sous-traitant en mécanique de précision pour
  l'automobile, environ 60 salariés. Aucune procédure collective ouverte.

Situation financière (au jour de la consultation) :

- Carnet de commandes en baisse depuis la perte d'un donneur d'ordre majeur
  début 2025. Tension de trésorerie marquée.
- Passif exigible à court terme : ~1,2 M€ (échéances fournisseurs, échéance
  bancaire, dettes fiscales et sociales courantes).
- Actif disponible (trésorerie + créances clients mobilisables à très court
  terme) : ~1,35 M€.
- L'entreprise honore encore ses échéances à leur terme : elle n'a PAS cessé
  ses paiements à ce jour, mais la marge se réduit mois après mois.

Créanciers principaux :

- BANQUE DU HAINAUT — encours de crédit moyen terme : 600 000 €, prochaine
  échéance trimestrielle 80 000 € dans 6 semaines. Position prudente mais
  ouverte à un rééchelonnement.
- FONDERIE LELEU (fournisseur critique de pièces brutes) — 220 000 € de
  factures à échoir sur 3 mois ; menace de suspendre les livraisons.
- Dettes fiscales et sociales courantes : ~180 000 €, à jour mais tendues.

Élément clé — apport envisagé :

- L'actionnaire majoritaire (M. Vandamme) est prêt à apporter 400 000 € de
  trésorerie nouvelle pour passer le creux d'activité, MAIS à condition d'être
  protégé/prioritaire si la situation se dégradait malgré tout vers une
  procédure collective.

Objectif exprimé par le dirigeant :

- Obtenir un accord négocié avec la banque et le fournisseur critique
  (rééchelonnement + maintien des livraisons), sécuriser l'apport de
  l'actionnaire, et le tout sans publicité qui alarmerait clients et salariés.
- Le dirigeant s'interroge aussi sur ce qui se passerait si la banque, au
  dernier moment, refusait de signer alors que les autres créanciers seraient
  d'accord.

Contexte :

- Date d'aujourd'hui (cadre du travail) : 12 février 2026.
- Aucune demande (mandat ad hoc, conciliation) n'a encore été déposée.
```

---

*Cadre : `--orienter`. Sortie attendue dans* `live-output.md`.
