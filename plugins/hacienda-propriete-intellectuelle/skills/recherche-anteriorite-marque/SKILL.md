---
name: recherche-anteriorite-marque
version: "2.0.0"
description: >
  Premier passage strict de recherche d'anteriorite marque pour signaler les
  motifs absolus, les conflits proches et les trous de couverture avant revue
  humaine. Ce skill ne conclut jamais qu'une marque est disponible.
argument-hint: "[signe | classes Nice | territoires FR/EU/intl]"
---

# Skill - Recherche d'anteriorite marque V2

> **Premier passage, pas une opinion de disponibilite.**
> Une opinion de disponibilite exige une recherche professionnelle complete et
> le jugement d'un mandataire en marques ou d'un avocat.
>
> "Aucun conflit evident" issu de ce skill signifie uniquement que le premier
> passage n'a rien remonte dans son perimetre reel. Cela ne veut pas dire que
> la marque est libre.

`recherche-anteriorite-marque` reste la premiere brique de la lane marques :

1. premier passage de triage ;
2. puis, selon l'issue :
   - `depot-marque-fr`
   - `surveillance-marque`
   - `analyse-opposition-marque`
   - abandon ou changement de signe.

`clearance-marque` ne reste qu'un alias de compatibilite historique. Ce n'est
plus la voie normale a proposer.

## Ce skill ne fait pas

- Ne redige pas une opinion de disponibilite.
- Ne fait pas un depot.
- Ne remplace pas une recherche professionnelle exhaustive.
- Ne fait pas une analyse contradictoire complete d'opposition.
- Ne maintient pas un hub portefeuille.

## Contrat d'entree V2

Le skill doit expliciter ou deriver les dimensions suivantes :

- `mark_type`: `word`, `figurative`, `composite`, `semi-figurative`, `unknown`
- `filing_intent`: `exploratory`, `pre-filing`, `pre-launch`,
  `portfolio-extension`, `reactive-check`
- `territory_scope`: `fr`, `eu`, `fr-eu`, `international-subset`, `unknown`
- `goods_services_scope`: `known-classes`, `described-only`, `mixed`,
  `unclear`
- `adjacent_families_status`: `pending-confirmation`, `confirmed`, `not-run`,
  `insufficient-input`

Bloc de faits a exposer explicitement :

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

- le role utilisateur ;
- les juridictions par defaut ;
- les integrations disponibles ;
- la posture de prudence.

Si le profil contient `[A CONFIGURER]`, surfacer explicitement le mode
provisoire. Le skill peut tourner avec des hypotheses generiques, mais chaque
sortie doit etre taggee `[PROVISOIRE]`.

## Intake

Demander en un seul batch, puis mapper la reponse au contrat V2 :

1. signe propose, texte exact, stylisation eventuelle, type apparent ;
2. produits ou services reels ;
3. classes Nice si deja connues ;
4. territoires vises ;
5. apparence en marche ;
6. noms relies deja connus ;
7. limites de recherche deja identifiees.

Guidance de mapping minimale :

- mot seul -> `mark_type: word`
- logo ou element graphique dominant -> `mark_type: figurative`
- signe texte + logo -> `mark_type: composite`
- signe mixte mais qualification visuelle encore floue -> `mark_type: semi-figurative`
- classes deja donnees -> `goods_services_scope: known-classes`
- simple description business -> `goods_services_scope: described-only`
- classes partielles + description libre -> `goods_services_scope: mixed`
- description trop vague -> `goods_services_scope: unclear`
- FR seul -> `territory_scope: fr`
- EU seul -> `territory_scope: eu`
- FR + EU -> `territory_scope: fr-eu`
- Madrid ou liste de pays ciblee -> `territory_scope: international-subset`

Si la description reste vague, pousser une fois pour obtenir une description
concrete du produit ou service. Si l'information reste insuffisante, marquer
`goods_services_scope: unclear` et reduire la confiance.

## Couche 1 - Motifs absolus

Le knockout `L.711-2 CPI` reste obligatoire avant toute conclusion de triage.

Le resultat du knockout ne doit pas etre un tableau plat de pass/fail. Pour
chaque motif pertinent, produire soit :

- aucun probleme identifie ;
- soit un flag motive et concret.

Motifs minimaux a passer en revue :

- caractere distinctif insuffisant ;
- descriptif ;
- devenu usuel ;
- forme imposee si le signe releve d'une forme ;
- atteinte a l'ordre public ou a des signes proteges ;
- trompeur.

## Couche 2 - Search Coverage

Avant de commenter les conflits, decrire explicitement la couverture reelle :

- bases interrogees ;
- classes couvertes ;
- territoires couverts ;
- type de recherche : exacte, proche, phonetique, partielle ;
- statut du balayage des familles adjacentes ;
- limitations restantes.

### Integrations et degrade controle

Si des connecteurs sont disponibles, attribuer chaque resultat a sa source.
Si une integration manque, le dire explicitement.

Si aucune base n'est interrogee, ecrire litteralement dans la sortie :

> **Aucune base de donnees interrogee.** Ce triage n'a pas hit Data INPI,
> EUIPO TMview, OMPI ROMARIN, base-jurisprudence INPI, ni aucune source non
> enregistree. Une recherche complete sur ces bases est requise avant toute
> conclusion sur la disponibilite.

Puis continuer avec un triage degrade, en restant honnete sur les limites.

## Couche 3 - Marques proches

L'objectif est de trouver des marques anterieures potentiellement pertinentes,
pas de trancher la confusion.

