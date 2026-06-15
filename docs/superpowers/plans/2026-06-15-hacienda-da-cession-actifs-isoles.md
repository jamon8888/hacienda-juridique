# Cession d'actifs isolés en LJ (DA) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Livrer le skill `cession-actifs-isoles` (DA) — playbook tactique côté repreneur pour construire et défendre une offre d'acquisition d'actifs isolés (L.642-19) auprès d'un débiteur en LJ, validé gate-clean par scoring blind 4 phases, DA bumpé en v0.8.0.

**Architecture:** Skill V2 (moule canonique DA), miroir tactique de `reprise-a-la-barre`. Double gate : (1) qualification actif isolé vs going-concern (porte la frontière anti-chevauchement → renvois `reprise-a-la-barre` / `pre-pack-cession`) ; (2) recevabilité (éligibilité L.642-20→L.642-3 + ordonnance du juge-commissaire L.642-19). Point doctrinal tranchant = sort des sûretés / purge. Validation = scoring blind 4 phases (Codex Phase 2/4 sans SKILL.md, Claude frais Phase 3 sans ground-truth) piloté par `scripts/da-scoring.sh`.

**Tech Stack:** Markdown (skill + wrapper commande), bash (`scripts/da-scoring.sh`), Vitest (`hacienda-droit-affaires-cowork-structure.test.ts`), Codex GPT-5.5 (scoring blind), JSON (ground-truth / verdicts).

---

## File Structure

- `tests/datasets/da-cession-actifs-isoles/scenario.md` — créé (T1) : cas fictif neutre, input partagé Phase 1.
- `plugins/hacienda-droit-affaires/skills/cession-actifs-isoles/SKILL.md` — créé (T2) : le skill, contenu doctrinal complet.
- `plugins/hacienda-droit-affaires/commands/h-da/cession-actifs-isoles.md` — créé (T3) : wrapper commande (description + argument-hint identiques au SKILL.md).
- `plugins/hacienda-droit-affaires/README.md` — modifié (T3) : ligne `/h-da:cession-actifs-isoles`.
- `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts:222` — modifié (T3) : count `toBe(24)` → `toBe(25)`.
- `scripts/da-scoring.sh` — modifié (T4) : ajout du skill aux 5 fonctions + tableau + usage.
- `tests/datasets/da-cession-actifs-isoles/ground-truth.md` — créé (T5) : grille Codex HIGH (Phase 2).
- `tests/datasets/da-cession-actifs-isoles/live-output.md` — créé (T6) : sortie live (Phase 3).
- `tests/datasets/da-cession-actifs-isoles/verdicts-<CODE>-codex.json` — créé (T7) : verdicts Codex (Phase 4).
- 5 fichiers de version + CHANGELOG — modifiés (T9) : bump 0.7.0 → 0.8.0.

---

## Task 1 : Scénario fictif (Phase 1 — input partagé)

**Files :**
- Create: `tests/datasets/da-cession-actifs-isoles/scenario.md`

- [ ] **Step 1 : Rédiger le scénario** — un cas fictif réaliste, **neutre** (ne révèle pas la « bonne réponse », ne cite aucun article, ne nomme aucun gate). Données brutes uniquement. Inclure les éléments piégeux suivants, noyés dans le récit :
  - débiteur (PME fictive) en **liquidation judiciaire** ouverte (jugement + liquidateur nommé, dates) ;
  - le candidat veut racheter des **actifs isolés** : un **fonds de commerce** secondaire + un **portefeuille de marques** + du **stock** — PAS l'entreprise entière (piège qualification : actif isolé vs going concern) ;
  - le candidat a déjà adressé une « offre » **au liquidateur** mais **aucune ordonnance du juge-commissaire** n'est intervenue (piège Gate 2 (b)) ;
  - le candidat est dirigé par le **beau-frère de l'ancien gérant** via une holding (piège Gate 2 (a) éligibilité L.642-20 / interposition) ;
  - une **marque** du portefeuille est **nantie** au profit d'une banque, et un **stock** est détenu par un dépositaire qui invoque un **droit de rétention** (piège sort des sûretés) ;
  - un **contrat de licence** clé est rattaché au fonds, avec clause d'agrément (piège L.642-7 a contrario — pas de transfert automatique) ;
  - **3 salariés** sont affectés à l'exploitation du fonds visé (piège L.1224-1) ;
  - le candidat avait acheté un véhicule au débiteur **2 mois avant** le jugement d'ouverture (piège période suspecte L.632-1).

- [ ] **Step 2 : Vérifier la neutralité** — relire : le scénario ne doit **pas** citer les articles-réponses (L.642-x, L.1224-1, L.632-1, L.661-x) ni nommer les gates. Données factuelles uniquement.

- [ ] **Step 3 : Commit**

```bash
git add tests/datasets/da-cession-actifs-isoles/scenario.md
git commit -m "test(da): scenario fictif cession-actifs-isoles (Phase 1 input)"
```

---

## Task 2 : Le skill `SKILL.md` (build)

**Files :**
- Create: `plugins/hacienda-droit-affaires/skills/cession-actifs-isoles/SKILL.md`

- [ ] **Step 1 : Créer le fichier avec ce contenu exact** (contenu doctrinal complet, pas de placeholder) :

