---
name: revue-portefeuille-marques
version: "2.0.0"
description: >
  Hub portefeuille marques V2 centré sur `report` et `audit`, avec dashboard
  HTML optionnel et priorisation des échéances, renouvellements et gaps de
  surveillance. Les modes `add`, `update`, `remove` et `list` restent
  disponibles comme maintenance secondaire du registre `portfolio.yaml`.
argument-hint: "[--report [--dashboard] | --audit | --add | --update | --remove | --list]"
---

# Skill - Revue portefeuille marques V2

> **Hub portefeuille, pas registre officiel ni service renouvellements.**
> `revue-portefeuille-marques` sert d'abord à produire un rapport
> portefeuille, auditer le registre interne et prioriser les échéances,
> renouvellements et régularisations. Il ne renouvelle pas les droits, ne paie
> pas les taxes, ne dépose pas de nouvelle marque et ne remplace pas un IPMS,
> un mandataire en marques ou un avocat.

Référence de travail utile :
`references/revue-portefeuille-marques-routing-and-output.md`

## Examples

<example>
<user>/h-pi:revue-portefeuille-marques [--report [--dashboard] | --audit | --add | --update | --remove | --list]</user>
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

`revue-portefeuille-marques` V2 est un skill de **pilotage portefeuille**.

Il sert d'abord à :

1. produire un rapport portefeuille exploitable ;
2. auditer la qualité du registre interne ;
3. prioriser renouvellements, régularisations et gaps de surveillance ;
4. générer un dashboard HTML standardisé si le contexte le justifie ;
5. router vers la bonne suite de travail.

Il sert ensuite, de manière secondaire, à maintenir `portfolio.yaml` via
`add`, `update`, `remove` et `list`.

## Ce skill ne fait pas

- Ne renouvelle pas une marque auprès de l'INPI, de l'EUIPO ou de l'OMPI.
- Ne paie pas les taxes de renouvellement.
- Ne dépose pas une nouvelle marque.
- Ne remplace pas un IPMS ou un docketing professionnel.
- Ne rend pas une confirmation officielle qu'un renouvellement est enregistré.
- Ne remplace pas `recherche-anteriorite-marque`, `depot-marque-fr`,
  `surveillance-marque`, `analyse-opposition-marque`, `audit-pi-ma` ou
  `portefeuille-pi`.

## Modes

Modes principaux :

- `report`
- `audit`

Modes secondaires :

- `add`
- `update`
- `remove`
- `list`

Les modes CRUD maintiennent le registre, mais ne redéfinissent pas la promesse
principale du skill, qui reste `report` / `audit`.

## Chargement du profil pratique et du registre

Avant tout travail, lire dans cet ordre :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`
3. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/portfolio.yaml`
4. Optionnel :
   `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/watchlist.yaml`

Si `portfolio.yaml` est absent, le créer avec :

```yaml
metadata:
  cabinet: "[depuis CLAUDE.md ; mettre 'à renseigner' si vide]"
  generated: "YYYY-MM-DD"
  last_audit: null
  source_system: "manual"
assets: []
```

Puis confirmer la création à l'utilisateur.

Rattacher ensuite explicitement :

- le rôle utilisateur ;
- la posture enforcement / maintenance ;
- les mandataires associés ;
- la cadence de revue portefeuille ;
- le format de rapport préféré ;
- la cadence de recoupement registre interne / bases officielles ;
- les approbateurs pour non-renouvellement ou régularisation ;
- la posture de surveillance.

Si le profil contient encore `[A CONFIGURER]`, le skill peut fonctionner en
mode générique, mais chaque sortie doit être marquée `[PROVISOIRE]`.

## Registre interne, pas démarche officielle

Chaque sortie `report` ou `audit` doit rappeler en tête :

> **Registre interne, pas démarche officielle.** Ce rapport reflète l'état
> consigné dans `portfolio.yaml` à la date d'édition. Il ne remplace ni les
> registres INPI / EUIPO / OMPI, ni la confirmation de paiement des taxes de
> renouvellement, ni une notification officielle d'un office. Une marque
> marquée "renouvelée" ou "renouvellement lancé" dans le registre interne doit
> être recoupée avec les bases publiques et le mandataire avant toute
> décision. La démarche officielle relève du mandataire en marques ou de
> l'avocat.

Toute information non recoupée reste marquée `[à vérifier]`.

## Contrat d'entrée V2 pour `report` et `audit`

Le skill doit expliciter ou dériver les dimensions suivantes :

- `portfolio_source_status`: `present`, `missing`, `partial`
- `renewal_visibility_status`: `clear`, `partial`, `blocked`
- `ownership_visibility_status`: `clear`, `partial`, `blocked`
- `watchlist_status`: `available`, `missing`, `partial`
- `dashboard_mode`: `markdown-only`, `markdown-plus-dashboard`,
  `dashboard-required`
- `portfolio_readiness`: `ready`, `partial`, `blocked`

Bloc de faits minimum :

