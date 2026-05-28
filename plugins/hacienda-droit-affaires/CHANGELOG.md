# Changelog — hacienda-droit-affaires

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
- 15 articles cités `[a verifier]` à intégrer dans `articles-c-civ-c-com-index.md` en passe maintenance (récupération IDs Légifrance) :
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
