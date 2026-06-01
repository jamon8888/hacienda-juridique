# Backlog consolidé — Vague C validation reproductible PI

> ⚠️ **`[scoring auto-référent — méthodologie pré-D.0]`** — ce scoring a été produit
> avant formalisation du protocole blind ([`docs/methodology/sparring-scoring-protocol.md`](../methodology/sparring-scoring-protocol.md)).
> L'auteur des datasets, de la vérité terrain et de l'orchestration du scoring est le même
> acteur (Claude Code en session unique). Les scores sont à traiter comme
> **borne supérieure indicative**, pas comme mesure release-grade. Re-validation
> blind prévue en D.3 (cf. `docs/superpowers/plans/2026-06-01-hacienda-pi-vague-d-release-readiness.md`).

---

**Date** : 2026-05-31
**Méthode** : sparring scoring K7M2PX adapté, 6 dossiers de test fictifs (un par domaine PI), 6 subagents Opus évaluateurs en parallèle.
**Référence** : `docs/superpowers/plans/2026-05-31-hacienda-pi-alignement-da-vagues-abc.md` § Vague C.
**Datasets** : `plugins/hacienda-propriete-intellectuelle/tests/datasets/v2-*/scenario.md` (chaque dossier inclut sa vérité terrain attendue + grille de scoring spécifique).

---

## Tableau de bord scoring

| Domaine | Skill évalué | Code | Score pondéré | Verdict | Gaps 🔴 | Gaps 🟠 | Gaps 🟡 | Bonus |
|---|---|---|---|---|---|---|---|---|
| Marques | `recherche-anteriorite-marque` | M7K3PX | **80,7 %** | 🟢 (juste au seuil) | 0 | 2 | 2 | 1 |
| Brevets | `preparation-depot-brevet` | B5N9QZ | **65,5 %** | 🟠 | 3 | 4 | 3 | 2 |
| D&M | `depot-dessin-modele` | D3R4FW | **62 %** | 🟠 | — | — | — | — |
| Droit auteur | `cession-droit-auteur` | A2T6JL | **69,5 %** | 🟠 | 2 | 3 | 4 | — |
| Logiciel / OSS | `revue-open-source` | S8W1HC | **76 %** | 🟡 | — | — | — | — |
| Contentieux PI | `contentieux-pi` | C9V5MK | **64 %** | 🟠 | — | — | — | — |
| **Moyenne pondérée** | — | — | **69,6 %** | 🟠 | — | — | — | — |

**Lecture du tableau** :
- 🟢 ≥ 80 % : exploitable partner-ready, gaps mineurs.
- 🟡 60-79 % : exploitable avec relecture senior, durcissement utile.
- 🟠 40-59 % : structurellement OK mais doctrine sous-armée, prévoir vague D ciblée.
- 🔴 < 40 % : non-prêt prod, bloquer usage métier.

---

## Diagnostic global — pattern transversal identifié

Les 6 skills cœur métier ont en commun un **squelette V2 procédural correct** (étapes numérotées, sections canoniques, gate non-juriste, échelle 🔴🟠🟡🟢, pré-flight check-pii, post-flight verifier-citations, modes courts). C'est l'effort vague A + vague B.

**Mais le contenu doctrinal y est sous-spécifié.** Les sous-évaluateurs convergent sur un même constat : le skill ne **nomme pas explicitement** les articles, jurisprudences et distinctions métier critiques que la vérité terrain attendrait. Conséquences :

1. **Faux négatif silencieux** : un junior ou un avocat en début de carrière produira une sortie qui *passe* le contrat de format (en-tête confidentialité + note relecteur + arbre 5 options + tableau coté) mais qui *rate* la substance (article L.131-3 mention obligatoire, L.615-5-1 renversement charge preuve produit nouveau, AGPL section 13 conditionnelle, etc.).
2. **Risque variabilité inter-runs** : sans ancrage textuel des nuances doctrinales, deux exécutions du même skill sur le même dossier peuvent produire des findings différents — dépendant de la connaissance modèle ambiante.
3. **Couverture vs ancrage** : la couverture de périmètre (poids 30 %) est globalement bonne (75-85 %), mais la détection des nuances métier critiques (poids 30 %) est faible (50-70 %). Les pondérations sont calibrées en conséquence, d'où des scores en dessous de 80 %.

