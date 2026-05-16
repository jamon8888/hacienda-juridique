# Motifs de nullité d'un brevet (CPI L.613-25) — référence détaillée

Référence interne au skill `anteriorite-invalidite`. Détaille les 5
motifs de nullité avec exemples concrets par domaine technique,
jurisprudence pertinente, équivalents CBE et erreurs courantes.

> **Note de fraîcheur.** Toute citation jurisprudentielle ci-dessous
> est taguée `[connaissance modèle — à vérifier]` par défaut.
> **Vérifier sur Légifrance (Cour de cass.) et sur la base
> jurisprudentielle TJ Paris avant toute transmission externe**
> (assignation, écriture déposée, brief client).

---

## L.613-25 a) — Défaut de brevetabilité

### a.1 — Exclusions L.611-10 CPI

L'invention doit relever du **domaine technique brevetable**.
Exclusions strictes :

- **Découvertes, théories scientifiques, méthodes mathématiques** :
  ex. nouvelle équation, loi physique nouvellement observée. Le
  produit dérivé concret (machine implémentant la théorie) peut
  rester brevetable
- **Créations esthétiques** : forme purement décorative — relève du
  dessin et modèle ou du droit d'auteur, pas du brevet
- **Plans, principes, méthodes pour l'exercice d'activités
  intellectuelles, économiques ou de jeux** : ex. méthode comptable,
  règle de jeu de société, méthode de gestion
- **Programmes d'ordinateur "en tant que tels"** : MAIS l'invention
  mise en œuvre par ordinateur (`Computer-Implemented Invention`) qui
  produit un **effet technique supplémentaire** au-delà de
  l'interaction normale logiciel-machine reste brevetable
  (jurisprudence OEB G 3/08 — Grande Chambre)
- **Présentations d'informations** (en tant que telles)
- **Méthodes de traitement chirurgical, thérapeutique ou de
  diagnostic** appliquées au corps humain ou animal — MAIS les
  produits (médicaments, dispositifs médicaux) restent brevetables.
  Voir CJUE *Brüstle* C-34/10 sur l'extension aux cellules souches
  embryonnaires

**Exemples par domaine** :

- **Logiciel** : un algorithme de tri "en tant que tel" non brevetable.
  Un algorithme de tri optimisant l'usage CPU dans un système embarqué
  contraint (effet technique) brevetable
- **Pharma** : la méthode de traitement "administrer X au patient
  selon Y" non brevetable. Le produit X dans une formulation
  pharmaceutique nouvelle reste brevetable
- **Fintech** : algorithme de scoring crédit "en tant que tel" non
  brevetable. Un système de cryptographie sous-jacent brevetable

### a.2 — Défaut de nouveauté L.611-11 CPI

L'invention est nouvelle si elle n'est pas comprise dans l'**état
de la technique** — défini comme tout ce qui a été rendu accessible
au public par une description écrite ou orale, un usage ou tout autre
moyen, avant la date de dépôt du brevet (ou date de priorité).

**Test "all features"** : une seule citation X doit divulguer
**TOUTES** les caractéristiques d'une revendication, **directement et
sans ambiguïté**, telles que comprises par l'homme du métier. Pas de
combinaison de plusieurs documents pour la nouveauté (réservé à
l'activité inventive).

**Pièges fréquents** :

- **Date publication ≠ date impression** — vérifier la date à laquelle
  le document a été effectivement accessible au public
- **Divulgation implicite** : si l'art antérieur enseigne A et que B
  en découle inéluctablement pour l'homme du métier, B est aussi
  divulgué (jurisprudence OEB constante)
- **Sélections** : un brevet qui sélectionne un sous-ensemble d'un
  ensemble plus large déjà divulgué peut être nouveau s'il satisfait
  les critères stricts de la "sélection" (étroitesse, distance par
  rapport aux exemples, effet technique propre)

### a.3 — Défaut d'application industrielle L.611-15

Rarement motif unique. Cas typiques :

- Perpetual motion machines (mouvement perpétuel — exclu pour défaut
  d'application industrielle ET pour défaut de suffisance)
- Séquences ADN ou protéines isolées dont la **fonction biologique
  n'est pas identifiée** dans la description (jurisprudence OEB T 870/04
  *icos / Seven Transmembrane Receptor*)

### a.4 — Défaut d'activité inventive (Art. 56 CBE équivalent)

Motif implicite L.613-25 a) — l'invention ne doit pas découler de
manière évidente de l'état de la technique pour l'homme du métier.

