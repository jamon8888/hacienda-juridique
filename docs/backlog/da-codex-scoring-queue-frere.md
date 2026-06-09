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
| **F1** | **spa-review** | ✅ `da-spa-review/scenario.md` | ✅ `ground-truth.md` (40 criteria, 3 gates) | ✅ scoré 2× — **NQ4FOV : INSUFFISANT** (0,71, **gate-clean** ; 5FDM2A était REJETÉ) | **G1 fermé** (earn-out 1591/1163 + client clé 1112-1/1130 ancrés → C-013/C-029 PASS). **Releasable gate-clean.** **G2 ouvert** (couverture, v0.3.0) |
| **F2** | **gap-review** | ✅ `da-gap-review/scenario.md` | ✅ `ground-truth.md` (32 criteria, 4 gates) | ✅ scoré 2× — **SFZLV2 : RÉSERVES** (0,904, gate-clean ; E4II4R était REJETÉ) | **H1 fermé** (1130/1137/1104 dol + L.176 LPF fiscal + L.171-8 ICPE → C-006/C-013/C-019 PASS). **Releasable RÉSERVES.** H2 ouvert (3 majeurs, v0.3.0) |
| **F3** | **loi-term-sheet** | ✅ `da-loi-term-sheet/scenario.md` | ✅ `ground-truth.md` (22 criteria, 3 gates) | ✅ scoré 1× — **AMDZQA : RÉSERVES** (0,90, gate-clean **dès le cycle 1, sans correctif**) | Skill nativement bien ancré (1104/1112/1112-1/1304-2). **Releasable RÉSERVES.** I1 ouvert (2 majeurs, v0.3.0) |
| **F4** | **due-diligence-dataroom** | 🟡 à construire (source : `v1.1/data-room-test/`) | ❌ | jamais scoré blind | plus gros volume horaire, mais extraction/triage |
| **F5** | **pacte-associes-review** | 🟡 à construire (source : `v1.1/pacte-test.md`) | ❌ | jamais scoré blind | trade pur → dépend du type, plus rare |
| **F6** | **closing-checklist-fr** | ✅ `da-closing-checklist/scenario.md` | ✅ `ground-truth.md` (22 criteria, 3 gates) | ✅ scoré 2× — **WK8LZM : RÉSERVES** (0,95, **gate-clean robuste** ; XLNZ2E était REJETÉ) — scoré DeepSeek (gates binaires L.227-15 / L.228-1+L.211-17 = scoreur-indépendants ; reconfirmation Codex = chiffre seulement, non bloquante) | **J1 fermé** (agrément nullité L.227-15 + transfert L.228-1/L.211-17 → C-005/C-014 PASS). **Releasable RÉSERVES.** J2 ouvert (1 majeur, v0.3.x) |

> ⚠️ Les scénarios `v2-spa/` et `v1.1/` sont des **fixtures de cycle non-blind**
> (ils embarquent la vérité terrain + critères de succès). Chaque cycle frère
> nécessite de **reconstruire un `scenario.md` blind** (faits seuls, cycle-agnostique :
> pas de code de cycle, pas de findings) puis P2 (Codex HIGH) + P3 + P4.

## Findings ouverts

