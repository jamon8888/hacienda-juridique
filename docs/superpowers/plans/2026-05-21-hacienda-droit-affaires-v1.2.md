# Hacienda Droit des Affaires v1.2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter à `hacienda-droit-affaires` deux skills (`cgv-generator` B2B+B2C, `financement-startup`) et une feature de veille (agent `veille-jurisprudence` + skill `consulter-digest`), étendre la bibliothèque de clauses, et supprimer le squelette `hacienda-societes` désormais débloqué.

**Architecture:** Travail strictement additif sur `main` côté plugin `hacienda-droit-affaires` — uniquement de nouveaux fichiers, plus l'extension additive de `clauses-sensibles-fr.md`. Exception isolée : la Tâche 0 supprime le plugin `hacienda-societes` (non-additif, mais hors plugin `droit-affaires`, donc sans impact sur les personas). Aucun code TypeScript nouveau : V1.2 est du Markdown (skills, agent, références) calqué sur les composants V1/V1.1 existants. Un composant = un commit complet.

**Tech Stack:** Markdown + YAML frontmatter. Aucun nouvel outil `packages/core` ; `veille-jurisprudence` consomme les clients Légifrance et Judilibre existants avec filtrage par date. Les skills consomment les mécanismes V1 (`verifier-citations`, `check-pii`).

**Spec:** `docs/superpowers/specs/2026-05-21-hacienda-droit-affaires-v1.2-design.md`

---

## File Structure

### Fichiers NEUFS — references (2)
```
plugins/hacienda-droit-affaires/references/
├── regimes-cgv-cgu-fr.md          → support de cgv-generator (régimes B2B + B2C)
└── instruments-financement-fr.md  → support de financement-startup
```

### Fichiers NEUFS — skills (3)
```
plugins/hacienda-droit-affaires/skills/
├── cgv-generator/SKILL.md
├── financement-startup/SKILL.md
└── consulter-digest/SKILL.md
```

### Fichiers NEUFS — agent (1)
```
plugins/hacienda-droit-affaires/agents/
└── veille-jurisprudence.md
```

### Fichiers NEUFS — datasets de test (4)
```
plugins/hacienda-droit-affaires/tests/datasets/v1.2/
├── cgv-b2b-scenario.md
├── cgu-b2c-scenario.md
├── financement-seed-bspce.md
└── digest-echantillon.md
```

### Fichiers MODIFIÉS — additif (1)
```
plugins/hacienda-droit-affaires/references/clauses-sensibles-fr.md  → APPEND 15 clauses
plugins/hacienda-droit-affaires/CHANGELOG.md                         → APPEND section V1.2
```

### Fichiers MODIFIÉS — Tâche 0 (suppression hacienda-societes, hors plugin droit-affaires)
```
.claude-plugin/marketplace.json                          → retrait entrée hacienda-societes
packages/core/test/hacienda-marketplace.test.ts          → retrait de expectedPlugins
plugins/hacienda-societes/                               → SUPPRIMÉ (dossier entier)
+ tout fichier contenant un renvoi vers hacienda-societes → corrigé
```

### Responsabilités

| Fichier | Responsabilité unique |
|---|---|
| `references/regimes-cgv-cgu-fr.md` | Structure et mentions obligatoires des CGV (B2B) et CGU (B2C) |
| `references/instruments-financement-fr.md` | Comparatif des instruments de financement startup (BSPCE/BSA/OC) |
| `skills/cgv-generator/SKILL.md` | Génération de CGV/CGU en brouillon assisté, deux régimes |
| `skills/financement-startup/SKILL.md` | Conseil sur les instruments de financement (`--comparer`/`--review`) |
| `skills/consulter-digest/SKILL.md` | Lecture et filtrage du digest produit par l'agent de veille |
| `agents/veille-jurisprudence.md` | Surveillance hebdomadaire Légifrance + Judilibre, production du digest |

### Format de référence — composants existants à imiter

| Composant V1.2 à écrire | Patron de format |
|---|---|
| `cgv-generator` (`--draft`, génération) | `skills/constitution-societe/SKILL.md` (V1.1 — génération `[review]`-taguée) |
| `financement-startup` (`--comparer`/`--review`) | `skills/constitution-societe/SKILL.md` (mode `--comparer`) + `skills/reviser-contrat/SKILL.md` (mode `--review`) |
| `consulter-digest` (skill de lecture) | `skills/reviser-nda/SKILL.md` (skill léger) |
| agent `veille-jurisprudence` | `agents/bodacc-watcher.md` (agent V1 avec état persisté + digest) |

---

