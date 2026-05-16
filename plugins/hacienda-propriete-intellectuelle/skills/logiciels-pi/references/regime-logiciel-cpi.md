# Régime logiciel — articles CPI + jurisprudence

> **Statut documentaire.** Référence interne pour le skill `logiciels-pi`.
> Citations à vérifier sur **Légifrance** + bases de jurisprudence
> (Cour de cassation Open Data, CJUE Curia, OEB) avant transmission externe.

---

## Article L.113-9 — régime dérogatoire de titularité

### Texte (CPI L.113-9)

> « Sauf dispositions statutaires ou stipulations contraires, les droits
> patrimoniaux sur les logiciels et leur documentation créés par un ou
> plusieurs employés dans l'exercice de leurs fonctions ou d'après les
> instructions de leur employeur sont dévolus à l'employeur qui est seul
> habilité à les exercer.
>
> Toute contestation sur l'application du présent article est soumise au
> tribunal judiciaire du siège social de l'employeur.
>
> Les dispositions du premier alinéa du présent article sont également
> applicables aux agents de l'État, des collectivités publiques et des
> établissements publics à caractère administratif. »

### Conditions cumulatives détaillées

1. **Lien de subordination salarial** (Code du travail L.1221-1) —
   exclut les prestataires indépendants, les freelances, les contributeurs
   open source bénévoles, et les cofondateurs n'ayant pas encore signé
   leur contrat de travail.
2. **Création dans l'exercice des fonctions** OU **d'après les instructions
   de l'employeur** — sortie de L.113-9 si création hors fonctions
   habituelles (ex : développeur web salarié qui code un jeu vidéo sur
   temps personnel sans instruction employeur).
3. **Absence de convention contraire** dans le contrat de travail ou les
   statuts — une clause expresse écartant L.113-9 est licite (rare en
   pratique mais possible pour un dirigeant-cofondateur).

### Cas pratiques

| Configuration | L.113-9 | Régime titularité |
|---|---|---|
| Salarié développeur, fonctions habituelles | ✅ | Employeur |
| Salarié, hors fonctions / temps personnel | ❌ | Salarié — cession écrite L.131-3 nécessaire |
| Prestataire externe (freelance, agence, ESN) | ❌ | Prestataire — cession écrite contrat de prestation |
| Stagiaire / apprenti sous convention | ⚠️ | Souvent L.113-9 par analogie ; sinon cession |
| Contributeur open source bénévole | ❌ | Contributeur — CLA nécessaire |
| Cofondateur dev MVP avant contrat travail | ❌ | Cofondateur — cession rétroactive |
| Agent public (mission de service public) | Régime spécifique | L.131-3-1 CPI — variable selon mission |

### Comparaison avec le régime général droit d'auteur (CPI L.111-1)

- **Régime général** (œuvres non logicielles créées par salarié) :
  le **salarié reste titulaire** des droits patrimoniaux, sauf cession
  écrite expresse conforme L.131-3.
- **Régime logiciel L.113-9** : **inversion** — l'**employeur** est
  titulaire automatique des droits patrimoniaux, sauf clause contraire.

Cette inversion est la source principale d'erreurs récurrentes — notamment
dans les startups qui transposent par analogie le régime salarié général
au logiciel (et inversement, des éditeurs logiciels qui croient que la
règle L.113-9 s'applique aussi à leurs assets non logiciels comme la
documentation marketing, les visuels d'interface, les vidéos
promotionnelles — ce qui est faux).

---

## Article L.122-6 — droit d'utilisation

### Texte (CPI L.122-6)

