---
name: analyse-opposition-marque
version: "2.0.0"
description: >
  Analyse argumentaire INPI stricte pour preparer une opposition a former ou
  une defense a opposition recue. Ce skill n'execute pas la tele-procedure
  officielle et ne remplace pas la validation d'un mandataire en marques ou
  d'un avocat.
argument-hint: "[numero marque | --form | --respond]"
---

# Skill - Analyse opposition marque V2

> **Analyse argumentaire, pas procedure officielle.**
> Cette sortie prepare l'opposition ou la defense INPI, mais ne depose pas la
> tele-procedure officielle et ne remplace pas la validation d'un mandataire
> ou d'un avocat.
>
> Le delai d'opposition de 2 mois post-publication BOPI et les delais INPI de
> reponse restent fermes. Une tele-procedure ratee, incomplete ou hors delai ne
> doit jamais etre maquillee en simple "issue procedurale". Si le delai est
> douteux, le skill doit le dire tout de suite.

`analyse-opposition-marque` reste la brique opposition INPI de la lane marques :

1. publication detectee ou notification recue ;
2. `analyse-opposition-marque` ;
3. selon l'issue :
   - depot opposition / memoire en defense ;
   - coexistence, limitation ou autre sortie negociee ;
   - escalation vers `contentieux-pi` si le dossier bascule hors procedure
     normale d'opposition INPI.

La coexistence ou la transaction reste une issue secondaire du dossier, jamais
un mode rival au coeur du workflow.

## Ce skill ne fait pas

- Ne depose pas l'opposition formelle INPI.
- Ne redige pas la tele-procedure officielle complete.
- Ne remplace pas une clearance marque initiale.
- Ne remplace pas un contentieux judiciaire si le dossier a deja bascule hors
  du perimetre normal de l'opposition INPI.
- Ne transforme pas la coexistence en mode principal autonome.

## Contrat d'entree V2

Le skill doit expliciter ou deriver les dimensions suivantes :

- `mode`: `form`, `respond`
- `opposition_basis`: `likelihood-of-confusion`, `reputation`,
  `other-prior-right`, `mixed`
- `procedure_stage`: `pre-filing-window`, `drafting`,
  `filed-waiting-response`, `response-window`, `reply-phase`,
  `decision-pending`
- `filing_deadline_status`: `green`, `amber`, `red`, `expired`
- `evidence_strength`: `strong`, `mixed`, `weak`, `unknown`

Bloc de faits a exposer explicitement :

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

- le role utilisateur ;
- la posture opposition / enforcement ;
- la matrice d'approbateurs ;
- le mandataire ou avocat de validation ;
- les integrations et la chronologie BOPI disponibles.

Si le profil contient `[A CONFIGURER]`, le mode provisoire reste possible, mais
chaque sortie doit etre taggee `[PROVISOIRE]`.

## Intake

Le skill garde ses deux entrees publiques :

- `--form` : opposition a former
- `--respond` : opposition recue a defendre

Si le mode n'est pas donne, le demander d'abord. Ensuite, demander en un seul
batch :

- numero de la marque cible ou opposee ;
- date de publication BOPI ou date de notification ;
- droits anterieurs invoques ou opposants ;
- motifs retenus ou invoques ;
- strategie ou position envisagee ;
- posture transaction / coexistence ;
- limites deja connues du dossier.

Guidance de mapping minimale :

- opposition en preparation avant depot INPI -> `procedure_stage: pre-filing-window`
- dossier d'opposition en cours de redaction -> `procedure_stage: drafting`
- opposition deja deposee, attente ou phase procedurale intermediaire ->
  `procedure_stage: filed-waiting-response`
- notification recue + memoire defense a preparer ->
  `procedure_stage: response-window`
- echanges ulterieurs ou replique -> `procedure_stage: reply-phase`
- attente decision -> `procedure_stage: decision-pending`
- moins de 7 jours restants -> `filing_deadline_status: red`
- delai deja depasse ou non exploitable -> `filing_deadline_status: expired`
- pieces fortes sur usage, renommee, similitude ou priorite ->
  `evidence_strength: strong`
