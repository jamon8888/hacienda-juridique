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
