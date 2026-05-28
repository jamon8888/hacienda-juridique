---
name: bases-de-donnees
description: >
  Skill V2 de qualification stricte des regimes de protection d'une base de
  données : structure auteur, droit sui generis, producteur / titulaire,
  accès, extraction et réutilisation. La posture contractuelle reste
  secondaire et le RGPD n'est traite qu'en signal. Brouillon soumis à
  validation par un avocat.
argument-hint: "[private|public-sector|saas|api|mixed]"
version: "2.0.0"
authors: ["Hacienda"]
tags: [bases-de-donnees, sui-generis, droit-auteur, scraping, open-data, api, RGPD]
---

# Skill - Bases de données V2

> **Qualification des protections, pas contrat final ni audit RGPD complet.**
> `bases-de-donnees` sert à qualifier les régimes de protection applicables à
> une base de données, à mesurer la robustesse de la structure auteur et du
> droit sui generis, puis à orienter vers la bonne posture contractuelle,
> privacy ou contentieuse. Il ne rédige pas le contrat final, ne conduit pas
> seul l'audit RGPD et ne pilote pas seul le contentieux.

Référence de travail utile :
`references/bases-de-donnees-routing-and-output.md`

## Examples

<example>
<user>/h-pi:bases-de-donnees [private|public-sector|saas|api|mixed]</user>
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
- la politique base de données (propriétaire / open data / mixte) ;
- le DPO ou le relais privacy ;
- l'avocat ou juriste validateur ;
- les préférences de licensing et d'API ;
- les contraintes budget / open data / monetisation.

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
- Dessins et modèles, droit d'auteur, logiciels, bases de données et droits voisins : utiliser le socle officiel ci-dessus ; les registres spécialisés non exposés par le serveur restent `[à vérifier]` ou traités via preuve/document client autorisé.
- Anno, quand disponible, reste une source interne de dossier : jamais un registre officiel INPI, EUIPO, OEB, OMPI ou BOPI.

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/` ou `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`.

```text
outputs/bases-donnees-<projet-slug>-YYYY-MM-DD.md
```

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

## Positionnement

`bases-de-donnees` V2 est le skill de :

1. qualification du droit d'auteur sur la structure ;
2. qualification du droit sui generis sur le contenu / l'investissement ;
3. cartographie du producteur, du titulaire et de l'exploitant ;
4. évaluation des risques d'accès, d'extraction, de réutilisation ou de
   scraping ;
5. signalement RGPD si des données personnelles sont impliquees ;
6. routage vers la bonne posture contractuelle ou contentieuse.

La branche contractuelle reste presente, mais secondaire. Le coeur du skill
reste la qualification des protections.

## Ce skill ne fait pas

- Ne remplace pas `qualification-oeuvre` pour une logique dominante
  d'originalité hors base de données.
- Ne remplace pas `logiciels-pi` pour la chaîne de droits logiciel, repo ou
  SaaS en tant que produit logiciel.
- Ne remplace pas `contrefacon-droit-auteur` pour une logique contradictoire
  de reprise auteur.
- Ne remplace pas `licence-droit-auteur` pour la rédaction détaillée d'une
  licence.
- Ne remplace pas le extension données personnelles pour la conformité RGPD
  complète.
- Ne pilote pas seul un contentieux scraping / extraction / réutilisation.
- Ne remplace pas l'avis final d'un avocat ou d'un juriste habilite.

## Contrat d'entrée V2

Le skill doit expliciter ou deriver :

- `database_type`: `private`, `public-sector`, `saas`, `api`, `mixed`
- `structure_originality_status`: `strong`, `mixed`, `weak`, `unknown`
- `investment_posture`: `strong`, `mixed`, `weak`, `unknown`
- `data_personal_status`: `yes`, `no`, `mixed`, `unknown`
- `access_model`: `internal`, `b2b-license`, `open-data`, `public-api`,
  `scraping-risk`
- `dispute_posture`: `none`, `licensing`, `scraping`, `misuse`, `unclear`

### Minimal Fact Set

- nature et contenu de la base ;
- structure, taxonomie, architecture de classement ;
- investissement documenté ;
- producteur, auteur de la structure, exploitant ;
- mode d'accès actuel ou projete ;
- données personnelles presentes ou non ;
- usage tiers constate ou redoute ;
- CGU, licence ou contrat déjà en place si existants.

Tout manque reste `[à vérifier]`.

## Frontieres de routage

### Router vers `qualification-oeuvre`

Si la vraie question dominante est l'originalité d'une structure ou d'un
ensemble creatif, hors logique principale base de données.

### Router vers `logiciels-pi`

Si la vraie question dominante porte sur :

- logiciel ;
- SaaS ;
- chaîne de droits code / repo / dataset ;
- droits d'utilisation du produit logiciel.

### Router vers `contrefacon-droit-auteur`

Si la logique dominante devient contradictoire sur la reprise d'une structure
ou d'un contenu protégé au titre du droit d'auteur.

### Router vers `licence-droit-auteur`

Si la qualification est suffisamment stabilisée et que le besoin devient la
rédaction détaillée d'une licence.

### Router vers le extension données personnelles

Si la vraie question dominante devient :

- base légale ;
- DPA ;
- registre ;
- AIPD ;
- gouvernance RGPD complète.

### Router vers `contentieux-pi`

Si le dossier bascule au stade judiciaire ou précontentieux structuré sur
scraping, extraction substantielle ou réutilisation illicite.

## Axes d'analyse V2

### 1. Analyse de la structure au regard du droit d'auteur

Évaluer uniquement la **structure** :

- architecture de classement ;
- taxonomie ;
- indexation ;
- organisation et presentation des données ;
- distinction nette entre structure protégée et données brutes non protégées.

Si l'originalité de la structure est faible ou banale, le dire clairement.

### 2. Sui generis analysis

Évaluer :

- investissement substantiel ;
- constitution, vérification ou presentation du contenu ;
- distinction entre investissement de collecte et investissement de création
  du contenu.

Si l'investissement n'est pas documenté, le garder visible comme faiblesse
centrale.

### 3. Producer and title map

Vérifier :

- qui est auteur de la structure ;
- qui est producteur de la base ;
- qui exploité ;
- qui peut agir ;
- quelles cessions, licences ou CGU déjà en place modifient l'analyse.

### 4. Carte des risques d'accès et de réutilisation

Traiter séparément :

- usage interne ;
- licence B2B ;
- open data ;
- API publique ;
- scraping risque ou constate ;
- extraction / réutilisation substantielle ;
- restrictions déjà opposées (CGU, contrat, licence).

### 5. RGPD signal

Si `data_personal_status` est `yes`, `mixed` ou `unknown`, signaler :

- presence probable de données personnelles ;
- principaux points de vigilance ;
- besoin de bascule vers le extension données personnelles si la question devient
  dominante.

Ne pas transformer ce bloc en audit RGPD complet.

### 6. Posture contractuelle

Traduire en couche secondaire le regime retenu vers :

- `proprietary-license`
- `open-data-release`
- `api-access-license`
- `authorized-scraping-license`
- `hold-for-rgpd-review`

Ce bloc reste secondaire. Il ne remplace pas une rédaction contractuelle
détaillée.

## Seuil de préparation de la protection de la base

Le skill doit conclure sur :

- `ready`
- `partial`
- `blocked`

### `ready`

- structure et / ou investissement suffisamment qualifiables ;
- posture d'accès ou de réutilisation suffisamment comprise ;
- signal RGPD suffisamment borné ;
- prochaine étape exploitable.

### `partial`

- analyse exploitable ;
- mais avec hypothèses ou incertitudes `[à vérifier]`.

### `blocked`

- structure insuffisamment comprise ;
- investissement non documenté ;
- posture d'accès trop floue ;
- base personnelle / non personnelle trop incertaine.

En `blocked` :

- ne pas simuler de protection certaine ;
- ne pas pousser une posture contractuelle fermée comme si les fondements
  étaient stabilisés ;
- lister explicitement les manques à combler.

## Format de sortie V2

Produire exactement les 9 blocs suivants :

1. `Synthèse du dossier`
2. `Database Protection Readiness Gate`
3. `Analyse de la structure droit d'auteur`
4. `Analyse sui generis`
5. `Producer And Title Map`
6. `Carte des risques d'accès et de réutilisation`
7. `RGPD Signal`
8. `Posture contractuelle et routage de décision`
9. `Validation humaine`

