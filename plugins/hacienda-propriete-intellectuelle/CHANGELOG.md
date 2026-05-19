# Changelog — hacienda-propriete-intellectuelle

Note : ce changelog resume les versions documentees du plugin. Certaines
versions intermediaires ont pu etre consolidees dans des jalons plus larges.

## 0.17.0 — 2026-05-18

### Packaging du plugin
- Ajout de `version.json` comme source de vérité de version du plugin PI
- Version unifiée entre `.claude-plugin/plugin.json`, `version.json`, `mcp-server/package.json` et runtime MCP
- `.mcp.json` converti en déclaration `stdio` exécutable pour le serveur MCP PI local

### Structure MCP
- Le serveur `hacienda-propriete-intellectuelle` déclare explicitement ses groupes de tools utiles à la PI
- Le toolset PI garde les recherches juridiques utiles (Legifrance, Judilibre, EUR-Lex) et les registres PI (INPI, EUIPO, BOPI, OEB)
- Les tools hors périmètre PI direct (`bofip_*`, `boss_*`, `legifrance_api_call`, `piste_cache_clear`) restent réservés au serveur sources officielles

### Alignement documentaire
- README PI et documentation d'intégration réalignés avec le runtime réellement livré
- Nettoyage des références résiduelles de benchmark externe dans les fichiers livrés du plugin
- `audit-pi-ma` passe d'un rapport monolithique a un orchestrateur M&A PI
  structure avec routing, findings normalises et sorties `buyer-dd`,
  `seller-clean-room`, `red-flag` et `deal-summary`
- `contrats-pi` passe d'un flux lineaire a une structure par familles
  (`patent-tech-transfer`, `nda-secret-knowhow`, `rnd-collaboration`,
  `trademark-coexistence-franchise`, `mta-life-sciences`)
- frontiere explicite entre `contrats-pi` (contrats PI complets) et
  `revue-clause-pi` (clauses PI dans contrats larges)
- contrat d'entree et blocs de sortie normalises pour `draft` et `review`
- `contentieux-pi` passe d'un flux mixte a un scope judiciaire strict
- introduction de `contentious_track` et `procedure_stage`
- frontiere explicite avec `strategie-defense-pi`, `tri-contrefacon`,
  `mise-en-demeure-pi` et `depot-preuve-creation`
- contrat de sortie stabilise en 8 blocs, avec `Decision Memo` borne a un jeu
  ferme d'issues
- `recherche-anteriorite-marque` passe a un premier passage strict de
  recherche de marque, distinct d'une clearance juridique finale
- frontiere explicite avec la clearance professionnelle, `depot-marque-fr`,
  `surveillance-marque` et `analyse-opposition-marque`
- cadrage explicite des motifs absolus, de la couverture de recherche et du
  balayage de famille adjacente dans le workflow marques
- `depot-marque-fr` est documente en V2 comme skill strict de preparation au
  depot, distinct du premier passage de recherche, de l'opposition et de la
  surveillance
- structuration explicite des lanes FR / EU / Madrid avec readiness gate avant
  toute recommandation de depot effectif
- `surveillance-marque` est documente en V2 comme skill strict de monitoring
  et de priorisation, distinct du premier passage de recherche, de la
  substance de l'opposition et de l'enforcement
- clarification des modes de surveillance et ajout d'un monitoring gate avant
  toute recommandation d'escalade
- `recherche-anteriorite-brevet` est documente en V2 comme premier passage
  strict de recherche brevet, distinct de la redaction / preparation de depot,
  de la revue d'invalidite et de la comparaison contrefacon
- ajout d'un search coverage gate pour borner la couverture de recherche avant
  toute recommandation de suite
- `preparation-depot-brevet` est documente en V2 comme skill de preparation
  stricte au depot, distinct du premier passage d'anteriorite, de la revue
  d'invalidite et du claim chart contrefacon
- ajout d'un Filing Readiness Gate et structuration explicite des lanes
  `FR`, `EP`, `PCT` et `sequenced`, avec branche de priorite bornee
- `analyse-opposition-marque` passe a un skill d'opposition INPI strict,
  borne par un gate procedurale explicite
- cartographie stabilisee des droits invoques, des motifs et de leur
  articulation pour former ou repondre a l'opposition
