# Handoff — `defense-dirigeant` (aval contentieux de `responsabilite-dirigeant`)

**Date :** 2026-06-25
**Branche :** `feat/da-defense-dirigeant` — **PR #61 ouverte vers `main`** (non encore mergée)
**Version :** hacienda-droit-affaires v0.13.0 → **v0.14.0**
**Skills :** 30 → **31**
**Statut scoring :** **ADMIS gate-clean** (cycle `DFD1RT`, score **1,0**, 0 gate failure, MAJEUR 1,0 / MINEUR 1,0) — **au 1ᵉʳ cycle**.

---

## 1. Ce qui est livré

`defense-dirigeant` est l'**aval contentieux** de `responsabilite-dirigeant` (C). La paire :
**C qualifie l'exposition** (🟢🟡🟠🔴, 4 axes) → **D arme la défense** quand une action est **engagée**. Le skill **résout** le « futur skill dédié » que C nommait à sa frontière (SKILL.md C, l. 281/283).

Surface livrée :
- `skills/defense-dirigeant/SKILL.md` (V2 canonique) + wrapper jumeau `commands/h-da/defense-dirigeant.md`.
- Cross-refs : **3 edits** dans `responsabilite-dirigeant/SKILL.md` (frontière résolue + renvoi au point « action engagée ») + **1 ligne de routage `cas`** (« Dirigeant **assigné** (action L.651-2 / L.653 engagée) »).
- README (Commandes + Périmètre V2), bump **v0.14.0** (6 emplacements), CHANGELOG, count structure **30 → 31**.
- `scripts/da-scoring.sh` : enregistré (code `DFD1RT`), dataset `tests/datasets/da-defense-dirigeant/`.

## 2. Le cœur : trame de défense, pas mémoire

Décision design **« livrable A »** : le skill **marshalle** les moyens (ordonnés par force, confrontés aux faits, pièces à produire, expertise à demander), il **ne rédige pas** le mémoire — l'avocat rédige l'acte. C'est le **premier skill contentieux** de DA, mais il ne franchit pas la rédaction de l'acte. Périmètre des axes : **L.651-2 (+ L.652-1)** et **sanctions L.653-x** ; **banqueroute L.654 hors plaidoirie** (pénaliste), seule l'**articulation pénal/civil** (sursis à statuer, autorité du pénal sur le civil) est **nommée**.

**Gate inverse de C** : D s'active **uniquement** sur action engagée (assignation/conclusions reçues) ; hors contentieux → renvoi `responsabilite-dirigeant`. Anti-fabrication G1-G6 (dates relatives / no-quantum / moyens en indices sans pronostic / ne rédige pas le mémoire / banqueroute hors plaidoirie / pas de pièce fabriquée).

## 3. Scoring — cycle `DFD1RT`

| Niveau | Résultat |
|---|---|
| Gate failures | **0** |
| Score | **1,0 — ADMIS** |
| MAJEUR | 1,0 |
| MINEUR | 1,0 |

**Checkpoint gates (décisif, avant le live).** 2 CRITIQUE recalibrés (PASS = complément exact du FAIL, FAIL inchangé) :
- **C-004** (non-automaticité L.651-2) : PASS conjonctif exigeant l'énumération des **4 conditions** → « responsabilité **conditionnelle** » (la faute reliée à l'insuffisance suffit). Évite le double-comptage avec C-005/C-007/C-008 (gate-recall).
- **C-015** (banqueroute) : le **silence** sur la banqueroute était une **zone orpheline** (ni PASS « mentionne », ni FAIL « sur-plaide ») → PASS = **ne pas sur-plaider** (nommer l'articulation = un plus, non requis). Même classe que C-015/distress-cedant.

ADMIS 1,0 au 1ᵉʳ cycle (comme `responsabilite-dirigeant`) : anti-fabrication verrouillé dès le design + checkpoint = pas de faux REJETÉ. Cf. `[[feedback-date-fabrication-scoring-variance]]`, `[[feedback-gate-calibration-scoring]]`.

Artefacts : `ground-truth.md`, `live-output.md` (+ archive `live-output-DFD1RT.md`), `verdicts-DFD1RT.json`, `scenario.md`.

## 4. Build (subagent-driven)

3 dispatches Sonnet (D1 skill / D2 version+da-scoring / D3 dataset), revue par tâche + **revue whole-branch Opus : READY TO MERGE, 0 Critical / 0 Important**. 2 Minor non-bloquants (label « pan cédant/débiteur » = nom de side cohérent avec le sibling, conservé ; ligne de priming du scénario, légitime). `npm test` 309 ✓ (3 skip eurlex-live), typecheck/build/branding verts.

## 5. Reste à faire (prochaine session)

- **Merger la PR #61** (validation humaine), puis clôturer (le moat distressed-M&A passe à 31 skills, v0.14.0).
- **Pistes annexes** (inchangées) : mode `--draft` (projet de mémoire rédigé — saut produit, hors scope v1) ; mode `--review` distressed sur `spa-review`/`gap-review` ; AMF/cibles cotées (v2).
- **Intendance** (pré-existante, hors PR — à arbitrer séparément) : `AGENTS.md`, `CLAUDE.md`, `package*.json`, `.claude/`, `docs/backlog/da-responsabilite-dirigeant-RDG1RT.md`, `docs/backlog/da-scoring-defense-dirigeant-DFD1RT.md`. Index GitNexus stale.

## 6. Leçon méthodo

**Le checkpoint gates reste le filet anti-faux-REJETÉ — et l'asymétrie « silence orphelin » récidive.** C-015 (banqueroute) reproduisait exactement le piège distressed-cedant : un PASS qui exige une mention affirmative alors que le FAIL ne capture qu'une sur-action laisse le **silence** dans une zone orpheline → faux FAIL sur un CRITIQUE. Règle : sur tout axe « signal secondaire », le FAIL doit viser la **vraie erreur dangereuse** (ici : *plaider* la banqueroute) et le PASS être son complément exact (ne pas sur-plaider) ; l'attente affirmative (nommer) devient un bonus, pas un gate. Cf. `[[feedback-gate-calibration-scoring]]`.
