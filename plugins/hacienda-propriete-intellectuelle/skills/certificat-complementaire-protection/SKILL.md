---
name: certificat-complementaire-protection
description: >
  Readiness stricte CCP pour medicaments et produits phytopharmaceutiques :
  eligibility et apply comme branches centrales, article 3, premiere AMM UE,
  duree, fenetre de depot, extension pediatrique et verification secondaire
  bornee. Brouillon soumis a validation humaine finale.
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

# Skill - Certificat complementaire de protection V2

> **BROUILLON DE READINESS CCP, PAS CONSEIL JURIDIQUE FINAL NI DEPOT EFFECTIF.**
>
> `certificat-complementaire-protection` V2 sert a cadrer la readiness d'un
> dossier CCP autour de l'article 3, de la premiere AMM UE, de la duree, de la
> fenetre de depot et de l'extension pediatrique. La sortie reste un brouillon
> de travail Hacienda, soumis a validation finale par un mandataire en brevets
> ou un avocat specialise life sciences.

Reference de travail utile :
`references/certificat-complementaire-protection-routing-and-output.md`

## Role strict

Le skill :

- traite en priorite la readiness `eligibility` et `apply` pour un CCP ;
- structure l'analyse autour du brevet de base, du produit, de l'AMM, de la
  premiere AMM UE, de l'article 3, de la duree et de la fenetre de depot ;
- borne `check` a une verification secondaire d'un CCP existant ou presume ;
- borne `manufacturing-waiver-signal` a un simple signal de posture secondaire ;
- route vers invalidite, portefeuille ou revue plus specialisee quand la
  question dominante sort du readiness CCP.

Le skill ne fait pas :

- un depot effectif INPI ou dans un autre office ;
- une opinion finale de validite ou de contrefacon ;
- une revue principale de nullite du brevet de base ;
- une revue principale de portefeuille brevets ;
- une verification exhaustive de tous registres ou AMM non consultes ;
- une substitution a la validation humaine finale.

## Positionnement V2

### Branche principale `eligibility`

`eligibility` est la branche normale pour :

- verifier si le dossier peut franchir un premier gate CCP exploitable ;
- tester les conditions de l'article 3 et la posture premiere AMM UE ;
- identifier si le dossier est pret, partiel ou bloque avant toute suite.

### Branche principale `apply`

`apply` sert a :

- preparer un brouillon de readiness pour une demande CCP ;
- cadrer le minimum factuel, la duree calculee, la fenetre de depot et les
  pieces a confirmer ;
- sortir une route fermee de preparation ou de hold documente.

### Branche secondaire `check`

`check` reste strictement bornee. Elle sert seulement a :

- verifier un CCP existant, signale ou presume ;
- controler la coherence apparente du titre, de la duree, de l'extension et de
  la posture premiere AMM UE ;
- rerouter vers `hold-for-duplicate-ccp-review` ou vers une revue plus
  specialisee si la verification revele un risque structurel.

Cette branche ne transforme pas le skill en audit complet de contentieux ou de
nullite.

### Branche secondaire `manufacturing-waiver-signal`

Le manufacturing waiver reste strictement secondaire. Il sert seulement a :

- signaler une exposition `export-signal` ou `stockpiling-signal` ;
- identifier les notifications ou formalites a verifier ;
- qualifier une pression apparente d'entree generique ou de stockage ;
- rappeler qu'il s'agit d'une posture aval autour du CCP existant ;
- rerouter sans absorber l'analyse principale de readiness CCP.

## Sources et garde-fous

- Prioriser `hacienda-sources-officielles` pour les sources primaires et
  officielles.
- Pour les CCP, privilegier les textes et registres officiels pertinents :
  reglement (CE) ndeg 469/2009, reglement (CE) ndeg 1610/96,
  reglement (CE) ndeg 1901/2006, reglement (UE) 2019/933, INPI, EMA, ANSM,
  EU Commission et jurisprudence CJUE effectivement consultee.
- Toute source non consultee reste marquee `[a verifier]`.
- Toute information incomplete doit conserver les marqueurs
  `[PROVISOIRE]`, `[a verifier]`, `[A COMPLETER]`.
- Distinguer clairement faits, droit, analyse, incertitudes, decisions et
  validation humaine.
- Ne jamais presenter le resultat comme conseil juridique final ni comme
  confirmation definitive de delivrance d'un CCP.

## Chargement du profil

Charger si disponible :

- secteur life sciences dominant et track medicament / phyto ;
- habitudes de validation humaine et pratique office ;
- sensibilite client aux dates pivots, au risque premiere AMM et a la revue de
  portefeuille.

Si le profil est absent ou incomplet, garder les hypotheses visibles avec
`[PROVISOIRE]`.

## Contrat d'entree V2

### Closed intake contract

- `mode`: `eligibility` | `apply` | `check`
- `product_track`: `medicinal` | `plant-protection`
- `base_patent_status`: `clear` | `mixed` | `weak` | `unknown`
- `authorization_posture`: `valid-first-eu` |
  `valid-but-first-eu-unclear` | `authorization-unclear` | `blocked`
