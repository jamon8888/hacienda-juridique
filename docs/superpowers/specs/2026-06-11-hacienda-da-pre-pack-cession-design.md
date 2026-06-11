# Design — Skill `pre-pack-cession` (DA, distressed-M&A)

> Spike Chantier A du handoff 2026-06-09. Plugin : `plugins/hacienda-droit-affaires`.
> Cycle à l'intersection M&A ↔ restructuring (le *moat* M&A-restructuring).
> Méthode : brainstorming → design doc → build → **scoring blind 4 phases** (Codex).

## Objectif

Couvrir le **montage et le séquençage d'un pre-pack cession** : cession négociée
confidentiellement en amont (mandat ad hoc / conciliation) puis réalisée via une
procédure collective sous forme de **plan de cession (L.642-2)** — donnant au
repreneur les protections de la cession judiciaire (purge du passif, sécurité du
jugement) tout en gardant vitesse et confidentialité de la phase amiable.

C'est le **pont exact** entre les 2 personas déjà validés :
`prevention-difficultes` (amont, persona *ami* restructuring) → `spa-review` /
`gap-review` / `closing-checklist-fr` (aval, persona *frère* M&A).

## Périmètre (scope verrouillé en brainstorming)

- **Livrable unique** : note de cadrage / montage. **Pas** de mode `--review` en v1
  (reporté v1.1 si le cadrage fait ses preuves — YAGNI pour garder un cycle de
  scoring blind propre : un livrable = un ground-truth).
- **Side-required** : côté **débiteur** OU côté **repreneur**, déclaré à l'intake
  (pattern `spa-review` / `gap-review`). Même note, deux focales.
- **Véhicule procédural = sortie, pas input** : le gate décide entre sauvegarde
  accélérée (L.628-x) et RJ + plan de cession (L.642-x). L'avocat arrive avec une
  situation, pas un véhicule choisi.
- **Intake léger, conversationnel** : cible, niveau de difficulté, **statut
  cessation des paiements (date / +45 j ?)**, repreneur identifié ?, urgence /
  confidentialité, côté conseillé. Documents (offre, comptes) optionnels.

## Architecture

- Un seul `SKILL.md` dans `plugins/hacienda-droit-affaires/skills/pre-pack-cession/`,
  même moule que `prevention-difficultes` (gate diagnostic → intake → checklist
  non-juriste → sortie structurée → étapes → renvois → ton).
- Frontmatter : `name: pre-pack-cession` ; `description` avec déclencheurs
  (« pre-pack », « cession préparée », « plan de cession anticipé », « vente
  pré-négociée en procédure collective »).
- Plugin DA → **v0.6.0**. 23 skills → MAJ compteur README + test `cowork-structure`
  **en une seule étape de release finale** (le compteur ne bouge pas pendant build /
  scoring ; `npm test` échoue tant que le compteur n'est pas synchronisé, donc on le
  fait au commit de release uniquement).

## Cœur — double gate (ce qui se score ; acquis méthodo « se fier aux gates »)

### Gate 1 — Cessation des paiements (réutilise la logique `prevention-difficultes`)
Détermine le **véhicule**, pas un go/no-go binaire :
- CP ≤ 45 j ou non constatée → voie amiable possible (mandat ad hoc / conciliation)
  → **sauvegarde accélérée** (L.628-x) si accord majoritaire en vue.
- CP > 45 j → conciliation fermée → bascule **RJ + plan de cession** (L.642-x)
  directement.
- CP incertaine → poser la question (passif exigible vs actif disponible) avant
  d'avancer.

### Gate 2 — Faisabilité pre-pack (spécifique, nouveau). 🔴 STOP si un seul tombe
- **Confidentialité tenable** (L.611-15) — sinon le pre-pack perd son intérêt.
- **Repreneur crédible identifié** en phase amiable — sinon ce n'est pas un
  *pre-pack* mais une cession judiciaire ordinaire (renvoi).
- **Prospection régulière** organisée par le conciliateur / mandataire ad hoc
  (L.611-7) — opposabilité de l'offre choisie / transparence vis-à-vis du tribunal.
- **Pas de fraude / période suspecte anticipée** (L.632-1) — sinon risque de
  nullité de la cession.

## Sortie — note de cadrage *side-aware*, 4 blocs

