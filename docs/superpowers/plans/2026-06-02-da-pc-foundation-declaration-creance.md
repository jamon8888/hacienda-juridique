# DA Procédures Collectives — Fondation tiered-gated + declaration-creance — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Outiller le scoring `tiered-gated` (agrégation déterministe + templates Codex Phase 2/4 criteria) puis l'appliquer à `declaration-creance` pour produire le premier score blind release-grade de DA.

**Architecture:** Une fonction Python pure d'agrégation `tiered-gated` (le juge Codex rend PASS/FAIL par criterion, Python calcule le gate de façon déterministe), deux nouveaux templates Codex (vérité terrain au format criteria atomiques + scoring criterion-par-criterion), deux sous-commandes du helper existant, puis l'ancrage doctrinal de `declaration-creance` validé par un cycle blind complet.

**Tech Stack:** Python 3 (stdlib + pytest) pour le tooling ; Markdown pour templates, SKILL.md et criteria ; Codex GPT-5.5 (externe) pour Phases 2/4 ; le helper `scripts/codex-blind-scoring.py` existant comme socle.

---

## File Structure

| Fichier | Responsabilité |
|---|---|
| `scripts/tiered_scoring.py` (créer) | Agrégation `tiered-gated` pure + chargement des verdicts JSON Codex + CLI |
| `scripts/test_tiered_scoring.py` (créer) | Tests unitaires de l'agrégation |
| `docs/methodology/codex-prompt-templates.md` (modifier) | Ajout des sections « Phase 2 criteria » et « Phase 4 criteria » |
| `scripts/codex-blind-scoring.py` (modifier) | `load_one_template()` + sous-commandes `phase2-criteria` / `phase4-criteria` |
| `plugins/hacienda-droit-affaires/tests/datasets/da-declaration-creance/{scenario,ground-truth,live-output}.md` (créer) | Cycle blind declaration-creance |
| `plugins/hacienda-droit-affaires/skills/declaration-creance/SKILL.md` (modifier) | Ancrage doctrinal des axes spec §5.1 |
| `docs/backlog/da-scoring-declaration-creance-<CODE>.md` (créer) | Rapport de scoring Phase 4 |
| `plugins/hacienda-droit-affaires/tests/datasets/v2a/rupture-brutale-scenario.md` (supprimer) | Dataset leaky pré-D.0 remplacé par `da-rupture-brutale/` |

---

## Task 1: Agrégation `tiered-gated` (cœur déterministe)

**Files:**
- Create: `scripts/tiered_scoring.py`
- Test: `scripts/test_tiered_scoring.py`

- [ ] **Step 1: Écrire les tests qui échouent**

```python
# scripts/test_tiered_scoring.py
import json
import pytest
from tiered_scoring import Criterion, aggregate, load_verdicts


def test_gate_critique_fail_rejette_meme_si_tout_le_reste_passe():
    crit = [
        Criterion("C-018", "CRITIQUE", "FAIL"),
        Criterion("C-001", "MAJEUR", "PASS"),
        Criterion("C-031", "MINEUR", "PASS"),
    ]
    r = aggregate(crit)
    assert r["status"] == "REJETÉ"
    assert r["score"] == 0.0
    assert r["gate_failures"] == ["C-018"]


def test_tout_pass_est_admis_score_un():
    crit = [
        Criterion("C-010", "CRITIQUE", "PASS"),
        Criterion("C-001", "MAJEUR", "PASS"),
        Criterion("C-031", "MINEUR", "PASS"),
    ]
    r = aggregate(crit)
    assert r["status"] == "ADMIS"
    assert r["score"] == 1.0


def test_majeurs_partiels_sous_seuil_insuffisant():
    crit = [Criterion(f"M{i}", "MAJEUR", "PASS") for i in range(7)]
    crit += [Criterion(f"N{i}", "MAJEUR", "FAIL") for i in range(3)]  # 70 %
    r = aggregate(crit)
    assert r["status"] == "INSUFFISANT"


def test_majeurs_au_dessus_seuil_reserves():
    crit = [Criterion(f"M{i}", "MAJEUR", "PASS") for i in range(9)]
    crit += [Criterion("N0", "MAJEUR", "FAIL")]  # 90 %
    r = aggregate(crit)
    assert r["status"] == "RÉSERVES"


def test_niveau_invalide_leve_valueerror():
    with pytest.raises(ValueError):
        aggregate([Criterion("X", "BLOQUANT", "PASS")])


def test_load_verdicts_lit_le_json_codex(tmp_path):
    p = tmp_path / "verdicts.json"
    p.write_text(json.dumps({"criteria": [
        {"id": "C-020", "niveau": "CRITIQUE", "verdict": "FAIL"},
    ]}), encoding="utf-8")
    crit = load_verdicts(str(p))
    assert crit == [Criterion("C-020", "CRITIQUE", "FAIL")]
```

