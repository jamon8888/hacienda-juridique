---
name: certificat-complementaire-protection
description: >
  Readiness stricte CCP pour medicaments et produits phytopharmaceutiques :
  eligibility et apply comme branches centrales, article 3, première AMM UE,
  durée, fenêtre de dépôt, extension pédiatrique et vérification secondaire
  bornée. Brouillon soumis à validation humaine finale.
version: "2.0.0"
argument-hint: "[eligibility|apply|check]"
authors: ["Hacienda"]
tags:
  [
    CCP,
    SPC,
    brevet,
    AMM,
    medicament,
    phyto,
    article-3,
    extension-pediatrique,
    manufacturing-waiver,
    V2,
  ]
---

# Skill - Certificat complémentaire de protection V2

> **BROUILLON DE READINESS CCP, PAS CONSEIL JURIDIQUE FINAL NI DÉPÔT EFFECTIF.**
>
> `certificat-complementaire-protection` V2 sert à cadrer la préparation d'un
> dossier CCP autour de l'article 3, de la première AMM UE, de la durée, de la
> fenêtre de dépôt et de l'extension pédiatrique. La sortie reste un brouillon
> de travail Hacienda, soumis à validation finale par un mandataire en brevets
> ou un avocat spécialisé sciences de la vie.

Référence de travail utile :
`references/certificat-complementaire-protection-routing-and-output.md`

## Rôle strict

Le skill :

- traite en priorité la préparation `eligibility` et `apply` pour un CCP ;
- structure l'analyse autour du brevet de base, du produit, de l'AMM, de la
  première AMM UE, de l'article 3, de la durée et de la fenêtre de dépôt ;
- borné `check` à une vérification secondaire d'un CCP existant ou presume ;
- borné `manufacturing-waiver-signal` à un simple signal de posture secondaire ;
- route vers invalidité, portefeuille ou revue plus spécialisée quand la
  question dominante sort de la préparation CCP.

Le skill ne fait pas :

- un dépôt effectif INPI ou dans un autre office ;
- une opinion finale de validité ou de contrefaçon ;
- une revue principale de nullité du brevet de base ;
- une revue principale de portefeuille brevets ;
- une vérification exhaustive de tous registres ou AMM non consultés ;
- une substitution à la validation humaine finale.

## Positionnement V2

### Branche principale `eligibility`

`eligibility` est la branche normale pour :

- vérifier si le dossier peut franchir un premier seuil CCP exploitable ;
- tester les conditions de l'article 3 et la posture première AMM UE ;
- identifier si le dossier est prêt, partiel ou bloqué avant toute suite.

### Branche principale `apply`

`apply` sert à :

- préparer un brouillon de préparation pour une demande CCP ;
- cadrer le minimum factuel, la durée calculée, la fenêtre de dépôt et les
  pièces à confirmer ;
- sortir une route fermée de préparation ou de hold documenté.

### Branche secondaire `check`

`check` reste strictement bornée. Elle sert seulement à :

- vérifier un CCP existant, signalé ou presume ;
- contrôler la cohérence apparente du titre, de la durée, de l'extension et de
  la posture première AMM UE ;
- rerouter vers `hold-for-duplicate-ccp-review` ou vers une revue plus
  spécialisée si la vérification révèle un risque structurel.

Cette branche ne transforme pas le skill en audit complet de contentieux ou de
nullité.

### Branche secondaire `manufacturing-waiver-signal`

Le manufacturing waiver reste strictement secondaire. Il sert seulement à :

- signaler une exposition `export-signal` ou `stockpiling-signal` ;
- identifier les notifications ou formalités à vérifier ;
- qualifier une pression apparente d'entrée générique ou de stockage ;
- rappeler qu'il s'agit d'une posture aval autour du CCP existant ;
- rerouter sans absorber l'analyse principale de préparation CCP.

## Sources et garde-fous

- Prioriser `hacienda-sources-officielles` pour les sources primaires et
  officielles.
