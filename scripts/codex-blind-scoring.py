#!/usr/bin/env python3
"""
Codex blind scoring helper — Hacienda.

Generates ready-to-paste Codex prompts for the blind sparring scoring protocol
(see docs/methodology/sparring-scoring-protocol.md).

Usage:
    python3 scripts/codex-blind-scoring.py phase1 \\
        --skill <skill-name> \\
        --domain <domain> \\
        --mode "<mode invocation>" \\
        --specificites "<spec1 ; spec2 ; ...>" \\
        --code <CODE6> \\
        --output <path-to-scenario.md>

    python3 scripts/codex-blind-scoring.py phase2 \\
        --skill <skill-name> \\
        --skill-description "<2-3 neutral lines>" \\
        --domain <domain> \\
        --mode "<mode>" \\
        --scenario <path-to-scenario.md> \\
        --output <path-to-ground-truth.md>

    python3 scripts/codex-blind-scoring.py phase4 \\
        --skill <skill-name> \\
        --skill-version <version> \\
        --code <CODE6> \\
        --scenario <path-to-scenario.md> \\
        --ground-truth <path-to-ground-truth.md> \\
        --live-output <path-to-live-output.md> \\
        --output <path-to-scoring.md>

The script :
1. Loads the required inputs based on the phase.
2. Loads the Codex template from docs/methodology/codex-prompt-templates.md.
3. Substitutes placeholders.
4. Creates the output directory if needed.
5. Prints the prompt to stdout (paste-ready) between markers.
6. Prints recap to stderr (model recommendation, paths, etc.).

Recommended Codex model:
- Phase 1 (datasets)        : GPT-5.5 effort medium
- Phase 2 (vérité terrain)  : GPT-5.5 effort HIGH   <- most consequential phase
- Phase 4 (scoring)         : GPT-5.5 effort medium

GPT-4.5 (orion) is NOT recommended — risk of invented citations on FR PI law.

Anti-leakage rules enforced:
- Phase 1: refuses if output path is next to an existing ground-truth.md.
- Phase 2: refuses if scenario.md contains "Vérité terrain" or "Critères de scoring".
- Phase 4: refuses if any argument points to a SKILL.md file.
- All phases: refuses if --code is not 6 alphanumeric chars.

Exit codes:
- 0: success (prompt printed to stdout).
- 1: usage error.
- 2: anti-leakage guard triggered.
- 3: missing template file.
"""

import argparse
import re
import sys
from pathlib import Path


# Repo root resolved relative to this script (scripts/ is at repo root).
REPO_ROOT = Path(__file__).resolve().parent.parent
TEMPLATES_PATH = REPO_ROOT / "docs" / "methodology" / "codex-prompt-templates.md"

PROMPT_OPEN_MARKER = "\n>>> PROMPT CODEX — PASTE THIS INTO YOUR CODEX SESSION <<<\n"
PROMPT_CLOSE_MARKER = "\n<<< FIN PROMPT >>>\n"

MODEL_RECO = {
    "phase1": "GPT-5.5 effort medium",
    "phase2": "GPT-5.5 effort HIGH (phase la plus consequence)",
    "phase4": "GPT-5.5 effort medium",
}


def err(msg: str) -> None:
    """Print to stderr."""
    print(msg, file=sys.stderr)


def fail(code: int, msg: str) -> None:
    """Print to stderr and exit."""
    err(f"ERROR: {msg}")
    sys.exit(code)


def validate_code(code: str) -> None:
    """Anti-leakage: scoring code must be 6 alphanumeric chars."""
    if not re.fullmatch(r"[A-Z0-9]{6}", code):
        fail(
            2,
            f"Code scoring invalide: '{code}'. "
            f"Attendu : 6 caractères alphanumériques majuscules "
            f"(ex. K7M2PX). Générer un code avec :\n"
            f"  python3 -c \"import secrets, string; "
            f"print(''.join(secrets.choice(string.ascii_uppercase+string.digits) "
            f"for _ in range(6)))\""
        )


def load_templates() -> dict:
    """Parse the templates markdown file into 3 sections (phase1, phase2, phase4)."""
    if not TEMPLATES_PATH.exists():
        fail(
            3,
            f"Template Codex introuvable : {TEMPLATES_PATH}\n"
            f"Vérifier que D.0.2 (templates) a bien été livré."
        )
    text = TEMPLATES_PATH.read_text(encoding="utf-8")

    # Extract sections by looking for "### Prompt canonique" headers under each phase H2.
    # Phase H2 headers are like "## Phase 1 — Génération du dataset fictif", etc.
    phases = {}
    for phase_key, phase_h2 in [
        ("phase1", "## Phase 1 — Génération du dataset fictif"),
        ("phase2", "## Phase 2 — Génération de la vérité terrain"),
        ("phase4", "## Phase 4 — Scoring comparatif"),
    ]:
        m = re.search(
            rf"{re.escape(phase_h2)}.*?### Prompt canonique\s*\n+```\n(.*?)\n```",
            text,
            re.DOTALL,
        )
        if not m:
            fail(
                3,
                f"Section '{phase_h2}' / 'Prompt canonique' introuvable dans "
                f"{TEMPLATES_PATH}. Vérifier l'intégrité du fichier."
            )
        phases[phase_key] = m.group(1)
    return phases


