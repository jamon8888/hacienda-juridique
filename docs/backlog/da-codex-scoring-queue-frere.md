# DA — File de scoring Codex frère M&A (état + priorités)

**But** : prioriser le scoring blind du persona **frère M&A trade** (vague suivante,
hors livrable v0.2.0 déjà sorti). Critère de priorité retenu : **fréquence d'usage
réelle par un avocat M&A trade**, pondérée par l'exposition au risque (jugement avocat,
parties binding du deal).

**Créé** : 2026-06-05 (après release DA v0.2.0, persona ami).

---

## Critère de priorité

Cycle de vie d'un deal trade : NDA → LOI/term sheet → due diligence → SPA → GAP →
closing → post-closing. Tous les skills frère sont sur quasi **chaque** deal ; on
départage par l'**exposition** (parties binding = prix, garanties, indemnisation =
jugement avocat max).

## File frère (M&A trade)

| Rang | Skill | Scénario blind | Grille (P2) | État scoring | Critère dominant |
|---|---|---|---|---|---|
| **F1** | **spa-review** | ✅ `da-spa-review/scenario.md` | ✅ `ground-truth.md` (Codex, 40 criteria, 3 gates) | ✅ scoré 3× — **E1YT74 : RÉSERVES 0,974** (gate-clean ; NQ4FOV était INSUFFISANT 0,71, 5FDM2A REJETÉ) | **G1 + G2 + G3 fermés.** G2 a levé 0,71→0,974 (10 criteria FAIL→PASS : CP 1304/1304-3, leakage hors plafond, formalités SAS L.227-15 / CSE L.2312-8-37 / sanctions 1231-5). Reste C-035 (formalités closing). **Releasable RÉSERVES** |
| **F2** | **gap-review** | ✅ `da-gap-review/scenario.md` | ✅ `ground-truth.md` (32 criteria, 4 gates) | ✅ scoré 2× — **SFZLV2 : RÉSERVES** (0,904, gate-clean ; E4II4R était REJETÉ) | **H1 fermé** (1130/1137/1104 dol + L.176 LPF fiscal + L.171-8 ICPE → C-006/C-013/C-019 PASS). **Releasable RÉSERVES.** H2 ouvert (3 majeurs, v0.3.0) |
| **F3** | **loi-term-sheet** | ✅ `da-loi-term-sheet/scenario.md` | ✅ `ground-truth.md` (22 criteria, 3 gates) | ✅ scoré 1× — **AMDZQA : RÉSERVES** (0,90, gate-clean **dès le cycle 1, sans correctif**) | Skill nativement bien ancré (1104/1112/1112-1/1304-2). **Releasable RÉSERVES.** I1 ouvert (2 majeurs, v0.3.0) |
| **F4** | **due-diligence-dataroom** | ✅ `da-dd-dataroom/scenario.md` (data-room 7 thèmes) | ✅ `ground-truth.md` (**Codex**, 30 criteria, 5 gates) + `ground-truth-deepseek.md` (30 criteria, 7 gates) | ✅ scoré 2× sur ICOALK — **Codex : ADMIS 1,0** / **DeepSeek : INSUFFISANT 0,818** — **gate-clean robuste dans les deux** | Les 7 findings matériels captés (7/7 DeepSeek, 5/5 Codex). **Pas de correctif** (Codex ne fait échouer aucun criterion). K1 = améliorations qualité optionnelles. **Divergence 0,818↔1,0 = finding méthodo** |
| **F5** | **pacte-associes-review** | ✅ `da-pacte-associes/scenario.md` | ✅ `ground-truth.md` (**Codex**, 17 criteria, 4 gates) + `ground-truth-deepseek.md` (13, 3 gates) | ✅ **RLHOJQ : ADMIS 1,0 protocole** (grille Codex + score Codex, après L1). Historique : DeepSeek 1X0IGW ADMIS 1,0 **gonflé** → reconfirmation Codex **REJETÉ** (C-009 démasqué) → **L1** → ADMIS 1,0 | **L1 fermé** : ancrage 1844-1 (clause léonine) sur le leaver confiscatoire, en plus de 1843-4/proportionnalité. Le 1,0 DeepSeek cachait un vrai trou que seul le Codex a vu |
| **F6** | **closing-checklist-fr** | ✅ `da-closing-checklist/scenario.md` | ✅ `ground-truth.md` (**Codex**, 22 criteria, 3 gates) | ✅ scoré 2× sur WK8LZM — **DeepSeek ET Codex : RÉSERVES 0,95 identique** (gate-clean ; XLNZ2E était REJETÉ). Grille Codex, score confirmé aux **deux** scoreurs | **J1 fermé** (agrément nullité L.227-15 + transfert L.228-1/L.211-17 → C-005/C-014 PASS). **Releasable RÉSERVES — confirmé protocole.** J2 ouvert (1 majeur, v0.3.x) |

