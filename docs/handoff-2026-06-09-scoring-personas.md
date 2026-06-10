# Handoff — Scoring blind des 2 personas DA (2026-06-09)

> Contexte pour reprendre le travail dans une nouvelle session. Repo :
> `jamon8888/hacienda-juridique` (monorepo marketplace juridique Hacienda).
> Plugin concerné : `plugins/hacienda-droit-affaires` (DA).

## Ce qui a été fait cette session

**Objectif** : scorer en aveugle (sparring scoring blind, protocole 4 phases) tous
les skills des 2 personas du plugin DA, et corriger les skills là où un gate
CRITIQUE échouait.

**Résultat : 11 skills validés, tous gate-clean (RÉSERVES ou ADMIS).**

### Persona ami (procédures collectives) — 5 skills
| Skill | Score | Correctif |
|---|---|---|
| declaration-creance | RÉSERVES 0,85 (CBO94O) | D (chiffrage) — v0.2.0 |
| mise-en-demeure-commerciale | ADMIS 0,95 (FCQDWM) | E1 (garde-fou L.622-21 visible) — v0.2.0 |
| prevention-difficultes | RÉSERVES 0,87 (WVGUC1) | aucun (cycle 1) |
| declaration-creance --releve-forclusion | RÉSERVES 0,853 (Z1VBG3) | **M2** (passerelle L.641-3 LJ / L.631-14 RJ) |
| analyser-rupture-brutale | RÉSERVES 0,886 (Q5BO65) | aucun (cycle 1) |

### Persona frère (M&A trade) — 6 skills
| Skill | Score | Correctif |
|---|---|---|
| spa-review | RÉSERVES 0,974 (E1YT74) | G1 (earn-out 1591/1163, DD 1112-1/1130) + **G2** (CP 1304, leakage, formalités SAS/CSE/sanctions) + G3 (namespace PI) |
| gap-review | RÉSERVES 0,904 (SFZLV2) | H1 (dol 1130/1137/1104, reprise LPF L.176, ICPE L.171-8) |
| loi-term-sheet | RÉSERVES 0,90 (AMDZQA) | aucun (cycle 1) |
| due-diligence-dataroom | ADMIS 1,0 (ICOALK, Codex) | aucun |
| pacte-associes-review | ADMIS 1,0 (RLHOJQ) | L1 (léonine 1844-1 sur leaver) |
| closing-checklist-fr | RÉSERVES 0,95 (WK8LZM) | J1 (agrément nullité L.227-15, transfert L.228-1/L.211-17) |

## État Git / release

- **main** : à 0.4.0. **PR #49 ouverte** (mergeable) = bump **v0.5.0** « 2 personas complets ». **À merger.**
- Toutes les autres PR de la session sont mergées (#34→#48).
- Une fois #49 mergé → DA en **v0.5.0**.

## Acquis méthodologiques (importants, tracés dans la queue)

1. **La variance des scores vient de la GRILLE, pas du scoreur.** Démontré par
   l'expérience naturelle F4/F5/F6 : à grille fixe (F6, Codex), DeepSeek et Codex
   donnent le même score (0,95=0,95) ; quand les grilles diffèrent, gros écarts.
2. **Se fier aux GATES** (binaires, scoreur-indépendants), **se méfier des chiffres**,
   surtout les 1,0. Un cycle full-DeepSeek (F5) avait gonflé un 1,0 en masquant un
   vrai trou (gate C-009), démasqué par reconfirmation Codex puis fermé par L1.
3. **Pattern d'ancrage** : plusieurs skills captaient bien le risque mais ne
   citaient pas l'article primaire le plus tranchant → correctif ciblé = ajouter
   l'ancrage exact (G1/H1/J1/L1/M2). Spécifique aux skills concernés, PAS systémique.
4. **Garde-fou anti-contamination Phase 3** : une session d'exécution live peut
   lire `ground-truth.md` (le corrigé) → les prompts Phase 3 doivent **interdire
   explicitement** de lire le ground-truth.

## Workflow de scoring (rappel)

- Files de priorité : `docs/backlog/da-codex-scoring-queue.md` (ami) +
  `da-codex-scoring-queue-frere.md` (frère). Findings ouverts tracés dedans.
- Outils : `scripts/codex-blind-scoring.py` (phase2-criteria / phase4-criteria,
  génère des prompts à coller dans Codex) + `scripts/tiered_scoring.py` (agrégation).
- Cycle : Phase 2 (grille, Codex HIGH) → Phase 3 (exécution live, session Claude
  FRAÎCHE sans ground-truth) → Phase 4 (scoring, Codex medium) → agrégation.
- **Codex = scoreur de référence.** DeepSeek possible en substitut mais une grille
  DeepSeek peut être indulgente → reconfirmer au Codex avant claim.
- Avant chaque Phase 3 : `rsync -a --delete repo/skills/ cache/skills/`
  (`~/.claude/plugins/cache/hacienda-juridique/hacienda-droit-affaires/0.1.0/skills/`)
  pour que la session teste la version courante du skill.
- Les commandes scoring/agrégation sont lancées par **l'utilisateur** (économie de
  tokens) ; Claude génère les commandes et fait l'analyse.

