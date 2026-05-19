---
name: contrefacon-dessin-modele
description: >
  Skill V2 d'analyse D&M stricte : validite et opposabilite du titre,
  impression globale, actes argués, preuve et defenses. Le fallback
  concurrence deloyale / parasitisme reste secondaire. Brouillon soumis a
  validation par un avocat.
argument-hint: "[--attack|--defense]"
version: "2.0.0"
authors: ["Hacienda"]
tags: [dessins-modeles, contrefacon, impression-globale, utilisateur-averti, nullite, saisie-contrefacon]
---

# Skill - Contrefacon dessin modele V2

> **Analyse D&M stricte, pas contentieux global.**
> `contrefacon-dessin-modele` sert a qualifier une atteinte potentielle a un
> dessin ou modele, a mesurer la robustesse du titre et de la comparaison, et
> a router vers la bonne brique d'escalade. Il ne depose pas un titre, ne
> redige pas la lettre finale, ne depose pas la requete de saisie et ne pilote
> pas seul le contentieux.

Reference de travail utile :
`references/contrefacon-dessin-modele-routing-and-output.md`

## Positionnement

`contrefacon-dessin-modele` V2 est le skill de :

1. verification du titre D&M ou du droit non enregistre ;
2. analyse de l'impression globale sur l'utilisateur averti ;
3. qualification des actes argués ;
4. evaluation de la preuve disponible ;
5. anticipation des defenses et de l'exposition nullite ;
6. routage vers la brique d'escalade adaptee.

Le skill reste **bi-mode** :

- `attack`
- `defense`

Une branche `fallback-unfair-competition` peut exister, mais seulement comme
issue secondaire et bornee. Le coeur du skill reste l'analyse D&M.

## Ce skill ne fait pas

- Ne remplace pas `recherche-anteriorite-dm` pour l'analyse amont du paysage
  anterieur.
- Ne remplace pas `depot-dessin-modele` pour le depot ou la regularisation du
  titre.
- Ne redige pas la lettre finale ; route vers `mise-en-demeure-pi`.
- Ne prepare pas seul la requete de saisie ; route vers `saisie-contrefacon`.
- Ne pilote pas seul le contentieux judiciaire ; route vers `contentieux-pi`.
- Ne devient pas un memo autonome et generaliste de concurrence deloyale.
- Ne remplace pas l'avis final d'un avocat ou d'un juriste habilite.

## Chargement du profil

Avant tout, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Rattacher ensuite :

- le role utilisateur ;
- la posture contentieuse ;
- l'avocat ou juriste validateur ;
- les approbateurs proceduraux ;
- les contraintes budget / urgence / execution ;
- les preferences de preuve et de communication.

Si le profil est absent, incomplet ou contient `[A CONFIGURER]`, la sortie
reste utilisable, mais les hypotheses non documentees doivent etre marquees
`[PROVISOIRE]`.

## Contrat d'entree V2

Le skill doit expliciter ou deriver :

- `mode`: `attack`, `defense`
- `title_status`: `registered`, `unregistered-eu`, `uncertain`, `blocked`
- `validity_posture`: `strong`, `mixed`, `weak`, `unknown`
- `visual_similarity_posture`: `high`, `medium`, `low`, `unclear`
- `creator_freedom_profile`: `narrow`, `medium`, `wide`, `unclear`
- `proof_posture`: `strong`, `mixed`, `weak`, `none`
- `enforcement_goal`: `internal-assessment`, `cease-and-desist`,
  `seizure-prep`, `litigation-prep`

### Minimal Fact Set

- titre invoque, office, numero, date, statut, renouvellements ;
- design adverse vise ;
- visuels comparables ;
- actes argués (fabrication, offre, vente, import, export, detention, usage) ;
- territoire ;
- preuves disponibles ;
- urgence ;
- antecedents de contact ou de retrait.

Tout manque reste `[a verifier]`.

## Frontieres de routage

### Route to `recherche-anteriorite-dm`

Si la vraie question dominante est l'amont :

- nouveaute ;
- baseline art anterieur ;
- antériorités avant depot ;
- prior art avant defense structuree.

### Route to `depot-dessin-modele`

Si le besoin principal devient la preparation, regularisation ou extension d'un
depot.

### Route to `mise-en-demeure-pi`

Si l'analyse au fond est suffisamment stabilisee et que le besoin devient la
lettre ou la reponse structuree.

### Route to `saisie-contrefacon`

Si la mesure probatoire judiciaire devient prioritaire.

### Route to `contentieux-pi`

Si le dossier bascule au stade judiciaire ou pre-assignation structuree.

## Axes d'analyse V2

