# Handoff — Chantier A distressed-M&A : pre-pack-cession livré (2026-06-11)

> Contexte pour reprendre dans une nouvelle session. Repo :
> `jamon8888/hacienda-juridique`. Plugin : `plugins/hacienda-droit-affaires` (DA).
> Suite du handoff `docs/handoff/handoff-2026-06-09-scoring-personas.md`.

## Ce qui a été fait cette session

**Objectif** : Chantier A = spike distressed-M&A à l'intersection M&A ↔ restructuring.
Candidat retenu (brainstorming) : **pre-pack cession** — le pont exact
`prevention-difficultes` (persona ami) → `spa-review` (persona frère).

**Résultat : skill `pre-pack-cession` livré, gate-clean RÉSERVES 0,89, DA en v0.6.0
mergé sur `main` (PR #52).** Wrapper de scoring généralisé en `scripts/da-scoring.sh`.

### Le skill (mergé)
- `plugins/hacienda-droit-affaires/skills/pre-pack-cession/SKILL.md` (moule V2 canonique).
- **Livrable** : note de cadrage **side-aware** (débiteur / repreneur), mode unique
  (pas de `--review` en v1 — reporté v1.1).
- **Double gate** (le cœur scoré) :
  - **Gate 1 — cessation des paiements (±45 j)** : le plan de cession ne s'adopte
    qu'en **RJ ou LJ** (L.631-22 / L.642-1) ; la **sauvegarde accélérée (L.628-1)
    n'est PAS un véhicule de cession** (plan de *continuation*).
  - **Gate 2 — faisabilité pre-pack** (4 kill-switches) : confidentialité L.611-15,
    repreneur crédible, prospection L.611-7, période suspecte L.632-1.
- **Point pivot** : mandat ad hoc / conciliation *préparent* la cession ; seul le
  **plan de cession arrêté par le tribunal (L.642-2)** purge le passif.
- Wrapper `/h-da:pre-pack-cession` + entrée README (23 skills, count bumpé dans le test).
- Design : `docs/superpowers/specs/2026-06-11-hacienda-da-pre-pack-cession-design.md`.
- Plan : `docs/superpowers/plans/2026-06-11-hacienda-da-pre-pack-cession.md`.

### Les 3 cycles de scoring blind (dataset `tests/datasets/da-pre-pack-cession/`)
| Cycle | Code | Score | Verdict | Action |
|---|---|---|---|---|
| 1 | PPK1CE | 0,57 | INSUFFISANT | 0 gate, mais 7 MAJEUR manqués (aval L.642 trop maigre) |
| 2 | PPK2EN | 0,89 | RÉSERVES | après **enrichissement** (9 findings : offre L.642-2, choix tribunal L.642-5, périmètre L.642-1, RJ administrateur L.631-21-1/22, éligibilité L.642-3, trésorerie) |
| 3 | PPK3VE | 0,89 | RÉSERVES | après **fix C-005** (véhicule cession = RJ/LJ, pas sauvegarde accélérée) |

- **Grille (ground-truth.md)** : 26 critères, **4 CRITIQUE / 19 MAJEUR / 3 MINEUR**.
- **0 gate CRITIQUE FAIL sur les 2 runs indépendants PPK2EN + PPK3VE** → robuste.
- **Résiduel non-gating ROTATIF** : C-012 (CSE) / C-021 (éligibilité L.642-3) selon
  le run — effet de **saillance** du live, pas un trou de contenu. Polish optionnel v0.6.x.

### Le wrapper de scoring (généralisé cette session)
- **`scripts/da-scoring.sh`** remplace `da-chantier-b-scoring.sh` (supprimé).
- Table de skills **extensible** (bloc « POUR AJOUTER UN SKILL » en tête) ; couvre
  les 6 skills de fond + **pre-pack-cession**.
- Sous-commandes : `list`, `init`, `phase1`, `phase2`, `phase3-resync`,
  `phase3-prompt`, `phase4`, `aggregate`. Chaque phase génère le prompt dans `/tmp`
  et le **copie via `pbcopy`**.
- Overrides env : **`CODE=<6chars>`** (code de cycle, pour re-scorer un skill sur
  plusieurs cycles), `DATE` (défaut = jour), `CACHE_SKILLS`.
- Sur une branche `chore/da-scoring-wrapper` → PR à merger (avec ce handoff).

## Reste à faire — Chantier A

1. **Merger `chore/da-scoring-wrapper`** (wrapper généralisé + ce handoff).
2. **Prochain cycle distressed-M&A** (élargir le moat) — candidats restants :
   | Candidat | Périmètre | Articles |
   |---|---|---|
   | **Reprise à la barre / plan de cession** ⭐ | offre de reprise d'une entreprise en RJ/LJ : périmètre, prix, emplois, contrats, sûretés, calendrier tribunal | L.642-1 s., L.642-5 |
   | Cession d'actifs isolés en LJ | rachat fonds/IP/stocks, purge des sûretés | L.642-19 |
   | Asset vs share deal en distress | arbitrage structuration cible en difficulté | L.632-1, responsabilité repreneur |
   → Reprise à la barre est le complément naturel, MAIS le pre-pack en couvre déjà
   l'aval (offre L.642-2, choix L.642-5, périmètre L.642-1) : **cadrer le périmètre
   au brainstorming pour éviter le chevauchement** (angle = la procédure d'enchères
   judiciaires / le calendrier tribunal / la concurrence des offres, pas le montage).
3. **Polish v0.6.x non-gating** : C-012 (CSE) / C-021 (éligibilité L.642-3) si on
   veut remonter le MINEUR-rate ; non bloquant.

## Méthodologie (acquis, à réutiliser)

- **Workflow scoring = `bash scripts/da-scoring.sh <phase> <skill>`** (pbcopy auto).
  Pour un NOUVEAU skill : l'ajouter d'abord aux 5 fonctions + array du wrapper.
  Pour re-scorer : `CODE=XXXXXX bash scripts/da-scoring.sh phase4 <skill>`.
- **Protocole blind 4 phases** : Phase 2 (grille Codex HIGH, sans SKILL.md) → Phase 3
  (Claude FRAÎCHE, sans ground-truth, `phase3-resync` avant) → Phase 4 (Codex medium)
  → `aggregate`.
- **Décision GATE-DRIVEN, pas chiffre** : `gate_failures: []` = feu vert ; un
  INSUFFISANT/RÉSERVES sans gate = enrichir les MAJEUR (pas un correctif de gate).
- **Pattern de correctif** : si un MAJEUR/CRITIQUE tombe sur le fond, ajouter
  l'ancrage de l'article tranchant.
- **Économie** : **Codex abondant (crédits Candy), Opus rare** → petits edits
  doctrinaux + reconfirm Codex. Candy lance les commandes scoring ; Claude génère/analyse.
- **Rôle Candy** : pas avocate (a étudié le droit), conçoit pour test par personas →
  déléguer la substance doctrinale, elle valide direction/UX/scope.

## Pièges environnement (récurrents)

- **ENOSPC « 0MB free » intermittent** sur le FS temp du harness (capture stdout)
  alors que `df` montre de la place — disque proche du plein (93 % → 88 %).
  Contournement : **rediriger la sortie vers un fichier puis le lire** (outil Read).
  Brief Codex en cours pour fix durable (`CLAUDE_CODE_TMPDIR` / libérer du disque).
- **Shell en `set -e`** : un `grep` qui ne matche rien (exit 1) coupe un compound →
  commandes séparées, `|| true`, ou redirection vers fichier.
- **Sortie Codex aplatie** (Phase 2/4) : JSON collé sans retours à la ligne →
  `python3 -m json.tool fichier.json`. Le ground-truth doit être **uniquement** le
  bloc JSON de critères (`{skill, criteria:[{id,niveau,axe,match_criteria}]}`).
- **PR : cibler `main` directement** ; vérifier que `main` n'a pas avancé (PR #51
  Chantier B avait causé un conflit cette session, résolu).

## Conventions skill V2 (test `cowork-structure`)

- Frontmatter : `version: "2.0.0"`, `argument-hint:`. Headings requis dans l'ordre :
  Examples / Chargement du profil / Intake / Gate non-juriste / Outils MCP à
  privilégier / Emplacement des sorties / Sortie.
- Bloc MCP doit contenir `piste_status`, `legifrance_recherche`, `judilibre_recherche`,
  `eurlex_recherche`. Renvois PI au namespace `/h-pi:`. Jamais `/hacienda-droit-affaires:`.
- Chaque skill exige un wrapper `commands/h-da/<skill>.md` (description + argument-hint
  identiques au SKILL.md) + une entrée README `/h-da:<skill>` + le **count hardcodé**
  dans le test (`toBe(N)`) à bumper.
- Version : bumper **les 5 fichiers** (version.json, manifest.json, mcp-server/package.json,
  .claude-plugin/plugin.json, .claude-plugin/marketplace.json) — pas auto-propagé.
