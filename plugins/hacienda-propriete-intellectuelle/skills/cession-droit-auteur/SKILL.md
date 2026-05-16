---
name: cession-droit-auteur
description: >
  Préparation d'un contrat de cession de droits patrimoniaux d'auteur conforme
  CPI L.131-3 (écrit obligatoire + énumération droits cédés + domaines
  d'exploitation + territoires + durée + rémunération). Gère cession totale
  vs partielle, exclusive vs non-exclusive, présente vs future, contextes
  commande / salarié / partenariat. NE signe PAS le contrat — validation
  avocat spécialisé PI + parties au contrat requise. Le droit moral
  (L.121-1) reste TOUJOURS à l'auteur (perpétuel, inaliénable, imprescriptible).
argument-hint: "[oeuvre slug | type cession totale/partielle | contexte commande/salarié/partenariat]"
---

# /cession-droit-auteur

**Préparation projet ≠ signature.** Ce skill produit un **brouillon de
contrat de cession** à valider et signer par l'avocat spécialisé PI + les
parties. Il NE signe PAS, NE garantit PAS la validité finale, NE remplace
PAS l'avocat. **CPI L.131-3 impose des conditions cumulatives strictes** :
écrit obligatoire + **énumération précise** des droits cédés (reproduction,
représentation, adaptation, distribution) + **domaines d'exploitation**
(presse, édition, audiovisuel, numérique, etc.) + **territoires** (France,
EU, monde) + **durée** (jusqu'à 70 ans post mortem max ou inférieure) +
**rémunération** (proportionnelle aux recettes en principe — forfait
exceptionnel L.131-4). **L'omission d'une seule condition entraîne la
nullité partielle ou totale**. Le **droit moral (L.121-1) reste TOUJOURS
à l'auteur** : perpétuel, inaliénable, imprescriptible — aucune clause ne
peut le céder.

## Examples

```
/hacienda-propriete-intellectuelle:cession-droit-auteur "logo APEXLEAF — cession totale exclusive monde — commande agence design"
```

```
/hacienda-propriete-intellectuelle:cession-droit-auteur
```

(Le skill demandera l'œuvre concernée, le cédant, le cessionnaire, le type
de cession envisagé, le contexte commande/salarié/édition/audiovisuel/
standard, et la rémunération envisagée.)

```
/hacienda-propriete-intellectuelle:cession-droit-auteur "roman 'Mémoires de l'aube' — cession contrat édition — auteur personne physique unique → maison édition"
```

---

## PRÉPARATION PROJET, PAS SIGNATURE

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Préparation projet, pas signature.** Ce brouillon est un **projet de
> contrat de cession** de droits patrimoniaux d'auteur articulé autour des
> conditions cumulatives de l'article L.131-3 du Code de la propriété
> intellectuelle. Il NE remplace PAS la rédaction et la validation finale
> par un **avocat spécialisé en propriété intellectuelle**, ni la relecture
> par les parties (cédant et cessionnaire). L'article L.131-3 CPI impose
> **cinq conditions cumulatives sous peine de nullité partielle ou totale** :
> (a) **énumération précise** de chacun des droits cédés (reproduction,
> représentation, adaptation, distribution, exploitation numérique — pas
> de mention générique « tous droits »), (b) **domaines d'exploitation
> listés explicitement** (édition imprimée, audiovisuel, numérique, etc.),
> (c) **territoires** (France, Union européenne, monde, pays spécifiques),
> (d) **durée** (jusqu'à 70 ans post mortem maximum ou durée inférieure
> déterminée), (e) **rémunération** — proportionnelle aux recettes
> d'exploitation par principe (L.131-4), forfaitaire uniquement dans les
> cas exceptionnels limitativement énumérés (L.131-4 al. 2). L'omission
> d'une seule de ces conditions entraîne la nullité de la clause concernée,
> et parfois du contrat entier. **Le droit moral de l'auteur (L.121-1) est
> perpétuel, inaliénable et imprescriptible** — aucune clause contractuelle
> ne peut le céder, et tout contrat de cession doit comporter un engagement
> exprès du cessionnaire de respecter l'intégrité de l'œuvre, le droit à
> la paternité (mention du nom), le droit de divulgation et le droit de
> repentir. **Cession d'œuvres futures globalement = NULLE** (L.131-1)
> sauf exception du contrat d'édition (L.132-4, limitée à 5 œuvres ou 5
> ans). Une cession mal rédigée se traduit par une nullité opposable par
> l'auteur ou ses ayants droit, parfois des décennies après la signature,
> avec restitution des recettes d'exploitation perçues. Ce skill propose
> un canevas ; l'avocat l'adapte, le complète et le valide ; les parties
> signent.

C'est le garde-fou le plus visible du skill. Un contrat de cession finalisé
sans relecture avocat = porte à sens unique (nullité possible, restitution
des recettes, contentieux long). Sur-flagger = porte à 2 sens, l'avocat
élague. Rester sur la porte à 2 sens.

---

## Charger le profil pratique avant de commencer

Avant tout, lire :
1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Récupérer :
- **Rôle** depuis `## 1. Profil cabinet et profil de pratique PI` (avocat
  inscrit / mandataire en marques INPI L.422-4 / juriste interne / non-juriste).
  Change l'en-tête confidentialité ET la formulation des avertissements en
  pied de brouillon. Active le **gate non-juriste** si l'utilisateur n'est
  ni avocat inscrit ni juriste interne — le brouillon est alors reformaté
  en **brief avocat** (cf. section dédiée).
- **Pratique droit d'auteur** : édition / audiovisuel / logiciel SaaS /
  design / mode / publicité / multimédia / transversal → calibre les
  exemples, les domaines d'exploitation par défaut et les clauses
  recommandées (un contrat édition n'a pas les mêmes articles qu'un
  contrat de cession audiovisuelle).
- **Posture conseil** : préventif (avant exploitation) / réactif (sur
  contestation) / contentieux (action en cours) → conditionne le niveau
  d'agressivité des clauses de garantie d'éviction et d'audit, ainsi que
  la rédaction de la clause de résolution des litiges.
- **Position défaut cession auteur de commande** :
  - *cession totale étendue 70 ans* → clauses droits + domaines + territoires
    + durée maximales par défaut, à élaguer si non justifié
  - *cession limitée par durée + territoire + médias* → clauses calibrées
    sur l'usage effectif anticipé
  - *case par case* → questionnaire détaillé sur l'usage prévu avant de
    proposer un premier jet
- **Position défaut clauses droit moral** :
  - *adaptation autorisée signaler* → clause prévoit notification du
    cessionnaire au cédant avant modification substantielle
  - *modifications soumises validation* → clause d'accord exprès préalable
    écrit du cédant pour toute modification
  - *strictement préservé* → clause interdiction de toute modification +
    mention obligatoire du nom de l'auteur sur tout support
- **Approbateur cession droits** depuis la matrice (avocat seul / avocat +
  Direction marketing / avocat + GC) → identifié dans la section « Étapes
  suivantes » du brouillon et dans le brief gate non-juriste.

Si le profil contient `[A CONFIGURER]` sur les clés `Pratique droit
d'auteur`, `Posture conseil`, `Position défaut cession auteur de commande`,
`Position défaut clauses droit moral` ou `Approbateur cession droits`,
surfacer :

> Le profil pratique « droit d'auteur » n'est pas configuré — c'est ce qui
> calibre la largeur initiale des clauses (durée, territoires, domaines)
> et la chaîne d'approbation à ton cabinet ou ton service.
>
> **Deux choix :**
> 1. **Lance `/hacienda-propriete-intellectuelle:entretien-demarrage`**
>    (10-15 minutes) — c'est ce qui rend les brouillons réellement utiles.
> 2. **Continue en mode provisoire** — je produis un projet de contrat
>    avec des valeurs par défaut prudentes (cession limitée 5 ans monde,
>    rémunération proportionnelle 10 % des recettes nettes, droit moral
>    strictement préservé) et un en-tête `NOTES DE TRAVAIL — profil non
>    configuré`. Tu réviseras les paramètres avant relecture avocat.

Mode provisoire : produire malgré tout, mais marquer en tête `[profil non
configuré — défauts prudents]` et lister les hypothèses retenues dans la
note du relecteur.

---

## Intake

Recueillir les éléments suivants avant de bâtir le projet de contrat. Si
l'utilisateur ne fournit pas tout, demander avant de produire le brouillon
— **ne jamais inventer une partie, une œuvre ou une rémunération**.

**1. Œuvre concernée** :
- Titre + nature (texte / image / photo / musique / vidéo / logiciel /
  base de données / œuvre composite / œuvre collective / œuvre de
  collaboration)
- **Référence à qualification préalable** : exécuter d'abord
  `/hacienda-propriete-intellectuelle:qualification-oeuvre` est **fortement
  recommandé** — une cession sur une « œuvre » qui ne franchit pas le seuil
  d'originalité (L.111-1, critère CJUE Infopaq) cède du vide. Si la
  qualification n'a pas été faite, le signaler en note du relecteur et
  proposer de la lancer avant d'aller plus loin.
- Description précise (suffisamment pour identification sans ambiguïté
  dans 30 ans) + supports (manuscrit, fichiers source, format, hash si
  numérique horodaté via `/hacienda-propriete-intellectuelle:depot-preuve-creation`)
- Date de création (pour calcul durée 70 ans post mortem, et pour étayer
  l'antériorité en cas de contestation)

**2. Cédant (auteur ou ayant droit)** :
- **Personne physique unique** : nom complet + état civil + adresse + (si
  applicable) régime matrimonial (les droits patrimoniaux d'auteur sont
  propres mais les recettes peuvent entrer dans la communauté — flag
  `[review]` si profil patrimonial du cédant inconnu)
- **Personnes physiques multiples** (œuvre de collaboration L.113-3) :
  tous les coauteurs doivent signer — un seul signataire ne peut céder
  les droits indivis sauf mandat exprès. Lister tous les coauteurs et
  prévoir signature de chacun ou mandat signé.
- **Personne morale** : possible uniquement pour œuvre collective (L.113-2
  + L.113-5 — l'initiateur personne morale est titulaire ab initio) ou
  pour cession en chaîne (le cédant a lui-même reçu une cession antérieure).
  Vérifier la chaîne de titularité — si le cédant est personne morale et
  qu'on est sur une œuvre de collaboration ou une œuvre simple, **flag 🔴
  risque de nullité pour défaut de qualité à céder**.
- **Ayants droit** (cédant décédé) : héritiers + légataires éventuels +
  exécuteur testamentaire. Pour le droit moral spécifiquement, dévolution
  L.121-1 al. 4 et L.121-2 (ordre légal : enfants, légataires universels,
  ascendants, autres héritiers).

**3. Cessionnaire** :
- Personne physique : nom + état civil + adresse
- Personne morale : raison sociale + forme + SIREN + adresse siège +
  représentant légal (nom + qualité)
- Secteur d'activité (oriente la définition des domaines d'exploitation
  pertinents)
- **Usage prévu** : exploitation propre / sous-cession à des tiers /
  intégration dans œuvre composite / archivage. Conditionne la nécessité
  d'une clause de sous-cession explicite.

**4. Type de cession** :
- **Totale** (tous droits patrimoniaux L.122-1 à L.122-12) vs **Partielle**
  (droits sélectionnés — par défaut, l'interprétation stricte L.131-3
  s'applique : ce qui n'est pas cédé reste à l'auteur)
- **Exclusive** (cessionnaire seul exploite dans le périmètre) vs
  **Non-exclusive** (cédant peut continuer ou céder à d'autres)
- **Présente** (œuvre existante identifiée) vs **Future** — ⚠️ la
  cession globale d'œuvres futures est NULLE (L.131-1), sauf exception du
  contrat d'édition (L.132-4, max 5 œuvres ou 5 ans). Si l'utilisateur
  demande une cession portant sur des œuvres futures hors contrat
  d'édition, **stopper et proposer une licence-cadre + cessions au cas par
  cas** plutôt qu'une cession globale nulle.

**5. Contexte** :
- **Standard** (cession isolée entre parties indépendantes)
- **Commande** (le cessionnaire a commandé l'œuvre au cédant — pas
  d'automaticité, cession écrite obligatoire)
- **Salarié** (hors logiciel L.113-9) — pas d'automaticité sauf clause
  expresse du contrat de travail ou convention collective ; pour les
  œuvres logicielles L.113-9, la dévolution à l'employeur est automatique
  → renvoyer vers `/hacienda-propriete-intellectuelle:logiciels-pi`
- **Contrat d'édition** (L.132-1 à 17) — régime spécifique : obligation
  d'exploitation, reddition de comptes, résiliation pour non-exploitation,
  formes solennelles
- **Production audiovisuelle** (L.132-23 à 31) — présomption de cession
  au producteur (L.132-24), sauf composition musicale ; régime contractuel
  spécifique
- **Partenariat** (coproduction, cocréation) — souvent licence croisée
  plutôt que cession

**6. Rémunération envisagée** :
- **Proportionnelle aux recettes** (principe L.131-4) : taux + assiette
  + modalités de versement + audit
- **Forfaitaire** (cas exceptionnels limités L.131-4 al. 2) : justification
  du cas d'exception applicable (base de calcul indéterminable, coûts
  vérification disproportionnés, nature de l'exploitation, contribution
  intégrée œuvre composite/collective, cession de logiciel, réimpressions
  techniques en édition). Si aucun cas d'exception ne s'applique
  clairement, **flag 🔴 risque de requalification + lésion L.131-5**.
- **Mixte** (avance forfaitaire à valoir sur redevances proportionnelles)
  — combine sécurité de trésorerie auteur + équité long terme

Si l'un de ces six blocs est incomplet, lister les questions ouvertes
dans la note du relecteur et soit demander à l'utilisateur, soit produire
le brouillon avec hypothèses prudentes tagguées `[hypothèse — à
confirmer]`.

---

## Étape 1 — Vérification d'éligibilité (CPI L.131-1 et L.131-2)

Avant même de structurer le contrat, vérifier que la cession projetée
n'est pas frappée d'une interdiction de principe et qu'elle respecte la
forme requise. Ces vérifications sont en amont des conditions cumulatives
L.131-3 — elles conditionnent l'existence même d'une cession valide.

### 1.1 L.131-1 — Interdiction de la cession globale d'œuvres futures

> *Article L.131-1 CPI :* « La cession globale des œuvres futures est nulle. »

**Règle.** Une convention par laquelle un auteur cède en bloc, par avance,
l'ensemble des œuvres qu'il créera dans le futur est NULLE, d'une nullité
absolue. Cette protection est d'ordre public — l'auteur ne peut pas y
renoncer même expressément.

**Exceptions admises :**
- **Contrat d'édition** (L.132-4) : possible pour les œuvres futures d'un
  genre nettement déterminé, **limité à cinq œuvres ou cinq ans** (le
  premier des deux atteints met fin à l'engagement).
- **Cession d'œuvres déterminables** : la jurisprudence admet la cession
  d'œuvres futures **individuellement identifiées ou identifiables** (par
  exemple : « les 10 illustrations de la collection automne-hiver 2026 »).
  La frontière entre « cession globale » (nulle) et « cession d'œuvres
  déterminables » (valable) est étroite — flag `[review]` si le périmètre
  des œuvres futures n'est pas strictement borné par un critère objectif
  (titre, genre + délai court, livrable défini par bon de commande).
- **Œuvres collectives** (L.113-2 + L.113-5) : l'initiateur personne morale
  est titulaire ab initio — pas de cession « d'œuvres futures » à proprement
  parler, mais une dévolution originelle.
- **Œuvres de salariés-développeurs logiciel** (L.113-9) : dévolution
  automatique à l'employeur, hors champ L.131-1.

**Test pratique :** la cession projetée porte-t-elle sur :
- (a) une œuvre identifiée existante → OK ;
- (b) une œuvre commandée précisément définie (cahier des charges +
  livrable identifié) → OK ;
- (c) « toutes les œuvres futures » du cédant ou « toutes les œuvres
  créées dans le cadre du partenariat » sans plafond → 🔴 NULLITÉ
  L.131-1, refuser de produire le contrat tel quel et proposer un montage
  alternatif (licence-cadre + cessions individuelles au fil de l'eau,
  contrat d'édition L.132-4 si applicable).

### 1.2 L.131-2 — Forme écrite obligatoire

> *Article L.131-2 CPI :* « Les contrats de représentation, d'édition
> et de production audiovisuelle [...] doivent être constatés par écrit.
> Il en est de même des autorisations gratuites d'exécution. [...] Dans
> tous les autres cas, les dispositions des articles 1359 à 1362 du code
> civil sont applicables. »

**Règle.** Pour les contrats de **représentation, d'édition, de production
audiovisuelle** et pour les **autorisations gratuites d'exécution**, la
forme écrite est imposée à peine de nullité — c'est une condition de
validité (*ad validitatem*), pas seulement de preuve.

**Pour les autres contrats de cession** (cession isolée, cession dans le
cadre d'une commande hors édition/audiovisuel, etc.), l'écrit est exigé
*ad probationem* (régime de droit commun art. 1359 du code civil — preuve
par écrit au-delà de 1 500 €), avec une jurisprudence stricte qui exige
en pratique un écrit pour toute cession non gracieuse compte tenu de
l'enjeu L.131-3.

**Conséquence pratique pour ce skill :** dans tous les cas, produire un
écrit signé par les deux parties. Une cession orale ou implicite —
notamment via une facture muette sur la cession — laisse le cessionnaire
sans titre opposable. **Une facture qui mentionne seulement « création
d'un logo » SANS clause de cession explicite ne transfère AUCUN droit
patrimonial** (jurisprudence constante depuis Cour de cass. 1re civ. 13
nov. 2008) : le commanditaire a payé la prestation, pas les droits.

### 1.3 L.131-4 — Principe de la rémunération proportionnelle

> *Article L.131-4 al. 1 CPI :* « La cession par l'auteur de ses droits
> sur son œuvre peut être totale ou partielle. Elle doit comporter au
> profit de l'auteur la participation proportionnelle aux recettes
> provenant de la vente ou de l'exploitation. »

**Règle.** La rémunération de l'auteur doit en principe être
**proportionnelle aux recettes** d'exploitation. Le forfait n'est admis
que dans les cas limitativement énumérés par l'alinéa 2 :
- (a) la base de calcul de la participation proportionnelle ne peut être
  pratiquement déterminée ;
- (b) les moyens de contrôle font défaut ;
- (c) les frais des opérations de calcul et de contrôle sont hors de
  proportion avec les résultats à atteindre ;
- (d) la nature ou les conditions de l'exploitation rendent impossible
  l'application de la règle de la rémunération proportionnelle ;
- (e) la contribution de l'auteur ne constitue pas un élément essentiel
  de la création intellectuelle de l'œuvre ;
- (f) en cas de cession des droits portant sur un **logiciel** ;
- (g) cas spécifiques en édition (réimpressions techniques sans modification).

Le forfait peut aussi résulter de la cession à titre gratuit (donation,
hors scope de ce skill — régime notarié).

**Conséquence pratique.** Si le contrat envisagé prévoit un forfait sans
qu'aucun cas d'exception ne s'applique clairement, **🔴 risque de nullité
de la clause de rémunération + action en révision pour lésion (L.131-5)**.
Le skill doit alors soit reformuler en rémunération proportionnelle, soit
documenter explicitement le cas d'exception applicable et flagger pour
relecture avocat.

### 1.4 L.131-5 — Action en révision pour lésion ou prévision insuffisante

> *Article L.131-5 CPI :* « En cas de cession du droit d'exploitation,
> lorsque l'auteur aura subi un préjudice de plus de sept douzièmes dû à
> une lésion ou à une prévision insuffisante des produits de l'œuvre, il
> pourra provoquer la révision des conditions de prix du contrat. »

**Règle.** Lorsqu'une rémunération forfaitaire (ou même proportionnelle
mais sous-évaluée à l'origine) cause à l'auteur un **préjudice supérieur
à 7/12** par rapport aux recettes effectivement perçues par le
cessionnaire, l'auteur peut agir en révision judiciaire. Délai de
prescription : **5 ans** à compter de la cession (jurisprudence
majoritaire, à confirmer selon évolution Cour de cassation
`[connaissance modèle — à vérifier]`).

**Conséquence pratique.** Un forfait modeste sur une œuvre qui devient
un succès commercial expose le cessionnaire à une action en révision
plusieurs années après. Atténuation :
- privilégier la rémunération proportionnelle (immune par construction) ;
- si forfait imposé, prévoir une clause de **revoyure** ou de **complément
  de prix** au-delà d'un certain seuil de recettes (volontairement, pour
  désamorcer L.131-5) ;
- documenter à la signature les hypothèses de recettes envisagées (pour
  étayer l'absence de lésion en cas de contestation ultérieure).

### 1.5 Synthèse étape 1

Avant de passer à l'identification des parties et à l'énumération
L.131-3, produire un **mini-tableau de vérification** :

| Critère | Statut | Note |
|---|---|---|
| L.131-1 — pas de cession globale d'œuvres futures | ✓ / 🔴 | [périmètre œuvres défini] |
| L.131-2 — forme écrite prévue | ✓ | [contrat signé par les deux parties] |
| L.131-4 — rémunération proportionnelle OU exception qualifiée | ✓ / 🟡 / 🔴 | [cas applicable si forfait] |
| L.131-5 — risque lésion 7/12 documenté | ✓ / 🟡 | [hypothèses recettes / clause revoyure] |

Tout flag 🔴 doit être résolu (reformulation contrat ou abandon) avant
de passer à l'étape suivante. Tout flag 🟡 doit être tracé dans la note
du relecteur et porté à l'attention de l'avocat.

---

## Étape 2 — Identification précise des parties et de l'œuvre

L'identification doit être suffisamment précise pour qu'un tiers (juge,
nouvel acquéreur, ayant droit) puisse, vingt ans plus tard, savoir qui
a cédé quoi à qui. Toute ambiguïté est interprétée en faveur de l'auteur
(principe d'interprétation stricte des cessions — voir
`references/jurisprudence-cession.md`).

### 2.1 Identification du cédant

**Cédant personne physique :**
- Nom de naissance + nom d'usage + prénoms (tous)
- Date et lieu de naissance (pour calcul durée 70 ans post mortem et
  pour distinction homonymie)
- Nationalité (impacte la durée de protection si l'auteur n'est pas
  ressortissant d'un État signataire de Berne)
- Adresse de domicile complète
- (Optionnel) profession, numéro AGESSA / Maison des artistes / URSSAF
  artistes-auteurs pour les régimes spécifiques

**Cédant personnes physiques multiples (œuvre de collaboration L.113-3) :**
- Identification individuelle de chaque coauteur
- **Tous doivent signer** — un coauteur seul ne peut pas céder les
  droits indivis (L.113-3 al. 3 : « les coauteurs doivent exercer leurs
  droits d'un commun accord »)
- Si un coauteur signe au nom des autres : joindre **mandat exprès et
  écrit** de chacun, sous peine d'inopposabilité de la cession aux
  coauteurs non signataires (cession partielle = nullité de la cession
  des droits du coauteur non signataire)

**Cédant personne morale :**
- Raison sociale + forme juridique + capital + SIREN + adresse du siège
- Représentant légal : nom + prénom + qualité (président, gérant,
  directeur général) + qualité pour engager (extrait Kbis < 3 mois
  recommandé en annexe)
- **Vérifier la qualité à céder** : la personne morale est-elle bien
  titulaire des droits qu'elle prétend céder ?
  - Œuvre collective L.113-2 + L.113-5 : oui, titulaire ab initio →
    OK
  - Œuvre de salarié (hors logiciel L.113-9) : NON, sauf clause de
    cession dans contrat de travail (à exiger en annexe pour vérification)
    → flag 🟡 risque de défaut de titularité
  - Œuvre de logiciel L.113-9 : oui, dévolution automatique à l'employeur
    → OK
  - Œuvre commandée à un prestataire externe : NON sans cession écrite
    antérieure → exiger la cession initiale en annexe ou flag 🔴
  - Cession en chaîne : exiger l'historique des cessions antérieures
    (annexe « chaîne de titularité »)

**Cédant ayants droit (auteur décédé) :**
- Identification de l'ensemble des héritiers + légataires
- Acte de notoriété ou attestation notariée prouvant la dévolution
  successorale
- **Pour le droit moral spécifiquement** : dévolution L.121-1 al. 4 et
  L.121-2 (ordre : enfants → légataires universels → ascendants → autres
  héritiers selon les attributs) — ce sont eux qui devront être consultés
  pour tout acte affectant l'œuvre, indépendamment des cessionnaires des
  droits patrimoniaux.

### 2.2 Identification du cessionnaire

Mêmes exigences d'identification que pour le cédant.
- Personne morale : raison sociale + forme + SIREN + siège + représentant
  + qualité.
- Mention du secteur d'activité et de l'usage prévu — utile pour
  l'interprétation ultérieure du périmètre des droits cédés et des
  domaines d'exploitation.

### 2.3 Identification de l'œuvre cédée

- **Titre** définitif (si l'œuvre est titrée) ou titre provisoire avec
  mention « ou tout autre titre que les parties retiendront d'un commun
  accord »
- **Nature** : préciser le genre (texte littéraire, photographie, dessin,
  logiciel, composition musicale, scénario, œuvre audiovisuelle, etc.)
- **Description précise** :
  - Pour une œuvre écrite : nombre de signes ou de pages, langue,
    structure (chapitres, sections)
  - Pour une œuvre graphique : format, dimensions, technique, support
  - Pour une photographie : sujet, date et lieu de prise de vue,
    formats numériques disponibles, modèles photographiés (si oui, joindre
    autorisations droit à l'image en annexe)
  - Pour un logiciel : langage, modules, version, dépendances
    open source (renvoi `/hacienda-propriete-intellectuelle:logiciels-pi`)
  - Pour une œuvre audiovisuelle : durée, format, langue version
    originale
- **Supports remis** : manuscrit, fichiers numériques (formats + hash
  SHA-256 si possible), tirages, etc.
- **Date de création** ou de finalisation
- **Annexes recommandées** : copie ou exemplaire de référence de l'œuvre
  (paraphée par les parties) — sécurise l'identification en cas de
  contestation ultérieure sur le périmètre

### 2.4 Garanties du cédant (clause de garantie d'éviction)

Clause critique souvent négligée. Le cédant garantit :
- **Titularité** : il est bien titulaire des droits qu'il cède (originalité
  + qualité d'auteur ou chaîne de cessions valides)
- **Originalité** : l'œuvre est originale au sens L.111-1 et ne reproduit
  pas une œuvre antérieure préexistante (sauf citation, parodie ou
  utilisation libre relevant des exceptions L.122-5)
- **Absence d'éviction** : aucun tiers ne peut revendiquer de droits sur
  l'œuvre (pas de cession antérieure contradictoire, pas de coauteur
  non identifié, pas d'élément intégré violant des droits de tiers —
  marque, droit à l'image, vie privée, image des biens, droits voisins)
- **Indemnisation** : engagement d'indemniser le cessionnaire en cas
  d'action en contrefaçon ou en revendication par un tiers, avec un
  plafond négocié (souvent prix de cession + frais de défense)

Cette clause n'absout pas le cessionnaire d'une **due diligence
raisonnable** (vérification d'antériorité, recherche de marques voisines
si l'œuvre fonctionne comme signe distinctif, vérification des
autorisations modèles pour photographies).

---

## Étape 3 — Énumération des droits cédés : CONDITIONS CUMULATIVES L.131-3

**Cœur du skill.** L'article L.131-3 CPI impose **cinq conditions
cumulatives** à toute cession de droits patrimoniaux d'auteur. **L'omission
d'une seule condition entraîne la nullité de la clause concernée**, et
parfois du contrat entier. Cette règle est d'ordre public — elle ne peut
pas être contournée par accord des parties.

> *Article L.131-3 al. 1 CPI :* « La transmission des droits de l'auteur
> est subordonnée à la condition que chacun des droits cédés fasse l'objet
> d'une mention distincte dans l'acte de cession et que le domaine
> d'exploitation des droits cédés soit délimité quant à son étendue et à
> sa destination, quant au lieu et quant à la durée. »

La jurisprudence (Cour de cass. 1re civ. 21 nov. 2006) étend ces
exigences aux **licences** également, dès lors qu'elles emportent
autorisation d'exploitation — voir `/hacienda-propriete-intellectuelle:licence-droit-auteur`
(V4.1).

### 3.1 Condition (a) — Énumération précise des droits cédés

**Règle.** Chacun des droits cédés doit faire l'objet d'une **mention
distincte**. La mention générique « tous droits d'exploitation » ou « tous
droits patrimoniaux » est insuffisante et frappée de nullité (Cour de
cass. 1re civ. 13 nov. 2008 — interprétation stricte). Il faut **lister
chaque droit cédé**.

Les droits patrimoniaux à énumérer individuellement :

- **Droit de reproduction (L.122-3)** : fixation matérielle de l'œuvre
  par tous procédés permettant de la communiquer au public de manière
  indirecte. Sous-droits à préciser :
  - reproduction graphique (impression, gravure, sérigraphie)
  - reproduction photographique
  - reproduction mécanique (CD, vinyle, DVD)
  - reproduction numérique / encodage / fichiers
  - reproduction par tout procédé connu ou inconnu à ce jour (clause
    de cession des modes d'exploitation futurs — admise sous réserve
    de spécifier la **destination commerciale** envisagée)

- **Droit de représentation (L.122-2)** : communication directe au
  public. Sous-droits :
  - récitation publique, lecture publique
  - représentation dramatique, exécution lyrique
  - projection publique (cinéma)
  - télédiffusion (TV hertzien, satellite, câble)
  - diffusion radiophonique
  - communication au public par réseaux numériques (streaming,
    téléchargement, mise à disposition à la demande)

- **Droit d'adaptation, de traduction, de transformation (L.122-4)** :
  œuvres dérivées. Sous-droits :
  - traduction (langues à lister)
  - adaptation pour autre média (livre → film, BD → roman, etc.)
  - arrangement musical, orchestration
  - transformation graphique, novellisation, scénarisation

- **Droit de distribution / location / prêt** : mise sur le marché des
  copies physiques de l'œuvre (épuisement communautaire à mentionner si
  exploitation EU).

- **Droit d'exploitation numérique** (sous-catégorie souvent à isoler
  contractuellement) :
  - sites web et applications mobiles
  - réseaux sociaux et plateformes UGC
  - formats électroniques (EPUB, MP3, MP4)
  - exploitation via API, SDK, kits de licence
  - réalité virtuelle, augmentée, métavers

- **Droits secondaires et accessoires** (à lister explicitement si
  pertinents) :
  - merchandising et objets dérivés
  - publicité et utilisation promotionnelle
  - intégration dans bases de données et data sets (notamment **usage
    pour entraînement d'IA** — clause de plus en plus exigée par les
    cessionnaires depuis 2024, et de plus en plus refusée par les auteurs ;
    flag `[review]` si abordée)
  - exploitation jeux vidéo / réalité étendue
  - exploitation NFT / blockchain `[connaissance modèle — à vérifier]`

**Mode de rédaction recommandé.** Plutôt qu'une liste à puces, articuler
en sous-articles : « Article 4.1 Droit de reproduction », « Article 4.2
Droit de représentation », etc. Chaque sous-article rappelle l'article
CPI fondement + précise les sous-droits cédés. Pour ce qui n'est pas
cédé : clause expresse de réserve (« Les droits non expressément cédés
au présent contrat demeurent la propriété pleine et entière du cédant »).

### 3.2 Condition (b) — Domaines d'exploitation listés explicitement

**Règle.** Le **domaine d'exploitation** des droits cédés doit être
délimité quant à son **étendue** et à sa **destination**. La mention
« tous domaines d'exploitation » est insuffisante. Il faut lister
chaque domaine envisagé.

Domaines d'exploitation usuels à passer en revue :
- **Édition imprimée** : livre (couverture rigide, broché, poche),
  presse écrite, brochure promotionnelle, catalogue, affichage
- **Édition numérique** : livre numérique (EPUB, PDF), application mobile
  de lecture, presse en ligne, newsletter
- **Audiovisuel** : cinéma (long métrage, court métrage), télévision
  (hertzien, câble, satellite, IPTV), plateformes de streaming SVOD
  (Netflix, Prime Video, Disney+, etc.), TVOD, AVOD, FAST
- **Spectacle vivant** : théâtre, opéra, ballet, concert, festival,
  spectacle de rue
- **Phonogramme** : CD, vinyle, cassette, fichier audio numérique
  (téléchargement, streaming)
- **Internet et numérique** : sites web, applications mobiles, réseaux
  sociaux, plateformes UGC, podcast, webinar
- **Merchandising et produits dérivés** : textile, papeterie, objets
  promotionnels, jouets, alimentaire
- **Publicité et communication corporate** : campagnes publicitaires,
  identité visuelle, signalétique, packaging
- **Jeux et interactif** : jeux vidéo, jeux de société, applications
  ludo-éducatives
- **Exposition et arts visuels** : musée, galerie, foire, exposition
  itinérante
- **Pédagogique** : manuels scolaires, support de formation, MOOC

Pour chaque domaine, préciser également la **destination** :
- commerciale (vente, location, abonnement, recettes publicitaires)
- non commerciale (recherche, pédagogique, archive interne)
- promotionnelle (auto-promotion de l'éditeur, presse PR)

### 3.3 Condition (c) — Territoires

**Règle.** Le territoire de la cession doit être délimité. « Monde entier »
est admis comme territoire unique précis. À défaut de précision, la cession
est nulle pour défaut de délimitation territoriale.

Options usuelles :
- **France** (métropolitaine + DROM-COM — préciser si l'un ou les deux)
- **Union européenne** (28 États membres au moment de la rédaction,
  attention Brexit pour le Royaume-Uni)
- **Espace économique européen** (UE + Islande + Liechtenstein + Norvège
  + Suisse via accords bilatéraux)
- **Monde entier**
- **Pays spécifiques** (liste limitative)
- **Territoires linguistiques** (ensemble des pays francophones, par
  exemple) — formulation à éviter car ambiguë, préférer la liste de pays
- **Exclusions** : possible de céder « monde entier sauf [pays] »

Articulation avec l'exclusivité : une cession exclusive monde n'empêche
pas le cédant de continuer à exploiter, sauf clause expresse contraire.
Préciser : « cession exclusive avec engagement de non-concurrence du
cédant » ou « cession exclusive sans engagement de non-concurrence ».

### 3.4 Condition (d) — Durée

**Règle.** La durée de la cession doit être déterminée ou déterminable.
Options :
- **Durée légale de protection** : vie de l'auteur + 70 ans post mortem
  (L.123-1). Pour œuvre collective ou anonyme : 70 ans à compter de la
  publication (L.123-3). Pour œuvre de collaboration : 70 ans après
  décès du dernier coauteur survivant.
- **Durée fixe limitée** : 1 an, 3 ans, 5 ans, 10 ans, 25 ans, etc. — la
  durée s'apprécie à compter de la signature ou à compter de la première
  exploitation (à préciser)
- **Durée liée à un événement** (déterminable) : « pour la durée du
  contrat de partenariat principal », « jusqu'à épuisement du tirage » —
  acceptable si l'événement est objectivement vérifiable
- **Durée tacitement reconductible** : à éviter en cession (mécanisme
  plus adapté aux licences) ; si retenu, prévoir préavis de
  non-reconduction (6 à 12 mois)

**À éviter absolument :**
- « durée indéterminée » sans précision → nullité
- « jusqu'à dénonciation par l'une des parties » sans modalités → nullité
- absence totale de mention de durée → nullité

### 3.5 Condition (e) — Rémunération

**Règle.** Conformément à L.131-4, la rémunération doit en principe être
**proportionnelle aux recettes d'exploitation**. Le forfait est l'exception
limitativement encadrée (voir Étape 1.3).

**Rémunération proportionnelle — éléments à préciser :**
- **Taux** : pourcentage (souvent 5 à 15 % selon secteur — édition livre
  ~8-12 % du prix HT public, audiovisuel 1-5 % des recettes nettes
  producteur, musique enregistrée 8-15 % du PPD selon notoriété, photo
  presse 50/50 selon usages syndicaux `[connaissance modèle — à vérifier]`,
  flag `[review]` pour adaptation au cas concret)
- **Assiette** : sur quoi le pourcentage s'applique ?
  - prix public hors taxe (PPHT)
  - prix de vente HT du cessionnaire
  - recettes nettes après déduction de certains coûts (lister
    exhaustivement les déductions autorisées — clé du contentieux édition)
  - recettes brutes
- **Modalités de versement** :
  - avance ou à-valoir à la signature (montant)
  - paiements périodiques (semestriels recommandés en édition,
    trimestriels en audiovisuel, mensuels en SaaS)
  - délai de versement après chaque période (30 jours, 60 jours,
    90 jours selon usages)
  - mode de versement (virement bancaire, IBAN à fournir)
- **Reddition de comptes** : forme + périodicité + niveau de détail
  (recettes par canal d'exploitation, par territoire, par format) +
  délai de remise après chaque période
- **Audit** : droit du cédant de faire vérifier les comptes par un
  expert-comptable de son choix, périodicité maximum (souvent 1 fois par
  an), prise en charge des frais (à la charge du cessionnaire si écart
  > seuil défini, sinon à la charge du cédant)

**Rémunération forfaitaire — éléments à préciser :**
- **Cas d'exception applicable** L.131-4 al. 2 (citer le ou les cas
  spécifiques qui justifient le forfait)
- **Montant** et modalités de paiement (immédiat, échelonné)
- **Clause de revoyure** ou de **complément de prix** au-delà d'un seuil
  de recettes — recommandée pour désamorcer L.131-5

**Rémunération mixte** :
- Avance / minimum garanti / à-valoir forfaitaire **+** redevances
  proportionnelles au-delà
- Préciser si l'avance est récupérable (à-valoir, non-remboursable mais
  imputable sur les redevances futures) ou non récupérable (forfait
  minimum garanti, en sus des redevances)

### 3.6 Note critique — Effet de l'omission d'une condition

**Une omission de l'une des cinq conditions L.131-3 entraîne :**
- soit la **nullité partielle** de la cession (la clause défaillante est
  réputée non écrite, et la cession est invalide pour le domaine, le
  territoire ou la durée non précisés — l'auteur retrouve la libre
  exploitation pour la part non valablement cédée)
- soit la **nullité totale** du contrat si l'omission affecte le cœur de
  la cession (par exemple, absence totale d'énumération des droits cédés)

La nullité est **absolue** (d'ordre public, ne peut être couverte par
confirmation tacite) et **imprescriptible** — l'auteur ou ses ayants
droit peuvent l'invoquer à tout moment, y compris décennies après la
signature. Le cessionnaire devra alors restituer les recettes
d'exploitation perçues pour la période concernée.

C'est pourquoi le format de sortie de ce skill (Article 4 à 8) impose
une vérification ligne à ligne des cinq conditions, et la note du
relecteur les liste explicitement avec un statut ✓ / 🟡 / 🔴.

---
