# Templates Codex — Blind sparring scoring (Phases 1, 2, 4)

**Référence protocole** : `docs/methodology/sparring-scoring-protocol.md`
**Script helper** : `scripts/codex-blind-scoring.py`
**Modèle Codex recommandé** :
- Phase 1 (datasets) : **GPT-5.5 effort medium**
- Phase 2 (vérité terrain) : **GPT-5.5 effort HIGH** (phase la plus consequence)
- Phase 4 (scoring) : **GPT-5.5 effort medium**

GPT-4.5 (orion) **déconseillé** : risque de citations CPI / CJUE inventées sur domaine niche droit français PI.

**Parcours canonique release** : Phase 1 → `phase2-criteria` → Phase 3 →
`phase4-criteria`. Les templates holistiques pondérés `phase2` / `phase4` sont
conservés pour rejouer les cycles historiques, pas comme base autonome de release.

---

## Phase 1 — Génération du dataset fictif

### Variables à substituer

| Placeholder | Description | Exemple |
|---|---|---|
| `{skill}` | Nom du skill cible | `analyse-opposition-marque` |
| `{domain}` | Domaine PI | `marques` |
| `{mode}` | Mode d'invocation du skill | `analyse offensive opposition INPI L.712-4` |
| `{specificites}` | Liste des nuances métier à inclure subtilement | `motifs absolus L.711-2 ; restauration L.712-4-1` |

### Prompt canonique

```
ROLE: Tu génères un dataset de test fictif pour évaluer la qualité d'un skill
juridique français en propriété intellectuelle. Tu fais partie d'un protocole
blind de sparring scoring (4 phases).

CONTEXTE PROTOCOLE BLIND :
Ton output (le dataset) servira ensuite à un autre acteur (modèle différent)
qui définira la vérité terrain. Un troisième acteur exécutera le skill sur
ton dataset. Un quatrième scorrera. Les 4 phases sont volontairement
isolées pour éviter le biais auto-référent.

CONSIGNE STRICTE : tu ne dois PAS produire la vérité terrain dans ce fichier.
Juste le scénario fictif et les pièces. Aucune cotation 🔴🟠🟡🟢, aucune
recommandation, aucune section "Vérité terrain attendue".

PARAMÈTRES :
- Skill cible : {skill}
- Domaine PI : {domain}
- Mode d'invocation : {mode}
- Spécificités métier à inclure subtilement : {specificites}

INSTRUCTIONS :

Génère un dossier fictif structuré comme suit :

# Dataset test — `{skill}`

**Domaine** : {domain}
**Skill cible** : `/h-pi:{skill}`
**Mode** : {mode}

*Dossier strictement fictif — toute ressemblance avec dossiers, parties ou titres
réels serait fortuite.*

---

## Scénario fictif

[Entité fictive : raison sociale, SIREN inventé 9 chiffres, secteur, taille, CA.
Situation métier précise : deal en cours, contentieux en gestation, dépôt préparé,
audit DD M&A, etc. Parties impliquées avec rôles. Dates clés cohérentes.]

---

## Pièces fournies

### [Section adaptée au scénario — ex. constat huissier, contrat projeté, recherche INPI/EUIPO simulée, SBOM, etc.]

[Détails techniques crédibles. Si numéros de marques/brevets : inventer (FR
7-8 chiffres, EP 7-8 chiffres, EUTM 8-9 chiffres). Si montants : réalistes pour
le secteur évoqué.]

### [Autres sections de pièces selon le dossier]

---

## Posture cabinet (configurée)

[Selon le domaine : posture enforcement, matrice approbateurs, tribunaux
habituels, budget contentieux, posture par défaut.]

---

## Question / demande explicite

[Ce que le déposant / avocat / client veut obtenir du skill — formulé comme
un message court ou une note de cadrage.]

CONTRAINTES :
- TOUT est fictif. Aucune partie réelle. SIREN inventés (9 chiffres aléatoires
  cohérents avec validation Luhn si possible). Montants réalistes. Brevets /
  marques / DM avec numéros inventés.
- Inclure subtilement les spécificités à tester sans annoncer "voici le piège
  à détecter" — un avocat expérimenté les verrait par lecture, mais elles ne
  sont pas étiquetées.
- Format Markdown autonome.
- Disclaimer fictif en tête (déjà dans le template).
- AUCUNE section "Vérité terrain", AUCUNE cotation 🔴🟠🟡🟢, AUCUNE recommandation.
- Le scénario reste CYCLE-AGNOSTIQUE : aucun code de cycle dans le titre, le corps
  ou une provenance. Le code appartient à l'orchestration et au rapport Phase 4.
- Si la chronologie fournie est approximative, conserve des semaines relatives ;
  n'invente jamais une date calendaire ni un nombre de jours précis.
- Tu génères les faits, pas leur interprétation.
- Longueur cible : 200-400 lignes.

OUTPUT : un fichier Markdown autonome correspondant à la structure ci-dessus,
prêt à être sauvegardé dans `tests/datasets/<batch>-{skill}/scenario.md`.
```

