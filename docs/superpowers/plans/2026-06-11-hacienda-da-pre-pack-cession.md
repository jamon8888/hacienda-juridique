# Pre-pack cession (DA) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal :** Livrer le skill `pre-pack-cession` (note de cadrage *side-aware* du montage pre-pack à l'intersection M&A ↔ restructuring), validé **gate-clean** par scoring blind 4 phases, et bumper DA en v0.6.0.

**Architecture :** Un seul `SKILL.md` au moule canonique V2 DA (gate diagnostic → intake → checklist non-juriste → sortie structurée → étapes → renvois → ton), double gate (CP+45 j → véhicule ; faisabilité pre-pack 4 kill-switches), pont amont `prevention-difficultes` → aval `spa-review`/`gap-review`/`closing-checklist-fr`. La « validation » n'est pas un test unitaire mais le **protocole blind 4 phases Codex** + le test `cowork-structure` au release.

**Tech Stack :** Markdown SKILL.md (skeleton V2 imposé par `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts`), helper `scripts/codex-blind-scoring.py` (phase2-criteria / phase4-criteria), agrégation `scripts/tiered_scoring.py`, suite repo (`npm test`, `npm run typecheck`, `npm run build`, `npm run branding:check`).

**Spec de référence :** [`docs/superpowers/specs/2026-06-11-hacienda-da-pre-pack-cession-design.md`](../specs/2026-06-11-hacienda-da-pre-pack-cession-design.md)

**Convention tokens (mémoire) :** les commandes de scoring/agrégation (Codex, `tiered_scoring.py`) sont **lancées par Candy**, pas par Claude. Claude génère les prompts/commandes et fait l'analyse.

---

## File Structure

| Fichier | Rôle | Tâche |
|---|---|---|
| `plugins/hacienda-droit-affaires/skills/pre-pack-cession/SKILL.md` | Le skill (livrable) | T2 |
| `plugins/hacienda-droit-affaires/commands/h-da/pre-pack-cession.md` | Wrapper slash `/h-da:` (exigé par cowork-structure) | T3 |
| `plugins/hacienda-droit-affaires/README.md` | Entrée `/h-da:pre-pack-cession` (exigée) | T3 |
| `plugins/hacienda-droit-affaires/tests/datasets/da-pre-pack-cession/scenario.md` | Input fictif partagé (Phase 1) | T1 |
| `.../da-pre-pack-cession/ground-truth.md` | Vérité terrain (Phase 2, Codex) | T4 |
| `.../da-pre-pack-cession/live-output.md` | Exécution live (Phase 3, Claude frais) | T5 |
| `.../da-pre-pack-cession/verdicts-<CODE>*.json` | Scoring (Phase 4, Codex) | T6 |
| `plugins/hacienda-droit-affaires/version.json` (+ manifest, server pkg auto) | Bump 0.5.0 → 0.6.0 | T8 |
| `plugins/hacienda-droit-affaires/CHANGELOG.md` | Entrée v0.6.0 | T8 |

**Code de scoring** : choisir un code 6 chars alphanumériques (ex. `PPK1ce` — à fixer en T1, réutilisé T4/T6).

---

## Task 1 : Scénario fictif (Phase 1 — input partagé)

**Files :**
- Create: `plugins/hacienda-droit-affaires/tests/datasets/da-pre-pack-cession/scenario.md`

- [ ] **Step 1 : Rédiger le scénario** — un cas fictif de pre-pack réaliste, neutre (ne révèle pas la « bonne réponse »). Doit contenir, en données brutes (pas en instructions) :
  - Société cible PME en difficulté (secteur, CA, effectif), **date de cessation des paiements ambiguë** (pour forcer le Gate 1 à interroger : passif exigible vs actif disponible).
  - Un **repreneur identifié** approchant en phase amiable (pour que Gate 2 « repreneur crédible » soit jouable).
  - Un mandat ad hoc / conciliation en cours OU à ouvrir.
  - Des éléments piégeux : un acte récent à risque **période suspecte** (L.632-1), un enjeu **confidentialité** (fuite presse possible), un **CSE** à consulter, des **sûretés** sur l'actif, optionnellement des **actifs PI**.
  - Le **côté conseillé** à préciser (ex. côté repreneur) — ou laisser le testeur le déclarer.
  - 1 à 3 questions de l'utilisateur-persona en fin de scénario.

