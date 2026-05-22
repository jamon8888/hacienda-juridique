---
name: strategie-extension-internationale
version: "2.0.0"
description: >
  Skill V2 de décision territoriale et de sequencement pour l'extension
  d'un brevet FR initial vers FR seul, EP, PCT ou une route sequentielle.
  Il ferme le seuil de préparation, clarifie marché/budget/priorité, et rend
  une route fermée sans devenir un orchestrateur de portefeuille.
argument-hint: "[FR2700123 | marchés cibles | budget 12m/10y | posture maintenance]"
---

# /stratégie-extension-internationale

> **Décision territoriale et séquencement, pas démarché officielle.**
> `strategie-extension-internationale` aide à arbitrer FR seul, EP, PCT ou
> une route séquentielle à partir d'un brevet FR initial. Il ne dépose pas
> les demandes, ne paie pas les taxes, ne traduit pas les revendications et
> ne devient pas un orchestrateur de portefeuille. La validation formelle
> reste du ressort d'un mandataire en brevets qualifié EQE ou d'un avocat
> spécialisé.

Référence de travail utile :
`references/strategie-extension-internationale-routing-and-output.md`

## Positionnement

`strategie-extension-internationale` est la brique V2 territoriale et de
sequencement du extension PI.

Il sert à :

1. cadrer le brevet FR initial, la fenêtre de priorité et les marchés cibles ;
2. clarifier les contraintes de budget et de maintenance annuitaire ;
3. poser un `Seuil de préparation de l'extension` explicite ;
4. comparer les routes FR / EP / PCT / sequence ;
5. conclure par une seule route fermée.

Il ne sert pas a :

- rédiger un dossier de dépôt ;
- déposer une demande EP ou PCT ;
- arbitrer la validité d'un brevet adverse ;
- construire un tableau de contrefaçon de contrefaçon ;
- piloter un portefeuille brevets complet.

## Charger le profil pratique avant de commencer

Avant tout, lire :

1. `~/.claude/extensions/config/hacienda-juridique/company-profile.md`
2. `~/.claude/extensions/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Récupérer :

- **Rôle** depuis `## 1. Profil cabinet et profil de pratique PI` ;
- **Juridictions et offices d'inscription** (INPI, OEB, OMPI/PCT) ;
- **Mandataire en brevets associé** depuis `## Brevets` ;
- **Posture d'extension** ;
- **Budget annuel R&D / PI cabinet** ou budget famille brevet ;
- **Marchés stratégiques principaux** ;
- **Partenaire annuités** depuis `## Brevets`.

Si le profil contient `[A CONFIGURER]`, ou si un point critique manque :

- appliquer des défauts conservateurs ;
- taguer les hypothèses sensibles `[PROVISOIRE]` ;
- taguer chaque point non vérifié `[à vérifier]` ;
- ne pas surpromettre la clarté de marché, de budget ou de priorité.

Défauts conservateurs :

- rôle = avocat inscrit ;
- posture = sélective ;
- marchés = EU + US par défaut ;
- budget = non communiqué tant que non fourni ;
- séquencement = pas de route large si la fenêtre de priorité est incertaine.

Usage du rôle dans ce skill :

- si le rôle est `non-juriste`, ou si aucun mandataire brevets identifiable
  n'est rattaché au dossier, la sortie doit rester préparatoire ;
- dans ce cas, la recommandation territoriale reste possible mais ne vaut
  jamais feu vert de dépôt et doit déboucher sur une escalade explicite vers
  mandataire EQE / avocat PI ;
- le rôle doit donc influencer le `Validation humaine` final et, si besoin, le
  niveau de prudence du seuil.

## Cadrage initial V2

Le skill doit expliciter ou dériver, sans ping-pong question par question :

- `priority_window_status` :
  - `open-safe`
  - `open-tight`
  - `expired`
  - `unknown`
- `territory_posture` :
  - `fr-only`
  - `eu-focused`
  - `global-flex`
  - `named-countries`
- `market_profile` :
  - `local`
  - `regional`
  - `transatlantic`
  - `global`
  - `unclear`
- `budget_posture` :
  - `tight`
  - `moderate`
  - `broad`
  - `unknown`
- `maintenance_posture` :
  - `systematic`
  - `selective`
  - `défensive`
  - `unknown`
- `filing_baseline_status` :
  - `confirmed-fr-base`
  - `partial-fr-base`
  - `unclear-fr-base`

Interpretation attendue de `priority_window_status` :

- `open-safe` : la fenêtre de priorité reste exploitable sans tension
  immédiate sur le calendrier de brief et de validation mandataire ;
