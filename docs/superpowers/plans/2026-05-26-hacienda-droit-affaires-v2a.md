# Hacienda Droit des Affaires v2a — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retirer le squelette `hacienda-contrats` (housekeeping) et ajouter un seul skill pull-forward au plugin `hacienda-droit-affaires` : `analyser-rupture-brutale` (L.442-1, II C.com.).

**Architecture:** Travail strictement additif côté plugin `droit-affaires` — un seul fichier de skill ajouté. La Tâche 0 supprime un autre plugin (`hacienda-contrats`, dossier + entrée marketplace + test core) mais ne touche pas `droit-affaires`. Aucun code TypeScript : V2a est entièrement Markdown. Pas de référence nouvelle — le skill consomme `articles-c-civ-c-com-index.md` existant (L.442-1 a été enrichi en V1.1 pour porter à la fois déséquilibre et rupture brutale).

**Tech Stack:** Markdown + YAML frontmatter. Skill calqué sur `reviser-contrat` (V1, skill `--review`). Consomme les mécanismes V1 (`verifier-citations`, `check-pii`).

**Spec:** `docs/superpowers/specs/2026-05-26-hacienda-droit-affaires-v2a-design.md`

---

## File Structure

### Fichier NEUF — skill (1)
```
plugins/hacienda-droit-affaires/skills/
└── analyser-rupture-brutale/SKILL.md
```

### Fichier NEUF — dataset (1)
```
plugins/hacienda-droit-affaires/tests/datasets/v2a/
└── rupture-brutale-scenario.md
```

### Fichier MODIFIÉ — additif (1)
```
plugins/hacienda-droit-affaires/CHANGELOG.md  → APPEND section V2a
```

### Fichiers MODIFIÉS — Tâche 0 (hors plugin droit-affaires)
```
.claude-plugin/marketplace.json                    → retrait entrée hacienda-contrats
packages/core/test/hacienda-marketplace.test.ts    → retrait de expectedPlugins
plugins/hacienda-contrats/                         → SUPPRIMÉ (dossier entier)
+ tout fichier contenant un renvoi vers un skill de hacienda-contrats → corrigé
```

### Responsabilités

| Fichier | Responsabilité unique |
|---|---|
| `skills/analyser-rupture-brutale/SKILL.md` | Workflow `--review` d'analyse d'une relation commerciale au regard de la rupture brutale L.442-1 II C.com. |
| `tests/datasets/v2a/rupture-brutale-scenario.md` | Scénario de test : distribution exclusive de 8 ans avec préavis 3 mois (préavis insuffisant attendu) |

### Format de référence — composant existant à imiter

| Composant V2a à écrire | Patron de format |
|---|---|
| `analyser-rupture-brutale` (`--review`) | `skills/reviser-contrat/SKILL.md` (V1 — skill `--review`) |

---

## Patterns canoniques à respecter

