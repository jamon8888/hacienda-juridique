# Hacienda Propriété Intellectuelle — Vague D Release Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Passer `hacienda-propriete-intellectuelle` de v0.20.0 (état post-vagues A/B/C) à **v1.0.0 release-ready** avec (a) protocole méthodologique blind sparring scoring inscrit dans `main`, (b) ancrage doctrinal des 6 skills cœur métier déjà testés, (c) audit blind des 27 skills restants couvrant les spécificités PI du gap analysis initial, (d) re-validation blind post-ancrage des 6 skills cœur.

**Architecture:** Aucun nouveau code TypeScript dans `packages/core`. D.0 = nouveau doc protocole méthodologique + références croisées dans `CLAUDE.md` racine et plugin README. D.1 = modifications SKILL.md ciblées sur 6 skills cœur (citations articles + jurisprudence canonique + distinctions métier + anti-patterns explicites). D.2 = exécution distribuée entre Codex (phases 1/2/4) et Claude Code (phase 3) sur 27 skills répartis en 7 sprints parallélisables. D.3 = re-scoring blind des 6 skills cœur initiaux. D.4 = bump v1.0.0 + release notes.

**Tech Stack:** Markdown + YAML frontmatter pour skills Hacienda. Datasets Markdown fictifs. Protocole blind = Codex (GPT lineage) pour génération datasets / vérité terrain / scoring + Claude Code (Claude lineage) pour exécution live des skills. Séparation des lignées de modèles = isolation anti-leakage renforcée. Mécanismes existants consommés : pré-flight `check-pii`, post-flight `verifier-citations`, échelle 🔴🟠🟡🟢, sections canoniques V2.

**Référentiels d'analyse :**
- `docs/backlog/pi-vs-da-gap-analysis.md` (gap analysis initial — spécificités à vérifier en profondeur)
- `docs/backlog/pi-content-improvements-vague-c.md` (backlog vague C — 37 gaps identifiés)
- `docs/superpowers/plans/2026-05-31-hacienda-pi-alignement-da-vagues-abc.md` (plan vagues A/B/C clos)
- 6 rapports `docs/backlog/pi-scoring-*.md` (vague C — à marquer rétroactivement `[scoring auto-référent]`)

---

## Priorisation et chemins de release

| Sous-vague | Priorité | Bloquant pour | Effort Claude Code | Effort Codex |
|---|---|---|---|---|
| **D.0** Protocole blind | 🔴 prérequis | Toute future validation | 2-3 h | — |
| **D.1** Ancrage 6 skills testés | 🔴 bloquant | Release qualité v0.21.0 | ~15 h | — |
| **D.2** Audit 27 skills restants | 🟠 bloquant exhaustif | Release v1.0.0 exhaustive | ~45 h | ~60 h |
| **D.3** Re-scoring blind 6 | 🟠 bloquant qualité validée | Release qualité validée | ~10 h | ~12 h |
| **D.4** Cleanup + v1.0.0 | 🟡 release | Pousse externe | ~6 h | — |

**Trois chemins de release possibles :**
- **Chemin court — v0.21.0 qualité** : D.0 + D.1. ~18 h Claude Code, 0 Codex. Couvre les 6 skills cœur.
- **Chemin moyen — v0.22.0 validée** : D.0 + D.1 + D.3. ~28 h Claude Code, ~12 h Codex. Avec re-scoring blind.
- **Chemin long — v1.0.0 release-ready** : D.0 + D.1 + D.2 + D.3 + D.4. ~76 h Claude Code, ~72 h Codex. Couvre tous les skills.

---

## File Structure

### Fichiers NEUFS — D.0

```
docs/methodology/
├── sparring-scoring-protocol.md            # protocole formel 4 phases
└── codex-prompt-templates.md               # templates Codex Phase 1/2/4
```

### Fichiers MODIFIÉS — D.0

```
CLAUDE.md                                                  # section Vérification + référence protocole
plugins/hacienda-propriete-intellectuelle/tests/README.md  # référence protocole
plugins/hacienda-droit-affaires/tests/README.md           # référence protocole (si présent)
docs/backlog/pi-scoring-*.md                              # 6 rapports — note [scoring auto-référent]
```

### Fichiers MODIFIÉS — D.1

```
plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md          # G6 UPC + L.615-5-1 + procédé/produit + exemple 1
plugins/hacienda-propriete-intellectuelle/skills/preparation-depot-brevet/SKILL.md # G1 délai grâce CBE + G2 L.611-8 + G3 EP/PCT + G9 G10
plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur/SKILL.md     # G4 Cass. 1991 + G5 L.131-3 vs L.132-25 + G11 G12 G13
plugins/hacienda-propriete-intellectuelle/skills/revue-open-source/SKILL.md        # G14 LGPL §6 + G15 AGPL §13 + G16 Classpath + G17 SaaS/distribution
plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-marque/SKILL.md  # G7 Matratzen + G8 Madrid IR
plugins/hacienda-propriete-intellectuelle/skills/depot-dessin-modele/SKILL.md      # G32-G34 (calendrier, Locarno, RGPD)
plugins/hacienda-propriete-intellectuelle/version.json                              # 0.20.0 → 0.21.0
plugins/hacienda-propriete-intellectuelle/manifest.json
plugins/hacienda-propriete-intellectuelle/.claude-plugin/plugin.json
plugins/hacienda-propriete-intellectuelle/mcp-server/package.json
plugins/hacienda-propriete-intellectuelle/CHANGELOG.md
package-lock.json
packages/core/test/hacienda-pi-cowork-structure.test.ts                            # version check 0.21.0
```

### Fichiers NEUFS — D.2 (27 datasets + 27 vérités + 27 scorings)

