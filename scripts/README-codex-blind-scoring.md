# `codex-blind-scoring.py` — Mode d'emploi

Helper Codex pour le protocole blind sparring scoring Hacienda.

**Référence protocole** : [`docs/methodology/sparring-scoring-protocol.md`](../docs/methodology/sparring-scoring-protocol.md)
**Templates Codex** : [`docs/methodology/codex-prompt-templates.md`](../docs/methodology/codex-prompt-templates.md)

> **Workflow canonique pour une décision release** : `phase1` →
> `phase2-criteria` → Phase 3 → `phase4-criteria` → extraction du bloc verdicts
> (`extract-verdicts.py` pour les datasets DA) → `tiered_scoring.py`. Les commandes
> `phase2` / `phase4` holistiques pondérées sont
> conservées pour les cycles historiques et les comparaisons, pas comme fondement
> autonome d'une release.

## Pourquoi un script

Sans script, le risque d'erreurs sur un cycle de scoring est élevé :
- chemins de fichiers approximatifs entre phases ;
- copier-coller des templates approximatif ;
- placeholders non substitués ;
- code scoring oublié ou doublonné ;
- leakage involontaire (Phase 2 reçoit le SKILL.md ; scoreur Phase 4 reçoit la vérité terrain dans le même fichier que le scenario).

Le script verrouille tout ça.

## Workflow type — un skill

Pour un skill `<skill>` (ex. `analyse-opposition-marque`), 4 étapes :

### 1. Choisir un code scoring de 6 caractères

Le code est exactement conforme à `[A-Z0-9]{6}`. Il peut être aléatoire ou
mnémonique (`CLOPE1`, `SPAPE1`, `PACPE1`, `MANPE1`) ; `da-scoring.sh` échoue
immédiatement sur toute autre longueur. Pour un code aléatoire :

```bash
python3 -c "import secrets, string; print(''.join(secrets.choice(string.ascii_uppercase+string.digits) for _ in range(6)))"
# ex. → K9R4MX
```

Noter ce code, il identifie le cycle complet.

### 2. Phase 1 — Dataset (Codex GPT-5.5 medium)

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill analyse-opposition-marque \
  --domain marques \
  --mode "analyse offensive opposition INPI L.712-4" \
  --specificites "motifs absolus L.711-2 ; restauration L.712-4-1" \
  --code K9R4MX \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-analyse-opposition-marque/scenario.md
```

**Action manuelle** :
1. Le prompt est imprimé sur stdout entre `>>> PROMPT CODEX <<<` et `<<< FIN PROMPT >>>`.
2. Ouvrir une **nouvelle session Codex** (CLI ou web) dédiée à cette Phase 1.
3. Coller le prompt.
4. Récupérer le markdown généré, le sauvegarder dans le `--output` indiqué.
5. **Fermer la session Codex** (ne pas l'utiliser pour Phase 2).

Le helper exige `--code` pour l'orchestration, mais le `scenario.md` généré reste
**cycle-agnostique** : aucun code de cycle ne doit apparaître dans son contenu.

### 3. Phase 2 — Vérité terrain (Codex GPT-5.5 **HIGH**)

Cette commande utilise la variante holistique historique. Pour une nouvelle
décision release, utiliser `phase2-criteria` ci-dessous.

```bash
python3 scripts/codex-blind-scoring.py phase2 \
  --skill analyse-opposition-marque \
  --skill-description "Skill d'analyse d'opposition à un dépôt de marque devant l'INPI, mode offensif ou défensif. Produit un livrable partner-ready avec findings cotés et recommandation." \
  --domain marques \
  --mode "offensif L.712-4" \
  --scenario plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-analyse-opposition-marque/scenario.md \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-analyse-opposition-marque/ground-truth.md
