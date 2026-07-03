# Spec — Doc early-user `hacienda-droit-affaires` (orientation « ce qu'on peut faire »)

**Date :** 2026-06-30
**Statut :** design validé (brainstorming), prêt pour plan d'implémentation
**Périmètre :** `hacienda-droit-affaires` seul (32 skills). PI / sources / recherche hors périmètre.

---

## 1. Intention

Produire le document d'**orientation** qui manque : « ce qu'on peut faire avec le
plugin », pour un early user. Aujourd'hui il n'existe que deux **briefs de test**
(`docs/personas/ami-test-brief.md`, `frere-test-brief.md`) — des protocoles de test
avec formulaire de feedback embarqué, périmés sur le périmètre (ils annoncent « 19
skills », le plugin en a 32). Ils disent *comment tester* ; ce doc dit *ce qui est
possible*.

**Audience à deux couches** (décision validée) : le même fichier sert (a) l'avocat
testeur (ami/frère-grade) qui doit découvrir au-delà de ses 4-5 skills assignés, et
(b) le futur early user Cowork non-technique.

## 2. Principe directeur — situation-first

**Décision UX centrale :** on entre par la **situation de l'avocat** (« j'ai un dossier
de… »), pas par la capacité/feature. Justification différenciation : le paysage
(Harvey, claude-for-legal, Luminance, Legora) entre par la capacité — un menu de
features. Un avocat ne pense pas « il me faut la feature spa-review », il pense « j'ai
un SPA à relire ». Entrer par la situation = parler comme un confrère, pas comme un
logiciel. Cohérent avec la mémoire `naming-persona-avocat` (nommer par le besoin, pas
la mécanique).

**Le parcours sert de tissu conjonctif :** sous chaque situation, un champ « et
ensuite » montre le **chaînage** entre skills (`spa-review` → `gap-review` →
`closing-checklist-fr` ; `distress-cedant` → `declaration-cessation-paiements` +
`responsabilite-dirigeant`). Ce chaînage est le moat de Hacienda — invisible dans un
catalogue de features, rendu visible ici.

**Pas de noms de concurrents dans le doc.** Le paysage a informé le design, il n'est
pas cité dans la copie (ferait défensif, daterait). La différenciation se *montre* par
l'UX et le triptyque, elle ne se *revendique* pas par comparaison.

## 3. Foyer du document

`plugins/hacienda-droit-affaires/README_UTILISATEUR.md` — convention du CLAUDE.md global
(README utilisateur final Cowork). Les deux briefs personas restent le protocole de
test ; ils pointeront vers ce doc pour la palette complète.

## 4. Structure — deux couches

### Couche 1 — Accueil (≈1 page)

- **Qu'est-ce que c'est** : assistant de droit des affaires français qui tourne dans
  ton Cowork, à côté de toi.
- **Le triptyque qui le démarque** (fil rouge, posé d'emblée) :
  - **Ancré droit français** — articles C.com./C.civ., jurisprudence Cass.
  - **Confidentiel par conception** — rien ne part vers un cloud tiers ; ghost
    anonymise les identifiants sensibles.
  - **Honnête** — toute sortie est un *brouillon soumis à validation humaine*, jamais
    « prêt à signer ».
- **Comment démarrer** : `entretien-demarrage` la première fois (profil cabinet), puis
  comment lancer un skill — mécanique slash-command en douceur. Mentionner `cas` comme
  porte d'entrée en langage naturel (« décris ton dossier ») si confirmé. `[review]`
- **Le réflexe à connaître** : après chaque analyse, le skill propose « **Que veux-tu
  faire ?** » (rédiger / escalader / compléter / surveiller) — *tu* tranches, il
  déroule. Cœur de l'expérience (validé opérationnel ce jour ; hygiène de continuation
  posée au CLAUDE.md).

### Couche 2 — La palette par situation

Quatre blocs. Sous chacun, des entrées **« j'ai un dossier de… »** au micro-format
unique :

