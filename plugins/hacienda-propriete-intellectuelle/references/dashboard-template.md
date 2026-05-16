# Référence — Dashboard HTML standardisé

Guide d'utilisation du module `@hacienda/core/dashboard/` pour produire des sorties data-heavy interactives. Introduit en V1.1.1 avec `revue-portefeuille-marques`, cible réutilisation par tous les skills futurs.

---

## Quand utiliser le dashboard HTML

Génération automatique recommandée quand un output dépasse **10 lignes tabulaires** ou contient des données structurées avec sévérité / statut / dates :

- Portefeuilles (marques, brevets, dessins et modèles)
- Registres (watchlist, log de surveillance, journal de vérification)
- Findings list (audit, due diligence, contentieux multi-affaires)
- Trackers (échéances de renouvellement, calendrier d'oppositions)

En deçà de 10 lignes ou pour une réponse narrative, rester en Markdown seul.

---

## Comment depuis un skill

```ts
import { renderDashboard, type DashboardData } from "@hacienda/core";
import * as fs from "node:fs/promises";

const data: DashboardData = {
  title: "Portefeuille marques — Cabinet Exemple",
  generatedAt: new Date().toISOString().slice(0, 10),
  summary: [
    { label: "Total", value: 42 },
    { label: "🔴 < 30j", value: 3 },
    { label: "🟠 30-90j", value: 7 },
    { label: "🟢 stable", value: 32 },
  ],
  columns: [
    { key: "id", label: "ID", width: "80px" },
    { key: "signe", label: "Signe" },
    { key: "echeance", label: "Renouvellement" },
    { key: "severite", label: "Sévérité" },
  ],
  rows: [
    { id: "M-001", signe: "APEXLEAF", echeance: "2026-06-12", severite: "🔴 < 30j" },
    // ... autres lignes, valeurs déjà sous forme de strings simples
  ],
  severityLegend: {
    "🔴": "< 30 jours",
    "🟠": "30-90 jours",
    "🟡": "90j-12 mois",
    "🟢": "> 12 mois",
  },
  reviewerNote: "⚠️ Note du relecteur\n- **Sources :** INPI Data vérifié 2026-05-16\n- **Avant action :** confirmer les dates contre la Base Marques INPI publique",
};

const html = renderDashboard(data);
await fs.writeFile(outputPath, html, "utf8");
```

---

## Standardisation visuelle

- **Couleurs sévérité** (canoniques cross-plugin) : 🔴 `#d33` / 🟠 `#f80` / 🟡 `#fc0` / 🟢 `#3a3`. Détection automatique sur le contenu des cellules — ne pas réimplémenter.
- **Summary cards** en grid responsive en haut du dashboard.
- **Légende sévérité** sous le résumé, format inline avec séparateurs `·`.
- **Note du relecteur** : `<details open>` repliable, Markdown basique supporté (`**bold**`, `> blockquote`, `\n`).
- **Table** : sticky header, tri par colonne au clic, filtre texte live, boutons de filtre sévérité.

---

## Sécurité XSS

`renderDashboard` escape automatiquement toutes les valeurs via `escapeHtml`. **Mais** :

- NE JAMAIS passer du HTML brut dans `reviewerNote`, dans les valeurs de `rows`, ou dans les labels.
- Le skill construit des **strings simples** ; le module les escape.
- Pour les URLs (futur), utiliser `escapeUrl` qui valide le scheme (`http:`, `https:`, `mailto:` seulement).
- Aucune dépendance externe, aucun CDN, aucun `eval` côté JS inline.

---

## Localisation des fichiers

À côté du Markdown de sortie, suffixe `.html` :

```
~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/
  portefeuille-2026-05-16.md       ← rapport Markdown (note du relecteur + livrable)
  portefeuille-2026-05-16.html     ← dashboard interactif
```

Toujours surfacer le chemin du `.html` dans la sortie Markdown : `Dashboard généré : [chemin]`.

---

## Pas de dépendance externe

Le fichier HTML est **standalone** :

- Ouvrable hors-ligne (zéro CDN, zéro requête réseau).
- Imprimable A4 (CSS `@media print` avec marges, pas de fond, table sans hover).
- Compatible Chrome, Firefox, Safari récents.
- Aucune télémétrie.

---

## Cibles futures

- **V2.2** `revue-portefeuille-brevets` : même pattern, données brevets + classifications CIB au lieu de Nice. Réutilise `renderDashboard` tel quel.
- **V5.0** `audit-pi-ma` : dashboard multi-actifs (marques + brevets + DM + droit d'auteur + secrets d'affaires) avec findings de due diligence côtés par sévérité.
- **V6.0** contentieux multi-affaires : tracker dossiers actifs avec échéances procédurales et matrices d'approbation.

Toute extension passe par le même `DashboardData` — pas de fork du module, pas de variante.

---

## Test rapide en local

```bash
node -e "import('./packages/core/dist/dashboard/index.js').then(m => { const html = m.renderDashboard({title: 'Test', generatedAt: '2026-05-16', summary: [], columns: [{key: 'id', label: 'ID'}], rows: [{id: 'A1'}]}); require('fs').writeFileSync('/tmp/test-dashboard.html', html); console.log('OK ' + html.length + ' chars'); });"
```

Ouvrir le fichier généré dans un navigateur pour vérifier le rendu visuel.
