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
