# Handoff — Cycle distressed-M&A #2 : reprise-a-la-barre livré (2026-06-15)

> Contexte pour reprendre dans une nouvelle session. Repo :
> `jamon8888/hacienda-juridique`. Plugin : `plugins/hacienda-droit-affaires` (DA).
> Suite du handoff `docs/handoff/handoff-2026-06-11-chantier-a-pre-pack.md`.

## Ce qui a été fait cette session

**Objectif** : cycle distressed-M&A #2 (élargir le moat M&A ↔ restructuring), candidat
retenu au brainstorming = **reprise à la barre / plan de cession**, cadré pour
**éviter le chevauchement** avec `pre-pack-cession`.

**Résultat : skill `reprise-a-la-barre` livré, gate-clean RÉSERVES 0,95, DA bumpé en
v0.7.0. PR #54 ouverte vers `main`** (https://github.com/jamon8888/hacienda-juridique/pull/54).

### Le skill
- `plugins/hacienda-droit-affaires/skills/reprise-a-la-barre/SKILL.md` (moule V2 canonique).
- **Livrable** : note tactique **côté repreneur uniquement**, mode unique (pas de
  `--review` en v1).
- **Double gate** :
  - **Gate 1 — porte d'entrée** : ne joue que si la cible est **déjà en RJ/LJ avec
    appel d'offres ouvert** ; sinon (cession préparable confidentiellement) →
    **renvoi `pre-pack-cession`**. C'est lui qui porte la **frontière
    anti-chevauchement** avec pre-pack.
  - **Gate 2 — recevabilité** : (a) éligibilité L.642-3 (interposition / M. V) ;
    (b) offre ferme et écrite L.642-2 (une LOI indicative est irrecevable).
