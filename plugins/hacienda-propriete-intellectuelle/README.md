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
- `recherche-anteriorite-dm`
- `depot-dessin-modele`
- `contrefacon-dessin-modele`
- `contrats-pi`
- `audit-pi-ma`
- `saisie-contrefacon`
- `contentieux-pi`
- `certificat-complementaire-protection`

## Agents

- `veilleur-renouvellements-pi` : surveille echeances portefeuille.
- `veilleur-marques` : surveille marques et oppositions.
- `surveillant-oss` : surveille licences et dependances.
- `veilleur-contrefacon` : surveille signaux d'atteinte.
- `contrefacon-web` : surveillance contrefaçon en ligne (marketplaces, réseaux sociaux, web).

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

## Quoi de neuf en V0.15 — Agent contrefaçon web (V1.2) + CCP pharma (V2.3)

- Nouvel agent `contrefacon-web` : surveillance contrefaçon en ligne sur marketplaces (Amazon, AliExpress, eBay, Wish, Cdiscount, Etsy), réseaux sociaux (Instagram, Facebook, TikTok Shop), web général. Détections cotées par sévérité (Critical/High/Medium/Low), templates notification retrait (programme marketplace + LCEN art. 6-I-5 + DSA art. 16), coordination avec skills contrefaçon. Cadence configurable.
- Nouveau skill `certificat-complementaire-protection` : CCP médicaments (règlement UE 469/2009) et phyto (1610/96), 4 conditions art. 3, jurisprudence CJUE (Medeva, Eli Lilly, Teva v Gilead, Royalty Pharma), calcul durée (art. 13, max 5 ans), extension pédiatrique (+6 mois), SPC manufacturing waiver (2019/933), demande INPI
- **Tout le roadmap CHANGELOG est livré.** Le plugin PI couvre désormais : marques (V1.0-V1.2) + brevets (V2.0-V2.3) + D&M (V3.0) + droit d'auteur (V4.0-V4.2) + contrats PI + audit M&A (V5.0) + contentieux & enforcement (V6.0)

## Quoi de neuf en V0.14 — Contentieux & Enforcement (V6.0)

- Nouveau skill `saisie-contrefacon` : préparation requête saisie-contrefaçon multi-droits (brevets L.615-5, marques L.716-7, D&M L.521-4, droit d'auteur L.332-1), choix type de saisie (descriptive/réelle/documents/mixte/internet), instructions huissier/commissaire de justice, gestion post-saisie, délai 20 jours ouvrables pour assigner, risques de rétractation, spécificités par droit, coordination douanes UE 608/2013
- Nouveau skill `contentieux-pi` : stratégie contentieuse judiciaire PI (contrefaçon, nullité, déchéance, concurrence déloyale/parasitisme), recevabilité, compétence exclusive TJ Paris, stratégie procédurale (référé-interdiction + fond), calcul préjudice (3 méthodes directive 2004/48/CE), matrice go/no-go scorée, tracker multi-affaires avec échéances, budget/calendrier, bi-mode `--attack` / `--defense`
- **V6.0 complet** : saisie-contrefaçon + contentieux judiciaire = enforcement PI end-to-end
- **Le plugin PI couvre désormais le cycle complet** : recherche antériorité → dépôt → portefeuille → surveillance → contrefaçon → saisie → contentieux → transaction

## Quoi de neuf en V0.13 — Contrats PI + Audit PI M&A (V5.0)

- Nouveau skill `contrats-pi` : contrats PI transversaux (licence brevet L.613-8, cession brevet, accord coexistence marques, NDA, R&D collaborative background/foreground/sideground, licence savoir-faire, franchise PI, transfert technologie TTBER UE 316/2014, MTA), clauses critiques par type, vérification droit de la concurrence (clauses noires/grises), formalités d'opposabilité (inscription RNB/RNM), bi-mode `--draft` / `--review`
- Nouveau skill `audit-pi-ma` : due diligence PI pour M&A, inventaire multi-actifs (marques, brevets, D&M, droit d'auteur, logiciel, savoir-faire, noms de domaine, données), chaîne de titularité (L.113-9 salariés, L.131-3 freelances, inscriptions registres), findings cotés par sévérité (Critical/High/Medium/Low), valorisation indicative (5 méthodes), recommandations transactionnelles (reps & warranties, conditions suspensives, escrow, walk-away), bi-mode `--buyer` / `--seller`
- Références enrichies : TTBER UE 316/2014, articles CPI contrats (L.613-8, L.714-7, L.151-1), valorisation PI (ISO 10668), jurisprudence (Windsurfing non-contestation)
- CLAUDE.md template : section M&A / Due Diligence PI (6 champs configurables)
- **V5.0 complet** : contrats PI transversaux + audit M&A = couverture transactionnelle PI end-to-end

## Quoi de neuf en V0.12 — Bloc Dessins & Modèles (V3.0)

- Nouveau skill `recherche-anteriorite-dm` : recherche antériorité D&M (INPI, EUIPO DesignView, OMPI La Haye), analyse nouveauté (L.511-2) et caractère individuel (L.511-4) par impression globale sur utilisateur averti, classification Locarno, limites inhérentes (DMCNE, divulgations non indexées)
- Nouveau skill `depot-dessin-modele` : préparation dossier dépôt INPI (FR) / EUIPO (DMC) / OMPI (La Haye), exigences reproductions par office, arbre décisionnel territoire, stratégie ajournement/priorité unioniste, calcul taxes, checklist reproductions 7 vues, disclaimers visuels
- Nouveau skill `contrefacon-dessin-modele` : qualification contrefaçon D&M par impression globale (L.521-1), bi-mode `--attack` / `--defense`, saisie-contrefaçon (L.521-4, délai 20 jours), évaluation préjudice (3 méthodes L.521-7), moyens de défense (nullité reconventionnelle L.512-4, possession antérieure L.513-6, épuisement L.513-8, clause réparation art. 110 RDMC), projet mise en demeure
- Références enrichies : articles CPI D&M (L.511-1 à L.521-7), RDMC (CE 6/2002, 17 articles clés), classification Locarno (14 classes fréquentes), jurisprudence D&M (PepsiCo, Grupo Promer, Neuman, Cass. com.), procédures et taxes D&M
- **Le bloc Dessins & Modèles est complet end-to-end** : recherche antériorité → dépôt → contrefaçon (attaque + défense)

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
