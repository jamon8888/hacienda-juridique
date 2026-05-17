# Hacienda Unified API Credentials Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Unifier la configuration locale des credentials API sur `main` autour de `~/.config/Hacienda/credentials.json`, avec fallback env conservé et messages/docs Cowork alignés.

**Architecture:** On garde `packages/core/src/config.ts` comme point d’entrée unique pour la lecture des secrets. Les loaders INPI/EUIPO/OEB sont étendus pour faire `env > credentials.json > null`, puis les sources, tools et docs sont réalignés pour ne plus pointer vers `.claude/settings.local.json`.

**Tech Stack:** TypeScript ESM, vitest, Node.js fs/os/path, documentation Markdown, GitNexus impact analysis avant édition des symboles existants.

**Spec source:** [docs/superpowers/specs/2026-05-17-hacienda-unified-api-credentials-design.md](../specs/2026-05-17-hacienda-unified-api-credentials-design.md)

---

## File Structure

### Files to modify

- `packages/core/src/config.ts`
  - Étendre `CredentialsFile`
  - Ajouter un helper générique de lecture `env -> file`
  - Faire fallback fichier pour `loadInpiCredentials`, `loadEuipoCredentials`, `loadOebCredentials`
- `packages/core/test/config-credentials.test.ts`
  - Ajouter les cas de lecture depuis fichier et placeholders Cowork
- `packages/core/src/sources/inpi-marques.ts`
- `packages/core/src/sources/inpi-brevets.ts`
- `packages/core/src/sources/euipo-tmview.ts`
- `packages/core/src/sources/espacenet.ts`
  - Aligner les messages d’erreur de credentials
- `packages/core/src/tools/marque-search.ts`
- `packages/core/src/tools/inpi-marques-publications-recentes.ts`
- `packages/core/src/tools/inpi-search-brevets.ts`
- `packages/core/src/tools/inpi-brevet-details.ts`
- `packages/core/src/tools/euipo-tmview-search.ts`
- `packages/core/src/tools/espacenet-search.ts`
- `packages/core/src/tools/espacenet-brevet-details.ts`
  - Aligner les messages utilisateur
- `packages/core/test/tools/marque-search.test.ts`
- `packages/core/test/tools/inpi-marques-publications-recentes.test.ts`
- `packages/core/test/tools/inpi-search-brevets.test.ts`
- `packages/core/test/tools/inpi-brevet-details.test.ts`
- `packages/core/test/tools/euipo-tmview-search.test.ts`
- `packages/core/test/tools/espacenet-search.test.ts`
- `packages/core/test/tools/espacenet-brevet-details.test.ts`
  - Vérifier les nouveaux messages
- `docs/integrations/mcp-configuration-simple.md`
- `README.md`
- `plugins/hacienda-propriete-intellectuelle/README.md`
  - Documenter le modèle Cowork final

### Files intentionally not changed

- `plugins/*/.mcp.json`
  - Pas de secret dans les manifests
- `~/.claude/plugins/config/.../CLAUDE.md`
  - Pas de secrets dans les profils
- `scripts/pappers-mcp-discover.mjs`
  - Le script Pappers reste env-only dans ce lot ; la doc globale peut mentionner `credentials.json` comme convention produit, mais on ne modifie pas ce script sans besoin runtime immédiat

---

## Task 1: Verrouiller les tests du fallback credentials

**Files:**
- Modify: `packages/core/test/config-credentials.test.ts`

- [ ] **Step 1: Ajouter des tests rouges pour le fallback fichier INPI/EUIPO/OEB**

Remplacer le contenu du fichier de test par une version qui couvre env, fichier, placeholders Cowork et cas manquants :

```ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import {
  loadInpiCredentials,
  loadEuipoCredentials,
  loadOebCredentials,
} from "../src/config.js";

function writeCredentialsFile(payload: Record<string, string>): string {
  const dir = mkdtempSync(join(tmpdir(), "hacienda-credentials-"));
  const file = join(dir, "credentials.json");
  writeFileSync(file, JSON.stringify(payload, null, 2), "utf8");
  return file;
}

describe("credentials loaders", () => {
  let tempPath: string | undefined;

  beforeEach(() => {
    delete process.env.HACIENDA_CREDENTIALS_FILE;
    delete process.env.INPI_DATA_LOGIN;
    delete process.env.INPI_DATA_PASSWORD;
    delete process.env.EUIPO_API_KEY;
    delete process.env.OEB_CONSUMER_KEY;
    delete process.env.OEB_CONSUMER_SECRET;
  });

  afterEach(() => {
    if (tempPath) {
      rmSync(join(tempPath, ".."), { recursive: true, force: true });
      tempPath = undefined;
    }
  });

  it("lit INPI depuis l'environnement", () => {
    process.env.INPI_DATA_LOGIN = "user";
    process.env.INPI_DATA_PASSWORD = "pwd";
    expect(loadInpiCredentials()).toEqual({ login: "user", password: "pwd" });
  });

  it("lit INPI depuis le fichier credentials", () => {
    tempPath = writeCredentialsFile({
      INPI_DATA_LOGIN: "file-user",
      INPI_DATA_PASSWORD: "file-pwd",
    });
    process.env.HACIENDA_CREDENTIALS_FILE = tempPath;
    expect(loadInpiCredentials()).toEqual({
      login: "file-user",
      password: "file-pwd",
    });
  });

  it("ignore les placeholders Cowork INPI et retombe sur le fichier", () => {
    tempPath = writeCredentialsFile({
      INPI_DATA_LOGIN: "file-user",
      INPI_DATA_PASSWORD: "file-pwd",
    });
    process.env.HACIENDA_CREDENTIALS_FILE = tempPath;
    process.env.INPI_DATA_LOGIN = "${INPI_DATA_LOGIN}";
    process.env.INPI_DATA_PASSWORD = "${INPI_DATA_PASSWORD}";
    expect(loadInpiCredentials()).toEqual({
      login: "file-user",
      password: "file-pwd",
    });
  });

  it("lit EUIPO depuis le fichier credentials", () => {
    const expectedApiValue = "euipo-file-sample";
    tempPath = writeCredentialsFile({ EUIPO_API_KEY: expectedApiValue });
    process.env.HACIENDA_CREDENTIALS_FILE = tempPath;
    expect(loadEuipoCredentials()?.apiKey).toBe(expectedApiValue);
  });

  it("lit OEB depuis le fichier credentials", () => {
    const expectedConsumerKey = "oeb-file-key-sample";
    const expectedConsumerSecret = "oeb-file-secret-sample";
    tempPath = writeCredentialsFile({
      OEB_CONSUMER_KEY: expectedConsumerKey,
      OEB_CONSUMER_SECRET: expectedConsumerSecret,
    });
    process.env.HACIENDA_CREDENTIALS_FILE = tempPath;
    expect(loadOebCredentials()).toEqual({
      consumerKey: expectedConsumerKey,
      consumerSecret: expectedConsumerSecret,
    });
  });

  it("retourne null si les credentials OEB sont absents partout", () => {
    expect(loadOebCredentials()).toBeNull();
  });
});
```

- [ ] **Step 2: Lancer le fichier de tests pour constater l’échec**

Run:

```bash
npm test -- packages/core/test/config-credentials.test.ts
```

Expected:

```text
FAIL
Expected fallback file credentials for INPI/EUIPO/OEB, received null
```

- [ ] **Step 3: Commit de checkpoint rouge**

```bash
git add packages/core/test/config-credentials.test.ts
git commit -m "test: cover unified file credentials for PI APIs"
```

---

## Task 2: Implémenter le loader unifié dans `config.ts`

**Files:**
- Modify: `packages/core/src/config.ts`
- Test: `packages/core/test/config-credentials.test.ts`

- [ ] **Step 1: Faire l’impact analysis GitNexus sur les loaders avant édition**

Examiner au minimum les symboles suivants et noter leur blast radius dans le journal de travail avant modification :

- `loadConfig`
- `loadInpiCredentials`
- `loadEuipoCredentials`
- `loadOebCredentials`

Résultat attendu :

```text
Impact analysis completed for config loaders; no HIGH/CRITICAL blocker.
```

- [ ] **Step 2: Étendre `CredentialsFile` et ajouter un helper générique**

Modifier `packages/core/src/config.ts` pour obtenir la structure suivante :

```ts
interface CredentialsFile {
  PISTE_CLIENT_ID?: string;
  PISTE_CLIENT_SECRET?: string;
  PISTE_ENV?: PisteEnv;
  PAPPERS_API_KEY?: string;
  INPI_DATA_LOGIN?: string;
  INPI_DATA_PASSWORD?: string;
  EUIPO_API_KEY?: string;
  OEB_CONSUMER_KEY?: string;
  OEB_CONSUMER_SECRET?: string;
}

function readCredential(
  envValue: string | undefined,
  fileValue: string | undefined
): string | undefined {
  return cleanEnv(envValue) ?? fileValue;
}
```

