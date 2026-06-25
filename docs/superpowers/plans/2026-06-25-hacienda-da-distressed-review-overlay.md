# Overlay `--distressed` (spa-review / gap-review) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter un mode `--distressed` à `spa-review` et `gap-review` (plugin `hacienda-droit-affaires`) : une lentille « cible en difficulté » qui charge un module de référence partagé `references/distressed-overlay-fr.md` (période suspecte/nullités, passif non purgé, garantie de la garantie, side-aware), activable par flag explicite **ou** proposée après auto-détection de signaux de difficulté, avec frontière stricte vers les playbooks barre.

**Architecture :** Un **flag** sur deux skills existants + **un module de référence partagé** (source unique de doctrine). Chaque skill gagne une **étape conditionnelle** qui n'exécute la grille distressed que si le flag est posé/accepté ; hors flag, les revues restent inchangées. Pas de nouveau skill (count structure inchangé = 31). Pattern conforme à l'existant (`references/clauses-sensibles-fr.md` lus par les skills).

**Tech Stack :** Markdown (module de référence + édition de 2 SKILL.md), JSON (version/manifest), Vitest (test de structure existant — régression), wrapper Bash `scripts/da-scoring.sh`. Pas de code TS nouveau.

**Référence design :** `docs/superpowers/specs/2026-06-25-hacienda-da-distressed-review-overlay-design.md`.

## Global Constraints

- **Flag** : `--distressed` (tranché). Mention identique dans les deux SKILL.md, README, CHANGELOG, da-scoring.
- **Module partagé unique** : `plugins/hacienda-droit-affaires/references/distressed-overlay-fr.md`. La doctrine distressed n'est PAS dupliquée dans les deux SKILL.md — les deux **renvoient** au module (`references/distressed-overlay-fr.md`).
- **Hors flag = inchangé** : l'étape distressed est strictement conditionnelle ; aucune régression sur les revues standard.
- **Frontière barre stricte** : cible déjà en RJ/LJ avec appel d'offres ouvert → STOP overlay, renvoi `/h-da:reprise-a-la-barre` / `/h-da:cession-actifs-isoles`.
- **Anti-fabrication** : ne pas dater la cessation des paiements ni la période suspecte (semaines relatives ; date fixée par le tribunal) ; ne pas chiffrer le passif hérité ni l'exposition nullité (`[à compléter]`) ; ne pas conclure à la nullité (qualifier `[review]`) ; ne pas évaluer la responsabilité du dirigeant (renvoi `responsabilite-dirigeant`).
- **Préfixe** : uniquement `/h-da:` dans tout ajout. **Ne pas** mass-fixer les anciens `/h-droit-affaires:` présents dans spa-review/gap-review (hors scope) ; ne pas en introduire de nouveaux.
- **Ordre canonique des headings** des deux SKILL.md préservé (test `hacienda-droit-affaires-cowork-structure.test.ts`). Les `## Étape N` sont après `## Sortie` : insérer les étapes conditionnelles dans cette zone ne casse pas l'ordre testé.
- Encodage **UTF-8, LF** (jamais CRLF).
- **Count structure inchangé : 31** (pas de nouveau skill — ne PAS toucher au compteur).
- Version plugin : **0.14.0 → 0.15.0**.
- **Co-Authored-By** des commits : `Claude Opus 4.8 <noreply@anthropic.com>`.
- **Code de cycle scoring** : `SPADIS` (6 caractères majuscules).

---

## File Structure

**Créer :**
- `plugins/hacienda-droit-affaires/references/distressed-overlay-fr.md` — module de doctrine partagé.
- `plugins/hacienda-droit-affaires/tests/datasets/da-spa-review-distressed/scenario.md` — input scoring.

**Modifier :**
- `plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md` — ajouter L.632-1, L.632-2 (et L.632-3, L.632-4 si série) C.com.
- `plugins/hacienda-droit-affaires/skills/spa-review/SKILL.md` — flag intake + détection + étape conditionnelle + frontière barre + format livrable + « Ce skill ne fait pas ».
- `plugins/hacienda-droit-affaires/skills/gap-review/SKILL.md` — item Mode/flag intake + détection + étape conditionnelle (garantie de la garantie) + frontière barre + format livrable + « Ce skill ne fait pas ».
- `plugins/hacienda-droit-affaires/README.md` — mention `--distressed` sous spa-review/gap-review.
- Version (6 occurrences) + CHANGELOG.
- `scripts/da-scoring.sh` — entrée `spa-review-distressed` (code `SPADIS`).

---

## Task 0 : Branche

La branche `feat/da-distressed-review-overlay` est **déjà créée** (design commité `0553a55`).

