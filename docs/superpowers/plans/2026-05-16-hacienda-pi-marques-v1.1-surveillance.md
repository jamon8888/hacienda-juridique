# Hacienda PI — Bloc Marques V1.1.0 Surveillance — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Livrer un nouveau skill `surveillance-marque` (6 modes) + agent `bopi-watcher` quotidien + 1 nouveau tool MCP `inpi_marques_publications_recentes` + référentiel `watchlist.yaml`. Bump plugin v0.2.0 → v0.3.0.

**Architecture:** Extension de la branche V1.0 (commits `586ef28` à `df0e179`). Le tool delta INPI est ajouté à `@hacienda/core` (méthode `marquesPublicationsRecentes` sur `InpiClient` + tool wrapper). Le skill et l'agent suivent les patrons Anthropic `portfolio` et `renewal-watcher` adaptés FR. Watchlist YAML user-stable validée Zod.

**Tech Stack:** TypeScript ESM, Zod, vitest (PAS node:test — cf. [V1.0 plan note](./2026-05-15-hacienda-pi-marques-v1.md)), js-yaml pour la watchlist (à ajouter aux deps si pas déjà là).

**Spec source:** [docs/superpowers/specs/2026-05-16-hacienda-pi-marques-v1.1-surveillance-design.md](../specs/2026-05-16-hacienda-pi-marques-v1.1-surveillance-design.md)

---

## Phase 0 — Discovery API delta INPI

### Task 0.1: Vérifier l'endpoint delta marques INPI

**Files:**
- Create: `docs/notes/pi-marques-v1.1-discovery-2026-05-16.md`

- [ ] **Step 1: Curl probes (sans credentials, juste pour identifier les routes)**

```bash
# Doc publique
curl -sI "https://api.inpi.fr/services/marques" 2>&1 | head -10
curl -sI "https://api.inpi.fr/services/marques/recents" 2>&1 | head -10
curl -sI "https://api.inpi.fr/services/marques/publications" 2>&1 | head -10
```

- [ ] **Step 2: Lire la doc publique INPI Data marques**

  Cibler : `https://data.inpi.fr/content/marques`. Identifier si un endpoint type "publications récentes" / "delta" / "modifications since" existe.

