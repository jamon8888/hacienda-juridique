# Sparring scoring — `declaration-creance` v2.0.0 — Code IKJ4AF (re-score post A+B)

**Date** : 2026-06-03
**Méthode** : criteria atomiques tiered-gated (25 criteria) — **re-score après correctifs A (skill) + B (grille)**.
**Comparé à** : cycle ZG7Q5O (1er cycle, REJETÉ).
**Marquage** : `[scoring blind protocole D.0]` — Phase 3 fraîche sur **skill corrigé** (cache resynchronisé) ; Phase 4 Codex GPT-5.5 medium sans SKILL.md. **Réserve** : grille recalibrée par B (même acteur) → mesure du **gain**, pas un score pleinement indépendant (cf. ZG7Q5O §C). Grilles différentes : ZG7Q5O = 24 criteria (pré-B), IKJ4AF = 25 (post-B).

## Résultat agrégé (déterministe, niveau autoritatif depuis le ground-truth)

| Mesure | ZG7Q5O (avant) | **IKJ4AF (après A+B)** |
|---|---|---|
| **Statut** | REJETÉ (gate) | **INSUFFISANT** |
| Score | 0.0 | **0.8** |
| Gate CRITIQUE | **C-001 FAIL** | **aucun ✅** |
| Majeurs | 11/16 (68,75 %) | **12/16 (75 %)** |
| Mineurs | 3/3 (100 %) | **4/4 (100 %)** |
| FAIL | 6 | **4** (C-011, C-012, C-014, C-023) |

## Le gain — ce que A+B ont fermé

- **Gate forclusion fermé** : C-001 PASS (ancrage publication BODACC + 2 mois) **et** C-025 PASS (prorogation appliquée — « Date forclusion retenue lundi 20 avril 2026 »). Le split B + le correctif A1 fonctionnent ensemble.
- **C-008 PASS** (certification sincère présente) — était **FAIL** en ZG7Q5O → correctif A2 validé.
- **C-020 PASS** (revendication : LRAR administrateur Me Bravard, acquiescement 1 mois, puis juge-commissaire) — était **FAIL** en ZG7Q5O → correctif A3 validé.

→ **Les 3 correctifs A sont validés en aveugle**, et le livrable n'est **plus rejeté**. Trajectoire confirmée.

## Finding D (nouveau) — faiblesse de chiffrage (Étape 3, sommes)

Les 4 FAIL restants forment **un seul cluster : le calcul des sommes**.

| Criterion | Problème | Cause |
|---|---|---|
| C-011 | taux légal **inventé** « ≈ 12 % → +5 = ~17 % » | devrait être ≈ 2,62 % (pro) **tagué `[à vérifier]`**, pas un chiffre affirmé |
| C-012 | intérêts « ~700-750 € » hors cadrage (≈ 485,98 €) | **en aval** du mauvais taux C-011 |
| C-014 | clause pénale sur « 64 625 € HT = 9 693,75 € » | **mauvaise base** : attendu 15 % × 77 550 € TTC échu = 11 632,50 € |
| C-023 | total « ≈ 115 450 € » **incohérent avec ses propres composantes** | arithmétique non auto-vérifiée |

**Correctif prochaine itération (Étape 3)** : (a) **ne jamais inventer un taux légal** — forcer `[à vérifier]` + le bon concept (taux pro, pas conso) ; (b) caler la clause pénale sur la **base stipulée** (principal TTC échu) de façon constante ; (c) **auto-vérifier l'arithmétique du total** (somme des composantes affichées). C'est un finding skill propre, distinct de A/B.

## Note de variance

**C-014 était PASS en ZG7Q5O, FAIL en IKJ4AF** — A n'a pas touché la clause pénale : c'est de la **variance run-to-run** sur le calcul. Argument pour rendre le skill plus déterministe sur les maths, ou échantillonner 2-3 Phase 3 sur les criteria de chiffrage avant de conclure.

## Verdict

**A+B validés sans ambiguïté** : gate doctrinal critique passé, 3 findings fermés, REJETÉ → INSUFFISANT (0.0 → 0.8). Reste **un cluster cohérent (chiffrage, finding D)** pour la prochaine itération. Pas encore release-grade (INSUFFISANT < RÉSERVES), mais la boucle a fait exactement son travail : **confirmer le correctif et isoler la faiblesse suivante**.

---

## Détail par criterion (Phase 4 Codex GPT-5.5 medium)

C-001 — PASS : le livrable retient « Date publication BODACC 19 février 2026 » et « Échéance brute 19 avril 2026 ».

