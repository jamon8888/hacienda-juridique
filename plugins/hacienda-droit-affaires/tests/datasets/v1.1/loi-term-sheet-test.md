# Dataset de test V1.1 — LOI / Term sheet (2 pièges binding cachés)

> **Entry point attendu :** `/hacienda-droit-affaires:loi-term-sheet`
> **Objet :** lettre d'intention (LOI) synthétique anonymisée présentée comme
> « non engageante », contenant en réalité 2 pièges binding cachés. Aucune
> donnée réelle. Les sociétés, personnes, montants et dates sont fictifs.

---

## Document fictif

```
LETTRE D'INTENTION
— SANS ENGAGEMENT / NON CONTRAIGNANTE —

De :   SOCIÉTÉ OMÉGA, l'« Acquéreur »
À :    M. SIGMA et Mme THÊTA, les « Cédants »,
       associés de la société KAPPA INDUSTRIE (la « Cible »)

Objet : projet d'acquisition de 100 % des titres de la Cible

Préambule
La présente lettre d'intention (la « LOI ») a pour objet de formaliser les
termes indicatifs auxquels l'Acquéreur envisage d'acquérir l'intégralité des
titres de la Cible. La présente LOI est conclue SANS AUCUN ENGAGEMENT des
parties : elle ne constitue pas une promesse d'achat ni de vente et n'engage
en rien ses signataires, qui resteront libres jusqu'à la signature d'un
contrat de cession définitif.

Article 1 — Prix indicatif
L'Acquéreur envisage un prix de l'ordre de 4 000 000 euros pour 100 % des
titres, sur la base d'une valeur d'entreprise indicative comprise entre
3 500 000 et 4 500 000 euros, à affiner après due diligence.

Article 2 — Structure de l'opération
L'opération prendrait la forme d'une cession de la totalité des titres de la
Cible, payable à 80 % au closing et à 20 % en complément de prix indexé sur
les résultats. Cette structure est indicative et sera arrêtée dans le contrat
définitif.

Article 3 — Exclusivité
Les Cédants s'interdisent, pendant une durée de DOUZE (12) MOIS à compter de
la signature de la présente LOI, d'entrer en contact, de solliciter, de
poursuivre ou d'engager avec tout tiers la moindre discussion ou négociation
en vue de la cession de tout ou partie des titres ou des actifs de la Cible.
Les Cédants s'engagent à informer sans délai l'Acquéreur de toute approche
émanant d'un tiers.

Article 4 — Frais
L'ensemble des frais de conseils, d'audit et de due diligence engagés par
l'Acquéreur comme par les Cédants au titre du projet sera intégralement pris
en charge et réglé par les Cédants, que l'opération se réalise ou non.

Article 5 — Confidentialité
Les parties s'engagent à tenir strictement confidentiels l'existence et le
contenu des discussions, ainsi que toute information échangée à l'occasion du
projet, pendant une durée de trois ans à compter de la signature de la
présente LOI.

Article 6 — Conditions suspensives envisagées
La réalisation de l'opération supposerait notamment l'obtention par
l'Acquéreur de son financement, le résultat satisfaisant d'une due diligence
juridique, comptable et fiscale, et l'accord des organes sociaux compétents.
Ces conditions seront définies dans le contrat de cession définitif.

Article 7 — Calendrier prévisionnel
Les parties envisagent une signature du contrat de cession définitif dans un
délai prévisionnel de trois mois, suivie d'un closing sous un mois. Ce
calendrier est purement indicatif.

Article 8 — Droit applicable
La présente LOI est régie par le droit français.
```

---

## Vérité terrain — findings attendus

### Pièges principaux (les 2 pièges binding cachés intentionnels)

