---
name: preparation-depot-brevet
version: "2.0.0"
description: >
  Préparation stricte d'un dossier de dépôt brevet V2 pour produire un brief
  de rédaction exploitable avant revue humaine. Ce skill ne dépose pas, ne
  rend pas d'opinion finale de brevetabilité, et ne remplace pas la rédaction
  finale d'un mandataire brevets ou d'un avocat.
argument-hint: "[description invention | CIB/CPC | FR/EP/PCT]"
---

# Skill - Préparation de dépôt brevet V2

> **Préparation technique, pas dépôt final.**
> `preparation-depot-brevet` sert à produire un brouillon structuré de dossier
> de dépôt, un `Brief de rédaction`, une architecture candidate de revendications
> et un `Seuil de préparation du dépôt`. Il ne remplace ni la rédaction finale par un
> mandataire brevets, ni le choix formel de dépôt, ni le dépôt lui-même.

Référence de travail utile :
`references/preparation-depot-brevet-routing-and-output.md`

## Examples

<example>
<user>/h-pi:preparation-depot-brevet [description invention | CIB/CPC | FR/EP/PCT]</user>
<response>
Brouillon de travail structuré, avec faits, droit, analyse, incertitudes, sources consultées, points `[à vérifier]` et validation humaine obligatoire.
</response>
</example>

## Chargement du profil

Avant tout travail substantiel, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Si le profil est absent, incomplet ou contient `[A CONFIGURER]`, demander `/h-pi:entretien-demarrage` et garder les marqueurs `[à vérifier]` visibles.

## Intake

Identifier au minimum : demande, actif ou droit concerné, parties, territoire, dates utiles, documents disponibles, source officielle à consulter, urgence, sortie attendue et niveau de validation humaine requis.

## Gate non-juriste

Si l'utilisateur n'est pas juriste ou avocat, produire une explication opérationnelle, signaler les limites, refuser toute conclusion présentée comme avis juridique final et demander validation par un professionnel habilité avant usage externe.

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Propriété Intellectuelle` est disponible. Ne pas inventer de tool hors périmètre ; si une source ou un registre n'a pas été consulté directement, garder `[à vérifier]`.

- Socle textes, jurisprudence et droit UE : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Brevets et Espacenet : `inpi_search_brevets`, `inpi_brevet_details`, `espacenet_search`, `espacenet_brevet_details`.
- Anno, quand disponible, reste une source interne de dossier : jamais un registre officiel INPI, EUIPO, OEB, OMPI ou BOPI.

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/` ou `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`.

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

## Positionnement

`preparation-depot-brevet` prend le relais après un premier passage
exploitable de `recherche-anteriorite-brevet`.

Il est borné à :

1. cadrer la matière technique de dépôt ;
2. vérifier inventeurs, déposant et risque de divulgation ;
3. construire un brief de rédaction ;
4. évaluer un `Seuil de préparation du dépôt` ;
5. proposer une route `FR` / `EP` / `PCT` / `sequenced`.

Le skill ne doit pas :

- déposer un brevet ;
- rendre une opinion finale de brevetabilité ;
- rendre une opinion FTO ;
- remplacer la rédaction finale d'un mandataire brevets ;
- devenir un orchestrateur global de prosecution internationale.

## Contrat d'entrée V2

Le skill doit expliciter ou dériver :

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

- le rôle utilisateur ;
- les territoires de dépôt habituels ;
- le domaine technique principal ;
- le mandataire ou avocat de référence si connu ;
- la posture de prudence.

Si le profil contient `[A CONFIGURER]`, le dire explicitement et tagger la
sortie `[PROVISOIRE]`.

## Cadrage initial

Demander en un seul batch, puis mapper la réponse au contrat V2 :

1. problème technique et solution technique ;
2. type d'invention ou contexte technique ;
3. inventeurs et déposant envisagés ;
4. route de dépôt visée : `FR`, `EP`, `PCT` ou séquence ;
5. priorité ou séquence envisagée ;
6. statut de divulgation publique ;
7. état du prior art connu et de la recherche amont ;
8. variantes, figures, exemples et support technique déjà disponibles.

Guidance de mapping minimale :

- dispositif, système, capteur, machine -> `invention_type: device`
- procédé, méthode technique, chaîne opératoire -> `invention_type: process`
- molécule, formulation, matériau, composition -> `invention_type: composition`
- invention informatique avec effet technique -> `invention_type: software-implemented`
- invention medtech / biotech / thérapeutique outillée -> `invention_type: biotech-medical`
- dépôt FR seul -> `filing_lane: fr`
- dépôt EP direct -> `filing_lane: ep`
- dépôt PCT direct -> `filing_lane: pct`
- séquence de priorité ou de dépôt -> `filing_lane: sequenced`
- pas de divulgation connue -> `disclosure_status: no-known-disclosure`
- divulgation prévue mais pas encore faite -> `disclosure_status: planned-disclosure`
- divulgation déjà faite ou suspectée -> `disclosure_status: already-disclosed`
- inventeurs et déposant clairs -> `inventorship_status: clear`
- inventorship ou titularité à revoir -> `inventorship_status: needs-review`
- conflit, doute fort ou chaîne incertaine -> `inventorship_status: contested-or-unclear`

Si la matière technique reste vague, pousser une fois pour obtenir :

- un effet technique concret ;
- au moins un mode de réalisation ;
- un minimum de variantes ou d'exemples.

Sinon, réduire la confiance et marquer `readiness_status: partial` ou
`blocked` selon la gravité.

## Seuil de préparation du dépôt

Le skill doit conclure explicitement sur :

