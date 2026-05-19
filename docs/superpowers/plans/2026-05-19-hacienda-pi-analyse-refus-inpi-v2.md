# Hacienda PI analyse-refus-inpi V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recentrer `analyse-refus-inpi` comme skill V2 bi-office `INPI` / `OEB` de reponse a notification, avec `Response Readiness Gate` et decision procedurale bornee.

**Architecture:** Le lot reste un lot skill/doc. Le coeur du travail est la re-structuration de `SKILL.md` autour d'un contrat d'entree V2, d'un gate de readiness, d'une cartographie citations/objections stable, d'une sortie en 9 blocs et d'un `Decision Routing` ferme. Un aide-memo dedie, puis README/changelog, rendent ce cadre visible dans le plugin PI.

**Tech Stack:** Markdown skills Hacienda, documentation plugin, verification repo via npm/vitest/tsc/build scripts.

---

## File map

- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/analyse-refus-inpi/SKILL.md`
  - Recentrer le skill sur la reponse a notification, fermer le contrat d'entree, poser le `Response Readiness Gate`, expliciter `INPI` / `OEB`, normaliser la sortie.
- Create: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/analyse-refus-inpi/references/analyse-refus-inpi-routing-and-output.md`
  - Aide-memo compact pour intake, gate, objections, routes et blocs de sortie.
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/README.md`
  - Realigner le positionnement du skill dans la lane brevets prosecution.
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
  - Ajouter l'entree V2 correspondante.
- Create: `C:/Users/NMarchitecte/hacienda-juridique/docs/superpowers/specs/2026-05-19-hacienda-pi-analyse-refus-inpi-v2-design.md`
  - Spec du lot, a inclure dans le changeset final.
- Create: `C:/Users/NMarchitecte/hacienda-juridique/docs/superpowers/plans/2026-05-19-hacienda-pi-analyse-refus-inpi-v2.md`
  - Ce plan.

### Task 1: Recentrer le skill comme reponse a notification bi-office

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/analyse-refus-inpi/SKILL.md`

- [ ] **Step 1: Rewriter l'en-tete V2 et le positionnement**

Remplacer l'ouverture du skill pour rendre explicite :

- bi-office `INPI` / `OEB` ;
- analyse argumentaire seulement ;
- exclusion du depot officiel et de la strategie prosecution globale.

```md
# Skill - Analyse refus INPI V2

> **Analyse argumentaire, pas reponse officielle.**
> `analyse-refus-inpi` prepare une reponse a notification `INPI` ou `OEB`,
> structure les objections, evalue la faisabilite d'amendement et conclut
> par une decision procedurale bornee. Il ne depose pas la reponse et ne
> remplace pas la validation mandataire ou avocat.

Reference de travail utile :
`references/analyse-refus-inpi-routing-and-output.md`

## Positionnement

`analyse-refus-inpi` sert a :

1. cadrer l'office et la notification ;
2. cartographier citations et objections ;
3. evaluer la faisabilite d'amendement ou d'argumentation ;
4. poser un `Response Readiness Gate` ;
5. router vers une seule suite procedurale fermee.
```

- [ ] **Step 2: Ajouter la frontiere de scope V2**

Inserer une section `Ce skill ne fait pas`.

```md
## Ce skill ne fait pas

- ne depose pas officiellement la reponse INPI ou OEB ;
- ne remplace pas `recherche-anteriorite-brevet` ;
- ne remplace pas `preparation-depot-brevet` ;
- ne remplace pas `strategie-extension-internationale` ;
- ne remplace pas `anteriorite-invalidite`.
```

- [ ] **Step 3: Verifier le positionnement**

Run:

```powershell
Select-String -Path "C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\skills\analyse-refus-inpi\SKILL.md" -Pattern "Analyse refus INPI V2","Analyse argumentaire","Ce skill ne fait pas"
```

Expected: au moins un match sur chaque pattern.

- [ ] **Step 4: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/skills/analyse-refus-inpi/SKILL.md
git commit -m "refactor: add V2 scope to patent office action skill"
```

### Task 2: Fermer le contrat d'entree V2 et clarifier INPI / OEB

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/analyse-refus-inpi/SKILL.md`

- [ ] **Step 1: Ajouter le contrat d'entree V2**

