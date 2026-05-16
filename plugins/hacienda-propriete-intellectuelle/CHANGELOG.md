# Changelog — hacienda-propriete-intellectuelle

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

### Note version
- Bump 0.2.0 → 0.4.0 — version 0.3.0 réservée au merge V1.1.0 (surveillance marques, branche `claude/pi-marques-v1.1-surveillance`)

### À venir (V2.1)
- Skill `analyse-refus-inpi` (office action FR + OEB Rule 132 EPC)
- Skill `anteriorite-invalidite` (argumentation nullité pour action contrefaçon)
- Connecteur Google Patents
- Refactor OAuth INPI partagé entre marques et brevets

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