```

**Action manuelle** :
1. **Nouvelle session Codex** distincte de Phase 1 (changer d'onglet / fermer + rouvrir CLI).
2. Effort Codex → **HIGH** (la phase la plus consequence).
3. Coller le prompt.
4. Sauvegarder dans le `--output`.

**Anti-leakage automatique** : le script refuse si le scenario contient déjà une section "Vérité terrain" ou "Critères de scoring" (signal qu'il n'est pas blind).

### 4. Phase 3 — Exécution live (Claude Code)

C'est l'unique phase qui n'est PAS faite via Codex. Dans une **session Claude Code dédiée** (avec le plugin PI installé) :

```
/h-pi:analyse-opposition-marque [arguments du mode]
```

En lui fournissant comme input **uniquement** le `scenario.md`. La sortie est sauvegardée dans :

```
plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-analyse-opposition-marque/live-output.md
```

**Trois règles dures pour une Phase 3 propre** (apprises à l'usage — leur oubli fait perdre du temps ou invalide le cycle) :

1. **Resynchroniser le cache du plugin AVANT la session** — sinon la Phase 3 teste une version périmée du skill et les correctifs n'ont aucun effet :
   ```bash
   rsync -a --delete plugins/<plugin>/skills/ \
     ~/.claude/plugins/cache/<marketplace>/<plugin>/<version>/skills/
   ```
2. **Session Claude VRAIMENT neuve** — une session déjà ouverte (ou réutilisée) peut avoir l'ancien skill en contexte ; symptôme = `live-output.md` **byte-identique** au run précédent malgré un correctif. Ouvrir une session neuve APRÈS le resync, et vérifier dans la sortie qu'un ancrage attendu du correctif apparaît (`grep`).
3. **Interdire EXPLICITEMENT la lecture du ground-truth dans le prompt** (pas seulement « fournir scenario.md ») — une session zélée peut explorer le dossier et ouvrir `ground-truth.md`, ce qui **contamine** le run (elle voit le corrigé) :
   > « Lis UNIQUEMENT `…/scenario.md`. N'ouvre AUCUN autre fichier de ce dossier, surtout PAS `ground-truth.md` (ce serait le corrigé). »

   Vérif après coup : `grep -c "match_criteria" live-output.md` doit valoir **0** (sinon le ground-truth a fuité → recommencer en session neuve).

### 5. Phase 4 — Scoring (Codex GPT-5.5 medium)

Cette commande utilise la variante holistique historique. Pour une nouvelle
décision release, utiliser `phase4-criteria` ci-dessous.

```bash
python3 scripts/codex-blind-scoring.py phase4 \
  --skill analyse-opposition-marque \
  --skill-version 2.0.0 \
  --code K9R4MX \
  --scenario plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-analyse-opposition-marque/scenario.md \
  --ground-truth plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-analyse-opposition-marque/ground-truth.md \
  --live-output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-analyse-opposition-marque/live-output.md \
  --date 2026-06-15 \
  --output docs/backlog/pi-scoring-d2-analyse-opposition-marque-K9R4MX.md
```

**Action manuelle** :
1. **Nouvelle session Codex** distincte des Phases 1, 2 et 3.
2. Coller le prompt.
3. Sauvegarder dans `--output`.

**Anti-leakage automatique** : le script refuse explicitement si un des arguments pointe vers un fichier `SKILL.md`.

## Workflow canonique — criteria atomiques tiered-gated

Depuis le commit `7fd0845`, le helper expose deux sous-commandes qui
produisent et notent la vérité terrain au **format criteria atomiques** plutôt
qu'au format holistique pondéré. L'agrégation du score devient alors
**déterministe** (Python), pas laissée au jugement du scoreur.

| | Holistique (`phase2` / `phase4`) | Criteria atomiques (`phase2-criteria` / `phase4-criteria`) |
|---|---|---|
| Vérité terrain | findings cotés 🔴🟠🟡🟢 + grille en prose | liste de criteria PASS/FAIL, chacun `CRITIQUE` / `MAJEUR` / `MINEUR` |
| Phase 4 | le scoreur Codex rend un score pondéré | le scoreur rend PASS/FAIL par criterion + un bloc JSON ; le score est calculé par `scripts/tiered_scoring.py` |
| Agrégation | jugement Codex | déterministe : un seul `CRITIQUE` FAIL ⇒ REJETÉ (gate) |

### Phase 2 criteria — vérité terrain (Codex GPT-5.5 **HIGH**)

```bash
python3 scripts/codex-blind-scoring.py phase2-criteria \
  --skill declaration-creance \
  --skill-description "Rédige une déclaration de créance L.622-24 C.com. : forclusion, structure, rang/privilège." \
  --domain droit-affaires \
  --mode "rédaction déclaration côté créancier" \
  --scenario plugins/hacienda-droit-affaires/tests/datasets/da-declaration-creance/scenario.md \
  --output plugins/hacienda-droit-affaires/tests/datasets/da-declaration-creance/ground-truth.md
