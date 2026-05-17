# Hacienda Unified API Credentials Design

Date: 2026-05-17
Status: Proposed
Scope: Unified local credentials loading for all external APIs used on `main`, aligned with Claude Desktop Cowork and existing `.mcp.json` conventions.

## Problem

Hacienda currently exposes a simple Cowork-compatible connector model:

- `.mcp.json` declares available connectors
- `CLAUDE.md` stores user profile and workflow preferences
- live tool execution proves that a connector is actually connected

That model is coherent for connector discovery, but the credentials story is not.

On `main`:

- PISTE already supports a local fallback file at `~/.config/Hacienda/credentials.json`
- INPI, EUIPO, and OEB still rely on process environment variables only
- some runtime messages still tell the user to edit `.claude/settings.local.json`
- recent documentation additions mention both env-only setup and the PISTE fallback model

This creates a poor Claude Desktop Cowork experience, especially in GUI launches where shell environment variables are often unavailable.

## Goal

Make Hacienda credentials setup simple and consistent for all external APIs currently used on `main`:

- one local credentials file for all supported APIs
- environment variables still supported as the first-priority override
- no credentials stored in repository files, `.mcp.json`, or `CLAUDE.md`
- user-facing docs and error messages aligned with the actual runtime behavior

## Non-Goals

- No secret storage inside `.mcp.json`
- No secret storage inside `CLAUDE.md`
- No OS keychain integration in this iteration
- No encryption-at-rest layer in this iteration
- No new external API integrations beyond those already called on `main`

## Current State

### Connector model

Current documented model:

- `.mcp.json` = available connectors
- `CLAUDE.md` = user profile and non-secret preferences
- live test = connected

### Credentials loading

Current behavior in `packages/core/src/config.ts`:

- `loadConfig()` supports env and `~/.config/Hacienda/credentials.json` for PISTE
- `loadInpiCredentials()` supports env only
- `loadEuipoCredentials()` supports env only
- `loadOebCredentials()` supports env only

### Affected live APIs on `main`

- PISTE / Legifrance
- Pappers
- INPI Data
- EUIPO TMview
- OEB OPS / Espacenet

## Proposed Approach

Adopt a single local credentials file for all external APIs called by Hacienda on `main`, while preserving environment variables as the highest-priority override.

The runtime contract becomes:

1. try process environment variables
2. fallback to `~/.config/Hacienda/credentials.json`
3. if still missing, return a clean `not configured` message

This aligns the product with Claude Desktop Cowork usage:

- the connector declaration stays in `.mcp.json`
- the user profile stays in `CLAUDE.md`
- the secrets live in one local file outside the repository

## Supported Credentials

This iteration standardizes the following keys:

```json
{
  "PISTE_CLIENT_ID": "...",
  "PISTE_CLIENT_SECRET": "...",
  "PISTE_ENV": "production",
  "PAPPERS_API_KEY": "...",
  "INPI_DATA_LOGIN": "...",
  "INPI_DATA_PASSWORD": "...",
  "EUIPO_API_KEY": "...",
  "OEB_CONSUMER_KEY": "...",
  "OEB_CONSUMER_SECRET": "..."
}
```

## File Location

Default path:

```text
~/.config/Hacienda/credentials.json
```

Override for tests and local debugging:

```text
HACIENDA_CREDENTIALS_FILE
```

This path already exists in the codebase for PISTE and should remain the single local source of truth.

## Data Model

`packages/core/src/config.ts` should use a single JSON shape that covers all known runtime credentials needed on `main`.

Recommended TypeScript shape:

```ts
interface CredentialsFile {
  PISTE_CLIENT_ID?: string;
  PISTE_CLIENT_SECRET?: string;
  PISTE_ENV?: "production" | "sandbox";
  PAPPERS_API_KEY?: string;
  INPI_DATA_LOGIN?: string;
  INPI_DATA_PASSWORD?: string;
  EUIPO_API_KEY?: string;
  OEB_CONSUMER_KEY?: string;
  OEB_CONSUMER_SECRET?: string;
}
```

## Runtime Rules

### Precedence

For each integration:

1. use environment variables when they are present and valid
2. otherwise use values from `credentials.json`
3. otherwise report the integration as not configured

### Placeholder cleanup

Existing placeholder cleanup for values like `${VAR}` should remain in place and be reused for new keys where relevant. This avoids false positives when Cowork passes literal unresolved placeholders.

