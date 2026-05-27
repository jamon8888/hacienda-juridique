# Hacienda Droit des Affaires v1.2 — Plugin Design

Date: 2026-05-21
Status: Proposed
Scope: Spécification de la vague V1.2 du plugin `hacienda-droit-affaires` — 2 skills de génération/conseil + 1 feature de veille (agent + skill), développés en parallèle des tests personas de V1/V1.1, plus la suppression du squelette `hacienda-societes` désormais débloquée.

Specs de référence :
- V1 : `docs/superpowers/specs/2026-05-18-hacienda-droit-affaires-design.md`
- V1.1 : `docs/superpowers/specs/2026-05-20-hacienda-droit-affaires-v1.1-design.md`

---

## Contexte

V1 (9 skills, 3 agents) et V1.1 (6 skills additifs) du plugin `hacienda-droit-affaires` sont livrées. Le plugin compte 15 skills et 3 agents. La validation personas de V1 + V1.1 est en cours en parallèle ; elle gate le bump v1.0.0 → v1.1.0.

V1.2 poursuit le développement en parallèle des tests personas. Elle livre :
- les deux derniers skills nommés de la roadmap v1.2 (`cgv-generator`, `financement-startup`) ;
- la feature de veille juridique (`consulter-digest` + agent `veille-jurisprudence`), prévue en v1.2 dans la spec V1 d'origine ;
- l'expansion de la bibliothèque `clauses-sensibles-fr.md` (15 → 30 clauses) ;
- la suppression du squelette `hacienda-societes`, désormais débloquée puisque ses skills de remplacement (`constitution-societe`, `gouvernance-ag`, `pacte-associes-review`) ont été livrés en V1.1.

## Goals

1. Développer 2 skills + 1 feature de veille en parallèle des tests personas, sans perturber le plugin que les personas testent.
2. Compléter la roadmap v1.2 nommée dans les specs V1 et V1.1.
3. Étendre la bibliothèque de clauses sensibles pour alimenter `cgv-generator`.
4. Exécuter la suppression du squelette `hacienda-societes` (décidée, débloquée par V1.1).
5. Réutiliser sans exception les patterns canoniques figés en V1/V1.1.

## Non-Goals

1. Pas d'activation des workspaces de dossier — chantier post-personas.
2. Pas d'absorption du squelette `hacienda-contrats` (12 skills) — v2.
3. Pas d'inserts droit boursier ni de connecteurs Drive/SharePoint — v2.
4. Pas de surveillance veille multi-chambres en v1.2 — la chambre sociale et les autres chambres sont une évolution future (v1.3+).
5. Aucun nouvel outil `packages/core` : la veille consomme les clients Légifrance et Judilibre existants.
6. Aucune modification d'un skill/agent V1 ou V1.1 pendant les tests personas (sauf correctif de bug remonté).

## Contrainte directrice — parallélisme sûr

Comme V1.1, V1.2 se développe sur `main` en mode strictement additif côté plugin `hacienda-droit-affaires`. Règles dures :

1. **Aucune modification d'un skill V1/V1.1, d'un agent V1, ou de `packages/core`** tant que les personas testent. Les nouveaux composants n'ajoutent que des fichiers neufs.
2. **Exception unique** : un bug V1/V1.1 remonté par un persona se corrige immédiatement sur `main`, priorité absolue.
3. **Un composant V1.2 n'atterrit sur `main` que complet et testé en interne.** Jamais de demi-skill.
4. **Exception assumée — Tâche 0** : la suppression de `hacienda-societes` est non-additive (retrait d'un dossier, modification de `marketplace.json` racine et d'un test `packages/core`). Elle ne touche **pas** le plugin `hacienda-droit-affaires` — donc aucun impact sur l'expérience des personas. Elle est isolée dans un commit dédié en Tâche 0.

## Périmètre — 2 skills + 1 feature veille

