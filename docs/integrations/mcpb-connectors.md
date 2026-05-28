# Connectors MCPB Hacienda

## Principe

Les fichiers `.mcpb` Hacienda sont des bundles de serveurs MCP locaux pour
Claude Desktop. Ils servent à installer un connecteur depuis les réglages
Connectors / Extensions.

Ils ne remplacent pas les plugins Cowork / Claude Code. Un plugin Cowork
contient les skills, agents, hooks, profils et déclarations MCP ; un `.mcpb`
contient un serveur MCP local autonome et son `manifest.json`.

## Bundles Disponibles

| Bundle | Serveur MCP | Statut |
| --- | --- | --- |
| `plugins/hacienda-sources-officielles.mcpb` | Sources officielles françaises et européennes | Disponible |
| `plugins/hacienda-droit-affaires.mcpb` | Droit des affaires, registres entreprises et sources officielles utiles au M&A | Disponible |
| `plugins/hacienda-propriete-intellectuelle.mcpb` | Registres et outils PI Hacienda | Disponible |

`hacienda-recherche-documentaire` n'a pas de serveur MCP local propre et ne
produit donc pas de `.mcpb`.

## Generation

Construire les entrypoints bundled :

```bash
npm --workspace @hacienda/plugin-sources-officielles-server run build:mcpb
npm --workspace @hacienda/plugin-droit-affaires-server run build:mcpb
npm --workspace @hacienda/plugin-propriete-intellectuelle-server run build:mcpb
```

Valider et packager :

```bash
npx @anthropic-ai/mcpb validate plugins/hacienda-sources-officielles/manifest.json
npx @anthropic-ai/mcpb pack plugins/hacienda-sources-officielles plugins/hacienda-sources-officielles.mcpb
npx @anthropic-ai/mcpb clean plugins/hacienda-sources-officielles.mcpb

npx @anthropic-ai/mcpb validate plugins/hacienda-droit-affaires/manifest.json
npx @anthropic-ai/mcpb pack plugins/hacienda-droit-affaires plugins/hacienda-droit-affaires.mcpb
npx @anthropic-ai/mcpb clean plugins/hacienda-droit-affaires.mcpb

npx @anthropic-ai/mcpb validate plugins/hacienda-propriete-intellectuelle/manifest.json
npx @anthropic-ai/mcpb pack plugins/hacienda-propriete-intellectuelle plugins/hacienda-propriete-intellectuelle.mcpb
npx @anthropic-ai/mcpb clean plugins/hacienda-propriete-intellectuelle.mcpb
```

## Validation Runtime

Un `manifest.json` valide ne suffit pas. Après génération, décompresser le
bundle et vérifier que le serveur démarre hors du workspace repo.

Critères minimaux :

- `hacienda-sources-officielles.mcpb` expose les tools Sources Officielles ;
- `hacienda-droit-affaires.mcpb` expose les tools Droit des affaires
  (sources officielles, BODACC/Pappers, BOFiP/BOSS utiles au M&A) ;
- `hacienda-propriete-intellectuelle.mcpb` expose le périmètre PI ;
- aucun serveur ne dépend d'un package workspace comme `@hacienda/core` au
  runtime isolé ;
- aucun secret n'est embarqué.

Claude Desktop peut lancer une extension Node depuis un répertoire courant
système, par exemple `C:\WINDOWS\system32` sous Windows. Le serveur Hacienda ne
doit donc jamais utiliser `process.cwd()` pour son cache. La résolution attendue
est :

1. `CACHE_DIR` si fourni explicitement ;
2. `${CLAUDE_PLUGIN_ROOT}/.cache` dans un plugin ou MCPB installé ;
3. le cache utilisateur Hacienda en dernier recours.

## Signature

Les bundles locaux non signés peuvent être refusés si une politique admin exige
`isDesktopExtensionSignatureRequired`. Dans ce cas, signer les `.mcpb` avant
distribution.

## Fichiers ZIP

Les fichiers `.zip` générés par `npm run plugin:package-cowork` sont des
archives de plugins Cowork. Ils ne sont pas des bundles MCPB. Ne pas les
distribuer comme connecteurs Claude Desktop.
