# Hacienda Droit des Affaires v2a — Plugin Design

Date: 2026-05-26
Status: Proposed
Scope: Petite vague d'absorption ciblée du squelette `hacienda-contrats` — retrait du dossier + construction d'un seul skill pull-forward, `analyser-rupture-brutale`. Développée en parallèle des tests personas de V1/V1.1/V1.2 et en amont de V2b (distribution Cowork-ready, héritée du pattern hacienda-ghost une fois validé).

Specs de référence :
- V1 : `docs/superpowers/specs/2026-05-18-hacienda-droit-affaires-design.md`
- V1.1 : `docs/superpowers/specs/2026-05-20-hacienda-droit-affaires-v1.1-design.md`
- V1.2 : `docs/superpowers/specs/2026-05-21-hacienda-droit-affaires-v1.2-design.md`

---

## Contexte

V1 + V1.1 + V1.2 du plugin `hacienda-droit-affaires` sont livrées. Le plugin compte 18 skills et 4 agents.

La roadmap d'origine prévoyait une vague v2-features (absorption du squelette `hacienda-contrats`, droit boursier, connecteurs Drive/SharePoint). Plutôt que d'attaquer cette vague entière maintenant — ce qui gonflerait encore la file de validation persona — la décision est prise de :

1. **V2a (cette spec)** — Pull-forward minimal : retirer le squelette `hacienda-contrats` (housekeeping, sur le modèle du retrait `hacienda-societes` en V1.2) et construire le seul skill du squelette à forte demande contentieux M&A : `analyser-rupture-brutale` (L.442-1 II C.com.).
2. **V2b (plus tard)** — Distribution Cowork-ready. Bloquée sur la finalisation du pattern packaging/install par `hacienda-ghost` (en cours côté associé). Dès que ghost a validé le pattern, droit-affaires en hérite.

Les 7 autres skills du squelette `hacienda-contrats` (`reviser-saas`, `reviser-bail-commercial`, `analyser-distribution`, `proposer-redlines`, `verification-pouvoir-signataire`, `recherche-contractuelle`, `resume-operationnel`) restent hors scope — futur v3+ selon demande personas réelle.

## Personas

Inchangés. `analyser-rupture-brutale` route principalement vers l'**ami** (entreprises en difficulté + droit des sociétés généraliste — les ruptures de relations commerciales sont fréquentes dans son flux) et secondairement vers le **frère** (contentieux M&A).

## Goals

1. Retirer proprement le squelette `hacienda-contrats` pour clore la dette taxonomique restante (`hacienda-societes` a été retiré en V1.2, `hacienda-contrats` est le dernier squelette résiduel parmi ceux que `hacienda-droit-affaires` est censé absorber).
2. Construire `analyser-rupture-brutale` au format canonique V1, parallel-safe, sans rien modifier de V1/V1.1/V1.2.
3. Garder la fenêtre persona ouverte — V2a n'ajoute qu'**un seul skill** à la file.

## Non-Goals

1. Pas de construction des 7 autres skills du squelette `hacienda-contrats` — futur v3+.
2. Pas d'activation des workspaces de dossier — chantier post-personas.
3. Pas de distribution Cowork-ready — c'est V2b, bloqué sur ghost.
4. Aucun nouvel outil `packages/core`.
5. Aucune modification d'un skill/agent V1/V1.1/V1.2 pendant les tests personas (sauf correctif de bug remonté).
6. Aucune référence nouvelle — `analyser-rupture-brutale` consomme `clauses-sensibles-fr.md` + `articles-c-civ-c-com-index.md` existants.

## Contrainte directrice — parallélisme sûr

Comme V1.1 et V1.2, V2a se développe sur `main` en mode strictement additif côté plugin `hacienda-droit-affaires` :

