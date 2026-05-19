---
name: saisie-contrefacon
description: >
  Skill V2 multi-droits de preparation stricte de mesure probatoire, centre
  sur la requete, le perimetre de saisie, les contraintes d'execution, le
  secret des affaires et le routage immediat post-saisie. Brouillon soumis a
  validation par un avocat.
argument-hint: "[brevet|marque|D&M|auteur|logiciel|mixte]"
version: "2.0.0"
authors: ["Hacienda"]
tags: [saisie-contrefacon, requete, commissaire-justice, preuve, brevets, marques, dessins-modeles, droit-auteur, logiciel]
---

# Skill - Saisie contrefacon V2

> **Mesure probatoire stricte, pas contentieux global.**
> `saisie-contrefacon` sert a preparer une requete de saisie-contrefacon, le
> perimetre des operations, les instructions d'execution, la gestion du secret
> des affaires et les suites immediates post-saisie. Il ne depose pas la
> requete, ne remplace pas l'avocat ni le commissaire de justice, et ne pilote
> pas seul la strategie contentieuse globale.

Reference de travail utile :
`references/saisie-contrefacon-routing-and-output.md`

## Positionnement

`saisie-contrefacon` V2 est un skill de **preparation stricte de mesure
probatoire**.

Il sert a :

1. qualifier le `rights_track` applicable ;
2. verifier si une saisie est proceduralement exploitable ;
3. structurer le projet de requete ;
4. cadrer le perimetre de saisie ;
5. preparer les instructions d'execution ;
6. borner les suites immediates apres execution.

Il ne sert pas a :

- deposer la requete ;
- piloter seul le contentieux global ;
- faire une defense de nullite ;
- rediger une mise en demeure ;
- se substituer a l'analyse au fond de la contrefacon.

## Ce skill ne fait pas

- Ne depose pas la requete.
- Ne remplace pas `contentieux-pi`.
- Ne remplace pas `mise-en-demeure-pi`.
- Ne remplace pas `tableau-contrefacon-brevet`.
- Ne remplace pas `contrefacon-droit-auteur`.
- Ne remplace pas `contrefacon-dessin-modele`.
- Ne remplace pas l'avocat ou le commissaire de justice.

## Chargement du profil

Avant tout, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Rattacher ensuite :

- l'avocat PI referent ;
- le commissaire de justice habituel ;
- l'expert technique habituel ;
- le budget indicatif de saisie ;
- le role utilisateur courant ;
- les approbateurs proceduraux.

Si le profil contient `[A CONFIGURER]`, le skill peut fonctionner en mode
generique, mais chaque sortie doit etre marquee `[PROVISOIRE]`.

## Contrat d'entree V2

Le skill doit expliciter ou deriver :

- `rights_track`: `patent`, `trademark`, `design`, `copyright`,
  `software`, `mixed`
- `title_status`: `valid`, `uncertain`, `blocked`
- `proof_posture`: `strong`, `mixed`, `weak`, `none`
- `target_location_status`: `identified`, `partial`, `unknown`
- `seizure_scope`: `descriptive`, `real`, `documents`, `internet`, `mixed`,
  `unclear`
- `execution_urgency`: `routine`, `heightened`, `critical`, `unclear`
- `trade_secret_risk`: `low`, `medium`, `high`, `unclear`
- `post_seizure_readiness`: `ready`, `partial`, `blocked`

Bloc de faits minimum :

- `right_invoked`
- `title_reference`
- `title_validity_status`
- `suspected_infringer`
- `target_locations`
- `suspected_acts`
- `available_pre_evidence`
- `requested_seizure_type`
- `expert_need`
- `urgency_context`
- `expected_court`

## Seizure Readiness Gate

Le skill doit evaluer un `Seizure Readiness Gate`.

Statuts :

- `ready`
- `partial`
- `blocked`

Passer en `ready` si :

- le titre ou fondement est exploitable ;
- un commencement de preuve existe ;
- les lieux ou cibles de saisie sont identifiables ;
- le perimetre de mesure peut etre formule proprement ;
- le calendrier post-saisie est tenable.

Passer en `partial` si :

- la saisie reste envisageable ;
- mais certains points critiques doivent etre confirms ou tags
  `[a verifier]`.

Passer en `blocked` si :

- le titre est trop incertain ;
- le commencement de preuve est trop faible ;
- les lieux ou objets ne sont pas localisables ;
- la mesure serait disproportionnee ou proceduralement mal fondee.

En `blocked`, produire un constat de blocage et une suite de preparation, pas
une pseudo-requete.

## Rights Track Notes

### `patent`

- base legale principale : `L.615-5 CPI`
- expert technique frequemment necessaire ;
- saisie reelle souvent pertinente ;
- attention a la technicite du perimetre et aux variantes.

### `trademark`

- base legale principale : `L.716-7 CPI`
- saisie internet frequente ;
- achat-test souvent meilleur commencement de preuve ;
- documenter signes, confusion, emballages et flux commerciaux.

