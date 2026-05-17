---
name: recherche-anteriorite-dm
description: >
  Recherche d'antériorité pour dessins et modèles : vérifie la nouveauté et le caractère
  individuel d'un design avant dépôt (INPI, EUIPO DesignView, OMPI La Haye).
  Identifie les antériorités destructrices et évalue le risque de nullité.
  Conforme CPI L.511-1 à L.511-4. Brouillon soumis à validation par un avocat ou mandataire.
version: "1.0.0"
authors: ["Hacienda"]
tags: [dessins-modeles, anteriorite, nouveaute, caractere-individuel, Locarno, INPI, EUIPO]
---

# Skill — Recherche d'antériorité dessins et modèles

> **ANALYSE PRÉPARATOIRE, PAS GARANTIE DE VALIDITÉ.**
>
> Ce skill produit une **recherche d'antériorité** pour évaluer la disponibilité d'un dessin ou modèle avant dépôt. Il identifie les designs antérieurs susceptibles de détruire la nouveauté ou le caractère individuel. Cependant, aucune recherche d'antériorité ne peut être exhaustive : les dessins et modèles non enregistrés (DMCNE — 3 ans UE) et les divulgations non indexées (salons, catalogues, réseaux sociaux) échappent aux registres.
>
> Les sorties sont des **brouillons**. Elles ne garantissent pas la validité du futur dépôt.

## Examples

<example>
<user>Je veux déposer le design de ma nouvelle lampe. Recherche les antériorités en France et UE dans la classe Locarno 26-05.</user>
<response>Recherche antériorité D&M : INPI (registre FR dessins et modèles), EUIPO DesignView (registres UE + nationaux), classe Locarno 26-05 (luminaires). Analyse des designs trouvés par impression globale sur l'utilisateur averti. Rapport avec antériorités potentiellement bloquantes, risque de nullité, et recommandations (modifier le design / déposer / abandonner).</response>
</example>

