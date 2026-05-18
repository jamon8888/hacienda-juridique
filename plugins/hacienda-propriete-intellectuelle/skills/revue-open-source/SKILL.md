---
name: revue-open-source
description: Audit OSS operationnel a partir d'un inventaire fourni pour qualifier licences, conflits et obligations de conformite.
argument-hint: "[SBOM | liste de dependances | repository ou manifest | policy interne]"
---

# Revue Open Source

> **Audit OSS operationnel, pas scanner autonome.** Ce skill analyse un
> inventaire fourni par l'utilisateur ou produit par un outil externe. Il ne
> pretend pas decouvrir seul toutes les dependances du depot, ni certifier
> l'exhaustivite d'un repository sans SBOM, manifest ou liste de composants.

## Role

Produire un audit open source operationnel centre sur :

- l'inventaire des licences declarees ou identifiees a partir des donnees
  fournies ;
- les conflits entre licences, mode d'integration et policy interne ;
- les obligations de notice, attribution, fourniture de source ou de
  modifications ;
- les priorites de remediation pour les composants incompatibles, inconnus ou
  mal qualifies.

## Ne fait pas

- Ne scanne pas automatiquement le code, l'historique Git ou les registres de
  packages.
- Ne remplace pas un outil SCA ou SBOM externe.
- Ne tranche pas a lui seul une question finale de conseil juridique ou de
  strategie contentieuse.
- Ne couvre pas la chaine complete de titularite du code, des contributions ou
  des datasets ; ce sujet releve de `revue-logiciel-donnees` et de
  `logiciels-pi` selon le cas.

## Intake

Demander et distinguer explicitement les entrees disponibles :

- **SBOM** : CycloneDX, SPDX, export SCA ou tableau equivalent.
- **Liste de dependances** : packages, versions, composants embarques,
  librairies front/back, images, snippets ou forks identifies.
- **Repository ou manifest** : `package.json`, `pom.xml`, `requirements.txt`,
  `go.mod`, `Cargo.toml`, image Docker, mono-repo, sous-modules ou dossier
  fournisseur.
- **Policy interne** : liste verte/noire, seuils de copyleft, contraintes SaaS,
  exigences notice/source, process d'approbation.

Si une entree manque, l'indiquer comme telle au lieu d'inventer un inventaire.
Toujours separer :

- **Inventaire fourni**
- **Hypotheses de qualification**
- **Composants au statut `non identifie`**

## Mode d'analyse

1. Lire les donnees fournies sans supposer qu'elles sont completes.
2. Associer chaque composant a une licence primaire, a une source de
   verification et a un niveau de confiance.
3. Qualifier le type de licence : permissive, copyleft faible, copyleft fort,
   source-available ou inconnue.
4. Evaluer l'usage declare : build, developpement, runtime, distribution,
   embarque, on-prem, SaaS.
5. Comparer les composants et usages a la policy interne.
6. Escalader tout composant au statut `non identifie`, licence contradictoire, copyleft
   sensible ou dependance critique sans source fiable.

Le skill peut recommander des outils SCA ou SBOM pour completer l'analyse, par
exemple Snyk, FOSSA, Black Duck, OWASP Dependency-Check, Syft ou un export
CycloneDX/SPDX, mais ne se presente jamais comme leur substitut.

## Sorties

Le livrable doit toujours contenir ces quatre blocs nommes :

### License Inventory

Tableau minimal :

| Composant | Version | Licence | Source | Usage | Confiance | Statut |
| --- | --- | --- | --- | --- | --- | --- |

Ajouter le tag `[a verifier]` quand la licence, la version ou la source
primaire ne sont pas confirmees. Utiliser `non identifie` comme valeur de
statut quand le composant lui-meme, sa version ou son rattachement restent
indeterminés.

### Conflict Matrix

Croiser :

- type de licence ;
- mode d'utilisation ;
- policy interne ;
- niveau de risque ;
- raison du conflit ou de l'absence de conflit.

Faire apparaitre distinctement :

- permissif compatible ;
- copyleft faible sous conditions ;
- copyleft fort ou AGPL a escalader ;
- licence inconnue ou composant au statut `non identifie`.

### Obligations

Lister, pour chaque composant ou groupe homogène :

- notice et attribution ;
- conservation des textes de licence ;
- mise a disposition du code source ou des modifications ;
- obligations de redistribution ;
- vigilance particuliere AGPL en contexte SaaS ;
- obligations non concluables faute d'information suffisante.

### Remediation Plan

Prioriser :

1. completer l'inventaire manquant ;
2. verifier les licences douteuses ;
3. remplacer, isoler ou approuver les composants bloquants ;
4. mettre a jour notices, bundles licence et process internes ;
5. declencher revue humaine juridique/engineering si la policy ne permet pas de
   conclure.

## Validation humaine

Toujours conclure par :

- ce qui repose sur un inventaire effectivement fourni ;
- ce qui reste hypothétique ;
- les composants au statut `non identifie` ou encore `[a verifier]` ;
- les points qui exigent validation humaine, notamment en cas d'AGPL, de
  copyleft fort, de dual licensing, de source-available ou de conflit policy.
