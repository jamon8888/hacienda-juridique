---
name: revue-portefeuille-brevets
version: "2.0.0"
description: >
  Hub portefeuille brevets V2 centre sur `report` et `audit`, avec dashboard
  HTML optionnel et priorisation des annuites, expirations et gaps de
  registre. Les modes `add`, `update`, `remove` et `list` restent disponibles
  comme maintenance secondaire du registre `portfolio-brevets.yaml`.
argument-hint: "[--report [--dashboard] | --audit | --add | --update | --remove | --list]"
---

# Skill - Revue portefeuille brevets V2

> **Hub portefeuille, pas registre officiel ni service annuites.**
> `revue-portefeuille-brevets` sert d'abord a produire un rapport
> portefeuille, auditer le registre interne et prioriser les annuites,
> expirations et regularisations. Il ne renouvelle pas les droits, ne paie pas
> les annuites, ne depose pas de nouveau brevet et ne remplace pas un IPMS, un
> mandataire brevets ou un partenaire annuites.

Reference de travail utile :
`references/revue-portefeuille-brevets-routing-and-output.md`

## Positionnement

`revue-portefeuille-brevets` V2 est un skill de **pilotage portefeuille**.

Il sert d'abord a :

1. produire un rapport portefeuille exploitable ;
2. auditer la qualite du registre interne ;
3. prioriser annuites, expirations et regularisations ;
4. generer un dashboard HTML standardise si le contexte le justifie ;
5. router vers la bonne suite de travail.

Il sert ensuite, de maniere secondaire, a maintenir
`portfolio-brevets.yaml` via `add`, `update`, `remove` et `list`.

## Ce skill ne fait pas

- Ne paie pas les annuites.
- Ne renouvelle pas un brevet aupres de l'INPI, de l'OEB ou d'un office
  national.
- Ne depose pas un nouveau brevet.
- Ne remplace pas un IPMS ou un partenaire annuites.
- Ne rend pas une confirmation officielle qu'une annuite est acquittee.
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

Les modes CRUD maintiennent le registre, mais ne redefinissent pas la promesse
principale du skill, qui reste `report` / `audit`.

## Chargement du profil pratique et du registre

Avant tout travail, lire dans cet ordre :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`
3. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/portfolio-brevets.yaml`
4. Optionnel :
   `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/portfolio.yaml`

Si `portfolio-brevets.yaml` est absent, le creer avec :

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
- la posture maintenance brevets ;
- les mandataires EQE et mandataires locaux ;
- le partenaire annuites ;
- les domaines techniques ;
- la cadence de revue portefeuille ;
- le format de rapport prefere ;
- la cadence de recoupement registre interne / registres publics ;
- les approbateurs pour abandon, poursuite ou regularisation.

Si le profil contient encore `[A CONFIGURER]`, le skill peut fonctionner en
mode generique, mais chaque sortie doit etre marquee `[PROVISOIRE]`.

## Registre interne, pas demarche officielle

Chaque sortie `report` ou `audit` doit rappeler en tete :

> **Registre interne, pas demarche officielle.** Ce rapport reflete l'etat
> consigne dans `portfolio-brevets.yaml` a la date d'edition. Il ne remplace
> ni les registres INPI / OEB / nationaux, ni la confirmation de paiement des
> annuites, ni une notification officielle d'un office. Une annuite marquee
> "payee" dans le registre interne doit etre recoupee avec la Base Brevets
> INPI, l'OEB Register et, si besoin, les registres nationaux avant toute
> decision. Le paiement et le suivi effectif des annuites relevent du
> mandataire brevets ou du partenaire annuites.

Toute information non recoupee reste marquee `[a verifier]`.

## Contrat d'entree V2 pour `report` et `audit`

Le skill doit expliciter ou deriver les dimensions suivantes :

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

## Portfolio Readiness Gate

Le skill doit evaluer un `Portfolio Readiness Gate` pour `report` et `audit`.

Statuts :

- `ready`
- `partial`
- `blocked`

Passer en `ready` si :

- le registre existe ;
- les annuites sont suffisamment renseignees pour prioriser ;
- les owners et mandataires sont exploitables ;
- les conclusions portefeuille peuvent etre routees proprement.

Passer en `partial` si :

- le registre existe mais reste incomplet ;
- certaines annuites, owners ou liens de famille restent `[a verifier]` ;
- une priorisation partielle reste possible sans fausse certitude.

Passer en `blocked` si :

- le registre est absent et ne peut pas etre cree proprement ;
- les annuites sont trop lacunaires pour produire une priorisation credible ;
- les champs critiques de titularite, owner ou mandataire sont trop incomplets ;
- le recoupement registre / portefeuille est trop fragile pour soutenir une
  recommandation utile.

En `blocked`, produire un constat de blocage et une suite de regularisation,
pas un faux rapport portefeuille.

## Intake de `report`

Pour `report`, le skill doit :

1. charger le registre et le profil ;
2. calculer la prochaine annuite exploitable par actif ;
3. deriver la severite annuite ;
4. reperer les expirations et fins de cycle ;
5. controler couverture owner / mandataire / familles ;
6. recouper, si disponible, avec `portfolio.yaml` pour les marques associees ;
7. evaluer le `Portfolio Readiness Gate` ;
8. decider si le dashboard HTML est utile ou requis.