---

## Phase 2 — Génération de la vérité terrain

**Statut** : variante holistique pondérée historique, conservée pour rejouer les
anciens cycles. Pour une décision release, utiliser `phase2-criteria`.

### Variables à substituer

| Placeholder | Description | Exemple |
|---|---|---|
| `{skill}` | Nom du skill cible | `analyse-opposition-marque` |
| `{skill_description}` | Description **neutre minimale** du skill (2-3 lignes max) | `Skill d'analyse d'opposition à un dépôt de marque devant l'INPI, mode offensif ou défensif. Produit un livrable partner-ready avec findings cotés et recommandation.` |
| `{domain}` | Domaine PI | `marques` |
| `{mode}` | Mode d'invocation | `offensif L.712-4` |
| `{scenario_content}` | Contenu intégral du `scenario.md` de Phase 1 | (chargé depuis fichier) |

### Prompt canonique

```
ROLE : Tu définis la vérité terrain juridique pour un dataset fictif déjà existant.
Tu agis comme un AVOCAT EXPERT PI SENIOR FRANÇAIS qui lit le dossier "à froid"
et identifie ce qu'un livrable de qualité partner-ready DEVRAIT capter.

CONTEXTE PROTOCOLE BLIND :
Tu n'as pas écrit le dataset (autre acteur). Tu ne sais pas exactement ce que
le skill évalué fait (autre acteur). Tu définis la vérité métier indépendante.

CONTRAINTE CLÉ — ANTI-LEAKAGE :
Tu reçois le scénario fictif + une description NEUTRE et MINIMALE du skill
cible. Tu ne reçois PAS le SKILL.md complet (qui prescrirait ce que le skill
fait). Cela garantit que ta vérité terrain reflète ce qu'un expert pur
attendrait, pas ce que le skill est conçu pour produire.

DESCRIPTION NEUTRE DU SKILL CIBLE :
{skill_description}

PARAMÈTRES :
- Skill cible : {skill}
- Domaine PI : {domain}
- Mode d'invocation : {mode}

SCÉNARIO FOURNI (Phase 1) :

{scenario_content}

GÉNÈRE :

# Vérité terrain — `{skill}`

**Méthode** : sparring scoring blind protocole D.0 phase 2 (Codex GPT-5.5 high)
**Scénario** : voir `scenario.md` du même dossier

## Findings critiques attendus

### 🔴 Bloquant

[Findings qui rendent une décision en l'état dangereuse / nulle / non opposable.
Chacun cite l'article du Code (CPI, C.civ, RMUE, RDMC, CBE) et/ou jurisprudence
(arrêt CJUE, Cour de cassation, CA Paris pôle 5, etc.) pertinente.]

### 🟠 Élevé

[Findings qui nécessitent une correction substantielle avant action.]

### 🟡 Moyen

[Findings qui méritent vigilance ou clarification.]

### 🟢 Faible

[Ce qui est correct et n'appelle pas d'action.]

## Nuances métier subtiles à valoriser

[Ce qu'un avocat expérimenté noterait en marge sans que ce soit un finding
bloquant — mais qui distingue une sortie partner-ready d'une sortie générique.
Chaque nuance citée avec source primaire.]

## Pièges à ne pas tomber dedans

[Au moins 5 raisonnements faux mais tentants qu'un junior pourrait suivre.
Formulés en "Ne pas X" avec explication courte du pourquoi.]

## Recommandation attendue

[Verdict final : no-go / go avec conditions / stratégie à reprendre / etc.
Plan d'action chronologique 2-4 sprints avec livrables par sprint.]

## Grille de scoring adaptée

| Dimension | Poids | Indicateurs spécifiques au dossier |
|---|---|---|
| Couverture du périmètre | 30 % | [Liste des findings 🔴/🟠/🟡 qu'un scoreur doit pouvoir vérifier comme présents/absents dans la sortie live.] |
| Détection nuances métier critiques | 30 % | [Liste des nuances articulées que la sortie live doit avoir mentionnées avec citation.] |
| Qualité arbitrage subjectif | 20 % | [Cotation 🔴/🟠/🟡/🟢 calibrée, plancher cross-skill respecté, recommandation actionnable.] |
| Lisibilité partner-ready | 10 % | [Format, structure, en-tête confidentialité, note du relecteur, arbre 5 options.] |
| Résistance aux pièges | 10 % | [La sortie live évite-t-elle chacun des pièges listés ?] |

CONTRAINTES :
- Cite explicitement les articles et arrêts CJUE / Cour de cassation canoniques.
  Pas d'inférence vague.
- Pas de référence à ce que le skill prescrit. Tu raisonnes en avocat pur.
- Format Markdown autonome.
- Longueur cible : 250-450 lignes.
- En tête : indique "Phase 2 — Codex GPT-5.5 effort high — protocole D.0".

OUTPUT : un fichier Markdown autonome, prêt à être sauvegardé dans
`tests/datasets/<batch>-{skill}/ground-truth.md`.
```

