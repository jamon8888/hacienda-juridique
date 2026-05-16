# Hacienda PI — Bloc Brevets V2.0 MVP — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Steps use `- [ ]` checkbox.

**Goal:** Livrer un MVP du bloc brevets dans le plugin `hacienda-propriete-intellectuelle` v0.4.0 : 3 skills phares (`recherche-anteriorite-brevet`, `preparation-depot-brevet`, `tableau-contrefacon-brevet`) + connecteur OEB Espacenet OPS + extension INPI brevets + 4 tools MCP.

**Architecture:** Extension de la branche V1.0 (`df0e179`). Pattern identique à V1.0 / V1.1.0 : clients TS dans `@hacienda/core/sources/`, tools wrappers dans `@hacienda/core/tools/`, register dans `createHaciendaServer`, skills Markdown FR style Anthropic adaptés droit FR (CPI L.611-1 à L.615-5, Cour de cass. com. 5 mai 2009, problème-solution OEB).

**Tech Stack:** TypeScript ESM, Zod, vitest, MCP SDK ^1.0. OEB OPS OAuth2 client_credentials. INPI Data brevets : même OAuth password grant que marques V1.0.

**Spec source:** [docs/superpowers/specs/2026-05-16-hacienda-pi-brevets-v2.0-mvp-design.md](../specs/2026-05-16-hacienda-pi-brevets-v2.0-mvp-design.md)

**Total prévu :** ~20-25 commits, ~5 phases, mode spéculatif (fixtures inventées).

---

## Phase 0 — Discovery

### Task 0.1: Discovery doc (spéculative, sans curl réel)

Create `docs/notes/pi-brevets-v2.0-discovery-2026-05-16.md` :
- Mode : spéculatif, pas de credentials INPI Brevets ni OEB OPS
- Hypothèses INPI Brevets : `GET /services/brevets/search` + `/services/brevets/{numero}`, même auth OAuth password que marques V1.0
- Hypothèses OEB OPS : `POST /3.2/auth/accesstoken` (Basic auth base64(key:secret)) → `GET /3.2/rest-services/published-data/search` + `/published-data/publication/EP/<numero>/biblio`
- Format réponse : JSON via `Accept: application/json`
- Quota OEB OPS : 4 Go/sem, cache 24h obligatoire
- Décision tools registry : 4 nouveaux tools enregistrés dans `createHaciendaServer` (même décision que V1.0)

Commit: `chore(pi-brevets): discovery V2.0 INPI brevets + OEB OPS (spéculatif)`

---

## Phase 1 — Sources `@hacienda/core` (INPI brevets + Espacenet)

### Task 1.1: Schéma Zod INPI Brevet

Create `packages/core/src/sources/inpi-brevets.ts`.

```ts
import { z } from "zod";

export const InpiBrevetSchema = z.object({
  numero: z.string(),                                    // FR2700123, EP1234567
  type: z.enum(["FR", "EP", "PCT", "CCP"]),
  titre: z.string(),
  classificationCIB: z.array(z.string()),                // codes CIB hiérarchiques
  deposant: z.string(),
  inventeurs: z.array(z.string()),
  mandataire: z.string().nullable(),
  statut: z.enum(["demande", "publiee", "delivree", "rejetee", "retiree", "decheance"]),
  dateDepot: z.string(),
  datePublication: z.string().nullable(),
  dateDelivrance: z.string().nullable(),
  datePriorite: z.string().nullable(),
  abregeText: z.string().nullable(),
});
export type InpiBrevet = z.infer<typeof InpiBrevetSchema>;

export const InpiBrevetSearchResponseSchema = z.object({
  resultats: z.array(InpiBrevetSchema),
  total: z.number().int().nonnegative(),
  dateBase: z.string(),
});
```

Create `packages/core/test/sources/inpi-brevets.test.ts` (vitest) + fixture `packages/core/test/fixtures/inpi/search-graphene-filtration.json`.

Commit: `feat(core): schéma Zod brevets INPI`

### Task 1.2: InpiBrevetsClient (réutilise OAuth de `InpiClient` V1.0)

Étendre `inpi-brevets.ts` avec une classe `InpiBrevetsClient` qui :
- Réutilise le pattern OAuth password grant de `InpiClient` (V1.0 `inpi-marques.ts`) — extraire l'auth dans un mixin ou duplique simplement le code (préférer dupliquer pour V2.0, refactor mutualisé V2.1)
- Méthodes : `searchBrevets(args)` + `getBrevetDetails(numero)`
- Args search : `{ query, classificationCIB?, deposant?, type?, statut?, limite? }`

