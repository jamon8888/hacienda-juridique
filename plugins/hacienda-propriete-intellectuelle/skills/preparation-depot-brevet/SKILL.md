---
name: preparation-depot-brevet
description: >
  Preparation stricte d'un dossier de depot brevet V2 pour produire un brief
  de redaction exploitable avant revue humaine. Ce skill ne depose pas, ne
  rend pas d'opinion finale de brevetabilite, et ne remplace pas la redaction
  finale d'un mandataire brevets ou d'un avocat.
argument-hint: "[description invention | CIB/CPC | FR/EP/PCT]"
---

# Skill - Preparation de depot brevet V2

> **Preparation technique, pas depot final.**
> `preparation-depot-brevet` sert a produire un brouillon structure de dossier
> de depot, un `Drafting Brief`, une architecture candidate de revendications
> et un `Filing Readiness Gate`. Il ne remplace ni la redaction finale par un
> mandataire brevets, ni le choix formel de depot, ni le depot lui-meme.

Reference de travail utile :
`references/preparation-depot-brevet-routing-and-output.md`

## Positionnement

`preparation-depot-brevet` prend le relais apres un premier passage
exploitable de `recherche-anteriorite-brevet`.

Il est borne a :

1. cadrer la matiere technique de depot ;
2. verifier inventeurs, deposant et risque de divulgation ;
3. construire un brief de redaction ;
4. evaluer un `Filing Readiness Gate` ;
5. proposer une route `FR` / `EP` / `PCT` / `sequenced`.

Le skill ne doit pas :

- deposer un brevet ;
- rendre une opinion finale de brevetabilite ;
- rendre une opinion FTO ;
- remplacer la redaction finale d'un mandataire brevets ;
- devenir un orchestrateur global de prosecution internationale.

## Contrat d'entree V2

Le skill doit expliciter ou deriver :

- `invention_type`: `device`, `process`, `composition`,
  `software-implemented`, `biotech-medical`, `mixed`, `unknown`
- `filing_lane`: `fr`, `ep`, `pct`, `sequenced`, `unknown`
- `priority_strategy_status`: `single-lane`, `fr-then-ep`, `fr-then-pct`,
  `ep-direct`, `pct-direct`, `unclear`
- `readiness_status`: `ready`, `partial`, `blocked`, `unknown`
- `inventorship_status`: `clear`, `needs-review`, `contested-or-unclear`
- `disclosure_status`: `no-known-disclosure`, `planned-disclosure`,
  `already-disclosed`, `unclear`

Bloc de faits minimum :

- `proposed_invention`
- `technical_problem`
- `technical_solution`
- `known_prior_art_status`
- `inventors`
- `applicant`
- `territories_targeted`
- `public_disclosure_timeline`
- `known_examples_and_variants`
- `known_drawings_status`
- `known_data_or_test_support`

## Chargement du profil pratique

Avant tout, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Rattacher ensuite :

- le role utilisateur ;
- les territoires de depot habituels ;
- le domaine technique principal ;
- le mandataire ou avocat de reference si connu ;
- la posture de prudence.

Si le profil contient `[A CONFIGURER]`, le dire explicitement et tagger la
sortie `[PROVISOIRE]`.

## Intake

Demander en un seul batch, puis mapper la reponse au contrat V2 :

1. probleme technique et solution technique ;
2. type d'invention ou contexte technique ;
3. inventeurs et deposant envisages ;
4. route de depot visee : `FR`, `EP`, `PCT` ou sequence ;
5. priorite ou sequence envisagee ;
6. statut de divulgation publique ;
7. etat du prior art connu et de la recherche amont ;
8. variantes, figures, exemples et support technique deja disponibles.

Guidance de mapping minimale :

- dispositif, systeme, capteur, machine -> `invention_type: device`
- procede, methode technique, chaine operatoire -> `invention_type: process`
- molecule, formulation, materiau, composition -> `invention_type: composition`
- invention informatique avec effet technique -> `invention_type: software-implemented`
- invention medtech / biotech / therapeutique outillee -> `invention_type: biotech-medical`
- depot FR seul -> `filing_lane: fr`
- depot EP direct -> `filing_lane: ep`
- depot PCT direct -> `filing_lane: pct`
- sequence de priorite ou de depot -> `filing_lane: sequenced`
- pas de divulgation connue -> `disclosure_status: no-known-disclosure`
- divulgation prevue mais pas encore faite -> `disclosure_status: planned-disclosure`
- divulgation deja faite ou suspectee -> `disclosure_status: already-disclosed`
- inventeurs et deposant clairs -> `inventorship_status: clear`
- inventorship ou titularite a revoir -> `inventorship_status: needs-review`
- conflit, doute fort ou chaine incertaine -> `inventorship_status: contested-or-unclear`

Si la matiere technique reste vague, pousser une fois pour obtenir :

- un effet technique concret ;
- au moins un mode de realisation ;
- un minimum de variantes ou d'exemples.

Sinon, reduire la confiance et marquer `readiness_status: partial` ou
`blocked` selon la gravite.

## Filing Readiness Gate

Le skill doit conclure explicitement sur :

- `ready`
  - matiere technique suffisante pour produire un brief de redaction
  - inventeurs / deposant identifiables
  - pas de blocage majeur de divulgation connu
