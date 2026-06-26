# Statut — `declaration-creance --releve-forclusion`

## Conclusion

Le **relevé de forclusion L.622-26** n'est pas un skill autonome manquant. Le statut réel est :

**(a) mode existant et scoré** — le traitement est intégré comme mode `--releve-forclusion` du skill `declaration-creance`.

Il existe bien une anomalie de surface : aucun dossier `plugins/hacienda-droit-affaires/skills/releve-forclusion/` n'est présent, mais les preuves disponibles montrent que le sujet a été construit, documenté et scoré comme **mode** de `declaration-creance`, pas comme skill séparé.

## Preuves principales

### 1. Le dataset cible explicitement `declaration-creance --releve-forclusion`

- `plugins/hacienda-droit-affaires/tests/datasets/da-releve-forclusion/scenario.md:1` titre le scénario : "Relevé de forclusion L.622-26 (mode --releve-forclusion)".
- `plugins/hacienda-droit-affaires/tests/datasets/da-releve-forclusion/scenario.md:7` donne l'entry point : `/h-droit-affaires:declaration-creance --releve-forclusion ./faits.md`.
- `plugins/hacienda-droit-affaires/tests/datasets/da-releve-forclusion/scenario.md:61` confirme le cadre : `--releve-forclusion`.
- `plugins/hacienda-droit-affaires/tests/datasets/da-releve-forclusion/ground-truth.md:2` rattache la grille au skill `"declaration-creance"`.

### 2. La ground truth teste bien le relevé L.622-26

La grille contient les gates et critères attendus d'un mode relevé :

- Qualification LJ + régime de déclaration/relevé via L.641-3 : `ground-truth.md:5-8`.
- Forclusion initiale L.622-24 expirée au 13 mars 2026 : `ground-truth.md:11-14`.
- Délai d'action en relevé de 6 mois jusqu'au 13 juillet 2026 : `ground-truth.md:17-20`.
- Fondement central : omission du créancier dans la liste L.622-6, cause autonome de relevé L.622-26 : `ground-truth.md:29-32`.
- Objet de la requête : relevé + autorisation/possibilité de déclarer, pas condamnation de droit commun : `ground-truth.md:65-68`.
- Effet du relevé : concours seulement aux répartitions postérieures : `ground-truth.md:89-92`.
- Prudence livrable / validation humaine : `ground-truth.md:107-110`.

### 3. Les trois verdicts existent et scorent ce mode sous `declaration-creance`

Les trois cycles présents sont :

- `plugins/hacienda-droit-affaires/tests/datasets/da-releve-forclusion/verdicts-BBXO2M.json:1` : C-001 FAIL, C-002 à C-005 PASS ; C-013, C-016, C-017 FAIL.
- `plugins/hacienda-droit-affaires/tests/datasets/da-releve-forclusion/verdicts-Z1VBG3.json:1` : C-001 à C-012 PASS ; C-013 et C-016 FAIL ; C-017 PASS.
- `plugins/hacienda-droit-affaires/tests/datasets/da-releve-forclusion/verdicts-ZX3XNP.json:1` : même profil que Z1VBG3, avec C-001 à C-012 PASS, C-013 et C-016 FAIL, C-017 PASS.

Cela confirme un scoring réel, pas seulement un scénario orphelin.

### 4. Le SKILL.md de `declaration-creance` contient le mode

Le skill documente explicitement le mode :

