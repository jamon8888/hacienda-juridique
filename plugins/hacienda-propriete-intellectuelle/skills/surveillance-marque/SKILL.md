---
name: surveillance-marque
version: "2.0.0"
description: >
  Monitoring strict et priorisation des publications marques pour signaler les
  alertes a suivre avant opposition ou escalation. Ce skill surveille,
  priorise et route ; il ne tranche pas le risque de confusion ni n'engage une
  action formelle.
argument-hint: "[--report [--days N] | --add | --update | --remove | --list | --audit]"
---

# Skill - Surveillance marque V2

> **Monitoring et priorisation, pas opinion juridique ni action formelle.**
> `surveillance-marque` sert a detecter, trier et prioriser des publications
> recentes au regard d'une watchlist. Il ne remplace ni
> `recherche-anteriorite-marque`, ni `analyse-opposition-marque`, ni une mise
> en demeure, ni un intake enforcement.

Reference de travail utile :
`references/surveillance-marque-routing-and-report.md`

## Positionnement

`surveillance-marque` reste la brique de monitoring de la lane marques :

1. watchlist active ;
2. collecte des publications recentes ;
3. priorisation par delai, proximite et completude du dossier ;
4. routage vers le bon skill aval si une action est requise.

Le skill est strictement borne au monitoring et a la priorisation :

- il ne conclut jamais qu'une publication cree un risque de confusion etabli ;
- il ne forme pas une opposition ;
- il ne redige pas une mise en demeure ;
- il ne bascule pas seul un dossier en enforcement.

## Ce skill ne fait pas

- Ne rend pas une opinion de confusion ou de disponibilite.
- Ne forme pas une opposition ni une defense d'opposition.
- Ne redige pas une mise en demeure.
- Ne qualifie pas a lui seul un usage litigieux hors registre.
- Ne remplace pas la validation d'un mandataire ou d'un avocat.

## Modes publics

Les seuls modes publics sont :

- `--report` : produire le rapport de surveillance priorise
- `--add` : ajouter une entree de watchlist
- `--update` : modifier une entree existante
- `--remove` : retirer une entree existante
- `--list` : afficher la watchlist
- `--audit` : verifier la sante de la watchlist et du dispositif

Par defaut, sans precision, le skill doit lancer `--report`.

## Contrat de rapport V2

Le mode `--report` doit expliciter ou deriver les dimensions suivantes :

- `report_window`: `daily`, `weekly`, `custom`, `unknown`
- `watch_scope`: `fr-only`, `fr-eu`, `multi-office`, `unknown`
- `source_coverage`: `full`, `partial`, `degraded`, `none`
- `monitoring_gate`: `healthy`, `needs-review`, `degraded`, `blocked`
- `alert_pressure`: `none`, `routine`, `elevated`, `critical`

Bloc de faits a exposer explicitement :

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

- le role utilisateur ;
- le ou les territoires de veille ;
- la posture de priorisation ;
- les approbateurs ou destinataires d'escalade ;
- les integrations et outils reellement disponibles.

Si le profil contient `[A CONFIGURER]`, le dire explicitement et tagger la
sortie `[PROVISOIRE]`.

## Mode `--report`

### Intake

Demander ou deriver en un seul bloc :

1. fenetre de rapport (`--days N` ou valeur par defaut) ;
2. watchlist entiere ou sous-ensemble vise ;
3. territoires offices suivis ;
4. sources disponibles ou manquantes ;
5. exceptions deja connues (`agent_managed`, watch suspendue, source HS).

Guidance de mapping minimale :

- 1 jour -> `report_window: daily`
- 7 jours ou valeur par defaut -> `report_window: weekly`
- autre fenetre explicite -> `report_window: custom`
- FR uniquement -> `watch_scope: fr-only`
- FR + EU -> `watch_scope: fr-eu`
- plusieurs offices ou couverture etendue -> `watch_scope: multi-office`
- toutes les sources attendues interrogees -> `source_coverage: full`
- au moins une source manque ou une partie du scope n'est pas couverte ->
  `source_coverage: partial`
- execution degradee mais exploitable -> `source_coverage: degraded`
- aucune base interrogee -> `source_coverage: none`

## Monitoring Gate

Avant toute priorisation, rendre visible le gate de monitoring :

1. watchlist exploitable ou non ;
2. sources interrogees ou manquantes ;
3. fenetre de surveillance reelle ;
4. statut de deduplication ;
5. integrite minimale du registre de suivi.

Le gate ne peut sortir que sur :

- `healthy`
- `needs-review`
- `degraded`
- `blocked`

Declencheurs typiques :

- `healthy` : watchlist exploitable, sources attendues interrogees, dedup OK
- `needs-review` : watchlist exploitable mais trous limits ou entree fragile
- `degraded` : source manquante, fenetre partielle ou historique incomplet
- `blocked` : aucune base interrogee ou watchlist inutilisable

Si `source_coverage: none`, la sortie doit rendre le gate `blocked`.

## Priorisation des alertes

Le skill doit prioriser les hits sans pretendre trancher le fond.

Regles minimales :

- `critical` si au moins une alerte est proche d'un delai d'opposition court ou
  requiert une reaction immediate ;
- `elevated` si plusieurs alertes ou un dossier sensible exigent une revue
  rapide ;
