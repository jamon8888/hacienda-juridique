---
name: preparation-depot-brevet
description: >
  Aide à la préparation d'un dossier de dépôt brevet (FR national, EP via OEB,
  ou PCT). Structure description, revendications (indépendantes + dépendantes),
  abrégé, conformément à CPI L.611-1 et Règlement CBE / PCT. NE dépose PAS —
  la décision, la rédaction finale et le dépôt formel restent au mandataire
  en brevets (EQE) ou à l'avocat. Brouillon technique d'aide à la rédaction.
argument-hint: "[description invention | classes CIB | territoire FR/EP/PCT]"
---

# /preparation-depot-brevet

**Préparation ≠ dépôt.** Ce skill produit un **brouillon technique** structuré
pour aider le mandataire en brevets ou l'avocat. Il NE rédige PAS le brevet
final, NE choisit PAS les revendications définitives, NE dépose PAS auprès de
l'INPI / OEB / WIPO. La rédaction des revendications est une **discipline
technico-juridique** où chaque mot a une conséquence sur 20 ans de protection
ou de contestabilité. **Un brevet mal rédigé est invalidable en contentieux.**

## Examples

```
/hacienda-propriete-intellectuelle:preparation-depot-brevet "Procédé de filtration membranaire à base de polymère greffé X — CIB B01D 71/02 — FR + EP"
```

```
/hacienda-propriete-intellectuelle:preparation-depot-brevet "Dispositif médical implantable mesure glycémie continue — CIB A61B 5/145 — PCT"
```

```
/hacienda-propriete-intellectuelle:preparation-depot-brevet
```

(Le skill demandera la description fonctionnelle, le domaine technique, les
modes de réalisation, l'art antérieur connu, les territoires cibles, la date
de divulgation prévue, et l'identité de l'inventeur et du déposant.)

---

## PRÉPARATION TECHNIQUE, PAS RÉDACTION FINALE

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Préparation technique, pas rédaction finale.** Ce brouillon est une
> ossature de dossier de dépôt brevet (description structurée selon CPI
> L.611-1, revendications candidates, abrégé, classification CIB indicative,
> territoire envisagé). Il NE remplace PAS la rédaction par un **mandataire
> en brevets** inscrit à l'OEB (qualifié EQE) ou un **avocat spécialisé en
> propriété industrielle**. La rédaction des revendications, en particulier,
> est une discipline où chaque mot pèse sur 20 ans de protection. Un terme
> trop large rend la revendication attaquable pour insuffisance de
> description ou défaut de nouveauté ; un terme trop étroit donne une
> protection facile à contourner. **Un brevet mal rédigé est invalidable en
> contentieux** — et la rectification post-délivrance est encadrée (Art. 123
> CBE, L.613-24 CPI) avec interdiction d'extension de l'objet. Ce skill
> propose ; le mandataire décide, rédige et dépose.

C'est le garde-fou le plus visible du skill. Une revendication trop large
finalisée sans relecture = porte à sens unique (refus, ou délivrance avec
brevet vulnérable). Sur-flagger = porte à 2 sens, le mandataire élague.
Rester sur la porte à 2 sens.

---

## Charger le profil pratique avant de commencer

Avant tout, lire :
1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Récupérer :
- **Rôle** depuis `## 1. Profil cabinet et profil de pratique PI` (avocat
  inscrit / mandataire en brevets EQE / mandataire en marques INPI / juriste
  interne / non-juriste — change l'en-tête confidentialité ET la formulation
  des avertissements en pied de brouillon).
- **Juridictions et offices d'inscription** (INPI, OEB, OMPI/PCT) → défaut
  territoires si l'utilisateur n'en spécifie pas.
- **Domaines techniques principaux** (mécanique / chimie / pharma / biotech /
  informatique / électronique / télécom) → pondère la formulation du domaine
  technique de la description et la sélection de la CIB.
- **Mandataire en brevets associé** (depuis la table mandataires externes du
  profil) → identifié explicitement dans la section "Étapes suivantes" et
  dans le brief gate non-juriste.
- **Posture enforcement** par défaut → calibre la largeur initiale de la
  revendication indépendante (agressive = revendication la plus large
  défendable ; conservatrice = revendication étroite et solide).
- **Matrice d'approbateurs** pour les escalades de validation pré-dépôt.

Si le profil contient `[A CONFIGURER]`, surfacer :

