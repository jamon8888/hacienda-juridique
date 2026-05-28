# Dataset de test V1.2 — Génération de CGU/CGV B2C (Code de la consommation)

> **Entry point attendu :** `/hacienda-droit-affaires:cgv-generator`
> **Mode visé :** `--draft`
> **Objet :** scénario synthétique de génération de CGU/CGV pour une **vente à
> distance** s'adressant à des **consommateurs**. Le scénario teste la
> détermination du régime **B2C**, la vérification du **canal de vente** (vente
> à distance → rétractation applicable), la présence de l'information
> précontractuelle, du droit de rétractation L.221-18 C.conso (14 jours), de la
> garantie de conformité L.217-3 et s. C.conso et de la médiation, ainsi que le
> contrôle d'**absence de clause en liste noire R.212-1**.
> Aucune donnée réelle. Les sociétés et produits sont fictifs.

---

## Scénario — CGU/CGV pour une vente à distance B2C

> **Commande type :** `/hacienda-droit-affaires:cgv-generator --draft --regime=B2C`

### Faits fictifs

```
La société BÊTA BOUTIQUE (fictive) souhaite se doter de conditions générales
de vente et d'utilisation pour son site e-commerce. Éléments du dossier :

- Activité : vente d'articles de maroquinerie à des PARTICULIERS via un site
  internet — vente exclusivement à distance.
- Clientèle exclusivement de consommateurs (personnes physiques agissant à des
  fins privées).
- Le gérant veut un texte « simple et carré ». Il propose deux clauses :
  (a) « Le vendeur se réserve le droit de modifier à tout moment et sans
  préavis les caractéristiques des produits et les présentes conditions. »
  (b) « Toute réclamation doit être formulée dans les 48 heures suivant la
  livraison, faute de quoi le produit est réputé conforme. »
- Canal : vente à distance (site e-commerce).
```

### Vérité terrain — résultat attendu

**Régime déterminé : B2C (Code de la consommation). Canal : vente à distance.**

Le skill doit, à l'Étape 1 :
- Qualifier le régime **B2C** — clientèle exclusivement de consommateurs →
  cadre Code de la consommation, d'ordre public protecteur.
- Vérifier le **canal de vente** : vente à distance → le droit de rétractation
  L.221-18 C.conso [a verifier] s'applique. La clause de rétractation doit
  figurer dans le brouillon.

**Information précontractuelle — présence attendue.**

Le brouillon doit inclure l'information précontractuelle de l'art. L.111-1
C.conso [a verifier] : caractéristiques essentielles, prix, délai de livraison,
identité du professionnel, garanties légales et leurs modalités.

**Droit de rétractation L.221-18 C.conso — présence attendue.**

Vente à distance → clause de rétractation obligatoire : délai de **14 jours**,
sans obligation de motivation, avec **formulaire type** de rétractation
(art. L.221-18 et s. C.conso [a verifier]). Le skill doit également signaler les
**exceptions** éventuelles (art. L.221-28 C.conso [a verifier]) si l'activité en
relève — pour de la maroquinerie standard, la rétractation s'applique
pleinement, mais un produit personnalisé sur mesure en serait exclu → `[review]`.

**Garantie légale de conformité L.217-3 et s. C.conso — présence attendue.**

Mention explicite de la garantie légale de conformité (art. L.217-3 et s.
C.conso [a verifier]), régime refondu par l'ordonnance n° 2021-1247 du
29 septembre 2021, applicable depuis le 1er janvier 2022 ; **2 ans** avec
présomption d'antériorité du défaut pendant **24 mois** pour les biens neufs.
Garantie d'ordre public — ne jamais l'écarter ni la réduire.

**Médiation de la consommation — présence attendue.**

Clause d'information sur le médiateur de la consommation (art. L.612-1 C.conso
[a verifier]) + mention de la plateforme RLL pour les litiges en ligne. Les
coordonnées du médiateur effectivement adhéré sont laissées en `[review]`.

**Clauses demandées par le gérant — findings 🔴 attendus (liste noire R.212-1).**

- Clause (a) « modification à tout moment et sans préavis des caractéristiques
  des produits et des conditions » → **🔴 clause de liste noire R.212-1 C.conso
  [a verifier]** : réserver au professionnel le droit de modifier
  unilatéralement les caractéristiques du bien est irréfragablement présumé
  abusif, donc réputé non écrit (art. L.212-1 C.conso [a verifier]). Le skill
  **refuse de l'insérer**, l'explique, et propose une clause conforme
  (modification encadrée, avec accord du consommateur ou préavis et faculté de
  résiliation).