### Contrat de `Routage de décision`

Utiliser uniquement :

- `route-to-copyright-structure-review`
- `route-to-investment-documentation`
- `prepare-proprietary-license`
- `prepare-open-data-release`
- `prepare-api-access-license`
- `prepare-scraping-enforcement-brief`
- `hold-for-rgpd-review`
- `hold-insufficient-basis`

Chaque route doit preciser la prochaine brique :

- `route-to-copyright-structure-review` -> `qualification-oeuvre`
- `route-to-investment-documentation` -> owner interne finance / ops / data
  pour documenter l'investissement et clarifier producteur / exploitant, puis
  relance de `bases-de-donnees`
- `prepare-proprietary-license` -> `licence-droit-auteur`
- `prepare-open-data-release` -> owner juridique open data avec validation
  humaine, et bascule vers le extension données personnelles si la branche RGPD
  devient dominante
- `prepare-api-access-license` -> `licence-droit-auteur`
- `prepare-scraping-enforcement-brief` -> `contentieux-pi`
- `hold-for-rgpd-review` -> extension données personnelles
- `hold-insufficient-basis` -> blocage explicite, sans pseudo-certitude

## Exemple de squelette de sortie

```markdown
# Analyse base de donnees - [nom]

*Brouillon soumis à validation par un avocat. Pas un avis juridique final ni
un contrat final.*

## 1. Synthèse du dossier

## 2. Database Protection Readiness Gate

## 3. Copyright Structure Analysis

## 4. Sui Generis Analysis

## 5. Producer And Title Map

## 6. Access And Reuse Risk Map

## 7. RGPD Signal

## 8. Contract Posture And Decision Routing

## 9. Human Validation
```

## Seuil non-juriste

Avant transmission :

- [ ] structure analysée séparément des données brutes
- [ ] investissement documenté ou manque explicite
- [ ] producteur / auteur / exploitant identifiés
- [ ] posture d'accès ou de réutilisation explicitee
- [ ] signal RGPD borné sans faux audit complet
- [ ] posture contractuelle secondaire coherente avec le regime retenu
- [ ] route finale explicite vers la bonne brique
- [ ] sortie marquée comme brouillon soumis à validation humaine

## Ton

Technique, structuré, prudent. Distinguer clairement faits, droit, analyse,
incertitudes, prochaine étape et validation humaine. Ne jamais sur-proteger ni
sous-proteger une base. Rappeler que la sortie reste un **brouillon**, pas un
contrat final ni un audit RGPD complet.
