# Handoff — mode `--distressed` (overlay spa-review / gap-review)

**Date :** 2026-06-25
**Branche :** `feat/da-distressed-review-overlay` — **PR #62 ouverte vers `main`** (non encore mergée)
**Version :** hacienda-droit-affaires v0.14.0 → **v0.15.0**
**Skills :** **31 inchangé** (c'est un mode, pas un skill)
**Statut scoring :** **ADMIS gate-clean** (cycle `SPADIS`, score **1,0**, 0 gate failure, MAJEUR 1,0 / MINEUR 1,0) — **au 1ᵉʳ cycle**.

---

## 1. Ce qui est livré

Un **mode `--distressed`** sur `spa-review` et `gap-review` : une lentille « cible en
difficulté » pour relire un **SPA / une GAP privés** sur une société en difficulté mais
**pas encore à la barre** (pré-procédure / amiable / pre-pack). Relie le moat
distressed-M&A (`asset-vs-share-distress`, en amont) au **quotidien M&A/PE**.

Architecture **« B »** : un **flag** sur les deux skills + **un module de doctrine partagé**
`references/distressed-overlay-fr.md` (source unique). Chaque skill gagne une **étape
conditionnelle** qui n'exécute la grille distressed que si le flag est posé **ou accepté
après auto-détection** de signaux de difficulté. **Hors flag, les revues standard sont
strictement inchangées** (zéro régression).

Surface livrée (9 commits) :
- `references/distressed-overlay-fr.md` (module) + `references/articles-c-civ-c-com-index.md` (L.632-1/2).
- `skills/spa-review/SKILL.md` (étape 9bis) + `skills/gap-review/SKILL.md` (étape 6bis).
- README (mention du mode), bump **v0.15.0** (6 emplacements), CHANGELOG.
- `scripts/da-scoring.sh` (cycle `spa-review-distressed`, code `SPADIS`) + dataset.

## 2. Doctrine du module (side-aware)

- **D1** période suspecte / nullités (L.632-1 de droit, L.632-2 facultatives) ;
- **D2** passif non purgé en share deal → GAP centrale ;
- **D3** garantie de la garantie face à un cédant insolvable (séquestre/GAPD) ;
- **D4** transferts & solidarités (L.1224-1, L.1684 CGI/L.267 LPF, ICPE — cross-link) ;
- **D5** MAC & CS « absence de procédure ».

**Frontière barre stricte** : cible déjà en RJ/LJ avec appel d'offres ouvert → STOP overlay
→ renvoi `reprise-a-la-barre` / `cession-actifs-isoles` (acte judiciaire, pas un SPA privé).
Cohérente sur les 4 surfaces (module + 2 étapes + 2 bullets « ne fait pas »). Boundary
discipline : ne date pas la CdP, ne chiffre pas le passif, nullité = `[review]`,
responsabilité dirigeant nommée-et-renvoyée jamais évaluée.

## 3. Scoring — cycle `SPADIS`

| Niveau | Résultat |
|---|---|
| Gate failures | **0** |
| Score | **1,0 — ADMIS** |
| MAJEUR | 1,0 |
| MINEUR | 1,0 |

Cycle blind sur **`spa-review --distressed`** (chemin qui exerce le module partagé le plus
densément). **Checkpoint gates (décisif) :** 1 CRITIQUE recalibré — **C-004 (gate barre)** :
l'attente affirmative « mention du basculement barre » était orpheline (le dataset n'a aucune
procédure confirmée → seule erreur testable = le sur-refus) → PASS = complément exact du FAIL,
mention barre = bonus, FAIL élargi à « traite comme barre sans procédure confirmée ». Même
classe que C-015 (`defense-dirigeant`/`distress-cedant`). Cf. `[[feedback-gate-calibration-scoring]]`.

ADMIS 1,0 au 1ᵉʳ cycle — **3ᵉ d'affilée** (responsabilite-dirigeant, defense-dirigeant,
distressed-overlay) : anti-fabrication verrouillé dans le module dès le build + checkpoint.

Artefacts : `ground-truth.md`, `live-output.md` (+ archive `live-output-SPADIS.md`),
`verdicts-SPADIS.json`, `scenario.md` (dans `tests/datasets/da-spa-review-distressed/`).

## 4. Build (subagent-driven)

3 dispatches Sonnet (D1 module+index / D2 spa+gap / D3 README+version+scoring+dataset),
revue par tâche + **revue whole-branch Opus : READY TO MERGE, 0 Critical / 0 Important**.
2 Minor : (1) parité dirigeant gap-review étape 6bis — **corrigé** (`4988b00`) ; (2) préfixe
legacy `/h-droit-affaires:` pré-existant — hors scope. `npm test` 309 ✓ (3 skip eurlex-live),
typecheck/build/branding verts, structure 11/11 (count 31).

## 5. Contrôle live miroir `gap-review --distressed` — FAIT (post-merge)

**Sanity live exécutée** (Sonnet, post-merge) sur un mini fact-pattern GAP distressed (cible
CP négatifs, GAP nue sans séquestre, garant personne physique, nantissement pour dette
antérieure, contrôles URSSAF/DGFiP) : **6/6 PASS** — activation du mode, **garantie de la
garantie centrée en 🔴**, gate barre respecté (procède sans sur-refuser), anti-fabrication
tenue (ne date pas la CdP, nullité = `[review]`), pas de contamination SPA. **Verdict : étape
6bis fonctionnelle, module suffisant.**

**Décision : pas de cycle blind dédié GAP.** Le seul angle qui l'aurait justifié — un delta
doctrinal propre au GAP — n'existe pas (la doctrine est partagée et déjà ADMIS via SPADIS).
Un seul point mineur remonté, **non bloquant** : l'immunité de l'accord de conciliation
homologué (**L.611-10-1 C.com.**) n'est pas dans le module — noté en backlog
`docs/backlog/da-distressed-overlay-L611-10-1-enrichment.md` (enrichissement optionnel D1 bis ;
s'il est repris, c'est une modif du **module partagé** → impacte spa **et** gap → mini cycle de
validation à ce moment-là seulement).

## 6. Reste à faire (prochaine session)

- **PR #62 MERGÉE** (`bc49a96`, 2026-06-25). `main` à **v0.15.0, 31 skills** ; branches locale
  + distante supprimées. **Cycle distressed-overlay entièrement soldé.**
- **Cycle blind dédié GAP : tranché — NON** (sanity §5, module suffisant). Ne rouvrir que si
  l'enrichissement L.611-10-1 (modif du module partagé) est repris.
- **Pistes annexes** (inchangées) : mode `--draft` (mémoire en défense rédigé, hors scope v1) ;
  AMF / cibles cotées (v2) ; enrichissement L.611-10-1 (backlog).
- **Intendance** (pré-existante, hors PR) : `AGENTS.md`, `CLAUDE.md`, `package*.json`,
  `.claude/`, backlogs. Index GitNexus stale.

## 7. Leçon méthodo

**Le pattern « attente affirmative orpheline » se confirme comme le défaut de gate récurrent.**
Sur un axe où le dataset ne peut pas matérialiser l'erreur dangereuse (ici : aucune procédure
confirmée, donc impossible de « traiter à la barre un dossier barre »), exiger une mention
affirmative en PASS crée un orphelin : le FAIL ne capture pas le silence. Règle (3ᵉ occurrence,
après C-015 banqueroute et C-015 contrats) : le FAIL vise la vraie erreur dangereuse et le PASS
en est le complément ; l'attente affirmative devient un bonus, jamais un gate. Cf.
`[[feedback-gate-calibration-scoring]]`.
