# Reprise à la barre / plan de cession (DA) — Design doc

> Spike distressed-M&A #2, suite du Chantier A. Repo : `jamon8888/hacienda-juridique`.
> Plugin : `plugins/hacienda-droit-affaires` (DA). Skill : `reprise-a-la-barre`.
> Handoff de référence : `docs/handoff/handoff-2026-06-11-chantier-a-pre-pack.md`.

## 1. Objectif

Livrer le skill `reprise-a-la-barre` : un **playbook tactique côté candidat-repreneur**
pour construire, optimiser et défendre une **offre de reprise gagnante** sur une
entreprise **déjà placée en redressement ou liquidation judiciaire**, dans le cadre
d'un **appel d'offres ouvert** mené par l'administrateur. Élargit le *moat*
distressed-M&A à l'intersection M&A ↔ restructuring. Validé **gate-clean** par
scoring blind 4 phases, bump DA en **v0.7.0**.

## 2. Frontière anti-chevauchement avec `pre-pack-cession` (point critique)

Le handoff alertait sur le risque de chevauchement : `pre-pack-cession` *cite* déjà
toute la famille L.642 (L.642-1/2/3/5/7/11/12, L.661-6). La différenciation **ne
porte pas sur les articles** (même famille) mais sur **le point d'entrée, le côté et
la profondeur**.

| Axe | `pre-pack-cession` (existant) | `reprise-a-la-barre` (nouveau) |
|---|---|---|
| Scénario d'entrée | cession **préparée confidentiellement** *avant* la procédure (mandat ad hoc / conciliation, L.611-x) | cible **déjà en RJ/LJ**, administrateur a lancé un **appel d'offres ouvert** (souvent contesté, plusieurs candidats) |
| Question traitée | « peut-on / doit-on préparer, et via quel véhicule ? » (cadrage stratégique amont) | « je suis candidat-repreneur — **construis et optimise mon offre gagnante** » (playbook tactique aval) |
| Côté | side-aware (débiteur / repreneur) | **repreneur uniquement** |
| Traitement de L.642 | *cite* les articles en cadrage | les **opère** ligne par ligne (construction, scoring, recours) |
| Double gate | CP±45 j (véhicule) + faisabilité pre-pack (4 kill-switches) | porte d'entrée (procédure ouverte) + recevabilité de l'offre |

