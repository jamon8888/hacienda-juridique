# Dataset de test V1.1 — Pacte d'associés (3 pièges)

> **Entry point attendu :** `/h-droit-affaires:pacte-associes-review`
> **Objet :** pacte d'associés synthétique anonymisé contenant 3 pièges connus.
> Aucune donnée réelle. Les sociétés, personnes, montants et dates sont fictifs.

---

## Document fictif

```
PACTE D'ASSOCIÉS

Entre les soussignés :

- M. ALPHA, M. BÊTA et Mme GAMMA, ci-après les « Fondateurs »,
- FONDS DELTA, société de gestion de portefeuille, ci-après l'« Investisseur »,

associés de la société NÉOSTART, société par actions simplifiée (SAS) au
capital de 100 000 euros, immatriculée au RCS sous le numéro fictif
000 000 000, ci-après la « Société ».

Il a été convenu ce qui suit.

Article 1 — Objet
Le présent pacte organise les rapports entre associés de la Société et le
régime de leurs titres. Il complète les statuts ; en cas de contradiction,
les statuts prévalent.

Article 2 — Droit de préemption
Tout projet de cession de titres à un tiers non associé est soumis au droit
de préemption des autres associés, exerçable au prorata de leur participation
dans un délai de trente jours à compter de la notification du projet de
cession, au prix offert par le tiers de bonne foi.

Article 3 — Agrément
Toute cession de titres à un tiers non associé est soumise à l'agrément
préalable de la collectivité des associés statuant à la majorité des deux
tiers. La présente clause est reprise à l'identique dans les statuts de la
Société.

Article 4 — Inaliénabilité
Chaque associé s'engage à conserver l'intégralité de ses titres et s'interdit
toute cession, à quelque titre que ce soit, pendant une durée de QUINZE (15)
ANS à compter de la signature du présent pacte. Cette inaliénabilité est
également stipulée dans les statuts de la Société.

Article 5 — Obligation de cession conjointe (drag-along)
Dans l'hypothèse où un ou plusieurs associés recevraient d'un tiers une offre
d'acquisition de titres, lesdits associés pourront exiger de l'ensemble des
autres associés qu'ils cèdent leurs titres au même tiers, aux mêmes
conditions de prix. Les associés entraînés consentiront les déclarations et
garanties demandées par le cessionnaire.

Article 6 — Droit de cession conjointe (tag-along)
En cas de cession de titres par un Fondateur entraînant un changement de
contrôle de la Société, l'Investisseur pourra exiger que le cessionnaire
acquière l'intégralité de ses titres, aux mêmes prix et conditions.

Article 7 — Anti-dilution
En cas d'émission de titres nouveaux à un prix par titre inférieur à celui de
la dernière opération, la participation de l'Investisseur sera ajustée selon
la méthode de la moyenne pondérée broad-based. Les associés s'engagent à
voter les résolutions d'augmentation de capital nécessaires à cet ajustement.

Article 8 — Good leaver / bad leaver
En cas de cessation des fonctions d'un Fondateur exerçant un mandat social,
ce dernier sera tenu de céder ses titres. Le prix de cession sera égal à la
valeur de marché en cas de good leaver (décès, invalidité, révocation sans
faute grave) et à 80 % du prix de souscription en cas de bad leaver (faute
grave, démission avant le troisième anniversaire du pacte). À défaut d'accord
sur la valeur de marché, le prix est fixé à dire d'expert.

Article 9 — Non-concurrence des associés
Chaque associé s'interdit, pendant toute la durée de détention de ses titres
et pendant une durée de CINQ (5) ANS suivant la cession de ses titres,
d'exercer, directement ou indirectement, sur l'ensemble du territoire
mondial, toute activité économique, qu'elle soit ou non concurrente de celle
de la Société. Cet engagement n'est assorti d'aucune contrepartie financière.

Article 10 — Décisions réservées
Les décisions suivantes requièrent l'accord préalable de l'Investisseur :
modification des statuts, augmentation ou réduction de capital, distribution
de dividendes, endettement supérieur à 200 000 euros.

Article 11 — Information
L'Investisseur reçoit les comptes annuels et un reporting semestriel, sous
obligation de confidentialité.

Article 12 — Durée
Le présent pacte est conclu pour la durée de vie de la Société.

Article 13 — Droit applicable
Le présent pacte est régi par le droit français.
```

