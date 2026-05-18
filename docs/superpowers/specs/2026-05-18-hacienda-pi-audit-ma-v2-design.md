---
title: Audit PI M&A V2
status: proposed
owner: Hacienda
date: 2026-05-18
---

# Audit PI M&A V2

## Summary

Faire evoluer `audit-pi-ma` d'un skill monolithique de rapport vers un
orchestrateur M&A PI aligne sur le reste du plugin :

- modes explicites selon le cote transactionnel et le niveau de profondeur ;
- routage vers les skills specialises deja presents ;
- findings multi-actifs structures et consolidables ;
- sorties stables pour diligence acheteur, clean-up vendeur et red flags ;
- trajectoire vers dashboard multi-actifs sans promettre un registre officiel.

## Contexte

Le skill actuel `audit-pi-ma` est utile, mais il precede la granularisation
recente du plugin PI. Il couvre en un seul document :

- inventaire d'actifs ;
- chaine de titularite ;
- OSS et tiers ;
- valorisation indicative ;
- protections transactionnelles.

Le repo dispose maintenant de briques plus specialisees :

- `portefeuille-pi` pour la lecture consolidee marques + brevets ;
- `revue-open-source` pour l'audit OSS operationnel ;
- `revue-logiciel-donnees` pour la chaine de droits logiciel/data ;
- `depot-preuve-creation` pour le registre probatoire et les trous de pieces ;
- `contrats-pi` pour le volet contractuel PI ;
- `contentieux-pi` et skills voisins pour les sujets contentieux.

Le probleme n'est donc pas que `audit-pi-ma` soit "trop court" en absolu. Le
probleme est qu'il reste un V1 monolithique alors que le plugin s'est organise
autour de contrats d'entree/sortie plus nets.

## Goals

1. Transformer `audit-pi-ma` en porte d'entree M&A PI claire.
2. Distinguer proprement les usages :
   - diligence acheteur ;
   - preparation vendeur / clean room ;
   - red flag review ;
   - deal summary.
3. Reutiliser les skills specialises au lieu de dupliquer leur profondeur.
4. Produire des livrables stables, cotés et actionnables.
5. Rendre explicites les limites, hypotheses, sources non consultees et
   validations humaines.

## Non-Goals

1. Ne pas faire d'`audit-pi-ma` un registre PI canonique.
2. Ne pas lui faire recalculer un risque de confusion marque detaille.
3. Ne pas remplacer un SCA scan, un expert valuation ou un avocat M&A final.
4. Ne pas couvrir la diligence non-PI : social, fiscal, environnement,
   concentrations, export, corruption.
5. Ne pas automatiser dans ce lot le dashboard HTML final ; seulement stabiliser
   les structures qui l'alimenteront.

## Product Positioning

`audit-pi-ma` V2 devient un **orchestrateur de due diligence PI**.

Il ne fait plus semblant de traiter en profondeur tous les sous-sujets dans un
seul bloc. Il :

1. cadre le dossier transactionnel ;
2. identifie les branches specialisees a ouvrir ;
3. consolide les findings dans un format transactionnel unique ;
4. formule les protections de deal et le plan de remediation ;
5. rappelle ce qui reste `[a verifier]`.

## Approaches Considered

### 1. Monolithe enrichi

Ajouter davantage de detail dans le skill existant.

- Avantage : plus rapide.
- Inconvenient : recrée les doublons avec `revue-open-source`,
  `revue-logiciel-donnees` et `portefeuille-pi`.

### 2. Orchestrateur M&A au-dessus des skills specialises

Faire de `audit-pi-ma` la couche de cadrage, de routage et de consolidation.

- Avantage : aligne le skill sur l'architecture actuelle du plugin.
- Inconvenient : demande un contrat de sorties plus rigoureux.

### 3. Deux skills separes buyer/seller

Scinder en `audit-pi-ma-buyer` et `audit-pi-ma-seller`.

- Avantage : plus lisible metier.
- Inconvenient : maintenance plus lourde trop tot.

### Decision

Retenir **l'approche 2**.

