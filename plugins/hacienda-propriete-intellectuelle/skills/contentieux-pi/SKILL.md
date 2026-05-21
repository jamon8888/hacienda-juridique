---
name: contentieux-pi
description: >
  Playbook judiciaire PI V2 pour cadrer une attaque ou une defense devant les
  juridictions competentes, du pre-filing a l'appel, sans rediger les actes de
  procedure ni absorber les workflows precontentieux generalistes.
version: "2.0.0"
argument-hint: "[attack|defense|appeal|urgent] [faits | pieces | titre | juridiction | calendrier]"
authors: ["Hacienda"]
tags: [contentieux, PI, judiciaire, contrefacon, nullite, appel, TJ-Paris, CA-Paris]
---

# Skill - Contentieux PI V2

## Positionnement

Ce skill est le point d'entree **judiciaire uniquement** pour la propriete
intellectuelle. Il sert a cadrer une strategie d'attaque ou de defense deja
orientee vers une trajectoire contentieuse, a mesurer la recevabilite, a
ordonner les demandes et defenses, et a preparer un memo de decision pour revue
humaine.

Aide-memo de synthese :
`references/contentieux-pi-tracks-and-routing.md`. En cas d'ecart, seul ce
`SKILL.md` fait foi.

Il ne constitue ni un acte de procedure, ni un avis juridique final, ni la
maison par defaut des lettres simples, des discussions amiables, de la seule
collecte probatoire ou de la mediation exploratoire.

Validation avocat obligatoire avant toute saisine, toute position externe, tout
choix de forum, toute demande provisoire, toute transaction engageante et toute
decision d'appel.

## Scope Trigger

Utiliser `contentieux-pi` quand au moins une de ces conditions est vraie :

- assignation deja recue ou preparee ;
- refere envisage ou deja lance ;
- procedure au fond deja decidee ou quasi decidee ;
- recours contre decision deja dans la fenetre procedurale ;
- besoin d'un pilotage judiciaire, budgetaire et calendrier d'affaire ;

Ne pas utiliser ce skill comme voie normale pour :

- une simple mise en demeure ou reponse amiable ;
- un intake de signal faible encore mal qualifie ;
- une collecte de preuve de creation ou d'anteriorite non rattachee a une
  strategie judiciaire immediate ;
- une mediation ou negociation precontentieuse qui ne demande pas encore de
  choix proceduraux.

## Ne fait pas

- Ne redige pas les actes de procedure, conclusions, requetes, declarations
  d'appel ou jeux de pieces finaux.
- Ne remplace pas l'analyse detaillee d'un titre, d'une validite technique ou
  d'un quantum d'expertise quand un skill specialise est requis.
- Ne presente jamais une allegation client, adverse ou interne comme un fait
  etabli sans piece.
- Ne presente jamais une chance de succes, une competence ou une recevabilite
  comme certaine quand une source, une piece ou une verification manque.
- Ne remplace pas `tri-contrefacon`, `mise-en-demeure-pi`,
  `depot-preuve-creation` ou `strategie-defense-pi` quand le vrai besoin reste
  precontentieux ou defensif amont.

## Intake

Le skill opere uniquement avec le contrat d'entree judiciaire V2 suivant :

- `mode`: `attack`, `defense`
- `contentious_track`: `brevet-infringement`, `marque-infringement`,
  `dm-infringement`, `copyright-infringement`, `nullity-revocation`,
  `unfair-competition`, `appeal`
- `procedure_stage`: `pre-filing`, `urgent-relief`, `on-the-merits`,
  `pending-case`, `appeal-window`, `appeal-ongoing`

Champs d'entree requis a exposer explicitement :

- `rights_at_issue`
- `parties`
- `forum`
- `known_facts`
- `evidence_status`
- `business_objective`

Collecter ensuite, en marquant `[a verifier]` tout point non controle :

- parties, qualite a agir, roles proceduraux, avocat ou conseil deja saisi ;
- droits invoques ou contestes, territoire, statut apparent du titre ;
- faits materiels, chronologie, dernier evenement utile, urgence alleguee ;
- pieces consultees, pieces seulement mentionnees, trous critiques ;
- juridiction envisagee ou deja saisie, audience ou echeance connue ;
- objectif contentieux : cessation, defense, nullite, rejet, provision,
  publication, expertise, appel, transaction sous contrainte ;
- budget, seuil d'exposition, sensibilites business, risques reputatifs ;
- decisions humaines deja prises et questions encore ouvertes.

Complements nommes a inclure explicitement dans l'intake :

