# Hacienda PI — V2.2 Extension internationale + Portefeuille brevets — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development.

**Goal:** Livrer `strategie-extension-internationale` + `revue-portefeuille-brevets` + 3 références dans le plugin `hacienda-propriete-intellectuelle` v0.8.0. Pure Markdown FR. `revue-portefeuille-brevets` **réutilise `renderDashboard` V1.1.1**.

**Architecture:** Extension de main (post V2.1). Pas de nouveau code TS. Skills calque `preparation-depot-brevet` V2.0 (arbre territoire) + `revue-portefeuille-marques` V1.1.1 (6 modes + dashboard).

**Tech Stack:** Markdown FR. Aucun TS nouveau.

**Spec:** [docs/superpowers/specs/2026-05-16-hacienda-pi-brevets-v2.2-extension-portefeuille-design.md](../specs/2026-05-16-hacienda-pi-brevets-v2.2-extension-portefeuille-design.md)

**Total prévu :** ~18 commits, 3 phases.

---

## Phase 1 — Skill `strategie-extension-internationale`

7 sous-tâches. Calque sur `preparation-depot-brevet` V2.0 (arbre territoire étendu).

### Task 1.1: Frontmatter + garde-fou + Examples + reformulation
Create `plugins/hacienda-propriete-intellectuelle/skills/strategie-extension-internationale/SKILL.md`. Frontmatter cf. spec §4.1. Garde-fou loud (fenêtre 12 mois Union de Paris ferme, traduction certifiée EP critique). 3 Examples. Reformulation longue "DÉCISION STRATÉGIQUE, PAS DÉMARCHE OFFICIELLE".
Commit: `feat(plugin-pi): strategie-extension-internationale — frontmatter + garde-fou`

### Task 1.2: Chargement profil + Intake (5 questions)
Section profil : juridictions inscrites, mandataire associé, posture extension (systématique/sélective/défensive), budget annuel R&D/PI, marchés stratégiques. Mode provisoire.
Intake 5 questions : numéro brevet FR initial (déclencher `inpi_brevet_details`), date dépôt + calcul fenêtre 12 mois sévérité 🔴/🟠/🟡, marchés cibles (UE / US / Asie / mondial / ciblage), budget extension (30-300k€ estimé), posture maintenance (systématique / abandon programmé).
Commit: `feat(plugin-pi): strategie-extension-internationale — chargement profil + intake`

### Task 1.3: Arbre décisionnel 3 voies (FR / EP / PCT)
Section détaillée 3 voies :
- **Voie A FR seul** : marché FR uniquement, coût ~500€ initial + ~7000€ 10 ans, recommandé pour budget serré
- **Voie B EP** : 38 pays CBE, coût ~2000€ initial + validations post-délivrance + traduction certifiée (sauf Accord Londres), recommandé ETI EU
- **Voie C PCT** : 156+ pays signataires, phase internationale 30 mois (gel coûts), recommandé multinationales
- Voies hybrides (FR+EP, FR+PCT, FR+EP+PCT)
Coûts détaillés 2026 par scénario.
Commit: `feat(plugin-pi): strategie-extension-internationale — arbre décisionnel FR/EP/PCT`

### Task 1.4: Tableau récap coûts + Recommandations par profil
Tableau coûts indicatifs 2026 par voie (5 lignes : FR seul, EP 5 val, EP 15 val, PCT 5 entrées, PCT 15 entrées).
Recommandations stratégiques par profil cabinet :
- Startup seed/série A → FR ou FR+EP minimal (FR/DE/GB)
- Startup série B+ → FR + PCT (gel flexibilité)
- ETI sectorielle → FR + EP 5-10 validations EU
- Multinationale CAC40 → FR + PCT large (15+ entrées)
- Cabinet conseil licensing → FR + EP minimal (signal marquage)
Référence : `references/couts-brevets-2026.md` + `references/arbre-decision-extension.md`.
Commit: `feat(plugin-pi): strategie-extension-internationale — coûts + recommandations par profil`

