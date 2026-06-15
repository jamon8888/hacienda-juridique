# Asset vs share deal en distress (DA) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Livrer le skill `asset-vs-share-distress` (DA) — note d'orientation côté repreneur qui arbitre titres vs actifs pour une cible en difficulté et route vers le bon playbook du moat, validé gate-clean par scoring blind 4 phases, DA bumpé en v0.9.0.

**Architecture:** Skill V2 (moule canonique DA), **routeur amont** du moat distressed-M&A. Double gate : (1) diagnostic du niveau de difficulté + routage (CP > 45 j sans procédure → `prevention-difficultes`) ; (2) responsabilité repreneur (share deal ne purge pas le passif ; période suspecte L.632-1/632-2). Garde-fou anti-redondance : décide et route, n'exécute pas (ne déroule pas L.642-x, ne rédige aucun acte), aucun conseil fiscal. Validation = scoring blind 4 phases via `scripts/da-scoring.sh` (Codex Phase 2/4 sans SKILL.md, modèle frais Phase 3 sans ground-truth — Sonnet recommandé pour le live).

**Tech Stack:** Markdown (skill + wrapper), bash (`scripts/da-scoring.sh`), Vitest (`hacienda-droit-affaires-cowork-structure.test.ts`), Codex GPT-5.5 (scoring blind), JSON (ground-truth / verdicts).

---

## File Structure

- `plugins/hacienda-droit-affaires/tests/datasets/da-asset-vs-share-distress/scenario.md` — créé (T1) : cas fictif neutre, input partagé Phase 1.
- `plugins/hacienda-droit-affaires/skills/asset-vs-share-distress/SKILL.md` — créé (T2) : le skill, contenu doctrinal complet.
- `plugins/hacienda-droit-affaires/commands/h-da/asset-vs-share-distress.md` — créé (T3) : wrapper commande (description + argument-hint identiques au SKILL.md).
- `plugins/hacienda-droit-affaires/README.md` — modifié (T3) : ligne `/h-da:asset-vs-share-distress`.
- `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts:222` — modifié (T3) : count `toBe(25)` → `toBe(26)`.
- `scripts/da-scoring.sh` — modifié (T4) : ajout du skill aux 5 fonctions + tableau + usage.
- `plugins/hacienda-droit-affaires/tests/datasets/da-asset-vs-share-distress/ground-truth.md` — créé (T5) : grille Codex HIGH (Phase 2).
- `plugins/hacienda-droit-affaires/tests/datasets/da-asset-vs-share-distress/live-output.md` — créé (T6) : sortie live (Phase 3).
- `plugins/hacienda-droit-affaires/tests/datasets/da-asset-vs-share-distress/verdicts-<CODE>.json` — créé (T7) : verdicts Codex (Phase 4).
- 5 fichiers de version + CHANGELOG — modifiés (T9) : bump 0.8.0 → 0.9.0.

---

## Task 1 : Scénario fictif (Phase 1 — input partagé)

**Files :**
- Create: `plugins/hacienda-droit-affaires/tests/datasets/da-asset-vs-share-distress/scenario.md`

- [ ] **Step 1 : Rédiger le scénario** — un cas fictif réaliste, **neutre** (ne révèle pas la « bonne réponse », ne cite aucun article, ne nomme aucun gate). Données brutes uniquement. Inclure les éléments piégeux suivants, noyés dans le récit :
  - une cible (PME fictive) **en difficulté à un stade ambigu** : trésorerie tendue, dettes fournisseurs/fiscales/sociales, **cessation des paiements qui semble dater de plus de 45 jours** mais **aucune procédure ouverte** (piège Gate 1 → `prevention-difficultes`) ;
  - le client (repreneur) est **tenté par un share deal** parce qu'il pense que « racheter les titres c'est plus simple et plus rapide » — alors que la société croule sous le passif (piège Gate 2 (a)) ;
  - une variante évoquée : **racheter directement quelques actifs au gérant** tout de suite, avant toute procédure (piège Gate 2 (b) période suspecte) ;
  - un **fonds de commerce** dans le périmètre (piège solidarité fiscale L.1684 CGI) ;
  - des **salariés** et des **contrats clés** (bail, licence) rattachés à l'activité (piège L.1224-1 / continuité) ;
  - des **déficits fiscaux reportables** importants que le client veut « récupérer » (piège : dimension fiscale → flag, pas de conseil).

- [ ] **Step 2 : Vérifier la neutralité** — relire : le scénario ne doit **pas** citer les articles-réponses (L.632-x, L.642-x, L.1224-1, L.1684 CGI, L.651-2) ni nommer les gates ou les skills cibles. Données factuelles uniquement.

- [ ] **Step 3 : Commit**

```bash
git add plugins/hacienda-droit-affaires/tests/datasets/da-asset-vs-share-distress/scenario.md
git commit -m "test(da): scenario fictif asset-vs-share-distress (Phase 1 input)"
```

---

## Task 2 : Le skill `SKILL.md` (build)

**Files :**
- Create: `plugins/hacienda-droit-affaires/skills/asset-vs-share-distress/SKILL.md`

- [ ] **Step 1 : Créer le fichier avec ce contenu exact** (contenu doctrinal complet, pas de placeholder) :

