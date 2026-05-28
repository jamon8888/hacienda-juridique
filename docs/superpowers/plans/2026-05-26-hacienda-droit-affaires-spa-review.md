# Hacienda Droit des Affaires SPA Review Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter un skill `spa-review` et améliorer le routage UX M&A pour qu'un cabinet puisse suivre naturellement NDA -> NBO/LOI/Term Sheet -> DD -> SPA -> GAP -> Closing.

**Architecture:** Vague courte et mostly Markdown. Nouveau skill `spa-review` comme orchestrateur SPA ; il ne remplace ni `gap-review`, ni `closing-checklist-fr`, ni `due-diligence-dataroom`, mais les appelle ou les recommande aux bons moments. Aucun nouvel outil `packages/core`, aucun agent, aucune modification des skills existants.

**Tech Stack:** Markdown + YAML frontmatter pour skills Hacienda, datasets Markdown, documentation README / taxonomie / CHANGELOG. Mécanismes existants consommés : `check-pii`, `verifier-citations`, `liste-de-points`, `gap-review`, `closing-checklist-fr`.

**Spec:** `docs/superpowers/specs/2026-05-26-hacienda-droit-affaires-spa-review-design.md`

---

## File Structure

### Fichiers NEUFS

```
plugins/hacienda-droit-affaires/skills/spa-review/
└── SKILL.md

plugins/hacienda-droit-affaires/tests/datasets/v2-spa/
└── spa-review-scenario.md
```

### Fichiers MODIFIES

```
plugins/hacienda-droit-affaires/references/taxonomie-contrats-fr.md
plugins/hacienda-droit-affaires/README.md
plugins/hacienda-droit-affaires/CHANGELOG.md
docs/handoff/latest.md
```

### Responsabilités

| Fichier | Responsabilité |
|---|---|
| `skills/spa-review/SKILL.md` | Workflow de revue SPA / protocole de cession, avec red flags, liste de points, renvois GAP/DD/closing |
| `tests/datasets/v2-spa/spa-review-scenario.md` | Fixture synthétique d'un SPA de cession de titres SAS avec pièges M&A attendus |
| `references/taxonomie-contrats-fr.md` | Routage : `SPA` -> `spa-review`, `NBO` -> `loi-term-sheet` |
| `README.md` | Parcours cabinet M&A lisible |
| `CHANGELOG.md` | Section non publiée pour la vague M&A UX + SPA |
| `docs/handoff/latest.md` | Handoff de fin de session avec état, tests, prochaine étape |

### Composants existants à imiter

| Nouveau composant | Patron à lire |
|---|---|
| `spa-review` | `skills/gap-review/SKILL.md` pour le ton M&A side-dependent |
| `spa-review` | `skills/reviser-contrat/SKILL.md` pour liste de points et sortie contractuelle |
| `spa-review` | `skills/closing-checklist-fr/SKILL.md` pour distinction signing / closing |
| Dataset | `tests/datasets/v1.1/loi-term-sheet-test.md` pour le format "vérité terrain" |

---

## Patterns canoniques à respecter

- Frontmatter YAML : `name`, `description`, `version: "1.0.0"`, `authors: ["Hacienda"]`, `tags`.
- Bloc disclaimer en citation après le titre.
- `## Examples` avec 4 blocs `<example>`.
- `## Chargement du profil`.
- `## Intake` numérotée.
- `## Étape N` pour chaque axe.
- `## Sortie` avec note du relecteur 5 champs en gras : **Sources**, **Lecture**, **Signalé pour ton jugement**, **Fraîcheur**, **Avant de t'appuyer dessus**.
- Arbre de décision exactement 5 options ; option 4 = **Surveiller et attendre**.
- Footer A PII en lien Markdown vers `https://hacienda.diy/ghost` ou `marketplace://hacienda-ghost`, selon le pattern local du skill imité.
- Tags de provenance sans backticks dans les cellules de tableau.
- Tout sujet fiscal, social, PI, réglementaire ou AMF non vérifié reste tagué `[a verifier]`.

---

## Waves overview

| Wave | Périmètre | Dépendances | Commit |
|---|---|---|---|
| Tâche 0 | Préliminaires, worktree, lecture patterns | aucune | pas de commit |
| Wave 1 | `spa-review` + dataset | Tâche 0 | `feat(droit-affaires): skill spa-review` |
| Wave 2 | UX routage M&A : taxonomie + README + CHANGELOG | Wave 1 | `docs(droit-affaires): routage M&A SPA et NBO` |
| Tâche finale | Vérifications + handoff | Wave 2 | `docs(droit-affaires): handoff spa-review` |

---

## Tâche 0 — Préliminaires

**Files:**
- Inspect: `git status`
- Read: spec and existing skill patterns

- [x] **Step 1: Inspecter le worktree**

Run:
```bash
git status --short
```

