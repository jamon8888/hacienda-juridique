# Responsabilité du dirigeant — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter au plugin `hacienda-droit-affaires` le skill **doctrinal** `responsabilite-dirigeant` — côté dirigeant débiteur : évalue (qualifie, ne conclut pas) la responsabilité personnelle sur 4 axes (contribution à l'insuffisance d'actif L.651-2 + sous-cas L.652-1 / sanctions L.653-x / banqueroute L.654-1 *nommée* / cautions personnelles), tous stades de procédure, avec anti-fabrication verrouillé.

**Architecture :** Skill V2 conforme au squelette imposé par `hacienda-droit-affaires-cowork-structure.test.ts`. Approche **tout-en-un, triage interne** : intake commun (forme sociale + qualité dirigeant + stade procédure obligatoires) → évaluation parallèle des 4 axes (pas de skip silencieux) → synthèse en tête + détails par axe. Qualification 🟢🟡🟠🔴 + facteurs aggravants/atténuants, **jamais de quantum**, **jamais de mémoire en défense**. Skill **doctrinal** → validation par **scoring blind 4 phases** (exécuté par Candy), pas seulement par les tests structurels.

**Tech Stack :** Markdown (SKILL.md + wrapper), JSON (version/manifest), Vitest (test de structure existant), wrapper Bash `scripts/da-scoring.sh` pour le scoring blind. Pas de code TS nouveau.

**Référence design :** `docs/superpowers/specs/2026-06-24-hacienda-da-responsabilite-dirigeant-design.md`.
**Miroir de référence (build) :** `plugins/hacienda-droit-affaires/skills/declaration-cessation-paiements/SKILL.md`.

## Global Constraints

- Skill **name** : `responsabilite-dirigeant` (tranché, cf. design Q4). Substituer ce nom à l'identique dans : dossier `skills/<NOM>/SKILL.md`, frontmatter `name:`, wrapper `commands/h-da/<NOM>.md`, ligne « Use the `<NOM>` skill », README, CHANGELOG, dataset `tests/datasets/da-<NOM>/`, wrapper de scoring.
- Frontmatter `version: "2.0.0"` + `argument-hint:` (jamais `1.0.0`).
- Encodage **UTF-8, fins de ligne LF** (jamais CRLF) — le test rejette CRLF.
- Aucun préfixe périmé `/h-droit-affaires:`, `/hacienda-droit-affaires:`, `/hacienda-propriete-intellectuelle:` dans les fichiers livrés ; uniquement `/h-da:`.
- **Anti-fabrication G1-G5** (cf. design §7) : G1 dates en semaines relatives (jamais de date calendaire ni jours de retard précis) · G2 aucun chiffre de quantum (insuffisance/contribution) · G3 facteurs présentés en indices, jamais « faute caractérisée » · G4 banqueroute nommée jamais qualifiée · G5 cautions = distinguer sort dans la procédure vs recours hors procédure, jamais « caution éteinte » sans pièces.
- **Banqueroute L.654-1 : nommée, jamais évaluée** (renvoi pénaliste), parallèle à la posture DCP qui nomme L.651-2.
- Count `skillFiles.length` : **28 → 29**.
- Version plugin : **0.11.0 → 0.12.0**.

---

## File Structure

**Créer :**
- `plugins/hacienda-droit-affaires/skills/responsabilite-dirigeant/SKILL.md` — le skill doctrinal (squelette V2).
- `plugins/hacienda-droit-affaires/commands/h-da/responsabilite-dirigeant.md` — wrapper jumeau.
- `plugins/hacienda-droit-affaires/tests/datasets/da-responsabilite-dirigeant/scenario.md` — input scoring Phase 1/2.

**Modifier :**
- `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts:222` — 28 → 29.
- `plugins/hacienda-droit-affaires/README.md` — tableau Commandes (ordre alpha) + Périmètre V2.
- `plugins/hacienda-droit-affaires/skills/declaration-cessation-paiements/SKILL.md` — 2 renvois « avocat » → `/h-da:responsabilite-dirigeant`.
- `plugins/hacienda-droit-affaires/skills/cas/SKILL.md` — 1 ligne dans la table de routage.
- Version (6 occurrences) : `version.json`, `manifest.json`, `mcp-server/package.json`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` (lignes 6 et 11).
- `plugins/hacienda-droit-affaires/CHANGELOG.md`.
- `scripts/da-scoring.sh` — enregistrer le skill (SKILLS array + 6 fonctions + usage).

---

## Contraintes imposées par le test (identiques aux cycles `cas` / DCP)

`packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts` impose à chaque skill :
- **Count** `skillFiles.length` (ligne 222) : 28 → **29**.
- Frontmatter `version: "2.0.0"` + `argument-hint:` ; pas de `1.0.0` ; pas de CRLF.
- **Wrapper jumeau** : `description` (via `description: >`) + `argument-hint` identiques au SKILL.md ; contient « Use the `responsabilite-dirigeant` skill » + `$ARGUMENTS` ; **sans** préfixe périmé.
- **README** contient `/h-da:responsabilite-dirigeant`.
- **Section MCP** : SKILL.md contient `## Outils MCP à privilégier` + les chaînes `piste_status`, `legifrance_recherche`, `judilibre_recherche`, `eurlex_recherche`.
- **Squelette V2 ordonné** : `## Examples` → `## Chargement du profil` → `## Intake` → `## Gate non-juriste` → (`## Mode Anno Desktop Optionnel` optionnel) → `## Outils MCP à privilégier` → `## Emplacement des sorties` → `## Sortie`.
- **Hygiène renvois** : aucun préfixe périmé dans les fichiers livrés.

---

## Task 0 : Branche

La branche `feat/da-responsabilite-dirigeant` est **déjà créée** (le design doc y est commité, commit `c480579`). Vérifier :

