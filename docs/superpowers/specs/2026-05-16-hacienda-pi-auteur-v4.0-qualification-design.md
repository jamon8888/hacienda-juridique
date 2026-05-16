# Hacienda PI — Bloc Droit d'auteur V4.0 Qualification (Œuvre + Logiciels) — Design

**Date** : 2026-05-16
**Plugin** : `hacienda-propriete-intellectuelle` v0.9.0 (extension de v0.8.0)
**Base** : main (V1.0-V1.1.2 + V2.0-V2.2 mergés — workflows marques et brevets complets)

---

## 1. Objectifs

Démarrer le **bloc droit d'auteur** par les 2 skills fondateurs de la qualification (les 4 autres suivront V4.1 contrats + V4.2 enforcement) :

1. **`qualification-oeuvre`** — qualifier juridiquement une création : originalité (CPI L.111-1, critère "marque de la personnalité de l'auteur"), catégorie d'œuvre (L.112-2 liste non exhaustive), titularité initiale selon contexte de création (créateur personne physique / collaboration L.113-2 / collective L.113-2 al.3 / composite / commande / salariat). Distingue droits patrimoniaux (L.122-1 à 12, cessibles + durée 70 ans post mortem L.123-1) vs droit moral (L.121-1, perpétuel, inaliénable, imprescriptible).

