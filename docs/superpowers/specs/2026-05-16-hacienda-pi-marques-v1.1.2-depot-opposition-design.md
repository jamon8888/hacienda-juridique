# Hacienda PI — Bloc Marques V1.1.2 Dépôt + Opposition — Design

**Date** : 2026-05-16
**Plugin** : `hacienda-propriete-intellectuelle` v0.6.0 (extension de v0.5.0)
**Base** : main (V1.0 + V1.1.0 + V2.0 + V1.1.1 mergés)

---

## 1. Objectifs

Compléter le workflow marques de bout en bout en livrant les deux skills qui ferment le cycle :

1. **`depot-marque-fr`** — préparation du dossier de dépôt INPI (FR national) ou EUIPO (EUTM) ou OMPI Madrid (international), conforme CPI L.711-1 et règlement EUTMR. Structure la demande : signe, classes Nice, libellés des produits/services (rédaction selon directives examen), territoires, déposant, mandataire. **Ne dépose PAS** — préparation à transmettre au mandataire/avocat pour validation et dépôt officiel.

2. **`analyse-opposition-marque`** — analyse d'une opposition INPI reçue OU à former, dans le délai de 2 mois post-publication BOPI (CPI L.712-4). Décompose les motifs invoqués (risque de confusion L.713-2, marque antérieure renommée L.713-3, AOP/IGP, etc.), évalue chaque branche d'argumentation, produit un projet de réponse INPI structuré. Travaille en aval direct de `surveillance-marque` V1.1.0 + `bopi-watcher` (qui détectent les marques à opposer) et `recherche-anteriorite-marque` V1.0 (qui établit les antériorités opposables).

Bump plugin v0.5.0 → v0.6.0.

## 2. Non-objectifs

