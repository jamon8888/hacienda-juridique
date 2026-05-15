---
name: audit-pappers-mcp
description: Audite le connecteur MCP Pappers, ses tools, credits, secrets, donnees personnelles et profils d'activation.
argument-hint: "<plugin ou .mcp.json>"
---

# Audit Pappers MCP

## Objectif

Verifier que Pappers est declare et utilise comme connecteur externe optionnel sans secret commite ni promesse non validee.

## Sources Et Connecteurs

- `.mcp.json`, skills, agents, README et CLAUDE des plugins.
- `scripts/pappers-mcp-discover.mjs` pour la decouverte masquee.
- `docs/integrations/pappers-mcp-validation.md` pour la validation creditee.
- `docs/integrations/pappers-agents-skills.md` pour la doctrine skills/agents.
- `hacienda-sources-officielles` pour verifier que les usages normatifs sont recoupes.

## Statuts Operationnels

- `missing_key` : aucune cle disponible en environnement.
- `tools_visible` : decouverte MCP OK.
- `credits_insufficient` : credits absents, activation full power refusee.
- `needs_official_recoupement` : signal Pappers non recoupe par source officielle ou piece.
- `validated` : appel credite, dossier de preuve et validation humaine disponibles.
- `blocked` : secret expose, profil sensible non valide ou garde-fou manquant.

## Workflow

1. Lire le `.mcp.json` cible et verifier `type: streamable-http`, `optional: true`, URL avec variable d'environnement et absence de cle.
2. Lancer `node scripts/pappers-mcp-discover.mjs` seulement si `PAPPERS_API_KEY` est configure dans l'environnement.
3. Classer les tools actifs par profil : core business, risk compliance, litigation, public affairs.
4. Classer le statut operationnel.
5. Verifier que PPE, sanctions, scoring et donnees personnelles ont une validation humaine.
6. Verifier que les workflows normatifs recoupent avec `hacienda-sources-officielles`.
7. Produire une decision : accepte, accepte avec restrictions, bloque.

## Garde-Fous

- Secret en clair : bloquer et demander rotation.
- Credits insuffisants : accepter la config mais refuser l'activation full power.
- Tools justice/politique/territoire : validation specifique avant activation.
- Aucun statut `validated` sans dossier de preuve.

## Dossier De Preuve

Conserver un dossier de preuve : plugin, manifest, script, tools vus, statut operationnel, credits, profils sensibles, recoupement officiel, restrictions et validation humaine.

## Sortie

Table MCP / tools / donnees / cout-credit / risque / restrictions / decision / validation humaine.
