# Spec - Migration V2 du skill `revue-clause-pi`

Date: 2026-05-21
Auteur: Codex
Statut: proposed

## 1. Resume executif

Le skill `revue-clause-pi` doit passer d'une V1 de revue contractuelle assez
large a une V2 plus fermee :

- un coeur **revue ciblee de clauses PI dans un contrat large** ;
- un contrat d'entree ferme ;
- une sortie stabilisee ;
- des frontieres nettes avec `contrats-pi` et les skills auteur/data/logiciel ;
- un routing explicite vers contrat PI complet, licence, cession, OSS, data ou
  contentieux si la question dominante sort de la simple revue ciblee.

La logique cible n'est pas de refaire un contrat complet ni de devenir un
orchestrateur contractuel generaliste. Le coeur doit rester :

- l'isolement des clauses PI pertinentes ;
- l'identification des risques de titularite, licence, restrictions d'usage,
  garanties, indemnites et sortie ;
- la proposition d'une position de revue stable ;
- la preparation d'une note de nego ou de fallback redline borne.

## 2. Probleme du skill actuel

Le V1 est deja bien cadre sur le fond, mais reste trop souple sur :

- la fermeture de l'intake ;
- la distinction entre contrat PI autonome et simple clause PI ;
- la frontiere avec les briques V2 auteur, logiciel, OSS et data ;
- la stabilisation de la sortie.

Le probleme n'est pas la matiere. Le probleme est l'absence d'un contrat V2
strict qui distingue clairement :

- la **revue ciblee de clauses PI** ;
- la **redline de repli** ;
- la **liste d'issues rapide** ;
- les **routes vers les skills specialises** ;
- la **validation humaine finale**.

## 3. Positionnement V2

### 3.1 Coeur du skill

`revue-clause-pi` V2 devient un skill strict de revue ciblee de clauses PI
dans un contrat large :

- MSA ;
- SOW ;
- SaaS / licence tech non purement PI ;
- contrat commercial ;
- distribution ;
- procurement ;
- emploi / consulting ;
- partenariat plus large.

Il ne redige pas un contrat PI autonome complet.

### 3.2 Modes

Le skill garde trois modes fermes :

- `review`
- `fallback-redline`
- `issue-list`

Mais ces modes doivent etre clairement subordonnes a la meme logique de revue
ciblee, pas a trois workflows divergents.

## 4. Approches ecartees

### Option A - Fusionner avec `contrats-pi`

Transformer `revue-clause-pi` en simple sous-cas de `contrats-pi`.

Problemes :

- perd la specialisation utile sur les contrats larges ;
- brouille la frontiere entre revue ciblee et contrat PI autonome ;
- diminue la precision produit.

### Option B - Ne faire qu'une issue list rapide

Conserver uniquement une revue express de clauses.

Problemes :

- trop pauvre pour les besoins de nego reelle ;
- perd la fallback redline et la note de revue stable.

### Option C - Revue ciblee stricte avec modes fermes

Option retenue.

## 5. Architecture fonctionnelle retenue

### 5.1 Tracks principaux

Le skill doit partir d'un `contract_posture` ferme :

- `msa-services`
- `sow-deliverables`
- `saas-platform`
- `commercial-distribution`
- `employment-consulting`
- `procurement-vendor`
- `partnership-mixed`
- `other-large-contract`

### 5.2 Focus PI

Le skill doit aussi fermer `ip_clause_focus` :

- `ownership-assignment`
- `license-use-rights`
- `inventions-improvements`
- `oss-third-party`
- `data-database`
- `ai-model-output`
- `warranties-indemnities`
- `confidentiality-trade-secrets`
- `mixed`

### 5.3 Negotiation posture

- `protective`
- `balanced`
- `concessionary`

## 6. Contrat d'entree V2

### Closed intake contract

- `mode`:
  - `review`
  - `fallback-redline`
  - `issue-list`
- `contract_posture`:
  - `msa-services`
  - `sow-deliverables`
  - `saas-platform`
  - `commercial-distribution`
  - `employment-consulting`
  - `procurement-vendor`
  - `partnership-mixed`
  - `other-large-contract`
- `ip_clause_focus`:
  - `ownership-assignment`
  - `license-use-rights`
  - `inventions-improvements`
  - `oss-third-party`
  - `data-database`
  - `ai-model-output`
  - `warranties-indemnities`
  - `confidentiality-trade-secrets`
  - `mixed`
