# Hacienda PI anteriorite-invalidite V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recentrer `anteriorite-invalidite` comme skill V2 de validite stricte du brevet adverse, avec branches `attack` / `defense`, `Invalidity Readiness Gate`, et routage ferme vers les suites brevets appropriees.

**Architecture:** Le lot reste un lot skill/doc. Le coeur du travail est la re-structuration de `SKILL.md` autour d'un contrat d'entree ferme, d'un gate de readiness, d'une separation nette `attack` / `defense`, d'une sortie en 9 blocs et de frontieres explicites avec `tableau-contrefacon-brevet`, `contentieux-pi` et la lane brevets amont. Un aide-memo dedie, puis README/changelog, rendent ce cadre visible dans le plugin PI.

**Tech Stack:** Markdown skills Hacienda, documentation plugin, verification repo via npm/vitest/tsc/build scripts.

---

## File map

- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/anteriorite-invalidite/SKILL.md`
  - Recentrer le skill sur la validite stricte, fermer le contrat d'entree, poser le `Invalidity Readiness Gate`, separer `attack` / `defense`, normaliser la sortie.
- Create: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/anteriorite-invalidite/references/anteriorite-invalidite-routing-and-output.md`
  - Aide-memo compact pour intake, gate, bases de nullite, routes et blocs de sortie.
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/README.md`
  - Realigner le positionnement du skill dans la lane brevets contentieux/validite.
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
  - Ajouter l'entree V2 correspondante.
- Create: `C:/Users/NMarchitecte/hacienda-juridique/docs/superpowers/specs/2026-05-19-hacienda-pi-anteriorite-invalidite-v2-design.md`
  - Spec du lot, a inclure dans le changeset final.
- Create: `C:/Users/NMarchitecte/hacienda-juridique/docs/superpowers/plans/2026-05-19-hacienda-pi-anteriorite-invalidite-v2.md`
  - Ce plan.

### Task 1: Recentrer le skill comme analyse de validite stricte

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/anteriorite-invalidite/SKILL.md`

- [ ] **Step 1: Rewriter l'en-tete V2 et le positionnement**

Remplacer l'ouverture du skill pour rendre explicite :

- validite du brevet seulement ;
- maintien des deux modes `attack` / `defense` ;
- exclusion du claim chart et des branches transactionnelles.

```md
# Skill - Anteriorite invalidite V2

> **Preparation argumentaire, pas procedure judiciaire.**
> `anteriorite-invalidite` prepare une analyse de validite stricte d'un
> brevet adverse, en mode `attack` ou `defense`. Il ne forme pas
> l'assignation, ne pilote pas tout le contentieux, ne negocie pas un
> settlement et ne remplace pas le claim chart produit/revendications.

Reference de travail utile :
`references/anteriorite-invalidite-routing-and-output.md`

## Positionnement

`anteriorite-invalidite` sert a :

1. cadrer le mode `attack` ou `defense` ;
2. structurer les moyens de nullite ;
3. evaluer la force de l'art anterieur et des autres motifs ;
4. poser un `Invalidity Readiness Gate` ;
5. router vers la bonne suite brevets/contentieux.
```

- [ ] **Step 2: Ajouter la frontiere de scope V2**

Inserer une section `Ce skill ne fait pas` ou equivalent.

```md
## Ce skill ne fait pas

- ne forme pas l'action ou les conclusions ;
- ne negocie pas licence, transaction ou settlement ;
- ne produit pas un claim chart offensif ;
- ne remplace pas `contentieux-pi` ;
- ne remplace pas `tableau-contrefacon-brevet`.
```

- [ ] **Step 3: Verifier le positionnement**

Run:

```powershell
Select-String -Path "C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\skills\anteriorite-invalidite\SKILL.md" -Pattern "Anteriorite invalidite V2","Preparation argumentaire","Ce skill ne fait pas"
```

Expected: au moins un match sur chaque pattern.

