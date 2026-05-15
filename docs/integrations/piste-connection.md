# Connexion PISTE Pour Hacienda Sources Officielles

## Resume

PISTE n'est pas un serveur MCP externe a installer comme Pappers. PISTE est l'API gouvernementale exposee par la DINUM pour acceder notamment a Legifrance et Judilibre.

Dans Hacienda, l'utilisateur installe le serveur MCP local `Hacienda Sources Officielles`. Ce serveur MCP local lit les identifiants PISTE, gere OAuth, appelle les API PISTE et expose des tools MCP propres a Hacienda : recherche Legifrance, articles, codes, BOFiP, jurisprudence, statut PISTE et cache.

La chaine est donc :

```text
Client MCP / Claude / Codex
  -> serveur MCP local Hacienda Sources Officielles
  -> client OAuth PISTE interne
  -> API PISTE Legifrance / Judilibre
```

## Pourquoi PISTE N'Est Pas Un MCP Externe

Un MCP externe expose directement des tools a l'assistant. Pappers fonctionne ainsi : on declare un endpoint Streamable HTTP Pappers et le client MCP peut l'interroger.

PISTE fonctionne autrement :

- PISTE est une API REST securisee par OAuth `client_credentials`.
- PISTE ne fournit pas un manifeste MCP ni des tools MCP prets a brancher.
- Hacienda doit transformer les endpoints PISTE en tools juridiques stables, avec schemas, cache, erreurs lisibles et dossier de preuve.
- Hacienda doit masquer les secrets et separer la source officielle de l'analyse juridique.

Le MCP installe par l'utilisateur est donc `Hacienda Sources Officielles`, pas `PISTE`.

## Ce Que L'Utilisateur Installe

L'utilisateur installe le plugin Hacienda :

```text
plugins/hacienda-sources-officielles
```

Le fichier MCP du plugin declare :

```json
{
  "mcpServers": {
    "Hacienda Sources Officielles": {
      "type": "stdio",
      "title": "Hacienda Sources Officielles",
      "description": "Acces local aux sources officielles francaises via PISTE."
    }
  }
}
```

Ce serveur stdio demarre localement et utilise les packages du depot. Il n'y a pas d'URL MCP PISTE a renseigner.

## Credentials Necessaires

Pour Legifrance via PISTE :

- `PISTE_CLIENT_ID`
- `PISTE_CLIENT_SECRET`
- `PISTE_ENV` optionnel : `production` par defaut, `sandbox` pour l'environnement bac a sable.

Pour Judilibre via PISTE :

- `JUDILIBRE_KEY_ID` de preference ;
- ou `PISTE_KEY_ID` comme fallback mutualise.

Ne jamais commiter ces valeurs.

## Configuration Par Variables D'Environnement

PowerShell :

```powershell
$env:PISTE_CLIENT_ID = "<client-id>"
$env:PISTE_CLIENT_SECRET = "<client-secret>"
$env:PISTE_ENV = "production"
```

Bash :

```bash
export PISTE_CLIENT_ID="<client-id>"
export PISTE_CLIENT_SECRET="<client-secret>"
export PISTE_ENV="production"
```

Sandbox :

```powershell
$env:PISTE_ENV = "sandbox"
```

## Configuration Par Fichier Local

Hacienda supporte aussi un fichier local pour les clients GUI qui ne transmettent pas toujours les variables d'environnement au serveur MCP.

Chemin :

```text
~/.config/Hacienda/credentials.json
```

Contenu :

```json
{
  "PISTE_CLIENT_ID": "<client-id>",
  "PISTE_CLIENT_SECRET": "<client-secret>",
  "PISTE_ENV": "production"
}
```

Ce fichier doit rester local a la machine de l'utilisateur. Il ne doit pas etre ajoute au depot.

## Ordre De Resolution

Le serveur Hacienda charge la configuration dans cet ordre :

1. variables d'environnement ;
2. fichier `~/.config/Hacienda/credentials.json` ;
3. statut `credentials missing` si rien n'est disponible.

