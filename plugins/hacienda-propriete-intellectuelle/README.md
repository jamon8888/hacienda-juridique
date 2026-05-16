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

## Quoi de neuf en V0.11 — Enforcement droit d'auteur (contrefaçon)

- Nouveau skill `contrefacon-droit-auteur` : qualification originalité + types d'atteinte (reproduction L.122-3, représentation L.122-2, adaptation L.122-4, droit moral L.121-1), tableau comparatif œuvre originale vs contrefaisante, constitution dossier de preuves (constat huissier, saisie-contrefaçon L.332-1), projet mise en demeure, notification hébergeur LCEN, stratégie contentieuse (référé, fond, médiation), évaluation préjudice (3 méthodes L.331-1-3)
- 2 nouvelles références : jurisprudence contrefaçon auteur (Pachot, Infopaq, Tintin, Huston, GS Media) + stratégie contentieuse (arbre décisionnel, saisie-contrefaçon, voie pénale L.335-2)
- **Le bloc V4 droit d'auteur est complet** : qualification V4.0 + contrats V4.1 + enforcement V4.2. V4.3 (droits voisins, OGC, IA générative) reste optionnel selon évolutions jurisprudentielles.

## Quoi de neuf en V0.10 — Contrats droit d'auteur (cession + licence + bases de données)

- Nouveau skill `cession-droit-auteur` : projet contrat de cession conforme L.131-3 (5 conditions cumulatives obligatoires sous peine de nullité), vérification éligibilité L.131-1/2, énumération droits/domaines/territoires/durée/rémunération, format projet contrat 15 articles, cas particuliers (commande, salarié hors logiciel, édition L.132-4, audiovisuel L.132-24)
- Nouveau skill `licence-droit-auteur` : distinction cession vs licence, typologie 5 types (exclusive, non-exclusive, libre Creative Commons, EULA, SaaS), 7 variantes CC détaillées, clauses critiques par type, format projet licence structuré
- Nouveau skill `bases-de-donnees` : double protection (droit auteur structure L.111-1 + sui generis L.341-1), 4 régimes d'accès (interne, SaaS B2B, open data Etalab/ODbL, scraping autorisé), enjeux RGPD, recommandation type contrat
- 6 nouvelles références : clauses L.131-3, jurisprudence cession, typologie licences auteur, modèles clauses licence, régime sui generis L.341-1, modèles licence BDD
- Le bloc V4 droit d'auteur est quasi-complet : qualification V4.0 + contrats V4.1 ; V4.2 enforcement (contrefaçon) reste à venir

## Quoi de neuf en V0.9 — Droit d'auteur Qualification (démarrage bloc V4)

- Nouveau skill `qualification-oeuvre` : analyse originalité (L.111-1 + CJUE Infopaq), catégorisation L.112-2 (liste non exhaustive), titularité initiale selon 7 cas (créateur unique / collaboration / collective / composite / commande / salariat / posthume), distinction droits patrimoniaux L.122-1+ vs droit moral L.121-1 (perpétuel, inaliénable, imprescriptible), durée 70 ans post mortem
- Nouveau skill `logiciels-pi` : régime dérogatoire L.113-9 (employeur titulaire AUTOMATIQUE pour logiciels créés par salariés dans leurs fonctions — inverse du droit commun), droit d'utilisation L.122-6 + exceptions L.122-6-1, typologie complète licences open source (permissives MIT/BSD/Apache, copyleft GPL/AGPL/LGPL/MPL, Creative Commons), matrices de compatibilité, cas SaaS et bases de données associées
- 4 nouvelles références : articles CPI droit auteur, jurisprudence originalité, régime logiciel CPI, licences open source
- Démarrage du bloc droit d'auteur V4 — suite : V4.1 contrats (cession + licence + bases données), V4.2 enforcement (contrefaçon)

## Quoi de neuf en V0.8 — Extension internationale + Portefeuille brevets

- Nouveau skill `strategie-extension-internationale` : arbre décisionnel FR / EP (OEB) / PCT (WIPO), coûts indicatifs 2026, recommandations par profil cabinet (startup → multinationale), fenêtre 12 mois Union de Paris
- Nouveau skill `revue-portefeuille-brevets` : gestion CRUD du registre brevets (familles FR + EP + PCT + validations nationales), audit santé (annuités, expirations, gaps), dashboard HTML standardisé **réutilisé de V0.5** sans modification
- Référentiel `portfolio-brevets.yaml` user-stable (calque `portfolio.yaml` marques V0.5)
- **Le bloc brevets est désormais complet end-to-end** : recherche antériorité (V0.4) → préparation dépôt (V0.4) → extension internationale (V0.8) → réponse refus (V0.7) → claim chart contrefaçon (V0.4) → nullité (V0.7) → portefeuille + dashboard (V0.8)
- Cross-référence avec portefeuille marques (V0.5) : champ `marques_associees` permet de relier brevets et marques d'un même produit

## Quoi de neuf en V0.7 — Refus INPI + Invalidité (workflow brevets défensif complet)

- Nouveau skill `analyse-refus-inpi` : analyse notifications INPI (R.612-66 CPI) ou OEB (Règle 132 EPC), classification citations X/Y/A/E, 4 stratégies d'amendement (limitation, reformulation, abandon, divisionnaire), argumentation problème-solution OEB, projet de réponse FR/EN
- Nouveau skill `anteriorite-invalidite` : argumentation nullité L.613-25 (5 motifs), bi-mode `--attack` (action nullité préventive TJ Paris) / `--defense` (face à action contrefaçon adverse), recherche art antérieur destructeur, projet d'écritures TJ Paris
- **Le workflow brevets est désormais complet end-to-end** : recherche antériorité (V2.0) → préparation dépôt (V2.0) → réponse refus (V2.1) → claim chart contrefaçon (V2.0) → nullité défensive ou attaque (V2.1)
- Coordination V2.0 + V2.1 : workflows offensifs (claim chart) et défensifs (nullité) se complètent

## Quoi de neuf en V0.6 — Dépôt + Opposition (workflow marques complet)

- Nouveau skill `depot-marque-fr` : préparation dossier dépôt FR INPI / EUTM / Madrid avec rédaction libellés P&S conformes directives, arbre décisionnel territoire, checklist 10 points
- Nouveau skill `analyse-opposition-marque` : analyse motifs CPI (L.713-2/L.713-3/L.711-3), calcul délai opposition L.712-4 (2 mois post-BOPI), projet de mémoire INPI structuré, bi-mode `--form` (former) / `--respond` (défense)
- **Le workflow marques est désormais complet end-to-end** : recherche antériorité (V1.0) → dépôt (V1.1.2) → surveillance BOPI quotidienne (V1.1.0) → opposition (V1.1.2) → portefeuille avec dashboard HTML (V1.1.1)
- Coordination V1.1.0 + V1.1.2 : `bopi-watcher` détecte → `analyse-opposition-marque --form` prépare l'opposition dans les 2 mois

## Quoi de neuf en V0.5 — Portefeuille + Dashboard HTML

- Nouveau skill `revue-portefeuille-marques` (gestion CRUD du registre marques, audit santé)
- Premier **dashboard HTML standardisé** dans `@hacienda/core/dashboard/` : fonction `renderDashboard()` réutilisable, format autonome (zéro CDN), XSS-safe
- Génération automatique d'un fichier `.html` à côté du Markdown quand un output dépasse 10 lignes tabulaires
- Référentiel `portfolio.yaml` user-stable (calque watchlist.yaml V0.3)

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
