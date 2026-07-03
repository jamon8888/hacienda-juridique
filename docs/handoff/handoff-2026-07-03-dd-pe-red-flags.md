# Handoff — mode `due-diligence-dataroom --pe` (red flags PE, side sponsor)

**Date :** 2026-07-03
**Branche :** `feat/da-dd-pe-red-flags` — **MERGÉE** (PR #68, commit `1de91a9`)
**Version :** hacienda-droit-affaires **0.19.0 → 0.20.0** ; skill due-diligence-dataroom
**2.0.0 → 2.1.0** (mode ajouté ; DD standard 7 thèmes inchangée).
**Skills :** **32 inchangé**
**Statut scoring :** **`DDRPE1` gate-clean** (6/6 CRITIQUE PASS, score brut 0,49 sur
grille dense 27 critères → ~0,87 ajusté après spot-check). Release décidée sur
gate-clean, cohérente avec SPAPE/CLOPE. Module enrichi post-scoring (D3/D4,
découplé du rescore) + fix méthodo transversal templates Codex (règle 6, dates/
provenance) — voir §5 et `latest.md` pour le détail à jour de ce qui suit ce
handoff initial (rédigé avant scoring/merge).

Candidat PE #6 de [`da-pe-landscape-fr-v2-pratique.md`](../backlog/da-pe-landscape-fr-v2-pratique.md)
§2.11 / §4 — **dernier mode de la couverture du parcours deal PE côté sponsor**
(après pacte #1, SPA #2, GAP #3, closing #4, management package #5).

---

## 1. Ce qui est livré

Un **mode `--pe`** (alias accepté : `--mode=pe-red-flags`) sur `due-diligence-dataroom` :
lentille red flags Private Equity, side sponsor (buyside DD), vendor DD côté cédant en
lecture miroir. Hors `--pe`, la DD standard 7 thèmes est **strictement inchangée**
(zéro régression : suite verte). Architecture isomorphe aux 4 overlays PE précédents :
un flag + un module frère + une étape conditionnelle.

> **Note naming** : le landscape nommait le candidat `--mode=pe-red-flags`. Le flag
> canonique retenu est **`--pe`** (cohérence avec les 4 skills frères — muscle memory
> utilisateur), l'alias `--mode=pe-red-flags` est accepté et documenté. À confirmer
> par Candy si elle préfère l'inverse.

Surface livrée (commit `63659d7`) :
- `references/pe-dd-red-flags-overlay-fr.md` (module frère : axes **D1–D5**, side-aware
  sponsor) qui **référence** `pe-overlay-fr.md` (gate France/Lux, glossaire ~100 termes,
  anti-fabrication PE — non redupliqués).
- `skills/due-diligence-dataroom/SKILL.md` : intake item 5 (`--pe` + signaux de
  détection avec proposition sans imposition) + **Étape 6bis** + item gate + section
  livrable (table de conversion) + exemple + « Ce skill ne fait pas » (3 lignes) +
  frontmatter 2.1.0.
- `pe-overlay-fr.md` : renvoi `due-diligence-dataroom --pe` activé (section Renvois).
- README plugin (ligne palette), CHANGELOG 0.20.0, version 3-way (version.json /
  plugin.json / mcp-server/package.json), test structure (pin 2.1.0).
- `scripts/da-scoring.sh` : entrée `due-diligence-pe` (code `DDRPE1`, 6 chars ✓) dans
  les 5 fonctions + les 2 listes, `bash -n` + `list` vérifiés.

## 2. Doctrine du module (side-aware sponsor)

**Doctrine centrale — du finding au traitement deal** : en mode PE, un finding matériel
🔴/🟠 sans traitement deal désigné = DD inachevée. Palette de conversion : **CP**
(régularisable avant closing) / **déclaration-garantie GAP** (générique indemnisable) /
**specific indemnity** (risque **identifié** = known issue exclu de la police W&I) /
**couverture W&I** (générique **non identifié** seulement) / **price chip** (nommé,
**jamais chiffré** `[à compléter]`) / **Q&A** (suspecté faute de pièce). Piège phare :
router un known issue vers la couverture W&I est une erreur de conversion.

**D1** red flag report partner-ready (🔴/🟠 matériels + table de conversion, grille
complète en annexe ; matérialité lue contre l'equity ticket / la thèse) · **D2** change
of control × concentration client, termination for convenience, MFC/exclusivités ·
**D3** change of control defaults dette existante (waiver en CP), mainlevées/pay-off,
débranchement cash pooling, substitution garanties groupe, assistance financière
L.225-216 **nommée et renvoyée** · **D4** management package existant (renvoi
`management-package-pe`), incentives de deal, contrôles URSSAF/fiscal = known issues,
fond **nommé et renvoyé** · **D5** DD = source des known issues W&I, fair disclosure,
**reliance letter** (bénéficiaire/plafond), Q&A cadencée par le process.

**Gate France/Lux** hérité ; empilement `--pe` × distressed sans duplication ; semaines
relatives, aucun chiffrage.

## 3. Build & vérification

Build inline (session Fable 5, pattern des overlays précédents reproduit depuis
`pe-spa-gap-overlay-fr.md` / handoffs 2026-06-29 et 2026-06-30).
`npm test` **309 ✓ (3 skip)**, typecheck / build / branding verts, `git diff --check`
propre, count 32, version-lock 0.20.0 (3-way). GitNexus non consulté (tools MCP non
exposés dans la session + index stale connu) — diff sans symbole de code.

## 4. Reste à faire (mis à jour post-scoring/merge)

- ~~Scoring `DDRPE1`~~ **fait** — gate-clean, voir §5.
- ~~Merge / PR~~ **fait** — PR #68 mergée (`1de91a9`).
- **Choix de flag** `--pe` (canonique retenu) vs `--mode=pe-red-flags` (alias
  documenté) : non contesté depuis, considéré tranché par défaut sauf retour Candy.
- **PE #7 `fonds-pe-fr-triage`** : toujours différé (pratique fonds, AMF/fiscal lourds).

## 5. Scoring, enrichissement post-scoring & fix méthodo (2026-07-03, même session)

**Cycle `DDRPE1`** (grille 27 critères, dans la borne 20-30) : **gate-clean**, 6/6
CRITIQUE PASS — aucune erreur qui trompe le client (share deal ≠ purge Hexalys,
crédit non éteint automatiquement, pas de cession PI automatique, W&I ≠ couverture
des known issues, docs Lux non analysés en droit FR, rien chiffré). Score brut
**0,49** — écrasé par la densité de la grille (27 critères, sous-items conjonctifs).
Checkpoint gates avant Phase 3 : correction d'une zone orpheline sur C-009 (gate
Lux) — PASS élargi au simple signalement du droit étranger, pas seulement au renvoi
explicite.

**Spot-check des FAIL contre `live-output.md`** (obligatoire avant tout diagnostic,
[[feedback-gate-calibration-scoring]]) : sur les 7 MAJEUR + 3 MINEUR en FAIL,
**5 sont des faux FAIL** —
- C-021 (grille 7 thèmes canoniques du skill vs périmètre VDD du scénario — les faits
  immobiliers sont couverts, juste pas sous une rubrique dédiée) ;
- C-008 / C-016 (sur-exigence : le skill **route explicitement** vers `gap-review --pe`
  au lieu de dupliquer la matrice fine W&I/disclosure — design voulu) ;
- C-025 / C-026 (voir fix méthodo ci-dessous — bug de critère, pas de skill).

Score ajusté après retrait des faux FAIL : **~0,87**, dans la bande SPAPE/CLOPE.
Restent **4 vrais manques mous** : C-006 (acte confirmatif PI + chaîne de droits),
C-012 (révocation des mandats de nivellement), C-013 (conditions juridiques du
cash pooling), C-017 (plan de transition homme-clé) — profondeur, pas danger.

**Décision (Candy) : release sur gate-clean**, cohérente avec la doctrine des
overlays PE précédents.

**Enrichissement module post-scoring** (`pe-dd-red-flags-overlay-fr.md`,
**découplé de tout rescore** — [[feedback-module-depth-not-live-depth]]) : Candy a
retenu 2 des 4 manques comme utiles indépendamment du score —
- **D3 cash pooling** : « dénouer » explicité en 3 actions distinctes (arrêt des
  sweeps + règlement du solde ; **révocation des mandats de nivellement** comme
  action de closing à part entière ; vérification des conditions juridiques des
  opérations de trésorerie intragroupe, poursuite post-closing à écarter).
- **D4 homme-clé** : l'écart annonce de départ vs business plan appelle
  désormais clarification + **plan de transition/rétention** + décision sponsor
  structurée, pas la seule mention du risque.
- C-006 (acte confirmatif PI) et C-013 laissés en l'état — gate-clean suffisant,
  pas de boucle enrich→rescore.

**Fix méthodo transversal** (`docs/methodology/codex-prompt-templates.md`, Phase 2
criteria, nouvelle règle 6 + journal daté 2026-07-03) : C-025/C-026 révélaient un
défaut de **cadrage de critère**, pas un défaut de skill — le livrable Hacienda
porte des éléments de forme obligatoires (en-tête de confidentialité citant la loi
du 31 décembre 1971, footer « Date d'analyse » du Log de vérification, tags
`[Légifrance]` sur l'index pré-vérifié du SKILL.md) qu'un critère mal cadré compte
à tort comme faute. Règle 6 ajoutée : les critères de date visent désormais
exclusivement les **jalons deal** ; les critères de provenance **exemptent**
l'index pré-vérifié du skill. Applicable à **toute notation DA future** — mémoire
`feedback_blind_conformance_rubric` étendue en conséquence.

**Dataset versionné** : `tests/datasets/da-due-diligence-pe/` (scenario,
ground-truth corrigé C-009, live-output, verdicts, rapport
`docs/backlog/da-scoring-due-diligence-pe-DDRPE1.md`) — tout dans le commit
`bf34589` du même PR.
