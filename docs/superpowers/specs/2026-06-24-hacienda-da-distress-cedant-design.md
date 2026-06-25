# Orientation distress côté cédant (`distress-cedant`) — Design doc

> **Troisième et dernière pièce du pan cédant/débiteur** du moat distressed-M&A :
> le routeur d'entonnoir, miroir de `asset-vs-share-distress` (côté repreneur).
> Repo : `jamon8888/hacienda-juridique`. Plugin : `plugins/hacienda-droit-affaires`
> (DA). Skill : `distress-cedant`. Handoff de référence :
> `docs/handoff/handoff-2026-06-24-responsabilite-dirigeant.md`.

## 1. Contexte & place dans le pan

Le pan cédant/débiteur a désormais **deux feuilles** doctrinales livrées —
`declaration-cessation-paiements` (DCP, ADMIS gate-clean) et
`responsabilite-dirigeant` (ADMIS gate-clean RDG1RT) — plus `prevention-difficultes`.
`distress-cedant` est la **dernière pièce** : le **routeur** qui coiffe le pan,
construit en dernier (feuilles d'abord, comme pour le moat repreneur où
`asset-vs-share-distress` est arrivé après ses feuilles).

| Pièce | Statut |
|---|---|
| A — **`distress-cedant`** (routeur cédant) | **ce doc** |
| B — `declaration-cessation-paiements` | livré (v0.11.0) |
| C — `responsabilite-dirigeant` | livré (v0.12.0) |
| `prevention-difficultes` | préexistant |
| `pre-pack-cession` | préexistant (side-aware débiteur/repreneur) |

**Pourquoi maintenant.** Avec 3 destinations cédant réelles
(`prevention-difficultes` / `declaration-cessation-paiements` /
`responsabilite-dirigeant`) plus `pre-pack-cession` (montage), le routeur a enfin
un **vrai arbre de décision**. Avec 2 feuilles il aurait été trivial.

## 2. Objectif

Côté **cédant/débiteur** (le dirigeant ou l'actionnaire d'une entreprise en
difficulté, et son conseil M&A/PE). `distress-cedant` est l'**entonnoir
d'orientation** : il diagnostique le niveau de difficulté, éclaire l'arbitrage
stratégique **sauver / céder / déposer**, cartographie l'exposition du dirigeant
comme facteur transverse, puis **route** vers la bonne feuille. **Il décide et
oriente, il n'exécute pas** : ni demande de prévention, ni déclaration de
cessation des paiements, ni montage de cession, ni évaluation de la responsabilité
du dirigeant — chacun relève de la feuille dédiée. Miroir exact de
`asset-vs-share-distress` côté vendeur. Brouillon, **validation humaine (avocat)
OBLIGATOIRE**.

## 3. Décisions structurantes (Q1–Q4 résolues en brainstorming)

| # | Décision | Raison |
|---|---|---|
| Q1 | **Axe organisateur = diagnostic niveau de difficulté + fork « sauver / céder / déposer »** | Symétrie exacte avec `asset-vs-share-distress` (Gate 1 diagnostic + une décision centrale ; titres/actifs côté repreneur ↔ sauver/céder/déposer côté cédant). Le fork est la question que le dirigeant pose et qu'aucune feuille ne tranche (prévention suppose qu'on sauve, DCP qu'on dépose, pre-pack qu'on cède). |
| Q2 | **Double gate miroir** : G1 diagnostic + pivot 45 j (routage débiteur) ; G2 exposition dirigeant transverse | Miroir de `asset-vs-share-distress` (G1 difficulté + G2 responsabilité repreneur). Le pivot 45 j **route à l'inverse** du repreneur (voir §4). G2 pèse sur le fork (dirigeant exposé → déposer vite). |
| Q3 | Naming **`distress-cedant`** | Que du jargon praticien : « distress » = l'anglicisme réel du M&A/PE et du restructuring (déjà vocabulaire maison via `asset-vs-share-distress`) ; « cédant » = la partie venderesse, miroir de `repreneur`. Side non-ambigu (critère éliminant `entreprise-en-difficulte`). Scanne en paire avec le buy-side. Ordre `distress-cedant` (side après le mot-clé scanné) retenu ; `cedant-distress` était l'alternative suffixe. |
| Q4 | **Carte de routage miroir + fork `cas` par side** | La ligne `cas` « entreprise en difficulté » fork repreneur→`asset-vs-share-distress` / cédant→`distress-cedant`. |