Tests : auth caching, search basic, details. 3 tests vitest.

Commit: `feat(core): client INPI brevets (search + details)`

### Task 1.3: EspacenetClient (OEB OPS)

Create `packages/core/src/sources/espacenet.ts` :

```ts
export class EspacenetCredentialsMissingError extends Error { ... }
export class EspacenetHttpError extends Error { ... }

export const EspacenetBrevetSchema = z.object({
  numero: z.string(),                                    // EP1234567, WO2020/123456
  type: z.enum(["EP", "WO", "US", "JP", "DE", "FR", "GB", "autre"]),
  titre: z.string(),
  classificationCIB: z.array(z.string()),
  deposant: z.string(),
  datePublication: z.string(),
  datePriorite: z.string().nullable(),
  abregeText: z.string().nullable(),
  urlEspacenet: z.string(),
});

export class EspacenetClient {
  constructor(opts: { consumerKey: string; consumerSecret: string; fetch?: typeof fetch }) {
    if (!opts.consumerKey || !opts.consumerSecret) throw new EspacenetCredentialsMissingError();
    // ...
  }

  async authenticate(): Promise<string> {
    // POST /3.2/auth/accesstoken with Basic auth
    // body: "grant_type=client_credentials"
  }

  async search(args: { query: string; cib?: string[]; datePublicationMin?: string; datePublicationMax?: string; limite?: number }): Promise<EspacenetSearchResponse> {
    // GET /3.2/rest-services/published-data/search?q=...
  }

  async getBrevetDetails(numero: string): Promise<EspacenetBrevet> {
    // GET /3.2/rest-services/published-data/publication/EP/<numero>/biblio
  }
}
```

Tests vitest (mock fetch) + fixture `packages/core/test/fixtures/espacenet/search-graphene.json` + `details-ep1234567.json`. 3 tests.

Commit: `feat(core): client OEB Espacenet OPS (OAuth2 client_credentials)`

### Task 1.4: loadOebCredentials

Append to `packages/core/src/config.ts` :

```ts
export interface OebCredentials { consumerKey: string; consumerSecret: string }

export function loadOebCredentials(): OebCredentials | null {
  const consumerKey = process.env.OEB_CONSUMER_KEY;
  const consumerSecret = process.env.OEB_CONSUMER_SECRET;
  if (!consumerKey || !consumerSecret) return null;
  return { consumerKey, consumerSecret };
}
```

Tests vitest. Re-export depuis `packages/core/src/index.ts`.

Commit: `feat(core): loadOebCredentials (OEB OPS)`

---

## Phase 2 — Tools MCP brevets (4 tools)

### Task 2.1: Tool `inpi_search_brevets`

Create `packages/core/src/tools/inpi-search-brevets.ts` + test. Pattern identique à `inpi_search_marques` V1.0 mais pour brevets. Tag de provenance `[INPI Brevets]`.

Commit: `feat(core): tool inpi_search_brevets`

### Task 2.2: Tool `inpi_brevet_details`

Create `packages/core/src/tools/inpi-brevet-details.ts` + test. Pattern identique à `inpi_marque_details`. Inclut revendications + claims si dispo dans la réponse INPI.

Commit: `feat(core): tool inpi_brevet_details`

### Task 2.3: Tool `espacenet_search`

Create `packages/core/src/tools/espacenet-search.ts` + test. Recherche multi-pays via OEB OPS, classification CIB, dates. Tag `[OEB Espacenet]`.

Commit: `feat(core): tool espacenet_search`

### Task 2.4: Tool `espacenet_brevet_details`

Create `packages/core/src/tools/espacenet-brevet-details.ts` + test. Fiche détaillée : revendications, description, statut légal, citations, famille de brevets.

Commit: `feat(core): tool espacenet_brevet_details`

### Task 2.5: Brancher dans createHaciendaServer + smoke test

Modify `packages/core/src/index.ts` : import + register les 4 tools après ceux des marques. Re-export les symboles.

Modify `packages/core/test/smoke.test.ts` : ajouter `"inpi_search_brevets"`, `"inpi_brevet_details"`, `"espacenet_search"`, `"espacenet_brevet_details"` à `expectedTools` (devient 37 tools).

`npm test` + typecheck + build.

Commit: `feat(core): enregistrer les 4 tools brevets dans createHaciendaServer`

---

## Phase 3 — Skill `recherche-anteriorite-brevet`

