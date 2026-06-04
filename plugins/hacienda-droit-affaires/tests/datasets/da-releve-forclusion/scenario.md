# Scénario blind — Relevé de forclusion L.622-26 (mode --releve-forclusion)

> **INPUT BLIND UNIQUEMENT.** Faits fictifs seuls. Le corrigé attendu et les
> criteria iront dans `ground-truth.md` (NE PAS ouvrir en Phase 3). Aucune donnée
> réelle — parties, montants et SIREN fictifs.
>
> **Entry point :** `/h-droit-affaires:declaration-creance --releve-forclusion ./faits.md`
> **Side :** créancier (SARL TRANSPORTS DELANNOY).
> **Code de cycle :** à générer au scoring (Phase 2).

---

## Faits fictifs

```
Parties (fictives) :

- TRANSPORTS DELANNOY — SARL, SIREN-FICTIF-777222888, France métropolitaine,
  siège à Amiens (80). Transporteur routier de marchandises.
- AGRO-PRIM NÉGOCE — SAS, SIREN-FICTIF-888444999, France métropolitaine,
  siège à Beauvais (60). Négoce de produits agricoles. Cliente de DELANNOY
  pour des prestations de transport régulières en 2024-2025.

Procédure collective contre AGRO-PRIM NÉGOCE :

- Liquidation judiciaire : Tribunal de commerce de Beauvais, jugement du
  6 janvier 2026.
- Publication au BODACC : annonce parue le 13 janvier 2026 (BODACC A,
  référence fictive « 20260113-BBB-0117 »).
- Liquidateur (mandataire judiciaire) désigné : Me Philippe ROUSSEAU,
  10 rue de la République, 60000 Beauvais (coordonnées fictives).

Créance de DELANNOY :

- Prestations de transport facturées et impayées : 3 factures de septembre à
  novembre 2025, total 18 750,00 € TTC, toutes échues avant le jugement
  d'ouverture (créances antérieures).
- Marchandises livrées, prestations exécutées, aucune contestation.

Ce qui s'est passé :

- DELANNOY n'a PAS déclaré sa créance dans le délai de 2 mois suivant la
  publication BODACC (échéance théorique : 13 mars 2026).
- Motif : AGRO-PRIM n'a jamais informé DELANNOY de l'ouverture de la
  liquidation, et — élément central — n'a PAS porté TRANSPORTS DELANNOY sur
  la liste de ses créanciers remise au liquidateur lors de l'ouverture
  (DELANNOY l'a appris fortuitement en avril 2026 en relançant pour paiement).
- DELANNOY n'avait aucune autre source d'information sur la procédure
  (pas d'avis du liquidateur, créance non listée).

Contexte :

- Date d'aujourd'hui (cadre du travail) : 20 avril 2026.
- DELANNOY souhaite savoir s'il peut encore agir et, si oui, obtenir une
  requête pour récupérer sa créance.
- Aucune déclaration ni requête n'a encore été déposée.
```

---

*Cadre : `--releve-forclusion`. Sortie attendue dans* `live-output.md`.
