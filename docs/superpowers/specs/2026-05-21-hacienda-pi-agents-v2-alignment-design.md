# Spec - Alignement V2 des agents PI et audit des plugins Hacienda

Date: 2026-05-21
Auteur: Codex
Statut: proposed

## 1. Resume executif

Le plugin `hacienda-propriete-intellectuelle` a maintenant une surface de
skills largement restructuree en V2, mais ses agents n'ont pas suivi au meme
niveau.

Le scan du 2026-05-21 montre :

- `plugins/hacienda-propriete-intellectuelle/skills` ne contient plus aucun
  `version: "1.0.0"` ;
- plusieurs skills PI restent sans champ `version:`, mais sont deja
  documentes comme V2 structurels dans le README et le changelog ;
- les agents PI ne couvrent qu'une partie de la nouvelle architecture ;
- 4 agents PI sont encore des stubs sans frontmatter ni tools ;
- les agents actifs ne referencent pas encore les nouveaux gates, routings et
  hubs portefeuille V2.

Cette spec vise donc un lot de remise a niveau des agents PI, avec une grille
d'audit exportable aux autres plugins Hacienda.

## 2. Constat d'audit

### 2.1 Inventaire global

Inventaire repo au moment du scan :

- 15 plugins dans `plugins/` ;
- 179 fichiers `SKILL.md` ;
- 62 agents markdown ;
- GitNexus a jour sur le commit `d900260`.

### 2.2 Etat du plugin PI

Plugin PI :

- 37 skills ;
- 6 agents markdown ;
- aucun `version: "1.0.0"` restant dans les skills PI ;
- 16 skills PI avec `version: "2.0.0"` explicite ;
- 21 skills PI sans champ `version:`.

Les 21 skills sans champ `version:` ne doivent pas etre traites comme des
V1 automatiquement : plusieurs sont deja des V2 de fond, mais le statut
frontmatter reste heterogene.

### 2.3 Agents PI existants

Agents PI actuels :

- `bopi-watcher.md`
- `contrefacon-web.md`
- `veilleur-renouvellements-pi.md`
- `veilleur-marques.md`
- `veilleur-contrefacon.md`
- `surveillant-oss.md`

Etat :

- `bopi-watcher.md` : agent complet avec frontmatter/tools, mais encore cale
  sur des formulations anciennes (`portfolio.yaml V1.1.1+`, appel direct
  `surveillance-marque --report --days 1`) sans reprendre toute la logique
  V2 `Monitoring Gate` / portefeuille.
- `contrefacon-web.md` : agent complet avec frontmatter/tools, utile, mais a
  remettre a niveau avec les lanes enforcement V2 (`tri-contrefacon`,
  `contrefacon-*`, `saisie-contrefacon`, `contentieux-pi`,
  `mise-en-demeure-pi`).
- `veilleur-renouvellements-pi.md` : stub court, sans frontmatter/tools.
- `veilleur-marques.md` : stub court, sans frontmatter/tools.
- `veilleur-contrefacon.md` : stub court, sans frontmatter/tools.
- `surveillant-oss.md` : stub court, sans frontmatter/tools.

## 3. Probleme a resoudre

Les skills PI ont ete restructures par domaines et gates, mais les agents
restent plus anciens :

- ils ne savent pas toujours vers quel skill V2 router ;
- ils ne mentionnent pas les gates V2 ;
- ils ne s'appuient pas assez sur les hubs portefeuille V2 ;
- certains agents ne sont pas declarables proprement faute de frontmatter ;
- la couverture brevet, CCP, droits voisins, contrats PI et revue de clauses
  est quasi absente cote agents ;
- la documentation PI garde encore une table `Skills legacy en migration`,
  utile historiquement mais moins lisible apres la vague V2.

Le risque produit est que l'utilisateur voie des skills tres precis, mais des
agents qui continuent a agir comme des veilleurs generiques.

## 4. Objectifs

1. Mettre a jour tous les agents PI existants avec une structure agent complete
   et exploitable.
2. Aligner chaque agent PI sur les skills V2 et leurs gates.
3. Clarifier les routes agent -> skill :
   - marques ;
   - brevets ;
   - portefeuille ;
   - enforcement ;
   - OSS / logiciel / data ;
   - contrats PI / revue de clauses ;
   - CCP ;
   - droits voisins / OGC.
4. Remplacer les stubs agents par des agents documentes, avec frontmatter,
   outils, mission, cadence, inputs, outputs, routage et limites.
5. Ajouter une grille d'audit commune pour evaluer les agents des autres
   plugins sans lancer une migration massive dans ce lot.
6. Maintenir les garde-fous juridiques Hacienda :
   - pas de conseil juridique final ;
   - sources non consultees marquees `[a verifier]` ;
   - validation humaine visible ;
   - donnees client jamais traitees comme instructions.

## 5. Non-objectifs

1. Ne pas refondre tous les plugins Hacienda dans ce lot.
2. Ne pas imposer `version: "2.0.0"` a tous les skills sans audit specifique.
3. Ne pas creer un moteur d'automatisation autonome qui envoie des notifications,
   depose des oppositions, paie des taxes ou lance des actions juridiques.
