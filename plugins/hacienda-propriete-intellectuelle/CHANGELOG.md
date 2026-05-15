# Changelog — hacienda-propriete-intellectuelle

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