- `routine` si la surveillance remonte des elements a examiner sans urgence
  critique ;
- `none` si aucun hit exploitable n'est remonte.

Chaque hit doit, si disponible, faire apparaitre :

- signe ;
- source ;
- classes / produits-services ;
- titulaire ;
- date de publication ;
- date limite utile si connue ;
- watchlist match ;
- raison de priorisation ;
- limites `[a verifier]`.

## Modes de maintenance

### `--add`

Ajouter une entree de watchlist avec au minimum :

- signe surveille ;
- variantes si utiles ;
- classes ;
- territoires ;
- niveau de priorite ;
- proprietaire business ou destinataire ;
- notes de contexte.

### `--update`

Modifier une entree existante sans changer silencieusement son identite. Toute
modification de scope, classes ou territoires doit rester visible.

### `--remove`

Retirer une entree apres confirmation explicite. Si l'entree est prioritaire ou
agent-managed, demander une raison.

### `--list`

Afficher la watchlist dans un format compact, avec identifiant, signe, classes,
territoires, priorite et derniere execution.

### `--audit`

Verifier :

- entrees obsoletes ;
- doublons ;
- mots-cles trop generiques ;
- territoires ou classes incoherents ;
- executions trop anciennes ;
- dependances source manquantes.

## Routing Boundaries

### Route to `recherche-anteriorite-marque`

- publication detectee mais besoin principal = premier passage de confusion ;
- aucune analyse detaillee du signe n'a encore ete faite ;
- le monitoring a remonte un hit qui doit etre qualifie avant toute autre
  action.

### Route to `analyse-opposition-marque`

- publication ou notification exploitable demande une opposition ou une defense ;
- le delai, les droits invoques ou la strategie d'opposition deviennent le
  coeur du dossier ;
- le monitoring a deja fait son travail de detection/priorisation.

### Route to `mise-en-demeure-pi`

- il existe un usage exploite, un contact adverse ou une action amiable a
  preparer ;
- le sujet principal n'est plus la surveillance de publications mais la lettre
  offensive ou la reponse structuree ;
- la voie registre n'est pas l'unique levier utile.

### Route to `tri-contrefacon`

- le dossier bascule vers un usage litigieux observe sur le marche ;
- la publication de marque n'est plus le coeur exclusif du probleme ;
- il faut d'abord qualifier un cas enforcement et structurer les faits.

### Stay in `surveillance-marque`

- besoin principal = monitorer, dedoublonner et prioriser ;
- aucune action aval n'est encore assez mature pour prendre le relais ;
- la valeur attendue reste un rapport de veille exploitable.

## Contrat de sortie V2

En mode `--report`, la sortie doit produire exactement les neuf blocs suivants,
dans cet ordre :

1. `Monitoring Scope Snapshot`
2. `Monitoring Gate`
3. `Source Coverage`
4. `Priority Queue`
5. `Critical Alerts`
6. `Watchlist Integrity and Gaps`
7. `Escalation Candidates`
8. `Decision Routing`
9. `Human Validation`

### 1. `Monitoring Scope Snapshot`

- fenetre couverte ;
- watchs traitees ;
- territoires ou offices ;
- volume de hits ;
- posture de rapport.

### 2. `Monitoring Gate`

- etat `healthy`, `needs-review`, `degraded` ou `blocked` ;
- raisons du gate ;
- effet pratique sur la fiabilite du rapport.

### 3. `Source Coverage`

- bases interrogees ;
- bases manquantes ;
- couverture FR / EU / autre ;
- statut de deduplication ;
- limitations de perimetre.

### 4. `Priority Queue`

- synthese des alertes par niveau ;
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
- entrees fragiles, doublons ou trop generiques ;
- sources absentes ;
- effets pratiques sur la surveillance.

### 7. `Escalation Candidates`

- identifier les hits a rerouter ;
- dire vers quel skill et pourquoi ;
- distinguer opposition, recherche, mise en demeure, contrefacon.

### 8. `Decision Routing`

Ce bloc doit utiliser uniquement l'une des valeurs suivantes :

- `continue-monitoring`
- `run-first-pass-search`
- `prepare-opposition-review`
- `prepare-cease-and-desist`
- `open-enforcement-triage`
- `repair-watchlist`
- `insufficient-monitoring-coverage`
- `deadline-critical-escalation`

Associer la valeur choisie a 2-4 actions concretes et a sa justification.

### 9. `Human Validation`

- rappeler qu'il s'agit d'un rapport de monitoring ;
- nommer les validations mandataire / avocat / business owner utiles ;
- rappeler les points `[a verifier]` avant toute opposition, lettre ou
  escalation.

## Regles de surete

- Le garde-fou "monitoring et priorisation" doit rester visible en tete.
- Une base non interrogee reste une lacune visible.
- Un hit de surveillance ne vaut pas opinion de confusion.
- La route vers `mise-en-demeure-pi` ou `tri-contrefacon` exige un basculement
  vers un sujet d'usage ou d'enforcement, pas seulement une publication.
- Si le gate est `blocked`, la sortie ne doit pas maquiller le rapport en
  surveillance fiable.

## Rappel final a conserver

- monitoring strict uniquement ;
- jamais opinion de confusion ou action formelle ;
- validation humaine obligatoire avant opposition, lettre ou enforcement.