- [ ] **Step 4: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/skills/anteriorite-invalidite/SKILL.md
git commit -m "refactor: add V2 scope to patent invalidity skill"
```

### Task 2: Fermer le contrat d'entree V2 et separer `attack` / `defense`

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/anteriorite-invalidite/SKILL.md`

- [ ] **Step 1: Ajouter le contrat d'entree V2**

Inserer une section fermee avec dimensions et bloc de faits minimum.

```md
## Contrat d'entree V2

Le skill doit expliciter ou deriver :

- `mode`: `attack`, `defense`
- `patent_status`: `fr`, `ep-fr`, `pct-fr`, `unknown`
- `invalidity_basis_status`: `novelty`, `inventive-step`,
  `added-matter`, `insufficiency`, `mixed`, `unclear`
- `prior_art_coverage`: `strong`, `mixed`, `weak`, `none`
- `litigation_pressure`: `none-yet`, `pre-suit-threat`,
  `active-suit`, `urgent-defense`

Bloc de faits minimum :

- `patent_reference`
- `claims_targeted`
- `priority_date_status`
- `known_prior_art`
- `business_context`
- `why_attack_or_defend`
- `known_claim_chart_status`
- `known_missing_evidence`
```

- [ ] **Step 2: Rewriter l'intake autour des deux modes**

Ajouter un intake qui diverge des le debut.

```md
## Intake

Si aucun mode n'est fourni, demander d'abord :

- `attack`
- `defense`

Puis adapter les questions :

- `attack` :
  - pourquoi attaquer
  - quelles revendications veulent etre annulees
  - quelle pression commerciale
- `defense` :
  - quelle action ou menace est deja recue
  - quelles revendications sont opposees
  - quel lien avec un claim chart existant
```

- [ ] **Step 3: Ajouter la logique de couplage avec le claim chart**

```md
Si `mode = defense` et qu'un claim chart existe deja, le skill doit l'utiliser
comme contexte de defense, sans absorber sa logique de comparaison.
```

- [ ] **Step 4: Verifier les champs V2**

Run:

```powershell
Select-String -Path "C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\skills\anteriorite-invalidite\SKILL.md" -Pattern "Contrat d'entree V2","invalidity_basis_status","prior_art_coverage","litigation_pressure","mode = defense"
```

Expected: tous les patterns remontent.

- [ ] **Step 5: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/skills/anteriorite-invalidite/SKILL.md
git commit -m "refactor: add V2 intake to patent invalidity skill"
```

### Task 3: Poser le `Invalidity Readiness Gate` et structurer les moyens

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/anteriorite-invalidite/SKILL.md`

- [ ] **Step 1: Ajouter le `Invalidity Readiness Gate`**

```md
## Invalidity Readiness Gate

Le skill doit conclure explicitement sur :

- `ready`
  - base d'art anterieur ou autre motif exploitable
  - revendications cibles identifiees
  - articulation des moyens faisable
- `partial`
  - arguments plausibles mais incomplets
  - prior art ou dates encore a consolider
- `blocked`
  - aucun motif serieux exploitable
  - prior art trop faible
  - revendications ou dates trop incertaines
```

- [ ] **Step 2: Ajouter les familles de moyens V2**

Structurer clairement :

```md
## Families de moyens

- `Novelty Attack Map`
- `Inventive Step Attack Map`
- `Other Invalidity Grounds`
```

Avec dans `Other Invalidity Grounds` :

- ajout de matiere ;
- insuffisance ;
- autres moyens eventuels.

- [ ] **Step 3: Ajouter les checks de blocage**

```md
Si `prior_art_coverage = none`, le skill doit bloquer.

Si les dates de priorite ou la cible des revendications ne sont pas stabilisees,
le skill doit rester `partial` ou `blocked`.
```

- [ ] **Step 4: Verifier le gate**

Run:

```powershell
Select-String -Path "C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\skills\anteriorite-invalidite\SKILL.md" -Pattern "Invalidity Readiness Gate","Novelty Attack Map","Inventive Step Attack Map","Other Invalidity Grounds"
```

Expected: au moins un match sur chaque pattern.

- [ ] **Step 5: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/skills/anteriorite-invalidite/SKILL.md
git commit -m "refactor: add readiness gate to patent invalidity skill"
```

### Task 4: Normaliser la sortie V2 et le routing ferme

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/anteriorite-invalidite/SKILL.md`

- [ ] **Step 1: Rewriter la sortie en 9 blocs**

```md
## Format de sortie V2

La sortie doit etre structuree ainsi :

1. `Case Snapshot`
2. `Patent and Procedural Posture`
3. `Prior Art and Basis Coverage`
4. `Novelty Attack Map`
5. `Inventive Step Attack Map`
6. `Other Invalidity Grounds`
7. `Critical Gaps and Litigation Risk`
8. `Decision Routing`
9. `Human Validation`
```

- [ ] **Step 2: Fermer le `Decision Routing`**

```md
## Decision Routing

Conclure avec une seule valeur :

- `prepare-nullity-brief`
- `prepare-defense-invalidity-brief`
- `expand-prior-art-record`
- `refine-claim-targeting`
- `route-to-claim-chart`
- `route-to-contentious-strategy`
- `hold-insufficient-basis`
```

- [ ] **Step 3: Ajouter les frontieres explicites**

```md
## Frontieres de routage

- `tableau-contrefacon-brevet` : si la vraie question devient la comparaison produit / revendications
- `contentieux-pi` : si le besoin devient le pilotage global du dossier
- `recherche-anteriorite-brevet` : si le besoin reste du premier passage prior art
- `preparation-depot-brevet` : si le sujet concerne notre propre depot
```

- [ ] **Step 4: Verifier les blocs de sortie**

Run:

```powershell
Select-String -Path "C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\skills\anteriorite-invalidite\SKILL.md" -Pattern "Case Snapshot","Prior Art and Basis Coverage","Critical Gaps and Litigation Risk","Decision Routing","Human Validation"
```

Expected: au moins un match sur chaque pattern.

- [ ] **Step 5: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/skills/anteriorite-invalidite/SKILL.md
git commit -m "refactor: normalize output contract for patent invalidity skill"
```

### Task 5: Ajouter l'aide-memo de routing et d'output

**Files:**
- Create: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/anteriorite-invalidite/references/anteriorite-invalidite-routing-and-output.md`
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/anteriorite-invalidite/SKILL.md`

- [ ] **Step 1: Creer la reference**

```md
# Anteriorite invalidite - routing and output

Reference de travail non normative. En cas d'ecart, seul
`plugins/hacienda-propriete-intellectuelle/skills/anteriorite-invalidite/SKILL.md`
fait foi.

## 1. Intake V2

- `mode`
- `patent_status`
- `invalidity_basis_status`
- `prior_art_coverage`
- `litigation_pressure`

## 2. Invalidity Readiness Gate

- `ready`
- `partial`
- `blocked`

## 3. Output blocks

- `Case Snapshot`
- `Patent and Procedural Posture`
- `Prior Art and Basis Coverage`
- `Novelty Attack Map`
- `Inventive Step Attack Map`
- `Other Invalidity Grounds`
- `Critical Gaps and Litigation Risk`
- `Decision Routing`
- `Human Validation`

## 4. Closed Decision Routing values

- `prepare-nullity-brief`
- `prepare-defense-invalidity-brief`
- `expand-prior-art-record`
- `refine-claim-targeting`
- `route-to-claim-chart`
- `route-to-contentious-strategy`
- `hold-insufficient-basis`
```

- [ ] **Step 2: Verifier que le skill pointe vers la reference**

Run:

```powershell
Select-String -Path "C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\skills\anteriorite-invalidite\SKILL.md" -Pattern "anteriorite-invalidite-routing-and-output.md"
```

Expected: un match.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/skills/anteriorite-invalidite/SKILL.md plugins/hacienda-propriete-intellectuelle/skills/anteriorite-invalidite/references/anteriorite-invalidite-routing-and-output.md
git commit -m "docs: add routing reference for patent invalidity skill"
```