1. **Aucune modification d'un skill/agent V1/V1.1/V1.2 ni de `packages/core`** tant que les personas testent. Le nouveau skill ajoute uniquement un fichier neuf.
2. **Exception unique** : un bug V1/V1.1/V1.2 remonté par un persona se corrige immédiatement sur `main`, priorité absolue.
3. **Le skill V2a n'atterrit sur `main` que complet et testé en interne.**
4. **Exception assumée — Tâche 0** : la suppression de `hacienda-contrats` est non-additive (retrait d'un dossier + entrée marketplace + test core), MAIS ne touche pas le plugin `droit-affaires` → sans impact personas. Commit dédié, isolé de la suite.

## Périmètre — 1 skill, format canonique

| Composant | Type | Validateur principal |
|---|---|---|
| `analyser-rupture-brutale` | skill `--review` | ami |

## Ordre de construction

```
Tâche 0   Préliminaires
          - Ménage worktree + tag v2a-base
          - Suppression du squelette hacienda-contrats (commit dédié, non-additif) :
            retrait de plugins/hacienda-contrats/, retrait de l'entrée
            marketplace.json racine, mise à jour du test
            packages/core/test/hacienda-marketplace.test.ts, grep et correction
            des renvois (notamment taxonomie-contrats-fr.md s'il en contient).

Wave 1   Skill analyser-rupture-brutale

Tâche finale   Vérification périmètre + tests + CHANGELOG + handoff
```

## Détail du composant

### `analyser-rupture-brutale` — mode `--review`

Analyse une relation commerciale au regard du risque de rupture brutale (L.442-1, II C.com., issu de l'ord. 2019-359 du 24 avril 2019 — ex-article L.442-6, I, 5°). Skill ciblé contentieux M&A et accompagnement du débiteur en entreprise en difficulté.

**Couvre :**
- Qualification de la « relation commerciale établie » (relations stables, régulières, à long terme — appréciation jurisprudentielle multi-critères : ancienneté, volume, exclusivité, intuitu personae, dépendance économique).
- Évaluation du préavis : règle de pouce jurisprudentielle (~1 mois de préavis raisonnable par année d'ancienneté de la relation, modulée selon les critères ci-dessus).
- Application du **safe harbor légal de 18 mois** (L.442-1, II al. 2) : un préavis effectivement accordé de 18 mois ferme protège l'auteur de la rupture de toute condamnation pour préavis insuffisant.
- Identification du risque (relation établie ? préavis trop court ?) et estimation du préjudice indemnisable (marge brute durant la période manquante, jurisprudence constante).
- Cas de dispense de préavis (inexécution grave, force majeure, événements exonératoires).

**Mode unique** `--review` : analyse d'une relation commerciale documentée par l'utilisateur (contrat, historique, projet de notification de rupture).

**Patron de format** : `reviser-contrat` (V1, skill `--review`). Reproduire à l'identique frontmatter, disclaimer, examples, chargement profil, intake, étapes, sortie (note du relecteur 5 champs en gras, arbre de décision 5 options, footer A PII).

**Articles cités** : L.442-1 C.com. (déjà dans `articles-c-civ-c-com-index.md`, libellé enrichi en V1.1 pour porter à la fois déséquilibre significatif et rupture brutale).

**Jurisprudence à inviter en référence** (avec `[a verifier]` ou `[Judilibre]` selon récupération en session) : arrêts de la chambre commerciale de la Cour de cassation sur la qualification de la relation établie, sur les critères du préavis raisonnable, et sur l'évaluation du préjudice. Le skill ne fige pas une liste d'arrêts dans son texte — il invite à les rechercher via `verifier-citations` / Judilibre au moment de l'analyse.

**Renvois** :
- Si la rupture s'inscrit dans une procédure collective (sauvegarde, RJ, LJ du débiteur), renvoyer vers `declaration-creance` (V1) pour la déclaration éventuelle de la créance d'indemnisation.
- Si la rupture porte sur un contrat de distribution avec composante PI, renvoyer vers `PI:contrats-pi`.

**Validateur** : ami principalement (fréquence du sujet en entreprises en difficulté). Frère secondairement (contentieux M&A).

## Tâche 0 — Suppression du squelette `hacienda-contrats`

Opérations identiques au pattern V1.2 (retrait `hacienda-societes`) :

- Suppression du dossier `plugins/hacienda-contrats/`.
- Retrait de l'entrée `hacienda-contrats` dans `.claude-plugin/marketplace.json` (racine).
- Mise à jour de `packages/core/test/hacienda-marketplace.test.ts` (`expectedPlugins`).
- Grep de `hacienda-contrats` dans tout le repo (notamment `references/taxonomie-contrats-fr.md`, les `CLAUDE.md` des plugins, la documentation) → corriger ou retirer les renvois vers les skills du squelette ; rediriger vers les skills V1/V1.1/V1.2 équivalents quand ils existent (`reviser-contrat`, `reviser-nda`, `cgv-generator`, ou le nouveau `analyser-rupture-brutale`), retirer le renvoi sinon.
- Vérification : `npm test` côté `packages/core` reste vert.

Cette tâche ne touche pas le plugin `hacienda-droit-affaires` — aucun impact sur les personas. Commit dédié.

## Format du composant

`analyser-rupture-brutale` suit les patterns canoniques figés en V1/V1.1/V1.2 : frontmatter YAML, bloc disclaimer en citation, 3-4 blocs `<example>`, `## Chargement du profil`, `## Intake` numérotée à modes, `## Étape N`, `## Sortie` (note du relecteur 5 champs en gras, arbre de décision 5 options dont option 4 « Surveiller et attendre », footer A PII en lien Markdown). Tags de provenance sans backticks en cellules ; article hors index → `[a verifier]`.

## Tests

| Composant | Test interne |
|---|---|
| Tâche 0 | `npm test` core reste vert ; `grep -rn hacienda-contrats` après retrait → 0 renvoi cassé |
| `analyser-rupture-brutale` | Dataset : scénario d'une rupture de relation de distribution exclusive de 8 ans avec préavis effectivement accordé de 3 mois → attendu : qualification « relation établie » 🟢, préavis insuffisant 🟠, recommandation de préavis raisonnable ≈ 6-8 mois (ordre de grandeur 1 mois/an), application du safe harbor 18 mois en alternative défensive, estimation du préjudice (marge brute manquante) |

`verifier-citations` post-flight et `check-pii` pré-flight intégrés au skill.

### Validation persona (différée)

L'ami valide en premier (fréquence du sujet dans son flux), le frère secondairement. Pattern différé identique à V1/V1.1/V1.2.

## Risques

### R1 — Jurisprudence vive et évolutive

La jurisprudence sur la rupture brutale est très abondante et évolue régulièrement (critères du préavis, base de calcul de l'indemnité, articulation avec le droit de la concurrence).

Mitigation : le skill ne fige pas de liste fermée d'arrêts ; il invite à `verifier-citations` (lookup Judilibre) au moment de l'analyse pour vérifier la fraîcheur. Les références jurisprudentielles produites par le skill sont systématiquement taguées `[Judilibre]` (si vérifiées en session) ou `[a verifier]` sinon.

### R2 — Article L.442-1 II vs ex-L.442-6 I 5°

L'article a été renuméroté par l'ordonnance 2019-359. Les sources antérieures à 2019 citent encore L.442-6 I 5°.

Mitigation : le skill mentionne explicitement le double fondement (« L.442-1 II, ex L.442-6 I 5° »), et invite à `[review]` toute citation d'arrêt antérieur à 2019 pour confirmation du portage.

### R3 — Confusion avec le déséquilibre significatif (même article L.442-1)

L.442-1 I = déséquilibre significatif ; L.442-1 II = rupture brutale. Deux fondements distincts dans le même article.

Mitigation : le libellé de L.442-1 dans `articles-c-civ-c-com-index.md` porte déjà les deux (mise à jour faite en V1.1). Le skill utilise systématiquement la précision « L.442-1, II » lorsqu'il traite de la rupture brutale, pour éviter la confusion.

## Hors scope V2a (explicite)

| Sujet | Statut |
|---|---|
| 7 autres skills du squelette `hacienda-contrats` (saas, bail commercial, distribution, redlines, pouvoir signataire, recherche contractuelle, résumé opérationnel) | Futur v3+ selon demande personas |
| Distribution Cowork-ready | V2b, bloqué sur la finalisation ghost |
| Workspaces de dossier | Chantier post-personas |
| Nouvel outil `packages/core`, nouvel agent, nouvelle référence | Hors scope V2a |

## Acceptance Criteria

1. Squelette `hacienda-contrats` supprimé proprement : dossier retiré, entrée `marketplace.json` retirée, test core `hacienda-marketplace` mis à jour, 0 renvoi cassé, `npm test` core vert.
2. Skill `analyser-rupture-brutale` au format canonique (frontmatter, disclaimer, examples, intake, étapes, sortie avec note du relecteur 5 champs en gras + arbre 5 options + footer A PII).
3. Le skill distingue explicitement L.442-1 I (déséquilibre) et L.442-1 II (rupture brutale) sans confusion ; mentionne l'ex-L.442-6 I 5° dans les cas pertinents.
4. Le skill applique le safe harbor 18 mois comme protection défensive de l'auteur d'une rupture, pas comme plafond légal du préavis dû.
5. `verifier-citations` post-flight et `check-pii` pré-flight intégrés.
6. Renvois actifs vers `declaration-creance` (si procédure collective concomitante) et vers `PI:contrats-pi` (si distribution PI-centric).
7. Périmètre additif vérifié `git diff --stat v2a-base HEAD` côté `plugins/hacienda-droit-affaires/` ; Tâche 0 isolée dans son commit dédié, hors plugin `droit-affaires`.
8. `npm test`, `npm run typecheck`, `npm run build`, `npm run branding:check`, `git diff --check` tous verts.
9. Le skill est commité complet — jamais de demi-skill sur `main`.

---

*Version 1.0 — spec V2a à valider avant écriture du plan d'implémentation.*
