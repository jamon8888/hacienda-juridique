---
name: revue-portefeuille-brevets
version: "2.0.0"
description: >
  Hub portefeuille brevets V2 centré sur `report` et `audit`, avec dashboard
  HTML optionnel et priorisation des annuités, expirations et gaps de
  registre. Les modes `add`, `update`, `remove` et `list` restent disponibles
  comme maintenance secondaire du registre `portfolio-brevets.yaml`.
argument-hint: "[--report [--dashboard] | --audit | --add | --update | --remove | --list]"
---

# Skill - Revue portefeuille brevets V2

> **Hub portefeuille, pas registre officiel ni service annuités.**
> `revue-portefeuille-brevets` sert d'abord à produire un rapport
> portefeuille, auditer le registre interne et prioriser les annuités,
> expirations et régularisations. Il ne renouvelle pas les droits, ne paie pas
> les annuités, ne dépose pas de nouveau brevet et ne remplace pas un IPMS, un
> mandataire brevets ou un partenaire annuités.

Référence de travail utile :
`references/revue-portefeuille-brevets-routing-and-output.md`

## Positionnement

`revue-portefeuille-brevets` V2 est un skill de **pilotage portefeuille**.

Il sert d'abord à :

1. produire un rapport portefeuille exploitable ;
2. auditer la qualité du registre interne ;
3. prioriser annuités, expirations et régularisations ;
4. générer un dashboard HTML standardisé si le contexte le justifie ;
5. router vers la bonne suite de travail.

Il sert ensuite, de manière secondaire, à maintenir
`portfolio-brevets.yaml` via `add`, `update`, `remove` et `list`.

## Ce skill ne fait pas

- Ne paie pas les annuités.
- Ne renouvelle pas un brevet auprès de l'INPI, de l'OEB ou d'un office
  national.
- Ne dépose pas un nouveau brevet.
- Ne remplace pas un IPMS ou un partenaire annuités.
- Ne rend pas une confirmation officielle qu'une annuité est acquittée.
- Ne remplace pas `preparation-depot-brevet`,
  `strategie-extension-internationale`, `analyse-refus-inpi`,
  `anteriorite-invalidite`, `tableau-contrefacon-brevet` ou `audit-pi-ma`.

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

1. `~/.claude/extensions/config/hacienda-juridique/company-profile.md`
2. `~/.claude/extensions/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`
3. `~/.claude/extensions/config/hacienda-juridique/hacienda-propriete-intellectuelle/portfolio-brevets.yaml`
4. Optionnel :
   `~/.claude/extensions/config/hacienda-juridique/hacienda-propriete-intellectuelle/portfolio.yaml`

Si `portfolio-brevets.yaml` est absent, le créer avec :

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
- la posture maintenance brevets ;
- les mandataires EQE et mandataires locaux ;
- le partenaire annuités ;
- les domaines techniques ;
- la cadence de revue portefeuille ;
- le format de rapport préféré ;
- la cadence de recoupement registre interne / registres publics ;
- les approbateurs pour abandon, poursuite ou régularisation.

Si le profil contient encore `[A CONFIGURER]`, le skill peut fonctionner en
mode générique, mais chaque sortie doit être marquée `[PROVISOIRE]`.

## Registre interne, pas démarche officielle

Chaque sortie `report` ou `audit` doit rappeler en tête :

> **Registre interne, pas démarche officielle.** Ce rapport reflète l'état
> consigné dans `portfolio-brevets.yaml` à la date d'édition. Il ne remplace
> ni les registres INPI / OEB / nationaux, ni la confirmation de paiement des
> annuités, ni une notification officielle d'un office. Une annuité marquée
> "payée" dans le registre interne doit être recoupée avec la Base Brevets
> INPI, le registre OEB et, si besoin, les registres nationaux avant toute
> décision. Le paiement et le suivi effectif des annuités relèvent du
> mandataire brevets ou du partenaire annuités.

Toute information non recoupée reste marquée `[à vérifier]`.

## Contrat d'entrée V2 pour `report` et `audit`

Le skill doit expliciter ou dériver les dimensions suivantes :

