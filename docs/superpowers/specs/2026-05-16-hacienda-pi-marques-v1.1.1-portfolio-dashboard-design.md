# Hacienda PI — Bloc Marques V1.1.1 Portefeuille + Dashboard HTML — Design

**Date** : 2026-05-16
**Plugin** : `hacienda-propriete-intellectuelle` v0.5.0 (extension de v0.4.0)
**Base** : main (V1.0 + V1.1.0 + V2.0 mergés)

---

## 1. Objectifs

Deux livrables couplés :

1. **Skill `revue-portefeuille-marques`** — gestion CRUD d'un registre de marques détenues (`portfolio.yaml`), audit santé, rapport échéances, identification gaps (marques non surveillées, classes manquantes, renouvellements approchant).
2. **Système de dashboard HTML standardisé** — premier template `dashboard-template.html` réutilisable pour tous les futurs outputs data-heavy (V2.2 portefeuille brevets, V5.0 audit-pi-ma, V6.0 contentieux multi-marques, etc.). Module générique dans `@hacienda/core` qui génère un fichier HTML local depuis un objet de données structuré.

Bump plugin v0.4.0 → v0.5.0.

## 2. Non-objectifs

- Pas de dashboard server-side / interactive React — un fichier HTML statique avec JavaScript inline pour le tri/filtre suffit
- Pas de monitoring temps réel (V1.1.0 `bopi-watcher` couvre déjà la surveillance)
- Pas de connecteur IPMS commercial (Anaqua, Dennemeyer, etc.) — V1.2+
- Pas de calcul automatique des taxes de renouvellement INPI/EUIPO — données affichées mais pas calculées
- Pas d'export Excel natif — différé V1.2 (le dashboard HTML couvre 90% des besoins)
- Pas de gestion des annuités brevets (déjà prévu agent `echeances-pi` V3.0+)

## 3. Architecture

### 3.1 Plugin étendu

```
plugins/hacienda-propriete-intellectuelle/                v0.5.0
├── .claude-plugin/plugin.json                            [BUMP] 0.5.0
├── CLAUDE.md                                             [PATCH] section "Portefeuille" + dashboard offer mis à jour
├── CHANGELOG.md                                          [PATCH] section 0.5.0
├── README.md                                             [PATCH] "Quoi de neuf en V0.5"
│
├── skills/
│   ├── revue-portefeuille-marques/                       [NEW]
│   │   ├── SKILL.md                                       (~400-500 lignes, style Anthropic FR)
│   │   └── references/
│   │       └── modele-portfolio.md                        (schema portfolio.yaml + bonnes pratiques)
│   └── (autres skills intact)
│
└── references/
    └── dashboard-template.md                             [NEW] guide d'utilisation du dashboard standard
```

### 3.2 Extensions de `@hacienda/core`

```
packages/core/src/
└── dashboard/                                            [NEW MODULE]
    ├── index.ts                                          → export public
    ├── template.ts                                       → template HTML + JS inline (tri/filtre/recherche)
    ├── render.ts                                         → fonction `renderDashboard(data) → htmlString`
    ├── escape.ts                                         → HTML escaping anti-injection (XSS guard)
    └── types.ts                                          → DashboardData / DashboardColumn / DashboardSummaryStat
```

Pas de nouveau tool MCP — le dashboard est utilisé côté skill (sortie du Markdown contient une instruction du type "génère un dashboard HTML et écris-le à `<chemin>/dashboard.html`"). Le skill appelle directement la fonction `renderDashboard()` exposée par `@hacienda/core`.

### 3.3 Configuration utilisateur

```
~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/
├── portfolio.yaml                                        [NEW] référentiel portefeuille marques (calque watchlist.yaml V1.1.0)
└── outputs/
    ├── portefeuille-YYYY-MM-DD.md                        [NEW format]
    └── portefeuille-YYYY-MM-DD.html                      [NEW format dashboard]
```

## 4. Le dashboard HTML standardisé (cœur du V1.1.1)

### 4.1 Format de données d'entrée (TypeScript)

```ts
export interface DashboardData {
  title: string;                                          // "Portefeuille marques — Cabinet ACME"
  generatedAt: string;                                    // ISO date
  summary: DashboardSummaryStat[];                        // stats du haut ("40 marques · 6 due ce mois · 3 en grace")
  columns: DashboardColumn[];                             // colonnes table
  rows: Array<Record<string, string | number>>;           // données (escapées HTML)
  severity_legend?: Record<string, string>;               // ex { "🔴": "Échéance < 30j", "🟠": "Échéance 30-90j" }
  reviewer_note?: string;                                 // bloc reviewer note (Markdown converti)
}

export interface DashboardSummaryStat {
  label: string;                                          // "Total"
  value: string | number;                                 // 40
  emoji?: string;                                         // optionnel pour visuel
}

export interface DashboardColumn {
  key: string;                                            // "signe"
  label: string;                                          // "Marque"
  sortable?: boolean;                                     // défaut true
  width?: string;                                         // "120px" optionnel
}
```