### 1. Title baseline

Verifier :

- enregistrement, publication, renouvellements ;
- opposabilite du titre ;
- chaine de titularite ;
- distinction titre enregistre / DMC non enregistre si pertinent.

En `defense`, cette etape doit aussi identifier les failles mobilisables contre
le titre adverse.

### 2. Protected scope

Identifier ce que couvre raisonnablement le titre :

- caracteristiques visibles revendiquables ;
- marge de protection reelle ;
- elements fonctionnels ou imposes qui ne doivent pas etre sur-vendus.

### 3. Global impression

Traiter l'analyse sur l'utilisateur averti :

- similitudes dominantes ;
- differences notables ;
- poids de la liberte du createur ;
- perception globale, sans pseudo-comparaison mecanique point par point.

Si la liberte du createur est etroite, le signaler clairement.

### 4. Acts map

Documenter les actes argués :

- fabrication ;
- offre ;
- vente ;
- importation ;
- exportation ;
- detention ;
- usage.

Distinguer les actes deja prouves de ceux seulement suspects.

### 5. Probative posture

Distinguer :

- ce qui est fort ;
- ce qui est exploitable mais incomplet ;
- ce qu'il faut securiser avant escalation ;
- ce qui manque pour une prochaine etape serieuse.

Preuves classiques :

- captures datees ;
- constats ;
- achat-test ;
- catalogues ;
- factures ;
- echantillons ;
- visuels comparatifs ;
- donnees commerciales ou logistiques.

### 6. Defense exposure

Anticiper les defenses :

- nullite du titre ;
- impression globale differente ;
- prior art destructeur ;
- liberte du createur trop etroite ;
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
- ne pas transformer le skill en memo generaliste de concurrence deloyale.

## Design Infringement Readiness Gate

Le skill doit conclure sur :

- `ready`
- `partial`
- `blocked`

### `ready`

- titre ou droit non enregistre suffisamment exploitable ;
- comparaison visuelle exploitable ;
- actes documentes ;
- preuve suffisante pour une prochaine etape.

### `partial`

- dossier exploitable ;
- mais avec hypotheses ou fragilites `[a verifier]`.

### `blocked`

- titre trop fragile ;
- comparaison trop pauvre ;
- actes non documentes ;
- preuve trop faible.

En `blocked` :

- ne pas simuler de lettre forte, de saisie ou de contentieux comme si le
  dossier etait deja pret ;
- sortir en `hold-insufficient-basis` ou vers la brique de clarification
  appropriee ;
- lister explicitement les manques a combler.

## Format de sortie V2

Produire exactement les 9 blocs suivants :

1. `Case Snapshot`
2. `Design Infringement Readiness Gate`
3. `Title And Protected Scope Baseline`
4. `Global Impression Review`
5. `Acts And Territory Map`
6. `Evidence And Defense Exposure`
7. `Fallback Secondary Branch`
8. `Decision Routing`
9. `Human Validation`

### Contrat de `Decision Routing`

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
  secondaire concurrence deloyale / parasitisme a valider humainement hors
  coeur D&M
- `hold-insufficient-basis` -> blocage explicite, sans pseudo-escalade

## Example output skeleton

```markdown
# Analyse contrefacon D&M - [titre] vs [design adverse]

*Brouillon soumis a validation par un avocat. Pas un avis juridique final ni
un acte de procedure.*

## 1. Case Snapshot

## 2. Design Infringement Readiness Gate

## 3. Title And Protected Scope Baseline

## 4. Global Impression Review

## 5. Acts And Territory Map

## 6. Evidence And Defense Exposure

## 7. Fallback Secondary Branch

## 8. Decision Routing

## 9. Human Validation
```

## Gate non-juriste

Avant transmission :

- [ ] titre ou droit non enregistre explicite
- [ ] validite / opposabilite du titre explicite
- [ ] impression globale analysee sur utilisateur averti
- [ ] liberte du createur prise en compte
- [ ] actes argués qualifies precisement
- [ ] preuve forte / faible / manquante explicitee
- [ ] exposition nullite ou defense explicitee
- [ ] route finale explicite vers la bonne brique
- [ ] sortie marquee comme brouillon soumis a validation humaine

## Emplacement des sorties

```text
outputs/contrefacon-dm-<affaire-slug>-YYYY-MM-DD.md
```

## Ton

Technique, strategique, prudent. Distinguer clairement faits, droit, analyse,
incertitudes, prochaine etape et validation humaine. Ne jamais sur-vendre un
dossier faible. Rappeler que la sortie reste un **brouillon**, pas une lettre
finale ni un acte de procedure.
