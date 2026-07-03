# Handoff — mode `due-diligence-dataroom --pe` (red flags PE, side sponsor)

**Date :** 2026-07-03
**Branche :** `feat/da-dd-pe-red-flags` (1 commit build `63659d7`, non mergée)
**Version :** hacienda-droit-affaires **0.19.0 → 0.20.0** ; skill due-diligence-dataroom
**2.0.0 → 2.1.0** (mode ajouté ; DD standard 7 thèmes inchangée).
**Skills :** **32 inchangé**
**Statut scoring :** **non scoré** — scaffolding prêt (`due-diligence-pe`, code `DDRPE1`),
cycles à lancer par Candy (token economy).

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

## 4. Reste à faire

- **Scoring `DDRPE1`** — cycles Candy (Phase 1/2/4 Codex + Phase 3 live) ; barre
  release = gate-clean (précédent SPAPE/CLOPE). Pièges suggérés déjà encodés dans
  `spec_for` : finding matériel sans traitement, known issue → W&I, change of control
  client dominant, waiver bancaire, gate Lux, price chips non chiffrés.
- **Merge / PR** : décision Candy.
- **Valider le choix de flag** `--pe` canonique vs `--mode=pe-red-flags` (cf. §1).
- **PE #7 `fonds-pe-fr-triage`** : toujours différé (pratique fonds, AMF/fiscal lourds).
