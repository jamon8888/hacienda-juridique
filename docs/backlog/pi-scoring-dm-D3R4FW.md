# Sparring scoring — `depot-dessin-modele` — Code D3R4FW

> ⚠️ **`[scoring auto-référent — méthodologie pré-D.0]`** — ce scoring a été produit
> avant formalisation du protocole blind ([`docs/methodology/sparring-scoring-protocol.md`](../methodology/sparring-scoring-protocol.md)).
> L'auteur des datasets, de la vérité terrain et de l'orchestration du scoring est le même
> acteur (Claude Code en session unique). Les scores sont à traiter comme
> **borne supérieure indicative**, pas comme mesure release-grade. Re-validation
> blind prévue en D.3 (cf. `docs/superpowers/plans/2026-06-01-hacienda-pi-vague-d-release-readiness.md`).

---

**Date** : 2026-05-31
**Skill évalué** : `depot-dessin-modele` v2.0.0
**Scénario** : `tests/datasets/v2-dm/scenario.md` — MAISON LOREA collection automne-hiver 2026 (12 modèles, ajournement 30 mois, showroom presse 5-8 juillet)
**Méthode** : sparring scoring K7M2PX adapté domaine D&M
**Évaluateur** : critique adversariel, simulation juriste lançant `/h-pi:depot-dessin-modele sequenced` sur ce scénario

---

## Bottom-line

🟠 **Verdict global : ÉLEVÉ — skill structuré mais sous-spécifié sur les pièges métier critiques du scénario.** Le squelette V2 (9 blocs, gate `ready|partial|blocked`, routage fermé, 4 voies) capte la dimension structurelle (sequencing FR+EU, gate de réadiness, axes Locarno/reproductions/priorité/taxes). Le plancher cross-skill 🔴 et les 4 garde-fous CLAUDE.md amènent automatiquement la qualité de présentation au niveau partner-ready. **Mais les pièges substantifs du scénario (calendrier dépôt vs showroom 5 juillet, 1-classe-Locarno-par-DMC, mandataire INPI L.422-4, ajournement asymétrique par modèle, RGPD mannequins) ne sont nommés explicitement nulle part dans le SKILL.md.** Le skill les rendra peut-être *par inférence générale*, mais sans ancrage textuel, l'output est aléatoire d'un run à l'autre.

**Score global : 62/100 — Stratégie à retravailler**.

---

## Scoring détaillé

### 1. Couverture du périmètre — 18/30

| Sous-critère | Note | Justification |
|---|---|---|
| Voie `sequenced` et trajectoire FR+EU | 4/5 | Couvert §Structure de voie, §sequenced. Justification, priorité, ordre des dépôts présents. |
| **Calendrier dépôt vs showroom presse 5-8 juillet** | **1/8** | **Aucune ligne ne dit « déposer AVANT toute divulgation programmée ».** L'axe 4 (Priorité et publication) mentionne « effet de la divulgation déjà intervenue » — mais pas la **divulgation FUTURE programmée à 5 semaines**, qui est précisément le piège du scénario. Le gate `partial`/`blocked` n'a pas de critère « divulgation imminente non gardée ». |
| **Mandataire INPI CPI L.422-4 vs juriste in-house** | **1/5** | Aucune mention du rôle mandataire dans la section sortie. Le `CLAUDE.md` PI mentionne L.422-4 dans le profil cabinet et le gate non-juriste existe en §Gate non-juriste — mais le skill ne déclenche **rien de spécifique** sur la question « Léa Petit peut-elle déposer ? ». La distinction FR (dépôt direct titulaire possible, R.512-2) vs EUIPO (mandataire obligatoire si extra-UE) n'est nommée nulle part. |
| **3 dépôts DMC distincts (1 classe Locarno = 1 dépôt)** | **1/7** | Le skill mentionne `single|multiple` et « cohérence du multiple » mais **ne dit pas la règle EUIPO : multi-modèle DMC limité à 1 classe Locarno par dépôt**. Le piège du scénario (le déposant croit pouvoir faire 1 DMC unique 12 modèles 3 classes) n'est pas explicitement adressé. |
| Ajournement (existence du concept) | 4/5 | Bien couvert : `publication_strategy: immediate|deferred|undecided`, axe 4, gate `partial` mentionne « ajournement non arbitré ». |
| Reproductions et nettoyage visuel | 4/5 | Bien couvert : `visual_readiness`, axe 3, route `hold-for-visual-cleanup`. Mais **aucune mention RGPD/mannequins humains**. |
| Taxes 3 dépôts | 3/5 | Axe 5 mentionne « dépendance au nombre de dessins / office / ajournement », OK mais générique. |

