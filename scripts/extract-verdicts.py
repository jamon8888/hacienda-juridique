#!/usr/bin/env python3
"""Extrait les verdicts d'une sortie Codex Phase 4 et écrit verdicts-<CODE>.json.

Robuste au caprice récurrent de Codex : essaie dans l'ordre
  1. le bloc après le marqueur ===VERDICTS_JSON=== ;
  2. n'importe quel objet JSON {"criteria":[...]} contenant des "verdict" ;
  3. en dernier recours, la table markdown | C-xxx | PASS/FAIL | du rapport.
Le niveau est TOUJOURS repris du ground-truth (autoritatif), jamais de Codex.

Usage :
  pbpaste | python3 scripts/extract-verdicts.py <skill> <code>        # défaut : stdin
  python3 scripts/extract-verdicts.py <skill> <code> --clipboard      # lit pbpaste
  python3 scripts/extract-verdicts.py <skill> <code> --file out.md
Écrit verdicts-<code>.json puis affiche la commande aggregate à lancer.
"""
import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATASET_ROOT = ROOT / "plugins/hacienda-droit-affaires/tests/datasets"


def read_raw(args) -> str:
    if args.file:
        return Path(args.file).read_text(encoding="utf-8")
    if args.clipboard:
        return subprocess.run(["pbpaste"], capture_output=True, text=True, check=True).stdout
    return sys.stdin.read()


def parse_verdicts(raw: str) -> dict:
    """Retourne {id: verdict} depuis la sortie Codex, par tentatives successives."""
    # 1. bloc après le marqueur
    m = re.search(r"===VERDICTS_JSON===\s*(\{.*?\})", raw, re.S)
    candidates = [m.group(1)] if m else []
    # 2. tout objet {"criteria":[...]} avec au moins un "verdict"
    candidates += re.findall(r'\{\s*"criteria"\s*:\s*\[.*?\]\s*\}', raw, re.S)
    for blob in candidates:
        try:
            data = json.loads(blob)
        except json.JSONDecodeError:
            continue
        crit = data.get("criteria", [])
        if crit and all("verdict" in c for c in crit):
            return {c["id"]: c["verdict"].strip().upper() for c in crit}
    # 3. fallback : table markdown | C-xxx | PASS/FAIL |
    rows = re.findall(r"^\|\s*(C-\d{3})\s*\|\s*(PASS|FAIL|PARTIEL)\s*\|", raw, re.M)
    if rows:
        return {cid: ("FAIL" if v == "PARTIEL" else v) for cid, v in rows}
    raise SystemExit(
        "extract-verdicts : aucun verdict trouvé (ni bloc ===VERDICTS_JSON===, "
        "ni JSON avec 'verdict', ni table | C-xxx | PASS/FAIL |)."
    )


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("skill")
    ap.add_argument("code")
    src = ap.add_mutually_exclusive_group()
    src.add_argument("--clipboard", action="store_true", help="lire pbpaste")
    src.add_argument("--file", help="lire un fichier")
    args = ap.parse_args()

    ddir = DATASET_ROOT / f"da-{args.skill}"
    gt_path = ddir / "ground-truth.md"
    if not gt_path.exists():
        raise SystemExit(f"ground-truth introuvable : {gt_path}")
    gt = json.loads(gt_path.read_text(encoding="utf-8"))
    niveaux = {c["id"]: c["niveau"] for c in gt["criteria"]}

    verd = parse_verdicts(read_raw(args))

    v_ids, gt_ids = set(verd), set(niveaux)
    if v_ids != gt_ids:
        manq, trop = sorted(gt_ids - v_ids), sorted(v_ids - gt_ids)
        raise SystemExit(
            f"verdicts incohérents avec le ground-truth — "
            f"non scorés: {manq or 'aucun'} ; inconnus: {trop or 'aucun'}"
        )
    bad = {c: v for c, v in verd.items() if v not in ("PASS", "FAIL")}
    if bad:
        raise SystemExit(f"verdicts non PASS/FAIL : {bad}")

    code = args.code
    out_path = ddir / f"verdicts-{code}.json"
    payload = {
        "skill": args.skill,
        "code": code,
        "criteria": [
            {"id": c["id"], "niveau": c["niveau"], "verdict": verd[c["id"]]}
            for c in gt["criteria"]
        ],
    }
    out_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    fails = [c["id"] for c in payload["criteria"] if c["verdict"] == "FAIL"]
    print(f"écrit {out_path} — {len(payload['criteria'])} verdicts, FAIL={fails or 'aucun'}")
    print(f"→ agréger : CODE={code} bash scripts/da-scoring.sh aggregate {args.skill}")


if __name__ == "__main__":
    main()