- [ ] **Step 1 : Confirmer**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && git branch --show-current
```
Expected : `feat/da-distressed-review-overlay`.

---

## Task 1 : Module de référence partagé + index articles

**Files:**
- Create `plugins/hacienda-droit-affaires/references/distressed-overlay-fr.md`
- Modify `plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md`

**Interfaces:**
- Produces : module `references/distressed-overlay-fr.md` référencé par spa-review (Task 2) et gap-review (Task 3) ; articles L.632-1/L.632-2 disponibles pour `verifier-citations`.

- [ ] **Step 1 : Écrire le module** (UTF-8, LF, contenu exact ci-dessous)

````markdown
# Référence — Overlay difficulté (« distressed ») pour revue SPA / GAP

Module partagé chargé par `spa-review` et `gap-review` **uniquement** quand le mode
`--distressed` est posé (ou accepté après auto-détection). Hors mode distressed, ignorer
ce module : la revue standard est inchangée.

> **Périmètre.** Cible **en difficulté mais pas encore à la barre** : pré-procédure,
> prévention amiable (mandat ad hoc / conciliation), ou montage **pre-pack**, où il
> existe un **SPA / une GAP privés** à relire. La doctrine est **side-aware** (lecture
> inversée acquéreur / cédant-débiteur).

## Gate d'application (vérifier avant d'exécuter l'overlay)

1. **Cible déjà en RJ/LJ avec appel d'offres ouvert** → ce n'est PAS une revue de SPA
   privé : l'acte est **judiciaire** (plan de cession, L.642 C.com.). **STOP overlay** →
   renvoi `/h-da:reprise-a-la-barre` (offre de reprise) ou `/h-da:cession-actifs-isoles`
   (actifs isolés). Ne pas relire un acte de cession judiciaire comme un SPA privé.
2. **Cible pas réellement en difficulté** → pas d'overlay ; revue standard.
3. **Amont** : si l'orientation share vs asset / l'exposition repreneur n'a pas été
   posée, renvoyer `/h-da:asset-vs-share-distress` ; l'overlay **revoit les clauses**, il
   ne refait pas l'orientation.

## Signaux de détection (pour la proposition auto, hors flag)

Mention de procédure collective / mandataire / conciliation / mandat ad hoc ; cessation
des paiements ou capitaux propres négatifs ; prix symbolique (« 1 € ») ou « prix + reprise
de passif » ; earn-out de sauvetage ; déclaration de créance ; cédant en perte continue ;
sûretés récentes consenties pour des dettes antérieures ; condition suspensive « absence
de procédure ». Un seul signal sérieux suffit à **proposer** l'overlay.

## Axe D1 — Période suspecte / nullités (L.632-1, L.632-2 C.com.)

Si une procédure collective est ouverte après le deal, le tribunal fixe une **date de
cessation des paiements** rétroactive (jusqu'à **18 mois** avant le jugement) : la
**période suspecte** s'étend de cette date au jugement. Les actes passés pendant cette
période sont attaquables.

- **L.632-1 — nullités de DROIT** `[Légifrance]` (le juge constate, pas d'appréciation) :
  actes à titre gratuit translatifs ; contrats déséquilibrés (obligations du débiteur
  excédant notablement celles de l'autre partie) ; paiements de dettes **non échues** ;
  paiements par modes anormaux ; sûretés consenties pour des **dettes antérieurement
  contractées** ; etc.
- **L.632-2 — nullités FACULTATIVES** `[Légifrance]` : paiements de dettes échues et actes
  à titre onéreux, **annulables si** le cocontractant **connaissait** la cessation des
  paiements. La connaissance se prouve.

**Conséquence revue** : flaguer le **timing** (le deal tombe-t-il dans une période suspecte
possible ?) et les clauses exposées (prix anormalement bas, paiement préférentiel d'un
créancier, sûreté pour dette antérieure). Côté **acquéreur** : risque que la cession soit
**annulée** → exiger des protections (déclaration du cédant sur l'absence de cessation des
paiements, indemnisation spécifique, séquestre). Côté **cédant/débiteur** : le deal **sera
attaqué** si une procédure s'ouvre → documenter l'équilibre du prix.

> **Ne pas dater** la cessation des paiements ni la période suspecte (semaines relatives ;
> la date est **fixée par le tribunal**, rétroactive). **Ne pas conclure** à la nullité :
> qualifier le **risque** `[review]` (conditions L.632-1/2 + connaissance pour L.632-2).

## Axe D2 — Passif non purgé (share deal) → GAP centrale

Un **share deal** (cession de titres) d'une société en difficulté **n'apure aucun passif** :
l'acquéreur hérite de **toutes** les dettes et de tous les litiges (commerciaux, fiscaux,
sociaux, environnementaux), des procédures en cours et des passifs latents. La **GAP** n'est
donc pas accessoire : elle est la **protection centrale** du repreneur. Vérifier que la GAP
couvre explicitement les passifs **antérieurs non révélés** et les conséquences d'une
procédure future. (Un **asset deal** purge davantage mais transfère d'autres charges — voir
D4 ; l'arbitrage share vs asset relève de `asset-vs-share-distress`, en amont.)

## Axe D3 — Garantie de la garantie (cédant insolvable)

Une GAP **ne vaut que ce que vaut le garant**. Face à un cédant en difficulté, une GAP
nue est **illusoire** : à l'appel en garantie, le cédant sera insolvable. Exiger une
**garantie de la garantie** :
- **séquestre** d'une fraction du prix (escrow) sur compte bloqué ;
- **garantie autonome à première demande (GAPD)** ou **caution bancaire** ;
- durée et montant calibrés sur les passifs latents (fiscal/social/environnemental :
  exposition longue).

Côté **acquéreur** : sans garantie de la garantie, traiter la GAP comme **🔴** (protection
théorique). Côté **cédant/débiteur** : anticiper que l'acquéreur l'exigera ; elle immobilise
de la trésorerie.

## Axe D4 — Transferts & solidarités (cross-link — ne pas re-traiter au fond)

L'overlay **signale** et **renvoie** ; il ne refait pas l'analyse de fond des axes déjà
couverts par les revues standard :
- **L.1224-1 C. trav.** — transfert **automatique** des contrats de travail en cas de
  transfert d'entité économique autonome (asset deal / fonds) : le passif social suit. (Axe
  social de `gap-review` / renvoi conseil social.)
- **Solidarité fiscale** — **L.1684 CGI** (cession de fonds de commerce : solidarité de
  l'acquéreur pour certains impôts du cédant) ; **L.267 LPF** (solidarité du dirigeant).
  Nommer, **aucun conseil fiscal au fond** → renvoi.
- **Passif environnemental ICPE** — installations classées : obligations de remise en état,
  exécution d'office (art. L.171-8 C. env.). Renvoi à l'axe environnement de `gap-review`.

## Axe D5 — MAC & conditions suspensives spécifiques

Entre signing et closing, une cible fragile peut **basculer en cessation des paiements**.
Rendre critiques :
- une clause **MAC** visant explicitement l'aggravation financière / l'ouverture d'une
  procédure ;
- une **condition suspensive « absence d'état de cessation des paiements / d'ouverture
  d'une procédure »** au closing ;
- un **mécanisme de prix** protégé contre la dégradation (ajustement, earn-out, prix sous
  condition).

## Lecture side-aware (synthèse)

| Axe | Acquéreur (se protéger) | Cédant / débiteur (anticiper) |
|---|---|---|
| D1 nullités | déclaration CdP + indemnisation + séquestre | le deal sera attaqué ; équilibrer le prix |
| D2 passif | GAP centrale, couvre l'antérieur | divulguer ; le prix reflète le passif |
| D3 garantie | exiger séquestre/GAPD, sinon 🔴 | trésorerie immobilisée |
| D4 transferts | auditer social/fiscal/ICPE | solidarités résiduelles |
| D5 MAC/CS | MAC + CS absence de procédure | risque de caducité |

## Anti-fabrication (rappel)

Dates en **semaines relatives** (jamais la date de cessation des paiements) ; **pas de
quantum** de passif ni d'exposition nullité (`[à compléter]`, réclamer l'état du passif) ;
nullité = **risque qualifié `[review]`**, jamais conclusion ; responsabilité du dirigeant
**nommée et renvoyée** (`/h-da:responsabilite-dirigeant`), jamais évaluée ici.

## Renvois

- Amont orientation : `/h-da:asset-vs-share-distress`.
- Barre (cible déjà en procédure) : `/h-da:reprise-a-la-barre`, `/h-da:cession-actifs-isoles`.
- Montage confidentiel amont : `/h-da:pre-pack-cession`.
- Exposition dirigeant cédant : `/h-da:responsabilite-dirigeant`.
````

- [ ] **Step 2 : Ajouter L.632-1/L.632-2 à l'index articles**

Ouvrir `plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md`, repérer la section Code de commerce (procédures collectives / livre VI) et ajouter les entrées manquantes au bon endroit (ordre numérique). Format identique aux entrées voisines (vérifier le format exact d'une ligne existante d'abord) :

```bash
cd /Users/candynguyen/dev/hacienda-juridique && grep -nE "L\.63[0-9]|L\.64[0-9]|L\.65" plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md | head
```
Ajouter (en respectant le format de la ligne voisine repérée) au minimum :
- `L.632-1 C.com.` — nullités de droit de la période suspecte
- `L.632-2 C.com.` — nullités facultatives de la période suspecte

Si le fichier est structuré en tableau `| article | objet |`, suivre ce format ; s'il est en liste, suivre la liste. **Ne pas** inventer de format.

- [ ] **Step 3 : Vérifier CRLF + index**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && grep -lc $'\r' plugins/hacienda-droit-affaires/references/distressed-overlay-fr.md; echo "crlf_exit=$?"; grep -c "632-1" plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md
```
Expected : `crlf_exit=1` (pas de CRLF) ; au moins `1` pour L.632-1.

