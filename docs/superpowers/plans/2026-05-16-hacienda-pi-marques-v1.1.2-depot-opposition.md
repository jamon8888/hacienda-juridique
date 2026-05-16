# Hacienda PI — V1.1.2 Dépôt + Opposition Marques — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development.

**Goal:** Livrer `depot-marque-fr` (~450-550 lignes) + `analyse-opposition-marque` (~500-600 lignes) + 4 références, dans le plugin `hacienda-propriete-intellectuelle` v0.6.0. Pure Markdown FR, pas de TS nouveau.

**Architecture:** Extension de main (post V1.1.1). Réutilise les tools V1.0 (`inpi_search_marques`, `inpi_marque_details`, `euipo_tmview_search`) — aucun nouveau code core. Skills calque `preparation-depot-brevet` V2.0 + workflow inédit pour opposition.

**Tech Stack:** Markdown FR uniquement.

**Spec:** [docs/superpowers/specs/2026-05-16-hacienda-pi-marques-v1.1.2-depot-opposition-design.md](../specs/2026-05-16-hacienda-pi-marques-v1.1.2-depot-opposition-design.md)

**Total prévu :** ~18 commits, 3 phases.

---

## Phase 1 — Skill `depot-marque-fr`

Calque sur `preparation-depot-brevet` V2.0 (792 lignes, déjà livré V2.0), adapté droit marques.

### Task 1.1: Frontmatter + garde-fou + Examples + reformulation
Create `plugins/hacienda-propriete-intellectuelle/skills/depot-marque-fr/SKILL.md`. Frontmatter (cf. spec §4.1). Garde-fou loud "préparation ≠ dépôt" mentionnant taxes 2026 (~190€ FR / ~850€ EUTM), erreur libellés. 3 Examples. Reformulation longue à reformuler en tête de chaque output.
Commit: `feat(plugin-pi): depot-marque-fr — frontmatter + garde-fou`

### Task 1.2: Charger profil + Intake (7 questions)
Section "Charger le profil pratique" : rôle, juridictions inscrites, mandataire associé, posture dépôt (larges vs ciblées), seuils business owner. Mode provisoire si `[A CONFIGURER]`.
Intake batch unique 7 questions (signe + type étendu L.711-1, P&S réels, classes Nice, territoires, déposant SIREN, mandataire si applicable, priorité revendiquée).
Commit: `feat(plugin-pi): depot-marque-fr — chargement profil + intake`

### Task 1.3: Recherche d'antériorité préalable + motifs absolus L.711-2
Section recommandation `/recherche-anteriorite-marque` si pas fait. Refus de continuer sans balayage minimal classes-cibles + adjacent families.
Reprise table 6 motifs absolus L.711-2 (depuis `recherche-anteriorite-marque` V1.0) avec flag si signe problématique.
Commit: `feat(plugin-pi): depot-marque-fr — antériorité préalable + motifs L.711-2`

### Task 1.4: Rédaction libellés P&S + arbre territoire FR/EU/Madrid
Section "Rédaction des libellés produits/services" : pour chaque classe Nice, libellé conforme directives examen INPI/EUIPO, référence liste OMPI alphabétique Nice édition 12. Flag risque "lifestyle brand" L.714-5 forclusion défaut d'usage. Suggérer élargir/restreindre.
Référence : `references/redaction-libelles-nice.md` (à créer Task 1.7).
Arbre décisionnel territoire FR INPI / EU EUTM / Madrid OMPI (table critères : marché, coût indicatif 2026, délai, mandataire obligatoire).
Commit: `feat(plugin-pi): depot-marque-fr — libellés P&S + choix territoire`

### Task 1.5: Checklist 10 points + Format de sortie
Checklist 10 points (antériorité, motifs absolus, descriptif, classes cohérentes, libellés précis, déposant, mandataire si non-résident UE, priorité, taxes, validation mandataire).
Format de sortie Markdown inline avec triage 🟢/🟡/🔴, sections Signe / Classes / Territoires / Checklist / Brouillon dossier / "Une question hors checklist" / "Que veux-tu faire ?".
Commit: `feat(plugin-pi): depot-marque-fr — checklist + format sortie`

### Task 1.6: Gate non-juriste + Emplacement + Ne fait pas + Ton
Gate non-juriste brief 1-page (signe, P&S, classes, territoires, déposant, antériorité, 3 questions). Liens annuaires CNB + INPI mandataires + EUIPO eSearch professional representatives.
Emplacement : `~/.claude/plugins/config/.../outputs/depot-marque-<slug>-YYYY-MM-DD.md`.
"Ce que ce skill NE fait PAS" (6+ points). Ton technique factuel.
Commit: `feat(plugin-pi): depot-marque-fr — gate + emplacement + ne fait pas`

