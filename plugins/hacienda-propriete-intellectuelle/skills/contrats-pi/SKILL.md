---
name: contrats-pi
description: >
  Revue et redaction de contrats de propriete intellectuelle complets, quand
  l'objet principal du document est la PI : licence ou cession de brevet,
  NDA/secret, R&D collaborative, coexistence ou franchise marques, transfert
  de technologie et MTA. A utiliser pour un contrat PI autonome, pas pour
  quelques clauses PI dans un contrat plus large.
version: "1.0.0"
authors: ["Hacienda"]
tags: [contrats, licence-brevet, coexistence, NDA, R&D, franchise, transfert-technologie]
---

# Skill - Contrats de propriete intellectuelle

> **BROUILLON DE CONTRAT PI COMPLET OU NOTE DE REVUE COMPLETE, PAS ACTE
> DEFINITIF.**
>
> `contrats-pi` couvre les contrats dont l'objet principal est la propriete
> intellectuelle. Il sert a rediger un projet complet ou a faire une revue
> complete d'un contrat PI autonome.
>
> Il ne remplace pas `revue-clause-pi`, qui traite les clauses PI inserees dans
> des contrats plus larges.
>
> Les sorties sont des brouillons de travail. Elles exigent une validation
> humaine avant signature, envoi ou execution.

## Role

Ce skill sert quand il faut traiter un **contrat PI centre sur la PI elle-meme** :

- licence ou cession de brevet ;
- NDA / confidentialite avec fort enjeu PI ou secret d'affaires ;
- transfert de technologie et licence de savoir-faire ;
- R&D collaborative et partage de resultats ;
- coexistence de marques ou franchise avec volet PI structurant ;
- MTA biotech/pharma avec regime d'usage et de resultats sensible.

Il ne sert pas a commenter quelques clauses isolees au milieu d'un MSA, d'un
SOW, d'un contrat commercial, d'un procurement ou d'un contrat de travail.

## Frontiere avec les skills voisins

### Basculer vers `revue-clause-pi` quand

- la PI n'est qu'un bloc d'un contrat plus large ;
- la demande porte sur quelques clauses PI, un article PI, un extrait ou un
  bloc ownership / licence / inventions / OSS / data ;
- la sortie attendue est une note de revue ciblee, une issue list ou une
  fallback redline.

### Basculer vers les skills specialises quand

- cession de droits d'auteur pure -> `cession-droit-auteur` ;
- licence de droits d'auteur -> `licence-droit-auteur` ;
- base de donnees ou droit sui generis -> `bases-de-donnees` ;
- chaine de droits logiciel / data -> `revue-logiciel-donnees` ;
- revue de clause PI dans un contrat large -> `revue-clause-pi`.

### Rester dans `contrats-pi` quand

- le contrat est un contrat PI autonome ;
- la PI est l'objet principal du deal ;
- la sortie attendue est une architecture contractuelle complete ou une revue
  complete du document.

## Chargement du profil

Charger les preferences depuis le profil utilisateur :

- posture contractuelle par defaut ;
- juridiction par defaut ;
- modeles internes si disponibles ;
- approbateur contrats PI.

## Inputs minimaux

Ne pas demarrer l'analyse sans demander le minimum suivant.

1. **Mode** - `draft` ou `review`
2. **Contract family** - une seule parmi :
   - `patent-tech-transfer`
   - `nda-secret-knowhow`
   - `rnd-collaboration`
   - `trademark-coexistence-franchise`
   - `mta-life-sciences`
3. **Parties** - identite et pays
4. **Notre role** - titulaire, concédant, licencié, franchisé, franchisor,
   partenaire R&D, destinataire du materiel, autre
5. **IP scope** - titres, know-how, marques, resultats, materiel, software,
   data, ou combinaison
6. **Territory**
7. **Duration**
8. **Financial model** - forfait, royalties, mixte, gratuit, autre
9. **Business context** - exploitation, partenariat, due diligence, precontentieux,
   franchise, recherche, autre
10. **Jurisdiction**

Complements utiles :

- exclusivite ;
- titres exacts concernes ;
- contexte precontentieux ou transactionnel ;
- dependance a des registres d'opposabilite ;
- contraintes export / concurrence / RGPD ;
- calendrier de signature ou de closing.

Si un bloc critique manque, continuer seulement avec hypothese explicite et
marquage `[a verifier]`.

## Contract Families

### `patent-tech-transfer`

Usage :

- licence de brevet ;
- cession de brevet ;
- licence de savoir-faire ;
- transfert de technologie.

Enjeux dominants :

