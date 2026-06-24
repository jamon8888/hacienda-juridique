# Responsabilité du dirigeant — Design doc

> Deuxième skill du **pan cédant/débiteur** du moat distressed-M&A, suite directe
> de `declaration-cessation-paiements` (DCP). Repo : `jamon8888/hacienda-juridique`.
> Plugin : `plugins/hacienda-droit-affaires` (DA). Skill :
> `responsabilite-dirigeant`. Handoff de référence :
> `docs/handoff/handoff-2026-06-19-pan-cedant-debiteur-dcp.md`.

## 1. Contexte & place dans le pan

Le pan cédant/débiteur compte aujourd'hui une feuille (`declaration-cessation-paiements`,
ADMIS gate-clean 1,0 au cycle DCP4RT, PR #59 mergée) + `prevention-difficultes`.
Trois pièces étaient identifiées :

- **A. Orientation/arbitrage cédant** — routeur, **viendra en dernier** (feuilles
  d'abord, comme pour le moat repreneur).
- **B. Déclaration de cessation des paiements** — livré (v0.11.0).
- **C. Responsabilité du dirigeant** — **ce doc**.

**Ordre retenu : C avant A.** Raisons : (1) DCP **nomme** l'exposition dirigeant
et y renvoie ; la création de C **comble l'attente** au moment précis où l'avocat
M&A/PE est le destinataire de la question — sans C, DCP envoie sur « va voir un
avocat » alors que l'avocat *est* l'utilisateur du plugin. (2) Symétrie funnel :
le moat repreneur a livré 3 feuilles avant son routeur ; le pan cédant doit en
avoir au moins 2 (DCP + C) avant A. (3) Pour un avocat **PE**, la question des
cautions personnelles et de l'exposition du dirigeant est critique sur tout LBO
distressed → différenciant fort.

## 2. Objectif

Côté **dirigeant débiteur**. Évaluer (qualifier, pas conclure) la responsabilité
personnelle d'un dirigeant exposé à une procédure collective (ouverte, à venir,
ou avec action déjà engagée), sur quatre axes hétérogènes traités en **un seul
skill avec triage interne** :

1. **L.651-2 C.com.** — contribution à l'insuffisance d'actif (action civile du
   mandataire).
2. **L.653-3 à L.653-8 C.com.** — sanctions personnelles (interdiction de gérer,
   faillite personnelle).
3. **L.654-1 et s. C.com.** — banqueroute (pénale, **nommée, jamais évaluée** →
   renvoi pénaliste, parallèle exact à la posture de DCP qui nomme L.651-2).
4. **Cautions personnelles du dirigeant** — sort dans la procédure (L.622-28,
   L.631-14, L.626-11, L.643-11) et recours créancier hors procédure.

