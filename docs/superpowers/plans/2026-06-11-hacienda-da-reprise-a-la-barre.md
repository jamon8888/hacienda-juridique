# Reprise à la barre / plan de cession (DA) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal :** Livrer le skill `reprise-a-la-barre` (playbook tactique **côté repreneur** pour construire et défendre une offre de reprise gagnante sur une cible **déjà en RJ/LJ** avec appel d'offres ouvert), validé **gate-clean** par scoring blind 4 phases, et bumper DA en **v0.7.0**.

**Architecture :** Un seul `SKILL.md` au moule canonique V2 DA (Examples → Chargement du profil → Intake → Gate non-juriste → Outils MCP → Emplacement des sorties → Sortie → Étapes → Ce skill ne fait pas → Ton). **Double gate** : Gate 1 = porte d'entrée (cible déjà en RJ/LJ + appel d'offres ouvert ; sinon renvoi `pre-pack-cession`) ; Gate 2 = recevabilité de l'offre (éligibilité L.642-3 + offre ferme/écrite L.642-2). La frontière avec `pre-pack-cession` est portée par Gate 1. La « validation » n'est pas un test unitaire mais le **protocole blind 4 phases Codex** + le test `cowork-structure` au release.

**Tech Stack :** Markdown SKILL.md (skeleton V2 imposé par `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts`), wrapper de scoring `scripts/da-scoring.sh` (à étendre), helper `scripts/codex-blind-scoring.py`, agrégation `scripts/tiered_scoring.py`, suite repo (`npm test`, `npm run typecheck`, `npm run build`, `npm run branding:check`).

**Spec de référence :** [`docs/superpowers/specs/2026-06-11-hacienda-da-reprise-a-la-barre-design.md`](../specs/2026-06-11-hacienda-da-reprise-a-la-barre-design.md)

**Convention tokens (mémoire) :** les commandes de scoring/agrégation (Codex, `da-scoring.sh`, `tiered_scoring.py`) sont **lancées par Candy**, pas par Claude. Claude génère/analyse. Code de cycle 1 : **`RLB1OF`**.

**Branche :** `feat/da-reprise-a-la-barre` (déjà créée ; le design doc y est commité). PR vers `main` directement.

---

## File Structure

| Fichier | Rôle | Tâche |
|---|---|---|
| `plugins/hacienda-droit-affaires/tests/datasets/da-reprise-a-la-barre/scenario.md` | Input fictif partagé (Phase 1) | T1 |
| `plugins/hacienda-droit-affaires/skills/reprise-a-la-barre/SKILL.md` | Le skill (livrable) | T2 |
| `plugins/hacienda-droit-affaires/commands/h-da/reprise-a-la-barre.md` | Wrapper slash `/h-da:` (exigé par cowork-structure) | T3 |
| `plugins/hacienda-droit-affaires/README.md` | Entrée `/h-da:reprise-a-la-barre` (exigée) + count | T3 |
| `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts:222` | Count `toBe(23)` → `toBe(24)` | T3 |
| `scripts/da-scoring.sh` | Ajout du skill (SKILLS array + usage + 5 fonctions) | T4 |
| `.../da-reprise-a-la-barre/ground-truth.md` | Vérité terrain (Phase 2, Codex HIGH) | T5 |
| `.../da-reprise-a-la-barre/live-output.md` | Exécution live (Phase 3, Claude frais) | T6 |
| `.../da-reprise-a-la-barre/verdicts-RLB1OF-codex.json` | Scoring (Phase 4, Codex) | T7 |
| `plugins/hacienda-droit-affaires/version.json` (+ 4 autres + CHANGELOG) | Bump 0.6.0 → 0.7.0 | T9 |

---

## Task 1 : Scénario fictif (Phase 1 — input partagé)

**Files :**
- Create: `plugins/hacienda-droit-affaires/tests/datasets/da-reprise-a-la-barre/scenario.md`