**Garantie de non-chevauchement = Gate 1 (porte d'entrée).** Si la cession peut
encore être préparée confidentiellement (aucune procédure collective ouverte, ou
seulement mandat ad hoc / conciliation) → **STOP + renvoi `pre-pack-cession`**. Ce
skill ne démarre que sur une **procédure déjà ouverte avec appel d'offres**.
Symétriquement, `pre-pack-cession` renvoie déjà l'acte de cession aval vers
`spa-review` / `gap-review` / `closing-checklist-fr` — `reprise-a-la-barre` fait de
même (il ne rédige pas l'acte de cession ni le SPA).

## 3. Livrable — note tactique repreneur (mode unique)

Format à 4 blocs, côté repreneur, miroir tactique du livrable pre-pack :

```markdown
# Reprise à la barre — note tactique [CÔTÉ repreneur]

## 1. Diagnostic & recevabilité
- Cible en RJ/LJ confirmée (lookup BODACC) · administrateur désigné · calendrier
  d'audience / date limite de dépôt des offres.
- Éligibilité du candidat (L.642-3) : dirigeant / parent / interposition prohibée ?
- Nature de l'offre exigée : offre **ferme et écrite** (L.642-2), pas une LOI.

## 2. Construction de l'offre (mentions L.642-2)
- Périmètre des actifs · contrats repris **désignés** (L.642-7) · prix & affectation
  · financement · **emplois maintenus** · garanties d'exécution · date de réalisation.
- Activité **autonome** (L.642-1) — pas de cherry-picking vidant l'activité.

## 3. Optimisation vs critères du tribunal (L.642-5)
- Scoring sur les 3 axes : pérennité de l'emploi · apurement du passif · garanties
  d'exécution.
- Positionnement vs offres concurrentes · surenchère · points faibles à couvrir.

## 4. Risques & suites
- Sort des sûretés / quote-part du prix (L.642-12) · inexécution / résolution du
  plan de cession (L.642-11) · voies de recours (L.661-6) — la sienne *et* celles
  des candidats évincés.
- Renvois : amont `pre-pack-cession` (si finalement préparable) ; aval
  `spa-review` / `gap-review` / `closing-checklist-fr`.
```

## 4. Gates scorés (cœur doctrinal)

- **Gate 1 — porte d'entrée (anti-chevauchement + anti-erreur de véhicule).** La
  cible est-elle déjà en RJ/LJ avec appel d'offres ouvert ? Sinon → renvoi
  `pre-pack-cession`. Vérifié par lookup BODACC (procédure ouverte, administrateur,
  dates).
- **Gate 2 — recevabilité CRITIQUE de l'offre.**
  - (a) **Éligibilité L.642-3** : dirigeants, parents et alliés jusqu'au 2nd degré,
    interposition de personne sont **interdits d'acquérir** → offre **nulle**. C'est
    l'erreur qui trompe le client (gate-piège type, cf. [[feedback-gate-calibration-scoring]]).
  - (b) **Offre ferme & écrite L.642-2** : une LOI / lettre d'intention indicative
    est **irrecevable** comme offre judiciaire ; l'offre déposée est **irrévocable**.

Calibration : Gate 1 + Gate 2 sont les critères CRITIQUE binaires (trigger FAIL
lisible). Le reste (mentions L.642-2 détaillées, optimisation L.642-5, recours
L.661-6) relève des MAJEUR.

## 5. Workflow (6 étapes, moule V2)

1. **Étape 1 — Pré-flight + Gate 1.** Lookup BODACC (`bodacc_procedures` /
   `bodacc_by_siren` / `company_full_profile`) : procédure ouverte ? type (RJ/LJ),
   administrateur, calendrier. Si cession encore préparable confidentiellement →
   renvoi `pre-pack-cession`.
2. **Étape 2 — Gate 2 recevabilité.** Éligibilité L.642-3 (interdictions /
   interposition) puis offre ferme & écrite L.642-2 (vs LOI). Si inéligible → STOP.
3. **Étape 3 — Construction de l'offre.** Mentions L.642-2, contrats à reprendre
   désignés L.642-7, périmètre activité autonome L.642-1.
4. **Étape 4 — Optimisation vs L.642-5.** Scoring sur les 3 critères + mise en
   concurrence / surenchère / positionnement vs offres rivales.
5. **Étape 5 — Risques post-arrêté.** Sûretés L.642-12, inexécution/résolution
   L.642-11, voies de recours L.661-6 (sienne et des évincés).
6. **Étape 6 — Post-flight `verifier-citations`.**

## 6. Conventions skill V2 (test `cowork-structure`)

- Frontmatter : `name: reprise-a-la-barre`, `version: "2.0.0"`, `argument-hint:`,
  `authors`, `tags`. Headings dans l'ordre canonique : Examples / Chargement du
  profil / Intake / Gate non-juriste / Outils MCP à privilégier / Emplacement des
  sorties / Sortie (+ Étapes / Ce skill ne fait pas / Ton).
- Bloc MCP : noms exacts (`piste_status`, `legifrance_recherche`,
  `judilibre_recherche`, `eurlex_recherche`, + `bodacc_procedures`, `bodacc_by_siren`,
  `company_full_profile`). Renvois PI au namespace `/h-pi:`. Jamais
  `/hacienda-droit-affaires:`.
- Wrapper `commands/h-da/reprise-a-la-barre.md` (description + argument-hint
  identiques au SKILL.md) + entrée README `/h-da:reprise-a-la-barre` + **count
  hardcodé 23 → 24** dans le test (`toBe(24)`).
- Bump version dans **les 5 fichiers** (version.json, manifest.json,
  mcp-server/package.json, .claude-plugin/plugin.json, .claude-plugin/marketplace.json) :
  **0.6.0 → 0.7.0**. Pas auto-propagé.

## 7. Validation — scoring blind 4 phases

Workflow `bash scripts/da-scoring.sh <phase> reprise-a-la-barre` (pbcopy auto).
**Ajouter d'abord le skill** aux 5 fonctions + array du wrapper (bloc « POUR AJOUTER
UN SKILL »). Protocole :

- **Phase 1** — scénario fictif neutre (cible en RJ/LJ, appel d'offres ouvert,
  éléments piégeux : repreneur potentiellement inéligible L.642-3, LOI vs offre
  ferme, offre concurrente, sûretés, cherry-picking).
- **Phase 2** — ground-truth (grille Codex HIGH, sans SKILL.md) : critères atomiques
  tiered-gated, gates CRITIQUE = L.642-3 éligibilité + L.642-2 offre ferme + porte
  d'entrée.
- **Phase 3** — exécution live (session Claude FRAÎCHE, sans ground-truth ;
  `phase3-resync` avant).
- **Phase 4** — scoring (Codex medium, sans SKILL.md) → `aggregate`.

Décision **gate-driven, pas chiffre** : `gate_failures: []` = feu vert. INSUFFISANT/
RÉSERVES sans gate → enrichir les MAJEUR. Si un gate tombe → ancrage de l'article
tranchant + reboucle (nouveau `CODE`).

**Économie tokens** : Candy lance les commandes scoring (crédits Codex abondants,
Opus rare) ; Claude génère les prompts et fait l'analyse gate-driven. Cf.
[[feedback-token-economy-codex]] et [[feedback-scoring-wrapper-workflow]].

## 8. Hors périmètre (YAGNI)

- Ne **rédige pas** l'acte de cession ni le SPA (→ `spa-review` / `gap-review` /
  `closing-checklist-fr`).
- Ne traite pas le **montage amont** confidentiel (→ `pre-pack-cession`).
- Pas de mode `--review` en v1 (note tactique mode unique, comme pre-pack v1).
- Pas de cession d'actifs isolés L.642-19 ni d'arbitrage asset/share (cycles
  distincts éventuels, hors scope).
- Seuils / délais procéduraux post-réformes : `[à vérifier]`.