**Cadre problème-solution OEB appliqué à l'inverse** (voir SKILL.md
section dédiée) :

1. Closest prior art
2. Caractéristiques distinctives
3. Problème technique objectif
4. Démonstration de l'évidence par combinaison Y + Y

**Exemples jurisprudentiels marquants** :

- TJ Paris 3e ch. 1re sect., 28 sept. 2023 (RG 21/15234 — non vérifié)
  sur défaut d'activité inventive en pharma (analogie structurale
  prévisible) `[connaissance modèle — à vérifier]`
- Cour de cass. com. 5 mai 2009 n°08-13.586 (équivalence — pertinent
  pour mode `--defense` non-équivalence)

---

## L.613-25 b) — Défaut de suffisance de description (L.612-5)

**Exemples par domaine technique** :

### Pharma / biotech

Domaine le plus pourvoyeur de nullité pour insuffisance. Standard
"plausibility" développé par jurisprudence OEB et reprise TJ Paris
depuis ~2015 :

- L'effet thérapeutique allégué doit être **plausible** à la lecture
  de la description (données pré-cliniques, modèles in vitro, etc.)
- Si la description ne contient que des assertions sans support
  expérimental, le brevet peut être annulé pour insuffisance
- Référence : **OEB T 488/16** (`Dasatinib`) — révocation pour défaut
  de plausibilité de l'activité anti-tumorale
- Référence : **OEB G 2/21** (Grande Chambre) sur l'admissibilité
  de preuves post-priorité — limites strictes

### Biotech

- Protocoles de production de cellules souches sans paramètres
  reproductibles
- Séquences ADN sans fonction identifiée
- Anticorps monoclonaux sans caractérisation suffisante

### Logiciel embarqué / IA

- Algorithme abstrait sans implémentation concrète
- Réseau de neurones sans architecture, hyperparamètres, dataset
  d'entraînement
- Référence : OEB G 1/19 (`Pedestrian simulation`) sur le caractère
  technique des simulations numériques

### Chimie de synthèse

- Voie de synthèse non reproductible (réactifs sans CAS,
  températures absentes)
- Rendements allégués non démontrés
- Référence : OEB T 226/85, T 409/91 sur le standard de
  reproductibilité par l'homme du métier

---

## L.613-25 c) — Extension portée au-delà demande initiale (L.612-6)

Équivalent **Art. 123(2) EPC**.

### Cas typiques

- **Terme ajouté pendant examen** sans support dans la demande
  initiale. Ex : la description initiale dit "5 nm" et "50 nm" comme
  bornes ; la revendication délivrée dit "5-100 nm" (extension
  au-delà de 50 nm non supportée)
- **Généralisation intermédiaire** : extraction sélective d'une
  caractéristique d'un mode de réalisation spécifique pour l'isoler
  de son contexte. Ex : exemple 3 décrit "polymère X + agent Y + pH
  acide" ; revendication 1 délivrée n'isole que "polymère X + pH
  acide" en supprimant l'agent Y — généralisation intermédiaire
  prohibée si l'agent Y était essentiel au mode de réalisation
- **Disclaimer non divulgué** : exclusion ajoutée pour contourner un
  art antérieur, admissible seulement sous conditions strictes (OEB
  G 1/03, G 2/03, G 2/10)

### Jurisprudence clé

- **OEB G 1/93** — règle de l'*inescapable trap* : si caractéristique
  ajoutée pendant examen viole Art. 123(2) MAIS la supprimer
  violerait Art. 123(3) (élargissement post-grant interdit), le
  brevet doit être révoqué
- **OEB G 2/10** — disclaimer non divulgué admissible si pour
  rétablir nouveauté contre Art. 54(3) ou exclure objet non
  brevetable, et si l'objet restant est divulgué
- **TJ Paris constant** — généralisation intermédiaire = motif
  fréquent de nullité partielle (la revendication problématique est
  annulée, les autres maintenues)

---

## L.613-25 d) — Défaut d'unité (L.612-4)

**Motif faible** rarement invoqué seul. Voir SKILL.md.

Sanction principalement en prosecution (division en `divisional` via
demandes divisionnaires CPI R.612-33). Une fois le brevet délivré, la
nullité pour défaut d'unité reste théoriquement possible mais peu
utilisée en pratique judiciaire — plutôt argument annexe.

---

## L.613-25 e) — Défaut de qualité du déposant

### Cas typiques