- [ ] **Step 1 : Rédiger le scénario** — un cas fictif réaliste, neutre (ne révèle pas la « bonne réponse »). Données brutes (pas d'instructions) :
  - Société cible PME **déjà placée en redressement judiciaire** (secteur, CA, effectif), administrateur judiciaire désigné, **appel d'offres ouvert** avec une date limite de dépôt proche.
  - Le **client est un candidat-repreneur** (concurrent ou fonds), qui a pour l'instant une **simple LOI / lettre d'intention indicative** (piège : pas une offre ferme L.642-2).
  - Élément piégeux **éligibilité** : un lien possible entre le repreneur et l'ancien dirigeant / un parent du dirigeant, OU un montage via société interposée (piège L.642-3).
  - Une **offre concurrente** déposée par un autre candidat (mise en concurrence).
  - Des **sûretés** sur les actifs (nantissement de fonds, gage), des **contrats** clés (bail, licence, fournisseur) que le repreneur veut reprendre, un **CSE** dans l'entreprise.
  - Optionnel : le repreneur veut n'isoler que la marque + le fichier clients (piège cherry-picking L.642-1).
  - 1 à 3 questions du candidat-repreneur en fin de scénario (ex. « comment maximiser nos chances ? que risque-t-on ? »).

- [ ] **Step 2 : Vérifier la neutralité** — relire : le scénario ne doit **pas** citer les articles-réponses (L.642-x, L.661-6) ni nommer les gates. Données factuelles uniquement.

- [ ] **Step 3 : Commit**

```bash
git add plugins/hacienda-droit-affaires/tests/datasets/da-reprise-a-la-barre/scenario.md
git commit -m "test(da): scenario fictif reprise-a-la-barre (Phase 1)"
```

---

## Task 2 : Le skill `SKILL.md` (build)

**Files :**
- Create: `plugins/hacienda-droit-affaires/skills/reprise-a-la-barre/SKILL.md`
- Référence structurelle : `plugins/hacienda-droit-affaires/skills/pre-pack-cession/SKILL.md` (gabarit V2 exact) + `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts` (assertions skeleton)

- [ ] **Step 1 : Créer le fichier avec ce contenu exact** (contenu doctrinal complet, pas de placeholder) :

````markdown
---
name: reprise-a-la-barre
description: >
  Playbook tactique côté candidat-repreneur pour construire, optimiser et
  défendre une offre de reprise sur une entreprise déjà placée en redressement
  ou liquidation judiciaire, dans le cadre d'un appel d'offres ouvert (plan de
  cession, L.642-1 s.). Double gate : (1) porte d'entrée — la cible est-elle déjà
  en RJ/LJ avec appel d'offres ouvert ? sinon, si la cession peut être préparée
  confidentiellement en amont, renvoi `pre-pack-cession` ; (2) recevabilité de
  l'offre — éligibilité du repreneur (L.642-3, interdictions / interposition
  prohibée) et offre ferme et écrite (L.642-2), pas une LOI indicative. Opère les
  mentions de l'offre (L.642-2), les contrats repris désignés (L.642-7), les
  critères de choix du tribunal (L.642-5), le sort des sûretés (L.642-12) et les
  voies de recours (L.661-6). Côté repreneur uniquement. Ne rédige pas l'acte de
  cession → `spa-review` / `gap-review` / `closing-checklist-fr`. Brouillon,
  validation humaine (avocat) OBLIGATOIRE.
version: "2.0.0"
argument-hint: "[note tactique (mode unique), cible en RJ ou LJ ?, appel d'offres ouvert ?, offre ferme ou LOI ?, côté repreneur]"
authors: ["Hacienda"]
tags: [reprise-a-la-barre, plan-de-cession, distressed-m&a, restructuring, l642, offre-de-reprise, redressement-judiciaire, liquidation-judiciaire]
---

# Skill — Reprise à la barre (offre de reprise en plan de cession)

> **BROUILLON, VALIDATION HUMAINE (AVOCAT) OBLIGATOIRE.**
>
> **🔴 Double gate.**
> - **Gate 1 — porte d'entrée** : ce skill ne joue que si la cible est **déjà en
>   RJ ou LJ avec un appel d'offres ouvert**. Si aucune procédure n'est ouverte et
>   que la cession peut être **préparée confidentiellement** (mandat ad hoc /
>   conciliation) → ce n'est pas une reprise à la barre → **renvoi
>   `pre-pack-cession`**.
> - **Gate 2 — recevabilité de l'offre** : (a) **éligibilité du repreneur
>   (L.642-3)** — dirigeants, parents et alliés jusqu'au 2nd degré, interposition
>   de personne sont **interdits d'acquérir** → offre **nulle** ; (b) **offre ferme
>   et écrite (L.642-2)** — une **LOI / lettre d'intention indicative n'est pas**
>   une offre judiciaire recevable, et l'offre déposée est **irrévocable**.
>
> **Point pivot.** Le **tribunal** choisit l'offre sur les critères de **L.642-5**
> (pérennité de l'emploi, paiement des créanciers, garanties d'exécution) — **pas**
> le prix le plus élevé seul, ni la préférence du dirigeant. Une offre optimisée se
> construit sur ces trois axes.

## Examples

1. **LOI ≠ offre.** Le candidat n'a déposé qu'une lettre d'intention indicative
   avant la date limite. → Gate 2 (b) : une LOI n'est **pas** une offre L.642-2 →
   convertir en **offre ferme et écrite** (périmètre, contrats, prix, financement,
   emplois, garanties, date) avant le dépôt, sinon irrecevable.

2. **Repreneur inéligible.** Le candidat est contrôlé par un parent de l'ancien
   dirigeant, via une holding interposée. → Gate 2 (a) : **interdiction d'acquérir
   (L.642-3)** → l'offre serait **nulle**. STOP : signaler l'inéligibilité avant
   tout travail sur l'offre ; une dérogation du tribunal est exceptionnelle.

3. **Cession encore préparable.** Aucune procédure ouverte, le dirigeant veut
   organiser discrètement la vente. → Gate 1 : pas d'appel d'offres ouvert →
   ce n'est pas une reprise à la barre → **renvoi `pre-pack-cession`** (montage
   confidentiel amont).

