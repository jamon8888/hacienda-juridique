# Sortie live — Déclaration de cessation des paiements (DCP2RT)

> Phase 3 — Exécution live Claude Code natif (claude-sonnet-4-6), sans accès au ground-truth.md.
> Date d'exécution : 2026-06-19.

`NOTES DE TRAVAIL — Faire valider par avocat avant tout usage externe`
`Profil cabinet non configuré ([A CONFIGURER]) — apposer l'en-tête définitif après /h-da:entretien-demarrage`

---

> **⚠️ Note du relecteur**
> - **Sources :** Légifrance ✗ (PISTE non connecté — articles cités `[connaissance modèle — à vérifier]`) · Judilibre ✗ · Pappers ✗ · BODACC ✗ (pré-procédure — sans objet)
> - **Lecture :** éléments financiers fournis par le scénario : trésorerie (12 k€), ligne bancaire confirmée (50 k€), créances clients (40 k€ / 60 j), fournisseurs échus (95 k€ + 2 MED), moratoire URSSAF (30 k€ / 12 mois à compter du mois prochain), échéance emprunt impayée (18 k€), capital emprunt équipement (120 k€, caution personnelle M. Marchand 80 k€). Aucun compte annuel, aucune situation de trésorerie datée formelle, aucun inventaire.
> - **Signalé pour ton jugement :** date de CdP non arrêtée `[review]` ; inclusion ligne bancaire dans actif disponible `[review]` ; effet du moratoire URSSAF sur passif exigible `[review]` ; risque déchéance du terme emprunt équipement `[review]` ; orientation RJ/LJ `[review]` ; exposition caution personnelle `[review]`
> - **Fraîcheur :** jurisprudence ch. com. sur date de CdP et réserves de crédit non vérifiée (Judilibre indisponible) — vérifier arrêts < 3 ans `[à vérifier]`
> - **Avant de t'appuyer dessus :** (1) faire établir une situation de trésorerie datée par l'expert-comptable pour confirmer la CdP et arrêter la date ; (2) vérifier si l'impayé de l'échéance bancaire (18 k€) a déclenché une clause de déchéance du terme sur le capital restant (120 k€) — impact direct sur le passif exigible et l'orientation procédurale ; (3) soumettre le projet de déclaration à un avocat avant tout dépôt au greffe

---

> **Pré-flight PII (check-pii) :**
> Catégorie A : ~5 identifiants (M. Hervé Marchand, Atelier Boréal, SIREN 812 345 678, Tours).
> Catégorie B atteinte : montants nominatifs > 10 000 € en contexte identifiant (12 k€, 40 k€, 50 k€, 95 k€, 30 k€, 18 k€, 120 k€, 80 k€).
> **Politique PII : active (profil non configuré → défaut).** En données réelles, un prompt de confirmation serait affiché avant envoi. Données explicitement fictives (dataset scoring blind Phase 3) → traitement poursuivi sans blocage.

---

## 1. Qualification de la cessation des paiements (L.631-1)

### Actif disponible

| Élément | Montant | Inclus dans actif disponible ? |
|---|---|---|
| Trésorerie disponible (solde bancaire) | 12 000 € | ✓ |
| Ligne bancaire confirmée par écrit, non utilisée | 50 000 € | ✓ — réserve de crédit (L.631-1 al. 2 `[connaissance modèle — à vérifier]`) `[review]` |
| Créances clients | 40 000 € | ✗ — recouvrement à 60 jours, non immédiatement disponibles |

**Total actif disponible : 62 000 €**

