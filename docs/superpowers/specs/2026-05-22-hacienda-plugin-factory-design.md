# Hacienda Plugin Factory — Design

Date: 2026-05-22  
Statut: prêt pour revue  
Référence locale étudiée: `C:\Users\NMarchitecte\AppData\Local\Temp\claude-for-legal-verify`

## Objectif

Créer un système interne de création, documentation, validation et harmonisation des plugins Hacienda, fondé sur la structure stricte observée dans `claude-for-legal`, mais avec un contenu, un branding, une licence et des garde-fous entièrement Hacienda.

Le système doit couvrir deux usages :

1. créer automatiquement de nouveaux plugins Hacienda conformes ;
2. harmoniser les plugins existants pour qu'ils respectent le même contrat.

Le système ne doit jamais copier le branding, les auteurs, les chemins de configuration, les textes métier ou les connecteurs Anthropic. Il reprend uniquement l'ingénierie de structure : marketplace, manifests, profil de pratique, cold-start, skills, agents, hooks, MCP, documentation et validation.

## Constats De Review

La review préalable du dépôt montre quatre faiblesses à corriger avant d'industrialiser la création de plugins.

1. Le contrôle qualité avancé cible surtout `hacienda-propriete-intellectuelle`. Les autres plugins peuvent diverger du standard sans faire échouer les tests.
2. La liste des plugins est codée en dur dans les tests marketplace. Une factory doit s'appuyer sur une source de vérité unique.
3. Les `.mcp.json` n'ont pas encore un contrat clair : certains serveurs `stdio` n'ont pas de `command` ni `args`, tandis que PI expose un serveur exécutable.
4. Deux noms de profil partagé coexistent : `profil-cabinet.md` et `company-profile.md`. Le standard doit en choisir un seul.

Ces constats deviennent des exigences de design, pas des détails d'implémentation.

## Standard Cible

Chaque plugin Hacienda doit respecter cette structure minimale :

```text
plugins/<plugin>/
  .claude-plugin/
    plugin.json
  .mcp.json
  CLAUDE.md
  README.md
  hooks/
    hooks.json
  skills/
    entretien-demarrage/
      SKILL.md
    <skill>/
      SKILL.md
      references/
  agents/
    <agent>.md
```

Les dossiers `references/`, `agents/` et `mcp-server/` sont optionnels selon le type de plugin, mais leur absence doit être explicite dans le modèle du plugin.

## Convention De Configuration

Le standard Hacienda utilisera une convention unique :

```text
~/.claude/plugins/config/hacienda-juridique/company-profile.md
~/.claude/plugins/config/hacienda-juridique/<plugin>/CLAUDE.md
```

`company-profile.md` remplace progressivement `profil-cabinet.md`. Les anciens textes peuvent être supportés transitoirement, mais toute nouvelle génération utilisera `company-profile.md`.

Chaque `CLAUDE.md` livré dans un plugin est un template versionné. Il ne reçoit jamais de données utilisateur. Les données utilisateur vivent uniquement dans le chemin stable ci-dessus.

## Types De Plugins

Le générateur supporte quatre profils.

| Type | Usage | Exemples |
|---|---|---|
| `source-foundation` | serveur MCP de sources primaires | `hacienda-sources-officielles` |
| `legal-domain` | plugin métier avec skills et agents, sans MCP propre | `hacienda-social` |
| `legal-domain-with-mcp` | plugin métier avec serveur MCP dédié | `hacienda-propriete-intellectuelle` |
| `transversal-research` | recherche documentaire, bases privées, doctrine et recoupement | `hacienda-recherche-documentaire` |

Le type détermine les fichiers obligatoires, les sections README, le niveau de `.mcp.json`, les tests générés et les garde-fous attendus.

## Architecture

Ajouter un module interne :

```text
tools/hacienda-plugin-factory/
  schemas/
    plugin.schema.json
    skill.schema.json
    agent.schema.json
    mcp.schema.json
  templates/
    plugin/
    skill/
    agent/
    cold-start-interview/
    managed-agent-cookbook/
  src/
    create-plugin.ts
    add-skill.ts
    add-agent.ts
    harmonize-plugin.ts
    generate-docs.ts
    validate-plugin.ts
    compare-with-reference.ts
    registry.ts
  README.md
```

