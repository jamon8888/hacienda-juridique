# Dataset de test V1.1 — Gouvernance d'assemblée (2 scénarios)

> **Entry point attendu :** `/hacienda-droit-affaires:gouvernance-ag`
> **Objet :** deux scénarios de gouvernance d'assemblée synthétiques. Le premier
> teste le mode `--convocation` et le **calcul du délai** (détection d'un délai
> légal intenable). Le second teste le mode `--pv` et les **règles de quorum et
> de majorité** par forme sociale. Aucune donnée réelle. Les personnes, sociétés,
> dates et montants sont fictifs.

---

## Scénario 1 — Convocation d'une AGE de SA avec un délai intenable

> **Mode visé :** `--convocation`
> **Commande type :** `/hacienda-droit-affaires:gouvernance-ag --convocation --forme=SA`

### Faits fictifs

```
La société ALPHA SA souhaite tenir une assemblée générale extraordinaire pour
modifier son objet social. Éléments du dossier :

- Forme : SA.
- Type d'assemblée : AGE (modification statutaire — objet social).
- Date d'assemblée souhaitée : fixée dans 10 jours à compter d'aujourd'hui.
- La convocation n'a pas encore été envoyée.
- Ordre du jour : modification de l'article « objet social » des statuts ;
  pouvoirs pour les formalités.
```

### Vérité terrain — résultat attendu

**Calcul du délai — détection attendue : 🔴 délai intenable.**

Le skill doit, à l'Étape 1 (`--convocation`) :
- Identifier le **délai applicable** : pour une SA, **15 jours** sur première
  convocation. Les délais précis de la SA sont **réglementaires** (art. R.225-67
  / R.225-69 C.com.) et doivent être tagués `[a verifier]` — hors index.
- Calculer la **date limite d'envoi** : date d'assemblée − 15 jours. Avec une
  assemblée fixée dans **10 jours**, la date limite d'envoi est **déjà dépassée**
  (il faudrait avoir convoqué il y a 5 jours).
- Signaler **🔴 délai intenable** : convoquer l'assemblée à la date souhaitée
  emporterait un risque de **nullité des délibérations** (le délai de convocation
  est d'ordre public).
- Proposer des suites réalistes : **reporter** la date de l'assemblée pour
  respecter le délai de 15 jours, ou, le cas échéant, anticiper le mécanisme de
  **seconde convocation** (délai réduit `[a verifier]`).

**Comportement attendu — il ne faut PAS** :
- présenter la convocation comme expédiable en l'état ;
- minimiser le dépassement de délai ;
- énoncer un délai réglementaire de SA comme un fait sans `[a verifier]`.

### Critères de succès — Scénario 1

- [ ] Délai applicable identifié : 15 jours pour la SA sur première convocation.
- [ ] Date limite d'envoi calculée (date d'assemblée − 15 jours).
- [ ] **🔴 délai intenable** signalé : 10 jours < 15 jours requis.
- [ ] Le caractère d'**ordre public** du délai et le risque de **nullité des délibérations** sont explicités.
- [ ] Les délais réglementaires de la SA (R.225-67 / R.225-69 C.com.) sont tagués `[a verifier]`.
- [ ] Une suite réaliste est proposée (report de l'assemblée, ou seconde convocation).
- [ ] La convocation n'est PAS présentée comme prête à expédier en l'état.

---

## Scénario 2 — Procès-verbal d'une AGE de SARL (modification statutaire)

> **Mode visé :** `--pv`
> **Commande type :** `/hacienda-droit-affaires:gouvernance-ag --pv --forme=SARL`

### Faits fictifs

```
La société BÊTA SARL a tenu une assemblée générale extraordinaire pour
augmenter son capital social. Éléments du dossier :

- Forme : SARL.
- Type d'assemblée : AGE (modification statutaire — augmentation de capital).
- Date de constitution de la société : la SARL a été constituée en 2019,
  soit APRÈS le 4 août 2005.
- L'assemblée s'est tenue ; l'utilisateur fournit le texte des résolutions et
  les résultats de vote pour rédaction du PV.
- Résolution unique : augmentation de capital par apports nouveaux.
```

### Vérité terrain — résultat attendu

**Quorum et majorité — rappel attendu.**

Le skill doit, à l'Étape 1 (`--pv`) :
- Identifier qu'il s'agit d'une **AGE de SARL** (modification statutaire :
  augmentation de capital).
- Rappeler que la **date de constitution** commande la majorité : la SARL ayant
  été constituée **en 2019, soit après le 4 août 2005**, la majorité applicable
  est de **2/3 des parts** détenues par les associés présents ou représentés,
  sous condition de **quorum** — art. L.223-30 C.com. (présent dans l'index avec
  LEGIARTI réel, citer `[Légifrance]`).
- Ne **pas** appliquer la majorité de 3/4 des parts (régime des SARL constituées
  **avant** le 4 août 2005) : ce serait l'erreur à éviter ici.
