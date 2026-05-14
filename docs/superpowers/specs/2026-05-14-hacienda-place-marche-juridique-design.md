# Hacienda Place De Marché Juridique — Spécification De Conception

## Objectif

Créer une marketplace française de plugins juridiques professionnels, entièrement en français, structurée selon le modèle de qualité d'une architecture marketplace juridique de référence : un manifeste marketplace, un plugin par domaine de pratique, des profils de pratique, des skills opérationnels, des agents de suivi, des garde-fous et des connecteurs MCP.

Hacienda doit se positionner comme une couche d'orchestration et de preuve pour avocats, juristes, fiscalistes et experts-comptables. Le produit ne remplace pas les bases juridiques existantes : il les organise, les exploite avec prudence et vérifie les sources primaires via la couche sources officielles.

## Décisions Validées

- Le nom produit est **Hacienda**.
- Toute l'expérience utilisateur est en français.
- La marketplace principale vise les usages professionnels supervisés.
- Les agents sont nommés par mission, pas par personnages.
- Toute référence à un branding externe doit être absente des plugins, packages, chemins de configuration, commandes, descriptions, README et exemples.
- Le MCP Légifrance/BOFiP devient le plugin socle `hacienda-sources-officielles`.
- La marketplace suit une architecture de plugins par domaine, proche du modèle marketplace de référence, mais adaptée aux usages français.

## Structure Cible

```text
hacienda-juridique/
  .claude-plugin/
    marketplace.json
  hacienda-sources-officielles/
  hacienda-recherche-documentaire/
  hacienda-fiscal/
  hacienda-social/
  hacienda-contrats/
  hacienda-societes/
  hacienda-contentieux/
  hacienda-donnees-personnelles/
  hacienda-produit-consommation/
  hacienda-reglementaire/
  hacienda-gouvernance-ia/
  hacienda-propriete-intellectuelle/
  hacienda-droit-public/
  hacienda-permanences-juridiques/
  hacienda-hub-confiance/
```

Chaque plugin suit la même forme :

```text
<plugin>/
  .claude-plugin/
    plugin.json
  .mcp.json
  CLAUDE.md
  README.md
  skills/
  agents/
  hooks/
```

## Convention De Nommage

Les noms visibles sont en français :

- `hacienda-sources-officielles`
- `hacienda-recherche-documentaire`
- `hacienda-fiscal`
- `hacienda-social`
- `hacienda-contrats`
- `hacienda-societes`
- `hacienda-contentieux`
- `hacienda-donnees-personnelles`
- `hacienda-produit-consommation`
- `hacienda-reglementaire`
- `hacienda-gouvernance-ia`
- `hacienda-propriete-intellectuelle`
- `hacienda-droit-public`
- `hacienda-permanences-juridiques`
- `hacienda-hub-confiance`

Les packages internes suivent la même logique :

- `@hacienda/core`
- `@hacienda/plugin-sources-officielles-server`
- `@hacienda/plugin-fiscal-server`
- `createHaciendaServer`
- `HACIENDA_CREDENTIALS_FILE`
- `~/.config/hacienda/credentials.json`

## Profil Cabinet Et Profils De Pratique

Hacienda utilise deux niveaux de configuration, comme les plugins juridiques de référence :

1. Profil cabinet partagé :

```text
~/.claude/plugins/config/hacienda-juridique/profil-cabinet.md
```

Il contient les informations communes : type de structure, barreau ou organisation, rôle utilisateur, niveau de risque, circuits de validation, outils documentaires disponibles, règles de confidentialité.

2. Profil de pratique par plugin :

```text
~/.claude/plugins/config/hacienda-juridique/<plugin>/CLAUDE.md
```

Chaque skill métier doit lire le profil cabinet puis son profil de pratique avant tout travail substantiel. Si le profil contient encore des marqueurs de configuration non remplis, le skill doit demander d'exécuter l'entretien de démarrage du plugin.

## Règle Globale De Preuve

Tout plugin Hacienda applique cette règle :

> Toute citation juridique doit être vérifiée via `hacienda-sources-officielles`. Si une source officielle n'a pas été consultée via MCP, la citation est marquée `[à vérifier]`. Aucun livrable professionnel ne sort sans dossier de preuve.

Le dossier de preuve est un bloc standard placé à la fin ou en annexe des livrables professionnels :

```text
Sources officielles vérifiées
- Source
- Identifiant
- Version ou date d'application
- Date de consultation
- Outil MCP utilisé
- Citation exacte ou référence
- Lien officiel
- Statut : vérifié / à vérifier / source secondaire uniquement
```

## Rôle Des Plugins Socles

### `hacienda-sources-officielles`

Plugin obligatoire pour les livrables juridiques fiables. Il fournit l'accès local aux sources primaires françaises : Légifrance, BOFiP, JORF, KALI, jurisprudence, textes codifiés et non codifiés.

### `hacienda-recherche-documentaire`