**Implication pour la vague D** : la vague A a livré la sécurité (check-pii + échelle), la vague B a livré la qualité de format (refonte spa-review), la vague D doit livrer **l'ancrage doctrinal** dans les SKILL.md (références articles + jurisprudences + distinctions métier critiques par étape).

---

## Gaps consolidés et priorisés

### 🔴 Gaps bloquants (à traiter avant prochaine release majeure)

#### G1 — `preparation-depot-brevet` : doctrine délai de grâce asymétrique FR/CBE absente

**Constat** : le SKILL.md ne mentionne ni Art. 55 CBE, ni Art. L.611-13 CPI, ni la **différence critique avec le délai de grâce US (1 an générique)**. Sur le scénario B5N9QZ, l'article ACM CCS 2024 publié par 3 inventeurs détruit la nouveauté — mais un junior pourrait croire au délai de grâce français.

**Action** : ajouter une étape explicite « Vérification divulgation antérieure & calcul délai de grâce » dans la séquence Sortie, avec citation Art. 55 CBE (6 mois pour abus tiers ou expositions internationales reconnues) et précision Art. L.611-13 CPI (délai français restrictif).

#### G2 — `preparation-depot-brevet` : co-titularité INRIA / conventions de recherche absente

**Constat** : pas de checkpoint sur les conventions de recherche tiers (INRIA, CNRS, universités, conventions CIFRE) malgré le risque L.611-8 CPI (revendication propriété 5 ans). Sur le scénario B5N9QZ, c'est un gap structurant.

**Action** : ajouter étape « Audit chaîne titularité + conventions de recherche tiers » avant rédaction revendications, avec citation L.611-8 CPI.

#### G3 — `preparation-depot-brevet` : arbitrage EP large vs PCT 30 mois absent

**Constat** : la stratégie d'extension internationale n'est pas un livrable propre du skill, alors que l'arbitrage est central pour startups en levée (gel décisions Art. 4 PCT + entrée phase nationale Art. 22 PCT).

**Action** : ajouter section « Routage extension » avec arbitrage chiffré FR seul / FR+EP / FR+PCT / hybride.

#### G4 — `cession-droit-auteur` : nullité cession médias inconnus à venir non bloquée

**Constat** : le skill ne nomme pas la jurisprudence Cass. 1re civ. 9 oct. 1991 qui invalide les cessions « tous médias connus et à venir ». Sur le scénario A2T6JL, l'Article 3 du projet de contrat est nul de plein droit — un usage live pourrait ne pas le bloquer.

**Action** : ajouter, dans l'étape rédaction clause L.131-3, une garde-fou explicite « Refuser clauses "médias inconnus à venir" sans mécanisme de cession complémentaire ».

#### G5 — `cession-droit-auteur` : distinction L.131-3 (cession scénario) vs L.132-25 (œuvre AV producteur) absente

**Constat** : le scénario A2T6JL porte sur un scénario AVANT production de l'œuvre AV = L.131-3 classique s'applique, pas la présomption L.132-25. Le skill ne fait pas cette distinction.

**Action** : ajouter une décision tree début Sortie : « Œuvre déjà audiovisuelle produite ? → L.132-25 présomption / Œuvre en amont (scénario, bible) ? → L.131-3 classique ».

#### G6 — `contentieux-pi` : distinction procédé / produit absente, L.615-5-1 CPI absent, UPC absent

**Constat** : sur brevet pharma C9V5MK, le skill **rate 4 pièges sur 7** (cf. rapport C9V5MK § verdict). Le SKILL.md ne mentionne pas L.615-5-1 (renversement charge preuve produit nouveau), ne mentionne pas l'UPC (compétence par défaut sur brevets unitaires depuis 1er juin 2023), ne distingue pas brevet de procédé / produit, et **l'exemple 1 valide explicitement un référé sur seul constat huissier** (anti-pattern).

