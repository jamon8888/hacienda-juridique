---
name: depot-marque-fr
description: >
  Aide à la préparation d'un dossier de dépôt marque (FR INPI, EU EUTM via
  EUIPO, ou international via Madrid OMPI). Structure le choix du signe, des
  classes Nice, des libellés produits/services et du territoire conformément
  à CPI L.711-1 et L.711-2. NE dépose PAS — la décision, la rédaction finale
  des libellés et le dépôt formel restent au mandataire en marques (CPI
  L.422-4) ou à l'avocat. Brouillon technique d'aide à la rédaction.
argument-hint: "[signe | classes Nice | territoire FR/EU/Madrid]"
---

# /depot-marque-fr

**Préparation ≠ dépôt.** Ce skill produit un **brouillon technique** structuré
pour aider le mandataire en marques (CPI L.422-4) ou l'avocat. Il NE rédige
PAS le dossier final, NE paye PAS les taxes (~190€ FR INPI 1 classe / ~850€
EUTM 1 classe en 2026), NE dépose PAS auprès de l'INPI / EUIPO / OMPI. La
rédaction des libellés produits/services est une **discipline juridique** où
chaque mot conditionne 10 ans de protection — un libellé trop large = refus
partiel ou forclusion pour défaut d'usage (CPI L.714-5, 5 ans), trop étroit =
protection insuffisante face aux contrefacteurs.

## Examples

```
/hacienda-propriete-intellectuelle:depot-marque-fr "APEXLEAF — vêtements outdoor classes 25, 35 — FR + EU"
```

```
/hacienda-propriete-intellectuelle:depot-marque-fr
```

(Le skill demandera le signe, les classes Nice, les libellés produits/services,
les territoires, le déposant, le mandataire et la priorité éventuelle.)

```
/hacienda-propriete-intellectuelle:depot-marque-fr "NEXAFLOW logiciel SaaS — classe 9, 42 — --territoire EU"
```

---

## PRÉPARATION TECHNIQUE, PAS RÉDACTION FINALE

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Préparation technique, pas rédaction finale.** Ce brouillon est une
> ossature de dossier de dépôt marque (signe + type au sens CPI L.711-1,
> classes Nice retenues, libellés produits/services candidats, territoire
> envisagé, déposant et mandataire identifiés). Il NE remplace PAS la
> rédaction par un **mandataire en marques inscrit à l'INPI** (CPI L.422-4)
> ou un **avocat spécialisé en propriété industrielle**. La rédaction des
> libellés produits/services, en particulier, est une discipline où chaque
> mot pèse sur 10 ans de protection renouvelable. Un libellé trop large
> sera refusé partiellement par l'examinateur INPI/EUIPO, ou subira la
> forclusion pour défaut d'usage sérieux passé 5 ans (L.714-5 CPI) ; un
> libellé trop étroit donne une protection facile à contourner. **Une
> marque mal préparée se traduit par un refus, une opposition gagnée par un
> tiers, ou une déchéance partielle.** Ce skill propose ; le mandataire
> décide, rédige et dépose.

C'est le garde-fou le plus visible du skill. Un libellé trop large finalisé
sans relecture = porte à sens unique (refus partiel ou déchéance ultérieure).
Sur-flagger = porte à 2 sens, le mandataire élague. Rester sur la porte à 2
sens.

---

## Charger le profil pratique avant de commencer

Avant tout, lire :
1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Récupérer :
- **Rôle** depuis `## 1. Profil cabinet et profil de pratique PI` (avocat
  inscrit / mandataire en marques INPI L.422-4 / juriste interne / non-juriste —
  change l'en-tête confidentialité ET la formulation des avertissements en
  pied de brouillon, et active le gate non-juriste si applicable).
- **Juridictions et offices d'inscription** (INPI, EUIPO, OMPI Madrid) →
  défaut territoires si l'utilisateur n'en spécifie pas. Pas d'inscription EU
  + non-résident UE = mandataire obligatoire pour EUTM/Madrid.