### Task 1.7: Références `structure-depot-inpi.md` + `redaction-libelles-nice.md`

Create `plugins/hacienda-propriete-intellectuelle/skills/depot-marque-fr/references/structure-depot-inpi.md` (~80-100 lignes) :
- Structure du formulaire INPI (champs M1, M2, M3...) avec ce qui va dans chaque
- Différences FR INPI vs EUIPO EUTM vs OMPI Madrid (formulaires, langues, justificatifs)
- Documents à joindre : pouvoir mandataire, preuves d'usage (renouvellement), revendication priorité

Create `plugins/hacienda-propriete-intellectuelle/skills/depot-marque-fr/references/redaction-libelles-nice.md` (~80-120 lignes) :
- Principes rédaction libellés P&S (précis, conformes directives)
- Liste OMPI alphabétique référence
- Erreurs courantes : "tous produits", termes vagues, classes incohérentes, marques produits dans le libellé
- Exemples bien rédigés par secteur (logiciel, mode, alimentaire, services)
- Stratégie classes larges vs ciblées + forclusion défaut d'usage L.714-5

Commit: `docs(plugin-pi): références dépôt INPI + rédaction libellés Nice`

---

## Phase 2 — Skill `analyse-opposition-marque`

Workflow inédit (pas de calque direct V1.0/V2.0). Cohérent avec V1.1.0 surveillance (qui détecte les marques à opposer).

### Task 2.1: Frontmatter + garde-fou + Examples + reformulation
Create `plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/SKILL.md`. Frontmatter (cf. spec §5.1). Garde-fou loud "analyse ≠ procédure officielle" mentionnant délai 2 mois L.712-4 ferme + restauration L.712-4-1 stricte. 3 Examples (`--form`, `--respond`, sans flag). Reformulation longue.
Commit: `feat(plugin-pi): analyse-opposition-marque — frontmatter + garde-fou`

### Task 2.2: Charger profil + Intake bi-mode
Section "Charger le profil" : rôle, posture enforcement, approbateurs, calendriers.
Section "Intake" en 2 modes :
- `--form` (former) : numéro marque attaquée, date BOPI (calcul délai auto), antériorité opposable, motifs invoqués, stratégie totale/partielle
- `--respond` (répondre) : numéro NOTRE marque attaquée, marque opposante (déclencher `inpi_marque_details`), motifs adverses, position (transiger / modifier / contester)
Commit: `feat(plugin-pi): analyse-opposition-marque — chargement profil + intake bi-mode`

### Task 2.3: Analyse motifs CPI (L.713-2, L.713-3, L.711-3)
Section "Analyse motifs" : pour chaque motif, table d'évaluation.
- **L.713-2 — risque de confusion** : signes (visuelle/auditive/conceptuelle ensemble), P&S (classes Nice + libellés), appréciation globale CJUE Sabel/Canon/Lloyd, pouvoir distinctif intrinsèque + acquis, public concerné + attention
- **L.713-3 — marque renommée** : preuve renommée (parts marché, communication, ancienneté), lien entre signes, profit indu / atteinte renommée / caractère distinctif
- **L.711-3 — droits antérieurs autres** : nom commercial, enseigne, nom domaine antérieurs, dépôt frauduleux (mauvaise foi), AOP/IGP
Commit: `feat(plugin-pi): analyse-opposition-marque — analyse motifs CPI`

### Task 2.4: Recherche complémentaire + Calcul délai
Section "Recherche complémentaire" : déclencher `inpi_marque_details` pour historique opposition + marque opposante + `euipo_tmview_search` pour antériorités cross-EU.
Section "Calcul du délai" (mode `--form`) :
- date publication BOPI + 2 mois = butoir L.712-4
- < 30 j → 🔴 URGENT (escalation immédiate)
- 30-45 j → 🟠 (préparer cette semaine)
- > 45 j → 🟡 (planifier)
Commit: `feat(plugin-pi): analyse-opposition-marque — recherche complémentaire + délai`

### Task 2.5: Format de sortie + projet réponse INPI
Format de sortie Markdown avec triage 🔴/🟠/🟡, sections :
- En-tête confidentialité
- Note du relecteur (sources, délai)
- Marque attaquée récap
- Antériorités opposables (table)
- Motifs analysés par branche (forces/faiblesses)
- Recommandation stratégique (totale/partielle, chances succès, alternative transaction/coexistence)
- **Projet de mémoire INPI** structure : parties / faits / discussion en droit (par motif) / demande / pièces
- Calendrier procédure INPI (dépôt mémoire, réponse adverse, contre-réponse, décision ~6-9 mois)
- "Une question hors de ma checklist"
- "Que veux-tu faire ?" (5 options FR adaptées : Itérer / Escalader / Compléter / Transiger / Autre)
Commit: `feat(plugin-pi): analyse-opposition-marque — format sortie + projet mémoire`

