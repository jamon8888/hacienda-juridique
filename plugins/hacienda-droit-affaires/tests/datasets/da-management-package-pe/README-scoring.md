# Handoff scoring — `management-package-pe`

**Skill scoré :** `management-package-pe` v2.0.0
**Code de cycle :** `MGMT1` (défaut premier cycle ; surcharger via `CODE=<NOUVEAU>` pour un re-run)
**Protocole :** blind 4 phases — [`docs/methodology/sparring-scoring-protocol.md`](../../../../docs/methodology/sparring-scoring-protocol.md)
**Release rule :** gate-clean (voir ci-dessous)
**Token economy :** les runs Codex (Phase 1, Phase 2, Phase 4) et le run live (Phase 3) sont lancés par Candy, pas par l'agent.

---

## Scaffold livré par ce task (Task 4)

Ce dossier contient le matériel de scoring blind prêt à l'emploi :

| Fichier | Phase | Qui le produit |
|---|---|---|
| `scenario.md` | Phase 1 — dataset fictif | Produit ici (scaffold) |
| `ground-truth.md` | Phase 2 — grille de vérité terrain | Produit ici (scaffold) |
| `live-output.md` | Phase 3 — sortie live du skill | À produire par Candy (session Claude fraîche) |
| `verdicts-MGMT1.json` | Phase 4 — verdicts critère par critère | À produire par Candy (session Codex) |

> **Ce task ne produit PAS** `live-output.md` ni `verdicts-*.json`. Ces fichiers
> sont produits par les runs de Candy selon le workflow ci-dessous.

---

## Grille — résumé des gates

**25 critères** au total (leçon CLOPE : ne pas dépasser ~25 — Codex HIGH à 50+ critères
produit un score ininformatif par faux négatifs du scoreur).

| Niveau | Count | IDs |
|---|---|---|
| CRITIQUE | 5 | MGMT01, MGMT02, MGMT03, MGMT04, MGMT05 |
| MAJEUR | 16 | MGMT06 – MGMT21 |
| MINEUR | 4 | MGMT22 – MGMT25 |

### Gate-piège central (M4 fiscal/social)

**MGMT01, MGMT02, MGMT03 sont les trois gate-pièges CRITIQUES du cycle.**

Ils testent si le skill détecte ET renvoie les trois signaux de danger fiscal/social
du scénario SANS traiter au fond :

| Signal | Critère | PASS | FAIL |
|---|---|---|---|
| ADP-B souscrites au prix nominal / valorisation BidCo >> | MGMT01 | Danger identifié + renvoyé sans avis | Omis OU traité au fond (tout avis/qualification = FAIL) |
| Plancher de rachat garanti = alea absent | MGMT02 | Risque posé comme question + renvoyé | Omis OU qualification du régime |
| Vesting time-based pur + présence = lien rémunératoire | MGMT03 | Signal posé comme question + renvoyé | Omis OU conclusion sur la nature du gain |

> **Principe gate-piège (pas gate-recall).** PASS si le skill *détecte le danger
> et le signale sans l'aggraver par un avis*. L'avis de fond — même prudent, même
> introduit par « il est possible que… » — est un FAIL CRITIQUE car il tromperait
> le client sur un point qui dépasse le périmètre du skill.

### Autres gates CRITIQUES

| Critère | Gate | FAIL si… |
|---|---|---|
| MGMT04 | No quantum / no valorisation | Montant calculé, chiffrage economics, quantum fiscal ou social produit |
| MGMT05 | France/Lux | Élément Lux analysé sous droit français, ou gate omis |

### Règle d'agrégation

Tout critère CRITIQUE en FAIL → **status : REJETÉ, score : 0.0** (gate).
Sinon : ADMIS si 100 % des MAJEUR PASS ; RÉSERVES si ≥ 80 % ; sinon INSUFFISANT.
Score = `0.8 × taux_majeurs + 0.2 × taux_mineurs`.

**Release sur gate-clean = les 5 CRITIQUES tous PASS.**
(Leçon SPAPE/CLOPE : les scores bruts sont bruités par les faux négatifs du scoreur Codex
sur les grilles denses ; le gate binaire est le signal fiable.)

---

## Workflow — commandes à lancer par Candy

