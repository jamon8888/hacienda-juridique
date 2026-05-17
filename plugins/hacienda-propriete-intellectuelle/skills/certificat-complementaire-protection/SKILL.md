---
name: certificat-complementaire-protection
description: >
  Certificats complémentaires de protection (CCP) pour médicaments et produits
  phytopharmaceutiques : éligibilité, calcul de durée, demande INPI, extension
  pédiatrique, lien AMM/brevet, SPC manufacturing waiver. Conforme règlements
  UE 469/2009 (médicaments) et 1610/96 (phyto). Brouillon soumis à validation
  par un mandataire en brevets ou avocat spécialisé pharma.
version: "1.0.0"
authors: ["Hacienda"]
tags: [CCP, SPC, pharma, phyto, AMM, brevet, extension-pediatrique, manufacturing-waiver]
---

# Skill — Certificat complémentaire de protection (CCP)

> **BROUILLON D'ANALYSE ET DE DEMANDE, PAS DÉPÔT EFFECTIF.**
>
> Ce skill analyse l'éligibilité à un CCP, calcule la durée de protection
> complémentaire et prépare le dossier de demande. Le dépôt effectif relève
> du mandataire en brevets (CPI) ou de l'avocat spécialisé.
>
> Les sorties sont des **brouillons**. Validation par un spécialiste pharma/PI obligatoire.

## Examples

