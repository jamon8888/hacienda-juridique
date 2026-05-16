---
name: logiciels-pi
description: >
  Analyse du régime juridique d'un logiciel sous droit d'auteur français (CPI
  Livre I + régime spécifique L.113-9 dérogatoire au droit commun). Couvre :
  (1) titularité initiale L.113-9 — employeur titulaire AUTOMATIQUE des droits
  patrimoniaux pour logiciels créés par salariés dans l'exercice de leurs
  fonctions (régime INVERSE du droit commun salariat), (2) droit d'utilisation
  L.122-6 et exceptions d'ordre public L.122-6-1 (copie de sauvegarde, test,
  décompilation pour interopérabilité, correction d'erreurs), (3) typologie
  licences propriétaires vs open source (permissives MIT/BSD/Apache, copyleft
  fort GPL/AGPL, copyleft faible LGPL/MPL), (4) matrices de compatibilité et
  risque "contamination virale" GPL/AGPL, (5) cas SaaS (AGPL piégeuse) et bases
  de données associées (double protection droit d'auteur + sui generis L.341-1),
  (6) recommandations selon situation (startup / agence dev / projet open source
  / SaaS mixed). Ne rédige PAS le contrat de cession (= cession-droit-auteur
  V4.1) ni la licence d'utilisation (= licence-droit-auteur V4.1). Ne scanne
  PAS les dépendances (= outils SCA externes).
argument-hint: "[nom projet | contexte développement | type utilisation | dépendances open source]"
---

# /logiciels-pi

> **Analyse régime ≠ rédaction contractuelle.** Ce skill analyse le **régime
> juridique** d'un logiciel sous droit d'auteur français. Il NE rédige PAS le
> contrat de cession (= `cession-droit-auteur` V4.1) ni la licence
> d'utilisation (= `licence-droit-auteur` V4.1). Le régime logiciel est
> **dérogatoire au droit commun** du droit d'auteur — CPI L.113-9 attribue
> automatiquement les droits patrimoniaux à l'**employeur** pour les logiciels
> créés par un salarié dans l'exercice de ses fonctions, ce qui est l'**inverse**
> du régime général (où le salarié reste titulaire sauf cession écrite). Cette
> particularité est source d'erreurs récurrentes pour les startups SaaS, agences
> dev et projets open source.

## Examples

```
/hacienda-propriete-intellectuelle:logiciels-pi "Startup SaaS B2B fintech — équipe 4 développeurs salariés + 1 CTO cofondateur ayant codé MVP avant signature contrat — dépendances majeures React (MIT), PostgreSQL (PostgreSQL License), Stripe SDK — pré-levée Series A"
```

```
/hacienda-propriete-intellectuelle:logiciels-pi "Agence dev parisienne — prestation pour grand compte e-commerce : refonte plateforme via 3 développeurs salariés agence — livraison code source au client prévue — contrat de prestation à analyser pour cession des droits"
```

```
/hacienda-propriete-intellectuelle:logiciels-pi "Projet open source bibliothèque de visualisation de données — équipe core 3 mainteneurs salariés éditeur + ~40 contributeurs externes bénévoles — choix de licence entre MIT, Apache 2.0 ou dual licensing AGPL+commercial — pas de CLA en place actuellement"
```

(Le skill demandera le contexte de développement, le statut du logiciel,
l'utilisation prévue et les dépendances open source.)

---

## ANALYSE RÉGIME, PAS RÉDACTION CONTRACTUELLE

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Analyse régime, pas rédaction contractuelle.** Ce skill produit une
> analyse du **régime juridique** applicable à un logiciel sous droit d'auteur
> français. Il identifie la **titularité initiale** des droits patrimoniaux
> selon le régime **dérogatoire** L.113-9 (employeur titulaire AUTOMATIQUE
> pour logiciels créés par salariés dans l'exercice de leurs fonctions —
> INVERSE du droit commun salariat où le salarié reste titulaire sauf cession
> écrite), le **droit d'utilisation** L.122-6 et ses **exceptions d'ordre
> public** L.122-6-1 (copie de sauvegarde, test, décompilation pour
> interopérabilité, correction d'erreurs), la **typologie des licences**
> applicables (propriétaires, open source permissives, copyleft fort, copyleft
> faible) et leurs **matrices de compatibilité** (risque "contamination
> virale" GPL/AGPL en SaaS), les régimes particuliers SaaS et **bases de
> données associées** (double protection droit d'auteur + sui generis L.341-1
> indépendants), et les recommandations calibrées selon la **situation**
> (startup early stage / agence dev / projet open source / SaaS mixed).
>
> Il NE rédige PAS un contrat de cession (= `cession-droit-auteur` V4.1) ni
> une licence d'utilisation propriétaire ou open source (= `licence-droit-auteur`
> V4.1). Il NE scanne PAS les dépendances open source (= outils SCA externes :
> Snyk, FOSSA, Black Duck, GitHub Dependabot — couvert partiellement par
> `revue-open-source` v0.1 préservé). Il NE qualifie PAS la contrefaçon
> logicielle (= `contrefacon-droit-auteur` V4.2). Le régime logiciel reste un
> exercice juridique nécessitant validation par un **avocat spécialisé tech /
> propriété intellectuelle** avant tout acte (signature contrat de travail
> dev, contrat de prestation, choix de licence open source, publication du
> projet, dual licensing, due diligence pré-levée).
>
> Une analyse erronée porte des conséquences à sens unique : cofondateur qui
> revendique titularité personnelle d'un MVP codé avant signature contrat,
> agence dev qui croit avoir transféré la propriété au client sans clause de
> cession L.131-3 conforme, projet open source qui ne peut plus relicensier
> faute de CLA, SaaS qui découvre une dépendance AGPL imposant l'ouverture
> du code source, due diligence pré-Series A qui bloque sur ces points.

C'est le garde-fou le plus visible du skill. Sous-qualifier le régime logiciel
= porte à sens unique (contrat de travail signé sans clause L.113-9 explicite,
licence open source choisie sans analyse de compatibilité, dépendances non
auditées, CLA absent). Sur-qualifier = porte à 2 sens, l'avocat affine.
Rester sur la porte à 2 sens.

---

## Charger le profil pratique avant de commencer

Avant tout, lire :
1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Récupérer :
- **Rôle** depuis `## 1. Profil cabinet et profil de pratique PI` (avocat
  inscrit au barreau / juriste interne / non-juriste — change l'en-tête de
  confidentialité ET le périmètre du secret professionnel). Le régime logiciel
  relève à la fois du droit d'auteur (CPI Livre I) et du droit des contrats
  (cessions, licences) — il n'existe pas de profession réglementée propre au
  logiciel. Le rôle pertinent est **avocat spécialisé tech / propriété
  intellectuelle** ou à défaut **avocat PI générale** ayant pratique
  contentieuse logiciel.
- **Secteurs des clients dominants** (SaaS B2B / SaaS B2C / open source /
  éditeur logiciel propriétaire / agence dev / ESN / fintech / e-commerce /
  biotech avec composante logicielle / transversal — calibre les exemples,
  les exigences en matière de SBOM, et la vigilance sur AGPL en SaaS).
- **Posture conseil par défaut** (préventif vs réactif — préventif =
  verrouillage contrat de travail + clause cession prestation + politique
  licences open source ; réactif = analyse défensive d'une revendication
  cofondateur ou d'un avis de violation GPL).
- **Matrice d'approbateurs** pour les escalades (avocat spécialisé tech /
  CTO / DPO / GC / Direction selon enjeu — le choix d'une licence open source
  engage souvent CTO + GC ; un audit SBOM pré-Series A engage Direction).
- **Partenaires juridiques** :
  - **Avocat tech / propriété intellectuelle** pour rédaction contrats et
    contentieux logiciel
  - **Conseil PI** (mandataire INPI marques au titre du CPI L.422-4 si la
    marque du logiciel est dans le scope ; sinon hors pratique INPI)

Ce skill ne conclut JAMAIS « logiciel sécurisé juridiquement » ni « licence
choisie sans risque » — il identifie les régimes applicables et les zones de
risque, et oriente vers la rédaction contractuelle (V4.1) ou l'avocat tech
selon le cas.

Si le profil contient `[A CONFIGURER]`, surfacer :

> Le profil pratique n'est pas configuré — c'est ce qui adapte la posture, les
> secteurs (SaaS / open source / agence dev), et la chaîne d'approbation à ta
> pratique. Tu peux continuer en mode provisoire (réponses génériques taguées
> `[non configuré]`) ou lancer
> `/hacienda-propriete-intellectuelle:entretien-demarrage` (10 à 15 minutes).

---

## Intake — 5 questions en batch unique

Avant toute analyse, poser les 5 questions ci-dessous **en une seule fois**.
Ne pas dérouler le workflow tant que les réponses ne sont pas obtenues — ou
explicitement marquées « non applicable » par l'utilisateur.

**1. Nom du projet / logiciel**
- **Nom commercial** ou **nom de code** du projet
- **Slug technique** (ex : repository GitHub, package npm, image Docker) si
  pertinent
- **Marque associée** (le cas échéant — si la marque logicielle est en
  portefeuille, signaler pour orientation vers `surveillance-marque` ou
  `clearance-marque`)

**2. Contexte de développement** — qui code ?
- **Développeur(s) salarié(s) interne(s)** seuls (équipe entièrement
  internalisée — régime L.113-9 applicable a priori)
- **Prestataire(s) externe(s)** seuls (freelances, agence dev, ESN — régime
  L.113-9 NON applicable, cession écrite L.131-3 obligatoire dans le contrat
  de prestation)
- **Mixte interne + externe** (cas le plus fréquent — cartographier par
  composant ou par module qui a codé quoi)
- **Open source community** (contributeurs externes bénévoles — pas de
  L.113-9, chaque contributeur titulaire de sa contribution sauf CLA signé)
- **Cofondateurs ayant codé avant signature contrat de travail** (cas piège
  classique startup — le cofondateur reste titulaire personnel jusqu'à
  cession écrite rétroactive)

Pour chaque catégorie applicable, préciser : **combien**, **rôles**, **et
relation contractuelle** (contrat de travail / contrat de prestation /
contrat de stage / convention de stage / CLA / aucun).

**3. Statut du logiciel**
- **Développement initial** (greenfield — création ex nihilo)
- **Extension de produit existant** (ajout fonctionnalité, module, plugin
  sur produit propriétaire ou open source maison)
- **Fork d'un projet open source** (préciser projet source + licence — la
  licence amont impose des contraintes au fork : MIT permet fork
  propriétaire, GPL impose fork GPL, etc.)
- **Dérivation d'un produit propriétaire** (cas plus rare — licence
  propriétaire amont autorise-t-elle la dérivation ? généralement non, sauf
  clause expresse)

**4. Type d'utilisation prévue**
- **Interne uniquement** (outil métier non distribué — pas de licence de
  distribution mais analyse titularité utile pour due diligence ou
  réutilisation future)
- **Commercialisation propriétaire** (vente de licences d'utilisation — code
  source fermé, EULA propriétaire)
- **SaaS payant** (hébergement chez l'éditeur, accès distant — attention
  particulière AGPL et licences serveur)
- **Open source pur** (publication sous une licence libre — choix de la
  licence critique selon objectif communauté vs protection)
- **Dual licensing** (open source pour usage non commercial / communautaire
  + licence commerciale pour entreprises — modèle MySQL, MongoDB historique,
  Qt — nécessite CLA pour relicensing)

**5. Dépendances open source**
- **Bibliothèques / frameworks utilisés** : lister les principales avec
  leurs licences si connues
  - Exemple : React 18 (MIT), Next.js (MIT), PostgreSQL (PostgreSQL
    License — type BSD), Stripe SDK (MIT), Tailwind (MIT)
- Si licences inconnues OU si la liste n'est pas exhaustive ET si le projet
  dépasse le stade prototype → **recommander scan SCA avant analyse** :
  - **Snyk** (commercial + free tier) : https://snyk.io
  - **FOSSA** (commercial) : https://fossa.com
  - **Black Duck Synopsys** (commercial entreprise)
  - **GitHub Dependabot** (intégré GitHub, gratuit)
  - **OWASP Dependency-Check** (open source) : https://owasp.org/www-project-dependency-check
- Pour un projet SaaS ou commercialisé, l'analyse de compatibilité sans
  SBOM (Software Bill of Materials) à jour est **incomplète par construction**
  — signaler explicitement et proposer d'attendre le résultat du scan.

Si l'utilisateur ne peut pas répondre à une question, demander : « lance
le scan SCA et reviens, ou continue avec les éléments connus en taguant les
zones non auditées `[dépendance non auditée — à scanner]` ».

---