- [ ] **Step 2: Lancer les tests pour vérifier l'échec**

Run: `cd scripts && python3 -m pytest test_tiered_scoring.py -v`
Expected: FAIL — `ModuleNotFoundError: No module named 'tiered_scoring'`
(Si pytest absent : `python3 -m pip install --user pytest` puis relancer.)

- [ ] **Step 3: Écrire l'implémentation minimale**

```python
# scripts/tiered_scoring.py
#!/usr/bin/env python3
"""Agrégation tiered-gated pour le scoring par criteria atomiques (protocole blind Hacienda).

Chaque criterion a un niveau (CRITIQUE | MAJEUR | MINEUR) et un verdict (PASS | FAIL).
Règle d'agrégation :
  - Tout CRITIQUE FAIL est un gate : status REJETÉ, score 0.0, quel que soit le reste.
  - Sinon le status dérive du taux de réussite des MAJEURS.
"""
from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path

NIVEAUX = ("CRITIQUE", "MAJEUR", "MINEUR")
VERDICTS = ("PASS", "FAIL")

# Seuils sur le taux de réussite des MAJEURS (gates exclus du calcul).
SEUIL_ADMIS = 1.0      # tous les majeurs PASS
SEUIL_RESERVES = 0.8   # >= 80 % des majeurs PASS


@dataclass(frozen=True)
class Criterion:
    id: str
    niveau: str
    verdict: str


def _validate(criteria) -> None:
    for c in criteria:
        if c.niveau not in NIVEAUX:
            raise ValueError(f"niveau invalide pour {c.id}: {c.niveau}")
        if c.verdict not in VERDICTS:
            raise ValueError(f"verdict invalide pour {c.id}: {c.verdict}")


def _rate(criteria, niveau: str) -> float:
    items = [c for c in criteria if c.niveau == niveau]
    if not items:
        return 1.0
    passed = sum(1 for c in items if c.verdict == "PASS")
    return passed / len(items)


def aggregate(criteria) -> dict:
    """Retourne le résultat tiered-gated pour une liste de Criterion."""
    _validate(criteria)
    gate_failures = [c.id for c in criteria
                     if c.niveau == "CRITIQUE" and c.verdict == "FAIL"]
    majeur_rate = _rate(criteria, "MAJEUR")
    mineur_rate = _rate(criteria, "MINEUR")
    score = round(0.8 * majeur_rate + 0.2 * mineur_rate, 4)
    if gate_failures:
        status, score = "REJETÉ", 0.0
    elif majeur_rate >= SEUIL_ADMIS:
        status = "ADMIS"
    elif majeur_rate >= SEUIL_RESERVES:
        status = "RÉSERVES"
    else:
        status = "INSUFFISANT"
    return {
        "status": status,
        "score": score,
        "gate_failures": gate_failures,
        "majeur_rate": round(majeur_rate, 4),
        "mineur_rate": round(mineur_rate, 4),
    }


def load_verdicts(path: str):
    """Charge un fichier JSON de verdicts Codex (Phase 4 criteria) en liste de Criterion."""
    data = json.loads(Path(path).read_text(encoding="utf-8"))
    return [Criterion(id=v["id"], niveau=v["niveau"], verdict=v["verdict"])
            for v in data["criteria"]]


if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        print("usage: python3 tiered_scoring.py <verdicts.json>", file=sys.stderr)
        sys.exit(1)
    print(json.dumps(aggregate(load_verdicts(sys.argv[1])), ensure_ascii=False, indent=2))
```

