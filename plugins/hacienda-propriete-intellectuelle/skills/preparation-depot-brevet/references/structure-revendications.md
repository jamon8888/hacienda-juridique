# Structure des revendications — référence détaillée

Complément au skill `preparation-depot-brevet`. Donne l'anatomie d'une
revendication, des exemples commentés par catégorie, les erreurs
récurrentes, et les références CPI / CBE utiles. **Aucun de ces exemples
n'est une revendication prête au dépôt** — ce sont des illustrations
pédagogiques à adapter avec un mandataire en brevets.

---

## Anatomie d'une revendication indépendante

Format européen recommandé (Règle 43(1) CBE) — structure à deux parties :

```
[Préambule]                  ← état de la technique le plus proche +
                               caractéristiques connues partagées
caractérisé en ce que        ← séparation explicite
[Partie caractérisante]      ← caractéristiques nouvelles et inventives
```

Le **préambule** situe l'invention dans son contexte technique et reprend
ce que l'art antérieur le plus proche enseigne déjà. La **partie
caractérisante** énumère ce qui distingue l'invention. Cette structure
oblige le rédacteur à objectiver la distinction par rapport à l'art
antérieur connu — un exercice central de l'examen OEB.

---

## Exemples commentés par catégorie

### 1. Revendication de produit (composition chimique)

> **1.** Composition cosmétique pour application topique, comprenant un
> support cosmétiquement acceptable et au moins un agent actif, **caractérisée
> en ce que** l'agent actif est un extrait de *Camellia sinensis* présent
> à une concentration comprise entre 0,5 et 5 % en masse de la composition
> totale, et en ce que ladite composition présente un pH compris entre 5,0
> et 6,5.