- [ ] **Step 3: Décider le mode V1.1.0**

  3 cas, ranger par préférence :
  - **A. Endpoint dédié** `/services/marques/publications?since=...&classes=...` → idéal, chemin direct.
  - **B. Endpoint search avec filtres date** `inpi_search_marques` étendu avec `dateDepotMin`/`dateDepotMax` → wrapper côté core.
  - **C. Aucun endpoint delta** → fallback : RSS BOPI INPI public (https://www.inpi.fr/sites/default/files/bopi/...) + scraping HTML — mais ce path est différé V1.1.1 ; en attendant, V1.1.0 livre le squelette + un mode "speculative" qui retourne "API delta non implémentée pour l'instant" cohérent avec le pattern V1.0.

  **En mode spéculatif (sans credentials INPI réels)**, supposer cas A : endpoint `/services/marques/publications?since=YYYY-MM-DD&classes=&motCle=&titulaire=&limit=`. Le client TS sera écrit pour ce shape ; si l'API réelle diffère (cas B), refactor limité au mapping de paramètres.

- [ ] **Step 4: Écrire le doc de discovery**

```markdown
# Discovery V1.1.0 — INPI Data publications récentes

**Date** : 2026-05-16
**Mode** : Spéculatif (pas de credentials Data INPI)

## Hypothèses retenues

- Endpoint : `GET /services/marques/publications` (à confirmer)
- Paramètres : `since` (ISO YYYY-MM-DD, fenêtre max 30 j), `classes` (CSV Nice), `motCle` (recherche dans le signe), `titulaire` (raison sociale), `limit` (1-200, défaut 50)
- Auth : même OAuth password grant que `inpi_search_marques`
- Réponse : `{ publications: [{numero, signe, classes, titulaire, datePublication, urlSource}], total, dateMaxBase }`
- Le champ `dateOpposition_limite` est calculé côté tool : `datePublication + 2 mois` (CPI L.712-4)

## Fallback si endpoint dédié inexistant

- B : étendre `inpi_search_marques` avec `dateDepotMin`/`dateDepotMax`
- C : RSS BOPI INPI + scraping HTML — différé V1.1.1

## Risques

- Refactor du tool si shape API diffère (impact : `packages/core/src/sources/inpi-marques.ts` méthode `marquesPublicationsRecentes`, `packages/core/src/tools/inpi-marques-publications-recentes.ts`, et la fixture associée)
```

- [ ] **Step 5: Commit**

```bash
git add docs/notes/pi-marques-v1.1-discovery-2026-05-16.md
git commit -m "chore(pi-marques): discovery V1.1.0 endpoint delta INPI (spéculatif)"
```

---

## Phase 1 — Extension `@hacienda/core` : delta INPI marques

### Task 1.1: Schéma Zod publication récente

**Files:**
- Modify: `packages/core/src/sources/inpi-marques.ts`
- Modify: `packages/core/test/sources/inpi-marques.test.ts`

- [ ] **Step 1: Test (vitest)**

```ts
// Append to packages/core/test/sources/inpi-marques.test.ts
describe("InpiPublicationRecenteSchema", () => {
  it("parse une publication récente avec dateOpposition_limite calculée", () => {
    const raw = {
      numero: "FR4123456",
      signe: "APEXLEAVE",
      classes: ["25"],
      titulaire: "Concurrent SAS",
      datePublication: "2026-05-09",
      dateOpposition_limite: "2026-07-09",
      urlSource: "https://data.inpi.fr/marques/FR4123456",
    };
    const parsed = InpiPublicationRecenteSchema.parse(raw);
    expect(parsed.numero).toBe("FR4123456");
    expect(parsed.dateOpposition_limite).toBe("2026-07-09");
  });
});
```

- [ ] **Step 2: Run → FAIL (`InpiPublicationRecenteSchema` not exported)**

- [ ] **Step 3: Implémenter le schéma**

```ts
// Append to packages/core/src/sources/inpi-marques.ts
export const InpiPublicationRecenteSchema = z.object({
  numero: z.string(),
  signe: z.string(),
  classes: z.array(z.string()),
  titulaire: z.string(),
  datePublication: z.string(),                            // ISO YYYY-MM-DD
  dateOpposition_limite: z.string(),                      // datePublication + 2 mois
  urlSource: z.string(),
});
export type InpiPublicationRecente = z.infer<typeof InpiPublicationRecenteSchema>;

export const InpiPublicationsRecentesResponseSchema = z.object({
  publications: z.array(InpiPublicationRecenteSchema),
  total: z.number().int().nonnegative(),
  dateMaxBase: z.string(),
});
export type InpiPublicationsRecentesResponse = z.infer<typeof InpiPublicationsRecentesResponseSchema>;
```

- [ ] **Step 4: Run → PASS**

- [ ] **Step 5: Commit**

```bash
git commit -am "feat(core): schéma Zod publications récentes INPI marques"
```

### Task 1.2: Méthode `InpiClient.marquesPublicationsRecentes`

**Files:**
- Modify: `packages/core/src/sources/inpi-marques.ts`
- Modify: `packages/core/test/sources/inpi-marques.test.ts`

- [ ] **Step 1: Test (vitest)**

```ts
describe("InpiClient.marquesPublicationsRecentes", () => {
  it("calcule la fenêtre + appelle l'endpoint avec les bons params", async () => {
    const fetchMock = vi.fn(async (url: string) => {
      if (url.includes("/services/sso/login")) {
        return new Response(JSON.stringify({ access_token: "t", expires_in: 3600 }));
      }
      expect(url).toContain("/services/marques/publications");
      expect(url).toContain("since=2026-05-09");
      expect(url).toContain("classes=25");
      return new Response(JSON.stringify({
        publications: [{
          numero: "FR4123456",
          signe: "APEXLEAVE",
          classes: ["25"],
          titulaire: "Concurrent SAS",
          datePublication: "2026-05-12",
          dateOpposition_limite: "2026-07-12",
          urlSource: "https://data.inpi.fr/marques/FR4123456",
        }],
        total: 1,
        dateMaxBase: "2026-05-15",
      }));
    });
    const client = new InpiClient({
      login: "u", password: "p",
      fetch: fetchMock as unknown as typeof fetch,
    });
    const out = await client.marquesPublicationsRecentes({
      since: "2026-05-09",
      classes: ["25"],
    });
    expect(out.publications).toHaveLength(1);
    expect(out.publications[0].dateOpposition_limite).toBe("2026-07-12");
  });

  it("refuse une fenêtre > 30 jours", async () => {
    const client = new InpiClient({
      login: "u", password: "p",
      fetch: vi.fn() as unknown as typeof fetch,
    });
    await expect(
      client.marquesPublicationsRecentes({ since: "2026-04-01" })
    ).rejects.toThrow(/fenêtre|30 jours/);
  });
});
```

- [ ] **Step 2: Run → FAIL**

- [ ] **Step 3: Implémenter la méthode**

```ts
// Append to InpiClient class
export interface InpiPublicationsRecentesArgs {
  since: string;                                          // ISO YYYY-MM-DD
  classes?: string[];
  motCle?: string;
  titulaire?: string;
  limite?: number;
}

async marquesPublicationsRecentes(
  args: InpiPublicationsRecentesArgs
): Promise<InpiPublicationsRecentesResponse> {
  // Validation fenêtre 30 jours max
  const sinceDate = new Date(args.since);
  const now = new Date();
  const diffJours = (now.getTime() - sinceDate.getTime()) / (1000 * 60 * 60 * 24);
  if (diffJours > 30) {
    throw new Error(
      `INPI publications récentes : fenêtre demandée ${diffJours.toFixed(0)} jours, max 30 jours.`
    );
  }

  const token = await this.authenticate();
  const params = new URLSearchParams({
    since: args.since,
    limit: String(args.limite ?? 50),
  });
  if (args.classes?.length) params.set("classes", args.classes.join(","));
  if (args.motCle) params.set("motCle", args.motCle);
  if (args.titulaire) params.set("titulaire", args.titulaire);

  const res = await this.fetchImpl(
    `${this.baseUrl}/services/marques/publications?${params}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) {
    throw new InpiHttpError(res.status, await res.text().catch(() => ""));
  }
  return InpiPublicationsRecentesResponseSchema.parse(await res.json());
}
```

- [ ] **Step 4: Run → PASS (2 tests)**

- [ ] **Step 5: Commit**

```bash
git commit -am "feat(core): inpiClient.marquesPublicationsRecentes (fenêtre max 30j)"
```

### Task 1.3: Tool MCP `inpi_marques_publications_recentes`

**Files:**
- Create: `packages/core/src/tools/inpi-marques-publications-recentes.ts`
- Create: `packages/core/test/tools/inpi-marques-publications-recentes.test.ts`

- [ ] **Step 1: Test**

```ts
import { describe, it, expect, vi } from "vitest";
import { callInpiMarquesPublicationsRecentes }
  from "../../src/tools/inpi-marques-publications-recentes.js";

