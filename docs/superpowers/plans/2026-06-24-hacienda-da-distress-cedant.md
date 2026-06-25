# `distress-cedant` Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Livrer `distress-cedant`, le routeur d'entonnoir côté cédant/débiteur du moat distressed-M&A (miroir de `asset-vs-share-distress`), puis le valider en scoring blind 4 phases (cible ADMIS gate-clean, cycle `DCD1RT`).

**Architecture:** Skill markdown sur le squelette V2 canonique (`SKILL.md` + wrapper de commande jumeau), branché dans le routeur global `cas` par un fork de side, documenté dans le README, versionné (0.12.0 → 0.13.0) et enregistré dans le wrapper de scoring `scripts/da-scoring.sh` avec un dataset fictif. Aucun code applicatif : la valeur est doctrinale (le pivot 45 j route à l'inverse du côté repreneur) et la « suite de tests » est le contrat de structure existant (`hacienda-droit-affaires-cowork-structure.test.ts`) + `branding:check` + `typecheck` + `build`, puis le scoring blind.

**Tech Stack:** Markdown (skills/commands), JSON (manifests de version), Bash (`scripts/da-scoring.sh`), Vitest (test de structure dans `packages/core`), Codex GPT-5.5 (phases 2 & 4 du scoring), Claude (phase 3 live).

## Global Constraints

- **Branding Hacienda only** — aucun chemin, manifest, agent, skill ou doc non-Hacienda ; produit en français ; licence AGPL-3.0-or-later.
- **Préfixe de commande** : `/h-da:` uniquement. Les chaînes `/h-droit-affaires:` et `/hacienda-droit-affaires:` sont interdites partout (test `keeps … aligned`).
- **Noms d'outils MCP exacts** dans le SKILL.md : `piste_status`, `legifrance_recherche`, `judilibre_recherche`, `eurlex_recherche` doivent apparaître littéralement (test `declares exact MCP tool names`). Les formes camelCase `companyFullProfile` / `bodaccProcedures` / `bodaccBySiren` / `judilibreSearch` sont interdites.
- **Squelette V2 canonique** — chaque SKILL.md doit contenir, dans cet ordre : `## Examples`, `## Chargement du profil`, `## Intake`, `## Gate non-juriste`, (`## Mode Anno Desktop Optionnel` optionnel), `## Outils MCP à privilégier`, `## Emplacement des sorties`, `## Sortie`. Frontmatter : `version: "2.0.0"` (jamais `1.0.0`), `argument-hint:` présent, **pas de CRLF** (`\r\n` interdit).
- **Wrapper de commande** : `description` et `argument-hint` identiques **au caractère près** à ceux du SKILL.md ; doit contenir `` Use the `distress-cedant` skill `` et `$ARGUMENTS`.
- **Count de skills** : `29 → 30` (assertion `expect(skillFiles.length).toBe(29)` → `30` ; le count de commandes en dérive automatiquement).
- **Version** : bump `0.12.0 → 0.13.0` dans les 6 emplacements (voir Task 3).
- **Code de cycle de scoring** : exactement **6 caractères** alphanumériques majuscules — `DCD1RT` (le validateur du wrapper rejette 5 caractères : leçon RD1RT→RDG1RT).
- **Anti-fabrication** : ne jamais convertir une approximation client en date calendaire ; le pivot 45 j s'apprécie **conditionnellement** tant que la date de CdP n'est pas établie. Ne rien chiffrer (insuffisance, passif, caution). Ne pas évaluer l'expo dirigeant ni requalifier finement la CdP. Ne pas trancher le fork à la place du client.
- **Token economy scoring** : Claude **prépare** les prompts (via `scripts/da-scoring.sh`) ; **Candy lance** les commandes Codex/agrégation. Ne pas exécuter les phases de scoring côté Claude.

---

## File Structure

| Fichier | Rôle | Action |
|---|---|---|
| `plugins/hacienda-droit-affaires/skills/distress-cedant/SKILL.md` | Le skill (routeur cédant) | Créer |
| `plugins/hacienda-droit-affaires/commands/h-da/distress-cedant.md` | Wrapper de commande jumeau | Créer |
| `plugins/hacienda-droit-affaires/skills/cas/SKILL.md` | Routeur global — fork de side sur la ligne « entreprise en difficulté » | Modifier |
| `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts` | Contrat de structure — count 29→30 | Modifier (ligne 222) |
| `plugins/hacienda-droit-affaires/README.md` | Tableau Commandes + ligne Périmètre V2 | Modifier |
| `plugins/hacienda-droit-affaires/version.json` | Version | Modifier |
| `plugins/hacienda-droit-affaires/manifest.json` | Version | Modifier |
| `plugins/hacienda-droit-affaires/mcp-server/package.json` | Version | Modifier |
| `plugins/hacienda-droit-affaires/.claude-plugin/plugin.json` | Version | Modifier |
| `plugins/hacienda-droit-affaires/.claude-plugin/marketplace.json` | Version | Modifier |
| `.claude-plugin/marketplace.json` (racine) | Version (entrée DA) | Modifier |
| `plugins/hacienda-droit-affaires/CHANGELOG.md` | Entrée 0.13.0 | Modifier |
| `scripts/da-scoring.sh` | SKILLS array + 5 fonctions case + heredoc usage | Modifier |
| `plugins/hacienda-droit-affaires/tests/datasets/da-distress-cedant/scenario.md` | Dataset fictif de scoring | Créer |

---

## Task 1: Skill `distress-cedant` + wrapper + count de structure

Le cœur. On met d'abord à jour le contrat de structure (count 29→30), on le regarde échouer (skill/commande absents), puis on crée le SKILL.md et le wrapper jusqu'au vert.

**Files:**
- Modify: `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts:222`
- Create: `plugins/hacienda-droit-affaires/skills/distress-cedant/SKILL.md`
- Create: `plugins/hacienda-droit-affaires/commands/h-da/distress-cedant.md`

**Interfaces:**
- Consumes: profil cabinet `~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/CLAUDE.md` (blocs M&A + procédures collectives) ; outils MCP `company_full_profile`, `bodacc_by_siren`, `bodacc_procedures`, `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `eurlex_recherche`, `eurlex_consulter` ; skills routés `prevention-difficultes`, `declaration-cessation-paiements`, `pre-pack-cession`, `responsabilite-dirigeant`, `check-pii`, `verifier-citations`.
- Produces: skill `distress-cedant` invocable via `/h-da:distress-cedant` ; chaîne de frontmatter `description` et `argument-hint` réutilisées **à l'identique** par le wrapper et (en Task 4) par `da-scoring.sh`.

- [ ] **Step 1: Mettre à jour le count attendu (test d'abord)**

Dans `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts`, ligne 222, remplacer :

```ts
    expect(skillFiles.length).toBe(29);
```

par :

```ts
    expect(skillFiles.length).toBe(30);
```

- [ ] **Step 2: Lancer la suite de structure et vérifier l'échec**

Run: `npx vitest run packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts`
Expected: FAIL — le test `declares explicit V2 metadata…` échoue (`skillFiles.length` vaut 29, attendu 30) car le skill n'existe pas encore.

- [ ] **Step 3: Créer le SKILL.md**

Créer `plugins/hacienda-droit-affaires/skills/distress-cedant/SKILL.md` avec **exactement** ce contenu :

````markdown
---
name: distress-cedant
description: >
  Note d'orientation côté cédant/débiteur (dirigeant ou actionnaire d'une
  entreprise en difficulté, et son conseil M&A/PE) pour éclairer l'arbitrage
  stratégique sauver / céder / déposer et router vers la bonne feuille. Dernière
  pièce et routeur du pan cédant/débiteur du moat distressed-M&A, miroir de
  `asset-vs-share-distress` (côté repreneur) : il décide et oriente, il n'exécute
  pas. Double gate : (1) diagnostic du niveau de difficulté + routage selon le
  pivot des 45 jours — cessation des paiements > 45 j non déclarée → obligation de
  déclarer → `declaration-cessation-paiements` (et NON la prévention, à l'inverse
  du côté repreneur) ; CdP ≤ 45 j ou non caractérisée → `prevention-difficultes`
  (sauver) ou `pre-pack-cession` (céder) ; (2) exposition du dirigeant transverse —
  déposer tard aggrave (faute de gestion, L.651-2, L.653-8, période suspecte),
  signalée et routée vers `responsabilite-dirigeant`, jamais évaluée ici.
  Diagnostique grossièrement pour router, ne requalifie pas finement la CdP, ne
  chiffre rien, ne tranche pas le fork à la place du client. Côté cédant/débiteur
  uniquement. N'exécute pas (ni demande de prévention, ni déclaration, ni montage
  de cession, ni évaluation de responsabilité) et ne donne AUCUN conseil fiscal.
  Brouillon, validation humaine (avocat) OBLIGATOIRE.
version: "2.0.0"
argument-hint: "[note d'orientation (mode unique), entreprise à quel stade de difficulté ?, cessation des paiements datée ? depuis plus de 45 j ?, sauver / céder / déposer ?, côté cédant/débiteur]"
authors: ["Hacienda"]
tags: [distress-cedant, orientation, distressed-m&a, restructuring, cessation-paiements, pivot-45-jours, exposition-dirigeant, routeur, cedant]
---

# Skill — Orientation distress côté cédant (routeur d'entonnoir)

> **BROUILLON, VALIDATION HUMAINE (AVOCAT) OBLIGATOIRE.**
>
> **🔴 Double gate.**
> - **Gate 1 — diagnostic du niveau de difficulté + routage (pivot 45 j)** : situer
>   l'entreprise — *in bonis* avec difficultés / amiable (mandat ad hoc,
>   conciliation) / CdP ≤ 45 j / CdP > 45 j / RJ-LJ ouverte — détermine les voies
>   encore ouvertes et **route**. **Point critique — le pivot route à l'INVERSE du
>   côté repreneur** : ici le débiteur **EST celui qui doit déclarer**, donc si la
>   **cessation des paiements date de plus de 45 jours et n'est pas déclarée**,
>   l'amiable est **fermé** (L.611-4) et l'obligation de déclarer s'impose (L.631-4)
>   → **renvoi `declaration-cessation-paiements`**. Ne JAMAIS renvoyer un débiteur en
>   CdP > 45 j vers la prévention : c'est l'erreur qui trompe le client (dépôt manqué
>   → faute de gestion, expo L.651-2 / L.653-8).
> - **Gate 2 — exposition du dirigeant (transverse)** : quel que soit le fork, le
>   choix de la voie **engage le patrimoine du dirigeant** — déposer tard aggrave
>   (faute de gestion, L.651-2, L.653-8, période suspecte) ; une conciliation L.611-4
>   demandée à temps atténue le reproche de retard. **Signaler et router vers
>   `responsabilite-dirigeant`, jamais évaluer ici.**
>
> **Point pivot.** Ce skill **décide et route**, il **n'exécute pas**. Il ne rédige
> ni demande de prévention, ni déclaration de cessation des paiements, ni montage de
> cession ; il n'évalue pas la responsabilité du dirigeant ni ne requalifie finement
> la CdP ; il ne donne **aucun conseil fiscal** (flag + renvoi conseil fiscal).

## Examples

1. **Pivot 45 j (l'erreur qui trompe).** Le dirigeant indique « on ne paie plus
   personne depuis l'automne » et rien n'est déclaré. → Gate 1 : si la **CdP date de
   plus de 45 jours**, l'amiable est **fermé** et la déclaration est **obligatoire** →
   renvoi `declaration-cessation-paiements`. **Ne pas** le renvoyer vers la
   prévention (à l'inverse du côté repreneur) — ce serait l'erreur qui trompe le
   client. La date reste **conditionnelle** tant qu'elle n'est pas établie par pièces.

2. **Fork sauver / céder / déposer non tranché.** Le client veut « vendre vite pour
   sauver les meubles » mais la **CdP n'est pas caractérisée** ou date de moins de
   45 j. → Gate 1 : l'amiable et la cession préparée sont **encore ouverts** —
   éclairer les trois voies (`prevention-difficultes` / `pre-pack-cession` /
   `declaration-cessation-paiements`) sans trancher à la place du client `[review]`.

3. **Exposition dirigeant à signaler-pas-évaluer.** Le dirigeant s'inquiète d'un
   retard de déclaration et d'une caution personnelle. → Gate 2 : signaler que le
   choix de la voie engage son patrimoine (faute de gestion, L.651-2, L.653-8) et
   **router** vers `responsabilite-dirigeant` pour l'évaluation des 4 axes. Ce skill
   **ne chiffre pas** l'insuffisance et **n'évalue pas** l'expo.

## Chargement du profil

> Lire `~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/CLAUDE.md`, bloc M&A + bloc procédures collectives :
> - **Position dominante** — ce skill suppose le **côté cédant / débiteur** (le dirigeant ou l'actionnaire de l'entreprise en difficulté, et son conseil)
> - **Side M&A habituel** — cédant ; taille de deals typique
> - **Politique PII** — `passive` / `active` (défaut) / `strict` + seuil B

Si le bloc est `[A CONFIGURER]` : stopper et demander `/h-da:entretien-demarrage`.

---

## Intake

1. **Côté** — **cédant / débiteur** (dirigeant ou actionnaire de l'entreprise en difficulté, et son conseil). Pas de mode neutre ; côté repreneur hors périmètre (→ `asset-vs-share-distress`).
2. **Niveau de difficulté** — *in bonis* avec difficultés / amiable (mandat ad hoc, conciliation) / **CdP ≤ 45 j** / **CdP > 45 j** / **RJ-LJ ouverte** ? **cessation des paiements** datée ? depuis plus de 45 jours ? (**déterminant** — voir Gate 1, lookup BODACC).
3. **Intention stratégique** — le client penche-t-il pour **sauver** (restructurer), **céder** (vendre l'entreprise) ou **déposer** (dépôt de bilan) ? pourquoi ? (le niveau de difficulté **détermine** lesquelles de ces voies sont encore ouvertes).
4. **Date de la CdP** — déductible de pièces datées (relances, échéances impayées, courriels) ou fixée par le tribunal ? (**déterminant** — pivot 45 j ; **ne pas fabriquer**, raisonner conditionnellement tant que la date n'est pas établie).
5. **Exposition du dirigeant** — **caution personnelle** ? retard de déclaration déjà constitué ? signaux de faute de gestion (poursuite d'activité déficitaire, actes en période suspecte) ? (à **signaler** comme facteur du fork, **pas à évaluer** — Gate 2).
6. **Objectifs fiscaux** — déficits reportables, droits d'enregistrement, solidarité (dimension fiscale → flag + renvoi conseil fiscal, pas d'avis).

---

## Gate non-juriste

- [ ] Pré-flight `check-pii` exécuté et décision utilisateur respectée
- [ ] **Gate 1 — niveau de difficulté tranché** : entreprise située sur le spectre (in bonis / amiable / CdP ≤45 j / CdP >45 j / RJ-LJ) ; **CdP > 45 j non déclarée → STOP fork + renvoi `declaration-cessation-paiements`** (PAS la prévention — pivot inverse du côté repreneur)
- [ ] **Routage identifié** : sauver → `prevention-difficultes` ; céder → `pre-pack-cession` ; déposer → `declaration-cessation-paiements` ; RJ/LJ subie + cession judiciaire en cours → **signaler le rôle limité du débiteur** (les organes pilotent ; pas de feuille débiteur dédiée)
- [ ] **Gate 2 — exposition dirigeant signalée** : le choix de la voie engage le patrimoine (faute de gestion, L.651-2, L.653-8, période suspecte) → renvoi `responsabilite-dirigeant` ; **signalée, jamais évaluée ici**
- [ ] **Fork non tranché à la place du client** : éclairer sauver / céder / déposer, recommander, laisser décider `[review]`
- [ ] **Date de CdP non fabriquée** : pivot 45 j apprécié **conditionnellement** tant que la date n'est pas établie par pièces / tribunal
- [ ] **Rien chiffré** (insuffisance, passif, caution) ni requalifié finement (CdP → `declaration-cessation-paiements`)
- [ ] **Aucun conseil fiscal** donné : déficits / droits d'enregistrement / solidarité → flag + renvoi conseil fiscal
- [ ] Côté cédant/débiteur déclaré ; le skill décide et route, **n'exécute pas**
- [ ] Citations vérifiées via `verifier-citations` ou taguées `[à vérifier]`

---

## Outils MCP à privilégier

- Identification entreprise + procédures publiées : `company_full_profile`, `bodacc_by_siren`, `bodacc_procedures` (situer le niveau de difficulté, détecter une procédure ouverte, le type, les dates de jugement / publication).
- Socle sources officielles : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `eurlex_recherche`, `eurlex_consulter`.

---

## Emplacement des sorties

```
outputs/distress-cedant-<entreprise-slug>-YYYY-MM-DD.md
```

---

## Sortie

### Format livrable

```
[En-tête de confidentialité selon le rôle]

> ⚠️ Note du relecteur
> - **Sources :** Légifrance ✓ / BODACC ✓ / Judilibre ✓ (cocher ✗ si non connectée)
> - **Lecture :** situation décrite + {N} pièces
> - **Signalé pour ton jugement :** {N} éléments [review] (niveau de difficulté, choix de voie, exposition dirigeant, dimension fiscale) | aucun
> - **Fraîcheur :** réforme du 15 septembre 2021 (ord. transposition directive restructuration) — vérifier seuils/délais en vigueur | recherche impossible
> - **Avant de t'appuyer dessus :** {action — ex. faire confirmer la date de cessation des paiements par l'expert-comptable} | « prêt pour relecture »

