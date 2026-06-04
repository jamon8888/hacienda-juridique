# Sparring scoring — `declaration-creance` v2.0.0 — Code ZG7Q5O

**Date** : 2026-06-03
**Méthode** : criteria atomiques **tiered-gated** (24 criteria) — premier cycle blind release-grade de `hacienda-droit-affaires`.
**Marquage** : `[scoring blind protocole D.0]`
- **Phase 2** : Codex GPT-5.5 HIGH, blind (sans SKILL.md) + durcissement humain C-011/C-012 (taux `[à vérifier]`).
- **Phase 3** : session Claude Code fraîche (Opus), sans `ground-truth.md`.
- **Phase 4** : Codex GPT-5.5 medium, sans SKILL.md.

## Résultat agrégé (déterministe — `scripts/tiered_scoring.py`)

| Mesure | Valeur |
|---|---|
| **Statut** | **REJETÉ** (gate CRITIQUE) |
| Score | 0.0 |
| Gate déclencheur | **C-001** (CRITIQUE — forclusion) |
| Majeurs (niveaux ground-truth) | 11/16 PASS = **68,75 %** |
| Mineurs | 3/3 PASS = **100 %** |
| FAIL totaux | 6/24 — C-001, C-008, C-011, C-012, C-020, C-023 |

> Au moment du scoring, la sortie brute affichait `majeur_rate 0.7333 / mineur_rate 0.75`
> à cause d'une **dérive de niveau** (C-023, voir §3.C). Depuis le correctif `aa4d400`,
> le run canonique (`tiered_scoring.py <ground-truth> <verdicts>`) tire le niveau du
> ground-truth et donne bien **68,75 % / 100 %**.

## 1. Lecture honnête — le skill est proche, pas cassé

Le livrable a réussi **4 des 5 gates CRITIQUES** et tous les findings doctrinaux durs :

- C-004 ✅ antérieur/postérieur par **fait générateur** (F-2026-0012 incluse) ;
- C-007 ✅ déclaration adressée au **mandataire** (Me Leroy) ;
- C-010 ✅ **arrêt du cours des intérêts** au jugement ;
- C-016 ✅ créance **chirographaire** + réserve de propriété parallèle ;
- C-017/018/019/021 ✅ revendication : assiette (biens non incorporés), forme (CGV), délai 3 mois, articulation sans double-déduction.