C-002 — PASS : il indique « Aujourd'hui 28 février 2026 » et « envoi normal », donc pas de forclusion ni relevé requis.

C-003 — PASS : il applique « 2 mois (créancier France métropolitaine...) » et ne retient pas de délai augmenté.

C-004 — PASS : il inclut F-2026-0012 comme « non échue au jugement » mais « créance antérieure ».

C-005 — PASS : il retient « Total principal ... 87 450,00 ... 17 490,00 ... 104 940,00 ».

C-006 — PASS : il distingue les trois factures « échue[s] » et F-2026-0012 « non échue au jugement ».

C-007 — PASS : le courrier est adressé « À : Maître Catherine LEROY ... Mandataire judiciaire ».

C-008 — PASS : le livrable inclut montant, échéances, réserve de propriété, certification sincère et « Pièces jointes ».

C-009 — PASS : le bordereau prévoit factures, bons de livraison, CGV acceptées, balance, mise en demeure/AR, et évoque l’identification des lots « non incorporée et individualisable ».

C-010 — PASS : les intérêts sont « arrêtés au 12 février 2026 » et F-2026-0012 est à « néant ».

C-011 — FAIL : le livrable indique « taux légal pro S1 2026 ≈ 12 % → +5 pts = ~17 % », alors que la grille attend le taux professionnel indicatif ≈ 2,62 % tagué à vérifier.

C-012 — FAIL : même si la méthode est limitée aux trois factures échues, l’ordre de grandeur annoncé « ~700-750 € » découle du mauvais taux et ne correspond pas au cadrage attendu ≈ 485,98 € indicatif.

C-013 — PASS : il retient « 3 × 40 € = 120,00 € » et exclut F-2026-0012.

C-014 — FAIL : le livrable calcule la clause pénale sur « 64 625 € HT = 9 693,75 € », alors que le critère attend 11 632,50 € si calculée sur le principal TTC de 77 550,00 €.

C-015 — PASS : il signale une « possible modération par le juge si manifestement excessive (art. 1231-5 C.civ.) ».

C-016 — PASS : il qualifie le rang comme « chirographaire ».

C-017 — PASS : il limite la revendication à « uniquement la fraction non incorporée... 12 000 € HT » et exclut la fraction incorporée.

C-018 — PASS : il précise que les « CGV art. 4 acceptées à l'ouverture du compte... écrit antérieur à la livraison ».

C-019 — PASS : il distingue l’action en revendication et retient « délai distinct de 3 mois... échéance brute 19 mai 2026 ».

C-020 — PASS : il prévoit LRAR à « Me Thomas BRAVARD, administrateur judiciaire », acquiescement sous un mois, puis juge-commissaire.

C-021 — PASS : il dit « déclarer la créance pour son montant total TTC ; n'ajuster qu'en cas de restitution effective ».

C-022 — PASS : la certification indique aucun « paiement, novation ni compensation » à ce jour.

C-023 — FAIL : la ventilation existe, mais le total « ≈ 115 450 € » est incohérent avec ses propres composantes affichées, même avant intérêts.

C-024 — PASS : le livrable utilise des réserves « [à vérifier] », « [review] », pose des questions et ne présente pas la sortie comme conseil final.

C-025 — PASS : il proroge « Date forclusion retenue lundi 20 avril 2026 ».

```json
{"criteria":[{"id":"C-001","niveau":"CRITIQUE","verdict":"PASS"},{"id":"C-002","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-003","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-004","niveau":"CRITIQUE","verdict":"PASS"},{"id":"C-005","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-006","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-007","niveau":"CRITIQUE","verdict":"PASS"},{"id":"C-008","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-009","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-010","niveau":"CRITIQUE","verdict":"PASS"},{"id":"C-011","niveau":"MAJEUR","verdict":"FAIL"},{"id":"C-012","niveau":"MAJEUR","verdict":"FAIL"},{"id":"C-013","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-014","niveau":"MAJEUR","verdict":"FAIL"},{"id":"C-015","niveau":"MINEUR","verdict":"PASS"},{"id":"C-016","niveau":"CRITIQUE","verdict":"PASS"},{"id":"C-017","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-018","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-019","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-020","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-021","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-022","niveau":"MINEUR","verdict":"PASS"},{"id":"C-023","niveau":"MAJEUR","verdict":"FAIL"},{"id":"C-024","niveau":"MINEUR","verdict":"PASS"},{"id":"C-025","niveau":"MINEUR","verdict":"PASS"}]}
```
