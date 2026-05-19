---
title: Contentieux PI V2
status: proposed
owner: Hacienda
date: 2026-05-19
---

# Contentieux PI V2

## Summary

Faire evoluer `contentieux-pi` d'un skill contentieux large melangeant encore
du precontentieux et de la strategie judiciaire vers un skill **judiciaire
strict**, aligne sur les nouveaux orchestrateurs du plugin.

Le skill V2 doit :

- commencer la ou `strategie-defense-pi`, `tri-contrefacon`,
  `mise-en-demeure-pi` et `depot-preuve-creation` s'arretent ;
- assumer uniquement la strategie judiciaire, le pilotage procedurale et les
  choix de voie de recours ou d'action ;
- normaliser les sorties par type de contentieux et par posture
  `attack` / `defense` ;
- maintenir un format exploitable pour avocat, direction et suivi d'affaire.

## Contexte

Le skill actuel `contentieux-pi` est doctrinalement solide, mais il reste
structurellement old-generation.

Il couvre aujourd'hui dans un meme flux :

- qualification de l'action ;
- recevabilite ;
- strategie procedurale ;
- estimation cout/duree ;
- calcul du prejudice ;
- tracker multi-affaires ;
- go/no-go ;
- et encore des branches transaction / mise en demeure / mediation.

Depuis, le plugin a evolue :

- `tri-contrefacon` couvre l'intake enforcement marques ;
- `mise-en-demeure-pi` couvre la lettre PI ;
- `strategie-defense-pi` couvre le cadrage defensif et le routage ;
- `depot-preuve-creation` couvre le registre probatoire.

Le vrai probleme de `contentieux-pi` n'est donc pas le fond, mais le fait qu'il
ne respecte pas encore ces nouvelles frontieres.

## Goals

1. Faire de `contentieux-pi` le point d'entree **judiciaire** du plugin PI.
2. Sortir du skill tout ce qui releve du precontentieux simple.
3. Stabiliser un contrat d'entree fonde sur :
   - stade procedurale ;
   - voie choisie ou envisagee ;
   - droit PI concerne ;
   - posture `attack` ou `defense`.
4. Stabiliser des sorties directement reutilisables par :
   - avocat contentieux ;
   - direction ;
   - suivi de dossier ;
   - dossier de pilotage interne.
5. Rendre les dependances avec les skills amont explicites.

## Non-Goals

1. Ne pas rediger les actes de procedure eux-memes.
2. Ne pas refaire la collecte probatoire de base.
3. Ne pas rediger une simple mise en demeure ou une reponse precontentieuse.
4. Ne pas faire de `contentieux-pi` un meta-orchestrateur de tout l'enforcement.
5. Ne pas couvrir les procedures administratives INPI ou EUIPO qui ont deja
   leur propre logique, sauf quand un vrai recours juridictionnel prend le
   relais.

## Product Positioning

`contentieux-pi` V2 devient le skill de :

- strategie judiciaire ;
- choix de voie procedurale ;
- sequencing des demandes et moyens ;
- estimation budget / duree / risque ;
- tracker affaire ;
- decision memo go / no-go / settle / appeal.

Il ne devient plus le skill pour :

- savoir s'il faut repondre a une lettre ;
- collecter les premieres pieces ;
- faire un triage initial faible ;
- preparer une simple negociation de sortie.

## Approaches Considered

### 1. Garder un skill mixte judiciaire + precontentieux avance

Conserver mediation, transaction et mise en demeure dans `contentieux-pi`.

- Avantage : surface unique plus large.
- Inconvenient : overlap direct avec les skills deja refondus.

### 2. Skill judiciaire strict

Recentrer `contentieux-pi` sur la strategie judiciaire et le suivi procedurale.

- Avantage : architecture plus propre et frontieres nettes.
- Inconvenient : demande plus de discipline de routage.

### 3. Scinder tout de suite en plusieurs skills

Exemples :