- `open-tight` : la fenêtre reste juridiquement ouverte mais le calendrier est
  déjà tendu et doit pousser par défaut vers `hold-priority-risk` ;
- `expired` : la priorité est depassee ou perdue ;
- `unknown` : la date utile n'est pas assez fiable pour arbitrer.

Bloc de faits minimum :

- `fr_initial_reference`
- `fr_initial_filing_date`
- `priority_deadline_date`
- `territories_targeted`
- `market_priority_assumption`
- `budget_12m_estimate`
- `budget_10y_estimate`
- `maintenance_posture`
- `known_launch_or_disclosure_constraints`
- `profile_practice_context`

Obtention attendue des faits d'entrée :

- si `fr_initial_reference` est exploitable, utiliser `inpi_brevet_details`
  pour recuperer au minimum la date de dépôt FR, la date de priorité si elle
  existe, le statut et les éléments de base du titre ;
- si l'outil ne repond pas ou si un champ critique manque, demander a
  l'utilisateur la date de dépôt FR, le statut, les marchés cibles, la
  posture budget et la posture maintenance, puis taguer chaque valeur
  `[utilisateur fourni]` ;
- si `fr_initial_filing_date` ou `priority_deadline_date` restent inferes sans
  vérification, les marquer `[à vérifier]` avant toute recommandation.

## Seuil de préparation de l'extension

Le skill doit introduire un `Seuil de préparation de l'extension` au debut du
raisonnement.

Statuts :

- `ready`
- `partial`
- `blocked`

### Ready

Utiliser `ready` si :

- la date de dépôt / priorité est connue ;
- la base FR est suffisamment claire ;
- les marchés cibles sont exploitables ;
- le budget est connu ou assez borné pour orienter la recommandation.

### Partial

Utiliser `partial` si :

- un ou deux éléments sont incomplets ;
- une recommandation provisoire reste possible ;
- l'analyse doit signaler explicitement les hypothèses `[à vérifier]`.

### Blocked

Utiliser `blocked` si :

- la fenêtre de priorité est inconnue ou inexploitable ;
- la base FR est trop incertaine ;
- les marchés cibles sont trop flous ;
- le budget est absent alors qu'il conditionne directement le choix de route.

En `blocked`, le skill ne doit pas sur-conclure. Il doit router vers une
clarification ou une escalade mandataire.

Règles de routage prioritaires :

- si `priority_window_status = open-tight`, prioriser `hold-priority-risk`
  sauf si l'analyse se borné à une escalade immédiate vers le mandataire ;
- si `priority_window_status = expired`, router vers `hold-priority-risk`
  et interdire une recommandation positive EP ou PCT non qualifiée ;
- si `filing_baseline_status = unclear-fr-base`, ne pas emettre de route
  longue sans mention explicite `[PROVISOIRE]` et `[à vérifier]`.
- si le rôle est `non-juriste`, ou si le mandataire brevets n'est pas
  clairement identifié, la sortie ne peut pas valoir go autonome et doit
  imposer une escalade explicite dans `Validation humaine`.

## Territorial and sequencing routes

Le skill compare seulement des routes territoriales ou sequentielles :

- `stay-fr-only`
  - maintien en FR seul.
- `prepare-ep-route`
  - route EP directe ou EP clairement preferee.
- `prepare-pct-route`
  - route PCT directe ou PCT clairement preferee.
- `prepare-sequenced-route`
  - route FR puis EP, ou FR puis PCT, quand le gel temporel est utile.
- `hold-for-market-clarification`
  - clarification marché avant arbitrage territorial.
- `hold-for-budget-clarification`
  - clarification budget avant arbitrage territorial.
- `hold-priority-risk`
  - risque de priorité ou d'échéance trop eleve pour arbitrer sereinement.

## Contrat de sortie

La sortie V2 doit être stabilisée en 9 blocs.

Chaque livrable genere doit :

- réafficher en tête qu'il s'agit d'une **décision territoriale et de
  sequencement, pas d'une démarche officielle** ;
- expliciter la provenance des faits critiques
  (`INPI Data`, `utilisateur fourni`, `profil pratique`, ou `[à vérifier]`) ;
- conserver visibles les incertitudes `[PROVISOIRE]` et `[à vérifier]`.
- distinguer explicitement :
  - faits ;
  - droit ;
  - analyse ;
  - incertitudes ;
  - décisions ;
  - validation humaine.
- integrer, dans `Validation humaine`, l'escalade mandataire si le rôle est
  `non-juriste` ou si le support EQE / avocat PI n'est pas clairement
  identifié.