> La ligne bancaire est incluse car confirmée par écrit (courrier Banque Régionale de l'Ouest, mois dernier). Si cette ligne était révoquée ou conditionnée à la date exacte de la CdP, l'actif disponible tomberait à 12 000 € et l'insuffisance serait de 101 000 €. Vérifier que le courrier est toujours valide et sans condition suspensive.

### Passif exigible

| Élément | Montant | Exigible ? |
|---|---|---|
| Fournisseurs (factures échues, relances, 2 MED reçues) | 95 000 € | ✓ — échus et réclamés |
| URSSAF | 30 000 € | ✗ — moratoire signé, 12 mensualités à compter du mois prochain → exclu du passif exigible immédiat `[review]` |
| Emprunt bancaire — échéance échue et impayée | 18 000 € | ✓ — échue et impayée |
| Emprunt équipement — capital restant | 120 000 € | ✗ à ce stade — terme non prononcé ; **risque de déchéance du terme** vu l'impayé `[review]` |

**Total passif exigible (strict) : 113 000 €**

> **Caveat moratoire URSSAF :** les 30 000 € sortent du passif exigible **tant que le moratoire est honoré**. Un défaut sur une seule mensualité les rend à nouveau immédiatement exigibles — ce qui porterait le passif exigible à 143 000 € et l'insuffisance à 81 000 €.
>
> **Caveat déchéance du terme :** l'impayé de 18 000 € sur l'échéance bancaire peut déclencher une clause de déchéance du terme sur le capital restant (120 000 €). Si prononcée, le passif exigible atteindrait 233 000 €, ce qui renforcerait très significativement la caractérisation de la CdP et orienterait vers la LJ. À vérifier dans le contrat de prêt.

### Bilan — Cessation des paiements **probable**

**Insuffisance provisoire : 113 000 − 62 000 = 51 000 €** `[review]`

Cessation des paiements **probable** au sens de l'art. L.631-1 C.com. `[connaissance modèle — à vérifier]` — **non établie** : les chiffres sont déclaratifs, sans situation de trésorerie datée formelle. Ne pas écrire « établie » avant confirmation par l'expert-comptable.

**Voie préventive — à maintenir ouverte :** si la situation de trésorerie datée n'établit pas la CdP (par exemple parce que la ligne bancaire et le moratoire suffisent effectivement à couvrir le passif), la procédure à privilégier est la **sauvegarde ou une mesure amiable** (mandat ad hoc, conciliation L.611-4 `[connaissance modèle — à vérifier]`) → `/h-da:prevention-difficultes`. La conciliation reste accessible tant qu'il n'y a pas CdP depuis plus de 45 jours — souvent préférable au dépôt de bilan (pas de publication BODACC à l'ouverture, plus grande souplesse).

---

## 2. Statut du délai de déclaration (conditionnel)

### Date de cessation des paiements — non arrêtée

La date de CdP est celle à laquelle l'actif disponible est devenu insuffisant pour couvrir le passif exigible. Elle est fixée par le tribunal (report possible jusqu'à 18 mois en arrière, L.631-8 C.com. `[connaissance modèle — à vérifier]`). C'est le point de départ de la **période suspecte** (nullités L.632-1 / L.632-2 `[connaissance modèle — à vérifier]`).

**Éléments fournis (indices, non la date) :**

| Élément | Valeur | Rôle |
|---|---|---|
| Premier impayé fournisseur significatif | ~10 semaines | Indice — non la date de CdP |
| Mises en demeure reçues | 5 et 3 semaines | Indices d'aggravation |
| Perception de M. Marchand | « il y a encore un mois, on pensait s'en sortir » | Appréciation subjective — non constitutive de la date |

