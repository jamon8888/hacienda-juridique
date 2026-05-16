---
name: recherche-anteriorite-brevet
description: >
  Premier passage de recherche d'antériorité brevet (knockout exclusions
  L.611-10 CPI + recherche INPI Brevets / OEB Espacenet + appréciation
  nouveauté et activité inventive selon l'approche problème-solution OEB) —
  produit une liste de signaux pour décision mandataire en brevets ou avocat,
  jamais une opinion de brevetabilité ni de liberté d'exploitation. Utiliser
  pour une nouvelle invention, des codes CIB nouveaux, ou avant un dépôt
  FR/EP/PCT. Ce skill ne conclut JAMAIS qu'une invention est brevetable.
argument-hint: "[description invention | codes CIB | territoires FR/EP/PCT]"
---

# /recherche-anteriorite-brevet

**Ce n'est PAS une opinion de brevetabilité ni FTO (Liberté d'Exploitation).**
Une opinion de brevetabilité exige une recherche professionnelle exhaustive
(Data INPI + OEB Espacenet + Google Patents + littérature non-brevet) et le
jugement d'un **mandataire en brevets** inscrit à l'OEB (EQE) ou d'un avocat
spécialisé PI. "Aucune antériorité évidente" issu de ce skill = le triage n'a
rien trouvé. Cela ne veut pas dire que l'invention est brevetable. *Des
inventeurs ont perdu des années de R&D sur des brevets refusés pour
antériorité que le triage n'avait pas trouvée.*

## Examples

```
/hacienda-propriete-intellectuelle:recherche-anteriorite-brevet "Procédé de filtration membranaire à base de polymère X — CIB B01D 71/02 — FR + EP"
```

```
/hacienda-propriete-intellectuelle:recherche-anteriorite-brevet "Algorithme de compression vidéo basé sur réseau de neurones — CIB H04N 19, G06N 3 — PCT"
```

```
/hacienda-propriete-intellectuelle:recherche-anteriorite-brevet
```

(Le skill demandera la description, la classification CIB, la date de priorité et les territoires.)

---

## CECI EST UN PREMIER PASSAGE, PAS UNE OPINION DE BREVETABILITÉ

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Premier passage, pas une opinion de brevetabilité.** Une opinion de
> brevetabilité exige une recherche professionnelle exhaustive (Data INPI
> brevets, OEB Espacenet OPS sur 160M+ documents mondiaux, Google Patents,
> WIPO PatentScope, et la **littérature non-brevet** — Google Scholar, IEEE,
> bases sectorielles), suivie d'une analyse revendication par revendication
> par un **mandataire en brevets** inscrit à l'OEB (qualifié EQE) ou d'un
> avocat spécialisé en propriété industrielle. "Aucune antériorité évidente"
> issu de ce skill = le triage n'a rien trouvé dans les bases interrogées.
> Cela ne veut pas dire que l'invention est nouvelle, ni qu'elle implique
> une activité inventive, ni qu'elle est brevetable. Cela ne dit RIEN sur
> la liberté d'exploitation (FTO) — un brevet en vigueur d'un tiers peut
> bloquer l'exploitation même d'une invention brevetable. Un mandataire en
> brevets ou un avocat évalue avant tout dépôt, toute communication
> publique, ou tout investissement industriel.

C'est le garde-fou le plus visible du plugin. Sous-flagger une antériorité
= porte à sens unique (R&D engagée, demande déposée, communication publique
faite, brevet accordé puis annulé en nullité, tous avec une antériorité
dessous). Sur-flagger = porte à 2 sens, le mandataire élague en revue.
Rester sur la porte à 2 sens.

---

## Charger le profil pratique avant de commencer

Avant tout, lire :
1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Récupérer :
- **Rôle** depuis `## 1. Profil cabinet et profil de pratique PI` (avocat
  inscrit / mandataire en brevets EQE / mandataire en marques INPI / juriste
  interne / non-juriste — change l'en-tête confidentialité ET le périmètre
  du secret professionnel).
- **Juridictions et offices d'inscription** (INPI, OEB, OMPI/PCT — défaut
  territoires si l'utilisateur n'en spécifie pas).
