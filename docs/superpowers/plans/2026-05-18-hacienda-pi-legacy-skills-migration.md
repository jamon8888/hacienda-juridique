# Hacienda PI Legacy Skills Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrer proprement les skills PI legacy `v0.1` du plugin `hacienda-propriete-intellectuelle` dans un ordre aligné avec le codebase actuel, en stabilisant d'abord les contrats de preuve et d'enforcement puis en traitant les sujets portefeuille, logiciel/data et sunset.

**Architecture:** Le plan ne traite pas ces skills comme neuf réécritures indépendantes. Il part des dépendances réelles déjà présentes dans les workflows modernes du plugin. `depot-preuve-creation` devient le contrat probatoire canonique. `tri-contrefacon` et `mise-en-demeure-pi` sont traités comme une même epic enforcement. `portefeuille-pi` n'est implémenté qu'après décision de modèle produit face aux skills portefeuille déjà existants.

**Tech Stack:** Markdown FR, structure plugin Cowork existante, références juridiques locales sous `plugins/hacienda-propriete-intellectuelle/skills/**/references/`, README/CHANGELOG Markdown, tests structurels/doc si besoin.

**Review source:** analyse codebase du 2026-05-18 sur les renvois legacy et les skills modernes dépendants.

---

## File Structure

### Files to modify

