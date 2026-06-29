# closing-checklist-fr `--pe` (lentille closing LBO) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter un mode `--pe` (lentille closing LBO, side sponsor) à `closing-checklist-fr`, isomorphe aux overlays PE déjà livrés sur pacte/spa/gap, sans aucune régression du closing standard.

**Architecture:** Un 3ᵉ module frère `references/pe-closing-overlay-fr.md` (axes L1–L5) qui référence le socle partagé `pe-overlay-fr.md` (gate France/Lux, glossaire, anti-fabrication, **non redupliqués**) ; un flag `--pe` + une étape conditionnelle « Étape PE » + un « Volet 5 » dans `closing-checklist-fr/SKILL.md` ; l'alignement des forward-refs des modes frères de `--pe-funds-flow` vers `--pe` ; l'intendance de version + le scaffolding de scoring.

**Tech Stack:** Skills Markdown (YAML frontmatter), monorepo npm (`npm test` = tests de structure des skills + core), `npm run branding:check`, wrapper Bash `scripts/da-scoring.sh`, protocole blind 4 phases Codex.

## Global Constraints

- **Flag** : `--pe` (pas `--pe-funds-flow`). Side en mode `--pe` : `--side=sponsor` (défaut, ≡ acquéreur) | `--side=cedant` (≡ cédant sponsor).
- **Lettre d'axe** : `L1`–`L5` (jamais `C` — collision visuelle avec les critères de scoring `C-0XX`).
- **Zéro régression** : hors `--pe`, le closing standard (CP / séquençage / documentation / post-closing pour cession-titres / cession-fonds / fusion) doit rester **strictement inchangé**. Toute la doctrine PE est dans le module frère + les blocs conditionnels gardés par `--pe`.
- **Anti-fabrication** (non négociable) : ne jamais chiffrer le funds flow (structure du tableau, montants en `[à compléter]`) ; ne jamais valider un montage d'assistance financière / debt push-down (nommé, `[review]`, renvoyé) ; pas d'avis fiscal (régime d'apport rollover, intégration LBO, droits d'enregistrement → `[à vérifier]` + renvoi) ; pas de date calendaire (semaines relatives) ; tout article non vérifié en source primaire → `[à vérifier]`, aucun identifiant LEGIARTI inventé.
- **Socle partagé lu tel quel** : `pe-overlay-fr.md` (gate / glossaire / anti-fabrication) est référencé, **jamais redupliqué ni édité** dans le nouveau module.
- **Versions** : `closing-checklist-fr` SKILL `2.0.0 → 2.1.0` ; plugin `0.17.0 → 0.18.0` sur les **3 fichiers** verrouillés (`version.json`, `mcp-server/package.json`, `.claude-plugin/plugin.json`) + `CHANGELOG.md`.
- **Compte de skills inchangé** : 31 (aucun skill neuf ; c'est un mode).
- **Vérification avant fin** : `npm test`, `npm run typecheck`, `npm run build`, `npm run branding:check`, `git diff --check`.
- **Référence spec** : `docs/superpowers/specs/2026-06-29-hacienda-da-closing-pe-design.md` (doctrine des axes en §3, structure module en §4).
- **Module modèle à imiter** : `plugins/hacienda-droit-affaires/references/pe-spa-gap-overlay-fr.md` (frère SPA/GAP — même charpente).

---

### Task 1 : Vérifier l'article assistance financière (prérequis citations)

Avant toute rédaction du module : peupler l'index des articles avec `L.225-216 C.com.` (assistance financière) et son pendant SAS, ou les marquer `[à vérifier]`. C'est le piège phâre L4 — sa citation doit être propre.

**Files:**
- Modify: `plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md`

**Interfaces:**
- Produces : entrée(s) d'index pour `L.225-216` (et pendant SAS) avec identifiant LEGIARTI vérifié **ou** statut `[à vérifier]`, consommée par le module (Task 2) et la discipline citations.

- [ ] **Step 1 : Constater l'absence**

Run : `grep -nE "225-216|assistance financ" plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md`
Expected : aucune ligne (article absent).

- [ ] **Step 2 : Vérifier l'article en source primaire**

Deux voies, au choix de Candy (commandes de vérification lancées par Candy si Codex) :
- soit via le skill `/h-da:verifier-citations` sur le libellé « L.225-216 C.com. assistance financière » ;
- soit un Codex effort-high qui retourne l'intitulé exact + l'identifiant LEGIARTI + le pendant applicable à la SAS (renvoi L.227-1 al. 3 / L.225-216 `[à vérifier]`).

Si la vérification n'est pas concluante, ne pas inventer : passer en `[à vérifier]` (Step 3 le prévoit).

- [ ] **Step 3 : Ajouter la ou les lignes d'index**

Ajouter dans la table de `articles-c-civ-c-com-index.md` (même format que les lignes existantes `| Article | Objet | LEGIARTI | Domaine |`) :

```markdown
| L.225-216 | Interdiction de l'assistance financière — une société ne peut avancer des fonds, consentir des prêts ni donner des sûretés en vue de la souscription ou de l'achat de ses propres actions par un tiers | <LEGIARTI vérifié ou `[à vérifier]`> | Closing LBO / debt push-down / upstream guarantee. Piège phâre `closing-checklist-fr --pe` (axe L4). Applicabilité à la SAS par renvoi L.227-1 `[à vérifier]`. |
```

Si l'identifiant LEGIARTI n'a pas été vérifié en source primaire : mettre `[à vérifier]` dans la colonne identifiant **et** dans les notes. Aucun LEGIARTI inventé.

- [ ] **Step 4 : Vérifier la présence**

Run : `grep -nE "225-216" plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md`
Expected : la nouvelle ligne apparaît.

- [ ] **Step 5 : Commit**

```bash
git add plugins/hacienda-droit-affaires/references/articles-c-civ-c-com-index.md
git commit -m "feat(da): index article L.225-216 (assistance financiere) pour closing --pe"
```

---

### Task 2 : Module frère `pe-closing-overlay-fr.md` (axes L1–L5)

**Files:**
- Create: `plugins/hacienda-droit-affaires/references/pe-closing-overlay-fr.md`
- Read (modèle) : `plugins/hacienda-droit-affaires/references/pe-spa-gap-overlay-fr.md`, `plugins/hacienda-droit-affaires/references/pe-overlay-fr.md`

**Interfaces:**
- Consumes : `pe-overlay-fr.md` (socle : gate France/Lux, glossaire ~100 termes, anti-fabrication — référencé, non redupliqué) ; ligne d'index `L.225-216` (Task 1).
- Produces : module chargé par `closing-checklist-fr/SKILL.md` (Task 3) quand `--pe` est posé. Axes nommés `L1`..`L5`. Signaux de détection pour l'auto-proposition.

- [ ] **Step 1 : Créer le fichier avec l'en-tête + périmètre + renvoi socle**

Imiter strictement l'en-tête de `pe-spa-gap-overlay-fr.md` (lignes 1–19). Contenu exact à produire :

```markdown
# Référence — Overlay Private Equity (« --pe ») pour checklist de closing LBO (side sponsor)

Module frère de `pe-overlay-fr.md`, chargé par `closing-checklist-fr` **uniquement** quand le
mode `--pe` est posé (ou accepté après auto-détection). Hors mode `--pe`, ignorer ce module :
la checklist de closing standard est inchangée.

> **Périmètre.** Cible le **closing d'une acquisition Private Equity** : sponsor agissant via
> BidCo/NewCo (LBO / MBO / build-up), jambe française (BidCo FR, cible FR, financement et closing
> régis par droit français). La doctrine est **side-aware** — centrée **sponsor (acquéreur)** ;
> side cédant ouvert mais secondaire.

> **Socle partagé — non redupliqué ici.** Gate France/Lux, glossaire PE FR praticien (~100 termes :
> sources & uses, funds flow, ECL/DCL, certain funds, equity ticket, escrow/holdback, closing bible,
> rollover, accession deed…) et anti-fabrication PE (requalif fiscale/sociale nommée/renvoyée ;
> no quantum ; assistance financière / léonine / gestion de fait en `[review]` ; instruments
> renvoyés ; dates relatives ; articles non vérifiés `[à vérifier]` ; docs Lux hors périmètre) :
> voir `references/pe-overlay-fr.md` — **non redupliqués ici**.
```

- [ ] **Step 2 : Ajouter le bloc « Signaux de détection »**

```markdown
---

## Signaux de détection (pour la proposition auto, hors flag)

Mention de *funds flow* / *sources & uses* / *equity bridge* ; *ECL* / *DCL* / *certain funds* ;
*BidCo* / *NewCo* / *HoldCo* / *TopCo* ; *debt push-down* / *upstream guarantee* / *nantissement
de comptes-titres* ; *rollover* / *reinvest* / *accession deed* ; *escrow* / *holdback* /
*closing bible* ; *security package* / *intercreditor*.

Un seul signal sérieux suffit à **proposer** l'overlay.

---
```

- [ ] **Step 3 : Rédiger les 5 axes L1–L5**

Pour chaque axe, reproduire la charpente de `pe-spa-gap-overlay-fr.md` (titre `## Axe Lx — …`, sous-titres `### Ce que la checklist standard couvre déjà` puis `### Ce que l'overlay PE ajoute`). Contenu doctrinal : copier fidèlement la colonne « Overlay PE ajoute » du tableau §3 de la spec, développée en prose + bullets. Exigences par axe :

- **`## Axe L1 — Funds flow / sources & uses`** : tableau **sources** (equity sponsor/ECL, rollover managers, dette senior/DCL, mezzanine/unitranche, vendor loan, cash on balance sheet) ↔ **uses** (prix d'acquisition SPA, refinancement dette existante cible, frais de transaction + prime W&I, frais de mise en place dette, escrow/holdback, BFR day-1). Insister sur la **réconciliation parfaite** (Σsources = Σuses ; prix SPA = ligne use ; cohérence ECL/DCL/reinvest — aboutissement du renvoi spa S5). Décrire le **waterfall des virements day-1** (ordre des flux, comptes émetteurs/récepteurs, timing intraday). Clôturer par une note bloc-citation :
  ```markdown
  > **Ne pas chiffrer** le funds flow : produire la **structure** du tableau (lignes), montants en
  > `[à compléter]`. Semaines relatives pour tout délai.
  ```
- **`## Axe L2 — CP financement & certain funds`** : angle **séquençage closing** (ce que `spa-review --pe` S2 lit dans le SPA, L2 le séquence pour le jour J) : conditions de mise à disposition DCL, apport ECL, certain funds, MAC bancaire, **alignement parfait CP du SPA ↔ conditions de financement** (désalignement = risque d'exécution `[review]`). Renvoyer explicitement à `spa-review --pe` (Axe S2) sans rejouer son analyse.
- **`## Axe L3 — Mécanique de closing LBO (day-1)`** : chorégraphie multi-étages : capitalisation BidCo → tirage dette → paiement vendeurs (L1) → **rollover** (apport en nature *share-for-share* via commissaire aux apports `[à vérifier]` *ou* cash-out puis reinvest) → refinancement + mainlevées concomitantes dette cible → mise en place security package (L4). Single-step vs split signing/closing (certain funds → souvent simultané).
- **`## Axe L4 — Security package & assistance financière`** (LE piège, inline `🔴` autorisé — cohérent avec le pattern des modules frères) : security package prêteurs (nantissement de comptes-titres BidCo + titres cible détenus par BidCo + créances intragroupe, le cas échéant sûretés sur actifs cible). Puis le piège phâre, libellé exact :
  ```markdown
  **🔴 Assistance financière — L.225-216 C.com. `[à vérifier]`.** Une société ne peut avancer des
  fonds, consentir des prêts ni donner des sûretés en vue de la souscription ou de l'achat de ses
  propres titres par un tiers. Conséquence directe en LBO : la **cible ne peut pas garantir ni
  financer la dette d'acquisition** contractée par BidCo pour la racheter — ni sûretés sur ses
  actifs (upstream guarantee), ni mise de sa trésorerie au service de la dette d'acquisition. Le
  **debt push-down** et les **upstream guarantees** se heurtent à cette interdiction. Vérifier
  qu'aucune sûreté/garantie remontante de la cible ne sécurise la dette d'acquisition. Le risque
  est qualifié `[review]` ; **ne jamais valider un montage** ; renvoyer au montage fiscal/financier
  spécialisé.

  **Intérêt social / abus de biens sociaux.** Toute sûreté ou garantie remontante de la cible doit
  répondre à un intérêt social propre `[review]`.
  ```
- **`## Axe L5 — Adhésion rollover & post-closing PE`** : **accession deed** managers/fondateurs rollover signé au closing (cohérence `spa-review --pe` S4 / `pacte-associes-review --pe` P1, renvois). **Registre de mouvements de titres à deux niveaux** (BidCo : souscriptions equity sponsor + rollover ; cible : transfert à BidCo — **ne pas oublier BidCo**, art. L.228-1 C.com. déjà à l'index). Inscription des nantissements de comptes-titres (opposabilité, délais). **Closing bible PE**. Enregistrement de la cession + **régime fiscal d'apport du rollover** → `[à vérifier]`, renvoi expert / `hacienda-fiscal`.

- [ ] **Step 4 : Ajouter la lecture side-aware + Frontières propres + Renvois**

Imiter `pe-spa-gap-overlay-fr.md` (lignes 355–410). Tableau side-aware à 3 colonnes (`| Axe | Sponsor / acquéreur (imposer / structurer) | Cédant sponsor (protéger / limiter) |`) couvrant L1–L5. Puis `## Frontières propres` (cible cotée/AMF hors scope ; empilement `--distressed` ; docs fonds-only → `fonds-pe-fr-triage` à venir ; analyse pacte → `pacte-associes-review --pe` ; revue SPA/GAP → `spa-review --pe` / `gap-review --pe` ; instruments → `financement-startup` ; **assistance financière / debt push-down nommés et renvoyés, jamais validés** ; régime fiscal nommé et renvoyé). Puis `## Renvois` (liste de commandes `/h-da:…` frères).

- [ ] **Step 5 : Vérifier la structure du module (assertions)**

Run :
```bash
F=plugins/hacienda-droit-affaires/references/pe-closing-overlay-fr.md
grep -c "^## Axe L[1-5]" "$F"   # attendu : 5
grep -q "pe-overlay-fr.md" "$F" && echo "socle référencé OK"
grep -q "L.225-216" "$F" && echo "assistance financière OK"
grep -q "à compléter" "$F" && echo "anti-chiffrage funds flow OK"
grep -Eq "Ne pas chiffrer|no quantum|à compléter" "$F" && echo "anti-fabrication OK"
! grep -qiE "glossaire PE FR praticien\b.*\|" "$F" && echo "glossaire non redupliqué OK"
```
Expected : `5`, puis chaque ligne OK. Si le glossaire complet (table ~100 lignes) a été recopié → le retirer (le socle ne doit pas être redupliqué).

- [ ] **Step 6 : Commit**

```bash
git add plugins/hacienda-droit-affaires/references/pe-closing-overlay-fr.md
git commit -m "feat(da): module frere pe-closing-overlay-fr (axes L1-L5, side sponsor)"
```

---

### Task 3 : Wiring de `closing-checklist-fr/SKILL.md` (flag, Étape PE, Volet 5)

**Files:**
- Modify: `plugins/hacienda-droit-affaires/skills/closing-checklist-fr/SKILL.md`

**Interfaces:**
- Consumes : `references/pe-closing-overlay-fr.md` (Task 2), chargé seulement si `--pe`.
- Produces : mode `--pe --side=sponsor|cedant` opérationnel ; Étape PE conditionnelle ; Volet 5 funds flow au livrable.

- [ ] **Step 1 : Frontmatter — version + description + tags + argument-hint**

Dans le bloc YAML (lignes 2–11), passer `version: "2.0.0"` → `version: "2.1.0"`, ajouter à la fin de `description` une phrase : « Mode `--pe` : lentille closing LBO (funds flow / sources & uses, mécanique day-1, assistance financière). » ; ajouter `pe`, `lbo`, `funds-flow` à `tags` ; compléter `argument-hint` avec `[--pe --side=sponsor|cedant]`.

- [ ] **Step 2 : Intake — déclarer le flag `--pe` + le side PE**

Après l'item 4 de la section `## Intake` (ligne 101), insérer un paragraphe (mirroir de l'item « Mode » de spa-review) :

```markdown
**Mode `--pe` (overlay Private Equity, side sponsor).** Charge `references/pe-closing-overlay-fr.md`.
En mode `--pe`, `--side` bascule sur `--side=sponsor` (défaut, ≡ acquéreur) | `--side=cedant`
(≡ cédant sponsor). Hors `--pe`, si des **signaux PE** sont détectés (sponsor / BidCo / funds flow /
sources & uses / ECL / DCL / certain funds / rollover / accession deed / debt push-down), **proposer**
l'overlay sans l'imposer (un seul signal sérieux suffit). L'overlay couvre la **jambe française** ;
docs / entité fonds luxembourgeois → STOP overlay, renvoi conseil luxembourgeois (gate France/Lux,
cf. module partagé).
```

- [ ] **Step 3 : Insérer « Étape PE » avant l'Étape 5**

Juste avant `## Étape 5 — Post-flight` (ligne 356), insérer une nouvelle étape conditionnelle (mirroir de l'« Étape 9ter » de spa-review). Contenu :

```markdown
## Étape PE — Overlay closing LBO (si `--pe` ou overlay accepté)

Ne s'exécute qu'avec `--pe` (flag) ou après acceptation d'une auto-proposition. Charger
`references/pe-closing-overlay-fr.md` et appliquer les 5 axes, side `sponsor` (défaut) ou `cedant` :

1. **L1 — Funds flow / sources & uses** : produire le **tableau sources & uses** (Volet 5) ;
   réconciliation Σsources = Σuses, cohérence avec le prix SPA et les montants ECL/DCL ; waterfall
   des virements day-1. **Ne pas chiffrer** — structure et lignes, montants en `[à compléter]`.
2. **L2 — CP financement & certain funds** : séquencer les conditions DCL/ECL et le certain funds
   pour le jour J ; signaler tout désalignement CP du SPA ↔ conditions de financement (→ Volet 1).
3. **L3 — Mécanique de closing LBO** : chorégraphie day-1 (capitalisation BidCo → tirage dette →
   paiement vendeurs → rollover → refinancement/mainlevées → security package) (→ Volet 2).
4. **L4 — Security package & assistance financière** : 🔴 vérifier qu'aucune sûreté/garantie
   remontante de la cible ne sécurise la dette d'acquisition (**assistance financière L.225-216
   C.com. `[à vérifier]`**) ; qualifier le risque `[review]`, **ne jamais valider un montage**,
   renvoyer au montage fiscal/financier (→ Volets 2/3 + findings).
5. **L5 — Adhésion rollover & post-closing PE** : accession deed au closing ; **registre de
   mouvements de titres aux deux niveaux (BidCo + cible)** ; inscription des nantissements ; closing
   bible PE ; régime fiscal d'apport rollover → `[à vérifier]`, renvoi expert (→ Volet 4).

**Gate France/Lux** (module partagé) : entité/docs fonds Lux → STOP overlay, renvoi conseil
luxembourgeois ; l'overlay couvre la jambe FR. Sortir les findings PE dans les volets existants
(sévérité 🟢🟡🟠🔴) + le **Volet 5 funds flow**. **Ne pas chiffrer** le funds flow (`[à compléter]`) ;
**ne pas valider** l'assistance financière (`[review]`, renvoi) ; **ne pas dater** le closing
(semaines relatives). Si la cible est aussi en difficulté, **les overlays `--pe` et `--distressed`
s'empilent** sans se dupliquer.

---
```

- [ ] **Step 4 : Insérer « Volet 5 » avant la question hors checklist**

Dans le bloc « Format livrable », juste avant `# Une question hors de ma checklist habituelle`
(ligne 393), insérer :

```markdown
## Volet 5 — Funds flow / sources & uses (si `--pe`)

Réconciliation **sources & uses** au closing (structure ; **montants en `[à compléter]`, jamais chiffrés**).

| Sources | Montant | Uses | Montant |
|---|---|---|---|
| Equity sponsor (ECL) | [à compléter] | Prix d'acquisition (SPA) | [à compléter] |
| Rollover managers (reinvest) | [à compléter] | Refinancement dette existante cible | [à compléter] |
| Dette senior (DCL) | [à compléter] | Frais de transaction + prime W&I | [à compléter] |
| Mezzanine / unitranche / vendor loan | [à compléter] | Frais de mise en place de la dette | [à compléter] |
| Cash on balance sheet | [à compléter] | Escrow / holdback + BFR day-1 | [à compléter] |
| **Σ sources** | [à compléter] | **Σ uses** | [à compléter] |

Réconciliation : Σsources = Σuses ; le prix SPA figure en use ; cohérence ECL/DCL/reinvest.
Toute incohérence est un point 🟠/🔴. Waterfall des virements day-1 rendu en tableau (étape / flux /
compte émetteur → récepteur / moment), avec la ligne 🔴 **assistance financière** si une sûreté/garantie
remontante de la cible sécurise la dette d'acquisition (L.225-216 C.com. `[à vérifier]`, `[review]`).

```

- [ ] **Step 5 : Compléter le Gate non-juriste (items conditionnels `--pe`)**

À la fin de la checklist `## Gate non-juriste` (avant ligne 165), ajouter :

```markdown
- [ ] Si `--pe` : module `references/pe-closing-overlay-fr.md` chargé, side `sponsor`/`cedant` posé, gate France/Lux respecté
- [ ] Si `--pe` : Volet 5 funds flow / sources & uses produit (structure ; montants `[à compléter]`, aucun chiffre fabriqué)
- [ ] Si `--pe` : assistance financière (L.225-216 C.com.) vérifiée — aucune sûreté/garantie remontante de la cible validée ; risque qualifié `[review]` et renvoyé
- [ ] Si `--pe` : registre de mouvements de titres aux deux niveaux (BidCo + cible) ; accession deed rollover présent
```

- [ ] **Step 6 : Ajouter l'exemple `--pe` + les bullets « Ce skill ne fait pas » + la note de Ton**

Dans `## Examples` (après l'exemple de la ligne 67), ajouter un `<example>` :
```markdown
<example>
<user>/h-droit-affaires:closing-checklist-fr --type=cession-titres --forme=SAS --pe --side=sponsor</user>
<response>
Mode PE (side sponsor). Outre les 4 volets standard, l'Étape PE applique L1–L5 : Volet 5 funds flow /
sources & uses (structure, montants `[à compléter]`), séquençage CP financement (DCL/ECL/certain funds),
chorégraphie day-1 (capitalisation BidCo → tirage dette → paiement vendeurs → rollover →
refinancement/mainlevées → security package), et 🔴 contrôle assistance financière (L.225-216 C.com.
`[à vérifier]` : la cible ne peut pas garantir la dette d'acquisition — `[review]`, renvoi montage).
Registre de mouvements de titres aux deux niveaux (BidCo + cible) + accession deed rollover au closing.
Gate France/Lux : docs fonds Lux hors périmètre.
</response>
</example>
```

Dans `## Ce skill ne fait pas` (ligne 425), ajouter les bullets de la spec §7 :
```markdown
- En mode `--pe` : ne **chiffre pas** le funds flow (structure du tableau sources & uses ; montants `[à compléter]`).
- En mode `--pe` : ne **valide pas** un montage d'**assistance financière / debt push-down / upstream guarantee** (L.225-216 C.com.) — risque nommé, qualifié `[review]`, renvoyé.
- En mode `--pe` : pas d'avis fiscal (régime d'apport du rollover, intégration fiscale LBO, droits d'enregistrement) → `[à vérifier]`, renvoi expert / `hacienda-fiscal`.
- En mode `--pe` : ne structure pas les instruments du management package (BSA/BSPCE/ADP/AGA/OC) → `financement-startup`.
- En mode `--pe` : ne couvre pas les documents luxembourgeois (gate France/Lux).
```

Dans `## Ton` (ligne 438), ajouter une phrase finale : « En mode `--pe`, le funds flow / sources & uses est l'artefact central (structure, jamais les montants), et l'assistance financière (L.225-216 C.com.) est le piège closing LBO à signaler sans jamais valider de montage. »

- [ ] **Step 7 : Vérifier le wiring (assertions + non-régression)**

Run :
```bash
F=plugins/hacienda-droit-affaires/skills/closing-checklist-fr/SKILL.md
grep -q 'version: "2.1.0"' "$F" && echo "version OK"
grep -q "## Étape PE — Overlay closing LBO" "$F" && echo "Étape PE OK"
grep -q "## Volet 5 — Funds flow" "$F" && echo "Volet 5 OK"
grep -q "pe-closing-overlay-fr.md" "$F" && echo "module référencé OK"
grep -q "L.225-216" "$F" && echo "assistance financière OK"
grep -c "si \`--pe\`\|si .--pe." "$F"   # plusieurs blocs gardés par --pe
# non-régression : les 5 étapes + 4 volets standard intacts
grep -c "^## Étape [1-5]" "$F"          # attendu : 5 (Étapes 1-5 standard)
grep -c "^## Volet [1-4]" "$F"          # attendu : 4 (Volets 1-4 standard)
```
Expected : chaque `echo` OK ; 5 étapes standard + 4 volets standard intacts.

- [ ] **Step 8 : Commit**

```bash
git add plugins/hacienda-droit-affaires/skills/closing-checklist-fr/SKILL.md
git commit -m "feat(da): wiring closing-checklist-fr --pe (Étape PE + Volet 5 funds flow, v2.1.0)"
```

---

### Task 4 : Aligner les forward-refs des modes frères (`--pe-funds-flow` → `--pe`)

**Files:**
- Modify: `plugins/hacienda-droit-affaires/references/pe-spa-gap-overlay-fr.md` (3 occurrences)
- Modify: `plugins/hacienda-droit-affaires/skills/spa-review/SKILL.md` (2 occurrences)

**Interfaces:**
- Consumes : le mode `--pe` désormais livré (Task 3).
- Produces : un seul modèle mental `--pe` sur les 4 modes ; plus de mention « à venir » du closing.

- [ ] **Step 1 : Enumérer les occurrences**

Run :
```bash
grep -rniE "pe-funds-flow|closing-checklist-fr.{0,40}(à venir|venir)" plugins/hacienda-droit-affaires --include=*.md
```
Expected : 5 lignes (3 dans `pe-spa-gap-overlay-fr.md`, 2 dans `spa-review/SKILL.md`).

- [ ] **Step 2 : Éditer `pe-spa-gap-overlay-fr.md`**

- Ligne ~233 : `…relève de \`/h-da:closing-checklist-fr --pe-funds-flow\` (à venir).` → `…relève de \`/h-da:closing-checklist-fr --pe\`.`
- Ligne ~394 : `- **Funds flow détaillé au closing** → \`/h-da:closing-checklist-fr --pe-funds-flow\`` → `- **Funds flow détaillé au closing** → \`/h-da:closing-checklist-fr --pe\``
- Ligne ~405 : `- Funds flow / sources & uses au closing : \`/h-da:closing-checklist-fr\` (à venir).` → `- Funds flow / sources & uses au closing : \`/h-da:closing-checklist-fr --pe\`.`

- [ ] **Step 3 : Éditer `spa-review/SKILL.md`**

- Ligne ~358 : `…funds flow → \`/h-da:closing-checklist-fr\` (à venir).` → `…funds flow → \`/h-da:closing-checklist-fr --pe\`.`
- Ligne ~417 : `… / closing-checklist-fr (à venir)}` → `… / closing-checklist-fr --pe}`

- [ ] **Step 4 : Vérifier qu'il ne reste aucune occurrence**

Run :
```bash
grep -rniE "pe-funds-flow|closing-checklist-fr.{0,40}(à venir|venir)" plugins/hacienda-droit-affaires --include=*.md
```
Expected : aucune ligne.

- [ ] **Step 5 : Commit**

```bash
git add plugins/hacienda-droit-affaires/references/pe-spa-gap-overlay-fr.md plugins/hacienda-droit-affaires/skills/spa-review/SKILL.md
git commit -m "refactor(da): aligner forward-refs closing sur --pe (etait --pe-funds-flow)"
```

---

### Task 5 : Intendance release (versions, CHANGELOG, README) + vérification build

**Files:**
- Modify: `plugins/hacienda-droit-affaires/version.json`
- Modify: `plugins/hacienda-droit-affaires/mcp-server/package.json`
- Modify: `plugins/hacienda-droit-affaires/.claude-plugin/plugin.json`
- Modify: `plugins/hacienda-droit-affaires/CHANGELOG.md`
- Modify: `plugins/hacienda-droit-affaires/README.md`

**Interfaces:**
- Consumes : le mode livré (Tasks 2–4).
- Produces : version `0.18.0` cohérente sur les 3 fichiers verrouillés + CHANGELOG + README.

- [ ] **Step 1 : Bumper les 3 fichiers de version (lock 3-way)**

Dans chacun, `0.17.0` → `0.18.0` :
- `version.json` : `"version": "0.18.0"`
- `mcp-server/package.json` : `"version": "0.18.0"`
- `.claude-plugin/plugin.json` : `"version": "0.18.0"`

- [ ] **Step 2 : Entrée CHANGELOG**

En tête de `CHANGELOG.md`, ajouter une section (même format que `## 0.17.0`) :

```markdown
## 0.18.0

### Ajouté
- Mode `closing-checklist-fr --pe` (lentille closing LBO, side sponsor) : axes L1–L5
  (funds flow / sources & uses, CP financement & certain funds, mécanique de closing day-1,
  security package & **assistance financière L.225-216 C.com.**, adhésion rollover & post-closing PE).
  4ᵉ mode de la vague Private Equity ; module frère partagé `references/pe-closing-overlay-fr.md`.
- Article `L.225-216 C.com.` (assistance financière) ajouté à l'index.

### Modifié
- Forward-refs des modes `spa-review --pe` / `gap-review --pe` alignés `--pe-funds-flow` → `--pe`.
- `closing-checklist-fr` 2.0.0 → 2.1.0 (mode ajouté ; closing standard inchangé).
```

- [ ] **Step 3 : Mention README**

Dans `README.md`, là où les modes PE des autres skills sont listés (chercher `--pe`), ajouter `closing-checklist-fr --pe` à la liste des modes Private Equity disponibles.

Run d'aide au repérage : `grep -n "\-\-pe\|Private Equity\|closing-checklist" plugins/hacienda-droit-affaires/README.md`

- [ ] **Step 4 : Vérification build complète**

Run (depuis la racine du repo) :
```bash
npm test && npm run typecheck && npm run build && npm run branding:check && git diff --check
```
Expected : tests verts (≈309 ✓, skips eurlex-live tolérés), typecheck/build/branding OK, `git diff --check` silencieux (pas d'espaces en fin de ligne). Vérifier aussi : `grep -rl '"version"' plugins/hacienda-droit-affaires/{version.json,mcp-server/package.json,.claude-plugin/plugin.json} | xargs grep '0.18.0'` → 3 hits, et compte de skills = 31 (inchangé).

- [ ] **Step 5 : Commit**

```bash
git add plugins/hacienda-droit-affaires/version.json plugins/hacienda-droit-affaires/mcp-server/package.json plugins/hacienda-droit-affaires/.claude-plugin/plugin.json plugins/hacienda-droit-affaires/CHANGELOG.md plugins/hacienda-droit-affaires/README.md
git commit -m "release(da): v0.18.0 — mode closing-checklist-fr --pe"
```

---

### Task 6 : Scaffolding de scoring (wrapper + dataset)

**Files:**
- Modify: `scripts/da-scoring.sh` (ENTRIES + 4 fonctions `case`)
- Create: `plugins/hacienda-droit-affaires/tests/datasets/da-closing-pe/scenario.md`
- Create: (Phases ultérieures, par Candy) `ground-truth.md`, `live-output.md`, `verdicts-CLOPE1.json`

**Interfaces:**
- Consumes : le mode livré (Tasks 2–5).
- Produces : entrée `closing-pe` (code `CLOPE1`) pilotable par `bash scripts/da-scoring.sh <phase> closing-pe`. **Les phases 1–4 sont lancées par Candy** (token economy — cf. workflow scoring).

- [ ] **Step 1 : Ajouter `closing-pe` à la liste ENTRIES + au `usage()`**

Dans `scripts/da-scoring.sh`, ajouter `  closing-pe` à la liste `ENTRIES` (après `pacte-associes-pe`, ligne ~61) **et** à la liste `Skills:` du bloc `usage()`.

- [ ] **Step 2 : Renseigner les 4 fonctions `case`**

- `code_for` (après ligne 85) : `    closing-pe) echo "CLOPE1" ;;`
- `axes_for` (après la ligne `pacte-associes-pe`) :
  ```
      closing-pe) echo "closing d'une acquisition LBO sur SAS (BidCo FR -> cible FR) avec le mode --pe actif, side sponsor ; doit appliquer l'overlay sur 5 axes (L1 funds flow / sources & uses, L2 CP financement & certain funds, L3 mecanique de closing day-1, L4 security package & assistance financiere, L5 adhesion rollover & post-closing PE) ; (L1) tableau sources & uses dont une ligne ne reconcilie pas (prix SPA != ligne use, ou Somme sources != Somme uses) -> FAIL si l'incoherence n'est pas detectee ; structure a produire, montants a NE PAS chiffrer (a completer) ; (L4 piege phare) la cible donne une surete/garantie remontante au service de la dette d'acquisition de BidCo -> assistance financiere L.225-216 C.com. : FAIL si le risque n'est pas signale ; qualifier review, NE JAMAIS valider le montage ; (gate) document/entite de fonds soumis au droit luxembourgeois -> FAIL si analyse sous droit francais ; PASS = identifie la loi etrangere et renvoie conseil luxembourgeois ; gate non affirmatif-orphelin ; (L5) registre de mouvements de titres au niveau BidCo (holding) oublie -> FAIL ; (L2) desalignement CP du SPA vs conditions DCL/ECL non signale -> FAIL ; faits en semaines relatives, aucune date calendaire, aucun conseil fiscal final, aucun quantum" ;;
  ```
- `desc_for` (après la ligne `pacte-associes-pe`) :
  ```
      closing-pe) echo "Pilotage du closing d'une acquisition LBO avec le mode --pe : applique l'overlay Private Equity sur 5 axes (L1 funds flow/sources & uses, L2 CP financement & certain funds, L3 mecanique de closing day-1, L4 security package & assistance financiere, L5 adhesion rollover & post-closing PE). Side sponsor. Produit la structure du funds flow (jamais les montants), signale l'assistance financiere L.225-216 C.com. (la cible ne peut pas garantir la dette d'acquisition) sans valider de montage, et le registre de mouvements de titres aux deux niveaux (BidCo + cible). Detecte les documents de fonds soumis a un droit etranger et renvoie au conseil local. Ne chiffre aucun montant ni quantum fiscal, ne valide pas le montage d'assistance financiere, ne donne pas d'avis fiscal. Brouillon soumis a validation avocat M&A/PE. NE PAS supposer le contenu du SKILL.md ni du module de reference." ;;
  ```
- `command_for` (après la ligne `pacte-associes-pe`) : `    closing-pe) echo "/h-da:closing-checklist-fr --pe --side=sponsor" ;;`

- [ ] **Step 3 : Vérifier le wrapper**

Run :
```bash
bash scripts/da-scoring.sh list | grep closing-pe && echo "ENTRY OK"
CODE= bash -c 'source scripts/da-scoring.sh 2>/dev/null; true'  # sanity : pas d'erreur de syntaxe
bash -n scripts/da-scoring.sh && echo "syntaxe shell OK"
```
Expected : `closing-pe` listé, `syntaxe shell OK`.

- [ ] **Step 4 : Créer le scénario fictif (Phase 1)**

Créer `plugins/hacienda-droit-affaires/tests/datasets/da-closing-pe/scenario.md` : un scénario **fictif** de closing LBO (BidCo FR rachète une SAS cible FR), structuré comme `da-spa-review-pe/scenario.md` (le lire pour le format). Doit planter les 5 pièges du `axes_for` : (L1) une ligne de funds flow qui ne réconcilie pas ; (L4) une upstream guarantee de la cible sécurisant la dette d'acquisition ; (gate) un document de fonds luxembourgeois ; (L5) un closing qui oublie le registre BidCo ; (L2) un désalignement CP SPA/DCL. **Données fictives, aucune PII réelle, montants laissés à compléter ou clairement fictifs, faits en semaines relatives.**

> Phases 2 (ground-truth), 3 (live) et 4 (scoring) : lancées par Candy via le wrapper (`bash scripts/da-scoring.sh phase2 closing-pe`, etc.). Le plan s'arrête à la livraison du scénario + du scaffolding.

- [ ] **Step 5 : Commit**

```bash
git add scripts/da-scoring.sh plugins/hacienda-droit-affaires/tests/datasets/da-closing-pe/scenario.md
git commit -m "test(da): scaffolding scoring closing-pe (wrapper CLOPE1 + scenario fictif)"
```

---

## Notes d'exécution

- **Ordre** : Task 1 (citations) avant Task 2 (le module cite L.225-216). Tasks 2→3→4→5→6 séquentiels. Task 5 (build) ne peut passer qu'après 2–4.
- **Revue inter-tâches** : ce plan suit le pattern des 3 modes PE précédents (subagent-driven Sonnet + revue Opus whole-branch). Une revue Opus whole-branch est recommandée avant la décision merge/PR.
- **Décision release** : barre = **gate-clean** au cycle `CLOPE1` (politique SPAPE assumée). Merge/PR = décision de Candy (les modes PE précédents n'ont pas été mergés d'office).
- **Scoring** : les commandes Phases 1–4 sont lancées par Candy (token economy).