Structure calque sur `recherche-anteriorite-marque` V1.0 (8 sous-tâches commits). Différences brevets :
- Knockout = exclusions brevetabilité L.611-10 (découvertes, méthodes, logiciel *en tant que tel*, méthodes thérapeutiques)
- Recherche multi-sources : INPI Brevets + OEB Espacenet (avec classification CIB au lieu de classes Nice)
- Adjacent fields = CIB voisines (au lieu de familles phonétiques)
- Appréciation : nouveauté L.611-11 + activité inventive (approche problème-solution OEB)
- Classifications citations : X / Y / A / E (OEB)
- Conclusion : ne jamais "invention brevetable"

Sous-tâches :
1. Frontmatter + garde-fou
2. Chargement profil + intake
3. Knockout L.611-10
4. Recherche multi-sources (3 cas)
5. Adjacent fields sweep CIB
6. Appréciation problème-solution OEB
7. Recommandations + format de sortie
8. Gate non-juriste + ne fait pas + ton

Total : 8 commits. Cible ~400 lignes.

Create `plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-brevet/SKILL.md` + `references/classifications-cib.md`.

Commits :
- `feat(plugin-pi): recherche-anteriorite-brevet — frontmatter + garde-fou`
- `feat(plugin-pi): recherche-anteriorite-brevet — chargement profil + intake`
- `feat(plugin-pi): recherche-anteriorite-brevet — knockout L.611-10`
- `feat(plugin-pi): recherche-anteriorite-brevet — recherche multi-sources`
- `feat(plugin-pi): recherche-anteriorite-brevet — adjacent fields CIB`
- `feat(plugin-pi): recherche-anteriorite-brevet — problème-solution OEB`
- `feat(plugin-pi): recherche-anteriorite-brevet — recommandations + format sortie`
- `feat(plugin-pi): recherche-anteriorite-brevet — gate + ne fait pas + ton`
- `docs(plugin-pi): référence classifications CIB`

---

## Phase 4 — Skill `preparation-depot-brevet`

Structure ~7 sous-tâches commits, cible ~350 lignes.

Sous-tâches :
1. Frontmatter + garde-fou (préparation ≠ dépôt, mandataire dépose)
2. Chargement profil + intake (invention, domaine, problème, solution, modes réalisation, art antérieur connu, territoires)
3. Structure CPI L.611-1 (titre, abrégé, description, revendications, dessins)
4. Rédaction revendications (préambule + caractéristique distinctive, indépendantes vs dépendantes)
5. Choix territoire (FR / EP / PCT — arbre simplifié, V2.2 pour version complète)
6. Checklist vérifications avant dépôt (brevetabilité, unité, suffisance, support)
7. Format de sortie (dossier brouillon en sections) + gate + ne fait pas + ton

Create `plugins/hacienda-propriete-intellectuelle/skills/preparation-depot-brevet/SKILL.md` + `references/structure-revendications.md`.

Commits :
- `feat(plugin-pi): preparation-depot-brevet — frontmatter + garde-fou`
- `feat(plugin-pi): preparation-depot-brevet — chargement profil + intake`
- `feat(plugin-pi): preparation-depot-brevet — structure CPI L.611-1`
- `feat(plugin-pi): preparation-depot-brevet — rédaction revendications`
- `feat(plugin-pi): preparation-depot-brevet — choix territoire + checklist`
- `feat(plugin-pi): preparation-depot-brevet — format sortie + gate + ne fait pas`
- `docs(plugin-pi): référence structure revendications`

---

## Phase 5 — Skill `tableau-contrefacon-brevet` (claim chart Harvey-grade)

Le workflow phare. Structure ~9 sous-tâches commits, cible ~450 lignes.

Sous-tâches :
1. Frontmatter + garde-fou (confrontation ≠ qualification contrefaçon)
2. Chargement profil + intake (brevet num + doc produit + théorie)
3. Étape 1 : extraction revendications (décomposition en éléments numérotés)
4. Étape 2 : lecture documentation technique (mapping élément → source)
5. Étape 3 : génération du claim chart (table + statuts ✅/⚠️/❌/❓)
6. Étape 4 : analyse contrefaçon par équivalence L.613-3 + Cour de cass. com. 5 mai 2009 (n°08-13.586)
7. Étape 5 : recommandation (littérale + équivalence + priorité action)
8. Format de sortie (template Markdown avec claim chart inline)
9. Gate non-juriste + emplacement + ne fait pas + ton

