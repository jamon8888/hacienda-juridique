---
name: contrefacon-dessin-modele
description: >
  Skill V2 d'analyse D&M stricte : validité et opposabilité du titre,
  impression globale, actes argués, preuve et défenses. La solution de repli
  concurrence déloyale / parasitisme reste secondaire. Brouillon soumis à
  validation par un avocat.
argument-hint: "[--attack|--défense]"
version: "2.0.0"
authors: ["Hacienda"]
tags: [dessins-modeles, contrefacon, impression-globale, utilisateur-averti, nullite, saisie-contrefacon]
---

# Skill - Contrefaçon dessin modèle V2

> **Analyse D&M stricte, pas contentieux global.**
> `contrefacon-dessin-modele` sert à qualifier une atteinte potentielle à un
> dessin ou modèle, à mesurer la robustesse du titre et de la comparaison, et
> à router vers la bonne brique d'escalade. Il ne dépose pas un titre, ne
> rédige pas la lettre finale, ne dépose pas la requête de saisie et ne pilote
> pas seul le contentieux.

Référence de travail utile :
`references/contrefacon-dessin-modele-routing-and-output.md`

## Examples

<example>
<user>/h-pi:contrefacon-dessin-modele [--attack|--défense]</user>
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
- la posture contentieuse ;
- l'avocat ou juriste validateur ;
- les approbateurs procéduraux ;
- les contraintes budget / urgence / exécution ;
- les préférences de preuve et de communication.

Si le profil est absent, incomplet ou contient `[A CONFIGURER]`, la sortie
reste utilisable, mais les hypothèses non documentées doivent être marquées
`[PROVISOIRE]`.

## Intake

Identifier au minimum : demande, actif ou droit concerné, parties, territoire, dates utiles, documents disponibles, source officielle à consulter, urgence, sortie attendue et niveau de validation humaine requis.

## Pré-flight `check-pii`

Avant toute analyse substantielle sur des pièces client : invoquer
`/h-pi:check-pii` sur le corpus fourni. Si le résultat déclenche le
prompt cas B (seuil B atteint ou catégorie sensible PI détectée),
attendre la décision utilisateur (anonymiser via `hacienda-ghost`,
ignorer, ou stopper) avant de poursuivre.

