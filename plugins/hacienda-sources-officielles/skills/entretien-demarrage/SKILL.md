---
name: entretien-demarrage
description: Configure le profil de pratique Hacienda pour ce plugin.
argument-hint: "[optionnel: --reconfigurer]"
---

# Entretien De Démarrage

## But

Créer ou mettre à jour le profil de pratique dans `~/.claude/plugins/config/hacienda-juridique/hacienda-sources-officielles/CLAUDE.md`.

## Questions

1. Quel est votre rôle : avocat, juriste, expert-comptable, fiscaliste, autre professionnel ?
2. Quel type de structure utilisez-vous : cabinet, direction juridique, cabinet comptable, institution, autre ?
3. Quels livrables voulez-vous produire avec ce plugin ?
4. Quelles sources ou bases documentaires utilisez-vous déjà ?
5. Quel niveau de risque impose une validation humaine avant sortie ?
6. Où doivent être conservés les dossiers de preuve ?
7. Quelles integrations sont disponibles, configurees ou verifiees ?

## Integrations

Appliquer la logique simple de `docs/integrations/mcp-configuration-simple.md` :

- `.mcp.json` signifie disponible, pas connecte.
- `piste_status` doit reussir avant de marquer `Hacienda Sources Officielles` connecte.
- Si un connecteur ne peut pas etre teste, marquer `configure but not verified`.
- Si PISTE ou une source officielle manque, les citations restent `[a verifier]`.

## Sortie

Créer un profil complet sans marqueur `[A CONFIGURER]`, avec une section `Available integrations` indiquant `connected`, `configured but not verified` ou `not configured`.
