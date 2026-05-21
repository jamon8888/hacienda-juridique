---
name: revue-portefeuille-marques
version: "2.0.0"
description: >
  Hub portefeuille marques V2 centre sur `report` et `audit`, avec dashboard
  HTML optionnel et priorisation des echeances, renouvellements et gaps de
  surveillance. Les modes `add`, `update`, `remove` et `list` restent
  disponibles comme maintenance secondaire du registre `portfolio.yaml`.
argument-hint: "[--report [--dashboard] | --audit | --add | --update | --remove | --list]"
---

# Skill - Revue portefeuille marques V2

> **Hub portefeuille, pas registre officiel ni service renouvellements.**
> `revue-portefeuille-marques` sert d'abord a produire un rapport
> portefeuille, auditer le registre interne et prioriser les echeances,
> renouvellements et regularisations. Il ne renouvelle pas les droits, ne paie
> pas les taxes, ne depose pas de nouvelle marque et ne remplace pas un IPMS,
> un mandataire en marques ou un avocat.

Reference de travail utile :
`references/revue-portefeuille-marques-routing-and-output.md`

## Positionnement

`revue-portefeuille-marques` V2 est un skill de **pilotage portefeuille**.

Il sert d'abord a :

1. produire un rapport portefeuille exploitable ;
2. auditer la qualite du registre interne ;
3. prioriser renouvellements, regularisations et gaps de surveillance ;
4. generer un dashboard HTML standardise si le contexte le justifie ;
5. router vers la bonne suite de travail.

Il sert ensuite, de maniere secondaire, a maintenir `portfolio.yaml` via
`add`, `update`, `remove` et `list`.

## Ce skill ne fait pas

- Ne renouvelle pas une marque aupres de l'INPI, de l'EUIPO ou de l'OMPI.
- Ne paie pas les taxes de renouvellement.
- Ne depose pas une nouvelle marque.
- Ne remplace pas un IPMS ou un docketing professionnel.
- Ne rend pas une confirmation officielle qu'un renouvellement est enregistre.
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

Les modes CRUD maintiennent le registre, mais ne redefinissent pas la promesse
principale du skill, qui reste `report` / `audit`.

## Chargement du profil pratique et du registre

Avant tout travail, lire dans cet ordre :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`
3. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/portfolio.yaml`
4. Optionnel :
   `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/watchlist.yaml`

Si `portfolio.yaml` est absent, le creer avec :

```yaml
metadata:
  cabinet: "[depuis CLAUDE.md ; mettre 'a renseigner' si vide]"
  generated: "YYYY-MM-DD"
  last_audit: null
  source_system: "manual"
assets: []
```

Puis confirmer la creation a l'utilisateur.

Rattacher ensuite explicitement :

- le role utilisateur ;
- la posture enforcement / maintenance ;
- les mandataires associes ;
- la cadence de revue portefeuille ;
- le format de rapport prefere ;
- la cadence de recoupement registre interne / bases officielles ;
- les approbateurs pour non-renouvellement ou regularisation ;
- la posture de surveillance.

Si le profil contient encore `[A CONFIGURER]`, le skill peut fonctionner en
mode generique, mais chaque sortie doit etre marquee `[PROVISOIRE]`.

## Registre interne, pas demarche officielle

Chaque sortie `report` ou `audit` doit rappeler en tete :

> **Registre interne, pas demarche officielle.** Ce rapport reflete l'etat
> consigne dans `portfolio.yaml` a la date d'edition. Il ne remplace ni les
> registres INPI / EUIPO / OMPI, ni la confirmation de paiement des taxes de
> renouvellement, ni une notification officielle d'un office. Une marque
> marquee "renouvelee" ou "renouvellement lance" dans le registre interne doit
> etre recoupee avec les bases publiques et le mandataire avant toute
> decision. La demarche officielle releve du mandataire en marques ou de
> l'avocat.

Toute information non recoupee reste marquee `[a verifier]`.

## Contrat d'entree V2 pour `report` et `audit`