Plugin d'orchestration des bases payantes et éditoriales utilisées par les avocats : Doctrine, Lexis, Lefebvre Dalloz, Lextenso, Lexbase, Dalloz, Navis, Elnet et Lamyline. Il travaille prioritairement via Claude dans Chrome en mode supervisé, puis fait vérifier les références primaires par `hacienda-sources-officielles`.

### `hacienda-hub-confiance`

Plugin de sécurité marketplace : installation de skills tiers, allowlist, contrôle licence, scan d'injection, contrôle des connecteurs et journal d'installation. Il est restrictif par défaut.

## Manifest Marketplace

Le manifeste racine doit déclarer uniquement les plugins Hacienda. Exemple de structure attendue :

```json
{
  "name": "hacienda-juridique",
  "owner": {
    "name": "Hacienda",
    "url": "https://hacienda.diy"
  },
  "plugins": [
    {
      "name": "hacienda-sources-officielles",
      "source": "./hacienda-sources-officielles",
      "description": "Accès local aux sources officielles françaises via MCP : Légifrance, BOFiP, JORF, KALI et jurisprudence."
    }
  ]
}
```

Chaque description doit être courte, professionnelle et orientée usage.

## Intégration Claude Desktop, Cowork Et Chrome

Hacienda doit distinguer trois surfaces :

- Claude Desktop et Claude Code : support des extensions locales et MCP locaux.
- Claude Cowork : support des connecteurs distants et plugins, mais pas des serveurs locaux privés de la même façon.
- Claude dans Chrome : navigation supervisée sur les plateformes web où l'utilisateur est déjà connecté.

Conséquence d'architecture :

- `hacienda-sources-officielles` commence comme extension locale.
- Les connecteurs distants officiels ne sont ajoutés que si l'infrastructure de déploiement le permet.
- La recherche sur les bases payantes passe par Chrome supervisé tant qu'il n'existe pas de connecteur officiel autorisé.

## Sécurité Et Confidentialité

Exigences obligatoires :

- Aucun secret dans le code ou les docs d'exemple.
- Les identifiants PISTE sont lus depuis l'environnement ou un stockage local Hacienda.
- Aucun stockage d'identifiants Doctrine, Lexis, Lefebvre Dalloz ou autres bases payantes.
- Aucune copie longue de contenus éditoriaux protégés.
- Aucun contournement de paywall, de restriction contractuelle, de CAPTCHA ou d'API privée.
- Aucun upload de pièce client dans une plateforme tierce sans validation explicite.
- Les actions Chrome se font en mode plan approuvé, pas en autonomie complète.

## Livraison Par Phases

### Phase 1 — Rebranding Et Socle

- Renommer le monorepo, les packages, les plugins existants et les chemins de configuration.
- Supprimer les références à tout branding externe.
- Stabiliser `hacienda-sources-officielles`.
- Ajouter les premiers skills transverses de preuve.

### Phase 2 — Fiscal

- Créer `hacienda-fiscal`.
- Prioriser BOFiP, CGI, LPF, TVA, IS, contrôle fiscal, rescrit.
- Produire des livrables fiscaux avec dossier de preuve.

### Phase 3 — Social Et Contentieux

- Créer `hacienda-social`.
- Créer `hacienda-contentieux`.
- Exploiter KALI, jurisprudence sociale et procédure.

### Phase 4 — Contrats Et Sociétés

- Créer `hacienda-contrats`.
- Créer `hacienda-societes`.

### Phase 5 — Données, Réglementaire, IA, PI, Public

- Créer les plugins spécialisés restants.
- Ajouter les agents de veille.
- Ajouter les intégrations Chrome vers les bases éditoriales.

### Phase 6 — Hub Confiance

- Créer le hub d'installation et de validation des skills tiers.
- Appliquer le modèle allowlist, licence et scan injection.

## Critères D'Acceptation

- La marketplace ne contient aucun nom, description ou commande lié à un branding externe.
- Tous les noms visibles de plugins, skills, agents et commandes sont en français.
- Le manifeste marketplace installe les plugins Hacienda.
- `hacienda-sources-officielles` est référencé comme couche de preuve dans tous les plugins métier.
- Chaque plugin métier possède un profil de pratique et un entretien de démarrage.
- Chaque livrable professionnel inclut un dossier de preuve ou indique explicitement pourquoi la preuve officielle manque.
- Les bases payantes sont utilisées comme sources secondaires ou éditoriales, jamais comme preuve primaire finale sans vérification officielle.

## Risques

- Renommage incomplet : risque de chemins cassés, commandes obsolètes ou références visibles incohérentes.
- Confusion entre source officielle et source éditoriale : risque de livrable juridiquement fragile.
- Automatisation Chrome trop large : risque confidentialité, conditions contractuelles et prompt injection.
- Scope trop large : risque de marketplace inachevée si trop de plugins sont construits avant le socle.

## Décision De Priorité

La séquence recommandée est :

1. `hacienda-sources-officielles`
2. `hacienda-fiscal`
3. `hacienda-recherche-documentaire`
4. `hacienda-social`
5. `hacienda-contentieux`
6. `hacienda-contrats`
7. autres plugins par valeur métier