describe("callInpiMarquesPublicationsRecentes", () => {
  it("formate markdown avec sévérité par délai opposition", async () => {
    // Date du jour : 2026-05-16. Une publication du 2026-05-09 → opposition jusqu'au 2026-07-09 → 54 j restants → 🟠
    const client = {
      marquesPublicationsRecentes: vi.fn(async () => ({
        publications: [{
          numero: "FR4123456",
          signe: "APEXLEAVE",
          classes: ["25"],
          titulaire: "Concurrent SAS",
          datePublication: "2026-05-09",
          dateOpposition_limite: "2026-07-09",
          urlSource: "https://data.inpi.fr/marques/FR4123456",
        }],
        total: 1,
        dateMaxBase: "2026-05-15",
      })),
    };
    const out = await callInpiMarquesPublicationsRecentes(
      { since: "2026-05-09" },
      client as any
    );
    expect(out).toMatch(/\[INPI Data — publications récentes\]/);
    expect(out).toMatch(/FR4123456/);
    expect(out).toMatch(/APEXLEAVE/);
    expect(out).toMatch(/2026-07-09/);
  });

  it("retourne erreur structurée si client absent", async () => {
    const out = await callInpiMarquesPublicationsRecentes(
      { since: "2026-05-09" },
      null
    );
    expect(out).toMatch(/INPI not configured/i);
    expect(out).toMatch(/\.claude\/settings\.local\.json/);
  });
});
```

- [ ] **Step 2: Run → FAIL**

- [ ] **Step 3: Implémenter le tool**

```ts
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  InpiClient,
  type InpiPublicationsRecentesResponse,
} from "../sources/inpi-marques.js";

export const InpiMarquesPublicationsRecentesArgsSchema = z.object({
  since: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  classes: z.array(z.string()).optional(),
  motCle: z.string().optional(),
  titulaire: z.string().optional(),
  limite: z.number().int().min(1).max(200).default(50),
});
export type InpiMarquesPublicationsRecentesArgs =
  z.infer<typeof InpiMarquesPublicationsRecentesArgsSchema>;