---

## Phase 4 — Scoring comparatif

**Statut** : variante holistique pondérée historique, conservée pour rejouer les
anciens cycles. Pour une décision release, utiliser `phase4-criteria`.

### Variables à substituer

| Placeholder | Description | Exemple |
|---|---|---|
| `{skill}` | Nom du skill évalué | `analyse-opposition-marque` |
| `{skill_version}` | Version du skill au moment du test | `2.0.0` (vague C) ou `2.1.0` (post-vague-D.1) |
| `{code}` | Code scoring 6 chars | `K7M2PX` |
| `{date}` | Date du scoring | `2026-06-15` |
| `{scenario_content}` | Contenu intégral du `scenario.md` | (chargé) |
| `{ground_truth_content}` | Contenu intégral du `ground-truth.md` | (chargé) |
| `{live_output_content}` | Contenu intégral du `live-output.md` | (chargé) |

### Prompt canonique

```
ROLE : Tu scores une sortie live de skill juridique par comparaison à une vérité
terrain pré-définie. Tu agis comme un ÉVALUATEUR INDÉPENDANT.

CONTEXTE PROTOCOLE BLIND :
Phase 4 du protocole sparring scoring. Tu reçois trois inputs. Tu n'as PAS
accès au SKILL.md du skill évalué (sinon tu scorerais structurellement au
lieu d'évaluer substantiellement).

INPUTS :

=== SCENARIO (Phase 1) ===

{scenario_content}

=== GROUND-TRUTH (Phase 2) ===

{ground_truth_content}

=== LIVE-OUTPUT (Phase 3) ===

{live_output_content}

PARAMÈTRES :
- Skill évalué : {skill} v{skill_version}
- Code scoring : {code}
- Date : {date}

ÉVALUE :

Pour chaque dimension de la grille de scoring (présente dans ground-truth.md),
note de 0 à 100 % :

1. COUVERTURE DU PÉRIMÈTRE (poids 30 %)
   — Combien de findings 🔴/🟠/🟡 de la vérité terrain sont effectivement
     présents (explicitement ou par inférence claire) dans la sortie live ?

2. DÉTECTION NUANCES MÉTIER (poids 30 %)
   — Les nuances subtiles de la vérité terrain sont-elles articulées dans
     la sortie live ? Avec citation des articles / jurisprudence attendus ?

3. QUALITÉ ARBITRAGE SUBJECTIF (poids 20 %)
   — Les cotations 🔴/🟠/🟡/🟢 dans la sortie live sont-elles calibrées vs
     la vérité terrain ? Les recommandations actionnables et alignées sur
     le verdict attendu ?

4. LISIBILITÉ PARTNER-READY (poids 10 %)
   — Format, structure, en-tête confidentialité, note du relecteur, arbre
     5 options, tableau coté, dashboard HTML si data-heavy.

5. RÉSISTANCE AUX PIÈGES (poids 10 %)
   — La sortie live évite-t-elle les raisonnements faux listés dans les
     pièges de la vérité terrain ?

CALCULE :
- Score pondéré global = somme pondérée (note dimension × poids).
- Verdict :
  - 🟢 ≥ 80 %
  - 🟡 60-79 %
  - 🟠 40-59 %
  - 🔴 < 40 %

IDENTIFIE :
- GAPS DESIGN INFÉRÉS : pour chaque finding 🔴/🟠 manqué dans la sortie live,
  qu'est-ce qui MANQUE dans le skill (sans le voir) pour qu'il l'attrape
  systématiquement ? Formule en termes d'étape de workflow, citation
  d'article, garde-fou, anti-pattern à inscrire dans "Ce skill ne fait pas".
- HITS POSITIFS : ce que la sortie live fait BIEN, au-delà de la vérité
  terrain attendue (bonus skill plus mature que la vérité terrain).

OUTPUT — fichier Markdown structuré :

# Sparring scoring — `{skill}` — Code {code}

**Date** : {date}
**Skill évalué** : `{skill}` v{skill_version}
**Méthode** : sparring scoring blind protocole D.0 phase 4 (Codex GPT-5.5 medium)
**Scénario** : voir `tests/datasets/<batch>-{skill}/scenario.md`
**Vérité terrain** : voir `tests/datasets/<batch>-{skill}/ground-truth.md`
**Sortie live** : voir `tests/datasets/<batch>-{skill}/live-output.md`

## Score pondéré

| Dimension | Poids | Score | Pondéré | Justification |
|---|---|---|---|---|
| Couverture du périmètre | 30 % | XX % | XX % | [Justification 1-3 phrases avec indicateurs spécifiques] |
| Détection nuances métier | 30 % | XX % | XX % | ... |
| Qualité arbitrage subjectif | 20 % | XX % | XX % | ... |
| Lisibilité partner-ready | 10 % | XX % | XX % | ... |
| Résistance aux pièges | 10 % | XX % | XX % | ... |
| **Total pondéré** | **100 %** | — | **XX %** | **Verdict 🟢/🟡/🟠/🔴** |

## Justification détaillée par dimension

### Couverture du périmètre (XX %)

[Détail : findings captés / findings manqués, par sévérité.]

### Détection nuances métier critiques (XX %)

[Détail : nuances articulées avec citation correcte / nuances manquées ou mal citées.]

### Qualité arbitrage subjectif (XX %)

[Détail : calibrage cotations 🔴/🟠/🟡, alignement recommandation finale.]

### Lisibilité partner-ready (XX %)

[Détail : format, structure, tags provenance, note relecteur, arbre 5 options.]

### Résistance aux pièges (XX %)

[Détail : pièges évités / pièges où le skill est tombé.]

## Gaps DESIGN inférés (mini-backlog)

🔴 [Gaps structurants — ex. "Le skill ne contient pas d'étape explicite vérifiant L.615-5-1 CPI"]

🟠 [Gaps notables]

🟡 [Gaps mineurs]

## Hits positifs (bonus skill)

[Ce que le skill fait mieux que la vérité terrain attendrait.]

## Recommandations pour vague ultérieure

[1-3 actions concrètes : modifier l'étape X du SKILL.md, ajouter référence à
l'article Y, durcir le garde-fou Z, etc.]

CONTRAINTES :
- Sois critique. Pas d'évaluation flatteuse.
- Si le live-output rate un finding 🔴 listé dans ground-truth → gap 🔴 inféré.
- Si le live-output l'attrape implicitement mais ne le nomme pas → cotation 70-80 %.
- Si le live-output le nomme explicitement avec citation article → cotation 90-100 %.
- Format Markdown autonome.
- Longueur cible : 300-500 lignes.

OUTPUT : un fichier Markdown autonome, prêt à être sauvegardé dans
`docs/backlog/<plugin-prefix>-scoring-<batch>-{skill}-{code}.md`.
```