def ensure_output_dir(output_path: Path) -> None:
    """Create the output directory if it doesn't exist."""
    output_path.parent.mkdir(parents=True, exist_ok=True)


def check_no_skill_md_path(*paths: Path) -> None:
    """Anti-leakage: refuses if any path points to a SKILL.md file."""
    for p in paths:
        if p and p.name.upper() == "SKILL.MD":
            fail(
                2,
                f"Anti-leakage : un argument pointe vers '{p.name}'. "
                f"Le scoreur (Phase 4) ne doit pas avoir accès au SKILL.md du skill "
                f"évalué. Vérifier les chemins."
            )


def check_scenario_no_truth(scenario_path: Path) -> None:
    """Anti-leakage: scenario.md must not contain truth-related sections."""
    if not scenario_path.exists():
        fail(2, f"Scenario introuvable : {scenario_path}")
    txt = scenario_path.read_text(encoding="utf-8")
    forbidden_markers = [
        "Vérité terrain",
        "vérité terrain",
        "Verite terrain",
        "Critères de scoring",
        "## Findings critiques attendus",
        "Recommandation attendue",
    ]
    for marker in forbidden_markers:
        if marker in txt:
            fail(
                2,
                f"Anti-leakage : le scenario '{scenario_path}' contient la section "
                f"'{marker}'. Un scenario blind ne doit contenir QUE les faits, "
                f"pas la vérité terrain. Re-générer le scenario en Phase 1 "
                f"strict ou retirer manuellement la section avant Phase 2."
            )


def check_phase1_no_truth_neighbor(output_path: Path) -> None:
    """Anti-leakage: refuse Phase 1 if ground-truth.md already exists in same dir."""
    truth_path = output_path.parent / "ground-truth.md"
    if truth_path.exists():
        fail(
            2,
            f"Anti-leakage : '{truth_path}' existe déjà dans le même dossier. "
            f"Re-générer la Phase 1 maintenant écraserait la séquence du protocole. "
            f"Supprimer ground-truth.md d'abord OU choisir un autre dossier."
        )


def substitute(template: str, mapping: dict) -> str:
    """Replace {placeholder} occurrences in template with values from mapping."""
    out = template
    for k, v in mapping.items():
        out = out.replace("{" + k + "}", v)
    return out


def cmd_phase1(args) -> None:
    validate_code(args.code)
    output_path = Path(args.output).resolve()
    check_phase1_no_truth_neighbor(output_path)
    ensure_output_dir(output_path)

    template = load_templates()["phase1"]
    prompt = substitute(template, {
        "skill": args.skill,
        "domain": args.domain,
        "mode": args.mode,
        "code": args.code,
        "specificites": args.specificites,
    })

    print(PROMPT_OPEN_MARKER)
    print(prompt)
    print(PROMPT_CLOSE_MARKER)

    err("")
    err("=" * 70)
    err(f"  PHASE 1 — Génération dataset fictif")
    err("=" * 70)
    err(f"  Modèle Codex recommandé : {MODEL_RECO['phase1']}")
    err(f"  Skill cible             : {args.skill}")
    err(f"  Domaine                 : {args.domain}")
    err(f"  Mode                    : {args.mode}")
    err(f"  Code scoring            : {args.code}")
    err(f"  Spécificités à inclure  : {args.specificites}")
    err(f"  Output prévu            : {output_path}")
    err(f"")
    err(f"  ÉTAPES À SUIVRE :")
    err(f"  1. Ouvrir une session Codex (CLI ou web) dédiée Phase 1.")
    err(f"  2. Coller le prompt ci-dessus.")
    err(f"  3. Sauvegarder l'output dans : {output_path}")
    err(f"  4. NE PAS ENCHAÎNER Phase 2 dans la même session Codex.")
    err("=" * 70)


def cmd_phase2(args) -> None:
    scenario_path = Path(args.scenario).resolve()
    check_scenario_no_truth(scenario_path)
    output_path = Path(args.output).resolve()
    ensure_output_dir(output_path)

    scenario_content = scenario_path.read_text(encoding="utf-8")
    template = load_templates()["phase2"]
    prompt = substitute(template, {
        "skill": args.skill,
        "skill_description": args.skill_description,
        "domain": args.domain,
        "mode": args.mode,
        "scenario_content": scenario_content,
    })

    print(PROMPT_OPEN_MARKER)
    print(prompt)
    print(PROMPT_CLOSE_MARKER)

    err("")
    err("=" * 70)
    err(f"  PHASE 2 — Génération vérité terrain")
    err("=" * 70)
    err(f"  Modèle Codex recommandé : {MODEL_RECO['phase2']}")
    err(f"  Skill cible             : {args.skill}")
    err(f"  Description neutre      : {args.skill_description}")
    err(f"  Scenario input          : {scenario_path}")
    err(f"  Output prévu            : {output_path}")
    err(f"")
    err(f"  ⚠ ANTI-LEAKAGE :")
    err(f"  - Session Codex distincte de Phase 1 (modèle réutilisé OK,")
    err(f"    nouvelle conversation pour éviter le cache contextuel).")
    err(f"  - PAS d'accès au SKILL.md du skill cible.")
    err(f"  - Description neutre minimale uniquement (2-3 lignes).")
    err("=" * 70)


