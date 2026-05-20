---
name: recherche-anteriorite-dm
description: >
  Premier passage strict de disponibilite D&M avant depot ou en signal inverse
  borne, centre sur les registres, la divulgation anterieure, la proximite
  visuelle et les risques nouveaute / caractere individuel. Brouillon soumis a
  validation humaine finale.
version: "2.0.0"
argument-hint: "[filing-clearance|reverse-nullity-signal]"
authors: ["Hacienda"]
tags:
  [
    dessins-modeles,
    anteriorite,
    nouveaute,
    caractere-individuel,
    Locarno,
    INPI,
    EUIPO,
    prior-art,
    V2,
  ]
---

# Skill - Recherche d'anteriorite dessins et modeles V2

> **PREMIER PASSAGE DE DISPONIBILITE, PAS CLEARANCE JURIDIQUE FINALE.**
>
> `recherche-anteriorite-dm` V2 sert a cadrer un premier passage strict
> d'anteriorites avant depot d'un dessin ou modele, ou a faire remonter un
> signal borne d'anteriorite destructrice plausible contre un titre adverse.
> La recherche reste non exhaustive et la sortie demeure un brouillon soumis a
> validation humaine.

Reference de travail utile :
`references/recherche-anteriorite-dm-routing-and-output.md`

## Role strict

Le skill :

- verifie en premier passage la disponibilite apparente d'un dessin ou modele ;
- structure la recherche autour d'un minimum registres, d'extensions open web
  et d'un scan sectoriel renforce si utile ;
- centre l'analyse sur la date, la classe, la proximite visuelle, la
  nouveaute, le caractere individuel et la liberte du createur ;
- borne `reverse-nullity-signal` a un usage secondaire de signalement ;
- route vers `depot-dessin-modele` ou `contrefacon-dessin-modele` quand la
  question dominante sort du premier passage.

Le skill ne fait pas :

- une clearance juridique finale ou une opinion de validite definitive ;
- le depot effectif d'un dessin ou modele ;
- une analyse principale de contrefacon ;
- une recherche presentee comme exhaustive ;
- une substitution a la validation finale d'un avocat, juriste ou mandataire.

## Positionnement V2

### Branche principale `filing-clearance`

`filing-clearance` est la branche normale du skill. Elle sert a :

- verifier si un depot envisage dispose d'une base minimale de disponibilite ;
- identifier les anteriorites les plus proches et les trous de couverture ;
- decider s'il faut preparer le depot, elargir la recherche ou ajuster le
  design avant la suite.

### Branche secondaire `reverse-nullity-signal`

`reverse-nullity-signal` reste strictement bornee. Elle sert seulement a :

- signaler une anteriorite plausible contre un titre adverse ;
- identifier la preuve qu'il faut securiser en priorite ;
- preparer un reroutage vers `contrefacon-dessin-modele` si la situation
  devient adversariale.

Cette branche ne transforme pas le skill en memo complet de nullite ou en
strategie contentieuse autonome.

## Sources et garde-fous

- Prioriser `hacienda-sources-officielles` pour les sources primaires et les
  references officielles.
- Toute source non consultee reste marquee `[a verifier]`.
- Toute information incomplete doit conserver les marqueurs
  `[PROVISOIRE]`, `[a verifier]`, `[A COMPLETER]`.
- Distinguer clairement faits, droit, analyse, incertitudes, decisions et
  validation humaine.
- Rappeler qu'une recherche D&M ne couvre jamais de facon certaine toutes les
  divulgations non enregistrees ou non indexees.

## Chargement du profil

Charger si disponible :

- secteurs clients dominants et sensibilite design ;
- preferences de couverture territoriale ;
- habitudes de validation humaine ;
- tolerances internes en matiere de risque visuel et de delai de depot.

Si le profil est absent ou partiel, maintenir les hypotheses visibles avec
`[PROVISOIRE]`.

## Contrat d'entree V2

### Closed intake contract

- `research_mode`: `filing-clearance` | `reverse-nullity-signal`
- `territory_scope`: `fr` | `eu` | `international` | `mixed`
- `design_visibility_status`: `new` | `possibly-disclosed` |
  `already-disclosed` | `uncertain`
- `locarno_status`: `clear` | `mixed` | `uncertain`
- `search_coverage_target`: `registers-minimum` |
  `registers-plus-open-web` | `enhanced-sector-scan`
- `evidence_posture`: `strong` | `mixed` | `weak` | `blocked`

### Minimum Fact Set

Ne jamais presenter la sortie comme exploitable sans au moins :

- design cible clairement decrit ;
- visuels ou descriptions comparables disponibles ;
- produit ou gamme de produits vises ;
- territoire de recherche vise ;
- date de depot envisagee, de priorite ou date pivot de comparaison ;
- statut de divulgation du design cible ;
- classe Locarno connue, mixte ou incertaine ;
- objectif principal : disponibilite avant depot ou signal inverse borne ;
- sources effectivement consultees et date de consultation.

Selon le mode, ajouter si disponible :

- en `filing-clearance` : deposant, createur, contexte de depot, arbitrage
  territorial ;
