# Hacienda Propriété Intellectuelle — Alignement DA Implementation Plan (vagues A/B/C)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aligner `hacienda-propriete-intellectuelle` (v0.18.14) sur les patterns canoniques de `hacienda-droit-affaires` (v0.1.0, référentiel post PR #16-#23). Trois vagues séquentielles : A = sécurité juridique (PI v0.19.0), B = qualité contenu (v0.20.0), C = validation reproductible.

**Architecture:** Aucun nouveau code TypeScript dans `packages/core`. Vague A = portage du skill `check-pii` depuis DA + étapes pré-flight + extension d'échelle dans les SKILL.md. Vague B = portage de `verifier-citations` + refonte de 6 skills cœur métier au format DA `spa-review` + modes courts métier. Vague C = `tests/datasets/` peuplé + scoring sparring style K7M2PX sur 6 dossiers métier. Aucun nouvel agent. Aucune modification du serveur MCP PI (`mcp-server/`).

**Tech Stack:** Markdown + YAML frontmatter pour skills Hacienda, datasets Markdown, documentation README / CHANGELOG / CLAUDE.md. Mécanismes existants consommés côté DA et à porter : `check-pii`, `verifier-citations`. Mécanismes PI conservés : `recherche-anteriorite-marque`, `audit-pi-ma`, `cession-droit-auteur`, `revue-open-source`, `contentieux-pi`, `mise-en-demeure-pi`.

**Référentiel d'analyse:** `docs/backlog/pi-vs-da-gap-analysis.md`

---

## File Structure

### Fichiers NEUFS — Vague A

```
plugins/hacienda-propriete-intellectuelle/skills/check-pii/
└── SKILL.md

plugins/hacienda-propriete-intellectuelle/tests/
├── README.md
└── datasets/
    ├── pii-cas-a/dossier.md          # corpus sous seuil B → footer A
    └── pii-cas-b/dossier.md          # corpus avec catégorie sensible PI → prompt B
```

### Fichiers NEUFS — Vague B

```
plugins/hacienda-propriete-intellectuelle/skills/verifier-citations/
└── SKILL.md
```

### Fichiers NEUFS — Vague C

```
plugins/hacienda-propriete-intellectuelle/tests/datasets/
├── v2-marque/recherche-anteriorite-marque-scenario.md
├── v2-brevet/preparation-depot-brevet-scenario.md
├── v2-dm/depot-dessin-modele-scenario.md
├── v2-auteur/cession-droit-auteur-scenario.md
├── v2-oss/revue-open-source-scenario.md
└── v2-contentieux/contentieux-pi-scenario.md

docs/backlog/
├── pi-scoring-marque-<code>.md
├── pi-scoring-brevet-<code>.md
├── pi-scoring-dm-<code>.md
├── pi-scoring-auteur-<code>.md
├── pi-scoring-oss-<code>.md
├── pi-scoring-contentieux-<code>.md
└── pi-content-improvements-vague-c.md
```

### Fichiers MODIFIÉS — Vague A

```
plugins/hacienda-propriete-intellectuelle/CLAUDE.md                          # §1 bloc politique_pii
plugins/hacienda-propriete-intellectuelle/version.json                        # 0.18.14 → 0.19.0
plugins/hacienda-propriete-intellectuelle/manifest.json                       # idem
plugins/hacienda-propriete-intellectuelle/CHANGELOG.md                        # entrée 0.19.0
plugins/hacienda-propriete-intellectuelle/skills/audit-pi-ma/SKILL.md         # pré-flight check-pii
plugins/hacienda-propriete-intellectuelle/skills/contrats-pi/SKILL.md         # idem
plugins/hacienda-propriete-intellectuelle/skills/revue-clause-pi/SKILL.md     # idem
plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur/SKILL.md
plugins/hacienda-propriete-intellectuelle/skills/licence-droit-auteur/SKILL.md
plugins/hacienda-propriete-intellectuelle/skills/contrefacon-droit-auteur/SKILL.md
plugins/hacienda-propriete-intellectuelle/skills/contrefacon-dessin-modele/SKILL.md
plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md
plugins/hacienda-propriete-intellectuelle/skills/mise-en-demeure-pi/SKILL.md
plugins/hacienda-propriete-intellectuelle/skills/saisie-contrefacon/SKILL.md
plugins/hacienda-propriete-intellectuelle/skills/tableau-contrefacon-brevet/SKILL.md
# + 30 SKILL.md pour insertion section « Niveaux de criticité » (échelle 🔴🟠🟡🟢)
```