````markdown
---
name: cession-actifs-isoles
description: >
  Playbook tactique côté candidat-repreneur pour construire et défendre une
  offre d'acquisition d'actifs isolés (mobiliers, incorporels, fonds de
  commerce, IP, stocks, créances) auprès d'un débiteur en liquidation
  judiciaire, hors plan de cession (cession de gré à gré ou aux enchères,
  L.642-19). Double gate : (1) qualification — s'agit-il d'un actif isolé et
  non d'une entreprise / unité de production en going concern ? si going
  concern, renvoi `reprise-a-la-barre` ; si la cession peut être préparée
  confidentiellement en amont, renvoi `pre-pack-cession` ; (2) recevabilité —
  éligibilité de l'acquéreur (L.642-20 renvoyant à L.642-3 : interdictions /
  interposition) et autorisation du juge-commissaire (L.642-19 : une offre
  adressée au liquidateur ne vaut pas vente tant que le JC n'a pas ordonné).
  Opère le sort des sûretés (report du droit de préférence sur le prix, droit
  de rétention non purgé, purge au paiement du prix), l'absence de transfert
  automatique des contrats (L.642-7 a contrario), le transfert automatique des
  salariés si entité économique autonome (L.1224-1) et les recours contre
  l'ordonnance (L.661-x). Côté repreneur uniquement. Immeubles (L.642-18) hors
  périmètre. Ne rédige pas l'acte de cession → `spa-review` / `gap-review` /
  `closing-checklist-fr`. Brouillon, validation humaine (avocat) OBLIGATOIRE.
version: "2.0.0"
argument-hint: "[note tactique (mode unique), actif isolé ou entreprise en going concern ?, débiteur en LJ ?, ordonnance du juge-commissaire ?, côté repreneur]"
authors: ["Hacienda"]
tags: [cession-actifs-isoles, actifs-isoles, l642-19, distressed-m&a, restructuring, liquidation-judiciaire, gre-a-gre, suretes, juge-commissaire]
---

# Skill — Cession d'actifs isolés en LJ (acquisition hors plan de cession)

> **BROUILLON, VALIDATION HUMAINE (AVOCAT) OBLIGATOIRE.**
>
> **🔴 Double gate.**
> - **Gate 1 — qualification** : ce skill ne joue que pour l'acquisition d'un
>   **actif isolé** (bien mobilier, incorporel, fonds de commerce, marque,
>   stock, créance) cédé par le liquidateur **hors plan de cession**. Si ce qui
>   est repris est en réalité une **entreprise / unité de production en going
>   concern** → ce n'est pas une cession d'actif isolé → **renvoi
>   `reprise-a-la-barre`** (plan de cession, L.642-1 s.). Si aucune procédure
>   n'est ouverte et que la cession peut être **préparée confidentiellement**
>   en amont (mandat ad hoc / conciliation) → **renvoi `pre-pack-cession`**.
>
> **Périmètre — biens mobiliers et incorporels (L.642-19).** Ce skill couvre la
> **cession de gré à gré ou aux enchères des biens autres que les immeubles**.
> La cession des **immeubles relève de L.642-18** (adjudication, surenchère,
> règles voisines de la saisie immobilière) → **hors périmètre v1**, signaler
> et renvoyer.
> - **Gate 2 — recevabilité** : (a) **éligibilité de l'acquéreur (L.642-20
>   renvoyant à L.642-3)** — dirigeants de droit ou de fait, parents et alliés
>   jusqu'au 2nd degré inclus, **contrôleurs**, et toute **interposition de
>   personne** sont **interdits d'acquérir** → acquisition **nulle** ; (b)
>   **autorisation du juge-commissaire (L.642-19)** — la cession de gré à gré
>   n'existe que par **ordonnance du juge-commissaire** ; une offre adressée au
>   liquidateur **ne vaut pas vente** tant que le JC n'a pas ordonné ou
>   autorisé la cession.
>
> **Point pivot.** Ici **ce n'est pas le tribunal qui arrête un plan** : c'est
> le **juge-commissaire** qui, au vu du **rapport du liquidateur**, **ordonne**
> la vente aux enchères ou **autorise** la vente de gré à gré au prix et aux
> conditions qu'il fixe. Tant que l'ordonnance n'est pas rendue (et le délai de
> recours purgé), rien n'est acquis.

## Examples

1. **Offre au liquidateur ≠ vente.** Le candidat a adressé une offre écrite au
   liquidateur et croit l'actif acquis. → Gate 2 (b) : **aucune ordonnance du
   juge-commissaire (L.642-19)** → rien n'est vendu. L'offre doit être reprise
   par le liquidateur dans son rapport et **autorisée par le JC** ; calibrer
   prix/conditions pour cette ordonnance.

2. **Acquéreur inéligible.** Le candidat est contrôlé par le beau-frère de
   l'ancien gérant via une holding. → Gate 2 (a) : **interdiction d'acquérir
   (L.642-20 renvoyant à L.642-3)** → l'acquisition serait **nulle**. STOP :
   signaler l'inéligibilité avant tout travail sur l'offre.

3. **Going concern déguisé.** Le candidat veut « racheter les actifs » mais le
   périmètre couvre en réalité toute l'activité avec ses salariés et ses
   contrats. → Gate 1 : ce n'est pas un actif isolé mais une **reprise
   d'entreprise** → **renvoi `reprise-a-la-barre`** (plan de cession). Acheter
   en gré à gré ce qui est une activité autonome expose à la requalification.

## Chargement du profil