**Action urgente** : refondre l'exemple 1 du SKILL.md (saisie-contrefaçon AVANT référé sur brevet de procédé) + ajouter étape « Qualification type brevet (procédé / produit / dispositif) » + ajouter section « Compétence forum (TJ Paris L.615-17 vs UPC) » avec vérification statut brevet unitaire + opt-out + ajouter mention L.615-5-1 CPI dans étape Recevabilité.

### 🟠 Gaps importants (à traiter dans vague D ou avant releases secondaires)

#### G7 — `recherche-anteriorite-marque` : arrêt Matratzen Concord T-6/01 absent

**Constat** : référence canonique pour équivalents étrangers de marques manquante alors qu'elle est dans le scénario M7K3PX (« HACIENDA » = mot espagnol commun).

**Action** : ajouter Matratzen Concord T-6/01 dans la table d'arrêts CJUE canoniques de l'étape 6 Appréciation globale.

#### G8 — `recherche-anteriorite-marque` : mécanique Madrid IR sous-spécifiée

**Constat** : l'effet d'une IR Madrid sur les désignations spécifiques n'est pas explicité — risque de surcouverture territoriale supposée.

**Action** : ajouter sous-étape dans Knockout / Full « Cartographie désignations Madrid IR vs territoires visés ».

#### G9 — `preparation-depot-brevet` : antériorité brevet US non délivré Europe — gap implicite

**Constat** : sur scénario B5N9QZ, brevet Genentech US 9,876,543 « jamais validé Europe » = pas opposable en Europe stricto sensu, mais cite-able comme état de l'art. Distinction non guidée.

**Action** : ajouter dans étape Recherche antériorité un paragraphe « Statut juridictionnel des antériorités vs portée territoriale du dépôt envisagé ».

#### G10 — `preparation-depot-brevet` : L.611-7 inventions de mission salariés non checkpoint

**Constat** : le skill ne pousse pas à vérifier les contrats de travail des inventeurs salariés (L.611-7 CPI inventions de mission / hors mission attribuables).

**Action** : ajouter sous-étape Audit contrats travail dans étape Audit titularité.

#### G11 — `cession-droit-auteur` : titre antérieur L.112-4 al.2 absent

**Constat** : le skill ne mentionne pas la protection du titre par L.112-4 al.2 alors que c'est un finding 🟠 du scénario A2T6JL.

**Action** : ajouter dans étape Audit titularité un checkpoint « Vérification antériorité titre (L.112-4 al.2) ».

#### G12 — `cession-droit-auteur` : co-écriture salariée non clarifiée (limite L.113-9 logiciel)

**Constat** : le skill ne pousse pas à distinguer le régime logiciel L.113-9 (cession automatique employeur) du régime des autres œuvres (cession non automatique = contrat travail explicite requis).

**Action** : ajouter sous-étape « Identification co-auteurs salariés + audit contrats travail (L.113-9 logiciel uniquement) ».

#### G13 — `cession-droit-auteur` : personnages inspirés personnes réelles (droit à l'image)

