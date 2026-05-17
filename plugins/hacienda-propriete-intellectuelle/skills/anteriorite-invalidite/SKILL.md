---
name: anteriorite-invalidite
description: >
  Recherche et structure une argumentation d'invalidité (nullité) d'un brevet
  adverse — en attaque préventive (action en nullité TJ Paris L.613-25 CPI)
  ou en défense face à une action en contrefaçon (L.615-1 CPI). Identifie
  l'art antérieur destructeur (nouveauté L.611-11 ou activité inventive
  problème-solution OEB), structure les moyens de nullité pour exploitation
  judiciaire. NE plaide PAS — préparation à valider par mandataire EQE ou
  avocat spécialisé brevets.
argument-hint: "[num brevet cible | --attack (nullité préventive) | --defense (face contrefaçon)]"
---

# /anteriorite-invalidite

**Préparation argumentaire ≠ procédure judiciaire.** Ce skill prépare une
**argumentation d'invalidité** pour aider le mandataire en brevets (EQE —
European Qualifying Examination) ou l'avocat spécialisé brevets. Il NE
forme PAS l'action en nullité (= démarche TJ Paris formelle via avocat
habilité), NE plaide PAS au TJ Paris (compétence exclusive L.615-1 CPI),
NE négocie PAS de transaction avec le titulaire du brevet attaqué.

**Conséquences d'une argumentation faible** :

- **Action en nullité ratée** = condamnation aux dépens (CPC art. 696) +
  risque d'action en concurrence déloyale si attaque jugée abusive (Code
  civil art. 1240)
- **Défense en nullité mal construite** dans une action en contrefaçon
  adverse = condamnation contrefaçon + dommages-intérêts CPI L.615-7
  (réparation intégrale + atteinte morale)

Le brevet attaqué est **présumé valide** jusqu'à décision contraire — la
charge de la preuve d'invalidité pèse sur l'attaquant.

## Examples

```
/hacienda-propriete-intellectuelle:anteriorite-invalidite --attack FR2700123
```

(Mode attaque : nullité préventive contre un brevet adverse qui bloque
notre activité commerciale. Action en nullité devant TJ Paris.)

```
/hacienda-propriete-intellectuelle:anteriorite-invalidite --defense FR2700123
```

(Mode défense : nous avons reçu une assignation en contrefaçon sur le
brevet FR2700123. Préparer la défense en nullité — demande reconventionnelle
ou exception — combinée à la non-contrefaçon.)

```
/hacienda-propriete-intellectuelle:anteriorite-invalidite
```

(Sans flag — le skill demande quel mode utiliser et déroule l'intake.)

---

## PRÉPARATION ARGUMENTAIRE, PAS PROCÉDURE JUDICIAIRE

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Préparation argumentaire, pas procédure judiciaire.** Ce skill prépare
> une **argumentation d'invalidité** d'un brevet adverse — en attaque
> préventive (action en nullité TJ Paris) ou en défense face à une action
> en contrefaçon reçue. Il NE forme PAS l'action en nullité (démarche TJ
> Paris formelle nécessitant avocat habilité), NE plaide PAS en audience
> (compétence exclusive L.615-1 CPI), NE négocie PAS de transaction avec
> le titulaire. **Les enjeux sont lourds** : une action en nullité ratée
> expose aux dépens (CPC art. 696) et à une action en concurrence déloyale
> si l'attaque est jugée abusive (Code civil art. 1240) ; une défense en
> nullité mal construite expose à la condamnation pour contrefaçon et aux
> dommages-intérêts CPI L.615-7 (réparation intégrale + atteinte morale).
> Le brevet attaqué est **présumé valide** — la charge de la preuve pèse
> sur l'attaquant. **Toujours valider par mandataire en brevets EQE ou
> avocat spécialisé brevets avant toute action externe.**

C'est le garde-fou le plus visible du skill. L'argumentation d'invalidité
est un outil puissant : mal préparée, elle peut décider à tort d'engager
une action coûteuse et risquée, ou de bâcler une défense critique. La
posture est "porte à deux sens" (sur-flagger les motifs faibles `🔴` ou
`[review]`, laisser le mandataire/avocat trancher) plutôt que "porte à
sens unique" (décider tacitement à la place du professionnel).

---

## Charger le profil pratique avant de commencer

Avant tout, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Récupérer :

- **Rôle de l'utilisateur** : avocat spécialisé brevets / mandataire EQE
  inscrit OEB / juriste interne PI / non-juriste (chef de produit,
  R&D). Adapte la profondeur des explications procédurales et le niveau
  de détail des renvois jurisprudentiels.
- **Posture du cabinet** : agressive (action en nullité préventive
  utilisée comme levier business régulier) vs défensive (action en
  nullité réservée aux situations critiques de blocage commercial ou
  de défense indispensable). Influence le ton du brief final et le
  positionnement des recommandations.
- **Approbateurs** : qui signe une assignation devant TJ Paris ? Qui
  valide une transaction (licence, rachat brevet, coexistence) ? Le
  workflow d'escalade doit pointer ces personnes nommément.
- **Domaines techniques principaux** : mécanique / chimie / pharma /
  biotech / logiciel / électronique. Détermine la profondeur de
  l'analyse d'art antérieur (NPL plus critique en pharma/biotech) et
  les jurisprudences pertinentes à citer.

Si profil `[A CONFIGURER]` ou absent : mode provisoire **avocat
spécialisé brevets, posture mesurée, approbateurs à confirmer, tous
domaines techniques**. Le signaler dans la note du relecteur.

---

## Intake — 2 modes

Le skill fonctionne en deux modes mutuellement exclusifs. Si aucun flag
fourni à l'invocation, demander à l'utilisateur lequel s'applique :

> Souhaites-tu une **action en nullité préventive** (`--attack`) ou une
> **défense en nullité face à une action en contrefaçon reçue**
> (`--defense`) ?

### Mode `--attack` — Nullité préventive

Action en nullité préventive devant le TJ Paris pour faire annuler un
brevet adverse qui bloque notre activité, qui résulte d'un dépôt
frauduleux ou qui constitue une barrière concurrentielle excessive.

**Questions à poser** :

1. **Numéro brevet cible** (FR / EP / WO / US) — déclencher
   `inpi_brevet_details` (brevets FR/EP français) ou
   `espacenet_brevet_details` (brevets EP/WO/US) pour récupérer :
   revendications complètes (1 indépendante + dépendantes), déposant
   actuel, date dépôt, date priorité, date publication A1, date
   délivrance B1, statut (en vigueur / opposition en cours / expiré).
   Si l'utilisateur ne connaît pas le numéro, déclencher
   `inpi_search_brevets` ou `espacenet_search` avec mots-clés du
   produit bloquant pour l'aider à l'identifier.