Pour chaque marque proche trouvee ou fournie, capturer si possible :

- signe ;
- source ;
- classes / designation produits-services ;
- titulaire ;
- statut ;
- date de depot si disponible ;
- note sur la raison du signalement.

Pas de supplementation silencieuse. Si une date, un numero ou un statut n'est
pas present dans la source, l'ecrire comme indisponible plutot que le deviner.

## Couche 4 - Balayage des familles adjacentes

Le balayage des familles adjacentes est requis avant de conclure.

Si l'utilisateur n'a pas confirme la liste, exposer
`adjacent_families_status: pending-confirmation` ou `insufficient-input`, et
reduire la confiance du triage.

Le skill doit :

1. proposer 3 a 5 familles adjacentes plausibles ;
2. demander confirmation ou complement ;
3. rejouer la recherche sur les familles confirmees si les integrations le
   permettent ;
4. sinon, reporter explicitement ces familles comme couverture manquante a
   traiter en recherche professionnelle.

Le statut de cette couche doit toujours etre visible :

- `pending-confirmation`
- `confirmed`
- `not-run`
- `insufficient-input`

## Couche 5 - Signaux de confusion FR / UE

Cadre applicable : appreciation globale CJUE, pas de test multi-facteurs US.

Analyser comme signaux, pas comme verdict :

- similitude des signes ;
- similitude des produits/services ;
- pouvoir distinctif de la marque anterieure ;
- public concerne et niveau d'attention ;
- interdendance des facteurs.

Regles de prudence :

- ne jamais conclure "absence de risque de confusion" ;
- si les facteurs sont ambigus, le dire ;
- si la couverture est incomplete, reduire la portee de toute recommandation.

## Routing Boundaries

### Route to `depot-marque-fr`

- pas de blocage majeur evident au premier passage ;
- couverture minimale exploitable pour preparer un depot ;
- validation humaine encore obligatoire avant depot.

### Route to `surveillance-marque`

- signe deja exploite ou en veille active ;
- besoin principal = suivi des publications ou monitorage ;
- pas d'escalade immediate plus utile qu'un suivi structure.

### Route to `analyse-opposition-marque`

- conflit proche emerge ;
- comparaison contradictoire plus fine requise ;
- produits/services, priorites ou strategie doivent etre approfondis.

### Route to `clearance-marque`

- uniquement pour compatibilite historique ;
- si un ancien workflow l'appelle encore ;
- a presenter comme redirection, pas comme workflow de meme rang.

### Stay in `recherche-anteriorite-marque`

- besoin principal = premier passage strict ;
- motifs absolus, couverture et conflits proches restent la question centrale ;
- le dossier n'est pas encore dans un workflow depot, opposition ou surveillance
  plus specialise.

## Contrat de sortie V2

La sortie doit produire exactement les huit blocs suivants, dans cet ordre :

1. `Absolute Grounds Snapshot`
2. `Search Coverage`
3. `Closest Conflicts`
4. `Adjacent Family Sweep`
5. `Confusion Risk Signals`
6. `Uncertainty and Missing Coverage`
7. `Next Step Routing`
8. `Human Validation`

### 1. `Absolute Grounds Snapshot`

- rappeler les motifs absolus revus ;
- signaler chaque flag motive ;
- ne pas ecrire un simple tableau uniforme de "pass".

### 2. `Search Coverage`

- bases interrogees ;
- classes et territoires couverts ;
- type de recherche ;
- statut du balayage adjacent ;
- limitations explicites.

### 3. `Closest Conflicts`

- lister les marques les plus proches ;
- rattacher chaque entree a sa source ;
- dire pourquoi elle compte dans ce premier passage.

### 4. `Adjacent Family Sweep`

- lister les familles proposees ;
- indiquer si elles ont ete confirmees ;
- dire si elles ont ete rejouees ou non ;
- exposer `adjacent_families_status`.

### 5. `Confusion Risk Signals`

- presenter les facteurs FR/UE comme signaux ;
- distinguer ce qui pese vers le conflit, contre le conflit, ou reste mixte ;
- ne pas rendre un verdict final de disponibilite.

### 6. `Uncertainty and Missing Coverage`

- trous de donnees ;
- bases non interrogees ;
- limites de territoire, classes, variantes, phonétique, figuratif ou familles
  adjacentes ;
- impact pratique de chaque manque.

### 7. `Next Step Routing`

Ce bloc doit utiliser uniquement l'une des valeurs suivantes :

- `proceed-to-professional-clearance`
- `prepare-filing`
- `monitor-before-filing`
- `prepare-opposition-risk-review`
- `insufficient-search-coverage`
- `abandon-or-rename`

Associer la valeur choisie a 2-4 actions concretes et a sa justification.

### 8. `Human Validation`

- rappeler qu'il s'agit d'un premier passage ;
- nommer les validations humaines requises ;
- rappeler les points `[a verifier]` avant depot, adoption ou investissement.

## Regles de surete

- Ce skill ne conclut jamais qu'une marque est disponible.
- Une base non interrogee reste une lacune, pas une absence de conflit.
- Une famille adjacente non confirmee ou non rejouee doit etre visible.
- Une recherche degradee sans connecteur reste permise, mais doit etre marquee
  comme telle.
- Les numeros, dates, statuts et classes doivent etre relies a une source
  ouvrable avant d'etre cites comme appui.

## Rappel final a conserver

- premier passage uniquement ;
- jamais une opinion de disponibilite ;
- revue humaine obligatoire avant depot, adoption ou investissement marketing.
