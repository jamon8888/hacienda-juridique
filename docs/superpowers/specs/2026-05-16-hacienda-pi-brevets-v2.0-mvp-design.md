# Hacienda PI — Bloc Brevets V2.0 MVP — Design

**Date** : 2026-05-16
**Plugin** : `hacienda-propriete-intellectuelle` v0.4.0 (extension de v0.3.0)
**Auteur** : Claude (mode autonome, brainstorming court)
**Base** : V1.0 (PR #1) + V1.1.0 (PR #2)

---

## 1. Objectifs

Combler le **trou principal** du plugin PI : aucun skill brevet n'existe aujourd'hui. V2.0 livre un MVP brevets opérationnel autour de 3 workflows clés du doc d'origine (`plan-propriete-intellectuelle-fr.md` §4) :

1. **`recherche-anteriorite-brevet`** — prior art search via INPI + OEB Espacenet, équivalent brevets de `recherche-anteriorite-marque` V1.0.
2. **`preparation-depot-brevet`** — préparation dossier dépôt FR national / EP / PCT, structure description + revendications + abrégé (CPI L.611-1).
3. **`tableau-contrefacon-brevet`** — claim chart Harvey-grade : confrontation revendications × documentation technique du produit incriminé, théorie de l'équivalence (CPI L.613-3, Cour de cass. com. 5 mai 2009). **Workflow le plus structurant du bloc**.

Avec :
- 1 nouveau connecteur OEB Espacenet (`espacenet_search` + `espacenet_document_details`)
- 1 extension INPI Data brevets (méthode `searchBrevets` + `getBrevetDetails`)
- 2 nouveaux tools MCP : `inpi_search_brevets`, `inpi_brevet_details`, `espacenet_search`, `espacenet_brevet_details` (4 tools au total V2.0)
- Référentiel `classifications-cib.md` (Classification Internationale des Brevets)
- Référentiel `articles-cpi-brevets.md` (L.611-1 à L.615-5)

Bump plugin v0.3.0 → v0.4.0.

## 2. Non-objectifs

Hors scope V2.0, traités en V2.1+ :
- `analyse-refus-inpi` (office action analysis : refus INPI / Communication OEB Rule 132 EPC) — V2.1
- `anteriorite-invalidite` (argumentation nullité pour action contrefaçon) — V2.1
- `strategie-extension-internationale` (arbre décisionnel EP / PCT / national) — V2.2
- `revue-portefeuille-brevets` (tabular review, dépend du dashboard HTML V1.1.1) — V2.2
- Google Patents connecteur (recherche complémentaire) — V2.1
- WIPO PCT connecteur — V2.2
- Agent `annuites-brevets` (intégration `echeances-pi`) — V3.0+
- Tout connecteur USPTO ou jurisprudence brevets US — hors scope (le plugin est francophone)

## 3. Architecture

### 3.1 Plugin étendu

```
plugins/hacienda-propriete-intellectuelle/                v0.4.0
├── .claude-plugin/plugin.json                            [BUMP] 0.4.0
├── CLAUDE.md                                             [PATCH] section "Brevets" ajoutée au profil pratique
│
├── skills/
│   ├── recherche-anteriorite-brevet/                     [NEW]
│   │   ├── SKILL.md                                       (~400-500 lignes, style Anthropic FR)
│   │   └── references/
│   │       └── classifications-cib.md                     (CIB principale + bonnes pratiques)
│   ├── preparation-depot-brevet/                         [NEW]
│   │   ├── SKILL.md                                       (~300-400 lignes)
│   │   └── references/
│   │       └── structure-revendications.md                (modèles revendications + L.611-1)
│   ├── tableau-contrefacon-brevet/                       [NEW]
│   │   ├── SKILL.md                                       (~400-500 lignes, claim chart Harvey-grade)
│   │   └── references/
│   │       └── theorie-equivalence.md                     (L.613-3 + jurisprudence Cour de cass.)
│   └── (V1.0 + V1.1.0 + 9 skills v0.1)                  [INCHANGÉ]
│
├── agents/                                               [INCHANGÉ V2.0]
│
├── references/
│   ├── ressources-pi-fr.md                               [PATCH] section "Brevets - bases techniques"
│   └── articles-cpi-brevets.md                           [NEW] L.611-1 à L.615-5 référencés
│
└── mcp-server/                                           [REBUILD] expose les 4 nouveaux tools
```

### 3.2 Extensions de `@hacienda/core`

```
packages/core/src/
├── sources/
│   ├── inpi-brevets.ts                                   [NEW] client Data INPI brevets
│   └── espacenet.ts                                      [NEW] client OEB Espacenet (Open Patent Services API)
└── tools/
    ├── inpi-search-brevets.ts                            [NEW]
    ├── inpi-brevet-details.ts                            [NEW]
    ├── espacenet-search.ts                               [NEW]
    └── espacenet-brevet-details.ts                       [NEW]
```

### 3.3 Configuration utilisateur

Nouvelles variables d'env attendues dans `.claude/settings.local.json` :
- `INPI_DATA_LOGIN` / `INPI_DATA_PASSWORD` (déjà V1.0, partage)
- `OEB_CONSUMER_KEY` / `OEB_CONSUMER_SECRET` (NEW — OEB OPS API utilise OAuth2 client_credentials)

## 4. Adaptations FR vs doc origine Harvey

| Harvey (US) | Hacienda (FR/EU) |
|---|---|
| USPTO Patent Center | INPI Data brevets + OEB Espacenet OPS |
| Obviousness §103 USC | Activité inventive L.611-10 CPI (approche **problème-solution OEB**) |
| Anticipation §102 USC | Nouveauté L.611-11 CPI (état de la technique) |
| Doctrine of equivalents (Festo) | Théorie de l'équivalence — CPI L.613-3, Cour de cass. com. 5 mai 2009 |
| Markman hearing claim construction | Interprétation des revendications par TJ Paris (juge unique compétent CPI L.615-1) |
| Patent agent privilege Queen's | Mandataire en brevets inscrit OEB (EQE) ou avocat |
| Continuation / CIP | Demande divisionnaire (CPI L.612-4) |
| IPR / PGR USPTO | Nullité INPI (L.613-25) / Action en nullité TJ Paris |
| MPEP | Lignes directrices INPI Brevets + Directives examen OEB |

## 5. Le skill `recherche-anteriorite-brevet`

### 5.1 Frontmatter

```yaml
---
name: recherche-anteriorite-brevet
description: >
  Recherche d'antériorité brevet (prior art) — INPI Data + OEB Espacenet —
  produit une liste de signaux pour décision mandataire/avocat, jamais une
  opinion de brevetabilité. À utiliser avant un dépôt brevet, pour une étude
  de liberté d'exploitation (FTO), ou pour préparer une argumentation
  nouveauté/activité inventive. Ce skill ne conclut JAMAIS qu'une invention
  est brevetable.
argument-hint: "[description invention | codes CIB | territoires FR/EP/PCT]"
---
```

### 5.2 Sections (calque `recherche-anteriorite-marque` V1.0 adapté brevets)

1. **Garde-fou en tête** : ce n'est PAS une opinion de brevetabilité ni FTO ; mandataire brevets ou avocat évalue.
2. **Chargement profil** : rôle (avocat / mandataire en brevets / non-juriste), juridictions inscrites (INPI/OEB), posture, approbateurs.
3. **Intake** : description invention (problème technique + solution), codes CIB connus ou à proposer, territoires cibles (FR seul / EP / PCT), date de priorité revendiquée.
4. **Recherche multi-sources** :
   - **MCP `espacenet_search`** : recherche par mots-clés + CIB + date publication. Espacenet couvre 160M+ documents brevets mondiaux.
   - **MCP `inpi_search_brevets`** : recherche dans la base nationale FR (compléments locaux).
   - Fallback si pas de connecteur : annonce explicite "Aucune base interrogée".
5. **Classification de l'art antérieur** (cadre OEB) :
   - **X** = antériorité destructrice de nouveauté
   - **Y** = antériorité destructrice d'activité inventive en combinaison
   - **A** = état de la technique pour information
   - **E** = demande antérieure non publiée (antériorité relative)
6. **Adjacent fields sweep** : explorer les CIB voisines (compositions, procédés liés), littérature non-brevet (NPL) flaggée comme à compléter manuellement.
7. **Appréciation nouveauté + activité inventive** (cadre OEB problème-solution) :
   - Identifier l'**état de la technique le plus proche** (closest prior art)
   - Définir le **problème technique objectif**
   - Évaluer si la solution **découlait de manière évidente** pour l'homme du métier
   - **Skill ne conclut pas** — flags pour mandataire
8. **Format de sortie** template Markdown inline (calque V1.0) avec triage 🟢/🟡/🔴.
9. **Gate non-juriste** + emplacement sortie + "Ne fait pas" + ton.

## 6. Le skill `preparation-depot-brevet`

### 6.1 Frontmatter

```yaml
---
name: preparation-depot-brevet
description: >
  Aide à la préparation d'un dossier de dépôt brevet (FR national, EP, ou
  PCT). Structure la description, les revendications (indépendantes +
  dépendantes), l'abrégé, et la classification CIB proposée. Conforme CPI
  L.611-1 et Règlement EPC. Ne dépose PAS — la décision et le dépôt formel
  restent au mandataire brevets ou avocat.
argument-hint: "[invention | classes CIB | territoire FR/EP/PCT]"
---
```

### 6.2 Sections

1. Garde-fou : préparation ≠ dépôt ; mandataire/avocat valide et dépose.
2. Chargement profil.
3. Intake : description fonctionnelle invention (1-2 paragraphes), domaine technique, problème résolu, solution apportée, mode(s) de réalisation, art antérieur connu de l'inventeur, territoire(s) cibles.
4. **Structure CPI L.611-1** :
   - **Titre** (concis, ≤ 15 mots, sans terme commercial)
   - **Abrégé** (≤ 150 mots, ≤ 1500 caractères)
   - **Description** (introduction + état antérieur de la technique + problème technique + exposé invention + brève description figures + description détaillée mode(s) réalisation)
   - **Revendications** (indépendantes : caractéristiques techniques essentielles ; dépendantes : variantes ; numérotation et renvois)
   - **Dessins** (si pertinent, numérotation références cohérente avec description)
5. **Rédaction revendications** : guide bonnes pratiques (préambule + caractéristique distinctive, single-claim vs multi-claim, comparaison FR/EP/PCT). Référence `references/structure-revendications.md`.
6. **Choix territoire** : arbre décisionnel rapide FR national / EP direct / PCT (différé `strategie-extension-internationale` V2.2 pour la version complète).
7. **Vérifications avant dépôt** : checklist (brevetabilité L.611-10 → exclusions ; unité d'invention ; suffisance description ; non-extension ; revendications supportées par la description).
8. **Sortie** : dossier de dépôt brouillon en sections Markdown structurées, prêt à transmettre au mandataire.
9. Gate non-juriste + emplacement + ne fait pas + ton.

## 7. Le skill `tableau-contrefacon-brevet` (claim chart Harvey-grade)

**LE workflow phare** du bloc brevets. Référence directe au doc origine §4.1.

### 7.1 Frontmatter

```yaml
---
name: tableau-contrefacon-brevet
description: >
  Claim chart — confrontation des revendications d'un brevet (FR / EP / PCT)
  contre la documentation technique d'un produit incriminé, élément par
  élément. Évalue contrefaçon littérale ET contrefaçon par équivalence
  (CPI L.613-3, Cour de cass. com. 5 mai 2009). Produit un tableau
  exploitable par mandataire/avocat pour préparer mise en demeure, saisie-
  contrefaçon ou action TJ Paris. Ne conclut PAS à la contrefaçon — qualification
  juridique = avocat.
argument-hint: "[num brevet | doc produit | théorie : littérale/équivalence/les deux]"
---
```

### 7.2 Sections (workflow doc origine §4.1, étoffé)

1. **Garde-fou** : confrontation ≠ décision contrefaçon ; mandataire/avocat qualifie.
2. **Chargement profil**.
3. **Intake** :
   - Brevet : numéro FR/EP ou PDF fascicule (déclencher `inpi_brevet_details` ou `espacenet_brevet_details` si numéro)
   - Documentation produit incriminé : specs, notices, fiches produit (uploads / colle utilisateur)
   - Théorie souhaitée : contrefaçon littérale uniquement, équivalence uniquement, ou les deux

4. **Étape 1 — Extraction des revendications** :
   - Identifier revendications indépendantes + dépendantes pertinentes
   - Décomposer chaque revendication en **éléments constitutifs numérotés** (méthode standard mandataires)

5. **Étape 2 — Lecture documentation technique** :
   - Pour chaque élément constitutif : localiser la description/illustration correspondante dans les documents produit
   - Citer la source (page, section, référence figure)

6. **Étape 3 — Génération du tableau (claim chart)** :

   | Élément revendiqué | Texte revendication | Correspondance produit | Source | Statut |
   |---|---|---|---|---|

   Statut par ligne :
   - ✅ Couvert (correspondance littérale claire)
   - ⚠️ Couverture partielle (élément partiellement présent ou variante)
   - ❌ Absent
   - ❓ À vérifier (doc incomplète)

7. **Étape 4 — Analyse contrefaçon par équivalence** (CPI L.613-3) :
   - Pour les éléments ❌ absents en littéralité : analyser si le produit met en œuvre un **moyen équivalent**
   - Critère **Cour de cass. com. 5 mai 2009** (n°08-13.586) : "Constitue une contrefaçon par équivalents le fait pour un tiers d'utiliser un moyen qui, sous une forme différente, exerce la même fonction en vue d'obtenir un résultat de même nature."
   - Pour chaque équivalence : justifier **même fonction + même résultat + voies substantiellement identiques**

8. **Étape 5 — Recommandation** :
   - **Contrefaçon littérale** : éléments concernés, arguments, forces/faiblesses
   - **Contrefaçon par équivalence** : argumentation et risques
   - **Priorité d'action** : `mise-en-demeure-pi` / `saisie-contrefacon` (V6 future) / `action-contrefacon` (V6 future) directe TJ Paris (compétence exclusive L.615-1)

9. **Format de sortie** : template Markdown avec le claim chart en table + analyse équivalence + recommandation bucketée.

10. Gate non-juriste + emplacement + ne fait pas + ton.

## 8. Connecteur OEB Espacenet (OPS — Open Patent Services)

### 8.1 Discovery (Phase 0)

Endpoint OEB OPS : `https://ops.epo.org/3.2/rest-services/`. Auth : OAuth2 client_credentials. Quota gratuit : 4 Go/semaine (largement suffisant).

Tools exposés :
- `espacenet_search(query, cib, datePublicationMin, datePublicationMax, limite)` → liste de brevets avec numéro EP/WO, titre, classificiation CIB, date publication, déposant
- `espacenet_brevet_details(numero)` → fiche complète : revendications, description, statut légal, citations, famille de brevets

### 8.2 Schéma Zod (à confirmer en discovery)

```ts
EspacenetBrevetSchema = z.object({
  numero: z.string(),                                    // EP1234567, WO2020/123456
  titre: z.string(),
  classificationCIB: z.array(z.string()),                // codes CIB hiérarchiques
  deposant: z.string(),
  datePublication: z.string(),
  datePriorite: z.string().nullable(),
  abregeText: z.string().nullable(),
  urlEspacenet: z.string(),
});
```

## 9. Critères de succès V2.0

- [ ] `npm test` vert (≥ 240 tests = 236 V1.1.0 + ~5-7 nouveaux)
- [ ] `npm run typecheck`, `npm run build`, `npm run branding:check` verts
- [ ] Un utilisateur avec un compte Data INPI peut lancer `/recherche-anteriorite-brevet "système de filtration eau utilisant graphène"` et recevoir un livrable structuré avec citations taggées `[INPI Brevets]` ou `[OEB Espacenet]`.
- [ ] `/tableau-contrefacon-brevet` produit une table claim chart exploitable avec analyse équivalence L.613-3.
- [ ] `/preparation-depot-brevet` produit un dossier dépôt brouillon en sections CPI L.611-1.
- [ ] Sans credentials, mode dégradé propre (buckets "Aucune base interrogée").
- [ ] Aucune régression V1.0 / V1.1.0.

## 10. Risques et mitigations

| Risque | Mitigation |
|---|---|
| OEB OPS quota dépassé (4 Go/sem) | Cache 24h + warning à 80% du quota (V2.1 monitoring) |
| Endpoint Espacenet shape différe des hypothèses | Discovery Phase 0 ; refactor limité au client TS |
| Claim chart de qualité médiocre (LLM mal entraîné sur revendications FR) | Template inline détaillé + référence `theorie-equivalence.md` + flag systématique `[review]` sur chaque équivalence proposée |
| Préparation dépôt utilisée comme dépôt final | Garde-fou loud + "mandataire valide et dépose" répété + ne fait pas explicit |
| Confusion avec workflow marques (V1.0) | Sections distinctes, frontmatter explicite "brevet" partout |

## 11. Plan de rollout

- **V2.0 (ce spec)** — MVP brevets : 3 skills + 4 tools + 2 références (1 sprint, ~5 phases)
- **V2.1** — `analyse-refus-inpi` (office action FR + OEB Rule 132) + `anteriorite-invalidite` + Google Patents connecteur
- **V2.2** — `strategie-extension-internationale` + `revue-portefeuille-brevets` (dépend dashboard HTML V1.1.1)
- **V3.0** — bloc Dessins & Modèles
- **V4.0** — bloc Droit d'auteur

## 12. Annexes

### A — Articles CPI brevets référencés

- **L.611-1** : structure du dépôt (description + revendications + abrégé + dessins)
- **L.611-10** : exclusions de brevetabilité (découvertes, méthodes, logiciel *en tant que tel*)
- **L.611-11** : état de la technique (nouveauté absolue)
- **L.612-4** : demande divisionnaire
- **L.613-3** : droits conférés (contrefaçon directe + par équivalence)
- **L.613-25** : nullité du brevet
- **L.615-1** : action en contrefaçon — **TJ Paris exclusivement compétent**
- **L.615-5** : saisie-contrefaçon

### B — Jurisprudence brevet référencée

- **Cour de cass. com. 5 mai 2009** n°08-13.586 — théorie de l'équivalence (référence pour `tableau-contrefacon-brevet`)
- Lignes directrices INPI examen brevets (édition courante)
- Directives examen OEB partie G (Brevetabilité) + partie H (Amendements)

### C — Connecteur OEB Espacenet OPS — doc publique

- Portail : https://developers.epo.org/
- Inscription gratuite, quota 4 Go/sem
- OAuth2 client_credentials (POST `/auth/accesstoken` avec `Authorization: Basic <base64(key:secret)>`)
- API REST + format XML par défaut, JSON disponible via `Accept: application/json`

---

*Version 2.0 MVP — mode autonome, brainstorming court (1 question validée 2026-05-16).*
