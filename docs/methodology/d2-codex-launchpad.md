# D.2 — Launchpad Codex minimal-friction

**Référence plan** : `docs/superpowers/plans/2026-06-01-hacienda-pi-vague-d-release-readiness.md` § D.2.
**Protocole blind** : `docs/methodology/sparring-scoring-protocol.md`.

**Statut** : launchpad historique du lot PI D.2, conçu pour éviter le terminal autant
que possible. Son wrapper `scripts/d2.py` appelle encore les templates holistiques
pondérés `phase2` / `phase4`, et les prompts Phase 1 pré-rendus inscrivent le code de
cycle dans le scénario. Il reste rejouable pour comparaison historique, mais ne
constitue plus le parcours canonique d'une nouvelle décision release.

> **Décision (2026-06-30, humain).** La migration `d2-v2` (wrapper criteria, prompts
> Phase 1 régénérés sans code embarqué, extraction des verdicts à quatre clés, nouveau
> format de livrable) est un chantier **structurant suivi en backlog**
> (`docs/backlog/d2-launchpad-v2-migration.md`), hors de cette passe d'harmonisation. Ce
> document reste le launchpad historique en attendant `d2-v2`.

---

## TL;DR — workflow D.2 historique (1 ligne par phase)

Pour `mise-en-demeure-pi` (exemple) :

```bash
# Phase 1 — pas de terminal du tout
open docs/methodology/d2-codex-prompts/phase1/mise-en-demeure-pi.md
# → copie le bloc PROMPT → colle dans Codex GPT-5.5 medium (conv neuve)
# → sauvegarde réponse Codex dans plugins/.../tests/datasets/d2-mise-en-demeure-pi/scenario.md

# Phase 2 — une commande, un mot
python3 scripts/d2.py phase2 mise-en-demeure-pi
# → copie le bloc PROMPT imprimé → colle dans Codex GPT-5.5 HIGH (conv neuve)
# → sauvegarde dans plugins/.../tests/datasets/d2-mise-en-demeure-pi/ground-truth.md

# Phase 3 — Claude Code session dédiée
# (cf. briefing Phase 3 plus bas)

# Phase 4 — une commande, un mot
python3 scripts/d2.py phase4 mise-en-demeure-pi
# → copie le bloc PROMPT → colle dans Codex GPT-5.5 medium (conv neuve)
# → sauvegarde dans docs/backlog/pi-scoring-d2-mise-en-demeure-pi-M6D5ZX.md
```

C'est tout pour rejouer le lot D.2 historique. Pas de paramètres à retaper. Le
wrapper `scripts/d2.py` connaît les 29 skills.

## Parcours canonique actuel pour une nouvelle release

Le protocole reste à 4 phases, mais les Phases 2 et 4 utilisent les templates
criteria atomiques tiered-gated. Exemple pour `mise-en-demeure-pi` :

```bash
# Phase 1 — scénario cycle-agnostique (conversation Codex distincte)
python3 scripts/codex-blind-scoring.py phase1 \
  --skill mise-en-demeure-pi --domain contentieux-pi \
  --mode "lettre d'assertion contre tiers contrefacteur présumé" \
  --specificites "posture cabinet ; approbateurs ; risque de procédure abusive" \
  --code M6D5ZX \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-mise-en-demeure-pi/scenario.md

# Phase 2 — le ground-truth EST la grille de 20-30 criteria
python3 scripts/codex-blind-scoring.py phase2-criteria \
  --skill mise-en-demeure-pi \
  --skill-description "Prépare une mise en demeure PI à partir d'un dossier fictif, sous validation humaine." \
  --domain contentieux-pi \
  --mode "lettre d'assertion contre tiers contrefacteur présumé" \
  --scenario plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-mise-en-demeure-pi/scenario.md \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-mise-en-demeure-pi/ground-truth.md

# Phase 3 — session Claude Code fraîche, scenario.md seul

# Phase 4 — rapport complet + bloc {id,niveau,verdict,preuve}
python3 scripts/codex-blind-scoring.py phase4-criteria \
  --skill mise-en-demeure-pi --skill-version 2.0.0 --code M6D5ZX \
  --scenario plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-mise-en-demeure-pi/scenario.md \
  --ground-truth plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-mise-en-demeure-pi/ground-truth.md \
  --live-output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-mise-en-demeure-pi/live-output.md \
  --output docs/backlog/pi-scoring-mise-en-demeure-pi-M6D5ZX.md
```

