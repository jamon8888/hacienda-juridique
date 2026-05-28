# Hacienda Droit des Affaires v1.1 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter 6 skills à `hacienda-droit-affaires` (2 clusters : vie sociale + M&A deal-lifecycle) en parallèle des tests personas de V1, sans modifier aucun skill/agent/core de V1.

**Architecture:** Travail strictement additif sur `main` — uniquement de nouveaux fichiers, plus deux extensions additives sanctionnées par le spec (`articles-c-civ-c-com-index.md` en append, sous-bloc `CLAUDE.md §1`). Aucun code TypeScript : V1.1 est entièrement constitué de skills Markdown et de fichiers de référence, calqués sur le format des skills V1 existants. Un skill = un commit complet ; jamais de demi-skill sur `main`.

**Tech Stack:** Markdown + YAML frontmatter. Aucun nouvel outil `packages/core`, aucun agent, aucun MCP touché. Les skills consomment les mécanismes V1 existants (`verifier-citations` post-flight, `check-pii` pré-flight) et les sources via `packages/core` (Légifrance, Pappers/BODACC, Judilibre).

**Spec:** `docs/superpowers/specs/2026-05-20-hacienda-droit-affaires-v1.1-design.md`

---

## File Structure

### Fichiers NEUFS — references (4)
```
plugins/hacienda-droit-affaires/references/
├── clauses-pacte-associes-fr.md       → support de pacte-associes-review
├── comparatif-formes-sociales-fr.md   → support de constitution-societe
├── calendrier-vie-sociale-fr.md       → support de gouvernance-ag
└── grille-due-diligence-fr.md         → support de due-diligence-dataroom
```

### Fichiers NEUFS — skills (6)
```
plugins/hacienda-droit-affaires/skills/
├── pacte-associes-review/SKILL.md
├── constitution-societe/SKILL.md
├── gouvernance-ag/SKILL.md
├── loi-term-sheet/SKILL.md
├── due-diligence-dataroom/SKILL.md
└── closing-checklist-fr/SKILL.md
```

### Fichiers NEUFS — datasets de test (6)
```
plugins/hacienda-droit-affaires/tests/datasets/v1.1/
├── pacte-test.md
├── constitution-scenario.md
├── gouvernance-convocation-pv-test.md
├── loi-term-sheet-test.md
├── data-room-test/            (dossier multi-documents)
└── closing-scenario.md
```

### Fichiers MODIFIÉS — additif uniquement (2, sanctionnés par le spec)
```
plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md  → APPEND articles sociétés
plugins/hacienda-droit-affaires/CLAUDE.md                                  → APPEND sous-bloc §1 "vie sociale"
plugins/hacienda-droit-affaires/CHANGELOG.md                               → APPEND section V1.1
```

### Responsabilités

| Fichier | Responsabilité unique |
|---|---|
| `references/clauses-pacte-associes-fr.md` | Bibliothèque des clauses de pacte d'associés (risque, position playbook, formulations) |
| `references/comparatif-formes-sociales-fr.md` | Comparatif SAS/SARL/SA + règles de bifurcation actes SSP/notarié |
| `references/calendrier-vie-sociale-fr.md` | Délais de convocation, mentions obligatoires convocations/PV, quorum-majorité par forme |
| `references/grille-due-diligence-fr.md` | Grille des 7 thèmes DD + points de contrôle par thème |
| `skills/pacte-associes-review/SKILL.md` | Workflow `--review` de revue de pacte d'associés |
| `skills/constitution-societe/SKILL.md` | Workflow `--comparer` / `--draft` constitution de société |
| `skills/gouvernance-ag/SKILL.md` | Workflow `--convocation` / `--pv` gouvernance d'assemblée |
| `skills/loi-term-sheet/SKILL.md` | Workflow `--review` / `--draft` LOI / term sheet |
| `skills/due-diligence-dataroom/SKILL.md` | Workflow d'analyse de data-room sur 7 thèmes |
| `skills/closing-checklist-fr/SKILL.md` | Générateur de checklist de closing M&A FR |

### Format de référence — skills V1 existants à imiter

| Skill V1.1 à écrire | Skill V1 servant de patron de format |
|---|---|
| `pacte-associes-review` (`--review`) | `skills/reviser-contrat/SKILL.md` |
| `constitution-societe` (`--draft`) | `skills/declaration-creance/SKILL.md` (mode draft) |
| `gouvernance-ag` (multi-modes) | `skills/declaration-creance/SKILL.md` (intake à modes) |
| `loi-term-sheet` (`--review`) | `skills/reviser-contrat/SKILL.md` |
| `due-diligence-dataroom` (multi-thèmes) | `skills/gap-review/SKILL.md` (skill lourd multi-axes) |
| `closing-checklist-fr` (générateur) | `skills/gap-review/SKILL.md` |

---

## Patterns canoniques à respecter (figés en V1)

