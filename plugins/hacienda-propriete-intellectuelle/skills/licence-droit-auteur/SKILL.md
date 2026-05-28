---
name: licence-droit-auteur
description: >
  Skill V2 de préparation stricte d'une licence de droits d'auteur :
  qualification minimale des préconditions, choix de voie, garde-fous
  L.131-3 / L.131-4 CPI, clauses critiques et risque de requalification en
  cession. La diffusion ouverte reste possible via une voie bornée
  `creative-commons`. Brouillon soumis à validation par un avocat.
argument-hint: "[exclusive|non-exclusive|creative-commons|software-eula|saas-user-content]"
version: "2.0.0"
authors: ["Hacienda"]
tags: [droit-auteur, licence, creative-commons, eula, saas, L131-3, L131-4, CPI]
---

# Skill - Licence droit auteur V2

> **Préparation de licence stricte, pas cession ni contrat final signable.**
> `licence-droit-auteur` sert à structurer un brouillon de licence de droits
> d'auteur, à choisir la bonne voie, à vérifier les préconditions auteur et à
> fermer le routage vers le bon skill voisin quand le dossier sort de son
> périmètre. Il ne rédige pas une cession, ne remplace pas la qualification de
> l'œuvre, ne tranche pas seul un régime logiciel ou base de données, et ne
> produit jamais un instrument final signable sans validation humaine.

Référence de travail utile :
`references/licence-droit-auteur-routing-and-output.md`

## Examples

