---
name: depot-dessin-modele
description: >
  Préparation stricte d'un brouillon de dossier de dépôt de dessin ou modèle
  enregistré, centré sur les voies `fr`, `eu`, `hague`, `sequenced`, avec
  `Seuil de préparation du dépôt`, sorties stabilisées et validation humaine finale.
version: "2.0.0"
argument-hint: "[fr|eu|hague|sequenced]"
authors: ["Hacienda"]
tags:
  [
    dessins-modèles,
    dépôt,
    INPI,
    EUIPO,
    La-Haye,
    Locarno,
    reproductions,
    V2,
  ]
---

# Skill — Dépôt dessin ou modèle V2

> **BROUILLON DE DOSSIER, PAS DÉPÔT EFFECTIF.**
>
> Ce skill prépare un brouillon de dossier de dépôt de dessin ou modèle
> enregistré. Il ne remplace ni la recherche d'antériorités, ni l'analyse de
> contrefaçon, ni le dépôt effectif devant l'office. Il ne transforme pas
> `DMCNE` en filing voie autonome.

## Examples

<example>
<user>/h-pi:depot-dessin-modele [fr|eu|hague|sequenced]</user>
<response>
Brouillon de travail structuré, avec faits, droit, analyse, incertitudes, sources consultées, points `[à vérifier]` et validation humaine obligatoire.
</response>
</example>

## Chargement du profil

Avant tout travail substantiel, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Si le profil est absent, incomplet ou contient `[A CONFIGURER]`, demander `/h-pi:entretien-demarrage` et garder les marqueurs `[à vérifier]` visibles.

Charger si disponible :

- préférences d'office et de territoire ;
- secteur dominant du client ;
- politique habituelle de priorité et d'ajournement ;
- circuit de validation humaine.

## Intake

Identifier au minimum : demande, actif ou droit concerné, parties, territoire, dates utiles, documents disponibles, source officielle à consulter, urgence, sortie attendue et niveau de validation humaine requis.

## Gate non-juriste

Si l'utilisateur n'est pas juriste ou avocat, produire une explication opérationnelle, signaler les limites, refuser toute conclusion présentée comme avis juridique final et demander validation par un professionnel habilité avant usage externe.

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Propriété Intellectuelle` est disponible. Ne pas inventer de tool hors périmètre ; si une source ou un registre n'a pas été consulté directement, garder `[à vérifier]`.

- Socle textes, jurisprudence et droit UE : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Dessins et modèles, droit d'auteur, logiciels, bases de données et droits voisins : utiliser le socle officiel ci-dessus ; les registres spécialisés non exposés par le serveur restent `[à vérifier]` ou traités via preuve/document client autorisé.
- Anno, quand disponible, reste une source interne de dossier : jamais un registre officiel INPI, EUIPO, OEB, OMPI ou BOPI.

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/` ou `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`.

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

## Rôle strict

Le skill :

- prépare un dossier de dépôt de dessin ou modèle enregistré ;
- reste borné aux voies `fr`, `eu`, `hague`, `sequenced` ;
- applique un `Seuil de préparation du dépôt` avant toute sortie exploitable ;
- garde `DMCNE` uniquement comme signal ou solution de repli secondaire borné ;
- produit un brouillon soumis à validation humaine par avocat, juriste ou
  mandataire.

Le skill ne fait pas :

- la recherche d'antériorités au fond ;
- l'analyse de contrefaçon D&M ;
- le dépôt effectif auprès de l'INPI, de l'EUIPO ou de l'OMPI ;
- un mémo autonome sur le DMCNE ;
- une validation juridique finale.

## Sources et garde-fous

- Prioriser `hacienda-sources-officielles` pour les exigences d'office, taxes,
  formulaires et références officielles.
- Toute source non consultée reste marquée `[à vérifier]`.
- Distinguer faits, droit, analyse, incertitudes, décisions et validation
  humaine.
- Si le dossier est incomplet, conserver les marqueurs `[PROVISOIRE]`,
  `[à vérifier]`, `[À COMPLÉTER]`.
- Mettre les reproductions au centre du risque de qualité.

## Garde-fous doctrinaux

### G32 — Gate `blocked` sur divulgation future programmée

