---
name: cession-droit-auteur
version: "2.0.0"
description: >
  Skill V2 strict de préparation d'une cession de droits patrimoniaux
  d'auteur. Il fixe un contrat d'entrée fermé, un seuil de préparation de cession,
  une branche bornée de title-chain cleanup, une sortie stabilisée en 9
  blocs, et un routage fermé vers la bonne voie PI. Il ne remplace pas la
  qualification de l'œuvre, la licence, le regime logiciel, ni un contrat PI
  plus large.
argument-hint: "[full-assignment|partial-assignment|exclusive-assignment|non-exclusive-assignment]"
---

# /cession-droit-auteur

## Examples

<example>
<user>/h-pi:cession-droit-auteur [full-assignment|partial-assignment|exclusive-assignment|non-exclusive-assignment]</user>
<response>
Brouillon de travail structuré, avec faits, droit, analyse, incertitudes, sources consultées, points `[à vérifier]` et validation humaine obligatoire.
</response>
</example>

## Chargement du profil

Avant tout travail substantiel, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Si le profil est absent, incomplet ou contient `[A CONFIGURER]`, demander `/h-pi:entretien-demarrage` et garder les marqueurs `[à vérifier]` visibles.

## Intake

Identifier au minimum : demande, actif ou droit concerné, parties, territoire, dates utiles, documents disponibles, source officielle à consulter, urgence, sortie attendue et niveau de validation humaine requis.

## Gate non-juriste

Si l'utilisateur n'est pas juriste ou avocat, produire une explication opérationnelle, signaler les limites, refuser toute conclusion présentée comme avis juridique final et demander validation par un professionnel habilité avant usage externe.

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Propriété Intellectuelle` est disponible. Ne pas inventer de tool hors périmètre ; si une source ou un registre n'a pas été consulté directement, garder `[à vérifier]`.

- Socle textes, jurisprudence et droit UE : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Dessins et modèles, droit d'auteur, logiciels, bases de données et droits voisins : utiliser le socle officiel ci-dessus ; les registres spécialisés non exposés par le serveur restent `[à vérifier]` ou traités via preuve/document client autorisé.
- Anno, quand disponible, reste une source interne de dossier : jamais un registre officiel INPI, EUIPO, OEB, OMPI ou BOPI.

Ce skill prépare un **brouillon de cession patrimoniale stricte**. Il ne
produit pas un contrat final signable, ne remplace pas l'avocat, ne remplace
pas la qualification de l'œuvre, ne remplace pas une licence quand un
transfert de titularité est inutile, ne remplace pas le regime logiciel, et ne
se transforme pas en orchestrateur de portefeuille.

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/` ou `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`.

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

## Profil pratique à charger avant analyse

Avant toute rédaction, charger :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Le profil pratique calibre la posture de travail, le niveau de prudence, et la
forme des avertissements. Si le profil est incomplet ou non configuré, garder
les marqueurs de brouillon et les faire apparaitre explicitement :

- `[PROVISOIRE]`
- `[à vérifier]`
- `[À COMPLÉTER]`

Toute source, tout fait de contexte, ou toute base de titularité non vérifiés
reste marqué `[à vérifier]`.

## Garde-fous juridiques permanents

Le skill doit toujours garder visibles les limites suivantes :

- `L.131-3` : ecrit, enumeration des droits, domaines d'exploitation,
  territoires, durée, rémunération
- `L.131-4` : principe de rémunération proportionnelle et cas limits du forfait
- `L.131-1` : interdiction de la cession globale des œuvres futures hors
  exception
- le droit moral est inalienable et ne se cede pas
- la sortie distingue toujours faits, droit, analyse, risques, décision et
  validation humaine

## Contrat d'entrée fermé

Le skill doit dériver ou expliciter un des statuts fermés suivants pour chaque
dossier :

- `transfer_track`: `full-assignment` | `partial-assignment` |
  `exclusive-assignment` | `non-exclusive-assignment`
- `creation_context`: `independent-author` | `commissioned-work` |
  `employee-non-software` | `collective-work-claim` | `collaborative-work` |
  `audiovisual` | `publishing`