<example>
<user>/h-pi:licence-droit-auteur [exclusive|non-exclusive|creative-commons|software-eula|saas-user-content]</user>
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
- la préférence licence / cession si elle existe ;
- la posture par défaut sur la rémunération ;
- l'approbateur contrat auteur ;
- les contraintes business de diffusion, de sous-licence et de territoire ;
- la politique logiciel / base de données / RGPD si le dossier les touche.

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
outputs/licence-auteur-<oeuvre-slug>-YYYY-MM-DD.md
```

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

## Positionnement

`licence-droit-auteur` V2 est le skill de :

1. préparation d'une licence de droits d'auteur ;
2. choix du `license_track` approprié ;
3. vérification des préconditions `L.131-3` et `L.131-4` CPI ;
4. cadrage du risque de requalification en cession ;
5. production d'un brouillon structuré avec clauses critiques ;
6. routage fermé vers la bonne brique voisine si le sujet dominant n'est pas
   une simple licence.

Les voies `exclusive`, `non-exclusive`, `software-eula` et
`saas-user-content` constituent le coeur de rédaction du skill.
`creative-commons` reste une voie secondaire de diffusion ouverte standardisée
et ne doit pas être traitée comme un faux contrat négocié sur mesure.

## Ce skill ne fait pas

- Ne remplace pas `qualification-oeuvre` quand l'originalité, la nature de
  l'œuvre ou la titularité initiale sont encore trop incertaines.
- Ne rédige pas une cession de droits ; route vers `cession-droit-auteur`.
- Ne remplace pas `logiciels-pi` quand le coeur du sujet est le régime
  logiciel, l'interopérabilité, le code source ou la diffusion open source.
- Ne remplace pas `bases-de-donnees` quand le sujet dominant porte sur la
  structure auteur d'une base, le droit sui generis, l'API, l'open data ou le
  scraping.
- Ne remplace pas `contrats-pi` quand la licence n'est qu'un volet d'un
  contrat PI plus large.
- Ne remplace pas le extension données personnelles pour une gouvernance RGPD
  complète.
- Ne remplace pas l'avis final d'un avocat ou d'un juriste habilité.

## Contrat d'entrée V2

Le skill doit expliciter ou dériver :

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

- œuvre ou corpus visé ;
- identité du concédant ;
- identité du licencié ou du public cible ;
- périmètre des droits accordés ;
- durée ;
- territoire ;
- modèle économique minimal ;
- sous-licence oui / non / incertain.

Tout manque reste `[à vérifier]`.

## Frontieres de routage

### Router vers `qualification-oeuvre`

Si la vraie question dominante est encore :

- l'originalité ;
- la qualification de l'œuvre ;
- la chaîne de création ;
- la titularité initiale insuffisamment établie.

### Router vers `cession-droit-auteur`

Si la demande ressemble à :

- un transfert complet ou quasi complet ;
- une exclusivité trop large et quasi définitive ;
- une logique économique de vente de droits plutôt que d'autorisation
  d'exploitation.

### Router vers `logiciels-pi`

Si le coeur du sujet est :

- le régime logiciel ;
- l'interopérabilité ;
- la rétro-ingénierie ;
- le code source ;
- la compatibilité open source ;
- la structure d'un produit logiciel.

### Router vers `bases-de-donnees`

Si le coeur du sujet est :

- la structure auteur d'une base ;
- le droit sui generis ;
- l'extraction / réutilisation de données ;
- l'API, le scraping ou l'open data.

### Router vers `contrats-pi`

Si la licence n'est qu'un volet d'un contrat plus large :

- partenariat R&D ;
- distribution complexe ;
- coexistence ;
- franchise ;
- transfert technologique plus large.

### Router vers le extension données personnelles

Si la question dominante devient :

- la base légale ;
- le DPA ;
- la gouvernance RGPD ;
- la conformité privacy complète.

## Axes d'analyse V2

### 1. Préconditions sur l'œuvre et la titularité

Vérifier avant toute rédaction :

- que l'œuvre ou le corpus est suffisamment qualifié ;
- que le concédant peut légitimement concéder les droits ;
- que les co-auteurs, employeurs, producteurs ou cessionnaires éventuels sont
  identifiés ;
- que la voie licence est bien l'instrument adapté et ne masque pas une
  cession.

### 2. Branche de licence sélectionnée

Traiter la demande dans une voie fermée :

- `exclusive`
- `non-exclusive`
- `creative-commons`
- `software-eula`
- `saas-user-content`

Ne jamais mélanger deux voies sans l'indiquer explicitement en `mixed factual
background` tout en gardant une seule sortie principale.

### 3. Structure économique et d'exploitation

Vérifier :

- droits exacts accordés ;
- domaines d'exploitation ;
- territoire ;
- durée ;
- exclusivité ou non ;
- rémunération ;
- sous-licence ;
- usage cible et supports.

### 4. Clauses critiques

Toujours traiter au minimum :

- objet ;
- droits accordés ;
- domaines d'exploitation ;
- territoire ;
- durée ;
- rémunération ;
- droit moral / attribution ;
- sous-licence ;
- garanties ;
- responsabilité ;
- résiliation ;
- données / DPA si applicable.

### 5. Risques de requalification et de conformité

Rendre visibles :

- risque de requalification en cession ;
- faiblesse sur `L.131-3` ;
- faiblesse sur `L.131-4` ;
- tension sur la durée, le territoire ou la sous-licence ;
- points RGPD ou base de données annexes ;
- ambiguïté sur la titularité.

## Voies V2

### `exclusive`

Insister sur :

- périmètre exact des droits ;
- durée raisonnable ;
- territoire ;
- exclusivité précise ;
- minimum d'exploitation ;
- audit ;
- sous-licence ;
- sortie / reversion ;
- risque de requalification.

### `non-exclusive`

Insister sur :

- usage autorisé ;
- supports ;
- audience ;
- durée ;
- territoire ;
- restrictions ;
- attribution ;
- sous-licence interdite ou encadrée.

### `creative-commons`

Traiter cette voie comme une politique de diffusion ouverte standardisée :

- variante proposée ;
- obligations d'attribution ;
- effet SA / ND / NC ;
- irrévocabilité ;
- risques de diffusion ;
- incompatibilités principales ;
- validation humaine avant mise en ligne.

Ne pas fabriquer un faux contrat CC sur mesure.

### `software-eula`

Rester sur la structure de licence et renvoyer au besoin vers `logiciels-pi`
pour le fond technique du régime logiciel.

Points cibles :

- usage autorisé ;
- postes / utilisateurs ;
- accès ;
- mise à jour ;
- support ;
- interdictions usuelles ;
- réversibilité si nécessaire.

### `saas-user-content`

Traiter :

- droits techniques minimums de la plateforme ;
- reproduction serveur ;
- affichage ;
- adaptation technique ;
- modération et retrait ;
- durée après clôture ;
- données personnelles ;
- sous-licence à des tiers si applicable ;
- articulation CGU / DPA / politique contenus.

## Seuil de préparation de la licence

Le skill doit conclure sur :

- `ready`
- `partial`
- `blocked`

### `ready`

Le dossier permet un brouillon de licence exploitable.

### `partial`

Le skill peut produire un brouillon, mais doit maintenir :

- `[PROVISOIRE]`
- `[à vérifier]`
- `[À COMPLÉTER]`

### `blocked`

Bloquer si :

- l'œuvre est trop incertaine ;
- la titularité est trop incertaine ;
- la demande ressemble en réalité à une cession ;
- le sujet est dominamment logiciel ou base de données sans analyse amont ;
- le contrat visé est plus large qu'une simple licence.

## Format de sortie V2

La sortie doit être stabilisée en 9 blocs.

1. `Synthèse du dossier`
2. `Seuil de préparation de la licence`
3. `Préconditions sur l'œuvre et la titularité`
4. `Branche de licence choisie`
5. `Structure économique et d'exploitation`
6. `Clauses critiques`
7. `Risques de requalification et de conformité`
8. `Routage de décision`
9. `Validation humaine`