<example>
<user>Notre concurrent a déposé un modèle de bouteille similaire au nôtre. Est-ce qu'on peut l'attaquer en nullité ?</user>
<response>Recherche antériorité inversée : votre design antérieur comme art antérieur destructeur de leur dépôt. Analyse nouveauté (L.511-2 — différences non perceptibles uniquement) et caractère individuel (L.511-4 — impression globale différente sur l'utilisateur averti). Évaluation du risque d'action en nullité (L.512-4).</response>
</example>

---

## Chargement du profil

> Charger les préférences depuis le profil utilisateur :
> - **Juridictions et offices d'inscription** (INPI, EUIPO, OMPI La Haye)
> - **Secteurs des clients dominants** (mode, packaging, mobilier, automobile, électronique…)
> - **Outil de gestion de portefeuille**

---

## Intake

1. **Design à rechercher** — description textuelle + visuels (photos, rendus 3D, croquis)
2. **Classification Locarno** — classe et sous-classe (ex. 09-01 bouteilles, 06-01 sièges, 26-05 luminaires)
3. **Territoires visés** — France, UE (DMC), international (La Haye)
4. **Déposant / créateur** — identité, date de création
5. **Divulgation antérieure par le créateur ?** — la grâce period de 12 mois (L.511-6 FR / art. 7(2) RDMC) préserve la nouveauté si le créateur a lui-même divulgué
6. **Contexte** — dépôt offensif (protéger son design) / défensif (attaquer un concurrent en nullité)

---

## Étape 1 — Conditions de protection (rappel)

### Nouveauté (L.511-2 CPI / art. 5 RDMC)

Un dessin ou modèle est nouveau si aucun dessin ou modèle **identique** n'a été divulgué au public avant la date de dépôt (ou de priorité). Sont considérés comme identiques les dessins dont les caractéristiques ne diffèrent que par des **détails insignifiants**.

### Caractère individuel (L.511-4 CPI / art. 6 RDMC)

Un dessin ou modèle a un caractère individuel si l'**impression globale** qu'il produit sur l'**utilisateur averti** diffère de celle produite par tout dessin ou modèle divulgué antérieurement. La liberté du créateur dans le secteur est prise en compte : plus le secteur est contraint (ex. connecteurs électroniques), plus de faibles différences suffisent.

### Divulgation (L.511-6 CPI / art. 7 RDMC)

Un dessin est divulgué s'il a été rendu accessible au public par :
- Enregistrement + publication
- Exposition, usage commercial, mise sur le marché
- Toute autre forme de diffusion (catalogue, salon, réseau social, site web)

**Exception :** pas de divulgation si les milieux spécialisés du secteur n'ont pas pu raisonnablement en avoir connaissance dans le cours normal des affaires.

---

## Étape 2 — Sources à interroger

| Source | Couverture | Accès | Limitations |
|--------|-----------|-------|-------------|
| INPI Data — dessins et modèles | D&M français enregistrés | https://data.inpi.fr | Pas de recherche visuelle, texte uniquement |
| EUIPO DesignView | D&M UE (DMC/DMCNE) + registres nationaux + La Haye désignant UE | https://www.tmdn.org/tdview | Recherche visuelle limitée |
| OMPI Hague Express | D&M internationaux (système de La Haye) | https://www.wipo.int/designdb | Couvre 70+ pays |
| Google Images / recherche inversée | Designs non enregistrés, divulgations commerciales | Web | Non exhaustif, pas de valeur juridique |
| Bases sectorielles (mode, auto, packaging) | Catalogues professionnels | Privé | Accès réservé |

**Limitations fondamentales de la recherche D&M :**
- Pas de base mondiale exhaustive (contrairement aux brevets)
- Les DMCNE (3 ans UE) ne sont dans aucun registre
- Les divulgations informelles (salons, catalogues, réseaux sociaux) échappent aux registres
- La recherche visuelle automatisée est imprécise

---

## Étape 3 — Analyse des antériorités trouvées

Pour chaque antériorité potentielle identifiée :

```markdown
### Antériorité [N] — [Référence enregistrement / source]

| Critère | Analyse |
|---------|---------|
| Source | [INPI / EUIPO / La Haye / divulgation web] |
| Date de divulgation | [date — antérieure à la date de priorité du design recherché ?] |
| Classe Locarno | [classe — même secteur ?] |
| Description | [description textuelle du design antérieur] |
| Impression globale | [similaire / différente / identique — sur l'utilisateur averti du secteur] |
| Détails insignifiants ? | [les différences sont-elles uniquement des détails insignifiants ?] |
| Risque nouveauté (L.511-2) | 🔴 Élevé / 🟡 Moyen / 🟢 Faible |
| Risque caractère individuel (L.511-4) | 🔴 / 🟡 / 🟢 |
| Liberté du créateur dans le secteur | [contrainte forte / moyenne / large] |
```

---

## Étape 4 — Conclusion et recommandations

### Matrice de risque

| Scénario | Recommandation |
|----------|---------------|
| Aucune antériorité pertinente trouvée | ✅ Déposer — risque faible (sous réserve divulgations non indexées) |
| Antériorités proches mais impression globale différente | ⚠️ Déposer avec prudence — documenter les différences, envisager revendications partielles |
| Antériorité quasi-identique (détails insignifiants) | 🔴 Ne pas déposer en l'état — modifier le design ou renoncer |
| Design du client antérieur à celui du concurrent | ✅ Action en nullité envisageable contre le dépôt concurrent (L.512-4) |

### Format de sortie

```markdown
# Rapport antériorité D&M — [NOM DESIGN]

*Brouillon soumis à validation. Recherche non exhaustive.*

## 1. Design recherché
[Description + classe Locarno + territoires + date priorité]

## 2. Sources interrogées
[Liste des registres consultés + date de consultation]

## 3. Antériorités identifiées
[Tableau par antériorité — cf. Étape 3]

## 4. Synthèse risque
[Risque global nouveauté + caractère individuel]

## 5. Recommandations
[Déposer / Modifier / Renoncer / Attaquer en nullité]

## 6. Limites de la recherche
[DMCNE non couverts, divulgations informelles, limites recherche visuelle]
```

---

## Gate non-juriste

- [ ] Classification Locarno correcte et pertinente
- [ ] Sources INPI + EUIPO minimum consultées
- [ ] Antériorités analysées par impression globale (pas uniquement par détails isolés)
- [ ] Liberté du créateur dans le secteur prise en compte
- [ ] Limites de la recherche signalées (DMCNE, divulgations informelles)
- [ ] Grâce period vérifiée si divulgation antérieure par le créateur

---

## Emplacement des sorties

```
outputs/anteriorite-dm-<design-slug>-YYYY-MM-DD.md
```

---

## Ce skill ne fait pas

- Garantir la validité d'un futur dépôt (aucune recherche n'est exhaustive)
- Effectuer une recherche visuelle automatisée (limitation technique)
- Rédiger le dépôt → utiliser `depot-dessin-modele`
- Traiter la contrefaçon D&M → utiliser `contrefacon-dessin-modele`
- Évaluer la valeur commerciale du design
- Couvrir les dessins et modèles non enregistrés (DMCNE) de manière certaine

---

## Ton

Technique, prudent. Toujours signaler les limites inhérentes à la recherche D&M (pas de base exhaustive mondiale). Distinguer clairement les antériorités destructrices (risque élevé) des designs proches mais non bloquants.