- `partial`
  - dossier exploitable mais incomplet
  - variantes, figures, exemples ou support technique encore insuffisants
- `blocked`
  - divulgation deja intervenue avec risque majeur
  - invention trop vague
  - titularite ou inventorship trop incertains

Checks minimaux du gate :

- matiere technique assez concrete pour un dossier serieux ;
- etat du prior art connu coherent avec une preparation de depot ;
- inventeurs et deposant identifiables ;
- divulgation publique non bloquante ou a risque visible ;
- support minimal en variantes, figures ou donnees.

Si `disclosure_status = already-disclosed`, le skill doit faire remonter un
blocage majeur et expliquer que la nouveaute peut etre compromise.

Si `inventorship_status = contested-or-unclear`, le skill ne doit pas
maquiller le risque de titularite.

## Filing lanes

- `FR`
  - preparation pour depot prioritaire FR
- `EP`
  - preparation pour depot direct EP
- `PCT`
  - preparation pour depot direct PCT
- `sequenced`
  - preparation avec route de priorite ou sequence de depot

Le skill propose une route bornee. Il ne remplace pas
`strategie-extension-internationale`.

## Drafting core

Le coeur du skill reste la preparation du paquet de redaction :

- probleme technique objectif ;
- solution technique ;
- avantages techniques revendicables ;
- vocabulaire technique cle ;
- revendication independante candidate ;
- dependantes structurantes ;
- support descriptif disponible ;
- figures et exemples a rassembler.

## Frontieres de routage

- `recherche-anteriorite-brevet` : si la recherche amont est insuffisante ou
  si le prior art connu reste trop faible pour preparer le depot proprement
- `strategie-extension-internationale` : si le besoin devient la strategie
  d'extension ou de portefeuille plus que le brief de depot initial
- `anteriorite-invalidite` : si le besoin devient l'attaque d'un brevet tiers
  ou la nullite
- `tableau-contrefacon-brevet` : si le besoin devient la comparaison
  revendications / produit ou procede
- `logiciels-pi` : si le coeur du sujet est le regime logiciel, la titularite,
  les licences ou l'OSS plus qu'un depot brevet

## Contrat de sortie V2

La sortie doit etre structuree ainsi :

1. `Case Snapshot`
2. `Inventorship and Ownership Check`
3. `Disclosure Risk Check`
4. `Drafting Brief`
5. `Claim Architecture Candidate`
6. `Description Coverage`
7. `Figures and Examples Checklist`
8. `Priority and Filing Path`
9. `Human Validation`

### 1. `Case Snapshot`

- nature de l'invention ;
- lane envisagee ;
- objectif du travail ;
- statut general du dossier.

### 2. `Inventorship and Ownership Check`

- inventeurs identifies ;
- deposant envisage ;
- statut `inventorship_status` ;
- points de vigilance sur `L.611-7`, cessions ou chaine de droits.

### 3. `Disclosure Risk Check`

- divulgations connues ou prevues ;
- statut `disclosure_status` ;
- urgence ou blocage ;
- impact potentiel sur la nouveaute.

### 4. `Drafting Brief`

- probleme technique ;
- solution ;
- avantages techniques revendicables ;
- vocabulaire technique cle ;
- architecture generale du dossier.

### 5. `Claim Architecture Candidate`

- revendication independante candidate ;
- sous-combinaisons plausibles ;
- dependantes structurantes ;
- points a ne pas sur-figer.

### 6. `Description Coverage`

- sections attendues ;
- modes de realisation deja supportes ;
- trous de support ;
- besoins de variantes ou d'exemples additionnels.

### 7. `Figures and Examples Checklist`

- figures attendues ;
- schemas ou flowcharts utiles ;
- donnees, essais ou tableaux comparatifs manquants ;
- statut de `known_drawings_status` et `known_data_or_test_support`.

### 8. `Priority and Filing Path`

- route `FR` / `EP` / `PCT` / `sequenced` recommandee ;
- raison de la route suggeree ;
- conditions, reserves ou prerequis ;
- quand rerouter vers `strategie-extension-internationale`.

### 9. `Human Validation`

- ce qui doit etre valide par un mandataire ou avocat ;
- ce qui reste `[a verifier]` ;
- decision finale reservee au professionnel.

## Next Step Routing

Conclure avec une seule valeur :

- `prepare-drafting-brief`
- `fill-readiness-gaps`
- `expand-prior-art-review`
- `hold-due-to-disclosure-risk`
- `route-to-extension-strategy`
- `route-to-invalidity-analysis`
- `route-to-infringement-chart`
- `route-to-software-regime-review`

Associer la valeur choisie a 2-4 actions concretes et a sa justification.

## Regles de surete

- Le garde-fou "preparation technique, pas depot final" doit rester visible.
- Le `Filing Readiness Gate` doit etre explicite.
- Une recherche amont insuffisante ne doit jamais etre maquillee.
- Une divulgation deja intervenue reste un risque majeur visible.
- Une titularite ou inventorship incertaine reste un frein visible.
- La route FR / EP / PCT / `sequenced` reste bornee et ne remplace pas une
  strategie complete de prosecution.

## Rappel final a conserver

- preparation stricte au depot uniquement ;
- jamais depot final, opinion finale de brevetabilite ou opinion FTO ;
- validation humaine obligatoire avant toute redaction finale ou depot.