- [ ] **Step 2 : Vérifier la neutralité** — relire : le scénario ne doit **pas** citer les articles-réponses ni nommer les gates. Données factuelles uniquement.

- [ ] **Step 3 : Commit**

```bash
git add plugins/hacienda-droit-affaires/tests/datasets/da-pre-pack-cession/scenario.md
git commit -m "test(da): scenario fictif pre-pack-cession (Phase 1)"
```

---

## Task 2 : Le skill `SKILL.md` (build)

**Files :**
- Create: `plugins/hacienda-droit-affaires/skills/pre-pack-cession/SKILL.md`
- Référence structurelle : `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts` (assertions skeleton V2 : lignes ~218 metadata/command hints, ~329 noms MCP exacts, ~341 skeleton canonique)

- [ ] **Step 1 : Lire le contrat structurel** — lire les assertions du test cowork-structure (it « declares explicit V2 metadata », « declares exact MCP tool names », « keeps every skill on the canonical Hacienda V2 skill skeleton ») ET un skill V2 existant comme gabarit exact : `plugins/hacienda-droit-affaires/skills/prevention-difficultes/SKILL.md`. Le SKILL.md doit reproduire ce skeleton.

- [ ] **Step 2 : Frontmatter** — `name: pre-pack-cession` + `description` (multi-ligne) avec déclencheurs : « pre-pack », « cession préparée », « plan de cession anticipé », « vente pré-négociée en procédure collective » ; + toute métadonnée V2 (version/command hint/MCP tools) exigée par le test. Pas d'outil MCP inventé : reprendre les noms MCP exacts utilisés par les skills procédures collectives (`bodacc_procedures`, etc. — vérifier dans `prevention-difficultes`/`declaration-creance`).

- [ ] **Step 3 : Corps — sections dans cet ordre** (contenu doctrinal complet, pas de placeholder) :
  1. `# Skill — Pre-pack cession (montage cession préparée)` + callout 🔴 **double gate**.
  2. `## Examples` — 2-3 exemples courts montrant : (a) cas où Gate 1 bascule en RJ, (b) cas où Gate 2 tombe (pas de repreneur → renvoi cession judiciaire ordinaire), (c) cas nominal sauvegarde accélérée.
  3. `## Chargement du profil` — comme les skills DA (côté débiteur/repreneur).
  4. `## Intake` — cible, **état CP (non / ≤45 j / >45 j / incertain)**, repreneur identifié ?, urgence/confidentialité, **côté conseillé (obligatoire)**, documents optionnels.
  5. `## Gate non-juriste` — checklist : `[ ] Gate 1 CP tranché`, `[ ] Gate 2 faisabilité (4 critères) tranché`, `[ ] côté déclaré`, `[ ] aucun document tiers produit en phase amiable`.
  6. `## Outils MCP à privilégier` — noms MCP exacts.
  7. `## Emplacement des sorties`.
  8. `## Sortie` — **format livrable** (le bloc 4 sections side-aware, cf. Step 4).
  9. `## Étape 1 … Étape 6` (cf. Step 5).
  10. `## Ce skill ne fait pas` — pas l'acte de cession ni l'offre (renvois aval) ; aucun document tiers en amiable (L.611-15) ; brouillon validation avocat ; seuils post-2021 `[à vérifier]`.
  11. `## Ton`.

- [ ] **Step 4 : Bloc Sortie (format livrable exact)** — insérer ce gabarit :