## Patterns canoniques à respecter (figés en V1/V1.1)

Tout skill V1.2 reproduit les patterns des skills existants :
- Frontmatter YAML : `name`, `description` (multi-lignes `>`), `version: "1.0.0"`, `authors: ["Hacienda"]`, `tags: [...]`.
- Bloc disclaimer en citation `>` après le titre.
- `## Examples` : 3-4 blocs `<example>`.
- `## Chargement du profil`, `## Intake` (numérotée, modes en flags), `## Étape N`, `## Sortie`.
- `## Sortie` : note du relecteur (5 champs **en gras** : Sources / Lecture / Signalé / Fraîcheur / Avant de t'appuyer), arbre de décision 5 options (option 4 = « Surveiller et attendre »), footer A PII en lien Markdown.
- Tags de provenance sans backticks dans les cellules ; article hors index → `[a verifier]`.

L'agent `veille-jurisprudence` reproduit le format agent V1 : YAML codebase (`name`, `description`, `model: sonnet`, `tools: [...]`), sections de corps `## Objectif` / `## Cadence` / `## Sources` / `## Configuration` / `## Workflow` / `## Format digest` / `## Mode dégradé` / `## Ce que l'agent ne fait pas`.

---

## Waves overview

| Wave | Périmètre | Dépendances | Durée estimée |
|---|---|---|---|
| **Tâche 0** | Ménage worktree + tag `v1.2-base` + suppression `hacienda-societes` | aucune | 0.5 jour |
| **Étape 1** | Expansion `clauses-sensibles-fr.md` 15→30 | Tâche 0 | 0.5 jour |
| **Wave 1** | `cgv-generator`, `financement-startup` | Étape 1 | ~1 semaine |
| **Wave 2** | agent `veille-jurisprudence`, `consulter-digest` | Tâche 0 | ~0.5 semaine |
| **Tâche finale** | Vérification + CHANGELOG + handoff | Waves 1+2 | 0.5 jour |

---

## Tâche 0 — Préliminaires + suppression hacienda-societes

**Files:**
- Inspect: `git status`
- Delete: `plugins/hacienda-societes/`
- Modify: `.claude-plugin/marketplace.json`, `packages/core/test/hacienda-marketplace.test.ts`
- Tag: `v1.2-base`

- [ ] **Step 1: Inspecter le worktree et discarder les régénérations automatiques**

Run:
```bash
git status -s && git diff --stat
```
Si `AGENTS.md` / `CLAUDE.md` racine présentent uniquement des changements dans le bloc `<!-- gitnexus:start -->` → les discarder :
```bash
git checkout -- AGENTS.md CLAUDE.md 2>/dev/null || true
```
Si d'autres résidus inattendus apparaissent → les signaler à l'utilisateur avant de continuer.

- [ ] **Step 2: Poser le tag de base V1.2**

Run:
```bash
git tag v1.2-base HEAD && git tag --list v1.2-base
```
Expected : `v1.2-base` listé.

- [ ] **Step 3: Recenser les renvois vers hacienda-societes**

Run:
```bash
grep -rn "hacienda-societes" --include="*.md" --include="*.json" --include="*.ts" . | grep -v "docs/superpowers"
```
Noter chaque fichier qui référence `hacienda-societes` hors `docs/superpowers/` (specs/plans historiques — à ne pas toucher). Cibles probables : `.claude-plugin/marketplace.json`, `packages/core/test/hacienda-marketplace.test.ts`, éventuellement `references/taxonomie-contrats-fr.md` ou un `CLAUDE.md`.

- [ ] **Step 4: Supprimer le dossier du plugin**

Run:
```bash
git rm -r plugins/hacienda-societes/
```

- [ ] **Step 5: Retirer l'entrée de marketplace.json**

Lire `.claude-plugin/marketplace.json`, localiser l'objet de la liste `plugins` dont `"name": "hacienda-societes"`, le retirer (avec la virgule adjacente pour garder un JSON valide). Vérifier :
```bash
cat .claude-plugin/marketplace.json | jq '.plugins[].name'
```
Expected : la liste ne contient plus `hacienda-societes`.

- [ ] **Step 6: Mettre à jour le test marketplace**

Lire `packages/core/test/hacienda-marketplace.test.ts`, localiser le tableau `expectedPlugins` (ou équivalent), retirer l'entrée `hacienda-societes`. Lancer le test :
```bash
cd packages/core && npx vitest run test/hacienda-marketplace.test.ts
```
Expected : PASS.

- [ ] **Step 7: Corriger les renvois résiduels**

Pour chaque fichier identifié au Step 3 et non encore traité (ex. un renvoi dans `references/taxonomie-contrats-fr.md` qui pointait vers un skill de `hacienda-societes`) : remplacer le renvoi par le skill de remplacement V1.1 (`constitution-societe`, `gouvernance-ag` ou `pacte-associes-review` selon le cas), ou le retirer si sans objet.

- [ ] **Step 8: Vérifier la non-régression core**

Run:
```bash
cd packages/core && npx vitest run
```
Expected : tous les tests passent (306 attendus, ajustés du retrait `hacienda-societes` dans le test marketplace).

- [ ] **Step 9: Commit dédié**

```bash
git add -A
git commit -m "chore: suppression du squelette hacienda-societes (absorbé par droit-affaires V1.1)"
```

---

## Étape 1 — Expansion clauses-sensibles-fr.md (15 → 30)

### Task 1.1: Ajouter 15 clauses à clauses-sensibles-fr.md

**Files:**
- Modify (append): `plugins/hacienda-droit-affaires/references/clauses-sensibles-fr.md`

- [ ] **Step 1: Lire le fichier existant pour relever le format exact**

Run:
```bash
cat plugins/hacienda-droit-affaires/references/clauses-sensibles-fr.md
```
Noter le format d'un bloc-clause : libellé typique à détecter / risque juridique / position playbook par posture / formulations alternatives / articles à vérifier. Les 15 nouvelles clauses doivent reproduire ce format à l'identique.

- [ ] **Step 2: Ajouter les 15 clauses (append pur)**

Append au fichier 15 nouveaux blocs-clauses, format identique aux blocs existants. Les 15 clauses :

1. Réserve de propriété
2. Conditions de règlement et délais de paiement (L.441-10 C.com.)
3. Pénalités de retard et indemnité forfaitaire de recouvrement
4. Escompte pour paiement anticipé
5. Garantie légale de conformité / garantie des vices cachés
6. Garantie commerciale (distincte des garanties légales)
7. Clause de révision de prix
8. Clause de réserve (disponibilité, conditions)
9. Limitation de responsabilité spécifique aux CGV
10. Propriété intellectuelle dans les CGV
11. Données personnelles (renvoi `hacienda-ghost`)
12. Réclamation et délai de contestation
13. Transfert des risques
14. Clause de hardship / imprévision (1195 C.civ.)
15. Clause de non-sollicitation

Pour chaque clause : si un article est cité et absent de `articles-c-civ-c-com-index.md`, le taguer `[a verifier]`.

- [ ] **Step 3: Vérifier le caractère append pur**

Run:
```bash
git diff plugins/hacienda-droit-affaires/references/clauses-sensibles-fr.md
```
Expected : uniquement des lignes ajoutées (`+`), aucune ligne existante modifiée ou supprimée.

- [ ] **Step 4: Commit**

```bash
git add plugins/hacienda-droit-affaires/references/clauses-sensibles-fr.md
git commit -m "docs(droit-affaires): clauses-sensibles — +15 clauses (CGV, garanties, imprévision)"
```

---

## Wave 1 — Skills de génération/conseil

> Convention (Waves 1 et 2) : skill + référence écrits ensemble, commités dans un seul commit complet. Jamais de demi-skill sur `main`.

### Task 2: Skill cgv-generator + sa référence

**Files:**
- Create: `plugins/hacienda-droit-affaires/references/regimes-cgv-cgu-fr.md`
- Create: `plugins/hacienda-droit-affaires/skills/cgv-generator/SKILL.md`
- Create: `plugins/hacienda-droit-affaires/tests/datasets/v1.2/cgv-b2b-scenario.md`
- Create: `plugins/hacienda-droit-affaires/tests/datasets/v1.2/cgu-b2c-scenario.md`

- [ ] **Step 1: Lire le skill patron**

Run:
```bash
cat plugins/hacienda-droit-affaires/skills/constitution-societe/SKILL.md
```
`constitution-societe` est le patron exact : skill de génération produisant un brouillon assisté `[review]`-tagué. Reproduire sa structure et sa façon de taguer les points de décision.

- [ ] **Step 2: Créer la référence regimes-cgv-cgu-fr.md**

Créer le fichier avec deux parties :

**Partie B2B — CGV (Code de commerce)** : structure type d'une CGV B2B + mentions obligatoires L.441-1 C.com. (communication des CGV, conditions de règlement, barème des prix unitaires, conditions des réductions de prix) + plafond des délais de paiement L.441-10 (60 jours date d'émission de facture, ou 45 jours fin de mois) + rappel des contrôles clauses abusives B2B (1171 C.civ., L.442-1 C.com.).

**Partie B2C — CGU/CGV (Code de la consommation)** : structure type + information précontractuelle L.111-1 C.conso. + droit de rétractation L.221-18 (14 jours, vente à distance) + clauses abusives consuméristes L.212-1 avec renvoi aux listes noire (R.212-1) et grise (R.212-2) + garantie légale de conformité L.217-1 et s. + obligation d'information sur la médiation de la consommation.

- [ ] **Step 3: Créer le SKILL.md — frontmatter + disclaimer**

File: `plugins/hacienda-droit-affaires/skills/cgv-generator/SKILL.md`
```yaml
---
name: cgv-generator
description: >
  Génère des CGV (B2B, Code de commerce) ou des CGU/CGV (B2C, Code de la
  consommation) sous forme de brouillon assisté : chaque clause appelant un
  arbitrage est taguée [review]. Détecte le régime à l'intake et applique le
  cadre correspondant. Ne produit jamais un document prêt à publier. Brouillon
  soumis à validation avocat.
version: "1.0.0"
authors: ["Hacienda"]
tags: [cgv, cgu, generation, b2b, b2c, code-consommation, l441-1]
---
```
Titre `# Skill — Générateur de CGV / CGU` + disclaimer renforcé en citation `>` : génération d'actes ; le livrable est un **brouillon assisté `[review]`-tagué**, jamais un document « prêt à publier » ; appliquer le mauvais régime (B2B vs B2C) à un public donné est une faute ; validation avocat impérative.

- [ ] **Step 4: Ajouter Examples + Chargement du profil + Intake**

`## Examples` : 4 blocs — (a) `--draft` CGV B2B pour une société de prestation de services, (b) `--draft` CGU B2C pour une vente à distance, (c) cas mixte B2B+B2C, (d) une clause détectée en liste noire R.212-1 dans un contexte B2C → finding 🔴.

`## Chargement du profil` : lire la posture contractuelle, la matrice d'approbateurs, la politique PII (`CLAUDE.md`).

`## Intake` : 1. Mode (`--draft`) — 2. **Régime** (`B2B` / `B2C` / `mixte` — demander si non précisé) — 3. Activité et nature des prestations/produits — 4. Canal de vente (présentiel / à distance — détermine la rétractation en B2C) — 5. Spécificités (clauses souhaitées).

- [ ] **Step 5: Ajouter les Étapes**

`## Étape 1 — Pré-flight + détermination du régime` : `check-pii` ; lecture profil ; confirmer le régime (B2B / B2C / mixte). Si B2C, vérifier le canal de vente (rétractation applicable seulement en vente à distance/hors établissement).
`## Étape 2 — Génération B2B` (si régime B2B ou mixte) : produire le brouillon de CGV selon `references/regimes-cgv-cgu-fr.md` partie B2B. Chaque arbitrage tagué `[review]` : conditions de règlement, barème de prix, clause de réserve de propriété, limitation de responsabilité, droit applicable. Vérifier le plafond L.441-10.
`## Étape 3 — Génération B2C` (si régime B2C ou mixte) : produire le brouillon de CGU/CGV selon la partie B2C. Tags `[review]` sur les arbitrages. Contrôle systématique : aucune clause figurant en liste noire R.212-1 ; clauses de la liste grise R.212-2 signalées `[review]`. Inclure information précontractuelle, modalités de rétractation L.221-18, médiation.
`## Étape 4 — Post-flight` : `verifier-citations` sur les articles cités.

- [ ] **Step 6: Ajouter la section Sortie**

`## Sortie` : note du relecteur (5 champs gras) ; en-tête de confidentialité selon rôle ; le brouillon de CGV/CGU `[review]`-tagué ; liste explicite des points à arbitrer ; question hors checklist ; arbre de décision 5 options ; footer A PII. Le livrable est explicitement présenté comme un brouillon à valider, jamais comme « prêt à publier ».

- [ ] **Step 7: Créer les deux datasets de test**

`tests/datasets/v1.2/cgv-b2b-scenario.md` : scénario de génération de CGV pour une société de services B2B. Documenter les attendus : mentions L.441-1 présentes, plafond L.441-10 respecté, points `[review]`.

`tests/datasets/v1.2/cgu-b2c-scenario.md` : scénario de génération de CGU pour une vente à distance B2C. Documenter les attendus : information précontractuelle, clause de rétractation L.221-18 (14 jours), aucune clause en liste noire R.212-1.

- [ ] **Step 8: Test manuel de structure**

Vérifier sur les deux datasets : structure canonique ; en B2B, mentions L.441-1 + plafond L.441-10 ; en B2C, rétractation + absence de clause liste noire ; tous les arbitrages tagués `[review]` ; livrable jamais présenté comme final.

- [ ] **Step 9: Commit (skill complet)**

```bash
git add plugins/hacienda-droit-affaires/references/regimes-cgv-cgu-fr.md plugins/hacienda-droit-affaires/skills/cgv-generator/ plugins/hacienda-droit-affaires/tests/datasets/v1.2/cgv-b2b-scenario.md plugins/hacienda-droit-affaires/tests/datasets/v1.2/cgu-b2c-scenario.md
git commit -m "feat(droit-affaires): skill cgv-generator (B2B+B2C) + reference regimes-cgv-cgu"
```

---

### Task 3: Skill financement-startup + sa référence

**Files:**
- Create: `plugins/hacienda-droit-affaires/references/instruments-financement-fr.md`
- Create: `plugins/hacienda-droit-affaires/skills/financement-startup/SKILL.md`
- Create: `plugins/hacienda-droit-affaires/tests/datasets/v1.2/financement-seed-bspce.md`

- [ ] **Step 1: Lire les skills patrons**

Run:
```bash
cat plugins/hacienda-droit-affaires/skills/constitution-societe/SKILL.md
cat plugins/hacienda-droit-affaires/skills/reviser-contrat/SKILL.md
```
`constitution-societe` est le patron du mode `--comparer` ; `reviser-contrat` celui du mode `--review`.

- [ ] **Step 2: Créer la référence instruments-financement-fr.md**

Créer le fichier : comparatif structuré des instruments de financement de la startup. Pour chacun — **BSPCE**, **BSA**, **obligations convertibles (OC/OCA)**, **augmentation de capital simple** — documenter : nature de l'instrument, bénéficiaires/souscripteurs typiques, conditions d'attribution et d'exercice, effet dilutif, points d'attention juridiques, et signalement de la dimension fiscale (sans la traiter — renvoi). Pour le BSPCE : signaler explicitement que le régime fiscal de faveur (art. 163 bis G CGI) relève d'un conseil fiscal, non de ce skill.

- [ ] **Step 3: Créer le SKILL.md — frontmatter + disclaimer**

```yaml
---
name: financement-startup
description: >
  Conseil sur les instruments de financement de la startup : BSPCE, BSA,
  obligations convertibles, augmentation de capital. Mode --comparer (choix
  d'instrument) et --review (revue d'une term sheet de levée). Renvoie vers
  pacte-associes-review pour les clauses de pacte. Ne donne aucun conseil
  fiscal. Brouillon soumis à validation avocat.
version: "1.0.0"
authors: ["Hacienda"]
tags: [financement, startup, bspce, bsa, obligations-convertibles, levee]
---
```
Titre `# Skill — Financement de la startup` + disclaimer en citation `>` : brouillon, validation avocat ; **ce skill ne donne aucun conseil fiscal** — la dimension fiscale (notamment le régime BSPCE, art. 163 bis G CGI) est signalée et renvoyée à un conseil fiscal.

- [ ] **Step 4: Ajouter Examples + Chargement du profil + Intake**

`## Examples` : 4 blocs — (a) `--comparer` choix entre BSPCE et BSA pour intéresser un premier salarié-clé, (b) `--comparer` OC vs augmentation de capital pour un tour de seed, (c) `--review` d'une term sheet de levée → renvoi vers `pacte-associes-review` pour les clauses de liquidation preference et d'anti-dilution, (d) question sur la fiscalité du BSPCE → signalement + renvoi fiscal.

`## Chargement du profil` : lire le side habituel M&A/financement, la posture pacte d'associés (`CLAUDE.md` bloc M&A/Corporate + bloc vie sociale).

`## Intake` : 1. Mode (`--comparer` | `--review`) — 2. Stade (amorçage / seed / série A…) — 3. Objectif (intéressement salariés / levée externe / financement de croissance) — 4. Fichier term sheet (si `--review`) — 5. Profil des souscripteurs.

- [ ] **Step 5: Ajouter les Étapes**

`## Étape 1 (--comparer) — Cadrage` : stade, objectif, profil des souscripteurs, contraintes de dilution.
`## Étape 2 (--comparer) — Recommandation` : table comparative depuis `references/instruments-financement-fr.md` ; recommandation motivée d'un ou plusieurs instruments ; signalement de la dimension fiscale avec renvoi ; tags `[review]`.
`## Étape 1 (--review) — Pré-flight + identification` : `check-pii` ; lecture profil ; identification de la term sheet et du side.
`## Étape 2 (--review) — Analyse des instruments` : revue des instruments mentionnés dans la term sheet (valorisation, dilution, mécanique) ; **renvoi explicite vers `pacte-associes-review`** pour les clauses de pacte associées (liquidation preference, anti-dilution, gouvernance, vesting).
`## Étape 3 — Post-flight` : `verifier-citations`.

- [ ] **Step 6: Ajouter la section Sortie**

`## Sortie` : note du relecteur (5 champs gras) ; en-tête de confidentialité ; pour `--comparer` : table comparative + recommandation ; pour `--review` : analyse des instruments + renvoi `pacte-associes-review` ; question hors checklist ; arbre de décision 5 options ; footer A PII.

- [ ] **Step 7: Créer le dataset de test**

`tests/datasets/v1.2/financement-seed-bspce.md` : une term sheet de tour de seed synthétique incluant l'attribution de BSPCE à l'équipe et une clause de liquidation preference. Documenter les attendus : analyse des instruments, renvoi vers `pacte-associes-review` pour la liquidation preference, renvoi fiscal pour le BSPCE.

- [ ] **Step 8: Test manuel de structure**

Vérifier : structure canonique ; le renvoi vers `pacte-associes-review` est présent pour les clauses de pacte ; la dimension fiscale du BSPCE est signalée et renvoyée, jamais traitée.

- [ ] **Step 9: Commit (skill complet)**

```bash
git add plugins/hacienda-droit-affaires/references/instruments-financement-fr.md plugins/hacienda-droit-affaires/skills/financement-startup/ plugins/hacienda-droit-affaires/tests/datasets/v1.2/financement-seed-bspce.md
git commit -m "feat(droit-affaires): skill financement-startup (--comparer/--review) + reference instruments"
```

---

## Wave 2 — Feature veille

### Task 4: Agent veille-jurisprudence

**Files:**
- Create: `plugins/hacienda-droit-affaires/agents/veille-jurisprudence.md`

- [ ] **Step 1: Lire l'agent patron**

Run:
```bash
cat plugins/hacienda-droit-affaires/agents/bodacc-watcher.md
```
`bodacc-watcher` est le patron : agent V1 avec état persisté, comparaison delta, production de digest. Reproduire le format YAML codebase et les sections de corps.

- [ ] **Step 2: Créer l'agent — frontmatter**

File: `plugins/hacienda-droit-affaires/agents/veille-jurisprudence.md`
```yaml
---
name: veille-jurisprudence
description: >
  Surveillance hebdomadaire des évolutions du droit des affaires : nouvelles
  lois/ordonnances/décrets (Légifrance) et arrêts récents de la Cour de
  cassation chambre commerciale (Judilibre). Produit un digest hebdomadaire
  structuré (nouvelles dispositions / impact pratique / action requise).
  Phrases déclencheuses : "veille juridique", "digest jurisprudence",
  "nouveautés droit des affaires", "quoi de neuf en droit des affaires".
model: sonnet
tools: [Read, Write, Glob, Bash]
---
```

- [ ] **Step 3: Ajouter les sections de corps**

Ajouter, au format des agents V1 :

`## Objectif` : surveiller Légifrance + Judilibre ch. commerciale, produire un digest hebdomadaire exploitable.

`## Cadence` : hebdomadaire (lundi matin).

`## Sources` : Légifrance (lois, ordonnances, décrets touchant le droit des affaires) et Judilibre (arrêts Cour de cassation ch. commerciale), via `packages/core` — clients existants avec filtrage par date. Aucun outil core nouveau.

`## Configuration` : fichier `~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/veille-config.yaml` :
```yaml
domaines: [contrats, societes, ma, procedures-collectives]   # domaines de pratique à surveiller
chambres: [commerciale]   # extensible — v1.2 limité à "commerciale", ch. sociale prévue v1.3+
mots_cles: []             # mots-clés additionnels optionnels
```
Le champ `chambres` est volontairement une liste : v1.2 n'accepte que `commerciale`, mais la structure prévoit l'ajout futur sans rupture.

`## Workflow` : (1) lire l'état persisté (date du dernier run) ; (2) interroger Légifrance et Judilibre pour les éléments postérieurs à cette date, filtrés par `domaines` et `chambres` ; (3) classer chaque élément (nouvelle disposition / arrêt) avec son impact pratique ; (4) écrire le digest ; (5) mettre à jour l'état persisté.

`## Format digest` : fichier écrit dans `~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/veille/digest-YYYY-MM-DD.md` + copie dans `veille/latest.md`. Structure : par domaine, chaque entrée = source + référence + résumé + impact pratique + action requise (mise à jour playbook / information client / modification modèle / aucune).

`## Mode dégradé` : si Légifrance ou Judilibre inaccessible → digest partiel mentionnant les sources non interrogées, retry au prochain run, jamais de fail silencieux.

`## Ce que l'agent ne fait pas` : ne donne pas d'avis juridique ; ne modifie aucun playbook ni modèle de lui-même (il signale, l'humain décide) ; ne surveille que la ch. commerciale en v1.2.

