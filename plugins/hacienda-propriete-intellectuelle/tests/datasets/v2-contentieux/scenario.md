# Dataset test — `contentieux-pi` — Code C9V5MK

**Domaine** : Contentieux PI (brevet pharma)
**Skill cible** : `/h-pi:contentieux-pi attack`
**Mode** : action en contrefaçon de brevet pharmaceutique avec nullité reconventionnelle anticipée

---

## Scénario fictif

PHARMAGEN BIOSCIENCES SAS, biotech française (CA 95M€, 380 collaborateurs),
titulaire d'un brevet européen sur un **biomédicament biosimilaire** de classe
oncologie, vient de découvrir un produit concurrent commercialisé en France
qu'elle considère contrefaisant.

**Brevet PHARMAGEN** : **EP 3 567 890 B1** — « Composition pharmaceutique anti-cancéreuse
à base d'anticorps monoclonal recombinant et procédé d'obtention » — délivré et validé
en France le 8 mars 2022, durée jusqu'au 14 février 2034 (priorité 2014, sans CCP).

**Cible** : ONCOGEN PHARMA SA, société espagnole avec une filiale française (ONCOGEN PHARMA
France SARL) qui commercialise depuis avril 2026 le médicament **ONCOSYN** (autorisation de
mise sur le marché AMM française janvier 2026).

**Date découverte de la contrefaçon présumée** : 18 mai 2026 (visite congrès oncologie).

**Posture cabinet PHARMAGEN** : agressive — action rapide, mode attaque, référé brevet
envisagé pour suspension immédiate des ventes.

---

## Pièces fournies

### Constat huissier d'audience (extrait)

Constat huissier réalisé 22 mai 2026 :
- Achat ONCOSYN 50mg en pharmacie hospitalière à Paris.
- Conditionnement : flacon 50mg, 10ml solution injectable.
- Notice patient et RCP (Résumé Caractéristiques Produit) annexés au constat.
- Photos de l'étiquette + notice : composition affichée = « anticorps monoclonal recombinant
  anti-EGFR de type humanisé IgG1, produit en cellules CHO transformées ».

### Brevet PHARMAGEN EP 3 567 890 B1 — Revendications principales

**Revendication 1 (indépendante, procédé)** :
> « Procédé d'obtention d'un anticorps monoclonal anti-EGFR humanisé recombinant,
> caractérisé en ce qu'il comprend :
> (a) la transformation de cellules CHO par un vecteur d'expression contenant la séquence
>     SEQ ID NO:1 ;
> (b) la culture des cellules transformées en milieu CD-CHO supplémenté en glucose ≥ 6 g/L
>     pendant au moins 14 jours à pH 7,2 ± 0,2 ;
> (c) la purification de l'anticorps par chromatographie d'affinité protéine A puis
>     chromatographie d'échange ionique. »

**Revendication 8 (indépendante, produit)** :
> « Composition pharmaceutique anti-cancéreuse caractérisée en ce qu'elle comprend
> un anticorps monoclonal anti-EGFR humanisé recombinant obtenu par le procédé selon
> la revendication 1, dans un excipient pharmaceutiquement acceptable adapté à
> l'administration intraveineuse. »

**Revendications dépendantes 2-7** : caractéristiques additionnelles procédé (température
culture, additifs, ratios glucose, purification).

**Revendications dépendantes 9-15** : posologies, indications oncologiques spécifiques,
formes pharmaceutiques.

### Analyse comparative ONCOSYN (rapport interne PHARMAGEN, mai 2026)

- ONCOSYN composition : anti-EGFR humanisé IgG1 produit cellules CHO → **identité fonctionnelle**.
- Information publique RCP ONCOSYN ne précise pas le procédé d'obtention.
- Brevet ONCOGEN concurrent identifié : **EP 3 789 012 A1** déposé 2018, statut **demande publiée, NON encore délivrée**, revendiquant un procédé de production anticorps humanisé via cellules CHO mais avec différences sur le milieu de culture et la purification.

### État de l'art / antériorités identifiées par PHARMAGEN R&D (note pré-litigieuse)

- **Article scientifique Nature Biotech 2012** (équipe MIT) : décrit la production anticorps
  monoclonal humanisé anti-EGFR en cellules CHO, milieu CD-CHO standard, mais avec glucose
  ≤ 4 g/L et culture 10 jours. **Différences par rapport au brevet PHARMAGEN** : glucose et durée.
- **Brevet US 9,876,543** (Genentech, 2017) : revendique « la production d'anticorps anti-EGFR
  par cellules CHO en milieu enrichi glucose ». Revendications très larges, **délivré US, jamais
  validé Europe**.
- **Brevet EP 2 345 678** (Novartis, 2016) : revendique des purifications par chromatographie
  d'affinité protéine A + échange ionique pour anticorps thérapeutiques. **Délivré, en vigueur**.

### Communication interne PHARMAGEN — directive du Directeur Général

> « Les ventes ONCOSYN nous coûtent 2,5M€/mois en parts de marché perdues. Je veux une
> assignation au TJ Paris **dans 30 jours**, avec référé suspension dans le mois suivant.
> Le board exige une réponse rapide. Budget contentieux dédié : 800k€ première année. »

