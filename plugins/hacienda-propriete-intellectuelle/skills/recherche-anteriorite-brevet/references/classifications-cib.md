# Classification Internationale des Brevets (CIB) — Référence rapide

La **CIB** (en anglais IPC, *International Patent Classification*) a été
établie par l'**Arrangement de Strasbourg du 24 mars 1971** sous l'égide de
l'**OMPI**. Elle est révisée annuellement (édition en vigueur à la date de
publication d'un document). Elle est utilisée par plus de 100 offices
nationaux et régionaux, dont l'INPI, l'OEB, l'USPTO (en complément de la
CPC) et l'OMPI pour les dépôts PCT.

## Hiérarchie

La CIB est strictement hiérarchique, du plus large au plus précis :

```
Section    > Classe    > Sous-classe > Groupe principal > Sous-groupe
A (lettre)   01 (2 chiffres) B (lettre)   33/00 (chiffres)   33/02 (chiffres)
```

Exemple complet : **`A01B 33/02`** = Section A (Nécessités courantes),
Classe 01 (Agriculture), Sous-classe B (Travail du sol), Groupe principal
33/00 (machines avec organes mobiles), Sous-groupe 33/02 (à axes verticaux).

## Les 8 sections (A–H)

| Section | Libellé | Couverture |
|---|---|---|
| **A** | Nécessités courantes | Agriculture, alimentation, médical, sport, articles ménagers |
| **B** | Techniques industrielles, transports | Procédés industriels, machines-outils, transports, conditionnement |
| **C** | Chimie, métallurgie | Chimie organique et inorganique, polymères, biotechnologie, métallurgie |
| **D** | Textiles, papier | Fibres, filature, tissage, traitement papier |
| **E** | Constructions fixes | Bâtiment, génie civil, mines, routes, ponts |
| **F** | Mécanique, éclairage, chauffage, armement, sautage | Moteurs, pompes, machines à fluides, éclairage, armement |
| **G** | Physique | Instruments, mesure, optique, photographie, acoustique, informatique au sens dispositif/contrôle |
| **H** | Électricité | Production et distribution d'énergie électrique, électronique, télécommunications |

## Exemples de codes typiques par section

- **A61K 31/00** — Préparations médicinales contenant des composés organiques actifs
- **A61M 5/00** — Dispositifs d'injection (seringues, perfusion)
- **A23L 33/00** — Préparations alimentaires fonctionnelles ou enrichies
- **B01D 71/02** — Membranes de filtration en polymère
- **B60L 50/00** — Propulsion électrique de véhicules (batteries embarquées)
- **B65D 81/00** — Conditionnement avec protection contenu (anti-choc, isotherme)
- **C07D 471/00** — Composés hétérocycliques fusionnés (azote)
- **C08L 23/00** — Compositions de polyoléfines (polyéthylène, polypropylène)
- **C12N 15/00** — Génie génétique, ADN ou ARN recombinant
- **D06F 39/00** — Détails des machines à laver (capteurs, programmes)
- **E04B 1/00** — Constructions générales (murs, planchers, charpentes)
- **F01D 5/00** — Pales et rotors de turbines
- **F24F 3/00** — Systèmes de climatisation centralisée
- **G01N 33/00** — Recherche ou analyse de matériaux biologiques
- **G06F 9/00** — Dispositions pour la commande d'ordinateurs (systèmes d'exploitation)
- **G06N 3/00** — Architectures de calcul fondées sur des modèles biologiques (réseaux de neurones)
- **H01L 29/00** — Dispositifs semi-conducteurs adaptés au redressement, amplification
- **H04L 9/00** — Dispositions pour communications secrètes ou sécurisées
- **H04N 19/00** — Méthodes ou dispositions pour le codage vidéo

## Bonnes pratiques de recherche

1. **Commencer par la sous-classe la plus précise** identifiée — c'est
   l'unité de recherche habituelle dans Espacenet et INPI Data brevets.
2. **Élargir ensuite aux sous-classes voisines de la même classe.** Exemple :
   pour `B01D 71/02` (membranes polymère), élargir à `B01D 53` (séparation
   gaz), `B01D 61` (procédés membranaires), `B01D 67` (fabrication membranes).
3. **Attention aux applications cross-domaine.** Une innovation polymère
   (C08) peut apparaître en textiles (D), conditionnement (B65) ou médical
   (A61) selon l'usage revendiqué. Un brevet portant deux classifications
   CIB dans deux sections différentes est un signal fort.
4. **Tester les codes voisins de second rang.** Si `G06N 3/04` (modèles
   architecturaux de réseaux neuronaux) est le code principal, vérifier
   aussi `G06N 3/08` (méthodes d'apprentissage), `G06N 20/00` (apprentissage
   automatique général), `G06F 17/16` (calcul matriciel).
5. **Vérifier l'édition CIB applicable** — les classifications évoluent.
   Un brevet de 2003 est classé selon l'édition CIB 2003 ; chercher dans
   Espacenet d'anciennes éditions peut nécessiter d'identifier les codes
   équivalents (concordance disponible sur le site OMPI).

## Si la CIB n'est pas certaine

Quand on n'est pas certain du code CIB :

1. Lancer `inpi_search_brevets({ query: "<mots-clés techniques>", limite: 30 })`
   ou `espacenet_search({ query: "<mots-clés>", limite: 30 })` en query libre.
2. Inspecter les CIB principales et secondaires des 10-20 premiers résultats
   pertinents.
3. Identifier les codes récurrents → ce sont les CIB à utiliser pour la
   recherche ciblée.
4. Confirmer auprès du mandataire en brevets : la classification définitive
   à mentionner dans la demande sera attribuée par l'examinateur de l'office,
   mais une CIB cohérente dans le dossier de dépôt facilite l'examen.

## Lien avec les outils Hacienda

- **`inpi_search_brevets({ classificationCIB })`** accepte un ou plusieurs
  codes CIB (section + classe + sous-classe + groupe) pour filtrer les
  résultats sur la base FR/EP nationale.
- **`espacenet_search({ cib })`** accepte les codes CIB pour interroger la
  couverture mondiale (160M+ documents).
- Les codes **CPC (Cooperative Patent Classification)**, plus granulaires
  et utilisés conjointement par l'OEB et l'USPTO, ne sont pas couverts par
  ces tools en V2.0 — passage manuel via Espacenet web si granularité fine
  requise.

## Référence officielle

- **Publication OMPI** : https://www.wipo.int/classifications/ipc/
- **Concordance CIB ↔ CPC** : disponible sur le site OEB
- **Recherche en français** : la CIB est publiée en français et anglais
  (versions officielles) ; les libellés français sont la référence pour
  les dépôts INPI.