Le skill doit expliciter ou deriver les dimensions suivantes :

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

## Portfolio Readiness Gate

Le skill doit evaluer un `Portfolio Readiness Gate` pour `report` et `audit`.

Statuts :

- `ready`
- `partial`
- `blocked`

Passer en `ready` si :

- le registre existe ;
- les renouvellements sont suffisamment renseignes pour prioriser ;
- les owners et mandataires sont exploitables ;
- les conclusions portefeuille peuvent etre routees proprement.

Passer en `partial` si :

- le registre existe mais reste incomplet ;
- certaines echeances, owners, territoires ou signaux watchlist restent
  `[a verifier]` ;
- une priorisation partielle reste possible sans fausse certitude.

Passer en `blocked` si :

- le registre est absent et ne peut pas etre cree proprement ;
- les dates de renouvellement sont trop lacunaires pour produire une
  priorisation credible ;
- les champs critiques de titulaire, owner ou mandataire sont trop incomplets ;
- le recoupement registre / watchlist est trop fragile pour soutenir une
  recommandation utile.

En `blocked`, produire un constat de blocage et une suite de regularisation,
pas un faux rapport portefeuille.

## Intake de `report`

Pour `report`, le skill doit :

1. charger le registre et le profil ;
2. calculer l'echeance de renouvellement la plus proche par actif ;
3. deriver la severite de renouvellement ;
4. verifier la couverture de territoires, owner et mandataire ;
5. recouper, si disponible, avec `watchlist.yaml` ;
6. evaluer le `Portfolio Readiness Gate` ;
7. decider si le dashboard HTML est utile ou requis.

### Buckets renouvellement

Calculer `j_restants = dateRenouvellement - today`.

| Bucket | Jours restants | Lecture |
| --- | --- | --- |
| `critical` | `< 30 j` | urgence renouvellement |
| `watch` | `30 a 90 j` | a preparer ce trimestre |
| `plan` | `> 90 j et <= 365 j` | a planifier |
| `stable` | `> 365 j` | surveillance passive |
| `unknown` | donnee absente / incoherente | a verifier |

## Sortie V2 de `report`

La sortie `report` doit rester fermee autour de 9 blocs :

1. `Portfolio Snapshot`
2. `Portfolio Readiness Gate`
3. `Renewal Priority`
4. `Coverage And Territories`
5. `Ownership And Coverage`
6. `Watchlist Signals`
7. `Critical Gaps`
8. `Decision Routing`
9. `Human Validation`

### 1. `Portfolio Snapshot`

Doit contenir au minimum :

- taille du portefeuille ;
- nombre de territoires suivis ;
- posture enforcement / maintenance ;
- dernier audit ;
- nombre d'actifs `core` / `important` / `standard` / `heritage`.

### 2. `Portfolio Readiness Gate`

Doit contenir :

- le statut `ready` / `partial` / `blocked` ;
- la raison courte ;
- le niveau de fiabilite general du registre.

### 3. `Renewal Priority`

Doit contenir :

- buckets critiques et a preparer ;
- echeances proches ;
- actifs orphelins ou ambigus ;
- rappel que registre interne != confirmation office.

### 4. `Coverage And Territories`

Doit contenir :

- coherence des territoires ;
- actifs sans couverture claire ;
- trous de perimetre FR / EU / OMPI ;
- actifs centraux avec empreinte territoriale sous-documentee.

### 5. `Ownership And Coverage`

Doit contenir :

- titulaires / owners / mandataires manquants ;
- actifs critiques sans business owner ;
- incoherences de titulaire ou couverture territoriale.

### 6. `Watchlist Signals`

Doit contenir :

- marques surveillees vs non surveillees ;
- marques `core` non watchlist ;
- desalignement portefeuille / surveillance ;
- absence de recoupement si la watchlist manque.

### 7. `Critical Gaps`

Doit contenir :

- champs critiques manquants ;
- sections `[a verifier]` ;
- hypotheses provisoires ;
- blocages de renouvellement, owner, mandataire, titulaire ou surveillance.