- `portfolio_source_status`: `present`, `missing`, `partial`
- `annuity_visibility_status`: `clear`, `partial`, `blocked`
- `ownership_visibility_status`: `clear`, `partial`, `blocked`
- `cross_registry_status`: `available`, `missing`, `partial`
- `dashboard_mode`: `markdown-only`, `markdown-plus-dashboard`,
  `dashboard-required`
- `portfolio_readiness`: `ready`, `partial`, `blocked`

Bloc de faits minimum :

- `portfolio_path`
- `asset_count`
- `last_audit`
- `annuity_entries_present`
- `expiring_assets_present`
- `strategic_levels_present`
- `business_owner_coverage`
- `mandataire_coverage`
- `cross_reference_marques_status`

## Seuil de préparation du portefeuille

Le skill doit évaluer un `Seuil de préparation du portefeuille` pour `report` et `audit`.

Statuts :

- `ready`
- `partial`
- `blocked`

Passer en `ready` si :

- le registre existe ;
- les annuités sont suffisamment renseignées pour prioriser ;
- les owners et mandataires sont exploitables ;
- les conclusions portefeuille peuvent être routées proprement.

Passer en `partial` si :

- le registre existe mais reste incomplet ;
- certaines annuités, owners ou liens de famille restent `[à vérifier]` ;
- une priorisation partielle reste possible sans fausse certitude.

Passer en `blocked` si :

- le registre est absent et ne peut pas être cree proprement ;
- les annuités sont trop lacunaires pour produire une priorisation crédible ;
- les champs critiques de titularité, owner ou mandataire sont trop incomplets ;
- le recoupement registre / portefeuille est trop fragile pour soutenir une
  recommandation utile.

En `blocked`, produire un constat de blocage et une suite de régularisation,
pas un faux rapport portefeuille.

## Cadrage initial de `report`

Pour `report`, le skill doit :

1. charger le registre et le profil ;
2. calculer la prochaine annuité exploitable par actif ;
3. dériver la sévérité annuité ;
4. reperer les expirations et fins de cycle ;
5. contrôler couverture owner / mandataire / familles ;
6. recouper, si disponible, avec `portfolio.yaml` pour les marques associées ;
7. évaluer le `Seuil de préparation du portefeuille` ;
8. decider si le dashboard HTML est utile ou requis.

### Buckets annuités

Calculer `j_restants = dateEcheance - today`.

| Bucket | Jours restants | Lecture |
| --- | --- | --- |
| `critical` | `< 30 j` | urgence annuité |
| `watch` | `30 à 90 j` | à préparer ce trimestre |
| `plan` | `> 90 j et <= 180 j` | a planifier |
| `stable` | `> 180 j` | surveillance passive |
| `unknown` | donnée absente / incoherente | à vérifier |

## Sortie V2 de `report`

La sortie `report` doit rester fermée autour de 9 blocs :

1. `Synthèse du portefeuille`
2. `Seuil de préparation du portefeuille`
3. `Annuity Priority`
4. `Expirations And Lifecycle`
5. `Ownership And Coverage`
6. `Cross-Registry Signals`
7. `Critical Gaps`
8. `Routage de décision`
9. `Validation humaine`

### 1. `Synthèse du portefeuille`

Doit contenir au minimum :

- taille du portefeuille ;
- nombre de familles visibles ;
- posture maintenance ;
- dernier audit ;
- nombre d'actifs `core` / `important` / `standard` / `heritage`.

### 2. `Seuil de préparation du portefeuille`

Doit contenir :

- le statut `ready` / `partial` / `blocked` ;
- la raison courte ;
- le niveau de fiabilité général du registre.

### 3. `Annuity Priority`

Doit contenir :

- buckets critiques et à préparer ;
- annuités proches ;
- actifs orphelins ou ambigus ;
- rappel que registre interne != confirmation office.

### 4. `Expirations And Lifecycle`

Doit contenir :

- expirations proches ;
- fins de cycle ;
- besoins de succession, nouvelle famille ou continuation ;
- actifs `core` sans plan visible.

### 5. `Ownership And Coverage`

Doit contenir :

