# Déclaration de cessation des paiements (DCP) — Design doc

> Premier skill du **pan cédant/débiteur** du moat distressed-M&A (pendant
> symétrique du moat repreneur). Repo : `jamon8888/hacienda-juridique`. Plugin :
> `plugins/hacienda-droit-affaires` (DA). Skill : `declaration-cessation-paiements`
> (nom provisoire, ajustable — « dépôt de bilan » en colloquial).
> Handoff de référence : `docs/handoff/handoff-2026-06-15-asset-vs-share-distress.md`.

## 1. Contexte & place dans le pan

Le moat distressed-M&A est aujourd'hui quasi-100 % côté **repreneur**
(`asset-vs-share-distress`, `reprise-a-la-barre`, `cession-actifs-isoles`,
`pre-pack-cession`), `prevention-difficultes` étant le seul skill nettement côté
**débiteur**. Le **pan cédant/débiteur** comble la symétrie. Il comporte trois
trous identifiés :

- **A. Orientation/arbitrage cédant** — entonnoir (miroir de `asset-vs-share-distress`).
- **B. Déclaration de cessation des paiements (DCP)** — ce doc.
- **C. Responsabilité du dirigeant** — insuffisance d'actif L.651-2, sanctions.

**Ordre retenu : B d'abord.** Raisons : (1) c'est une **feuille**, et le moat
repreneur a été bâti feuilles-d'abord, routeur (A) en dernier ; (2) B est le
**miroir de `declaration-creance`** (structure éprouvée : qualification +
deadline + livrable formaté) ; (3) le futur routeur A pointera vers B une fois B
livré.

## 2. Objectif

Côté **débiteur/dirigeant**. La cessation des paiements (CdP) étant établie,
produire la **déclaration de cessation des paiements** à déposer au greffe :
qualification de la CdP, calcul du délai légal de 45 jours, checklist des pièces
R.631-1, orientation RJ/LJ, et **rédaction du squelette** de la déclaration. Le
skill **rédige le templatable** et ne fabrique **jamais** les chiffres du client.
Brouillon, **validation humaine (avocat) OBLIGATOIRE**.

## 3. Frontière de périmètre (point critique anti-redondance)

Scope retenu : **« constat + déclaration »** (tight mirror), pas le diagnostic
large « déclarer vs prévention » (qui appartient à `prevention-difficultes` et au
futur A).

| Skill | Frontière |
|---|---|
| `prevention-difficultes` | si pas (encore) en CdP → là-bas (amiable / sauvegarde). **B suppose la CdP établie** (ou la teste via un gate binaire). |
| `pre-pack-cession` | montage de cession confidentiel ; **B = ouverture de la procédure** (le dépôt lui-même). |
| `declaration-creance` | côté **créancier** (déclarer sa créance dans une procédure ouverte). **B = côté débiteur** (ouvrir la procédure). Miroir exact. |
| futur **C** (resp. dirigeant) | **B nomme** l'exposition (déclaration tardive), **C l'évalue** (faute caractérisée, quantum, défenses). |
| futur **A** (orientation cédant) | **A routera vers B** ; B est une feuille. |

## 4. Gate & flux

**Gate CdP (miroir du pattern moat) :**
- La CdP est-elle établie ? Test **L.631-1** : *impossibilité de faire face au
  passif exigible avec l'actif disponible*. Si **non** → renvoi
  `prevention-difficultes` (mandat ad hoc / conciliation / sauvegarde encore
  ouverts tant qu'on n'est pas en CdP).
- La **date de CdP** est un **jugement** lourd de conséquences (la période
  suspecte court à rebours depuis elle) → tag `[review]` systématique.

**Calcul délai + alerte tardive :**
- 45 jours depuis la date de CdP (**L.631-4** RJ / **L.640-4** LJ). Calculer le
  restant ou le dépassement.
- Si dépassé / proche → **alerte tardive** : *nommer* l'exposition (déclaration
  tardive = faute de gestion possible, **L.651-2** insuffisance d'actif, période
  suspecte rallongée depuis la date de CdP) + renvoi de l'**évaluation** à C /
  validation avocat. B nomme, il n'évalue pas (cf. §3). Tant que C n'existe pas,
  le renvoi est « fais valider ta responsabilité par un avocat » (pas de lien
  mort `/h-da:C` ; on branchera le lien quand C sortira).

**Flux complet :**
1. **Intake** : identité société ; date présumée de CdP (ou éléments actif
   disponible / passif exigible pour la qualifier) ; forme sociale (→ tribunal
   compétent) ; RJ ou LJ envisagé.