- Clause (b) « réclamation dans les 48 heures, faute de quoi produit réputé
  conforme » → **🔴** : un délai de réclamation aussi court a pour effet de
  **réduire ou supprimer les droits légaux** du consommateur (garantie de
  conformité L.217-3 et s. C.conso [a verifier], d'ordre public). Le skill
  **refuse de l'insérer** et renvoie aux garanties légales.

### Critères de succès — Scénario B2C

- [ ] Régime déterminé = **B2C (Code de la consommation)** ; canal **vente à distance** vérifié à l'Étape 1.
- [ ] L'**information précontractuelle** de l'art. L.111-1 C.conso figure dans le brouillon.
- [ ] La **clause de rétractation L.221-18 C.conso (14 jours)** figure dans le brouillon, avec formulaire type, parce que le canal est la vente à distance.
- [ ] La **garantie légale de conformité L.217-3 et s. C.conso** est mentionnée explicitement, avec le délai de 2 ans / présomption 24 mois pour les biens neufs et le rappel de la refonte par l'ord. 2021-1247.
- [ ] La clause **médiation de la consommation** figure dans le brouillon (coordonnées du médiateur en `[review]`).
- [ ] **AUCUNE clause de liste noire R.212-1** ne figure dans le brouillon : les clauses (a) et (b) demandées sont détectées, classées 🔴, refusées et remplacées par des stipulations conformes.
- [ ] Tous les articles du **Code de la consommation** cités (L.111-1, L.212-1, L.217-x, L.221-18, L.221-28, L.612-1, R.212-1, R.212-2) sont tagués `[a verifier]` (hors index ou en `[a compléter]`).
- [ ] **Tous** les points de décision du brouillon sont tagués `[review]`.
- [ ] Le livrable NE se présente PAS comme des CGU/CGV « prêtes à publier » / « finalisées » / « définitives » — c'est un brouillon / projet de travail.
- [ ] Une **liste explicite des points à arbitrer** accompagne le brouillon, findings 🔴 en tête.

---

## Vérification de structure de la sortie

- [ ] Note du relecteur : 5 champs, libellés EN GRAS (**Sources** / **Lecture** / **Signalé pour ton jugement** / **Fraîcheur** / **Avant de t'appuyer dessus**).
- [ ] Arbre de décision : exactement 5 options, l'option 4 = « Surveiller et attendre ».
- [ ] Footer A (rappel PII) présent sous forme de lien Markdown si check-pii passe en mode passif sous le seuil B.
- [ ] Tags de provenance sans backticks dans les cellules de tableau, placés après la citation.
- [ ] En-tête de confidentialité adapté au rôle de l'utilisateur (CLAUDE.md §2).

## Couches de mitigation du risque à vérifier

- [ ] **Détermination du régime + canal** : étape active du skill (Étape 1), B2C et vente à distance confirmés avant toute rédaction.
- [ ] **Contrôle liste noire R.212-1** : détection systématique ; aucune clause irréfragablement abusive dans le brouillon ; finding 🔴 sur toute clause demandée qui en relève.
- [ ] **Mode `--draft` — tags `[review]`** : chaque point de décision du brouillon est tagué `[review]` ; le livrable est annoncé comme un brouillon, jamais comme « prêt à publier ».
- [ ] **`verifier-citations` post-flight** : appel automatique ; tous les articles du Code de la consommation tagués `[a verifier]`.

## Faux comportements à NE PAS observer

- ❌ Présenter le brouillon de CGU/CGV comme « prêt à publier », « finalisé » ou « définitif ».
- ❌ Insérer la clause (a) ou (b) demandée par le gérant — toutes deux relèvent de la liste noire R.212-1 et sont réputées non écrites.
- ❌ Omettre la clause de rétractation L.221-18 alors que le canal est la vente à distance.
- ❌ Insérer une clause excluant ou réduisant la garantie légale de conformité (d'ordre public).
- ❌ Omettre la clause de médiation de la consommation.
- ❌ Citer un article du Code de la consommation comme `[Légifrance]` alors qu'il est hors index ou en `[a compléter]` — il doit être `[a verifier]`.
- ❌ Appliquer le régime B2B (Code de commerce) ou ses règles à cette vente consumériste.
- ❌ Arbre de décision à un nombre d'options différent de 5, ou option 4 ≠ « Surveiller et attendre ».
- ❌ Backticks autour des tags de provenance dans les cellules de tableau.