- **Mandataire en marques associé** (depuis la table mandataires externes du
  profil) → identifié explicitement dans la section "Étapes suivantes" et
  dans le brief gate non-juriste.
- **Posture dépôt** par défaut → calibre la largeur initiale des libellés
  produits/services (agressive = libellés larges couvrant les en-têtes de
  classe + extensions plausibles ; mesurée = libellés ciblés sur l'activité
  réelle + 1 extension stratégique ; conservatrice = libellés strictement
  alignés sur la commercialisation effective sous 5 ans).
- **Seuils business owner** (taille déposant, secteur, ambition territoriale)
  → conditionne la recommandation FR seul vs FR + EU vs Madrid.

Si le profil contient `[A CONFIGURER]`, surfacer :

> Le profil pratique n'est pas configuré — c'est ce qui adapte le territoire
> par défaut, le mandataire en marques associé, la posture de dépôt et la
> chaîne d'approbation à votre cabinet ou service.
>
> **Deux choix :**
> - Lancer `/hacienda-propriete-intellectuelle:entretien-demarrage` (10-15 min)
> - Dire **"provisoire"** et je lance avec les défauts génériques (rôle
>   avocat, FR + EU, posture mesurée, sans mandataire pré-désigné) — chaque
>   sortie sera taggée `[PROVISOIRE — configurer le profil pour une sortie
>   sur mesure]`.

### Mode provisoire

Si l'utilisateur dit "provisoire", lancer normalement avec : posture mesurée,
rôle avocat, FR + EU, pas de mandataire désigné. Tagger la note du relecteur
et chaque finding `[PROVISOIRE]`. À la fin, ajouter :

> "C'était un run générique avec les hypothèses par défaut. Lancer
> `/hacienda-propriete-intellectuelle:entretien-demarrage` pour calibrer sur
> VOTRE pratique — votre mandataire en marques associé, vos juridictions de
> dépôt usuelles, votre posture portefeuille."

---

## Intake

Demander en un seul batch (pas de jeu de questions à rallonge) :

> Quelques questions avant de structurer le dossier de dépôt :
>
> 1. **Signe.** Texte exact (orthographe, casse, accents), stylisation
>    éventuelle, et **type** au sens CPI L.711-1 étendu par l'ordonnance
>    2019-1169 : mot / figuratif / composite (mot + figuratif) / sonore /
>    position / multimédia / hologramme. Pour un signe figuratif ou composite,
>    fournir le visuel (PNG/JPG haute définition). Pour un signe sonore, le
>    fichier audio + une représentation graphique normalisée (portée musicale
>    ou sonogramme).
> 2. **Produits / services réels.** Ce qui sera réellement vendu sous le
>    signe, en 1 à 3 phrases. Pas le pitch commercial — la nature concrète
>    de l'offre : produit physique, logiciel SaaS, service de conseil,
>    formation, contenu numérique, vêtement, aliment, etc.
> 3. **Classes Nice connues.** Si les classes sont déjà identifiées, les
>    lister (numéros 1 à 45). Sinon je proposerai les classes probables à
>    partir de la description produits/services et tu confirmeras. La
>    classification Nice (édition 12, en vigueur 2026) distingue les classes
>    1-34 (produits) des classes 35-45 (services).
> 4. **Territoires.** FR INPI (France seule) / EU EUTM (27 États membres
>    via EUIPO) / Madrid OMPI (international, sélection de pays). Préciser
>    les pays désignés pour Madrid (États-Unis, Chine, Japon, Royaume-Uni,
>    Suisse, etc.). Défaut depuis le profil. **Madrid requiert une marque
>    de base FR ou EU déjà déposée ou enregistrée** — pas de dépôt Madrid
>    isolé.
> 5. **Déposant.** Raison sociale exacte + numéro SIREN si personne morale
>    + adresse complète (siège social). Ces éléments sont utilisés tels
>    quels sur le formulaire INPI/EUIPO — vérifier l'exactitude contre les
>    registres officiels (Infogreffe, registres consulaires) avant dépôt.
>    Pour une personne physique : nom, prénom, adresse, nationalité.
> 6. **Mandataire.** Avocat inscrit à un barreau français ou mandataire
>    inscrit à l'INPI (CPI L.422-4). **Obligatoire** pour EUTM si le
>    déposant n'est pas résident UE, fortement recommandé pour Madrid OMPI.
>    Pour FR INPI seul, optionnel si le déposant est résident UE.
> 7. **Priorité revendiquée.** Dépôt antérieur à invoquer au titre de la
>    Convention d'Union de Paris (Art. 4) : la priorité doit être revendiquée
>    dans les **6 mois post-priorité** pour les marques (à distinguer des
>    12 mois pour les brevets). Pertinent pour une stratégie internationale
>    en deux temps (par ex. FR puis EU à 6 mois en revendiquant la
>    priorité FR).

