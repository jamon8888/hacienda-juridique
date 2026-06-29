# Spec — mode `pacte-associes-review --pe` (overlay Private Equity)

**Date :** 2026-06-25
**Statut :** spec validée (brainstorming) — prête pour plan d'implémentation.
**Skill cible :** `plugins/hacienda-droit-affaires/skills/pacte-associes-review` (v2.0.0 → **v2.1.0**).
**Vague :** 1ʳᵉ vague Private Equity (spécialisation M&A FR du persona avocat déjà servi).
**Pattern :** isomorphe à l'overlay `--distressed` (cf. `references/distressed-overlay-fr.md`,
cycle SPADIS ADMIS 1,0).

> Sources de cadrage : `docs/backlog/da-pe-landscape-fr-v2-pratique.md` (glossaire + douleurs +
> mapping), `docs/backlog/da-pe-landscape-fr.md` (défrichage doctrinal), coverage map v2.

---

## 1. Objectif

Ajouter un **mode `--pe`** à `pacte-associes-review` : une lentille « pacte d'investissement »
pour relire un pacte d'associés dans un contexte Private Equity (LBO sponsor / management
package), où se superposent un **pacte d'investissement**, un **pacte existant** et les
**statuts**. C'est le candidat PE #1 du landscape (réutilisation 80-90 % du socle déjà durci,
douleur la plus fréquente, faible risque doctrinal car clause-craft / liberté contractuelle).

**Hors flag, la revue 11 clauses standard est strictement inchangée (zéro régression).**

## 2. Architecture (B, comme distressed)

- **Module doctrine partagé** `references/pe-overlay-fr.md` — source unique : doctrine PE +
  **glossaire praticien complet** + **gate France/Lux**. Chargé **uniquement** si `--pe` posé
  ou accepté après auto-détection. Premier mode à le créer ; `spa-review --pe`,
  `gap-review --mode=wi-pe`, `closing-checklist-fr --pe-funds-flow` y brancheront leurs modes
  ultérieurement (glossaire et gate Lux déjà partagés).
- **Étape conditionnelle 2bis** dans le SKILL.md, après l'analyse clause-par-clause standard
  (étape 2). Ne s'exécute qu'avec le flag / acceptation.
- **Side model A** : en mode `--pe`, `--side` **bascule** sur le couple
  `sponsor | management` (la lecture side-aware et le glossaire deviennent sponsor/manager).
  Hors `--pe`, le standard conserve `fondateur | investisseur | société`. Épouse le registre
  praticien (règle naming : taxonomie/jargon réel). Le manager-avec-rollover n'est pas un
  fondateur ; le sponsor n'est pas un investisseur lambda.

## 3. La grille PE — 5 axes (façon D1-D5)

Chaque axe distingue ce que la revue standard couvre déjà de ce que l'overlay PE **ajoute**.

| Axe | Standard couvre déjà | Overlay PE ajoute |
|---|---|---|
| **P1 — Précédence & architecture documentaire** ⭐ (axe lourd) | — | Pacte d'investissement superposé au pacte existant + statuts : clause de précédence, accession (adhésion), amendment, termination du pacte historique ; **cohérence statuts ↔ pacte ↔ SPA**. Produit une **matrice de précédence + conflits**. Douleur #1 du marché. |
| **P2 — Gouvernance sponsor** | véto, droits d'information | Re-lecture PE : reserved matters / véto trop large → **risque gestion de fait `[review]`** ; board composition ; information rights calibrés (confidentialité, banques). |
| **P3 — Économie & préférences** | anti-dilution | Liquidation preference (non couvert standard), ratchet sponsor/manager, sweet equity mechanics ; **léonine watch** (art. 1844-1 `[à vérifier]`) sur rendements garantis / exonération de pertes. |
| **P4 — Management & leaver PE** | good/bad leaver, non-concurrence d'associé | Re-lecture MEP : vesting / reverse vesting, leaver indexé sur le package, **adhésion rollover au pacte**, cumul des qualités associé / salarié / mandataire. **Requalification fiscale/sociale = nommée et renvoyée, jamais traitée au fond.** |
| **P5 — Liquidité & sortie sponsor** | drag/tag, liquidité | Re-lecture drag **sous l'angle sortie sponsor** : seuil de déclenchement, égalité des conditions, garanties imposées aux minoritaires, put/call, ROFR, lock-up IPO. |

## 4. Module `references/pe-overlay-fr.md` — structure

Reprend la structure de `distressed-overlay-fr.md` :

1. **Périmètre + note side-aware** (sponsor / management).
2. **Gate d'application France/Lux** (le « gate barre » du PE) : si le pacte vise une **entité
   luxembourgeoise**, l'overlay couvre la **jambe FR** et **exclut** les documents Lux (pacte
   Lux / shareholders agreement Lux / docs constitutifs du fonds). Formulation type reprise du
   landscape §5. Si aucun signal PE réel → pas d'overlay.
3. **Signaux de détection** (auto-proposition hors flag) : mention de *pacte d'investissement*,
   sponsor / fonds, BidCo / HoldCo / NewCo / TopCo, management package / MEP, rollover /
   reinvest, sweet equity, ratchet, envy ratio, liquidation preference, leaver indexé sur un
   LBO, drag « sortie sponsor ». **Un seul signal sérieux suffit à proposer** l'overlay.
4. **Doctrine des 5 axes P1-P5** (détaillée, side-aware).
5. **Glossaire praticien complet** (~90 termes du landscape v2, discipline
   `[jargon marché]` / `[formel]` / `[à vérifier]`) — actif **partagé** des 4 futurs modes,
   inclus en entier dès maintenant.