- [ ] **Step 4: Vérifier la cohérence de format avec les agents V1**

Run:
```bash
diff <(grep "^## " plugins/hacienda-droit-affaires/agents/bodacc-watcher.md) <(grep "^## " plugins/hacienda-droit-affaires/agents/veille-jurisprudence.md)
```
Expected : les sections de corps sont cohérentes avec le patron (un agent de veille peut légitimement avoir des sections proches de `bodacc-watcher`).

- [ ] **Step 5: Commit**

```bash
git add plugins/hacienda-droit-affaires/agents/veille-jurisprudence.md
git commit -m "feat(droit-affaires): agent veille-jurisprudence (Légifrance + Judilibre ch. com.)"
```

---

### Task 5: Skill consulter-digest

**Files:**
- Create: `plugins/hacienda-droit-affaires/skills/consulter-digest/SKILL.md`
- Create: `plugins/hacienda-droit-affaires/tests/datasets/v1.2/digest-echantillon.md`

- [ ] **Step 1: Lire le skill patron**

Run:
```bash
cat plugins/hacienda-droit-affaires/skills/reviser-nda/SKILL.md
```
`reviser-nda` est le patron d'un skill léger.

- [ ] **Step 2: Créer le SKILL.md — frontmatter + disclaimer**

```yaml
---
name: consulter-digest
description: >
  Lit et présente le digest de veille juridique produit par l'agent
  veille-jurisprudence. Permet de filtrer par domaine de pratique, par date
  ou par criticité d'impact. Skill de lecture — ne produit pas d'analyse
  juridique nouvelle.
version: "1.0.0"
authors: ["Hacienda"]
tags: [veille, digest, jurisprudence, consultation]
---
```
Titre `# Skill — Consulter le digest de veille` + disclaimer en citation `>` : skill de lecture ; il restitue le digest produit par l'agent `veille-jurisprudence`, il ne réalise pas d'analyse juridique nouvelle ; si aucun digest n'existe, inviter à lancer l'agent.

