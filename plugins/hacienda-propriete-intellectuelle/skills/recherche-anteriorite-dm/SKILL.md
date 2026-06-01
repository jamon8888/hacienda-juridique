---
name: recherche-anteriorite-dm
description: >
  Premier passage strict de disponibilité D&M avant dépôt ou en signal inverse
  borné, centré sur les registres, la divulgation antérieure, la proximité
  visuelle et les risques nouveauté / caractère individuel. Brouillon soumis à
  validation humaine finale.
version: "2.0.0"
argument-hint: "[filing-vérification|reverse-nullity-signal]"
authors: ["Hacienda"]
tags:
  [
    dessins-modèles,
    antériorité,
    nouveauté,
    caractère-individuel,
    Locarno,
    INPI,
    EUIPO,
    prior-art,
    V2,
  ]
---

# Skill - Recherche d'antériorité dessins et modèles V2

> **PREMIER PASSAGE DE DISPONIBILITÉ, PAS VÉRIFICATION JURIDIQUE FINALE.**
>
> `recherche-anteriorite-dm` V2 sert à cadrer un premier passage strict
> d'antériorités avant dépôt d'un dessin ou modèle, ou à faire remonter un
> signal borné d'antériorité destructrice plausible contre un titre adverse.
> La recherche reste non exhaustive et la sortie demeure un brouillon soumis à
> validation humaine.

Référence de travail utile :
`references/recherche-anteriorite-dm-routing-and-output.md`

## Examples

<example>
<user>/h-pi:recherche-anteriorite-dm [filing-vérification|reverse-nullity-signal]</user>
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

- secteurs clients dominants et sensibilité design ;
- préférences de couverture territoriale ;
- habitudes de validation humaine ;
- tolérances internes en matière de risque visuel et de délai de dépôt.

Si le profil est absent ou partiel, maintenir les hypothèses visibles avec
`[PROVISOIRE]`.

## Intake

Identifier au minimum : demande, actif ou droit concerné, parties, territoire, dates utiles, documents disponibles, source officielle à consulter, urgence, sortie attendue et niveau de validation humaine requis.

## Gate non-juriste

Si l'utilisateur n'est pas juriste ou avocat, produire une explication opérationnelle, signaler les limites, refuser toute conclusion présentée comme avis juridique final et demander validation par un professionnel habilité avant usage externe.

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Propriété Intellectuelle` est disponible. Ne pas inventer de tool hors périmètre ; si une source ou un registre n'a pas été consulté directement, garder `[à vérifier]`.

- Socle textes, jurisprudence et droit UE : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Anno, quand disponible, reste une source interne de dossier : jamais un registre officiel INPI, EUIPO, OEB, OMPI ou BOPI.

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/` ou `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`.

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

## Rôle strict

Le skill :

- vérifie en premier passage la disponibilité apparente d'un dessin ou modèle ;
- structure la recherche autour d'un minimum de registres, d'extensions open web
  et d'un scan sectoriel renforcé si utile ;
- centre l'analyse sur la date, la classe, la proximité visuelle, la
  nouveauté, le caractère individuel et la liberté du créateur ;
- borné `reverse-nullity-signal` à un usage secondaire de signalement ;
- route vers `depot-dessin-modele` ou `contrefacon-dessin-modele` quand la
  question dominante sort du premier passage.

Le skill ne fait pas :

- une vérification juridique finale ou une opinion de validité définitive ;
- le dépôt effectif d'un dessin ou modèle ;
- une analyse principale de contrefaçon ;
- une recherche présentée comme exhaustive ;
- une substitution à la validation finale d'un avocat, juriste ou mandataire.

## Positionnement V2

### Branche principale `filing-clearance`

`filing-clearance` est la branche normale du skill. Elle sert à :

- vérifier si un dépôt envisagé dispose d'une base minimale de disponibilité ;
- identifier les antériorités les plus proches et les trous de couverture ;
- décider s'il faut préparer le dépôt, élargir la recherche ou ajuster le
  design avant la suite.

### Branche secondaire `reverse-nullity-signal`

`reverse-nullity-signal` reste strictement bornée. Elle sert seulement à :

- signaler une antériorité plausible contre un titre adverse ;
- identifier la preuve qu'il faut sécuriser en priorité ;
- préparer un reroutage vers `contrefacon-dessin-modele` si la situation
  devient adversariale.