- [ ] **Step 4: Lancer les tests pour vérifier le succès**

Run: `cd scripts && python3 -m pytest test_tiered_scoring.py -v`
Expected: PASS (6 tests)

- [ ] **Step 5: Commit**

```bash
git add scripts/tiered_scoring.py scripts/test_tiered_scoring.py
git commit -m "feat(scoring): agrégation tiered-gated déterministe pour criteria atomiques

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 2: Templates Codex criteria + sous-commandes helper

**Files:**
- Modify: `docs/methodology/codex-prompt-templates.md` (ajout 2 sections en fin de fichier, avant « ## Évolutions des templates »)
- Modify: `scripts/codex-blind-scoring.py` (refactor `load_one_template` + 2 sous-commandes)

- [ ] **Step 1: Ajouter les deux sections de template**

Insérer dans `docs/methodology/codex-prompt-templates.md`, juste avant la ligne `## Évolutions des templates` :

````markdown
## Phase 2 criteria — Vérité terrain criteria atomiques

### Variables à substituer

- `{skill}`, `{skill_description}`, `{domain}`, `{mode}`, `{scenario_content}`

### Prompt canonique

```
Tu es un avocat senior FR, expert du domaine « {domain} ». On te donne un scénario
fictif et une description neutre d'un livrable attendu. Tu NE vois PAS le skill qui
sera évalué.

Skill (description neutre) : {skill_description}
Mode : {mode}

Scénario :
---
{scenario_content}
---

Produis la VÉRITÉ TERRAIN sous forme de CRITERIA ATOMIQUES PASS/FAIL, en français,
ancrés sur les faits du scénario et le droit FR applicable. Pour chaque criterion :
- un id (C-001, C-002, ...),
- un niveau : CRITIQUE (erreur doctrinale rédhibitoire / bug), MAJEUR (finding
  central attendu), ou MINEUR (précision / hygiène),
- un libellé « PASS si ... / FAIL si ... » vérifiable sans ambiguïté,
- l'axe concerné.

Réserve CRITIQUE aux contre-sens de droit ou erreurs de calcul rédhibitoires.
Termine par un bloc JSON : {"skill":"{skill}","criteria":[{"id":...,"niveau":...,
"axe":...,"match_criteria":...}, ...]}.
Vérifie chaque article cité (ne pas inventer). Aucune donnée réelle.
```

## Phase 4 criteria — Scoring tiered-gated

### Variables à substituer

- `{skill}`, `{skill_version}`, `{code}`, `{date}`, `{scenario_content}`,
  `{ground_truth_content}`, `{live_output_content}`

### Prompt canonique

```
Tu es un évaluateur juridique FR. Tu NE vois PAS le SKILL.md. On te donne un
scénario, une grille de CRITERIA ATOMIQUES (vérité terrain) et un livrable produit.

Scénario :
---
{scenario_content}
---
Criteria (vérité terrain) :
---
{ground_truth_content}
---
Livrable évalué ({skill} v{skill_version}, code {code}, {date}) :
---
{live_output_content}
---

Pour CHAQUE criterion de la grille, rends un verdict PASS ou FAIL + une
justification d'une ligne citant le passage du livrable. N'invente aucun criterion.
Ne calcule PAS le score global toi-même.

Termine par un bloc JSON STRICT, sans autre texte autour :
{"criteria":[{"id":"C-001","niveau":"MAJEUR","verdict":"PASS"}, ...]}

Le statut final (REJETÉ si un CRITIQUE FAIL, sinon ADMIS / RÉSERVES / INSUFFISANT)
est calculé de façon déterministe par `scripts/tiered_scoring.py` à partir de ce JSON.
```
````

- [ ] **Step 2: Vérifier que les templates sont parsables**