---

## Phase 2 criteria — Vérité terrain criteria atomiques

**Statut** : template canonique pour toute nouvelle décision release. Le
`ground-truth.md` produit **EST** la grille ; aucun golden answer séparé.

### Variables à substituer

- `{skill}`, `{skill_description}`, `{domain}`, `{mode}`, `{scenario_content}`

### Prompt canonique

```
Tu es un avocat senior FR, expert du domaine « {domain} ». On te donne un scénario
fictif et une description neutre d'un livrable attendu. Tu NE vois PAS le skill qui
sera évalué.

Skill (description neutre) : {skill_description}
Mode : {mode}

Scénario :
---
{scenario_content}
---

Produis la VÉRITÉ TERRAIN sous forme de CRITERIA ATOMIQUES PASS/FAIL, en français,
ancrés sur les faits du scénario et le droit FR applicable. Pour chaque criterion :
- un id (C-001, C-002, ...),
- un niveau : CRITIQUE (erreur doctrinale rédhibitoire / bug), MAJEUR (finding
  central attendu), ou MINEUR (précision / hygiène),
- un libellé « PASS si ... / FAIL si ... » vérifiable sans ambiguïté,
- l'axe concerné.

RÈGLES DE RÉDACTION DES CRITÈRES (impératives) :
1. PASS et FAIL doivent être COMPLÉMENTAIRES : ensemble ils couvrent toute sortie
   plausible, sans zone médiane non allouée. Une réponse substantiellement correcte
   mais au libellé imparfait (terminologie datée, formulation équivalente, synonyme
   doctrinal) doit tomber clairement en PASS. NE JAMAIS rédiger un PASS qui exige la
   récitation d'un libellé exact face à un FAIL étroit (« invente un critère contraire
   / ignore totalement ») : la zone « juste sur le fond, imprécis sur la forme »
   resterait orpheline et produirait un faux verdict.
2. Privilégie la forme PIÈGE pour les gates CRITIQUES : FAIL = commet une ERREUR
   AFFIRMATIVE NOMMÉE qui tromperait le client (ex. qualifie d'illégale une clause
   légale, applique le régime consommateur à du B2B, valide une exonération
   dangereuse) ; PASS = ne commet pas cette erreur. Évite les gates « recall »
   (PASS = énonce exactement la doctrine X) : ils sont la cause des faux REJETÉ.
3. Réserve CRITIQUE aux erreurs qui TROMPENT LE CLIENT ou renversent une conclusion
   de droit : contre-sens de droit, mauvais régime applicable, calcul rédhibitoire.
   Une imprécision de millésime, une citation datée mais substantiellement juste, ou
   l'oubli d'un seul sous-élément sont MAJEUR ou MINEUR, JAMAIS CRITIQUE.
4. Zone PASSIVE orpheline : si le PASS exige un TRAITEMENT ACTIF (« critique »,
   « refuse », « borne », « propose ») et le FAIL une ERREUR ACTIVE (« valide »,
   « accepte »), une sortie qui se contente de MENTIONNER puis RENVOYER (« clause à
   voir ailleurs », « méthode à définir », « non analysé au fond ») tombe entre les
   deux et sera comptée FAIL à tort. Si la mention/le renvoi sans analyse doit
   suffire, l'écrire dans le PASS ; sinon, le FAIL doit viser explicitement « se
   contente de mentionner ou renvoyer sans traiter ».
5. DENSITÉ BORNÉE : produis 20-30 critères MAXIMUM. Privilégie les critères
   DISCRIMINANTS (pièges, gates, findings centraux) ; ne fragmente PAS un même
   point en multiples sous-items conjonctifs (un critère « éligibilité X » qui
   exige 5 sous-conditions reste UN critère, pas cinq). Une grille trop dense
   (> 30) dilue le signal et produit des faux FAIL de PROFONDEUR sur un livrable
   brouillon (qui ne déroule pas chaque sous-item) : c'est un défaut de grille,
   pas du skill.
6. NE PÉNALISE PAS LE FORMAT IMPOSÉ du skill. Les livrables Hacienda portent des
   éléments de forme OBLIGATOIRES qui contiennent légitimement des dates et des tags
   de provenance — un critère mal cadré les compte à tort comme faute :
   - **Dates** : un critère « dates en semaines relatives / aucune date calendaire »
     doit viser EXCLUSIVEMENT les **jalons du deal / de la procédure** (échéances,
     closing, forclusion, préavis). Il ne doit JAMAIS pénaliser la date d'une **loi
     citée** dans l'en-tête de confidentialité obligatoire (ex. « loi n°71-1130 du
     31 décembre 1971 ») ni le champ « **Date d'analyse : YYYY-MM-DD** » du Log de
     vérification imposé par le CLAUDE.md. Formuler : « FAIL si un JALON du dossier
     est exprimé en date calendaire au lieu de semaines relatives ».
   - **Provenance** : un critère « source non consultée → `[à vérifier]` » doit
     EXEMPTER les articles de l'**index pré-vérifié** du skill (SKILL.md liste des
     LEGIARTI citables `[Légifrance]` hors ligne, ex. 1231-5 C.civ). Viser plutôt :
     « FAIL si un article HORS index pré-vérifié, ou une source externe non consultée,
     est présenté comme vérifié ».
Termine par un bloc JSON : {"skill":"{skill}","criteria":[{"id":...,"niveau":...,
"axe":...,"match_criteria":...}, ...]}.
Vérifie chaque article cité (ne pas inventer). Aucune donnée réelle.
```

