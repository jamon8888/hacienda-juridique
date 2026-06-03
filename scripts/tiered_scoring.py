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


def _validate(criteria: list[Criterion]) -> None:
    for c in criteria:
        if c.niveau not in NIVEAUX:
            raise ValueError(f"niveau invalide pour {c.id}: {c.niveau}")
        if c.verdict not in VERDICTS:
            raise ValueError(f"verdict invalide pour {c.id}: {c.verdict}")


def _rate(criteria: list[Criterion], niveau: str) -> float:
    items = [c for c in criteria if c.niveau == niveau]
    if not items:
        return 1.0
    passed = sum(1 for c in items if c.verdict == "PASS")
    return passed / len(items)


def aggregate(criteria: list[Criterion]) -> dict:
    """Retourne le résultat tiered-gated pour une liste de Criterion."""
    _validate(criteria)
    gate_failures = [c.id for c in criteria
                     if c.niveau == "CRITIQUE" and c.verdict == "FAIL"]
    majeur_rate = _rate(criteria, "MAJEUR")
    mineur_rate = _rate(criteria, "MINEUR")
    if gate_failures:
        status, score = "REJETÉ", 0.0
    else:
        score = round(0.8 * majeur_rate + 0.2 * mineur_rate, 4)
        if majeur_rate >= SEUIL_ADMIS:
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


def load_verdicts(path: str) -> list[Criterion]:
    """Charge un fichier JSON de verdicts Codex (Phase 4 criteria) en liste de Criterion."""
    data = json.loads(Path(path).read_text(encoding="utf-8"))
    return [Criterion(id=v["id"], niveau=v["niveau"], verdict=v["verdict"])
            for v in data["criteria"]]


def load_ground_truth_niveaux(path: str) -> dict:
    """{id: niveau} depuis la grille ground-truth — source autoritative du niveau."""
    data = json.loads(Path(path).read_text(encoding="utf-8"))
    return {c["id"]: c["niveau"] for c in data["criteria"]}


def load_scored(ground_truth_path: str, verdicts_path: str) -> list[Criterion]:
    """Joint les verdicts (id, verdict) et le ground-truth (niveau autoritatif) par id.

    Le niveau est TOUJOURS pris dans le ground-truth : un juge Phase 4 ne peut pas
    redéfinir la sévérité d'un criterion. Lève ValueError si les ids ne coïncident pas.
    """
    niveaux = load_ground_truth_niveaux(ground_truth_path)
    verdicts = json.loads(Path(verdicts_path).read_text(encoding="utf-8"))["criteria"]
    v_ids = {v["id"] for v in verdicts}
    gt_ids = set(niveaux)
    if v_ids != gt_ids:
        manquants = sorted(gt_ids - v_ids)
        en_trop = sorted(v_ids - gt_ids)
        raise ValueError(
            f"verdicts incohérents avec le ground-truth — "
            f"ids non scorés: {manquants or 'aucun'} ; ids inconnus: {en_trop or 'aucun'}"
        )
    return [Criterion(id=v["id"], niveau=niveaux[v["id"]], verdict=v["verdict"])
            for v in verdicts]


if __name__ == "__main__":
    import sys
    if len(sys.argv) == 3:
        crit = load_scored(sys.argv[1], sys.argv[2])
    elif len(sys.argv) == 2:
        crit = load_verdicts(sys.argv[1])  # legacy : niveau pris dans les verdicts (non autoritatif)
    else:
        print("usage: python3 tiered_scoring.py <ground-truth.(md|json)> <verdicts.json>", file=sys.stderr)
        print("   ou (legacy): python3 tiered_scoring.py <verdicts.json>", file=sys.stderr)
        sys.exit(1)
    print(json.dumps(aggregate(crit), ensure_ascii=False, indent=2))