Run:
```bash
cd /Users/candynguyen/dev/hacienda-juridique
python3 -c "import re,pathlib; t=pathlib.Path('docs/methodology/codex-prompt-templates.md').read_text(); \
print('phase2_criteria' , bool(re.search(r'## Phase 2 criteria.*?### Prompt canonique\s*\n+\`\`\`\n(.*?)\n\`\`\`', t, re.DOTALL))); \
print('phase4_criteria' , bool(re.search(r'## Phase 4 criteria.*?### Prompt canonique\s*\n+\`\`\`\n(.*?)\n\`\`\`', t, re.DOTALL)))"
```
Expected: `phase2_criteria True` et `phase4_criteria True`

- [ ] **Step 3: Refactor `load_templates` + ajouter `load_one_template`**

Dans `scripts/codex-blind-scoring.py`, remplacer le corps de `load_templates` (lignes 107-137) par :

```python
def load_one_template(phase_h2: str) -> str:
    """Parse one '### Prompt canonique' fenced block under a given H2 header."""
    if not TEMPLATES_PATH.exists():
        fail(3, f"Template Codex introuvable : {TEMPLATES_PATH}\n"
                f"Vérifier que D.0.2 (templates) a bien été livré.")
    text = TEMPLATES_PATH.read_text(encoding="utf-8")
    m = re.search(
        rf"{re.escape(phase_h2)}.*?### Prompt canonique\s*\n+```\n(.*?)\n```",
        text, re.DOTALL,
    )
    if not m:
        fail(3, f"Section '{phase_h2}' / 'Prompt canonique' introuvable dans "
                f"{TEMPLATES_PATH}. Vérifier l'intégrité du fichier.")
    return m.group(1)


def load_templates() -> dict:
    """Parse the templates markdown file into the 3 historical sections."""
    return {
        "phase1": load_one_template("## Phase 1 — Génération du dataset fictif"),
        "phase2": load_one_template("## Phase 2 — Génération de la vérité terrain"),
        "phase4": load_one_template("## Phase 4 — Scoring comparatif"),
    }
```

- [ ] **Step 4: Ajouter les deux fonctions de commande**

Dans `scripts/codex-blind-scoring.py`, après `cmd_phase4` (après la ligne 328), ajouter :

```python
def cmd_phase2_criteria(args) -> None:
    scenario_path = Path(args.scenario).resolve()
    output_path = Path(args.output).resolve()
    check_no_skill_md_path(scenario_path, output_path)
    check_scenario_no_truth(scenario_path)
    ensure_output_dir(output_path)
    template = load_one_template("## Phase 2 criteria — Vérité terrain criteria atomiques")
    prompt = substitute(template, {
        "skill": args.skill,
        "skill_description": args.skill_description,
        "domain": args.domain,
        "mode": args.mode,
        "scenario_content": scenario_path.read_text(encoding="utf-8"),
    })
    print(PROMPT_OPEN_MARKER); print(prompt); print(PROMPT_CLOSE_MARKER)
    err(""); err("=" * 70)
    err("  PHASE 2 criteria — Vérité terrain criteria atomiques tiered-gated")
    err(f"  Modèle Codex recommandé : {MODEL_RECO['phase2']}")
    err(f"  Sortie prévue : {output_path}")
    err("  ⚠ Session Codex distincte ; PAS le SKILL.md."); err("=" * 70)


def cmd_phase4_criteria(args) -> None:
    validate_code(args.code)
    scenario_path = Path(args.scenario).resolve()
    truth_path = Path(args.ground_truth).resolve()
    live_path = Path(args.live_output).resolve()
    output_path = Path(args.output).resolve()
    check_no_skill_md_path(scenario_path, truth_path, live_path, output_path)
    for p, label in [(scenario_path, "Scenario"), (truth_path, "Ground-truth"),
                     (live_path, "Live-output")]:
        if not p.exists():
            fail(2, f"{label} introuvable : {p}")
    ensure_output_dir(output_path)
    template = load_one_template("## Phase 4 criteria — Scoring tiered-gated")
    prompt = substitute(template, {
        "skill": args.skill,
        "skill_version": args.skill_version,
        "code": args.code,
        "date": args.date or "YYYY-MM-DD",
        "scenario_content": scenario_path.read_text(encoding="utf-8"),
        "ground_truth_content": truth_path.read_text(encoding="utf-8"),
        "live_output_content": live_path.read_text(encoding="utf-8"),
    })
    print(PROMPT_OPEN_MARKER); print(prompt); print(PROMPT_CLOSE_MARKER)
    err(""); err("=" * 70)
    err("  PHASE 4 criteria — Scoring tiered-gated")
    err(f"  Skill : {args.skill} v{args.skill_version} — code {args.code}")
    err(f"  Sortie prévue : {output_path}")
    err("  ⚠ Session Codex distincte ; PAS le SKILL.md.")
    err("  → Sauver le bloc JSON de verdicts, puis :")
    err("    python3 scripts/tiered_scoring.py <verdicts.json>"); err("=" * 70)
```