## Target Skill Contract

### Name

Le nom reste `audit-pi-ma`.

### Modes

Le skill opere dans un seul des quatre modes suivants :

1. `buyer-dd`
2. `seller-clean-room`
3. `red-flag`
4. `deal-summary`

#### Mode `buyer-dd`

Usage :

- audit PI cote acquereur ;
- identification des risques de deal, protections SPA, conditions suspensives.

Attendu :

- inventaire des branches ouvertes ;
- findings par severite ;
- protections transactionnelles recommandees ;
- priorites pre-closing / post-closing.

#### Mode `seller-clean-room`

Usage :

- preparation data room PI cote vendeur ;
- clean-up avant ouverture de diligence.

Attendu :

- actifs et pieces a consolider ;
- trous de titularite ;
- inscriptions ou renouvellements a corriger ;
- paquet vendeur presentable.

#### Mode `red-flag`

Usage :

- revue acceleree sur un perimetre ou delai reduit ;
- objectif prioritaire : deal-breakers et blockers.

Attendu :

- liste priorisee des red flags ;
- informations manquantes critiques ;
- decision go / no-go / go with conditions.

#### Mode `deal-summary`

Usage :

- dossier deja travaille ;
- besoin de note synthetique pour comite d'investissement, direction ou avocat
  lead.

Attendu :

- resume de portefeuille ;
- synthese des findings ;
- impact deal ;
- validations humaines.

## Intake V2

Le skill exige au minimum :

1. `mode`
2. `cote transactionnel`
   - acheteur
   - vendeur
   - conseil acheteur
   - conseil vendeur
3. `type de transaction`
   - share deal
   - asset deal
   - investissement
   - JV
   - fusion
4. `cible / perimetre`
5. `secteur`
6. `juridictions critiques`
7. `sources disponibles`
   - data room
   - registres publics
   - Q&A
   - contrats
   - exports portefeuille
   - SBOM / inventaires
8. `objectif de la revue`
   - red flags
   - clean-up
   - pricing support
   - SPA protections
   - comite d'investissement
9. `delai`

Complements utiles :

- actif central de la these d'investissement ;
- dependance au logiciel ou a la marque ;
- pays de chiffre d'affaires critiques ;
- contentieux connus ;
- exigence de rapport court ou detaille.

## Routing Model

Le skill doit annoncer visiblement quelles branches specialisees il ouvre ou
aurait besoin d'ouvrir.

### Route `portefeuille-pi`

Ouvrir ou exploiter `portefeuille-pi` si le besoin principal est :

- lecture consolidee marques + brevets ;
- echeances ;
- trous de couverture ;
- verification portefeuille interne.

Limite : `portefeuille-pi` reste lecture seule et aujourd'hui borne a
`marques + brevets`.

### Route `revue-open-source`

Ouvrir `revue-open-source` si le deal depend :

- d'un SBOM ;
- d'une analyse de licences par composant ;
- d'un risque copyleft / AGPL ;
- d'obligations notice / source / redistribution.

### Route `revue-logiciel-donnees`

Ouvrir `revue-logiciel-donnees` si le risque principal porte sur :

- titularite code ;
- freelances / fondateurs / agences ;
- datasets ;
- bases de donnees ;
- restrictions de reusage ou d'entrainement.

### Route `depot-preuve-creation`

Ouvrir `depot-preuve-creation` si :

- des pieces critiques manquent ;
- la preuve de creation, de transfert ou d'usage n'est pas consolidee ;
- la data room PI doit etre nettoyee et indexee.

### Route `contrats-pi`

Ouvrir `contrats-pi` si la demande bascule vers :

- clauses PI du SPA ;
- licences a regulariser ;
- contrats R&D / cession / coexistence a revoir avant closing.

## Findings Model

Le skill V2 doit produire des findings normalises.

### Severity

- `Critical`
- `High`
- `Medium`
- `Low`

### Fields

Chaque finding doit contenir au minimum :

