# Handoff — état courant (entrée de session)

**Dernière mise à jour :** 2026-06-30
**Branche de travail :** `main` (à jour, #66 + #67 mergés).

> Ce fichier est le **point d'entrée** d'une nouvelle session : où on en est, ce qui est ouvert,
> où regarder. Les handoffs datés (`docs/handoff/handoff-YYYY-MM-DD-*.md`) restent les
> enregistrements détaillés par chantier.

---

## Où on en est

### Vague PE — Droit des affaires
La chaîne du deal PE est **livrée** (côté sponsor, jambe FR) : pacte → SPA/GAP → closing →
**management package**.
- 4 overlays `--pe` (modes side-aware) : `pacte-associes-review`, `spa-review`, `gap-review`,
  `closing-checklist-fr`.
- **Skill neuf #5 `management-package-pe`** (cartographie + question-list fiscal/social, garde-fous
  fiscal/social structurels) — **shippé PR #66**, scoring **gate-clean MANPE4**. Détail :
  [`handoff-2026-06-30-pe-management-package.md`](handoff-2026-06-30-pe-management-package.md).
- Compte skills DA : **32**. Version plugin : **0.19.0**.

### Méthodologie scoring blind — durcie + harmonisée (PR #67)
- **Fix scorer Phase 4** : clé `preuve` obligatoire et **persistée** par verdict (anti-hallucination
  + audit) ; **densité de grille bornée 20-30** ; `tiered_scoring.py` inchangé. Tests TDD verts.
- **Corpus méthodo harmonisé** : workflow **criteria atomiques tiered-gated** promu **canonique**
  release (Harvey LAB : ground-truth = grille) ; holistique conservé historique ; **journal daté
  consolidé** (06-01 → 06-30) ; vestiges corrigés.
- Docs : [`sparring-scoring-protocol.md`](../methodology/sparring-scoring-protocol.md),
  [`codex-prompt-templates.md`](../methodology/codex-prompt-templates.md),
  [`README-codex-blind-scoring.md`](../../scripts/README-codex-blind-scoring.md).

## Ouvert / prochaines pistes

- **PE restant** (landscape `docs/backlog/da-pe-landscape-fr-v2-pratique.md`) : `#6
  due-diligence-dataroom --pe-red-flags` ; `#7 fonds-pe-fr-triage` (différé — AMF/fiscal lourds).
- **`d2-v2`** : migrer le launchpad PI D.2 vers criteria tiered-gated — backlog
  [`d2-launchpad-v2-migration.md`](../backlog/d2-launchpad-v2-migration.md).
- **Revue Anno Desktop** : §10 du CLAUDE.md plugin DA, session dédiée (non urgent).

## Intendance

- **Ménage post-#67 fait** : stash CLOPE droppée, branches `fix/scorer-phase4-preuve` /
  `docs/scorer-phase4-false-negatives-backlog` / `feat/da-pe-management-package` supprimées.
  Reste : supprimer la branche locale `codex/harmonize-blind-scoring-methodology` (PR #67 mergée).
- **GitNexus index stale** (`npx gitnexus analyze` quand pratique) — bruit récurrent, non bloquant.
- Stash restante `stash@{0}` = ancienne `feat/da-pre-pack-cession` (2026-06-11), sans rapport.

## Réflexes scoring (mémoire)

- Lire le **rapport backlog** `docs/backlog/da-scoring-<skill>-<CODE>.md` (raisonnement par critère),
  pas le seul JSON verdicts.
- **Code de cycle = 6 caractères** stricts (garde fail-fast dans `da-scoring.sh`).
- **Gate-piège ≠ recall** ; **release sur gate-clean** (le score chiffré est un artefact sur grille
  dense) ; spot-checker les FAIL contre le live avant de conclure à un déficit.
- **Module depth ≠ live depth** : pour bouger un gate de danger → `SKILL.md` ; profondeur → borner la
  grille (enrichir le module ne remonte pas dans le brouillon live).
- **Candy pilote les runs Codex** (token economy) ; le ménage git trivial aussi.