| Composant | Type | Validateur | Origine roadmap |
|---|---|---|---|
| `cgv-generator` | skill | l'un ou l'autre persona (droit commercial) | v1.2 (specs V1 + V1.1) |
| `financement-startup` | skill | frère (M&A/financement) en premier, ami (sociétés) en second | v1.2 (specs V1 + V1.1) |
| agent `veille-jurisprudence` | agent | validation par l'usage, pas par session persona | v1.2 (spec V1) |
| `consulter-digest` | skill | les deux personas | v1.2 (spec V1) |

La feature veille a un mode de validation distinct : un agent se valide par l'usage dans la durée, pas en une session persona. Elle peut donc tourner en tâche de fond pendant la fenêtre de test des personas et se valider en parallèle, sans occuper de session persona — c'est l'item le plus compatible avec le parallélisme.

## Ordre de construction

```
Tâche 0   Préliminaires
          - Ménage worktree + tag v1.2-base
          - Suppression du squelette hacienda-societes (commit dédié, non-additif) :
            retrait du dossier plugins/hacienda-societes/, retrait de l'entrée
            marketplace.json racine, mise à jour du test packages/core/test/
            hacienda-marketplace.test.ts, grep et correction des renvois.

Étape 1   Expansion partagée de clauses-sensibles-fr.md (15 → 30)
          Append de 15 clauses, priorité aux clauses typiques des CGV pour
          alimenter cgv-generator. Append pur — aucune clause existante modifiée.

Wave 1 — Skills de génération/conseil
  1.1  cgv-generator
  1.2  financement-startup

Wave 2 — Feature veille
  2.1  agent veille-jurisprudence
  2.2  consulter-digest

Tâche finale   Vérification périmètre + tests + CHANGELOG + handoff
```

