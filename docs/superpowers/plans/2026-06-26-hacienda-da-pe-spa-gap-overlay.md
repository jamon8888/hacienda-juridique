# Overlay `--pe` (side sponsor) sur spa-review / gap-review — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter un mode `--pe` (lentille Private Equity, side sponsor) aux revues `spa-review` et `gap-review`, porté par un module frère partagé, sans nouveau skill et sans régression hors flag.

**Architecture:** Nouveau module `references/pe-spa-gap-overlay-fr.md` (axes S1–S5 SPA + W1–W3 GAP/W&I, side-aware sponsor) qui **référence** `pe-overlay-fr.md` pour le gate France/Lux, le glossaire ~100 termes et l'anti-fabrication PE (lus tels quels, zéro édition de la doctrine pacte). Chaque skill gagne une étape conditionnelle (`Étape 9ter` SPA, `Étape 6ter` GAP) + une section livrable + des lignes « Ce skill ne fait pas », isomorphes au wiring `--distressed` déjà en place. Scoring : 1 cycle blind `SPAPE1` sur le chemin dense `spa-review --pe --side=sponsor` + contrôle live miroir sur `gap-review --pe`.

**Tech Stack:** Markdown (skills/références Cowork), Vitest (tests de structure `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts`), JSON (version lock 3-way), Bash (`scripts/da-scoring.sh`).

**Spec de référence :** [docs/superpowers/specs/2026-06-26-hacienda-da-pe-spa-gap-overlay-design.md](../specs/2026-06-26-hacienda-da-pe-spa-gap-overlay-design.md) — la **substance doctrinale des axes vit dans la spec §3/§4** ; ce plan en pilote la structure, le wiring exact, la discipline et la vérification. Le rédacteur de chaque tâche relit la spec §3/§4 pour le fond.

## Global Constraints