### 4.2 Template HTML (autonome, pas de dépendance externe)

- HTML5 standalone
- CSS inline (pas de framework externe) — simple, lisible, imprimable
- JavaScript inline : tri par colonne, filtre par texte, recherche, surlignage 🔴 lignes
- Pas de SVG complexe ni librairie (chart.js trop lourd) — barres horizontales CSS pour distributions simples
- Imprimable A4 sans surprise
- Aucune ressource externe (CDN, font, image) — le fichier doit s'ouvrir hors-ligne

Composants visuels :
1. **Header** : titre + date de génération + bloc résumé (4-6 stats clés en cartes)
2. **Reviewer note** (si fournie) : bloc collapsible en tête, format Markdown converti basiquement
3. **Filter bar** : input texte de recherche live + boutons par sévérité (🔴 🟠 🟡 🟢)
4. **Table principale** : sortable par clic colonne, lignes colorées par sévérité, pagination simple (50/page) si >50 rows
5. **Footer** : "Généré par Hacienda Juridique le YYYY-MM-DD HH:MM" + version

### 4.3 Sécurité

**HTML escaping mandatory** pour TOUTES les valeurs `rows` et `summary` :
- Toute string passée dans une cellule, un attribut, un tooltip = passée par `escapeHtml()` (échappe `<`, `>`, `&`, `"`, `'`)
- `textContent` plutôt que `innerHTML` dans le JS inline
- Pas de URL dans `href`/`src` sans validation scheme (`http:` / `https:` / `mailto:` only)

Cette précaution est essentielle car les données viennent de sources externes (INPI Data, EUIPO TMview, contrats utilisateur) — un titulaire malicieux pourrait injecter du JS via un nom contenant `<script>`.

### 4.4 Fonction publique

```ts
import { renderDashboard, type DashboardData } from "@hacienda/core";

const data: DashboardData = { /* ... */ };
const html = renderDashboard(data);
await fs.writeFile("dashboard.html", html, "utf8");
```

## 5. Le skill `revue-portefeuille-marques`

### 5.1 Frontmatter

```yaml
---
name: revue-portefeuille-marques
description: >
  Gère le registre du portefeuille de marques détenues (CRUD + audit). Modes :
  --report (rapport horodaté + dashboard HTML), --add, --update, --remove,
  --list, --audit. Produit un dashboard HTML standardisé local exploitable
  sans serveur. NE renouvelle PAS — décision et démarche INPI/EUIPO restent
  au mandataire en marques ou avocat.
argument-hint: "[--report [--dashboard] | --add | --update | --remove | --list | --audit]"
---
```

### 5.2 Sections (calque `surveillance-marque` V1.1.0, 6 modes)

1. **Garde-fou** : registre ≠ renouvellement ; mandataire/avocat fait la démarche INPI/EUIPO.

2. **Lecture profil** : rôle, posture enforcement, mandataires associés, calendriers, approbateurs.

3. **6 modes** :
   - `--report [--dashboard]` (défaut) : rapport horodaté en buckets (🔴 échéance <30j / 🟠 30-90j / 🟡 >90j / 🟢 stable). Si `--dashboard` ou si >10 marques, génère **dashboard HTML** à côté du Markdown.
   - `--add` : interactif (signe, classes Nice, territoires, numéros INPI/EUIPO/OMPI, dates dépôt + renouvellement, mandataire, business owner)
   - `--update` : modifier (par ID)
   - `--remove` : supprimer (confirmation si niveau "core asset")
   - `--list` : table Markdown
   - `--audit` : santé (renouvellements approchant, marques non surveillées par `bopi-watcher`, classes Nice manquantes vs business, propriétaires obsolètes)

4. **Format de sortie** Markdown + dashboard HTML :
   - Markdown : reviewer note, buckets, recommandations bucketées
   - Dashboard HTML : table sortable, filtres, severity badges, summary stats

5. **Cross-référence avec watchlist** : pour chaque marque du portefeuille, vérifier si elle est dans `watchlist.yaml` (V1.1.0) — si non, flagger comme `unwatched_asset` (cf. pattern Anthropic ip-legal).

6. **Sortie écrite** : `~/.claude/plugins/config/.../outputs/portefeuille-YYYY-MM-DD.md` + `.html` si dashboard généré.

7. **Ce que ce skill NE fait PAS** : renouveler (mandataire/avocat fait la démarche INPI/EUIPO) ; calculer les taxes (différer V1.2) ; payer les annuités ; déposer une nouvelle marque (= `depot-marque-fr` V1.1.2) ; surveiller (= `surveillance-marque` V1.1.0).

### 5.3 Format du portfolio.yaml