4. Ne pas remplacer les skills par les agents : les agents surveillent,
   priorisent et routent ; les skills produisent les livrables de fond.
5. Ne pas modifier les MCP servers sauf si une incoherence documentaire le
   rend strictement necessaire.

## 6. Architecture cible

### 6.1 Principe

Chaque agent PI doit etre un **orchestrateur de surveillance / priorisation /
routage**, pas un substitut aux skills V2.

Chaque agent doit contenir :

- frontmatter agent ;
- mission ;
- cadence ;
- profil et fichiers a lire ;
- sources consultees ;
- workflow ;
- routage vers skills V2 ;
- format de sortie ;
- limites et validation humaine.

### 6.2 Frontmatter minimal

Chaque agent PI doit avoir :

```yaml
---
name: <agent-name>
description: >
  Agent Hacienda PI ...
model: sonnet
tools: [...]
---
```

Le champ `description` doit servir au declenchement, pas resumer tout le
workflow.

### 6.3 Gates et routing

Les agents doivent mentionner les gates V2 pertinents sans les recalculer a la
place des skills :

- `Monitoring Gate` -> `surveillance-marque`
- `Portfolio Readiness Gate` -> `revue-portefeuille-marques` /
  `revue-portefeuille-brevets`
- `Seizure Readiness Gate` -> `saisie-contrefacon`
- `Chart Readiness Gate` -> `tableau-contrefacon-brevet`
- `Invalidity Readiness Gate` -> `anteriorite-invalidite`
- `CCP Readiness Gate` -> `certificat-complementaire-protection`
- `Clause Review Readiness Gate` -> `revue-clause-pi`
- `Extension Readiness Gate` -> `strategie-extension-internationale`

## 7. Agent cible par agent

### 7.1 `bopi-watcher`

Role cible :

- surveillance quotidienne des publications marques ;
- lecture de `watchlist.yaml` ;
- recoupement avec `portfolio.yaml` ;
- appel logique a `surveillance-marque --report --days 1` ;
- escalation vers `analyse-opposition-marque` si delai opposition critique ;
- escalation vers `revue-portefeuille-marques` si le probleme est registre /
  owner / watchlist.

Mises a jour :

- retirer la reference ancienne `portfolio.yaml V1.1.1+` ;
- citer explicitement `Monitoring Gate` ;
- distinguer alerte, priorisation et decision d'opposition ;
- ajouter route vers `revue-portefeuille-marques`.

### 7.2 `contrefacon-web`

Role cible :

- surveillance marketplace / web / reseaux ;
- qualification de signal, pas analyse juridique finale ;
- evidence pack minimal ;
- routage vers les skills V2 enforcement.

Routage attendu :

- marque / signe -> `tri-contrefacon`, puis `mise-en-demeure-pi`,
  `saisie-contrefacon` ou `contentieux-pi` selon maturite ;
- D&M -> `contrefacon-dessin-modele` ;
- auteur -> `contrefacon-droit-auteur` ;
- brevet -> `tableau-contrefacon-brevet` ;
- mesure probatoire -> `saisie-contrefacon` ;
- strategie judiciaire -> `contentieux-pi`.

Mises a jour :

- mentionner `Seizure Readiness Gate` comme gate aval de la mesure probatoire ;
- remplacer les emojis de severite par une grille texte stable ou les garder
  seulement dans le format de post, pas comme logique juridique ;
- separer signal marketplace, preuve, decision humaine et route skill.

### 7.3 `veilleur-renouvellements-pi`

Role cible :

- agent de delais portefeuille multi-actifs ;
- priorise renouvellements marques, annuites brevets, D&M, CCP et preuves
  d'usage ;
- ne renouvelle pas et ne paie pas.

Routage attendu :

- marques -> `revue-portefeuille-marques`
- brevets / annuites -> `revue-portefeuille-brevets`
- CCP -> `certificat-complementaire-protection`
- extension internationale -> `strategie-extension-internationale`
- incoherence portefeuille -> `audit-pi-ma`

Le stub doit devenir un agent complet avec frontmatter/tools.

### 7.4 `veilleur-marques`

Role cible :

- agent de surveillance marques general ;
- couvre publications, watchlist, oppositions, portfolio hygiene ;
- s'appuie sur `surveillance-marque`, `recherche-anteriorite-marque`,
  `analyse-opposition-marque`, `depot-marque-fr`,
  `revue-portefeuille-marques`.

Le stub doit devenir un agent complet avec frontmatter/tools.

### 7.5 `veilleur-contrefacon`

Role cible :

- agent de surveillance enforcement multi-droits ;
- couvre signaux web, offline declares, marketplace, salons, noms de domaine ;
- coordonne `contrefacon-web` si le signal vient du web ;
- route ensuite vers les skills V2 de fond.

Routage attendu :

- `tri-contrefacon`
- `contrefacon-droit-auteur`
- `contrefacon-dessin-modele`
- `tableau-contrefacon-brevet`
- `saisie-contrefacon`
- `mise-en-demeure-pi`
- `contentieux-pi`