Inserer une section fermee avec dimensions et bloc de faits minimum.

```md
## Contrat d'entree V2

Le skill doit expliciter ou deriver :

- `office`: `inpi`, `oeb`
- `notification_type`:
  `search-report`, `substantive-refusal`, `rule-132`, `other-office-action`
- `deadline_status`:
  `comfortable`, `tight`, `critical`, `expired-or-unknown`
- `citation_profile`:
  `x-heavy`, `y-heavy`, `mixed`, `light`, `unclear`
- `claim_amendment_posture`:
  `amendment-open`, `amendment-limited`, `argument-only`, `unclear`
- `response_goal`:
  `amend`, `argue`, `amend-and-argue`, `divide`, `request-extension`,
  `abandon`

Bloc de faits minimum :

- `application_reference`
- `office_document_reference`
- `consulted_notification_status`
- `claims_objected`
- `known_citations`
- `current_claim_set_status`
- `priority_or_added_matter_risk_status`
- `language_and_filing_context`
- `known_missing_material`
```

- [ ] **Step 2: Rewriter l'intake autour des deux offices**

Ajouter un intake qui diverge des le debut.

```md
## Intake

Si `office` n'est pas stabilise, demander d'abord :

- `inpi`
- `oeb`

Puis adapter l'intake :

- `inpi` :
  - type de notification `R.612-66` ou recherche prealable
  - delai utile
  - langue et support de reponse
- `oeb` :
  - type `Rule 132` ou autre communication utile
  - delai et posture dossier
  - impact sur le jeu de revendications
```

- [ ] **Step 3: Ajouter la discipline de sources notification/citations**

```md
Toute objection, citation et date doivent rester rattachees a la notification
consultee ou etre marquees comme gap documentaire visible.
```

- [ ] **Step 4: Verifier les champs V2**

Run:

```powershell
Select-String -Path "C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\skills\analyse-refus-inpi\SKILL.md" -Pattern "Contrat d'entree V2","notification_type","deadline_status","citation_profile","claim_amendment_posture","response_goal"
```

Expected: tous les patterns remontent.

- [ ] **Step 5: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/skills/analyse-refus-inpi/SKILL.md
git commit -m "refactor: add V2 intake to patent office action skill"
```

### Task 3: Poser le `Response Readiness Gate` et stabiliser objections/amendements

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/analyse-refus-inpi/SKILL.md`

- [ ] **Step 1: Ajouter le `Response Readiness Gate`**

```md
## Response Readiness Gate

Le skill doit conclure explicitement sur :

- `ready`
  - notification consultee et objections identifiees
  - delai suffisamment stabilise
  - citations et revendications rattachees au dossier
  - posture d'amendement ou d'argumentation exploitable
- `partial`
  - reponse plausible mais encore incomplete
  - manque de support textuel, de jeu de revendications ou de cartographie
- `blocked`
  - notification non consultee ou trop incomplete
  - delai inconnu ou probablement depasse
  - aucune base serieuse pour amender ou argumenter
```

- [ ] **Step 2: Ajouter les checks de blocage**

```md
Checks de gate :

- si `consulted_notification_status` est incomplet, rester `partial` ou `blocked`
- si `deadline_status = expired-or-unknown`, ne jamais sortir `ready`
- si `claims_objected` ou `current_claim_set_status` ne sont pas stabilises,
  rester `partial` ou `blocked`
- si les citations sont mentionnees sans source consultee ou sans lien avec les
  objections, les garder en gap explicite
```

- [ ] **Step 3: Structurer la cartographie objection/amendement**

Structurer clairement :

```md
## Families de reponse

- `Citation and Objection Map`
- `Amendment Feasibility`
- `Argument Strategy`
```

- [ ] **Step 4: Verifier le gate**

Run:

```powershell
Select-String -Path "C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\skills\analyse-refus-inpi\SKILL.md" -Pattern "Response Readiness Gate","Citation and Objection Map","Amendment Feasibility","Argument Strategy"
```

Expected: au moins un match sur chaque pattern.

- [ ] **Step 5: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/skills/analyse-refus-inpi/SKILL.md
git commit -m "refactor: add readiness gate to patent office action skill"
```

### Task 4: Normaliser la sortie V2 et le routing ferme

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/analyse-refus-inpi/SKILL.md`

