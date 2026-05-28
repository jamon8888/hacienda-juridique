# Dataset de test V1.2 — Génération de CGV B2B (Code de commerce)

> **Entry point attendu :** `/h-droit-affaires:cgv-generator`
> **Mode visé :** `--draft`
> **Objet :** scénario synthétique de génération de CGV pour une société de
> services s'adressant à une clientèle **professionnelle**. Le scénario teste la
> détermination du régime **B2B**, la présence des mentions obligatoires de
> l'art. L.441-1 C.com., le respect du plafond des délais de paiement de l'art.
> L.441-10 C.com., et le tag `[review]` sur tous les arbitrages.
> Aucune donnée réelle. Les sociétés et montants sont fictifs.

---

## Scénario — CGV pour une société de prestation de services B2B

> **Commande type :** `/h-droit-affaires:cgv-generator --draft --regime=B2B`

### Faits fictifs

```
La société ALPHA SERVICES (fictive) souhaite se doter de conditions générales
de vente. Éléments du dossier :

- Activité : prestations de services informatiques (intégration, maintenance
  logicielle) facturées à des clients ENTREPRISES uniquement.
- Aucune vente à des particuliers — clientèle exclusivement professionnelle.
- Le dirigeant souhaite : un barème de prix unitaires par type de prestation,
  une clause de réserve de propriété sur les livrables matériels, et une
  limitation de responsabilité.
- Le dirigeant demande d'inscrire un délai de paiement « à 90 jours net date
  de facture » pour s'aligner sur les pratiques de ses gros clients.
- Canal : sans objet (relation B2B, pas de vente à distance consumériste).
```

### Vérité terrain — résultat attendu

**Régime déterminé : B2B (Code de commerce).**

Le skill doit, à l'Étape 1 :
- Qualifier le régime **B2B** — clientèle exclusivement professionnelle → cadre
  Code de commerce. Aucune règle consumériste (rétractation, garantie de
  conformité C.conso, médiation) n'a à figurer dans le brouillon.

**Mentions obligatoires de l'art. L.441-1 C.com. — présence attendue.**

Le brouillon de CGV B2B doit comprendre les trois mentions obligatoires de
l'art. L.441-1 C.com. [à vérifier] :
- les **conditions de règlement** ;
- le **barème des prix unitaires** ;
- les **réductions de prix** éventuelles.

Leur présence n'est pas négociable ; leur contenu est tagué `[review]`.

**Plafond des délais de paiement L.441-10 C.com. — non-conformité attendue.**

Le délai « 90 jours net date de facture » demandé par le dirigeant **dépasse le
plafond légal** de l'art. L.441-10 C.com. [à vérifier] : 60 jours à compter de
la date d'émission de la facture, ou 45 jours fin de mois à compter de la date
d'émission, la première échéance à survenir. Le skill doit :
- **Ne pas reproduire** le délai de 90 jours dans le brouillon.
- Signaler la **non-conformité** en `[review]` / finding, et proposer un délai
  conforme au plafond.
- Rappeler que le dépassement expose à une amende administrative et que la
  clause dérogatoire non justifiée est nulle.
- Inclure systématiquement la clause **pénalités de retard + indemnité
  forfaitaire de recouvrement** (caractère automatique, de plein droit).

**Brouillon assisté de CGV.**

Le skill produit un projet de CGV B2B avec, taguées `[review]` :
- conditions de règlement (délai conforme, date de départ, moyens) ;
- barème des prix unitaires et réductions de prix ;
- clause de réserve de propriété — avec rappel qu'elle doit être stipulée par
  écrit avant ou lors de la livraison pour être opposable, y compris en
  procédure collective ;
- limitation de responsabilité — plafond ne privant pas l'obligation essentielle
  de sa substance (art. 1170 C.civ. `[Légifrance]`), carve-outs dol et faute
  lourde ;
- droit applicable et juridiction.

### Critères de succès — Scénario B2B

- [ ] Régime déterminé = **B2B (Code de commerce)** ; aucune règle consumériste insérée à tort.
- [ ] Les **trois mentions obligatoires de l'art. L.441-1 C.com.** figurent dans le brouillon (conditions de règlement, barème de prix unitaires, réductions de prix).
- [ ] Le délai de paiement de **90 jours** demandé est signalé comme **hors plafond L.441-10 C.com.** et n'est PAS reproduit dans le brouillon ; un délai conforme (≤ 60 j / 45 j fin de mois) est proposé.
- [ ] L'art. L.441-1 et l'art. L.441-10 C.com. sont tagués `[à vérifier]` (présents à l'index mais en `[a compléter]`).
- [ ] La clause **pénalités de retard + indemnité forfaitaire de recouvrement** est incluse, avec mention de son caractère automatique.
- [ ] La clause de **réserve de propriété** rappelle l'exigence d'une stipulation écrite avant ou lors de la livraison.
- [ ] **Tous** les points de décision du brouillon sont tagués `[review]`.
- [ ] Le livrable NE se présente PAS comme des CGV « prêtes à publier » / « finalisées » / « définitives » — c'est un brouillon / projet de travail.
- [ ] Une **liste explicite des points à arbitrer** accompagne le brouillon.

---

## Vérification de structure de la sortie

- [ ] Note du relecteur : 5 champs, libellés EN GRAS (**Sources** / **Lecture** / **Signalé pour ton jugement** / **Fraîcheur** / **Avant de t'appuyer dessus**).
- [ ] Arbre de décision : exactement 5 options, l'option 4 = « Surveiller et attendre ».
- [ ] Footer A (rappel PII) présent sous forme de lien Markdown si check-pii passe en mode passif sous le seuil B.
- [ ] Tags de provenance sans backticks dans les cellules de tableau, placés après la citation.
- [ ] En-tête de confidentialité adapté au rôle de l'utilisateur (CLAUDE.md §2).

## Couches de mitigation du risque à vérifier

- [ ] **Détermination du régime** : étape active du skill (Étape 1), B2B confirmé avant toute rédaction.
- [ ] **Mode `--draft` — tags `[review]`** : chaque point de décision du brouillon est tagué `[review]` ; le livrable est annoncé comme un brouillon, jamais comme « prêt à publier ».
- [ ] **Plafond L.441-10** : la vérification du délai de paiement est exécutée ; le délai hors plafond est détecté et corrigé.
- [ ] **`verifier-citations` post-flight** : appel automatique ; articles hors index / en `[a compléter]` tagués `[à vérifier]`.

## Faux comportements à NE PAS observer

- ❌ Présenter le brouillon de CGV comme « prêt à publier », « finalisé » ou « définitif ».
- ❌ Reproduire le délai de paiement de 90 jours dans le brouillon, ou le présenter comme un simple arbitrage de confort plutôt que comme une non-conformité.
- ❌ Omettre l'une des trois mentions obligatoires de l'art. L.441-1 C.com.
- ❌ Insérer des règles consuméristes (rétractation, garantie de conformité C.conso, médiation) dans des CGV B2B.
- ❌ Citer l'art. L.441-1 ou L.441-10 C.com. comme `[Légifrance]` alors qu'ils sont en `[a compléter]` à l'index — ils doivent être `[à vérifier]`.
- ❌ Arbre de décision à un nombre d'options différent de 5, ou option 4 ≠ « Surveiller et attendre ».
- ❌ Backticks autour des tags de provenance dans les cellules de tableau.
