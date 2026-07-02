# La méthodo de scoring blind — expliquée à 2 niveaux

*Support de communication. La méthode canonique de référence reste
[`sparring-scoring-protocol.md`](sparring-scoring-protocol.md).*

---

## ⏱️ Version orale — 3 phrases max

### Expert
On valide nos skills juridiques par un protocole **blind à 4 acteurs cloisonnés** (dataset, vérité
terrain, exécution, scoring), idéalement de lignées de modèles différentes, pour éliminer le biais
d'auto-évaluation. La vérité terrain **EST** une grille de critères atomiques PASS/FAIL notés avec
**preuve citée** et agrégés déterministiquement ; les critères `CRITIQUE` sont des **gates-pièges**
qui testent l'erreur qui **trompe le client**, pas la récitation d'une doctrine. On release sur le
**gate-clean** — aucun critère critique en échec — et **non sur le score chiffré**, qui n'est qu'un
artefact de profondeur sur grille dense.

### Débutant
Pour savoir si nos assistants IA juridiques sont bons **sans nous mentir**, on les fait passer un
examen où **quatre personnes qui ne se voient pas** écrivent le sujet, le corrigé, passent l'épreuve
et corrigent — impossible de tricher. On sépare deux types d'erreurs : celles qui **tromperaient le
client** (éliminatoires) et celles où l'IA est juste **incomplète** (pas grave, c'est un brouillon à
relire). On valide l'outil **s'il ne commet aucune erreur dangereuse** — pas parce qu'il a « 20/20 ».

---

# 🎓 Niveau expert

## Le problème résolu
Comment **valider en interne** la qualité d'un skill juridique (assistant IA) de façon
**défendable**, sans le biais fatal de l'**auto-évaluation** : si le même acteur conçoit le skill,
écrit le cas de test, définit la « bonne réponse » et note — il évalue ses propres attentes, pas une
vérité indépendante. Le score est alors une borne supérieure flatteuse, pas une mesure release-grade.

## Le principe : *blind* à 4 acteurs séparés
Un scoring fiable exige **4 rôles cloisonnés**, idéalement de **lignées de modèles différentes**
(Codex/GPT pour 1-2-4, Claude pour 3), chacun ne voyant que ce qu'il doit voir :

| Phase | Acteur | Voit | **Ne voit pas** |
|---|---|---|---|
| **1. Dataset** | Codex (medium) | le besoin métier | — |
| **2. Vérité terrain** | Codex (**HIGH**) | le scénario + description **neutre** du skill | ❌ le `SKILL.md` |
| **3. Exécution live** | Claude Code (natif) | le scénario seul | ❌ la vérité terrain |
| **4. Scoring** | Codex (medium) | scénario + vérité terrain + sortie live | ❌ le `SKILL.md` |

Sans ce cloisonnement (anti-leakage), le scoring redevient une auto-évaluation déguisée. Tout scoring
qui viole la séparation est marqué `[scoring auto-référent]` et ne peut **pas** justifier une décision
release.

## Le format : criteria atomiques *tiered-gated* (approche « Harvey LAB »)
- La **vérité terrain produite EST la grille** d'évaluation — pas de « golden answer » séparé. Elle
  est une liste de **critères atomiques** PASS/FAIL, chacun avec un **niveau** : `CRITIQUE`, `MAJEUR`,
  `MINEUR`.
- Le scoreur (Phase 4) rend un **verdict PASS/FAIL par critère + une `preuve`** (citation du livrable
  ≤15 mots, ou `absent`). La `preuve` est un garde-fou **anti-hallucination** (force à localiser le
  passage) et un **audit** a posteriori (persistée dans `verdicts-<code>.json`).
- Le **statut** (REJETÉ / ADMIS / RÉSERVES / INSUFFISANT) et le score sont calculés
  **déterministiquement** (`tiered_scoring.py`), jamais par le scoreur. Le niveau est **autoritatif
  depuis la vérité terrain**, jamais réinventé par le scoreur.

## Le calibrage des critères — le cœur subtil
- **Gate-piège, pas gate-recall.** Un critère `CRITIQUE` teste une **erreur affirmative qui trompe le
  client** (qualifier d'illégal ce qui est légal, mauvais régime, valider un acte vicié, donner un
  avis fiscal de fond). Il ne teste **jamais** la récitation d'une doctrine ni l'oubli d'un sous-item
  — ça, c'est `MAJEUR`/`MINEUR`.