function joursRestants(dateLimite: string, today = new Date()): number {
  const limite = new Date(dateLimite);
  return Math.ceil((limite.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function severite(jours: number): string {
  if (jours < 30) return "🔴";
  if (jours < 60) return "🟠";
  return "🟡";
}

function format(
  res: InpiPublicationsRecentesResponse,
  args: InpiMarquesPublicationsRecentesArgs
): string {
  const lignes = res.publications.map(p => {
    const j = joursRestants(p.dateOpposition_limite);
    const sev = severite(j);
    return `- ${sev} **${p.signe}** [${p.numero}] · classes ${p.classes.join(", ")} · titulaire ${p.titulaire} · publié ${p.datePublication} · **opposition jusqu'au ${p.dateOpposition_limite}** (${j} j restants)`;
  });
  return [
    `# Publications INPI récentes [INPI Data — publications récentes]`,
    ``,
    `**Fenêtre :** depuis ${args.since}${args.classes?.length ? ` · classes ${args.classes.join(", ")}` : ""}${args.motCle ? ` · motCle "${args.motCle}"` : ""}${args.titulaire ? ` · titulaire "${args.titulaire}"` : ""}`,
    `**Résultats :** ${res.publications.length} sur ${res.total}`,
    `**Base INPI mise à jour :** ${res.dateMaxBase}`,
    ``,
    `**Sévérité (délai opposition CPI L.712-4) :** 🔴 < 30 j · 🟠 30-60 j · 🟡 > 60 j`,
    ``,
    ...lignes,
  ].join("\n");
}

export async function callInpiMarquesPublicationsRecentes(
  args: InpiMarquesPublicationsRecentesArgs,
  client: InpiClient | null
): Promise<string> {
  if (!client) {
    return [
      `**INPI not configured** — INPI_DATA_LOGIN / INPI_DATA_PASSWORD absents.`,
      `Action: ajouter ces variables dans \`.claude/settings.local.json\`.`,
    ].join("\n");
  }
  const res = await client.marquesPublicationsRecentes(args);
  return format(res, args);
}

export function registerInpiMarquesPublicationsRecentes(
  server: McpServer,
  client: InpiClient | null
): void {
  server.tool(
    "inpi_marques_publications_recentes",
    InpiMarquesPublicationsRecentesArgsSchema.shape,
    async (raw) => ({
      content: [{
        type: "text",
        text: await callInpiMarquesPublicationsRecentes(
          InpiMarquesPublicationsRecentesArgsSchema.parse(raw),
          client
        ),
      }],
    })
  );
}
```

- [ ] **Step 4: Run → PASS**

- [ ] **Step 5: Commit**

```bash
git commit -am "feat(core): tool inpi_marques_publications_recentes"
```

### Task 1.4: Brancher dans `createHaciendaServer` + smoke test

**Files:**
- Modify: `packages/core/src/index.ts`
- Modify: `packages/core/test/smoke.test.ts`

- [ ] **Step 1: Imports + register**

```ts
// Ajouter à packages/core/src/index.ts
import { registerInpiMarquesPublicationsRecentes }
  from "./tools/inpi-marques-publications-recentes.js";

// Dans createHaciendaServer, après les autres register marques
registerInpiMarquesPublicationsRecentes(server, inpiClient);

// Re-exports
export {
  InpiPublicationRecenteSchema,
  InpiPublicationsRecentesResponseSchema,
} from "./sources/inpi-marques.js";
export {
  registerInpiMarquesPublicationsRecentes,
};
```

- [ ] **Step 2: Mettre à jour smoke test**

  Ajouter `"inpi_marques_publications_recentes"` à `expectedTools` dans `packages/core/test/smoke.test.ts`.

- [ ] **Step 3: Vérifications**

```bash
npm run build --workspace packages/core
npm run typecheck --workspace packages/core
npm test
```

  Expected : tous green, 1 nouveau tool dans le smoke set.

- [ ] **Step 4: Commit**

```bash
git commit -am "feat(core): enregistrer inpi_marques_publications_recentes dans createHaciendaServer + smoke"
```

---

## Phase 2 — Skill `surveillance-marque`

### Task 2.1: Scaffold + frontmatter + garde-fou

**Files:**
- Create: `plugins/hacienda-propriete-intellectuelle/skills/surveillance-marque/SKILL.md`

- [ ] **Step 1: Créer le fichier avec le frontmatter + garde-fou en tête**

```markdown
---
name: surveillance-marque
description: >
  Gère la watchlist de marques surveillées et exécute la surveillance des
  publications INPI/EUIPO récentes. Modes : --report (rapport sur fenêtre),
  --add (ajouter une entrée), --update, --remove, --list, --audit. Conçu
  pour produire des alertes actionnables avant expiration du délai
  d'opposition (2 mois post-BOPI L.712-4).
argument-hint: "[--report [--days N] | --add | --update | --remove | --list | --audit]"
---

# /surveillance-marque

**Outil de surveillance, pas un avis juridique.** Une alerte signale un dépôt
récent qui *peut* poser problème — l'évaluation du risque de confusion et la
décision d'opposition reviennent au mandataire en marques (CPI L.422-4) ou à
l'avocat. Une marque listée comme "🟢 aucun signal" ne veut PAS dire qu'aucun
risque n'existe : elle veut dire que la surveillance n'a rien remonté dans
la fenêtre couverte.

## Examples

```
/h-propriete-intellectuelle:surveillance-marque
```
(défaut : --report --days 7)

```
/h-propriete-intellectuelle:surveillance-marque --add
```

```
/h-propriete-intellectuelle:surveillance-marque --audit
```

---

## SURVEILLANCE, PAS OPINION

**Reformuler en tête de chaque rapport. Ne jamais l'enlever.**

> **Surveillance, pas opinion.** Ce skill détecte les dépôts récents qui
> matchent une entrée de votre watchlist. Il ne décide PAS d'une opposition,
> ne calcule PAS un risque de confusion détaillé (= rôle du skill
> `recherche-anteriorite-marque` ou de l'avocat), n'envoie PAS de mise en
> demeure. Avant toute action sur une publication signalée, le mandataire
> en marques (CPI L.422-4) ou l'avocat évalue le risque de confusion (CJUE
> Sabel/Canon/Lloyd) sur la base d'une recherche complète.
```

- [ ] **Step 2: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/skills/surveillance-marque/
git commit -m "feat(plugin-pi): surveillance-marque — frontmatter + garde-fou"
```

### Task 2.2: Section "Charger le profil + watchlist"

- [ ] **Step 1: Append au SKILL.md**

```markdown
---

## Charger le profil + la watchlist

Avant tout, lire :
1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`
3. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/watchlist.yaml` (créer si absent avec metadata vide + `watches: []`)

Récupérer :
- **Rôle** depuis `## Qui utilise ce plugin` (avocat / mandataire INPI / non-juriste)
- **Posture enforcement** depuis `## Posture enforcement` du profil
- **Approbateurs** (qui signe une opposition INPI ?)
- **Canal d'alerte** (Slack channel / email / inline) — défaut "inline" si non configuré

Si le profil n'est pas configuré (`[A CONFIGURER]` présent), proposer
`/h-propriete-intellectuelle:entretien-demarrage` ou mode `provisoire`
(défauts : avocat, FR + EU, posture mesurée, canal inline).
```

- [ ] **Step 2: Commit**

```bash
git commit -am "feat(plugin-pi): surveillance-marque — chargement profil + watchlist"
```

### Task 2.3: Section "Mode --report" (défaut)

- [ ] **Step 1: Append**

```markdown
---

## Mode `--report [--days N]` (défaut)

Pour chaque entrée dans `watchlist.yaml`, exécuter `inpi_marques_publications_recentes`
sur la fenêtre `[aujourd'hui - N jours, aujourd'hui]` (N défaut : 7, max 30).

### Étapes

1. Si EUIPO TMview est configuré et l'entrée a `territoires` qui inclut "EM" ou autres
   offices européens, appeler aussi `euipo_tmview_search` avec les mêmes mots-clés
   et filtrer par date publication ≥ since (côté skill, pas côté API).
2. Cross-référencer : pour chaque publication détectée, vérifier si elle est
   déjà dans `publicationsDetectees` de l'entrée — si oui, ne pas re-flagger
   (a déjà été notifiée).
3. Calculer la sévérité par délai opposition :
   - 🔴 délai opposition < 30 j (action urgente)
   - 🟠 délai opposition 30-60 j (à préparer)
   - 🟡 nouveau dépôt similaire, délai > 60 j
4. Mettre à jour `watchlist.yaml` :
   - Ajouter les nouveaux hits dans `publicationsDetectees`
   - Mettre à jour `derniereExecution` pour chaque entrée
   - Backup `.bak` horodaté avant écriture

### Format de sortie

[EN-TÊTE CONFIDENTIALITÉ — selon profil]

# Surveillance marques — Rapport [date]

> **Surveillance, pas opinion.** [paragraphe garde-fou tel quel]

> **⚠️ Note du relecteur**
> - **Sources :** [INPI Data ✓ | EUIPO TMview ✓/✗]
> - **Fenêtre :** [N derniers jours, du YYYY-MM-DD au YYYY-MM-DD]
> - **Watchlist :** [N entrées surveillées sur N total]
> - **Avant de s'appuyer :** [1-2 actions concrètes]

**Résumé :** N alertes 🔴 · N alertes 🟠 · N alertes 🟡

## 🔴 OPPOSITION URGENTE (délai < 30 jours)

Pour chaque hit :
- **[signe trouvé]** [numero] · classes [...] · titulaire [...]
  - Publié : [datePublication] · **Opposition jusqu'au [dateLimite] ([N] j restants)**
  - Watchlist match : entrée `WATCH-XXX` "[motCle surveillé]"
  - Référence CPI L.712-4
  - Lien fiche : [urlSource]
  - **Action [review] :** [route vers `recherche-anteriorite-marque` pour analyse confusion détaillée + escalation approbateur]

## 🟠 OPPOSITION À PRÉVOIR (délai 30-60 j)

[même format]

## 🟡 NOUVEAU DÉPÔT SIMILAIRE (délai > 60 j)

[même format, sans urgence opposition]

## 🌐 AGENT-MANAGED

[entrées watchlist marquées `agent_managed: true` — surveillance externalisée
(Corsearch, CompuMark, cabinet tiers) → confirmer directement avec l'agent]

## ❓ DONNÉES MANQUANTES

[entrées watchlist sans dernière exécution réussie ou avec erreur]

**Une question hors de ma checklist :** [observation seconde-ordre — omis si rien]

## Que veux-tu faire ?

1. **Préparer une opposition** — j'ouvre `recherche-anteriorite-marque` sur l'entrée 🔴 de votre choix pour produire l'analyse confusion détaillée
2. **Escalader** — note pour [approbateur du profil]
3. **Compléter les faits** — questions au PM / client / business owner
4. **Surveiller et attendre** — j'ajoute / mets à jour les entrées watchlist concernées
5. **Autre chose** — dis-moi
```

- [ ] **Step 2: Commit**

```bash
git commit -am "feat(plugin-pi): surveillance-marque — mode --report"
```

### Task 2.4: Sections "Modes --add / --update / --remove / --list / --audit"

- [ ] **Step 1: Append**

```markdown
---

## Mode `--add`

Walk interactif :
1. **motCle** (signe principal à surveiller). Refus si < 3 caractères ou mot du dictionnaire courant — proposer une variante plus précise.
2. **motCleAlternatives** (variantes phonétiques / typographiques, optionnel). Suggérer des variantes en se basant sur le motCle (jumeaux phonétiques FR, transliterations).
3. **classes** Nice 1-45 visées (au moins 1).
4. **titulaire** (optionnel) — pour cibler les dépôts d'un concurrent particulier.
5. **territoires** : `["FR"]` (INPI) / `["FR", "EM"]` (INPI + EUIPO) / autres codes offices.
6. **niveauAlerte** : haut / moyen / bas. Haut = signaler même les 🟡, escalation immédiate sur 🔴. Bas = signaler uniquement 🔴.
7. **destinataires** : canaux Slack `["#legal-marques"]` ou emails. Défaut : profil.
8. **business_owner** : email ou équipe propriétaire métier de cette surveillance.
9. **notes** (libre).

Validation Zod côté skill avant écriture. Backup `.bak` automatique de `watchlist.yaml` avant.

Confirmer à l'utilisateur l'ajout + l'identifiant `WATCH-NNN`.

---

## Mode `--update`

`/surveillance-marque --update WATCH-001`

Lire l'entrée, afficher en YAML, demander quels champs modifier, valider Zod, écrire avec backup.

---

## Mode `--remove`

`/surveillance-marque --remove WATCH-001`

Si `niveauAlerte = "haut"`, demander confirmation explicite + raison (ajoutée en commentaire dans le backup `.bak`). Sinon supprimer après confirmation simple.

---

## Mode `--list`

Affiche la watchlist en table Markdown :

| ID | motCle | Classes | Territoires | Niveau | Dernière exécution | Hits |
|---|---|---|---|---|---|---|
| WATCH-001 | APEXLEAF | 25, 35 | FR, EM | haut | 2026-05-15 | 3 |

---

## Mode `--audit`

Health check de la watchlist :

- **Entrées sans exécution > 30 j** — propose réactivation ou suppression
- **motsCle trop génériques** (< 3 chars OU mot dictionnaire courant détecté) — flag pour révision
- **Doublons** (même motCle + classes ⊆) — propose fusion
- **Classes incohérentes** (ex : entrée "logiciel" sans classe 9 ni 42)
- **Cap recommandé** : signaler si watchlist > 50 entrées (volume d'alertes risque ingérable)

Sortie : tableau des findings + recommandations.
```

- [ ] **Step 2: Commit**

```bash
git commit -am "feat(plugin-pi): surveillance-marque — modes --add/--update/--remove/--list/--audit"
```

### Task 2.5: Sections "Sortie + Ne fait pas + Ton"

- [ ] **Step 1: Append**

```markdown
---

## Emplacement de sortie

Mode `--report` écrit à
`~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/surveillance-YYYY-MM-DD.md`
et surface le chemin.

Modifications de `watchlist.yaml` (modes --add, --update, --remove) ne produisent pas de sortie horodatée — juste un message de confirmation.

---

## Ce que ce skill NE fait PAS

- **Décider d'une opposition.** L'évaluation du risque de confusion + la décision d'agir sont du ressort du mandataire INPI ou de l'avocat.
- **Calculer un risque de confusion détaillé.** Pour cela, router vers `recherche-anteriorite-marque` avec le signe concurrent comme input.
- **Envoyer une mise en demeure.** Voir `mise-en-demeure-pi` (v0.1).
- **Modifier l'agent `bopi-watcher`.** L'agent est versionné dans `agents/bopi-watcher.md` ; modifier sa cadence ou ses tools est un ajustement utilisateur via le profil.
- **Surveiller noms de domaine, marketplaces, réseaux sociaux.** Différé V1.2 (`contrefacon-web`).
- **Opérer sans `inpi_marques_publications_recentes` configuré.** Si le tool n'est pas disponible, le mode `--report` retourne le bucket "Aucune base interrogée" et propose d'exécuter `entretien-demarrage --check-integrations`.

---

## Ton

Précis, concis. L'avocat lit le rapport en 30 secondes, repère les 🔴, décide. Pas de hedging, pas de paragraphes-leçon. Le garde-fou en tête + la conclusion "à valider par mandataire/avocat" font le travail de scope.
```

- [ ] **Step 2: Commit**

```bash
git commit -am "feat(plugin-pi): surveillance-marque — sortie + ne fait pas + ton"
```

### Task 2.6: Référentiel `references/modele-watchlist.md`

**Files:**
- Create: `plugins/hacienda-propriete-intellectuelle/skills/surveillance-marque/references/modele-watchlist.md`

- [ ] **Step 1: Créer le doc**

```markdown
# Modèle de watchlist

Fichier : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/watchlist.yaml`

Le skill `surveillance-marque` lit, écrit et audite ce fichier. Schéma Zod validé côté skill.

## Structure

```yaml
metadata:
  cabinet: "Cabinet exemple"          # depuis CLAUDE.md
  generated: "2026-05-16"
  last_audit: "2026-05-16"
  source_system: "manual"              # ou import IPMS

watches:
  - id: "WATCH-001"
    motCle: "APEXLEAF"
    motCleAlternatives: ["APEX LEAF", "APEXLEAVE"]
    classes: ["25", "35"]                            # Nice 1-45
    titulaire: null                                  # ou raison sociale concurrent
    territoires: ["FR", "EM"]                        # INPI, EUIPO, autres offices
    niveauAlerte: "haut"                              # haut / moyen / bas
    destinataires: ["#legal-marques"]
    business_owner: "marketing@acme.fr"
    notes: "Marque produit phare, surveillance étroite"
    dateAjout: "2026-05-16"
    derniereExecution: "2026-05-15"
    publicationsDetectees:
      - dateDetection: "2026-05-15"
        publicationDate: "2026-05-09"
        numero: "FR4123456"
        signe: "APEXLEAVE"
        titulaire: "Concurrent SAS"
        decisionPrise: "opposition_preparee"          # libre, traçabilité
```

## Bonnes pratiques

- **Pas de motCle générique** (< 3 chars, mot du dictionnaire). Trop d'alertes = ignorées.
- **Classes précises** plutôt que "toutes". L'API delta accepte un filtre classes — exploitez-le.
- **Niveau "haut" rare** : réservez aux marques où une opposition rate = perte commerciale réelle.
- **business_owner toujours rempli** : sinon les alertes 🔴 finissent dans une boîte vide.
- **Audit régulier** : `--audit` une fois par trimestre pour purger les surveillances obsolètes.
```

- [ ] **Step 2: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/skills/surveillance-marque/references/modele-watchlist.md
git commit -m "docs(plugin-pi): modèle watchlist + bonnes pratiques"
```

---

## Phase 3 — Agent `bopi-watcher`

### Task 3.1: Créer `agents/bopi-watcher.md`

**Files:**
- Create: `plugins/hacienda-propriete-intellectuelle/agents/bopi-watcher.md`

- [ ] **Step 1: Frontmatter + workflow**

```markdown
---
name: bopi-watcher
description: >
  Agent de surveillance quotidienne. Lit la watchlist marques, appelle
  `surveillance-marque --report --days 1` (delta depuis hier), poste les
  résultats au canal défini dans le profil. Escalade immédiate sur
  🔴 OPPOSITION URGENTE (délai < 30 j) regardless de l'horaire.
  Phrases déclencheuses : "que se passe-t-il sur le BOPI", "surveillance
  quotidienne", "alerte marques", "monitoring marques quotidien".
model: sonnet
tools: ["Read", "Write", "Glob", "mcp__*__inpi_marques_publications_recentes",
        "mcp__*__inpi_marque_details", "mcp__*__euipo_tmview_search",
        "mcp__*__slack_send_message"]
---

# Agent bopi-watcher

## Objectif

Les délais d'opposition INPI (2 mois post-BOPI L.712-4) sont **fermes**. Une
surveillance quotidienne garantit qu'aucun dépôt concurrent n'arrive en fin
de fenêtre sans être vu. Cet agent lit la watchlist, exécute la surveillance
delta (1 jour), et poste un rapport au canal défini.

## Cadence

Quotidienne. Une exécution par jour suffit (BOPI publié vendredi mais agent
quotidien pour intégration future avec marketplace/web). Posts immédiats sur
🔴 OPPOSITION URGENTE (< 30 j restants) regardless de l'horaire.

## Workflow

1. Lire `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`
   pour récupérer canal d'alerte, work-product header, posture surveillance.

2. Charger le skill `surveillance-marque`. Exécuter `--report --days 1`
   (fenêtre = hier → aujourd'hui).

3. **Cross-référencer** : si le portefeuille (`portfolio.yaml` V1.1.1+) existe,
   vérifier si une publication détectée touche une marque listée — surfacer le lien.

4. **Escalation immédiate** : si une entrée 🔴 OPPOSITION URGENTE apparaît,
   poster ces items immédiatement quel que soit l'horaire. Le délai 2 mois
   post-BOPI (L.712-4) ne se rattrape pas.

5. **Poster le rapport** au canal :
   - Slack : utiliser `mcp__*__slack_send_message` au canal du profil
   - Email : à venir (différé V1.2)
   - Inline : poster au stdout / au chat utilisateur

6. Si rien à signaler dans la fenêtre, poster un message court "tout calme
   aujourd'hui". Un silence ressemble à un cron cassé.

## Format de post

```
📅 Surveillance marques — [date]

🔴 OPPOSITION URGENTE (N)
• [signe trouvé] / [numero] / [titulaire]
  Opposition jusqu'au [date] — [N] j restants
  Watchlist : [WATCH-XXX] "[motCle]" · niveau [haut/moyen/bas]
  Owner : [business_owner] · Approbateur : [profil]
  Lien : [urlSource]

🟠 OPPOSITION À PRÉVOIR (N)
• [list]

🟡 NOUVEAU DÉPÔT SIMILAIRE (N)
• [list]

🌐 AGENT-MANAGED (N)
• [Watch ID] — surveillance externalisée [agent]

❓ DONNÉES MANQUANTES (N)
• [Watch ID] — pas d'exécution depuis [date]

Surveillance, pas opinion. Avant toute action, mandataire INPI ou avocat
évalue le risque de confusion (CJUE Sabel/Canon/Lloyd) sur la base d'une
recherche complète.
```

Si rien à signaler :

```
✅ Surveillance marques — [date] : aucune nouvelle publication dans la fenêtre.
N entrées watchlist surveillées, base INPI à jour [date].
```

## Garde-fou (rappel chaque exécution)

L'agent répète le caveat à chaque post. Le délai d'opposition INPI est ferme :
2 mois post-publication BOPI (CPI L.712-4). Un rapport raté = un délai perdu =
une marque concurrente potentiellement enregistrée sans contestation.

L'agent **signale**, le mandataire ou l'avocat **décide**.

## Ce que cet agent NE fait PAS

- **Ne décide pas** d'une opposition.
- **Ne calcule pas** un risque de confusion détaillé (= rôle `recherche-anteriorite-marque` ou avocat).
- **Ne dépose pas** d'opposition à l'INPI.
- **Ne modifie pas** la watchlist (les modifs passent par `surveillance-marque --add/--update/--remove`).
- **Ne ping pas** business owners directement — le post canal les tag, ils décident.
```

- [ ] **Step 2: Branding check**

```bash
npm run branding:check
```

- [ ] **Step 3: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/agents/bopi-watcher.md
git commit -m "feat(plugin-pi): agent bopi-watcher quotidien (V1.1.0)"
```

---

## Phase 4 — Patches CLAUDE.md + bump version + CHANGELOG + README

### Task 4.1: Patch `CLAUDE.md` du plugin (section Brand protection enrichie)

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/CLAUDE.md`

- [ ] **Step 1: Lire le CLAUDE.md actuel, repérer la section "Brand protection" (ou équivalent)**

  Si la section existe, l'enrichir. Si elle n'existe pas, l'ajouter juste après la section "Posture enforcement".

```markdown
## Brand protection

**Marques surveillées :** [A CONFIGURER — voir watchlist gérée via
`/h-propriete-intellectuelle:surveillance-marque --list` ; valeurs
typiques : marques produit phares, marques institutionnelles, marques avec
historique de contrefaçon]

**Cadence agent `bopi-watcher` :** quotidienne (escalation immédiate sur
🔴 OPPOSITION URGENTE < 30 j)

**Canal d'alerte :** [A CONFIGURER — Slack channel `#legal-marques` / email /
inline]. Tant que non configuré, les rapports sont produits inline (pas
d'envoi externe).

**Niveaux d'alerte par défaut :**
- haut : signaler 🔴 + 🟠 + 🟡, escalation immédiate sur 🔴
- moyen : signaler 🔴 + 🟠
- bas : signaler 🔴 uniquement

**Cap watchlist :** 50 entrées recommandé. Au-delà, le volume d'alertes
risque l'effet "fatigue" — préférer une priorisation par cabinet.
```

- [ ] **Step 2: Branding check**

```bash
npm run branding:check
```

- [ ] **Step 3: Commit**

```bash
git commit -am "feat(plugin-pi): CLAUDE.md template — section Brand protection enrichie"
```

### Task 4.2: Patch `references/ressources-pi-fr.md` (section Bulletins officiels)

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/references/ressources-pi-fr.md`

- [ ] **Step 1: Ajouter une section "Bulletins officiels" si absente**

```markdown
## Bulletins officiels

| Source | Cadence | Accès | Tag |
|---|---|---|---|
| BOPI INPI | hebdomadaire (vendredi) | https://bopi.inpi.fr | `[BOPI INPI]` |
| EUIPO Bulletin | hebdomadaire | https://euipo.europa.eu/eSearch/ | `[EUIPO Bulletin]` |
| OMPI Madrid Monitor | continu | https://www3.wipo.int/madrid/monitor/ | `[OMPI Madrid Monitor]` |

Le délai d'opposition INPI court à compter de la publication au BOPI
(CPI L.712-4) : **2 mois fermes**. La surveillance quotidienne via
`bopi-watcher` cible la fenêtre 1 jour pour ne jamais perdre une
publication récente.
```

- [ ] **Step 2: Commit**

```bash
git commit -am "docs(plugin-pi): ressources — section Bulletins officiels"
```

### Task 4.3: Bump version plugin

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/.claude-plugin/plugin.json`
- Modify: `plugins/hacienda-propriete-intellectuelle/mcp-server/package.json`

- [ ] **Step 1: Bumper plugin.json 0.2.0 → 0.3.0 et étendre keywords + description**

```json
{
  "name": "hacienda-propriete-intellectuelle",
  "version": "0.3.0",
  "description": "Propriété intellectuelle : recherche d'antériorité marque (INPI/EUIPO), surveillance BOPI quotidienne, droit d'auteur, logiciel, marques, open source, clauses PI et contrefaçon.",
  "author": { "name": "Hacienda", "url": "https://hacienda.diy" },
  "repository": "https://github.com/jamon8888/hacienda-juridique",
  "license": "AGPL-3.0-or-later",
  "keywords": [
    "hacienda", "propriete-intellectuelle", "marques", "inpi", "euipo",
    "antériorité", "surveillance", "bopi", "opposition",
    "droit-auteur", "logiciel", "open-source"
  ]
}
```

- [ ] **Step 2: Bumper mcp-server/package.json 0.2.0 → 0.3.0**

- [ ] **Step 3: Rebuild MCP server**

```bash
npm run build --workspace plugins/hacienda-propriete-intellectuelle/mcp-server
```

- [ ] **Step 4: Commit**

```bash
git add plugins/hacienda-propriete-intellectuelle/.claude-plugin/plugin.json \
        plugins/hacienda-propriete-intellectuelle/mcp-server/package.json \
        plugins/hacienda-propriete-intellectuelle/mcp-server/dist/
git commit -m "chore(plugin-pi): bump 0.2.0 → 0.3.0 (V1.1.0 surveillance)"
```

### Task 4.4: Mettre à jour CHANGELOG + README

**Files:**
- Modify: `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`

- [ ] **Step 1: Ajouter section 0.3.0 au CHANGELOG (avant 0.2.0)**

```markdown
## 0.3.0 — 2026-05-16

### Ajouts
- Skill `surveillance-marque` (6 modes : --report/--add/--update/--remove/--list/--audit, style Anthropic ip-legal portfolio adapté FR)
- Agent `bopi-watcher` quotidien (escalation immédiate sur 🔴 OPPOSITION URGENTE < 30 j post-BOPI L.712-4)
- Tool MCP `inpi_marques_publications_recentes` (delta API depuis date X, fenêtre max 30 j)
- Référentiel `watchlist.yaml` user-stable validé Zod
- Référentiel `references/modele-watchlist.md`
- Section CLAUDE.md template "Brand protection" enrichie
- Section "Bulletins officiels" dans ressources-pi-fr.md

### À venir (V1.1.1)
- `revue-portefeuille-marques` + premier dashboard HTML standardisé
- `depot-marque-fr` + `analyse-opposition-marque`
```

- [ ] **Step 2: Mettre à jour README "## Quoi de neuf"**

```markdown
## Quoi de neuf en V0.3

- Nouveau skill `surveillance-marque` (gestion watchlist + rapport BOPI delta)
- Nouveau agent `bopi-watcher` (cadence quotidienne, alertes Slack/inline)
- Nouveau tool MCP `inpi_marques_publications_recentes`
- Référentiel watchlist YAML stable (validé Zod, backup automatique)
- Adaptations FR : délai opposition INPI 2 mois L.712-4 surveillé activement
```

- [ ] **Step 3: Commit**

```bash
git commit -am "docs(plugin-pi): CHANGELOG + README v0.3.0"
```

---

## Phase 5 — Vérification + PR

### Task 5.1: Vérifications complètes

- [ ] **Step 1: `npm test` — tous green attendus**

```bash
npm test
```

  Expected : tests existants (231) + nouveaux (Phase 1 = 4 tests : 1 schema + 2 méthode + 1 tool ; pas de tests pour Phase 2-4 qui sont du Markdown).

- [ ] **Step 2: `npm run typecheck`**

- [ ] **Step 3: `npm run build`**

- [ ] **Step 4: `npm run branding:check`**

- [ ] **Step 5: `git diff --check`**

- [ ] **Step 6: Smoke test sans credentials**

```bash
node -e "
import('./packages/core/dist/tools/inpi-marques-publications-recentes.js').then(m =>
  m.callInpiMarquesPublicationsRecentes(
    { since: '2026-05-09', limite: 50 },
    null
  ).then(r => console.log(r))
);
"
```

  Expected : message "INPI not configured" + référence `.claude/settings.local.json`.

NO COMMIT pour cette task — vérification pure.

### Task 5.2: Push + PR

- [ ] **Step 1: État final**

```bash
git status
git log --oneline df0e179..HEAD
```

- [ ] **Step 2: Push**

```bash
git push -u origin claude/pi-marques-v1.1-surveillance
```

- [ ] **Step 3: Créer la PR (target = `claude/quirky-diffie-9e1297` car V1.0 pas encore mergé sur main)**

```bash
gh pr create --base claude/quirky-diffie-9e1297 \
  --title "PI marques V1.1.0 : surveillance + bopi-watcher quotidien" \
  --body "$(cat <<'EOF'
## Summary

Compléter le bloc Marques après V1.0 :

- Nouveau skill `surveillance-marque` (6 modes, style Anthropic ip-legal portfolio)
- Nouveau agent `bopi-watcher` quotidien (escalation immédiate sur 🔴 OPPOSITION URGENTE < 30 j post-BOPI L.712-4)
- Nouveau tool MCP `inpi_marques_publications_recentes` (delta API, fenêtre max 30 j)
- Watchlist YAML user-stable validée Zod
- Bump plugin 0.2.0 → 0.3.0

**Mode V1.1.0 spéculatif** : l'endpoint INPI delta exact reste à confirmer en discovery réelle (cf. `docs/notes/pi-marques-v1.1-discovery-2026-05-16.md`).

## Spec & plan

- [Spec](https://github.com/jamon8888/hacienda-juridique/blob/claude/pi-marques-v1.1-surveillance/docs/superpowers/specs/2026-05-16-hacienda-pi-marques-v1.1-surveillance-design.md)
- [Plan](https://github.com/jamon8888/hacienda-juridique/blob/claude/pi-marques-v1.1-surveillance/docs/superpowers/plans/2026-05-16-hacienda-pi-marques-v1.1-surveillance.md)

**Base** : PR #1 (V1.0). Cette PR cible la branche V1.0 ; à rebaser sur main après merge V1.0.

## Test plan

- [ ] `npm test` vert (231 + 4 nouveaux Phase 1)
- [ ] `npm run typecheck` clean
- [ ] `npm run build` clean
- [ ] `npm run branding:check` OK
- [ ] Smoke `inpi_marques_publications_recentes` sans creds → "INPI not configured" propre
- [ ] Validation manuelle (cabinet avec compte INPI) :
  - `/surveillance-marque --add` (ajouter une entrée)
  - `/surveillance-marque --report --days 7`
  - Invocation manuelle de `bopi-watcher` (mode dry-run inline)
  - Vérifier `watchlist.yaml` créé / mis à jour avec backup `.bak`

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

---

## Self-review checklist

1. **Spec coverage**
   - [x] §3 Architecture → Tasks 4.3 (bump), 4.1 (CLAUDE.md patch), 4.2 (références patch)
   - [x] §4 Skill `surveillance-marque` → Tasks 2.1-2.6
   - [x] §5 Agent `bopi-watcher` → Task 3.1
   - [x] §6 Watchlist `watchlist.yaml` → Task 2.6 (modèle) + skill modes (2.4)
   - [x] §7 Tool `inpi_marques_publications_recentes` → Tasks 1.1-1.4
   - [x] §9 Critères de succès → Task 5.1
   - [x] §11 Discovery → Task 0.1

2. **Placeholder scan**
   - Aucune mention "TBD" / "TODO" / "implement later"
   - Tous les blocs de code sont complets

3. **Type consistency**
   - `InpiPublicationRecenteSchema` créé en 1.1, consommé en 1.2-1.3 → cohérent
   - `marquesPublicationsRecentes` méthode créée en 1.2, consommée en 1.3 → cohérent
   - `callInpiMarquesPublicationsRecentes` créé en 1.3, registered en 1.4 → cohérent
   - Watchlist schema décrit en spec §6, modèle de référence en 2.6, modes consommateurs en 2.4 → cohérent

---

**Plan complet et sauvé.** Subagent-driven execution recommandée vu le succès V1.0.