- `contentieux-marques`
- `contentieux-brevets`
- `contentieux-auteur`
- `contentieux-dm`

- Avantage : specialisation maximale.
- Inconvenient : trop tot, trop couteux, risque de duplication.

### Decision

Retenir **l'approche 2**.

## Target Skill Contract

### Name

Le nom reste `contentieux-pi`.

### Scope Trigger

Utiliser `contentieux-pi` quand au moins un de ces signaux est vrai :

1. assignation deja recue ou preparee ;
2. refere envisage ou deja lance ;
3. procedure au fond deja decidee ou quasi decidee ;
4. recours contre decision deja dans la fenetre procedurale ;
5. besoin d'un pilotage judiciaire, budgetaire et calendrier d'affaire.

Si ces signaux ne sont pas reunis, router d'abord vers un skill amont.

### Required Inputs

Le skill exige au minimum :

1. `mode`
   - `attack`
   - `defense`
2. `contentious_track`
   - `brevet-infringement`
   - `marque-infringement`
   - `dm-infringement`
   - `copyright-infringement`
   - `nullity-revocation`
   - `unfair-competition`
   - `appeal`
3. `procedure_stage`
   - `pre-filing`
   - `urgent-relief`
   - `on-the-merits`
   - `pending-case`
   - `appeal-window`
   - `appeal-ongoing`
4. `rights_at_issue`
5. `parties`
6. `forum`
7. `known_facts`
8. `evidence_status`
9. `business_objective`

Complements utiles :

- urgence business ;
- budget disponible ;
- portefeuille ou titres relies ;
- risques reconventionnels connus ;
- calendrier externe (salon, lancement, closing, presse).

## Routing Boundaries

### Route to `tri-contrefacon`

Quand le dossier est encore un signal d'atteinte, une suspicion ou un intake
enforcement sans decision procedurale.

### Route to `mise-en-demeure-pi`

Quand l'action immediate attendue est une lettre offensive ou reponse
precontentieuse, sans besoin d'un pilotage judiciaire complet.

### Route to `depot-preuve-creation`

Quand la base probatoire reste trop faible pour soutenir une decision
judiciaire serieuse.

### Route to `strategie-defense-pi`

Quand il faut d'abord cadrer une posture defensive, decider s'il faut repondre,
contester, temporiser ou escalader.

### Stay in `contentieux-pi`

Quand le dossier a deja bascule dans une logique judiciaire ou quasi
judiciaire, ou quand la direction demande une strategie contentieuse formelle.

## Contentious Tracks

### `brevet-infringement`

Couvre :

- action en contrefacon brevet ;
- refere-interdiction brevet ;
- defense a action brevet ;
- articulation avec nullite reconventionnelle.

Enjeux dominants :

- competence TJ Paris ;
- validite du titre ;
- equivalence / technique ;
- expert judiciaire ;
- prejudice.

### `marque-infringement`

Couvre :

- action en contrefacon marque ;
- refere marque ;
- defense marque ;
- decheance / nullite reconventionnelle ;
- tolerance 5 ans.

Enjeux dominants :

- risque de confusion ;
- usage serieux ;
- territoire ;
- forclusion par tolerance ;
- prejudice et banalisation.

### `dm-infringement`

Couvre :

- contrefacon dessins et modeles ;
- defense DM ;
- articulation impression globale / titres / cumul.

### `copyright-infringement`

Couvre :

- action contrefacon auteur ;
- defense auteur ;
- articulation originalite / titularite / preuve date.

### `nullity-revocation`

Couvre :

- nullite de brevet ;
- nullite de marque ;
- decheance marque ;
- dossier principal oriente vers la destruction du titre.

### `unfair-competition`

Couvre :

- concurrence deloyale ;
- parasitisme ;
- cumul ou subsidiaire au titre PI.

### `appeal`

Couvre :

- recours contre decisions deja intervenues ;
- analyse delai / interet / posture / cout / probabilite.

## Procedure Stages

### `pre-filing`