**Piège 1 — Article 3, clause d'exclusivité de 12 mois → clause BINDING cachée + durée excessive → criticité 🔴**
- Double détente.
- **Détente 1 — qualification binding cachée.** Le préambule annonce une LOI « SANS AUCUN ENGAGEMENT » et affirme que les signataires « restent libres ». Pourtant, l'article 3 est rédigé en termes impératifs (« les Cédants s'interdisent… ») : c'est une obligation de ne pas faire qui **engage juridiquement les Cédants** dès la signature de la LOI. La clause d'exclusivité (no-shop) est **typiquement binding**, et la mention générale « sans engagement » du préambule **ne neutralise pas** cette obligation précise. Un skill correct doit qualifier l'article 3 de **binding**, signaler la **contradiction** avec le chapeau du préambule, et marquer la qualification comme **non intentionnelle / à clarifier** → 🔴. Le remède : une clause de qualification (binding / non-binding) explicite.
- **Détente 2 — durée excessive.** Une exclusivité doit couvrir le temps raisonnablement nécessaire à la due diligence et à la négociation du SPA — quelques semaines à quelques mois. 12 mois est manifestement excessif, d'autant que le calendrier de l'article 7 prévoit une signature sous 3 mois : l'exclusivité immobilise les Cédants 4 fois plus longtemps que le besoin annoncé. Tag `[review]` sur la proportionnalité.
- Statut attendu : **🔴** dans le tableau binding / non-binding (clause binding non intentionnelle) ; **🔴 Bloquant** (ou **🟠** minimum) dans la liste de points sur la durée. Une dégradation en simple 🟡 serait une erreur.

**Piège 2 — Article 4, prise en charge des frais par les Cédants → clause BINDING cachée → criticité 🟠 (🔴 selon side)**
- Le préambule promet l'absence d'engagement. Pourtant l'article 4 met « intégralement » à la charge des Cédants l'ensemble des frais des deux parties, « que l'opération se réalise ou non ». C'est une **obligation de paiement ferme** qui **engage les Cédants** dès la signature de la LOI, indépendamment de toute cession. Le sort des frais est une clause **typiquement binding**. Un skill correct doit qualifier l'article 4 de **binding**, signaler la contradiction avec le chapeau « sans engagement », et marquer la qualification comme **non intentionnelle / à clarifier**.
- Sur le fond : faire supporter aux seuls Cédants les frais de l'Acquéreur, y compris en cas d'échec, est fortement déséquilibré. La pratique courante veut que chaque partie supporte ses propres frais, sauf break-up fee négociée et réciproque.
- Statut attendu : **🔴** dans le tableau binding / non-binding (clause binding non intentionnelle) ; **🟠 À négocier** dans la liste de points sur le déséquilibre (remontable à 🔴 si le side de l'utilisateur est Cédant et que la posture est protectrice).

### Findings secondaires attendus (clauses conformes ou points mineurs)

- **Article 1 — Prix indicatif :** clause **non-binding**. Fourchette de valorisation et prix « de l'ordre de », « à affiner après due diligence ». 🟢. Qualification non-binding intentionnelle et claire.
- **Article 2 — Structure de l'opération :** clause **non-binding**. Mention explicite « cette structure est indicative et sera arrêtée dans le contrat définitif ». 🟢. Point mineur possible : le complément de prix indexé (earn-out) mériterait d'être borné dès la LOI 🟡.
- **Article 5 — Confidentialité :** clause **binding** — mais **intentionnellement** binding et attendue : la confidentialité engage normalement les parties dès la LOI et survit à l'échec des pourparlers. Durée de 3 ans proportionnée. 🟢 / 🟡. Renvoi `references/clauses-sensibles-fr.md` bloc 11. Ce n'est PAS un piège : une clause binding **attendue** dans ce type de document.
- **Article 6 — Conditions suspensives envisagées :** clause **non-binding**. Conditions seulement esquissées, rédigées au conditionnel, renvoyées au contrat définitif. 🟢. Point d'attention : vérifier qu'aucune n'est potestative `[review]`.
- **Article 7 — Calendrier prévisionnel :** clause **non-binding**. Explicitement « purement indicatif ». 🟢. À rapprocher de l'article 3 : le calendrier de 3 mois souligne le caractère excessif de l'exclusivité de 12 mois.
- **Article 8 — Droit applicable :** clause **binding** et intentionnelle — le choix de loi engage normalement les parties dès la LOI. Droit français, cohérent avec une cible française. 🟢. Renvoi `references/clauses-sensibles-fr.md` bloc 10. Point mineur : absence de clause attributive de juridiction ou d'arbitrage 🟡.

### Point de fond à ne pas manquer — bonne foi des pourparlers

- Le skill doit, dans l'analyse, distinguer correctement :
  - la **liberté de rompre les pourparlers** (principe — art. 1112 C.civ, absent de l'index avec LEGIARTI → `[a verifier]`) ;
  - et la **bonne foi** qui doit présider à l'initiative, au déroulement et à la rupture des négociations (art. 1104 C.civ — présent dans l'index avec LEGIARTI → `[Légifrance]`), dont la méconnaissance rend la rupture **fautive**.
- Ne PAS écrire que rompre les pourparlers est en soi fautif. La faute tient aux **circonstances** de la rupture.
- Mentionner le devoir précontractuel d'information (art. 1112-1 C.civ — présent dans l'index avec LEGIARTI → `[Légifrance]`), pertinent côté Cédants sur la Cible.

