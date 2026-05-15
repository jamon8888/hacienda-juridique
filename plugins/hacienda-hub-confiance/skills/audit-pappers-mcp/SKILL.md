---
name: audit-pappers-mcp
description: Audite le connecteur MCP Pappers, ses tools, credits, secrets, donnees personnelles et profils d'activation.
argument-hint: "<plugin ou .mcp.json>"
---

# Audit Pappers MCP

## Objectif

Verifier que Pappers est declare et utilise comme connecteur externe optionnel sans secret commite ni promesse non validee.

## Workflow

1. Lire le `.mcp.json` cible et verifier `type: streamable-http`, `optional: true`, URL avec variable d'environnement et absence de cle.
2. Lancer `node scripts/pappers-mcp-discover.mjs` seulement si `PAPPERS_API_KEY` est configure dans l'environnement.
3. Classer les tools actifs par profil : core business, risk compliance, litigation, public affairs.
4. Verifier que PPE, sanctions, scoring et donnees personnelles ont une validation humaine.
5. Verifier que les workflows normatifs recoupent avec `hacienda-sources-officielles`.
6. Produire une decision : accepte, accepte avec restrictions, bloque.

## Garde-Fous

- Secret en clair : bloquer et demander rotation.
- Credits insuffisants : accepter la config mais refuser l'activation full power.
- Tools justice/politique/territoire : validation specifique avant activation.

## Sortie

Table MCP / tools / donnees / cout-credit / risque / restrictions / decision / validation humaine.
