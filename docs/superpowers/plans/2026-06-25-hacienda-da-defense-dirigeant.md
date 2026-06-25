# Défense du dirigeant — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter au plugin `hacienda-droit-affaires` le skill **doctrinal contentieux** `defense-dirigeant` — aval de `responsabilite-dirigeant` : quand une action en responsabilité est **engagée**, arme une **trame de défense structurée** (moyens mobilisables ordonnés par force) sur les axes civils L.651-2 (+ L.652-1) et sanctions L.653-x ; ne rédige pas le mémoire ; banqueroute hors plaidoirie.

**Architecture :** Skill V2 conforme au squelette imposé par `hacienda-droit-affaires-cowork-structure.test.ts`. Approche **aval contentieux** : gate d'activation strict (action engagée, sinon renvoi `responsabilite-dirigeant`) → trame par axe **visé** (moyens hiérarchisés, confrontés aux faits, pièces à produire) → synthèse stratégie en tête. **Trame ≠ mémoire** (l'avocat rédige l'acte), **jamais de quantum**, **jamais de pronostic d'issue**. Skill **doctrinal** → validation par **scoring blind 4 phases** (exécuté par Candy), pas seulement par les tests structurels.

**Tech Stack :** Markdown (SKILL.md + wrapper), JSON (version/manifest), Vitest (test de structure existant), wrapper Bash `scripts/da-scoring.sh` pour le scoring blind. Pas de code TS nouveau.

**Référence design :** `docs/superpowers/specs/2026-06-25-hacienda-da-defense-dirigeant-design.md`.
**Miroir de référence (build) :** `plugins/hacienda-droit-affaires/skills/responsabilite-dirigeant/SKILL.md`.

## Global Constraints

- Skill **name** : `defense-dirigeant` (tranché au brainstorm). Substituer ce nom à l'identique dans : dossier `skills/<NOM>/SKILL.md`, frontmatter `name:`, wrapper `commands/h-da/<NOM>.md`, ligne « Use the `<NOM>` skill », README, CHANGELOG, dataset `tests/datasets/da-<NOM>/`, wrapper de scoring.
- Frontmatter `version: "2.0.0"` + `argument-hint:` (jamais `1.0.0`).
- Encodage **UTF-8, fins de ligne LF** (jamais CRLF) — le test rejette CRLF.
- Aucun préfixe périmé `/h-droit-affaires:`, `/hacienda-droit-affaires:`, `/hacienda-propriete-intellectuelle:` dans les fichiers livrés ; uniquement `/h-da:`.
- **Anti-fabrication G1-G6** (cf. design §6) : G1 dates en semaines relatives · G2 aucun quantum (contribution/minoration) · G3 moyens en indices `[review]`, jamais de pronostic d'issue · G4 **ne rédige pas le mémoire** (trame seulement) · G5 banqueroute hors plaidoirie + articulation pénal/civil **nommée** seulement · G6 ne fabrique pas de pièce/preuve (`[à compléter]`).
- **Gate d'activation** : le skill ne s'active **que** sur action engagée (assignation/conclusions reçues). Hors contentieux → renvoi `responsabilite-dirigeant`.
- **Code de cycle de scoring : `DFD1RT` (6 caractères majuscules** — le validateur du wrapper rejette 5 caractères ; ne PAS répéter le bug `RD1RT` du cycle C).
- Count `skillFiles.length` : **30 → 31**.
- Version plugin : **0.13.0 → 0.14.0**.
- **Co-Authored-By** des commits : `Claude Opus 4.8 <noreply@anthropic.com>`.

---

## File Structure

**Créer :**
- `plugins/hacienda-droit-affaires/skills/defense-dirigeant/SKILL.md` — le skill doctrinal contentieux (squelette V2).
- `plugins/hacienda-droit-affaires/commands/h-da/defense-dirigeant.md` — wrapper jumeau.
- `plugins/hacienda-droit-affaires/tests/datasets/da-defense-dirigeant/scenario.md` — input scoring Phase 1/2.

**Modifier :**
- `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts:222` — 30 → 31.
- `plugins/hacienda-droit-affaires/README.md` — tableau Commandes (ordre alpha) + Périmètre V2 procédures collectives (ligne 18).
- `plugins/hacienda-droit-affaires/skills/responsabilite-dirigeant/SKILL.md` — résoudre le « futur skill dédié » (§ « Ce skill ne fait pas ») vers `defense-dirigeant` + renvoi au point « action engagée ».
- `plugins/hacienda-droit-affaires/skills/cas/SKILL.md` — 1 ligne de routage (dirigeant **assigné**).
- Version (6 occurrences) : `version.json`, `manifest.json`, `mcp-server/package.json`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` (×2).
- `plugins/hacienda-droit-affaires/CHANGELOG.md`.
- `scripts/da-scoring.sh` — enregistrer le skill (SKILLS array + 6 fonctions + usage).

---

## Contraintes imposées par le test (identiques aux cycles `cas` / DCP / C)

`packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts` impose à chaque skill :
- **Count** `skillFiles.length` (ligne 222) : 30 → **31**.
- Frontmatter `version: "2.0.0"` + `argument-hint:` ; pas de `1.0.0` ; pas de CRLF.
- **Wrapper jumeau** : `description` (via `description: >`) + `argument-hint` identiques au SKILL.md ; contient « Use the `defense-dirigeant` skill » + `$ARGUMENTS` ; **sans** préfixe périmé.
- **README** contient `/h-da:defense-dirigeant`.
- **Section MCP** : SKILL.md contient `## Outils MCP à privilégier` + les chaînes `piste_status`, `legifrance_recherche`, `judilibre_recherche`, `eurlex_recherche`.
- **Squelette V2 ordonné** : `## Examples` → `## Chargement du profil` → `## Intake` → `## Gate non-juriste` → (`## Mode Anno Desktop Optionnel` optionnel) → `## Outils MCP à privilégier` → `## Emplacement des sorties` → `## Sortie`.
- **Hygiène renvois** : aucun préfixe périmé dans les fichiers livrés.

---

## Task 0 : Branche

La branche `feat/da-defense-dirigeant` est **déjà créée** (le design doc y est commité). Vérifier :