> Le profil pratique n'est pas configuré — c'est ce qui adapte le territoire
> par défaut, les domaines techniques, le mandataire en brevets associé et
> la chaîne d'approbation à votre cabinet ou service.
>
> **Deux choix :**
> - Lancer `/hacienda-propriete-intellectuelle:entretien-demarrage` (10-15 min)
> - Dire **"provisoire"** et je lance avec les défauts génériques (rôle
>   avocat, FR + EP, posture mesurée, domaines techniques tous, sans
>   mandataire pré-désigné) — chaque sortie sera taggée `[PROVISOIRE —
>   configurer le profil pour une sortie sur mesure]`.

### Mode provisoire

Si l'utilisateur dit "provisoire", lancer normalement avec : posture mesurée,
rôle avocat, FR + EP, domaines techniques tous, pas de mandataire désigné.
Tagger la note du relecteur et chaque finding `[PROVISOIRE]`. À la fin,
ajouter :

> "C'était un run générique avec les hypothèses par défaut. Lancer
> `/hacienda-propriete-intellectuelle:entretien-demarrage` pour calibrer sur
> VOTRE pratique — votre mandataire en brevets associé, vos juridictions de
> dépôt usuelles, vos domaines techniques."

---

## Intake

Demander en un seul batch (pas de jeu de questions à rallonge) :

> Quelques questions avant de structurer le dossier de dépôt :
>
> 1. **Description fonctionnelle de l'invention.** Le **problème technique**
>    résolu + la **solution** apportée, en 3-5 phrases. Pas le pitch
>    commercial — la substance technique : quelles entrées, quel traitement,
>    quelles sorties, quel effet technique mesurable.
> 2. **Domaine technique + classification CIB probable.** Si la CIB est
>    connue (ex. `B01D 71/02`, `A61B 5/145`), la fournir. Sinon décrire le
>    domaine et je proposerai les codes hiérarchiques — tu confirmes.
> 3. **Mode(s) de réalisation envisagé(s).** Au moins un, idéalement 2-3
>    variantes. Plus tu fournis de modes, plus la description est solide
>    (suffisance de description — L.612-5 CPI) et plus la matière à
>    revendications dépendantes est riche.
> 4. **Art antérieur connu de l'inventeur.** Publications, brevets,
>    produits, thèses, conférences déjà identifiés. La distinction se
>    formule par rapport à ce qui existe — sans connaître l'art antérieur,
>    la revendication 1 sera soit trop large (couvrant l'existant), soit
>    trop étroite (par sur-précaution). Si pas de recherche faite, je
>    recommanderai `/recherche-anteriorite-brevet` avant de figer.
> 5. **Territoires cibles prioritaires.** FR national (INPI) / EP (OEB
>    désignant FR + UE) / PCT international (phase nationale à 30 mois).
>    Défaut depuis le profil. Le choix territoire conditionne la stratégie
>    (priorité de l'Union de Paris à 12 mois, taxes, langue de procédure).
> 6. **Date de divulgation publique** envisagée ou déjà eue. **Critique** :
>    toute divulgation antérieure au dépôt détruit la nouveauté (L.611-11
>    CPI, Art. 54 CBE), sauf délai de grâce limité (L.611-13 CPI : 6 mois
>    pour abus évident ou exposition officielle reconnue). Une démo
>    publique, une publication scientifique, un communiqué de presse, une
>    présentation à un investisseur sans NDA — tout ceci compte.
> 7. **Inventeur(s) et déposant.** Les inventeurs (personnes physiques) et
>    le déposant (personne morale ou physique) sont distincts. Si l'invention
>    a été faite par un salarié, vérifier le régime de l'invention de
>    salarié (L.611-7 CPI) : invention de mission, hors mission attribuable,
>    hors mission non attribuable — chacun a un régime distinct de cession
>    et de rémunération supplémentaire. Sans cession claire, le dépôt par
>    l'employeur peut être contesté en revendication de propriété.

Attendre la réponse. Si la **description fonctionnelle est vague** (< 50
mots, "appli IA", "nouveau matériau" sans précision), pousser une fois :

> Donne ce que l'invention fait techniquement — quelles entrées, quel
> traitement, quelles sorties, quel effet technique mesurable, et en quoi
> ça résout un problème objectif que l'état antérieur de la technique ne
> résout pas. La description du brevet et la revendication indépendante en
> dépendent directement. Sans précision technique, le brouillon sera soit
> creux (description insuffisante au sens L.612-5), soit purement
> spéculatif (revendications non supportées au sens L.611-1).

---

## Structure du dossier de dépôt (CPI L.611-1)

L'article L.611-1 du Code de la propriété intellectuelle (transposition Art.
78 CBE et Règle 41-43 du Règlement d'exécution CBE) fixe les éléments
constitutifs d'une demande de brevet : **titre** + **description** +
**revendications** + **abrégé** + **dessins** (si applicable). Chaque
élément a des contraintes formelles et de fond. Un défaut formel est en
général régularisable ; un défaut de fond (suffisance, support, non-extension)
est souvent fatal en cours de procédure ou en contentieux ultérieur.

### Titre

- **Concis**, idéalement ≤ 15 mots.
- **Sans terme commercial**, sans nom de marque, sans superlatif ("nouveau",
  "amélioré", "révolutionnaire" — interdits par les directives OEB).
- Indique le **domaine technique général** + l'**objet** de l'invention.
- Sert à l'indexation des bases brevets et à la première lecture par
  l'examinateur.

Exemples :
- ✓ "Procédé de filtration d'eau utilisant une membrane à base de graphène"
- ✓ "Dispositif implantable de mesure de la glycémie en continu"
- ✗ "SuperFilter™ — la nouvelle génération de filtration" (marque + superlatif)
- ✗ "Filtre" (trop générique)

### Description (sections normalisées CPI L.611-1 + Règle 42 CBE)

La description est l'élément qui **fonde** les revendications. Une
revendication non supportée par la description est invalide (L.611-1 CPI,
Art. 84 CBE). Inversement, une description riche en modes de réalisation
ouvre la voie à des revendications dépendantes nombreuses et à des
amendements possibles en cours d'examen (dans la limite de la
non-extension : L.612-6 CPI, Art. 123(2) CBE).

Structure normalisée en 7 sections :

1. **Introduction** — domaine technique général de l'invention. 1 à 3
   phrases situant l'invention dans son secteur (ex. "L'invention se
   rapporte aux procédés de filtration d'eau par membrane polymère").

2. **État antérieur de la technique** — exposer ce qui existe, ses limites
   identifiées, et **citer les documents pertinents** (FR, EP, US, autres).
   Les citations qualifient le déposant comme connaissant l'art antérieur
   (D-citations dans le rapport de recherche futur). Discuter les
   limitations : ce qui ne marche pas, ce qui marche mal, ce qui coûte
   cher, ce qui ne fonctionne que pour certaines conditions.

3. **Problème technique** — formuler le **problème objectif** que
   l'invention résout. Pas le pitch commercial ("offrir une solution
   innovante") mais la formulation technique objective ("améliorer le flux
   de perméation tout en réduisant le colmatage par matière organique").
   Ce problème servira à l'argumentation activité inventive (approche
   problème-solution OEB).