- `our_role`:
  - `customer`
  - `vendor`
  - `employer`
  - `employee-contractor`
  - `licensor-platform`
  - `licensee-user`
  - `partner`
  - `other`
- `negotiation_posture`:
  - `protective`
  - `balanced`
  - `concessionary`
- `source_completeness`:
  - `full-text`
  - `partial-extract`
  - `clause-only`
  - `summary-only`

### Faits minimums

Le skill ne doit pas presenter la sortie comme exploitable sans au moins :

- texte ou extrait effectivement lu ;
- type de contrat large identifiable ;
- role de la partie que nous representons ;
- objet business minimal ;
- focus PI principal ;
- sources consultees et datees.

Ajouter selon les cas :

- ordre de priorite contractuel ;
- annexes ou exhibits critiques ;
- SOW / DPA / policy OSS ;
- contraintes data / IA / export / secret ;
- contexte de nego ou de signature.

Tout manque reste `[a verifier]`.

## 7. Clause Review Readiness Gate

Le skill doit conclure sur une seule valeur :

- `ready`
- `partial`
- `blocked`

### `ready`

Le dossier permet une revue ciblee exploitable avec clauses lues, posture
contractuelle identifiable et route de nego claire.

### `partial`

Le dossier permet une revue structuree, mais avec trous ou pieces manquantes.

Cas frequents :

- extrait partiel seulement ;
- annexes critiques absentes ;
- posture business ou juridiction floue ;
- focus PI mixte encore mal delimite.

La sortie garde alors :

- `[PROVISOIRE]`
- `[a verifier]`
- `[A COMPLETER]`

### `blocked`

Bloquer si :

- aucun texte ou extrait reel n'est fourni ;
- le sujet devient un contrat PI autonome complet ;
- aucun role ou objet business minimal ne peut etre formule ;
- le sujet reel devient principalement contentieux, OSS autonome, data autonome
  ou title chain complete ;
- aucune source consultee et datee ne peut etre documentee.

## 8. Frontieres

### Route to `contrats-pi`

Si le besoin reel devient un contrat PI autonome complet.

### Route to `licence-droit-auteur`

Si le sujet dominant devient une licence auteur structuree autonome.

### Route to `cession-droit-auteur`

Si le sujet dominant devient une cession patrimoniale ou un cleanup de chaine
de droits.

### Route to `revue-open-source`

Si le coeur du probleme devient la conformite OSS.

### Route to `revue-logiciel-donnees`

Si le coeur du probleme devient la chaine de droits logiciel / data.

### Route to `bases-de-donnees`

Si le coeur du probleme devient le regime structure / sui generis / reuse
database.

### Route to `contentieux-pi`

Si le sujet dominant devient la strategie de litige ou pre-litige.

## 9. Sortie V2

La sortie doit toujours utiliser exactement ces 9 blocs :

1. `Case Snapshot`
2. `Clause Review Readiness Gate`
3. `Contract And Clause Scope`
4. `Ownership And License Findings`
5. `Risk Allocation Findings`
6. `Negotiation Posture`
7. `Fallback Redline Or Issue List`
8. `Decision Routing`
9. `Human Validation`

## 10. Decision Routing ferme

Une seule route finale :

- `proceed-with-clause-review`
- `proceed-with-fallback-redline`
- `proceed-with-issue-list`
- `route-to-full-ip-contract`
- `route-to-copyright-license`
- `route-to-copyright-assignment`
- `route-to-open-source-review`
- `route-to-software-data-chain-review`
- `route-to-database-protection-review`
- `route-to-pi-litigation`
- `hold-insufficient-basis`

## 11. Impact documentaire attendu

Le lot V2 devra mettre a jour :

- `plugins/hacienda-propriete-intellectuelle/skills/revue-clause-pi/SKILL.md`
- un memo compact de routing / output
- `plugins/hacienda-propriete-intellectuelle/README.md`
- `plugins/hacienda-propriete-intellectuelle/CHANGELOG.md`

## 12. Resultat attendu

Apres migration, `revue-clause-pi` doit etre lisible comme :

- une brique stricte de revue ciblee de clauses PI dans les contrats larges ;
- distincte de `contrats-pi` et des briques specialisees auteur / logiciel /
  OSS / data ;
- avec un gate clair, un routing ferme et une sortie stable.
