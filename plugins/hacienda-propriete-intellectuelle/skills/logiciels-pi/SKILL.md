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