- [ ] **Step 3: Refactoriser `loadInpiCredentials`, `loadEuipoCredentials`, `loadOebCredentials`**

Mettre à jour les trois loaders avec le même pattern :

```ts
export function loadInpiCredentials(): InpiCredentials | null {
  const fileCreds = loadCredentialsFile();
  const login = readCredential(process.env.INPI_DATA_LOGIN, fileCreds?.INPI_DATA_LOGIN);
  const password = readCredential(
    process.env.INPI_DATA_PASSWORD,
    fileCreds?.INPI_DATA_PASSWORD
  );
  if (!login || !password) return null;
  return { login, password };
}

export function loadEuipoCredentials(): EuipoCredentials | null {
  const fileCreds = loadCredentialsFile();
  const apiKey = readCredential(process.env.EUIPO_API_KEY, fileCreds?.EUIPO_API_KEY);
  if (!apiKey) return null;
  return { apiKey };
}

export function loadOebCredentials(): OebCredentials | null {
  const fileCreds = loadCredentialsFile();
  const consumerKey = readCredential(
    process.env.OEB_CONSUMER_KEY,
    fileCreds?.OEB_CONSUMER_KEY
  );
  const consumerSecret = readCredential(
    process.env.OEB_CONSUMER_SECRET,
    fileCreds?.OEB_CONSUMER_SECRET
  );
  if (!consumerKey || !consumerSecret) return null;
  return { consumerKey, consumerSecret };
}
```

- [ ] **Step 4: Rejouer les tests ciblés**

Run:

```bash
npm test -- packages/core/test/config-credentials.test.ts
```

Expected:

```text
PASS packages/core/test/config-credentials.test.ts
```

- [ ] **Step 5: Commit du socle runtime**

```bash
git add packages/core/src/config.ts packages/core/test/config-credentials.test.ts
git commit -m "feat(core): unify local credential file fallback for PI APIs"
```

---

## Task 3: Aligner les erreurs des sources et des tools PI

**Files:**
- Modify: `packages/core/src/sources/inpi-marques.ts`
- Modify: `packages/core/src/sources/inpi-brevets.ts`
- Modify: `packages/core/src/sources/euipo-tmview.ts`
- Modify: `packages/core/src/sources/espacenet.ts`
- Modify: `packages/core/src/tools/marque-search.ts`
- Modify: `packages/core/src/tools/inpi-marques-publications-recentes.ts`
- Modify: `packages/core/src/tools/inpi-search-brevets.ts`
- Modify: `packages/core/src/tools/inpi-brevet-details.ts`
- Modify: `packages/core/src/tools/euipo-tmview-search.ts`
- Modify: `packages/core/src/tools/espacenet-search.ts`
- Modify: `packages/core/src/tools/espacenet-brevet-details.ts`
- Test: `packages/core/test/tools/marque-search.test.ts`
- Test: `packages/core/test/tools/inpi-marques-publications-recentes.test.ts`
- Test: `packages/core/test/tools/inpi-search-brevets.test.ts`
- Test: `packages/core/test/tools/inpi-brevet-details.test.ts`
- Test: `packages/core/test/tools/euipo-tmview-search.test.ts`
- Test: `packages/core/test/tools/espacenet-search.test.ts`
- Test: `packages/core/test/tools/espacenet-brevet-details.test.ts`

- [ ] **Step 1: Écrire les assertions rouges sur les nouveaux messages**

Mettre à jour les tests qui validaient encore `.claude/settings.local.json`. Exemple dans `packages/core/test/tools/marque-search.test.ts` :

```ts
it("retourne erreur structurée si client absent", async () => {
  const out = await callInpiSearchMarques(
    {
      query: "APEXLEAF",
      type: "tous",
      statut: "en_vigueur",
      similarite: "proche",
      limite: 25,
    },
    null
  );
  expect(out).toMatch(/not configured/i);
  expect(out).toMatch(/~\/\.config\/Hacienda\/credentials\.json/);
  expect(out).not.toMatch(/settings\.local\.json/);
});
```

Appliquer le même principe aux tests INPI/EUIPO/OEB concernés.

- [ ] **Step 2: Lancer la sous-suite tools pour constater l’échec**

Run:

```bash
npm test -- packages/core/test/tools/marque-search.test.ts packages/core/test/tools/inpi-marques-publications-recentes.test.ts packages/core/test/tools/inpi-search-brevets.test.ts packages/core/test/tools/inpi-brevet-details.test.ts packages/core/test/tools/euipo-tmview-search.test.ts packages/core/test/tools/espacenet-search.test.ts packages/core/test/tools/espacenet-brevet-details.test.ts
```

