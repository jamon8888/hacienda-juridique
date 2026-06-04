# Hacienda Droit des Affaires — Vague procédures collectives, criteria-driven

Date : 2026-06-02
Statut : Proposed (en attente de revue utilisateur)
Scope : Vague d'ancrage doctrinal + couverture du cycle procédures collectives de
`hacienda-droit-affaires`, conduite selon une méthode d'évaluation **criteria
atomiques `tiered-gated`** dérivée de Harvey LAB mais adaptée à la rigueur du
protocole blind D.0 Hacienda.

Specs de référence :
- Plugin DA v1 : `docs/superpowers/specs/2026-05-18-hacienda-droit-affaires-design.md`
- Pivot stratégique : `docs/handoff/2026-06-02-pivot-strategique-da-harvey-lab.md`
- Cartographie de couverture : `docs/backlog/da-coverage-map-2026-06-02.md`
- Protocole blind : `docs/methodology/sparring-scoring-protocol.md`
- Pilote format validé : `plugins/hacienda-droit-affaires/tests/datasets/v2a/rupture-brutale-criteria.md`

---

## 1. Contexte et décisions actées

Le plugin `hacienda-droit-affaires` v0.1.0 (20 skills) a un **cœur M&A
professionnel sur le chemin de revue** (LOI→DD→SPA→GAP→closing), mais :
- aucun ancrage doctrinal vague-D-équivalent ni scoring blind sur ses skills cœur ;
- un **cycle procédures collectives quasi vide** : 1 skill (`declaration-creance`)
  pour 7 étapes (cartographie §2.3) ;
- un protocole d'évaluation blind sérieux mais **lent et coûteux** (~30-40 h manip
  + 12-22 h Codex par vague), parce que non réutilisable d'une vague à l'autre.

Décisions prises en session de brainstorming (2026-06-02) :

| Décision | Choix retenu |
|---|---|
| Priorité | Finaliser DA > benchmark public > 4ᵉ plugin |
| Persona prioritaire | **Ami / procédures collectives** → bifurcation #2-3 de la cartographie |
| Méthode d'éval | Criteria atomiques **`tiered-gated`** (≠ all-pass Harvey) |
| Outillage scoring | Codex + template Phase 4 adapté (option 3) ; harness TS = ultérieur |
| Harvey | Source de **format**, jamais remplacement du protocole blind |

Le format `tiered-gated` a été **validé par self-test** : sur deux livrables
portant un contre-sens doctrinal (safe harbor présenté comme plafond ; préjudice
calculé sur le CA), l'all-pass Harvey donnait 97 %, le `tiered-gated` les rejette
via gate critique. Signal exploitable confirmé.

---

## 2. Objectifs

1. **Méthode** — figer le format d'évaluation criteria atomiques `tiered-gated`
   et adapter le protocole blind D.0 pour le consommer (template Phase 4, layout
   de fichiers), sans rien perdre de la rigueur blind existante.
2. **Qualité** — ancrer doctrinalement `declaration-creance` (skill cœur du cycle
   prioritaire), né avec ses criteria `tiered-gated`.
3. **Couverture** — construire les gaps 🔴 du cycle procédures collectives + le
   gap transversal #1 :
   - #2 — relevé de forclusion L.622-26 (mode sur `declaration-creance`)
   - #3 — prévention des difficultés (mandat ad hoc, conciliation, sauvegarde
     accélérée) — nouveau skill
   - #1 — mise en demeure commerciale (nouveau skill transversal, miroir de
     `mise-en-demeure-pi`)
4. **Hygiène** — corriger les renvois vapor (`hacienda-fiscal` / `hacienda-reglementaire`
   inexistants) et retirer le dataset leaky pré-D.0.

## 3. Non-objectifs

1. **Pas de harness TS** ce cycle — on reste sur Codex + template Phase 4 adapté.
   Le harness `packages/core` est une vague ultérieure, une fois le format figé.
2. **Pas de travail sur les skills frère M&A** (`spa-review --draft`, TSA,
   post-closing, contrôle des concentrations) — bifurcation #4, vague suivante.
3. **Pas de benchmark public** ni d'adaptation de tasks Harvey FR — prématuré
   tant que le cœur n'est pas durci.
4. **Pas de skills procédures collectives au-delà de #2-3** (plan de redressement,
   liquidation, responsabilité dirigeant) — backlog, vague suivante.
5. **Pas de complétion PI** — PI D.2 réduit reste sur sa propre trajectoire.

---

## 4. La méthode — criteria atomiques `tiered-gated`

### 4.1 Principe

