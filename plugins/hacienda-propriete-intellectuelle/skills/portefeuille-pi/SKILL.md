---
name: portefeuille-pi
version: "2.0.0"
description: Point d'entrée legacy en migration vers un hub fédéré de lecture consolidée du portefeuille PI.
argument-hint: "[overview | deadlines | risk-report | export]"
---

> **Legacy temporaire en migration vers un hub fédéré.** `portefeuille-pi`
> ne tient pas un registre propre et fonctionne comme point d'entrée
> provisoire de lecture consolidée. La cible V1 est un hub fédéré
> multi-actifs en lecture seule fondée sur `revue-portefeuille-marques` et
> `revue-portefeuille-brevets`. Si tu dois agir aujourd'hui, maintiens les
> actifs directement dans ces skills sources.

> **Bloc d'ouverture obligatoire avant toute vue consolidée.**
> **Registre interne, lecture seule, recoupement requis.** Toute sortie doit
> rappeler en tête que ce hub consolide uniquement des registres internes,
> qu'il fonctionne en lecture seule, et que tout élément sensible doit être
> recoupé avant décision avec les dossiers, pièces et sources utiles. Ce hub
> ne remplace ni un registre officiel, ni un dépôt officiel, ni une
> synchronisation officielle.

# Portefeuille PI

## Examples

<example>
<user>/h-pi:portefeuille-pi [overview | deadlines | risk-report | export]</user>
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

Si Anno Desktop est disponible, l'utiliser seulement pour consolider une lecture
locale de registres internes, dossiers et décisions déjà ingérés. Appeler
`anno_health` avant tout outil Anno ; en cas d'échec, poursuivre en mode
Hacienda.

Règles spécifiques :

- appeler `detect` ou appliquer une gestion PII Anno équivalente avant toute
  pièce ou registre client ;
- utiliser `legal_graph_query` pour relier actifs, titulaires, échéances,
  familles, licences, contentieux et responsables ;
- utiliser `memory_recall` et `memory_graph_recall` seulement pour rappeler des
  préférences ou éléments validés par l'utilisateur ;
- ne jamais écrire dans les registres sources depuis ce hub ;
- ne jamais présenter Anno comme registre officiel.

Tout résultat Anno est une source interne Anno, jamais comme source primaire et
jamais comme registre officiel. Les registres INPI, EUIPO, OMPI, OEB et BOPI
restent vérifiés via `hacienda-sources-officielles` et les outils PI Hacienda.

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Propriété Intellectuelle` est disponible. Ne pas inventer de tool hors périmètre ; si une source ou un registre n'a pas été consulté directement, garder `[à vérifier]`.

- Socle textes, jurisprudence et droit UE : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Marques, BOPI et EUIPO : `inpi_search_marques`, `inpi_marque_details`, `inpi_marques_publications_recentes`, `euipo_tmview_search`, `bopi_dernieres_publications`.
- Brevets et Espacenet : `inpi_search_brevets`, `inpi_brevet_details`, `espacenet_search`, `espacenet_brevet_details`.
- Anno, quand disponible, reste une source interne de dossier : jamais un registre officiel INPI, EUIPO, OEB, OMPI ou BOPI.

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/` ou `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`.

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

La sortie du hub contient au minimum les blocs suivants :

- `Vue des actifs` : vue consolidée des actifs, classes, familles,
  territoires et responsables déjà consignés dans les skills sources.
- `Échéances` : échéances, annuités, renouvellements et dates à surveiller,
  avec tag `[à vérifier]` si la date n'est pas recoupée.
- `Trous de couverture` : trous de couverture, actifs orphelins, données
  manquantes et zones où une revue source reste nécessaire.
- `Limites du registre` : rappel explicite que le hub reflète des registres
  internes consolidés, sans valeur de registre officiel ni de synchronisation
  officielle.
- `Validation humaine requise / Prochaine action` : bloc final obligatoire
  indiquant la vérification humaine attendue et le renvoi vers
  `revue-portefeuille-marques` ou `revue-portefeuille-brevets` selon l'actif
  et l'action de maintenance, d'audit ou de recoupement nécessaire.

