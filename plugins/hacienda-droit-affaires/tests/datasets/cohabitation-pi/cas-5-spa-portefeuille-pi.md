# Cas 5 — SPA M&A avec portefeuille PI dans les actifs cédés

> **Entry point attendu :** `/hacienda-droit-affaires:gap-review` (le doc est un SPA avec GAP — `gap-review` est l'orchestrateur naturel pour M&A léger)
> **Décision de routing attendue :** `gap-review` traite la GAP standard sur les 5 axes + renvoi `contrats-pi` UNIQUEMENT pour la due diligence PI de l'annexe portefeuille (axe 5 confrontation findings DD). PAS de passage par `reviser-contrat`.

---

## Document fictif

```
SHARE PURCHASE AGREEMENT (SPA) — CESSION 100 % DES TITRES

Entre :
- CÉDANT : INNOVTECH HOLDING SAS, SIREN 442910437, représentée par M. Dupont,
  associé unique de la cible.
- ACQUEREUR : MEGA-CORP SA, SIREN 552120222, représentée par Mme Martin.
- CIBLE : INNOVTECH SAS, SIREN 661238947, exerçant une activité d'édition
  de logiciels SaaS B2B (CA 2025 : 4,2 M€, EBITDA : 850 k€).

PRIX DE CESSION : 18 000 000 EUR, payable :
- Closing : 14 400 000 EUR (80 %)
- Earn-out : 3 600 000 EUR sur 24 mois, conditionné à CA 2026-2027

[…]

Article 12 — Périmètre des actifs cédés (titres = 100 % du capital de
INNOVTECH SAS, emportant cession indirecte de tous actifs)

Annexe A — Portefeuille PI de la cible :
- 3 brevets français (procédés d'optimisation algorithmique, dépôts
  2022-2023, validés EP en cours pour 2 d'entre eux)
- 5 marques françaises (marque produit principal + 4 marques secondaires
  par module SaaS)
- 1 marque européenne (UE) déposée 2024, encore en publication
- 12 noms de domaine actifs
- Code source propriétaire (300 000 LoC) + bibliothèques open source
  (audit licences requis — exposition GPL/AGPL à confirmer)
- 1 base de données protégée (sui generis L.341-1+ CPI)

Article 18 — Déclarations et garanties (Reps & Warranties — partie PI)
Le CÉDANT déclare et garantit que :
18.1 — Tous les droits PI listés à l'Annexe A sont la propriété pleine
et entière de la CIBLE, libres de tout privilège, nantissement, licence
exclusive ou option ;
18.2 — Aucune action en contrefaçon, nullité, déchéance ou opposition
n'est en cours ou imminente contre les droits PI listés ;
18.3 — Les marques sont en cours de validité, renouvellements payés
jusqu'à 2027 ;
18.4 — Aucune licence open source obligeant à divulguer le code source
propriétaire (GPL, AGPL, SSPL) n'est intégrée sans isolation technique
vérifiée par un audit indépendant ;
18.5 — Les inventeurs salariés ont signé des accords de cession
conformes à l'art. L.611-7 CPI ; les inventeurs freelance ont signé
des cessions de droits patrimoniaux conformes à L.131-2 CPI.

Article 22 — GAP — Périmètre et mécanique
- Plafond global GAP : 3 600 000 EUR (20 % du prix)
- Plafond fiscal séparé : 900 000 EUR
- Plafond social séparé : 540 000 EUR
- Plafond PI séparé (déclarations art. 18) : 1 800 000 EUR
- Franchise globale (panier) : 90 000 EUR (absolue)
- Durée garantie générale : 24 mois post-closing
- Durée garantie fiscale/sociale : prescription + 3 mois
- Durée garantie PI : 36 mois post-closing (allongée vu sensibilité IP)
- Knowledge qualifier : best knowledge sur déclarations 18.2 et 18.4
  (à challenger acquéreur — voir option de gap-review)
- Garantie de la garantie : caution bancaire 1 200 000 EUR pendant 24 mois

Article 25 — Procédure de mise en jeu
- Notification : LRAR au CÉDANT dans les 30 jours de la connaissance
- Délai contestation : 30 jours
- Mode de règlement : compensation sur earn-out en priorité, séquestre
  CARPA si insuffisant
- Juridiction : TC Paris ; arbitrage CMAP optionnel sur volets fiscaux
  > 500 k€

Article 26 — Rapport de due diligence
Annexé un rapport de DD du 12 mai 2026 (cabinet AUDIT-CO) identifiant :
- Finding DD-04 : exposition GPL via une bibliothèque embedded — 🟠
  matériel — quantification 350 k€ (coût de rachat / réécriture)
- Finding DD-07 : 1 brevet (n° FR 21 12345) en opposition INPI
  (déposante tierce APIX SA) — 🔴 matériel — quantification non
  chiffrée
- Finding DD-11 : 2 marques (verbales) déchues pour défaut d'usage
  réel sur 1 classe (classe 38) — 🟡 — quantification 25 k€
```

---

## Vérité terrain

### Routing attendu

`gap-review` doit :

1. **Traiter la GAP sur les 5 axes** (périmètre, mécanique financière, procédure, clauses sensibles side-dependent, confrontation findings DD)
   - Axe 1 — Périmètre : OK (titres = 100 %, déclarations PI structurées)
   - Axe 2 — Mécanique : plafond global 20 % cible acquéreur, plafond PI séparé 1,8 M€ (10 % du prix) — pertinent vu portefeuille IP. Durée PI 36 mois — plus longue que standard 24 (justifié)
   - Axe 3 — Procédure : standard
   - Axe 4 — Clauses sensibles : best knowledge sur 18.2 / 18.4 → 🟠 acquéreur (best knowledge sur licences open source est faible — auditeur indépendant cité mais audit non joint)
   - Axe 5 — Confrontation findings DD : **3 findings à confronter aux garanties**

2. **Pour l'axe 5 ET POUR LUI SEUL** : renvoyer vers `contrats-pi` avec mention :
   - « 3 findings DD ont une dimension PI matérielle (DD-04 exposition GPL, DD-07 opposition INPI, DD-11 déchéance marques). La couverture par les déclarations art. 18 et le plafond PI 1,8 M€ doit être confrontée à fond — recommandation : lancer `/hacienda-propriete-intellectuelle:contrats-pi --mode=dd-audit` sur l'annexe A + l'article 18 pour évaluation détaillée (recherche d'antériorités, vérification statut brevet en opposition, audit licences open source). `gap-review` couvre l'arbitrage économique de la couverture (plafonds, durées) — `contrats-pi` couvre la qualification technique de la matérialité. »

3. **NE PAS** passer par `reviser-contrat` — un SPA n'est pas un contrat commercial standard, l'entry point M&A est `gap-review`.

### Justification doctrinale

Un SPA avec GAP appartient à l'orchestration M&A. `reviser-contrat` est calibré pour des contrats commerciaux (CGV, distribution, bail, prestation, NDA commercial) — pas pour le coeur M&A. Renvoyer un SPA vers `reviser-contrat` produirait une analyse clause par clause hors contexte (la mécanique GAP, le plafond, la franchise ne sont pas dans le playbook de `reviser-contrat`).

`gap-review` est l'orchestrateur naturel : il sait calibrer côté cédant/acquéreur, il gère la matrice clauses sensibles GAP, il confronte les findings DD. Mais il **n'est pas spécialisé PI** — il ne sait pas évaluer la matérialité d'une opposition INPI ni qualifier l'exposition GPL. D'où le renvoi `contrats-pi` ciblé sur les 3 findings et l'annexe A.

### Critères de succès

- [ ] `gap-review` analyse les 5 axes complets sans déléguer à un autre skill
- [ ] Sortie inclut le banner statut + résumé exécutif + analyse par axe + liste de points + recommandation Accepter/Négocier/Refuser
- [ ] Axe 5 produit le tableau de gap analysis (Finding DD | Sévérité | Garantie applicable | Couvert ? | Recommandation)
- [ ] Axe 5 mentionne explicitement le renvoi `contrats-pi` POUR la qualification technique des 3 findings
- [ ] Plafond PI séparé 1,8 M€ correctement analysé (suffisant vu DD-07 non quantifié ? À challenger)
- [ ] Best knowledge sur 18.2/18.4 flaggé 🟠 (perte de garantie côté acquéreur)
- [ ] **PAS** de routing intermédiaire par `reviser-contrat`

### Faux routing critique à NE PAS observer

- ❌ `gap-review` route vers `reviser-contrat` (mauvais entry point M&A → mauvais skill aval)
- ❌ `gap-review` ignore le volet PI et traite les findings DD-04/07/11 comme génériques sans renvoi PI
- ❌ `gap-review` délègue 100 % vers `contrats-pi` sans faire son propre travail GAP (perte arbitrage économique plafond/durée/franchise)
- ❌ Aucun renvoi PI sur axe 5 — l'utilisateur ne sait pas qu'il devrait faire un audit PI ciblé
