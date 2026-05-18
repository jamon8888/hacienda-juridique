---
name: portefeuille-pi
description: Point d'entree legacy en migration vers un hub federé de lecture consolidee du portefeuille PI.
argument-hint: "[overview | deadlines | risk-report | export]"
---

> **Legacy temporaire en migration vers un hub fédéré.** `portefeuille-pi`
> ne tient pas un registre propre et fonctionne comme point d'entree
> provisoire de lecture consolidee. La cible V1 est un hub fédéré
> multi-actifs en lecture seule fonde sur `revue-portefeuille-marques` et
> `revue-portefeuille-brevets`. Si tu dois agir aujourd'hui, maintiens les
> actifs directement dans ces skills sources.

> **Bloc d'ouverture obligatoire avant toute vue consolidee.**
> **Registre interne, lecture seule, recoupement requis.** Toute sortie doit
> rappeler en tete que ce hub consolide uniquement des registres internes,
> qu'il fonctionne en lecture seule, et que tout element sensible doit etre
> recoupe avant decision avec les dossiers, pieces et sources utiles. Ce hub
> ne remplace ni un registre officiel, ni un depot officiel, ni une
> synchronisation officielle.

# Portefeuille PI

## Objectif

Fournir une lecture consolidee du portefeuille PI existant sur le perimetre
actuel **marques + brevets uniquement**, faire ressortir les echeances et les
trous de couverture, et renvoyer vers les skills sources qui tiennent les registres
internes. `portefeuille-pi` est un point d'entree de lecture, pas un outil
CRUD et pas un registre canonique unifie.

Ce hub ne cree, ne modifie et ne supprime aucune entree; toute maintenance
bascule vers `revue-portefeuille-marques` ou `revue-portefeuille-brevets`.

## Modes

- `overview` : consolider une vue multi-actifs en lecture seule sur le
  perimetre actuel marques + brevets a partir de
  `revue-portefeuille-marques` et `revue-portefeuille-brevets`.
- `deadlines` : extraire les echeances et points de vigilance temporels deja
  presents dans les registres internes sources.
- `risk-report` : faire ressortir les trous de couverture, incoherences et
  actifs a recouper avant decision.
- `export` : produire un export de lecture consolidee a partager en interne,
  en rappelant les limites du hub et la necessite de recouper les donnees.

## Workflow

1. Lire les registres internes existants.
2. Consolider la lecture marques et brevets.
3. Taguer `[a verifier]` toute information non recoupee.
4. Faire ressortir echeances, trous de couverture et limites du registre.
5. Renvoyer vers `revue-portefeuille-marques` ou `revue-portefeuille-brevets`
   si une action de maintenance est necessaire.
6. Ne jamais presenter la sortie comme registre officiel, depot officiel ou
   synchronisation officielle.

## Sortie

La sortie du hub contient au minimum les blocs suivants :

- `Vue des actifs` : vue consolidee des actifs, classes, familles,
  territoires et responsables deja consignes dans les skills sources.
- `Echeances` : echeances, annuites, renouvellements et dates a surveiller,
  avec tag `[a verifier]` si la date n'est pas recoupee.
- `Trous de couverture` : trous de couverture, actifs orphelins, donnees
  manquantes et zones ou une revue source reste necessaire.
- `Limites du registre` : rappel explicite que le hub reflete des registres
  internes consolides, sans valeur de registre officiel ni de synchronisation
  officielle.
- `Validation humaine requise / Prochaine action` : bloc final obligatoire
  indiquant la verification humaine attendue et le renvoi vers
  `revue-portefeuille-marques` ou `revue-portefeuille-brevets` selon l'actif
  et l'action de maintenance, d'audit ou de recoupement necessaire.
