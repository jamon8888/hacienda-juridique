# Hacienda PI tableau-contrefacon-brevet V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recentrer `tableau-contrefacon-brevet` comme skill V2 offensif strict de claim chart brevet, avec `Chart Readiness Gate`, mapping litteral / equivalence stabilise et routage ferme vers les suites enforcement appropriees.

**Architecture:** Le lot reste un lot skill/doc. Le coeur du travail est la re-structuration de `SKILL.md` autour d'un contrat d'entree ferme, d'un gate de readiness, d'une sortie en 9 blocs et de frontieres nettes avec les skills enforcement voisins. Un aide-memo dedie, puis README/changelog, viennent rendre cette structure visible et coherent dans le plugin PI.

**Tech Stack:** Markdown skills Hacienda, documentation plugin, verification repo via npm/vitest/tsc/build scripts.

---

## File map

- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/tableau-contrefacon-brevet/SKILL.md`
  - Recentrer le skill sur le claim chart offensif strict, fermer le contrat d'entree, poser le `Chart Readiness Gate`, normaliser la sortie.
- Create: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/tableau-contrefacon-brevet/references/tableau-contrefacon-brevet-routing-and-output.md`
  - Aide-memo compact pour intake, gate, mapping, routes et blocs de sortie.
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/README.md`
  - Realigner le positionnement du skill dans la lane brevets enforcement.
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
  - Ajouter l'entree V2 correspondante.
- Create: `C:/Users/NMarchitecte/hacienda-juridique/docs/superpowers/specs/2026-05-19-hacienda-pi-tableau-contrefacon-brevet-v2-design.md`
  - Spec du lot, a inclure dans le changeset final.
- Create: `C:/Users/NMarchitecte/hacienda-juridique/docs/superpowers/plans/2026-05-19-hacienda-pi-tableau-contrefacon-brevet-v2.md`
  - Ce plan.

### Task 1: Recentrer le skill comme claim chart offensif strict

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/tableau-contrefacon-brevet/SKILL.md`

- [ ] **Step 1: Rewriter l'en-tete V2 et le positionnement**

Remplacer l'ouverture du skill pour rendre explicite :

- confrontation technique seulement ;
- offensive only ;
- exclusion de la defense et de l'invalidite.

```md
# Skill - Tableau contrefacon brevet V2

> **Confrontation technique, pas qualification de contrefacon.**
> `tableau-contrefacon-brevet` produit un claim chart offensif strict,
> destine a confronter un brevet et un produit ou procede cible. Il ne
> qualifie pas juridiquement la contrefacon, ne construit pas une defense,
> ne redige pas la mise en demeure et ne remplace pas la strategie
> contentieuse.

Reference de travail utile :
`references/tableau-contrefacon-brevet-routing-and-output.md`

## Positionnement

`tableau-contrefacon-brevet` sert a :

1. selectionner les revendications offensives utiles ;
2. comparer element par element avec la preuve produit ;
3. separer litteralite, equivalence et inconnus ;
4. evaluer la readiness du claim chart ;
5. router vers la bonne suite enforcement.
```

- [ ] **Step 2: Ajouter la frontiere de scope V2**

Inserer une section `Ce skill ne fait pas` ou equivalent.

```md
## Ce skill ne fait pas

- ne conclut pas a la contrefacon ;
- ne produit pas une defense contre une allegation adverse ;
- n'attaque pas la validite du brevet en profondeur ;
- ne redige pas la mise en demeure ;
- ne prepare pas la requete de saisie complete ;
- ne remplace pas `contentieux-pi`.
```

- [ ] **Step 3: Verifier le positionnement**

Run:

```powershell
Select-String -Path "C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\skills\tableau-contrefacon-brevet\SKILL.md" -Pattern "Tableau contrefacon brevet V2","Confrontation technique","Ce skill ne fait pas"
```

Expected: au moins un match sur chaque pattern.

- [ ] **Step 4: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/skills/tableau-contrefacon-brevet/SKILL.md
git commit -m "refactor: add V2 scope to patent claim chart skill"
```

### Task 2: Fermer le contrat d'entree V2 et poser le Chart Readiness Gate

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/tableau-contrefacon-brevet/SKILL.md`

- [ ] **Step 1: Ajouter le contrat d'entree V2**

Inserer une section fermee avec dimensions et bloc de faits minimum.

```md
## Contrat d'entree V2

Le skill doit expliciter ou deriver :

- `assertion_mode`: `literal`, `equivalence`, `both`
- `patent_status`: `fr`, `ep-fr`, `pct-fr`, `unknown`
- `evidence_coverage`: `strong`, `mixed`, `weak`, `none`
- `claim_scope_status`: `independent-only`,
  `independent-plus-key-dependent`, `unclear`
- `enforcement_goal`: `cease-and-desist`, `seizure-prep`,
  `litigation-prep`, `internal-review`

Bloc de faits minimum :

- `patent_reference`
- `claims_targeted`
- `product_or_process_target`
- `technical_sources_used`
- `fr_market_status`
- `commercial_context`
- `known_missing_evidence`
```

