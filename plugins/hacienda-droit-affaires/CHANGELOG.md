# Changelog — hacienda-droit-affaires

## [0.3.0] — 2026-06-05

Cœur **persona frère M&A trade** validé par sparring scoring blind tiered-gated
(protocole 4 phases). Les trois skills les plus exposés du cycle de vie d'un deal
trade passent leur cycle blind **sans gate CRITIQUE FAIL**.

### Validé blind (criteria-driven)
- `loi-term-sheet` — **RÉSERVES** (0,90, gate-clean **dès le cycle 1, sans correctif** ; cycle AMDZQA). Qualification binding/non-binding (le titre « non contraignant » ne neutralise pas une obligation impérative), liberté de rompre les pourparlers + bonne foi (1104) + 1112 al. 2, sources réelles (1104/1112/1112-1/1231-5/1304-2). Skill nativement bien ancré.
- `gap-review` — **RÉSERVES** (0,904, gate-clean ; cycle SFZLV2). Correctif **H1** : dol/fraude/vices du consentement non-écartables par une clause d'exclusivité GAP (1130/1137/1104) ; durée de la garantie fiscale ancrée sur le droit de reprise LPF (L.176 TVA / L.169 IS) ; mise en demeure ICPE inexécutée = risque public d'exécution d'office (L.171-8 C. env.), pas un simple coût de travaux.
- `spa-review` — **gate-clean** (INSUFFISANT 0,71, gate ouvert ; cycle NQ4FOV). Correctif **G1** : earn-out indéterminable ancré sur la déterminabilité du prix (1591/1163, nullité) ; finding DD matériel cadré via le devoir d'information 1112-1 et les vices du consentement 1130/1137.

### Méthodologie
- Extension du protocole sparring scoring blind au persona frère (file `docs/backlog/da-codex-scoring-queue-frere.md`).
- Confirmation : le défaut d'ancrage d'article observé sur spa-review/gap-review est **spécifique**, pas systémique (loi-term-sheet passe nativement) — pas de consigne transversale CLAUDE.md.
- Correctif tooling : le test `cowork-structure` exclut désormais `tests/datasets` du lint d'hygiène des renvois (sorties modèle brutes, pas des fichiers livrés).

### Limites assumées v0.3.0
- `spa-review` reste INSUFFISANT (gate-clean) : findings de couverture G2 (objectivité CP, mécanique leakage, formalités SAS/CSE + sanctions) et G3 (hygiène renvoi PI) reportés.
- `gap-review` H2 et `loi-term-sheet` I1 : majeurs résiduels de polish reportés.
- F4 `due-diligence-dataroom`, F5 `pacte-associes-review`, F6 `closing-checklist-fr` : non scorés blind → usage sous validation humaine renforcée.

## [0.2.0] — 2026-06-05

Socle **procédures collectives / persona ami** validé par sparring scoring blind
tiered-gated (protocole 4 phases, cf. `docs/methodology/sparring-scoring-protocol.md`).
Les deux skills cœur passent leur cycle blind sans gate CRITIQUE FAIL.

### Validé blind (criteria-driven)
- `declaration-creance` (L.622-24) — **RÉSERVES** (0,85, gate ouvert ; cycle CBO94O). Ancrage doctrinal (fait générateur, prorogation 642 CPC, revendication réserve de propriété, chirographaire) + garde-fous chiffrage (pas de taux inventé, base clause pénale explicite, auto-contrôle arithmétique). Régressions mineures C-006/C-009 + clause pénale C-014 tracées (finding F, v0.3.0).
- `mise-en-demeure-commerciale` (nouveau) — **ADMIS** (0,95, gate fermé ; cycle FCQDWM). Sommes (intérêts 1344-1, forfait 40 € L.441-10, clause pénale 1231-5), délai raisonnable, **garde-fou procédure collective L.622-21 rendu visible** dans la note du relecteur (ligne « Procédure collective » obligatoire) → bascule `declaration-creance` si débiteur en sauvegarde/RJ/LJ.

