# Hacienda Judilibre Et BOSS — Spécification De Conception

## Objectif

Ajouter deux sources officielles à `hacienda-sources-officielles` :

- **Judilibre** pour les décisions judiciaires open data publiées par la Cour de cassation via PISTE.
- **BOSS** pour la doctrine administrative officielle en matière de cotisations et contributions sociales.

Ces sources complètent le socle Légifrance/BOFiP déjà en cours de stabilisation. Elles ne remplacent pas `legifrance_get_jurisprudence` ni le fonds `JURI` : Judilibre devient une voie spécialisée lorsque l'utilisateur cherche une décision judiciaire enrichie ou lorsque les métadonnées Judilibre sont plus adaptées.

## Contexte Projet

La branche `codex/legifrance-complete-coverage` contient déjà :

- un registre d'endpoints Légifrance ;
- `LegifranceRouteClient` ;
- `legifrance_api_call` ;
- les alias `bofip_rechercher` et `bofip_consulter` ;
- la trajectoire de rebranding vers `@hacienda/core` et `createHaciendaServer`.

Le rebranding Hacienda est en cours mais ne doit pas bloquer l'ajout de nouvelles sources. Le design doit donc fonctionner dans le code actuel tout en évitant d'ajouter des dépendances à l'ancien découpage de plugins métier.

## Décisions Validées

- Judilibre et BOSS entrent dans le plugin socle `hacienda-sources-officielles`.
- L'intégration est ajoutée sur le code actuel de la branche, avant la fin complète du rebranding.
- On crée une couche `sources` fine et réutilisable, sans sur-abstraction.
- Judilibre utilise un client API dédié, car son auth et sa base URL diffèrent de Légifrance.
- BOSS utilise un indexeur HTML officiel, car aucune API REST/OpenAPI publique documentée n'a été identifiée.
- BOSS v1 utilise `undici` et un parser HTML/robots interne conservateur.
- `cheerio`, `robots-parser` et `p-limit` sont différés tant que le HTML BOSS réellement capturé ne justifie pas une dépendance supplémentaire.
- Playwright et Crawlee sont exclus de BOSS v1, sauf preuve que le HTML statique officiel ne contient pas le contenu nécessaire.

## Sources Externes

Judilibre :

- API data.gouv : `https://www.data.gouv.fr/dataservices/api-judilibre`
- Dépôt officiel : `https://github.com/Cour-de-cassation/judilibre-search`
- Sandbox : `https://sandbox-api.piste.gouv.fr/cassation/judilibre/v1.0`
- Production : `https://api.piste.gouv.fr/cassation/judilibre/v1.0`
- Authentification : header `KeyId`.

BOSS :

- Site officiel : `https://boss.gouv.fr`
- Accueil canonique observé : `https://boss.gouv.fr/portail/accueil.html`
- Présentation ministérielle : `https://solidarites.gouv.fr/bulletin-officiel-de-la-securite-sociale-boss-un-bilan-tres-positif-pour-la-securisation-des-entreprises-apres-un-de-publication`
- Investigation réseau 14 mai 2026 : TLS valide depuis l'environnement local, mais requêtes HTTPS applicatives coupées par `ECONNRESET`. Un scan public URLScan du 6 mai 2026 confirme toutefois une réponse HTML `200` sur l'accueil BOSS. Cette donnée sert uniquement au diagnostic, pas comme source runtime.

## Architecture

### 1. Couche `sources`

Créer `packages/core/src/sources/` avec des types partagés :

```ts
export type OfficialSource =
  | "LEGIFRANCE"
  | "BOFIP"
  | "JUDILIBRE"
  | "BOSS";

export type ProofStatus =
  | "vérifié"
  | "à vérifier"
  | "ambigu"
  | "non trouvé"
  | "source secondaire uniquement";

export interface SourceCitation {
  source: OfficialSource;
  title: string;
  url: string;
  retrievedAt: string;
  status: ProofStatus;
  id?: string;
  date?: string;
  paragraph?: string;
  tool?: string;
}

export interface SourceSearchHit {
  source: OfficialSource;
  id: string;
  title: string;
  url: string;
  retrievedAt: string;
  excerpt?: string;
  date?: string;
  score?: number;
}
```

Cette couche ne doit pas devenir un framework. Son rôle est seulement de standardiser les citations et le dossier de preuve entre Légifrance, BOFiP, Judilibre et BOSS.

### 2. Judilibre

Créer `packages/core/src/judilibre/` :

- `config.ts` : environnement, base URL, `JUDILIBRE_KEY_ID` avec fallback `PISTE_KEY_ID`.
- `client.ts` : appels `GET` JSON vers `/search`, `/decision`, puis `/taxonomy` si nécessaire.
- `schemas.ts` : schémas Zod tolérants pour les champs consommés.
- `format.ts` : sorties Markdown courtes avec lien officiel, ECLI, juridiction, chambre, formation, date, solution, zones disponibles.

Tools MCP v1 :

```text
judilibre_status
judilibre_recherche
judilibre_get_decision
```

`judilibre_taxonomy` est différé tant que les filtres avancés ne sont pas nécessaires.

