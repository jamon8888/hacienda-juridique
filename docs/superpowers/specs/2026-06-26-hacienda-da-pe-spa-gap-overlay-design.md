# Design — overlay `--pe` (side sponsor) sur `spa-review` / `gap-review`

**Date :** 2026-06-26
**Plugin :** `plugins/hacienda-droit-affaires` (DA)
**Version cible :** v0.16.0 → **v0.17.0** (skills inchangés : **31** — c'est un mode, pas un skill)
**Branche :** `feat/da-pe-spa-gap-overlay`
**Statut :** design validé (brainstorm) — à transformer en plan d'implémentation.
**Précédents isomorphes :** overlay `--distressed` sur spa/gap (SPADIS ADMIS 1,0) ·
overlay `--pe` sur `pacte-associes-review` (PACPE1 ADMIS 1,0).

---

## 1. Intention & périmètre

Étendre la lentille Private Equity du `pacte-associes-review --pe` aux **deux revues
d'acte du deal PE** : le **SPA** (côté sponsor/acquéreur agissant via BidCo) et la **GAP**
(sous l'angle W&I / disclosure). Aujourd'hui un SPA ou une GAP de LBO se relit avec
`spa-review` / `gap-review` **standard**, qui ne voient pas les risques PE-spécifiques
(mécanisme de prix locked box vs completion accounts, certain funds, articulation
GAP/W&I/disclosure, recours limité côté sponsor cédant, rollover/management package).

L'overlay `--pe` ajoute cette **lentille** aux deux revues, **sans nouveau skill**.

- **1ʳᵉ vague = side sponsor** (acquéreur). `--side=cedant` est ouvert mais secondaire.
- **Hors `--pe`, les deux revues standard sont strictement inchangées** (zéro régression
  à vérifier au build : toutes les modifs SKILL.md sont additives / `--pe`-conditionnelles).
- **Count structure inchangé (31)** — pas de nouveau skill.

## 2. Architecture (décision validée : module frère)

Isomorphe à l'overlay `--distressed` (qui a son propre `references/distressed-overlay-fr.md`).

- **Nouveau module frère** `references/pe-spa-gap-overlay-fr.md` portant les **axes
  SPA/GAP-spécifiques**. Il **référence** `pe-overlay-fr.md` (le module pacte ADMIS 1,0)
  pour les briques **partagées, lues telles quelles** :
  - **Gate d'application France/Lux** (jambe FR ; docs fonds Lux hors périmètre) ;
  - **Glossaire PE FR praticien ~100 termes** (contient déjà locked box, completion
    accounts, leakage, certain funds, ECL/DCL, W&I, disclosure letter, security for
    claims, funds flow, sources & uses, rollover…) ;
  - **Anti-fabrication PE** (requalif fiscale/sociale nommée/renvoyée ; no quantum ;
    léonine/gestion de fait en `[review]` ; instruments renvoyés ; dates relatives ;
    articles non vérifiés `[à vérifier]` ; Lux hors périmètre).
- **Zéro édition de la doctrine de `pe-overlay-fr.md`** → zéro régression sur le skill
  pacte déjà scoré ADMIS 1,0. Seule modif tolérée sur ce fichier : sa section
  « Renvois » (la forward-ref `spa-review --pe (à venir — candidat #2)` devient live).

> **Pourquoi pas étendre `pe-overlay-fr.md` en place ?** Il deviendrait un fourre-tout
> pacte+SPA+GAP, son titre (« pour revue pacte d'associés ») mentirait, et on toucherait
> le module scoré — contre la consigne « réutilisable tel quel » du critère #4 de la
> spec PE pacte.
>
> **Pourquoi pas deux modules séparés (SPA et GAP) ?** La GAP est un sous-axe du SPA ;
> le couplage SPA↔GAP est fort. Le précédent `--distressed` a préféré **un** module pour
> les deux revues. Un seul module frère évite la duplication et la double maintenance.

### Wiring (mirroir exact du `--distressed`)

| | spa-review | gap-review |
|---|---|---|
| Intake | item Mode : `--pe --side=sponsor\|cedant` (charge le module frère) | item Mode : `--pe` (side sponsor par défaut, `--side` ouvert) |
| Étape conditionnelle | **Étape 9ter — Overlay PE** (insérée après la 9bis distressed) | **Étape 6ter — Overlay PE (matrice GAP/W&I/disclosure)** (après la 6bis) |
| Section livrable | `## Overlay PE (si --pe)` (après `## Overlay difficulté`) | `## Overlay PE (si --pe)` (après `## Overlay difficulté`) |
| `Ce skill ne fait pas` | lignes PE additives | lignes PE additives |

- **Détection-qui-propose** hors flag : réutilise les **signaux de détection PE** déjà
  définis dans `pe-overlay-fr.md` (sponsor / BidCo / management package / rollover /
  ratchet / liquidation preference…). Un signal sérieux **propose** l'overlay, ne
  l'impose jamais (cohérent CLAUDE.md plugin §7 « échafaudage pas œillères »).
- **Préfixe `/h-da:` uniquement.** Les deux SKILL.md traînent l'ancien préfixe
  `/h-droit-affaires:` dans leur contenu existant — **ne pas** le propager, **ne pas**
  mass-fixer l'existant (hors scope) ; vérifier que le test de structure reste vert.
- **Squelette V2 préservé** : l'ordre des headings est imposé par
  `hacienda-droit-affaires-cowork-structure.test.ts`. Les étapes 9ter / 6ter et les
  sections livrable PE s'insèrent **après** leurs homologues distressed, de façon
  additive, sans casser l'ordre canonique. À vérifier au build (le test peut être
  tolérant à l'insertion ou hardcoder des numéros — adapter l'insertion en conséquence).

## 3. Le nouveau module — axes (side-aware sponsor)

Le module est **side-aware** (lecture inversée sponsor-acquéreur / cédant). 1ʳᵉ vague
centrée **sponsor**. Chaque axe énonce d'abord « ce que la revue standard couvre déjà »
puis « ce que l'overlay PE ajoute », à l'identique du module pacte.

### SPA `--pe` — axes S1–S5

- **S1 — Mécanisme de prix PE.** Locked box (date de référence économique, no-leakage
  covenant, permitted leakage négocié ligne à ligne, remboursement du leakage **hors
  plafond GAP** côté acquéreur `[review]`) **vs** completion accounts (ajustement dette
  nette / BFR, définitions, sample statement, litiges post-closing). Lecture sponsor :
  lequel protège l'acquéreur ; cohérence avec le funds flow (S5).
- **S2 — Certain funds & financement.** CP financement, equity commitment letter (ECL) /
  debt commitment letter (DCL), certain funds, BidCo SPV insolvency-remote → **recours
  vendeur limité**. Une condition de financement résiduelle = **risque d'exécution**
  `[review]`.
- **S3 — MAC & période intercalaire.** MAC PE (définition + exclusions market-wide),
  interim covenants (équilibre contrôle acquéreur / gestion normale), articulation
  antitrust / IEF (contrôle des investissements étrangers) / consultation CSE en
  conditions suspensives `[à vérifier]`.
- **S4 — Rollover & management package.** Séquence cash-out → reinvest → adhésion au
  pacte (*accession deed*) ; cohérence SPA (representations, non-compete vendeur) ↔ pacte
  d'investissement → **renvoi `pacte-associes-review --pe`** ; instruments (BSA/BSPCE/
  ADP/AGA/OC) → **renvoi `financement-startup`** ; **requalification fiscale/sociale du
  management package nommée et renvoyée, jamais traitée au fond**.
- **S5 — Garanties, W&I & funds flow.** Articulation GAP / W&I → **renvoi `gap-review
  --pe`** ; security for claims face à un acheteur BidCo SPV / un cédant sortant ;
  funds flow / sources & uses (réconciliation au closing) → **renvoi
  `closing-checklist-fr --pe-funds-flow`** (à venir — candidat #4).

### GAP `--pe` — axes W1–W3 (angle W&I / disclosure)

- **W1 — Matrice GAP / W&I / disclosure.** Ce que la police W&I couvre **vs** la GAP ;
  exclusions de police (known issues, forward-looking, environnement, transfer pricing) ;
  alignement rétention / de minimis / basket / cap **police ↔ GAP** ; disclosure letter
  comme **outil** contre les exclusions « known ».
- **W2 — Recours limité côté cédant sponsor.** GAP « nil recourse / 1 € » adossée à une
  W&I (le sponsor veut une **sortie propre** ; l'acquéreur s'appuie sur la police, pas
  sur le covenant du cédant) ; security for claims ; sandbagging / anti-sandbagging
  `[review]`.
- **W3 — Discipline disclosure FR.** Articulation disclosure letter ↔ **devoir
  d'information 1112-1 C.civ** `[à vérifier]` ; fair disclosure standard ; data room
  comme disclosure ; articulation avec la **réticence dolosive 1137 C.civ** `[à vérifier]`.

> Les axes réutilisent intégralement le vocabulaire déjà glossé dans `pe-overlay-fr.md` ;
> le module frère **ne re-glosse pas**, il renvoie au glossaire partagé.

## 4. Gate / frontières / anti-fabrication

**Hérités du module partagé `pe-overlay-fr.md` (lus, non redupliqués) :**

- **Gate France/Lux** : l'overlay couvre la **jambe française** (cible FR, SPA/GAP/pacte/
  management package régis par droit FR, closing FR). Entité visée luxembourgeoise ou
  docs constitutifs du fonds Lux → **STOP overlay**, renvoi conseil luxembourgeois.
- **Anti-fabrication PE** : requalif fiscale/sociale **nommée et renvoyée** ; **no
  quantum** (pas de chiffrage exposition / taux) ; léonine & gestion de fait en
  `[review]` (jamais conclure) ; instruments renvoyés à `financement-startup` ; **dates
  relatives** (jalons / closing en semaines, pas de date calendaire fabriquée) ;
  articles non vérifiés en source primaire restent `[à vérifier]`, aucun LEGIARTI
  inventé ; docs Lux hors périmètre.

**Frontières propres au module frère :**

- **Cible cotée / AMF** → hors scope (anticipation v2).
- **Cible en difficulté** → articulation avec l'overlay `--distressed` : les deux
  overlays peuvent **s'empiler** sur un même SPA/GAP (deal PE *sur* une cible distressed) ;
  signaler l'articulation, ne pas dédoubler la doctrine distressed (période suspecte,
  garantie de la garantie restent dans `distressed-overlay-fr.md`).
