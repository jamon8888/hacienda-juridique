# Scénario blind — Audit de data-room (due diligence M&A)

> **INPUT BLIND UNIQUEMENT.** Ce fichier ne contient que les faits fictifs.
> Le corrigé attendu et les criteria sont dans `ground-truth.md` (NE PAS ouvrir
> en Phase 3). Aucune donnée réelle — parties, montants et chiffres fictifs.
>
> **Entry point :** `/h-droit-affaires:due-diligence-dataroom ./dataroom/ --side=acquereur --seuil-materialite=50000`
> **Side :** acquéreur (MERIDIAN CAPITAL SAS). Seuil de matérialité : 50 000 €.

---

## Faits fictifs — inventaire de la data-room

```
Opération (fictive) : acquisition de 100 % des actions de VIRIDIS SOFTWARE SAS
(éditeur de logiciels SaaS, France métropolitaine, environ 90 salariés) par
MERIDIAN CAPITAL SAS. Le conseil relit côté acquéreur. Seuil de matérialité
fixé à 50 000 EUR.

La data-room communiquée contient les documents suivants (contenus fictifs) :

=== DOC 01 — Statuts + table de capitalisation (corporate) ===
- SAS au capital de 200 000 EUR. Les statuts comportent une clause d'agrément
  de toute cession d'actions par la collectivité des associés.
- Table de capitalisation : fondateurs 62 %, fonds d'amorçage 30 %, managers 8 %.
- Un plan de BSPCE a été attribué à 6 salariés clés (représentant 9 % du capital
  en cas d'exercice intégral) ; la table de capitalisation fournie n'intègre pas
  cette dilution potentielle.

=== DOC 02 — Procès-verbal d'AG 2025 (corporate / gouvernance) ===
- AG annuelle du 30 juin 2025 approuvant les comptes 2024.
- Une convention conclue en 2024 entre la Société et la holding d'un dirigeant
  (prestations de conseil, 120 000 EUR/an) est mentionnée mais ne figure pas au
  rapport sur les conventions réglementées et n'a pas été soumise à l'approbation
  de la collectivité des associés.
- Les comptes 2024 n'ont pas été déposés au greffe à la date de la data-room.

=== DOC 03 — Contrat client « ALPHA » (contrats) ===
- Contrat-cadre représentant environ 40 % du chiffre d'affaires de la Cible.
- Clause de changement de contrôle : le client peut résilier de plein droit en
  cas de changement de contrôle de la Société, sans indemnité.
- Durée : tacite reconduction annuelle ; préavis de résiliation 3 mois.

=== DOC 04 — Note contentieux et passifs (contentieux / fiscal / social) ===
- Contrôle URSSAF en cours : redressement notifié de 300 000 EUR portant sur la
  requalification du forfait-jours de 20 cadres (accord collectif jugé non
  conforme), contesté par la Société.
- Litige commercial : un ancien distributeur réclame 150 000 EUR pour rupture de
  relation commerciale établie ; assignation délivrée, audience non fixée.
- Un salarié titulaire d'un mandat de représentant du personnel (salarié protégé)
  fait l'objet d'une procédure de licenciement en cours.

=== DOC 05 — Propriété intellectuelle / logiciel (PI) ===
- Le cœur de la plateforme SaaS a été développé en 2022 par un prestataire
  freelance ; aucune convention de cession des droits d'auteur sur le logiciel
  n'a été retrouvée dans la data-room.
- La plateforme intègre des composants open source sous licence copyleft (GPL) ;
  aucune analyse de conformité open source n'est fournie.
- La marque « VIRIDIS » est utilisée dans la communication mais n'a fait l'objet
  d'aucun dépôt à l'INPI.

=== DOC 06 — Conformité RGPD (rgpd) ===
- La Société traite des données personnelles de clients et d'utilisateurs finaux.
- Le registre des activités de traitement est incomplet ; aucun délégué à la
  protection des données (DPO) n'a été désigné.
- Une violation de données (fuite d'une base d'e-mails clients) survenue en 2024
  n'a pas fait l'objet d'une notification à la CNIL.

Date d'aujourd'hui (cadre du travail) : 25 septembre 2026.
Un rapport de due diligence structuré est demandé avant la négociation du SPA et
de la GAP.
```

---

*Cadre : `--side=acquereur --seuil-materialite=50000`, 7 thèmes ; sortie attendue dans* `live-output.md`.
*(Le code de cycle est généré au moment du scoring, hors de ce fichier blind.)*