- [ ] **Step 4 : Commit**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && git add plugins/hacienda-droit-affaires/references/distressed-overlay-fr.md plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md && git commit -m "feat(da): module partagé distressed-overlay-fr + index L.632-1/2" -m "Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 2 : `spa-review` — mode `--distressed`

**Files:** Modify `plugins/hacienda-droit-affaires/skills/spa-review/SKILL.md`

**Interfaces:**
- Consumes : `references/distressed-overlay-fr.md` (Task 1).

- [ ] **Step 1 : Intake — ajouter le flag** (item 1 « Mode »). Remplacer :

```
1. **Mode** — `--review` par défaut ; options de sortie `--red-flags`, `--issues-list`, `--signing-ready`.
```
par :
```
1. **Mode** — `--review` par défaut ; options de sortie `--red-flags`, `--issues-list`, `--signing-ready` ; **`--distressed`** (overlay « cible en difficulté » — charge `references/distressed-overlay-fr.md`). Hors `--distressed`, si des **signaux de difficulté** sont détectés (procédure collective, cessation des paiements, prix symbolique + reprise de passif, déclaration de créance, sûretés récentes pour dettes antérieures), **proposer** l'overlay sans l'imposer.
```

- [ ] **Step 2 : Insérer l'étape conditionnelle** après le bloc de l'`## Étape 9 — Covenants restrictifs et post-closing` et **avant** `## Étape 10 — Renvois et liste de points`. Insérer ce bloc :

