# Protocole méthodologique — Blind sparring scoring

**Statut** : protocole canonique du repo `hacienda-juridique`.
**Date d'inscription** : 2026-06-01.
**Référence dans CLAUDE.md** : section « Validation interne (sparring scoring) ».
**Plan d'origine** : `docs/superpowers/plans/2026-06-01-hacienda-pi-vague-d-release-readiness.md` § D.0.

> **Modèle canonique actuel pour une décision release** : vérité terrain sous forme de
> **criteria atomiques PASS/FAIL**, scoring **tiered-gated** et agrégation déterministe.
> Le scoring holistique pondéré reste disponible uniquement pour rejouer ou comparer les
> cycles historiques ; il ne fonde pas, à lui seul, une décision release.

---

## 1. Pourquoi ce protocole

### Constat — biais identifié en vague C PI

La vague C de validation interne du plugin `hacienda-propriete-intellectuelle` (2026-05-31) a produit 6 rapports de scoring K7M2PX (cf. `docs/backlog/pi-scoring-*.md`) avec une moyenne pondérée de **69,6 %**. Ces rapports ont été produits dans une **séquence non-blind** : le même acteur (Claude Code en une seule session) a écrit les datasets fictifs, défini la vérité terrain dans les mêmes fichiers, orchestré l'exécution simulée, et conduit le scoring.

**Conséquence biaisante** : le scoreur évaluait la sortie attendue contre une vérité terrain qu'il avait lui-même écrite en connaissant la conception du skill. Les scores sont une **borne supérieure indicative**, pas une mesure release-grade.

### Principe blind

Un sparring scoring fiable nécessite **4 acteurs séparés**, idéalement de **lignées de modèles différentes** :
1. Auteur des datasets (Phase 1) — ne sait pas ce que le scoreur attendra.
2. Auteur de la vérité terrain (Phase 2) — ne sait pas ce que le skill est conçu pour produire.
3. Exécuteur du skill (Phase 3) — ne voit pas la vérité terrain.
4. Scoreur (Phase 4) — ne voit pas le SKILL.md du skill évalué.

Sans cette séparation, le scoring devient une auto-évaluation déguisée.

---

## 2. Les 4 phases

### Phase 1 — Génération du dataset fictif

**Acteur** : Codex (GPT-5.5 effort medium), session dédiée.
**Input** : nom du skill cible + domaine + mode d'invocation + spécificités métier à inclure subtilement.
**Output** : un fichier `scenario.md` contenant uniquement le scénario fictif + pièces fournies + posture cabinet + question explicite. Ce fichier reste **cycle-agnostique** : aucun code de cycle n'y est inscrit. Si les faits ne donnent qu'une chronologie approximative, conserver des semaines relatives et ne jamais fabriquer de date calendaire.
**Interdiction stricte** : aucune section "Vérité terrain", aucune recommandation, aucune cotation 🔴🟠🟡🟢.

Template canonique : voir `docs/methodology/codex-prompt-templates.md` § Phase 1.

### Phase 2 — Définition de la vérité terrain

**Acteur** : Codex (GPT-5.5 effort **HIGH** — phase la plus consequence), session distincte de Phase 1.
**Input** : `scenario.md` de Phase 1 + une **description neutre minimale** du skill cible (2-3 lignes). **PAS le SKILL.md complet** — c'est l'anti-leakage critique.
**Output canonique** : un fichier `ground-truth.md` qui **EST la grille d'évaluation** (approche « à la Harvey LAB ») : 20 à 30 criteria atomiques PASS/FAIL, chacun doté d'un `id`, d'un `niveau` autoritatif (`CRITIQUE`, `MAJEUR`, `MINEUR`), d'un `axe` et de `match_criteria`. Il n'existe ni golden answer séparé ni grille pondérée pour ce workflow.

