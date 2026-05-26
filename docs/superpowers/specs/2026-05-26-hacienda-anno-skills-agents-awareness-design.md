# Hacienda Anno Skills And Agents Awareness — Design

Date: 2026-05-26
Statut: prêt pour implémentation
Périmètre: dépôt `hacienda-juridique` uniquement. Le dépôt Anno reste hors périmètre d'édition.

## Objectif

Aligner les skills et agents Hacienda avec le modèle Anno Tabular désormais défini dans la distribution Hacienda + Anno Desktop.

La phase précédente a rendu aware :

- la spec d'orchestration ;
- le générateur de distribution Anno ;
- `engine-compat.json` par tiers ;
- `ANNO-COORDINATOR.md` ;
- `ANNO-TABULAR.md` ;
- `ANNO-MATTER-VAULT.md` ;
- `ANNO-WORKFLOW-BLUEPRINTS.md` ;
- le `README.md` et le `CLAUDE.md` du plugin PI.

Mais les fichiers `skills/` et `agents/` ne portent pas encore tous les nouveaux concepts :

- `matter_vault` ;
- `workflow_blueprint` ;
- `hacienda_knowledge_base` ;
- `grid_to_work_product` ;
- `tabular_review_*` ;
- `review_status` ;
- `decision_status` ;
- `legal_prescription_check` ;
- `legal_validate_field`.

Cette spec définit la mise à jour à effectuer.

## Non-Objectifs

- Ne pas modifier le dépôt Anno.
- Ne pas transformer tous les skills en workflows Anno obligatoires.
- Ne pas rendre Anno requis pour utiliser Hacienda.
- Ne pas ajouter de branding tiers ni de référence produit externe.
- Ne pas réécrire le fond juridique des skills hors besoin d'alignement Anno.
- Ne pas ingérer, copier ou simuler de données client.

## Principe Directeur

Les skills et agents doivent comprendre Anno comme un **mode optionnel de travail de dossier local**, pas comme une source juridique.

Le modèle cible est :

```text
matter_vault
  -> workflow_blueprint
    -> legal_ingest / legal_search / legal_graph_query
      -> tabular_review_*
        -> validation humaine
          -> grid_to_work_product
            -> sources officielles Hacienda
```

Si Anno est absent, chaque skill continue en `fallback_hacienda`.

## Règles Communes À Ajouter

Chaque skill ou agent Anno-aware doit appliquer les règles suivantes.

### Gate Anno

Avant tout outil Anno :

1. appeler `anno_health` ;
2. vérifier les outils nécessaires au mode visé ;
3. si Anno est indisponible, continuer en `fallback_hacienda` ;
4. ne jamais ingérer sans demande explicite de l'utilisateur ;
5. appeler `detect` ou appliquer une gestion PII équivalente avant traitement de pièce client.

### Source Et Preuve

- Un passage Anno est une source interne de dossier.
- Une cellule tabulaire Anno est un élément de travail, pas une source officielle.
- Une source officielle non consultée reste `[à vérifier]`.
- Les registres, textes, jurisprudences et bases officielles restent vérifiés via Hacienda.

### Revue Tabulaire

Quand le workflow est riche en documents, actifs, clauses, risques, faits ou événements, le skill doit privilégier une revue tabulaire avant la rédaction.

Colonnes minimales à rappeler quand pertinent :

- `review_status` ;
- `decision_status` ;
- `assignee` ;
- `issue_owner` ;
- `action_deadline` ;
- `validation_status` ;
- citation ou provenance ;
- source officielle à vérifier.

### Validation Humaine

- Une cellule `Low`, non citée, contradictoire ou non revue reste `[à vérifier]`.
- Une cellule corrigée ou verrouillée par l'utilisateur ne doit pas être écrasée.
- `legal_validate_field` doit être utilisé ou mentionné quand un fait extrait est confirmé, rejeté ou corrigé hors table.

### Livrables

Un livrable produit depuis Anno doit passer par `grid_to_work_product` ou respecter son équivalent manuel :

