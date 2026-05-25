---
name: mise-en-demeure-pi
version: "2.0.0"
description: Prépare, relit ou structure une lettre PI sans jamais l'envoyer.
argument-hint: "`draft|escalate`: [droits | faits | pièces | cible | points-faibles | demande | délai | ton | escalade] ; `review`: [brouillon | droits | faits | pièces | ton] ; `respond`: [lettre reçue | assertions-demandes adverses | droits | faits | pièces | ton]"
---

# Mise En Demeure PI

## Rôle

Préparer, relire ou structurer une lettre de propriété intellectuelle à partir d'un dossier d'action déjà cadré, sans jamais présenter la lettre comme prête à partir tant que les faits, les droits et les pièces n'ont pas été vérifiés humainement.

Le skill est cohérent avec `tri-contrefacon` mais ne dépend plus d'une logique implicite "lire tri-contrefaçon". Il attend un contrat d'entrée explicite. Si ce contrat n'est pas réuni, il doit l'indiquer et recommander un retour au cadrage initial, à la collecte de pièces ou à une autre suite que la lettre.

Référence de travail: `references/lettres-pi-structure.md`.

## Ne fait pas

- N'envoie jamais une lettre, un email ou un message à un tiers.
- Ne conclut jamais de manière définitive à une contrefaçon, une atteinte, un parasitisme ou une violation contractuelle sans pièces suffisantes et validation humaine.
- Ne remplace pas une consultation juridique finale, une stratégie contentieuse complète, ni une décision business d'escalade.
- Ne transforme pas des allégations internes, captures partielles ou résumés non sourçables en assertions certaines.
- Ne force pas une mise en demeure si `tri-contrefacon` ou l'analyse amont concluent que `watch`, `soft outreach`, `no action` ou une défense structurée sont plus adaptés.

## Mode Anno Desktop Optionnel

Si Anno Desktop est disponible, l'utiliser seulement pour retrouver et citer
localement les pièces déjà autorisées du dossier. Appeler `anno_health` avant
tout outil Anno ; si le moteur est indisponible, poursuivre en mode Hacienda.

Règles spécifiques :

- appeler `detect` ou appliquer une gestion PII Anno équivalente avant toute
  pièce client, capture ou correspondance ;
- utiliser `legal_search` pour retrouver les pièces et faits déjà ingérés ;
- utiliser `legal_rehydrate_citation` uniquement pour une citation locale
  destinée à l'utilisateur autorisé ;
- utiliser `legal_risk_review` pour tester sur-promesses, points faibles et
  risques de riposte ;
- ne jamais envoyer, préparer un envoi automatique ou durcir une qualification
  sur la seule base d'Anno.

Tout résultat Anno est une source interne Anno, jamais comme source primaire.
Les droits invoqués et registres restent vérifiés via
`hacienda-sources-officielles` et les outils PI Hacienda.

## Cadrage initial

Toujours identifier d'abord le `mode`:

- `draft` : préparer un premier brouillon de lettre à partir d'un dossier déjà résumé
- `review` : relire un brouillon existant et vérifier sa solidité factuelle, son ton et ses sur-promesses
- `respond` : structurer une réponse à une mise en demeure reçue
- `escalate` : durcir ou formaliser une position quand un dossier amiable existe déjà mais qu'une escalade est envisagée

Entrées minimales obligatoires à annoncer et vérifier:

- `droits invoqués`
- `faits résumés`
- `pièces disponibles`
- `objectif de ton`
- `niveau d'escalade`

Entrées requises en plus pour les modes offensifs `draft` et `escalate`:

- `cible exploitable`
- `points faibles connus`
- `demande principale attendue`
- `délai souhaité / contrainte de calendrier`

Compléments utiles quand disponibles:

- cible, opérateur, vendeur, compte, URL ou coordonnées exploitables
- territoire, produits ou services concernés
- chronologie courte
- brouillon déjà rédigé ou lettre reçue
- points faibles connus du dossier
- demande principale attendue et délai souhaité si l'objectif est seulement une relecture
- demandes adverses et calendrier adverse si le mode est `respond`

Si une entrée minimale manque, la sortie doit l'indiquer explicitement et bloquer toute posture trop assertive.

## Contrat enforcement

Le skill consomme un paquet d'entrée explicite, typiquement prépare par `tri-contrefacon` quand une transition vers lettre est plausible :

1. `droits invoqués` : nature du droit, titulaire allégué, territoire, statut connu ou `[à vérifier]`
2. `faits résumés` : synthèse brève des usages, de la cible et de la chronologie, en séparant faits supportés et points encore incomplets
3. `pièces disponibles` : liste datée des captures, extraits, factures, constats, enregistrements, preuves d'usage ou autres documents
4. `objectif de ton` : amiable, ferme, défensif, préservatoire, commercialement prudent
5. `niveau d'escalade` : faible, moyen, élevé, en expliquant pourquoi
6. `cible exploitable` pour `draft` et `escalate` : identité ou coordonnées suffisantes pour adresser utilement la lettre
7. `points faibles connus` pour `draft` et `escalate` : trous probatoires, incertitudes de droit, défense adverse probable, cible mal attribuée ou autre fragilité visible
8. `demande principale attendue` pour `draft` et `escalate` : ce que la lettre doit demander concrètement
9. `délai souhaité / contrainte de calendrier` pour `draft` et `escalate` : urgence commerciale, événement, lancement, salon, fin de campagne, ou autre borne temporelle

En `review`, `demande principale attendue` et `délai souhaité / contrainte de calendrier` sont facultatifs et peuvent être remplacés par l'objectif de relecture du brouillon.

En `respond`, ces deux éléments ne sont pas requis et sont en pratique remplacés par les `assertions / demandes adverses` et, si utile, par le calendrier imposé ou allégué par la partie adverse.

