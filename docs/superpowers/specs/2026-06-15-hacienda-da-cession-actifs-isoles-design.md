# Cession d'actifs isolés en LJ (DA) — Design doc

> Cycle distressed-M&A #3, suite de `reprise-a-la-barre`. Repo :
> `jamon8888/hacienda-juridique`. Plugin : `plugins/hacienda-droit-affaires` (DA).
> Skill : `cession-actifs-isoles`.
> Handoff de référence : `docs/handoff/handoff-2026-06-15-reprise-a-la-barre.md`.

## 1. Objectif

Livrer le skill `cession-actifs-isoles` : un **playbook tactique côté
candidat-repreneur** pour construire et défendre une **offre d'acquisition d'actifs
isolés** (mobiliers, incorporels, fonds de commerce, IP/marques, stocks, matériel,
créances) auprès d'un débiteur en **liquidation judiciaire**, **hors plan de
cession** (cession de gré à gré ou aux enchères, L.642-19). Complète le *moat*
distressed-M&A à l'intersection M&A ↔ restructuring, en aval de `reprise-a-la-barre`
(qui exclut explicitement ce cas). Validation visée : **gate-clean** par scoring
blind 4 phases, bump DA en **v0.8.0**.

## 2. Frontière anti-chevauchement (point critique)

`reprise-a-la-barre` exclut déjà explicitement ce cas (« Cession d'actifs isolés en
LJ (L.642-19) hors plan de cession — hors périmètre v1 »). La différenciation porte
sur **la nature de ce qui est cédé** : un **actif isolé** vs une **entreprise /
unité de production en going-concern**.

| Axe | `reprise-a-la-barre` (existant) | `cession-actifs-isoles` (nouveau) |
|---|---|---|
| Objet cédé | **entreprise / activité autonome** (going concern), plan de cession | **actifs isolés** (mobiliers, incorporels, fonds, IP, stocks, créances) |
| Base légale | L.642-1 s. (plan de cession, arrêté par le **tribunal**) | **L.642-19** (cession de gré à gré / enchères, autorisée par le **juge-commissaire**) |
| Transfert des contrats | **automatique et forcé** sur contrats désignés (L.642-7) | **aucun transfert automatique** (L.642-7 ne joue pas) → renégociation |
| Transfert des salariés | dans le périmètre du plan, emplois maintenus = critère L.642-5 | **L.1224-1** joue **si** entité économique autonome cédée (piège inverse) |
| Décideur | tribunal (jugement arrêtant le plan) | juge-commissaire (ordonnance) |
| Recours | L.661-6 | recours contre l'ordonnance du JC (L.642-19 al. / L.661-x) |

**Garantie de non-chevauchement = Gate 1 (qualification).** Si l'objet est en
réalité une **entreprise / unité de production** reprise en going-concern → **STOP +
renvoi `reprise-a-la-barre`** (plan de cession). Si la cession peut encore être
**préparée confidentiellement en amont** (pas de procédure ouverte, mandat ad hoc /
conciliation) → **renvoi `pre-pack-cession`**. Ce skill ne démarre que sur une
**cession d'actif isolé en LJ** (ou cession isolée d'actif en cours de procédure).
Comme ses voisins, il **ne rédige pas l'acte de cession** (→ `spa-review` /
`gap-review` / `closing-checklist-fr`).

## 3. Périmètre (v1)

- **Dans le périmètre** : L.642-19 — cession des **biens mobiliers** et
  **incorporels** (fonds de commerce, marques/brevets/IP, stocks, matériel, créances)
  de gré à gré ou aux enchères, sur autorisation du juge-commissaire. Côté
  **repreneur uniquement**. Mode **unique** (pas de `--review` en v1).
- **Hors périmètre** :
  - **Immeubles (L.642-18)** — mécanique distincte (adjudication, surenchère du
    dixième, règles voisines de la saisie immobilière) → **flag + renvoi**, traité
    `[à vérifier]` / hors scope v1.
  - Rédaction de l'acte de cession / SPA (→ `spa-review` / `gap-review` /
    `closing-checklist-fr`).
  - Reprise d'entreprise en going-concern (→ `reprise-a-la-barre`).
  - Montage amont confidentiel (→ `pre-pack-cession`).

## 4. Livrable — note tactique repreneur (mode unique)

Format à 4 blocs, côté repreneur, miroir tactique de `reprise-a-la-barre` :