### Task 1.5: Format de sortie + checklist 10 points
Format Markdown inline (quadruple fence) :
- En-tête confidentialité, garde-fou, reviewer note (brevet initial, fenêtre 12 mois restante + sévérité, marchés visés, budget)
- Triage 🔴/🟠/🟡/🟢
- Brevet FR initial récap
- Arbre décisionnel 3 voies avec coûts par scénario
- Recommandation principale + justification
- Recommandations subsidiaires (Plan B)
- Checklist 10 points avant décision finale
- "Une question hors checklist"
- "Que veux-tu faire ?" (5 options : Itérer / Escalader / Compléter étude marché / Préparer dépôt EP/PCT / Autre)
Commit: `feat(plugin-pi): strategie-extension-internationale — format sortie + checklist`

### Task 1.6: Gate non-juriste + Emplacement + Ne fait pas + Ton
Gate non-juriste : brief mandataire EQE (brevet + recommandation + budget + 3 questions). Annuaires.
Emplacement : `~/.claude/plugins/config/.../outputs/extension-<brevet>-YYYY-MM-DD.md`.
"Ne fait pas" : déposer EP/PCT, payer taxes, traduire revendications, choisir pays validation post-délivrance, gérer annuités, évaluer valeur économique.
Ton : stratégique, factuel, équilibré coûts/valeur.
Commit: `feat(plugin-pi): strategie-extension-internationale — gate + ne fait pas + ton`

### Task 1.7: Références `couts-brevets-2026.md` + `arbre-decision-extension.md`

Create `plugins/hacienda-propriete-intellectuelle/skills/strategie-extension-internationale/references/couts-brevets-2026.md` (~100-130 lignes) :
- Table coûts FR INPI (dépôt + recherche + annuités progressive 2-20 ans)
- Table coûts EP OEB (dépôt + recherche + examen + annuités pré-délivrance + validations post-délivrance par pays)
- Table coûts PCT WIPO (taxe internationale + recherche internationale + phase nationale par pays)
- Accord de Londres (traduction allégée FR/DE/GB)
- Frais avocat/mandataire indicatifs
- Sources officielles : INPI Tarifs, OEB Schedule of Fees, WIPO PCT Fee Tables (URLs)

Create `plugins/hacienda-propriete-intellectuelle/skills/strategie-extension-internationale/references/arbre-decision-extension.md` (~80-120 lignes) :
- Arbre interactif par scénarios :
  - "J'ai un brevet FR + marché EU seulement" → Voie B EP avec validations stratégiques
  - "J'ai un brevet FR + marché mondial" → Voie C PCT
  - "Je ne sais pas mes marchés futurs" → Voie C PCT (gel 30 mois)
- Décision selon date priorité restante (< 60j = urgence escalation immédiate)
- Décision selon budget disponible
- Décision selon stade entreprise (startup vs ETI vs multinationale)
- Erreurs courantes : EP sans PCT pour marché mondial (perte fenêtre), PCT sans entrée nationale (déchéance), validation trop large (coût annuités explose)

Commit: `docs(plugin-pi): références coûts brevets 2026 + arbre décision extension`

---

## Phase 2 — Skill `revue-portefeuille-brevets`

7 sous-tâches. Calque sur `revue-portefeuille-marques` V1.1.1 adapté brevets.

### Task 2.1: Frontmatter + garde-fou + Examples + reformulation
Create `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-brevets/SKILL.md`. Frontmatter cf. spec §5.1. Garde-fou loud (registre ≠ paiement annuités ; mandataire + CPA Global font la démarche ; perte annuité = perte droit). 3 Examples. Reformulation longue.
Commit: `feat(plugin-pi): revue-portefeuille-brevets — frontmatter + garde-fou`

### Task 2.2: Chargement profil + portfolio-brevets.yaml + Intake commun
Section profil : rôle, posture maintenance (systématique vs sélective), mandataires, partenaire annuités (CPA Global / Dennemeyer / Patrix / interne), approbateurs.
Lecture `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/portfolio-brevets.yaml` (créer si absent : `assets: []`).
Mode provisoire si `[A CONFIGURER]`.
Commit: `feat(plugin-pi): revue-portefeuille-brevets — chargement profil + portfolio`

