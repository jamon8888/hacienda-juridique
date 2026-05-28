---
name: surveillance-marque
version: "2.0.0"
description: >
  Monitoring strict et priorisation des publications marques pour signaler les
  alertes à suivre avant opposition ou escalade. Ce skill surveille,
  priorise et route ; il ne tranche pas le risque de confusion ni n'engage une
  action formelle.
argument-hint: "[--report [--days N] | --add | --update | --remove | --list | --audit]"
---

# Skill - Surveillance marque V2

> **Surveillance et priorisation, pas opinion juridique ni action formelle.**
> `surveillance-marque` sert à détecter, trier et prioriser des publications
> recentes au regard d'une watchlist. Il ne remplace ni
> `recherche-anteriorite-marque`, ni `analyse-opposition-marque`, ni une mise
> en demeure, ni un cadrage initial enforcement.

Référence de travail utile :
`references/surveillance-marque-routing-and-report.md`

## Examples

<example>
<user>/h-pi:surveillance-marque [--report [--days N] | --add | --update | --remove | --list | --audit]</user>
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
- Marques, BOPI et EUIPO : `inpi_search_marques`, `inpi_marque_details`, `inpi_marques_publications_recentes`, `euipo_tmview_search`, `bopi_dernieres_publications`.
- Anno, quand disponible, reste une source interne de dossier : jamais un registre officiel INPI, EUIPO, OEB, OMPI ou BOPI.

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/` ou `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`.

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

## Positionnement

`surveillance-marque` reste la brique de monitoring de la voie marques :

1. watchlist active ;
2. collecte des publications recentes ;
3. priorisation par délai, proximité et completude du dossier ;
4. routage vers le bon skill aval si une action est requise.

Le skill est strictement borné au monitoring et à la priorisation :

- il ne conclut jamais qu'une publication cree un risque de confusion établi ;
- il ne forme pas une opposition ;
- il ne rédige pas une mise en demeure ;
- il ne bascule pas seul un dossier en enforcement.

## Ce skill ne fait pas

- Ne rend pas une opinion de confusion ou de disponibilité.
- Ne forme pas une opposition ni une défense d'opposition.
- Ne rédige pas une mise en demeure.
- Ne qualifié pas à lui seul un usage litigieux hors registre.
- Ne remplace pas la validation d'un mandataire ou d'un avocat.

## Modes publics

Les seuls modes publics sont :

- `--report` : produire le rapport de surveillance priorise
- `--add` : ajouter une entrée de watchlist
- `--update` : modifier une entrée existante
- `--remove` : retirer une entrée existante
- `--list` : afficher la watchlist
- `--audit` : vérifier la santé de la watchlist et du dispositif

Par défaut, sans precision, le skill doit lancer `--report`.

## Contrat de rapport V2

Le mode `--report` doit expliciter ou dériver les dimensions suivantes :

- `report_window`: `daily`, `weekly`, `custom`, `unknown`
- `watch_scope`: `fr-only`, `fr-eu`, `multi-office`, `unknown`
- `source_coverage`: `full`, `partial`, `degraded`, `none`
- `monitoring_gate`: `healthy`, `needs-review`, `degraded`, `blocked`
- `alert_pressure`: `none`, `routine`, `elevated`, `critical`

Bloc de faits à exposer explicitement :

- `watch_ids_in_scope`
- `window_dates`
- `sources_checked`
- `new_publications_detected`
- `deduplication_status`
- `record_limitations`

## Chargement du profil pratique

Avant tout, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`
3. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/watchlist.yaml`

Rattacher ensuite :

- le rôle utilisateur ;
- le ou les territoires de veille ;
- la posture de priorisation ;
- les approbateurs ou destinataires d'escalade ;
- les integrations et outils reellement disponibles.

Si le profil contient `[A CONFIGURER]`, le dire explicitement et tagger la
sortie `[PROVISOIRE]`.

## Mode `--report`

### Cadrage initial

Demander ou dériver en un seul bloc :

1. fenêtre de rapport (`--days N` ou valeur par défaut) ;
2. watchlist entière ou sous-ensemble visé ;
3. territoires offices suivis ;
4. sources disponibles ou manquantes ;
5. exceptions déjà connues (`agent_managed`, watch suspendue, source HS).

Guidance de mapping minimale :

- 1 jour -> `report_window: daily`
- 7 jours ou valeur par défaut -> `report_window: weekly`
- autre fenêtre explicite -> `report_window: custom`
- FR uniquement -> `watch_scope: fr-only`
- FR + EU -> `watch_scope: fr-eu`
- plusieurs offices ou couverture étendue -> `watch_scope: multi-office`
- toutes les sources attendues interrogees -> `source_coverage: full`
- au moins une source manque ou une partie du scope n'est pas couverte ->
  `source_coverage: partial`
- exécution dégradée mais exploitable -> `source_coverage: degraded`
- aucune base interrogée -> `source_coverage: none`

## Seuil de surveillance

Avant toute priorisation, rendre visible le seuil de monitoring :

1. watchlist exploitable ou non ;
2. sources interrogees ou manquantes ;
3. fenêtre de surveillance réelle ;
4. statut de deduplication ;
5. intégrité minimale du registre de suivi.

Le seuil ne peut sortir que sur :

- `healthy`
- `needs-review`
- `degraded`
- `blocked`

Déclencheurs typiques :

- `healthy` : watchlist exploitable, sources attendues interrogees, dedup OK
- `needs-review` : watchlist exploitable mais trous limits ou entrée fragile
- `degraded` : source manquante, fenêtre partielle ou historique incomplet
- `blocked` : aucune base interrogée ou watchlist inutilisable

Si `source_coverage: none`, la sortie doit rendre le seuil `blocked`.

## Priorisation des alertes

Le skill doit prioriser les hits sans prêtendre trancher le fond.

Règles minimales :

- `critical` si au moins une alerte est proche d'un délai d'opposition court ou
  requiert une reaction immédiate ;
- `elevated` si plusieurs alertes ou un dossier sensible exigent une revue
  rapide ;
- `routine` si la surveillance remonte des éléments à examiner sans urgence
  critique ;
- `none` si aucun hit exploitable n'est remonte.

Chaque hit doit, si disponible, faire apparaitre :

- signe ;
- source ;
- classes / produits-services ;
- titulaire ;
- date de publication ;
- date limité utile si connue ;
- watchlist match ;
- raison de priorisation ;
- limites `[à vérifier]`.

## Modes de maintenance

### `--add`

Ajouter une entrée de watchlist avec au minimum :

- signe surveille ;
- variantes si utiles ;
- classes ;
- territoires ;
- niveau de priorité ;
- propriétaire business ou destinataire ;
- notes de contexte.

### `--update`

Modifier une entrée existante sans changer silencieusement son identité. Toute
modification de scope, classes ou territoires doit rester visible.

### `--remove`

Retirer une entrée après confirmation explicite. Si l'entrée est prioritaire ou
agent-managed, demander une raison.

### `--list`

Afficher la watchlist dans un format compact, avec identifiant, signe, classes,
territoires, priorité et dernière exécution.

### `--audit`

Vérifier :

- entrées obsoletes ;
- doublons ;
- mots-cles trop generiques ;
- territoires ou classes incoherents ;
- executions trop anciennes ;
- dépendances source manquantes.

## Limites de routage

### Router vers `recherche-anteriorite-marque`

- publication detectee mais besoin principal = premier passage de confusion ;
- aucune analyse détaillée du signe n'à encore été faite ;
- le monitoring a remonté un hit qui doit être qualifié avant toute autre
  action.

### Router vers `analyse-opposition-marque`

- publication ou notification exploitable demande une opposition ou une défense ;
- le délai, les droits invoqués ou la stratégie d'opposition deviennent le
  cœur du dossier ;
- le monitoring a déjà fait son travail de détection/priorisation.

### Router vers `mise-en-demeure-pi`

- il existe un usage exploité, un contact adverse ou une action amiable a
  préparer ;
- le sujet principal n'est plus la surveillance de publications mais la lettre
  offensive ou la réponse structurée ;
- la voie registre n'est pas l'unique levier utile.

### Router vers `tri-contrefacon`

- le dossier bascule vers un usage litigieux observe sur le marché ;
- la publication de marque n'est plus le cœur exclusif du problème ;
- il faut d'abord qualifier un cas enforcement et structurer les faits.

### Rester dans `surveillance-marque`

- besoin principal = monitorer, dedoublonner et prioriser ;
- aucune action aval n'est encore assez mature pour prendre le relais ;
- la valeur attendue reste un rapport de veille exploitable.

## Contrat de sortie V2

En mode `--report`, la sortie doit produire exactement les neuf blocs suivants,
dans cet ordre :

1. `Synthèse du périmètre de surveillance`
2. `Monitoring Gate`
3. `Source Coverage`
4. `Priority Queue`
5. `Critical Alerts`
6. `Watchlist Integrity and Gaps`
7. `Escalation Candidates`
8. `Routage de décision`
9. `Validation humaine`

### 1. `Synthèse du périmètre de surveillance`

- fenêtre couverte ;
- watchs traitees ;
- territoires ou offices ;
- volume de hits ;
- posture de rapport.

### 2. `Monitoring Gate`

- état `healthy`, `needs-review`, `degraded` ou `blocked` ;
- raisons du seuil ;
- effet pratique sur la fiabilité du rapport.

### 3. `Source Coverage`

- bases interrogees ;
- bases manquantes ;
- couverture FR / EU / autre ;
- statut de deduplication ;
- limitations de périmètre.

### 4. `Priority Queue`

- synthèse des alertes par niveau ;
- `alert_pressure` ;
- nombre d'items critiques, eleves, routine ;
- logique de priorisation.

### 5. `Critical Alerts`

- lister les hits les plus sensibles ;
- inclure date utile, signe, classes, titulaire, source et watch match ;
- dire pourquoi ils sont critiques ou eleves ;
- ne pas conclure sur le fond.

### 6. `Watchlist Integrity and Gaps`

- watchs non executees ;
- entrées fragiles, doublons ou trop generiques ;
- sources absentes ;
- effets pratiques sur la surveillance.

### 7. `Escalation Candidates`

- identifier les hits à rerouter ;
- dire vers quel skill et pourquoi ;
- distinguer opposition, recherche, mise en demeure, contrefaçon.

### 8. `Routage de décision`

Ce bloc doit utiliser uniquement l'une des valeurs suivantes :

- `continue-monitoring`
- `run-first-pass-search`
- `prepare-opposition-review`
- `prepare-cease-and-desist`
- `open-enforcement-triage`
- `repair-watchlist`
- `insufficient-monitoring-coverage`
- `deadline-critical-escalade`

Associer la valeur choisie à 2-4 actions concrètes et à sa justification.

### 9. `Validation humaine`

- rappeler qu'il s'agit d'un rapport de monitoring ;
- nommer les validations mandataire / avocat / business owner utiles ;
- rappeler les points `[à vérifier]` avant toute opposition, lettre ou
  escalade.

## Règles de sûreté

- Le garde-fou "monitoring et priorisation" doit rester visible en tete.
- Une base non interrogée reste une lacune visible.
- Un hit de surveillance ne vaut pas opinion de confusion.
- La route vers `mise-en-demeure-pi` ou `tri-contrefacon` exige un basculement
  vers un sujet d'usage ou d'enforcement, pas seulement une publication.
- Si le seuil est `blocked`, la sortie ne doit pas maquiller le rapport en
  surveillance fiable.

## Rappel final à conserver

- monitoring strict uniquement ;
- jamais opinion de confusion ou action formelle ;
- validation humaine obligatoire avant opposition, lettre ou enforcement.