- portefeuille ou titres relies
- risques reconventionnels connus
- calendrier externe

Si `mode`, `contentious_track` ou `procedure_stage` manque, la sortie doit se
limiter a un cadrage prudent et bloquer toute recommandation trop affirmative.
Si `forum`, `procedure_stage` ou `evidence_status` est flou, contradictoire ou
incomplet, la sortie doit indiquer explicitement une confiance reduite.

## Routing Boundaries

### Route to `tri-contrefacon`

Router vers `tri-contrefacon` si le dossier est encore au stade du signal,
d'une suspicion, d'un besoin de qualification initiale ou d'une priorisation
enforcement sans orientation judiciaire suffisamment mature.

Indices de routage :

- pieces minimales ou identification de cible insuffisantes ;
- besoin principal = scorer la gravite, distinguer faits/signaux/risques ;
- aucune decision de saisine, de defense judiciaire ou d'urgence procedurale
  n'est encore exploitable.

### Route to `mise-en-demeure-pi`

Router vers `mise-en-demeure-pi` si la meilleure suite est une lettre, une
relecture de lettre, une reponse amiable encadree, ou une escalation formelle
hors saisine.

Indices de routage :

- pas de forum judiciaire a choisir tout de suite ;
- l'objectif principal est de demander, repondre, cadrer ou durcir une prise de
  position precontentieuse ;
- la decision de contentieux reste conditionnelle a la reaction adverse.

### Route to `depot-preuve-creation`

Router vers `depot-preuve-creation` si la faiblesse determinante du dossier est
la preuve de creation, d'anteriorite, de titularite ou la coherence
chronologique des pieces, sans qu'une strategie judiciaire puisse encore etre
fiablement tranchee.

Indices de routage :

- trous critiques de date, auteur, chaine de droits ou version exploitable ;
- besoin premier = registre de pieces, timeline, bundle ou revue probatoire ;
- le contentieux n'est pas rejetee, mais la preuve doit d'abord etre structuree.

### Route to `strategie-defense-pi`

Router vers `strategie-defense-pi` si l'equipe recoit une allegation, une
lettre, une menace de procedure ou un dossier incomplet et doit encore choisir
entre reponse, collecte de preuves, contestation de titre ou escalation.

Indices de routage :

- la branche judiciaire n'est qu'une hypothese parmi d'autres ;
- la defense n'est pas encore transformee en playbook contentieux ;
- le besoin est un paquet defensif et une carte d'escalade plutot qu'une
  strategie procedurale detaillee.

### Stay in `contentieux-pi`

Rester dans `contentieux-pi` si le dossier est deja, ou de facon credible sur le
point d'etre, judiciaire.

Signaux de maintien :

- une saisine, une urgence, une mise en etat, une fenetre d'appel ou un appel
  en cours structure la decision ;
- les questions dominantes portent sur la competence, la recevabilite, les
  demandes, les defenses, la preuve utilisable en justice, le calendrier, le
  budget ou l'exposition ;
- la recommandation attendue est une trajectoire contentieuse, pas un simple
  support de lettre ou un registre de pieces.

## Contentious Tracks

### `brevet-infringement`

- Forum central en pratique : TJ Paris, avec forte sensibilite a la validite du
  brevet, a la qualite pour agir, a la prescription et aux mesures provisoires.
- Axes dominants : reproduction des revendications, equivalence, saisie,
  expertise, nullite reconventionnelle, calcul du prejudice technique et
  commercial.
- Points de vigilance : annuites, chaine de titularite, portee du brevet,
  anteriorites ou licences pouvant fragiliser l'attaque.

### `marque-infringement`

- Forum central : TJ Paris pour les configurations relevant de sa competence,
  avec articulation frequente entre contrefacon, nullite, decheance et
  concurrence deloyale.
- Axes dominants : risque de confusion, usage a titre de marque, usage serieux,
  epuisement, tolerance, descriptivite, territorialite.
- Points de vigilance : preuve d'usage, titulaires et licences, coexistence,
  produits/services reels, statut des enregistrements.

### `dm-infringement`

- Track oriente dessins et modeles, souvent combine a marque, droit d'auteur ou
  concurrence deloyale.
- Axes dominants : impression visuelle d'ensemble, divulgation, nouveaute,
  caractere propre, combinaison de titres et preuve de commercialisation.
- Points de vigilance : date de divulgation, titularite, duree de protection,
  articulation avec modele communautaire ou droit national.

### `copyright-infringement`

- Track centre sur originalite, titularite, chaine de droits et materialite de
  la reprise.