4. **Exposé de l'invention** — solution apportée, en termes généraux. Cette
   section reflète la **revendication 1** (revendication indépendante)
   reformulée en prose. Mentionner les avantages techniques majeurs (gain
   mesurable, simplification, économie de ressource).

5. **Brève description des figures** (si dessins fournis) — numérotation
   cohérente : `La Fig. 1 représente une vue en coupe du dispositif`, `La
   Fig. 2 illustre le profil de perméation en fonction du temps`, etc.

6. **Description détaillée d'au moins un mode de réalisation** — c'est ici
   que la **suffisance de description** (L.612-5 CPI, Art. 83 CBE) est
   établie. L'homme du métier doit pouvoir **exécuter l'invention** sans
   effort excessif ni recherche inventive. Décrire :
   - les éléments structurels avec leurs références numérotées (renvois
     vers les figures) ;
   - les matériaux, dimensions, paramètres opératoires lorsqu'ils sont
     essentiels ;
   - les étapes de procédé dans l'ordre ;
   - les variantes décrites comme "selon une variante", "selon un mode
     préféré" — chaque variante peut nourrir une revendication dépendante.

7. **Exemples** (chimie, biotech, matériaux, pharmacie surtout) — exemples
   chiffrés avec conditions opératoires précises (températures, pressions,
   concentrations, durées, mesures), résultats observés. Les exemples
   ancrent les plages numériques revendiquées. Une plage numérique sans
   exemple chiffré dans la plage est attaquable pour insuffisance
   (jurisprudence OEB constante : T-409/91 *Exxon*, T-435/91 *Unilever*).