- en `reverse-nullity-signal` : titre adverse vise, titulaire adverse,
  date de depot / publication adverse, element de preuve de l'anteriorite
  invoquee.

Tout manque reste `[a verifier]`.

## Prior Art Readiness Gate

Le skill doit conclure sur une seule valeur :

- `ready`
- `partial`
- `blocked`

### `ready`

Le dossier permet un premier passage exploitable de disponibilite avec
couverture et base factuelle suffisantes pour orienter la suite, sous reserve
de validation humaine finale.

### `partial`

Le dossier permet un brouillon structure, mais avec angles morts ou donnees
fragiles. Dans ce cas, conserver visiblement :

- `[PROVISOIRE]`
- `[a verifier]`
- `[A COMPLETER]`

Cas frequents :

- visuels partiels ;
- Locarno mixte ou incertain ;
- date pivot imparfaitement securisee ;
- open web ou scan sectoriel non encore faits ;
- preuve de divulgation anterieure seulement partielle.

### `blocked`

Bloquer le skill si :

- le design cible n'est pas identifiable ;
- aucun visuel ou description exploitable ne permet une comparaison serieuse ;
- la date pivot pertinente ne peut pas etre etablie ;
- aucune source effectivement consultee et datee ne peut etre documentee ;
- la posture de divulgation est trop incertaine pour cadrer la recherche ;
- aucune hypothese Locarno raisonnable ne peut etre determinee ;
- la base minimale registres n'a pas ete consultee alors qu'elle est requise ;
- en `reverse-nullity-signal`, aucune anteriorite plausible ni preuve minimale
  a securiser ne peut etre decrite.

En `blocked`, ne pas simuler une conclusion de disponibilite. Sortir en
`hold-insufficient-basis`.

## Frontieres de routage

### Route to `depot-dessin-modele`

Basculer si la disponibilite apparente est suffisamment clarifiee et que le
besoin principal devient :

- la preparation du dossier de depot ;
- l'arbitrage FR / UE / La Haye / sequence ;
- les reproductions, la priorite ou la publication.

### Route to `contrefacon-dessin-modele`

Basculer si la question dominante devient :

- une attaque ou defense contre un titre adverse ;
- une comparaison de contrefacon au fond ;
- une preuve a securiser en posture adversariale ;
- une reaction precontentieuse ou contentieuse.

### Stay in `recherche-anteriorite-dm`

Rester dans ce skill si le besoin principal est encore :

- la disponibilite avant depot ;
- l'identification d'anteriorites proches ;
- la couverture de recherche insuffisante ;
- le signal borne d'une nullite plausible par art anterieur.

## Source coverage V2

### 1. Registers minimum

Minimum attendu sauf impossibilite documentee :

- INPI dessins et modeles pour le registre francais ;
- EUIPO DesignView ou base equivalente pour les dessins et modeles de l'UE et
  registres relies ;
- OMPI / Hague Express ou base OMPI design pertinente quand le perimetre
  international ou mixte le justifie.

Objectif :

- capter les enregistrements publies les plus proches ;
- verifier les dates utiles ;
- rattacher quand possible la classe Locarno et le territoire.

### 2. Open web complements

A activer si `search_coverage_target` atteint au moins
`registers-plus-open-web` :

- sites marchands ;
- catalogues en ligne ;
- resultats image et recherche web ouverte ;
- communiques, portfolios, reseaux sociaux, pages produit datees si elles
  servent a documenter une divulgation.

Objectif :

- completer les registres ;
- faire remonter des divulgations non enregistrees ou non captees ;
- signaler toute source restant fragile ou difficilement datee.

### 3. Enhanced sector scan

A activer si `search_coverage_target` = `enhanced-sector-scan` :

- bases sectorielles ;
- salons, catalogues professionnels, archives de marque ;
- marketplaces specialisees ou sources de secteur documentees.

Objectif :

- renforcer la recherche la ou la probabilite de divulgations hors registre est
  significative ;
- mieux apprecier la liberte du createur dans le secteur ;
- documenter les limites si le scan n'a pas pu etre mene.

## Axes d'analyse stables

### 1. Search framing

Toujours expliciter :

- mode de recherche ;
- territoire ;
- date pivot ;
- niveau de couverture vise ;
- posture de preuve.

### 2. Closest prior art mapping

Pour chaque resultat proche, rendre visibles :

- source ;
- date ;
- classe ou secteur ;
- pertinence ;
- description breve ;
- proximite visuelle ;
- impression globale ;
- impact potentiel sur la nouveaute ;
- impact potentiel sur le caractere individuel ;
- enseignement sur la liberte du createur.

### 3. Novelty baseline

Identifier si une anteriorite parait :

- identique ;
- quasi identique ;
- proche sans destruction evidente ;
- trop eloignee ou incertaine.

### 4. Individual character baseline

Comparer l'impression globale sur l'utilisateur averti en tenant compte :

- des similitudes dominantes ;
- des differences perceptibles ;
- du niveau de contrainte du secteur ;
- du fait que de petites differences pesent davantage si la liberte du
  createur est etroite.