- [ ] **Step 2: Ajouter le Chart Readiness Gate**

```md
## Chart Readiness Gate

Le skill doit conclure explicitement sur :

- `ready`
  - revendications exploitables
  - documentation produit/procede suffisante
  - mapping elementaire faisable
- `partial`
  - base exploitable mais lacunaire
  - certains elements restent `unknown` ou `review`
- `blocked`
  - brevet ou revendications non exploitables
  - documentation produit trop pauvre
  - theorie d'equivalence sans base minimale
```

- [ ] **Step 3: Ajouter les checks de blocage**

Ajouter des regles visibles :

```md
Si `evidence_coverage = none`, le skill doit bloquer.

Si `assertion_mode = equivalence` et qu'aucune base technique minimale
ne permet d'exposer fonction / moyen / resultat, le skill doit bloquer
ou basculer en `partial` tres reserve.
```

- [ ] **Step 4: Verifier le gate**

Run:

```powershell
Select-String -Path "C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\skills\tableau-contrefacon-brevet\SKILL.md" -Pattern "Contrat d'entree V2","Chart Readiness Gate","`ready`","`partial`","`blocked`"
```

Expected: tous les patterns remontent.

- [ ] **Step 5: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/skills/tableau-contrefacon-brevet/SKILL.md
git commit -m "refactor: add V2 intake and readiness gate to patent claim chart skill"
```

### Task 3: Normaliser la sortie V2 et le mapping litteral / equivalence

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/tableau-contrefacon-brevet/SKILL.md`

- [ ] **Step 1: Rewriter la sortie en 9 blocs**

```md
## Format de sortie V2

La sortie doit etre structuree ainsi :

1. `Case Snapshot`
2. `Patent and Claim Scope`
3. `Evidence Coverage`
4. `Literal Mapping Table`
5. `Equivalence Review`
6. `Critical Gaps and Unknowns`
7. `Enforcement Use Assessment`
8. `Decision Routing`
9. `Human Validation`
```

- [ ] **Step 2: Normaliser le tableau de mapping litteral**

Ajouter des colonnes et statuts fermes.

```md
## Literal Mapping Table

Colonnes minimales :

- `claim element`
- `product evidence`
- `status`
- `comment`

Statuts :

- `match`
- `possible-match`
- `no-match`
- `unknown`
```

- [ ] **Step 3: Borner la branche equivalence**

```md
## Equivalence Review

Actif seulement si `assertion_mode = equivalence` ou `both`.

Analyser :

- fonction
- moyen
- resultat

Ne jamais maquiller les points fragiles. Les elements douteux restent
`[review]` ou `unknown`.
```

- [ ] **Step 4: Ajouter le routing ferme**

```md
## Decision Routing

Conclure avec une seule valeur :

- `prepare-cease-and-desist`
- `prepare-seizure-brief`
- `prepare-litigation-brief`
- `fill-evidence-gaps`
- `re-scope-claims`
- `route-to-invalidity-defense`
- `hold-insufficient-basis`
```

- [ ] **Step 5: Verifier les blocs de sortie**

Run:

```powershell
Select-String -Path "C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\skills\tableau-contrefacon-brevet\SKILL.md" -Pattern "Literal Mapping Table","Equivalence Review","Critical Gaps and Unknowns","Decision Routing","Human Validation"
```

Expected: au moins un match sur chaque pattern.

- [ ] **Step 6: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/skills/tableau-contrefacon-brevet/SKILL.md
git commit -m "refactor: normalize output contract for patent claim chart skill"
```

### Task 4: Clarifier les frontieres et ajouter l'aide-memo de reference

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/tableau-contrefacon-brevet/SKILL.md`
- Create: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/skills/tableau-contrefacon-brevet/references/tableau-contrefacon-brevet-routing-and-output.md`

- [ ] **Step 1: Ajouter les frontieres explicites dans le skill**

```md
## Frontieres de routage

- `mise-en-demeure-pi` : si le claim chart supporte une offensive ecrite
- `saisie-contrefacon` : si le besoin devient l'acquisition probatoire
- `contentieux-pi` : si le besoin devient la strategie judiciaire globale
- `anteriorite-invalidite` : si la vraie question devient la validite ou la defense
- `recherche-anteriorite-brevet` : si la vraie question est le prior art amont
```

- [ ] **Step 2: Creer l'aide-memo**

```md
# Tableau contrefacon brevet - routing and output

Reference de travail non normative. En cas d'ecart, seul
`plugins/hacienda-propriete-intellectuelle/skills/tableau-contrefacon-brevet/SKILL.md`
fait foi.

## 1. Intake V2

- `assertion_mode`
- `patent_status`
- `evidence_coverage`
- `claim_scope_status`
- `enforcement_goal`

## 2. Chart Readiness Gate

- `ready`
- `partial`
- `blocked`

## 3. Output blocks