- **Domaines techniques principaux** depuis le secteur des clients dominants
  (mécanique / chimie / pharma / biotech / informatique / électronique /
  télécom — pondère la lecture des CIB et la pertinence des familles
  voisines).
- **Partenaire annuités** (essentiel : un brevet sans paiement d'annuités
  tombe en domaine public — mentionne dans la sortie qui suivra le portefeuille).
- **Posture FTO (liberté d'exploitation)** depuis la posture enforcement par
  défaut (agressive / mesurée / conservatrice — calibre le ton des recommandations).
- **Matrice d'approbateurs** pour les escalades.

Ce skill ne conclut JAMAIS "invention brevetable" ni "liberté d'exploitation
acquise".

Si le profil contient `[A CONFIGURER]`, surfacer :

> Le profil pratique n'est pas configuré — c'est ce qui adapte la posture, les
> juridictions, les domaines techniques et la chaîne d'approbation à votre
> cabinet ou service.
>
> **Deux choix :**
> - Lancer `/hacienda-propriete-intellectuelle:entretien-demarrage` (10-15 min)
> - Dire **"provisoire"** et je lance avec les défauts génériques (rôle
>   avocat, FR + EP, posture mesurée, domaines techniques tous, sans
>   playbook) — chaque sortie sera taggée `[PROVISOIRE — configurer le
>   profil pour une sortie sur mesure]`.

### Mode provisoire

Si l'utilisateur dit "provisoire", lancer normalement avec : posture mesurée,
rôle avocat, FR + EP, domaines techniques tous, pas de playbook (analyse
complète plutôt que matching contre une position list). Tagger la note du
relecteur et chaque finding `[PROVISOIRE]`. À la fin, ajouter :

> "C'était un run générique avec les hypothèses par défaut. Lancer
> `/hacienda-propriete-intellectuelle:entretien-demarrage` pour calibrer sur
> VOTRE pratique — votre playbook, vos juridictions, vos domaines techniques,
> votre tolérance au risque sur la FTO."

---

## Intake

Demander en un seul batch (pas de jeu de questions à rallonge) :

> Quelques questions avant le triage :
>
> 1. **Description de l'invention.** Le **problème technique** que résout
>    l'invention + la **solution** apportée, en 2-3 phrases. Pas le pitch
>    commercial — la substance technique.
> 2. **Domaine technique principal + classification CIB.** Si la CIB est
>    déjà connue (ex. `B01D 71/02` ou `H04N 19/176`), la fournir. Sinon
>    décrire le domaine et je proposerai les codes probables — tu confirmes.
> 3. **Date de priorité visée.** Date de premier dépôt envisagée, ou date
>    de divulgation publique imminente. **Critique** : tout art antérieur
>    publié avant cette date détruit la nouveauté ; tout ce qui est publié
>    après est hors-jeu (sauf demandes antérieures non publiées au sens
>    Art. 54(3) CBE — citation de classe E).
> 4. **Territoires cibles.** FR national (INPI) / EP (OEB désignant FR + UE) /
>    PCT international (phase nationale ultérieure). Défaut depuis le
>    profil.
> 5. **Art antérieur déjà connu de l'inventeur.** Publications
>    scientifiques, brevets concurrents, produits commercialisés, thèses,
>    conférences — tout ce que l'inventeur a déjà identifié. Une recherche
>    qui ignore le contexte connu de l'inventeur passe à côté de
>    l'évidence.

Attendre la réponse. Si la description est vague ("appli IA",
"nouveau matériau"), pousser une fois :

> Donne ce que l'invention fait techniquement — quelles entrées, quel
> traitement, quelles sorties, quel effet technique mesurable. La CIB et
> les antériorités pertinentes en dépendent. Sans précision technique, le
> triage cherchera dans le mauvais voisinage.

---

## Knockout — exclusions de brevetabilité L.611-10 CPI

Avant toute recherche en bases, vérifier les exclusions intrinsèques qui
condamnent une invention indépendamment de toute antériorité. L'article
L.611-10 du Code de la propriété intellectuelle (transposition Art. 52 CBE)
liste ce qui n'est **pas considéré comme une invention**, et ce qui est
**exclu de la brevetabilité** pour des raisons éthiques ou de politique
publique. Pour chaque exclusion, évaluer franchement et flagger. Ne pas
rationaliser un problème évident.

| Exclusion (L.611-10 CPI) | Ce que ça veut dire | Flagger quand |
|---|---|---|
| **Découvertes, théories scientifiques** | Loi naturelle pure, observation sans application | L'invention = observation d'un phénomène (constante physique, séquence génétique non isolée) sans procédé ou produit technique exploitant cette observation |
| **Méthodes mathématiques** | Algorithme abstrait sans effet technique | Formule, méthode de calcul ou modèle décrit sans application technique tangible (signal traité, machine commandée, mesure physique transformée) |
| **Créations esthétiques** | Œuvres de l'esprit | Apparence, forme purement décorative — relève du droit d'auteur ou du dessin et modèle, pas du brevet |
| **Plans, principes, méthodes** (intellectuelles, commerciales, jeux) | Business methods, règles de jeu, schémas d'enseignement | Pas de mise en œuvre technique — règle abstraite appliquée par l'humain ou par un ordinateur générique sans effet technique sur la machine elle-même |
| **Logiciel "en tant que tel"** | Algorithme pur sans effet technique sortant du domaine logiciel | Programme dont la contribution se limite au flux d'instructions, sans effet technique sur le système (traitement signal, contrôle processus, économie ressource physique mesurable). **Distinct des inventions mises en œuvre par ordinateur (CIB G06F) qui restent brevetables si elles résolvent un problème technique** — cf. OEB *Vicom* T-208/84 (1987), confirmé *IBM* T-1173/97 (1998) |
| **Présentations d'informations** | Affichage UI sans solution technique | Mise en forme d'information à l'attention de l'utilisateur sans résolution d'un problème technique (le contenu informationnel n'est pas en soi brevetable) |
| **Méthodes chirurgicales, thérapeutiques, de diagnostic** (sur corps humain ou animal) | Acte médical exécuté sur le corps | Méthode pratiquée par un praticien sur un patient. **À distinguer** : les **produits et dispositifs** (médicaments, implants, instruments) eux-mêmes restent brevetables (L.611-16 CPI, Art. 53(c) CBE) — seule la *méthode* est exclue |