Cette branche ne transforme pas le skill en mémo complet de nullité ou en
stratégie contentieuse autonome.

## Sources et garde-fous

- Prioriser `hacienda-sources-officielles` pour les sources primaires et les
  références officielles.
- Toute source non consultée reste marquée `[à vérifier]`.
- Toute information incomplète doit conserver les marqueurs
  `[PROVISOIRE]`, `[à vérifier]`, `[À COMPLÉTER]`.
- Distinguer clairement faits, droit, analyse, incertitudes, décisions et
  validation humaine.
- Rappeler qu'une recherche D&M ne couvre jamais de façon certaine toutes les
  divulgations non enregistrées ou non indexées.

## Contrat d'entrée V2

### Closed cadrage initial contract

- `research_mode`: `filing-clearance` | `reverse-nullity-signal`
- `territory_scope`: `fr` | `eu` | `international` | `mixed`
- `design_visibility_status`: `new` | `possibly-disclosed` |
  `already-disclosed` | `uncertain`
- `locarno_status`: `clear` | `mixed` | `uncertain`
- `search_coverage_target`: `registers-minimum` |
  `registers-plus-open-web` | `enhanced-sector-scan`
- `evidence_posture`: `strong` | `mixed` | `weak` | `blocked`

### Faits minimaux

Ne jamais présenter la sortie comme exploitable sans au moins :

- design cible clairement décrit ;
- visuels ou descriptions comparables disponibles ;
- produit ou gamme de produits visés ;
- territoire de recherche visé ;
- date de dépôt envisagée, de priorité ou date pivot de comparaison ;
- statut de divulgation du design cible ;
- classe Locarno connue, mixte ou incertaine ;
- objectif principal : disponibilité avant dépôt ou signal inverse borné ;
- sources effectivement consultées et date de consultation.

Selon le mode, ajouter si disponible :

- en `filing-clearance` : déposant, créateur, contexte de dépôt, arbitrage
  territorial ;
- en `reverse-nullity-signal` : titre adverse visé, titulaire adverse,
  date de dépôt / publication adverse, élément de preuve de l'antériorité
  invoquée.

Tout manque reste `[à vérifier]`.

## Seuil de préparation de l'antériorité

Le skill doit conclure sur une seule valeur :

- `ready`
- `partial`
- `blocked`

### `ready`

Le dossier permet un premier passage exploitable de disponibilité avec
couverture et base factuelle suffisantes pour orienter la suite, sous réserve
de validation humaine finale.

### `partial`

Le dossier permet un brouillon structuré, mais avec angles morts ou données
fragiles. Dans ce cas, conserver visiblement :

- `[PROVISOIRE]`
- `[à vérifier]`
- `[À COMPLÉTER]`

Cas fréquents :

- visuels partiels ;
- Locarno mixte ou incertain ;
- date pivot imparfaitement sécurisée ;
- open web ou scan sectoriel non encore faits ;
- preuve de divulgation antérieure seulement partielle.

### `blocked`

Bloquer le skill si :

- le design cible n'est pas identifiable ;
- aucun visuel ou description exploitable ne permet une comparaison sérieuse ;
- la date pivot pertinente ne peut pas être établie ;
- aucune source effectivement consultée et datée ne peut être documentée ;
- la posture de divulgation est trop incertaine pour cadrer la recherche ;
- aucune hypothèse Locarno raisonnable ne peut être déterminée ;
- la base minimale registres n'a pas été consultée alors qu'elle est requise ;
- en `reverse-nullity-signal`, aucune antériorité plausible ni preuve minimale
  à sécuriser ne peut être décrite.

En `blocked`, ne pas simuler une conclusion de disponibilité. Sortir en
`hold-insufficient-basis`.

## Frontieres de routage

### Router vers `depot-dessin-modele`

Basculer si la disponibilité apparente est suffisamment clarifiée et que le
besoin principal devient :

- la préparation du dossier de dépôt ;
- l'arbitrage FR / UE / La Haye / séquence ;
- les reproductions, la priorité ou la publication.

### Router vers `contrefacon-dessin-modele`

Basculer si la question dominante devient :

- une attaque ou défense contre un titre adverse ;
- une comparaison de contrefaçon au fond ;
- une preuve à sécuriser en posture adversariale ;
- une réaction précontentieuse ou contentieuse.

### Rester dans `recherche-anteriorite-dm`

Rester dans ce skill si le besoin principal est encore :

