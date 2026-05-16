# Hacienda PI — Bloc Brevets V2.2 Extension internationale + Portefeuille — Design

**Date** : 2026-05-16
**Plugin** : `hacienda-propriete-intellectuelle` v0.8.0 (extension de v0.7.0)
**Base** : main (V1.0 + V1.1.0 + V1.1.1 + V1.1.2 + V2.0 + V2.1 mergés)

---

## 1. Objectifs

Compléter le bloc brevets avec les 2 skills stratégiques restants :

1. **`strategie-extension-internationale`** — arbre décisionnel d'extension d'un dépôt brevet : FR national seul / EP via OEB (CBE) / PCT international (WIPO). Calcule coûts indicatifs, délais, fenêtres de priorité (Convention Union de Paris, 12 mois pour brevets), recommandations par marché cible et secteur. Sert principalement à 6-12 mois post-dépôt FR initial.

2. **`revue-portefeuille-brevets`** — gestion CRUD d'un registre de brevets détenus (`portfolio-brevets.yaml`), audit santé, rapport annuités, identification gaps (brevets non maintenus, annuités à venir, expirations programmées). **Réutilise le dashboard HTML standardisé** livré en V1.1.1 — premier client externe du module `@hacienda/core/dashboard/` côté brevets.

Bump plugin v0.7.0 → v0.8.0.

Le bloc brevets est ensuite complet (recherche → dépôt → réponse refus → claim chart → nullité → **extension → portefeuille**).

## 2. Non-objectifs

- Pas de calcul automatique précis des taxes (taux changent — mandataire vérifie)
- Pas de paiement direct des annuités (Anaqua / CPA Global / cabinet annuités tiers)
- Pas de calcul de la valeur économique du brevet (différé — évaluation domain expert)
- Pas de connecteur Google Patents (différé V2.1.1 séparée)
- Pas de connecteur WIPO PatentScope (différé V3.0+)
- Pas de gestion CCP (Certificats Complémentaires Protection — différé V2.3 pharma)
- Pas d'agent automatique annuités (différé `agent-annuites-brevets` V3.0+)

## 3. Architecture

### 3.1 Plugin étendu

```
plugins/hacienda-propriete-intellectuelle/                v0.8.0
├── .claude-plugin/plugin.json                            [BUMP] 0.8.0
├── CLAUDE.md                                             [PATCH] section "Brevets" : extension + portefeuille
├── CHANGELOG.md                                          [PATCH] 0.8.0
├── README.md                                             [PATCH] V0.8
│
├── skills/
│   ├── strategie-extension-internationale/               [NEW]
│   │   ├── SKILL.md                                       (~450-600 lignes style Anthropic FR)
│   │   └── references/
│   │       ├── couts-brevets-2026.md                     (table coûts FR/EP/PCT + désignations)
│   │       └── arbre-decision-extension.md               (arbre interactif par scénarios)
│   ├── revue-portefeuille-brevets/                       [NEW]
│   │   ├── SKILL.md                                       (~500-650 lignes, calque revue-portefeuille-marques V1.1.1)
│   │   └── references/
│   │       └── modele-portfolio-brevets.md               (schema portfolio-brevets.yaml + bonnes pratiques)
│   └── (autres skills intact)
│
└── references/
    └── ressources-pi-fr.md                               [PATCH] section "Annuités brevets et services tiers"
```

Pas de nouveau tool MCP, pas d'extension `@hacienda/core` côté sources. **Réutilise `renderDashboard` V1.1.1** pour `revue-portefeuille-brevets`.

### 3.2 Configuration utilisateur

```
~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/
├── portfolio.yaml                                        [existant V1.1.1 — marques]
├── portfolio-brevets.yaml                                [NEW] référentiel portefeuille brevets
├── watchlist.yaml                                        [existant V1.1.0]
└── outputs/
    ├── extension-<brevet>-YYYY-MM-DD.md                  [NEW format]
    └── portefeuille-brevets-YYYY-MM-DD.md / .html        [NEW format + dashboard]
```

## 4. Le skill `strategie-extension-internationale`

### 4.1 Frontmatter

