# Routeur d'orientation DA — Design doc

> Point de départ de toute requête dans Cowork pour le plugin droit des affaires.
> Repo : `jamon8888/hacienda-juridique`. Plugin : `plugins/hacienda-droit-affaires` (DA).
> Skill : `orientation` (nom provisoire, ajustable). Handoff de référence :
> `docs/handoff/handoff-2026-06-15-asset-vs-share-distress.md`.

## 1. Problème UX

Le plugin DA compte **26 skills**. Un avocat dans Cowork ne lit pas le README ; il
tape en langage naturel et compte sur l'auto-activation. Il n'existe aucun **point
d'entrée de triage récurrent** : « j'ai un dossier de tel type, par où je commence ? ».

`entretien-demarrage` ne couvre pas ce besoin : c'est un **onboarding one-shot** à
l'installation, dont le job réel est de **vérifier que les bonnes sources sont
connectées** (credentials PISTE / Pappers / BODACC / Judilibre). Sa liste de
« prochaines étapes » est en dur, non adaptée au profil, et utilise même un préfixe
périmé (`/h-droit-affaires:` au lieu de `/h-da:`).

Le pattern de réponse est déjà validé dans le plugin : `asset-vs-share-distress` est un
**skill routeur** qui oriente sans exécuter, pour le sous-domaine distressed. On
généralise ce pattern à l'échelle du plugin, en suivant la convention front-door de
l'écosystème (`sales:sales`, `copywriter:copywriter`, `linkedin:linkedin` ont tous une
porte d'entrée unique qui « comprend le langage naturel et route vers la bonne
commande »).

## 2. Objectif

Livrer un skill **routeur d'orientation** : le point de départ de toute requête, pour
débutants comme confirmés. Il **oriente, n'exécute pas** — aucune analyse juridique,
aucun livrable. Sa sortie = une recommandation « voici le(s) skill(s) pour ton dossier
+ pourquoi », puis passage de main au skill cible.

## 3. Architecture en trois couches (point critique)

La conception repose sur une séparation stricte de trois couches, à ne **jamais**
confondre :

| Couche | Contenu | Cadence | Emplacement |
|---|---|---|---|
| **1. Connectivité** | clés API (PISTE, Pappers…) | une fois, par machine/cabinet | `~/.config/Hacienda/credentials.json` |
| **2. Profil cabinet** | identité, rôle, side _habituel_, postures, approbateurs, politique PII | stable, = **défauts** | `company-profile.md` + CLAUDE.md plugin |
| **3. Contexte dossier** | type de dossier, side sur CE deal, parties | **variable, par dossier** | en conversation (v1) → `matters/` (v1.1) |

**Le side est un attribut de dossier, pas une constante de cabinet.** Le profil ne
stocke que le side _habituel_, comme **défaut à pré-remplir** — jamais comme verrou.
L'architecture le supporte déjà : les skills side-aware (`gap-review`, `spa-review`…)
exigent un side explicite à **chaque** invocation, ils ne font pas confiance au profil.

On n'a donc **pas** besoin d'un « nouveau profil cabinet par dossier ». On a besoin d'un
**contexte de dossier léger** qui surcharge les défauts là où ça diffère (type, side,
parties). En v1 ce contexte vit dans la conversation ; en v1.1 il se persiste dans
`matters/<slug>/`.

## 4. Le routeur reste agnostique au side (décision de conception)

Le routeur route par **TYPE de dossier** et rappelle l'anonymisation. Il **ne touche
pas au side** : le side reste demandé par le skill cible, qui le fait déjà. Conséquences :

- routeur **mince**, skills cibles **inchangés** ;
- side **jamais figé** au niveau cabinet ;
- pas de risque de double-question (le routeur ne demande pas ce que le skill redemande).

Le profil cabinet (side habituel) reste un pur **défaut** consommé par les skills
feuilles, pas par le routeur.

## 5. Surface & déclenchement

**Front-door** `/h-da:orientation` (nom provisoire) **+ auto-activation**.

Contrainte critique de l'auto-activation : la `description` du skill doit cibler
**uniquement** les formulations vagues — « je ne sais pas quel outil », « j'ai un
dossier de X par où commencer », « comment je traite ça » — et **ne pas** intercepter
les invocations directes (« révise ce contrat » doit aller à `reviser-contrat`, pas au
routeur). La description est rédigée **en négatif explicite** pour éviter l'interception.
C'est le risque n°1 d'un front-door auto-activé.

## 6. Flux v1 — branche « nouveau dossier » seulement

```
Avocat : « j'ai un dossier de reprise d'une boîte en difficulté »
   │
   ├─ 1. Triage nature (1 question) :
   │      contrat | litige-impayé | M&A | entreprise en difficulté |
   │      créance procédure | vie sociale
   │
   ├─ 2. Gate anonymisation (branche sur le pré-vol check-pii existant) :
   │      si données sensibles à venir et anonymisation inactive
   │      → avertissement + CTA (anon-on / ghost)
   │      ANONYMISATION D'ABORD, DONNÉES ENSUITE
   │
   └─ 3. Route vers le skill cible
          (ou le sous-routeur asset-vs-share-distress pour le distressed)
```

