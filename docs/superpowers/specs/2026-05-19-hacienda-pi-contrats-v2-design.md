---
title: Contrats PI V2
status: proposed
owner: Hacienda
date: 2026-05-19
---

# Contrats PI V2

## Summary

Faire evoluer `contrats-pi` d'un gros skill contractuel lineaire vers un
orchestrateur de **contrats PI complets**, avec :

- une frontiere nette avec `revue-clause-pi` ;
- des familles de contrats explicites ;
- un contrat d'entree plus precis ;
- des sorties plus stables pour `draft` et `review` ;
- un cadrage plus strict des formalites d'opposabilite, de la concurrence et
  des escalades humaines.

## Contexte

Le skill actuel `contrats-pi` est solide sur le fond, mais il reste un bloc
V1 assez lineaire. Il couvre en une seule surface :

- licence et cession de brevet ;
- coexistence de marques ;
- NDA et secret d'affaires ;
- R&D collaborative ;
- transfert de technologie ;
- franchise PI ;
- MTA biotech/pharma.

Le probleme n'est pas doctrinal. Le probleme est structurel :

1. le skill ne distingue que `--draft` et `--review`, alors que plusieurs
   familles contractuelles ont des logiques tres differentes ;
2. la frontiere avec `revue-clause-pi` existe maintenant dans le repo mais
   `contrats-pi` n'est pas encore repositionne autour de cette frontiere ;
3. les sorties restent trop generiques pour servir de contrat stable avec les
   autres skills, notamment `audit-pi-ma`.

## Goals

1. Recentrer `contrats-pi` sur les **contrats PI complets et PI-centriques**.
2. Rendre explicites les familles de contrats prises en charge.
3. Stabiliser un contrat d'entree commun avec une seconde dimension de
   qualification par famille.
4. Stabiliser des sorties `draft` et `review` plus actionnables.
5. Rendre visible ce qui releve :
   - de la redaction complete ;
   - de la revue complete ;
   - des formalites de registre ;
   - des risques concurrence / TTBER / R&D ;
   - de la validation humaine obligatoire.

## Non-Goals

1. Ne pas scinder `contrats-pi` en 5 skills distincts dans ce lot.
2. Ne pas transformer `contrats-pi` en simple reviewer de clauses isolees.
3. Ne pas lui faire remplacer `cession-droit-auteur`, `licence-droit-auteur`,
   `bases-de-donnees` ou `revue-clause-pi`.
4. Ne pas introduire de depot automatise aux registres INPI / EUIPO / OEB.
5. Ne pas couvrir les contrats purement corporate, fiscal ou employment hors
   angle PI.

## Product Positioning

`contrats-pi` V2 devient le point d'entree pour les **contrats dont l'objet
principal est la PI**.

Il ne sert plus a traiter indistinctement tout morceau de PI rencontre dans un
contrat large. Cette fonction appartient a `revue-clause-pi`.

Le positionnement cible est :

- `contrats-pi` : contrat PI complet, revue complete, architecture
  contractuelle, clauses majeures, formalites, points de nego, texte de projet
  ou note complete ;
- `revue-clause-pi` : bloc PI dans un contrat plus large, issue list, fallback
  redline, revue ciblee ;
- skills auteur / data / logiciel dedies : contrats specialises hors
  perimetre de `contrats-pi`.

## Approaches Considered

### 1. Garder un seul flux lineaire avec plus de detail

Ajouter des clarifications dans le skill existant sans toucher a sa structure.

- Avantage : faible cout.
- Inconvenient : la confusion de perimetre reste intacte.

### 2. Garder un seul skill mais le structurer par familles de contrats

Conserver `contrats-pi` comme entrypoint unique, mais imposer :

- un `mode` ;
- une `contract_family` ;
- un contrat de sortie normalise.

- Avantage : meilleur compromis entre clarte produit et compatibilite.
- Inconvenient : le skill reste large, donc il faut de la discipline de
  routage.

### 3. Scinder en plusieurs skills separes

Exemples :

- `licence-brevet-pi`
- `nda-secret-affaires`
- `rnd-collaboration-pi`
- `coexistence-marques`
- `franchise-transfert-tech`

- Avantage : plus pur architecturalement.
- Inconvenient : trop de fragmentation maintenant, avec risque de casser les
  usages existants.

### Decision

Retenir **l'approche 2**.

## Target Skill Contract

### Name

Le nom reste `contrats-pi`.

### Required Inputs

Le skill exige au minimum :

1. `mode`
   - `draft`
   - `review`
2. `contract_family`
   - `patent-tech-transfer`
   - `nda-secret-knowhow`
   - `rnd-collaboration`
   - `trademark-coexistence-franchise`
   - `mta-life-sciences`
3. `parties`
4. `notre_role`
5. `ip_scope`
6. `territory`
7. `duration`
8. `financial_model`
9. `business_context`
10. `jurisdiction`

Complements utiles :

- exclusivite ;
- titres exacts concernes ;
- contexte precontentieux ou transactionnel ;
- dependance a des registres d'opposabilite ;
- contraintes export / concurrence / RGPD ;
- calendrier de signature ou de closing.

### Contract Families

#### `patent-tech-transfer`

Usage :

- licence de brevet ;
- cession de brevet ;
- licence de savoir-faire ;
- transfert de technologie.

Enjeux dominants :