## Objectif

Fournir une lecture consolidée du portefeuille PI existant sur le périmètre
actuel **marques + brevets uniquement**, faire ressortir les échéances et les
trous de couverture, et renvoyer vers les skills sources qui tiennent les registres
internes. `portefeuille-pi` est un point d'entrée de lecture, pas un outil
CRUD et pas un registre canonique unifié.

Ce hub ne crée, ne modifie et ne supprime aucune entrée; toute maintenance
bascule vers `revue-portefeuille-marques` ou `revue-portefeuille-brevets`.

## Modes

- `overview` : consolider une vue multi-actifs en lecture seule sur le
  périmètre actuel marques + brevets à partir de
  `revue-portefeuille-marques` et `revue-portefeuille-brevets`.
- `deadlines` : extraire les échéances et points de vigilance temporels déjà
  présents dans les registres internes sources.
- `risk-report` : faire ressortir les trous de couverture, incohérences et
  actifs à recouper avant décision.
- `export` : produire un export de lecture consolidée à partager en interne,
  en rappelant les limites du hub et la nécessité de recouper les données.

## Workflow

1. Lire les registres internes existants.
2. Consolider la lecture marques et brevets.
3. Taguer `[à vérifier]` toute information non recoupée.
4. Faire ressortir échéances, trous de couverture et limites du registre.
5. Renvoyer vers `revue-portefeuille-marques` ou `revue-portefeuille-brevets`
   si une action de maintenance est nécessaire.
6. Ne jamais présenter la sortie comme registre officiel, dépôt officiel ou
   synchronisation officielle.

## Niveaux de criticité

Échelle canonique appliquée à toute appréciation subjective de ce skill :

| Niveau | Icône | Signification dans le contexte de ce skill |
|---|---|---|
| Faible | 🟢 | Portefeuille à jour : annuités payées, renouvellements planifiés, formalités d'opposabilité en règle, couverture cohérente avec l'exploitation. |
| Moyen | 🟡 | Couverture territoriale ou classes (Nice/Locarno/CIB) à élargir au regard de l'exploitation actuelle ou des marchés cibles. |
| Élevé | 🟠 | Échéance de renouvellement marque ou annuité brevet à moins de 3 mois sans plan d'action confirmé — risque de bascule en délai de grâce avec surtaxe. |
| Bloquant | 🔴 | Titre non renouvelé délai expiré OU annuité brevet non payée délai de grâce dépassé OU formalité d'opposabilité critique manquante (inscription cession/licence aux registres nationaux) — perte de droit ou inopposabilité aux tiers. |

Plancher cross-skill (CLAUDE.md §4) : ce skill ne peut pas dégrader silencieusement une cote 🔴 amont sans déclaration explicite.

## Mode Anno Tabular optionnel

Si la distribution Hacienda + Anno Desktop est active, `portefeuille-pi` utilise
Anno pour consolider localement les actifs du dossier, jamais comme source
primaire et jamais comme registre officiel. Appeler `anno_health` avant tout
outil Anno ; si Anno est indisponible, poursuivre en `fallback_hacienda`.

Le portefeuille doit être rattaché au `matter_vault` et au
`workflow_blueprint` `ip-portfolio-review-v1`. Utiliser `legal_graph_query`,
`memory_recall` seulement pour contexte approuvé, `memory_graph_recall` et une
revue tabulaire avec `tabular_review_create` sur le modèle `ip-v1`. La grille
doit suivre actif, titulaire, statut, territoire, licences, sûretés, source
officielle à vérifier, `review_status`, `decision_status` et
`validation_status`.

Utiliser `grid_to_work_product` pour produire un rapport portefeuille ou une
annexe depuis les cellules validées. Tout passage Anno reste une source interne
Anno, jamais comme source primaire ; les registres INPI/EUIPO/WIPO/EPO et
sources officielles restent vérifiés via `hacienda-sources-officielles`. Les
actifs non recoupés restent `[à vérifier]`.
