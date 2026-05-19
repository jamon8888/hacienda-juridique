---
name: bases-de-donnees
description: >
  Skill V2 de qualification stricte des regimes de protection d'une base de
  donnees : structure auteur, droit sui generis, producteur / titulaire,
  acces, extraction et reutilisation. La posture contractuelle reste
  secondaire et le RGPD n'est traite qu'en signal. Brouillon soumis a
  validation par un avocat.
argument-hint: "[private|public-sector|saas|api|mixed]"
version: "2.0.0"
authors: ["Hacienda"]
tags: [bases-de-donnees, sui-generis, droit-auteur, scraping, open-data, api, RGPD]
---

# Skill - Bases de donnees V2

> **Qualification des protections, pas contrat final ni audit RGPD complet.**
> `bases-de-donnees` sert a qualifier les regimes de protection applicables a
> une base de donnees, a mesurer la robustesse de la structure auteur et du
> droit sui generis, puis a orienter vers la bonne posture contractuelle,
> privacy ou contentieuse. Il ne redige pas le contrat final, ne conduit pas
> seul l'audit RGPD et ne pilote pas seul le contentieux.

Reference de travail utile :
`references/bases-de-donnees-routing-and-output.md`

## Positionnement

`bases-de-donnees` V2 est le skill de :

1. qualification du droit d'auteur sur la structure ;
2. qualification du droit sui generis sur le contenu / l'investissement ;
3. cartographie du producteur, du titulaire et de l'exploitant ;
4. evaluation des risques d'acces, d'extraction, de reutilisation ou de
   scraping ;
5. signalement RGPD si des donnees personnelles sont impliquees ;
6. routage vers la bonne posture contractuelle ou contentieuse.

La branche contractuelle reste presente, mais secondaire. Le coeur du skill
reste la qualification des protections.

## Ce skill ne fait pas

- Ne remplace pas `qualification-oeuvre` pour une logique dominante
  d'originalite hors base de donnees.
- Ne remplace pas `logiciels-pi` pour la chaine de droits logiciel, repo ou
  SaaS en tant que produit logiciel.
- Ne remplace pas `contrefacon-droit-auteur` pour une logique contradictoire
  de reprise auteur.
- Ne remplace pas `licence-droit-auteur` pour la redaction detaillee d'une
  licence.
- Ne remplace pas le plugin donnees personnelles pour la conformite RGPD
  complete.
- Ne pilote pas seul un contentieux scraping / extraction / reutilisation.
- Ne remplace pas l'avis final d'un avocat ou d'un juriste habilite.

## Chargement du profil

Avant tout, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Rattacher ensuite :

- le role utilisateur ;
- la politique base de donnees (proprietaire / open data / mixte) ;
- le DPO ou le relais privacy ;
- l'avocat ou juriste validateur ;
- les preferences de licensing et d'API ;
- les contraintes budget / open data / monetisation.

Si le profil est absent, incomplet ou contient `[A CONFIGURER]`, la sortie
reste utilisable, mais les hypotheses non documentees doivent etre marquees
`[PROVISOIRE]`.

## Contrat d'entree V2

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
- investissement documente ;
- producteur, auteur de la structure, exploitant ;
- mode d'acces actuel ou projete ;
- donnees personnelles presentes ou non ;
- usage tiers constate ou redoute ;
- CGU, licence ou contrat deja en place si existants.

Tout manque reste `[a verifier]`.

## Frontieres de routage

### Route to `qualification-oeuvre`

Si la vraie question dominante est l'originalite d'une structure ou d'un
ensemble creatif, hors logique principale base de donnees.

### Route to `logiciels-pi`

Si la vraie question dominante porte sur :

- logiciel ;
- SaaS ;
- chaine de droits code / repo / dataset ;
- droits d'utilisation du produit logiciel.

### Route to `contrefacon-droit-auteur`

Si la logique dominante devient contradictoire sur la reprise d'une structure
ou d'un contenu protege au titre du droit d'auteur.

### Route to `licence-droit-auteur`

Si la qualification est suffisamment stabilisee et que le besoin devient la
redaction detaillee d'une licence.

### Route to plugin donnees personnelles

Si la vraie question dominante devient :

- base legale ;
- DPA ;
- registre ;
- AIPD ;
- gouvernance RGPD complete.

### Route to `contentieux-pi`

Si le dossier bascule au stade judiciaire ou precontentieux structure sur
scraping, extraction substantielle ou reutilisation illicite.

## Axes d'analyse V2

### 1. Copyright structure analysis

Evaluer uniquement la **structure** :