## Phase 4 criteria — Scoring tiered-gated

### Variables à substituer

- `{skill}`, `{skill_version}`, `{code}`, `{date}`, `{scenario_content}`,
  `{ground_truth_content}`, `{live_output_content}`

### Prompt canonique

```
Tu es un évaluateur juridique FR. Tu NE vois PAS le SKILL.md. On te donne un
scénario, une grille de CRITERIA ATOMIQUES (vérité terrain) et un livrable produit.

Scénario :
---
{scenario_content}
---
Criteria (vérité terrain) :
---
{ground_truth_content}
---
Livrable évalué ({skill} v{skill_version}, code {code}, {date}) :
---
{live_output_content}
---

Pour CHAQUE criterion de la grille, rends un verdict PASS ou FAIL + une "preuve"
(citation/localisation du livrable, décrite ci-dessous). N'invente aucun criterion.
Ne calcule PAS le score global toi-même.

Avant le bloc JSON final, produis le rapport complet de scoring : un tableau ou une
section par criterion avec le verdict et son raisonnement. Cette réponse complète est
sauvegardée dans `docs/backlog/<prefix>-scoring-<skill>-<code>.md`. Seul le bloc JSON
final est extrait vers `verdicts-<code>.json`.

⚠️ SORTIE OBLIGATOIRE — ta réponse DOIT se terminer par le bloc de verdicts décrit
ci-dessous, et RIEN après lui. Sans ce bloc exact, le scoring est inexploitable et
le travail est perdu. Respecte TOUTES ces règles :

- Précède le bloc EXACTEMENT de cette ligne marqueur, seule sur sa ligne :
  ===VERDICTS_JSON===
- Juste après le marqueur, mets le JSON en BRUT sur une seule ligne (PAS de
  clôture markdown, PAS de texte avant ou après).
- Chaque objet contient EXACTEMENT quatre clés : "id", "niveau", "verdict",
  "preuve" (verdict vaut "PASS" ou "FAIL"). PAS de "axe", PAS de "match_criteria".
- Recopie `niveau` à l'identique depuis le ground-truth : il est autoritatif et ne
  doit jamais être élevé ou déclassé par le scoreur.
- La clé "preuve" est OBLIGATOIRE et NON VIDE sur chaque objet — c'est le garde-fou
  anti-hallucination qui t'oblige à LOCALISER le passage du livrable avant de trancher :
  - PASS : une courte citation (≤ ~15 mots) du LIVRABLE qui établit le critère ;
  - FAIL : soit la phrase du livrable qui le contredit, soit le seul mot "absent"
    si le livrable ne traite PAS le point.
  - Cohérence exigée : un FAIL dont la "preuve" est une citation réelle du livrable
    traitant le point est une AUTO-CONTRADICTION — relis et corrige le verdict avant
    d'envoyer. (La preuve est conservée dans `verdicts-<code>.json` et sert d'audit.)
- NE RECOPIE PAS la grille d'entrée : la grille fournie n'a PAS de clé "verdict" ;
  ton bloc DOIT en avoir une, non vide, sur CHAQUE objet. Recopier la grille = échec.
- Un objet par criterion, dans l'ordre de la grille, aucun omis, aucun ajouté.
- Avant d'envoyer, RELIS ton bloc et vérifie que chaque objet porte bien une clé
  "verdict" ∈ {"PASS","FAIL"} ET une clé "preuve" non vide.

Exemple EXACT du format attendu (le marqueur seul sur sa ligne, puis le JSON brut) :

===VERDICTS_JSON===
{"criteria":[{"id":"C-001","niveau":"MAJEUR","verdict":"PASS","preuve":"« inscription au RMT BidCo + comptes »"},{"id":"C-002","niveau":"CRITIQUE","verdict":"FAIL","preuve":"absent"}]}

Le statut final (REJETÉ si un CRITIQUE FAIL, sinon ADMIS / RÉSERVES / INSUFFISANT)
est calculé de façon déterministe par `scripts/tiered_scoring.py` à partir de ce JSON.
```