> « Sous réserve des dispositions de l'article L. 122-6-1, le droit
> d'exploitation appartenant à l'auteur d'un logiciel comprend le droit
> d'effectuer et d'autoriser :
>
> 1. La reproduction permanente ou provisoire d'un logiciel en tout ou
> partie par tout moyen et sous toute forme. Dans la mesure où le
> chargement, l'affichage, l'exécution, la transmission ou le stockage de
> ce logiciel nécessitent une reproduction, ces actes ne sont possibles
> qu'avec l'autorisation de l'auteur ;
>
> 2. La traduction, l'adaptation, l'arrangement ou toute autre
> modification d'un logiciel et la reproduction du logiciel en résultant ;
>
> 3. La mise sur le marché à titre onéreux ou gratuit, y compris la
> location, du ou des exemplaires d'un logiciel par tout procédé. Toutefois,
> la première vente d'un exemplaire d'un logiciel dans le territoire d'un
> État membre de la Communauté européenne ou d'un État partie à l'accord
> sur l'Espace économique européen par l'auteur ou avec son consentement
> épuise le droit de mise sur le marché de cet exemplaire dans tous les
> États membres à l'exception du droit d'autoriser la location ultérieure
> d'un exemplaire. »

### Épuisement et CJUE UsedSoft C-128/11 (2012)

- Étend l'épuisement du droit de distribution aux **licences perpétuelles
  téléchargées** (logiciel téléchargé sous licence perpétuelle = équivalent
  vente d'un exemplaire pour l'épuisement).
- **Ne s'applique PAS au SaaS** — pas de copie vendue à l'utilisateur, donc
  pas d'épuisement.
- **Ne s'applique pas** non plus aux licences temporaires ou aux
  abonnements.

---

## Article L.122-6-1 — exceptions d'ordre public

Ces exceptions sont **d'ordre public** : clauses contractuelles qui les
excluraient totalement sont **nulles**.

1. **Correction d'erreurs** (I) — utilisateur légitime peut corriger les
   erreurs nécessaires à l'utilisation conforme à la destination. **Seule
   exception susceptible d'être écartée par clause contractuelle expresse.**
2. **Copie de sauvegarde** (II) — 1 copie nécessaire à la préservation de
   l'utilisation, usage strictement personnel.
3. **Test / observation** (III) — analyser le fonctionnement pour
   comprendre les **idées et principes** à la base du logiciel, dans le
   cadre d'opérations licites.
4. **Décompilation pour interopérabilité** (IV) — conditions cumulatives :
   - information nécessaire à l'interopérabilité **non disponible
     facilement par ailleurs** (charge de la preuve sur celui qui
     décompile : trace de la démarche d'obtention de l'information par
     voie normale, refus ou silence du titulaire amont) ;
   - limitée aux parties du logiciel **strictement nécessaires** à
     l'interopérabilité ;
   - résultats **non utilisés à d'autres fins** ni transmis à des tiers
     (sauf nécessité interopérabilité) ;
   - utilisés uniquement pour assurer l'interopérabilité d'un logiciel
     créé de façon indépendante (**pas pour développer un produit
     concurrent** — c'est de la contrefaçon).

---

## Article L.122-6-2 — protection contre la décompilation abusive

Interdit la mise sur le marché ou la fourniture de moyens visant à
contourner les exceptions L.122-6-1 (notamment décompilation hors
conditions). Permet à l'éditeur d'attaquer un tiers qui distribuerait un
outil de décompilation contournant ses protections.

---

## Articles L.331-1 et suiv. — mesures techniques de protection

Cadre des DRM (Digital Rights Management) et mesures anti-copie ; protège
juridiquement les mesures techniques utilisées par l'éditeur, sauf
contournement nécessaire pour exercer une exception L.122-6-1
(interopérabilité notamment). Articulation délicate avec les exceptions
d'ordre public.

---

## Jurisprudence clé

### Originalité logiciel

- **Cass. Ass. plén. 7 mars 1986, Pachot** — fonde le critère d'originalité
  pour le logiciel : « apport intellectuel » de l'auteur, marque de sa
  personnalité dans la structure et la programmation. Élargit l'application
  du droit d'auteur au logiciel, à une époque où la qualification était
  contestée.

- **Cass. 1re civ. 17 mars 2015** — précision sur la suffisance de la
  description du logiciel pour caractériser son originalité (exigence de
  démonstration concrète et non abstraite). `[verify]`

### Périmètre de protection — distinction protégeable / non protégeable

- **CJUE BSA C-393/09 (22 décembre 2010)** — **l'interface utilisateur
  graphique (GUI) n'est PAS protégée par la directive logiciel** (Directive
  91/250/CEE puis 2009/24/CE) ; elle peut éventuellement bénéficier du
  droit d'auteur général si elle satisfait au critère d'originalité Infopaq.