**Note importante sur le logiciel.** La jurisprudence OEB (notamment *Vicom*
T-208/84 et la lignée qui suit) a établi que le critère opérationnel est la
présence d'un **effet technique supplémentaire** (further technical effect)
au-delà des interactions normales entre logiciel et matériel. Un algorithme
de compression d'image qui réduit l'occupation mémoire d'un capteur,
un protocole qui économise la batterie d'un IoT, un contrôleur PID
implémenté en logiciel : ce sont des inventions mises en œuvre par
ordinateur classées en CIB G06F (informatique) ou H04 (télécommunications)
et brevetables. À l'inverse, une méthode de comptabilité analytique
implémentée par un tableur reste un business method non-brevetable, même
emballée en logiciel.

**Note importante sur le médical.** L'exclusion porte sur la *méthode*
appliquée *in vivo* (sur le corps). Un médicament (substance + posologie),
un implant, un dispositif de diagnostic *in vitro*, un nouvel usage
thérapeutique d'une substance connue (revendication de type "swiss-type" ou
de type EPC 2000) restent brevetables. La frontière est jurisprudentielle —
flagger en `[review]` toute invention qui mêle dispositif et méthode.

**Sortie** : pour chaque exclusion, soit "aucun problème identifié", soit un
flag spécifique avec une ligne de raison. Ne pas produire un tableau plat de
"pass" sans analyse — l'objectif est de forcer l'inventeur et le mandataire
à objectiver chacun des 7 motifs avant de dépenser en recherche d'antériorité.

---

## Recherche multi-sources

L'objectif : **trouver des documents d'art antérieur potentiellement
destructeurs de nouveauté ou d'activité inventive**, pas décider si
l'invention est brevetable. C'est le rôle du mandataire en brevets ou de
l'avocat.

### Ce que l'utilisateur a connecté

Lire `## Intégrations disponibles` du profil pour déterminer quelles bases
sont effectivement interrogeables. Trois cas :

#### Cas A — INPI Brevets ✓ ET OEB Espacenet ✓ (optimal)

Exécuter en parallèle :

