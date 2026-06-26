# Handoff — mode `pacte-associes-review --pe` (overlay Private Equity)

**Date :** 2026-06-26
**Branche :** `feat/da-pacte-pe-overlay` (non mergée, non poussée)
**Version :** hacienda-droit-affaires **0.16.0** ; skill `pacte-associes-review` **v2.0.0 → v2.1.0**
**Skills :** **31 inchangé** (c'est un mode, pas un skill)
**Statut scoring :** **non lancé** — dataset `da-pacte-associes-pe` + cycle `PACPE1` prêts ; le cycle blind 4 phases est piloté par Candy. **Release gate = ADMIS gate-clean.**

---

## 1. Ce qui est livré

Un **mode `--pe`** sur `pacte-associes-review` : une lentille « pacte d'investissement »
pour relire un pacte d'associés en contexte Private Equity (LBO sponsor / management package),
là où se superposent un **pacte d'investissement**, un **pacte existant** et les **statuts**.
1ʳᵉ vague PE = spécialisation M&A FR du persona avocat déjà servi (pas une pratique fonds).

Architecture **isomorphe à l'overlay `--distressed`** (qui a obtenu SPADIS ADMIS 1,0) :
un **flag** + un **module de doctrine partagé** `references/pe-overlay-fr.md` (source unique) +
une **étape conditionnelle 2bis**. **Hors flag, la revue 11 clauses standard est strictement
inchangée** (zéro régression confirmée en revue whole-branch).

Surface livrée (9 commits build) :
- `references/pe-overlay-fr.md` (module : gate France/Lux, signaux, axes P1-P5, **glossaire
  praticien ~100 termes**, lecture side-aware, anti-fabrication, renvois) + `references/articles-c-civ-c-com-index.md` (articles PE en `[à vérifier]`).
- `skills/pacte-associes-review/SKILL.md` (frontmatter v2.1.0, intake `--pe` + `--side=sponsor|management`, étape 1 détection, **étape 2bis**, bloc précédence conditionnel, « ne fait pas », exemple).
- Version 0.16.0 (lock 3-way plugin.json / version.json / mcp-server) + README + CHANGELOG.
- `scripts/da-scoring.sh` (cycle `PACPE1`) + dataset `tests/datasets/da-pacte-associes-pe/scenario.md`.

## 2. Doctrine du module (side-aware sponsor / management)

- **P1** Précédence & architecture documentaire (axe lourd) — pacte d'investissement vs pacte existant vs statuts ; conflit non résolu = `[review]`. **Douleur #1.**
- **P2** Gouvernance sponsor — véto trop large → risque **gestion de fait** `[review]`.
- **P3** Économie & préférences — liquidation preference, ratchet, sweet equity ; **léonine watch** (1844-1 `[à vérifier]`).
- **P4** Management & leaver PE — vesting/leaver/rollover ; **requalification fiscale/sociale nommée et renvoyée, jamais traitée.**
- **P5** Liquidité & sortie sponsor — drag sortie sponsor, put/call, ROFR, lock-up.

**Gate France/Lux** (le « gate barre » du PE) : docs luxembourgeois hors périmètre → couvre la
jambe FR. **Anti-fabrication** : pas de date fabriquée ni de quantum ; aucun identifiant LEGIARTI
inventé ; instruments → renvoi `financement-startup`.

## 3. Build (subagent-driven, 3 dispatches Sonnet + revue Opus)

- **D1** (module + index), **D2** (wiring SKILL.md), **D3** (version + dataset/wrapper). Revue par
  dispatch (Sonnet) → findings corrigés (D1 : léonine 1844-1 seul, ordre sections spec §4 ;
  D2 : **carte de versions par skill** au lieu d'un regex global ; D3 : retrait mention
  releve-forclusion hors scope, neutralisation préambule scénario, typos).
- **Revue whole-branch (Opus) : READY TO MERGE = YES, 0 Critical / 0 Important.** 2 Minor corrigés
  (labels axes P3/P5 du wrapper alignés sur le module, ref orpheline « P0 » → France/Lux).
- `npm test` **309 ✓ (3 skip eurlex-live)**, typecheck/build/branding verts, structure 11/11,
  count 31. Zéro régression standard confirmée (toutes les modifs SKILL.md additives / `--pe`-conditionnelles).

## 4. Reste à faire (prochaine session)

- **Cycle blind `PACPE1`** (piloté par Candy via `da-scoring.sh`) : Phase 2 ground-truth
  (Codex high, sans SKILL.md) → Phase 3 live (sans ground-truth) → Phase 4 scoring (Codex,
  sans SKILL.md). **Release conditionnée à ADMIS gate-clean.** Le scénario matérialise 5 pièges
  (P1 précédence, P2 gestion de fait, P4 léonine, P4 sweet equity fiscal/social, gate Lux) ;
  calibration de gate Lux = FAIL « traite Lux comme FR », PASS = complément (pas d'attente
  affirmative orpheline).
- **Merge / PR** : après ADMIS, finir la branche (`finishing-a-development-branch`).
- **Modes PE suivants** (spec §10) : `spa-review --pe-sponsor`, `gap-review --mode=wi-pe`,
  `closing-checklist-fr --pe-funds-flow`, puis skill `management-package-pe` (garde-fous
  fiscal/social verrouillés). Tous réutiliseront le module + glossaire partagés.
- **Intendance** (hors branche, sur `main`) : 4 docs Codex non commités, datasets legacy
  `v1.1/v1.2/v2-spa/v2a` à archiver, index GitNexus stale.

## 5. Carried Minor (non bloquant)

Incohérence cosmétique d'espacement `--side=sponsor|management` (frontmatter/commande) vs
`--side=sponsor | management` (prose intake) — jugée acceptable en revue finale (aucun parseur
ne consomme la prose), à toiletter opportunément.