### `design`

- base legale principale : `L.521-4 CPI`
- la description visuelle est centrale ;
- bien cadrer l'impression d'ensemble et les angles utiles ;
- attention au DMCNE si pertinent.

### `copyright`

- base legale principale : `L.332-1 CPI`
- pas de titre enregistre obligatoire ;
- verifier paternite, originalite et date ;
- la preuve initiale doit etre particulierement soignee.

### `software`

- base legale principale : `L.332-4 CPI`
- expert informatique requis si copie de code ou environnement technique ;
- bien separer saisie du code, des logs, des binaires, des depots et des
  documents d'exploitation ;
- attention accrue au secret des affaires.

### `mixed`

- expliciter les droits cumules ;
- ne pas fusionner les fondements sans les distinguer ;
- borner le perimetre de chaque mesure demandee.

## Sortie V2

La sortie doit etre stabilisee en 9 blocs.

### 1. `Case Snapshot`

- droit invoque ;
- titre ;
- cible ;
- actes suspectes ;
- urgence.

### 2. `Seizure Readiness Gate`

- `ready` / `partial` / `blocked`
- raison simple ;
- niveau d'exploitabilite de la mesure.

### 3. `Rights Track And Legal Basis`

- base legale par droit ;
- specificite du track ;
- conditions particulieres.

### 4. `Proposed Seizure Scope`

- type de saisie ;
- locaux / objets / supports vises ;
- perimetre recommande ;
- points a exclure.

### 5. `Evidence And Proportionality`

- commencement de preuve ;
- adequation de la mesure ;
- limites de proportionalite ;
- points faibles.

### 6. `Trade Secret And Execution Constraints`

- secret des affaires ;
- scelles ;
- expert ;
- execution pratique ;
- points de friction previsibles.

### 7. `Drafting And Execution Pack`

- structure de requete ;
- instructions commissaire de justice ;
- pieces a joindre ;
- personnes a mobiliser ;
- rappel du delai 20 jours ouvrables / 31 jours civils.

### 8. `Decision Routing`

Le skill doit borner ses suites a un jeu ferme :

- `prepare-filing-pack`
- `prepare-execution-pack`
- `prepare-post-seizure-assignment`
- `prepare-evidence-hardening`
- `route-to-substantive-infringement-review`
- `hold-insufficient-basis`

Handoffs obligatoires :

- `prepare-filing-pack` : pack pour depot par l'avocat constitue
- `prepare-execution-pack` : pack operationnel pour commissaire de justice
- `prepare-post-seizure-assignment` : routage vers `contentieux-pi`
- `prepare-evidence-hardening` : consolidation du commencement de preuve avant
  nouvelle tentative
- `route-to-substantive-infringement-review` : routage vers
  `tableau-contrefacon-brevet`, `contrefacon-droit-auteur` ou
  `contrefacon-dessin-modele` selon le `rights_track`
- `hold-insufficient-basis` : pas de pseudo-requete, blocage explicite

### 9. `Human Validation`

- validation avocat obligatoire ;
- coordination commissaire de justice ;
- revue des delais post-saisie ;
- verification humaine finale ;
- rappel obligatoire : brouillon, pas acte de procedure final.

## Drafting And Execution Pack

Le skill doit pouvoir produire un pack de travail contenant au minimum :

- un projet de requete structure ;
- les mesures sollicitees ;
- les locaux vises ;
- les pieces jointes attendues ;
- les instructions d'execution ;
- les points de vigilance (secret, proportionnalite, resistance, scelles).

Rappel obligatoire :

- brouillon, pas acte final ;
- validation avocat obligatoire ;
- execution par commissaire de justice ;
- delai critique post-saisie.

## Post-Seizure Constraints

Le skill doit rappeler :

- assignation au fond dans les `20 jours ouvrables` ou `31 jours civils`
  suivant l'execution ;
- risque de mainlevee et nullite des preuves en cas de non-respect ;
- risque de retractation si preuve ou perimetre insuffisants ;
- gestion des scelles et du secret des affaires si contestation.

## Boundary Rules

- `tri-contrefacon` : intake enforcement initial
- `mise-en-demeure-pi` : lettre et posture precontentieuse
- `contentieux-pi` : strategie judiciaire globale
- `tableau-contrefacon-brevet` : claim chart offensif brevet
- `contrefacon-droit-auteur` : analyse de fond auteur
- `contrefacon-dessin-modele` : analyse de fond D&M

## Emplacement des sorties

Ecrire les livrables dans :

`~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/`

Format attendu :

- `saisie-contrefacon-<affaire-slug>-YYYY-MM-DD.md`

## Style de sortie

- Procedural, precis, urgent.
- Distinguer faits, base legale, perimetre, contraintes, routing et
  validation humaine.
- Utiliser `[a verifier]` pour toute donnee non recoupee.
- Utiliser `[PROVISOIRE]` si le profil est incomplet.
- Ne jamais presenter la requete comme un acte de procedure depose.