- `inpi_search_brevets({ query, classificationCIB, type: "tous", limite: 50 })`
  pour la base FR/EP nationale (demandes FR, brevets délivrés FR, parties
  nationales EP).
- `espacenet_search({ query, cib, datePublicationMax: priorite, limite: 50 })`
  pour la couverture mondiale (160M+ documents : OEB, USPTO, JPO, KIPO,
  CNIPA, WIPO, et offices nationaux).

**Filtrer impérativement par date de publication < date de priorité revendiquée.**
Un document publié après la date de priorité n'est pas de l'art antérieur
opposable (sauf cas Art. 54(3) CBE — demande antérieure non publiée à la
date de dépôt, statut E).

Attribuer chaque résultat à sa source (`[INPI Brevets]` ou `[OEB Espacenet]`)
dans le tag de provenance — ne jamais agréger sans source. Pour les détails
fins (revendications, statut juridique, annuités), enchaîner avec
`inpi_brevet_details({ numeroPublication })` ou
`espacenet_brevet_details({ numeroPublication })`.

#### Cas B — INPI Brevets ✓ ET OEB Espacenet ✗

INPI seul + ajouter une note explicite :

> **OEB Espacenet non interrogé** — la couverture mondiale (USPTO, JPO,
> CNIPA, WIPO et autres offices) est manquante. Or, l'art antérieur
> destructeur de nouveauté peut provenir de n'importe quel pays. Une
> recherche professionnelle Espacenet exhaustive est requise avant tout
> dépôt EP ou PCT. Pour un dépôt FR national, le triage INPI seul reste
> insuffisant — un brevet japonais ou américain de 2003 peut détruire la
> nouveauté.

#### Cas C — Aucun connecteur brevets

Annoncer explicitement :

> **Aucune base de données brevets interrogée.** Ce triage n'a pas hit
> Data INPI brevets, OEB Espacenet, Google Patents, WIPO PatentScope, ni
> aucune base de littérature non-brevet (Google Scholar, IEEE Xplore,
> PubMed, ACS, ACM Digital Library). Une recherche complète sur ces
> sources est requise avant toute conclusion sur la nouveauté ou
> l'activité inventive. Le triage ci-dessous est limité à l'analyse
> intrinsèque des exclusions L.611-10 et aux facteurs structurés contre
> les antériorités que l'utilisateur a citées ou qui apparaissent dans la
> conversation.

Puis continuer — les checks intrinsèques + l'analyse facteurs restent utiles,
juste honnêtement étiquetés. **Pas de supplémentation depuis la connaissance
modèle** : ne JAMAIS inventer des numéros de brevet ni "remplir" un résultat
de recherche depuis ce que le modèle "se souvient". C'est la première cause
d'hallucination en recherche brevet.

### Pour chaque résultat d'art antérieur (ou fourni)

Capturer :
- **Numéro de publication** (format réel : `FR2700123A1`, `EP1234567B1`,
  `WO2020/123456A1`, `US10,123,456B2`)
- **Source** (`[INPI Brevets]` / `[OEB Espacenet]` / `[utilisateur fourni]`)
- **Titre** (langue originale + traduction FR si disponible)
- **Classification CIB principale et secondaires** (la pluralité de
  classifications est un signal — un brevet classé en plusieurs sous-classes
  signale une application transversale)
- **Déposant** (et inventeurs si pertinent — un même inventeur publiant
  plusieurs demandes liées est un signal de famille)
- **Date de publication** (A1 = demande publiée 18 mois après dépôt ; B1/B2 =
  brevet délivré ; A2/A3 = rapport de recherche distinct)
- **Date de priorité si disponible** (peut être très antérieure à la
  publication — c'est elle qui compte pour l'opposabilité)
- **Abrégé** (en langue originale + résumé FR si traduisible)
- **Statut juridique** (en vigueur, expiré, abandonné, déchu pour
  non-paiement d'annuité — un brevet déchu n'est plus opposable en
  contrefaçon mais reste opposable comme art antérieur)

**Pas de supplémentation silencieuse.** Si on cite un numéro de publication,
il vient de la recherche exécutée ou de l'utilisateur. Si une donnée n'est
pas dans le résultat (date de priorité absente, abrégé tronqué), écrire
"non disponible dans le résultat" — ne jamais deviner.

---

