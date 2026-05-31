# Gap analysis — `hacienda-propriete-intellectuelle` (PI) vs `hacienda-droit-affaires` (DA)

**Date** : 2026-05-31
**Référentiel** : DA v0.1.0 (20 skills / 4 agents — post PR #16-#23, mai 2026)
**Objet de la review** : PI v0.18.14 (36 skills / 6 agents — état `main`)
**Méthode** : lecture intégrale des fichiers transverses (`CLAUDE.md`, `.mcp.json`, manifest, CHANGELOG, anno overlay) + échantillonnage de 5 skills PI représentatifs (un par domaine : `clearance-marque`, `preparation-depot-brevet`, `revue-open-source`, `cession-droit-auteur`, `contentieux-pi`). Échantillonnage assumé : extrapolation aux 31 autres skills à valider lors de l'implémentation.

Légende priorité :
- 🔴 **bloquant** — écart qui dégrade matériellement la qualité ou la sécurité juridique
- 🟠 **important** — pattern canonique DA absent, à aligner avant prochaine release majeure
- 🟡 **nice-to-have** — finition, cohérence visuelle
- `[bonus PI]` — pattern PI plus mature que DA, à conserver et éventuellement remonter dans DA

---

## Synthèse exécutive

PI est **structurellement aligné** sur DA pour les invariants plugin (manifest, `.mcp.json`, sections de `CLAUDE.md`, anno overlay, alias `h-pi:`). Sur plusieurs dimensions du contrat utilisateur (matter workspaces actifs, reconnaissance juridictions 5-step, philosophie `[review]`), **PI est en avance**.

Trois écarts justifient une vague d'alignement avant la prochaine release majeure :

1. 🔴 **Absence du skill `check-pii`** (et du pattern lead magnet inversé `hacienda-ghost`). DA livre un gate PII pré-flight appelé en étape 1 par tous les skills sensibles ; PI ne l'a pas. Conséquence : les workflows PI traitant des pièces client (audit M&A, contrats, contentieux) ne disposent d'aucun garde-fou PII opérationnel — seule la mention CLAUDE.md « politique_pii » existe, jamais matérialisée.
2. 🔴 **Échelle canonique 🔴🟠🟡🟢 absente du corps des skills** : 6/36 SKILL.md PI contiennent une référence explicite à l'échelle, contre 17/20 côté DA. Le plancher de sévérité cross-skill (CLAUDE.md §4) est donc inopposable en pratique pour 30 skills.
3. 🟠 **Pattern « skill de référence »** (frontmatter complet, 3-4 examples worked, étapes numérotées, modes courts, mode silencieux explicite, section Ton) n'est pleinement appliqué dans aucun des skills PI échantillonnés. Format dégradé par rapport à DA `spa-review` (372 lignes structurées) malgré des skills PI parfois plus volumineux (`contentieux-pi` 498 lignes, mais sans la même densité de patterns canoniques).

Pas de blocage de release immédiate — PI tient debout. Mais l'implémentation des items 🔴 (check-pii + échelle systématique) ferait passer le plugin du niveau « assistant compétent » à « assistant calibré DA-style ».

---

## Axe 1 — Structure plugin

| Dimension | DA fait | PI fait | Écart | Recommandation |
|---|---|---|---|---|
| **Manifest `manifest_version`** | 0.3 | 0.3 | aligné | ✅ rien à faire |
| **Version sémantique** | 0.1.0 (jalon unique) | 0.18.14 (18 versions mineures + 14 patches) | 🟡 philosophies divergentes | Documenter la convention de versioning dans `CLAUDE.md` racine repo (les deux sont valides — PI = continuous, DA = milestones). Pas de réalignement forcé. |
| **`.mcp.json` pattern `${CLAUDE_PLUGIN_ROOT}/mcp-server/dist/mcpb-index.cjs`** | ✓ | ✓ | aligné (PR #18/19/21 répliqué) | ✅ rien à faire |
| **`hooks.json` vide canonique `{ "hooks": {} }`** | ✓ | ✓ | aligné | ✅ rien à faire |
| **`CLAUDE.md` template 11 sections** | 404 lignes, 11 sections | 532 lignes, 11 sections | aligné, PI +130 lignes (blocs métier plus nombreux) | ✅ rien à faire |
| **Section CLAUDE.md §4 garde-fous transversaux** | 8 règles | 9 règles | aligné, PI +1 (`Vérifier les faits juridiques utilisateur avant analyse`) | `[bonus PI]` — envisager de remonter cette règle dans DA §4. |
| **Section CLAUDE.md §5 reconnaissance juridictions** | 3 étapes (Détecter / Évaluer / Signaler) | 5 étapes (Détecter / Évaluer / Sinon le dire / Proposer next step / Ne jamais réponse confiante en mauvais droit) + exemples test Sleekcraft/Polaroid | `[bonus PI]` | À remonter dans DA. |
| **Section CLAUDE.md §11 matter workspaces** | désactivé v1, prévu v1.1 | **actif**, slug-dossier opérationnel, contexte cross-dossiers configurable | `[bonus PI]` | À remonter dans DA quand v1.1 sera activé. |
| **Matrice approbateurs centralisée §1** | tableau unique consolidé | éclatée en 6 blocs métier (brand protection, brevets, D&M, droit d'auteur, contrats PI, contentieux) | 🟡 — granularité PI justifiée par la diversité des sides, mais perte de lisibilité | Ajouter une matrice consolidée en tête de §1 pointant vers les blocs, sans dupliquer. |
| **Politique PII explicite §1** | `politique_pii : passive/active/strict + seuil B 50 identifiants` | mention indirecte (Anno `detect`, marqueur `[à vérifier]`) — pas de seuil B chiffré | 🔴 | Ajouter le bloc `politique_pii` dans CLAUDE.md §1 PI, identique à DA. Prérequis pour skill check-pii (item suivant). |
| **Skill `check-pii`** | présent, gate pré-flight obligatoire, modes A/B avec CTA `marketplace://hacienda-ghost` | **absent** | 🔴 | Porter `check-pii` de DA vers PI. Adapter le seuil B sur catégories sensibles PI (NIR créateur, IBAN ayant droits, montants cession > 10k€, secrets affaires/savoir-faire, brevets non encore déposés = `[secret industriel]`). |
| **Skill `verifier-citations`** | présent, post-flight de tout skill substantiel | **absent** | 🟠 | Porter `verifier-citations` de DA vers PI. Étendre les pattern-checks aux citations spécifiques PI : numéros INPI, numéros EUIPO/EUTM, numéros OEB/EP, arrêts CJUE Sabel/Canon/Lloyd. |
| **Dossier `tests/datasets/`** | présent (validation interne K7M2PX, R7M2KX, R4VN9W) | **absent** | 🟠 | Créer `plugins/hacienda-propriete-intellectuelle/tests/datasets/` avec premiers cas de test (un par domaine, en miroir DA). Non bloquant pour release mais bloquant pour reproductibilité validation. |
| **Anno overlay `anno-distribution.ts`** | bloc dédié, 8 workflows mappés | bloc dédié, 7 workflows mappés | aligné | ✅ rien à faire. Optionnel : aligner le wording du gate (DA mentionne explicitement `le plugin's check-pii skill remains the lead PII gate`, PI ne peut pas — cohérent avec absence skill). |
| **Alias court `h-pi:`** | DA = `h-droit-affaires:` | confirmé dans tous les skills échantillonnés | aligné | ✅ rien à faire |
| **`references/`** | 11 fichiers | 12 fichiers (regime sui generis L341, jurisprudence cession/contrefaçon auteur, modèles licence BdD, agent-audit-grid) | `[bonus PI]` — `agent-audit-grid.md` est mature, à remonter dans DA pour ses 4 agents | À conserver tel quel + considérer port de `agent-audit-grid.md` vers DA. |
| **`CHANGELOG.md`** | 131 lignes, vagues consolidées (V1, V1.1, V1.2, V2a, V2b, M&A UX) | 633 lignes, 18 versions documentées | 🟡 — verbosité PI complique la navigation | Ajouter en tête une table « vagues majeures » pointant vers les versions clés (V1 marques, V3.0 D&M, V4.x droit d'auteur, V5.0 contrats, V6.0 contentieux, V2.3 brevets), sans réécrire l'historique. |
| **README.md plugin** | présent, table commandes | présent, table commandes exhaustive | aligné | ✅ rien à faire |

---

## Axe 2 — Contenu juridique (sample 5 skills PI)

### Patterns canoniques DA appliqués au sample

| Pattern (référence DA spa-review / gap-review) | clearance-marque | preparation-depot-brevet | revue-open-source | cession-droit-auteur | contentieux-pi |
|---|---|---|---|---|---|
| Frontmatter complet (`name`, `version`, `description`, `argument-hint`, `authors`, `tags`) | partiel (manque authors/tags) | partiel (manque authors/tags) | partiel (manque authors/tags) | partiel (manque authors/tags) | ✓ complet |
| Disclaimer en blockquote `> **BROUILLON…**` | ✓ | ✓ | ✓ | ✓ (note positionnement) | ❌ |
| **Examples ≥ 3 worked** | 1 générique | 1 générique | 1 générique | 1 générique | 1 générique |
| Chargement du profil (2 chemins) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Intake | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Pré-flight `check-pii`** étape 1 | ❌ (absent partout) | ❌ | ❌ | ❌ | ❌ |
| Gate non-juriste | ✓ | ✓ | ✓ | ✓ | ✓ |
| Outils MCP à privilégier (noms exacts) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Mode Anno Desktop optionnel (gate + workflows) | ❌ section absente | ❌ | ✓ section dédiée | ❌ | ❌ |
| Emplacement des sorties (matter ou pratique) | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Étapes numérotées exécutables** (1-N, DA spa-review en a 11) | ❌ (skill stub redirect — normal) | partiel (contrat V2, pas d'enchaînement séquentiel pas-à-pas) | ❌ | partiel | partiel |
| **Échelle 🔴🟠🟡🟢 visible dans le corps** | ❌ | ❌ | ❌ | ❌ | partiel |
| **Modes courts** (`--red-flags`, `--issues-list`, `--signing-ready` ou équivalent métier) | n/a | ❌ | ❌ | argument-hint à 4 valeurs mais pas modes courts post-output | ❌ |
| **Mode silencieux livrable externe** réécrit dans le skill | ❌ (référence CLAUDE.md seulement) | ❌ | ❌ | ❌ | ❌ |
| Section « Ce skill ne fait pas » | ✓ | ✓ | ✓ | partiel | ✓ |
| Section « Ton » | ❌ | ❌ | ❌ | ❌ | ❌ |
| Sortie : format livrable structuré explicite | bloc 4 sections | bloc 9 blocs V2 | générique | 9 blocs V2 | partiel |

**Bilan échantillon** :
- Le squelette commun (profil / intake / gate / outils / emplacement / sortie générique) est appliqué partout → bonne discipline transversale.
- Les **enrichissements DA** (examples worked multiples, étapes numérotées, modes courts, mode silencieux dans le skill, échelle dans le corps, ton) sont **absents ou partiels** dans tous les skills échantillonnés.
- Effet pratique : un avocat qui lit un SKILL.md PI obtient le périmètre et les outils, mais doit **dériver lui-même** la séquence d'exécution et l'arbitrage subjectif que DA fournit clé en main.

### Extrapolation aux 31 skills non lus

`grep "🔴\|🟠\|sévérité\|echelle"` sur tous les SKILL.md PI = 6 fichiers concernés sur 36. Sur DA, le même grep = 17/20. La sous-représentation de l'échelle dans le corps des skills est donc **généralisée**, pas localisée à l'échantillon.

### Spécificités PI à vérifier en profondeur (hors champ de cette session, à planifier)

Le prompt de mission listait des nuances métier à valider — non vérifiées par lecture intégrale ici, à inscrire au backlog d'implémentation :
- Marques : motifs absolus L.711-2, opposition L.712-4 / restauration L.712-4-1.
- Brevets : délais OEB Règle 132 EPC, PCT 30 mois, INPI R.612-66, CCP (skill `certificat-complementaire-protection`).
- Droit d'auteur : L.131-3 cession durée+territoire+médias, L.131-4 rémunération proportionnelle, L.113-9 logiciel employeur.
- Open source : distinction permissives (MIT/BSD/Apache) vs copyleft contamination (GPL/AGPL/LGPL/MPL).
- Contentieux : compétence exclusive TJ Paris L.615-17 + MUE art. 123 RMUE + DMC art. 80 RDMC.

Méthode recommandée : sparring scoring style K7M2PX/R4VN9W sur un skill par domaine (6 dossiers test) avant prochaine release majeure.

---

## Liste d'actions priorisées

### 🔴 Bloquant — à traiter avant prochaine release majeure

1. **Porter `check-pii` de DA vers PI**.
   - Copier `plugins/hacienda-droit-affaires/skills/check-pii/SKILL.md` → `plugins/hacienda-propriete-intellectuelle/skills/check-pii/`.
   - Adapter catégories sensibles PI : NIR créateur, IBAN ayant droits, montants cession > 10k€, mots-clés `secret affaires` / `savoir-faire` / `secret industriel`, numéros brevets non encore publiés (avant 18 mois post-dépôt).
   - Conserver pattern lead magnet inversé `hacienda-ghost` (footer A discret + prompt B avec CTA `marketplace://hacienda-ghost`).
   - Ajouter le bloc `politique_pii` dans CLAUDE.md §1 PI.

2. **Étendre l'échelle 🔴🟠🟡🟢 au corps de tous les SKILL.md PI sensibles**.
   - Cible prioritaire : les 30 skills où l'échelle est absente.
   - Format minimal : une section « Niveaux de criticité » ou intégration dans le bloc sortie.
   - Sans cela, le plancher de sévérité cross-skill (CLAUDE.md §4) est inopposable.

3. **Ajouter étape 1 « Pré-flight `check-pii` » dans tous les skills traitant des pièces client**.
   - Cible : `audit-pi-ma`, `contrats-pi`, `revue-clause-pi`, `cession-droit-auteur`, `licence-droit-auteur`, `contrefacon-droit-auteur`, `contrefacon-dessin-modele`, `contentieux-pi`, `mise-en-demeure-pi`, `saisie-contrefacon`, `due-diligence-dataroom`-équivalent (audit-pi-ma).
   - Prérequis : item #1 livré.

### 🟠 Important — à traiter dans une vague d'alignement contenu

4. **Porter `verifier-citations` de DA vers PI**.
   - Étendre vérification aux numéros INPI/EUIPO/EUTM/OEB/EP et aux arrêts CJUE PI (Sabel C-251/95, Canon C-39/97, Lloyd C-342/97, Matratzen Concord T-6/01).
   - Référencer en post-flight depuis les skills à fort enjeu contentieux.

5. **Créer `plugins/hacienda-propriete-intellectuelle/tests/datasets/`**.
   - Un dossier de test par domaine (marque, brevet, D&M, droit d'auteur, logiciel, contentieux).
   - Format aligné sur DA (cf. K7M2PX pour SPA review).
   - Permet validation interne reproductible avant chaque release majeure.

6. **Enrichir les SKILL.md PI sur le modèle DA `spa-review`**.
   - 3-4 examples worked au lieu d'un example générique.
   - Étapes numérotées exécutables (8-11 étapes) dans le corps.
   - Section « Ton » explicite.
   - Section « Mode silencieux livrable externe » écrite dans le skill (pas seulement référencée CLAUDE.md).
   - Priorité : skills cœur métier `audit-pi-ma`, `contentieux-pi`, `cession-droit-auteur`, `mise-en-demeure-pi`, `revue-open-source`, `recherche-anteriorite-marque`.

7. **Introduire modes courts métier**.
   - Exemples candidats : `audit-pi-ma --red-flags`, `revue-open-source --copyleft-only`, `contentieux-pi --recevabilite-only`, `cession-droit-auteur --chain-of-title`.
   - Sur le modèle DA `--red-flags` / `--issues-list` / `--signing-ready`.

8. **Compléter frontmatter de tous les SKILL.md PI** avec `authors: ["Hacienda"]` et `tags: [...]` (manquant sur 4 des 5 skills échantillonnés).

### 🟡 Nice-to-have

9. **Consolider la matrice approbateurs CLAUDE.md §1** : ajouter un tableau récap en tête pointant vers les 6 blocs métier.

10. **Refondre `CHANGELOG.md` PI en deux niveaux** : tête « vagues majeures » + corps « versions détaillées » (préserver historique).

11. **Vague de sparring scoring sur 6 skills PI** (un par domaine), style K7M2PX. Cibles : `clearance-marque` (en réalité `recherche-anteriorite-marque`), `preparation-depot-brevet`, `depot-dessin-modele`, `cession-droit-auteur`, `revue-open-source`, `contentieux-pi`. Output : un backlog d'améliorations métier par skill.

### `[bonus PI]` — patterns à remonter vers DA

12. **CLAUDE.md §5 reconnaissance juridictions à 5 étapes + exemples tests étrangers** (PI plus mature).
13. **CLAUDE.md §4 règle « Vérifier les faits juridiques utilisateur avant analyse »** (PI a la règle, DA non).
14. **Matter workspaces actifs §11** (PI opérationnel, DA désactivé jusqu'à v1.1).
15. **`references/agent-audit-grid.md`** (PI a une grille mature pour ses 4 agents — DA pourrait la consommer pour ses 4 agents BODACC / échéances / jurisprudence).
16. **Philosophie tag `[review]` explicit dans §3** (PI traite plus clairement le double porte « sous-flagger = porte à sens unique, sur-flagger = porte à deux sens »).

---

## Coordination avec travail en cours associé

- Branche `origin/claude/pi-remaining-v1.2-v2.3` (3 commits déjà mergés via PRs #11-#13 + bb47d9 finalisation V1.2 + V2.3). Pas de doublon prévisible avec ce rapport.
- Aucune PR ouverte sur le repo au moment de cette analyse. Rapport mergeable docs-only sans risque de conflit.
- Pas de modification de PI dans cette session (décision figée du brief).

---

## Prochaine étape recommandée

Choisir une vague d'implémentation parmi :
- **Vague A (sécurité juridique)** : items 🔴 #1 + #2 + #3 → check-pii + échelle systématique + pré-flight. Sortie : PI v0.19.0.
- **Vague B (qualité contenu)** : items 🟠 #4 + #6 + #7 → verifier-citations + skills enrichis + modes courts. Sortie : PI v0.20.0.
- **Vague C (validation interne reproductible)** : items 🟠 #5 + 🟡 #11 → tests/datasets + sparring scoring 6 skills. Sortie : rapport de validation interne.

Vague A est la plus courte chemin pour combler le déficit de sécurité juridique (gate PII + échelle inopposable). Vagues B et C peuvent suivre en parallèle.
