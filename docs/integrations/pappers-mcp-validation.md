# Pappers MCP Validation

## Purpose

This runbook validates the external Pappers MCP connector before Hacienda enables full-power business-law workflows.

## Secret Handling

Set the key in the shell environment or in the shared Hacienda credentials file:

```powershell
$env:PAPPERS_API_KEY = "<rotated-key>"
```

```text
~/.config/Hacienda/credentials.json
```

Never commit the key. Rotate any key pasted into chat, logs or source files.

## Discovery

```powershell
node scripts/pappers-mcp-discover.mjs
```

Expected with a valid key:

- endpoint is printed as `https://mcp.pappers.fr/[masked]`;
- tool count is visible;
- no API key appears in output.

Note: the discovery script now supports `PAPPERS_API_KEY` from the environment
or from `~/.config/Hacienda/credentials.json`. The external Cowork connector
still resolves its `.mcp.json` URL placeholder client-side.

## Credited Validation Matrix

Run only with a credited key and record the result in the client matter file or internal validation log.

| Capability | Tool | Minimal arguments | Activation condition |
| --- | --- | --- | --- |
| SIREN lookup | `sirenisateur` | company name and country | at least one match |
| Company identity | `informations-entreprise` | `siren`, safe return fields | identity fields returned |
| Accounts | `comptes-entreprise` | `siren`, one year | structured account data or empty official response |
| Group map | `cartographie-entreprise` | `siren` | nodes and links returned |
| Directors | `recherche-dirigeants` | name query | result table returned |
| Beneficial owners | `recherche-beneficiaires` | safe query | result table or empty structured response |
| BODACC | `informations-entreprise` | `publications_bodacc` | publications or empty structured response |
| Litigation signal | `recherche-decisions-justice` | one legal query | decisions returned |

## Statuses

- `missing_key`: `PAPPERS_API_KEY` absent.
- `tools_visible`: discovery works.
- `credits_insufficient`: Pappers returns a credit error.
- `validated`: credited live call returned structured data.
- `blocked`: secret exposure, unexpected write capability, or unreviewed sensitive profile.
