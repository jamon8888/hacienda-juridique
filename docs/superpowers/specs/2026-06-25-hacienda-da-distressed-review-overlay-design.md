# Design — overlay `--distressed` sur `spa-review` / `gap-review`

**Date :** 2026-06-25
**Plugin :** `plugins/hacienda-droit-affaires` (DA)
**Version cible :** v0.14.0 → **v0.15.0** (skills inchangés : **31** — c'est un mode, pas un skill)
**Statut :** design validé (brainstorm) — à transformer en plan d'implémentation.

---

## 1. Intention

Relier le moat distressed-M&A au **quotidien M&A/PE**. Aujourd'hui `asset-vs-share-distress`
oriente (share vs asset, expo repreneur) **en amont**, et les playbooks barre
(`reprise-a-la-barre`, `cession-actifs-isoles`) couvrent la cession **judiciaire**.
Mais entre les deux — un **SPA / une GAP privés** sur une cible **en difficulté mais
pas encore à la barre** (pré-procédure, amiable, pre-pack) — la revue se fait
aujourd'hui avec `spa-review` / `gap-review` **standard**, qui ne voient pas les
risques distressed-spécifiques (période suspecte, passif non purgé, garantie de la
garantie face à un cédant insolvable).

L'overlay `--distressed` ajoute cette **lentille** aux deux revues, sans nouveau skill.

## 2. Architecture (décision validée : « B »)

**Flag `--distressed`** sur `spa-review` et `gap-review`, qui charge un **module de
référence partagé** `references/distressed-overlay-fr.md` (source unique de doctrine).

- Chaque skill gagne **une étape conditionnelle** (« Étape — Overlay difficulté »)
  qui n'exécute la grille distressed **que si** le flag est posé (ou accepté après
  auto-détection). Hors flag, les deux revues restent **strictement inchangées**.
- La doctrine distressed vit **une seule fois** dans le module ; les deux skills la
  lisent. Pas de duplication entre les deux SKILL.md.
- Pattern conforme à l'existant (`references/clauses-sensibles-fr.md`,
  `references/articles-c-civ-c-com-index.md` lus par les skills).

## 3. Activation (décision validée : « 2 »)

Le flag `--distressed` est le **déclencheur délibéré**. **En plus**, la revue standard
scanne des **signaux de difficulté** et, si elle en trouve **sans** flag, **propose**
l'overlay (ne l'impose pas) :

> « Signaux de difficulté détectés ({signaux}) — appliquer l'overlay distressed ? »

Signaux : mention de procédure collective / mandataire / conciliation / mandat ad hoc ;
cessation des paiements ; prix symbolique ou « 1 € + reprise de passif » ; earn-out de
sauvetage ; déclaration de créance ; cédant en perte continue / capitaux propres
négatifs ; sûretés récentes consenties pour dettes antérieures ; CS « absence de
procédure ». Cohérent avec le CLAUDE.md du plugin §7 (« échafaudage pas œillères ») :
filet de sécurité, jamais imposition.

## 4. Contenu du module partagé — `references/distressed-overlay-fr.md`

La doctrine distressed que la revue d'un SPA/GAP doit voir en plus. **Side-aware**
(lecture inversée acquéreur / cédant-débiteur). Le module **cross-link** ce que les
revues standard couvrent déjà (ICPE L.171-8 dans `gap-review`, L.1224-1) plutôt que
de le dupliquer ; il ajoute le **distressed-spécifique** :