- branche coexistence / transaction maintenue mais bornee, sans diluer le role
  principal d'analyse contentieuse administrative INPI
- `qualification-oeuvre` passe a une structure V2 avec contrat d'entree
  explicite (`objective_mode`, `work_type`, `creation_context`)
- routage centralise vers `revue-logiciel-donnees`,
  `depot-preuve-creation`, `cession-droit-auteur`,
  `licence-droit-auteur` et `contrefacon-droit-auteur`
- contrat de sortie stabilise en 9 blocs, avec `Next Step Routing` borne a un
  jeu ferme d'issues
- `logiciels-pi` passe a une structure V2 avec contrat d'entree explicite
  (`development_model`, `distribution_model`, `oss_posture`)
- frontieres explicites avec `revue-open-source`,
  `revue-logiciel-donnees`, `cession-droit-auteur`,
  `licence-droit-auteur` et `contrefacon-droit-auteur`
- contrat de sortie stabilise en 9 blocs, avec `Next Step Routing` borne a un
  jeu ferme d'issues

## 0.9.0 — 2026-05-16

### Ajouts — Droit d'auteur Qualification (démarrage bloc V4)
- Skill `qualification-oeuvre` (originalité L.111-1 + CJUE Infopaq, catégories L.112-2, titularité 7 cas, droits patrimoniaux vs moral L.121-1, durée 70 ans post mortem, ~1020 lignes)
- Skill `logiciels-pi` (régime dérogatoire L.113-9 employeur titulaire, droit utilisation L.122-6, exceptions L.122-6-1, typologie licences open source + matrices compatibilité, ~970 lignes)
- Références : `articles-cpi-droit-auteur`, `jurisprudence-originalite`, `regime-logiciel-cpi`, `licences-open-source`
- Section CLAUDE.md template "Droit d'auteur" (8 placeholders pratique)
- Section `references/ressources-pi-fr.md` "Droit d'auteur — sources et juridictions"

### Suite sobre
- Les extensions du bloc droit d'auteur sont documentees dans les versions suivantes du changelog.

### Distinction critique avec régime US
- Droit FR : pas de formalité (≠ US Copyright Office), droit moral central perpétuel inaliénable (vs VARA US limité), L.113-9 logiciel = inverse du US work-for-hire général

## 0.8.0 — 2026-05-16

### Ajouts — Extension internationale + Portefeuille brevets (clôt bloc brevets)
- Skill `strategie-extension-internationale` (arbre décisionnel FR/EP/PCT, coûts indicatifs 2026, recommandations par profil cabinet, ~680 lignes)
- Skill `revue-portefeuille-brevets` (6 modes CRUD + audit, dashboard HTML réutilisation V0.5, gestion familles brevets, cross-ref portfolio marques, ~680 lignes)
- Référentiel `portfolio-brevets.yaml` user-stable (familles + annuités + CCP)
- Références : `couts-brevets-2026`, `arbre-decision-extension`, `modele-portfolio-brevets`
- Section CLAUDE.md "Brevets" enrichie (extension + portefeuille)
- Section ressources "Annuités brevets et services tiers"

### Positionnement de la version
- Cette version ajoute l'extension internationale et la revue de portefeuille brevets au socle brevets deja present.

### Réutilisation cross-version
- `revue-portefeuille-brevets` réutilise le standard dashboard HTML introduit plus tot dans le plugin.

## 0.7.0 — 2026-05-16

### Ajouts — Refus INPI + Invalidité brevets (workflow brevets défensif complet)
- Skill `analyse-refus-inpi` (analyse notifications INPI R.612-66 / OEB Règle 132 EPC, classification citations X/Y/A/E, stratégies amendement A/B/C/D, problème-solution OEB, projet de réponse FR/EN, ~840 lignes)
- Skill `anteriorite-invalidite` (argumentation nullité L.613-25, bi-mode `--attack`/`--defense`, recherche art antérieur destructeur, projet écritures TJ Paris, ~1040 lignes)
- Références : `classification-citations-oeb`, `strategies-amendement`, `motifs-nullite-brevet`, `procedure-nullite-tj-paris`
- Section CLAUDE.md template "Brevets" enrichie (postures refus + nullité, délais clés, approbateurs)
- Section `references/ressources-pi-fr.md` "Procédures brevets INPI / OEB / TJ Paris" ajoutée