2. **Contexte — pourquoi attaquer ?**
   - Le brevet bloque notre activité commerciale (notre produit X
     reproduit prétendument les revendications) — risque immédiat de
     mise en demeure ou de saisie-contrefaçon contre nous
   - Dépôt frauduleux suspecté (mauvaise foi du déposant, connaissance
     préalable de notre invention ou de l'art antérieur destructeur)
   - Barrière concurrentielle excessive (brevet abusif sur un standard
     de fait, technologie évidente, blocage d'un secteur entier)
   - Préparation d'une négociation (assainir le terrain avant licence
     ou coexistence — la menace crédible d'une action en nullité est
     un levier business)

3. **Posture** :
   - **Nullité totale** (toutes revendications, indépendantes et
     dépendantes) — action plus risquée, charge probatoire plus lourde,
     mais effet décisif `erga omnes`
   - **Nullité partielle** (seulement les revendications problématiques,
     typiquement la rev. 1 indépendante et 2-3 dépendantes ciblées) —
     action plus ciblée, mais le brevet survit pour les autres
     revendications

4. **Budget action** :
   - **Ciblé** : 1 motif solide privilégié (typiquement défaut de
     nouveauté L.611-11 avec une seule citation X solide). Économie,
     mais risque si la citation est rejetée par le juge
   - **Étendu** : multi-motifs cumulés (nouveauté + activité inventive
     + extension portée L.612-6 + suffisance L.612-5 si pertinent).
     Maximise les chances mais coûts d'avocat / expertise plus lourds
     (typiquement 50-150k€ procédure complète)

### Mode `--defense` — Défense face à action contrefaçon reçue

Argumentation de nullité en défense face à une action en contrefaçon
reçue (demande reconventionnelle devant le TJ Paris ou exception
soulevée dans nos conclusions de défense).

**Questions à poser** :

1. **Numéro brevet cible** (celui qu'on nous oppose dans l'assignation
   reçue) — déclencher `inpi_brevet_details` ou `espacenet_brevet_details`
   pour récupérer les mêmes données que mode `--attack`.

2. **Notre produit incriminé** : récap technique (référence interne,
   fiche produit, doc technique). Si une analyse `claim chart` adverse
   a déjà été réalisée via `tableau-contrefacon-brevet` V2.0, pointer
   le fichier output (chemin du Markdown). Sinon, déclencher
   `tableau-contrefacon-brevet` en parallèle pour évaluer la solidité
   de la contrefaçon alléguée avant de structurer la défense.

3. **Argumentaire contrefaçon adverse** : résumer
   - Quelles revendications le demandeur invoque-t-il ? (typiquement
     rev. 1 indépendante + 1-3 dépendantes pertinentes)
   - Théorie invoquée : **contrefaçon littérale** (toutes les
     caractéristiques reproduites à l'identique) ou **contrefaçon par
     équivalence** (Cour de cass. com. 5 mai 2009 n°08-13.586 — fonction
     identique, moyen équivalent, résultat identique)
   - Pièces produites par l'adversaire (saisie-contrefaçon, expertise,
     constat huissier, achats témoins)

4. **Notre stratégie globale de défense** :
   - **Nullité du brevet adverse** (demande reconventionnelle — ce
     skill) : faire annuler le brevet pour invalider la base de
     l'action
   - **Non-contrefaçon littérale** : notre produit ne reproduit pas
     toutes les caractéristiques de la revendication (souvent une
     caractéristique manquante)
   - **Non-équivalence** : les éléments substitués ne respectent pas
     les 3 critères Cour de cass. com. 5 mai 2009 (fonction, moyen,
     résultat)
   - **Combinaison des 3** (défense la plus complète et la plus
     sécurisée — chaque branche couvre les autres en cas de rejet)

Pour les 2 modes : si l'utilisateur ne peut pas fournir les numéros
brevets exacts, déclencher `inpi_search_brevets` ou `espacenet_search`
avec ses mots-clés métier + classification CIB estimée pour l'aider
à l'identification. Ne jamais inventer un numéro.

---

## Recherche d'art antérieur destructeur

C'est le cœur de l'argumentation. Sans art antérieur destructeur solide,
les motifs de nullité L.613-25 a) (défaut de nouveauté ou d'activité
inventive) tombent. La règle d'or : **l'art antérieur doit avoir une date
de publication strictement antérieure à la date de priorité revendiquée
par le brevet attaqué** (CPI L.611-11 al. 2 ; Art. 54 CBE). Une seule
journée de décalage suffit pour disqualifier une citation autrement
parfaite.

### Méthodologie de recherche

1. **Préparation des mots-clés** :
   - Extraire le vocabulaire technique des revendications indépendantes
     du brevet cible (concepts structurels et fonctionnels)
   - Identifier les synonymes techniques + traductions EN (l'art
     antérieur international est majoritairement en anglais)
   - Lister les **codes CIB** (Classification Internationale des Brevets)
     du brevet cible — partir de la classe principale puis élargir aux
     sous-classes voisines

2. **Déclencher `espacenet_search`** avec :
   - Mots-clés FR + EN combinés (opérateurs booléens AND / OR)
   - Codes CIB du brevet cible
   - **Filtre date publication < date priorité brevet cible** —
     CRITIQUE, sans ce filtre les résultats sont inexploitables
   - Limiter aux types : brevets, demandes publiées (A1), brevets
     délivrés (B1, B2), demandes PCT (WO)