- Pas de dépôt automatique (formulaires INPI/EUIPO restent une démarche mandataire/avocat)
- Pas de calcul automatique des taxes (taux changent, mandataire vérifie)
- Pas de paiement des taxes (Anaqua / CPA Global / cabinet tiers)
- Pas de gestion procédure orale d'opposition INPI (rare ; renvoi avocat)
- Pas de génération PDF du formulaire INPI (juste un brouillon Markdown structuré)
- Pas de recours administratif post-décision INPI (Cour d'appel Paris L.411-4 — différé V6.0+ contentieux)
- Pas de dépôt international Madrid via OMPI direct (différé V1.2)

## 3. Architecture

### 3.1 Plugin étendu

```
plugins/hacienda-propriete-intellectuelle/                v0.6.0
├── .claude-plugin/plugin.json                            [BUMP] 0.6.0
├── CLAUDE.md                                             [PATCH] section "Dépôt + Opposition" enrichie
├── CHANGELOG.md                                          [PATCH] 0.6.0
├── README.md                                             [PATCH] V0.6
│
├── skills/
│   ├── depot-marque-fr/                                  [NEW]
│   │   ├── SKILL.md                                       (~450-550 lignes style Anthropic FR)
│   │   └── references/
│   │       ├── structure-depot-inpi.md                   (modèle formulaire INPI + champs)
│   │       └── redaction-libelles-nice.md                (bonnes pratiques libellés P&S)
│   ├── analyse-opposition-marque/                        [NEW]
│   │   ├── SKILL.md                                       (~500-600 lignes)
│   │   └── references/
│   │       ├── motifs-opposition-cpi.md                  (L.712-4, L.713-2, L.713-3, AOP/IGP)
│   │       └── procedure-opposition-inpi.md              (délais, étapes, écritures)
│   └── (autres skills intact)
│
└── references/
    └── ressources-pi-fr.md                               [PATCH] section "Procédures INPI"
```

Pas de nouveau tool MCP — les deux skills consomment les tools V1.0 existants (`inpi_search_marques`, `inpi_marque_details`, `euipo_tmview_search`).

### 3.2 Pas d'extension `@hacienda/core`

V1.1.2 = uniquement Markdown (skills + références). Réutilise tout l'infra V1.0/V1.1.0/V1.1.1 :
- `inpi_search_marques`, `inpi_marque_details` (vérifier disponibilité du signe et des marques antérieures opposables)
- `euipo_tmview_search` (vérifier antériorités EU)
- `renderDashboard` (si `--report-portfolio-impact` un jour, mais hors V1.1.2)

### 3.3 Configuration utilisateur

Aucun nouveau fichier user-stable. Les outputs vont dans `outputs/` existant :
- `depot-marque-{slug}-YYYY-MM-DD.md`
- `opposition-{numero}-YYYY-MM-DD.md`

## 4. Le skill `depot-marque-fr`

### 4.1 Frontmatter

```yaml
---
name: depot-marque-fr
description: >
  Aide à la préparation d'un dossier de dépôt marque (FR INPI, EU EUIPO,
  international Madrid). Structure le signe, les classes Nice, les libellés
  produits/services (rédaction selon directives examen INPI/EUIPO), le
  déposant, le mandataire. Conforme CPI L.711-1 et règlement EUTMR. NE dépose
  PAS — décision, paiement des taxes et dépôt formel restent au mandataire en
  marques (CPI L.422-4) ou avocat.
argument-hint: "[signe | classes Nice ou produits/services | territoire FR/EU/international]"
---
```

### 4.2 Sections (calque `preparation-depot-brevet` V2.0, adapté marques)

1. **Garde-fou en tête (loud)** :
   > **Préparation ≠ dépôt.** Ce skill produit un **brouillon technique** structuré pour aider le mandataire en marques ou l'avocat. Il NE rédige PAS le dossier final, NE paye PAS les taxes (~190€ FR INPI 1 classe / ~850€ EUTM 1 classe en 2026), NE dépose PAS auprès de l'INPI/EUIPO/OMPI. La rédaction des libellés P&S est une **discipline juridique** où chaque mot conditionne 10 ans de protection — un libellé trop large = refus partiel, trop étroit = protection limitée.

2. **Chargement profil** : rôle, juridictions inscrites, mandataire associé, posture dépôt (classes larges vs ciblées), seuils business owner.

3. **Intake batch unique** 7 questions :
   - **Signe** : texte exact, stylisation, type (mot / figuratif / composite / sonore / position / multimédia / hologramme — L.711-1 CPI étendue)
   - **Produits / services réels** (1-3 phrases, ce qui sera vendu)
   - **Classes Nice connues** (ou proposition à confirmer)
   - **Territoires** : FR national / EU EUTM / Madrid (préciser pays désignés) — défaut depuis profil
   - **Déposant** : raison sociale + SIREN + adresse (sera utilisé tel quel sur le formulaire)
   - **Mandataire** si applicable (avocat ou CPI INPI L.422-4) — recommandé pour EUTM/Madrid
   - **Priorité revendiquée** : un dépôt antérieur à invoquer (Union de Paris, 6 mois) ?

4. **Recherche d'antériorité préalable** : si pas encore fait, recommander `/recherche-anteriorite-marque` avant de continuer. Refus de procéder si l'utilisateur n'a pas balayé minimum les classes-cibles + adjacent families.

5. **Vérification motifs absolus L.711-2 CPI** : reprend la table de `recherche-anteriorite-marque` V1.0 (6 motifs : distinctivité, descriptif, devenu usuel, forme imposée, atteinte ordre public, trompeur). Skill flagge si le signe semble problématique.

6. **Rédaction des libellés produits/services** (cœur du skill) :
   - Pour chaque classe Nice retenue, proposer un libellé conforme :
     - **Directives examen INPI / EUIPO** : termes précis, pas de "tous produits" générique
     - **Liste OMPI alphabétique** des P&S Nice (édition 12) comme référence canonique
     - **Risque "lifestyle brand"** : si dépôt vise plusieurs catégories non-techniques (classe 9 logiciel + classe 25 vêtements + classe 41 divertissement…), flagger comme "stratégie lifestyle" qui nécessite justification d'usage réel sous 5 ans (forclusion défaut d'usage L.714-5 CPI)
   - Suggérer si élargir/restreindre selon ambition business
   - Référence : `references/redaction-libelles-nice.md`

7. **Choix territoire — arbre décisionnel** :

   | Critère | FR INPI | EU EUTM | Madrid OMPI |
   |---|---|---|---|
   | Marché cible | FR uniquement | UE 27 pays | mondial (sélection pays) |
   | Coût indicatif 1 classe | ~190€ (2026) | ~850€ | varies (~700€ base + désignations) |
   | Délai protection | ~5-6 mois | ~6-12 mois | dépend des offices nationaux |
   | Inscription mandataire | optionnel résident FR/EU | obligatoire si non-résident UE | obligatoire si non-résident UE |
   | Stratégie | défense locale | conquête EU | mondialisation ciblée |
   | Avant Madrid | base FR ou EU nécessaire | n/a | base obligatoire |