### Fichiers MODIFIÉS — Vague B

```
plugins/hacienda-propriete-intellectuelle/skills/audit-pi-ma/SKILL.md          # refonte format spa-review
plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md       # idem
plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur/SKILL.md # idem
plugins/hacienda-propriete-intellectuelle/skills/mise-en-demeure-pi/SKILL.md   # idem
plugins/hacienda-propriete-intellectuelle/skills/revue-open-source/SKILL.md    # idem
plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-marque/SKILL.md
# + 30 SKILL.md pour frontmatter (authors, tags)
plugins/hacienda-propriete-intellectuelle/version.json                          # → 0.20.0
plugins/hacienda-propriete-intellectuelle/manifest.json
plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
```

---

# Vague A — Sécurité juridique (PI v0.19.0)

## Task A.1 : Ajouter le bloc `politique_pii` dans CLAUDE.md §1

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/CLAUDE.md`

- [ ] **Step 1 : Insérer le bloc politique_pii à la fin du sous-bloc « Profil cabinet et profil de pratique PI »**

Calquer le format DA en adaptant les catégories sensibles. Catégories sensibles spécifiques PI : IBAN ayant droits, NIR créateur, montants cession > 10k€, mots-clés `secret affaires` / `savoir-faire` / `secret industriel`, numéros brevets non encore publiés (< 18 mois post-dépôt — Art. R.612-39 CPI), inventeurs non publiés, informations sous NDA en cours.

- [ ] **Step 2 : Test grep**

```bash
grep -c "politique_pii" plugins/hacienda-propriete-intellectuelle/CLAUDE.md
```

Expected: `≥ 1`.

## Task A.2 : Porter le skill `check-pii` depuis DA

**Files:**
- Create: `plugins/hacienda-propriete-intellectuelle/skills/check-pii/SKILL.md`
- Reference: `plugins/hacienda-droit-affaires/skills/check-pii/SKILL.md`

- [ ] **Step 1 : Copier le SKILL.md DA**

- [ ] **Step 2 : Adapter les références plugin**

Remplacer toutes les occurrences `hacienda-droit-affaires` / `h-droit-affaires:` par `hacienda-propriete-intellectuelle` / `h-pi:`.

- [ ] **Step 3 : Adapter les outils MCP cités**

Remplacer les références aux outils DA (`legifrance_*`, `pappers_*`, `bodacc_*`, `judilibre_*`) par les outils PI (`inpi_*`, `euipo_tmview_search`, `espacenet_*`, `bopi_dernieres_publications`) quand contextuellement pertinent. Conserver le détecteur PII embarqué (pas de dépendance MCP).

- [ ] **Step 4 : Adapter les exemples métier**

Remplacer les exemples DA (NDA / SPA / déclaration de créance) par des exemples PI (cession droit d'auteur / opposition INPI / mise en demeure contrefaçon / audit PI M&A).

- [ ] **Step 5 : Adapter les catégories sensibles**

Reprendre la liste validée en Task A.1.

- [ ] **Step 6 : Conserver le pattern lead magnet inversé `hacienda-ghost`**

Vérifier que les deux modes restent présents :
- footer cas A (discret, sous seuil B)
- prompt cas B (bloquant, ≥ seuil B ou catégorie sensible) avec CTA `marketplace://hacienda-ghost`

- [ ] **Step 7 : Test fonctionnel sur dossier `pii-cas-b`**

Lancer `/h-pi:check-pii tests/datasets/pii-cas-b/dossier.md`. Expected : prompt cas B affiché, 3 options avec CTA marketplace.

- [ ] **Step 8 : Test fonctionnel sur dossier `pii-cas-a`**