- perimetre exact des titres et revendications ;
- exclusivite ;
- royalties et assiette ;
- sous-licence ;
- grant-back et perfectionnements ;
- registres d'opposabilite ;
- TTBER / art. 101 TFUE.

### `nda-secret-knowhow`

Usage :

- NDA ;
- accord de confidentialite ;
- partage de savoir-faire non titre ;
- discussions prealables a un deal PI ou technologique.

Enjeux dominants :

- definition des informations ;
- exceptions ;
- duree ;
- usage autorise ;
- residuals ;
- PI generee pendant les discussions ;
- protection secret des affaires.

### `rnd-collaboration`

Usage :

- contrat de R&D collaborative ;
- recherche conjointe ;
- innovation commune ;
- partage background / foreground / sideground.

Enjeux dominants :

- attribution des resultats ;
- acces croises ;
- exploitation commerciale ;
- publication ;
- couts de protection ;
- sortie / retrait / defaillance ;
- exemption R&D.

### `trademark-coexistence-franchise`

Usage :

- accord de coexistence de marques ;
- licence de marque avec forte composante PI ;
- franchise avec savoir-faire et signes distinctifs structurants.

Enjeux dominants :

- delimination du perimetre ;
- non-opposition ;
- anti-confusion ;
- cession / changement de controle ;
- DIP et savoir-faire ;
- antitrust.

### `mta-life-sciences`

Usage :

- MTA biotech/pharma ;
- transfert de materiel biologique ou chimique ;
- usage recherche / commercial sous contraintes PI.

Enjeux dominants :

- usage permis ;
- materiel et produits derives ;
- propriete sur les resultats ;
- publication ;
- retour / destruction ;
- limites d'exploitation.

## Family checklists

### `patent-tech-transfer`

Clauses critiques :

| Clause | Points d'attention | Risque si absente/mal redigee |
|--------|-------------------|-------------------------------|
| Objet et revendications licenciees | Lister precisement les titres et le perimetre | Litige sur le champ |
| Territoire | Pays ou zones couverts | Exploitation hors champ = contrefacon |
| Exclusivite | Exclusive / sole / non-exclusive | Perte de controle ou ambiguite |
| Duree | Fixe ou vie du titre | Risque antitrust / duree floue |
| Redevances | Assiette, base, echeances | Litige financier |
| Sous-licence | Autorisee / interdite / encadree | Perte de maitrise |
| Perfectionnements | Grant-back, licences retour | Risque art. 101 TFUE |
| Non-contestation | Limites post-Windsurfing | Clauses fragiles |
| Garanties | Titularite, validite, non-atteinte tiers | Responsabilite du concedant |
| Formalites | Inscription RNB / registre EP / national | Inopposabilite |

### `nda-secret-knowhow`

Clauses critiques :

| Clause | Points d'attention |
|--------|-------------------|
| Definition des infos confidentielles | Trop large ou trop etroite |
| Exceptions | Domaine public, developpement independant, obligation legale |
| Duree | Standard 2-5 ans ou tant que secret maintenu |
| Usage autorise | Evaluation seulement ou exploitation encadree |
| Restitution / destruction | Sort des copies et derives |
| Residuals | Risque de vidage du NDA |
| PI generee | Sort des resultats pendant les discussions |
| Juridiction | Loi + tribunal ou arbitrage |

### `rnd-collaboration`

Clauses critiques :

| Clause | Points d'attention |
|--------|-------------------|
| Background IP | Description exhaustive des apports |
| Foreground IP | Attribution, copropriete, repartition |
| Sideground IP | Developpements paralleles |
| Acces croises | Licences sur background / foreground |
| Publication | Delai de revue avant divulgation |
| Exploitation commerciale | Qui exploite quoi, ou, quand |
| Financement | Depots, annuites, maintien |
| Sortie / defaillance | Sort des resultats si un partenaire sort |

### `trademark-coexistence-franchise`

Clauses critiques :

| Clause | Points d'attention |
|--------|-------------------|
| Delimitation | Territoire, classes, canaux, visuel |
| Non-opposition | Portee temporelle et materielle |
| Mesures anti-confusion | Packaging, logo, communication |
| Duree / resiliation | Vie des marques ou duree fixe |
| Cession / changement controle | Preemption ou consentement |
| Savoir-faire / DIP | Franchise et obligations precontractuelles |
| Antitrust | Pas de partition de marche deguisee |

### `mta-life-sciences`

Clauses critiques :