### Revendications (CPI L.611-1, Art. 84 CBE, Règle 43 CBE)

Le cœur juridique du brevet. Ce qui n'est pas dans une revendication n'est
pas protégé — la description fonde, mais la revendication délimite.

- **Au moins une revendication indépendante** — la protection la plus
  large que l'invention puisse soutenir. Contient toutes les
  caractéristiques techniques **essentielles** (celles sans lesquelles
  l'invention ne résout pas le problème).
- **Revendications dépendantes** — variantes, modes de réalisation
  préférés, plages préférées, combinaisons. Forment le **filet de
  sécurité** : si la revendication 1 est annulée pour antériorité
  inattendue, une revendication dépendante plus étroite peut survivre.
- **Structure normalisée** (style à deux parties, recommandé OEB Règle
  43(1) CBE) : `Préambule + caractérisé en ce que + caractéristique
  distinctive` :
  - **Préambule** = état de la technique le plus proche + caractéristiques
    déjà connues.
  - **Partie caractérisante** ("caractérisé en ce que") = ce qui est
    **nouveau et inventif** par rapport au préambule.
- **Numérotation séquentielle** + renvois explicites (`la revendication X`,
  `selon l'une des revendications X à Y`, `selon l'une quelconque des
  revendications précédentes`).
- **Cohérence avec la description** : chaque caractéristique revendiquée
  doit trouver son **support** dans la description (L.611-1 CPI, Art. 84
  CBE). Une revendication qui introduit un terme absent de la description
  ou non illustré par un mode de réalisation est attaquable.

Détail rédactionnel et exemples : voir `references/structure-revendications.md`.

### Abrégé (CPI L.612-2, Règle 47 CBE)

- ≤ **150 mots** / ≤ **1500 caractères** (la pratique OEB tolère
  légèrement plus, INPI est strict).
- Résume **description + revendication principale** en un paragraphe.
- **Pas d'effets commerciaux**, pas de superlatifs, pas de marques.
- Sert à l'**indexation** par les bases brevets (Espacenet, INPI Data,
  Google Patents). C'est ce que liront les chercheurs d'antériorité — la
  qualité de l'abrégé conditionne la trouvabilité du brevet.
- Mentionner explicitement la figure la plus représentative (`Fig. 1`)
  pour publication avec l'abrégé.

### Dessins (si applicable — Règle 46 CBE)

- Numérotés **Fig. 1**, **Fig. 2**, etc. — ordre logique (vue d'ensemble
  puis détails).
- **Références numérotées** (10, 20, 30…) renvoyant aux éléments décrits
  dans la description ET cités dans les revendications le cas échéant.
- **Pas de texte sur les dessins** sauf mentions essentielles (légendes
  d'axes pour les graphiques, mots indispensables comme "ENTRÉE" /
  "SORTIE" si la géométrie ne suffit pas).