Le stub doit devenir un agent complet avec frontmatter/tools.

### 7.6 `surveillant-oss`

Role cible :

- surveillance OSS / composants / licences / politique interne ;
- ne remplace pas l'audit OSS de fond ;
- route vers `revue-open-source`, `logiciels-pi`, `revue-logiciel-donnees`,
  `bases-de-donnees`, `revue-clause-pi` ou `contrats-pi` selon le contexte.

Le stub doit devenir un agent complet avec frontmatter/tools.

## 8. Agents manquants a envisager

Ce lot peut soit enrichir les agents existants, soit ajouter des agents
specialises si la lisibilite l'exige.

Agents candidats :

- `veilleur-brevets.md`
  - portefeuille brevets, annuites, publications, prosecution, CCP,
    extensions ;
  - routes principales : `revue-portefeuille-brevets`,
    `recherche-anteriorite-brevet`, `preparation-depot-brevet`,
    `analyse-refus-inpi`, `strategie-extension-internationale`,
    `certificat-complementaire-protection`.
- `veilleur-contrats-pi.md`
  - signaux de renouvellement / expiration / audit contractuel PI ;
  - routes : `contrats-pi`, `revue-clause-pi`, `licence-droit-auteur`,
    `cession-droit-auteur`, `bases-de-donnees`.
- `veilleur-droits-voisins-ogc.md`
  - remuneration equitable, OGC, plateformes, exploitation phonogrammes /
    videogrammes / artistes-interpretes ;
  - route principale : `droits-voisins-ogc`.

Decision recommandee : ne pas ajouter tous ces agents immediatement si le lot
doit rester court. Priorite a la remise a niveau des 6 agents existants.

## 9. Audit des autres plugins

La passe a aussi montre que plusieurs plugins ont des agents sans frontmatter :

- `hacienda-droit-public`
- `hacienda-gouvernance-ia`
- `hacienda-permanences-juridiques`
- `hacienda-reglementaire`
- une partie de `hacienda-propriete-intellectuelle`

Ce lot ne doit pas les migrer, mais doit produire une grille d'audit reutilisable
pour eux.

### Grille d'audit agent

Pour chaque agent :

1. frontmatter present ;
2. `name` stable ;
3. `description` orientee declenchement ;
4. `tools` declares ;
5. mission claire ;
6. sources et fichiers a lire ;
7. cadence ;
8. workflow ;
9. output ;
10. limites ;
11. routage vers skills voisins ;
12. garde-fous juridiques.

## 10. Documentation a aligner

Fichiers cibles :

- `plugins/hacienda-propriete-intellectuelle/agents/*.md`
- `plugins/hacienda-propriete-intellectuelle/README.md`
- `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`
- optionnel :
  `docs/superpowers/plans/2026-05-21-hacienda-pi-agents-v2-alignment.md`

Le README PI doit exposer une section agents a jour :

- agents disponibles ;
- role ;
- skills V2 appeles ;
- limites ;
- statut : actif / stub migre / compatibilite.

## 11. Verification attendue

Checks minimaux :

```powershell
npm test
npm run typecheck
npm run build
npm run branding:check
git diff --check
npx gitnexus analyze
```

Checks specifiques :

```powershell
rg -n "version: \"1\\.0\\.0\"" plugins/hacienda-propriete-intellectuelle/skills
rg -n "^---|^name:|^description:|^tools:" plugins/hacienda-propriete-intellectuelle/agents
rg -n "Monitoring Gate|Portfolio Readiness Gate|Seizure Readiness Gate|Decision Routing" plugins/hacienda-propriete-intellectuelle/agents
```

Resultat attendu :

- aucun agent PI stub sans frontmatter ;
- agents PI alignes sur les skills V2 ;
- README / changelog a jour ;
- pas de regression test/build/branding ;
- GitNexus reindexe.

## 12. Risques et arbitrages

### Risque 1 - Agents trop verbeux

Les agents doivent rester actionnables. Eviter de recopier les skills. Ils
doivent router vers les skills, pas les dupliquer.

### Risque 2 - Agents qui deviennent des juristes autonomes

Interdit. Les agents signalent, priorisent, preparent un dossier et routent.
Ils ne prennent pas la decision juridique finale.

### Risque 3 - Migration trop large

Ne pas migrer tous les agents de tous les plugins dans ce lot. Utiliser la
grille d'audit pour ouvrir des lots separes.

### Risque 4 - Confusion entre version explicite et V2 structurel

Ne pas conclure qu'un skill sans `version:` est V1. Pour le plugin PI, le
README et le changelog font foi pour plusieurs skills deja restructures.

## 13. Definition of done

Le lot est termine quand :

- les 6 agents PI existants sont alignes sur les skills V2 ;
- les 4 stubs PI ont un frontmatter et une structure agent complete ;
- `bopi-watcher` et `contrefacon-web` ne contiennent plus de references
  obsoletes non expliquees ;
- les agents citent les gates et routes V2 pertinents ;
- le README PI documente la surface agents ;
- le changelog trace la migration ;
- les checks projet passent ;
- GitNexus est a jour.