- `title_chain_status`: `clear` | `mixed` | `uncertain` | `blocked`
- `work_status`: `qualified` | `partially-qualified` | `uncertain`
- `economic_model`: `royalty` | `flat-fee` | `advance-plus-royalty` | `mixed`
- `scope_posture`: `narrow` | `standard` | `broad` | `all-current-uses`
- `counterparty_profile`: `publisher` | `producer` | `brand` | `platform` |
  `customer` | `internal-group` | `mixed`

Les statuts sont fermés. Le skill ne doit pas inventer de semi-vrai centré ou
de prose libre à la place du contrat d'entrée.

## Faits minimums requis

Ne pas produire une sortie propre si manquent :

- l'œuvre ou le corpus visé
- l'identité du cédant
- l'identité du cessionnaire
- la base de titularité du cédant
- les droits visés
- le territoire
- la durée
- le modèle economique
- le contexte de création
- le statut coauteur / employeur / prestataire si pertinent

Si les faits sont incomplets mais que le dossier reste exploitable, produire un
brouillon `partial` et garder les marqueurs `[PROVISOIRE]`, `[à vérifier]` et
`[À COMPLÉTER]` visibles dans la sortie.

## Seuil de préparation de la cession

Le skill applique un seuil fermé avec trois issues :

- `ready`
- `partial`
- `blocked`

### `ready`

Le dossier permet un brouillon de cession exploitable. La base de titularité
est suffisante, le contexte est lisible, et le branche retenue est cohérent avec
la demande.

### `partial`

Le dossier permet un brouillon, mais certains points restent à confirmer. La
sortie doit alors conserver les marqueurs :

- `[PROVISOIRE]`
- `[à vérifier]`
- `[À COMPLÉTER]`

### `blocked`

Bloquer si au moins un de ces cas domine :

- chaîne de titularité trop incertaine pour une cession propre
- cession globale d'œuvres futures hors exception admise
- une simple licence suffit manifestement
- personne morale qui prêtend ceder sans base de titularité claire
- coauteurs ou ayants droit nécessaires non sécurisés

Quand le seuil est bloqué, le skill doit orienter vers la bonne branche ou
arrêter proprement avec les régularisations à faire.

## Axe 1 - Work And Title Preconditions

Cette première bloc doit vérifier et resumer :

- la qualification minimale de l'œuvre
- la qualité du cédant
- la presence de coauteurs ou ayants droit
- le contexte salarié, commande, collaboration, edition ou audiovisuel
- l'existence d'une cession antérieure ou d'une chaîne de droits
- la limité absolue du droit moral

Si l'œuvre elle-même n'est pas encore qualifiable, router hors du skill.

## Axe 2 - Branche de transfert choisie

Le skill choisit clairement une seule branche principale parmi :

- cession totale
- cession partielle
- exclusivité
- non-exclusivité

La branche retenue doit être justifie par la structure de l'exploitation, la
position du cessionnaire, la posture de la chaîne de titre, et le niveau de
risque residuel.

## Axe 3 - Périmètre des droits et structure d’exploitation

Le skill doit toujours rendre lisibles :

- les droits cedes
- les domaines d'exploitation
- le territoire
- la durée
- les supports et usages visés
- les usages exclus

Si le périmètre est trop large sans base solide, le score de préparation baisse
et le dossier peut basculer en `partial` ou `blocked`.

## Axe 4 - Economic Structure

Le skill doit rendre visible :

- la logique proportionnelle de `L.131-4`
- le cas exceptionnel justifiant un forfait, si forfait il y a
- l'avance ou l'acompte quand il accompagne une logique proportionnelle
- le risque de requalification ou de faiblesse de structuration

Ne pas masquer un forfait non justifie sous une formule prudente.

## Axe 5 - Nettoyage de chaîne de titres ou points bloquants

Quand `title_chain_status` n'est pas `clear`, la sortie doit identifier :

- le point de rupture
- la personne manquante
- le document manquant
- la régularisation requise
- la consequence sur la route finale

La branche de cleanup ne doit jamais simuler un dossier complet alors que la
chaîne de titre reste instable.

### Branche bornée `title-chain-cleanup`

Cette branche sert uniquement à régulariser ou bloquer. Elle couvre :

