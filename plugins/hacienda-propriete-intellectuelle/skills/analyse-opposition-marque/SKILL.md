---
name: analyse-opposition-marque
version: "2.0.0"
description: >
  Analyse argumentaire INPI stricte pour préparer une opposition à former ou
  une défense à opposition reçue. Ce skill n'exécute pas la téléprocédure
  officielle et ne remplace pas la validation d'un mandataire en marques ou
  d'un avocat.
argument-hint: "[numero-marque | --form | --respond]"
authors: ["Hacienda"]
tags: [marques, opposition, INPI, L712-4, risque-confusion]
---

# Skill - Analyse opposition marque V2

> **Analyse argumentaire, pas procédure officielle.**
> Cette sortie prépare l'opposition ou la défense INPI, mais ne dépose pas la
> téléprocédure officielle et ne remplace pas la validation d'un mandataire
> ou d'un avocat.
>
> Le délai d'opposition de 2 mois post-publication BOPI et les délais INPI de
> réponse restent fermés. Une téléprocédure ratée, incomplète ou hors délai ne
> doit jamais être maquillée en simple "issue procédurale". Si le délai est
> douteux, le skill doit le dire tout de suite.

`analyse-opposition-marque` reste la brique opposition INPI de la voie marques :

1. publication détectée ou notification reçue ;
2. `analyse-opposition-marque` ;
3. selon l'issue :
   - dépôt opposition / mémoire en défense ;
   - coexistence, limitation ou autre sortie négociée ;
   - escalade vers `contentieux-pi` si le dossier bascule hors procédure
     normale d'opposition INPI.

La coexistence ou la transaction reste une issue secondaire du dossier, jamais
un mode rival au coeur du flux de travail.

## Examples

<example>
<user>/h-pi:analyse-opposition-marque [numero-marque | --form | --respond]</user>
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

- Ne dépose pas l'opposition formelle INPI.
- Ne rédige pas la téléprocédure officielle complète.
- Ne remplace pas une vérification marque initiale.
- Ne remplace pas un contentieux judiciaire si le dossier a déjà basculé hors
  du périmètre normal de l'opposition INPI.
- Ne transforme pas la coexistence en mode principal autonome.

## Contrat d'entrée V2

Le skill doit expliciter ou dériver les dimensions suivantes :

- `mode`: `form`, `respond`
- `opposition_basis`: `likelihood-of-confusion`, `reputation`,
  `other-prior-right`, `mixed`
- `procedure_stage`: `pre-filing-window`, `drafting`,
  `filed-waiting-response`, `response-window`, `reply-phase`,
  `decision-pending`
- `filing_deadline_status`: `green`, `amber`, `red`, `expired`
- `evidence_strength`: `strong`, `mixed`, `weak`, `unknown`

Bloc de faits à exposer explicitement :

- `target_mark`
- `opposing_rights`
- `publication_or_notification_date`
- `goods_services_overlap`
- `argument_scope`
- `settlement_posture`
- `search_and_record_limitations`

## Chargement du profil pratique

Avant tout, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Rattacher ensuite :

- le rôle utilisateur ;
- la posture opposition / enforcement ;
- la matrice d'approbateurs ;
- le mandataire ou avocat de validation ;
- les intégrations et la chronologie BOPI disponibles.

Si le profil contient `[A CONFIGURER]`, le mode provisoire reste possible, mais
chaque sortie doit être taguée `[PROVISOIRE]`.

## Cadrage initial

Le skill garde ses deux entrées publiques :

- `--form` : opposition à former
- `--respond` : opposition reçue à défendre

Si le mode n'est pas donné, le demander d'abord. Ensuite, demander en un seul
batch :

- numéro de la marque cible ou opposée ;
- date de publication BOPI ou date de notification ;
- droits antérieurs invoqués ou opposants ;
- motifs retenus ou invoqués ;
- stratégie ou position envisagée ;
- posture transaction / coexistence ;
- limites déjà connues du dossier.

Guidance de mapping minimale :

- opposition en préparation avant dépôt INPI -> `procedure_stage: pre-filing-window`
- dossier d'opposition en cours de rédaction -> `procedure_stage: drafting`
- opposition déjà déposée, attente ou phase procédurale intermédiaire ->
  `procedure_stage: filed-waiting-response`
- notification reçue + mémoire défense à préparer ->
  `procedure_stage: response-window`
- échanges ultérieurs ou réplique -> `procedure_stage: reply-phase`
- attente décision -> `procedure_stage: decision-pending`
- moins de 7 jours restants -> `filing_deadline_status: red`
- délai déjà dépassé ou non exploitable -> `filing_deadline_status: expired`
- pièces fortes sur usage, renommée, similitude ou priorité ->
  `evidence_strength: strong`
- dossier partiellement documenté -> `evidence_strength: mixed`
- dossier mince ou contradictoire -> `evidence_strength: weak`

