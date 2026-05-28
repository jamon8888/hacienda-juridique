---
name: contrefacon-droit-auteur
description: >
  Skill V2 d'analyse au fond stricte de la contrefaçon auteur : originalité
  mobilisable, titularité, comparaison, type d'atteinte, preuve et défenses
  adverses. La branche plateforme / LCEN reste secondaire et ne remplace ni
  la lettre, ni la saisie, ni le contentieux. Brouillon soumis à validation
  par un avocat.
argument-hint: "[reproduction|representation|adaptation|moral-rights|mixed]"
version: "2.0.0"
authors: ["Hacienda"]
tags: [droit-auteur, contrefacon, reproduction, representation, adaptation, droit-moral, LCEN, enforcement]
---

# Skill - Contrefaçon droit auteur V2

> **Analyse au fond stricte, pas enforcement global.**
> `contrefacon-droit-auteur` sert à qualifier contradictoirement une atteinte
> potentielle au droit d'auteur, à mesurer la solidité du dossier et à router
> vers la bonne brique d'escalade. Il n'envoie pas la lettre, ne dépose pas la
> requête de saisie, ne pilote pas seul le contentieux et ne promet pas une
> condamnation.

Référence de travail utile :
`references/contrefacon-droit-auteur-routing-and-output.md`

## Examples

<example>
<user>/h-pi:contrefacon-droit-auteur [reproduction|representation|adaptation|moral-rights|mixed]</user>
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

- le rôle utilisateur ;
- la posture enforcement ;
- l'avocat ou juriste validateur ;
- la matrice d'approbateurs ;
- les contraintes budget / plateforme / urgence ;
- les préférences de communication et de preuve.

Si le profil est absent, incomplet ou contient `[A CONFIGURER]`, la sortie
reste utilisable, mais les hypothèses non documentées doivent être marquées
`[PROVISOIRE]`.

## Intake

Identifier au minimum : demande, actif ou droit concerné, parties, territoire, dates utiles, documents disponibles, source officielle à consulter, urgence, sortie attendue et niveau de validation humaine requis.

## Gate non-juriste

Si l'utilisateur n'est pas juriste ou avocat, produire une explication opérationnelle, signaler les limites, refuser toute conclusion présentée comme avis juridique final et demander validation par un professionnel habilité avant usage externe.

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Propriété Intellectuelle` est disponible. Ne pas inventer de tool hors périmètre ; si une source ou un registre n'a pas été consulté directement, garder `[à vérifier]`.

- Socle textes, jurisprudence et droit UE : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Brevets et Espacenet : `inpi_search_brevets`, `inpi_brevet_details`, `espacenet_search`, `espacenet_brevet_details`.
- Dessins et modèles, droit d'auteur, logiciels, bases de données et droits voisins : utiliser le socle officiel ci-dessus ; les registres spécialisés non exposés par le serveur restent `[à vérifier]` ou traités via preuve/document client autorisé.
- Anno, quand disponible, reste une source interne de dossier : jamais un registre officiel INPI, EUIPO, OEB, OMPI ou BOPI.

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/` ou `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`.

```text
outputs/contrefacon-auteur-<oeuvre-slug>-YYYY-MM-DD.md
```

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

## Positionnement

`contrefacon-droit-auteur` V2 est le skill de :

1. qualification contradictoire de la reprise ;
2. cartographie des similitudes protégeables ;
3. qualification des atteintes patrimoniales et morales ;
4. évaluation de la preuve disponible ;
5. anticipation des défenses adverses ;
6. routage vers la brique enforcement suivante.

La branche `platform-notice` reste possible, mais comme issue secondaire et
bornée. Le coeur du skill reste l'analyse au fond.

## Ce skill ne fait pas

- Ne remplace pas `qualification-oeuvre` quand l'originalité est encore
  entierement incertaine.
- Ne remplace pas `depot-preuve-creation` pour le bundle probatoire complet.
- Ne rédige pas la lettre finale de mise en demeure ; route vers
  `mise-en-demeure-pi`.
- Ne prépare pas seul la requête de saisie ; route vers `saisie-contrefacon`.
- Ne pilote pas seul le contentieux judiciaire ; route vers `contentieux-pi`.
- Ne devient pas une analyse autonome de base de données ; route vers
  `bases-de-donnees` si le sujet dominant releve du droit sui generis.
- Ne remplace pas l'avis final d'un avocat ou d'un juriste habilite.

## Contrat d'entrée V2

Le skill doit expliciter ou deriver :