- [ ] **Step 1 : Confirmer la branche**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && git branch --show-current
```
Expected : `feat/da-defense-dirigeant`.

---

## Task 1 : Faire échouer le count (RED)

**Files:** Modify `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts:222`

- [ ] **Step 1 : 30 → 31**

Remplacer `expect(skillFiles.length).toBe(30);` par `expect(skillFiles.length).toBe(31);`.

- [ ] **Step 2 : Vérifier l'échec**

```bash
cd /Users/candynguyen/dev/hacienda-juridique/packages/core && ./node_modules/.bin/vitest run test/hacienda-droit-affaires-cowork-structure.test.ts 2>&1 | tail -8
```
Expected : FAIL « expected 30 to be 31 » (le skill n'existe pas encore).

---

## Task 2 : Créer le SKILL.md (doctrinal contentieux)

**Files:** Create `plugins/hacienda-droit-affaires/skills/defense-dirigeant/SKILL.md`

**Interfaces:**
- Produces : skill `defense-dirigeant` invocable `/h-da:defense-dirigeant` ; description + argument-hint réutilisés à l'identique par le wrapper (Task 3) et le wrapper de scoring (Task 9).

- [ ] **Step 1 : Écrire le SKILL.md** (UTF-8, **LF**, contenu exact ci-dessous)

````markdown
---
name: defense-dirigeant
description: >
  Aval contentieux de `responsabilite-dirigeant` : arme la DÉFENSE du dirigeant
  assigné en responsabilité dans une procédure collective. S'active uniquement
  quand une action est ENGAGÉE (assignation / conclusions du liquidateur, du
  ministère public ou des contrôleurs sur carence reçues) ; hors contentieux,
  renvoi `responsabilite-dirigeant`. Produit une TRAME de défense structurée —
  moyens mobilisables ordonnés par force, confrontés aux faits, pièces à produire,
  expertise à demander — sur les axes civils : contribution à l'insuffisance
  d'actif (L.651-2 + sous-cas obligation aux dettes sociales L.652-1) et sanctions
  personnelles (interdiction de gérer L.653-8, faillite personnelle L.653-3 s.).
  Banqueroute (L.654) hors plaidoirie (pénaliste) ; articulation pénal/civil
  (sursis à statuer, autorité du pénal sur le civil) NOMMÉE seulement. NE RÉDIGE
  PAS le mémoire (l'avocat rédige l'acte) ; ne chiffre aucun quantum ; ne
  pronostique aucune issue ; ne fabrique ni date (semaines relatives) ni pièce.
  Brouillon, validation humaine (avocat) OBLIGATOIRE.
version: "2.0.0"
argument-hint: "[axe(s) visé(s) par l'action (L.651-2 / L.652-1 / L.653-x), demandeur (liquidateur / MP / contrôleurs), forme sociale, qualité du dirigeant (droit/fait), faits saillants en semaines relatives ; côté dirigeant assigné]"
authors: ["Hacienda"]
tags: [procedures-collectives, defense-dirigeant, contentieux, l651-2, l653-8, comblement-passif, faute-de-gestion, debiteur]
---

# Skill — Défense du dirigeant (trame de moyens — L.651-2 / L.652-1 / L.653-x)

> **BROUILLON, validation humaine (avocat) OBLIGATOIRE.**
>
> **Trame, pas mémoire.** Ce skill **marshalle** les moyens de défense — il les
> ordonne par force, les confronte aux faits, liste les pièces à produire et
> l'expertise à demander. Il **ne rédige pas** le mémoire en défense : la mise en
> forme de l'acte de procédure relève de l'**avocat** (plaidant / contentieuiste).
>
> **S'active uniquement sur action engagée.** Assignation ou conclusions du
> liquidateur, du ministère public ou des créanciers-contrôleurs (sur carence)
> **reçues**. Hors contentieux (exposition seulement) → renvoi
> `responsabilite-dirigeant` (qualifier l'expo, documenter la chronologie). Aval
> exact de `responsabilite-dirigeant` qui **nomme** ce skill à sa frontière.
>
> **Banqueroute (L.654) : hors plaidoirie.** Instance **pénale** distincte →
> **pénaliste**. Si une banqueroute est poursuivie en parallèle, **nommer**
> l'articulation pénal/civil (sursis à statuer possible, autorité de la chose
> jugée du pénal sur le civil) — jamais la plaider.
>
> **Anti-fabrication strict.** Aucune date calendaire (semaines relatives), aucun
> chiffre de contribution ou de minoration, **aucun pronostic d'issue** (« vous
> serez écarté »), aucune pièce supposée. `[à compléter]` et `[review]` partout où
> la donnée ou le jugement n'est pas établi.

---

## Examples

<example>
<user>/h-da:defense-dirigeant — action L.651-2 du liquidateur reçue (assignation), SAS en LJ, dépôt de bilan tardif d'environ 10 semaines, mais comptabilité tenue à jour et défaillance liée à la perte du client unique (~70 % du CA), gérant de droit, pas de pluralité de dirigeants</user>
<response>
1. Gate : **action engagée** confirmée (assignation L.651-2 du liquidateur) → le skill s'applique. Pré-flight `check-pii` (dénomination + dirigeant + faits financiers → seuil B fréquent).
2. **En tête** : « Ce skill arme la trame de défense ; l'avocat rédige le mémoire. »
3. **Synthèse** : action visée = L.651-2 (comblement) · demandeur = liquidateur · moyens prime (par force) = (1) prescription/recevabilité, (2) rupture de causalité (cause externe), (3) absence de faute / négligence exclue.
4. **Trame — Axe L.651-2** (moyens ordonnés) :
   - **Recevabilité / prescription** : vérifier la **prescription 3 ans** à compter du jugement de LJ `[review]` ; qualité pour agir du liquidateur OK.
   - **Rupture du lien de causalité** : l'insuffisance procède d'une cause **externe** (perte du client unique ~70 % du CA) → moyen fort `[review]` ; réclamer les pièces établissant la cause externe `[à compléter]`.
   - **Absence de faute de gestion** : retard DCP ~10 semaines = grief probable, mais **simple négligence exclue** (L.651-2 al. 2, loi Sapin II 2016) ; comptabilité à jour = élément à verser.
   - **Minoration de la contribution** : pouvoir modérateur du juge ; **ne pas chiffrer** — réclamer l'état du passif et une expertise contradictoire `[à compléter]`.
5. Banqueroute : aucun signal → pas d'articulation pénal/civil à nommer.
6. Sortie : synthèse + trame L.651-2 + pièces à produire + question hors-checklist + arbre 5 options. **Aucun pronostic** d'issue.
</response>
</example>

<example>
<user>/h-da:defense-dirigeant — action combinée du liquidateur : comblement L.651-2 ET interdiction de gérer L.653-8 ; SAS en LJ ; comptes courants d'associé débiteurs importants + locaux partagés avec une autre société du dirigeant ; une plainte pour banqueroute aurait été déposée en parallèle</user>
<response>
**Trame par axe visé** (ne traiter que les axes attaqués) :
- **Axe L.651-2 (+ sous-cas L.652-1)** : les comptes courants débiteurs + locaux confondus fondent vraisemblablement aussi une demande **L.652-1** (obligation aux dettes sociales — confusion de patrimoine), **régime distinct** → défense propre : contester la **confusion** (flux régularisés ? conventions de compte courant ? cloisonnement effectif ?) `[review]` `[à compléter]`. Sur L.651-2 : faute / causalité / minoration ; quantum **non chiffré**.
- **Axe L.653-8 (interdiction de gérer)** : moyens = **cas limitatifs d'interprétation stricte** (le grief allégué entre-t-il exactement dans un cas légal ?) ; caractère **facultatif** (« le tribunal *peut* ») ; **proportionnalité de la durée** (≤ 15 ans, L.653-11) `[review]`.
- **Articulation pénal/civil** : une **banqueroute** (L.654) est poursuivie au pénal → **nommer** le **sursis à statuer** possible devant le juge civil et l'**autorité de la chose jugée** du pénal sur le civil ; **renvoi pénaliste**. Ne PAS plaider la banqueroute ici.
Ne pas pronostiquer l'issue ; chaque moyen en indice `[review]`.
</response>
</example>

<example>
<user>/h-da:defense-dirigeant — SARL en RJ ouverte depuis ~3 mois, le gérant s'inquiète d'une éventuelle action en comblement mais rien n'a encore été engagé</user>
<response>
**Gate non franchi** : **aucune action engagée** (pas d'assignation ni de conclusions). Ce skill arme la défense d'une action **en cours** ; il n'a rien à armer ici.
→ Renvoi `/h-da:responsabilite-dirigeant` : qualifier l'exposition (4 axes), documenter la chronologie en semaines relatives, et préparer les pièces — de sorte que si une action est engagée, la trame de défense parte d'un dossier déjà tenu.
(Ne pas fabriquer une défense préventive sur une action hypothétique.)
</response>
</example>

---

## Chargement du profil

> Lire `~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/CLAUDE.md`, bloc procédures collectives :
> - **Position** — créancier / débiteur / mandataire / mixte (oriente le ton : ici, côté dirigeant **assigné**)
> - **Tribunaux habituels** — repérage du greffe / juridiction saisie
> - **Rôle utilisateur** — avocat inscrit / juriste in-house / non-juriste (en-tête de confidentialité)
> - **Matrice d'approbateurs** — pour l'option « Escalader » (avocat plaidant / pénaliste si banqueroute en jeu)
> - **Politique PII** — `passive` / `active` (défaut) / `strict` + seuil B

Si le bloc est `[A CONFIGURER]` : stopper et demander `/h-da:entretien-demarrage`.

---

## Intake

1. **Action engagée** (**obligatoire — gate**) — assignation / conclusions **reçues** ? **axe(s) visé(s)** (L.651-2 / L.652-1 / L.653-8 / faillite personnelle) ? **demandeur** (liquidateur / ministère public / créanciers-contrôleurs sur carence) ? juridiction saisie ? Si **aucune action engagée** → **stopper** et renvoyer `/h-da:responsabilite-dirigeant`.
2. **Forme sociale + qualité du dirigeant** — SAS, SARL, SA… ET dirigeant **de droit** ou **de fait**. Une demande fondée sur la **direction de fait** se conteste aussi sur ce terrain → `[review]`.
3. **Faits chronologiques** — en **semaines relatives** (« ~10 semaines », « ~3 mois »). Ne **jamais** demander ni produire de date calendaire.
4. **Sortie de `responsabilite-dirigeant`** (si disponible) — réutiliser l'évaluation des axes (criticité, facteurs) pour prioriser les moyens. Sinon, le proposer.
5. **Données de défense** (optionnel, `[à compléter]` sinon) — pièces disponibles (comptabilité, PV d'organes, courriels, rapports expert-comptable) ; cause **externe** documentée de la défaillance ; **pluralité de dirigeants** (contribution partageable) ; état du passif communiqué ? ; **banqueroute poursuivie en parallèle** ?

**Routage à l'intake :**
- **Pas d'action engagée** → `/h-da:responsabilite-dirigeant` (le skill ne construit pas de défense sur une action hypothétique).
- **Banqueroute (L.654) au cœur de la poursuite** → renvoi **pénaliste** ; ici, seule l'**articulation** pénal/civil est nommée.

Si l'existence d'une action engagée, la forme sociale ou la qualité du dirigeant sont absentes : stopper et demander. Pas de valeur par défaut.

---

## Gate non-juriste

- [ ] **Action engagée confirmée** (assignation/conclusions reçues) — sinon renvoi `responsabilite-dirigeant` ; le skill ne s'active pas sur une action hypothétique
- [ ] Forme sociale + qualité du dirigeant + axe(s) visé(s) + demandeur fournis (refus du défaut)
- [ ] Pré-flight `check-pii` exécuté et décision utilisateur respectée
- [ ] Profil cabinet bloc procédures collectives lu ; rôle utilisateur (en-tête) et matrice d'approbateurs identifiés
- [ ] **Trame par axe RÉELLEMENT visé** par l'action — ne pas inventer un axe non attaqué ; un axe attaqué non traité est une faute (pas de skip silencieux sur les axes visés)
- [ ] **G4 — ne rédige pas le mémoire** : la sortie est une **trame** (moyens ordonnés + pièces + expertise), jamais un acte de procédure rédigé ; mention en tête « l'avocat rédige le mémoire »
- [ ] **G3 — moyens en indices** `[review]` : aucun **pronostic d'issue** (« vous serez écarté / relaxé ») ; l'issue appartient au tribunal
- [ ] **G2 — quantum** : ne chiffre ni la contribution ni sa minoration ; réclamer l'état du passif / l'expertise contradictoire ; `[à compléter]`
- [ ] **G1 — dates** : semaines relatives uniquement ; aucune date calendaire ni nombre de jours de retard précis
- [ ] **G5 — banqueroute hors plaidoirie** : si poursuivie en parallèle, articulation pénal/civil (sursis à statuer, autorité du pénal sur le civil) **nommée** + renvoi pénaliste ; jamais plaidée
- [ ] **G6 — pas de pièce fabriquée** : lister les pièces à **produire** (`[à compléter]`) ; ne présupposer l'existence d'aucune pièce ni d'aucune cause externe non établie
- [ ] **Prescription / recevabilité testées en premier** sur chaque axe (L.651-2 : 3 ans à compter du jugement de LJ ; qualité pour agir)
- [ ] Aucune **fabrication** : ni date, ni chiffre, ni pièce, ni demandeur non fourni — `[à compléter]` partout où la donnée manque
- [ ] Sortie : synthèse stratégie en tête + trame par axe visé + pièces/expertise + question hors-checklist + arbre 5 options ; en-tête de confidentialité selon rôle ; note du relecteur en bloc unique

---

## Mode Anno Desktop Optionnel

Pour reconstruire la chronologie de défense (impayés, décisions d'organes, prélèvements, flux inter-sociétés, survenance de la cause externe), appeler `anno_health`, puis `detect`. Utiliser `legal_timeline`, `legal_validate_field` et `legal_search` sur corpus déjà ingéré. Les pièces (comptabilité, actes, courriels) restent fournies/validées par le client ; aucune pièce n'est fabriquée.

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Droit des Affaires` est disponible. Ne pas inventer de tool hors périmètre ; si une source n'a pas été consultée directement, garder `[à vérifier]`.