Si `mode`, `procedure_stage` ou `filing_deadline_status` reste incertain, la
sortie doit réduire son niveau de confiance et marquer le point `[à vérifier]`.

## Filtre procédural

Avant toute analyse de fond, rendre visible le seuil procédural :

- type de dossier : `form` ou `respond` ;
- point de départ du délai ;
- statut du délai : `green`, `amber`, `red` ou `expired` ;
- suffisance ou insuffisance des données procédurales ;
- risque de dossier incomplet ou hors délai.

Si `filing_deadline_status: expired`, la sortie ne doit pas faire comme si le
dossier suivait un chemin normal. Elle doit abaisser la recommandation,
marquer la question de restauration ou d'autre voie `[à vérifier]`, et signaler
que l'opposition INPI peut être perdue comme levier ordinaire.

## Analyse des motifs

Pour chaque motif invoqué ou oppose, produire sous un contrat stable :

- droit antérieur invoqué ;
- branche juridique pertinente ;
- force apparente ;
- pièces critiques ;
- points de fragilite.

Le skill reste centré sur les principaux fondements CI / CPI utiles a
l'opposition INPI.

### `likelihood-of-confusion`

Motif principal quand l'opposition repose sur la proximité entre signes et
produits/services.

Branches minimales à couvrir :

- comparaison des signes : visuelle, auditive, conceptuelle, impression
  d'ensemble, élément dominant et distinctif ;
- comparaison des produits/services : identité, similitude, nature,
  destination, complémentarité, concurrence, canaux ;
- appréciation globale : interdendance des facteurs, pouvoir distinctif,
  public concerné, risque de confusion ou d'association.

Ce bloc doit signaler :

- la force de chaque branche ;
- les points forts utiles à un mémoire ;
- les faiblesses exploitables en défense ou en attaque ;
- les pièces critiques manquantes.

### `reputation`

Motif réservé aux dossiers où la renommée de la marque antérieure est
soutenable.

Branches minimales à couvrir :

- renommée prouvée : part de marché, ancienneté, couverture géographique,
  investissements, notoriété, presse, reconnaissances ;
- lien entre les signes ;
- profit indu, dilution ou ternissement.

Ce bloc doit rester exigeant. Si la renommée n'est pas suffisamment étayée,
le skill doit le dire et ne pas traiter ce motif comme automatiquement robuste.

### `other-prior-right`

Motif couvrant les autres droits antérieurs utiles dans une opposition INPI.

Sous-branches typiques :

- nom commercial / enseigne ;
- nom de domaine avec usage actif ;
- dépôt frauduleux ;
- AOP / IGP ;
- droit au nom ;
- droit d'auteur si la base probatoire est exploitable.

Pour chaque sous-branche active, exposer :

- la base juridique ou logique d'opposition ;
- les pièces minimales requises ;
- la portée utile du droit antérieur ;
- les faiblesses previsibles.

### `mixed`

Quand plusieurs motifs sont combinés, les garder distincts puis les réunir en
stratégie. Ne pas noyer un motif faible dans un motif plus fort.

## Coexistence ou transaction

La coexistence ou la transaction est une issue stratégique secondaire.

Elle ne remplace jamais silencieusement l'analyse opposition.

Elle ne doit être proposée que si elle est cohérente avec :

- le délai ;
- la force probatoire ;
- la posture du dossier ;
- l'objectif business ;
- la marge de manoeuvre réelle sur les classes, libellés ou conditions de
  coexistence.

Quand cette branche est envisagée, la sortie doit exposer :

- pourquoi elle est ouverte ;
- ce qu'elle permet d'éviter ou de préserver ;
- ce qu'elle coûte en concession ou en risque résiduel ;
- pourquoi elle ne remplace pas le besoin d'une position argumentaire.

## Limites de routage

### Router vers `recherche-anteriorite-marque`

- pas encore de publication BOPI exploitable ;
- pas encore de notification d'opposition ;
- besoin principal = premier passage sur le signe.

### Router vers `surveillance-marque`

- besoin principal = suivi systématique des publications ;
- aucune opposition identifiée à analyser maintenant ;
- objectif principal = détection continue, pas mémo d'opposition.

### Router vers `depot-marque-fr`

- sujet principal = préparation ou limitation d'un dépôt en amont ;
- pas de vrai dossier d'opposition formé ;
- travail principal porte sur le libellé ou la préparation du dépôt.

### Router vers `contentieux-pi`

- dossier déjà hors simple opposition INPI ;
- recours ou escalade judiciaire envisagé ;
- besoin principal = stratégie contentieuse formelle.

### Rester dans `analyse-opposition-marque`

- publication BOPI ou notification exploitable existe ;
- besoin principal = préparer une opposition INPI ou une défense argumentaire ;
- le coeur du travail reste procédural et contradictoire dans le cadre INPI.

## Contrat de sortie V2