3. **Déclencher `inpi_search_brevets`** pour les antériorités FR/EP
   nationales non couvertes par Espacenet (notamment certains dépôts FR
   antérieurs 1978 mal indexés à l'OEB)

4. **Filtrer strictement** par date publication antérieure à la date
   de priorité — tout document non strictement antérieur est éliminé
   (même les copendings, sauf application Art. 54(3) CBE pour
   l'analyse nouveauté EP)

5. **Classifier les résultats trouvés** (anticipation jurisprudentielle) :
   - **Potentielles X** (destructrices de nouveauté) : un seul document
     divulgue **toutes** les caractéristiques d'une revendication
     indépendante du brevet cible — angle d'attaque le plus puissant
   - **Potentielles Y** (combinaisons activité inventive) : deux ou
     plusieurs documents qui, combinés par l'homme du métier, auraient
     conduit à l'invention revendiquée sans effort inventif

### Capture des résultats

Pour chaque citation retenue, capturer dans un tableau structuré :

- **Numéro** (FR2700123 / EP1234567 / WO2020/123456 / US2018/1234)
- **Source** (`[INPI Brevets]` / `[OEB Espacenet]` / `[Google Patents]`
  V2.1.1 / `[utilisateur fourni]`)
- **Titre** complet + déposant / inventeur
- **Classification CIB** (vérifier cohérence avec le brevet cible)
- **Date publication** (CRITIQUE — vérifier `<` date priorité brevet
  cible, jour près)
- **Date priorité propre** (utile pour évaluer si la citation peut
  elle-même être Art. 54(3) CBE)
- **Abrégé + revendications publiées** si pertinent au regard des
  caractéristiques visées
- **Évaluation préliminaire X / Y / A** (A = simplement informatif —
  utile pour le contexte mais non destructeur)

### Bucket "Aucune base interrogée"

Si aucun connecteur brevets n'est disponible ou si la recherche n'a
pas pu être lancée, **ne JAMAIS inventer de citations**. Inclure le
bucket suivant dans l'output :

> **Aucune base brevets interrogée.** Ce skill n'a pas hit Data INPI
> brevets, OEB Espacenet, Google Patents (V2.1.1), WIPO PatentScope
> (V2.2), ni littérature non-brevet (Google Scholar, IEEE Xplore,
> PubMed, NPL spécialisée par domaine technique). Une recherche
> professionnelle sur ces bases est **requise** avant toute action en
> nullité ou demande reconventionnelle. **Une action en nullité ratée
> pour défaut d'art antérieur destructeur = condamnation aux dépens
> (CPC 696) + risque d'action en concurrence déloyale (Code civil
> 1240).** La présente argumentation suppose qu'un mandataire EQE ou
> un cabinet de recherche brevets professionnel (CPA Global / Questel
> / PatBase / Minesoft) sera mandaté pour effectuer la recherche
> définitive avant dépôt d'assignation.

### Notes critiques

- **L'art antérieur peut être brevet OU non-brevet** : publications
  scientifiques (revues à comité de lecture, conférences), thèses,
  documentation produit commercialisé avant priorité, brochures
  commerciales, sites web archivés (Wayback Machine), normes
  industrielles publiées. La NPL (Non-Patent Literature) est souvent
  décisive en pharma / biotech / logiciel.
- **La divulgation publique** (exposition à un salon professionnel,
  vente commerciale antérieure, conférence orale) constitue de l'art
  antérieur même si non écrite — la preuve devient alors un défi
  procédural (témoignages, constats huissier rétrospectifs, archives
  d'exposants).
- **L'art antérieur interne au déposant** (publications propres
  antérieures à la priorité, brochures internes diffusées) compte
  AUSSI. Le déposant ne peut pas opposer sa propre divulgation
  antérieure comme exception — sauf application du **délai de grâce
  L.611-13 CPI** strictement encadré (6 mois maximum avant le dépôt,
  uniquement en cas d'abus évident ou d'exposition officielle
  internationale reconnue — exception rarissime).
- **Art. 54(3) CBE** (demandes EP antérieurement déposées mais
  publiées postérieurement) : opposable en nouveauté seulement, pas
  en activité inventive. Vérifier les dépôts EP avec date de dépôt
  antérieure et date de publication postérieure à la priorité du
  brevet cible.

---

## Motifs de nullité (CPI L.613-25)

L'article L.613-25 du Code de la propriété intellectuelle énumère
limitativement les **5 motifs de nullité** d'un brevet français. Cette
liste correspond largement aux motifs opposables devant l'OEB en
opposition (Art. 100 CBE) et en révocation centrale (Art. 105a CBE).
Pour chaque motif retenu dans l'argumentation, présenter explicitement
sa **force probable**, les **pièces requises**, et le **précédent
jurisprudentiel** pertinent.

### L.613-25 a) — Défaut de brevetabilité

C'est le motif le plus fréquemment invoqué (~70-80 % des actions en
nullité). Il regroupe plusieurs branches autonomes :

- **L.611-10 CPI — exclusions de la brevetabilité** : découvertes,
  théories scientifiques, méthodes mathématiques, créations
  esthétiques, méthodes intellectuelles, plans / règles / méthodes
  pour l'exercice d'activités économiques ou de jeux, **programmes
  d'ordinateur "en tant que tels"** (motif central en logiciel —
  jurisprudence OEB G 3/08 sur invention mise en œuvre par ordinateur),
  présentations d'informations, **méthodes de traitement médical du
  corps humain ou animal** (mais les produits — médicaments,
  dispositifs — restent brevetables).
- **L.611-11 CPI — défaut de nouveauté** (motif clé) : existence d'art
  antérieur destructeur de nouveauté révélant explicitement ou
  implicitement TOUTES les caractéristiques d'une revendication.
  Citation X. La nouveauté s'apprécie revendication par revendication.
- **L.611-15 CPI — défaut d'application industrielle** : invention non
  réalisable industriellement (rarement seul motif). Domaine
  d'élection : perpetual motion machines, séquences ADN dont la
  fonction n'est pas identifiée (CJUE *Brüstle* C-34/10 indirect).
- **Implicite — défaut d'activité inventive** (équivalent Art. 56 CBE) :
  l'invention découle de manière évidente de l'état de la technique
  pour l'homme du métier. Démontré via art antérieur Y combinaisons.
  Pas explicitement listé dans L.611-10 à -15 mais reconnu comme
  motif L.613-25 a) par jurisprudence constante.

### L.613-25 b) — Défaut de suffisance de description (L.612-5)

**L.612-5 CPI** : "L'invention doit être exposée dans la demande de
brevet de façon suffisamment claire et complète pour qu'un homme du
métier puisse l'exécuter." Équivalent Art. 83 CBE.