### Workflow brevets complet (V2.0 + V2.1)
- Recherche antériorité (V2.0) → Préparation dépôt (V2.0) → Réponse refus INPI/OEB (V2.1) → Claim chart contrefaçon (V2.0) → Nullité défensive ou attaque (V2.1) = **boucle fermée**

### Coordination V2.0 + V2.1
- `tableau-contrefacon-brevet --form` (V2.0) prépare l'offensive contrefaçon
- → `anteriorite-invalidite --defense` (V2.1) prépare la défense face à action contrefaçon adverse
- → `analyse-refus-inpi` (V2.1) prépare la réponse aux notifications INPI/OEB durant prosecution

### À venir (V2.1.1 / V2.2)
- Connecteur Google Patents (complément Espacenet)
- `strategie-extension-internationale` (arbre EP/PCT/national)
- `revue-portefeuille-brevets` (réutilise dashboard HTML V1.1.1)

## 0.6.0 — 2026-05-16

### Ajouts — Dépôt + Opposition marques (ferme workflow marques)
- Skill `depot-marque-fr` (préparation dossier FR INPI / EU EUTM / Madrid, libellés P&S conformes directives examen, arbre décisionnel territoire, checklist 10 points, ~660 lignes)
- Skill `analyse-opposition-marque` (analyse motifs L.713-2/L.713-3/L.711-3, calcul délai L.712-4 2 mois post-BOPI, projet de mémoire INPI structuré, bi-mode `--form`/`--respond`, ~810 lignes)
- Références : `structure-depot-inpi.md`, `redaction-libelles-nice.md`, `motifs-opposition-cpi.md`, `procedure-opposition-inpi.md`
- Section CLAUDE.md template "Dépôt et opposition" ajoutée
- Section `references/ressources-pi-fr.md` "Procédures INPI marques" ajoutée

### Workflow marques complet (V1.0 + V1.1.0 + V1.1.1 + V1.1.2)
- Recherche antériorité → Dépôt → Surveillance BOPI quotidienne → Opposition → Portefeuille avec dashboard HTML = **boucle fermée**

### Coordination V1.1.0 + V1.1.2
- `bopi-watcher` (V1.1.0) détecte une marque concurrente publiée au BOPI
- → `analyse-opposition-marque --form` (V1.1.2) prépare l'opposition dans les 2 mois L.712-4
- → mandataire INPI dépose l'opposition formelle via télé-procédure

### À venir (V1.2)
- Agent `contrefacon-web` (monitoring marketplaces / réseaux sociaux / noms domaine)
- Connecteur OMPI Madrid Monitor (international)
- Étude liberté d'exploitation (FTO)

## 0.5.0 — 2026-05-16