- `claim_match_posture`: `strong` | `mixed` | `weak` | `unknown`
- `pediatric_extension_status`: `not-applicable` | `possible` |
  `documented` | `unclear`
- `waiver_posture`: `none` | `export-signal` | `stockpiling-signal` | `mixed`

### Minimum Fact Set

Ne jamais presenter la sortie comme exploitable sans au moins :

- produit identifie de facon intelligible ;
- `product_track` retenu ;
- brevet de base identifie avec numero, office, statut et date d'expiration ou
  de fin attendue ;
- date de depot du brevet de base ;
- revendications ou logique de couverture produit minimales ;
- autorisation invoquee identifiee avec date, autorite et statut apparent ;
- posture premiere AMM UE documentee ou explicitement incertaine ;
- verifications minimales sur l'absence ou l'existence presumee d'un CCP
  anterieur pour le produit ;
- mode demande (`eligibility`, `apply` ou `check`) ;
- sources effectivement consultees et date de consultation.

Ajouter selon les cas, si disponible :

- date de delivrance du brevet si la fenetre de depot depend d'elle ;
- date de premiere autorisation de mise sur le marche dans l'UE / EEE ;
- produit AMM, substance active ou combinaison exacte ;
- donnees utiles au calcul de duree ;
- base pour l'extension pediatrique ;
- indices documentes de waiver export / stockpiling ;
- territoire office et numero de CCP existant si `check`.

Tout manque reste `[a verifier]`.

## CCP Readiness Gate

Le skill doit conclure sur une seule valeur :

- `ready`
- `partial`
- `blocked`

### `ready`

Le dossier permet une analyse CCP exploitable en brouillon, avec base minimale
factuelle suffisante pour determiner la posture article 3, la duree et la
fenetre procedurale, sous reserve de validation humaine finale.

### `partial`

Le dossier permet un brouillon structure, mais avec trous ou fragilites.
Conserver visiblement :

- `[PROVISOIRE]`
- `[a verifier]`
- `[A COMPLETER]`

Cas frequents :

- brevet de base identifiable mais posture `mixed` ou `unknown` ;
- premiere AMM UE plausible mais non securisee ;
- couverture revendications / produit seulement `mixed` ;
- registre CCP ou duplications non entierement verifies ;
- extension pediatrique seulement `possible` ou `unclear` ;
- dates utiles au calcul presentes mais pas encore confirmees sur source
  primaire.

### `blocked`

Bloquer le skill si :

- `authorization_posture = blocked` ;
- le produit n'est pas identifiable avec un minimum de precision ;
- le brevet de base n'est pas identifiable ou son statut est inutilisable ;
- la date de depot du brevet de base ou la base minimale d'expiration ne peut
  pas etre etablie ;
- aucune base serieuse ne permet de decrire le lien produit / revendications ;
- aucune autorisation exploitable ne peut etre documentee ;
- la premiere AMM UE est determinante mais aucune base minimale ne permet de la
  verifier ;
- en `apply`, la fenetre de depot ne peut pas etre calculee ou est
  manifestement depassee sur la base disponible ;
- en `eligibility`, la base minimale manque pour conclure sur l'article 3 ou la
  duree apparente ;
- en `check`, aucun CCP vise ou aucune base de verification minimale ne peut
  etre identifie, ou ses pieces minimales ne sont pas disponibles ;
- aucune source effectivement consultee et datee ne peut etre documentee.

En `blocked`, ne pas simuler une conclusion positive. Sortir vers la route
fermee correspondant au motif dominant :

- `hold-for-claim-scope-review` ;
- `hold-for-first-amm-review` ;
- `hold-for-duplicate-ccp-review` ;
- `route-to-patent-invalidity-review` ;
- `hold-insufficient-basis`.

## Logique CCP centrale

### Brevet de base et produit

- verifier si le brevet de base est encore une base plausible de CCP ;
- qualifier la posture `base_patent_status` sans presenter la validite comme
  acquise si elle ne l'est pas ;
- documenter le niveau de correspondance entre produit AMM et revendications ;
- utiliser `claim_match_posture` pour cadrer le risque article 3(a).

### Article 3 review

Analyser systematiquement :

- article 3(a) : produit protege par le brevet de base ;
- article 3(b) : autorisation de mise sur le marche valide ;
- article 3(c) : absence de CCP deja octroye pour le produit pertinent ou
  besoin de revue duplication ;
- article 3(d) : premiere AMM du produit dans l'UE / EEE, ou au minimum posture
  documentee sur ce point.

Si le track est `plant-protection`, adapter la grille au reglement (CE)
ndeg 1610/96 en gardant la meme discipline de readiness.

### Duree et extension

- calculer la duree apparente du CCP selon la formule applicable ;
- borner la duree maximale a 5 ans ;
- signaler si le calcul aboutit a une duree nulle ou non exploitable ;
- ajouter l'extension pediatrique seulement si la base correspondante est
  `documented`, ou la marquer `[a verifier]` si seulement `possible` ;