Si la description omet des informations critiques (paramètres
opératoires, conditions chimiques, ratios stœchiométriques, exemples
de mise en œuvre, code source pour invention logicielle, structure
d'enseignement pour réseau de neurones), nullité possible. Souvent
invoqué pour :

- **Brevets pharma / biotech** : effet thérapeutique allégué mais non
  démontré dans la description (exemples manquants ou inopérants —
  jurisprudence TJ Paris constante depuis 2015 sur "plausibility")
- **Logiciel embarqué / IA** : algorithme abstrait sans implémentation
  concrète, paramètres réseau de neurones absents
- **Chimie de synthèse** : voie de synthèse non reproductible,
  rendement non démontrable

Standard : un homme du métier disposant de connaissances générales du
domaine doit pouvoir reproduire l'invention SANS effort inventif
excessif et SANS expérimentation non raisonnable (jurisprudence OEB
T 226/85, T 409/91).

### L.613-25 c) — Extension de la portée au-delà du contenu de la demande initiale (L.612-6)

**L.612-6 CPI** : "Les revendications peuvent être modifiées au cours
de la procédure (...) Les modifications ne peuvent étendre l'objet de
la demande au-delà du contenu de la demande telle qu'elle a été
déposée." Équivalent **Art. 123(2) EPC**.

Motif fréquent et puissant. Souvent invoqué quand le titulaire a
"élargi" ses revendications pendant l'examen pour couvrir un produit
concurrent émergent. La preuve consiste à comparer la **demande
initiale** (publication A1) avec le **brevet délivré** (B1) — chercher
les termes ajoutés, les généralisations intermédiaires, les
suppressions de caractéristiques qui restreignaient la portée.

**Jurisprudence pertinente** :

- **G 1/93** (Grande Chambre de Recours OEB) — règle de l'inescapable
  trap : si une caractéristique ajoutée pendant l'examen viole
  l'Art. 123(2) MAIS la supprimer violerait l'Art. 123(3)
  (élargissement post-grant interdit), le brevet doit être révoqué
- **G 2/10** — disclaimer non divulgué admissible seulement sous
  conditions strictes
- **TJ Paris constant** sur la "généralisation intermédiaire" :
  extraction sélective d'une caractéristique d'un mode de réalisation
  spécifique pour l'isoler de son contexte = extension prohibée

### L.613-25 d) — Défaut d'unité de l'invention (L.612-4)

**L.612-4 CPI** : "La demande de brevet ne peut concerner qu'une seule
invention ou un groupe d'inventions liées entre elles de telle sorte
qu'elles ne forment qu'un seul concept inventif général."

**Motif faible** rarement invoqué seul. Le défaut d'unité est
sanctionné principalement pendant la prosecution (l'INPI ou l'OEB
demande la division en `divisional` — voir Option D de
`analyse-refus-inpi`). Une fois le brevet délivré, la nullité pour
défaut d'unité reste théoriquement possible mais peu utilisée en
pratique judiciaire (le juge préfère retenir d'autres motifs plus
solides). Plutôt argument annexe à l'appui d'autres motifs.

### L.613-25 e) — Défaut de qualité du déposant (titularité)

Le déposant doit être l'inventeur ou son ayant-cause légitime (cession
de droits, contrat de travail avec clause d'invention, mission
inventive au titre de L.611-7 CPI).

Cas typiques de nullité pour défaut de titularité :

- **Cessions de droits incomplètes ou viciées** : chaîne de cessions
  interrompue (un cessionnaire intermédiaire n'a pas régularisé la
  cession aval), absence de signature, défaut d'inscription au
  Registre National des Brevets
- **M&A non régularisée** : acquisition d'une société propriétaire de
  brevets sans transfert effectif (apport partiel d'actif mal exécuté,
  fusion-absorption avec brevets oubliés)
- **Invention de salarié L.611-7 CPI** : régime spécifique français
  (invention de mission appartient à l'employeur avec contrepartie
  financière ; invention hors mission attribuable à l'employeur sous
  conditions ; sinon appartient au salarié). Mauvaise qualification =
  nullité du dépôt par l'employeur.

L'action en revendication de propriété (CPI L.611-8) est distincte de
l'action en nullité L.613-25 e) — elles peuvent être cumulées dans le
même contentieux.

### Format de présentation par motif retenu

Pour chaque motif de nullité retenu dans l'argumentation, présenter :

- **Motif** : intitulé exact + référence article (L.613-25 lettre +
  article CPI fondateur + équivalent CBE le cas échéant)
- **Force probable** :
  - 🟢 **solide** : art antérieur clair et directement applicable,
    jurisprudence favorable récente, expertise technique attendue
    convergente
  - 🟡 **mixte** : interprétation ouverte, contestation possible par
    le titulaire, dépend d'éléments de preuve à consolider
  - 🔴 **faible** : motif théorique sans preuve solide à ce stade,
    nécessite consolidation avant exploitation (à marquer `[review]`)
- **Pièces requises** : art antérieur (citations Espacenet / Google
  Patents / NPL), expertise technique (souvent nécessaire en domaines
  complexes — chimie, biotech, logiciel embarqué), généalogie déposant
  (chaîne de cessions du Registre National des Brevets, statuts,
  procès-verbaux d'assemblées d'apport)
- **Précédent jurisprudentiel** : décision TJ Paris 3e ch. ou Cour de
  cass. com. récente pertinente, à vérifier sur Légifrance avant toute
  transmission externe (taguer `[connaissance modèle — à vérifier]`
  par défaut)

Pour le détail des motifs, exemples jurisprudentiels par domaine
technique et erreurs courantes : voir `references/motifs-nullite-brevet.md`.

---

## Argumentation problème-solution inverse

Pour démontrer le **défaut d'activité inventive** (motif L.613-25 a /
implicite L.611-10), appliquer le cadre OEB problème-solution **à
l'inverse**.

> **Cadre OEB problème-solution appliqué à l'inverse** : ici on
> démontre que les caractéristiques distinctives du brevet attaqué
> **étaient évidentes** pour l'homme du métier à la date de priorité
> — c'est l'exact inverse de la défense en prosecution
> (`analyse-refus-inpi`) ou de la recherche défensive d'antériorité
> (`recherche-anteriorite-brevet`). Le même cadre, l'objectif opposé.

### Méthodologie (4 étapes)

1. **Identifier l'état de la technique le plus proche** (*closest
   prior art*) parmi les antériorités trouvées — généralement le
   document Y le plus pertinent au regard du problème technique
   adressé par le brevet attaqué. Le closest prior art doit être
   réaliste (un homme du métier l'aurait choisi comme point de
   départ).

2. **Identifier les caractéristiques distinctives** du brevet attaqué
   par rapport à ce closest prior art — c'est-à-dire ce que le brevet
   ajoute. Peu de différences = vulnérabilité, le brevet ressemble
   trop à l'existant.

3. **Formuler le problème technique objectif** que ces différences
   sont censées résoudre. Le problème doit être formulé à partir des
   effets techniques effectivement démontrés (pas des effets allégués
   sans preuve). Si le brevet attaqué ne démontre pas d'effet, le
   problème se réduit à "fournir une alternative" — formulation
   défavorable au titulaire car réduit l'exigence d'activité inventive.

4. **Démontrer la non-inventivité** :
   - Citer au moins **2 documents Y** combinés (au minimum closest
     prior art + 1 autre — la combinaison de plus de 3 documents
     devient suspecte pour le juge, *hindsight bias*)
   - Démontrer que l'homme du métier, confronté au problème, aurait
     trouvé **motivation** dans le second document Y pour appliquer
     les caractéristiques distinctives au closest prior art. La
     motivation peut résulter d'une suggestion explicite, d'un
     pointage générique du domaine, ou de la nécessité technique
   - Définir l'**homme du métier** : compétences normales du domaine
     concerné (ingénieur expérimenté, niveau Bac+5, connaissance de
     l'art antérieur publié dans la CIB visée). Pas un Nobel, pas un
     stagiaire

### Anticiper la défense du titulaire

Le titulaire opposera des arguments défensifs classiques. Préparer les
contre-arguments :

- **Effet technique inattendu** (la caractéristique distinctive
  apporte une amélioration que l'art antérieur ne suggérait pas, ex.
  effet synergique) → **Contre** : démontrer que l'effet n'est pas
  démontré dans la description du brevet attaqué (paragraphes vagues
  sans données chiffrées, absence d'exemples comparatifs) OU démontrer
  que l'effet était prévisible par l'homme du métier à partir de
  l'art antérieur (jurisprudence OEB *bonus effect* T 21/81 :
  amélioration "bonus" non récompensée si l'invention était de toute
  façon évidente)
- **Problème non posé par l'art antérieur** (le combinatoire n'aurait
  pas été envisagé car personne ne se posait la question) → **Contre** :
  démontrer que le problème était évident dans le domaine (problème
  commun documenté dans des publications techniques, normes
  industrielles, manuels)