Le module peut commencer en TypeScript exécuté via Node. Il doit rester autonome, sans dépendance lourde, et réutiliser les APIs standard Node pour lire, écrire et valider les fichiers.

## Source De Vérité

Créer un registre déclaratif :

```text
plugins/registry.json
```

Chaque entrée décrit :

```json
{
  "name": "hacienda-social",
  "type": "legal-domain",
  "source": "./plugins/hacienda-social",
  "description": "...",
  "skills": ["entretien-demarrage", "recherche-sociale"],
  "agents": ["veilleur-reformes-sociales"],
  "mcp": {
    "mode": "references-source-foundation"
  }
}
```

La marketplace et les tests doivent être dérivés de ce registre, pas entretenus à la main.

## Commandes

Ajouter les scripts npm suivants :

```json
{
  "plugin:create": "node tools/hacienda-plugin-factory/dist/create-plugin.js",
  "plugin:add-skill": "node tools/hacienda-plugin-factory/dist/add-skill.js",
  "plugin:add-agent": "node tools/hacienda-plugin-factory/dist/add-agent.js",
  "plugin:harmonize": "node tools/hacienda-plugin-factory/dist/harmonize-plugin.js",
  "plugin:docs": "node tools/hacienda-plugin-factory/dist/generate-docs.js",
  "plugin:validate": "node tools/hacienda-plugin-factory/dist/validate-plugin.js",
  "plugin:compare-claude-legal": "node tools/hacienda-plugin-factory/dist/compare-with-reference.js"
}
```

Exemples :

```bash
npm run plugin:create -- --name hacienda-urbanisme --type legal-domain
npm run plugin:add-skill -- --plugin hacienda-social --skill controle-temps-travail
npm run plugin:add-agent -- --plugin hacienda-propriete-intellectuelle --agent veilleur-marques
npm run plugin:harmonize -- --all
npm run plugin:validate
```

## Contrat Des Skills

Chaque `SKILL.md` doit avoir :

- frontmatter YAML avec `name`, `description` et, si utile, `argument-hint` ;
- objectif clair ;
- déclencheurs d'usage ;
- prérequis de configuration ;
- sources attendues ;
- étapes de workflow ;
- format de sortie ;
- garde-fous juridiques ;
- validation humaine ;
- traitement des sources non consultées en `[à vérifier]` ;
- interdiction de présenter une sortie comme conseil juridique final.

Les skills qui citent des autorités doivent inclure un mécanisme de provenance :

- source consultée en session ;
- source utilisateur ;
- source officielle Hacienda ;
- connaissance modèle marquée `[à vérifier]`.

## Contrat Des Agents

Chaque agent doit préciser :

- ce qu'il surveille ;
- cadence par défaut ;
- entrées autorisées ;
- sorties attendues ;
- skills vers lesquels il route le travail substantiel ;
- limites : pas d'envoi, pas de dépôt, pas de paiement, pas de conseil final ;
- exigences de validation humaine ;
- comportement si sources ou configuration manquent.

Les agents autonomes plus complexes doivent pouvoir être décrits dans un cookbook :

```text
managed-agent-cookbooks/<plugin>/<agent>/
  agent.yaml
  README.md
  steering-examples.json
  subagents/
    <worker>.yaml
```

## Contrat MCP

Le validateur doit distinguer trois modes MCP :

1. `none` : aucun serveur MCP requis ;
2. `references-source-foundation` : le plugin métier dépend de `hacienda-sources-officielles`, sans exposer un serveur exécutable propre ;
3. `own-stdio-server` : le plugin expose un serveur exécutable avec `command` et `args`.

Un serveur `stdio` sans `command` ni `args` est invalide sauf si le mode du registre indique explicitement qu'il s'agit d'une référence symbolique. Cette règle clarifie l'ambiguïté actuelle.

## Documentation Générée

Le générateur produit ou répare :