```yaml
---
name: strategie-extension-internationale
description: >
  Arbre décisionnel d'extension internationale d'un dépôt brevet : FR national /
  EP via OEB (CBE) / PCT international (WIPO). Calcule coûts indicatifs (2026),
  délais, fenêtre de priorité (Convention Union de Paris, 12 mois brevets),
  recommandations par marché cible et secteur. Conçu pour décision à 6-12 mois
  post-dépôt FR initial. NE dépose PAS — décision et démarche EP/PCT restent au
  mandataire en brevets (EQE) ou avocat spécialisé.
argument-hint: "[num brevet FR initial | marchés cibles | budget budget annuel]"
---
```

### 4.2 Sections (~500 lignes, style Anthropic FR)

1. **Garde-fou loud** :
   > **Décision stratégique ≠ démarche officielle.** Ce skill aide à la **décision d'extension** d'un brevet à l'étranger (EP, PCT, voies nationales). Il NE dépose PAS les demandes EP ou PCT, NE paye PAS les taxes, NE traduit PAS les revendications (étape critique EP — traduction certifiée requise pour validation pays). La fenêtre de **12 mois post-dépôt initial** (Convention Union de Paris) est **ferme** — manquer cette fenêtre = perte de la revendication de priorité = chaque pays redevient potentiellement antériorité.

2. **Chargement profil** : juridictions inscrites, mandataire associé, posture extension (systématique / sélective / défensive), budget annuel R&D/PI, marchés stratégiques cabinet (FR/EU/US/Asie...).

3. **Intake batch unique** 5 questions :
   - **Numéro brevet FR initial** (déclencher `inpi_brevet_details` pour récupérer date dépôt + date priorité + statut)
   - **Date dépôt FR** (calcul automatique fenêtre 12 mois Union de Paris — sévérité 🔴 <60j / 🟠 60-180j / 🟡 >180j restants avant expiration priorité)
   - **Marchés cibles** : pays ou zones (UE seul / UE + US / UE + Asie / mondial / ciblage spécifique)
   - **Budget extension** : budget total dépôts + 10 ans annuités (estimation 30-300k€ selon scope)
   - **Posture maintenance** : annuités systématiques (défense long terme) / abandon programmé si non-commercialisation à 5 ans (économie)

4. **Arbre décisionnel — 3 voies principales** :

   **Voie A — FR national seul (rester en FR)** :
   - Marché : FR uniquement
   - Coût dépôt initial : ~38€ + ~520€ recherche
   - Annuités 10 ans : ~620€ cumulés
   - Annuités 20 ans : ~7 500€ cumulés (annuités progressives)
   - Avantages : économique, simple, examen court (18-36 mois)
   - Inconvénients : pas de protection EU/US, concurrents libres à l'étranger
   - **Recommandé si** : invention purement nationale, budget serré, marché FR exclusif

   **Voie B — Extension EP (Brevet européen via OEB)** :
   - Marché : 38 pays CBE (UE 27 + Royaume-Uni + Suisse + Norvège + Turquie + autres)
   - Délai d'extension : **12 mois** post-FR (Convention Union de Paris)
   - Coût dépôt EP : ~120€ + ~1300€ examen + ~600€ recherche = ~2000€
   - Coût annuités EP pré-délivrance : ~510€/an dès 3e année
   - **Validation post-délivrance** : choix des pays à valider — **traduction des revendications obligatoire** dans la langue du pays (sauf accord de Londres pour FR/DE/GB qui acceptent EN/DE/FR)
   - Coût validation par pays : ~600-1500€ selon pays
   - Annuités nationales post-validation : variable par pays (~150-600€/an chacun)
   - **Recommandé si** : marché EU significatif, ETI ou multinationale, budget moyen-grand

   **Voie C — PCT international (WIPO)** :
   - Marché : 156+ pays signataires PCT (mondial sauf quelques exceptions)
   - Délai d'extension : 12 mois post-FR (Convention Union de Paris)
   - Coût dépôt PCT : ~1330€ taxe internationale + ~140€ taxe transmission
   - **Phase internationale 30 mois** : recherche internationale (ISA) + opinion préliminaire d'examen + publication WIPO
   - Avantage : **gel des coûts 30 mois** — temps pour étudier marchés et décider pays à entrer
   - Phase nationale (à 30 mois post-priorité) : entrée dans chaque pays choisi (taxes nationales par pays)
   - Coût phase nationale par pays : ~1500-4000€ selon pays (taxes + mandataire local + traduction)
   - **Recommandé si** : marché mondial visé, ETI ou multinationale, besoin de flexibilité temporelle, budget grand

   **Voies hybrides** :
   - FR + EP direct (sans PCT) : marché EU exclusif
   - FR + PCT (sans EP direct) : permet de décider EP en phase nationale via WIPO
   - FR + EP + PCT (rare) : ETI très internationale, gel maximum