### 3. BOSS

Créer `packages/core/src/boss/` :

- `status.ts` : probe réseau non destructif de BOSS, diagnostics HTTP/TLS/robots et état du cache.
- `client.ts` : fetch officiel limité à `https://boss.gouv.fr/**`, cache 24h, respect `robots.txt`, concurrence limitée.
- `parser.ts` : extraction HTML interne limitée, testée sur fixtures BOSS officielles.
- `catalog.ts` : points d'entrée BOSS v1.
- `index.ts` : index local JSON et recherche normalisée.
- `format.ts` : résultats Markdown avec URL canonique, date de consultation et paragraphes.

Tools MCP v1 :

```text
boss_status
boss_recherche
boss_get_document
```

`boss_actualites` est différé sauf si une source officielle stable d'actualité BOSS est identifiée pendant l'implémentation.

## Authentification Et Configuration

Judilibre :

- `JUDILIBRE_KEY_ID` : priorité haute.
- `PISTE_KEY_ID` : fallback si l'utilisateur mutualise la clé PISTE.
- `JUDILIBRE_ENV` : `production` par défaut, `sandbox` possible.

BOSS :

- aucun credential ;
- cache local uniquement ;
- aucun serveur Hacienda distant ;
- pas de télémétrie.
- User-Agent explicite configurable, sans usurper un navigateur grand public.

Le fichier local de credentials Hacienda pourra inclure :

```json
{
  "PISTE_CLIENT_ID": "...",
  "PISTE_CLIENT_SECRET": "...",
  "PISTE_ENV": "production",
  "JUDILIBRE_KEY_ID": "...",
  "JUDILIBRE_ENV": "production"
}
```

## Dépendances

`undici` est déjà présent et reste le client HTTP principal.

Aucune dépendance BOSS supplémentaire n'est ajoutée en v1. Le parser HTML et le garde robots restent internes, conservateurs et couverts par tests.

Déclencheurs pour ajouter une dépendance ultérieure :

- `cheerio` : si une fixture officielle BOSS montre une structure HTML que le parser interne ne sait pas extraire sans ambiguïté.
- `robots-parser` : si le `robots.txt` officiel utilise des règles avancées nécessaires au crawl. En attendant, les motifs non supportés échouent fermés.
- `p-limit` : si une vraie indexation multi-pages est activée. La v1 expose surtout `boss_status` et `boss_get_document`, tandis que `boss_recherche` signale explicitement un index vide tant qu'aucune indexation n'a été alimentée.

Ne pas ajouter :

- Playwright ;
- Puppeteer ;
- Crawlee ;
- dépendance native.

## Comportement Des Tools

### `judilibre_status`

Retourne :

- environnement ;
- base URL ;
- présence ou absence de `KeyId` ;
- diagnostic de configuration ;
- aucune fuite du secret.

Ce tool doit fonctionner même sans credential.

### `judilibre_recherche`

Entrées :

- `query` ;
- `pageSize` ;
- `page` ;
- filtres simples si supportés sans taxonomie complexe : date, chambre, juridiction, publication, solution.

Sortie :

- titre ;
- juridiction / chambre ;
- date ;
- solution ;
- ECLI si présent ;
- identifiant Judilibre ;
- extrait ;
- lien ;
- date de consultation.

### `judilibre_get_decision`

Entrée :

- identifiant Judilibre.

Sortie :

- métadonnées principales ;
- texte ou extrait raisonnable ;
- zones si présentes : introduction, exposé, moyens, motivations, dispositif, annexes ;
- citations ;
- lien officiel ;
- date de consultation.

### `boss_recherche`

Entrées :

- `query` ;
- `rubrique` optionnelle ;
- `pageSize`.

Sortie :

- titre ;
- rubrique ou chemin ;
- extrait ;
- score ;
- URL canonique ;
- date de consultation.

### `boss_status`

Retourne :

- URL d'accueil testée ;
- disponibilité réseau ;
- statut `robots.txt` : lu, interdit, indisponible ou erreur ;
- capacité à lire une page HTML BOSS ;
- état du cache local ;
- dernier diagnostic d'erreur, sans pile technique bruyante ;
- recommandation courte : utilisable, crawl bloqué, réseau bloqué, robots indisponible, parser à revoir.

Ce tool doit fonctionner sans lancer d'indexation. Il sert à distinguer une indisponibilité réelle de BOSS d'un blocage réseau propre à l'environnement d'exécution.

### `boss_get_document`

Entrée :

- URL BOSS officielle ou identifiant local d'index.

Sortie :

- titre ;
- texte structuré ;
- paragraphes ou titres ;
- URL canonique ;
- date de consultation ;
- statut `vérifié` si le document officiel a été récupéré.

## Règles De Scraping BOSS