Sauvegarder la réponse Phase 4 complète dans le rapport indiqué et uniquement son
bloc JSON dans
`plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-mise-en-demeure-pi/verdicts-M6D5ZX.json`.
Le niveau vient du ground-truth ; le statut et le score sont calculés par
`scripts/tiered_scoring.py`. `extract-verdicts.py` cible actuellement les datasets DA,
d'où l'arbitrage `d2-v2` ci-dessus. La décision release repose sur **gate-clean**,
après spot-check des FAIL contre `live-output.md`.

---

## Suivi d'avancement à tout moment

```bash
python3 scripts/d2.py list
```

Imprime les 29 skills groupés par sprint avec une checklist `[P1 P2 P3 P4]` (✓ ou ·) qui se met à jour selon les fichiers présents.

---

## Outils disponibles

| Outil | Rôle |
|---|---|
| `docs/methodology/d2-codex-prompts/phase1/<skill>.md` | 29 prompts Phase 1 **pré-rendus** (zéro terminal) |
| `python3 scripts/d2.py phase1 <skill>` | Alternative terminal pour Phase 1 |
| `python3 scripts/d2.py phase2 <skill>` | Imprime prompt Phase 2 (embed scenario.md) |
| `python3 scripts/d2.py phase4 <skill>` | Imprime prompt Phase 4 (embed scenario + ground-truth + live-output) |
| `python3 scripts/d2.py list` | Tableau d'avancement |
| `scripts/codex-blind-scoring.py` | Helper bas-niveau (sous-jacent) avec garde-fous anti-leakage |

---

## Liste des 29 skills D.2 avec codes scoring

| # | Skill | Code | Sprint |
|---|---|---|---|
| 1 | `analyse-opposition-marque` | M4K2PA | D.2-a Marques |
| 2 | `analyse-refus-inpi` | R7N3FB | D.2-a Marques |
| 3 | `anteriorite-invalidite` | I8V5LC | D.2-a Marques (cross brevets) |
| 4 | `depot-marque-fr` | D9M1XD | D.2-a Marques |
| 5 | `revue-portefeuille-marques` | P3R7QE | D.2-a Marques |
| 6 | `surveillance-marque` | S5B2NF | D.2-a Marques |
| 7 | `certificat-complementaire-protection` | C6P8WG | D.2-b Brevets |
| 8 | `recherche-anteriorite-brevet` | R2A4YH | D.2-b Brevets |
| 9 | `revue-portefeuille-brevets` | P7B1ZI | D.2-b Brevets |
| 10 | `strategie-extension-internationale` | E5X9KJ | D.2-b Brevets (cross marques) |
| 11 | `tableau-contrefacon-brevet` | T8C6MK | D.2-b Brevets |
| 12 | `contrefacon-dessin-modele` | C1D3LL | D.2-c D&M |
| 13 | `recherche-anteriorite-dm` | A4D5NM | D.2-c D&M |
| 14 | `contrefacon-droit-auteur` | C9A2OP | D.2-d Droit auteur |
| 15 | `depot-preuve-creation` | D6P4QQ | D.2-d Droit auteur |
| 16 | `droits-voisins-ogc` | V8R7TR | D.2-d Droit auteur |
| 17 | `licence-droit-auteur` | L3A1US | D.2-d Droit auteur |
| 18 | `qualification-oeuvre` | Q5W6VT | D.2-d Droit auteur |
| 19 | `bases-de-donnees` | B7D8WU | D.2-e Logiciel/BdD |
| 20 | `revue-logiciel-donnees` | R2L9XV | D.2-e Logiciel/BdD |
| 21 | `logiciels-pi` | L4S3YW | D.2-e Logiciel/BdD |
| 22 | `mise-en-demeure-pi` | M6D5ZX | D.2-f Contentieux/Enforcement |
| 23 | `saisie-contrefacon` | S8C7AY | D.2-f Contentieux/Enforcement |
| 24 | `strategie-defense-pi` | D1F2BZ | D.2-f Contentieux/Enforcement |
| 25 | `tri-contrefacon` | T3R4CA | D.2-f Contentieux/Enforcement |
| 26 | `audit-pi-ma` | U5M6DB | D.2-g Transverse |
| 27 | `contrats-pi` | C7P8EC | D.2-g Transverse |
| 28 | `revue-clause-pi` | R9V1FD | D.2-g Transverse |
| 29 | `portefeuille-pi` | P2T3GE | D.2-g Transverse |

