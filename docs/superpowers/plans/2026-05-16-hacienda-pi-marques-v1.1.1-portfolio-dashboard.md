# Hacienda PI — V1.1.1 Portefeuille + Dashboard HTML — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development.

**Goal:** Livrer `revue-portefeuille-marques` (6 modes CRUD + audit) + premier dashboard HTML standardisé réutilisable, dans le plugin `hacienda-propriete-intellectuelle` v0.5.0.

**Architecture:** Extension de main (post-merge V2.0). Module `@hacienda/core/dashboard/` autonome (HTML+CSS+JS inline, zéro CDN, XSS-safe). Skill `revue-portefeuille-marques` calque sur `surveillance-marque` V1.1.0 (6 modes user-stable).

**Tech Stack:** TypeScript ESM, vitest, fonction pure `renderDashboard(data) → string`.

**Spec:** [docs/superpowers/specs/2026-05-16-hacienda-pi-marques-v1.1.1-portfolio-dashboard-design.md](../specs/2026-05-16-hacienda-pi-marques-v1.1.1-portfolio-dashboard-design.md)

**Total prévu :** ~20 commits, 4 phases, mode autonome.

---

## Phase 1 — Module dashboard dans `@hacienda/core`

### Task 1.1: Types + escape

Create `packages/core/src/dashboard/types.ts` :

```ts
export interface DashboardSummaryStat {
  label: string;
  value: string | number;
  emoji?: string;
}

export interface DashboardColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface DashboardData {
  title: string;
  generatedAt: string;
  summary: DashboardSummaryStat[];
  columns: DashboardColumn[];
  rows: Array<Record<string, string | number>>;
  severityLegend?: Record<string, string>;
  reviewerNote?: string;
}
```

Create `packages/core/src/dashboard/escape.ts` :

```ts
const HTML_ENTITY_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(input: string | number | null | undefined): string {
  if (input === null || input === undefined) return "";
  const s = typeof input === "number" ? String(input) : input;
  return s.replace(/[&<>"']/g, (ch) => HTML_ENTITY_MAP[ch] ?? ch);
}

const SAFE_URL_SCHEMES = ["http:", "https:", "mailto:"];

export function escapeUrl(input: string | null | undefined): string {
  if (!input) return "";
  try {
    const url = new URL(input);
    if (!SAFE_URL_SCHEMES.includes(url.protocol)) return "";
    return escapeHtml(url.toString());
  } catch {
    return "";
  }
}
```

Create `packages/core/test/dashboard/escape.test.ts` (vitest, 6 tests : entités HTML, attaque `<script>`, attaque `"><img onerror`, URL javascript:, URL mailto:, null/undefined).

Commit: `feat(core): module dashboard — types + escape XSS-safe`

### Task 1.2: Template HTML + JavaScript inline

Create `packages/core/src/dashboard/template.ts` :

