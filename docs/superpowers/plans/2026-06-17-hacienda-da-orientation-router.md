# Routeur d'orientation DA — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter au plugin `hacienda-droit-affaires` un skill **routeur d'orientation** — point de départ de toute requête dans Cowork — qui trie par type de dossier, rappelle l'anonymisation avant ingestion de données, et route vers le bon skill (ou sous-routeur), sans exécuter ni produire de livrable juridique.

**Architecture :** Skill V2 conforme au squelette canonique imposé par `hacienda-droit-affaires-cowork-structure.test.ts`. Front-door `/h-da:orientation` + auto-activation ciblée sur formulations vagues. Routeur **agnostique au side** (le side cédant/acquéreur reste demandé par le skill cible). Gate anonymisation branché sur le pré-vol `check-pii` existant. Non-doctrinal → pas de scoring blind, validation par éval de routage live.

**Tech Stack :** Markdown (SKILL.md + wrapper commande), JSON (version/manifest), Vitest (test de structure cowork existant), pas de code TS nouveau.

**Référence design :** `docs/superpowers/specs/2026-06-17-hacienda-da-orientation-router-design.md`.

---

## ⚠️ Placeholder de nommage (lire avant de commencer)

Le nom du skill n'est **pas tranché**. Ce plan utilise `orientation` comme **nom de travail concret** partout. Si un autre nom est retenu (`triage`, `boussole`, `compass`, `dossier`, `start`…), substituer `orientation` dans **exactement** ces emplacements (Tâche 0) :

1. Dossier du skill : `plugins/hacienda-droit-affaires/skills/<NOM>/SKILL.md`
2. Frontmatter `name:` dans ce SKILL.md
3. Wrapper : `plugins/hacienda-droit-affaires/commands/h-da/<NOM>.md`
4. Ligne « Use the `<NOM>` skill » dans le wrapper
5. README : ligne du tableau Commandes `/h-da:<NOM>` + mention périmètre
6. CHANGELOG : entrée de version

Le test `cowork-structure` apparie automatiquement skill ↔ wrapper ↔ README par nom de dossier ; aucune valeur de count n'est liée au nom.

---

## Contraintes imposées par le test (NE PAS dévier)

`packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts` impose à **chaque** skill :