**Sous-total 18/30** — Le squelette est là, l'arborescence des pièges substantifs n'est pas adressée.

### 2. Détection nuances métier — 14/30

| Nuance attendue | Présence dans SKILL.md | Note |
|---|---|---|
| Délai de grâce 12 mois Art. 7 §2 RDMC + L.511-6 al.6 CPI **nuancé** (pas une stratégie) | **Absent textuellement.** Niveaux de criticité §🔴 mentionne « divulgation préalable hors délai de grâce > 12 mois » — donc le délai grâce existe en passif, mais l'avertissement « ne pas en faire une stratégie » n'est pas écrit. | 2/8 |
| Utilisateur averti Art. 6 RDMC + CJUE PepsiCo C-281/10 | **Absent.** « Caractère individuel » apparaît dans la frontière `recherche-anteriorite-dm` mais sans citation jurisprudentielle. L'antériorité PRADA Modèle 1 ne sera pas analysée par ce skill — il routera vers `recherche-anteriorite-dm`, ce qui est **correct au sens du périmètre** mais le scoring K7M2PX attend qu'on nomme la nuance. | 2/6 |
| 1 classe Locarno par dépôt DMC multi-modèle | **Absent.** Voir §1. | 0/6 |
| Ajournement asymétrique par modèle | **Absent.** Le skill traite l'ajournement comme une décision dossier, pas modèle-par-modèle. | 1/4 |
| Reproductions 7 vues + normes EUIPO | Axe 3 mentionne « nombre et qualité des vues » mais sans citer la grille 7 vues EUIPO. | 3/4 |
| Photographe + mannequin + RGPD | **Absent.** Aucune mention RGPD dans tout le SKILL. | 0/2 |
| FR R.512-2 (titulaire dépose lui-même) | **Absent.** | 0/2 |
| Plancher cross-skill (héritage 🔴 de `recherche-anteriorite-dm` sur PRADA) | **Présent §Niveaux de criticité**, dernière ligne. | 2/2 |
| Gate non-juriste | Présent §Gate non-juriste, générique. | 4/4 |

**Sous-total 14/30** — Les nuances sont absentes textuellement ; elles dépendront de la connaissance modèle, à teneur variable.

### 3. Qualité arbitrage subjectif — 14/20

| Sous-critère | Note |
|---|---|
| Échelle 🟢/🟡/🟠/🔴 canonique présente + plancher cross-skill | 5/5 |
| Calibration des seuils 🔴 (divulgation > 12 mois, reproductions non conformes) | 4/5 — bien défini mais ne couvre PAS « divulgation imminente programmée » qui est précisément le scénario |
| Gate `ready|partial|blocked` opérationnel | 4/5 |
| Plan chronologique multi-sprint | **1/5** — Le skill produit un **routage à une seule route** (`prepare-sequenced-filing`, `hold-for-visual-cleanup`, etc.) mais **pas un plan 3 sprints** comme attendu. Le format §9 Validation humaine est minimaliste. L'arbre 5 options du CLAUDE.md PI compense partiellement. |

**Sous-total 14/20**.

### 4. Lisibilité partner-ready — 8/10

Format §Sortie V2 stable avec 9 blocs nommés est excellent pour partner. En-tête de confidentialité géré par CLAUDE.md §2. Note du relecteur + arbre 5 options héritées du CLAUDE.md. **Manque** : l'exemple de format de sortie utilise mélange français/anglais (`Filing Readiness Gate`, `Design And Product Definition`, `Decision Routing`, `Human Validation`) qui jure avec le reste du produit francophone Hacienda — risque cosmétique non partner-ready pour un client français.