- [ ] **Step 5: Enregistrer les sous-commandes dans `build_parser`**

Dans `scripts/codex-blind-scoring.py`, juste avant `return p` (ligne 373), ajouter :

```python
    # Phase 2 criteria
    p2c = sub.add_parser("phase2-criteria", help="Vérité terrain criteria atomiques (Codex HIGH)")
    p2c.add_argument("--skill", required=True)
    p2c.add_argument("--skill-description", required=True, help="Description neutre (PAS le SKILL.md)")
    p2c.add_argument("--domain", required=True)
    p2c.add_argument("--mode", required=True)
    p2c.add_argument("--scenario", required=True)
    p2c.add_argument("--output", required=True)
    p2c.set_defaults(func=cmd_phase2_criteria)

    # Phase 4 criteria
    p4c = sub.add_parser("phase4-criteria", help="Scoring tiered-gated criterion-par-criterion")
    p4c.add_argument("--skill", required=True)
    p4c.add_argument("--skill-version", required=True)
    p4c.add_argument("--code", required=True)
    p4c.add_argument("--scenario", required=True)
    p4c.add_argument("--ground-truth", required=True, help="Fichier criteria atomiques")
    p4c.add_argument("--live-output", required=True)
    p4c.add_argument("--output", required=True)
    p4c.add_argument("--date", default=None)
    p4c.set_defaults(func=cmd_phase4_criteria)
```

- [ ] **Step 6: Smoke-test des deux sous-commandes**