> ⚠️ Les scénarios `v2-spa/` et `v1.1/` sont des **fixtures de cycle non-blind**
> (ils embarquent la vérité terrain + critères de succès). Chaque cycle frère
> nécessite de **reconstruire un `scenario.md` blind** (faits seuls, cycle-agnostique :
> pas de code de cycle, pas de findings) puis P2 (Codex HIGH) + P3 + P4.

## Findings ouverts

| Skill | Finding | État |
|---|---|---|
| spa-review | **G1 — ancrage doctrinal** : earn-out indéterminable (1591/1163 nullité, pas seulement 1104), finding DD matériel (devoir d'info 1112-1 + vices 1130/1137) | ✅ **fermé (NQ4FOV)** : C-013 + C-029 FAIL→PASS en aveugle, gates ouverts |
| spa-review | **G2 — couverture (v0.3.0, non gating)** : (A) objectivité des CP acquéreur financement/diligences → potestativité 1304/1304-3 (C-004/C-005) ; (B) mécanique leakage euro-pour-euro hors plafond GAP (C-010) ; (C) formalités SAS (statuts agrément/préemption + registres mouvements titres, nullité L.227-15) + social CSE (L.2312-8/37, L.23-10-7) + sanctions efficaces avec modération 1231-5 (C-034/C-036/C-038) | ✅ **fermé (E1YT74)** : 6 criteria FAIL→PASS, spa-review 0,71→0,974 RÉSERVES |
| spa-review | **G3 (mineur)** — hygiène renvoi : le skill a produit `/hacienda-propriete-intellectuelle:audit-pi-ma` (namespace long, entry point non vérifié) au lieu de `/h-pi:contrats-pi` | ✅ **fermé (E1YT74)** : renvoi PI passé au namespace court `/h-pi:` |
| gap-review | **H1 — ancrage doctrinal** : dol/fraude non-écartables (1130/1137/1104), durée fiscale sur droit de reprise LPF (L.176 TVA / L.169 IS), ICPE inexécutée = risque public L.171-8 C.env (exécution d'office), pas coût travaux | ✅ **fermé (SFZLV2)** : C-006/C-013/C-019 FAIL→PASS en aveugle, RÉSERVES 0,904 |
| gap-review | **H2 — polish (v0.3.0, non gating)** : C-014 (social), C-020 (DD-4 RGPD), C-026 (procédure de réclamation) | ⏳ 3 majeurs résiduels |
| loi-term-sheet | **I1 — polish (v0.3.0, non gating)** : C-012 (confidentialité — durée/restitution/destruction), C-019 (devoir d'information précontractuelle 1112-1) | ⏳ 2 majeurs résiduels |
| **méta M&A** | **pattern NON confirmé** : F1+F2 échouaient sur l'ancrage d'article ; **F3 passe ses gates dès le cycle 1**. Le défaut d'ancrage était **spécifique** à spa-review/gap-review, pas systémique → **pas de consigne transversale CLAUDE.md** nécessaire | ✅ tranché : correctifs skill ciblés suffisent |
| closing-checklist-fr | **J1 — ancrage doctrinal** : sanction nullité de l'agrément statutaire violé (L.227-15), transfert d'actions par virement de compte à compte (L.228-1 al.9 C.com + L.211-17 CMF, pas seulement registre/R.228-10) | ✅ **fermé (WK8LZM)** : C-005/C-014 FAIL→PASS, RÉSERVES 0,95 |
| closing-checklist-fr | **J2 — polish (v0.3.x, non gating)** : C-017 (formalité fiscale d'enregistrement) | ⏳ 1 majeur résiduel |
| due-diligence-dataroom | **K1 (optionnel, non gating)** : agréger les passifs en exposition totale (URSSAF+litige), recos GAP chiffrées sur findings, en-tête confidentialité canonique, placement des tags de provenance, fragilité tacite reconduction contrat client | ⏳ révélé par grille DeepSeek, NON reproché par grille Codex → nice-to-have, pas correctif |
| pacte-associes-review | **L1 — ancrage doctrinal** : sur un leaver confiscatoire « pour toute cause » sans distinction good/bad, pinner **1844-1 (clause léonine)** en plus de 1843-4/proportionnalité ; note good/bad leaver ajoutée aux « points de fond » | ✅ **fermé (RLHOJQ)** : C-009 FAIL→PASS sous grille Codex, ADMIS 1,0 |
| **méthodo DIVERGENCE/CONTRÔLE (F4+F5+F6)** | **Conclusion raffinée par 3 cas** : (a) **F4** grilles différentes (5 vs 7 gates) → divergence 0,818 vs 1,0 ; (b) **F5** grille DeepSeek lean vs Codex riche → 1,0 vs REJETÉ ; (c) **F6 = variable de contrôle** : **MÊME grille (Codex)**, scoreurs DeepSeek vs Codex → **0,95 = 0,95 identique**. ⇒ La variance vient de la **construction de la grille**, **PAS du scoreur** (neutre à grille fixe). **Leçon : se fier aux gates ; le chiffre est fiable si la grille est Codex/robuste ; se méfier des grilles DeepSeek (peuvent être indulgentes, cf. F5)** | ✅ acté : grille = source de variance ; scoreur ≈ neutre à grille fixe |
| **méthodo scoreur (F5) — RÉSOLU** | Cas d'école : le cycle full-DeepSeek donnait ADMIS 1,0 **gonflé** (DeepSeek tolérait « léonine » sans article sur le leaver). La reconfirmation Codex (grille + score) a **REJETÉ** (C-009), révélant un vrai trou que L1 a corrigé. **Démonstration empirique que les cycles full-DeepSeek doivent être reconfirmés au Codex** ; le détour DeepSeek a paradoxalement validé la rigueur du protocole | ✅ résolu : F5 = ADMIS protocole après L1 |
| **méthodo scoreur** | F6 scoré **DeepSeek V4 Pro** (crédits Codex épuisés). Blind au skill OK. Les **gates** F6 reposent sur des critères binaires (article cité ou non : L.227-15, L.228-1/L.211-17) → **scoreur-indépendants, gate-clean robuste**. Seul le **chiffre** (0,95) n'est pas strictement comparable aux cycles Codex. Opus écarté comme scoreur (même famille que générateur Phase 3 = auto-référence) | ✅ **RÉSOLU** : reconfirmé au Codex = **RÉSERVES 0,95 identique** au DeepSeek → F6 confirmé protocole |
| méthodo | **variance run-to-run** : 5 swings PASS↔FAIL entre 5FDM2A et NQ4FOV. 1 seul run Phase 3 est bruité ; les FAIL persistants (2 runs) sont le signal fiable | ⏳ à considérer : 2 runs Phase 3 pour les skills borderline ? |
| tooling | **test cowork-structure** : `collectTextFiles` linte aussi les `tests/datasets` (sorties modèle brutes) → faux positif sur renvois | ✅ corrigé : exclusion de `tests/` du lint d'hygiène des renvois |

## Workflow (identique à l'ami)

Voir [`da-codex-scoring-queue.md`](da-codex-scoring-queue.md) §workflow et
[`scripts/README-codex-blind-scoring.md`](../../scripts/README-codex-blind-scoring.md).
Cycle complet ≈ 2 sessions Codex (P2 HIGH + P4 medium ; P3 Claude gratuite).

## Budget indicatif

6 cycles complets ≈ **12 sessions Codex**. Cadrage probable : scorer F1+F2+F3
(le cœur trade exposé, ~6 sessions) pour un bump frère, F4-F6 vague d'après.
