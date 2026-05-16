# Changelog — hacienda-propriete-intellectuelle

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
- Skill `revue-portefeuille-marques` (6 modes CRUD + audit, style Anthropic ip-legal portfolio adapté FR, ~400 lignes)
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
- Skill `recherche-anteriorite-brevet` (style Anthropic adapté FR, classifications X/Y/A/E OEB, approche problème-solution OEB, exclusions L.611-10 CPI, ~750 lignes)
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
- Skill `surveillance-marque` (6 modes : --report/--add/--update/--remove/--list/--audit, style Anthropic ip-legal portfolio adapté FR)
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
- Skill `recherche-anteriorite-marque` (style Anthropic `ip-legal`, ~300 lignes)
- MCP server avec 4 nouveaux tools : `inpi_search_marques`,
  `inpi_marque_details`, `euipo_tmview_search`,
  `bopi_dernieres_publications` (squelette)
- CLAUDE.md template adapté droit FR (secret professionnel art. 66-5,
  appréciation globale CJUE Sabel/Puma)
- `entretien-demarrage` refondu — profil user-stable
  `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`
- Référentiels : `references/ressources-pi-fr.md` + `classifications-nice.md`

### Préservés (V0.1, banner ajouté)
- `clearance-marque` (utiliser `recherche-anteriorite-marque` à la place)
- `depot-preuve-creation`, `mise-en-demeure-pi`, `portefeuille-pi`,
  `revue-clause-pi`, `revue-logiciel-donnees`, `revue-open-source`,
  `strategie-defense-pi`, `tri-contrefacon`

### À venir (V1.1)
- Agent `bopi-watcher` (parser BOPI hebdomadaire)
- Skill `surveillance-marque`
- Skill `revue-portefeuille-marques` + tableau de bord HTML
- Migration des 9 skills v0.1 au format V1