### Task 2.6: Gate non-juriste + Emplacement + Ne fait pas + Ton
Gate non-juriste : brief mandataire (motifs + antériorités + délai + 3 questions).
Emplacement : `~/.claude/plugins/config/.../outputs/opposition-<numero-marque>-YYYY-MM-DD.md`.
"Ce que ce skill NE fait PAS" (5+ points). Ton argumentaire équilibré.
Commit: `feat(plugin-pi): analyse-opposition-marque — gate + ne fait pas + ton`

### Task 2.7: Références `motifs-opposition-cpi.md` + `procedure-opposition-inpi.md`

Create `plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/references/motifs-opposition-cpi.md` (~100-120 lignes) :
- L.712-4 délai 2 mois + L.712-4-1 restauration (cas strict)
- L.713-2 risque de confusion (3 branches : signes, P&S, appréciation globale)
- L.713-3 marque renommée (3 critères : renommée prouvée, lien, profit indu / atteinte)
- L.711-3 motifs relatifs autres (nom commercial, enseigne, nom domaine, AOP/IGP, mauvaise foi)
- Jurisprudence CJUE clé : Sabel C-251/95, Canon C-39/97, Lloyd Schuhfabrik C-342/97, Matratzen Concord T-6/01, General Motors Chevy C-375/97 (renommée)
- Erreurs courantes : opposition sans antériorité enregistrée, motifs trop vagues, preuves de renommée insuffisantes

Create `plugins/hacienda-propriete-intellectuelle/skills/analyse-opposition-marque/references/procedure-opposition-inpi.md` (~80-100 lignes) :
- Procédure INPI étape par étape (dépôt mémoire opposition, notification au déposant, mémoire en défense, contre-réponse, décision INPI ~6-9 mois)
- Délais clés : 2 mois L.712-4 (ouverture), 2 mois suite à notification (mémoire défense), 2 mois contre-réponse
- Taxes INPI 2026 (~325€ opposition, ~80€ inscription mandataire)
- Forme du mémoire (sections obligatoires, pièces, mode télé-procédure INPI)
- Décision INPI : opposition admise totalement / partiellement / rejetée
- Recours : Cour d'appel Paris L.411-4 (différé V6.0+ contentieux)

Commit: `docs(plugin-pi): références motifs opposition CPI + procédure INPI`

---

## Phase 3 — Patches plugin + bump + PR + merge

### Task 3.1: Patch CLAUDE.md template — section Dépôt + Opposition
Modifier `plugins/hacienda-propriete-intellectuelle/CLAUDE.md` : ajouter section "## Dépôt et opposition" après "## Portefeuille" :
```markdown
## Dépôt et opposition

**Cadence dépôt :** [A CONFIGURER — réactif sur lancement produit / proactif veille concurrence / défensif portefeuille]
**Délai opposition INPI :** **2 mois post-publication BOPI** (CPI L.712-4) — ferme, restauration L.712-4-1 strictement exceptionnelle
**Approbateur dépôt :** [A CONFIGURER — mandataire seul / mandataire + GC / GC seul]
**Approbateur opposition :** [A CONFIGURER — mandataire seul / mandataire + GC + Direction marketing]
**Taxes dépôt indicatives 2026 :** FR INPI ~190€ (1 classe), EUTM ~850€ (1 classe), Madrid base ~700€
**Taxes opposition indicatives 2026 :** FR INPI ~325€
```
`npm run branding:check`.
Commit: `feat(plugin-pi): CLAUDE.md template — section Dépôt + Opposition`

### Task 3.2: Patch `references/ressources-pi-fr.md` — section Procédures INPI
Ajouter section "## Procédures INPI" : récap des procédures clés (dépôt, opposition, nullité, déchéance, renouvellement) avec délais et taxes 2026.
Commit: `docs(plugin-pi): ressources — section Procédures INPI`

### Task 3.3: Bump version 0.5.0 → 0.6.0
- `plugin.json` : version 0.6.0, description étendue ("dépôt + opposition marques"), keywords +depot, +opposition
- `mcp-server/package.json` : 0.6.0
- Rebuild MCP : `npm run build --workspace plugins/hacienda-propriete-intellectuelle/mcp-server`
Commit: `chore(plugin-pi): bump 0.5.0 → 0.6.0 (V1.1.2 dépôt + opposition)`