8. **Checklist avant dépôt** (10 points) :
   - [ ] Recherche antériorité faite (lien `recherche-anteriorite-marque`)
   - [ ] Motifs absolus L.711-2 vérifiés
   - [ ] Signe non descriptif des produits/services choisis
   - [ ] Classes Nice cohérentes avec activité réelle (pas d'usage fictif)
   - [ ] Libellés P&S précis et conformes directives
   - [ ] Déposant identifié (SIREN si personne morale)
   - [ ] Mandataire désigné si EUTM/Madrid sans résidence UE
   - [ ] Priorité revendiquée si dépôt antérieur (< 6 mois)
   - [ ] Taxes prévues au budget
   - [ ] Validation mandataire/avocat **avant dépôt formel**

9. **Format de sortie** (template Markdown inline) :
   - En-tête confidentialité selon profil
   - Garde-fou reformulé
   - Note du relecteur (sources, antériorité préalable ✓/✗, validation mandataire required)
   - Triage 🟢 (prêt à transmettre) / 🟡 (à clarifier) / 🔴 (knockout détecté, reformuler avant dépôt)
   - Section "Signe proposé" récap
   - Section "Classes Nice retenues" avec libellés rédigés
   - Section "Territoires + arbre décisionnel"
   - Section "Checklist 10 points"
   - Section "Brouillon de dossier" (sections du formulaire INPI/EUIPO avec valeurs proposées)
   - Section "Une question hors de ma checklist"
   - "Que veux-tu faire ?" (5 options : Itérer libellés / Escalader mandataire / Lancer recherche-anteriorite / Compléter faits / Autre)

10. **Gate non-juriste** : brief 1-page à apporter au mandataire (signe, P&S, classes, territoires, déposant, recherche antériorité résultat, 3 questions). Liens annuaires CNB + INPI mandataires + EUIPO eSearch professional representatives.

11. **Emplacement** : `~/.claude/plugins/config/.../outputs/depot-marque-<slug>-YYYY-MM-DD.md`.

12. **Ce que ce skill NE fait PAS** : déposer, payer, garantir l'enregistrement (refus possible motifs absolus / opposition), surveiller post-dépôt (= `surveillance-marque`), traiter opposition reçue (= `analyse-opposition-marque`), renouveler (= `revue-portefeuille-marques`).

13. **Ton** : technique, factuel, orienté action mandataire.

## 5. Le skill `analyse-opposition-marque`

### 5.1 Frontmatter

```yaml
---
name: analyse-opposition-marque
description: >
  Analyse une opposition INPI reçue OU à former (délai 2 mois post-publication
  BOPI, CPI L.712-4). Décompose les motifs invoqués (risque de confusion
  L.713-2, marque renommée L.713-3, AOP/IGP, etc.), évalue chaque branche
  d'argumentation contre l'antériorité opposable, produit un projet de
  réponse INPI structuré. NE dépose PAS l'opposition formelle — préparation
  à valider par mandataire en marques ou avocat.
argument-hint: "[numero marque attaquée | --form (former opposition) | --respond (répondre opposition reçue)]"
---
```

### 5.2 Sections (workflow inédit, calque général Anthropic ip-legal)

1. **Garde-fou en tête (loud)** :
   > **Analyse ≠ procédure officielle.** Ce skill produit une **analyse argumentaire** pour aider le mandataire ou l'avocat à préparer une opposition INPI. Il NE forme PAS l'opposition officielle, NE répond PAS au mémoire en réplique de la partie adverse, NE plaide PAS en audience orale (procédure rare). Le délai de 2 mois post-publication BOPI (CPI L.712-4) est **ferme** — manquer le délai = perte définitive du droit d'opposer (recours en restauration L.712-4-1 strict).

2. **Chargement profil** : rôle, posture enforcement (agressif/mesuré/conservateur — détermine le ton du mémoire), approbateurs, calendriers délai opposition.

3. **Intake** (2 modes selon `--form` ou `--respond`) :

   **Mode `--form`** (former une opposition contre un dépôt tiers, scénario alimenté par `surveillance-marque` V1.1.0) :
   - Numéro de la marque attaquée (déposée par tiers, publiée au BOPI)
   - Date de publication BOPI (calcul automatique délai 2 mois)
   - Marque(s) antérieure(s) opposable(s) (numéros INPI/EUIPO, qu'on possède ou licence)
   - Motifs invoqués : risque de confusion (L.713-2), marque renommée (L.713-3 1°), AOP/IGP, nom commercial / enseigne / nom domaine antérieur (L.711-3), dépôt frauduleux
   - Stratégie : opposition totale (toutes classes) vs partielle (classes spécifiques)

   **Mode `--respond`** (répondre à une opposition reçue) :
   - Numéro de NOTRE marque attaquée
   - Marque opposante invoquée (déclencher `inpi_marque_details` pour récupérer)
   - Motifs invoqués par l'opposant
   - Notre position : transiger, modifier (limitation classes), contester intégralement

4. **Analyse motifs (cadre CPI)** :

   Pour chaque motif invoqué, évaluer :

   **L.713-2 — risque de confusion** :
   - Identité ou similitude des signes (visuelle/auditive/conceptuelle, ensemble)
   - Identité ou similitude des produits/services (classes Nice + libellés effectifs)
   - Appréciation globale du risque de confusion (CJUE Sabel/Canon/Lloyd, cf. `recherche-anteriorite-marque`)
   - Pouvoir distinctif intrinsèque + acquis de la marque antérieure
   - Public concerné + niveau d'attention

   **L.713-3 — marque renommée** :
   - Preuve de renommée (parts marché, communication, ancienneté, présence géographique)
   - Lien entre les signes (même si pas de risque de confusion direct)
   - Profit indu / atteinte à la renommée / au caractère distinctif

   **L.711-3 — droits antérieurs autres que marques** :
   - Nom commercial, enseigne, nom de domaine antérieurs
   - Dépôt frauduleux (preuve de mauvaise foi du déposant tiers)
   - AOP / IGP (Indications Géographiques Protégées)

5. **Recherche complémentaire** : déclencher `inpi_marque_details` pour récupérer historique opposition de la marque attaquée + marque opposante + `euipo_tmview_search` pour vérifier antériorités cross-EU.

6. **Calcul du délai** (mode `--form`) :
   - Date publication BOPI + 2 mois = date butoir L.712-4
   - Si délai < 30 j → 🔴 URGENT (escalation immédiate)
   - Si délai 30-45 j → 🟠 (préparer cette semaine)
   - Si délai > 45 j → 🟡 (planifier)

7. **Format de sortie** template Markdown inline :
   - En-tête confidentialité
   - Garde-fou reformulé
   - Note du relecteur (sources INPI, délai opposition, marque opposante vérifiée)
   - Triage 🔴 URGENT / 🟠 À PRÉPARER / 🟡 STANDARD
   - Section "Marque attaquée" récap (signe, déposant, classes, date BOPI)
   - Section "Antériorités opposables" tableau
   - Section "Motifs invoqués — analyse par branche" (chacun avec forces/faiblesses)
   - Section "Recommandation stratégique" : opposition totale/partielle, chances de succès estimées, alternative (transaction amiable, coexistence)
   - Section "Projet de réponse INPI" — structure du mémoire :
     - Identification parties (opposant, défendeur, mandataire)
     - Marque attaquée vs marque(s) antérieure(s)
     - Exposé des faits
     - Discussion en droit (motifs par motifs)
     - Demande (rejet de l'enregistrement total/partiel)
     - Pièces produites
   - Section "Calendrier procédure INPI" : dépôt mémoire, réponse adverse, contre-réponse, décision (~6-9 mois)
   - Section "Une question hors de ma checklist"
   - "Que veux-tu faire ?" (Itérer / Escalader / Compléter / Transiger / Autre)

8. **Gate non-juriste** : brief mandataire avec récap motifs + antériorités + délai restant + 3 questions.

9. **Emplacement** : `~/.claude/plugins/config/.../outputs/opposition-<numero-marque>-YYYY-MM-DD.md`.

10. **Ce que ce skill NE fait PAS** : déposer l'opposition (= démarche INPI formelle via télé-procédure ou papier), payer la taxe (~325€ FR 2026), plaider en audience orale (rare, mandataire spécialisé), gérer recours TJ Paris post-décision INPI (= contentieux V6.0+), évaluer transactions financières (coexistence, licence, rachat marque).

11. **Ton** : argumentaire, précis, équilibré (présenter les deux côtés avant de conclure). Mandataire fait sa lecture en 10 min.

## 6. Articles CPI référencés

- **L.711-1** — types de signes (mot, figuratif, composite, sonore, position, multimédia, hologramme)
- **L.711-2** — motifs de refus absolus
- **L.711-3** — motifs de refus relatifs (droits antérieurs)
- **L.712-1** — formes de dépôt (FR national, désignation EU/Madrid)
- **L.712-4** — opposition : délai 2 mois post-publication BOPI (CENTRAL)
- **L.712-4-1** — restauration de délai (strict, exceptionnel)
- **L.713-2** — droits conférés (identité ou similitude + risque de confusion)
- **L.713-3** — marque renommée
- **L.714-1** — cession, licence, nantissement
- **L.714-5** — forclusion défaut d'usage (5 ans)

## 7. Critères de succès V1.1.2

- [ ] `npm test` vert (≥ 269 — pas de nouveaux tests TS attendus, Markdown only)
- [ ] `npm run typecheck`, `npm run build`, `npm run branding:check` verts
- [ ] `/depot-marque-fr "APEXLEAF — vêtements outdoor classes 25, 35 — FR"` produit un brouillon de dossier complet avec checklist 10 points + arbre territoire
- [ ] `/analyse-opposition-marque --form FR4123456` (alimenté par surveillance) produit un projet de mémoire opposition avec analyse motifs + délai calculé
- [ ] `/analyse-opposition-marque --respond FR1234567` produit une analyse de défense face à opposition reçue
- [ ] Workflow end-to-end testable : surveillance détecte → analyse-opposition prépare → user transmet à mandataire
- [ ] Pas de régression V1.0/V1.1.0/V2.0/V1.1.1
- [ ] Bump v0.5.0 → v0.6.0

## 8. Risques

| Risque | Mitigation |
|---|---|
| Délai L.712-4 raté à cause d'un projet bloqué dans l'analyse | Section délai explicite + sévérité 🔴 si < 30 j + escalation immédiate dans l'output |
| Mauvaise rédaction libellés P&S → refus partiel INPI | Référence `redaction-libelles-nice.md` + flag automatique sur libellés vagues ("tous produits") |
| Mémoire opposition trop générique → rejet pour défaut d'argumentation | Template par motif avec sections obligatoires (faits, droit, demande, pièces) |
| Skills confondus avec `recherche-anteriorite-marque` | Garde-fou explicit + cross-ref ("avant d'opposer, voir antériorité via /recherche-anteriorite-marque") |
| Conflits avec workflow brevets (numéros similaires FRxxxxxxx) | Frontmatter explicit "marques" partout, validation type signe à l'intake |

## 9. Plan de rollout

- **V1.1.2 (ce spec)** — dépôt + opposition marques (le binôme qui ferme le workflow marques)
- **V1.2** — contrefacon-web (monitoring marketplaces / réseaux sociaux / noms domaine) + connecteur OMPI Madrid Monitor
- **V2.1** — brevets : analyse-refus-inpi + anteriorite-invalidite + Google Patents
- **V2.2** — brevets : strategie-extension-internationale + revue-portefeuille-brevets (réutilise dashboard HTML V1.1.1)
- **V3.0** — bloc dessins/modèles
- **V4.0+** — droit d'auteur, contrats PI, contentieux

## 10. Annexes

### A — Inspirations

- `recherche-anteriorite-marque/SKILL.md` V1.0 (modèle FR, garde-fou L.711-2, appréciation CJUE)
- `preparation-depot-brevet/SKILL.md` V2.0 (modèle préparation-brouillon avec gate mandataire/avocat)
- Doc origine `plan-propriete-intellectuelle-fr.md` §4 (workflows)

### B — Sources externes

- Directives examen INPI marques (édition courante)
- EUIPO Guidelines Trademark
- Liste OMPI alphabétique Nice (édition 12)

---

*Version 1.1.2 — mode autonome.*
