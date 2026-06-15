# Asset vs share deal en distress (DA) — Design doc

> Cycle distressed-M&A #4, skill **routeur** qui chapeaute le moat. Repo :
> `jamon8888/hacienda-juridique`. Plugin : `plugins/hacienda-droit-affaires` (DA).
> Skill : `asset-vs-share-distress`.
> Handoff de référence : `docs/handoff/handoff-2026-06-15-cession-actifs-isoles.md`.

## 1. Objectif

Livrer le skill `asset-vs-share-distress` : une **note d'orientation / arbitrage de
structuration côté candidat-repreneur** pour décider, en amont, **comment** acquérir
une cible **en difficulté** — rachat de **titres (share deal)** ou rachat d'**actifs
(asset deal)** — et **router** vers le bon playbook d'exécution. C'est l'**entonnoir
amont** du moat distressed-M&A : il décide et oriente, il **n'exécute pas**. Validation
visée : **gate-clean** par scoring blind 4 phases, bump DA en **v0.9.0**.

## 2. Frontière anti-redondance (point critique)

Le handoff alertait sur le risque de duplication des 4 skills aval. La règle : ce skill
**décide et route**, il n'opère pas la mécanique fine de chacun. Il **cite** les articles
L.642-x pour orienter, il ne les **déroule pas**.

| Skill aval | Suppose déjà décidé | Ce skill apporte |
|---|---|---|
| `reprise-a-la-barre` | plan de cession (going concern) choisi | **faut-il** un asset deal en plan de cession ? |
| `cession-actifs-isoles` | actifs isolés en LJ choisis | **faut-il** des actifs isolés plutôt qu'un going concern ? |
| `pre-pack-cession` | montage confidentiel amont choisi | **faut-il** préparer en amont vs attendre la procédure ? |
| `spa-review` / `gap-review` / `closing-checklist-fr` | share/asset deal acté, projet d'acte en main | **faut-il** un share deal du tout (héritage du passif) ? |
| `prevention-difficultes` | dispositif préventif choisi | la cible est-elle déjà au-delà du seuil amiable (CP > 45 j) ? |

**Garantie de non-redondance = le skill s'arrête à la décision de structuration et
route.** Il ne rédige ni SPA, ni acte de cession, ni offre ; il ne déroule pas
L.642-1/2/5/7/12/19. Il ne donne **aucun conseil fiscal** (flag + renvoi conseil
fiscal).

## 3. Périmètre (v1)

- **Dans le périmètre** : arbitrage **titres vs actifs** pour une cible en difficulté ;
  diagnostic du niveau de difficulté ; cartographie de la **responsabilité repreneur** ;
  **routage** vers les skills aval. Côté **repreneur uniquement**. Mode **unique**.
- **Hors périmètre** :
  - Toute **exécution** (offre, SPA, acte de cession, déroulé L.642-x détaillé) →
    skills aval.
  - **Conseil fiscal** (déficits reportables, droits d'enregistrement, solidarité
    L.1684 CGI) — **flag + renvoi conseil fiscal**, jamais d'avis chiffré.
  - Côté cédant / débiteur / organes de la procédure.

## 4. Livrable — note d'orientation repreneur (mode unique)

Format à 4 blocs, côté repreneur :

```markdown
# Asset vs share deal en distress — note d'orientation [CÔTÉ repreneur]

## 1. Diagnostic du niveau de difficulté (Gate 1)
- Où est la cible : in bonis avec difficultés / amiable (mandat ad hoc, conciliation)
  / RJ / LJ ? (lookup BODACC). Cessation des paiements : datée ? > 45 j ?
- Si **CP > 45 j sans procédure** → on ne structure pas librement → renvoi
  `prevention-difficultes` (déclaration de cessation des paiements / dispositif).

## 2. Arbitrage titres vs actifs
- Tableau comparatif : passif (hérité vs laissé), continuité (contrats /
  autorisations / agréments), salariés (L.1224-1), sûretés/purge, véhicule procédural,
  fiscalité `[review]`.
- **Alerte Gate 2 (a)** : un **share deal d'une société en difficulté ne purge rien** —
  on hérite dettes, procédures, litiges. « Acheter les titres simplifie » est faux.

## 3. Cartographie de la responsabilité repreneur (Gate 2 + MAJEUR)
- **Période suspecte (L.632-1 nullités de droit / L.632-2 facultatives)** : acquisition
  pré-procédure annulable. La voie sûre passe par les organes après jugement.
- L.1224-1 (transfert social), solidarité fiscale L.1684 CGI (cession de fonds)
  `[review]`, extension de procédure / confusion de patrimoine, insuffisance d'actif
  L.651-2 si le repreneur devient dirigeant, passif environnemental ICPE `[review]`.

## 4. Recommandation & routage
- Structure recommandée (titres / actifs / voie) avec justification distress-aware.
- **Renvois** : `prevention-difficultes` / `pre-pack-cession` / `reprise-a-la-barre` /
  `cession-actifs-isoles` / `spa-review` / `gap-review` / `closing-checklist-fr`, +
  conseil fiscal externe.
```

## 5. Gates scorés (cœur doctrinal)

- **Gate 1 — diagnostic du niveau de difficulté + routage.** Situer la cible sur le
  spectre (BODACC) et router. Cas tranchant : **CP > 45 j sans procédure** → renvoi
  `prevention-difficultes` (ne pas structurer une acquisition libre d'une société qui
  doit déclarer sa cessation des paiements).