```
## Étape 9bis — Overlay difficulté (si `--distressed` ou overlay accepté)

**N'exécuter que si le mode distressed est actif.** Charger `references/distressed-overlay-fr.md` et appliquer sa grille **side-aware** au SPA :

1. **Gate barre** : si la cible est **déjà en RJ/LJ avec appel d'offres ouvert**, STOP overlay → renvoi `/h-da:reprise-a-la-barre` / `/h-da:cession-actifs-isoles` (l'acte serait judiciaire, pas un SPA privé).
2. **D1 — période suspecte / nullités** (L.632-1 de droit / L.632-2 facultatives `[Légifrance]`) : le timing du deal expose-t-il à une nullité ? clauses à risque (prix anormalement bas, paiement préférentiel, sûreté pour dette antérieure). **Ne pas dater** la cessation des paiements ; nullité = risque `[review]`.
3. **D2 — passif non purgé** (share deal) : la GAP couvre-t-elle l'antérieur non révélé + une procédure future ?
4. **D3 — garantie de la garantie** : séquestre / GAPD / caution exigés face à un cédant fragile ; sinon protection théorique → renvoi `/h-da:gap-review --distressed`.
5. **D4/D5** : transferts & solidarités (L.1224-1, L.1684 CGI/L.267 LPF, ICPE — cross-link, renvoi) ; MAC + CS « absence de procédure ».
6. **Exposition dirigeant cédant** : nommer et renvoyer `/h-da:responsabilite-dirigeant` ; ne pas évaluer.

Sortir les findings distressed dans la liste de points (sévérité 🟢🟡🟠🔴) et une ligne dédiée du résumé. **Ne pas chiffrer** le passif (`[à compléter]`).

```

- [ ] **Step 3 : Format livrable — section conditionnelle.** Dans `### Format livrable` (sous `## Sortie`, ~ligne 129), ajouter une section conditionnelle après `## Red flags` (repérer la ligne `## Red flags` dans le bloc de template). Insérer :

```
## Overlay difficulté (si `--distressed`)
- Gate barre : {cible à la barre → renvoi reprise/cession-actifs | deal privé, overlay appliqué}
- Période suspecte / nullités (L.632-1/2) : {risque [review] | sans objet}
- Passif non purgé + garantie de la garantie : {état | à compléter}
- Renvois distressed : {gap-review --distressed / responsabilite-dirigeant / asset-vs-share-distress}
```

- [ ] **Step 4 : « Ce skill ne fait pas » — ajouter 2 bullets.** Dans `## Ce skill ne fait pas`, ajouter :

```
- **Dater** la cessation des paiements ou la période suspecte en mode `--distressed` — semaines relatives ; la date est fixée par le tribunal (`[à compléter]`).
- **Couvrir une cession judiciaire à la barre** — dès que la cible est en RJ/LJ avec appel d'offres ouvert, renvoi `/h-da:reprise-a-la-barre` / `/h-da:cession-actifs-isoles`.
```