1. sélectionner les cellules validées ;
2. conserver les citations ;
3. vérifier les citations réutilisées ;
4. séparer faits, droit, analyse, incertitudes, décisions et validation humaine ;
5. lister les éléments `[à vérifier]`.

## Skills PI Prioritaires

### `audit-pi-ma`

Objectif Anno :

- utiliser `matter_vault` comme périmètre de due diligence ;
- utiliser `workflow_blueprint = pi-ma-diligence-v1` ;
- utiliser `tabular_review_create` avec une grille inspirée de `ip-v1` ;
- produire les blockers de closing via `decision_status`.

Doit mentionner :

- `tabular_review_create` ;
- `decision_status` ;
- `grid_to_work_product` ;
- sources officielles INPI/EUIPO/WIPO/EPO à vérifier.

### `revue-clause-pi`

Objectif Anno :

- utiliser `workflow_blueprint = clause-pi-review-v1` ;
- extraire les clauses avec `legal_extract_contract` ;
- revoir les risques avec `legal_risk_review` et `legal_mandatory_clause_audit` ;
- raffiner les cellules ambiguës avec `tabular_review_refine_cell`.

Doit mentionner :

- revue tabulaire avant rédaction ;
- `review_status` ;
- `decision_status` ;
- verrouillage humain ;
- `grid_to_work_product`.

### `contrats-pi`

Objectif Anno :

- transformer les contrats PI en grille de droits, obligations, exclusions, durée, territoire, garanties et indemnités ;
- utiliser `legal_extract_contract`, `legal_search`, `legal_graph_query`.

Doit mentionner :

- `matter_vault` ;
- `workflow_blueprint` ;
- `tabular_review_*` ;
- décision : accepter, renégocier, régulariser, bloquer.

### `revue-logiciel-donnees`

Objectif Anno :

- utiliser `workflow_blueprint = software-data-chain-v1` ;
- relier contrats, contributeurs, datasets, licences et preuves ;
- isoler les gaps de chaîne de droits.

Doit mentionner :

- `legal_graph_query` ;
- revue tabulaire des actifs logiciel/data ;
- `decision_status = closing blocker / remédiation / acceptable / à vérifier`.

### `revue-open-source`

Objectif Anno :

- utiliser `workflow_blueprint = oss-obligations-review-v1` ;
- relier SBOM, licences, notices, usages et obligations ;
- rappeler qu'Anno ne remplace pas un scanner SCA.

Doit mentionner :

- revue tabulaire de composants ;
- `legal_risk_review` ;
- `decision_status` ;
- remédiation et validation humaine.

### `contentieux-pi`

Objectif Anno :

- utiliser `legal_extract_case_file`, `legal_timeline`, `legal_graph_query` ;
- utiliser `legal_prescription_check` pour les points de départ temporels ;
- construire une grille des faits allégués, pièces, dates, risques et contradictions.

Doit mentionner :

- prescription ;
- chronologie ;
- preuve directe vs inférence ;
- `legal_validate_field`.

### `tri-contrefacon`

Objectif Anno :

- utiliser `workflow_blueprint = infringement-triage-v1` ;
- trier faits, preuves, parties, droits invoqués et faiblesses ;
- ne jamais conclure à la contrefaçon sur la seule base d'Anno.

Doit mentionner :

- `legal_timeline` ;
- `legal_prescription_check` si temporalité utile ;
- revue tabulaire de faits/preuves ;
- validation humaine.

### `mise-en-demeure-pi`

Objectif Anno :

- générer une lettre seulement depuis des faits validés ;
- utiliser `legal_rehydrate_citation` pour les citations locales ;
- utiliser `legal_validate_field` pour confirmations/corrections.

Doit mentionner :

- `grid_to_work_product` ;
- vérification des citations ;
- interdiction d'affirmation définitive non validée.

### `portefeuille-pi`

Objectif Anno :

- utiliser `workflow_blueprint = ip-portfolio-review-v1` ;
- consolider actifs, titulaires, statuts, licences, sûretés et réclamations ;
- utiliser `ip-v1` comme template tabulaire cible.