Le **rejet est porté par C-001 seul**, qui combine un point rédhibitoire (l'ancrage du délai — **réussi**) et une **prorogation d'un jour** (le 19 avril 2026 est un dimanche → 20 avril — **manquée**). La sortie affiche « forclusion : 19 avril » : erreur d'un jour, et **conservatrice** (échéance plus précoce = plus sûre pour le créancier).

## 2. Trois classes de findings

### A. Vrais correctifs skill (légitimes — à corriger)

| # | Finding | Critère | Correctif |
|---|---|---|---|
| A1 | Prorogation **mentionnée mais non appliquée** au résultat affiché (19 avril au lieu de 20) | C-001 | forcer l'application de la prorogation 642 CPC au calcul de la date affichée, pas seulement l'évoquer |
| A2 | Mention de **certification sincère** de la déclaration absente | C-008 | ajouter au template Étape 5 |
| A3 | Escalade revendication incomplète : manque « défaut d'acquiescement 1 mois → juge-commissaire » (pourtant ancrée Étape 4) | C-020 | renforcer pour que la **sortie** reproduise l'escalade, pas seulement le SKILL.md |

### B. Calibrage de la grille (le gate est trop large — à recalibrer)

| # | Finding | Action grille |
|---|---|---|
| B1 | **C-001 sur-bundle** : mêle le rédhibitoire (ancrage = publication BODACC, pas jugement/cessation + délai 2 mois) et la prorogation (raffinement d'1 jour). Sous une grille scindée, le livrable **passerait le gate**. | scinder C-001 → **CRITIQUE** (ancrage + délai) + **MINEUR** (prorogation) |
| B2 | **C-012** cale sur une convention d'1 jour (arrêt 11 vs 12 février) | préciser que c'est une convention (intérêts jusqu'à la veille) et tolérer ±1 j, ou abaisser en MINEUR |
| B3 | **C-023 est en aval de C-011** : le total dérive uniquement du placeholder de taux | ne pas compter C-023 comme FAIL indépendant quand sa cause amont (C-011) est déjà FAIL |

### C. Intégrité tooling — dérive de niveau (à corriger dans `tiered_scoring`)

Le juge Phase 4 a reclassé **C-023 de MAJEUR (ground-truth) à MINEUR (verdicts)**. Or
`tiered_scoring.load_verdicts` lit le niveau **depuis le fichier de verdicts** — il subit donc
la dérive du juge. **Correctif** : joindre par `id` et tirer le `niveau` **du ground-truth**
(le juge ne doit fournir que `id` + `verdict`). N'a pas changé le statut ici (gate C-001),
mais fausse les taux. → tâche tooling de suivi.

## 3. Actions priorisées

1. **Tooling** : `tiered_scoring` tire le niveau du ground-truth (join par id), + test de non-régression sur la dérive. — ✅ **fait** (`aa4d400`, `load_scored`).
2. **Grille** : scinder C-001 (B1), assouplir C-012 (B2), neutraliser C-023-en-aval (B3).
3. **Skill** : A1 (prorogation appliquée), A2 (certification sincère), A3 (escalade revendication dans la sortie).
4. **Re-run** un cycle après correctifs → cible **ADMIS / RÉSERVES** sans gate.

**Verdict** : score release-grade **honnête** mais sévère — porté par un artefact de calibrage (C-001 sur-bundle) + une omission d'un jour. La **qualité doctrinale réelle du skill est élevée** (tous les gates de fond réussis). Le cycle a fait son travail : il a révélé simultanément des correctifs skill, un défaut de calibrage de la grille, et un trou d'intégrité du tooling.

---

## Détail par criterion (Phase 4 Codex GPT-5.5 medium)

C-001 — FAIL — Le livrable retient bien le BODACC comme point de départ, mais indique seulement « Date forclusion : 19 avril 2026 » sans proroger au lundi 20 avril 2026 alors que le 19 avril est un dimanche.

C-002 — PASS — Il indique qu’au 28 février 2026 le statut est « 🟢 — envoi normal » avec « Jours restants : 50 jours ».

C-003 — PASS — Il applique « 2 mois (créancier français — métropole) » et ne retient pas de délai augmenté jusqu’en juin.

C-004 — PASS — Il écrit : « Toutes les factures sont nées avant le jugement d'ouverture [...] → créances antérieures, à déclarer au passif », y compris F-2026-0012.

C-005 — PASS — Le tableau retient « 87 450,00 € » HT, « 17 490,00 € » TVA et « Principal déclaré TTC : 104 940,00 € ».

C-006 — PASS — Le livrable distingue les trois factures « Échue, impayée » et F-2026-0012 « Non échue au jour du jugement » pour « 27 390,00 € ».

C-007 — PASS — La déclaration est adressée « À l’attention de Maître Catherine LEROY — SELARL LEROY & ASSOCIÉS — Mandataire judiciaire ».

C-008 — FAIL — Le livrable inclut montant, échéances, sûreté et pièces, mais ne contient pas la mention structurante de certification sincère de la déclaration.

C-009 — PASS — Les pièces listées incluent « CGV [...] + preuve d’acceptation », factures, bons de livraison, mise en demeure + AR, balance auxiliaire et inventaire/photos des lots.

C-010 — PASS — Le livrable précise : « Intérêts contractuels arrêtés au 12 février 2026 » et exclut les intérêts postérieurs.

C-011 — FAIL — Il utilise un « placeholder 7,00 % → taux total contractuel 12,00 % » au lieu du taux légal professionnel indicatif ≈ 2,62 % majoré de cinq points.

C-012 — FAIL — Les périodes sont mal arrêtées : le livrable calcule « 43 j (01/01 → 12/02/2026) » et « 12 j (01/02 → 12/02/2026) », alors que le critère attend un arrêt au 11 février.

C-013 — PASS — Il retient « 40 € par facture échue impayée [...] → 3 factures [...] → 120,00 € ».

C-014 — PASS — Il applique la clause pénale aux seules factures visées par la mise en demeure et chiffre « 15 % × 77 550,00 € TTC = 11 632,50 € ».

C-015 — PASS — Il signale le « pouvoir modérateur art. 1231-5 C.civ. » en cas de clause pénale manifestement excessive.

C-016 — PASS — Il qualifie expressément la créance : « La présente créance est déclarée à titre chirographaire », avec réserve de propriété parallèle.

C-017 — PASS — Il limite la revendication aux marchandises « non incorporées, stockées sur chantier, individualisables [...] 12 000 € HT » et exclut la partie incorporée.

C-018 — PASS — Il indique que la clause figure dans les « CGV [...] acceptées à l’ouverture du compte en 2021 ».

C-019 — PASS — Il distingue l’échéance parallèle de revendication et calcule « Forclusion revendication ≈ 19 mai 2026 », sans la dire tardive.

C-020 — FAIL — Le livrable prévoit une demande à l’administrateur avec copie au mandataire, mais omet la phase « défaut d’acquiescement dans le mois puis saisine du juge-commissaire ».

C-021 — PASS — Il déclare le principal total et précise que la part revendiquée est « déclarée à titre conservatoire [...] sous condition suspensive d’échec de la revendication ».

C-022 — PASS — Il mentionne « Aucun paiement n’est intervenu depuis le 1er janvier 2026 » et n’invente ni compensation ni créance réciproque.

C-023 — FAIL — Le total accessoirisé est « ≈ 117 483,45 € » avec intérêts de « 790,95 € », non cohérent avec le total attendu autour de 117 178,48 €.

C-024 — PASS — Le livrable est présenté comme « NOTES DE TRAVAIL INTERNES — NE CONSTITUE PAS UN AVIS JURIDIQUE » et distingue sources, incertitudes, analyses et validation.

```json
{"criteria":[{"id":"C-001","niveau":"CRITIQUE","verdict":"FAIL"},{"id":"C-002","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-003","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-004","niveau":"CRITIQUE","verdict":"PASS"},{"id":"C-005","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-006","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-007","niveau":"CRITIQUE","verdict":"PASS"},{"id":"C-008","niveau":"MAJEUR","verdict":"FAIL"},{"id":"C-009","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-010","niveau":"CRITIQUE","verdict":"PASS"},{"id":"C-011","niveau":"MAJEUR","verdict":"FAIL"},{"id":"C-012","niveau":"MAJEUR","verdict":"FAIL"},{"id":"C-013","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-014","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-015","niveau":"MINEUR","verdict":"PASS"},{"id":"C-016","niveau":"CRITIQUE","verdict":"PASS"},{"id":"C-017","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-018","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-019","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-020","niveau":"MAJEUR","verdict":"FAIL"},{"id":"C-021","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-022","niveau":"MINEUR","verdict":"PASS"},{"id":"C-023","niveau":"MINEUR","verdict":"FAIL"},{"id":"C-024","niveau":"MINEUR","verdict":"PASS"}]}
```