```

Le ground-truth produit **EST** la grille d'évaluation (à la Harvey LAB : pas de
golden answer séparé). Il se termine par un bloc JSON
`{"skill":...,"criteria":[{"id","niveau","axe","match_criteria"}, ...]}`.

> La Phase 1 reste distincte : le `scenario.md` est rédigé à la main par un acteur
> séparé ou généré via `phase1`. Dans les deux cas, il reste cycle-agnostique. Le guard
> `check_scenario_no_truth` refuse tout scenario contenant « Vérité terrain »,
> « Recommandation attendue », etc.

### Phase 3 — identique au workflow holistique

Session Claude Code fraîche, input = `scenario.md` uniquement, sortie =
`live-output.md`. Ne pas ouvrir `ground-truth.md`.

### Phase 4 criteria — scoring criterion-par-criterion (Codex GPT-5.5 medium)

```bash
python3 scripts/codex-blind-scoring.py phase4-criteria \
  --skill declaration-creance --skill-version 2.0.0 --code ZG7Q5O \
  --scenario plugins/hacienda-droit-affaires/tests/datasets/da-declaration-creance/scenario.md \
  --ground-truth plugins/hacienda-droit-affaires/tests/datasets/da-declaration-creance/ground-truth.md \
  --live-output plugins/hacienda-droit-affaires/tests/datasets/da-declaration-creance/live-output.md \
  --date 2026-06-15 \
  --output docs/backlog/da-scoring-declaration-creance-ZG7Q5O.md