- titulaires / owners / mandataires manquants ;
- actifs critiques sans business owner ;
- incoherences de famille ou de couverture territoriale.

### 6. `Cross-Registry Signals`

Doit contenir :

- liens avec `portfolio.yaml` s'il existe ;
- marques `core` sans brevet associé ;
- brevets reliés à des marques incohérentes ou non en vigueur ;
- absence de recoupement si le registre marques manque.

### 7. `Critical Gaps`

Doit contenir :

- champs critiques manquants ;
- sections `[à vérifier]` ;
- hypothèses provisoires ;
- blocages d'annuité, titulaire, owner, mandataire ou famille.

### 8. `Routage de décision`

Le skill doit borner ses suites à un jeu fermé :

- `prepare-annuity-escalade`
- `prepare-portfolio-cleanup`
- `prepare-succession-review`
- `prepare-cross-registry-review`
- `hold-for-registry-regularization`

### 9. `Validation humaine`

Doit rappeler explicitement :

- validation humaine requise ;
- vérification des registres publics avant action ;
- validation mandataire / partenaire annuités / owner métier selon le cas.

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
`references/revue-portefeuille-brevets-routing-and-output.md`
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

- annuités manquantes ou incohérentes ;
- actifs critiques sans owner ou mandataire ;
- familles non reliees ;
- liens marques manquants ou douteux ;
- dates d'expiration ou de dépôt incohérentes.

## Modes CRUD secondaires

### `add`

`add` sert à inserer une nouvelle entrée dans `portfolio-brevets.yaml`.

Exiger au minimum :

- numéro ;
- type ;
- titre ;
- classificationCIB ;
- statut ;
- `dateDepot` ;
- `niveau_strategique` ;
- `business_owner` si actif `core` ou `important`.

Avant ecriture :

- valider le schema ;
- sauvegarder un backup horodate ;
- confirmer l'ID attribue ;
- rappeler qu'ajouter une entrée ne paie aucune annuité et ne cree aucun droit.

### `update`

`update` sert à corriger ou compléter une entrée existante.

Utilisation prioritaire :

- mise à jour de `prochaine_annuite` ;
- completude owner / mandataire ;
- régularisation de famille ;
- liaison marques associées.

Rappeler que la mise à jour du registre interne ne vaut pas confirmation
office.

### `remove`

`remove` sert uniquement à retirer une entrée du registre interne après
confirmation explicite.

Exiger :

- confirmation de l'ID ;
- justification simple ;
- backup avant suppression.

Ne jamais présenter cette suppression comme un abandon officiel de droit.

### `list`

`list` sert à exposer le contenu du registre de manière compacte.

Doit montrer :

- ID ;
- numéro ;
- titre ;
- prochaine annuité ;
- niveau stratégique ;
- owner ;
- statut.

`list` est informatif. Il ne remplace ni `report` ni `audit`.

## Frontieres explicites

- `preparation-depot-brevet` : préparation technique de dépôt.
- `strategie-extension-internationale` : arbitrage territorial et
  sequencement.
- `analyse-refus-inpi` : réponse à notification office.
- `anteriorite-invalidite` : validité offensive ou défensive d'un brevet
  adverse.
- `tableau-contrefacon-brevet` : tableau de contrefaçon offensif.
- `audit-pi-ma` : lecture transactionnelle multi-actifs.
- `portefeuille-pi` : lecture consolidée fédérée marques + brevets.

## Emplacement de sortie

Ecrire les livrables dans :

`~/.claude/extensions/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/`

Format attendu :

- Markdown :
  `portefeuille-brevets-YYYY-MM-DD.md`
- HTML si dashboard :
  `portefeuille-brevets-YYYY-MM-DD.html`
- Audit court :
  `portefeuille-brevets-audit-YYYY-MM-DD.md`

## Style de sortie

- Distinguer faits, analyse, gaps, décisions et validation humaine.
- Ne jamais présenter le registre comme une source officielle.
- Ne jamais masquer une donnée incertaine.
- Utiliser `[à vérifier]` pour tout recoupement non fait.
- Utiliser `[PROVISOIRE]` si le profil est incomplet.
- Rester opérationnel et concis.