---

## Évolutions des templates

Toute modification structurante (ajout/suppression de dimensions de scoring,
modification de la pondération, changement de format de livrable) = nouveau
template versionné `codex-prompt-templates-v2.md`. Les anciens templates
restent disponibles pour comparaison historique.

> **Décision (2026-06-30, humain).** L'ajout de `preuve` est **additif et
> rétrocompatible** (`extract-verdicts.py` le préserve, `tiered_scoring.py` l'ignore) :
> il enrichit le schéma sans casser l'existant ni les verdicts à 3 clés legacy. Il est
> donc intégré **in-place**, sans `codex-prompt-templates-v2.md`.

### Journal

- **2026-06-01** — D.0 : protocole blind 4 phases, acteurs séparés et anti-leakage.
- **2026-06-02** — Ajout des templates criteria atomiques tiered-gated inspirés de
  Harvey LAB : le ground-truth est la grille, sans golden answer séparé ; agrégation
  déterministe par `tiered_scoring.py`. Mise en place du launchpad D.2.
- **2026-06-03** — Le niveau devient autoritatif depuis le ground-truth (`load_scored`),
  jamais depuis les verdicts ; les inputs blind deviennent cycle-agnostiques.
- **2026-06-10** — Phase 2 criteria : ajout des « RÈGLES DE RÉDACTION DES CRITÈRES »
  (complémentarité PASS/FAIL sans zone orpheline, forme piège pour les gates,
  CRITIQUE réservé aux erreurs trompant le client). Clarification non structurante
  (dimensions, pondération et format inchangés). Origine : Chantier B `reviser-contrat`
  (6YFSSW), gate C-024 asymétrique + sur-classé → faux REJETÉ 0,0.
- **2026-06-11** — Phase 2 criteria : ajout de la règle 4 (zone PASSIVE orpheline :
  PASS « traitement actif » / FAIL « erreur active » laisse orphelin le « mentionne
  puis renvoie sans traiter »). Origine : Chantier B `financement-startup` (KJ039D),
  gates C-014 (véto) et C-020 (anti-dilution) ratés par le checkpoint — la sortie
  listait-puis-renvoyait au pacte sans borner. Motif non couvert par les 3 premières
  règles (libellé exact, complétude, niveau). Le skill a été corrigé en parallèle
  (flaguer/borner au stade term sheet avant routage `pacte-associes-review`).
- **2026-06-19** — Durcissement anti-footgun du code de cycle et garde
  anti-fabrication des dates : conserver les semaines relatives, ne jamais convertir
  une approximation en date calendaire inventée.
- **2026-06-24** — Code de cycle fixé à 6 caractères stricts après l'incident
  `RD1RT` (5 caractères), corrigé en `RDG1RT`.
- **2026-06-26** — Consolidation du gate-piège et du gate France/Lux : un gate
  `CRITIQUE` vise l'erreur affirmative qui trompe le client ; fermeture des zones
  orphelines par complémentarité PASS/FAIL.
- **2026-06-29** — Phase 4 criteria : marqueur `===VERDICTS_JSON===`, JSON brut sur
  une ligne et extraction outillée. Sur grilles denses, décision release sur
  gate-clean et spot-check des FAIL contre `live-output.md` avant tout diagnostic.
- **2026-06-30** — Phase 4 criteria : clé `preuve` obligatoire par verdict, soit
  `{id,niveau,verdict,preuve}`, persistée par `extract-verdicts.py`. Phase 2 criteria :
  densité bornée à 20–30 criteria. Le garde fail-fast de `da-scoring.sh` impose les
  codes `[A-Z0-9]{6}`. `tiered_scoring.py` reste inchangé et ignore `preuve`.
- **2026-07-03** — Phase 2 criteria, règle 6 : ne pas pénaliser le FORMAT IMPOSÉ. Un
  critère « dates en semaines relatives » doit viser les seuls JALONS du deal, jamais
  la date de loi de l'en-tête de confidentialité ni le champ « Date d'analyse » du Log
  de vérification ; un critère de provenance doit EXEMPTER l'index pré-vérifié
  `[Légifrance]` du skill. Origine : DDRPE1 (`due-diligence-pe`) — faux FAIL C-025
  (`1231-5 C.civ [Légifrance]`, pourtant dans l'index) et C-026 (`31 décembre 1971` de
  l'en-tête + `Date d'analyse`), gate 6/6 clean malgré 0,49 brut.