`analyser-rupture-brutale` reproduit les patterns figés V1/V1.1/V1.2 :
- Frontmatter YAML (`name`, `description` multi-lignes `>`, `version: "1.0.0"`, `authors: ["Hacienda"]`, `tags: [...]`)
- Bloc disclaimer en citation `>` après le titre
- `## Examples` : 3-4 blocs `<example>`
- `## Chargement du profil`, `## Intake` (numérotée), `## Étape N`, `## Sortie`
- `## Sortie` : note du relecteur 5 champs **en gras** (Sources / Lecture / Signalé / Fraîcheur / Avant de t'appuyer), arbre de décision 5 options (option 4 = « Surveiller et attendre »), footer A PII en lien Markdown
- Tags de provenance sans backticks dans les cellules ; article hors index → `[a verifier]`
- Toute conclusion s'appuyant sur le safe harbor 18 mois ou sur la qualification borderline de la relation → tag `[review]`

---

## Waves overview

| Wave | Périmètre | Dépendances | Durée estimée |
|---|---|---|---|
| **Tâche 0** | Ménage worktree + tag `v2a-base` + suppression `hacienda-contrats` | aucune | 0.5 jour |
| **Wave 1** | Skill `analyser-rupture-brutale` | Tâche 0 | 2-3 jours |
| **Tâche finale** | Vérification + CHANGELOG + handoff | Wave 1 | 0.5 jour |

Total : ~1 semaine.

---

## Tâche 0 — Préliminaires + suppression hacienda-contrats

**Files:**
- Inspect: `git status`
- Delete: `plugins/hacienda-contrats/`
- Modify: `.claude-plugin/marketplace.json`, `packages/core/test/hacienda-marketplace.test.ts`
- Tag: `v2a-base`

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

- [ ] **Step 2: Poser le tag de base V2a**

Run:
```bash
git tag v2a-base HEAD && git tag --list v2a-base
```
Expected : `v2a-base` listé.

- [ ] **Step 3: Recenser les renvois vers hacienda-contrats**

Run:
```bash
grep -rn "hacienda-contrats" --include="*.md" --include="*.json" --include="*.ts" . | grep -v "docs/superpowers"
```
Noter chaque fichier qui référence `hacienda-contrats` hors `docs/superpowers/` (specs/plans historiques — à ne pas toucher). Cibles probables : `.claude-plugin/marketplace.json`, `packages/core/test/hacienda-marketplace.test.ts`, éventuellement `references/taxonomie-contrats-fr.md` (si un renvoi pointe vers un skill du squelette comme `reviser-cgv-cgu`) ou un `CLAUDE.md`.

- [ ] **Step 4: Supprimer le dossier du plugin**

Run:
```bash
git rm -r plugins/hacienda-contrats/
```

- [ ] **Step 5: Retirer l'entrée de marketplace.json**

Lire `.claude-plugin/marketplace.json`, localiser l'objet de la liste `plugins` dont `"name": "hacienda-contrats"`, le retirer (avec la virgule adjacente pour garder un JSON valide). Vérifier :
```bash
cat .claude-plugin/marketplace.json | jq '.plugins[].name'
```
Expected : la liste ne contient plus `hacienda-contrats`.

- [ ] **Step 6: Mettre à jour le test marketplace**

Lire `packages/core/test/hacienda-marketplace.test.ts`, localiser le tableau `expectedPlugins` (ou équivalent), retirer l'entrée `hacienda-contrats`. Lancer le test :
```bash
cd packages/core && npx vitest run test/hacienda-marketplace.test.ts
```
Expected : PASS.

- [ ] **Step 7: Corriger les renvois résiduels**

Pour chaque fichier identifié au Step 3 et non encore traité : remplacer le renvoi par le skill de remplacement V1/V1.1/V1.2/V2a quand il existe :

| Skill squelette pointé | Remplacement |
|---|---|
| `reviser-contrat` | déjà couvert par V1, renvoi reste valide → mettre à jour vers `hacienda-droit-affaires:reviser-contrat` |
| `reviser-nda` | idem, → `hacienda-droit-affaires:reviser-nda` |
| `reviser-cgv-cgu` | → `hacienda-droit-affaires:cgv-generator` (génération) ou `hacienda-droit-affaires:reviser-contrat` (revue) |
| `entretien-demarrage` | → `hacienda-droit-affaires:entretien-demarrage` |
| `analyser-rupture-brutale` | → `hacienda-droit-affaires:analyser-rupture-brutale` (sera livré en Wave 1) |
| `reviser-saas`, `reviser-bail-commercial`, `analyser-distribution`, `proposer-redlines`, `verification-pouvoir-signataire`, `recherche-contractuelle`, `resume-operationnel` | Pas de remplacement actuel → retirer le renvoi, ou commenter `<!-- v3+ -->` selon contexte |

- [ ] **Step 8: Vérifier la non-régression core**

Run:
```bash
cd packages/core && npx vitest run
```
Expected : tous les tests passent (le test marketplace a été mis à jour ; le décompte attendu est ajusté de -1 plugin).

- [ ] **Step 9: Commit dédié**

```bash
git add -A
git commit -m "chore: suppression du squelette hacienda-contrats (absorption partielle par droit-affaires, reste v3+)"
```

---

## Wave 1 — Skill analyser-rupture-brutale

### Task 1: Skill analyser-rupture-brutale + dataset

**Files:**
- Create: `plugins/hacienda-droit-affaires/skills/analyser-rupture-brutale/SKILL.md`
- Create: `plugins/hacienda-droit-affaires/tests/datasets/v2a/rupture-brutale-scenario.md`

- [ ] **Step 1: Lire le skill patron**

Run:
```bash
cat plugins/hacienda-droit-affaires/skills/reviser-contrat/SKILL.md
```
`reviser-contrat` est le patron exact : skill `--review` qui produit une analyse structurée + une liste de points + une recommandation, avec note du relecteur et arbre de décision 5 options. Reproduire la structure à l'identique pour `analyser-rupture-brutale`.

- [ ] **Step 2: Créer le SKILL.md — frontmatter + disclaimer**

File: `plugins/hacienda-droit-affaires/skills/analyser-rupture-brutale/SKILL.md`
```yaml
---
name: analyser-rupture-brutale
description: >
  Analyse une relation commerciale au regard du risque de rupture brutale
  (L.442-1, II C.com., issu de l'ord. 2019-359 — ex-L.442-6, I, 5°).
  Qualifie la relation établie, évalue le préavis raisonnable (règle de
  pouce + critères jurisprudentiels), applique le safe harbor 18 mois,
  estime le préjudice. Renvoie vers declaration-creance si procédure
  collective concomitante, et vers PI:contrats-pi si distribution
  PI-centric. Brouillon soumis à validation avocat.
version: "1.0.0"
authors: ["Hacienda"]
tags: [rupture-brutale, distribution, l442-1, contentieux, preavis, relation-etablie]
---
```
Titre `# Skill — Analyse de rupture brutale (L.442-1, II)` + disclaimer en citation `>` :
- C'est un brouillon d'analyse, validation avocat impérative.
- Le safe harbor de 18 mois (L.442-1, II al. 2) est une **protection défensive** de l'auteur d'une rupture qui aurait accordé un préavis effectif de 18 mois — ce n'est pas un plafond légal du préavis dû. Toute conclusion s'appuyant dessus est taguée `[review]`.
- Distinguer L.442-1, I (déséquilibre significatif B2B) et L.442-1, II (rupture brutale) — deux fondements distincts dans le même article. Le skill mentionne systématiquement « L.442-1, II » et l'ex-numérotation L.442-6, I, 5° pour les sources antérieures à l'ord. 2019-359.

- [ ] **Step 3: Ajouter Examples + Chargement du profil + Intake**

`## Examples` : 4 blocs —
(a) Distribution exclusive de 8 ans rompue avec un préavis de 3 mois → qualification 🟢 relation établie, préavis 🟠 insuffisant (règle de pouce ≈ 8 mois), recommandation de prolongation, estimation du préjudice (marge brute sur la période manquante).
(b) Relation ponctuelle de 18 mois sans exclusivité ni dépendance → qualification ⛔ pas de relation établie, pas d'obligation de préavis.
(c) Rupture brutale concomitante d'une procédure collective du débiteur → renvoi vers `declaration-creance` pour la déclaration de la créance d'indemnisation.
(d) Rupture brutale d'un contrat de distribution incorporant une licence de marque → renvoi vers `PI:contrats-pi` pour le volet PI.

`## Chargement du profil` : lire dans `CLAUDE.md` la posture contentieuse, la matrice d'approbateurs (notamment seuil d'engagement d'une action), la position dominante du cabinet sur le contentieux des affaires.

`## Intake` : 1. Mode (`--review` par défaut) — 2. Side (auteur de la rupture / victime — auto-détecté si possible) — 3. Documents fournis (contrat, historique commercial, notification de rupture le cas échéant) — 4. Ancienneté de la relation — 5. Volume / exclusivité / dépendance économique (à compléter à l'intake si non documentés).

- [ ] **Step 4: Ajouter les Étapes du workflow**

`## Étape 1 — Pré-flight + identification` : `check-pii` (volume modéré attendu : noms parties, montants — possible seuil B selon dossier) ; lecture profil ; identification side et documents.

`## Étape 2 — Qualification de la « relation commerciale établie »` : appliquer les critères jurisprudentiels — ancienneté, stabilité, régularité, volume, exclusivité ou quasi-exclusivité, intuitu personae, dépendance économique. Conclusion 🟢 établie / 🟡 borderline (tag `[review]`) / ⛔ non établie. Articles cités : L.442-1, II C.com. (tag `[stable]` si index OK, sinon `[a verifier]`).

`## Étape 3 — Évaluation du préavis raisonnable` : règle de pouce jurisprudentielle ≈ 1 mois de préavis par année d'ancienneté de la relation. Modulation par les facteurs identifiés en Étape 2 (forte exclusivité ou dépendance → majoration ; secteur de courte rotation → minoration). Mention systématique du safe harbor 18 mois (L.442-1, II al. 2) comme protection défensive si effectivement accordé — toute conclusion qui s'y appuie taguée `[review]`. Préavis raisonnable estimé vs préavis effectivement accordé → finding 🟢/🟠/🔴.

`## Étape 4 — Estimation du préjudice indemnisable` : base = marge brute (jurisprudence constante) sur la période de préavis manquante. Calculer le différentiel (préavis raisonnable − préavis effectif) × marge mensuelle. Préciser que l'évaluation chiffrée demande des données comptables — taguer `[review]` à défaut.

`## Étape 5 — Cas de dispense de préavis` : examiner si une cause exonératoire est invocable — inexécution grave de l'autre partie (jurisprudence stricte sur le « grave »), force majeure (1218 C.civ.), événements exonératoires sectoriels. Conclusion sur la défensibilité.

`## Étape 6 — Liste de points` : appel interne au skill V1 `liste-de-points` pour produire le tableau structuré (qualification, préavis, préjudice, dispense, recommandation).

`## Étape 7 — Post-flight` : `verifier-citations` sur la sortie. Sur les arrêts cités, utiliser Judilibre via `verifier-citations` pour confirmer la fraîcheur (la jurisprudence ch. com. sur la rupture brutale évolue régulièrement — c'est précisément un sujet où la veille `veille-jurisprudence` V1.2 est pertinente).

- [ ] **Step 5: Ajouter la section Sortie**

`## Sortie` :
- Note du relecteur (5 champs **en gras**) : Sources (Légifrance ✓ / Judilibre ✓ ou ✗ avec motif), Lecture (intégrale du dossier ou partiel), Signalé (nb de findings `[review]`), Fraîcheur (recherche jurisprudence post-date pivot), Avant de t'appuyer (action recommandée — typiquement « valider l'estimation chiffrée avec compta + confirmer la qualification borderline si applicable »).
- En-tête de confidentialité selon rôle utilisateur (depuis `CLAUDE.md §2`).
- Résumé exécutif (3 phrases pour décideur).
- Section Qualification (🟢/🟡/⛔ + motifs).
- Section Préavis (table comparative préavis raisonnable estimé vs effectif, mention du safe harbor 18 mois `[review]`).
- Section Préjudice (estimation chiffrée si données dispo, sinon méthodologie + `[review]`).
- Section Dispense (si applicable).
- Liste de points (tableau criticité décroissante).
- Recommandation : Engager / Négocier / Renoncer — avec justification 2-3 lignes.
- Section « Une question hors de ma checklist habituelle » (omettre si rien d'honnête à dire).
- Arbre de décision 5 options (1. Rédiger un courrier de mise en demeure / 2. Escalader vers approbateur / 3. Compléter les faits (questions à la victime) / 4. Surveiller et attendre / 5. Autre).
- Footer A PII en lien Markdown (`[hacienda-ghost](marketplace://hacienda-ghost)`).

- [ ] **Step 6: Créer le dataset de test**

File: `plugins/hacienda-droit-affaires/tests/datasets/v2a/rupture-brutale-scenario.md`

Contenu : un scénario synthétique de rupture commerciale documentant les éléments suivants (à anonymiser, format Markdown lisible par le skill) :
- Parties : un fournisseur A et un distributeur B (entités fictives, SIREN factices).
- Relation : contrat de distribution exclusive sur un territoire FR, signé il y a 8 ans, renouvellement annuel tacite, volume représentant ~70 % du chiffre d'affaires de B.
- Événement : notification de rupture par A avec un préavis effectif de 3 mois (lettre datée).
- Justification invoquée par A : « réorganisation stratégique » (sans inexécution alléguée de B).
- Données comptables : marge brute mensuelle estimée à 50 000 € pour la relation.

Documenter en commentaire les attendus :
- Qualification : 🟢 relation commerciale établie (8 ans + exclusivité + dépendance économique forte).
- Préavis raisonnable estimé : 8 mois minimum (règle de pouce 1 mois/an), à majorer compte tenu de la dépendance économique (~70 % du CA) → possiblement 10-12 mois.
- Préavis insuffisant : 🟠 / 🔴 selon la majoration retenue.
- Estimation préjudice : (préavis raisonnable − 3 mois) × 50 000 € marge mensuelle.
- Safe harbor 18 mois : non invocable par A (n'a pas accordé 18 mois) — non-applicabilité commentée `[review]`.
- Dispense : aucune base solide (pas d'inexécution alléguée par A).
- Recommandation : action probable en rupture brutale du côté de B.

- [ ] **Step 7: Test manuel de structure**

Vérifier sur le dataset :
- Structure canonique présente (note du relecteur 5 champs gras, arbre 5 options, footer A PII).
- Tags de provenance corrects (L.442-1 cité avec `[Légifrance]` ou `[stable]` selon état de la session ; arrêts cités avec `[Judilibre]` ou `[a verifier]`).
- Distinction explicite L.442-1, I (déséquilibre) vs L.442-1, II (rupture brutale).
- Mention de l'ex-numérotation L.442-6, I, 5° pour les sources antérieures à 2019.
- Safe harbor 18 mois mentionné comme protection défensive, conclusion taguée `[review]`.
- Renvoi vers `declaration-creance` actif (en exemple c) et vers `PI:contrats-pi` (en exemple d).

- [ ] **Step 8: Commit (skill complet)**

```bash
git add plugins/hacienda-droit-affaires/skills/analyser-rupture-brutale/ plugins/hacienda-droit-affaires/tests/datasets/v2a/rupture-brutale-scenario.md
git commit -m "feat(droit-affaires): skill analyser-rupture-brutale (L.442-1 II)"
```

---

## Tâche finale — Vérification globale

### Task 2: Vérification, CHANGELOG, handoff

**Files:**
- Modify (append): `plugins/hacienda-droit-affaires/CHANGELOG.md`
- Modify: `docs/handoff/latest.md`

- [ ] **Step 1: Vérifier le périmètre additif côté plugin droit-affaires**

Run:
```bash
git diff --stat v2a-base HEAD -- plugins/hacienda-droit-affaires/
```
Expected : un seul nouveau dossier de skill (`analyser-rupture-brutale/`), un seul nouveau dataset (`tests/datasets/v2a/`), `CHANGELOG.md` en ajout. **Aucun skill V1/V1.1/V1.2, aucun agent, aucune référence ne doit apparaître.**

- [ ] **Step 2: Vérifier que la Tâche 0 est bien isolée**

Run:
```bash
git diff --stat v2a-base HEAD -- packages/core/ .claude-plugin/ plugins/hacienda-contrats/
```
Expected : montre la suppression de `plugins/hacienda-contrats/`, la modif de `.claude-plugin/marketplace.json` et du test `packages/core/test/hacienda-marketplace.test.ts` — tous attribuables au commit unique de Tâche 0.

- [ ] **Step 3: Suite de tests core**

Run:
```bash
cd packages/core && npx vitest run
```
Expected : tous les tests passent.

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
Expected : installation réussie ; `claude plugin details` liste 19 skills (18 V1/V1.1/V1.2 + `analyser-rupture-brutale`) + 4 agents + 1 MCP server.

- [ ] **Step 6: Mettre à jour le CHANGELOG**

Append à `plugins/hacienda-droit-affaires/CHANGELOG.md` :
```markdown
## [0.1.0] - V2a (en cours)

### Added
- skill `analyser-rupture-brutale` (L.442-1, II C.com.) — analyse contentieuse de la rupture brutale de relations commerciales établies

### Removed
- squelette `hacienda-contrats` supprimé (absorption partielle par droit-affaires V1/V1.1/V1.2/V2a ; 7 skills résiduels du squelette repoussés en v3+ selon demande personas)

### Notes
- Développé en parallèle des tests personas (mode additif côté plugin droit-affaires).
- V2b — distribution Cowork-ready — reste bloquée sur la finalisation du pattern packaging/install par `hacienda-ghost`.
```

- [ ] **Step 7: Mettre à jour le handoff**

Mettre à jour `docs/handoff/latest.md` avec le template `docs/handoff/TEMPLATE-handoff.md` : V2a livrée, état des composants, prochaines étapes (validation personas, attente du pattern ghost pour V2b distribution).

- [ ] **Step 8: Commit final**

```bash
git add plugins/hacienda-droit-affaires/CHANGELOG.md docs/handoff/latest.md
git commit -m "docs(droit-affaires): CHANGELOG V2a + handoff — 1 skill livré, squelette contrats retiré"
```

---

## Post-V2a

V2a livrée. État du plugin : **19 skills, 4 agents**. Reste à faire (hors périmètre de ce plan) :

- **Validation personas** — V1 + V1.1 + V1.2 + V2a. Gate les bumps de version.
- **V2b — Distribution Cowork-ready** — bloquée sur la finalisation du pattern packaging/install par `hacienda-ghost`. Dès que ghost a validé, brainstorm + spec + plan dédiés à V2b (héritage du pattern, configuration spécifique droit-affaires, instructions install pour les personas).
- **Chantier workspaces de dossier** — post-personas (modifie les skills V1).
- **v3+** — 7 skills résiduels du squelette `hacienda-contrats` (`reviser-saas`, `reviser-bail-commercial`, `analyser-distribution`, `proposer-redlines`, `verification-pouvoir-signataire`, `recherche-contractuelle`, `resume-operationnel`), inserts droit boursier cibles cotées, connecteurs Drive/SharePoint/OneDrive.

---

*Fin du plan V2a. Total : Tâche 0 + 1 task skill + 1 task finale = 3 tasks. Estimé ~1 semaine.*
