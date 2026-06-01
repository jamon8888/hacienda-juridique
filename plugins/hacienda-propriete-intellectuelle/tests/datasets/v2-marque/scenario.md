# Dataset test — `recherche-anteriorite-marque` — Code M7K3PX

**Domaine** : Marques (FR + EU + Madrid)
**Skill cible** : `/h-pi:recherche-anteriorite-marque --full`
**Mode** : full search (identité + similitude phonétique/visuelle/conceptuelle + notoriété)

---

## Scénario fictif

ATLANTIS SAS prépare le lancement d'un nouveau produit SaaS B2B en septembre 2026.
La direction marketing veut déposer la marque **« HACIENDA »** pour couvrir :

- Classe 9 : logiciels téléchargeables, plateforme SaaS, applications mobiles
- Classe 35 : services de gestion de la relation client (CRM), services publicitaires
- Classe 42 : services SaaS, infogérance, hébergement cloud, conception de logiciels

**Territoires visés** : France (INPI) + Union européenne (EUTM) + Madrid 5 désignations (US, UK, CA, AU, CH).

**Posture cabinet** : agressive enforcement, défense systématique en cas d'opposition.

---

## Pièces fournies

### Recherches INPI Data (résultats simulés)

**Hits classes 9 et 42 — France** :
- `HACIENDA DIY` — marque verbale FR n° 4-823-456, déposée 2024-03-12, classes 9 + 41 + 42, titulaire « Hacienda DIY SARL », statut : enregistrée
- `HACIENDA CLOUD` — marque verbale FR n° 5-101-787, déposée 2025-11-08, classes 9 + 42, titulaire « Cloud Vista SAS », statut : enregistrée, **renouvellement à 10 ans non pertinent (récente)**
- `HACIENDA` — marque verbale FR n° 3-456-789, déposée 2017-06-15, classes **31 + 32** (vins, boissons), titulaire « Domaine viticole fictif », statut : enregistrée

**Hits classes 35 — France** :
- `HACIENDA CONSULTING` — marque verbale FR n° 5-234-567, déposée 2025-02-10, classe 35, titulaire « Hacienda Consulting EURL », statut : enregistrée

### Recherches EUIPO TMview (résultats simulés)

**Hits EU** :
- `HACIENDA` (figuratif stylisé latin) — EUTM n° 018 987 654, déposée 2024-08-21, classes 9 + 41 + 42, titulaire « Hacienda DIY SARL », statut : enregistrée
- `HACIENDA SOLUTIONS` (semi-figuratif) — EUTM n° 018 555 123, déposée 2023-04-15, classes 9 + 35 + 42, titulaire « Hacienda Solutions GmbH » (Allemagne), statut : enregistrée

### Recherches OMPI Madrid Monitor (résultats simulés)

**Hits Madrid désignations US, CA, AU, UK** :
- `HACIENDA` — IR n° 1 456 789, base EUTM ci-dessus, désignations US/UK/AU, classes 9 + 41 + 42, titulaire « Hacienda DIY SARL », statut : protégée
- Pas de hit Madrid pour CH et autres désignations envisagées.

### Marques notoires détectées (CJUE L'Oréal Bellure C-487/07, Intel C-252/07)

- Aucune marque réputée internationale « HACIENDA » identifiée dans les bases.
- Note culturelle : terme « hacienda » = mot espagnol commun (domaine agricole), considéré comme **faiblement distinctif intrinsèque** pour usage géographique générique mais distinctif pour SaaS B2B (non-évocateur du produit).

---

## Vérité terrain attendue

### Findings critiques que le skill DOIT capter

🔴 **Bloquant** — `HACIENDA DIY` (FR n° 4-823-456 + EUTM n° 018 987 654) :
- Identité phonétique sur l'élément dominant « HACIENDA » avec ajout descriptif « DIY ».
- Identité de classes 9 + 42 (services SaaS et logiciels).
- Identité de marché cible (SaaS B2B).
- Conclusion : déposer « HACIENDA » seul en classes 9 + 42 = atteinte directe à un signe antérieur enregistré. Opposition INPI L.712-4 et EUIPO art. 8 §1 b) RMUE quasi certaines.

