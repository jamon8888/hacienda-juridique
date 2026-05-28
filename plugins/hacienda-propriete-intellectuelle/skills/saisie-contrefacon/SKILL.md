---
name: saisie-contrefacon
description: >
  Skill V2 multi-droits de préparation stricte de mesure probatoire, centre
  sur la requête, le périmètre de saisie, les contraintes d'exécution, le
  secret des affaires et le routage immédiat post-saisie. Brouillon soumis à
  validation par un avocat.
argument-hint: "[brevet|marque|D&M|auteur|logiciel|mixte]"
version: "2.0.0"
authors: ["Hacienda"]
tags: [saisie-contrefacon, requete, commissaire-justice, preuve, brevets, marques, dessins-modeles, droit-auteur, logiciel]
---

# Skill - Saisie contrefaçon V2

> **Mesure probatoire stricte, pas contentieux global.**
> `saisie-contrefacon` sert à préparer une requête de saisie-contrefaçon, le
> périmètre des opérations, les instructions d'exécution, la gestion du secret
> des affaires et les suites immédiates post-saisie. Il ne dépose pas la
> requête, ne remplace pas l'avocat ni le commissaire de justice, et ne pilote
> pas seul la stratégie contentieuse globale.

Référence de travail utile :
`references/saisie-contrefacon-routing-and-output.md`

## Examples

<example>
<user>/h-pi:saisie-contrefacon [brevet|marque|D&M|auteur|logiciel|mixte]</user>
<response>
Brouillon de travail structuré, avec faits, droit, analyse, incertitudes, sources consultées, points `[à vérifier]` et validation humaine obligatoire.
</response>
</example>

## Chargement du profil

Avant tout travail substantiel, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Si le profil est absent, incomplet ou contient `[A CONFIGURER]`, demander `/h-pi:entretien-demarrage` et garder les marqueurs `[à vérifier]` visibles.

Avant tout, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Rattacher ensuite :

- l'avocat PI referent ;
- le commissaire de justice habituel ;
- l'expert technique habituel ;
- le budget indicatif de saisie ;
- le rôle utilisateur courant ;
- les approbateurs procéduraux.

Si le profil contient `[A CONFIGURER]`, le skill peut fonctionner en mode
générique, mais chaque sortie doit être marquée `[PROVISOIRE]`.

## Intake

Identifier au minimum : demande, actif ou droit concerné, parties, territoire, dates utiles, documents disponibles, source officielle à consulter, urgence, sortie attendue et niveau de validation humaine requis.

## Gate non-juriste

Si l'utilisateur n'est pas juriste ou avocat, produire une explication opérationnelle, signaler les limites, refuser toute conclusion présentée comme avis juridique final et demander validation par un professionnel habilité avant usage externe.

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Propriété Intellectuelle` est disponible. Ne pas inventer de tool hors périmètre ; si une source ou un registre n'a pas été consulté directement, garder `[à vérifier]`.

- Socle textes, jurisprudence et droit UE : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Brevets et Espacenet : `inpi_search_brevets`, `inpi_brevet_details`, `espacenet_search`, `espacenet_brevet_details`.
- Anno, quand disponible, reste une source interne de dossier : jamais un registre officiel INPI, EUIPO, OEB, OMPI ou BOPI.

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/` ou `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`.

Ecrire les livrables dans :

`~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/`

Format attendu :

- `saisie-contrefacon-<affaire-slug>-YYYY-MM-DD.md`

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

## Positionnement

`saisie-contrefacon` V2 est un skill de **préparation stricte de mesure
probatoire**.

Il sert à :

1. qualifier le `rights_track` applicable ;
2. vérifier si une saisie est proceduralement exploitable ;
3. structurer le projet de requête ;
4. cadrer le périmètre de saisie ;
5. préparer les instructions d'exécution ;
6. borner les suites immédiates après exécution.

Il ne sert pas a :