## Balayage des CIB voisines + littérature non-brevet (requis avant de conclure)

Une recherche qui ne couvre que la sous-classe CIB principale manque les
antériorités cross-domaine, qui sont la cause la plus fréquente de refus
inattendus. Avant de conclure, identifier les CIB voisines à balayer et
**demander confirmation** à l'utilisateur.

### CIB voisines à explorer

La Classification Internationale des Brevets est hiérarchique :
**section** (A-H) > **classe** (deux chiffres) > **sous-classe** (lettre) >
**groupe** (chiffres). Les 8 sections :

- **A** = Nécessités courantes (médical, agriculture, alimentation, sport)
- **B** = Techniques industrielles, transports
- **C** = Chimie, métallurgie
- **D** = Textiles, papier
- **E** = Constructions fixes (bâtiment, mines)
- **F** = Mécanique, éclairage, chauffage, armement, sautage
- **G** = Physique (instruments, optique, informatique au sens dispositif)
- **H** = Électricité (production, transmission, télécommunications)

Pour chaque invention, balayer :

- **Même classe + sous-classes voisines.** Exemple : pour `B01D 71/02`
  (membranes filtration polymère), explorer aussi `B01D 53` (procédés
  séparation gaz), `B01D 61` (procédés séparation membranaire en général),
  `B01D 67` (procédés de fabrication des membranes), `C08J` (transformation
  des polymères).
- **Sections différentes mais application transversale.** Un procédé textile
  (D) peut citer un brevet chimie (C) sur le même polymère. Un dispositif
  médical (A61) peut citer un brevet électronique (H). **Application
  transversale = piège classique.**
- **Codes CPC (Cooperative Patent Classification) équivalents.** Pour les
  brevets US et EP récents, la CPC offre une granularité supérieure — si
  l'outil le permet, croiser CIB et CPC.

### Littérature non-brevet (NPL)

**Souvent destructive de nouveauté en biotech, semi-conducteurs, IA,
chimie pharmaceutique.** Une thèse de doctorat publiée 3 ans avant le
dépôt, une preprint arXiv, un article IEEE — tout ceci constitue de l'art
antérieur opposable. Aucun outil MCP courant n'interroge ces bases ; à
compléter manuellement après le rapport.

À lister explicitement en next-step pour la recherche professionnelle :

- **Google Scholar** (généraliste académique)
- **IEEE Xplore** (électronique, télécom, informatique)
- **PubMed / MEDLINE** (biomédical)
- **ACS Publications** (chimie)
- **ACM Digital Library** (informatique)
- **arXiv / bioRxiv / chemRxiv** (preprints — souvent oubliés et
  destructeurs)
- **Bases sectorielles** (SAE pour automobile, ASME pour mécanique,
  AIChE pour génie chimique)
- **Thèses** (theses.fr pour la France, ProQuest mondial)

### Bloc de confirmation

Sortir un bloc avant de conclure :

> **CIB voisines et littérature non-brevet à balayer (confirmer ou compléter) :**
>
> - **CIB voisines suggérées :** [section + sous-classes adjacentes, ex.
>   `B01D 53`, `B01D 61`, `B01D 67`, `C08J`]
> - **Codes CPC équivalents :** [si applicable, ex. `B01D 71/021`,
>   `Y02C 20/40`]
> - **Bases NPL recommandées pour ce domaine :** [ex. pour la biotech,
>   PubMed + bioRxiv + thèses ; pour l'IA, arXiv + IEEE + ACM]
> - **Mots-clés alternatifs à tester :** [synonymes techniques, équivalents
>   anglais, abréviations sectorielles]
>
> Une recherche d'antériorité brevet qui ne couvre que la CIB-cible manque
> les antériorités cross-domaine. Une recherche qui ignore la littérature
> non-brevet manque la cause la plus fréquente de refus en biotech,
> semi-conducteurs et IA. Confirmer cette liste avant que je continue.

Si MCP brevets connecté, **re-exécuter** la recherche sur chaque CIB voisine
confirmée et ajouter les résultats à la table d'art antérieur avec source
"CIB voisine : [code]". Si la NPL n'est pas couverte par les outils, lister
explicitement les bases comme input next-step pour la recherche
professionnelle complète — **ne pas sauter silencieusement**.

---