### Task 2.3: Mode `--report` + génération dashboard HTML (réutilisation V1.1.1)
Section longue. Pour chaque asset :
- Calculer prochaine annuité (échéance + montant estimé)
- Bucketize sévérité par jours restants : 🔴 < 30j / 🟠 30-90j / 🟡 90j-6 mois / 🟢 > 6 mois
- Cross-référence avec `portfolio.yaml` marques V1.1.1 via `marques_associees`
Format Markdown : reviewer note + 4 buckets sévérité + ❓ assets à vérifier + recommandations bucketées.

**Génération dashboard HTML** si `--dashboard` ou >10 assets — **RÉUTILISE `renderDashboard` V1.1.1** :
```ts
import { renderDashboard, type DashboardData } from "@hacienda/core";

const data: DashboardData = {
  title: `Portefeuille brevets — ${cabinet}`,
  generatedAt: new Date().toISOString().slice(0, 10),
  summary: [
    { label: "Total", value: assets.length, emoji: "📊" },
    { label: "🔴 Annuité <30j", value: countRed },
    { label: "🟠 30-90j", value: countOrange },
    { label: "🟡 90j-6mois", value: countYellow },
    { label: "Expirations 12 mois", value: countExpiring },
  ],
  columns: [
    { key: "id", label: "ID" },
    { key: "numero", label: "Numéro" },
    { key: "type", label: "Type" },
    { key: "titre", label: "Titre" },
    { key: "cib", label: "CIB" },
    { key: "statut", label: "Statut" },
    { key: "expiration", label: "Expiration" },
    { key: "prochaine_annuite", label: "Prochaine annuité" },
    { key: "severite", label: "Sévérité" },
    { key: "owner", label: "Owner" },
    { key: "mandataire", label: "Mandataire" },
    { key: "famille", label: "Famille" },
    { key: "niveau", label: "Niveau" },
  ],
  rows: assets.map(a => ({...})),
  severityLegend: { "🔴": "Annuité <30j", "🟠": "30-90j", "🟡": "90j-6mois", "🟢": "> 6 mois" },
  reviewerNote: "...",
};

const html = renderDashboard(data);
await fs.writeFile(`<output_dir>/portefeuille-brevets-${date}.html`, html);
```
À la fin de Markdown : `Dashboard généré : [chemin]`.
Commit: `feat(plugin-pi): revue-portefeuille-brevets — mode --report + dashboard HTML (réutilise V1.1.1)`

### Task 2.4: Modes `--add` / `--update` / `--remove` / `--list` / `--audit`
5 modes (calque V1.1.1 marques adapté brevets).
`--add` interactive : numéro (FR/EP/PCT/national/CCP), type, titre, classifications CIB, statut, dates (dépôt + délivrance + expiration calcul auto 20 ans), priorité, prochaine_annuite (année + échéance + montant estimé), famille_brevets (IDs des FR/EP/PCT liés), déposant, inventeurs, mandataire, business_owner, niveau_strategique (core/important/standard/heritage), marques_associees (IDs marques V1.1.1), notes. Validation Zod + backup `.bak`.
`--update` par ID.
`--remove` avec confirmation explicite si `niveau_strategique = "core"` (raison).
`--list` table Markdown : ID | numéro | type | titre | statut | expiration | annuité prochaine | niveau | owner.
`--audit` :
- Annuités à payer dans 3 mois sans plan déclaré
- Brevets en grace period (annuités passées non payées, période de rattrapage active)
- Brevets `expire` non marqués comme tels
- Brevets `pending` (en examen) > 5 ans à investiguer (retards anormaux)
- Brevets `core` sans plan continuation (ex : pas de divisionnaire alors que famille importante)
- Familles incomplètes (FR sans EP correspondant alors que marché EU)
- Marques sans brevet associé (vs portfolio.yaml V1.1.1 — produit phare sans protection brevet ?)
Commit: `feat(plugin-pi): revue-portefeuille-brevets — modes --add/--update/--remove/--list/--audit`

