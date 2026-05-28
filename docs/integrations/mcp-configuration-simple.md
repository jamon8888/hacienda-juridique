# Configuration MCP Simple

## Principe

Hacienda suit le modele simple de Claude Cowork Legal :

```text
.mcp.json = connecteurs disponibles
config utilisateur = profil et preferences
test live = preuve que le connecteur est connecte
```

La regle importante : disponible ne veut pas dire connecte.

Un connecteur present dans `.mcp.json` indique seulement que le plugin sait l'utiliser. Il ne faut annoncer "connecte" que si un test live a reussi.

Pour un serveur MCP local Hacienda, `.mcp.json` doit maintenant declarer un
serveur executable (`type`, `command`, `args`) et pas seulement un titre
marketing.

Quand le serveur est livré par un plugin Cowork, les chemins dans `.mcp.json`
doivent pointer vers le plugin installé avec `${CLAUDE_PLUGIN_ROOT}`. Ne pas
utiliser de chemin repo-local comme `./plugins/hacienda-...`, car Claude copie
les plugins installés dans son cache local.

Les bundles `.mcpb` sont une distribution séparée pour installer un serveur MCP
local comme Connector Claude Desktop. Ils ne remplacent pas les plugins
Cowork.

## Les Trois Niveaux

| Niveau | Ce que ca veut dire | Exemple Hacienda |
| --- | --- | --- |
| Disponible | Declare dans `.mcp.json` | `Hacienda Sources Officielles`, `Pappers` |
| Configure | Secrets ou profil utilisateur presents | `PISTE_CLIENT_ID`, `PAPPERS_API_KEY`, profil CLAUDE |
| Connecte | Tool appele avec succes | `piste_status` OK, decouverte Pappers OK |

## Configuration Utilisateur

Le profil utilisateur reste dans :

```text
~/.claude/plugins/config/hacienda-juridique/<plugin>/CLAUDE.md
```

Ce fichier sert a stocker :

- role utilisateur ;
- type de structure ;
- livrables attendus ;
- sources prioritaires ;
- niveau de validation humaine ;
- dossiers de preuve ;
- integrations disponibles, configurees ou verifiees.

Il ne doit pas contenir de secrets.

## Secrets

Les secrets restent hors du depot et hors du profil CLAUDE.

PISTE :

```text
PISTE_CLIENT_ID
PISTE_CLIENT_SECRET
PISTE_ENV
```

Fichier local unique pour les serveurs et scripts Hacienda :

```text
~/.config/Hacienda/credentials.json
```

Exemple :

```json
{
  "PISTE_CLIENT_ID": "<client-id>",
  "PISTE_CLIENT_SECRET": "<client-secret>",
  "PISTE_ENV": "production",
  "INPI_DATA_LOGIN": "<login-inpi>",
  "INPI_DATA_PASSWORD": "<password-inpi>",
  "EUIPO_API_KEY": "<euipo-api-key>",
  "OEB_CONSUMER_KEY": "<oeb-consumer-key>",
  "OEB_CONSUMER_SECRET": "<oeb-consumer-secret>",
  "PAPPERS_API_KEY": "<pappers-api-key>"
}
```

Les variables d'environnement restent prioritaires si le process MCP les reçoit deja.

Exception importante :

- les serveurs MCP locaux Hacienda et les scripts de validation peuvent lire `credentials.json` ;
- le connecteur Pappers reste un MCP `streamable-http` externe dans `.mcp.json` ;
- sur `main`, la resolution de son URL `https://mcp.pappers.fr/${PAPPERS_API_KEY}` depend encore du `PAPPERS_API_KEY` visible par le client Cowork.

## Check Integrations

Un entretien de demarrage ou une commande de verification doit produire une table simple :

```text
✓ Hacienda Sources Officielles - connected (piste_status OK)
⚪ Pappers - configured but not verified. Run node scripts/pappers-mcp-discover.mjs
✗ Pappers - not configured. Add PAPPERS_API_KEY if business intelligence is needed.
```

Ne jamais afficher `✓` sur la seule base d'un `.mcp.json`.

## Plugin Cowork Pilote

`hacienda-propriete-intellectuelle` sert de plugin pilote pour la convention
Cowork Hacienda :

- `version.json` pour synchroniser la version visible du plugin ;
- `.mcp.json` `stdio` executable pour le serveur PI local ;
- chemin user-stable dans `~/.claude/plugins/config/hacienda-juridique/...` ;
- scoping explicite des tools exposes par le serveur.