Les gates `CRITIQUE` suivent la forme **gate-piège**, pas gate-recall : ils sanctionnent une erreur affirmative qui tromperait le client (mauvais régime, qualification inversée, validation d'un acte vicié), jamais la récitation incomplète d'une doctrine ou l'omission d'un sous-item. Ne pas fragmenter un point en sous-items conjonctifs. Si « mentionner puis renvoyer sans traiter » suffit, ce cas doit être écrit dans le PASS afin d'éviter une zone passive orpheline.

Template canonique : voir `docs/methodology/codex-prompt-templates.md` § Phase 2.

### Phase 3 — Exécution live du skill

**Acteur** : Claude Code, session dédiée. **Environnement natif** du skill (`/h-pi:<skill>`).
**Input** : le `scenario.md` seul. **PAS d'accès au `ground-truth.md`**.
**Output** : la sortie réelle du skill exécuté, capturée dans `live-output.md`.

Cette phase est la seule qui ne se prête pas à Codex (les skills vivent dans l'écosystème Claude Code / Cowork).

### Phase 4 — Scoring comparatif

**Acteur** : Codex (GPT-5.5 effort medium), session distincte des Phases 1, 2 et 3.
**Inputs** : `scenario.md` + `ground-truth.md` + `live-output.md`. **PAS le `SKILL.md`** — sinon le scoreur compare structures au lieu d'évaluer substantiellement.
**Outputs canoniques** :
- un rapport complet dans `docs/backlog/<prefix>-scoring-<skill>-<code>.md`, avec le raisonnement par criterion ;
- un `verdicts-<code>.json` persistant, limité pour chaque criterion à l'objet à quatre clés `{id,niveau,verdict,preuve}`.

La `preuve` est obligatoire : citation de 15 mots maximum du livrable pour un PASS ; phrase contredisante ou `absent` pour un FAIL. Le scoreur ne calcule ni le score ni le statut. `scripts/tiered_scoring.py` reprend le niveau autoritatif du `ground-truth.md` et calcule de façon déterministe `REJETÉ`, `ADMIS`, `RÉSERVES` ou `INSUFFISANT`.

Template canonique : voir `docs/methodology/codex-prompt-templates.md` § Phase 4 criteria.

La variante holistique (`phase2` / `phase4`) est conservée pour les cycles historiques. La variante criteria (`phase2-criteria` / `phase4-criteria`) est la référence pour toute nouvelle décision release.

---

## 3. Anti-leakage rules

### Règles dures (refus inconditionnel)

1. **L'auteur du dataset** (Phase 1) **n'écrit jamais la vérité terrain** (Phase 2) dans la même session.
2. **L'auteur de la vérité terrain** (Phase 2) **n'a pas accès au SKILL.md** du skill cible — uniquement une description neutre 2-3 lignes.
3. **L'exécuteur live** (Phase 3) **n'a pas accès à `ground-truth.md`** — uniquement `scenario.md`.
4. **Le scoreur** (Phase 4) **n'a pas accès au SKILL.md** — uniquement les 3 livrables des phases précédentes.
5. **Idéalement** : séparation des lignées de modèles. Codex (lignée GPT) pour Phases 1+2+4, Claude Code (lignée Claude) pour Phase 3. À défaut : sessions Claude Code distinctes sans accès aux fichiers des autres phases (chaque session ouvre uniquement les fichiers qu'elle est censée voir).

### Règles souples (à documenter si transgressées)

- Codes scoring : exactement 6 caractères `[A-Z0-9]`, aléatoires ou mnémoniques, pour tracer un cycle complet. Ex. `K7M2PX`, `CLOPE1`, `SPAPE1`, `PACPE1`, `MANPE1`.
- `ground-truth.md` peut être versionné en git mais doit être **conservé dans un sous-dossier `ground-truth/` ou un fichier explicitement nommé** pour signaler son isolation.
- Si le même acteur réalise plusieurs phases consécutives par contrainte (par exemple absence d'accès Codex), c'est admissible mais le scoring final doit être marqué `[scoring partiellement blind]` ou `[scoring auto-référent]` selon le cas.

---

## 4. Codes scoring et structure de dossier

### Code scoring

Exactement 6 caractères alphanumériques majuscules (`[A-Z0-9]{6}`). Le code peut être aléatoire ou mnémonique ; le garde fail-fast de `scripts/da-scoring.sh` refuse toute autre longueur. Génération aléatoire :

```bash
python3 -c "import secrets, string; print(''.join(secrets.choice(string.ascii_uppercase+string.digits) for _ in range(6)))"
```

Exemples historiques : `K7M2PX` (aléatoire), `CLOPE1`, `SPAPE1`, `PACPE1`, `MANPE1` (mnémoniques PE). L'incident `RD1RT` (5 caractères) a conduit au code valide `RDG1RT`.

### Structure dossier par cycle

```
plugins/<plugin>/tests/datasets/<batch>-<skill>/
├── scenario.md           # Phase 1 — Codex
├── ground-truth.md       # Phase 2 — Codex (session distincte)
├── live-output.md        # Phase 3 — Claude Code
└── verdicts-<code>.json  # Phase 4 — {id,niveau,verdict,preuve}

docs/backlog/
└── <prefix>-scoring-<skill>-<code>.md   # Phase 4 — rapport complet Codex
```

Exemples :
- Vague C PI (rétro, scoring auto-référent) : `plugins/hacienda-propriete-intellectuelle/tests/datasets/v2-marque/scenario.md` → `docs/backlog/pi-scoring-marque-M7K3PX.md`.
- Vague D.2 PI (blind protocole) : `plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-analyse-opposition-marque/{scenario,ground-truth,live-output}.md` → `docs/backlog/pi-scoring-d2-analyse-opposition-marque-<code>.md`.

---

## 5. Quand appliquer le protocole

### Obligatoire

- Tout sparring scoring justifiant une **décision release** (passage à v1.x.x, packaging Cowork, validation associé).
- Tout sparring scoring justifiant un **budget de modifications skill** (ancrage doctrinal, refonte, retrait).
- Toute publication d'un score chiffré comme métrique objective (interne ou externe).

### Décision release

La décision repose sur **GATE-CLEAN** : peu de gates `CRITIQUE`, binaires et vérifiables à la main. Sur une grille dense, le score chiffré peut devenir un artefact de profondeur. Avant de conclure à un déficit du skill, spot-checker tout FAIL contre `live-output.md` et sa `preuve`.

Le seuil `ADMIS = 1,0` sur les MAJEUR est sensible à la variance d'un run live frais : borner les cycles, conserver les artefacts et ne pas boucler indéfiniment. Un recalibrage de gate après Phase 2 n'est admissible que s'il est tracé, validé humainement et restaure la complémentarité PASS/FAIL. S'il intervient après un live, la justification doit établir qu'il corrige la grille indépendamment du score recherché, et non qu'il fabrique un résultat.

### Optionnel

- Audit informel sans engagement (exploration, debug, prototype). Dans ce cas, marquer le rapport `[scoring informel — protocole D.0 non appliqué]`.
- Sparring scoring rapide sur un skill jouet ou un fix mineur.

### Interdit

- Présenter un scoring comme release-grade sans protocole appliqué et tracé.
- Inscrire un chiffre de scoring dans un CHANGELOG / README / release notes sans référence au protocole et au cycle.

---

## 6. Marquage des scorings hors protocole

### `[scoring auto-référent]`

Même acteur sur toutes les phases. Le scoring reflète au mieux les attentes de cet acteur, pas une vérité indépendante.

Exemple : les 6 rapports vague C PI (`pi-scoring-*.md` 2026-05-31). Marqués rétroactivement (cf. D.0.5).

### `[scoring partiellement blind]`

Au moins 2 phases acteurs distincts mais pas 4. Souvent : auteur dataset = auteur vérité terrain, mais exécution et scoring séparés.

### `[scoring informel]`

Hors release. Pas de promesse de fiabilité.

### `[scoring blind protocole D.0]` (ou variantes futures D.x.x)

4 phases séparées, lignées idéalement distinctes, anti-leakage respectés. Releasable.

---

## 7. Helper script Codex

Voir `scripts/codex-blind-scoring.py` et son mode d'emploi `scripts/README-codex-blind-scoring.md`.

Le script prépare les prompts Codex prêts à coller (avec substitution placeholders), crée les dossiers de sortie, et valide les garde-fous anti-leakage par phase (refuse de générer un prompt Phase 4 si un SKILL.md est dans les inputs, par exemple).

---

## 8. Templates Codex

Voir `docs/methodology/codex-prompt-templates.md`.

Le fichier contient cinq templates : Phase 1, Phase 2 et Phase 4 holistiques (historiques), plus `phase2-criteria` et `phase4-criteria`. Pour une décision release, le parcours canonique est Phase 1 + `phase2-criteria` + Phase 3 + `phase4-criteria`. Modifications majeures = nouveau protocole D.x.x.

---

## 9. Référence dans CLAUDE.md racine

Ce protocole est inscrit dans `CLAUDE.md` racine du repo (section « Validation interne ») comme exigence. Voir aussi les références dans :
- `plugins/hacienda-propriete-intellectuelle/tests/README.md`
- `plugins/hacienda-droit-affaires/tests/README.md`
- Tout futur plugin métier publié sous Hacienda.

---

## 10. Évolutions datées

- **2026-06-01** — D.0 : protocole blind en 4 phases, 4 acteurs séparés et règles anti-leakage.
- **2026-06-02** — Variante criteria atomiques tiered-gated : `ground-truth.md` devient la grille (approche Harvey LAB), sans golden answer séparé ; agrégation déterministe par `tiered_scoring.py`. Ajout du launchpad D.2.
- **2026-06-03** — Niveau autoritatif repris du ground-truth (`load_scored`) et inputs blind rendus cycle-agnostiques.
- **2026-06-19** — Durcissement du code de cycle contre les réutilisations accidentelles ; garde anti-fabrication des dates : chronologie relative, jamais de date calendaire inventée.
- **2026-06-24** — Code de cycle fixé à exactement 6 caractères après l'incident `RD1RT` (5 caractères), corrigé en `RDG1RT`.
- **2026-06-26** — Consolidation du gate-piège et du gate France/Lux : fermeture des zones orphelines par complémentarité PASS/FAIL, sans transformer une attente de recall en gate `CRITIQUE`.
- **2026-06-29** — Bloc Phase 4 durci (`===VERDICTS_JSON===`, JSON sur une ligne) ; décision release assumée sur gate-clean ; spot-check des FAIL contre `live-output.md` sur les grilles denses.
- **2026-06-30** — `preuve` obligatoire et persistée par verdict ; densité bornée à 20–30 criteria ; garde fail-fast des codes 6 caractères. Les cycles management-package-pe confirment que **module depth ≠ live depth** : verrouiller le danger dans le `SKILL.md`, borner la grille pour la profondeur.

### Garde de version

Toute modification structurante du protocole (nombre de phases, lignées de modèles, formats livrables) = nouveau document `sparring-scoring-protocol-v2.md` + référence croisée. Pas d'écrasement silencieux.

> **Décision (2026-06-30, humain).** La promotion du workflow criteria atomiques
> tiered-gated au rang de référence release est une **évolution compatible de D.0**,
> harmonisée **in-place** : la variante holistique pondérée reste documentée comme
> historique (rejouable), il n'y a donc **pas d'écrasement silencieux** justifiant un
> `sparring-scoring-protocol-v2.md`. Un v2 ne sera créé que pour un changement
> réellement structurant (nombre de phases, lignées de modèles, refonte des livrables).