```markdown
# Pre-pack cession — note de cadrage [CÔTÉ {débiteur|repreneur}]

## 1. Diagnostic & gates
- Gate 1 — cessation des paiements : {non / ≤45 j / >45 j / incertain} → véhicule retenu.
- Gate 2 — faisabilité pre-pack (4 critères tranchés ✅/🔴) :
  confidentialité (L.611-15) · repreneur crédible · prospection (L.611-7) · période suspecte (L.632-1).

## 2. Véhicule & séquençage
- Véhicule : {sauvegarde accélérée L.628-1 s. | RJ L.631-19-1 → plan de cession L.642-1 s., L.642-2}.
- Séquençage : phase amiable (mandat ad hoc/conciliation) → bascule collective. Qui fait quoi (débiteur, conciliateur/mandataire ad hoc prospecteur, tribunal, CSE). Calendrier indicatif.

## 3. Points de vigilance (ancrés sur l'article tranchant ; focale {côté})
- {côté débiteur : orchestration — prospection régulière, confidentialité, CSE/CSEC, AGS, requête}
- {côté repreneur : exposition — purge réelle du passif, contrats repris L.642-7, contestation L.661-6, irrévocabilité/conditions de l'offre, sûretés}

## 4. Renvois & prochaines étapes
- Amont : prevention-difficultes. Aval : spa-review / gap-review / closing-checklist-fr.
- Latéral : declaration-creance ; PI:contrats-pi si actifs PI substantiels.
```

- [ ] **Step 5 : Étapes du workflow** — rédiger :
  - Étape 1 — Pré-flight + Gate 1 (CP+45 j) : si incertain, poser la question (passif exigible vs actif disponible) avant d'avancer. Tranche le véhicule.
  - Étape 2 — Gate 2 (4 kill-switches) : confidentialité L.611-15, repreneur crédible, prospection L.611-7, période suspecte L.632-1. Si un tombe → STOP + renvoi motivé.
  - Étape 3 — Séquençage phase amiable (mandat ad hoc/conciliation, mandat de prospection au conciliateur L.611-7, confidentialité L.611-15).
  - Étape 4 — Bascule collective (sauvegarde accélérée L.628-1 s. *ou* RJ L.631-19-1 → plan de cession L.642-1 s./L.642-2) ; articulation CSE/AGS/offres.
  - Étape 5 — Vigilance side-aware (pièges du Bloc 3).
  - Étape 6 — Post-flight `verifier-citations`.

- [ ] **Step 6 : Vérifier que le skill ne lit jamais le ground-truth** — le SKILL.md ne référence aucun fichier `ground-truth.md` (garde-fou anti-contamination Phase 3).

- [ ] **Step 7 : Commit**

```bash
git add plugins/hacienda-droit-affaires/skills/pre-pack-cession/SKILL.md
git commit -m "feat(da): skill pre-pack-cession (montage cession preparee, double gate)"
```

---

## Task 3 : Wrapper commande + README (complétude structurelle, test vert)

**Files :**
- Create: `plugins/hacienda-droit-affaires/commands/h-da/pre-pack-cession.md`
- Modify: `plugins/hacienda-droit-affaires/README.md`

