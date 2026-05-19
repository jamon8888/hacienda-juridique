# Spec - recherche-anteriorite-marque V2

## Summary

`recherche-anteriorite-marque` reste le point d'entree public du plugin pour
le premier passage de disponibilite d'un signe. Le skill conserve sa posture
non negociable :

- premier passage seulement ;
- jamais une opinion de disponibilite ;
- sur-flagger avant revue humaine plutot que sous-flagger.

La V2 ne transforme pas le skill en orchestrateur marques complet. Elle le
resserre comme brique de triage marque, avec :

- un contrat d'entree explicite ;
- une couverture de recherche decrite de facon stable ;
- une sortie normalisee ;
- un routage ferme vers les workflows aval.

## Problem

Le skill est deja fort sur le fond : motifs absolus, recherche de marques
similaires, familles adjacentes et appreciation globale du risque de confusion.

En revanche, il reste structure comme un grand memo proceduriel. Les points a
durcir sont :

- contrat d'entree insuffisamment ferme ;
- frontiere encore trop implicite avec depot, opposition et surveillance ;
- sortie moins normalisee que les V2 recents du plugin ;
- absence de jeu ferme d'issues de routage.

## Goals

1. Garder `recherche-anteriorite-marque` comme skill de premier passage strict.
2. Preserver textuellement le garde-fou "ce n'est pas une opinion de
   disponibilite".
3. Stabiliser un contrat d'entree V2 reutilisable en FR, EU et mix FR/EU.
4. Stabiliser un contrat de sortie structure en blocs fermes.
5. Rendre explicites les handoffs vers :
   - `depot-marque-fr`
   - `analyse-opposition-marque`
   - `surveillance-marque`
   - `clearance-marque` en compatibilite historique seulement

## Non-Goals

- Ne pas rediger une opinion de disponibilite.
- Ne pas faire un depot.
- Ne pas faire une analyse d'opposition contradictoire complete.
- Ne pas remplacer une recherche professionnelle exhaustive.
- Ne pas maintenir un hub portefeuille.

## Positioning

Le skill doit etre formule comme la premiere brique de la lane marques :

1. `recherche-anteriorite-marque`
2. selon issue :
   - `depot-marque-fr`
   - `surveillance-marque`
   - `analyse-opposition-marque`
   - abandon ou changement de signe

`clearance-marque` reste un alias de compatibilite historique et ne doit plus
etre traite comme la voie normale.

## Input Contract

Le skill doit expliciter en tete un contrat V2 avec :

- `mark_type` : `word`, `figurative`, `composite`, `semi-figurative`,
  `unknown`
- `filing_intent` : `exploratory`, `pre-filing`, `pre-launch`,
  `portfolio-extension`, `reactive-check`
- `territory_scope` : `fr`, `eu`, `fr-eu`, `international-subset`, `unknown`
- `goods_services_scope` : `known-classes`, `described-only`,
  `mixed`, `unclear`
- `adjacent_families_status` : `pending-confirmation`, `confirmed`,
  `not-run`, `insufficient-input`

Le bloc de faits doit ensuite exposer :

- `proposed_sign`
- `claimed_goods_services`
- `nice_classes`
- `market_appearance`
- `known_related_names`
- `search_limitations`

## Coverage Rules

La V2 doit rendre la couverture de recherche lisible et bornee.

### Absolute Grounds

Le skill conserve le knockout `L.711-2 CPI` comme premiere couche obligatoire.
Le resultat n'est pas un simple "pass/fail" plat. Il doit signaler, pour chaque
motif pertinent, soit :

- aucun probleme identifie ;
- soit un flag motive et concret.

### Search Coverage

Le skill doit decrire explicitement :

- quelles bases ou integrations ont ete interrogees ;
- quelles classes et territoires ont ete couverts ;
- si la recherche est exacte, proche, phonetique ou partielle ;
- si les familles adjacentes ont ete confirmees puis rejouees ;
- ce qui manque encore avant une clearance professionnelle.

### Adjacent Families

Le balayage des familles adjacentes reste obligatoire avant de conclure. La V2
doit le formaliser comme une couche a part entiere du skill, pas comme une
simple note optionnelle.

## Routing Boundaries

### Route to `depot-marque-fr`

Quand le premier passage ne releve pas de blocage majeur, que la couverture est
assez solide pour lancer une preparation de depot, mais qu'une validation
humaine reste requise avant tout depot effectif.

### Route to `surveillance-marque`

Quand le signe est deja exploite, quand le besoin principal devient le suivi
des publications, ou quand un monitorage avant depot/adoption est plus utile
qu'une escalation immediate.

### Route to `analyse-opposition-marque`

Quand un conflit proche emerge et qu'il faut une analyse contradictoire plus
fine de risque de confusion, de produits/services, de priorites ou de
strategie.

### Route to `clearance-marque`

Seulement pour compatibilite historique, si un ancien workflow l'appelle
encore. La doc V2 doit le traiter comme une redirection, pas comme un skill
de meme rang.

## Output Contract

Le skill doit produire 8 blocs stables :

1. `Absolute Grounds Snapshot`
2. `Search Coverage`
3. `Closest Conflicts`
4. `Adjacent Family Sweep`
5. `Confusion Risk Signals`
6. `Uncertainty and Missing Coverage`
7. `Next Step Routing`
8. `Human Validation`

## Next Step Routing Values

Les issues V2 doivent etre bornees a :

- `proceed-to-professional-clearance`
- `prepare-filing`
- `monitor-before-filing`
- `prepare-opposition-risk-review`
- `insufficient-search-coverage`
- `abandon-or-rename`

## Compatibility Notes

- Le garde-fou "premier passage, pas une opinion de disponibilite" doit rester
  visible en tete de sortie.
- Les integrations INPI / EUIPO / autres restent conditionnees par leur
  configuration ; le skill doit continuer a decrire honnetement les trous de
  couverture.
- Le comportement sans connecteur reste permis, mais explicitement degrade.

## Files

- Modify:
  - `plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-marque/SKILL.md`
  - `plugins/hacienda-propriete-intellectuelle/README.md`
  - `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
- Create:
  - `plugins/hacienda-propriete-intellectuelle/skills/recherche-anteriorite-marque/references/recherche-anteriorite-marque-routing-and-output.md`