> Lire `~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/CLAUDE.md`, bloc procédures collectives + bloc M&A :
> - **Position dominante** — ce skill suppose le **côté repreneur** (le candidat acquéreur)
> - **Tribunaux habituels** — tribunal compétent (commerce / judiciaire selon l'activité) et juge-commissaire de la procédure
> - **Politique PII** — `passive` / `active` (défaut) / `strict` + seuil B

Si le bloc est `[A CONFIGURER]` : stopper et demander `/h-da:entretien-demarrage`.

---

## Intake

1. **Côté** — **repreneur** (le candidat acquéreur). Pas de mode neutre ; si l'utilisateur est côté débiteur/liquidateur, ce skill ne s'applique pas.
2. **Nature de l'objet** — **actif isolé** (fonds, marque, stock, matériel, créance) ou **entreprise / unité de production en going concern** ? (**déterminant** — voir Gate 1). Si going concern → renvoi `reprise-a-la-barre`.
3. **État de la procédure** — le débiteur est-il **en LJ** ? liquidateur désigné ? juge-commissaire saisi ? (lookup BODACC). Si aucune procédure ouverte et cession préparable en amont → renvoi `pre-pack-cession`.
4. **Voie & autorisation** — la cession est-elle envisagée **de gré à gré** ou **aux enchères** ? une **ordonnance du juge-commissaire** est-elle intervenue, ou seulement une offre au liquidateur ? (**déterminant** — voir Gate 2 (b)).
5. **Éligibilité** — le candidat a-t-il un lien avec le dirigeant / un parent ou allié jusqu'au 2nd degré / un contrôleur / une société interposée ? (**déterminant** — voir Gate 2 (a), L.642-20→L.642-3).
6. **Sûretés & rétention** — les actifs visés sont-ils **nantis / gagés** ? un tiers invoque-t-il un **droit de rétention** (dépositaire, gagiste avec dépossession) ?
7. **Contrats & salariés** — des **contrats clés** sont-ils rattachés à l'actif (bail, licence, fournisseur) ? des **salariés** sont-ils affectés à l'actif (risque L.1224-1) ?
8. **Antériorité** — le candidat a-t-il acquis des biens du débiteur **avant le jugement d'ouverture** (risque période suspecte L.632-1) ?

---

## Gate non-juriste

- [ ] Pré-flight `check-pii` exécuté et décision utilisateur respectée
- [ ] **Gate 1 — qualification tranchée** : actif **isolé** (mobilier/incorporel) → ce skill ; entreprise / unité de production en **going concern** → STOP + renvoi `reprise-a-la-barre` ; cession préparable confidentiellement en amont → STOP + renvoi `pre-pack-cession`
- [ ] **Périmètre confirmé** : biens mobiliers / incorporels (L.642-19) ; un **immeuble** relève de **L.642-18** → hors périmètre v1, signaler
- [ ] **Gate 2 (a) — éligibilité (L.642-20 → L.642-3)** : pas de dirigeant / parent ou allié jusqu'au 2nd degré / contrôleur / interposition ; si lien suspect → STOP, acquisition potentiellement nulle, `[review]`
- [ ] **Gate 2 (b) — autorisation du juge-commissaire (L.642-19)** : existe-t-il une **ordonnance** du JC (vente aux enchères ou autorisation de gré à gré) ? une simple offre au liquidateur ne vaut pas vente
- [ ] **Point pivot rappelé** : c'est le **juge-commissaire** qui ordonne/autorise (pas le tribunal arrêtant un plan)
- [ ] **Sort des sûretés** vérifié : report du droit de préférence sur le prix, **droit de rétention non purgé**, purge des inscriptions au paiement du prix
- [ ] **Pièges actif isolé** signalés : **pas de transfert automatique des contrats** (L.642-7 ne joue pas) ; **transfert automatique des salariés** possible (L.1224-1) si entité économique autonome
- [ ] Côté repreneur déclaré ; focale = recevabilité + exposition de l'acquisition
- [ ] Durées / délais procéduraux (recours contre l'ordonnance) tagués `[à vérifier]`
- [ ] Citations vérifiées via `verifier-citations` ou taguées `[à vérifier]`

---

## Outils MCP à privilégier

- Identification entreprise + procédures publiées : `company_full_profile`, `bodacc_by_siren`, `bodacc_procedures` (confirmer la LJ ouverte sur le débiteur, le liquidateur, les dates).
- Socle sources officielles : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `eurlex_recherche`, `eurlex_consulter`.

---

## Emplacement des sorties

```
outputs/cession-actifs-isoles-<entreprise-slug>-YYYY-MM-DD.md
```

---

## Sortie

### Format livrable

```
[En-tête de confidentialité selon le rôle]

> ⚠️ Note du relecteur
> - **Sources :** Légifrance ✓ / BODACC ✓ / Judilibre ✓ (cocher ✗ si non connectée)
> - **Lecture :** situation décrite + {N} pièces
> - **Signalé pour ton jugement :** {N} éléments [review] (éligibilité de l'acquéreur, qualification actif isolé, sort des sûretés, contrats, salariés) | aucun
> - **Fraîcheur :** réforme du 15 septembre 2021 (ord. transposition directive restructuration) — vérifier délais de recours en vigueur | recherche impossible
> - **Avant de t'appuyer dessus :** {action — ex. confirmer l'absence de lien d'interposition / l'existence d'une ordonnance du JC} | « prêt pour relecture »

# Cession d'actifs isolés — note tactique [CÔTÉ repreneur]

# 1. Diagnostic & recevabilité
- **Gate 1 — qualification** : objet visé = {actif isolé : fonds / marque / stock / créance} ✅, débiteur en **LJ** {date jugement}, liquidateur {nom}. {Si going concern → renvoi reprise-a-la-barre ; si amont confidentiel → renvoi pre-pack-cession.}
- **Périmètre** : biens mobiliers / incorporels (**L.642-19**). {Si un immeuble est visé → relève de **L.642-18**, hors périmètre, signaler.}
- **Gate 2 (a) — éligibilité (L.642-20 → L.642-3)** : {OK / 🔴 lien dirigeant-parent-contrôleur-interposition → acquisition nulle}.
- **Gate 2 (b) — ordonnance du juge-commissaire (L.642-19)** : {ordonnance rendue ✅ / 🔴 simple offre au liquidateur, pas d'ordonnance → rien n'est vendu}.

# 2. Construction & dépôt de l'offre
- **Voie de cession** : gré à gré (autorisation du JC) vs enchères publiques (ordonnance du JC) — **L.642-19**. L'offre est portée par le **liquidateur** dans son **rapport au juge-commissaire** ; calibrer **prix, périmètre précis des actifs, conditions, financement, délai de réalisation** pour cette ordonnance.
- **Contrats — pas de transfert automatique (L.642-7 a contrario)** : hors plan de cession, **aucune cession forcée des contrats**. Identifier les contrats clés rattachés à l'actif (**bail, licence, fournisseurs**) et prévoir leur **renégociation / accord du cocontractant** (clause d'agrément, intuitu personae, changement de contrôle). Ne pas présumer la reprise du contrat.
- **Salariés — L.1224-1** : si l'actif cédé constitue une **entité économique autonome conservant son identité**, les **contrats de travail attachés sont transférés de plein droit** au repreneur (ordre public social), **même en liquidation et même pour une cession d'actif isolé**. Chiffrer ce passif social potentiel ; ne pas le découvrir après coup. `[review]`

# 3. Sort des sûretés & purge (point tranchant)
- **Report du droit de préférence sur le prix** : les créanciers titulaires de sûretés sur l'actif (nantissement de marque, gage) **ne perdent pas leur droit** ; il se **reporte sur le prix de cession**, sur lequel ils sont payés **selon leur rang**.
- **Purge des inscriptions au paiement du prix** : le **paiement complet du prix** emporte **purge des inscriptions** grevant les biens cédés `[connaissance modèle — à vérifier]` — l'acquéreur prend **quitte et libre** une fois le prix payé/consigné et distribué.
- **Droit de rétention NON purgé** : le créancier qui détient l'actif (dépositaire, gagiste avec dépossession sur le stock) **conserve son droit de rétention** : il peut **refuser de remettre l'actif** tant qu'il n'est pas payé. → il faut le **désintéresser pour récupérer le bien**. `[review]`
- → **Ventiler le prix par actif grevé** et **chiffrer la charge** (rétention) dès l'offre.

# 4. Risques & suites
- **Période suspecte (L.632-1)** : un bien acquis du débiteur **avant le jugement d'ouverture** (et non du liquidateur) peut tomber sous les **nullités de la période suspecte** → risque de restitution. Acheter **du liquidateur, après jugement** est la voie sûre. `[review]`
- **Recours contre l'ordonnance (L.642-19 / L.661-x)** : l'ordonnance du juge-commissaire est **susceptible de recours** (devant le tribunal, puis appel) dans des **délais courts** `[à vérifier]` — purger ce délai avant de se croire propriétaire ; un tiers/créancier peut contester.
- **Renvois** : `reprise-a-la-barre` (si going concern) ; `pre-pack-cession` (si amont) ; `spa-review` / `gap-review` / `closing-checklist-fr` (acte de cession).

# Renvois & prochaines étapes
- **Latéral** : `/h-da:reprise-a-la-barre` si l'objet est une entreprise / unité de production en going concern.
- **Amont** : `/h-da:pre-pack-cession` si la cession peut être préparée confidentiellement en amont.
- **Aval** : `/h-da:spa-review` / `/h-da:gap-review` / `/h-da:closing-checklist-fr` (l'acte de cession et son closing).
- **Latéral** : `/h-pi:contrats-pi` si actifs PI substantiels (marques, brevets) dans le périmètre.

# Une question hors de ma checklist habituelle
{Observation transversale — ex. articulation cession d'actif isolé / plan de cession concurrent sur le même périmètre, sort d'un contrat de location-gérance, clean team si repreneur concurrent. Omettre si rien d'honnête.}

# Que veux-tu faire ? Choisis une option :
1. **Rédiger** — je prépare la trame de l'offre d'acquisition (périmètre, prix, conditions) à porter par le liquidateur, ou la note d'analyse des sûretés/contrats.
2. **Escalader** — note vers {approbateur configuré} pour décision d'engager / d'enchérir.
3. **Compléter les faits** — questions (lien éventuel avec le dirigeant, existence d'une ordonnance du JC, état des sûretés et du droit de rétention, salariés rattachés).
4. **Surveiller et attendre** — suivi avec point de revisite (avant l'ordonnance du JC / la fin du délai de recours).
5. **Autre** — précise.
```

---

## Étape 1 — Pré-flight et Gate 1 (qualification)

1. Invoquer `check-pii`. Lire le profil cabinet (blocs procédures collectives + M&A) et confirmer le **côté repreneur**. Raisonner **à la date du jour** (dates absolues).
2. Vérifier via `bodacc_procedures` / `bodacc_by_siren` que le débiteur est **bien en LJ** : date du jugement, liquidateur désigné.
3. **Trancher la qualification** : l'objet est-il un **actif isolé** (bien mobilier / incorporel / fonds / marque / stock / créance) ou une **entreprise / unité de production en going concern** ? Si going concern → ce n'est pas une cession d'actif isolé → **renvoi `/h-da:reprise-a-la-barre`** (plan de cession). Si aucune procédure ouverte et cession préparable confidentiellement → **renvoi `/h-da:pre-pack-cession`**. Ne pas avancer sans avoir tranché.
4. **Vérifier le périmètre (L.642-19 vs L.642-18 `[Légifrance]`)** : la cession des **biens mobiliers et incorporels** relève de **L.642-19** (de gré à gré ou enchères, sur autorisation du juge-commissaire) ; la cession d'un **immeuble** relève de **L.642-18** (adjudication, surenchère) → **hors périmètre v1**, signaler et renvoyer.

## Étape 2 — Gate 2 (recevabilité)

Trancher les **deux** verrous. Si l'un tombe → STOP + signalement motivé.
1. **Éligibilité (L.642-20 renvoyant à L.642-3 C.com. `[Légifrance]`)** — L.642-20 rend applicable aux cessions d'actifs isolés l'interdiction de L.642-3 : dirigeants de droit ou de fait, parents et alliés jusqu'au 2nd degré inclus, **contrôleurs**, et toute **interposition de personne** sont **interdits de se porter acquéreurs**. Une acquisition par une telle personne est **nulle**. Repérer toute holding interposée, prête-nom, lien familial. `[review]`
2. **Autorisation du juge-commissaire (L.642-19 C.com. `[Légifrance]`)** — le juge-commissaire **ordonne la vente aux enchères** ou **autorise la vente de gré à gré** des biens autres que les immeubles, au vu du **rapport du liquidateur**, au **prix et conditions qu'il fixe**. Une **offre adressée au liquidateur ne vaut pas vente** tant que l'ordonnance n'est pas rendue. Ne pas confondre offre et acquisition.

## Étape 3 — Construction & dépôt de l'offre (L.642-19 / L.642-7 a contrario / L.1224-1)

Calibrer l'offre pour l'**ordonnance du juge-commissaire** : périmètre **précis** des actifs visés (désignation des biens), **prix**, **financement**, **conditions**, **délai de réalisation**. L'offre est portée par le **liquidateur** dans son rapport au JC.
- **Contrats — pas de transfert automatique (L.642-7 a contrario `[Légifrance]`)** : la cession forcée des contrats désignés (L.642-7) **ne joue que dans le plan de cession**, **pas** dans la cession d'actif isolé. Identifier les contrats clés rattachés à l'actif (**bail, licence, fournisseurs**) et prévoir leur **renégociation** / l'**accord du cocontractant** (clause d'agrément, intuitu personae, changement de contrôle). Ne pas présumer la reprise.
- **Salariés — L.1224-1 `[Légifrance]`** : si l'actif cédé constitue une **entité économique autonome conservant son identité**, les **contrats de travail attachés sont transférés de plein droit** (ordre public social), **même en liquidation**. Chiffrer ce passif social ; le signaler `[review]`.

## Étape 4 — Sort des sûretés & purge (point tranchant)

Ne jamais dire que les sûretés disparaissent ni que l'acquéreur prend automatiquement libre. Mécanique :
- **Report du droit de préférence sur le prix** : la sûreté grevant l'actif (nantissement de marque, gage) **se reporte sur le prix de cession** ; le créancier inscrit est payé **selon son rang** sur ce prix.
- **Purge des inscriptions au paiement du prix** : le **paiement complet du prix** emporte **purge des inscriptions** grevant le bien cédé `[connaissance modèle — à vérifier]` ; l'acquéreur prend **quitte et libre** une fois le prix payé/consigné.
- **Droit de rétention NON affecté** : le créancier qui **détient** l'actif (dépositaire, gagiste avec dépossession) **conserve son droit de rétention** et peut **refuser la remise** tant qu'il n'est pas payé → il faut le **désintéresser pour récupérer le bien**.
- → **Ventiler le prix par actif grevé** et **chiffrer la charge** (rétention) dès l'offre. `[review]`

## Étape 5 — Risques & recours (L.632-1 / L.642-19 / L.661-x)

- **Période suspecte (L.632-1 C.com. `[Légifrance]`)** : un bien acquis **du débiteur avant le jugement d'ouverture** (et non du liquidateur) peut tomber sous les **nullités de la période suspecte** (de droit ou facultatives) → risque de restitution. La voie sûre est l'acquisition **du liquidateur, après jugement**, sur ordonnance du JC.
- **Recours contre l'ordonnance (L.642-19 / L.661-x C.com. `[Légifrance]`)** : l'ordonnance du juge-commissaire autorisant/ordonnant la cession est **susceptible de recours** (devant le tribunal, puis voie d'appel) dans des **délais courts** `[à vérifier]`. Purger ce délai avant de se croire propriétaire ; anticiper la contestation d'un tiers/créancier.

## Étape 6 — Post-flight `verifier-citations`

Lancer `verifier-citations` sur tous les articles cités (L.642-7, L.642-18, L.642-19, L.642-20, L.642-3, L.632-1, L.661-6, L.1224-1). Tout article non confirmé reste `[à vérifier]`.

---

## Ce skill ne fait pas

- **Rédiger l'acte de cession / le SPA** → renvoi `/h-da:spa-review`, `/h-da:gap-review`, `/h-da:closing-checklist-fr`.
- **Traiter la reprise d'une entreprise / unité de production en going concern** (plan de cession) → renvoi `/h-da:reprise-a-la-barre`.
- **Cadrer le montage amont confidentiel** (mandat ad hoc / conciliation) → renvoi `/h-da:pre-pack-cession`.
- **Traiter la cession des immeubles (L.642-18)** — adjudication, surenchère — hors périmètre v1, signaler et renvoyer.
- **Traiter le côté débiteur / liquidateur** — ce skill est côté repreneur uniquement.
- Tout seuil / délai procédural (recours contre l'ordonnance) reste `[à vérifier]` si non confirmé en source primaire.

---

## Ton

Technique, prudent, **piloté par le double gate** : tant que le Gate 1 (qualification actif isolé vs going concern) et le Gate 2 (éligibilité L.642-20→L.642-3 + ordonnance du juge-commissaire L.642-19) ne sont pas tranchés, ne pas travailler l'offre. Marteler le **point pivot** (c'est le **juge-commissaire** qui ordonne/autorise, pas le tribunal qui arrête un plan) et le fait qu'une **offre au liquidateur ne vaut pas vente**. Côté repreneur : mesurer l'exposition (sort réel des sûretés et **droit de rétention**, **absence** de transfert automatique des contrats, **transfert automatique** des salariés si entité autonome, période suspecte, recours). Si l'objet est un going concern, renvoyer `reprise-a-la-barre` ; si la cession est préparable en amont, renvoyer `pre-pack-cession`. Brouillon soumis à validation humaine (avocat) avant tout engagement.
````

- [ ] **Step 2 : Vérifier que le skill ne lit jamais le ground-truth** — le SKILL.md ne référence aucun fichier `ground-truth.md` (garde-fou anti-contamination Phase 3). Confirmé dans le contenu ci-dessus (aucune mention).

- [ ] **Step 3 : Commit**

```bash
git add plugins/hacienda-droit-affaires/skills/cession-actifs-isoles/SKILL.md
git commit -m "feat(da): skill cession-actifs-isoles (L.642-19, cote repreneur)"
```

---

## Task 3 : Wrapper commande + README + count (test vert)

**Files :**
- Create: `plugins/hacienda-droit-affaires/commands/h-da/cession-actifs-isoles.md`
- Modify: `plugins/hacienda-droit-affaires/README.md`
- Modify: `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts:222`

- [ ] **Step 1 : Lire le gabarit du wrapper existant** pour reproduire le format exact (description + argument-hint **identiques** au SKILL.md, exigé par le test) :

Run : `cat plugins/hacienda-droit-affaires/commands/h-da/reprise-a-la-barre.md`

- [ ] **Step 2 : Créer le wrapper** `plugins/hacienda-droit-affaires/commands/h-da/cession-actifs-isoles.md` en copiant la structure de `reprise-a-la-barre.md` et en adaptant : `description` et `argument-hint` doivent être **identiques** à ceux du frontmatter du SKILL.md (Task 2). **Ne pas** y faire figurer `/hacienda-droit-affaires:` ni `/h-droit-affaires:` (interdit par le test).

- [ ] **Step 3 : README** — ajouter, au même endroit/format que les autres skills DA, une ligne avec `/h-da:cession-actifs-isoles` + description courte (ex. « Playbook côté repreneur : construire et défendre une offre d'acquisition d'actifs isolés (fonds, marques, stocks) en LJ, hors plan de cession (L.642-19). »).

- [ ] **Step 4 : Bumper le count du test** — `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts:222` :

```ts
    expect(skillFiles.length).toBe(25);
```

- [ ] **Step 5 : Lancer le test de structure**

Run : `npx vitest run packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts`
Expected : PASS (25 skills, wrapper + README cohérents, description/argument-hint identiques).

- [ ] **Step 6 : Commit**

```bash
git add plugins/hacienda-droit-affaires/commands/h-da/cession-actifs-isoles.md \
        plugins/hacienda-droit-affaires/README.md \
        packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts
git commit -m "feat(da): wrapper + README + count cession-actifs-isoles (24->25)"
```

---

## Task 4 : Étendre le wrapper de scoring `da-scoring.sh`

**Files :**
- Modify: `scripts/da-scoring.sh`

> Repère : suivre le bloc « POUR AJOUTER UN SKILL » du script et calquer les lignes `reprise-a-la-barre`. Les n° de ligne ci-dessous sont indicatifs (vérifier le contexte).

- [ ] **Step 1 : Ajouter au tableau `SKILLS`** (après `reprise-a-la-barre`) :

```bash
  cession-actifs-isoles
```

- [ ] **Step 2 : Ajouter à la liste `Skills:` du `usage()`** (après `reprise-a-la-barre`) la même entrée.

- [ ] **Step 3 : `code_for`** — ajouter la ligne du case (code du cycle courant, ex. `CAI1QU` pour le cycle 1 « qualification ») :

```bash
    cession-actifs-isoles) echo "CAI1QU" ;;
```

- [ ] **Step 4 : `mode_for`** (après reprise) :

```bash
    cession-actifs-isoles) echo "note tactique (mode unique)" ;;
```

- [ ] **Step 5 : `spec_for`** (après reprise) :

```bash
    cession-actifs-isoles) echo "docs/superpowers/specs/2026-06-15-hacienda-da-cession-actifs-isoles-design.md" ;;
```

- [ ] **Step 6 : `desc_for`** (après reprise) — description NEUTRE pour Codex (PAS le SKILL.md) :

```bash
    cession-actifs-isoles) echo "Note tactique cote repreneur pour l'acquisition d'actifs isoles (fonds, marques, stocks, creances) aupres d'un debiteur en liquidation judiciaire, hors plan de cession." ;;
```

- [ ] **Step 7 : `command_for`** (après reprise) :

```bash
    cession-actifs-isoles) echo "/h-da:cession-actifs-isoles" ;;
```

- [ ] **Step 8 : Vérifier que le wrapper reconnaît le skill**

Run : `bash scripts/da-scoring.sh 2>&1 | grep -A30 'Skills:'`
Expected : `cession-actifs-isoles` apparaît dans la liste.

- [ ] **Step 9 : Commit**

```bash
git add scripts/da-scoring.sh
git commit -m "chore(da): da-scoring.sh support cession-actifs-isoles (code defaut CAI1QU)"
```

---

## Task 5 : Phase 2 — vérité terrain (Codex HIGH, sans SKILL.md)

**Files :**
- Create: `tests/datasets/da-cession-actifs-isoles/ground-truth.md`

- [ ] **Step 1 : Générer le prompt Codex** (Claude génère la commande, Candy l'exécute) :

Run : `bash scripts/da-scoring.sh phase2 cession-actifs-isoles`
(le prompt est copié dans le presse-papier via pbcopy)

- [ ] **Step 2 : Candy lance Codex GPT-5.5 effort HIGH** dans une **session distincte sans le SKILL.md**, colle le prompt, sauvegarde la grille de critères atomiques tiered-gated **uniquement** (bloc JSON pur `{skill, criteria:[{id,niveau,axe,match_criteria}]}`) dans `ground-truth.md`. Si la sortie est aplatie : `python3 -m json.tool ground-truth.md > tmp && mv tmp ground-truth.md`.

- [ ] **Step 3 : CHECKPOINT revue des gates (Claude, AVANT Phase 3)** — vérifier que `ground-truth.md` contient bien des **gates CRITIQUE binaires** avec trigger FAIL lisible, et que ces gates couvrent : (1) **qualification actif isolé vs going concern**, (2) **éligibilité L.642-20→L.642-3**, (3) **ordonnance du juge-commissaire L.642-19**, et que le **point tranchant sûretés** (report sur prix + droit de rétention non purgé) est bien tiered CRITIQUE. Vérifier que `PASS` est le **complément exact** de `FAIL` (pas de zone orpheline « juste sur le fond, imprécis sur la forme » — leçon `reprise-a-la-barre` : ce checkpoint avait été sauté → faux REJETÉ). Ne PAS modifier la grille après le run live (intégrité blind). Cf. [[feedback-gate-calibration-scoring]].

- [ ] **Step 4 : Commit**

```bash
git add tests/datasets/da-cession-actifs-isoles/ground-truth.md
git commit -m "test(da): ground-truth cession-actifs-isoles (Phase 2, Codex HIGH)"
```

---

## Task 6 : Phase 3 — exécution live (Claude frais, sans ground-truth)

**Files :**
- Create: `tests/datasets/da-cession-actifs-isoles/live-output.md`

- [ ] **Step 1 : Synchroniser le cache** (la session live teste la version courante du skill) :

Run : `bash scripts/da-scoring.sh phase3-resync cession-actifs-isoles`

- [ ] **Step 2 : Générer le prompt de session fraîche** :

Run : `bash scripts/da-scoring.sh phase3-prompt cession-actifs-isoles`

- [ ] **Step 3 : Session Claude Code FRAÎCHE** — coller le prompt, invoquer le skill `cession-actifs-isoles` sur `scenario.md`. **Interdiction explicite de lire `ground-truth.md`** (garde-fou anti-contamination). Produire la note tactique.

- [ ] **Step 4 : Sauvegarder la sortie** dans `tests/datasets/da-cession-actifs-isoles/live-output.md` (verbatim de la note produite). Ne pas laisser de `live-output.md` à la racine du repo (piège récurrent).

- [ ] **Step 5 : Commit**

```bash
git add tests/datasets/da-cession-actifs-isoles/live-output.md
git commit -m "test(da): live-output cession-actifs-isoles (Phase 3)"
```

---

## Task 7 : Phase 4 — scoring + agrégation (Codex medium, sans SKILL.md)

**Files :**
- Create: `tests/datasets/da-cession-actifs-isoles/verdicts-<CODE>-codex.json`

- [ ] **Step 1 : Générer le prompt de scoring** (Claude génère, Candy exécute) :

Run : `bash scripts/da-scoring.sh phase4 cession-actifs-isoles`

- [ ] **Step 2 : Candy lance Codex GPT-5.5 medium** (session distincte sans SKILL.md), produit les verdicts JSON purs dans `verdicts-CAI1QU-codex.json`. Si aplati : `python3 -m json.tool`.

- [ ] **Step 3 : Agrégation** (Candy exécute) :

Run : `bash scripts/da-scoring.sh aggregate cession-actifs-isoles`

- [ ] **Step 4 : Claude analyse** le résultat **gate-driven, pas chiffre** : ADMIS / RÉSERVES / INSUFFISANT, et liste les gates CRITIQUE éventuellement FAIL. `gate_failures: []` = feu vert. Un INSUFFISANT/RÉSERVES **sans** gate FAIL = enrichir les MAJEUR (pas un correctif de gate). Coller à Claude le JSON `verdicts-<CODE>.json` plutôt que le bloc `aggregate`. Cf. [[feedback-gate-calibration-scoring]].

- [ ] **Step 5 : Commit**

```bash
git add tests/datasets/da-cession-actifs-isoles/verdicts-*-codex.json
git commit -m "test(da): cycle CAI1QU cession-actifs-isoles - {verdict/score}"
```

---

## Task 8 : Correctifs (conditionnel — si gate CRITIQUE FAIL ou MAJEUR manqués)

**Files :**
- Modify: `plugins/hacienda-droit-affaires/skills/cession-actifs-isoles/SKILL.md`

- [ ] **Step 1 : Décider** — si T7 est gate-clean (ADMIS/RÉSERVES sans gate FAIL), **sauter cette tâche**, aller à T9.
- [ ] **Step 2 : Correctif ciblé** — si un gate CRITIQUE FAIL : ajouter l'**ancrage de l'article tranchant** manquant, sans réécriture large, dans la seule section concernée (pattern `reprise-a-la-barre` : C-001 → L.631-22 ; C-016 → sort complet L.642-12). Candidat le plus probable ici : **sort des sûretés** (compléter report sur prix + **purge au paiement** + **droit de rétention non purgé**) ou **ordonnance du JC** (Gate 2 b). Si des MAJEUR sont manqués sans gate : enrichir le contenu doctrinal correspondant (ex. L.1224-1, L.642-7 a contrario, recours).
- [ ] **Step 3 : Commit puis reboucler T6→T7** (nouvelle session fraîche, **nouveau `CODE`**, ex. `CAI2SU`) jusqu'à gate-clean. Penser à bumper le code défaut dans `code_for` (ou utiliser l'override `CODE=`).

```bash
git add plugins/hacienda-droit-affaires/skills/cession-actifs-isoles/SKILL.md
git commit -m "fix(da): cession-actifs-isoles ancrage {article} ferme gate {id}"
```

---

## Task 9 : Release v0.8.0

**Files :**
- Modify (bump 0.7.0 → 0.8.0, **les 5 fichiers / 6 occurrences**) :
  - `plugins/hacienda-droit-affaires/version.json`
  - `plugins/hacienda-droit-affaires/manifest.json`
  - `plugins/hacienda-droit-affaires/mcp-server/package.json`
  - `plugins/hacienda-droit-affaires/.claude-plugin/plugin.json`
  - `plugins/hacienda-droit-affaires/.claude-plugin/marketplace.json` (2 occurrences)
- Modify: `plugins/hacienda-droit-affaires/CHANGELOG.md`

- [ ] **Step 1 : Repérer les occurrences** :

Run : `grep -rln '"version": "0.7.0"' plugins/hacienda-droit-affaires/ | grep -vE 'node_modules|tests'`

- [ ] **Step 2 : Bump version** dans les 5 fichiers, `0.7.0` → `0.8.0` (marketplace.json en a 2).

- [ ] **Step 3 : CHANGELOG** — entrée v0.8.0 :

```markdown
## v0.8.0

- Nouveau skill `cession-actifs-isoles` (distressed-M&A #3) : playbook côté
  repreneur pour construire et défendre une offre d'acquisition d'actifs isolés
  (fonds, marques, stocks, créances) auprès d'un débiteur en LJ, hors plan de
  cession (L.642-19). Double gate : qualification actif isolé vs going-concern
  (frontière `reprise-a-la-barre` / `pre-pack-cession`) + recevabilité
  (éligibilité L.642-20→L.642-3, ordonnance du juge-commissaire). Validé scoring
  blind 4 phases — {verdict/score CAI1QU}.
- DA : 25 skills.
```

- [ ] **Step 4 : Suite de vérification complète**

```bash
npm test
npm run typecheck
npm run build
npm run branding:check
git diff --check
```
Expected : tout PASS (dont `hacienda-droit-affaires-cowork-structure` : 25 skills, wrapper + README OK, versions alignées sur 0.8.0).

- [ ] **Step 5 : Commit + PR vers main**

Écrire le corps de PR dans un fichier (piège heredoc) puis `--body-file` :

```bash
git add plugins/hacienda-droit-affaires/version.json \
        plugins/hacienda-droit-affaires/manifest.json \
        plugins/hacienda-droit-affaires/mcp-server/package.json \
        plugins/hacienda-droit-affaires/.claude-plugin/plugin.json \
        plugins/hacienda-droit-affaires/.claude-plugin/marketplace.json \
        plugins/hacienda-droit-affaires/CHANGELOG.md
git commit -m "release(da): bump v0.7.0 -> v0.8.0 - skill cession-actifs-isoles (distressed-M&A #3)"
git push -u origin feat/da-cession-actifs-isoles
gh pr create --base main --head feat/da-cession-actifs-isoles \
  --title "release(da): cession-actifs-isoles v0.8.0 (distressed-M&A #3)" \
  --body-file /tmp/pr-body-cai.md
```
> Rappel handoff : cibler **main directement** ; vérifier d'abord que `main` n'a pas avancé (sinon rebaser).

- [ ] **Step 6 : MAJ handoff/backlog** — créer un nouveau handoff daté avec le résultat (cycle CAI1QU+) et le prochain candidat distressed-M&A (asset vs share deal en distress, L.632-1 / responsabilité repreneur). Marquer le cycle #3 terminé.

---

## Notes d'exécution

- **Ordre des phases** : T1 (scénario) précède T5 (Codex score contre le scénario). T2/T3/T4 (build + wrapper + scoring) précèdent T6 (live exécute le skill courant). T5 et T6 sont indépendants entre eux mais tous deux requis avant T7. T4 doit précéder T5/T6/T7 (les commandes `da-scoring.sh` en dépendent).
- **Séparation des acteurs** (protocole CLAUDE.md) : Phase 2 et Phase 4 = Codex sans SKILL.md ; Phase 3 = Claude frais sans ground-truth. Un même acteur sur les 4 = `[scoring auto-référent]`, non recevable pour le release.
- **Adaptation TDD** : le « test » de la qualité doctrinale est le scoring blind (T5-T7), pas un test unitaire. Les seuls tests automatisés sont structurels (`cowork-structure`, T3/T9).
- **Économie tokens** : Candy lance les commandes scoring (Codex abondant, Opus rare) ; Claude génère les prompts et fait l'analyse gate-driven. Cf. [[feedback-token-economy-codex]] et [[feedback-scoring-wrapper-workflow]].
- **Pièges environnement** : shell en `set -e` (commandes séparées / `|| true`) ; ENOSPC intermittent sur le FS temp (rediriger la sortie vers fichier hors `/tmp` puis Read) ; heredoc imbriqué dans `gh pr create` → `--body-file` ; `live-output.md` à ne pas laisser à la racine.
- **Frontière anti-chevauchement** : le test décisif du Gate 1 est qu'un scénario going-concern déclenche le renvoi `reprise-a-la-barre`, et un scénario amont-confidentiel le renvoi `pre-pack-cession`. Vérifier que la grille Phase 2 score bien ce triage.
