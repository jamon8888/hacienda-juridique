---
name: bases-de-donnees
description: >
  Analyse le régime de protection juridique d'une base de données (droit d'auteur L.111-1
  et droit sui generis L.341-1 CPI), identifie le régime contractuel adapté (propriétaire,
  open data, SaaS, scraping autorisé), signale les enjeux RGPD si des données personnelles
  sont impliquées. Brouillon soumis à validation par un avocat.
version: "1.0.0"
authors: ["Hacienda"]
tags: [bases-de-donnees, sui-generis, droit-auteur, open-data, RGPD, CPI, L341]
---

# Skill — Bases de données

> **ANALYSE JURIDIQUE, PAS RÉDACTION FINALE.**
>
> Ce skill produit une **analyse du régime de protection** d'une base de données et une **recommandation de contrat type**, à soumettre à un avocat spécialisé avant tout déploiement contractuel. La protection sui generis (L.341-1 CPI) est souvent méconnue et peut coexister — ou non — avec le droit d'auteur sur la structure. Confondre les deux régimes expose à des erreurs de qualification graves.
>
> Si la base de données contient des données à caractère personnel, la conformité RGPD est un sujet distinct, traité par le plugin données personnelles. Ce skill introduit les enjeux RGPD mais ne rédige pas le DPA.
>
> Les sorties sont des **brouillons**. Elles ne constituent ni un avis juridique, ni une garantie de validité.

## Examples

<example>
<user>Notre équipe a constitué une base de 500 000 articles de presse sur 10 ans avec un investissement lourd. On veut savoir si on peut protéger cette base et empêcher le scraping.</user>
<response>Analyse double protection : droit auteur sur la structure (originalité de l'architecture de classification ?) + droit sui generis L.341-1 (investissement substantiel documenté → protection 15 ans, L.342-1 extraction/réutilisation interdites). Recommandation : contrat licence propriétaire B2B + CGU API avec clause anti-scraping. Points RGPD si articles incluent données personnelles (journalistes, personnes citées).</response>
</example>

<example>
<user>On veut publier notre annuaire de collectivités locales en open data. Quelle licence choisir ?</user>
<response>Analyse : base de données publique → Licence Ouverte Etalab 2.0 recommandée (compatible réutilisation commerciale, décret 2017-331). Alternative ODbL si partage à l'identique souhaité. Points attention : données personnelles des élus (état civil, coordonnées) → vérifier base légale RGPD art. 6.1.e (mission d'intérêt public). Marquage obligatoire source.</response>
</example>

<example>
<user>Un concurrent scrappe notre base produits e-commerce sans autorisation. On peut agir ?</user>
<response>Analyse : droit sui generis L.341-1 → action en extraction/réutilisation substantielle si investissement documenté (Cass. com. 5 mars 2019 PMU). Vérifier CGU interdisant le scraping. Recommandation : mise en demeure + référé pour cessation, puis action au fond. Ce skill identifie les fondements — l'action contentieuse relève du plugin contentieux.</response>
</example>

---

## Chargement du profil

> Si un fichier `CLAUDE.md` est présent dans le projet, charger les préférences suivantes :
> - **Politique bases de données** : propriétaire stricte / open data privilégié / mixte selon valeur
> - **RGPD pour bases de données** : DPO interne / DPO externe / cabinet conseil RGPD dédié
> - **Approbateur contrats droit d'auteur**
>
> En l'absence de préférences configurées, appliquer les positions par défaut (analyse au cas par cas, signalement systématique des enjeux RGPD).

---

## Intake

Collecter avant analyse :

