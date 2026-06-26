# Mode `pacte-associes-review --pe` — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter un mode `--pe` (overlay Private Equity / pacte d'investissement) à `pacte-associes-review`, isomorphe à l'overlay `--distressed`, sans aucune régression de la revue standard.

**Architecture :** Un module doctrine partagé `references/pe-overlay-fr.md` (gate France/Lux + signaux + axes P1-P5 + glossaire praticien + side-aware + anti-fabrication) chargé uniquement quand `--pe` est posé ou accepté après auto-détection ; une étape conditionnelle 2bis dans le SKILL.md ; un bloc de sortie « Architecture documentaire & précédence » ; un dataset de scoring blind dédié. Hors flag, la revue 11 clauses est strictement inchangée.

**Tech Stack :** Markdown (SKILL.md + modules `references/`), JSON datasets de scoring, scripts shell (`da-scoring.sh`), chaîne de vérif npm (`@hacienda/core`).

## Global Constraints

- Langue produit : **français**. Branding **Hacienda uniquement** — ne réintroduire aucun chemin/manifest/branding non-Hacienda (CLAUDE.md projet, règle #1).
- **Zéro régression** : hors `--pe`, la sortie de la revue standard doit rester bit-identique.
- **Module chargé uniquement** quand `--pe` posé ou auto-proposition acceptée. Hors mode, le module est ignoré.
- **Anti-fabrication** : aucune date fabriquée ; requalification fiscale/sociale du management package = **nommée et renvoyée, jamais traitée** ; pas de quantum ; léonine / gestion de fait = `[review]`, jamais conclusion ; instruments → renvoi `financement-startup`.
- **Citations** : tout article non vérifié contre `articles-c-civ-c-com-index.md` ou `verifier-citations` = `[à vérifier]`. Aucune fausse jurisprudence.
- **Gate France/Lux** : docs luxembourgeois hors périmètre ; couvrir la jambe FR.
- Vérif verte obligatoire avant fin : `npm test` (309, 3 skip eurlex-live), `npm run typecheck`, `npm run build`, `npm run branding:check`, `git diff --check`. Structure 11/11, **count skills inchangé = 31** (c'est un mode, pas un skill).
- Travail sur **branche dédiée** `feat/da-pacte-pe-overlay`, jamais sur `main`.
- Bump `pacte-associes-review` **v2.0.0 → v2.1.0**.

**Fichiers de référence à imiter** (pattern distressed déjà ADMIS) :
- Module : `plugins/hacienda-droit-affaires/references/distressed-overlay-fr.md`
- Étape conditionnelle : `plugins/hacienda-droit-affaires/skills/spa-review/SKILL.md` (étape 9bis)
- Dataset : `plugins/hacienda-droit-affaires/tests/datasets/da-spa-review-distressed/`
- Wrapper scoring : `scripts/da-scoring.sh` (entrée SPADIS)
- Spec source : `docs/backlog/da-pacte-associes-pe-spec.md`

---

## File Structure

| Fichier | Responsabilité | Action |
|---|---|---|
| `plugins/hacienda-droit-affaires/references/pe-overlay-fr.md` | Module doctrine PE partagé (source unique) | **Create** |
| `plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md` | Index articles : ajout des articles PE-spécifiques | **Modify** |
| `plugins/hacienda-droit-affaires/skills/pacte-associes-review/SKILL.md` | Frontmatter, intake, gate, étape 1 (détection), étape 2bis, sortie, « ne fait pas », examples | **Modify** |
| `plugins/hacienda-droit-affaires/.claude-plugin/plugin.json` (+ README, CHANGELOG, marketplace racine) | Bump version + mention mode | **Modify** |
| `plugins/hacienda-droit-affaires/tests/datasets/da-pacte-associes-pe/scenario.md` | Fact-pattern de scoring (matérialise les erreurs dangereuses) | **Create** |
| `scripts/da-scoring.sh` | Entrée de cycle pacte-pe (prompts phases 2/3/4) | **Modify** |
| `docs/backlog/da-pacte-associes-pe-spec.md` | Spec (déjà écrite) | — |

---

## Task 1 : Index citations — articles PE-spécifiques

**Files:**
- Modify: `plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md`

**Interfaces:**
- Produces: les entrées d'index (article → identifiant Légifrance réel ou `[à vérifier]`) que le module `pe-overlay-fr.md` (Task 2) et l'étape 2bis (Task 3) citeront.

C'est le prérequis citations de la spec §6. Le mode joue surtout de la clause-craft, donc peu d'articles neufs — mais ceux du module doivent exister dans l'index ou être explicitement `[à vérifier]`.

- [ ] **Step 1 : Lister les articles PE-spécifiques à statuer**

Articles candidats introduits par le module (au-delà de ceux déjà dans l'index) :
- gestion de fait / dirigeant de fait (fondement à confirmer) ;
- liquidation preference (pas d'article dédié — montage contractuel, à noter comme tel) ;
- 1844-1 al. 2 C.civ (léonine) — **déjà dans l'index en `[à vérifier]`**, réutiliser ;
- L.227-9 / L.227-13/14/15, L.228-23/24 — **déjà présents**, réutiliser pour la précédence statuts/pacte.

- [ ] **Step 2 : Vérifier les articles statuables via `verifier-citations` ou un Codex effort-high**

Lancer (côté Candy, ou via le skill `verifier-citations`) la vérification des fondements neufs. Tout ce qui n'est pas confirmé par un identifiant Légifrance réel reste `[à vérifier]`.

- [ ] **Step 3 : Mettre à jour l'index**

Ajouter les entrées manquantes dans `articles-c-civ-c-com-index.md` en respectant le format existant (article | identifiant Légifrance réel | ou `[a compléter]`/`[à vérifier]`). Ne **pas** inventer d'identifiant.

- [ ] **Step 4 : Vérifier**

Run: `npm run branding:check && git diff --check`
Expected: PASS (pas de marqueur de conflit, pas de branding étranger).

- [ ] **Step 5 : Commit**

```bash
git add plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md
git commit -m "feat(da): index articles PE-spécifiques pour overlay pacte --pe"
```

---

## Task 2 : Module partagé `pe-overlay-fr.md`

**Files:**
- Create: `plugins/hacienda-droit-affaires/references/pe-overlay-fr.md`
- Lire pour imiter : `references/distressed-overlay-fr.md`, `docs/backlog/da-pe-landscape-fr-v2-pratique.md` (glossaire + douleurs), `docs/backlog/da-pacte-associes-pe-spec.md` (§3, §4).

**Interfaces:**
- Consumes: l'index de Task 1.
- Produces: le module chargé par l'étape 2bis (Task 3) ; les 4 futurs modes PE le réutiliseront (glossaire + gate partagés).

- [ ] **Step 1 : Rédiger l'ossature du module** (calquée sur `distressed-overlay-fr.md`)

Sections, dans l'ordre :
1. Titre + note « chargé uniquement en mode `--pe` ; hors mode, revue standard inchangée ».
2. **Périmètre + side-aware** (sponsor / management).
3. **Gate d'application France/Lux** — STOP sur entité/docs Lux, couvre la jambe FR. Reprendre la formulation type du landscape §5.
4. **Signaux de détection** (auto-proposition) : pacte d'investissement, sponsor/fonds, BidCo/HoldCo/NewCo/TopCo, management package/MEP, rollover/reinvest, sweet equity, ratchet, envy ratio, liquidation preference, leaver indexé LBO, drag « sortie sponsor ». Un signal sérieux → proposer.
5. **Axes P1-P5** (détaillés ci-dessous).
6. **Lecture side-aware** (tableau sponsor / management).
7. **Anti-fabrication PE** (voir Global Constraints).
8. **Renvois** : `financement-startup`, `spa-review --pe` (à venir), `gap-review`, `asset-vs-share-distress`, `PI:contrats-pi`.

- [ ] **Step 2 : Rédiger la doctrine des 5 axes** (contenu de la spec §3)

- **P1 — Précédence & architecture** (axe lourd) : superposition pacte d'investissement / pacte existant / statuts ; clause de précédence, accession, amendment, termination du pacte historique ; cohérence statuts↔pacte↔SPA. Conflit non résolu = `[review]`. FAIL-type : rater un conflit de précédence qui piège le client.
- **P2 — Gouvernance sponsor** : reserved matters / véto trop large → risque **gestion de fait** `[review]` ; board composition ; information rights calibrés.
- **P3 — Économie & préférences** : liquidation preference, ratchet, sweet equity mechanics ; **léonine watch** (1844-1 `[à vérifier]`).
- **P4 — Management & leaver PE** : vesting/reverse vesting, leaver indexé package, adhésion rollover au pacte, cumul associé/salarié/mandataire. **Requalification fiscale/sociale nommée et renvoyée, jamais traitée.**
- **P5 — Liquidité & sortie sponsor** : drag sous l'angle sortie sponsor (seuil, égalité conditions, garanties imposées aux minoritaires), put/call, ROFR, lock-up IPO.

- [ ] **Step 3 : Intégrer le glossaire praticien complet**

Copier-adapter le glossaire ~90 termes de `docs/backlog/da-pe-landscape-fr-v2-pratique.md` §1, avec la discipline `[jargon marché]` / `[formel]` / `[à vérifier]`. C'est l'actif partagé des 4 futurs modes.

- [ ] **Step 4 : Vérifier la cohérence frontière**

Relire : le module dit-il 4× la frontière de façon cohérente (gate §3, anti-fabrication §7, « ne fait pas » renvoyé, side-aware) ? Aucune citation sans tag de provenance.

- [ ] **Step 5 : Vérifier**

Run: `npm run branding:check && git diff --check`
Expected: PASS.

- [ ] **Step 6 : Commit**

```bash
git add plugins/hacienda-droit-affaires/references/pe-overlay-fr.md
git commit -m "feat(da): module pe-overlay-fr — doctrine PE + glossaire + gate France/Lux"
```

---

## Task 3 : Wiring du mode dans `SKILL.md`

**Files:**
- Modify: `plugins/hacienda-droit-affaires/skills/pacte-associes-review/SKILL.md`

**Interfaces:**
- Consumes: `references/pe-overlay-fr.md` (Task 2).
- Produces: le mode `--pe` user-facing (flag + étape 2bis + bloc précédence).

**Règle de non-régression : toutes les additions sont conditionnelles à `--pe`. Aucune ligne du chemin standard n'est modifiée sémantiquement.**

- [ ] **Step 1 : Frontmatter**

Modifier : `version: "2.0.0"` → `version: "2.1.0"`. Étendre `argument-hint` pour mentionner `--pe` et `--side=sponsor|management`. Ajouter aux `tags` : `private-equity, pacte-investissement, lbo, management-package`.

- [ ] **Step 2 : Intake** (après le point 4 existant)

Ajouter :
```
5. **Mode `--pe`** (optionnel) — overlay Private Equity / pacte d'investissement. Active l'étape 2bis. Auto-proposé si des signaux PE sont détectés (voir `references/pe-overlay-fr.md`).
6. **Side PE** (avec `--pe`) — `--side=sponsor | management`. En mode `--pe`, `--side` bascule sur ce couple (la lecture side-aware et le glossaire deviennent sponsor/manager). Hors `--pe`, les sides standard fondateur/investisseur/société s'appliquent.
```

- [ ] **Step 3 : Gate non-juriste** (ajouter des items conditionnels)

```
- [ ] Si `--pe` : module `pe-overlay-fr.md` chargé, gate France/Lux posé, 5 axes P1-P5 passés, side sponsor/management appliqué
- [ ] Si `--pe` : requalification fiscale/sociale du management package nommée et renvoyée, jamais traitée au fond
- [ ] Hors `--pe` : revue standard 11 clauses strictement inchangée
```

- [ ] **Step 4 : Étape 1 — détection PE**

À la fin de l'étape 1 (Pré-flight + identification), ajouter un sous-point :
```
5. **Détection PE.** Repérer les signaux PE (voir `references/pe-overlay-fr.md` §signaux). Si présents et que `--pe` n'est pas posé : proposer l'overlay PE et attendre l'acceptation avant d'exécuter l'étape 2bis. Ne pas activer l'overlay sans flag ni acceptation.
```

- [ ] **Step 5 : Insérer l'étape 2bis** (nouvelle section, après l'étape 2)

```
## Étape 2bis — Overlay Private Equity (mode `--pe` uniquement)

Ne s'exécute que si `--pe` est posé OU si des signaux PE ont été détectés (étape 1) et l'utilisateur a accepté la proposition. Sinon, sauter entièrement cette étape : la revue standard est complète sans elle.

1. Charger `references/pe-overlay-fr.md`.
2. **Gate d'application France/Lux.** Si le pacte vise une entité luxembourgeoise ou que les documents sont régis par le droit luxembourgeois : couvrir la seule jambe FR et exclure les docs Lux (formulation type du module). Ne pas analyser un pacte Lux comme un pacte FR.
3. Basculer le side sur **sponsor / management**.
4. Passer les **5 axes P1-P5** du module. Les findings P2-P5 se fondent dans la liste de points (étape 3), triés par criticité, avec le side appliqué.
5. Produire le **bloc « Architecture documentaire & précédence »** (P1) : matrice statuts ↔ pacte existant ↔ pacte d'investissement + liste des conflits de précédence. Ce bloc se place **au-dessus** de la liste de points dans la sortie.
6. **Anti-fabrication** : requalification fiscale/sociale = nommée et renvoyée ; pas de quantum ; léonine / gestion de fait = `[review]` ; instruments → `financement-startup` ; pas de date fabriquée.
```

- [ ] **Step 6 : Sortie — bloc précédence conditionnel**

Dans la section `## Sortie` / `### Format livrable`, ajouter (entre la note du relecteur et le résumé exécutif, **conditionnel `--pe`**) :
```
{Si mode --pe : bloc « Architecture documentaire & précédence » — matrice statuts / pacte existant / pacte d'investissement + conflits de précédence. Sinon, omettre.}
```

- [ ] **Step 7 : `Ce skill ne fait pas`** (ajouter 4 bullets de la spec §7)

```
- (mode PE) Traiter le volet **fonds** (règlement / LPA / side letters) → `fonds-pe-fr-triage` (vague ultérieure).
- (mode PE) Donner un avis **fiscal/social** sur le management package — requalification signalée et renvoyée.
- (mode PE) **Rédiger** le pacte d'investissement (review only).
- (mode PE) Couvrir les **documents luxembourgeois** (gate France/Lux).
```

- [ ] **Step 8 : Ajouter un exemple `--pe`** dans `## Examples`

```
<example>
<user>/h-droit-affaires:pacte-associes-review ./pacte-investissement-lbo.pdf --pe --side=management</user>
<response>
1. Pré-flight check-pii + lecture profil
2. Identification : pacte d'investissement, SAS HoldCo FR, sponsor + managers rollover → signaux PE
3. Gate France/Lux : HoldCo FR, docs FR → jambe FR couverte
4. Étape 2bis : 5 axes P1-P5, side=management
5. Bloc « Architecture documentaire & précédence » : conflit détecté entre le pacte d'investissement et le pacte existant non résolu par clause de précédence → 🔴
6. Liste de points : bad leaver à valeur nominale indifférencié → 🔴 (léonine [review]) ; véto sponsor très large → gestion de fait [review] ; requalification fiscale/sociale du sweet equity → nommée et renvoyée
</response>
</example>
```

- [ ] **Step 9 : Vérifier la non-régression (le test central)**

```bash
# Hors --pe, la sortie doit être inchangée : vérifier qu'aucune ligne du chemin standard n'a été modifiée sémantiquement.
git diff plugins/hacienda-droit-affaires/skills/pacte-associes-review/SKILL.md
```
Expected: toutes les additions sont des sections/items neufs ou explicitement conditionnés `--pe` ; aucune réécriture des étapes 1-4 standard, du format de sortie standard, ni des points de fond des 11 clauses.

- [ ] **Step 10 : Vérifier la chaîne**

Run: `npm test && npm run typecheck && npm run build && npm run branding:check && git diff --check`
Expected: 309 ✓ (3 skip eurlex-live), typecheck/build/branding verts, structure 11/11, count 31.

- [ ] **Step 11 : Commit**

```bash
git add plugins/hacienda-droit-affaires/skills/pacte-associes-review/SKILL.md
git commit -m "feat(da): pacte-associes-review --pe — étape 2bis overlay Private Equity (v2.1.0)"
```

---

## Task 4 : Version + README + CHANGELOG

**Files:**
- Modify: `plugins/hacienda-droit-affaires/.claude-plugin/plugin.json`
- Modify: `.claude-plugin/marketplace.json` (racine)
- Modify: `plugins/hacienda-droit-affaires/README.md`
- Modify: `plugins/hacienda-droit-affaires/CHANGELOG.md`

**Interfaces:**
- Consumes: le mode livré par Task 3.

- [ ] **Step 1 : Repérer tous les emplacements de version**

```bash
grep -rn "version" plugins/hacienda-droit-affaires/.claude-plugin/plugin.json .claude-plugin/marketplace.json
```
Bumper la version du plugin (suivre le pas du bump distressed v0.14.0→v0.15.0 ; ici incrément mineur cohérent). `pacte-associes-review` passe à 2.1.0 (déjà fait Task 3, frontmatter).

- [ ] **Step 2 : README — mention du mode**

Ajouter une ligne décrivant `pacte-associes-review --pe` (overlay Private Equity / pacte d'investissement) dans la section du skill. Mentionner aussi, tant qu'on y est, le mode `declaration-creance --releve-forclusion` (reco du doc releve-forclusion-statut, intendance bon marché — **optionnel**, confirmer avec Candy).

- [ ] **Step 3 : CHANGELOG**

Entrée nouvelle version : « Ajout du mode `--pe` (overlay Private Equity) à `pacte-associes-review` : module partagé `pe-overlay-fr.md`, axes P1-P5, gate France/Lux, side sponsor/management. Revue standard inchangée. »

- [ ] **Step 4 : Vérifier**

Run: `npm run build && npm run branding:check && git diff --check`
Expected: PASS.

- [ ] **Step 5 : Commit**

```bash
git add plugins/hacienda-droit-affaires/.claude-plugin/plugin.json .claude-plugin/marketplace.json plugins/hacienda-droit-affaires/README.md plugins/hacienda-droit-affaires/CHANGELOG.md
git commit -m "docs(da): bump version + mention mode pacte --pe (README, CHANGELOG)"
```

---

## Task 5 : Dataset de scoring + wrapper

**Files:**
- Create: `plugins/hacienda-droit-affaires/tests/datasets/da-pacte-associes-pe/scenario.md`
- Modify: `scripts/da-scoring.sh`
- Lire pour imiter : `tests/datasets/da-spa-review-distressed/scenario.md`, l'entrée SPADIS de `da-scoring.sh`.

**Interfaces:**
- Produces: le scénario et l'entrée de cycle que Candy utilisera pour lancer le blind 4 phases (`ground-truth.md`, `live-output.md`, `verdicts-<CODE>.json` seront produits par les phases, pas par ce plan).

- [ ] **Step 1 : Rédiger `scenario.md`**

Fact-pattern réaliste qui **matérialise les erreurs dangereuses** (calibration de gate de la spec §8) :
- Pacte d'investissement LBO sur SAS HoldCo **FR**, sponsor + managers rollover.
- **Piège précédence** : pacte d'investissement + pacte existant non résolus par clause de précédence (P1 — FAIL si raté).
- **Piège léonine** : bad leaver à valeur nominale indifférencié (P4 — décote confiscatoire).
- **Piège gestion de fait** : véto sponsor très large (P2).
- **Piège fiscal/social** : sweet equity managers — l'overlay doit nommer et renvoyer, **jamais** trancher (anti-fabrication).
- **Piège gate France/Lux** : inclure un document satellite régi par le **droit luxembourgeois** → FAIL si l'overlay le traite comme FR (gate **non** affirmatif-orphelin : FAIL = traite Lux comme FR ; PASS = complément).

- [ ] **Step 2 : Ajouter l'entrée de cycle dans `da-scoring.sh`**

Reproduire le mécanisme SPADIS (un code de cycle, ex. `PACPE`, et les sous-commandes phase2 / phase3-prompt / phase4 / aggregate avec substitution de placeholders et garde-fous anti-leakage). Ne pas dupliquer la logique — généraliser l'entrée existante.

- [ ] **Step 3 : Vérifier**

Run: `bash -n scripts/da-scoring.sh && npm run branding:check`
Expected: syntaxe shell OK, branding vert.

- [ ] **Step 4 : Commit**

```bash
git add plugins/hacienda-droit-affaires/tests/datasets/da-pacte-associes-pe/scenario.md scripts/da-scoring.sh
git commit -m "test(da): dataset + cycle scoring pacte-associes-pe (scénario, gate Lux + précédence)"
```

> **Phases blind (hors plan, lancées par Candy via le wrapper)** : Phase 2 ground-truth (Codex high, sans SKILL.md) → Phase 3 live (Claude natif, sans ground-truth) → Phase 4 scoring (Codex medium, sans SKILL.md). Release conditionnée à **ADMIS gate-clean**.

---

## Task 6 : Vérification whole-branch + revue

**Files:** aucun (gate de revue).

- [ ] **Step 1 : Chaîne complète**

Run: `npm test && npm run typecheck && npm run build && npm run branding:check && git diff --check`
Expected: 309 ✓ (3 skip eurlex-live), typecheck/build/branding verts, structure 11/11, count 31.

- [ ] **Step 2 : Non-régression standard (manuel)**

Vérifier qu'une revue pacte **sans** `--pe` produit exactement la même sortie qu'avant (format, 11 clauses, points de fond inaliénabilité/léonine/drag inchangés). Le mode est purement additif et conditionnel.

- [ ] **Step 3 : Cohérence des 4 surfaces de la frontière** (comme distressed)

Gate France/Lux + anti-fabrication cohérents sur : module §3/§7, étape 2bis (gate + anti-fabrication), bullets « ne fait pas », exemple. Pas de contradiction.

- [ ] **Step 4 : Revue whole-branch** (Opus, façon distressed)

Dispatcher une revue de branche complète : 0 Critical / 0 Important attendu avant de proposer la PR. Corriger les Minor en place.

- [ ] **Step 5 : Handoff**

Écrire `docs/handoff/handoff-<date>-pacte-pe-overlay.md` (modèle des handoffs distressed) : livré, doctrine P1-P5, statut scoring (après le cycle Candy), reste à faire (modes PE suivants §10 de la spec).

---

## Self-Review (coverage spec → plan)

- Spec §2 architecture (module + 2bis + side A) → Tasks 2, 3 ✓
- Spec §3 grille P1-P5 → Task 2 step 2, Task 3 step 5 ✓
- Spec §4 module (gate, signaux, glossaire, side-aware, anti-fab, renvois) → Task 2 ✓
- Spec §5 intégration (2bis, bloc précédence, format inchangé) → Task 3 steps 5-6 ✓
- Spec §6 citations (prérequis index) → Task 1 ✓
- Spec §7 « ne fait pas » → Task 3 step 7 ✓
- Spec §8 scoring (dataset dédié, blind 4 phases, calibration gate) → Task 5 ✓
- Spec §9 intendance (version, README, CHANGELOG, branche) → Task 4 + Global Constraints ✓
- Spec §10 différé → non implémenté (hors scope, correct) ✓
- Critères de succès §spec → Task 6 (non-régression, cohérence, whole-branch) + cycle Candy ✓