- **Densité bornée** (20-30 critères). Une grille trop dense fragmente en sous-items conjonctifs et
  produit des **faux FAIL de profondeur** sur un livrable brouillon.

## La décision de release — le point contre-intuitif
On **release sur le *gate-clean***, **pas sur le score chiffré**.
- Sur une grille dense, le score est un **artefact** : un brouillon single-pass ne déroule pas chaque
  sous-item → beaucoup de MAJEUR FAIL → score effondré, **même si le skill est sûr**.
- Le **gate** (peu de critères CRITIQUE, binaire, vérifiable à la main) **résiste au bruit** du
  scoreur. Un `REJETÉ` = au moins un CRITIQUE FAIL = un vrai danger. Un gate propre = aucun danger
  commis = releasable.
- Garde-fous : **spot-checker chaque FAIL contre la sortie live** avant de conclure à un déficit (le
  scoreur produit des faux négatifs) ; **borner les cycles** (à seuil d'admission strict, un critère
  peut osciller PASS/FAIL sur des runs frais = variance).

## Deux pièges appris
- **Module ≠ live** : enrichir la doctrine de référence ne remonte **pas** dans le brouillon live.
  Pour corriger un danger → agir sur le `SKILL.md` ; pour la profondeur → borner la grille.
- **Recalibrage checkpoint** : élever/démoter un gate après Phase 2 est admissible **si tracé et
  validé par un humain** (cohérence interne : le PASS doit être l'exact inverse du trigger FAIL).

---

# 🌱 Niveau débutant / vulgarisation

## La question de départ
On construit des assistants IA pour des avocats. **Comment savoir s'ils sont vraiment bons** — sans
se mentir à soi-même ? Le piège classique : celui qui a construit l'outil est aussi celui qui le
note. Forcément, il se donne une bonne note.

## L'idée : un examen où personne ne peut tricher
On sépare le travail entre **4 personnes qui ne peuvent pas se voir**, comme un examen anonyme :

1. **Quelqu'un invente le sujet** — un cas juridique réaliste (une entreprise fictive, des documents).
2. **Quelqu'un d'autre écrit le corrigé** — ce qu'un excellent avocat devrait repérer. Mais il **ne
   sait pas** comment l'IA a été conçue.
3. **L'IA passe l'examen** — sans voir le corrigé.
4. **Un dernier corrige la copie** — sans savoir comment l'IA a été fabriquée.

Comme aucun des quatre ne peut s'aligner avec les autres, **le résultat ne peut pas être truqué**.
C'est ça, le « blind ».

## Deux sortes d'erreurs — et une seule qui est grave
- 🔴 **L'erreur dangereuse** : celle qui **tromperait le client** — dire qu'une clause illégale est
  valable, donner un conseil fiscal faux, valider un document vicié. **Éliminatoire.**
- 🟡 **L'erreur d'incomplétude** : l'IA a bien vu le sujet mais n'a pas tout déroulé dans le détail.
  **Noté, mais pas éliminatoire** — c'est un brouillon à faire relire, pas un danger.

## La règle de décision — la vraie astuce
On ne valide **pas** un outil sur sa note globale. On le valide sur : **« aucune erreur
dangereuse »**. Pourquoi ? Sur un examen très exigeant, même une bonne copie a une note qui **paraît
basse** (elle n'a pas coché chaque micro-détail) — mais ça ne veut pas dire qu'elle est dangereuse.
Le signal fiable, ce n'est pas le chiffre — c'est : **est-ce que l'IA a commis une faute qui
tromperait le client ? Non → on peut la sortir.**

## Le garde-fou anti-tricherie du correcteur
On oblige le correcteur à **citer le passage exact** de la copie pour chaque note qu'il met. Ça
l'empêche de noter « au feeling » sans avoir vraiment regardé — et ça nous permet de **vérifier son
travail** ensuite.

> **En une phrase :** *quatre personnes qui ne se parlent pas notent l'IA à l'aveugle ; on la sort si
> elle ne fait aucune erreur qui tromperait le client — pas parce qu'elle a « 20/20 ».*