- Socle sources officielles : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Identité entreprise (forme sociale, dirigeants, mandats) : `company_full_profile`, `bodacc_by_siren`.
- **`bodacc_procedures` autorisé** : confirme l'ouverture de la procédure, le mandataire désigné et le stade — utile pour situer l'action et le point de départ de la prescription.
- Jurisprudence à privilégier : faute de gestion / simple négligence (L.651-2 al. 2), rupture de causalité avec l'insuffisance d'actif, cas limitatifs L.653-8, proportionnalité des sanctions, prescription triennale de l'action en comblement.
- Tout résultat issu d'un corpus client ou d'un outil interne reste distingué des sources primaires officielles.

## Emplacement des sorties

```
outputs/defense-dirigeant-<denomination-ou-siren>-<axe>.md
```
`<axe>` : `l651-2` / `l652-1` / `l653-8` / `faillite-perso` / `combine`. Format date des noms : `YYYY-MM-DD` si une date de génération est ajoutée.

---

## Sortie

Structurer la sortie avec : faits retenus, axe(s) visé(s), moyens de défense ordonnés par force, pièces à produire, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

### Étape 1 — Pré-flight et cadrage

1. **Vérifier le gate** : action engagée ? Si non → renvoi `responsabilite-dirigeant`, stop.
2. Invoquer `check-pii` (probabilité élevée seuil B : dirigeant + dénomination + faits financiers). Respecter la décision utilisateur.
3. Lire profil cabinet (bloc procédures collectives) et `~/.claude/plugins/config/hacienda-juridique/company-profile.md`.
4. Confirmer **axe(s) visé(s)**, **demandeur**, **qualité dirigeant** (droit/fait). Réutiliser la sortie de `responsabilite-dirigeant` si fournie.