- [ ] **Step 1 : Confirmer la branche**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && git branch --show-current
```
Expected : `feat/da-responsabilite-dirigeant`.

---

## Task 1 : Faire échouer le count (RED)

**Files:** Modify `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts:222`

- [ ] **Step 1 : 28 → 29**

Remplacer `expect(skillFiles.length).toBe(28);` par `expect(skillFiles.length).toBe(29);`.

- [ ] **Step 2 : Vérifier l'échec**

```bash
cd /Users/candynguyen/dev/hacienda-juridique/packages/core && ./node_modules/.bin/vitest run test/hacienda-droit-affaires-cowork-structure.test.ts 2>&1 | tail -8
```
Expected : FAIL « expected 28 to be 29 » (le skill n'existe pas encore).

---

## Task 2 : Créer le SKILL.md (doctrinal)

**Files:** Create `plugins/hacienda-droit-affaires/skills/responsabilite-dirigeant/SKILL.md`

**Interfaces:**
- Produces : skill `responsabilite-dirigeant` invocable `/h-da:responsabilite-dirigeant` ; description + argument-hint réutilisés à l'identique par le wrapper (Task 3) et le wrapper de scoring (Task 9).

- [ ] **Step 1 : Écrire le SKILL.md** (UTF-8, **LF**, contenu exact ci-dessous)

````markdown
---
name: responsabilite-dirigeant
description: >
  Côté dirigeant débiteur : évalue (qualifie, ne conclut pas) la responsabilité
  personnelle du dirigeant d'une entreprise en procédure collective, sur quatre
  axes traités en un seul skill avec triage interne : contribution à
  l'insuffisance d'actif (art. L.651-2 C.com., et sous-cas obligation aux dettes
  sociales L.652-1), sanctions personnelles — interdiction de gérer (L.653-8) et
  faillite personnelle (L.653-3 s.), banqueroute (L.654-1, NOMMÉE et renvoyée au
  pénaliste — jamais évaluée), et cautions personnelles du dirigeant (sort dans
  la procédure L.622-28 / L.631-14 / L.626-11 / L.643-11 et recours créancier).
  Qualifie chaque axe sur l'échelle 🟢🟡🟠🔴 avec facteurs aggravants/atténuants ;
  tous stades couverts (pré-CdP imminente, RJ/LJ ouverte, action engagée).
  Ne chiffre JAMAIS l'insuffisance ni la contribution ; ne rédige PAS de mémoire
  en défense (renvoi avocat contentieuiste si action engagée) ; ne fabrique
  aucune date (semaines relatives). Évalue ce que `declaration-cessation-paiements`
  nomme. Brouillon, validation humaine (avocat) OBLIGATOIRE.
version: "2.0.0"
argument-hint: "[forme sociale, qualité du dirigeant (droit/fait), stade procédure (pré-CdP / RJ-LJ ouverte / action engagée), faits saillants ; côté dirigeant]"
authors: ["Hacienda"]
tags: [procedures-collectives, responsabilite-dirigeant, faute-de-gestion, l651-2, l653-8, comblement-passif, debiteur]
---

# Skill — Responsabilité du dirigeant (L.651-2 / L.653-x / banqueroute / cautions)

> **BROUILLON, validation humaine (avocat) OBLIGATOIRE.**
>
> Ce skill **qualifie** une exposition, il ne **conclut** pas. La caractérisation
> d'une faute de gestion, le quantum d'une contribution à l'insuffisance d'actif
> et le prononcé d'une sanction relèvent du **tribunal** ; la défense relève d'un
> **avocat contentieuiste**. Le skill présente des **facteurs** (aggravants /
> atténuants), jamais une conclusion de responsabilité.
>
> **Quatre axes, triage interne.** Le dirigeant pose une question unique (« je
> risque quoi personnellement ? ») ; le skill évalue **systématiquement** les
> quatre axes (aucun skip silencieux) et remonte la criticité maximale en tête.
>
> **Banqueroute (L.654-1) : nommée, jamais évaluée.** L'infraction pénale et son
> élément intentionnel relèvent d'un **pénaliste** — le skill liste les cas
> légaux applicables aux faits et renvoie, comme `declaration-cessation-paiements`
> nomme L.651-2 sans l'évaluer.
>
> **Anti-fabrication strict.** Aucune date calendaire (semaines relatives), aucun
> chiffre d'insuffisance ou de contribution, aucune qualification de fait
> présentée comme acquise. `[à compléter]` et `[review]` partout où la donnée ou
> le jugement n'est pas établi.

---

## Examples

<example>
<user>/h-da:responsabilite-dirigeant — SAS en RJ ouverte (~3 mois), dépôt de bilan tardif d'environ 10 semaines, comptabilité tenue à jour, président de droit, caution bancaire perso</user>
<response>
1. Pré-flight `check-pii` (dénomination + dirigeant + montants → seuil B fréquent).
2. Intake complet : forme SAS, qualité = dirigeant **de droit**, stade = **RJ ouverte**. Faits en semaines relatives (« ~10 semaines de retard », jamais de date calendaire).
3. **Synthèse en tête** : criticité max 🟠 (axe L.651-2, retard DCP) ; axes L.651-2 🟠 · L.653-8 🟡 · banqueroute 🟢 (nommée) · cautions 🟠.
4. **Axe 1 — L.651-2** : retard de déclaration = faute de gestion *possible* `[review]` (indice, pas conclusion) ; insuffisance d'actif **non chiffrée** (réclamer l'état du passif) ; comptabilité à jour = facteur **atténuant** ; aucune conciliation = facteur aggravant. Lien de causalité à établir.
5. **Axe 2 — L.653-8** : le retard DCP figure parmi les cas d'interdiction de gérer ; 🟡 conditionnel `[review]`.
6. **Axe 3 — banqueroute** : aucun signal de détournement/comptabilité fictive → nommée, rien à signaler, renvoi pénaliste si éléments apparaissent. Pas de note 🟢🟡🟠🔴 (non évaluée).
7. **Axe 4 — cautions** : la caution bancaire perso est **suspendue pendant l'observation** (L.631-14) mais **survit** ; recours possible du prêteur. Ne pas conclure « caution éteinte ». 🟠 `[review]`.
8. Sortie : synthèse + 4 axes + question hors-checklist + arbre 5 options. Action engagée ? non → recommander de documenter la chronologie.
</response>
</example>

<example>
<user>/h-da:responsabilite-dirigeant — SARL en LJ, le dirigeant a tout fait correctement mais a perdu son client unique (~70 % du CA), gérant de droit, pas de caution</user>
<response>
Synthèse : criticité max 🟢 — la défaillance paraît d'origine **externe**, pas une faute de gestion.
Axe 1 — L.651-2 : la perte d'un client majeur n'est pas en soi une faute de gestion ; une **simple négligence** est expressément exclue (L.651-2 al. 2) `[review]`. Réclamer l'état du passif si une insuffisance est invoquée, mais **ne pas chiffrer**. 🟢.
Axe 2 — L.653-x : aucun cas apparent (pas de retard DCP signalé, pas de fraude). 🟢.
Axe 3 — banqueroute : aucun signal. Nommée, RAS.
Axe 4 — cautions : aucune caution déclarée → axe sans objet, le dire (pas de skip silencieux).
Mention : un dirigeant peut être 🟢 sur tous les axes ; ne pas fabriquer un risque pour « remplir ».
</response>
</example>

<example>
<user>/h-da:responsabilite-dirigeant — action L.651-2 du liquidateur reçue (assignation), SAS en LJ, comptes courants d'associé débiteurs importants, locaux partagés avec une autre société du dirigeant</user>
<response>
**Action engagée** → en tête : « Avocat **contentieuiste** recommandé — ce skill qualifie, il ne rédige pas le mémoire en défense. »
Axe 1 — L.651-2 (+ **sous-cas L.652-1**) : comptes courants débiteurs massifs + locaux confondus = signaux de **confusion de patrimoine** → qualifier L.652-1 séparément `[review]` (obligation aux dettes sociales, régime distinct). Insuffisance **non chiffrée**.
Axe 2 — L.653-x : confusion de patrimoine figure parmi les cas de faillite personnelle (L.653-4/5) ; 🟠 conditionnel `[review]`.
Axe 3 — banqueroute : la confusion de patrimoine **peut** recouvrir un détournement d'actif (L.654-1) — **nommer**, ne pas qualifier l'intention, **renvoi pénaliste**.
Axe 4 — cautions : selon dossier.
Ne pas esquisser la stratégie de défense ni le quantum : qualification + renvoi contentieuiste.
</response>
</example>

---

## Chargement du profil

> Lire `~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/CLAUDE.md`, bloc procédures collectives :
> - **Position** — créancier / débiteur / mandataire / mixte (oriente le ton : ici, côté dirigeant débiteur)
> - **Tribunaux habituels** — repérage du greffe / juridiction
> - **Rôle utilisateur** — avocat inscrit / juriste in-house / non-juriste (en-tête de confidentialité)
> - **Matrice d'approbateurs** — pour l'option « Escalader » (contentieuiste / pénaliste si banqueroute en jeu)
> - **Politique PII** — `passive` / `active` (défaut) / `strict` + seuil B

Si le bloc est `[A CONFIGURER]` : stopper et demander `/h-da:entretien-demarrage`.

---

## Intake

1. **Forme sociale + qualité du dirigeant** — SAS, SARL, SA… ET dirigeant **de droit** (gérant, président, DG) **ou de fait** (**obligatoire**). La qualification de dirigeant **de fait** est elle-même contestable → `[review]` si retenue.
2. **Stade de procédure** (**obligatoire**) — pré-CdP imminente (dépôt envisagé) / RJ ou LJ ouverte (préciser depuis combien de **semaines/mois**, jamais de date) / action L.651-2 ou L.653-8 engagée ou annoncée.
3. **Faits chronologiques** — en **semaines relatives** (« ~10 semaines », « ~8 mois »). Ne **jamais** demander ni produire de date calendaire.
4. **Données pertinentes** (optionnel, `[à compléter]` sinon) — conciliation/mandat ad hoc demandé ? comptabilité tenue ? comptes courants d'associé débiteurs ? confusion de patrimoine (locaux/personnel/flux) ? cautions personnelles données (banque, bailleur, fournisseur) ? prélèvements/rémunération récents ?
5. **Si action engagée** — assignation/convocation reçue, axe visé, demandeur (liquidateur / ministère public / créancier).

**Routage à l'intake :**
- **Pré-CdP serein** (pas de procédure annoncée, pas de dépôt imminent) → renvoi `/h-da:prevention-difficultes` ; C n'apporte rien hors funnel procédure.
- **Pré-CdP avec dépôt imminent** → C s'applique (anticipation expo perso) ; recommander en sortie de déposer la DCP (`/h-da:declaration-cessation-paiements`) et, si la fenêtre reste ouverte, une conciliation L.611-4 (neutralise le délai 45 j → atténue le reproche de retard).

Si forme sociale, qualité du dirigeant ou stade absents : stopper et demander. Pas de valeur par défaut.

---

## Gate non-juriste

- [ ] Forme sociale + qualité du dirigeant + stade de procédure fournis (refus du défaut)
- [ ] Pré-flight `check-pii` exécuté et décision utilisateur respectée
- [ ] Profil cabinet bloc procédures collectives lu ; rôle utilisateur (en-tête) et matrice d'approbateurs identifiés
- [ ] **Qualité dirigeant** explicite (droit / fait) ; si « fait » : qualification taguée `[review]` (elle-même contestable)
- [ ] **Les 4 axes sont évalués** — aucun skip silencieux ; un axe sans signal est explicitement marqué (« 🟢 — aucun signal sur ce stade » ou « sans objet »), jamais omis
- [ ] **Banqueroute (axe 3) NOMMÉE, jamais évaluée** : cas légaux listés + renvoi pénaliste ; pas de note 🟢🟡🟠🔴, pas de qualification d'intention (dol/détournement/dissimulation)
- [ ] **G1 — dates** : semaines relatives uniquement ; aucune date calendaire ; aucun nombre de jours de retard précis ; le 1er impayé est un indice, pas la date
- [ ] **G2 — quantum** : aucun chiffre d'insuffisance d'actif ni de contribution ; réclamer un état du passif si des chiffres sont demandés ; `[à compléter]`
- [ ] **G3 — qualification de fait** : facteurs aggravants/atténuants présentés en **indices** ; jamais « faute caractérisée » / « manifestement » ; conclusion réservée au tribunal `[review]`
- [ ] **G5 — cautions** : distinguer le **sort dans la procédure** (suspension L.622-28/L.631-14 ; arrêt définitif au plan L.626-11) du **recours créancier hors procédure** ; jamais « caution éteinte » sans acte + plan
- [ ] **Stade procédure** module les **recommandations finales** (documenter la chrono vs préparer la défense), pas la qualification
- [ ] **Action engagée** → renvoi avocat **contentieuiste** en tête du livrable, qualification quand même produite
- [ ] Aucune **fabrication** : ni date, ni chiffre, ni créancier, ni acte de caution non fourni — `[à compléter]` partout où la donnée manque
- [ ] Sortie : synthèse en tête + 4 axes détaillés + question hors-checklist + arbre 5 options ; en-tête de confidentialité selon rôle ; note du relecteur en bloc unique

---

## Mode Anno Desktop Optionnel

Pour reconstruire la chronologie (impayés, prises de décision, prélèvements, flux inter-sociétés), appeler `anno_health`, puis `detect`. Utiliser `legal_timeline`, `legal_validate_field` et `legal_search` sur corpus déjà ingéré. Les données financières et la comptabilité restent fournies/validées par le client ; rien n'est fabriqué.

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Droit des Affaires` est disponible. Ne pas inventer de tool hors périmètre ; si une source n'a pas été consultée directement, garder `[à vérifier]`.