- [ ] **Step 1: Rewriter la sortie en 9 blocs**

```md
## Format de sortie V2

La sortie doit etre structuree ainsi :

1. `Case Snapshot`
2. `Office and Deadline Posture`
3. `Citation and Objection Map`
4. `Amendment Feasibility`
5. `Argument Strategy`
6. `Priority Risks and Procedural Constraints`
7. `Critical Gaps`
8. `Decision Routing`
9. `Human Validation`
```

- [ ] **Step 2: Fermer le `Decision Routing`**

```md
## Decision Routing

Conclure avec une seule valeur :

- `amend`
- `argue`
- `amend-and-argue`
- `divide`
- `request-extension`
- `abandon`
- `insufficient-basis`
```

- [ ] **Step 3: Ajouter les frontieres explicites**

```md
## Frontieres de routage

- `recherche-anteriorite-brevet` : si le besoin principal reste du premier passage prior art
- `preparation-depot-brevet` : si le sujet devient la preparation du depot ou d'un nouveau jeu de revendications
- `strategie-extension-internationale` : si l'arbitrage devient surtout territorial ou portefeuille
- `anteriorite-invalidite` : si le besoin devient la validite d'un brevet adverse
```

- [ ] **Step 4: Verifier les blocs de sortie**

Run:

```powershell
Select-String -Path "C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\skills\analyse-refus-inpi\SKILL.md" -Pattern "Case Snapshot","Office and Deadline Posture","Critical Gaps","Decision Routing","Human Validation"
```

Expected: au moins un match sur chaque pattern.

- [ ] **Step 5: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/skills/analyse-refus-inpi/SKILL.md
git commit -m "refactor: normalize output contract for patent office action skill"
```

### Task 5: Ajouter l'aide-memo de routing et d'output

**Files:**
- Create: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/analyse-refus-inpi/references/analyse-refus-inpi-routing-and-output.md`
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/analyse-refus-inpi/SKILL.md`

- [ ] **Step 1: Creer la reference**

```md
# Analyse refus INPI - routing and output

Reference de travail non normative. En cas d'ecart, seul
`plugins/hacienda-propriete-intellectuelle/skills/analyse-refus-inpi/SKILL.md`
fait foi.

## 1. Intake V2

- `office`
- `notification_type`
- `deadline_status`
- `citation_profile`
- `claim_amendment_posture`
- `response_goal`

## 2. Response Readiness Gate

- `ready`
- `partial`
- `blocked`

## 3. Output blocks

- `Case Snapshot`
- `Office and Deadline Posture`
- `Citation and Objection Map`
- `Amendment Feasibility`
- `Argument Strategy`
- `Priority Risks and Procedural Constraints`
- `Critical Gaps`
- `Decision Routing`
- `Human Validation`

## 4. Closed Decision Routing values

- `amend`
- `argue`
- `amend-and-argue`
- `divide`
- `request-extension`
- `abandon`
- `insufficient-basis`
```

- [ ] **Step 2: Verifier que le skill pointe vers la reference**

Run:

```powershell
Select-String -Path "C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\skills\analyse-refus-inpi\SKILL.md" -Pattern "analyse-refus-inpi-routing-and-output.md"
```

Expected: un match.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/skills/analyse-refus-inpi/SKILL.md plugins/hacienda-propriete-intellectuelle/skills/analyse-refus-inpi/references/analyse-refus-inpi-routing-and-output.md
git commit -m "docs: add routing reference for patent office action skill"
```

### Task 6: Realigner README et changelog du plugin PI

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Ajouter ou rewriter l'entree README du skill**

```md
- `analyse-refus-inpi` : skill V2 bi-office `INPI` / `OEB` de reponse a
  notification, distinct de la recherche amont, de la preparation de depot,
  de la validite adverse et de la strategie internationale, structure autour
  d'un `Response Readiness Gate`
```

- [ ] **Step 2: Ajouter le positionnement brevets V2**

```md
- `analyse-refus-inpi` reste centre sur la reponse a notification de
  prosecution, pas sur la recherche prior art amont ni sur la validite d'un
  brevet adverse ;
- le skill applique un `Response Readiness Gate` explicite ;
- la recherche amont reste du ressort de `recherche-anteriorite-brevet` ;
- la preparation stricte du depot reste du ressort de `preparation-depot-brevet` ;
- la strategie territoriale ou portefeuille reste du ressort de
  `strategie-extension-internationale` ;
- la validite adverse reste du ressort de `anteriorite-invalidite`.
```