## Modèle de sortie

Produire la sortie finale dans une quadruple fence Markdown :

````markdown
# PRÉPARATION DE LICENCE - [ŒUVRE / CORPUS]

*Brouillon de travail Hacienda. Validation humaine obligatoire avant usage
contractuel.*

## 1. Synthèse du dossier

- `license_track` :
- concedant :
- licencie / public cible :
- œuvre / corpus :
- exploitation cible :

## 2. Seuil de préparation de la licence

- statut : `ready|partial|blocked`
- justification :

## 3. Préconditions sur l'œuvre et la titularité

- qualification œuvre :
- titularité :
- points `[à vérifier]` :

## 4. Branche de licence choisie

- lane retenue :
- pourquoi cette lane :
- pourquoi pas cession :

## 5. Structure économique et d'exploitation

- droits accordés :
- territoire :
- durée :
- rémunération :
- sous-licence :
- restrictions :

## 6. Clauses critiques

- objet :
- droits accordés :
- exploitation :
- droit moral / attribution :
- garanties :
- responsabilité :
- résiliation :
- RGPD / DPA si applicable :

## 7. Risques de requalification et de conformité

- L.131-3 :
- L.131-4 :
- risque de requalification :
- autres risques :

## 8. Routage de décision

- route finale :
- actions suivantes :

## 9. Validation humaine

- avocat / juriste requis :
- approbateur interne :
- clauses à arbitrer :
````

## Routage de décision fermé

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

## Seuil non-juriste

Avant transmission au validateur humain, vérifier :

- [ ] le `license_track` retenu est cohérent ;
- [ ] la distinction licence / cession est claire ;
- [ ] les préconditions `L.131-3` sont couvertes ;
- [ ] la posture `L.131-4` est explicite ;
- [ ] la titularité du concédant est suffisamment documentée ;
- [ ] le risque logiciel / base de données / RGPD n'est pas sous-évalué ;
- [ ] la sortie contient les marqueurs `[PROVISOIRE]`, `[à vérifier]` ou
      `[À COMPLÉTER]` quand nécessaire.

## Ton

Juridique, précis, borné. Toujours distinguer :

- faits ;
- droit ;
- analyse ;
- risques ;
- décisions ;
- validation humaine.
