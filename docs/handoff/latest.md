# Handoff — hacienda-droit-affaires V2a

## Session courante

- **Date :** 2026-05-26
- **Agent / outil :** Claude Code — contrôleur Opus 4, subagent Sonnet 4.6 (Tâche 0 + Tâche finale), Opus (Wave 1 skill)
- **Mode d'exécution :** superpowers:subagent-driven-development

## État livraison

**V2a livrée — 1 skill ajouté (`analyser-rupture-brutale`) + squelette `hacienda-contrats` retiré. Vague strictement additive côté plugin `hacienda-droit-affaires` : aucun skill/agent/`packages/core` de V1/V1.1/V1.2 modifié.**

Le plugin `hacienda-droit-affaires` compte désormais **19 skills et 4 agents**.

- Suite de tests core : **302 passed / 3 skipped / 0 failure** (70 fichiers passants + 1 skipped ; −2 vs V1.2 = suppression `hacienda-contrats.test.ts`).
- `npm run typecheck`, `npm run build`, `npm run branding:check`, `git diff --check` : tous verts.
- Smoke install CLI : **OK** — `claude plugin details hacienda-droit-affaires` confirme 19 skills, 4 agents, 1 MCP server.
- Périmètre vérifié `git diff --stat v2a-base HEAD -- plugins/hacienda-droit-affaires/` : 2 fichiers neufs (703 insertions, 0 suppression) — 100 % additif. Aucun skill/agent V1/V1.1/V1.2 dans le diff.
- Tâche 0 isolée dans le commit dédié `e4c606b` : suppression `hacienda-contrats` (27 fichiers, 792 suppressions), hors plugin `droit-affaires` — sans impact personas.

## Progression dans le plan V2a

Plan : `docs/superpowers/plans/2026-05-26-hacienda-droit-affaires-v2a.md` — toutes les tasks complétées.

| Task | Commit | Objet |
|---|---|---|
| Tâche 0 | `e4c606b` | chore — suppression squelette `hacienda-contrats`, tag `v2a-base` |
| Wave 1 | `260d4ec` | feat — skill `analyser-rupture-brutale` (L.442-1, II) + dataset `rupture-brutale-scenario.md` |
| Tâche finale | (ce commit) | docs — CHANGELOG V2a + handoff |

## Décisions prises hors spec depuis dernier handoff

- **Fourchette préavis raisonnable dataset V2a :** la spec indique `8 mois minimum` pour la règle de pouce (1 mois/an × 8 ans). Le dataset `rupture-brutale-scenario.md` documente une fourchette `10-12 mois` dans les attendus commentés.
  - **Raison :** dépendance économique à 70 % du CA + intuitu personae fort + investissement spécifique caractérisé. La jurisprudence ch. com. majore systématiquement la règle de pouce en présence de ces facteurs ; 8 mois = plancher absolu, 10-12 mois = estimation défendable en phase de contentieux.
  - **Impact spec :** aucun — la spec indique elle-même « à majorer compte tenu de la dépendance économique (~70 % du CA) → possiblement 10-12 mois » (plan V2a, Step 6 dataset). La fourchette est conforme à la spec.
  - **Validation utilisateur :** signalé au handoff, non bloquant.

## Prochaine task à attaquer

- **Aucune dans le périmètre V2a** — vague terminée.
- Hors plan V2a, dans l'ordre :
  1. **Validation personas** — V1 + V1.1 + V1.2 + V2a. Gate les bumps de version.
  2. **V2b — Distribution Cowork-ready** — BLOQUÉE sur la finalisation du pattern packaging/install par `hacienda-ghost`. Dès que ghost a validé, brainstorm + spec + plan dédiés à V2b.
  3. **Chantier workspaces de dossier (matters)** — post-personas (modifie les skills V1).
  4. **v3+** — 7 skills résiduels du squelette `hacienda-contrats` (`reviser-saas`, `reviser-bail-commercial`, `analyser-distribution`, `proposer-redlines`, `verification-pouvoir-signataire`, `recherche-contractuelle`, `resume-operationnel`), inserts droit boursier cibles cotées, connecteurs Drive/SharePoint/OneDrive.

## Blockers actifs

- **V2b bloquée sur `hacienda-ghost`** : le pattern de packaging et d'install Cowork-ready n'est pas encore finalisé par ghost. V2b ne peut pas être spécifiée ni livrée avant.

## État GitNexus

- Index **périmé** depuis les commits Markdown V2a (`e4c606b`, `260d4ec`) — V2a est 100 % Markdown (skill, dataset, CHANGELOG, handoff), sans impact fonctionnel sur le graph de symboles. `npx gitnexus analyze` à lancer si une analyse d'impact graph est souhaitée.
- Aucun symbole ajouté à `packages/core` (V2a ne crée aucun outil core).

## Notes pour le suivant

- **Safe harbor 18 mois — 3 niveaux de verrouillage dans le skill :** (1) disclaimer explicite en citation après le titre (protection défensive, pas plafond légal), (2) Étape 3 mention systématique avec tag `[review]`, (3) gate dataset : safe harbor non invocable par l'auteur de la rupture si préavis effectif < 18 mois — commenté `[review]`. Le risk de mésusage (confondre protection défensive et plafond) est mitigé à 3 couches.
- **Jurisprudence ch. com. rupture brutale : non figée (R1 spec).** La règle de pouce et ses modulations évoluent régulièrement. `verifier-citations` (post-flight Étape 7) + `veille-jurisprudence` (V1.2) obligatoires en usage réel. Ne jamais s'appuyer sur le dataset de test comme source jurisprudentielle : c'est un scénario synthétique à usage d'évaluation structurelle uniquement.
- **Distinction L.442-1, I / II systématique :** le skill impose la mention explicite de l'ex-numérotation L.442-6, I, 5° pour les sources antérieures à l'ordonnance 2019-359. Vigilance en relecture persona : les deux fondements (déséquilibre significatif B2B et rupture brutale) sont dans le même article depuis 2019 — confusion fréquente.
- **Smoke install V1.2 → V2a :** le compteur de skills passe de 18 à 19 — `claude plugin details` est le check de régression recommandé avant chaque smoke.
- **Smoke install CLI note :** source marketplace en chemin absolu uniquement — un `.` nu est rejeté (`Invalid marketplace source format`).