- Socle sources officielles : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Identité entreprise (forme sociale, dirigeants, mandats) : `company_full_profile`, `bodacc_by_siren`.
- **`bodacc_procedures` autorisé** (≠ DCP qui était pré-procédure) : si la procédure est ouverte, l'annonce existe → confirme le stade et le mandataire désigné.
- Jurisprudence à privilégier : faute de gestion (L.651-2), interdiction de gérer (L.653-8), cautionnement personne physique du dirigeant.
- Tout résultat issu d'un corpus client ou d'un outil interne reste distingué des sources primaires officielles.

## Emplacement des sorties

```
outputs/responsabilite-dirigeant-<denomination-ou-siren>-<stade>.md
```
`<stade>` : `pre-cdp` / `rj` / `lj` / `action`. Format date des noms : `YYYY-MM-DD` si une date de génération est ajoutée.

---

## Sortie

Structurer la sortie avec : faits retenus, droit applicable par axe, qualification motivée, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

### Étape 1 — Pré-flight et cadrage

1. Invoquer `check-pii` (probabilité élevée seuil B : dirigeant + dénomination + faits financiers). Respecter la décision utilisateur.
2. Lire profil cabinet (bloc procédures collectives) et `~/.claude/plugins/config/hacienda-juridique/company-profile.md`.
3. Confirmer **qualité dirigeant** (droit/fait) et **stade procédure**. Router selon la section Intake si pré-CdP serein.