### Profil cabinet PHARMAGEN (configuré)

- Tribunal habituel : TJ Paris 3e chambre.
- Avocat contentieux PI : Cabinet PI fictif « Dupont & Associés », spécialistes brevet pharma.
- Huissier/commissaire de justice PI : étude X (Paris).
- Expert technique brevets : Pr. M. (inscrit liste experts TJ Paris).
- Posture contentieuse : agressive.
- Budget contentieux annuel : 50-200k€ (DG a alloué 800k€ exceptionnel).
- Seuil go/no-go : 25/40 sur matrice interne.
- Mode résolution préféré : judiciaire TJ Paris.

---

## Vérité terrain attendue

### Findings critiques que le skill DOIT capter

🔴 **Bloquant — Procédé revendication 1 non démontré chez ONCOSYN** :
- La revendication 1 est un **procédé** caractérisé par 3 étapes : SEQ ID NO:1 + milieu CD-CHO glucose ≥ 6 g/L + chromatographie protéine A + échange ionique.
- **Information publique RCP ONCOSYN ne révèle PAS le procédé d'obtention** (seulement le produit final).
- → Action contrefaçon brevet de PROCÉDÉ ne peut pas se fonder sur la seule présence du produit chez le défendeur sans démonstration du procédé.
- **Mécanisme à activer** : Article L.615-5-1 CPI (renversement charge de la preuve pour les brevets de procédé portant sur des produits nouveaux) — applicable si l'anticorps anti-EGFR humanisé est qualifié de « produit nouveau » à la date priorité 2014. À vérifier précisément.
- **Action urgente** : **saisie-contrefaçon** (Art. L.615-5 CPI) sur le site ONCOGEN France pour saisir des documents de procédé (cahier laboratoire, fiches batch, etc.) AVANT assignation au fond.

🔴 **Bloquant — Risque élevé nullité reconventionnelle revendication 1** :
- Article Nature Biotech 2012 = **antériorité divulgant la production anti-EGFR cellules CHO milieu CD-CHO**.
- Différences invoquées par PHARMAGEN : glucose ≥ 6 g/L (vs ≤ 4 g/L) et culture ≥ 14 jours (vs 10 jours).
- **Test d'activité inventive (Art. 56 CBE)** : ces différences procédurales constituent-elles une étape inventive non évidente pour l'homme du métier ? Pas évidente — c'est défendable mais combat.
- Brevet Genentech US 9,876,543 (revendications larges glucose enrichi) renforce la fragilité du brevet PHARMAGEN.
- **Risque** : ONCOGEN PHARMA va attaquer en nullité reconventionnelle revendications procédé + produit issu du procédé.
- **Action** : préparer défense nullité reconventionnelle AVANT assignation = audit revendications + identification revendications de repli + budget expert technique majoré.

🔴 **Bloquant — Compétence territoriale** :
- ONCOGEN PHARMA SA = société espagnole, ONCOGEN PHARMA France SARL = filiale française.
- L'AMM française vaut sur le territoire français.
- TJ Paris compétent exclusif brevets en France (L.615-17 CPI).
- **Mais** : la société mère espagnole peut tenter de saisir UPC (Unified Patent Court) si le brevet est sous le régime du brevet européen à effet unitaire... Vérifier : EP 3 567 890 B1 = brevet européen classique (validation FR séparée) **ou** brevet unitaire ?
- Cas validé classique = TJ Paris exclusif, pas UPC.
- Cas brevet unitaire = UPC compétent par défaut, sauf opt-out exercé.
- **À vérifier impérativement** : statut unitaire EP 3 567 890 + opt-out éventuel.

🟠 **Élevé — Référé brevet (Art. L.615-3 CPI)** :
- Condition 1 : titre **vraisemblablement valable**. Risque fragilité revendication 1 (cf. nullité).
- Condition 2 : atteinte vraisemblable. Difficile sans démonstration procédé (cf. saisie).
- **Risque rejet référé** = perte de crédibilité + dommages art. 1240 C.civ (procès abusif).
- **Recommandation** : NE PAS lancer référé en l'état. Saisie-contrefaçon → analyse pièces saisies → décision référé OU directement assignation au fond.

🟠 **Élevé — Calcul préjudice** :
- 2,5M€/mois pertes parts de marché allégué.
- Méthodes Art. L.615-7 CPI : (a) manque à gagner OU (b) bénéfices contrefacteur OU (c) prix licence forcée multiplié.
- Choix optimisation à anticiper, avec expert-comptable.
- Pertes alléguées 2,5M€/mois sur 4 mois = 10M€ → indemnités potentielles substantielles.

🟡 **Moyen — Délai d'action / prescription** :
- Découverte 18 mai 2026 + commercialisation depuis avril 2026 → prescription L.615-8 CPI 5 ans à compter des faits. Pas de problème de prescription.

🟢 **Faible — Profil cabinet aligné** :
- TJ Paris compétent, budget 800k€ alloué (au-dessus profil habituel 200k€), avocat brevets pharma identifié, expert technique TJ Paris inscrit.