### Vérifications préalables (avant tout run)

```bash
# Depuis la racine du repo
cd /Users/candynguyen/dev/hacienda-juridique

# Vérifier que le skill est bien listé dans da-scoring.sh
bash scripts/da-scoring.sh list | grep management-package-pe
# Attendu : une ligne avec management-package-pe | MGMT1 | …
```

> **Note :** si `management-package-pe` n'est pas encore dans la table du
> wrapper `scripts/da-scoring.sh`, ajouter une entrée dans chacune des
> fonctions `SKILLS`, `code_for`, `mode_for`, `spec_for`, `desc_for`,
> `command_for` (voir commentaire en tête du script). Entrées suggérées :
>
> - `code_for` → `MGMT1`
> - `mode_for` → `cartographie management package PE, side sponsor, LBO mid-market`
> - `spec_for` → voir la description du spec dans le brief Task 4
> - `desc_for` → `Cartographie le management package LBO cote francais : recense les documents et le "qui signe quoi", nomme et explique les instruments et economics (sweet equity, envy ratio, ratchet, vesting, leaver), signale le risque de clause confiscatoire, et produit une liste de questions fiscal/social a renvoyer au specialiste. Ne valorise rien, ne donne aucun avis fiscal/social. Side-aware sponsor | manager. NE PAS supposer le contenu du SKILL.md.`
> - `command_for` → `/h-da:management-package-pe --side=sponsor`

### Phase 2 — Vérité terrain (Codex GPT-5.5 HIGH)

> **Note :** le `scenario.md` et le `ground-truth.md` sont déjà produits dans ce
> scaffold. La Phase 2 est **déjà faite**. Ne pas la relancer sauf si le scénario
> est modifié (dans ce cas, repartir du prompt Codex Phase 2 classique).

Si un re-run de Phase 2 est nécessaire :

```bash
bash scripts/da-scoring.sh phase2 management-package-pe
# → copie le prompt dans le presse-papier
# → ouvrir une nouvelle session Codex, effort HIGH
# → coller le prompt, récupérer le JSON pur des critères
# → sauvegarder dans : plugins/hacienda-droit-affaires/tests/datasets/da-management-package-pe/ground-truth.md
```

**CHECKPOINT avant Phase 3 :** relire les 5 critères CRITIQUES (MGMT01–MGMT05)
pour vérifier que PASS = complément exact de FAIL (pas de zone orpheline). Un gate
mal rédigé produit un faux REJETÉ. Ne pas modifier la grille après la Phase 3
(intégrité blind).

### Phase 3 — Exécution live (session Claude fraîche)

```bash
# 1. Resynchroniser le cache du plugin AVANT la session
bash scripts/da-scoring.sh phase3-resync
# ou manuellement :
# rsync -a --delete plugins/hacienda-droit-affaires/skills/ \
#   ~/.claude/plugins/cache/hacienda-juridique/hacienda-droit-affaires/0.1.0/skills/

# 2. Afficher les instructions Phase 3
bash scripts/da-scoring.sh phase3-prompt management-package-pe
```

Ouvrir une **nouvelle session Claude (Cowork ou Code)** et lancer :

```
/h-da:management-package-pe --side=sponsor
```

En fournissant **uniquement** `plugins/hacienda-droit-affaires/tests/datasets/da-management-package-pe/scenario.md`.

> **Interdiction explicite à inclure dans le prompt Phase 3 :**
> « Lis UNIQUEMENT `…/scenario.md`. N'ouvre AUCUN autre fichier de ce dossier,
> surtout PAS `ground-truth.md` : ce serait le corrigé et contaminerait le cycle. »

Sauvegarder la sortie dans :
```
plugins/hacienda-droit-affaires/tests/datasets/da-management-package-pe/live-output.md
```

Vérification anti-leakage :
```bash
grep -c "match_criteria" plugins/hacienda-droit-affaires/tests/datasets/da-management-package-pe/live-output.md
# Attendu : 0
```

### Phase 4 — Scoring (Codex GPT-5.5 medium)

```bash
bash scripts/da-scoring.sh phase4 management-package-pe
# → copie le prompt dans le presse-papier
# → ouvrir une nouvelle session Codex (distincte des Phases 1, 2, 3)
# → coller le prompt
# → récupérer le bloc JSON verdicts (===VERDICTS_JSON=== ou extraction par extract-verdicts.py)
```

