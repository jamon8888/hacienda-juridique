---
name: contentieux-pi
description: >
  Stratégie et suivi de contentieux PI judiciaire : action en contrefaçon (brevet,
  marque, D&M, auteur), référé-interdiction, action en nullité/déchéance, concurrence
  déloyale/parasitisme, procédures TJ Paris 3e chambre. Tracker multi-affaires,
  échéances procédurales, matrices de décision. Brouillon soumis à validation avocat.
version: "1.0.0"
authors: ["Hacienda"]
tags: [contentieux, contrefacon, refere, nullite, TJ-Paris, concurrence-deloyale, strategie]
---

# Skill — Contentieux PI judiciaire

> **ANALYSE STRATÉGIQUE ET SUIVI, PAS ACTE DE PROCÉDURE.**
>
> Ce skill prépare la **stratégie contentieuse**, structure le dossier et assure
> le suivi des échéances. Il ne rédige pas les actes de procédure eux-mêmes
> (assignation, conclusions, requêtes) qui relèvent de l'avocat constitué.
>
> Les sorties sont des **brouillons**. Validation avocat obligatoire.

## Examples

<example>
<user>On veut assigner en contrefaçon de brevet devant le TJ Paris. Prépare la stratégie contentieuse.</user>
<response>Stratégie contentieuse brevet TJ Paris 3e chambre : vérification recevabilité (qualité, titre valide, prescription L.615-8), choix procédural (référé-interdiction L.615-3 + fond, ou fond seul), estimation durée (18-36 mois fond), budget prévisionnel, risque reconventionnel en nullité (L.613-25), calcul préjudice (3 méthodes L.615-7), échéances procédurales, matrice de décision go/no-go.</response>
</example>

<example>
<user>Un concurrent nous assigne en contrefaçon de marque. Quelle stratégie de défense ?</user>
<response>Stratégie défense : analyse recevabilité adverse (qualité, prescription), moyens de défense (absence risque confusion L.713-3, tolérance 5 ans L.716-4-5, usage descriptif L.713-6, épuisement L.713-4), action reconventionnelle en nullité (L.716-5) ou déchéance pour non-usage (L.714-5), demande reconventionnelle en concurrence déloyale/parasitisme (1240 CC), estimation risque condamnation et provision.</response>
</example>

---

## Chargement du profil

> Charger les préférences depuis le profil utilisateur :
> - **Avocat contentieux PI référent**
> - **Posture contentieuse** (agressive / mesurée / défensive)
> - **Budget contentieux annuel**
> - **Tribunal habituel** (TJ Paris 3e chambre PI)
> - **Historique contentieux** (si portefeuille existant)

---

## Intake

1. **Mode** — `--attack` (demandeur) ou `--defense` (défendeur)
2. **Type d'action** — contrefaçon / nullité / déchéance / concurrence déloyale / référé / combinaison
3. **Droit PI** — brevet / marque / D&M / droit d'auteur / pluralité de droits
4. **Parties** — demandeur(s), défendeur(s), intervenants éventuels
5. **Juridiction** — TJ Paris (PI), autres TJ, EUIPO (administratif), CA Paris
6. **Stade** — pré-contentieux / assignation prévue / procédure en cours / appel
7. **Preuves disponibles** — saisie-contrefaçon effectuée ? constats ? achats-test ?
8. **Urgence** — référé demandé/en cours ? mesures provisoires ?
9. **Objectif** — cessation / indemnisation / transaction / nullité du titre adverse

---

## Étape 1 — Qualification de l'action

### Actions principales en PI

| Action | Fondement | Tribunal | Prescription | Particularités |
|--------|-----------|----------|-------------|----------------|
| **Contrefaçon brevet** | L.615-1 à L.615-8 CPI | TJ Paris exclusif | 5 ans (L.615-8) | Expert judiciaire fréquent |
| **Contrefaçon marque** | L.716-1 à L.716-15 CPI | TJ Paris exclusif | 5 ans (L.716-14) | Risque de confusion central |
| **Contrefaçon D&M** | L.521-1 à L.521-8 CPI | TJ Paris exclusif | 5 ans (L.521-3) | Impression globale |
| **Contrefaçon droit auteur** | L.335-2 à L.335-10 CPI | TJ Paris (non exclusif) | 5 ans civil / 6 ans pénal | Originalité à prouver |
| **Nullité brevet** | L.613-25 CPI | TJ Paris exclusif | Imprescriptible | 5 motifs limitatifs |
| **Nullité marque** | L.716-5 CPI | TJ Paris ou INPI | Imprescriptible (sauf tolérance 5 ans) | Motifs absolus + relatifs |
| **Déchéance marque (non-usage)** | L.714-5 CPI | TJ Paris ou INPI | Après 5 ans sans usage sérieux | Charge de la preuve inversée |
| **Concurrence déloyale** | Art. 1240 CC | TJ du lieu du dommage | 5 ans (2224 CC) | Subsidiaire ou cumulatif |
| **Parasitisme** | Art. 1240 CC | TJ du lieu du dommage | 5 ans (2224 CC) | Pas besoin de risque confusion |