## 4. Gate & flux (le cœur)

### Gate 1 — diagnostic du niveau de difficulté + routage (pivot 45 j)

Situer la cible sur le spectre et **router selon le côté débiteur** :

| Situation diagnostiquée | Voies ouvertes | Route vers |
|---|---|---|
| Pas (encore) en CdP / difficulté prévisible | amiable (mandat ad hoc, conciliation), sauvegarde | `prevention-difficultes` (sauver) ; `pre-pack-cession` si on prépare une cession |
| **CdP ≤ 45 j** | amiable encore ouvert (conciliation L.611-4), cession préparable | `prevention-difficultes` (sauver) **ou** `pre-pack-cession` (céder) |
| **CdP > 45 j** | amiable **fermé** ; obligation de déclarer (L.631-4) | **`declaration-cessation-paiements`** (déposer) |
| RJ/LJ déjà ouverte | procédure en cours | selon le fork : `pre-pack-cession` si la cession était préparée en amont ; sinon signaler le rôle limité du débiteur (voir §5 trou côté débiteur) |

**Pivot 45 j — route à l'INVERSE du repreneur (point critique).** Chez
`asset-vs-share-distress`, CdP > 45 j non déclarée → « la *cible* doit déclarer →
`prevention-difficultes` » (le repreneur ne peut pas structurer librement). Chez
`distress-cedant`, **le débiteur EST celui qui doit déclarer** → CdP > 45 j →
**`declaration-cessation-paiements`** directement, l'amiable est fermé. Ne jamais
renvoyer un débiteur en CdP > 45 j vers la prévention : c'est l'erreur qui trompe
le client (obligation de dépôt manquée → faute de gestion, expo L.651-2/L.653-8).

### Gate 2 — exposition dirigeant (transverse, miroir « responsabilité repreneur »)