- Ne crawler que `https://boss.gouv.fr/**`.
- Lire et respecter `https://boss.gouv.fr/robots.txt`.
- Si `robots.txt` est indisponible, ne pas lancer de crawl d'indexation automatique. Autoriser seulement un fetch unitaire explicite d'une URL BOSS officielle, avec message de prudence, si le mode produit le permet.
- Limiter la concurrence à 2 requêtes.
- Utiliser un User-Agent explicite du plugin.
- Ne pas exécuter de JavaScript.
- Ne pas contourner de restriction technique.
- Ne pas utiliser URLScan, Google cache, snippets ou autres tiers comme source de contenu runtime.
- Démarrer l'index par une liste de seeds officielle : accueil BOSS, liens de navigation internes, puis pages documentaires sous `/portail/accueil/**/*.html`.
- Capturer des fixtures HTML depuis le site officiel uniquement quand l'accès direct fonctionne ; sinon garder le statut BOSS en diagnostic bloqué.
- Ne pas inférer une date d'opposabilité si elle n'apparaît pas explicitement.
- Conserver l'URL canonique dans chaque résultat.
- Mentionner la date de consultation même si le contenu vient du cache.

## Dossier De Preuve

Chaque tool retourne assez d'information pour alimenter le format Hacienda :

```markdown
| Source | Référence | Identifiant | Version/date | Consultation | Outil | Statut |
|---|---|---|---|---|---|---|
| Judilibre | Cass. soc., ... | ... | ... | 14 mai 2026 | judilibre_get_decision | vérifié |
| BOSS | Avantages en nature | ... | ... | 14 mai 2026 | boss_get_document | vérifié |
```

## Gestion Des Erreurs

Judilibre :

- credential absent : message de configuration clair ;
- `401` / `403` : distinguer clé invalide et souscription absente lorsque le body le permet ;
- `429` : backoff ;
- `5xx` : retry limité puis source temporairement indisponible ;
- schéma inattendu : sortie d'erreur exploitable sans crash serveur.

BOSS :

- robots interdit : refuser le crawl et expliquer ;
- robots indisponible : refuser l'indexation automatique, proposer `boss_status` et un fetch unitaire explicite si applicable ;
- `ECONNRESET` / coupure HTTPS : retourner un diagnostic réseau clair, sans marquer BOSS indisponible globalement ;
- page non BOSS : refuser ;
- HTML inexploitable : marquer `à vérifier` ;
- réseau indisponible : message source temporairement indisponible ;
- cache périmé et fetch impossible : retourner erreur plutôt que preuve fausse.

## Tests

Unitaires :

- types `sources` ;
- config Judilibre ;
- headers `KeyId` ;
- formatters Judilibre ;
- status BOSS : robots lu, robots indisponible, HTTPS coupé, cache présent ;
- parser BOSS ;
- normalisation de recherche BOSS ;
- refus URL non BOSS ;
- respect robots mocké.

HTTP mock :

- Judilibre `/search` ;
- Judilibre `/decision` ;
- BOSS HTML statique ;
- erreurs 403, 429, 5xx.

Smoke :

- présence de `judilibre_status`, `judilibre_recherche`, `judilibre_get_decision`, `boss_status`, `boss_recherche`, `boss_get_document` ;
- le serveur démarre sans `JUDILIBRE_KEY_ID` ;
- BOSS ne requiert aucun credential.

Live tests :

- opt-in uniquement ;
- `JUDILIBRE_LIVE_TESTS=1` ;
- `BOSS_LIVE_TESTS=1` ;
- appels courts, stables, non exécutés en CI normal.

## Phasage

### Phase 1 — Fondations Sources

- Types `sources`.
- Config Judilibre.
- Client API PISTE `KeyId`.
- Tests de non-régression du serveur existant.

### Phase 2 — Judilibre V1

- `judilibre_status`.
- `judilibre_recherche`.
- `judilibre_get_decision`.
- Formatters avec dossier de preuve.

### Phase 3 — BOSS V1

- Pas de dépendance BOSS supplémentaire tant que le parser interne suffit.
- `boss_status` et probe réseau/robots/cache.
- Capture de fixtures HTML officielles si l'accès direct fonctionne.
- Fetcher BOSS sécurisé.
- Parser HTML.
- Index local simple.
- `boss_recherche`.
- `boss_get_document`.

### Phase 4 — Harmonisation Hacienda

- Brancher les résultats dans les workflows `verifier-citation` et `constituer-dossier-preuve`.
- Renommer les imports publics lors du rebranding complet.
- Mettre à jour les docs `hacienda-sources-officielles`.

## Non-Objectifs

- Ne pas construire `hacienda-social` dans cette phase.
- Ne pas créer de connecteur distant Hacienda.
- Ne pas intégrer BO Travail ici.
- Ne pas crawler des bases éditoriales ou payantes.
- Ne pas faire de recherche multi-source globale tant que Judilibre et BOSS V1 ne sont pas stables.

## Critères D'Acceptation

- Les tools Judilibre et BOSS sont listés par le serveur MCP.
- Le serveur démarre sans credential Judilibre.
- `boss_status` explique clairement si l'environnement ne peut pas joindre BOSS en HTTPS.
- BOSS fonctionne sans credential et sans navigateur.
- Chaque résultat contient une URL officielle et une date de consultation.
- Les erreurs ne font pas crasher le serveur.
- Les tests unitaires, typecheck et build passent.
- Aucune dépendance Playwright/Crawlee n'est ajoutée pour BOSS v1.