```
plugins/hacienda-propriete-intellectuelle/tests/datasets/
├── d2-analyse-opposition-marque/
│   ├── scenario.md           # phase 1 Codex (sans vérité terrain)
│   └── ground-truth.md       # phase 2 Codex (séparé)
├── d2-analyse-refus-inpi/
├── d2-anteriorite-invalidite/
├── d2-audit-pi-ma/
├── d2-bases-de-donnees/
├── d2-certificat-complementaire-protection/
├── d2-contrats-pi/
├── d2-contrefacon-dessin-modele/
├── d2-contrefacon-droit-auteur/
├── d2-depot-marque-fr/
├── d2-depot-preuve-creation/
├── d2-droits-voisins-ogc/
├── d2-licence-droit-auteur/
├── d2-logiciels-pi/
├── d2-mise-en-demeure-pi/
├── d2-portefeuille-pi/
├── d2-qualification-oeuvre/
├── d2-recherche-anteriorite-brevet/
├── d2-recherche-anteriorite-dm/
├── d2-revue-clause-pi/
├── d2-revue-logiciel-donnees/
├── d2-revue-portefeuille-brevets/
├── d2-revue-portefeuille-marques/
├── d2-saisie-contrefacon/
├── d2-strategie-defense-pi/
├── d2-strategie-extension-internationale/
├── d2-surveillance-marque/
├── d2-tableau-contrefacon-brevet/
└── d2-tri-contrefacon/

docs/backlog/
├── pi-scoring-d2-<skill>-<code>.md    # 27 rapports phase 4
└── pi-content-improvements-vague-d2.md # backlog consolidé
```

### Fichiers MODIFIÉS — D.2

```
plugins/hacienda-propriete-intellectuelle/version.json                            # 0.21.0 → 0.22.0
+ chaîne de version + CHANGELOG
```

### Fichiers NEUFS — D.3

```
plugins/hacienda-propriete-intellectuelle/tests/datasets/blind-rescore/
├── v2-marque-blind/ground-truth.md      # phase 2 Codex fresh
├── v2-brevet-blind/ground-truth.md
├── v2-dm-blind/ground-truth.md
├── v2-auteur-blind/ground-truth.md
├── v2-oss-blind/ground-truth.md
└── v2-contentieux-blind/ground-truth.md

docs/backlog/
├── pi-rescoring-blind-marque-<code>.md       # 6 rapports phase 4
├── pi-rescoring-blind-brevet-<code>.md
├── pi-rescoring-blind-dm-<code>.md
├── pi-rescoring-blind-auteur-<code>.md
├── pi-rescoring-blind-oss-<code>.md
├── pi-rescoring-blind-contentieux-<code>.md
└── pi-rescoring-d3-delta-vague-c.md          # comparaison delta vs vague C
```

---

# D.0 — Protocole méthodologique blind sparring scoring

**Goal:** Inscrire la méthodologie blind 4 phases dans `main` pour qu'elle soit exigée à toute future validation interne.

## Task D.0.1 : Rédiger le protocole formel

**Files:**
- Create: `docs/methodology/sparring-scoring-protocol.md`

- [ ] **Step 1 : Structure du protocole**

Sections obligatoires :
1. **Pourquoi blind** (rappel du biais identifié vague C : 69,6 % auto-référent).
2. **Les 4 phases** (datasets / vérité terrain / exécution / scoring) avec rôles séparés.
3. **Anti-leakage rules** :
   - L'auteur du dataset (phase 1) ne peut pas être l'auteur de la vérité terrain (phase 2).
   - L'auteur de la vérité terrain ne peut pas être l'exécuteur live (phase 3).
   - L'exécuteur ne peut pas être le scoreur (phase 4).
   - Idéalement : séparation des lignées de modèles (Claude pour phase 3, Codex/GPT pour phases 1+2+4).
   - À défaut de modèle différent : sessions Claude Code séparées sans accès aux fichiers des autres phases.
4. **Codes scoring** : 6 caractères alphanumériques aléatoires (ex. K7M2PX, R4VN9W, M7K3PX) pour identifier chaque cycle de scoring.
5. **Formats livrables** par phase (avec templates).
6. **Quand appliquer le protocole** : tout sparring scoring justifiant une décision release ou un budget de modifications skill. **Skippable** uniquement pour audit informel sans engagement.
7. **Marquage des scorings hors protocole** : `[scoring auto-référent — méthodologie pré-D.0]` ou `[scoring informel]` selon le cas.

- [ ] **Step 2 : Templates de livrables**

Inclure dans le protocole :
- Template `scenario.md` (phase 1) — structure : titre, domaine, skill cible, mode, scénario fictif, pièces fournies, **PAS de vérité terrain**.
- Template `ground-truth.md` (phase 2) — structure : findings critiques attendus (🔴🟠🟡🟢), nuances métier subtiles, pièges à éviter, recommandation attendue, grille de scoring spécifique.
- Template phase 3 (sortie live du skill) — markdown standard du skill exécuté.
- Template `scoring-report.md` (phase 4) — grille pondérée + justification par dimension + gaps DESIGN + verdict + recommandations.

- [ ] **Step 3 : Vérification anti-leakage par fichier**

