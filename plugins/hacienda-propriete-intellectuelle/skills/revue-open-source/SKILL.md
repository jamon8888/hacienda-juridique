---
name: revue-open-source
version: "2.0.0"
description: Audit OSS opérationnel à partir d'un inventaire fourni pour qualifier licences, conflits et obligations de conformité.
argument-hint: "[SBOM | liste de dépendances | repository ou manifest | policy interne]"
---

# Revue Open Source

> **Audit OSS opérationnel, pas scanner autonome.** Ce skill analyse un
> inventaire fourni par l'utilisateur ou produit par un outil externe. Il ne
> prétend pas découvrir seul toutes les dépendances du dépôt, ni certifier
> l'exhaustivité d'un repository sans SBOM, manifest ou liste de composants.

## Rôle

Produire un audit open source opérationnel centré sur :

- l'inventaire des licences déclarées ou identifiées à partir des données
  fournies ;
- les conflits entre licences, mode d'intégration et policy interne ;
- les obligations de notice, attribution, fourniture de source ou de
  modifications ;
- les priorités de remédiation pour les composants incompatibles, inconnus ou
  mal qualifiés.

## Ne fait pas

- Ne scanne pas automatiquement le code, l'historique Git ou les registres de
  packages.
- Ne remplace pas un outil SCA ou SBOM externe.
- Ne tranche pas à lui seul une question finale de conseil juridique ou de
  stratégie contentieuse.
- Ne couvre pas la chaîne complète de titularité du code, des contributions ou
  des datasets ; ce sujet relève de `revue-logiciel-donnees` et de
  `logiciels-pi` selon le cas.

## Cadrage initial

Demander et distinguer explicitement les entrées disponibles :

- **SBOM** : CycloneDX, SPDX, export SCA ou tableau équivalent.
- **Liste de dépendances** : packages, versions, composants embarqués,
  librairies front/back, images, snippets ou forks identifiés.
- **Repository ou manifest** : `package.json`, `pom.xml`, `requirements.txt`,
  `go.mod`, `Cargo.toml`, image Docker, mono-repo, sous-modules ou dossier
  fournisseur.
- **Policy interne** : liste verte/noire, seuils de copyleft, contraintes SaaS,
  exigences notice/source, process d'approbation.

Si une entrée manque, l'indiquer comme telle au lieu d'inventer un inventaire.
Toujours séparer :

- **Inventaire fourni**
- **Hypothèses de qualification**
- **Composants au statut `non identifié`**

## Mode d'analyse

1. Lire les données fournies sans supposer qu'elles sont complètes.
2. Associer chaque composant à une licence primaire, à une source de
   vérification et à un niveau de confiance.
3. Qualifier le type de licence : permissive, copyleft faible, copyleft fort,
   source-available ou inconnue.
4. Évaluer l'usage déclaré : build, développement, exécution, distribution,
   embarqué, on-prem, SaaS.
5. Comparer les composants et usages à la policy interne.
6. Escalader tout composant au statut `non identifié`, licence contradictoire, copyleft
   sensible ou dépendance critique sans source fiable.

Le skill peut recommander des outils SCA ou SBOM pour compléter l'analyse, par
exemple Snyk, FOSSA, Black Duck, OWASP Dependency-Check, Syft ou un export
CycloneDX/SPDX, mais ne se présente jamais comme leur substitut.

## Sorties

Le livrable doit toujours contenir ces quatre blocs nommés :

### Inventaire des licences

Tableau minimal :

| Composant | Version | Licence | Source | Usage | Confiance | Statut |
| --- | --- | --- | --- | --- | --- | --- |

Ajouter le tag `[à vérifier]` quand la licence, la version ou la source
primaire ne sont pas confirmées. Utiliser `non identifié` comme valeur de
statut quand le composant lui-même, sa version ou son rattachement restent
indéterminés.

### Matrice de conflits

Croiser :

- type de licence ;
- mode d'utilisation ;
- policy interne ;
- niveau de risque ;
- raison du conflit ou de l'absence de conflit.

Faire apparaître distinctement :

- permissif compatible ;
- copyleft faible sous conditions ;
- copyleft fort ou AGPL à escalader ;
- licence inconnue ou composant au statut `non identifié`.

### Obligations

Lister, pour chaque composant ou groupe homogène :

- notice et attribution ;
- conservation des textes de licence ;
- mise à disposition du code source ou des modifications ;
- obligations de redistribution ;
- vigilance particulière AGPL en contexte SaaS ;
- obligations non concluables faute d'information suffisante.

### Plan de remédiation

Prioriser :

1. compléter l'inventaire manquant ;
2. vérifier les licences douteuses ;
3. remplacer, isoler ou approuver les composants bloquants ;
4. mettre à jour notices, bundles licence et process internes ;
5. déclencher revue humaine juridique/engineering si la policy ne permet pas de
   conclure.

## Validation humaine

Toujours conclure par :

- ce qui repose sur un inventaire effectivement fourni ;
- ce qui reste hypothétique ;
- les composants au statut `non identifié` ou encore `[à vérifier]` ;
- les points qui exigent validation humaine, notamment en cas d'AGPL, de
  copyleft fort, de dual licensing, de source-available ou de conflit policy.