`clauses-sensibles-fr.md` est étendu en Étape 1, avant `cgv-generator` qui le consomme — dépendance de séquencement (même logique que l'extension de `articles-c-civ-c-com-index.md` en Étape 1 de V1.1).

## Détail des composants

### Tâche 0 — Suppression de `hacienda-societes`

La décision de supprimer le squelette `hacienda-societes` a été prise (« chemin A ») et est débloquée : ses skills de remplacement ont été livrés en V1.1 (`constitution-societe`, `gouvernance-ag`, `pacte-associes-review`).

Opérations :
- Suppression du dossier `plugins/hacienda-societes/`.
- Retrait de l'entrée `hacienda-societes` dans `.claude-plugin/marketplace.json` (racine).
- Mise à jour de `packages/core/test/hacienda-marketplace.test.ts` (`expectedPlugins`).
- Grep de `hacienda-societes` dans tout le repo (notamment `references/taxonomie-contrats-fr.md`, les `CLAUDE.md` des plugins, la documentation) → corriger ou retirer les renvois.
- Vérification : `npm test` côté `packages/core` reste vert.

Cette tâche ne touche pas le plugin `hacienda-droit-affaires` — aucun impact sur les personas. Commit dédié.

### Étape 1 — Expansion `clauses-sensibles-fr.md` (15 → 30)

Append de 15 clauses, au format identique aux 15 clauses existantes (libellé typique à détecter / risque juridique / position playbook par posture / formulations alternatives / articles à vérifier). Priorité aux clauses typiques des CGV pour alimenter `cgv-generator` :

1. Réserve de propriété
2. Conditions de règlement et délais de paiement (L.441-10 C.com.)
3. Pénalités de retard et indemnité forfaitaire de recouvrement
4. Escompte pour paiement anticipé
5. Garantie légale de conformité / garantie des vices cachés
6. Garantie commerciale (distincte des garanties légales)
7. Clause de révision de prix
8. Clause de réserve (sur disponibilité, sur conditions)
9. Limitation de responsabilité spécifique aux CGV
10. Propriété intellectuelle dans les CGV
11. Données personnelles (renvoi `hacienda-ghost`)
12. Réclamation et délai de contestation
13. Transfert des risques
14. Clause de hardship / imprévision (1195 C.civ.)
15. Clause de non-sollicitation

Append pur — aucune clause existante n'est modifiée.

### Wave 1 — Skills de génération/conseil

#### `cgv-generator` — mode `--draft`

Skill purement générateur. La revue de CGV *existantes* relève de `reviser-contrat` (V1) — pas de mode `--review` ici, pour éviter le chevauchement.

Génère des CGV/CGU sous forme de **brouillon assisté `[review]`-tagué**, en couvrant les deux régimes. C'est un skill de génération — même profil de risque et même pattern que `constitution-societe` (V1.1) : chaque clause appelant un arbitrage est taguée `[review]` ; le livrable ne se présente jamais comme « prêt à publier ».

Le skill détecte ou demande le régime à l'intake (B2B / B2C / mixte) et applique le cadre correspondant :

**Régime B2B** (Code de commerce) :
- mentions obligatoires L.441-1 C.com. (communication des CGV, conditions de règlement, barème des prix unitaires, réductions de prix) ;
- plafond des délais de paiement L.441-10 C.com. (60 jours, ou 45 jours fin de mois) ;
- clauses abusives B2B (1171 C.civ., déséquilibre significatif L.442-1 C.com.).

**Régime B2C** (Code de la consommation) :
- information précontractuelle renforcée (L.111-1 C.conso.) ;
- droit de rétractation pour la vente à distance (L.221-18 C.conso. — 14 jours) ;
- clauses abusives consuméristes (L.212-1 C.conso., listes noire et grise R.212-1 / R.212-2) ;
- garantie légale de conformité consumériste (L.217-1 et s. C.conso.) ;
- médiation de la consommation (information obligatoire).

Pour un service mixte, le skill produit les deux jeux ou signale les divergences, selon l'intake.

Consomme `clauses-sensibles-fr.md` étendu, `articles-c-civ-c-com-index.md`, et la référence dédiée `regimes-cgv-cgu-fr.md` (structure et mentions obligatoires des deux régimes). Disclaimer renforcé : génération d'actes, validation avocat impérative — c'est le plancher de responsabilité, pas la mitigation (la mitigation est le brouillon `[review]`-tagué + `verifier-citations`). Validateur : l'un ou l'autre persona.

#### `financement-startup` — modes `--comparer` et `--review`

Conseille sur les instruments de financement de la startup : BSPCE, BSA, obligations convertibles (OC/OCA), augmentation de capital.

Mode `--comparer` : aide au choix de l'instrument selon le contexte (stade, profil des souscripteurs, objectifs).
Mode `--review` : revue d'une term sheet de levée de fonds.

Le skill **ne donne aucun conseil fiscal** : la dimension fiscale du BSPCE (art. 163 bis G CGI) est signalée et renvoyée à un conseil fiscal / expert-comptable.

**Cohabitation explicite avec `pacte-associes-review` (V1.1)** : `financement-startup` traite les *instruments* de financement ; il renvoie vers `pacte-associes-review` pour les *clauses de pacte* associées à une levée (liquidation preference, anti-dilution, clauses de gouvernance). Frontière nette : instruments vs clauses.

Ship avec une référence `instruments-financement-fr.md` (comparatif BSPCE / BSA / OC : nature, conditions d'attribution, dilution, points d'attention). Validateur : frère (M&A/financement) en premier, ami (sociétés) en second.

### Wave 2 — Feature veille

#### Agent `veille-jurisprudence` — cadence hebdomadaire

Surveille via `packages/core` :
- Légifrance — nouvelles lois, ordonnances, décrets touchant le droit des affaires ;
- Judilibre — arrêts récents de la Cour de cassation, chambre commerciale.

Produit un **digest hebdomadaire** écrit sur disque, structuré : nouvelles dispositions / impact pratique / action requise (mise à jour d'un playbook, information client, modification d'un modèle).

Format agent calqué sur les agents V1 : YAML codebase (`name`, `description`, `model: sonnet`, `tools: [...]`), sections de corps `## Objectif` / `## Cadence` / `## Sources` / `## Configuration` / `## Workflow` / `## Format digest` / `## Mode dégradé` / `## Ce que l'agent ne fait pas`.

Configuration utilisateur : domaines de pratique à surveiller, mots-clés. État persisté pour le calcul du delta hebdomadaire (pattern des agents BODACC V1). Aucun nouvel outil `packages/core` requis — les clients Légifrance et Judilibre existants supportent le filtrage par date.

L'agent opérationnalise le garde-fou « trigger fraîcheur » du `CLAUDE.md §4` : il produit un digest que les skills peuvent consulter pour vérifier les évolutions récentes.

**Évolution future (v1.3+)** : rendre les chambres surveillées configurables par l'utilisateur — la chambre sociale touche aussi le droit des affaires (non-concurrence salariée, transfert d'entreprise). V1.2 se limite à la chambre commerciale, mais la configuration de l'agent prévoit dès maintenant un champ `chambres` extensible (valeur par défaut : `commerciale`) pour que l'ajout de chambres soit non-bloquant plus tard.