### 8. `Decision Routing`

Le skill doit borner ses suites a un jeu ferme :

- `prepare-renewal-escalation`
- `prepare-watchlist-regularization`
- `prepare-portfolio-cleanup`
- `prepare-territory-review`
- `hold-for-registry-regularization`

### 9. `Human Validation`

Doit rappeler explicitement :

- validation humaine requise ;
- verification des bases publiques avant action ;
- validation mandataire / avocat / owner metier selon le cas.

## Dashboard HTML

Le dashboard reste une sortie secondaire de `report`, jamais un substitut au
rapport Markdown.

### Regles de declenchement

Le dashboard est genere si :

- `--dashboard` est demande ;
- ou le profil prefere `markdown-plus-dashboard` ;
- ou la taille du portefeuille rend la vue tableau nettement utile ;
- ou `dashboard-required` a ete derive.

### Regles de construction

- Reutiliser strictement `renderDashboard` de `@hacienda/core`.
- Ne pas introduire de HTML artisanal parallele.
- Le dashboard doit refleter les memes conclusions que le Markdown.
- Toute valeur douteuse reste marquee `[a verifier]`.
- Toute valeur provisoire reste marquee `[PROVISOIRE]`.

Le memo
`references/revue-portefeuille-marques-routing-and-output.md`
sert de support de construction.

## Intake de `audit`

`audit` reste un mode portefeuille, pas un effet secondaire du CRUD.

Le skill doit :

1. evaluer le `Portfolio Readiness Gate` ;
2. reperer les champs critiques manquants ;
3. classer les findings par severite ;
4. proposer des regularisations concretes ;
5. conclure par validation humaine.

## Sortie de `audit`

La sortie `audit` doit contenir au minimum :

1. `Portfolio Readiness Gate`
2. `Critical Findings`
3. `Severity`
4. `Regularization Actions`
5. `Human Validation`

Les findings doivent prioriser :

- renouvellements manquants ou incoherents ;
- actifs critiques sans owner ou mandataire ;
- territoires mal renseignes ;
- absence de surveillance sur des marques `core` ou `important` ;
- dates ou statuts incoherents.

## Modes CRUD secondaires

### `add`

`add` sert a inserer une nouvelle entree dans `portfolio.yaml`.

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
- rappeler qu'ajouter une entree ne depose ni ne renouvelle rien.

### `update`

`update` sert a corriger ou completer une entree existante.

Utilisation prioritaire :

- mise a jour de `dateRenouvellement` ;
- completude owner / mandataire ;
- regularisation de territoires ;
- mise en coherence avec la watchlist.

Rappeler que la mise a jour du registre interne ne vaut pas confirmation
office.

### `remove`

`remove` sert uniquement a retirer une entree du registre interne apres
confirmation explicite.

Exiger :

- confirmation de l'ID ;
- justification simple ;
- backup avant suppression.

Ne jamais presenter cette suppression comme une renonciation ou radiation
officielle.

### `list`

`list` sert a exposer le contenu du registre de maniere compacte.

Doit montrer :

- ID ;
- signe ;
- prochaine echeance ;
- niveau strategique ;
- owner ;
- statut.

`list` est informatif. Il ne remplace ni `report` ni `audit`.

## Frontieres explicites

- `recherche-anteriorite-marque` : premier passage recherche.
- `depot-marque-fr` : preparation de depot.
- `surveillance-marque` : monitoring publication / watchlist.
- `analyse-opposition-marque` : opposition INPI.
- `audit-pi-ma` : lecture transactionnelle multi-actifs.
- `portefeuille-pi` : lecture consolidee federée marques + brevets.

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

## Style de sortie

- Distinguer faits, analyse, gaps, decisions et validation humaine.
- Ne jamais presenter le registre comme une source officielle.
- Ne jamais masquer une donnee incertaine.
- Utiliser `[a verifier]` pour tout recoupement non fait.
- Utiliser `[PROVISOIRE]` si le profil est incomplet.
- Rester operationnel et concis.