Documenter dans le protocole :
- Le fichier `ground-truth.md` est **gitignored par défaut** jusqu'à la fin du cycle de scoring, OU inscrit dans un sous-dossier `.ground-truth/` qui sert de signal d'isolation.
- L'exécuteur phase 3 reçoit **uniquement** le `scenario.md`, pas le `ground-truth.md`.
- Le scoreur phase 4 reçoit `scenario.md` + `ground-truth.md` + sortie live phase 3, mais **PAS** le `SKILL.md` du skill évalué (sinon il scorerait par comparaison structurelle au lieu d'évaluation substantive).

## Task D.0.2 : Rédiger les templates Codex Phase 1 / 2 / 4

**Files:**
- Create: `docs/methodology/codex-prompt-templates.md`

- [ ] **Step 1 : Template Codex Phase 1 — Génération dataset fictif**

Voir Appendice A en fin de plan. Le template doit :
- Décrire le domaine + skill cible + mode + contraintes métier
- Demander un scénario fictif avec parties / SIREN / montants / titres réalistes mais fictifs
- INTERDIRE de produire la vérité terrain dans le même output
- Imposer un disclaimer "fictif" en tête

- [ ] **Step 2 : Template Codex Phase 2 — Génération vérité terrain**

Voir Appendice A. Le template doit :
- Recevoir : le `scenario.md` de Phase 1 + une description neutre du skill cible (PAS le SKILL.md complet).
- Demander : findings critiques attendus + nuances métier + pièges + recommandation + grille de scoring adaptée.
- Le prompt doit insister sur l'évaluation "doctrine pure" (que dirait un avocat expert à partir des seuls faits ?), pas "que ferait le skill".

- [ ] **Step 3 : Template Codex Phase 4 — Scoring comparatif**

Voir Appendice A. Le template doit :
- Recevoir : `scenario.md` + `ground-truth.md` + sortie live phase 3.
- NE PAS recevoir le `SKILL.md` (anti-leakage scoring structurel).
- Demander : grille pondérée par dimension + verdict + gaps DESIGN inférés.

## Task D.0.3 : Inscription dans CLAUDE.md racine

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1 : Ajouter section dans Règles De Travail ou Vérification**

```markdown
## Validation interne (sparring scoring)

Toute validation interne par sparring scoring justifiant une décision release ou
un budget de modifications skill doit suivre le protocole blind à 4 phases défini
dans `docs/methodology/sparring-scoring-protocol.md`.

Les scorings produits sans séparation des phases (auteur dataset = auteur vérité
terrain = exécuteur = scoreur) sont marqués `[scoring auto-référent]` et ne
peuvent pas servir de justification release.

Les templates Codex pour phases 1, 2 et 4 sont dans
`docs/methodology/codex-prompt-templates.md`. Phase 3 (exécution live) reste
Claude Code natif.
```

## Task D.0.4 : Inscription dans plugins tests/README.md

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/tests/README.md`
- Modify: `plugins/hacienda-droit-affaires/tests/README.md` (si présent)

- [ ] **Step 1 : Ajouter section Méthodologie**

```markdown
## Méthodologie sparring scoring

Tout dataset `tests/datasets/*/scenario.md` destiné à servir de support à un
sparring scoring doit suivre le protocole blind défini dans
`docs/methodology/sparring-scoring-protocol.md`.

Phase 1 (scenario) et Phase 2 (ground-truth) sont produits dans des sessions /
modèles différents. La vérité terrain est conservée dans un fichier séparé
`ground-truth.md` non accessible à l'exécuteur Phase 3.
```

## Task D.0.5 : Marquage rétroactif des scorings vague C

**Files:**
- Modify: `docs/backlog/pi-scoring-marque-M7K3PX.md`
- Modify: `docs/backlog/pi-scoring-brevet-B5N9QZ.md`
- Modify: `docs/backlog/pi-scoring-dm-D3R4FW.md`
- Modify: `docs/backlog/pi-scoring-auteur-A2T6JL.md`
- Modify: `docs/backlog/pi-scoring-oss-S8W1HC.md`
- Modify: `docs/backlog/pi-scoring-contentieux-C9V5MK.md`
- Modify: `docs/backlog/pi-content-improvements-vague-c.md`

- [ ] **Step 1 : Ajouter note en tête de chaque rapport**

```markdown
> ⚠️ **`[scoring auto-référent — méthodologie pré-D.0]`** — ce scoring a été produit avant
> formalisation du protocole blind (`docs/methodology/sparring-scoring-protocol.md`).
> L'auteur des datasets, de la vérité terrain et de l'orchestration du scoring est le même
> acteur. Les scores sont à traiter comme **borne supérieure indicative**, pas comme
> mesure release-grade. Re-validation prévue en D.3 (plan vague D).
```

## Task D.0.6 : Helper script Codex (intégration scriptée)

**Files:**
- Create: `scripts/codex-blind-scoring.py` (Python 3, sans dépendances tierces)
- Create: `scripts/README-codex-blind-scoring.md` (mode d'emploi court)

**Pourquoi un script** : éviter les erreurs de chemins, de codes scoring, de copier-coller approximatif des templates. Le script prépare le prompt prêt à coller dans Codex + crée les dossiers de sortie + valide l'absence de leakage (par exemple, refuse de générer un prompt Phase 4 si le SKILL.md est dans les inputs).

- [ ] **Step 1 : Interface CLI à 3 sous-commandes**

```
python3 scripts/codex-blind-scoring.py phase1 \
  --skill <nom-skill> \
  --domain <domaine> \
  --mode "<mode invocation>" \
  --specificites "<liste spécificités gap analysis séparées par ' ; '>" \
  --code <CODE6> \
  --output <chemin-output-scenario.md>

python3 scripts/codex-blind-scoring.py phase2 \
  --skill <nom-skill> \
  --skill-description "<2-3 lignes neutres>" \
  --domain <domaine> \
  --mode "<mode>" \
  --scenario <chemin-scenario.md> \
  --output <chemin-output-ground-truth.md>

python3 scripts/codex-blind-scoring.py phase4 \
  --skill <nom-skill> \
  --code <CODE6> \
  --scenario <chemin-scenario.md> \
  --ground-truth <chemin-ground-truth.md> \
  --live-output <chemin-live-output.md> \
  --output <chemin-output-scoring.md>
```

- [ ] **Step 2 : Comportement par sous-commande**

Pour chaque phase :
1. Lit les inputs nécessaires (scenario, ground-truth, live-output selon phase).
2. Charge le template Codex correspondant depuis `docs/methodology/codex-prompt-templates.md` (parse les sections).
3. Substitue les placeholders ({skill}, {domain}, {mode}, etc.).
4. Crée le répertoire parent du fichier output si absent.
5. Imprime le prompt prêt à coller sur stdout AVEC séparateur clair `>>> PROMPT CODEX <<<` au début et `<<< FIN PROMPT >>>` à la fin.
6. Imprime sur stderr un récapitulatif : modèle recommandé (GPT-5.5 effort medium/high selon phase), chemins inputs/output, code scoring, alerte si quelque chose manque.

- [ ] **Step 3 : Garde-fous anti-leakage dans le script**

Le script doit refuser explicitement si :
- Phase 1 : output path contient déjà un fichier `ground-truth.md` à côté (signal qu'on retape par erreur).
- Phase 2 : scenario.md contient une section "Vérité terrain" ou "Critères de scoring" (signal de leakage).
- Phase 4 : un quelconque argument pointe vers un fichier `SKILL.md` (le scoreur ne doit pas y avoir accès).
- Toute phase : le code scoring est < 6 chars ou non alphanumérique → refus.

Si garde-fou échoue, exit code 2 + message stderr explicite.

- [ ] **Step 4 : Modèle Codex documenté dans le script**

En tête du fichier Python, en docstring :

```
Modèle Codex recommandé :
- Phase 1 (datasets)   : GPT-5.5 effort medium
- Phase 2 (vérité terrain) : GPT-5.5 effort HIGH  ← phase la plus consequence
- Phase 4 (scoring)    : GPT-5.5 effort medium

GPT-4.5 (orion) déconseillé : risque de citations CPI / CJUE inventées sur
domaine niche droit français PI.
```

- [ ] **Step 5 : Mode d'emploi**

`scripts/README-codex-blind-scoring.md` doit contenir :
- Workflow type pour un skill (3 commandes successives entrecoupées de sessions Codex et Claude Code).
- Comment lancer une session Codex (CLI ou web) sans contaminer les autres phases (un onglet / session distincte par phase).
- Comment générer un code scoring aléatoire 6 chars (oneliner `python3 -c "import secrets, string; print(''.join(secrets.choice(string.ascii_uppercase+string.digits) for _ in range(6)))"`).
- Comment valider qu'un cycle de scoring est blind (checklist anti-leakage).

- [ ] **Step 6 : Test fonctionnel**

Lancer une fois sur un skill jouet pour vérifier que le prompt généré est cohérent :

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill audit-pi-ma \
  --domain transverse \
  --mode "audit DD M&A multi-actifs" \
  --specificites "chaîne titularité L.131-3 et L.113-9" \
  --code TEST00 \
  --output /tmp/scenario-test.md
```

Expected : prompt complet imprimé sur stdout, message récap sur stderr, dossier `/tmp` cible OK.

## Task D.0.7 : Vérification finale D.0

- [ ] **Step 1 : Tests packages/core**

```bash
npm test
```

Expected: PASS (D.0 docs-only).

- [ ] **Step 2 : Branding + diff check**

```bash
npm run branding:check && git diff --check
```

- [ ] **Step 3 : Script Python exécutable**

```bash
python3 scripts/codex-blind-scoring.py --help
```

Expected : help imprimé sans erreur.

## Critère de sortie D.0

- [ ] Protocole + templates Codex en place dans `docs/methodology/`.
- [ ] Helper script `scripts/codex-blind-scoring.py` opérationnel avec 3 sous-commandes + garde-fous anti-leakage.
- [ ] CLAUDE.md racine fait référence au protocole.
- [ ] Plugin tests/README.md fait référence au protocole.
- [ ] 6 rapports vague C marqués rétroactivement.
- [ ] Tests verts.

---

# D.1 — Ancrage doctrinal des 6 skills déjà testés

**Goal:** Combler les gaps DESIGN identifiés en vague C en ajoutant citations articles + jurisprudence canonique + distinctions métier + anti-patterns dans les SKILL.md cœur. Sortie : PI v0.21.0.

**Méthode :** Délégation à 6 subagents Opus en parallèle, un par skill. Chaque subagent reçoit son `SKILL.md` actuel + le rapport de scoring vague C correspondant + les gaps à combler.

## Task D.1.1 : Refonte `contentieux-pi` (priorité 1 — bloquant pharma)

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md`
- Reference: `docs/backlog/pi-scoring-contentieux-C9V5MK.md`

- [ ] **Step 1 : Ajouter étape « Qualification type brevet »** (procédé / produit / dispositif) en début de séquence Sortie.
- [ ] **Step 2 : Ajouter section « Compétence forum »** TJ Paris L.615-17 vs UPC (depuis 1er juin 2023), avec vérification statut brevet unitaire + opt-out.
- [ ] **Step 3 : Ajouter mention L.615-5-1 CPI** (renversement charge de preuve pour brevets procédé sur produit nouveau) dans étape Recevabilité.
- [ ] **Step 4 : Refondre Exemple 1** — saisie-contrefaçon AVANT référé sur brevet procédé (anti-pattern actuel à corriger).
- [ ] **Step 5 : Ajouter étape « Audit défense nullité reconventionnelle »** AVANT assignation (G18 référé conditions strictes + risque art. 1240).
- [ ] **Step 6 : Ajouter note « AMM ≠ FTO »** dans Qualification dossier (G19).
- [ ] **Step 7 : Ajouter dans section Ton** : « Pression interne client — qualité procédure prime sur vitesse » (G20).

## Task D.1.2 : Refonte `preparation-depot-brevet` (priorité 2 — 3 🔴)

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/preparation-depot-brevet/SKILL.md`
- Reference: `docs/backlog/pi-scoring-brevet-B5N9QZ.md`

- [ ] **Step 1 : Ajouter étape « Vérification divulgation antérieure & délai de grâce »** avec citation Art. 55 CBE (6 mois pour abus tiers ou expositions internationales reconnues) et précision Art. L.611-13 CPI (délai français restrictif vs US 1 an générique).
- [ ] **Step 2 : Ajouter étape « Audit chaîne titularité + conventions de recherche tiers »** avec citation L.611-8 CPI (revendication propriété 5 ans).
- [ ] **Step 3 : Ajouter section « Routage extension »** avec arbitrage chiffré FR seul / FR+EP / FR+PCT / hybride + Art. 4 PCT (gel 30 mois) + Art. 22 PCT (entrée phase nationale).
- [ ] **Step 4 : Ajouter dans étape Recherche antériorité** un paragraphe « Statut juridictionnel des antériorités vs portée territoriale » (G9 brevet US non délivré Europe).
- [ ] **Step 5 : Ajouter sous-étape « Audit contrats travail inventeurs salariés »** avec citation L.611-7 CPI (inventions de mission / hors mission attribuables) (G10).

## Task D.1.3 : Refonte `cession-droit-auteur` (priorité 3 — 2 🔴)

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur/SKILL.md`
- Reference: `docs/backlog/pi-scoring-auteur-A2T6JL.md`

- [ ] **Step 1 : Ajouter dans étape rédaction L.131-3** un garde-fou explicite « Refuser clauses "médias inconnus à venir" sans mécanisme de cession complémentaire » avec citation **Cass. 1re civ. 9 oct. 1991** (G4).
- [ ] **Step 2 : Ajouter decision tree en début Sortie** : « Œuvre déjà audiovisuelle produite ? → L.132-25 présomption / Œuvre en amont (scénario, bible) ? → L.131-3 classique » (G5).
- [ ] **Step 3 : Ajouter checkpoint « Vérification antériorité titre L.112-4 al.2 »** dans étape Audit titularité (G11).
- [ ] **Step 4 : Ajouter sous-étape « Identification co-auteurs salariés + audit contrats travail »** avec rappel L.113-9 logiciel uniquement (G12).
- [ ] **Step 5 : Ajouter checkpoint « Personnages inspirés de personnes réelles → garantie d'éviction étendue »** (G13).

## Task D.1.4 : Refonte `revue-open-source` (priorité 4 — 0 🔴 mais 4 🟠 doctrinaux)

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/revue-open-source/SKILL.md`
- Reference: `docs/backlog/pi-scoring-oss-S8W1HC.md`

- [ ] **Step 1 : Ajouter étape « Analyse linking statique vs dynamique »** sur composants LGPL avec citation LGPL §6 (G14).
- [ ] **Step 2 : Ajouter dans étape Classification une note « AGPL section 13 conditionnelle »** — modification + interaction réseau utilisateur (G15).
- [ ] **Step 3 : Ajouter note « Classpath exception »** — vérifier origine et application (G16).
- [ ] **Step 4 : Ajouter en début Sortie une étape « Qualification scope d'exploitation »** : SaaS hosted / distribution classique / hybride avec impact sur classification (G17).

## Task D.1.5 : Refonte `recherche-anteriorite-marque` (priorité 5 — déjà 🟢)

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-marque/SKILL.md`
- Reference: `docs/backlog/pi-scoring-marque-M7K3PX.md`

- [ ] **Step 1 : Ajouter Matratzen Concord T-6/01** dans table d'arrêts CJUE canoniques étape 6 Appréciation globale (G7).
- [ ] **Step 2 : Ajouter sous-étape « Cartographie désignations Madrid IR vs territoires visés »** (G8).

## Task D.1.6 : Refonte `depot-dessin-modele` (priorité 6 — 7 gaps mineurs)

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/depot-dessin-modele/SKILL.md`
- Reference: `docs/backlog/pi-scoring-dm-D3R4FW.md`

- [ ] **Step 1 : Ajouter gate « blocked » sur divulgation future programmée** dans étape Calendrier.
- [ ] **Step 2 : Ajouter règle « 1 classe Locarno = 1 DMC »** en garde-fou explicite.
- [ ] **Step 3 : Ajouter mention qualité déposant L.422-4 / R.512-2 / Art. 78 RDMC**.
- [ ] **Step 4 : Ajouter checkpoint RGPD mannequins humains** dans étape Reproductions.
- [ ] **Step 5 : Ajouter mention ajournement asymétrique par modèle**.

## Task D.1.7 : Bump version + CHANGELOG D.1

**Files:**
- Modify: 5 fichiers de version (version.json, manifest.json, plugin.json, mcp-server/package.json, package-lock.json)
- Modify: `CHANGELOG.md`
- Modify: `packages/core/test/hacienda-pi-cowork-structure.test.ts` (version check)

- [ ] **Step 1 : Bump 0.20.0 → 0.21.0** sur les 5 fichiers de version.
- [ ] **Step 2 : Entrée CHANGELOG 0.21.0** détaillant les 6 refontes par skill.
- [ ] **Step 3 : Mettre à jour test version 0.20.0 → 0.21.0**.

## Task D.1.8 : Vérification finale D.1

- [ ] **Step 1 :** `npm test` (cible : 308 passed).
- [ ] **Step 2 :** `npm run typecheck && npm run build && npm run branding:check && git diff --check`.

## Critère de sortie D.1

- [ ] 6 SKILL.md modifiés avec ancrage doctrinal.
- [ ] Bump 0.21.0 propagé.
- [ ] Tests verts.
- [ ] PR mergeable.

---

# D.2 — Audit blind 27 skills restants (distribution Codex + Claude Code)

**Goal:** Couvrir les 27 skills non testés en vague C + spécificités gap analysis. Sortie : PI v0.22.0.

**Distribution :**
- **Codex** : Phases 1 (datasets), 2 (vérité terrain), 4 (scoring) sur les 27 skills.
- **Claude Code** : Phase 3 (exécution live des skills) sur les 27 skills.
- **Anti-leakage** : ground-truth conservés dans `tests/datasets/d2-<skill>/ground-truth.md` non accessibles à Claude Code Phase 3.

**Découpage en 7 sprints parallélisables :**

| Sprint | Skills | Spécificités gap analysis adressées |
|---|---|---|
| **D.2-a Marques** (6) | analyse-opposition-marque, analyse-refus-inpi, anteriorite-invalidite, depot-marque-fr, surveillance-marque, revue-portefeuille-marques | L.711-2 motifs absolus, L.712-4 opposition, L.712-4-1 restauration, L.714-3 nullité, BOPI |
| **D.2-b Brevets** (5) | certificat-complementaire-protection, recherche-anteriorite-brevet, revue-portefeuille-brevets, strategie-extension-internationale, tableau-contrefacon-brevet | OEB Règle 132 EPC, INPI R.612-66, CCP Règl. CE 469/2009, PCT 30 mois |
| **D.2-c D&M** (2) | contrefacon-dessin-modele, recherche-anteriorite-dm | RDMC art. 6 caractère individuel, RDMC art. 7 §2 délai grâce |
| **D.2-d Droit auteur** (5) | contrefacon-droit-auteur, depot-preuve-creation, droits-voisins-ogc, licence-droit-auteur, qualification-oeuvre | L.131-3 cession, L.131-4 rémunération, L.212-1+ droits voisins, OGC, L.331-1 contrefaçon, L.121-1 droit moral |
| **D.2-e Logiciel / BdD** (3) | bases-de-donnees, revue-logiciel-donnees, logiciels-pi | L.341-1 sui generis, L.113-9 employeur logiciel |
| **D.2-f Contentieux / Enforcement** (4) | mise-en-demeure-pi, saisie-contrefacon, strategie-defense-pi, tri-contrefacon | L.615-17 TJ Paris, RMUE art. 123, RDMC art. 80, L.615-5 saisie |
| **D.2-g Transverse** (4) | audit-pi-ma, contrats-pi, revue-clause-pi, portefeuille-pi | Chaîne titularité M&A, TTBER UE 316/2014, formalités opposabilité |

**Skills EXCLUS de l'audit doctrinal D.2** (justifiés) :
- `check-pii` (méta-skill JSON, sans arbitrage subjectif)
- `clearance-marque` (stub redirect)
- `entretien-demarrage` (onboarding sans output juridique)
- `verifier-citations` (méta-skill post-flight)
- `consulter-digest` (lecture)

## Task D.2.0 : Setup commune D.2

- [ ] **Step 1 :** Créer structure `tests/datasets/d2-<skill>/` pour les 27 skills.
- [ ] **Step 2 :** Générer 27 codes scoring aléatoires (format 6 chars alphanumériques).
- [ ] **Step 3 :** Préparer la liste des spécificités à adresser par sprint (cf. tableau ci-dessus).

## Task D.2.1 à D.2.7 : 7 sprints parallèles (méthode identique)

Pour chaque sprint (D.2-a à D.2-g) :

### Phase 1 — Codex génère les datasets

- [ ] **Step 1 (Codex, session par sprint) :** Pour chaque skill du sprint, lancer le template Codex Phase 1 (cf. `docs/methodology/codex-prompt-templates.md`) avec contexte sprint + skill + spécificité gap analysis ciblée.
- [ ] **Step 2 :** Sauvegarder les outputs dans `tests/datasets/d2-<skill>/scenario.md`.
- [ ] **Step 3 :** Vérifier qu'AUCUN scenario.md ne contient de section "Vérité terrain" (anti-leakage).

### Phase 2 — Codex génère les vérités terrain

- [ ] **Step 1 (Codex, session distincte de Phase 1) :** Pour chaque skill du sprint, lancer le template Codex Phase 2 avec `scenario.md` + description neutre du skill (PAS le SKILL.md).
- [ ] **Step 2 :** Sauvegarder dans `tests/datasets/d2-<skill>/ground-truth.md`.

### Phase 3 — Claude Code exécute les skills live

- [ ] **Step 1 (Claude Code) :** Pour chaque skill du sprint, lancer `/h-pi:<skill>` sur `tests/datasets/d2-<skill>/scenario.md` (sans accès au ground-truth).
- [ ] **Step 2 :** Sauvegarder la sortie live dans `tests/datasets/d2-<skill>/live-output.md`.

### Phase 4 — Codex score

- [ ] **Step 1 (Codex, session distincte des Phases 1, 2 et 3) :** Pour chaque skill, fournir scenario + ground-truth + live-output (PAS le SKILL.md). Lancer template Codex Phase 4.
- [ ] **Step 2 :** Sauvegarder dans `docs/backlog/pi-scoring-d2-<skill>-<code>.md`.

## Task D.2.8 : Backlog consolidé D.2

**Files:**
- Create: `docs/backlog/pi-content-improvements-vague-d2.md`

- [ ] **Step 1 :** Agréger les findings des 27 scorings par skill.
- [ ] **Step 2 :** Identifier patterns transversaux (par domaine, par type de gap).
- [ ] **Step 3 :** Priorité 🔴 / 🟠 / 🟡 sur les gaps par skill.
- [ ] **Step 4 :** Recommander une vague E si findings massifs.

## Task D.2.9 : Bump version D.2

- [ ] Bump 0.21.0 → 0.22.0 (5 fichiers + CHANGELOG + test).

## Critère de sortie D.2

- [ ] 27 scenario + 27 ground-truth + 27 live-output + 27 scoring.
- [ ] Backlog consolidé D.2.
- [ ] Bump 0.22.0 propagé.
- [ ] Tests verts.

---

# D.3 — Re-scoring blind des 6 skills initiaux

**Goal:** Re-valider en blind les 6 skills cœur post-ancrage doctrinal D.1.

**Méthode :** Réutiliser les 6 datasets vague C en supprimant la vérité terrain (qui devient `ground-truth.md` séparé, réécrit par Codex en fresh).

## Task D.3.1 : Préparer datasets blind

**Files:**
- Create: `tests/datasets/blind-rescore/v2-marque-blind/scenario.md` (copie sans vérité terrain)
- Create: `tests/datasets/blind-rescore/v2-marque-blind/ground-truth.md` (Codex fresh)
- Idem pour les 5 autres domaines

- [ ] **Step 1 :** Copier les 6 scenarios vague C, supprimer les sections "Vérité terrain attendue" et "Critères de scoring".
- [ ] **Step 2 (Codex) :** Réécrire 6 ground-truth fresh à partir des scenarios sans accès aux vérités terrain initiales.

## Task D.3.2 : Exécuter les 6 skills blind (Claude Code)

- [ ] **Step 1 :** Pour chaque skill cœur (post-D.1), lancer sur le scenario blind. Sauvegarder live-output.

## Task D.3.3 : Scorer en blind (Codex)

- [ ] **Step 1 :** Codex score les 6 outputs comparés aux ground-truth Codex.
- [ ] **Step 2 :** Sauvegarder dans `docs/backlog/pi-rescoring-blind-<domaine>-<code>.md`.

## Task D.3.4 : Delta D.3 vs vague C

**Files:**
- Create: `docs/backlog/pi-rescoring-d3-delta-vague-c.md`

- [ ] **Step 1 :** Tableau comparatif scoring vague C vs scoring blind D.3 par skill.
- [ ] **Step 2 :** Identifier les gains d'ancrage doctrinal effectifs (gaps D.1 effectivement comblés).
- [ ] **Step 3 :** Identifier les gaps restants malgré D.1 (candidates pour vague E).

## Critère de sortie D.3

- [ ] Cible : moyenne pondérée ≥ 82 % sur les 6 skills (vs 69,6 % vague C auto-référent).
- [ ] Delta D.3 vs vague C documenté.
- [ ] Décision release v1.0.0 prise sur la base du delta.

---

# D.4 — Cleanup et release v1.0.0

## Task D.4.1 : CHANGELOG consolidé vague D

- [ ] Synthèse D.0 + D.1 + D.2 + D.3 dans `CHANGELOG.md`.

## Task D.4.2 : Validation interne associé

- [ ] Échantillonnage 6 skills cœur post-D.1 + 5-6 skills D.2 random.
- [ ] Validation associé sur les sorties live échantillonnées.

## Task D.4.3 : Bump v1.0.0

- [ ] Bump 0.22.0 → 1.0.0 (5 fichiers + CHANGELOG + test).

## Task D.4.4 : Release notes externes

**Files:**
- Create ou Modify: `plugins/hacienda-propriete-intellectuelle/README_UTILISATEUR.md`

- [ ] Documenter les nouveautés utilisateur final v1.0.0.

## Task D.4.5 : Packaging ZIP final

- [ ] Lancer `scripts/package_plugin.sh` pour produire le ZIP installable Cowork.

## Critère de sortie D.4

- [ ] v1.0.0 mergeable.
- [ ] ZIP installable produit.
- [ ] Release notes utilisateur.

---

## Coordination

- **Branche par sous-vague** : `feat/pi-v0.21-vague-d1`, `feat/pi-v0.22-vague-d2`, `feat/pi-v0.22.1-vague-d3`, `feat/pi-v1.0-vague-d4`. D.0 sur sa propre branche `chore/methodology-blind-protocol`.
- **D.0 prérequis** : à merger AVANT toute autre vague.
- **D.1 et D.2 en parallèle** possible si on accepte un retard de coordination CHANGELOG.
- **D.3 dépend de D.1** mergé.
- **D.4 dépend de D.1 + D.2 + D.3** mergés.
- **Tests** : `npm test && npm run typecheck && npm run build && npm run branding:check && git diff --check` avant chaque push.
- **GitNexus** : `npx gitnexus analyze` après merges si embeddings préalables (cf. `.gitnexus/meta.json`).

## Recommandation de lancement

**Lancer D.0 immédiatement** (2-3 h, indépendant). Puis **D.1 en session Opus dédiée** (~15 h, parallélisable via 6 subagents). Décider entre chemin moyen et long une fois D.1 mergé.

---

# Appendice A — Templates Codex (à intégrer dans `docs/methodology/codex-prompt-templates.md`)

## Template Codex Phase 1 — Génération dataset fictif

```
ROLE: Tu génères un dataset de test fictif pour évaluer la qualité d'un skill juridique
français en propriété intellectuelle.

CONTEXTE : Tu fais partie d'un protocole blind de sparring scoring. Ton output (le
dataset) servira ensuite à un autre acteur (différent modèle) qui définira la vérité
terrain. Un troisième acteur exécutera le skill sur ton dataset. Un quatrième scorrera.

CONSIGNE STRICTE : tu ne dois PAS produire la vérité terrain. Juste le scénario fictif
et les pièces.

INSTRUCTIONS :

Domaine : {domaine — ex. marques / brevets / D&M / droit d'auteur / logiciel-OSS / contentieux}
Skill cible : {nom du skill — ex. analyse-opposition-marque}
Mode : {mode — ex. analyse offensive d'une opposition INPI L.712-4}
Spécificités gap analysis à inclure : {liste des nuances métier que le dataset doit
  permettre de tester — ex. motifs absolus L.711-2 / restauration L.712-4-1}

Génère un dossier fictif :

1. SCÉNARIO : entité fictive (raison sociale, SIREN inventé, secteur), situation
   métier précise (deal en cours, contentieux en gestation, dépôt préparé,
   audit DD M&A, etc.), parties impliquées avec rôles, dates clés.

2. PIÈCES FOURNIES : extraits de documents fictifs typiques du dossier (contrat,
   correspondance, recherche INPI/EUIPO simulée, constat huissier, rapport
   technique, etc.) avec niveau de détail réaliste.

3. POSTURE CABINET (configurée) : posture enforcement, matrice approbateurs,
   tribunaux habituels, budget contentieux annuel, posture par défaut.

4. QUESTION OU DEMANDE EXPLICITE : ce que le déposant/avocat/client veut obtenir
   du skill.

CONTRAINTES :
- TOUT est fictif. Aucune partie réelle. SIREN inventés (9 chiffres aléatoires).
  Montants réalistes. Brevets/marques avec numéros inventés.
- Inclure subtilement les spécificités à tester sans annoncer "voici le piège
  à détecter" — un avocat expérimenté les verrait par lecture, mais elles ne
  sont pas étiquetées.
- Format Markdown.
- Disclaimer en tête : "*Dossier strictement fictif — toute ressemblance serait
  fortuite.*"
- Aucune section "Vérité terrain". Aucune section "Critères de scoring". Aucune
  recommandation. **Tu génères les faits, pas leur interprétation.**

OUTPUT : un fichier Markdown autonome, ~150-300 lignes.
```

## Template Codex Phase 2 — Génération vérité terrain

```
ROLE : Tu définis la vérité terrain juridique pour un dataset fictif déjà existant.
Tu agis comme un avocat expert PI senior français qui lit le dossier "à froid" et
identifie ce qu'un livrable de qualité partner-ready DEVRAIT capter.

CONTEXTE : Protocole blind de sparring scoring. Tu n'as pas écrit le dataset (autre
acteur). Tu ne sais pas exactement ce que le skill évalué fera (autre acteur). Tu
définis la vérité métier indépendante.

CONTRAINTE CLÉ : tu reçois le scénario fictif + une description NEUTRE et MINIMALE
du skill cible. **Tu ne reçois PAS le SKILL.md complet** (qui prescrirait ce que
le skill fait). Cela garantit que ta vérité terrain reflète ce qu'un expert pur
attendrait, pas ce que le skill est conçu pour produire.

INPUT :
- scenario.md (fourni)
- Skill cible : {nom + 2-3 lignes de description neutre — "skill de préparation
  de cession patrimoniale en droit d'auteur français", sans plus.}
- Mode : {mode appelé}
- Domaine : {domaine PI}

GÉNÈRE :

1. FINDINGS CRITIQUES ATTENDUS — par sévérité 🔴🟠🟡🟢 :
   - 🔴 Bloquant : ce qui rend une décision en l'état dangereuse / nulle / non
     opposable.
   - 🟠 Élevé : ce qui nécessite une correction substantielle avant action.
   - 🟡 Moyen : ce qui mérite vigilance ou clarification.
   - 🟢 Faible : ce qui est correct et n'appelle pas d'action.
   Chaque finding cite l'article du Code (CPI, C.civ, RMUE, RDMC, CBE) et/ou
   jurisprudence pertinente.

2. NUANCES MÉTIER SUBTILES À VALORISER : ce qu'un avocat expérimenté noterait
   en marge sans que ce soit un finding bloquant — mais qui distingue une
   sortie partner-ready d'une sortie générique.

3. PIÈGES À NE PAS TOMBER DEDANS : raisonnements faux mais tentants qu'un
   junior pourrait suivre. Au moins 5 pièges.

4. RECOMMANDATION ATTENDUE : verdict final (no-go / go avec conditions /
   stratégie à reprendre / etc.) + plan d'action chronologique 2-4 sprints.

5. GRILLE DE SCORING ADAPTÉE : pondération par dimension (Couverture
   périmètre 30 / Détection nuances métier 30 / Qualité arbitrage 20 /
   Lisibilité partner-ready 10 / Résistance aux pièges 10) avec indicateurs
   spécifiques au dossier.

CONTRAINTES :
- Cite explicitement les articles et arrêts CJUE/Cass. canoniques. Pas
  d'inférence vague.
- Pas de référence à ce que le skill prescrit. Tu raisonnes en avocat pur.
- Format Markdown.
- ~200-400 lignes.

OUTPUT : un fichier Markdown autonome.
```

## Template Codex Phase 4 — Scoring comparatif

```
ROLE : Tu scores une sortie live de skill juridique par comparaison à une vérité
terrain pré-définie. Tu agis comme un évaluateur indépendant.

CONTEXTE : Protocole blind de sparring scoring, phase 4. Tu reçois trois inputs.
Tu n'as pas accès au SKILL.md du skill évalué (sinon tu scorerais structurellement
au lieu d'évaluer substantiellement).

INPUTS :
- scenario.md (Phase 1) — le dossier fictif
- ground-truth.md (Phase 2) — la vérité terrain attendue
- live-output.md (Phase 3) — la sortie réelle du skill exécuté en live

ÉVALUE :

Pour chaque dimension de la grille de scoring (présente dans ground-truth.md),
note de 0 à 100 % :
1. Couverture du périmètre (poids 30 %) — combien de findings 🔴/🟠/🟡 de la
   vérité terrain sont effectivement présents dans la sortie live ?
2. Détection nuances métier (poids 30 %) — les nuances subtiles de la vérité
   terrain sont-elles articulées dans la sortie live ?
3. Qualité arbitrage subjectif (poids 20 %) — les cotations 🔴/🟠/🟡/🟢 dans
   la sortie live sont-elles calibrées ? Les recommandations actionnables ?
4. Lisibilité partner-ready (poids 10 %) — format, structure, en-tête
   confidentialité, note du relecteur, arbre 5 options.
5. Résistance aux pièges (poids 10 %) — la sortie live évite-t-elle les
   raisonnements faux listés dans les pièges de la vérité terrain ?

CALCULE :
- Score pondéré global = somme pondérée.
- Verdict : 🟢 (≥ 80 %) / 🟡 (60-79 %) / 🟠 (40-59 %) / 🔴 (< 40 %).

IDENTIFIE :
- Gaps DESIGN inférés : pour chaque finding 🔴/🟠 manqué dans la sortie live,
  qu'est-ce qui MANQUE dans le skill (sans le voir) pour qu'il l'attrape
  systématiquement ? Formule en termes d'étape, citation article, garde-fou,
  anti-pattern.
- Hits positifs : ce que la sortie live fait BIEN, au-delà de la vérité
  terrain attendue.

OUTPUT FORMAT — fichier Markdown :

# Sparring scoring — `<skill>` — Code <code>

**Date** : YYYY-MM-DD
**Skill évalué** : `<skill>` v<version>
**Scénario** : `<scenario path>`
**Méthode** : sparring scoring blind protocole D.0 (phase 4 Codex)

## Score pondéré

| Dimension | Poids | Score | Pondéré | Justification |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |
| Total | 100 % | — | XX % | Verdict 🟢/🟡/🟠/🔴 |

## Justification détaillée

[par dimension]

## Gaps DESIGN inférés (mini-backlog)

🔴 / 🟠 / 🟡 par gap

## Hits positifs

[ce que le skill fait bien]

## Recommandations vague ultérieure

[1-3 actions concrètes]

CONTRAINTES :
- Sois critique. Pas d'évaluation flatteuse.
- Si le live-output rate un finding 🔴 listé dans ground-truth → gap 🔴 inféré.
- Si le live-output l'attrape implicitement mais ne le nomme pas → cotation 70-80 %.
- Si le live-output le nomme explicitement avec citation article → cotation
  90-100 %.
```