### Étape 2 — Trame de défense par axe visé (ne traiter que les axes attaqués)

**Axe L.651-2 (contribution à l'insuffisance d'actif) — moyens ordonnés par force.**
1. **Recevabilité / prescription** (`[Légifrance]`) : **prescription 3 ans** à compter du jugement de LJ (ou de résolution du plan) ; **qualité pour agir** limitée (liquidateur / MP / contrôleurs sur carence). `[review]`.
2. **Absence de faute de gestion** : distinguer faute / **simple négligence expressément exclue** (L.651-2 al. 2, loi Sapin II du 9 déc. 2016 `[Légifrance]`) ; une décision de gestion à risque n'est pas une faute caractérisée. Verser les pièces (comptabilité, PV) `[à compléter]`.
3. **Rupture du lien de causalité** : l'insuffisance procède de causes **externes** (marché, perte d'un client majeur, conjoncture) ou d'une faute **sans lien** avec l'insuffisance invoquée ; pluralité de causes. `[review]`.
4. **Contestation / minoration de la contribution** : pouvoir **modérateur** du juge ; proportionnalité faute / contribution ; contribution **partagée** si pluralité de dirigeants (pas de solidarité sauf décision motivée). **Ne pas chiffrer** — réclamer l'état du passif + expertise contradictoire `[à compléter]`.
5. **Moyens procéduraux** : nullités, expertise contradictoire, communication forcée de pièces.

**Axe L.652-1 (obligation aux dettes sociales — sous-cas).**
- Régime **distinct** de L.651-2. Défense : contester la **confusion de patrimoine** (flux régularisés, conventions de compte courant, cloisonnement effectif des locaux/personnel) ou la **fictivité** de la personne morale `[review]` `[à compléter]`.

**Axe L.653-x (sanctions personnelles).**
- Interdiction de gérer (L.653-8 `[Légifrance]`) / faillite personnelle (L.653-3 à L.653-5 `[Légifrance]`) : moyens =
  - **cas limitatifs d'interprétation stricte** — le grief allégué entre-t-il exactement dans un cas légal ? ;
  - caractère **facultatif** (« le tribunal *peut* ») ;
  - **proportionnalité** de la sanction **et de la durée** (≤ 15 ans, L.653-11 `[Légifrance]`).

> Chaque moyen est présenté en **argument mobilisable `[review]`**, jamais « moyen gagnant » ni pronostic d'issue.

### Étape 3 — Articulation pénal/civil, fraîcheur, post-flight

- **Articulation pénal/civil** (si banqueroute L.654 poursuivie en parallèle) : **nommer** le **sursis à statuer** possible et l'**autorité de la chose jugée** du pénal sur le civil ; **renvoi pénaliste**. Ne pas plaider la banqueroute.
- Vérifier la **fraîcheur** de la jurisprudence (ch. com. < 3 ans) sur simple négligence / causalité / cas L.653-8 / prescription via `judilibre_recherche` ; mode dégradé documenté si PISTE indisponible.
- Post-flight `verifier-citations` sur la sortie complète. Articles à vérifier : **L.651-1, L.651-2, L.651-3, L.652-1, L.653-1, L.653-3, L.653-4, L.653-5, L.653-8, L.653-11, L.654-1, L.654-2 C.com.** Tag `[Légifrance]` uniquement si vérifié (présent dans `references/articles-c-civ-c-com-index.md` ou consulté via PISTE) ; sinon `[à vérifier]`.

### Format livrable