Lancer `/h-pi:check-pii tests/datasets/pii-cas-a/dossier.md`. Expected : footer cas A en fin de sortie, pas de prompt bloquant.

## Task A.3 : Créer les 2 dossiers de test PII

**Files:**
- Create: `plugins/hacienda-propriete-intellectuelle/tests/README.md`
- Create: `plugins/hacienda-propriete-intellectuelle/tests/datasets/pii-cas-a/dossier.md`
- Create: `plugins/hacienda-propriete-intellectuelle/tests/datasets/pii-cas-b/dossier.md`

- [ ] **Step 1 : Écrire `tests/README.md` rappelant la structure et le mode d'emploi**

- [ ] **Step 2 : Dossier `pii-cas-a` — sous seuil B**

Corpus fictif : ~30 noms de salariés mentionnés dans une politique interne open source. Pas d'IBAN, pas de NIR, pas de brevet non publié. Doit déclencher footer A discret.

- [ ] **Step 3 : Dossier `pii-cas-b` — déclenche prompt B**

Corpus fictif : projet de cession de portefeuille de brevets, avec IBAN cédant, NIR inventeur, mention « brevet FR-2026-XXXXX en cours de dépôt non publié », montant cession 250 000 €. Doit déclencher prompt B + CTA marketplace.

## Task A.4 : Ajouter le pré-flight `check-pii` aux 11 skills client-facing