### Compétence exclusive TJ Paris

Depuis 2009 (décret n° 2009-1205), le TJ Paris a compétence exclusive en France pour :
- Brevets (L.615-17)
- Marques de l'Union européenne (art. 123 RMUE)
- Dessins et modèles communautaires (art. 80 RDMC)
- Indications géographiques
- Obtentions végétales

Les marques françaises et le droit d'auteur : TJ Paris comp��tent mais non exclusif.

---

## Étape 2 — Analyse de recevabilité

### Conditions de recevabilité (demandeur)

| Condition | Vérification | Conséquence si défaut |
|-----------|-------------|----------------------|
| Qualité pour agir | Titulaire inscrit ou licencié exclusif habilité | Irrecevabilité (fin de non-recevoir) |
| Titre valide | Brevet/marque/D&M en vigueur, annuités payées | Irrecevabilité / nullité reconventionnelle |
| Prescription | < 5 ans depuis les faits (pas depuis la connaissance) | Irrecevabilité partielle ou totale |
| Intérêt à agir | Préjudice allégué | Rarement contesté en PI |
| Mise en demeure préalable | Non obligatoire mais recommandée | Impact sur article 700 |

### Moyens de défense (défendeur)

| Moyen | Fondement | Type |
|-------|-----------|------|
| Irrecevabilité (qualité/prescription) | Art. 122 CPC | Fin de non-recevoir |
| Nullité du titre (reconventionnelle) | L.613-25 / L.716-5 | Moyen de défense |
| Déchéance non-usage (marques) | L.714-5 (5 ans sans usage sérieux) | Reconventionnelle |
| Absence de contrefaçon | Analyse technique/impression globale | Fond |
| Épuisement des droits | L.613-6 / L.713-4 / L.513-8 | Fond |
| Droit de possession personnelle antérieure | L.613-7 / L.513-6 | Fond |
| Exception d'usage descriptif | L.713-6 (marques) | Fond |
| Licence / autorisation | Contrat de licence valide | Fond |
| Tolérance 5 ans (marques) | L.716-4-5 (connaissance + inaction) | Fin de non-recevoir |

---

## Étape 3 — Stratégie procédurale

### Arbre décisionnel (demandeur)

```
Urgence ? (atteinte en cours, dommage irréparable, salon imminent)
├── OUI → Référé-interdiction (L.615-3 / L.716-6 / L.521-6 / L.336-1)
│   ├── Assignation en référé (délai court)
│   ├── Mesures : cessation sous astreinte + rappel + provision
│   └── PUIS assignation au fond (indemnisation complète)
├── NON → Fond direct
│   ├── Assignation au fond TJ Paris
│   ├── Mise en état (12-24 mois selon complexité)
│   │   ├── Conclusions en demande
│   │   ├── Conclusions en défense
│   │   ├── Réplique + duplique
│   │   ├── Expert judiciaire (si technique — brevets)
│   │   └���─ Clôture + plaidoiries
│   └── Jugement (3-6 mois post-audience)
└── TRANSACTION PRÉFÉRÉE
    ├── Mise en demeure + négociation
    ├── Médiation (CMAP Paris, Centre de médiation INPI)
    └── Protocole transactionnel (cessation + indemnité + licence)
```

### Estimation de durée et coûts

| Procédure | Durée moyenne | Coût indicatif (avocat) |
|-----------|--------------|------------------------|
| Référé-interdiction | 2-4 mois | 10-30 k€ |
| Fond TJ Paris (brevet simple) | 18-30 mois | 50-150 k€ |
| Fond TJ Paris (brevet complexe + expert) | 30-48 mois | 100-300 k€ |
| Fond TJ Paris (marque) | 12-24 mois | 30-80 k€ |
| Appel CA Paris | 12-18 mois | 30-80 k€ |
| Médiation/transaction | 2-6 mois | 10-30 k€ |
| Opposition INPI (marque) | 6-12 mois | 5-15 k€ |

---

## Étape 4 — Calcul du préjudice

### Trois méthodes (directive 2004/48/CE — L.615-7, L.716-14, L.521-7)

| Méthode | Calcul | Application |
|---------|--------|-------------|
| **Conséquences économiques négatives** | Manque à gagner + perte subie + préjudice moral | Méthode principale — preuve ventes perdues |
| **Bénéfices du contrefacteur** | CA contrefaçon × marge attribuable à la PI | Si ventes perdues difficiles à prouver |
| **Redevance hypothétique** | Licence que le contrefacteur aurait dû payer | Forfaitaire — plancher minimum |

### Postes complémentaires

- Érosion des prix (concurrence illégitime forçant des rabais)
- Préjudice moral / atteinte à l'image (marque de luxe, design iconique)
- Frais engagés (saisie-contrefaçon, constats, expertise privée)
- Publication judiciaire (valeur dissuasive et réparatrice)
- Banalisation du signe distinctif / du design

### Article 700 CPC

En PI, les articles 700 accordés sont généralement significatifs (10-50 k€ en brevets, 5-15 k€ en marques).

