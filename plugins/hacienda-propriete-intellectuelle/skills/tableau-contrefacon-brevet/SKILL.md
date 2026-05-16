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
contrefaçon (= rôle du juge ou du mandataire/avocat), NE rédige PAS de mise
en demeure (= rôle `mise-en-demeure-pi`), NE prépare PAS la requête en
saisie-contrefaçon (= `saisie-contrefacon` V6.0 future). **La qualification
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
