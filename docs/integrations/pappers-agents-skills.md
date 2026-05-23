# Pappers Agents And Skills Doctrine

## Purpose

Pappers MCP gives Hacienda a business intelligence layer for company identity, directors, beneficial owners, accounts, group maps, BODACC signals and selected litigation or public data signals.

It does not replace sources officielles. Any normative legal conclusion, opposable fact or legal strategy must be recouped through `hacienda-sources-officielles`, client documents, official registries or human-reviewed evidence.

## Operating Model

- Skills define task workflows for lawyers and legal operations teams.
- Agents define specialist roles that can be reused across plugins.
- Pappers tools provide business context and investigation signals.
- `hacienda-sources-officielles` provides legal and official-source validation.
- Human review remains mandatory before client-facing conclusions, legal advice, signature clearance, litigation action or compliance scoring.

## Required Statuses

- `missing_key`: `PAPPERS_API_KEY` is absent.
- `tools_visible`: MCP discovery works but no credited business call has been validated.
- `credits_insufficient`: Pappers rejects live calls because credits are unavailable.
- `needs_official_recoupement`: Pappers returned a useful signal that still needs official-source or document recoupement.
- `validated`: credited live call returned structured data and the evidence trail is complete.
- `blocked`: secret exposure, unexpected tool risk, missing human validation or unreviewed sensitive profile.

## Evidence Rules

Every Pappers-based workflow must keep a dossier de preuve with:

- tool name;
- query basis;
- safe fields requested;
- retrieval date;
- returned status;
- Pappers limitation or credit state;
- official source or document used for recoupement;
- human validation owner.

## Plugin Roles

| Plugin | Pappers role | Boundary |
| --- | --- | --- |
Les plugins metiers qui exploitaient Pappers ont ete retires de la distribution active.

## Security Rules

- Never commit `PAPPERS_API_KEY`.
- Never paste live keys into documentation, tests or manifests.
- Mask endpoints in discovery output.
- Treat company and person data as client matter data.
- PPE, sanctions, scoring, political or sensitive profiles require explicit user intent and validation humaine.
