---
name: licence-droit-auteur
description: >
  Skill V2 de preparation stricte d'une licence de droits d'auteur :
  qualification minimale des preconditions, choix de lane, garde-fous
  L.131-3 / L.131-4 CPI, clauses critiques et risque de requalification en
  cession. La diffusion ouverte reste possible via une lane bornee
  `creative-commons`. Brouillon soumis a validation par un avocat.
argument-hint: "[exclusive|non-exclusive|creative-commons|software-eula|saas-user-content]"
version: "2.0.0"
authors: ["Hacienda"]
tags: [droit-auteur, licence, creative-commons, eula, saas, L131-3, L131-4, CPI]
---

# Skill - Licence droit auteur V2

> **Preparation de licence stricte, pas cession ni contrat final signable.**
> `licence-droit-auteur` sert a structurer un brouillon de licence de droits
> d'auteur, a choisir la bonne lane, a verifier les preconditions auteur et a
> fermer le routage vers le bon skill voisin quand le dossier sort de son
> perimetre. Il ne redige pas une cession, ne remplace pas la qualification de
> l'oeuvre, ne tranche pas seul un regime logiciel ou base de donnees, et ne
> produit jamais un instrument final signable sans validation humaine.

Reference de travail utile :
`references/licence-droit-auteur-routing-and-output.md`

## Positionnement

`licence-droit-auteur` V2 est le skill de :

1. preparation d'une licence de droits d'auteur ;
2. choix du `license_track` approprie ;
3. verification des preconditions `L.131-3` et `L.131-4` CPI ;
4. cadrage du risque de requalification en cession ;
5. production d'un brouillon structure avec clauses critiques ;
6. routage ferme vers la bonne brique voisine si le sujet dominant n'est pas
   une simple licence.

Les lanes `exclusive`, `non-exclusive`, `software-eula` et
`saas-user-content` constituent le coeur de redaction du skill.
`creative-commons` reste une lane secondaire de diffusion ouverte standardisee
et ne doit pas etre traitee comme un faux contrat negocie sur mesure.

## Ce skill ne fait pas

- Ne remplace pas `qualification-oeuvre` quand l'originalite, la nature de
  l'oeuvre ou la titularite initiale sont encore trop incertaines.
- Ne redige pas une cession de droits ; route vers `cession-droit-auteur`.
- Ne remplace pas `logiciels-pi` quand le coeur du sujet est le regime
  logiciel, l'interoperabilite, le code source ou la diffusion open source.
- Ne remplace pas `bases-de-donnees` quand le sujet dominant porte sur la
  structure auteur d'une base, le droit sui generis, l'API, l'open data ou le
  scraping.
- Ne remplace pas `contrats-pi` quand la licence n'est qu'un volet d'un
  contrat PI plus large.
- Ne remplace pas le plugin donnees personnelles pour une gouvernance RGPD
  complete.
- Ne remplace pas l'avis final d'un avocat ou d'un juriste habilite.

## Chargement du profil

Avant tout, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Rattacher ensuite :

- le role utilisateur ;
- la preference licence / cession si elle existe ;
- la posture par defaut sur la remuneration ;
- l'approbateur contrat auteur ;
- les contraintes business de diffusion, de sous-licence et de territoire ;
- la politique logiciel / base de donnees / RGPD si le dossier les touche.

Si le profil est absent, incomplet ou contient `[A CONFIGURER]`, la sortie
reste utilisable, mais les hypotheses non documentees doivent etre marquees
`[PROVISOIRE]`.

## Contrat d'entree V2

Le skill doit expliciter ou deriver :

- `license_track`: `exclusive`, `non-exclusive`, `creative-commons`,
  `software-eula`, `saas-user-content`
- `work_status`: `qualified`, `partially-qualified`, `uncertain`
- `title_status`: `clear`, `mixed`, `uncertain`
- `counterparty_profile`: `publisher`, `producer`, `platform`, `customer`,
  `internal-group`, `public`, `mixed`
- `economic_model`: `royalty`, `flat-fee`, `free-open`, `subscription`,
  `mixed`
- `reuse_scope`: `narrow`, `standard`, `broad`, `global-platform`
- `data_personal_status`: `yes`, `no`, `mixed`, `unknown`

### Minimal Fact Set