Le skill **qualifie** par axe (échelle canonique 🟢🟡🟠🔴 + facteurs aggravants /
atténuants) ; il **ne chiffre pas** (pas d'insuffisance, pas de contribution),
**ne stratégise pas** la défense, **ne rédige pas** de mémoire. Brouillon,
**validation humaine (avocat) OBLIGATOIRE**, contentieuiste recommandé si action
engagée.

## 3. Frontière de périmètre (anti-redondance + anti-débordement)

| Skill | Frontière |
|---|---|
| `declaration-cessation-paiements` | **DCP nomme l'expo dirigeant et y renvoie.** C **évalue** ce que DCP **nomme**. Le bloc « alerte exposition dirigeant » de DCP sera mis à jour pour pointer explicitement sur `/h-da:responsabilite-dirigeant` (modif minimale, ~2 lignes, livrée avec le PR de C). |
| `prevention-difficultes` | Si le client n'est **pas encore** en CdP → C **recommande** la conciliation (L.611-4) comme facteur atténuant (neutralise le délai 45 j, atténue le reproche de retard) et **renvoie** à `prevention-difficultes`. C ne décide pas amiable vs collectif. |
| Futur skill `defense-comblement-passif` | C **qualifie** mais ne rédige pas le **mémoire en défense** quand une action L.651-2 / L.653-8 est engagée. Le mémoire est un livrable contentieux. C s'arrête à la qualification + renvoi contentieuiste. |
| Skills repreneur (cession-actifs-isoles, pre-pack-cession, reprise-a-la-barre) | Ces skills traitent les cautions **côté repreneur** (purge, transfert, hypothèque rétention). C traite les cautions **côté dirigeant débiteur** (caution donnée par le dirigeant aux créanciers). Pas d'empiètement. |
| Conseil fiscal (L.267 LPF, solidarité fiscale dirigeant) | **Hors scope.** Nommer le risque fiscal si signaux ; renvoi conseil fiscal. |

## 4. Décisions structurantes (Q1–Q4 résolues en brainstorming)

| # | Décision | Raison |
|---|---|---|
| Q1 | **Tout-en-un** (4 axes dans un seul skill, triage interne) | Le client pose **une** question (« je risque quoi ? ») ; cohérent avec DCP qui nomme un seul bloc d'expo ; évite l'anti-UX où l'avocat doit pré-qualifier en palette quel axe va mordre |
| Q2 | **Qualification + facteurs** (échelle 🟢🟡🟠🔴 + aggravants/atténuants), **pas de quantum**, **pas d'esquisse défense** structurelle | Cohérent avec posture skills doctrinaux (qualifier, pas conclure) ; piège fabrication évité (le quantum reproduirait l'erreur des dates DCP, cf. `[[feedback-date-fabrication-scoring-variance]]`) ; persona M&A/PE = triage du risque, pas plaidoirie |
| Q3 | **Tous stades couverts** (pré-CdP / RJ-LJ ouverte / action engagée), avec **stade** demandé en intake obligatoire et modulant les recommandations | L'évaluation L.651-2 / L.653-8 est la même quel que soit le stade ; le stade module les recommandations finales (« documenter chrono » vs « préparer défense ») ; pas de fragmentation artificielle |
| Q4 | Naming `responsabilite-dirigeant` | Terme doctrinal canonique (titre de chapitre dans les codes commentés et manuels) ; scannable en palette ; couvre les 4 axes contrairement à `faute-de-gestion` (trop étroit) ; pattern DA des noms longs explicites |

## 5. Gate & flux

**Gate d'éligibilité (intake) :**
- **Forme sociale + qualité du dirigeant** (droit / fait) **obligatoires**. Refus
  défaut. La qualification de dirigeant de **fait** est elle-même contestable →
  `[review]` systématique si retenue.