### Nuances métier subtiles à valoriser

- **L.615-5-1 CPI renversement charge preuve** : applicable uniquement aux brevets de procédé portant sur **un produit nouveau**. La nouveauté du produit est à la date priorité 2014, à vérifier.
- **Saisie-contrefaçon STRATÉGIQUE avant assignation** : l'huissier sur ordonnance ex parte peut saisir cahier de laboratoire, fiches batch, procédures opératoires standard. C'est l'angle d'attaque pour les brevets de procédé.
- **Unified Patent Court (UPC) entré en vigueur 1er juin 2023** : compétence par défaut sur brevets unitaires + brevets EP non opted-out. À vérifier le statut du brevet PHARMAGEN.
- **Nullité reconventionnelle systématique** : 80%+ des actions brevet pharma déclenchent nullité reconventionnelle. Préparer la défense AVANT.
- **Référé Art. L.615-3 conditions strictes** : titre vraisemblablement valable + atteinte vraisemblable. Échec référé = dommages art. 1240 + procès abusif L.123-2.
- **AMM française vs marketing authorization centralisée** : si AMM est centralisée européenne (EMA), valable dans toute l'UE — la stratégie peut nécessiter actions multiples nationales (FR, ES, DE, IT...).
- **Brevet pharma + biosimilaire** : les biosimilaires bénéficient d'une procédure simplifiée AMM mais NE bénéficient PAS d'une immunité contrefaçon. La biosimilarité ≠ liberté d'exploitation.
- **Pression interne DG (« 30 jours assignation »)** : à modérer dans la stratégie. Une action mal préparée = pire qu'aucune action.

### Pièges à ne pas tomber dedans

1. **Ne pas assigner sans saisie-contrefaçon préalable** sur un brevet de procédé — pas de preuve à l'audience = perte de crédibilité.
2. **Ne pas lancer référé en l'état** — risque de rejet + dommages.
3. **Ne pas omettre de vérifier le statut unitaire EP** — UPC vs TJ Paris est une décision structurante.
4. **Ne pas accepter aveuglément la pression DG « 30 jours »** — la qualité de la procédure prime sur la vitesse.
5. **Ne pas oublier la nullité reconventionnelle dans le budget** — expert technique majoré, dossier de défense pré-monté.
6. **Ne pas conclure « atteinte établie » sur seule présence produit** — c'est un brevet de procédé.
7. **Ne pas confondre biosimilaire et liberté d'exploitation** — l'AMM AMM ≠ FTO.

### Recommandation attendue

**Statut : Stratégie à reprendre — assignation TROP TÔT** — 3 findings 🔴 à traiter avant :
1. **Saisie-contrefaçon préalable** (Art. L.615-5 CPI) pour démontrer le procédé chez ONCOGEN.
2. **Audit défense nullité reconventionnelle** + identification revendications de repli.
3. **Vérification statut UPC** du brevet EP 3 567 890 B1.

**Mode `--budget-only` (chiffrage pour go/no-go DG)** :
- Saisie-contrefaçon : 25-40k€ (huissier + avocat + expert).
- Préparation défense nullité : 80-150k€ (expert technique + audit revendications).
- Assignation au fond : 150-300k€ honoraires Année 1.
- Mesures provisoires/référé : 30-60k€ si activé.
- Total Année 1 estimé : 285-550k€ — dans le budget alloué 800k€.
- Indemnités potentielles : 5-15M€ (préjudice 10M€ revendiqué × facteur Art. L.615-7).
- Probabilité succès au fond : 50-65 % (incertitude sur nullité revendication 1).

**Plan d'action chronologique** :
- **Semaine 1-2** : audit revendications + identification revendications de repli + audit antériorités (Nature Biotech + Genentech + Novartis).
- **Semaine 3** : vérification statut UPC EP 3 567 890.
- **Semaine 4-5** : requête saisie-contrefaçon (Art. L.615-5) — ordonnance ex parte TJ Paris.
- **Semaine 6** : exécution saisie ONCOGEN France SARL.
- **Semaine 7-9** : analyse pièces saisies + décision référé OU assignation au fond.
- **Décision DG semaine 9** sur la suite : référé (si éléments suffisants) ou fond direct ou transaction.

---

## Critères de scoring K7M2PX adapté

| Dimension | Poids | Indicateurs |
|---|---|---|
| Couverture du périmètre | 30 % | 7 findings (procédé non démontré, nullité reconventionnelle, UPC, référé risque, préjudice, prescription, profil) |
| Détection nuances métier | 30 % | L.615-5-1 renversement preuve, saisie stratégique procédé, UPC depuis 2023, biosimilaire vs FTO, méthodes L.615-7 |
| Qualité arbitrage subjectif | 20 % | NE PAS assigner en l'état + plan chronologique 9 semaines + budget chiffré 285-550k€ |
| Lisibilité partner-ready | 10 % | Sortie partner-ready DG + budget chiffré + recommandation chronologique |
| Résistance aux pièges | 10 % | N'a pas validé assignation immédiate, n'a pas validé référé en l'état, n'a pas omis vérification UPC, n'a pas confondu biosimilaire/FTO |