- [ ] **Step 1 : Wrapper commande** — copier le gabarit d'un wrapper existant (`commands/h-da/prevention-difficultes.md`) et l'adapter à pre-pack-cession. **Ne pas** contenir `/h-droit-affaires:` (le test l'interdit, ligne ~261).

- [ ] **Step 2 : README** — ajouter la ligne documentant le skill avec `/h-da:pre-pack-cession` (exigé ligne ~272) + sa description courte, au même endroit/format que les autres skills DA.

- [ ] **Step 3 : Lancer le test de structure**

Run: `npm test -- hacienda-droit-affaires-cowork-structure`
Expected: PASS (skill auto-détecté ; version reste 0.5.0, cohérence interne OK).

- [ ] **Step 4 : Commit**

```bash
git add plugins/hacienda-droit-affaires/commands/h-da/pre-pack-cession.md plugins/hacienda-droit-affaires/README.md
git commit -m "feat(da): wrapper /h-da:pre-pack-cession + README (cowork-structure)"
```

---

## Task 4 : Phase 2 — vérité terrain (Codex HIGH, sans SKILL.md)

**Files :**
- Create: `plugins/hacienda-droit-affaires/tests/datasets/da-pre-pack-cession/ground-truth.md`

- [ ] **Step 1 : Générer le prompt Codex** (Claude génère, Candy exécute) :

```bash
python3 scripts/codex-blind-scoring.py phase2-criteria \
  --skill pre-pack-cession \
  --skill-description "Note de cadrage du montage d'un pre-pack cession (cession negociee en amont mandat ad hoc/conciliation puis realisee via plan de cession en procedure collective). Side-aware debiteur/repreneur. NE PAS supposer le contenu du SKILL.md." \
  --domain "restructuring / distressed M&A (procedures collectives)" \
  --mode "note de cadrage (mode unique)" \
  --scenario plugins/hacienda-droit-affaires/tests/datasets/da-pre-pack-cession/scenario.md \
  --output plugins/hacienda-droit-affaires/tests/datasets/da-pre-pack-cession/ground-truth.md
```

- [ ] **Step 2 : Candy lance Codex GPT-5.5 effort HIGH** dans une **session distincte sans le SKILL.md**, colle le prompt généré, sauvegarde la grille de critères atomiques tiered-gated dans `ground-truth.md`.

- [ ] **Step 3 : Claude vérifie** que `ground-truth.md` contient bien des **gates** (critères CRITIQUE binaires, trigger FAIL lisible) et non seulement des points de recall — cf. [[feedback-gate-calibration-scoring]].

- [ ] **Step 4 : Commit**

```bash
git add plugins/hacienda-droit-affaires/tests/datasets/da-pre-pack-cession/ground-truth.md
git commit -m "test(da): ground-truth pre-pack-cession (Phase 2 Codex HIGH)"
```

---

## Task 5 : Phase 3 — exécution live (Claude frais, sans ground-truth)

**Files :**
- Create: `plugins/hacienda-droit-affaires/tests/datasets/da-pre-pack-cession/live-output.md`

- [ ] **Step 1 : Synchroniser le cache** (la session live teste la version courante) :

```bash
rsync -a --delete \
  plugins/hacienda-droit-affaires/skills/ \
  ~/.claude/plugins/cache/hacienda-juridique/hacienda-droit-affaires/0.1.0/skills/
```

- [ ] **Step 2 : Session Claude Code FRAÎCHE** — invoquer le skill `pre-pack-cession` sur `scenario.md`. **Interdiction explicite de lire `ground-truth.md`** (garde-fou anti-contamination). Produire la note de cadrage.

- [ ] **Step 3 : Sauvegarder la sortie** dans `live-output.md` (verbatim de la note produite).

- [ ] **Step 4 : Commit**

```bash
git add plugins/hacienda-droit-affaires/tests/datasets/da-pre-pack-cession/live-output.md
git commit -m "test(da): live-output pre-pack-cession (Phase 3 session fraiche)"
```

---

## Task 6 : Phase 4 — scoring + agrégation (Codex medium, sans SKILL.md)

**Files :**
- Create: `plugins/hacienda-droit-affaires/tests/datasets/da-pre-pack-cession/verdicts-<CODE>-codex.json` (+ rapport)

- [ ] **Step 1 : Générer le prompt de scoring** (Claude génère, Candy exécute) :

```bash
python3 scripts/codex-blind-scoring.py phase4-criteria \
  --skill pre-pack-cession --skill-version 0.6.0 --code <CODE> \
  --scenario   plugins/hacienda-droit-affaires/tests/datasets/da-pre-pack-cession/scenario.md \
  --ground-truth plugins/hacienda-droit-affaires/tests/datasets/da-pre-pack-cession/ground-truth.md \
  --live-output  plugins/hacienda-droit-affaires/tests/datasets/da-pre-pack-cession/live-output.md \
  --output plugins/hacienda-droit-affaires/tests/datasets/da-pre-pack-cession/verdicts-<CODE>-codex.json
```

- [ ] **Step 2 : Candy lance Codex GPT-5.5 medium** (session distincte sans SKILL.md), produit les verdicts JSON.

- [ ] **Step 3 : Agrégation** (Candy exécute) :

```bash
python3 scripts/tiered_scoring.py \
  plugins/hacienda-droit-affaires/tests/datasets/da-pre-pack-cession/ground-truth.md \
  plugins/hacienda-droit-affaires/tests/datasets/da-pre-pack-cession/verdicts-<CODE>-codex.json
```

- [ ] **Step 4 : Claude analyse** le résultat **gate-driven, pas chiffre** : ADMIS / RÉSERVES / INSUFFISANT, et liste les gates CRITIQUE éventuellement FAIL.

- [ ] **Step 5 : Commit**

```bash
git add plugins/hacienda-droit-affaires/tests/datasets/da-pre-pack-cession/verdicts-*.json
git commit -m "test(da): scoring pre-pack-cession <CODE> (Phase 4 Codex)"
```

---

## Task 7 : Correctifs d'ancrage (conditionnel — si un gate CRITIQUE FAIL)

**Files :**
- Modify: `plugins/hacienda-droit-affaires/skills/pre-pack-cession/SKILL.md`

- [ ] **Step 1 : Décider** — si T6 est gate-clean (ADMIS/RÉSERVES), **sauter cette tâche**, aller à T8. Si un gate CRITIQUE FAIL :
- [ ] **Step 2 : Correctif ciblé** — ajouter l'**ancrage de l'article le plus tranchant** manquant (pattern G1/H1/J1/L1/M2), sans réécriture large. Modifier uniquement la section concernée du SKILL.md.
- [ ] **Step 3 : Commit** puis **reboucler T5→T6** (nouvelle session fraîche, nouveau `<CODE>`) jusqu'à gate-clean.

```bash
git add plugins/hacienda-droit-affaires/skills/pre-pack-cession/SKILL.md
git commit -m "fix(da): pre-pack-cession ancrage {article} ferme gate {id}"
```

---

## Task 8 : Release v0.6.0

**Files :**
- Modify: `plugins/hacienda-droit-affaires/version.json` (source unique ; manifest + server pkg s'alignent)
- Modify: `plugins/hacienda-droit-affaires/CHANGELOG.md`

- [ ] **Step 1 : Bump version** — `version.json` 0.5.0 → **0.6.0**. Vérifier que plugin manifest + mcp-server package pointent bien sur `version.json` (le test version le contrôle).

- [ ] **Step 2 : CHANGELOG** — entrée v0.6.0 : « Nouveau skill `pre-pack-cession` (distressed-M&A, pont prevention-difficultes ↔ spa-review), validé scoring blind {score/verdict} ».

- [ ] **Step 3 : Suite de vérification complète**

```bash
npm test
npm run typecheck
npm run build
npm run branding:check
git diff --check
```
Expected: tout PASS (dont `hacienda-droit-affaires-cowork-structure` : 23 skills, wrapper + README OK, versions alignées).

- [ ] **Step 4 : Commit + PR vers main**

```bash
git add plugins/hacienda-droit-affaires/version.json plugins/hacienda-droit-affaires/CHANGELOG.md
git commit -m "release(da): bump v0.5.0 -> v0.6.0 - skill pre-pack-cession (distressed-M&A)"
gh pr create --base main --head feat/da-pre-pack-cession \
  --title "release(da): pre-pack-cession v0.6.0 (spike distressed-M&A)" \
  --body "Spike Chantier A : skill pre-pack-cession valide scoring blind 4 phases. Pont prevention-difficultes <-> spa-review."
```
> Rappel handoff : cibler **main directement**, ne pas empiler sur une branche feature.

- [ ] **Step 5 : MAJ handoff/backlog** — noter le cycle dans la file de scoring DA et marquer le spike Chantier A terminé.

---

## Notes d'exécution

- **Ordre des phases** : T1 (scénario) doit précéder T4 (Codex score contre le scénario). T2/T3 (build) doivent précéder T5 (live exécute le skill). T4 et T5 sont indépendants entre eux mais tous deux requis avant T6.
- **Séparation des acteurs** (protocole CLAUDE.md) : Phase 2 et Phase 4 = Codex sans SKILL.md ; Phase 3 = Claude frais sans ground-truth. Un même acteur sur les 4 = `[scoring auto-référent]`, non recevable pour le release.
- **Adaptation TDD** : le « test » de la qualité doctrinale est le scoring blind (T4-T6), pas un test unitaire. Les seuls tests automatisés sont structurels (`cowork-structure`, T3/T8).