```
[En-tête de confidentialité selon le rôle utilisateur — voir CLAUDE.md du plugin]

> ⚠️ Note du relecteur
> - **Sources :** Légifrance ✓ / Judilibre ✓ / Pappers ✓ / BODACC ✓ (cocher ✗ si non connectée)
> - **Lecture :** pièces fournies : {liste} | sortie responsabilite-dirigeant | aucune
> - **Signalé pour ton jugement :** {N éléments [review] en ligne}
> - **Fraîcheur :** jurisprudence post-{date} sur simple négligence / causalité / L.653-8 — {N} arrêts [Judilibre] | recherche impossible
> - **Avant de t'appuyer dessus :** {action concrète — ex. vérifier le point de départ de la prescription au jugement de LJ ; réunir les pièces établissant la cause externe ; obtenir l'état du passif}

# Synthèse — Stratégie de défense
- Action visée : {L.651-2 / L.652-1 / L.653-8 / faillite personnelle} · demandeur : {liquidateur / MP / contrôleurs}
- Moyens prime (par force) : {1. … · 2. … · 3. …} [review]
- Banqueroute parallèle ? {oui → articulation pénal/civil nommée + renvoi pénaliste | non}
- **Ce skill arme la trame ; l'avocat rédige le mémoire (acte de procédure).**

# Faits retenus
{chronologie sobre, en semaines relatives, sans dates calendaires}

# Trame de défense — Axe {L.651-2 / L.652-1 / L.653-x}
- Moyens mobilisables, ordonnés par force [review]
- Confrontation aux faits du dossier
- Pièces à produire [à compléter] · expertise à demander
- Quantum : non chiffré — réclamer l'état du passif

# Articulation pénal/civil (si banqueroute parallèle)
- Sursis à statuer possible · autorité de la chose jugée du pénal sur le civil · renvoi pénaliste

# Une question hors de ma checklist
{observation honnête — ex. point de départ exact de la prescription, qualité pour agir des contrôleurs, pluralité de dirigeants ouvrant un partage de contribution. Omettre si rien d'honnête.}

# Que veux-tu faire ? Choisis une option et je la déroule :
1. **Rédiger** — note stratégique de défense (trame des moyens, pièces, expertise) pour l'avocat plaidant.
2. **Escalader** — note vers {avocat plaidant / contentieuiste / pénaliste si banqueroute en jeu} : axe(s) visé(s), moyens prime, pièces manquantes, décision attendue.
3. **Compléter les pièces** — questions à l'expert-comptable / dirigeant (état du passif, pièces de la cause externe, conventions de compte courant, jugement de LJ pour la prescription).
4. **Surveiller et attendre** — j'ajoute le dossier au tracker (échéance de conclusions, date d'audience exprimée en délai relatif).
5. **Autre** — précise.
```

### Mode silencieux (note destinée au dirigeant non-juriste)

Si le livrable est adressé directement au dirigeant : couper la narration de skill, sortir les renvois inter-commandes dans une note séparée, conserver l'en-tête de confidentialité adapté au rôle et une note du relecteur condensée. **Pas de mode externe** vers le tribunal : le mémoire en défense est un autre livrable (avocat). La trame reste un document de travail interne.

### Log de vérification

```
Sources consultées : [tags utilisés]
Citations vérifiées : [oui / non / partiel — état PISTE]
Date d'analyse : YYYY-MM-DD
```

---

## Ce skill ne fait pas