````markdown
---
name: asset-vs-share-distress
description: >
  Note d'orientation / arbitrage de structuration côté candidat-repreneur pour
  décider COMMENT acquérir une cible en difficulté — rachat de titres (share
  deal) ou rachat d'actifs (asset deal) — et router vers le bon playbook
  d'exécution. Entonnoir amont du moat distressed-M&A : il décide et oriente, il
  n'exécute pas. Double gate : (1) diagnostic du niveau de difficulté + routage —
  in bonis / amiable / RJ / LJ ; cessation des paiements > 45 j sans procédure →
  renvoi `prevention-difficultes` ; (2) responsabilité repreneur — un share deal
  d'une société en difficulté ne purge AUCUN passif (on hérite dettes,
  procédures, litiges), et une acquisition pré-procédure peut être annulée au
  titre de la période suspecte (L.632-1 nullités de droit / L.632-2
  facultatives). Cartographie aussi L.1224-1 (transfert social), la solidarité
  fiscale L.1684 CGI (cession de fonds), l'extension de procédure / confusion de
  patrimoine, l'insuffisance d'actif L.651-2 et le passif environnemental ICPE.
  Route vers `prevention-difficultes` / `pre-pack-cession` / `reprise-a-la-barre`
  / `cession-actifs-isoles` / `spa-review`. Côté repreneur uniquement. N'exécute
  pas (ni offre, ni SPA, ni acte de cession) et ne donne AUCUN conseil fiscal.
  Brouillon, validation humaine (avocat) OBLIGATOIRE.
version: "2.0.0"
argument-hint: "[note d'orientation (mode unique), cible à quel stade de difficulté ?, titres ou actifs envisagés ?, acquisition avant ou après jugement ?, côté repreneur]"
authors: ["Hacienda"]
tags: [asset-vs-share-distress, structuration, distressed-m&a, restructuring, share-deal, asset-deal, periode-suspecte, responsabilite-repreneur, routeur]
---

# Skill — Asset vs share deal en distress (arbitrage de structuration amont)

