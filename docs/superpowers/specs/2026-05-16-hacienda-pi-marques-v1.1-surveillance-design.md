# Hacienda PI — Bloc Marques V1.1.0 Surveillance — Design

**Date** : 2026-05-16
**Plugin** : `hacienda-propriete-intellectuelle` v0.3.0 (extension de v0.2.0)
**Auteur** : brainstorming Claude + utilisateur
**Base** : V1.0 livré dans PR #1 (skill `recherche-anteriorite-marque`, 4 tools MCP marques, profil user-stable, 33 commits)

---

## 1. Objectifs

Compléter le workflow marques en ajoutant la **surveillance proactive** : détecter rapidement les dépôts concurrents publiés au BOPI INPI ou à l'EUIPO Bulletin et alerter avant l'expiration du délai d'opposition (2 mois post-publication BOPI, CPI L.712-4).

Livrables :
- 1 nouveau skill `surveillance-marque` (style Anthropic, ~250-300 lignes) — gère la watchlist (CRUD), exécute une surveillance ad-hoc, produit un rapport horodaté.
- 1 nouveau agent `bopi-watcher` — déclenchement quotidien, lit la watchlist, appelle les outils delta, poste un rapport (Slack / email / inline) avec les nouveautés depuis la dernière exécution.
- 1 ou 2 nouveaux tools MCP : `inpi_marques_publications_recentes` (delta API depuis date X) et éventuellement `euipo_marques_publications_recentes` (équivalent EUIPO Bulletin).
- 1 référentiel `watchlist.yaml` à `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/watchlist.yaml` (chemin user-stable).
- Mise à jour du `CLAUDE.md` template plugin pour intégrer la posture surveillance + nouveaux placeholders (canal Slack, cadence, seuils alerte).

Bump plugin v0.2.0 → v0.3.0.

## 2. Non-objectifs