### Ajouts — Portefeuille + Dashboard HTML
- Skill `revue-portefeuille-marques` (6 modes CRUD + audit, standard portefeuille PI adapté FR, ~400 lignes)
- Module `@hacienda/core/dashboard/` (renderDashboard + escape XSS-safe + template HTML standalone)
- Premier **dashboard HTML standardisé** : format autonome (zéro CDN), XSS-safe, sortable/filtrable, imprimable A4
- Référentiel `portfolio.yaml` user-stable validé Zod
- Référence `references/dashboard-template.md` (guide d'utilisation pour skills futurs)
- Référence `references/modele-portfolio.md`
- Section CLAUDE.md template "Portefeuille" + "Dashboard offer" activée

### Cible future
- V2.2 `revue-portefeuille-brevets` réutilisera le même `renderDashboard`
- V5.0 `audit-pi-ma` (M&A) utilisera le dashboard pour les findings multi-actifs

### À venir (V1.1.2)
- `depot-marque-fr` (préparation dossier dépôt INPI/EUIPO)
- `analyse-opposition-marque` (argumentation INPI sur opposition reçue)

## 0.4.0 — 2026-05-16

### Ajouts — bloc Brevets (MVP V2.0)
- Skill `recherche-anteriorite-brevet` (standard structuré adapté FR, classifications X/Y/A/E OEB, approche problème-solution OEB, exclusions L.611-10 CPI, ~750 lignes)
- Skill `preparation-depot-brevet` (structure CPI L.611-1, rédaction revendications, choix territoire FR/EP/PCT, ~790 lignes)
- Skill `tableau-contrefacon-brevet` (claim chart Harvey-grade, théorie équivalence L.613-3 + Cour de cass. com. 5 mai 2009, ~1090 lignes)
- Tools MCP : `inpi_search_brevets`, `inpi_brevet_details`, `espacenet_search`, `espacenet_brevet_details`
- Client `InpiBrevetsClient` (réutilise OAuth password grant V1.0)
- Client `EspacenetClient` (OEB OPS, OAuth2 client_credentials, quota 4 Go/sem)
- Référentiels : `classifications-cib.md`, `structure-revendications.md`, `theorie-equivalence.md`, `articles-cpi-brevets.md`
- Section CLAUDE.md template "Brevets" ajoutée

### À venir (V2.1)
- Skill `analyse-refus-inpi` (office action FR + OEB Rule 132 EPC)
- Skill `anteriorite-invalidite` (argumentation nullité pour action contrefaçon)
- Connecteur Google Patents
- Refactor OAuth INPI partagé entre marques et brevets

## 0.3.0 — 2026-05-16

### Ajouts
- Skill `surveillance-marque` (6 modes : --report/--add/--update/--remove/--list/--audit, standard portefeuille PI adapté FR)
- Agent `bopi-watcher` quotidien (escalation immédiate sur 🔴 OPPOSITION URGENTE < 30 j post-BOPI L.712-4)
- Tool MCP `inpi_marques_publications_recentes` (delta API depuis date X, fenêtre max 30 j)
- Référentiel `watchlist.yaml` user-stable validé Zod
- Référentiel `references/modele-watchlist.md`
- Section CLAUDE.md template "Brand protection" enrichie
- Section "Bulletins officiels" dans ressources-pi-fr.md

### À venir (V1.1.1)
- `revue-portefeuille-marques` + premier dashboard HTML standardisé
- `depot-marque-fr` + `analyse-opposition-marque`

## 0.2.0 — 2026-05-15

### Ajouts
- Skill `recherche-anteriorite-marque` (standard structuré PI, ~300 lignes)
- MCP server avec 4 nouveaux tools : `inpi_search_marques`,
  `inpi_marque_details`, `euipo_tmview_search`,
  `bopi_dernieres_publications` (squelette)
- CLAUDE.md template adapté droit FR (secret professionnel art. 66-5,
  appréciation globale CJUE Sabel/Puma)
- `entretien-demarrage` refondu — profil user-stable
  `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`
- Référentiels : `references/ressources-pi-fr.md` + `classifications-nice.md`

### Migration des anciens skills PI
- `depot-preuve-creation` devient la brique probatoire canonique du plugin PI
- `tri-contrefacon` devient l'intake enforcement marques
- `mise-en-demeure-pi` devient le moteur de lettre PI
- `revue-open-source` devient l'audit OSS operationnel
- `revue-logiciel-donnees` est recentre sur la chaine de droits logiciel/data
- `portefeuille-pi` devient un hub federé marques + brevets en lecture seule
- `revue-clause-pi` devient la revue ciblee des clauses PI dans les contrats larges
- `strategie-defense-pi` devient un orchestrateur leger de defense et de routage
- `clearance-marque` reste maintenu pour compatibilite historique et redirige
  vers `recherche-anteriorite-marque`

### Migration structurante des skills legacy
- `tri-contrefacon` et `mise-en-demeure-pi` sont maintenant alignes comme meme
  chantier d'enforcement
- `depot-preuve-creation` alimente les skills preuves, opposition et defense
- `portefeuille-pi` adopte le modele de hub federé en lecture seule
- `clearance-marque` reste volontairement en alias/sunset plutot qu'en faux
  workflow autonome

### À venir (V1.1)
- Agent `bopi-watcher` (parser BOPI hebdomadaire)
- Skill `surveillance-marque`
- Skill `revue-portefeuille-marques` + tableau de bord HTML
- extensions futures au-dessus de ce socle V1
