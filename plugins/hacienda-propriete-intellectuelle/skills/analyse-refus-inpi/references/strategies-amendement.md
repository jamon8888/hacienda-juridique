# Stratégies d'amendement — Options A / B / C / D

Référence détaillée pour le skill `/analyse-refus-inpi`. Décline les 4
options d'amendement face à une notification de refus INPI ou OEB, avec
exemples par domaine technique, garde-fous statutaires et jurisprudence
OEB.

## Option A — Limitation par incorporation

**Mécanisme** : déplacer une caractéristique d'une revendication dépendante
vers la revendication indépendante.

### Exemples par domaine technique

- **Mécanique** : la revendication 1 « dispositif de fixation comprenant un
  boulon et un écrou » est limitée en incorporant la caractéristique de la
  revendication dépendante 3 « caractérisé en ce que le boulon comporte un
  filetage à pas fin de 0,5 mm ». Distingue d'un art antérieur X divulguant
  des boulons à pas standard.
- **Chimie** : la revendication 1 « composition comprenant A et B » est
  limitée en ajoutant « et un stabilisant choisi parmi C ou D » (de la
  revendication dépendante 5). Le stabilisant absent de la citation X
  établit la nouveauté.
- **Logiciel** : la revendication 1 « procédé de chiffrement comprenant les
  étapes a, b » est limitée en ajoutant « et une étape c de hachage
  cryptographique par SHA-256 » (issue de la revendication dépendante 4).
- **Biotech** : la revendication 1 « anticorps monoclonal anti-PD-L1 » est
  limitée en précisant « anticorps monoclonal anti-PD-L1 humanisé de type
  IgG4 » (issue de la revendication dépendante 6).

### Garde-fou L.612-6 CPI / Art. 123(2) EPC — non-extension

L'amendement **ne peut aller au-delà** du contenu de la demande initiale
telle que déposée. « Sortir du cadre » = motif de **nullité ultérieure**
(L.613-25 c CPI / Art. 100(c) EPC en opposition).

**Test pratique** : la caractéristique amendée doit être divulguée
**explicitement** ou **implicitement** dans la description initiale,
idéalement avec son **effet technique**. Une caractéristique présente
**uniquement** dans une revendication dépendante mais pas dans la
description peut suffire si l'enchaînement entre revendications est clair,
mais c'est plus risqué.

### Garde-fou Art. 123(3) EPC — pas d'élargissement post-grant

Après délivrance, on **ne peut pas élargir** l'étendue de la protection (à
l'OEB en opposition ; à l'INPI via L.613-25). Cette règle ne concerne pas
l'examen pré-grant (couvert par ce skill) mais doit être anticipée si
l'amendement crée une formulation interprétable plus largement après
délivrance.

### Jurisprudence OEB sur Option A

- **G 1/93** (Grande Chambre, 2 février 1994) : posent les principes
  fondamentaux de la non-extension Art. 123(2) — la caractéristique
  amendée doit être directement et sans ambiguïté dérivable de la demande
  telle que déposée.
- **G 2/10** (Grande Chambre, 30 août 2011) : intermediate generalisation —
  extraire une caractéristique d'une réalisation décrite sans extraire les
  caractéristiques qui lui sont structurellement liées dans cette
  réalisation peut violer Art. 123(2). Test rigoureux à appliquer si on
  incorpore une caractéristique « isolée » d'un exemple plus complet.
- **T 0331/87** : test classique du « disclosure » — la caractéristique
  amendée doit être directement et sans ambiguïté divulguée dans la
  demande telle que déposée.

## Option B — Reformulation sans modification de l'étendue

**Mécanisme** : reformuler les termes (synonymes techniques, précisions
linguistiques) sans modifier le périmètre revendiqué.

### Exemples par domaine technique

- **Mécanique** : « pièce métallique » devient « pièce en acier inoxydable
  AISI 316 » — si la description originale décrit cet alliage spécifique.
- **Chimie** : « solvant organique » devient « solvant aprotique polaire
  choisi parmi DMF, DMSO, NMP » — si la description liste ces solvants.
- **Logiciel** : « algorithme de tri » devient « algorithme de tri rapide
  (quicksort) avec partitionnement randomisé » — si la description décrit
  cet algorithme.
- **Biotech** : « protéine recombinante » devient « protéine recombinante
  exprimée en système procaryote E. coli BL21 » — si l'exemple 2 utilise
  cette souche.

### Risque principal

L'examinateur peut considérer la reformulation comme un **contournement
non distinctif** si elle est purement linguistique sans ancrage technique
identifiable. À justifier par interprétation conforme à la description et
appuyé par un exemple chiffré.

### Jurisprudence OEB sur Option B

- **T 0190/99** : la reformulation doit modifier substantivement la portée
  technique pour être recevable comme distinction.

## Option C — Abandon revendication, repli sur dépendantes

**Mécanisme** : abandonner la revendication indépendante problématique,
promouvoir une revendication dépendante en indépendante.

### Exemples par domaine technique