## Chargement du profil

> Lire `~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/CLAUDE.md`, bloc procédures collectives + bloc M&A :
> - **Position dominante** — ce skill suppose le **côté repreneur** (le candidat à la reprise)
> - **Tribunaux habituels** — tribunal compétent (commerce / judiciaire selon l'activité)
> - **Politique PII** — `passive` / `active` (défaut) / `strict` + seuil B

Si le bloc est `[A CONFIGURER]` : stopper et demander `/h-da:entretien-demarrage`.

---

## Intake

1. **Côté** — **repreneur** (le candidat à la reprise). Pas de mode neutre ; si l'utilisateur est côté débiteur/orchestration, renvoyer `pre-pack-cession` ou `prevention-difficultes`.
2. **État de la procédure** — la cible est-elle **déjà** en RJ / LJ ? appel d'offres **ouvert** ? date limite de dépôt des offres ? administrateur désigné ? (**déterminant** — voir Gate 1). Si aucune procédure ouverte → Gate 1 renvoie `pre-pack-cession`.
3. **Nature de l'intérêt du repreneur** — offre **ferme et écrite** déjà prête / simple **LOI indicative** / intention (**déterminant** — voir Gate 2 (b)).
4. **Éligibilité** — le candidat a-t-il un lien avec le dirigeant / un parent / une société interposée ? (**déterminant** — voir Gate 2 (a), L.642-3).
5. **Périmètre visé** — actifs (fonds, immeuble), **contrats à reprendre** (bail, licence, fournisseur), **emplois repris**, **actifs PI** (marques, brevets) ; risque de cherry-picking ?
6. **Concurrence** — d'autres offres déposées ? surenchère possible ? **sûretés** sur les actifs (nantissement, gage) ?

---

## Gate non-juriste

- [ ] Pré-flight `check-pii` exécuté et décision utilisateur respectée
- [ ] **Gate 1 — porte d'entrée tranchée** : cible **déjà en RJ/LJ avec appel d'offres ouvert** → ce skill ; sinon (cession préparable confidentiellement) → STOP + renvoi `pre-pack-cession`
- [ ] **Gate 2 (a) — éligibilité (L.642-3)** : pas de dirigeant / parent / interposition prohibée ; si lien suspect → STOP, offre potentiellement nulle, `[review]`
- [ ] **Gate 2 (b) — offre ferme et écrite (L.642-2)** : ce qui est sur la table est-il une **offre** (périmètre, contrats, prix, financement, emplois, garanties, date) ou une **LOI** ? une LOI est irrecevable
- [ ] **Point pivot rappelé** : le tribunal choisit sur **L.642-5** (emploi, créanciers, garanties), pas le prix seul
- [ ] Côté repreneur déclaré ; focale = exposition et optimisation de l'offre
- [ ] Durées / délais procéduraux (dépôt des offres, audience) tagués `[à vérifier]`
- [ ] Citations vérifiées via `verifier-citations` ou taguées `[à vérifier]`

---

## Outils MCP à privilégier

- Identification entreprise + procédures publiées : `company_full_profile`, `bodacc_by_siren`, `bodacc_procedures` (confirmer la procédure ouverte sur la cible, le type RJ/LJ, l'administrateur, les dates).
- Socle sources officielles : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `eurlex_recherche`, `eurlex_consulter`.

---

## Emplacement des sorties

```
outputs/reprise-a-la-barre-<entreprise-slug>-YYYY-MM-DD.md
```

---

## Sortie

### Format livrable

```
[En-tête de confidentialité selon le rôle]

> ⚠️ Note du relecteur
> - **Sources :** Légifrance ✓ / BODACC ✓ / Judilibre ✓ (cocher ✗ si non connectée)
> - **Lecture :** situation décrite + {N} pièces
> - **Signalé pour ton jugement :** {N} éléments [review] (éligibilité du repreneur, fermeté de l'offre, périmètre) | aucun
> - **Fraîcheur :** réforme du 15 septembre 2021 (ord. transposition directive restructuration) — vérifier durées/seuils en vigueur | recherche impossible
> - **Avant de t'appuyer dessus :** {action — ex. confirmer l'absence de lien d'interposition} | « prêt pour relecture »

# Reprise à la barre — note tactique [CÔTÉ repreneur]

# 1. Diagnostic & recevabilité
- **Gate 1 — porte d'entrée** : cible en {RJ / LJ} ✅, appel d'offres ouvert, date limite {date [review]}, administrateur {nom}. {Si pas de procédure ouverte → pas une reprise à la barre, renvoi pre-pack-cession.}
- **Gate 2 (a) — éligibilité (L.642-3)** : {OK / 🔴 lien dirigeant-parent-interposition → offre nulle}.
- **Gate 2 (b) — offre ferme L.642-2** : {offre ferme ✅ / 🔴 simple LOI indicative → irrecevable, à convertir}.

# 2. Construction de l'offre (mentions L.642-2)
- **Périmètre des actifs** ; **contrats repris désignés** (L.642-7) ; **prix et affectation** ; **financement** ; **emplois maintenus** ; **garanties d'exécution** ; **date de réalisation**.
- **Activité autonome (L.642-1)** : alerter si le périmètre isole des actifs clés (marque + fichier) au point de **vider l'activité** (cherry-picking) → risque de rejet.

# 3. Optimisation vs critères du tribunal (L.642-5)
- **Pérennité de l'emploi** : nombre d'emplois maintenus, plan social éventuel.
- **Paiement des créanciers** : prix offert, affectation, sûretés.
- **Garanties d'exécution** : solidité financière, garanties apportées.
- **Positionnement vs offres concurrentes** : points faibles à couvrir, surenchère possible.

# 4. Risques & suites
- **Sûretés** : report / quote-part du prix (L.642-12) ; **inexécution / résolution** du plan de cession (L.642-11).
- **Voies de recours (L.661-6)** : la sienne (en cas de rejet) et celles des **candidats évincés** (qui peuvent contester le plan retenu).
- **Irrévocabilité** de l'offre une fois déposée (L.642-2).

# Renvois & prochaines étapes
- **Amont** : `/h-da:pre-pack-cession` si la cession peut être préparée en amont.
- **Aval** : `/h-da:spa-review` / `/h-da:gap-review` / `/h-da:closing-checklist-fr` (l'acte de cession et son closing).
- **Latéral** : `/h-pi:contrats-pi` si actifs PI substantiels dans le périmètre repris.

# Une question hors de ma checklist habituelle
{Observation transversale — ex. articulation prix / désintéressement des créanciers privilégiés, sort d'un contrat de location-gérance, clean team si repreneur concurrent. Omettre si rien d'honnête.}

# Que veux-tu faire ? Choisis une option :
1. **Rédiger** — je prépare la trame de l'offre de reprise ferme (mentions L.642-2) ou la note d'analyse des offres concurrentes.
2. **Escalader** — note vers {approbateur configuré} pour décision d'engager / surenchérir.
3. **Compléter les faits** — questions (lien éventuel avec le dirigeant, date limite exacte de dépôt, contrats à reprendre, état des sûretés).
4. **Surveiller et attendre** — suivi avec point de revisite (avant la date limite de dépôt des offres).
5. **Autre** — précise.
```

---

## Étape 1 — Pré-flight et Gate 1 (porte d'entrée)

1. Invoquer `check-pii`. Lire le profil cabinet (blocs procédures collectives + M&A) et confirmer le **côté repreneur**. Raisonner **à la date du jour** (dates absolues) avec un **rétroplanning** : date limite de dépôt des offres, audience.
2. Vérifier via `bodacc_procedures` / `bodacc_by_siren` que la cible est **bien en RJ/LJ** : type de procédure, date du jugement d'ouverture, administrateur désigné.
3. **Trancher la porte d'entrée** : procédure ouverte + appel d'offres en cours → ce skill. **Aucune procédure ouverte** et cession préparable confidentiellement → ce n'est pas une reprise à la barre → **renvoi `/h-da:pre-pack-cession`** (montage amont). Ne pas avancer sans avoir tranché.

## Étape 2 — Gate 2 (recevabilité de l'offre)

Trancher les **deux** verrous. Si l'un tombe → STOP + signalement motivé.
1. **Éligibilité (L.642-3 C.com. `[Légifrance]`)** — dirigeants de droit ou de fait, parents et alliés jusqu'au 2nd degré inclus, et toute **interposition de personne** sont **interdits de se porter acquéreurs**. Une offre émanant d'une telle personne est **nulle**. Repérer toute holding interposée, prête-nom, lien familial. Dérogation du tribunal exceptionnelle. `[review]`.
2. **Offre ferme et écrite (L.642-2 C.com. `[Légifrance]`)** — l'offre doit comporter périmètre, contrats repris, prix, financement, emplois maintenus, garanties, date. Une **LOI / lettre d'intention indicative n'est pas** une offre recevable. Une fois déposée, l'offre est **irrévocable** et ne peut être modifiée que dans un sens plus favorable.

## Étape 3 — Construction de l'offre (L.642-2 / L.642-7 / L.642-1)

Bâtir l'offre sur les **mentions obligatoires (L.642-2)**. Identifier les **contrats à reprendre** : ce sont ceux **désignés par le tribunal** dans le jugement de cession (L.642-7), cédés de plein droit au cessionnaire — lister ceux qui sont nécessaires à l'activité (bail, licence, fournisseurs). Vérifier que le périmètre forme une **activité autonome (L.642-1)** : alerter sur tout cherry-picking (isoler la marque + le fichier clients) qui viderait l'activité et exposerait l'offre au rejet.

## Étape 4 — Optimisation vs critères du tribunal (L.642-5)

Le **tribunal arrête le plan de cession** en retenant l'offre qui assure le mieux, sur les trois critères de **L.642-5** : (1) la **pérennité de l'emploi**, (2) le **paiement des créanciers**, (3) les **garanties d'exécution**. Optimiser l'offre sur ces axes (pas le prix seul). En cas d'**offre(s) concurrente(s)**, identifier les points faibles relatifs et la marge de surenchère (l'offre ne peut être modifiée que dans un sens plus favorable, L.642-2). Si le repreneur est un **concurrent**, prévoir NDA / clean team / limitation des données sensibles (clients, prix) en data-room.

## Étape 5 — Risques post-arrêté (L.642-12 / L.642-11 / L.661-6)

- **Sûretés** : report du droit de suite et **quote-part du prix** affectée aux créanciers inscrits (L.642-12) — le cessionnaire qui paie le prix peut purger ; anticiper la quote-part.
- **Inexécution du plan** : si le cessionnaire n'exécute pas ses engagements, le tribunal peut prononcer la **résolution du plan de cession** (L.642-11) — mesurer l'exposition.
- **Voies de recours (L.661-6 C.com. `[Légifrance]`)** : appel des décisions arrêtant ou rejetant le plan de cession — la sienne en cas de rejet, et celles des **candidats évincés** qui peuvent contester le plan retenu (aléa et calendrier).

## Étape 6 — Post-flight `verifier-citations`

Lancer `verifier-citations` sur tous les articles cités (L.642-1, L.642-2, L.642-3, L.642-5, L.642-7, L.642-11, L.642-12, L.661-6). Tout article non confirmé reste `[à vérifier]`.

---

## Ce skill ne fait pas

- **Rédiger l'acte de cession / le SPA** → renvoi `/h-da:spa-review`, `/h-da:gap-review`, `/h-da:closing-checklist-fr`.
- **Cadrer le montage amont confidentiel** (mandat ad hoc / conciliation, double gate cessation des paiements) → renvoi `/h-da:pre-pack-cession`.
- **Traiter le côté débiteur / organes de la procédure** (orchestration, prospection) — ce skill est côté repreneur uniquement.
- **Cession d'actifs isolés en LJ (L.642-19)** hors plan de cession — hors périmètre v1.
- Tout seuil / durée procédurale post-réforme 2021 reste `[à vérifier]` si non confirmé en source primaire.

---

## Ton

Technique, prudent, **piloté par le double gate** : tant que le Gate 1 (porte d'entrée) et le Gate 2 (éligibilité L.642-3 + offre ferme L.642-2) ne sont pas tranchés, ne pas travailler l'offre. Marteler le **point pivot** (le tribunal choisit sur L.642-5 — emploi, créanciers, garanties — pas le prix seul) et l'**irrévocabilité** de l'offre déposée. Côté repreneur : mesurer l'exposition (purge réelle des sûretés, contrats repris désignés par le tribunal, recours des évincés) et optimiser sur les trois critères. Si la cession est encore préparable en amont, le dire et renvoyer `pre-pack-cession`. Brouillon soumis à validation humaine (avocat) avant tout dépôt d'offre.
````

- [ ] **Step 2 : Vérifier que le skill ne lit jamais le ground-truth** — le SKILL.md ne référence aucun fichier `ground-truth.md` (garde-fou anti-contamination Phase 3). Confirmé dans le contenu ci-dessus (aucune mention).

- [ ] **Step 3 : Commit**

```bash
git add plugins/hacienda-droit-affaires/skills/reprise-a-la-barre/SKILL.md
git commit -m "feat(da): skill reprise-a-la-barre (offre de reprise en plan de cession, double gate)"
```

---

## Task 3 : Wrapper commande + README + count (test vert)

**Files :**
- Create: `plugins/hacienda-droit-affaires/commands/h-da/reprise-a-la-barre.md`
- Modify: `plugins/hacienda-droit-affaires/README.md`
- Modify: `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts` (ligne 222 : `toBe(23)` → `toBe(24)`)

- [ ] **Step 1 : Lire le gabarit du wrapper existant** pour reproduire le format exact (description + argument-hint **identiques** au SKILL.md, exigé par le test) :

Run: `cat plugins/hacienda-droit-affaires/commands/h-da/pre-pack-cession.md`

- [ ] **Step 2 : Créer le wrapper** `plugins/hacienda-droit-affaires/commands/h-da/reprise-a-la-barre.md` en copiant la structure de `pre-pack-cession.md` et en adaptant : `description` et `argument-hint` doivent être **identiques** à ceux du frontmatter du SKILL.md (Task 2). **Ne pas** y faire figurer `/h-droit-affaires:` (interdit par le test).

- [ ] **Step 3 : README** — ajouter, au même endroit/format que les autres skills DA, une ligne avec `/h-da:reprise-a-la-barre` + description courte (ex. « Playbook côté repreneur : construire et défendre une offre de reprise gagnante sur une cible en RJ/LJ (plan de cession, L.642). »).

Run: `grep -n "/h-da:pre-pack-cession" plugins/hacienda-droit-affaires/README.md`
Expected: trouve la ligne pre-pack → insérer la ligne reprise-a-la-barre au même format à côté.

- [ ] **Step 4 : Bumper le count du test** — `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts:222` :

```
expect(skillFiles.length).toBe(24);
```
(était `toBe(23)`)

- [ ] **Step 5 : Lancer le test de structure**

Run: `npm test -- hacienda-droit-affaires-cowork-structure`
Expected: PASS (24 skills, wrapper + README cohérents, description/argument-hint identiques skill↔wrapper).

- [ ] **Step 6 : Commit**

```bash
git add plugins/hacienda-droit-affaires/commands/h-da/reprise-a-la-barre.md \
        plugins/hacienda-droit-affaires/README.md \
        packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts
git commit -m "feat(da): wrapper /h-da:reprise-a-la-barre + README + count 24 (cowork-structure)"
```

---

## Task 4 : Étendre le wrapper de scoring `da-scoring.sh`

**Files :**
- Modify: `scripts/da-scoring.sh` (6 emplacements)

> Le header du script (« POUR AJOUTER UN SKILL ») impose : 1 ligne dans le tableau `SKILLS` **et** une entrée dans chacune des 5 fonctions `code_for` / `mode_for` / `spec_for` / `desc_for` / `command_for`. Ajouter aussi la ligne dans la liste `Skills:` du bloc `usage()`.

- [ ] **Step 1 : Ajouter au tableau `SKILLS`** (après `pre-pack-cession`, ~ligne 51) :

```bash
  pre-pack-cession
  reprise-a-la-barre
)
```

- [ ] **Step 2 : Ajouter à la liste `Skills:` du `usage()`** (après `pre-pack-cession`, ~ligne 136) :

```
  pre-pack-cession
  reprise-a-la-barre
```

- [ ] **Step 3 : `code_for`** — ajouter la ligne du case (après pre-pack, ~ligne 65) :

```bash
    reprise-a-la-barre) printf "RLB1OF" ;;
```

- [ ] **Step 4 : `mode_for`** (après pre-pack, ~ligne 77) :

```bash
    reprise-a-la-barre) printf "note tactique cote repreneur (mode unique)" ;;
```

- [ ] **Step 5 : `spec_for`** (après pre-pack, ~ligne 89) :

```bash
    reprise-a-la-barre) printf "cible deja en redressement judiciaire ; appel d'offres ouvert avec date limite proche ; candidat-repreneur (concurrent/fonds) ; simple LOI indicative pas une offre ferme ; lien possible repreneur/parent du dirigeant ou societe interposee (piege eligibilite) ; offre concurrente deposee ; suretes sur les actifs ; contrats cles a reprendre (bail, licence) ; CSE ; tentation cherry-picking marque+fichier clients ; cote repreneur" ;;
```

- [ ] **Step 6 : `desc_for`** (après pre-pack, ~ligne 101) — description NEUTRE pour Codex (PAS le SKILL.md) :

```bash
    reprise-a-la-barre) printf "Playbook cote candidat-repreneur pour construire, optimiser et defendre une offre de reprise sur une entreprise deja en redressement ou liquidation judiciaire, dans le cadre d'un appel d'offres ouvert (plan de cession). Recevabilite de l'offre, construction des mentions, contrats repris, criteres de choix du tribunal, sort des suretes, voies de recours. Cote repreneur. Brouillon soumis a validation humaine. NE PAS supposer le contenu du SKILL.md." ;;
```

- [ ] **Step 7 : `command_for`** (après pre-pack, ~ligne 113) :

```bash
    reprise-a-la-barre) printf "/h-da:reprise-a-la-barre --side=repreneur" ;;
```

- [ ] **Step 8 : Vérifier que le wrapper reconnaît le skill**

Run: `bash scripts/da-scoring.sh list`
Expected: la liste affiche `reprise-a-la-barre`.

Run: `bash scripts/da-scoring.sh init reprise-a-la-barre`
Expected: crée le dossier dataset / pas d'erreur shell.

- [ ] **Step 9 : Commit**

```bash
git add scripts/da-scoring.sh
git commit -m "chore(da): ajoute reprise-a-la-barre au wrapper da-scoring.sh"
```

---

## Task 5 : Phase 2 — vérité terrain (Codex HIGH, sans SKILL.md)

**Files :**
- Create: `plugins/hacienda-droit-affaires/tests/datasets/da-reprise-a-la-barre/ground-truth.md`

- [ ] **Step 1 : Générer le prompt Codex** (Claude génère la commande, Candy l'exécute) :

```bash
bash scripts/da-scoring.sh phase2 reprise-a-la-barre
```
(le prompt est copié dans le presse-papier via `pbcopy`)

- [ ] **Step 2 : Candy lance Codex GPT-5.5 effort HIGH** dans une **session distincte sans le SKILL.md**, colle le prompt, sauvegarde la grille de critères atomiques tiered-gated **uniquement** (bloc JSON pur `{skill, criteria:[{id,niveau,axe,match_criteria}]}`) dans `ground-truth.md`. Si la sortie est aplatie : `python3 -m json.tool ground-truth.md > tmp && mv tmp ground-truth.md`.

- [ ] **Step 3 : CHECKPOINT revue des gates (Claude, AVANT Phase 3)** — vérifier que `ground-truth.md` contient bien des **gates CRITIQUE binaires** avec trigger FAIL lisible, et que ces gates couvrent : (1) porte d'entrée RJ/LJ + appel d'offres, (2) éligibilité L.642-3, (3) offre ferme L.642-2. Vérifier que `PASS` est le **complément exact** de `FAIL` (pas de zone orpheline « juste sur le fond, imprécis sur la forme »). Ne PAS modifier la grille après le run live (intégrité blind). Cf. [[feedback-gate-calibration-scoring]].

- [ ] **Step 4 : Commit**

```bash
git add plugins/hacienda-droit-affaires/tests/datasets/da-reprise-a-la-barre/ground-truth.md
git commit -m "test(da): ground-truth reprise-a-la-barre (Phase 2 Codex HIGH)"
```

---

## Task 6 : Phase 3 — exécution live (Claude frais, sans ground-truth)

**Files :**
- Create: `plugins/hacienda-droit-affaires/tests/datasets/da-reprise-a-la-barre/live-output.md`

- [ ] **Step 1 : Synchroniser le cache** (la session live teste la version courante du skill) :

```bash
bash scripts/da-scoring.sh phase3-resync
```

- [ ] **Step 2 : Générer le prompt de session fraîche** :

```bash
bash scripts/da-scoring.sh phase3-prompt reprise-a-la-barre
```

- [ ] **Step 3 : Session Claude Code FRAÎCHE** — coller le prompt, invoquer le skill `reprise-a-la-barre` sur `scenario.md`. **Interdiction explicite de lire `ground-truth.md`** (garde-fou anti-contamination). Produire la note tactique.

- [ ] **Step 4 : Sauvegarder la sortie** dans `live-output.md` (verbatim de la note produite).

- [ ] **Step 5 : Commit**

```bash
git add plugins/hacienda-droit-affaires/tests/datasets/da-reprise-a-la-barre/live-output.md
git commit -m "test(da): live-output reprise-a-la-barre (Phase 3 session fraiche)"
```

---

## Task 7 : Phase 4 — scoring + agrégation (Codex medium, sans SKILL.md)

**Files :**
- Create: `plugins/hacienda-droit-affaires/tests/datasets/da-reprise-a-la-barre/verdicts-RLB1OF-codex.json`

- [ ] **Step 1 : Générer le prompt de scoring** (Claude génère, Candy exécute) :

```bash
bash scripts/da-scoring.sh phase4 reprise-a-la-barre
```

- [ ] **Step 2 : Candy lance Codex GPT-5.5 medium** (session distincte sans SKILL.md), produit les verdicts JSON purs dans `verdicts-RLB1OF-codex.json`. Si aplati : `python3 -m json.tool`.

- [ ] **Step 3 : Agrégation** (Candy exécute) :

```bash
bash scripts/da-scoring.sh aggregate reprise-a-la-barre
```

- [ ] **Step 4 : Claude analyse** le résultat **gate-driven, pas chiffre** : ADMIS / RÉSERVES / INSUFFISANT, et liste les gates CRITIQUE éventuellement FAIL. `gate_failures: []` = feu vert. Un INSUFFISANT/RÉSERVES **sans** gate FAIL = enrichir les MAJEUR (pas un correctif de gate). Cf. [[feedback-gate-calibration-scoring]].

- [ ] **Step 5 : Commit**

```bash
git add plugins/hacienda-droit-affaires/tests/datasets/da-reprise-a-la-barre/verdicts-RLB1OF-codex.json
git commit -m "test(da): scoring reprise-a-la-barre RLB1OF (Phase 4 Codex)"
```

---

## Task 8 : Correctifs (conditionnel — si gate CRITIQUE FAIL ou MAJEUR manqués)

**Files :**
- Modify: `plugins/hacienda-droit-affaires/skills/reprise-a-la-barre/SKILL.md`

- [ ] **Step 1 : Décider** — si T7 est gate-clean (ADMIS/RÉSERVES sans gate FAIL), **sauter cette tâche**, aller à T9.
- [ ] **Step 2 : Correctif ciblé** — si un gate CRITIQUE FAIL : ajouter l'**ancrage de l'article tranchant** manquant (pattern G1/H1/J1/L1/M2/C-005), sans réécriture large, dans la seule section concernée. Si des MAJEUR sont manqués sans gate (cas PPK1CE) : enrichir le contenu doctrinal correspondant (ex. détailler L.642-12 / L.642-11 / surenchère).
- [ ] **Step 3 : Commit puis reboucler T6→T7** (nouvelle session fraîche, **nouveau `CODE`** via `CODE=RLB2XX bash scripts/da-scoring.sh phase4 reprise-a-la-barre`) jusqu'à gate-clean.

```bash
git add plugins/hacienda-droit-affaires/skills/reprise-a-la-barre/SKILL.md
git commit -m "fix(da): reprise-a-la-barre ancrage {article} ferme gate {id}"
```

> Note : si le nouveau cycle utilise un nouveau code, ajouter aussi ce code par défaut dans `code_for` du wrapper (ou laisser l'override `CODE=`), et committer le nouveau `verdicts-<CODE>-codex.json`.

---

## Task 9 : Release v0.7.0

**Files :**
- Modify (bump 0.6.0 → 0.7.0, **les 5 fichiers**) :
  - `plugins/hacienda-droit-affaires/version.json`
  - `plugins/hacienda-droit-affaires/manifest.json`
  - `plugins/hacienda-droit-affaires/mcp-server/package.json`
  - `plugins/hacienda-droit-affaires/.claude-plugin/plugin.json`
  - `plugins/hacienda-droit-affaires/.claude-plugin/marketplace.json`
- Modify: `plugins/hacienda-droit-affaires/CHANGELOG.md`

- [ ] **Step 1 : Bump version** dans les 5 fichiers, `0.6.0` → `0.7.0`. (Repère : la liste exacte des fichiers vient du commit de bump v0.6.0 `941dfbe`.)

Run (pour repérer les occurrences) : `grep -rl '"version": "0.6.0"' plugins/hacienda-droit-affaires/ | grep -vE 'node_modules|tests'`

- [ ] **Step 2 : CHANGELOG** — entrée v0.7.0 :

```markdown
## v0.7.0

- Nouveau skill `reprise-a-la-barre` (distressed-M&A #2) : playbook côté repreneur
  pour construire et défendre une offre de reprise gagnante sur une cible en RJ/LJ
  (plan de cession, L.642-1 s.). Frontière anti-chevauchement avec `pre-pack-cession`
  via Gate 1 (porte d'entrée). Validé scoring blind 4 phases — {verdict/score RLB1OF}.
- DA : 24 skills.
```

- [ ] **Step 3 : Suite de vérification complète**

```bash
npm test
npm run typecheck
npm run build
npm run branding:check
git diff --check
```
Expected: tout PASS (dont `hacienda-droit-affaires-cowork-structure` : 24 skills, wrapper + README OK, versions alignées sur 0.7.0).

- [ ] **Step 4 : Commit + PR vers main**

```bash
git add plugins/hacienda-droit-affaires/version.json \
        plugins/hacienda-droit-affaires/manifest.json \
        plugins/hacienda-droit-affaires/mcp-server/package.json \
        plugins/hacienda-droit-affaires/.claude-plugin/plugin.json \
        plugins/hacienda-droit-affaires/.claude-plugin/marketplace.json \
        plugins/hacienda-droit-affaires/CHANGELOG.md
git commit -m "release(da): bump v0.6.0 -> v0.7.0 - skill reprise-a-la-barre (distressed-M&A #2)"
gh pr create --base main --head feat/da-reprise-a-la-barre \
  --title "release(da): reprise-a-la-barre v0.7.0 (distressed-M&A #2)" \
  --body "Cycle distressed-M&A #2 : skill reprise-a-la-barre (offre de reprise cote repreneur en plan de cession) valide scoring blind 4 phases. Frontiere anti-chevauchement avec pre-pack-cession via Gate 1 porte d'entree."
```
> Rappel handoff : cibler **main directement** ; vérifier d'abord que `main` n'a pas avancé (sinon rebaser pour éviter un conflit comme PR #51).

- [ ] **Step 5 : MAJ handoff/backlog** — noter le cycle RLB1OF dans la file de scoring DA et marquer le cycle distressed-M&A #2 terminé. Mettre à jour `docs/handoff/handoff-2026-06-11-chantier-a-pre-pack.md` (ou créer un nouveau handoff daté) avec le résultat et le prochain candidat (cession d'actifs isolés L.642-19 / asset vs share en distress).

---

## Notes d'exécution

- **Ordre des phases** : T1 (scénario) précède T5 (Codex score contre le scénario). T2/T3/T4 (build + wrapper) précèdent T6 (live exécute le skill courant). T5 et T6 sont indépendants entre eux mais tous deux requis avant T7. T4 (extension wrapper) doit précéder T5/T6/T7 (les commandes `da-scoring.sh` en dépendent).
- **Séparation des acteurs** (protocole CLAUDE.md) : Phase 2 et Phase 4 = Codex sans SKILL.md ; Phase 3 = Claude frais sans ground-truth. Un même acteur sur les 4 = `[scoring auto-référent]`, non recevable pour le release.
- **Adaptation TDD** : le « test » de la qualité doctrinale est le scoring blind (T5-T7), pas un test unitaire. Les seuls tests automatisés sont structurels (`cowork-structure`, T3/T9).
- **Économie tokens** : Candy lance les commandes scoring (Codex abondant, Opus rare) ; Claude génère les prompts et fait l'analyse gate-driven.
- **Pièges environnement** : shell en `set -e` (commandes séparées / `|| true`) ; ENOSPC intermittent sur le FS temp (rediriger la sortie vers fichier puis Read).