#### `consulter-digest` — skill de lecture

Lit et présente le digest produit par l'agent `veille-jurisprudence`. Permet de filtrer le digest (par domaine de pratique, par date, par criticité d'impact). Format skill standard (frontmatter, disclaimer, examples, intake, étapes, sortie).

C'est la séparation décidée dès le premier brainstorm V1 : la veille est un agent (déclenché par cadence) ; le skill associé, distinct, est la lecture du digest.

## Références

| Fichier | Statut | Pour |
|---|---|---|
| `clauses-sensibles-fr.md` | Étendu (Étape 1, append) | `cgv-generator` + skills V1 existants |
| `regimes-cgv-cgu-fr.md` | Nouveau | `cgv-generator` — structure et mentions obligatoires des régimes B2B et B2C |
| `instruments-financement-fr.md` | Nouveau | `financement-startup` |

La feature veille ne reçoit pas de référence (l'agent produit un digest dynamique ; `consulter-digest` le lit).

## Format des composants

Tous les skills V1.2 suivent les patterns canoniques figés en V1/V1.1 : frontmatter YAML, bloc disclaimer en citation, 3-4 blocs `<example>`, `## Chargement du profil`, `## Intake` numérotée à modes, `## Étape N`, `## Sortie` (note du relecteur 5 champs en gras, arbre de décision 5 options dont option 4 « Surveiller et attendre », footer A PII en lien Markdown). Tags de provenance sans backticks en cellules ; article hors index → `[a verifier]`.

L'agent `veille-jurisprudence` suit le format agent V1 : YAML codebase + sections de corps standard.

## Tests

### Tests internes (solo, comme V1/V1.1)

| Composant | Test |
|---|---|
| Tâche 0 | `npm test` core reste vert ; `grep -r hacienda-societes` → 0 renvoi cassé |
| Étape 1 | `git diff` montre un append pur ; format des 15 nouvelles clauses identique aux 15 existantes |
| `cgv-generator` | Deux datasets — (a) CGV B2B pour une société de services → mentions L.441-1, plafond L.441-10, arbitrages `[review]` ; (b) CGU B2C pour une vente à distance → information précontractuelle, rétractation L.221-18, aucune clause en liste noire R.212-1. Livrable non « prêt à publier » dans les deux cas. |
| `financement-startup` | Dataset : term sheet de seed avec BSPCE → analyse des instruments correcte, renvoi vers `pacte-associes-review`, renvoi fiscal du BSPCE |
| `veille-jurisprudence` | Test : digest bien formé produit depuis des sources mock ; validation réelle par l'usage |
| `consulter-digest` | Test : lecture d'un digest échantillon, filtrage par domaine/date fonctionnel |

Chaque skill : tests de structure + `verifier-citations` post-flight + `check-pii` pré-flight intégrés.

### Validation personas (différée)

`cgv-generator` et `financement-startup` rejoignent la file de validation persona. La feature veille se valide par l'usage en parallèle (l'agent tourne en fond pendant la fenêtre de test des personas).

## Risques

### R1 — `cgv-generator` génère des actes sur deux régimes

