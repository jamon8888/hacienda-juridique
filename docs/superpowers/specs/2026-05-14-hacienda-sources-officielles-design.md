# Hacienda Sources Officielles — Spécification De Conception

## Objectif

Construire le plugin socle `hacienda-sources-officielles`, utilisable par toute la marketplace Hacienda comme couche de preuve officielle pour Légifrance, BOFiP, JORF, KALI et la jurisprudence.

Le plugin doit fournir des outils MCP fiables, des workflows de vérification, un dossier de preuve standardisé et des garde-fous empêchant les plugins métier de présenter comme vérifiée une citation non consultée sur source primaire.

## Périmètre

Sources couvertes par le socle :

- Légifrance : codes, articles, textes LODA, JORF, jurisprudence, circulaires.
- BOFiP : recherche et consultation de doctrine fiscale.
- KALI/IDCC : conventions collectives via les endpoints Légifrance.
- Registre d'endpoints Légifrance : couverture du Swagger hors ping.
- Appel expert : outil d'appel direct d'un endpoint enregistré pour les cas avancés.

Sources futures possibles, hors première livraison :

- CNIL.
- EUR-Lex.
- AMF.
- ACPR.
- INPI.
- Juridictions européennes.

## Nommage Technique

Le rebranding impose les noms suivants :

- Package core : `@hacienda/core`.
- Fonction serveur : `createHaciendaServer`.
- Plugin : `hacienda-sources-officielles`.
- Package serveur : `@hacienda/plugin-sources-officielles-server`.
- Variables d'environnement :
  - `PISTE_CLIENT_ID`
  - `PISTE_CLIENT_SECRET`
  - `HACIENDA_CREDENTIALS_FILE`
- Fichier credentials local :
  - `~/.config/hacienda/credentials.json`

Le produit ne doit exposer que l'identité Hacienda dans ses noms publics, chemins de configuration, commandes et descriptions.

## Outils MCP Conservés

Les tools existants restent disponibles, avec des descriptions françaises orientées avocat :

```text
piste_status
legifrance_recherche
legifrance_rechercher
legifrance_get_article
legifrance_get_code
legifrance_get_loda
legifrance_get_jurisprudence
legifrance_get_jorf
legifrance_get_circulaire
legifrance_suggest
legifrance_api_call
bofip_rechercher
bofip_consulter
piste_cache_clear
```

`legifrance_api_call` reste un outil expert. Les plugins métier doivent privilégier les workflows haut niveau dès qu'ils existent.

## Workflows À Ajouter Au-Dessus Des Tools

### `verifier-citation`

Entrée : citation libre.

Sortie :

- type de source détecté ;
- source officielle trouvée ;
- identifiant ;
- lien ;
- version applicable ;
- statut de vérification ;
- avertissement si la citation est ambiguë.

### `constituer-dossier-preuve`

Entrée : liste de sources consultées pendant un livrable.

Sortie : annexe structurée prête à insérer dans une note, consultation, mémo ou conclusion.

### `verifier-version`

Entrée : texte, article ou identifiant + date d'application souhaitée.

Sortie :

- version applicable ;
- état en vigueur ou abrogé ;
- dates de validité ;
- lien officiel ;
- avertissement en cas de version incertaine.

### `cartographier-sources`

Entrée : question juridique.

Sortie :

- fonds officiels à interroger ;
- ordre recommandé ;
- requêtes proposées ;
- sources secondaires utiles ;
- risques d'angle mort.

### `classer-autorite`

Entrée : référence juridique.

Sortie :

- loi ;
- règlement ;
- jurisprudence ;
- doctrine administrative ;
- convention collective ;
- source éditoriale ;
- valeur probatoire ou argumentative.

## Dossier De Preuve

Le dossier de preuve est un format commun à tous les plugins :

```markdown
## Dossier De Preuve

| Source | Référence | Identifiant | Version/date | Consultation | Outil | Statut |
|---|---|---|---|---|---|---|
| Légifrance | art. 1240 C. civ. | LEGIARTI... | en vigueur au 14 mai 2026 | 14 mai 2026 | legifrance_get_article | vérifié |
```

Statuts autorisés :

- `vérifié`
- `à vérifier`
- `ambigu`
- `source secondaire uniquement`
- `non trouvé`

## Intégration Dans Les Plugins Métier

Chaque plugin métier doit déclarer dans son `CLAUDE.md` :

```text
Avant de citer une source juridique comme vérifiée, utiliser hacienda-sources-officielles.
Si la citation provient d'une base éditoriale, vérifier le texte, l'arrêt ou la doctrine primaire avant de l'utiliser comme fondement.
```

Chaque plugin métier doit aussi intégrer un bloc de sortie :

```text
Sources utilisées :
- sources officielles vérifiées ;
- sources éditoriales consultées ;
- sources restant à vérifier.
```

## Gestion Des Erreurs

Le plugin doit distinguer :

- credentials absents ;
- OAuth PISTE invalide ;
- souscription API manquante ;
- endpoint indisponible ;
- erreur temporaire DILA ;
- source non trouvée ;
- citation ambiguë ;
- réponse exploitable mais incomplète.

Les messages doivent être opérationnels. Exemple :

```text
La source n'a pas pu être vérifiée car l'API Légifrance a répondu 503 après retries. Le livrable peut continuer, mais la citation doit rester marquée [à vérifier].
```

## Cache Et Fraîcheur

Le cache local est autorisé avec TTL différencié :

- recherche : TTL court ;
- article ou texte stable : TTL plus long ;
- veille et JORF : TTL court ;
- BOFiP : TTL court à moyen selon date de publication.

Le dossier de preuve doit toujours mentionner la date de consultation, même si la donnée vient du cache.

## Sécurité

Exigences :

- Aucun secret hardcodé.
- Pas de télémétrie.
- Pas d'envoi des requêtes utilisateur vers un serveur tiers Hacienda.
- Credentials PISTE lus localement.
- Logs sans secret ni corps de requête sensible.
- Messages d'erreur sans fuite de `client_secret`.

## Tests Attendues

Tests unitaires :

- résolution d'identifiants ;
- registre endpoints ;
- validation des paramètres d'API expert ;
- format du dossier de preuve ;
- classification d'autorité ;
- détection de citation ambiguë.

Tests d'intégration simulés :

- outil article ;
- outil jurisprudence ;
- outil BOFiP ;
- appel expert ;
- erreur OAuth ;
- source non trouvée.

Smoke test :

- démarrage serveur MCP ;
- présence des tools principaux ;
- diagnostic `piste_status` en credentials manquants ;
- absence de crash sans configuration.

## Critères D'Acceptation

- Le plugin s'appelle `hacienda-sources-officielles` dans le manifeste et les commandes.
- Les packages et fonctions publiques utilisent le namespace Hacienda.
- Les chemins de credentials utilisent `~/.config/hacienda`.
- Les tools Légifrance/BOFiP existants sont conservés.
- Les nouveaux workflows de preuve sont spécifiés et priorisés.
- Le dossier de preuve est standardisé.
- Les plugins métier peuvent dépendre de ce socle sans connaître les détails des endpoints.