**Files (à valider par lecture rapide au moment de l'implémentation pour confirmer le périmètre) :**
- Modify: `skills/audit-pi-ma/SKILL.md`
- Modify: `skills/contrats-pi/SKILL.md`
- Modify: `skills/revue-clause-pi/SKILL.md`
- Modify: `skills/cession-droit-auteur/SKILL.md`
- Modify: `skills/licence-droit-auteur/SKILL.md`
- Modify: `skills/contrefacon-droit-auteur/SKILL.md`
- Modify: `skills/contrefacon-dessin-modele/SKILL.md`
- Modify: `skills/contentieux-pi/SKILL.md`
- Modify: `skills/mise-en-demeure-pi/SKILL.md`
- Modify: `skills/saisie-contrefacon/SKILL.md`
- Modify: `skills/tableau-contrefacon-brevet/SKILL.md`

**Skills explicitement EXCLUS (pas de pièces client en entrée) :** `entretien-demarrage`, `bases-de-donnees`, `recherche-anteriorite-marque/brevet/dm`, `surveillance-marque`, `consulter-digest`, `clearance-marque` (stub), `qualification-oeuvre`, `strategie-defense-pi`, `strategie-extension-internationale`. À arbitrer : `tri-contrefacon` (inclure si pièces client en entrée).

- [ ] **Step 1 : Définir le snippet pré-flight canonique**

```markdown
## Pré-flight `check-pii`

Avant toute analyse substantielle sur des pièces client : invoquer
`/h-pi:check-pii` sur le corpus fourni. Si le résultat déclenche le
prompt cas B (seuil B atteint ou catégorie sensible PI détectée),
attendre la décision utilisateur (anonymiser via `hacienda-ghost`,
ignorer, ou stopper) avant de poursuivre.

Si l'utilisateur choisit « ignorer », apposer un caveat
`[PII non traitée — décision utilisateur]` dans la note du relecteur.
```

- [ ] **Step 2 : Insérer dans chacun des 11 SKILL.md entre `Intake` et `Gate non-juriste`**

Paralléliser via subagent Opus par domaine (marque/brevet/D&M/auteur/contentieux) si fatigue.

- [ ] **Step 3 : Vérifier l'insertion**

```bash
for f in plugins/hacienda-propriete-intellectuelle/skills/{audit-pi-ma,contrats-pi,revue-clause-pi,cession-droit-auteur,licence-droit-auteur,contrefacon-droit-auteur,contrefacon-dessin-modele,contentieux-pi,mise-en-demeure-pi,saisie-contrefacon,tableau-contrefacon-brevet}/SKILL.md; do
  grep -c "Pré-flight \`check-pii\`" "$f" | xargs -I{} echo "$f: {}"
done
```

Expected: tous à `1`.

## Task A.5 : Étendre l'échelle 🔴🟠🟡🟢 aux 30 SKILL.md non couverts

**Files:** ~30 SKILL.md identifiés dynamiquement.

- [ ] **Step 1 : Identifier la liste exhaustive**

```bash
for f in plugins/hacienda-propriete-intellectuelle/skills/*/SKILL.md; do
  if ! grep -q "🔴\|🟠\|🟡\|🟢\|echelle\|sévérité" "$f"; then echo "$f"; fi
done > /tmp/pi-skills-without-scale.txt
wc -l /tmp/pi-skills-without-scale.txt
```

Expected: ~30.

- [ ] **Step 2 : Définir le snippet canonique**

```markdown
## Niveaux de criticité

Échelle canonique appliquée à toute appréciation subjective de ce skill :

| Niveau | Icône | Signification dans le contexte de ce skill |
|---|---|---|
| Faible | 🟢 | [contextualiser selon domaine du skill] |
| Moyen | 🟡 | [...] |
| Élevé | 🟠 | [...] |
| Bloquant | 🔴 | [...] |

Plancher cross-skill (CLAUDE.md §4) : ce skill ne peut pas dégrader silencieusement une cote 🔴 amont vers 🟡 ou inférieur sans déclaration explicite.
```

- [ ] **Step 3 : Contextualiser par skill — paralléliser via subagent Opus par domaine**

Lancer 6 subagents Opus en parallèle (`superpowers:dispatching-parallel-agents`), un par domaine :
- marque (8 skills) ;
- brevet (6 skills, dont CCP) ;
- D&M (3 skills) ;
- droit d'auteur (6 skills) ;
- logiciel / OSS (3 skills) ;
- contentieux / enforcement (4 skills).

Chaque subagent reçoit la liste de ses SKILL.md, le snippet canonique, et la consigne de contextualiser les 4 lignes selon le domaine.

- [ ] **Step 4 : Vérifier**

```bash
for f in plugins/hacienda-propriete-intellectuelle/skills/*/SKILL.md; do
  grep -q "Niveaux de criticité\|🔴" "$f" || echo "STILL MISSING: $f"
done
```

Expected: liste vide (ou réduite aux skills justifiés sans échelle — à arbitrer cas par cas).

## Task A.6 : Bump version et CHANGELOG

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/version.json`
- Modify: `plugins/hacienda-propriete-intellectuelle/manifest.json`
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1 : Bumper `version.json` 0.18.14 → 0.19.0**

- [ ] **Step 2 : Bumper `manifest.json` idem**

- [ ] **Step 3 : Ajouter entrée CHANGELOG en tête**

```markdown
## 0.19.0 — 2026-XX-XX

### Sécurité juridique (vague A)
- **Nouveau skill `check-pii`** porté depuis hacienda-droit-affaires, calibré sur catégories sensibles PI (IBAN, NIR créateur, brevets pré-publication, secrets affaires) ;
- pattern lead magnet inversé `hacienda-ghost` (footer A discret + prompt B bloquant avec CTA marketplace) ;
- pré-flight `check-pii` ajouté aux 11 skills client-facing ;
- bloc `politique_pii` ajouté à CLAUDE.md §1 (passive / active / strict + seuil B 50 identifiants) ;
- échelle canonique 🔴🟠🟡🟢 explicitée dans le corps des 30 SKILL.md restants — plancher de sévérité cross-skill désormais opposable ;
- premiers dossiers de test `tests/datasets/pii-cas-a` et `pii-cas-b`.
```

## Task A.7 : Vérification finale vague A

- [ ] **Step 1 : Tests packages/core**

```bash
npm test
```

Expected: PASS.

- [ ] **Step 2 : Typecheck + build + branding**

```bash
npm run typecheck && npm run build && npm run branding:check && git diff --check
```

Expected: tout PASS.

- [ ] **Step 3 : Test manuel check-pii sur les deux dossiers**

```bash
/h-pi:check-pii plugins/hacienda-propriete-intellectuelle/tests/datasets/pii-cas-a/dossier.md
/h-pi:check-pii plugins/hacienda-propriete-intellectuelle/tests/datasets/pii-cas-b/dossier.md
```

Expected : footer A sur le premier, prompt B sur le second.

- [ ] **Step 4 : Mettre à jour GitNexus**

```bash
npx gitnexus analyze --embeddings  # si embeddings préexistants — vérifier .gitnexus/meta.json
```

### Risques vague A

| Risque | Mitigation |
|---|---|
| Dépendance MCP `pappers_*` ou `bodacc_*` dans le skill check-pii DA porté tel quel | Lire en amont DA SKILL.md, abstraire détecteur (regex pure, pas MCP). |
| Churn branches associé (`origin/claude/pi-*`) sur les 11 skills client-facing | Avant chaque édition : `git fetch && git log origin/claude/pi-* -- skills/<skill>/SKILL.md`. Si commit récent, demander. |
| Pré-flight check-pii inséré dans un skill sans entrée client (faux positif) | Arbitrer cas par cas. Liste d'exclusion documentée Task A.4. |
| Contextualisation échelle générique copier-coller (perte de valeur) | Paralléliser par subagent par domaine, valider par échantillonnage 3 skills. |

---

# Vague B — Qualité contenu (PI v0.20.0)

**Goal:** Passer du squelette canonique au format DA `spa-review` enrichi sur les 6 skills cœur métier + porter `verifier-citations`.

## Task B.1 : Porter `verifier-citations` depuis DA

- [ ] **Step 1 : Copier `plugins/hacienda-droit-affaires/skills/verifier-citations/SKILL.md` vers PI**
- [ ] **Step 2 : Adapter références plugin (h-droit-affaires → h-pi)**
- [ ] **Step 3 : Étendre vérifications aux numéros INPI / EUIPO / EUTM / OEB / EP**
- [ ] **Step 4 : Ajouter contrôle arrêts CJUE PI : Sabel C-251/95, Canon C-39/97, Lloyd C-342/97, Matratzen Concord T-6/01, L'Oréal Bellure C-487/07**
- [ ] **Step 5 : Référencer en post-flight depuis les 6 skills cœur (Task B.2)**

## Task B.2 : Refondre les 6 skills cœur au format DA `spa-review`

Cible : `audit-pi-ma`, `contentieux-pi`, `cession-droit-auteur`, `mise-en-demeure-pi`, `revue-open-source`, `recherche-anteriorite-marque`.

Pour chaque skill :
- [ ] **Step 1 : 3-4 `<example>` worked (un par mode / side / posture)**
- [ ] **Step 2 : Étapes numérotées exécutables (8-11 étapes) dans le bloc Sortie**
- [ ] **Step 3 : Section « Ton » explicite**
- [ ] **Step 4 : Section « Mode silencieux livrable externe » réécrite dans le skill**
- [ ] **Step 5 : Section « Ce skill ne fait pas » exhaustive**

**Effort** : ~3-4 h par skill × 6. Paralléliser via subagent Opus un par skill.

## Task B.3 : Introduire modes courts métier

| Skill | Modes courts |
|---|---|
| `audit-pi-ma` | `--red-flags`, `--chain-of-title`, `--ready-for-signing` |
| `revue-open-source` | `--copyleft-only`, `--obligations-only`, `--remediation-plan` |
| `contentieux-pi` | `--recevabilite-only`, `--budget-only`, `--strategie-only` |
| `cession-droit-auteur` | `--chain-of-title`, `--clause-only`, `--rémunération-only` |
| `mise-en-demeure-pi` | `--escalation-letter`, `--informal-first`, `--final-warning` |
| `recherche-anteriorite-marque` | `--knockout`, `--full`, `--watchlist` |

- [ ] **Step 1 : Définir comportement par mode dans chaque SKILL.md**
- [ ] **Step 2 : Mettre à jour `argument-hint` du frontmatter**

## Task B.4 : Compléter frontmatter de tous les SKILL.md PI

- [ ] **Step 1 : Identifier les manquants**

```bash
for f in plugins/hacienda-propriete-intellectuelle/skills/*/SKILL.md; do
  grep -q "^authors:" "$f" || echo "MISSING authors: $f"
  grep -q "^tags:" "$f" || echo "MISSING tags: $f"
done
```

- [ ] **Step 2 : Ajouter `authors: ["Hacienda"]` et `tags: [...]` contextualisés**

## Task B.5 : Bump version + CHANGELOG + vérif finale

- [ ] Bump 0.19.x → 0.20.0
- [ ] CHANGELOG entrée 0.20.0 (port verifier-citations, refonte 6 skills, modes courts, frontmatter)
- [ ] `npm test && npm run typecheck && npm run build && npm run branding:check`
- [ ] `npx gitnexus analyze --embeddings`

---

# Vague C — Validation reproductible

**Goal:** Matérialiser une suite de tests métier reproductible style sparring scoring K7M2PX/R4VN9W.

## Task C.1 : Créer 6 dossiers de test métier

| Domaine | Skill cible | Dossier test |
|---|---|---|
| Marques | `recherche-anteriorite-marque` | Lancement SaaS « HACIENDA » classes 9/35/42, FR + EU |
| Brevets | `preparation-depot-brevet` | Process chiffrement homomorphe, mandataire EQE, voie EP |
| D&M | `depot-dessin-modele` | Collection mode automne, ajournement, Locarno 02-01 |
| Droit d'auteur | `cession-droit-auteur` | Cession scénario audiovisuel commande, 70 ans, monde |
| Logiciel / OSS | `revue-open-source` | SBOM mélange MIT/Apache/GPL/AGPL — contamination |
| Contentieux | `contentieux-pi` | Contrefaçon brevet pharma, TJ Paris, nullité reconventionnelle |

- [ ] Créer les 6 fichiers `tests/datasets/v2-*/scenario.md`
- [ ] Documenter critères d'évaluation par dossier (vérité terrain attendue)

## Task C.2 : Sparring scoring style K7M2PX sur 6 dossiers

Pondération par dimension :
- Couverture du périmètre : 30 %
- Détection des nuances métier critiques : 30 %
- Qualité de l'arbitrage subjectif : 20 %
- Lisibilité partner-ready : 10 %
- Résistance aux pièges : 10 %

- [ ] **Step 1 : Lancer chaque skill en aveugle sur son dossier**
- [ ] **Step 2 : Scorer selon grille pondérée**
- [ ] **Step 3 : Écrire un rapport par scoring : `docs/backlog/pi-scoring-<domaine>-<code>.md`**

Paralléliser fortement via subagents.

## Task C.3 : Backlog consolidé d'améliorations métier

- [ ] Agréger findings des 6 scorings dans `docs/backlog/pi-content-improvements-vague-c.md`
- [ ] Prioriser 🔴 / 🟠 / 🟡 par skill
- [ ] Recommander une vague D si findings massifs

---

## Coordination cross-vagues

- **Branche par vague** : `feat/pi-v0.19-vague-a`, `feat/pi-v0.20-vague-b`, `chore/pi-validation-vague-c`. Ne pas mélanger.
- **Synchro avec branches associé** : avant chaque édition SKILL.md, `git fetch && git log origin/claude/pi-* -- skills/<skill>/SKILL.md`. Si modif récente, demander.
- **Tests AVANT push** : `npm test && npm run typecheck && npm run build && npm run branding:check && git diff --check`.
- **GitNexus** : `npx gitnexus analyze --embeddings` après commits skills (vérifier `.gitnexus/meta.json` pour embeddings préalables). Hook PostToolUse gère automatiquement.

## Recommandation de lancement

Lancer **vague A en priorité**, en une session Opus dédiée (~15-20 h équivalent humain, parallélisable Task A.5 via subagents). Sortie attendue : PR `feat(pi): v0.19.0 — vague A sécurité juridique` mergeable avant vague B.

Vagues B et C peuvent suivre en parallèle si bande passante, mais B (qualité contenu) prime sur C (validation) — la validation reproductible est plus utile *après* les enrichissements B, pas avant.