Quel que soit le fork, signaler que le choix de la voie **engage le patrimoine du
dirigeant** : déposer tard aggrave (faute de gestion, L.651-2, L.653-8, période
suspecte), une conciliation L.611-4 demandée à temps atténue le reproche de
retard. **A signale et route vers `responsabilite-dirigeant` ; il n'évalue pas**
(c'est la feuille C qui évalue les 4 axes). Parallèle exact à la cartographie
« responsabilité repreneur » de `asset-vs-share-distress`.

### Flux

1. Intake + pré-flight `check-pii` (dénomination + dirigeant → seuil B fréquent).
2. Lecture profil cabinet (blocs M&A + procédures collectives), confirmer **côté
   cédant/débiteur**.
3. **Gate 1** : lookup BODACC (`bodacc_procedures` / `bodacc_by_siren` /
   `company_full_profile`) → situer la difficulté, CdP datée ? procédure ouverte ?
   Router selon la table ci-dessus.
4. **Arbitrage sauver / céder / déposer** : éclairer les 3 voies sans trancher à la
   place du client (le niveau de difficulté **détermine** lesquelles sont encore
   ouvertes).
5. **Gate 2** : cartographier l'expo dirigeant comme facteur transverse → route
   `responsabilite-dirigeant`.
6. **Routage** + question hors-checklist + arbre 5 options.

## 5. Frontière de périmètre (anti-redondance + anti-débordement)

| Skill | Frontière |
|---|---|
| `cas` | Front door **global** (tous types de dossiers, side-agnostique). `distress-cedant` est le **sous-routeur** du seul segment « entreprise en difficulté, côté cédant/débiteur ». La ligne `cas` fork repreneur/cédant. |
| `prevention-difficultes` (feuille) | Déjà **engagée dans la branche amiable** (choix mandat ad hoc / conciliation / sauvegarde accélérée). `distress-cedant` est **au-dessus** : il décide *si* on est en territoire prévention vs cession vs dépôt. Il ne refait pas le sous-choix amiable. |
| `declaration-cessation-paiements` (feuille) | DCP **qualifie** la CdP en profondeur et rédige la déclaration. `distress-cedant` **diagnostique grossièrement** (CdP datée ? > 45 j ?) pour router, sans rédiger ni requalifier finement. |
| `responsabilite-dirigeant` (feuille) | C **évalue** les 4 axes. `distress-cedant` **signale** l'expo comme facteur du fork et route. Il n'évalue pas. |
| `pre-pack-cession` (feuille, side-aware) | Monte la cession préparée. `distress-cedant` route vers lui (côté débiteur) quand le fork est « céder ». |
| `asset-vs-share-distress` | **Strictement côté repreneur.** `distress-cedant` est **strictement côté cédant/débiteur.** Aucun chevauchement de side. Les deux sont les sous-routeurs symétriques sous la ligne `cas` « entreprise en difficulté ». |
| **Trou côté débiteur (RJ/LJ subie, cession judiciaire en cours)** | Une fois la cession judiciaire lancée, elle est **pilotée par l'administrateur** ; les skills `reprise-a-la-barre` / `cession-actifs-isoles` sont côté **acheteur**. Il n'existe pas de feuille « vendre à la barre côté débiteur ». `distress-cedant` **signale le rôle limité du débiteur** à ce stade plutôt que de router vers une feuille débiteur inexistante. Candidat futur hors scope (cf. §10). |
| Conseil fiscal | Hors scope. Nommer si signaux, renvoi conseil fiscal. |

## 6. Anti-fabrication (verrouillé dès le SKILL.md)

Routeur distress = mêmes pièges que les feuilles (cf.
`[[feedback-date-fabrication-scoring-variance]]`). Raisonner **à la date du jour**
(comme `asset-vs-share-distress`, dates absolues pour le diagnostic), mais :

- **Ne pas fabriquer la date de CdP** : elle se déduit de pièces datées / est fixée
  par le tribunal. Le pivot 45 j s'apprécie **conditionnellement** (« si la CdP est
  caractérisée et date de plus de 45 j, alors… ») tant que la date n'est pas
  établie. Ne pas convertir une approximation client en date calendaire.
- **Ne pas chiffrer** l'insuffisance, le passif ou la caution (déféré aux feuilles).
- **Ne pas évaluer** l'expo dirigeant (déféré à C) ni qualifier finement la CdP
  (déféré à DCP) : `distress-cedant` diagnostique pour router, il ne conclut pas.
- **Ne pas trancher le fork** à la place du client : éclairer sauver/céder/déposer,
  recommander `[review]`, laisser décider.

## 7. Livrable

Note d'orientation (mirror `asset-vs-share-distress` §Sortie), côté cédant :

