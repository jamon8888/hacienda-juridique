---
name: mise-en-demeure-pi
description: Prepare, relit ou structure une lettre PI sans jamais l'envoyer.
argument-hint: "`draft|escalate`: [droits | faits | pieces | cible | points-faibles | demande | delai | ton | escalade] ; `review`: [brouillon | droits | faits | pieces | ton] ; `respond`: [lettre recue | assertions-demandes adverses | droits | faits | pieces | ton]"
---

# Mise En Demeure PI

## Role

Preparer, relire ou structurer une lettre de propriete intellectuelle a partir d'un dossier d'enforcement deja cadre, sans jamais presenter la lettre comme prete a partir tant que les faits, les droits et les pieces n'ont pas ete verifies humainement.

Le skill est coherent avec `tri-contrefacon` mais ne depend plus d'une logique implicite "lire tri-contrefacon". Il attend un contrat d'entree explicite. Si ce contrat n'est pas reuni, il doit l'indiquer et recommander un retour a l'intake, a la collecte de pieces ou a une autre suite que la lettre.

Reference de travail: `references/lettres-pi-structure.md`.

## Ne fait pas

- N'envoie jamais une lettre, un email ou un message a un tiers.
- Ne conclut jamais de maniere definitive a une contrefacon, une atteinte, un parasitisme ou une violation contractuelle sans pieces suffisantes et validation humaine.
- Ne remplace pas une consultation juridique finale, une strategie contentieuse complete, ni une decision business d'escalade.
- Ne transforme pas des allegations internes, captures partielles ou resumes non sourcables en assertions certaines.
- Ne force pas une mise en demeure si `tri-contrefacon` ou l'analyse amont concluent que `watch`, `soft outreach`, `no action` ou une defense structuree sont plus adaptes.

## Intake

Toujours identifier d'abord le `mode`:

- `draft` : preparer un premier brouillon de lettre a partir d'un dossier deja resume
- `review` : relire un brouillon existant et verifier sa solidite factuelle, son ton et ses sur-promesses
- `respond` : structurer une reponse a une mise en demeure recue
- `escalate` : durcir ou formaliser une position quand un dossier amiable existe deja mais qu'une escalation est envisagee

Entrees minimales obligatoires a annoncer et verifier:

- `droits invoques`
- `faits resumes`
- `pieces disponibles`
- `objectif de ton`
- `niveau d'escalade`

Entrees requises en plus pour les modes offensifs `draft` et `escalate`:

- `cible exploitable`
- `points faibles connus`
- `demande principale attendue`
- `delai souhaite / contrainte de calendrier`

Complements utiles quand disponibles:

- cible, operateur, vendeur, compte, URL ou coordonnees exploitables
- territoire, produits ou services concernes
- chronologie courte
- brouillon deja redige ou lettre recue
- points faibles connus du dossier
- demande principale attendue et delai souhaite si l'objectif est seulement une relecture
- demandes adverses et calendrier adverse si le mode est `respond`

Si une entree minimale manque, la sortie doit l'indiquer explicitement et bloquer toute posture trop assertive.

## Contrat enforcement

Le skill consomme un paquet d'entree explicite, typiquement prepare par `tri-contrefacon` quand une transition vers lettre est plausible:

1. `droits invoques` : nature du droit, titulaire allegue, territoire, statut connu ou `[a verifier]`
2. `faits resumes` : synthese breve des usages, de la cible et de la chronologie, en separant faits supportes et points encore incomplets
3. `pieces disponibles` : liste datee des captures, extraits, factures, constats, enregistrements, preuves d'usage ou autres documents
4. `objectif de ton` : amiable, ferme, defensif, preservatoire, commercialement prudent
5. `niveau d'escalade` : faible, moyen, eleve, en expliquant pourquoi
6. `cible exploitable` pour `draft` et `escalate` : identite ou coordonnees suffisantes pour adresser utilement la lettre
7. `points faibles connus` pour `draft` et `escalate` : trous probatoires, incertitudes de droit, defense adverse probable, cible mal attribuee ou autre fragilite visible
8. `demande principale attendue` pour `draft` et `escalate` : ce que la lettre doit demander concretement
9. `delai souhaite / contrainte de calendrier` pour `draft` et `escalate` : urgence commerciale, evenement, lancement, salon, fin de campagne, ou autre borne temporelle

En `review`, `demande principale attendue` et `delai souhaite / contrainte de calendrier` sont facultatifs et peuvent etre remplaces par l'objectif de relecture du brouillon.

En `respond`, ces deux elements ne sont pas requis et sont en pratique remplaces par les `assertions / demandes adverses` et, si utile, par le calendrier impose ou allegue par la partie adverse.

Ce contrat doit rester coherent avec la transition `Suite utile pour mise-en-demeure-pi` preparee par `tri-contrefacon`: droits invoques, faits resumes, cible exploitable, pieces clefs, points faibles, niveau d'escalade, puis ici demande principale attendue et contrainte de calendrier.

Si ce paquet n'est pas exploitable:

- revenir vers `tri-contrefacon` ou l'intake amont si le cadrage reste incertain
- demander des pieces ou clarifications si le dossier est simplement incomplet
- signaler `mise en demeure non appropriee a ce stade` si une autre suite semble plus proportionnee

## Regle bloquante visible

Pour les modes offensifs `draft` et `escalate`, sans `cible exploitable` ou sans `preuve datee minimale`, la sortie est limitee a une posture `lettre prematuree / pieces a obtenir`.

Dans ce cas:

- aucune `Draft Position` ferme ne doit etre produite
- `Draft Position` doit indiquer explicitement que la lettre reste prematuree et lister les pieces ou identifiants a obtenir
- toute menace procedurale, demande ferme ou escalation est bloquee
- pour `draft` et `escalate`, l'absence de `cible exploitable` ou de `points faibles connus` doit etre traitee comme un dossier incomplet

Pour `review` et `respond`, cette regle ne bloque pas la relecture ou la structuration de reponse en tant que telles. Le skill peut donc:

- relire un brouillon existant meme si la cible reste imparfaitement qualifiee
- structurer une reponse a partir de la lettre recue et des assertions adverses meme si le dossier probatoire offensif est incomplet
- mais il doit alors signaler explicitement qu'aucune escalation offensive fiable ne peut etre recommandee sur cette base seule

## Modes

### `draft`

Usage:

- premier brouillon a partir d'un dossier credible mais non encore formule

Pre-requis bloquants:

- les entrees minimales generales
- `cible exploitable`
- `points faibles connus`
- au moins une `preuve datee minimale`

Attentes:

- structurer une lettre proportionnee au ton demande
- marquer `[a verifier]` tout element non supporte par une piece
- indiquer si une lettre amiable est preferable a une mise en demeure ferme

### `review`

Usage:

- relecture d'un brouillon deja redige

Pre-requis bloquants:

- `brouillon existant`

Si absent:

- sortie bloquee avec mention explicite `review impossible sans brouillon existant`

Attentes:

- verifier coherence entre droits, faits et pieces
- retirer ou abaisser les formulations trop affirmatives
- relever les sur-promesses, angles morts et risques de riposte

### `respond`

Usage:

- organisation d'une reponse a une mise en demeure recue

Pre-requis bloquants:

- `lettre recue`
- `assertions / demandes adverses`

Si absents:

- sortie bloquee avec mention explicite `respond impossible sans lettre recue et sans assertions / demandes adverses`

Attentes:

- identifier les assertions adverses, ce qui est admis, conteste ou non documente
- proposer une position defensive proportionnee
- eviter tout aveu involontaire ou qualification definitive non verifiee

### `escalate`

Usage:

- passage d'une posture amiable ou exploratoire a une posture plus ferme

Pre-requis bloquants:

- les entrees minimales generales
- `cible exploitable`
- `points faibles connus`
- `demande principale attendue`
- `delai souhaite / contrainte de calendrier`
- au moins une `preuve datee minimale`

Attentes:

- verifier que le niveau de preuve et l'identification de la cible justifient l'escalade
- distinguer ce qui peut etre demande fermement de ce qui doit rester conditionnel
- signaler si une mise en demeure n'est toujours pas la bonne suite

## Sortie

Chaque mode doit produire exactement les blocs suivants, dans cet ordre:

1. `Issue Summary`
2. `Rights Asserted`
3. `Evidence Summary`
4. `Draft Position`
5. `Reviewer Note`

Contraintes de contenu par bloc:

- `Issue Summary` : resumer le dossier, le mode, la cible et le contexte utile; indiquer si la lettre est appropriee ou prematuree, et mentionner tout blocage de prerequis
- `Rights Asserted` : enumerer uniquement les droits invoques avec statut reel ou `[a verifier]`
- `Evidence Summary` : lister les pieces clefs, leurs limites et les trous probatoires visibles
- `Draft Position` : proposer la position ou la structure de lettre adaptee au mode, sans jamais formuler un envoi effectif; pour `draft` et `escalate`, si la regle bloquante s'applique, remplacer toute position ferme par `lettre prematuree / pieces a obtenir`
- `Reviewer Note` : expliciter les risques, validations attendues, points a corriger et ce qui impose une revue humaine avant toute suite

## Gardes-fous Hacienda

- Les assertions factuelles doivent rester verifiables, sourcables et rattachees a des pieces identifiees.
- Toute source primaire non consultee ou tout fait non documente reste marque `[a verifier]`.
- Aucune qualification definitive d'atteinte ne doit etre posee sans pieces suffisantes.
- Le skill peut preparer, relire ou structurer une lettre, mais jamais l'envoyer ni demander de l'envoyer automatiquement.
- Validation humaine obligatoire avant tout envoi, toute menace procedurale, tout signalement externe ou toute escalation reelle.

## Validation humaine

Avant toute utilisation externe du brouillon, la validation humaine doit confirmer au minimum:

- la titularite, le mandat ou la legitimite a agir
- la coherence entre droits invoques, territoire, cible et objectif
- la qualite reelle des pieces et des dates
- la proportionnalite du ton et du niveau d'escalade
- l'absence de sur-promesse, d'assertion non verifiee ou de qualification definitive prematuree