- oeuvre ou corpus vise ;
- identite du concedant ;
- identite du licencie ou du public cible ;
- perimetre des droits accordes ;
- duree ;
- territoire ;
- modele economique minimal ;
- sous-licence oui / non / incertain.

Tout manque reste `[a verifier]`.

## Frontieres de routage

### Route to `qualification-oeuvre`

Si la vraie question dominante est encore :

- l'originalite ;
- la qualification de l'oeuvre ;
- la chaine de creation ;
- la titularite initiale insuffisamment etablie.

### Route to `cession-droit-auteur`

Si la demande ressemble a :

- un transfert complet ou quasi complet ;
- une exclusivite trop large et quasi definitive ;
- une logique economique de vente de droits plutot que d'autorisation
  d'exploitation.

### Route to `logiciels-pi`

Si le coeur du sujet est :

- le regime logiciel ;
- l'interoperabilite ;
- la retro-ingenierie ;
- le code source ;
- la compatibilite open source ;
- la structure d'un produit logiciel.

### Route to `bases-de-donnees`

Si le coeur du sujet est :

- la structure auteur d'une base ;
- le droit sui generis ;
- l'extraction / reutilisation de donnees ;
- l'API, le scraping ou l'open data.

### Route to `contrats-pi`

Si la licence n'est qu'un volet d'un contrat plus large :

- partenariat R&D ;
- distribution complexe ;
- coexistence ;
- franchise ;
- transfert technologique plus large.

### Route to plugin donnees personnelles

Si la question dominante devient :

- la base legale ;
- le DPA ;
- la gouvernance RGPD ;
- la conformite privacy complete.

## Axes d'analyse V2

### 1. Work and title preconditions

Verifier avant toute redaction :

- que l'oeuvre ou le corpus est suffisamment qualifie ;
- que le concedant peut legitimement concéder les droits ;
- que les co-auteurs, employeurs, producteurs ou cessionnaires eventuels sont
  identifies ;
- que la lane licence est bien l'instrument adapte et ne masque pas une
  cession.

### 2. License track selection

Traiter la demande dans une lane fermee :

- `exclusive`
- `non-exclusive`
- `creative-commons`
- `software-eula`
- `saas-user-content`