5. **Tableau récap coûts indicatifs 2026** (référence : `references/couts-brevets-2026.md`) :

   | Voie | Coût initial 12 mois | Coût total 10 ans estimé | Marchés couverts |
   |---|---|---|---|
   | FR seul | ~500€ | ~7 000€ | 1 pays |
   | FR + EP (5 validations type EU) | ~10 000€ | ~50 000€ | 5 pays EU |
   | FR + EP (validation large 15 pays) | ~20 000€ | ~150 000€ | 15 pays EU |
   | FR + PCT (5 entrées nationales) | ~15 000€ | ~80 000€ | 5 pays variables |
   | FR + PCT (15 entrées nationales globales) | ~50 000€ | ~250 000€+ | 15 pays mondial |

6. **Recommandations stratégiques par profil** :
   - Startup FR seed/série A → FR seul ou FR + EP minimal (FR/DE/GB)
   - Startup FR série B+ → FR + PCT (gel flexibilité 30 mois)
   - ETI sectorielle FR → FR + EP (5-10 validations EU stratégiques)
   - Multinationale (CAC40) → FR + PCT large (~15+ entrées nationales)
   - Cabinet conseil pour invention de tiers (mode licensing) → FR + EP minimal (signal de marquage du marché)

7. **Format de sortie** (template Markdown inline quadruple fence) :
   - En-tête confidentialité
   - Garde-fou reformulé
   - Note du relecteur (brevet initial, date priorité + jours restants 12 mois, marchés visés, budget)
   - Triage 🔴 URGENT (<60j priorité) / 🟠 (60-180j) / 🟡 (>180j) / 🟢 (déjà étendu)
   - Section "Brevet FR initial" récap
   - Section "Arbre décisionnel" — 3 voies avec coûts par scénario
   - Section "Recommandation principale" + justification
   - Section "Recommandations subsidiaires" (alternatives + Plan B)
   - Section "Checklist avant décision finale" (10 points : antériorité internationale vérifiée, budget validé Direction, marchés confirmés business, mandataire EP/PCT engagé, traduction préparée si EP, ...)
   - "Une question hors de ma checklist"
   - "Que veux-tu faire ?" (Itérer / Escalader / Compléter étude marché / Préparer dépôt EP/PCT / Autre)

8. **Gate non-juriste** : brief mandataire EQE (brevet initial + recommandation + budget + 3 questions stratégiques).

9. **Emplacement** : `~/.claude/plugins/config/.../outputs/extension-<brevet>-YYYY-MM-DD.md`.

10. **Ce que ce skill NE fait PAS** : déposer EP/PCT (= mandataire EQE), payer taxes, traduire revendications (traduction certifiée = service spécialisé), choisir précisément les pays de validation EP post-délivrance, gérer annuités (Anaqua/CPA Global), évaluer la valeur économique brevet (consultant valuation).

11. **Ton** : stratégique, factuel, équilibré (présenter coûts ET valeur).

## 5. Le skill `revue-portefeuille-brevets`

### 5.1 Frontmatter

```yaml
---
name: revue-portefeuille-brevets
description: >
  Gère le registre du portefeuille de brevets détenus (CRUD + audit). Modes :
  --report (rapport + dashboard HTML), --add, --update, --remove, --list, --audit.
  Réutilise le dashboard HTML standardisé V0.5. NE renouvelle PAS — décision et
  paiement annuités INPI/OEB/national restent au mandataire en brevets (EQE) ou
  partenaire annuités (Anaqua/CPA Global).
argument-hint: "[--report [--dashboard] | --add | --update | --remove | --list | --audit]"
---
```

### 5.2 Sections (~500 lignes, calque `revue-portefeuille-marques` V1.1.1 adapté brevets)