Chaque couple (skill, scénario) reçoit un jeu de **criteria atomiques PASS/FAIL**,
à la manière du `task.json` Harvey, mais :
- rédigés en doctrine FR, avec tags Hacienda (`[review]`, `[à vérifier]`, échelle
  🔴🟠🟡🟢) ;
- **étagés en trois niveaux** au lieu de l'all-pass binaire de Harvey.

| Niveau | Sens | Effet score |
|---|---|---|
| `CRITIQUE` | Erreur doctrinale grave / bug connu | FAIL ⇒ livrable **rejeté** (gate) |
| `MAJEUR` | Finding central attendu | compte plein |
| `MINEUR` | Précision / hygiène de forme | pondéré faible |

**Pourquoi `tiered-gated` et pas all-pass.** L'all-pass Harvey (`1.0 ssi tous PASS`)
traite un contre-sens de droit comme un point manquant parmi d'autres. En droit, un
livrable qui dit « le préavis ne peut excéder 18 mois » ou chiffre un préjudice sur
le CA est **à jeter**, peu importe ses 32 autres lignes correctes. Le gate critique
modélise ce jugement d'avocat. C'est une amélioration nette du protocole, pas une
importation aveugle d'Harvey.

### 4.2 Layout de fichiers (par couple skill/scénario)

```
tests/datasets/da-<skill>/
  scenario.md       ← faits fictifs SEULS (input blind, Phase 3)
  ground-truth.md   ← criteria atomiques tiered-gated (Phase 2 blind → atomisés)
  live-output.md    ← sortie du skill (Phase 3, session fraîche)
```

Le `ground-truth.md` **est** la grille de criteria (cf. Harvey : « the match_criteria
text is the evaluation standard », pas de golden answer séparé).

### 4.3 Adaptation du protocole blind

Le protocole D.0 reste intégralement en vigueur (4 phases, séparation blind,
anti-leakage). Deux adaptations :

1. **Template Phase 4** (`docs/methodology/codex-prompt-templates.md`) — passer d'un
   scoring holistique contre un ground-truth en prose à un scoring
   **criterion-par-criterion** : pour chaque criterion, le juge rend PASS/FAIL +
   justification ; agrégation `tiered-gated` (un gate CRITIQUE FAIL ⇒ rejet).
2. **Helper** (`scripts/codex-blind-scoring.py`) — la commande `phase2` doit pouvoir
   demander une vérité terrain **directement au format criteria atomiques** ; la
   commande `phase4` doit appliquer l'agrégation `tiered-gated`.

### 4.4 Garde-fou d'intégrité (acté)

Les criteria d'un skill **ne sont release-grade que s'ils sont issus d'une Phase 2
blind** (Codex HIGH, sans le SKILL.md). Des criteria dérivés d'une vérité terrain
écrite par le constructeur du skill, ou en ayant lu le SKILL.md, sont un
**prototype de format**, marqué `[format-pilote, non release-grade]` — exactement
comme le pilote `rupture-brutale-criteria.md`. Le marquage `[scoring auto-référent]`
existant s'applique sans changement.

---

## 5. La vague procédures collectives

### 5.1 `declaration-creance` — ancrage doctrinal + criteria (skill cœur)

Axes doctrinaux à ancrer explicitement dans le SKILL.md (aujourd'hui sous-spécifiés
selon handoff §4.1) :

- Délais L.622-24 : **2 mois** post-publication BODACC ; **4 mois** créanciers
  hors France métropolitaine (ressortissants éloignés) — règle dure déjà présente,
  à durcir et tester.