- `.claude-plugin/marketplace.json` ;
- `README.md` racine ;
- `AGENTS.md` et `CLAUDE.md` si la liste des plugins actifs change ;
- README de chaque plugin ;
- tables de skills et agents ;
- documentation MCP ;
- documentation des cookbooks d'agents.

Les docs générées doivent rester éditables, mais la source structurée doit primer. Quand un champ est dérivé du registre, le commentaire ou la section doit le signaler clairement.

## Validation

Créer un validateur unique appelé par `npm run plugin:validate`. Il remplace progressivement les contrôles dispersés.

Contrôles minimaux :

- marketplace conforme au registre ;
- chaque plugin actif existe ;
- aucun plugin supprimé n'est référencé hors archives ;
- manifest local cohérent avec marketplace ;
- branding Hacienda strict ;
- licence `AGPL-3.0-or-later` ;
- repository `https://github.com/jamon8888/hacienda-juridique` ;
- structure Claude Legal présente selon le type ;
- convention `company-profile.md` respectée ;
- `.mcp.json` valide selon le mode ;
- chaque skill respecte le contrat ;
- chaque agent respecte le contrat ;
- hooks présents ;
- aucune source non consultée présentée comme vérifiée ;
- aucune formule de conseil juridique final ;
- aucun branding Anthropic, `claude-for-legal`, `ip-legal` ou chemin externe dans les plugins livrés.

Les tests Vitest peuvent appeler ce validateur au lieu de dupliquer les règles.

## Comparaison Avec Claude Legal

`plugin:compare-claude-legal` lit la référence locale et produit un rapport de parité structurelle :

- plugins de référence détectés ;
- fichiers structurants attendus ;
- sections communes de README ;
- sections communes de CLAUDE.md ;
- patterns de skills ;
- patterns d'agents ;
- patterns de cookbooks ;
- différences assumées Hacienda.

Le rapport ne doit pas exiger l'identité de contenu. Il vérifie la parité d'ingénierie.

## Migration Des Plugins Existants

Ordre recommandé :

1. créer `plugins/registry.json` à partir des quatre plugins actifs ;
2. ajouter le validateur en mode rapport non bloquant ;
3. corriger `company-profile.md` vs `profil-cabinet.md` ;
4. clarifier les modes `.mcp.json` ;
5. harmoniser `hacienda-sources-officielles` ;
6. harmoniser `hacienda-social` ;
7. harmoniser `hacienda-recherche-documentaire` ;
8. harmoniser `hacienda-propriete-intellectuelle` sans affaiblir ses spécificités ;
9. rendre `plugin:validate` bloquant dans `npm test`.

## Tests

Ajouter ou refondre les tests :

```text
packages/core/test/hacienda-plugin-registry.test.ts
packages/core/test/hacienda-plugin-contract.test.ts
packages/core/test/hacienda-plugin-factory.test.ts
packages/core/test/hacienda-skill-contract.test.ts
packages/core/test/hacienda-agent-contract.test.ts
```

Les tests doivent éviter les listes codées en dur, sauf pour vérifier explicitement l'ordre de distribution si l'ordre est un choix produit.

## Risques

Le principal risque est de transformer des templates souples en règles trop rigides. Pour l'éviter, le registre doit distinguer les types de plugins et les règles optionnelles.

Le deuxième risque est de casser les plugins existants en harmonisant trop vite. La migration doit commencer en mode audit, puis passer en mode correction.

Le troisième risque est la confusion entre structure Claude Legal et contenu Claude Legal. La spec interdit toute reprise de branding, de chemin de configuration Anthropic ou de contenu juridique américain non adapté.

## Critères D'Acceptation

Le système est terminé quand :

- un nouveau plugin peut être généré depuis une seule commande ;
- ce plugin apparaît dans marketplace, docs et tests ;
- `plugin:validate` passe ;
- les quatre plugins actifs respectent le même contrat ;
- les différences avec Claude Legal sont documentées comme adaptations Hacienda ;
- `npm test`, `npm run typecheck`, `npm run build`, `npm run branding:check`, `npm audit --audit-level=moderate` et `git diff --check` passent.