- `Case Snapshot`
- `Patent and Claim Scope`
- `Evidence Coverage`
- `Literal Mapping Table`
- `Equivalence Review`
- `Critical Gaps and Unknowns`
- `Enforcement Use Assessment`
- `Decision Routing`
- `Human Validation`

## 4. Closed Decision Routing values

- `prepare-cease-and-desist`
- `prepare-seizure-brief`
- `prepare-litigation-brief`
- `fill-evidence-gaps`
- `re-scope-claims`
- `route-to-invalidity-defense`
- `hold-insufficient-basis`
```

- [ ] **Step 3: Verifier la reference**

Run:

```powershell
Select-String -Path "C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\skills\tableau-contrefacon-brevet\SKILL.md" -Pattern "tableau-contrefacon-brevet-routing-and-output.md"
```

Expected: un match.

- [ ] **Step 4: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/skills/tableau-contrefacon-brevet/SKILL.md plugins/hacienda-propriete-intellectuelle/skills/tableau-contrefacon-brevet/references/tableau-contrefacon-brevet-routing-and-output.md
git commit -m "docs: add routing reference for patent claim chart skill"
```

### Task 5: Realigner README et changelog du plugin PI

**Files:**
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `C:/Users/NMarchitecte/hacienda-juridique/plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Ajouter ou rewriter l'entree README du skill**

```md
- `tableau-contrefacon-brevet` : claim chart brevet V2 offensif strict,
  distinct de la defense / invalidite, structure autour d'un
  `Chart Readiness Gate`, du mapping litteral / equivalence et d'un
  routage ferme vers mise en demeure, saisie ou contentieux
```

- [ ] **Step 2: Ajouter le positionnement brevets enforcement V2**

```md
- `tableau-contrefacon-brevet` reste une brique de confrontation technique
  offensive, pas une qualification juridique de contrefacon ;
- le skill applique un `Chart Readiness Gate` explicite avant toute
  recommandation de suite ;
- la defense et la validite du brevet restent du ressort
  d'`anteriorite-invalidite` ;
- les suites externes restent raccordees a `mise-en-demeure-pi`,
  `saisie-contrefacon` et `contentieux-pi`.
```

- [ ] **Step 3: Ajouter l'entree changelog**

```md
- restructure `tableau-contrefacon-brevet` en skill V2 offensif strict,
  avec `Chart Readiness Gate`, contrat d'entree ferme, sortie stabilisee et
  routage ferme vers les suites enforcement appropriees
```

- [ ] **Step 4: Verifier les docs**

Run:

```powershell
Select-String -Path "C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\README.md","C:\Users\NMarchitecte\hacienda-juridique\plugins\hacienda-propriete-intellectuelle\CHANGELOG.md" -Pattern "tableau-contrefacon-brevet","Chart Readiness Gate","anteriorite-invalidite","mise-en-demeure-pi","saisie-contrefacon","contentieux-pi"
```

Expected: matches dans les deux fichiers.

- [ ] **Step 5: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/README.md plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
git commit -m "docs: align patent claim chart V2 positioning"
```

### Task 6: Integrer la spec, verifier le repo et publier le lot

**Files:**
- Create: `C:/Users/NMarchitecte/hacienda-juridique/docs/superpowers/specs/2026-05-19-hacienda-pi-tableau-contrefacon-brevet-v2-design.md`
- Create: `C:/Users/NMarchitecte/hacienda-juridique/docs/superpowers/plans/2026-05-19-hacienda-pi-tableau-contrefacon-brevet-v2.md`
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
git add plugins/hacienda-propriete-intellectuelle/skills/tableau-contrefacon-brevet/SKILL.md \
  plugins/hacienda-propriete-intellectuelle/skills/tableau-contrefacon-brevet/references/tableau-contrefacon-brevet-routing-and-output.md \
  plugins/hacienda-propriete-intellectuelle/README.md \
  plugins/hacienda-propriete-intellectuelle/CHANGELOG.md \
  docs/superpowers/specs/2026-05-19-hacienda-pi-tableau-contrefacon-brevet-v2-design.md \
  docs/superpowers/plans/2026-05-19-hacienda-pi-tableau-contrefacon-brevet-v2.md
git diff --cached --stat
```

Expected: uniquement les 6 fichiers du lot.

- [ ] **Step 5: Commit et integration**

```bash
git commit -m "feat: restructure patent infringement chart skill"
git push origin main
```

## Self-review

### Spec coverage

- scope offensif strict : Task 1
- contrat d'entree V2 : Task 2
- `Chart Readiness Gate` : Task 2
- sortie en 9 blocs : Task 3
- mapping litteral / equivalence : Task 3
- frontieres et reference : Task 4
- README / changelog : Task 5
- verification repo et integration : Task 6

### Placeholder scan

Pas de `TODO`, `TBD`, ni d'etape vide. Les snippets cibles et commandes sont
fournis.

### Type consistency

Les noms utilises dans le plan restent coherents avec la spec :

- `assertion_mode`
- `patent_status`
- `evidence_coverage`
- `claim_scope_status`
- `enforcement_goal`
- `Chart Readiness Gate`
- `Decision Routing`