- `portfolio_path`
- `asset_count`
- `last_audit`
- `renewal_entries_present`
- `territory_entries_present`
- `strategic_levels_present`
- `business_owner_coverage`
- `mandataire_coverage`
- `watchlist_cross_reference_status`

## Seuil de préparation du portefeuille

Le skill doit évaluer un `Seuil de préparation du portefeuille` pour `report` et `audit`.

Statuts :

- `ready`
- `partial`
- `blocked`

Passer en `ready` si :

- le registre existe ;
- les renouvellements sont suffisamment renseignés pour prioriser ;
- les owners et mandataires sont exploitables ;
- les conclusions portefeuille peuvent être routées proprement.

Passer en `partial` si :

- le registre existe mais reste incomplet ;
- certaines échéances, owners, territoires ou signaux watchlist restent
  `[à vérifier]` ;
- une priorisation partielle reste possible sans fausse certitude.

Passer en `blocked` si :

- le registre est absent et ne peut pas être cree proprement ;
- les dates de renouvellement sont trop lacunaires pour produire une
  priorisation crédible ;
- les champs critiques de titulaire, owner ou mandataire sont trop incomplets ;
- le recoupement registre / watchlist est trop fragile pour soutenir une
  recommandation utile.

En `blocked`, produire un constat de blocage et une suite de régularisation,
pas un faux rapport portefeuille.

## Cadrage initial de `report`

Pour `report`, le skill doit :

1. charger le registre et le profil ;
2. calculer l'échéance de renouvellement la plus proche par actif ;
3. dériver la sévérité de renouvellement ;
4. vérifier la couverture de territoires, owner et mandataire ;
5. recouper, si disponible, avec `watchlist.yaml` ;
6. évaluer le `Seuil de préparation du portefeuille` ;
7. decider si le dashboard HTML est utile ou requis.

### Buckets renouvellement

Calculer `j_restants = dateRenouvellement - today`.

| Bucket | Jours restants | Lecture |
| --- | --- | --- |
| `critical` | `< 30 j` | urgence renouvellement |
| `watch` | `30 à 90 j` | à préparer ce trimestre |
| `plan` | `> 90 j et <= 365 j` | a planifier |
| `stable` | `> 365 j` | surveillance passive |
| `unknown` | donnée absente / incoherente | à vérifier |

## Sortie V2 de `report`

La sortie `report` doit rester fermée autour de 9 blocs :

1. `Synthèse du portefeuille`
2. `Seuil de préparation du portefeuille`
3. `Renewal Priority`
4. `Coverage And Territories`
5. `Ownership And Coverage`
6. `Watchlist Signals`
7. `Critical Gaps`
8. `Routage de décision`
9. `Validation humaine`

### 1. `Synthèse du portefeuille`

Doit contenir au minimum :

- taille du portefeuille ;
- nombre de territoires suivis ;
- posture enforcement / maintenance ;
- dernier audit ;
- nombre d'actifs `core` / `important` / `standard` / `heritage`.

### 2. `Seuil de préparation du portefeuille`

Doit contenir :

- le statut `ready` / `partial` / `blocked` ;
- la raison courte ;
- le niveau de fiabilité général du registre.

### 3. `Renewal Priority`

Doit contenir :

- buckets critiques et à préparer ;
- échéances proches ;
- actifs orphelins ou ambigus ;
- rappel que registre interne != confirmation office.

### 4. `Coverage And Territories`

Doit contenir :

- cohérence des territoires ;
- actifs sans couverture claire ;
- trous de périmètre FR / EU / OMPI ;
- actifs centraux avec empreinte territoriale sous-documentée.

### 5. `Ownership And Coverage`

Doit contenir :

- titulaires / owners / mandataires manquants ;
- actifs critiques sans business owner ;
- incoherences de titulaire ou couverture territoriale.

### 6. `Watchlist Signals`

Doit contenir :

- marques surveillées vs non surveillées ;
- marques `core` non watchlist ;
- desalignement portefeuille / surveillance ;
- absence de recoupement si la watchlist manque.

### 7. `Critical Gaps`

Doit contenir :

- champs critiques manquants ;
- sections `[à vérifier]` ;
- hypothèses provisoires ;
- blocages de renouvellement, owner, mandataire, titulaire ou surveillance.

### 8. `Routage de décision`

Le skill doit borner ses suites à un jeu fermé :

- `prepare-renewal-escalade`
- `prepare-watchlist-regularization`
- `prepare-portfolio-cleanup`
- `prepare-territory-review`
- `hold-for-registry-regularization`

### 9. `Validation humaine`

Doit rappeler explicitement :

- validation humaine requise ;
- vérification des bases publiques avant action ;
- validation mandataire / avocat / owner métier selon le cas.

## Dashboard HTML

Le dashboard reste une sortie secondaire de `report`, jamais un substitut au
rapport Markdown.

### Règles de declenchement

Le dashboard est genere si :

- `--dashboard` est demande ;
- ou le profil préfère `markdown-plus-dashboard` ;
- ou la taille du portefeuille rend la vue tableau nettement utile ;
- ou `dashboard-required` a été derive.

### Règles de construction