- Restauration / relevé de forclusion L.622-26 (lien vers #2).
- Bordereau et admission L.624-2 ; contestation de créance.
- Créances postérieures privilégiées L.622-17 vs créances antérieures.
- Nature et rang : privilèges, sûretés déclarées, créance chirographaire.

Livrables : SKILL.md ancré + `tests/datasets/da-declaration-creance/{scenario,
ground-truth}.md` (criteria `tiered-gated`, ground-truth Phase 2 blind).

### 5.2 #2 — Relevé de forclusion L.622-26 (mode sur `declaration-creance`)

Aujourd'hui : « trame minimale possible, dossier complet renvoyé v1.1+ ». À porter
à un mode `--releve-forclusion` complet :
- Conditions : défaillance non imputable au créancier ; créance omise par le
  débiteur de la liste L.622-6 ; délai de forclusion du recours.
- Livrable : requête argumentée au juge-commissaire.
- Criteria : gate CRITIQUE sur la computation du délai d'action et la base légale.

### 5.3 #3 — Prévention des difficultés (nouveau skill)

Couvre le pré-collectif amiable et son exit ramp procédural :
- Mandat ad hoc (L.611-3) — désignation, confidentialité, mission.
- Conciliation (L.611-4 s.) — durée, accord constaté vs homologué (L.611-8),
  privilège de conciliation / new money (L.611-11).
- **Sauvegarde accélérée (L.628-1 s.)** — procédure ouverte sur la base d'une
  conciliation pour imposer un plan pré-négocié à une minorité ; conditions
  d'éligibilité (seuils, accord majoritaire en germe), délai bref, articulation
  avec la conciliation préalable. C'est la passerelle entre l'amiable et le
  collectif — cohérente avec ce skill.
- Critères de bascule vers une procédure collective de droit commun (état de
  cessation des paiements).
- Side : débiteur (défaut) ou créancier invité à la conciliation.
- Format canonique V1 (sections, modes courts, échelle, pré-flight check-pii,
  post-flight verifier-citations), né avec ses criteria `tiered-gated`.

### 5.4 #1 transversal — Mise en demeure commerciale (périmètre ferme)

Nouveau skill, miroir de `mise-en-demeure-pi` côté contrats/recouvrement B2B.
Comble l'asymétrie PI/DA relevée en cartographie (la mise en demeure existe côté
PI, pas côté DA) et sert directement le recouvrement de l'ami.
- Modes : `--draft` (mise en demeure de payer / d'exécuter) et, le cas échéant,
  graduation vers sommation.
- Axes : qualification de l'inexécution, mise en demeure préalable (1344 C.civ.),
  computation des intérêts moratoires, articulation avec une éventuelle procédure
  collective de la contrepartie (renvoi `declaration-creance`).
- Né avec ses criteria `tiered-gated`. Format canonique V1, mode silencieux
  livrable externe (la mise en demeure est adressée à la contrepartie).

---

## 6. Hygiène (commits dédiés, non additifs)

1. **Retirer le dataset leaky** `tests/datasets/v2a/rupture-brutale-scenario.md`
   (faits + vérité terrain mélangés, non conforme blind) au profit de
   `da-rupture-brutale/{scenario,ground-truth}.md`.
2. **Reformuler les renvois vapor** dans `closing-checklist-fr`, `gap-review`,
   `constitution-societe` : `hacienda-fiscal` / `hacienda-reglementaire` n'existent
   pas → dégrader vers « consulter un expert-comptable / un conseil concurrence »
   jusqu'à création de ces plugins.

---

## 7. Séquencement

```
T0  Méthode      Adapter template Phase 4 + helper pour criteria tiered-gated
T1  Pilote réel  declaration-creance : Phase 2 blind → criteria → ancrage SKILL.md
                 → Phase 3 session fraîche → Phase 4 score (premier score blind DA)
T2  #2           Mode relevé de forclusion L.622-26 + criteria
T3  #3           Skill prévention difficultés (mandat ad hoc, conciliation,
                 sauvegarde accélérée) + criteria
T4  #1           Skill mise en demeure commerciale + criteria
T5  Hygiène      Retrait dataset leaky + reformulation renvois vapor
T6  Clôture      Bump DA v0.1.0 → v0.2.0, CHANGELOG, handoff
```

## 8. Critères d'acceptation de la vague

- `declaration-creance` ancré, avec un score blind `[protocole D.0]` (pas
  `[auto-référent]`), `tiered-gated`, zéro gate CRITIQUE FAIL.
- #2, #3 et #1 livrés au format canonique V1, chacun avec son jeu de criteria et
  un score blind. #3 couvre mandat ad hoc + conciliation + sauvegarde accélérée.
- Template Phase 4 + helper produisent un scoring criterion-par-criterion reproductible.
- Renvois vapor corrigés ; dataset leaky retiré.
- Aucune modification des skills frère M&A ni de `packages/core`.

## 9. Risques

| Risque | Mitigation |
|---|---|
| Phase 2 blind Codex invente des articles FR (procédures collectives) | verifier-citations sur le ground-truth ; GPT-4.5 proscrit |
| Sur-ingénierie du template Phase 4 | rester minimal — PASS/FAIL + niveau, agrégation simple |
| Périmètre #3 large (mandat ad hoc + conciliation + sauvegarde accélérée) | borner aux 3 dispositifs retenus ; exclure RJ/LJ de droit commun (vague suivante) ; sauvegarde accélérée traitée comme exit ramp de la conciliation, pas comme procédure collective autonome |
| Coût de la Phase 2 blind par skill | accepté — c'est l'asset réutilisable qui amortit les re-scorings |