- [ ] **Step 5 : Vérifier structure + CRLF + préfixe**

```bash
cd /Users/candynguyen/dev/hacienda-juridique/packages/core && ./node_modules/.bin/vitest run test/hacienda-droit-affaires-cowork-structure.test.ts 2>&1 | tail -8
cd /Users/candynguyen/dev/hacienda-juridique && grep -c "distressed-overlay-fr.md" plugins/hacienda-droit-affaires/skills/spa-review/SKILL.md; grep -nE '/h-droit-affaires:[a-z]' plugins/hacienda-droit-affaires/skills/spa-review/SKILL.md | grep -v "h-da" | head
```
Expected : structure test **vert** (count 31 inchangé, ordre des headings préservé) ; ≥1 référence au module ; **aucun nouveau** préfixe `/h-droit-affaires:` introduit par mes ajouts (les anciens éventuels pré-existants ne sont pas de mon fait — ne pas les toucher).

- [ ] **Step 6 : Commit**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && git add plugins/hacienda-droit-affaires/skills/spa-review/SKILL.md && git commit -m "feat(da): spa-review — mode --distressed (overlay cible en difficulté)" -m "Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 3 : `gap-review` — mode `--distressed`

**Files:** Modify `plugins/hacienda-droit-affaires/skills/gap-review/SKILL.md`

**Interfaces:**
- Consumes : `references/distressed-overlay-fr.md` (Task 1).

- [ ] **Step 1 : Intake — ajouter un item Mode/flag** après l'item 4 (`--prix`) de la section `## Intake`. Insérer :

```
5. **Mode `--distressed`** (optionnel) — overlay « cible en difficulté » : charge `references/distressed-overlay-fr.md` et centre la revue sur la **garantie de la garantie** (séquestre/GAPD face à un cédant insolvable) et le passif non purgé. Hors flag, si des **signaux de difficulté** apparaissent (procédure collective, cessation des paiements, cédant en perte, prix symbolique), **proposer** l'overlay sans l'imposer.
```

- [ ] **Step 2 : Insérer l'étape conditionnelle** après `## Étape 6 — Axe 5 : Confrontation findings DD (si --dd-findings fourni)` et **avant** `## Étape 7 — Liste de points consolidée`. Insérer :

```
## Étape 6bis — Overlay difficulté (si `--distressed` ou overlay accepté)

**N'exécuter que si le mode distressed est actif.** Charger `references/distressed-overlay-fr.md` :

1. **Gate barre** : cible **déjà en RJ/LJ avec appel d'offres ouvert** → STOP overlay → renvoi `/h-da:reprise-a-la-barre` / `/h-da:cession-actifs-isoles` (l'acte serait judiciaire).
2. **D3 — garantie de la garantie (point central GAP distressed)** : une GAP d'un cédant en difficulté ne vaut rien sans **séquestre / garantie autonome à première demande (GAPD) / caution bancaire**. Sans elle, qualifier la GAP **🔴** (protection théorique) ; calibrer durée/montant sur les passifs latents (fiscal/social/environnemental, exposition longue).
3. **D2 — passif non purgé** : la GAP couvre-t-elle l'antérieur non révélé et les conséquences d'une procédure future ?
4. **D1 — période suspecte** : une GAP ou une sûreté consentie en période suspecte peut elle-même être attaquable (L.632-1/2 `[Légifrance]`) — signaler `[review]`, **ne pas dater** la cessation des paiements.
5. **D4** : transferts & solidarités (L.1224-1, L.1684 CGI/L.267 LPF, ICPE — cross-link avec l'axe environnement existant).

Intégrer les findings distressed dans la liste de points (sévérité side-aware). **Ne pas chiffrer** le passif (`[à compléter]`) ; exposition dirigeant → renvoi `/h-da:responsabilite-dirigeant`.

```

- [ ] **Step 3 : Format livrable — section conditionnelle.** Dans `### Format livrable` (sous `## Sortie`, ~ligne 257), après `## Axe 5 — Confrontation DD (si fourni)` (~ligne 290 du template), ajouter :

```
## Overlay difficulté (si `--distressed`)
- Gate barre : {à la barre → renvoi reprise/cession-actifs | GAP privée, overlay appliqué}
- Garantie de la garantie : {séquestre/GAPD présent | absent → 🔴} [review]
- Passif non purgé / période suspecte (L.632-1/2) : {risque [review] | sans objet}
- Renvois : {spa-review --distressed / responsabilite-dirigeant / asset-vs-share-distress}
```

- [ ] **Step 4 : « Ce skill ne fait pas » — ajouter 2 bullets.** Dans `## Ce skill ne fait pas`, ajouter :

```
- **Dater** la cessation des paiements / la période suspecte en mode `--distressed` (semaines relatives ; date fixée par le tribunal).
- **Couvrir une GAP de cession judiciaire à la barre** — renvoi `/h-da:reprise-a-la-barre` / `/h-da:cession-actifs-isoles`.
```

