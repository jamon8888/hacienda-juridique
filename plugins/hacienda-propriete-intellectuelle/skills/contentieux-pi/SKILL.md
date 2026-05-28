---
name: contentieux-pi
description: >
  Playbook judiciaire PI V2 pour cadrer une attaque ou une défense devant les
  juridictions compétentes, du pré-dépôt à l'appel, sans rédiger les actes de
  procédure ni absorber les flux précontentieux généralistes.
version: "2.0.0"
argument-hint: "[attack|défense|appeal|urgent] [faits | pièces | titre | juridiction | calendrier]"
authors: ["Hacienda"]
tags: [contentieux, PI, judiciaire, contrefacon, nullite, appel, TJ-Paris, CA-Paris]
---

# Skill - Contentieux PI V2

## Examples

<example>
<user>/h-pi:contentieux-pi [attack|défense|appeal|urgent] [faits | pièces | titre | juridiction | calendrier]</user>
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
- Marques, BOPI et EUIPO : `inpi_search_marques`, `inpi_marque_details`, `inpi_marques_publications_recentes`, `euipo_tmview_search`, `bopi_dernieres_publications`.
- Brevets et Espacenet : `inpi_search_brevets`, `inpi_brevet_details`, `espacenet_search`, `espacenet_brevet_details`.
- Anno, quand disponible, reste une source interne de dossier : jamais un registre officiel INPI, EUIPO, OEB, OMPI ou BOPI.

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/` ou `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`.

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

## Positionnement

Ce skill est le point d'entrée **judiciaire uniquement** pour la propriété
intellectuelle. Il sert à cadrer une stratégie d'attaque ou de défense déjà
orientée vers une trajectoire contentieuse, à mesurer la recevabilité, à
ordonner les demandes et défenses, et à préparer un mémo de décision pour revue
humaine.

Aide-mémo de synthèse :
`references/contentieux-pi-tracks-and-routing.md`. En cas d'écart, seul ce
`SKILL.md` fait foi.

Il ne constitue ni un acte de procédure, ni un avis juridique final, ni la
maison par défaut des lettres simples, des discussions amiables, de la seule
collecte probatoire ou de la médiation exploratoire.

Validation avocat obligatoire avant toute saisine, toute position externe, tout
choix de forum, toute demande provisoire, toute transaction engageante et toute
décision d'appel.

## Déclencheur de périmètre

Utiliser `contentieux-pi` quand au moins une de ces conditions est vraie :

- assignation déjà reçue ou préparée ;
- référé envisagé ou déjà lancé ;
- procédure au fond déjà décidée ou quasi décidée ;
- recours contre décision déjà dans la fenêtre procédurale ;
- besoin d'un pilotage judiciaire, budgétaire et calendaire d'affaire ;

Ne pas utiliser ce skill comme voie normale pour :

- une simple mise en demeure ou réponse amiable ;
- un cadrage initial de signal faible encore mal qualifié ;
- une collecte de preuve de création ou d'antériorité non rattachée à une
  stratégie judiciaire immédiate ;
- une médiation ou négociation précontentieuse qui ne demande pas encore de
  choix procéduraux.

## Ne fait pas

- Ne rédige pas les actes de procédure, conclusions, requêtes, déclarations
  d'appel ou jeux de pièces finaux.
- Ne remplace pas l'analyse détaillée d'un titre, d'une validité technique ou
  d'un quantum d'expertise quand un skill spécialisé est requis.
- Ne présente jamais une allégation client, adverse ou interne comme un fait
  établi sans pièce.
- Ne présente jamais une chance de succès, une compétence ou une recevabilité
  comme certaine quand une source, une pièce ou une vérification manque.
- Ne remplace pas `tri-contrefacon`, `mise-en-demeure-pi`,
  `depot-preuve-creation` ou `strategie-defense-pi` quand le vrai besoin reste
  précontentieux ou défensif amont.

## Cadrage initial

Le skill opère uniquement avec le contrat d'entrée judiciaire V2 suivant :

- `mode`: `attack`, `defense`
- `contentious_track`: `brevet-infringement`, `marque-infringement`,
  `dm-infringement`, `copyright-infringement`, `nullity-revocation`,
  `unfair-competition`, `appeal`
- `procedure_stage`: `pre-filing`, `urgent-relief`, `on-the-merits`,
  `pending-case`, `appeal-window`, `appeal-ongoing`

Champs d'entrée requis à exposer explicitement :

- `rights_at_issue`
- `parties`
- `forum`
- `known_facts`
- `evidence_status`
- `business_objective`

Collecter ensuite, en marquant `[à vérifier]` tout point non contrôlé :

- parties, qualité à agir, rôles procéduraux, avocat ou conseil déjà saisi ;
- droits invoqués ou contestés, territoire, statut apparent du titre ;
- faits matériels, chronologie, dernier événement utile, urgence alléguée ;
- pièces consultées, pièces seulement mentionnées, trous critiques ;
- juridiction envisagée ou déjà saisie, audience ou échéance connue ;
- objectif contentieux : cessation, défense, nullité, rejet, provision,
  publication, expertise, appel, transaction sous contrainte ;
- budget, seuil d'exposition, sensibilités business, risques réputationnels ;
- décisions humaines déjà prises et questions encore ouvertes.

Compléments nommés à inclure explicitement dans le cadrage initial :

- portefeuille ou titres reliés
- risques reconventionnels connus
- calendrier externe

Si `mode`, `contentious_track` ou `procedure_stage` manque, la sortie doit se
limiter à un cadrage prudent et bloquer toute recommandation trop affirmative.
Si `forum`, `procedure_stage` ou `evidence_status` est flou, contradictoire ou
incomplet, la sortie doit indiquer explicitement une confiance réduite.

## Limites de routage

### Router vers `tri-contrefacon`

Router vers `tri-contrefacon` si le dossier est encore au stade du signal,
d'une suspicion, d'un besoin de qualification initiale ou d'une priorisation
enforcement sans orientation judiciaire suffisamment mature.

Indices de routage :

- pièces minimales ou identification de cible insuffisantes ;
- besoin principal = scorer la gravite, distinguer faits/signaux/risques ;
- aucune décision de saisine, de défense judiciaire ou d'urgence procédurale
  n'est encore exploitable.

### Router vers `mise-en-demeure-pi`

Router vers `mise-en-demeure-pi` si la meilleure suite est une lettre, une
relecture de lettre, une réponse amiable encadrée, ou une escalade formelle
hors saisine.

Indices de routage :

- pas de forum judiciaire à choisir tout de suite ;
- l'objectif principal est de demander, répondre, cadrer ou durcir une prise de
  position précontentieuse ;
- la décision de contentieux reste conditionnelle à la réaction adverse.

### Router vers `depot-preuve-creation`

Router vers `depot-preuve-creation` si la faiblesse déterminante du dossier est
la preuve de création, d'antériorité, de titularité ou la cohérence
chronologique des pièces, sans qu'une stratégie judiciaire puisse encore être
fiablement tranchée.

Indices de routage :

- trous critiques de date, auteur, chaîne de droits ou version exploitable ;
- besoin premier = registre de pièces, timeline, bundle ou revue probatoire ;
- le contentieux n'est pas rejeté, mais la preuve doit d'abord être structurée.

### Router vers `strategie-defense-pi`

Router vers `strategie-defense-pi` si l'équipe reçoit une allégation, une
lettre, une menace de procédure ou un dossier incomplet et doit encore choisir
entre réponse, collecte de preuves, contestation de titre ou escalade.

Indices de routage :

- la branche judiciaire n'est qu'une hypothèse parmi d'autres ;
- la défense n'est pas encore transformée en playbook contentieux ;
- le besoin est un paquet défensif et une carte d'escalade plutôt qu'une
  stratégie procédurale détaillée.

### Rester dans `contentieux-pi`

Rester dans `contentieux-pi` si le dossier est déjà, ou de façon crédible sur le
point d'être, judiciaire.

Signaux de maintien :

- une saisine, une urgence, une mise en état, une fenêtre d'appel ou un appel
  en cours structure la décision ;
- les questions dominantes portent sur la compétence, la recevabilité, les
  demandes, les défenses, la preuve utilisable en justice, le calendrier, le
  budget ou l'exposition ;
- la recommandation attendue est une trajectoire contentieuse, pas un simple
  support de lettre ou un registre de pièces.

## Contentious Tracks

### `brevet-infringement`

- Forum central en pratique : TJ Paris, avec forte sensibilité à la validité du
  brevet, à la qualité pour agir, à la prescription et aux mesures provisoires.
- Axes dominants : reproduction des revendications, équivalence, saisie,
  expertise, nullité reconventionnelle, calcul du préjudice technique et
  commercial.
- Points de vigilance : annuités, chaîne de titularité, portée du brevet,
  antériorités ou licences pouvant fragiliser l'attaque.

### `marque-infringement`

- Forum central : TJ Paris pour les configurations relevant de sa compétence,
  avec articulation fréquente entre contrefaçon, nullité, déchéance et
  concurrence déloyale.
- Axes dominants : risque de confusion, usage à titre de marque, usage sérieux,
  épuisement, tolérance, descriptivité, territorialité.
- Points de vigilance : preuve d'usage, titulaires et licences, coexistence,
  produits/services réels, statut des enregistrements.

### `dm-infringement`

- Branche orientée dessins et modèles, souvent combinée à une marque, droit d'auteur ou
  concurrence déloyale.
- Axes dominants : impression visuelle d'ensemble, divulgation, nouveauté,
  caractère propre, combinaison de titres et preuve de commercialisation.
- Points de vigilance : date de divulgation, titularité, durée de protection,
  articulation avec modèle communautaire ou droit national.

### `copyright-infringement`

- Branche centrée sur originalité, titularité, chaîne de droits et matérialité de
  la reprise.
- Axes dominants : preuve de création, accès, similitudes pertinentes,
  exploitation litigieuse, articulation civil / éventuel pénal hors périmètre de
  ce skill.
- Points de vigilance : auteurs multiples, cessions, versions source, éléments
  fonctionnels non protégés, faible solidité probatoire de l'originalité.

### `nullity-revocation`

- Branche offensive ou défensive visant la chute totale ou partielle d'un titre, ou
  sa déchéance / révocation selon le droit concerné.
- Axes dominants : motifs de nullité, déchéance pour non-usage, défaut de
  nouveauté, défaut de distinctivité, fraude, insuffisance ou autres causes
  selon le titre.
- Points de vigilance : compétence de la juridiction choisie, articulation avec
  l'action principale, preuve technique ou d'usage, effets dans le temps.

### `unfair-competition`

- Branche fondée sur la faute, le risque de confusion hors titre, le parasitisme
  ou la désorganisation, souvent en cumul ou en filet subsidiaire.
- Axes dominants : comportement fautif, investissement capte, confusion,
  désorganisation, causalité et préjudice.
- Points de vigilance : ne pas maquiller un dossier PI faible par une faute
  insuffisamment caractérisée ; documenter le contexte commercial réel.

### `appeal`

- Branche dédiée à la fenêtre d'appel ou à la conduite d'un appel déjà lancé.
- Axes dominants : délais, périmètre du jugement critique, effet dévolutif,
  chefs contestés, exécution provisoire, priorisation des moyens et budget
  d'appel.
- Points de vigilance : point de départ des délais, intérêt pratique de
  l'appel, risque d'aggravation, articulation avec incident d'exécution.

## Étapes de procédure

### `pre-filing`

- Sortie attendue : décision mémo sur forum, recevabilité, demandes/défenses
  cibles, preuve minimale et seuil de lancement.
- Question centrale : faut-il saisir ou suspendre faute de base suffisante ?

### `urgent-relief`

- Sortie attendue : cadrage de mesures provisoires, urgence, trouble,
  proportionnalité, preuve immédiate, articulation avec le fond.
- Question centrale : l'urgence judiciaire est-elle soutenable et utile ?

### `on-the-merits`

- Sortie attendue : carte du fond, demandes principales et subsidiaires,
  défenses, preuve, expertise, calendrier et exposition.
- Question centrale : quelle architecture de dossier tenir au fond ?

### `pending-case`

- Sortie attendue : point de situation procédurale, échéances, incidents,
  ajustements de posture, besoin d'expertise ou de transaction.
- Question centrale : comment tenir et ajuster le dossier en cours ?

### `appeal-window`

- Sortie attendue : mémo go/no-go sur l'appel, délais, chefs critiques, coût,
  effet pratique, risque si absence d'appel.
- Question centrale : faut-il interjeter appel ou laisser le jugement produire
  ses effets ?

### `appeal-ongoing`

- Sortie attendue : carte d'appel, moyens, calendrier, incidents, exécution
  provisoire, besoins de preuve complémentaire.
- Question centrale : comment maximiser ou contenir l'exposition en appel ?

## Internal Reasoning Guidance

Cette section est une aide de raisonnement interne uniquement. Elle ne cree pas
un format de livrable concurrent et ne remplace jamais le contrat de sortie en
huit blocs defini plus bas.

Pour préparer ces huit blocs, raisonner en interne en separant :

1. faits supportes par pièces consultées ;
2. droits invoqués, statut connu, compétence apparente et points
   `[à vérifier]` ;
3. demandes, défenses, recevabilité et options procedurales ;
4. trous probatoires, dépendances à une vérification humaine et sources
   primaires non consultées ;
5. choix de décision à arbitrer maintenant.

Doctrine utile à conserver :

- raisonner systematiquement sur compétence, qualité à agir, validité ou statut
  du titre, prescription ou recevabilité temporelle, articulation des demandes
  principales et subsidiaires, et risque reconventionnel ;
- en matière PI, toujours mettre en face le fond, la preuve, le calendrier et
  le rapport coût / exposition / intérêt business ;
- une attaque faible sur la preuve ou la validité ne doit pas être maquillee par
  un ton plus assertif.

## Règles communes de sortie

Quelle que soit la configuration du dossier, la sortie doit séparer
explicitement :

- `faits etablis`
- `allegations ou hypotheses`
- `pièces consultées`
- `pièces manquantes`
- `risques proceduraux`
- `risques business`
- `validation humaine obligatoire`

Ces catégories doivent rester coherentes avec les huit blocs de sortie :

- ne jamais mélanger un fait établi avec une allégation ou une hypothèse ;
- rattacher `pièces consultées` et `pièces manquantes` à l'impact judiciaire
  concret ;
- distinguer `risques proceduraux` et `risques business`, même s'ils convergent
  sur la même décision ;
- faire apparaitre la `validation humaine obligatoire` comme une contrainte
  operative, pas comme une note cosmetique.

## Contrat de sortie

La sortie doit produire **exactement** les huit blocs suivants, dans cet ordre :

1. `Synthèse du dossier`
2. `Forum and Admissibility`
3. `Claims and Defenses Map`
4. `Preuves et lacunes probatoires`
5. `Stratégie procédurale`
6. `Budget Timing and Exposure`
7. `Mémo de décision`
8. `Validation humaine`

Contraintes par bloc :

- `Synthèse du dossier` : mode, branche, stade, parties, objectif, chronologie courte,
  niveau de maturite du dossier.
- `Forum and Admissibility` : juridiction envisagée ou saisie, compétence
  apparente, qualité pour agir, statut du titre, prescription ou délai utile,
  points bloquants et `[à vérifier]`.
- `Claims and Defenses Map` : demandes offensives ou défenses, options
  subsidiaires, moyens adverses attendus, risque reconventionnel.
- `Preuves et lacunes probatoires` : pièces consultées, pièces mentionnées non
  consultées, trous critiques, impact judiciaire de chaque trou.
- `Stratégie procédurale` : trajectoire recommandée, urgence ou non, articulation
  fond / provisoire / incident / appel, prochaines actions humaines.
- `Budget Timing and Exposure` : fourchette coût, durée plausible, postes
  d'exposition, scenario bas / central / haut si utile.
- `Mémo de décision` : utiliser uniquement les issues suivantes, avec motifs et
  conditions :
  - `Attack`: `go`, `go conditionnel`, `settle first`, `no-go`
  - `Defense`: `contest and defend`, `defend and negotiate`,
    `challenge title`, `contain and settle`,
    `no-substantive-response-at-this-stage`
  - `Appeal`: `appeal`, `appeal if conditions met`, `no appeal`,
    `negotiate instead`
- `Validation humaine` : validations avocat / client / direction requises, points
  non vérifiés, seuils de prudence avant toute utilisation externe.

## Error Handling and Guardrails

- Toute source primaire non consultée reste `[à vérifier]`.
- Toute allégation, même vraisemblable, reste une allégation tant qu'elle n'est
  pas rattachée à une pièce exploitable.
- Le skill doit distinguer les hypothèses judiciaires robustes des pistes
  spéculatives.
- Si la compétence, la recevabilité, le titre ou la preuve sont trop incertains,
  la sortie doit abaisser sa confiance et recommander une validation humaine ou
  un routage complémentaire avant toute position fermée.
- Ne jamais présenter une probabilité de succès, un quantum de préjudice ou un
  délai comme garanti.

Déclencheurs explicites de limitation :

- forum non identifié
- titre ou droit invoqué flou
- pièces probatoires trop faibles
- `procedure_stage` incertain
- business_objective non clarifie
- calendrier ou urgence inconnus alors qu'ils conditionnent le choix

Règle de réponse sûre à conserver dans cet ordre :

1. expliciter l'hypothèse
2. marquer `[à vérifier]`
3. reduire les recommandations offensives ou irreversibles
4. router en amont si le dossier n'est pas encore contentieux en realite

## Limited-Confidence Behavior

Quand le dossier est incomplet, contradictoire ou source-faible, appliquer
explicitement une posture de confiance limitée :

- dire ce qui est soutenable maintenant ;
- dire ce qui ne l'est pas encore ;
- indiquer une confiance réduite si `forum`, `procedure_stage` ou
  `evidence_status` est incertain ou incomplet ;
- limiter `Mémo de décision` à une recommandation conditionnelle ;
- privilegier les issues conditionnelles exactes du contrat, ou un routage vers
  un skill voisin, plutôt qu'une conclusion trop tranchée ;
- rappeler que la décision judiciaire finale dépend de la revue humaine, des
  sources primaires, des pièces complètes et de la stratégie avocat.

## Validation humaine

Validation humaine obligatoire avant :

- toute saisine ou menace crédible de saisine ;
- toute demande de mesure urgente, saisie, expertise, provision ou publication ;
- toute admission, renonciation, transaction, desistement ou choix d'appel ;
- toute communication externe sur le fond, le quantum ou le calendrier.

Rappel final à conserver :

- ceci est un cadrage judiciaire interne, pas un conseil juridique final ;
- les points non vérifiés restent `[à vérifier]` ;
- les actes et décisions procedurales relevent de la validation humaine, en
  pratique avocat.

## Mode Anno Tabular optionnel

Si la distribution Hacienda + Anno Desktop est active, `contentieux-pi` utilise
Anno pour organiser localement pièces, parties, événements, risques et preuves,
jamais comme source primaire. Appeler `anno_health` avant tout outil Anno ; si
Anno est indisponible, poursuivre en `fallback_hacienda`.

Le dossier doit être limité au `matter_vault` et rattaché à un
`workflow_blueprint` contentieux. Utiliser `legal_extract_case_file`,
`legal_timeline`, `legal_graph_query`, `legal_prescription_check` et
`legal_validate_field`, puis une revue tabulaire avec `tabular_review_create`
pour suivre faits allégués, pièces, dates, droit invoqué, faiblesse probatoire,
prescription et contradictions. Chaque fait doit porter `review_status`,
`decision_status`, responsable, citation et `validation_status`.

Utiliser `grid_to_work_product` seulement pour produire une note contentieux,
une chronologie ou une annexe depuis les cellules validées. Tout extrait Anno
reste une source interne Anno, jamais comme source primaire ; les textes,
jurisprudences et sources officielles restent vérifiés via
`hacienda-sources-officielles`. Les faits non validés restent `[à vérifier]`.