- `id`
- `severity`
- `asset_type`
- `asset_name`
- `issue_category`
- `summary`
- `evidence_seen`
- `missing_inputs`
- `deal_impact`
- `recommended_action`
- `timing`
  - `pre-closing`
  - `closing`
  - `post-closing`
- `owner`
- `status`
  - `open`
  - `mitigable`
  - `blocked`
  - `validated`

## Output Contract

Quel que soit le mode, la sortie doit contenir ces blocs communs :

1. `Transaction Snapshot`
2. `Scope and Sources`
3. `Asset Coverage`
4. `Findings Table`
5. `Deal Risks`
6. `Validation humaine requise`

### Bloc `Transaction Snapshot`

- type de transaction ;
- cote ;
- cible ;
- secteur ;
- delai ;
- these PI apparente.

### Bloc `Scope and Sources`

- ce qui a ete lu ;
- ce qui n'a pas ete lu ;
- pieces manquantes ;
- sources `[a verifier]`.

### Bloc `Asset Coverage`

- couverture marques ;
- couverture brevets ;
- couverture logiciel ;
- couverture data ;
- couverture droit d'auteur / know-how / noms de domaine selon le dossier ;
- limites de perimetre.

### Bloc `Findings Table`

Tableau transactionnel unique :

| ID | Severite | Actif | Categorie | Resume | Impact deal | Action | Timing |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Bloc `Deal Risks`

Doit distinguer :

- deal-breakers potentiels ;
- conditions suspensives ;
- reps & warranties ;
- indemnites specifiques ;
- remediations post-closing.

### Bloc `Validation humaine requise`

Doit lister :

- avocat PI ;
- avocat M&A ;
- expert valuation ;
- equipe technique / produit ;
- DPO ou autre specialiste si necessaire.

## Mode-Specific Additions

### `buyer-dd`

Ajouter :

1. `Buyer Protection Pack`
2. `Closing Conditions`
3. `Post-Closing Remediation`

### `seller-clean-room`

Ajouter :

1. `Seller Clean-Up Priorities`
2. `Data Room Requests`
3. `Readiness Assessment`

### `red-flag`

Ajouter :

1. `Red Flag Summary`
2. `Go / No-Go / Go With Conditions`

### `deal-summary`

Ajouter :

1. `Management Summary`
2. `Decision Points`

## Dashboard Trajectory

Le skill ne livre pas encore un dashboard HTML dans ce lot, mais ses sorties
doivent etre compatibles avec une future projection vers :

- vue multi-actifs ;
- findings par severite ;
- pre-closing vs post-closing ;
- couverture documentaire ;
- plan de remediation.

Le changelog mentionne deja cette cible. V2 doit donc normaliser les blocs pour
qu'un rendu dashboard soit ensuite trivial.

## Guardrails

1. Aucune sortie ne doit etre presentee comme opinion juridique finale.
2. Toute source non consultee reste `[a verifier]`.
3. Toute valorisation reste indicative.
4. Aucune conclusion de titularite ne doit etre affirmee sans piece.
5. Les sujets OSS, data et chaine de droits ne doivent pas etre "resolus"
   sommairement si une branche specialisee est necessaire.
6. Le skill doit distinguer faits, analyse, incertitudes, impact deal et
   validation humaine.

## Testing / Validation

La future implementation V2 devra etre jugee sur quatre scenarios minimum :

1. `buyer-dd` SaaS avec risque OSS + freelances
2. `seller-clean-room` marque + brevets + inscriptions manquantes
3. `red-flag` dossier incomplet avec only public registers
4. `deal-summary` dossier deja travaille avec findings consolides

Le skill devra aussi montrer explicitement, dans ses exemples ou references,
quand il faut ouvrir :

- `portefeuille-pi`
- `revue-open-source`
- `revue-logiciel-donnees`
- `depot-preuve-creation`

## Rollout Order

1. Spec V2 du skill
2. Plan d'implementation
3. Reecriture du skill `audit-pi-ma`
4. Ajout eventuel d'une reference M&A courte
5. Realignement README / changelog
6. Cadrage du dashboard findings multi-actifs dans une phase ulterieure