```
[En-tête de confidentialité selon le rôle]

> ⚠️ Note du relecteur (bloc unique)
> - Sources : Légifrance ✓ / BODACC ✓ / Judilibre ✓ / Pappers ✓
> - Lecture : situation décrite + {N} pièces
> - Signalé pour ton jugement : {N} [review] (niveau de difficulté, choix de voie, expo dirigeant)
> - Fraîcheur : réforme du 15 septembre 2021 (ord. directive restructuration) — vérifier seuils/délais
> - Avant de t'appuyer dessus : {ex. faire confirmer la date de CdP par l'expert-comptable}

# Orientation distress — note [CÔTÉ cédant/débiteur]

# 1. Diagnostic du niveau de difficulté (Gate 1)
- Cible située : {in bonis avec difficultés / amiable / CdP ≤45 j / CdP >45 j / RJ-LJ ouverte} (lookup BODACC). CdP : {datée ? / >45 j ? / non caractérisée} [review]
- {Si CdP >45 j → obligation de déposer → `declaration-cessation-paiements` (l'amiable est fermé)}

# 2. Arbitrage sauver / céder / déposer
| Voie | Quand | Vers |
|---|---|---|
| **Sauver** (prévention/restructuration) | pas/plus en CdP ou CdP ≤45 j | `prevention-difficultes` |
| **Céder** (cession préparée) | amiable ou pré-procédure | `pre-pack-cession` |
| **Déposer** (dépôt de bilan) | CdP >45 j ou redressement impossible | `declaration-cessation-paiements` |
- Le niveau de difficulté **détermine** les voies encore ouvertes ; ne pas trancher à la place du client [review]

# 3. Exposition du dirigeant (Gate 2 — transverse)
- Le choix de la voie engage le patrimoine du dirigeant ; déposer tard aggrave (faute de gestion, L.651-2, L.653-8, période suspecte). Conciliation L.611-4 demandée à temps = atténuant.
- → `/h-da:responsabilite-dirigeant` pour l'évaluation des 4 axes. {Signalé, pas évalué.}

# 4. Recommandation & routage
- Voie recommandée : {sauver / céder / déposer} — justification distress-aware [review]
- Renvois : `prevention-difficultes` / `pre-pack-cession` / `declaration-cessation-paiements` / `responsabilite-dirigeant` / conseil fiscal externe si dimension fiscale
- {Si RJ/LJ subie + cession judiciaire en cours : rôle limité du débiteur ; les organes pilotent ; skills repreneur = côté acheteur}

# Une question hors de ma checklist habituelle
{ex. articulation prix/garantie dans une cession distress, NEWCO, intérêt d'une conciliation avant cession. Omettre si rien d'honnête.}

# Que veux-tu faire ? Choisis une option :
1. Rédiger — note de recommandation de voie pour le client / les actionnaires.
2. Escalader — note vers {approbateur configuré} pour décision stratégique.
3. Compléter les faits — questions (date de CdP, état du passif, calendrier).
4. Surveiller et attendre — suivi avec point de revisite.
5. Autre — précise.
```

**Mode silencieux** si livrable destiné au dirigeant/actionnaires (non-juristes) :
couper la narration de skill, sortir les renvois inter-commandes, garder en-tête +
note du relecteur condensée.

## 8. Base légale & sources

- **L.631-1** (CdP), **L.631-4 / L.640-4** (obligation de déclarer, délai 45 j),
  **L.611-4** (conciliation, fermée si CdP > 45 j), **L.631-8** (date de CdP fixée
  par le tribunal), **L.632-1 / L.632-2** (période suspecte — *nommées*, déférées),
  **L.651-2 / L.653-8** (expo dirigeant — *nommées*, déférées à C).
- Réforme du **15 septembre 2021** (ord. transposition directive restructuration) :
  trigger fraîcheur sur seuils/délais.
- Sources : **BODACC** (`bodacc_procedures` / `bodacc_by_siren`), **Pappers /
  Annuaire** (`company_full_profile`) pour situer la difficulté ; **Légifrance**
  (articles) ; **Judilibre** (jurisprudence). Outils MCP : `piste_status`,
  `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`,
  `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`,
  `company_full_profile`, `bodacc_by_siren`, `bodacc_procedures`.

## 9. Méthodologie de build

**`distress-cedant` est doctrinal** (diagnostic à conséquences : le pivot 45 j et
la recommandation de voie peuvent tromper le client si erronés), **comme son
miroir `asset-vs-share-distress`** (qui a été scoré blind, cycle AVS1RT) — et
**non** comme `cas` (pur aiguilleur, éval de routage). → **scoring blind 4 phases**
obligatoire.