- **Docs fonds-only** (règlement / LPA / side letters d'un FCPR/FPCI/SLP) → hors périmètre
  → `fonds-pe-fr-triage` (à venir — candidat #7).
- **Spécifique acte** : ne pas chiffrer le leakage ni l'ajustement de prix
  (`[à compléter]`) ; ne pas dater le closing ni les jalons (semaines relatives).

**Articles index** : 1112-1, 1137 C.civ (et tout article PE nouvellement cité) doivent
exister dans `references/articles-c-civ-c-com-index.md` ; à défaut → ajout en
`[à vérifier]` (pas de LEGIARTI inventé).

## 5. Scoring, surface, version

### Scoring (décision validée : miroir distressed)

- **Un cycle blind** sur le chemin dense `spa-review --pe --side=sponsor` (code 6 car.
  `SPAPE1`) — valide la doctrine du module frère sur l'acte le plus dense.
- **Contrôle live miroir** sur `gap-review --pe` (sanity, **pas** de cycle blind complet
  — même module). Dataset `tests/datasets/da-spa-review-pe/scenario.md`.
- Protocole blind 4 phases (CLAUDE.md racine) ; checkpoint gates avant Phase 3
  (gate-piège pas gate-recall ; pas d'asymétrie liste conjonctive / silence orphelin —
  cf. `[[feedback-gate-calibration-scoring]]`). Lancement des commandes scoring **côté
  Candy** via le wrapper (cf. `[[feedback-token-economy-codex]]`,
  `[[feedback-scoring-wrapper-workflow]]`).

### Surface livrée

- `references/pe-spa-gap-overlay-fr.md` (créé : axes S1–S5 + W1–W3, side-aware,
  renvois au module partagé pour gate/glossaire/anti-fabrication, renvois sortants).
- `skills/spa-review/SKILL.md` : intake `--pe --side=` + Étape 9ter + section livrable
  `## Overlay PE` + lignes `Ce skill ne fait pas`.
- `skills/gap-review/SKILL.md` : intake `--pe` + Étape 6ter (matrice W&I) + section
  livrable + lignes `Ce skill ne fait pas`.
- `references/pe-overlay-fr.md` : **uniquement** la section « Renvois » (forward-ref
  `spa-review --pe` / `gap-review --pe` passées de « à venir » à live).
- `README.md` : mention du mode `--pe` sous spa-review / gap-review.
- `scripts/da-scoring.sh` : entrée de scoring distincte `spa-review-pe` (code défaut
  `SPAPE1`), pointant `/h-da:spa-review --pe --side=sponsor` + dataset.
- Bump **v0.16.0 → v0.17.0** (plugin.json / version.json / mcp-server + autres
  emplacements de lock) + CHANGELOG.

## 6. Ce que l'overlay ne fait pas

- **Refaire la revue pacte** (gouvernance, leaver, drag) → `pacte-associes-review --pe`.
- **Structurer / rédiger les instruments** du management package → `financement-startup`.
- **Traiter au fond** la requalification fiscale/sociale (nommée et renvoyée).
- **Chiffrer** le leakage / l'ajustement de prix / l'exposition (`[à compléter]`).
- **Dater** le closing ou les jalons (semaines relatives).
- **Couvrir** les documents constitutifs du fonds luxembourgeois (gate France/Lux).
- **Couvrir** les cibles cotées / le volet AMF (v2).
- **Re-traiter** la doctrine distressed (période suspecte, garantie de la garantie) →
  `--distressed` (les overlays s'empilent, ne se dupliquent pas).

## 7. Hors scope (futurs cycles PE)

- `closing-checklist-fr --pe-funds-flow` (candidat #4).
- Skill neuf `management-package-pe` (candidat #5 — garde-fous fiscal/social verrouillés).
- `fonds-pe-fr-triage` (candidat #7 — volet fonds FR, périmètre AMF/fiscal distinct).
- Side `cedant` approfondi (1ʳᵉ vague = sponsor) ; cibles cotées / AMF (v2).
- Cycle blind dédié `gap-review --pe` si le contrôle live miroir révèle un delta
  doctrinal propre non couvert par le module frère.

## Critères de succès

1. Hors `--pe` : revue SPA / GAP standard **inchangée** (zéro régression — à vérifier au build).
2. Avec `--pe` : axes S1–S5 (SPA) et W1–W3 (GAP) exécutés, side sponsor appliqué, gate
   France/Lux respecté, anti-fabrication tenue, renvois corrects.
3. Module frère **ne reduplique pas** le gate / glossaire / anti-fabrication de
   `pe-overlay-fr.md` (les lit par renvoi).
4. Cycle blind `SPAPE1` **ADMIS gate-clean** (objectif 1,0, dans la lignée des ADMIS au
   1ᵉʳ cycle) ; contrôle live miroir gap-review propre.