- [ ] **Step 3: Ajouter l'entree changelog**

```md
- restructure `analyse-refus-inpi` en skill V2 bi-office `INPI` / `OEB` de
  reponse a notification, avec `Response Readiness Gate`, sortie stabilisee
  et decision procedurale bornee
```

- [ ] **Step 4: Verifier les docs**

Run:

```powershell
Select-String -Path "C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\README.md","C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\CHANGELOG.md" -Pattern "analyse-refus-inpi","Response Readiness Gate","recherche-anteriorite-brevet","preparation-depot-brevet","strategie-extension-internationale","anteriorite-invalidite"
```

Expected: matches dans les deux fichiers.

- [ ] **Step 5: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/README.md plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
git commit -m "docs: align patent office action V2 positioning"
```

### Task 7: Integrer la spec, verifier le repo et publier le lot

**Files:**
- Create: `C:/Users/NMarchitecte/hacienda-juridique/docs/superpowers/specs/2026-05-19-hacienda-pi-analyse-refus-inpi-v2-design.md`
- Create: `C:/Users/NMarchitecte/hacienda-juridique/docs/superpowers/plans/2026-05-19-hacienda-pi-analyse-refus-inpi-v2.md`
- Modify: repo working tree according to previous tasks

- [ ] **Step 1: S'assurer que la spec et le plan sont dans le changeset**

Run:

```powershell
git status --short
```

Expected: la spec, le plan, le skill, la reference, le README et le changelog
apparaissent dans le scope.

- [ ] **Step 2: Verifier le repo complet**

Run:

```bash
npm test
npm run typecheck
npm run build
npm run branding:check
git diff --check
```

Expected:

- `npm test` OK
- `npm run typecheck` OK
- `npm run build` OK
- `npm run branding:check` -> `Branding Hacienda OK`
- `git diff --check` sans erreur bloquante

- [ ] **Step 3: Nettoyer le bruit de build si necessaire**

Si `package-lock.json` ou des `dist/` ont ete regeneres sans faire partie du
scope voulu :

```bash
git restore package-lock.json plugins/hacienda-propriete-intellectuelle/mcp-server/dist/index.js plugins/hacienda-propriete-intellectuelle/mcp-server/dist/version.js plugins/hacienda-sources-officielles/mcp-server/dist/index.js
```

- [ ] **Step 4: Verifier le scope stage**

Run:

```bash
git add plugins/hacienda-propriete-intellectuelle/skills/analyse-refus-inpi/SKILL.md \
  plugins/hacienda-propriete-intellectuelle/skills/analyse-refus-inpi/references/analyse-refus-inpi-routing-and-output.md \
  plugins/hacienda-propriete-intellectuelle/README.md \
  plugins/hacienda-propriete-intellectuelle/CHANGELOG.md \
  docs/superpowers/specs/2026-05-19-hacienda-pi-analyse-refus-inpi-v2-design.md \
  docs/superpowers/plans/2026-05-19-hacienda-pi-analyse-refus-inpi-v2.md
git diff --cached --stat
```

Expected: uniquement les 6 fichiers du lot.

- [ ] **Step 5: Commit et integration**

```bash
git commit -m "feat: restructure patent office action analysis skill"
git push origin main
```

## Self-review

### Spec coverage

- bi-office `INPI` / `OEB` : Tasks 1-2
- contrat d'entree V2 : Task 2
- `Response Readiness Gate` : Task 3
- sortie en 9 blocs : Task 4
- decision procedurale bornee : Task 4
- reference dediee : Task 5
- README / changelog : Task 6
- verification repo et integration : Task 7

### Placeholder scan

Pas de `TODO`, `TBD`, ni d'etape vide. Les snippets cibles et commandes sont
fournis.

### Type consistency

Les noms utilises dans le plan restent coherents avec la spec :

- `office`
- `notification_type`
- `deadline_status`
- `citation_profile`
- `claim_amendment_posture`
- `response_goal`
- `Response Readiness Gate`
- `Decision Routing`
