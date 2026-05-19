# Spec - logiciels-pi V2

## Summary

`logiciels-pi` reste le point d'entree public pour le regime juridique d'un
 logiciel sous droit d'auteur francais. Le skill garde la substance sur
 `L.113-9`, `L.122-6` et `L.122-6-1`, mais passe d'un memo lineaire a une
 structure V2 centree sur :

- la titularite initiale du logiciel ;
- le mode d'exploitation ;
- le triage OSS de haut niveau ;
- les handoffs vers les skills specialises.

## Problem

Le skill couvre aujourd'hui plusieurs sujets a la fois :

- regime de titularite ;
- droits d'utilisation ;
- triage OSS ;
- alerte SaaS / datasets / bases ;
- recommandations startup / agence / open source / SaaS.

Le fond est bon, mais le contrat d'entree, le routage et la sortie ne sont pas
 encore assez stables pour une brique V2.

## Goals

1. Garder `logiciels-pi` comme entree unique de regime logiciel.
2. Rendre explicites les cas de bascule vers :
   - `revue-open-source`
   - `revue-logiciel-donnees`
   - `cession-droit-auteur`
   - `licence-droit-auteur`
   - `contrefacon-droit-auteur`
3. Stabiliser un contrat de sortie reutilisable en startup, agence, open
   source et SaaS mixed.

## Non-Goals

- Ne pas faire d'inventaire OSS composant par composant.
- Ne pas faire une revue complete de chaine de droits data.
- Ne pas rediger la cession ou la licence.
- Ne pas traiter la contrefacon logicielle contradictoire.

## Input Contract

Le skill doit expliciter :

- `development_model`: `internal-employees`, `external-vendors`,
  `mixed-team`, `open-source-community`, `founder-pre-incorporation`,
  `unclear`
- `distribution_model`: `internal-use`, `proprietary-license`, `saas`,
  `open-source`, `dual-licensing`, `mixed`
- `oss_posture`: `minimal`, `known-dependencies`, `sbom-available`,
  `copyleft-risk`, `unknown`

Champs de faits a exposer ensuite :

- `project_scope`
- `contributors_and_contracts`
- `software_status`
- `dependencies_overview`
- `business_trigger`

## Routing Boundaries

### Route to `revue-open-source`

Si le besoin principal devient :

- inventaire detaille ;
- obligations notice/source ;
- matrice de conflits ;
- SBOM ;
- plan de remediation OSS.

### Route to `revue-logiciel-donnees`

Si le besoin principal devient :

- chaine de droits sur code, dataset, base, repo, founders, freelancers ;
- preuves contractuelles de transfert ;
- exploitabilite data ou base.

### Route to `cession-droit-auteur`

Si la question devient la cession des droits sur le logiciel ou ses modules.

### Route to `licence-droit-auteur`

Si la question devient le choix ou la redaction de licence proprietaire,
 open source ou dual licensing.

### Route to `contrefacon-droit-auteur`

Si la question dominante devient contradictoire :

- reprise de code ;
- acces ;
- similitudes ;
- action ou defense en contrefacon logicielle.

## Output Contract

Le skill doit produire 9 blocs stables :

1. `Software Regime Snapshot`
2. `Facts and Contract Review`
3. `Initial Ownership Map`
4. `Use Rights and Statutory Exceptions`
5. `OSS Triage Gate`
6. `SaaS, Data and Database Signals`
7. `Business-Model Risks`
8. `Next Step Routing`
9. `Human Validation`

## Next Step Routing Values

- `document-and-monitor`
- `secure-assignment-first`
- `review-oss-operationally`
- `clarify-data-chain`
- `draft-assignment`
- `draft-license`
- `prepare-software-enforcement`
- `insufficient-record`

## Files

- Modify:
  - `plugins/hacienda-propriete-intellectuelle/skills/logiciels-pi/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/README.md`
  - `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
- Create:
  - `plugins/hacienda-propriete-intellectuelle/skills/logiciels-pi/references/logiciels-pi-routing-and-output.md`