- **Stade de procédure obligatoire** : pré-CdP probable / RJ ou LJ ouverte (date
  jugement d'ouverture) / action L.651-2 ou L.653-8 engagée ou annoncée. Refus
  défaut. Le stade module les recommandations finales, pas la qualification.
- **Faits chronologiques** en **semaines relatives** uniquement (« ~10 semaines »,
  « ~8 mois »). Jamais demander une date calendaire ; ne **jamais** convertir
  une approximation en date.

**Routage conditionnel à l'intake :**
- **Pré-CdP serein** (pas de CdP, pas de procédure annoncée, pas de dépôt
  imminent) → renvoyer `/h-da:prevention-difficultes` (prévention reste ouverte,
  C n'apporte rien à un dirigeant qui n'est pas dans un funnel procédure).
- **Pré-CdP avec CdP probable / dépôt imminent** → C reste dans le scope (cas
  Q3.b : anticipation expo perso avant signature DCP). Recommander en sortie de
  déposer DCP ET de demander une conciliation L.611-4 si la fenêtre reste
  ouverte (neutralise le délai 45 j → atténue le reproche de retard).
- **Procédure ouverte (RJ/LJ)** → cas central.
- **Action L.651-2 / L.653-8 engagée** → qualification quand même produite
  **mais** renvoi explicite **contentieuiste** en tête du livrable (C n'est pas
  un mémoire en défense).

**Flux d'évaluation :**
1. Intake + pré-flight `check-pii` (probabilité élevée seuil B : dirigeant +
   dénomination + faits financiers).
2. Lecture profil cabinet (bloc procédures collectives), position dominante,
   matrice d'approbateurs.
3. **Évaluation parallèle des 4 axes** (pas de skip silencieux) :
   - **Axe 1 — L.651-2 (et L.652-1 sous-cas)** : qualité dirigeant (droit/fait),
     faute de gestion (retard DCP, poursuite activité déficitaire, comptabilité,
     prélèvements anormaux), insuffisance d'actif **non chiffrée**, lien de
     causalité. Qualif 🟢🟡🟠🔴 + facteurs. **Sous-cas L.652-1** (obligation aux
     dettes sociales pour **confusion de patrimoine** ou **fictivité** de la
     personne morale) : régime distinct mais signal fréquent côté dirigeant
     unique (comptes courants débiteurs massifs, locaux confondus, absence de
     gouvernance) → qualifier séparément `[review]` si signaux ; sinon mentionner
     en risque dormant.
   - **Axe 2 — Sanctions L.653-x** : interdiction de gérer L.653-8 (cas
     limitatifs : omission DCP, fraude, retard, banqueroute…) ; faillite
     personnelle L.653-3/4/5 (cas plus graves : détournement, fraude bilan,
     poursuite ruineuse). Qualif + facteurs.
   - **Axe 3 — Banqueroute L.654-1** : **nommée, jamais évaluée**. Lister les
     cas (achats en vue de revente à perte, emploi de moyens ruineux, détournement
     d'actif, comptabilité fictive ou détruite) ; renvoi pénaliste. Pas de qualif
     🟢🟡🟠🔴.
   - **Axe 4 — Cautions personnelles** : existence (acte, étendue, durée), sort
     dans la procédure (suspension L.622-28 OBS / L.631-14 RJ ; arrêt définitif
     plan L.626-11 ; clôture LJ pour insuffisance L.643-11), recours créancier
     hors procédure. Qualif + facteurs.
4. **Synthèse en tête** : criticité maximale + axe(s) prime.
5. Question hors-checklist + arbre 5 options.

## 6. Livrable

Structure narrative (mirror DCP §8 mais centrée évaluation, pas rédaction) :

```
[En-tête confidentialité — selon rôle utilisateur, profil cabinet]

> ⚠️ Note du relecteur (bloc unique)
> - Sources : Légifrance ✓ / Judilibre ✓ / Pappers ✓ / BODACC ✓ (cocher ✗ si non connectée)
> - Lecture : faits fournis : {liste} | corpus client ingéré (Anno) | aucun
> - Signalé pour ton jugement : {N éléments [review] en ligne}
> - Fraîcheur : recherche jurisprudence post-{date} sur faute de gestion / interdiction de gérer / cautions — {N} arrêts [Judilibre] | recherche impossible
> - Avant de t'appuyer dessus : {action concrète — ex. faire reconstituer la chrono avec l'expert-comptable, vérifier l'acte de caution}

# Synthèse — Exposition globale du dirigeant
- Criticité maximale : {🟠} sur axe prime : {L.651-2 retard DCP}
- Axes en jeu : L.651-2 {🟠} · L.653-8 {🟡} · Banqueroute {nommée, pas évaluée} · Cautions {🟠}
- Stade procédure : {RJ ouverte / LJ / action engagée / pré-CdP probable}
- {Si action engagée : "Avocat contentieuiste recommandé — C qualifie, ne rédige pas la défense"}

# Faits retenus
[chronologie sobre, semaines relatives, pas de dates calendaires]

# Axe 1 — Contribution à l'insuffisance d'actif (L.651-2) + sous-cas L.652-1
- Qualification : {🟢🟡🟠🔴} [review]
- Conditions cumulatives (L.651-2) :
  - Procédure de RJ ou LJ ouverte (L.651-1) — {oui/à confirmer}
  - Insuffisance d'actif (non chiffrée — réclamer état du passif si demandé)
  - Faute de gestion ({nature retenue})
  - Lien de causalité avec l'insuffisance
- Facteurs aggravants : [...]
- Facteurs atténuants : [conciliation L.611-4 ? · chronologie documentée ? · expert-comptable consulté ?]
- Mention : exception simple négligence (L.651-2 al. 2) [review]
- **Sous-cas L.652-1** — obligation aux dettes sociales pour confusion de patrimoine
  ou fictivité : {qualif distincte si signaux : comptes courants débiteurs massifs,
  locaux confondus, absence de gouvernance} {sinon : risque dormant nommé}

# Axe 2 — Sanctions personnelles (L.653-x)
- Interdiction de gérer (L.653-8) : qualification {...} [review]
  - Cas applicables : omission DCP, fraude, retard, banqueroute…
- Faillite personnelle (L.653-3 à L.653-5) : qualification {...} [review]
  - Cas plus graves : détournement, fraude bilan, poursuite ruineuse
- Durée max 15 ans (L.653-11) [Légifrance]

# Axe 3 — Banqueroute (L.654-1) — NOMMÉE, pas évaluée
- Cas légaux applicables aux faits : [achats à perte / moyens ruineux / détournement / comptabilité fictive ou détruite]
- {Si signaux concrets} : renvoyer **pénaliste**. C ne qualifie pas l'intention.
- Sanctions max : 5 ans de prison + 75 000 € d'amende (L.654-3) [Légifrance]

# Axe 4 — Cautions personnelles
- Existence : acte de caution {...} [à compléter]
- Sort dans la procédure :
  - Période d'observation : suspension poursuites (L.622-28 sauvegarde / L.631-14 RJ)
  - Plan de continuation : arrêt définitif des poursuites contre la caution personne physique (L.626-11) — mais la dette principale survit
  - Clôture LJ pour insuffisance : non-reprise des poursuites individuelles SAUF caution (L.643-11) — la caution reste actionnable
- Recours créancier : à anticiper {prêteur bancaire / bailleur / fournisseur} [review]

# Une question hors de ma checklist
{observation honnête — ex. compte courant d'associé débiteur, prélèvements récents, garantie à première demande déguisée en caution} {omettre si rien d'honnête}

# Que veux-tu faire ? Choisis une option et je la déroule :
1. Rédiger — note de synthèse au dirigeant (mode silencieux client) reprenant l'évaluation.
2. Escalader — note vers {avocat référent / contentieuiste / pénaliste si banqueroute en jeu}.
3. Compléter les faits — questions à l'expert-comptable / dirigeant (chronologie, comptabilité, actes de caution).
4. Surveiller et attendre — j'ajoute le dossier au tracker avec critères de revisite.
5. Autre — précise.
```

**Mode silencieux client** : si livrable destiné au dirigeant directement (non-juriste),
couper narration de skill, retirer renvois inter-commandes, garder en-tête
confidentialité + note du relecteur condensée. **Pas de mode externe** vers
tribunal/mandataire (un mémoire en défense est un autre skill).

## 7. Anti-fabrication (G1–G5, verrouillés dès le SKILL.md)

C est un skill doctrinal à délai → mêmes pièges que DCP (cf.
`[[feedback-date-fabrication-scoring-variance]]`), plus des pièges propres :

| Gate | Pièce | Verrou rédactionnel |
|---|---|---|
| **G1 — Dates** | Chronologie CdP, retard déclaration, période suspecte | Semaines relatives uniquement ; jamais de date calendaire ; jamais de jours de retard précis ; le 1er impayé est un indice |
| **G2 — Quantum** | Insuffisance d'actif, contribution potentielle | **Aucun chiffre.** « Insuffisance probable d'ordre N € » est interdit (même piège que les dates). Réclamer un état du passif si chiffres demandés ; sinon `[à compléter]` |
| **G3 — Qualification de fait** | « Faute caractérisée », « erreur manifeste », « poursuite abusive d'activité déficitaire » | Présenter en **indices** facteurs aggravants/atténuants ; ne jamais conclure « il y a faute » — c'est le tribunal qui qualifie. `[review]` |
| **G4 — Intentionnalité (banqueroute)** | « Détournement », « dissimulation », « tenue irrégulière » | Nommer L.654-1, jamais qualifier dol/dissimulation/détournement ; renvoi pénaliste systématique |
| **G5 — Cautions** | « Caution éteinte », « caution exigible » | Distinguer sort **dans la procédure** (suspension L.622-28 / L.631-14 ; arrêt définitif plan L.626-11) et **recours créancier hors procédure** ; ne pas conclure sans acte + plan |

Ces 5 gates apparaissent comme **clauses du Gate non-juriste** dans le SKILL.md
et sont **testés par scoring blind** en Phase 2 / Phase 4 (CRITIQUE binaires).

## 8. Base légale & sources

- **L.651-1, L.651-2, L.651-3, L.652-1** C.com. (contribution insuffisance d'actif,
  obligations aux dettes sociales).
- **L.653-1, L.653-3, L.653-4, L.653-5, L.653-6, L.653-8, L.653-11** C.com.
  (faillite personnelle, interdiction de gérer, durée).
- **L.654-1, L.654-2, L.654-3, L.654-5, L.654-6** C.com. (banqueroute, sanctions
  pénales — *nommées*).
- **L.622-28, L.631-14, L.626-11, L.643-11** C.com. (sort des cautions selon la
  phase de la procédure).
- **L.632-1, L.632-2** C.com. (période suspecte, rappel ; date de CdP fixée par
  le tribunal L.631-8).
- **Art. 2288 et s. C.civ.** `[à vérifier]` (régime du cautionnement, réformé
  par l'ord. 2021-1192 du 15 septembre 2021 — vérifier articles en vigueur sur
  Légifrance lors du build).
- **L.267 LPF** *nommé*, hors scope évaluation (solidarité fiscale dirigeant) →
  renvoi fiscal.

Sources : **Légifrance** (articles), **Judilibre** (jurisprudence ch. com. — faute
de gestion, interdiction de gérer, cautions personne physique).

Outils MCP :
- Socle : `piste_status`, `legifrance_recherche`, `legifrance_get_article`,
  `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Identité entreprise : `company_full_profile`, `bodacc_by_siren`.
- **`bodacc_procedures` autorisé** (≠ DCP qui était pré-procédure) : si procédure
  ouverte, l'annonce existe → confirmation stade + mandataire désigné.

## 9. Méthodologie de build

C est **doctrinal** (qualification à conséquences légales, multi-axes) →
**scoring blind 4 phases** obligatoire (protocole CLAUDE.md « Validation interne »),
comme DCP.

- **Allocation modèle** : plan + doctrine + analyse gate-driven = **Opus** ;
  build T1-T4 + Phase 3 live = **Sonnet** (barre Cowork) ; Phase 2 + Phase 4 =
  **Codex effort high (P2) / medium (P4)**. Cf. `[[feedback_token_economy_codex]]`
  et `docs/methodology/sparring-scoring-protocol.md`.
- **Token economy** : **Candy lance** les commandes de scoring (wrapper
  `scripts/da-scoring.sh` : phase2 / phase3-prompt / phase4 / aggregate) ; le
  modèle prépare les prompts. Le skill `responsabilite-dirigeant` doit être
  enregistré dans la table SKILLS du wrapper (code défaut **RD1RT**).
- **Dataset** : `plugins/hacienda-droit-affaires/tests/datasets/da-responsabilite-dirigeant/`
  (scenario.md, ground-truth.md, live-output-*.md, verdicts-*.json). 3-4 cas de
  figure suggérés :
  1. Retard DCP avéré, comptabilité tenue, conciliation tentée → L.651-2 🟠,
     L.653-8 🟡, cautions selon dossier.
  2. Gestion correcte mais LJ pour cause externe (perte marché majeur) → L.651-2
     🟢, sanctions 🟢, cautions selon dossier.
  3. Caution bancaire perso active, plan en cours → focus axe 4 + L.651-2
     mineur.
  4. Dirigeant de fait contesté (associé minoritaire actif) → qualification
     `[review]` lourde + tous axes conditionnels.
- **Cible** : ADMIS gate-clean (CRITIQUE binaires propres). Calibration sur
  G1-G5 (anti-fabrication) en phase 2.
- **Méthodologie de scoring** : protocole blind 4 phases strict, séparation
  des acteurs, marquage retroactif si dérive (cf. CLAUDE.md projet).

## 10. Surface technique

- Skill `plugins/hacienda-droit-affaires/skills/responsabilite-dirigeant/SKILL.md`
  (squelette V2 canonique imposé par
  `tests/dist/hacienda-droit-affaires-cowork-structure.test.ts` : Examples /
  Chargement du profil / Intake / Gate non-juriste / Outils MCP à privilégier /
  Emplacement des sorties / Sortie ; frontmatter `version: "2.0.0"` +
  `argument-hint`).
- Wrapper jumeau `plugins/hacienda-droit-affaires/commands/h-da/responsabilite-dirigeant.md`
  (description + argument-hint identiques, « Use the `responsabilite-dirigeant`
  skill », `$ARGUMENTS`).
- Entrée README (tableau Commandes, ordre alpha) + ligne Périmètre V2 (Procédures
  collectives).
- **Mise à jour DCP** (mineure, dans le même PR) : remplacer dans le bloc
  « Alerte exposition dirigeant » de `declaration-cessation-paiements/SKILL.md`
  le « relève d'un avocat » par un renvoi explicite `/h-da:responsabilite-dirigeant`.
- **Mise à jour `cas`** (mineure, dans le même PR) : ajouter les triggers
  responsabilité dirigeant dans la table de routage du routeur.
- Count skills : `hacienda-droit-affaires-cowork-structure.test.ts` **28 → 29**.
- Bump version **v0.11.0 → v0.12.0** (version.json, manifest.json,
  mcp-server/package.json, .claude-plugin/plugin.json, .claude-plugin/marketplace.json
  ×2) + CHANGELOG.
- Wrapper scoring : enregistrer `responsabilite-dirigeant` dans la table SKILLS
  de `scripts/da-scoring.sh` (code défaut RD1RT).

## 11. Hors scope (→ futurs cycles)

- **A** (orientation/arbitrage cédant) — routeur miroir de `asset-vs-share-distress`
  côté vendeur, à construire en dernier (feuilles d'abord) ; il coiffera le pan
  et routera vers `prevention-difficultes` / `pre-pack-cession` / DCP / C.
- **`defense-comblement-passif`** (mémoire en défense quand action L.651-2 ou
  L.653-8 engagée) — livrable contentieux, qualification confiée à C, rédaction
  laissée à un skill futur dédié.
- **Évaluation banqueroute** (L.654-1) — pénal, hors scope ; nommée, renvoyée
  pénaliste.
- **Quantum** d'insuffisance d'actif / contribution / amendes — pas chiffré
  (piège fabrication).
- **Solidarité fiscale dirigeant** (L.267 LPF) — nommée si signaux, sinon hors
  scope ; renvoi fiscal.
- **Mode `--review`** (relire une note de défense déjà rédigée) — non prévu v1.
- **AMF / cibles cotées** — anticipation v2, source AMF non dans core v1.