Exporter une constante `DASHBOARD_TEMPLATE` qui contient un fichier HTML5 complet avec :
- `<style>` inline (système de design simple : fonts system-ui, couleurs 🔴 #d33 / 🟠 #f80 / 🟡 #fc0 / 🟢 #3a3, table sticky header, hover row, summary cards en grid, reviewer note collapsible)
- `<script>` inline (vanilla JS, ~80 lignes) :
  - Tri par colonne (click sur `<th>`)
  - Filtre live par texte (input search)
  - Boutons sévérité (filtre rows par class `.severity-red` etc.)
  - `textContent` partout, jamais `innerHTML`
- Placeholders `{{TITLE}}`, `{{GENERATED_AT}}`, `{{REVIEWER_NOTE_HTML}}`, `{{SUMMARY_HTML}}`, `{{SEVERITY_LEGEND_HTML}}`, `{{TABLE_HEADERS_HTML}}`, `{{TABLE_ROWS_HTML}}`, `{{FOOTER_VERSION}}`

CSS @media print : marges A4, pas de fond de couleur, table sans hover.

Pas de test direct (vérifié via render.ts).

Commit: `feat(core): template HTML dashboard (zero CDN, XSS-safe)`

### Task 1.3: Fonction `renderDashboard`

Create `packages/core/src/dashboard/render.ts` :

```ts
import { DASHBOARD_TEMPLATE } from "./template.js";
import { escapeHtml } from "./escape.js";
import type { DashboardData } from "./types.js";

const HACIENDA_VERSION = "0.5.0";

function renderSummary(stats: DashboardData["summary"]): string {
  return stats
    .map(s => `<div class="stat-card">${s.emoji ? `<span class="emoji">${escapeHtml(s.emoji)}</span>` : ""}<div class="value">${escapeHtml(s.value)}</div><div class="label">${escapeHtml(s.label)}</div></div>`)
    .join("");
}

function renderHeaders(cols: DashboardData["columns"]): string {
  return cols.map(c =>
    `<th class="${c.sortable !== false ? "sortable" : ""}" data-key="${escapeHtml(c.key)}" ${c.width ? `style="width:${escapeHtml(c.width)}"` : ""}>${escapeHtml(c.label)}</th>`
  ).join("");
}

function detectSeverity(row: Record<string, string | number>): string {
  // Heuristique : si une cellule contient 🔴 → severity-red ; 🟠 → orange ; 🟡 → yellow ; 🟢 → green ; sinon → none
  const text = Object.values(row).join(" ");
  if (text.includes("🔴")) return "severity-red";
  if (text.includes("🟠")) return "severity-orange";
  if (text.includes("🟡")) return "severity-yellow";
  if (text.includes("🟢")) return "severity-green";
  return "";
}

function renderRows(cols: DashboardData["columns"], rows: DashboardData["rows"]): string {
  return rows.map(row => {
    const sev = detectSeverity(row);
    const cells = cols.map(c => `<td>${escapeHtml(row[c.key] ?? "")}</td>`).join("");
    return `<tr class="${sev}">${cells}</tr>`;
  }).join("");
}

function renderSeverityLegend(legend?: Record<string, string>): string {
  if (!legend) return "";
  const items = Object.entries(legend)
    .map(([k, v]) => `<span class="legend-item">${escapeHtml(k)} ${escapeHtml(v)}</span>`)
    .join(" · ");
  return `<div class="severity-legend">${items}</div>`;
}

function renderReviewerNote(note?: string): string {
  if (!note) return "";
  // Conversion Markdown basique : > blockquote, ** bold, * italic, \n → <br>
  const html = escapeHtml(note)
    .replace(/^&gt; ?(.*)$/gm, '<p class="reviewer-line">$1</p>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
  return `<details class="reviewer-note" open><summary>⚠️ Note du relecteur</summary><div>${html}</div></details>`;
}

export function renderDashboard(data: DashboardData): string {
  return DASHBOARD_TEMPLATE
    .replace("{{TITLE}}", escapeHtml(data.title))
    .replace("{{GENERATED_AT}}", escapeHtml(data.generatedAt))
    .replace("{{REVIEWER_NOTE_HTML}}", renderReviewerNote(data.reviewerNote))
    .replace("{{SUMMARY_HTML}}", renderSummary(data.summary))
    .replace("{{SEVERITY_LEGEND_HTML}}", renderSeverityLegend(data.severityLegend))
    .replace("{{TABLE_HEADERS_HTML}}", renderHeaders(data.columns))
    .replace("{{TABLE_ROWS_HTML}}", renderRows(data.columns, data.rows))
    .replace("{{FOOTER_VERSION}}", HACIENDA_VERSION);
}
```

Create `packages/core/test/dashboard/render.test.ts` (vitest) avec ~8 tests :
- Rendu basique (title, generatedAt, summary)
- Détection sévérité 🔴 / 🟠 / 🟡 / 🟢
- Escape HTML dans titre, valeurs, labels
- Escape attaque `<script>` dans rows
- Escape attaque `"><img onerror` dans rows
- Reviewer note rendue (blockquote + bold)
- Sans summary / sans legend / sans reviewerNote
- Round-trip : output contient toutes les rows fournies

Commit: `feat(core): renderDashboard — fonction pure HTML safe`

### Task 1.4: Index module + re-exports

Create `packages/core/src/dashboard/index.ts` :

```ts
export { escapeHtml, escapeUrl } from "./escape.js";
export { renderDashboard } from "./render.js";
export { DASHBOARD_TEMPLATE } from "./template.js";
export type {
  DashboardData,
  DashboardColumn,
  DashboardSummaryStat,
} from "./types.js";
```

Append to `packages/core/src/index.ts` :

```ts
// Dashboard module (V1.1.1)
export {
  escapeHtml as dashboardEscapeHtml,
  escapeUrl as dashboardEscapeUrl,
  renderDashboard,
  DASHBOARD_TEMPLATE,
} from "./dashboard/index.js";
export type {
  DashboardData,
  DashboardColumn,
  DashboardSummaryStat,
} from "./dashboard/index.js";
```

Run `npm test`, `npm run typecheck`, `npm run build`. All green.

Commit: `feat(core): exporter le module dashboard depuis @hacienda/core`

---

## Phase 2 — Skill `revue-portefeuille-marques`

### Task 2.1: Frontmatter + garde-fou + Examples + reformulation

Create `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-marques/SKILL.md`.

Frontmatter, garde-fou loud "registre ≠ renouvellement" — le mandataire/avocat fait la démarche INPI/EUIPO ; un registre désynchronisé du registre officiel INPI/EUIPO crée de la fausse confiance.

3 Examples blocks.

Reformulation longue "REGISTRE, PAS DÉMARCHE OFFICIELLE" à reformuler en tête de chaque output.

Commit: `feat(plugin-pi): revue-portefeuille-marques — frontmatter + garde-fou`

### Task 2.2: Charger profil + portfolio.yaml + Intake commun

Section "Charger le profil + portfolio.yaml" :
- Lecture profils (rôle, posture, calendriers, approbateurs)
- Lecture `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/portfolio.yaml` (créer si absent : `assets: []`)
- Mode provisoire si `[A CONFIGURER]`

Commit: `feat(plugin-pi): revue-portefeuille-marques — chargement profil + portfolio`

### Task 2.3: Mode `--report` + génération dashboard HTML

Section longue — le mode principal.

Pour chaque entrée `assets[]` :
- Calculer prochaine échéance la plus proche (renouvellement décennal) en parcourant les `territoires[]`
- Bucketize par sévérité :
  - 🔴 échéance < 30 j (urgence)
  - 🟠 échéance 30-90 j
  - 🟡 échéance 90 j - 12 mois
  - 🟢 échéance > 12 mois (stable)
- Cross-référence : vérifier si dans `watchlist.yaml` V1.1.0 — si non, flagger `unwatched_asset`

Format Markdown : reviewer note + buckets + recommandations bucketées + "que veux-tu faire ?" (5 options FR).

**Génération dashboard HTML** si `--dashboard` flag OU si > 10 assets :
1. Construire `DashboardData` :
   - title : `"Portefeuille marques — {cabinet}"`
   - generatedAt : ISO date
   - summary : 4 stats (Total, 🔴, 🟠, 🟡) + emoji visuel
   - columns : ID, Signe, Type, Classes, Territoires, Renouvellement, Statut, Owner, Mandataire, Surveillance, Niveau
   - rows : un row par asset (concaténant tous les territoires pour Renouvellement = échéance la plus proche)
   - severityLegend : `{"🔴": "< 30j", "🟠": "30-90j", "🟡": "90j-12 mois", "🟢": "> 12 mois"}`
   - reviewerNote : Markdown du Note du relecteur du Markdown sortie
2. Appeler `renderDashboard(data)` (depuis `@hacienda/core`)
3. Écrire fichier `<output_dir>/portefeuille-YYYY-MM-DD.html`
4. Surfacer le chemin à l'utilisateur dans la sortie Markdown : "Dashboard généré : [chemin]"

Commit: `feat(plugin-pi): revue-portefeuille-marques — mode --report + dashboard HTML`

### Task 2.4: Modes `--add` / `--update` / `--remove` / `--list` / `--audit`

5 modes (calque V1.1.0 `surveillance-marque` modes 2-6).

`--add` walk interactif : signe, type, classes Nice, territoires (FR INPI / EM EUIPO / autres offices + numéros + dates), titulaire, mandataire, business_owner, niveau_strategique, notes. Validation Zod + backup `.bak`.

`--update` par ID, idem.

`--remove` avec confirmation explicite si `niveau_strategique = "core"` (raison demandée).

`--list` table Markdown : ID | signe | classes | territoires | échéance la plus proche | niveau | owner.

`--audit` :
- Renouvellements <12 mois sans plan déclaré
- Marques absentes de la watchlist V1.1.0
- Classes Nice manquantes vs domaine business du profil
- Titulaires obsolètes (changement raison sociale ?)
- Cap recommandé : > 100 assets = surcharge cabinet (envisager IPMS commercial)

Commit: `feat(plugin-pi): revue-portefeuille-marques — modes --add/--update/--remove/--list/--audit`

### Task 2.5: Sortie + Ne fait pas + Ton

**Emplacement** : `~/.claude/plugins/config/.../outputs/portefeuille-YYYY-MM-DD.md` + `.html` si dashboard généré.

**Ce que ce skill NE fait PAS** (6 points min) : renouveler (= mandataire INPI/EUIPO) ; calculer les taxes (V1.2) ; payer (= mandataire + CPA Global ou cabinet tiers) ; déposer une nouvelle marque (= `depot-marque-fr` V1.1.2) ; surveiller (= `surveillance-marque` V1.1.0 + agent `bopi-watcher`) ; garantir la conformité du registre vs INPI/EUIPO officiel (sync nécessaire avant action — TSDR équivalent FR : Base Marques INPI publique).

**Ton** : précis, factuel, orienté action. L'avocat/mandataire lit le rapport, repère les 🔴, prépare le renouvellement.

Commit: `feat(plugin-pi): revue-portefeuille-marques — sortie + ne fait pas + ton`

### Task 2.6: Référence `references/modele-portfolio.md`

Create `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-marques/references/modele-portfolio.md` (~80-100 lignes) :
- Schéma `portfolio.yaml` complet commenté
- 2 exemples d'entrées (mot vs figuratif)
- Bonnes pratiques :
  - Toujours renseigner `business_owner` (ne pas avoir d'alertes orphelines)
  - `niveau_strategique` aide l'audit (core = jamais laisser dériver, heritage = peut être laissé tomber après évaluation)
  - Cross-référencer avec `watchlist.yaml` (V1.1.0) : toute marque core doit être watched
  - Sync trimestriel avec base INPI publique pour vérification dates renouvellement
- Lien `portfolio.yaml` ↔ skill ↔ dashboard

Commit: `docs(plugin-pi): modèle portfolio.yaml + bonnes pratiques`

---

## Phase 3 — Référence `dashboard-template.md` + Patches plugin

### Task 3.1: Référence d'utilisation du dashboard

Create `plugins/hacienda-propriete-intellectuelle/references/dashboard-template.md` (~80 lignes) :
- Quand utiliser le dashboard HTML : sortie data-heavy (>10 lignes), portefeuille/registre/findings list
- Comment depuis un skill : importer `renderDashboard` + `DashboardData` de `@hacienda/core`, construire l'objet, appeler la fonction, écrire le fichier
- Standardisation visuelle (couleurs sévérité, summary cards, légende)
- Sécurité : escape automatique côté `renderDashboard` mais rappel pour les développeurs
- Localisation : à côté du `.md` de sortie, suffixe `.html`
- Cible future : V2.2 `revue-portefeuille-brevets`, V5.0 `audit-pi-ma`, V6.0 multi-affaires contentieux

Commit: `docs(plugin-pi): référence dashboard template`

### Task 3.2: Patch `CLAUDE.md` template — section Portefeuille + Dashboard offer activée

Modifier `plugins/hacienda-propriete-intellectuelle/CLAUDE.md` :

1. Ajouter une section "## Portefeuille" (juste après "## Brand protection") :

```markdown
## Portefeuille

**Registre marques :** `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/portfolio.yaml`
**Volume estimé :** [A CONFIGURER — < 50 / 50-200 / > 200 = envisager IPMS commercial (Anaqua, Dennemeyer, Questel)]
**Cadence revue portefeuille :** [A CONFIGURER — trimestrielle / annuelle]
**Format de rapport préféré :** [A CONFIGURER — Markdown seul / Markdown + dashboard HTML (recommandé > 10 marques)]
**Sync avec base INPI publique :** [A CONFIGURER — manuel trimestriel / au moment de chaque rapport]
```

2. Mettre à jour la section "Offre tableau de bord" dans "## Sorties standardisées" :

```markdown
**Offre tableau de bord HTML standardisé.** Quand un output est data-heavy (> 10 lignes tabulaires, registres, portefeuilles, findings list avec sévérité/statut/dates), le skill génère **automatiquement** un fichier HTML local à côté du Markdown via `renderDashboard()` de `@hacienda/core`. Format autonome (zéro CDN, ouvrable hors-ligne), XSS-safe, sortable/filtrable/recherchable. Voir `references/dashboard-template.md`.
```

Branding check.

Commit: `feat(plugin-pi): CLAUDE.md template — section Portefeuille + dashboard offer activée`

### Task 3.3: Bump version 0.4.0 → 0.5.0

- `plugins/hacienda-propriete-intellectuelle/.claude-plugin/plugin.json` : version 0.5.0, description étendue (mentionner "portefeuille marques + dashboard HTML standardisé"), keywords +portefeuille, +dashboard
- `plugins/hacienda-propriete-intellectuelle/mcp-server/package.json` : version 0.5.0
- Rebuild MCP server

Commit: `chore(plugin-pi): bump 0.4.0 → 0.5.0 (V1.1.1 portefeuille + dashboard)`

### Task 3.4: CHANGELOG + README v0.5.0

Append au CHANGELOG (top) :

```markdown
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
```

README "Quoi de neuf en V0.5" (avant V0.4) :

```markdown
## Quoi de neuf en V0.5 — Portefeuille + Dashboard HTML

- Nouveau skill `revue-portefeuille-marques` (gestion CRUD du registre marques, audit santé)
- Premier **dashboard HTML standardisé** dans `@hacienda/core/dashboard/` : fonction `renderDashboard()` réutilisable, format autonome (zéro CDN), XSS-safe
- Génération automatique d'un fichier `.html` à côté du Markdown quand un output dépasse 10 lignes tabulaires
- Référentiel `portfolio.yaml` user-stable (calque watchlist.yaml V0.3)
```

Commit: `docs(plugin-pi): CHANGELOG + README v0.5.0`

---

## Phase 4 — Vérification + Push + PR + Merge

### Task 4.1: Vérifications

- `npm test` (attendu ≥ 270 — 255 + ~15 nouveaux : escape × 6 + render × 8 + 1 skill smoke)
- `npm run typecheck`
- `npm run build`
- `npm run branding:check`
- `git diff --check`

Smoke : générer un dashboard test rapide pour vérifier rendu :

```bash
node -e "
import('./packages/core/dist/dashboard/index.js').then(m => {
  const html = m.renderDashboard({
    title: 'Test',
    generatedAt: '2026-05-16',
    summary: [{label: 'Total', value: 3}],
    columns: [{key: 'id', label: 'ID'}, {key: 'name', label: 'Nom'}],
    rows: [
      {id: 'A1', name: '<script>alert(1)</script>'},
      {id: 'A2', name: '🔴 urgent'},
      {id: 'A3', name: 'normal'}
    ]
  });
  console.log('OK length:', html.length, 'contains escaped:', html.includes('&lt;script&gt;'), 'contains severity:', html.includes('severity-red'));
});
"
```

Expected output : `OK length: <number> contains escaped: true contains severity: true`.

NO COMMIT.

### Task 4.2: Push + PR + Merge

- `git push -u origin claude/pi-marques-v1.1.1-portfolio`
- `gh pr create --base main --title "PI marques V1.1.1 : portefeuille + dashboard HTML standardisé" --body "..."` body verbatim plan §4.2 :

```markdown
## Summary

V1.1.1 — Compléter le bloc marques après V1.1.0 surveillance :

- Skill `revue-portefeuille-marques` (6 modes CRUD + audit, style Anthropic ip-legal portfolio adapté FR)
- Premier **dashboard HTML standardisé** dans `@hacienda/core/dashboard/` : format autonome (zéro CDN), XSS-safe, sortable/filtrable/imprimable, **réutilisable** pour tous les futurs outputs data-heavy (V2.2 brevets, V5.0 M&A)
- Référentiel `portfolio.yaml` user-stable + 2 références (`dashboard-template.md`, `modele-portfolio.md`)
- Bump plugin 0.4.0 → 0.5.0

## Spec & plan

- [Spec](https://github.com/jamon8888/hacienda-juridique/blob/claude/pi-marques-v1.1.1-portfolio/docs/superpowers/specs/2026-05-16-hacienda-pi-marques-v1.1.1-portfolio-dashboard-design.md)
- [Plan](https://github.com/jamon8888/hacienda-juridique/blob/claude/pi-marques-v1.1.1-portfolio/docs/superpowers/plans/2026-05-16-hacienda-pi-marques-v1.1.1-portfolio-dashboard.md)

## Test plan

- [x] `npm test` vert (270+)
- [x] `npm run typecheck` clean
- [x] `npm run build` clean
- [x] `npm run branding:check` OK
- [x] Smoke render dashboard avec input malicieux `<script>alert(1)</script>` → escaped correctement
- [ ] Validation manuelle : ouvrir le `.html` généré dans Chrome/Firefox, tester tri colonne + filtre texte + boutons sévérité

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

- `gh pr merge <num> --merge` (auto-merge si CLEAN).

Report PR URL + merge status.

---

## Self-review

- [x] Spec §3 architecture → Phase 1.4 + 3.3
- [x] Spec §4 dashboard module → Phase 1.1-1.4
- [x] Spec §5 skill → Phase 2.1-2.6
- [x] Spec §7 critères → Phase 4.1
- [x] Type consistency : `DashboardData` créé 1.1, consommé 1.3, ré-exporté 1.4, utilisé 2.3
- [x] No placeholder

---

**Plan complet.** Subagent-driven en 2-3 dispatches (Phase 1 module / Phase 2 skill / Phase 3+4 patches+PR).