Les placeholders litteraux comme `${PISTE_CLIENT_ID}` sont ignores pour permettre le fallback fichier.

## Diagnostic

Le tool MCP a utiliser est :

```text
piste_status
```

Il verifie :

- source des credentials : `env`, `file` ou `none` ;
- URL OAuth utilisee ;
- environnement `production` ou `sandbox` ;
- appel OAuth reel ;
- appel API Legifrance live minimal.

Le diagnostic ne fait pas de recherche juridique et ne revele pas le secret.

## Erreurs Frequentes

### Credentials Manquants

Message typique :

```text
Credentials PISTE manquants
```

Action :

- definir `PISTE_CLIENT_ID` et `PISTE_CLIENT_SECRET` ;
- ou creer `~/.config/Hacienda/credentials.json` ;
- relancer le client MCP si necessaire.

### OAuth 401

Cause probable :

- mauvais client id ;
- secret expire ;
- mauvais environnement sandbox/production ;
- secret copie avec espace ou retour ligne.

Action :

- regenerer le secret sur PISTE ;
- verifier `PISTE_ENV` ;
- relancer `piste_status`.

### 403 subscription required

Message observe :

```text
subscription required
```

Cela signifie que les credentials OAuth fonctionnent, mais que l'application PISTE n'a pas souscrit a l'API demandee, par exemple Legifrance.

Action :

- ouvrir le dashboard PISTE ;
- selectionner l'application ;
- verifier les souscriptions API ;
- souscrire a l'API Legifrance ou Judilibre selon le besoin ;
- attendre l'activation si necessaire ;
- relancer `piste_status`.

### Hoquet PISTE 400 / 5xx / 429

Hacienda gere deja certains retries et messages explicites.

Action :

- relancer la meme demande apres 30 a 60 secondes ;
- verifier le statut PISTE public ;
- conserver le dossier de preuve avec statut `[a verifier]` si la source n'a pas pu etre consultee.

## Sources Couvertes

Via PISTE et Hacienda Sources Officielles :

- Legifrance ;
- codes et articles ;
- JORF / LODA selon endpoints disponibles ;
- KALI / conventions collectives selon endpoints disponibles ;
- BOFiP via les outils Hacienda quand disponible ;
- Judilibre via `JUDILIBRE_KEY_ID` ou `PISTE_KEY_ID`.

## Regle De Preuve

Une source n'est consideree verifiee que si le tool Hacienda correspondant a effectivement consulte la source officielle.

Si PISTE est absent, en erreur, sans souscription ou indisponible, la sortie doit marquer la source `[a verifier]`.

## Difference Avec Pappers

| Sujet | PISTE | Pappers |
| --- | --- | --- |
| Nature | API officielle gouvernementale | MCP externe prive |
| Installation MCP | Via `Hacienda Sources Officielles` | Endpoint Streamable HTTP Pappers |
| Secrets | `PISTE_CLIENT_ID`, `PISTE_CLIENT_SECRET`, parfois `PISTE_KEY_ID` | `PAPPERS_API_KEY` |
| Role | Sources officielles normatives et primaires | Business intelligence entreprise |
| Validation | Peut verifier une source officielle si appel live OK | Doit etre recoupe par sources officielles |

## Checklist Installateur

1. Installer le plugin `hacienda-sources-officielles`.
2. Configurer `PISTE_CLIENT_ID` et `PISTE_CLIENT_SECRET`.
3. Choisir `PISTE_ENV=production` sauf besoin sandbox.
4. Pour GUI, ajouter `~/.config/Hacienda/credentials.json` si les variables d'environnement ne passent pas.
5. Lancer `piste_status`.
6. Si `subscription required`, activer la souscription API dans le dashboard PISTE.
7. Faire un test de recherche ou d'article via Hacienda Sources Officielles.
8. Ne jamais publier les credentials dans Git, logs ou tickets.