### Étape 2 — Évaluation des 4 axes (systématique, pas de skip silencieux)

**Axe 1 — Contribution à l'insuffisance d'actif (L.651-2) + sous-cas L.652-1.**
- Conditions cumulatives (L.651-2 `[Légifrance]`) : (a) RJ ou LJ ouverte (L.651-1) ; (b) insuffisance d'actif — **non chiffrée**, réclamer l'état du passif si demandé ; (c) faute de gestion ; (d) lien de causalité.
- Faute de gestion — **indices** (jamais conclusion) : retard DCP, poursuite d'activité déficitaire, prélèvements/rémunération anormaux, comptabilité défaillante, absence de réaction. Tague `[review]`.
- **Simple négligence exclue** (L.651-2 al. 2 `[Légifrance]`) : le rappeler comme facteur atténuant possible.
- Facteurs atténuants : conciliation L.611-4 demandée, chronologie documentée, expert-comptable consulté.
- **Sous-cas L.652-1** (obligation aux dettes sociales — confusion de patrimoine ou fictivité de la personne morale `[Légifrance]`) : régime distinct ; qualifier séparément `[review]` si signaux (comptes courants débiteurs massifs, locaux/flux confondus, absence de gouvernance) ; sinon, mentionner en risque dormant.
- Qualification : 🟢🟡🟠🔴 `[review]`.

**Axe 2 — Sanctions personnelles (L.653-x).**
- Interdiction de gérer (L.653-8 `[Légifrance]`) : cas limitatifs (omission/retard DCP, défaut de coopération, fraude…). Qualification + facteurs `[review]`.
- Faillite personnelle (L.653-3 à L.653-5 `[Légifrance]`) : cas plus graves (détournement d'actif, poursuite abusive d'exploitation déficitaire à des fins personnelles, comptabilité fictive/disparue). Qualification + facteurs `[review]`.
- Durée max **15 ans** (L.653-11 `[Légifrance]`).

**Axe 3 — Banqueroute (L.654-1) — NOMMÉE, pas évaluée.**
- Lister les **cas légaux** applicables aux faits (L.654-2 `[Légifrance]`) : achats en vue de revente au-dessous du cours / emploi de moyens ruineux pour se procurer des fonds ; détournement ou dissimulation d'actif ; augmentation frauduleuse du passif ; comptabilité fictive, disparue ou manifestement incomplète/irrégulière.
- **Ne pas qualifier l'élément intentionnel.** Si des signaux concrets existent → **renvoi pénaliste**.
- Sanctions max : **5 ans d'emprisonnement et 75 000 € d'amende** (L.654-3 `[Légifrance]`).
- Pas de note 🟢🟡🟠🔴 (axe non évalué).

**Axe 4 — Cautions personnelles du dirigeant.**
- Existence : acte de caution (étendue, durée, montant) — `[à compléter]` si non fourni.
- Sort **dans la procédure** :
  - Période d'observation : **suspension** des poursuites contre la caution personne physique (L.622-28 sauvegarde / L.631-14 RJ `[Légifrance]`).
  - Plan de continuation : **arrêt définitif** des poursuites contre la caution personne physique au titre des dettes couvertes par le plan (L.626-11 `[Légifrance]`) — mais la dette principale survit pour le surplus.
  - Clôture LJ pour insuffisance d'actif : non-reprise des poursuites individuelles **sauf** contre la caution (L.643-11 `[Légifrance]`) — la caution **reste actionnable**.
- **Recours créancier hors procédure** : à anticiper (prêteur bancaire, bailleur, fournisseur garanti). `[review]`.
- **Ne jamais conclure « caution éteinte »** sans l'acte et l'état du plan. Qualification : 🟢🟡🟠🔴 `[review]`.

### Étape 3 — Synthèse, fraîcheur, post-flight

- **Synthèse en tête** : criticité maximale + axe(s) prime + stade procédure + (si action engagée) renvoi contentieuiste.
- Vérifier la **fraîcheur** de la jurisprudence (ch. com. < 3 ans) sur faute de gestion / interdiction de gérer / cautions via `judilibre_recherche` ; mode dégradé documenté si PISTE indisponible.
- Post-flight `verifier-citations` sur la sortie complète. Articles à vérifier : **L.651-1, L.651-2, L.651-3, L.652-1, L.653-1, L.653-3, L.653-4, L.653-5, L.653-6, L.653-8, L.653-11, L.654-1, L.654-2, L.654-3, L.622-28, L.631-14, L.626-11, L.643-11, L.632-1, L.632-2 C.com.**, **art. 2288 et s. C.civ.** Tag `[Légifrance]` uniquement si vérifié (présent dans `references/articles-c-civ-c-com-index.md` ou consulté via PISTE) ; sinon `[à vérifier]`.

### Format livrable