- Distinguer correctement **quorum** (proportion des parts présentes ou
  représentées — condition pour délibérer) et **majorité** (2/3 des parts —
  condition pour adopter la résolution). Ne pas confondre les deux.
- Confronter les chiffres saisis par l'utilisateur à cette règle ; tag `[review]`
  si une incohérence apparaît (résolution annoncée adoptée sans atteindre les
  2/3 des parts, quorum exprimé en voix au lieu du capital, etc.).

**Comportement attendu — il ne faut PAS** :
- appliquer la règle de la SA (voix exprimées) à une SARL ;
- retenir 3/4 des parts pour une SARL constituée après le 4 août 2005 ;
- confondre quorum (capital présent/représenté) et majorité (parts).

**Procès-verbal — rédaction attendue.**

Le skill produit un projet de PV avec : identité et qualité des participants,
quorum constaté (parts présentes ou représentées rapportées au capital), texte
de la résolution d'augmentation de capital et résultat du vote (pour / contre /
abstentions, adoptée ou rejetée), signatures.

### Critères de succès — Scénario 2

- [ ] L'assemblée est qualifiée **AGE de SARL** (modification statutaire).
- [ ] La **date de constitution** (2019, après le 4 août 2005) est relevée comme la donnée qui commande la majorité.
- [ ] La majorité retenue est **2/3 des parts** des associés présents ou représentés — art. L.223-30 C.com. cité `[Légifrance]`.
- [ ] La règle des **3/4 des parts** (SARL antérieures au 4 août 2005) n'est PAS appliquée à ce scénario.
- [ ] **Quorum** (parts présentes/représentées) et **majorité** (2/3 des parts) sont distingués, non confondus.
- [ ] Le skill rappelle qu'un **quorum** est requis pour l'AGE d'une SARL constituée après le 4 août 2005 (distinct de la majorité des 2/3) et le signale correctement — art. L.223-30 C.com.
- [ ] La règle de la SA (majorité des voix exprimées) n'est PAS transposée à la SARL.
- [ ] Le PV comprend participants, quorum constaté, texte de la résolution + résultat du vote, signatures.
- [ ] Une incohérence éventuelle entre les chiffres saisis et la règle est taguée `[review]`.

---

## Vérification de structure de la sortie (commune aux 2 scénarios)

- [ ] Note du relecteur : 5 champs, libellés EN GRAS (**Sources** / **Lecture** / **Signalé pour ton jugement** / **Fraîcheur** / **Avant de t'appuyer dessus**).
- [ ] Arbre de décision : exactement 5 options, l'option 4 = « Surveiller et attendre ».
- [ ] Footer A (rappel PII) présent sous forme de lien Markdown si check-pii passe en mode passif sous le seuil B.
- [ ] Tags de provenance sans backticks dans les cellules de tableau, placés après la citation.
- [ ] En-tête de confidentialité adapté au rôle de l'utilisateur (CLAUDE.md §2).

## Couches de mitigation du risque à vérifier

- [ ] **Mode `--convocation` — calcul du délai** : la détection du délai intenable est une étape active du skill (Étape 1 `--convocation`), pas une simple mention — elle est exécutée sur le scénario 1 et conclut à 🔴.
- [ ] **Mode `--pv` — vérification quorum/majorité** : le rappel des règles selon forme et type d'assemblée est une étape active (Étape 1 `--pv`) ; quorum et majorité ne sont jamais confondus.
- [ ] **`verifier-citations` post-flight** : appel automatique sur la sortie complète (Étape 3) ; articles hors index / en `[a compléter]` (L.225-96) / `R.xxx` tagués `[a verifier]`.

## Faux comportements à NE PAS observer

- ❌ Présenter une convocation comme expédiable alors que le délai légal est intenable (scénario 1).
- ❌ Minimiser le dépassement du délai de convocation ou en faire un simple point de style.
- ❌ Énoncer un délai réglementaire de SA (R.225-67, R.225-69 C.com.) comme un fait, sans `[a verifier]`.
- ❌ Confondre **quorum** (proportion du capital présent ou représenté) et **majorité** (proportion des voix / parts requise pour adopter).
- ❌ Appliquer la règle de la SA (majorité des voix exprimées) à une SARL, ou inversement.
- ❌ Retenir 3/4 des parts pour une SARL constituée après le 4 août 2005 (le bon seuil est 2/3 des parts).
- ❌ Imposer une règle légale de quorum/majorité à une SAS au lieu de renvoyer aux statuts.
- ❌ Citer un article en `[a compléter]` ou absent de l'index (L.225-96, R.xxx) sans le tag `[a verifier]`.
- ❌ Arbre de décision à un nombre d'options différent de 5, ou option 4 ≠ « Surveiller et attendre ».
- ❌ Backticks autour des tags de provenance dans les cellules de tableau.