### Missing credentials behavior

When a source is not configured:

- tool output should remain explicit and non-technical
- messages must reference `~/.config/Hacienda/credentials.json`
- messages may still mention env vars as an override, but not as the only supported path

Example shape:

```text
**INPI not configured** — INPI_DATA_LOGIN / INPI_DATA_PASSWORD absents.
Action: ajouter ces secrets dans ~/.config/Hacienda/credentials.json ou dans l'environnement du process MCP.
```

## Code Changes

### 1. Centralize credentials reading in `packages/core/src/config.ts`

Extend the existing credentials file loader so it can serve:

- PISTE
- Pappers
- INPI
- EUIPO
- OEB

Implementation direction:

- keep the existing file loader as the single JSON entry point
- extend the `CredentialsFile` interface
- reuse the current `cleanEnv()` behavior
- update `loadInpiCredentials()`, `loadEuipoCredentials()`, and `loadOebCredentials()` to support file fallback
- add a small helper if needed to avoid repeating env-then-file logic

### 2. Align source-specific runtime errors

Update PI source classes and tools that still mention `.claude/settings.local.json`:

- `packages/core/src/sources/inpi-marques.ts`
- `packages/core/src/sources/inpi-brevets.ts`
- `packages/core/src/sources/euipo-tmview.ts`
- `packages/core/src/sources/espacenet.ts`
- PI tools under `packages/core/src/tools/`

These messages must point to the unified credentials path instead of the legacy settings file.

### 3. Document the Cowork model clearly

Update:

- `docs/integrations/mcp-configuration-simple.md`
- `README.md`
- `plugins/hacienda-propriete-intellectuelle/README.md`

The docs should clearly distinguish:

- `.mcp.json` = connector availability
- `CLAUDE.md` = user profile and workflow preferences
- `~/.config/Hacienda/credentials.json` = secrets
- live tool call = connected

### 4. Keep `.mcp.json` secret-free

No `.mcp.json` file should embed secrets, inline credential values, or provider login data. The connector manifests remain declarative.

## Testing Strategy

### Unit tests

Extend `packages/core/test/config-credentials.test.ts` to cover:

- INPI credentials from env
- INPI credentials from file
- INPI missing credentials
- EUIPO credentials from env
- EUIPO credentials from file
- EUIPO missing credentials
- OEB credentials from env
- OEB credentials from file
- OEB missing credentials

If Pappers config helpers exist in scope, include equivalent tests there. Otherwise this iteration remains focused on the currently exposed shared loader behavior.

### Regression tests

Keep current PISTE and Judilibre config tests green.

### Documentation checks

Run:

```bash
npm run branding:check
git diff --check
```

### Full verification before completion

Run at minimum:

```bash
npm test
npm run typecheck
npm run build
npm run branding:check
git diff --check
```

## Security Constraints

- Never commit real secrets
- Never write secrets to repository docs as actual values
- Keep examples placeholder-only
- Preserve support for external secret injection through environment variables
- Do not log credential values

## Compatibility

This is backward-compatible:

- existing env-based setups continue to work
- PISTE fallback behavior remains unchanged
- Cowork GUI setups become easier because the same credentials file now covers PI sources too

## Risks

### Risk: inconsistent fallback behavior across loaders

Mitigation:

- use a single helper pattern in `config.ts`
- add focused unit tests per source

### Risk: stale docs keep pointing to `.claude/settings.local.json`

Mitigation:

- update runtime messages and the three main docs in the same change
- search for lingering references and clean the ones that affect current user flows on `main`

### Risk: unresolved `${VAR}` placeholder strings

Mitigation:

- reuse `cleanEnv()` consistently across supported credentials

## Acceptance Criteria

1. A user can configure PISTE, Pappers, INPI, EUIPO, and OEB from one local file:
   `~/.config/Hacienda/credentials.json`
2. Existing env-based setups still work without changes.
3. INPI, EUIPO, and OEB loaders fallback to the credentials file when env vars are absent.
4. User-facing runtime messages no longer instruct users to use `.claude/settings.local.json` for current live PI sources.
5. The main docs clearly explain the split between `.mcp.json`, `CLAUDE.md`, and `credentials.json`.
6. Tests, typecheck, build, branding, and diff checks all pass.
