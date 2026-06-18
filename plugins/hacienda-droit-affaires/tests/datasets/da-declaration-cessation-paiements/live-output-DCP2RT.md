# Sortie live — Déclaration de cessation des paiements (DCP1RT)

> Phase 3 — Exécution live Claude Code natif, sans accès au ground-truth.md.
> Date d'exécution : 2026-06-18.

```
NOTES DE TRAVAIL — Brouillon soumis à validation humaine (avocat) avant tout usage externe.
Profil cabinet non configuré — apposer l'en-tête définitif après /h-da:entretien-demarrage.
```

> **⚠️ Note du relecteur**
>
> - **Sources :** Légifrance ✗ (non connectée ce cycle — articles cités depuis index interne `references/articles-c-civ-c-com-index.md`, marqués `[Légifrance — à confirmer sur PISTE]`) · Judilibre ✗ · Pappers ✗ · BODACC ✗ (pré-procédure — sans objet)
> - **Lecture :** scénario fictif — éléments financiers fournis : trésorerie (12 k€), ligne bancaire (50 k€), créances clients (40 k€/60 j), passif fournisseurs (95 k€ échus), moratoire URSSAF (30 k€/12 mois), échéance impayée (18 k€), emprunt équipement (120 k€, caution 80 k€ M. Marchand). Comptes annuels, situation datée formelle et inventaire : non fournis.
> - **Signalé pour ton jugement :** date de CdP non arrêtée `[review]` ; qualification de la ligne bancaire en réserve de crédit `[review]` ; effet moratoire sur passif exigible `[review]` ; orientation RJ/LJ `[review]` ; possible exigibilité anticipée du capital emprunt suite à l'impayé `[review]` ; exposition caution personnelle `[review]`
> - **Fraîcheur :** jurisprudence Cour de cassation ch. com. sur la date de CdP et l'intégration des réserves de crédit dans l'actif disponible — non vérifiée sur Judilibre ce cycle → `[à vérifier]`
> - **Avant de t'appuyer dessus :** (1) faire établir une situation de trésorerie datée par l'expert-comptable pour confirmer la CdP et arrêter la date ; (2) vérifier si l'impayé de l'échéance bancaire (18 k€) a déclenché une clause d'exigibilité anticipée sur le capital restant (120 k€) — impact direct sur le passif exigible ; (3) soumettre le projet de déclaration à un avocat avant dépôt au greffe.

---

# Qualification de la cessation des paiements (L.631-1 C.com.)

## Actif disponible

| Élément                                           | Montant   | Inclus dans actif disponible ?                                                               |
| --------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------- |
| Trésorerie disponible                              | 12 000 € | ✓                                                                                           |
| Ligne bancaire confirmée par écrit, non utilisée | 50 000 € | ✓ — réserve de crédit (L.631-1 al. 2 `[Légifrance — à confirmer]`) `[review]`     |
| Créances clients                                   | 40 000 € | ✗ — recouvrement à 60 jours, partiellement non échues → non immédiatement réalisables |

**Total actif disponible provisoire : 62 000 €**

## Passif exigible

| Élément                                      | Montant    | Exigible ?                                                                                                                                               |
| ---------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fournisseurs échus (relances + 2 MED reçues) | 95 000 €  | ✓ — échus et réclamés                                                                                                                               |
| URSSAF                                         | 30 000 €  | ✗ — moratoire signé, 12 mensualités à compter du mois prochain → sorti du passif exigible immédiat `[review]`                                   |
| Échéance emprunt bancaire échue et impayée | 18 000 €  | ✓ — échue et impayée                                                                                                                                 |
| Capital restant emprunt équipement            | 120 000 € | ✗ à ce stade — mais `[review]` : vérifier si la clause d'exigibilité anticipée a été activée par l'établissement bancaire suite à l'impayé |

**Total passif exigible provisoire : 113 000 €**

## Résultat gate CdP

**Insuffisance provisoire : 51 000 € (113 000 − 62 000).**