<example>
<user>Notre brevet sur un anticorps monoclonal expire en 2028. On a obtenu l'AMM en 2020. Peut-on demander un CCP ?</user>
<response>Analyse éligibilité CCP : brevet en vigueur ✅, AMM valide ✅, produit protégé par le brevet ✅ (à vérifier : le produit de l'AMM est-il couvert par les revendications ?), pas de CCP antérieur pour ce produit ✅, première AMM dans l'UE ? Calcul durée : date AMM (2020) - date dépôt brevet (ex. 2015) - 5 ans = 0 ans, donc CCP = 5 ans max si dépôt > 5 ans avant AMM. Extension pédiatrique (+6 mois) si études pédiatriques complétées.</response>
</example>

<example>
<user>Un générique veut entrer sur le marché. Vérifie si le CCP du princeps est valide et quand il expire.</user>
<response>Vérification CCP : brevet de base valide, AMM de référence, calcul date expiration CCP (max 5 ans après expiration brevet), extension pédiatrique accordée (+6 mois) ?, SPC manufacturing waiver applicable (règlement UE 2019/933) — le générique peut fabriquer pour export ou stockage 6 mois avant expiration CCP.</response>
</example>

---

## Chargement du profil

> Charger les préférences depuis le profil utilisateur :
> - **Secteur pharma/biotech/phyto**
> - **Mandataire en brevets spécialisé life sciences**
> - **Portefeuille brevets pharma existant**

---

## Intake

1. **Mode** — `--eligibility` (analyse éligibilité) / `--apply` (préparation demande) / `--check` (vérification CCP existant)
2. **Type** — médicament (règlement UE 469/2009) / produit phytopharmaceutique (règlement UE 1610/96)
3. **Brevet de base** — numéro, office, date de dépôt, date d'expiration, revendications pertinentes
4. **Produit** — DCI (dénomination commune internationale) ou substance active
5. **AMM** — numéro, date d'octroi, autorité (ANSM/EMA), première AMM dans l'UE ?
6. **Extension pédiatrique** — études pédiatriques complétées ? (règlement UE 1901/2006)
7. **Territoire** — France (INPI) / autres offices nationaux UE
8. **Contexte** — protection du princeps / entrée d'un générique / stratégie de portefeuille

---

## Étape 1 — Conditions d'éligibilité (art. 3 règlement 469/2009)

Les **4 conditions cumulatives** pour obtenir un CCP :

| Condition | Article | Vérification |
|-----------|---------|-------------|
| **(a)** Le produit est protégé par un brevet de base en vigueur | Art. 3(a) | Le produit (substance active ou combinaison) est couvert par les revendications du brevet |
| **(b)** Le produit a obtenu une AMM valide | Art. 3(b) | AMM en vigueur pour mise sur le marché comme médicament |
| **(c)** Le produit n'a pas déjà fait l'objet d'un CCP | Art. 3(c) | Un seul CCP par produit par brevet (pas de double protection) |
| **(d)** L'AMM est la première AMM du produit comme médicament | Art. 3(d) | Première mise sur le marché dans l'UE |

### Jurisprudence CJUE sur l'art. 3(a) — « protégé par un brevet »

| Arrêt | Règle |
|-------|-------|
| **CJUE C-322/10 *Medeva*** (2011) | Le produit doit être « identifié dans le libellé des revendications » du brevet de base |
| **CJUE C-493/12 *Eli Lilly*** (2013) | Les revendications doivent « se rapporter implicitement mais nécessairement » au produit — formule de Markush acceptable |
| **CJUE C-121/17 *Teva v Gilead*** (2018) | Test en deux étapes : (1) le produit relève-t-il nécessairement de l'invention ? (2) identifiable spécifiquement par l'homme du métier à la date de dépôt ? |
| **CJUE C-650/17 *Royalty Pharma*** (2020) | Précise *Teva* : la substance doit être « identifiable de manière spécifique » à la lumière de l'ensemble des éléments divulgués par le brevet |

### Condition (d) — première AMM

- Première AMM **dans l'UE/EEE** (pas mondiale)
- AMM nationale (ANSM) ou centralisée (EMA)
- Attention aux AMM antérieures pour des indications différentes du même produit

---

## Étape 2 — Calcul de la durée du CCP

### Formule (art. 13 règlement 469/2009)

```
Durée CCP = Date première AMM UE − Date dépôt brevet − 5 ans
```

### Plafonds

| Élément | Règle |
|---------|-------|
| Durée maximale du CCP | **5 ans** (art. 13(2)) |
| Si calcul négatif | Pas de CCP (AMM obtenue < 5 ans après dépôt brevet) |
| Extension pédiatrique | **+6 mois** si études pédiatriques complétées (règlement 1901/2006) |
| Durée totale max avec extension | **5 ans + 6 mois** |

### Exemples de calcul

```
Brevet déposé : 1er mars 2010
Première AMM UE : 15 septembre 2018
Expiration brevet : 1er mars 2030

Durée CCP = 15/09/2018 − 01/03/2010 − 5 ans
          = 8 ans 6 mois 14 jours − 5 ans
          = 3 ans 6 mois 14 jours

CCP expire le : 1er mars 2030 + 3 ans 6 mois 14 jours = 15 septembre 2033
Avec extension pédiatrique : 15 mars 2034
```

---

## Étape 3 — Demande de CCP (INPI France)

### Délai de dépôt (art. 7 règlement 469/2009)

| Situation | Délai |
|-----------|-------|
| AMM après délivrance brevet | **6 mois** après la date d'octroi de l'AMM |
| Brevet délivré après AMM | **6 mois** après la date de délivrance du brevet |

⚠️ **Délai impératif — pas de restauration possible.**

### Dossier de demande INPI

| Pièce | Détail |
|-------|--------|
| Formulaire CCP | Formulaire INPI dédié (e-procédures) |
| Copie de l'AMM | Avec date et numéro |
| Si AMM pas la première UE | Indication de la première AMM UE (date + pays + numéro) |
| Numéro du brevet de base | + date de dépôt + date de délivrance |
| Identification du produit | DCI de la substance active |
| Taxes | ~520 € (2025, vérifier barème INPI) |

### Extension pédiatrique

| Condition | Détail |
|-----------|--------|
| Études pédiatriques | PIP (plan d'investigation pédiatrique) complété et approuvé par l'EMA |
| Mention au RCP | Résumé des caractéristiques du produit mis à jour |
| Demande | Avant expiration du CCP |
| Effet | +6 mois sur la durée du CCP |
| Applicable aux génériques ? | Non — le manufacturing waiver couvre déjà les 6 derniers mois |

---

## Étape 4 — SPC Manufacturing Waiver (règlement UE 2019/933)

Depuis le 1er juillet 2019, les fabricants de génériques et biosimilaires peuvent :

| Permission | Condition | Délai |
|-----------|-----------|-------|
| **Fabriquer pour export** hors UE | Notification au titulaire CCP + INPI | Pendant toute la durée du CCP |
| **Fabriquer pour stockage** en UE (day-1 entry) | Notification au titulaire CCP + INPI | Pendant les **6 derniers mois** du CCP |

### Obligations du fabricant générique

- Notification écrite au titulaire du CCP et à l'INPI **au moins 3 mois avant** le début de fabrication
- Marquage « EU export » sur les produits exportés
- Due diligence sur la chaîne d'approvisionnement (pas de réimportation)
- Information de tous les intermédiaires de la chaîne

### Impact pour le titulaire du CCP

- Pas de droit d'opposition (seulement notification)
- Possibilité de contester si les conditions ne sont pas remplies (fabrication hors périmètre, réimportation)
- Surveillance recommandée des notifications reçues

---

## Étape 5 — Format de sortie

```markdown
# Analyse CCP — [PRODUIT / DCI]

*Brouillon soumis à validation mandataire/avocat spécialisé pharma-PI.*

## 1. Brevet de base
[Numéro, office, date dépôt, date expiration, revendications pertinentes]

## 2. Produit et AMM
[DCI, numéro AMM, date, autorité, première AMM UE ?]

## 3. Éligibilité (art. 3)
| Condition | Remplie ? | Analyse |
|-----------|-----------|---------|
| (a) Produit protégé par le brevet | ✅/❌/⚠️ | [analyse revendications — test Teva] |
| (b) AMM valide | ✅/❌ | [statut AMM] |
| (c) Pas de CCP antérieur | ✅/❌ | [vérification registre] |
| (d) Première AMM UE | ✅/❌/⚠️ | [recherche AMM antérieures] |

## 4. Calcul de durée
[Formule + résultat + date expiration CCP + extension pédiatrique si applicable]

## 5. Délai de dépôt
[Date limite — 6 mois après AMM ou délivrance brevet]

## 6. Manufacturing waiver (si pertinent)
[Notifications reçues / risque d'entrée générique]

## 7. Recommandations
[Déposer / Ne pas déposer / Informations manquantes]

## 8. Limites
[Analyse revendications à confirmer par mandataire, AMM à vérifier auprès de l'ANSM/EMA]
```

---

## Gate non-juriste

- [ ] 4 conditions art. 3 vérifiées individuellement
- [ ] Test *Teva* (C-121/17) appliqué pour la condition (a) si substance active complexe
- [ ] Calcul de durée correct (formule art. 13 + plafond 5 ans)
- [ ] Extension pédiatrique évaluée (PIP complété ?)
- [ ] Délai de dépôt vérifié (6 mois — impératif)
- [ ] Manufacturing waiver mentionné si contexte générique
- [ ] Première AMM UE correctement identifiée (pas la première mondiale)

---

## Emplacement des sorties

```
outputs/ccp-<produit-slug>-YYYY-MM-DD.md
```

---

## Ce skill ne fait pas

- Déposer la demande de CCP (acte du mandataire)
- Analyser la brevetabilité de la molécule → utiliser `recherche-anteriorite-brevet`
- Rédiger le brevet pharmaceutique → utiliser `preparation-depot-brevet`
- Évaluer la liberté d'exploitation (FTO) du générique
- Traiter les aspects réglementaires (AMM, pharmacovigilance, prix/remboursement)
- Gérer les litiges CCP (nullité, contrefaçon pendant la durée du CCP)
- Couvrir les CCP pour dispositifs médicaux (pas de régime CCP spécifique)

---

## Ton

Technique, rigoureux, pharma-orienté. La jurisprudence CJUE sur l'art. 3(a) est complexe et évolutive — toujours signaler le niveau d'incertitude. Insister sur le délai de dépôt impératif (6 mois, pas de rattrapage). Distinguer clairement le CCP médicament (469/2009) du CCP phyto (1610/96).