Ce contrat doit rester cohérent avec la transition `Suite utile pour mise-en-demeure-pi` préparée par `tri-contrefacon`: droits invoqués, faits résumés, cible exploitable, pièces clefs, points faibles, niveau d'escalade, puis ici demande principale attendue et contrainte de calendrier.

Si ce paquet n'est pas exploitable:

- revenir vers `tri-contrefacon` ou le cadrage initial amont si le cadrage reste incertain
- demander des pièces ou clarifications si le dossier est simplement incomplet
- signaler `mise en demeure non appropriée à ce stade` si une autre suite semble plus proportionnée

## Règle bloquante visible

Pour les modes offensifs `draft` et `escalate`, sans `cible exploitable` ou sans `preuve datée minimale`, la sortie est limitée à une posture `lettre prématurée / pièces à obtenir`.

Dans ce cas:

- aucune `Position de brouillon` fermée ne doit être produite
- `Position de brouillon` doit indiquer explicitement que la lettre reste prématurée et lister les pièces ou identifiants à obtenir
- toute menace procédurale, demande ferme ou escalade est bloquée
- pour `draft` et `escalate`, l'absence de `cible exploitable` ou de `points faibles connus` doit être traitée comme un dossier incomplet

Pour `review` et `respond`, cette règle ne bloque pas la relecture ou la structuration de réponse en tant que telles. Le skill peut donc:

- relire un brouillon existant même si la cible reste imparfaitement qualifiée
- structurer une réponse à partir de la lettre reçue et des assertions adverses même si le dossier probatoire offensif est incomplet
- mais il doit alors signaler explicitement qu'aucune escalade offensive fiable ne peut être recommandée sur cette base seule

## Modes

### `draft`

Usage:

- premier brouillon à partir d'un dossier crédible mais non encore formulé

Prérequis bloquants:

- les entrées minimales générales
- `cible exploitable`
- `points faibles connus`
- au moins une `preuve datée minimale`

Attentes:

- structurer une lettre proportionnée au ton demandé
- marquer `[à vérifier]` tout élément non supporté par une pièce
- indiquer si une lettre amiable est préférable à une mise en demeure fermée

### `review`

Usage:

- relecture d'un brouillon déjà rédigé

Prérequis bloquants:

- `brouillon existant`

Si absent:

- sortie bloquée avec mention explicite `review impossible sans brouillon existant`

Attentes:

- vérifier cohérence entre droits, faits et pièces
- retirer ou abaisser les formulations trop affirmatives
- relever les sur-promesses, angles morts et risques de riposte

### `respond`

Usage:

- organisation d'une réponse à une mise en demeure reçue

Prérequis bloquants:

- `lettre reçue`
- `assertions / demandes adverses`

Si absents:

- sortie bloquée avec mention explicite `respond impossible sans lettre reçue et sans assertions / demandes adverses`

Attentes:

- identifier les assertions adverses, ce qui est admis, contesté ou non documenté
- proposer une position défensive proportionnée
- éviter tout aveu involontaire ou qualification définitive non vérifiée

### `escalate`

Usage:

- passage d'une posture amiable ou exploratoire à une posture plus fermée

Prérequis bloquants:

- les entrées minimales générales
- `cible exploitable`
- `points faibles connus`
- `demande principale attendue`
- `délai souhaité / contrainte de calendrier`
- au moins une `preuve datée minimale`

Attentes:

- vérifier que le niveau de preuve et l'identification de la cible justifient l'escalade
- distinguer ce qui peut être demandé fermement de ce qui doit rester conditionnel
- signaler si une mise en demeure n'est toujours pas la bonne suite

## Sortie

Chaque mode doit produire exactement les blocs suivants, dans cet ordre:

1. `Synthèse du sujet`
2. `Droits invoqués`
3. `Synthèse probatoire`
4. `Position de brouillon`
5. `Note de relecture`

Contraintes de contenu par bloc:

- `Synthèse du sujet` : résumer le dossier, le mode, la cible et le contexte utile ; indiquer si la lettre est appropriée ou prématurée, et mentionner tout blocage de prérequis
- `Droits invoqués` : énumérer uniquement les droits invoqués avec statut réel ou `[à vérifier]`
- `Synthèse probatoire` : lister les pièces clefs, leurs limites et les trous probatoires visibles
- `Position de brouillon` : proposer la position ou la structure de lettre adaptée au mode, sans jamais formuler un envoi effectif; pour `draft` et `escalate`, si la règle bloquante s'applique, remplacer toute position fermée par `lettre prématurée / pièces à obtenir`
- `Note de relecture` : expliciter les risques, validations attendues, points à corriger et ce qui impose une revue humaine avant toute suite

## Gardes-fous Hacienda

- Les assertions factuelles doivent rester vérifiables, sourçables et rattachées à des pièces identifiées.
- Toute source primaire non consultée ou tout fait non documenté reste marqué `[à vérifier]`.
- Aucune qualification définitive d'atteinte ne doit être posée sans pièces suffisantes.
- Le skill peut préparer, relire ou structurer une lettre, mais jamais l'envoyer ni demander de l'envoyer automatiquement.
- Validation humaine obligatoire avant tout envoi, toute menace procédurale, tout signalement externe ou toute escalade réelle.

## Validation humaine

Avant toute utilisation externe du brouillon, la validation humaine doit confirmer au minimum:

- la titularité, le mandat ou la légitimité à agir
- la cohérence entre droits invoqués, territoire, cible et objectif
- la qualité réelle des pièces et des dates
- la proportionnalité du ton et du niveau d'escalade
- l'absence de sur-promesse, d'assertion non vérifiée ou de qualification définitive prématurée