- Reutiliser strictement `renderDashboard` de `@hacienda/core`.
- Ne pas introduire de HTML artisanal parallele.
- Le dashboard doit refleter les mêmes conclusions que le Markdown.
- Toute valeur douteuse reste marquée `[à vérifier]`.
- Toute valeur provisoire reste marquée `[PROVISOIRE]`.

Le mémo
`references/revue-portefeuille-marques-routing-and-output.md`
sert de support de construction.

## Cadrage initial de `audit`

`audit` reste un mode portefeuille, pas un effet secondaire du CRUD.

Le skill doit :

1. évaluer le `Seuil de préparation du portefeuille` ;
2. reperer les champs critiques manquants ;
3. classer les findings par sévérité ;
4. proposer des régularisations concrètes ;
5. conclure par validation humaine.

## Sortie de `audit`

La sortie `audit` doit contenir au minimum :

1. `Seuil de préparation du portefeuille`
2. `Critical Findings`
3. `Severity`
4. `Regularization Actions`
5. `Validation humaine`

Les findings doivent prioriser :

- renouvellements manquants ou incoherents ;
- actifs critiques sans owner ou mandataire ;
- territoires mal renseignés ;
- absence de surveillance sur des marques `core` ou `important` ;
- dates ou statuts incoherents.

## Modes CRUD secondaires

### `add`

`add` sert à inserer une nouvelle entrée dans `portfolio.yaml`.

Exiger au minimum :

- signe ;
- type ;
- classes Nice ;
- au moins un territoire ;
- statut ;
- `niveau_strategique` ;
- `business_owner` si actif `core` ou `important`.

Avant ecriture :

- valider le schema ;
- sauvegarder un backup horodate ;
- confirmer l'ID attribue ;
- rappeler qu'ajouter une entrée ne dépose ni ne renouvelle rien.

### `update`

`update` sert à corriger ou compléter une entrée existante.

Utilisation prioritaire :

- mise à jour de `dateRenouvellement` ;
- completude owner / mandataire ;
- régularisation de territoires ;
- mise en cohérence avec la watchlist.

Rappeler que la mise à jour du registre interne ne vaut pas confirmation
office.

### `remove`

`remove` sert uniquement à retirer une entrée du registre interne après
confirmation explicite.

Exiger :

- confirmation de l'ID ;
- justification simple ;
- backup avant suppression.

Ne jamais présenter cette suppression comme une renonciation ou radiation
officielle.

### `list`

`list` sert à exposer le contenu du registre de manière compacte.

Doit montrer :

- ID ;
- signe ;
- prochaine échéance ;
- niveau stratégique ;
- owner ;
- statut.

`list` est informatif. Il ne remplace ni `report` ni `audit`.

## Frontieres explicites

- `recherche-anteriorite-marque` : premier passage recherche.
- `depot-marque-fr` : préparation de dépôt.
- `surveillance-marque` : monitoring publication / watchlist.
- `analyse-opposition-marque` : opposition INPI.
- `audit-pi-ma` : lecture transactionnelle multi-actifs.
- `portefeuille-pi` : lecture consolidée fédérée marques + brevets.

## Emplacement de sortie

Ecrire les livrables dans :

`~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/`

Format attendu :

- Markdown :
  `portefeuille-YYYY-MM-DD.md`
- HTML si dashboard :
  `portefeuille-YYYY-MM-DD.html`
- Audit court :
  `portefeuille-audit-YYYY-MM-DD.md`


## Niveaux de criticité

Échelle canonique appliquée à toute appréciation subjective de ce skill :

| Niveau | Icône | Signification dans le contexte de ce skill |
|---|---|---|
| Faible | 🟢 | Portefeuille à jour : renouvellements à 10 ans tenus, classes Nice alignées sur l'exploitation, surveillance BOPI active, pas d'opposition pendante. |
| Moyen | 🟡 | Échéance renouvellement dans 6-12 mois sans plan d'action, ou usage non démontré sur certaines classes (risque déchéance L.714-5 après 5 ans), ou classes à compléter. |
| Élevé | 🟠 | Échéance renouvellement < 3 mois sans décision, opposition en cours nécessitant défense, ou marque sous menace de déchéance pour défaut d'usage sur classes commercialement utilisées. |
| Bloquant | 🔴 | Marque non renouvelée délai expiré (déchéance), action en déchéance recevable sur classe exploitée, ou marque déclarée déceptive/non distinctive par INPI sans appel formé. |

Plancher cross-skill (CLAUDE.md §4) : ce skill ne peut pas dégrader silencieusement une cote 🔴 amont (par ex. issue de `surveillance-marque`, `anteriorite-invalidite`) sans déclaration explicite.

## Style de sortie

- Distinguer faits, analyse, gaps, décisions et validation humaine.
- Ne jamais présenter le registre comme une source officielle.
- Ne jamais masquer une donnée incertaine.
- Utiliser `[à vérifier]` pour tout recoupement non fait.
- Utiliser `[PROVISOIRE]` si le profil est incomplet.
- Rester opérationnel et concis.