Run:
```bash
cd /Users/candynguyen/dev/hacienda-juridique
python3 scripts/codex-blind-scoring.py phase2-criteria \
  --skill analyser-rupture-brutale \
  --skill-description "Analyse rupture brutale L.442-1 II." \
  --domain droit-affaires --mode "review victime" \
  --scenario plugins/hacienda-droit-affaires/tests/datasets/da-rupture-brutale/scenario.md \
  --output /tmp/gt-test.md >/tmp/p2c.out 2>/tmp/p2c.err; echo "exit=$?"
grep -c "CRITERIA ATOMIQUES" /tmp/p2c.out
```
Expected: `exit=0` et `1` (le prompt contient bien l'instruction criteria). Le guard anti-leakage doit laisser passer (scenario blind sans « Vérité terrain »).

- [ ] **Step 7: Commit**

```bash
git add docs/methodology/codex-prompt-templates.md scripts/codex-blind-scoring.py
git commit -m "feat(scoring): templates + sous-commandes Codex phase2/4-criteria tiered-gated

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 3: `declaration-creance` — ancrage doctrinal + cycle blind

> Cette tâche mêle du contenu doctrinal (SKILL.md, criteria) et des phases Codex
> manuelles. Le « test » de cette tâche est le **cycle blind** : un livrable scoré
> sans gate CRITIQUE FAIL via `tiered_scoring.py`. Garder la séparation blind :
> la session qui ancre le SKILL.md (ici) ≠ la session Phase 3 qui exécute le skill.

**Files:**
- Create: `plugins/hacienda-droit-affaires/tests/datasets/da-declaration-creance/scenario.md`
- Create: `plugins/hacienda-droit-affaires/tests/datasets/da-declaration-creance/ground-truth.md`
- Create: `plugins/hacienda-droit-affaires/tests/datasets/da-declaration-creance/live-output.md`
- Modify: `plugins/hacienda-droit-affaires/skills/declaration-creance/SKILL.md`
- Create: `docs/backlog/da-scoring-declaration-creance-<CODE>.md`

- [ ] **Step 1: Générer le code scoring du cycle**

```bash
python3 -c "import secrets,string; print(''.join(secrets.choice(string.ascii_uppercase+string.digits) for _ in range(6)))"
```
Noter le code (ex. `D7K2QX`), il identifie tout le cycle.

- [ ] **Step 2: Écrire le scénario blind (faits seuls)**

Créer `da-declaration-creance/scenario.md` : un cas fictif de déclaration de
créance — débiteur SAS en redressement judiciaire (SIREN `SIREN-FICTIF-XXXXXXXXX`,
non-Luhn), jugement d'ouverture + date de publication BODACC, créancier fournisseur
FR avec créance échue (principal + intérêts + clause pénale), une sûreté revendiquée.
Inclure **uniquement les faits** (parties, montants, dates, nature de la créance).
Aucune section « Vérité terrain », aucune date de forclusion pré-calculée, aucun
résultat attendu. Aucune donnée réelle.

- [ ] **Step 3: Générer la vérité terrain criteria (Phase 2 BLIND, Codex HIGH)**

```bash
python3 scripts/codex-blind-scoring.py phase2-criteria \
  --skill declaration-creance \
  --skill-description "Rédige une déclaration de créance L.622-24 C.com. en procédure collective : calcule la forclusion, structure la créance, qualifie le rang/privilège." \
  --domain droit-affaires --mode "rédaction déclaration L.622-24" \
  --scenario plugins/hacienda-droit-affaires/tests/datasets/da-declaration-creance/scenario.md \
  --output plugins/hacienda-droit-affaires/tests/datasets/da-declaration-creance/ground-truth.md
```
Action manuelle : nouvelle session Codex **HIGH**, coller le prompt imprimé,
sauvegarder le résultat (criteria atomiques + bloc JSON) dans `--output`. Fermer la session.

- [ ] **Step 4: Vérifier les gates doctrinaux de la grille**

Relire `ground-truth.md` et confirmer qu'au moins ces axes sont couverts par des
criteria, dont les rédhibitoires en `CRITIQUE` :
- Forclusion L.622-24 : **2 mois** post-publication BODACC ; **4 mois** créancier
  éloigné — computation exacte = `CRITIQUE`.
- Distinction créance antérieure / postérieure privilégiée L.622-17.
- Structure : principal + intérêts (arrêt du cours des intérêts L.622-28) + accessoires.
- Rang / privilège / sûreté déclarée vs chirographaire.
- Bordereau et admission L.624-2.

Si un gate doctrinal manque, compléter la grille **à la main** (acté : l'humain peut
durcir un criterion CRITIQUE), en taguant la grille `[Phase 2 blind + durcissement humain]`.

- [ ] **Step 5: Ancrer la doctrine dans le SKILL.md**

Modifier `skills/declaration-creance/SKILL.md` pour expliciter les axes de l'étape 4
ci-dessus (aujourd'hui sous-spécifiés). Notamment : arrêt du cours des intérêts
L.622-28, distinction antérieur/postérieur L.622-17, bordereau L.624-2. Conserver le
format canonique V1 existant. **Ne pas** lire `ground-truth.md` pendant cet ancrage
n'est pas requis (l'ancrage doctrinal s'appuie sur le droit, pas sur la grille) —
mais la session Phase 3 (Step 6) doit, elle, être fraîche.

- [ ] **Step 6: Exécution live (Phase 3, SESSION CLAUDE FRAÎCHE)**

Dans une **nouvelle** session Claude Code (pas celle d'ancrage), avec le plugin DA :
```
/h-droit-affaires:declaration-creance <faits du scenario.md> --review
```
Fournir comme input **uniquement** `scenario.md`. Ne PAS ouvrir `ground-truth.md`.
Sauvegarder la sortie dans `da-declaration-creance/live-output.md`.

- [ ] **Step 7: Scoring (Phase 4 criteria, Codex medium)**

```bash
python3 scripts/codex-blind-scoring.py phase4-criteria \
  --skill declaration-creance --skill-version 2.0.0 --code <CODE> \
  --scenario plugins/hacienda-droit-affaires/tests/datasets/da-declaration-creance/scenario.md \
  --ground-truth plugins/hacienda-droit-affaires/tests/datasets/da-declaration-creance/ground-truth.md \
  --live-output plugins/hacienda-droit-affaires/tests/datasets/da-declaration-creance/live-output.md \
  --date <YYYY-MM-DD> \
  --output docs/backlog/da-scoring-declaration-creance-<CODE>.md
```
Nouvelle session Codex (distincte des Phases 2 et 3). Coller le prompt, sauvegarder
le rapport + le bloc JSON de verdicts dans `/tmp/verdicts-<CODE>.json`.

- [ ] **Step 8: Agrégation déterministe**

Run:
```bash
python3 scripts/tiered_scoring.py /tmp/verdicts-<CODE>.json
```
Expected: un JSON avec `status` et `gate_failures`. **Acceptation de la tâche :**
`gate_failures` vide (`[]`). Si un gate CRITIQUE FAIL ressort → corriger le SKILL.md
(boucle Step 5-6-7-8) ; ce n'est pas un échec du plan, c'est le signal recherché.

- [ ] **Step 9: Consigner le résultat et commit**

Compléter `docs/backlog/da-scoring-declaration-creance-<CODE>.md` avec le statut
agrégé et le marquage `[scoring blind protocole D.0]` (et non `[auto-référent]`).

```bash
git add plugins/hacienda-droit-affaires/skills/declaration-creance/SKILL.md \
        plugins/hacienda-droit-affaires/tests/datasets/da-declaration-creance/ \
        docs/backlog/da-scoring-declaration-creance-<CODE>.md
git commit -m "feat(da): declaration-creance ancrage doctrinal + premier score blind tiered-gated

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 4: Hygiène — retirer le dataset leaky

**Files:**
- Delete: `plugins/hacienda-droit-affaires/tests/datasets/v2a/rupture-brutale-scenario.md`

- [ ] **Step 1: Vérifier l'absence de référence orpheline**

Run:
```bash
cd /Users/candynguyen/dev/hacienda-juridique
grep -rn "v2a/rupture-brutale-scenario.md" --include=*.md . | grep -v "da-pc-foundation"
```
Expected: aucune ligne (ou seulement des renvois à corriger). Si des références
existent, les repointer vers `da-rupture-brutale/scenario.md`.

- [ ] **Step 2: Supprimer le dataset leaky**

Run:
```bash
git rm plugins/hacienda-droit-affaires/tests/datasets/v2a/rupture-brutale-scenario.md
```
(Le couple blind propre `da-rupture-brutale/{scenario.md, criteria}` le remplace.)

- [ ] **Step 3: Commit**

```bash
git commit -m "chore(da): retrait dataset rupture-brutale leaky pré-D.0 (remplacé par da-rupture-brutale/)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

- **Spec coverage** : T0 (méthode) → Tasks 1-2 ; T1 (declaration-creance) → Task 3 ;
  hygiène dataset leaky (spec §6.1) → Task 4. **Hors périmètre de CE plan** (plans
  suivants) : #2 relevé de forclusion, #3 prévention difficultés, #1 mise en demeure,
  reformulation des renvois vapor (spec §6.2), bump v0.2.0 (T6). À couvrir dans les
  plans 2+.
- **Placeholder scan** : `<CODE>`, `<YYYY-MM-DD>`, `<faits du scenario.md>` sont des
  valeurs runtime du cycle blind (générées au Step 1 / saisies par l'opérateur), pas
  des placeholders de plan. Le contenu doctrinal du scénario (Task 3 Step 2) est
  décrit précisément (parties, articles, structure) mais volontairement non figé
  ligne à ligne car généré en session — c'est un livrable de rédaction, pas du code.
- **Type consistency** : `Criterion(id, niveau, verdict)`, `aggregate()`,
  `load_verdicts()`, `load_one_template()` cohérents entre Task 1 et Task 2.
  Le bloc JSON de verdicts (`{"criteria":[{"id","niveau","verdict"}]}`) produit par
  le template Phase 4 criteria (Task 2) correspond exactement à `load_verdicts` (Task 1).
