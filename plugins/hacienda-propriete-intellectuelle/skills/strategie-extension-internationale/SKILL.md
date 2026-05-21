---
name: strategie-extension-internationale
version: "2.0.0"
description: >
  Skill V2 de decision territoriale et de sequencement pour l'extension
  d'un brevet FR initial vers FR seul, EP, PCT ou une route sequentielle.
  Il ferme le gate de readiness, clarifie marche/budget/priorite, et rend
  une route fermee sans devenir un orchestrateur de portefeuille.
argument-hint: "[FR2700123 | marches cibles | budget 12m/10y | posture maintenance]"
---

# /strategie-extension-internationale

> **Décision territoriale et séquencement, pas démarche officielle.**
> `strategie-extension-internationale` aide a arbitrer FR seul, EP, PCT ou
> une route sequentielle a partir d'un brevet FR initial. Il ne depose pas
> les demandes, ne paie pas les taxes, ne traduit pas les revendications et
> ne devient pas un orchestrateur de portefeuille. La validation formelle
> reste du ressort d'un mandataire en brevets qualifie EQE ou d'un avocat
> specialise.

Reference de travail utile :
`references/strategie-extension-internationale-routing-and-output.md`

## Positionnement

`strategie-extension-internationale` est la brique V2 territoriale et de
sequencement du plugin PI.

Il sert a :

1. cadrer le brevet FR initial, la fenetre de priorite et les marches cibles ;
2. clarifier les contraintes de budget et de maintenance annuitaire ;
3. poser un `Extension Readiness Gate` explicite ;
4. comparer les routes FR / EP / PCT / sequence ;
5. conclure par une seule route fermee.

Il ne sert pas a :

- rediger un dossier de depot ;
- deposer une demande EP ou PCT ;
- arbitrer la validite d'un brevet adverse ;
- construire un claim chart de contrefacon ;
- piloter un portefeuille brevets complet.

## Charger le profil pratique avant de commencer

Avant tout, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Récupérer :

- **Rôle** depuis `## 1. Profil cabinet et profil de pratique PI` ;
- **Juridictions et offices d'inscription** (INPI, OEB, OMPI/PCT) ;
- **Mandataire en brevets associé** depuis `## Brevets` ;
- **Posture extension** ;
- **Budget annuel R&D / PI cabinet** ou budget famille brevet ;
- **Marchés stratégiques principaux** ;
- **Partenaire annuités** depuis `## Brevets`.

Si le profil contient `[A CONFIGURER]`, ou si un point critique manque :

- appliquer des défauts conservateurs ;
- taguer les hypothèses sensibles `[PROVISOIRE]` ;
- taguer chaque point non vérifié `[a verifier]` ;
- ne pas surpromettre la clarté de marche, de budget ou de priorite.

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
  jamais go de dépôt et doit déboucher sur une escalation explicite vers
  mandataire EQE / avocat PI ;
- le rôle doit donc influencer le `Human Validation` final et, si besoin, le
  niveau de prudence du gate.

## Intake V2

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
  - `defensive`
  - `unknown`
- `filing_baseline_status` :
  - `confirmed-fr-base`
  - `partial-fr-base`
  - `unclear-fr-base`

Interpretation attendue de `priority_window_status` :

- `open-safe` : la fenetre de priorite reste exploitable sans tension
  immediate sur le calendrier de brief et de validation mandataire ;
- `open-tight` : la fenetre reste juridiquement ouverte mais le calendrier est
  deja tendu et doit pousser par defaut vers `hold-priority-risk` ;
- `expired` : la priorite est depassee ou perdue ;
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

Obtention attendue des faits d'entree :

- si `fr_initial_reference` est exploitable, utiliser `inpi_brevet_details`
  pour recuperer au minimum la date de depot FR, la date de priorite si elle
  existe, le statut et les elements de base du titre ;
- si l'outil ne repond pas ou si un champ critique manque, demander a
  l'utilisateur la date de depot FR, le statut, les marches cibles, la
  posture budget et la posture maintenance, puis taguer chaque valeur
  `[utilisateur fourni]` ;
- si `fr_initial_filing_date` ou `priority_deadline_date` restent inferes sans
  verification, les marquer `[a verifier]` avant toute recommandation.

## Extension Readiness Gate

Le skill doit introduire un `Extension Readiness Gate` au debut du
raisonnement.

Statuts :

- `ready`
- `partial`
- `blocked`

### Ready

Utiliser `ready` si :

- la date de depot / priorite est connue ;
- la base FR est suffisamment claire ;
- les marches cibles sont exploitables ;
- le budget est connu ou assez borne pour orienter la recommandation.

### Partial

Utiliser `partial` si :

- un ou deux elements sont incomplets ;
- une recommandation provisoire reste possible ;
- l'analyse doit signaler explicitement les hypotheses `[a verifier]`.

### Blocked

Utiliser `blocked` si :

- la fenetre de priorite est inconnue ou inexploitable ;
- la base FR est trop incertaine ;
- les marches cibles sont trop flous ;
- le budget est absent alors qu'il conditionne directement le choix de route.

En `blocked`, le skill ne doit pas sur-conclure. Il doit router vers une
clarification ou une escalation mandataire.

Regles de routage prioritaires :

- si `priority_window_status = open-tight`, prioriser `hold-priority-risk`
  sauf si l'analyse se borne a une escalation immediate vers le mandataire ;
- si `priority_window_status = expired`, router vers `hold-priority-risk`
  et interdire une recommandation positive EP ou PCT non qualifiee ;
