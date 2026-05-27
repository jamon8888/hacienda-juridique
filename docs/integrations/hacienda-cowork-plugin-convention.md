# Convention Plugin Cowork Hacienda

Cette convention formalise le packaging cible des plugins Hacienda qui
embarquent un serveur MCP local et un profil utilisateur stable.

Le plugin pilote est `hacienda-propriete-intellectuelle`.

## Bundle minimal

Chaque plugin Cowork Hacienda doit livrer :

- `.claude-plugin/plugin.json`
- `.mcp.json`
- `version.json`
- `CLAUDE.md`
- `README.md`
- `skills/`
- `hooks/hooks.json`
- `agents/` si le domaine embarque des suivis ou monitors

## Plugin Cowork Vs MCPB

Un plugin Cowork Hacienda n'est pas un fichier `.mcpb`.

| Surface | Role | Format |
| --- | --- | --- |
| Plugin Cowork / Claude Code | Workflows juridiques, skills, agents, hooks, profils et déclarations MCP. | Dossier plugin + `.claude-plugin/plugin.json` |
| Upload plugin Cowork isolé | Archive propre du plugin, sans fichiers MCPB ni traces de développement. | `.zip` |
| Connector Claude Desktop | Serveur MCP local autonome, installable depuis Connectors / Extensions. | `.mcpb` |

Quand un plugin embarque un serveur MCP local, Hacienda peut aussi produire un
`.mcpb` séparé pour faciliter l'installation du connecteur dans Claude
Desktop. Ce `.mcpb` ne remplace pas le plugin Cowork.

## Regles de structure

- `plugin.json` porte l'identite produit et la version visible du plugin.
- `version.json` est la source unique de version pour resynchroniser le bundle.
- `.mcp.json` declare un serveur MCP reel :
  - `type`
  - `command`
  - `args`
  - `title`
  - `description`
- `CLAUDE.md` versionne est un template. Les donnees utilisateur vivent dans :

```text
~/.claude/plugins/config/hacienda-juridique/<plugin>/CLAUDE.md
```

## Regles runtime

- Le serveur MCP du plugin doit demarrer depuis la config declaree dans
  `.mcp.json`.
- Tout chemin vers un fichier embarque doit utiliser `${CLAUDE_PLUGIN_ROOT}`.
  Un chemin repo-local comme `./plugins/<plugin>/...` casse apres installation
  dans le cache Cowork / Claude Code.
- Le serveur doit exposer un perimetre explicite de tools ; pas un registre
  global implicite.
- Les tools hors perimetre restent dans le plugin ou serveur qui en a la
  responsabilite primaire.

## Bundles MCPB Optionnels

Les serveurs MCP locaux packagés en Connectors sont :

```text
plugins/hacienda-sources-officielles.mcpb
plugins/hacienda-propriete-intellectuelle.mcpb
```

Chaque bundle doit passer :

```bash
npx @anthropic-ai/mcpb validate plugins/<plugin>/manifest.json
npx @anthropic-ai/mcpb pack plugins/<plugin> plugins/<plugin>.mcpb
npx @anthropic-ai/mcpb clean plugins/<plugin>.mcpb
```

Le runtime doit aussi être testé après unpack, car un manifest valide ne prouve
pas que le serveur démarre sans dépendre du workspace local.

`hacienda-recherche-documentaire` n'a pas de serveur MCP local propre ; il
reste un plugin Cowork transversal et ne produit pas de `.mcpb`.

## Packaging Cowork

La commande standard génère le dossier marketplace installable et un ZIP propre
par plugin actif :

```bash
npm run plugin:package-cowork
```

Sortie :

```text
dist-pkg/cowork-marketplace/
  .claude-plugin/marketplace.json
  plugins/
  zips/
```

Les ZIP Cowork sont destinés à l'upload plugin. Ils ne doivent pas contenir
`manifest.json`, `.mcpbignore`, `logs/`, `.cache/`, `node_modules/`,
`mcp-server/src/`, fichiers `.bak`, `.rar`, `.mcpb` ou ZIP imbriqués.

## Regles de compatibilite

- preferer l'ajout d'alias ou le maintien des noms existants aux renommages
  cassants ;
- ne pas casser le chemin user-stable du `CLAUDE.md` ;
- realigner la doc sur le runtime reel avant d'etendre le perimetre.

## Regles documentaires

- README = capacites effectivement livrees ;
- `.mcp.json` = connecteurs reels, pas metadonnees marketing ;
- aucune reference externe de benchmarking ne doit rester dans les fichiers
  livres du plugin.