- la disponibilité avant dépôt ;
- l'identification d'antériorités proches ;
- la couverture de recherche insuffisante ;
- le signal borné d'une nullité plausible par art antérieur.

## Source coverage V2

### 1. Registers minimum

Minimum attendu sauf impossibilité documentée :

- INPI dessins et modèles pour le registre français ;
- EUIPO DesignView ou base équivalente pour les dessins et modèles de l'UE et
  registres reliés ;
- OMPI / Hague Express ou base OMPI design pertinente quand le périmètre
  international ou mixte le justifie.

Objectif :

- capter les enregistrements publiés les plus proches ;
- vérifier les dates utiles ;
- rattacher quand possible la classe Locarno et le territoire.

### 2. Compléments web ouverts

À activer si `search_coverage_target` atteint au moins
`registers-plus-open-web` :

- sites marchands ;
- catalogues en ligne ;
- résultats image et recherche web ouverte ;
- communiqués, portfolios, réseaux sociaux, pages produit datées si elles
  servent à documenter une divulgation.

Objectif :

- compléter les registres ;
- faire remonter des divulgations non enregistrées ou non captées ;
- signaler toute source restant fragile ou difficilement datée.

### 3. Scan sectoriel renforcé

À activer si `search_coverage_target` = `enhanced-sector-scan` :

- bases sectorielles ;
- salons, catalogues professionnels, archives de marque ;
- marketplaces spécialisées ou sources de secteur documentées.

Objectif :

- renforcer la recherche là où la probabilité de divulgations hors registre est
  significative ;
- mieux apprécier la liberté du créateur dans le secteur ;
- documenter les limites si le scan n'a pas pu être mené.

## Axes d'analyse stables

### 1. Cadrage de recherche

Toujours expliciter :

- mode de recherche ;
- territoire ;
- date pivot ;
- niveau de couverture visé ;
- posture de preuve.

### 2. Cartographie de l'art antérieur le plus proche

Pour chaque résultat proche, rendre visibles :

- source ;
- date ;
- classe ou secteur ;
- pertinence ;
- description brève ;
- proximité visuelle ;
- impression globale ;
- impact potentiel sur la nouveauté ;
- impact potentiel sur le caractère individuel ;
- enseignement sur la liberté du créateur.

### 3. Base de nouveauté

Identifier si une antériorité paraît :

- identique ;
- quasi identique ;
- proche sans destruction évidente ;
- trop éloignée ou incertaine.

### 4. Base de caractère individuel

Comparer l'impression globale sur l'utilisateur averti en tenant compte :

- des similitudes dominantes ;
- des différences perceptibles ;
- du niveau de contrainte du secteur ;
- du fait que de petites différences pèsent davantage si la liberté du
  créateur est étroite.

### 5. Limites de couverture

Toujours dire ce qui manque encore :

- registres non consultés ;
- recherche open web non faite ;
- scan sectoriel non fait ;
- datation fragile ;
- visuels insuffisants ;
- angle mort sur `DMCNE` ou divulgations hors index.

## Cadrage des constats

Les constats doivent être présentés autour de :

- `source`
- `date`
- `class`
- `visual proximity`
- `novelty risk`
- `individual character risk`
- `creator freedom`

Ne jamais réduire l'analyse à une simple liste de ressemblances descriptives.

## Routage de décision fermé

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

1. `Synthèse du dossier`
2. `Seuil de préparation de l'antériorité`
3. `Périmètre de recherche et sources`
4. `Constats d'art antérieur le plus proche`
5. `Risque de nouveauté`
6. `Risque de caractère individuel`
7. `Limites de couverture et inconnues`
8. `Routage de décision`
9. `Validation humaine`

## Format de sortie