- dossier partiellement documente -> `evidence_strength: mixed`
- dossier mince ou contradictoire -> `evidence_strength: weak`

Si `mode`, `procedure_stage` ou `filing_deadline_status` reste incertain, la
sortie doit reduire son niveau de confiance et marquer le point `[a verifier]`.

## Procedure Gate

Avant toute analyse de fond, rendre visible le gate procedurale :

- type de dossier : `form` ou `respond` ;
- point de depart du delai ;
- statut du delai : `green`, `amber`, `red` ou `expired` ;
- suffisance ou insuffisance des donnees procedurales ;
- risque de dossier incomplet ou hors delai.

Si `filing_deadline_status: expired`, la sortie ne doit pas faire comme si le
dossier suivait un chemin normal. Elle doit abaisser la recommandation,
marquer la question de restauration ou d'autre voie `[a verifier]`, et signaler
que l'opposition INPI peut etre perdue comme levier ordinaire.

## Analyse des motifs

Pour chaque motif invoque ou oppose, produire sous un contrat stable :

- droit anterieur invoque ;
- branche juridique pertinente ;
- force apparente ;
- pieces critiques ;
- points de fragilite.

Le skill reste centre sur les principaux fondements CI / CPI utiles a
l'opposition INPI.

### `likelihood-of-confusion`

Motif principal quand l'opposition repose sur la proximite entre signes et
produits/services.

Branches minimales a couvrir :

- comparaison des signes : visuelle, auditive, conceptuelle, impression
  d'ensemble, element dominant et distinctif ;
- comparaison des produits/services : identite, similitude, nature,
  destination, complementarite, concurrence, canaux ;
- appreciation globale : interdendance des facteurs, pouvoir distinctif,
  public concerne, risque de confusion ou d'association.

Ce bloc doit signaler :

- la force de chaque branche ;
- les points forts utiles a un memoire ;
- les faiblesses exploitables en defense ou en attaque ;
- les pieces critiques manquantes.

### `reputation`

Motif reserve aux dossiers ou la renommee de la marque anterieure est
soutenable.

Branches minimales a couvrir :

- renommee prouvee : part de marche, anciennete, couverture geographique,
  investissements, notoriete, presse, reconnaissances ;
- lien entre les signes ;
- profit indu, dilution ou ternissement.

Ce bloc doit rester exigeant. Si la renommee n'est pas suffisamment etayee,
le skill doit le dire et ne pas traiter ce motif comme automatiquement robuste.

### `other-prior-right`

Motif couvrant les autres droits anterieurs utiles dans une opposition INPI.

Sous-branches typiques :

- nom commercial / enseigne ;
- nom de domaine avec usage actif ;
- depot frauduleux ;
- AOP / IGP ;
- droit au nom ;
- droit d'auteur si la base probatoire est exploitable.

Pour chaque sous-branche active, exposer :

- la base juridique ou logique d'opposition ;
- les pieces minimales requises ;
- la portee utile du droit anterieur ;
- les faiblesses previsibles.

### `mixed`

Quand plusieurs motifs sont combines, les garder distincts puis les reunir en
strategie. Ne pas noyer un motif faible dans un motif plus fort.

## Coexistence ou transaction

La coexistence ou la transaction est une issue strategique secondaire.

Elle ne remplace jamais silencieusement l'analyse opposition.

Elle ne doit etre proposee que si elle est coherente avec :

- le delai ;
- la force probatoire ;
- la posture du dossier ;
- l'objectif business ;
- la marge de manoeuvre reelle sur les classes, libelles ou conditions de
  coexistence.

Quand cette branche est envisagee, la sortie doit exposer :

- pourquoi elle est ouverte ;
- ce qu'elle permet d'eviter ou de preserver ;
- ce qu'elle coute en concession ou en risque residuel ;
- pourquoi elle ne remplace pas le besoin d'une position argumentaire.

## Routing Boundaries

### Route to `recherche-anteriorite-marque`

- pas encore de publication BOPI exploitable ;
- pas encore de notification d'opposition ;
- besoin principal = premier passage sur le signe.