### Task 3.4: CHANGELOG + README v0.6.0
CHANGELOG section 0.6.0 au top :
```markdown
## 0.6.0 — 2026-05-16

### Ajouts — Dépôt + Opposition marques (ferme workflow marques)
- Skill `depot-marque-fr` (préparation dossier FR INPI / EU EUTM / Madrid, libellés P&S conformes directives, checklist 10 points, ~500 lignes)
- Skill `analyse-opposition-marque` (analyse motifs L.713-2/L.713-3/L.711-3, calcul délai L.712-4, projet mémoire INPI, ~550 lignes)
- Références : structure-depot-inpi, redaction-libelles-nice, motifs-opposition-cpi, procedure-opposition-inpi
- Section CLAUDE.md template "Dépôt et opposition" ajoutée

### Workflow marques complet (V1.0 + V1.1.0 + V1.1.1 + V1.1.2)
- Recherche antériorité → Dépôt → Surveillance BOPI → Opposition → Portefeuille = boucle fermée

### À venir (V1.2)
- Agent `contrefacon-web` (monitoring marketplaces / réseaux sociaux / noms domaine)
- Connecteur OMPI Madrid Monitor (international)
```
README "Quoi de neuf en V0.6" :
```markdown
## Quoi de neuf en V0.6 — Dépôt + Opposition (workflow marques complet)

- Nouveau skill `depot-marque-fr` : préparation dossier dépôt FR INPI / EUTM / Madrid avec rédaction libellés P&S conformes directives, arbre décisionnel territoire, checklist 10 points
- Nouveau skill `analyse-opposition-marque` : analyse motifs CPI (L.713-2/L.713-3/L.711-3), calcul délai opposition L.712-4 (2 mois post-BOPI), projet de mémoire INPI structuré
- Le workflow marques est désormais **complet end-to-end** : recherche antériorité → dépôt → surveillance BOPI quotidienne → opposition → portefeuille avec dashboard HTML
- Coordination V1.1.0 + V1.1.2 : `bopi-watcher` détecte → `analyse-opposition-marque --form` prépare l'opposition dans les 2 mois
```
Commit: `docs(plugin-pi): CHANGELOG + README v0.6.0`

### Task 3.5: Vérifications + Push + PR + Merge
- `npm test` (attendu ≥ 269, pas de nouveaux tests Markdown)
- `npm run typecheck`, `npm run build`, `npm run branding:check`, `git diff --check`
- `git push -u origin claude/pi-marques-v1.1.2-depot-opposition`
- `gh pr create --base main --title "PI marques V1.1.2 : dépôt + opposition (ferme workflow marques)" --body "<body>"`
- Body :
```markdown
## Summary

V1.1.2 — Ferme le workflow marques complet :

- Skill `depot-marque-fr` (préparation dossier FR INPI / EUTM / Madrid, libellés P&S conformes, arbre territoire, checklist 10 points)
- Skill `analyse-opposition-marque` (analyse motifs CPI L.713-2/L.713-3/L.711-3, calcul délai L.712-4 2 mois, projet de mémoire INPI)
- 4 références (structure dépôt, libellés Nice, motifs opposition, procédure INPI)
- Bump plugin 0.5.0 → 0.6.0

**Workflow marques complet** : recherche antériorité (V1.0) → dépôt (V1.1.2) → surveillance BOPI (V1.1.0) → opposition (V1.1.2) → portefeuille + dashboard HTML (V1.1.1)

## Spec & plan

- [Spec](https://github.com/jamon8888/hacienda-juridique/blob/claude/pi-marques-v1.1.2-depot-opposition/docs/superpowers/specs/2026-05-16-hacienda-pi-marques-v1.1.2-depot-opposition-design.md)
- [Plan](https://github.com/jamon8888/hacienda-juridique/blob/claude/pi-marques-v1.1.2-depot-opposition/docs/superpowers/plans/2026-05-16-hacienda-pi-marques-v1.1.2-depot-opposition.md)

## Test plan
- [x] `npm test` vert
- [x] `npm run typecheck` clean
- [x] `npm run build` clean
- [x] `npm run branding:check` OK
- [ ] Validation manuelle (cabinet) : exécuter `/depot-marque-fr "APEXLEAF — vêtements classes 25 — FR"` puis `/analyse-opposition-marque --form FR4123456`

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```
- `gh pr merge <num> --merge --delete-branch=false`
Commit messages OK, report PR URL + merge status.

---

## Self-review

- [x] Spec §4 → Phase 1 (7 tasks)
- [x] Spec §5 → Phase 2 (7 tasks)
- [x] Spec §3 + §6 + §7 → Phase 3 (5 tasks)
- [x] Pas de placeholder
- [x] Pas de TS modifié (Markdown only V1.1.2)

---

**Plan complet.** Subagent-driven en 3 dispatches : Phase 1 / Phase 2 / Phase 3.