- Axes dominants : preuve de creation, acces, similitudes pertinentes,
  exploitation litigieuse, articulation civil / eventuel penal hors perimetre de
  ce skill.
- Points de vigilance : auteurs multiples, cessions, versions source, elements
  fonctionnels non proteges, faible solidite probatoire de l'originalite.

### `nullity-revocation`

- Track offensif ou defensif visant la chute totale ou partielle d'un titre, ou
  sa decheance / revocation selon le droit concerne.
- Axes dominants : motifs de nullite, decheance pour non-usage, defaut de
  nouveaute, defaut de distinctivite, fraude, insuffisance ou autres causes
  selon le titre.
- Points de vigilance : competence de la juridiction choisie, articulation avec
  l'action principale, preuve technique ou d'usage, effets dans le temps.

### `unfair-competition`

- Track fonde sur la faute, le risque de confusion hors titre, le parasitisme
  ou la desorganisation, souvent en cumul ou en filet subsidiaire.
- Axes dominants : comportement fautif, investissement capte, confusion,
  desorganisation, causalite et prejudice.
- Points de vigilance : ne pas maquiller un dossier PI faible par une faute
  insuffisamment caracterisee ; documenter le contexte commercial reel.

### `appeal`

- Track dedie a la fenetre d'appel ou a la conduite d'un appel deja lance.
- Axes dominants : delais, perimetre du jugement critique, effet devolutif,
  chefs contestes, execution provisoire, priorisation des moyens et budget
  d'appel.
- Points de vigilance : point de depart des delais, interet pratique de
  l'appel, risque d'aggravation, articulation avec incident d'execution.

## Procedure Stages

### `pre-filing`

- Sortie attendue : decision memo sur forum, recevabilite, demandes/defenses
  cibles, preuve minimale et seuil de lancement.
- Question centrale : faut-il saisir ou suspendre faute de base suffisante ?

### `urgent-relief`

- Sortie attendue : cadrage de mesures provisoires, urgence, trouble,
  proportionnalite, preuve immediate, articulation avec le fond.
- Question centrale : l'urgence judiciaire est-elle soutenable et utile ?

### `on-the-merits`

- Sortie attendue : carte du fond, demandes principales et subsidiaires,
  defenses, preuve, expertise, calendrier et exposition.
- Question centrale : quelle architecture de dossier tenir au fond ?

### `pending-case`

- Sortie attendue : point de situation procedurale, echeances, incidents,
  ajustements de posture, besoin d'expertise ou de transaction.
- Question centrale : comment tenir et ajuster le dossier en cours ?

### `appeal-window`

- Sortie attendue : memo go/no-go sur l'appel, delais, chefs critiques, cout,
  effet pratique, risque si absence d'appel.
- Question centrale : faut-il interjeter appel ou laisser le jugement produire
  ses effets ?

### `appeal-ongoing`

- Sortie attendue : carte d'appel, moyens, calendrier, incidents, execution
  provisoire, besoins de preuve complementaire.
- Question centrale : comment maximiser ou contenir l'exposition en appel ?

## Internal Reasoning Guidance

Cette section est une aide de raisonnement interne uniquement. Elle ne cree pas
un format de livrable concurrent et ne remplace jamais le contrat de sortie en
huit blocs defini plus bas.

Pour preparer ces huit blocs, raisonner en interne en separant :

1. faits supportes par pieces consultees ;
2. droits invoques, statut connu, competence apparente et points
   `[a verifier]` ;
3. demandes, defenses, recevabilite et options procedurales ;
4. trous probatoires, dependances a une verification humaine et sources
   primaires non consultees ;
5. choix de decision a arbitrer maintenant.

Doctrine utile a conserver :

- raisonner systematiquement sur competence, qualite a agir, validite ou statut
  du titre, prescription ou recevabilite temporelle, articulation des demandes
  principales et subsidiaires, et risque reconventionnel ;
- en matiere PI, toujours mettre en face le fond, la preuve, le calendrier et
  le rapport cout / exposition / interet business ;
- une attaque faible sur la preuve ou la validite ne doit pas etre maquillee par
  un ton plus assertif.

## Common Output Rules

Quelle que soit la configuration du dossier, la sortie doit separer
explicitement :

- `faits etablis`
- `allegations ou hypotheses`
- `pieces consultees`
- `pieces manquantes`
- `risques proceduraux`
- `risques business`
- `validation humaine obligatoire`

Ces categories doivent rester coherentes avec les huit blocs de sortie :

- ne jamais melanger un fait etabli avec une allegation ou une hypothese ;
- rattacher `pieces consultees` et `pieces manquantes` a l'impact judiciaire
  concret ;