2. **`logiciels-pi`** — régime spécifique logiciel (CPI L.113-9 employeur titulaire patrimoniaux + L.122-6 droits d'utilisation + L.122-6-1 exceptions). Couvre : invention de salarié développeur (régime dérogatoire — exception au droit commun L.111-1), licences logiciel (propriétaire / open source / dual licensing), SaaS et bases de données associées, contrefaçon logicielle.

Bump plugin v0.8.0 → v0.9.0. V4.1 et V4.2 enchaîneront pour atteindre v1.0.0 = bloc droit d'auteur complet.

## 2. Non-objectifs

- Pas de `cession-droit-auteur` (V4.1)
- Pas de `licence-droit-auteur` (V4.1)
- Pas de `bases-de-donnees` skill dédié (V4.1 — couvert partiellement par `logiciels-pi` pour le sui generis L.341-1 transversal)
- Pas de `contrefacon-droit-auteur` (V4.2)
- Pas de gestion droits voisins (artistes-interprètes, producteurs phonogrammes) — V4.3 différé
- Pas de gestion droits patrimoniaux post mortem (succession héritiers) — différé
- Pas de SACEM / SCAM / autres OGC (organismes de gestion collective) — différé V4.2+
- Pas d'analyse contrefaçon NFT / IA générative — différé V4.3+ (régime en construction)

## 3. Architecture

### 3.1 Plugin étendu

```
plugins/hacienda-propriete-intellectuelle/                v0.9.0
├── .claude-plugin/plugin.json                            [BUMP] 0.9.0
├── CLAUDE.md                                             [PATCH] section "Droit d'auteur" ajoutée
├── CHANGELOG.md                                          [PATCH] 0.9.0
├── README.md                                             [PATCH] V0.9
│
├── skills/
│   ├── qualification-oeuvre/                             [NEW]
│   │   ├── SKILL.md                                       (~550-700 lignes style Anthropic FR)
│   │   └── references/
│   │       ├── articles-cpi-droit-auteur.md              (L.111-1 à L.123-1 référencés)
│   │       └── jurisprudence-originalite.md              (Cour de cass + CJUE critère originalité)
│   ├── logiciels-pi/                                     [NEW]
│   │   ├── SKILL.md                                       (~500-650 lignes)
│   │   └── references/
│   │       ├── regime-logiciel-cpi.md                    (L.113-9, L.122-6 à L.122-6-2 + jurisprudence)
│   │       └── licences-open-source.md                   (typologie GPL/LGPL/MIT/Apache/BSD + compatibilité)
│   └── (autres skills intact)
│
└── references/
    └── ressources-pi-fr.md                               [PATCH] section "Droit d'auteur — sources et juridictions"
```

Pas de nouveau code TS. Pas de nouveau tool MCP. Le skill `revue-open-source` v0.1 existant est PRÉSERVÉ avec son banner v0.1 (V4.1 le remplacera proprement par `licence-droit-auteur` + amélioration).

### 3.2 Pas d'extension `@hacienda/core`

V4.0 = uniquement Markdown FR. Réutilise potentiellement `hacienda-sources-officielles` pour vérification CPI / jurisprudence (Légifrance + base jurisprudence Cour de cass).

### 3.3 Configuration utilisateur

Aucun nouveau fichier user-stable. Outputs vont dans `outputs/` existant :
- `qualification-oeuvre-<slug>-YYYY-MM-DD.md`
- `logiciels-pi-<projet-slug>-YYYY-MM-DD.md`

## 4. Le skill `qualification-oeuvre`

### 4.1 Frontmatter

```yaml
---
name: qualification-oeuvre
description: >
  Qualifie juridiquement une création : originalité (CPI L.111-1, critère
  "marque de la personnalité"), catégorie d'œuvre (L.112-2 liste non
  exhaustive), titularité initiale (créateur personne physique / collaboration
  L.113-2 / collective / composite / commande / salariat). Distingue droits
  patrimoniaux (L.122-1 à 12, cessibles, durée 70 ans post mortem L.123-1) vs
  droit moral (L.121-1, perpétuel, inaliénable, imprescriptible). NE produit
  PAS d'avis d'opportunité d'action — validation avocat spécialisé PI requise.
argument-hint: "[description œuvre | contexte création | catégorie suspectée]"
---
```

### 4.2 Sections (~600 lignes, style Anthropic FR)

1. **Garde-fou loud** :
   > **Qualification juridique ≠ avis d'opportunité.** Ce skill produit une **analyse de qualification** pour aider l'avocat spécialisé en propriété littéraire et artistique. Il NE conclut PAS à l'existence ou à la non-existence du droit d'auteur (= rôle du juge, in fine), NE rédige PAS un contrat de cession ou de licence (= `cession-droit-auteur` V4.1 / `licence-droit-auteur` V4.1), NE qualifie PAS une contrefaçon (= `contrefacon-droit-auteur` V4.2). Le droit d'auteur **naît automatiquement à la création** (CPI L.111-1) sans formalité de dépôt — mais la **preuve de la date de création et de l'identité de l'auteur** reste critique en cas de litige (cf. `depot-preuve-creation` v0.1 préservé).

2. **Chargement profil** : rôle (avocat / juriste / non-juriste), secteurs (édition / audiovisuel / logiciel / design / mode / publicité / multimedia), posture conseil (préventif vs réactif), approbateurs.

3. **Intake batch unique** 5 questions :
   - **Description de l'œuvre** : nature (texte / image / musique / vidéo / logiciel / design / multimedia / autre), forme tangible (manuscrit / fichier / partition / maquette / code source / autre)
   - **Contexte de création** : créateur(s) (personne physique seule / multiple), commande (oui/non, par qui), salariat (oui/non, fonctions habituelles ou hors fonctions), collaboration (multiple créateurs avec apports identifiables), œuvre collective (initiative + édition + diffusion sous nom personne morale)
   - **Date de création** + **preuves disponibles** (manuscrits horodatés, mails, dépôts copyrght.fr / huissier / enveloppe Soleau INPI, etc.)
   - **Catégorie suspectée** (littéraire / artistique / musicale / audiovisuelle / logicielle / base de données / design / autre — référence non exhaustive L.112-2)
   - **Objectif de la qualification** : préventif (avant exploitation/diffusion) / défensif (contestation par tiers) / contentieux (action en contrefaçon en préparation)

4. **Étape 1 — Analyse de l'originalité (L.111-1)** :
   - Critère central : **"l'œuvre porte la marque de la personnalité de son auteur"** (Cour de cass. 1re civ., critère reformulé par CJUE Infopaq C-5/08 2009 : "création intellectuelle propre à son auteur")
   - L'originalité s'apprécie au cas par cas — pas de seuil minimal absolu
   - **Œuvres simples** : annuaire téléphonique → pas d'originalité (banalité), photographie simple de catalogue → originalité contestable selon mise en scène
   - **Œuvres complexes** : œuvre littéraire / cinématographique / logiciel → présomption d'originalité plus facile
   - **Tests pratiques** :
     - Le créateur a-t-il fait des **choix libres** (vs choix techniques imposés) ?
     - L'œuvre est-elle **identifiable** par rapport à d'autres créations du même genre ?
     - Y a-t-il un **effort intellectuel** au-delà de la simple compilation mécanique ?
   - **Sortie** : 🟢 originalité probable / 🟡 mixte (à argumenter) / 🔴 originalité douteuse (créations strictement utilitaires)

5. **Étape 2 — Catégorie d'œuvre (L.112-2, liste NON exhaustive)** :

   Table des catégories principales :
   - Œuvres littéraires : livres, brochures, articles, manuels, conférences, allocutions, sermons, plaidoiries
   - Œuvres artistiques : peintures, sculptures, dessins, photographies (originales), illustrations, cartes géographiques
   - Œuvres musicales : compositions avec ou sans paroles
   - Œuvres dramatiques / chorégraphiques / pantomimes
   - Œuvres cinématographiques + audiovisuelles (collaboration L.113-7)
   - Œuvres graphiques / typographiques
   - Œuvres des arts appliqués (design)
   - Logiciels (régime spécial — voir skill dédié `logiciels-pi`)
   - Œuvres multimédia (régime hybride — composition de plusieurs catégories)
   - **Bases de données** : double protection possible (droit d'auteur sur structure originale + droit sui generis L.341-1 sur investissement substantiel)

   Note importante : la liste L.112-2 est **non exhaustive** — toute création originale entre potentiellement dans la protection sans formalité.

6. **Étape 3 — Titularité initiale (selon contexte)** :

   **Cas A — Créateur personne physique unique** :
   - Titulaire de plein droit (L.113-1 : présomption de titularité au nom indiqué)
   - **Patrimoniaux + moral** dévolus au créateur dès la création

   **Cas B — Œuvre de collaboration (L.113-2 al.1)** :
   - Plusieurs personnes physiques ont participé à la création
   - **Cotitularité** proportionnelle aux contributions (souvent égalitaire faute de preuve)
   - Chaque coauteur peut faire valoir ses droits sur sa contribution distincte si séparable
   - **Exploitation commune** : requiert accord de tous (unanimité — risque de blocage)

   **Cas C — Œuvre collective (L.113-2 al.3)** :
   - Œuvre créée à l'**initiative** d'une personne (physique ou morale) qui l'**édite, la publie et la diffuse** sous son nom
   - Contributions individuelles se fondent dans l'ensemble — pas de droit individuel sur la partie
   - **Titulaire = personne morale ou physique commanditaire** (exception au droit commun L.111-1)
   - Exemples typiques : encyclopédies, dictionnaires, anthologies, périodiques

   **Cas D — Œuvre composite (L.113-2 al.2)** :
   - Œuvre nouvelle incorporant une œuvre préexistante sans collaboration de son auteur
   - Auteur de l'œuvre composite titulaire **mais sous réserve des droits de l'auteur préexistant**
   - Exemples : adaptation cinématographique d'un roman, traduction, arrangement musical

   **Cas E — Œuvre de commande** :
   - Le commanditaire ne reçoit PAS automatiquement les droits patrimoniaux
   - **Cession écrite obligatoire** (L.131-3 : écrit + énumération droits cédés + domaines d'exploitation + territoires + durée + rémunération)
   - Tant que la cession n'est pas écrite et complète, le créateur reste titulaire
   - **Erreur fréquente** : agence de communication qui livre logo + suppose cession implicite → invalidité

   **Cas F — Œuvre de salarié** :
   - **Régime de droit commun** : le salarié reste titulaire (CPI L.111-1, exception au Code du travail)
   - Cession au profit de l'employeur **requiert** une cession écrite (L.131-3) — pas automatique
   - **Exceptions au droit commun** :
     - **Logiciels (L.113-9)** : employeur titulaire des droits patrimoniaux automatiquement (régime dérogatoire — voir skill `logiciels-pi`)
     - **Œuvres journalistiques** (L.132-36 et suiv.) : cession encadrée par convention collective
     - **Agents publics** (L.111-1 al.4) : régime spécifique pour fonctionnaires

   **Cas G — Œuvre posthume** :
   - Droits dévolus aux ayants droit
   - Durée 70 ans post mortem (L.123-1)
   - Œuvres divulguées post mortem : 25 ans à compter de la divulgation (L.123-4)

7. **Étape 4 — Droits patrimoniaux vs Droit moral** :

   **Droits patrimoniaux (L.122-1 à 12)** :
   - **Reproduction** (L.122-3) : fixation matérielle permettant communication indirecte
   - **Représentation** (L.122-2) : communication directe au public
   - **Adaptation / traduction / transformation** (L.122-4) : œuvres dérivées
   - **Distribution / location / prêt** : droit de mise sur le marché de copies physiques
   - **Cessibles + limités dans le temps** : 70 ans post mortem (L.123-1)
   - **Exceptions** (L.122-5) : copie privée, courte citation, parodie, revue de presse, exception pédagogique, exception handicap

   **Droit moral (L.121-1, perpétuel, inaliénable, imprescriptible)** :
   - **Droit de divulgation** (L.121-2) : décider du moment et des conditions de la première publication
   - **Droit de paternité** : exigence du nom + qualité d'auteur
   - **Droit à l'intégrité** : opposition à toute modification dénaturant l'œuvre
   - **Droit de repentir / retrait** (L.121-4) : faire cesser l'exploitation moyennant indemnisation

   **Point de friction critique** : le cessionnaire des droits patrimoniaux ne peut PAS modifier l'œuvre sans accord de l'auteur (droit à l'intégrité moral inaliénable) — d'où nécessité de clauses contractuelles spécifiques (adaptation autorisée, contexte de diffusion, format dérivés) dans tout contrat de cession.

8. **Étape 5 — Durée de protection** :
   - **Règle générale (L.123-1)** : vie de l'auteur + **70 ans post mortem**
   - **Logiciels** : même durée (L.123-1, pas de régime dérogatoire de durée)
   - **Bases de données sui generis (L.342-5)** : **15 ans** à compter de l'achèvement (régime indépendant du droit d'auteur)
   - **Œuvres de collaboration** : 70 ans après décès du **dernier coauteur survivant** (L.123-2)
   - **Œuvres collectives / pseudonymes / anonymes** : 70 ans à compter de la publication (L.123-3)
   - **Œuvres posthumes** divulguées post mortem : 25 ans à compter de la divulgation (L.123-4)

9. **Étape 6 — Enjeux identifiés (selon objectif de la qualification)** :

   **Objectif préventif** :
   - Cession incomplète ou inexistante → risque d'opposition future de l'auteur
   - Droits moraux mal gérés (rebranding, modifications, intégration dans système tiers) → action en violation droit moral
   - Régime logiciel vs œuvre littéraire → identification critique pour SaaS / applications

   **Objectif défensif** (contestation par tiers) :
   - Notre œuvre est-elle bien originale au sens CJUE Infopaq ? Tests à appliquer
   - Notre titularité est-elle bien établie (chaîne de cessions tracée) ?
   - L'œuvre contestée est-elle vraiment dérivée de la nôtre ?

   **Objectif contentieux** (préparation action contrefaçon) :
   - Preuves de date de création (renvoi `depot-preuve-creation` v0.1)
   - Identification des droits violés (patrimoniaux et/ou moraux)
   - Évaluation préjudice préliminaire (différé `contrefacon-droit-auteur` V4.2)

10. **Format de sortie** (template Markdown inline quadruple fence) :
    - En-tête confidentialité
    - Garde-fou reformulé
    - Note du relecteur (sources lues, objectif qualification, points review)
    - Triage 🟢 ORIGINALITÉ + TITULARITÉ CLAIRES / 🟡 MIXTE / 🔴 PROBLÉMATIQUE
    - Section "Œuvre analysée" récap
    - Section "Analyse originalité (L.111-1)" — tests appliqués + verdict
    - Section "Catégorie L.112-2 retenue"
    - Section "Titularité initiale" — cas applicable (A à G) + analyse
    - Section "Droits patrimoniaux vs Droit moral" — pour cas concret
    - Section "Durée de protection"
    - Section "Enjeux identifiés" — selon objectif
    - Section "Recommandations" bucketées :
      - Si préventif : actions à prendre avant exploitation (cession écrite, dépôt preuve, clauses moral)
      - Si défensif : preuves à constituer, argumentation
      - Si contentieux : étapes avant action TJ Paris
    - "Une question hors de ma checklist"
    - "Que veux-tu faire ?" (5 options : Rédiger cession / Escalader / Compléter faits / Préparer preuves / Autre)

11. **Gate non-juriste** : brief avocat spécialisé PI (qualification + titularité + droits + 3 questions critiques).

12. **Emplacement** : `~/.claude/plugins/config/.../outputs/qualification-oeuvre-<slug>-YYYY-MM-DD.md`.

13. **Ce que ce skill NE fait PAS** : conclure définitivement à l'existence du droit d'auteur (= juge in fine), rédiger contrat cession (= `cession-droit-auteur` V4.1), rédiger licence (= `licence-droit-auteur` V4.1), qualifier contrefaçon (= `contrefacon-droit-auteur` V4.2), déposer preuve de création (= `depot-preuve-creation` v0.1), évaluer préjudice (= V4.2), gérer succession ayants droit, traiter droits voisins (artistes-interprètes, producteurs).

14. **Ton** : analytique, précis, équilibré (présenter incertitudes + forces).

## 5. Le skill `logiciels-pi`

### 5.1 Frontmatter

```yaml
---
name: logiciels-pi
description: >
  Analyse le régime juridique d'un logiciel sous droit d'auteur français :
  titularité salarié employeur (CPI L.113-9 régime dérogatoire), licences
  d'utilisation (L.122-6 droits + L.122-6-1 exceptions), licences propriétaires
  vs open source (typologie GPL/LGPL/MIT/Apache/BSD + compatibilité), SaaS et
  bases de données associées. NE rédige PAS de contrat — coopère avec
  `cession-droit-auteur` (V4.1), `licence-droit-auteur` (V4.1) et `revue-open-source` (v0.1).
argument-hint: "[nom projet | contexte développement | type licence visée]"
---
```

### 5.2 Sections (~550 lignes, style Anthropic FR)

1. **Garde-fou loud** :
   > **Analyse régime ≠ rédaction contractuelle.** Ce skill analyse le **régime juridique** d'un logiciel sous droit d'auteur français. Il NE rédige PAS le contrat de cession (= `cession-droit-auteur` V4.1) ni la licence d'utilisation (= `licence-droit-auteur` V4.1). Le régime logiciel est **dérogatoire au droit commun** du droit d'auteur — CPI L.113-9 attribue automatiquement les droits patrimoniaux à l'**employeur** pour les logiciels créés par un salarié dans l'exercice de ses fonctions, ce qui est l'**inverse** du régime général (où le salarié reste titulaire sauf cession écrite). Cette particularité est source d'erreurs récurrentes pour les startups SaaS.

2. **Chargement profil** : rôle, secteurs (SaaS B2B/B2C / open source / éditeur logiciel / agence dev / fintech / e-commerce / autre), posture conseil, approbateurs, partenaires juridiques (avocat spécialisé tech, conseil propriété intellectuelle).

3. **Intake batch unique** 5 questions :
   - **Nom du projet / logiciel**
   - **Contexte de développement** : développeur(s) (personne(s) physique(s) salariée(s) / prestataire(s) externe(s) / mixte interne+externe / open source community)
   - **Statut du logiciel** : développement initial / extension / fork / dérivation d'un projet open source existant
   - **Type d'utilisation prévue** : interne uniquement / commercialisation propriétaire / SaaS payant / open source pur / dual licensing (open source + commercial)
   - **Dépendances open source** : utilisation de bibliothèques (lister principales + leurs licences si connues — sinon proposer scan dépendances via npm/pip/maven)

4. **Étape 1 — Titularité initiale du logiciel (L.113-9 régime dérogatoire)** :

   **Règle CPI L.113-9** : "Sauf dispositions statutaires ou stipulations contraires, les droits patrimoniaux sur les **logiciels et leur documentation** créés par **un ou plusieurs employés** dans l'exercice de leurs **fonctions** ou d'après les **instructions de leur employeur** sont dévolus à l'employeur qui est seul habilité à les exercer."

   **Conditions cumulatives** :
   - Le créateur est **salarié** (contrat de travail, lien de subordination)
   - Le logiciel est créé **dans l'exercice des fonctions** OU d'après **les instructions** de l'employeur
   - Pas de **convention contraire** dans le contrat de travail ou les statuts

   **Cas analysés** :
   - **Salarié développeur dans ses fonctions habituelles** → L.113-9 s'applique → employeur titulaire patrimoniaux + droit moral reste au salarié
   - **Salarié développeur hors fonctions habituelles** (ex : développeur web qui code un jeu vidéo sur son temps personnel) → L.113-9 NE s'applique PAS → salarié reste titulaire patrimoniaux
   - **Prestataire externe (freelance, agence, ESN)** → L.113-9 NE s'applique PAS → cession écrite obligatoire (L.131-3) sous peine de nullité
   - **Stagiaire / apprenti** → cas ambigu, généralement L.113-9 par analogie si convention encadre
   - **Contributeur open source bénévole** → reste titulaire de sa contribution sauf cession explicite (CLA — Contributor License Agreement)

   **Erreur fréquente startup SaaS** :
   > "Notre CTO co-fondateur a développé le MVP avant de signer son contrat de travail" → CTO reste titulaire patrimoniaux personnels jusqu'à signature contrat OU cession écrite explicite. Audit DD due diligence pré-levée révèle ce problème → blocage / renégociation valorisation.

   **Erreur fréquente agence dev** :
   > "Le code livré au client est sa propriété." Faux par défaut. Le code dev par les salariés de l'agence appartient à L.113-9 → AGENCE titulaire patrimoniaux. Pour transférer au client, **cession écrite obligatoire** dans le contrat de prestation (clause type "Cession des droits de propriété intellectuelle").

5. **Étape 2 — Droit d'utilisation logiciel (L.122-6)** :

   Le droit d'utilisation comprend (L.122-6) :
   - Reproduction permanente ou provisoire (téléchargement, installation, exécution en RAM)
   - Adaptation, traduction, arrangement, transformation
   - Distribution au public (vente, location)

   **Exceptions au droit d'utilisation (L.122-6-1)** :
   - **Copie de sauvegarde** (1 copie pour préserver l'utilisation)
   - **Test de l'utilisateur légitime** : analyser fonctionnement du logiciel pour comprendre idées et principes
   - **Décompilation pour interopérabilité** : strictement encadrée, conditions cumulatives (information nécessaire à interopérabilité non disponible facilement par ailleurs)
   - **Correction d'erreurs** : utilisateur légitime peut corriger les erreurs sauf interdiction contractuelle expresse

   **Importance pratique** : ces exceptions sont **d'ordre public** — les clauses contractuelles qui les excluraient sont nulles.

6. **Étape 3 — Typologie des licences logiciel** :

   **Licences propriétaires** :
   - Code source **fermé**, distribution sous EULA (End User License Agreement)
   - Droits d'utilisation strictement limités (1 utilisateur, 1 serveur, etc.)
   - Pas de modification autorisée
   - Pas de redistribution
   - Exemples : Microsoft Office, Adobe Creative Cloud

   **Licences open source** — typologie 4 grandes catégories :

   **A. Permissives (faible contrainte de réciprocité)** :
   - **MIT / BSD** : "do whatever you want, just keep copyright notice"
   - **Apache 2.0** : MIT + protection brevet explicite + notice modifications
   - **ISC** : équivalent MIT simplifié
   - Compatible avec licences propriétaires (peut être incorporé dans produit commercial fermé)

   **B. Copyleft fort (réciprocité totale)** :
   - **GPL v2** : tout logiciel intégrant du code GPL doit être distribué sous GPL ("contamination virale")
   - **GPL v3** : GPL v2 + protection brevet + clause anti-tivoization
   - **AGPL v3** : GPL v3 étendue au SaaS (utilisation sur serveur = redistribution → obligation de fournir source aux utilisateurs)
   - **Incompatible** avec licences propriétaires (forks commerciaux interdits sauf dual licensing du projet original)

   **C. Copyleft faible (réciprocité limitée à la modification)** :
   - **LGPL v2.1 / v3** : modifications du code LGPL doivent rester LGPL, mais **liaison dynamique** depuis logiciel propriétaire est autorisée
   - **MPL 2.0** (Mozilla) : copyleft "fichier par fichier" — modifications du fichier MPL restent MPL, mais autres fichiers du projet peuvent être propriétaires
   - **EPL** (Eclipse) : similaire MPL avec spécificités plugin

   **D. Spécifiques** :
   - **Creative Commons** (CC-BY, CC-BY-SA, CC-BY-NC, etc.) : pour contenus créatifs (textes, images, musique) — généralement pas pour code
   - **Licences custom** : à analyser au cas par cas (risque juridique)

   Référence : `references/licences-open-source.md` (matrices de compatibilité).

7. **Étape 4 — Compatibilité des licences (problème "viral")** :

   **Risque "contamination virale"** :
   - Si un projet propriétaire intègre du code GPL → l'ensemble doit être distribué sous GPL
   - Conséquences pour startup SaaS : obligation de fournir code source aux utilisateurs (AGPL) ou clients (GPL)
   - Risque commercial majeur : modèle business propriétaire devient impossible

   **Matrices de compatibilité simplifiées** :
   - **Code MIT + projet propriétaire** : ✅ compatible (MIT permissive)
   - **Code GPL + projet propriétaire** : ❌ impossible (contamination GPL)
   - **Code LGPL + projet propriétaire (liaison dynamique)** : ✅ OK (modification LGPL = pas applicable)
   - **Code LGPL + projet propriétaire (liaison statique)** : ⚠️ contesté (interprétations varient)
   - **Code AGPL + SaaS propriétaire** : ❌ impossible (AGPL couvre l'utilisation serveur)

   **Recommandations** :
   - Tout projet SaaS B2B doit **scanner ses dépendances** régulièrement (outils SCA : Snyk, Black Duck, FOSSA, GitHub Dependabot)
   - Politique de cabinet : whitelist (MIT/BSD/Apache/MPL OK) + blacklist (GPL/AGPL interdit sauf isolation stricte) + zone d'alerte (LGPL au cas par cas)
   - **Cleanup audit pré-levée Series A+** : exiger SBOM (Software Bill of Materials) + analyse licences avant due diligence

8. **Étape 5 — Cas SaaS et bases de données associées** :

   **SaaS** :
   - L'utilisateur n'**installe pas** le logiciel chez lui → utilisation à distance via interface web/API
   - Régime L.122-6 s'applique au code serveur (hébergement = reproduction)
   - **AGPL particulièrement piégeuse** : l'utilisation serveur compte comme "distribution" déclenchant obligation source ouverte

   **Bases de données associées** :
   - **Double protection possible** :
     - Droit d'auteur sur **structure** originale (schéma, organisation) si originale au sens L.111-1
     - **Droit sui generis** L.341-1 sur **investissement substantiel** (financier, matériel, humain) pour constitution, vérification, présentation du contenu
   - Durée droit sui generis : **15 ans** à compter de l'achèvement (L.342-5) — renouvelable si modification substantielle
   - Bénéficiaire droit sui generis : **producteur** (personne qui a fait l'investissement, souvent personne morale)
   - Important : 2 droits indépendants — une base peut avoir l'un sans l'autre (ex : base très simple structurellement mais avec contenu massif coûteux à compiler → sui generis OK, droit d'auteur fragile)

9. **Étape 6 — Recommandations selon situation** :

   **Startup early stage avec dev internes salariés** :
   - L.113-9 s'applique automatiquement → employeur titulaire patrimoniaux
   - **Verrouiller** : contrat de travail mention explicite "logiciels créés dans le cadre des fonctions appartiennent à l'employeur conformément à L.113-9"
   - **Vérifier** : développeurs ayant codé AVANT signature contrat → cession écrite rétroactive nécessaire

   **Agence dev ou ESN livrant à clients** :
   - L.113-9 attribue à l'AGENCE (employeur) — pas au client
   - **Cession écrite obligatoire** dans contrat de prestation au client (L.131-3 : énumération droits + domaines + territoires + durée + rémunération)
   - **Modèle clause** : référence `cession-droit-auteur` V4.1

   **Projet open source à publier** :
   - Choix de licence selon objectif :
     - Permissif (MIT/Apache) : adoption maximale + compatibilité avec écosystème commercial
     - Copyleft (GPL/AGPL) : protection contre forks commerciaux propriétaires
     - Dual licensing : open source pour usage non-commercial + licence commerciale pour entreprises
   - **CLA (Contributor License Agreement)** : obligatoire si contributions externes accepted (sans CLA, contributeur reste titulaire de sa contribution → blocage relicensing futur)

   **SaaS avec dépendances open source mixed** :
   - Audit SBOM mensuel via outils SCA
   - Politique : isolation AGPL (microservice séparé), validation LGPL au cas par cas
   - Documentation interne : registre licences + responsable conformité

10. **Format de sortie** template Markdown inline quadruple fence (calque `qualification-oeuvre` adapté logiciel).

11. **Gate non-juriste** : brief avocat spécialisé tech (régime applicable + risques licences + recommandations + 3 questions critiques).

12. **Emplacement** : `~/.claude/plugins/config/.../outputs/logiciels-pi-<projet-slug>-YYYY-MM-DD.md`.

13. **Ce que ce skill NE fait PAS** : rédiger contrat cession (= `cession-droit-auteur` V4.1), rédiger licence (= `licence-droit-auteur` V4.1), scanner dépendances open source automatiquement (= outils SCA : Snyk, FOSSA, Black Duck, GitHub Dependabot — couvert par `revue-open-source` v0.1), évaluer contrefaçon logicielle (= `contrefacon-droit-auteur` V4.2), gérer brevet logiciel (rare en France, voir bloc brevets V2.x), négocier licence commerciale (négociation business).

14. **Ton** : technique, pédagogique (le régime logiciel est complexe et mal connu).

## 6. Adaptations FR vs droit d'auteur US

| US (Copyright) | FR (Droit d'auteur) |
|---|---|
| Registration recommandée Library of Congress | **Pas de formalité** — droit naît à la création (CPI L.111-1) |
| Work-for-hire doctrine § 101 USC | Régime général : salarié reste titulaire SAUF cession écrite L.131-3 |
| Work-for-hire pour software | **L.113-9** : employeur titulaire automatique (régime dérogatoire FR seulement) |
| Fair use § 107 USC | **Exceptions limitatives** L.122-5 (copie privée, courte citation, parodie, exception pédagogique, handicap) — pas de fair use général |
| Moral rights limités (VARA seulement) | **Droit moral central**, perpétuel, inaliénable, imprescriptible (L.121-1) |
| Durée 95 ans corporate / 70 ans post mortem | Durée 70 ans post mortem uniforme |
| GPL/AGPL : risques jurisprudentiels US | GPL/AGPL : risques **transposés FR** (jurisprudence FR rare mais existe — TGI Paris 28 mars 2007 Free vs Welte) |

## 7. Critères de succès V4.0

- [ ] `npm test` vert (269 — Markdown only)
- [ ] `npm run typecheck`, `npm run build`, `npm run branding:check` verts
- [ ] `/qualification-oeuvre "<description œuvre + contexte création>"` produit qualification structurée (originalité + catégorie + titularité + droits + durée + enjeux + recommandations)
- [ ] `/logiciels-pi "<nom projet + contexte>"` produit analyse régime L.113-9 + recommandations licence
- [ ] Cross-référence claire entre les 2 skills (logiciel = cas particulier qualification)
- [ ] Pas de régression V1.0-V2.2
- [ ] Bump v0.8.0 → v0.9.0

## 8. Risques

| Risque | Mitigation |
|---|---|
| Confusion entre régime général (créateur titulaire) et régime logiciel (employeur titulaire) | Garde-fou explicite + section dédiée régime dérogatoire L.113-9 |
| Sous-estimation droit moral (perpétuel) dans cession | Section dédiée "Point de friction critique" + recommandation clauses spécifiques |
| Confusion licence open source (typologie) | Référence `licences-open-source.md` + matrice compatibilité simplifiée |
| Application doctrine US (fair use, work for hire) à droit FR | Table adaptations FR/US dans spec + rappels explicites dans SKILL.md |
| Œuvres IA générative non traitées | Hors scope V4.0 — différé V4.3+ (régime en construction CJUE + UE AI Act) |

## 9. Plan de rollout

- **V4.0 (ce spec)** — qualification œuvre + logiciels (fondations du bloc droit d'auteur)
- **V4.1** — cession-droit-auteur + licence-droit-auteur + bases-de-donnees (contrats)
- **V4.2** — contrefacon-droit-auteur (enforcement)
- **V4.3** — droits voisins (artistes-interprètes, producteurs), SACEM/OGC, NFT/IA générative
- **V1.2** — agent contrefacon-web (marques + droit d'auteur — surveillance multi-domaines)
- **V3.0** — bloc Dessins & Modèles
- **V5.0** — Contrats PI + audit-pi-ma M&A
- **V6.0** — Contentieux & Enforcement

## 10. Annexes

### A — Articles CPI référencés (Livre I — Droit d'auteur)

- **L.111-1** : droit de l'auteur sur l'œuvre de l'esprit (origine + naissance automatique)
- **L.112-2** : liste non exhaustive des œuvres protégées
- **L.113-1** : présomption de titularité au nom indiqué
- **L.113-2** : œuvre de collaboration / collective / composite
- **L.113-7** : œuvre audiovisuelle (présomption auteurs)
- **L.113-9** : logiciels créés par salariés → employeur titulaire (régime dérogatoire)
- **L.121-1** : droit moral (perpétuel, inaliénable, imprescriptible)
- **L.121-2** : droit de divulgation
- **L.121-4** : droit de repentir / retrait
- **L.122-1 à 12** : droits patrimoniaux
- **L.122-3** : reproduction
- **L.122-2** : représentation
- **L.122-4** : œuvres dérivées (adaptation, traduction, transformation)
- **L.122-5** : exceptions (copie privée, courte citation, parodie, pédagogique, handicap)
- **L.122-6** : droit d'utilisation logiciel
- **L.122-6-1** : exceptions au droit d'utilisation logiciel (copie sauvegarde, test, décompilation, correction erreurs)
- **L.122-7** : cession droits patrimoniaux
- **L.123-1** : durée 70 ans post mortem
- **L.123-2** : œuvre de collaboration (dernier coauteur)
- **L.123-3** : œuvre collective / pseudonyme / anonyme
- **L.123-4** : œuvre posthume divulguée
- **L.131-1 à 8** : règles de forme cessions
- **L.131-3** : cession écrite + énumération droits + domaines + territoires + durée + rémunération
- **L.132-36 et suiv.** : œuvres journalistiques (régime spécifique)

### B — Articles CPI référencés (Livre III — Bases de données sui generis)

- **L.341-1** : droit sui generis du producteur de base de données (investissement substantiel)
- **L.342-5** : durée 15 ans (renouvelable si modification substantielle)

### C — Jurisprudence clé

- **Cour de cass. 1re civ. 7 mars 1986** (Pachot) : critère originalité logiciel (effort personnalisé)
- **CJUE Infopaq C-5/08 (2009)** : reformulation critère originalité = "création intellectuelle propre à son auteur"
- **CJUE Painer C-145/10 (2011)** : photographie originale même si nature documentaire
- **CJUE BSA C-393/09 (2010)** : interface graphique n'est pas une œuvre protégée par le droit d'auteur logiciel
- **TGI Paris 28 mars 2007** : Free vs Welte (GPL applicable en droit FR — premier précédent open source)

### D — Inspirations

- `qualification-oeuvre` : workflow inédit, structure inspirée de `recherche-anteriorite-brevet` V2.0 (analyse multi-étapes)
- `logiciels-pi` : workflow inédit, structure inspirée de `qualification-oeuvre` (cas particulier)
- Doc origine `plan-propriete-intellectuelle-fr.md` §3 (Bloc 4 Droit d'auteur)
- Skill `revue-open-source` v0.1 préservé (couvre scan dépendances open source — complémentaire)
- Skill `depot-preuve-creation` v0.1 préservé (preuves de date de création)

---

*Version 4.0 — mode autonome, démarrage bloc droit d'auteur.*