- Pour les CCP, privilegier les textes et registres officiels pertinents :
  règlement (CE) n° 469/2009, règlement (CE) n° 1610/96,
  règlement (CE) n° 1901/2006, règlement (UE) 2019/933, INPI, EMA, ANSM,
  EU Commission et jurisprudence CJUE effectivement consultée.
- Toute source non consultée reste marquée `[à vérifier]`.
- Toute information incomplète doit conserver les marqueurs
  `[PROVISOIRE]`, `[à vérifier]`, `[À COMPLÉTER]`.
- Distinguer clairement faits, droit, analyse, incertitudes, décisions et
  validation humaine.
- Ne jamais présenter le resultat comme conseil juridique final ni comme
  confirmation définitive de délivrance d'un CCP.

## Chargement du profil

Charger si disponible :

- secteur sciences de la vie dominant et branche médicament / phyto ;
- habitudes de validation humaine et pratique office ;
- sensibilité client aux dates pivots, au risque première AMM et à la revue de
  portefeuille.

Si le profil est absent ou incomplet, garder les hypothèses visibles avec
`[PROVISOIRE]`.

## Contrat d'entrée V2

### Closed cadrage initial contract

- `mode`: `eligibility` | `apply` | `check`
- `product_track`: `medicinal` | `plant-protection`
- `base_patent_status`: `clear` | `mixed` | `weak` | `unknown`
- `authorization_posture`: `valid-first-eu` |
  `valid-but-first-eu-unclear` | `authorization-unclear` | `blocked`
- `claim_match_posture`: `strong` | `mixed` | `weak` | `unknown`
- `pediatric_extension_status`: `not-applicable` | `possible` |
  `documented` | `unclear`
- `waiver_posture`: `none` | `export-signal` | `stockpiling-signal` | `mixed`

### Faits minimaux

Ne jamais présenter la sortie comme exploitable sans au moins :

- produit identifié de façon intelligible ;
- `product_track` retenu ;
- brevet de base identifié avec numéro, office, statut et date d'expiration ou
  de fin attendue ;
- date de dépôt du brevet de base ;
- revendications ou logique de couverture produit minimales ;
- autorisation invoquée identifiée avec date, autorité et statut apparent ;
- posture première AMM UE documentée ou explicitement incertaine ;
- vérifications minimales sur l'absence ou l'existence présumée d'un CCP
  antérieur pour le produit ;
- mode demande (`eligibility`, `apply` ou `check`) ;
- sources effectivement consultées et date de consultation.

Ajouter selon les cas, si disponible :

- date de délivrance du brevet si la fenêtre de dépôt dépend d'elle ;
- date de première autorisation de mise sur le marché dans l'UE / EEE ;
- produit AMM, substance active ou combinaison exacte ;
- données utiles au calcul de durée ;
- base pour l'extension pédiatrique ;
- indices documentés de waiver export / stockpiling ;
- territoire office et numéro de CCP existant si `check`.

Tout manque reste `[à vérifier]`.

## Seuil de préparation du CCP

Le skill doit conclure sur une seule valeur :

- `ready`
- `partial`
- `blocked`

### `ready`

Le dossier permet une analyse CCP exploitable en brouillon, avec base minimale
factuelle suffisante pour déterminer la posture article 3, la durée et la
fenêtre procédurale, sous réserve de validation humaine finale.

### `partial`

Le dossier permet un brouillon structuré, mais avec trous ou fragilités.
Conserver visiblement :

- `[PROVISOIRE]`
- `[à vérifier]`
- `[À COMPLÉTER]`

Cas frequents :

- brevet de base identifiable mais posture `mixed` ou `unknown` ;
- première AMM UE plausible mais non sécurisée ;
- couverture revendications / produit seulement `mixed` ;
- registre CCP ou duplications non entierement vérifiés ;
- extension pédiatrique seulement `possible` ou `unclear` ;
- dates utiles au calcul présentes mais pas encore confirmées sur source
  primaire.

### `blocked`

Bloquer le skill si :

- `authorization_posture = blocked` ;
- le produit n'est pas identifiable avec un minimum de precision ;
- le brevet de base n'est pas identifiable ou son statut est inutilisable ;
- la date de dépôt du brevet de base ou la base minimale d'expiration ne peut
  pas être établie ;