### Route to `surveillance-marque`

- besoin principal = suivi systematique des publications ;
- aucune opposition identifiee a analyser maintenant ;
- objectif principal = detection continue, pas memo d'opposition.

### Route to `depot-marque-fr`

- sujet principal = preparation ou limitation d'un depot en amont ;
- pas de vrai dossier d'opposition forme ;
- travail principal porte sur le libelle ou la preparation du depot.

### Route to `contentieux-pi`

- dossier deja hors simple opposition INPI ;
- recours ou escalation judiciaire envisage ;
- besoin principal = strategie contentieuse formelle.

### Stay in `analyse-opposition-marque`

- publication BOPI ou notification exploitable existe ;
- besoin principal = preparer une opposition INPI ou une defense argumentaire ;
- le coeur du travail reste procedural et contradictoire dans le cadre INPI.

## Contrat de sortie V2

La sortie doit produire exactement les huit blocs suivants, dans cet ordre :

1. `Procedure Gate and Deadline`
2. `Rights and Grounds Snapshot`
3. `Arguments and Counter-Arguments Map`
4. `Evidence and Record Gaps`
5. `Procedural Strategy`
6. `Settlement and Coexistence Option`
7. `Decision Routing`
8. `Human Validation`

### 1. `Procedure Gate and Deadline`

- type de dossier ;
- date de publication ou notification ;
- statut du delai ;
- suffisance des donnees procedurales ;
- tout point de hors delai ou d'incertitude `[a verifier]`.

### 2. `Rights and Grounds Snapshot`

- droits anterieurs opposes ou contestes ;
- fondement principal ;
- autres motifs actifs ;
- force apparente par motif.

### 3. `Arguments and Counter-Arguments Map`

- en `form` : arguments offensifs attendus et defenses adverses probables ;
- en `respond` : arguments opposants et contre-arguments defensifs plausibles ;
- faire apparaitre pour chaque branche la force, les pieces critiques et les
  fragilites.

### 4. `Evidence and Record Gaps`

- pieces disponibles ;
- pieces manquantes ;
- fragilites de chaine, d'usage, de renommee, de priorite ou de libelle ;
- impact de chaque trou sur la procedure.

### 5. `Procedural Strategy`

- voie recommandee dans le cadre INPI ;
- priorites immediates ;
- ordre des actions ;
- traitement du delai ;
- articulation eventuelle avec limitation, reponse, ou escalation.

### 6. `Settlement and Coexistence Option`

- dire si la branche est ouverte, prudente ou inopportune ;
- lier cette branche au risque, a la preuve, au calendrier et a l'objectif
  business ;
- ne jamais la presenter comme substitution implicite a l'analyse opposition.

### 7. `Decision Routing`

Ce bloc doit utiliser uniquement l'une des valeurs suivantes :

- `file-opposition`
- `prepare-defense`
- `seek-coexistence`
- `limit-goods-services`
- `escalate-to-contentieux`
- `insufficient-record`
- `deadline-critical`

Associer la valeur choisie a 2-4 actions concretes et a sa justification.

### 8. `Human Validation`

- rappeler qu'il s'agit d'une analyse argumentaire, pas de la tele-procedure ;
- nommer les validations mandataire / avocat / client utiles ;
- rappeler les points `[a verifier]` avant depot, memoire, accord ou escalation.

## Regles de surete

- Le garde-fou "analyse argumentaire, pas procedure officielle" doit rester
  visible en tete de sortie.
- Les modes `form` et `respond` restent les deux seules entrees publiques.
- Une coexistence n'efface jamais la necessite d'une analyse opposition
  honnete quand le dossier l'exige.
- Une information procedurale floue, un delai douteux ou une preuve faible doit
  reduire la confiance de la recommandation.
- Toute base INPI ou chronologie BOPI non verifiee reste une limite explicite.

## Rappel final a conserver

- analyse argumentaire seulement ;
- opposition INPI ou defense INPI seulement ;
- validation humaine obligatoire avant toute tele-procedure, memoire officiel
  ou accord de coexistence engageant.