Convention detaillee :

```text
docs/integrations/hacienda-cowork-plugin-convention.md
```

## PISTE

PISTE n'est pas un MCP externe. L'utilisateur installe `Hacienda Sources Officielles`.

Verification :

```text
piste_status
```

Resultats attendus :

- `credentialsSource: env` ou `file` ;
- OAuth OK ;
- API Legifrance live OK ;
- pas de secret affiche.

Si le resultat indique `subscription required`, les credentials marchent mais la souscription API PISTE manque.

## Pappers

Pappers est un MCP externe optionnel.

Verification :

```powershell
node scripts/pappers-mcp-discover.mjs
```

Le script lit d'abord `PAPPERS_API_KEY` dans l'environnement, puis `~/.config/Hacienda/credentials.json` si la variable n'est pas presente.

Pour activer le connecteur externe Pappers lui-meme dans Cowork, `PAPPERS_API_KEY` doit encore etre resolu par le client au moment d'interpreter `.mcp.json`.

Resultats attendus :

- endpoint masque ;
- tools visibles ;
- pas de cle affichee ;
- statut `credits_insufficient` si le compte n'a pas de credits metier.

## Experience Installateur

Le chemin simple pour l'utilisateur :

1. Installer le plugin Hacienda.
2. Lancer l'entretien de demarrage.
3. Configurer les secrets localement, jamais dans Git.
4. Lancer la verification des integrations.
5. Utiliser les features disponibles.
6. re-run la verification apres ajout d'un connecteur ou changement de credentials.

## Installation Connector MCPB

Pour un client qui veut seulement installer un serveur MCP local dans Claude
Desktop, utiliser les bundles :

```text
plugins/hacienda-sources-officielles.mcpb
plugins/hacienda-droit-affaires.mcpb
plugins/hacienda-propriete-intellectuelle.mcpb
```

Ces bundles s'installent depuis Claude Desktop, réglages Connectors /
Extensions. Ils contiennent un `manifest.json` MCPB et un entrypoint serveur
bundled.

Les ZIP Cowork générés par `npm run plugin:package-cowork` sont utilisables
pour uploader un plugin isolé. Ils ne sont pas des bundles MCPB et ne
remplacent pas les `.mcpb` quand l'objectif est d'installer seulement un
serveur MCP local dans Claude Desktop.

## Phrase Produit

Hacienda fonctionne meme si tous les connecteurs ne sont pas connectes. Les features degrade gracefully : si une source n'est pas joignable, la sortie indique `[à vérifier]` et propose le chemin de connexion.

## Distribution locale Hacienda + Anno

Pour les clients qui utilisent aussi le moteur local Anno, generez une distribution separee :

```bash
npm run plugin:anno-dist
```

Le dossier produit est :

```text
dist/hacienda-anno-desktop/
```

Cette distribution ajoute `anno-rag` a la configuration Claude Desktop sans rendre Anno obligatoire pour les plugins Hacienda de base.

La distribution genere aussi une couche d'orchestration Anno :

```text
dist/hacienda-anno-desktop/ANNO-COORDINATOR.md
dist/hacienda-anno-desktop/plugins/<plugin>/ANNO-WORKFLOWS.md
```

`ANNO-COORDINATOR.md` definit le socle transversal : `anno_health`,
fallback sans Anno, PII, ingestion explicite, recherche, graphe, memoire et
rehydratation locale.

Chaque `ANNO-WORKFLOWS.md` specialise ce socle pour le plugin concerne.
Recherche documentaire utilise Anno pour le corpus client ; propriete
intellectuelle utilise les outils Anno de contrat, risque, timeline et
citation ; sources officielles conserve Hacienda comme autorite primaire et
utilise Anno seulement pour relier les faits du dossier.

Par defaut, la configuration generee pointe vers :

```text
C:/Users/NMarchitecte/anno/target/release/anno-rag.exe
```

Cette valeur est un defaut de developpement local. Pour une distribution
client, utilisez toujours un chemin explicite vers le binaire Anno installe sur
le poste client.

Pour un autre poste client, fournissez un chemin explicite :

```bash
npm run plugin:anno-dist -- --anno-binary "C:/chemin/client/anno-rag.exe"
```

Le depot Anno n'est pas modifie par cette commande. Si le binaire Anno n'existe pas, Claude Desktop ne pourra pas demarrer le serveur `anno-rag`, mais les plugins Hacienda restent utilisables sans cette couche.