> **BROUILLON, VALIDATION HUMAINE (AVOCAT) OBLIGATOIRE.**
>
> **🔴 Double gate.**
> - **Gate 1 — diagnostic du niveau de difficulté + routage** : situer la cible —
>   *in bonis* avec difficultés / amiable (mandat ad hoc, conciliation) / RJ / LJ —
>   détermine les structures disponibles et **route**. Cas tranchant : si la
>   **cessation des paiements date de plus de 45 jours et qu'aucune procédure n'est
>   ouverte**, l'entreprise **doit la déclarer** : on ne structure pas librement une
>   acquisition → **renvoi `prevention-difficultes`**.
> - **Gate 2 — responsabilité repreneur** : (a) un **share deal d'une société en
>   difficulté ne purge AUCUN passif** — le repreneur hérite des dettes, des
>   procédures et des litiges ; « racheter les titres simplifie » est l'erreur qui
>   trompe le client ; (b) une **acquisition pré-procédure** (achat direct au
>   débiteur avant jugement) peut être **annulée au titre de la période suspecte**
>   (**L.632-1** nullités de droit / **L.632-2** nullités facultatives).
>
> **Point pivot.** Ce skill **décide et route**, il **n'exécute pas**. Il ne déroule
> pas la mécanique L.642-x (c'est le rôle des skills aval), il ne rédige ni offre ni
> SPA ni acte de cession, et il ne donne **aucun conseil fiscal** (flag + renvoi
> conseil fiscal).

## Examples

1. **Share deal « plus simple ».** Le client veut racheter les titres d'une société
   surendettée « pour aller vite ». → Gate 2 (a) : le share deal **ne purge rien** —
   il hérite de tout le passif et des procédures en cours. Comparer honnêtement avec
   un asset deal (qui laisse le passif) avant de trancher.

2. **Achat d'actifs avant la procédure.** Le client veut racheter le matériel
   directement au gérant tout de suite. → Gate 2 (b) : risque de **nullité de la
   période suspecte (L.632-1 / L.632-2)** si la cessation des paiements est
   caractérisée. La voie sûre passe par les organes **après jugement**.

3. **CP > 45 j non déclarée.** La cible est en cessation des paiements depuis des
   mois sans avoir rien déclaré. → Gate 1 : l'entreprise **doit déclarer** ; on ne
   structure pas une acquisition libre → **renvoi `prevention-difficultes`**.

## Chargement du profil

> Lire `~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/CLAUDE.md`, bloc M&A + bloc procédures collectives :
> - **Position dominante** — ce skill suppose le **côté repreneur** (le candidat acquéreur)
> - **Side M&A habituel** — acquéreur ; taille de deals typique
> - **Politique PII** — `passive` / `active` (défaut) / `strict` + seuil B

Si le bloc est `[A CONFIGURER]` : stopper et demander `/h-da:entretien-demarrage`.

---

## Intake

1. **Côté** — **repreneur** (le candidat acquéreur). Pas de mode neutre ; côté cédant/débiteur hors périmètre.
2. **Niveau de difficulté de la cible** — *in bonis* avec difficultés / amiable (mandat ad hoc, conciliation) / RJ / LJ ? **cessation des paiements** datée ? depuis plus de 45 jours ? (**déterminant** — voir Gate 1, lookup BODACC).
3. **Structure envisagée** — le client penche-t-il pour un **share deal** (titres) ou un **asset deal** (actifs) ? pourquoi ? (souvent « les titres c'est plus simple » → piège Gate 2 a).
4. **Calendrier de l'acquisition** — envisagée **avant** tout jugement (achat au débiteur) ou **dans** une procédure (via les organes) ? (**déterminant** — voir Gate 2 b, période suspecte).
5. **Périmètre & passif** — quel passif pèse sur la société (dettes fiscales/sociales/fournisseurs, litiges) ? un **fonds de commerce** dans le périmètre (solidarité fiscale) ? des **salariés** et **contrats clés** (bail, licence) ?
6. **Objectifs fiscaux** — le client veut-il conserver des **déficits reportables** ? (dimension fiscale → flag + renvoi conseil fiscal, pas d'avis).

---

## Gate non-juriste

- [ ] Pré-flight `check-pii` exécuté et décision utilisateur respectée
- [ ] **Gate 1 — niveau de difficulté tranché** : cible située sur le spectre (in bonis / amiable / RJ / LJ) ; **CP > 45 j sans procédure → STOP + renvoi `prevention-difficultes`**
- [ ] **Routage identifié** : amiable préparable → `pre-pack-cession` ; RJ/LJ avec appel d'offres → `reprise-a-la-barre` ; actifs isolés en LJ → `cession-actifs-isoles` ; share deal → `spa-review` / `gap-review` / `closing-checklist-fr`
- [ ] **Gate 2 (a) — passif** : ne JAMAIS laisser entendre qu'un **share deal purge le passif** ; on hérite dettes + procédures + litiges
- [ ] **Gate 2 (b) — période suspecte (L.632-1 / L.632-2)** : acquisition pré-procédure signalée comme annulable ; voie sûre = via les organes après jugement
- [ ] **Responsabilité repreneur cartographiée** : L.1224-1 (social), solidarité fiscale L.1684 CGI `[review]`, extension/confusion de patrimoine, insuffisance d'actif L.651-2, environnement ICPE `[review]`
- [ ] **Aucun conseil fiscal** donné : déficits/droits d'enregistrement/solidarité → flag + renvoi conseil fiscal
- [ ] Côté repreneur déclaré ; le skill décide et route, **n'exécute pas**
- [ ] Citations vérifiées via `verifier-citations` ou taguées `[à vérifier]`

---

## Outils MCP à privilégier

- Identification entreprise + procédures publiées : `company_full_profile`, `bodacc_by_siren`, `bodacc_procedures` (situer le niveau de difficulté, détecter une procédure ouverte, le type, les dates).
- Socle sources officielles : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `eurlex_recherche`, `eurlex_consulter`.

---

## Emplacement des sorties

```
outputs/asset-vs-share-distress-<entreprise-slug>-YYYY-MM-DD.md
```

---

## Sortie

### Format livrable

```
[En-tête de confidentialité selon le rôle]

> ⚠️ Note du relecteur
> - **Sources :** Légifrance ✓ / BODACC ✓ / Judilibre ✓ (cocher ✗ si non connectée)
> - **Lecture :** situation décrite + {N} pièces
> - **Signalé pour ton jugement :** {N} éléments [review] (niveau de difficulté, choix de structure, responsabilité repreneur, dimension fiscale) | aucun
> - **Fraîcheur :** réforme du 15 septembre 2021 (ord. transposition directive restructuration) — vérifier seuils/délais en vigueur | recherche impossible
> - **Avant de t'appuyer dessus :** {action — ex. confirmer la date de cessation des paiements / faire chiffrer la dimension fiscale par un fiscaliste} | « prêt pour relecture »

# Asset vs share deal en distress — note d'orientation [CÔTÉ repreneur]

# 1. Diagnostic du niveau de difficulté (Gate 1)
- Cible située : {in bonis avec difficultés / amiable / RJ / LJ} (lookup BODACC). Cessation des paiements : {datée le … / > 45 j ? / non caractérisée}.
- {Si **CP > 45 j sans procédure** → l'entreprise doit la déclarer → on ne structure pas librement → renvoi `prevention-difficultes`.}

# 2. Arbitrage titres vs actifs
| Axe | Share deal (titres) | Asset deal (actifs) |
|---|---|---|
| Passif | **hérité en bloc, aucune purge** | laissé derrière (sauf exceptions) |
| Continuité (contrats / autorisations / agréments) | préservée | rupture — pas de transfert auto |
| Salariés | suivent la société | **L.1224-1** si entité économique autonome |
| Sûretés / purge | non purgées | purge selon la voie judiciaire (skills aval) |
| Véhicule | hors plan (négocié) | plan de cession / actifs isolés / pre-pack |
| Fiscalité | déficits reportables `[review]` fiscal | droits d'enregistrement, **solidarité L.1684 CGI** `[review]` fiscal |
- **Alerte Gate 2 (a)** : un share deal d'une société en difficulté **ne purge rien**.

# 3. Cartographie de la responsabilité repreneur
- **Période suspecte (L.632-1 nullités de droit / L.632-2 facultatives)** : acquisition pré-procédure annulable → voie sûre via les organes après jugement. {🟠/🔴 selon le calendrier}
- **L.1224-1** : transfert automatique des contrats de travail si entité économique autonome cédée.
- **Solidarité fiscale (L.1684 CGI)** : le cessionnaire d'un fonds peut être tenu solidairement de certains impôts du cédant → **conseil fiscal** `[review]`.
- **Extension de procédure / confusion de patrimoine** ; **insuffisance d'actif (L.651-2)** si le repreneur devient dirigeant ; **passif environnemental ICPE** `[review]`.

# 4. Recommandation & routage
- Structure recommandée : {titres / actifs / voie} — justification distress-aware (passif, continuité, calendrier, risque de nullité).
- **Renvois** :
  - `/h-da:prevention-difficultes` — si CP > 45 j / dispositif amiable à enclencher.
  - `/h-da:pre-pack-cession` — si cession préparable confidentiellement en amont.
  - `/h-da:reprise-a-la-barre` — si plan de cession (going concern) en RJ/LJ.
  - `/h-da:cession-actifs-isoles` — si actifs isolés en LJ.
  - `/h-da:spa-review` / `/h-da:gap-review` / `/h-da:closing-checklist-fr` — si share/asset deal négocié, projet d'acte.
  - **Conseil fiscal externe** — pour toute dimension fiscale (déficits, droits d'enregistrement, solidarité L.1684 CGI).

# Une question hors de ma checklist habituelle
{Observation transversale — ex. articulation prix / garantie de passif dans un share deal distress, intérêt d'une NEWCO repreneuse, clean team si repreneur concurrent. Omettre si rien d'honnête.}

# Que veux-tu faire ? Choisis une option :
1. **Rédiger** — je prépare une note de recommandation de structure (titres vs actifs) argumentée pour le client / le comité d'investissement.
2. **Escalader** — note vers {approbateur configuré} pour décision de structure / d'engagement.
3. **Compléter les faits** — questions (date exacte de cessation des paiements, état du passif, calendrier d'acquisition, périmètre).
4. **Surveiller et attendre** — suivi avec point de revisite (évolution de la procédure).
5. **Autre** — précise.
```

---

## Étape 1 — Pré-flight et Gate 1 (diagnostic + routage)

1. Invoquer `check-pii`. Lire le profil cabinet (blocs M&A + procédures collectives) et confirmer le **côté repreneur**. Raisonner **à la date du jour** (dates absolues).
2. Vérifier via `bodacc_procedures` / `bodacc_by_siren` / `company_full_profile` où en est la cible : procédure ouverte ? type (amiable confidentiel non publié / RJ / LJ) ? dates ? **cessation des paiements** caractérisée et datée ?
3. **Trancher le niveau de difficulté + router.** Cas tranchant : si la **cessation des paiements date de plus de 45 jours et qu'aucune procédure collective n'est ouverte**, l'entreprise **doit la déclarer** (obligation du dirigeant) — on ne structure pas une acquisition libre → **renvoi `/h-da:prevention-difficultes`**. Sinon, orienter : amiable préparable → `pre-pack-cession` ; RJ/LJ avec appel d'offres → `reprise-a-la-barre` ; actifs isolés en LJ → `cession-actifs-isoles`.

## Étape 2 — Arbitrage titres vs actifs

Dérouler le comparatif **distress-aware** (cf. tableau du livrable) : passif (hérité en bloc dans un share deal vs laissé derrière dans un asset deal), continuité des contrats/autorisations/agréments, salariés (L.1224-1), sûretés/purge, véhicule procédural, fiscalité (flag). **Marteler le Gate 2 (a)** : un **share deal d'une société en difficulté ne purge AUCUN passif** — le repreneur hérite des dettes, des procédures en cours et des litiges. Ne jamais présenter le rachat de titres comme un moyen d'éviter le passif.

## Étape 3 — Cartographie de la responsabilité repreneur

- **Période suspecte (L.632-1 / L.632-2 C.com. `[Légifrance]`)** — Gate 2 (b). Une acquisition conclue **avec le débiteur avant le jugement d'ouverture** peut être **annulée** si elle intervient en période suspecte : nullités **de droit** (L.632-1, ex. actes à titre gratuit, paiements anormaux) ou **facultatives** (L.632-2, actes à titre onéreux si le cocontractant connaissait la cessation des paiements). La voie sûre est l'acquisition **via les organes, après jugement**.
- **L.1224-1 C.trav. `[Légifrance]`** : transfert automatique des contrats de travail si une **entité économique autonome conservant son identité** est cédée (vaut aussi en asset deal).
- **Solidarité fiscale (art. 1684 CGI `[connaissance modèle — à vérifier]`)** : le cessionnaire d'un fonds de commerce peut être tenu **solidairement** de certains impôts dus par le cédant pendant un délai → **conseil fiscal obligatoire**, le skill ne chiffre pas. `[review]`
- **Extension de procédure / confusion de patrimoine** ; **insuffisance d'actif (L.651-2 C.com.)** si le repreneur devient **dirigeant** de la cible reprise ; **passif environnemental ICPE** (sites pollués) `[review]`.

## Étape 4 — Recommandation de structure

Formuler une **recommandation distress-aware** (titres / actifs / voie) en pesant : ampleur du passif (en faveur de l'asset deal s'il est lourd), besoin de continuité (contrats/autorisations en faveur du share deal), calendrier et risque de nullité (période suspecte), dimension sociale (L.1224-1), dimension fiscale (flag, pas d'arbitrage chiffré). Préférer l'option la plus protectrice pour le repreneur et signaler explicitement les arbitrages `[review]`.

## Étape 5 — Routage

Orienter vers le skill aval adéquat (sans en dérouler la mécanique) : `prevention-difficultes` / `pre-pack-cession` / `reprise-a-la-barre` / `cession-actifs-isoles` / `spa-review` / `gap-review` / `closing-checklist-fr`, et **conseil fiscal externe** pour toute dimension fiscale.

## Étape 6 — Post-flight `verifier-citations`

Lancer `verifier-citations` sur tous les articles cités (L.632-1, L.632-2, L.642-1, L.642-19, L.1224-1, L.651-2, art. 1684 CGI). Tout article non confirmé reste `[à vérifier]`.

---

## Ce skill ne fait pas

- **Exécuter** : ni offre de reprise, ni SPA, ni acte de cession, ni déroulé détaillé de L.642-x → skills aval (`reprise-a-la-barre`, `cession-actifs-isoles`, `pre-pack-cession`, `spa-review`, `gap-review`, `closing-checklist-fr`).
- **Donner un conseil fiscal** (déficits reportables, droits d'enregistrement, solidarité L.1684 CGI) — flag + renvoi conseil fiscal.
- **Traiter le côté cédant / débiteur / organes de la procédure** — côté repreneur uniquement.
- **Enclencher un dispositif préventif** (mandat ad hoc / conciliation) → renvoi `/h-da:prevention-difficultes`.
- Tout seuil / délai (période suspecte, déclaration de CP) reste `[à vérifier]` si non confirmé en source primaire.

---

## Ton

Technique, prudent, **piloté par le double gate** : situer d'abord le niveau de difficulté (Gate 1) et router si la cible est au-delà du seuil amiable (CP > 45 j → `prevention-difficultes`) ; marteler le Gate 2 (a) (un **share deal ne purge pas le passif**) et le Gate 2 (b) (période suspecte L.632-1/632-2). Côté repreneur : éclairer l'arbitrage titres vs actifs sans le trancher à la place du client, cartographier la responsabilité (social, fiscal flag, extension/confusion, L.651-2, environnement), puis **router** vers le bon playbook. Ne jamais exécuter ni donner de conseil fiscal. Brouillon soumis à validation humaine (avocat) avant toute décision de structure.
````

- [ ] **Step 2 : Vérifier que le skill ne lit jamais le ground-truth** — le SKILL.md ne référence aucun fichier `ground-truth.md` (garde-fou anti-contamination Phase 3). Confirmé dans le contenu ci-dessus (aucune mention).

- [ ] **Step 3 : Commit**

```bash
git add plugins/hacienda-droit-affaires/skills/asset-vs-share-distress/SKILL.md
git commit -m "feat(da): skill asset-vs-share-distress (routeur structuration, cote repreneur)"
```

---

## Task 3 : Wrapper commande + README + count (test vert)

**Files :**
- Create: `plugins/hacienda-droit-affaires/commands/h-da/asset-vs-share-distress.md`
- Modify: `plugins/hacienda-droit-affaires/README.md`
- Modify: `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts:222`

- [ ] **Step 1 : Lire le gabarit du wrapper existant** pour reproduire le format exact (description + argument-hint **identiques** au SKILL.md, exigé par le test) :

Run : `cat plugins/hacienda-droit-affaires/commands/h-da/cession-actifs-isoles.md`

- [ ] **Step 2 : Créer le wrapper** `plugins/hacienda-droit-affaires/commands/h-da/asset-vs-share-distress.md` en copiant la structure de `cession-actifs-isoles.md` et en adaptant : `description` et `argument-hint` doivent être **identiques** à ceux du frontmatter du SKILL.md (Task 2). **Ne pas** y faire figurer `/hacienda-droit-affaires:` ni `/h-droit-affaires:` (interdit par le test).

- [ ] **Step 3 : README** — ajouter, au même endroit/format que les autres skills DA, une ligne avec `/h-da:asset-vs-share-distress` + description courte (ex. « Arbitrage de structuration côté repreneur pour une cible en difficulté : titres vs actifs, responsabilité repreneur (période suspecte, passif), routage vers le bon playbook. »).

- [ ] **Step 4 : Bumper le count du test** — `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts:222` :

```ts
    expect(skillFiles.length).toBe(26);
```

- [ ] **Step 5 : Lancer le test de structure**

Run : `npx vitest run packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts`
Expected : PASS (26 skills, wrapper + README cohérents, description/argument-hint identiques).

- [ ] **Step 6 : Commit**

```bash
git add plugins/hacienda-droit-affaires/commands/h-da/asset-vs-share-distress.md \
        plugins/hacienda-droit-affaires/README.md \
        packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts
git commit -m "feat(da): wrapper + README + count asset-vs-share-distress (25->26)"
```

---

## Task 4 : Étendre le wrapper de scoring `da-scoring.sh`

**Files :**
- Modify: `scripts/da-scoring.sh`

> Repère : suivre le bloc « POUR AJOUTER UN SKILL » du script et calquer les lignes `cession-actifs-isoles`. Les fonctions à compléter : `code_for`, `mode_for`, `spec_for`, `desc_for`, `command_for`, + tableau `SKILLS` + liste `usage()`.

- [ ] **Step 1 : Ajouter au tableau `SKILLS`** (après `cession-actifs-isoles`) :

```bash
  asset-vs-share-distress
```

- [ ] **Step 2 : Ajouter à la liste `Skills:` du `usage()`** (après `cession-actifs-isoles`) la même entrée.

- [ ] **Step 3 : `code_for`** — ajouter la ligne du case (code du cycle courant, ex. `AVS1RT` pour cycle 1 « routage ») :

```bash
    asset-vs-share-distress) echo "AVS1RT" ;;
```

- [ ] **Step 4 : `mode_for`** (après cession-actifs-isoles) :

```bash
    asset-vs-share-distress) echo "note d'orientation (mode unique)" ;;
```

- [ ] **Step 5 : `spec_for`** (après cession-actifs-isoles) :

```bash
    asset-vs-share-distress) echo "docs/superpowers/specs/2026-06-15-hacienda-da-asset-vs-share-distress-design.md" ;;
```

- [ ] **Step 6 : `desc_for`** (après cession-actifs-isoles) — description NEUTRE pour Codex (PAS le SKILL.md) :

```bash
    asset-vs-share-distress) echo "Note d'orientation cote repreneur pour arbitrer la structuration d'acquisition d'une cible en difficulte (rachat de titres vs rachat d'actifs) et orienter vers la bonne procedure." ;;
```

- [ ] **Step 7 : `command_for`** (après cession-actifs-isoles) :

```bash
    asset-vs-share-distress) echo "/h-da:asset-vs-share-distress" ;;
```

- [ ] **Step 8 : Vérifier que le wrapper reconnaît le skill**

Run : `bash scripts/da-scoring.sh 2>&1 | grep -A30 'Skills:'`
Expected : `asset-vs-share-distress` apparaît dans la liste.

- [ ] **Step 9 : Commit**

```bash
git add scripts/da-scoring.sh
git commit -m "chore(da): da-scoring.sh support asset-vs-share-distress (code defaut AVS1RT)"
```

---

## Task 5 : Phase 2 — vérité terrain (Codex HIGH, sans SKILL.md)

**Files :**
- Create: `plugins/hacienda-droit-affaires/tests/datasets/da-asset-vs-share-distress/ground-truth.md`

- [ ] **Step 1 : Générer le prompt Codex** (Claude génère la commande, Candy l'exécute) :

Run : `bash scripts/da-scoring.sh phase2 asset-vs-share-distress`
(le prompt est copié dans le presse-papier via pbcopy)

- [ ] **Step 2 : Candy lance Codex GPT-5.5 effort HIGH** dans une **session distincte sans le SKILL.md**, colle le prompt, sauvegarde la grille de critères atomiques tiered-gated **uniquement** (bloc JSON pur `{skill, criteria:[{id,niveau,axe,match_criteria}]}`) dans `ground-truth.md`. Si la sortie est aplatie : `python3 -m json.tool ground-truth.md > tmp && mv tmp ground-truth.md`.

- [ ] **Step 3 : CHECKPOINT revue des gates (Claude, AVANT Phase 3)** — vérifier que `ground-truth.md` contient bien des **gates CRITIQUE binaires** avec trigger FAIL lisible, et que ces gates couvrent : (1) **diagnostic + routage** (dont CP > 45 j sans procédure → `prevention-difficultes`), (2) **share deal ne purge pas le passif**, (3) **période suspecte L.632-1/632-2**. Vérifier que `PASS` est le **complément exact** de `FAIL` (pas de zone orpheline). Ne PAS modifier la grille après le run live (intégrité blind). Cf. [[feedback-gate-calibration-scoring]].

- [ ] **Step 4 : Commit**

```bash
git add plugins/hacienda-droit-affaires/tests/datasets/da-asset-vs-share-distress/ground-truth.md
git commit -m "test(da): ground-truth asset-vs-share-distress (Phase 2, Codex HIGH)"
```

---

## Task 6 : Phase 3 — exécution live (modèle frais, sans ground-truth)

**Files :**
- Create: `plugins/hacienda-droit-affaires/tests/datasets/da-asset-vs-share-distress/live-output.md`

- [ ] **Step 1 : Synchroniser le cache** (la session live teste la version courante du skill) :

Run : `bash scripts/da-scoring.sh phase3-resync`

- [ ] **Step 2 : Générer le prompt de session fraîche** :

Run : `bash scripts/da-scoring.sh phase3-prompt asset-vs-share-distress`

- [ ] **Step 3 : Session Claude Code FRAÎCHE (Sonnet recommandé)** — coller le prompt, invoquer le skill `asset-vs-share-distress` sur `scenario.md`. **Interdiction explicite de lire `ground-truth.md`** (garde-fou anti-contamination). Produire la note d'orientation. **Garder le même modèle live sur tous les cycles de ce skill** (delta d'enrichissement propre).

- [ ] **Step 4 : Sauvegarder la sortie** dans `plugins/hacienda-droit-affaires/tests/datasets/da-asset-vs-share-distress/live-output.md` (verbatim). Ne pas laisser de `live-output.md` à la racine du repo (piège récurrent).

- [ ] **Step 5 : Commit**

```bash
git add plugins/hacienda-droit-affaires/tests/datasets/da-asset-vs-share-distress/live-output.md
git commit -m "test(da): live-output asset-vs-share-distress (Phase 3)"
```

---

## Task 7 : Phase 4 — scoring + agrégation (Codex medium, sans SKILL.md)

**Files :**
- Create: `plugins/hacienda-droit-affaires/tests/datasets/da-asset-vs-share-distress/verdicts-<CODE>-codex.json`

- [ ] **Step 1 : Générer le prompt de scoring** (Claude génère, Candy exécute) :

Run : `bash scripts/da-scoring.sh phase4 asset-vs-share-distress`

- [ ] **Step 2 : Candy lance Codex GPT-5.5 medium** (session distincte sans SKILL.md), produit les verdicts JSON purs dans `verdicts-AVS1RT.json`. Si aplati : `python3 -m json.tool`. **Si Codex émet un verdict hors barème (`PASS_WITH_RESERVE`)** → le normaliser en **FAIL** (conservateur) et le documenter (cf. [[feedback-scoring-wrapper-workflow]]).

- [ ] **Step 3 : Agrégation** (Candy exécute) :

Run : `bash scripts/da-scoring.sh aggregate asset-vs-share-distress`

- [ ] **Step 4 : Claude analyse** le résultat **gate-driven, pas chiffre** : ADMIS / RÉSERVES / INSUFFISANT, et liste les gates CRITIQUE éventuellement FAIL. `gate_failures: []` = feu vert. Un INSUFFISANT/RÉSERVES **sans** gate FAIL = enrichir les MAJEUR (pas un correctif de gate). Coller à Claude le JSON `verdicts-<CODE>.json` plutôt que le bloc `aggregate`. Cf. [[feedback-gate-calibration-scoring]].

- [ ] **Step 5 : Commit**

```bash
git add plugins/hacienda-droit-affaires/tests/datasets/da-asset-vs-share-distress/verdicts-*.json
git commit -m "test(da): cycle AVS1RT asset-vs-share-distress - {verdict/score}"
```

---

## Task 8 : Correctifs (conditionnel — si gate CRITIQUE FAIL ou MAJEUR manqués)

**Files :**
- Modify: `plugins/hacienda-droit-affaires/skills/asset-vs-share-distress/SKILL.md`

- [ ] **Step 1 : Décider** — si T7 est gate-clean (ADMIS/RÉSERVES sans gate FAIL), **sauter cette tâche**, aller à T9.
- [ ] **Step 2 : Correctif ciblé** — si un gate CRITIQUE FAIL : ajouter l'**ancrage de l'article/point tranchant** manquant, sans réécriture large, dans la seule section concernée. Candidats les plus probables : **routage CP > 45 j** (Gate 1), **share deal ne purge pas le passif** (Gate 2 a), **période suspecte L.632-1/632-2** (Gate 2 b). Si des MAJEUR sont manqués sans gate : enrichir le contenu doctrinal correspondant (tableau titres/actifs, L.1224-1, solidarité fiscale, extension/confusion).
- [ ] **Step 3 : Commit puis reboucler T6→T7** (nouvelle session fraîche, **nouveau `CODE`**, ex. `AVS2EN`) jusqu'à gate-clean. Penser à bumper le code défaut dans `code_for` (ou utiliser l'override `CODE=`).

```bash
git add plugins/hacienda-droit-affaires/skills/asset-vs-share-distress/SKILL.md
git commit -m "fix(da): asset-vs-share-distress ancrage {article} ferme gate {id}"
```

---

## Task 9 : Release v0.9.0

**Files :**
- Modify (bump 0.8.0 → 0.9.0, **les 5 fichiers / 6 occurrences**) :
  - `plugins/hacienda-droit-affaires/version.json`
  - `plugins/hacienda-droit-affaires/manifest.json`
  - `plugins/hacienda-droit-affaires/mcp-server/package.json`
  - `plugins/hacienda-droit-affaires/.claude-plugin/plugin.json`
  - `plugins/hacienda-droit-affaires/.claude-plugin/marketplace.json` (2 occurrences)
- Modify: `plugins/hacienda-droit-affaires/CHANGELOG.md`

- [ ] **Step 1 : Repérer les occurrences** :

Run : `grep -rln '"version": "0.8.0"\|"0.8.0"' plugins/hacienda-droit-affaires/ | grep -vE 'node_modules|tests|dist'`

- [ ] **Step 2 : Bump version** dans les 5 fichiers, `0.8.0` → `0.9.0` (marketplace.json en a 2). Commande sûre par fichier :

```bash
for f in version.json manifest.json mcp-server/package.json .claude-plugin/plugin.json .claude-plugin/marketplace.json; do
  sed -i '' 's/"0\.8\.0"/"0.9.0"/g' "plugins/hacienda-droit-affaires/$f"
done
```

- [ ] **Step 3 : CHANGELOG** — entrée v0.9.0 :

```markdown
## [0.9.0] — 2026-06-15

**Nouveau skill `asset-vs-share-distress` (distressed-M&A #4, routeur) — gate-clean RÉSERVES {score}.**

### Cycle distressed-M&A #4 (entonnoir amont du moat)
- `asset-vs-share-distress` — **{verdict/score, run AVS1RT}**. Note d'orientation **côté repreneur** : arbitrage **titres vs actifs** pour une cible en difficulté, cartographie de la responsabilité repreneur, puis **routage** vers le bon playbook. Double gate : (1) diagnostic du niveau de difficulté + routage (CP > 45 j sans procédure → `prevention-difficultes`) ; (2) responsabilité repreneur — share deal ne purge pas le passif + période suspecte **L.632-1 / L.632-2**.
- Opère aussi L.1224-1 (transfert social), solidarité fiscale L.1684 CGI (flag, pas de conseil fiscal), extension/confusion de patrimoine, insuffisance d'actif L.651-2, passif environnemental ICPE. Garde-fou anti-redondance : décide et route, n'exécute pas (ne déroule pas L.642-x).
- 26 skills ; wrapper `/h-da:asset-vs-share-distress` + entrée README.

### Limites assumées v0.9.0
- `asset-vs-share-distress` : mode unique (pas de `--review`). Aucun conseil fiscal (flag + renvoi). Côté repreneur uniquement.
```

- [ ] **Step 4 : Suite de vérification complète**

```bash
npm test
npm run typecheck
npm run build
npm run branding:check
git diff --check
```
Expected : tout PASS (dont `hacienda-droit-affaires-cowork-structure` : 26 skills, wrapper + README OK, versions alignées sur 0.9.0).

- [ ] **Step 5 : Commit + PR vers main**

Écrire le corps de PR dans un fichier (piège heredoc) puis `--body-file` :

```bash
git add plugins/hacienda-droit-affaires/version.json \
        plugins/hacienda-droit-affaires/manifest.json \
        plugins/hacienda-droit-affaires/mcp-server/package.json \
        plugins/hacienda-droit-affaires/.claude-plugin/plugin.json \
        plugins/hacienda-droit-affaires/.claude-plugin/marketplace.json \
        plugins/hacienda-droit-affaires/CHANGELOG.md
git commit -m "release(da): bump v0.8.0 -> v0.9.0 - skill asset-vs-share-distress (distressed-M&A #4)"
git push -u origin feat/da-asset-vs-share-distress
gh pr create --base main --head feat/da-asset-vs-share-distress \
  --title "release(da): asset-vs-share-distress v0.9.0 (distressed-M&A #4)" \
  --body-file ~/avs-pr-body.md
```
> Rappel handoff : cibler **main directement** ; vérifier d'abord que `main` n'a pas avancé (sinon rebaser).

- [ ] **Step 6 : MAJ handoff/backlog** — créer un nouveau handoff daté avec le résultat (cycle AVS1RT+) et l'état du moat distressed-M&A (4 skills : `pre-pack-cession`, `reprise-a-la-barre`, `cession-actifs-isoles`, `asset-vs-share-distress` — moat complet ; noter les pistes futures éventuelles). Marquer le cycle #4 terminé.

---

## Notes d'exécution

- **Ordre des phases** : T1 (scénario) précède T5 (Codex score contre le scénario). T2/T3/T4 (build + wrapper + scoring) précèdent T6 (live exécute le skill courant). T5 et T6 sont indépendants mais tous deux requis avant T7. T4 doit précéder T5/T6/T7.
- **Séparation des acteurs** (protocole CLAUDE.md) : Phase 2 et Phase 4 = Codex sans SKILL.md ; Phase 3 = modèle frais sans ground-truth. Un même acteur sur les 4 = `[scoring auto-référent]`, non recevable.
- **Modèle live = Sonnet recommandé** (test plus représentatif des utilisateurs Cowork, lecture honnête du plancher du skill) ; garder le même modèle sur tous les cycles de ce skill.
- **Adaptation TDD** : le « test » de la qualité doctrinale est le scoring blind (T5-T7), pas un test unitaire. Les seuls tests automatisés sont structurels (`cowork-structure`, T3/T9).
- **Économie tokens** : Candy lance les commandes scoring (Codex abondant, Opus rare) ; Claude génère les prompts et fait l'analyse gate-driven. Cf. [[feedback-token-economy-codex]] et [[feedback-scoring-wrapper-workflow]].
- **Pièges environnement** : shell en `set -e` (commandes séparées / `|| true`) ; ENOSPC intermittent sur le FS temp (rediriger la sortie vers fichier hors `/tmp` puis Read) ; heredoc imbriqué dans `gh pr create` → `--body-file` ; `live-output.md` à ne pas laisser à la racine.
- **Garde-fou anti-redondance** : à chaque phase, vérifier que le skill **route** et n'exécute pas — un live qui déroule la mécanique L.642-x ou rédige un acte est un signal de dérive du périmètre.
