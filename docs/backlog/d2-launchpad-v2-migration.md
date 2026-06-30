# Backlog — Migration launchpad `d2-v2` (PI) vers criteria atomiques tiered-gated

**Date :** 2026-06-30
**Statut :** identifié, **non exécuté** — chantier structurant, branche dédiée le moment venu.
**Origine :** passe d'harmonisation méthodo (2026-06-30) — le launchpad D.2 PI est resté sur l'ancien
modèle holistique alors que le parcours canonique release est désormais criteria atomiques tiered-gated.

---

## Problème

`docs/methodology/d2-codex-launchpad.md` + `docs/methodology/d2-codex-prompts/` (29 prompts
pré-rendus) + le wrapper `scripts/d2.py` constituent le launchpad minimal-friction du lot PI D.2.
Il appelle **encore les templates holistiques pondérés** `phase2` / `phase4`, et les prompts Phase 1
**inscrivent le code de cycle en dur** dans le scénario (anti-pattern : inputs blind doivent être
cycle-agnostiques, cf. règle 2026-06-03).

Le launchpad reste **rejouable pour comparaison historique** mais n'est plus le parcours canonique
d'une nouvelle décision release.

## Périmètre de la migration `d2-v2`

1. **Wrapper criteria** : `scripts/d2.py` (ou `d2-v2.py`) appelle `phase2-criteria` /
   `phase4-criteria` au lieu des holistiques.
2. **Prompts Phase 1 régénérés** sans code de cycle embarqué (le code ne vit que dans la commande
   Phase 4 `--code` et le nom du rapport).
3. **Extraction des verdicts à 4 clés** `{id,niveau,verdict,preuve}` (réutiliser `extract-verdicts.py`,
   généraliser hors DA si besoin).
4. **Nouveau format de livrable** aligné sur le scoring tiered-gated déterministe (`tiered_scoring.py`),
   pas de grille pondérée.
5. Nouveau doc `docs/methodology/d2-codex-launchpad-v2.md` (pas d'écrasement silencieux du D.2 historique).

## Hors périmètre / dépendances

- Ne pas casser le D.2 historique (le conserver pour rejouer les cycles PI passés).
- Réutilise le socle déjà en place côté DA : `da-scoring.sh`, `codex-blind-scoring.py` (lit les
  templates), `extract-verdicts.py` (clé `preuve`), `tiered_scoring.py`.

## Référence

Modèle canonique : `docs/methodology/sparring-scoring-protocol.md` (workflow criteria),
`docs/methodology/codex-prompt-templates.md` (templates `-criteria`),
`scripts/README-codex-blind-scoring.md`.