- `infringement_track`: `reproduction`, `representation`, `adaptation`,
  `moral-rights`, `mixed`
- `work_type`: `text`, `image`, `music`, `audiovisual`, `software`,
  `database`, `character`, `mixed-media`, `other`
- `originality_status`: `established`, `plausible`, `uncertain`, `blocked`
- `title_status`: `clear`, `partial`, `uncertain`, `blocked`
- `proof_posture`: `strong`, `mixed`, `weak`, `none`
- `distribution_context`: `offline`, `website`, `platform`, `marketplace`,
  `social-media`, `mixed`
- `enforcement_goal`: `internal-assessment`, `cease-and-desist`,
  `platform-notice`, `seizure-prep`, `litigation-prep`

### Minimal Fact Set

- œuvre originale et éléments invoqués comme protégeables ;
- auteur, titulaire, cessions éventuelles, qualité pour agir ;
- œuvre ou contenu adverse visé ;
- nature exacte de la reprise ou diffusion ;
- preuves de création, de date et d'accès si disponibles ;
- preuves de reprise et de diffusion ;
- contexte economique et moral du préjudice ;
- antecedents de contact, retrait ou signalement.

Tout manque reste `[à vérifier]`.

## Frontieres de routage

### Router vers `qualification-oeuvre`

Si la vraie question dominante est encore :

- l'existence même de l'originalité ;
- la catégorie d'œuvre ;
- la titularité initiale hors contradiction.

### Router vers `depot-preuve-creation`

Si le point bloquant est d'abord :

- la date ;
- la paternite ;
- la chronologie ;
- le registre des pièces ;
- le bundle probatoire.

### Router vers `mise-en-demeure-pi`

Si l'analyse au fond est suffisamment stabilisée et que le besoin devient la
lettre, la réponse structurée ou la mise en forme d'une notification.

### Router vers `saisie-contrefacon`

Si la mesure probatoire judiciaire devient prioritaire avant escalade.

### Router vers `contentieux-pi`

Si le dossier est déjà au stade judiciaire ou pré-assignation structurée.

### Router vers `bases-de-donnees`

Si la question dominante relève du droit sui generis ou de la structure de
base de données plus que du seul droit d'auteur.

## Axes d'analyse V2

### 1. Originality floor

Identifier uniquement les éléments qui peuvent raisonnablement être invoqués
comme originaux :

- sélection, combinaison, composition, cadrage, style concret, structure,
  personnage, progression narrative, formulation singuliere ;
- jamais les idees, methodes, genres, concepts ou contraintes purement
  fonctionnelles.

Si l'originalité est trop fragile, le dire d'emblee et limiter l'intensite des
conclusions.

### 2. Title and standing

Vérifier :

- auteur et titulaire ;
- cession ou licence pertinente ;
- qualité pour agir ;
- point de vigilance spécifique pour les œuvres collectives, composites,
  logicielles ou audiovisuelles.

Si la titularité est `partial` ou `uncertain`, la garder visible dans toute la
suite de l'analyse.

### 3. Accès et similarité comparative

Traiter separement :

- accès direct, probable ou non demontre ;
- similitudes protégeables ;
- differences non decisives ;
- risques d'idee libre, style libre ou banalite ;
- cas de reprise partielle mais qualitativement sensible.

Utiliser un tableau comparatif quand il aide, mais sans transformer le skill en
bundle contentieux complet.

### 4. Analyse de la branche de contrefaçon

#### `reproduction`

Vérifier la fixation ou copie de la forme originale, même partielle, si elle
porte sur des éléments protégeables.

#### `representation`

Vérifier la communication au public non autorisee : site, reseau social,
plateforme, streaming, mise à disposition.

#### `adaptation`

Vérifier la transformation ou réutilisation des éléments originaux
caractéristiques de l'œuvre première.

#### `moral-rights`

Vérifier notamment :

- absence de paternite ;
- denaturation ;
- modification non autorisee ;
- contexte d'exploitation attentatoire à l'intégrité de l'œuvre.

#### `mixed`

Traiter chaque atteinte separement, sans fusionner artificiellement les
fondements.

### 5. Posture probatoire

Distinguer clairement :

- ce qui est fort ;
- ce qui est exploitable mais incomplet ;
- ce qui manque avant escalade ;
- ce qui doit être sécurisé par preuve complémentaire.

Preuves classiques :

- captures datées ;
- constats ;
- fichiers sources ;
- métadonnées ;
- versions antérieures ;
- liens de diffusion ;
- temoignages ;
- comparaisons techniques ou textuelles.

