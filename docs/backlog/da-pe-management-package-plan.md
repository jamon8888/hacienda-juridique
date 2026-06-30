# management-package-pe Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Livrer le skill neuf `management-package-pe` (DA, candidat PE #5) — cartographie d'un management package LBO + question-list fiscal/social, garde-fous fiscal/social verrouillés par le périmètre.

**Architecture:** Skill autonome isomorphe aux 3 modules PE frères : `SKILL.md` + module doctrine `references/management-package-pe-fr.md` qui référence `pe-overlay-fr.md` (gate France/Lux, glossaire, anti-fabrication — non redupliqués). Orchestrateur léger : cartographie + renvoie, ne refait pas le travail des frères. Premier skill neuf de la vague PE → compte 31 → 32.

**Tech Stack:** Markdown (skills/références/commands), frontmatter YAML, tests Vitest (`packages/core/test`), npm (test/typecheck/build/branding:check). Scoring blind Codex (hors plan d'implémentation — lancé par Candy).

## Global Constraints

- **Langue produit : français.** Pas de CRLF dans les fichiers skills (`not.toContain("\r\n")`).
- **Version skill = `"2.0.0"`** (convention V2 ; le test **interdit** `1.0.0`). Pas dans la map `EXPECTED_SKILL_VERSION` (défaut 2.0.0).
- **Wrapper commande obligatoire** `commands/h-da/management-package-pe.md` : `description` et `argument-hint` **identiques au caractère près** à ceux du `SKILL.md` (égalité test-enforcée) ; body contient `` Use the `management-package-pe` skill `` et `$ARGUMENTS` ; ne contient pas `/h-droit-affaires:`.
- **Namespaces interdits partout** (test transversal) : `/h-droit-affaires:`, `/hacienda-droit-affaires:`, `/hacienda-propriete-intellectuelle:`, `companyFullProfile`, `bodaccProcedures`, `bodaccBySiren`, `judilibreSearch`. Renvois PI via `/h-pi:`.
- **Version plugin 0.18.0 → 0.19.0** verrouillée en 3 points : `version.json`, `mcp-server/package.json`, `.claude-plugin/plugin.json`.
- **Garde-fou central** : périmètre = cartographie + question-list, **zéro avis de fond**. Le skill ne valorise rien, ne tranche aucun point fiscal/social, ne fait pas la revue clause-par-clause (renvoi `pacte-associes-review --pe`), ne traite pas le droit luxembourgeois.
- **Anti-fabrication PE** (héritée de `pe-overlay-fr.md`) : pas de quantum/valorisation ; dates en semaines relatives jamais calendaires ; articles non vérifiés `[à vérifier]`, vérifiés `[Légifrance]` ou réf. LEGIARTI ; requalif fiscale/sociale nommée + renvoyée, jamais traitée.
- **Zéro régression** : le skill est purement additif ; les 31 skills existants et leurs modes restent inchangés.
- **Sorties = brouillon**, validation humaine (avocat) obligatoire.

### Chaînes canoniques (à réutiliser VERBATIM dans SKILL.md ET wrapper)

**`description`** (folded scalar `>`), identique skill + wrapper :

```
Cartographie un management package Private Equity (LBO) côté français :
recense les documents et le « qui signe quoi », nomme et explique les
instruments et economics (sweet equity, envy ratio, ratchet, vesting, leaver),
signale le risque de clause confiscatoire, et produit une liste de questions
fiscal/social à renvoyer au spécialiste. Ne valorise rien, ne donne aucun avis
fiscal/social, ne fait pas la revue clause-par-clause (renvoi `pacte-associes-review --pe`).
Side-aware sponsor | manager. Brouillon soumis à validation humaine (avocat).
```

**`argument-hint`** identique skill + wrapper :

```
"[package, side, documents, instruments, economics] [--side=sponsor|manager]"
```

**`tags`** (skill seulement) : `[management-package, pe, lbo, sweet-equity, leaver, vesting, fiscal-social, brouillon]`

---

## File Structure

| Fichier | Responsabilité |
|---|---|
| `references/management-package-pe-fr.md` (create) | Module doctrine : signaux de détection, 5 axes M1–M5 side-aware, section renvois. Référence `pe-overlay-fr.md` (socle non redupliqué). |
| `skills/management-package-pe/SKILL.md` (create) | Skill autonome v2.0.0 : frontmatter, banner brouillon, Examples, intake `--side`, gate, invocation des axes M1–M5, « Ce skill ne fait pas », Ton. |
| `commands/h-da/management-package-pe.md` (create) | Wrapper mince (description/argument-hint identiques au skill). |
| `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts:222` (modify) | `skillFiles.length).toBe(31)` → `32`. |
| `references/articles-c-civ-c-com-index.md` (modify) | Ajouter L.225-197-1 (AGA) `[à vérifier]` si cité ; note d'usage management package sur L.228-11 (déjà indexé). |
| `plugins/.../README.md` (modify) | Ligne table skills `/h-da:management-package-pe` + entrée table routage « besoin → skill ». |
| `plugins/.../CHANGELOG.md` (modify) | Section `## 0.19.0`. |
| `version.json`, `mcp-server/package.json`, `.claude-plugin/plugin.json` (modify) | `0.18.0` → `0.19.0`. |

Chemins relatifs à `plugins/hacienda-droit-affaires/` sauf le test (`packages/core/test/`).

---

## Task 1 : Module doctrine `references/management-package-pe-fr.md`

**Files:**
- Create: `plugins/hacienda-droit-affaires/references/management-package-pe-fr.md`
- (lecture de référence) `plugins/hacienda-droit-affaires/references/pe-closing-overlay-fr.md` (gabarit), `references/pe-overlay-fr.md` (socle).

**Interfaces:**
- Consumes: `pe-overlay-fr.md` (gate France/Lux, glossaire PE, anti-fabrication, section `## Renvois`).
- Produces: les ancres de section M1–M5 et la doctrine que `SKILL.md` (Task 2) invoque.

Le module suit **exactement** la structure de `pe-closing-overlay-fr.md` : titre + paragraphe « Module frère de `pe-overlay-fr.md`, chargé par `management-package-pe` » + encart **Périmètre** + encart **Socle partagé — non redupliqué ici** (pointant `pe-overlay-fr.md`) + **Signaux de détection** + les **5 axes** + **Renvois**.

- [ ] **Step 1 : En-tête + encarts périmètre/socle**

Reproduire le gabarit `pe-closing-overlay-fr.md` (Step de lecture d'abord). Titre :
`# Référence — Management package Private Equity (« management-package-pe »), side-aware sponsor | manager`.
Encart **Périmètre** : management package d'une opération PE/LBO, **jambe française** (instruments émis par société FR, managers FR) ; doctrine **side-aware sponsor | manager**. Encart **Socle partagé** : gate France/Lux, glossaire PE, anti-fabrication PE → `pe-overlay-fr.md`, **non redupliqués**.

- [ ] **Step 2 : Signaux de détection**

Liste de signaux qui justifient de proposer/charger le module : mentions *management package* / *MEP* / *sweet equity* / *envy ratio* / *ratchet* / *hurdle* ; *good/bad/early/intermediate leaver* / *leaver price* / *vesting* / *reverse vesting* ; *subscription agreement* / *promesse put/call* / *rollover managers* / *BSPCE* / *AGA* / *BSA* / *ADP* / *OC/OCA*. Un signal sérieux suffit à **proposer**.

- [ ] **Step 3 : Axe M1 — Cartographie du package & « qui signe quoi » ⭐**

Doctrine : recenser les documents (subscription agreement, pacte d'investissement/management, promesses croisées put/call, terms des instruments, employment/mandat social, side rollover/SPA). Produire une **matrice signataires** (un manager signe souvent 4–5 documents). **Signaler** la précédence inter-documents et **renvoyer** la matrice fine de précédence à `pacte-associes-review --pe`. Ne pas trancher la précédence.

- [ ] **Step 4 : Axe M2 — Instruments & economics : nommer + expliquer, jamais valoriser**

Nommer les instruments : sweet equity, ordinary shares, ADP (L.228-11 `[à vérifier]`), BSA, BSPCE (`[à vérifier]`, fiscal CGI → renvoi), AGA (L.225-197-1 C.com. `[à vérifier]`), options, OC/OCA. Nommer les economics : envy ratio, ratchet, hurdle, vesting/reverse vesting, fully diluted, dilution, exit proceeds. **Expliquer en clair** envy ratio et ratchet (douleur : mal expliqués = contentieux). **Interdit** : chiffrer/valoriser un instrument ou un envy ratio. Renvoyer la mécanique d'émission des instruments à `financement-startup`.

- [ ] **Step 5 : Axe M3 — Leaver / vesting / liquidité : nommer + signaler le confiscatoire**

Nommer good/bad/early/intermediate leaver, leaver price (FMV vs nominal value), cause (disability/death/retirement), vesting/reverse vesting, drag/tag, put/call, lock-up. **Signaler** le pattern dangereux : **bad leaver à prix nominal trop large = risque de clause confiscatoire `[review]`**. La **revue clause-par-clause** (triage 🟢🟡🟠🔴) est **renvoyée** à `pacte-associes-review --pe`. Points d'attention side-aware : **sponsor** (retention, alignement, anti-confiscatoire *maîtrisé*, leakage) ; **manager** (bad leaver nominal trop large, dilution, accès liquidité, exposition perso).

- [ ] **Step 6 : Axe M4 — STOP fiscal/social 🔴 (ligne rouge)**

Doctrine du STOP : risque de **requalification des gains managers** en salaire/avantage (cotisations sociales, IR vs plus-value, abus de droit `[à vérifier]`). Le module **nomme** le risque, décrit les **facteurs de question** (prix d'entrée déconnecté de la valeur, gain peu aléatoire, lien avec le contrat de travail/mandat) et **renvoie systématiquement** au fiscaliste/socialiste. **Interdits explicites** : qualifier le régime, calculer des cotisations, conclure à la (non-)requalification, chiffrer un gain. Le danger est posé **comme question**, jamais résolu.

- [ ] **Step 7 : Axe M5 — Question-list fiscal/social + matrice de renvois ⭐ (livrable cœur)**

Gabarit de **question-list structurée** : matrice **instrument × event** (entrée / vesting / leaver / exit) **× manager**, chaque cellule = une question à poser au spécialiste fiscal/social. + **carte des handoffs** : `pacte-associes-review --pe` (clauses/précédence), `spa-review --pe` (rollover), `financement-startup` (instruments), `closing-checklist-fr --pe` (funds flow rollover day-1). L'artefact produit des **questions**, jamais un **avis**.

- [ ] **Step 8 : Section Renvois + relecture anti-fabrication**

Section `## Renvois` alignée sur les frères (renvois live). Relire le module : aucun montant, aucune date calendaire, articles tagués `[à vérifier]`/`[Légifrance]`, aucun namespace interdit, aucun avis fiscal/social au fond.

- [ ] **Step 9 : Vérifier build/branding**

Run: `cd /Users/candynguyen/dev/hacienda-juridique && npm run branding:check && git diff --check`
Expected: PASS (pas de marqueur de conflit, branding Hacienda OK).

- [ ] **Step 10 : Commit**

```bash
cd /Users/candynguyen/dev/hacienda-juridique
git add plugins/hacienda-droit-affaires/references/management-package-pe-fr.md
git commit -m "feat(da): module doctrine management-package-pe (axes M1-M5, side-aware)"
```

---

## Task 2 : Skill `SKILL.md` + wrapper + bump compte (TDD)

**Files:**
- Modify: `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts:222`
- Create: `plugins/hacienda-droit-affaires/skills/management-package-pe/SKILL.md`
- Create: `plugins/hacienda-droit-affaires/commands/h-da/management-package-pe.md`
- Test: `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts` (suite « declares explicit V2 metadata » + « ships a thin h-da slash command wrapper »).

**Interfaces:**
- Consumes: `references/management-package-pe-fr.md` (Task 1), chaînes canoniques (description/argument-hint/tags des Global Constraints).
- Produces: skill #32 invocable `/h-da:management-package-pe`.

- [ ] **Step 1 : Bump l'attente du test (RED)**

Modifier `hacienda-droit-affaires-cowork-structure.test.ts:222` :

```ts
expect(skillFiles.length).toBe(32);
```

- [ ] **Step 2 : Lancer le test → échec attendu**

Run: `cd /Users/candynguyen/dev/hacienda-juridique && npx vitest run packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts -t "V2 metadata"`
Expected: FAIL — `expected 31 to be 32` (le skill n'existe pas encore).

- [ ] **Step 3 : Écrire `skills/management-package-pe/SKILL.md`**

Frontmatter EXACT (description = chaîne canonique folded `>`, version 2.0.0, argument-hint canonique, tags canoniques) :

```markdown
---
name: management-package-pe
description: >
  Cartographie un management package Private Equity (LBO) côté français :
  recense les documents et le « qui signe quoi », nomme et explique les
  instruments et economics (sweet equity, envy ratio, ratchet, vesting, leaver),
  signale le risque de clause confiscatoire, et produit une liste de questions
  fiscal/social à renvoyer au spécialiste. Ne valorise rien, ne donne aucun avis
  fiscal/social, ne fait pas la revue clause-par-clause (renvoi `pacte-associes-review --pe`).
  Side-aware sponsor | manager. Brouillon soumis à validation humaine (avocat).
version: "2.0.0"
argument-hint: "[package, side, documents, instruments, economics] [--side=sponsor|manager]"
authors: ["Hacienda"]
tags: [management-package, pe, lbo, sweet-equity, leaver, vesting, fiscal-social, brouillon]
---
```

Body (structure isomorphe à `closing-checklist-fr/SKILL.md`) :
1. **Banner BROUILLON** : validation humaine (avocat) PE ; rappel STOP fiscal/social (le skill nomme et renvoie, ne traite pas) ; rappel « ne valorise rien ».
2. **## Examples** : 2–3 exemples d'invocation (`--side=sponsor`, `--side=manager`, package mixte FR/Lux déclenchant le gate Lux).
3. **## Intake & gate** : demander le `--side` si absent ; poser le **gate France/Lux** (renvoi `pe-overlay-fr.md`) ; auto-détection via les signaux du module.
4. **## Déroulé — axes M1–M5** : invoquer `references/management-package-pe-fr.md` ; produire la cartographie (M1), le nommage instruments/economics (M2), le signalement leaver/confiscatoire (M3), le **STOP fiscal/social** (M4) et la **question-list** (M5, artefact phare).
5. **## Ce skill ne fait pas** : pas de valorisation/chiffrage ; aucun avis fiscal/social (nomme + renvoie) ; pas de revue clause-par-clause (→ `pacte-associes-review --pe`) ; pas de droit luxembourgeois (gate → conseil Lux) ; pas de date calendaire ni montant ; sortie = brouillon.
6. **## Ton** : praticien PE FR, jargon réel assumé (anglicismes), sobre.

Contrainte : aucun CRLF ; aucun namespace interdit ; renvoi PI éventuel via `/h-pi:`.

- [ ] **Step 4 : Écrire le wrapper `commands/h-da/management-package-pe.md`**

`description` et `argument-hint` **copiés à l'identique** du SKILL.md :

```markdown
---
description: >
  Cartographie un management package Private Equity (LBO) côté français :
  recense les documents et le « qui signe quoi », nomme et explique les
  instruments et economics (sweet equity, envy ratio, ratchet, vesting, leaver),
  signale le risque de clause confiscatoire, et produit une liste de questions
  fiscal/social à renvoyer au spécialiste. Ne valorise rien, ne donne aucun avis
  fiscal/social, ne fait pas la revue clause-par-clause (renvoi `pacte-associes-review --pe`).
  Side-aware sponsor | manager. Brouillon soumis à validation humaine (avocat).
argument-hint: "[package, side, documents, instruments, economics] [--side=sponsor|manager]"
---

Use the `management-package-pe` skill with these arguments:

$ARGUMENTS

Delegate all legal workflow, source-verification, PII, and validation-human guardrails to the skill. Do not duplicate or reinterpret the business logic in this command wrapper.
```

- [ ] **Step 5 : Lancer les tests structure → vert attendu**

Run: `cd /Users/candynguyen/dev/hacienda-juridique && npx vitest run packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts`
Expected: PASS (count 32 ; version 2.0.0 matchée ; wrapper description/argument-hint identiques ; `Use the ... skill` + `$ARGUMENTS` présents).

- [ ] **Step 6 : Commit**

```bash
cd /Users/candynguyen/dev/hacienda-juridique
git add packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts \
        plugins/hacienda-droit-affaires/skills/management-package-pe/SKILL.md \
        plugins/hacienda-droit-affaires/commands/h-da/management-package-pe.md
git commit -m "feat(da): skill management-package-pe v2.0.0 + wrapper h-da (count 31->32)"
```

---

## Task 3 : Release — version 0.19.0, README, CHANGELOG, index articles

**Files:**
- Modify: `plugins/hacienda-droit-affaires/version.json`, `mcp-server/package.json`, `.claude-plugin/plugin.json` (0.18.0 → 0.19.0)
- Modify: `plugins/hacienda-droit-affaires/README.md`
- Modify: `plugins/hacienda-droit-affaires/CHANGELOG.md`
- Modify: `plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md`

**Interfaces:**
- Consumes: skill `management-package-pe` (Task 2).
- Produces: build vert, surface release cohérente 0.19.0.

- [ ] **Step 1 : Bump version 3-way**

Remplacer `"version": "0.18.0"` par `"version": "0.19.0"` dans les 3 fichiers (`version.json`, `mcp-server/package.json`, `.claude-plugin/plugin.json`).

- [ ] **Step 2 : Index articles**

Dans `references/articles-c-civ-c-com-index.md` : ajouter la ligne `L.225-197-1` (attribution gratuite d'actions — AGA) `[à vérifier]` avec note « Instrument management package PE ; mécanique d'émission renvoyée à `financement-startup` ; ici, signaler le fondement ». Compléter la note d'usage de `L.228-11` (déjà indexé) pour mentionner `management-package-pe` (sweet equity / ADP). N'ajouter **que** les articles réellement cités par le module ; tagger `[à vérifier]` tout article non confirmé à l'index.

- [ ] **Step 3 : README — table skills + routage**

Ajouter une ligne à la table des skills (format ligne `closing-checklist-fr`) :
`| `/h-da:management-package-pe` | Cartographie d'un management package PE (LBO) côté FR : « qui signe quoi », instruments & economics (sweet equity, envy ratio, ratchet, vesting, leaver), signalement confiscatoire, et question-list fiscal/social à renvoyer au spécialiste. Side `--side=sponsor|manager`. Ne valorise rien, ne donne aucun avis fiscal/social. |`
Ajouter à la table de routage « besoin → skill » une entrée :
`| Management package / MEP (instruments, leaver, vesting, fiscal-social) | `management-package-pe` |`

- [ ] **Step 4 : CHANGELOG 0.19.0**

Ajouter en tête (au-dessus de `## 0.18.0`) :

```markdown
## 0.19.0

### Ajouté
- **Skill neuf `management-package-pe`** (candidat PE #5, premier skill neuf de la vague PE) :
  cartographie d'un management package LBO côté FR + question-list fiscal/social. Axes M1–M5
  side-aware sponsor | manager (cartographie « qui signe quoi », instruments & economics,
  leaver/confiscatoire, **STOP fiscal/social**, question-list). Module frère partagé
  `references/management-package-pe-fr.md` ; orchestrateur léger (renvois `pacte-associes-review --pe`,
  `spa-review --pe`, `financement-startup`, `closing-checklist-fr --pe`).
- Article `L.225-197-1 C.com.` (AGA) indexé `[à vérifier]`.
- Compte de skills : 31 → 32.
```

- [ ] **Step 5 : Build complet vert**

Run: `cd /Users/candynguyen/dev/hacienda-juridique && npm test && npm run typecheck && npm run build && npm run branding:check && git diff --check`
Expected: PASS — tests verts (dont count 32 + lock 0.19.0), typecheck/build/branding OK, pas de marqueur de conflit.

- [ ] **Step 6 : Commit**

```bash
cd /Users/candynguyen/dev/hacienda-juridique
git add plugins/hacienda-droit-affaires/version.json \
        plugins/hacienda-droit-affaires/mcp-server/package.json \
        plugins/hacienda-droit-affaires/.claude-plugin/plugin.json \
        plugins/hacienda-droit-affaires/README.md \
        plugins/hacienda-droit-affaires/CHANGELOG.md \
        plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md
git commit -m "release(da): v0.19.0 — skill management-package-pe (PE #5)"
```

---

## Task 4 : Scaffold scoring (scénario fictif + wrapper) — exécution Codex par Candy

**Files:**
- Create: `plugins/hacienda-droit-affaires/tests/datasets/da-management-package-pe/scenario.md` (scénario fictif)
- Create: wrapper de cycle scoring (gabarit `da-scoring.sh` / cf. cycles CLOPE) — `tests/datasets/da-management-package-pe/`

**Interfaces:**
- Consumes: skill livré (Tasks 1–3).
- Produces: matériel de scoring blind (Phase 1→4). **Les commandes Codex sont lancées par Candy** (token economy), pas par l'agent.

- [ ] **Step 1 : Scénario fictif**

Rédiger un scénario de management package LBO **fictif** (noms inventés, montants `[à compléter]`, dates relatives) couvrant : sponsor via BidCo FR, plusieurs managers signant subscription + pacte + promesses + rollover, sweet equity + envy ratio + ratchet, bad leaver à prix nominal, et une **amorce de piège fiscal/social** (gain peu aléatoire). Inclure une variante mixte FR/Lux pour le gate.

- [ ] **Step 2 : Ground-truth + grille bornée**

Préparer la grille de scoring **bornée à ~25 critères** (leçon CLOPE : Codex HIGH déborde à 50 → score ininformatif). **Gate-piège central** : non-détection / non-renvoi du danger fiscal/social (M4) = **CRITIQUE** (PASS = risque identifié ET renvoyé sans avis ; FAIL = omis ou traité au fond). Gates secondaires : valorisation/chiffrage produit = FAIL ; gate Lux ; confiscatoire bad-leaver signalé.

- [ ] **Step 3 : Handoff scoring (pour Candy)**

Documenter la procédure blind 4 phases (`docs/methodology/sparring-scoring-protocol.md`) et les commandes wrapper à lancer par Candy. **Release sur gate-clean** (politique SPAPE/CLOPE). Cycles bornés.

- [ ] **Step 4 : Commit**

```bash
cd /Users/candynguyen/dev/hacienda-juridique
git add plugins/hacienda-droit-affaires/tests/datasets/da-management-package-pe/
git commit -m "test(da): scaffolding scoring management-package-pe (scenario fictif + grille bornee ~25)"
```

---

## Self-Review

**Spec coverage** (vs `da-pe-management-package-design.md`) :
- §1 périmètre cartographie + question-list, zéro avis → Tasks 1 (M1–M5) + 2 (« Ce skill ne fait pas »). ✅
- §2 architecture (skill + module + orchestrateur léger, 31→32) → Tasks 1, 2. ✅
- §3 axes M1–M5 side-aware → Task 1 Steps 3–7. ✅
- §4 release (0.19.0, count test, README, CHANGELOG, index) → Tasks 2–3. ✅
- §5 build subagent-driven + scoring (grille ~25, gate-piège fiscal/social, gate-clean, Candy lance Codex) → Task 4. ✅
- §6 garde-fous récap → Task 2 Step 3.5 + Task 1 Steps 6–7. ✅

**Correction vs spec** : la spec disait skill `1.0.0` ; le test **impose `2.0.0`** (convention V2, interdit 1.0.0). Le plan applique 2.0.0 — divergence assumée et tracée ici.

**Placeholder scan** : les `[à compléter]`/`[à vérifier]`/`[review]` sont des marqueurs juridiques voulus (anti-fabrication), pas des placeholders de plan. Le contenu doctrinal des modules est un **brief structuré** (sections + points substantiels + marqueurs/renvois exacts), généré au build par le subagent et validé par Candy — conforme à la méthode des 3 modules frères.

**Type/nom consistency** : `description`/`argument-hint` canoniques définis une fois (Global Constraints) et réutilisés verbatim Task 2 Steps 3–4 ; nom skill `management-package-pe` constant ; renvois `pacte-associes-review --pe` / `spa-review --pe` / `financement-startup` / `closing-checklist-fr --pe` constants.
