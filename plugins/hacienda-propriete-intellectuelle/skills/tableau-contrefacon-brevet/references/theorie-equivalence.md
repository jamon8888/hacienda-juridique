# Référence — Théorie de la contrefaçon par équivalence en droit français

*Référence consultée par `tableau-contrefacon-brevet` à l'étape 4. Pour
chaque équivalence proposée, flagger `[review]` systématiquement —
l'analyse fine appartient au mandataire en brevets EQE ou à l'avocat
spécialisé PI.*

---

## 1. Historique

La théorie de l'équivalence en droit français des brevets a une histoire
longue. Initialement développée par la doctrine et la jurisprudence du
XIXe siècle pour éviter qu'une simple variante évidente d'une invention
brevetée échappe à la sanction, elle a été progressivement codifiée et
encadrée. Aujourd'hui elle repose sur le fondement texte CPI L.613-3 et
sur une jurisprudence constante de la chambre commerciale de la Cour de
cassation, dont l'**arrêt pivot du 5 mai 2009 (n°08-13.586)** énonce le
test des trois critères cumulatifs encore appliqué.

La théorie protège l'effet utile du brevet : sans elle, un contrefacteur
contournerait facilement la revendication en substituant un élément
techniquement équivalent (un solvant pour un autre, un polymère pour un
autre, un algorithme pour un autre de même fonction). Sans la théorie,
le brevet serait un titre formaliste sans portée réelle.

À l'inverse, la théorie a des limites strictes — sinon elle étendrait
indéfiniment la portée du brevet, au mépris de la sécurité juridique des
tiers (qui doivent pouvoir lire la revendication et savoir ce qu'ils
peuvent ou ne peuvent pas faire).

---

## 2. CPI L.613-3 — fondement texte

L'article L.613-3 du Code de la propriété intellectuelle définit les
droits conférés par le brevet. Sont interdits, sans le consentement du
propriétaire du brevet :

- a) La fabrication, l'offre, la mise dans le commerce, l'utilisation,
  l'importation, l'exportation, le transbordement, ou la détention aux
  fins précitées du produit objet du brevet ;
- b) L'utilisation d'un procédé objet du brevet ou, lorsque le tiers
  sait, ou lorsque les circonstances rendent évident que l'utilisation
  du procédé est interdite sans le consentement du propriétaire du
  brevet, l'offre de son utilisation sur le territoire français ;
- c) L'offre, la mise dans le commerce, l'utilisation, l'importation,
  l'exportation, le transbordement, ou la détention aux fins précitées
  du produit obtenu directement par le procédé objet du brevet.