Create `plugins/hacienda-propriete-intellectuelle/skills/tableau-contrefacon-brevet/SKILL.md` + `references/theorie-equivalence.md`.

Commits :
- `feat(plugin-pi): tableau-contrefacon-brevet — frontmatter + garde-fou`
- `feat(plugin-pi): tableau-contrefacon-brevet — chargement profil + intake`
- `feat(plugin-pi): tableau-contrefacon-brevet — extraction revendications`
- `feat(plugin-pi): tableau-contrefacon-brevet — lecture documentation`
- `feat(plugin-pi): tableau-contrefacon-brevet — génération claim chart`
- `feat(plugin-pi): tableau-contrefacon-brevet — analyse équivalence L.613-3`
- `feat(plugin-pi): tableau-contrefacon-brevet — recommandation`
- `feat(plugin-pi): tableau-contrefacon-brevet — format sortie + gate + ne fait pas`
- `docs(plugin-pi): référence théorie équivalence (Cour de cass. com. 5 mai 2009)`

---

## Phase 6 — Patches plugin + bump + release

### Task 6.1: Patch CLAUDE.md template — section Brevets

Ajouter à `plugins/hacienda-propriete-intellectuelle/CLAUDE.md` une section "Brevets" dans le profil pratique (juste après "Brand protection") :

```markdown
## Brevets

**Pratique brevets :** [A CONFIGURER — FR national / EP / PCT / international]
**Mandataire en brevets associé :** [A CONFIGURER — interne / externe / N/A]
**Domaines techniques principaux :** [A CONFIGURER — pharma / mécanique / électronique / logiciel / etc.]
**Partenaire annuités :** [A CONFIGURER — cabinet tiers / logiciel annuités / interne]
**Posture FTO (liberté d'exploitation) :** [A CONFIGURER — systématique avant lancement / sur demande]
**Compétence TJ Paris brevets :** ✓ (L.615-1 — compétence exclusive en France)
```

Commit: `feat(plugin-pi): CLAUDE.md template — section Brevets`

### Task 6.2: Patch `references/ressources-pi-fr.md` — section Brevets

Ajouter section "Brevets — bases techniques" :

```markdown
## Brevets — bases techniques

| Source | Contenu | Accès | Tag |
|---|---|---|---|
| INPI Data brevets | FR depuis 1902, EP depuis 1978, PCT depuis 1978, CCP depuis 1993 | Compte gratuit | `[INPI Brevets]` |
| OEB Espacenet OPS | 160M+ documents brevets mondiaux, statut légal, famille brevets | Inscription gratuite, quota 4 Go/sem | `[OEB Espacenet]` |
| Google Patents | Recherche prior art étendue, visualisation citations | Gratuit | (V2.1) |
| WIPO PCT (PatentScope) | Demandes PCT internationales | Gratuit | (V2.2) |

## Articles CPI brevets (extraits référencés par les skills)

- L.611-1 : structure dépôt (description + revendications + abrégé + dessins)
- L.611-10 : exclusions brevetabilité (méthodes, logiciel "en tant que tel")
- L.611-11 : état de la technique (nouveauté absolue)
- L.612-4 : demande divisionnaire
- L.613-3 : droits conférés (contrefaçon directe + équivalence)
- L.613-25 : nullité du brevet
- L.615-1 : TJ Paris exclusivement compétent
- L.615-5 : saisie-contrefaçon
```

Create `plugins/hacienda-propriete-intellectuelle/references/articles-cpi-brevets.md` (référence complète CPI brevets, ~80 lignes).

Commits :
- `docs(plugin-pi): ressources — section Brevets`
- `docs(plugin-pi): référence articles CPI brevets`

### Task 6.3: Bump version 0.3.0 → 0.4.0

- `plugins/hacienda-propriete-intellectuelle/.claude-plugin/plugin.json` : version 0.4.0, description étendue (mentionne "brevets" + "claim chart"), keywords +brevets/espacenet/oeb/contrefaçon-brevet
- `plugins/hacienda-propriete-intellectuelle/mcp-server/package.json` : version 0.4.0
- Rebuild MCP server

Commit: `chore(plugin-pi): bump 0.3.0 → 0.4.0 (V2.0 MVP brevets)`

### Task 6.4: CHANGELOG + README v0.4.0

Append au CHANGELOG :