### Task 2.5: Emplacement + Ne fait pas + Ton
Emplacement : `~/.claude/plugins/config/.../outputs/portefeuille-brevets-YYYY-MM-DD.md` + `.html` si dashboard.
"Ne fait pas" : payer annuités (= mandataire + CPA Global/Dennemeyer), renouveler validations EP nationales (= mandataire local par pays), déposer nouveaux brevets (= `preparation-depot-brevet`), évaluer valeur économique (= consultant), gérer CCP pharma (V2.3), garantir sync vs registre officiel INPI/OEB (vérification manuelle requise avant action).
Ton : précis, factuel, orienté action mandataire/CPA Global. L'avocat lit le rapport en 30 sec et repère les 🔴.
Commit: `feat(plugin-pi): revue-portefeuille-brevets — emplacement + ne fait pas + ton`

### Task 2.6: Référence `modele-portfolio-brevets.md`

Create `plugins/hacienda-propriete-intellectuelle/skills/revue-portefeuille-brevets/references/modele-portfolio-brevets.md` (~100-130 lignes) :
- Schéma `portfolio-brevets.yaml` complet commenté (verbatim spec §5.7 + commentaires inline)
- 3 exemples d'entrées : un brevet FR seul, un brevet FR + EP famille, un brevet PCT + entrées nationales
- Bonnes pratiques :
  - Toujours renseigner `business_owner` (pas d'alertes orphelines)
  - `niveau_strategique` : core = jamais laisser tomber, important = renouveler systématiquement, standard = case par case selon usage commercial, heritage = peut être abandonné après évaluation
  - Cross-référencer avec `portfolio.yaml` marques V1.1.1 via `marques_associees` (cohérence stratégie brevet + marque pour un produit)
  - Modéliser les **familles brevets** complètes (FR + EP + validations nationales + PCT) — incohérence famille = risque perte droit régional
  - Sync trimestriel avec base INPI/OEB publique pour vérification annuités payées vs registre officiel
  - Ne JAMAIS écrire credentials API dans le portfolio.yaml (variables d'env uniquement)
- Lien vers `strategie-extension-internationale` pour planifier nouvelles familles brevets
- Lien vers `analyse-refus-inpi` pour traiter notifications INPI/OEB en cours
- Recommandation IPMS commercial si > 50 brevets : Anaqua, Dennemeyer, Questel, Patrix, Clarivate IPfolio

Commit: `docs(plugin-pi): modèle portfolio-brevets.yaml + bonnes pratiques`

---

## Phase 3 — Patches plugin + bump + PR + merge

### Task 3.1: Patch CLAUDE.md — section Brevets enrichie (extension + portefeuille)
Ajouter dans la section "## Brevets" existante :
```markdown
**Stratégie extension internationale :** [A CONFIGURER — FR seul / FR + EP (5 validations EU) / FR + EP (large 15+ validations) / FR + PCT (gel 30 mois)]
**Cadence revue portefeuille brevets :** [A CONFIGURER — mensuelle / trimestrielle / annuelle]
**Partenaire annuités :** [A CONFIGURER — CPA Global / Dennemeyer / Patrix / Anaqua / interne]
**Format de rapport portefeuille préféré :** [A CONFIGURER — Markdown seul / Markdown + dashboard HTML (recommandé > 10 brevets)]
**Volume portefeuille estimé :** [A CONFIGURER — < 20 / 20-100 / > 100 = envisager IPMS commercial (Anaqua, Dennemeyer, Questel, Clarivate IPfolio)]
**Cap recommandé sans IPMS :** ~50 brevets (au-delà, risque erreur humaine annuités)
```
`npm run branding:check`.
Commit: `feat(plugin-pi): CLAUDE.md template — section Brevets enrichie (extension + portefeuille)`

### Task 3.2: Patch `references/ressources-pi-fr.md` — section Annuités brevets et services tiers
Ajouter section "## Annuités brevets et services tiers" :
- Partenaires annuités spécialisés : CPA Global (https://cpaglobal.com), Dennemeyer (https://www.dennemeyer.com), Patrix (https://www.patrix.com), Anaqua (https://anaqua.com), Clarivate IPfolio
- Services typiques : paiement automatisé annuités, calendrier multi-pays, alertes préventives, reporting
- Coût indicatif service annuités tiers : ~10-30€ frais par annuité + commission mandataire local
- Pour cabinet < 50 brevets : peut gérer manuellement avec calendrier mandataire EQE
- Pour cabinet > 100 brevets : IPMS commercial recommandé (Anaqua, Clarivate IPfolio, Patrix)
Commit: `docs(plugin-pi): ressources — section Annuités brevets et services tiers`

### Task 3.3: Bump version 0.7.0 → 0.8.0
- `plugin.json` : version 0.8.0, description étendue (extension internationale + portefeuille brevets + dashboard HTML), keywords +extension +portefeuille-brevets +PCT
- `mcp-server/package.json` : 0.8.0
- Rebuild MCP : `npm run build --workspace plugins/hacienda-propriete-intellectuelle/mcp-server`
Commit: `chore(plugin-pi): bump 0.7.0 → 0.8.0 (V2.2 extension + portefeuille brevets)`

### Task 3.4: CHANGELOG + README v0.8.0
CHANGELOG section 0.8.0 au top :
```markdown
## 0.8.0 — 2026-05-16

### Ajouts — Extension internationale + Portefeuille brevets (clôt bloc brevets)
- Skill `strategie-extension-internationale` (arbre décisionnel FR/EP/PCT, coûts indicatifs 2026, recommandations par profil cabinet, ~500 lignes)
- Skill `revue-portefeuille-brevets` (6 modes CRUD + audit, dashboard HTML réutilisation V0.5, gestion familles brevets, cross-ref portfolio marques, ~550 lignes)
- Référentiel `portfolio-brevets.yaml` user-stable (familles + annuités + CCP)
- Références : `couts-brevets-2026`, `arbre-decision-extension`, `modele-portfolio-brevets`
- Section CLAUDE.md "Brevets" enrichie (extension + portefeuille)
- Section ressources "Annuités brevets et services tiers"

### Bloc brevets complet (V2.0 + V2.1 + V2.2)
- Recherche antériorité → Préparation dépôt FR → Extension internationale FR/EP/PCT → Réponse refus → Claim chart contrefaçon → Nullité (attaque/défense) → Portefeuille avec dashboard = **boucle fermée**

### Réutilisation cross-version
- `revue-portefeuille-brevets` (V2.2) consomme `renderDashboard` (V1.1.1) sans modification — démonstration du standard dashboard HTML

### À venir (V2.3 / V1.2)
- V2.3 : CCP (Certificats Complémentaires Protection pharma)
- V1.2 : agent `contrefacon-web` (monitoring marketplaces / réseaux sociaux)
- V3.0 : bloc dessins/modèles
- V4.0 : bloc droit d'auteur
```
README "Quoi de neuf en V0.8" au top.
Commit: `docs(plugin-pi): CHANGELOG + README v0.8.0`

### Task 3.5: Vérifications + Push + PR + Merge
- `npm test` (269)
- `npm run typecheck`, `npm run build`, `npm run branding:check`, `git diff --check`
- `git push -u origin claude/pi-brevets-v2.2-extension-portefeuille`
- `gh pr create --base main --title "PI brevets V2.2 : extension internationale + portefeuille (clôt bloc brevets)" --body "..."` body adapté
- `gh pr merge <num> --merge --delete-branch=false`
Report PR URL + merge status + total commits V2.2.

---

## Self-review

- [x] Spec §4 → Phase 1 (7 tasks)
- [x] Spec §5 → Phase 2 (6 tasks)
- [x] Spec §3 + §6 → Phase 3 (5 tasks)
- [x] Pas de placeholder
- [x] Pas de TS modifié (réutilisation renderDashboard V1.1.1 inchangé)
- [x] Type consistency : `DashboardData` schema V1.1.1 réutilisé tel quel

---

**Plan complet.** Subagent-driven en 3 dispatches : Phase 1 / Phase 2 / Phase 3.
