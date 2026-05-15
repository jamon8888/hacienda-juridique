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

Pappers :

```text
PAPPERS_API_KEY
```

Fallback local pour PISTE :

```text
~/.config/Hacienda/credentials.json
```

## Check Integrations

Un entretien de demarrage ou une commande de verification doit produire une table simple :

```text
✓ Hacienda Sources Officielles - connected (piste_status OK)
⚪ Pappers - configured but not verified. Run node scripts/pappers-mcp-discover.mjs
✗ Pappers - not configured. Add PAPPERS_API_KEY if business intelligence is needed.
```

Ne jamais afficher `✓` sur la seule base d'un `.mcp.json`.

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
$env:PAPPERS_API_KEY = "<rotated-key>"
node scripts/pappers-mcp-discover.mjs
```

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

## Phrase Produit

Hacienda fonctionne meme si tous les connecteurs ne sont pas connectes. Les features degrade gracefully : si une source n'est pas joignable, la sortie indique `[a verifier]` et propose le chemin de connexion.