Skill de génération couvrant B2B et B2C — risque juridique le plus élevé de V1.2. La couverture B2C élargit la surface : le régime consumériste est très réglementé (clauses abusives en listes noire/grise, droit de rétractation, garanties), et appliquer le mauvais régime à un public donné produit une faute.

Mitigation en couches (un disclaimer seul ne mitige rien) : (1) détection ou demande explicite du régime à l'intake ; (2) brouillon assisté `[review]`-tagué, jamais un document « prêt à publier » ; (3) plafonds L.441-10 et délai de rétractation L.221-18 vérifiés avec soin ; (4) `verifier-citations` post-flight ; (5) validation persona.

### R2 — `financement-startup` recouvre `pacte-associes-review` (V1.1)

Risque de chevauchement entre les deux skills.

Mitigation : frontière nette — `financement-startup` traite les instruments (BSPCE/BSA/OC), `pacte-associes-review` traite les clauses de pacte. Renvoi automatique explicite entre les deux.

### R3 — `financement-startup` touche au fiscal

La dimension fiscale du BSPCE (art. 163 bis G CGI) est hors du périmètre du plugin.

Mitigation : le skill ne donne aucun conseil fiscal — il signale la dimension fiscale et renvoie à un conseil fiscal / expert-comptable.

### R4 — `veille-jurisprudence` dépend des API Légifrance/Judilibre

Le monitoring dépend de la disponibilité des sources.

Mitigation : mode dégradé documenté ; état persisté pour le delta ; retry sans fail silencieux.

### R5 — V1.2 allonge la file de validation persona

Mitigation : la feature veille se valide par l'usage en parallèle, sans occuper de session persona. Les 2 skills de génération s'empilent derrière les personas — accepté.

## Hors scope V1.2 (explicite)

| Sujet | Statut |
|---|---|
| Workspaces de dossier | Chantier post-personas |
| Surveillance veille multi-chambres configurable (ch. sociale, etc.) | Évolution future v1.3+ — v1.2 limité à la ch. commerciale, champ `chambres` extensible prévu |
| Absorption du squelette `hacienda-contrats` (12 skills) | v2 |
| Inserts droit boursier (cibles cotées), connecteurs Drive/SharePoint/OneDrive | v2 |
| Nouvel outil `packages/core` | Hors scope |

## Acceptance Criteria

1. `hacienda-societes` supprimé proprement : dossier retiré, entrée `marketplace.json` retirée, test core `hacienda-marketplace` mis à jour, 0 renvoi cassé, `npm test` core vert.
2. `clauses-sensibles-fr.md` étendu de 15 à 30 clauses, append pur (aucune clause existante modifiée).
3. `cgv-generator` produit un brouillon `[review]`-tagué, jamais un document « prêt à publier » ; couvre le régime B2B (mentions L.441-1, plafonds L.441-10) et le régime B2C (information précontractuelle, rétractation L.221-18, clauses abusives consuméristes, garantie de conformité).
4. `financement-startup` renvoie correctement vers `pacte-associes-review` pour les clauses de pacte et signale la dimension fiscale du BSPCE.
5. L'agent `veille-jurisprudence` produit un digest hebdomadaire bien formé ; `consulter-digest` le lit et permet le filtrage.
6. Les 3 skills suivent le format canonique ; l'agent suit le format agent V1.
7. `verifier-citations` post-flight et `check-pii` pré-flight sont intégrés aux skills.
8. Périmètre additif vérifié `git diff --stat v1.2-base HEAD` côté `plugins/hacienda-droit-affaires/` ; la Tâche 0 (`hacienda-societes`) est isolée dans son commit dédié, hors plugin `droit-affaires`.
9. `npm test`, `npm run typecheck`, `npm run build`, `npm run branding:check`, `git diff --check` tous verts.
10. Chaque skill et l'agent sont commités complets — jamais de demi-composant sur `main`.

---

*Version 1.0 — spec V1.2 à valider avant écriture du plan d'implémentation.*
