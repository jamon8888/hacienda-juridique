# Hacienda Droit des Affaires v1.1 — Plugin Design

Date: 2026-05-20
Status: Proposed
Scope: Spécification de la vague V1.1 du plugin `hacienda-droit-affaires` — 6 skills additifs (2 clusters), développés en parallèle des tests personas de V1, sans modifier les skills/agents/core de V1.

Spec V1 de référence : `docs/superpowers/specs/2026-05-18-hacienda-droit-affaires-design.md`

---

## Contexte

V1 (v0.1.0) du plugin `hacienda-droit-affaires` est complète et livrée : 9 skills, 3 agents, 5 references, MCP wrapper, datasets de test. Tous les checks automatisés passent (306 tests core, typecheck, build, branding, smoke install).

Le seul chantier ouvert de V1 est la **validation personas** (frère cabinet M&A + ami indépendant en droit des entreprises en difficulté), qui gate le bump v1.0.0. Les personas ayant une disponibilité limitée, V1.1 se développe **en parallèle** de cette validation pour maintenir l'élan.

Cette spec définit V1.1 : son périmètre, sa contrainte de parallélisme sûr, son ordre de construction.

## Personas — modèle corrigé

| Persona | Profil | Disponibilité | Valide |
|---|---|---|---|
| Frère | Managing partner, cabinet M&A 20p | Rare (valide après délégation aux associés) | Cluster M&A deal-lifecycle |
| Ami | Indépendant, spécialité droit des entreprises en difficulté, couvre **tout le droit des sociétés** en généraliste | Plus disponible | Cluster vie sociale + procédures collectives (V1) |

Correction par rapport à la spec V1 : l'ami n'est pas un validateur étroit limité aux procédures collectives. En tant qu'indépendant généraliste, il couvre l'ensemble du droit des sociétés et a davantage de temps que le frère. Il est le validateur le plus disponible des deux.

## Goals

1. Développer 6 skills additifs en parallèle des tests personas V1, sans jamais perturber le plugin que les personas testent.
2. Compléter le cycle de deal M&A (LOI → due diligence → GAP → closing) et ouvrir le bloc vie sociale (pacte, constitution, gouvernance AG).
3. Construire le cluster validé par le persona le plus disponible (ami) en premier, pour amorcer la boucle de feedback au plus tôt.
4. Réutiliser sans exception les patterns canoniques figés en V1 (format skills, garde-fous CLAUDE.md, mécanismes verifier-citations et check-pii).
5. Amorcer l'absorption du squelette `hacienda-societes` (côté sociétés), cohérente avec la roadmap v2 de la spec V1.

## Non-Goals

1. Pas d'activation des workspaces de dossier — chantier post-personas distinct (modifie les skills V1, incompatible avec le parallélisme).
2. Pas de `cgv-generator` ni `financement-startup` — restent en v1.2.
3. Pas de déprécation du squelette `hacienda-societes` — chantier v2.
4. Aucun nouvel outil `packages/core`, aucun nouvel agent, aucune modification du MCP wrapper.
5. Aucune modification d'un skill V1, d'un agent V1, ou de `packages/core` pendant les tests personas (sauf correctif de bug V1 remonté par un persona — priorité absolue).

## Contrainte directrice — parallélisme sûr

V1.1 se développe sur `main` en mode strictement additif. Règles dures :

1. **Aucune modification d'un skill V1, d'un agent V1, ou de `packages/core`** tant que les personas testent. V1.1 n'ajoute que des fichiers neufs.
2. **Exception unique** : un bug V1 remonté par un persona est corrigé immédiatement sur `main`, priorité absolue. V1.1 continue autour.
3. **Un skill V1.1 n'atterrit sur `main` que complet et testé en interne.** Si un skill demande plusieurs sessions, il vit sur une branche courte mergée d'un coup. Les personas ne voient jamais un demi-skill.
4. **Workspaces de dossier hors V1.1.** Leur activation modifie les skills V1 → incompatible avec la règle 1.