---

## Vérité terrain — findings attendus

### Pièges principaux (les 3 pièges intentionnels)

**Piège 1 — Article 4, Inaliénabilité de 15 ans → criticité 🔴**
- En SAS, l'inaliénabilité statutaire est plafonnée à 10 ans (art. L.227-13 C.com. — dans l'index avec LEGIARTI, citer `[Légifrance]`). La clause de l'article 4 stipule 15 ans ET est reprise dans les statuts → elle excède le plafond légal : nulle, à tout le moins réductible à 10 ans.
- Même en tant que clause de pacte, une inaliénabilité de 15 ans, sans intérêt sérieux et légitime documenté, est disproportionnée (transposition art. 900-1 C.civ — absent de l'index → `[à vérifier]`).
- Le caractère raisonnable de la durée est un jugement de fait → tag `[review]`.
- Statut attendu : **🔴 Bloquant**.

**Piège 2 — Article 9, Non-concurrence des associés disproportionnée → criticité 🔴 (ou 🟠 selon appréciation)**
- Piège à double détente. Le rédacteur naïf reprocherait « l'absence de contrepartie financière ». **C'est une erreur** : l'exigence de contrepartie de Cass. soc. 10 juil. 2002 (n° 00-45.135) ne s'applique pas à l'associé qui s'oblige en sa seule qualité d'associé. L'absence de contrepartie n'entraîne PAS la nullité. Un skill correct ne doit PAS faire ce reproche.
- Le vrai vice est la **disproportion** : durée post-cession de 5 ans + périmètre géographique mondial + interdiction de « toute activité économique, qu'elle soit ou non concurrente ». Une clause interdisant toute activité, même non concurrente, sur le monde entier et pendant 5 ans après la sortie porte une atteinte excessive à la liberté d'entreprendre. Contrôle de proportionnalité → clause excessive.
- Tag `[review]` attendu sur l'appréciation de proportionnalité.
- Statut attendu : **🔴 Bloquant** (interdiction de toute activité, même non concurrente, mondiale, 5 ans post-cession — cumul disqualifiant). Une dégradation en 🟡 serait une erreur.

**Piège 3 — Article 5, Drag-along sans seuil de déclenchement → criticité 🟠**
- La clause permet à « un ou plusieurs associés » recevant une offre d'exiger la cession de tous les autres, sans aucun seuil chiffré (pourcentage de titres déclenchant le drag, quorum de décision). Un seul associé minoritaire pourrait théoriquement enclencher le mécanisme.
- Défaut rédactionnel majeur : absence de seuil de déclenchement. À compléter par un seuil explicite (ex. ≥ 50 % ou 66 % du capital).
- Vice additionnel : les associés entraînés « consentiront les déclarations et garanties demandées par le cessionnaire » — sans limitation à la propriété de leurs titres ni plafond de responsabilité. Garanties imposées non bornées.
- Statut attendu : **🟠 À négocier** (peut être remonté à 🔴 si la posture est protecteur fondateurs et que le minoritaire est le client).

### Findings secondaires attendus (clauses conformes ou points mineurs)

- **Article 2 — Préemption :** globalement conforme (délai raisonnable, prix = offre du tiers). 🟢 ou 🟡 selon posture. Point mineur possible : périmètre limité aux cessions à des tiers, pas de mention des cessions indirectes / changement de contrôle d'un associé personne morale.
- **Article 3 — Agrément :** clause d'agrément en SAS, reprise dans les statuts (art. L.227-14 C.com. `[Légifrance]`) → opposable, violation sanctionnée par la nullité (art. L.227-15 C.com. `[Légifrance]`). 🟢. Bon point : la reprise statutaire renforce l'opposabilité.
- **Article 6 — Tag-along :** tag-along total au profit de l'Investisseur, conditions identiques. 🟢 / 🟡. Point d'attention : ne bénéficie qu'à l'Investisseur, pas aux Fondateurs minoritaires entre eux ; opposabilité (pacte vs statuts) à vérifier.
- **Article 7 — Anti-dilution :** weighted average broad-based, avec engagement de vote. 🟢 — standard de marché, posture équilibrée.
- **Article 8 — Good/bad leaver :** motifs définis ; bad leaver à 80 % du prix de souscription → décote mesurée, non confiscatoire, a priori hors clause léonine (art. 1844-1 C.civ `[à vérifier]`). 🟡 — vérifier que la décote n'opère pas comme une peine privée `[review]` ; renvoi expertise art. 1843-4 C.civ `[à vérifier]`.
- **Article 10 — Décisions réservées :** liste resserrée et raisonnable (capital, statuts, distribution, endettement majeur). 🟢 / 🟡. Pas de paralysie de la gestion courante.
- **Article 11 — Information :** reporting semestriel sous confidentialité. 🟢 — proportionné.
- **Article 12 — Durée « durée de vie de la Société » :** point de vigilance 🟡 — un pacte à durée indéterminée / alignée sur la société peut être dénoncé unilatéralement avec préavis (prohibition des engagements perpétuels). À signaler.

### Critères de succès

- [ ] Les 3 pièges sont détectés avec la bonne criticité : Art. 4 → 🔴, Art. 9 → 🔴 (ou 🟠 minimum), Art. 5 → 🟠.
- [ ] Sur l'article 9, le skill NE reproche PAS l'absence de contrepartie financière et explique correctement la distinction associé / salarié.
- [ ] Sur l'article 4, le skill cite le plafond de 10 ans de l'art. L.227-13 C.com. avec le tag `[Légifrance]` (article présent dans l'index avec LEGIARTI).
- [ ] Sur l'article 5, le skill identifie explicitement l'absence de seuil de déclenchement.
- [ ] Les articles hors index ou en `[a compléter]` (900-1 C.civ, 1843-4 C.civ, 1844-1 C.civ, L.228-23 C.com.) sont tagués `[à vérifier]`.
- [ ] Forme sociale identifiée : SAS → fondements L.227-13 / L.227-14 / L.227-15 / L.227-9 mobilisés.

### Vérification de structure de la sortie

- [ ] Note du relecteur : 5 champs, libellés EN GRAS (**Sources** / **Lecture** / **Signalé pour ton jugement** / **Fraîcheur** / **Avant de t'appuyer dessus**).
- [ ] Arbre de décision : exactement 5 options, l'option 4 = « Surveiller et attendre ».
- [ ] Footer A (rappel PII) présent sous forme de lien Markdown si check-pii passe en mode passif sous le seuil B.
- [ ] Tags de provenance sans backticks dans les cellules de tableau, placés après la citation.
- [ ] En-tête de confidentialité adapté au rôle de l'utilisateur (CLAUDE.md §2).
- [ ] Liste de points triée par criticité décroissante (🔴 → 🟠 → 🟡 → 🟢).

### Faux comportements à NE PAS observer

- ❌ Reprocher l'absence de contrepartie financière à la non-concurrence de l'article 9 (confusion associé / salarié).
- ❌ Traiter l'inaliénabilité de 15 ans (article 4) comme un simple point de négociation 🟡.
- ❌ Valider le drag-along de l'article 5 sans signaler l'absence de seuil de déclenchement.
- ❌ Citer 900-1 C.civ, 1843-4 C.civ, 1844-1 C.civ ou L.228-23 C.com. sans le tag `[à vérifier]`.
- ❌ Arbre de décision à un nombre d'options différent de 5, ou option 4 ≠ « Surveiller et attendre ».
- ❌ Backticks autour des tags de provenance dans les cellules du tableau de liste de points.
```