Expected : seules des modifications attendues apparaissent. Si un fichier non lié est déjà présent, ne pas le modifier. Au moment de la rédaction du plan, `docs/personas/ami-test-brief.md` est non suivi et doit rester intact.

- [x] **Step 2: Lire les patterns de référence**

Run:
```bash
sed -n '1,260p' plugins/hacienda-droit-affaires/skills/gap-review/SKILL.md
sed -n '1,240p' plugins/hacienda-droit-affaires/skills/reviser-contrat/SKILL.md
sed -n '1,220p' plugins/hacienda-droit-affaires/skills/closing-checklist-fr/SKILL.md
sed -n '1,160p' plugins/hacienda-droit-affaires/references/taxonomie-contrats-fr.md
```

Expected : repérer les sections `Chargement du profil`, `Intake`, `Sortie`, les renvois cross-skills, et le style de note du relecteur.

- [x] **Step 3: Confirmer que le changement est Markdown-only**

Run:
```bash
find plugins/hacienda-droit-affaires/mcp-server -maxdepth 3 -type f | sort
```

Expected : aucun fichier MCP à modifier. `spa-review` est un skill Markdown ; pas de changement `packages/core`.

---

## Wave 1 — Skill `spa-review` + dataset

### Task 1: Créer `spa-review/SKILL.md`

**Files:**
- Create: `plugins/hacienda-droit-affaires/skills/spa-review/SKILL.md`

- [x] **Step 1: Créer le dossier**

Run:
```bash
mkdir -p plugins/hacienda-droit-affaires/skills/spa-review
```

Expected : le dossier existe.

- [x] **Step 2: Ecrire le frontmatter et le titre**

Create `plugins/hacienda-droit-affaires/skills/spa-review/SKILL.md` with this beginning:

```markdown
---
name: spa-review
description: >
  Revue d'un SPA / protocole de cession / acte de cession M&A de droit
  français. Analyse l'architecture du deal, prix, conditions suspensives,
  covenants d'interim, MAC, disclosure, garanties, indemnisation, renvois GAP,
  cohérence DD et readiness signing/closing. Side acquéreur ou cédant
  obligatoire. Brouillon soumis à validation avocat M&A.
version: "1.0.0"
authors: ["Hacienda"]
tags: [spa, ma, cession-titres, protocole-cession, signing, closing, gap]
---

# Skill — SPA review

> **BROUILLON, VALIDATION AVOCAT M&A OBLIGATOIRE.**
>
> Ce skill analyse un SPA / protocole de cession / acte de cession dans une
> opération M&A de droit français. Il produit une liste de points de négociation
> et un résumé partner-ready. Il ne signe pas le contrat, ne rédige pas un SPA
> complet à partir de zéro, et ne remplace pas une validation avocat.
>
> **Frontière avec les autres skills.** `spa-review` traite l'architecture du
> SPA et les points de cohérence. La GAP technique reste traitée par
> `/hacienda-droit-affaires:gap-review`. Le pilotage signing / closing /
> post-closing reste traité par `/hacienda-droit-affaires:closing-checklist-fr`.
> L'audit data-room reste traité par `/hacienda-droit-affaires:due-diligence-dataroom`.
```

- [x] **Step 3: Ajouter les Examples**

Append a `## Examples` section with four examples:

```markdown
---

## Examples

<example>
<user>/hacienda-droit-affaires:spa-review ./SPA-cible-X.pdf --side=acquereur --type=cession-titres --prix=12000000 --dd-findings=./rapport-dd.md</user>
<response>
1. Pré-flight `check-pii` sur le SPA et les findings DD.
2. Lecture profil cabinet, bloc M&A / Corporate.
3. Identification : SPA de cession de 100 % des titres d'une SAS, signing et closing différés, prix 12 M EUR.
4. Analyse des axes SPA : deal facts, pouvoirs, CP, interim covenants, MAC, prix, disclosure, GAP, DD, closing.
5. Findings principaux : disclosure letter absente 🔴 ; clause de changement de contrôle client clé non traitée 🔴 ; plafond GAP 8 % du prix 🟠 ; non-concurrence cédant 7 ans 🟠.
6. Renvoi `gap-review` pour la mécanique financière de garantie et `closing-checklist-fr` pour les CP / formalités.
7. Sortie partner-ready : résumé exécutif, red flags, liste de points, recommandation "ne pas signer en l'état".
</response>
</example>

<example>
<user>/hacienda-droit-affaires:spa-review ./SPA-sell-side.pdf --side=cedant --type=cession-titres --red-flags</user>
<response>
Mode `--red-flags`, côté cédant. La sortie se concentre sur les blocages : MAC trop large, garantie de la garantie non plafonnée, covenant d'interim empêchant l'exploitation normale, earn-out discrétionnaire. Les points mineurs sont reportés en annexe courte.
</response>
</example>

<example>
<user>/hacienda-droit-affaires:spa-review ./SPA.pdf --side=acquereur --signing-ready</user>
<response>
Gate signing-ready : le SPA n'est pas prêt à signer. Trois prérequis manquent : disclosure letter annexée, décisions sociales d'agrément, confirmation de levée d'une CP réglementaire. Le skill recommande de lancer `closing-checklist-fr` après correction.
</response>
</example>

<example>
<user>/hacienda-droit-affaires:spa-review ./SPA-portefeuille-PI.pdf --side=acquereur --type=cession-titres</user>
<response>
Détection d'un portefeuille PI structurant dans les actifs de la cible : marques, logiciel, open source, noms de domaine. `spa-review` traite l'architecture M&A et signale les protections SPA nécessaires, puis renvoie vers `/hacienda-propriete-intellectuelle:audit-pi-ma` ou `/hacienda-propriete-intellectuelle:contrats-pi` pour l'analyse PI approfondie.
</response>
</example>
```