Attendre la réponse. Si la **description produits/services est vague**
(< 30 mots, "appli IA", "marque de mode" sans précision), pousser une fois :

> Donne ce qui sera concrètement vendu sous ce signe — produit physique,
> logiciel SaaS, service de conseil, vêtements (lesquels), aliments
> (lesquels), formation (sur quoi). Les classes Nice et la rédaction des
> libellés en dépendent directement. Sans précision, le brouillon sera soit
> trop large (refus partiel INPI/EUIPO), soit purement spéculatif (déchéance
> probable pour défaut d'usage à 5 ans, L.714-5 CPI).

---


## Recherche antériorité préalable

**Préalable obligatoire.** Un dépôt sans recherche d'antériorité préalable
expose à : (a) refus pour conflit avec marque antérieure identique sur classes
identiques (rare en examen INPI/EUIPO qui ne juge pas la confusion d'office,
mais bloquant en cas d'opposition), (b) opposition gagnée par un tiers
titulaire d'une marque similaire dans les 2 mois post-publication BOPI FR ou
3 mois post-Bulletin EUTM, (c) action en contrefaçon ultérieure si la marque
passe l'enregistrement mais empiète sur une marque non opposante.

**Action.**
- Si la recherche n'est PAS encore faite, **recommander
  `/hacienda-propriete-intellectuelle:recherche-anteriorite-marque`** avant
  d'aller plus loin. Refuser de produire un brouillon de dépôt tant que
  l'utilisateur n'a pas, au minimum, balayé les classes-cibles + les
  familles adjacentes pertinentes.
- Si la recherche a déjà été faite, demander à l'utilisateur de **coller le
  rapport** (output Markdown du skill `recherche-anteriorite-marque`) ou de
  **pointer le fichier** dans
  `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/`.
  Intégrer les résultats dans la note du relecteur (cote 🟢/🟡/🔴 reportée
  comme PLANCHER selon §4 Garde-fous partagés du `CLAUDE.md`).
- Si la recherche est partielle (FR seul alors que dépôt visé FR + EU), le
  signaler comme `[review]` et recommander l'extension du périmètre de
  recherche AVANT le dépôt.

---

## Vérification des motifs absolus L.711-2 CPI

L'article L.711-2 du Code de la propriété intellectuelle (transposition de
la directive UE 2015/2436) énumère les motifs intrinsèques qui condamnent
un signe **indépendamment de toute antériorité tierce**. Pour chaque motif,
évaluer franchement et flagger. Ne pas rationaliser un problème évident :
un refus INPI/EUIPO sur motif absolu = perte des taxes (~190€ FR, ~850€
EUTM) + signal négatif pour le mandataire et le déposant.

| Motif (L.711-2 CPI) | Ce que ça veut dire | Flagger quand |
|---|---|---|
| **Caractère distinctif insuffisant** (1°) | Le signe ne permet pas d'identifier un produit ou service comme provenant d'une entreprise déterminée | Le signe désigne directement le type de produit ou ne se distingue pas du langage courant du secteur |
| **Descriptif** (2°) | Décrit l'espèce, la qualité, la quantité, la destination, la valeur, la provenance géographique ou l'époque de la production | Un consommateur lit le signe et comprend ce que fait le produit sans aucun effort d'imagination |
| **Devenu usuel** (3°) | Entré dans le langage courant ou les habitudes loyales et constantes de la profession | Mot devenu synonyme générique de la catégorie (ex. "frigidaire" pour réfrigérateur) |
| **Forme imposée** (5°) | Forme imposée par la nature, la fonction technique ou conférant une valeur substantielle au produit | Marque figurative tridimensionnelle — et la forme assure une fonction ou est inhérente au produit |
| **Atteinte à l'ordre public / bonnes mœurs** (7°) | Symboles d'État protégés (art. 6ter Convention de Paris), AOP/IGP non autorisées, signes choquants, contraires à l'ordre public | Le signe contient un emblème officiel non autorisé, une appellation protégée, ou un élément manifestement choquant |
| **Trompeur** (8°) | De nature à tromper le public sur la nature, la qualité ou la provenance géographique du produit ou service | Le signe suggère une qualité, origine ou caractéristique que le produit n'a pas, et cette qualité importerait au consommateur dans sa décision d'achat |

**Note importante — acquisition de distinctivité par usage** (L.711-2,
dernier alinéa). Si le signe est descriptif ou faiblement distinctif mais
que l'utilisateur souhaite quand même déposer, mentionner la stratégie
d'**acquisition de distinctivité par l'usage** : preuves d'usage sérieux et
prolongé (chiffres d'affaires, parts de marché, sondages de notoriété,
investissement publicitaire) permettant de démontrer que le public pertinent
identifie le signe comme provenant d'une entreprise déterminée. Cette
stratégie est lourde, coûteuse et longue (typiquement 5+ ans d'usage
intensif), et ne fonctionne que pour les motifs 1°, 2° et 3° (pas pour les
motifs 5°, 7°, 8°). À cadrer avec le mandataire.

**Sortie attendue.** Pour chaque motif, soit "aucun problème identifié",
soit un flag spécifique avec une ligne de raison. Ne pas produire un tableau
plat de "pass" — distinguer ce qui a été regardé activement de ce qui est
non-applicable.

---

## Rédaction des libellés produits/services

**Cœur du skill.** Le libellé produits/services (P&S) délimite la protection
réelle de la marque. Chaque mot conditionne 10 ans renouvelables, et la
forclusion pour défaut d'usage sérieux à 5 ans (L.714-5 CPI) sanctionne tout
libellé non couvert par une commercialisation effective.

### Méthode par classe

Pour chaque classe Nice retenue, proposer un libellé conforme :

- **Directives d'examen INPI** (édition 2024) et **directives EUIPO**
  (Guidelines for Examination of European Union Trade Marks, partie B.3) :
  - Termes **précis** et **clairs**, désignant des produits ou services
    identifiables sans ambiguïté.
  - Pas de **"tous produits"** ou **"tous services"** — rejet automatique.
  - Pas de **termes génériques** type "biens commerciaux", "produits
    industriels", "services divers" → demande de précision systématique.
- **Liste OMPI alphabétique** des produits et services Nice (édition 12,
  https://www.wipo.int/classifications/nice/nclpub/fr/) comme **référence
  canonique** des termes acceptés sans discussion par les offices nationaux
  signataires de l'Arrangement de Nice.
- **Outil EUIPO TMclass** (https://euipo.europa.eu/ec2/) pour vérifier
  l'acceptation d'un terme dans plusieurs offices simultanément.
- **MGS (Madrid Goods & Services Manager) OMPI** pour les dépôts
  internationaux Madrid.

### Risque "lifestyle brand"

Si le dépôt vise plusieurs catégories non-techniques sans cohérence
sectorielle (classe 9 logiciel + classe 25 vêtements + classe 41
divertissement + classe 43 restauration), **flagger comme "stratégie
lifestyle"** :

- Risque élevé de **déchéance partielle pour défaut d'usage sérieux** dans
  les classes non commercialisées effectivement sous 5 ans (L.714-5 CPI ;
  jurisprudence CJUE *Ansul* C-40/01 sur la notion d'usage sérieux).
- L'examinateur INPI/EUIPO peut soulever des observations sur la cohérence,
  notamment si le déposant est une jeune entreprise.
- Recommandation : justifier l'extension par un **plan de marque** réel
  (licences prévues, gamme de produits dérivés en développement) à
  documenter pour le mandataire. Sinon, restreindre aux classes effectivement
  commercialisées sous 36 mois.

### Calibrage selon ambition business

- **Startup mono-produit** : libellés ciblés sur l'offre actuelle + 1 à 2
  extensions plausibles sous 24 mois. Privilégier la solidité (pas de
  déchéance) à la largeur.
- **ETI multi-produits** : libellés couvrant la gamme actuelle + extensions
  cohérentes du plan stratégique 3-5 ans.
- **Holding multi-marques / portefeuille** : libellés larges acceptables si
  appuyés par une stratégie de licences ou de sous-marques opérationnelles.

### Erreurs courantes à signaler

À détecter dans les libellés candidats et flagger `[review]` :

- **Marques produits dans le libellé** : "vêtements de la marque X" → interdit
  (Directives EUIPO B.3.4). Le libellé décrit les produits, pas le signe.
- **Description par fonction au lieu du produit** : "outil pour couper le
  bois" → préférer "scies, outils de coupe pour le bois" (terminologie Nice
  reconnue).
- **Classes incohérentes** : "logiciel de comptabilité" en classe 16
  (papier) au lieu de 9 (logiciels) ou 42 (SaaS) → ré-attribuer.
- **Libellé identique à l'intitulé de classe** (class heading) : depuis
  *IP TRANSLATOR* (CJUE C-307/10, 2012), un intitulé de classe ne couvre
  plus tous les produits de la classe — il faut lister explicitement les
  produits visés.
- **Termes vagues type "appareils électroniques"** sans précision (classe 9
  contient des centaines de produits hétérogènes) → demander précision.

Référence détaillée : `references/redaction-libelles-nice.md`.

---

## Choix territoire — arbre décisionnel

> **Version simplifiée.** L'arbre détaillé territoire + budget + calendrier
> + stratégies hybrides Madrid relève d'un skill `strategie-extension-marques`
> (prévu V2.0). Ici on donne le cadre suffisant pour pré-positionner le
> brouillon. Le choix définitif appartient au mandataire en concertation avec
> le déposant et la stratégie commerciale.

| Critère | **FR INPI** | **EU EUTM (EUIPO)** | **Madrid OMPI** |
|---|---|---|---|
| Marché cible | France uniquement | 27 États membres UE | mondial (sélection de pays parmi 130+ membres) |
| Coût indicatif 1 classe (2026) | ~190€ taxe officielle + 40€/classe additionnelle | ~850€ taxe basique + 50€ classe 2 + 150€/classe 3+ | ~700€ base (CHF 653 + complément) + frais par pays désigné |
| Délai examen et publication | ~5-6 mois jusqu'à enregistrement | ~6-12 mois jusqu'à enregistrement | dépend des offices nationaux désignés (~12-18 mois) |
| Mandataire | optionnel si déposant résident FR/UE | obligatoire si déposant non-résident UE | obligatoire si déposant non-résident UE |
| Stratégie | défense locale, marché FR uniquement | conquête UE en un dépôt unique | mondialisation ciblée par pays |
| Pré-requis | aucun | aucun | **base FR ou EU déjà déposée ou enregistrée** (Art. 2 Protocole de Madrid) |
| Procédure d'opposition | 2 mois post-publication BOPI (L.712-4 CPI) | 3 mois post-Bulletin EUTM (RMUE Art. 46) | varie par office national (généralement 2-3 mois) |
| Langue de procédure | français | français / anglais / allemand / espagnol / italien | français / anglais / espagnol pour la procédure OMPI |

### Recommandations types (à confirmer mandataire)

- **Startup FR avec marché EU futur** → **FR national d'abord** + extension
  EUTM à 6 mois en revendiquant la priorité de l'Union de Paris (Art. 4
  Convention de Paris, 6 mois pour les marques). Permet de tester l'usage
  réel sur le marché FR et d'arbitrer l'extension EU au vu des premiers
  retours commerciaux.
- **ETI déjà internationale** → **EUTM direct** + **Madrid** désignant les
  pays cibles (US, UK, CH, JP, CN), avec EUTM comme **marque de base**
  (Art. 2 Protocole de Madrid). Évite le double dépôt FR + EU et capitalise
  sur la couverture des 27 États membres en un seul titre.
- **Marque défensive sans commercialisation prévue hors FR** → **FR
  national seul**. Couvre la fabrication et la commercialisation sur le
  territoire français, ce qui peut suffire (notamment pour un savoir-faire
  ou une dénomination secondaire).
- **Holding multi-marques avec portefeuille international** → **FR + EUTM
  systématiquement** + Madrid pour chaque marque-phare visant l'export.
  Centraliser dans `portfolio.yaml` (gérable via
  `/hacienda-propriete-intellectuelle:revue-portefeuille-marques`).
- **Marque sectorielle ultra-spécialisée (B2B, niche)** → considérer
  **FR + EUTM** si marché EU réel, sinon **FR + pays cibles via Madrid**
  (économique si 3-5 pays seulement).

### Priorité de l'Union de Paris (6 mois pour les marques)

À distinguer des brevets (12 mois). La Convention d'Union de Paris (Art. 4C)
accorde **6 mois** à compter du premier dépôt pour effectuer des dépôts
ultérieurs dans d'autres États membres en revendiquant la **date de priorité
du premier dépôt**. Ces dépôts ultérieurs sont opposables comme s'ils
avaient été déposés à la date de priorité — protection contre toute marque
identique ou similaire déposée par un tiers entre les deux dates. Cette
priorité est **stratégique** pour la séquence FR puis EU/Madrid à 6 mois.

---

## Checklist vérifications avant dépôt

À produire en sortie sous forme de matrice avec colonne ✓/✗/[review]. Cette
checklist N'EST PAS une attestation de validité — chaque ligne est un
prérequis dont la validation finale revient au mandataire en marques ou à
l'avocat.

- [ ] **Recherche d'antériorité** complète faite via
  `/hacienda-propriete-intellectuelle:recherche-anteriorite-marque` (FR +
  EU si dépôt EU envisagé), résultats intégrés à la note du relecteur.
- [ ] **Motifs absolus L.711-2 CPI** vérifiés (table ci-dessus passée en
  revue motif par motif, pas un "pass" global).
- [ ] **Signe non descriptif** des produits/services choisis (motif 2°) et
  suffisamment distinctif (motif 1°).
- [ ] **Classes Nice cohérentes** avec l'activité réelle et avec un plan
  d'usage sous 5 ans (pas d'usage fictif au sens L.714-5 CPI / *Ansul*
  C-40/01).
- [ ] **Libellés P&S précis** et conformes aux directives INPI/EUIPO
  (référence OMPI alphabétique, pas d'intitulés de classe seuls depuis
  *IP TRANSLATOR*).
- [ ] **Déposant identifié** : raison sociale exacte + SIREN si personne
  morale + adresse complète (vérifiée contre Infogreffe ou registre
  consulaire).
- [ ] **Mandataire désigné** si EUTM/Madrid sans résidence UE, ou si
  préférence cabinet.
- [ ] **Priorité revendiquée** si dépôt antérieur < 6 mois (Convention
  d'Union de Paris, Art. 4C — 6 mois pour les marques).
- [ ] **Taxes prévues** au budget (~190€ FR 1 classe / ~850€ EUTM 1 classe /
  ~700€+ Madrid selon pays désignés).
- [ ] **Validation mandataire en marques (L.422-4) ou avocat AVANT dépôt
  formel** — REQUIS, jamais optionnel.

---

## Format de sortie

Préfixer l'en-tête confidentialité depuis `CLAUDE.md` `## 2. Sorties
standardisées`.

`````markdown
[EN-TÊTE CONFIDENTIALITÉ — selon profil]

# Préparation dépôt marque — Brouillon technique (PAS UN DÉPÔT)

> **Préparation technique, pas rédaction finale.** [paragraphe garde-fou
> reformulé tel quel — y compris "une marque mal préparée se traduit par un
> refus, une opposition gagnée par un tiers, ou une déchéance partielle" et
> le renvoi explicite au mandataire en marques L.422-4 ou avocat PI]

> **⚠️ Note du relecteur**
> - **Recherche antériorité préalable :** [faite ✓ via `/recherche-anteriorite-marque` le YYYY-MM-DD — cote 🟢/🟡/🔴 reportée comme plancher / à faire ✗ — REQUIS avant figeage du dépôt]
> - **Motifs absolus L.711-2 vérifiés :** [oui ✓ tous motifs revus / problème(s) flaggé(s) : motif N° — 1 ligne]
> - **Classes Nice retenues :** [N classes — produits / services / mixte]
> - **Libellés P&S rédigés :** [N libellés — calibrage posture (large / mesurée / ciblée)]
> - **Choix territoire pré-validé :** [FR / EU / Madrid + pays — à confirmer mandataire]
> - **Avant dépôt :** validation mandataire en marques (CPI L.422-4) ou avocat **OBLIGATOIRE**

**Triage :** 🟢 PRÊT À TRANSMETTRE / 🟡 À CLARIFIER / 🔴 KNOCKOUT DÉTECTÉ — une phrase pourquoi

## Signe proposé

- **Signe :** [texte exact, stylisation notée]
- **Type :** [mot / figuratif / composite / sonore / position / multimédia / hologramme — L.711-1]
- **Produits / services :** [description 1-3 phrases]
- **Classes Nice retenues :** [numéros + libellés courts]
- **Territoires :** [FR / EU / Madrid + pays désignés]
- **Déposant :** [raison sociale + SIREN + adresse]
- **Mandataire :** [identifiant si applicable / "à désigner"]
- **Priorité revendiquée :** [oui : dépôt antérieur date YYYY-MM-DD / non]

## Knockout — motifs absolus L.711-2 CPI

| Motif | Flag | Note |
|---|---|---|
| Caractère distinctif (1°) | [aucun / flaggé] | [si flaggé : 1 ligne] |
| Descriptif (2°) | ... | ... |
| Devenu usuel (3°) | ... | ... |
| Forme imposée (5°) | ... | ... |
| Atteinte ordre public (7°) | ... | ... |
| Trompeur (8°) | ... | ... |

## Classes Nice retenues + libellés rédigés

**Classe 25 — Vêtements, chaussures, chapellerie**
Libellé proposé : "Vêtements pour hommes, femmes et enfants ; chaussures
(à l'exception des chaussures orthopédiques) ; chapellerie ; tee-shirts ;
sweat-shirts ; pantalons ; jupes ; robes ; vestes ; manteaux ; chemises ;
chaussettes ; sous-vêtements ; pyjamas ; maillots de bain ; vêtements de
sport."
Note : libellé large couvrant la gamme apparel classique. Si focus enfants
uniquement, restreindre. `[review — calibrage à valider mandataire]`

**Classe 35 — Publicité, gestion d'affaires, vente au détail**
Libellé proposé : "Services de vente au détail et en ligne de vêtements,
chaussures et accessoires de mode ; services de présentation de produits
sur tous moyens de communication pour la vente au détail."
Note : services de vente au détail désormais clairement reconnus depuis
*Praktiker* (CJUE C-418/02, 2005).

[... etc pour chaque classe retenue ...]

## Choix territoire recommandé

- **Recommandation :** [FR / EU / Madrid + pays]
- **Raison :** [stratégie commerciale, budget, calendrier]
- **Coût indicatif :** [fourchette taxes officielles + frais mandataire]
- **Stratégie priorité :** [FR puis EU à 6 mois (Union de Paris) / EU
  direct / Madrid avec base EU / autre]

## Checklist avant dépôt

| Vérification | Statut | Note |
|---|---|---|
| Recherche antériorité (FR + EU si applicable) | ✓ / ✗ / [review] | lien `/recherche-anteriorite-marque` output |
| Motifs absolus L.711-2 CPI | ✓ / ✗ / [review] | ... |
| Distinctivité (1°) | ✓ / ✗ / [review] | ... |
| Non descriptif (2°) | ✓ / ✗ / [review] | ... |
| Classes Nice cohérentes activité | ✓ / ✗ / [review] | usage sous 5 ans L.714-5 |
| Libellés P&S conformes directives | ✓ / ✗ / [review] | référence OMPI alphabétique |
| Déposant identifié + adresse exacte | ✓ / ✗ / [review] | vérifier registres officiels |
| Mandataire désigné (si requis) | ✓ / ✗ / [review] / sans objet | EUTM/Madrid non-résident UE |
| Priorité revendiquée (si applicable) | ✓ / ✗ / [review] / sans objet | Convention Union de Paris 6 mois |
| Taxes prévues budget | ✓ / ✗ / [review] | ~190€ FR / ~850€ EUTM / ~700€+ Madrid |
| Validation mandataire/avocat | ✗ requis | jamais optionnel |

## Brouillon de dossier

**Sections du formulaire INPI (cerfa) / EUIPO (EUTM-001) / OMPI (MM2) avec valeurs proposées :**

- Référence dépôt déposant : [à attribuer]
- Déposant : [raison sociale + SIREN + adresse]
- Mandataire : [identifiant + adresse]
- Signe : [texte + spécimen visuel si figuratif]
- Type de marque : [conformément L.711-1]
- Classes Nice + libellés : [comme rédigés ci-dessus]
- Priorité revendiquée : [détails si applicable]
- Déclaration de propriété et de bonne foi : standard

## Étapes suivantes

1. **Faire valider** par mandataire en marques INPI (CPI L.422-4) ou avocat
   PI (REQUIS avant dépôt). [Si profil renseigne un mandataire associé, le
   nommer.]
2. **Payer les taxes** (~190€ FR INPI 1 classe / ~850€ EUTM 1 classe /
   ~700€+ Madrid selon pays désignés). Calcul exact dépendant du nombre de
   classes et des pays désignés.
3. **Déposer formellement** via télé-procédure INPI
   (https://procedures.inpi.fr/) ou EUIPO eSearch+ (https://euipo.europa.eu/)
   ou formulaire MM2 OMPI pour Madrid.
4. **Surveiller post-dépôt** avec
   `/hacienda-propriete-intellectuelle:surveillance-marque --add` (V1.1.0)
   pour suivre les publications BOPI/Bulletin EUTM et détecter les
   marques tierces postérieures susceptibles d'opposition.

**Une question hors de ma checklist :** [observation seconde-ordre — omis si rien]

## Que veux-tu faire ?

1. **Itérer sur les libellés P&S** — propositions plus larges / plus
   étroites par classe, ou ajout/retrait de classes
2. **Lancer la recherche antériorité** — j'ouvre `/recherche-anteriorite-marque`
   pour les classes-cibles + familles adjacentes
3. **Escalader** — note pour mandataire en marques / avocat PI du profil
4. **Compléter les faits** — autres modes d'usage envisagés, planning
   lancement, gamme dérivée, sous-marques prévues
5. **Autre chose** — dis-moi
`````

---