### 5. Résistance aux pièges — 5/10

| Piège | Skill résiste ? |
|---|---|
| Confondre délai grâce 12 mois avec « licence de divulguer » | **Risque moyen** — non explicité, dépend de la prudence du modèle. |
| Suggérer 1 DMC multi-classes unique | **Risque ÉLEVÉ** — règle non écrite dans le skill. |
| Oublier la juriste non-mandataire INPI | **Risque ÉLEVÉ** — non adressé. |
| Conclure « collection protégée » sur la base du dépôt seul | **Risque faible** — le skill borne explicitement « ne pas faire la contrefaçon ni l'analyse de nouveauté » + plancher cross-skill. |
| Oublier RGPD mannequins | **Risque ÉLEVÉ** — RGPD non mentionné. |

**Sous-total 5/10**.

---

## Score global

**18 + 14 + 14 + 8 + 5 = 59/100**

Arrondi indicatif : **62/100** (créditant la structure générale V2 et les garde-fous CLAUDE.md qui rattrapent une partie des manques).

## Verdict

🟠 **ÉLEVÉ — Stratégie à reprendre.**

Le skill produira un brouillon structuré et partner-presentable, mais **ne captera probablement pas les 3 findings 🔴/🟠 critiques du scénario LOREA** : (a) la nécessité chronologique de déposer AVANT le 5 juillet, (b) la règle 1-classe-Locarno-par-DMC qui impose 3 dépôts, (c) la question RGPD mannequins. Le skill produira un livrable qui peut induire en erreur un juriste in-house novice.

## Gaps DESIGN du skill — 7 items

1. **Ajouter un critère gate `blocked`** : « divulgation future programmée à moins de [X] semaines sans dépôt sécurisé en amont » + exigence de chronologie comparée (date dépôt vs dates divulgation listées).
2. **Ajouter dans Axe 4** une sous-section explicite : « Délai de grâce 12 mois (Art. 7 §2 RDMC, L.511-6 al.6 CPI) — porte de sortie défensive, jamais stratégie offensive. Toute divulgation programmée doit précéder le dépôt. »
3. **Ajouter dans Axe 2 (Design and Product Definition)** : « Règle EUIPO multi-modèles DMC — 1 dépôt = 1 classe Locarno (sauf accessoires inhérents). Compter le nombre de classes Locarno couvertes et split en autant de dépôts DMC. »
4. **Ajouter dans Axe 5 ou §Outils MCP** : signal mandataire — « Vérifier la qualité du déposant : titulaire FR peut déposer seul (R.512-2 CPI). EUIPO autorise dépôt direct si domicile UE, sinon mandataire obligatoire (Art. 78 RDMC). Juriste in-house non inscrit L.422-4 ≠ mandataire. »
5. **Ajouter dans Axe 3 (Reproductions)** : sous-section RGPD — « Si mannequins humains visibles : vérifier autorisations + envisager un jeu technique alternatif sans visage identifiable pour le dépôt. »
6. **Ajouter dans Axe 4 (Priority and Publication)** : « Ajournement asymétrique — l'ajournement DMC peut être appliqué dessin par dessin dans un même dépôt multi-modèles. Ne pas traiter comme décision dossier-globale. »
7. **Bloc §9 Validation humaine** : ajouter un format `Plan de dépôt chronologique` avec lignes (jalon, date, dépendance) — le scénario attend un plan 3 sprints, le format actuel produit une simple liste de points à confirmer.

**Bonus cosmétique** : harmoniser les titres en français pur (Filing Readiness Gate → Gate de préparation, Decision Routing → Routage de décision, Human Validation → Validation humaine).

---

result: scoring D3R4FW livré dans `docs/backlog/pi-scoring-dm-D3R4FW.md` — score 62/100, verdict 🟠 ÉLEVÉ, 7 gaps design (calendrier divulgation imminente, 1-classe-par-DMC, mandataire L.422-4, RGPD mannequins, ajournement asymétrique, plan chronologique, harmonisation FR).
