---
name: audit-pi-ma
description: >
  Audit de propriété intellectuelle dans le cadre de fusions-acquisitions (M&A) :
  due diligence PI côté acquéreur ou vendeur. Inventaire multi-actifs (marques, brevets,
  D&M, droit d'auteur, savoir-faire, noms de domaine), analyse de risques, valorisation
  indicative, findings cotés par sévérité. Brouillon soumis à validation par un avocat.
version: "1.0.0"
authors: ["Hacienda"]
tags: [audit, due-diligence, M&A, valorisation, portefeuille, risques, transaction]
---

# Skill — Audit PI pour fusions-acquisitions (M&A)

> **RAPPORT D'AUDIT PRÉPARATOIRE, PAS OPINION JURIDIQUE FORMELLE.**
>
> Ce skill produit un **rapport de due diligence PI** structuré pour une transaction
> M&A (acquisition, fusion, investissement, joint venture). Il identifie les actifs PI,
> évalue les risques et produit des findings cotés par sévérité. Il ne remplace pas
> l'opinion formelle d'un avocat spécialisé ni l'évaluation financière par un expert
> en valorisation d'actifs immatériels.
>
> Les sorties sont des **brouillons**. Elles nécessitent validation par un avocat
> et, pour la valorisation, par un expert financier.

## Examples

<example>
<user>On rachète une startup SaaS. Fais l'audit PI pour la due diligence côté acquéreur.</user>
<response>Audit PI acquéreur : inventaire actifs (marques, noms de domaine, logiciel/code source, brevets éventuels, savoir-faire), vérification titularité (cessions salariés L.113-9, freelances L.131-3, co-fondateurs), chaîne de droits, encumbrances (licences concédées, nantissements), risques open source (licences copyleft dans stack), contentieux PI en cours ou menaçants, findings cotés Critical/High/Medium/Low, recommandations closing conditions et reps & warranties.</response>
</example>

<example>
<user>Prépare la data room PI côté vendeur pour la cession de notre division cosmétiques.</user>
<response>Rapport vendeur : inventaire portefeuille PI (marques FR/UE/internationales, brevets formulation, D&M packaging, secrets de fabrication), statut de chaque titre (en vigueur, annuités à jour, pas d'opposition pendante), clean-up recommandé avant mise en data room (renouvellements à anticiper, inscriptions manquantes au registre, titularité à régulariser), format data room index conforme market practice.</response>
</example>

---

## Chargement du profil

> Charger les préférences depuis le profil utilisateur :
> - **Rôle habituel en M&A** (acquéreur / vendeur / conseil des deux côtés)
> - **Secteur dominant des cibles** (tech/SaaS, pharma/biotech, luxe/mode, industrie)
> - **Volume de transactions PI par an**
> - **Outil de data room** (Intralinks, Datasite, DiliTrust, Notion, SharePoint)

---

## Intake

1. **Mode** — `--buyer` (due diligence acquéreur) ou `--seller` (préparation data room vendeur)
2. **Transaction** — type (acquisition 100%, acquisition partielle, fusion, investissement minoritaire, JV, asset deal vs share deal)
3. **Cible** — identité, secteur, pays d'établissement, taille (startup / PME / ETI / grand groupe)
4. **Périmètre PI à auditer** — tous actifs ou limité (marques seules, brevets seuls, etc.)
5. **Documents disponibles** — data room ouverte / registres publics seuls / Q&A en cours
6. **Juridictions critiques** — pays où la cible exploite ou est protégée
7. **Délai** — date de closing prévue / urgence de la due diligence
8. **Objectif spécifique** — identification des deal-breakers / valorisation / clean-up pré-cession

---

## Étape 1 — Inventaire des actifs PI

### Catégories d'actifs à recenser

| Catégorie | Sources de vérification | Points critiques |
|-----------|------------------------|-----------------|
| **Marques** | Registres INPI/EUIPO/OMPI, portefeuille interne | Titularité, renouvellements, classes couvertes, usage effectif |
| **Brevets** | Registres INPI/OEB/USPTO/OMPI, familles INPADOC | Titularité, annuités, validité, revendications clés, liberté d'exploitation |
| **Dessins et modèles** | Registres INPI/EUIPO/OMPI La Haye | Titularité, renouvellements, DMCNE (3 ans, non vérifiable) |
| **Droit d'auteur** | Contrats de cession, registres (APP), code source | Titularité (salariés L.113-9, freelances L.131-3, co-fondateurs) |
| **Logiciel** | Code source, dépôts APP/Soleau, SBOM | Licences open source, titularité, dépendances critiques |
| **Noms de domaine** | WHOIS, registrars | Titularité, renouvellements, correspondance avec marques |
| **Savoir-faire / secrets d'affaires** | Inventaire interne, NDA, procédures de protection | Qualification L.151-1 C.com (secret + valeur + mesures raisonnables) |
| **Données / bases de données** | Contrats, politique données, registres | Protection sui generis L.341-1, RGPD, licences d'accès |
| **Noms commerciaux / enseignes** | K-bis, registres du commerce | Antériorité, usage effectif, territorialité |

### Format inventaire

```markdown
| # | Actif | Type | Territoire | N° enregistrement | Date | Échéance | Statut | Titulaire inscrit | Observations |
|---|-------|------|-----------|-------------------|------|----------|--------|-------------------|--------------|
| 1 | [nom] | Marque FR | France | [n°] | [date dépôt] | [date renouvellement] | ✅ En vigueur / ⚠️ À renouveler / 🔴 Expiré | [entité] | [notes] |
```

---

## Étape 2 — Analyse de la chaîne de titularité

### Vérifications critiques

| Vérification | Risque si défaut | Gravité |
|-------------|-----------------|---------|
| Cessions salariés → employeur (logiciel L.113-9) | Employeur non titulaire | 🔴 Critical |
| Cessions freelances / prestataires (L.131-3 : 5 conditions) | Cession nulle = créateur titulaire | 🔴 Critical |
| Cessions co-fondateurs (apport en société) | Co-fondateur parti = cotitulaire externe | 🔴 Critical |
| Inscription des cessions au registre (brevets L.613-9, marques L.714-7) | Inopposabilité aux tiers | 🟡 High |
| Chaîne complète (cédant → ... → cible) | Maillon manquant = vice de titularité | 🔴 Critical |
| Inventions de salariés (L.611-7) | Attribution contestable (mission vs hors mission) | 🟡 High |
| Clauses PI dans contrats commerciaux (sous-traitants, agences) | PI créée par tiers non transférée | 🟡 High |

### Checklist titularité par type

**Logiciel/Code source :**
- [ ] Tous les développeurs (salariés) ont un contrat de travail mentionnant L.113-9
- [ ] Tous les freelances/prestataires ont un contrat avec cession L.131-3 conforme
- [ ] Les co-fondateurs ont apporté leur PI à la société (acte d'apport ou PV AG)
- [ ] Le SBOM identifie les dépendances open source et leurs licences
- [ ] Pas de code copyleft (GPL/AGPL) dans les composants propriétaires critiques

**Marques :**
- [ ] Titulaire inscrit au registre = entité cible (pas une personne physique du fondateur)
- [ ] Transferts antérieurs inscrits (si rachat ou restructuration passée)
- [ ] Usage effectif dans les 5 dernières années (pas de risque déchéance L.714-5)

**Brevets :**
- [ ] Inventeur déclaré ≠ problème (invention de salarié correctement attribuée)
- [ ] Annuités payées dans tous les pays de la famille
- [ ] Pas de copropriété non contractualisée (L.613-29 à L.613-32)

---

## Étape 3 — Analyse des risques et encumbrances

### Risques par catégorie

| Catégorie de risque | Vérification | Impact deal |
|--------------------|--------------|-------------|
| **Contentieux en cours** | Actions en contrefaçon (demandeur ou défendeur), oppositions | Provisions / deal-breaker |
| **Licences concédées** | Licences exclusives limitant l'exploitation post-acquisition | Réduction de valeur |
| **Nantissements / sûretés** | Brevets ou marques nantis au profit de créanciers | Lever le nantissement avant closing |
| **Engagements de non-concurrence** | Clauses PI dans accords antérieurs limitant l'exploitation | Périmètre restreint |
| **Risque open source** | Copyleft (GPL/AGPL) dans le code propriétaire | Obligation de divulgation source |
| **Contrefaçon par la cible** | Produits de la cible contrefaisant des tiers | Indemnisation / retrait produit |
| **Contrefaçon contre la cible** | Tiers contrefaisant la cible (valeur du portefeuille) | Opportunité d'enforcement |
| **Titres expirés / à renouveler** | Marques/brevets/DM proches de l'échéance | Perte de protection |
| **Gaps de protection** | Marchés clés non couverts par les titres | Investissement complémentaire |

### Cotation des findings

| Sévérité | Critère | Action |
|----------|---------|--------|
| 🔴 **Critical** | Deal-breaker potentiel : titularité non établie, contentieux > 1M€, copyleft dans code cœur | Condition suspensive ou walk-away |
| 🟠 **High** | Risque significatif : inscriptions manquantes, cessions incomplètes, renouvellement imminent | Reps & warranties + indemnité spécifique |
| 🟡 **Medium** | Risque modéré : gaps géographiques, licences concédées non stratégiques | Ajustement de prix / plan de remédiation |
| 🟢 **Low** | Observation : best practice non suivie, documentation incomplète | Recommandation post-closing |

---

## Étape 4 — Valorisation indicative

> ⚠️ **La valorisation financière précise relève d'un expert en évaluation d'actifs
> immatériels (norme ISO 10668 pour les marques, méthodes DCF/relief-from-royalty
> pour les brevets). Ce skill fournit uniquement des indicateurs qualitatifs.**

### Facteurs de valeur par type d'actif

| Actif | Facteurs positifs (+) | Facteurs négatifs (-) |
|-------|----------------------|----------------------|
| Marques | Notoriété, distinctivité forte, usage multi-territoire, revenus licences | Risque nullité, déchéance non-usage, faible distinctivité |
| Brevets | Revendications larges, famille multi-pays, revenus licences, position FTO bloquante | Proche expiration, revendications étroites, art antérieur destructeur |
| Logiciel | Code propriétaire cœur de l'offre, pas de dépendance copyleft, titularité clean | Dépendances copyleft, titularité incertaine, dette technique |
| Savoir-faire | Mesures de protection effectives, valeur commerciale prouvée, non-reconstituable | Secret mal protégé (pas de NDA, turnover équipe), facilement reconstitué |
| D&M | Design iconique, multi-territoire, pas d'antériorité | Proche expiration 25 ans, caractère individuel faible |

### Méthodes d'évaluation (résumé)

| Méthode | Principe | Usage |
|---------|----------|-------|
| Relief-from-royalty | Économie de redevances si la PI était licenciée | Marques, brevets |
| Excess earnings | Bénéfices attribuables à la PI (au-delà du rendement tangible) | Portefeuille global |
| Cost approach | Coût de reconstitution de la PI | Savoir-faire, logiciel |
| Market approach | Transactions comparables | Si données marché disponibles |
| Income approach (DCF) | Flux futurs actualisés attribuables à la PI | Brevets stratégiques |

---

## Étape 5 — Recommandations transactionnelles

### Buyer side (`--buyer`)

| Finding | Protection contractuelle recommandée |
|---------|-------------------------------------|
| Titularité incertaine | Rep & warranty + indemnité spécifique + escrow |
| Contentieux en cours | Provision estimée + indemnité spécifique + walk-away si jugement défavorable |
| Inscriptions manquantes | Condition suspensive : inscription avant closing |
| Renouvellements imminents | Obligation vendeur de renouveler avant closing |
| Risque open source | Audit technique complet (SCA scan) + rep & warranty code propriétaire |
| Gaps de protection | Ajustement de prix ou plan de dépôts post-closing |

### Seller side (`--seller`)

| Recommandation pre-closing | Objectif |
|----------------------------|---------|
| Régulariser les inscriptions registres | Opposabilité + crédibilité |
| Renouveler les titres proches d'échéance | Pas de perte de droits pendant la transaction |
| Compléter les cessions manquantes (freelances, co-fondateurs) | Chaîne de titularité propre |
| Préparer l'index data room PI | Faciliter la DD et accélérer le closing |
| Résoudre les contentieux pendants (transaction si possible) | Supprimer les contingent liabilities |
| Auditer le SBOM et nettoyer les dépendances copyleft | Éviter un finding critique côté acquéreur |

---

## Étape 6 — Format de sortie

```markdown
# Rapport d'audit PI — [NOM CIBLE] — [TYPE TRANSACTION]

*Brouillon soumis à validation. Ne constitue pas une opinion juridique formelle.*
*Valorisation indicative — ne remplace pas une évaluation par expert financier.*

## 1. Contexte et périmètre
[Transaction, parties, périmètre PI audité, sources consultées, date de l'audit]

## 2. Inventaire des actifs PI
[Tableau multi-actifs — cf. Étape 1]

## 3. Analyse de titularité
[Chaîne de droits par catégorie — cf. Étape 2]

## 4. Findings
| # | Sévérité | Catégorie | Actif | Description | Recommandation |
|---|----------|-----------|-------|-------------|----------------|
| 1 | 🔴 Critical | Titularité | Logiciel X | Cession co-fondateur absente | Condition suspensive |
| 2 | 🟠 High | Inscription | Brevet Y | Non inscrit au RNB | Inscription avant closing |
| ... | ... | ... | ... | ... | ... |

## 5. Synthèse des risques
[Résumé : N findings Critical, N High, N Medium, N Low]
[Deal-breakers identifiés ou non]

## 6. Valorisation indicative
[Facteurs qualitatifs par actif — cf. Étape 4]

## 7. Recommandations transactionnelles
[Conditions suspensives / Reps & warranties / Indemnités / Ajustement prix / Walk-away]

## 8. Plan de remédiation post-closing
[Actions à mener après la transaction pour sécuriser le portefeuille]

## 9. Limites de l'audit
[Documents non fournis, registres non consultés, valorisation indicative uniquement]
```

---

## Gate non-juriste

- [ ] Inventaire multi-actifs complet (marques + brevets + D&M + auteur + logiciel + savoir-faire + noms de domaine)
- [ ] Chaîne de titularité vérifiée pour chaque catégorie critique
- [ ] Findings cotés par sévérité (Critical / High / Medium / Low)
- [ ] Risque open source évalué (si composante logiciel)
- [ ] Contentieux en cours ou menaçants identifiés
- [ ] Formalités d'inscription vérifiées (RNB, RNM, EUIPO)
- [ ] Recommandations transactionnelles actionables (reps & warranties, conditions suspensives)
- [ ] Limites de l'audit clairement signalées

---

## Emplacement des sorties

```
outputs/audit-pi-ma-<cible-slug>-YYYY-MM-DD.md
```

---

## Ce skill ne fait pas

- Fournir une opinion juridique formelle (acte d'avocat)
- Évaluer financièrement les actifs PI (expert en valorisation d'actifs immatériels)
- Rédiger les clauses M&A (SPA, reps & warranties) → utiliser `contrats-pi` pour le volet PI du SPA
- Réaliser l'audit technique du code source (SCA scan) → renvoi vers outil technique (Black Duck, Snyk, FOSSA)
- Gérer la data room (logistique documentaire)
- Auditer les aspects non-PI (social, fiscal, environnemental, compliance)
- Traiter les problématiques de contrôle des concentrations (droit de la concurrence M&A)

---

## Ton

Technique, synthétique, orienté décision. Les findings doivent être cotés et actionables. Distinguer clairement ce qui est un deal-breaker de ce qui est un risque gérable. Toujours rappeler les limites (documents non fournis, valorisation indicative). Adapter le niveau de détail au délai de la transaction.