### Bloc 1 - `Synthèse du dossier`

- référence FR ;
- date de dépôt / priorité ;
- statut de base ;
- marché visé ;
- posture budget ;
- posture maintenance.

### Bloc 2 - `Priority Window and Baseline`

- fenêtre de priorité ;
- niveau d'urgence ;
- qualité de la base FR ;
- conséquences d'un depassement ou d'une incertitude.

### Bloc 3 - `Target Market Posture`

- zones visées ;
- intensite de besoin de couverture ;
- horizon commercial ;
- incoherences eventuelles entre ambition geographique et budget.

### Bloc 4 - `Route Comparison`

- `FR only`
- `EP`
- `PCT`
- `sequenced`

avec, pour chaque voie :
- pertinence dans le cas ;
- flexibilite ;
- complexite ;
- exposition coût / annuités ;
- contrainte de calendrier.

### Bloc 5 - `Cost and Maintenance Pressure`

- coût initial relatif ;
- coût de maintien relatif ;
- pression d'annuités ;
- soutenabilite de la voie au regard de la posture maintenance.

Ce bloc reste un facteur de décision, pas une sortie portefeuille complète.

### Bloc 6 - `Primary Recommendation`

- voie principale ;
- justification factuelle courte ;
- cohérence avec la fenêtre, le marché et le budget.

### Bloc 7 - `Fallback Paths`

- alternatives bornées si le budget se resserre ;
- alternatives bornées si la priorité se tend ;
- alternatives bornées si les marchés changent ;
- alternatives bornées si la base FR doit être consolidée.

### Bloc 8 - `Routage de décision`

- une seule route finale ;
- justification resserree ;
- 2 à 4 actions concrètes ;
- aucune route concurrente ouverte.

Le routing doit être fermé sur :
- `stay-fr-only`
- `prepare-ep-route`
- `prepare-pct-route`
- `prepare-sequenced-route`
- `hold-for-market-clarification`
- `hold-for-budget-clarification`
- `hold-priority-risk`

Le skill ne doit pas emettre d'autres issues implicites.

### Bloc 9 - `Validation humaine`

- points à faire valider par le mandataire ;
- chiffres `[à vérifier]` ;
- décisions non automatisables ;
- limites de la recommandation.
- si le rôle est `non-juriste`, inclure explicitement le brief d'escalade
  vers mandataire EQE / avocat PI avant toute suite operative.

## Closed Routage de décision values

Le skill doit conclure avec une seule valeur :

- `stay-fr-only`
- `prepare-ep-route`
- `prepare-pct-route`
- `prepare-sequenced-route`
- `hold-for-market-clarification`
- `hold-for-budget-clarification`
- `hold-priority-risk`

## Limites de routage

Rerouter si le besoin principal devient :

- `recherche-anteriorite-brevet`
  - besoin principal = premier passage prior art.
- `preparation-depot-brevet`
  - besoin principal = brief de dépôt ou préparation redactionnelle.
- `anteriorite-invalidite`
  - besoin principal = validité d'un brevet adverse.
- `tableau-contrefacon-brevet`
  - besoin principal = comparaison revendications / produit.
- `analyse-refus-inpi`
  - besoin principal = réponse à notification de prosecution.
- `revue-portefeuille-brevets`
  - besoin principal = consolidation, suivi ou pilotage d'un portefeuille
    de brevets.

## Emplacement de sortie

Ecrire le document Markdown produit dans :

```text
~/.claude/extensions/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/extension-<brevet>-YYYY-MM-DD.md
```

où `<brevet>` est le numéro normalisé et `YYYY-MM-DD` la date du jour.
Si le dossier n'existe pas, le créer. Si un fichier du même nom existe déjà,
suffixer `-v2`, `-v3`, etc. Ne jamais écraser silencieusement une analyse
précédente.

## Ce que ce skill NE fait PAS

- déposer EP ou PCT ;
- payer les taxes officielles ;
- traduire les revendications ;
- choisir à la place du mandataire la stratégie juridique formelle ;
- gerer un portefeuille brevet complet ;
- construire une analyse d'invalidité ;
- construire un tableau de contrefaçon ;
- remplacer la validation humaine.

## Ton

- **Stratégique** : présenter la valeur territoriale autant que le coût.
- **Factuel** : chiffres indicatifs, toujours borné par `[à vérifier]` quand
  le barème n'a pas été confirmé.
- **Calibré** : un mandataire ou une direction doit arbitrer vite.
- **Honnête sur l'incertitude** : si le profil ou les chiffres manquent,
  le dire sans masquer le vide.