```
[En-tête de confidentialité selon le rôle utilisateur — voir CLAUDE.md du plugin]

> ⚠️ Note du relecteur
> - **Sources :** Légifrance ✓ / Judilibre ✓ / Pappers ✓ / BODACC ✓ (cocher ✗ si non connectée)
> - **Lecture :** faits fournis : {liste} | corpus client ingéré (Anno) | aucun
> - **Signalé pour ton jugement :** {N éléments [review] en ligne}
> - **Fraîcheur :** jurisprudence post-{date} sur faute de gestion / interdiction de gérer / cautions — {N} arrêts [Judilibre] | recherche impossible
> - **Avant de t'appuyer dessus :** {action concrète — ex. faire reconstituer la chronologie avec l'expert-comptable ; obtenir l'acte de caution et l'état du plan}

# Synthèse — Exposition globale du dirigeant
- Criticité maximale : {🟠} sur axe prime : {L.651-2 — retard DCP}
- Axes en jeu : L.651-2 {🟠} · L.653-8 {🟡} · Banqueroute {nommée, pas évaluée} · Cautions {🟠}
- Stade : {RJ ouverte / LJ / action engagée / pré-CdP imminente}
- {Si action engagée : « Avocat contentieuiste recommandé — ce skill qualifie, ne rédige pas la défense. »}

# Faits retenus
{chronologie sobre, en semaines relatives, sans dates calendaires}

# Axe 1 — Contribution à l'insuffisance d'actif (L.651-2) + sous-cas L.652-1
- Qualification : {🟢🟡🟠🔴} [review]
- Conditions L.651-2 : {procédure ouverte · insuffisance non chiffrée · faute de gestion (indices) · causalité}
- Facteurs aggravants / atténuants : {…} ; simple négligence exclue (al. 2) [review]
- Sous-cas L.652-1 (confusion de patrimoine / fictivité) : {qualif si signaux | risque dormant}

# Axe 2 — Sanctions personnelles (L.653-x)
- Interdiction de gérer (L.653-8) : {qualif} [review]
- Faillite personnelle (L.653-3 à L.653-5) : {qualif} [review]
- Durée max 15 ans (L.653-11)

# Axe 3 — Banqueroute (L.654-1) — NOMMÉE, pas évaluée
- Cas légaux applicables aux faits : {…}
- {Si signaux : renvoi pénaliste — l'intention n'est pas qualifiée ici}
- Sanctions max : 5 ans + 75 000 € (L.654-3)

# Axe 4 — Cautions personnelles
- Existence : {acte | à compléter}
- Sort dans la procédure : observation (L.622-28/L.631-14) · plan (L.626-11) · clôture LJ (L.643-11)
- Recours créancier hors procédure : {prêteur / bailleur / fournisseur} [review]

# Une question hors de ma checklist
{observation honnête — ex. compte courant d'associé débiteur, rémunération récente, garantie à première demande déguisée en caution. Omettre si rien d'honnête.}

# Que veux-tu faire ? Choisis une option et je la déroule :
1. **Rédiger** — note de synthèse au dirigeant (mode silencieux client) reprenant l'évaluation des 4 axes.
2. **Escalader** — note vers {avocat référent / contentieuiste / pénaliste si banqueroute en jeu} : faits-clés, axe prime, décision attendue.
3. **Compléter les faits** — questions à l'expert-comptable / dirigeant (chronologie, comptabilité, comptes courants, actes de caution, état du plan).
4. **Surveiller et attendre** — j'ajoute le dossier au tracker avec critères et date de revisite (ex. ouverture d'une action du mandataire).
5. **Autre** — précise.
```

### Mode silencieux (note destinée au dirigeant non-juriste)

Si le livrable est adressé directement au dirigeant : couper la narration de skill, sortir les renvois inter-commandes dans une note séparée, conserver l'en-tête de confidentialité adapté au rôle et une note du relecteur condensée. **Pas de mode externe** vers le tribunal/mandataire : un mémoire en défense est un autre livrable (avocat contentieuiste).

### Log de vérification

```
Sources consultées : [tags utilisés]
Citations vérifiées : [oui / non / partiel — état PISTE]
Date d'analyse : YYYY-MM-DD
```

---

## Ce skill ne fait pas