### Buckets annuites

Calculer `j_restants = dateEcheance - today`.

| Bucket | Jours restants | Lecture |
| --- | --- | --- |
| `critical` | `< 30 j` | urgence annuite |
| `watch` | `30 a 90 j` | a preparer ce trimestre |
| `plan` | `> 90 j et <= 180 j` | a planifier |
| `stable` | `> 180 j` | surveillance passive |
| `unknown` | donnee absente / incoherente | a verifier |

## Sortie V2 de `report`

La sortie `report` doit rester fermee autour de 9 blocs :

1. `Portfolio Snapshot`
2. `Portfolio Readiness Gate`
3. `Annuity Priority`
4. `Expirations And Lifecycle`
5. `Ownership And Coverage`
6. `Cross-Registry Signals`
7. `Critical Gaps`
8. `Decision Routing`
9. `Human Validation`

### 1. `Portfolio Snapshot`

Doit contenir au minimum :

- taille du portefeuille ;
- nombre de familles visibles ;
- posture maintenance ;
- dernier audit ;
- nombre d'actifs `core` / `important` / `standard` / `heritage`.

### 2. `Portfolio Readiness Gate`

Doit contenir :

- le statut `ready` / `partial` / `blocked` ;
- la raison courte ;
- le niveau de fiabilite general du registre.

### 3. `Annuity Priority`

Doit contenir :

- buckets critiques et a preparer ;
- annuites proches ;
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
- marques `core` sans brevet associe ;
- brevets relies a des marques incoherentes ou non en vigueur ;
- absence de recoupement si le registre marques manque.

### 7. `Critical Gaps`

Doit contenir :

- champs critiques manquants ;
- sections `[a verifier]` ;
- hypotheses provisoires ;
- blocages d'annuite, titulaire, owner, mandataire ou famille.

### 8. `Decision Routing`

Le skill doit borner ses suites a un jeu ferme :

- `prepare-annuity-escalation`
- `prepare-portfolio-cleanup`
- `prepare-succession-review`
- `prepare-cross-registry-review`
- `hold-for-registry-regularization`

### 9. `Human Validation`

Doit rappeler explicitement :

- validation humaine requise ;
- verification des registres publics avant action ;
- validation mandataire / partenaire annuites / owner metier selon le cas.

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
`references/revue-portefeuille-brevets-routing-and-output.md`
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

- annuites manquantes ou incoherentes ;
- actifs critiques sans owner ou mandataire ;
- familles non reliees ;
- liens marques manquants ou douteux ;
- dates d'expiration ou de depot incoherentes.

## Modes CRUD secondaires

### `add`

`add` sert a inserer une nouvelle entree dans `portfolio-brevets.yaml`.

Exiger au minimum :

- numero ;
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
- rappeler qu'ajouter une entree ne paie aucune annuite et ne cree aucun droit.

### `update`

`update` sert a corriger ou completer une entree existante.

Utilisation prioritaire :

- mise a jour de `prochaine_annuite` ;
- completude owner / mandataire ;
- regularisation de famille ;
- liaison marques associees.

Rappeler que la mise a jour du registre interne ne vaut pas confirmation
office.

### `remove`

`remove` sert uniquement a retirer une entree du registre interne apres
confirmation explicite.

Exiger :

- confirmation de l'ID ;
- justification simple ;
- backup avant suppression.

Ne jamais presenter cette suppression comme un abandon officiel de droit.

### `list`

`list` sert a exposer le contenu du registre de maniere compacte.

Doit montrer :

- ID ;
- numero ;
- titre ;
- prochaine annuite ;
- niveau strategique ;
- owner ;
- statut.

`list` est informatif. Il ne remplace ni `report` ni `audit`.

## Frontieres explicites

- `preparation-depot-brevet` : preparation technique de depot.
- `strategie-extension-internationale` : arbitrage territorial et
  sequencement.
- `analyse-refus-inpi` : reponse a notification office.
- `anteriorite-invalidite` : validite offensive ou defensive d'un brevet
  adverse.
- `tableau-contrefacon-brevet` : claim chart offensif.
- `audit-pi-ma` : lecture transactionnelle multi-actifs.
- `portefeuille-pi` : lecture consolidee federée marques + brevets.

## Emplacement de sortie

Ecrire les livrables dans :

`~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/`

Format attendu :

- Markdown :
  `portefeuille-brevets-YYYY-MM-DD.md`
- HTML si dashboard :
  `portefeuille-brevets-YYYY-MM-DD.html`
- Audit court :
  `portefeuille-brevets-audit-YYYY-MM-DD.md`

## Style de sortie

- Distinguer faits, analyse, gaps, decisions et validation humaine.
- Ne jamais presenter le registre comme une source officielle.
- Ne jamais masquer une donnee incertaine.
- Utiliser `[a verifier]` pour tout recoupement non fait.
- Utiliser `[PROVISOIRE]` si le profil est incomplet.
- Rester operationnel et concis.