> **Situation** (langage avocat) → **la commande** → **ce que ça te rend** (1 phrase)
> → **et ensuite** (ce qui s'enchaîne)

**Bloc A — Faire vivre la société**
`constitution-societe`, `gouvernance-ag`, `pacte-associes-review`, `financement-startup`.

**Bloc B — Faire un deal (M&A + PE)** — parcours NDA → LOI → DD → SPA → GAP → closing
`reviser-nda`, `loi-term-sheet`, `due-diligence-dataroom`, `spa-review`, `gap-review`,
`closing-checklist-fr`, `management-package-pe` (+ overlays `--pe` sur pacte / spa / gap
/ closing). `spa-review` = orchestrateur du flux, chaînage affiché.

**Bloc C — Traverser une difficulté** — routage prévention → procédure → cession →
responsabilité
`prevention-difficultes`, `declaration-cessation-paiements`, `declaration-creance`,
`pre-pack-cession`, `reprise-a-la-barre`, `cession-actifs-isoles`,
`responsabilite-dirigeant`, `defense-dirigeant`, `distress-cedant` (routeur cédant),
`asset-vs-share-distress` (routeur repreneur). Chaînage/routage affiché.

**Bloc D — Transverses du quotidien**
`reviser-contrat`, `reviser-nda` (NDA commercial), `cgv-generator`,
`mise-en-demeure-commerciale`, `analyser-rupture-brutale`, `due-diligence-dataroom`
(aussi deal), `revue-tabulaire` (extraction multi-docs, support).

### Section confidentialité & ghost

Honnête sur le statut : ghost = compagnon de confidentialité (anonymisation auto des
identifiants > seuil) ; **sans ghost**, compteur + avertissement, *tu* décides à chaque
fois. Ghost n'étant pas tout à fait prêt, la formulation exacte du statut (à venir /
optionnel / bêta) est **`[review]`** — Candy cale le wording.

### Section agents — RETIRÉE (2026-06-30)

Décision : **pas de section agents** dans cette version. Les 4 agents
(`bodacc-procedures-watcher`, `bodacc-watcher`, `echeances-societaires`,
`veille-jurisprudence`) n'ont **aucune trace de test** ; `veille-jurisprudence` a un
branchement MCP non confirmé (note « Wave 6 »). Advertir une capacité non vérifiée
contredit le pilier « honnête ». À réintroduire une fois les agents vérifiés (voir
tâche de vérification agents).

## 5. Machinerie non exposée comme « situation »

À ne PAS lister comme entrées situation (ce sont des rouages, mentionnés dans « comment
ça marche » au besoin) : `entretien-demarrage`, `check-pii`, `verifier-citations`,
`liste-de-points`, `cas`, `consulter-digest`. (`cas` est foregroundé en couche 1 comme
porte d'entrée, pas listé en palette.)

## 6. Garde-fous de périmètre

- DA seul. PI / sources / recherche : une ligne « fait partie d'une marketplace plus
  large », sans détail.
- Pas de noms de concurrents.
- Ne pas sur-promettre ghost (statut `[review]`).
- Registre : couche 1 accessible (early user Cowork) ; couche 2 en jargon métier réel
  (avocat se reconnaît dans sa situation).

## 7. Articulation avec les briefs personas (hors périmètre de CE doc, à trancher après)

Les deux briefs sont périmés (19 → 32). Décision séparée (tâche backlog) : les mettre à
jour (skill count, workflows, chemins) dans cette phase ou plus tard, et ajouter le
renvoi vers ce nouveau doc. **Non inclus dans l'implémentation de ce doc.**

## 8. Points `[review]` à résoudre en implémentation

1. Comportement exact de `cas` (porte d'entrée langage naturel ?) — vérifier le
   SKILL.md avant de le foregrounder.
2. Statut ghost — wording du « pas encore prêt ».
3. Overlays `--pe` — vérifier la liste exacte des skills portant l'overlay.