| Skill | Finding | État |
|---|---|---|
| spa-review | **G1 — ancrage doctrinal** : earn-out indéterminable (1591/1163 nullité, pas seulement 1104), finding DD matériel (devoir d'info 1112-1 + vices 1130/1137) | ✅ **fermé (NQ4FOV)** : C-013 + C-029 FAIL→PASS en aveugle, gates ouverts |
| spa-review | **G2 — couverture (v0.3.0, non gating)** : (A) objectivité des CP acquéreur financement/diligences → potestativité 1304/1304-3 (C-004/C-005) ; (B) mécanique leakage euro-pour-euro hors plafond GAP (C-010) ; (C) formalités SAS (statuts agrément/préemption + registres mouvements titres, nullité L.227-15) + social CSE (L.2312-8/37, L.23-10-7) + sanctions efficaces avec modération 1231-5 (C-034/C-036/C-038) | ⏳ correctif couverture + re-score → vise RÉSERVES/ADMIS |
| spa-review | **G3 (mineur)** — hygiène renvoi : le skill a produit `/hacienda-propriete-intellectuelle:audit-pi-ma` (namespace long, entry point non vérifié) au lieu de `/h-pi:contrats-pi` | ⏳ v0.3.0 — corriger le renvoi PI dans spa-review (namespace court + entry point réel) |
| gap-review | **H1 — ancrage doctrinal** : dol/fraude non-écartables (1130/1137/1104), durée fiscale sur droit de reprise LPF (L.176 TVA / L.169 IS), ICPE inexécutée = risque public L.171-8 C.env (exécution d'office), pas coût travaux | ✅ **fermé (SFZLV2)** : C-006/C-013/C-019 FAIL→PASS en aveugle, RÉSERVES 0,904 |
| gap-review | **H2 — polish (v0.3.0, non gating)** : C-014 (social), C-020 (DD-4 RGPD), C-026 (procédure de réclamation) | ⏳ 3 majeurs résiduels |
| loi-term-sheet | **I1 — polish (v0.3.0, non gating)** : C-012 (confidentialité — durée/restitution/destruction), C-019 (devoir d'information précontractuelle 1112-1) | ⏳ 2 majeurs résiduels |
| **méta M&A** | **pattern NON confirmé** : F1+F2 échouaient sur l'ancrage d'article ; **F3 passe ses gates dès le cycle 1**. Le défaut d'ancrage était **spécifique** à spa-review/gap-review, pas systémique → **pas de consigne transversale CLAUDE.md** nécessaire | ✅ tranché : correctifs skill ciblés suffisent |
| closing-checklist-fr | **J1 — ancrage doctrinal** : sanction nullité de l'agrément statutaire violé (L.227-15), transfert d'actions par virement de compte à compte (L.228-1 al.9 C.com + L.211-17 CMF, pas seulement registre/R.228-10) | ✅ **fermé (WK8LZM)** : C-005/C-014 FAIL→PASS, RÉSERVES 0,95 |
| closing-checklist-fr | **J2 — polish (v0.3.x, non gating)** : C-017 (formalité fiscale d'enregistrement) | ⏳ 1 majeur résiduel |
| **méthodo scoreur** | F6 scoré **DeepSeek V4 Pro** (crédits Codex épuisés). Blind au skill OK. Les **gates** F6 reposent sur des critères binaires (article cité ou non : L.227-15, L.228-1/L.211-17) → **scoreur-indépendants, gate-clean robuste**. Seul le **chiffre** (0,95) n'est pas strictement comparable aux cycles Codex. Opus écarté comme scoreur (même famille que générateur Phase 3 = auto-référence) | ✅ **gate robuste** ; reconfirmation Codex = chiffre seulement, à faire si claim de parité protocole (non bloquant) |
| méthodo | **variance run-to-run** : 5 swings PASS↔FAIL entre 5FDM2A et NQ4FOV. 1 seul run Phase 3 est bruité ; les FAIL persistants (2 runs) sont le signal fiable | ⏳ à considérer : 2 runs Phase 3 pour les skills borderline ? |
| tooling | **test cowork-structure** : `collectTextFiles` linte aussi les `tests/datasets` (sorties modèle brutes) → faux positif sur renvois | ✅ corrigé : exclusion de `tests/` du lint d'hygiène des renvois |

## Workflow (identique à l'ami)

Voir [`da-codex-scoring-queue.md`](da-codex-scoring-queue.md) §workflow et
[`scripts/README-codex-blind-scoring.md`](../../scripts/README-codex-blind-scoring.md).
Cycle complet ≈ 2 sessions Codex (P2 HIGH + P4 medium ; P3 Claude gratuite).

## Budget indicatif

6 cycles complets ≈ **12 sessions Codex**. Cadrage probable : scorer F1+F2+F3
(le cœur trade exposé, ~6 sessions) pour un bump frère, F4-F6 vague d'après.