2. **Gate CdP** → qualifier ; router `prevention-difficultes` si pas établie.
3. **Délai** → calculer restant/dépassé ; alerte tardive le cas échéant.
4. **Tribunal compétent** : tribunal de commerce (commerçants, sociétés
   commerciales, artisans) vs tribunal judiciaire (professions libérales,
   agricoles, civiles).
5. **Orientation RJ/LJ** : redressement possible → RJ ; manifestement impossible
   → LJ (**L.640-1**) ; sauvegarde exclue car CdP. Flag : **le tribunal décide**,
   le dirigeant demande.
6. **Livrable** (§5).

## 5. Livrable

**Déclaration rédigée (squelette) + checklist pièces** (mirror `declaration-creance`) :

- **Déclaration de CdP rédigée** : identité débiteur, date de CdP + justification
  (actif disponible / passif exigible), demande RJ ou LJ, base légale — avec
  `[à compléter]` sur **tous** les chiffres que le modèle n'a pas.
- **Checklist des pièces R.631-1 C.com.** : comptes annuels du dernier exercice,
  situation de trésorerie (datée < 1 mois), état chiffré des créances et dettes
  avec noms et domiciles des créanciers, état actif et passif des sûretés +
  engagements hors bilan, inventaire des biens, nombre de salariés + chiffre
  d'affaires, nom et adresse des représentants du personnel. → contenu tabulaire
  → **dashboard HTML auto** (`renderDashboard()`, convention CLAUDE.md).
- **Deadline 45 j** (restant ou dépassement) + **flag risque** tardive/dirigeant.
- **Arbre de décision 5 options** (convention CLAUDE.md).

## 6. Base légale & sources

- **L.631-1** (définition CdP), **L.631-4 / L.640-4** (obligation de déclarer
  dans les 45 j, RJ / LJ), **L.640-1** (LJ : redressement manifestement
  impossible), **R.631-1 / R.640-1** (pièces à joindre), **L.651-2**
  (insuffisance d'actif — *nommé*, routé C).
- Compétence juridictionnelle : TC vs tribunal judiciaire.
- Sources : **Légifrance** (articles) ; `company_full_profile` / Pappers
  (identité, forme sociale — optionnel, mode dégradé sans clé).
- **Pas de lookup BODACC** : la DCP est **pré-procédure** (l'annonce n'existe pas
  encore) — différence clé avec `declaration-creance` qui interroge
  `bodacc_procedures`.

## 7. Méthodologie de build (différence clé avec `cas`)

B est **doctrinal** : calcul de délai à conséquences légales, qualification de la
CdP, sanctions nommées. → **scoring blind 4 phases** obligatoire (protocole
CLAUDE.md « Validation interne »), comme `declaration-creance`. Pas un routeur
non-doctrinal comme `cas`.

- **Allocation modèle** : plan + doctrine = **Opus** ; build + Phase 3 live =
  **Sonnet** (barre représentative Cowork) ; Phase 2 + Phase 4 = **Codex**.
- **Token economy** : **Candy lance** les commandes de scoring (wrapper
  `scripts/da-scoring.sh` : phase2 / phase3-prompt / phase4 / aggregate) ; le
  modèle prépare les prompts, ne les exécute pas côté Claude.
- Dataset : `plugins/hacienda-droit-affaires/tests/datasets/da-declaration-cessation-paiements/`
  (scenario.md, ground-truth.md, live-output.md, verdicts-*.json).
- Cible : **gate-clean ADMIS** (gates CRITIQUE binaires propres).

## 8. Surface technique

- Skill `skills/declaration-cessation-paiements/SKILL.md` (squelette V2 canonique
  imposé par `hacienda-droit-affaires-cowork-structure.test.ts` : Examples /
  Chargement du profil / Intake / Gate non-juriste / Outils MCP à privilégier /
  Emplacement des sorties / Sortie ; frontmatter `version: "2.0.0"` +
  `argument-hint`).
- Wrapper jumeau `commands/h-da/declaration-cessation-paiements.md` (description +
  argument-hint identiques, « Use the `declaration-cessation-paiements` skill »,
  `$ARGUMENTS`).
- Entrée README (tableau Commandes, ordre alpha) + ligne Périmètre V2
  (Procédures collectives).
- Count skills : `hacienda-droit-affaires-cowork-structure.test.ts` **27 → 28**.
- Bump version **v0.10.0 → v0.11.0** (version.json, manifest.json,
  mcp-server/package.json, .claude-plugin/plugin.json, .claude-plugin/marketplace.json
  ×2) + CHANGELOG.

## 9. Hors scope (→ futurs cycles du pan)

- **A** (orientation/arbitrage cédant) — routeur, viendra coiffer le pan.
- **C** (responsabilité du dirigeant) — évaluation L.651-2 / sanctions / cautions.
- Mode `--review` (relire une DCP déjà rédigée) — non prévu v1.
