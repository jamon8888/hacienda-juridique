# Spec - qualification-oeuvre V2

## Summary

`qualification-oeuvre` reste le point d'entree public du bloc droit d'auteur
 pour la qualification d'une creation au regard du CPI Livre I. Le skill garde
 sa profondeur doctrinale, mais passe d'un grand memo lineaire a une structure
 V2 a contrat d'entree et de sortie plus net, avec des frontieres explicites
 vers `revue-logiciel-donnees`, `depot-preuve-creation`,
 `cession-droit-auteur`, `licence-droit-auteur` et
 `contrefacon-droit-auteur`.

## Problem

Le skill est riche sur le fond mais reste difficile a piloter comme brique
 standard du plugin :

- intake tres long mais peu normalise ;
- logique de routage deja presente, mais diffuse dans plusieurs sections ;
- sortie utile, mais sans blocs stables faciles a relire ou a reutiliser ;
- overlap encore trop implicite avec les skills voisins.

## Goals

1. Garder `qualification-oeuvre` comme point d'entree unique pour la
   qualification droit d'auteur.
2. Rendre explicites les cas ou il faut basculer vers un autre skill.
3. Stabiliser un contrat de sortie V2 relisible, utilisable en preventif,
   defensif et preparation contentieuse.
4. Conserver les garde-fous forts : pas d'avis juridique final, pas de
   conclusion judiciaire definitive, validation humaine obligatoire.

## Non-Goals

- Ne pas scinder le skill en plusieurs skills publics.
- Ne pas reecrire toute la doctrine de fond.
- Ne pas transformer le skill en contrat, en analyse de contrefacon, ni en
  revue exhaustive de chaine de droits logiciel/data.

## V2 Positioning

`qualification-oeuvre` V2 devient le skill de :

- qualification d'originalite ;
- qualification de categorie d'oeuvre ;
- qualification de titularite initiale ;
- consequences de droits patrimoniaux / droit moral / duree ;
- calibration des risques selon l'objectif ;
- routage vers la brique specialisee suivante.

Il ne devient pas le skill de :

- preuve et bundle probatoire complets ;
- chaine de droits logiciel/data ;
- redaction de cession ou licence ;
- qualification contradictoire de la contrefacon.

## Input Contract

Le skill doit expliciter en tete de son intake :

- `objective_mode`: `preventive`, `defensive`, `litigation-prep`
- `work_type`: `text`, `image`, `music`, `audiovisual`, `software`,
  `database`, `design`, `mixed-media`, `other`
- `creation_context`: `single-author`, `collaboration`, `collective`,
  `composite`, `employee`, `commissioned`, `posthumous`, `unclear`

Champs de faits a exposer explicitement :

- `work_description`
- `creation_facts`
- `evidence_status`
- `suspected_category`
- `business_trigger`

Tout manque reste `[a verifier]`.

## Routing Boundaries

### Route to `revue-logiciel-donnees`

Si la question dominante porte d'abord sur :

- la titularite sur code, repo, dataset, base ou contributions ;
- les contributeurs, contrats, cessions, apports, founders ou freelancers ;
- la chaine de droits et l'exploitabilite d'un actif logiciel/data.

`qualification-oeuvre` peut alors rester limite a l'originalite ou a la
 qualification d'un composant, mais ne doit pas absorber la revue globale.

### Route to `depot-preuve-creation`

Si le vrai point bloquant est :

- la preuve de date ;
- la preuve de paternite ;
- la chronologie ;
- le registre de pieces ;
- le bundle probatoire ou les proof gaps.

### Route to `cession-droit-auteur`

Si la qualification est suffisante et que le besoin devient la cession.

### Route to `licence-droit-auteur`

Si la qualification est suffisante et que le besoin devient la licence.

### Route to `contrefacon-droit-auteur`

Si la question dominante devient contradictoire :

- reprise ;
- originalite opposee ;
- acces ;
- similitudes ;
- action ou defense en contrefacon.

## Output Contract

Le skill doit produire 9 blocs stables :

1. `Qualification Snapshot`
2. `Facts and Evidence Review`
3. `Originality Analysis`
4. `Category and Work-Type Map`
5. `Initial Ownership Map`
6. `Economic Rights, Moral Rights and Term`
7. `Objective-Specific Risks`
8. `Next Step Routing`
9. `Human Validation`

## Next Step Routing Contract

Le bloc `Next Step Routing` doit utiliser un jeu ferme de sorties :

- `hold-and-document`
- `secure-proof-first`
- `clarify-chain-of-title`
- `draft-assignment`
- `draft-license`
- `prepare-copyright-attack`
- `insufficient-record`

Puis expliquer le pourquoi et, si utile, le skill suivant.

## Human Validation

Le skill doit rappeler clairement :

- qu'il ne conclut jamais de facon definitive a l'existence ou a
  l'inexistence du droit d'auteur ;
- que toute source ou piece non lue reste `[a verifier]` ;
- que toute exploitation, cession, licence ou action impose validation
  humaine.

## Files

- Modify:
  - `plugins/hacienda-propriete-intellectuelle/skills/qualification-oeuvre/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/README.md`
  - `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
- Create:
  - `plugins/hacienda-propriete-intellectuelle/skills/qualification-oeuvre/references/qualification-oeuvre-routing-and-output.md`

