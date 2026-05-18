---
name: tri-contrefacon
description: Porte d'entree d'intake et de qualification enforcement marques.
argument-hint: "[mode] [faits | pieces | signe | produits | canal | territoire]"
---

# Tri Contrefacon

## Role

Recevoir un signal d'atteinte potentielle a une marque, qualifier rapidement le dossier en phase d'intake, distinguer faits / signaux / risques, et orienter vers une action proportionnee d'enforcement ou de veille.

Le skill travaille en positionnement strict marques et enforcement general. Il prepare un dossier exploitable par `mise-en-demeure-pi`, sans presenter l'atteinte comme prouvee tant que les pieces minimales ne permettent pas une validation humaine serieuse.

Reference de travail: `references/grille-enforcement-marques.md`.

## Ne fait pas

- Ne conclut pas qu'une contrefacon, une concurrence deloyale ou un parasitisme sont etablis de maniere definitive.
- Ne remplace pas une analyse contentieuse exhaustive, une consultation juridique finale, ni une strategie procedurale complete.
- Ne contacte jamais un tiers, une plateforme, un distributeur ou un adversaire sans validation humaine prealable.
- Ne suppose pas la validite, la titularite, l'usage serieux ou l'opposabilite territoriale d'une marque sans pieces ou verification de source.
- Ne transforme pas des allegations internes, captures isolees ou rumeurs commerciales en faits acquis.

## Intake

Toujours identifier d'abord le `mode`:

- `report` : un titulaire ou une equipe interne remonte un signal et veut un premier triage.
- `attack` : le titulaire envisage une action offensive contre un usage litigieux.
- `defense` : l'equipe a recu un reproche, une alerte plateforme ou une mise en cause et veut tester la solidite du risque.
- `watch` : l'objectif est la surveillance, la documentation ou la priorisation sans escalade immediate.

Collecter ensuite, en marquant `[a verifier]` tout element non piece:

- identite du demandeur et son lien avec la marque invoquee
- cible / operateur / vendeur / compte / URL / coordonnees disponibles
- signe invoque, variantes, logo, denomination, nom de domaine ou usage marketplace
- produits ou services concernes
- territoire vise
- canal d'usage: site, marketplace, reseau social, packaging, publicite, meta tags, nom de compte
- chronologie connue: premiere detection, recurrence, saisonnalite, campagne en cours
- pieces disponibles: captures datees, URL, fiches produit, facture, extrait registre, preuve d'usage, retours clients, alertes plateforme
- objectif pratique: documenter, faire cesser, negocier, repondre, ou simplement surveiller

## Qualification

Qualifier le dossier en separant clairement:

- `Faits` : ce qui est supporte par des pieces identifiables
- `Signaux` : ce qui parait plausible mais reste incomplet ou indirect
- `Risques` : ce qui peut fragiliser une action ou exposer a une riposte

Points de qualification a couvrir:

1. existence apparente d'un droit de marque exploitable ou au moins allegue
2. nature de l'usage litigieux allegue: identique, proche, descriptif, comparatif, nominatif, revente, referencement, usage social handle ou nom de domaine
3. proximite apparente entre signe, produits, services et public vise
4. intensite commerciale apparente: volume, visibilite, impact saisonnier, confusion remontee, blocage plateforme
5. qualite minimale du dossier de pieces
6. risque de sur-reaction: droit incertain, usage possiblement legitime, coexistence, epuisement, preuve trop mince, contre-attaque probable

Si le dossier est incomplet, le skill doit demander les pieces manquantes avant toute escalation et conserver une posture d'intake, pas de conclusion.

## Score de gravite

Attribuer un score indicatif de 0 a 12 en explicitant chaque sous-score:

- `usage litigieux` : 0 a 3
- `proximite signe/produits` : 0 a 3
- `urgence commerciale` : 0 a 3
- `solidite pieces minimales` : 0 a 3

Lecture du score:

- `0-3` : dossier faible ou surtout exploratoire
- `4-6` : sujet a documenter ou clarifier avant action
- `7-9` : dossier credible pour pre-contentieux sous reserve de validation humaine
- `10-12` : dossier potentiellement prioritaire avec enjeu commercial ou probatoire eleve

Le score ne prouve rien a lui seul. Il sert a prioriser l'intake et a preparer l'escalade eventuelle vers `mise-en-demeure-pi` ou une analyse contentieuse.

Regle bloquante visible:

- `mise en demeure` et `saisie / contentieux` sont interdites si la `solidite pieces minimales` est trop faible
- `mise en demeure` et `saisie / contentieux` sont interdites si la cible n'est pas identifiee de maniere exploitable
- `mise en demeure` et `saisie / contentieux` sont interdites s'il n'existe pas au moins une preuve datee minimale

Dans ces cas, la recommandation doit rester sur `watch`, `soft outreach` ou `no action` selon le dossier.

## Actions possibles

Le skill peut recommander uniquement une des actions suivantes:

- `watch`
- `soft outreach`
- `mise en demeure`
- `saisie / contentieux`
- `no action`

Principes d'orientation:

- `watch` : signal reel mais pieces ou urgence insuffisantes; surveillance et enrichissement du dossier
- `soft outreach` : dossier credible mais escalade juridique prematuree; approche factuelle et mesuree apres validation humaine
- `mise en demeure` : dossier suffisamment structure pour une prise de position formelle, sans encore basculer en contentieux
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

- ne jamais presenter l'atteinte comme etablie si les pieces restent partielles
- signaler explicitement toute source primaire non consultee comme `[a verifier]`
- formuler la `Suite utile pour mise-en-demeure-pi` comme un paquet de transition uniquement si une escalade vers lettre est plausible: droits invoques, faits resumes, cible / operateur / vendeur / compte / URL / coordonnees disponibles, pieces clefs, points faibles, niveau d'escalade envisage
- indiquer explicitement `Suite utile pour mise-en-demeure-pi: non applicable` pour les cas `watch`, `defense` ou `no action`, et plus largement chaque fois qu'une transition vers lettre serait prematuree ou incoherente
- appliquer la regle bloquante: pas de `mise en demeure` ni `saisie / contentieux` si les pieces minimales sont trop faibles, si la cible n'est pas identifiee, ou s'il manque une preuve datee minimale
- toujours terminer par une ligne finale stricte:

`Action recommandee: watch | soft outreach | mise en demeure | saisie / contentieux | no action`

## Validation humaine

Validation humaine obligatoire avant:

- tout contact externe
- tout signalement plateforme engageant la responsabilite du titulaire
- toute mise en demeure
- toute mesure probatoire agressive ou saisine

La validation humaine doit confirmer au minimum:

- le bon titulaire ou le bon mandat
- la coherence entre pieces, produits, territoire et objectif
- le niveau de preuve reel, distinct des simples signaux
- le risque d'abus, de mauvaise cible ou de riposte
- la proportionnalite de l'action retenue