La sortie doit produire exactement les huit blocs suivants, dans cet ordre :

1. `Filtre procédural et échéance`
2. `Synthèse des droits et fondements`
3. `Carte arguments et contre-arguments`
4. `Preuves et lacunes du dossier`
5. `Stratégie procédurale`
6. `Option transaction ou coexistence`
7. `Routage de décision`
8. `Validation humaine`

### 1. Filtre procédural et échéance

- type de dossier ;
- date de publication ou notification ;
- statut du délai ;
- suffisance des données procédurales ;
- tout point de hors délai ou d'incertitude `[à vérifier]`.

### 2. `Synthèse des droits et fondements`

- droits antérieurs opposés ou contestés ;
- fondement principal ;
- autres motifs actifs ;
- force apparente par motif.

### 3. `Carte arguments et contre-arguments`

- en `form` : arguments offensifs attendus et défenses adverses probables ;
- en `respond` : arguments opposants et contre-arguments défensifs plausibles ;
- faire apparaître pour chaque branche la force, les pièces critiques et les
  fragilités.

### 4. `Preuves et lacunes du dossier`

- pièces disponibles ;
- pièces manquantes ;
- fragilités de chaîne, d'usage, de renommée, de priorité ou de libellé ;
- impact de chaque trou sur la procédure.

### 5. `Stratégie procédurale`

- voie recommandée dans le cadre INPI ;
- priorités immédiates ;
- ordre des actions ;
- traitement du délai ;
- articulation éventuelle avec limitation, réponse, ou escalade.

### 6. `Option transaction ou coexistence`

- dire si la branche est ouverte, prudente ou inopportune ;
- lier cette branche au risque, à la preuve, au calendrier et à l'objectif
  business ;
- ne jamais la présenter comme substitution implicite à l'analyse opposition.

### 7. `Routage de décision`

Ce bloc doit utiliser uniquement l'une des valeurs suivantes :

- `file-opposition`
- `prepare-defense`
- `seek-coexistence`
- `limit-goods-services`
- `escalate-to-contentieux`
- `insufficient-record`
- `deadline-critical`

Associer la valeur choisie à 2-4 actions concrètes et à sa justification.

### 8. `Validation humaine`

- rappeler qu'il s'agit d'une analyse argumentaire, pas de la téléprocédure ;
- nommer les validations mandataire / avocat / client utiles ;
- rappeler les points `[à vérifier]` avant dépôt, mémoire, accord ou escalade.

## Règles de sûreté

- Le garde-fou "analyse argumentaire, pas procédure officielle" doit rester
  visible en tête de sortie.
- Les modes `form` et `respond` restent les deux seules entrées publiques.
- Une coexistence n'efface jamais la nécessité d'une analyse opposition
  honnête quand le dossier l'exige.
- Une information procédurale floue, un délai douteux ou une preuve faible doit
  réduire la confiance de la recommandation.
- Toute base INPI ou chronologie BOPI non vérifiée reste une limite explicite.

## Niveaux de criticité

Échelle canonique appliquée à toute appréciation subjective de ce skill (solidité d'une opposition INPI ou d'une défense en opposition, appréciation globale du risque de confusion façon CJUE Sabel/Canon) :

| Niveau | Icône | Signification dans le contexte de ce skill |
|---|---|---|
| Faible | 🟢 | Opposition solide ou défense robuste : antériorité valide, identité ou forte similarité signe + classes, preuves d'usage disponibles, motifs convergents. Aucune faille procédurale (délai L.712-4, qualité à agir, preuves) identifiée. |
| Moyen | 🟡 | Opposition ou défense plausible mais fragile sur un point : similarité moyenne des signes, classes voisines sans identité, preuve d'usage partielle, ou motif relatif unique. Issue dépend de l'appréciation INPI au cas par cas. |
| Élevé | 🟠 | Faille sérieuse : antériorité contestable (déchéance possible, usage non démontré), similarité faible des signes ou classes éloignées, délai serré, ou motif d'opposition mal couvert par les droits invoqués. Risque réel d'échec ou de rejet partiel. |
| Bloquant | 🔴 | Opposition vouée à l'échec ou défense intenable : antériorité invocable inexistante, hors délai d'opposition, qualité à agir absente, preuves d'usage manquantes sur 5 ans alors que demandées, ou produits/services totalement étrangers. Ne pas former l'opposition, ou capituler par coexistence/limitation. |

Plancher cross-skill (CLAUDE.md §4) : ce skill ne peut pas dégrader silencieusement une cote 🔴 amont (par ex. de `recherche-anteriorite-marque` ou `anteriorite-invalidite`) vers 🟡 ou inférieur sans déclaration explicite dans la sortie.

## Rappel final à conserver

- analyse argumentaire seulement ;
- opposition INPI ou défense INPI seulement ;
- validation humaine obligatoire avant toute téléprocédure, mémoire officiel
  ou accord de coexistence engageant.
