# Hacienda PI preparation-depot-brevet V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recentrer `preparation-depot-brevet` comme skill V2 de preparation stricte au depot, avec `Filing Readiness Gate`, lanes `FR` / `EP` / `PCT` / `sequenced`, et branche bornee de strategie de priorite.

**Architecture:** Le lot reste strictement documentaire et comportemental au niveau du skill. Le coeur du travail est dans `SKILL.md`, avec un aide-memo dedie, puis un realignement du README et du changelog du plugin PI pour rendre le nouveau positionnement visible et coherent avec la lane brevets V2.

**Tech Stack:** Markdown skills Hacienda, documentation plugin, verification repo via npm/vitest/tsc/build scripts.

---

## File map

- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/preparation-depot-brevet/SKILL.md`
  - Recentrer le skill sur la preparation stricte, l'intake V2, le gate de readiness, les lanes de depot et la sortie stabilisee.
- Create: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/preparation-depot-brevet/references/preparation-depot-brevet-routing-and-output.md`
  - Aide-memo compact pour intake, gate, routes et blocs de sortie.
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/README.md`
  - Mettre a jour le positionnement brevets V2.
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
  - Ajouter l'entree V2 correspondante.
- Create: `C:/Users/NMarchitecte/hacienda-juridique/docs/superpowers/specs/2026-05-19-hacienda-pi-preparation-depot-brevet-v2-design.md`
  - Spec deja validee, a inclure dans le changeset final.
- Create: `C:/Users/NMarchitecte/hacienda-juridique/docs/superpowers/plans/2026-05-19-hacienda-pi-preparation-depot-brevet-v2.md`
  - Ce plan.

### Task 1: Recentrer le positionnement et le contrat d'entree V2

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/preparation-depot-brevet/SKILL.md`

- [ ] **Step 1: Rewriter l'en-tete de positionnement V2**

Remplacer le debut du skill pour rendre explicite la frontiere "preparation, pas depot final" et annoncer le role de brique V2 dans la lane brevets.

```md
# Skill - Preparation de depot brevet V2

> **Preparation technique, pas depot final.**
> `preparation-depot-brevet` sert a produire un brouillon structure de dossier
> de depot, un `Drafting Brief`, une architecture candidate de revendications
> et un `Filing Readiness Gate`. Il ne remplace ni la redaction finale par un
> mandataire brevets, ni le choix formel de depot, ni le depot lui-meme.

Reference de travail utile :
`references/preparation-depot-brevet-routing-and-output.md`

## Positionnement

`preparation-depot-brevet` prend le relais apres un premier passage
exploitable de `recherche-anteriorite-brevet`.

Il est borne a :

1. cadrer la matiere technique de depot ;
2. verifier inventeurs, deposant et risque de divulgation ;
3. construire un brief de redaction ;
4. evaluer un `Filing Readiness Gate` ;
5. proposer une route FR / EP / PCT / sequence de priorite.
```

- [ ] **Step 2: Ajouter le contrat d'entree V2**

Inserer une section `Contrat d'entree V2` avec dimensions fermees et bloc de faits minimum.

```md
## Contrat d'entree V2

Le skill doit expliciter ou deriver :

- `invention_type`: `device`, `process`, `composition`,
  `software-implemented`, `biotech-medical`, `mixed`, `unknown`
- `filing_lane`: `fr`, `ep`, `pct`, `sequenced`, `unknown`
- `priority_strategy_status`: `single-lane`, `fr-then-ep`, `fr-then-pct`,
  `ep-direct`, `pct-direct`, `unclear`
- `readiness_status`: `ready`, `partial`, `blocked`, `unknown`
- `inventorship_status`: `clear`, `needs-review`, `contested-or-unclear`
- `disclosure_status`: `no-known-disclosure`, `planned-disclosure`,
  `already-disclosed`, `unclear`

Bloc de faits minimum :

- `proposed_invention`
- `technical_problem`
- `technical_solution`
- `known_prior_art_status`
- `inventors`
- `applicant`
- `territories_targeted`
- `public_disclosure_timeline`
- `known_examples_and_variants`
- `known_drawings_status`
- `known_data_or_test_support`
```

- [ ] **Step 3: Verifier la presence des frontieres amont**

Verifier que le skill renvoie explicitement vers `recherche-anteriorite-brevet`
si la couverture d'anteriorite manque avant la preparation.

Run:

```powershell
Select-String -Path "C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\skills\preparation-depot-brevet\SKILL.md" -Pattern "recherche-anteriorite-brevet","Contrat d'entree V2"
```

Expected: au moins un match sur chaque pattern.

- [ ] **Step 4: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/skills/preparation-depot-brevet/SKILL.md
git commit -m "refactor: add V2 intake contract to patent filing prep skill"
```

### Task 2: Introduire le Filing Readiness Gate et les lanes FR/EP/PCT

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/preparation-depot-brevet/SKILL.md`

- [ ] **Step 1: Ajouter la section Filing Readiness Gate**