- **Cessions de droits incomplètes** : chaîne interrompue (un
  cessionnaire intermédiaire n'a pas régularisé la cession aval),
  absence de signature, défaut d'inscription au Registre National
  des Brevets (CPI L.613-9 — opposabilité aux tiers conditionnée par
  inscription)
- **M&A non régularisée** : fusion-absorption, apport partiel d'actif,
  scission — vérifier que les brevets ont été listés dans le traité
  d'apport / fusion et que l'inscription RNB a été effectuée
- **Invention de salarié L.611-7 CPI** :
  - Invention de **mission** (effectuée dans le cadre du contrat de
    travail avec mission inventive explicite) → propriété employeur
    avec contrepartie financière obligatoire
  - Invention **hors mission attribuable** (effectuée pendant
    l'exécution des fonctions, dans le domaine d'activité de
    l'entreprise, avec moyens de l'entreprise) → attribution à
    l'employeur sous conditions strictes contre juste prix
  - Invention **hors mission non attribuable** → propriété du
    salarié
  - **Mauvaise qualification** = nullité du dépôt par l'employeur
    (le vrai propriétaire est le salarié)

L'action en **revendication de propriété** (CPI L.611-8) est
distincte de l'action en nullité L.613-25 e) — elles peuvent être
cumulées dans le même contentieux. La revendication est souvent
préférable car elle transfère le brevet au vrai propriétaire au lieu
de l'annuler.

---

## Articles CBE équivalents (synthèse)

| CPI | CBE | Objet |
|---|---|---|
| L.611-10 | Art. 52 | Inventions brevetables — exclusions |
| L.611-11 | Art. 54 | Nouveauté |
| L.611-15 | Art. 57 | Application industrielle |
| L.612-4 | Art. 82 | Unité d'invention |
| L.612-5 | Art. 83 | Suffisance description |
| L.612-6 | Art. 123(2) | Pas d'extension portée |
| (implicite) | Art. 56 | Activité inventive |
| (post-grant) | Art. 123(3) | Pas d'élargissement post-délivrance |

---

## Erreurs courantes

- **Confondre nullité totale vs partielle** — le TJ Paris peut
  prononcer l'une ou l'autre selon les revendications attaquées et la
  solidité des motifs sur chacune. Demander explicitement les deux
  dans le dispositif (principal totale, subsidiaire partielle)
- **Oublier la défense reconventionnelle** en mode `--defense` —
  perdre cette opportunité = nullité ne pourra plus être invoquée en
  appel ou ailleurs avec autorité de la chose jugée. Toujours
  greffer la demande reconventionnelle dès les premières conclusions
- **Sous-estimer la charge de la preuve** — le brevet est **présumé
  valide** (L.611-2 CPI). L'attaquant doit démontrer chaque motif au-delà
  du doute raisonnable. Une seule citation X solide vaut mieux que
  10 citations Y douteuses
- **Ignorer la fenêtre 20 ans** — l'action devient sans objet
  pratique post-expiration brevet (sauf contentieux passés)
- **Citer une jurisprudence non vérifiée** — toute décision TJ Paris
  ou Cour de cass. citée doit être vérifiée sur Légifrance avant
  dépôt d'écriture. Une citation fabriquée = sanction disciplinaire
  pour l'avocat + crédibilité dossier détruite
- **Combiner trop de documents Y** — au-delà de 3 documents combinés,
  le juge soupçonne un *hindsight bias* (reconstruction a posteriori
  de l'invention à partir de fragments). Privilégier closest prior
  art + 1 document de secondaire combiné

---

## Liens skills

- **`tableau-contrefacon-brevet` V2.0** — offensive contrefaçon
  (inverse de ce skill). Si mode `--defense`, lancer en parallèle
  pour évaluer la solidité de la contrefaçon alléguée par
  l'adversaire avant de structurer la défense
- **`recherche-anteriorite-brevet` V2.0** — méthodologie recherche
  prior art. Utilisable pour la phase de recherche d'art antérieur
  destructeur (mêmes bases : Espacenet, INPI Brevets)
- **`analyse-refus-inpi` V2.1** — cadre OEB problème-solution
  réutilisé (à l'inverse ici)
- **`mise-en-demeure-pi`** — pour préparer une mise en demeure
  préalable au titulaire du brevet attaqué (sommation de retrait du
  brevet ou de licence amiable) avant assignation TJ Paris
- **`strategie-defense-pi`** — vue d'ensemble stratégique défense PI
  multi-fronts