Le contentieux est decide ou presque, mais l'assignation n'est pas encore
partie. Le skill prepare la logique contentieuse, pas la lettre.

### `urgent-relief`

Le sujet principal est un refere, une mesure provisoire ou une urgence
equivalente.

### `on-the-merits`

La voie principale est l'action au fond.

### `pending-case`

La procedure est deja ouverte et il faut piloter le dossier, les echeances, le
budget ou les choix tactiques.

### `appeal-window`

Une decision existe et la fenetre de recours est ouverte.

### `appeal-ongoing`

Le recours est deja engage et le pilotage doit continuer.

## Output Contract

### Common Output Rules

Toute sortie doit distinguer :

1. faits etablis ;
2. allegations ou hypotheses ;
3. pieces consultees ;
4. pieces manquantes ;
5. risques proceduraux ;
6. risques business ;
7. validation humaine obligatoire.

### Output Blocks

Le skill doit toujours produire exactement les huit blocs suivants :

1. `Case Snapshot`
2. `Forum and Admissibility`
3. `Claims and Defenses Map`
4. `Evidence and Proof Gaps`
5. `Procedural Strategy`
6. `Budget Timing and Exposure`
7. `Decision Memo`
8. `Human Validation`

## Track-Specific Expectations

### Attack

Le `Decision Memo` doit arbitrer entre :

- go ;
- go conditionnel ;
- settle first ;
- no-go.

### Defense

Le `Decision Memo` doit arbitrer entre :

- contest and defend ;
- defend and negotiate ;
- challenge title ;
- contain and settle ;
- no-substantive-response-at-this-stage.

### Appeal

Le `Decision Memo` doit arbitrer entre :

- appeal ;
- appeal if conditions met ;
- no appeal ;
- negotiate instead.

## Tracker Model

Le bloc `Budget Timing and Exposure` peut inclure un mini tracker standardise :

- affaire ;
- track ;
- stade ;
- prochaine echeance ;
- responsable ;
- budget consomme / restant ;
- risque global ;
- decision a venir.

Ce tracker reste un livrable texte, pas un dashboard obligatoire dans ce lot.

## Error Handling and Guardrails

Le skill doit se limiter si un bloc critique manque :

- forum non identifie ;
- titre ou droit invoque flou ;
- pieces probatoires trop faibles ;
- stade procedurale incertain ;
- objectif business non clarifie ;
- calendrier ou urgence inconnus alors qu'ils conditionnent le choix.

Dans ces cas :

1. expliciter l'hypothese ;
2. marquer `[a verifier]` ;
3. reduire les recommandations offensives ou irreversibles ;
4. router en amont si le dossier n'est pas encore contentieux en realite.

## Documentation Impact

Le lot V2 devra realigner :

- `plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/README.md`
- `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

Il devra aussi verifier que les renvois depuis :

- `analyse-opposition-marque`
- `analyse-refus-inpi`
- `tableau-contrefacon-brevet`
- `strategie-defense-pi`

restent coherents avec le nouveau positionnement.

## Testing Strategy

La verification visera :

1. coherence du nouveau scope judiciaire strict ;
2. presence des `contentious_track` et `procedure_stage` ;
3. presence des huit blocs de sortie ;
4. README / changelog alignes ;
5. repo verification standard :
   - `npm test`
   - `npm run typecheck`
   - `npm run build`
   - `npm run branding:check`
   - `git diff --check`

## Risks

1. **Boundary drift** : le skill re-absorbe le precontentieux.
2. **Under-scoping** : la version V2 devient trop abstraite pour etre utile.
3. **Track confusion** : trop de variantes sans contrat stable.
4. **Broken references** : les skills voisins continuent de le presenter comme
   skill mixte.

## Decision Summary

`contentieux-pi` V2 doit devenir un skill **judiciaire strict**, branche par
`contentious_track` et `procedure_stage`, aligne avec les orchestrateurs
amont deja introduits dans le plugin PI.