# Orientation distress — note [CÔTÉ cédant/débiteur]

# 1. Diagnostic du niveau de difficulté (Gate 1)
- Entreprise située : {in bonis avec difficultés / amiable / CdP ≤45 j / CdP >45 j / RJ-LJ ouverte} (lookup BODACC). Cessation des paiements : {datée le … / > 45 j ? / non caractérisée} [review]
- {Si **CdP > 45 j non déclarée** → l'amiable est fermé (L.611-4) → obligation de déclarer (L.631-4) → renvoi `declaration-cessation-paiements`.}

# 2. Arbitrage sauver / céder / déposer
| Voie | Quand | Vers |
|---|---|---|
| **Sauver** (prévention / restructuration) | pas / plus en CdP ou CdP ≤45 j | `prevention-difficultes` |
| **Céder** (cession préparée) | amiable ou pré-procédure | `pre-pack-cession` |
| **Déposer** (dépôt de bilan) | CdP >45 j ou redressement impossible | `declaration-cessation-paiements` |
- Le niveau de difficulté **détermine** les voies encore ouvertes ; ne pas trancher à la place du client [review]

# 3. Exposition du dirigeant (Gate 2 — transverse)
- Le choix de la voie engage le patrimoine du dirigeant ; **déposer tard aggrave** (faute de gestion, L.651-2, L.653-8, période suspecte). Conciliation L.611-4 demandée à temps = atténuant.
- → `/h-da:responsabilite-dirigeant` pour l'évaluation des 4 axes. {Signalé, pas évalué.}

# 4. Recommandation & routage
- Voie recommandée : {sauver / céder / déposer} — justification distress-aware [review]
- **Renvois :**
  - `/h-da:prevention-difficultes` — si on sauve (mandat ad hoc / conciliation / sauvegarde accélérée).
  - `/h-da:pre-pack-cession` — si on cède (cession préparée confidentiellement en amont).
  - `/h-da:declaration-cessation-paiements` — si on dépose (CdP > 45 j ou redressement impossible).
  - `/h-da:responsabilite-dirigeant` — exposition personnelle du dirigeant (4 axes).
  - **Conseil fiscal externe** — pour toute dimension fiscale (déficits, droits d'enregistrement, solidarité).
- {Si RJ/LJ subie + cession judiciaire en cours : rôle limité du débiteur ; les organes pilotent ; les skills repreneur (`reprise-a-la-barre` / `cession-actifs-isoles`) sont côté acheteur.}

# Une question hors de ma checklist habituelle
{Observation transversale — ex. articulation prix / garantie dans une cession distress, intérêt d'une NEWCO, opportunité d'une conciliation avant cession. Omettre si rien d'honnête.}

# Que veux-tu faire ? Choisis une option :
1. **Rédiger** — note de recommandation de voie pour le client / les actionnaires.
2. **Escalader** — note vers {approbateur configuré} pour décision stratégique.
3. **Compléter les faits** — questions (date de CdP, état du passif, calendrier).
4. **Surveiller et attendre** — suivi avec point de revisite.
5. **Autre** — précise.
```

**Mode silencieux** si le livrable est destiné au dirigeant / aux actionnaires (non-juristes) : couper la narration de skill, sortir les renvois inter-commandes dans la note du relecteur, garder l'en-tête de confidentialité + une note du relecteur condensée.

---

## Étape 1 — Pré-flight et Gate 1 (diagnostic + routage, pivot 45 j)

1. Invoquer `check-pii`. Lire le profil cabinet (blocs M&A + procédures collectives) et confirmer le **côté cédant/débiteur**. Raisonner **à la date du jour** (dates absolues pour le diagnostic) mais **ne pas fabriquer la date de CdP**.
2. Vérifier via `bodacc_procedures` / `bodacc_by_siren` / `company_full_profile` où en est l'entreprise : procédure ouverte ? type (amiable confidentiel non publié / RJ / LJ) ? dates de jugement / publication ? **cessation des paiements** caractérisée et datée ?
3. **Trancher le niveau de difficulté + router (pivot 45 j).** Si la **CdP date de plus de 45 jours et n'est pas déclarée**, l'amiable est **fermé** (L.611-4) et l'obligation de déclarer s'impose (L.631-4) → **renvoi `/h-da:declaration-cessation-paiements`** (et **non** la prévention). Sinon : pas/plus en CdP ou CdP ≤ 45 j → `prevention-difficultes` (sauver) ou `pre-pack-cession` (céder) ; RJ/LJ déjà ouverte → selon le fork, sinon signaler le rôle limité du débiteur.

## Étape 2 — Arbitrage sauver / céder / déposer

Éclairer les trois voies (cf. tableau du livrable) en rappelant que **le niveau de difficulté détermine lesquelles sont encore ouvertes** : sauver suppose qu'on n'est pas (ou plus) en CdP ou en CdP ≤ 45 j ; céder suppose une cession préparable en amiable ou pré-procédure ; déposer s'impose en CdP > 45 j ou si le redressement est impossible. **Ne pas trancher le fork à la place du client** — recommander, taguer `[review]`, laisser décider.

## Étape 3 — Exposition du dirigeant (Gate 2, transverse)

Signaler que le choix de la voie **engage le patrimoine du dirigeant** : déposer tard aggrave (faute de gestion → contribution à l'insuffisance d'actif **L.651-2**, sanctions **L.653-8**, période suspecte **L.632-1 / L.632-2**) ; une conciliation **L.611-4** demandée à temps atténue le reproche de retard. **Router vers `responsabilite-dirigeant`** pour l'évaluation des 4 axes — ce skill **signale, n'évalue pas** et **ne chiffre pas** l'insuffisance.

## Étape 4 — Recommandation de voie

Formuler une **recommandation distress-aware** (sauver / céder / déposer) en pesant : caractérisation et date de la CdP (le pivot 45 j commande), faisabilité d'un redressement vs nécessité de céder vs obligation de déposer, exposition du dirigeant (en faveur d'un dépôt à temps si le retard s'accumule), dimension fiscale (flag, pas d'arbitrage chiffré). Préférer l'option la plus protectrice et signaler explicitement les arbitrages `[review]`.

## Étape 5 — Routage

Orienter vers la feuille adéquate (sans en dérouler la mécanique) : `prevention-difficultes` / `pre-pack-cession` / `declaration-cessation-paiements` / `responsabilite-dirigeant`, et **conseil fiscal externe** pour toute dimension fiscale. Si RJ/LJ subie avec cession judiciaire en cours, **signaler le rôle limité du débiteur** plutôt que de router vers une feuille débiteur inexistante.

## Étape 6 — Post-flight `verifier-citations`

Lancer `verifier-citations` sur tous les articles cités (L.631-1, L.631-4, L.640-4, L.611-4, L.631-8, L.632-1, L.632-2, L.651-2, L.653-8). Tout article non confirmé reste `[à vérifier]`.

---

## Ce skill ne fait pas

- **Exécuter** : ni demande de prévention, ni déclaration de cessation des paiements, ni montage de cession, ni évaluation de la responsabilité du dirigeant → feuilles (`prevention-difficultes`, `declaration-cessation-paiements`, `pre-pack-cession`, `responsabilite-dirigeant`).
- **Requalifier finement la CdP** (actif disponible vs passif exigible) ni **fabriquer la date de CdP** → `declaration-cessation-paiements`.
- **Évaluer ou chiffrer** l'exposition du dirigeant (insuffisance, contribution, caution) → `responsabilite-dirigeant`.
- **Donner un conseil fiscal** (déficits, droits d'enregistrement, solidarité) — flag + renvoi conseil fiscal.
- **Traiter le côté repreneur / acquéreur** — côté cédant/débiteur uniquement (→ `asset-vs-share-distress`).
- **Outiller la vente à la barre côté débiteur** (cession judiciaire RJ/LJ subie) : signaler le rôle limité du débiteur ; pas de feuille débiteur dédiée à ce jour.
- Tout seuil / délai (45 j, période suspecte) reste `[à vérifier]` si non confirmé en source primaire.

---

## Ton

Technique, prudent, **piloté par le double gate** : situer d'abord le niveau de difficulté (Gate 1) et router selon le **pivot 45 j** — CdP > 45 j non déclarée → `declaration-cessation-paiements` (jamais la prévention, c'est l'erreur qui trompe le client) ; éclairer le fork sauver / céder / déposer **sans le trancher** à la place du client ; signaler l'exposition du dirigeant (Gate 2) et **router** vers `responsabilite-dirigeant` sans l'évaluer. Ne jamais exécuter, ni chiffrer, ni fabriquer de date, ni donner de conseil fiscal. Brouillon soumis à validation humaine (avocat) avant toute décision stratégique.
````

- [ ] **Step 4: Créer le wrapper de commande jumeau**

Créer `plugins/hacienda-droit-affaires/commands/h-da/distress-cedant.md`. Le bloc `description:` et la ligne `argument-hint:` doivent être **identiques caractère pour caractère** à ceux du SKILL.md (Step 3). Contenu exact :

```markdown
---
description: >
  Note d'orientation côté cédant/débiteur (dirigeant ou actionnaire d'une
  entreprise en difficulté, et son conseil M&A/PE) pour éclairer l'arbitrage
  stratégique sauver / céder / déposer et router vers la bonne feuille. Dernière
  pièce et routeur du pan cédant/débiteur du moat distressed-M&A, miroir de
  `asset-vs-share-distress` (côté repreneur) : il décide et oriente, il n'exécute
  pas. Double gate : (1) diagnostic du niveau de difficulté + routage selon le
  pivot des 45 jours — cessation des paiements > 45 j non déclarée → obligation de
  déclarer → `declaration-cessation-paiements` (et NON la prévention, à l'inverse
  du côté repreneur) ; CdP ≤ 45 j ou non caractérisée → `prevention-difficultes`
  (sauver) ou `pre-pack-cession` (céder) ; (2) exposition du dirigeant transverse —
  déposer tard aggrave (faute de gestion, L.651-2, L.653-8, période suspecte),
  signalée et routée vers `responsabilite-dirigeant`, jamais évaluée ici.
  Diagnostique grossièrement pour router, ne requalifie pas finement la CdP, ne
  chiffre rien, ne tranche pas le fork à la place du client. Côté cédant/débiteur
  uniquement. N'exécute pas (ni demande de prévention, ni déclaration, ni montage
  de cession, ni évaluation de responsabilité) et ne donne AUCUN conseil fiscal.
  Brouillon, validation humaine (avocat) OBLIGATOIRE.
argument-hint: "[note d'orientation (mode unique), entreprise à quel stade de difficulté ?, cessation des paiements datée ? depuis plus de 45 j ?, sauver / céder / déposer ?, côté cédant/débiteur]"
---

Use the `distress-cedant` skill with these arguments:

$ARGUMENTS

Delegate all legal workflow, source-verification, PII, and validation-human guardrails to the skill. Do not duplicate or reinterpret the business logic in this command wrapper.
```

- [ ] **Step 5: Lancer la suite de structure et vérifier le vert**

Run: `npx vitest run packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts`
Expected: PASS — tous les tests verts, dont count 30, métadonnées V2, wrapper jumeau (description + argument-hint identiques), squelette canonique, noms MCP exacts, et aucun préfixe interdit.

> Si un test échoue sur l'égalité description/argument-hint, c'est une divergence caractère-à-caractère entre SKILL.md et le wrapper — recopier le bloc à l'identique. Si le test de squelette échoue, vérifier l'ordre des headings.

- [ ] **Step 6: Commit**

```bash
git add plugins/hacienda-droit-affaires/skills/distress-cedant/SKILL.md \
        plugins/hacienda-droit-affaires/commands/h-da/distress-cedant.md \
        packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts
git commit -m "feat(da): skill distress-cedant (routeur cédant, pan cédant/débiteur)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 2: Fork de side dans le routeur global `cas`

La ligne « entreprise en difficulté » de `cas` route aujourd'hui de manière inconditionnelle vers `asset-vs-share-distress`. On la transforme en fork par side (repreneur → `asset-vs-share-distress` ; cédant → `distress-cedant`), à deux endroits : l'exemple et la carte de routage.

**Files:**
- Modify: `plugins/hacienda-droit-affaires/skills/cas/SKILL.md`

**Interfaces:**
- Consumes: skill `distress-cedant` (Task 1).
- Produces: routage `cas` side-aware pour le segment « entreprise en difficulté ».

- [ ] **Step 1: Mettre à jour l'exemple « reprise d'une boîte en difficulté »**

Dans `plugins/hacienda-droit-affaires/skills/cas/SKILL.md`, remplacer la step 4 de l'exemple :

```
4. Route : « → `/h-da:asset-vs-share-distress` » (sous-routeur qui décidera
   titres vs actifs et le niveau de difficulté ; il garde son double gate).
   Ne PAS dérouler L.642-x ici.
```

par :

```
4. Route selon le side : si le dossier est **côté repreneur/acquéreur** →
   « → `/h-da:asset-vs-share-distress` » (sous-routeur titres vs actifs) ; si
   **côté cédant/débiteur** (le dirigeant de la boîte en difficulté) →
   « → `/h-da:distress-cedant` » (sous-routeur sauver / céder / déposer).
   Chaque sous-routeur garde son double gate. Ne PAS dérouler L.642-x ici.
```

- [ ] **Step 2: Mettre à jour la carte de routage**

Dans la table « Carte de routage (type → skill) », remplacer la ligne :

```
| Entreprise en difficulté | → `/h-da:asset-vs-share-distress` (sous-routeur) |
```

par :

```
| Entreprise en difficulté — **côté repreneur/acquéreur** | → `/h-da:asset-vs-share-distress` (sous-routeur titres vs actifs) |
| Entreprise en difficulté — **côté cédant/débiteur** | → `/h-da:distress-cedant` (sous-routeur sauver / céder / déposer) |
```

- [ ] **Step 3: Vérifier qu'aucun préfixe interdit n'a été introduit**

Run: `grep -nE "/h-droit-affaires:|/hacienda-droit-affaires:" plugins/hacienda-droit-affaires/skills/cas/SKILL.md`
Expected: aucune sortie (exit 1).

- [ ] **Step 4: Lancer la suite de structure (garde-fou)**

Run: `npx vitest run packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add plugins/hacienda-droit-affaires/skills/cas/SKILL.md
git commit -m "feat(da): cas route le segment entreprise en difficulté par side (repreneur/cédant)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 3: README, bumps de version et CHANGELOG

Documenter le skill dans le README (tableau Commandes en ordre alpha + ligne Périmètre V2), bumper la version 0.12.0 → 0.13.0 dans les 6 emplacements, et ajouter l'entrée CHANGELOG.

**Files:**
- Modify: `plugins/hacienda-droit-affaires/README.md`
- Modify: `plugins/hacienda-droit-affaires/version.json`
- Modify: `plugins/hacienda-droit-affaires/manifest.json`
- Modify: `plugins/hacienda-droit-affaires/mcp-server/package.json`
- Modify: `plugins/hacienda-droit-affaires/.claude-plugin/plugin.json`
- Modify: `plugins/hacienda-droit-affaires/.claude-plugin/marketplace.json`
- Modify: `.claude-plugin/marketplace.json` (racine — entrée DA)
- Modify: `plugins/hacienda-droit-affaires/CHANGELOG.md`

**Interfaces:**
- Consumes: skill `distress-cedant` (Task 1).
- Produces: documentation + version cohérente 0.13.0.

- [ ] **Step 1: Ajouter la ligne au tableau Commandes du README (ordre alpha)**

Dans `plugins/hacienda-droit-affaires/README.md`, dans le tableau des commandes, insérer **entre** la ligne `/h-da:declaration-creance` et `/h-da:due-diligence-dataroom` (ordre alphabétique : `distress-cedant` vient après `declaration-creance`, avant `due-diligence-dataroom`) :

```
| `/h-da:distress-cedant` | Côté cédant/débiteur : routeur d'entonnoir distress — diagnostic du niveau de difficulté (pivot 45 j), arbitrage sauver / céder / déposer, exposition dirigeant, routage vers la bonne feuille. |
```

- [ ] **Step 2: Ajouter `distress-cedant` à la ligne Procédures collectives du Périmètre V2**

Dans `plugins/hacienda-droit-affaires/README.md`, ligne 18, remplacer :

```
| Procédures collectives | `declaration-creance`, `declaration-cessation-paiements`, `responsabilite-dirigeant` |
```

par :

```
| Procédures collectives | `declaration-creance`, `declaration-cessation-paiements`, `responsabilite-dirigeant`, `distress-cedant` |
```

- [ ] **Step 3: Bumper les 6 emplacements de version**

Remplacer `0.12.0` par `0.13.0` dans chacun :

- `plugins/hacienda-droit-affaires/version.json` → `"version": "0.13.0"`
- `plugins/hacienda-droit-affaires/manifest.json` → `"version": "0.13.0"`
- `plugins/hacienda-droit-affaires/mcp-server/package.json` (ligne 3) → `"version": "0.13.0",`
- `plugins/hacienda-droit-affaires/.claude-plugin/plugin.json` → `"version": "0.13.0",`
- `plugins/hacienda-droit-affaires/.claude-plugin/marketplace.json` (les 2 occurrences `"version": "0.12.0"` aux lignes ~6 et ~11) → `"0.13.0"`

Le `.claude-plugin/marketplace.json` racine (entrée `hacienda-droit-affaires`) **ne porte pas de champ version** (seulement `name`/`source`/`description`/`author`) — ne rien y modifier. Vérifier en Step 5.

- [ ] **Step 4: Ajouter l'entrée CHANGELOG**

Dans `plugins/hacienda-droit-affaires/CHANGELOG.md`, insérer en tête (au-dessus de `## 0.12.0`) :

```markdown
## 0.13.0

- Ajout du skill `distress-cedant` (routeur du pan cédant/débiteur, dernière pièce, miroir de `asset-vs-share-distress`) : diagnostic du niveau de difficulté + routage selon le pivot des 45 jours (CdP > 45 j non déclarée → `declaration-cessation-paiements`, à l'inverse du côté repreneur), arbitrage sauver / céder / déposer non tranché, exposition dirigeant signalée et routée vers `responsabilite-dirigeant`. Décide et oriente, n'exécute pas ; ne chiffre rien, ne fabrique aucune date, aucun conseil fiscal.
- `cas` : la ligne « entreprise en difficulté » devient un fork par side (repreneur → `asset-vs-share-distress` ; cédant → `distress-cedant`). Pan cédant/débiteur complet et symétrique au pan repreneur. Skills : 29 → 30.
```

- [ ] **Step 5: Vérifier la cohérence des versions**

Run: `grep -rn "0.12.0" plugins/hacienda-droit-affaires/version.json plugins/hacienda-droit-affaires/manifest.json plugins/hacienda-droit-affaires/mcp-server/package.json plugins/hacienda-droit-affaires/.claude-plugin/`
Expected: aucune sortie (exit 1) — plus aucun `0.12.0` résiduel.

Run: `grep -rn "0.13.0" plugins/hacienda-droit-affaires/version.json plugins/hacienda-droit-affaires/.claude-plugin/plugin.json`
Expected: les deux fichiers renvoient `0.13.0`.

- [ ] **Step 6: Vérification globale du dépôt**

Run: `npm test && npm run typecheck && npm run build && npm run branding:check && git diff --check`
Expected: tout PASS ; `branding:check` ne signale aucune fuite non-Hacienda ; `git diff --check` ne signale aucun whitespace.

- [ ] **Step 7: Commit**

```bash
git add plugins/hacienda-droit-affaires/README.md \
        plugins/hacienda-droit-affaires/version.json \
        plugins/hacienda-droit-affaires/manifest.json \
        plugins/hacienda-droit-affaires/mcp-server/package.json \
        plugins/hacienda-droit-affaires/.claude-plugin/plugin.json \
        plugins/hacienda-droit-affaires/.claude-plugin/marketplace.json \
        plugins/hacienda-droit-affaires/CHANGELOG.md
git commit -m "docs(da): README + bump v0.13.0 pour distress-cedant (skills 29->30)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 4: Enregistrer `distress-cedant` dans `da-scoring.sh` + dataset fictif

Brancher le skill dans le wrapper de scoring (SKILLS array, les 5 fonctions case, le heredoc usage) et créer le scénario fictif qui exerce le pivot 45 j ambigu, le fork non tranché, l'expo dirigeant à signaler-pas-évaluer et un piège de fabrication de date.

**Files:**
- Modify: `scripts/da-scoring.sh`
- Create: `plugins/hacienda-droit-affaires/tests/datasets/da-distress-cedant/scenario.md`

**Interfaces:**
- Consumes: skill `distress-cedant` (Task 1), helper `dataset_dir()` qui résout `da-distress-cedant`.
- Produces: `bash scripts/da-scoring.sh phase2 distress-cedant` (et phase3-prompt / phase4 / aggregate / cycles) opérationnels avec code par défaut `DCD1RT`.

- [ ] **Step 1: Ajouter au tableau `SKILLS`**

Dans `scripts/da-scoring.sh`, dans le tableau `SKILLS=( … )`, ajouter après `responsabilite-dirigeant` :

```
  distress-cedant
```

- [ ] **Step 2: `code_for()` — code de cycle (6 caractères)**

Après la ligne `responsabilite-dirigeant) echo "RDG1RT" ;;`, ajouter :

```bash
    distress-cedant) echo "DCD1RT" ;;