→ Cessation des paiements **probable**. À confirmer par une **situation de trésorerie datée** établie par l'expert-comptable. Ne pas écrire « établie » sur la base de chiffres déclarés oralement et non datés formellement.

> ⚠️ La ligne bancaire de 50 000 € est déterminante : si elle devait être révoquée ou déclarée non disponible à la date exacte de la CdP, l'insuffisance serait de 101 000 €. Vérifier que le courrier de confirmation est toujours en vigueur et non assorti d'une condition suspensive `[review]`.

---

# Statut du délai de déclaration (conditionnel)

**Date de cessation des paiements : non arrêtée.**

Les éléments fournis permettent de situer une fourchette indicative, non une date :

- Premier impayé fournisseur significatif : **~10 semaines** → indice (non la date)
- Mises en demeure : 5 et 3 semaines → indices d'aggravation
- Déclaration M. Marchand : « il y a encore un mois, on pensait s'en sortir » → indice que la CdP perçue pourrait être plus récente (~4 semaines), mais c'est une appréciation subjective du dirigeant

**Fourchette indicative : entre ~4 et ~10 semaines.** À arrêter par l'expert-comptable sur pièces datées. `[à compléter — date exacte à arrêter avec l'expert-comptable]` `[review]`

La date est fixée par le tribunal (report possible jusqu'à 18 mois en arrière, L.631-8 C.com. `[Légifrance — à confirmer]`). Elle est le point de départ de la **période suspecte** (nullités L.632-1/L.632-2 `[Légifrance — à confirmer]`).

**Délai légal : 45 jours à compter de la date de CdP retenue** (L.631-4 C.com. pour RJ / L.640-4 pour LJ `[Légifrance — à confirmer]`). Neutralisé si une conciliation (L.611-4 `[Légifrance — à confirmer]`) a été demandée dans l'intervalle — aucune démarche engagée ici.

**Aucune échéance exacte calculable.** Lecture conditionnelle : si la date de CdP se confirme autour de **10 semaines**, le délai de 45 j serait vraisemblablement **dépassé depuis plusieurs semaines** — à confirmer une fois la date arrêtée. Si la date se confirme autour de **4 semaines**, le délai serait encore en cours ou venant d'expirer. Dans tous les cas, **le dépôt est une obligation à brève échéance** : ne pas temporiser.

> **🔴 Alerte exposition dirigeant (conditionnelle — si délai possiblement dépassé)**
>
> Un dépassement des 45 j exposerait personnellement M. Marchand :
>
> - **Faute de gestion** pouvant justifier une **interdiction de gérer** (art. L.653-8 C.com. `[Légifrance — à confirmer]`)
> - **Action en contribution à l'insuffisance d'actif** (art. L.651-2 C.com. `[Légifrance — à confirmer]`)
> - La **période suspecte** court à rebours depuis la date de CdP : actes passés pendant cette période susceptibles de nullité (L.632-1/L.632-2)
>
> L'**évaluation** de cette responsabilité (faute caractérisée, quantum, moyens de défense, sort de la caution personnelle 80 k€) relève d'un avocat. `[review]`
>
> **Agir sans délai.**

---

# Tribunal compétent et orientation procédurale

**Tribunal compétent : Tribunal de commerce de Tours (37)**

SARL Atelier Boréal = société commerciale (art. L.631-2 C.com. `[Légifrance — à confirmer]`) → compétence du tribunal de commerce. Greffe exact et adresse à confirmer localement `[à vérifier]`.

**Orientation RJ / LJ — sans trancher :**

| Critère                               | Élément disponible                                         |
| -------------------------------------- | ------------------------------------------------------------ |
| Activité encore en cours              | ✓ — atelier au ralenti, deux chantiers en cours            |
| Trésorerie pour poursuivre            | ✗ — plus de trésorerie pour acheter la matière première |
| Carnet de commandes                    | ✓ partiel — mentionné mais non chiffré                   |
| Trésorerie prévisionnelle            | ✗ — non fournie                                            |
| Financement disponible post-procédure | ✗ — non évalué                                           |
| Position du dirigeant                  | Indécise — « sauver la boîte » vs « tout arrêter »   |

**Les données de viabilité (trésorerie prévisionnelle, rentabilité, financement) ne sont pas fournies.** Sans elles, le redressement ne peut être ni confirmé ni exclu.

→ Présenter **les deux voies** au dirigeant :

- **Redressement judiciaire (L.631-1 `[Légifrance — à confirmer]`)** : si un redressement est possible — poursuite d'activité, plan à soumettre au tribunal.
- **Liquidation judiciaire (L.640-1 C.com. `[Légifrance — à confirmer]`)** : si le redressement est manifestement impossible — cession des actifs, fin d'activité.

**C'est le tribunal qui qualifie et décide.** Le dirigeant *demande* l'ouverture. `[review]`

---

# Déclaration de cessation des paiements — projet

```
CONFIDENTIEL — NOTES DE TRAVAIL — Brouillon à valider par un avocat avant dépôt