- [ ] **Step 3: Ajouter Examples + Chargement du profil + Intake**

`## Examples` : 3 blocs — (a) consultation du dernier digest, (b) filtrage par domaine (`--domaine=societes`), (c) aucun digest disponible → message invitant à lancer l'agent `veille-jurisprudence`.

`## Chargement du profil` : lire les domaines de pratique du cabinet (pour ordonner le digest par pertinence).

`## Intake` : 1. Cible (`latest` par défaut, ou une date `YYYY-MM-DD`) — 2. Filtre optionnel (`--domaine=`, `--depuis=`, `--impact=` criticité).

- [ ] **Step 4: Ajouter les Étapes**

`## Étape 1 — Localiser le digest` : chercher `~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/veille/latest.md` (ou la date demandée). Si absent → message : aucun digest, lancer l'agent `veille-jurisprudence`.
`## Étape 2 — Lire et filtrer` : charger le digest, appliquer les filtres d'intake.
`## Étape 3 — Restituer` : présenter le digest filtré, ordonné par pertinence selon les domaines du profil cabinet.

- [ ] **Step 5: Ajouter la section Sortie**

`## Sortie` : note du relecteur (5 champs gras — Sources = le digest et sa date) ; le digest filtré et présenté ; question hors checklist ; arbre de décision 5 options (option 1 typique : approfondir une entrée ; option 4 : surveiller) ; footer A PII (peu probable ici mais conservé pour cohérence).