Inserer une section explicite avec trois statuts et conditions minimales.

```md
## Filing Readiness Gate

Le skill doit conclure explicitement sur :

- `ready`
  - matiere technique suffisante pour produire un brief de redaction
  - inventeurs / deposant identifiables
  - pas de blocage majeur de divulgation connu
- `partial`
  - dossier exploitable mais incomplet
  - variantes, figures, exemples ou support technique encore insuffisants
- `blocked`
  - divulgation deja intervenue avec risque majeur
  - invention trop vague
  - titularite ou inventorship trop incertains
```

- [ ] **Step 2: Structurer les lanes de depot**

Ajouter ou rewriter une section de lanes avec frontieres claires.

```md
## Filing lanes

- `FR`
  - preparation pour depot prioritaire FR
- `EP`
  - preparation pour depot direct EP
- `PCT`
  - preparation pour depot direct PCT
- `sequenced`
  - preparation avec route de priorite ou sequence de depot

Le skill propose une route bornee. Il ne remplace pas
`strategie-extension-internationale`.
```

- [ ] **Step 3: Ajouter les checks de blocage**

Inserer des prompts de blocage visibles dans le skill.

```md
Si `disclosure_status = already-disclosed`, le skill doit faire remonter un
blocage majeur et expliquer que la nouveaute peut etre compromise.

Si `inventorship_status = contested-or-unclear`, le skill ne doit pas maquiller
le risque de titularite.
```

- [ ] **Step 4: Verifier le gate**

Run:

```powershell
Select-String -Path "C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\skills\preparation-depot-brevet\SKILL.md" -Pattern "Filing Readiness Gate","`ready`","`partial`","`blocked`","Filing lanes"
```

Expected: tous les patterns remontent.

- [ ] **Step 5: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/skills/preparation-depot-brevet/SKILL.md
git commit -m "refactor: add readiness gate to patent filing prep skill"
```

### Task 3: Normaliser la sortie V2 et le routing ferme

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/preparation-depot-brevet/SKILL.md`

- [ ] **Step 1: Rewriter la section de sortie en 9 blocs**

Remplacer la sortie libre ou lineaire par une sortie V2 fermee.

```md
## Format de sortie V2

La sortie doit etre structuree ainsi :

1. `Case Snapshot`
2. `Inventorship and Ownership Check`
3. `Disclosure Risk Check`
4. `Drafting Brief`
5. `Claim Architecture Candidate`
6. `Description Coverage`
7. `Figures and Examples Checklist`
8. `Priority and Filing Path`
9. `Human Validation`
```

- [ ] **Step 2: Ajouter le routing ferme**

```md
## Next Step Routing

Conclure avec une seule valeur :

- `prepare-drafting-brief`
- `fill-readiness-gaps`
- `expand-prior-art-review`
- `hold-due-to-disclosure-risk`
- `route-to-extension-strategy`
- `route-to-invalidity-analysis`
- `route-to-infringement-chart`
- `route-to-software-regime-review`
```

- [ ] **Step 3: Ajouter les frontieres explicites**

Inserer un bloc court de transitions :

```md
## Frontieres de routage

- `recherche-anteriorite-brevet` : si la recherche amont est insuffisante
- `strategie-extension-internationale` : si le besoin devient la strategie
  d'extension
- `anteriorite-invalidite` : si le besoin devient l'attaque d'un brevet tiers
- `tableau-contrefacon-brevet` : si le besoin devient la comparaison
  revendications / produit
- `logiciels-pi` : si le coeur du sujet est le regime logiciel
```

- [ ] **Step 4: Verifier les blocs de sortie**

Run:

```powershell
Select-String -Path "C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\skills\preparation-depot-brevet\SKILL.md" -Pattern "Case Snapshot","Claim Architecture Candidate","Priority and Filing Path","Next Step Routing"
```

Expected: au moins un match sur chaque pattern.

- [ ] **Step 5: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/skills/preparation-depot-brevet/SKILL.md
git commit -m "refactor: normalize patent filing prep output contract"
```

### Task 4: Ajouter l'aide-memo de routing et d'output

**Files:**
- Create: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/preparation-depot-brevet/references/preparation-depot-brevet-routing-and-output.md`

- [ ] **Step 1: Creer le fichier de reference**

Ajouter un aide-memo compact reprenant intake, gate, lanes, routes et blocs de sortie.

