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