- Frontmatter : `argument-hint` mentionne `--releve-forclusion` pour la requête L.622-26 (`plugins/hacienda-droit-affaires/skills/declaration-creance/SKILL.md:14`).
- Intake : le mode `--releve-forclusion` "rédige une requête en relevé de forclusion" lorsque le délai L.622-24 est acquis (`SKILL.md:87`).
- Checklist : le mode vérifie délai 6 mois, cause du relevé, juge-commissaire et conséquence sur les répartitions (`SKILL.md:113`).
- Barème forclusion : si `jours_restants < 0`, action "requête en relevé art. L.622-26" (`SKILL.md:174-179`).
- Section dédiée : `## Mode --releve-forclusion — Requête en relevé de forclusion (L.622-26)` (`SKILL.md:344`).
- Déclenchement et limites : produit une requête motivée au juge-commissaire, mais ne dispense pas de la déclaration (`SKILL.md:346`).
- Recevabilité : fondement selon procédure, renvoi L.631-14 / L.641-3 et délai 6 mois (`SKILL.md:350-351`).
- Causes du relevé : non-imputabilité ou omission débiteur L.622-6 (`SKILL.md:360-367`).
- Trame de requête : objet, forclusion, délai de 6 mois, cause et demande au juge-commissaire (`SKILL.md:369-383`).
- Conséquences : répartitions postérieures et déclaration après relevé (`SKILL.md:386-389`).
- Hors-scope : le dépôt et la plaidoirie restent actes de l'avocat (`SKILL.md:393-397`).

### 5. Les documents de suivi corroborent le statut "mode construit"

- `docs/backlog/da-codex-scoring-queue.md:33` liste `declaration-creance --releve-forclusion` en P1, avec scénario, ground truth, scoring et statut "RÉSERVES 0,853".
- `docs/backlog/da-codex-scoring-queue.md:102` indique explicitement : "#2 relevé de forclusion L.622-26 | mode sur `declaration-creance` | ✅ construit".
- L'agent `bodacc-procedures-watcher` renvoie lui aussi vers `declaration-creance` pour le relevé : il flague la forclusion et précise que "le skill `declaration-creance` prépare la trame" (`plugins/hacienda-droit-affaires/agents/bodacc-procedures-watcher.md:190-195`).

## Hypothèses

### (a) Mode existant et scoré — retenue

Retenue, car le dataset appelle explicitement `/h-droit-affaires:declaration-creance --releve-forclusion`, la grille déclare `"skill": "declaration-creance"`, le SKILL.md contient une section dédiée et trois verdicts de scoring existent.

### (b) Skill prévu mais non bâti / orphelin — écartée

Écartée sous réserve du seul naming : il n'y a pas de dossier `skills/releve-forclusion/`, mais les sources internes ne présentent pas le sujet comme un skill autonome à bâtir. Au contraire, elles le présentent comme un mode de `declaration-creance` (`scenario.md:1`, `scenario.md:7`, `SKILL.md:87`, `SKILL.md:344`, `da-codex-scoring-queue.md:102`).

### (c) Thread abandonné — écartée

Écartée : le sujet a une section fonctionnelle dans le skill, une ground truth détaillée, trois verdicts, et une entrée de backlog indiquant "construit" puis "Releasable RÉSERVES" (`docs/backlog/da-codex-scoring-queue.md:33`, `docs/backlog/da-codex-scoring-queue.md:102`).

## Recommandation

**Intégrer/documenter le mode, ne pas bâtir un nouveau skill et ne pas archiver le dataset.**

Actions recommandées :

1. Ajouter une mention visible dans la documentation publique du plugin indiquant que le relevé de forclusion est un **mode** de `/h-da:declaration-creance`, par exemple `/h-da:declaration-creance --releve-forclusion`, puisque le README ne dit aujourd'hui que "Déclaration de créance et forclusion" (`plugins/hacienda-droit-affaires/README.md:96`).
2. Conserver le dataset `da-releve-forclusion/` comme dataset de scoring du mode `declaration-creance --releve-forclusion`.
3. Ne créer un dossier `skills/releve-forclusion/` que si le produit décide explicitement de séparer ce workflow. À ce stade, cela créerait plutôt une duplication avec la section existante de `declaration-creance`.
4. Si le mode est rescoré, suivre les résiduels déjà identifiés : C-013 "contenu déclaration" et C-016 "frais d'instance" restent FAIL dans les cycles Z1VBG3/ZX3XNP (`verdicts-Z1VBG3.json:1`, `verdicts-ZX3XNP.json:1`).

## Limites

Cette note est fondée uniquement sur les fichiers consultés dans le dépôt courant. Je n'ai pas relancé de scoring et je n'ai pas consulté de source juridique externe ; les références L.622-24/L.622-26/L.641-3 sont citées ici seulement comme objets du skill/dataset, pas comme validation juridique de leur contenu.