```

Le scoreur rend, en fin de réponse, un bloc JSON strict
`{"criteria":[{"id","niveau","verdict","preuve"}, ...]}`. La clé **`preuve`**
(citation/localisation imposée au scoreur, anti-hallucination) est **conservée** dans
`verdicts-<CODE>.json` par `extract-verdicts.py` et sert d'**audit** : un FAIL dont la
preuve cite un passage traitant le point est une auto-contradiction à revoir. Le
sauvegarder, puis agréger de façon déterministe (`tiered_scoring.py` ignore `preuve`) :

La réponse Markdown complète du scoreur, avec le raisonnement par criterion, reste
dans `docs/backlog/<prefix>-scoring-<skill>-<CODE>.md`. Seul le bloc à quatre clés
est extrait dans `verdicts-<CODE>.json` ; le niveau est repris du ground-truth,
jamais redéfini par le scoreur.

```bash
python3 scripts/tiered_scoring.py .../da-declaration-creance/ground-truth.md .../da-declaration-creance/verdicts-ZG7Q5O.json
# → {"status":"ADMIS|RÉSERVES|INSUFFISANT|REJETÉ","score":...,"gate_failures":[...]}
```

### Règle d'agrégation tiered-gated

- Tout criterion **CRITIQUE** en FAIL ⇒ `status: REJETÉ`, `score: 0.0` (gate),
  quels que soient les autres criteria.
- Sinon : `status` dérivé du taux de réussite des **MAJEURS** (ADMIS si 100 %,
  RÉSERVES si ≥ 80 %, sinon INSUFFISANT) ;
  `score = round(0.8 × taux_majeurs + 0.2 × taux_mineurs, 4)`.

Implémentation et tests : `scripts/tiered_scoring.py`, `scripts/test_tiered_scoring.py`.

## Règles pratiques apprises à l'usage

**Sauver du JSON PUR, pas le markdown de Codex.** Codex rend souvent une réponse
markdown (criteria explicités) **suivie** d'un bloc JSON. `tiered_scoring.py` et le
loader de grille exigent du **JSON pur**. Extraire le **seul** bloc `{…}` (celui qui
contient `"criteria"`) et l'écrire dans `ground-truth.md` (Phase 2) et
`verdicts-<CODE>.json` (Phase 4). Un helper d'extraction du dernier objet JSON
équilibré contenant `"criteria"` fiabilise l'opération.

**Chemins des verdicts.** Sauver `verdicts-<CODE>.json` **dans le dossier du dataset**
(`…/da-<skill>/verdicts-<CODE>.json`), en **UTF-8**, **jamais dans `/tmp`** (la tmpfs
peut saturer et on perd la trace). Snapshoter le `live-output.md` d'un cycle avant
de le réécrire (`live-output-<CODE>.md`) pour garder l'historique avant/après correctif.

**Scoreur de substitution (DeepSeek) — possible mais à encadrer.** Le prompt généré
est agnostique au modèle : on peut le coller dans DeepSeek si les crédits Codex
manquent. Mais :
- **Codex reste le scoreur de référence** (comparabilité des chiffres entre cycles).
- **Ne pas utiliser le même modèle que la Phase 3** (auto-référence) : la Phase 3 est
  produite par Claude → un scoreur Claude noterait du Claude. DeepSeek (autre famille)
  est OK ; **Opus est à éviter** comme scoreur.
- Une **grille DeepSeek peut être indulgente** (constaté : un 1,0 full-DeepSeek
  masquait un vrai trou de gate, démasqué à la reconfirmation Codex). Reconfirmer au
  Codex avant tout claim release sur un cycle full-DeepSeek.

**Décider sur GATE-CLEAN, se méfier des chiffres.** Expérience naturelle observée : le
**même** `live-output` scoré sous deux grilles différentes donne des scores très
écartés (0,818 vs 1,0), alors qu'à **grille fixe** deux scoreurs (DeepSeek vs Codex)
donnent le **même** score. ⇒ La variance vient de la **construction de la grille**,
pas du scoreur. Le **gate-pass/fail est le signal fiable** (binaire, scoreur-
indépendant) ; le score `/1` n'est comparable qu'à grille robuste (Codex). Un gate
qui passe « de justesse » (substance présente mais article exact non cité) est un
**soft pass** fragile : ancrer l'article dans le skill pour le rendre robuste. Sur
une grille dense, le score est un artefact de profondeur : la décision release se
prend sur gate-clean. Spot-checker chaque FAIL contre `live-output.md` et sa `preuve`
avant de conclure à un déficit du skill.

**Borner les cycles.** `SEUIL_ADMIS = 1.0` est sensible à la variance d'un run live
frais : un MAJEUR peut osciller entre PASS et FAIL. Fixer un nombre de cycles, garder
les artefacts et ne pas boucler indéfiniment.

**Checkpoint contrôleur.** Entre Phase 2 et Phase 3, un gate peut être élevé,
démoté ou reformulé si le changement est tracé et validé humainement, et s'il
restaure la cohérence `PASS` ↔ trigger `FAIL`. Si le recalibrage intervient après un
live, tracer en quoi il corrige la grille indépendamment du score recherché ; ne pas
tuner la grille pour fabriquer un résultat.

**Module depth ≠ live depth.** Enrichir un module de référence ne garantit pas que
sa profondeur remonte dans un brouillon live single-pass. Verrouiller les dangers
dans le `SKILL.md` ; borner la grille pour la profondeur.

## Checklist anti-leakage par cycle

Avant de publier un score :

- [ ] Phase 1 et Phase 2 dans des sessions Codex distinctes
- [ ] Phase 2 a reçu uniquement `scenario.md` + description neutre (PAS le SKILL.md complet)
- [ ] **Cache du plugin resynchronisé** (`rsync skills/ → cache/skills/`) AVANT la Phase 3, dans une session Claude **neuve**
- [ ] Phase 3 a reçu uniquement `scenario.md`, avec **interdiction explicite** d'ouvrir `ground-truth.md` ; vérif `grep -c match_criteria live-output.md` = 0
- [ ] Phase 4 a reçu `scenario.md` + `ground-truth.md` + `live-output.md` (PAS le SKILL.md)
- [ ] `ground-truth.md` et `verdicts-<CODE>.json` sont du **JSON pur** (bloc extrait, pas le markdown Codex), en UTF-8, dans le dossier du dataset (pas `/tmp`)
- [ ] Code scoring unique, non réutilisé, exactement conforme à `[A-Z0-9]{6}` (aléatoire ou mnémonique)
- [ ] **Inputs blind cycle-agnostiques** : `scenario.md` et `ground-truth.md` ne contiennent **aucun code de cycle** en dur (titre, footer, `_provenance`). Le code ne vit que dans la commande Phase 4 (`--code`) et le nom du rapport — sinon Codex confond l'ancien et le nouveau cycle dans son scoring
- [ ] Bloc verdicts à quatre clés `{id,niveau,verdict,preuve}`, `preuve` non vide, niveau autoritatif repris du ground-truth
- [ ] Bloc JSON de verdicts agrégé par `tiered_scoring.py` — score **non** calculé à la main par le scoreur
- [ ] Rapport complet conservé dans `docs/backlog/<prefix>-scoring-<skill>-<CODE>.md`
- [ ] Chaque FAIL est spot-checké contre `live-output.md` avant de diagnostiquer un déficit skill
- [ ] Rapport final marqué `[scoring blind protocole D.0]` (et pas `[scoring auto-référent]`)

## Codes d'erreur du script

| Exit code | Signification |
|---|---|
| 0 | OK |
| 1 | Erreur d'usage (argparse) |
| 2 | Anti-leakage déclenché (voir message stderr) |
| 3 | Template `docs/methodology/codex-prompt-templates.md` introuvable ou corrompu |

## Tests de bon fonctionnement

```bash
# Help affiché
python3 scripts/codex-blind-scoring.py --help