- **Lisibles à la reproduction** (traits noirs nets, pas de couleur sauf
  exception OEB, pas d'aplats gris denses).
- En chimie / biotech, les **formules développées** et les **séquences
  d'acides nucléiques ou protéiques** suivent un format spécifique
  (WIPO Standard ST.26 pour les listages de séquences depuis 2022).

---

## Rédaction des revendications

C'est le cœur juridique du brevet et la discipline où chaque mot pèse. Cette
section donne le cadre ; les exemples détaillés sont en
`references/structure-revendications.md`.

### Revendication indépendante — calibrer la portée

La revendication indépendante doit contenir **toutes les caractéristiques
techniques essentielles** — celles sans lesquelles l'invention ne résout
pas le problème objectif. Et **uniquement** celles-là : toute caractéristique
non essentielle ajoutée réduit la portée de protection inutilement.

- **Structure préambule + partie caractérisante** (norme européenne, Règle
  43(1) CBE — optionnelle aux États-Unis qui pratiquent souvent le format
  "single-claim" sans découpage explicite). Exemple :
  > **Préambule :** "Procédé de filtration d'eau utilisant une membrane
  > polymère, ladite membrane comprenant un substrat poreux et une couche
  > sélective déposée sur le substrat,"
  > **Partie caractérisante :** "caractérisé en ce que la couche sélective
  > est constituée d'un polymère greffé par des groupements sulfonate à un
  > taux de greffage compris entre 15 et 35 % en masse."

- **Test de portée optimale** : *"un concurrent qui omettrait cette
  caractéristique contournerait-il le brevet en faisant la même chose ?"*
  - Si **oui** → la caractéristique n'est pas essentielle, la supprimer
    (sinon protection contournable trivialement).
  - Si **non** → garder la caractéristique (sinon la revendication couvre
    de l'art antérieur).

- **Trop large** = risque d'antériorité destructrice (refus pour défaut de
  nouveauté L.611-11 ou activité inventive L.611-14 CPI) + risque de
  défaut de support (L.611-1 CPI).
- **Trop étroite** = protection inutile, facile à contourner par variation
  triviale.

### Revendications dépendantes — filet de sécurité

- Ajoutent des **limitations spécifiques** à une revendication antérieure :
  variantes structurelles, modes préférés, plages numériques préférées,
  matériaux spécifiques.
- **Renvois clairs et univoques** :
  - `Procédé selon la revendication 1, dans lequel ...`
  - `Procédé selon l'une des revendications 1 à 3, caractérisé en ce que ...`
  - `Procédé selon l'une quelconque des revendications précédentes, ...`
- **Hiérarchie pyramidale** : de la plus large (rev. 1) vers la plus
  étroite (dernières revendications). Si la rev. 1 tombe en opposition ou
  nullité, la rev. 2 puis 3 etc. forment des positions de repli.
- **Plages graduées** : si la rev. 1 revendique 15-35 %, prévoir rev. 2
  pour 20-30 %, rev. 3 pour 22-28 %, chacune ancrée par un exemple chiffré
  dans la description.

### Single-claim (US) vs multi-claim (EP) — économie procédurale

- **USPTO** : autorise et habitue à un grand nombre de revendications
  (15-20+). Facturation par revendication au-delà d'un seuil (3
  indépendantes / 20 totales sous la *base fee* ; au-delà, surtaxes par
  revendication supplémentaire). Pratique américaine du *picture claim*
  (revendication très détaillée).
- **OEB** : pas de limite formelle mais **taxe de revendication** au-delà
  de 15 (et bien plus salée au-delà de 50 depuis la révision tarifaire
  OEB). Économiquement, viser ≤ 15 revendications pour un dépôt EP. La
  pratique européenne privilégie la **revendication large** + dépendantes
  hiérarchisées.