- **Gate 2 — responsabilité repreneur (CRITIQUE) :**
  - (a) **share deal = aucune purge du passif** : ne pas laisser entendre que le rachat
    de titres « nettoie » la société ou évite le passif/les procédures. Gate-piège type
    (cf. [[feedback-gate-calibration-scoring]]).
  - (b) **période suspecte (L.632-1 / L.632-2)** : ne pas présenter une acquisition
    pré-procédure comme sûre ; signaler le risque de nullité.

Calibration : Gate 1 (routage correct, dont CP > 45 j) + Gate 2 (a)/(b) sont les
critères CRITIQUE binaires. L'arbitrage détaillé (tableau titres/actifs, continuité,
L.1224-1, fiscalité flag, extension/confusion) relève des MAJEUR.

## 6. Workflow (6 étapes, moule V2)

1. **Étape 1 — Pré-flight + Gate 1.** `check-pii`. Lookup BODACC
   (`bodacc_procedures` / `bodacc_by_siren` / `company_full_profile`) : niveau de
   difficulté, procédure éventuelle, cessation des paiements. CP > 45 j sans procédure
   → renvoi `prevention-difficultes`.
2. **Étape 2 — Arbitrage titres vs actifs.** Dérouler le comparatif distress-aware ;
   marteler Gate 2 (a) (share deal ne purge pas le passif).
3. **Étape 3 — Cartographie responsabilité repreneur.** Période suspecte L.632-1/632-2
   (Gate 2 b), L.1224-1, solidarité fiscale L.1684 CGI `[review]`, extension/confusion,
   L.651-2, environnement ICPE `[review]`.
4. **Étape 4 — Recommandation de structure** distress-aware (titres / actifs / voie).
5. **Étape 5 — Routage** vers le skill aval adéquat + conseil fiscal externe.
6. **Étape 6 — Post-flight `verifier-citations`.**

## 7. Conventions skill V2 (test `cowork-structure`)

- Frontmatter : `name: asset-vs-share-distress`, `version: "2.0.0"`, `argument-hint:`,
  `authors`, `tags`. Headings dans l'ordre canonique : Examples / Chargement du profil /
  Intake / Gate non-juriste / Outils MCP à privilégier / Emplacement des sorties /
  Sortie (+ Étapes / Ce skill ne fait pas / Ton).
- Bloc MCP : noms exacts (`piste_status`, `legifrance_recherche`,
  `judilibre_recherche`, `eurlex_recherche`, + `bodacc_procedures`, `bodacc_by_siren`,
  `company_full_profile`). Jamais `/hacienda-droit-affaires:`.
- Wrapper `commands/h-da/asset-vs-share-distress.md` (description + argument-hint
  identiques au SKILL.md) + entrée README `/h-da:asset-vs-share-distress` + **count
  hardcodé 25 → 26** dans `hacienda-droit-affaires-cowork-structure.test.ts`
  (`toBe(26)`).
- Bump version dans **les 5 fichiers** (version.json, manifest.json,
  mcp-server/package.json, .claude-plugin/plugin.json, .claude-plugin/marketplace.json —
  6 occurrences, marketplace en a 2) : **0.8.0 → 0.9.0**. + CHANGELOG.

## 8. Validation — scoring blind 4 phases

Workflow `bash scripts/da-scoring.sh <phase> asset-vs-share-distress` (pbcopy auto).
**Ajouter d'abord le skill** aux 5 fonctions + array du wrapper, et bumper le **code
défaut** (`code_for`) à chaque cycle. Protocole :

- **Phase 1** — scénario fictif neutre (cible en difficulté à un stade ambigu ;
  éléments piégeux : client tenté par un share deal « plus simple » alors que la société
  croule sous le passif ; acquisition d'actifs envisagée avant tout jugement [période
  suspecte] ; CP datant de plus de 45 j non déclarée ; salariés et contrats clés ;
  fonds de commerce [solidarité fiscale]).
- **Phase 2** — ground-truth (grille Codex HIGH, sans SKILL.md) : gates CRITIQUE =
  routage / diagnostic (dont CP > 45 j → prevention-difficultes) + share deal ne purge
  pas le passif + période suspecte. **Checkpoint gate Phase 2→3** : PASS = complément
  exact du FAIL.
- **Phase 3** — exécution live (session Claude FRAÎCHE, sans ground-truth ;
  `phase3-resync` avant).
- **Phase 4** — scoring (Codex medium, sans SKILL.md) → `aggregate`. Normaliser tout
  verdict hors barème (`PASS_WITH_RESERVE`) en FAIL conservateur, documenté (cf.
  [[feedback-scoring-wrapper-workflow]]).

Décision **gate-driven, pas chiffre** : `gate_failures: []` = feu vert.

**Économie tokens** : Candy lance les commandes scoring (Codex) ; Claude génère les
prompts et fait l'analyse gate-driven. Cf. [[feedback-token-economy-codex]].

## 9. Hors périmètre (YAGNI)

- N'**exécute pas** (offre, SPA, acte de cession, déroulé L.642-x) → skills aval.
- Ne donne **aucun conseil fiscal** (déficits reportables, droits d'enregistrement,
  solidarité L.1684 CGI) — flag + renvoi conseil fiscal.
- Ne traite pas le côté cédant / débiteur / organes.
- Pas de mode `--review` en v1 (note d'orientation mode unique).
- Seuils / délais procéduraux : `[à vérifier]` si non confirmés en source primaire.