**Constat** : risque non couvert (droit à l'image + vie privée) malgré contexte audiovisuel fréquent.

**Action** : ajouter checkpoint « Personnages inspirés de personnes réelles → garantie d'éviction étendue + autorisations écrites ».

#### G14 — `revue-open-source` : LGPL §6 linking statique vs dynamique explicite

**Constat** : la distinction linking statique = bascule GPL / linking dynamique = LGPL préservée est centrale pour le scoring OSS, mais n'est pas un checkpoint explicite. Sur S8W1HC c'est le finding 🔴 #1 (ffmpeg-libs statique = contamination NexusEdge entier).

**Action** : ajouter étape « Analyse linking statique vs dynamique sur composants LGPL ».

#### G15 — `revue-open-source` : AGPL section 13 conditionnelle

**Constat** : le skill ne précise pas que AGPL section 13 ne s'active que si modification + interaction réseau utilisateurs. Risque de faux positif AGPL en interne (un junior interdira `monitoring-agent` à tort).

**Action** : ajouter dans étape Classification une note « AGPL section 13 conditionnelle — usage interne pur sans modif + sans interaction réseau utilisateur = pas d'obligation source disclosure ».

#### G16 — `revue-open-source` : Classpath exception ambiguë

**Constat** : application à `fast-cgi` discutable, alors que c'est utilisé hors OpenJDK / GNU Classpath.

**Action** : ajouter une note « Classpath exception — vérifier l'origine de l'exception et l'application au composant concerné ».

#### G17 — `revue-open-source` : distinction SaaS hosted vs distribution classique

**Constat** : pivot doctrinal majeur pour GPL/LGPL — appréciation différente en SaaS (pas de distribution) vs on-premises (distribution). Pas un checkpoint explicite.

**Action** : ajouter en début de séquence Sortie une étape « Qualification scope d'exploitation : SaaS hosted / distribution classique / hybride » avec impact sur classification.

#### G18 — `contentieux-pi` : référé en l'état risque rejet + dommages

**Constat** : pas de garde-fou sur les conditions strictes L.615-3 (titre vraisemblablement valable + atteinte vraisemblable) ni mention art. 1240 C.civ procès abusif.

**Action** : durcir l'étape Mesures provisoires avec gate « Référé brevet condition cumulative + risque art. 1240 si échec ».

#### G19 — `contentieux-pi` : AMM ≠ FTO pour biosimilaires

**Constat** : pas d'avertissement sur la confusion fréquente AMM (autorisation de mise sur le marché) ≠ liberté d'exploitation (FTO).

**Action** : ajouter note dans étape Qualification dossier « AMM (biosimilaire ou autre) ≠ FTO — vérifier brevets tiers indépendamment ».

#### G20 — `contentieux-pi` : pression interne client à modérer

**Constat** : le skill ne guide pas l'arbitrage entre vitesse demandée par le client (« 30 jours assignation ») et qualité de la procédure.

**Action** : ajouter dans la section Ton un paragraphe « Pression interne client — la qualité de la procédure prime sur la vitesse ».

### 🟡 Gaps mineurs (nice-to-have)

#### G21 — `recherche-anteriorite-marque` : anti-pivot vers classes hors business

**Action** : explicite « ne JAMAIS suggérer de déposer en classes étrangères au business pour contourner antériorités ».

#### G22 — `recherche-anteriorite-marque` : plancher distinctivité faible

**Action** : préciser qu'un signe à distinctivité intrinsèque faible reste protégé une fois enregistré.

#### G23-G27 — `preparation-depot-brevet` : nuances (multi-claiming, biosimilaire vs FTO, expositions internationales reconnues, statut UPC, gel PCT 30 mois) à ancrer explicitement.

#### G28-G31 — `cession-droit-auteur` : 4 nuances droit moral perpétuel post mortem, jurisprudence forfait, RFA inscription, RGPD personnages réels.

#### G32-G34 — `depot-dessin-modele` : 7 gaps (gate divulgation programmée, délai grâce 12 mois explicite défensif, 1 classe Locarno = 1 DMC, qualité déposant L.422-4, RGPD mannequins, ajournement asymétrique, plan multi-sprints).

#### G35-G36 — `revue-open-source` : matrice produit × licence, statut « non-prêt DD SPA ».

#### G37 — `contentieux-pi` : exemple 1 à refondre (anti-pattern référé sur seul constat huissier).

### `[bonus]` Patterns plus matures que la vérité terrain

#### `recherche-anteriorite-marque` : séparation modes (`--knockout` / `--full` / `--watchlist`) + plancher cross-skill mieux verrouillés que la vérité terrain ne le demande.

#### `preparation-depot-brevet` (2 bonus) : contrat V2 strict + Seuil de préparation du dépôt + routage fermé FR/EP/PCT/sequenced.

---

## Plan d'action — Vague D (proposition)

### D.1 — Ancrage doctrinal des SKILL.md cœur métier

**Objectif** : transformer les gaps 🔴 et 🟠 en sections explicites + checkpoints dans les SKILL.md.

**Cibles prioritaires** (par ordre d'urgence) :

1. **`contentieux-pi`** — refondre exemple 1 (saisie avant référé) + ajouter UPC + L.615-5-1 + distinction procédé/produit (G6, G18, G19, G20, G37). **Bloquant prod brevet pharma.**
2. **`preparation-depot-brevet`** — ajouter Art. 55 CBE / L.611-13 délai de grâce + L.611-8 conventions recherche + arbitrage EP/PCT + L.611-7 inventions salariés (G1, G2, G3, G9, G10).
3. **`cession-droit-auteur`** — ajouter jurisprudence Cass. 1991 médias futurs + L.131-3 vs L.132-25 + L.112-4 al.2 titre + co-écriture L.113-9 (G4, G5, G11, G12, G13).
4. **`revue-open-source`** — ajouter LGPL §6 statique/dynamique + AGPL §13 conditionnelle + Classpath origine + qualification scope SaaS/distribution (G14, G15, G16, G17).
5. **`recherche-anteriorite-marque`** — ajouter Matratzen Concord + Madrid IR mécanique (G7, G8). Skill déjà au seuil 🟢.
6. **`depot-dessin-modele`** — 7 gaps (D3R4FW backlog) — ancrage multi-classes Locarno + délai grâce défensif + RGPD mannequins.

### D.2 — Méthode d'ancrage doctrinal

Pour chaque skill, l'ancrage prend la forme de :

1. **Citation explicite** d'articles CPI / CBE / RMUE / RDMC dans les étapes numérotées (pas seulement dans le frontmatter).
2. **Jurisprudence canonique nommée** (Sabel C-251/95, Canon C-39/97, Lloyd C-342/97, L'Oréal Bellure C-487/07, PepsiCo C-281/10, Cass. 1991 médias futurs, etc.).
3. **Distinction métier critique** documentée en garde-fou (procédé vs produit ; SaaS vs distribution ; cession scénario vs œuvre AV ; etc.).
4. **Anti-patterns** explicites dans la section « Ce skill ne fait pas » (ne pas valider référé brevet sur seul constat ; ne pas valider rémunération forfaitaire automatiquement ; etc.).

### D.3 — Validation post-vague-D

Refaire un sparring scoring (même 6 dossiers, mêmes codes M7K3PX / B5N9QZ / D3R4FW / A2T6JL / S8W1HC / C9V5MK) après livraison de la vague D, et viser :
- Marques ≥ 90 %
- Brevets ≥ 80 %
- D&M ≥ 75 %
- Droit auteur ≥ 80 %
- OSS ≥ 85 %
- Contentieux ≥ 80 %

**Moyenne cible vague D** : ≥ 82 % (vs 69,6 % actuel).

---

## Coordination

- **Vague D** est un chantier docs-only (modifications des SKILL.md uniquement, pas de code TypeScript).
- Aucun nouvel agent. Aucun nouveau skill. Aucune nouvelle catégorie de tags.
- Format inchangé : `## Examples`, `## Étape N — ...`, `## Niveaux de criticité`, `## Ce skill ne fait pas`.
- Effort estimé : ~12-16 h équivalent humain pour les 6 skills cibles, parallélisable via subagent Opus un par skill.
- Pas d'urgence release immédiate : vague D peut suivre un rythme de 2-3 semaines avec validation interne associé entre chaque skill durci.

**Recommandation lancement vague D** : prioriser `contentieux-pi` (talon d'Achille brevet pharma — bloquant) + `preparation-depot-brevet` (3 gaps 🔴), puis `cession-droit-auteur`, puis le reste.

---

## Annexes — liens rapports détaillés

- [pi-scoring-marque-M7K3PX.md](./pi-scoring-marque-M7K3PX.md)
- [pi-scoring-brevet-B5N9QZ.md](./pi-scoring-brevet-B5N9QZ.md)
- [pi-scoring-dm-D3R4FW.md](./pi-scoring-dm-D3R4FW.md)
- [pi-scoring-auteur-A2T6JL.md](./pi-scoring-auteur-A2T6JL.md)
- [pi-scoring-oss-S8W1HC.md](./pi-scoring-oss-S8W1HC.md)
- [pi-scoring-contentieux-C9V5MK.md](./pi-scoring-contentieux-C9V5MK.md)