- **Plugin :** `plugins/hacienda-droit-affaires` (préfixe repo-relative pour tous les chemins ci-dessous).
- **Version :** bump `0.16.0` → `0.17.0` dans **exactement 3 fichiers JSON** : `.claude-plugin/plugin.json`, `version.json`, `mcp-server/package.json`. **Ne pas** toucher `mcp-server/src/version.ts` (statique, importe la version).
- **Count skills inchangé : 31.** Aucun nouveau dossier `skills/` — c'est un mode, pas un skill.
- **Versions frontmatter skill inchangées :** `spa-review` et `gap-review` restent `version: "2.0.0"` (le test n'attend `2.1.0` que pour `pacte-associes-review` ; le précédent `--distressed` n'a pas bumpé). **Ne pas** modifier `argument-hint` (générique, ne liste pas les flags → la synchro command-wrapper reste verte).
- **Préfixes commandes :** `/h-da:` pour Droit des affaires, `/h-pi:` pour PI. **Interdits dans tout fichier livré** (scannés par le test, hors `tests/`) : `/h-droit-affaires:`, `/hacienda-droit-affaires:`, `/hacienda-propriete-intellectuelle:`, et les noms d'outils camelCase `companyFullProfile`, `bodaccProcedures`, `bodaccBySiren`, `judilibreSearch`. Les deux SKILL.md traînent déjà l'ancien `/h-droit-affaires:` dans leur contenu existant — **ne pas le propager, ne pas le mass-fixer** (hors scope).
- **Ordre des headings :** le test ne contraint que l'ordre des 8 `##` canoniques (`Examples` → `Chargement du profil` → `Intake` → `Gate non-juriste` → `Mode Anno Desktop Optionnel` → `Outils MCP à privilégier` → `Emplacement des sorties` → `Sortie`). Toutes les insertions de ce plan sont **après `## Sortie`** (étapes `## Étape N`, sections livrable template, `## Ce skill ne fait pas`) → sans effet sur l'ordre canonique.
- **Discipline anti-fabrication :** dates relatives (semaines, jamais de date calendaire fabriquée), no quantum (`[à compléter]`), articles non vérifiés en source primaire → `[à vérifier]` (aucun LEGIARTI inventé), jugements subjectifs → `[review]`.
- **Encodage :** pas de CRLF (`\r\n`) dans les fichiers édités (le test l'interdit).
- **Vérification finale (chaque tâche relance le sous-ensemble pertinent) :** `npm test`, `npm run typecheck`, `npm run build`, `npm run branding:check`, `git diff --check`.

---

### Task 1 : Module frère `pe-spa-gap-overlay-fr.md`

**Files:**
- Create: `plugins/hacienda-droit-affaires/references/pe-spa-gap-overlay-fr.md`
- Read (référence, ne pas éditer) : `plugins/hacienda-droit-affaires/references/pe-overlay-fr.md`, `plugins/hacienda-droit-affaires/references/distressed-overlay-fr.md` (modèle de forme)
- Modify (si articles manquants) : `plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md`

**Interfaces:**
- Produces : un module markdown lu par `spa-review` (Task 2) et `gap-review` (Task 3) via le chemin `references/pe-spa-gap-overlay-fr.md`. Sections d'ancrage attendues par les skills : `## Axe S1` … `## Axe S5`, `## Axe W1` … `## Axe W3`, `## Lecture side-aware (sponsor)`, `## Renvois`.

- [ ] **Step 1 : Rédiger le module**

Créer `pe-spa-gap-overlay-fr.md` sur le moule de `distressed-overlay-fr.md`, avec ces sections (contenu doctrinal = spec §3/§4) :

1. **Titre + chapeau** : module chargé par `spa-review` / `gap-review` **uniquement** sous `--pe` ; hors flag, l'ignorer (revue standard inchangée). Side-aware, 1ʳᵉ vague **sponsor**.
2. **Renvoi au socle partagé** : une note explicite « Gate France/Lux, glossaire PE FR (~100 termes) et anti-fabrication PE : voir `references/pe-overlay-fr.md` — **non redupliqués ici**. » (critère de succès #3 : ne pas recopier).
3. **Axes SPA `## Axe S1`…`## Axe S5`** — chacun en deux temps (« ce que la revue standard couvre déjà » / « ce que l'overlay PE ajoute »), contenu = spec §3 :
   - S1 Mécanisme de prix PE (locked box vs completion accounts ; leakage hors plafond GAP `[review]`).
   - S2 Certain funds & financement (CP financement, ECL/DCL, BidCo SPV, condition de financement résiduelle `[review]`).
   - S3 MAC & période intercalaire (MAC PE, interim covenants, antitrust/IEF/CSE en CP `[à vérifier]`).
   - S4 Rollover & management package (cash-out→reinvest→adhésion pacte ; **renvoi `/h-da:pacte-associes-review --pe`** ; instruments **`/h-da:financement-startup`** ; requalif fiscale/sociale **nommée et renvoyée, jamais traitée**).
   - S5 Garanties, W&I & funds flow (renvoi **`/h-da:gap-review --pe`** ; security for claims ; funds flow → **`/h-da:closing-checklist-fr --pe-funds-flow`** à venir).
4. **Axes GAP `## Axe W1`…`## Axe W3`** — contenu = spec §3 :
   - W1 Matrice GAP / W&I / disclosure (couverture police vs GAP ; exclusions ; alignement rétention/de minimis/basket/cap ; disclosure letter outil).
   - W2 Recours limité côté cédant sponsor (GAP nil/1€ recourse adossée W&I ; security for claims ; sandbagging/anti-sandbagging `[review]`).
   - W3 Discipline disclosure FR (disclosure letter ↔ devoir d'information **1112-1 C.civ `[à vérifier]`** ; fair disclosure ; data room ; réticence dolosive **1137 C.civ `[à vérifier]`**).
5. **`## Lecture side-aware (sponsor)`** : tableau synthèse sponsor (imposer/structurer) vs cédant (protéger), une ligne par axe.
6. **`## Frontières propres`** : cible cotée/AMF → v2 ; cible en difficulté → **articulation avec `--distressed`, overlays s'empilent sans se dupliquer** (la doctrine distressed reste dans `distressed-overlay-fr.md`) ; docs fonds-only → `fonds-pe-fr-triage` (à venir).
7. **`## Renvois`** : `/h-da:pacte-associes-review --pe`, `/h-da:financement-startup`, `/h-da:gap-review --pe` ↔ `/h-da:spa-review --pe`, `/h-da:closing-checklist-fr` (à venir), `/h-pi:contrats-pi` si PI substantiel.

Discipline obligatoire dans tout le fichier : **`/h-da:` et `/h-pi:` uniquement** ; aucun préfixe interdit (Global Constraints) ; aucun nom d'outil camelCase ; tags `[review]` / `[à vérifier]` / `[à compléter]` conformes ; pas de CRLF.

- [ ] **Step 2 : Garantir les articles cités dans l'index**

Run : `grep -nE "1112-1|1137" plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md`
Si **absent** : ajouter une entrée `[à vérifier]` pour `1112-1 C.civ` (devoir précontractuel d'information) et `1137 C.civ` (réticence dolosive) dans l'index, sans inventer de LEGIARTI. Si **présent** : ne rien faire.

- [ ] **Step 3 : Vérifier l'hygiène des renvois et le branding**

Run : `cd /Users/candynguyen/dev/hacienda-juridique && npx vitest run packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts 2>&1 | tail -20`
Expected : tous verts (notamment « keeps Droit des affaires referrals aligned » et le count 31 — le nouveau fichier `references/` est scanné mais ne doit déclencher aucun préfixe interdit).

Run : `cd /Users/candynguyen/dev/hacienda-juridique && npm run branding:check 2>&1 | tail -5`
Expected : PASS (zéro branding non-Hacienda).

- [ ] **Step 4 : Commit**

```bash
cd /Users/candynguyen/dev/hacienda-juridique
git add plugins/hacienda-droit-affaires/references/pe-spa-gap-overlay-fr.md plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md
git commit -m "feat(da): module frère pe-spa-gap-overlay-fr (axes S1-S5 + W1-W3, side sponsor)"
```

---

### Task 2 : Wiring `spa-review --pe`

**Files:**
- Modify : `plugins/hacienda-droit-affaires/skills/spa-review/SKILL.md`
- Read (référence) : la même section `--distressed` déjà présente (intake item 1, Étape 9bis ~ligne 335, section livrable `## Overlay difficulté` ~ligne 394, `Ce skill ne fait pas` ~ligne 454)

**Interfaces:**
- Consumes : `references/pe-spa-gap-overlay-fr.md` (Task 1), axes `## Axe S1`…`## Axe S5`.
- Produces : commande `/h-da:spa-review --pe --side=sponsor|cedant` opérationnelle.

- [ ] **Step 1 : Intake — déclarer le mode**

Dans `## Intake`, à l'item **Mode** (où `--distressed` est déjà mentionné), ajouter `--pe` :
> `--pe` (overlay Private Equity, side sponsor — charge `references/pe-spa-gap-overlay-fr.md`) avec `--side=sponsor` (défaut) ou `--side=cedant`. Hors `--pe`, si des **signaux PE** (sponsor/BidCo/management package/rollover/ratchet/liquidation preference) sont détectés, **proposer** l'overlay sans l'imposer.

- [ ] **Step 2 : Étape conditionnelle 9ter**

Insérer après l'`## Étape 9bis — Overlay difficulté` (avant `## Étape 10`) :

```markdown
## Étape 9ter — Overlay PE (si `--pe` ou overlay accepté)

**N'exécuter que si le mode PE est actif.** Charger `references/pe-spa-gap-overlay-fr.md`
et appliquer ses axes **side-aware sponsor** au SPA :
1. **S1 — mécanisme de prix PE** : locked box vs completion accounts ; leakage hors plafond GAP `[review]`.
2. **S2 — certain funds & financement** : CP financement, ECL/DCL, BidCo SPV ; condition de financement résiduelle = risque d'exécution `[review]`.
3. **S3 — MAC & période intercalaire** : MAC PE, interim covenants, antitrust/IEF/CSE en CP `[à vérifier]`.
4. **S4 — rollover & management package** : cohérence SPA↔pacte → renvoi `/h-da:pacte-associes-review --pe` ; instruments → `/h-da:financement-startup` ; **requalif fiscale/sociale nommée et renvoyée, jamais traitée**.
5. **S5 — garanties, W&I & funds flow** : articulation GAP/W&I → renvoi `/h-da:gap-review --pe` ; security for claims ; funds flow → `/h-da:closing-checklist-fr` (à venir).

**Gate France/Lux** (cf. module partagé) : entité/docs fonds Lux → STOP overlay, renvoi conseil luxembourgeois ; l'overlay couvre la jambe FR. Sortir les findings PE dans la liste de points (sévérité 🟢🟡🟠🔴) et une ligne dédiée du résumé. **Ne pas chiffrer** le leakage / l'ajustement de prix (`[à compléter]`) ; **ne pas dater** le closing (semaines relatives). Si la cible est aussi en difficulté, **les overlays `--pe` et `--distressed` s'empilent** sans se dupliquer.
```

- [ ] **Step 3 : Section livrable**

Dans le template de sortie, après `## Overlay difficulté (si --distressed)`, ajouter :

```markdown
## Overlay PE (si `--pe`)
- Side : {sponsor | cedant}
- Findings par axe : {S1 prix · S2 certain funds · S3 MAC · S4 rollover · S5 W&I/funds flow}
- Renvois PE : {pacte-associes-review --pe / gap-review --pe / financement-startup / closing-checklist-fr (à venir)}
```

- [ ] **Step 4 : `Ce skill ne fait pas`**

Dans `## Ce skill ne fait pas`, ajouter (mode `--pe`) :
> - **Traiter au fond** la requalification fiscale/sociale du management package en mode `--pe` (nommée et renvoyée).
> - **Structurer/rédiger** les instruments du management package (→ `/h-da:financement-startup`).
> - **Chiffrer** le leakage / l'ajustement de prix (`[à compléter]`).

- [ ] **Step 5 : Vérifier (structure, count, command-sync, heading order)**

Run : `cd /Users/candynguyen/dev/hacienda-juridique && npx vitest run packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts 2>&1 | tail -20`
Expected : tous verts (count 31 ; ordre des 8 `##` canoniques préservé ; `argument-hint`/`description` inchangés → synchro command-wrapper verte ; aucun préfixe interdit introduit).

- [ ] **Step 6 : Commit**

```bash
cd /Users/candynguyen/dev/hacienda-juridique
git add plugins/hacienda-droit-affaires/skills/spa-review/SKILL.md
git commit -m "feat(da): wiring spa-review --pe (intake + étape 9ter + livrable)"
```

---

### Task 3 : Wiring `gap-review --pe` (matrice W&I)

**Files:**
- Modify : `plugins/hacienda-droit-affaires/skills/gap-review/SKILL.md`
- Read (référence) : section `--distressed` déjà présente (intake item 5 ~ligne 92, Étape 6bis ~ligne 240, section livrable `## Overlay difficulté` ~ligne 309, `Ce skill ne fait pas` ~ligne 366)

**Interfaces:**
- Consumes : `references/pe-spa-gap-overlay-fr.md` (Task 1), axes `## Axe W1`…`## Axe W3`.
- Produces : commande `/h-da:gap-review --pe` opérationnelle (chemin du contrôle live miroir).

- [ ] **Step 1 : Intake — déclarer le mode**

Dans `## Intake`, après l'item Mode `--distressed`, ajouter un item :
> **Mode `--pe`** (optionnel) — overlay Private Equity side sponsor : charge `references/pe-spa-gap-overlay-fr.md` et centre la GAP sur la **matrice GAP / W&I / disclosure**. `--side=sponsor` par défaut. Hors flag, si des signaux PE apparaissent, **proposer** l'overlay sans l'imposer.

- [ ] **Step 2 : Étape conditionnelle 6ter**

Insérer après `## Étape 6bis — Overlay difficulté` (avant `## Étape 7`) :

```markdown
## Étape 6ter — Overlay PE — matrice GAP/W&I/disclosure (si `--pe` ou overlay accepté)

**N'exécuter que si le mode PE est actif.** Charger `references/pe-spa-gap-overlay-fr.md` :
1. **W1 — matrice GAP / W&I / disclosure** : ce que la police W&I couvre vs la GAP ; exclusions (known issues, forward-looking, environnement, transfer pricing) ; alignement rétention / de minimis / basket / cap **police ↔ GAP** ; disclosure letter comme outil contre les exclusions « known ».
2. **W2 — recours limité côté cédant sponsor** : GAP « nil recourse / 1 € » adossée W&I — l'acquéreur s'appuie sur la police, pas sur le covenant du cédant sortant ; security for claims ; sandbagging / anti-sandbagging `[review]`.
3. **W3 — discipline disclosure FR** : articulation disclosure letter ↔ devoir d'information `1112-1 C.civ [à vérifier]` ; fair disclosure ; data room comme disclosure ; réticence dolosive `1137 C.civ [à vérifier]`.

**Gate France/Lux** (cf. module partagé) : docs fonds Lux hors périmètre. Intégrer les findings PE dans la liste de points (sévérité side-aware sponsor). Si la cible est aussi en difficulté, **les overlays `--pe` et `--distressed` s'empilent** sans se dupliquer (garantie de la garantie reste l'axe distressed). **Ne pas chiffrer** (`[à compléter]`).
```

- [ ] **Step 3 : Section livrable**

Après `## Overlay difficulté (si --distressed)`, ajouter :

```markdown
## Overlay PE (si `--pe`)
- Side : {sponsor | cedant}
- Matrice : {W1 GAP/W&I/disclosure · W2 recours limité · W3 disclosure FR}
- Renvois PE : {spa-review --pe / pacte-associes-review --pe}
```

- [ ] **Step 4 : `Ce skill ne fait pas`**

Dans `## Ce skill ne fait pas`, ajouter :
> - **Souscrire / placer** la police W&I ni en interpréter les conditions au fond en mode `--pe` (signalée, articulation seulement).
> - **Traiter au fond** la requalification fiscale/sociale (nommée et renvoyée).

- [ ] **Step 5 : Vérifier**

Run : `cd /Users/candynguyen/dev/hacienda-juridique && npx vitest run packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts 2>&1 | tail -20`
Expected : tous verts.

- [ ] **Step 6 : Commit**

```bash
cd /Users/candynguyen/dev/hacienda-juridique
git add plugins/hacienda-droit-affaires/skills/gap-review/SKILL.md
git commit -m "feat(da): wiring gap-review --pe (matrice GAP/W&I/disclosure, étape 6ter)"
```

---

### Task 4 : Release surface (renvois module pacte + README + CHANGELOG + version)

**Files:**
- Modify : `plugins/hacienda-droit-affaires/references/pe-overlay-fr.md` (**uniquement la section `## Renvois`**)
- Modify : `plugins/hacienda-droit-affaires/README.md`
- Modify : `plugins/hacienda-droit-affaires/CHANGELOG.md`
- Modify : `plugins/hacienda-droit-affaires/.claude-plugin/plugin.json`, `plugins/hacienda-droit-affaires/version.json`, `plugins/hacienda-droit-affaires/mcp-server/package.json`

**Interfaces:**
- Consumes : modes livrés en Task 2/3 (les renvois pointent désormais des commandes live).

- [ ] **Step 1 : Activer la forward-ref dans `pe-overlay-fr.md`**

Dans la section `## Renvois` de `pe-overlay-fr.md`, remplacer la ligne `spa-review --pe (à venir — vague PE candidat #2)` par :
> - Revue SPA côté sponsor (locked box, certain funds, rollover, MAC, W&I) : `/h-da:spa-review --pe --side=sponsor`.
> - Revue GAP sous l'angle W&I / disclosure : `/h-da:gap-review --pe`.

Ne **rien** changer d'autre dans ce fichier (zéro édition de la doctrine pacte).

- [ ] **Step 2 : README — mentionner le mode**

Dans `README.md`, sous les entrées `spa-review` et `gap-review`, ajouter une mention courte du mode `--pe` (côté sponsor, overlay Private Equity). Conserver les liens `/h-da:spa-review` et `/h-da:gap-review` déjà présents.

- [ ] **Step 3 : CHANGELOG + bump version**

Ajouter une entrée `## 0.17.0` en tête de `CHANGELOG.md` décrivant le mode `--pe` sur spa-review/gap-review (module frère partagé, axes S1–S5 / W1–W3, side sponsor, count 31 inchangé).

Passer `"version": "0.16.0"` → `"version": "0.17.0"` dans les **3** fichiers : `.claude-plugin/plugin.json`, `version.json`, `mcp-server/package.json`.

- [ ] **Step 4 : Vérifier le lock de version + structure**

Run : `cd /Users/candynguyen/dev/hacienda-juridique && npx vitest run packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts 2>&1 | tail -20`
Expected : « aligns visible plugin versions » vert (3 JSON = 0.17.0, `version.ts` inchangé), README documente chaque skill, aucun préfixe interdit.

- [ ] **Step 5 : Commit**

```bash
cd /Users/candynguyen/dev/hacienda-juridique
git add plugins/hacienda-droit-affaires/references/pe-overlay-fr.md plugins/hacienda-droit-affaires/README.md plugins/hacienda-droit-affaires/CHANGELOG.md plugins/hacienda-droit-affaires/.claude-plugin/plugin.json plugins/hacienda-droit-affaires/version.json plugins/hacienda-droit-affaires/mcp-server/package.json
git commit -m "feat(da): release surface --pe spa/gap — renvois live, README, CHANGELOG, v0.17.0"
```

---

### Task 5 : Scoring scaffolding (wrapper + dataset)

**Files:**
- Modify : `scripts/da-scoring.sh`
- Create : `plugins/hacienda-droit-affaires/tests/datasets/da-spa-review-pe/scenario.md`
- Read (modèle) : `plugins/hacienda-droit-affaires/tests/datasets/da-spa-review-distressed/scenario.md`

**Interfaces:**
- Consumes : la commande `/h-da:spa-review --pe --side=sponsor` (Task 2).
- Produces : l'entrée de scoring `spa-review-pe` (code `SPAPE1`) que Candy lancera via le wrapper.

- [ ] **Step 1 : Ajouter l'entrée wrapper `spa-review-pe`**

Dans `scripts/da-scoring.sh`, mirroir de `spa-review-distressed` :
- Ajouter `spa-review-pe` au tableau `SKILLS`.
- `code_for` : `spa-review-pe) echo "SPAPE1" ;;`
- `mode_for` : une ligne décrivant `revue SPA avec overlay --pe (cible PE, side sponsor)`.
- `desc_for` (description **NEUTRE** pour Codex Phase 2, **pas** le SKILL.md) : `revue d'un SPA d'acquisition LBO cote sponsor : locked box, certain funds, MAC, rollover/management package, articulation GAP/W&I`.
- `command_for` : `/h-da:spa-review --pe --side=sponsor`.
- Vérifier la fonction qui dérive le dossier dataset : l'entrée `spa-review-pe` doit pointer `tests/datasets/da-spa-review-pe/` (mirroir `spa-review-distressed` → `da-spa-review-distressed`).

- [ ] **Step 2 : Rédiger le scénario fictif (Phase 1, sans solution)**

Créer `da-spa-review-pe/scenario.md` sur le moule du scénario distressed : chapeau « fact pattern fictif, sans solution » ; **requête utilisateur** (acquéreur/sponsor PE demandant une revue SPA côté sponsor avec management package et rollover) ; **faits communiqués** (BidCo/sponsor fictifs, cible SAS saine non en difficulté, prix locked box, CP financement, equity + debt commitment, managers rollover avec sweet equity et leaver). Noms/chiffres/SIREN **inventés**. **Aucune solution, aucun axe nommé** (le ground-truth est produit en Phase 2 par Codex sans accès au SKILL.md). Matérialiser les 5 pièges-cibles du futur scoring sans les étiqueter : (1) leakage non remboursé hors plafond GAP, (2) condition de financement résiduelle, (3) reserved matters sponsor très larges (gestion de fait), (4) bad leaver à prix nominal confiscatoire, (5) entité Lux dans la structure (gate). Pas de CRLF.

- [ ] **Step 3 : Smoke-test du wrapper**

Run : `cd /Users/candynguyen/dev/hacienda-juridique && bash scripts/da-scoring.sh phase1 spa-review-pe 2>&1 | head -20`
Expected : génère un prompt Phase 1 référant le scénario `da-spa-review-pe` et le code `SPAPE1` (pas d'erreur « skill inconnu »).

Run : `cd /Users/candynguyen/dev/hacienda-juridique && npx vitest run packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts 2>&1 | tail -5`
Expected : vert (le dossier `tests/` est exclu du lint des renvois → le scénario n'impacte pas le test).

- [ ] **Step 4 : Commit**

```bash
cd /Users/candynguyen/dev/hacienda-juridique
git add scripts/da-scoring.sh plugins/hacienda-droit-affaires/tests/datasets/da-spa-review-pe/scenario.md
git commit -m "test(da): scaffolding scoring spa-review-pe (wrapper SPAPE1 + scénario fictif)"
```

---

### Task 6 : Vérification whole-branch + revue

**Files:** aucun (gate de vérification).

- [ ] **Step 1 : Suite complète**

Run : `cd /Users/candynguyen/dev/hacienda-juridique && npm test 2>&1 | tail -25`
Expected : tous verts (≈ 309 ✓, 3 skip eurlex-live), count 31, structure 11/11, version lock 0.17.0.

Run : `cd /Users/candynguyen/dev/hacienda-juridique && npm run typecheck && npm run build && npm run branding:check 2>&1 | tail -10`
Expected : typecheck/build/branding verts.

Run : `cd /Users/candynguyen/dev/hacienda-juridique && git diff --check`
Expected : aucune erreur d'espaces/conflits.

- [ ] **Step 2 : Contrôle live miroir `gap-review --pe`**

Dérouler mentalement (ou en session) `gap-review --pe` sur un cas W&I pour confirmer que l'étape 6ter charge le module et produit la matrice W1–W3 sans incohérence avec spa-review (même module). Sanity, **pas** de cycle blind complet (cf. spec §5).

- [ ] **Step 3 : Revue whole-branch (Opus) + finishing**

Lancer une revue de branche (findings Critical/Important → corrigés inline). Puis invoquer `superpowers:finishing-a-development-branch` pour décider merge / PR. **Le cycle blind `SPAPE1` (Phase 1→4) est lancé par Candy** via le wrapper (token economy) ; le release gate est franchi sur ADMIS gate-clean.

---

## Notes d'exécution

- **Substance doctrinale** : déléguée aux rédacteurs de Task 1–3 depuis la spec §3/§4 ; le relecteur valide direction/UX/scope, pas le fond ligne à ligne.
- **Scoring** : `SPAPE1` sur `spa-review --pe --side=sponsor` (Phases 1→4, protocole blind CLAUDE.md racine), checkpoint gates avant Phase 3 (gate-piège, pas gate-recall). Commandes lancées côté Candy.
- **Intendance hors branche** (rappel handoff §4, ne pas traiter ici) : index GitNexus stale.