- **Allocation modèle** : design + analyse gate-driven = **Opus** ; build T1-T4 +
  Phase 3 live = **Sonnet** ; Phase 2 + Phase 4 = **Codex (HIGH / medium)**. Cf.
  `[[feedback-token-economy-codex]]`. **Token economy : Candy lance les commandes
  de scoring** (wrapper `scripts/da-scoring.sh`) ; Claude prépare les prompts.
- **Checkpoint gates pré-live obligatoire** : relire les CRITIQUE (PASS = complément
  exact du FAIL), recalibrer tout gate-recall **avant** Phase 3, jamais après. Cf.
  `[[feedback-gate-calibration-scoring]]` (3 gates recalibrés sur le cycle C).
- **Code de cycle : 6 caractères** alphanumériques majuscules (le validateur du
  wrapper rejette 5 car. — leçon RD1RT→RDG1RT). Proposé : **`DCD1RT`**.
- **Dataset** : `plugins/hacienda-droit-affaires/tests/datasets/da-distress-cedant/`.
  Scénario fictif exerçant le **pivot 45 j ambigu** (CdP datée incertaine → router
  prévention vs DCP), un fork sauver/céder/déposer non tranché, une expo dirigeant
  à signaler-pas-évaluer, et au moins un piège de fabrication de date.
- **Cible** : ADMIS gate-clean.

## 10. Surface technique

- Skill `plugins/hacienda-droit-affaires/skills/distress-cedant/SKILL.md` (squelette
  V2 canonique imposé par `hacienda-droit-affaires-cowork-structure.test.ts` :
  Examples / Chargement du profil / Intake / Gate non-juriste / Outils MCP à
  privilégier / Emplacement des sorties / Sortie ; frontmatter `version: "2.0.0"` +
  `argument-hint`).
- Wrapper jumeau `commands/h-da/distress-cedant.md` (description + argument-hint
  identiques).
- Entrée README (tableau Commandes, ordre alpha) + ligne Périmètre V2.
- **Edit `cas`** : la ligne « Entreprise en difficulté → `asset-vs-share-distress` »
  devient un **fork par side** (repreneur → `asset-vs-share-distress` ; cédant →
  `distress-cedant`).
- Count skills : **29 → 30**.
- Bump version **v0.12.0 → v0.13.0** (version.json, manifest.json,
  mcp-server/package.json, .claude-plugin/plugin.json, .claude-plugin/marketplace.json
  ×2) + CHANGELOG.
- Enregistrer `distress-cedant` dans `scripts/da-scoring.sh` (SKILLS array + 6
  fonctions + usage ; code défaut `DCD1RT`, 6 caractères).

## 11. Hors scope (→ futurs cycles)

- **Feuille « vendre à la barre côté débiteur »** (cession judiciaire RJ/LJ subie,
  côté cédant) — le trou identifié §5. Aujourd'hui `distress-cedant` signale le
  rôle limité du débiteur ; une feuille dédiée pourrait l'outiller plus tard.
- **`defense-comblement-passif`** (mémoire en défense, déjà hors scope de C).
- **Mode `--review`** (relire une note d'orientation déjà rédigée) — non prévu v1.
- **AMF / cibles cotées** — anticipation v2.
- **Conseil fiscal** (déficits, droits d'enregistrement, solidarité) — flag + renvoi.

---

**Note de clôture du pan.** Avec `distress-cedant`, le pan cédant/débiteur est
**complet et symétrique** au pan repreneur : `cas` → (repreneur)
`asset-vs-share-distress` → feuilles repreneur ; `cas` → (cédant)
`distress-cedant` → `prevention-difficultes` / `declaration-cessation-paiements` /
`pre-pack-cession` / `responsabilite-dirigeant`. Le moat distressed-M&A est lisible
des deux côtés.