Hors scope V1.1.0, traités en V1.1.1+ :
- `revue-portefeuille-marques` + premier dashboard HTML (V1.1.1)
- `depot-marque-fr` + `analyse-opposition-marque` (V1.1.2)
- Surveillance noms de domaine, marketplaces, réseaux sociaux (V1.2 `contrefacon-web`)
- Migration des 9 skills v0.1 au format V1 (V1.2+)
- Parsing PDF complet du BOPI (jamais — trop fragile, l'API delta couvre 99% des besoins)
- Surveillance internationale OMPI Madrid Monitor (V2)
- Dashboard de surveillance / KPIs (V1.1.1 avec dashboard HTML)

## 3. Architecture

### 3.1 Plugin étendu

```
plugins/hacienda-propriete-intellectuelle/                v0.3.0
├── .claude-plugin/plugin.json                            [BUMP] 0.3.0
├── CLAUDE.md                                             [PATCH] section "Brand protection" enrichie
│
├── skills/
│   ├── recherche-anteriorite-marque/                     [INCHANGÉ]
│   ├── surveillance-marque/                              [NEW]
│   │   ├── SKILL.md                                       (~250-300 lignes style Anthropic)
│   │   └── references/
│   │       └── modele-watchlist.md                        (template watchlist.yaml + bonnes pratiques)
│   └── (les 9 skills v0.1 + entretien-demarrage)         [INCHANGÉ]
│
├── agents/
│   ├── bopi-watcher.md                                   [NEW]  agent V1, format claude-for-legal renewal-watcher
│   └── (les 4 agents v0.1)                               [INCHANGÉ]
│
├── references/
│   └── ressources-pi-fr.md                               [PATCH] ajout section "Bulletins officiels"
│
└── mcp-server/                                           [INCHANGÉ — pas de bump version MCP server]
```

### 3.2 Extensions de `@hacienda/core`

```
packages/core/src/
├── sources/
│   ├── inpi-marques.ts                                   [PATCH] ajouter méthode `marquesPublicationsRecentes(args)`
│   └── (euipo-tmview.ts, bopi.ts inchangés)              
└── tools/
    ├── inpi-marques-publications-recentes.ts             [NEW]
    └── (autres inchangés)
```

### 3.3 Configuration utilisateur

```
~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/
├── CLAUDE.md                                             [INCHANGÉ structure, ajout placeholders surveillance]
├── verification-log.md                                   [INCHANGÉ]
├── watchlist.yaml                                        [NEW] référentiel watchlist
└── outputs/                                              [INCHANGÉ]
    └── surveillance-<date>.md                            [NEW format de fichier]
```

## 4. Le skill `surveillance-marque`

### 4.1 Frontmatter

```yaml
---
name: surveillance-marque
description: >
  Gère la watchlist de marques surveillées et exécute la surveillance des
  publications INPI/EUIPO récentes. Modes : --report (par défaut, rapport sur
  fenêtre), --add (ajouter une entrée), --update (modifier), --remove
  (supprimer), --list (afficher la watchlist), --audit (santé de la watchlist).
  Conçu pour produire des alertes actionnables avant expiration du délai
  d'opposition (2 mois post-BOPI L.712-4).
argument-hint: "[--report [--days N] | --add | --update | --remove | --list | --audit]"
---
```

### 4.2 Sections (calque Anthropic ip-legal `portfolio` skill, 6 modes)

1. **Garde-fou en tête** :
   > **Outil de surveillance, pas un avis juridique.** Une alerte signale un dépôt récent qui *peut* poser problème — l'évaluation du risque de confusion et la décision d'opposition reviennent au mandataire/avocat. Une marque listée comme "🟢 aucun signal" ne veut PAS dire qu'aucun risque n'existe : elle veut dire que la surveillance n'a rien remonté dans la fenêtre couverte.

2. **Lecture profil** depuis `~/.claude/plugins/config/.../CLAUDE.md` (rôle, posture enforcement, approbateurs, canal alerte).

3. **6 modes** :
   - `--report [--days N]` (défaut, fenêtre 7 j) — pour chaque entrée watchlist, appelle `inpi_marques_publications_recentes` sur la fenêtre, classe les résultats par sévérité (🔴 délai opposition <30j / 🟠 délai 30-60j / 🟡 nouveau dépôt similaire), produit le rapport.
   - `--add` — interactive : motCle, classes Nice, titulaire (optionnel pour cibler portefeuille concurrent), niveau alerte (haut/moyen/bas), destinataires.
   - `--update` — modifier une entrée existante (par identifiant).
   - `--remove` — supprimer une entrée (confirmation requise si niveau alerte = haut).
   - `--list` — affiche la watchlist en table (id | motCle | classes | niveau | dernière exécution).
   - `--audit` — santé de la watchlist : entrées sans exécution depuis 30 j, doublons, motsCle trop génériques (1-2 caractères), classes incohérentes.

4. **Format de sortie** — template Markdown inline (calque ip-legal `portfolio`, adapté FR), buckets :
   - 🔴 **OPPOSITION URGENTE** (délai <30j à courir) — citation L.712-4 + lien direct fiche INPI
   - 🟠 **OPPOSITION À PRÉVOIR** (délai 30-60j)
   - 🟡 **NOUVEAU DÉPÔT SIMILAIRE** (publié dans la fenêtre, sans urgence opposition)
   - 🌐 **AGENT-MANAGED** (entrées surveillance externalisées à Corsearch / CompuMark / cabinet tiers)
   - ❓ **DONNÉES MANQUANTES** (entrée watchlist sans dernière exécution réussie)

5. **Reviewer note + decision tree** — patrons standard du `CLAUDE.md` plugin (5 options FR : Préparer opposition, Escalader, Compléter les faits, Surveiller et attendre, Autre).

6. **Sortie écrite à** `~/.claude/plugins/config/.../outputs/surveillance-YYYY-MM-DD.md`.

7. **Ce que ce skill NE fait PAS** : décider d'une opposition, calculer un risque de confusion détaillé (= rôle de `recherche-anteriorite-marque` ou avocat), envoyer une mise en demeure (= rôle de `mise-en-demeure-pi` v0.1), modifier l'agent (= rôle de l'utilisateur via `agents/bopi-watcher.md`).

## 5. L'agent `bopi-watcher`

### 5.1 Frontmatter

```yaml
---
name: bopi-watcher
description: >
  Agent de surveillance quotidienne. Lit la watchlist, appelle
  `surveillance-marque --report --days 1` (delta depuis hier), poste les
  résultats au canal défini dans le profil. Escalade immédiate sur
  🔴 OPPOSITION URGENTE (délai <30j) regardless de l'horaire.
  Phrases déclencheuses : "que se passe-t-il sur le BOPI", "surveillance
  quotidienne", "alerte marques".
model: sonnet
tools: ["Read", "Write", "mcp__*__inpi_marques_publications_recentes",
        "mcp__*__inpi_marque_details", "mcp__*__slack_send_message"]
---
```

### 5.2 Workflow (calque renewal-watcher Anthropic, traduit FR)

1. Lire `~/.claude/plugins/config/.../CLAUDE.md` → canal alerte, work-product header, posture surveillance.
2. Charger le skill `surveillance-marque`. Exécuter `--report --days 1`.
3. **Escalation immédiate** : si une entrée 🔴 OPPOSITION URGENTE apparaît, poster ces items immédiatement quel que soit l'horaire prévu. L'opposition INPI a un délai de 2 mois post-publication BOPI (L.712-4) — chaque jour compte.
4. **Cross-référence avec le portefeuille** : si une publication récente menace une marque listée dans `portfolio.yaml` (V1.1.1+), surfacer le lien.
5. **Poster le rapport** au canal (Slack / email / inline selon profil).
6. Si rien à signaler dans la fenêtre, poster un message court "tout calme aujourd'hui" — un silence ressemble à un cron cassé.

### 5.3 Garde-fou (rappel chaque exécution)

L'agent répète le caveat à chaque post : "**Surveillance, pas opinion.** Avant toute opposition, le mandataire/avocat évalue le risque de confusion (CJUE Sabel/Canon/Lloyd) sur la base d'une recherche complète. La surveillance signale, l'avocat décide."

## 6. Le référentiel `watchlist.yaml`

### 6.1 Schema

```yaml
metadata:
  cabinet: "[from CLAUDE.md]"
  generated: "2026-05-16"
  last_audit: null
  source_system: "manual"  # ou nom IPMS si import

watches:
  - id: "WATCH-001"
    motCle: "APEXLEAF"                   # ou variantes via `motCleAlternatives`
    motCleAlternatives: ["APEX LEAF", "APEXLEAVE"]
    classes: ["25", "35"]                 # classes Nice surveillées
    titulaire: null                       # optionnel : surveiller un dépôt particulier d'un titulaire
    territoires: ["FR", "EM"]            # FR (INPI), EM (EUIPO), ou codes offices
    niveauAlerte: "haut"                  # haut / moyen / bas
    destinataires: ["#legal-marques"]    # canaux Slack ou emails
    business_owner: "marketing@acme.fr"
    notes: "Marque produit pluriannuelle, surveillance étroite"
    dateAjout: "2026-05-16"
    derniereExecution: null
    publicationsDetectees:                # historique des hits récents
      - dateDetection: "2026-05-15"
        publicationDate: "2026-05-09"
        numero: "FR4123456"
        signe: "APEXLEAVE"
        titulaire: "Concurrent SAS"
        decisionPrise: "opposition_preparee"

  - id: "WATCH-002"
    motCle: "ACME"
    classes: ["9", "42"]
    territoires: ["FR", "EM"]
    niveauAlerte: "moyen"
    destinataires: ["legal@acme.fr"]
    business_owner: "cto@acme.fr"
```

### 6.2 Garde-fous

- Validation Zod côté skill avant écriture (motCle ≥ 3 chars, classes Nice 1-45 valides, niveauAlerte enum, dates ISO).
- Refus d'ajout si motCle est trop générique (< 3 caractères ou mot du dictionnaire courant) — propose une variante plus précise.
- Backup automatique avant modification (`.bak` horodaté à côté).

## 7. Nouveau tool MCP `inpi_marques_publications_recentes`

### 7.1 Phase de discovery

À lancer en Phase 0 du plan d'implémentation : confirmer si l'API Data INPI expose un endpoint delta type `/services/marques/recents?since=YYYY-MM-DD&classes=` ou similaire. Hypothèses possibles :

- **Endpoint dédié** (idéal) : `GET /services/marques/publications?since=YYYY-MM-DD&classes=&limit=`
- **Endpoint fenêtre via search** (fallback) : `inpi_search_marques` avec `dateDepotMin` / `dateDepotMax` paramètres
- **Aucun endpoint delta** (pire cas) : on tombe sur du RSS BOPI + scraping HTML — différé V1.1.1

### 7.2 Schéma Zod (assumé)

```ts
inpi_marques_publications_recentes({
  since: z.string(),                       // ISO YYYY-MM-DD, max 30 jours en arrière
  classes: z.array(z.string()).optional(),
  motCle: z.string().optional(),           // recherche dans le signe
  titulaire: z.string().optional(),
  limite: z.number().min(1).max(200).default(50)
})
// → { publications: Array<{numero, signe, classes, titulaire, datePublication, dateOpposition_limite, urlSource}>,
//     total, dateMaxBase }
```

Le champ `dateOpposition_limite` est calculé côté tool : `datePublication + 2 mois` (L.712-4 CPI).

### 7.3 Robustesse

- Si la fenêtre demandée est > 30 jours, le tool refuse (limite Data INPI). Le skill chunk en plusieurs appels.
- Cache 6h (les publications ne changent pas dans la journée).
- Tag de provenance dans la sortie : `[INPI Data — publications récentes]`.

## 8. Adaptations FR vs renewal-watcher Anthropic

| Anthropic (renewal-watcher) | Hacienda (bopi-watcher) |
|---|---|
| Détecte renouvellements TM/patent qui arrivent | Détecte **dépôts concurrents** au BOPI dans la fenêtre |
| Cadence weekly Monday | **Cadence quotidienne** (BOPI vendredi mais agent passe tous les jours pour intégrer plus tard d'autres surveillances marketplace/web) |
| Trigger : grace/lapsed = action immédiate | Trigger : 🔴 délai opposition <30 j = action immédiate (L.712-4) |
| Source IPMS / USPTO | Source **Data INPI delta API** (à confirmer) + EUIPO TMview |
| Liens TSDR / Patent Center | Liens **fiche INPI** + **EUIPO eSearch** |
| Caveat US privilege | Caveat secret professionnel art. 66-5 + appréciation à mener par mandataire INPI / avocat |

## 9. Critères de succès V1.1.0

- [ ] Un utilisateur ayant exécuté V1.0 + ajouté 2-3 entrées watchlist via `/surveillance-marque --add` peut lancer `/surveillance-marque --report --days 7` et recevoir un rapport conforme au template, avec citations taggées `[INPI Data — publications récentes]`.
- [ ] L'agent `bopi-watcher` peut être invoqué manuellement et produit le post canal en mode dry-run (pas d'envoi Slack tant que canal config = "inline").
- [ ] La watchlist `watchlist.yaml` est valide Zod, créée/modifiée sans corruption (backup `.bak` automatique).
- [ ] Sans credentials INPI, le skill tombe sur le fallback "INPI not configured" et les 6 modes restent invocables (mode dégradé).
- [ ] Aucune régression V1.0 : `recherche-anteriorite-marque` reste fonctionnel, les 9 skills v0.1 conservent leur banner.
- [ ] `npm test` (incluant nouveaux tests Phase 1+2 ci-dessous), `npm run typecheck`, `npm run build`, `npm run branding:check` verts.

## 10. Risques et mitigations

| Risque | Impact | Mitigation |
|---|---|---|
| Endpoint INPI delta n'existe pas | Le tool ne marche pas en mode "delta", surveillance impossible | Discovery Phase 0 : si pas d'endpoint delta, fallback sur `inpi_search_marques` paramétré par dates ; si même ça échoue, V1.1.0 livre uniquement le SKILL.md + watchlist + agent en mode "annonce ce qu'on aurait fait" sans réelle exécution |
| Watchlist trop large = volume d'alertes ingérable | L'utilisateur ignore les alertes → perd le délai opposition 2 mois | Audit `--audit` flagge motsCle trop génériques ; cap par défaut 50 entrées ; rapport hiérarchisé par sévérité |
| Faux positifs sur motCle court | Confusion, perte de confiance | Refus d'ajout sous 3 chars + suggestion d'enrichissement |
| Agent pose à canal externe sans le vouloir | Fuite info confidentielle | Mode `dry-run` par défaut tant que `bopi-watcher.canal` non explicitement configuré dans le profil |
| Posture confusion entre surveillance et opposition | Utilisateur lance opposition sur la base du seul flag de surveillance | Garde-fou en tête + chaque ligne 🔴 conclut "à valider par mandataire/avocat avant action" |

## 11. Plan de rollout

**V1.1.0 (ce spec)** — surveillance + bopi-watcher + watchlist (1 sprint, 4-5 phases).
**V1.1.1** — `revue-portefeuille-marques` + premier dashboard HTML standardisé.
**V1.1.2** — `depot-marque-fr` + `analyse-opposition-marque` (depuis une 🔴 surveillance, on peut router vers `analyse-opposition-marque`).
**V1.2** — `contrefacon-web` (marketplaces, noms domaine, réseaux sociaux).

## 12. Annexes

### Annexe A — Articles CPI référencés

- **L.712-4** CPI : opposition INPI dans **2 mois** suivant la publication au BOPI
- **L.713-2 / L.713-3** : risque de confusion (rappel)
- **L.422-4** : mandataire en marques inscrit INPI (publication des oppositions)

### Annexe B — Inspirations

- `claude-for-legal/managed-agent-cookbooks/renewal-watcher/` (Anthropic) — patron agent + sub-agents YAML
- `claude-for-legal/ip-legal/skills/portfolio/SKILL.md` (Anthropic) — patron 6-modes + reviewer note pour data-heavy
- V1.0 spec et plan déjà livrés (commits `4b6d322` et `f133927`)

---

*Version 1.1.0 du design — brainstorming court (3 questions de cadrage validées) le 2026-05-16.*
*Prochaine étape : invocation `superpowers:writing-plans` pour le plan d'implémentation.*
