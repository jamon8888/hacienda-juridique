---
name: contrefacon-droit-auteur
description: >
  Skill V2 d'analyse au fond stricte de la contrefacon auteur : originalite
  mobilisable, titularite, comparaison, type d'atteinte, preuve et defenses
  adverses. La branche plateforme / LCEN reste secondaire et ne remplace ni
  la lettre, ni la saisie, ni le contentieux. Brouillon soumis a validation
  par un avocat.
argument-hint: "[reproduction|representation|adaptation|moral-rights|mixed]"
version: "2.0.0"
authors: ["Hacienda"]
tags: [droit-auteur, contrefacon, reproduction, representation, adaptation, droit-moral, LCEN, enforcement]
---

# Skill - Contrefacon droit auteur V2

> **Analyse au fond stricte, pas enforcement global.**
> `contrefacon-droit-auteur` sert a qualifier contradictoirement une atteinte
> potentielle au droit d'auteur, a mesurer la solidite du dossier et a router
> vers la bonne brique d'escalade. Il n'envoie pas la lettre, ne depose pas la
> requete de saisie, ne pilote pas seul le contentieux et ne promet pas une
> condamnation.

Reference de travail utile :
`references/contrefacon-droit-auteur-routing-and-output.md`

## Positionnement

`contrefacon-droit-auteur` V2 est le skill de :

1. qualification contradictoire de la reprise ;
2. cartographie des similitudes protegeables ;
3. qualification des atteintes patrimoniales et morales ;
4. evaluation de la preuve disponible ;
5. anticipation des defenses adverses ;
6. routage vers la brique enforcement suivante.

La branche `platform-notice` reste possible, mais comme issue secondaire et
bornee. Le coeur du skill reste l'analyse au fond.

## Ce skill ne fait pas

- Ne remplace pas `qualification-oeuvre` quand l'originalite est encore
  entierement incertaine.
- Ne remplace pas `depot-preuve-creation` pour le bundle probatoire complet.
- Ne redige pas la lettre finale de mise en demeure ; route vers
  `mise-en-demeure-pi`.
- Ne prepare pas seul la requete de saisie ; route vers `saisie-contrefacon`.
- Ne pilote pas seul le contentieux judiciaire ; route vers `contentieux-pi`.
- Ne devient pas une analyse autonome de base de donnees ; route vers
  `bases-de-donnees` si le sujet dominant releve du droit sui generis.
- Ne remplace pas l'avis final d'un avocat ou d'un juriste habilite.

## Chargement du profil

Avant tout, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Rattacher ensuite :

- le role utilisateur ;
- la posture enforcement ;
- l'avocat ou juriste validateur ;
- la matrice d'approbateurs ;
- les contraintes budget / plateforme / urgence ;
- les preferences de communication et de preuve.

Si le profil est absent, incomplet ou contient `[A CONFIGURER]`, la sortie
reste utilisable, mais les hypotheses non documentees doivent etre marquees
`[PROVISOIRE]`.

## Contrat d'entree V2

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

- oeuvre originale et elements invoques comme protegeables ;
- auteur, titulaire, cessions eventuelles, qualite pour agir ;
- oeuvre ou contenu adverse vise ;
- nature exacte de la reprise ou diffusion ;
- preuves de creation, de date et d'acces si disponibles ;
- preuves de reprise et de diffusion ;
- contexte economique et moral du prejudice ;
- antecedents de contact, retrait ou signalement.

Tout manque reste `[a verifier]`.

## Frontieres de routage

### Route to `qualification-oeuvre`

Si la vraie question dominante est encore :

- l'existence meme de l'originalite ;
- la categorie d'oeuvre ;
- la titularite initiale hors contradiction.

### Route to `depot-preuve-creation`

Si le point bloquant est d'abord :

- la date ;
- la paternite ;
- la chronologie ;
- le registre des pieces ;
- le bundle probatoire.

### Route to `mise-en-demeure-pi`

Si l'analyse au fond est suffisamment stabilisee et que le besoin devient la
lettre, la reponse structuree ou la mise en forme d'une notification.

### Route to `saisie-contrefacon`

Si la mesure probatoire judiciaire devient prioritaire avant escalation.

### Route to `contentieux-pi`

Si le dossier est deja au stade judiciaire ou pre-assignation structuree.

### Route to `bases-de-donnees`

Si la question dominante releve du droit sui generis ou de la structure de
base de donnees plus que du seul droit d'auteur.

## Axes d'analyse V2

### 1. Originality floor

Identifier uniquement les elements qui peuvent raisonnablement etre invoques
comme originaux :

- selection, combinaison, composition, cadrage, style concret, structure,
  personnage, progression narrative, formulation singuliere ;
- jamais les idees, methodes, genres, concepts ou contraintes purement
  fonctionnelles.

Si l'originalite est trop fragile, le dire d'emblee et limiter l'intensite des
conclusions.

### 2. Title and standing

Verifier :

- auteur et titulaire ;
- cession ou licence pertinente ;
- qualite pour agir ;
- point de vigilance specifique pour les oeuvres collectives, composites,
  logicielles ou audiovisuelles.