- [ ] **Step 6: Créer le dataset de test**

`tests/datasets/v1.2/digest-echantillon.md` : un digest de veille synthétique au format produit par l'agent (3-4 entrées réparties sur 2 domaines, avec impact et action requise). Sert à tester la lecture et le filtrage.

- [ ] **Step 7: Test manuel de structure**

Vérifier : structure canonique ; le filtrage par domaine fonctionne sur le dataset ; le cas « aucun digest » renvoie bien vers l'agent.

- [ ] **Step 8: Commit (skill complet)**

```bash
git add plugins/hacienda-droit-affaires/skills/consulter-digest/ plugins/hacienda-droit-affaires/tests/datasets/v1.2/digest-echantillon.md
git commit -m "feat(droit-affaires): skill consulter-digest (lecture du digest de veille)"
```

---

## Tâche finale — Vérification globale

### Task 6: Vérification, CHANGELOG, handoff

**Files:**
- Modify (append): `plugins/hacienda-droit-affaires/CHANGELOG.md`
- Modify: `docs/handoff/latest.md`

- [ ] **Step 1: Vérifier le périmètre additif côté plugin droit-affaires**

Run:
```bash
git diff --stat v1.2-base HEAD -- plugins/hacienda-droit-affaires/
```
Expected : uniquement des fichiers NEUFS, plus `clauses-sensibles-fr.md` et `CHANGELOG.md` en ajout. **Aucun skill V1/V1.1, aucun agent V1 ne doit apparaître.** Si l'un apparaît → identifier le commit fautif et corriger.

