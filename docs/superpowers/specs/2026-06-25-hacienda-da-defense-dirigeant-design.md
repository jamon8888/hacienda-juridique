# Design — `defense-dirigeant` (trame de défense, aval contentieux de `responsabilite-dirigeant`)

**Date :** 2026-06-25
**Plugin :** `plugins/hacienda-droit-affaires` (DA)
**Version cible :** v0.13.0 → **v0.14.0** (30 → **31** skills)
**Statut :** design validé (brainstorm) — à transformer en plan d'implémentation.

---

## 1. Intention

`defense-dirigeant` est l'**aval contentieux** de `responsabilite-dirigeant` (C).
La paire est explicite :

- **`responsabilite-dirigeant` qualifie** l'exposition personnelle du dirigeant
  (🟢🟡🟠🔴 sur 4 axes), tous stades.
- **`defense-dirigeant` arme la défense** quand une **action est engagée**.

C nomme nommément ce skill comme le « **futur skill dédié** » à sa frontière
(SKILL.md C, l. 281 : *« Rédiger un mémoire en défense quand une action L.651-2 /
L.653-8 est engagée → renvoi avocat contentieuiste ; futur skill dédié »* ; l. 283 :
*« Stratégier la défense (constituer les preuves, ordonner les moyens, choisir
l'expert) »*). `defense-dirigeant` **est** ce skill — mais il s'arrête à la
**trame**, il ne rédige pas l'acte.

## 2. Frontière produit (décision validée : livrable « A »)

**Livrable = trame de défense structurée**, pas mémoire rédigé.

Le skill **marshalle** les moyens mobilisables, les **confronte aux faits** du
dossier, les **hiérarchise par force**, liste les **pièces à produire** et
l'**expertise** à demander. Sortie = note stratégique de défense → **l'avocat
rédige le mémoire** (l'acte de procédure).

C'est la frontière qui maintient DA dans *« arme / oriente, n'exécute pas »* :
`defense-dirigeant` est le premier skill **contentieux** de DA, mais il ne franchit
pas la rédaction de l'acte. Un mode `--draft` (projet de mémoire rédigé) reste
**hors scope v1**, ouvrable ultérieurement si le besoin se confirme.

## 3. Périmètre des axes (décision validée : option « 2 », tous les axes civils de C)

Défense des **axes civils** que C qualifie :

- **L.651-2** — contribution à l'insuffisance d'actif (comblement de passif).
- **L.652-1** (sous-cas) — obligation aux dettes sociales (confusion de
  patrimoine / fictivité), régime distinct.
- **Sanctions personnelles L.653-x** — interdiction de gérer (L.653-8), faillite
  personnelle (L.653-3 s.), durée max 15 ans (L.653-11).

**Hors plaidoirie — banqueroute L.654 :** instance **pénale** distincte → renvoi
**pénaliste**. Parallèle exact à la banqueroute « nommée, jamais évaluée » de C.
Mais `defense-dirigeant` doit gérer l'**articulation pénal/civil** (décision
validée — **nommée seulement**) : si une banqueroute est poursuivie en parallèle,
**nommer** le **sursis à statuer** possible et l'**autorité de la chose jugée du
pénal sur le civil**, et renvoyer au pénaliste. Nommé, jamais plaidé.

**Hors scope :** solidarité fiscale du dirigeant (L.267 LPF) — nommée si signaux,
sinon renvoi ; aucun conseil fiscal.

## 4. Gate d'activation (miroir inverse de C)

`responsabilite-dirigeant` couvre **tous les stades** (pré-CdP / RJ-LJ / action).
`defense-dirigeant` **ne s'active qu'au stade contentieux** :

- **Action engagée** (assignation / conclusions du liquidateur, du **MP**, ou de
  **créanciers-contrôleurs sur carence** — **reçues**) → D s'applique.
- **Pas d'action engagée** (exposition seulement) → **renvoi `responsabilite-dirigeant`**
  (qualifier l'expo, documenter la chronologie). D n'apporte rien hors contentieux.

Idéalement, **D consomme la sortie de C** en entrée (l'évaluation des axes oriente
les moyens à privilégier). À l'intake : si C n'a pas tourné, le proposer.

## 5. Cœur doctrinal — structure de la trame (par axe, moyens ordonnés par force)

### Axe L.651-2 (comblement) — moyens hiérarchisés

1. **Recevabilité / prescription** — qualité pour agir **limitée** (liquidateur /
   MP / contrôleurs sur carence) ; **prescription 3 ans** à compter du jugement de
   LJ (ou de résolution du plan) `[review]`.
2. **Absence de faute de gestion** — distinguer faute de gestion / **simple
   négligence expressément exclue** (L.651-2 al. 2, loi Sapin II du 9 déc. 2016) ;
   décision de gestion à risque ≠ faute caractérisée.
3. **Rupture du lien de causalité** — l'insuffisance d'actif procède de causes
   **externes** (marché, perte d'un client majeur, conjoncture) ; pluralité de
   causes ; faute sans lien causal avec l'insuffisance invoquée.
4. **Contestation / minoration de la contribution** — pouvoir **modérateur** du
   juge ; proportionnalité faute / contribution ; contribution **partagée** si
   pluralité de dirigeants (pas de solidarité sauf décision motivée). **D ne
   chiffre pas** — réclame l'état du passif et l'expertise contradictoire.
5. **Moyens procéduraux** — nullités, expertise contradictoire, communication de
   pièces.

### Axe L.652-1 (obligation aux dettes sociales)

Contester la **confusion de patrimoine** / la **fictivité** de la personne morale
(régime distinct de L.651-2 ; conditions propres) `[review]`.

### Axe L.653-x (sanctions personnelles)

- Contester que les **cas limitatifs** soient réunis (interprétation **stricte**).
- Rappeler le caractère **facultatif** (« le tribunal **peut** »).
- **Proportionnalité** de la sanction **et de la durée** (≤ 15 ans, L.653-11) —
  contrôle de proportionnalité.

> Chaque moyen est sorti en **argument mobilisable `[review]`**, jamais « moyen
> gagnant » ni pronostic d'issue : l'issue appartient au **tribunal**.

## 6. Garde-fous anti-fabrication (miroir C, adaptés défense)

- **G1 — dates** : semaines relatives uniquement ; aucune date calendaire.
- **G2 — no-quantum** : ne chiffre ni la contribution ni la minoration ; réclame
  l'état du passif / l'expertise. `[à compléter]`.
- **G3 — moyens en indices `[review]`** : jamais « vous serez écarté / relaxé » ;
  pas de pronostic d'issue ; l'issue relève du tribunal.
- **G4 — ne rédige pas le mémoire** : trame de moyens ; l'avocat met en forme
  l'acte (frontière § 2).
- **G5 — banqueroute hors plaidoirie** → pénaliste ; articulation pénal/civil
  (sursis à statuer, autorité du pénal sur le civil) **nommée**, jamais plaidée.
- **G6 (nouveau) — ne fabrique pas de pièces / preuves** : liste ce qu'il faut
  **produire** (`[à compléter]`) ; ne présuppose l'existence d'aucune pièce.

## 7. Structure V2 & surface livrée

- `skills/defense-dirigeant/SKILL.md` — squelette V2 canonique, **mêmes headings**
  que `responsabilite-dirigeant` : Examples / Chargement du profil / Intake / Gate
  non-juriste / Mode Anno Desktop Optionnel / Outils MCP à privilégier / Emplacement
  des sorties / Sortie / Ce skill ne fait pas / Ton. Section MCP conforme au test de
  structure (`piste_status` / `legifrance_recherche` / `judilibre_recherche` /
  `eurlex_recherche`).
- Wrapper jumeau `commands/h-da/defense-dirigeant.md` (description + argument-hint
  identiques au SKILL.md).
- `cas` : ajouter une ligne de routage **« Dirigeant assigné (action L.651-2 /
  L.653 engagée) »** → `/h-da:defense-dirigeant` (la ligne 114 actuelle « Dirigeant
  exposé / responsabilité personnelle » reste sur `responsabilite-dirigeant` pour
  l'expo hors contentieux).
- README (ligne Commandes `/h-da:defense-dirigeant` + Périmètre V2), **bump
  v0.14.0** (6 emplacements : version.json, manifest.json, mcp-server/package.json,
  .claude-plugin/plugin.json, .claude-plugin/marketplace.json ×2) + CHANGELOG.
- Test de structure : count **hardcodé `toBe(31)`**.
- `scripts/da-scoring.sh` : enregistrer `defense-dirigeant` (code `DFD1RT` — **6
  caractères**, validateur strict) + dataset `tests/datasets/da-defense-dirigeant/`.

## 8. Sortie (format livrable)

Même ossature que C, adaptée à la défense :

```
[En-tête de confidentialité selon le rôle utilisateur]

> ⚠️ Note du relecteur (bloc unique)

# Synthèse — Stratégie de défense
- Action visée : {L.651-2 / L.652-1 / L.653-8 / faillite personnelle} · demandeur {liquidateur / MP / contrôleurs}
- Moyens prime (par force) : {1…} [review]
- Banqueroute parallèle ? {oui → articulation pénal/civil nommée + pénaliste | non}
- Avocat plaidant : ce skill arme la trame, il ne rédige pas le mémoire (acte = avocat).

# Faits retenus
{chronologie sobre, semaines relatives}

# Trame de défense — Axe {L.651-2 / L.652-1 / L.653-x}
- Moyens mobilisables, ordonnés par force [review]
- Confrontation aux faits du dossier
- Pièces à produire [à compléter] · expertise à demander
- Quantum : non chiffré — réclamer l'état du passif

# Articulation pénal/civil (si banqueroute parallèle)
- Sursis à statuer possible · autorité du pénal sur le civil · renvoi pénaliste

# Une question hors de ma checklist
{observation honnête, ou omise}

# Que veux-tu faire ? (arbre 5 options)
```

Emplacement : `outputs/defense-dirigeant-<denomination-ou-siren>-<axe>.md`.

## 9. Scoring (décision validée : cycle complet)

Skill **doctrinal** (les moyens de défense sont de la substance) → **scoring blind
4 phases requis** (protocole CLAUDE.md), comme les feuilles substantielles —
**≠** routeurs (`cas`, `distress-cedant`) qui s'évaluent en routage live.

- Code de cycle : **`DFD1RT`** (6 car. majuscules).
- Allocation modèle : design/doctrine = Opus ; build T1-T4 + Phase 3 live = Sonnet ;
  Phase 2/4 = Codex (HIGH / medium). **Candy lance les commandes de scoring**
  (token economy) ; Claude prépare les prompts.
- **Checkpoint gates pré-live** : relire les CRITIQUE, reformuler tout gate-recall
  et toute **asymétrie de grille** (liste conjonctive en PASS vs « aucun » en FAIL —
  leçon `distress-cedant`/C-015) **avant** Phase 3.

## 10. Ce que le skill ne fait pas

- **Rédiger le mémoire / les conclusions** en défense (l'acte = avocat) — il
  fournit la trame.
- **Pronostiquer l'issue** (« vous serez écarté ») — moyens en indices `[review]`.
- **Chiffrer** la contribution ou sa minoration — réclame l'état du passif.
- **Plaider la banqueroute** (pénal) — pénaliste ; articulation pénal/civil nommée.
- **Conseiller en fiscal** (L.267 LPF) — nommé si signaux, sinon renvoi.
- **Fabriquer** dates ou pièces (semaines relatives ; pièces en `[à compléter]`).
- S'**activer hors contentieux** — renvoi `responsabilite-dirigeant`.

## 11. Hors scope (futurs cycles)

- Mode **`--draft`** (projet de mémoire rédigé) — saut produit, à arbitrer plus tard.
- AMF / dirigeants de sociétés cotées — anticipation v2.

## 12. Acquis méthodo réutilisés

- Verrouiller l'anti-fabrication **dans le design** (G1-G6 dans le SKILL.md dès le
  build), pas après le 1ᵉʳ rejet — cf. `responsabilite-dirigeant` (ADMIS 1ᵉʳ cycle).
- Checkpoint gates entre Phase 2 et Phase 3 = filet anti-faux-REJETÉ ; traiter
  gate-recall **et** asymétrie de grille.
- Code de cycle 6 caractères (validateur strict).