- `plugins/hacienda-propriete-intellectuelle/skills/depot-preuve-creation/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/mise-en-demeure-pi/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/tri-contrefacon/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/revue-open-source/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/revue-logiciel-donnees/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/portefeuille-pi/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/revue-clause-pi/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/strategie-defense-pi/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/clearance-marque/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/README.md`
- `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

### Files likely to modify during consumer realignment

- `plugins/hacienda-propriete-intellectuelle/skills/qualification-oeuvre/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/surveillance-marque/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/tableau-contrefacon-brevet/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/logiciels-pi/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/skills/contrats-pi/SKILL.md`

### Files to create

- `plugins/hacienda-propriete-intellectuelle/skills/depot-preuve-creation/references/preuve-creation-fr.md`
- `plugins/hacienda-propriete-intellectuelle/skills/depot-preuve-creation/references/grille-pieces-par-type.md`
- `plugins/hacienda-propriete-intellectuelle/skills/tri-contrefacon/references/grille-enforcement-marques.md`
- `plugins/hacienda-propriete-intellectuelle/skills/mise-en-demeure-pi/references/lettres-pi-structure.md`
- `plugins/hacienda-propriete-intellectuelle/skills/revue-open-source/references/audit-oss-checklist.md`
- `plugins/hacienda-propriete-intellectuelle/skills/revue-logiciel-donnees/references/chaine-droits-logiciel-data.md`
- `docs/superpowers/specs/2026-05-18-hacienda-pi-portefeuille-federated-hub-design.md` if Phase 4 confirms a separate design is needed

### Files intentionally not changed in this plan

- `packages/core/**`
  - Ce chantier est centré sur les skills Markdown et leur positionnement produit.
- `plugins/hacienda-propriete-intellectuelle/mcp-server/**`
  - Pas de nouveau tool MCP dans ce lot tant que les contrats skill ne sont pas stabilisés.

---

## Phase 0 - Verrouiller le cadre de migration

### Task 0.1: Cartographier les legacy et leur statut cible

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Reclasser chaque skill legacy**

Créer un tableau de statut dans le README plugin avec ces catégories exactes :

```md
| Skill | Statut | Cible |
| --- | --- | --- |
| depot-preuve-creation | legacy v0.1 | migration V1 prioritaire |
| tri-contrefacon | legacy v0.1 | migration V1 prioritaire |
| mise-en-demeure-pi | legacy v0.1 | migration V1 prioritaire |
| revue-open-source | legacy v0.1 | migration V1 ciblée |
| revue-logiciel-donnees | legacy v0.1 | recadrage puis migration |
| portefeuille-pi | legacy v0.1 | cadrage produit préalable |
| revue-clause-pi | legacy v0.1 | migration V1 ciblée |
| strategie-defense-pi | legacy v0.1 | décision alias/orchestrateur/sunset |
| clearance-marque | legacy v0.1 | alias + sunset |
```

- [ ] **Step 2: Ajouter un bloc CHANGELOG de migration**

Insérer un bloc dédié listant les quatre décisions structurantes :
- `depot-preuve-creation` devient la brique probatoire canonique
- `tri-contrefacon` et `mise-en-demeure-pi` migrent ensemble
- `portefeuille-pi` attend une décision de modèle
- `clearance-marque` est en dépréciation dirigée

- [ ] **Step 3: Vérifier la cohérence documentaire**

Run: `rg -n "legacy v0.1|clearance-marque|mise-en-demeure-pi|tri-contrefacon|depot-preuve-creation|portefeuille-pi" plugins/hacienda-propriete-intellectuelle/README.md plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

Expected: le README décrit le statut cible et le CHANGELOG n'expose plus ces skills comme un bloc homogène sans hiérarchie.

---

## Phase 1 - Contrat probatoire canonique

### Task 1.1: Réécrire `depot-preuve-creation` en workflow V1

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/depot-preuve-creation/SKILL.md`
- Create: `plugins/hacienda-propriete-intellectuelle/skills/depot-preuve-creation/references/preuve-creation-fr.md`
- Create: `plugins/hacienda-propriete-intellectuelle/skills/depot-preuve-creation/references/grille-pieces-par-type.md`

- [ ] **Step 1: Remplacer le wrapper v0.1 par une structure V1 complète**

Le skill doit contenir ces sections exactes :

```md
## Role
## Ne fait pas
## Intake
## Mode d'analyse
## Grille des pieces
## Chronologie
## Trous probatoires
## Sortie
## Validation humaine
```

- [ ] **Step 2: Poser cinq modes opérationnels**

Écrire ces modes dans le skill :

```md
- open
- add-evidence
- timeline
- bundle
- review
```

Chaque mode doit produire une sortie distincte et nommée :
- `Evidence Register`
- `Timeline`
- `Proof Gaps`
- `Bundle Checklist`
- `Reviewer Note`

- [ ] **Step 3: Créer la référence juridique et pratique**

`preuve-creation-fr.md` doit couvrir :
- enveloppe Soleau / e-Soleau
- horodatage technique
- constat / commissaire de justice
- email, dépôt Git, cahier de laboratoire, livrables agence
- limites : preuve préparée != force probante définitivement acquise

`grille-pieces-par-type.md` doit contenir des grilles séparées :
- oeuvre graphique
- logiciel
- marque / usage
- opposition / nullité
- dossier précontentieux

- [ ] **Step 4: Vérifier le renvoi depuis les skills modernes**

Run: `rg -n "depot-preuve-creation" plugins/hacienda-propriete-intellectuelle/skills/qualification-oeuvre plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque`

Expected: les consommateurs existent toujours et peuvent consommer un skill V1 plus riche sans contradiction de périmètre.

### Task 1.2: Réaligner les consommateurs du contrat probatoire

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/qualification-oeuvre/SKILL.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur/SKILL.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/SKILL.md`

- [ ] **Step 1: Remplacer les mentions "v0.1"**

Modifier les appels existants pour parler d'un skill de preuve structuré, pas d'un wrapper legacy.

- [ ] **Step 2: Harmoniser la sémantique des sorties**

Utiliser les mêmes noms de sorties dans les skills consommateurs :
- `Evidence Register`
- `Timeline`
- `Proof Gaps`

- [ ] **Step 3: Vérifier le périmètre**

Run: `rg -n "Evidence Register|Timeline|Proof Gaps|depot-preuve-creation" plugins/hacienda-propriete-intellectuelle/skills/qualification-oeuvre plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque`

Expected: plus de mention `v0.1`, et les appels décrivent le bon artefact attendu.

---

## Phase 2 - Epic enforcement partagee

### Task 2.1: Définir l'intake enforcement dans `tri-contrefacon`

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/tri-contrefacon/SKILL.md`
- Create: `plugins/hacienda-propriete-intellectuelle/skills/tri-contrefacon/references/grille-enforcement-marques.md`

- [ ] **Step 1: Réécrire `tri-contrefacon` comme porte d'entrée marques**

Le skill doit intégrer ces sections :

```md
## Role
## Ne fait pas
## Intake
## Qualification
## Score de gravite
## Actions possibles
## Sortie
## Validation humaine
```

- [ ] **Step 2: Définir quatre modes**

Ajouter ces modes exacts :
- `report`
- `attack`
- `defense`
- `watch`

La sortie doit toujours conclure par une action recommandée parmi :
- `watch`
- `soft outreach`
- `mise en demeure`
- `saisie / contentieux`
- `no action`

- [ ] **Step 3: Créer la grille enforcement**

`grille-enforcement-marques.md` doit couvrir :
- usage litigieux
- proximité signe/produits
- urgence commerciale
- pièces minimales
- risques d'abus ou de dossier trop faible

### Task 2.2: Réécrire `mise-en-demeure-pi` sur le contrat enforcement

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/mise-en-demeure-pi/SKILL.md`
- Create: `plugins/hacienda-propriete-intellectuelle/skills/mise-en-demeure-pi/references/lettres-pi-structure.md`

- [ ] **Step 1: Remplacer la logique "lire tri-contrefacon" par un contrat explicite**

Le skill doit annoncer les entrées minimales attendues :
- droits invoqués
- faits résumés
- pièces disponibles
- objectif de ton
- niveau d'escalade

- [ ] **Step 2: Définir quatre modes de lettre**

Ajouter ces modes :
- `draft`
- `review`
- `respond`
- `escalate`

Chaque mode doit produire :
- `Issue Summary`
- `Rights Asserted`
- `Evidence Summary`
- `Draft Position`
- `Reviewer Note`

- [ ] **Step 3: Créer la référence de structure**

`lettres-pi-structure.md` doit couvrir :
- structure lettre amiable
- structure mise en demeure ferme
- réponse à une mise en demeure reçue
- points de sur-promesse à éviter

### Task 2.3: Réaligner les consommateurs enforcement

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/surveillance-marque/SKILL.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/tableau-contrefacon-brevet/SKILL.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/contrefacon-dessin-modele/SKILL.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/contrefacon-droit-auteur/SKILL.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/saisie-contrefacon/SKILL.md`

- [ ] **Step 1: Remplacer les appels legacy imprécis**

Toutes les mentions doivent maintenant distinguer :
- `tri-contrefacon` pour intake/qualification marques
- `mise-en-demeure-pi` pour production de lettre/réponse

- [ ] **Step 2: Retirer les mentions "V0.1"**

Run: `rg -n "V0.1|v0.1|mise-en-demeure-pi|tri-contrefacon" plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi plugins/hacienda-propriete-intellectuelle/skills/surveillance-marque plugins/hacienda-propriete-intellectuelle/skills/tableau-contrefacon-brevet plugins/hacienda-propriete-intellectuelle/skills/contrefacon-dessin-modele plugins/hacienda-propriete-intellectuelle/skills/contrefacon-droit-auteur plugins/hacienda-propriete-intellectuelle/skills/saisie-contrefacon`

Expected: les renvois décrivent le bon usage sans présenter les deux skills comme des wrappers.

---

## Phase 3 - Frontiere logiciel / donnees

### Task 3.1: Spécifier le rôle exact de `revue-open-source`

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/revue-open-source/SKILL.md`
- Create: `plugins/hacienda-propriete-intellectuelle/skills/revue-open-source/references/audit-oss-checklist.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/logiciels-pi/SKILL.md`

- [ ] **Step 1: Repositionner le skill comme audit OSS opérationnel**

Le skill doit annoncer ces entrées :
- SBOM
- liste de dépendances
- repository ou manifest
- policy interne

Les sorties doivent être :
- `License Inventory`
- `Conflict Matrix`
- `Obligations`
- `Remediation Plan`

- [ ] **Step 2: Créer la checklist d'audit**

`audit-oss-checklist.md` doit inclure :
- licences permissives
- copyleft fort/faible
- obligations notice/source
- AGPL et SaaS
- composants non identifiés

- [ ] **Step 3: Réaligner `logiciels-pi`**

Les renvois dans `logiciels-pi` doivent décrire `revue-open-source` comme audit spécialisé, pas comme simple vestige.

### Task 3.2: Spécifier le rôle exact de `revue-logiciel-donnees`

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/revue-logiciel-donnees/SKILL.md`
- Create: `plugins/hacienda-propriete-intellectuelle/skills/revue-logiciel-donnees/references/chaine-droits-logiciel-data.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/qualification-oeuvre/SKILL.md`

- [ ] **Step 1: Repositionner le skill**

Le skill doit traiter :
- titularité code
- contributions salariés / freelances / founders
- datasets et bases de données
- licences entrantes
- chaîne de droits

- [ ] **Step 2: Créer la référence de chaîne de droits**

`chaine-droits-logiciel-data.md` doit couvrir :
- salarié vs prestataire
- apport fondateur
- datasets tiers
- base auteur / base sui generis
- éléments à exiger en due diligence

- [ ] **Step 3: Réaligner `qualification-oeuvre`**

Les renvois doivent montrer que `revue-logiciel-donnees` traite la chaîne de droits logiciel/data, et non l'audit open source.

---

## Phase 4 - Portefeuille PI

### Task 4.1: Cadrer `portefeuille-pi` avant réécriture

**Files:**
- Create: `docs/superpowers/specs/2026-05-18-hacienda-pi-portefeuille-federated-hub-design.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/portefeuille-pi/SKILL.md`

- [ ] **Step 1: Documenter le choix d'architecture**

La spec doit trancher explicitement entre :
- hub fédéré multi-actifs
- orchestrateur de skills existants
- nouveau registre canonique

- [ ] **Step 2: Bloquer la première passe sur un hub fédéré**

Le plan suppose par défaut :
- lecture consolidée de `revue-portefeuille-marques`
- lecture consolidée de `revue-portefeuille-brevets`
- pas de nouvelle source canonique en V1

- [ ] **Step 3: Ajouter une bannière temporaire au skill**

Tant que la spec n'est pas implémentée, `portefeuille-pi` doit se présenter comme point d'entrée en cours de migration vers un hub fédéré.

### Task 4.2: Réécrire `portefeuille-pi` comme hub fédéré

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/portefeuille-pi/SKILL.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-marques/SKILL.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-brevets/SKILL.md`

- [ ] **Step 1: Définir les modes du hub**

Ajouter ces modes :
- `overview`
- `deadlines`
- `risk-report`
- `export`

- [ ] **Step 2: Décrire les sorties fédérées**

La sortie doit au minimum contenir :
- `Asset Overview`
- `Deadlines`
- `Coverage Gaps`
- `Registry Caveats`

- [ ] **Step 3: Vérifier qu'aucune fausse promesse n'est ajoutée**

Run: `rg -n "registre officiel|depot officiel|synchronisation officielle" plugins/hacienda-propriete-intellectuelle/skills/portefeuille-pi plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-marques plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-brevets`

Expected: le wording reste cohérent avec les limites des skills portefeuille existants.

---

## Phase 5 - Skills restants et sunset

### Task 5.1: Migrer `revue-clause-pi`

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/revue-clause-pi/SKILL.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/contrats-pi/SKILL.md`

- [ ] **Step 1: Repositionner le skill**

Le skill doit se présenter comme reviewer ciblé de clauses PI insérées dans des contrats plus larges.

- [ ] **Step 2: Définir ses sorties**

Sorties minimales :
- `Clause Review Table`
- `Risk Notes`
- `Fallback Drafting`
- `Escalation Points`

- [ ] **Step 3: Réaligner `contrats-pi`**

Les renvois depuis `contrats-pi` doivent indiquer quand utiliser `revue-clause-pi` au lieu d'un workflow contrats complet.

### Task 5.2: Décider le sort de `strategie-defense-pi`

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/strategie-defense-pi/SKILL.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md`

- [ ] **Step 1: Choisir explicitement**

Le skill doit devenir exactement l'un de ces trois statuts :
- alias vers `contentieux-pi`
- orchestrateur léger orienté defense
- sunset avec bannière de redirection

- [ ] **Step 2: Réécrire le fichier selon ce choix**

Si alias/sunset, le contenu doit être court, explicite et sans fausse promesse. Si orchestrateur, il doit annoncer un périmètre distinct.

- [ ] **Step 3: Réaligner `contentieux-pi`**

`contentieux-pi` ne doit pas renvoyer vers un skill ambigu sans préciser son rôle.

### Task 5.3: Mettre `clearance-marque` en sunset propre

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/skills/clearance-marque/SKILL.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`

- [ ] **Step 1: Transformer le skill en alias de compatibilité**

Le fichier doit contenir :
- bannière `deprecated`
- redirection vers `recherche-anteriorite-marque`
- cas où le maintien est justifié : compat historique seulement

- [ ] **Step 2: Marquer la dépréciation dans le README**

`clearance-marque` ne doit plus apparaître comme une capability de premier rang.

- [ ] **Step 3: Vérifier les références**

Run: `rg -n "clearance-marque" plugins/hacienda-propriete-intellectuelle`

Expected: les références restantes décrivent soit une compatibilité historique, soit une redirection explicite.

---

## Phase 6 - Verification finale

### Task 6.1: Contrôles de cohérence

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

- [ ] **Step 1: Vérifier qu'il ne reste plus de wording trompeur**

Run: `rg -n "V0.1|v0.1|style Anthropic|ip-legal|wrapper" plugins/hacienda-propriete-intellectuelle`

Expected: plus de branding externe, plus de wording legacy faux sur les skills migrés.

- [ ] **Step 2: Vérifier la table des skills exposés**

Run: `rg -n "clearance-marque|revue-clause-pi|revue-open-source|portefeuille-pi|tri-contrefacon|mise-en-demeure-pi|depot-preuve-creation|revue-logiciel-donnees|strategie-defense-pi" plugins/hacienda-propriete-intellectuelle/README.md`

Expected: chaque skill exposé a un statut clair : migré, fédéré, alias, ou sunset.

- [ ] **Step 3: Vérification repo**

Run:

```bash
npm test
npm run typecheck
npm run build
npm run branding:check
git diff --check
```

Expected: commandes vertes, hors warnings CRLF Windows déjà tolérés par le dépôt.

---

## Commit Strategy

1. `docs(plugin-pi): classify legacy skills and migration targets`
2. `feat(plugin-pi): migrate depot-preuve-creation to V1 evidence workflow`
3. `docs(plugin-pi): realign evidence consumers`
4. `feat(plugin-pi): migrate tri-contrefacon and mise-en-demeure-pi`
5. `docs(plugin-pi): realign enforcement consumers`
6. `feat(plugin-pi): split open-source audit from logiciel-data chain of rights`
7. `spec(plugin-pi): define portefeuille-pi federated hub`
8. `feat(plugin-pi): migrate portefeuille-pi to federated hub`
9. `feat(plugin-pi): migrate revue-clause-pi and sunset legacy aliases`
10. `docs(plugin-pi): finalize README and changelog after legacy migration`

## Exit Criteria

- `depot-preuve-creation` est consommable comme brique probatoire centrale.
- `tri-contrefacon` et `mise-en-demeure-pi` ont un contrat commun explicite.
- `revue-open-source` et `revue-logiciel-donnees` ont des périmètres non ambigus.
- `portefeuille-pi` ne duplique pas les skills portefeuille existants et assume un rôle fédéré clair.
- `clearance-marque` n'est plus présenté comme un vrai skill métier moderne.
- README et CHANGELOG exposent une hiérarchie de maturité crédible.
