---
name: tri-contrefacon
version: "2.0.0"
description: Porte d'entrée de cadrage initial et de qualification enforcement marques.
argument-hint: "[mode] [faits | pièces | signe | produits | canal | territoire]"
authors: ["Hacienda"]
tags: [contentieux, enforcement, triage, pre-qualification, signaux]
---

# Tri Contrefaçon

## Examples

<example>
<user>/h-pi:tri-contrefacon [mode] [faits | pièces | signe | produits | canal | territoire]</user>
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

## Mode Anno Desktop Optionnel

Si Anno Desktop est disponible, l'utiliser pour organiser localement les
captures, URL, constats, échanges, tickets et signaux déjà fournis dans le
dossier. Appeler `anno_health` avant tout outil Anno ; en cas d'échec,
poursuivre en mode Hacienda.

Règles spécifiques :

- appeler `detect` ou appliquer une gestion PII Anno équivalente avant toute
  pièce client ou donnée adverse ;
- utiliser `legal_timeline` pour ordonner les captures, usages, relances et
  événements probatoires déjà ingérés ;
- utiliser `legal_graph_query` pour relier cible, vendeur, canal, produits,
  signes, droits invoqués et pièces ;
- utiliser `legal_rehydrate_citation` uniquement pour une citation locale
  destinée à l'utilisateur autorisé ;
- ne jamais utiliser un passage Anno pour établir à lui seul la contrefaçon.

Tout résultat Anno est une source interne Anno, jamais comme source primaire.
Les droits invoqués, registres et sources officielles restent vérifiés via
`hacienda-sources-officielles` et les outils PI Hacienda.

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

## Rôle

Recevoir un signal d'atteinte potentielle à une marque, qualifier rapidement le dossier en phase de cadrage initial, distinguer faits / signaux / risques, et orienter vers une action proportionnée d'enforcement ou de veille.

Le skill travaille en positionnement strict marques et enforcement général. Il prépare un dossier exploitable par `mise-en-demeure-pi`, sans présenter l'atteinte comme prouvée tant que les pièces minimales ne permettent pas une validation humaine sérieuse.

Référence de travail: `references/grille-enforcement-marques.md`.

## Niveaux de criticité

Échelle canonique appliquée à toute appréciation subjective de ce skill :

| Niveau | Icône | Signification dans le contexte de ce skill |
|---|---|---|
| Faible | 🟢 | Faux positif ou usage légitime (descriptif, référence nominative L.713-6, épuisement, usage non-commercial). |
| Moyen | 🟡 | Signal isolé à surveiller : volume faible, contrefacteur diffus, pas de préjudice commercial avéré — watch list. |
| Élevé | 🟠 | Contrefaçon probable nécessitant escalade vers `mise-en-demeure-pi` : volume commercial significatif ou récidive. |
| Bloquant | 🔴 | Contrefaçon manifeste + volume commercial significatif + contrefacteur identifiable — action urgente (saisie, référé, retrait plateforme). |

Plancher cross-skill (CLAUDE.md §4) : ce skill ne peut pas dégrader silencieusement une cote 🔴 amont sans déclaration explicite.

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

## Mode Anno Tabular optionnel

Si la distribution Hacienda + Anno Desktop est active, `tri-contrefacon` utilise
Anno pour trier localement faits, preuves, parties et dates, jamais comme source
primaire et jamais pour conclure seul à la contrefaçon. Appeler `anno_health`
avant tout outil Anno ; si Anno est indisponible, poursuivre en
`fallback_hacienda`.

Le triage doit être borné par le `matter_vault` et le `workflow_blueprint`
`infringement-triage-v1`. Utiliser `legal_timeline`, `legal_graph_query`,
`legal_rehydrate_citation`, `legal_prescription_check` et
`legal_validate_field` lorsque des dates ou faits extraits doivent être
confirmés. Une revue tabulaire avec `tabular_review_create` doit suivre fait,
pièce, date, droit invoqué, cible, faiblesse, `review_status`,
`decision_status` et `validation_status`.

Utiliser `grid_to_work_product` seulement pour produire une note de triage ou
une matrice de preuves depuis les cellules validées. Tout résultat Anno reste
une source interne Anno, jamais comme source primaire ; les sources officielles
et registres restent vérifiés via `hacienda-sources-officielles`. Les faits non
validés restent `[à vérifier]`.