- **Count** : `skillFiles.length` et `commandFiles.length` (lignes 222, 238). Passe de 26 → **27**.
- **Frontmatter** : `version: "2.0.0"` + `argument-hint:` présents, pas de `1.0.0`, pas de CRLF (lignes 227-230).
- **Wrapper jumeau** : `commands/h-da/<NOM>.md` avec `description` et `argument-hint` **identiques** à ceux du SKILL.md (le test ne compare que la 1re ligne du frontmatter — utiliser `description: >` des deux côtés rend l'égalité triviale), contenant « Use the `<NOM>` skill » et `$ARGUMENTS`, et **sans** `/h-droit-affaires:` (lignes 254-263).
- **README** : doit contenir `/h-da:<NOM>` (ligne 273).
- **Section MCP obligatoire** : chaque SKILL.md doit contenir `## Outils MCP à privilégier` ET les chaînes `piste_status`, `legifrance_recherche`, `judilibre_recherche`, `eurlex_recherche` (lignes 333-343). → Le routeur les **mentionne** (il route vers les skills qui les utilisent) même s'il n'en appelle aucun.
- **Squelette V2 ordonné** : `## Examples` → `## Chargement du profil` → `## Intake` → `## Gate non-juriste` → (`## Mode Anno Desktop Optionnel` optionnel) → `## Outils MCP à privilégier` → `## Emplacement des sorties` → `## Sortie` (lignes 345-383).
- **Hygiène renvois** : aucun fichier livré ne doit contenir `/hacienda-droit-affaires:` ni `/hacienda-propriete-intellectuelle:` (lignes 282-293).

---

## File Structure

**Créer :**
- `plugins/hacienda-droit-affaires/skills/orientation/SKILL.md` — le routeur (squelette V2 complet).
- `plugins/hacienda-droit-affaires/commands/h-da/orientation.md` — wrapper mince.

**Modifier :**
- `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts:222` — count 26 → 27.
- `plugins/hacienda-droit-affaires/README.md` — entrée tableau Commandes + ligne périmètre.
- `plugins/hacienda-droit-affaires/skills/entretien-demarrage/SKILL.md` — fix `/h-droit-affaires:` → `/h-da:` (cleanup latent).
- `plugins/hacienda-droit-affaires/version.json` — 0.9.0 → 0.10.0.
- `plugins/hacienda-droit-affaires/manifest.json` — 0.9.0 → 0.10.0.
- `plugins/hacienda-droit-affaires/mcp-server/package.json` — 0.9.0 → 0.10.0.
- `plugins/hacienda-droit-affaires/.claude-plugin/plugin.json` — 0.9.0 → 0.10.0.
- `plugins/hacienda-droit-affaires/.claude-plugin/marketplace.json` — 0.9.0 → 0.10.0 (×2 : lignes 6 et 11).
- `plugins/hacienda-droit-affaires/CHANGELOG.md` — entrée 0.10.0.

---

## Task 0 : Branche de travail

- [ ] **Step 1 : Créer la branche**

Run :
```bash
cd /Users/candynguyen/dev/hacienda-juridique
git switch -c feat/da-orientation-router
```
Expected : `Basculement sur la nouvelle branche 'feat/da-orientation-router'`.

(Le doc de design non commité sur `main` suivra sur la branche — il sera commité en Tâche 5.)

---

## Task 1 : Faire échouer le test de count

**Files:**
- Modify: `packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts:222`

- [ ] **Step 1 : Passer le count à 27**

Remplacer ligne 222 :
```ts
    expect(skillFiles.length).toBe(26);
```
par :
```ts
    expect(skillFiles.length).toBe(27);
```

- [ ] **Step 2 : Lancer le test, vérifier qu'il échoue (RED)**

Run :
```bash
cd /Users/candynguyen/dev/hacienda-juridique
npx vitest run packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts 2>&1 | tee ~/da-orient-test.log; echo "EXIT ${PIPESTATUS[0]}"
```
Lire le résultat avec l'outil Read sur `~/da-orient-test.log` (contourne le tmpfs ENOSPC).
Expected : FAIL sur « declares explicit V2 metadata » — `expected 26 to be 27` (le skill n'existe pas encore).

---

## Task 2 : Créer le skill routeur (conforme au squelette V2)

**Files:**
- Create: `plugins/hacienda-droit-affaires/skills/orientation/SKILL.md`

- [ ] **Step 1 : Écrire le SKILL.md**

Contenu exact (encodage UTF-8, **pas de CRLF**) :

````markdown
---
name: orientation
description: >
  Point de départ de toute requête droit des affaires dans Cowork : aiguille
  l'utilisateur (débutant comme confirmé) qui ne sait pas quel skill lancer, ou
  qui décrit un dossier sans nommer d'outil — « j'ai un dossier de…, par où je
  commence ? », « comment je traite ça ? », « quel outil pour… ? ». Trie par
  TYPE de dossier (contrat / litige-impayé / M&A / entreprise en difficulté /
  créance en procédure / vie sociale), rappelle d'activer l'anonymisation AVANT
  de coller des données client, puis route vers le bon skill ou sous-routeur
  (`asset-vs-share-distress` pour le distressed). Routeur agnostique au side : il
  ne demande pas si tu es cédant ou acquéreur, c'est le skill cible qui le fera.
  Il ORIENTE, il n'exécute pas et ne produit aucune analyse juridique. Ne pas
  déclencher quand l'utilisateur nomme déjà l'action (« révise ce contrat »,
  « rédige une mise en demeure ») : laisser le skill direct s'activer.
argument-hint: "[décris ta situation ou ton type de dossier — ex : « reprise d'une société en difficulté », « contrat reçu à relire », « impayé client »]"
authors: ["Hacienda"]
tags: [orientation, routeur, triage, onboarding, front-door]
---

# Skill — Orientation droit des affaires

> **Le point de départ.** Tu as un dossier mais tu ne sais pas quel outil
> utiliser ? Décris ta situation : je trie, je m'assure que l'anonymisation est
> en place avant que tu colles des données client, et je t'amène au bon skill.
> J'oriente, je n'exécute pas.

## Examples

<example>
<user>j'ai un dossier de reprise d'une boîte en difficulté, par où je commence ?</user>
<response>
1. Lecture du profil cabinet pour pré-classer (position dominante, side principal).
2. Triage : nature = entreprise en difficulté.
3. Gate anonymisation : vérifier que le pré-vol PII / l'anonymisation est actif ;
   sinon avertir et proposer `/anon-on` (ou `/h-da:check-pii`) AVANT de coller
   des pièces.
4. Route : « → `/h-da:asset-vs-share-distress` » (sous-routeur qui décidera
   titres vs actifs et le niveau de difficulté ; il garde son double gate).
   Ne PAS dérouler L.642-x ici.
</response>
</example>

<example>
<user>un client ne me paie pas une facture, qu'est-ce que je peux faire ?</user>
<response>
Triage : nature = litige / impayé. Gate anonymisation rappelé. Route :
« → `/h-da:mise-en-demeure-commerciale` (mise en demeure de payer) ; si la
relation est ancienne et que tu crains une rupture, vois aussi
`/h-da:analyser-rupture-brutale` ». Garde-fou signalé : si le débiteur est en
procédure collective, l'arrêt des poursuites interdit la mise en demeure d'une
créance antérieure → `/h-da:declaration-creance`.
</response>
</example>

<example>
<user>révise ce contrat de distribution</user>
<response>
[Ne PAS s'activer comme routeur.] L'utilisateur nomme l'action : laisser
`reviser-contrat` s'activer directement. Si ce skill s'est déclenché par erreur,
rediriger immédiatement vers `/h-da:reviser-contrat` sans poser de question de
triage.
</response>
</example>

## Chargement du profil

> Au démarrage, lire le profil cabinet partagé
> `~/.claude/plugins/config/hacienda-juridique/company-profile.md` et le profil
> plugin `~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/CLAUDE.md`
> s'ils existent. En extraire **uniquement pour pré-classer les suggestions** :
> `Side principal` (domaine de pratique : M&A / procédures collectives /
> contrats) et `Position dominante` (créancier / débiteur / mandataire).
>
> Ces champs ordonnent les propositions (cabinet procédures collectives →
> remonter `declaration-creance` et le moat distressed en tête). Ils ne
> présument **jamais** du side cédant/acquéreur d'un deal donné — laissé au
> skill cible. Profil absent ou `[A CONFIGURER]` → triage générique + suggérer
> `/h-da:entretien-demarrage`.

## Intake

1. **Détection d'interception** — si l'utilisateur a déjà nommé une action
   précise (« révise », « rédige une mise en demeure », « déclare ma créance »),
   ne pas faire de triage : rediriger vers le skill direct correspondant.
2. **Triage nature** (une question si la nature n'est pas évidente) :
   contrat à relire · contrat à produire · litige / impayé · opération M&A ·
   entreprise en difficulté · créance dans une procédure ouverte · vie sociale
   (AG / pacte / financement).
3. **Gate anonymisation** — avant toute ingestion de pièces : vérifier que le
   pré-vol PII / l'anonymisation est en place. S'appuyer sur le mécanisme
   existant `check-pii` (qui, même en standalone sans ghost, signale les mentions
   sensibles + CTA). Si rien n'est actif et que des données client vont être
   collées : avertir et proposer `/anon-on` (ou `/h-da:check-pii`).
   **Anonymisation d'abord, données ensuite.** Ne pas mapper la nature du dossier
   à un profil d'anon précis (délégué au plugin d'anon ; piste v1.1).
4. **Routage** — annoncer le(s) skill(s) cible(s) et pourquoi, puis passer la
   main. Pour le distressed, router vers `asset-vs-share-distress` sans dérouler
   sa logique.

### Carte de routage (type → skill)

| Nature du dossier | Route vers |
|---|---|
| Contrat entrant à relire | `/h-da:reviser-contrat` · `/h-da:reviser-nda` · `/h-da:revue-tabulaire` |
| Contrat à produire | `/h-da:cgv-generator` · `/h-da:constitution-societe` |
| Litige commercial / impayé | `/h-da:mise-en-demeure-commerciale` · `/h-da:analyser-rupture-brutale` |
| Opération M&A (cible saine) | `/h-da:loi-term-sheet` → `/h-da:due-diligence-dataroom` → `/h-da:spa-review` → `/h-da:gap-review` → `/h-da:closing-checklist-fr` |
| Entreprise en difficulté | → `/h-da:asset-vs-share-distress` (sous-routeur) |
| Créance dans une procédure ouverte | `/h-da:declaration-creance` |
| Vie sociale (AG / pacte / financement) | `/h-da:gouvernance-ag` · `/h-da:pacte-associes-review` · `/h-da:financement-startup` |

## Gate non-juriste

Si l'utilisateur n'est pas juriste ou avocat, produire une orientation
opérationnelle, signaler les limites, refuser toute conclusion présentée comme
avis juridique final et demander validation par un professionnel habilité avant
usage externe.

## Outils MCP à privilégier

**Ce routeur n'appelle aucun outil MCP directement** : il oriente vers les skills
qui les utilisent. Les outils du serveur `Hacienda Droit des Affaires` — notamment
`piste_status`, `legifrance_recherche`, `judilibre_recherche`, `eurlex_recherche`,
`bodacc_procedures`, `company_full_profile` — sont mobilisés par les skills cibles,
pas par l'orientation. Ne pas inventer de tool ; toute source non consultée
directement reste `[à vérifier]`.

## Emplacement des sorties

La recommandation d'orientation est conversationnelle et éphémère. Si l'utilisateur
demande une trace écrite, l'écrire dans
`~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/outputs/`.

## Sortie

Structurer la sortie d'orientation par : nature retenue du dossier · état de
l'anonymisation (et CTA si inactive) · skill(s) recommandé(s) avec une phrase de
justification chacun · garde-fous éventuels (ex : arrêt des poursuites si
procédure collective) · invitation à lancer le skill cible. Aucune analyse
juridique de fond. Toute orientation reste un aiguillage, pas un avis.

---

> Aiguillage — l'analyse juridique est produite par le skill cible, soumise à
> **validation humaine** avant tout usage externe.
````

- [ ] **Step 2 : Vérifier l'absence de CRLF**

Run :
```bash
cd /Users/candynguyen/dev/hacienda-juridique
file plugins/hacienda-droit-affaires/skills/orientation/SKILL.md; grep -c $'\r' plugins/hacienda-droit-affaires/skills/orientation/SKILL.md; echo "CRLF count above (doit être 0)"
```
Expected : count `0`.

---

## Task 3 : Créer le wrapper de commande jumeau

**Files:**
- Create: `plugins/hacienda-droit-affaires/commands/h-da/orientation.md`

- [ ] **Step 1 : Écrire le wrapper**

Le `description: >` et la ligne `argument-hint:` doivent être **identiques** à ceux du SKILL.md (le test compare la 1re ligne du frontmatter ; `>` des deux côtés + argument-hint au caractère près). Contenu exact :

````markdown
---
description: >
  Point de départ de toute requête droit des affaires dans Cowork : aiguille
  l'utilisateur (débutant comme confirmé) qui ne sait pas quel skill lancer, ou
  qui décrit un dossier sans nommer d'outil — « j'ai un dossier de…, par où je
  commence ? », « comment je traite ça ? », « quel outil pour… ? ». Trie par
  TYPE de dossier (contrat / litige-impayé / M&A / entreprise en difficulté /
  créance en procédure / vie sociale), rappelle d'activer l'anonymisation AVANT
  de coller des données client, puis route vers le bon skill ou sous-routeur
  (`asset-vs-share-distress` pour le distressed). Routeur agnostique au side : il
  ne demande pas si tu es cédant ou acquéreur, c'est le skill cible qui le fera.
  Il ORIENTE, il n'exécute pas et ne produit aucune analyse juridique. Ne pas
  déclencher quand l'utilisateur nomme déjà l'action (« révise ce contrat »,
  « rédige une mise en demeure ») : laisser le skill direct s'activer.
argument-hint: "[décris ta situation ou ton type de dossier — ex : « reprise d'une société en difficulté », « contrat reçu à relire », « impayé client »]"
---

Use the `orientation` skill with these arguments:

$ARGUMENTS

Delegate all triage, routing, anonymization-gate and validation-human guardrails to the skill. Do not duplicate or reinterpret the business logic in this command wrapper.
````

- [ ] **Step 2 : Vérifier l'absence de CRLF**

Run :
```bash
cd /Users/candynguyen/dev/hacienda-juridique
grep -c $'\r' plugins/hacienda-droit-affaires/commands/h-da/orientation.md; echo "doit être 0"
```
Expected : `0`.

---

## Task 4 : Référencer le skill dans le README

**Files:**
- Modify: `plugins/hacienda-droit-affaires/README.md`

- [ ] **Step 1 : Ajouter la ligne dans le tableau Commandes**

Dans le tableau « Commandes » (après la ligne `/h-da:loi-term-sheet`, en respectant l'ordre alphabétique → insérer juste avant `/h-da:pacte-associes-review`), ajouter :
```markdown
| `/h-da:orientation` | Point de départ : décris ton dossier, je trie et je route vers le bon skill (rappelle l'anonymisation avant les données). |
```

- [ ] **Step 2 : Ajouter une mention dans le bloc Périmètre V2**

Dans la table « Périmètre V2 » (section en haut du README), ajouter une ligne :
```markdown
| Orientation / triage | `orientation` |
```

- [ ] **Step 3 : Vérifier qu'aucun préfixe périmé n'a été introduit**

Run :
```bash
cd /Users/candynguyen/dev/hacienda-juridique
grep -n "/h-droit-affaires:\|/hacienda-droit-affaires:" plugins/hacienda-droit-affaires/README.md; echo "EXIT $? (1 = aucune occurrence, OK)"
```
Expected : aucune occurrence (EXIT 1).

---

## Task 5 : Faire passer le test de structure (GREEN)

**Files:** (aucune nouvelle modif — validation)

- [ ] **Step 1 : Lancer le test cowork-structure**

Run :
```bash
cd /Users/candynguyen/dev/hacienda-juridique
npx vitest run packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts 2>&1 | tee ~/da-orient-test.log; echo "EXIT ${PIPESTATUS[0]}"
```
Lire `~/da-orient-test.log` via l'outil Read.
Expected : tous les `it(...)` PASS — notamment count 27, squelette V2, wrapper jumeau, README, section MCP. Si un sous-test échoue, corriger le SKILL.md / wrapper / README selon le message (ne PAS toucher au test au-delà du count de la Tâche 1).

- [ ] **Step 2 : Commit (skill + wrapper + README + test + design doc)**

```bash
cd /Users/candynguyen/dev/hacienda-juridique
git add plugins/hacienda-droit-affaires/skills/orientation/SKILL.md \
        plugins/hacienda-droit-affaires/commands/h-da/orientation.md \
        plugins/hacienda-droit-affaires/README.md \
        packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts \
        docs/superpowers/specs/2026-06-17-hacienda-da-orientation-router-design.md \
        docs/superpowers/plans/2026-06-17-hacienda-da-orientation-router.md
git commit -m "feat(da): skill routeur orientation (point d'entrée triage + gate anonymisation)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 6 : Cleanup — préfixe périmé dans entretien-demarrage

**Files:**
- Modify: `plugins/hacienda-droit-affaires/skills/entretien-demarrage/SKILL.md`

- [ ] **Step 1 : Localiser les occurrences**

Run :
```bash
cd /Users/candynguyen/dev/hacienda-juridique
grep -n "/h-droit-affaires:" plugins/hacienda-droit-affaires/skills/entretien-demarrage/SKILL.md
```
Expected : occurrences aux lignes ~27, 40, 48 (exemples `<user>`) et ~183 (bloc « Prochaines étapes »).

- [ ] **Step 2 : Remplacer `/h-droit-affaires:` par `/h-da:`**

Éditer chaque occurrence : `/h-droit-affaires:entretien-demarrage` → `/h-da:entretien-demarrage`, et dans le bloc « Prochaines étapes » `/h-droit-affaires:reviser-contrat` → `/h-da:reviser-contrat`, `/h-droit-affaires:declaration-creance` → `/h-da:declaration-creance`.

- [ ] **Step 3 : Vérifier**

Run :
```bash
cd /Users/candynguyen/dev/hacienda-juridique
grep -c "/h-droit-affaires:" plugins/hacienda-droit-affaires/skills/entretien-demarrage/SKILL.md; echo "doit être 0"
```
Expected : `0`.

- [ ] **Step 4 : Commit**

```bash
cd /Users/candynguyen/dev/hacienda-juridique
git add plugins/hacienda-droit-affaires/skills/entretien-demarrage/SKILL.md
git commit -m "fix(da): corrige le préfixe périmé /h-droit-affaires: -> /h-da: dans entretien-demarrage

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 7 : Bump de version 0.9.0 → 0.10.0

**Files:**
- Modify: `version.json`, `manifest.json`, `mcp-server/package.json`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` (×2), `CHANGELOG.md`

- [ ] **Step 1 : Mettre à jour les 6 occurrences**

Dans chacun, remplacer `"version": "0.9.0"` par `"version": "0.10.0"` :
- `plugins/hacienda-droit-affaires/version.json` (1×)
- `plugins/hacienda-droit-affaires/manifest.json` (1×, ligne 5)
- `plugins/hacienda-droit-affaires/mcp-server/package.json` (1×, ligne 3)
- `plugins/hacienda-droit-affaires/.claude-plugin/plugin.json` (1×, ligne 3)
- `plugins/hacienda-droit-affaires/.claude-plugin/marketplace.json` (2×, lignes 6 et 11)

- [ ] **Step 2 : Ajouter l'entrée CHANGELOG**

En tête de `plugins/hacienda-droit-affaires/CHANGELOG.md`, sous le titre, ajouter :
```markdown
## 0.10.0

- feat: skill `orientation` — point d'entrée de triage/routage du plugin
  (front-door `/h-da:orientation` + auto-activation sur formulations vagues).
  Trie par type de dossier, rappelle l'anonymisation avant ingestion de données,
  route vers le bon skill ou sous-routeur. Routeur agnostique au side,
  non-doctrinal (pas de scoring blind). Skills : 26 → 27.
- fix: préfixe périmé `/h-droit-affaires:` → `/h-da:` dans `entretien-demarrage`.
```

- [ ] **Step 3 : Vérifier la cohérence des versions**

Run :
```bash
cd /Users/candynguyen/dev/hacienda-juridique
npx vitest run packages/core/test/hacienda-droit-affaires-cowork-structure.test.ts -t "aligns visible plugin versions" 2>&1 | tee ~/da-orient-test.log; echo "EXIT ${PIPESTATUS[0]}"
```
Lire `~/da-orient-test.log`. Expected : PASS (plugin.json = version.json = mcp-server/package.json = 0.10.0).

- [ ] **Step 4 : Commit**

```bash
cd /Users/candynguyen/dev/hacienda-juridique
git add plugins/hacienda-droit-affaires/version.json \
        plugins/hacienda-droit-affaires/manifest.json \
        plugins/hacienda-droit-affaires/mcp-server/package.json \
        plugins/hacienda-droit-affaires/.claude-plugin/plugin.json \
        plugins/hacienda-droit-affaires/.claude-plugin/marketplace.json \
        plugins/hacienda-droit-affaires/CHANGELOG.md
git commit -m "release(da): bump v0.9.0 -> v0.10.0 - skill orientation (routeur d'entrée)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 8 : Vérification globale du dépôt

- [ ] **Step 1 : Suite de tests + typecheck + branding**

Run (chacun avec redirection log + Read, à cause du tmpfs) :
```bash
cd /Users/candynguyen/dev/hacienda-juridique
npm test 2>&1 | tee ~/da-orient-npmtest.log; echo "EXIT ${PIPESTATUS[0]}"
```
Lire `~/da-orient-npmtest.log`. Expected : vert. Garde-fou (handoff) : un smoke test `sources-officielles` rouge = panne PISTE externe (403/503), **pas** une régression — le blanchir via `git diff --name-only main...HEAD` (le diff ne touche aucun fichier core/sources-officielles).

```bash
cd /Users/candynguyen/dev/hacienda-juridique
npm run typecheck 2>&1 | tee ~/da-orient-tc.log; echo "EXIT ${PIPESTATUS[0]}"
npm run branding:check 2>&1 | tee ~/da-orient-brand.log; echo "EXIT ${PIPESTATUS[0]}"
git diff --check
```
Lire les logs. Expected : typecheck OK, branding OK, pas d'erreur whitespace.

---

## Task 9 : Éval de routage live (validation non-doctrinale)

Le routeur n'a pas de scoring blind. À la place, vérifier le **routage** sur ~15 formulations. Exécuter en **Sonnet** (barre représentative Cowork).

- [ ] **Step 1 : Dérouler le jeu de formulations**

Pour chaque entrée, vérifier que le routeur (ou l'auto-activation) produit la cible attendue. Cibles attendues :

| # | Formulation | Routage attendu |
|---|---|---|
| 1 | « j'ai un dossier de reprise d'une boîte en difficulté » | `asset-vs-share-distress` + gate anon |
| 2 | « un client ne paie pas sa facture » | `mise-en-demeure-commerciale` |
| 3 | « on me notifie la fin d'un contrat de distri après 12 ans » | `analyser-rupture-brutale` |
| 4 | « je dois déclarer une créance, la boîte est en redressement » | `declaration-creance` |
| 5 | « on veut racheter une PME saine » | `loi-term-sheet` (entrée chaîne M&A) |
| 6 | « il faut convoquer l'AG annuelle » | `gouvernance-ag` |
| 7 | « je relis un pacte d'associés » | `pacte-associes-review` |
| 8 | « on lève des fonds, des BSA-AIR » | `financement-startup` |
| 9 | « créer une SAS » | `constitution-societe` |
| 10 | « rédiger des CGV » | `cgv-generator` |
| 11 | « j'ai 30 contrats à passer en revue » | `revue-tabulaire` |
| 12 | « la cible a cessé ses paiements depuis 3 mois, rien de déposé » | `asset-vs-share-distress` (qui renverra `prevention-difficultes`) |
| 13 | **piège** « révise ce contrat » | NE PAS router — laisser `reviser-contrat` |
| 14 | **piège** « rédige une mise en demeure » | NE PAS router — laisser `mise-en-demeure-commerciale` |
| 15 | **gate** « voici les pièces du dossier client [PII] » sans anon active | déclencher le gate anonymisation AVANT routage |

- [ ] **Step 2 : Consigner**

Noter taux de réussite et tout faux-déclenchement (pièges 13-14) ou gate manqué (15). Si un piège échoue (le routeur intercepte une invocation directe), durcir la `description` du SKILL.md (négatif plus explicite) puis re-dérouler. Aucune modif du test automatisé pour ça.

---

## Self-Review (effectué à la rédaction)

- **Couverture spec** : §1-2 (problème/objectif) → Tâches 2-4 ; §3 (3 couches) → reflété dans « Chargement du profil » (lit défauts) + gate (Intake) ; §4 (agnostique side) → frontmatter + Chargement du profil ; §5 (déclenchement/non-interception) → description en négatif + exemple piège + Intake step 1 ; §6 (flux + carte) → Intake + carte de routage ; §7 (gate anon réflexe, pas mapping) → Intake step 3 ; §8 (hors scope) → pas de branche reprise, pas de mapping profil ; §9 (méthodo) → Tâche 9, pas de Codex ; §10 (surface technique) → Tâches 1,3,4,7 + fix entretien Tâche 6.
- **Placeholders** : aucun « TBD/TODO » ; le seul placeholder est le NOM, explicitement paramétré en Tâche 0 avec liste d'emplacements.
- **Cohérence des noms** : `orientation` partout (skill dir = name frontmatter = wrapper = README = CHANGELOG) ; count `27` cohérent (Tâches 1 et 5) ; version `0.10.0` cohérente (Tâche 7).
- **Contrainte test corrigée vs spec** : le spec disait « moule V2 allégé, pas d'outils MCP » ; le test impose le squelette complet + noms d'outils MCP → le SKILL.md inclut la section `## Outils MCP à privilégier` (déclare n'en appeler aucun). Documenté en tête de plan.