Sauvegarder le JSON pur dans :
```
plugins/hacienda-droit-affaires/tests/datasets/da-management-package-pe/verdicts-MGMT1.json
```

Si Codex ne produit pas le bloc JSON proprement :
```bash
pbpaste | python3 scripts/extract-verdicts.py management-package-pe MGMT1
```

### Agrégation finale

```bash
bash scripts/da-scoring.sh aggregate management-package-pe
# → appelle tiered_scoring.py sur ground-truth.md + verdicts-MGMT1.json
# → status : ADMIS | RÉSERVES | INSUFFISANT | REJETÉ
```

---

## Release rule — gate-clean

**Shipper sur gate-clean = les 5 CRITIQUES (MGMT01–MGMT05) tous PASS.**

Le score `/1` n'est pas le signal de release (expérience CLOPE : variance élevée
entre grilles, faux négatifs sur grilles denses). Le gate binaire est fiable.

Si un CRITIQUE est FAIL :
1. Identifier le FAIL (output du `tiered_scoring.py` → `gate_failures`).
2. Repérer la ligne dans `live-output.md` où le danger aurait dû être traité.
3. Corriger le skill ou le module de doctrine (`SKILL.md` ou `references/management-package-pe-fr.md`).
4. Re-run Phase 3 + Phase 4 avec un **nouveau code** : `CODE=<NOUVEAU> bash scripts/da-scoring.sh phase4 management-package-pe`.
5. **Ne pas modifier `ground-truth.md` entre les cycles** (intégrité blind).

---

## Spot-check gates (leçon Phase 4 false negatives)

Avant de publier le verdict, vérifier manuellement les critères MGMT01–MGMT03
contre `live-output.md` (leçon cycles précédents : Codex rate parfois du contenu
présent verbatim sur les grilles denses) :

```bash
# Vérifier que le skill a bien posé la question du plancher de rachat
grep -i "plancher\|alea\|aleatoire\|garanti" \
  plugins/hacienda-droit-affaires/tests/datasets/da-management-package-pe/live-output.md

# Vérifier que le skill a bien renvoyé sans qualifier
grep -i "fiscaliste\|specialiste\|renvoi\|a verifier" \
  plugins/hacienda-droit-affaires/tests/datasets/da-management-package-pe/live-output.md

# Vérifier l'absence de qualification au fond
grep -i "requalification\|cotisations\|taux\|regime\|salaire" \
  plugins/hacienda-droit-affaires/tests/datasets/da-management-package-pe/live-output.md
# Attendu : occurrences uniquement dans le contexte d'une question posée, JAMAIS d'une réponse
```

Si un FAIL de Codex semble être un faux négatif (le contenu est présent dans
`live-output.md` mais scoré FAIL), noter le cas en commentaire dans le rapport
`docs/backlog/da-scoring-management-package-pe-MGMT1.md` et traiter selon
`docs/backlog/scorer-phase4-false-negatives-fix.md`.

---

## Checklist anti-leakage cycle MGMT1

- [ ] Phase 2 Codex HIGH — session distincte, sans SKILL.md
- [ ] CHECKPOINT grille CRITIQUE relu avant Phase 3 (gate pas gate-recall)
- [ ] Cache plugin resynchronisé AVANT Phase 3
- [ ] Session Claude Phase 3 vraiment neuve (pas de contexte résiduel)
- [ ] `live-output.md` : `grep -c match_criteria` = 0
- [ ] Phase 4 Codex medium — session distincte des Phases 1, 2, 3, sans SKILL.md
- [ ] `ground-truth.md` et `verdicts-MGMT1.json` : JSON pur, UTF-8, dans le dossier dataset
- [ ] Agrégation par `tiered_scoring.py` (pas à la main)
- [ ] Rapport marqué `[scoring blind protocole D.0]`
- [ ] Release décidée sur gate-clean (5 CRITIQUES PASS), pas sur le score `/1`

---

## Rapport de scoring

Le rapport est sauvegardé par Phase 4 dans :
```
docs/backlog/da-scoring-management-package-pe-MGMT1.md
```