- [ ] **Step 5 : Vérifier structure + CRLF + module**

```bash
cd /Users/candynguyen/dev/hacienda-juridique/packages/core && ./node_modules/.bin/vitest run test/hacienda-droit-affaires-cowork-structure.test.ts 2>&1 | tail -8
cd /Users/candynguyen/dev/hacienda-juridique && grep -c "distressed-overlay-fr.md" plugins/hacienda-droit-affaires/skills/gap-review/SKILL.md
```
Expected : structure test **vert** (count 31, ordre préservé) ; ≥1 référence au module.

- [ ] **Step 6 : Commit**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && git add plugins/hacienda-droit-affaires/skills/gap-review/SKILL.md && git commit -m "feat(da): gap-review — mode --distressed (garantie de la garantie centrale)" -m "Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 4 : README + bump v0.15.0

**Files:** `plugins/hacienda-droit-affaires/README.md` + version (6) + `CHANGELOG.md`.

- [ ] **Step 1 : README — mentionner le mode.** Remplacer la ligne 102 :

```
| `/h-da:gap-review` | Revue de garantie d'actif et de passif. |
```
par :
```
| `/h-da:gap-review` | Revue de garantie d'actif et de passif. Mode `--distressed` : cible en difficulté (garantie de la garantie). |
```
Et la ligne 115 :
```
| `/h-da:spa-review` | Revue de SPA / protocole de cession. |
```
par :
```
| `/h-da:spa-review` | Revue de SPA / protocole de cession. Mode `--distressed` : cible en difficulté (période suspecte, passif non purgé). |
```

- [ ] **Step 2 : Bump 0.14.0 → 0.15.0**

```bash
cd /Users/candynguyen/dev/hacienda-juridique/plugins/hacienda-droit-affaires
sed -i '' 's/"version": "0.14.0"/"version": "0.15.0"/' version.json manifest.json mcp-server/package.json .claude-plugin/plugin.json .claude-plugin/marketplace.json
grep -rn '"version": "0.1' version.json manifest.json mcp-server/package.json .claude-plugin/plugin.json .claude-plugin/marketplace.json
```
Expected : 6 lignes en `0.15.0` ; aucune résiduelle `0.14.0`.

- [ ] **Step 3 : CHANGELOG** — prepend :

```markdown
## 0.15.0

- Mode `--distressed` ajouté à `spa-review` et `gap-review` : overlay « cible en difficulté » (pré-procédure / amiable / pre-pack) chargeant le module partagé `references/distressed-overlay-fr.md` — période suspecte et nullités (L.632-1/L.632-2), passif non purgé en share deal, garantie de la garantie face à un cédant insolvable, transferts/solidarités (L.1224-1, L.1684 CGI), MAC/CS spécifiques. Activable par flag ou proposé après auto-détection de signaux de difficulté. Frontière stricte : cible déjà à la barre → renvoi `reprise-a-la-barre` / `cession-actifs-isoles`. Ne date pas la cessation des paiements, ne chiffre pas le passif, ne conclut pas la nullité (risque `[review]`).
- Relie le moat distressed-M&A (`asset-vs-share-distress`) au quotidien M&A/PE. Pas de nouveau skill (31).
```