- **Rédiger le mémoire / les conclusions** en défense (l'acte de procédure = avocat) — il fournit la **trame** de moyens.
- **Pronostiquer l'issue** (« vous serez écarté / relaxé ») — moyens en indices `[review]` ; l'issue relève du tribunal.
- **Chiffrer** la contribution ou sa minoration (piège fabrication) — `[à compléter]`, réclamer l'état du passif.
- **Plaider la banqueroute** (L.654) — pénal : renvoi pénaliste ; seule l'articulation pénal/civil est nommée.
- **Inventer un axe non visé** par l'action — ne traiter que les axes réellement attaqués.
- **S'activer hors contentieux** (action non engagée) — renvoi `responsabilite-dirigeant`.
- Le conseil **fiscal** (solidarité fiscale du dirigeant, L.267 LPF) — nommé si signaux, sinon hors scope ; renvoi.
- **Fabriquer** des dates (semaines relatives uniquement) ou des **pièces** (`[à compléter]`).

---

## Ton

Technique, factuel, **combatif mais mesuré**. La défense s'arme par des moyens de droit ordonnés, pas par des promesses : nommer les moyens, les hiérarchiser, dire honnêtement lesquels sont fragiles, et renvoyer la rédaction de l'acte et le pronostic à l'avocat. Ne jamais survendre un moyen ni pronostiquer une relaxe. Le dirigeant est exposé sur son patrimoine personnel : le brouillon est soumis à validation humaine (avocat), pénaliste si une banqueroute est poursuivie.
````

- [ ] **Step 2 : Vérifier l'absence de CRLF**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && file plugins/hacienda-droit-affaires/skills/defense-dirigeant/SKILL.md && grep -lc $'\r' plugins/hacienda-droit-affaires/skills/defense-dirigeant/SKILL.md; echo "exit=$?"
```
Expected : pas de « CRLF » dans la sortie `file` ; `grep` ne trouve aucune ligne (`exit=1`).

- [ ] **Step 3 : Vérifier l'absence de préfixe périmé**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && grep -nE '/h-droit-affaires:|/hacienda-droit-affaires:|/hacienda-propriete-intellectuelle:' plugins/hacienda-droit-affaires/skills/defense-dirigeant/SKILL.md; echo "exit=$?"
```
Expected : aucune occurrence (`exit=1`).

---

## Task 3 : Créer le wrapper jumeau

**Files:** Create `plugins/hacienda-droit-affaires/commands/h-da/defense-dirigeant.md`

**Interfaces:**
- Consumes : `description` et `argument-hint` **identiques** au SKILL.md (Task 2).

- [ ] **Step 1 : Écrire le wrapper** (UTF-8, LF, contenu exact ci-dessous)

````markdown
---
description: >
  Aval contentieux de `responsabilite-dirigeant` : arme la DÉFENSE du dirigeant
  assigné en responsabilité dans une procédure collective. S'active uniquement
  quand une action est ENGAGÉE (assignation / conclusions du liquidateur, du
  ministère public ou des contrôleurs sur carence reçues) ; hors contentieux,
  renvoi `responsabilite-dirigeant`. Produit une TRAME de défense structurée —
  moyens mobilisables ordonnés par force, confrontés aux faits, pièces à produire,
  expertise à demander — sur les axes civils : contribution à l'insuffisance
  d'actif (L.651-2 + sous-cas obligation aux dettes sociales L.652-1) et sanctions
  personnelles (interdiction de gérer L.653-8, faillite personnelle L.653-3 s.).
  Banqueroute (L.654) hors plaidoirie (pénaliste) ; articulation pénal/civil
  (sursis à statuer, autorité du pénal sur le civil) NOMMÉE seulement. NE RÉDIGE
  PAS le mémoire (l'avocat rédige l'acte) ; ne chiffre aucun quantum ; ne
  pronostique aucune issue ; ne fabrique ni date (semaines relatives) ni pièce.
  Brouillon, validation humaine (avocat) OBLIGATOIRE.
argument-hint: "[axe(s) visé(s) par l'action (L.651-2 / L.652-1 / L.653-x), demandeur (liquidateur / MP / contrôleurs), forme sociale, qualité du dirigeant (droit/fait), faits saillants en semaines relatives ; côté dirigeant assigné]"
---

Use the `defense-dirigeant` skill to build a structured defense outline for a company director who has been sued for liability in collective proceedings.

$ARGUMENTS
````

- [ ] **Step 2 : Vérifier CRLF + préfixe périmé**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && grep -lc $'\r' plugins/hacienda-droit-affaires/commands/h-da/defense-dirigeant.md; echo "crlf_exit=$?"; grep -nE '/h-droit-affaires:|/hacienda-droit-affaires:|/hacienda-propriete-intellectuelle:' plugins/hacienda-droit-affaires/commands/h-da/defense-dirigeant.md; echo "prefix_exit=$?"
```
Expected : `crlf_exit=1` (pas de CRLF) ; `prefix_exit=1` (pas de préfixe périmé).

---

## Task 4 : README

**Files:** Modify `plugins/hacienda-droit-affaires/README.md`

- [ ] **Step 1 : Tableau Commandes (ordre alpha)** — insérer **entre** la ligne `/h-da:declaration-creance` (ligne 96) et la ligne `/h-da:distress-cedant` (ligne 97) : (`defense-dirigeant` se classe après `declaration-creance` — `dec` < `def` < `dis`)

```
| `/h-da:defense-dirigeant` | Aval contentieux de `responsabilite-dirigeant` : arme la trame de défense du dirigeant **assigné** (L.651-2 / L.652-1 / sanctions L.653-x). Moyens ordonnés par force ; ne rédige pas le mémoire. |
```

- [ ] **Step 2 : Périmètre V2 (ligne 18)** — ajouter `defense-dirigeant` dans l'énumération « Procédures collectives ». Remplacer :

```
| Procédures collectives | `declaration-creance`, `declaration-cessation-paiements`, `responsabilite-dirigeant`, `distress-cedant` |
```
par :
```
| Procédures collectives | `declaration-creance`, `declaration-cessation-paiements`, `responsabilite-dirigeant`, `defense-dirigeant`, `distress-cedant` |
```

- [ ] **Step 3 : Vérifier**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && grep -c "/h-da:defense-dirigeant" plugins/hacienda-droit-affaires/README.md; grep -c "\`defense-dirigeant\`" plugins/hacienda-droit-affaires/README.md
```
Expected : `1` pour la commande ; `≥1` pour la mention périmètre.

---

## Task 5 : Résoudre la frontière dans `responsabilite-dirigeant` + routeur `cas`

**Files:**
- Modify `plugins/hacienda-droit-affaires/skills/responsabilite-dirigeant/SKILL.md`
- Modify `plugins/hacienda-droit-affaires/skills/cas/SKILL.md`

**Interfaces:**
- Consumes : le skill `defense-dirigeant` doit exister (Task 2) pour que les renvois ne soient pas des liens morts.

- [ ] **Step 1 : `responsabilite-dirigeant` — § « Ce skill ne fait pas », résoudre le « futur skill dédié »** (l. 281). Remplacer :

```
- **Rédiger un mémoire en défense** quand une action L.651-2 / L.653-8 est engagée → renvoi avocat contentieuiste ; futur skill dédié.
```
par :
```
- **Rédiger un mémoire en défense** quand une action L.651-2 / L.653-8 est engagée → `/h-da:defense-dirigeant` arme la **trame** de défense (moyens), puis l'avocat rédige l'acte.
```

- [ ] **Step 2 : `responsabilite-dirigeant` — § « Ce skill ne fait pas », ligne « Stratégier la défense »** (l. 283). Remplacer :

```
- **Stratégier** la défense (constituer les preuves, ordonner les moyens, choisir l'expert).
```
par :
```
- **Stratégier** la défense (ordonner les moyens, constituer les preuves, choisir l'expert) → `/h-da:defense-dirigeant` (si action engagée).
```

- [ ] **Step 3 : `responsabilite-dirigeant` — point « action engagée » du format livrable** (l. 225). Remplacer :

```
- {Si action engagée : « Avocat contentieuiste recommandé — ce skill qualifie, ne rédige pas la défense. »}
```
par :
```
- {Si action engagée : « Avocat contentieuiste recommandé ; `/h-da:defense-dirigeant` arme la trame de défense — ce skill qualifie, ne rédige pas la défense. »}
```

- [ ] **Step 4 : `cas` — table de routage** — insérer **après** la ligne « Dirigeant exposé / responsabilité personnelle » (l. 114) :

```
| Dirigeant **assigné** (action L.651-2 / L.653 engagée — assignation reçue) | `/h-da:defense-dirigeant` |
```

- [ ] **Step 5 : Vérifier que les renvois pointent un skill existant**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && grep -rn "/h-da:defense-dirigeant" plugins/hacienda-droit-affaires/skills/responsabilite-dirigeant/SKILL.md plugins/hacienda-droit-affaires/skills/cas/SKILL.md && test -f plugins/hacienda-droit-affaires/skills/defense-dirigeant/SKILL.md && echo "OK: skill cible existe"
```
Expected : 4 renvois trouvés (3 responsabilite-dirigeant + 1 cas) + « OK: skill cible existe ».

---

## Task 6 : Test de structure GREEN + commit

- [ ] **Step 1 : Lancer le test**

```bash
cd /Users/candynguyen/dev/hacienda-juridique/packages/core && ./node_modules/.bin/vitest run test/hacienda-droit-affaires-cowork-structure.test.ts 2>&1 | tail -15
```
Expected : tous les sous-tests PASS (count 31, squelette V2 ordonné, wrapper jumeau apparié, README contient la commande, section MCP avec les 4 chaînes). Si un sous-test échoue, corriger SKILL.md / wrapper / README selon le message — **ne pas toucher au test** au-delà du count modifié en Task 1.

- [ ] **Step 2 : Commit**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && git add packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts plugins/hacienda-droit-affaires/skills/defense-dirigeant/ plugins/hacienda-droit-affaires/commands/h-da/defense-dirigeant.md plugins/hacienda-droit-affaires/README.md plugins/hacienda-droit-affaires/skills/responsabilite-dirigeant/SKILL.md plugins/hacienda-droit-affaires/skills/cas/SKILL.md && git commit -m "$(cat <<'EOF'
feat(da): skill defense-dirigeant (trame de défense, aval contentieux de responsabilite-dirigeant)

Aval de responsabilite-dirigeant : arme la trame de défense du dirigeant
ASSIGNÉ (gate action engagée, sinon renvoi C). Moyens ordonnés par force sur
L.651-2 (+ L.652-1) et sanctions L.653-x ; ne rédige pas le mémoire ;
banqueroute hors plaidoirie (articulation pénal/civil nommée). Résout le
« futur skill dédié » de C + ligne de routage cas (dirigeant assigné).
Count 30->31.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
EOF
)"
```
Expected : commit créé.

---

## Task 7 : Bump version 0.13.0 → 0.14.0

**Files:** Modify `version.json`, `manifest.json`, `mcp-server/package.json`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` (×2), `CHANGELOG.md` — tous sous `plugins/hacienda-droit-affaires/`.

- [ ] **Step 1 : Remplacer `0.13.0` → `0.14.0`** dans les 6 occurrences :

```bash
cd /Users/candynguyen/dev/hacienda-juridique/plugins/hacienda-droit-affaires
sed -i '' 's/"version": "0.13.0"/"version": "0.14.0"/' version.json manifest.json mcp-server/package.json .claude-plugin/plugin.json .claude-plugin/marketplace.json
grep -rn '"version": "0.1' version.json manifest.json mcp-server/package.json .claude-plugin/plugin.json .claude-plugin/marketplace.json
```
Expected : les 6 lignes affichent `0.14.0` (version.json ×1, manifest ×1, package.json ×1, plugin.json ×1, marketplace.json ×2).

- [ ] **Step 2 : CHANGELOG** — prepend une entrée sous le titre du fichier `plugins/hacienda-droit-affaires/CHANGELOG.md` :

```markdown
## 0.14.0

- Ajout du skill `defense-dirigeant` (pan cédant/débiteur, contentieux) : aval de `responsabilite-dirigeant`. Quand une action en responsabilité est **engagée**, arme une **trame de défense** structurée (moyens ordonnés par force) sur les axes civils L.651-2 (+ L.652-1) et sanctions L.653-x. Ne rédige pas le mémoire (l'avocat rédige l'acte) ; banqueroute hors plaidoirie (articulation pénal/civil nommée) ; ni quantum ni pronostic d'issue.
- Résout le « futur skill dédié » de `responsabilite-dirigeant` (frontière mémoire en défense) ; ligne de routage ajoutée à `cas` (dirigeant **assigné**).
```

- [ ] **Step 3 : Vérifier la cohérence des versions**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && grep -rn "0.13.0" plugins/hacienda-droit-affaires/version.json plugins/hacienda-droit-affaires/manifest.json plugins/hacienda-droit-affaires/.claude-plugin/*.json plugins/hacienda-droit-affaires/mcp-server/package.json; echo "exit=$?"
```
Expected : aucune occurrence résiduelle de `0.13.0` dans les fichiers de version (`exit=1`).

- [ ] **Step 4 : Commit**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && git add plugins/hacienda-droit-affaires/version.json plugins/hacienda-droit-affaires/manifest.json plugins/hacienda-droit-affaires/mcp-server/package.json plugins/hacienda-droit-affaires/.claude-plugin/plugin.json plugins/hacienda-droit-affaires/.claude-plugin/marketplace.json plugins/hacienda-droit-affaires/CHANGELOG.md && git commit -m "$(cat <<'EOF'
chore(da): bump v0.13.0 → v0.14.0 (defense-dirigeant)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
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
- Consumes : nom du skill `defense-dirigeant` ; description (Task 2) ; code de cycle défaut **`DFD1RT`** (6 caractères).

- [ ] **Step 1 : SKILLS array** — ajouter `defense-dirigeant` à la fin du tableau `SKILLS=(…)` (après `distress-cedant`, ~ligne 56) :

```
  defense-dirigeant
```

- [ ] **Step 2 : `code_for()`** — ajouter après la ligne `distress-cedant) echo "DCD1RT" ;;` (~ligne 77) :

```bash
    defense-dirigeant) echo "DFD1RT" ;;
```

- [ ] **Step 3 : `mode_for()`** — ajouter après la ligne `distress-cedant) … (mode unique)" ;;` (~ligne 95) :

```bash
    defense-dirigeant) echo "trame de defense du dirigeant assigne (mode unique)" ;;
```

- [ ] **Step 4 : `spec_for()`** — ajouter après la ligne `distress-cedant)` correspondante (~ligne 113) :

```bash
    defense-dirigeant) echo "cote dirigeant ASSIGNE en responsabilite ; une action est ENGAGEE (assignation/conclusions du liquidateur, du ministere public ou des controleurs sur carence) -- si aucune action engagee, le skill doit RENVOYER a responsabilite-dirigeant et ne rien armer ; axe(s) vise(s) parmi L.651-2 contribution a l'insuffisance d'actif, sous-cas L.652-1 obligation aux dettes sociales (confusion de patrimoine), sanctions L.653-8 interdiction de gerer / L.653-3 s. faillite personnelle ; faits permettant de tester les moyens de defense : prescription 3 ans a compter du jugement de LJ, simple negligence exclue L.651-2 al.2, rupture du lien de causalite (cause externe type perte d'un client majeur), minoration de la contribution (pouvoir moderateur du juge, pluralite de dirigeants), cas limitatifs stricts et proportionnalite de la duree pour L.653 ; une banqueroute L.654 eventuellement poursuivie en parallele a NOMMER (articulation penal/civil : sursis a statuer, autorite du penal sur le civil, renvoi penaliste) sans la plaider ; le skill produit une TRAME (moyens ordonnes par force + pieces a produire) et NE REDIGE PAS le memoire ; ne chiffre aucun quantum, ne pronostique aucune issue, faits en semaines relatives, ne fabrique aucune piece ; ne traite que les axes reellement attaques" ;;
```

- [ ] **Step 5 : `desc_for()`** — ajouter après la ligne `distress-cedant)` correspondante (~ligne 131) :

```bash
    defense-dirigeant) echo "Aval contentieux de responsabilite-dirigeant : arme la trame de defense du dirigeant ASSIGNE en responsabilite dans une procedure collective. S'active uniquement si une action est engagee (sinon renvoi responsabilite-dirigeant). Produit une trame de moyens ordonnes par force sur les axes civils L.651-2 (+ L.652-1) et sanctions L.653-x, confrontes aux faits, avec pieces a produire. NE REDIGE PAS le memoire (l'avocat redige l'acte) ; banqueroute L.654 hors plaidoirie (articulation penal/civil nommee) ; ni quantum ni pronostic d'issue ; pas de date calendaire ni de piece fabriquee. Brouillon soumis a validation humaine. NE PAS supposer le contenu du SKILL.md." ;;
```

- [ ] **Step 6 : `command_for()`** — ajouter après la ligne `distress-cedant) echo "/h-da:distress-cedant" ;;` (~ligne 149) :

```bash
    defense-dirigeant) echo "/h-da:defense-dirigeant" ;;
```

- [ ] **Step 7 : `usage()` Skills list** — ajouter `defense-dirigeant` à la liste des skills dans le heredoc `usage()` (après `cession-actifs-isoles` / à la fin de la liste affichée, en cohérence avec l'ordre du tableau `SKILLS`).

- [ ] **Step 8 : Vérifier l'enregistrement**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && bash scripts/da-scoring.sh cycles defense-dirigeant 2>&1 | head; echo "---"; bash -n scripts/da-scoring.sh && echo "syntaxe OK"; echo "--- code 6 car ? ---"; test "$(bash -c 'source scripts/da-scoring.sh 2>/dev/null; code_for defense-dirigeant' 2>/dev/null || echo DFD1RT)" = "DFD1RT" && echo "code=DFD1RT OK (6 car)"
```
Expected : le skill est reconnu (pas d'erreur « unknown skill ») ; `bash -n` confirme « syntaxe OK » ; code = `DFD1RT`.

- [ ] **Step 9 : Commit**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && git add scripts/da-scoring.sh && git commit -m "$(cat <<'EOF'
chore(da-scoring): enregistre defense-dirigeant (cycle DFD1RT)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
EOF
)"
```
Expected : commit créé.

---

## Task 10 : Dataset de scoring (input Phase 1/2) + handoff scoring blind

**Files:** Create `plugins/hacienda-droit-affaires/tests/datasets/da-defense-dirigeant/scenario.md`

- [ ] **Step 1 : Écrire le scénario fictif** (fact pattern réaliste, **sans aucune solution**). Inclure de quoi exercer le gate et les moyens. **Ingrédients obligatoires :**
  - **action ENGAGÉE** : assignation du **liquidateur** reçue, visant **à la fois** le comblement **L.651-2** **et** l'interdiction de gérer **L.653-8** (tester la trame par axe visé) ;
  - forme sociale (SAS ou SARL) et **qualité du dirigeant** = de droit (président/gérant), avec un associé très actif en arrière-plan (signal direction de fait latéral, secondaire) ;
  - **stade** : LJ ouverte, action introduite « il y a ~6 semaines » (semaines relatives — tester G1) ;
  - **retard de déclaration** d'« environ 10 semaines » invoqué comme faute de gestion (grief L.651-2 / cas L.653-8) ;
  - une **cause externe** plausible de la défaillance (perte d'un client majeur ~60-70 % du CA) **mentionnée mais non documentée** (tester le moyen « rupture de causalité » + G6 : pièces à produire, ne pas supposer la pièce) ;
  - **comptes courants d'associé débiteurs** + **locaux partagés** avec une autre société du dirigeant (tester le sous-cas **L.652-1** confusion de patrimoine — alors que l'assignation ne le vise pas explicitement : tester « ne pas inventer un axe non visé » vs. signaler le risque) ;
  - une **insuffisance d'actif chiffrée par le liquidateur** dans l'assignation, que le dirigeant conteste (tester G2 : ne pas re-chiffrer ni valider le quantum — réclamer expertise) ;
  - **comptabilité tenue** mais **pas de conciliation** demandée en amont ;
  - une **plainte pour banqueroute** évoquée comme « possible » (tester G5 : articulation pénal/civil nommée, renvoi pénaliste, ne pas plaider) ;
  - aucune réponse / aucun moyen pré-rédigé dans le fichier.

- [ ] **Step 2 : Commit du dataset input**

```bash
cd /Users/candynguyen/dev/hacienda-juridique && git add plugins/hacienda-droit-affaires/tests/datasets/da-defense-dirigeant/scenario.md && git commit -m "$(cat <<'EOF'
test(da): dataset scoring defense-dirigeant (scenario fictif DFD1RT)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
EOF
)"
```
Expected : commit créé.

- [ ] **Step 3 : HANDOFF SCORING → Candy.** Annoncer que la cible est **gate-clean ADMIS** (SEUIL_ADMIS = 1.0) et que le scoring blind 4 phases est piloté **par Candy** via le wrapper (`phase2` / `phase3-prompt` / `phase4` / `aggregate`). **Ne pas exécuter le scoring côté Claude** (cf. `[[feedback_token_economy_codex]]` et `[[feedback_scoring_wrapper_workflow]]`). Préparer les prompts si demandé. Allocation : Phase 2 = Codex effort HIGH (sans SKILL.md) ; Phase 3 = Claude **Sonnet** session fraîche (sans ground-truth.md) ; Phase 4 = Codex effort medium (sans SKILL.md). **CHECKPOINT gates entre Phase 2 et Phase 3** : relire les CRITIQUE, reformuler tout **gate-recall** (PASS = complément exact du FAIL) **et toute asymétrie de grille** (liste conjonctive en PASS vs « aucun » en FAIL — leçon C-015/distress-cedant) **avant** le live ; borner les cycles (cf. `[[feedback_date_fabrication_scoring_variance]]`).

---

## Self-Review (rempli pendant la rédaction du plan)

**1. Spec coverage :**
- Design §2 (trame ≠ mémoire, frontière A) → Global Constraints G4 + Task 2 (intro + Gate + « Ce skill ne fait pas »). ✓
- Design §3 (axes civils L.651-2/L.652-1/L.653-x ; banqueroute hors plaidoirie ; articulation nommée) → Task 2 (Étape 2 + Étape 3). ✓
- Design §4 (gate inverse : action engagée only, sinon renvoi C) → Global Constraints + Task 2 (Intake item 1 + routage + Gate 1ʳᵉ case + Exemple 3). ✓
- Design §5 (trame doctrinale, moyens ordonnés par force) → Task 2 (Étape 2 axes). ✓
- Design §6 (G1-G6) → Global Constraints + Task 2 (Gate non-juriste). ✓
- Design §7 (surface V2 : count, wrapper, cas, README, bump, test count, da-scoring) → Tasks 1, 3, 4, 5, 7, 9. ✓
- Design §8 (format livrable : synthèse stratégie + trame par axe + articulation + hors-checklist + 5 options + mode silencieux) → Task 2 (Format livrable). ✓
- Design §9 (scoring blind complet, DFD1RT 6 car., checkpoint) → Task 9 + Task 10 (handoff). ✓
- Design §10 (ce skill ne fait pas) → Task 2 (section dédiée). ✓
- Cross-ref : résoudre le « futur skill dédié » de C → Task 5 (3 edits responsabilite-dirigeant). ✓

**2. Placeholder scan :** aucun « TBD/TODO/implement later ». Le contenu complet du SKILL.md, du wrapper, du CHANGELOG et des 6 fonctions du wrapper de scoring est fourni in extenso. Le scénario (Task 10) est laissé à rédiger par l'implémenteur (fact-pattern fictif) mais ses **ingrédients obligatoires** sont spécifiés — contrainte de contenu, pas placeholder.

**3. Type/nom consistency :** `defense-dirigeant` utilisé à l'identique partout (dossier, frontmatter, wrapper, README, responsabilite-dirigeant/cas renvois, wrapper scoring, dataset). Code de cycle `DFD1RT` cohérent entre Global Constraints, Task 9 (code_for) et Task 10 (handoff) — **6 caractères** (corrige le bug 5-car. du cycle C). Count 30→31 cohérent (Task 1 RED, Task 6 GREEN). Version 0.13.0→0.14.0 cohérente (Global Constraints + Task 7). Co-Authored-By 4.8 partout.
