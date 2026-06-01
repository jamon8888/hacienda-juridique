---
name: recherche-anteriorite-marque
version: "2.0.0"
description: >
  Premier passage strict de recherche d'antériorité marque pour signaler les
  motifs absolus, les conflits proches et les trous de couverture avant revue
  humaine. Ce skill ne conclut jamais qu'une marque est disponible.
argument-hint: "[signe | classes Nice | territoires FR/EU/intl]"
authors: ["Hacienda"]
tags: [marques, anteriorite, INPI-Data, EUIPO-TMview, clearance]
---

# Skill - Recherche d'antériorité marque V2

> **Premier passage, pas une opinion de disponibilité.**
> Une opinion de disponibilité exige une recherche professionnelle complète et
> le jugement d'un mandataire en marques ou d'un avocat.
>
> "Aucun conflit évident" issu de ce skill signifie uniquement que le premier
> passage n'a rien remonté dans son périmètre réel. Cela ne veut pas dire que
> la marque est libre.

`recherche-anteriorite-marque` reste la première brique de la voie marques :

1. premier passage de triage ;
2. puis, selon l'issue :
   - `depot-marque-fr`
   - `surveillance-marque`
   - `analyse-opposition-marque`
   - abandon ou changement de signe.

`clearance-marque` ne reste qu'un alias de compatibilité historique. Ce n'est
plus la voie normale à proposer.

## Examples