- déposer la requête ;
- piloter seul le contentieux global ;
- faire une défense de nullité ;
- rédiger une mise en demeure ;
- se substituer à l'analyse au fond de la contrefaçon.

## Ce skill ne fait pas

- Ne dépose pas la requête.
- Ne remplace pas `contentieux-pi`.
- Ne remplace pas `mise-en-demeure-pi`.
- Ne remplace pas `tableau-contrefacon-brevet`.
- Ne remplace pas `contrefacon-droit-auteur`.
- Ne remplace pas `contrefacon-dessin-modele`.
- Ne remplace pas l'avocat ou le commissaire de justice.

## Contrat d'entrée V2

Le skill doit expliciter ou dériver :

- `rights_track`: `patent`, `trademark`, `design`, `copyright`,
  `software`, `mixed`
- `title_status`: `valid`, `uncertain`, `blocked`
- `proof_posture`: `strong`, `mixed`, `weak`, `none`
- `target_location_status`: `identified`, `partial`, `unknown`
- `seizure_scope`: `descriptive`, `real`, `documents`, `internet`, `mixed`,
  `unclear`
- `execution_urgency`: `routine`, `heightened`, `critical`, `unclear`
- `trade_secret_risk`: `low`, `medium`, `high`, `unclear`
- `post_seizure_readiness`: `ready`, `partial`, `blocked`

Bloc de faits minimum :

- `right_invoked`
- `title_reference`
- `title_validity_status`
- `suspected_infringer`
- `target_locations`
- `suspected_acts`
- `available_pre_evidence`
- `requested_seizure_type`
- `expert_need`
- `urgency_context`
- `expected_court`

## Seuil de préparation de la saisie

Le skill doit évaluer un `Seuil de préparation de la saisie`.

Statuts :

- `ready`
- `partial`
- `blocked`

Passer en `ready` si :

- le titre ou fondement est exploitable ;
- un commencement de preuve existe ;
- les lieux ou cibles de saisie sont identifiables ;
- le périmètre de mesure peut être formule proprement ;
- le calendrier post-saisie est tenable.

Passer en `partial` si :

- la saisie reste envisageable ;
- mais certains points critiques doivent être confirms ou tags
  `[à vérifier]`.

Passer en `blocked` si :

- le titre est trop incertain ;
- le commencement de preuve est trop faible ;
- les lieux ou objets ne sont pas localisables ;
- la mesure serait disproportionnee ou proceduralement mal fondée.

En `blocked`, produire un constat de blocage et une suite de préparation, pas
une pseudo-requête.

## Notes par branche de droits

### `patent`

- base légale principale : `L.615-5 CPI`
- expert technique frequemment nécessaire ;
- saisie réelle souvent pertinente ;
- attention à la technicite du périmètre et aux variantes.

### `trademark`

- base légale principale : `L.716-7 CPI`
- saisie internet fréquente ;
- achat-test souvent meilleur commencement de preuve ;
- documenter signes, confusion, emballages et flux commerciaux.

### `design`

- base légale principale : `L.521-4 CPI`
- la description visuelle est centrale ;
- bien cadrer l'impression d'ensemble et les angles utiles ;
- attention au DMCNE si pertinent.

### `copyright`

- base légale principale : `L.332-1 CPI`
- pas de titre enregistré obligatoire ;
- vérifier paternite, originalité et date ;
- la preuve initiale doit être particulierement soignee.

### `software`

- base légale principale : `L.332-4 CPI`
- expert informatique requis si copie de code ou environnement technique ;
- bien séparer saisie du code, des logs, des binaires, des dépôts et des
  documents d'exploitation ;
- attention accrue au secret des affaires.

### `mixed`

- expliciter les droits cumules ;
- ne pas fusionner les fondements sans les distinguer ;
- borner le périmètre de chaque mesure demandee.

## Sortie V2

La sortie doit être stabilisée en 9 blocs.

### 1. `Synthèse du dossier`