- **Préjugé technique de l'art antérieur** (l'art antérieur
  enseignait explicitement de NE PAS faire ce qu'a fait l'invention)
  → **Contre** : démontrer que le préjugé n'existait pas vraiment
  (citer publications neutres ou contredisant le prétendu préjugé),
  ou démontrer que le préjugé était dépassé à la date de priorité
- **"Could would" objection** (l'homme du métier *pouvait* combiner
  mais ne l'*aurait* pas fait) → **Contre** : démontrer une
  motivation positive (incitation technique, marketing, économique)
  à effectuer la combinaison

---

## Calcul de la prescription / délai

Les modes `--attack` et `--defense` ont des régimes de prescription
radicalement différents.

### Action en nullité (mode `--attack`)

L'action en nullité d'un brevet est **imprescriptible tant que le
brevet est en vigueur** (CPI L.613-25 — pas de délai de prescription
spécifique). La durée maximale d'un brevet est de **20 ans à compter
du dépôt** (L.611-2 CPI). L'action est donc possible :

- Pendant toute la durée de vie du brevet (jusqu'à 20 ans post-dépôt)
- Y compris pendant des extensions Certificat Complémentaire de
  Protection (CCP) en pharma (jusqu'à 25 ans dans certains cas, sur
  fondement d'AMM)

**Pas d'urgence intrinsèque**, sauf si :

- Le titulaire est sur le point de nous assigner en contrefaçon
  → privilégier une action en nullité préventive pour **fixer la
  juridiction** (TJ Paris) avant l'assignation adverse et obtenir
  l'avantage tactique du demandeur
- Le brevet approche de son expiration naturelle (< 2 ans restants)
  → évaluer si l'action est encore économiquement rentable (la nullité
  est rétroactive `ex tunc` mais l'effet pratique se limite aux
  contentieux passés non éteints)

### Défense en nullité dans action contrefaçon (mode `--defense`)

La défense en nullité (par voie d'exception ou demande
reconventionnelle) reste valable tant que **l'action en contrefaçon
elle-même est recevable**.

- **Action en contrefaçon** : prescription **5 ans** (CPI L.615-8) à
  compter du jour où le titulaire a connu ou aurait dû connaître les
  faits — délai courant depuis 2014 (loi du 11 mars 2014). Au-delà,
  l'action en contrefaçon est prescrite et notre défense en nullité
  devient sans objet (sauf à introduire nous-mêmes une action en
  nullité préventive mode `--attack`)
- **Défense en nullité** : peut être invoquée comme demande
  reconventionnelle (la plus protectrice — permet d'obtenir une
  décision de nullité `erga omnes`) ou comme simple exception (effet
  inter partes seulement). **Toujours privilégier la demande
  reconventionnelle** sauf raison tactique précise contraire

### Sévérité du délai pour `--defense`

Calculer depuis la date d'assignation TJ Paris reçue. L'audience est
généralement fixée 6 à 18 mois plus tard, avec des conclusions et
mémoires intermédiaires.

- **Audience < 30 jours** : 🔴 URGENT — préparer les écritures dans
  la semaine, mobiliser avocat et mandataire EQE immédiatement.
  Demande de renvoi à envisager si dossier non prêt
- **Audience 30-90 jours** : 🟠 — préparer dans le mois, planifier
  expertise technique si nécessaire (délais d'expertise judiciaire
  4-6 mois en moyenne, à ordonner par JME en amont)
- **Audience > 90 jours** : 🟡 — planning standard, mais ne pas
  attendre la dernière minute. La recherche d'art antérieur prend
  6-12 semaines incompressibles avec un cabinet spécialisé

### Cas particulier : opposition européenne pendante

Si le brevet attaqué est une partie nationale d'un brevet européen
EP, vérifier si une **opposition OEB** est pendante (délai 9 mois
post-délivrance pour former opposition — Art. 99 CBE). Si oui :

- Le TJ Paris peut **surseoir à statuer** dans l'attente de la
  décision OEB (Art. 100 CBE — motifs largement convergents)
- L'opposition OEB est une voie alternative moins coûteuse (~3-5 k€
  vs 50-150 k€ pour action TJ Paris) — vérifier opportunité de la
  privilégier en mode `--attack` si délai 9 mois encore ouvert
- Une décision de révocation OEB éteint le brevet `erga omnes` dans
  tous les États désignés — effet plus large qu'une nullité TJ Paris
  (qui n'a effet qu'en France)

---

## Format de sortie

L'output est un seul document Markdown structuré ci-dessous. Quadruple
fence pour permettre l'imbrication de fences triples internes
(jurisprudence citée, extraits revendications, code SQL hypothétique).

`````markdown
[EN-TÊTE CONFIDENTIALITÉ — selon profil lu en §2 du plugin CLAUDE.md]

# Argumentation invalidité brevet [N°] — [Mode: --attack / --defense] (PRÉPARATION ARGUMENTAIRE, PAS PROCÉDURE JUDICIAIRE)

> **Préparation argumentaire, pas procédure judiciaire.** Ce skill
> prépare une argumentation d'invalidité d'un brevet adverse — en
> attaque préventive (action en nullité TJ Paris) ou en défense face
> à une action en contrefaçon reçue. Il NE forme PAS l'action en
> nullité (démarche TJ Paris formelle nécessitant avocat habilité),
> NE plaide PAS en audience (compétence exclusive L.615-1 CPI), NE
> négocie PAS de transaction avec le titulaire. Les enjeux sont
> lourds : action en nullité ratée = dépens (CPC 696) + risque
> concurrence déloyale (Code civil 1240) ; défense en nullité mal
> construite = condamnation contrefaçon + dommages-intérêts L.615-7
> CPI. Le brevet attaqué est présumé valide — charge de la preuve
> sur l'attaquant. **Toujours valider par mandataire EQE ou avocat
> spécialisé brevets avant toute action externe.**

> **⚠️ Note du relecteur**
> - **Mode :** [--attack nullité préventive / --defense face action contrefaçon adverse]
> - **Sources interrogées :** [INPI Brevets ✓ | OEB Espacenet ✓ | Google Patents ✗ V2.1.1 | NPL non couvert — recherche pro requise]
> - **Art antérieur destructeur identifié :** [N documents potentiellement X / N potentiellement Y]
> - **Motifs nullité retenus :** [N motifs L.613-25 — force globale 🟢/🟡/🔴]
> - **Délai (mode --defense uniquement) :** [N jours jusqu'à audience TJ Paris] — sévérité [🔴/🟠/🟡]
> - **Profil :** [rôle utilisateur lu / posture / approbateurs identifiés OU "à configurer"]
> - **Avant action TJ Paris :** validation **OBLIGATOIRE** mandataire EQE ou avocat spécialisé brevets

**Triage :** 🟢 ARGUMENTATION SOLIDE / 🟡 MIXTE / 🔴 FAIBLE — une phrase pourquoi (ex : "art antérieur FR1900456 destructeur de nouveauté rev. 1, mais sous réserve validation expertise technique").

## Brevet cible

- **Numéro :** [FR/EP/WO/US]
- **Titre :** [...]
- **Déposant / Titulaire actuel :** [...] (vérifier Registre National des Brevets)
- **Date dépôt :** [YYYY-MM-DD]
- **Date priorité :** [YYYY-MM-DD] (date critique pour filtre art antérieur)
- **Date publication A1 / délivrance B1 :** [YYYY-MM-DD / YYYY-MM-DD]
- **Statut :** [en vigueur / opposition OEB en cours / contesté / CCP attaché]
- **Classification CIB :** [classe principale + classes secondaires]
- **Revendications attaquées :** [1 indépendante + 5 dépendantes / ou subset si nullité partielle]
- **Annuités à jour :** [✓ / ✗] (un brevet déchu pour défaut d'annuité ne nécessite pas d'action en nullité)

## Art antérieur destructeur identifié

| Document | Source | Date pub. | Date priorité brevet cible | Pertinence | Statut filtre date |
|---|---|---|---|---|---|
| FR1900456 | [INPI Brevets] | 2017-03-15 | 2018-02-01 | X destructrice nouveauté rev. 1 | ✓ filtré |
| EP3456789 | [OEB Espacenet] | 2016-09-08 | 2018-02-01 | Y combinaison avec FR1900456 | ✓ filtré |
| WO2017/123456 | [OEB Espacenet] | 2017-07-12 | 2018-02-01 | Y combinaison alternative | ✓ filtré |

**Caractéristiques divulguées par chaque document** (résumé) :

- **FR1900456** : couche support en polymère + couche active graphène 5-50 nm (caractéristiques rev. 1.a et 1.b du brevet cible)
- **EP3456789** : agent réticulation polyamine en milieu acide (caractéristique rev. 1.c)
- **WO2017/123456** : application filtration eau (préambule rev. 1)

## Motifs de nullité retenus

### Motif principal : L.613-25 a) — Défaut de nouveauté (L.611-11)

**Force :** 🟢 solide

**Argumentation :** FR1900456 (citation X) divulgue intégralement les
caractéristiques 1.a et 1.b de la revendication 1 du brevet cible. La
revendication 1 doit être annulée pour défaut de nouveauté
(L.611-11 CPI).

**Pièces requises :** FR1900456 (extrait + traduction si pertinent),
expertise technique attestant identité des caractéristiques.

**Précédent jurisprudentiel :** TJ Paris 3e ch. 1re sect., XXXX-YY-ZZ,
RG 22/12345 (sur cas similaire filtration membrane) `[connaissance modèle — à vérifier]`.

### Motif subsidiaire : L.613-25 a) — Défaut d'activité inventive

**Force :** 🟡 mixte (dépend de l'effet technique réellement démontré
dans la description du brevet attaqué)

**Argumentation :** À défaut de nouveauté détruite, l'activité
inventive l'est par combinaison de FR1900456 + EP3456789. L'homme du
métier, confronté au problème "améliorer la durabilité de la membrane
en milieu acide", aurait combiné FR1900456 (support + couche) avec
EP3456789 (agent réticulation polyamine en milieu acide) sans
difficulté inventive (même CIB B01D, problème commun documenté).

**Pièces requises :** FR1900456 + EP3456789 + expertise technique sur
motivation combinatoire.

**Anticiper :** le titulaire invoquera vraisemblablement un effet
technique inattendu (synergique). Réponse préparée : l'effet n'est pas
démontré dans la description originale (paragraphes vagues sans
données chiffrées comparatives, § 0042-0048 du B1).

### Motif subsidiaire 2 : L.613-25 c) — Extension portée au-delà demande initiale

**Force :** 🔴 faible (à approfondir avec mandataire) `[review]`

**Argumentation :** La revendication 1 telle que délivrée (B1) contient
le terme "essentiellement" qui n'apparaît pas dans la demande initiale
publiée (A1). Possible violation L.612-6 CPI / Art. 123(2) EPC —
généralisation intermédiaire.

**Pièces requises :** Demande initiale A1 vs brevet délivré B1 —
comparaison terme par terme, idéalement par mandataire EQE qui maîtrise
la jurisprudence Art. 123(2).

## Argumentation problème-solution inverse

- **Closest prior art :** FR1900456 (membrane filtration eau avec couche support + couche graphène)
- **Caractéristiques distinctives du brevet attaqué :** ajout d'agent de réticulation polyamine (caractéristique 1.c)
- **Problème technique objectif (formulation OEB) :** améliorer la durabilité chimique de la membrane en milieu acide
- **Démonstration non-évidence :**
  - EP3456789 enseigne explicitement l'utilisation d'agents de réticulation polyamine pour stabiliser des couches actives en milieu acide (§ 0023-0027 EP3456789)
  - L'homme du métier confronté au problème de durabilité acide aurait naturellement consulté EP3456789 (même domaine CIB B01D, problème commun)
  - Aucun préjugé technique n'aurait dissuadé l'homme du métier de combiner les deux enseignements
  - Le brevet attaqué ne démontre pas d'effet technique inattendu de cette combinaison (description vague § 0042)

→ La revendication 1, à défaut de nullité pour défaut de nouveauté,
doit être annulée pour défaut d'activité inventive.

## Projet d'écritures

### Mode `--attack` — Conclusions en nullité TJ Paris

**1. Identification des parties**

- **Demandeur en nullité (notre cabinet) :** [raison sociale + SIREN + adresse + avocat constitué inscrit au barreau de Paris]
- **Défendeur (titulaire brevet attaqué) :** [identité issue du Registre National des Brevets]

**2. Faits**

- Genèse de notre intérêt à agir (notre produit X, blocage par le brevet attaqué)
- Recherche d'art antérieur effectuée (méthodologie + sources interrogées)
- Mise en demeure préalable (si pertinente) ou absence de tentative amiable justifiée

**3. Discussion en droit**

3.1 Sur la nullité pour défaut de nouveauté (motif principal L.613-25 a / L.611-11)
3.2 Subsidiairement, sur la nullité pour défaut d'activité inventive (L.613-25 a)
3.3 Plus subsidiairement, sur la nullité pour extension portée (L.613-25 c / L.612-6)

**4. Demande**

- À titre principal : nullité **totale** du brevet FR/EP N° XXXXXXX
- À titre subsidiaire : nullité **partielle** des revendications 1, 4, 5 (autres revendications non annulées)
- Condamnation aux dépens (CPC 696) + article 700 CPC (frais irrépétibles, montant à préciser selon barème cabinet)

**5. Pièces produites**

| N° | Pièce | Fonction |
|---|---|---|
| 1 | Extrait Kbis demandeur | Identité |
| 2 | Brevet attaqué FR/EP N° XXXXXXX (B1) | Pièce centrale |
| 3 | Demande initiale (A1) | Comparaison non-extension L.612-6 |
| 4 | FR1900456 (citation X) | Art antérieur destructeur nouveauté |
| 5 | EP3456789 (citation Y) | Art antérieur destructeur activité inventive |
| 6 | WO2017/123456 (citation Y) | Argument combinaison |
| 7 | Expertise technique | Démonstration identité caractéristiques / motivation combinatoire |
| 8 | Documentation produit demandeur | Justifier intérêt à agir |

### Mode `--defense` — Conclusions de défense + demande reconventionnelle en nullité

**1. Identification des parties**

- **Demandeur (titulaire brevet, qui nous attaque en contrefaçon) :** [identité]
- **Défendeur (notre cabinet, qui répond + reconvient en nullité) :** [identité + avocat constitué]

**2. Faits**

- Rappel de la mise en cause (action en contrefaçon adverse, saisie-contrefaçon éventuelle)
- Notre produit X, sa conception, son antériorité éventuelle
- Recherche d'art antérieur effectuée

**3. Discussion en droit**

3.1 À titre principal, sur la non-contrefaçon
- **Non-contrefaçon littérale** : notre produit X ne reproduit pas toutes les caractéristiques de la revendication 1 (caractéristique 1.c absente — agent réticulation polyamine non utilisé dans notre formulation)
- **Non-équivalence** : les éléments substitués (polyimine au lieu de polyamine) ne respectent pas les 3 critères Cour de cass. com. 5 mai 2009 n°08-13.586 (fonction différente — stabilisation thermique vs chimique)

3.2 À titre subsidiaire, sur la nullité du brevet adverse (demande reconventionnelle)
- Motifs L.613-25 a / b / c retenus (voir argumentation supra)
- Argumentation problème-solution inverse (voir supra)

**4. Demande**

- À titre principal : déboutement intégral de l'action en contrefaçon
- À titre reconventionnel : nullité **totale** du brevet adverse FR/EP N° XXXXXXX (ou nullité partielle des revendications 1, 4, 5 à titre subsidiaire)
- Condamnation aux dépens + article 700 CPC

**5. Pièces produites** : [tableau similaire mode --attack + pièces propres défense non-contrefaçon : documentation produit, expertise comparative, attestation d'usage interne antérieur, etc.]

## Calendrier procédural TJ Paris

| Étape | Délai estimé | Action |
|---|---|---|
| Mode `--attack` : assignation | J+0 | Notre avocat dépose |
| Notification défendeur | J+0 + 1-2 sem | Auto (huissier) |
| Conclusions en défense (titulaire brevet) | J+0 + 2-3 mois | Titulaire dépose ou non |
| Conclusions en réplique (notre cabinet) | J+0 + 4-5 mois | Itération écritures |
| Mise en état (JME) : ordonnance d'expertise éventuelle | J+0 + 5-8 mois | JME décide |
| Ordonnance de clôture JME | J+0 + 8-12 mois | Mise en état close |
| Audience de plaidoirie | J+0 + 12-18 mois | Plaidoirie 3e chambre brevets |
| Jugement | J+0 + 13-21 mois | Notification par greffe |
| Recours Cour d'appel Paris (effet suspensif) | Décision + 1 mois | Si opportun |
| Cour de cass. com. (cassation) | CA + 2 mois | Sur points de droit uniquement |

**Note** : décision de nullité totale = brevet effacé **erga omnes**
(vis-à-vis de tous, pas seulement les parties à l'instance). Effet
rétroactif `ex tunc` (le brevet est réputé n'avoir jamais existé).

## Recommandation préliminaire

[1-3 phrases de synthèse stratégique — ex : "Action en nullité
recommandée mode --attack ciblé : motif principal L.611-11 défaut de
nouveauté sur citation FR1900456 (force 🟢). Budget estimé 50-80 k€,
durée 13-18 mois. Risque résiduel : contestation expertise par
titulaire — prévoir double avis expert. Alternative à évaluer :
opposition OEB si délai 9 mois encore ouvert (coût 3-5 k€)."]

**Une question hors de ma checklist :** [observation seconde-ordre —
ex : "Vérifier si le titulaire a divulgué l'invention dans une
conférence professionnelle avant la date de priorité — la divulgation
propre antérieure non couverte par le délai de grâce L.611-13 serait
un motif supplémentaire de nullité." — omis si rien]

## Que veux-tu faire ?

1. **Itérer l'argumentation** — j'affine les motifs retenus, ajoute des pièces, prépare l'anticipation détaillée de la défense du titulaire
2. **Escalader** — je rédige une note d'escalade pour [approbateur tiré du profil : mandataire EQE / avocat spécialisé brevets / direction juridique] avec faits-clés, risque et décision attendue
3. **Compléter la recherche art antérieur** — élargir sources (Google Patents si V2.1.1 dispo, NPL pertinente par domaine, conférences professionnelles, sites web archivés Wayback Machine)
4. **Négocier transaction** — préparer l'alternative à l'action contentieuse : licence inverse, coexistence négociée, rachat brevet, si action nullité jugée trop risquée ou coûteuse au regard du blocage business réel
5. **Autre chose** — dis-moi
`````

---

## Gate non-juriste

Si le rôle utilisateur lu en intake est **non-juriste** (chef de
produit, R&D, direction technique, juriste interne sans inscription),
intercaler avant la livraison du document :

> Cette argumentation est un préparatoire, pas une procédure judiciaire
> formelle. Engager une action en nullité ou répondre à une action en
> contrefaçon sans validation mandataire EQE ou avocat spécialisé
> brevets a des conséquences juridiques majeures :
>
> - **Nullité ratée** = dépens lourds (CPC 696) + risque action en
>   concurrence déloyale (Code civil 1240) si attaque jugée abusive
> - **Défense bâclée** = condamnation contrefaçon + dommages-intérêts
>   intégraux (CPI L.615-7 — réparation intégrale du préjudice +
>   atteinte morale + bénéfices indus tirés de la contrefaçon)
> - **Mauvaise stratégie** = perte du brevet en cascade pour notre
>   propre portefeuille (un déposant qui attaque un brevet voisin
>   s'expose à voir son propre brevet attaqué en retour)
>
> Voici un brief à apporter au mandataire EQE / avocat :
>
> [résumé 1 page reformulant les éléments clés : brevet cible (numéro,
> titulaire, statut) + mode (--attack nullité préventive ou --defense
> face contrefaçon) + art antérieur identifié (force globale 🟢/🟡/🔴
> + 2-3 citations clés) + motifs L.613-25 retenus (force par motif) +
> recommandation préliminaire (action / opposition OEB / négociation)
> + 3 questions critiques pour le mandataire :
> 1. "L'art antérieur FR1900456 divulgue-t-il VRAIMENT toutes les
>    caractéristiques de la revendication 1 ou seulement les
>    essentielles ? Une expertise technique préalable est-elle
>    indispensable avant assignation ?"
> 2. "L'argument L.612-6 sur le terme 'essentiellement' tient-il
>    debout sans expertise linguistique de comparaison A1 vs B1 ?
>    Vaut-il la peine d'être maintenu en motif subsidiaire ou risque-t-il
>    d'affaiblir l'argumentation principale ?"
> 3. "Vaut-il mieux nullité partielle ciblée (rev. 1 seule, sécurité)
>    ou totale risquée (rev. 1-12, effet erga omnes maximal mais charge
>    probatoire lourde) au regard de notre intérêt business réel ?"]
>
> **Annuaires officiels** :
> - **INPI — Conseils en propriété industrielle** (mandataires en
>   brevets CPI L.422-4) : https://www.inpi.fr/conseils-en-propriete-industrielle
> - **OEB — Liste Mandataires Européens** (EQE qualifiés CBE) :
>   https://www.epo.org/learning/eqe.html
> - **Conseil National des Barreaux** (avocats spécialisés brevets,
>   TJ Paris habilités) : https://www.avocat.fr — filtrer par spécialité
>   "propriété intellectuelle" et barreau de Paris

Si rôle utilisateur = mandataire EQE ou avocat spécialisé brevets,
ne pas intercaler ce gate (gain de temps, le professionnel sait
identifier ses propres limites). Conserver toutefois le bloc
garde-fou en tête d'output.

---

## Emplacement de sortie

Écrire le document Markdown à :

```
~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/invalidite-<brevet-cible>-YYYY-MM-DD.md
```

Format du nom de fichier : `invalidite-<numéro-brevet>-<date>.md`
(ex : `invalidite-FR2700123-2026-05-16.md`,
`invalidite-EP3456789-2026-05-16.md`). Si plusieurs itérations le
même jour, suffixer `-v2`, `-v3`, etc.

Si l'emplacement n'est pas accessible (plugin installé en scope
projet sans répertoire config étendu), retomber sur le répertoire
courant et l'indiquer dans la note du relecteur.

Quand workspaces de dossier (V1.1) activés : écrire dans
`matters/<slug-dossier>/invalidite-<brevet-cible>-YYYY-MM-DD.md`.

---

## Ce que ce skill NE fait PAS

À rappeler explicitement quand l'utilisateur demande au-delà du
périmètre :

- **Former l'action en nullité** (= démarche TJ Paris formelle via
  avocat habilité, dépôt assignation, constitution avocat, paiement
  consignation timbre fiscal)
- **Plaider en audience TJ Paris** (avocat constitué requis L.615-1
  CPI, plaidoirie en 3e chambre brevets, exposé oral devant collège)
- **Négocier une transaction** (licence inverse, coexistence, rachat
  brevet, partage de marché — négociation business + juridique
  nécessitant avocat + direction commerciale)
- **Évaluer les dommages-intérêts** (CPI L.615-7 — calcul de la
  réparation intégrale : préjudice économique + atteinte morale +
  bénéfices indus tirés de la contrefaçon, méthode "triple base" ou
  "redevance indemnitaire" — relève de l'avocat avec éventuel expert
  comptable)
- **Gérer les recours Cour d'appel Paris** (procédure d'appel
  spécifique brevets, effet suspensif, ré-examen au fond — voir
  `contentieux-pi`)
- **Pourvoi Cour de cass. com.** (cassation sur points de droit
  uniquement, mandataire spécialisé Cour de cass. requis — Ordre
  des avocats au Conseil d'État et à la Cour de cassation)
- **Garantir le résultat** (la qualification de la nullité relève
  exclusivement des juridictions du fond et de leur appréciation
  souveraine des preuves)
- **Action en concurrence déloyale parallèle** (si le titulaire du
  brevet attaqué a usé du brevet de manière abusive ou frauduleuse,
  l'avocat évalue art. 1240 Code civil — action distincte mais
  cumulable avec la nullité)
- **Action en revendication de propriété L.611-8 CPI** (si le brevet
  cible nous appartient en réalité — voie distincte de la nullité,
  potentiellement plus avantageuse si applicable)

---

## Ton

- **Technique et rigoureux** : maîtrise du vocabulaire brevet (art
  antérieur destructeur, caractéristique technique, homme du métier,
  closest prior art, motivation combinatoire, généralisation
  intermédiaire) — le mandataire / avocat le lit en 15 minutes et ne
  doit pas trébucher sur des approximations
- **Équilibré** : présenter les **forces du brevet attaqué AVANT** ses
  faiblesses. Anticiper la défense du titulaire à chaque motif retenu
  (ne pas l'omettre — c'est ce que le juge regardera). Une
  argumentation qui ne discute pas la défense adverse est suspecte
  pour un professionnel
- **Sobre sur la jurisprudence** : citer 1-2 décisions clés par motif,
  pas une dissertation. Toutes les citations jurisprudentielles
  taguées `[connaissance modèle — à vérifier]` par défaut, avec
  invitation explicite à vérifier sur Légifrance / base TJ Paris
  avant transmission externe
- **Posture porte à deux sens** : marquer les motifs faibles 🔴 ou
  `[review]` — laisser le mandataire / avocat trancher s'il les
  retient ou les abandonne. Ne JAMAIS décider tacitement à la place
  du professionnel
- **Cibler le brief 15 minutes** : la note du relecteur + le triage
  + le tableau d'art antérieur + les motifs retenus avec force =
  l'essentiel doit tenir sur 2 pages lisibles en 15 minutes par un
  mandataire EQE pressé. Le reste est de l'argumentaire détaillé pour
  exploitation ultérieure

---