1. **Nom et description de la base** — contenu, volumétrie (nombre d'entrées), format (SQL, NoSQL, fichier plat, API…)
2. **Structure de la base** — architecture de classement, indexation, taxonomie propre à l'organisation
3. **Investissement documenté** — budget, temps-homme, ressources matérielles consacrées à la **constitution** de la base (pas la création des contenus)
4. **Type d'accès envisagé** — interne uniquement / SaaS B2B / open data / API publique / scraping tiers
5. **Données personnelles ?** — la base contient-elle des données à caractère personnel (noms, emails, coordonnées, identifiants…)
6. **Usage tiers constaté ou risqué** — scraping non autorisé, concurrence, réutilisation sans licence

> **Mode provisoire :** si l'investissement n'est pas documenté, signaler que la qualification sui generis reste incertaine et recommander de documenter l'investissement avant toute action.

---

## Étape 1 — Double protection : droit d'auteur + droit sui generis

### A. Droit d'auteur sur la structure (L.111-1 CPI)

**Critère :** la **structure** de la base (architecture de classement, organisation, présentation) doit être **originale** — c'est-à-dire porter l'empreinte de la personnalité de son auteur (CJUE Infopaq C-5/08, 2009).

**Ce qui est protégé :** l'organisation et la présentation des données (les colonnes, la taxonomie, les rubriques inventées).

**Ce qui n'est pas protégé :** les données elles-mêmes (faits, chiffres, informations brutes).

**Durée :** 70 ans post mortem auctoris (L.123-1) — ou 70 ans à compter de la divulgation pour les personnes morales.

**Titulaire :** auteur de la structure. Si créé par un salarié dans le cadre de sa mission, cession automatique à l'employeur uniquement pour les **logiciels** (L.113-9) — pour les bases de données hors logiciel, formaliser par avenant.

---

### B. Droit sui generis (L.341-1 CPI)

**Critère :** le producteur a réalisé un **investissement substantiel** — financier, matériel ou humain — pour la **constitution, la vérification ou la présentation** du contenu.

**Distinction fondamentale (CJUE BHB C-203/02, 2004) :**
- Investissement pour **obtenir/collecter** le contenu → protégé par L.341-1
- Investissement pour **créer** le contenu (ex. résultats d'une course de chevaux générés par l'organisateur lui-même) → **non protégé** par L.341-1

**Ce qui est protégé :** extraction et réutilisation d'une partie substantielle du contenu (quantitativement ou qualitativement).

**Actes interdits sans autorisation (L.342-1) :**
- Extraction : transfert permanent ou temporaire d'une partie substantielle
- Réutilisation : mise à disposition du public sous quelque forme que ce soit

**Durée :** 15 ans à compter de l'achèvement de la base (L.342-5). **Renouvelable** si un investissement substantiel nouveau est réalisé → protection quasi-illimitée en pratique pour les bases maintenues.

**Titulaire :** le **producteur** de la base (personne physique ou morale qui a pris l'initiative et le risque de l'investissement) — pas nécessairement l'auteur des contenus.

*Référence : `references/regime-sui-generis-L341.md`*

---

### C. Quatre scénarios de protection

| Scénario | Droit d'auteur structure | Droit sui generis | Exemple |
|----------|--------------------------|-------------------|---------|
| Double protection | Oui (structure originale) | Oui (investissement substantiel) | Base de jurisprudence avec classification propre et investissement lourd |
| Droit d'auteur seul | Oui | Non (investissement faible ou contenu auto-généré) | Anthologie littéraire à faible coût de collecte |
| Sui generis seul | Non (structure banale) | Oui (investissement substantiel) | Annuaire téléphonique (structure banale mais collecte coûteuse) |
| Aucune protection | Non | Non | Liste de 10 contacts sans investissement notable |

---

## Étape 2 — Quatre régimes d'accès

### A. Usage interne

**Régime :** pas de contrat externe nécessaire, mais formaliser :
- Politique d'accès interne (habilitations, logs, traçabilité)
- Clause de confidentialité dans les contrats de travail
- Si données personnelles : registre des traitements + base légale RGPD

---

### B. SaaS B2B

**Régime :** triple couche contractuelle :
1. **Contrat de licence** sur la base (L.131-3 — droits, domaines, territoire, durée, rémunération)
2. **SLA** (disponibilité, support, pénalités)
3. **DPA** (si données personnelles — art. 28 RGPD)

Renvoi vers `licence-droit-auteur` pour la rédaction du contrat de licence.

---

### C. Open data

**Régime applicable selon la nature du producteur :**

| Producteur | Régime | Licence recommandée |
|-----------|--------|---------------------|
| Administration publique française | Décret 2017-331, Loi Lemaire 2016 | Licence Ouverte Etalab 2.0 |
| Organisme public (choix copyleft) | Idem | ODbL (Open Database License) |
| Acteur privé volontaire | Choix libre | CC0, ODbL, ou licence propriétaire |

**Licence Ouverte Etalab 2.0 :**
- Autorisation de réutilisation y compris commerciale
- Obligation : mentionner la source et la date de mise à jour
- Compatible CC BY 4.0
- URL : https://www.etalab.gouv.fr/licence-ouverte-open-licence

**ODbL (Open Database License) :**
- Copyleft sur la base : toute base dérivée doit être publiée sous ODbL
- Autorisation usage commercial
- Obligation : attribution + partage à l'identique de la base dérivée
- URL : https://opendatacommons.org/licenses/odbl/

---

### D. Scraping autorisé (API ou contrat B2B)

Le scraping non autorisé est sanctionnable sur le fondement du droit sui generis (L.342-1) et des CGU. Un scraping **autorisé** doit être formalisé par :

1. **CGU API** : rate limit, volume maximal, interdiction de redistribution sans accord, citation obligatoire de la source
2. **Contrat B2B de scraping** (rare mais légitime) : fréquence de crawl, volume par période, format de restitution, interdiction de revente, durée

**Jurisprudence clé :** Cass. com. 5 mars 2019, PMU c/ Stanleybet — le scraping non autorisé d'une base protégée par le droit sui generis constitue une extraction illicite au sens de L.342-1, même si les données sont accessibles publiquement.

---

## Étape 3 — RGPD si données personnelles

Si la base contient des données à caractère personnel (noms, emails, identifiants, coordonnées, données comportementales…) :

| Point de contrôle | Question | Action si oui |
|------------------|----------|---------------|
| Base légale | Art. 6 RGPD — consentement, contrat, intérêt légitime, mission publique ? | Documenter la base légale |
| Finalités | Les données sont-elles utilisées pour des finalités déterminées et limitées ? | Registre des traitements |
| Minimisation | La base ne contient-elle que les données strictement nécessaires ? | Audit de contenu |
| Conservation | Durée de conservation définie et justifiée ? | Politique de purge |
| Droits personnes | Mécanisme d'exercice des droits (accès, rectification, suppression, portabilité) ? | Procédure interne |
| DPO | Traitement à grande échelle ou données sensibles → DPO obligatoire ? | Désigner si requis |
| DPIA | Traitement à risque élevé → AIPD obligatoire (art. 35 RGPD) ? | Lancer AIPD si requis |
| Transfert hors UE | Données transférées vers pays tiers ? | Clauses contractuelles types ou BCR |

> Ce skill introduit ces points — ne pas les traiter ici. Utiliser le plugin données personnelles pour la conformité RGPD complète.

---

## Étape 4 — Modèles contractuels et format de sortie

### Recommandation du type de contrat

Selon les réponses à l'intake, recommander parmi :

| Situation | Contrat recommandé |
|-----------|-------------------|
| Base propriétaire, accès payant B2B | Licence BDD propriétaire (renvoi `licence-droit-auteur`) |
| Base publique ou volontairement ouverte | LO Etalab 2.0 ou ODbL selon copyleft souhaité |
| API publique avec conditions d'usage | CGU API (rate limit, attribution, interdiction revente) |
| Scraping autorisé B2B | Contrat scraping B2B (fréquence, volume, redistribution) |
| Usage interne uniquement | Politique interne + confidentialité RH |

### Format de sortie

Produire une analyse structurée en Markdown :

```markdown
# Analyse juridique — Base de données : [NOM]

*Brouillon soumis à validation par un avocat. Non utilisable sans révision.*

## 1. Qualification de la protection

### Droit d'auteur (L.111-1)
[Analyse originalité de la structure — Oui / Non / Incertain]

### Droit sui generis (L.341-1)
[Analyse investissement substantiel — Oui / Non / Incertain]
[Investissement documenté : [montant / ETP / durée]]
[Durée de protection estimée : [15 ans à compter de …]]

### Scénario retenu
[Double protection / Sui generis seul / Droit auteur seul / Aucune protection]

## 2. Régime d'accès recommandé

[Type de contrat recommandé + justification]

## 3. Clauses critiques

- [Liste des clauses essentielles pour le type de contrat retenu]

## 4. Enjeux RGPD

[Flag : données personnelles présentes / absentes / à vérifier]
[Points d'attention identifiés]
[Renvoi plugin données personnelles pour traitement complet]

## 5. Points ouverts à valider avec l'avocat

- [Question 1]
- [Question 2]
- [Question 3]
```

---

## Gate non-juriste

Avant de transmettre l'analyse à l'avocat, vérifier :

- [ ] L'investissement pour la **constitution** de la base est documenté (vs création du contenu)
- [ ] La structure de la base a été évaluée pour l'originalité
- [ ] Le régime d'accès (interne / SaaS / open data / scraping) est clairement défini
- [ ] Les enjeux RGPD ont été identifiés (données personnelles présentes ou non)
- [ ] Le type de contrat recommandé correspond au scénario de protection

**Brief avocat recommandé :** transmettre avec :
1. Description de la base (contenu, volumétrie, investissement)
2. Le scénario de protection retenu et ses incertitudes
3. Le type de contrat envisagé
4. Les points RGPD si données personnelles

---

## Emplacement des sorties

```
outputs/bases-donnees-<projet-slug>-YYYY-MM-DD.md
```

---

## Ce skill ne fait pas

- Rédiger le contrat final → utiliser `licence-droit-auteur` pour la licence
- Gérer la conformité RGPD complète → utiliser le plugin données personnelles
- Évaluer la valeur économique de la base de données
- Traiter le contentieux pour scraping non autorisé → utiliser le plugin contentieux
- Analyser les bases de données relevant d'un régime sectoriel spécifique (données de santé, données financières) sans mention explicite de ce cadre

---

## Ton

Technique et équilibré. Distinguer clairement ce qui est protégé de ce qui ne l'est pas, sans sur-protéger ni sous-estimer. Signaler systématiquement les incertitudes (investissement non documenté, originalité douteuse). Toujours rappeler que l'analyse est un brouillon soumis à validation humaine.