## Reste à faire (non bloquant)

1. **Merger #49** (bump v0.5.0).
2. **Créer les slash-commands `commands/`** en namespace court `/h-da:` (22 skills)
   — délégué à Codex, prompt préparé en fin de session précédente (créer commands/,
   namespace court, MAJ README + test `hacienda-droit-affaires-cowork-structure.test.ts`).
   Aucun plugin n'a encore de `commands/` ; `/h-droit-affaires:` et `/h-pi:` sont des
   conventions de doc. Les skills s'activent par auto-activation (Cowork-ready ainsi).
3. **Findings de polish non gating** (optionnels, v0.5.x) : G4/C-035 (spa formalités
   closing), H2 (gap social/RGPD/procédure), I1 (loi confidentialité/info précontractuelle),
   J2 (closing formalité fiscale), K1 (dd agrégation/formalisme), résiduels ami
   (releve-forclusion C-013/C-016, rupture-brutale C-013/C-022, prevention C-008).
4. **Reconfirmation Codex optionnelle** : F4/F5 avaient une grille DeepSeek archivée
   (`ground-truth-deepseek.md`) — la grille officielle est Codex. Rien d'urgent.

## ➡️ Prochaine vague — décision de cadrage (2026-06-09)

Après brainstorming, deux chantiers décidés, en parallèle :

### Chantier A (prioritaire, dans la nouvelle conversation) — SPIKE distressed-M&A
Construire **un** nouveau cycle à l'**intersection M&A ↔ restructuring** (le *moat*
d'un cabinet M&A-restructuring ; aucun outil grand public ne le couvre ; relie les
2 personas déjà validés). Méthode : **brainstorming → design doc → build skill →
scoring blind** (mêmes Phases 2-4 Codex). Les 2 personas (frère M&A + ami
restructuring) servent de **validateurs métier**.

Candidats de cycle (à départager au brainstorming) :
| Candidat | Périmètre | Articles clés | Note |
|---|---|---|---|
| **Pre-pack cession** ⭐ | cession préparée en conciliation/mandat ad hoc puis adoptée en sauvegarde/RJ | L.611-x, L.628-x, L.642-2 | **Recommandé** : pont exact `prevention-difficultes` → `spa-review` (réutilise les 2 personas) |
| Reprise à la barre / plan de cession | offre de reprise d'une entreprise en RJ/LJ : périmètre, prix, emplois, contrats, sûretés, calendrier tribunal | L.642-1 et s., L.642-5 | Le plus iconique du distressed M&A FR |
| Cession d'actifs isolés en procédure | rachat fonds/IP/stocks à un débiteur en LJ, purge des sûretés | L.642-19 | Plus simple, plus fréquent |
| Asset vs share deal en distress | arbitrage structuration quand la cible est en difficulté | L.632-1 (période suspecte), responsabilité repreneur | Décision stratégique transverse |

→ **Démarrer la nouvelle conversation par le brainstorming de ce spike** (choisir le
candidat, scoper, design doc dans `docs/superpowers/specs/`, puis build + score).
Reco de départ : **pre-pack cession**.

### Chantier B (parallèle, délégué à Codex) — complétude
Scorer en aveugle les **6 skills de fond non couverts** (droit des affaires
général, non différenciants mais pour un plugin 100 % validé) :
`reviser-contrat`, `reviser-nda`, `constitution-societe`, `gouvernance-ag`,
`financement-startup`, `cgv-generator`. Même workflow (scénario blind → Phase 2
grille Codex → Phase 3 session fraîche → Phase 4 score → agrégation). Les 6 skills
outils/composants (`check-pii`, `verifier-citations`, `entretien-demarrage`,
`consulter-digest`, `liste-de-points`, `revue-tabulaire`) ne nécessitent pas de
scoring doctrinal (infrastructure).

## Conventions / pièges

- Briefs personas (`docs/personas/*-test-brief.md`) = docs pour testeurs **humains**,
  distincts du scoring IA. Pas besoin de MAJ pour la release.
- PR frère/ami : **cibler `main` directement**, jamais empiler sur une branche feature
  (un empilement a causé un merge bloqué — F3/#38).
- Le shell du repo a `set -e` : un `grep -c` qui renvoie 0 (exit 1) coupe un compound.
  Préférer des commandes séparées.
- Test `cowork-structure` : exclut `tests/datasets` du lint des renvois ; vérifie
  README contient `/h-droit-affaires:<skill>` + compteur skills (22).