### 6. Exposition de défense

Anticiper les défenses adverses :

- originalité contestee ;
- titularité contestee ;
- absence d'accès ;
- inspiration licité ;
- exception invoquée ;
- qualification base de données / logiciel à clarifier ;
- contestation de la substantialite de la reprise.

Le skill doit exposer ces faiblesses, pas les minimiser.

### 7. Platform / LCEN posture

Si `distribution_context` inclut `website`, `platform`, `marketplace` ou
`social-media`, une branche secondaire peut être ajoutee :

- intérêt pratique d'une notification plateforme ;
- pièces minimales à joindre ;
- limités de la voie plateforme ;
- articulation avec `mise-en-demeure-pi` ou `contentieux-pi`.

Cette branche ne remplace jamais l'analyse au fond.

## Seuil de préparation de la contrefaçon de droit d'auteur

Le skill doit conclure sur :

- `ready`
- `partial`
- `blocked`

### `ready`

- originalité mobilisable ;
- titre / qualité pour agir suffisamment clairs ;
- comparaison exploitable ;
- preuves d'atteinte suffisantes pour une prochaine étape.

### `partial`

- dossier exploitable ;
- mais avec hypothèses ou faiblesses `[à vérifier]` qui doivent rester
  visibles.

### `blocked`

- originalité trop incertaine ;
- titularité bloquante ;
- comparaison trop pauvre ;
- preuve de reprise ou de diffusion trop faible.

En `blocked` :

- ne pas simuler de lettre forte, saisie ou contentieux comme si le dossier
  etait déjà prêt ;
- sortir en `hold-insufficient-basis` ou vers une brique de clarification ;
- lister explicitement les manques à combler.

## Format de sortie V2

Produire exactement les 9 blocs suivants :

1. `Synthèse du dossier`
2. `Seuil de préparation de la contrefaçon de droit d'auteur`
3. `Originality And Title Baseline`
4. `Revue comparative de similarité`
5. `Analyse de la branche de contrefaçon`
6. `Preuve et exposition des défenses`
7. `Platform Notice Posture`
8. `Routage de décision`
9. `Validation humaine`

### Contrat de `Routage de décision`

Utiliser uniquement :

- `route-to-proof-hardening`
- `route-to-originality-review`
- `prepare-cease-and-desist`
- `prepare-platform-notice`
- `prepare-seizure-brief`
- `prepare-litigation-brief`
- `route-to-database-analysis`
- `hold-insufficient-basis`

Chaque route doit preciser la prochaine brique :

- `route-to-proof-hardening` -> `depot-preuve-creation`
- `route-to-originality-review` -> `qualification-oeuvre`
- `prepare-cease-and-desist` -> `mise-en-demeure-pi`
- `prepare-platform-notice` -> `mise-en-demeure-pi`, avec adaptation
  humaine finale au canal plateforme / hebergeur
- `prepare-seizure-brief` -> `saisie-contrefacon`
- `prepare-litigation-brief` -> `contentieux-pi`
- `route-to-database-analysis` -> `bases-de-donnees`
- `hold-insufficient-basis` -> blocage explicite, sans pseudo-escalade

## Exemple de squelette de sortie

```markdown
# Analyse contrefacon auteur - [oeuvre] vs [support adverse]

*Brouillon soumis à validation par un avocat. Pas un avis juridique final.*

## 1. Synthèse du dossier

## 2. Copyright Infringement Readiness Gate

## 3. Originality And Title Baseline

## 4. Comparative Similarity Review

## 5. Infringement Branche Analysis

## 6. Evidence And Defense Exposure

## 7. Platform Notice Posture

## 8. Decision Routing

## 9. Human Validation
```

## Seuil non-juriste

Avant transmission :

- [ ] originalité mobilisable explicitee
- [ ] qualité pour agir explicitee
- [ ] similitudes protégeables distinguees des idees libres
- [ ] type(s) d'atteinte qualifiés precisement
- [ ] preuve forte / faible / manquante explicitee
- [ ] défenses adverses anticipees
- [ ] route finale explicite vers la bonne brique
- [ ] sortie marquée comme brouillon soumis à validation humaine

## Ton

Factuel, rigoureux, contradictoire. Distinguer clairement faits, droit,
analyse, incertitudes, prochaine étape et validation humaine. Ne jamais
sur-vendre un dossier faible. Rappeler si nécessaire que la sortie reste un
**brouillon**, pas une lettre finale ni un acte de procédure.
