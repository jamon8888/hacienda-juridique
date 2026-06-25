# Handoff — `distress-cedant` (clôture du pan cédant/débiteur)

**Date :** 2026-06-24
**Branche :** `feat/da-distress-cedant`
**Version :** hacienda-droit-affaires v0.12.0 → **v0.13.0**
**Skills :** 29 → **30**
**Statut scoring :** **RÉSERVES gate-clean** (cycle `DCD1RT`, score 0,8967, **0 CRITIQUE échoué**) — accepté pour release par Candy.

---

## 1. Ce qui est livré

`distress-cedant` est le **routeur d'entonnoir côté cédant/débiteur** du moat distressed-M&A, **dernière pièce** du pan et **miroir exact** de `asset-vs-share-distress` (côté repreneur). Il diagnostique le niveau de difficulté, éclaire l'arbitrage **sauver / céder / déposer**, signale l'exposition du dirigeant comme facteur transverse, et **route** vers la bonne feuille. Il **décide et oriente, il n'exécute pas**.

Surface livrée :
- `skills/distress-cedant/SKILL.md` (squelette V2 canonique) + wrapper jumeau `commands/h-da/distress-cedant.md`.
- `cas` : ligne « entreprise en difficulté » transformée en **fork par side** (repreneur → `asset-vs-share-distress` ; cédant → `distress-cedant`).
- README (ligne Commandes + Périmètre V2), bump v0.13.0 (6 emplacements), CHANGELOG.
- `scripts/da-scoring.sh` : `distress-cedant` enregistré (code `DCD1RT`), dataset `tests/datasets/da-distress-cedant/`.

## 2. Le cœur doctrinal : le pivot 45 j inverse

Point critique validé gate-clean (C-003) : **le débiteur EST celui qui doit déclarer**. CdP > 45 j non déclarée → l'amiable est fermé (L.611-4) et l'obligation de déclarer s'impose (L.631-4) → **`declaration-cessation-paiements`**, **jamais** la prévention. C'est l'**inverse** du routage côté repreneur (`asset-vs-share-distress`, où CdP > 45 j → « la cible doit déclarer → `prevention-difficultes` »). Renvoyer un débiteur en CdP > 45 j vers la prévention = l'erreur qui trompe le client.

## 3. Scoring — cycle `DCD1RT`

| Niveau | Résultat |
|---|---|
| CRITIQUE (7) | **7/7 PASS** — gate-clean |
| MAJEUR (15) | 14/15 (0,9333) |
| MINEUR (4) | 3/4 (0,75) |
| **Score** | **0,8967 — RÉSERVES** |

**Checkpoint gates (avant live).** Deux gates MAJEUR recalibrés pour symétrie (gate-piège, pas gate-recall) : C-009 (date de cessation — le raisonnement conditionnel passe désormais explicitement) et C-017 (responsabilité dirigeant — « chiffrer au lieu de router » devient un FAIL explicite). Cf. `[[feedback-gate-calibration-scoring]]`.

**Les deux échecs (analysés, non bloquants) :**

- **C-015 (contrats structurants, MAJEUR) = faux-FAIL de grille.** Critère asymétrique : PASS énumère **trois** contrats de façon conjonctive (Cargonet **et** bail commercial **et** crédit-bail), FAIL = « **aucun** ». La sortie live couvrait **2/3** (Cargonet comme moteur du diagnostic « redressement difficile », crédit-bail comme passif exigible) en omettant le bail commercial → zone orpheline → tranché FAIL par le scorer. Le skill a substantiellement bien traité les contrats ; ce n'est pas un défaut doctrinal mais une **asymétrie de grille** ratée au checkpoint (même classe que C-009/C-017). Grille gelée post-live : le cycle reste RÉSERVES, mais le verdict C-015 est un artefact.
- **C-026 (PII, MINEUR) = hygiène borderline.** La note répète SIREN (3×) et le nom du dirigeant (6×) — nécessaires au raisonnement, mais exposition réductible. Le skill **a** lancé `check-pii` et l'a documenté (footer). Dans la variance.

**Décision (Candy) :** accepter gate-clean (0 CRITIQUE) + appliquer 2 micro-fixes au SKILL.md, **sans re-scoring** (anti-variance, cf. `[[feedback-date-fabrication-scoring-variance]]` — SEUIL_ADMIS=1,0 sensible à la variance, borner les cycles ; un re-cycle risquait un autre MAJEUR au hasard sans garantie d'atteindre 1,0).

**Micro-fixes appliqués post-cycle** (le `live-output.md` reflète la version pré-fix) :
1. Intake item 6 « Contrats structurants » + bullet Gate non-juriste — surface explicitement client clé perdu + baux/crédits-bails à clause de résiliation sur cession comme **contraintes du diagnostic** (sans analyse fine, déférée aux feuilles). Adresse C-015 au fond, pas par contournement de grille.
2. Bullet Gate non-juriste « PII limitée dans le corps » — réduire/pseudonymiser SIREN, dénomination et nom du dirigeant là où l'identification n'est pas indispensable. Adresse C-026.

Structure-test toujours verte (11/11) après fixes.

## 4. Clôture du pan — symétrie atteinte

Le pan cédant/débiteur est **complet et symétrique** au pan repreneur :

```
cas
 ├─ (repreneur) → asset-vs-share-distress → reprise-a-la-barre / cession-actifs-isoles / pre-pack-cession / spa-review …
 └─ (cédant)    → distress-cedant         → prevention-difficultes / declaration-cessation-paiements / pre-pack-cession / responsabilite-dirigeant
```

Feuilles du pan déjà livrées : `prevention-difficultes`, `declaration-cessation-paiements` (v0.11.0), `responsabilite-dirigeant` (v0.12.0), `pre-pack-cession` (side-aware). Le moat distressed-M&A est lisible des deux côtés.

## 5. Reste hors scope (→ futurs cycles)

- **Feuille « vendre à la barre côté débiteur »** (cession judiciaire RJ/LJ subie). Aujourd'hui `distress-cedant` **signale le rôle limité du débiteur** (les organes pilotent ; les skills `reprise-a-la-barre` / `cession-actifs-isoles` sont côté acheteur). Une feuille dédiée pourrait l'outiller plus tard. C'est le « trou côté débiteur » identifié au design §5.
- `defense-comblement-passif` (mémoire en défense — déjà hors scope de C).
- Mode `--review` (relire une note d'orientation existante).
- AMF / cibles cotées (anticipation v2).

## 6. Leçon méthodo

**Asymétrie de grille « liste conjonctive en PASS vs "aucun" en FAIL ».** Un critère dont le PASS énumère N éléments avec « et » alors que le FAIL ne se déclenche qu'à « aucun » crée une zone orpheline (couvre certains-mais-pas-tous) que le scorer tranche en FAIL. À détecter au checkpoint au même titre que les gate-recall : reformuler en gate-piège (« FAIL si n'en traite aucun ; PASS sinon ») ou exiger explicitement les N éléments des deux côtés. Cf. `[[feedback-gate-calibration-scoring]]`.
