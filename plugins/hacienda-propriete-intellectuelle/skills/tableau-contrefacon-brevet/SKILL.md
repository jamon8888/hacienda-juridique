---
name: tableau-contrefacon-brevet
description: >
  Claim chart — confrontation des revendications d'un brevet (FR / EP / PCT)
  contre la documentation technique d'un produit incriminé, élément par
  élément. Évalue contrefaçon littérale ET contrefaçon par équivalence
  (CPI L.613-3, Cour de cass. com. 5 mai 2009 n°08-13.586). Produit un
  tableau exploitable par mandataire en brevets ou avocat PI pour préparer
  mise en demeure, saisie-contrefaçon (CPC art. 59) ou action TJ Paris
  (compétence exclusive L.615-1). Ne conclut PAS à la contrefaçon —
  qualification juridique = mandataire/avocat.
argument-hint: "[num brevet | doc produit | théorie : littérale/équivalence/les deux]"
---

# /tableau-contrefacon-brevet

**Confrontation ≠ qualification de contrefaçon.** Ce skill produit un
**tableau d'analyse technique** pour aider le mandataire en brevets ou
l'avocat à préparer une stratégie d'enforcement. Il NE qualifie PAS la
contrefaçon (= rôle du juge ou du mandataire/avocat), NE rédige PAS de lettre
ou réponse précontentieuse structurée (= rôle `mise-en-demeure-pi`), NE prépare PAS la requête en
saisie-contrefaçon (= `saisie-contrefacon`). **La qualification
de contrefaçon est une décision juridique aux conséquences lourdes** :
risques d'action en concurrence déloyale en cas de mise en demeure abusive,
dommages-intérêts si saisie injustifiée (CPC art. 78). **Toujours valider
par mandataire/avocat avant toute action externe.**

## Examples

```
/hacienda-propriete-intellectuelle:tableau-contrefacon-brevet "Brevet FR2700123 (membrane graphène) | notice produit AquaPur X9 + fiche tech | les deux"
```

```
/hacienda-propriete-intellectuelle:tableau-contrefacon-brevet "EP3456789 (algorithme compression vidéo) | repository GitHub public + doc API | littérale"
```

```
/hacienda-propriete-intellectuelle:tableau-contrefacon-brevet
```

(Le skill demandera le brevet, la documentation produit, la théorie souhaitée
et le contexte business.)

---

## CONFRONTATION TECHNIQUE, PAS QUALIFICATION DE CONTREFAÇON

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Confrontation technique, pas qualification de contrefaçon.** Ce skill
> confronte élément par élément les revendications d'un brevet à la
> documentation d'un produit incriminé et produit un **claim chart** —
> tableau d'analyse technique destiné au mandataire en brevets ou à
> l'avocat PI. Il NE qualifie PAS la contrefaçon, NE rédige PAS la mise en
> demeure, NE prépare PAS la saisie-contrefaçon (CPC art. 59) ni
> l'assignation devant le TJ Paris (compétence exclusive CPI L.615-1).
> La qualification de contrefaçon est une **décision juridique** aux
> conséquences lourdes : une mise en demeure abusive expose à une action
> en concurrence déloyale ; une saisie-contrefaçon injustifiée expose à
> des dommages-intérêts (CPC art. 78) ; une action infondée expose à
> l'article 700 et à la réputation. **Toujours valider par mandataire en
> brevets ou avocat PI avant toute action externe.**