def cmd_phase4(args) -> None:
    validate_code(args.code)
    scenario_path = Path(args.scenario).resolve()
    truth_path = Path(args.ground_truth).resolve()
    live_path = Path(args.live_output).resolve()
    output_path = Path(args.output).resolve()

    # Anti-leakage : refuse si l'un des fichiers est un SKILL.md.
    check_no_skill_md_path(scenario_path, truth_path, live_path, output_path)

    if not scenario_path.exists():
        fail(2, f"Scenario introuvable : {scenario_path}")
    if not truth_path.exists():
        fail(2, f"Ground-truth introuvable : {truth_path}")
    if not live_path.exists():
        fail(2, f"Live-output introuvable : {live_path}")

    ensure_output_dir(output_path)

    template = load_templates()["phase4"]
    prompt = substitute(template, {
        "skill": args.skill,
        "skill_version": args.skill_version,
        "code": args.code,
        "date": args.date or "YYYY-MM-DD",
        "scenario_content": scenario_path.read_text(encoding="utf-8"),
        "ground_truth_content": truth_path.read_text(encoding="utf-8"),
        "live_output_content": live_path.read_text(encoding="utf-8"),
    })

    print(PROMPT_OPEN_MARKER)
    print(prompt)
    print(PROMPT_CLOSE_MARKER)

    err("")
    err("=" * 70)
    err(f"  PHASE 4 — Scoring comparatif")
    err("=" * 70)
    err(f"  Modèle Codex recommandé : {MODEL_RECO['phase4']}")
    err(f"  Skill évalué            : {args.skill} v{args.skill_version}")
    err(f"  Code scoring            : {args.code}")
    err(f"  Scenario                : {scenario_path}")
    err(f"  Ground-truth            : {truth_path}")
    err(f"  Live-output             : {live_path}")
    err(f"  Output prévu            : {output_path}")
    err(f"")
    err(f"  ⚠ ANTI-LEAKAGE :")
    err(f"  - Session Codex distincte des Phases 1, 2 et 3.")
    err(f"  - PAS d'accès au SKILL.md (anti-scoring structurel).")
    err(f"  - Le scoreur évalue substantiellement, pas par comparaison structure.")
    err("=" * 70)


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        prog="codex-blind-scoring",
        description=(
            "Helper Codex pour le protocole blind sparring scoring Hacienda. "
            "Voir docs/methodology/sparring-scoring-protocol.md."
        ),
    )
    sub = p.add_subparsers(dest="phase", required=True)

    # Phase 1
    p1 = sub.add_parser("phase1", help="Génération dataset fictif (Codex GPT-5.5 medium)")
    p1.add_argument("--skill", required=True, help="Nom du skill cible")
    p1.add_argument("--domain", required=True, help="Domaine PI (marques, brevets, ...)")
    p1.add_argument("--mode", required=True, help="Mode d'invocation du skill")
    p1.add_argument("--specificites", required=True, help="Spécificités à inclure (sep. ' ; ')")
    p1.add_argument("--code", required=True, help="Code scoring 6 chars alphanumériques")
    p1.add_argument("--output", required=True, help="Chemin de sortie scenario.md")
    p1.set_defaults(func=cmd_phase1)

    # Phase 2
    p2 = sub.add_parser("phase2", help="Génération vérité terrain (Codex GPT-5.5 HIGH)")
    p2.add_argument("--skill", required=True, help="Nom du skill cible")
    p2.add_argument("--skill-description", required=True, help="Description neutre 2-3 lignes (PAS le SKILL.md)")
    p2.add_argument("--domain", required=True, help="Domaine PI")
    p2.add_argument("--mode", required=True, help="Mode d'invocation")
    p2.add_argument("--scenario", required=True, help="Chemin scenario.md (Phase 1)")
    p2.add_argument("--output", required=True, help="Chemin de sortie ground-truth.md")
    p2.set_defaults(func=cmd_phase2)

    # Phase 4
    p4 = sub.add_parser("phase4", help="Scoring comparatif (Codex GPT-5.5 medium)")
    p4.add_argument("--skill", required=True, help="Nom du skill évalué")
    p4.add_argument("--skill-version", required=True, help="Version du skill évalué")
    p4.add_argument("--code", required=True, help="Code scoring 6 chars")
    p4.add_argument("--scenario", required=True, help="Chemin scenario.md")
    p4.add_argument("--ground-truth", required=True, help="Chemin ground-truth.md")
    p4.add_argument("--live-output", required=True, help="Chemin live-output.md")
    p4.add_argument("--output", required=True, help="Chemin de sortie scoring report")
    p4.add_argument("--date", default=None, help="Date du scoring (YYYY-MM-DD), défaut : YYYY-MM-DD")
    p4.set_defaults(func=cmd_phase4)

    return p


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