**Date retenue : [à compléter — date exacte à arrêter avec l'expert-comptable sur pièces datées]** `[review]`

Fourchette indicative (hypothétique) : entre 4 et 10 semaines avant le 2026-06-19, soit entre le 10 avril et le 15 mai 2026 — **sous réserve de confirmation par la situation de trésorerie datée**.

### Délai légal de 45 jours

45 jours à compter de la date réelle de CdP — art. L.631-4 C.com. (RJ) / L.640-4 C.com. (LJ) `[connaissance modèle — à vérifier]`. Neutralisé si une conciliation (L.611-4) a été demandée dans l'intervalle. **Aucune démarche engagée ici → délai non neutralisé.**

**Aucune échéance exacte calculable tant que la date n'est pas arrêtée.**

Lecture conditionnelle :
- Si CdP autour de **10 semaines (~70 jours)** : délai vraisemblablement **dépassé d'environ 25 jours** — à confirmer.
- Si CdP autour de **4-5 semaines (~30-35 jours)** : délai en cours ou venant d'expirer — urgence immédiate.
- Dans tous les cas : **dépôt = obligation à brève échéance, ne pas temporiser**.

---

### ⚠️ Alerte exposition dirigeant — si délai possiblement dépassé (conditionnel) `[review]`

Un dépassement des 45 j exposerait **personnellement M. Hervé Marchand** :

- **Interdiction de gérer** (art. L.653-8 C.com. `[connaissance modèle — à vérifier]`) — sanction pour faute de gestion ayant contribué au préjudice.
- **Action en contribution à l'insuffisance d'actif** (art. L.651-2 C.com. `[connaissance modèle — à vérifier]`) — mise en cause patrimoniale personnelle.
- **Période suspecte** courant depuis la date de CdP : actes passés depuis lors susceptibles de nullité (L.632-1 / L.632-2).

Le risque se cristallise surtout en cas d'**omission consciente de déclarer** alors qu'**aucune conciliation (L.611-4) n'a été demandée** — situation exacte de M. Marchand. La demande de conciliation, même tardive si le délai n'est pas encore dépassé, neutralise le délai et atténue le reproche.

**Action immédiate recommandée :** M. Marchand doit **documenter la chronologie** (dates précises des premiers impayés, moment de prise de conscience de la cessation, démarches amiables tentées) — c'est la pièce maîtresse de sa défense.

L'**évaluation** de cette responsabilité (faute caractérisée, quantum, moyens de défense, sort des cautions) relève d'un avocat. Ce skill nomme, il n'évalue pas. **Agir sans délai.**

---

## 3. Tribunal compétent

**Tribunal de commerce de Tours (37)**

SARL Atelier Boréal = société commerciale (SARL) → Tribunal de commerce `[connaissance modèle — à vérifier]` (art. L.631-2 C.com. `[connaissance modèle — à vérifier]`). Confirmer l'adresse exacte et les modalités de dépôt au greffe du TC de Tours.

---

## 4. Orientation RJ / LJ (sans trancher)

| Critère | Élément disponible |
|---|---|
| Activité en cours | ✓ — atelier au ralenti, deux chantiers en cours |
| Trésorerie opérationnelle | ✗ — plus de fonds pour acheter la matière première |
| Carnet de commandes | Mentionné mais non chiffré |
| Trésorerie prévisionnelle | Non fournie |
| Financement post-procédure | Non évalué |
| Position du dirigeant | Indécise — « sauver la boîte » vs « tout arrêter » |
| Données de viabilité | Absentes — conditions du RJ non évaluables |

Les données de viabilité (trésorerie prévisionnelle, financement disponible, rentabilité, carnet chiffré) sont absentes. Sans elles, le redressement ne peut être ni confirmé ni exclu.

→ Présenter **les deux voies** :
- **Redressement judiciaire (L.631-1 `[connaissance modèle — à vérifier]`)** : si un redressement est possible — activité poursuivie, plan soumis au tribunal.
- **Liquidation judiciaire (L.640-1 C.com. `[connaissance modèle — à vérifier]`)** : si le redressement est manifestement impossible — cession des actifs, fin d'activité.

**C'est le tribunal qui qualifie et décide.** Le dirigeant *demande* l'ouverture de la procédure. `[review]`

---

## 5. Déclaration de cessation des paiements — projet

> Livrable externe : retirer l'en-tête de confidentialité dans la version déposée au greffe ; conserver la note du relecteur dans le dossier interne.

---

```
À : Monsieur/Madame le Président
    du Tribunal de commerce de Tours
    [adresse exacte du greffe à compléter]

OBJET : DÉCLARATION DE CESSATION DES PAIEMENTS
        DEMANDE D'OUVERTURE D'UNE PROCÉDURE DE [REDRESSEMENT / LIQUIDATION]
        JUDICIAIRE

Je soussigné, M. Hervé Marchand, gérant de la SARL Atelier Boréal,
immatriculée au Registre du commerce et des sociétés sous le numéro
812 345 678, ayant son siège social à [adresse complète — à compléter],
Tours (37),

déclare que la société se trouve en état de cessation des paiements au
sens de l'article L.631-1 du Code de commerce, étant dans l'impossibilité
de faire face à son passif exigible avec son actif disponible.

─────────────────────────────────────────────
SITUATION FINANCIÈRE À LA DATE DE LA DÉCLARATION
─────────────────────────────────────────────

Actif disponible :
  - Trésorerie disponible :                         12 000 €
  - Réserve de crédit (ligne bancaire confirmée) :  50 000 €
  TOTAL ACTIF DISPONIBLE :                          62 000 €
  [à compléter et certifier sur situation de trésorerie datée]

Passif exigible :
  - Dettes fournisseurs échues :                    95 000 €
  - Échéance emprunt bancaire échue et impayée :    18 000 €
  TOTAL PASSIF EXIGIBLE :                          113 000 €
  [à compléter et certifier sur situation datée]

Insuffisance :                                       51 000 €
  [à confirmer par situation de trésorerie datée — expert-comptable]

─────────────────────────────────────────────
DATE DE CESSATION DES PAIEMENTS
─────────────────────────────────────────────

[à compléter — date exacte à arrêter avec l'expert-comptable
 sur la base des pièces comptables datées] [review]

─────────────────────────────────────────────
PROCÉDURE DEMANDÉE
─────────────────────────────────────────────

[ ] Redressement judiciaire (art. L.631-4 C.com.)
[ ] Liquidation judiciaire (art. L.640-4 C.com.)

[Cocher après concertation avec l'avocat]

─────────────────────────────────────────────
INFORMATIONS COMPLÉMENTAIRES
─────────────────────────────────────────────

Forme sociale :          SARL
SIREN :                  812 345 678
Secteur d'activité :     Menuiserie d'agencement
Nombre de salariés :     9
Chiffre d'affaires
  (dernier exercice) :   [à compléter — €]
Représentants du
  personnel (CSE) :      [nom et adresse — à compléter]

─────────────────────────────────────────────
ATTESTATION SUR L'HONNEUR
─────────────────────────────────────────────

Je certifie sur l'honneur que la société SARL Atelier Boréal n'a pas
fait l'objet d'une demande de mandat ad hoc ou de l'ouverture d'une
procédure de conciliation au cours des dix-huit mois précédant la
présente déclaration.
[Si inexact : préciser la nature et la date de la procédure amiable.]

Conformément à l'art. R.631-1 du Code de commerce [à vérifier], les
pièces listées au bordereau ci-annexé sont jointes à la présente
déclaration. Elles sont datées, signées et certifiées sincères et
véritables. Les pièces non disponibles à ce jour seront produites dans
le délai réglementaire [à vérifier — 7 jours selon R.631-1] ; leur
absence est motivée au bordereau.

Fait à Tours, le [date].

Signature :
M. Hervé Marchand
Gérant — SARL Atelier Boréal
(dirigeant de droit habilité)
```

---

## 6. Pièces à joindre (R.631-1 C.com. `[à vérifier — confirmer liste en vigueur sur Légifrance]`)

| # | Pièce | Source | Statut |
|---|---|---|---|
| 1 | Comptes annuels du dernier exercice | client / expert-comptable | `[à compléter]` |
| 2 | Situation de trésorerie datée de moins d'un mois | expert-comptable | `[à compléter]` — **priorité absolue** |
| 3 | **État du passif exigible et de l'actif disponible** établissant la cessation | expert-comptable | `[à compléter]` |
| 4 | État chiffré des créances et dettes avec noms et domiciles des créanciers | client | `[à compléter]` — fournisseurs (dont 2 MED), URSSAF, banque |
| 5 | État actif et passif des sûretés + engagements hors bilan | client | `[à compléter]` — dont caution personnelle M. Marchand (80 k€ sur emprunt équipement) |
| 6 | Inventaire sommaire des biens (matériel, stocks, outillage) | client | `[à compléter]` |
| 7 | Nombre de salariés (9) + SIREN (812 345 678) + CA dernier exercice | client | Partiel — CA `[à compléter]` |
| 8 | Nom et adresse des représentants du personnel (CSE) | client | `[à compléter]` — vérifier seuil CSE (11 salariés `[à vérifier]`) |
| 9 | **Attestation sur l'honneur** d'absence de mandat ad hoc / conciliation dans les 18 derniers mois | M. Marchand | À rédiger et signer |
| 10 | Courrier de confirmation ligne bancaire (Banque Régionale de l'Ouest) | client | Disponible — à joindre (justifie l'inclusion dans actif disponible) |
| 11 | Moratoire URSSAF signé | client | Disponible — à joindre (justifie la sortie du passif exigible immédiat) |
| 12 | Liste des membres tenus solidairement / indéfiniment du passif | client | `[à vérifier — sans objet SARL sauf exception]` `[review]` |
| 13 | Documents ICPE si activité classée | client | `[à vérifier — menuiserie : vérifier classification ICPE]` `[review]` |

**Formalités :** chaque pièce doit être **datée, signée et certifiée sincère et véritable** par le gérant. Toute pièce non disponible au dépôt peut être produite dans un **délai de 7 jours** `[à vérifier — R.631-1]` ; toute absence ou impossibilité doit être **motivée** dans la déclaration.

---

## Une question hors de ma checklist habituelle

**La caution personnelle de M. Marchand (80 000 €) crée une asymétrie procédurale à connaître avant de choisir entre RJ et LJ :**

L'ouverture d'un RJ suspend les poursuites contre les cautions personnes physiques dirigeantes pendant la **période d'observation** (art. L.622-28 C.com. `[connaissance modèle — à vérifier]`) — protection temporaire de M. Marchand. En revanche, l'ouverture d'une LJ n'offre pas ce bouclier : la banque peut actionner la caution sans attendre la clôture de la procédure. Ce paramètre plaide pour le RJ au moins dans un premier temps, indépendamment de la viabilité de l'activité — mais il relève d'une appréciation avocat. `[review]`

---

## Que veux-tu faire ? Choisis une option et je la déroule :

1. **Rédiger** — je complète la déclaration et le bordereau R.631-1 dès que tu fournis la situation de trésorerie datée, la liste exhaustive des créanciers, le CA et la décision RJ/LJ.
2. **Escalader** — je rédige une note d'escalade courte vers l'avocat référent : faits-clés, délai conditionnel (possiblement dépassé), exposition personnelle M. Marchand (caution 80 k€ + L.651-2/L.653-8), décision attendue (orientation + date de CdP).
3. **Compléter les faits** — je rédige les questions à soumettre à l'expert-comptable (situation de trésorerie datée, date de CdP à arrêter sur pièces, état exhaustif créances/dettes, carnet de commandes chiffré, trésorerie prévisionnelle) et à M. Marchand (déchéance du terme activée par la banque ? données de viabilité ?).
4. **Surveiller et attendre** — j'ajoute le suivi des 45 j au tracker avec une note motivée et une date de revisite dans 48 h dès que la date de CdP est arrêtée.
5. **Autre** — précise.

---

```
Sources consultées : [connaissance modèle — à vérifier] (articles C.com. et CPC cités depuis mémoire modèle — PISTE non connecté)
Citations vérifiées : non — mode dégradé
Date d'analyse : 2026-06-19
```

---

*Ce skill a traité ~5 mentions identifiantes et des montants nominatifs > 10 000 € (catégorie B). Données explicitement fictives (dataset scoring blind Phase 3). Pour anonymiser automatiquement avant envoi à Claude en données réelles, installer [hacienda-ghost](marketplace://hacienda-ghost).*