6. **Lecture side-aware** — tableau sponsor (imposer/structurer) / management (protéger), façon
   synthèse D1-D5.
7. **Anti-fabrication PE** : requalification fiscale/sociale du package = nommée et renvoyée,
   jamais traitée ; pas de quantum ; léonine / gestion de fait = `[review]`, jamais conclusion ;
   instruments (BSPCE/ADP/BSA) renvoyés à `financement-startup` ; pas de date fabriquée.
8. **Renvois** : `financement-startup` (instruments), `spa-review --pe` (rollover / SPA, à
   venir), `gap-review` (garanties personnelles managers/cédants), `asset-vs-share-distress`
   (si cible en difficulté), `PI:contrats-pi` (si volet PI substantiel).

## 5. Mécanique d'intégration (étape 2bis)

- L'étape 2bis ne se déclenche qu'avec `--pe` (flag) ou après **acceptation** d'une
  auto-proposition (signaux §4.3).
- **Bloc dédié « Architecture documentaire & précédence »** *au-dessus* de la liste de points :
  matrice statuts ↔ pacte existant ↔ pacte d'investissement + liste des conflits de précédence.
  (P1 est architectural, il tient mal en ligne de tableau et c'est la douleur #1 → mise en
  évidence.)
- Les findings des axes **P2-P5 se fondent dans la liste de points existante** (artefact
  central), triés par criticité, avec le side sponsor/management.
- **Le format de sortie global reste identique** (en-tête confidentialité, note du relecteur,
  résumé exécutif, liste de points, recommandation, question hors checklist, arbre 5 options).
  → zéro régression + **réutilisation telle quelle du harnais de scoring**.

## 6. Discipline citations

- Articles déjà vérifiés dans `articles-c-civ-c-com-index.md` (L.227-13/14/15, L.223-14,
  L.228-24, L.227-9, 1231-5, 1170, 1592 ; 1844-1 / 1843-4 déjà `[à vérifier]`) : utilisables tels
  quels.
- **Prérequis de build** : passer les articles PE-spécifiques que le module introduit
  (liquidation preference, gestion de fait, précédence) par `verifier-citations` ou un Codex
  effort-high pour peupler l'index **avant** rédaction. Tout non vérifié → `[à vérifier]`.
- Post-flight `verifier-citations` du skill : inchangé, tourne sur la sortie complète.

## 7. `Ce skill ne fait pas` — ajouts mode PE

- Ne traite pas le volet **fonds** (règlement / LPA / side letters → `fonds-pe-fr-triage`,
  vague ultérieure).
- Ne donne **pas d'avis fiscal/social** sur le management package (requalification = signalée
  et renvoyée).
- Ne **rédige** pas le pacte d'investissement (review only, comme le standard).
- Ne couvre **pas les documents luxembourgeois** (gate France/Lux).

## 8. Scoring (calqué SPADIS)

- **Dataset dédié** `plugins/hacienda-droit-affaires/tests/datasets/da-pacte-associes-pe/`
  (pas de pollution du dataset pacte standard, comme `da-spa-review-distressed`).
- **Protocole blind 4 phases** (CLAUDE.md projet) : Phase 1 fictif (Codex medium) ; Phase 2
  ground-truth (Codex high, sans SKILL.md) ; Phase 3 live (Claude natif, sans ground-truth) ;
  Phase 4 scoring (Codex medium, sans SKILL.md). Piloté par le wrapper `da-scoring.sh` —
  **commandes lancées par Candy**.
- **Calibration de gate (pré-emptée)** — leçon récurrente « attente affirmative orpheline » :
  - Gate **France/Lux** : FAIL = « traite un document Lux comme FR sans poser le gate » ; PASS =
    complément ; la mention explicite du gate = bonus, **jamais** une attente affirmative
    orpheline.
  - P1 précédence : FAIL = « rate un conflit de précédence pacte/statuts qui piège le client ».

## 9. Intendance

- Bump `pacte-associes-review` v2.0.0 → **v2.1.0** (mode ajouté).
- Bump version plugin + CHANGELOG.
- Mention du mode dans le README du plugin.
- Branche dédiée (le travail ne se fait pas sur `main`).

## 10. Hors scope / différé (vague PE ultérieure)

- `spa-review --pe-sponsor` (acquisition sponsor, locked box/completion accounts, CP
  financement, MAC, W&I, rollover, funds flow) — candidat #2.
- `gap-review --mode=wi-pe` (matrice GAP/W&I/disclosure) — candidat #3.
- `closing-checklist-fr --pe-funds-flow` — candidat #4.
- Skill neuf `management-package-pe` — candidat #5, **seulement** garde-fous fiscal/social
  verrouillés.
- `fonds-pe-fr-triage` (volet fonds FR, périmètre AMF/fiscal distinct) — candidat #7, différé.

---

## Critères de succès

1. Hors `--pe` : revue pacte standard **bit-identique** (zéro régression — à vérifier au build).
2. Avec `--pe` : les 5 axes exécutés, bloc précédence produit, sides sponsor/management
   appliqués, gate France/Lux respecté, anti-fabrication tenue.
3. Cycle blind dédié **ADMIS gate-clean** (objectif 1,0, dans la lignée des 3 derniers ADMIS au
   1ᵉʳ cycle).
4. Module `pe-overlay-fr.md` réutilisable tel quel par les modes PE suivants (glossaire + gate
   partagés).