---

À : Monsieur/Madame le Président
    du Tribunal de commerce de Tours
    [adresse exacte du greffe — à compléter]

Objet : DÉCLARATION DE CESSATION DES PAIEMENTS
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
SITUATION FINANCIÈRE AU [date de la déclaration — à compléter]
─────────────────────────────────────────────

Actif disponible :
  - Trésorerie disponible :                              12 000 €
  - Réserve de crédit (ligne bancaire confirmée) :       50 000 €
  TOTAL ACTIF DISPONIBLE :                               62 000 €
  [à compléter et certifier sur situation datée]

Passif exigible :
  - Dettes fournisseurs échues :                         95 000 €
  - Échéance d'emprunt bancaire échue et impayée :       18 000 €
  TOTAL PASSIF EXIGIBLE :                               113 000 €
  [à compléter et certifier sur situation datée]

Insuffisance :                                           51 000 €
  [à confirmer par une situation de trésorerie datée —
   établie par l'expert-comptable]

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

Cocher la case correspondant à la procédure demandée, après concertation
avec l'avocat conseil.

─────────────────────────────────────────────
ATTESTATION SUR L'HONNEUR
─────────────────────────────────────────────

Je certifie que la société n'a pas fait l'objet d'une demande de mandat
ad hoc ou d'une procédure de conciliation au cours des dix-huit derniers
mois précédant la présente déclaration.
[Si inexact : préciser la nature et la date de la procédure amiable]

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

Fait à Tours, le [date].

Signature :
M. Hervé Marchand
Gérant — SARL Atelier Boréal
(dirigeant de droit habilité)
```

---

# Pièces à joindre (R.631-1 C.com. `[à vérifier — confirmer liste en vigueur sur Légifrance]`)

| #  | Pièce                                                                                                  | Source                    | Statut                                                                                              |
| -- | ------------------------------------------------------------------------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------- |
| 1  | Comptes annuels du dernier exercice                                                                     | client / expert-comptable | `[à compléter]`                                                                                 |
| 2  | Situation de trésorerie datée de moins d'un mois                                                      | expert-comptable          | `[à compléter]` — **priorité absolue**                                                  |
| 3  | **État du passif exigible et de l'actif disponible** établissant la cessation                   | expert-comptable          | `[à compléter]`                                                                                 |
| 4  | État chiffré des créances et des dettes avec noms et domiciles des créanciers                       | client                    | `[à compléter]` — fournisseurs (dont les 2 MED), URSSAF (avec moratoire joint), banque         |
| 5  | État actif et passif des sûretés + engagements hors bilan                                            | client                    | `[à compléter]` — notamment caution personnelle M. Marchand 80 k€ sur emprunt équipement     |
| 6  | Inventaire sommaire des biens                                                                           | client                    | `[à compléter]`                                                                                 |
| 7  | Nombre de salariés (9) + SIREN (812 345 678) + CA dernier exercice                                     | client                    | Partiel — CA `[à compléter]`                                                                   |
| 8  | Nom et adresse des représentants du personnel (CSE)                                                    | client                    | `[à compléter]`                                                                                 |
| 9  | **Attestation sur l'honneur** d'absence de mandat ad hoc / conciliation dans les 18 derniers mois | dirigeant                 | À rédiger et signer                                                                               |
| 10 | Moratoire URSSAF signé                                                                                 | client                    | Disponible — à joindre (justifie la sortie du passif exigible immédiat)                          |
| 11 | Courrier de confirmation de la ligne bancaire (Banque Régionale de l'Ouest)                            | client                    | Disponible — à joindre (justifie l'inclusion dans l'actif disponible)                             |
| 12 | Liste membres tenus indéfiniment/solidairement du passif (si applicable)                               | client                    | `[à vérifier — sans objet pour SARL à responsabilité limitée sauf exceptions]` `[review]` |
| 13 | Documents ICPE si activité classée                                                                    | client                    | `[à vérifier — menuiserie : vérifier si classement ICPE applicable]` `[review]`             |

**Formalités :** chaque pièce doit être **datée, signée et certifiée sincère et véritable** par le gérant. Toute pièce non disponible au dépôt peut être produite dans un délai de **7 jours** `[à vérifier — confirmer sur Légifrance]` ; l'absence ou l'impossibilité doit être **motivée** dans la déclaration.

---

# Une question hors de ma checklist habituelle

**La caution personnelle de M. Marchand (80 000 € sur 120 000 € d'emprunt d'équipement) et l'impayé de l'échéance bancaire (18 000 €) soulèvent deux points non sollicités par la checklist :**

1. **Clause d'exigibilité anticipée :** l'impayé de l'échéance bancaire a-t-il déclenché la déchéance du terme sur le capital restant (120 000 €) ? Si oui, le passif exigible est de 213 000 € (et non 113 000 €), ce qui modifie l'ampleur de l'insuffisance et peut orienter le tribunal vers la LJ. `[review]`
2. **Sort de la caution en procédure collective :** l'ouverture d'un RJ ou d'une LJ n'éteint pas l'obligation de la caution personnelle. La banque pourrait actionner M. Marchand à titre personnel sur 80 000 €. Ce risque personnel est distinct du risque social et doit être évalué séparément par un avocat — notamment au regard des règles de proportionnalité de la caution (art. L.341-4 ancien / L.332-1 C.cons. actuel `[à vérifier]`). `[review]`

---

# Que veux-tu faire ? Choisis une option et je la déroule :

1. **Rédiger** — je complète la déclaration et le bordereau de pièces dès que tu fournis la situation de trésorerie datée, les créanciers exacts, le CA et la décision RJ/LJ.
2. **Escalader** — je rédige une note d'escalade courte vers l'avocat référent : faits-clés, délai conditionnel, exposition dirigeant (caution + L.651-2/L.653-8), décision attendue.
3. **Compléter les faits** — je rédige les questions à poser à l'expert-comptable (situation de trésorerie datée, date de CdP à arrêter sur pièces, état exhaustif des créances/dettes) et à M. Marchand (déchéance du terme bancaire ? position sur RJ/LJ ?).
4. **Surveiller et attendre** — j'ajoute le suivi des 45 j au tracker avec une note motivée et une date de revisite dans 48 h.
5. **Autre** — précise.

---

```
Sources consultées : [connaissance modèle — à vérifier] (articles C.com. et CPC cités depuis index interne)
Citations vérifiées : partiel — mode dégradé, PISTE non connecté ce cycle
Date d'analyse : 2026-06-18
```

---

*Ce skill a traité 6 mentions identifiantes (données fictives — dataset scoring blind Phase 3). Pour anonymiser automatiquement avant envoi à Claude, installer [hacienda-ghost](marketplace://hacienda-ghost).*