- ne pas simuler une extension pediatrique pour `plant-protection` si elle
  n'est pas applicable.

### Fenetre de depot

- verifier la logique de l'article 7 : 6 mois apres l'AMM ou 6 mois apres la
  delivrance du brevet selon la sequence pertinente ;
- en `apply`, traiter la fenetre de depot comme point de blocage prioritaire ;
- si la fenetre est incertaine mais pas manifestement depassee, sortir en
  `partial` avec dates `[A COMPLETER]`.

### Verification secondaire `check`

En `check`, limiter l'analyse a :

- identification du CCP existe ou presume ;
- coherence apparente entre brevet, produit, AMM et premiere AMM UE ;
- duree, expiration et extension pediatrique apparentes ;
- signal duplication / waiver / lacune de base.

Ne pas transformer `check` en opinion contentieuse complete.

### Signal secondaire `manufacturing-waiver-signal`

N'activer ce signal que si `waiver_posture` n'est pas `none`.

Le signal doit :

- rappeler que le waiver n'elargit pas l'eligibilite CCP ;
- distinguer `export-signal` et `stockpiling-signal` ;
- identifier les notifications ou formalites a verifier ;
- qualifier toute pression apparente d'entree generique ou de stockage ;
- rester borne a une posture informative aval.

## Closed routing list

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

## Output stable en 9 blocs

La sortie doit toujours utiliser exactement ces 9 blocs :

1. `Case Snapshot`
2. `CCP Readiness Gate`
3. `Base Patent And Product Match`
4. `Authorization And First EU Marketing Posture`
5. `Article 3 Eligibility`
6. `Duration And Extension Calculation`
7. `Filing Window Or Existing CCP Check`
8. `Decision Routing`
9. `Human Validation`

## Regles de routage

- router vers `prepare-ccp-application` si le gate est `ready`, que
  l'article 3 apparait franchissable, que la fenetre de depot est exploitable
  et qu'aucune alerte dominante ne bloque ;
- router vers `prepare-ccp-application-with-caution` si le gate est `partial`
  mais que le dossier reste preparable avec reservations visibles ;
- router vers `hold-for-claim-scope-review` si le point dominant est
  l'article 3(a) ou le couplage produit / revendications ;
- router vers `hold-for-first-amm-review` si le point dominant est l'article
  3(d) ou la premiere AMM UE ;
- router vers `hold-for-duplicate-ccp-review` si l'article 3(c) reste incertain
  ou s'il existe un risque de duplication ;
- router vers `signal-manufacturing-waiver-posture` uniquement comme issue
  secondaire lorsque le signal waiver est le fait saillant en `check` ou en
  suivi d'un CCP deja constitue ;
- router vers `route-to-patent-invalidity-review` si la faiblesse dominante est
  le brevet de base lui-meme ;
- router vers `route-to-patent-portfolio-review` si la question reelle porte
  sur plusieurs brevets, familles ou arbitrages titres / pays ;
- router vers `hold-insufficient-basis` si la base factuelle minimale manque.

## Format de sortie attendu

```markdown
# Case Snapshot
- Mode: `eligibility|apply|check`
- Product track: `medicinal|plant-protection`
- Produit: [...]
- Brevet de base: [...]
- Autorisation invoquee: [...]
- Sources consultees: [...]

# CCP Readiness Gate
- Gate: `ready|partial|blocked`
- Motif central: [...]
- Marqueurs visibles si `partial`: [PROVISOIRE] [a verifier] [A COMPLETER]

# Base Patent And Product Match
[statut brevet, produit, revendications, claim match posture]

# Authorization And First EU Marketing Posture
[autorisation, premiere AMM UE, dates, incertitudes]

# Article 3 Eligibility
- Overall eligibility posture: `franchissable|reservee|bloquee`
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
- Points a valider en specialiste: [...]
- Sources primaires restant a consulter: [...]
```

## Frontieres avec les skills voisins

- si le sujet principal devient une notification de prosecution du brevet de
  base, router vers `analyse-refus-inpi` ;
- si le sujet principal devient la validite du brevet adverse ou du brevet de
  base, router vers `anteriorite-invalidite` ;
- si le sujet principal devient l'organisation de familles, annuites,
  expirations ou arbitrages multi-titres, router vers
  `revue-portefeuille-brevets` ;
- si le sujet principal devient la recherche amont de brevetabilite, router
  vers `recherche-anteriorite-brevet` ;
- si le sujet principal devient la preparation d'un depot de brevet initial,
  router vers `preparation-depot-brevet`.

## Rappel final

Toujours conclure que :

- la sortie est un brouillon Hacienda ;
- les marqueurs `[PROVISOIRE]`, `[a verifier]`, `[A COMPLETER]` restent en
  place tant que la base n'est pas consolidee ;
- la decision finale et tout depot effectif exigent validation humaine
  specialisee.