- distinguer `risques proceduraux` et `risques business`, meme s'ils convergent
  sur la meme decision ;
- faire apparaitre la `validation humaine obligatoire` comme une contrainte
  operative, pas comme une note cosmetique.

## Output Contract

La sortie doit produire **exactement** les huit blocs suivants, dans cet ordre :

1. `Case Snapshot`
2. `Forum and Admissibility`
3. `Claims and Defenses Map`
4. `Evidence and Proof Gaps`
5. `Procedural Strategy`
6. `Budget Timing and Exposure`
7. `Decision Memo`
8. `Human Validation`

Contraintes par bloc :

- `Case Snapshot` : mode, track, stage, parties, objectif, chronologie courte,
  niveau de maturite du dossier.
- `Forum and Admissibility` : juridiction envisagee ou saisie, competence
  apparente, qualite pour agir, statut du titre, prescription ou delai utile,
  points bloquants et `[a verifier]`.
- `Claims and Defenses Map` : demandes offensives ou defenses, options
  subsidiaires, moyens adverses attendus, risque reconventionnel.
- `Evidence and Proof Gaps` : pieces consultees, pieces mentionnees non
  consultees, trous critiques, impact judiciaire de chaque trou.
- `Procedural Strategy` : trajectoire recommande, urgence ou non, articulation
  fond / provisoire / incident / appel, prochaines actions humaines.
- `Budget Timing and Exposure` : fourchette cout, duree plausible, postes
  d'exposition, scenario bas / central / haut si utile.
- `Decision Memo` : utiliser uniquement les issues suivantes, avec motifs et
  conditions :
  - `Attack`: `go`, `go conditionnel`, `settle first`, `no-go`
  - `Defense`: `contest and defend`, `defend and negotiate`,
    `challenge title`, `contain and settle`,
    `no-substantive-response-at-this-stage`
  - `Appeal`: `appeal`, `appeal if conditions met`, `no appeal`,
    `negotiate instead`
- `Human Validation` : validations avocat / client / direction requises, points
  non verifies, seuils de prudence avant toute utilisation externe.

## Error Handling and Guardrails

- Toute source primaire non consultee reste `[a verifier]`.
- Toute allegation, meme vraisemblable, reste une allegation tant qu'elle n'est
  pas rattachee a une piece exploitable.
- Le skill doit distinguer les hypotheses judiciaires robustes des pistes
  speculatives.
- Si la competence, la recevabilite, le titre ou la preuve sont trop incertains,
  la sortie doit abaisser sa confiance et recommander une validation humaine ou
  un routage complementaire avant toute position ferme.
- Ne jamais presenter une probabilite de succes, un quantum de prejudice ou un
  delai comme garanti.

Declencheurs explicites de limitation :

- forum non identifie
- titre ou droit invoque flou
- pieces probatoires trop faibles
- procedure_stage incertain
- business_objective non clarifie
- calendrier ou urgence inconnus alors qu'ils conditionnent le choix

Regle de reponse sure a conserver dans cet ordre :

1. expliciter l'hypothese
2. marquer `[a verifier]`
3. reduire les recommandations offensives ou irreversibles
4. router en amont si le dossier n'est pas encore contentieux en realite

## Limited-Confidence Behavior

Quand le dossier est incomplet, contradictoire ou source-faible, appliquer
explicitement une posture de confiance limitee :

- dire ce qui est soutenable maintenant ;
- dire ce qui ne l'est pas encore ;
- indiquer une confiance reduite si `forum`, `procedure_stage` ou
  `evidence_status` est incertain ou incomplet ;
- limiter `Decision Memo` a une recommandation conditionnelle ;
- privilegier les issues conditionnelles exactes du contrat, ou un routage vers
  un skill voisin, plutot qu'une conclusion trop tranchee ;
- rappeler que la decision judiciaire finale depend de la revue humaine, des
  sources primaires, des pieces completes et de la strategie avocat.

## Validation humaine

Validation humaine obligatoire avant :

- toute saisine ou menace credible de saisine ;
- toute demande de mesure urgente, saisie, expertise, provision ou publication ;
- toute admission, renonciation, transaction, desistement ou choix d'appel ;
- toute communication externe sur le fond, le quantum ou le calendrier.

Rappel final a conserver :

- ceci est un cadrage judiciaire interne, pas un conseil juridique final ;
- les points non verifies restent `[a verifier]` ;
- les actes et decisions procedurales relevent de la validation humaine, en
  pratique avocat.