Conséquence : le plugin des personas grossit (de nouveaux skills apparaissent), mais les skills qu'ils testent (reviser-contrat, declaration-creance, etc.) ne changent jamais sous leurs pieds.

## Périmètre — 6 skills, 2 clusters

| Cluster | Skills | Validateur | Origine |
|---|---|---|---|
| **Vie sociale** | `pacte-associes-review`, `constitution-societe`, `gouvernance-ag` | Ami | `pacte` = v1.1 spec ; `constitution` + `gouvernance` = v1.2 tirés en avant |
| **M&A deal-lifecycle** | `loi-term-sheet`, `due-diligence-dataroom`, `closing-checklist-fr` | Frère | v1.1 spec |

`pacte-associes-review` est le skill-tampon : validable par l'un ou l'autre persona.

Rationale du tirage en avant de `constitution-societe` et `gouvernance-ag` : ces skills routent vers l'ami (sociétés généraliste), pas vers le frère rare. Les construire maintenant n'alourdit donc pas le persona rare ; ils alimentent le persona disponible et forment avec `pacte-associes-review` un cluster "vie sociale" cohérent. Deux blocages de la spec V1 sont levés : `verifier-citations` (prérequis cité pour `constitution-societe`) a shippé et est testé en V1 ; le "manque de validateur" pour le bloc sociétés est résolu par le profil réel de l'ami.

## Ordre de construction

```
Tâche 0   Ménage de main
          Résidus hors périmètre droit-affaires dans le worktree : modifications
          non commitées de AGENTS.md, CLAUDE.md racine, packages/core/package.json ;
          dossiers non suivis .agents/, .claude/ ; fichiers non suivis
          docs/handoff/PROMPT-*.md + docs/handoff/TEMPLATE-handoff.md.
          Pour chacun : décider commit / discard / .gitignore. Objectif : base
          saine et worktree propre avant le premier commit V1.1.

Étape 1   Extension partagée de articles-c-civ-c-com-index.md
          + articles sociétés : L.223-x (SARL), L.225-x (SA), L.227-x (SAS),
            L.228-x (titres). LEGIARTI récupérés via Légifrance.
          + ajustement mineur CLAUDE.md §1 : sous-bloc "vie sociale" à côté de
            "M&A / Corporate" (ajout pur, pas de modification de section existante).

Wave 1 — Cluster vie sociale (ami valide vite → boucle feedback courte)
  1.1  pacte-associes-review
  1.2  constitution-societe
  1.3  gouvernance-ag

Wave 2 — Cluster M&A (bénéficie du feedback ami sur format / garde-fous)
  2.1  loi-term-sheet
  2.2  due-diligence-dataroom    (skill phare ; consomme revue-tabulaire V1)
  2.3  closing-checklist-fr
```