```yaml
metadata:
  cabinet: "[depuis CLAUDE.md]"
  generated: "2026-05-16"
  last_audit: "2026-05-16"
  source_system: "manual"                                 # ou IPMS si import

assets:
  - id: "TM-FR-001"
    signe: "APEXLEAF"
    type: "mot"                                           # mot / figuratif / composite
    classes: ["25", "35"]
    territoires:
      - office: "FR"                                      # INPI
        numero: "1234567"
        dateDepot: "2020-01-15"
        dateEnregistrement: "2020-08-01"
        dateRenouvellement: "2030-01-15"
        statut: "enregistree"
      - office: "EM"                                      # EUIPO
        numero: "018789012"
        dateDepot: "2020-02-01"
        dateEnregistrement: "2020-09-15"
        dateRenouvellement: "2030-02-01"
        statut: "enregistree"
    titulaire: "ACME SAS"
    mandataire: "Cabinet X"
    business_owner: "marketing@acme.fr"
    niveau_strategique: "core"                            # core / important / standard / heritage
    notes: "Marque produit phare, surveillance étroite"
    dateAjout: "2026-05-16"
    dernier_audit: null
```

## 6. Adaptations FR vs pattern Anthropic portfolio

| Anthropic ip-legal portfolio (US) | Hacienda V1.1.1 (FR) |
|---|---|
| Stocke trademark + patent + copyright dans un même `portfolio.yaml` | V1.1.1 = **marques uniquement** (portefeuille brevets séparé V2.2 dans `portfolio-brevets.yaml`) |
| TSDR / USPTO verification | INPI Data marques + EUIPO TMview pour vérification (via tools V1.0) |
| §8 declarations USPTO | **Renouvellement décennal INPI/EUIPO** (pas d'équivalent §8 use declaration en FR) |
| 10-year renewal | 10 ans FR/EU pareil — alertes 6 mois avant |
| Madrid international designations | Madrid (OMPI) via OMPI Madrid Monitor — différé V1.2 |
| dashboard format générique | dashboard standardisé **réutilisable** pour V2.2 brevets, V5.0 M&A audit, etc. |

## 7. Critères de succès V1.1.1

- [ ] `npm test` vert (256+ tests = 255 + nouveaux dashboard tests)
- [ ] `npm run typecheck`, `npm run build`, `npm run branding:check` verts
- [ ] Sans `portfolio.yaml`, `/revue-portefeuille-marques --list` propose `--add` ou affiche "registre vide"
- [ ] `/revue-portefeuille-marques --add` crée une entrée valide + backup `.bak`
- [ ] `/revue-portefeuille-marques --report` produit un Markdown structuré ; si --dashboard ou >10 entrées, génère aussi le `.html`
- [ ] Le dashboard HTML s'ouvre dans un navigateur, tri/filtre/recherche fonctionnent, échappement XSS vérifié
- [ ] Pas de régression V1.0 / V1.1.0 / V2.0
- [ ] Bump v0.4.0 → v0.5.0

## 8. Risques

| Risque | Mitigation |
|---|---|
| Dashboard cassé par injection HTML | `escapeHtml()` test unitaire dédié + tests avec inputs malicieux (`<script>alert(1)</script>`, `"><img onerror=...>`) |
| Portfolio.yaml corrompu après écriture | Backup `.bak` horodaté avant chaque modification (pattern V1.1.0) |
| Conflit visuel dashboard imprimé A4 | CSS `@media print` testé, marges respectées |
| Le dashboard nécessite trop de dépendances | Strict : zéro CDN, zéro framework, vanilla HTML+CSS+JS inline. Test : ouverture hors-ligne du fichier |
| Skill trop proche de `surveillance-marque` (confusion) | Sections "Ce que ce skill NE fait PAS" explicite ; cross-ref `bopi-watcher` pour la surveillance |

## 9. Plan de rollout

- **V1.1.1 (ce spec)** — portefeuille marques + dashboard HTML standardisé
- **V1.1.2** — `depot-marque-fr` + `analyse-opposition-marque`
- **V1.2** — `contrefacon-web` agent + connecteur OMPI Madrid Monitor
- **V2.1** — brevets : `analyse-refus-inpi` + `anteriorite-invalidite` + Google Patents
- **V2.2** — brevets : `strategie-extension-internationale` + `revue-portefeuille-brevets` (réutilise le dashboard HTML)
- **V3.0+** — Dessins/Modèles, Droit d'auteur, Contrats, Contentieux

## 10. Annexes

### A — Articles CPI référencés

- Marques L.712-9 : durée 10 ans renouvelable
- Marques L.714-1 : cession et licence
- Madrid : Arrangement et Protocole de Madrid (OMPI)

### B — Inspirations

- `claude-for-legal/ip-legal/skills/portfolio/SKILL.md` (Anthropic) — pattern 6-modes + register
- `claude-for-legal/ip-legal/CLAUDE.md` §Dashboard offer — pattern dashboard pour data-heavy outputs
- V1.1.0 `surveillance-marque` — calque pour les 6 modes CRUD

---

*Version 1.1.1 — mode autonome.*