1. **Garde-fou** : registre ≠ paiement annuités ; mandataire/CPA Global fait la démarche.

2. **Lecture profil** : rôle, posture maintenance, mandataires associés, partenaire annuités (CPA Global / Dennemeyer / interne), approbateurs.

3. **6 modes** (identique pattern V1.1.1 marques) :
   - `--report [--dashboard]` (défaut) : rapport horodaté en buckets par échéance annuité la plus proche. Génère **dashboard HTML** via `renderDashboard()` si `--dashboard` ou si >10 brevets.
   - `--add` : interactif (numéro FR/EP/PCT/national, titre, date dépôt + délivrance + expiration, déposant, mandataire, business_owner, niveau_strategique, statut)
   - `--update` : modifier par ID
   - `--remove` : supprimer (confirmation si `niveau_strategique = "core"`)
   - `--list` : table Markdown
   - `--audit` : santé (annuités à payer dans 3 mois, brevets en grace period, brevets expirés non marqués comme tels, brevets `pending` > 5 ans à investiguer, brevets `core` sans plan continuation)

4. **Buckets sévérité par échéance annuité** :
   - 🔴 Annuité due < 30 jours (urgence — risque perte droit si non-paiement)
   - 🟠 Annuité due 30-90 jours
   - 🟡 Annuité due 90 jours - 6 mois
   - 🟢 Annuité due > 6 mois (stable)

5. **Cross-référence avec `portfolio.yaml` marques V1.1.1** : marques de produit liées au brevet (si déclarées via `marques_associees`), surfacer le lien pour cohérence stratégie défensive.

6. **Format de sortie** Markdown + **dashboard HTML** (réutilise `renderDashboard` V1.1.1) :
   - Markdown : reviewer note, buckets, recommandations bucketées
   - Dashboard HTML : table sortable, filtres, severity badges, summary stats (Total / 🔴 / 🟠 / 🟡 / 🟢, Expirations 12 mois, Sans business owner)

7. **Schema `portfolio-brevets.yaml`** :

```yaml
metadata:
  cabinet: "[depuis CLAUDE.md]"
  generated: "2026-05-16"
  last_audit: null
  source_system: "manual"                          # ou Anaqua / CPA Global / IPMS

assets:
  - id: "BR-FR-001"
    type: "FR"                                     # FR / EP / PCT / national_post_EP / CCP
    numero: "FR2700123"
    titre: "Procédé filtration eau utilisant graphène"
    classificationCIB: ["B01D 71/02", "B01D 67/00"]
    statut: "delivre"                              # demande / publiee / delivre / opposition / decheance / expire
    dateDepot: "2018-02-01"
    dateDelivrance: "2021-03-15"
    dateExpiration: "2038-02-01"                   # 20 ans post-dépôt
    datePriorite: null                             # si revendiquée
    prochaine_annuite:
      annee: 8
      dateEcheance: "2026-02-01"
      montantEstime: "200€"
    famille_brevets:                               # liens vers EP, PCT, validations nationales
      - id: "BR-EP-001"
      - id: "BR-WO-001"
    deposant: "ACME SAS"
    inventeurs: ["Marie Dupont", "Jean Martin"]
    mandataire: "Cabinet X"
    business_owner: "rd@acme.fr"
    niveau_strategique: "core"                     # core / important / standard / heritage
    marques_associees: ["TM-FR-001"]               # link portfolio.yaml V1.1.1
    notes: "Brevet phare, base de la gamme produit Aqua-G."
    dateAjout: "2026-05-16"
    dernier_audit: null
```

8. **Emplacement** : `~/.claude/plugins/config/.../outputs/portefeuille-brevets-YYYY-MM-DD.md` + `.html` si dashboard.

9. **Ce que ce skill NE fait PAS** : payer annuités (= mandataire + CPA Global / Dennemeyer), renouveler validations nationales EP (= mandataire local par pays), déposer nouveaux brevets (= `preparation-depot-brevet`), évaluer valeur économique (= consultant valuation), gérer CCP pharma (V2.3 future).

## 6. Adaptations brevets vs portefeuille marques V1.1.1