| Clause | Points d'attention |
|--------|-------------------|
| Materiel transfere | Identification et quantites |
| Usage permis | Recherche seule ou usage mixte |
| Produits derives | Regime de propriete et usage |
| Resultats | Titularite, licences, publication |
| Retour / destruction | Fin de projet ou breach |
| Responsabilite / biosafety | Conformite et risques |

## Competition and regulatory issues

### TTBER (UE 316/2014) - Transfert de technologie

| Critere | Seuil | Effet |
|---------|-------|-------|
| Parts de marche combinees (concurrents) | <= 20% | Exemption par categorie |
| Parts de marche de chaque partie (non-concurrents) | <= 30% | Exemption par categorie |
| Au-dela des seuils | > 20% / 30% | Analyse individuelle art. 101(3) TFUE |

Clauses noires :

- fixation de prix de revente ;
- repartition de marches ou clienteles entre concurrents ;
- restriction de ventes passives ;
- limitation de production hors cadres permis.

Clauses grises :

- grant-back exclusif ;
- non-contestation du titre ;
- restriction R&D hors domaine couvert.

### R&D collaborative

Verifier si le montage releve d'une logique d'exemption R&D ou s'il faut une
analyse plus fine des parts de marche et restrictions concurrentielles.

### Franchise / coexistence

Verifier l'absence de partage de marche deguise, surtout si la delimitation
territoriale ou de clientele devient trop rigide.

## Registration and opposability actions

| Droit | Formalite | Registre | Effet |
|-------|-----------|----------|-------|
| Brevet FR | Inscription au RNB | INPI | Inopposable aux tiers si non inscrit |
| Brevet EP | Registre EP ou registre national selon validation | OEB / offices nationaux | Opposabilite par pays |
| Marque FR | Inscription au RNM | INPI | Inopposable aux tiers |
| Marque UE | Inscription au registre EUIPO | EUIPO | Inopposable aux tiers |
| D&M FR | Inscription au registre D&M | INPI | Inopposable |
| Savoir-faire | Pas de registre | - | Protection contractuelle seule |

## Common output rules

Toute sortie doit distinguer :

1. faits lus ;
2. hypotheses ;
3. clauses ou informations manquantes ;
4. risques juridiques ;
5. arbitrages business ;
6. formalites / actions post-signature ;
7. validation humaine obligatoire.

Toute source ou piece non consultee reste `[a verifier]`.

## Output contract

### Mode `draft`

Produire exactement les huit blocs suivants, dans cet ordre :

1. `Contract Snapshot`
2. `Clause Architecture`
3. `Critical PI Terms`
4. `Registration and Opposability Actions`
5. `Competition and Regulatory Issues`
6. `Negotiation Variables`
7. `Draft Contract`
8. `Human Validation`

### Mode `review`

Produire exactement les huit blocs suivants, dans cet ordre :

1. `Contract Snapshot`
2. `Critical PI Terms`
3. `Issue List`
4. `Registration and Opposability Actions`
5. `Competition and Regulatory Issues`
6. `Negotiation Position`
7. `Red Flags and Missing Inputs`
8. `Human Validation`

## Error handling and guardrails

Limiter l'analyse si l'un des points suivants manque :

- titres ou actif PI non identifies ;
- territoire inconnu ;
- role exact des parties non etabli ;
- texte contractuel incomplet en `review` ;
- structure financiere non connue alors qu'elle conditionne le montage ;
- contrainte concurrence plausible mais parts de marche inconnues.

Dans ces cas :

1. expliciter l'hypothese ;
2. marquer la zone `[a verifier]` ;
3. reduire toute recommandation agressive ou definitive.

## Gate non-juriste

- [ ] Contrat PI autonome ou bloc de clauses seulement correctement qualifies
- [ ] `contract_family` correctement choisie
- [ ] Objet PI precisement delimite
- [ ] Exclusivite / territoire / duree clarifies
- [ ] Conditions financieres lisibles
- [ ] Risque concurrence / TTBER examine si pertinent
- [ ] Formalites d'opposabilite identifiees
- [ ] Sort des droits post-contrat traite
- [ ] Validation humaine requise visible

## Emplacement des sorties

```text
outputs/contrat-pi-<contract-family>-<parties-slug>-YYYY-MM-DD.md
```

## Ce skill ne fait pas

- signer ou executer le contrat ;
- reviser quelques clauses PI dans un contrat large ;
- rediger les contrats auteur purs ;
- rediger ou revoir la chaine de droits logiciel/data ;
- gerer l'inscription effective aux registres ;
- rendre un avis final de concurrence hors cadrage de premier niveau.

## Ton

Technique, structure, orienté decision. Toujours distinguer faits, hypothese,
risques, actions post-signature et validation humaine.
