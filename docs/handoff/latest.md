# Handoff — état courant (entrée de session)

**Dernière mise à jour :** 2026-07-03
**Branche de travail :** `main`, à jour avec `origin/main` (`14a5f3e`). Aucune branche
en attente — les deux branches doc (`docs/hygiene-continuation-followthrough`,
`docs/da-early-user-doc`) ont été mergées et supprimées.

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
- **Fix méthodo transversal** (templates Codex Phase 2, règle 6) : les critères de date
  visent désormais les seuls jalons deal (jamais l'en-tête loi 1971 ni le footer
  « Date d'analyse ») ; les critères de provenance exemptent l'index pré-vérifié
  `[Légifrance]` du skill. Corrige un faux FAIL systématique applicable à toute
  notation DA future — mémoire `feedback_blind_conformance_rubric` étendue.
Détail : [`handoff-2026-07-03-dd-pe-red-flags.md`](handoff-2026-07-03-dd-pe-red-flags.md).

**PE restant (landscape [`da-pe-landscape-fr-v2-pratique.md`](../backlog/da-pe-landscape-fr-v2-pratique.md)) :**
- `#7 fonds-pe-fr-triage` — 20-30 %, **explicitement différé** (« à différer si cible
  produit = M&A sponsor » — AMF/fiscal lourds, pratique fonds distincte de la
  spécialisation M&A PE). Rien d'autre n'est ouvert côté PE : le parcours deal sponsor
  est fini.

### Sortie persona — CLOS : doc early-user + agents vérifiés + briefs à jour (2026-07-02/03)
Premier tour de préparation à la sortie pour les testeurs personas (ami / frère).
**Les 4 items ouverts en fin de session sont maintenant tous fermés**, sauf le wording
ghost.

- **Doc produit** : [`plugins/hacienda-droit-affaires/README_UTILISATEUR.md`](../../plugins/hacienda-droit-affaires/README_UTILISATEUR.md)
  — accueil (triptyque ancré FR / confidentiel / honnête) + install Cowork + palette
  situation-first en 4 blocs (vie sociale / deal M&A / difficulté / quotidien) +
  **section E « Surveillance en continu »** (les 4 agents, réintroduits une fois
  vérifiés — voir ci-dessous). Design : [`docs/superpowers/specs/2026-06-30-da-early-user-doc-design.md`](../superpowers/specs/2026-06-30-da-early-user-doc-design.md).
- **Agents DA vérifiés end-to-end** (commits `f89cc04`, `ce3718c`) : les 4 agents
  (`bodacc-watcher`, `bodacc-procedures-watcher`, `echeances-societaires`,
  `veille-jurisprudence`) déclaraient leurs tools MCP en wildcard `mcp__*__<tool>` —
  jamais résolu en pratique. Corrigé au préfixe concret
  `mcp__plugin_hacienda-droit-affaires_Hacienda_Droit_des_Affaires__<tool>` (règle de
  normalisation de la clé `.mcp.json` : espaces → underscore, casse conservée).
  `veille-jurisprudence` déclarait aussi des noms de tools inexistants
  (`legifrance_search`/`judilibre_search`) → corrigés en
  `legifrance_recherche`/`judilibre_recherche`. **3 agents BODACC vérifiés à 100 %**
  (noms + préfixe + invocation réelle testée sur SIREN Danone 552032534).
  `veille-jurisprudence` a noms + préfixe vérifiés mais pas d'invocation réelle
  (nécessite credentials PISTE/Judilibre, indépendant du câblage). Détail mémoire :
  `project_da_agents_mcp_prefix`.
- **Follow-through de l'arbre de décision — vérifié opérationnel** (question ouverte
  depuis longtemps) : après qu'un utilisateur choisit une option du bloc « Que veux-tu
  faire ? », la continuation tient les contrats du plugin **sur le fond**. Smoke test
  live sur triplet représentatif + audit Codex blind medium → déficit d'hygiène de
  forme identifié et **corrigé** : règle « Hygiène de continuation » dans le CLAUDE.md
  des deux plugins (DA + PI, commit `f3e9a0d`, mergé).
- **Bug préfixe de commande corrigé** (`14a5f3e`) : 119 occurrences résiduelles de
  l'ancien préfixe `/h-droit-affaires:` (sans rapport avec `commands/h-da/`, seul
  dossier réel) remplacées par `/h-da:` dans 25 fichiers (skills, agents, commands).
  `tests/datasets/` (preuve figée) et `CHANGELOG.md` (mention historique légitime)
  non touchés.
- **Briefs personas rafraîchis** (`docs/personas/ami-test-brief.md`,
  `frere-test-brief.md`) : compteur 19→32, préfixe corrigé, moat distressed-M&A et
  chaîne PE mentionnés en opportuniste, compteur de tools BODACC corrigé (3→2, seuls
  `bodacc_by_siren`/`bodacc_procedures` sont réellement consommés par l'agent),
  renvoi vers le README_UTILISATEUR pour la palette complète.

**Seul reste ouvert :**
- **Ghost wording** — `README_UTILISATEUR.md:205` porte encore un `[review]` HTML sur
  le statut de `hacienda-ghost` (à venir / bêta / optionnel). **À caler par Candy**
  avant diffusion aux testeurs — ghost n'est pas encore tout à fait prêt.

### Méthodologie scoring blind — durcie + harmonisée (PR #67, antérieur)
Fix scorer Phase 4 (clé `preuve` obligatoire + persistée, densité bornée 20-30),
corpus méthodo harmonisé (criteria atomiques tiered-gated = canonique release). Docs :
[`sparring-scoring-protocol.md`](../methodology/sparring-scoring-protocol.md),
[`codex-prompt-templates.md`](../methodology/codex-prompt-templates.md),
[`explication-scoring-2niveaux.md`](../methodology/explication-scoring-2niveaux.md)
(scoring blind expliqué à 2 niveaux — expert + vulgarisation, versions orales 3 phrases).

## Ouvert / prochaines pistes

- **Ghost wording** (voir ci-dessus) — seul blocage restant avant diffusion des briefs
  personas aux testeurs.
- **PE différé — `fonds-pe-fr-triage` (#7)** : pratique fonds FR distincte
  (FPCI/FCPR/SLP), AMF/fiscal plus lourds. 20-30 % de couverture. À lancer seulement si
  Hacienda veut couvrir les équipes funds — pas un prérequis de sortie.
- **`d2-v2`** : migrer le launchpad PI D.2 vers criteria tiered-gated — backlog
  [`d2-launchpad-v2-migration.md`](../backlog/d2-launchpad-v2-migration.md).
- **Revue Anno Desktop** : §10 du CLAUDE.md plugin DA, session dédiée (non urgent).

## Intendance

- **Ghost wording** — voir ci-dessus, seul item d'intendance encore ouvert de cette
  session.
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
  provenance des dates), exempter le mode silencieux non-juriste des tags `[review]` inline,
  et pour les critères de date/provenance sur grille dense : cibler les seuls jalons deal
  (jamais l'en-tête loi 1971 ni le footer « Date d'analyse »), exempter l'index pré-vérifié
  `[Légifrance]` du skill.
- **Candy pilote les runs Codex** (token economy) ; le ménage git trivial aussi.
