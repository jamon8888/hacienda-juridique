# `codex-blind-scoring.py` — Mode d'emploi

Helper Codex pour le protocole blind sparring scoring Hacienda.

**Référence protocole** : [`docs/methodology/sparring-scoring-protocol.md`](../docs/methodology/sparring-scoring-protocol.md)
**Templates Codex** : [`docs/methodology/codex-prompt-templates.md`](../docs/methodology/codex-prompt-templates.md)

## Pourquoi un script

Sans script, le risque d'erreurs sur un cycle de scoring est élevé :
- chemins de fichiers approximatifs entre phases ;
- copier-coller des templates approximatif ;
- placeholders non substitués ;
- code scoring oublié ou doublonné ;
- leakage involontaire (Phase 2 reçoit le SKILL.md ; scoreur Phase 4 reçoit la vérité terrain dans le même fichier que le scenario).

Le script verrouille tout ça.

## Workflow type — un skill

Pour un skill `<skill>` (ex. `analyse-opposition-marque`), 4 étapes :

### 1. Générer un code scoring 6 chars

```bash
python3 -c "import secrets, string; print(''.join(secrets.choice(string.ascii_uppercase+string.digits) for _ in range(6)))"
# ex. → K9R4MX
```

Noter ce code, il identifie le cycle complet.

### 2. Phase 1 — Dataset (Codex GPT-5.5 medium)

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill analyse-opposition-marque \
  --domain marques \
  --mode "analyse offensive opposition INPI L.712-4" \
  --specificites "motifs absolus L.711-2 ; restauration L.712-4-1" \
  --code K9R4MX \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-analyse-opposition-marque/scenario.md
```

**Action manuelle** :
1. Le prompt est imprimé sur stdout entre `>>> PROMPT CODEX <<<` et `<<< FIN PROMPT >>>`.
2. Ouvrir une **nouvelle session Codex** (CLI ou web) dédiée à cette Phase 1.
3. Coller le prompt.
4. Récupérer le markdown généré, le sauvegarder dans le `--output` indiqué.
5. **Fermer la session Codex** (ne pas l'utiliser pour Phase 2).

### 3. Phase 2 — Vérité terrain (Codex GPT-5.5 **HIGH**)

```bash
python3 scripts/codex-blind-scoring.py phase2 \
  --skill analyse-opposition-marque \
  --skill-description "Skill d'analyse d'opposition à un dépôt de marque devant l'INPI, mode offensif ou défensif. Produit un livrable partner-ready avec findings cotés et recommandation." \
  --domain marques \
  --mode "offensif L.712-4" \
  --scenario plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-analyse-opposition-marque/scenario.md \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-analyse-opposition-marque/ground-truth.md
```

**Action manuelle** :
1. **Nouvelle session Codex** distincte de Phase 1 (changer d'onglet / fermer + rouvrir CLI).
2. Effort Codex → **HIGH** (la phase la plus consequence).
3. Coller le prompt.
4. Sauvegarder dans le `--output`.

**Anti-leakage automatique** : le script refuse si le scenario contient déjà une section "Vérité terrain" ou "Critères de scoring" (signal qu'il n'est pas blind).

### 4. Phase 3 — Exécution live (Claude Code)

C'est l'unique phase qui n'est PAS faite via Codex. Dans une **session Claude Code dédiée** (avec le plugin PI installé) :

```
/h-pi:analyse-opposition-marque [arguments du mode]
```

En lui fournissant comme input **uniquement** le `scenario.md`. La sortie est sauvegardée dans :

```
plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-analyse-opposition-marque/live-output.md
```

**Anti-leakage manuel** : la session Claude Code de Phase 3 ne doit pas ouvrir `ground-truth.md`. Idéalement, conserver le ground-truth dans un sous-dossier ou marquer explicitement « blind input only ».

### 5. Phase 4 — Scoring (Codex GPT-5.5 medium)

```bash
python3 scripts/codex-blind-scoring.py phase4 \
  --skill analyse-opposition-marque \
  --skill-version 2.0.0 \
  --code K9R4MX \
  --scenario plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-analyse-opposition-marque/scenario.md \
  --ground-truth plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-analyse-opposition-marque/ground-truth.md \
  --live-output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-analyse-opposition-marque/live-output.md \
  --date 2026-06-15 \
  --output docs/backlog/pi-scoring-d2-analyse-opposition-marque-K9R4MX.md
```

**Action manuelle** :
1. **Nouvelle session Codex** distincte des Phases 1, 2 et 3.
2. Coller le prompt.
3. Sauvegarder dans `--output`.

**Anti-leakage automatique** : le script refuse explicitement si un des arguments pointe vers un fichier `SKILL.md`.

## Checklist anti-leakage par cycle

Avant de publier un score :

- [ ] Phase 1 et Phase 2 dans des sessions Codex distinctes
- [ ] Phase 2 a reçu uniquement `scenario.md` + description neutre (PAS le SKILL.md complet)
- [ ] Phase 3 a reçu uniquement `scenario.md` (PAS `ground-truth.md`)
- [ ] Phase 4 a reçu `scenario.md` + `ground-truth.md` + `live-output.md` (PAS le SKILL.md)
- [ ] Code scoring unique par cycle, non réutilisé
- [ ] Rapport final marqué `[scoring blind protocole D.0]` (et pas `[scoring auto-référent]`)

## Codes d'erreur du script

| Exit code | Signification |
|---|---|
| 0 | OK |
| 1 | Erreur d'usage (argparse) |
| 2 | Anti-leakage déclenché (voir message stderr) |
| 3 | Template `docs/methodology/codex-prompt-templates.md` introuvable ou corrompu |

## Tests de bon fonctionnement

```bash
# Help affiché
python3 scripts/codex-blind-scoring.py --help

# Code invalide → exit 2
python3 scripts/codex-blind-scoring.py phase1 --skill x --domain y --mode z \
  --specificites a --code badcode --output /tmp/x.md

# SKILL.md en input Phase 4 → exit 2
python3 scripts/codex-blind-scoring.py phase4 --skill x --skill-version 1 \
  --code AAA000 --scenario /tmp/a.md --ground-truth /tmp/b.md \
  --live-output plugins/.../SKILL.md --output /tmp/y.md
```

## Modèle Codex

| Phase | Modèle |
|---|---|
| Phase 1 | GPT-5.5 effort medium |
| Phase 2 | GPT-5.5 effort HIGH |
| Phase 4 | GPT-5.5 effort medium |

**GPT-4.5 (orion) déconseillé** sur PI FR — risque de citations CPI / CJUE inventées.

## Évolutions du script

Toute modification incompatible (renommage d'argument, changement de format de prompt structurant) = nouveau script versionné `codex-blind-scoring-v2.py`. Le script actuel reste exécutable pour rejouer des cycles historiques.