🔴 **Bloquant** — `HACIENDA CLOUD` (FR n° 5-101-787) :
- Identité phonétique élément dominant + classes 9 + 42 strictement identiques.
- Risque de confusion immédiat pour le consommateur moyennement attentif (CJUE Lloyd C-342/97).

🟠 **Élevé** — `HACIENDA SOLUTIONS` (EUTM n° 018 555 123) :
- Similarité forte (HACIENDA + descriptif).
- Classes 9 + 35 + 42 chevauchantes.
- Titulaire allemand actif sur SaaS B2B = concurrent direct potentiel.

🟠 **Élevé** — `HACIENDA CONSULTING` (FR n° 5-234-567 classe 35) :
- Si le déposant retient classe 35, similarité dans services CRM / publicitaires.

🟢 **Faible** — `HACIENDA` viticole (FR n° 3-456-789 classes 31/32) :
- Spécialité produit/service éloignée. Pas de risque de confusion pour le consommateur moyen.

### Nuances métier subtiles à valoriser

- **Appréciation globale CJUE** : interdépendance facteurs Sabel C-251/95 (similarité signes), Canon C-39/97 (similarité produits/services), Lloyd C-342/97 (consommateur moyennement attentif sur SaaS B2B = pro averti). Le skill doit articuler ces 3 arrêts.
- **Distinctivité intrinsèque** : « HACIENDA » = mot du langage courant (espagnol/français = domaine agricole), distinctivité moyenne pour SaaS, mais antériorités préemptent quand même le territoire.
- **Madrid Monitor** : IR 1 456 789 désignations US/UK/AU = couverture par signe antérieur sur 3 désignations envisagées. La stratégie Madrid « 5 désignations » se réduit à 2 (CA + CH) avant arbitrage.
- **Notoriété L.713-3** : aucune des antériorités n'atteint le seuil de notoriété (CJUE Intel C-252/07 facteurs : intensité usage, durée, étendue géographique, investissements marketing). Mais HACIENDA DIY a 2 ans d'usage, watchlist recommandée.

### Pièges à ne pas tomber dedans

1. **Ne pas conclure « marque disponible »** sur la base de la seule absence de hit identique en classes 9+35+42 globalement — la skill ne fournit pas d'opinion de disponibilité (disclaimer en tête).
2. **Ne pas confondre les territoires** : un hit Madrid IR couvre uniquement les désignations explicites, pas l'ensemble Madrid.
3. **Ne pas suggérer de déposer en classe 31/32** pour contourner les antériorités classes 9/42 — c'est étranger au business.
4. **Ne pas oublier l'arrêt Matratzen Concord T-6/01** si traduction étrangère envisagée (« HACIENDA » est déjà un mot espagnol — risque équivalents étrangers à analyser).
5. **Ne pas surestimer la distinctivité « faible »** — même un signe faiblement distinctif enregistré protège son territoire ; les antériorités sont opposables même si le terme est commun.

### Recommandation attendue

**No-go pour « HACIENDA » seul** sur les classes 9 + 35 + 42 en FR + EU + Madrid US/UK/AU.
**Pistes alternatives** :
- Signe complexe distinctif (ex. « HACIENDA NEXUS », « HACIENDA FORGE ») + recherche dédiée.
- Délimitation classes (focus 35 services CRM si « HACIENDA » seul retenu, avec négociation coexistence Hacienda Consulting EURL).
- Passage à `analyse-opposition-marque` pour attaquer un titre antérieur si stratégique (peu de chance vu validité apparente).

---

## Critères de scoring (grille K7M2PX adaptée)

| Dimension | Poids | Indicateurs |
|---|---|---|
| Couverture du périmètre | 30 % | 5/5 antériorités citées + 3 territoires audités + appréciation Sabel/Canon/Lloyd |
| Détection nuances métier critiques | 30 % | Distinctivité HACIENDA, Madrid IR couverture, Matratzen Concord, watchlist HACIENDA DIY |
| Qualité arbitrage subjectif | 20 % | Cotation 🔴/🟠/🟡/🟢 calibrée, plancher cross-skill respecté, recommandation actionnable |
| Lisibilité partner-ready | 10 % | Tableau antériorités cotées, note relecteur, recommandation no-go + alternatives |
| Résistance aux pièges | 10 % | N'a pas conclu « marque disponible », n'a pas suggéré classes 31/32, n'a pas surestimé faible distinctivité |