```

- [ ] **Step 3: `mode_for()`**

Après `responsabilite-dirigeant) echo "evaluation responsabilite du dirigeant 4 axes (mode unique)" ;;`, ajouter :

```bash
    distress-cedant) echo "note d'orientation routeur cedant (mode unique)" ;;
```

- [ ] **Step 4: `spec_for()`**

Après la ligne `spec_for` de `responsabilite-dirigeant`, ajouter :

```bash
    distress-cedant) echo "cote cedant/debiteur ; routeur d'entonnoir sauver/ceder/deposer ; niveau de difficulte a diagnostiquer grossierement (in bonis difficultes / amiable / CdP <=45j / CdP >45j / RJ-LJ) ; cessation des paiements a date INCERTAINE ('environ l'automne') testant le pivot 45 j sans la fabriquer en date calendaire ; pivot 45 j qui route a l'INVERSE du repreneur (CdP >45j non declaree -> declaration-cessation-paiements, JAMAIS prevention-difficultes : erreur qui trompe le client) ; fork sauver/ceder/deposer a NE PAS trancher a la place du client ; exposition dirigeant (caution, retard, faute de gestion L.651-2 L.653-8 periode suspecte) a SIGNALER et router vers responsabilite-dirigeant sans evaluer ni chiffrer ; ne pas requalifier finement la CdP (defere a declaration-cessation-paiements) ; objectifs fiscaux (deficits) a flaguer sans conseil ; cas RJ/LJ subie -> signaler le role limite du debiteur (pas de feuille debiteur dediee)" ;;
