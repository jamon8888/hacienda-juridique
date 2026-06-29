# Spec — mode `closing-checklist-fr --pe` (overlay Private Equity, lentille closing LBO)

**Date :** 2026-06-29
**Statut :** spec validée (brainstorming) — prête pour plan d'implémentation.
**Skill cible :** `plugins/hacienda-droit-affaires/skills/closing-checklist-fr` (v2.0.0 → **v2.1.0**).
**Vague :** Private Equity, **candidat #4** (closing / funds flow). Suit `pacte-associes-review --pe` (#1),
`spa-review --pe` / `gap-review --pe` (#2/#3, PR #64 mergée).
**Pattern :** isomorphe aux overlays PE déjà livrés (module frère + flag + étape conditionnelle).

> Sources de cadrage : `references/pe-overlay-fr.md` (socle partagé : gate France/Lux,
> glossaire ~100 termes, anti-fabrication PE), `references/pe-spa-gap-overlay-fr.md`
> (forward-ref explicite du funds flow vers ce mode — Axe S5 et Frontières propres),
> handoff `docs/handoff/handoff-2026-06-29-pe-spa-gap-overlay.md` §6.

---

## 1. Objectif

Ajouter un **mode `--pe`** à `closing-checklist-fr` : une **lentille closing LBO** pour piloter
le closing d'une acquisition Private Equity (sponsor / BidCo), où s'ajoutent au closing M&A
standard le **funds flow / sources & uses**, la mécanique de closing multi-étages, les conditions
de financement et leur séquençage, le **security package** des prêteurs et son piège
d'**assistance financière**, ainsi que l'adhésion rollover et les formalités post-closing PE.

C'est le **candidat #4** du landscape PE. Le module frère `pe-spa-gap-overlay-fr.md` y renvoie
déjà explicitement (Axe S5 « funds flow » et Frontières propres) : ce mode **boucle la chaîne du
deal** PE (pacte → SPA/GAP → **closing/funds flow**) et **possède l'artefact funds flow**.

**Hors flag, la checklist de closing standard (CP / séquençage / documentation / post-closing,
pour cession-titres / cession-fonds / fusion) est strictement inchangée (zéro régression).**

## 2. Architecture (isomorphe aux 3 modes PE livrés)

- **3ᵉ module frère** `references/pe-closing-overlay-fr.md` — axes **L1–L5**, side-aware sponsor,
  qui **référence** `references/pe-overlay-fr.md` pour le socle partagé (gate France/Lux,
  glossaire praticien, anti-fabrication PE). **Lu tel quel : zéro édition de la doctrine pacte/SPA
  ADMIS.** Même rapport frère↔socle que `pe-spa-gap-overlay-fr.md`. Un module dédié (et non une
  extension de `pe-spa-gap-overlay-fr.md`) car la doctrine closing (funds flow, mécanique LBO,
  assistance financière, security package) est distincte de la revue d'acte SPA/GAP.
- **Étape conditionnelle « Étape PE »** dans le SKILL.md, après l'étape 4 (formalités post-closing)
  et avant l'étape 5 (post-flight `verifier-citations`). Ne s'exécute qu'avec `--pe` ou acceptation
  d'une auto-proposition.
- **Side model** : en mode `--pe`, `--side` bascule sur le couple `sponsor | cedant`
  (`--side=sponsor` ≡ acquéreur, défaut ; `--side=cedant` ≡ cédant sponsor), exactement comme
  `spa-review --pe` / `gap-review --pe`. Le funds flow est piloté côté sponsor. Hors `--pe`, le
  standard conserve son side habituel issu du profil (cédant / acquéreur / conseil des deux).
- **Lettre d'axe `L1–L5`** (lentille LBO) — `L` plutôt que `C` pour éviter la collision visuelle
  avec la numérotation des critères de scoring `C-0XX` dans les prompts Codex.

## 3. La grille PE — 5 axes (façon P1-P5 / S1-S5)

Chaque axe distingue ce que le closing standard couvre déjà de ce que l'overlay PE **ajoute**.

| Axe | Standard couvre déjà | Overlay PE ajoute |
|---|---|---|
| **L1 — Funds flow / sources & uses** ⭐ (artefact phâre) | Quittance de prix, instructions de virement, escrow (étape 3 documentation + séquençage étape 2). | Le **tableau sources & uses** complet : sources (equity sponsor/ECL, rollover managers, dette senior/DCL, mezzanine/unitranche, vendor loan, cash on balance sheet) ↔ uses (prix d'acquisition SPA, refinancement de la dette existante de la cible, frais de transaction + prime W&I, frais de mise en place de la dette, constitution escrow/holdback, BFR day-1). **Réconciliation parfaite** : Σsources = Σuses ; cohérence avec le prix SPA, les montants ECL/DCL, le réinvestissement managers — c'est ici qu'aboutit le renvoi de `spa-review --pe` (Axe S5). **Waterfall des virements day-1** (ordre des flux, comptes émetteurs/récepteurs, timing intraday). |
| **L2 — CP financement & certain funds** | Recensement des CP, séquençage signing/closing (étapes 1-2). | Côté **séquençage closing** (ce que `spa-review --pe` S2 lit dans le SPA, L2 le séquence pour le jour J) : conditions de mise à disposition de la DCL, apport de l'ECL, certain funds, MAC bancaire ; **alignement parfait CP du SPA ↔ conditions de financement** — tout désalignement = risque d'exécution non couvert. |
| **L3 — Mécanique de closing LBO (day-1)** | Distinction signing/closing, actes à signer le jour du closing, période intercalaire (étape 2). | Chorégraphie multi-étages : capitalisation de BidCo (souscription/libération) → tirage de la dette dans BidCo → paiement du prix aux vendeurs (funds flow L1) → **rollover** (apport en nature des titres cible *share-for-share* via commissaire aux apports *ou* cash-out puis reinvest) → refinancement + mainlevées concomitantes de la dette existante de la cible → mise en place du security package (L4). Single-step vs split signing/closing (certain funds → souvent simultané). |
| **L4 — Security package & assistance financière** 🔴 (LE piège) | Mainlevées des sûretés grevant les titres cédés (étape 3). | **Security package des prêteurs LBO** : nantissement de compte-titres sur les actions de BidCo, nantissement des actions de la cible détenues par BidCo, nantissement de créances intragroupe, le cas échéant sûretés sur les actifs de la cible. **🔴 Assistance financière — L.225-216 C.com. `[à vérifier]`** : une société ne peut pas avancer des fonds, consentir des prêts ou des sûretés en vue de l'achat de ses propres titres par un tiers → la **cible ne peut pas garantir/financer la dette d'acquisition** contractée par BidCo pour la racheter ; **debt push-down** et **upstream guarantees** s'y heurtent. Intérêt social / abus de biens sociaux sur les sûretés remontantes. Qualifie le **risque** `[review]`, **ne valide jamais un montage**, renvoie au montage fiscal/financier spécialisé. |
| **L5 — Adhésion rollover & post-closing PE** | Registre de mouvements de titres + comptes d'associés, enregistrement, information des tiers (étape 4). | **Accession deed** des managers/fondateurs rollover signé au closing (cohérence `spa-review --pe` S4 / `pacte-associes-review --pe` P1). **Registre de mouvements de titres à deux niveaux** : BidCo (souscriptions equity sponsor + rollover) ET cible (transfert à BidCo) — ne pas oublier le niveau BidCo. Inscription des nantissements de comptes-titres (formalité d'opposabilité, délais). **Closing bible PE** (actes, ECL/DCL exécutées, sûretés inscrites, funds flow exécuté, accession deeds). Enregistrement de la cession + **régime fiscal d'apport du rollover** → `[à vérifier]`, renvoi expert. |

**Gate France/Lux** (hérité du socle) : si l'opération vise une entité / des docs fonds
luxembourgeois → STOP overlay, renvoi conseil luxembourgeois ; l'overlay couvre la jambe FR
(BidCo FR, cible FR, closing FR). **Empilement** : `--pe` et `--distressed` s'empilent sans se
dupliquer (closing LBO sur cible en difficulté).

## 4. Module `references/pe-closing-overlay-fr.md` — structure

Reprend la structure de `pe-spa-gap-overlay-fr.md` :

1. **En-tête + périmètre + note side-aware** (sponsor / cedant), renvoi au socle `pe-overlay-fr.md`
   pour gate / glossaire / anti-fabrication (**non redupliqués**).
2. **Signaux de détection** (auto-proposition hors flag) : *funds flow* / *sources & uses* /
   *equity bridge* ; *ECL* / *DCL* / *certain funds* ; *BidCo* / *NewCo* / *HoldCo* ;
   *debt push-down* / *upstream guarantee* / *nantissement de comptes-titres* ; *rollover* /
   *accession deed* ; *escrow* / *holdback* / *closing bible*. Un seul signal sérieux suffit à
   **proposer** l'overlay.
3. **Doctrine des 5 axes L1-L5** (détaillée, side-aware ; chaque axe : « standard couvre déjà » /
   « overlay PE ajoute »).
4. **Lecture side-aware** (tableau sponsor / cedant, façon synthèse).
5. **Frontières propres** : cible cotée/AMF hors scope ; empilement `--distressed` ; docs
   fonds-only → `fonds-pe-fr-triage` (à venir) ; analyse pacte → `pacte-associes-review --pe` ;
   revue SPA/GAP → `spa-review --pe` / `gap-review --pe` ; instruments → `financement-startup` ;
   **assistance financière / debt push-down** nommés et renvoyés, jamais validés ; régime fiscal
   nommé et renvoyé.
6. **Renvois** : `spa-review --pe` / `gap-review --pe` (amont du deal), `pacte-associes-review --pe`
   (pacte / accession), `financement-startup` (instruments), `asset-vs-share-distress` (cible en
   difficulté), `PI:contrats-pi` (PI substantiel).

## 5. Mécanique d'intégration (Étape PE)

- L'Étape PE ne se déclenche qu'avec `--pe` (flag) ou après **acceptation** d'une auto-proposition
  (signaux §4.2).
- **Bloc dédié « Funds flow / sources & uses »** rendu en **Volet 5** du livrable : le tableau
  sources & uses (lignes structurées, montants en `[à compléter]`) + le waterfall des virements
  day-1. (L1 est l'artefact central et tient mal en ligne de checklist → mise en évidence, façon
  bloc P1 précédence du mode pacte.)
- Les findings des axes **L2-L5 se fondent dans les volets existants** : L2 (CP financement) →
  Volet 1 ; L3 (mécanique LBO) → Volet 2 ; L4 (security package + assistance financière, dont la
  **ligne 🔴 assistance financière**) → Volets 2/3 + findings ; L5 (post-closing PE) → Volet 4.
  Triés par criticité, side sponsor/cedant.
- **Le format de sortie global reste identique** (en-tête confidentialité, note du relecteur,
  4 volets standard + Volet 5 PE, question hors checklist, arbre 5 options, footer A). → zéro
  régression + **réutilisation telle quelle du harnais de scoring** et du dashboard HTML.

## 6. Discipline citations

- Articles déjà dans `references/articles-c-civ-c-com-index.md`, utilisables tels quels :
  **L.228-1** (transfert par virement de compte à compte), **L.651-2** (insuffisance d'actif —
  `[à vérifier]`), **L.228-11** (actions de préférence — `[à vérifier]`), L.227-13/14/15, L.211-17
  CMF, L.232-23.
- **Prérequis de build** : passer **L.225-216 C.com.** (assistance financière) et son **pendant
  applicable à la SAS** `[à vérifier]` par `verifier-citations` ou un Codex effort-high pour
  peupler l'index **avant** rédaction. Tout non vérifié → `[à vérifier]`. Aucun identifiant
  LEGIARTI inventé.
- Post-flight `verifier-citations` du skill : inchangé, tourne sur la sortie complète.

## 7. `Ce skill ne fait pas` — ajouts mode PE

- Ne **chiffre pas** le funds flow : produit la **structure** du tableau sources & uses, jamais les
  montants (`[à compléter]`).
- Ne **valide pas** un montage d'**assistance financière / debt push-down / upstream guarantee** :
  le risque est nommé, qualifié `[review]` et renvoyé ; jamais de validation de structure.
- Ne donne **pas d'avis fiscal** : régime d'apport du rollover, intégration fiscale LBO, droits
  d'enregistrement → `[à vérifier]`, renvoi expert-comptable / `hacienda-fiscal`.
- Ne **structure pas les instruments** du management package (BSA/BSPCE/ADP/AGA/OC) →
  `financement-startup`.
- Ne couvre **pas les documents luxembourgeois** (gate France/Lux).
- Ne **réalise/signe/exécute pas** le closing (acte des parties et de l'approbateur configuré) —
  comme le standard.

## 8. Scoring (calqué SPAPE)

- **Dataset dédié** `plugins/hacienda-droit-affaires/tests/datasets/da-closing-pe/` (scénario
  fictif LBO closing, ground-truth, live-output, verdicts ×3 — pas de pollution du dataset closing
  standard).
- **Protocole blind 4 phases** (CLAUDE.md projet) : Phase 1 fictif (Codex medium) ; Phase 2
  ground-truth + grille (Codex **high**, sans SKILL.md) ; Phase 3 live (Claude natif, sans
  ground-truth) ; Phase 4 scoring (Codex **medium**, sans SKILL.md). Piloté par le wrapper
  `da-scoring.sh` — entrée `closing-pe`, code **`CLOPE1`**. **Commandes lancées par Candy.**
- **Grille ~25 critères** (5 CRITIQUE, 1 par piège planté ; bâtie en Phase 2). Pièges matérialisés :
  - **L1** : réconciliation funds flow incohérente (Σsources ≠ Σuses, ou prix SPA ≠ ligne use)
    non détectée → FAIL.
  - **L4 (piège phâre)** : la cible garantit / finance la dette d'acquisition (assistance
    financière) sans que le risque soit levé → FAIL.
  - **Gate Lux** : traite un doc / une entité Lux comme FR sans poser le gate → FAIL (miroir
    C-025 SPAPE / C-027 PACPE, calibration anti-zone-orpheline).
  - **L5** : oubli du registre de mouvements de titres au **niveau BidCo** (holding) → FAIL.
  - **L2** : désalignement CP du SPA ↔ conditions DCL/ECL non signalé → FAIL.
- **Calibration de gate (pré-emptée)** — leçon « attente affirmative orpheline »
  ([[feedback-gate-calibration-scoring]]) : FAIL = l'erreur qui trompe le client (cible garantit
  la dette d'acquisition ; funds flow qui ne réconcilie pas) ; la mention explicite d'un point =
  bonus, **jamais** une attente affirmative orpheline.
- **Barre release = gate-clean** (même politique que SPAPE : le mode ne trompe pas le client ; les
  MAJEUR variables sont de la profondeur, pas du danger). Cycles **bornés** (variance sur grille
  dense, [[feedback-date-fabrication-scoring-variance]]).

## 9. Mises à jour des forward-refs (`--pe-funds-flow` → `--pe`)

Les modes déjà mergés renvoient au mode closing sous le nom `--pe-funds-flow` ; aligner sur `--pe`
(cohérence avec les 3 frères) :

- `references/pe-spa-gap-overlay-fr.md` : Axe S5 (« funds flow … `closing-checklist-fr --pe-funds-flow` »),
  Frontières propres, Renvois.
- `skills/spa-review/SKILL.md` : Étape 9ter (S5) + bloc « Overlay PE » du livrable.
- `references/pe-overlay-fr.md` : renvois closing « à venir ».

## 10. Intendance

- Bump `closing-checklist-fr` v2.0.0 → **v2.1.0** (mode ajouté).
- Bump version plugin **0.17.0 → 0.18.0** + CHANGELOG.
- Mention du mode dans le README du plugin.
- Branche dédiée `feat/da-pe-closing-overlay` (le travail ne se fait pas sur `main`).
- Vérification build : `npm test`, typecheck, build, branding:check, `git diff --check`, structure
  + count skills inchangé (31), version-lock 0.18.0.

## 11. Hors scope / différé

- `fonds-pe-fr-triage` (volet fonds FR, périmètre AMF/fiscal distinct) — candidat #7, différé.
- Skill neuf `management-package-pe` — candidat #5, garde-fous fiscal/social verrouillés.
- Cible cotée / volet AMF (offre publique) — anticipation v2, hors overlay.

---

## Critères de succès

1. Hors `--pe` : checklist de closing standard **bit-identique** (zéro régression — à vérifier au
   build).
2. Avec `--pe` : les 5 axes exécutés, **Volet 5 funds flow** produit (structure, montants
   `[à compléter]`), sides sponsor/cedant appliqués, gate France/Lux respecté, **assistance
   financière jamais validée** (qualifiée `[review]` et renvoyée), anti-fabrication tenue.
3. Cycle blind dédié **release gate-clean** (les 5 CRITIQUE passent ; pas d'erreur qui trompe le
   client) — même politique que SPAPE.
4. Module `pe-closing-overlay-fr.md` cohérent avec `pe-overlay-fr.md` / `pe-spa-gap-overlay-fr.md`
   (socle partagé réutilisé tel quel), forward-refs des modes frères alignés sur `--pe`.