- [ ] **Step 4 : Vérif versions résiduelles**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && grep -rn "0.14.0" plugins/hacienda-droit-affaires/version.json plugins/hacienda-droit-affaires/manifest.json plugins/hacienda-droit-affaires/.claude-plugin/*.json plugins/hacienda-droit-affaires/mcp-server/package.json; echo "exit=$?"
```
Expected : aucune occurrence (`exit=1`).

- [ ] **Step 5 : Vérification globale du dépôt**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && npm test 2>&1 | tail -15; echo "=== typecheck ==="; npm run typecheck 2>&1 | tail -5; echo "=== build ==="; npm run build 2>&1 | tail -5; echo "=== branding ==="; npm run branding:check 2>&1 | tail -5; echo "=== whitespace ==="; git diff --check
```
Expected : suite verte (skip `eurlex-live-v2` attendu = panne API externe, blanchir si seul rouge) ; typecheck/build/branding OK ; `git diff --check` propre.

- [ ] **Step 6 : Commit**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && git add plugins/hacienda-droit-affaires/README.md plugins/hacienda-droit-affaires/version.json plugins/hacienda-droit-affaires/manifest.json plugins/hacienda-droit-affaires/mcp-server/package.json plugins/hacienda-droit-affaires/.claude-plugin/plugin.json plugins/hacienda-droit-affaires/.claude-plugin/marketplace.json plugins/hacienda-droit-affaires/CHANGELOG.md && git commit -m "chore(da): README + bump v0.15.0 (mode --distressed spa/gap)" -m "Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 5 : Enregistrer le scoring + dataset

**Files:** `scripts/da-scoring.sh` + `plugins/hacienda-droit-affaires/tests/datasets/da-spa-review-distressed/scenario.md`

**Interfaces:**
- Consumes : nom de cycle `spa-review-distressed` ; code défaut `SPADIS` (6 car.).

- [ ] **Step 1 : SKILLS array** — ajouter `spa-review-distressed` à la fin du tableau `SKILLS=(…)` (après `defense-dirigeant`).

- [ ] **Step 2 : `code_for()`** — ajouter après la ligne `defense-dirigeant) echo "DFD1RT" ;;` :

```bash
    spa-review-distressed) echo "SPADIS" ;;
```

- [ ] **Step 3 : `mode_for()`** — ajouter après la ligne `defense-dirigeant) … (mode unique)" ;;` :

```bash
    spa-review-distressed) echo "revue SPA avec overlay --distressed (cible en difficulte)" ;;
```

- [ ] **Step 4 : `spec_for()`** — ajouter après la ligne `defense-dirigeant)` correspondante :

```bash
    spa-review-distressed) echo "revue d'un SPA prive de cession de titres d'une cible EN DIFFICULTE mais PAS encore a la barre (pre-procedure / amiable / pre-pack), avec le mode --distressed actif ; side acquereur ou cedant ; doit appliquer l'overlay difficulte : (D1) periode suspecte et nullites L.632-1 de droit / L.632-2 facultatives sans DATER la cessation des paiements (date fixee par le tribunal, retroactive) et sans CONCLURE a la nullite (risque review) ; (D2) passif non purge en share deal -> GAP centrale ; (D3) garantie de la garantie (sequestre/GAPD) face a un cedant insolvable, sinon protection theorique ; (D4) transferts et solidarites L.1224-1, L.1684 CGI/L.267 LPF, ICPE a NOMMER et renvoyer sans conseil fiscal ; (D5) MAC et condition suspensive d'absence de procedure ; gate barre : si la cible est DEJA en RJ/LJ avec appel d'offres ouvert, REFUSER l'overlay et renvoyer reprise-a-la-barre / cession-actifs-isoles ; ne chiffre pas le passif ; exposition dirigeant cedant a NOMMER et router vers responsabilite-dirigeant sans evaluer ; faits en semaines relatives" ;;
```

- [ ] **Step 5 : `desc_for()`** — ajouter après la ligne `defense-dirigeant)` correspondante :

```bash
    spa-review-distressed) echo "Revue d'un SPA prive sur une cible en difficulte (pre-procedure/amiable/pre-pack) avec le mode --distressed : applique l'overlay difficulte (periode suspecte/nullites L.632-1/2, passif non purge, garantie de la garantie, transferts/solidarites, MAC/CS), side-aware. Refuse et renvoie aux playbooks barre si la cible est deja a la barre. Ne date pas la cessation des paiements, ne chiffre pas le passif, ne conclut pas la nullite (risque review), n'evalue pas la responsabilite du dirigeant. Brouillon soumis a validation avocat M&A. NE PAS supposer le contenu du SKILL.md ni du module de reference." ;;
```

- [ ] **Step 6 : `command_for()`** — ajouter après la ligne `defense-dirigeant) echo "/h-da:defense-dirigeant" ;;` :

```bash
    spa-review-distressed) echo "/h-da:spa-review --distressed" ;;
```

- [ ] **Step 7 : `usage()` Skills list** — ajouter `spa-review-distressed` à la liste du heredoc `usage()` (après `defense-dirigeant`).

- [ ] **Step 8 : Écrire le dataset** `plugins/hacienda-droit-affaires/tests/datasets/da-spa-review-distressed/scenario.md` — fact pattern fictif **sans solution**, un **SPA privé** sur une cible en difficulté. Ingrédients obligatoires (signaux à exercer, aucun moyen pré-rédigé) :
  - SPA de **cession de titres** (share deal) d'une SAS en difficulté, **side acquéreur** ;
  - cible **pré-procédure / amiable** (conciliation ou mandat ad hoc évoqué) — **PAS encore à la barre** (pour ne pas déclencher le gate barre, mais le scénario peut mentionner une procédure *possible*) ;
  - **prix faible + reprise de passif** (signal distressed) ;
  - éléments faisant douter d'une **période suspecte** possible (sûreté récente consentie au profit d'un créancier pour une dette antérieure ; paiement préférentiel) — sans donner de date calendaire (dire « il y a ~quelques mois ») ;
  - **GAP nue** sans séquestre ni garantie bancaire (pour exercer D3) ;
  - **passif fiscal et social latent** non chiffré précisément + une **ICPE** dans le périmètre ;
  - **capitaux propres négatifs** / pertes continues du cédant ;
  - une clause de prix sans CS « absence de procédure » (pour exercer D5) ;
  - aucune réponse / aucun moyen / aucune qualification dans le fichier.

- [ ] **Step 9 : Vérifier l'enregistrement + dataset**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && bash scripts/da-scoring.sh cycles spa-review-distressed 2>&1 | head; echo "---"; bash -n scripts/da-scoring.sh && echo "syntaxe OK"; test -f plugins/hacienda-droit-affaires/tests/datasets/da-spa-review-distressed/scenario.md && echo "dataset OK"; grep -lc $'\r' plugins/hacienda-droit-affaires/tests/datasets/da-spa-review-distressed/scenario.md; echo "crlf_exit=$?"
```
Expected : skill reconnu (pas « unknown skill ») ; `bash -n` OK ; dataset présent ; `crlf_exit=1`.

- [ ] **Step 10 : Commit**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && git add scripts/da-scoring.sh plugins/hacienda-droit-affaires/tests/datasets/da-spa-review-distressed/scenario.md && git commit -m "test(da): enregistre spa-review-distressed (SPADIS) + dataset" -m "Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 6 : Handoff scoring → Candy (interactif, hors build)

- [ ] **Step 1 : HANDOFF.** Annoncer que la cible est **gate-clean ADMIS** (SEUIL_ADMIS = 1.0) et que le scoring blind est piloté **par Candy** via le wrapper. **Ne pas exécuter le scoring côté Claude** (cf. `[[feedback_token_economy_codex]]`, `[[feedback_scoring_wrapper_workflow]]`). Allocation : Phase 2 = Codex HIGH (sans SKILL.md ni module) ; Phase 3 = Claude **Sonnet** fraîche (sans ground-truth) ; Phase 4 = Codex medium. **CHECKPOINT gates entre Phase 2 et Phase 3** : reformuler tout gate-recall, toute asymétrie liste conjonctive / **silence orphelin** (cf. C-015, `[[feedback_gate_calibration_scoring]]`) — notamment le gate « gate barre » (PASS doit être le complément exact de « ne refuse pas alors que la cible est à la barre ») et le gate « ne date pas la CdP ». Borner les cycles (`[[feedback_date_fabrication_scoring_variance]]`).
- [ ] **Step 2 : Contrôle live miroir `gap-review --distressed`** (sanity, hors cycle blind) : une exécution live sur un mini-scénario GAP distressed pour vérifier que l'étape 6bis se déclenche et centre la garantie de la garantie. Pas de scoring formel.

---

## Self-Review (rempli pendant la rédaction du plan)

**1. Spec coverage :**
- Design §2 architecture B (flag + module partagé) → Task 1 (module) + Tasks 2/3 (flag + renvoi au module). ✓
- Design §3 activation 2 (flag + auto-détection propose) → Task 2 Step 1 / Task 3 Step 1 (signaux + proposition). ✓
- Design §4 contenu module (D1-D5 side-aware) → Task 1 Step 1. ✓
- Design §5 gate/frontières (barre / pas en difficulté / amont asset-vs-share) → Task 1 (Gate d'application) + Tasks 2/3 (gate barre dans l'étape) + « Ce skill ne fait pas ». ✓
- Design §6 anti-fabrication → Task 1 (module) + Tasks 2/3 (rappels) + Global Constraints. ✓
- Design §7 naming/scoring/surface → Global Constraints (flag, SPADIS) + Task 5 (scoring) + Tasks 2/3/4. ✓
- Design §8 contraintes build (préfixe, ordre headings, L.632 index) → Global Constraints + Task 1 Step 2 + Tasks 2/3 Step 5. ✓
- Design §9 ce que l'overlay ne fait pas → Tasks 2/3 Step 4. ✓

**2. Placeholder scan :** aucun « TBD/TODO ». Module, étapes, format livrable, CHANGELOG, 6 fonctions da-scoring fournis in extenso. Le scénario (Task 5 Step 8) est laissé à rédiger (fact-pattern fictif) mais ses **ingrédients obligatoires** sont spécifiés — contrainte de contenu, pas placeholder. L'édition de l'index articles (Task 1 Step 2) demande de repérer le format voisin avant d'ajouter (le format exact n'est pas connu sans lecture) — instruction explicite, pas placeholder.

**3. Type/nom consistency :** `--distressed` (flag), `references/distressed-overlay-fr.md` (module), `spa-review-distressed` (cycle), `SPADIS` (code 6 car.), v0.14.0→v0.15.0, count **31 inchangé** — cohérents entre Global Constraints, Tasks 1-5. Étapes nommées `9bis` (spa) / `6bis` (gap) insérées après `## Sortie` (ordre canonique préservé). Co-Authored-By 4.8 partout.