Ne jamais melanger deux lanes sans l'indiquer explicitement en `mixed factual
background` tout en gardant une seule sortie principale.

### 3. Economic and exploitation structure

Verifier :

- droits exacts accordes ;
- domaines d'exploitation ;
- territoire ;
- duree ;
- exclusivite ou non ;
- remuneration ;
- sous-licence ;
- usage cible et supports.

### 4. Critical clauses

Toujours traiter au minimum :

- objet ;
- droits accordes ;
- domaines d'exploitation ;
- territoire ;
- duree ;
- remuneration ;
- droit moral / attribution ;
- sous-licence ;
- garanties ;
- responsabilite ;
- resiliation ;
- donnees / DPA si applicable.

### 5. Requalification and compliance risks

Rendre visibles :

- risque de requalification en cession ;
- faiblesse sur `L.131-3` ;
- faiblesse sur `L.131-4` ;
- tension sur la duree, le territoire ou la sous-licence ;
- points RGPD ou base de donnees annexes ;
- ambiguite sur la titularite.

## Lanes V2

### `exclusive`

Insister sur :

- perimetre exact des droits ;
- duree raisonnable ;
- territoire ;
- exclusivite precise ;
- minimum d'exploitation ;
- audit ;
- sous-licence ;
- sortie / reversion ;
- risque de requalification.

### `non-exclusive`

Insister sur :

- usage autorise ;
- supports ;
- audience ;
- duree ;
- territoire ;
- restrictions ;
- attribution ;
- sous-licence interdite ou encadree.

### `creative-commons`

Traiter cette lane comme une politique de diffusion ouverte standardisee :

- variante proposee ;
- obligations d'attribution ;
- effet SA / ND / NC ;
- irrevocabilite ;
- risques de diffusion ;
- incompatibilites principales ;
- validation humaine avant mise en ligne.

Ne pas fabriquer un faux contrat CC sur mesure.

### `software-eula`

Rester sur la structure de licence et renvoyer au besoin vers `logiciels-pi`
pour le fond technique du regime logiciel.

Points cibles :

- usage autorise ;
- postes / utilisateurs ;
- acces ;
- mise a jour ;
- support ;
- interdictions usuelles ;
- reversibilite si necessaire.

### `saas-user-content`

Traiter :

- droits techniques minimums de la plateforme ;
- reproduction serveur ;
- affichage ;
- adaptation technique ;
- moderation et retrait ;
- duree apres cloture ;
- donnees personnelles ;
- sous-licence a des tiers si applicable ;
- articulation CGU / DPA / politique contenus.

## License Readiness Gate

Le skill doit conclure sur :

- `ready`
- `partial`
- `blocked`

### `ready`

Le dossier permet un brouillon de licence exploitable.

### `partial`

Le skill peut produire un brouillon, mais doit maintenir :

- `[PROVISOIRE]`
- `[a verifier]`
- `[A COMPLETER]`

### `blocked`

Bloquer si :

- l'oeuvre est trop incertaine ;
- la titularite est trop incertaine ;
- la demande ressemble en realite a une cession ;
- le sujet est dominamment logiciel ou base de donnees sans analyse amont ;
- le contrat vise est plus large qu'une simple licence.

## Format de sortie V2

La sortie doit etre stabilisee en 9 blocs.

1. `Case Snapshot`
2. `License Readiness Gate`
3. `Work And Title Preconditions`
4. `Chosen License Track`
5. `Economic And Exploitation Structure`
6. `Critical Clauses`
7. `Requalification And Compliance Risks`
8. `Decision Routing`
9. `Human Validation`

## Modele de sortie

Produire la sortie finale dans une quadruple fence Markdown :

````markdown
# LICENSE PREPARATION - [OEUVRE / CORPUS]

*Brouillon de travail Hacienda. Validation humaine obligatoire avant usage
contractuel.*

## 1. Case Snapshot

- `license_track` :
- concedant :
- licencie / public cible :
- oeuvre / corpus :
- exploitation cible :

## 2. License Readiness Gate

- statut : `ready|partial|blocked`
- justification :

## 3. Work And Title Preconditions

- qualification oeuvre :
- titularite :
- points `[a verifier]` :

## 4. Chosen License Track

- lane retenue :
- pourquoi cette lane :
- pourquoi pas cession :

## 5. Economic And Exploitation Structure

- droits accordes :
- territoire :
- duree :
- remuneration :
- sous-licence :
- restrictions :

## 6. Critical Clauses

- objet :
- droits accordes :
- exploitation :
- droit moral / attribution :
- garanties :
- responsabilite :
- resiliation :
- RGPD / DPA si applicable :

## 7. Requalification And Compliance Risks

- L.131-3 :
- L.131-4 :
- risque de requalification :
- autres risques :

## 8. Decision Routing

- route finale :
- actions suivantes :

## 9. Human Validation

- avocat / juriste requis :
- approbateur interne :
- clauses a arbitrer :
````

## Decision Routing ferme

Le skill doit se terminer par une seule route principale :

- `prepare-exclusive-license-draft`
- `prepare-non-exclusive-license-draft`
- `prepare-creative-commons-release`
- `prepare-software-eula-draft`
- `prepare-saas-user-content-license`
- `route-to-work-qualification`
- `route-to-assignment`
- `route-to-software-regime-review`
- `route-to-database-regime-review`
- `route-to-broader-pi-contract`
- `hold-for-rgpd-review`
- `hold-insufficient-basis`

## Gate non-juriste

Avant transmission au validateur humain, verifier :

- [ ] le `license_track` retenu est coherent ;
- [ ] la distinction licence / cession est claire ;
- [ ] les preconditions `L.131-3` sont couvertes ;
- [ ] la posture `L.131-4` est explicite ;
- [ ] la titularite du concedant est suffisamment documentee ;
- [ ] le risque logiciel / base de donnees / RGPD n'est pas sous-evalue ;
- [ ] la sortie contient les marqueurs `[PROVISOIRE]`, `[a verifier]` ou
      `[A COMPLETER]` quand necessaire.

## Emplacement des sorties

```text
outputs/licence-auteur-<oeuvre-slug>-YYYY-MM-DD.md
```

## Ton

Juridique, precis, borne. Toujours distinguer :

- faits ;
- droit ;
- analyse ;
- risques ;
- decisions ;
- validation humaine.
