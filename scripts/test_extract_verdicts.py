# scripts/test_extract_verdicts.py
import importlib.util
import json
from pathlib import Path

import pytest

# extract-verdicts.py a un tiret -> chargement par chemin
_spec = importlib.util.spec_from_file_location(
    "extract_verdicts", Path(__file__).parent / "extract-verdicts.py"
)
ev = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(ev)

from tiered_scoring import Criterion, load_verdicts  # noqa: E402


# --- Fix A : parse_verdicts préserve la preuve --------------------------------

def test_parse_verdicts_preserve_preuve():
    raw = (
        "blabla\n===VERDICTS_JSON===\n"
        '{"criteria":['
        '{"id":"C-001","niveau":"MAJEUR","verdict":"PASS","preuve":"« inscription au RMT BidCo »"},'
        '{"id":"C-002","niveau":"CRITIQUE","verdict":"FAIL","preuve":"absent"}'
        "]}\n"
    )
    v = ev.parse_verdicts(raw)
    assert v["C-001"] == {"verdict": "PASS", "preuve": "« inscription au RMT BidCo »"}
    assert v["C-002"] == {"verdict": "FAIL", "preuve": "absent"}


def test_parse_verdicts_preuve_absente_defaut_vide():
    raw = (
        "===VERDICTS_JSON===\n"
        '{"criteria":[{"id":"C-003","niveau":"MAJEUR","verdict":"FAIL"}]}\n'
    )
    v = ev.parse_verdicts(raw)
    assert v["C-003"] == {"verdict": "FAIL", "preuve": ""}


def test_parse_verdicts_fallback_table_preuve_vide():
    raw = "| C-004 | PASS |\n| C-005 | FAIL |\n"
    v = ev.parse_verdicts(raw)
    assert v["C-004"] == {"verdict": "PASS", "preuve": ""}
    assert v["C-005"] == {"verdict": "FAIL", "preuve": ""}


# --- Fix A : build_payload écrit la preuve dans le JSON -----------------------

def test_build_payload_inclut_preuve_et_niveau_du_ground_truth():
    gt_criteria = [
        {"id": "C-001", "niveau": "MAJEUR", "match_criteria": "..."},
        {"id": "C-002", "niveau": "CRITIQUE", "match_criteria": "..."},
    ]
    verd = {
        "C-001": {"verdict": "PASS", "preuve": "« cite le passage »"},
        "C-002": {"verdict": "FAIL", "preuve": "absent"},
    }
    payload = ev.build_payload("management-package-pe", "MANPE9", gt_criteria, verd)
    assert payload["criteria"][0] == {
        "id": "C-001", "niveau": "MAJEUR", "verdict": "PASS", "preuve": "« cite le passage »",
    }
    assert payload["criteria"][1] == {
        "id": "C-002", "niveau": "CRITIQUE", "verdict": "FAIL", "preuve": "absent",
    }


# --- Régression : tiered_scoring ignore la clé preuve en plus -----------------

def test_load_verdicts_ignore_preuve(tmp_path):
    p = tmp_path / "verdicts.json"
    p.write_text(json.dumps({"criteria": [
        {"id": "C-020", "niveau": "CRITIQUE", "verdict": "FAIL", "preuve": "absent"},
    ]}), encoding="utf-8")
    crit = load_verdicts(str(p))
    assert crit == [Criterion("C-020", "CRITIQUE", "FAIL")]