<example>
<user>/h-pi:recherche-anteriorite-marque [signe | classes Nice | territoires FR/EU/intl]</user>
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
- Anno, quand disponible, reste une source interne de dossier : jamais un registre officiel INPI, EUIPO, OEB, OMPI ou BOPI.

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/` ou `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`.

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

## Ce skill ne fait pas

- Ne rédige pas une opinion de disponibilité.
- Ne fait pas un dépôt.
- Ne remplace pas une recherche professionnelle exhaustive.
- Ne fait pas une analyse contradictoire complète d'opposition.
- Ne maintient pas un hub portefeuille.

## Contrat d'entrée V2

Le skill doit expliciter ou dériver les dimensions suivantes :

- `mark_type`: `word`, `figurative`, `composite`, `semi-figurative`, `unknown`
- `filing_intent`: `exploratory`, `pre-filing`, `pre-launch`,
  `portfolio-extension`, `reactive-check`
- `territory_scope`: `fr`, `eu`, `fr-eu`, `international-subset`, `unknown`
- `goods_services_scope`: `known-classes`, `described-only`, `mixed`,
  `unclear`
- `adjacent_families_status`: `pending-confirmation`, `confirmed`, `not-run`,
  `insufficient-input`

Bloc de faits à exposer explicitement :

- `proposed_sign`
- `claimed_goods_services`
- `nice_classes`
- `market_appearance`
- `known_related_names`
- `search_limitations`

## Chargement du profil pratique

Avant tout, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Rattacher ensuite :

- le rôle utilisateur ;
- les juridictions par défaut ;
- les intégrations disponibles ;
- la posture de prudence.

Si le profil contient `[A CONFIGURER]`, surfacer explicitement le mode
provisoire. Le skill peut tourner avec des hypothèses génériques, mais chaque
sortie doit être taguée `[PROVISOIRE]`.

## Cadrage initial

Demander en un seul batch, puis mapper la réponse au contrat V2 :

1. signe proposé, texte exact, stylisation éventuelle, type apparent ;
2. produits ou services réels ;
3. classes Nice si déjà connues ;
4. territoires visés ;
5. apparence en marché ;
6. noms reliés déjà connus ;
7. limites de recherche déjà identifiées.

Guidance de mapping minimale :

- mot seul -> `mark_type: word`
- logo ou élément graphique dominant -> `mark_type: figurative`
- signe texte + logo -> `mark_type: composite`
- signe mixte mais qualification visuelle encore floue -> `mark_type: semi-figurative`
- classes déjà données -> `goods_services_scope: known-classes`
- simple description business -> `goods_services_scope: described-only`
- classes partielles + description libre -> `goods_services_scope: mixed`
- description trop vague -> `goods_services_scope: unclear`
- FR seul -> `territory_scope: fr`
- EU seul -> `territory_scope: eu`
- FR + EU -> `territory_scope: fr-eu`
- Madrid ou liste de pays ciblée -> `territory_scope: international-subset`

Si la description reste vague, pousser une fois pour obtenir une description
concrète du produit ou service. Si l'information reste insuffisante, marquer
`goods_services_scope: unclear` et réduire la confiance.

## Couche 1 - Motifs absolus

Le knockout `L.711-2 CPI` reste obligatoire avant toute conclusion de triage.

Le résultat du knockout ne doit pas être un tableau plat de pass/fail. Pour
chaque motif pertinent, produire soit :

- aucun problème identifié ;
- soit un flag motivé et concret.

Motifs minimaux à passer en revue :

- caractère distinctif insuffisant ;
- descriptif ;
- devenu usuel ;
- forme imposée si le signe relève d'une forme ;
- atteinte à l'ordre public ou à des signes protégés ;
- trompeur.

## Couche 2 - Couverture de recherche

Avant de commenter les conflits, décrire explicitement la couverture réelle :

- bases interrogées ;
- classes couvertes ;
- territoires couverts ;
- type de recherche : exacte, proche, phonétique, partielle ;
- statut du balayage des familles adjacentes ;
- limitations restantes.

### Intégrations et mode dégradé contrôlé

Si des connecteurs sont disponibles, attribuer chaque résultat à sa source.
Si une intégration manque, le dire explicitement.

Si aucune base n'est interrogée, écrire littéralement dans la sortie :

> **Aucune base de données interrogée.** Ce triage n'a pas touché Data INPI,
> EUIPO TMview, OMPI ROMARIN, base-jurisprudence INPI, ni aucune source non
> enregistrée. Une recherche complète sur ces bases est requise avant toute
> conclusion sur la disponibilité.

Puis continuer avec un triage dégradé, en restant honnête sur les limites.

## Couche 3 - Marques proches

L'objectif est de trouver des marques antérieures potentiellement pertinentes,
pas de trancher la confusion.

Pour chaque marque proche trouvée ou fournie, capturer si possible :

- signe ;
- source ;
- classes / désignation produits-services ;
- titulaire ;
- statut ;
- date de dépôt si disponible ;
- note sur la raison du signalement.

Pas de supplémentation silencieuse. Si une date, un numéro ou un statut n'est
pas présent dans la source, l'écrire comme indisponible plutôt que le deviner.

## Couche 4 - Balayage des familles adjacentes

Le balayage des familles adjacentes est requis avant de conclure.

Si l'utilisateur n'a pas confirmé la liste, exposer
`adjacent_families_status: pending-confirmation` ou `insufficient-input`, et
réduire la confiance du triage.

Le skill doit :

1. proposer 3 à 5 familles adjacentes plausibles ;
2. demander confirmation ou complément ;
3. rejouer la recherche sur les familles confirmées si les intégrations le
   permettent ;
4. sinon, reporter explicitement ces familles comme couverture manquante à
   traiter en recherche professionnelle.

Le statut de cette couche doit toujours être visible :

- `pending-confirmation`
- `confirmed`
- `not-run`
- `insufficient-input`

## Couche 5 - Signaux de confusion FR / UE

Cadre applicable : appréciation globale CJUE, pas de test multi-facteurs US.

Analyser comme signaux, pas comme verdict :

- similitude des signes ;
- similitude des produits/services ;
- pouvoir distinctif de la marque antérieure ;
- public concerné et niveau d'attention ;
- interdépendance des facteurs.

Règles de prudence :

- ne jamais conclure "absence de risque de confusion" ;
- si les facteurs sont ambigus, le dire ;
- si la couverture est incomplète, réduire la portée de toute recommandation.

## Limites de routage

### Router vers `depot-marque-fr`

- pas de blocage majeur évident au premier passage ;
- couverture minimale exploitable pour préparer un dépôt ;
- validation humaine encore obligatoire avant dépôt.

### Router vers `surveillance-marque`

- signe déjà exploité ou en veille active ;
- besoin principal = suivi des publications ou monitorage ;
- pas d'escalade immédiate plus utile qu'un suivi structuré.

### Router vers `analyse-opposition-marque`

- conflit proche émerge ;
- comparaison contradictoire plus fine requise ;
- produits/services, priorités ou stratégie doivent être approfondis.

### Router vers `clearance-marque`

- uniquement pour compatibilité historique ;
- si un ancien flux de travail l'appelle encore ;
- à présenter comme redirection, pas comme flux de travail de même rang.

### Rester dans `recherche-anteriorite-marque`

- besoin principal = premier passage strict ;
- motifs absolus, couverture et conflits proches restent la question centrale ;
- le dossier n'est pas encore dans un flux de travail dépôt, opposition ou surveillance
  plus spécialisé.

## Contrat de sortie V2

La sortie doit produire exactement les huit blocs suivants, dans cet ordre :

1. `Synthèse des motifs absolus`
2. `Couverture de recherche`
3. `Conflits les plus proches`
4. `Balayage des familles adjacentes`
5. `Signaux de risque de confusion`
6. `Incertitudes et couverture manquante`
7. `Routage de prochaine étape`
8. `Validation humaine`

### 1. `Synthèse des motifs absolus`

- rappeler les motifs absolus revus ;
- signaler chaque alerte motivée ;
- ne pas écrire un simple tableau uniforme de "pass".

### 2. `Couverture de recherche`

- bases interrogées ;
- classes et territoires couverts ;
- type de recherche ;
- statut du balayage adjacent ;
- limitations explicites.

### 3. `Conflits les plus proches`

- lister les marques les plus proches ;
- rattacher chaque entrée à sa source ;
- dire pourquoi elle compte dans ce premier passage.

### 4. `Balayage des familles adjacentes`

- lister les familles proposées ;
- indiquer si elles ont été confirmées ;
- dire si elles ont été rejouées ou non ;
- exposer `adjacent_families_status`.

### 5. `Signaux de risque de confusion`

- présenter les facteurs FR/UE comme signaux ;
- distinguer ce qui pèse vers le conflit, contre le conflit, ou reste mixte ;
- ne pas rendre un verdict final de disponibilité.

### 6. `Incertitudes et couverture manquante`

- trous de données ;
- bases non interrogées ;
- limites de territoire, classes, variantes, phonétique, figuratif ou familles
  adjacentes ;
- impact pratique de chaque manque.

### 7. `Routage de prochaine étape`

Ce bloc doit utiliser uniquement l'une des valeurs suivantes :

- `proceed-to-professional-clearance`
- `prepare-filing`
- `monitor-before-filing`
- `prepare-opposition-risk-review`
- `insufficient-search-coverage`
- `abandon-or-rename`

Associer la valeur choisie à 2-4 actions concrètes et à sa justification.

### 8. `Validation humaine`

- rappeler qu'il s'agit d'un premier passage ;
- nommer les validations humaines requises ;
- rappeler les points `[à vérifier]` avant dépôt, adoption ou investissement.

## Règles de sûreté

- Ce skill ne conclut jamais qu'une marque est disponible.
- Une base non interrogée reste une lacune, pas une absence de conflit.
- Une famille adjacente non confirmee ou non rejouee doit être visible.
- Une recherche dégradée sans connecteur reste permise, mais doit être marquée
  comme telle.
- Les numéros, dates, statuts et classes doivent être reliés à une source
  ouvrable avant d'être cités comme appui.

## Niveaux de criticité

Échelle canonique appliquée à l'appréciation du degré de confusion avec les antériorités identifiées (identité/similarité du signe, identité/similarité des produits/services en classes Nice, notoriété de l'antériorité, territoire) — appréciation globale CJUE Sabel/Canon/Lloyd :

| Niveau | Icône | Signification dans le contexte de ce skill |
|---|---|---|
| Faible | 🟢 | Aucun hit pertinent : pas d'identité, pas de similarité forte sur les bases consultées (INPI Data, EUIPO TMview, Madrid Monitor selon scope), classes éloignées, ou antériorités présumées éteintes. Voie libre pour clearance professionnel et dépôt. |
| Moyen | 🟡 | Hits de similarité moyenne : signe phonétiquement ou visuellement proche en classes voisines, antériorité notoire dans un secteur adjacent, ou marque dont l'usage paraît limité. Surveillance recommandée, clearance approfondi requis avant dépôt. |
| Élevé | 🟠 | Risque de confusion établi : antériorité fortement similaire en classes identiques, ou signe identique en classes voisines avec notoriété démontrée. Opposition probable au dépôt ; envisager limitation du libellé, négociation de coexistence, ou changement de signe. |
| Bloquant | 🔴 | Identité (ou quasi-identité) du signe ET identité (ou recouvrement direct) des classes Nice, surtout si l'antériorité est exploitée/notoire/dominante du secteur. Risque maximal de refus, d'opposition garantie et de contrefaçon en cas d'usage. Ne pas déposer ; renommer ou abandonner. |

Plancher cross-skill (CLAUDE.md §4) : ce skill est généralement amont — il pose la cote qui contraindra `depot-marque-fr`, `analyse-opposition-marque` et `anteriorite-invalidite` aval. Sa cote 🔴 doit donc être conservée comme plancher par tout skill consommateur.

## Rappel final à conserver

- premier passage uniquement ;
- jamais une opinion de disponibilité ;
- revue humaine obligatoire avant dépôt, adoption ou investissement marketing.