- [x] **Step 4: Ajouter Chargement du profil et Intake**

Append:

```markdown
---

## Chargement du profil

> Lire `~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/CLAUDE.md`, bloc M&A / Corporate :
> - **Side habituel M&A** — cédant / acquéreur / conseil des deux.
> - **Posture SPA** — protecteur / équilibré / facilitateur.
> - **Taille de deals typique** — pour calibrer matérialité et niveau de détail.
> - **Matrice d'approbateurs** — ligne "Signature SPA".
> - **Posture GAP par défaut** — pour détecter les écarts grossiers avant renvoi `gap-review`.
> - **Politique PII** — `passive` / `active` / `strict` + seuil B.

Si le profil n'est pas encore peuplé (`[A CONFIGURER]` présent), stopper et
demander `/hacienda-droit-affaires:entretien-demarrage` avant toute revue SPA
substantielle.

---

## Intake

1. **Mode** — `--review` par défaut ; options de sortie `--red-flags`, `--issues-list`, `--signing-ready`.
2. **Fichier SPA** — chemin du PDF / DOCX / Markdown.
3. **Side** — `--side=acquereur` | `--side=cedant` (**obligatoire**). Une analyse neutre d'un SPA n'a pas de sens praticien.
4. **Type d'opération** — `--type=cession-titres` | `--type=cession-fonds` | `--type=asset-deal` | `--type=fusion`. Si absent, auto-détecter puis demander confirmation.
5. **Prix** — `--prix=12000000` si disponible ; sert à calibrer seuils, escrow, plafonds et matérialité.
6. **Findings DD** — `--dd-findings=./rapport-dd.md` optionnel ; active la confrontation DD -> protections SPA.
7. **GAP séparée** — `--gap=./GAP-annexe.pdf` optionnel ; si fourni, renvoyer explicitement vers `gap-review` pour l'analyse technique.
```

- [x] **Step 5: Ajouter les étapes d'analyse**

Append these sections:

```markdown
---

## Étape 1 — Pré-flight + identification

1. Invoquer `check-pii` sur le SPA et, le cas échéant, sur les findings DD.
2. Lire le profil cabinet et identifier le side.
3. Identifier le document : SPA / protocole de cession / acte de cession / asset purchase agreement.
4. Confirmer le type d'opération : cession de titres, cession de fonds, asset deal ou fusion.
5. Identifier parties, cible, prix, signing, closing, droit applicable, juridiction, annexes mentionnées.
6. Détecter SIREN cible si présent et tenter l'enrichissement `companyFullProfile` via les outils core disponibles.

---

## Étape 2 — Deal facts et périmètre

Vérifier :

- titres ou actifs cédés ;
- pourcentage cédé ;
- prix fixe, prix ajustable, locked box, completion accounts, earn-out ;
- date d'effet économique ;
- signing / closing simultanés ou différés ;
- annexes nécessaires au périmètre : cap table, statuts, comptes, dette nette, BFR, liste des contrats clés.

Tout périmètre ambigu est au minimum 🟠, car il contamine le prix, la GAP et le closing.

---

## Étape 3 — Capacité, pouvoirs et restrictions sur titres

Vérifier :

- pouvoirs des signataires ;
- décisions sociales d'autorisation ;
- agrément, préemption, inaliénabilité, droit de sortie conjointe ou forcée ;
- nantissements ou sûretés sur titres ;
- restrictions statutaires ou pacte d'associés.

Si le sujet relève d'une revue de pacte ou statuts complexe, renvoyer vers
`pacte-associes-review` ou `gouvernance-ag` selon le besoin.

---

## Étape 4 — Conditions suspensives et consentements

Recenser chaque CP : objet, bénéficiaire, responsable, délai, preuve de levée,
faculté de renonciation. Vérifier notamment financement, agrément corporate,
autorisation réglementaire, contrôle des investissements étrangers, contrôle
des concentrations, consentements de cocontractants clés.

Une CP nécessaire mais absente est 🔴. Une CP rédigée de façon potestative ou
trop discrétionnaire est 🟠 avec tag `[review]`.

---

## Étape 5 — Période intercalaire, MAC et résiliation

Vérifier :

- covenants d'interim : ordinary course, dette, investissements, embauches, contrats clés ;
- information de l'acquéreur pendant l'interim period ;
- clause MAC : définition, exclusions, seuil, effet ;
- droit de résiliation pré-closing ;
- leakage interdit ou autorisé en locked box.

La MAC et les covenants sont side-dependent : côté acquéreur, rechercher une
protection réelle ; côté cédant, limiter les clauses trop discrétionnaires ou
paralysantes.

---

## Étape 6 — Prix, ajustements et paiement

Vérifier :

- mécanisme locked box ou completion accounts ;
- leakage autorisé / interdit ;
- earn-out : formule déterminable, durée, gouvernance post-closing, audit ;
- séquestre / escrow ;
- mécanisme d'expertise ;
- calendrier de paiement.

Un earn-out sans formule déterminable ou sans gouvernance post-closing est 🟠
ou 🔴 selon matérialité.

---

## Étape 7 — Déclarations, garanties, indemnisation et disclosure

Analyser l'architecture générale :

- déclarations fondamentales ;
- déclarations business ;
- disclosure letter et annexes ;
- exclusions ;
- indemnisation ;
- articulation avec GAP.

Ne pas refaire `gap-review`. Si les clauses de garantie sont substantielles,
renvoyer vers `/hacienda-droit-affaires:gap-review` avec les paramètres déjà
extraits : side, prix, fichiers et findings DD.

---

## Étape 8 — Confrontation DD -> protections SPA

Si `--dd-findings` est fourni, créer un tableau :

| Finding DD | Gravité DD | Protection SPA attendue | Protection trouvée | Statut |
|---|---|---|---|---|

Pour chaque finding matériel, vérifier qu'il est traité par au moins une
protection : CP, déclaration spécifique, indemnité spécifique, escrow, réduction
de prix, engagement post-closing ou abandon documenté.

Si aucun finding DD n'est fourni, mentionner : "Confrontation DD non exécutée ;
un SPA ne peut pas être considéré signing-ready sans revue des findings DD."

---

## Étape 9 — Covenants restrictifs et post-closing

Vérifier non-concurrence cédant, non-sollicitation, confidentialité,
accompagnement post-closing, transition services, obligations de coopération.
Taguer `[review]` sur durée, territoire, activité et contrepartie.

---

## Étape 10 — Renvois et liste de points

Produire les renvois actifs :

- `gap-review` pour la GAP technique ;
- `closing-checklist-fr` pour CP, signing, closing, post-closing ;
- `due-diligence-dataroom` si les findings DD manquent ;
- `hacienda-propriete-intellectuelle` pour PI ;
- `hacienda-fiscal` pour fiscalité ;
- `hacienda-social` pour social ;
- `hacienda-reglementaire` pour autorisations sectorielles.

Appeler mentalement le format `liste-de-points` : tableau trié par criticité
décroissante, sans doublon, avec position souhaitée et formulation proposée.

---

## Étape 11 — Post-flight `verifier-citations`

Vérifier les citations d'articles et de jurisprudence. Les points non vérifiés
restent `[a verifier]`. Les sujets fiscaux, sociaux, PI, AMF ou réglementaires
non traités par une source primaire consultée restent `[a verifier]`.
```

- [x] **Step 6: Ajouter la sortie**

Append:

```markdown
---

## Sortie

### Format livrable

```
[En-tête de confidentialité selon le rôle utilisateur]

> **⚠️ Note du relecteur**
> - **Sources :** Légifrance ✓ / Judilibre ✓ / Pappers ✓ / BODACC ✓ (cocher ✗ si non connectée)
> - **Lecture :** intégrale ({N} pages SPA + {M} annexes) | partielle (pages X à Y)
> - **Signalé pour ton jugement :** {N} éléments marqués [review] | aucun
> - **Fraîcheur :** recherche juridique post-{date} — {N} mises à jour intégrées | rien trouvé
> - **Avant de t'appuyer dessus :** {action concrète : négocier / compléter / escalader / prêt pour relecture}

# SPA review — {cible} — {side}

## Résumé exécutif

{Trois phrases partner-ready : bottom-line, risque dominant, prochaine action.}

## Deal facts

| Champ | Lecture |
|---|---|
| Type d'opération | ... |
| Cible | ... |
| Prix | ... |
| Signing / closing | ... |
| Mécanisme de prix | locked box / completion accounts / earn-out / autre |

## Red flags

| # | Sujet | Statut | Pourquoi ça compte | Action |
|---|---|---|---|---|

## Analyse par axes

