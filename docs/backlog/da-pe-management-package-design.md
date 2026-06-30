# Design — skill `management-package-pe` (DA, candidat PE #5)

**Date :** 2026-06-30
**Plugin :** hacienda-droit-affaires
**Type :** **skill neuf** (premier de la vague PE — les 4 précédents étaient des modes `--pe`).
**Statut :** design validé (brainstorming), spec à valider avant plan d'implémentation.
**Branche :** `feat/da-pe-management-package` (depuis `main` post-#65).

---

## 0. Contexte & position dans la chaîne PE

La vague PE a livré 4 overlays `--pe` (modes side-aware sur skills existants), tous mergés :
`pacte-associes-review --pe` → `spa-review --pe` / `gap-review --pe` → `closing-checklist-fr --pe`.
Chaîne du deal : pacte → SPA/GAP → closing/funds flow.

`management-package-pe` est le **candidat #5** de la short-list
([`da-pe-landscape-fr-v2-pratique.md`](da-pe-landscape-fr-v2-pratique.md) §4 #5, §synthèse #5).
C'est le **plus risqué** : skill neuf, orchestrateur, avec le **danger fiscal/social** comme
ligne rouge. La spec est ferme : « à lancer **avec garde-fous fiscal/social verrouillés** avant
toute analyse de fond ».

**Pourquoi un skill neuf et pas un mode :** le management package est un *sujet* transverse (il
traverse subscription, pacte, promesses, rollover/SPA, employment) — il n'a pas de skill hôte
naturel unique. La décision spec (§2.7) est : **skill neuf orchestrateur** des skills existants.

## 1. Périmètre du premier jet (validé)

**Cartographie + question-list — zéro avis de fond.** C'est la voie « sûre » de la spec (§3 rang 2 :
« L'IA peut **cartographier** les documents, **nommer** les economics et produire une **liste de
questions** fiscal/social **sans donner d'avis** »).

Le périmètre choisi **rend structurellement impossible** un avis de fond : c'est le garde-fou
lui-même, pas un disclaimer ajouté. Le skill :
- **cartographie** les documents du package et le « qui signe quoi » ;
- **nomme et explique** les instruments et economics (sans jamais valoriser/chiffrer) ;
- **nomme** les mécaniques leaver/vesting et **signale** le pattern confiscatoire connu ;
- **produit une question-list fiscal/social** structurée à renvoyer au spécialiste ;
- **renvoie** la revue clause-par-clause et le travail de fond aux skills frères.

Hors périmètre (« Ce skill ne fait pas ») : valorisation/chiffrage des economics ; traitement
fiscal/social (requalification, calcul de cotisations, régime PV vs salaire) ; revue
clause-par-clause des clauses leaver/vesting (→ `pacte --pe`) ; instruments de droit luxembourgeois.

## 2. Architecture (isomorphe aux modules PE frères)

- `skills/management-package-pe/SKILL.md` — skill autonome. Intake `--side=sponsor|manager`,
  gate France/Lux, 5 axes M1–M5, section « Ce skill ne fait pas », Ton. Version **1.0.0**.
- `references/management-package-pe-fr.md` — module doctrine (axes M1–M5, side-aware). **Référence**
  `pe-overlay-fr.md` pour le **gate France/Lux**, le **glossaire PE** et l'**anti-fabrication PE**
  (lus tels quels — **zéro édition de la doctrine ADMIS**, comme `pe-closing-overlay-fr.md` et
  `pe-spa-gap-overlay-fr.md`).
- **Orchestrateur léger** : ne refait pas le travail des frères, il cartographie + renvoie vers
  `pacte-associes-review --pe` (clauses leaver/vesting/précédence), `spa-review --pe` (rollover),
  `financement-startup` (instruments BSA/BSPCE/AGA/OC), `closing-checklist-fr --pe` (funds flow
  rollover day-1).

**Compte de skills : 31 → 32** (premier skill neuf de la vague). Impacts release au §4.

## 3. Doctrine — 5 axes side-aware (sponsor | manager), miroir des L1–L5 closing

Cartographie **identique** quel que soit le side ; **question-list et points d'attention orientés**.

- **M1 — Cartographie du package & « qui signe quoi »** ⭐
  Recense subscription agreement, pacte d'investissement / management, promesses croisées put/call,
  terms des instruments, employment/mandat social, side rollover/SPA. Matrice signataires (un
  manager signe souvent 4-5 documents). Précédence inter-documents **signalée** (renvoi `pacte --pe`
  pour la matrice fine de précédence).

- **M2 — Instruments & economics : nommer + expliquer, jamais valoriser**
  Nomme les instruments (sweet equity, ordinary shares, ADP, BSA, BSPCE, AGA, options, OC/OCA
  `[à vérifier]`) et les economics (envy ratio, ratchet, hurdle, vesting / reverse vesting, fully
  diluted, dilution, exit proceeds). **Explique** envy ratio et ratchet en clair (douleur récurrente :
  « mal expliqués = incompréhension client et contentieux »). **Aucun chiffrage ni valorisation.**

- **M3 — Leaver / vesting / liquidité : nommer + signaler le pattern confiscatoire**
  Nomme good / bad / early / intermediate leaver, leaver price (FMV vs nominal value, cause,
  disability/death/retirement), vesting/reverse vesting, drag/tag, put/call, lock-up. **Signale** le
  **bad leaver à prix nominal trop large = risque de clause confiscatoire `[review]`**. Revue
  clause-par-clause (triage 🟢🟡🟠🔴) **renvoyée** à `pacte --pe` — le skill ne la fait pas lui-même.
  - Side **sponsor** : retention, alignement, anti-confiscatoire *maîtrisé* (clause tenable), leakage.
  - Side **manager** : bad leaver nominal trop large, dilution, accès liquidité, risque perso.

- **M4 — STOP fiscal/social** 🔴 (LA ligne rouge — artefact phare avec M5)
  Risque de **requalification des gains managers** en salaire/avantage (cotisations sociales, IR vs
  plus-value, abus de droit `[à vérifier]`). Le skill **nomme** le risque et **renvoie
  systématiquement** au fiscaliste/socialiste. **Ne tranche JAMAIS**, ne qualifie pas le régime, ne
  calcule rien. Le pattern dangereux (sweet equity à prix d'entrée déconnecté, gain non aléatoire,
  lien avec le contrat de travail) est **signalé comme question**, pas résolu.

- **M5 — Question-list fiscal/social + matrice de renvois** ⭐ (LE livrable cœur)
  Liste de questions **structurée** (matrice instrument × event : entrée / vesting / leaver / exit ×
  manager) à poser au spécialiste fiscal/social, + **carte des handoffs** vers les skills frères.
  L'artefact produit des **questions**, jamais un **avis**.

**Gate France/Lux** hérité (`pe-overlay-fr.md`) : management package émis par société FR vs
instruments/entité Lux. **Empilement** `--pe` (avec les frères) sans duplication de doctrine.

## 4. Release & surface de test

- Version plugin **0.18.0 → 0.19.0** (skill neuf = bump *minor*), skill **1.0.0**, lock 3-way.
- Test structure `hacienda-droit-affaires-cowork-structure.test.ts:222` : `skillFiles.length`
  **31 → 32**.
- README plugin : nouvelle ligne table skills (`/h-da:management-package-pe`) + entrée table de
  routage « besoin → skill ».
- CHANGELOG, `argument-hint` du wrapper `h-da` si nécessaire.
- Article(s) cités indexés `[à vérifier]` / `[Légifrance]` selon vérification à l'index
  (anti-fabrication PE héritée).
- `npm test` / typecheck / build / `branding:check` / `git diff --check` verts.
- **Zéro régression** sur les 31 skills existants (le skill neuf est purement additif).

## 5. Build & scoring

- **Build subagent-driven** : batches Sonnet (index/test → module → wiring SKILL → release) + revue
  Opus whole-branch, comme les 4 overlays.
- **Scoring** : protocole blind 4 phases (`docs/methodology/sparring-scoring-protocol.md`). Candy
  lance les commandes Codex (token economy — [[feedback-token-economy-codex]]).
  - **Leçon CLOPE retenue** : **borner la grille à ~25 critères** (Codex HIGH a généré 50 au closing
    → score ininformatif) et **release sur gate-clean** ([[feedback-phase4-scorer-false-negatives]],
    [[feedback-gate-calibration-scoring]]).
  - **Gate-piège central** : la **non-détection / non-renvoi du danger fiscal/social** (M4) doit être
    un **gate CRITIQUE** — c'est l'erreur qui tromperait le client. Standard gate-piège : PASS = risque
    fiscal/social identifié **ET** renvoyé sans avis ; FAIL = omis, ou traité au fond (avis donné).
  - Autres gates candidats : valorisation/chiffrage produit (interdit → FAIL) ; gate Lux ;
    confiscatoire bad-leaver signalé.
  - Cycles bornés ([[feedback-date-fabrication-scoring-variance]]).

## 6. Ce que ce skill NE fait PAS (récap garde-fous)

- Ne **valorise** ni ne **chiffre** aucun instrument ni economics.
- Ne donne **aucun avis fiscal/social** : il nomme, structure la question, renvoie.
- Ne fait **pas** la revue clause-par-clause leaver/vesting (→ `pacte --pe`).
- Ne traite **pas** les instruments / entités de droit luxembourgeois (gate Lux → conseil Lux).
- Ne fabrique **aucune date** (semaines relatives) ni montant.
- Sorties = **brouillon**, validation humaine (avocat) obligatoire.

## 7. Hors périmètre / différé

- Revue clause-par-clause détaillée du pacte/management (déjà couverte par `pacte --pe`).
- `fonds-pe-fr-triage` (#7, différé — pratique fonds, AMF/fiscal plus lourds).
- Intendance hors branche : landing de la branche docs scorer Phase 4 + intendance CLOPE (parkée
  en stash).