- architecture de classement ;
- taxonomie ;
- indexation ;
- organisation et presentation des donnees ;
- distinction nette entre structure protegee et donnees brutes non protegees.

Si l'originalite de la structure est faible ou banale, le dire clairement.

### 2. Sui generis analysis

Evaluer :

- investissement substantiel ;
- constitution, verification ou presentation du contenu ;
- distinction entre investissement de collecte et investissement de creation
  du contenu.

Si l'investissement n'est pas documente, le garder visible comme faiblesse
centrale.

### 3. Producer and title map

Verifier :

- qui est auteur de la structure ;
- qui est producteur de la base ;
- qui exploite ;
- qui peut agir ;
- quelles cessions, licences ou CGU deja en place modifient l'analyse.

### 4. Access and reuse risk map

Traiter separement :

- usage interne ;
- licence B2B ;
- open data ;
- API publique ;
- scraping risque ou constate ;
- extraction / reutilisation substantielle ;
- restrictions deja opposees (CGU, contrat, licence).

### 5. RGPD signal

Si `data_personal_status` est `yes`, `mixed` ou `unknown`, signaler :

- presence probable de donnees personnelles ;
- principaux points de vigilance ;
- besoin de bascule vers le plugin donnees personnelles si la question devient
  dominante.

Ne pas transformer ce bloc en audit RGPD complet.

### 6. Contract posture

Traduire en couche secondaire le regime retenu vers :

- `proprietary-license`
- `open-data-release`
- `api-access-license`
- `authorized-scraping-license`
- `hold-for-rgpd-review`

Ce bloc reste secondaire. Il ne remplace pas une redaction contractuelle
detaillee.

## Database Protection Readiness Gate

Le skill doit conclure sur :

- `ready`
- `partial`
- `blocked`

### `ready`

- structure et / ou investissement suffisamment qualifiables ;
- posture d'acces ou de reutilisation suffisamment comprise ;
- signal RGPD suffisamment borne ;
- prochaine etape exploitable.

### `partial`

- analyse exploitable ;
- mais avec hypotheses ou incertitudes `[a verifier]`.

### `blocked`

- structure insuffisamment comprise ;
- investissement non documente ;
- posture d'acces trop floue ;
- base personnelle / non personnelle trop incertaine.

En `blocked` :

- ne pas simuler de protection certaine ;
- ne pas pousser une posture contractuelle ferme comme si les fondements
  etaient stabilises ;
- lister explicitement les manques a combler.

## Format de sortie V2

Produire exactement les 9 blocs suivants :

1. `Case Snapshot`
2. `Database Protection Readiness Gate`
3. `Copyright Structure Analysis`
4. `Sui Generis Analysis`
5. `Producer And Title Map`
6. `Access And Reuse Risk Map`
7. `RGPD Signal`
8. `Contract Posture And Decision Routing`
9. `Human Validation`

### Contrat de `Decision Routing`

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
  humaine, et bascule vers le plugin donnees personnelles si la branche RGPD
  devient dominante
- `prepare-api-access-license` -> `licence-droit-auteur`
- `prepare-scraping-enforcement-brief` -> `contentieux-pi`
- `hold-for-rgpd-review` -> plugin donnees personnelles
- `hold-insufficient-basis` -> blocage explicite, sans pseudo-certitude

## Example output skeleton

```markdown
# Analyse base de donnees - [nom]

*Brouillon soumis a validation par un avocat. Pas un avis juridique final ni
un contrat final.*

## 1. Case Snapshot

## 2. Database Protection Readiness Gate

## 3. Copyright Structure Analysis

## 4. Sui Generis Analysis

## 5. Producer And Title Map

## 6. Access And Reuse Risk Map

## 7. RGPD Signal

## 8. Contract Posture And Decision Routing

## 9. Human Validation
```

## Gate non-juriste

Avant transmission :

- [ ] structure analysee separement des donnees brutes
- [ ] investissement documente ou manque explicite
- [ ] producteur / auteur / exploitant identifies
- [ ] posture d'acces ou de reutilisation explicitee
- [ ] signal RGPD borne sans faux audit complet
- [ ] posture contractuelle secondaire coherente avec le regime retenu
- [ ] route finale explicite vers la bonne brique
- [ ] sortie marquee comme brouillon soumis a validation humaine

## Emplacement des sorties

```text
outputs/bases-donnees-<projet-slug>-YYYY-MM-DD.md
```

## Ton

Technique, structure, prudent. Distinguer clairement faits, droit, analyse,
incertitudes, prochaine etape et validation humaine. Ne jamais sur-proteger ni
sous-proteger une base. Rappeler que la sortie reste un **brouillon**, pas un
contrat final ni un audit RGPD complet.