- perimetre des titres ;
- exclusivite ;
- royalties ;
- grant-back ;
- registres ;
- TTBER / art. 101 TFUE.

#### `nda-secret-knowhow`

Usage :

- NDA ;
- accord de confidentialite ;
- transmission de savoir-faire non titre.

Enjeux dominants :

- definition des informations ;
- exceptions ;
- duree ;
- residuals ;
- usage autorise ;
- protection secret des affaires.

#### `rnd-collaboration`

Usage :

- partenariat R&D ;
- recherche conjointe ;
- innovation collaborative ;
- partage background / foreground / sideground.

Enjeux dominants :

- attribution des resultats ;
- acces croises ;
- publication ;
- financement des depots ;
- sortie de partenaire ;
- exemption R&D.

#### `trademark-coexistence-franchise`

Usage :

- coexistence de marques ;
- licence de marque avec forte composante PI ;
- franchise avec volet PI structurant.

Enjeux dominants :

- delimination de perimetre ;
- non-opposition ;
- anti-confusion ;
- DIP / savoir-faire ;
- antitrust.

#### `mta-life-sciences`

Usage :

- MTA biotech/pharma ;
- transfert de materiel scientifique avec enjeux PI.

Enjeux dominants :

- usage permis ;
- produits derives ;
- revendication sur resultats ;
- publication ;
- retour / destruction ;
- limites d'exploitation.

## Routing Boundaries

### Route to `revue-clause-pi`

Basculer vers `revue-clause-pi` quand :

- la PI n'est qu'un bloc d'un MSA, SOW, contrat commercial, procurement ou
  emploi ;
- la sortie attendue est une note de revue ciblee ou une fallback redline sur
  quelques clauses ;
- l'objet principal du document n'est pas un contrat PI autonome.

### Route to auteur/data/software skills

Basculer hors `contrats-pi` quand :

- cession auteur pure -> `cession-droit-auteur` ;
- licence auteur -> `licence-droit-auteur` ;
- licence BDD / droit sui generis -> `bases-de-donnees` ;
- probleme de chaine de droits logiciel/data -> `revue-logiciel-donnees` ;
- revue clause PI dans contrat de travail ou contrat large -> `revue-clause-pi`.

## Output Contract

### Common Output Rules

Toute sortie doit distinguer :

1. faits lus ;
2. hypotheses ;
3. clauses ou informations manquantes ;
4. risques juridiques ;
5. arbitrages business ;
6. formalites / actions post-signature ;
7. validation humaine obligatoire.

Toute source ou piece non consultee reste `[a verifier]`.

### Mode `draft`

Sorties obligatoires :

1. `Contract Snapshot`
2. `Clause Architecture`
3. `Critical PI Terms`
4. `Registration and Opposability Actions`
5. `Competition and Regulatory Issues`
6. `Negotiation Variables`
7. `Draft Contract`
8. `Human Validation`

### Mode `review`

Sorties obligatoires :

1. `Contract Snapshot`
2. `Critical PI Terms`
3. `Issue List`
4. `Registration and Opposability Actions`
5. `Competition and Regulatory Issues`
6. `Negotiation Position`
7. `Red Flags and Missing Inputs`
8. `Human Validation`

## Error Handling and Guardrails

Le skill doit se limiter si un bloc critique manque :

- titres ou actif PI non identifies ;
- territoire inconnu ;
- role exact des parties non etabli ;
- texte contractuel incomplet en `review` ;
- structure financiere non connue alors qu'elle conditionne le montage ;
- contrainte concurrence plausible mais parts de marche inconnues.

Dans ces cas, il peut continuer, mais doit :

1. expliciter l'hypothese ;
2. marquer la zone `[a verifier]` ;
3. reduire toute recommandation agressive ou definitive.

## Documentation Impact

Le lot V2 devra realigner :

- `plugins/hacienda-propriete-intellectuelle/skills/contrats-pi/SKILL.md`
- `plugins/hacienda-propriete-intellectuelle/README.md`
- `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

La frontiere avec `revue-clause-pi` est deja bonne dans le repo. Le travail ici
consiste surtout a faire correspondre `contrats-pi` a cette frontiere.

## Testing Strategy

La verification vise surtout la coherence produit/documentaire :

1. revue lineaire du skill pour verifier la presence des nouvelles familles ;
2. verification des noms exacts de `mode` et `contract_family` ;
3. verification des renvois :
   - `revue-clause-pi`
   - `cession-droit-auteur`
   - `licence-droit-auteur`
   - `bases-de-donnees`
   - `revue-logiciel-donnees`
4. verification README / changelog ;
5. verification repo standard :
   - `npm test`
   - `npm run typecheck`
   - `npm run build`
   - `npm run branding:check`
   - `git diff --check`

## Risks

1. **Scope creep** : refaire toute la doctrine au lieu de restructurer.
2. **Boundary drift** : re-absorber des usages de `revue-clause-pi`.
3. **Mode drift** : multiplier les variantes non prevues au lieu de stabiliser
   quelques familles.
4. **Over-splitting later** : si les familles sont mal choisies, il faudra
   rescinder le skill plus tard.

## Decision Summary

Le prochain chantier defendable est une **V2 structurelle de `contrats-pi`** :

- meme nom ;
- meme ambition metier generale ;
- frontiere nette avec `revue-clause-pi` ;
- qualification obligatoire par famille ;
- sorties plus stables pour les usages M&A, transactionnels et de revue.
