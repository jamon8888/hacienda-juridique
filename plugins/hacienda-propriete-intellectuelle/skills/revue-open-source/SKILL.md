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

## Examples

<example>
<user>/h-pi:revue-open-source [SBOM | liste de dépendances | repository ou manifest | policy interne]</user>
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

## Mode Anno Desktop Optionnel

Si Anno Desktop est disponible, l'utiliser seulement pour rechercher dans les
SBOM, exports SCA, policies internes, manifests et dossiers de remédiation déjà
fournis ou ingérés. Appeler `anno_health` avant tout outil Anno ; si le moteur
est indisponible, poursuivre en mode Hacienda.

Règles spécifiques :

- appeler `detect` ou appliquer une gestion PII Anno équivalente avant toute
  pièce client ou policy interne ;
- utiliser `legal_search` pour retrouver les composants, notices, exceptions
  et décisions internes déjà ingérés ;
- utiliser `legal_risk_review` pour prioriser les conflits de licences et
  obligations ;
- utiliser `legal_graph_query` pour relier composants, produits, usages,
  owners et décisions de remédiation ;
- ne jamais présenter Anno comme scanner SCA autonome.

Tout résultat Anno est une source interne Anno, jamais comme source primaire.
Les licences, notices et sources officielles doivent rester vérifiées via
`hacienda-sources-officielles`, les registres de packages ou les pièces
fournies.

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Propriété Intellectuelle` est disponible. Ne pas inventer de tool hors périmètre ; si une source ou un registre n'a pas été consulté directement, garder `[à vérifier]`.

- Socle textes, jurisprudence et droit UE : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Dessins et modèles, droit d'auteur, logiciels, bases de données et droits voisins : utiliser le socle officiel ci-dessus ; les registres spécialisés non exposés par le serveur restent `[à vérifier]` ou traités via preuve/document client autorisé.
- Anno, quand disponible, reste une source interne de dossier : jamais un registre officiel INPI, EUIPO, OEB, OMPI ou BOPI.

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/` ou `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`.

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

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

## Mode Anno Tabular optionnel

Si la distribution Hacienda + Anno Desktop est active, `revue-open-source`
utilise Anno pour relier localement SBOM, notices, contrats et pièces, jamais
comme source primaire et jamais comme scanner SCA autonome. Appeler
`anno_health` avant tout outil Anno ; si Anno est indisponible, poursuivre en
`fallback_hacienda`.

Le dossier doit être borné par le `matter_vault` et le `workflow_blueprint`
`oss-obligations-review-v1`. Utiliser `legal_search`, `legal_risk_review`,
`legal_graph_query` et une revue tabulaire avec `tabular_review_create` pour
suivre composant, version, licence, usage, obligation, conflit, remédiation et
validation. Les composants critiques doivent porter `review_status`,
`decision_status`, responsable, action, échéance et `validation_status`.

Utiliser `grid_to_work_product` pour générer une note OSS ou une annexe de
remédiation depuis les cellules validées. Tout passage Anno reste une source
interne Anno, jamais comme source primaire ; les sources officielles et registres
restent vérifiés via `hacienda-sources-officielles`. Les composants non
identifiés ou non validés restent `[à vérifier]`.