- **Mécanique** : abandon de la rev. 1 « dispositif de fixation » ; rev. 5
  « dispositif de fixation selon la rev. 1 caractérisé par un mécanisme de
  desserrage rapide » devient la nouvelle rev. 1.
- **Chimie** : abandon de la rev. 1 sur la composition générique ; promotion
  de la rev. 4 sur une composition spécifique avec stabilisant.
- **Logiciel** : abandon de la rev. 1 sur le procédé général ; promotion de
  la rev. 7 sur l'implémentation en mémoire non volatile.
- **Biotech** : abandon de la rev. 1 sur l'anticorps générique ; promotion
  de la rev. 3 sur la séquence CDR spécifique.

### Cohérence à maintenir

- Renuméroter les revendications restantes
- Adapter les renvois (« selon la revendication 1 ») dans les anciennes
  revendications dépendantes
- Vérifier que la nouvelle rev. 1 promue est elle-même distincte des
  citations X

## Option D — Demande divisionnaire (CPI L.612-4 / Règle 36 EPC)

**Mécanisme** : déposer une demande divisionnaire parallèle, amender
fortement le parent pour passer l'examen, défendre la portée pleine sur la
divisionnaire.

### Conditions de dépôt

- **Demande parent pendante** : avant délivrance ou rejet définitif
- **Pas d'extension de matière** : la divisionnaire doit porter sur de la
  matière déjà divulguée dans la demande parent (Art. 76 EPC / L.612-4 CPI)
- **Délai INPI** : possible à tout moment de la pendance, jusqu'à la
  délivrance ou le rejet
- **Délai OEB** : Règle 36 EPC — pas de date limite tant que la demande
  parent est pendante, mais penalty pour divisionnaire de divisionnaire
  (Règle 38(4) EPC) avec taxe additionnelle progressive

### Coûts indicatifs 2026

- **Amendement standard (Options A / B / C)** : **inclus** dans la procédure
  d'examen, aucune taxe additionnelle
- **Demande divisionnaire FR INPI** :
  - Taxe dépôt : ~36 €
  - Taxe rapport de recherche : ~520 €
  - Taxe examen : ~42 €
  - **Total taxes INPI** : ~600 € + frais mandataire (~1 000 - 2 000 €)
- **Demande divisionnaire OEB** :
  - Taxe dépôt : ~125 €
  - Taxe désignation : ~660 €
  - Taxe recherche : ~1 460 €
  - Taxe examen : ~1 915 €
  - **Total taxes OEB** : ~2 500 - 4 200 € selon réductions PME +
    mandataire (~2 000 - 5 000 €)
- **Réductions possibles OEB** : Règle 6 EPC pour micro-entités, PME,
  universités et organismes publics (réduction 30 %)

### Quand recommander Option D

- L'aspect que l'on **abandonne du parent** (par limitation Option A ou
  abandon Option C) a une **valeur commerciale propre identifiable**
- Le budget annuités permet de soutenir 2 dossiers
- L'horizon de marché justifie la prolongation de prosecution (12-24 mois
  supplémentaires)

### Risque budgétaire

- Taxes annuités cumulées sur 2 dossiers
- Charge mandataire doublée pendant 18-36 mois
- Penalty OEB divisionnaires en cascade

## Précédents jurisprudentiels OEB sur amendements

- **G 1/93** : principes fondamentaux non-extension Art. 123(2)
- **G 1/03 et G 2/03** : disclaimers — exclusions de l'art antérieur par
  renoncement (« à l'exception de... ») recevables sous conditions
  strictes
- **G 2/10** : intermediate generalisation — extraction de caractéristiques
- **G 1/15** : priorité partielle, pertinent si Option A repose sur une
  caractéristique avec priorité contestée

## Liens avec autres skills du plugin

- **`preparation-depot-brevet` V2.0** (préventif) : bien rédiger la
  description et les revendications dépendantes pour **faciliter les
  amendements futurs**. Une description riche en variantes, exemples
  chiffrés et effets techniques crée une « réserve » d'amendements Option A
  défendables.
- **`tableau-contrefacon-brevet` V2.0** (offensif) : si on est titulaire,
  on doit **défendre la portée** maximale pour permettre un claim chart
  efficace contre un contrefacteur. Option C (abandon) ou Option A
  (limitation forte) réduit la portée et limite l'offensive future →
  arbitrage entre passer l'examen et préserver la portée.
- **`anteriorite-invalidite` V2.1** : les amendements défensifs ici
  préviennent les attaques en nullité (L.613-25 CPI) post-délivrance.

## Sources

- **CPI L.612-4** (demande divisionnaire), **L.612-6** (non-extension de
  matière), **L.613-25** (causes de nullité)
- **Convention sur le brevet européen (CBE)** Art. 76, 123, Règle 36, Règle
  38(4), Règle 132
- **Directives examen OEB partie H** : amendements
- **Directives examen OEB partie G chapitre VII** : approche problème-solution
- **Jurisprudence OEB Grande Chambre** : G 1/93, G 1/03, G 2/03, G 2/10,
  G 1/15
- **Décisions Chambres de recours OEB** : T 0331/87, T 0190/99