- **Conclure** à une faute de gestion, une sanction ou une responsabilité — le tribunal qualifie ; le skill présente des facteurs `[review]`.
- **Chiffrer** l'insuffisance d'actif, la contribution ou les amendes (piège fabrication) — `[à compléter]`, réclamer l'état du passif.
- **Évaluer** la banqueroute (L.654-1) — pénal : nommée et renvoyée au pénaliste.
- **Rédiger un mémoire en défense** quand une action L.651-2 / L.653-8 est engagée → renvoi avocat contentieuiste ; futur skill dédié.
- **Trancher** la qualification de dirigeant **de fait** — la nommer `[review]`.
- **Stratégier** la défense (constituer les preuves, ordonner les moyens, choisir l'expert).
- Le conseil **fiscal** (solidarité fiscale du dirigeant, L.267 LPF) — nommé si signaux, sinon hors scope ; renvoi.
- **Fabriquer** des dates (semaines relatives uniquement).

---

## Ton

Technique, factuel, **mesuré**. Sur l'exposition : honnêteté directe (elle est réelle et personnelle) sans dramatiser ni conclure — qualifier, nommer les facteurs, renvoyer l'évaluation finale à l'avocat. Ne jamais fabriquer un risque pour « remplir » un axe : un dirigeant peut être 🟢 partout. La responsabilité personnelle engage le patrimoine du dirigeant : le brouillon est soumis à validation humaine (avocat), contentieuiste si une action est engagée.
````

- [ ] **Step 2 : Vérifier l'absence de CRLF**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && file plugins/hacienda-droit-affaires/skills/responsabilite-dirigeant/SKILL.md && grep -lc $'\r' plugins/hacienda-droit-affaires/skills/responsabilite-dirigeant/SKILL.md; echo "exit=$?"
```
Expected : pas de « CRLF » dans la sortie `file` ; `grep` ne trouve aucune ligne (`exit=1`).

- [ ] **Step 3 : Vérifier l'absence de préfixe périmé**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && grep -nE '/h-droit-affaires:|/hacienda-droit-affaires:|/hacienda-propriete-intellectuelle:' plugins/hacienda-droit-affaires/skills/responsabilite-dirigeant/SKILL.md; echo "exit=$?"
```
Expected : aucune occurrence (`exit=1`).

---

## Task 3 : Créer le wrapper jumeau

**Files:** Create `plugins/hacienda-droit-affaires/commands/h-da/responsabilite-dirigeant.md`

**Interfaces:**
- Consumes : `description` et `argument-hint` **identiques** au SKILL.md (Task 2).

- [ ] **Step 1 : Écrire le wrapper** (UTF-8, LF, contenu exact ci-dessous)

````markdown
---
description: >
  Côté dirigeant débiteur : évalue (qualifie, ne conclut pas) la responsabilité
  personnelle du dirigeant d'une entreprise en procédure collective, sur quatre
  axes traités en un seul skill avec triage interne : contribution à
  l'insuffisance d'actif (art. L.651-2 C.com., et sous-cas obligation aux dettes
  sociales L.652-1), sanctions personnelles — interdiction de gérer (L.653-8) et
  faillite personnelle (L.653-3 s.), banqueroute (L.654-1, NOMMÉE et renvoyée au
  pénaliste — jamais évaluée), et cautions personnelles du dirigeant (sort dans
  la procédure L.622-28 / L.631-14 / L.626-11 / L.643-11 et recours créancier).
  Qualifie chaque axe sur l'échelle 🟢🟡🟠🔴 avec facteurs aggravants/atténuants ;
  tous stades couverts (pré-CdP imminente, RJ/LJ ouverte, action engagée).
  Ne chiffre JAMAIS l'insuffisance ni la contribution ; ne rédige PAS de mémoire
  en défense (renvoi avocat contentieuiste si action engagée) ; ne fabrique
  aucune date (semaines relatives). Évalue ce que `declaration-cessation-paiements`
  nomme. Brouillon, validation humaine (avocat) OBLIGATOIRE.
argument-hint: "[forme sociale, qualité du dirigeant (droit/fait), stade procédure (pré-CdP / RJ-LJ ouverte / action engagée), faits saillants ; côté dirigeant]"
---

Use the `responsabilite-dirigeant` skill to evaluate the personal liability exposure of a company director in collective proceedings.

$ARGUMENTS
````

- [ ] **Step 2 : Vérifier CRLF + préfixe périmé**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && grep -lc $'\r' plugins/hacienda-droit-affaires/commands/h-da/responsabilite-dirigeant.md; echo "crlf_exit=$?"; grep -nE '/h-droit-affaires:|/hacienda-droit-affaires:|/hacienda-propriete-intellectuelle:' plugins/hacienda-droit-affaires/commands/h-da/responsabilite-dirigeant.md; echo "prefix_exit=$?"
```
Expected : `crlf_exit=1` (pas de CRLF) ; `prefix_exit=1` (pas de préfixe périmé).

---

## Task 4 : README

**Files:** Modify `plugins/hacienda-droit-affaires/README.md`

- [ ] **Step 1 : Tableau Commandes (ordre alpha)** — insérer entre `/h-da:reprise-a-la-barre` (ligne 108) et `/h-da:reviser-contrat` (ligne 109) :

```
| `/h-da:responsabilite-dirigeant` | Côté dirigeant : évalue l'exposition personnelle du dirigeant (insuffisance d'actif L.651-2, sanctions L.653-x, banqueroute nommée, cautions). Tous stades. |
```

(« responsabilite-dirigeant » se classe après « reprise-a-la-barre » et avant « reviser-contrat ».)

- [ ] **Step 2 : Périmètre V2** — dans la section Procédures collectives, ajouter une mention de `responsabilite-dirigeant` à côté de `declaration-cessation-paiements`. Repérer la ligne :

```bash
cd /Users/candynguyen/dev/hacienda-juridique && grep -n "declaration-cessation-paiements\|Procédures collectives\|procédures collectives" plugins/hacienda-droit-affaires/README.md
```
Ajouter `responsabilite-dirigeant` dans l'énumération du périmètre Procédures collectives (forme : « … `declaration-cessation-paiements`, `responsabilite-dirigeant` … »).

- [ ] **Step 3 : Vérifier**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && grep -c "/h-da:responsabilite-dirigeant" plugins/hacienda-droit-affaires/README.md
```
Expected : `1` (ou plus si mentionné aussi dans Périmètre).

---

## Task 5 : Mettre à jour les renvois DCP + le routeur `cas`

**Files:**
- Modify `plugins/hacienda-droit-affaires/skills/declaration-cessation-paiements/SKILL.md`
- Modify `plugins/hacienda-droit-affaires/skills/cas/SKILL.md`

**Interfaces:**
- Consumes : le skill `responsabilite-dirigeant` doit exister (Task 2) pour que les renvois ne soient pas des liens morts.

- [ ] **Step 1 : DCP — renvoi dans le bloc « Alerte exposition dirigeant »** (Étape 2, ~ligne 174). Remplacer :

```
L'**évaluation** de cette responsabilité (faute caractérisée, quantum, moyens de défense, sort des cautions) relève d'un avocat. `[review]`
```
par :

```
L'**évaluation** de cette responsabilité (faute caractérisée, quantum, moyens de défense, sort des cautions) relève de `/h-da:responsabilite-dirigeant` (qualification des 4 axes) puis d'un avocat. `[review]`
```

- [ ] **Step 2 : DCP — section « Ce skill ne fait pas »** (~ligne 296). Remplacer :

```
- L'**évaluation** de la responsabilité du dirigeant (faute de gestion, insuffisance d'actif L.651-2, sanctions, sort des cautions) → futur skill dédié / avocat. Le skill **nomme** l'exposition, il ne l'évalue pas.
```
par :

```
- L'**évaluation** de la responsabilité du dirigeant (faute de gestion, insuffisance d'actif L.651-2, sanctions, sort des cautions) → `/h-da:responsabilite-dirigeant` / avocat. Le skill **nomme** l'exposition, il ne l'évalue pas.
```

- [ ] **Step 3 : `cas` — table de routage** (ligne 110-111). Insérer une ligne après « Entreprise en difficulté » :

```
| Dirigeant exposé / responsabilité personnelle (procédure ouverte ou imminente) | `/h-da:responsabilite-dirigeant` |
```

- [ ] **Step 4 : Vérifier que les renvois pointent un skill existant**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && grep -rn "/h-da:responsabilite-dirigeant" plugins/hacienda-droit-affaires/skills/declaration-cessation-paiements/SKILL.md plugins/hacienda-droit-affaires/skills/cas/SKILL.md && test -f plugins/hacienda-droit-affaires/skills/responsabilite-dirigeant/SKILL.md && echo "OK: skill cible existe"
```
Expected : 3 renvois trouvés (2 DCP + 1 cas) + « OK: skill cible existe ».

---

## Task 6 : Test de structure GREEN + commit

- [ ] **Step 1 : Lancer le test**

```bash
cd /Users/candynguyen/dev/hacienda-juridique/packages/core && ./node_modules/.bin/vitest run test/hacienda-droit-affaires-cowork-structure.test.ts 2>&1 | tail -15
```
Expected : tous les sous-tests PASS (count 29, squelette V2 ordonné, wrapper jumeau apparié, README contient la commande, section MCP avec les 4 chaînes). Si un sous-test échoue, corriger SKILL.md / wrapper / README selon le message — **ne pas toucher au test** au-delà du count modifié en Task 1.

- [ ] **Step 2 : Commit**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && git add packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts plugins/hacienda-droit-affaires/skills/responsabilite-dirigeant/ plugins/hacienda-droit-affaires/commands/h-da/responsabilite-dirigeant.md plugins/hacienda-droit-affaires/README.md plugins/hacienda-droit-affaires/skills/declaration-cessation-paiements/SKILL.md plugins/hacienda-droit-affaires/skills/cas/SKILL.md && git commit -m "$(cat <<'EOF'
feat(da): skill responsabilité du dirigeant (L.651-2 / L.653-x / banqueroute / cautions)

2e skill du pan cédant/débiteur. Évalue ce que DCP nomme : 4 axes en triage
interne, qualification + facteurs (pas de quantum), tous stades, banqueroute
nommée pas évaluée. Renvois DCP→C branchés + ligne de routage cas. Count 28→29.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```
Expected : commit créé.