```markdown
# Cession d'actifs isolés — note tactique [CÔTÉ repreneur]

## 1. Diagnostic & recevabilité
- Débiteur en LJ confirmé (lookup BODACC) · liquidateur désigné · juge-commissaire
  saisi · actif(s) visé(s) qualifié(s) **isolé(s)** (pas une unité de production).
- Éligibilité du candidat (L.642-20 renvoyant à L.642-3) : dirigeant / parent /
  contrôleur / interposition prohibée ?
- Voie de cession : **gré à gré** vs **enchères** (L.642-19) ; rien n'est acquis sans
  **ordonnance du juge-commissaire**.

## 2. Construction & dépôt de l'offre
- Périmètre **précis** des actifs visés · prix · financement · conditions · délai de
  réalisation. Offre adressée au **liquidateur**, soumise au **juge-commissaire**.
- Pièges propres à l'actif isolé :
  - **Contrats : pas de transfert automatique** (L.642-7 hors jeu) → identifier les
    contrats clés (bail, licences, fournisseurs) et **renégocier**.
  - **Salariés : L.1224-1 joue si entité économique autonome** cédée (le repreneur
    peut hériter des contrats de travail sans l'avoir voulu).

## 3. Sort des sûretés & purge (point tranchant)
- **Report du droit de préférence sur le prix** : les créanciers titulaires de
  sûretés sur l'actif sont payés sur le prix selon leur rang ; l'acquéreur prend en
  principe **libre** de la sûreté une fois le prix consigné/distribué.
- **Droit de rétention** : non purgé par la vente — le rétenteur peut bloquer la
  remise de l'actif tant qu'il n'est pas payé.
- **Droit de suite** (hypothèque/gage immatriculé) : à neutraliser via la purge /
  l'ordonnance ; vérifier que l'actif est transféré quitte et libre.

## 4. Risques & suites
- Risque de **nullité de la période suspecte (L.632-1)** pour un actif acquis du
  débiteur *avant* le jugement d'ouverture (pas via le liquidateur) — `[review]`.
- Voies de **recours** contre l'ordonnance du juge-commissaire (L.642-19 al. /
  L.661-x) — la sienne et celles des tiers/créanciers.
- Renvois : `reprise-a-la-barre` (si going concern) ; `pre-pack-cession` (si amont) ;
  `spa-review` / `gap-review` / `closing-checklist-fr` (acte de cession).
```

## 5. Gates scorés (cœur doctrinal)

- **Gate 1 — qualification (anti-chevauchement).** L'objet est-il un **actif isolé**
  cédé en LJ, et non une entreprise / unité de production en going-concern ? Si going
  concern → renvoi `reprise-a-la-barre` ; si cession encore préparable
  confidentiellement → renvoi `pre-pack-cession`. Vérifié par lookup BODACC (LJ
  ouverte, liquidateur).
- **Gate 2 — recevabilité CRITIQUE.**
  - (a) **Éligibilité L.642-20** (renvoi L.642-3) : dirigeants, parents et alliés
    jusqu'au 2nd degré, **contrôleurs**, interposition de personne sont **interdits
    d'acquérir** → offre **nulle**. Gate-piège type (cf.
    [[feedback-gate-calibration-scoring]]).
  - (b) **Autorisation du juge-commissaire L.642-19** : la cession de gré à gré
    n'existe que par **ordonnance** du JC ; une offre adressée au liquidateur ne vaut
    pas vente tant que le JC n'a pas autorisé. Confondre les deux = erreur qui trompe
    le client.
- **Point tranchant attendu (gate de scoring type C-016 « sûretés »)** : le **sort
  des sûretés / purge** (report sur prix, droit de rétention maintenu, droit de
  suite). C'est le critère qui a fait FAIL sur `reprise-a-la-barre` ; l'ancrer dès
  l'écriture (sort complet, pas seulement « report sur le prix »).

Calibration : Gate 1 + Gate 2 sont les critères CRITIQUE binaires (trigger FAIL
lisible). Le reste (mentions de l'offre, contrats L.642-7 a contrario, salariés
L.1224-1, recours) relève des MAJEUR.

## 6. Workflow (6 étapes, moule V2)

1. **Étape 1 — Pré-flight + Gate 1.** Lookup BODACC (`bodacc_procedures` /
   `bodacc_by_siren` / `company_full_profile`) : LJ ouverte ? liquidateur. Qualifier
   l'objet : actif isolé vs going concern. Si going concern → renvoi
   `reprise-a-la-barre` ; si amont confidentiel → renvoi `pre-pack-cession`.
2. **Étape 2 — Gate 2 recevabilité.** Éligibilité L.642-20 (interdictions L.642-3 /
   interposition) puis voie de cession + nécessité d'ordonnance du JC L.642-19. Si
   inéligible → STOP.
3. **Étape 3 — Construction & dépôt de l'offre.** Périmètre précis des actifs, prix,
   financement, conditions ; offre au liquidateur ; pièges contrats (L.642-7 a
   contrario) et salariés (L.1224-1).
