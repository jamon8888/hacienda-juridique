# Dataset de test V1.1 — Constitution de société (2 scénarios)

> **Entry point attendu :** `/hacienda-droit-affaires:constitution-societe`
> **Objet :** deux scénarios de constitution synthétiques. Le premier teste le
> mode `--comparer` (aide au choix de forme), le second teste le mode `--draft`
> et la **bifurcation des actes** (détection de l'acte notarié obligatoire).
> Aucune donnée réelle. Les personnes, sociétés, biens et montants sont fictifs.

---

## Scénario 1 — Startup à 3 fondateurs, ambition de levée de fonds

> **Mode visé :** `--comparer`
> **Commande type :** `/hacienda-droit-affaires:constitution-societe --comparer`

### Faits fictifs

```
Trois fondateurs — Mme UN, M. DEUX, Mme TROIS — souhaitent créer une société
pour exploiter une plateforme logicielle. Éléments du dossier :

- 3 fondateurs, tous personnes physiques, apports en numéraire.
- Ambition affichée : lever un premier tour de financement auprès d'un fonds
  d'investissement dans un horizon de 12 à 18 mois.
- Le fondateur pressenti comme dirigeant souhaite relever du régime
  « assimilé salarié ».
- Les fondateurs veulent une gouvernance souple, capable d'accueillir des
  investisseurs (actions de préférence, organes de gouvernance ad hoc).
- Capital de départ envisagé : modeste (quelques milliers d'euros).
```

### Vérité terrain — résultat attendu

**Recommandation attendue : SAS.**

Motifs que le skill doit faire ressortir :
- **Souplesse statutaire** — la SAS offre la plus grande liberté d'organisation
  des organes et des décisions collectives (art. L.227-9 C.com. — présent dans
  l'index avec LEGIARTI, citer `[Légifrance]`) ; adaptée à une gouvernance
  sur-mesure et à l'accueil d'investisseurs.
- **Accueil d'investisseurs** — la SAS permet aisément les actions de
  préférence et les BSA, et n'impose pas d'agrément légal des cessions
  (agrément seulement si clause statutaire, art. L.227-14 C.com. `[Légifrance]`).
- **Régime social du dirigeant** — le président de SAS est **assimilé salarié**,
  ce qui correspond au souhait exprimé `[a verifier]` (régime social — critère
  social, renvoi expert-comptable).
- **Capital** — la SAS n'a pas de capital minimum légal, compatible avec un
  capital de départ modeste.

Formes à écarter, avec motivation :
- **SARL** — agrément **légal et obligatoire** des cessions à des tiers (art.
  L.223-14 C.com. `[Légifrance]`), rigidité peu compatible avec une levée ;
  un gérant majoritaire serait travailleur non salarié, pas assimilé salarié ;
  plafond de 100 associés `[a verifier]`.
- **SA** — capital minimum 37 000 € `[a verifier]` excessif pour un démarrage
  modeste ; formalisme de gouvernance lourd (conseil d'administration ou
  directoire) ; apport en industrie interdit (art. L.225-3 C.com. `[Légifrance]`).
  Forme surdimensionnée à ce stade.

Tags `[review]` attendus : sur le **régime social effectif** du dirigeant et
sur tout arbitrage **fiscal** (IS/IR) → renvoi expert-comptable, pas de conseil
fiscal détaillé dans la sortie.

### Critères de succès — Scénario 1

- [ ] Recommandation = **SAS**, motivée par souplesse + accueil investisseurs + régime assimilé salarié + absence de capital minimum.
- [ ] SARL et SA explicitement écartées avec un motif juridique correct chacune.
- [ ] L'agrément légal des cessions en SARL (art. L.223-14 C.com.) est cité avec le tag `[Légifrance]` (article présent dans l'index avec LEGIARTI).
- [ ] Le capital minimum de la SA (37 000 €) est tagué `[a verifier]` (seuil non figé dans l'index).
- [ ] Les arbitrages fiscaux / sociaux sont tagués `[review]` et renvoyés à l'expert-comptable — pas de conseil fiscal détaillé.
- [ ] Aucune affirmation présentée comme un choix définitif : la recommandation de forme est un point de départ, la rédaction des statuts reste à faire.

---

## Scénario 2 — Constitution avec apport en nature d'un local commercial

> **Mode visé :** `--draft`
> **Commande type :** `/hacienda-droit-affaires:constitution-societe --draft --forme=SARL`

### Faits fictifs

```
Deux associés — M. QUATRE et Mme CINQ — souhaitent constituer une SARL pour
exploiter un commerce de détail. Éléments du dossier :

- 2 associés, personnes physiques.
- M. QUATRE apporte des espèces (apport en numéraire).
- Mme CINQ apporte un LOCAL COMMERCIAL dont elle est propriétaire — un bien
  IMMOBILIER — qu'elle valorise à un montant significatif.
- La société sera dirigée par un gérant unique.
```

### Vérité terrain — résultat attendu

**Bifurcation des actes — détection attendue : 🔴 acte notarié obligatoire.**

Le skill doit, à l'Étape 1 (`--draft`) :
- Identifier que l'apport de Mme CINQ porte sur un **immeuble** (local
  commercial).
- Signaler **🔴 « acte notarié obligatoire »** et **exposer le motif** : la
  mutation d'un droit réel immobilier doit, pour être opposable aux tiers, être
  **publiée au service de la publicité foncière** ; or la publicité foncière
  n'accepte que des **actes authentiques**. Un apport d'immeuble constaté par un
  simple acte sous seing privé serait impubliable, donc inopposable. La forme de
  l'acte n'est **pas un arbitrage** ici : elle est imposée.
- **Renvoyer vers le notaire partenaire** configuré au profil cabinet (bloc
  « vie sociale »).

**Commissaire aux apports — signalement attendu.**

L'apport en nature (le local) déclenche aussi la règle du **commissaire aux
apports** :
- désignation de principe pour évaluer l'apport — SARL : art. L.223-9 C.com.
  (présent dans l'index avec LEGIARTI, citer `[Légifrance]`) ;
- dispense possible **à l'unanimité des associés** **et** sous **double seuil
  réglementaire** (montant unitaire de l'apport / fraction du capital) — les
  **seuils chiffrés sont réglementaires** (`R.xxx`, hors index) et doivent être
  tagués `[a verifier]` ;
- la dispense **ne supprime pas** la responsabilité : les associés restent
  **solidairement responsables, 5 ans, de la valeur attribuée** au local
  `[a verifier]`. Le skill doit expliciter ce point.

**Brouillon assisté de statuts.**

Le skill produit un projet de statuts SARL avec :
- les **mentions obligatoires de l'art. L.210-2 C.com.** `[Légifrance]` (forme,
  durée, dénomination, siège, objet, capital) ;
- chaque clause d'arbitrage taguée `[review]` (montant et libération du capital,
  agrément des cessions de parts art. L.223-14 C.com. `[Légifrance]`, quorum et
  majorité art. L.223-30 C.com. `[Légifrance]`, modalités de gérance,
  inaliénabilité éventuelle) ;
- le point « choix SSP vs notarié » résolu : **notarié imposé** (non arbitré).

### Critères de succès — Scénario 2

- [ ] La présence d'un **immeuble** parmi les apports est identifiée.
- [ ] **🔴 acte notarié obligatoire** est signalé, AVEC le motif (publicité foncière / opposabilité / acte authentique exigé) — pas seulement la règle nue.
- [ ] Renvoi vers le **notaire partenaire** du profil cabinet.
- [ ] La règle du **commissaire aux apports** est signalée (apport en nature), art. L.223-9 C.com. cité avec `[Légifrance]`.
- [ ] Les **seuils chiffrés** de dispense du commissaire aux apports sont tagués `[a verifier]` (réglementaires, hors index).
- [ ] La **responsabilité solidaire 5 ans** des associés sur la valeur de l'apport est explicitée — la dispense n'est pas présentée comme une exonération.
- [ ] Les **mentions obligatoires de l'art. L.210-2 C.com.** figurent dans le brouillon.
- [ ] **Tous** les points de décision du brouillon sont tagués `[review]`.
- [ ] Le livrable NE se présente PAS comme des statuts « prêts à déposer » / « prêts à signer » / « définitifs » — c'est un brouillon / projet de travail.
- [ ] Une **liste explicite des points à arbitrer** accompagne le brouillon.

---

## Vérification de structure de la sortie (commune aux 2 scénarios)

- [ ] Note du relecteur : 5 champs, libellés EN GRAS (**Sources** / **Lecture** / **Signalé pour ton jugement** / **Fraîcheur** / **Avant de t'appuyer dessus**).
- [ ] Arbre de décision : exactement 5 options, l'option 4 = « Surveiller et attendre ».
- [ ] Footer A (rappel PII) présent sous forme de lien Markdown si check-pii passe en mode passif sous le seuil B.
- [ ] Tags de provenance sans backticks dans les cellules de tableau, placés après la citation.
- [ ] En-tête de confidentialité adapté au rôle de l'utilisateur (CLAUDE.md §2).

## Couches de mitigation du risque à vérifier (R2)

- [ ] **Mode `--draft` — tags `[review]`** : chaque point de décision du brouillon est tagué `[review]` ; le livrable est annoncé comme un brouillon, jamais comme final / « prêt à déposer ».
- [ ] **Bifurcation des actes** : la détection SSP vs notarié est une étape active du skill (Étape 1 `--draft`), pas une simple mention — elle est exécutée sur le scénario 2 et conclut à l'acte notarié obligatoire.
- [ ] **`verifier-citations` post-flight** : appel automatique sur la sortie complète (Étape 3 `--draft`) ; articles hors index / `R.xxx` tagués `[a verifier]`.

## Faux comportements à NE PAS observer

- ❌ Présenter le brouillon de statuts comme « prêt à déposer », « prêt à signer » ou « définitif ».
- ❌ Sur le scénario 2, omettre la détection de l'acte notarié obligatoire ou la présenter comme une simple option de confort.
- ❌ Exposer la règle de l'acte notarié sans le motif (publicité foncière).
- ❌ Énoncer un seuil chiffré réglementaire (capital SA, dispense commissaire aux apports) comme un fait, sans `[a verifier]`.
- ❌ Présenter la dispense de commissaire aux apports comme une exonération de responsabilité des associés.
- ❌ Donner un conseil fiscal détaillé au lieu de renvoyer à l'expert-comptable.
- ❌ Citer un article en `[a compléter]` ou absent de l'index (L.223-1, L.225-1, L.227-1, L.225-96, R.xxx) sans le tag `[a verifier]`.
- ❌ Arbre de décision à un nombre d'options différent de 5, ou option 4 ≠ « Surveiller et attendre ».
- ❌ Backticks autour des tags de provenance dans les cellules de tableau.
