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
- Le serveur doit exposer un perimetre explicite de tools ; pas un registre
  global implicite.
- Les tools hors perimetre restent dans le plugin ou serveur qui en a la
  responsabilite primaire.

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