- coauteurs non sécurisés
- signatures manquantes
- prestation commandee sans cession valable
- salarié hors logiciel mal compris
- personne morale sans base de titularité
- œuvre collective revendiquée sans base suffisante
- cession antérieure non documentée
- ayants droit non identifiés

Elle ne devient pas un audit général du portefeuille. Elle ne remplace pas le
skill `contrats-pi`, ni `qualification-oeuvre`, ni `licence-droit-auteur`.

## Frontieres obligatoires

### Router vers `qualification-oeuvre`

Si la qualification de l'œuvre, son originalité, ou la titularité initiale
restent trop incertaines.

### Router vers `licence-droit-auteur`

Si la demande releve en realite d'une autorisation d'exploitation et non d'un
transfert de titularité.

### Router vers `logiciels-pi`

Si le coeur du sujet est le regime logiciel, notamment :

- `L.113-9`
- code source
- droit d'utilisation logiciel
- licence logicielle dominante

### Router vers `contrats-pi`

Si la cession n'est qu'un volet d'un contrat PI plus large.

## Sortie V2 stabilisée en 9 blocs

La sortie doit toujours utiliser exactement ces 9 blocs et aucun autre titre
de bloc de haut niveau :

1. `Synthèse du dossier`
2. `Seuil de préparation de cession`
3. `Work And Title Preconditions`
4. `Branche de transfert choisie`
5. `Rights Scope And Exploitation Structure`
6. `Economic Structure`
7. `Title-Chain Cleanup Or Blocking Points`
8. `Routage de décision`
9. `Validation humaine`

### Attendus par bloc

- `Synthèse du dossier` : résumé fermé des faits, du contexte, de la branche pressentie et
  du niveau de certitude
- `Seuil de préparation de cession` : statut `ready`, `partial` ou `blocked`,
  justifie de maniere concise
- `Work And Title Preconditions` : qualification, titularité, auteurs, chaîne
  de droits, contexte
- `Branche de transfert choisie` : branche retenue et raison
- `Rights Scope And Exploitation Structure` : droits, domaines, territoire,
  durée, usages, exclusions
- `Economic Structure` : logique rémunération, proportionnel ou forfait
  justifie, risques
- `Title-Chain Cleanup Or Blocking Points` : rupture, manque, régularisation ou
  blocage
- `Routage de décision` : une seule issue fermée
- `Validation humaine` : validation humaine requise avant toute suite

Les brouillons `partial` conservent partout ou nécessaire les marqueurs
`[PROVISOIRE]`, `[à vérifier]` et `[À COMPLÉTER]`.

## Routage de décision fermé

Le skill doit terminer par une seule route principale parmi :

- `prepare-full-assignment-draft`
- `prepare-partial-assignment-draft`
- `prepare-exclusive-assignment-draft`
- `prepare-non-exclusive-assignment-draft`
- `route-to-work-qualification`
- `route-to-license-instead`
- `route-to-title-chain-cleanup`
- `route-to-software-regime-review`
- `route-to-broader-pi-contract`
- `hold-insufficient-basis`

### Usage de chaque route

- `prepare-full-assignment-draft` : cession large, base solide, title chain
  clair
- `prepare-partial-assignment-draft` : cession ciblee avec zones reservees ou
  facts incomplets mais exploitables
- `prepare-exclusive-assignment-draft` : transfert exclusif sécurisé
- `prepare-non-exclusive-assignment-draft` : transfert non exclusif sécurisé
- `route-to-work-qualification` : qualification amont encore insuffisante
- `route-to-license-instead` : exploitation à autoriser, pas à transférer
- `route-to-title-chain-cleanup` : régularisation de titre avant cession
- `route-to-software-regime-review` : regime logiciel dominant
- `route-to-broader-pi-contract` : cession incluse dans un contrat PI plus large
- `hold-insufficient-basis` : base insuffisante ou blocage non resolu

Ne pas inventer de semantique de routage supplementaire.

## Ton et validation humaine

Le ton doit rester juridique, précis et fermé. Le skill doit :

- rappeler que le droit moral ne se cede pas
- garder les garde-fous `L.131-3`, `L.131-4`, `L.131-1`
- distinguer faits, droit, analyse, risques, décision et validation humaine
- assumer un brouillon structuré, jamais un contrat final valide

La validation humaine est obligatoire à la fin de chaque sortie.