### Task 6: Realigner README et changelog du plugin PI

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Ajouter ou rewriter l'entree README du skill**

```md
- `anteriorite-invalidite` : skill V2 de validite stricte du brevet adverse,
  bi-mode `attack` / `defense`, distinct du claim chart et du pilotage
  contentieux global, structure autour d'un `Invalidity Readiness Gate`
```

- [ ] **Step 2: Ajouter le positionnement brevets V2**

```md
- `anteriorite-invalidite` reste centre sur la validite du brevet adverse,
  pas sur la confrontation produit / revendications ;
- le skill applique un `Invalidity Readiness Gate` explicite ;
- le claim chart offensif reste du ressort de `tableau-contrefacon-brevet` ;
- le pilotage judiciaire global reste du ressort de `contentieux-pi`.
```

- [ ] **Step 3: Ajouter l'entree changelog**

```md
- restructure `anteriorite-invalidite` en skill V2 de validite stricte,
  avec modes `attack` / `defense`, `Invalidity Readiness Gate`, sortie
  stabilisee et routage ferme vers les suites brevets appropriees
```

- [ ] **Step 4: Verifier les docs**

Run:

```powershell
Select-String -Path "C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\README.md","C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\CHANGELOG.md" -Pattern "anteriorite-invalidite","Invalidity Readiness Gate","tableau-contrefacon-brevet","contentieux-pi"
```

Expected: matches dans les deux fichiers.

- [ ] **Step 5: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/README.md plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
git commit -m "docs: align patent invalidity V2 positioning"
```

### Task 7: Integrer la spec, verifier le repo et publier le lot

**Files:**
- Create: `C:/Users/NMarchitecte/hacienda-juridique/docs/superpowers/specs/2026-05-19-hacienda-pi-anteriorite-invalidite-v2-design.md`
- Create: `C:/Users/NMarchitecte/hacienda-juridique/docs/superpowers/plans/2026-05-19-hacienda-pi-anteriorite-invalidite-v2.md`
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
git add plugins/hacienda-propriete-intellectuelle/skills/anteriorite-invalidite/SKILL.md \
  plugins/hacienda-propriete-intellectuelle/skills/anteriorite-invalidite/references/anteriorite-invalidite-routing-and-output.md \
  plugins/hacienda-propriete-intellectuelle/README.md \
  plugins/hacienda-propriete-intellectuelle/CHANGELOG.md \
  docs/superpowers/specs/2026-05-19-hacienda-pi-anteriorite-invalidite-v2-design.md \
  docs/superpowers/plans/2026-05-19-hacienda-pi-anteriorite-invalidite-v2.md
git diff --cached --stat
```

Expected: uniquement les 6 fichiers du lot.

- [ ] **Step 5: Commit et integration**

```bash
git commit -m "feat: restructure patent invalidity analysis skill"
git push origin main
```

## Self-review

### Spec coverage

- validite stricte : Task 1
- contrat d'entree V2 : Task 2
- separation `attack` / `defense` : Task 2
- `Invalidity Readiness Gate` : Task 3
- sortie en 9 blocs : Task 4
- reference dediee : Task 5
- README / changelog : Task 6
- verification repo et integration : Task 7

### Placeholder scan

Pas de `TODO`, `TBD`, ni d'etape vide. Les snippets cibles et commandes sont
fournis.

### Type consistency

Les noms utilises dans le plan restent coherents avec la spec :

- `mode`
- `patent_status`
- `invalidity_basis_status`
- `prior_art_coverage`
- `litigation_pressure`
- `Invalidity Readiness Gate`
- `Decision Routing`