- **INPI FR** : pas de limite stricte, taxes modérées par revendication
  au-delà de 10. La cohérence (unité d'invention — L.612-4 CPI) est
  vérifiée plus strictement qu'aux USA.

### Catégories de revendications (Règle 43(2) CBE)

Une demande de brevet peut comprendre plusieurs **catégories** de
revendications pour une même invention :

- **Produit** — composition chimique, dispositif, appareil, système.
  Couvre l'**objet en tant que tel** quelle que soit son utilisation.
  Protection la plus forte (le simple fait de fabriquer ou détenir le
  produit caractérisé constitue la contrefaçon).
- **Procédé** — méthode, processus de fabrication, méthode d'opération.
  Couvre la mise en œuvre des étapes décrites. La protection s'étend au
  **produit obtenu directement par le procédé** (L.613-3 CPI, Art. 64(2)
  CBE).
- **Utilisation** — nouvelle utilisation d'un produit connu. **Recevable
  en Europe** (T-208/88 *Bayer* sur la deuxième application
  thérapeutique, codifié à l'Art. 54(5) CBE 2000). **Plus restrictif aux
  USA** où l'utilisation pure est traitée différemment (method of use
  claims).
- **Combinaison produit-par-procédé** — caractérise un produit par le
  procédé qui le fabrique, lorsque la structure ne peut pas être
  caractérisée autrement (chimie complexe, biotech). Accepté avec
  parcimonie par l'OEB (T-150/82 *Claim categories*) : exige démonstration
  que le produit ne peut être défini structurellement.

### Erreurs courantes à signaler

À détecter dans le brouillon et flagger `[review]` :

- **Caractéristiques non essentielles dans la revendication 1** — limite
  inutilement la portée. Test : "si je retire ce mot, la rev. 1
  couvre-t-elle l'art antérieur connu ?" Si non, retirer le mot.
- **Caractéristiques essentielles manquantes** — rev. 1 trop large,
  couvrira l'art antérieur ou ne sera pas supportée par la description.
- **Terminologie imprécise** : `environ`, `proche de`, `sensiblement`,
  `de l'ordre de` — admis avec parcimonie mais préférer des **plages
  numériques bornées** (15 à 35 % et non "environ 25 %").
- **Marques ou noms commerciaux** dans la revendication — interdit
  (Directives OEB F-IV, 4.8). Une marque évolue dans le temps et son
  contenu technique n'est pas opposable. Utiliser le nom générique ou
  technique du produit.
- **Plages numériques sans support exemple** — une plage 10-40 % avec un
  seul exemple à 25 % est attaquable pour insuffisance et pour
  généralisation indue (jurisprudence OEB T-409/91).
- **Mélange de catégories dans une seule revendication** ("dispositif
  comprenant ... et procédé de fabrication consistant à ...") — viole
  l'unité de catégorie. Rédiger en revendications séparées.
- **Renvois multiples-dépendants en cascade** (rev. 5 renvoyant à 1-4,
  rev. 6 à 1-5, rev. 7 à 1-6…) — surtaxe USPTO importante, à éviter pour
  un dépôt visant les USA en phase nationale PCT.
- **Termes relatifs absolus** (`optimal`, `idéal`, `parfait`) — non
  objectivement mesurables, à reformuler ("supérieur à un seuil X",
  "dans une plage Y-Z").

Pour chaque erreur détectée, proposer une reformulation candidate taguée
`[review — à valider mandataire]`.

---

## Choix territoire — arbre décisionnel simplifié

> **Version simplifiée.** L'arbre détaillé territoire + budget + calendrier
> + stratégies hybrides relève du skill `strategie-extension-internationale`
> (prévu V2.2). Ici on donne le cadre suffisant pour pré-positionner le
> brouillon. Le choix définitif appartient au mandataire en concertation
> avec le déposant et la stratégie commerciale.

| Critère | **FR national (INPI)** | **EP (CBE)** | **PCT** |
|---|---|---|---|
| Marché cible | France uniquement | UE + 38 États CBE | mondial 156+ États |
| Budget initial | bas (~€500 – €1 500) | moyen (~€4 000 – €7 000) | bas phase intl (~€2 000 – €3 000) |
| Coût total ~10 ans | bas | moyen (validations nationales par pays choisi) | élevé (phases nationales en cascade) |
| Délai protection | immédiat dès dépôt FR | ~3-5 ans procédure OEB jusqu'à délivrance | 30 mois priorité avant phases nationales |
| Stratégie | défense locale, R&D française | conquête UE, dépôt institutionnel | mondialisation, gel des coûts |
| Complexité procédure | faible (examen INPI léger) | moyenne (examen OEB substantif + opposition 9 mois) | élevée (phases multiples, droit local de chaque pays) |
| Langue procédure | FR | FR / EN / DE (au choix dépôt) | EN / FR / ES / DE / JA / KO / RU / ZH / AR / PT |

### Recommandations types (à confirmer mandataire)

- **Startup FR, marché EU futur** → **FR national d'abord** + extension EP
  ou PCT à 12 mois en revendiquant la priorité de l'Union de Paris. Permet
  de tester l'invention sur le marché FR pendant 12 mois avant
  d'engager les coûts EP/PCT.
- **ETI déjà internationale** → **PCT direct** souvent. Le PCT gèle les
  coûts pendant 30 mois (18 mois supplémentaires par rapport à l'Union de
  Paris à 12 mois) pour décider des phases nationales en fonction des
  marchés effectivement adressés.
- **Brevet défensif, sans commercialisation prévue hors FR** → **FR
  national seul**. Le brevet FR couvre la fabrication et la vente sur le
  territoire français, ce qui peut suffire (notamment pour un savoir-faire
  industriel non export).
- **Pharma / biotech critique** → **PCT systématique**. Les enjeux
  financiers (R&D >> €100M, exclusivité commerciale = condition de
  rentabilité) justifient la couverture mondiale dès le dépôt initial. Les
  phases nationales à 30 mois sont déjà engagées au moment de la décision
  d'extension.
- **Logiciel et IT avec marché US dominant** → considérer **USPTO direct**
  + PCT en parallèle. L'approche brevetabilité du logiciel à l'USPTO
  (après *Alice Corp. v. CLS Bank* 2014) diffère de l'OEB, mieux vaut
  rédiger d'emblée en pensant aux deux offices.

### Priorité de l'Union de Paris (12 mois)

Quel que soit le territoire de premier dépôt, la **Convention d'Union de
Paris** (Art. 4) accorde 12 mois pour effectuer des dépôts ultérieurs dans
d'autres États membres en revendiquant la **date de priorité du premier
dépôt**. Ces dépôts ultérieurs sont alors opposables comme s'ils avaient
été déposés à la date de priorité — protection contre toute publication ou
dépôt tiers survenu entre les deux dates. Cette priorité est **stratégique**
pour la séquence FR puis EP/PCT à 12 mois.

---

## Checklist vérifications avant dépôt

À produire en sortie sous forme de matrice avec colonne ✓/✗/[review]. Cette
checklist N'EST PAS une attestation de brevetabilité — chaque ligne est un
prérequis dont la validation finale revient au mandataire.

- [ ] **Brevetabilité L.611-10 CPI** — aucune exclusion intrinsèque
  (découverte pure, méthode mathématique, création esthétique, plan-règle-
  méthode, logiciel "en tant que tel", présentation d'information, méthode
  chirurgicale/thérapeutique/diagnostic). Si flag, voir
  `recherche-anteriorite-brevet` knockout.
- [ ] **Nouveauté L.611-11 CPI** — recherche d'antériorité faite et aucune
  citation X destructrice trouvée. Lien : `/recherche-anteriorite-brevet`.
- [ ] **Activité inventive L.611-14 CPI** — argumentation problème-solution
  (OEB) préparée, effet technique mesurable identifié, distinction par
  rapport au document le plus proche formulée.
- [ ] **Application industrielle L.611-15 CPI** — l'invention est
  réalisable et utilisable dans l'industrie au sens large (agriculture
  incluse). Quasi toujours satisfait pour les inventions techniques ;
  vigilance sur les méthodes purement intellectuelles ou les concepts
  abstraits.
- [ ] **Unité d'invention L.612-4 CPI** — un seul concept inventif général
  par demande. Si plusieurs inventions distinctes → préparer
  **divisionnaire** ou choisir l'invention principale. L'objection
  d'absence d'unité (Art. 82 CBE) est fréquente en examen OEB.
- [ ] **Suffisance de description L.612-5 CPI** — l'homme du métier peut
  exécuter l'invention à partir de la description, sans effort excessif ni
  recherche inventive. Vérifier qu'au moins un mode de réalisation est
  décrit en détail, avec paramètres opératoires si pertinents.
- [ ] **Support des revendications L.611-1 CPI** — chaque caractéristique
  technique des revendications trouve son support dans la description.
  Aucun terme parachuté en revendication sans présence préalable dans la
  description.
- [ ] **Non-extension L.612-6 CPI / Art. 123(2) CBE** — si amendements
  futurs en cours d'examen, ils ne devront pas aller au-delà du contenu
  initial de la demande telle que déposée. Conséquence pratique : ne pas
  réserver de matière "pour plus tard", tout mettre dans le dépôt
  initial.
- [ ] **Cession des droits d'invention de salarié L.611-7 CPI** — si
  l'invention est faite par un salarié, déterminer la catégorie (mission /
  hors mission attribuable / hors mission non attribuable), formaliser la
  cession ou l'attribution selon le régime, calculer la rémunération
  supplémentaire ou le juste prix. Sans cession claire, le dépôt par
  l'employeur peut être contesté par le salarié en revendication de
  propriété (L.611-8 CPI).
- [ ] **Pas de divulgation publique préalable** — toute divulgation
  antérieure au dépôt (publication scientifique, démo publique, présentation
  hors NDA, mise en vente) détruit la nouveauté. **Délai de grâce L.611-13
  CPI** : 6 mois uniquement en cas (a) d'abus évident à l'égard de
  l'inventeur ou (b) d'exposition dans une exposition internationale
  officielle reconnue — strictement interprété, **ne pas s'y fier en
  pratique**. Si divulgation, dépôt immédiat ou abandon.
- [ ] **Choix territoire validé par mandataire** — FR / EP / PCT confirmé
  en cohérence avec stratégie commerciale, budget annuités sur 20 ans, et
  capacité à défendre dans les juridictions choisies.

---