### Ajouts (construits, non encore scorés blind)
- `declaration-creance --releve-forclusion` — requête en relevé de forclusion L.622-26 (délai d'action 6 mois, cause non imputable au créancier).
- `prevention-difficultes` — mandat ad hoc / conciliation / sauvegarde accélérée ; gate cessation des paiements.

### Méthodologie & outillage
- Protocole sparring scoring blind 4 phases (Phase 2 vérité terrain HIGH sans SKILL.md, Phase 3 exécution live sans ground-truth, Phase 4 scoring medium sans SKILL.md).
- `scripts/tiered_scoring.py` (agrégation tiered-gated, niveau autoritatif depuis le ground-truth) + `scripts/codex-blind-scoring.py` (`phase2-criteria` / `phase4-criteria`).
- Tranche E2 : `mise-en-demeure` **et** `declaration-creance` consultent Légifrance/PISTE pour le taux légal (`[à vérifier]` = repli dégradé documenté seulement).

### Limites assumées v0.2.0
- `--releve-forclusion`, `prevention-difficultes`, `analyser-rupture-brutale` : non scorés blind → usage sous validation humaine renforcée (file `docs/backlog/da-codex-scoring-queue.md`).
- Persona frère M&A (`spa-review`, `gap-review`, `loi-term-sheet`, etc.) : hors périmètre v0.2.0, scoring blind vague suivante.

## [Non publié] — M&A UX + SPA review (2026-05-26)

### Ajouts
- `spa-review` (`--review`, `--red-flags`, `--issues-list`, `--signing-ready`) — revue d'un SPA / protocole de cession M&A : architecture du deal, prix, CP, interim covenants, MAC, disclosure, DD -> protections SPA, renvois GAP et closing.
- Dataset interne `tests/datasets/v2-spa/spa-review-scenario.md` : SPA synthétique de cession de titres SAS avec red flags attendus.

### UX de routage
- `NBO / Non-Binding Offer` route explicitement vers `loi-term-sheet`.
- `SPA / protocole de cession` route explicitement vers `spa-review`.
- Le README documente le parcours cabinet M&A : NDA -> NBO/LOI/Term Sheet -> DD -> SPA -> GAP -> Closing.

### Notes
- Aucun nouvel outil `packages/core`, aucun agent, aucune modification des skills V1/V1.1/V1.2/V2a existants.
- `spa-review` orchestre les skills existants sans remplacer `gap-review`, `due-diligence-dataroom` ni `closing-checklist-fr`.

## [Non publié] — V2a (en cours) — 2026-05-26

### Ajouts
- skill `analyser-rupture-brutale` (L.442-1, II C.com.) — analyse contentieuse de la rupture brutale de relations commerciales établies

### Retraits
- squelette `hacienda-contrats` supprimé (absorption partielle par droit-affaires V1/V1.1/V1.2/V2a ; 7 skills résiduels du squelette repoussés en v3+ selon demande personas)

### Notes
- Développé en parallèle des tests personas (mode additif côté plugin droit-affaires).
- V2b — distribution Cowork-ready — reste bloquée sur la finalisation du pattern packaging/install par `hacienda-ghost`.

## [0.1.0] — 2026-05-19

### Ajouts — Release initiale v1

#### Skills (9)
- `entretien-demarrage` — cold-start, configuration profil cabinet + bloc M&A + bloc procédures collectives + bloc contrats commerciaux + matrice approbateurs + politique PII
- `check-pii` — pré-flight détection PII avec seuils calibrés (passive / active / strict) + CTA `hacienda-ghost`
- `verifier-citations` — post-flight Légifrance (PISTE) + Judilibre, mode dégradé sans clé
- `reviser-contrat` — revue contrat commercial 15 clauses pilotes, routing PI-centric vers contrats-pi
- `reviser-nda` — triage VERT/ORANGE/ROUGE 8 points (unilatéral / bilatéral)
- `liste-de-points` — issues list composable (standalone + mode composant pour reviser-contrat / gap-review)
- `revue-tabulaire` — brique atomique d'extraction multi-documents
- `gap-review` — Garantie d'Actif et de Passif, 5 axes (périmètre / mécanique / procédure / clauses sensibles / DD), matrice side-dependent cédant↔acquéreur
- `declaration-creance` — déclaration L.622-24, calcul forclusion (60j + 60j créancier étranger), format mandataire

#### Agents (3)
- `bodacc-watcher` — surveillance quotidienne cibles M&A + clients critiques (procédure collective, changement contrôle, dirigeants)
- `bodacc-procedures-watcher` — garde-fou déontologique forclusion L.622-24, alerte calibrée 30j / 7j / 0j / FORCLUSION
- `echeances-societaires` — rappel hebdomadaire dépôts comptes (L.232-23), AGO (L.225-100 / L.227-9), renouvellement mandats, CAC (L.823-3)

#### References (4)
- `clauses-sensibles-fr.md` — 15 clauses pilotes (clause pénale 1231-5, non-concurrence salariée, exclusivité, limitation responsabilité, déséquilibre significatif L.442-1, etc.)
- `sources-fr.md` — catalogue sources avec statut intégration core
- `taxonomie-contrats-fr.md` — taxonomie contrats avec routing skill
- `articles-c-civ-c-com-index.md` — index articles C.civ et C.com avec IDs Légifrance (à compléter en passe maintenance)

#### Infrastructure
- CLAUDE.md complet (11 sections calquées PI v0.16 — patterns canoniques : note du relecteur 5 champs, arbre 5 options, échelle 🟢🟡🟠🔴, tags provenance)
- MCP server wrapper (registers 3 core tools : `bodacc_by_siren`, `bodacc_procedures`, `company_full_profile`)
- Cold-start partagé via `~/.config/Hacienda/credentials.json` et profil cabinet via `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
- Mode dégradé sans Pappers (fallback BODACC OpenDataSoft public) et sans PISTE (`verifier-citations` en mode dégradé)
- CTA `hacienda-ghost` intégré dans `check-pii`

### Décisions produit figées v1
- IN v1 : cabinet M&A léger + indépendant procédures collectives (personas figés frère + ami)
- OUT v1 définitif : RGPD (couvert par `hacienda-donnees-personnelles`), Sapin II, devoir de vigilance
- OUT v1/v2 : marchés publics (ouvert si demande), droit boursier complet
- IN v2 : connecteurs Drive/SharePoint/OneDrive, droit boursier limité (cibles cotées)

### Dette technique connue
- 15 articles cités `[à vérifier]` à intégrer dans `articles-c-civ-c-com-index.md` en passe maintenance (récupération IDs Légifrance) :
  - C.civ : 1602, 1626, 1641, 1592, 1137, 1144
  - CPC : 48
  - C.com : L.622-17, L.624-16, L.642-1, R.622-24, L.232-23, L.225-100, L.227-9, L.823-3
- `references/dashboard-template.md` référencé dans CLAUDE.md plugin et 4 skills/1 agent mais non créé localement (vit dans PI) — passe maintenance plugin-wide

### Limites assumées
- Workspaces de dossier (matters) désactivés v1 — activation v1.1
- AMF Décisions hors core v1 — intégration v2 si demande
- Pas d'envoi automatique au mandataire ni dépôt automatique des comptes (acte humain + validation avocat systématique)

## [Non publié] — V1.1 (2026-05-21)

Vague V1.1 : 6 skills additifs (2 clusters), développée en parallèle des tests personas de V1, en mode strictement additif — aucun skill, agent ou fichier `packages/core` de V1 modifié.

### Ajouts — Cluster vie sociale
- `pacte-associes-review` — revue de pacte d'associés, 11 clauses sensibles (préemption, agrément, inaliénabilité, drag/tag-along, anti-dilution, good/bad leaver, promesses croisées, non-concurrence d'associé, véto, information/liquidité) ; renvoi `PI:contrats-pi`. Référence `clauses-pacte-associes-fr.md`.
- `constitution-societe` (`--comparer` / `--draft`) — choix de forme SAS/SARL/SA et brouillon assisté de statuts `[review]`-tagué ; bifurcation acte sous seing privé / notarié + commissaire aux apports. Référence `comparatif-formes-sociales-fr.md`.
- `gouvernance-ag` (`--convocation` / `--pv`) — convocation et procès-verbal d'assemblée ; délais, quorum et majorité par forme sociale. Référence `calendrier-vie-sociale-fr.md`.

### Ajouts — Cluster M&A deal-lifecycle
- `loi-term-sheet` (`--review` / `--draft`) — LOI / term sheet ; cartographie des clauses binding / non-binding.
- `due-diligence-dataroom` — analyse de data-room sur 7 thèmes ; consomme `revue-tabulaire` ; grille de matérialité, Q&A list, recommandations GAP. Référence `grille-due-diligence-fr.md`.
- `closing-checklist-fr` — checklist de closing M&A FR : conditions suspensives, séquençage signing/closing, documentation, formalités post-closing.

### Ajouts — Références partagées
- `articles-c-civ-c-com-index.md` étendu (articles droit des sociétés L.223/225/227/228-x, L.210-x, L.223-29).
- `CLAUDE.md` §1 — sous-bloc « vie sociale ».

### Correctifs
- Test `hacienda-marketplace` : `expectedPlugins` resynchronisé avec `marketplace.json` (entrée `hacienda-droit-affaires` manquante depuis V1).

### Notes
- Chaque skill livré avec son dataset de test interne sous `tests/datasets/v1.1/`.
- Workspaces de dossier : toujours hors périmètre (chantier post-personas).
- Déprécation de `hacienda-societes` : tâche distincte à venir (les skills de remplacement sont désormais livrés).
- L'acceptance V1.1 (datasets internes + validation personas) gate le passage v1.0.0 → v1.1.0.

## [Non publié] — V1.2 (2026-05-21)

Vague V1.2 : 2 skills de génération/conseil + 1 feature de veille (agent + skill), développée en parallèle des tests personas de V1/V1.1, en mode strictement additif côté plugin `hacienda-droit-affaires` — aucun skill, agent ou fichier `packages/core` de V1/V1.1 modifié. Le plugin compte désormais 18 skills et 4 agents.

### Ajouts — Skills de génération / conseil
- `cgv-generator` (`--draft`) — génération de CGV B2B (Code de commerce) et de CGU/CGV B2C (Code de la consommation) en brouillon assisté `[review]`-tagué ; détection ou demande explicite du régime à l'intake ; contrôle des clauses abusives (liste noire R.212-1 refusée, liste grise R.212-2 signalée) ; jamais « prêt à publier ». Référence `regimes-cgv-cgu-fr.md`.
- `financement-startup` (`--comparer` / `--review`) — conseil sur les instruments de financement de la startup (BSPCE, BSA, obligations convertibles, augmentation de capital) ; renvoi explicite vers `pacte-associes-review` pour les clauses de pacte ; aucun conseil fiscal — la dimension fiscale (régime BSPCE, art. 163 bis G CGI) est signalée et renvoyée. Référence `instruments-financement-fr.md`.

### Ajouts — Feature veille
- agent `veille-jurisprudence` — veille hebdomadaire Légifrance (lois/ordonnances/décrets) + Judilibre (Cour de cassation, chambre commerciale) ; digest hebdomadaire structuré, état persisté pour le calcul du delta ; champ de configuration `chambres` extensible (défaut `commerciale`).
- `consulter-digest` — skill de lecture : localise, filtre (domaine / date / criticité d'impact) et restitue le digest produit par l'agent ; aucune analyse juridique nouvelle.

### Ajouts — Références
- `clauses-sensibles-fr.md` étendu de 15 à 30 clauses (réserve de propriété, délais de paiement L.441-10, pénalités de retard, garanties légales, limitation de responsabilité CGV, imprévision 1195 C.civ., non-sollicitation, etc.) — append pur.

### Retraits
- Squelette `hacienda-societes` supprimé (commit dédié, hors plugin `droit-affaires`) : ses skills de remplacement ont été livrés en V1.1 (`constitution-societe`, `gouvernance-ag`, `pacte-associes-review`). Entrée retirée de `marketplace.json` racine, test `hacienda-marketplace` mis à jour.

### Notes
- Développée en parallèle des tests personas, en mode strictement additif côté plugin `droit-affaires`.
- Veille limitée à la chambre commerciale en v1.2 ; champ `chambres` extensible pour v1.3+ (chambre sociale notamment).
- Chaque skill livré avec son dataset de test interne sous `tests/datasets/v1.2/`.
- Deux observations mineures de revue tracées pour v1.3 : clause 16 (formulation « Équilibré » conflant revendication sur biens fongibles et revendication en valeur), clause 28 (nuance du transporteur choisi par le consommateur, art. L.216-4 C.conso).
- L'acceptance V1 + V1.1 + V1.2 (datasets internes + validation personas) gate le passage v1.0.0 → v1.1.0.
