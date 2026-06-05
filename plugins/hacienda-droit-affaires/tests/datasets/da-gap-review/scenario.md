# Scénario blind — Revue de GAP (garantie d'actif et de passif)

> **INPUT BLIND UNIQUEMENT.** Ce fichier ne contient que les faits fictifs.
> Le corrigé attendu et les criteria sont dans `ground-truth.md` (NE PAS ouvrir
> en Phase 3). Aucune donnée réelle — parties, montants et chiffres fictifs.
>
> **Entry point :** `/h-droit-affaires:gap-review ./faits.md`
> **Side :** acquéreur (NOVA EQUITY SAS).

---

## Faits fictifs

```
Opération (fictive) :

- Acquéreur : NOVA EQUITY SAS, France métropolitaine (fonds buy-side).
- Cédants : DELMAS PARTICIPATIONS SAS (holding familiale, majoritaire) et deux
  personnes physiques (M. A et Mme B), ces deux derniers étant dirigeants
  opérationnels restant en poste après la cession.
- Cible : TECHNOR INDUSTRIE SAS, PME industrielle (mécanique de précision),
  France métropolitaine, environ 120 salariés, un site de production classé
  ICPE soumis à autorisation.
- Objet : cession de 100 % des actions de la Cible. Prix : 18 000 000 EUR.
- Signing : 15 septembre 2026. Closing visé : 30 novembre 2026.
- Le conseil qui relit agit pour l'acquéreur.

Extraits de la convention de garantie d'actif et de passif (GAP) annexée au
projet de SPA (extraits fictifs) :

Article G.1 — Objet et date de référence
  Les Cédants garantissent l'exactitude des déclarations figurant en Annexe 1
  à la date du signing. La garantie prend effet à la date de signature du
  présent contrat. Les éléments révélés à l'Acquéreur entre le signing et le
  closing sont réputés connus de lui.

Article G.2 — Exclusions et information
  Ne donnent pas lieu à indemnisation les faits divulgués dans la data-room et,
  de manière générale, tout élément dont l'Acquéreur avait ou aurait pu avoir
  connaissance. Une disclosure letter complémentaire pourra être remise au plus
  tard le jour du closing.

Article G.3 — Articulation avec les garanties légales
  La présente garantie est exclusive de toute autre garantie. Les Parties
  conviennent que les garanties légales du vendeur sont écartées dans toute la
  mesure permise.

Article G.4 — Plafond et franchise
  L'indemnisation totale due par les Cédants au titre de la présente garantie
  est plafonnée à 10 % du prix de cession, toutes causes confondues, y compris
  les passifs fiscaux et sociaux. Aucune indemnisation n'est due tant que le
  montant cumulé des réclamations n'atteint pas 350 000 EUR ; en deçà de ce
  seuil, aucune somme n'est due et, au-delà, l'indemnisation est limitée au
  montant excédant ce seuil.

Article G.5 — Durée
  La garantie générale expire 12 mois après le closing. Aucune stipulation
  particulière n'est prévue pour les matières fiscale, sociale ou
  environnementale.

Article G.6 — Connaissance du cédant
  Les déclarations sont consenties « à la connaissance des Cédants ». Les
  Cédants ne garantissent pas les faits dont ils n'avaient pas connaissance à
  la date du signing.

Article G.7 — Mise en jeu et règlement
  Toute réclamation est notifiée aux Cédants. Les Cédants disposent d'un délai
  de 8 jours pour contester ; à défaut, la réclamation est réputée acceptée.
  Le paiement intervient directement entre les mains de l'Acquéreur. Aucun
  séquestre ni garantie bancaire n'est constitué. Tout litige est soumis à
  l'arbitrage selon le règlement d'une chambre arbitrale.

Article G.8 — Non-concurrence des Cédants
  Les Cédants s'interdisent toute activité concurrente de la Cible pendant
  5 ans, en France et à l'étranger, sans contrepartie spécifique.

Findings de due diligence communiqués à l'acquéreur (rapport DD synthétique) :

- DD-1 : contentieux fiscal en cours — redressement TVA notifié au titre des
  exercices 2024-2025, montant en principal 620 000 EUR, contesté par la Cible.
- DD-2 : litige prud'homal en cours intenté par un salarié protégé (membre du
  CSE), demande estimée 180 000 EUR.
- DD-3 : site de production ICPE — un arrêté préfectoral de mise en demeure
  (mise en conformité d'un bassin de rétention) daté de 2025 n'a pas encore
  été entièrement exécuté ; coût de mise en conformité estimé 400 000 EUR.
- DD-4 : non-conformité RGPD — registre des traitements incomplet, absence de
  DPO désigné alors que l'activité le justifie probablement.

Date d'aujourd'hui (cadre du travail) : 1er septembre 2026.
La revue de la GAP est demandée avant la finalisation du SPA.
```

---

*Cadre : `--side=acquereur`, `--dd-findings` fournis ci-dessus ; sortie attendue dans* `live-output.md`.
*(Le code de cycle est généré au moment du scoring, hors de ce fichier blind.)*
