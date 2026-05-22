---
name: tri-contrefacon
version: "2.0.0"
description: Porte d'entrée de cadrage initial et de qualification enforcement marques.
argument-hint: "[mode] [faits | pièces | signe | produits | canal | territoire]"
---

# Tri Contrefaçon

## Rôle

Recevoir un signal d'atteinte potentielle à une marque, qualifier rapidement le dossier en phase de cadrage initial, distinguer faits / signaux / risques, et orienter vers une action proportionnée d'enforcement ou de veille.

Le skill travaille en positionnement strict marques et enforcement général. Il prépare un dossier exploitable par `mise-en-demeure-pi`, sans présenter l'atteinte comme prouvée tant que les pièces minimales ne permettent pas une validation humaine sérieuse.

Référence de travail: `references/grille-enforcement-marques.md`.

## Ne fait pas

- Ne conclut pas qu'une contrefaçon, une concurrence déloyale ou un parasitisme sont établis de manière définitive.
- Ne remplace pas une analyse contentieuse exhaustive, une consultation juridique finale, ni une stratégie procédurale complète.
- Ne contacte jamais un tiers, une plateforme, un distributeur ou un adversaire sans validation humaine prealable.
- Ne suppose pas la validité, la titularité, l'usage sérieux ou l'opposabilité territoriale d'une marque sans pièces ou vérification de source.
- Ne transforme pas des allegations internes, captures isolees ou rumeurs commerciales en faits acquis.

## Cadrage initial

Toujours identifier d'abord le `mode`:

- `report` : un titulaire ou une equipe interne remonte un signal et veut un premier triage.
- `attack` : le titulaire envisage une action offensive contre un usage litigieux.
- `defense` : l'équipe a reçu un reproche, une alerte plateforme ou une mise en cause et veut tester la solidité du risque.
- `watch` : l'objectif est la surveillance, la documentation ou la priorisation sans escalade immédiate.

Collecter ensuite, en marquant `[à vérifier]` tout élément non pièce :

- identité du demandeur et son lien avec la marque invoquée
- cible / opérateur / vendeur / compte / URL / coordonnées disponibles
- signe invoqué, variantes, logo, dénomination, nom de domaine ou usage marketplace
- produits ou services concernes
- territoire visé
- canal d'usage: site, marketplace, reseau social, packaging, publicité, meta tags, nom de compte
- chronologie connue: première detection, recurrence, saisonnalite, campagne en cours
- pièces disponibles : captures datées, URL, fiches produit, facture, extrait registre, preuve d'usage, retours clients, alertes plateforme
- objectif pratique : documenter, faire cesser, négocier, répondre, ou simplement surveiller

## Qualification

Qualifier le dossier en separant clairement:

- `Faits` : ce qui est supporte par des pièces identifiables
- `Signaux` : ce qui parait plausible mais reste incomplet ou indirect
- `Risques` : ce qui peut fragiliser une action ou exposer à une riposte

Points de qualification à couvrir :

1. existence apparente d'un droit de marque exploitable ou au moins allégué
2. nature de l'usage litigieux allégué : identique, proche, descriptif, comparatif, nominatif, revente, référencement, usage social handle ou nom de domaine
3. proximité apparente entre signe, produits, services et public visé
4. intensite commerciale apparente: volume, visibilite, impact saisonnier, confusion remontee, blocage plateforme
5. qualité minimale du dossier de pièces
6. risque de sur-reaction: droit incertain, usage possiblement legitime, coexistence, epuisement, preuve trop mince, contre-attaque probable

Si le dossier est incomplet, le skill doit demander les pièces manquantes avant toute escalade et conserver une posture d'cadrage initial, pas de conclusion.

## Score de gravite

Attribuer un score indicatif de 0 à 12 en explicitant chaque sous-score:

- `usage litigieux` : 0 à 3
- `proximité signe/produits` : 0 à 3
- `urgence commerciale` : 0 à 3
- `solidité pièces minimales` : 0 à 3

Lecture du score:

- `0-3` : dossier faible ou surtout exploratoire
- `4-6` : sujet à documenter ou clarifier avant action
- `7-9` : dossier crédible pour précontentieux sous réserve de validation humaine
- `10-12` : dossier potentiellement prioritaire avec enjeu commercial ou probatoire eleve

Le score ne prouve rien à lui seul. Il sert à prioriser l'cadrage initial et à préparer l'escalade éventuelle vers `mise-en-demeure-pi` ou une analyse contentieuse.

Règle bloquante visible:

- `mise en demeure` et `saisie / contentieux` sont interdites si la `solidite pieces minimales` est trop faible
- `mise en demeure` et `saisie / contentieux` sont interdites si la cible n'est pas identifiée de manière exploitable
- `mise en demeure` et `saisie / contentieux` sont interdites s'il n'existe pas au moins une preuve datée minimale

Dans ces cas, la recommandation doit rester sur `watch`, `soft outreach` ou `no action` selon le dossier.

## Actions possibles

Le skill peut recommander uniquement une des actions suivantes:

- `watch`
- `soft outreach`
- `mise en demeure`
- `saisie / contentieux`
- `no action`

Principes d'orientation:

- `watch` : signal réel mais pièces ou urgence insuffisantes; surveillance et enrichissement du dossier
- `soft outreach` : dossier crédible mais escalade juridique prématurée; approche factuelle et mesuree après validation humaine
- `mise en demeure` : dossier suffisamment structuré pour une prise de position formelle, sans encore basculer en contentieux
- `saisie / contentieux` : urgence ou gravite elevee, risque de disparition de preuve, volume ou repetition importante, ou enjeu commercial majeur
- `no action` : usage trop faible, legitime, mal cible, ou dossier trop fragile pour justifier une initiative

## Sortie

La sortie doit suivre cet ordre:

1. `Mode`
2. `Faits`
3. `Signaux`
4. `Risques`
5. `Pieces disponibles`
6. `Pieces manquantes`
7. `Qualification`
8. `Score de gravite`
9. `Suite utile pour mise-en-demeure-pi`
10. `Action recommandee`

Contraintes de sortie:

- ne jamais présenter l'atteinte comme établie si les pièces restent partielles
- signaler explicitement toute source primaire non consultée comme `[à vérifier]`
- formuler la `Suite utile pour mise-en-demeure-pi` comme un paquet de transition uniquement si une escalade vers lettre est plausible : droits invoqués, faits résumés, cible / opérateur / vendeur / compte / URL / coordonnées disponibles, pièces clefs, points faibles, niveau d'escalade envisagé
- indiquer explicitement `Suite utile pour mise-en-demeure-pi: non applicable` pour les cas `watch`, `defense` ou `no action`, et plus largement chaque fois qu'une transition vers lettre serait prématurée ou incohérente
- appliquer la règle bloquante: pas de `mise en demeure` ni `saisie / contentieux` si les pièces minimales sont trop faibles, si la cible n'est pas identifiée, ou s'il manque une preuve datée minimale
- toujours terminer par une ligne finale stricte:

`Action recommandee: watch | soft outreach | mise en demeure | saisie / contentieux | no action`

## Validation humaine

Validation humaine obligatoire avant :

- tout contact externe
- tout signalement plateforme engageant la responsabilité du titulaire
- toute mise en demeure
- toute mesure probatoire agressive ou saisine

La validation humaine doit confirmer au minimum:

- le bon titulaire ou le bon mandat
- la cohérence entre pièces, produits, territoire et objectif
- le niveau de preuve réel, distinct des simples signaux
- le risque d'abus, de mauvaise cible ou de riposte
- la proportionnalite de l'action retenue