**Profile-aware** : lit le profil cabinet (`side principal` = **domaine de pratique**
M&A / proc. collectives / contrats ; `position dominante` créancier/débiteur/mandataire)
pour **pré-classer** les suggestions de triage (cabinet procédures collectives → remonte
`declaration-creance` / moat distressed en tête). Profil absent → triage générique +
suggestion de lancer `entretien-demarrage`.

> Ne pas confondre avec le `side` cédant/acquéreur de la §4 : ici le routeur lit le
> **domaine de pratique** habituel pour ordonner les suggestions ; il ne touche jamais au
> side cédant/acquéreur d'un deal, laissé au skill cible.

### 6.1 Carte de routage (type → skill)

| Nature du dossier | Route vers |
|---|---|
| Contrat entrant à relire | `reviser-contrat` / `reviser-nda` / `revue-tabulaire` |
| Contrat à produire | `cgv-generator` / `constitution-societe` |
| Litige commercial / impayé | `mise-en-demeure-commerciale` / `analyser-rupture-brutale` |
| M&A (cible saine) | `loi-term-sheet` → `due-diligence-dataroom` → `spa-review` → `gap-review` → `closing-checklist-fr` |
| **Entreprise en difficulté** | **→ `asset-vs-share-distress`** (sous-routeur, garde son double gate) |
| Créance dans une procédure ouverte | `declaration-creance` |
| Vie sociale (AG / pacte / financement) | `gouvernance-ag` / `pacte-associes-review` / `financement-startup` |

Le routeur global **n'absorbe pas** le triage des sous-routeurs : pour le distressed, il
amène *jusqu'à* `asset-vs-share-distress`, qui conserve sa logique. **Pas de duplication
de doctrine.**

## 7. Gate anonymisation — réflexe, pas mapping

- **Réflexe / gate** : avant d'envoyer l'avocat vers un skill qui ingère des documents,
  s'assurer que le pré-vol `check-pii` / l'anonymisation est en place. Même en
  **standalone** (sans ghost), `check-pii` fait déjà le contrôle pré-vol des mentions
  sensibles + CTA. Le routeur **branche sur ce mécanisme existant**, il n'en réinvente
  aucun. → **retenu en v1.**
- **Hard-mapping nature → profil d'anon précis** (`anon-deal`, `anon-restruct`…) :
  **écarté en v1.** Raisons : (1) couplage fragile à la taxonomie d'un plugin
  indépendant ; (2) se tromper de profil = sous-anonymiser = fuite (le défaut sûr pour
  un débutant est `anon-max`, sur-anonymiser est récupérable) ; (3) responsabilité
  unique du routeur (router vers le bon skill, pas gérer les profils d'anon). Le routeur
  **rappelle d'activer** l'anonymisation et **délègue le COMMENT** au plugin d'anon. →
  **piste v1.1.**

## 8. Hors scope v1 (→ v1.1)

- **Branche « reprise »** (« le user reprend là où il en était ») : dépend de la
  persistance des workspaces `matters/` (CLAUDE.md §12, désactivés v1). v1 = branche
  « nouveau » seulement.
- **Mapping nature → profil d'anon** : déféré, délégué au plugin d'anon (voir §7).

## 9. Méthodologie de build

Routeur **non-doctrinal** : il aiguille, il ne produit aucune analyse juridique. Le
**scoring blind 4 phases ne s'applique pas** (il est réservé aux décisions justifiant un
release doctrinal — cf. CLAUDE.md « Validation interne »).

À la place, **test de routage léger** : ~15 formulations d'intake → skill cible +
posture anonymisation attendus, vérifié en live. Inclure les pièges :
- formulations directes qui ne doivent **pas** déclencher le routeur (« révise ce
  contrat » → `reviser-contrat`) ;
- dossier distressed → doit router vers `asset-vs-share-distress`, pas dérouler L.642-x ;
- données sensibles annoncées → gate anonymisation déclenché avant routage.

## 10. Surface technique

- Skill `skills/orientation/SKILL.md` (moule V2 ; adapté : pas d'outils MCP, pas de
  livrable juridique — c'est un routeur).
- Wrapper `commands/h-da/orientation.md` + entrée README `/h-da:orientation`.
- Count skills : `hacienda-droit-affaires-cowork-structure.test.ts` → `toBe(27)`.
- Bump version : les 5 fichiers (version.json, manifest.json, mcp-server/package.json,
  .claude-plugin/plugin.json, .claude-plugin/marketplace.json — 6 occurrences) + CHANGELOG.
- **Fix au passage** : exemples `/h-droit-affaires:` → `/h-da:` dans
  `skills/entretien-demarrage/SKILL.md`.

## 11. Allocation modèle

Routeur sans doctrine → build léger. Plan + rédaction skill = Opus/Sonnet selon coût ;
test de routage live = Sonnet (barre représentative Cowork). Pas de Codex (pas de scoring
blind).