```

- [ ] **Step 5: `desc_for()`**

Après la ligne `desc_for` de `responsabilite-dirigeant`, ajouter :

```bash
    distress-cedant) echo "Cote cedant/debiteur : routeur d'entonnoir distress, derniere piece et miroir de asset-vs-share-distress. Diagnostique le niveau de difficulte et route selon le pivot des 45 jours (CdP >45 j non declaree -> declaration-cessation-paiements, a l'inverse du cote repreneur), eclaire l'arbitrage sauver/ceder/deposer sans le trancher, signale l'exposition du dirigeant et route vers responsabilite-dirigeant. Decide et oriente, n'execute pas ; ne chiffre rien, ne fabrique aucune date, aucun conseil fiscal. Brouillon soumis a validation humaine. NE PAS supposer le contenu du SKILL.md." ;;
```

- [ ] **Step 6: `command_for()`**

Après la ligne `command_for` de `responsabilite-dirigeant`, ajouter :

```bash
    distress-cedant) echo "/h-da:distress-cedant" ;;
```

- [ ] **Step 7: heredoc `usage()` — liste Skills**

Dans le bloc `usage()`, sous `Skills:`, ajouter après `responsabilite-dirigeant` :

```
  distress-cedant
```

- [ ] **Step 8: Créer le dataset fictif**

Créer `plugins/hacienda-droit-affaires/tests/datasets/da-distress-cedant/scenario.md` avec **exactement** ce contenu :

````markdown
# Dataset test — `distress-cedant`

**Domaine** : droit-affaires
**Skill cible** : `/h-da:distress-cedant`
**Mode** : note d'orientation (mode unique)

*Dossier strictement fictif — toute ressemblance avec dossiers, parties ou titres
réels serait fortuite.*

---

## Scénario fictif

### L'entreprise : Boréal Logistique SAS

**Boréal Logistique SAS** (SIREN 491 327 605) est une PME de messagerie et de
logistique du dernier kilomètre, implantée à Roanne (42). Elle exploite un
entrepôt loué de 3 200 m², une flotte de 12 véhicules utilitaires (dont 8 en
crédit-bail) et emploie **31 salariés** en CDI. Son dirigeant-fondateur et
actionnaire majoritaire (78 % des titres) est **M. Armand Tessier**, gérant de
droit. Un fonds régional détient les 22 % restants.

**Contrats structurants :**
- Un **contrat-cadre** avec une enseigne de e-commerce (Cargonet) représentant
  **1,8 M€ sur 4,1 M€** de CA annuel, dénoncé par le client le mois dernier avec
  effet dans trois mois.
- Un **crédit-bail mobilier** sur 8 véhicules (loyers mensuels 14 000 €).
- Un **bail commercial** 3/6/9 avec clause de résiliation en cas de cession.

---

### Situation financière

L'exercice clos le 31 décembre 2025 fait apparaître :

| Poste | Montant |
|---|---|
| Chiffre d'affaires | 4 100 000 € |
| Résultat net | — 295 000 € |
| Dettes fournisseurs (> 90 j) | 410 000 € |
| TVA et cotisations sociales en souffrance | 247 000 € |
| Échéances de crédit-bail impayées (3 mois) | 42 000 € |
| Découvert bancaire autorisé (utilisé à 95 %) | 180 000 € |
| Ligne de crédit confirmée NON tirée | 150 000 € |
| Trésorerie disponible au 1er juin 2026 | 28 000 € |
| **Déficits fiscaux reportables** | **510 000 €** |

M. Tessier indique lors d'un entretien de mi-juin 2026 que la société « n'arrive
plus à payer les fournisseurs et l'URSSAF depuis le printemps, peut-être avril ou
mai, je ne saurais pas dire exactement ». Il précise qu'il **n'a rien déposé** au
greffe du Tribunal de commerce de Roanne et qu'**aucune procédure** ne figure au
BODACC au 20 juin 2026. Il s'est **porté caution personnelle** du découvert
bancaire (180 000 €) et d'une partie du crédit-bail.

---

### Ce que le dirigeant demande

> « On a perdu le contrat Cargonet, c'est la moitié de notre activité qui part
> dans trois mois. Honnêtement je ne sais plus quoi faire : est-ce que j'essaie de
> redresser la barre, est-ce que je vends à un confrère qui m'a approché, ou est-ce
> que je dois "déposer le bilan" ? Je veux surtout éviter d'y laisser ma maison —
> je me suis porté caution. Un cabinet m'a dit qu'il fallait d'abord tenter une
> conciliation pour gagner du temps, est-ce que c'est encore possible vu où on en
> est ? »

Un **repreneur potentiel** (un concurrent local) s'est manifesté de manière
informelle, sans offre écrite.

---

## Pièces fournies

### Pièce 1 — Extrait du bilan simplifié 31/12/2025 (fourni par Boréal)

| Actif | € | Passif | € |
|---|---|---|---|
| Immobilisations nettes | 520 000 | Capital social | 100 000 |
| Créances clients | 365 000 | Réserves | — 60 000 |
| Stocks / en-cours | 45 000 | Report à nouveau | — 180 000 |
| Trésorerie | 28 000 | Résultat | — 295 000 |
| | | Dettes financières | 360 000 |
| | | Dettes fournisseurs | 410 000 |
| | | Dettes fiscales et sociales | 247 000 |
| | | Autres dettes | 376 000 |
| **Total** | **958 000** | **Total** | **958 000** |

### Pièce 2 — Courriel de M. Tessier à son conseil (extrait, 17 juin 2026)

> « Comme je vous l'ai dit, on ne paie plus les fournisseurs ni l'URSSAF depuis le
> printemps — avril, mai, je ne sais plus trop. La banque me met la pression sur le
> découvert. J'ai encore une ligne de crédit de 150 000 € que je n'ai pas touchée,
> ça peut peut-être aider ? Je ne veux pas déposer le bilan, ça va faire fuir les
> derniers clients. Le concurrent qui veut racheter pourrait être une porte de
> sortie. »

### Pièce 3 — Lettre de dénonciation du contrat Cargonet (extrait, mai 2026)

> « Nous vous informons de notre décision de ne pas reconduire le contrat-cadre,
> avec effet à l'issue du préavis contractuel de trois mois. »

### Pièce 4 — Acte de cautionnement (extrait)

> « M. Armand Tessier se porte caution personnelle et solidaire envers la Banque du
> Forez, à hauteur de 180 000 €, de toutes sommes dues par Boréal Logistique SAS au
> titre du découvert en compte courant. »

---

## Posture cabinet configurée

**Cabinet** : Cabinet Verdière & Associés (conseil en droit des affaires, 3 avocats)
**Rôle** : conseil du dirigeant-cédant (M. Tessier / Boréal Logistique)
**Side** : cédant / débiteur
**Taille de deals typique** : 0,5 M€ – 10 M€
**Approbateur** : associé responsable restructuring (Me Verdière)
**Seuil d'escalade** : tout risque > 100 000 € ou exposition personnelle du dirigeant
**Politique PII** : active (défaut)

---

## Question / demande explicite

> « Bonjour, nous accompagnons M. Tessier, dirigeant de Boréal Logistique. Il
> hésite entre tenter de redresser l'entreprise, la céder à un concurrent qui s'est
> manifesté, ou déposer le bilan. Il s'inquiète aussi de son cautionnement
> personnel. Pouvez-vous nous préparer une note d'orientation sur la voie à
> privilégier et la marche à suivre ? »
````

- [ ] **Step 9: Vérifier l'enregistrement et le code 6 caractères**

Run: `bash scripts/da-scoring.sh list`
Expected: une ligne `| \`distress-cedant\` | \`DCD1RT\` | \`…/da-distress-cedant\` | note d'orientation routeur cedant (mode unique) |`. Vérifier que `DCD1RT` fait bien **6 caractères**.