- `ready`
  - matière technique suffisante pour produire un brief de rédaction
  - inventeurs / déposant identifiables
  - pas de blocage majeur de divulgation connu
- `partial`
  - dossier exploitable mais incomplet
  - variantes, figures, exemples ou support technique encore insuffisants
- `blocked`
  - divulgation déjà intervenue avec risque majeur
  - invention trop vague
  - titularité ou inventorship trop incertains

Checks minimaux du gate :

- matière technique assez concrète pour un dossier sérieux ;
- état du prior art connu cohérent avec une préparation de dépôt ;
- inventeurs et déposant identifiables ;
- divulgation publique non bloquante ou à risque visible ;
- support minimal en variantes, figures ou données.

Si `disclosure_status = already-disclosed`, le skill doit faire remonter un
blocage majeur et expliquer que la nouveauté peut être compromise.

Si `inventorship_status = contested-or-unclear`, le skill ne doit pas
maquiller le risque de titularité.

## Voies de dépôt

- `FR`
  - préparation pour dépôt prioritaire FR
- `EP`
  - préparation pour dépôt direct EP
- `PCT`
  - préparation pour dépôt direct PCT
- `sequenced`
  - préparation avec route de priorité ou séquence de dépôt

Le skill propose une route bornée. Il ne remplace pas
`strategie-extension-internationale`.

## Cœur de rédaction

Le cœur du skill reste la préparation du paquet de rédaction :

- problème technique objectif ;
- solution technique ;
- avantages techniques revendicables ;
- vocabulaire technique clé ;
- revendication indépendante candidate ;
- dépendantes structurantes ;
- support descriptif disponible ;
- figures et exemples à rassembler.

## Frontieres de routage

- `recherche-anteriorite-brevet` : si la recherche amont est insuffisante ou
  si le prior art connu reste trop faible pour préparer le dépôt proprement
- `strategie-extension-internationale` : si le besoin devient la stratégie
  d'extension ou de portefeuille plus que le brief de dépôt initial
- `anteriorite-invalidite` : si le besoin devient l'attaque d'un brevet tiers
  ou la nullité
- `tableau-contrefacon-brevet` : si le besoin devient la comparaison
  revendications / produit ou procédé
- `logiciels-pi` : si le cœur du sujet est le régime logiciel, la titularité,
  les licences ou l'OSS plus qu'un dépôt brevet

## Contrat de sortie V2

La sortie doit être structurée ainsi :

1. `Synthèse du dossier`
2. `Contrôle inventeurs et titularité`
3. `Contrôle du risque de divulgation`
4. `Brief de rédaction`
5. `Architecture candidate des revendications`
6. `Couverture de la description`
7. `Checklist figures et exemples`
8. `Priorité et voie de dépôt`
9. `Validation humaine`

### 1. `Synthèse du dossier`

- nature de l'invention ;
- voie envisagée ;
- objectif du travail ;
- statut général du dossier.

### 2. `Contrôle inventeurs et titularité`

- inventeurs identifiés ;
- déposant envisagé ;
- statut `inventorship_status` ;
- points de vigilance sur `L.611-7`, cessions ou chaîne de droits.

### 3. `Contrôle du risque de divulgation`

- divulgations connues ou prévues ;
- statut `disclosure_status` ;
- urgence ou blocage ;
- impact potentiel sur la nouveauté.

### 4. `Brief de rédaction`

- problème technique ;
- solution ;
- avantages techniques revendicables ;
- vocabulaire technique clé ;
- architecture générale du dossier.

### 5. `Architecture candidate des revendications`

- revendication indépendante candidate ;
- sous-combinaisons plausibles ;
- dépendantes structurantes ;
- points à ne pas sur-figer.

### 6. `Couverture de la description`

- sections attendues ;
- modes de réalisation déjà supportés ;
- trous de support ;
- besoins de variantes ou d'exemples additionnels.

### 7. `Checklist figures et exemples`

- figures attendues ;
- schémas ou flowcharts utiles ;
- données, essais ou tableaux comparatifs manquants ;
- statut de `known_drawings_status` et `known_data_or_test_support`.

### 8. `Priorité et voie de dépôt`

- route `FR` / `EP` / `PCT` / `sequenced` recommandée ;
- raison de la route suggérée ;
- conditions, réserves ou prérequis ;
- quand rerouter vers `strategie-extension-internationale`.

### 9. `Validation humaine`

- ce qui doit être validé par un mandataire ou avocat ;
- ce qui reste `[à vérifier]` ;
- décision finale réservée au professionnel.

## Routage de prochaine étape

Conclure avec une seule valeur :

- `prepare-drafting-brief`
- `fill-readiness-gaps`
- `expand-prior-art-review`
- `hold-due-to-disclosure-risk`
- `route-to-extension-strategy`
- `route-to-invalidity-analysis`
- `route-to-infringement-chart`
- `route-to-software-regime-review`

Associer la valeur choisie à 2-4 actions concrètes et à sa justification.

## Règles de sûreté

- Le garde-fou "préparation technique, pas dépôt final" doit rester visible.
- Le `Seuil de préparation du dépôt` doit être explicite.
- Une recherche amont insuffisante ne doit jamais être maquillée.
- Une divulgation déjà intervenue reste un risque majeur visible.
- Une titularité ou inventorship incertaine reste un frein visible.
- La route FR / EP / PCT / `sequenced` reste bornée et ne remplace pas une
  stratégie complète de prosecution.

## Rappel final à conserver

- préparation stricte au dépôt uniquement ;
- jamais dépôt final, opinion finale de brevetabilité ou opinion FTO ;
- validation humaine obligatoire avant toute rédaction finale ou dépôt.