- Opère L.631-22 (cession en RJ dès la période d'observation), L.642-1/2/5/7/9/10/11/12,
  L.661-6.
- Design : `docs/superpowers/specs/2026-06-11-hacienda-da-reprise-a-la-barre-design.md`.
- Plan : `docs/superpowers/plans/2026-06-11-hacienda-da-reprise-a-la-barre.md`.

### Les 3 cycles de scoring blind (dataset `tests/datasets/da-reprise-a-la-barre/`)
| Cycle | Code | Score | Verdict | Action |
|---|---|---|---|---|
| 1 | RLB1OF | 0,0 | REJETÉ | gate **C-001** (régime) FAIL — skill ne citait pas L.631-22 ; + 6 MAJEUR maigres |
| 2 | RLB2EN | 0,0 | REJETÉ | C-001 + 6 MAJEUR fermés (majeur 0,875), mais nouveau gate **C-016** (sûretés L.642-12) FAIL |
| 3 | RLB3SU | 0,95 | RÉSERVES | **gate-clean (7 CRITIQUE / 7)** ; majeur 0,9375 |

- **Grille (ground-truth.md)** : 28 critères, **7 CRITIQUE / 18 MAJEUR / 3 MINEUR**.
- **Correctifs = ancrage de l'article tranchant** (pattern habituel) : C-001 → L.631-22 ;
  C-016 → sort complet L.642-12 (quote-part, droit de préférence, droit de suite jusqu'au
  paiement intégral, droit de rétention non affecté). + enrichissement des 6 MAJEUR du
  cycle 1 (offre L.642-2 II, NEWCO/substitution L.642-9, publicité au greffe, bail
  solidarité réputée non écrite, inaliénabilité L.642-10, recours restreints L.661-6).
- **Résiduel non-gating** : **C-019** (articulation CSE / L.1233-58, calendrier de
  l'avis) — polish optionnel v0.7.x.

## Reste à faire

1. **Merger PR #54** (bump v0.7.0). Une fois mergé → DA en v0.7.0.
2. **Polish v0.7.x non-gating** : C-019 (CSE / L.1233-58) si on veut remonter le
   MAJEUR-rate ; non bloquant.
3. **Prochain cycle distressed-M&A** (candidats restants du moat) :
   | Candidat | Périmètre | Articles |
   |---|---|---|
   | **Cession d'actifs isolés en LJ** ⭐ | rachat fonds/IP/stocks à un débiteur en liquidation, purge des sûretés | L.642-19 |
   | Asset vs share deal en distress | arbitrage de structuration quand la cible est en difficulté | L.632-1, responsabilité repreneur |
   → Cession d'actifs isolés (L.642-19) est le complément naturel : `reprise-a-la-barre`
   l'exclut explicitement (« hors plan de cession »), donc zéro chevauchement. Cadrer au
   brainstorming.

## Acquis méthodologiques (cette session)

- **Workflow scoring = `bash scripts/da-scoring.sh <phase> reprise-a-la-barre`**. Le
  **code défaut** d'un skill (fonction `code_for`) doit pointer le **cycle courant**
  (ici RLB3SU) pour que `phase4`/`aggregate` lisent le bon `verdicts-<CODE>.json` sans
  préfixe `CODE=`. Re-scorer un ancien cycle : `CODE=RLB1OF … aggregate`.
- **Piège vécu** : un `aggregate` sans le bon code (défaut figé sur l'ancien cycle) a
  ressorti le verdict du cycle précédent → fausse impression de « même résultat ». Fix :
  bumper le code défaut à chaque cycle.
- **Calibration des gates** : C-001 et C-016 étaient des gates « **piège + liste de
  recall** » (PASS exigeant l'énumération de sous-éléments que le trigger FAIL ne décrit
  pas). Le live était juste sur le fond mais ratait des éléments de recall → faux REJETÉ.
  **Le checkpoint gate Phase 2→3 (revue PASS = complément exact de FAIL) a été sauté** :
  le faire systématiquement pour le prochain skill. Ici on a corrigé en avançant
  (enrichissement du contenu), ce qui est légitime mais coûte des cycles.
- **Décision GATE-DRIVEN, pas chiffre** : `gate_failures: []` = feu vert. Un
  REJETÉ/RÉSERVES sans gate = enrichir les MAJEUR (pas un correctif de gate).
- **Économie tokens** : Candy lance les commandes scoring (Codex) ; Claude génère/analyse
  et fait les petits edits doctrinaux. Coller à Claude le **JSON `verdicts-<CODE>.json`**
  (verdicts par critère) plutôt que le bloc résumé `aggregate` évite les quiproquos de
  presse-papier.

## Pièges environnement (récurrents)

- **ENOSPC « 0MB free »** intermittent sur le FS temp du harness (capture stdout) :
  **rediriger la sortie vers un fichier hors `/tmp`** (ex. `~/x.log`) puis le lire avec
  l'outil Read. Les `grep -c` qui renvoient 0 coupent un compound sous `set -e` → `set +e`
  ou commandes séparées.
- **Heredoc imbriqué** dans un `gh pr create --body "$(cat <<EOF …)"` casse le parsing du
  wrapper : écrire le corps dans un fichier et utiliser `--body-file`.
- **PR : cibler `main` directement** ; vérifier que `main` n'a pas avancé avant push.
- Un `live-output.md` traîne à la **racine** du repo (untracked, pré-existant) — à
  nettoyer.

## Conventions skill V2 (rappel)

- Frontmatter : `version: "2.0.0"`, `argument-hint`. Headings dans l'ordre : Examples /
  Chargement du profil / Intake / Gate non-juriste / Outils MCP à privilégier /
  Emplacement des sorties / Sortie. Bloc MCP : `piste_status`, `legifrance_recherche`,
  `judilibre_recherche`, `eurlex_recherche` (+ bodacc pour les procédures).
- Chaque skill : wrapper `commands/h-da/<skill>.md` (description + argument-hint
  identiques au SKILL.md) + entrée README `/h-da:<skill>` + **count hardcodé** dans
  `hacienda-droit-affaires-cowork-structure.test.ts` (désormais `toBe(24)`).
- Version : bumper **les 5 fichiers** (version.json, manifest.json, mcp-server/package.json,
  .claude-plugin/plugin.json, .claude-plugin/marketplace.json — 6 occurrences, marketplace
  en a 2) + CHANGELOG.