C'est le garde-fou le plus visible du skill. Le claim chart est un outil
puissant : mal lu, il peut décider à tort d'envoyer une mise en demeure ou
de saisir. Le tableau **trie et rend lisible** ; il ne conclut pas. Garder
la posture "porte à deux sens" (sur-flagger les éléments douteux en `❓` ou
`[review]`, laisser l'avocat trancher) plutôt que "porte à sens unique"
(décider tacitement à la place du mandataire).

---

## Charger le profil pratique avant de commencer

Avant tout, lire :
1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Récupérer :
- **Rôle** depuis `## 1. Profil cabinet et profil de pratique PI` (avocat
  inscrit / mandataire en brevets EQE / mandataire en marques INPI / juriste
  interne / non-juriste — change l'en-tête de confidentialité ET le périmètre
  du secret professionnel ; le claim chart d'un non-avocat n'est PAS couvert
  par le secret professionnel et doit être marqué comme tel avant tout
  partage hors équipe juridique).
- **Juridictions et offices d'inscription** (INPI, OEB, OMPI/PCT). Pour
  l'enforcement contrefaçon : la compétence est **exclusive du TJ Paris**
  (CPI L.615-1) quel que soit le brevet (FR, partie française d'EP, PCT
  désignant FR). À surfacer dans la sortie.
- **Domaines techniques principaux** (mécanique / chimie / pharma / biotech /
  informatique / électronique / télécom). Calibre la lecture des
  revendications et la nature de la documentation produit attendue (notice
  utilisateur en mécanique, MSDS et procédé en chimie, code source en
  logiciel, séquences en biotech).
- **Posture enforcement** (agressive / mesurée / conservatrice) — détermine
  le ton des recommandations stratégiques (étape 5) : agressive privilégie
  saisie-contrefaçon en premier ; conservatrice commence par mise en demeure
  ou négociation.
- **Matrice d'approbateurs** : qui signe une mise en demeure brevet ? qui
  approuve une requête en saisie-contrefaçon ? qui valide une assignation
  TJ Paris ? Ces approbateurs sont nommés dans la sortie.
- **Partenaire mandataire en brevets externe** (depuis "Mandataires et
  conseils externes" du profil) — destinataire naturel du brief de revue.

Ce skill ne conclut JAMAIS "contrefaçon caractérisée" ni "absence de
contrefaçon". Le tableau dit ce qui est ✅, ⚠️, ❌, ❓ — le mandataire ou
l'avocat qualifie.

Si le profil contient `[A CONFIGURER]`, surfacer :

> Le profil pratique n'est pas configuré — c'est ce qui adapte la posture
> enforcement (agressive/mesurée/conservatrice), la matrice d'approbateurs
> et l'identité du mandataire de revue à votre cabinet ou service.
>
> **Deux choix :**
> - Lancer `/hacienda-propriete-intellectuelle:entretien-demarrage` (10-15 min)
> - Dire **"provisoire"** et je lance avec les défauts génériques (rôle
>   avocat, FR + EP, posture mesurée) — chaque sortie sera taggée
>   `[PROVISOIRE — configurer le profil pour une sortie sur mesure]`.

### Mode provisoire

Si l'utilisateur dit "provisoire", lancer normalement avec : rôle avocat,
posture enforcement mesurée, juridiction FR (TJ Paris), pas d'approbateurs
nommés (recommander générique "mandataire en brevets EQE + avocat PI"),
pas de mandataire externe nommé. Tagger la note du relecteur et chaque
recommandation `[PROVISOIRE]`. À la fin :

> "C'était un run générique avec les hypothèses par défaut. Lance
> `/hacienda-propriete-intellectuelle:entretien-demarrage` pour calibrer sur
> VOTRE pratique — votre posture enforcement, votre mandataire en brevets
> de revue, votre matrice d'approbateurs."

---

## Intake — batch unique de 4 questions

Le claim chart exige beaucoup d'information précise en entrée. Demander en
batch unique, pas en escalade de questions une par une.

> Pour générer un claim chart exploitable, j'ai besoin de 4 informations.
> Peux-tu me répondre en bloc ?
>
> **1. Brevet attaqué.** Numéro de publication (FR, EP ou PCT) — je
> récupère les revendications via `inpi_brevet_details` (FR) ou
> `espacenet_brevet_details` (EP / PCT). OU : colle le fascicule (PDF ou
> texte intégral des revendications + description si possible).
>
> **2. Documentation du produit incriminé.** Plus c'est précis, plus le
> claim chart est solide. Idéalement, plusieurs sources :
> - notice utilisateur, manuel d'installation
> - fiche technique / spec sheet / datasheet
> - site marketing du produit (capture écran + URL)
> - photos détaillées (vues éclatées si dispo)
> - pour un logiciel : doc API publique, code source si open, captures UI
> - pour un produit pharma/chimie : RCP, notice patient, brevet déposé par
>   le contrefacteur (souvent révèle la composition)
> - pour un produit biotech : publications scientifiques, séquences GenBank
>
> Colle les sources OU pointe vers des fichiers / URL.
>
> **3. Théorie souhaitée :**
> - `littérale` uniquement (l'élément revendiqué doit être identifié tel
>   quel dans le produit) — analyse plus rapide, conclusion plus solide si
>   positive, conclusion fragile si négative
> - `équivalence` uniquement (CPI L.613-3) — quand la littéralité a
>   manifestement échoué et qu'on veut explorer la voie équivalence
> - `les deux` (défaut) — littérale d'abord, équivalence sur les éléments
>   ❌ absents en littéralité — recommandé pour première analyse
>
> **4. Contexte business :**
> - Produit commercialisé activement en France ? Depuis quand ?
> - Estimation du préjudice (volume vendu, prix, marge perdue) ?
> - Relation antérieure avec le contrefacteur présumé : ex-licencié, ex-
>   partenaire, ex-employé, concurrent direct sans historique ?
> - Communication publique du brevet par le titulaire (marquage produit,
>   communiqué, salon professionnel) — opposable au contrefacteur pour
>   calcul des dommages-intérêts (CPI L.615-7) ?

**Push si la documentation produit est insuffisante.** Moins de 2-3 sources
techniques précises = on ne peut PAS faire un claim chart sérieux. Dire :

> La documentation produit que tu as fournie est trop maigre pour un claim
> chart exploitable. Avec [ce que tu as], je peux faire un pré-claim chart
> indicatif avec beaucoup de `❓` — mais le mandataire n'en fera rien. Pour
> un tableau qui mène à une action concrète, il faut au minimum : (a) une
> source décrivant la fonction principale, (b) une source décrivant la
> composition / structure / architecture, (c) idéalement une source
> illustrée (photos, schémas, captures). Suggestion : acquérir le produit
> et l'analyser physiquement (rétro-ingénierie — légale en FR pour
> vérification brevet), ou demander documentation complémentaire via
> courrier de mise en demeure légère, ou — si le titulaire est prêt à
> avancer — saisie-contrefaçon (CPC art. 59) sur autorisation du juge
> pour obtenir la documentation technique chez le contrefacteur.
>
> Tu veux que je fasse le pré-claim chart indicatif quand même, ou tu
> reviens avec plus de doc ?

---

## Étape 1 — Extraction des revendications

Le claim chart est aussi solide que sa décomposition initiale des
revendications. Méthode standard mandataires en brevets :

### 1.1 Identifier les revendications indépendantes

Les revendications indépendantes définissent l'invention dans son
périmètre le plus large. Elles ne renvoient à aucune autre revendication.

- Habituellement **rev. 1** (toujours).
- Parfois rev. 1 (produit) + rev. N (procédé d'obtention) + rev. M
  (utilisation) — un brevet peut avoir plusieurs catégories d'invention,
  chacune avec sa propre revendication indépendante.
- Lire les revendications jusqu'à la dernière : repérer les "Procédé selon
  l'une des revendications précédentes" → dépendantes ; "Dispositif
  caractérisé en ce que" sans renvoi → indépendant.

### 1.2 Identifier les revendications dépendantes pertinentes

Toutes les dépendantes ne sont pas pertinentes pour le claim chart. Garder
celles qui :
- ajoutent une caractéristique technique probablement reproduite par le
  produit incriminé (lecture rapide de la doc produit donne une idée) ;
- précisent une plage numérique (épaisseur, température, concentration)
  qu'on peut vérifier directement sur la doc produit ;
- spécifient un mode de réalisation préféré qui correspond manifestement
  au produit incriminé.

Une revendication dépendante CONTREFAITE seule (la principale étant non
contrefaite) est juridiquement impossible — la dépendante inclut, par
définition, toutes les caractéristiques de la principale. Si la principale
n'est pas contrefaite, les dépendantes ne le sont pas non plus. Vérifier
la cohérence du tableau à la fin (étape 3).

### 1.3 Décomposer chaque revendication en éléments numérotés

C'est le geste central. Chaque revendication est éclatée en éléments
constitutifs atomiques, chacun avec un identifiant stable utilisé dans
tout le reste du document.

**Exemple méthode décomposition :**

> **Revendication 1 :** "Procédé de filtration d'eau utilisant une
> membrane à base de graphène, caractérisé en ce que ladite membrane
> comprend (a) une couche support en polymère poreux, (b) une couche
> active de graphène d'épaisseur 5-50 nm, et (c) un agent de
> réticulation polyamine."
>
> **Décomposition :**
> - Élément (1) : Procédé de filtration d'eau
> - Élément (2) : Utilisation d'une membrane à base de graphène
> - Élément (3a) : Couche support en polymère poreux
> - Élément (3b) : Couche active de graphène d'épaisseur 5-50 nm
> - Élément (3c) : Agent de réticulation polyamine

Règles de décomposition :
- Un élément = une caractéristique technique élémentaire.
- Si la revendication enchaîne par "et" ou liste (a)/(b)/(c), chaque item
  est un sous-élément avec suffixe lettre (3a / 3b / 3c).
- Si une caractéristique combine plusieurs aspects ("membrane à base de
  graphène d'épaisseur 5-50 nm"), considérer si la séparation a un sens
  technique — souvent oui : un produit peut avoir la membrane sans la
  bonne épaisseur.
- Les **préambules** ("procédé de filtration d'eau") ne sont PAS purement
  cosmétiques en droit français — ils définissent le contexte d'utilisation
  revendiqué. Les inclure comme élément (1).
- Les **caractéristiques additionnelles** ("comprenant en outre", "et de
  préférence") doivent être traitées séparément.

### 1.4 Flagger les termes interprétatifs

Les revendications contiennent souvent des termes qui appellent
interprétation juridictionnelle :

- `environ`, `approximativement`, `de l'ordre de` — plages tolérantes
- `essentiellement composé de`, `comprenant pour l'essentiel` — exclut
  certains additifs mais pas tous
- `de préférence`, `notamment`, `par exemple` — non limitatif (le mode
  préféré n'est PAS la limite revendiquée — important pour la contrefaçon)
- `caractérisé en ce que` — sépare préambule (état de l'art) et partie
  caractérisante (apport inventif)
- `apte à`, `configuré pour`, `destiné à` — formulations de fonction
  (une simple aptitude peut suffire à la contrefaçon, l'usage effectif
  n'est pas requis pour la contrefaçon directe)

Chaque terme interprétatif détecté reçoit un flag `[review — interprétation
revendication]` à passer au mandataire. L'interprétation des revendications
par le TJ Paris détermine l'étendue de la protection (analogue Markman
français — CPI L.615-1, jurisprudence Cour de cassation chambre commerciale
constante).

**Garde-fou** : ne JAMAIS interpréter silencieusement un terme ambigu en
faveur du titulaire (extension de portée) ou en faveur du contrefacteur
(réduction de portée). C'est la décision la plus contestée d'un procès en
contrefaçon. Toujours flagger.

---

## Étape 2 — Lecture de la documentation technique du produit

Une fois les revendications décomposées, on confronte chaque élément à la
documentation produit. Cette étape est itérative et précise.

### 2.1 Pour chaque élément, chercher une correspondance

Pour chaque élément `(N)` ou `(Na/b/c)` de chaque revendication :

1. **Localiser** dans la documentation produit la description, la
   spécification ou l'illustration qui correspond à l'élément
   revendiqué. Lire **toutes** les sources fournies — la notice, la
   fiche technique, le site marketing, les photos, le code, les brevets
   tiers déposés par le contrefacteur, les publications scientifiques.
2. **Citer précisément** la source : titre du document, page, section,
   référence de figure, URL avec ancre si possible, timestamp si vidéo,
   ligne de code ou identifiant de fonction si logiciel. La précision
   de la citation = la solidité du claim chart en revue mandataire.
3. **Quoter** le texte exact (entre guillemets) ou décrire l'illustration
   en quelques mots concrets. Pas de paraphrase floue.

### 2.2 Format de tracking par élément

Chaque élément est tracké dans un format uniforme avant agrégation dans
le tableau final :

```
Élément (N) : [texte revendication tel quel]
└─ Documentation produit : [titre source, page X, section Y]
   "[quote exacte]" / [description figure ou illustration]
└─ Présence : [✅ identifiée / ⚠️ partiellement identifiée /
                ❌ absente / ❓ documentation insuffisante]
└─ Notes : [observation complémentaire — variante numérique,
            ambiguïté, terminologie différente, etc.]
```

Ce format intermédiaire alimente directement le tableau final de l'étape 3.

### 2.3 Quatre statuts — règles d'attribution

- **✅ Identifiée.** La documentation produit décrit explicitement et sans
  ambiguïté la même caractéristique technique que l'élément revendiqué,
  avec la même fonction, dans le même contexte d'utilisation.
- **⚠️ Partiellement identifiée.** L'élément est présent mais avec une
  variation (plage numérique partiellement chevauchante, terme générique
  vs spécifique, mode de réalisation alternatif relevant du même concept).
  Le flag `⚠️` appelle un commentaire explicatif dans la colonne notes.
- **❌ Absente.** Aucune mention dans la documentation, ET la
  documentation est complète sur la fonction concernée (par exemple : la
  composition est entièrement décrite mais le composé revendiqué n'y
  figure pas → absent). Cet élément ouvre l'analyse équivalence à l'étape 4.
- **❓ Documentation insuffisante.** La documentation est silencieuse sur
  cette caractéristique, ET on ne peut pas savoir si c'est parce qu'elle
  est absente ou parce que le fabricant ne l'a pas documentée. C'est la
  distinction cruciale avec `❌`.

### 2.4 Que faire en cas de `❓` — actions d'approfondissement

Si la documentation est insuffisante pour conclure sur un ou plusieurs
éléments, **ne pas conclure ❌ par défaut**. Recommander à la place :

- **Demander des informations complémentaires** au vendeur, au revendeur
  ou au fabricant — soit directement (courrier d'information, demande de
  fiche technique complète), soit via une **mise en demeure légère**
  comportant une demande de divulgation de la composition / structure
  exacte.
- **Acquérir le produit et l'analyser** par rétro-ingénierie technique.
  C'est **légal en France** quand l'objectif est la vérification d'une
  contrefaçon de brevet (exception jurisprudentielle de l'usage privé /
  exception de recherche selon le contexte ; pour les logiciels exception
  spécifique CPI L.122-6-1 III sur la décompilation à des fins
  d'interopérabilité, hors champ ici). À documenter (huissier, laboratoire
  indépendant) pour produire la preuve devant le TJ Paris.
- **Saisie-contrefaçon judiciaire** (CPC art. 59, CPI L.615-5) — mesure
  forte : ordonnance du président du TJ Paris sur requête, exécutée par
  huissier accompagné d'un expert technique, qui peut obtenir copie de la
  documentation technique, échantillons et informations de commercialisation
  chez le contrefacteur. **Mesure invasive — exige solidité de la requête**
  (les éléments déjà connus doivent rendre la contrefaçon vraisemblable,
  sinon dommages-intérêts CPC art. 78). À préparer avec mandataire +
  avocat ; le claim chart ❓ ne suffit pas seul.

### 2.5 Garde-fou — ne JAMAIS inventer une correspondance

Le risque principal de cette étape : forcer une correspondance entre un
élément revendiqué et un passage de la doc produit qui n'y correspond pas
vraiment, par pression de "boucler le tableau". **Préférer ❓ à un ✅
optimiste.**

- Si la doc produit dit "système de filtration" et la revendication dit
  "procédé de filtration d'eau" — ce n'est PAS automatiquement ✅. Lire
  plus : s'agit-il bien d'eau ? Est-ce un procédé ou un dispositif ? La
  catégorie revendicative compte (procédé vs dispositif vs utilisation).
- Si la doc produit donne une plage 10-100 nm et la revendication 5-50 nm
  — c'est ⚠️ avec note "plage chevauchante 10-50 nm", pas ✅. La portion
  hors plage (50-100 nm) est non contrefaisante.
- Si la doc produit est silencieuse sur l'agent de réticulation alors que
  la composition complète est listée par ailleurs — c'est probablement
  ❌ (la composition complète sans agent → l'agent est absent). Si la
  composition n'est pas listée du tout — c'est ❓.

La discipline de ce garde-fou détermine si le mandataire fait confiance
au claim chart ou s'il refait tout à zéro.

---

## Étape 3 — Génération du claim chart

Cœur du skill. Agréger les éléments trackés (étape 2) dans un tableau
Markdown standardisé, lisible par un mandataire en 2 minutes et
exploitable directement comme pièce de travail interne.

### 3.1 Template du claim chart

Un tableau par revendication indépendante. Les revendications dépendantes
pertinentes : soit un tableau séparé, soit une colonne additionnelle si
peu de lignes.

````markdown
## Claim chart — Revendication 1 du brevet FR2700123

| Élément | Texte revendication | Correspondance produit | Source | Statut |
|---------|---------------------|------------------------|--------|--------|
| (1) | Procédé de filtration d'eau | Notice produit : "Système de purification d'eau domestique" | Notice AquaPur X9 p.3 §1 | ✅ |
| (2) | Membrane à base de graphène | Fiche technique : "Cartouche filtrante en graphène pur" | Fiche tech §Composition | ✅ |
| (3a) | Couche support en polymère poreux | Brevet déposé par le contrefacteur : "Support en polyéthersulfone (PES) microporeux" | EP9876543, rev. 2 | ✅ équivalent |
| (3b) | Couche active de graphène d'épaisseur 5-50 nm | Spec produit : "Épaisseur active 20-30 nm" | Spec p.7 tableau 2 | ✅ |
| (3c) | Agent de réticulation polyamine | Aucune mention dans la documentation produit | — | ❓ |

**Résumé revendication 1 :**
- Éléments ✅ couverts : 4/5 (80 %)
- Éléments ⚠️ partiels : 0/5
- Éléments ❌ absents : 0/5
- Éléments ❓ à vérifier : 1/5 — élément (3c) agent de réticulation

→ **Contrefaçon littérale partielle suspectée** sous réserve de vérification
de l'élément (3c). Voir recommandations stratégiques (étape 5) pour la
voie d'approfondissement (rétro-ingénierie / saisie-contrefaçon).
````

### 3.2 Légende des statuts (à reproduire sous chaque tableau si non
implicite)

- **✅ Couvert** — correspondance littérale claire entre l'élément
  revendiqué et la description du produit. Possibilité de précision
  "✅ équivalent" pour un mode de réalisation alternatif littéralement
  inclus dans le périmètre revendiqué (ex. polyéthersulfone fait partie
  des "polymères poreux" revendiqués génériquement).
- **⚠️ Couverture partielle** — élément partiellement présent : plage
  numérique partiellement chevauchante, terme générique vs spécifique
  asymétrique, variante revendicative ambiguë. Toujours commenter dans
  la cellule "Correspondance produit".
- **❌ Absent** — pas de correspondance dans une documentation par
  ailleurs complète sur le sujet. Ouvre l'analyse équivalence (étape 4).
- **❓ À vérifier** — documentation incomplète pour conclure ; mesure
  complémentaire requise (étape 2.4).

### 3.3 Plusieurs revendications — un tableau chacune

- **Revendication indépendante 1** : tableau complet.
- **Revendication indépendante 2** (si plusieurs catégories d'invention :
  produit + procédé d'obtention + utilisation) : tableau complet séparé,
  même format.
- **Revendications dépendantes pertinentes** : pour chacune, soit un
  tableau dédié (si elle ajoute >2 caractéristiques), soit une note sous
  le tableau principal listant la caractéristique additionnelle + son
  statut. Format compact :

  > **Revendication 3 (dépendante de 1)** : ajoute "ledit agent de
  > réticulation étant choisi parmi la polyéthylèneimine et la
  > polyamine".
  > → Élément (3c-précisé) : statut ❓ (idem rev. 1).

### 3.4 Règle "all elements rule" française

**Règle d'application stricte de la contrefaçon littérale en droit
français :** il faut que **TOUS** les éléments d'une revendication soient
présents (✅) dans le produit incriminé pour qualifier la contrefaçon
littérale de cette revendication. Un seul élément ❌ ou ⚠️ douteux suffit
à faire tomber la contrefaçon littérale de cette revendication.

Conséquences pratiques pour le claim chart :
- Si une revendication a 5 éléments dont 4 ✅ et 1 ❌ → **pas de
  contrefaçon littérale** de cette revendication. L'analyse équivalence
  (étape 4) reprend la main sur l'élément ❌.
- Si toutes les revendications indépendantes ont au moins un ❌ ou un ⚠️
  douteux → **pas de contrefaçon littérale du brevet entier**. Voie
  équivalence à explorer en priorité avant toute conclusion.
- Si une revendication indépendante a 100 % ✅ → contrefaçon littérale
  **suspectée** (rappel : la qualification reste au juge / mandataire).
- Les revendications dépendantes 100 % ✅ confortent la contrefaçon de la
  principale (cohérence : impossible qu'une dépendante soit contrefaite
  si la principale ne l'est pas).

### 3.5 Cohérence inter-revendications — contrôle final

Avant de finaliser le tableau, faire une passe de cohérence :

- Pour chaque revendication dépendante marquée 100 % ✅ : vérifier que la
  revendication dont elle dépend est aussi 100 % ✅. Si non,
  contradiction logique → relire la décomposition.
- Pour chaque revendication indépendante 100 % ❌ : vérifier que toutes
  ses dépendantes sont aussi au moins ❌ ou ⚠️. Si une dépendante est
  ✅, contradiction → relire.
- Cohérence terminologique : un même terme revendicatif doit être
  interprété de la même façon partout dans le tableau. Si "polymère
  poreux" est ✅ équivalent au PES dans rev. 1, le PES doit aussi
  satisfaire "polymère poreux" dans rev. 4 si elle reprend le terme.

---

## Étape 4 — Analyse contrefaçon par équivalence (CPI L.613-3, Cour de cass. com. 5 mai 2009)

Étape **critique en droit français** : la théorie de l'équivalence est
la porte de sortie quand la contrefaçon littérale échoue sur un ou
plusieurs éléments. Beaucoup de procès en contrefaçon brevet se jouent
sur cette analyse.

### 4.1 Cadre juridique

> **Cadre FR — théorie de l'équivalence (CPI L.613-3, jurisprudence Cour
> de cassation chambre commerciale 5 mai 2009 n°08-13.586) :**
>
> > "Constitue une contrefaçon par équivalents le fait pour un tiers
> > d'utiliser un moyen qui, sous une forme différente, exerce la même
> > fonction en vue d'obtenir un résultat de même nature."
>
> **Trois critères cumulatifs :**
> 1. **Même fonction** : l'élément du produit incriminé remplit la même
>    fonction technique que l'élément revendiqué.
> 2. **Même résultat** : le résultat obtenu est de même nature (même
>    effet technique recherché).
> 3. **Voies substantiellement identiques** : les moyens employés sont
>    équivalents — pas nécessairement identiques, mais de même nature
>    technique pour l'homme du métier.

Les trois critères sont **cumulatifs** — un seul manquant suffit à écarter
l'équivalence pour cet élément.

Le fondement texte est CPI L.613-3 (droits conférés par le brevet :
contrefaçon directe + contrefaçon par équivalence), interprété par la
jurisprudence constante de la chambre commerciale de la Cour de cassation
depuis l'arrêt fondateur du 5 mai 2009.

### 4.2 Méthode — pour chaque élément ❌, mener l'analyse en 3 critères

Pour chaque élément flaggé **❌ absent** à l'étape 3, ouvrir un sous-tableau
dédié à l'analyse équivalence. Format :

````markdown
### Élément (3c) "Agent de réticulation polyamine"

Élément ❌ absent en littéralité dans la documentation produit AquaPur X9.
Analyse équivalence (CPI L.613-3, Cour de cass. com. 5 mai 2009) :

Hypothèse : le produit utilise un agent de réticulation **polyimine** (mention
trouvée dans le brevet déposé EP9876543 par le contrefacteur, rev. 5).

| Critère | Élément revendiqué (polyamine) | Élément produit (polyimine, hyp.) | Évaluation |
|---|---|---|---|
| Même fonction | Stabilisation chimique de la couche de graphène par réticulation des chaînes polymères | Stabilisation chimique de la couche de graphène par réticulation (mécanisme analogue) | ✅ `[review — homme du métier polymériste]` |
| Même résultat | Durabilité de la membrane + maintien de la performance de filtration dans le temps | Idem (le PES réticulé en polyimine a un comportement de durabilité comparable selon littérature) | ✅ `[review]` |
| Voies subst. identiques | Chimie de réticulation par groupes amine | Chimie de réticulation par groupes imine — sous-famille des amines, mécanisme analogue | ⚠️ `[review — frontière à apprécier par chimiste]` |

**Conclusion équivalence (3c) :** équivalence présumée sous réserve de
validation chimiste et confirmation expérimentale du mécanisme de
réticulation effectif dans le produit. `[review]`
````

### 4.3 Trois critères — exemples par domaine technique

**Mécanique** — élément revendiqué "ressort hélicoïdal de compression",
élément produit "lame ressort en flexion".
- Même fonction : oui (rappel élastique).
- Même résultat : oui (force de rappel proportionnelle au déplacement).
- Voies substantiellement identiques : ⚠️ à apprécier — le ressort
  hélicoïdal stocke l'énergie en torsion du fil, la lame en flexion. Si
  le brevet revendique spécifiquement la torsion, l'équivalence peut
  échouer ; si la revendication est "moyen élastique de rappel", elle
  passe.

**Chimie** — élément revendiqué "solvant éthanol", élément produit
"solvant méthanol".
- Même fonction : oui (dissolution).
- Même résultat : ⚠️ à apprécier — solubilités différentes selon le
  soluté ; toxicité différente change la "nature du résultat" si la
  revendication est dans un contexte alimentaire ou pharmaceutique.
- Voies : oui (même famille alcool primaire). Souvent ✅ en chimie
  industrielle classique, plus discuté en pharma.

**Logiciel** — élément revendiqué "tri par algorithme quicksort",
élément produit "tri par mergesort".
- Même fonction : oui (trier).
- Même résultat : oui (séquence ordonnée).
- Voies : ⚠️ — algorithmes différents, complexité différente. Si la
  revendication revendique le quicksort par sa propriété de complexité
  O(n log n) moyenne, l'équivalence peut passer ; si elle revendique le
  comportement spécifique du quicksort (pivot, partition), elle échoue.

**Biotech** — élément revendiqué "anticorps monoclonal anti-CD20 IgG1",
élément produit "anticorps monoclonal anti-CD20 IgG4".
- Même fonction : oui (liaison sélective CD20).
- Même résultat : ⚠️ — l'isotype change l'activation du complément et
  ADCC ; si l'effet thérapeutique recherché en dépend, le résultat n'est
  pas de même nature.
- Voies : ✅ (même famille IgG, même cible).

Pour chaque équivalence proposée, **flagger `[review]` systématiquement**.
Le mandataire ou l'avocat valide — cette analyse exige souvent un avis
d'expert technique (homme du métier).

### 4.4 Limites de la théorie de l'équivalence

Trois limites majeures à signaler dans la sortie quand elles s'appliquent :

**Doctrine du dossier de poursuite (file wrapper estoppel, importée en
droit français).** Si le déposant a, pendant l'examen du brevet (INPI
ou OEB), renoncé à une étendue de protection — typiquement en réduisant
la portée d'une revendication pour répondre à une objection
d'antériorité ou d'activité inventive de l'examinateur —, il ne peut
pas récupérer cette portée abandonnée par la voie de l'équivalence.
Vérifier le dossier de poursuite (registre INPI, registre OEB en ligne)
avant toute argumentation équivalence sur un élément manifestement
restreint pendant l'examen.

**Borne par l'art antérieur.** La théorie de l'équivalence ne peut pas
étendre la protection à des moyens connus de l'art antérieur à la date
de priorité du brevet — sinon le brevet serait nul pour défaut de
nouveauté sur la partie équivalente. Si l'élément équivalent proposé
était déjà divulgué dans l'art antérieur (par exemple les antériorités
trouvées en `recherche-anteriorite-brevet`), l'équivalence est exclue.

**Suffisance et prévisibilité pour l'homme du métier.** L'élément
équivalent doit être une variante prévisible pour l'homme du métier à
la date du dépôt — pas une rupture technologique apparue après. Si
l'équivalent proposé repose sur une technologie postérieure non
prévisible, l'équivalence devient discutable et appelle un avis
expert technique calé sur la date de priorité.

### 4.5 Restitution dans le tableau final

Pour chaque élément analysé en équivalence, le sous-tableau (4.2) est
inséré dans la sortie sous la section dédiée "Analyse contrefaçon par
équivalence". Chaque conclusion d'équivalence reçoit un flag `[review]`
final ; **ne JAMAIS écrire "équivalence caractérisée" sans `[review]`**.

Si **tous** les éléments ❌ trouvent une équivalence présumée → la
contrefaçon par équivalents est suspectée pour la revendication entière
(sous réserve validation mandataire). Sinon, la revendication échoue
en littérale ET en équivalence sur les éléments restants.

---

## Étape 5 — Recommandation stratégique

Le claim chart sert à décider quoi faire. La recommandation se calibre
sur trois variables : (a) **solidité technique** du tableau (combien de
✅ littéraux, combien d'équivalences `[review]`), (b) **posture
enforcement** du profil (agressive / mesurée / conservatrice), (c)
**contexte business** (préjudice, relation antérieure avec le
contrefacteur, urgence).

### 5.1 Bucket — Contrefaçon littérale claire (toutes les revendications indépendantes 100 % ✅)

Cas le plus solide. La preuve est faite sur la documentation publique du
contrefacteur.

- **Action recommandée :** **saisie-contrefaçon** (CPC art. 59, CPI
  L.615-5) pour **fixer la preuve** avant que le contrefacteur ne
  dissimule ou modifie son produit, **puis** mise en demeure (avec
  preuves saisies en main) ou directement **assignation devant le TJ
  Paris** (compétence exclusive CPI L.615-1).
- **Si posture cabinet conservatrice :** commencer par **mise en
  demeure** (laisser une chance de retrait à l'amiable + créer un dossier
  de mauvaise foi opposable si le contrefacteur ignore). La
  saisie-contrefaçon reste possible après si la mise en demeure échoue.
- **Si posture agressive :** **saisie-contrefaçon en premier** (effet de
  surprise + fixation de la preuve), puis assignation immédiate. La
  procédure de mise en demeure préalable n'est pas obligatoire en
  contrefaçon brevet.
- **Préparation parallèle** du dossier d'assignation TJ Paris (calcul
  préjudice CPI L.615-7 — manque à gagner + bénéfices contrefacteur +
  préjudice moral ; demande d'interdiction sous astreinte).

### 5.2 Bucket — Contrefaçon littérale partielle (rev. principale ✅ mais dépendantes mixtes)

Solide sur la revendication principale, fragile sur les dépendantes.
Cas fréquent.

- **Action recommandée :** **mise en demeure circonstanciée** sur la
  revendication principale uniquement, sans s'engager sur les
  dépendantes. Offre éventuelle de licence (peut convertir le litige en
  revenu plutôt qu'en procès).
- Préparer le dossier TJ Paris **en parallèle** sur la seule
  revendication principale (les dépendantes 100 % ✅ confortent, les
  autres ne nuisent pas — elles sont accessoires).
- Posture agressive : **saisie-contrefaçon ciblée** sur la revendication
  principale puis assignation.
- Posture conservatrice : mise en demeure + délai de réponse 30 jours
  + offre de discussion amiable. Évaluer le retour avant d'engager TJ Paris.

### 5.3 Bucket — Contrefaçon par équivalence uniquement (littérale échoue, équivalence présumée)

Cas plus fragile — l'équivalence est argumentative et exige souvent
expertise technique au procès.

- **Action recommandée — préparer d'abord l'argumentation technique :**
  - sécuriser un **avis d'expert technique** (homme du métier dans le
    domaine du brevet) sur les 3 critères équivalence
  - vérifier le **dossier de poursuite** (registre INPI / OEB) — pas de
    file wrapper estoppel sur les éléments en équivalence
  - vérifier que les éléments équivalents proposés n'étaient pas dans
    l'**art antérieur** à la date de priorité (interroger
    `recherche-anteriorite-brevet` si pas déjà fait)
- **Mise en demeure prudente** : exposer les 3 critères d'équivalence,
  demander explications au contrefacteur sur la composition / structure /
  procédé effectif (la réponse — ou l'absence de réponse — constitue
  preuve dans la suite).
- **Ne pas saisir avant solidification** de l'argumentation équivalence
  (risque dommages-intérêts CPC art. 78 si la saisie est annulée pour
  vraisemblance insuffisante de la contrefaçon).
- Posture agressive : peut commencer par saisie-contrefaçon SI les
  éléments en équivalence sont peu nombreux et la documentation publique
  rend l'équivalence très vraisemblable.
- Posture conservatrice : mise en demeure exploratoire + offre de
  discussion. Engager le procès TJ Paris seulement après dossier
  technique solide.

### 5.4 Bucket — Contrefaçon partielle douteuse (nombreux ❓)

Documentation produit insuffisante pour conclure dans un sens ou dans
l'autre. Souvent le cas pour les produits dont la composition / le
procédé n'est pas publié.

- **Action recommandée — collecter la preuve avant de conclure :**
  - **acquérir le produit** sur le marché + analyse physique (rétro-
    ingénierie technique en laboratoire — légal en FR pour vérification
    brevet, à documenter par huissier et laboratoire indépendant)
  - **constat d'huissier** sur le marketing public du produit (site web,
    fiches produit en magasin, salons professionnels)
  - **saisie-contrefaçon judiciaire** (CPC art. 59) sur autorisation
    motivée du président TJ Paris pour obtenir la documentation
    technique du contrefacteur — exige de présenter au juge une
    vraisemblance de contrefaçon (les éléments ✅ déjà au tableau,
    même partiels, suffisent généralement)
- Pas de mise en demeure avant collecte — risque d'avertir le
  contrefacteur qui modifie alors son produit, dissimule sa
  documentation, ou se prépare en défense.
- Reprendre le claim chart **après** collecte avec la nouvelle
  documentation.

### 5.5 Bucket — Peu de chevauchement

Le claim chart ne montre pas de matière à contrefaçon (la plupart des
éléments ❌ sans équivalence présumée).

- **Pas d'action enforcement recommandée.**
- Risque : envoyer une mise en demeure mal calibrée expose à une action
  reconventionnelle en concurrence déloyale du contrefacteur présumé
  (Code civil art. 1240 — dénigrement, désorganisation, atteinte
  réputationnelle), surtout si la mise en demeure est diffusée largement.
- **Surveillance recommandée** : surveiller les évolutions futures du
  produit (le contrefacteur peut renforcer sa proximité technique au
  brevet, par exemple par mise à jour logicielle ou changement de
  composition). Adapter `surveillance-marque` V1.1.0 aux brevets (V3.0+
  prévue).
- Documenter le claim chart dans le portefeuille (registre interne) pour
  référence future si le produit évolue.

### 5.6 Garde-fous transverses à tous les buckets

**Toujours :**
- **Validation finale par mandataire en brevets EQE ou avocat
  spécialisé PI** avant toute action externe. Le claim chart est un
  outil de travail interne ; la décision d'enforcement est juridique.
- **Évaluer la pertinence d'une action en concurrence déloyale
  parallèle** (Code civil art. 1240 / 1241 anciens 1382 / 1383) si pas
  de contrefaçon brevet pure mais comportement parasitaire (copie
  servile du conditionnement, désorganisation de réseau de distribution,
  débauchage commercial) — fondement distinct, juridictions de droit
  commun (TJ ou Tribunal de commerce selon les parties), pas l'exclusivité
  TJ Paris.
- **Compétence TJ Paris exclusive** pour les actions en contrefaçon de
  brevets (CPI L.615-1 + décret n°2009-1205 du 9 octobre 2009) — pas
  d'autres juridictions en France quel que soit le brevet (FR, partie
  française d'EP, PCT désignant FR). À surfacer dans toutes les
  recommandations.
- **Prescription** : action en contrefaçon = **5 ans** à compter du
  jour où le titulaire a connu ou aurait dû connaître les faits (CPI
  L.615-8). Si la contrefaçon est ancienne et que la connaissance par le
  titulaire est démontrable depuis plus de 5 ans, la prescription est
  acquise — flagger en `[review]` pour validation avocat.
- **Annuités du brevet** : un brevet sans paiement d'annuités tombe en
  domaine public et ne donne plus droit à action. Vérifier l'état des
  annuités du brevet attaqué (INPI Data, registre OEB) AVANT toute
  action — un brevet déchu ne fonde aucune contrefaçon.

---

## Format de sortie

Template Markdown standardisé. La sortie est destinée d'abord au
mandataire en brevets ou à l'avocat PI ; elle doit se lire en 2 minutes
pour la décision d'action, et en 10 minutes pour le détail technique
revendication par revendication.

`````markdown
[EN-TÊTE CONFIDENTIALITÉ — selon profil, cf. CLAUDE.md § 2]

# Claim chart — Brevet [FR/EP/PCT N°] vs [Produit incriminé] (CONFRONTATION TECHNIQUE, PAS QUALIFICATION)

> **Confrontation ≠ qualification de contrefaçon.** Ce claim chart est un
> outil d'analyse technique destiné au mandataire en brevets EQE ou à
> l'avocat spécialisé PI. Il NE qualifie PAS la contrefaçon. La
> qualification de contrefaçon est une décision juridique aux
> conséquences lourdes ; toute action externe (mise en demeure, saisie-
> contrefaçon CPC art. 59, assignation TJ Paris CPI L.615-1) exige
> validation par mandataire ou avocat.

> **⚠️ Note du relecteur**
> - **Brevet :** [numéro] · titulaire [...] · statut [délivré / en vigueur / en opposition / déchu]
> - **Annuités :** [à jour au YYYY-MM-DD via INPI Data / à vérifier]
> - **Produit incriminé :** [identifiant / nom commercial / fabricant / distributeur]
> - **Documentation produit lue :** [N sources : notice (Y p), fiche tech (Y p), site marketing, photos, ...]
> - **Théorie analysée :** [littérale / équivalence / les deux]
> - **Sources brevet :** [INPI Data ✓ / OEB Espacenet ✓ / utilisateur fourni]
> - **Éléments [review] (équivalence et interprétation) :** [N]
> - **Compétence juridictionnelle :** TJ Paris exclusive (CPI L.615-1)
> - **Approbateur de l'action recommandée :** [tiré du profil — mise en demeure / saisie / assignation]
> - **Avant action externe :** validation mandataire en brevets EQE ou avocat spécialisé PI **OBLIGATOIRE**

**Triage :**
- 🔴 **CONTREFAÇON LITTÉRALE** — toutes les revendications indépendantes 100 % ✅, voie procès solide
- 🟠 **CONTREFAÇON PARTIELLE OU ÉQUIVALENCE** — littérale partielle ou équivalence présumée, action possible avec préparation
- 🟡 **CHEVAUCHEMENT FAIBLE** — beaucoup de ❓ ou de ❌, collecte de preuves nécessaire avant toute conclusion
- 🟢 **PAS DE CHEVAUCHEMENT** — pas de matière à action, surveillance recommandée

[Sélectionner la cote — une phrase pourquoi]

---

## Brevet analysé

- **Numéro :** [FR..../EP..../WO....]
- **Titre :** [...]
- **Classification CIB principale :** [code]
- **Titulaire :** [...]
- **Déposant initial (si différent) :** [...]
- **Date de dépôt :** [YYYY-MM-DD]
- **Date de priorité :** [YYYY-MM-DD]
- **Date de publication :** [YYYY-MM-DD]
- **Date de délivrance :** [YYYY-MM-DD si délivré]
- **Statut actuel :** [en vigueur / en opposition / déchu / annulé]
- **Couverture territoriale :** [FR / parties désignées d'EP / pays PCT entrés en phase nationale]

## Produit incriminé

- **Nom commercial :** [...]
- **Fabricant :** [...]
- **Distributeur en France :** [...]
- **Date de mise sur le marché FR (si connue) :** [YYYY-MM-DD ou estimation]
- **Marché cible :** [particulier / professionnel / industriel]
- **Sources documentaires utilisées :**
  - [source 1 — titre, URL ou fichier, pages]
  - [source 2 — ...]
  - [...]

## Décomposition des revendications

### Revendication 1 (indépendante)

> [texte intégral de la revendication tel que publié]

**Décomposition :**
- Élément (1) : [...]
- Élément (2) : [...]
- Élément (3a) : [...]
- Élément (3b) : [...]
- Élément (3c) : [...]

[Si termes interprétatifs détectés :]
**Termes interprétatifs :** [liste — ex. "environ 50 nm" en (3b), "agent
de réticulation polyamine" en (3c) — interprétation revendicative à
valider par mandataire] `[review]`

### Revendication N (dépendante de M) [si pertinente]

[idem]

---

## Claim chart — Revendication 1

[table format § 3.1]

**Résumé Rev. 1 :** N/X éléments ✅, N ⚠️, N ❌, N ❓ → [conclusion littérale]

## Claim chart — Revendication N

[idem]

---

## Analyse contrefaçon par équivalence (CPI L.613-3, Cour de cass. com. 5 mai 2009 n°08-13.586)

[Pour chaque élément ❌, sous-tableau format § 4.2]

### Élément (3c) "Agent de réticulation polyamine"

[sous-tableau 3 critères]

**Conclusion équivalence (3c) :** [équivalence présumée / non / à
approfondir] `[review]`

[Si limites pertinentes :]
**Limites à vérifier :**
- File wrapper estoppel : [état dossier de poursuite INPI/OEB sur cet élément]
- Borne par l'art antérieur : [vérification antériorités à mener / faite]

---

## Recommandation stratégique

[Bucket sélectionné parmi 5.1 à 5.5, calibré sur posture profil + contexte business]

**Bucket :** [contrefaçon littérale claire / partielle / équivalence
uniquement / partielle douteuse / peu de chevauchement]

**Actions :**
1. [action 1 — ex. saisie-contrefaçon CPC art. 59 préparée par mandataire + avocat]
2. [action 2 — ex. mise en demeure circonstanciée]
3. [action 3 — ex. assignation TJ Paris si pas de retour]

**Approbateur(s) :** [tiré du profil, par étape]

**Délais critiques :**
- Prescription action contrefaçon : 5 ans connaissance des faits (CPI L.615-8)
- Annuités brevet : [date prochaine échéance — un brevet déchu ne fonde aucune action]

---

## Vérification des citations

Chaque numéro de brevet, chaque numéro de revendication, chaque citation
de texte (CPI, CPC, jurisprudence Cour de cassation chambre commerciale),
chaque source de documentation produit dans ce claim chart doit être
contrôlé contre la source primaire (INPI Data, OEB Espacenet, Légifrance,
document produit téléversé) avant toute action externe. Les statuts ✅ /
⚠️ / ❌ / ❓ et les conclusions d'équivalence sont des **propositions de
lecture technique** — la qualification juridique appartient au mandataire,
à l'avocat ou au juge.

**Une question hors de ma checklist :** [observation seconde-ordre — omis si rien]

## Que veux-tu faire ?

1. **Préparer le paquet d'entrée lettre / réponse** — je prépare puis je route vers `mise-en-demeure-pi` avec `mode`, `droits invoques`, `faits resumes`, `pieces disponibles`, `objectif de ton`, `niveau d'escalade`, plus, pour `draft` / `escalate` si pertinent, `cible exploitable`, `points faibles connus`, `demande principale`, `contrainte calendrier`
2. **Préparer la saisie-contrefaçon** — j'ouvre `saisie-contrefacon` avec le claim chart en contexte pour préparer la requête et les instructions huissier
3. **Escalader** — note pour [mandataire en brevets EQE / avocat PI / GC selon approbateurs du profil] avec faits-clés, claim chart résumé et décision attendue
4. **Approfondir l'analyse équivalence** — itérer sur les éléments ❌ avec données techniques supplémentaires (avis expert, dossier de poursuite, art antérieur)
5. **Acquérir et analyser le produit** — checklist rétro-ingénierie technique (huissier + laboratoire indépendant) pour transformer les ❓ en ✅ ou ❌
6. **Autre chose** — dis-moi
`````

---

## Gate non-juriste

Avant d'émettre la sortie, lire `## 1. Profil cabinet et profil de
pratique PI`. Si **Rôle = juriste interne sans inscription** OU
**non-juriste avec accès avocat** OU **non-juriste sans accès avocat** :

> Cette sortie est un claim chart — outil d'analyse technique, pas un
> avis juridique de contrefaçon. **Envoyer une mise en demeure de
> contrefaçon brevet sans validation avocat / mandataire EQE expose à
> des conséquences lourdes** : (a) action reconventionnelle en
> concurrence déloyale du contrefacteur présumé (Code civil art. 1240
> — dénigrement, atteinte réputationnelle, désorganisation
> commerciale) ; (b) prescription du droit d'agir si la mise en demeure
> est mal calibrée ; (c) **saisie-contrefaçon annulée** pour
> vraisemblance insuffisante, avec dommages-intérêts CPC art. 78 ;
> (d) coût et réputation d'un procès TJ Paris perdu. Un **mandataire
> en brevets EQE** ou un **avocat spécialisé propriété industrielle**
> doit évaluer ce claim chart **avant toute communication externe**.
>
> Voici un brief 1 page à apporter à votre mandataire / avocat —
> ça réduira le temps de la conversation :
>
> [Générer un brief : **(1)** récap brevet (numéro, titulaire, statut,
> annuités), **(2)** récap produit incriminé (nom, fabricant,
> distributeur FR, sources doc), **(3)** synthèse claim chart par
> revendication (N éléments ✅ / ⚠️ / ❌ / ❓), **(4)** éléments
> `[review]` à arbitrer (interprétation revendications + équivalences),
> **(5)** recommandation stratégique préliminaire avec bucket,
> **(6)** 3 questions à poser au mandataire : "la décomposition des
> revendications te convient-elle ?", "les équivalences présumées
> tiennent-elles selon ta lecture homme du métier ?", "quel chemin
> d'enforcement recommandes-tu — mise en demeure, saisie, assignation
> directe TJ Paris ?"]
>
> Pour trouver un mandataire en brevets ou un avocat PI :
>
> - **Annuaire des avocats** : https://www.avocat.fr (Conseil National des Barreaux)
> - **Annuaire des conseils en propriété industrielle (mandataires INPI)** :
>   https://www.inpi.fr/conseils-en-propriete-industrielle
> - **Liste des mandataires européens (qualifiés EQE) auprès de l'OEB** :
>   https://www.epo.org/en/searching-for-patents/legal/professional-representatives

Livrer le claim chart complet À CÔTÉ du brief. Ne pas retenir l'analyse.

---

## Emplacement de la sortie

Écrire à
`~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/claim-chart-<num-brevet>-<produit-slug>-YYYY-MM-DD.md`
et surfacer le chemin à l'utilisateur.

Slug brevet : numéro normalisé (`fr2700123`, `ep3456789`, `wo2024012345`).
Slug produit : forme courte du nom commercial (`aquapur-x9`,
`compressor-vid-acme`). Si conflit même jour, suffixer `-2`, `-3`.

Matter workspaces hors V1 (cf. `CLAUDE.md` `## 11`).

---

## Fermeture avec l'arbre de décision

Fermer avec l'arbre de décision décrit dans `## Que veux-tu faire ?` du
template de sortie — les 6 options sont personnalisées au claim chart
(et non les 5 génériques de `CLAUDE.md` `## 2`). L'option 1 ("Préparer
le paquet d'entrée lettre / réponse") est l'aboutissement naturel d'un claim chart 🔴 ou
🟠 ; les options 2 et 3 sont les escalades plus lourdes ; les options 4
et 5 sont les voies d'approfondissement si le tableau n'est pas
concluant.

---

## Ce que ce skill NE fait PAS

- **Qualifier la contrefaçon.** Jamais. La qualification appartient au
  juge (TJ Paris, compétence exclusive CPI L.615-1) ou au
  mandataire/avocat dans son analyse de risque. Le claim chart
  **propose une lecture technique** ; il ne tranche pas.
- **Rédiger la mise en demeure ou la réponse précontentieuse.** Router
  vers `mise-en-demeure-pi` avec un paquet d'entrée compact :
  `mode`, `droits invoques`, `faits resumes`, `pieces disponibles`,
  `objectif de ton`, `niveau d'escalade`, plus, pour `draft` /
  `escalate` si pertinent, `cible exploitable`, `points faibles connus`,
  `demande principale`, `contrainte calendrier`.
- **Préparer la requête en saisie-contrefaçon judiciaire** (CPC art. 59,
  CPI L.615-5) — exige une requête motivée présentée au président TJ
  Paris, accompagnée du brevet, de la preuve de vraisemblance, et de
  l'identification des lieux et choses à saisir. = `saisie-contrefacon`.
- **Préparer l'assignation TJ Paris en contrefaçon.** = `contentieux-pi`.
  Exige cadre procédural complet (constitution avocat spécialiste PI
  obligatoire devant TJ Paris, calcul détaillé du préjudice, conclusions).
- **Calculer le préjudice** (CPI L.615-7 : manque à gagner +
  bénéfices contrefacteur + préjudice moral + redevance indemnitaire
  possible) — exige expertise comptable et financière, hors champ
  technique du claim chart.
- **Évaluer la validité du brevet attaqué** (nouveauté, activité
  inventive, suffisance de description, extension indue). En procès, le
  contrefacteur soulèvera presque systématiquement la nullité du brevet
  en défense — il faut s'y être préparé. = `anteriorite-invalidite`
  (V2.1 future) ou collaboration mandataire EQE.
- **Répondre à une argumentation de défense** (nullité, prescription
  L.615-8, exception d'usage personnel L.613-5, exception de recherche
  L.613-5 d, épuisement L.613-6) — ces argumentations sont anticipées
  et travaillées par l'avocat plaidant.
- **Garantir le résultat de l'action.** La qualification juridique
  relève des juridictions. Le claim chart prépare un dossier ; il ne
  prédit pas la décision du TJ Paris.

---

## Ton

Technique, rigoureux, précis. Le mandataire ou l'avocat lit le claim
chart et part en action — il a besoin d'un tableau **utilisable**, pas
d'une dissertation hedgée. Soit **✅** soit **❌** soit **⚠️** soit
**❓** — pas de "il pourrait peut-être", pas de "il semblerait que",
pas de paragraphe de caveat moralisant dans le tableau (les caveats vont
dans la note du relecteur en tête et dans les flags `[review]` en
ligne).

La rigueur du claim chart = la solidité du dossier. Un tableau bâclé
fait perdre la confiance du mandataire pour les prochains. Préférer un
claim chart **plus court mais propre** (3 ✅ honnêtes et 2 ❓ honnêtes)
à un claim chart **long et faussement complet** (5 ✅ optimistes
indéfendables en revue). Le garde-fou en tête, la règle "all elements
rule" française et les flags `[review]` sur l'équivalence font le
travail de scope. Le claim chart prépare la décision ; il ne la prend
pas.