Expected:

```text
FAIL
Expected ~/.config/Hacienda/credentials.json
Received .claude/settings.local.json
```

- [ ] **Step 3: Remplacer les messages côté sources**

Mettre à jour les erreurs constructeur/sources. Exemple :

```ts
export class InpiCredentialsMissingError extends Error {
  constructor() {
    super(
      "INPI_DATA_LOGIN / INPI_DATA_PASSWORD non definis dans ~/.config/Hacienda/credentials.json ou dans l'environnement du process MCP"
    );
    this.name = "InpiCredentialsMissingError";
  }
}
```

Faire l’équivalent dans :

- `inpi-brevets.ts`
- `euipo-tmview.ts`
- `espacenet.ts`

- [ ] **Step 4: Remplacer les messages côté tools**

Uniformiser les retours utilisateur en Markdown. Exemple :

```ts
return [
  `**INPI not configured** — INPI_DATA_LOGIN / INPI_DATA_PASSWORD absents.`,
  `Action: ajouter ces secrets dans \\`~/.config/Hacienda/credentials.json\\` ou dans l'environnement du process MCP.`,
].join("\\n");
```

Formes attendues :

- INPI : `INPI_DATA_LOGIN / INPI_DATA_PASSWORD`
- EUIPO : `EUIPO_API_KEY`
- OEB : `OEB_CONSUMER_KEY / OEB_CONSUMER_SECRET`

- [ ] **Step 5: Rejouer la sous-suite tools**

Run:

```bash
npm test -- packages/core/test/tools/marque-search.test.ts packages/core/test/tools/inpi-marques-publications-recentes.test.ts packages/core/test/tools/inpi-search-brevets.test.ts packages/core/test/tools/inpi-brevet-details.test.ts packages/core/test/tools/euipo-tmview-search.test.ts packages/core/test/tools/espacenet-search.test.ts packages/core/test/tools/espacenet-brevet-details.test.ts
```

Expected:

```text
PASS
7 files, all tests green
```

- [ ] **Step 6: Commit du réalignement utilisateur**

```bash
git add packages/core/src/sources/inpi-marques.ts packages/core/src/sources/inpi-brevets.ts packages/core/src/sources/euipo-tmview.ts packages/core/src/sources/espacenet.ts packages/core/src/tools/marque-search.ts packages/core/src/tools/inpi-marques-publications-recentes.ts packages/core/src/tools/inpi-search-brevets.ts packages/core/src/tools/inpi-brevet-details.ts packages/core/src/tools/euipo-tmview-search.ts packages/core/src/tools/espacenet-search.ts packages/core/src/tools/espacenet-brevet-details.ts packages/core/test/tools/marque-search.test.ts packages/core/test/tools/inpi-marques-publications-recentes.test.ts packages/core/test/tools/inpi-search-brevets.test.ts packages/core/test/tools/inpi-brevet-details.test.ts packages/core/test/tools/euipo-tmview-search.test.ts packages/core/test/tools/espacenet-search.test.ts packages/core/test/tools/espacenet-brevet-details.test.ts
git commit -m "fix(pi): align credential guidance with unified local config"
```

---

## Task 4: Mettre la documentation Cowork au propre

**Files:**
- Modify: `docs/integrations/mcp-configuration-simple.md`
- Modify: `README.md`
- Modify: `plugins/hacienda-propriete-intellectuelle/README.md`

- [ ] **Step 1: Ajouter la section de vérité produit dans `mcp-configuration-simple.md`**

Insérer une section explicite après `## Secrets` :

````md
## Fichier Unique De Credentials

Pour Claude Desktop Cowork, Hacienda utilise un fichier local unique :

```text
~/.config/Hacienda/credentials.json
```

Exemple :

```json
{
  "PISTE_CLIENT_ID": "<piste-client-id>",
  "PISTE_CLIENT_SECRET": "<piste-client-secret>",
  "PISTE_ENV": "production",
  "PAPPERS_API_KEY": "<pappers-api-key>",
  "INPI_DATA_LOGIN": "<login-inpi>",
  "INPI_DATA_PASSWORD": "<password-inpi>",
  "EUIPO_API_KEY": "<euipo-api-key>",
  "OEB_CONSUMER_KEY": "<oeb-consumer-key>",
  "OEB_CONSUMER_SECRET": "<oeb-consumer-secret>"
}
```

Les variables d'environnement restent prioritaires si le process MCP les reçoit déjà.
````