**Analyse mot par mot :**
- *Composition cosmétique* — catégorie (produit chimique formulé)
- *application topique* — restriction d'usage (utile pour distinguer d'autres compositions analogues à usage interne)
- *support cosmétiquement acceptable* — terme générique reconnu en cosmétologie, support fonctionnellement défini
- *au moins un agent actif* — formulation ouverte (n'empêche pas plusieurs actifs)
- *extrait de Camellia sinensis* — caractéristique distinctive #1 (matière première spécifique)
- *0,5 à 5 % en masse* — plage numérique bornée (à supporter par exemples chiffrés dans la description)
- *pH compris entre 5,0 et 6,5* — caractéristique distinctive #2 (paramètre physico-chimique)

### 2. Revendication de procédé

> **1.** Procédé de fabrication d'une membrane polymère de filtration,
> comprenant les étapes consistant à (a) préparer une solution de polymère
> dans un solvant organique, (b) couler ladite solution sur un substrat
> poreux, (c) immerger l'ensemble dans un bain de coagulation aqueux,
> **caractérisé en ce que** l'étape (c) est conduite à une température
> comprise entre 4 et 12 °C et en ce que le bain de coagulation contient
> un additif osmotique à une concentration de 5 à 15 g/L.

**Analyse :**
- Préambule reprend la séquence procédé connue (étapes a, b, c étant des opérations classiques de fabrication de membranes par séparation de phase)
- Partie caractérisante introduit deux paramètres opératoires distinctifs (température basse + additif osmotique)
- L'étape (c) est référencée par sa lettre — renvoi univoque
- Plages numériques bornées, à ancrer par exemples dans la description

### 3. Revendication de dispositif

> **1.** Dispositif médical implantable de mesure de glycémie en continu,
> comprenant un capteur électrochimique (10) et un module de transmission
> sans fil (20) reliés par une liaison filaire (15), **caractérisé en ce
> que** le capteur (10) comprend une enzyme glucose-oxydase encapsulée
> dans une matrice de polymère biocompatible présentant une porosité
> comprise entre 100 et 500 nm, et en ce que le module (20) est configuré
> pour transmettre les données mesurées par protocole Bluetooth Low Energy
> avec une cadence d'au moins une mesure toutes les 5 minutes.

**Analyse :**
- Références numériques (10, 20, 15) renvoient aux dessins
- Combinaison structurelle (capteur + module + liaison) + caractéristiques fonctionnelles (enzyme encapsulée + protocole BLE + cadence)
- "configuré pour" — formulation courante pour caractériser une fonction sans figer l'implémentation matérielle

### 4. Revendication d'utilisation

> **1.** Utilisation d'un composé de formule (I)
>
> [formule développée]
>
> pour la fabrication d'une composition pharmaceutique destinée au
> traitement du diabète de type 2.

**Analyse :**
- Format "swiss-type claim" (utilisation d'un composé connu pour une nouvelle indication thérapeutique)
- Recevable en Europe (T-208/88 *Bayer*, codifié Art. 54(5) CBE 2000)
- **Plus restrictif aux USA** — préférer la formulation "method of treating" qui pose ses propres problèmes (exclusion méthode thérapeutique)
- Le composé peut être connu en soi ; la nouveauté tient à la nouvelle indication

### 5. Revendication de combinaison produit-par-procédé

> **1.** Polymère obtenu par le procédé selon la revendication X,
> **caractérisé en ce qu'**il présente une distribution de masse molaire
> avec un indice de polymolécularité inférieur à 1,3 et une cristallinité
> mesurée par DSC supérieure à 60 %.

**Analyse :**
- Catégorie hybride, acceptée par l'OEB avec parcimonie (T-150/82)
- Exige démonstration que le produit ne peut être caractérisé
  structurellement de manière satisfaisante par d'autres moyens
- En pratique : chimie complexe, biotech (anticorps, protéines), matériaux
  composites
- Combine caractérisation par procédé + paramètres physico-chimiques
  mesurables

---

## Erreurs récurrentes à éviter

| Erreur | Exemple incorrect | Correction |
|---|---|---|
| Terminologie imprécise | "à une température environ ambiante" | "à une température comprise entre 18 et 25 °C" |
| Marque ou nom commercial | "fibre de Kevlar®" | "fibre d'aramide para-substituée" |
| Caractéristique non essentielle dans rev. 1 | "...comprenant en outre une étiquette d'identification de couleur rouge" | retirer (sauf si la couleur résout le problème technique) |
| Plage sans support exemple | rev. revendique 5-50 %, description ne donne qu'un exemple à 20 % | ajouter des exemples à 5 %, à 50 %, voire intermédiaires |
| Terme relatif absolu | "présentant une efficacité optimale" | "présentant un rendement supérieur à 85 %" |
| Mélange de catégories | "dispositif comprenant ... et procédé de fabrication consistant à ..." | rédiger deux revendications indépendantes distinctes |
| Renvoi multiple en cascade USPTO | rev. 5 dépendante de "l'une des revendications 1 à 4" | acceptable EP, surtaxé US — préférer renvoi simple si visée USPTO |
| Caractéristique absente de la description | "...contenant un additif stabilisant" sans aucun additif décrit | ajouter la matière dans la description avant dépôt (impossible après) |

---

## Hiérarchie des revendications dépendantes — filet de sécurité

Stratégie pyramidale :

```
Rev. 1 (indépendante)  ← portée la plus large
    Rev. 2 (variante de structure)
        Rev. 3 (plage numérique préférée)
            Rev. 4 (plage numérique très préférée)
    Rev. 5 (mode de réalisation alternatif)
        Rev. 6 (variante)
Rev. 7 (indépendante de catégorie différente — ex. procédé si rev. 1 = produit)
    Rev. 8 (dépendante de rev. 7)
    ...
```

Si la rev. 1 est annulée pour antériorité, la rev. 2 peut survivre, puis
rev. 3 plus étroite encore. Sans dépendantes, l'annulation de rev. 1 fait
tomber l'ensemble de la protection.

**Règle pratique :** prévoir au moins **3 à 5 revendications dépendantes
échelonnées** sous chaque revendication indépendante, ancrées par des
exemples chiffrés dans la description.

---

## Articles CPI et CBE clés

| Référence | Objet |
|---|---|
| **CPI L.611-1** | Éléments constitutifs de la demande, exigence de support des revendications par la description |
| **CPI L.611-10** | Exclusions de brevetabilité (cf. `recherche-anteriorite-brevet`) |
| **CPI L.611-11** | Définition de la nouveauté |
| **CPI L.611-14** | Activité inventive |
| **CPI L.611-15** | Application industrielle |
| **CPI L.612-4** | Unité d'invention (un seul concept inventif général) |
| **CPI L.612-5** | Suffisance de description (homme du métier doit pouvoir exécuter) |
| **CPI L.612-6** | Interdiction de l'extension au-delà du contenu initial |
| **Art. 78 CBE** | Éléments constitutifs de la demande européenne |
| **Art. 82 CBE** | Unité d'invention (Règle 44 CBE pour l'examen) |
| **Art. 83 CBE** | Suffisance de description |
| **Art. 84 CBE** | Clarté et support des revendications |
| **Art. 123(2) CBE** | Non-extension de l'objet en cours de procédure |
| **Règle 43 CBE** | Forme et contenu des revendications (style à deux parties) |

---

## Différences EU vs US — points pratiques

| Aspect | OEB (CBE) | USPTO |
|---|---|---|
| Style à deux parties (préambule + caractérisant) | Recommandé Règle 43(1) CBE | Optionnel, *Jepson claims* peu utilisées |
| Nombre revendications "gratuites" | 15 avant taxe par revendication | 3 indépendantes / 20 totales avant taxe |
| Revendication d'utilisation thérapeutique | Acceptée (Art. 54(5) CBE 2000) | Convertir en "method of treatment" (mais exclusion médicale) |
| Revendications multiples-dépendantes en cascade | Acceptées | Surtaxées (~$480 par cascade en 2024) |
| Caractérisation produit-par-procédé | Acceptée avec parcimonie | Acceptée mais portée limitée au procédé décrit |
| Best mode requirement | Pas d'exigence formelle | Exigence formelle (35 USC §112) — décrire le meilleur mode connu |

Pour un dépôt PCT visant entrée en phase nationale aux États-Unis, rédiger
d'emblée avec ces contraintes (les amendements en phase nationale sont
encadrés par la non-extension).

---

## Validation amont indispensable

**Avant de figer les revendications, valider l'absence d'antériorité X
destructrice** via `/h-pi:recherche-anteriorite-brevet`.
Une revendication 1 large rédigée sans connaître l'art antérieur est dans
le meilleur des cas reformulée en cours d'examen (au prix d'une réduction
de portée), dans le pire des cas refusée et publiée à 18 mois (divulgation
sans protection).

La séquence saine est : **recherche antériorité d'abord** → **rédaction
des revendications calibrées sur l'art antérieur identifié** → **dépôt par
mandataire**.