Run: `bash scripts/da-scoring.sh init distress-cedant`
Expected: `dataset: …/tests/datasets/da-distress-cedant` (le répertoire existe déjà avec `scenario.md`).

- [ ] **Step 10: Commit**

```bash
git add scripts/da-scoring.sh \
        plugins/hacienda-droit-affaires/tests/datasets/da-distress-cedant/scenario.md
git commit -m "test(da): enregistre distress-cedant dans da-scoring.sh + dataset DCD1RT

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 5: Scoring blind 4 phases (cycle `DCD1RT`, cible ADMIS gate-clean)

`distress-cedant` est **doctrinal** (le pivot 45 j et la recommandation de voie peuvent tromper le client si erronés) → scoring blind 4 phases obligatoire, comme son miroir `asset-vs-share-distress`. **Token economy : Claude prépare les prompts via le wrapper ; Candy lance les commandes Codex et l'agrégation.** Allocation modèle : Phase 2 = Codex HIGH ; Phase 3 live = Claude (Sonnet ok) ; Phase 4 = Codex medium.

> **Cette tâche n'est pas un cycle TDD code.** C'est le protocole de validation. Chaque step indique qui agit (Claude prépare / Candy lance) et la sortie attendue. Le checkpoint de revue des gates entre Phase 2 et Phase 3 est **bloquant**.

**Files:**
- Read/Produce: `plugins/hacienda-droit-affaires/tests/datasets/da-distress-cedant/{scenario.md, ground-truth.md, live-output-DCD1RT.md, verdicts-DCD1RT.json}`
- Prompts temporaires : `/tmp/da-scoring-distress-cedant-*.txt`

**Interfaces:**
- Consumes: dataset + enregistrement `da-scoring.sh` (Task 4).
- Produces: verdict agrégé du cycle `DCD1RT`.

- [ ] **Step 1: (Claude) Préparer le prompt Phase 2 (vérité terrain)**

Run: `bash scripts/da-scoring.sh phase2 distress-cedant`
Effet : génère et copie (`pbcopy`) le prompt Phase 2. Annoncer à Candy : « Phase 2 prête (Codex GPT-5.5 effort **HIGH**, session neuve, **sans** SKILL.md). »

- [ ] **Step 2: (Candy) Lancer Phase 2 dans Codex**

Candy ouvre une session Codex neuve, colle le prompt, récupère le JSON pur et le sauve dans `plugins/hacienda-droit-affaires/tests/datasets/da-distress-cedant/ground-truth.md`. (Si la sortie est aplatie : `python3 -m json.tool ground-truth.md > tmp && mv tmp ground-truth.md`.)

- [ ] **Step 3: (Claude) CHECKPOINT bloquant — revue des gates AVANT le live**

Lire la grille de critères de `ground-truth.md`. Pour chaque critère CRITIQUE, vérifier que **PASS = complément exact du FAIL** (pas de zone orpheline « juste sur le fond, imprecis sur la forme »). Recalibrer tout **gate-recall** ou gate asymétrique **maintenant**, jamais après le run live (intégrité blind). Vérifier en particulier les gates :
- **pivot 45 j inverse** : le FAIL doit se déclencher si la note renvoie un débiteur en CdP > 45 j vers `prevention-difficultes` (erreur qui trompe le client) — et NON l'inverse.
- **fork non tranché** : FAIL si la note tranche sauver/céder/déposer à la place du client.
- **expo dirigeant signalée-pas-évaluée** : FAIL si la note chiffre/évalue l'expo au lieu de router vers `responsabilite-dirigeant`.
- **fabrication de date** : FAIL si la note convertit « avril/mai » en date calendaire de CdP au lieu de raisonner conditionnellement.

Documenter tout recalibrage dans un court message à Candy. (Réf. `[[feedback-gate-calibration-scoring]]` : gate-piège, pas gate-recall ; lire le trigger FAIL.)

- [ ] **Step 4: (Claude) Re-sync du cache + préparer Phase 3**

Run: `bash scripts/da-scoring.sh phase3-resync`
Puis: `bash scripts/da-scoring.sh phase3-prompt distress-cedant`
Effet : copie le prompt Phase 3. Annoncer : « Phase 3 (exécution live) à lancer dans une session **Claude fraîche**, **sans** lire `ground-truth.md`. »

- [ ] **Step 5: (Phase 3 live) Exécuter le skill sur le scénario**

Dans une session Claude fraîche, exécuter `/h-da:distress-cedant` sur le scénario. Sauver la note produite dans `plugins/hacienda-droit-affaires/tests/datasets/da-distress-cedant/live-output-DCD1RT.md`.

- [ ] **Step 6: (Claude) Préparer le prompt Phase 4 (scoring)**

Run: `bash scripts/da-scoring.sh phase4 distress-cedant`
Effet : génère le prompt Phase 4 avec le code par défaut `DCD1RT`. Annoncer : « Phase 4 (Codex GPT-5.5 effort **medium**, session neuve, **sans** SKILL.md). »

- [ ] **Step 7: (Candy) Lancer Phase 4 dans Codex**

Candy lance Phase 4, récupère le JSON pur et le sauve dans `plugins/hacienda-droit-affaires/tests/datasets/da-distress-cedant/verdicts-DCD1RT.json`.

- [ ] **Step 8: (Candy) Agréger le verdict**

Run: `bash scripts/da-scoring.sh aggregate distress-cedant`
Expected: verdict agrégé. **Cible : ADMIS gate-clean (1,0).**

- [ ] **Step 9: Décision de release**

- Si **ADMIS gate-clean** : passer à Task 6.
- Sinon : relire les CRITIQUE échoués, corriger le SKILL.md (Task 1), **re-lancer un nouveau cycle** avec `CODE=<NOUVEAU 6 car.>` (ne jamais réutiliser `DCD1RT` pour un re-run). Borner les cycles — `SEUIL_ADMIS=1.0` est sensible à la variance (réf. `[[feedback-date-fabrication-scoring-variance]]`).

- [ ] **Step 10: Commit des artefacts de scoring**

```bash
git add plugins/hacienda-droit-affaires/tests/datasets/da-distress-cedant/
git commit -m "test(da): distress-cedant ADMIS gate-clean (cycle DCD1RT)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 6: Handoff de clôture du pan cédant/débiteur