---

## Task 7 : Bump version 0.11.0 → 0.12.0

**Files:** Modify `version.json`, `manifest.json`, `mcp-server/package.json`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` (×2), `CHANGELOG.md` — tous sous `plugins/hacienda-droit-affaires/`.

- [ ] **Step 1 : Remplacer `0.11.0` → `0.12.0`** dans les 6 occurrences :

```bash
cd /Users/candynguyen/dev/hacienda-juridique/plugins/hacienda-droit-affaires
sed -i '' 's/"version": "0.11.0"/"version": "0.12.0"/' version.json manifest.json mcp-server/package.json .claude-plugin/plugin.json .claude-plugin/marketplace.json
grep -rn '"version": "0.1' version.json manifest.json mcp-server/package.json .claude-plugin/plugin.json .claude-plugin/marketplace.json
```
Expected : les 6 lignes affichent `0.12.0` (version.json ×1, manifest ×1, package.json ×1, plugin.json ×1, marketplace.json ×2).

- [ ] **Step 2 : CHANGELOG** — prepend une entrée sous le titre du fichier `plugins/hacienda-droit-affaires/CHANGELOG.md` :

```markdown
## 0.12.0

- Ajout du skill `responsabilite-dirigeant` (pan cédant/débiteur) : évalue la responsabilité personnelle du dirigeant sur 4 axes (contribution à l'insuffisance d'actif L.651-2 + L.652-1 ; sanctions L.653-x ; banqueroute L.654-1 nommée ; cautions personnelles). Qualification + facteurs, pas de quantum, tous stades. Évalue ce que `declaration-cessation-paiements` nomme.
- Renvois `declaration-cessation-paiements` → `responsabilite-dirigeant` branchés ; ligne de routage ajoutée à `cas`.
```

- [ ] **Step 3 : Vérifier la cohérence des versions**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && npm test --silent 2>&1 | grep -iE "version|coheren" | head; echo "---"; grep -rn "0.11.0" plugins/hacienda-droit-affaires/version.json plugins/hacienda-droit-affaires/manifest.json plugins/hacienda-droit-affaires/.claude-plugin/*.json plugins/hacienda-droit-affaires/mcp-server/package.json; echo "exit=$?"
```
Expected : aucune occurrence résiduelle de `0.11.0` dans les fichiers de version (`exit=1` au second grep).

- [ ] **Step 4 : Commit**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && git add plugins/hacienda-droit-affaires/version.json plugins/hacienda-droit-affaires/manifest.json plugins/hacienda-droit-affaires/mcp-server/package.json plugins/hacienda-droit-affaires/.claude-plugin/plugin.json plugins/hacienda-droit-affaires/.claude-plugin/marketplace.json plugins/hacienda-droit-affaires/CHANGELOG.md && git commit -m "$(cat <<'EOF'
chore(da): bump v0.11.0 → v0.12.0 (responsabilite-dirigeant)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```
Expected : commit créé.

---

## Task 8 : Vérification globale du dépôt

- [ ] **Step 1 : Suite + typecheck + build + branding + whitespace**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && npm test 2>&1 | tail -20; echo "=== typecheck ==="; npm run typecheck 2>&1 | tail -5; echo "=== build ==="; npm run build 2>&1 | tail -5; echo "=== branding ==="; npm run branding:check 2>&1 | tail -5; echo "=== whitespace ==="; git diff --check
```
Expected : suite verte (si le smoke `sources-officielles` est rouge = panne PISTE externe, le blanchir en vérifiant que le diff ne touche aucun fichier core/sources-officielles via `git diff --name-only main...HEAD`) ; typecheck/build/branding OK ; `git diff --check` sans erreur whitespace.

---

## Task 9 : Enregistrer le skill dans le wrapper de scoring

**Files:** Modify `scripts/da-scoring.sh`

**Interfaces:**
- Consumes : nom du skill `responsabilite-dirigeant` ; description (Task 2) ; code de cycle défaut **RD1RT**.

- [ ] **Step 1 : SKILLS array** — ajouter `responsabilite-dirigeant` à la fin du tableau `SKILLS=(…)` (après `declaration-cessation-paiements`, ~ligne 55).

- [ ] **Step 2 : `code_for()`** — ajouter avant le `esac` (~ligne 73) :

```bash
    responsabilite-dirigeant) echo "RD1RT" ;;
```

- [ ] **Step 3 : `mode_for()`** — ajouter avant le `esac` (~ligne 89) :

```bash
    responsabilite-dirigeant) echo "evaluation responsabilite du dirigeant 4 axes (mode unique)" ;;
```

- [ ] **Step 4 : `spec_for()`** — ajouter avant le `esac` (~ligne 105) :

```bash
    responsabilite-dirigeant) echo "cote dirigeant debiteur ; entreprise en RJ ou LJ ouverte ; qualite dirigeant de droit ou de fait (a qualifier, taguer review si de fait) ; faute de gestion possible (retard de declaration, poursuite d'activite deficitaire, comptes courants d'associe debiteurs, confusion de patrimoine, prelevements anormaux) testant L.651-2 et le sous-cas L.652-1 ; insuffisance d'actif a ne JAMAIS chiffrer ; sanctions personnelles L.653-8 interdiction de gerer et L.653-3 s. faillite personnelle ; signaux possibles de banqueroute L.654-1 a NOMMER sans evaluer (renvoi penaliste) ; caution personnelle du dirigeant dont le sort varie selon la phase (observation L.631-14, plan L.626-11, cloture LJ L.643-11) a ne jamais dire eteinte sans pieces ; faits en semaines relatives, aucune date calendaire ni quantum fabrique ; les 4 axes doivent etre evalues sans skip silencieux" ;;
```

- [ ] **Step 5 : `desc_for()`** — ajouter avant le `esac` (~ligne 121) :