# Code invalide → exit 2
python3 scripts/codex-blind-scoring.py phase1 --skill x --domain y --mode z \
  --specificites a --code badcode --output /tmp/x.md

# SKILL.md en input Phase 4 → exit 2
python3 scripts/codex-blind-scoring.py phase4 --skill x --skill-version 1 \
  --code AAA000 --scenario /tmp/a.md --ground-truth /tmp/b.md \
  --live-output plugins/.../SKILL.md --output /tmp/y.md
```

## Modèle Codex

| Phase | Modèle |
|---|---|
| Phase 1 | GPT-5.5 effort medium |
| Phase 2 | GPT-5.5 effort HIGH |
| Phase 4 | GPT-5.5 effort medium |

**GPT-4.5 (orion) déconseillé** sur PI/DA FR — risque de citations CPI / C.com. / CJUE inventées.

## Récupérer les verdicts Phase 4 — `extract-verdicts.py`

L'implémentation actuelle cible les datasets
`plugins/hacienda-droit-affaires/tests/datasets/da-<skill>/`. Pour les autres plugins,
extraire manuellement le bloc strict ou créer un helper versionné après arbitrage ;
ne pas prétendre que l'outil couvre un chemin qu'il ne résout pas.

Codex doit terminer sa réponse Phase 4 par le bloc `===VERDICTS_JSON===` suivi du
JSON brut (cf. template durci). En pratique il lui arrive de rendre seulement la
table markdown, ou de recopier la grille sans `verdict` — ce qui casse `aggregate`
(`KeyError: 'verdict'`). `extract-verdicts.py` récupère les verdicts quelle que
soit la forme rendue (bloc marqueur → JSON `{"criteria":[...]}` → table
`| C-xxx | PASS/FAIL |`), reprend le niveau autoritatif du ground-truth, valide la
cohérence des ids, et écrit `verdicts-<CODE>.json` :

```bash
# la sortie Codex est dans le presse-papier :
python3 scripts/extract-verdicts.py <skill> <CODE> --clipboard
# ou depuis un fichier (ex. le rapport da-scoring-<skill>-<CODE>.md) :
python3 scripts/extract-verdicts.py <skill> <CODE> --file docs/backlog/da-scoring-<skill>-<CODE>.md
# ou via un pipe :
pbpaste | python3 scripts/extract-verdicts.py <skill> <CODE>
```

Il affiche ensuite la commande `aggregate` à lancer. Le niveau venant toujours du
ground-truth, un juge Phase 4 ne peut pas redéfinir la sévérité d'un criterion.

## Évolutions du script

Toute modification incompatible (renommage d'argument, changement de format de prompt structurant) = nouveau script versionné `codex-blind-scoring-v2.py`. Le script actuel reste exécutable pour rejouer des cycles historiques.