1. Deal facts et périmètre
2. Capacité / pouvoirs / restrictions sur titres
3. Conditions suspensives
4. Interim covenants / MAC
5. Prix / ajustements / paiement
6. Garanties / indemnisation / disclosure
7. DD -> protections SPA
8. Covenants restrictifs / post-closing

## Liste de points

| # | Clause | Statut | Risque | Position souhaitée ({side}) | Formulation proposée |
|---|---|---|---|---|---|

## Renvois recommandés

| Sujet | Skill |
|---|---|

## Recommandation

{Signer / Négocier / Ne pas signer / Compléter} — justification 2-3 lignes.

## Une question hors de ma checklist habituelle

{Observation transversale, ou omission si rien d'honnête à dire.}

## Que veux-tu faire ? Choisis une option :

1. **Rédiger** — je prépare un courrier de négociation ou une liste de points prête à envoyer.
2. **Escalader** — je rédige une note vers {approbateur SPA configuré}.
3. **Compléter les faits** — je liste les questions à poser à l'équipe deal, au client ou à la contrepartie.
4. **Surveiller et attendre** — j'ajoute le sujet au tracker du dossier avec date de revisite.
5. **Autre** — précise.

[Ce skill a traité {N} mentions identifiantes. Pour anonymiser automatiquement avant envoi à Claude, installer hacienda-ghost.](https://hacienda.diy/ghost)
```

### Modes courts

- `--red-flags` : ne produire que Note du relecteur, Résumé exécutif, Red flags, Recommandation, Arbre 5 options.
- `--issues-list` : ne produire que Note du relecteur, Deal facts, Liste de points, Renvois, Arbre 5 options.
- `--signing-ready` : produire un verdict `Prêt à signer` / `Pas prêt à signer` / `Prêt sous conditions`, avec conditions manquantes.

## Gate non-juriste

- [ ] Side fourni ou confirmé.
- [ ] Type d'opération fourni ou confirmé.
- [ ] `check-pii` exécuté.
- [ ] Profil M&A lu.
- [ ] Renvois GAP / closing / DD / PI / fiscal / social / réglementaire faits quand nécessaires.
- [ ] Liste de points triée par criticité, sans doublon.
- [ ] Citations vérifiées ou taguées `[a verifier]`.
- [ ] Sortie contient note 5 champs + arbre 5 options + footer PII.

## Ce skill ne fait pas

- Rédiger un SPA complet à partir de zéro.
- Signer ou valider définitivement le SPA.
- Refaire l'analyse technique de la GAP : utiliser `gap-review`.
- Piloter le closing : utiliser `closing-checklist-fr`.
- Auditer une data-room complète : utiliser `due-diligence-dataroom`.
- Donner un avis fiscal, social, PI, réglementaire ou AMF détaillé.

## Ton

Technique, direct, partner-ready. Toujours rappeler le side. Prioriser les
points qui changent la négociation, le signing ou le prix. Ne pas fabriquer de
findings de remplissage.
```

- [x] **Step 7: Vérifier le fichier skill**

Run:
```bash
sed -n '1,260p' plugins/hacienda-droit-affaires/skills/spa-review/SKILL.md
rg -n "TODO|TBD|à compléter|fill in" plugins/hacienda-droit-affaires/skills/spa-review/SKILL.md
```

Expected : le fichier se lit correctement. Le `rg` ne retourne aucune ligne avec `TODO`, `TBD`, `à compléter` ou `fill in`.

### Task 2: Créer le dataset SPA

**Files:**
- Create: `plugins/hacienda-droit-affaires/tests/datasets/v2-spa/spa-review-scenario.md`

- [x] **Step 1: Créer le dossier dataset**

Run:
```bash
mkdir -p plugins/hacienda-droit-affaires/tests/datasets/v2-spa
```

- [x] **Step 2: Ecrire le dataset**

Create `plugins/hacienda-droit-affaires/tests/datasets/v2-spa/spa-review-scenario.md`:

```markdown
# Dataset de test — SPA review (cession de titres SAS)

> **Entry point attendu :** `/hacienda-droit-affaires:spa-review`
> **Objet :** SPA synthétique anonymisé de cession de 100 % des titres d'une SAS
> française, side acquéreur. Aucune donnée réelle.

---

## Contexte fictif

Acquéreur : SOCIETE ATLAS SAS.
Cédants : HOLDING BOREAL SAS et deux fondateurs personnes physiques.
Cible : COMETE SERVICES SAS.
Prix : 12 000 000 EUR.
Opération : cession de 100 % des actions de la Cible.
Signing : 1er septembre 2026.
Closing visé : 31 octobre 2026.
Mécanisme de prix : locked box au 30 juin 2026 + earn-out 2027.

---

## Extraits de clauses fictives

### Article 3 — Conditions suspensives

Le closing interviendra après obtention par l'Acquéreur de son financement et
après réalisation des diligences usuelles. Les Parties conviennent que
l'autorisation administrative sectorielle applicable pourra être obtenue avant
ou après le closing, selon les contraintes de calendrier.

### Article 5 — Prix et locked box

Le prix est fixé sur une base locked box au 30 juin 2026. Les Cédants
s'interdisent tout leakage significatif jusqu'au closing. Le terme leakage
désigne toute sortie de valeur anormale.

### Article 6 — Earn-out

Un complément de prix sera versé aux Cédants si la performance 2027 est
satisfaisante. Le montant sera arrêté de bonne foi par l'Acquéreur après
discussion avec les Cédants.

### Article 8 — Gestion intercalaire

Jusqu'au closing, les Cédants feront leurs meilleurs efforts pour que la Cible
poursuive ses activités dans des conditions raisonnables.

### Article 9 — MAC

L'Acquéreur pourra refuser de réaliser le closing en cas d'événement ayant ou
susceptible d'avoir un effet défavorable sur la Cible, son activité, ses
perspectives, son marché ou son environnement économique.

### Article 11 — Déclarations et garanties

Les Cédants consentent les déclarations usuelles figurant en annexe. La
disclosure letter sera communiquée ultérieurement.

Le plafond global d'indemnisation est fixé à 8 % du prix de cession. Les
garanties générales expirent 12 mois après le closing.

### Article 12 — Contrat client clé

Les Parties reconnaissent qu'un contrat représentant 35 % du chiffre d'affaires
de la Cible contient une clause de changement de contrôle. Aucune démarche
particulière n'est requise avant le closing.

### Article 14 — Non-concurrence

Les Cédants s'interdisent, pendant 7 ans à compter du closing, toute activité
directe ou indirecte susceptible de concurrencer la Cible en Europe.

### Article 18 — Formalités

Les Parties accompliront les formalités post-closing usuelles.

---

## Vérité terrain — findings attendus

1. **CP réglementaire fragile — 🔴.** L'autorisation sectorielle est traitée
   comme post-closing possible alors qu'elle conditionne potentiellement la
   réalisation. Le skill doit demander si elle est obligatoire avant closing et
   recommander une CP claire ou un renvoi `hacienda-reglementaire`.
2. **Locked box / leakage imprécis — 🟠.** "Leakage significatif" et "sortie de
   valeur anormale" sont trop vagues. Il faut une définition, exceptions,
   reporting et remède.
3. **Earn-out indéterminé — 🔴.** Montant arrêté de bonne foi par l'acquéreur
   sans formule ni mécanisme d'expertise. Risque de contentieux.
4. **Interim covenant vague — 🟠.** "Meilleurs efforts" et "conditions
   raisonnables" ne suffisent pas pour protéger la valeur entre signing et
   closing.
5. **MAC trop large — 🟠 côté acquéreur / 🔴 côté cédant.** Largeur extrême :
   perspectives, marché, environnement économique, sans seuil ni exclusions.
6. **Disclosure letter absente — 🔴.** Elle est annoncée comme ultérieure ; pas
   de signing-ready sans annexe.
7. **GAP faible — 🟠.** Plafond 8 % et durée 12 mois sont bas côté acquéreur ;
   renvoi `gap-review` obligatoire pour analyse technique.
8. **Finding DD non couvert — 🔴.** Contrat client clé 35 % CA avec change of
   control : il faut CP d'obtention du consentement, garantie spécifique,
   indemnité ou réduction de prix.
9. **Non-concurrence cédant excessive — 🟠.** 7 ans + Europe + activité indirecte
   très large ; tag `[review]`.
10. **Formalités post-closing insuffisantes — 🟠.** Phrase générique ; renvoi
    `closing-checklist-fr` pour registre de mouvements de titres, comptes
    d'associés, droits d'enregistrement et RCS le cas échéant.

## Critères de succès

- [ ] Le skill exige ou confirme `--side=acquereur`.
- [ ] Le skill identifie l'opération comme cession de titres SAS.
- [ ] Les dix findings ci-dessus apparaissent ou sont regroupés sans perte de substance.
- [ ] `gap-review` est recommandé pour l'analyse technique de la GAP.
- [ ] `closing-checklist-fr` est recommandé pour les formalités.
- [ ] `hacienda-reglementaire` est recommandé pour l'autorisation sectorielle.
- [ ] La sortie contient note du relecteur 5 champs, red flags, liste de points, recommandation et arbre 5 options.
- [ ] Les sujets non vérifiés sont tagués `[a verifier]`.
```

- [x] **Step 3: Vérifier le dataset**

Run:
```bash
sed -n '1,260p' plugins/hacienda-droit-affaires/tests/datasets/v2-spa/spa-review-scenario.md
rg -n "TODO|TBD|fill in" plugins/hacienda-droit-affaires/tests/datasets/v2-spa/spa-review-scenario.md
```

Expected : lecture complète ; aucune ligne `TODO`, `TBD` ou `fill in`.

- [x] **Step 4: Commit Wave 1**

Run:
```bash
git add plugins/hacienda-droit-affaires/skills/spa-review/SKILL.md plugins/hacienda-droit-affaires/tests/datasets/v2-spa/spa-review-scenario.md
git commit -m "feat(droit-affaires): skill spa-review"
```

---

## Wave 2 — UX de routage M&A

### Task 3: Mettre à jour la taxonomie contrats

**Files:**
- Modify: `plugins/hacienda-droit-affaires/references/taxonomie-contrats-fr.md`

- [x] **Step 1: Lire la section M&A**

Run:
```bash
sed -n '35,70p' plugins/hacienda-droit-affaires/references/taxonomie-contrats-fr.md
```

- [x] **Step 2: Modifier les lignes SPA / LOI**

Edit the `Contrats M&A et corporate` table so these rows become:

```markdown
| SPA / protocole de cession | Cession de titres, déclarations et garanties, conditions suspensives, signing / closing | 🟢 `spa-review` pour la revue M&A ; 🔵 `gap-review` si le focus porte uniquement sur la GAP |
| APA / cession de fonds ou d'actifs | Transfert d'actifs, contrats, salariés, passifs repris / exclus | 🟢 `spa-review` si l'acte est transactionnel M&A ; 🟢 `reviser-contrat` pour une revue commerciale simple |
| NBO / Non-Binding Offer | Offre indicative non engageante, prix indicatif, périmètre, conditions, calendrier, exclusivité éventuelle | 🟢 `loi-term-sheet` |
| LOI / term sheet | Précontractuel, exclusivité, confidentialité, répartition des coûts, binding / non-binding | 🟢 `loi-term-sheet` |
```

Keep the `GAP` and `Closing checklist` rows, updating `Closing checklist` from `⚪ v1.1+` to:

```markdown
| Closing checklist | Pilotage closing, pièces, conditions suspensives, formalités post-closing | 🟢 `closing-checklist-fr` |
```

- [x] **Step 3: Mettre à jour la légende**

In `## Légende skill recommandé`, add:

```markdown
- `🟢 droit-affaires:spa-review` — workflow SPA / protocole de cession M&A
- `🟢 droit-affaires:loi-term-sheet` — workflow NBO / LOI / term sheet
- `🟢 droit-affaires:closing-checklist-fr` — workflow signing / closing / post-closing
```

Do not remove existing legend entries unless a duplicate is created.

- [x] **Step 4: Vérifier la taxonomie**

Run:
```bash
rg -n "SPA|NBO|Non-Binding|LOI|Closing checklist|v1\\.1\\+" plugins/hacienda-droit-affaires/references/taxonomie-contrats-fr.md
```

Expected : SPA routes to `spa-review`; NBO routes to `loi-term-sheet`; Closing routes to `closing-checklist-fr`.

### Task 4: Mettre à jour README et CHANGELOG

**Files:**
- Modify: `plugins/hacienda-droit-affaires/README.md`
- Modify: `plugins/hacienda-droit-affaires/CHANGELOG.md`

- [x] **Step 1: Ajouter le parcours M&A dans README**

In `plugins/hacienda-droit-affaires/README.md`, after the `## Périmètre v1` table or after the plugin companion section, add:

```markdown
## Parcours cabinet M&A

| Moment du deal | Skill |
|---|---|
| NDA / confidentialité data-room | `reviser-nda` |
| NBO / LOI / Term Sheet | `loi-term-sheet` |
| Due diligence data-room | `due-diligence-dataroom` |
| SPA / protocole de cession | `spa-review` |
| Garantie d'Actif et de Passif | `gap-review` |
| Signing / closing / post-closing | `closing-checklist-fr` |

`spa-review` est l'entrée naturelle pour un SPA complet. Il orchestre les
renvois vers `gap-review` pour la GAP, `due-diligence-dataroom` pour les
findings DD et `closing-checklist-fr` pour le pilotage du closing.
```

- [x] **Step 2: Ajouter une section CHANGELOG**

At the top of `plugins/hacienda-droit-affaires/CHANGELOG.md`, add:

```markdown
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
```

- [x] **Step 3: Vérifier README et CHANGELOG**

Run:
```bash
rg -n "Parcours cabinet M&A|spa-review|NBO|Non-Binding|M&A UX" plugins/hacienda-droit-affaires/README.md plugins/hacienda-droit-affaires/CHANGELOG.md
```

Expected : all new routing and UX text appears.

- [x] **Step 4: Commit Wave 2**

Run:
```bash
git add plugins/hacienda-droit-affaires/references/taxonomie-contrats-fr.md plugins/hacienda-droit-affaires/README.md plugins/hacienda-droit-affaires/CHANGELOG.md
git commit -m "docs(droit-affaires): routage M&A SPA et NBO"
```

---

## Tâche finale — Vérifications + handoff

### Task 5: Vérifications globales

**Files:**
- Inspect all changed files
- Modify: `docs/handoff/latest.md`

- [x] **Step 1: Vérifier le périmètre**

Run:
```bash
git diff --stat HEAD~2..HEAD -- plugins/hacienda-droit-affaires/
```

Expected : only new `spa-review`, new `tests/datasets/v2-spa`, and docs/reference updates listed. No existing skill directory except the new one.

- [x] **Step 2: Vérifier qu'aucun skill existant n'a été modifié**

Run:
```bash
git diff --name-only HEAD~2..HEAD -- plugins/hacienda-droit-affaires/skills
```

Expected : only `plugins/hacienda-droit-affaires/skills/spa-review/SKILL.md`.

- [x] **Step 3: Rechercher placeholders et erreurs de branding**

Run:
```bash
rg -n "TODO|TBD|fill in|Claude Code|Anthropic|OpenAI|ChatGPT" plugins/hacienda-droit-affaires/skills/spa-review plugins/hacienda-droit-affaires/tests/datasets/v2-spa plugins/hacienda-droit-affaires/README.md plugins/hacienda-droit-affaires/references/taxonomie-contrats-fr.md plugins/hacienda-droit-affaires/CHANGELOG.md
```

Expected : no matches except legitimate existing product names if already present outside changed sections. New text must contain only Hacienda branding.

- [x] **Step 4: Lancer les vérifications minimales** (typecheck + build = échecs **pré-existants** identifiés au commit `828b180` — non causés par spa-review ; test + branding + diff = ✅)

Run:
```bash
npm test
npm run typecheck
npm run build
npm run branding:check
git diff --check
```

Expected : all commands exit 0.

- [x] **Step 5: Mettre à jour le handoff**

Replace `docs/handoff/latest.md` content with a new handoff summarizing:

```markdown
# Handoff — hacienda-droit-affaires M&A UX + SPA review

## Session courante

- **Date :** 2026-05-26
- **Objet :** amélioration UX cabinet M&A + skill `spa-review`

## État livraison

Vague M&A UX livrée :
- `spa-review` ajouté ;
- dataset `v2-spa/spa-review-scenario.md` ajouté ;
- taxonomie routage M&A mise à jour : `NBO` -> `loi-term-sheet`, `SPA` -> `spa-review` ;
- README enrichi avec le parcours cabinet M&A.

## Vérifications

- `npm test` : exit 0, nombre de tests passants relevé dans la sortie terminal
- `npm run typecheck` : exit 0
- `npm run build` : exit 0
- `npm run branding:check` : exit 0
- `git diff --check` : exit 0

## Notes

- Aucun outil `packages/core` ajouté.
- Aucun skill V1/V1.1/V1.2/V2a existant modifié.
- `spa-review` orchestre `gap-review`, `due-diligence-dataroom` et `closing-checklist-fr` sans les remplacer.

## Prochaine étape

Validation persona frère sur le flux : NDA -> NBO/LOI/Term Sheet -> DD -> SPA -> GAP -> Closing.
```

Dans la ligne `npm test`, remplacer "nombre de tests passants relevé dans la sortie terminal" par le compteur exact affiché par la commande.

- [x] **Step 6: Commit handoff**

Run:
```bash
git add docs/handoff/latest.md
git commit -m "docs(droit-affaires): handoff spa-review"
```

---

## Final Verification Checklist

- [x] `plugins/hacienda-droit-affaires/skills/spa-review/SKILL.md` exists and follows canonical structure.
- [x] Dataset `plugins/hacienda-droit-affaires/tests/datasets/v2-spa/spa-review-scenario.md` exists.
- [x] Taxonomy routes SPA to `spa-review`.
- [x] Taxonomy routes NBO / Non-Binding Offer to `loi-term-sheet`.
- [x] README contains "Parcours cabinet M&A".
- [x] CHANGELOG contains "M&A UX + SPA review".
- [x] No existing skill except the new `spa-review` changed.
- [x] `npm test` : 68/70 passants, 1 skipped, 1 échec **pré-existant** hors scope (`hacienda-pi-cowork-structure` PISTE OAuth 401). Spa-review guardrails fix appliqué.
- [ ] `npm run typecheck` : **échec pré-existant** sur PI MCP server (`toolGroups`) — confirmé présent au commit parent `7cc5779`, non causé par spa-review. À traiter dans PR #16.
- [ ] `npm run build` : **échec pré-existant** sur droit-affaires MCP server (imports `bodaccBySirenTool` etc. manquants dans `@hacienda/core`) — fichier non touché par nos commits, dernière modif au commit `828b180`. À traiter dans PR #16.
- [x] `npm run branding:check` passes.
- [x] `git diff --check` passes.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-26-hacienda-droit-affaires-spa-review.md`. Recommended execution mode: `superpowers:subagent-driven-development`, one wave at a time, with review after Wave 1 before touching routing docs.