Avant tout calendrier de dépôt, vérifier si une divulgation publique est **programmée** dans les semaines à venir : showroom presse, lookbook, salon professionnel, Fashion Week, conférence produit, publication marketing, mise en vente, démonstration investisseur, etc.

Si une divulgation est programmée :

- le dépôt **DOIT être effectué AVANT la date de divulgation programmée** ;
- bloquer le workflow (`Seuil de préparation du dépôt` = `blocked` avec motif « divulgation programmée non précédée d'un dépôt ») tant que le dépôt n'est pas planifié antérieurement à la divulgation ;
- **ne PAS utiliser le délai de grâce 12 mois comme stratégie de couverture** (cf. G33).

### G33 — Délai de grâce 12 mois (Art. 7 §2 RDMC, Art. L.511-6 al.6 CPI) — caractère défensif

- **Art. 7 §2 RDMC** (Règlement 6/2002 sur les D&M communautaires) : un délai de grâce de **12 mois précédant la date de dépôt** neutralise, au regard de la nouveauté et du caractère individuel, les divulgations faites par le créateur ou son ayant cause (ou par un tiers sur la base d'informations fournies par eux).
- **Art. L.511-6 al.6 CPI** : régime français équivalent pour les dépôts INPI.

**Le délai de grâce est défensif, pas stratégique** : il protège contre l'invalidation par antériorité lorsque la divulgation a déjà eu lieu, mais il **n'autorise pas à divulguer avant de déposer**. Une divulgation faite par le créateur entre toujours dans l'état de l'art au regard des oppositions tierces sur la nouveauté hors UE, et fragilise la priorité internationale (notamment La Haye, désignations hors UE).

**Action attendue** : déposer AVANT la divulgation programmée. Si dépôt tardif sur un design déjà divulgué, invoquer le délai de grâce **uniquement en posture défensive**, et signaler `[review]` pour validation humaine.

### G34 — Règle EUIPO « 1 classe Locarno = 1 DMC »

Dans un dépôt multi-modèles DMC (Design Communautaire EUIPO) : **une seule classe Locarno par dépôt**, sauf accessoires inhérents au produit principal.

Conséquence pratique :

- une collection couvrant plusieurs classes Locarno (par exemple 02-01 vêtements + 02-04 chaussures + 03-01 sacs) nécessite **plusieurs dépôts DMC distincts**, un par classe Locarno ;
- les taxes EUIPO sont multipliées par le nombre de dépôts ; anticiper dans `Fees And Filing Mechanics` ;
- **non applicable** au dépôt INPI national multi-modèles français, qui n'impose pas cette contrainte.

Signaler dans `Decision Routing` si la voie `eu` est retenue sur une collection multi-classes : prévoir un dépôt par classe Locarno.

### G35 — Qualité déposant et représentation (L.422-4 / R.512-2 CPI / Art. 78 RDMC)

- **INPI national** : un titulaire (personne physique ou morale) domicilié en France ou dans l'EEE peut déposer **directement sans mandataire** (CPI R.512-2). Mandataire requis si le titulaire n'est pas domicilié dans l'EEE.
- **DMC EUIPO** : si le titulaire est domicilié dans l'Union européenne, dépôt direct possible (Art. 78 RDMC). Sinon, mandataire EUIPO inscrit obligatoire.
- **CPI L.422-4** : qualité de mandataire en marques (par extension D&M devant l'INPI) — inscription obligatoire au registre INPI pour les actes accomplis pour un tiers à titre habituel.
- **Recommandation pratique** : mandataire spécialisé recommandé pour la rédaction des reproductions, la stratégie multi-territoire et multi-modèles, indépendamment de toute obligation formelle.

### G36 — RGPD et droit à l'image des mannequins dans les reproductions

Si les reproductions D&M comportent des **mannequins humains identifiables**, deux régimes parallèles s'appliquent :

- **Droit à l'image** des mannequins : autorisations écrites obligatoires (loi 1881 ; jurisprudence Cass. 1re civ. constante) ;
- **RGPD** si traitement des images sur des bases telles que partage avec EUIPO, archivage long terme, exploitation marketing : information, finalité, base légale.

**Recommandation pratique** : préférer des reproductions techniques (mannequin / buste sans visage identifiable, prise de vue produit isolé sur fond neutre) pour le dépôt + jeu séparé avec mannequins pour la communication marketing. Signaler dans `Reproductions And Visual Scope` si les visuels fournis contiennent des mannequins identifiables.

### G37 — Ajournement asymétrique par modèle

L'**ajournement de publication** (jusqu'à 30 mois — Art. 50 RDMC pour DMC ; règle équivalente INPI) peut être appliqué **modèle par modèle** dans un même dépôt multi-modèles.

Cas d'usage : une collection peut être déposée intégralement, avec ajournement **asymétrique** :

- publication immédiate des modèles déjà annoncés publiquement (par exemple modèles du lookbook public) ;
- ajournement des modèles encore confidentiels (par exemple modèles présentés à Fashion Week 3 mois plus tard).

Flexibilité stratégique utile, peu connue dans la pratique. Signaler dans `Priority And Publication Strategy` quand le dépôt est `multiple` et que l'état de divulgation diffère entre modèles.

### G38 — Plan chronologique multi-sprints (collections complexes)

Pour les collections complexes (10+ modèles, plusieurs classes Locarno, divulgations programmées), structurer la recommandation finale dans `Validation humaine` en **sprints chronologiques** :

- **Sprint 1** : audit antériorités + ajustement modèles + arbitrage Locarno ;
- **Sprint 2** : dépôts FR INPI + dépôts DMC EUIPO (un par classe Locarno cf. G34) ;
- **Sprint 3** : confirmation pré-divulgation, vérification dates de dépôt vs calendrier de divulgation.

Recommandation activée uniquement si la complexité le justifie ; pour un dépôt simple ou unitaire, conserver le format `Validation humaine` standard.

## Contrat d'entrée V2

### Closed cadrage initial contract

- `filing_lane`: `fr` | `eu` | `hague` | `sequenced`
- `design_status`: `new` | `possibly-disclosed` | `already-disclosed` | `uncertain`
- `filing_scope`: `single` | `multiple`
- `priority_status`: `none` | `available` | `expiring` | `lost`
- `publication_strategy`: `immediate` | `deferred` | `undecided`
- `visual_readiness`: `complete` | `partial` | `weak` | `blocked`
- `classification_status`: `clear` | `mixed` | `uncertain`

### Faits minimums

Ne jamais présenter le dossier comme prêt au dépôt si manquent :

- design ou série de designs visée ;
- visuels disponibles ;
- produit ou indication produit ;
- déposant ;
- créateur ;
- territoire visé ;
- posture simple ou multiple ;
- priorité oui/non et date si invoquée ;
- choix ou état d'ajournement.

## Seuil de préparation du dépôt

Le skill doit qualifier le dossier avec une seule valeur :

- `ready`
- `partial`
- `blocked`

### `ready`

Le dossier permet un brouillon de dépôt exploitable, sous réserve de validation
humaine finale.

### `partial`

Le dossier permet un brouillon structuré, mais des briques restent à compléter :

- vues manquantes ;
- Locarno incertain ;
- priorité non sécurisée ;
- ajournement non arbitré ;
- dépôt multiple à rationaliser.

Dans ce cas, maintenir visiblement :

- `[PROVISOIRE]`
- `[à vérifier]`
- `[À COMPLÉTER]`

### `blocked`

Bloquer le skill si :

- reproductions insuffisantes ;
- Locarno trop incertain ;
- déposant ou créateur mal identifiés ;
- nouveauté possiblement détruite sans clarification ;
- priorité mal documentée ;
- dépôt multiple incohérent.

## Frontieres obligatoires

### Router vers `recherche-anteriorite-dm`

Basculer si le vrai point dominant devient :

- la robustesse de la nouveauté ;
- la divulgation antérieure ;
- le caractère individuel ;
- la recherche d'antériorités manquante.

### Router vers `contrefacon-dessin-modele`

Basculer si la question devient surtout :

- l'impression globale entre titres ou produits compares ;
- des actes argués de reproduction, offre, commercialisation ou importation ;
- une posture défensive ou contentieuse ;
- un besoin de preuve ou de reaction aval.

### Rester dans `depot-dessin-modele`

Rester dans ce skill si le sujet principal est la préparation d'un dépôt
enregistré, même si la priorité, l'ajournement, les taxes ou le sequencing
restent à arbitrer.

## Structure de voie

### `fr`

Utiliser pour un dépôt français auprès de l'INPI quand le besoin principal
reste France et que la structure du dossier peut être portée par un dépôt
national.

Points à traiter :

- produit et indication produit en français ;
- créateur correctement désigné ;
- cohérence du simple ou multiple ;
- compatibilité des reproductions avec les exigences INPI ;
- publication immédiate ou différée selon la stratégie retenue.

### `eu`

Utiliser pour un dépôt auprès de l'EUIPO quand la protection ciblee est
l'Union europeenne.

Points à traiter :

- cohérence des dessins dans un multiple ;
- qualification de la publication immédiate ou différée ;
- dépendance des taxes au nombre de dessins ;
- risque de divulgation déjà intervenue en UE ou hors UE ;
- articulation avec une éventuelle priorité encore disponible.

### `hague`

Utiliser pour une trajectoire OMPI / systeme de La Haye quand plusieurs
désignations internationales sont visées.

Points à traiter :

- liste des désignations ;
- dépendance du coût à la désignation ;
- vérification des exigences de representation et de publication ;
- articulation avec une priorité et avec une désignation UE éventuelle ;
- validation humaine renforcee en cas de divergences de périmètre.

### `sequenced`

Utiliser pour une stratégie sequentielle, par exemple FR puis extension UE ou
internationale, lorsque la priorité reste tactiquement utile.

Points à traiter :

- premier dépôt ou dépôt source ;
- date de priorité, délai restant, risque d'expiration ;
- ordre des dépôts à venir ;
- cohérence entre le premier visuel, les reproductions ultérieures et le
  périmètre produit ;
- justification economique et territoriale du sequencing.

## Axes d'analyse stables

### 1. Sélection office et voie

Justifier le choix entre :

- `fr`
- `eu`
- `hague`
- `sequenced`

Expliquer en quelques lignes :

- le territoire utile ;
- la logique de sequencing si applicable ;
- les preconditions specifiques à l'office ;
- les points qui restent `[à vérifier]`.

### 2. Design And Product Definition

Rendre lisibles :

- le design ou la série de designs ;
- le produit ou l'indication produit ;
- la classe Locarno et son niveau de certitude ;
- la posture `single` ou `multiple` ;
- la cohérence interne du multiple.

### 3. Reproductions et périmètre visuel

Traiter en priorité :

- nombre et qualité des vues ;
- cohérence visuelle entre vues ;
- parties revendiquees / non revendiquees ;
- suffisance des reproductions pour définir l'étendue du titre ;
- travaux visuels encore nécessaires.

### 4. Priorité et stratégie de publication

Toujours traiter :

- priorité oui/non ;
- délai restant ou perte de priorité ;
- publication immédiate ou différée ;
- intérêt de l'ajournement ;
- effet de la divulgation déjà intervenue.

### 5. Taxes et mécanique de dépôt

Toujours rendre visibles :

- taxes attendues ;
- dépendance au nombre de dessins ;
- dépendance à l'ajournement ;
- dépendance à l'office choisi ;
- tout montant ou bareme restant `[à vérifier]` si la source primaire n'a pas
  été consultée.

## Signal secondaire `DMCNE`

Le bloc `DMCNE` sert uniquement à signaler :

- une possible divulgation antérieure ;
- une possible posture résiduelle de dessin ou modèle communautaire non
  enregistré ;
- le besoin d'une analyse complémentaire aval.

`DMCNE` n'est jamais une voie de filing. Le coeur du skill reste le dépôt
enregistré.

## Routage de décision fermé

La sortie doit se terminer par une seule route principale :

- `prepare-fr-filing`
- `prepare-eu-filing`
- `prepare-hague-filing`
- `prepare-sequenced-filing`
- `hold-for-prior-art-review`
- `hold-for-visual-cleanup`
- `signal-unregistered-eu-design-posture`
- `hold-insufficient-basis`

## Sortie V2 stable

Produire exactement les 9 blocs suivants :

1. `Synthèse du dossier`
2. `Seuil de préparation du dépôt`
3. `Office et voie de dépôt`
4. `Design And Product Definition`
5. `Reproductions And Visual Scope`
6. `Priority And Publication Strategy`
7. `Fees And Filing Mechanics`
8. `Routage de décision`
9. `Validation humaine`

## Format de sortie

```markdown
# Dossier depot D&M — [NOM DOSSIER]

## 1. Synthèse du dossier
- Faits : [design, produit, territoire, deposant, createur]
- Droit : [base de depot et office cible]
- Analyse : [resume bref]
- Incertitudes : [points [à vérifier] ou [À COMPLÉTER]]

## 2. Filing Readiness Gate
- Gate : `ready|partial|blocked`
- Motifs : [liste courte]
- Effet : [ce qui peut ou ne peut pas etre produit]

## 3. Office et voie de dépôt
- Lane retenue : `fr|eu|hague|sequenced`
- Justification : [pourquoi cette lane]
- Alternatives ecartees : [si utile]

## 4. Design And Product Definition
- Produit / indication produit : [...]
- Locarno : `clear|mixed|uncertain`
- Scope : `single|multiple`
- Coherence du multiple : [...]

## 5. Reproductions And Visual Scope
- Etat visuel : `complete|partial|weak|blocked`
- Vues disponibles : [...]
- Parties revendiquees / non revendiquees : [...]
- Nettoyage visuel requis : [...]

## 6. Priority And Publication Strategy
- Priorite : `none|available|expiring|lost`
- Publication : `immediate|deferred|undecided`
- Divulgation / DMCNE : [...]
- Arbitrages requis : [...]

## 7. Fees And Filing Mechanics
- Office et mecanique de depot : [...]
- Taxes / barèmes : [source ou `[à vérifier]`]
- Points operatoires : [...]

## 8. Decision Routing
- Route unique : `...`
- Motif : [...]
- Routage adjacent : [si orientation vers skill voisin]

## 9. Human Validation
- Validation requise : avocat / juriste / mandataire
- Points à confirmer : [...]
- Decision finale humaine attendue : [...]
```

## Exécution discipline

1. Qualifier le dossier avec le closed cadrage initial contract.
2. Déterminer le `Seuil de préparation du dépôt`.
3. Choisir une seule voie principale.
4. Traiter les cinq axes d'analyse stables.
5. Signaler `DMCNE` seulement si pertinent.
6. Sortir une route unique du `Routage de décision`.
7. Clore par `Validation humaine`.

## Cas de reroutage prioritaire

- dossier centré sur nouveauté / caractère individuel incertains :
  `hold-for-prior-art-review` puis `recherche-anteriorite-dm`
- dossier centré sur visuels inutilisables : `hold-for-visual-cleanup`
- dossier déjà divulgué avec posture UE résiduelle possible :
  `signal-unregistered-eu-design-posture`
- dossier insuffisant ou incohérent : `hold-insufficient-basis`

## Niveaux de criticité

Échelle canonique appliquée à toute appréciation subjective de ce skill :

| Niveau | Icône | Signification dans le contexte de ce skill |
|---|---|---|
| Faible | 🟢 | Dossier prêt : délais respectés, reproductions normalisées (vues suffisantes, fonds neutres), stratégie d'ajournement tranchée, périmètre Locarno cohérent. |
| Moyen | 🟡 | Décision d'ajournement de publication non arrêtée alors qu'elle protégerait un lancement commercial, ou périmètre territorial non tranché. |
| Élevé | 🟠 | Arbitrage portée multi-vues vs coût non tranché, qualité de reproductions à la limite, ou choix office (INPI vs DMC EUIPO vs La Haye) non sécurisé. |
| Bloquant | 🔴 | Divulgation préalable hors délai de grâce (> 12 mois avant dépôt) entraînant perte de nouveauté, ou reproductions non conformes ne caractérisant pas la portée de protection : dépôt à reporter ou réorienter. |

Plancher cross-skill (CLAUDE.md §4) : ce skill ne peut pas dégrader silencieusement une cote 🔴 amont (par exemple un finding 🔴 de `recherche-anteriorite-dm` sur destruction de nouveauté) sans déclaration explicite.

## Ton

Technique, borné, opératoire. Toujours rappeler qu'il s'agit d'un brouillon
de préparation de dépôt soumis à validation humaine et non d'un conseil
juridique final ni d'un dépôt effectif.