```md
# Preparation depot brevet - routing and output

Reference de travail non normative. En cas d'ecart, seul
`plugins/hacienda-propriete-intellectuelle/skills/preparation-depot-brevet/SKILL.md`
fait foi.

## 1. Intake V2

- `invention_type`
- `filing_lane`
- `priority_strategy_status`
- `readiness_status`
- `inventorship_status`
- `disclosure_status`

## 2. Filing Readiness Gate

- `ready`
- `partial`
- `blocked`

## 3. Filing lanes

- `FR`
- `EP`
- `PCT`
- `sequenced`

## 4. Output blocks

- `Case Snapshot`
- `Inventorship and Ownership Check`
- `Disclosure Risk Check`
- `Drafting Brief`
- `Claim Architecture Candidate`
- `Description Coverage`
- `Figures and Examples Checklist`
- `Priority and Filing Path`
- `Human Validation`

## 5. Closed Next Step Routing values

- `prepare-drafting-brief`
- `fill-readiness-gaps`
- `expand-prior-art-review`
- `hold-due-to-disclosure-risk`
- `route-to-extension-strategy`
- `route-to-invalidity-analysis`
- `route-to-infringement-chart`
- `route-to-software-regime-review`
```

- [ ] **Step 2: Verifier que le skill pointe vers la reference**

Run:

```powershell
Select-String -Path "C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\skills\preparation-depot-brevet\SKILL.md" -Pattern "preparation-depot-brevet-routing-and-output.md"
```

Expected: un match.

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/skills/preparation-depot-brevet/SKILL.md plugins/hacienda-propriete-intellectuelle/skills/preparation-depot-brevet/references/preparation-depot-brevet-routing-and-output.md
git commit -m "docs: add patent filing prep routing reference"
```

### Task 5: Realigner README et changelog du plugin PI

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Mettre a jour l'entree README du skill**

Ajouter ou rewriter l'entree de liste pour decrire le V2.

```md
- `preparation-depot-brevet` : skill V2 strict de preparation au depot,
  distinct du premier passage d'anteriorite, de la revue d'invalidite et du
  claim chart, structure autour d'un `Filing Readiness Gate`, d'un
  `Drafting Brief`, d'une architecture candidate de revendications et d'une
  route FR / EP / PCT / sequence bornee
```

- [ ] **Step 2: Ajouter le positionnement brevet V2**

Dans la section de positionnement, inserer un bloc court :

```md
- `preparation-depot-brevet` est une brique stricte de preparation au depot ;
- le skill ne remplace ni la redaction finale, ni le depot, ni une strategie
  complete de prosecution ;
- il expose un `Filing Readiness Gate` et une route FR / EP / PCT / sequence
  sans absorber `strategie-extension-internationale`.
```

- [ ] **Step 3: Ajouter l'entree changelog**

```md
- restructure `preparation-depot-brevet` en skill V2 de preparation stricte,
  avec `Filing Readiness Gate`, lanes `FR` / `EP` / `PCT` / `sequenced`,
  sortie stabilisee et route de priorite bornee
```

- [ ] **Step 4: Verifier les docs**

Run:

```powershell
Select-String -Path "C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\README.md","C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\CHANGELOG.md" -Pattern "preparation-depot-brevet","Filing Readiness Gate","FR","EP","PCT"
```

Expected: matches dans les deux fichiers.

- [ ] **Step 5: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/README.md plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
git commit -m "docs: align patent filing prep V2 positioning"
```

### Task 6: Integrer la spec, verifier le repo et publier le lot

**Files:**
- Create: `C:/Users/NMarchitecte/hacienda-juridique/docs/superpowers/specs/2026-05-19-hacienda-pi-preparation-depot-brevet-v2-design.md`
- Create: `C:/Users/NMarchitecte/hacienda-juridique/docs/superpowers/plans/2026-05-19-hacienda-pi-preparation-depot-brevet-v2.md`
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
git add plugins/hacienda-propriete-intellectuelle/skills/preparation-depot-brevet/SKILL.md \
  plugins/hacienda-propriete-intellectuelle/skills/preparation-depot-brevet/references/preparation-depot-brevet-routing-and-output.md \
  plugins/hacienda-propriete-intellectuelle/README.md \
  plugins/hacienda-propriete-intellectuelle/CHANGELOG.md \
  docs/superpowers/specs/2026-05-19-hacienda-pi-preparation-depot-brevet-v2-design.md \
  docs/superpowers/plans/2026-05-19-hacienda-pi-preparation-depot-brevet-v2.md
git diff --cached --stat
```

Expected: uniquement les 6 fichiers du lot.

- [ ] **Step 5: Commit et integration**

```bash
git commit -m "feat: restructure patent filing preparation skill"
git push origin main
```

## Self-review

### Spec coverage

- Contrat d'entree V2 : Task 1
- `Filing Readiness Gate` : Task 2
- Lanes `FR` / `EP` / `PCT` / `sequenced` : Task 2
- Sortie en 9 blocs : Task 3
- Routing ferme : Task 3
- Reference dediee : Task 4
- README / changelog : Task 5
- Verification repo et integration : Task 6

### Placeholder scan

Pas de `TODO`, `TBD`, ni d'etape vide. Les snippets cibles et commandes sont
fournis.

### Type consistency

Les noms utilises dans le plan restent coherents avec la spec :

- `Filing Readiness Gate`
- `invention_type`
- `filing_lane`
- `priority_strategy_status`
- `readiness_status`
- `inventorship_status`
- `disclosure_status`

