# Hacienda Propriete Intellectuelle

`hacienda-propriete-intellectuelle` est le plugin PI de la marketplace Hacienda : marques, portefeuille, clauses PI, open source, logiciel, preuves de creation, contrefacon, mises en demeure et strategie de defense.

Chaque sortie reste un brouillon pour avocat ou juriste : source officielle ou `[a verifier]`, Note de revue, Arbre de decision, validation humaine et dossier de preuve.

## Premier Lancement

```text
/hacienda-propriete-intellectuelle:entretien-demarrage
```

## Sources Prioritaires

- INPI, EUIPO, WIPO, EPO ;
- Code de la propriete intellectuelle et Legifrance ;
- registres domaines, depots, portefeuilles ;
- SBOM, notices OSS, contrats et licences ;
- preuves de creation, captures et correspondances.

## Skills

- `entretien-demarrage`
- `clearance-marque`
- `revue-clause-pi`
- `revue-open-source`
- `portefeuille-pi`
- `tri-contrefacon`
- `mise-en-demeure-pi`
- `depot-preuve-creation`
- `revue-logiciel-donnees`
- `strategie-defense-pi`

## Agents

- `veilleur-renouvellements-pi` : surveille echeances portefeuille.
- `veilleur-marques` : surveille marques et oppositions.
- `surveillant-oss` : surveille licences et dependances.
- `veilleur-contrefacon` : surveille signaux d'atteinte.

## Livrables

- dossier de preuve ;
- note de clearance ;
- revue de clauses ;
- rapport OSS ;
- registre portefeuille ;
- projet de mise en demeure ;
- Note de revue.

## Mode Silencieux

Le Mode silencieux limite les alertes au portefeuille, aux renouvellements, aux risques OSS et aux signaux d'atteinte au-dessus des seuils. Il ne remplace pas la validation humaine.

## Quoi de neuf en V0.4 — bloc Brevets (MVP)

- Nouveau skill `recherche-anteriorite-brevet` (INPI + OEB Espacenet, classifications X/Y/A/E)
- Nouveau skill `preparation-depot-brevet` (structure CPI L.611-1, revendications, FR/EP/PCT)
- Nouveau skill `tableau-contrefacon-brevet` **(claim chart Harvey-grade, théorie équivalence L.613-3)**
- 4 nouveaux tools MCP : `inpi_search_brevets`, `inpi_brevet_details`, `espacenet_search`, `espacenet_brevet_details`
- Client OEB Espacenet (OAuth2 client_credentials, quota 4 Go/sem)
- Variables d'env requises : `INPI_DATA_LOGIN`/`INPI_DATA_PASSWORD` (déjà V0.2) + `OEB_CONSUMER_KEY`/`OEB_CONSUMER_SECRET` (V0.4)

## Quoi de neuf en V0.3

- Nouveau skill `surveillance-marque` (gestion watchlist + rapport BOPI delta)
- Nouveau agent `bopi-watcher` (cadence quotidienne, alertes Slack/inline)
- Nouveau tool MCP `inpi_marques_publications_recentes`
- Référentiel watchlist YAML stable (validé Zod, backup automatique)
- Adaptations FR : délai opposition INPI 2 mois L.712-4 surveillé activement

## Quoi de neuf en V0.2

- Nouveau skill `recherche-anteriorite-marque` : knockout L.711-2, recherche de similaires (3 cas), sweep des familles adjacentes FR/EU, appréciation globale CJUE, recommandations et garde-fou non-juriste.
- Nouveau MCP server dédié au plugin (`mcp-server/dist/index.js`), branché via `.mcp.json`.
- Quatre nouveaux outils marques : `inpi_search_marques`, `inpi_marque_details`, `euipo_tmview_search`, `bopi_dernieres_publications`. Sans credentials, ils retournent un message « INPI not configured » avec lien vers `.claude/settings.local.json`.
- Cold-start `entretien-demarrage` refondu : profil utilisateur user-stable enregistre dans `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/`, intake des integrations, peuplement du `CLAUDE.md` du plugin.
- Skills v0.1 preserves avec banner de transition (sauvegarde dans `CLAUDE.v0.1.md.bak`).