- si `filing_baseline_status = unclear-fr-base`, ne pas emettre de route
  longue sans mention explicite `[PROVISOIRE]` et `[a verifier]`.
- si le rôle est `non-juriste`, ou si le mandataire brevets n'est pas
  clairement identifié, la sortie ne peut pas valoir go autonome et doit
  imposer une escalation explicite dans `Human Validation`.

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
  - clarification marche avant arbitrage territorial.
- `hold-for-budget-clarification`
  - clarification budget avant arbitrage territorial.
- `hold-priority-risk`
  - risque de priorite ou d'echeance trop eleve pour arbitrer sereinement.

## Output contract

La sortie V2 doit etre stabilisee en 9 blocs.

Chaque livrable genere doit :

- reafficher en tete qu'il s'agit d'une **decision territoriale et de
  sequencement, pas d'une demarche officielle** ;
- expliciter la provenance des faits critiques
  (`INPI Data`, `utilisateur fourni`, `profil pratique`, ou `[a verifier]`) ;
- conserver visibles les incertitudes `[PROVISOIRE]` et `[a verifier]`.
- distinguer explicitement :
  - faits ;
  - droit ;
  - analyse ;
  - incertitudes ;
  - decisions ;
  - validation humaine.
- integrer, dans `Human Validation`, l'escalade mandataire si le rôle est
  `non-juriste` ou si le support EQE / avocat PI n'est pas clairement
  identifié.

### Bloc 1 - `Case Snapshot`

- reference FR ;
- date de depot / priorite ;
- statut de base ;
- marche vise ;
- posture budget ;
- posture maintenance.

### Bloc 2 - `Priority Window and Baseline`

- fenetre de priorite ;
- niveau d'urgence ;
- qualite de la base FR ;
- consequences d'un depassement ou d'une incertitude.

### Bloc 3 - `Target Market Posture`

- zones visees ;
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
- exposition cout / annuites ;
- contrainte de calendrier.

### Bloc 5 - `Cost and Maintenance Pressure`

- cout initial relatif ;
- cout de maintien relatif ;
- pression d'annuites ;
- soutenabilite de la voie au regard de la posture maintenance.

Ce bloc reste un facteur de decision, pas une sortie portefeuille complete.

### Bloc 6 - `Primary Recommendation`

- voie principale ;
- justification factuelle courte ;
- cohérence avec la fenetre, le marche et le budget.

### Bloc 7 - `Fallback Paths`

- alternatives bornees si le budget se resserre ;
- alternatives bornees si la priorite se tend ;
- alternatives bornees si les marches changent ;
- alternatives bornees si la base FR doit etre consolidee.

### Bloc 8 - `Decision Routing`

- une seule route finale ;
- justification resserree ;
- 2 a 4 actions concretes ;
- aucune route concurrente ouverte.

Le routing doit etre ferme sur :
- `stay-fr-only`
- `prepare-ep-route`
- `prepare-pct-route`
- `prepare-sequenced-route`
- `hold-for-market-clarification`
- `hold-for-budget-clarification`
- `hold-priority-risk`

Le skill ne doit pas emettre d'autres issues implicites.

### Bloc 9 - `Human Validation`

- points a faire valider par le mandataire ;
- chiffres `[a verifier]` ;
- decisions non automatisables ;
- limites de la recommandation.
- si le rôle est `non-juriste`, inclure explicitement le brief d'escalade
  vers mandataire EQE / avocat PI avant toute suite operative.

## Closed Decision Routing values

Le skill doit conclure avec une seule valeur :

- `stay-fr-only`
- `prepare-ep-route`
- `prepare-pct-route`
- `prepare-sequenced-route`
- `hold-for-market-clarification`
- `hold-for-budget-clarification`
- `hold-priority-risk`

## Routing boundaries

Rerouter si le besoin principal devient :

- `recherche-anteriorite-brevet`
  - besoin principal = premier passage prior art.
- `preparation-depot-brevet`
  - besoin principal = brief de depot ou preparation redactionnelle.
- `anteriorite-invalidite`
  - besoin principal = validite d'un brevet adverse.
- `tableau-contrefacon-brevet`
  - besoin principal = comparaison revendications / produit.
- `analyse-refus-inpi`
  - besoin principal = reponse a notification de prosecution.
- `revue-portefeuille-brevets`
  - besoin principal = consolidation, suivi ou pilotage d'un portefeuille
    de brevets.

## Output location

Ecrire le document Markdown produit dans :

```text
~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/extension-<brevet>-YYYY-MM-DD.md
```

où `<brevet>` est le numéro normalisé et `YYYY-MM-DD` la date du jour.
Si le dossier n'existe pas, le créer. Si un fichier du même nom existe déjà,
suffixer `-v2`, `-v3`, etc. Ne jamais écraser silencieusement une analyse
précédente.

## Ce que ce skill NE fait PAS

- deposer EP ou PCT ;
- payer les taxes officielles ;
- traduire les revendications ;
- choisir a la place du mandataire la strategie juridique formelle ;
- gerer un portefeuille brevet complet ;
- construire une analyse d'invalidite ;
- construire un claim chart ;
- remplacer la validation humaine.

## Ton

- **Strategique** : presenter la valeur territoriale autant que le cout.
- **Factuel** : chiffres indicatifs, toujours borne par `[a verifier]` quand
  le barème n'a pas ete confirme.
- **Calibré** : un mandataire ou une direction doit arbitrer vite.
- **Honnête sur l'incertitude** : si le profil ou les chiffres manquent,
  le dire sans masquer le vide.