- [ ] **Step 2: Vérifier que la Tâche 0 est bien isolée**

Run:
```bash
git diff --stat v1.2-base HEAD -- packages/core/ .claude-plugin/ plugins/hacienda-societes/
```
Expected : montre la suppression de `plugins/hacienda-societes/`, la modif de `.claude-plugin/marketplace.json` et du test `packages/core/test/hacienda-marketplace.test.ts` — tous attribuables au commit unique de Tâche 0.

- [ ] **Step 3: Suite de tests core**

Run:
```bash
cd packages/core && npx vitest run
```
Expected : tous les tests passent (le test marketplace a été mis à jour en Tâche 0).

- [ ] **Step 4: typecheck + build + branding + whitespace**

Run:
```bash
npm run typecheck && npm run build && npm run branding:check && git diff --check
```
Expected : tout vert.

- [ ] **Step 5: Smoke install**

Run:
```bash
claude plugin marketplace add . && claude plugin install hacienda-droit-affaires@hacienda-juridique && claude plugin details hacienda-droit-affaires
```
Expected : installation réussie ; `claude plugin details` liste 18 skills (15 + `cgv-generator` + `financement-startup` + `consulter-digest`) + 4 agents (3 + `veille-jurisprudence`) + 1 MCP server.

- [ ] **Step 6: Mettre à jour le CHANGELOG**