- **CJUE SAS Institute C-406/10 (2 mai 2012)** — **les fonctionnalités
  d'un logiciel, son langage de programmation et le format des fichiers de
  données utilisés ne sont PAS protégés par le droit d'auteur logiciel**
  (idée vs forme). Confirmation forte : on protège l'expression (code
  source), pas la fonction.

- **Cass. com. 30 mars 2010** — distinction interface utilisateur graphique
  vs logiciel stricto sensu (préfiguration nationale du raisonnement
  ultérieurement consacré par BSA). `[verify]`

### Distinction logiciel / algorithme / interface

- **Logiciel "stricto sensu"** (code source + code objet + structure des
  programmes + documentation) → protégé par droit d'auteur logiciel
  (CPI Titre I et III du Livre I, régime spécial L.113-9 et L.122-6).
- **Interface utilisateur graphique** → non couverte par directive
  logiciel (BSA) ; peut être protégée par droit d'auteur général ou par
  dessins et modèles (régime distinct).
- **Algorithme** "en tant que tel" → **exclu de la brevetabilité**
  CPI L.611-10 (et art. 52 CBE) ; **exclu de la protection logiciel
  stricto sensu** (idée — SAS Institute) ; peut être protégé par droit
  d'auteur uniquement si la forme d'expression originale est en cause
  (rare en pratique).

### Brevet logiciel — précisions

- **France : pas de brevet logiciel "en tant que tel"** (L.611-10) — le
  logiciel "en tant que tel" est exclu de la brevetabilité.
- **OEB Vicom T-208/84** — fonde la doctrine de l'**invention mise en
  œuvre par ordinateur** : brevetable si elle résout un **problème
  technique** par des moyens techniques (au-delà de la simple exécution
  d'un programme sur ordinateur).
- **États-Unis** — "software patents" largement admis (régime distinct,
  jurisprudence Alice Corp. v. CLS Bank 2014 ayant resserré le test
  d'éligibilité) ; **hors scope** de ce skill orienté droit français.

---

## Lien avec les autres skills du plugin

- `qualification-oeuvre` (V4.0 — régime général droit d'auteur français,
  L.111-1 + 7 cas titularité) traite **toutes les œuvres SAUF logiciel**
  (et ses dérivés documentaires). Pour un projet hybride (ex : site web
  combinant design + contenu textuel + composante logicielle), exécuter
  les deux skills sur les composants respectifs (qualification distributive).
- `logiciels-pi` (V4.0 — ce skill) traite **spécifiquement le régime
  dérogatoire L.113-9** + droit d'utilisation L.122-6 + licences open
  source + SaaS + bases de données associées.
- `cession-droit-auteur` (V4.1, à venir) — rédaction du contrat de cession
  (mentions L.131-3 + spécificités logiciel : champ documentation, lien
  avec L.113-9, cession rétroactive cofondateur).
- `licence-droit-auteur` (V4.1, à venir) — rédaction de la licence
  d'utilisation (propriétaire ou open source).
- `contrefacon-droit-auteur` (V4.2, à venir) — qualification de la
  contrefaçon (spécificités logiciel : saisie-contrefaçon adaptée au code
  source, expertise judiciaire spécialisée).
- `revue-open-source` (v0.1 préservé) — audit de conformité open source
  (structure de l'audit, sans scan technique des dépendances).

---

*Note : citations CPI et jurisprudence à vérifier sur Légifrance et bases
primaires avant transmission externe. Les références OEB sont à confronter
au registre EPO si l'analyse touche la brevetabilité.*