Doit mentionner :

- `matter_vault` ;
- `memory_recall` seulement pour contexte approuvé ;
- `tabular_review_create` ;
- sources officielles à vérifier.

### `depot-preuve-creation`

Objectif Anno :

- utiliser `workflow_blueprint = creation-evidence-file-v1` ;
- organiser preuves, dates, auteurs, supports et fiabilité ;
- rappeler qu'Anno ne remplace jamais dépôt officiel, constat ou horodatage.

Doit mentionner :

- `legal_timeline` ;
- revue tabulaire des preuves ;
- validation humaine ;
- export annexe.

## Agents PI À Aligner

Les agents ne doivent pas déclencher Anno comme une source officielle ou comme un scanner autonome. Ils peuvent seulement préparer, surveiller, prioriser ou signaler.

### `surveillant-oss`

- awareness `oss-obligations-review-v1` ;
- ne remplace pas scanner SCA ;
- signale remédiation, validation et `decision_status`.

### `veilleur-contrefacon` Et `contrefacon-web`

- awareness `infringement-triage-v1` ;
- signale faits et preuves à intégrer dans une grille ;
- ne conclut pas sur contrefaçon ;
- mentionne `legal_prescription_check` si dates critiques.

### `veilleur-marques`, `veilleur-renouvellements-pi`, `bopi-watcher`

- ne transforment pas BOPI/registre en Anno ;
- peuvent relier les signaux au `matter_vault` ;
- les registres officiels restent vérifiés via Hacienda.

## Recherche Documentaire À Aligner

### Skills

- `dossier-documentaire` : ajouter grille références/pièces/source officielle.
- `extraction-references` : ajouter statut `official_source_status`.
- `verification-sources-primaires` : rappeler qu'Anno ne retire jamais `[à vérifier]`.
- `preparation-requete` : distinguer requête corpus client Anno et requête source officielle.
- `comparaison-bases` : classer Anno comme corpus client, pas base éditoriale.

### Agents

- `consolidateur-recherche` : consolide sources internes Anno et sources officielles sans les confondre.
- `controleur-sources` : bloque toute source officielle non réellement consultée.
- `veilleur-documentaire` : signale les références à vérifier, pas des autorités.

## Sources Officielles À Aligner

Le plugin `hacienda-sources-officielles` reste volontairement conservateur.

À ajouter seulement :

- Anno peut fournir un fait client à relier à une recherche ;
- Anno ne prouve jamais l'état du droit ;
- toute source primaire non consultée reste `[à vérifier]`.

## Tests D'Acceptation

Ajouter des tests dans `packages/core/test` pour vérifier :

1. les 10 skills PI prioritaires mentionnent au moins un marqueur Anno Tabular ou décisionnel adapté ;
2. les skills contentieux/tri/mise en demeure mentionnent `legal_prescription_check` ou `legal_validate_field` quand pertinent ;
3. les agents PI ne présentent pas Anno comme source officielle ;
4. recherche documentaire distingue sources internes Anno et sources officielles Hacienda ;
5. sources officielles maintient l'interdiction de faire d'Anno une source primaire ;
6. les fichiers ne contiennent aucun branding tiers ;
7. `npm test`, `npm run typecheck`, `npm run build`, `npm run branding:check`, `git diff --check` passent.

## Ordre D'Implémentation

1. Ajouter les tests de couverture awareness.
2. Mettre à jour les 10 skills PI prioritaires.
3. Mettre à jour les agents PI.
4. Mettre à jour recherche documentaire.
5. Mettre à jour sources officielles avec le minimum conservateur.
6. Lancer les validations complètes.
7. Committer par domaine si le diff devient trop large :
   - commit 1 : PI skills ;
   - commit 2 : PI agents ;
   - commit 3 : recherche documentaire et sources officielles.

## Critère De Fin

La phase est terminée quand un audit textuel trouve les marqueurs Anno Tabular et décisionnels dans les skills/agents qui les utilisent réellement, sans forcer Anno dans les workflows où il n'apporte rien.