### Critères de succès

- [ ] Un **tableau binding / non-binding** est produit, une ligne par article (1 à 8).
- [ ] Les 2 pièges sont détectés : article 3 (exclusivité) et article 4 (frais) qualifiés **binding** et signalés comme **binding non intentionnel** → 🔴 dans le tableau.
- [ ] La **contradiction** entre le chapeau « sans engagement » du préambule et les articles 3 et 4 est explicitement signalée.
- [ ] Le skill explique que la qualification dépend du **contenu** des clauses, pas du titre du document ni du chapeau « non contraignante ».
- [ ] La durée d'exclusivité de 12 mois (article 3) est jugée **excessive**, avec `[review]` sur la proportionnalité, et mise en regard du calendrier de 3 mois de l'article 7.
- [ ] La prise en charge des frais par les seuls Cédants (article 4) est signalée comme **déséquilibrée** sur le fond, en plus d'être binding.
- [ ] La confidentialité (article 5) et le droit applicable (article 8) sont qualifiés **binding** mais **intentionnels** — pas traités comme des pièges.
- [ ] Distinction correcte liberté de rompre / faute dans la rupture (1112 vs 1104 C.civ).
- [ ] Articles hors index ou en `[a compléter]` (1112 C.civ) tagués `[a verifier]` ; 1104 et 1112-1 C.civ citables `[Légifrance]`.
- [ ] Le skill recommande l'ajout d'une **clause de qualification (binding / non-binding) explicite**.

### Vérification de structure de la sortie

- [ ] Note du relecteur : 5 champs, libellés EN GRAS (**Sources** / **Lecture** / **Signalé pour ton jugement** / **Fraîcheur** / **Avant de t'appuyer dessus**).
- [ ] Tableau binding / non-binding présent, une ligne par clause, colonnes Qualification + Intentionnel ? + Sévérité.
- [ ] Arbre de décision : exactement 5 options, l'option 4 = « Surveiller et attendre ».
- [ ] Footer A (rappel PII) présent sous forme de lien Markdown si check-pii passe en mode passif sous le seuil B.
- [ ] Tags de provenance sans backticks dans les cellules de tableau, placés après la citation.
- [ ] En-tête de confidentialité adapté au rôle de l'utilisateur (CLAUDE.md §2).
- [ ] Liste de points triée par criticité décroissante (🔴 → 🟠 → 🟡 → 🟢).

### Faux comportements à NE PAS observer

- ❌ Conclure que la LOI « n'engage à rien » parce que le préambule le dit, sans cartographier les clauses binding cachées.
- ❌ Qualifier l'article 3 (exclusivité) ou l'article 4 (frais) de non-binding.
- ❌ Manquer la contradiction entre le chapeau « sans engagement » et les articles 3 et 4.
- ❌ Traiter l'exclusivité de 12 mois comme un simple point de négociation 🟡 sans signaler le caractère excessif.
- ❌ Traiter la confidentialité (article 5) comme un piège : c'est une clause binding attendue et intentionnelle.
- ❌ Écrire que rompre les pourparlers est en soi une faute (confusion liberté de rupture / faute dans la rupture).
- ❌ Citer 1112 C.civ sans le tag `[a verifier]`.
- ❌ Arbre de décision à un nombre d'options différent de 5, ou option 4 ≠ « Surveiller et attendre ».
- ❌ Backticks autour des tags de provenance dans les cellules du tableau.
```