---

## Étape 5 — Tracker multi-affaires

```markdown
# Tracker contentieux PI — [CABINET / ENTITÉ]

| # | Affaire | Droit | Mode | Tribunal | Stade | Prochaine échéance | Avocat | Risque | Budget |
|---|---------|-------|------|----------|-------|-------------------|--------|--------|--------|
| 1 | [nom] | Brevet | Attack | TJ Paris | Mise en état | Conclusions 15/06 | Me X | 🟡 | 80k€ |
| 2 | [nom] | Marque | Defense | TJ Paris | Audience | Plaidoiries 20/07 | Me Y | 🔴 | 40k€ |
| ... | ... | ... | ... | ... | ... | ... | ... | ... | ... |

## Échéances critiques (30 prochains jours)
| Date | Affaire | Action requise | Responsable |
|------|---------|---------------|-------------|
| [date] | [affaire] | [action] | [nom] |
```

---

## Étape 6 — Matrice de décision go/no-go

```markdown
## Matrice go/no-go — [AFFAIRE]

| Critère | Score (1-5) | Commentaire |
|---------|-------------|-------------|
| Solidité du titre | [1-5] | [validité, risque nullité reconventionnelle] |
| Force des preuves | [1-5] | [saisie-contrefaçon, constats, achats-test] |
| Contrefaçon caractérisée | [1-5] | [similitude / impression globale / équivalence] |
| Solvabilité du défendeur | [1-5] | [capacité à payer une indemnisation] |
| Préjudice quantifiable | [1-5] | [ventes perdues, marge, redevance] |
| Rapport coût/bénéfice | [1-5] | [budget contentieux vs. indemnisation espérée] |
| Risque reconventionnel | [1-5] | [nullité, déchéance, dommages-intérêts] |
| Impact business/stratégique | [1-5] | [dissuasion, précédent, marché] |

**Score total : [X]/40**

| Score | Recommandation |
|-------|---------------|
| 30-40 | ✅ GO — Action fortement recommandée |
| 20-29 | ⚠️ GO conditionnel — Procéder si budget confirmé et risque accepté |
| 10-19 | 🟡 Transaction préférée — Négocier plutôt qu'assigner |
| < 10 | 🔴 NO-GO — Risque trop élevé, abandonner ou alternative (mise en demeure seule) |
```

---

## Format de sortie

```markdown
# Stratégie contentieuse PI — [NOM AFFAIRE]

*Brouillon soumis à validation avocat. Ne constitue pas un acte de procédure.*

## 1. Qualification
[Type d'action, droit concerné, parties, tribunal compétent]

## 2. Recevabilité
[Analyse qualité, prescription, titre valide]

## 3. Fond
[Analyse contrefaçon / nullité / concurrence déloyale selon le cas]

## 4. Stratégie procédurale
[Référé + fond / Fond direct / Transaction — arbre décisionnel]

## 5. Préjudice (estimation)
[Méthode retenue, postes, fourchette]

## 6. Matrice go/no-go
[Score + recommandation]

## 7. Budget et calendrier
[Estimation co��ts + durée + échéances clés]

## 8. Risques
[Reconventionnelle, débouté, coûts, médiatisation]

## 9. Recommandation finale
[GO / NO-GO / Transaction — avec justification]
```

---

## Gate non-juriste

- [ ] Type d'action correctement qualifié (contrefaçon / nullité / déchéance / CD)
- [ ] Recevabilité analysée (qualité, prescription, titre valide)
- [ ] Compétence territoriale vérifiée (TJ Paris exclusif si brevet/MUE/DMC)
- [ ] Stratégie procédurale argumentée (référé vs fond vs transaction)
- [ ] Préjudice estimé selon les 3 méthodes (directive 2004/48/CE)
- [ ] Matrice go/no-go complétée
- [ ] Budget et durée estimés de manière réaliste
- [ ] Risque reconventionnel évalué (nullité, déchéance, dommages-intérêts)
- [ ] Délais procéduraux identifiés (mise en état, expert, clôture)

---

## Emplacement des sorties

```
outputs/contentieux-pi-<affaire-slug>-YYYY-MM-DD.md
```

---

## Ce skill ne fait pas

- Rédiger les actes de procédure (assignation, conclusions, requêtes)
- Représenter en justice (monopole de l'avocat)
- Préparer la saisie-contrefaçon → utiliser `saisie-contrefacon`
- Qualifier la contrefaçon en détail → utiliser les skills spécialisés par droit
- Rédiger la mise en demeure → utiliser `mise-en-demeure-pi`
- Gérer l'opposition INPI → utiliser `analyse-opposition-marque`
- Traiter la médiation/arbitrage en détail
- Exécuter les décisions (signification, liquidation d'astreinte)

---

## Ton

Stratégique, décisionnel, chiffré. Toujours mettre en regard le coût de l'action et le bénéfice attendu. Distinguer clairement le juridique (fondement, chances de succès) du business (intérêt stratégique, dissuasion). Rappeler que les actes de procédure sont réservés à l'avocat. Signaler les délais impératifs.
