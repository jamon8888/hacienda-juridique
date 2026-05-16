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

## Étape 1 — Titularité initiale du logiciel (L.113-9 régime dérogatoire)

C'est le **cœur** de la spécificité logiciel. Mal traiter L.113-9 = porte à
sens unique sur tout le cycle de vie du logiciel (contrat de travail mal
rédigé, cession agence-client invalide, fork open source non maîtrisé).

### Règle CPI L.113-9

> « Sauf dispositions statutaires ou stipulations contraires, les droits
> patrimoniaux sur les **logiciels et leur documentation** créés par **un ou
> plusieurs employés** dans l'exercice de leurs **fonctions** ou d'après les
> **instructions de leur employeur** sont dévolus à l'employeur qui est seul
> habilité à les exercer. »

### Conditions cumulatives

1. **Le créateur est salarié** (contrat de travail, lien de subordination —
   Code travail L.1221-1). Pas de salariat = pas de L.113-9.
2. **Le logiciel est créé dans l'exercice des fonctions** OU **d'après les
   instructions de l'employeur**. Hors fonctions et hors instructions =
   sortie de L.113-9.
3. **Pas de convention contraire** dans le contrat de travail ou les
   statuts de la société. Une clause expresse peut écarter L.113-9 (rare en
   pratique mais possible — par exemple pour un dirigeant-cofondateur qui
   conserve la titularité personnelle pour la valoriser ailleurs).