Si l'utilisateur choisit « ignorer », apposer un caveat
`[PII non traitée — décision utilisateur]` dans la note du relecteur.

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
outputs/contrefacon-dm-<affaire-slug>-YYYY-MM-DD.md
```

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

## Positionnement

`contrefacon-dessin-modele` V2 est le skill de :

1. vérification du titre D&M ou du droit non enregistré ;
2. analyse de l'impression globale sur l'utilisateur averti ;
3. qualification des actes argués ;
4. évaluation de la preuve disponible ;
5. anticipation des défenses et de l'exposition nullité ;
6. routage vers la brique d'escalade adaptée.

Le skill reste **bi-mode** :

- `attack`
- `defense`

Une branche `fallback-unfair-competition` peut exister, mais seulement comme
issue secondaire et bornée. Le coeur du skill reste l'analyse D&M.

## Ce skill ne fait pas

- Ne remplace pas `recherche-anteriorite-dm` pour l'analyse amont du paysage
  antérieur.
- Ne remplace pas `depot-dessin-modele` pour le dépôt ou la régularisation du
  titre.
- Ne rédige pas la lettre finale ; route vers `mise-en-demeure-pi`.
- Ne prépare pas seul la requête de saisie ; route vers `saisie-contrefacon`.
- Ne pilote pas seul le contentieux judiciaire ; route vers `contentieux-pi`.
- Ne devient pas un mémo autonome et généraliste de concurrence déloyale.
- Ne remplace pas l'avis final d'un avocat ou d'un juriste habilité.

## Contrat d'entrée V2

Le skill doit expliciter ou dériver :

- `mode`: `attack`, `defense`
- `title_status`: `registered`, `unregistered-eu`, `uncertain`, `blocked`
- `validity_posture`: `strong`, `mixed`, `weak`, `unknown`
- `visual_similarity_posture`: `high`, `medium`, `low`, `unclear`
- `creator_freedom_profile`: `narrow`, `medium`, `wide`, `unclear`
- `proof_posture`: `strong`, `mixed`, `weak`, `none`
- `enforcement_goal`: `internal-assessment`, `cease-and-desist`,
  `seizure-prep`, `litigation-prep`

### Minimal Fact Set

- titre invoqué, office, numéro, date, statut, renouvellements ;
- design adverse visé ;
- visuels comparables ;
- actes argués (fabrication, offre, vente, import, export, détention, usage) ;
- territoire ;
- preuves disponibles ;
- urgence ;
- antecedents de contact ou de retrait.

Tout manque reste `[à vérifier]`.

## Frontières de routage

### Router vers `recherche-anteriorite-dm`

Si la vraie question dominante est l'amont :

- nouveauté ;
- baseline art antérieur ;
- antériorités avant dépôt ;
- art antérieur avant défense structurée.

### Router vers `depot-dessin-modele`

Si le besoin principal devient la préparation, régularisation ou extension d'un
dépôt.

### Router vers `mise-en-demeure-pi`

Si l'analyse au fond est suffisamment stabilisée et que le besoin devient la
lettre ou la réponse structurée.

### Router vers `saisie-contrefacon`

Si la mesure probatoire judiciaire devient prioritaire.

### Router vers `contentieux-pi`

Si le dossier bascule au stade judiciaire ou pré-assignation structurée.

## Axes d'analyse V2

### 1. Title baseline

Vérifier :

- enregistrement, publication, renouvellements ;
- opposabilité du titre ;
- chaîne de titularité ;
- distinction titre enregistré / DMC non enregistré si pertinent.

En `defense`, cette étape doit aussi identifier les failles mobilisables contre
le titre adverse.

### 2. Protected scope

Identifier ce que couvre raisonnablement le titre :

- caractéristiques visibles revendiquables ;
- marge de protection réelle ;
- éléments fonctionnels ou imposés qui ne doivent pas être sur-vendus.

### 3. Global impression

Traiter l'analyse sur l'utilisateur averti :

- similitudes dominantes ;
- différences notables ;
- poids de la liberté du créateur ;
- perception globale, sans pseudo-comparaison mécanique point par point.

Si la liberté du créateur est étroite, le signaler clairement.

### 4. Acts map

Documenter les actes argués :

- fabrication ;
- offre ;
- vente ;
- importation ;
- exportation ;
- détention ;
- usage.

Distinguer les actes déjà prouvés de ceux seulement suspects.

### 5. Probative posture

Distinguer :

- ce qui est fort ;
- ce qui est exploitable mais incomplet ;
- ce qu'il faut sécuriser avant escalade ;
- ce qui manque pour une prochaine étape sérieuse.

Preuves classiques :

- captures datées ;
- constats ;
- achat-test ;
- catalogues ;
- factures ;
- échantillons ;
- visuels comparatifs ;
- données commerciales ou logistiques.

### 6. Exposition de défense

Anticiper les défenses :

- nullité du titre ;
- impression globale différente ;
- art antérieur destructeur ;
- liberté du créateur trop étroite ;
- titre inopposable ;
- absence de preuve des actes ;
- exception ou limitation sectorielle.

Le skill doit garder ces fragilites visibles.

### 7. Fallback secondary branch

Si `title_status` ou `validity_posture` rendent le titre trop fragile, le
skill peut ajouter une branche secondaire :

- `fallback-unfair-competition`

Cette branche doit :

- rester explicitement secondaire ;
- ne pas remplacer silencieusement l'analyse D&M ;
- ne pas transformer le skill en mémo generaliste de concurrence deloyale.

## Seuil de préparation de la contrefaçon D&M

Le skill doit conclure sur :

- `ready`
- `partial`
- `blocked`

### `ready`

- titre ou droit non enregistré suffisamment exploitable ;
- comparaison visuelle exploitable ;
- actes documentés ;
- preuve suffisante pour une prochaine étape.

### `partial`

- dossier exploitable ;
- mais avec hypothèses ou fragilites `[à vérifier]`.

### `blocked`

- titre trop fragile ;
- comparaison trop pauvre ;
- actes non documentés ;
- preuve trop faible.

En `blocked` :

- ne pas simuler de lettre forte, de saisie ou de contentieux comme si le
  dossier etait déjà prêt ;
- sortir en `hold-insufficient-basis` ou vers la brique de clarification
  appropriee ;
- lister explicitement les manques a combler.

## Format de sortie V2

Produire exactement les 9 blocs suivants :

1. `Synthèse du dossier`
2. `Design Infringement Readiness Gate`
3. `Title And Protected Scope Baseline`
4. `Global Impression Review`
5. `Acts And Territory Map`
6. `Preuve et exposition des défenses`
7. `Fallback Secondary Branch`
8. `Routage de décision`
9. `Validation humaine`

### Contrat de `Routage de décision`

Utiliser uniquement :

- `route-to-prior-art-review`
- `route-to-title-regularization`
- `prepare-cease-and-desist`
- `prepare-seizure-brief`
- `prepare-litigation-brief`
- `prepare-fallback-unfair-competition`
- `hold-insufficient-basis`

Chaque route doit preciser la prochaine brique :

- `route-to-prior-art-review` -> `recherche-anteriorite-dm`
- `route-to-title-regularization` -> `depot-dessin-modele`
- `prepare-cease-and-desist` -> `mise-en-demeure-pi`
- `prepare-seizure-brief` -> `saisie-contrefacon`
- `prepare-litigation-brief` -> `contentieux-pi`
- `prepare-fallback-unfair-competition` -> `contentieux-pi`, avec axe
  secondaire concurrence deloyale / parasitisme à valider humainement hors
  coeur D&M
- `hold-insufficient-basis` -> blocage explicite, sans pseudo-escalade

## Example output skeleton

```markdown
# Analyse contrefacon D&M - [titre] vs [design adverse]

*Brouillon soumis a validation par un avocat. Pas un avis juridique final ni
un acte de procédure.*

## 1. Synthèse du dossier

## 2. Design Infringement Readiness Gate

## 3. Title And Protected Scope Baseline

## 4. Global Impression Review

## 5. Acts And Territory Map

## 6. Evidence And Defense Exposure

## 7. Fallback Secondary Branch

## 8. Decision Routing

## 9. Human Validation
```

## Seuil non-juriste

Avant transmission :

- [ ] titre ou droit non enregistré explicite
- [ ] validité / opposabilité du titre explicite
- [ ] impression globale analysee sur utilisateur averti
- [ ] liberté du créateur prise en compte
- [ ] actes argués qualifiés precisement
- [ ] preuve forte / faible / manquante explicitee
- [ ] exposition nullité ou défense explicitee
- [ ] route finale explicite vers la bonne brique
- [ ] sortie marquée comme brouillon soumis à validation humaine

## Ton

Technique, stratégique, prudent. Distinguer clairement faits, droit, analyse,
incertitudes, prochaine étape et validation humaine. Ne jamais sur-vendre un
dossier faible. Rappeler que la sortie reste un **brouillon**, pas une lettre
finale ni un acte de procédure.