```
# Pre-pack cession — note de cadrage [CÔTÉ débiteur|repreneur]
## 1. Diagnostic & gates       (CP+45 j ; faisabilité pre-pack : 4 critères tranchés)
## 2. Véhicule & séquençage    (amiable → bascule collective ; qui fait quoi ; calendrier indicatif)
## 3. Points de vigilance gatés (ancrés sur l'article tranchant ; focale selon le côté)
## 4. Renvois & prochaines étapes
```

- **Côté débiteur** : focale orchestration — mandater le conciliateur, sécuriser la
  prospection, articuler CSE / AGS, déposer la requête.
- **Côté repreneur** : focale exposition — purge réelle du passif, contrats repris
  (L.642-7), risque de contestation (L.661-6), irrévocabilité et conditions de
  l'offre.

## Workflow (étapes, moule `prevention-difficultes`)

1. **Pré-flight + Gate 1 (CP+45 j)** — tranche le véhicule ; si CP incertaine, poser
   la question avant d'avancer.
2. **Gate 2 (faisabilité pre-pack)** — 4 critères ; si un tombe → STOP + renvoi
   motivé.
3. **Séquençage phase amiable** — mandat ad hoc / conciliation, mandat de
   prospection au conciliateur (L.611-7), confidentialité (L.611-15).
4. **Bascule collective** — sauvegarde accélérée (L.628-x) *ou* RJ (L.631-x) → plan
   de cession (L.642-2) ; articulation CSE / AGS / offres.
5. **Vigilance side-aware** — pièges ancrés (cf. bloc sortie).
6. **Post-flight `verifier-citations`** — comme tous les skills DA.

## Renvois (le skill est un *pont*, pas un remplacement)

- **Amont** → `prevention-difficultes` (mandat ad hoc / conciliation ; gate CP
  partagé).
- **Aval** → `spa-review` / `gap-review` / `closing-checklist-fr` (l'acte de cession
  lui-même, une fois le montage cadré).
- **Latéral** → `declaration-creance` (créanciers en procédure) ; `PI:contrats-pi`
  si actifs PI substantiels dans le périmètre cédé.

## Garde-fous (« Ce skill ne fait pas »)

- Ne rédige **pas** l'acte de cession ni l'offre de reprise (→ renvois aval).
- Ne produit **aucun document destiné à des tiers** pendant la phase amiable
  (confidentialité L.611-15).
- Brouillon soumis à validation avocat ; tout seuil / durée post-réforme 2021 reste
  `[à vérifier]` si non confirmé.

## Plan de scoring blind (but du spike — protocole 4 phases, CLAUDE.md)

- **Phase 2** (Codex GPT-5.5 HIGH, session distincte, **sans SKILL.md**) : grille +
  ground-truth depuis un **scénario fictif de pre-pack** (cible en difficulté +
  repreneur identifié). Dataset : `tests/datasets/pre-pack-cession/`.
- **Phase 3** (Claude Code natif, session **fraîche**, **sans ground-truth**) :
  exécution live → `live-output.md`. `rsync -a --delete repo/skills/ cache/skills/`
  avant pour tester la version courante.
- **Phase 4** (Codex medium, session distincte, **sans SKILL.md**) : scoring contre
  la grille.
- **Agrégation** `scripts/tiered_scoring.py`. **Décision gate-driven, pas chiffre**
  (se méfier des 1,0). Correctif d'ancrage ciblé si un gate CRITIQUE tombe (pattern
  G1/H1/J1/L1/M2).
- Helper : `scripts/codex-blind-scoring.py` (phase2-criteria / phase4-criteria).
- Commandes scoring / agrégation **lancées par l'utilisateur** (économie tokens) ;
  Claude génère les prompts + fait l'analyse.

## Critères de succès

- Skill `pre-pack-cession` livré, **gate-clean** (ADMIS ou RÉSERVES) au scoring blind.
- Les 2 gates (CP+45 j, faisabilité pre-pack) tranchent correctement sur le scénario.
- Renvois amont/aval corrects (pont effectif entre les 2 personas).
- DA bumpé v0.6.0, compteur README + test `cowork-structure` à jour, `npm test` vert.

## Hors scope (v1)

- Mode `--review` d'une structure pre-pack proposée (→ v1.1).
- Rédaction de l'acte de cession / offre de reprise (→ skills aval existants).
- Cession d'actifs isolés L.642-19, reprise à la barre pure hors pre-pack (autres
  candidats de cycle, non retenus).