- aucune base sérieuse ne permet de décrire le lien produit / revendications ;
- aucune autorisation exploitable ne peut être documentée ;
- la première AMM UE est déterminante mais aucune base minimale ne permet de la
  vérifier ;
- en `apply`, la fenêtre de dépôt ne peut pas être calculée ou est
  manifestement dépassée sur la base disponible ;
- en `eligibility`, la base minimale manque pour conclure sur l'article 3 ou la
  durée apparente ;
- en `check`, aucun CCP visé ou aucune base de vérification minimale ne peut
  être identifié, ou ses pièces minimales ne sont pas disponibles ;
- aucune source effectivement consultée et datée ne peut être documentée.

En `blocked`, ne pas simuler une conclusion positive. Sortir vers la route
fermée correspondant au motif dominant :

- `hold-for-claim-scope-review` ;
- `hold-for-first-amm-review` ;
- `hold-for-duplicate-ccp-review` ;
- `route-to-patent-invalidity-review` ;
- `hold-insufficient-basis`.

## Logique CCP centrale

### Brevet de base et produit

- vérifier si le brevet de base est encore une base plausible de CCP ;
- qualifier la posture `base_patent_status` sans présenter la validité comme
  acquise si elle ne l'est pas ;
- documenter le niveau de correspondance entre produit AMM et revendications ;
- utiliser `claim_match_posture` pour cadrer le risque article 3(a).

### Article 3 review

Analyser systematiquement :

- article 3(a) : produit protégé par le brevet de base ;
- article 3(b) : autorisation de mise sur le marché valide ;
- article 3(c) : absence de CCP déjà octroye pour le produit pertinent ou
  besoin de revue duplication ;
- article 3(d) : première AMM du produit dans l'UE / EEE, ou au minimum posture
  documentée sur ce point.

Si la branche est `plant-protection`, adapter la grille au règlement (CE)
n° 1610/96 en gardant la même discipline de préparation.

### Durée et extension

- calculer la durée apparente du CCP selon la formule applicable ;
- borner la durée maximale à 5 ans ;
- signaler si le calcul aboutit à une durée nulle ou non exploitable ;
- ajouter l'extension pédiatrique seulement si la base correspondante est
  `documented`, ou la marquer `[à vérifier]` si seulement `possible` ;
- ne pas simuler une extension pédiatrique pour `plant-protection` si elle
  n'est pas applicable.

### Fenêtre de dépôt

- vérifier la logique de l'article 7 : 6 mois après l'AMM ou 6 mois après la
  délivrance du brevet selon la sequence pertinente ;
- en `apply`, traiter la fenêtre de dépôt comme point de blocage prioritaire ;
- si la fenêtre est incertaine mais pas manifestement dépassée, sortir en
  `partial` avec dates `[À COMPLÉTER]`.

### Vérification secondaire `check`

En `check`, limiter l'analyse à :

- identification du CCP existe ou presume ;
- cohérence apparente entre brevet, produit, AMM et première AMM UE ;
- durée, expiration et extension pédiatrique apparentes ;
- signal duplication / waiver / lacune de base.

Ne pas transformer `check` en opinion contentieuse complète.

### Signal secondaire `manufacturing-waiver-signal`

N'activer ce signal que si `waiver_posture` n'est pas `none`.

Le signal doit :

- rappeler que le waiver n'elargit pas l'eligibilite CCP ;
- distinguer `export-signal` et `stockpiling-signal` ;
- identifier les notifications ou formalités à vérifier ;
- qualifier toute pression apparente d'entrée générique ou de stockage ;
- rester borné à une posture informative aval.

## Liste de routage fermée

Une seule route finale :

- `prepare-ccp-application`
- `prepare-ccp-application-with-caution`
- `hold-for-claim-scope-review`
- `hold-for-first-amm-review`
- `hold-for-duplicate-ccp-review`
- `signal-manufacturing-waiver-posture`
- `route-to-patent-invalidity-review`
- `route-to-patent-portfolio-review`
- `hold-insufficient-basis`