```bash
    responsabilite-dirigeant) echo "Cote dirigeant debiteur : evalue (qualifie, ne conclut pas) la responsabilite personnelle du dirigeant d'une entreprise en procedure collective, sur quatre axes traites en un seul skill avec triage interne : contribution a l'insuffisance d'actif L.651-2 et sous-cas L.652-1, sanctions personnelles L.653-8 et L.653-3 s., banqueroute L.654-1 NOMMEE et renvoyee au penaliste, cautions personnelles du dirigeant. Qualifie chaque axe avec facteurs aggravants/attenuants, tous stades, sans chiffrer le quantum ni fabriquer de date, sans rediger de memoire en defense. Brouillon soumis a validation humaine. NE PAS supposer le contenu du SKILL.md." ;;
```

- [ ] **Step 6 : `command_for()`** — ajouter avant le `esac` (~ligne 137) :

```bash
    responsabilite-dirigeant) echo "/h-da:responsabilite-dirigeant" ;;
```

- [ ] **Step 7 : `usage()` Skills list** — ajouter `responsabilite-dirigeant` à la liste des skills dans le heredoc `usage()` (après `declaration-cessation-paiements`, ~ligne 165).

- [ ] **Step 8 : Vérifier l'enregistrement**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && bash scripts/da-scoring.sh cycles responsabilite-dirigeant 2>&1 | head; echo "---"; bash -n scripts/da-scoring.sh && echo "syntaxe OK"
```
Expected : le skill est reconnu (pas d'erreur « unknown skill ») ; `bash -n` confirme « syntaxe OK ».

- [ ] **Step 9 : Commit**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && git add scripts/da-scoring.sh && git commit -m "$(cat <<'EOF'
chore(da-scoring): enregistre responsabilite-dirigeant (cycle RD1RT)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```
Expected : commit créé.

---

## Task 10 : Dataset de scoring (input Phase 1/2) + handoff scoring blind

**Files:** Create `plugins/hacienda-droit-affaires/tests/datasets/da-responsabilite-dirigeant/scenario.md`

- [ ] **Step 1 : Écrire le scénario fictif** (fact pattern réaliste, **sans aucune solution**). Inclure de quoi exercer les gates G1-G5 et les 4 axes :
  - forme sociale (SAS ou SARL) et **qualité du dirigeant ambiguë** (président de droit, mais un associé minoritaire très actif → tester la qualification de dirigeant de fait `[review]`) ;
  - **stade procédure** = RJ ouverte depuis « ~4 mois » (semaines relatives — tester G1 : ne pas convertir en date) ;
  - **retard de déclaration** d'« environ 10 semaines » avant l'ouverture (tester G1 + axe L.651-2/L.653-8) ;
  - **comptes courants d'associé débiteurs** + **locaux partagés** avec une autre société du dirigeant (tester sous-cas L.652-1 + signal banqueroute à nommer) ;
  - **comptabilité tenue à jour** (facteur atténuant) mais **pas de conciliation** demandée (facteur aggravant) ;
  - une **insuffisance d'actif évoquée mais non chiffrée précisément** (tester G2 : ne pas fabriquer de quantum) ;
  - une **caution bancaire personnelle** du dirigeant + un plan de continuation envisagé (tester G5 : sort selon la phase, ne pas dire « éteinte ») ;
  - aucune réponse attendue dans le fichier.

- [ ] **Step 2 : Commit du dataset input**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && git add plugins/hacienda-droit-affaires/tests/datasets/da-responsabilite-dirigeant/scenario.md && git commit -m "$(cat <<'EOF'
test(da): dataset scoring responsabilite-dirigeant (scenario fictif RD1RT)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```
Expected : commit créé.

- [ ] **Step 3 : HANDOFF SCORING → Candy.** Annoncer que la cible est **gate-clean ADMIS** (SEUIL_ADMIS = 1.0) et que le scoring blind 4 phases est piloté **par Candy** via le wrapper (`phase2` / `phase3-prompt` / `phase4` / `aggregate`). **Ne pas exécuter le scoring côté Claude** (cf. `[[feedback_token_economy_codex]]` et `[[feedback_scoring_wrapper_workflow]]`). Préparer les prompts si demandé. Allocation : Phase 2 = Codex effort HIGH (sans SKILL.md) ; Phase 3 = Claude **Sonnet** session fraîche (sans ground-truth.md) ; Phase 4 = Codex effort medium (sans SKILL.md). Verrouiller la grille dès Phase 2 ; CHECKPOINT revue des gates entre Phase 2 et Phase 3 ; borner les cycles (cf. `[[feedback_date_fabrication_scoring_variance]]`).

---

## Self-Review (rempli pendant la rédaction du plan)

**1. Spec coverage :**
- Design §2 (4 axes) → Task 2 (Étape 2, axes 1-4). ✓
- Design §4 Q1 tout-en-un / Q2 qualif+facteurs / Q3 tous stades / Q4 naming → Task 2 (SKILL.md). ✓
- Design §5 gate intake + routage conditionnel → Task 2 (Intake). ✓
- Design §6 livrable (synthèse + 4 axes + hors-checklist + 5 options + mode silencieux) → Task 2 (Format livrable). ✓
- Design §7 G1-G5 → Global Constraints + Task 2 (Gate non-juriste). ✓
- Design §8 base légale → Task 2 (post-flight verifier-citations). ✓
- Design §9 méthodo/scoring → Task 9 (wrapper) + Task 10 (dataset + handoff). ✓
- Design §10 surface technique (count, version, README, DCP cross-ref, cas) → Tasks 1, 4, 5, 7. ✓
- Design §3 frontières (DCP renvoie vers C ; futur defense-comblement-passif ; cautions repreneur séparées) → Task 5 (DCP) + Task 2 (« Ce skill ne fait pas »). ✓

**2. Placeholder scan :** aucun « TBD/TODO/implement later ». Le contenu complet du SKILL.md, du wrapper, du CHANGELOG et des 7 fonctions du wrapper de scoring est fourni in extenso. Le scénario (Task 10) est volontairement laissé à rédiger par l'implémenteur car c'est un fact-pattern fictif — mais ses **8 ingrédients obligatoires** sont spécifiés (gates G1-G5 + 4 axes), ce qui n'est pas un placeholder mais une contrainte de contenu.

**3. Type/nom consistency :** `responsabilite-dirigeant` utilisé à l'identique partout (dossier, frontmatter, wrapper, README, DCP/cas renvois, wrapper scoring, dataset). Code de cycle `RD1RT` cohérent entre Task 9 (code_for) et Task 10 (handoff). Count 28→29 cohérent (Task 1 RED, Task 6 GREEN). Version 0.11.0→0.12.0 cohérente (Global Constraints + Task 7).
