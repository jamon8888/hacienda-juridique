# Protocole méthodologique — Blind sparring scoring

**Statut** : protocole canonique du repo `hacienda-juridique`.
**Date d'inscription** : 2026-06-01.
**Référence dans CLAUDE.md** : section « Validation interne (sparring scoring) ».
**Plan d'origine** : `docs/superpowers/plans/2026-06-01-hacienda-pi-vague-d-release-readiness.md` § D.0.

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
**Output** : un fichier `scenario.md` contenant uniquement le scénario fictif + pièces fournies + posture cabinet + question explicite.
**Interdiction stricte** : aucune section "Vérité terrain", aucune recommandation, aucune cotation 🔴🟠🟡🟢.

Template canonique : voir `docs/methodology/codex-prompt-templates.md` § Phase 1.

### Phase 2 — Définition de la vérité terrain

**Acteur** : Codex (GPT-5.5 effort **HIGH** — phase la plus consequence), session distincte de Phase 1.
**Input** : `scenario.md` de Phase 1 + une **description neutre minimale** du skill cible (2-3 lignes). **PAS le SKILL.md complet** — c'est l'anti-leakage critique.
**Output** : un fichier `ground-truth.md` contenant les findings critiques attendus, nuances métier subtiles, pièges, recommandation, grille de scoring adaptée.

Template canonique : voir `docs/methodology/codex-prompt-templates.md` § Phase 2.

### Phase 3 — Exécution live du skill

**Acteur** : Claude Code, session dédiée. **Environnement natif** du skill (`/h-pi:<skill>`).
**Input** : le `scenario.md` seul. **PAS d'accès au `ground-truth.md`**.
**Output** : la sortie réelle du skill exécuté, capturée dans `live-output.md`.

Cette phase est la seule qui ne se prête pas à Codex (les skills vivent dans l'écosystème Claude Code / Cowork).

### Phase 4 — Scoring comparatif

**Acteur** : Codex (GPT-5.5 effort medium), session distincte des Phases 1, 2 et 3.
**Inputs** : `scenario.md` + `ground-truth.md` + `live-output.md`. **PAS le `SKILL.md`** — sinon le scoreur compare structures au lieu d'évaluer substantiellement.
**Output** : un rapport de scoring dans `docs/backlog/pi-scoring-<domaine>-<code>.md` avec grille pondérée + verdict + gaps DESIGN inférés.

Template canonique : voir `docs/methodology/codex-prompt-templates.md` § Phase 4.

---

## 3. Anti-leakage rules

### Règles dures (refus inconditionnel)

1. **L'auteur du dataset** (Phase 1) **n'écrit jamais la vérité terrain** (Phase 2) dans la même session.
2. **L'auteur de la vérité terrain** (Phase 2) **n'a pas accès au SKILL.md** du skill cible — uniquement une description neutre 2-3 lignes.
3. **L'exécuteur live** (Phase 3) **n'a pas accès à `ground-truth.md`** — uniquement `scenario.md`.
4. **Le scoreur** (Phase 4) **n'a pas accès au SKILL.md** — uniquement les 3 livrables des phases précédentes.
5. **Idéalement** : séparation des lignées de modèles. Codex (lignée GPT) pour Phases 1+2+4, Claude Code (lignée Claude) pour Phase 3. À défaut : sessions Claude Code distinctes sans accès aux fichiers des autres phases (chaque session ouvre uniquement les fichiers qu'elle est censée voir).

### Règles souples (à documenter si transgressées)

- Codes scoring (6 caractères alphanumériques aléatoires) : permet de tracer un cycle complet. Ex. K7M2PX, R4VN9W.
- `ground-truth.md` peut être versionné en git mais doit être **conservé dans un sous-dossier `ground-truth/` ou un fichier explicitement nommé** pour signaler son isolation.
- Si le même acteur réalise plusieurs phases consécutives par contrainte (par exemple absence d'accès Codex), c'est admissible mais le scoring final doit être marqué `[scoring partiellement blind]` ou `[scoring auto-référent]` selon le cas.

---

## 4. Codes scoring et structure de dossier

### Code scoring

6 caractères alphanumériques aléatoires majuscules. Oneliner Python :

```bash
python3 -c "import secrets, string; print(''.join(secrets.choice(string.ascii_uppercase+string.digits) for _ in range(6)))"
```

Exemples historiques : K7M2PX (DA SPA review), R4VN9W (DA GAP review), M7K3PX (PI marque), B5N9QZ (PI brevet), etc.

### Structure dossier par cycle

```
plugins/<plugin>/tests/datasets/<batch>-<skill>/
├── scenario.md           # Phase 1 — Codex
├── ground-truth.md       # Phase 2 — Codex (session distincte)
└── live-output.md        # Phase 3 — Claude Code

docs/backlog/
└── <plugin-prefix>-scoring-<batch>-<skill>-<code>.md   # Phase 4 — Codex
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

Les 3 templates (Phase 1, Phase 2, Phase 4) sont les versions canoniques à utiliser ou à étendre. Modifications majeures = nouveau protocole D.x.x.

---

## 9. Référence dans CLAUDE.md racine

Ce protocole est inscrit dans `CLAUDE.md` racine du repo (section « Validation interne ») comme exigence. Voir aussi les références dans :
- `plugins/hacienda-propriete-intellectuelle/tests/README.md`
- `plugins/hacienda-droit-affaires/tests/README.md`
- Tout futur plugin métier publié sous Hacienda.

---

## 10. Évolutions

Toute modification structurante du protocole (nombre de phases, lignées de modèles, formats livrables) = nouveau document `sparring-scoring-protocol-v2.md` + référence croisée. Pas d'écrasement silencieux.