4. **Étape 4 — Sort des sûretés & purge.** Report du droit de préférence sur le prix,
   droit de rétention non purgé, droit de suite à neutraliser ; prendre quitte et
   libre.
5. **Étape 5 — Risques & recours.** Nullité période suspecte L.632-1 (acquisition
   pré-jugement), voies de recours contre l'ordonnance du JC (L.642-19 al. /
   L.661-x).
6. **Étape 6 — Post-flight `verifier-citations`.**

## 7. Conventions skill V2 (test `cowork-structure`)

- Frontmatter : `name: cession-actifs-isoles`, `version: "2.0.0"`, `argument-hint:`,
  `authors`, `tags`. Headings dans l'ordre canonique : Examples / Chargement du
  profil / Intake / Gate non-juriste / Outils MCP à privilégier / Emplacement des
  sorties / Sortie (+ Étapes / Ce skill ne fait pas / Ton).
- Bloc MCP : noms exacts (`piste_status`, `legifrance_recherche`,
  `judilibre_recherche`, `eurlex_recherche`, + `bodacc_procedures`, `bodacc_by_siren`,
  `company_full_profile`). Renvois PI au namespace `/h-pi:`. Jamais
  `/hacienda-droit-affaires:`.
- Wrapper `commands/h-da/cession-actifs-isoles.md` (description + argument-hint
  identiques au SKILL.md) + entrée README `/h-da:cession-actifs-isoles` + **count
  hardcodé 24 → 25** dans `hacienda-droit-affaires-cowork-structure.test.ts`
  (`toBe(25)`).
- Bump version dans **les 5 fichiers** (version.json, manifest.json,
  mcp-server/package.json, .claude-plugin/plugin.json, .claude-plugin/marketplace.json
  — 6 occurrences, marketplace en a 2) : **0.7.0 → 0.8.0**. Pas auto-propagé.
  + CHANGELOG.

## 8. Validation — scoring blind 4 phases

Workflow `bash scripts/da-scoring.sh <phase> cession-actifs-isoles` (pbcopy auto).
**Ajouter d'abord le skill** aux 5 fonctions + array du wrapper (bloc « POUR AJOUTER
UN SKILL »), et bumper le **code défaut** (`code_for`) à chaque cycle. Protocole :

- **Phase 1** — scénario fictif neutre (débiteur en LJ, actif isolé visé : fonds /
  IP / stocks ; éléments piégeux : repreneur potentiellement inéligible L.642-20,
  offre adressée au liquidateur sans ordonnance JC, sûreté grevant l'actif + droit de
  rétention, contrat clé non transféré, salariés rattachés à l'actif, acquisition
  pré-jugement en période suspecte).
- **Phase 2** — ground-truth (grille Codex HIGH, sans SKILL.md) : critères atomiques
  tiered-gated, gates CRITIQUE = qualification actif isolé + éligibilité L.642-20 +
  ordonnance JC L.642-19 ; **point tranchant sûretés** tiered CRITIQUE.
  **Checkpoint gate Phase 2→3** : vérifier que chaque PASS de gate est le complément
  exact du trigger FAIL (leçon `reprise-a-la-barre` : ce checkpoint avait été sauté →
  faux REJETÉ).
- **Phase 3** — exécution live (session Claude FRAÎCHE, sans ground-truth ;
  `phase3-resync` avant).
- **Phase 4** — scoring (Codex medium, sans SKILL.md) → `aggregate`.

Décision **gate-driven, pas chiffre** : `gate_failures: []` = feu vert. INSUFFISANT/
RÉSERVES sans gate → enrichir les MAJEUR. Si un gate tombe → ancrage de l'article
tranchant + reboucle (nouveau `CODE`).

**Économie tokens** : Candy lance les commandes scoring (crédits Codex abondants,
Opus rare) ; Claude génère les prompts et fait l'analyse gate-driven. Coller le JSON
`verdicts-<CODE>.json` plutôt que le bloc `aggregate`. Cf.
[[feedback-token-economy-codex]] et [[feedback-scoring-wrapper-workflow]].

## 9. Hors périmètre (YAGNI)

- Ne **rédige pas** l'acte de cession ni le SPA (→ `spa-review` / `gap-review` /
  `closing-checklist-fr`).
- Ne traite pas les **immeubles** (L.642-18) — flag + renvoi, `[à vérifier]`.
- Ne traite pas la reprise d'**entreprise en going-concern** (→ `reprise-a-la-barre`)
  ni le **montage amont** confidentiel (→ `pre-pack-cession`).
- Pas de mode `--review` en v1 (note tactique mode unique).
- Seuils / délais procéduraux post-réformes : `[à vérifier]`.