## Sortie stable en 9 blocs

La sortie doit toujours utiliser exactement ces 9 blocs :

1. `Synthèse du dossier`
2. `CCP Readiness Gate`
3. `Base Patent And Product Match`
4. `Authorization And First EU Marketing Posture`
5. `Article 3 Eligibility`
6. `Duration And Extension Calculation`
7. `Filing Window Or Existing CCP Check`
8. `Routage de décision`
9. `Validation humaine`

## Règles de routage

- router vers `prepare-ccp-application` si le seuil est `ready`, que
  l'article 3 apparait franchissable, que la fenêtre de dépôt est exploitable
  et qu'aucune alerte dominante ne bloqué ;
- router vers `prepare-ccp-application-with-caution` si le seuil est `partial`
  mais que le dossier reste preparable avec reservations visibles ;
- router vers `hold-for-claim-scope-review` si le point dominant est
  l'article 3(a) ou le couplage produit / revendications ;
- router vers `hold-for-first-amm-review` si le point dominant est l'article
  3(d) ou la première AMM UE ;
- router vers `hold-for-duplicate-ccp-review` si l'article 3(c) reste incertain
  ou s'il existe un risque de duplication ;
- router vers `signal-manufacturing-waiver-posture` uniquement comme issue
  secondaire lorsque le signal waiver est le fait saillant en `check` ou en
  suivi d'un CCP déjà constitue ;
- router vers `route-to-patent-invalidity-review` si la faiblesse dominante est
  le brevet de base lui-même ;
- router vers `route-to-patent-portfolio-review` si la question réelle porte
  sur plusieurs brevets, familles ou arbitrages titres / pays ;
- router vers `hold-insufficient-basis` si la base factuelle minimale manque.

## Format de sortie attendu

```markdown
# Synthèse du dossier
- Mode: `eligibility|apply|check`
- Branche produit : `medicinal|plant-protection`
- Produit: [...]
- Brevet de base: [...]
- Autorisation invoquee: [...]
- Sources consultées : [...]

# CCP Readiness Gate
- Gate: `ready|partial|blocked`
- Motif central: [...]
- Marqueurs visibles si `partial`: [PROVISOIRE] [à vérifier] [À COMPLÉTER]

# Base Patent And Product Match
[statut brevet, produit, revendications, claim match posture]

# Authorization And First EU Marketing Posture
[autorisation, premiere AMM UE, dates, incertitudes]

# Article 3 Eligibility
- Overall eligibility posture: `franchissable|reservee|bloquée`
- 3(a): [...]
- 3(b): [...]
- 3(c): [...]
- 3(d): [...]

# Duration And Extension Calculation
[calcul, duree, plafond, extension pediatrique ou non]

# Filing Window Or Existing CCP Check
[fenetre article 7 ou verification du CCP existant]

# Decision Routing
- Route finale: `...`
- Raison courte: [...]

# Human Validation
- Points à valider avec un spécialiste : [...]
- Sources primaires restant à consulter : [...]
```

## Frontieres avec les skills voisins

- si le sujet principal devient une notification de prosecution du brevet de
  base, router vers `analyse-refus-inpi` ;
- si le sujet principal devient la validité du brevet adverse ou du brevet de
  base, router vers `anteriorite-invalidite` ;
- si le sujet principal devient l'organisation de familles, annuités,
  expirations ou arbitrages multi-titres, router vers
  `revue-portefeuille-brevets` ;
- si le sujet principal devient la recherche amont de brevetabilite, router
  vers `recherche-anteriorite-brevet` ;
- si le sujet principal devient la préparation d'un dépôt de brevet initial,
  router vers `preparation-depot-brevet`.

## Rappel final

Toujours conclure que :

- la sortie est un brouillon Hacienda ;
- les marqueurs `[PROVISOIRE]`, `[à vérifier]`, `[À COMPLÉTER]` restent en
  place tant que la base n'est pas consolidee ;
- la décision finale et tout dépôt effectif exigent validation humaine
  spécialisée.