---

## Briefing Phase 3 — Claude Code session dédiée

Ouvre une **nouvelle session Claude Code dans le repo** (sur `main`), puis colle ce briefing dans la première conversation :

```
Tu es l'exécuteur Phase 3 d'un cycle blind sparring scoring (protocole D.0).

Référence protocole : docs/methodology/sparring-scoring-protocol.md § Phase 3.
Référence launchpad : docs/methodology/d2-codex-launchpad.md.

Contrainte anti-leakage critique :
- N'ouvre JAMAIS tests/datasets/d2-<skill>/ground-truth.md (signal de contamination).
- Lis uniquement scenario.md.
- Invoque /h-pi:<skill> sur ce scenario.
- Sauvegarde la sortie complète dans live-output.md du même dossier.

Tu n'as pas besoin de connaître le reste du projet. Tu exécutes des skills sur des
dossiers de test, sans interpréter, sans scorer.

Liste des skills Phase 3 à exécuter (filtres avec : python3 scripts/d2.py list) :
[tableau des 29 skills]

Tu peux paralléliser via subagents si plusieurs scenarios + ground-truth sont prêts
simultanément. Pour chaque skill, le mode d'invocation type est dans la fiche
docs/methodology/d2-codex-prompts/phase1/<skill>.md (champ "Mode").
```

---

## Anti-leakage — checklist par cycle

Avant de publier un score, vérifier :

- [ ] Phase 1 et Phase 2 ont été produites dans des **conversations Codex distinctes** (une chacune)
- [ ] Phase 2 a reçu uniquement `scenario.md` + description neutre (jamais le SKILL.md)
- [ ] Phase 3 a reçu uniquement `scenario.md` (jamais `ground-truth.md`)
- [ ] Phase 4 a reçu `scenario.md` + `ground-truth.md` + `live-output.md` (jamais le SKILL.md)
- [ ] Le wrapper `d2.py` n'a pas reporté de garde-fou déclenché
- [ ] Le rapport final porte le marqueur `[scoring blind protocole D.0]`

Pour tout nouveau cycle canonique, ajouter :

- [ ] `scenario.md` et `ground-truth.md` sont cycle-agnostiques
- [ ] le ground-truth contient 20–30 criteria atomiques, avec gates-pièges et sans zone passive orpheline
- [ ] le verdict persistant contient `{id,niveau,verdict,preuve}` pour chaque criterion
- [ ] le rapport complet et le JSON de verdicts sont deux artefacts distincts
- [ ] le scoreur ne calcule pas le statut ; `tiered_scoring.py` agrège
- [ ] la décision release se prend sur gate-clean après spot-check des FAIL

---

## Estimation budget Codex

Pour 29 skills × 3 sessions Codex (Phase 1 medium + Phase 2 HIGH + Phase 4 medium) :
- Phase 1 medium : ~5-10 min/skill × 29 = ~2.5 à 5 h équivalent humain Codex
- Phase 2 HIGH : ~10-20 min/skill × 29 = ~5 à 10 h Codex
- Phase 4 medium : ~5-10 min/skill × 29 = ~2.5 à 5 h Codex
- **Total Codex** : ~10 à 20 h, parallélisable en batch (plusieurs onglets Codex simultanés).

Phase 3 Claude Code : ~3-5 min/skill × 29 = ~2 h.

**Total chemin long D.2 estimé** : ~12 à 22 h équivalent humain réparti Codex + Claude Code.

---

## Suite

Quand les 29 cycles sont complets :
- Agrégation des findings dans `docs/backlog/pi-content-improvements-vague-d2.md` (livrable D.2.8).
- Bump PI v0.21.0 → v0.22.0.
- Démarrer D.3 (re-scoring blind des 6 skills D.1 sur les mêmes datasets vague C avec ground-truth Codex frais).