```markdown
## 0.4.0 — 2026-05-16

### Ajouts
- Skill `recherche-anteriorite-brevet` (style Anthropic adapté FR, classifications X/Y/A/E OEB, problème-solution OEB, ~400 lignes)
- Skill `preparation-depot-brevet` (structure CPI L.611-1, rédaction revendications, choix territoire FR/EP/PCT, ~350 lignes)
- Skill `tableau-contrefacon-brevet` (claim chart Harvey-grade, théorie équivalence L.613-3 + Cour de cass. com. 5 mai 2009, ~450 lignes)
- Tools MCP : `inpi_search_brevets`, `inpi_brevet_details`, `espacenet_search`, `espacenet_brevet_details`
- Client `EspacenetClient` (OEB OPS, OAuth2 client_credentials, quota 4 Go/sem)
- Référentiels : `classifications-cib.md`, `structure-revendications.md`, `theorie-equivalence.md`, `articles-cpi-brevets.md`

### À venir (V2.1)
- `analyse-refus-inpi` (office action FR + OEB Rule 132 EPC)
- `anteriorite-invalidite` (argumentation nullité pour action contrefaçon)
- Connecteur Google Patents
```

Mettre à jour README "Quoi de neuf en V0.4" avant la section V0.3.

Commit: `docs(plugin-pi): CHANGELOG + README v0.4.0`

---

## Phase 7 — Vérification + Push + PR

### Task 7.1: Vérifications complètes

- `npm test` : attendu ≥ 245 (236 V1.1.0 + ~9 nouveaux Phase 1-2)
- `npm run typecheck`
- `npm run build`
- `npm run branding:check`
- `git diff --check`
- Smoke `espacenet_search` sans credentials → "OEB not configured"
- Smoke `inpi_search_brevets` sans credentials → "INPI not configured"

NO COMMIT.

### Task 7.2: Push + PR

- `git push -u origin claude/pi-brevets-v2.0-mvp`
- `gh pr create --base claude/quirky-diffie-9e1297 --title "PI brevets V2.0 MVP : claim chart + recherche-anteriorite + preparation-depot" --body "..."` (corps complet avec test plan)

Body :

```markdown
## Summary

MVP du bloc brevets — combler le trou principal du plugin PI après V1.0 marques.

- Skill `recherche-anteriorite-brevet` (INPI + OEB Espacenet, classifications X/Y/A/E)
- Skill `preparation-depot-brevet` (structure CPI L.611-1, revendications, FR/EP/PCT)
- Skill `tableau-contrefacon-brevet` **(claim chart Harvey-grade, théorie équivalence L.613-3)** — workflow phare
- 4 tools MCP : `inpi_search_brevets`, `inpi_brevet_details`, `espacenet_search`, `espacenet_brevet_details`
- Client OEB Espacenet (OAuth2 client_credentials, quota 4 Go/sem)
- Bump plugin 0.3.0 → 0.4.0

**Mode V2.0 spéculatif** : pas de credentials INPI ni OEB OPS testés en réel ; refactor limité aux clients si shape API diffère.

## Spec & plan

- [Spec](https://github.com/jamon8888/hacienda-juridique/blob/claude/pi-brevets-v2.0-mvp/docs/superpowers/specs/2026-05-16-hacienda-pi-brevets-v2.0-mvp-design.md)
- [Plan](https://github.com/jamon8888/hacienda-juridique/blob/claude/pi-brevets-v2.0-mvp/docs/superpowers/plans/2026-05-16-hacienda-pi-brevets-v2.0-mvp.md)

**Base** : PR #1 (V1.0). À rebaser sur main après merge V1.0 + V1.1.0.

## Test plan

- [x] `npm test` vert (~245)
- [x] `npm run typecheck` clean
- [x] `npm run build` clean
- [x] `npm run branding:check` OK
- [x] Smoke tests sans creds propres
- [ ] Validation manuelle (cabinet avec comptes INPI + OEB OPS) :
  - `/recherche-anteriorite-brevet "système filtration graphène"` avec CIB B01D
  - `/tableau-contrefacon-brevet` sur un brevet réel + fiche produit
  - `/preparation-depot-brevet` sur invention de test

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

---

## Self-review

- [x] Spec coverage : §4 → P3, §5 → P4, §6 → P5 (les 3 skills), §7-8 → P1-2 (sources + tools), §9 critères → P7
- [x] No placeholder en dehors des [A CONFIGURER] explicites
- [x] Type consistency : `InpiBrevetsClient` créé P1.2, consommé P2.1-2.2 ; `EspacenetClient` créé P1.3, consommé P2.3-2.4 ; toutes les méthodes register suivent le pattern V1.0

---

**Plan complet et sauvé.** Exécution subagent-driven en 3-4 dispatches en mode autonome.