Le texte ne mentionne pas explicitement la "contrefaçon par
équivalents" — mais la doctrine constante et la jurisprudence
interprètent l'article comme couvrant à la fois la contrefaçon littérale
(reproduction de tous les éléments) ET la contrefaçon par équivalents
(reproduction d'éléments substantiellement équivalents).

---

## 3. Cour de cassation, chambre commerciale, 5 mai 2009 n°08-13.586

Décision pivot qui formule le test moderne de l'équivalence en droit
français. Citation intégrale du principe énoncé :

> "Constitue une contrefaçon par équivalents le fait pour un tiers
> d'utiliser un moyen qui, sous une forme différente, exerce la même
> fonction en vue d'obtenir un résultat de même nature."

**Analyse du test :**

- "Moyen qui, sous une forme différente" — l'équivalence n'est ouverte
  que si l'élément du produit incriminé est **différent** de l'élément
  revendiqué (sinon on est en contrefaçon littérale, pas en
  équivalence). C'est une voie complémentaire et subsidiaire à la
  littéralité.
- "Exerce la même fonction" — premier critère : identité de fonction
  technique. Pas identité de structure, pas identité de matériau —
  identité de **fonction** au sens technique.
- "En vue d'obtenir un résultat de même nature" — deuxième critère :
  identité de résultat technique. "De même nature" n'exige pas une
  identité absolue de performance, mais une identité du **type** de
  résultat recherché.

Le **troisième critère**, formulé par la doctrine et confirmé par les
décisions ultérieures, est l'identité substantielle des **voies**
employées : les moyens techniques mis en œuvre par l'élément incriminé
doivent être substantiellement identiques (pas nécessairement
identiques) à ceux de l'élément revendiqué, du point de vue de l'homme
du métier.

Les trois critères sont **cumulatifs** — un seul critère manquant suffit
à écarter l'équivalence.

---

## 4. Trois critères cumulatifs — exemples par domaine technique

### Mécanique

**Élément revendiqué :** "ressort hélicoïdal de compression de raideur
50 N/mm".
**Élément produit :** "lame de ressort en flexion de raideur 50 N/mm".

- Même fonction : oui (force de rappel élastique).
- Même résultat : oui (déplacement-force proportionnel sur la même
  plage).
- Voies substantiellement identiques : **discuté** — le ressort
  hélicoïdal stocke l'énergie en torsion du fil, la lame en flexion.
  Si la revendication précise "hélicoïdal", la voie est différente. Si
  elle revendique génériquement "moyen élastique de raideur 50 N/mm",
  l'équivalence passe.

### Chimie

**Élément revendiqué :** "solvant éthanol".
**Élément produit :** "solvant méthanol".

- Même fonction : oui (dissolution du soluté visé).
- Même résultat : **discuté** — solubilités voisines mais pas
  identiques ; toxicité différente (notamment en application pharma /
  alimentaire) ; le résultat peut ne pas être "de même nature" si la
  revendication est dans un contexte d'application sanitaire.
- Voies substantiellement identiques : oui (alcools primaires courts,
  même famille chimique).

### Logiciel

**Élément revendiqué :** "tri par algorithme quicksort avec pivot
médian".
**Élément produit :** "tri par algorithme mergesort".

- Même fonction : oui (trier une séquence).
- Même résultat : oui (séquence ordonnée selon le même critère).
- Voies : **discuté** — algorithmes différents (quicksort
  partitionnement-récursion vs mergesort fusion-récursion), complexité
  différente (O(n²) pire cas quicksort, O(n log n) garanti mergesort),
  comportement mémoire différent (in-place vs out-of-place). Si la
  revendication revendique la propriété "in-place avec pivot", la voie
  est différente. Si elle revendique génériquement "tri en O(n log n)
  moyen", l'équivalence passe plus aisément.

### Biotech

**Élément revendiqué :** "anticorps monoclonal anti-CD20 isotype IgG1".
**Élément produit :** "anticorps monoclonal anti-CD20 isotype IgG4".

- Même fonction : oui (liaison sélective à l'antigène CD20).
- Même résultat : **discuté** — IgG1 active fortement le complément et
  l'ADCC (cytotoxicité cellulaire dépendante des anticorps), IgG4
  beaucoup moins. Si l'effet thérapeutique recherché (déplétion des
  cellules B) repose sur ADCC, le résultat de l'IgG4 n'est pas "de
  même nature".
- Voies : oui (même famille IgG, même cible CD20).

---

## 5. Limites de la théorie de l'équivalence

Trois limites majeures encadrent la théorie. Toujours les vérifier avant
de conclure à une équivalence.

### 5.1 File wrapper estoppel (renonciation pendant la poursuite)

**Doctrine du dossier de poursuite, importée en droit français** depuis
la pratique américaine et largement appliquée en jurisprudence française
moderne.

Si, pendant l'examen du brevet (INPI ou OEB), le déposant a **réduit
volontairement** la portée d'une revendication pour répondre à une
objection examinateur (antériorité destructive de nouveauté, défaut
d'activité inventive, extension indue), il ne peut pas récupérer par la
voie de l'équivalence la portée à laquelle il a renoncé.

**Vérification pratique** : consulter le dossier de poursuite via
- INPI : registre national des brevets (consultable en ligne)
- OEB : European Patent Register (Espacenet → onglet "Légal")

Si l'élément en équivalence proposée a été ajouté ou restreint en
réponse à une objection, l'équivalence est exclue sur cet élément.

### 5.2 Borne par l'art antérieur

L'équivalence ne peut pas étendre la protection du brevet à des moyens
qui étaient **déjà connus de l'art antérieur** à la date de priorité du
brevet — sinon le brevet serait nul pour défaut de nouveauté sur la
partie équivalente.

Concrètement : si l'élément équivalent proposé (par exemple "polyimine"
en remplacement de "polyamine" dans une membrane de filtration) était
déjà divulgué dans une antériorité du brevet (par exemple un article
scientifique de 2005 décrivant des membranes de filtration en
polyimine), alors l'équivalence est exclue — l'étendre serait
revendiquer indirectement l'art antérieur.

**Vérification pratique** : interroger ou ré-interroger
`recherche-anteriorite-brevet` sur l'élément équivalent envisagé, à la
date de priorité du brevet attaqué.

### 5.3 Suffisance et prévisibilité pour l'homme du métier

L'élément équivalent doit être une **variante prévisible pour l'homme
du métier à la date du dépôt**, pas une rupture technologique apparue
après. Si l'équivalent proposé repose sur une technologie postérieure
non prévisible (par exemple, équivaloir un algorithme classique
revendiqué en 2005 à un réseau de neurones profond opérationnel en
2018), l'équivalence devient discutable et appelle un avis expert
technique daté sur la date de priorité.

Le test : "Un homme du métier raisonnablement compétent dans le domaine
du brevet, à la date de priorité, considérait-il l'élément équivalent
proposé comme une variante évidente ou prévisible de l'élément
revendiqué ?" Si non, pas d'équivalence.

---

## 6. Différences FR / EU / US

### France et Europe (OEB)

Théorie de l'équivalence reconnue, formulée par le test des trois
critères cumulatifs (fonction / résultat / voies). La CJUE n'a pas de
compétence directe sur la contrefaçon de brevets nationaux (la
contrefaçon est régie par les droits nationaux malgré le brevet
européen unitaire de l'OEB), mais la Cour de cassation française reste
attentive à la jurisprudence des juridictions européennes voisines.
L'arrêt **Improver Corp. v. Remington (Epilady)** de la Court of
Appeal britannique (1990) — premier test moderne de l'équivalence sur
le rasoir Epilady — a influencé la formulation française et reste cité
en doctrine comparée.

### États-Unis

**Doctrine of Equivalents** (jurisprudence Graver Tank 1950, puis
**Festo Corp. v. Shoketsu Kinzoku Kogyo** 535 U.S. 722 (2002)). Le test
américain est proche du français (function / way / result — "triple
identity test") mais le **file wrapper estoppel y est plus rigoureux**
(presumed surrender — toute modification de revendication pendant
l'examen crée une présomption forte de renonciation à l'équivalence sur
l'élément modifié, charge au breveté de la renverser par preuve
spécifique). En droit français, l'estoppel est appliqué mais
l'appréciation reste plus souple — le titulaire peut souvent expliquer
pourquoi la modification ne visait pas l'élément équivalent en cause.

---

## 7. Lien avec `tableau-contrefacon-brevet`

La théorie de l'équivalence intervient à **l'étape 4** du skill, après
l'analyse littérale (étape 3). Pour chaque élément ❌ absent en
littéralité, le skill mène une analyse en 3 critères cumulatifs et
produit un sous-tableau de conclusion. **Chaque conclusion d'équivalence
est flaggée `[review]` systématiquement** — le mandataire en brevets ou
l'avocat valide ; le skill ne tranche jamais une équivalence.

Les limites de la théorie (estoppel, art antérieur, prévisibilité) sont
mentionnées dans la sortie quand elles s'appliquent et toujours portées
en `[review]` pour validation.

---

## 8. Articles CPI complémentaires utiles à la contrefaçon brevet

- **CPI L.613-3** : droits conférés par le brevet (fondement de la
  contrefaçon directe et par équivalence).
- **CPI L.613-5** : exceptions aux droits du breveté (usage privé,
  expérimentation, préparation magistrale, exception pharmaceutique
  Bolar).
- **CPI L.613-6** : épuisement du droit après première mise dans le
  commerce dans l'EEE par le titulaire ou avec son consentement.
- **CPI L.615-1** : compétence exclusive du **Tribunal judiciaire de
  Paris** pour les actions civiles en contrefaçon de brevet (décret
  n°2009-1205 du 9 octobre 2009).
- **CPI L.615-2** : qualité pour agir (titulaire + licencié exclusif
  sous conditions).
- **CPI L.615-3** : mesures provisoires (interdiction provisoire,
  saisie conservatoire des produits contrefaisants).
- **CPI L.615-5** : saisie-contrefaçon (autorisation sur requête du
  président TJ Paris, exécution par huissier accompagné d'un expert
  technique).
- **CPI L.615-7** : calcul des dommages-intérêts (conséquences
  négatives subies, manque à gagner, bénéfices contrefacteur, préjudice
  moral, redevance indemnitaire alternative).
- **CPI L.615-8** : prescription de l'action en contrefaçon **5 ans**
  à compter du jour où le titulaire a connu ou aurait dû connaître les
  faits.

---

## 9. Jurisprudence complémentaire (illustrations)

- **Cour de cassation, chambre commerciale, 23 janvier 2007
  n°05-17.946** : confirmation des critères cumulatifs ; "moyens
  remplissant les mêmes fonctions en vue du même résultat".
- **Cour d'appel de Paris, pôle 5 chambre 2, arrêts en contrefaçon
  brevet** : application régulière du test des trois critères dans les
  domaines pharma, mécanique et électronique. Les décisions du pôle 5
  CA Paris sont la principale source jurisprudentielle d'appel en
  matière de brevets (le TJ Paris étant la juridiction de premier
  degré exclusive).
- **TJ Paris, jurisprudence constante** : la qualification de
  l'équivalence repose lourdement sur les rapports d'experts techniques
  désignés par le tribunal. La préparation d'un dossier d'équivalence
  exige systématiquement avis d'expert préalable.

*Les références citées ici sont indicatives — vérifier sur Cour de
cassation Open Data, Légifrance et bases CA Paris avant tout usage en
écriture déposée.*