Append à `plugins/hacienda-droit-affaires/CHANGELOG.md` :
```markdown
## [0.1.0] - V1.2 (en cours)

### Added — Skills
- skill `cgv-generator` (--draft) — génération CGV B2B + CGU B2C + reference `regimes-cgv-cgu-fr.md`
- skill `financement-startup` (--comparer/--review) + reference `instruments-financement-fr.md`
- skill `consulter-digest` — lecture du digest de veille

### Added — Agent
- agent `veille-jurisprudence` — veille hebdomadaire Légifrance + Judilibre ch. commerciale

### Added — Références
- `clauses-sensibles-fr.md` étendu (15 → 30 clauses)

### Removed
- squelette `hacienda-societes` supprimé (absorbé par les skills V1.1 `constitution-societe`, `gouvernance-ag`, `pacte-associes-review`)

### Notes
- Développé en parallèle des tests personas (mode additif côté plugin droit-affaires).
- Veille limitée à la ch. commerciale ; champ `chambres` extensible pour v1.3+.
```

- [ ] **Step 7: Mettre à jour le handoff**

Mettre à jour `docs/handoff/latest.md` avec le template `docs/handoff/TEMPLATE-handoff.md` : V1.2 livrée, état des composants, prochaines étapes (validation personas, workspaces de dossier post-personas).

- [ ] **Step 8: Commit final**

```bash
git add plugins/hacienda-droit-affaires/CHANGELOG.md docs/handoff/latest.md
git commit -m "docs(droit-affaires): CHANGELOG V1.2 + handoff — 3 skills + 1 agent livrés"
```

---

## Post-V1.2

V1.2 livrée. Reste à faire (hors périmètre de ce plan) :
- **Validation personas** — V1 + V1.1 + V1.2. Gate le bump v1.0.0 → v1.1.0 (puis v1.2.0).
- **Chantier workspaces de dossier** — post-personas (modifie les skills V1).
- **v1.3+** — veille multi-chambres configurable (chambre sociale notamment).
- **v2** — absorption du squelette `hacienda-contrats` (12 skills), inserts droit boursier (cibles cotées), connecteurs Drive/SharePoint/OneDrive.

---

*Fin du plan V1.2. Total : Tâche 0 + 1 task Étape 1 + 4 tasks composants + 1 task finale = 7 tasks. Estimé ~2 semaines à 1-2 personnes.*