L'ordre A (cluster ami d'abord) a été retenu parce que le feedback persona est la ressource rare et la plus précieuse : l'ami étant le plus disponible, son cluster doit être prêt en premier pour amorcer la boucle de feedback au plus tôt. Ce qu'on apprend de ses retours (calibrage d'un garde-fou, format de sortie) se propage gratuitement au cluster M&A avant que le frère, rare, n'y investisse son temps.

## Détail des skills

### Cluster vie sociale

#### `pacte-associes-review` — mode `--review`

Revue d'un pacte d'associés contre le playbook du cabinet. Clauses sensibles couvertes :
- Préemption, agrément, inaliénabilité (vérification durée raisonnable + intérêt sérieux)
- Drag-along / tag-along
- Anti-dilution
- Good leaver / bad leaver, promesses croisées de cession
- Non-concurrence des associés
- Droits de véto / décisions réservées
- Clauses d'information, clauses de liquidité et de sortie

Renvoi vers `hacienda-propriete-intellectuelle:contrats-pi` si apports ou licences PI substantiels dans le pacte. Référence livrée : `clauses-pacte-associes-fr.md`. Validateur : ami (le frère peut aussi valider — skill-tampon).

#### `constitution-societe` — modes `--comparer` et `--draft`

Mode `--comparer` : aide au choix de forme sociale — comparatif SAS / SARL / SA sur capital, gouvernance, cession de titres, régime social du dirigeant, responsabilité.

Mode `--draft` : assistance à la rédaction de statuts sous forme de **brouillon assisté**. Chaque clause appelant un arbitrage juridique (forme du capital, clauses d'agrément, règles de quorum et de majorité, choix acte sous seing privé vs notarié) est taguée `[review]`. Le skill ne produit jamais un jeu de statuts présenté comme « prêt à déposer » : la présentation même du livrable invite à la validation avocat/notaire.

Point juridique critique : **bifurcation actes explicite** — distinguer les actes sous seing privé (cas standard) des actes notariés obligatoires (apports en nature d'immeuble, apport de fonds de commerce). Intégrer la règle du commissaire aux apports au-dessus des seuils pour les apports en nature.

Mitigation du risque en couches (génération d'actes = risque juridique le plus élevé de V1.1) : (1) tag `[review]` sur chaque point de décision du brouillon, (2) bifurcation actes authentiques active dans la logique du skill, (3) `verifier-citations` post-flight, (4) validation persona par l'ami. Le disclaimer « validation avocat/notaire impérative » est le plancher de responsabilité — pas la mitigation. Référence : `comparatif-formes-sociales-fr.md`. Validateur : ami.

#### `gouvernance-ag` — modes `--convocation` et `--pv`

Un seul skill, deux modes (cohérent avec le pattern V1 `reviser-contrat`/`declaration-creance`). La spec V1 évoquait 2 skills issus du squelette ; un skill unique à deux modes est retenu car plus propre et aligné sur les patterns canoniques figés.

Mode `--convocation` : génère une convocation d'AGO ou d'AGE — délais légaux, ordre du jour, mentions obligatoires, formalisme par forme sociale.

Mode `--pv` : génère ou révise un procès-verbal d'assemblée — quorum, majorité, résolutions, mentions obligatoires.

Distinction AGO / AGE et règles de quorum-majorité par forme sociale (SARL, SA, SAS à liberté statutaire). Référence : `calendrier-vie-sociale-fr.md`. Validateur : ami.

### Cluster M&A

#### `loi-term-sheet` — modes `--review` et `--draft`

Revue ou rédaction d'une lettre d'intention / LOI / term sheet. Cœur du skill : **distinguer les clauses binding des clauses non-binding** (le piège classique de ces documents). Couvre : exclusivité, confidentialité, bonne foi des pourparlers (1104, 1112, 1112-1 C.civ), conditions suspensives esquissées, calendrier, période d'exclusivité, frais. Prépare le terrain pour la due diligence et le SPA. Réutilise `clauses-sensibles-fr.md` (V1). Validateur : frère.

#### `due-diligence-dataroom` — skill phare V1.1

Analyse de data-room M&A sur **7 thèmes** :
1. Corporate / Gouvernance
2. Contrats matériels
3. Social / RH
4. Propriété intellectuelle
5. Fiscal / Financier
6. Contentieux / Passifs
7. RGPD / Conformité réglementaire

**Consomme `revue-tabulaire` (V1)** comme brique d'extraction multi-documents. Sortie : rapport structuré par thème + grille de matérialité + Q&A list (questions complémentaires à poser) + recommandations pour la rédaction de la GAP (lien vers `gap-review` V1). Renvois en pointeurs vers les plugins spécialisés sur les thèmes fiscal, social et PI — l'analyse reste faite par `due-diligence-dataroom`, les renvois orientent vers l'expertise dédiée.

`check-pii` pré-flight est critique pour ce skill (une data-room représente un volume massif de PII). Référence : `grille-due-diligence-fr.md`. Validateur : frère.

#### `closing-checklist-fr` — génération de checklist

Génère une checklist de closing M&A adaptée au droit français : conditions suspensives à lever, séquençage signing / closing, documentation à réunir, formalités post-closing (dépôt au greffe, registre de mouvements de titres, droits d'enregistrement sur cession). Boucle le cycle de deal avec `loi-term-sheet` et `gap-review` (V1). Réutilise `clauses-sensibles-fr.md` (V1). Validateur : frère.

## Références

| Fichier | Statut | Pour |
|---|---|---|
| `articles-c-civ-c-com-index.md` | Étendu (Étape 1, partagé) | + L.223-x SARL, L.225-x SA, L.227-x SAS, L.228-x titres |
| `clauses-pacte-associes-fr.md` | Nouveau | `pacte-associes-review` |
| `comparatif-formes-sociales-fr.md` | Nouveau | `constitution-societe` |
| `calendrier-vie-sociale-fr.md` | Nouveau | `gouvernance-ag` |
| `grille-due-diligence-fr.md` | Nouveau | `due-diligence-dataroom` |

`loi-term-sheet` et `closing-checklist-fr` réutilisent `clauses-sensibles-fr.md` (V1) — pas de nouvelle référence.

Chaque skill ship avec sa propre référence dans le même commit. Seul `articles-c-civ-c-com-index.md` est étendu en amont (Étape 1) car partagé entre les deux clusters.

## Architecture — ce que V1.1 ne touche pas

- **Pas de nouvelle section `CLAUDE.md`** : les 11 sections et garde-fous de V1 couvrent les 6 skills. Seul ajustement : ajout d'un sous-bloc "vie sociale" au §1 (ajout pur, pas de modification de section existante), fait en Étape 1.
- **Pas de nouvel outil `packages/core`** : les 6 skills relèvent du raisonnement juridique et consomment les sources existantes (Légifrance, Pappers/BODACC, Judilibre).
- **Pas de nouvel agent.**
- **Pas de modification du MCP wrapper.**

## Format des skills

Tous les skills V1.1 suivent strictement les patterns canoniques figés en V1 :
- Frontmatter YAML (`name`, `description`, `version`, `authors`, `tags`)
- Bloc disclaimer en citation (brouillon, validation avocat/notaire obligatoire)
- 3-4 blocs `<example>`
- Section `## Chargement du profil`
- Section `## Intake` numérotée avec modes en flags
- Sections `## Étape 1 / 2 / ...`
- Section `## Sortie` avec : note du relecteur (5 champs en gras), arbre de décision 5 options (option 4 = "Surveiller et attendre"), footer A PII en lien Markdown
- Tags de provenance sans backticks en cellules de tableau, tag après citation
- Tout article hors index → `[a verifier]`

## Tests

### Tests internes (solo, comme V1)

- Tests de structure par skill : note du relecteur 5 champs, arbre 5 options, footer A, tags de provenance.
- Un dataset de test par skill :
  - `pacte-associes-review` : pacte d'associés test
  - `constitution-societe` : scénario de choix de forme + jeu de statuts test
  - `gouvernance-ag` : convocation test + PV test
  - `loi-term-sheet` : LOI test (avec pièges binding/non-binding)
  - `due-diligence-dataroom` : data-room test multi-documents
  - `closing-checklist-fr` : scénario de closing test
- `verifier-citations` post-flight et `check-pii` pré-flight intégrés dès la conception (mécanismes V1 réutilisés).

### Validation personas (différée)

- Cluster vie sociale validé par l'ami en premier (le plus disponible).
- Cluster M&A validé par le frère ensuite.
- Même pattern différé que V1.

### Release

L'acceptance V1.1 (datasets internes + validation personas) gate le passage v1.0.0 → v1.1.0. Si les personas valident V1 et V1.1 ensemble dans la même fenêtre, un seul bump v1.1.0 est possible.

## Risques

### R1 — `due-diligence-dataroom` s'appuie sur `revue-tabulaire` (V1, sous test personas)

`due-diligence-dataroom` consomme `revue-tabulaire`. Si les personas révèlent un bug dans `revue-tabulaire`, `due-diligence-dataroom` en hérite.

Mitigation : la consommation est purement additive (`due-diligence-dataroom` n'altère pas `revue-tabulaire`). Un bug corrigé sur `main` se propage automatiquement. La qualité de contenu de `due-diligence-dataroom` est validée séparément par le frère.

### R2 — `constitution-societe` génère des actes

`constitution-societe` est le skill au risque juridique le plus élevé de V1.1 (assistance à la rédaction d'actes constitutifs).

Mitigation en couches — un disclaimer seul ne mitige rien (c'est un plancher de responsabilité, pas un contrôle qualité) :
1. Le mode `--draft` produit un brouillon assisté où chaque point de décision est tagué `[review]` — jamais un document présenté comme « prêt à déposer ».
2. La bifurcation actes authentiques (SSP vs notarié) est active dans la logique du skill, pas seulement mentionnée.
3. `verifier-citations` post-flight (mécanisme V1, mûr) attrape les articles abrogés ou faux.
4. Validation persona par l'ami (qui couvre le droit des sociétés).

### R3 — V1.1 allonge la file de validation persona

Développer V1.1 ne lève pas le goulot d'étranglement personas — ça grossit la file de validation.

Mitigation : accepter ce fait ; ordonner par disponibilité du validateur (cluster ami d'abord). Le cluster frère assume l'attente. V1.1 reste rentable pour le momentum et parce qu'à la libération des personas, V1 et V1.1 se valident ensemble.

### R4 — Recouvrement avec le squelette `hacienda-societes`

`constitution-societe` et `gouvernance-ag` recouvrent des skills du squelette `hacienda-societes`.

Mitigation : V1.1 construit dans `hacienda-droit-affaires` uniquement. La déprécation effective de `hacienda-societes` reste un chantier v2 distinct, cohérent avec la roadmap de la spec V1.

## Hors scope V1.1 (explicite)

| Sujet | Statut |
|---|---|
| Activation des workspaces de dossier | Chantier post-personas distinct |
| `cgv-generator`, `financement-startup` | v1.2 |
| Déprécation du squelette `hacienda-societes` | v2 |
| Nouvel outil `packages/core`, nouvel agent, modification MCP | Hors scope définitif V1.1 |
| Modification d'un skill/agent V1 | Interdit pendant les tests personas (sauf correctif de bug V1) |

## Acceptance Criteria

1. Les 6 skills V1.1 sont implémentés au format canonique V1 (frontmatter, disclaimer, examples, chargement profil, intake, étapes, sortie avec note du relecteur 5 champs + arbre 5 options + footer A).
2. Aucun skill V1, aucun agent V1, aucun fichier `packages/core` n'a été modifié par les commits V1.1 (hors correctif de bug V1 explicitement signalé).
3. `articles-c-civ-c-com-index.md` est étendu avec les articles sociétés (L.223-x, L.225-x, L.227-x, L.228-x), LEGIARTI réels vérifiés via Légifrance.
4. Chaque skill V1.1 ship avec son dataset de test interne et passe les tests de structure.
5. `verifier-citations` post-flight et `check-pii` pré-flight fonctionnent sur les 6 skills.
6. `npm test`, `npm run typecheck`, `npm run build`, `npm run branding:check`, `git diff --check` tous verts après chaque skill mergé.
7. `due-diligence-dataroom` consomme `revue-tabulaire` (V1) sans le modifier, et produit un rapport structuré sur les 7 thèmes.
8. `pacte-associes-review` renvoie vers `PI:contrats-pi` sur les cas à composante PI substantielle.
9. Chaque skill V1.1 a été commité complet (jamais de demi-skill sur `main`).
10. La base `main` a été nettoyée de ses résidus hors périmètre (Tâche 0) avant le premier commit V1.1.

---

*Version 1.0 — spec V1.1 à valider avant écriture du plan d'implémentation.*