### 5. Coverage limits

Toujours dire ce qui manque encore :

- registres non consultes ;
- recherche open web non faite ;
- scan sectoriel non fait ;
- datation fragile ;
- visuels insuffisants ;
- angle mort sur `DMCNE` ou divulgations hors index.

## Findings framing

Les findings doivent etre presentes autour de :

- `source`
- `date`
- `class`
- `visual proximity`
- `novelty risk`
- `individual character risk`
- `creator freedom`

Ne jamais reduire l'analyse a une simple liste de ressemblances descriptives.

## Decision Routing ferme

La sortie doit se terminer par une seule route principale :

- `prepare-filing`
- `prepare-filing-with-caution`
- `hold-for-design-adjustment`
- `hold-for-expanded-search`
- `signal-reverse-nullity-posture`
- `route-to-design-infringement-analysis`
- `hold-insufficient-basis`

## Sortie V2 stable

Produire exactement les 9 blocs suivants :

1. `Case Snapshot`
2. `Prior Art Readiness Gate`
3. `Search Scope And Sources`
4. `Closest Prior Art Findings`
5. `Novelty Risk`
6. `Individual Character Risk`
7. `Coverage Limits And Unknowns`
8. `Decision Routing`
9. `Human Validation`

## Format de sortie

```markdown
# Revue disponibilite D&M - [NOM DOSSIER]

*Brouillon de premier passage. Recherche non exhaustive. Validation humaine
finale requise.*

## 1. Case Snapshot
- Mode : `filing-clearance|reverse-nullity-signal`
- Faits : [design, produit, territoire, date pivot]
- Statuts fermes : [visibilite, Locarno, couverture cible, posture de preuve]
- Analyse breve : [...]

## 2. Prior Art Readiness Gate
- Gate : `ready|partial|blocked`
- Motifs : [...]
- Effet : [ce que la sortie permet ou non]

## 3. Search Scope And Sources
- Registers minimum : [...]
- Open web complements : [...]
- Enhanced sector scan : [...]
- Suffisance de couverture : [pourquoi la couverture est suffisante ou
  insuffisante pour une conclusion prudente]
- Sources non consultees : `[a verifier]`

## 4. Closest Prior Art Findings
### Finding 1 - [source / reference]
- Source : [...]
- Date : [...]
- Class : [...]
- Pertinence : [...]
- Visual proximity : `high|medium|low|unclear`
- Impression globale : [...]
- Novelty risk : `high|medium|low|unclear`
- Individual character risk : `high|medium|low|unclear`
- Creator freedom : `narrow|medium|wide|unclear`
- Notes : [...]

## 5. Novelty Risk
- Baseline : [...]
- Art destructeur plausible : [...]
- Points de rupture ou de difference : [...]

## 6. Individual Character Risk
- Impression globale : [...]
- Similarites dominantes : [...]
- Differences notables : [...]
- Utilisateur averti / secteur : [...]
- Liberte du createur : [...]

## 7. Coverage Limits And Unknowns
- Limites : [...]
- Unknowns : [...]
- Rappels recurrents : [DMCNE ; salons / catalogues / reseaux sociaux /
  marketplaces ; limites de recherche visuelle ; limites de terminologie /
  classification]
- Marqueurs : `[PROVISOIRE]` / `[a verifier]` / `[A COMPLETER]`

## 8. Decision Routing
- Route unique : `...`
- Motif : [...]
- Skill suivant : [...]

## 9. Human Validation
- Validation requise : avocat / juriste / mandataire
- Points a confirmer : [...]
- Decision finale humaine attendue : [...]
```

## Discipline d'execution

1. Qualifier le dossier avec le closed intake contract.
2. Verifier le minimum fact set.
3. Poser le `Prior Art Readiness Gate`.
4. Rendre visible la couverture `registers minimum`, puis les complements.
5. Structurer les findings par source, date, classe et proximite visuelle.
6. Distinguer `Novelty Risk` et `Individual Character Risk`.
7. Sortir une seule route du `Decision Routing`.
8. Clore par `Human Validation`.

## Cas de reroutage prioritaire

- disponibilite globalement rassurante mais dossier de depot a preparer :
  `prepare-filing` -> `depot-dessin-modele`
- disponibilite exploitable mais avec points de prudence :
  `prepare-filing-with-caution` -> `depot-dessin-modele`
- design a retoucher avant suite : `hold-for-design-adjustment`
- couverture trop mince ou angles morts majeurs : `hold-for-expanded-search`
- signal d'art anterieur potentiellement destructeur contre un titre adverse :
  `signal-reverse-nullity-posture`
- dossier devenu adversarial ou demande de comparaison au fond :
  `route-to-design-infringement-analysis` -> `contrefacon-dessin-modele`
- base trop faible pour conclure : `hold-insufficient-basis`

## Ton

Technique, prudent, borne. Toujours rappeler que la recherche est non
exhaustive, que la sortie reste un brouillon de premier passage et qu'une
validation humaine finale reste necessaire avant depot, attaque ou defense.