Le champ de L.113-9 couvre **le logiciel ET sa documentation** — penser à la
documentation technique (architecture, API, manuels d'installation) qui suit
le même régime.

### Cas analysés

| Cas | L.113-9 applicable ? | Conséquence titularité |
|---|---|---|
| Salarié développeur, **fonctions habituelles** (développeur full-stack qui développe la feature roadmap) | ✅ OUI | Employeur titulaire patrimoniaux ; salarié garde droit moral (paternité + intégrité, dans la mesure compatible avec exploitation logiciel) |
| Salarié développeur, **hors fonctions habituelles** (ex : développeur web salarié qui code un jeu vidéo sur temps personnel) | ❌ NON | Salarié reste titulaire patrimoniaux personnels ; employeur peut négocier cession écrite L.131-3 a posteriori |
| **Prestataire externe** (freelance, agence, ESN, consultant indépendant) | ❌ NON | Prestataire titulaire — **cession écrite obligatoire L.131-3** dans le contrat de prestation (énumération droits + domaines + territoires + durée + rémunération) |
| **Stagiaire / apprenti** sous convention | ⚠️ Ambigu | Généralement L.113-9 par analogie si convention encadre les missions et qu'un lien de subordination existe — sinon cession écrite recommandée par prudence `[review]` |
| **Contributeur open source bénévole** (community external contributor) | ❌ NON | Contributeur reste titulaire de sa contribution sauf **CLA (Contributor License Agreement) signé** explicite |
| **Cofondateur** qui développe MVP **avant signature contrat de travail** | ❌ NON | Cofondateur titulaire personnel — **cession écrite rétroactive nécessaire** (avec mentions L.131-3, rémunération même symbolique mais identifiée) |
| **Agent public** (fonctionnaire) — création par agent dans le cadre de ses missions | Régime spécifique L.131-3-1 | Variable selon mission de service public + identité de l'employeur public ; renvoi régime spécifique CPI L.131-3-1 et suiv. `[review]` |

### Articulation droit moral pour le logiciel

Le droit moral existe sur les logiciels (CPI L.121-7 spécifique logiciel),
mais il est **restreint** par rapport au droit moral général :

- **Droit de paternité** : maintenu (mention du nom de l'auteur sur les
  copies — souvent sous forme de "headers" copyright dans les fichiers source
  ou de section "credits/contributors" dans la documentation).
- **Droit au respect (intégrité)** : maintenu mais l'auteur **NE PEUT PAS
  s'opposer aux modifications nécessaires** à l'exploitation du logiciel
  (corrections, mises à jour, portage, intégration) — sauf atteinte à son
  honneur ou à sa réputation (rare en pratique).
- **Droit de divulgation** : maintenu (l'auteur décide de la première
  publication — peu pertinent en pratique pour logiciel sous L.113-9 où
  l'employeur décide).
- **Droit de retrait / repentir** : exclu pour le logiciel (L.121-7 al. 2)
  — pas de retour possible une fois divulgué (contrairement au droit commun
  L.121-4 qui permet le retrait moyennant indemnisation préalable).

### Erreur fréquente 1 — Startup SaaS

> « Notre CTO co-fondateur a développé le MVP avant de signer son contrat de
> travail » → CTO reste **titulaire patrimoniaux personnels** jusqu'à
> signature contrat OU cession écrite explicite L.131-3. **L'audit due
> diligence pré-levée Series A révèle ce problème → blocage de la levée /
> renégociation valorisation / cession rétroactive imposée en urgence sous
> pression investisseurs.**

Mécanique de la cession rétroactive (à faire valider par avocat tech) :
- Identifier précisément la période concernée (avant signature contrat
  de travail)
- Énumérer les composants logiciels développés sur cette période (commits
  Git, factures freelance s'il y en a eu, livrables identifiables)
- Acte de cession écrit avec mentions L.131-3 (droits cédés + domaines +
  territoires + durée + rémunération — même symbolique mais identifiée)
- Signature **avant** clôture de la due diligence — au moins avant
  signature term sheet pour la levée

### Erreur fréquente 2 — Agence dev / ESN

> « Le code livré au client est sa propriété. » **Faux par défaut.** Le code
> développé par les salariés de l'agence appartient à l'agence en vertu de
> L.113-9 → **AGENCE titulaire patrimoniaux**. Pour transférer au client,
> **cession écrite obligatoire** dans le contrat de prestation.

Clause type "Cession des droits de propriété intellectuelle" à insérer dans
le contrat de prestation (renvoi rédaction → `cession-droit-auteur` V4.1) :
- Énumération précise des droits cédés (reproduction, représentation,
  adaptation, traduction, mise sur le marché)
- Étendue (code source + documentation + assets)
- Destination (utilisation du client : interne / commercialisation /
  redistribution)
- Lieu (territoires : France / Europe / Monde)
- Durée (toute la durée légale ou pendant durée d'exploitation)
- Rémunération (forfait inclus dans le prix de la prestation ou somme
  identifiable)

**Attention au champ "documentation"** : L.113-9 couvre logiciel +
documentation, mais la cession doit **mentionner explicitement les deux** —
une clause qui ne mentionne que "le logiciel" laisse la documentation chez
l'agence.

### Erreur fréquente 3 — Projet open source

> « Tous les contributeurs ont accepté la licence GPL en commitant. »
> **Insuffisant.** L'acceptation de la licence projet n'emporte **PAS
> cession des droits** — elle confère seulement une licence d'utilisation
> aux conditions GPL. Sans **CLA (Contributor License Agreement) signé**,
> chaque contributeur reste titulaire de sa contribution.

Conséquences pratiques de l'absence de CLA :
- **Impossibilité de relicensing futur** : si le projet veut passer en
  dual licensing (open source + commercial) ou en propriétaire, il faut
  l'**accord de chaque contributeur** sur sa contribution — irréaliste
  sur un projet à 40+ contributeurs avec turnover.
- **Risque revendication titularité** : un contributeur peut a posteriori
  revendiquer la titularité de sa contribution et l'opposer à l'éditeur.
- **Blocage commercialisation** : modèle business pivot devient impossible.

Modèles CLA usuels (renvoi `references/licences-open-source.md`) :
- Apache CLA (https://www.apache.org/licenses/contributor-agreements.html)
- FSF Contributor Agreement
- Salesforce CLA (template populaire pour projets d'éditeurs)

---

## Étape 2 — Droit d'utilisation logiciel (L.122-6) + exceptions L.122-6-1

### Droit d'utilisation L.122-6

Le droit d'utilisation du logiciel — réservé au titulaire des droits
patrimoniaux — comprend (CPI L.122-6) :

- **Reproduction permanente ou provisoire** du logiciel, totale ou partielle,
  par tout moyen et sous toute forme. Cela inclut **le téléchargement,
  l'installation, le chargement en RAM lors de l'exécution** — c'est-à-dire
  toute utilisation effective du logiciel.
- **Adaptation, traduction, arrangement, transformation** du logiciel, et
  reproduction du logiciel en résultant. Cela couvre les modifications, les
  ports vers d'autres environnements, les forks, les traductions de
  l'interface.
- **Distribution au public** du logiciel ou d'une copie, par tout procédé,
  notamment **vente, location, prêt** (avec **épuisement du droit de
  distribution** pour la première vente d'une copie au sein de l'EEE — CJUE
  UsedSoft C-128/11 qui a étendu l'épuisement aux licences perpétuelles
  téléchargées, mais l'arrêt **ne s'applique PAS** au SaaS).

Toute personne qui exécute une de ces opérations sans autorisation du
titulaire commet une **contrefaçon de logiciel** (renvoi `contrefacon-droit-auteur`
V4.2 — qui couvrira contrefaçon générale ; le régime logiciel a quelques
spécificités procédurales : saisie-contrefaçon adaptée au code source,
expertise judiciaire spécialisée).

### Exceptions au droit d'utilisation — L.122-6-1 — d'ordre public

Ces exceptions sont **d'ordre public** : les clauses contractuelles qui les
excluraient sont **nulles** (et donc inopposables à l'utilisateur légitime).
C'est un point critique de la défense face à une EULA propriétaire trop
restrictive.

| Exception | Champ | Limites |
|---|---|---|
| **Copie de sauvegarde** (L.122-6-1 II) | 1 copie nécessaire à la préservation de l'utilisation | Pas de copies multiples, pas de partage, usage strictement personnel à l'utilisateur légitime |
| **Test / observation de l'utilisateur légitime** (L.122-6-1 III) | Analyser le fonctionnement pour comprendre les **idées et principes** à la base de tout élément du logiciel | Doit se faire dans le cadre d'opérations licites (chargement, affichage, exécution, transmission, stockage) — pas de reverse engineering pour reproduire / contrefaire |
| **Décompilation pour interopérabilité** (L.122-6-1 IV) | Strictement encadrée | Conditions cumulatives : (a) information nécessaire à l'interopérabilité **non disponible facilement par ailleurs** ; (b) limité aux parties du logiciel strictement nécessaires à cette interopérabilité ; (c) résultats utilisés uniquement pour assurer l'interopérabilité d'un logiciel créé de façon indépendante, **non utilisés à d'autres fins** ni transmis à des tiers (sauf si nécessaires à l'interopérabilité) |
| **Correction d'erreurs** (L.122-6-1 I) | L'utilisateur légitime peut corriger les erreurs nécessaires à l'utilisation conforme à la destination | **Sauf interdiction contractuelle expresse** — c'est la seule exception qui peut être écartée par contrat (mais nécessite une clause claire et négociée, pas une mention noyée dans une EULA d'adhésion) |

### Importance pratique critique

> Ces exceptions sont **d'ordre public** — les clauses contractuelles qui les
> excluraient (totalement) sont **nulles**. Une licence propriétaire qui
> interdirait toute décompilation pour interopérabilité est partiellement
> nulle pour cette stipulation. Ce qui ne signifie **pas** que la
> décompilation est libre — les conditions cumulatives L.122-6-1 IV doivent
> être strictement respectées, et la charge de la preuve du respect de ces
> conditions pèse sur celui qui décompile.

L'exception **correction d'erreurs** est la seule susceptible d'être écartée
contractuellement — vérifier l'EULA avant correction unilatérale.

### Cas pratique fréquent — entreprise A et vendor B abandonné

- Entreprise A développe son ERP interne sur **middleware propriétaire**
  vendor B
- Vendor B est racheté + **arrête de supporter** le middleware (end of
  life, plus de correctifs, plus d'API documentée)
- L'EULA vendor B interdit toute décompilation
- Entreprise A peut **décompiler le middleware pour assurer
  l'interopérabilité avec son ERP** → exception L.122-6-1 IV applicable,
  **malgré clauses EULA contraires** (la clause anti-décompilation est
  nulle pour cette stipulation dans la mesure où elle prive l'utilisateur
  légitime de l'exception d'ordre public)

Réserves opérationnelles :
- Conserver une **trace** de la démarche d'obtention de l'information
  d'interopérabilité par voie normale (mails au vendor, demande d'API
  documentation, refus ou silence) pour démontrer le critère "information
  non disponible facilement par ailleurs".
- **Limiter strictement** la décompilation aux parties nécessaires à
  l'interopérabilité — ne pas décompiler tout le middleware pour le
  redévelopper.
- Ne pas transmettre les résultats de la décompilation à des tiers.
- Ne pas utiliser les informations obtenues pour développer un produit
  concurrent — c'est sorti du champ de l'exception et constitue de la
  contrefaçon. `[review]`

---

## Étape 3 — Typologie des licences logiciel

### Licences propriétaires

- Code source **fermé**, distribution sous **EULA** (End User License
  Agreement)
- Droits d'utilisation **strictement limités** (1 utilisateur, 1 serveur,
  1 instance, etc. — variable selon EULA)
- **Pas de modification** autorisée (sauf exception L.122-6-1 correction
  d'erreurs si non écartée contractuellement)
- **Pas de redistribution**
- **Pas d'accès au code source** (ou accès très restreint sous accord
  spécifique, parfois NDA renforcé)
- Exemples : Microsoft Office, Adobe Creative Cloud, SAP, Oracle Database,
  SaaS propriétaires

### Licences open source — typologie 4 grandes catégories

**A. Permissives (faible contrainte de réciprocité)**

| Licence | Contraintes principales |
|---|---|
| **MIT** | "Do whatever you want, just keep copyright notice" — la plus permissive ; seule obligation : conserver le copyright + le texte de la licence |
| **BSD 2-clause / 3-clause** | Similaire MIT ; la 3-clause ajoute une clause de non-endorsement (interdiction d'utiliser le nom des auteurs pour promouvoir des dérivés sans accord) |
| **Apache 2.0** | MIT + protection brevet explicite (patent grant) + notice modifications (fichier NOTICE) + résiliation automatique en cas d'action en contrefaçon brevet par le licencié |
| **ISC** | Équivalent MIT simplifié (utilisée par OpenBSD) |

**Compatibilité** : compatibles avec licences propriétaires → peuvent être
incorporées dans un produit commercial fermé sans contamination.

**B. Copyleft fort (réciprocité totale)**

| Licence | Contraintes principales |
|---|---|
| **GPL v2** | Tout logiciel intégrant du code GPL **doit être distribué sous GPL** ("contamination virale") ; code source fourni à tout distributaire |
| **GPL v3** | GPL v2 + protection brevet (patent grant) + clause anti-tivoization (interdit le verrouillage matériel empêchant l'utilisateur d'exécuter une version modifiée) + compatibilité explicite avec Apache 2.0 |
| **AGPL v3** | GPL v3 étendue au SaaS — **l'utilisation sur serveur compte comme redistribution** → obligation de fournir le code source aux utilisateurs distants |

**Incompatibles** avec licences propriétaires (forks commerciaux interdits
sauf si le projet original pratique du dual licensing — modèle MySQL,
historique Qt).

**C. Copyleft faible (réciprocité limitée à la modification)**

| Licence | Contraintes principales |
|---|---|
| **LGPL v2.1 / v3** | Les **modifications du code LGPL** doivent rester LGPL, mais la **liaison dynamique** depuis un logiciel propriétaire est autorisée (le logiciel propriétaire reste propriétaire) ; **liaison statique** plus contestée |
| **MPL 2.0 (Mozilla Public License)** | Copyleft **fichier par fichier** — les modifications d'un fichier MPL restent MPL, mais d'autres fichiers du projet peuvent être propriétaires (modèle de "compartimentation") |
| **EPL (Eclipse Public License)** | Similaire MPL avec spécificités plugin Eclipse |

**D. Spécifiques**

| Licence | Domaine |
|---|---|
| **Creative Commons** (CC-BY, CC-BY-SA, CC-BY-NC, CC-BY-NC-SA, etc.) | Contenus créatifs (textes, images, musique, documentation) — **généralement PAS recommandées pour du code source** (rédigées pour des œuvres au sens droit auteur général, pas pour le logiciel) |
| **Licences custom** (BSL Business Source License, SSPL Server Side Public License, Commons Clause add-on, Elastic License v2, etc.) | Souvent licences "source-available" hybrides — **risque juridique élevé**, analyse au cas par cas obligatoire ; non reconnues comme open source par l'OSI |

Référence détaillée par licence : `references/licences-open-source.md`.

## Étape 4 — Compatibilité des licences (problème viral)

### Risque "contamination virale"

- Si un projet propriétaire intègre du code GPL → l'ensemble doit être
  distribué sous GPL (par "contamination").
- Conséquences pour une startup SaaS : obligation de fournir le code source
  aux utilisateurs (AGPL) ou clients (GPL en cas de distribution).
- Risque commercial **majeur** : le modèle business propriétaire devient
  impossible ; soit on assume l'open source, soit on remplace la dépendance,
  soit on isole strictement.

### Matrice de compatibilité simplifiée

| Combinaison | Verdict |
|---|---|
| MIT / BSD / Apache 2.0 + projet propriétaire | ✅ Compatible (permissive) — conserver copyright + NOTICE Apache |
| **GPL** + projet propriétaire (intégration code) | ❌ Impossible (contamination GPL) |
| **LGPL** + projet propriétaire (**liaison dynamique**) | ✅ OK — code LGPL séparé en bibliothèque dynamique |
| LGPL + projet propriétaire (**liaison statique**) | ⚠️ Contesté (interprétations FSF restrictives vs pratique industrielle plus souple — `[review]` selon contexte) |
| **AGPL** + SaaS propriétaire | ❌ Impossible (AGPL couvre l'utilisation serveur) |
| MPL 2.0 + projet propriétaire | ✅ OK fichier par fichier (compartimentation) |
| Apache 2.0 + GPL v2 | ❌ Incompatible (problème historique patent grant Apache) |
| Apache 2.0 + GPL v3 | ✅ Compatible (GPL v3 a explicitement résolu le conflit) |
| MIT + GPL | ✅ Code MIT peut être intégré dans projet GPL (l'inverse non) |
| Creative Commons **NC** (NonCommercial) + projet commercial | ❌ Impossible (NC = non commercial) |
| Creative Commons **ND** (NoDerivatives) + projet quel qu'il soit | ⚠️ Très restrictif — pas de modification autorisée |
| BSL / SSPL / Elastic License + projet SaaS commercial | ❌ Souvent bloquant — analyse spécifique nécessaire `[review]` |

### Recommandations cabinet

- **Tout projet SaaS B2B doit scanner ses dépendances régulièrement** via
  outils SCA :
  - Snyk, Black Duck Synopsys, FOSSA, GitHub Dependabot, OWASP
    Dependency-Check
  - Cadence recommandée : **mensuelle minimum**, **hebdomadaire** en phase
    de croissance ou pré-levée

- **Politique de cabinet type** (à adapter selon secteur et tolérance
  risque) :

  - **Whitelist** (utilisation sans validation préalable) : MIT, BSD-2-Clause,
    BSD-3-Clause, ISC, Apache 2.0, MPL 2.0 (compartimentation respectée)
  - **Validation case par case** : LGPL v2.1 / v3 (OK si liaison
    dynamique exclusivement) ; licences custom source-available (Elastic
    License v2, BSL avec date de bascule, etc.)
  - **Blacklist** (interdit sauf isolation stricte en microservice séparé
    sans intégration directe) : GPL v2, GPL v3, AGPL v3, SSPL, Creative
    Commons NC

- **Cleanup audit pré-levée Series A+** : exiger SBOM (Software Bill of
  Materials) au format SPDX ou CycloneDX + analyse licences avant due
  diligence investisseurs. C'est devenu un standard de la due diligence
  tech (les investisseurs en exigent souvent un en data room).

- **Désynchronisation à surveiller** : auditer les dépendances qui ont
  **changé de licence** par l'amont (cas devenu fréquent — ElasticSearch
  passé en SSPL en 2021, MongoDB en 2018, Redis Stack en 2024, Terraform en
  BSL en 2023). Tout changement de licence amont peut rendre une
  dépendance soudainement incompatible avec le modèle business.

- **Documenter** : registre des licences acceptées + responsable conformité
  (souvent CTO ou DPO) + procédure d'ajout de dépendance (revue licence
  obligatoire avant merge).

---

## Étape 5 — Cas SaaS et bases de données associées

### SaaS — spécificités

- L'utilisateur **n'installe pas** le logiciel chez lui → utilisation à
  distance via interface web ou API.
- Le régime L.122-6 s'applique au **code serveur** hébergé chez l'éditeur
  (l'hébergement = reproduction permanente ; l'exécution = reproduction
  provisoire en RAM).
- **L'épuisement du droit de distribution** UsedSoft C-128/11 **ne
  s'applique PAS** au SaaS — il n'y a pas de "copie vendue" à l'utilisateur
  qui pourrait être revendue.

**AGPL particulièrement piégeuse en SaaS** :
- L'utilisation serveur compte comme "distribution" déclenchant l'obligation
  source ouverte au profit des utilisateurs distants (clause spécifique
  AGPL §13).
- Si un SaaS B2B intègre du code AGPL → obligation de **fournir le code
  source à chaque client utilisateur** (avec une URL de téléchargement
  accessible depuis l'application).
- **Pour les startups SaaS** : à éviter absolument sauf si modèle business
  open source assumé (et même là, attention aux contributions clients qui
  remontent par l'AGPL).
- Cas réel piège : un développeur intègre une bibliothèque AGPL en
  dépendance "temporaire" pour un prototype, le prototype passe en
  production, et l'éditeur découvre la dépendance lors d'un audit
  pré-levée — trop tard pour remplacer sans refactoring massif.

### Bases de données associées au logiciel

Une base de données peut bénéficier d'une **double protection possible**
(régimes indépendants — il faut analyser les deux séparément) :

| Régime | Protection | Conditions | Durée |
|---|---|---|---|
| **Droit d'auteur** sur la **structure** | Originalité de l'organisation, du choix ou de la disposition des données (L.111-1 + L.112-3) | Critère d'originalité au sens CJUE Infopaq C-5/08 (empreinte personnelle de l'auteur) | 70 ans post mortem auctoris (L.123-1) |
| **Droit sui generis** L.341-1 sur le **contenu** | Investissement substantiel (financier, matériel, humain) pour constitution, vérification, présentation du contenu | Bénéficiaire = **producteur** de la base (souvent personne morale qui a pris l'initiative et le risque de l'investissement) | **15 ans** à compter de l'achèvement (L.342-5), **renouvelable si modification substantielle** (chaque nouvel investissement substantiel = nouveau délai de 15 ans) |

**Important** :
- Ces 2 droits sont **indépendants** — une base peut avoir l'un sans
  l'autre.
- **Exemple A** : annuaire téléphonique très simple structurellement
  (tri alphabétique trivial) mais avec contenu massif coûteux à compiler
  → **sui generis OK, droit d'auteur fragile**.
- **Exemple B** : base de données scientifique avec **structure innovante**
  (ontologie originale, schéma relationnel inventif) peu coûteuse à
  constituer → **droit d'auteur OK, sui generis fragile**.
- **Exemple C** : base de données client SaaS typique → combine souvent
  les deux (structure originale + investissement substantiel constitution
  et maintenance).

**Attention scraping / extraction massive** : L.342-1 interdit l'extraction
ou la réutilisation **substantielle** (qualitativement ou quantitativement)
du contenu d'une base protégée par droit sui generis — c'est la base de
nombreux contentieux contre des concurrents qui scrappent (CJUE Innoweb
C-202/12 sur les méta-moteurs de recherche).

## Étape 6 — Recommandations selon situation

### Startup early stage avec dev internes salariés

- L.113-9 s'applique automatiquement → employeur titulaire patrimoniaux.
- **Verrouiller** : contrat de travail avec mention explicite — clause type :
  > « Conformément à l'article L.113-9 du Code de la propriété intellectuelle,
  > les logiciels et leur documentation créés par le salarié dans l'exercice
  > de ses fonctions ou d'après les instructions de l'employeur sont dévolus
  > à l'employeur, qui est seul habilité à exercer les droits patrimoniaux
  > correspondants. Le salarié déclare avoir été informé de cette dévolution
  > et s'engage à coopérer à toute formalité utile à sa mise en œuvre. »
- **Vérifier** : développeurs ayant codé **AVANT signature contrat de
  travail** → cession écrite rétroactive nécessaire (cf. erreur fréquente 1).
- **Documenter** : registre interne des contributions par développeur (par
  module, par période — utiliser l'historique Git comme preuve d'antériorité
  et de paternité).

### Agence dev ou ESN livrant à clients

- L.113-9 attribue à l'**AGENCE** (employeur) — **pas au client**.
- **Cession écrite obligatoire** dans le contrat de prestation au client
  (L.131-3 : énumération droits + domaines + territoires + durée +
  rémunération).
- **Modèle clause** : référence `cession-droit-auteur` V4.1 (à venir).
- Attention au champ "documentation" : L.113-9 couvre logiciel + documentation,
  mais la cession doit **également mentionner les deux** explicitement.
- Penser aux **éléments tiers intégrés** : si l'agence a utilisé des
  bibliothèques open source pour livrer le projet, le client hérite des
  obligations licence amont (notamment GPL si l'agence a intégré du code
  GPL — l'agence ne peut transférer plus de droits qu'elle n'en a elle-même).

### Projet open source à publier

- **Choix de licence selon objectif** :

  - **Permissif (MIT / Apache 2.0)** : adoption maximale + compatibilité
    avec écosystème commercial → adapté si l'objectif est l'adoption large
    (bibliothèque utilitaire, framework, SDK) sans monétisation directe.
  - **Copyleft (GPL / AGPL)** : protection contre forks commerciaux
    propriétaires → adapté si l'objectif est de **forcer la réciprocité**
    et de garantir que l'écosystème reste open source.
  - **Dual licensing** (open source GPL/AGPL + licence commerciale) :
    monétisation des utilisateurs commerciaux qui ne veulent pas du
    copyleft → modèle MySQL historique, MongoDB pré-SSPL, Qt.

- **CLA (Contributor License Agreement) obligatoire** si contributions
  externes acceptées :
  - Sans CLA, chaque contributeur reste titulaire de sa contribution →
    blocage relicensing futur.
  - Modèles : Apache CLA, FSF Contributor Agreement, Salesforce CLA.
  - Mise en œuvre technique : bot CLA assistant (CLA Bot, CLA Assistant)
    qui bloque les pull requests jusqu'à signature.

- **Marquage** : copyright headers dans chaque fichier source + LICENSE à
  la racine du repository + NOTICE pour Apache 2.0 + README mentionnant la
  licence.

### SaaS avec dépendances open source mixed

- **Audit SBOM mensuel** via outils SCA (Snyk / FOSSA / Black Duck /
  Dependabot).
- **Politique** : isolation AGPL (microservice séparé sans appel direct
  via API/RPC strict — vérifier avec avocat tech la solidité juridique de
  l'isolation pour le cas concret), validation LGPL au cas par cas
  (liaison dynamique uniquement).
- **Documentation interne** : registre licences + responsable conformité
  (souvent CTO ou DPO) + procédure d'ajout de dépendance (revue licence
  obligatoire avant merge en main).
- **Watch** : changement de licence par auteur upstream (ex : ElasticSearch
  → SSPL en 2021, MongoDB → SSPL en 2018, Terraform → BSL en 2023,
  Redis → SSPL en 2024) → **re-évaluation impact** à chaque alerte.
- **Pré-levée Series A** : SBOM + analyse licences en data room (devenu
  standard de la DD tech).

---

## Format de sortie

Le livrable se structure comme suit (Markdown, fences imbriqués en quadruple
backticks pour ne pas casser le rendu interne) :

````markdown
[EN-TÊTE CONFIDENTIALITÉ — selon profil (avocat / juriste interne / non-juriste)]

# Régime juridique logiciel — [Nom projet] (ANALYSE RÉGIME, PAS RÉDACTION CONTRACTUELLE)

> **Analyse régime, pas rédaction contractuelle.** Ce skill identifie la
> titularité initiale (L.113-9 régime dérogatoire), le droit d'utilisation
> (L.122-6 + exceptions d'ordre public L.122-6-1), la typologie des licences
> applicables, les matrices de compatibilité (contamination GPL/AGPL), les
> régimes particuliers SaaS et bases de données. Il NE rédige PAS le contrat
> de cession (= `cession-droit-auteur` V4.1) ni la licence d'utilisation
> (= `licence-droit-auteur` V4.1). Validation **avocat spécialisé tech /
> propriété intellectuelle** OBLIGATOIRE avant tout acte (contrat de travail
> dev, contrat de prestation, choix licence, publication, dual licensing,
> due diligence pré-levée).

> **⚠️ Note du relecteur**
> - **Sources lues :** [CPI articles cités : L.111-1, L.112-3, L.113-9, L.121-7, L.122-6, L.122-6-1, L.131-3, L.341-1, L.342-1+ + jurisprudence : Cass. Pachot 7 mars 1986, CJUE BSA C-393/09, CJUE SAS Institute C-406/10, CJUE UsedSoft C-128/11, CJUE Innoweb C-202/12]
> - **Dépendances open source auditées :** [SBOM fourni : oui [outil] / non — recommandation scan SCA avant analyse finale]
> - **Points [review] :** [N éléments à valider avocat tech — détailler les plus critiques]
> - **Risque contamination GPL/AGPL identifié :** [oui / non / à confirmer après SBOM]
> - **Avant action :** validation avocat tech / propriété intellectuelle **OBLIGATOIRE** (contrat travail dev, contrat prestation, choix licence, publication, dual licensing, due diligence pré-levée)

**Triage :** 🟢 RÉGIME CLAIR + LICENCES COMPATIBLES / 🟡 MIXTE — POINTS À ARGUMENTER OU REMÉDIER / 🔴 PROBLÉMATIQUE — RISQUE CONTAMINATION OU TITULARITÉ CONTESTABLE
*(une phrase de justification)*

## Projet analysé

- **Nom :** [...]
- **Contexte de développement :** [salariés internes / prestataires externes / mixte / open source community / cofondateurs pré-contrat]
- **Statut :** [développement initial / extension / fork / dérivation]
- **Utilisation prévue :** [interne / commercialisation propriétaire / SaaS payant / open source pur / dual licensing]
- **Dépendances principales :** [liste avec licences ; tag `[non audité]` si SBOM absent]

## Titularité initiale (L.113-9)

**Cas applicable par catégorie de développeur :**
- Salariés internes : [L.113-9 applicable / hors fonctions — analyse]
- Prestataires externes : [L.113-9 NON applicable — cession L.131-3 nécessaire]
- Cofondateurs pré-contrat : [titularité personnelle — cession rétroactive nécessaire]
- Contributeurs open source : [titularité personnelle — CLA nécessaire si projet à relicensier]

**Titulaire(s) identifié(s) :** [employeur / agence / cofondateur / contributeurs cartographiés]

**Risques particuliers :** [cession rétroactive manquante / clause L.113-9 absente du contrat travail / CLA absent / chaîne agence-client non documentée]

## Droit d'utilisation et exceptions L.122-6-1

**Régime applicable :** L.122-6 (reproduction permanente/provisoire, adaptation, distribution)

**Exceptions pertinentes au cas d'espèce :**
- Copie de sauvegarde : [applicable / non pertinent]
- Test / observation : [applicable / non pertinent]
- Décompilation pour interopérabilité : [applicable / non pertinent / `[review]`]
- Correction d'erreurs : [applicable / écartée par EULA / non pertinent]

## Licences (typologie + compatibilité)

**Licence du projet envisagée :** [propriétaire EULA / MIT / Apache 2.0 / GPL / AGPL / LGPL / MPL / dual licensing / autre]

**Justification du choix :** [adéquation avec utilisation prévue + objectif communauté/business]

**Compatibilité avec dépendances :**

| Dépendance | Licence amont | Compatible avec projet ? | Action |
|---|---|---|---|
| [bib 1] | [licence] | [OK / vigilance / bloquant] | [aucune / valider liaison / remplacer / isoler] |
| ... | ... | ... | ... |

**Risque contamination identifié :** [aucun / LGPL liaison statique à vérifier / GPL à remplacer ou isoler / AGPL incompatible avec SaaS propriétaire]

## SaaS / Bases de données (si applicable)

**SaaS :** [analyse spécifique AGPL + UsedSoft non applicable + clauses EULA]
**Base de données :** [droit auteur sur structure ? sui generis L.341-1 sur contenu ? producteur identifié ?]

## Recommandations selon situation

[Bloc adapté selon situation : startup early stage / agence dev / projet open source / SaaS mixed — actionnable, calibré sur le cas concret]

**Une question hors de ma checklist :** [observation seconde-ordre — par
exemple : « votre projet utilise des modèles d'IA générative pré-entraînés
distribués sous licences custom (LLaMA 3 Community License, etc.) — la
qualification de ces licences au regard du droit français reste un sujet
en construction `[connaissance modèle — à vérifier]` » — omettre si rien
d'honnête à dire]

## Que veux-tu faire ?

1. **Rédiger une cession** — j'ouvre `cession-droit-auteur` (V4.1) avec les paramètres identifiés (cofondateur pré-contrat / agence vers client / contributeurs vers projet)
2. **Choisir une licence open source** — j'ouvre `licence-droit-auteur` (V4.1) avec arbitrage permissif vs copyleft vs dual licensing selon objectif
3. **Escalader avocat tech** — je rédige une note pour avocat spécialisé tech / propriété intellectuelle + CTO/GC selon enjeu (contamination GPL/AGPL identifiée, cession rétroactive cofondateur, CLA à mettre en place)
4. **Lancer un audit SBOM** — je documente la procédure d'audit (outils SCA, périmètre, fréquence) et la politique de cabinet à mettre en place
5. **Autre chose** — dis-moi
````

Le livrable est écrit dans le fichier de sortie, sans bandeau Hacienda et
sans narration interne (cf. mode silencieux pour livrables externes —
`CLAUDE.md` plugin §2).

---