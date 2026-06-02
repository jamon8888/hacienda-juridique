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