- [ ] **Step 2: Réécrire les sections README qui montrent encore des `$env:` comme voie principale**

Dans `README.md` et `plugins/hacienda-propriete-intellectuelle/README.md`, faire des exemples `credentials.json` la voie principale et reléguer PowerShell en override secondaire :

````md
Configuration recommandée pour Claude Desktop Cowork :

```text
~/.config/Hacienda/credentials.json
```

```json
{
  "INPI_DATA_LOGIN": "<login-inpi>",
  "INPI_DATA_PASSWORD": "<password-inpi>",
  "EUIPO_API_KEY": "<euipo-api-key>",
  "OEB_CONSUMER_KEY": "<oeb-consumer-key>",
  "OEB_CONSUMER_SECRET": "<oeb-consumer-secret>"
}
```

Override ponctuel PowerShell :

```powershell
$env:INPI_DATA_LOGIN = "<login-inpi>"
$env:INPI_DATA_PASSWORD = "<password-inpi>"
```
````

- [ ] **Step 3: Vérifier qu’aucune doc active du flux utilisateur ne renvoie encore vers `.claude/settings.local.json`**

Run:

```bash
rg -n "settings\.local\.json" README.md docs/integrations/mcp-configuration-simple.md plugins/hacienda-propriete-intellectuelle/README.md packages/core/src/sources packages/core/src/tools
```

Expected:

```text
No matches found
```

- [ ] **Step 4: Commit documentation**

```bash
git add docs/integrations/mcp-configuration-simple.md README.md plugins/hacienda-propriete-intellectuelle/README.md
git commit -m "docs: document unified local credentials for cowork"
```

---

## Task 5: Vérification finale et contrôle de scope

**Files:**
- Verify: repo state only

- [ ] **Step 1: Lancer la suite de vérification minimale**

Run:

```bash
npm test
npm run typecheck
npm run build
npm run branding:check
git diff --check
```

Expected:

```text
All tests pass
Typecheck OK
Build OK
Branding OK
No diff check errors
```

- [ ] **Step 2: Contrôler le scope GitNexus avant clôture**

Vérifier que les changements se limitent bien à :

- `config.ts`
- tests config/tools
- messages sources/tools PI
- docs Cowork

Résultat attendu :

```text
Detected changes limited to expected credential-loading and documentation scope.
```

- [ ] **Step 3: Vérifier le diff Git final**

Run:

```bash
git status --short
git diff --stat
```

Expected:

```text
Only the planned files are modified.
```

- [ ] **Step 4: Commit de finition**

```bash
git add packages/core/src/config.ts packages/core/test/config-credentials.test.ts packages/core/src/sources/inpi-marques.ts packages/core/src/sources/inpi-brevets.ts packages/core/src/sources/euipo-tmview.ts packages/core/src/sources/espacenet.ts packages/core/src/tools/marque-search.ts packages/core/src/tools/inpi-marques-publications-recentes.ts packages/core/src/tools/inpi-search-brevets.ts packages/core/src/tools/inpi-brevet-details.ts packages/core/src/tools/euipo-tmview-search.ts packages/core/src/tools/espacenet-search.ts packages/core/src/tools/espacenet-brevet-details.ts packages/core/test/tools/marque-search.test.ts packages/core/test/tools/inpi-marques-publications-recentes.test.ts packages/core/test/tools/inpi-search-brevets.test.ts packages/core/test/tools/inpi-brevet-details.test.ts packages/core/test/tools/euipo-tmview-search.test.ts packages/core/test/tools/espacenet-search.test.ts packages/core/test/tools/espacenet-brevet-details.test.ts docs/integrations/mcp-configuration-simple.md README.md plugins/hacienda-propriete-intellectuelle/README.md
git commit -m "feat: simplify cowork credential configuration for external APIs"
```

---

## Self-Review

### Spec coverage

- Unified file path: covered in Tasks 2 and 4
- Env precedence preserved: covered in Task 2
- INPI/EUIPO/OEB fallback behavior: covered in Tasks 1 and 2
- Runtime messages aligned: covered in Task 3
- Docs aligned with `.mcp.json` / `CLAUDE.md` / `credentials.json`: covered in Task 4
- Final verification: covered in Task 5

### Placeholder scan

- No `TODO`
- No `TBD`
- No “implement later”

### Type consistency

- `CredentialsFile`
- `readCredential`
- `loadInpiCredentials`
- `loadEuipoCredentials`
- `loadOebCredentials`

These names are used consistently across the tasks.