1. **Période suspecte / nullités** — **L.632-1 C.com.** (nullités **de droit** : actes
   à titre gratuit, paiements de dettes non échues, paiements anormaux, sûretés pour
   dettes antérieurement contractées, prix manifestement déséquilibré) et **L.632-2**
   (nullités **facultatives** : actes à titre onéreux et paiements de dettes échues si
   le cocontractant connaissait la cessation des paiements). Risque #1 : un deal
   noué/clos en période suspecte avant l'ouverture d'une procédure est **annulable** —
   la date de cessation des paiements (fixée par le tribunal, rétroactive jusqu'à 18 mois)
   conditionne tout. Flag timing + clauses exposées. **Ne pas dater** la cessation des
   paiements (semaines relatives ; c'est le tribunal qui la fixe).
2. **Passif non purgé en share deal** — un share deal d'une société en difficulté
   hérite de **tout** le passif (dettes, litiges, fiscal, social, environnemental). La
   GAP devient la protection **centrale**, pas accessoire.
3. **Garantie de la garantie (cédant insolvable)** — une GAP d'un cédant en difficulté
   ne vaut **rien** sans **séquestre / garantie autonome à première demande (GAPD) /
   escrow / caution bancaire**. Point #1 de `gap-review --distressed`.
4. **Renvois transfert/solidarité** (cross-link, non re-traités au fond ici) :
   **L.1224-1** (transfert automatique des contrats de travail) · **solidarité fiscale**
   (L.1684 CGI cession de fonds ; L.267 LPF dirigeant) · **passif environnemental ICPE**
   (renvoi à l'axe environnement de `gap-review`).
5. **MAC & conditions suspensives spécifiques** — la cible peut basculer en cessation
   des paiements entre signing et closing → MAC et **CS « absence de procédure /
   d'état de cessation des paiements »** deviennent critiques ; clause de prix sous
   condition de non-ouverture.

**Lecture side-aware :**
- *Acquéreur* → se protéger du **passif hérité** (GAP centrale + garantie de la
  garantie) et du **risque de nullité** (vérifier le timing période suspecte).
- *Cédant / débiteur* → anticiper que le deal **sera attaqué** (nullité période
  suspecte) et qu'on **exigera** une garantie de la garantie ; le prix doit tenir
  compte du passif transféré.

## 5. Gate / frontières

- **Cible déjà en RJ/LJ avec appel d'offres ouvert** → ce **n'est pas** une revue de
  SPA privé : l'acte est **judiciaire** (plan de cession L.642) → renvoi
  `/h-da:reprise-a-la-barre` / `/h-da:cession-actifs-isoles`. L'overlay s'applique aux
  deals **pré-procédure / amiable / pre-pack** où il existe un **vrai SPA/GAP privé**.
  (Décision validée : l'overlay **refuse** et renvoie dès la barre.)
- **Cible pas réellement en difficulté** → pas d'overlay ; revue standard inchangée.
- **Amont** : l'overlay **consomme** le contexte de `asset-vs-share-distress` (qui a
  déjà tranché share vs asset et nommé l'expo repreneur) ; il ne refait pas
  l'orientation, il **revoit les clauses** du SPA/GAP réel.
- **Pré-pack** : si le SPA est un montage pre-pack (`pre-pack-cession`), l'overlay
  s'applique à la revue de l'acte ; il signale l'articulation avec la procédure à venir.

## 6. Anti-fabrication / garde-fous

Repris du socle DA, adaptés distressed :
- **Ne pas dater la cessation des paiements** ni la période suspecte (semaines
  relatives ; date fixée par le tribunal, rétroactive). Parallèle G1 des skills débiteur.
- **Ne pas chiffrer** le passif hérité ni l'exposition nullité — réclamer l'état du
  passif / la date de cessation des paiements `[à compléter]`.
- **Ne pas conclure** à la nullité d'un acte — la **qualifier** comme risque `[review]`
  (le tribunal annule ; conditions L.632-1/2 + connaissance pour L.632-2).
- **Ne pas évaluer** la responsabilité du dirigeant cédant — la **nommer** et renvoyer
  `responsabilite-dirigeant` (si exposition) ; pas de chevauchement.
- **Frontière barre** stricte (§5).

## 7. Naming, scoring, surface

- **Flag** : `--distressed` (décision validée).
- **Scoring** (décision validée : « 1 ») : **un cycle blind sur `spa-review --distressed`**
  (code 6 car., ex. `SPADIS`) — valide la doctrine du module partagé sur le chemin le
  plus dense. **Contrôle live miroir** sur `gap-review --distressed` (sanity, pas de
  cycle blind complet — même module). Dataset `tests/datasets/da-spa-review-distressed/`.
- **Surface livrée** :
  - `references/distressed-overlay-fr.md` (créé) ;
  - `skills/spa-review/SKILL.md` : flag `--distressed` à l'intake (item Mode) + étape
    conditionnelle « Overlay difficulté » + détection-qui-propose + frontière barre +
    mention « Ce skill ne fait pas » (ne date pas la CdP, ne conclut pas la nullité) ;
  - `skills/gap-review/SKILL.md` : idem (flag + étape conditionnelle centrée garantie
    de la garantie + détection + frontière) ;
  - README (mention du mode `--distressed` sous spa-review/gap-review) ;
  - bump version **v0.14.0 → v0.15.0** (6 emplacements) + CHANGELOG ;
  - `scripts/da-scoring.sh` : enregistrer une **entrée de scoring distincte
    `spa-review-distressed`** (code défaut `SPADIS` ; `spa-review`/`gap-review` ne sont
    pas dans le wrapper aujourd'hui) + dataset. L'entrée pointe la commande
    `/h-da:spa-review --distressed`.
- **Count structure inchangé (31)** — pas de nouveau skill.

## 8. Contraintes de build (existant)

- `spa-review` / `gap-review` contiennent déjà l'**ancien préfixe `/h-droit-affaires:`**
  dans leur contenu existant. **Ne pas** introduire de nouveau préfixe périmé : mes
  ajouts utilisent **`/h-da:`** uniquement. Ne pas mass-fixer les anciens (hors scope) ;
  vérifier que le test de structure reste vert après édition.
- Squelette V2 des deux skills à **préserver** (ordre des headings imposé par
  `hacienda-droit-affaires-cowork-structure.test.ts`) : l'étape conditionnelle s'insère
  dans la section `## Sortie` / les `## Étape N`, sans casser l'ordre canonique.
- Module `references/distressed-overlay-fr.md` : articles cités doivent exister dans
  `references/articles-c-civ-c-com-index.md` (sinon `[à vérifier]`) — ajouter L.632-1,
  L.632-2 s'ils manquent.

## 9. Ce que l'overlay ne fait pas

- **Refaire l'orientation** share vs asset (→ `asset-vs-share-distress`).
- **Couvrir la cession judiciaire** à la barre (→ `reprise-a-la-barre` /
  `cession-actifs-isoles`).
- **Dater** la cessation des paiements / la période suspecte (tribunal ; semaines
  relatives).
- **Conclure** à la nullité d'un acte (qualifie le risque `[review]`).
- **Évaluer** la responsabilité du dirigeant (→ `responsabilite-dirigeant`).
- **Chiffrer** le passif hérité (→ état du passif `[à compléter]`).
- Le conseil **fiscal** au fond (solidarité nommée, renvoi).

## 10. Hors scope (futurs cycles)

- Un cycle blind dédié `gap-review --distressed` (si le live miroir révèle un delta
  doctrinal propre non couvert par le module).
- AMF / cibles cotées (v2).
- Mode `--draft` (autre piste, non retenue ici).

## 11. Acquis méthodo réutilisés

- Module partagé = source unique (évite la divergence entre deux SKILL.md), pattern
  `clauses-sensibles-fr.md`.
- Anti-fabrication verrouillé dans le module dès le build (dates relatives, no-quantum,
  nullité en risque `[review]`).
- Checkpoint gates avant Phase 3 (gate-piège, pas gate-recall ; pas d'asymétrie liste
  conjonctive / silence orphelin). Cf. `[[feedback-gate-calibration-scoring]]`.