Si la titularite est `partial` ou `uncertain`, la garder visible dans toute la
suite de l'analyse.

### 3. Access and comparative similarity

Traiter separement :

- acces direct, probable ou non demontre ;
- similitudes protegeables ;
- differences non decisives ;
- risques d'idee libre, style libre ou banalite ;
- cas de reprise partielle mais qualitativement sensible.

Utiliser un tableau comparatif quand il aide, mais sans transformer le skill en
bundle contentieux complet.

### 4. Infringement track analysis

#### `reproduction`

Verifier la fixation ou copie de la forme originale, meme partielle, si elle
porte sur des elements protegeables.

#### `representation`

Verifier la communication au public non autorisee : site, reseau social,
plateforme, streaming, mise a disposition.

#### `adaptation`

Verifier la transformation ou reutilisation des elements originaux
caracteristiques de l'oeuvre premiere.

#### `moral-rights`

Verifier notamment :

- absence de paternite ;
- denaturation ;
- modification non autorisee ;
- contexte d'exploitation attentatoire a l'integrite de l'oeuvre.

#### `mixed`

Traiter chaque atteinte separement, sans fusionner artificiellement les
fondements.

### 5. Evidence posture

Distinguer clairement :

- ce qui est fort ;
- ce qui est exploitable mais incomplet ;
- ce qui manque avant escalation ;
- ce qui doit etre securise par preuve complementaire.

Preuves classiques :

- captures datees ;
- constats ;
- fichiers sources ;
- metadonnees ;
- versions anterieures ;
- liens de diffusion ;
- temoignages ;
- comparaisons techniques ou textuelles.

### 6. Defense exposure

Anticiper les defenses adverses :

- originalite contestee ;
- titularite contestee ;
- absence d'acces ;
- inspiration licite ;
- exception invoquee ;
- qualification base de donnees / logiciel a clarifier ;
- contestation de la substantialite de la reprise.

Le skill doit exposer ces faiblesses, pas les minimiser.

### 7. Platform / LCEN posture

Si `distribution_context` inclut `website`, `platform`, `marketplace` ou
`social-media`, une branche secondaire peut etre ajoutee :

- interet pratique d'une notification plateforme ;
- pieces minimales a joindre ;
- limites de la voie plateforme ;
- articulation avec `mise-en-demeure-pi` ou `contentieux-pi`.

Cette branche ne remplace jamais l'analyse au fond.

## Copyright Infringement Readiness Gate

Le skill doit conclure sur :

- `ready`
- `partial`
- `blocked`

### `ready`

- originalite mobilisable ;
- titre / qualite pour agir suffisamment clairs ;
- comparaison exploitable ;
- preuves d'atteinte suffisantes pour une prochaine etape.

### `partial`

- dossier exploitable ;
- mais avec hypotheses ou faiblesses `[a verifier]` qui doivent rester
  visibles.

### `blocked`

- originalite trop incertaine ;
- titularite bloquante ;
- comparaison trop pauvre ;
- preuve de reprise ou de diffusion trop faible.

En `blocked` :

- ne pas simuler de lettre forte, saisie ou contentieux comme si le dossier
  etait deja pret ;
- sortir en `hold-insufficient-basis` ou vers une brique de clarification ;
- lister explicitement les manques a combler.

## Format de sortie V2

Produire exactement les 9 blocs suivants :

1. `Case Snapshot`
2. `Copyright Infringement Readiness Gate`
3. `Originality And Title Baseline`
4. `Comparative Similarity Review`
5. `Infringement Track Analysis`
6. `Evidence And Defense Exposure`
7. `Platform Notice Posture`
8. `Decision Routing`
9. `Human Validation`

### Contrat de `Decision Routing`

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

## Example output skeleton

```markdown
# Analyse contrefacon auteur - [oeuvre] vs [support adverse]

*Brouillon soumis a validation par un avocat. Pas un avis juridique final.*

## 1. Case Snapshot

## 2. Copyright Infringement Readiness Gate

## 3. Originality And Title Baseline

## 4. Comparative Similarity Review

## 5. Infringement Track Analysis

## 6. Evidence And Defense Exposure

## 7. Platform Notice Posture

## 8. Decision Routing

## 9. Human Validation
```

## Gate non-juriste

Avant transmission :

- [ ] originalite mobilisable explicitee
- [ ] qualite pour agir explicitee
- [ ] similitudes protegeables distinguees des idees libres
- [ ] type(s) d'atteinte qualifies precisement
- [ ] preuve forte / faible / manquante explicitee
- [ ] defenses adverses anticipees
- [ ] route finale explicite vers la bonne brique
- [ ] sortie marquee comme brouillon soumis a validation humaine

## Emplacement des sorties

```text
outputs/contrefacon-auteur-<oeuvre-slug>-YYYY-MM-DD.md
```

## Ton

Factuel, rigoureux, contradictoire. Distinguer clairement faits, droit,
analyse, incertitudes, prochaine etape et validation humaine. Ne jamais
sur-vendre un dossier faible. Rappeler si necessaire que la sortie reste un
**brouillon**, pas une lettre finale ni un acte de procedure.