Documenter la livraison et la complétude symétrique du pan, comme le handoff de référence `docs/handoff/handoff-2026-06-24-responsabilite-dirigeant.md`.

**Files:**
- Create: `docs/handoff/handoff-2026-06-24-distress-cedant.md`

- [ ] **Step 1: Rédiger le handoff**

Créer `docs/handoff/handoff-2026-06-24-distress-cedant.md` couvrant : skill livré (v0.13.0), verdict de scoring (cycle `DCD1RT`, ADMIS gate-clean ou état réel), recalibrages de gates effectués au checkpoint, **clôture du pan cédant/débiteur** (`cas` → cédant → `distress-cedant` → `prevention-difficultes` / `declaration-cessation-paiements` / `pre-pack-cession` / `responsabilite-dirigeant`), symétrie avec le pan repreneur, et le **trou résiduel hors scope** : feuille « vendre à la barre côté débiteur » (cf. spec §11).

- [ ] **Step 2: Commit**

```bash
git add docs/handoff/handoff-2026-06-24-distress-cedant.md
git commit -m "docs(handoff): distress-cedant — clôture du pan cédant/débiteur

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review (vérification du plan contre le spec)

**Couverture du spec :**
- §2 objectif (routeur cédant, décide n'exécute pas) → Task 1 (SKILL.md intro + Ton + « Ce skill ne fait pas »). ✓
- §4 Gate 1 pivot 45 j inverse + Gate 2 expo dirigeant → Task 1 (bloc gate, Étapes 1 & 3, checklist). ✓
- §4 flux (intake, BODACC, fork, routage, arbre 5 options) → Task 1 (Intake, Étapes, livrable). ✓
- §5 frontières (anti-redondance, trou RJ/LJ subie) → Task 1 (« Ce skill ne fait pas », livrable §4). ✓
- §6 anti-fabrication → Task 1 (checklist + Étape 1) + Task 4 (scénario date incertaine) + Task 5 (gate fabrication). ✓
- §7 livrable → Task 1 (section Sortie, mode silencieux). ✓
- §8 base légale → Task 1 (Étape 6 verifier-citations, articles cités). ✓
- §9 méthodo build (scoring 4 phases, code 6 car. DCD1RT, dataset, token economy) → Tasks 4 & 5. ✓
- §10 surface technique (SKILL + wrapper + README + cas + count 29→30 + bump 6 emplacements + CHANGELOG + da-scoring.sh) → Tasks 1, 2, 3, 4. ✓
- §11 hors scope → Task 6 (handoff documente le trou résiduel). ✓

**Scan placeholders :** aucun TODO/TBD ; contenu complet de SKILL.md, wrapper, scenario.md, CHANGELOG, éditions da-scoring.sh fourni intégralement. ✓

**Cohérence des types/noms :** `distress-cedant` (slug), `DCD1RT` (6 car.), `da-distress-cedant` (dataset), `/h-da:distress-cedant` (commande), version `0.13.0`, count `30` — cohérents entre toutes les tâches. La `description` et l'`argument-hint` sont identiques entre SKILL.md (Task 1 Step 3) et le wrapper (Task 1 Step 4), exigence du test de structure. ✓