Tout skill V1.1 reproduit exactement les patterns des skills V1 :
- **Frontmatter YAML** : `name`, `description` (multi-lignes `>`), `version: "1.0.0"`, `authors: ["Hacienda"]`, `tags: [...]`.
- **Bloc disclaimer** en citation `>` juste après le titre `#`.
- **`## Examples`** : 3-4 blocs `<example><user>...</user><response>...</response></example>`.
- **`## Chargement du profil`** : liste des préférences à lire dans `CLAUDE.md`.
- **`## Intake`** : numérotée, modes en flags.
- **`## Étape 1 / 2 / ...`** : workflow.
- **`## Sortie`** : avec note du relecteur (5 champs **en gras** : Sources / Lecture / Signalé / Fraîcheur / Avant de t'appuyer), arbre de décision 5 options (option 4 = « Surveiller et attendre »), footer A PII en lien Markdown.
- **Tags de provenance** sans backticks dans les cellules de tableau ; tag placé après la citation. Article hors index → `[a verifier]`.
- **En-tête de confidentialité** selon le rôle utilisateur (réutilise la logique `CLAUDE.md §2`).

---

## Waves overview

| Wave | Périmètre | Dépendances | Durée estimée |
|---|---|---|---|
| **Tâche 0** | Ménage du worktree `main` | aucune | 30 min |
| **Étape 1** | Extensions partagées (articles-index + CLAUDE.md §1) | Tâche 0 | 0.5 jour |
| **Wave 1** | Cluster vie sociale (pacte-associes-review, constitution-societe, gouvernance-ag) | Étape 1 | ~1.5 semaine |
| **Wave 2** | Cluster M&A (loi-term-sheet, due-diligence-dataroom, closing-checklist-fr) | Wave 1 | ~1.5 semaine |
| **Tâche finale** | Vérification globale + CHANGELOG + handoff | Waves 1+2 | 0.5 jour |

---

## Tâche 0 — Ménage du worktree `main`

**Files:**
- Inspect: `git status`
- Modify/decide: `AGENTS.md`, `CLAUDE.md` (racine), `packages/core/package.json`
- Create: `.gitignore` entries
- Commit: `docs/handoff/TEMPLATE-handoff.md`

- [ ] **Step 1: Inspecter l'état du worktree**

Run:
```bash
git status -s && echo "---DIFF AGENTS---" && git diff AGENTS.md | head -30 && echo "---DIFF CLAUDE---" && git diff CLAUDE.md | head -30 && echo "---DIFF core pkg---" && git diff packages/core/package.json
```
Expected : voir les modifications de `AGENTS.md` / `CLAUDE.md` (probablement régénération automatique GitNexus — bloc `<!-- gitnexus:start -->`), et la modif de `packages/core/package.json`.

- [ ] **Step 2: Traiter AGENTS.md et CLAUDE.md racine**

Si le diff ne contient QUE des changements dans le bloc `<!-- gitnexus:start -->` (compteurs de symboles, nom d'index) → ce sont des régénérations automatiques, les discarder :
```bash
git checkout -- AGENTS.md CLAUDE.md
```
Si le diff contient autre chose → s'arrêter et demander à l'utilisateur.

- [ ] **Step 3: Traiter packages/core/package.json**

Inspecter le diff. Si c'est un effet de bord de l'install MCP (ex: ajout d'une dépendance workspace déjà committée ailleurs) et que `git diff packages/core/package.json` montre une divergence non intentionnelle → discarder :
```bash
git checkout -- packages/core/package.json
```
Si le changement est intentionnel et utile → s'arrêter et demander à l'utilisateur avant de committer (c'est un fichier hors périmètre droit-affaires).

- [ ] **Step 4: Gitignorer les dossiers de config locale**

Vérifier si `.agents/` et `.claude/` doivent être ignorés :
```bash
cat .gitignore | grep -E "^\.agents|^\.claude" || echo "non ignorés"
```
S'ils ne sont pas ignorés, les ajouter à `.gitignore` (ce sont des dossiers de configuration locale, pas du code projet) :
```bash
printf '\n# Configuration locale agents\n.agents/\n.claude/\n' >> .gitignore
```

- [ ] **Step 5: Committer TEMPLATE-handoff.md**

`docs/handoff/TEMPLATE-handoff.md` est un document projet utile (les 2 prompts sont déjà suivis). L'ajouter :
```bash
git add docs/handoff/TEMPLATE-handoff.md .gitignore
git commit -m "chore: gitignore config locale + suit TEMPLATE-handoff.md"
```

- [ ] **Step 6: Vérifier worktree propre**

Run:
```bash
git status -s
```
Expected : worktree propre (aucun fichier modifié/non suivi hors périmètre). S'il reste des résidus inattendus, les signaler à l'utilisateur.

- [ ] **Step 7: Poser un tag de base V1.1**

Marquer le point de départ du développement V1.1, pour pouvoir vérifier en fin de plan que tout le travail a bien été additif :
```bash
git tag v1.1-base HEAD && git tag --list v1.1-base
```
Expected : `v1.1-base` listé. Ce tag sert de référence aux vérifications de la Task 8.

---

## Étape 1 — Extensions partagées

### Task 1.1: Étendre articles-c-civ-c-com-index.md (articles sociétés)

**Files:**
- Modify (append): `plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md`

- [ ] **Step 1: Lire le fichier existant pour comprendre le format**

Run:
```bash
cat plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md
```
Noter : format de table (Article | Libellé court | LEGIARTI), conventions de tags, sections existantes.

- [ ] **Step 2: Récupérer les LEGIARTI des articles sociétés via Légifrance**

Pour chaque article ci-dessous, récupérer le LEGIARTI réel via Légifrance (WebSearch sur `site:legifrance.gouv.fr "article L.XXX-X du code de commerce"` ou via l'outil PISTE si configuré). **Ne jamais inventer un LEGIARTI** — si non confirmé, taguer `[a verifier]`.

Articles SARL : L.223-1 (constitution), L.223-2 (capital), L.223-7 (souscription parts), L.223-9 (commissaire aux apports SARL), L.223-14 (agrément cession à tiers), L.223-27 (assemblées SARL), L.223-30 (modifications statutaires).
Articles SA : L.225-1 (constitution, 2 actionnaires non cotée), L.225-3 (apports en nature), L.225-96 (AGE — quorum et majorité), L.225-98 (AGO — quorum et majorité), L.225-100 (assemblée annuelle).
Articles SAS : L.227-1 (régime SAS, renvoi SA), L.227-9 (décisions collectives), L.227-13 (inaliénabilité statutaire — max 10 ans), L.227-14 (clause d'agrément), L.227-15 (cession en violation = nulle).
Articles titres : L.228-1 (valeurs mobilières), L.228-23 (clause d'agrément sociétés non cotées), L.228-24 (procédure d'agrément).
Constitution générale : L.210-2 (mentions statutaires obligatoires), L.210-6 (personnalité morale à l'immatriculation).

- [ ] **Step 3: Ajouter une section "Code de commerce — droit des sociétés" au fichier**

Append au fichier une nouvelle section, dans le format de table existant. Chaque ligne : `| L.XXX-X | <libellé court exact> | LEGIARTI... ou [a verifier] |`. Respecter la convention de l'index (libellé court factuel, pas de paraphrase).

- [ ] **Step 4: Vérifier qu'aucun article existant n'a été modifié**

Run:
```bash
git diff plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md
```
Expected : uniquement des lignes AJOUTÉES (préfixe `+`), aucune ligne supprimée ou modifiée. Si une ligne existante a changé → annuler et recommencer en append pur.

- [ ] **Step 5: Commit**

```bash
git add plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md
git commit -m "docs(droit-affaires): index articles — ajout droit des sociétés (L.223/225/227/228-x)"
```

---

### Task 1.2: Ajouter le sous-bloc "vie sociale" à CLAUDE.md §1

**Files:**
- Modify (append dans §1): `plugins/hacienda-droit-affaires/CLAUDE.md`

- [ ] **Step 1: Lire CLAUDE.md §1 pour repérer les sous-blocs existants**

Run:
```bash
grep -n "Bloc " plugins/hacienda-droit-affaires/CLAUDE.md
```
Expected : repérer les sous-blocs existants du §1 (M&A/Corporate, Procédures collectives, Contrats commerciaux) et leur format.

- [ ] **Step 2: Ajouter le sous-bloc "Vie sociale" après le sous-bloc "M&A / Corporate"**

Insérer un nouveau sous-bloc au format identique aux sous-blocs existants. Contenu :
```markdown
### Bloc vie sociale

**Formes sociales pratiquées :** [A CONFIGURER — SAS / SARL / SA / SNC / SCI / autres]
**Posture rédaction statuts :** [A CONFIGURER — standard / sur-mesure investisseurs / minimaliste]
**Notaire partenaire (apports en nature, fonds de commerce) :** [A CONFIGURER]
**Cadence assemblées suivies :** [A CONFIGURER — portefeuille de sociétés / ponctuel]
**Posture pacte d'associés :** [A CONFIGURER — protecteur fondateurs / équilibré / protecteur investisseurs]
```

C'est un AJOUT pur : ne modifier aucun sous-bloc existant, ne pas toucher aux §2-§11.

- [ ] **Step 3: Vérifier le caractère additif**

Run:
```bash
git diff plugins/hacienda-droit-affaires/CLAUDE.md
```
Expected : uniquement des lignes ajoutées dans le §1. Aucune modification ailleurs.

- [ ] **Step 4: Commit**

```bash
git add plugins/hacienda-droit-affaires/CLAUDE.md
git commit -m "docs(droit-affaires): CLAUDE.md §1 — sous-bloc vie sociale (additif)"
```

---

## Wave 1 — Cluster vie sociale

> Convention pour toutes les tasks de skill (Waves 1 et 2) : le skill et sa référence sont écrits ensemble et commités **dans un seul commit complet**. Si le skill demande plusieurs sessions, travailler sur une branche courte `v1.1-<skill>` et merger d'un coup. Jamais de demi-skill sur `main`.

### Task 2: Skill pacte-associes-review + sa référence

**Files:**
- Create: `plugins/hacienda-droit-affaires/references/clauses-pacte-associes-fr.md`
- Create: `plugins/hacienda-droit-affaires/skills/pacte-associes-review/SKILL.md`
- Create: `plugins/hacienda-droit-affaires/tests/datasets/v1.1/pacte-test.md`

- [ ] **Step 1: Lire le skill V1 patron**

Run:
```bash
cat plugins/hacienda-droit-affaires/skills/reviser-contrat/SKILL.md
```
C'est le patron de format exact à reproduire (skill `--review`).

- [ ] **Step 2: Créer la référence clauses-pacte-associes-fr.md**

Créer le fichier avec, pour chacune des 11 clauses ci-dessous, un bloc structuré (format identique à `references/clauses-sensibles-fr.md` V1 — lire ce fichier d'abord pour le format) : libellé typique à détecter / risque juridique / position playbook par posture / formulations alternatives / articles à vérifier.

Les 11 clauses : (1) préemption, (2) agrément (L.227-14 SAS / L.223-14 SARL / L.228-23 non cotée), (3) inaliénabilité (SAS : L.227-13, durée max 10 ans + intérêt sérieux ; vérifier jurisprudence durée raisonnable), (4) drag-along (obligation de cession conjointe), (5) tag-along (droit de cession conjointe), (6) anti-dilution, (7) good leaver / bad leaver, (8) promesses croisées de cession (call/put), (9) non-concurrence des associés (distincte de la non-concurrence salariée — pas d'exigence de contrepartie financière mais contrôle de proportionnalité), (10) droits de véto / décisions réservées, (11) clauses d'information et de liquidité/sortie.

- [ ] **Step 3: Créer le SKILL.md — frontmatter + disclaimer**

Créer `skills/pacte-associes-review/SKILL.md` avec :
```yaml
---
name: pacte-associes-review
description: >
  Revue d'un pacte d'associés contre le playbook du cabinet : préemption,
  agrément, inaliénabilité, drag/tag-along, anti-dilution, good/bad leaver,
  promesses croisées, non-concurrence des associés, droits de véto, clauses
  d'information et de liquidité. Triage par criticité, liste de points de
  négociation. Renvoie vers PI:contrats-pi si apports/licences PI substantiels.
  Brouillon soumis à validation avocat.
version: "1.0.0"
authors: ["Hacienda"]
tags: [pacte-associes, societes, revue, drag-along, preemption, agrement]
---
```
Puis le titre `# Skill — Revue de pacte d'associés` et un bloc disclaimer en citation `>` (brouillon, validation avocat obligatoire ; renvoi vers `PI:contrats-pi` si le pacte porte sur des apports ou licences PI substantiels).

- [ ] **Step 4: Ajouter les sections Examples + Chargement du profil + Intake**

`## Examples` : 3 blocs `<example>` — (a) revue de pacte standard côté fondateurs, (b) pacte avec clause d'inaliénabilité à durée excessive (> 10 ans SAS, ou sans intérêt sérieux) → finding 🔴, (c) pacte à composante PI substantielle → renvoi vers `PI:contrats-pi`.

`## Chargement du profil` : lire dans `CLAUDE.md` la posture pacte d'associés, les positions playbook, la matrice d'approbateurs, la politique PII.

`## Intake` : 1. Mode (`--review` par défaut) — 2. Fichier pacte — 3. Side (fondateur / investisseur / société) — 4. Forme sociale concernée.

- [ ] **Step 5: Ajouter les Étapes du workflow**

`## Étape 1 — Pré-flight + identification` : check-pii ; lecture profil ; identification forme sociale + parties ; détection composante PI → renvoi `PI:contrats-pi`.
`## Étape 2 — Analyse clause par clause` : pour chaque clause de `references/clauses-pacte-associes-fr.md` — citation, comparaison playbook, statut 🟢/🟡/🟠/🔴, article applicable + tag provenance, risque. Tag `[review]` sur les jugements subjectifs (proportionnalité d'une non-concurrence d'associé, durée d'inaliénabilité borderline).
`## Étape 3 — Liste de points` : appel interne au skill V1 `liste-de-points`.
`## Étape 4 — Post-flight` : `verifier-citations` sur la sortie.

- [ ] **Step 6: Ajouter la section Sortie**

`## Sortie` : note du relecteur (5 champs en gras) ; en-tête de confidentialité selon rôle ; résumé exécutif (3 phrases) ; liste de points (tableau criticité décroissante) ; recommandation ; question hors checklist ; arbre de décision 5 options ; footer A PII.

- [ ] **Step 7: Créer le dataset de test**

Créer `tests/datasets/v1.1/pacte-test.md` : un pacte d'associés synthétique anonymisé contenant des pièges connus — une clause d'inaliénabilité de 15 ans (excessive), une clause de non-concurrence d'associé disproportionnée, une clause de drag-along sans seuil de déclenchement. Documenter en commentaire les findings attendus.

- [ ] **Step 8: Test manuel de structure**

Vérifier sur le dataset : note du relecteur à 5 champs en gras présente ; arbre 5 options présent ; footer A présent ; tags de provenance sans backticks ; les 3 pièges du dataset sont bien détectés avec la bonne criticité.

- [ ] **Step 9: Commit (skill complet)**

```bash
git add plugins/hacienda-droit-affaires/references/clauses-pacte-associes-fr.md plugins/hacienda-droit-affaires/skills/pacte-associes-review/ plugins/hacienda-droit-affaires/tests/datasets/v1.1/pacte-test.md
git commit -m "feat(droit-affaires): skill pacte-associes-review + reference clauses-pacte"
```

---

### Task 3: Skill constitution-societe + sa référence

**Files:**
- Create: `plugins/hacienda-droit-affaires/references/comparatif-formes-sociales-fr.md`
- Create: `plugins/hacienda-droit-affaires/skills/constitution-societe/SKILL.md`
- Create: `plugins/hacienda-droit-affaires/tests/datasets/v1.1/constitution-scenario.md`

- [ ] **Step 1: Lire le skill V1 patron**

Run:
```bash
cat plugins/hacienda-droit-affaires/skills/declaration-creance/SKILL.md
```
Patron pour un skill à modes et à mode de génération (`--draft`).

- [ ] **Step 2: Créer la référence comparatif-formes-sociales-fr.md**

Créer le fichier avec deux parties :
1. **Tableau comparatif SAS / SARL / SA** sur les axes : capital minimum, nombre d'associés, organe de direction, cession de titres (libre vs agrément), régime social du dirigeant (assimilé salarié vs TNS), responsabilité, fiscalité par défaut (renvoi — pas de conseil fiscal détaillé), commissaire aux comptes (seuils).
2. **Règles de bifurcation actes** : actes sous seing privé suffisants (cas standard) vs actes notariés obligatoires (apport en nature d'immeuble, apport de fonds de commerce comprenant un immeuble) ; règle du commissaire aux apports pour les apports en nature (désignation, seuils, dispense unanimité SARL/SAS sous seuil).

- [ ] **Step 3: Créer le SKILL.md — frontmatter + disclaimer**

```yaml
---
name: constitution-societe
description: >
  Assistance à la constitution de société : mode --comparer (aide au choix
  de forme SAS/SARL/SA) et mode --draft (brouillon assisté de statuts, chaque
  point de décision tagué [review]). Détecte la bifurcation acte sous seing
  privé vs notarié obligatoire. Brouillon soumis à validation avocat/notaire.
version: "1.0.0"
authors: ["Hacienda"]
tags: [constitution, societes, statuts, sas, sarl, sa, actes]
---
```
Titre `# Skill — Constitution de société` + disclaimer renforcé en citation `>` : ce skill assiste la rédaction d'actes constitutifs ; le mode `--draft` produit un **brouillon assisté** où chaque clause appelant un arbitrage est taguée `[review]` ; jamais un document « prêt à déposer » ; validation avocat/notaire impérative.

- [ ] **Step 4: Ajouter Examples + Chargement du profil + Intake**

`## Examples` : 4 blocs — (a) `--comparer` aide au choix SAS vs SARL pour une startup, (b) `--draft` brouillon de statuts SAS avec points `[review]`, (c) constitution avec apport en nature d'immeuble → détection acte notarié obligatoire, (d) apport en nature au-dessus du seuil → signalement commissaire aux apports.

`## Chargement du profil` : lire formes sociales pratiquées, posture rédaction statuts, notaire partenaire (sous-bloc vie sociale du `CLAUDE.md §1`).

`## Intake` : 1. Mode (`--comparer` | `--draft`) — 2. Forme visée (si `--draft`) — 3. Nombre et type d'associés — 4. Nature des apports (numéraire / nature / industrie) — 5. Spécificités (gouvernance souhaitée, présence d'investisseurs).

- [ ] **Step 5: Ajouter les Étapes — mode --comparer**

`## Étape 1 (--comparer) — Cadrage du besoin` : nombre d'associés, ambition de levée, régime social souhaité du dirigeant, besoin de souplesse statutaire.
`## Étape 2 (--comparer) — Recommandation` : table comparative depuis `references/comparatif-formes-sociales-fr.md`, recommandation motivée, tags `[review]` sur les arbitrages dépendant de critères fiscaux/sociaux (renvoi expert-comptable).

- [ ] **Step 6: Ajouter les Étapes — mode --draft**

`## Étape 1 (--draft) — Détection bifurcation actes` : analyser les apports déclarés ; si apport en nature d'immeuble ou de fonds de commerce avec immeuble → signaler 🔴 « acte notarié obligatoire » ; si apport en nature → signaler la règle du commissaire aux apports (seuils).
`## Étape 2 (--draft) — Brouillon assisté de statuts` : produire un projet de statuts structuré (mentions L.210-2 obligatoires + clauses adaptées à la forme). **Chaque clause appelant un arbitrage est taguée `[review]`** : forme et montant du capital, clauses d'agrément, règles de quorum et de majorité, modalités de direction, clause d'inaliénabilité éventuelle. Le livrable ne se présente jamais comme « prêt à déposer ».
`## Étape 3 (--draft) — Post-flight` : `verifier-citations`.

- [ ] **Step 7: Ajouter la section Sortie**

`## Sortie` : note du relecteur (5 champs gras) ; en-tête confidentialité ; pour `--comparer` : tableau + recommandation ; pour `--draft` : brouillon de statuts `[review]`-tagué + liste explicite des points à arbitrer ; question hors checklist ; arbre de décision 5 options ; footer A PII.

- [ ] **Step 8: Créer le dataset de test**

Créer `tests/datasets/v1.1/constitution-scenario.md` : deux scénarios — (1) une startup 3 fondateurs voulant lever des fonds → attendu : recommandation SAS, (2) une constitution avec apport d'un local commercial en nature → attendu : détection acte notarié obligatoire + commissaire aux apports. Documenter les attendus en commentaire.

- [ ] **Step 9: Test manuel de structure**

Vérifier : structure canonique présente ; en mode `--draft`, tous les points de décision sont bien tagués `[review]` et le livrable ne se présente pas comme final ; la bifurcation acte notarié est détectée sur le scénario 2.

- [ ] **Step 10: Commit (skill complet)**

```bash
git add plugins/hacienda-droit-affaires/references/comparatif-formes-sociales-fr.md plugins/hacienda-droit-affaires/skills/constitution-societe/ plugins/hacienda-droit-affaires/tests/datasets/v1.1/constitution-scenario.md
git commit -m "feat(droit-affaires): skill constitution-societe (--comparer/--draft) + reference formes sociales"
```

---

### Task 4: Skill gouvernance-ag + sa référence

**Files:**
- Create: `plugins/hacienda-droit-affaires/references/calendrier-vie-sociale-fr.md`
- Create: `plugins/hacienda-droit-affaires/skills/gouvernance-ag/SKILL.md`
- Create: `plugins/hacienda-droit-affaires/tests/datasets/v1.1/gouvernance-convocation-pv-test.md`

- [ ] **Step 1: Lire le skill V1 patron**

Run:
```bash
cat plugins/hacienda-droit-affaires/skills/declaration-creance/SKILL.md
```
Patron pour un skill à modes.

- [ ] **Step 2: Créer la référence calendrier-vie-sociale-fr.md**

Créer le fichier avec :
1. **Délais de convocation** par forme sociale : SARL (L.223-27 — 15 jours), SA (L.225-96/98 + R.225-67 — 15 jours sur première convocation), SAS (liberté statutaire — renvoyer aux statuts).
2. **Mentions obligatoires de la convocation** : ordre du jour, date/heure/lieu, modalités de participation, documents joints selon le type d'assemblée.
3. **Règles de quorum et de majorité** AGO vs AGE par forme : SARL (AGO majorité simple, AGE 2/3 des parts depuis 2005), SA (AGO quorum 1/5 sur 1re convocation et majorité simple, AGE quorum 1/4 et majorité 2/3), SAS (liberté statutaire).
4. **Mentions obligatoires du PV** : identité des participants, quorum constaté, résolutions et résultats de vote, signatures.

- [ ] **Step 3: Créer le SKILL.md — frontmatter + disclaimer**

```yaml
---
name: gouvernance-ag
description: >
  Gouvernance d'assemblée : mode --convocation (génère une convocation d'AGO
  ou d'AGE conforme aux délais et mentions obligatoires) et mode --pv (génère
  ou révise un procès-verbal d'assemblée). Adapte quorum, majorité et
  formalisme à la forme sociale. Brouillon soumis à validation avocat.
version: "1.0.0"
authors: ["Hacienda"]
tags: [gouvernance, assemblee, ago, age, convocation, proces-verbal, societes]
---
```
Titre `# Skill — Gouvernance d'assemblée` + disclaimer en citation `>` (brouillon ; les délais de convocation sont d'ordre public, une convocation irrégulière entraîne la nullité des délibérations ; validation avocat).

- [ ] **Step 4: Ajouter Examples + Chargement du profil + Intake**

`## Examples` : 3 blocs — (a) `--convocation` AGO annuelle d'une SARL, (b) `--convocation` AGE de modification statutaire d'une SA (quorum/majorité renforcés), (c) `--pv` rédaction du PV d'une AGO avec résolutions et votes.

`## Chargement du profil` : lire la cadence assemblées suivies, les formes sociales pratiquées (sous-bloc vie sociale).

`## Intake` : 1. Mode (`--convocation` | `--pv`) — 2. Forme sociale — 3. Type d'assemblée (AGO / AGE / mixte) — 4. Ordre du jour / résolutions — 5. Date prévue (pour `--convocation`, calcul du délai).

- [ ] **Step 5: Ajouter les Étapes — mode --convocation**

`## Étape 1 (--convocation) — Calcul du délai` : depuis la date d'assemblée visée et la forme sociale, calculer la date limite d'envoi de la convocation (`references/calendrier-vie-sociale-fr.md`). Signaler 🔴 si le délai est déjà intenable.
`## Étape 2 (--convocation) — Rédaction` : générer la convocation avec toutes les mentions obligatoires, ordre du jour, documents à joindre selon le type d'assemblée. Tags `[review]` sur les points dépendant des statuts (SAS surtout).

- [ ] **Step 6: Ajouter les Étapes — mode --pv**

`## Étape 1 (--pv) — Vérification quorum/majorité` : selon forme et type d'assemblée, rappeler les règles de quorum et de majorité applicables (`references/calendrier-vie-sociale-fr.md`).
`## Étape 2 (--pv) — Rédaction du PV` : générer le procès-verbal — participants, quorum constaté, chaque résolution avec son résultat de vote, signatures. Tag `[review]` si le quorum/la majorité saisis semblent incohérents avec la forme.
`## Étape 3 — Post-flight` : `verifier-citations`.

- [ ] **Step 7: Ajouter la section Sortie**

`## Sortie` : note du relecteur (5 champs gras) ; en-tête confidentialité ; le livrable (convocation ou PV) ; question hors checklist ; arbre de décision 5 options ; footer A PII.

- [ ] **Step 8: Créer le dataset de test**

Créer `tests/datasets/v1.1/gouvernance-convocation-pv-test.md` : deux scénarios — (1) `--convocation` d'une AGE de SA avec une date d'assemblée dans 10 jours → attendu : 🔴 délai intenable (15 jours requis), (2) `--pv` d'une AGE de SARL → attendu : rappel quorum/majorité 2/3 des parts. Documenter les attendus.

- [ ] **Step 9: Test manuel de structure**

Vérifier : structure canonique ; le calcul de délai détecte le scénario 1 ; les règles de quorum/majorité correctes pour le scénario 2 ; les deux modes produisent un livrable cohérent.

- [ ] **Step 10: Commit (skill complet)**

```bash
git add plugins/hacienda-droit-affaires/references/calendrier-vie-sociale-fr.md plugins/hacienda-droit-affaires/skills/gouvernance-ag/ plugins/hacienda-droit-affaires/tests/datasets/v1.1/gouvernance-convocation-pv-test.md
git commit -m "feat(droit-affaires): skill gouvernance-ag (--convocation/--pv) + reference calendrier vie sociale"
```

---

## Wave 2 — Cluster M&A

### Task 5: Skill loi-term-sheet

**Files:**
- Create: `plugins/hacienda-droit-affaires/skills/loi-term-sheet/SKILL.md`
- Create: `plugins/hacienda-droit-affaires/tests/datasets/v1.1/loi-term-sheet-test.md`
- Réutilise (lecture seule) : `references/clauses-sensibles-fr.md` (V1)

- [ ] **Step 1: Lire le skill V1 patron + la référence réutilisée**

Run:
```bash
cat plugins/hacienda-droit-affaires/skills/reviser-contrat/SKILL.md
head -40 plugins/hacienda-droit-affaires/references/clauses-sensibles-fr.md
```

- [ ] **Step 2: Créer le SKILL.md — frontmatter + disclaimer**

```yaml
---
name: loi-term-sheet
description: >
  Revue ou rédaction de lettre d'intention / LOI / term sheet M&A. Distingue
  les clauses binding des clauses non-binding, vérifie exclusivité,
  confidentialité, bonne foi des pourparlers (1104, 1112 C.civ), conditions
  suspensives esquissées et calendrier. Mode --review et --draft. Brouillon
  soumis à validation avocat.
version: "1.0.0"
authors: ["Hacienda"]
tags: [loi, term-sheet, lettre-intention, ma, pourparlers, binding]
---
```
Titre `# Skill — LOI / Term sheet` + disclaimer en citation `>` (brouillon ; le piège central de ces documents est la confusion binding/non-binding — une clause mal qualifiée peut engager juridiquement ; validation avocat).

- [ ] **Step 3: Ajouter Examples + Chargement du profil + Intake**

`## Examples` : 3 blocs — (a) `--review` d'une LOI reçue, identification des clauses binding cachées, (b) `--review` d'un term sheet avec clause d'exclusivité trop longue, (c) `--draft` d'une LOI côté acquéreur.

`## Chargement du profil` : lire la posture contractuelle, le side habituel M&A, la matrice d'approbateurs (bloc M&A/Corporate du `CLAUDE.md`).

`## Intake` : 1. Mode (`--review` | `--draft`) — 2. Fichier (si `--review`) — 3. Side (acquéreur / cédant) — 4. Contexte du deal (taille, calendrier visé).

- [ ] **Step 4: Ajouter les Étapes**

`## Étape 1 — Pré-flight + identification` : check-pii ; lecture profil ; identification du document et du side.
`## Étape 2 — Cartographie binding / non-binding` : passer en revue chaque clause et la classer binding / non-binding ; signaler 🔴 toute clause binding non intentionnelle (exclusivité, confidentialité, frais, loi applicable et juridiction sont typiquement binding même dans une LOI « non engageante »).
`## Étape 3 — Analyse des clauses sensibles` : exclusivité (durée, périmètre), confidentialité, bonne foi des pourparlers et risque de rupture abusive (1104, 1112 C.civ — articles depuis `references/articles-c-civ-c-com-index.md`), conditions suspensives esquissées, calendrier, sort des frais. Réutiliser `references/clauses-sensibles-fr.md` pour les clauses communes (confidentialité, droit applicable).
`## Étape 4 — Liste de points` : appel interne `liste-de-points`.
`## Étape 5 — Post-flight` : `verifier-citations`.

- [ ] **Step 5: Ajouter la section Sortie**

`## Sortie` : note du relecteur (5 champs gras) ; en-tête confidentialité ; résumé exécutif ; **tableau binding/non-binding** ; liste de points ; recommandation ; question hors checklist ; arbre de décision 5 options ; footer A PII.

- [ ] **Step 6: Créer le dataset de test**

Créer `tests/datasets/v1.1/loi-term-sheet-test.md` : une LOI synthétique « non engageante » contenant en réalité une clause d'exclusivité de 12 mois et une clause de prise en charge des frais — pièges binding cachés. Documenter les attendus.

- [ ] **Step 7: Test manuel de structure**

Vérifier : structure canonique ; le tableau binding/non-binding est présent ; les 2 clauses binding cachées du dataset sont détectées et signalées 🔴/🟠.

- [ ] **Step 8: Commit (skill complet)**

```bash
git add plugins/hacienda-droit-affaires/skills/loi-term-sheet/ plugins/hacienda-droit-affaires/tests/datasets/v1.1/loi-term-sheet-test.md
git commit -m "feat(droit-affaires): skill loi-term-sheet (--review/--draft)"
```

---

### Task 6: Skill due-diligence-dataroom + sa référence

**Files:**
- Create: `plugins/hacienda-droit-affaires/references/grille-due-diligence-fr.md`
- Create: `plugins/hacienda-droit-affaires/skills/due-diligence-dataroom/SKILL.md`
- Create: `plugins/hacienda-droit-affaires/tests/datasets/v1.1/data-room-test/` (dossier multi-documents)
- Réutilise (lecture seule) : `skills/revue-tabulaire/SKILL.md` (V1)

- [ ] **Step 1: Lire le skill V1 patron + revue-tabulaire**

Run:
```bash
cat plugins/hacienda-droit-affaires/skills/gap-review/SKILL.md
cat plugins/hacienda-droit-affaires/skills/revue-tabulaire/SKILL.md
```
`gap-review` est le patron de format (skill lourd multi-axes). `revue-tabulaire` est consommé comme brique d'extraction — comprendre son intake/sortie pour l'invoquer correctement.

- [ ] **Step 2: Créer la référence grille-due-diligence-fr.md**

Créer le fichier : pour chacun des 7 thèmes, lister les points de contrôle, les documents typiquement attendus en data-room, et les signaux d'alerte (red flags).

Les 7 thèmes : (1) Corporate / Gouvernance (statuts, PV, capital, pactes, registres), (2) Contrats matériels (clients/fournisseurs clés, clauses de changement de contrôle), (3) Social / RH (contrats des dirigeants, accords collectifs, engagements de retraite, contentieux prud'homal), (4) Propriété intellectuelle (titularité, dépôts, licences — renvoi `hacienda-propriete-intellectuelle`), (5) Fiscal / Financier (liasses, contrôles en cours, intégration fiscale — renvoi expert-comptable / `hacienda-fiscal`), (6) Contentieux / Passifs (litiges en cours, provisions, garanties données), (7) RGPD / Conformité réglementaire (registre des traitements, sous-traitance, conformité sectorielle — renvoi `hacienda-ghost` pour l'audit RGPD).

- [ ] **Step 3: Créer le SKILL.md — frontmatter + disclaimer**

```yaml
---
name: due-diligence-dataroom
description: >
  Analyse de data-room M&A sur 7 thèmes (corporate, contrats, social, PI,
  fiscal, contentieux, RGPD). S'appuie sur revue-tabulaire pour l'extraction
  multi-documents. Produit un rapport structuré par thème, une grille de
  matérialité, une Q&A list et des recommandations pour la GAP. Brouillon
  soumis à validation avocat.
version: "1.0.0"
authors: ["Hacienda"]
tags: [due-diligence, dataroom, ma, materialite, gap]
---
```
Titre `# Skill — Due diligence data-room` + disclaimer en citation `>` (brouillon ; une data-room contient un volume massif de données sensibles — `check-pii` pré-flight est critique ; l'analyse oriente la GAP mais ne s'y substitue pas ; validation avocat M&A).

- [ ] **Step 4: Ajouter Examples + Chargement du profil + Intake**

`## Examples` : 4 blocs — (a) DD complète 7 thèmes côté acquéreur, (b) DD ciblée sur 3 thèmes (corporate, contrats, contentieux), (c) data-room volumineuse → `check-pii` déclenche le seuil B, (d) findings DD débouchant sur des recommandations de clauses GAP (lien `gap-review`).

`## Chargement du profil` : lire la posture DD (thèmes prioritaires, seuil de matérialité), le side habituel M&A (bloc M&A/Corporate).

`## Intake` : 1. Dossier data-room (chemin) — 2. Thèmes à couvrir (défaut : les 7) — 3. Side — 4. Seuil de matérialité.

- [ ] **Step 5: Ajouter les Étapes**

`## Étape 1 — Pré-flight` : `check-pii` sur l'ensemble de la data-room (volume élevé → seuil B très probable) ; lecture profil.
`## Étape 2 — Inventaire et extraction` : recenser les documents ; invoquer le skill V1 `revue-tabulaire` pour l'extraction structurée multi-documents (le consommer tel quel, sans le modifier).
`## Étape 3 — Analyse par thème` : pour chacun des 7 thèmes (ou ceux demandés), appliquer la grille `references/grille-due-diligence-fr.md` — points de contrôle, red flags, documents manquants. Renvois en pointeurs vers les plugins spécialisés (PI, fiscal, RGPD) sans s'y substituer.
`## Étape 4 — Grille de matérialité` : classer chaque finding par thème × gravité (🟢/🟡/🟠/🔴) × statut.
`## Étape 5 — Q&A list` : générer la liste des questions complémentaires à adresser au cédant.
`## Étape 6 — Recommandations GAP` : pour les findings matériels, esquisser les protections GAP à demander (lien vers le skill V1 `gap-review`).
`## Étape 7 — Post-flight` : `verifier-citations`.

- [ ] **Step 6: Ajouter la section Sortie**

`## Sortie` : note du relecteur (5 champs gras — dont la liste des thèmes effectivement couverts et des documents manquants) ; en-tête confidentialité ; résumé exécutif ; rapport structuré par thème ; grille de matérialité ; Q&A list ; recommandations GAP ; question hors checklist ; arbre de décision 5 options ; footer A PII.

- [ ] **Step 7: Créer le dataset de test (data-room synthétique)**

Créer le dossier `tests/datasets/v1.1/data-room-test/` avec 5-6 documents synthétiques anonymisés répartis sur plusieurs thèmes : des statuts, un PV d'AG, deux contrats clients (dont un avec clause de changement de contrôle — red flag attendu), une mention de litige en cours, un registre de traitements RGPD partiel. Ajouter un `README.md` documentant les findings attendus par thème.

- [ ] **Step 8: Test manuel de structure**

Vérifier : structure canonique ; les 7 thèmes (ou ceux demandés) sont couverts ; `revue-tabulaire` est bien invoqué pour l'extraction ; la clause de changement de contrôle est détectée comme red flag ; la grille de matérialité et la Q&A list sont présentes ; `check-pii` se déclenche sur le volume.

- [ ] **Step 9: Vérifier que revue-tabulaire n'a pas été modifié**

Run:
```bash
git status -s plugins/hacienda-droit-affaires/skills/revue-tabulaire/
```
Expected : aucune sortie (le skill V1 `revue-tabulaire` n'a pas été touché — il est seulement consommé).

- [ ] **Step 10: Commit (skill complet)**

```bash
git add plugins/hacienda-droit-affaires/references/grille-due-diligence-fr.md plugins/hacienda-droit-affaires/skills/due-diligence-dataroom/ plugins/hacienda-droit-affaires/tests/datasets/v1.1/data-room-test/
git commit -m "feat(droit-affaires): skill due-diligence-dataroom 7 themes + grille DD"
```

---

### Task 7: Skill closing-checklist-fr

**Files:**
- Create: `plugins/hacienda-droit-affaires/skills/closing-checklist-fr/SKILL.md`
- Create: `plugins/hacienda-droit-affaires/tests/datasets/v1.1/closing-scenario.md`

- [ ] **Step 1: Lire le skill V1 patron**

Run:
```bash
cat plugins/hacienda-droit-affaires/skills/gap-review/SKILL.md
```

- [ ] **Step 2: Créer le SKILL.md — frontmatter + disclaimer**

```yaml
---
name: closing-checklist-fr
description: >
  Génère une checklist de closing M&A adaptée au droit français : conditions
  suspensives à lever, séquençage signing/closing, documentation à réunir,
  formalités post-closing (dépôt au greffe, registre de mouvements de titres,
  droits d'enregistrement). Brouillon soumis à validation avocat.
version: "1.0.0"
authors: ["Hacienda"]
tags: [closing, checklist, ma, conditions-suspensives, formalites]
---
```
Titre `# Skill — Checklist de closing` + disclaimer en citation `>` (brouillon ; une formalité post-closing omise — registre de mouvements de titres, droits d'enregistrement — peut affecter l'opposabilité de la cession ; validation avocat).

- [ ] **Step 3: Ajouter Examples + Chargement du profil + Intake**

`## Examples` : 3 blocs — (a) checklist de closing d'une cession de titres de SAS, (b) checklist avec conditions suspensives multiples (agrément, autorisation administrative), (c) volet formalités post-closing (registre de mouvements de titres, CERFA droits d'enregistrement).

`## Chargement du profil` : lire le side habituel M&A, la matrice d'approbateurs (bloc M&A/Corporate).

`## Intake` : 1. Type d'opération (cession de titres / cession de fonds / fusion) — 2. Forme(s) sociale(s) — 3. Conditions suspensives connues — 4. Date de closing visée.

- [ ] **Step 4: Ajouter les Étapes**

`## Étape 1 — Conditions suspensives` : recenser les CP, leur statut (levée / en cours / à lever), le responsable et l'échéance de chacune.
`## Étape 2 — Séquençage signing / closing` : ordonner les étapes entre la signature et la réalisation ; identifier les actes à signer le jour du closing.
`## Étape 3 — Documentation de closing` : lister les documents à réunir (ordres de mouvement, déclarations, attestations, mainlevées).
`## Étape 4 — Formalités post-closing` : dépôt au greffe le cas échéant, inscription au registre de mouvements de titres et mise à jour des comptes d'associés, droits d'enregistrement (cession de titres — formalité et délai), information des tiers.
`## Étape 5 — Post-flight` : `verifier-citations`.

- [ ] **Step 5: Ajouter la section Sortie**

`## Sortie` : note du relecteur (5 champs gras) ; en-tête confidentialité ; la checklist structurée (CP / séquençage / documentation / post-closing) sous forme de tableaux avec statut et responsable ; question hors checklist ; arbre de décision 5 options ; footer A PII.

- [ ] **Step 6: Créer le dataset de test**

Créer `tests/datasets/v1.1/closing-scenario.md` : un scénario de cession de titres de SAS avec deux conditions suspensives (agrément du conseil, obtention d'un financement) et un volet post-closing. Documenter les éléments attendus dans la checklist.

- [ ] **Step 7: Test manuel de structure**

Vérifier : structure canonique ; les 4 volets (CP / séquençage / documentation / post-closing) sont présents ; le registre de mouvements de titres et les droits d'enregistrement figurent bien dans le post-closing.

- [ ] **Step 8: Commit (skill complet)**

```bash
git add plugins/hacienda-droit-affaires/skills/closing-checklist-fr/ plugins/hacienda-droit-affaires/tests/datasets/v1.1/closing-scenario.md
git commit -m "feat(droit-affaires): skill closing-checklist-fr"
```

---

## Tâche finale — Vérification globale

### Task 8: Vérification, CHANGELOG, handoff

**Files:**
- Modify (append): `plugins/hacienda-droit-affaires/CHANGELOG.md`
- Modify: `docs/handoff/latest.md`

- [ ] **Step 1: Vérifier le périmètre strictement additif**

Run:
```bash
git diff --stat v1.1-base HEAD -- plugins/hacienda-droit-affaires/
```
Expected : seuls des fichiers NEUFS apparaissent, plus `articles-c-civ-c-com-index.md`, `CLAUDE.md` et `CHANGELOG.md` en modification additive. **Aucun skill V1, aucun agent V1 ne doit apparaître.** Si un skill/agent V1 apparaît → identifier le commit fautif et corriger.

- [ ] **Step 2: Vérifier qu'aucun fichier packages/core n'a été touché par V1.1**

Run:
```bash
git diff --stat v1.1-base HEAD -- packages/core/
```
Expected : aucune sortie (V1.1 est additif côté plugin uniquement).

- [ ] **Step 3: Lancer la suite de tests core (non-régression)**

Run:
```bash
cd packages/core && npx vitest run
```
Expected : tous les tests passent (V1.1 n'a touché aucun code TS, donc 306 passed / 3 skipped attendus).

- [ ] **Step 4: typecheck + build + branding + whitespace**

Run:
```bash
npm run typecheck && npm run build && npm run branding:check && git diff --check
```
Expected : tout vert.

- [ ] **Step 5: Smoke install du plugin**

Run:
```bash
claude plugin marketplace add . && claude plugin install hacienda-droit-affaires@hacienda-juridique && claude plugin details hacienda-droit-affaires
```
Expected : installation réussie ; `claude plugin details` liste désormais 15 skills (9 V1 + 6 V1.1) + 3 agents + 1 MCP server.

- [ ] **Step 6: Mettre à jour le CHANGELOG**

Append à `plugins/hacienda-droit-affaires/CHANGELOG.md` une section V1.1 :
```markdown
## [0.1.0] - V1.1 (en cours)

### Added — Cluster vie sociale
- skill `pacte-associes-review` + reference `clauses-pacte-associes-fr.md`
- skill `constitution-societe` (--comparer/--draft) + reference `comparatif-formes-sociales-fr.md`
- skill `gouvernance-ag` (--convocation/--pv) + reference `calendrier-vie-sociale-fr.md`

### Added — Cluster M&A
- skill `loi-term-sheet` (--review/--draft)
- skill `due-diligence-dataroom` (7 thèmes) + reference `grille-due-diligence-fr.md`
- skill `closing-checklist-fr`

### Added — Références partagées
- `articles-c-civ-c-com-index.md` étendu (articles droit des sociétés L.223/225/227/228-x)
- `CLAUDE.md` §1 — sous-bloc vie sociale

### Notes
- Développé en parallèle des tests personas de V1 (mode strictement additif).
- Workspaces de dossier : hors V1.1 (chantier post-personas).
```

- [ ] **Step 7: Mettre à jour le handoff**

Mettre à jour `docs/handoff/latest.md` avec le template `docs/handoff/TEMPLATE-handoff.md` : dernière task V1.1 complétée, état des 6 skills, prochaine étape (validation personas du cluster vie sociale par l'ami en premier).

- [ ] **Step 8: Commit final**

```bash
git add plugins/hacienda-droit-affaires/CHANGELOG.md docs/handoff/latest.md
git commit -m "docs(droit-affaires): CHANGELOG V1.1 + handoff — 6 skills livrés"
```

---

## Post-V1.1

V1.1 livrée = 6 skills développés et testés en interne. Reste à faire (hors périmètre de ce plan) :
- **Validation personas** : cluster vie sociale par l'ami d'abord, cluster M&A par le frère ensuite.
- **Chantier workspaces de dossier** : activation des matter workspaces (modifie les skills V1 → à faire après les tests personas).
- **v1.2** : `cgv-generator`, `financement-startup`.
- **v2** : déprécation du squelette `hacienda-societes` une fois que `constitution-societe` + `gouvernance-ag` + `pacte-associes-review` le couvrent fonctionnellement.

---

*Fin du plan V1.1. Total : Tâche 0 + 2 tasks Étape 1 + 6 tasks skills + 1 task finale = 10 tasks. Estimé ~3 semaines à 1-2 personnes (utilisateur + Claude).*