- droit invoqué ;
- titre ;
- cible ;
- actes suspectes ;
- urgence.

### 2. `Seuil de préparation de la saisie`

- `ready` / `partial` / `blocked`
- raison simple ;
- niveau d'exploitabilite de la mesure.

### 3. `Branche de droits et base juridique`

- base légale par droit ;
- spécificité de la branche ;
- conditions particulieres.

### 4. `Périmètre de saisie proposé`

- type de saisie ;
- locaux / objets / supports visés ;
- périmètre recommande ;
- points à exclure.

### 5. `Preuve et proportionnalité`

- commencement de preuve ;
- adéquation de la mesure ;
- limites de proportionalite ;
- points faibles.

### 6. Secret des affaires et contraintes d'exécution

- secret des affaires ;
- scelles ;
- expert ;
- exécution pratique ;
- points de friction previsibles.

### 7. Rédaction et pack d'exécution

- structure de requête ;
- instructions commissaire de justice ;
- pièces à joindre ;
- personnes à mobiliser ;
- rappel du délai 20 jours ouvrables / 31 jours civils.

### 8. `Routage de décision`

Le skill doit borner ses suites à un jeu fermé :

- `prepare-filing-pack`
- `prepare-execution-pack`
- `prepare-post-seizure-assignment`
- `prepare-evidence-hardening`
- `route-to-substantive-infringement-review`
- `hold-insufficient-basis`

Handoffs obligatoires :

- `prepare-filing-pack` : pack pour dépôt par l'avocat constitue
- `prepare-execution-pack` : pack opérationnel pour commissaire de justice
- `prepare-post-seizure-assignment` : routage vers `contentieux-pi`
- `prepare-evidence-hardening` : consolidation du commencement de preuve avant
  nouvelle tentative
- `route-to-substantive-infringement-review` : routage vers
  `tableau-contrefacon-brevet`, `contrefacon-droit-auteur` ou
  `contrefacon-dessin-modele` selon le `rights_track`
- `hold-insufficient-basis` : pas de pseudo-requête, blocage explicite

### 9. `Validation humaine`

- validation avocat obligatoire ;
- coordination commissaire de justice ;
- revue des délais post-saisie ;
- vérification humaine finale ;
- rappel obligatoire : brouillon, pas acte de procédure final.

## Rédaction et pack d'exécution

Le skill doit pouvoir produire un pack de travail contenant au minimum :

- un projet de requête structuré ;
- les mesures sollicitees ;
- les locaux visés ;
- les pièces jointes attendues ;
- les instructions d'exécution ;
- les points de vigilance (secret, proportionnalite, resistance, scelles).

Rappel obligatoire :

- brouillon, pas acte final ;
- validation avocat obligatoire ;
- exécution par commissaire de justice ;
- délai critique post-saisie.

## Contraintes post-saisie

Le skill doit rappeler :

- assignation au fond dans les `20 jours ouvrables` ou `31 jours civils`
  suivant l'exécution ;
- risque de mainlevee et nullité des preuves en cas de non-respect ;
- risque de retractation si preuve ou périmètre insuffisants ;
- gestion des scelles et du secret des affaires si contestation.

## Boundary Rules

- `tri-contrefacon` : cadrage initial enforcement initial
- `mise-en-demeure-pi` : lettre et posture précontentieuse
- `contentieux-pi` : stratégie judiciaire globale
- `tableau-contrefacon-brevet` : tableau de contrefaçon offensif brevet
- `contrefacon-droit-auteur` : analyse de fond auteur
- `contrefacon-dessin-modele` : analyse de fond D&M

## Style de sortie

- Procédural, précis, urgent.
- Distinguer faits, base légale, périmètre, contraintes, routing et
  validation humaine.
- Utiliser `[à vérifier]` pour toute donnée non recoupée.
- Utiliser `[PROVISOIRE]` si le profil est incomplet.
- Ne jamais présenter la requête comme un acte de procédure déposé.