```markdown
# Revue disponibilité D&M - [NOM DOSSIER]

*Brouillon de premier passage. Recherche non exhaustive. Validation humaine
finale requise.*

## 1. Synthèse du dossier
- Mode : `filing-clearance|reverse-nullity-signal`
- Faits : [design, produit, territoire, date pivot]
- Statuts fermes : [visibilité, Locarno, couverture cible, posture de preuve]
- Analyse brève : [...]

## 2. Seuil de préparation de l'antériorité
- Seuil : `ready|partial|blocked`
- Motifs : [...]
- Effet : [ce que la sortie permet ou non]

## 3. Périmètre de recherche et sources
- Registres minimums : [...]
- Compléments web ouverts : [...]
- Scan sectoriel renforcé : [...]
- Suffisance de couverture : [pourquoi la couverture est suffisante ou
  insuffisante pour une conclusion prudente]
- Sources non consultées : `[à vérifier]`

## 4. Constats d'art antérieur le plus proche
### Constat 1 - [source / référence]
- Source : [...]
- Date : [...]
- Classe : [...]
- Pertinence : [...]
- Proximité visuelle : `high|medium|low|unclear`
- Impression globale : [...]
- Risque de nouveauté : `high|medium|low|unclear`
- Risque de caractère individuel : `high|medium|low|unclear`
- Liberté du créateur : `narrow|medium|wide|unclear`
- Notes : [...]

## 5. Risque de nouveauté
- Baseline : [...]
- Art destructeur plausible : [...]
- Points de rupture ou de différence : [...]

## 6. Risque de caractère individuel
- Impression globale : [...]
- Similarités dominantes : [...]
- Différences notables : [...]
- Utilisateur averti / secteur : [...]
- Liberté du créateur : [...]

## 7. Limites de couverture et inconnues
- Limites : [...]
- Inconnues : [...]
- Rappels récurrents : [DMCNE ; salons / catalogues / réseaux sociaux /
  marketplaces ; limites de recherche visuelle ; limites de terminologie /
  classification]
- Marqueurs : `[PROVISOIRE]` / `[à vérifier]` / `[À COMPLÉTER]`

## 8. Routage de décision
- Route unique : `...`
- Motif : [...]
- Skill suivant : [...]

## 9. Validation humaine
- Validation requise : avocat / juriste / mandataire
- Points à confirmer : [...]
- Décision finale humaine attendue : [...]
```

## Discipline d'exécution

1. Qualifier le dossier avec le closed cadrage initial contract.
2. Vérifier le minimum fact set.
3. Poser le `Seuil de préparation de l'antériorité`.
4. Rendre visible la couverture `registres minimums`, puis les compléments.
5. Structurer les constats par source, date, classe et proximité visuelle.
6. Distinguer `Risque de nouveauté` et `Risque de caractère individuel`.
7. Sortir une seule route du `Routage de décision`.
8. Clore par `Validation humaine`.

## Cas de reroutage prioritaire

- disponibilité globalement rassurante mais dossier de dépôt à préparer :
  `prepare-filing` -> `depot-dessin-modele`
- disponibilité exploitable mais avec points de prudence :
  `prepare-filing-with-caution` -> `depot-dessin-modele`
- design à retoucher avant suite : `hold-for-design-adjustment`
- couverture trop mince ou angles morts majeurs : `hold-for-expanded-search`
- signal d'art antérieur potentiellement destructeur contre un titre adverse :
  `signal-reverse-nullity-posture`
- dossier devenu adversarial ou demande de comparaison au fond :
  `route-to-design-infringement-analysis` -> `contrefacon-dessin-modele`
- base trop faible pour conclure : `hold-insufficient-basis`

## Niveaux de criticité

Échelle canonique appliquée à toute appréciation subjective de ce skill :

| Niveau | Icône | Signification dans le contexte de ce skill |
|---|---|---|
| Faible | 🟢 | Champ libre : aucune antériorité destructrice identifiée sur le périmètre Locarno visé, dépôt envisageable sans réserve majeure. |
| Moyen | 🟡 | État de l'art encombré nécessitant un arbitrage de portée (vues, variantes, classe Locarno) pour sécuriser le caractère individuel. |
| Élevé | 🟠 | Dessin ou modèle antérieur proche affectant la nouveauté ou le caractère individuel sur l'utilisateur averti : portée à reconfigurer ou stratégie à revoir avant dépôt. |
| Bloquant | 🔴 | Antériorité identique ou impression globale identique dans la même catégorie Locarno : nouveauté détruite, dépôt à abandonner ou réorienter ; côté défense, base d'attaque en nullité d'un titre adverse. |

Plancher cross-skill (CLAUDE.md §4) : ce skill ne peut pas dégrader silencieusement une cote 🔴 amont (par exemple un signal 🔴 utilisateur sur divulgation propre antérieure non couverte par le délai de grâce) sans déclaration explicite.

## Ton

Technique, prudent, borné. Toujours rappeler que la recherche est non
exhaustive, que la sortie reste un brouillon de premier passage et qu'une
validation humaine finale reste nécessaire avant dépôt, attaque ou défense.
