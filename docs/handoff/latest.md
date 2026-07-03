# Handoff — état courant (entrée de session)

**Dernière mise à jour :** 2026-07-03
**Branche de travail :** aucune — `feat/da-dd-pe-red-flags` **mergée** (PR #68,
commit `1de91a9`). En attente : `docs/da-early-user-doc` et
`docs/hygiene-continuation-followthrough` (poussées, non mergées, pas de PR ouverte).
`main` est à jour (post-#66/#67/#68).

> Ce fichier est le **point d'entrée** d'une nouvelle session : où on en est, ce qui est ouvert,
> où regarder. Les handoffs datés (`docs/handoff/handoff-YYYY-MM-DD-*.md`) restent les
> enregistrements détaillés par chantier.

---

## Où on en est

### Vague PE — Droit des affaires : parcours deal sponsor COMPLET et MERGÉ (2026-07-03)
La chaîne du deal PE est **livrée de bout en bout** (côté sponsor, jambe FR) :
**DD red flags** → pacte → SPA/GAP → closing → management package. 5 modes `--pe` +
skill `management-package-pe`. Compte skills DA : **32**. Version plugin : **0.20.0**.

**Candidat #6 (dernier du parcours), mergé** : mode `due-diligence-dataroom --pe`
(alias `--mode=pe-red-flags`) — chaque finding matériel converti en **traitement deal**
(CP / GAP / specific indemnity / couverture W&I / price chip jamais chiffré / Q&A),
red flag report partner-ready, axes D1–D5, module frère
`references/pe-dd-red-flags-overlay-fr.md`. **PR #68 mergée** (commit `1de91a9`).
- **Scoring `DDRPE1` : gate-clean** (6/6 CRITIQUE PASS). Score brut 0,49 (grille dense,
  27 critères) → ~0,87 ajusté après spot-check (3 faux FAIL de forme + 2 sur-exigences
  de routage vers `gap-review --pe`). Décision release sur gate-clean, cohérente avec
  la doctrine SPAPE/CLOPE. Dataset versionné (`tests/datasets/da-due-diligence-pe/`).
- **Module enrichi post-scoring** (découplé du rescore) : D3 cash pooling précise 3
  actions de dénouement distinctes (arrêt sweeps + solde, révocation des mandats de
  nivellement, vérification des conditions juridiques intragroupe) ; D4 ajoute plan de
  transition/rétention + décision sponsor sur l'écart homme-clé.
- **Fix méthodo transversal** (templates Codex Phase 2, règle 6) : les critères de date
  visent désormais les seuls jalons deal (jamais l'en-tête loi 1971 ni le footer
  « Date d'analyse ») ; les critères de provenance exemptent l'index pré-vérifié
  `[Légifrance]` du skill. Corrige un faux FAIL systématique applicable à toute
  notation DA future — mémoire `feedback_blind_conformance_rubric` étendue.
Détail : [`handoff-2026-07-03-dd-pe-red-flags.md`](handoff-2026-07-03-dd-pe-red-flags.md)
(⚠️ écrit avant le scoring/merge — état dépassé sur ces deux points, voir ici pour l'état à jour).

**PE restant (landscape [`da-pe-landscape-fr-v2-pratique.md`](../backlog/da-pe-landscape-fr-v2-pratique.md)) :**
- `#7 fonds-pe-fr-triage` — 20-30 %, **explicitement différé** dans le landscape (« à différer si cible produit = M&A sponsor » — AMF/fiscal lourds, pratique fonds distincte de la spécialisation M&A PE).

### Follow-through de l'arbre de décision — vérifié opérationnel (2026-07-02)
Question ouverte depuis longtemps : après qu'un utilisateur choisit une option du bloc
« Que veux-tu faire ? » (rédiger / escalader / compléter / surveiller), la continuation
tient-elle les contrats du plugin ? **Réponse : oui sur le fond**, avec un déficit
d'hygiène de forme identifié et corrigé.
- Smoke test live sur triplet représentatif (`constitution-societe`, `reviser-contrat`,
  `distress-cedant`) : bifurcation, ventilation par destinataire, pivot 45 jours et
  routage tous tenus sur la continuation.
- Audit Codex blind medium (conformité, pas scoring dataset) : 8 FAIL bruts → triés à
  ~4 réels après spot-check (3 faux liés au setup de la rubrique, pas au skill).
- **Fix appliqué** : règle « Hygiène de continuation » ajoutée au CLAUDE.md des deux
  plugins (DA + PI) — note du relecteur par branche, statut brouillon, renvois hors
  corps, re-signalement de l'état dégradé. Branche
  [`docs/hygiene-continuation-followthrough`](../../plugins/hacienda-droit-affaires/CLAUDE.md)
  (1 commit `f3e9a0d`), poussée, **non mergée**.
- Leçon méthodo réutilisable sauvée en mémoire (`feedback_blind_conformance_rubric`) :
  joindre les scénarios à Codex pour la provenance des dates, exempter le mode
  silencieux non-juriste des tags `[review]` inline.

### Sortie persona — doc early-user + refresh des briefs (2026-07-02)
Premier tour de préparation à la sortie pour les testeurs personas (ami / frère).
- **Design brainstormé** puis spec écrite : [`docs/superpowers/specs/2026-06-30-da-early-user-doc-design.md`](../superpowers/specs/2026-06-30-da-early-user-doc-design.md).
  Principe directeur : palette **situation-first** (« j'ai un dossier de… »), pas
  catalogue de features — différenciation vs Harvey/Legora/claude-for-legal/Luminance
  qui entrent par la capacité. Le champ « et ensuite » rend visible le chaînage
  inter-skills (le moat).
- **Doc produit** : [`plugins/hacienda-droit-affaires/README_UTILISATEUR.md`](../../plugins/hacienda-droit-affaires/README_UTILISATEUR.md)
  — accueil (triptyque ancré FR / confidentiel / honnête) + install Cowork (flow
  officiel vérifié : Personnaliser → Parcourir les plugins → fichier `.plugin`) +
  palette en 4 blocs (vie sociale / deal M&A / difficulté / quotidien).
  - Corrigé en revue : citations élargies au-delà de C.com./C.civ. (consommation,
    travail L.1224-1, monétaire et financier — les codes réellement mobilisés par les
    skills).
  - Section agents de veille **retirée** : aucun des 4 agents (`bodacc-procedures-watcher`,
    `bodacc-watcher`, `echeances-societaires`, `veille-jurisprudence`) n'a de trace de
    test vérifiée ; `veille-jurisprudence` a un préfixe MCP wildcard non confirmé
    (note « Wave 6 »). Advertir une capacité non vérifiée contredit le pilier honnêteté.
  - **Reste `[review]` : wording du statut ghost** (à venir / bêta / optionnel) —
    à caler par Candy, ghost n'est pas encore tout à fait prêt.
- **Briefs personas rafraîchis** (`docs/personas/ami-test-brief.md`,
  `frere-test-brief.md`) : compteur 19→32, préfixe de commande corrigé
  `/h-droit-affaires:` → `/h-da:` (bug réel — seul `/h-da:` existe sous `commands/`),
  moat distressed-M&A et chaîne PE mentionnés en opportuniste, renvoi vers le nouveau
  README_UTILISATEUR pour la palette complète.
- Branche [`docs/da-early-user-doc`](https://github.com/jamon8888/hacienda-juridique/pull/new/docs/da-early-user-doc)
  (commits `9598ae1`, `5ad96e6`, `a188486` + `88c46d3` doc méthodo scoring 2-niveaux
  ajouté par Candy en parallèle sur cette même branche), poussée, **non mergée**.

### Tâche en fond — vérification des 4 agents DA (en cours, à finaliser plus tard)
Spawned `task_2499f66c` : vérifier branchement MCP + run à blanc des 4 agents avant de
les réintroduire dans le README_UTILISATEUR. Point connu à corriger si confirmé cassé :
préfixe wildcard `mcp__*__` non validé sur `veille-jurisprudence`. **Candy finalise
cette tâche dans une session séparée — statut à vérifier au retour.**

### Méthodologie scoring blind — durcie + harmonisée (PR #67, antérieur)
Fix scorer Phase 4 (clé `preuve` obligatoire + persistée, densité bornée 20-30),
corpus méthodo harmonisé (criteria atomiques tiered-gated = canonique release). Docs :
[`sparring-scoring-protocol.md`](../methodology/sparring-scoring-protocol.md),
[`codex-prompt-templates.md`](../methodology/codex-prompt-templates.md). Nouvel ajout
(88c46d3) : [`explication-scoring-2niveaux.md`](../methodology/explication-scoring-2niveaux.md)
— scoring blind expliqué à 2 niveaux (expert + vulgarisation, versions orales 3 phrases).

## Ouvert / prochaines pistes

- **PE différé plus loin — `fonds-pe-fr-triage` (#7)** : pratique fonds FR distincte
  (FPCI/FCPR/SLP), AMF/fiscal plus lourds. Vient après #6, si Hacienda veut couvrir les
  équipes funds. 20-30 % de couverture.
- **Merger ou PR les deux branches en attente** — `docs/hygiene-continuation-followthrough`
  et `docs/da-early-user-doc` sont poussées mais aucune PR n'a été ouverte. À faire
  quand Candy valide.
- **`d2-v2`** : migrer le launchpad PI D.2 vers criteria tiered-gated — backlog
  [`d2-launchpad-v2-migration.md`](../backlog/d2-launchpad-v2-migration.md).
- **Revue Anno Desktop** : §10 du CLAUDE.md plugin DA, session dédiée (non urgent).

## Intendance

- **Ghost wording** — le README_UTILISATEUR a un `[review]` HTML en attente sur le
  statut de `hacienda-ghost` ; à combler avant diffusion aux testeurs.
- **Bug préfixe `/h-droit-affaires:` → `/h-da:`** corrigé dans les 2 briefs personas,
  mais **103 occurrences résiduelles** de `/h-droit-affaires:` dans les SKILL.md
  eux-mêmes (renvois internes périmés) — pas touché, hors périmètre de cette session,
  signalé pour un futur nettoyage.
- Stash restante `stash@{0}` = ancienne `feat/da-pre-pack-cession` (2026-06-11), sans rapport.
- **GitNexus index stale** (`npx gitnexus analyze` quand pratique) — bruit récurrent, non bloquant.

## Réflexes scoring (mémoire)

- Lire le **rapport backlog** `docs/backlog/da-scoring-<skill>-<CODE>.md` (raisonnement par critère),
  pas le seul JSON verdicts.
- **Code de cycle = 6 caractères** stricts (garde fail-fast dans `da-scoring.sh`).
- **Gate-piège ≠ recall** ; **release sur gate-clean** (le score chiffré est un artefact sur grille
  dense) ; spot-checker les FAIL contre le live avant de conclure à un déficit.
- **Module depth ≠ live depth** : pour bouger un gate de danger → `SKILL.md` ; profondeur → borner la
  grille (enrichir le module ne remonte pas dans le brouillon live).
- **Audit de conformité (≠ scoring dataset)** : joindre les scénarios à Codex (sinon faux FAIL sur
  provenance des dates), exempter le mode silencieux non-juriste des tags `[review]` inline.
- **Candy pilote les runs Codex** (token economy) ; le ménage git trivial aussi.