| Marques V1.1.1 (référence) | Brevets V2.2 (adapté) |
|---|---|
| Renouvellement décennal (10 ans) | **Annuités annuelles** (chaque année après 2e/3e année selon office) |
| `dateRenouvellement` 10 ans | `prochaine_annuite` avec année + montant + échéance |
| Pas de famille (sauf Madrid désignations) | **Famille brevets** : FR + EP + validations nationales + PCT (liens internes) |
| Classes Nice (1-45) | **Classification CIB** (sections A-H, sous-classes) |
| Pas de date d'expiration absolue | **Date expiration = dépôt + 20 ans** (CPI L.611-2) |
| Pas d'inventeur (marque = signe) | **Inventeurs** (CPI L.611-7 régime salariés) |
| Mandataire en marques L.422-4 | Mandataire en brevets EQE |
| Renouvellement = paiement INPI | **Annuités = mandataire + partenaire annuités** (CPA Global / Dennemeyer / Patrix) — service très spécialisé |

## 7. Critères de succès V2.2

- [ ] `npm test` vert (≥ 269 — Markdown only)
- [ ] `npm run typecheck`, `npm run build`, `npm run branding:check` verts
- [ ] `/strategie-extension-internationale FR2700123` produit arbre décisionnel 3 voies + recommandation par profil + checklist 10 points
- [ ] `/revue-portefeuille-brevets --add` crée entrée valide avec backup `.bak`
- [ ] `/revue-portefeuille-brevets --report --dashboard` produit Markdown + fichier HTML lisible (réutilisation `renderDashboard` V1.1.1)
- [ ] Le dashboard HTML brevets a les mêmes fonctionnalités que celui marques (tri, filtre, sévérité couleur)
- [ ] Pas de régression
- [ ] Bump v0.7.0 → v0.8.0

## 8. Risques

| Risque | Mitigation |
|---|---|
| Fenêtre 12 mois Union de Paris ratée (extension) | Section délai explicite + sévérité 🔴 si <60j + escalation immédiate dans la sortie |
| Annuité ratée (perte droit) | Buckets sévérité 🔴 si <30j + cross-ref avec calendrier mandataire CPA Global |
| Dashboard HTML brevets différent du dashboard marques (incohérence visuelle) | **Réutilisation stricte de `renderDashboard` V1.1.1** sans modification — cohérence garantie |
| Famille brevets mal modélisée (FR + EP + PCT liés) | Schema `portfolio-brevets.yaml` explicite avec champ `famille_brevets` array d'IDs |
| Confusion avec `portfolio.yaml` marques V1.1.1 | Fichier séparé `portfolio-brevets.yaml` + frontmatter explicit "brevets" + cross-ref via `marques_associees` |

## 9. Plan de rollout

- **V2.2 (ce spec)** — extension internationale + portefeuille brevets (clôt le bloc brevets)
- **V2.3** — CCP (Certificats Complémentaires Protection pour pharma)
- **V3.0** — bloc Dessins/Modèles (3 skills)
- **V4.0** — bloc Droit d'auteur (6 skills)
- **V5.0** — Contrats PI + audit-pi-ma M&A
- **V6.0** — Contentieux & Enforcement (saisie-contrefaçon, action TJ Paris approfondie)
- **V1.2 / V2.1.1** — agents et connecteurs complémentaires (contrefacon-web, Google Patents, OMPI Madrid Monitor)

## 10. Annexes

### A — Articles CPI / CBE référencés

- **L.611-2** CPI : durée 20 ans brevet
- **L.612-3** CPI : revendication de priorité
- **Art. 87 CBE** : droit de priorité
- **Convention Union de Paris** (1883) : priorité 12 mois brevets
- **Accord de Londres** (2001) : régime traduction allégé EP pour FR/DE/GB
- **Traité PCT** (1970, OMPI) : phase internationale 30 mois

### B — Inspirations

- `revue-portefeuille-marques/SKILL.md` V1.1.1 (calque 6 modes + dashboard HTML)
- `preparation-depot-brevet/SKILL.md` V2.0 (arbre territoire FR/EP/PCT — version court complétée ici)
- `renderDashboard` V1.1.1 (réutilisation directe)
- Doc origine `plan-propriete-intellectuelle-fr.md` §4.4 (`strategie-extension-internationale`)

---

*Version 2.2 — mode autonome.*
