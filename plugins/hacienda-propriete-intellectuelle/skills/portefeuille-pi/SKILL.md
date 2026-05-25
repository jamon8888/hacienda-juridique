---
name: portefeuille-pi
version: "2.0.0"
description: Point d'entrée legacy en migration vers un hub fédéré de lecture consolidée du portefeuille PI.
argument-hint: "[overview | deadlines | risk-report | export]"
---

> **Legacy temporaire en migration vers un hub fédéré.** `portefeuille-pi`
> ne tient pas un registre propre et fonctionne comme point d'entrée
> provisoire de lecture consolidée. La cible V1 est un hub fédéré
> multi-actifs en lecture seule fondée sur `revue-portefeuille-marques` et
> `revue-portefeuille-brevets`. Si tu dois agir aujourd'hui, maintiens les
> actifs directement dans ces skills sources.

> **Bloc d'ouverture obligatoire avant toute vue consolidée.**
> **Registre interne, lecture seule, recoupement requis.** Toute sortie doit
> rappeler en tête que ce hub consolide uniquement des registres internes,
> qu'il fonctionne en lecture seule, et que tout élément sensible doit être
> recoupé avant décision avec les dossiers, pièces et sources utiles. Ce hub
> ne remplace ni un registre officiel, ni un dépôt officiel, ni une
> synchronisation officielle.

# Portefeuille PI

## Objectif

Fournir une lecture consolidée du portefeuille PI existant sur le périmètre
actuel **marques + brevets uniquement**, faire ressortir les échéances et les
trous de couverture, et renvoyer vers les skills sources qui tiennent les registres
internes. `portefeuille-pi` est un point d'entrée de lecture, pas un outil
CRUD et pas un registre canonique unifié.

Ce hub ne crée, ne modifie et ne supprime aucune entrée; toute maintenance
bascule vers `revue-portefeuille-marques` ou `revue-portefeuille-brevets`.

## Mode Anno Desktop Optionnel

Si Anno Desktop est disponible, l'utiliser seulement pour consolider une lecture
locale de registres internes, dossiers et décisions déjà ingérés. Appeler
`anno_health` avant tout outil Anno ; en cas d'échec, poursuivre en mode
Hacienda.

Règles spécifiques :

- appeler `detect` ou appliquer une gestion PII Anno équivalente avant toute
  pièce ou registre client ;
- utiliser `legal_graph_query` pour relier actifs, titulaires, échéances,
  familles, licences, contentieux et responsables ;
- utiliser `memory_recall` et `memory_graph_recall` seulement pour rappeler des
  préférences ou éléments validés par l'utilisateur ;
- ne jamais écrire dans les registres sources depuis ce hub ;
- ne jamais présenter Anno comme registre officiel.

Tout résultat Anno est une source interne Anno, jamais comme source primaire et
jamais comme registre officiel. Les registres INPI, EUIPO, OMPI, OEB et BOPI
restent vérifiés via `hacienda-sources-officielles` et les outils PI Hacienda.

## Modes

- `overview` : consolider une vue multi-actifs en lecture seule sur le
  périmètre actuel marques + brevets à partir de
  `revue-portefeuille-marques` et `revue-portefeuille-brevets`.
- `deadlines` : extraire les échéances et points de vigilance temporels déjà
  présents dans les registres internes sources.
- `risk-report` : faire ressortir les trous de couverture, incohérences et
  actifs à recouper avant décision.
- `export` : produire un export de lecture consolidée à partager en interne,
  en rappelant les limites du hub et la nécessité de recouper les données.

## Workflow

1. Lire les registres internes existants.
2. Consolider la lecture marques et brevets.
3. Taguer `[à vérifier]` toute information non recoupée.
4. Faire ressortir échéances, trous de couverture et limites du registre.
5. Renvoyer vers `revue-portefeuille-marques` ou `revue-portefeuille-brevets`
   si une action de maintenance est nécessaire.
6. Ne jamais présenter la sortie comme registre officiel, dépôt officiel ou
   synchronisation officielle.

## Sortie

La sortie du hub contient au minimum les blocs suivants :

- `Vue des actifs` : vue consolidée des actifs, classes, familles,
  territoires et responsables déjà consignés dans les skills sources.
- `Échéances` : échéances, annuités, renouvellements et dates à surveiller,
  avec tag `[à vérifier]` si la date n'est pas recoupée.
- `Trous de couverture` : trous de couverture, actifs orphelins, données
  manquantes et zones où une revue source reste nécessaire.
- `Limites du registre` : rappel explicite que le hub reflète des registres
  internes consolidés, sans valeur de registre officiel ni de synchronisation
  officielle.
- `Validation humaine requise / Prochaine action` : bloc final obligatoire
  indiquant la vérification humaine attendue et le renvoi vers
  `revue-portefeuille-marques` ou `revue-portefeuille-brevets` selon l'actif
  et l'action de maintenance, d'audit ou de recoupement nécessaire.
