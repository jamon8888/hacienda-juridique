# Hacienda + Anno Deep Legal Orchestration — Design

Date: 2026-05-26
Statut: prêt pour revue
Périmètre: dépôt `hacienda-juridique` uniquement. Le dépôt `C:\Users\NMarchitecte\anno` reste une dépendance locale lue et orchestrée, sans modification depuis Hacienda.

## Hypothèse De Travail

Cette spec part de l'hypothèse cible demandée : **Anno Tabular est terminé selon le plan Anno**.

Cela signifie que la distribution Hacienda + Anno Desktop peut considérer comme disponibles, après vérification par `anno_health`, les capacités suivantes :

- moteur MCP `anno-rag mcp` ;
- vault local, détection PII, pseudonymisation et réhydratation ;
- mémoire locale avec rappel, graphe, oubli, liste et invalidation ;
- Legal RAG : ingestion, recherche, graphe juridique, réhydratation de citations ;
- extraction juridique : contrat, dossier, chronologie, risques, clauses obligatoires, prescription, validation humaine ;
- revue tabulaire Anno : création de grilles, ajout de lignes, raffinement de cellules, correction/verrouillage humain, export, ouverture d'une MCP App grille, ressources `review://`.

La spec reste compatible avec un moteur Anno plus ancien : chaque capacité tabulaire doit être activée uniquement si `anno_health.available_tools` la confirme.

## Objectif

Créer une orchestration Hacienda + Anno qui transforme les plugins juridiques Hacienda en workflows de travail local complets :

1. **Hacienda reste le cadre juridique et produit** : garde-fous, sources officielles, skills métier, livrables client, distribution autonome.
2. **Anno devient le moteur local de dossier** : ingestion, recherche, graphe, mémoire, extraction structurée, revue tabulaire, validation et citations.
3. **La revue tabulaire devient le centre opérationnel** : les faits extraits ne sont pas seulement racontés dans un texte, ils sont organisés en cellules citées, vérifiées, corrigeables et exportables.

L'intégration ne doit jamais présenter Anno comme source officielle ou comme conseil juridique final.

## Patterns De Référence À Retenir

L'analyse des plateformes juridiques IA avancées fait ressortir six patterns que Hacienda doit reprendre sous son propre modèle local :

1. **Dossier-vault gouverné** : les documents, grilles, exports, mémoires et permissions appartiennent à un espace dossier explicite, pas à une conversation isolée.
2. **Revue tabulaire collaborative** : les documents deviennent des lignes, les prompts deviennent des colonnes, les cellules sont citées, filtrables, verrouillables et revues par statut.
3. **Workflows réutilisables** : les tâches métier sont des playbooks versionnés avec entrées, étapes, tools autorisés, seuils de sortie et exemples de référence.
4. **Base de connaissance contrôlée** : précédents, clauses types, positions cabinet et checklists sont séparés des faits du dossier client.
5. **Passage de la table à la décision** : la grille ne sert pas seulement à extraire ; elle sert à isoler les risques, comparer les documents, attribuer les actions et préparer les décisions client.
6. **Livrable depuis données vérifiées** : tout rapport, courrier, note ou contrat produit par Hacienda doit pouvoir remonter aux cellules, citations et validations qui le supportent.

## Principes Directeurs

### 1. Anno Est Un Moteur De Dossier, Pas Une Source De Droit

Anno sert à lire, structurer, relier et citer les pièces locales du dossier client. Les sources de droit restent traitées par Hacienda et ses sources officielles : Légifrance, BOFiP, JORF, KALI, Judilibre, BOSS et sources administratives ou juridictionnelles réelles.

Tout passage Anno est classé comme **source interne de dossier**.

### 2. Revue Tabulaire Avant Rédaction

Pour les workflows riches en pièces, contrats, actifs, risques ou événements, Hacienda doit produire ou consulter une grille Anno avant de rédiger une synthèse.

La grille devient le support de contrôle :

- une ligne par document, actif, clause, fait, événement ou risque ;
- une colonne par information métier ;
- une cellule avec valeur, citation, score de support, statut de validation et historique ;
- une correction humaine enregistrée et verrouillable ;
- un export final lorsque la grille est stable.

### 3. Validation Humaine Obligatoire Pour Les Faits Sensibles

Un fait extrait par Anno ne devient utilisable comme fait validé que s'il est :

- confirmé par citation réhydratable ;
- ou explicitement validé/corrigé via `legal_validate_field` ;
- ou marqué comme non validé dans le livrable.

Les éléments incertains restent tagués `[à vérifier]`.

### 4. Fonctionnement Sans Anno Conservé

Tous les plugins Hacienda restent utilisables sans Anno. Si `anno_health` échoue ou si une capacité manque, le workflow bascule en `fallback_hacienda` sans interrompre le travail.

### 5. Dossier Avant Conversation

Les workflows Anno ne doivent pas dépendre d'un état de chat fragile. Les informations durables sont rattachées à un `matter_vault`, à une grille tabulaire, à une mémoire validée ou à une base de connaissance Hacienda.

## Architecture Cible

```text
Client local
  |
  | Claude Desktop
  v
Distribution Hacienda + Anno Desktop
  |
  |-- Plugins Hacienda autonomes
  |     |-- hacienda-sources-officielles
  |     |-- hacienda-recherche-documentaire
  |     |-- hacienda-propriete-intellectuelle
  |
  |-- Hacienda Anno Coordinator
  |     |-- health gate
  |     |-- mode selection
  |     |-- matter vault
  |     |-- workflow blueprints
  |     |-- knowledge base routing
  |     |-- output contract
  |     |-- legal guardrails
  |
  |-- anno-rag MCP
        |-- vault / PII / rehydrate
        |-- memory
        |-- legal RAG
        |-- legal graph
        |-- legal extraction
        |-- tabular review
        |-- MCP App grid
```

## Objets Produit Hacienda + Anno

### `matter_vault`

Un `matter_vault` représente l'espace local d'un dossier client. Il gouverne le périmètre des documents, grilles, exports, validations et mémoires autorisées.

Champs minimaux :

| Champ | Rôle |
|---|---|
| `matter_id` | Identifiant stable du dossier |
| `client_label` | Nom ou pseudonyme client |
| `scope` | Périmètre validé par l'utilisateur |
| `authorized_users` | Utilisateurs autorisés localement |
| `source_sets` | Fichiers, dossiers, emails ou exports ingérés |
| `review_tables` | Grilles Anno liées au dossier |
| `knowledge_refs` | Playbooks, clauses ou précédents autorisés |
| `exports` | Livrables produits depuis les données vérifiées |
| `retention_policy` | Conservation et purge locale |
| `access_policy` | Règles de lecture, modification et réhydratation |

Un workflow ne doit jamais utiliser un document hors `scope`, même si Anno peut techniquement le retrouver.

### `workflow_blueprint`

Un `workflow_blueprint` est un playbook Hacienda versionné et rejouable.

Champs minimaux :

| Champ | Rôle |
|---|---|
| `blueprint_id` | Exemple : `pi-ma-diligence-v1` |
| `practice_area` | Domaine juridique Hacienda |
| `inputs_required` | Documents, questions et métadonnées nécessaires |
| `anno_mode_required` | `anno_lite`, `anno_legal` ou `anno_tabular` |
| `tool_sequence` | Tools autorisés, dans l'ordre logique |
| `review_template` | Template tabulaire attendu |
| `quality_gates` | Conditions de passage et seuils de validation |
| `escalation_rules` | Cas nécessitant validation avocat |
| `output_contract` | Format de sortie attendu |
| `examples` | Exemples internes Hacienda, sans contenu client réel |

Blueprints PI prioritaires :

- `pi-ma-diligence-v1` ;
- `clause-pi-review-v1` ;
- `software-data-chain-v1` ;
- `oss-obligations-review-v1` ;
- `infringement-triage-v1` ;
- `ip-portfolio-review-v1` ;
- `creation-evidence-file-v1`.

### `hacienda_knowledge_base`

La base de connaissance Hacienda est séparée de la mémoire Anno.

Elle peut contenir :

- positions de playbook cabinet ;
- modèles de clauses PI ;
- précédents anonymisés ;
- grilles de risques ;
- seuils de validation ;
- checklists métier ;
- exemples de livrables approuvés.

Elle ne peut pas contenir :

- dossier client non anonymisé hors demande explicite ;
- secret ;
- passphrase ;
- source officielle non vérifiée présentée comme vérifiée.

### `grid_to_work_product`

Le pipeline `grid_to_work_product` transforme une grille validée en livrable.

Étapes :

1. sélectionner la grille et les colonnes pertinentes ;
2. filtrer les lignes selon `decision_status`, `risk_level`, `validation_status` et `assignee` ;
3. vérifier que les cellules clés ont citation ou validation humaine ;
4. générer la note, le courrier, le rapport ou l'annexe ;
5. exécuter `tabular_review_verify_citations_in_output` sur les citations reprises ;
6. signaler tout passage non vérifiable en `[à vérifier]` ;
7. exporter le livrable et conserver le lien vers la grille source.

## Modes D'Exécution

### `standalone_hacienda`

Condition : Anno absent ou désactivé.

Comportement :

- poursuivre avec les skills Hacienda ;
- ne pas faire référence à une mémoire locale Anno ;
- marquer les pièces client non consultées comme `[à vérifier]` si elles ne sont pas fournies autrement.

### `anno_lite`

Condition : outils disponibles : `anno_health`, `detect`, `vault_stats`, `search`, `rehydrate`.

Comportement :

- utiliser Anno pour PII, recherche locale générale et réhydratation autorisée ;
- ne pas appeler les outils juridiques spécialisés.

### `anno_legal`

Condition : outils disponibles : `legal_ingest`, `legal_search`, `legal_graph_query`, `legal_rehydrate_citation`, `legal_extract_contract`, `legal_extract_case_file`, `legal_timeline`, `legal_risk_review`, `legal_mandatory_clause_audit`, `legal_prescription_check`, `legal_validate_field`.

Comportement :

- utiliser le graphe juridique et les extractions structurées ;
- produire des revues de contrat, de dossier, de timeline et de risques ;
- enregistrer les validations humaines.

### `anno_tabular`

Condition : outils tabulaires disponibles selon `anno_health.available_tools`.

Noms attendus dans la distribution Hacienda :

- `tabular_review_create` ;
- `tabular_review_add_rows` ;
- `tabular_review_refine_cell` ;
- `tabular_review_set_cell` ;
- `tabular_review_lock_cell` ;
- `tabular_review_unlock_cell` ;
- `tabular_review_export` ;
- `tabular_review_open` ;
- `tabular_review_verify_citations_in_output`.

Ressources attendues :

- `review://{id}` ;
- `review://{id}/cell/{row}/{col}` ;
- `review://{id}/source/{doc}#span=...`.

Comportement :

- créer une grille par workflow ou dossier ;
- alimenter les lignes depuis les documents ingérés ;
- exploiter les templates Anno (`ip-v1`, `customer-contract-v1`, `nda-v1`, etc.) ;
- afficher ou ouvrir la MCP App grille quand une revue humaine est nécessaire ;
- exporter en CSV, XLSX ou Markdown selon le besoin client.

## Health Gate Et Compatibilité Moteur

Avant tout outil Anno, le coordinator doit :

1. charger `engine-compat.json` ;
2. appeler `anno_health` ;
3. comparer `engine_version` au minimum requis ;
4. calculer les tools manquants ;
5. choisir un mode d'exécution.

Le `engine-compat.json` Hacienda doit passer d'une liste plate minimale à une déclaration par niveaux :

```json
{
  "min_engine_version": "0.3.0",
  "recommended_engine_version": "0.3.0",
  "tool_tiers": {
    "core": [
      "anno_health",
      "detect",
      "vault_stats",
      "search",
      "rehydrate"
    ],
    "setup": [
      "anno_init_vault",
      "download_models"
    ],
    "memory": [
      "memory_save",
      "memory_recall",
      "memory_graph_recall",
      "memory_forget",
      "memory_list",
      "memory_invalidate"
    ],
    "legal": [
      "legal_ingest",
      "legal_search",
      "legal_graph_query",
      "legal_rehydrate_citation",
      "legal_extract_contract",
      "legal_extract_case_file",
      "legal_timeline",
      "legal_risk_review",
      "legal_mandatory_clause_audit",
      "legal_prescription_check",
      "legal_validate_field"
    ],
    "tabular": [
      "tabular_review_create",
      "tabular_review_add_rows",
      "tabular_review_refine_cell",
      "tabular_review_set_cell",
      "tabular_review_lock_cell",
      "tabular_review_unlock_cell",
      "tabular_review_export",
      "tabular_review_open",
      "tabular_review_verify_citations_in_output"
    ]
  },
  "release_page_url": "https://github.com/arclabs561/anno/releases"
}
```

Pour rester compatible avec la compétence `anno-engine-check`, la distribution peut aussi générer une vue legacy :

```json
{
  "required_tools": [
    "anno_health",
    "detect",
    "vault_stats",
    "legal_ingest",
    "legal_search",
    "legal_graph_query",
    "legal_rehydrate_citation"
  ]
}
```

## Cycle De Vie D'Un Dossier

### 1. Initialisation

Le plugin demande si l'utilisateur veut activer Anno pour le dossier.

Si oui :

1. appeler `anno_health` ;
2. vérifier `vault_initialized` ;
3. si besoin, guider vers `anno_init_vault` sans jamais journaliser la passphrase ;
4. vérifier si les modèles nécessaires sont présents ;
5. proposer `download_models` seulement pendant une phase explicite de setup, jamais silencieusement pendant un travail client.

### 2. Ingestion

L'ingestion est toujours volontaire :

1. confirmer le périmètre local : fichier, dossier, sous-dossier ;
2. appeler `detect` ou appliquer la gestion PII Anno équivalente ;
3. appeler `legal_ingest` ;
4. enregistrer le `dossier_id`, les `doc_id` et les limites de corpus ;
5. produire un résumé d'ingestion sans contenu sensible.

### 3. Enrichissement Juridique

Anno enrichit les chunks avec :

- type de document ;
- domaine juridique ;
- juridiction ;
- dossier ;
- parties et rôles ;
- références juridiques ;
- types de clauses ;
- obligations ;
- montants ;
- deadlines ;
- événements ;
- risques ;
- statut de clauses obligatoires ;
- scores de confiance.

### 4. Revue Tabulaire

Le plugin choisit un template :

| Contexte Hacienda | Template Anno |
|---|---|
| Audit PI / M&A | `ip-v1` |
| Contrat commercial PI | `customer-contract-v1` adapté PI |
| NDA / secret d'affaires | `nda-v1` |
| Dossier contentieux | template dossier à dériver de `legal_extract_case_file` |
| Open source / logiciel | template Hacienda à créer sur le modèle Anno |

Workflow tabulaire :

1. `tabular_review_create` avec nom, projet, template et périmètre ;
2. `tabular_review_add_rows` avec documents ou dossier ;
3. extraction automatique en arrière-plan ;
4. lecture de `review://{id}` ;
5. raffinement ciblé via `tabular_review_refine_cell` ;
6. corrections humaines via `tabular_review_set_cell` ;
7. verrouillage via `tabular_review_lock_cell` ;
8. vérification des citations via `tabular_review_verify_citations_in_output` ;
9. export via `tabular_review_export`.

### 5. Validation

Chaque fait utilisé dans un livrable doit être classé :

- `validé` : confirmé par l'utilisateur ou par une cellule verrouillée ;
- `corrigé` : correction humaine enregistrée ;
- `rejeté` : extraction inutilisable ;
- `à vérifier` : confidence faible, citation absente, source non consultée ou conflit.

Quand le fait provient du Legal RAG hors tabular, utiliser `legal_validate_field`.

### 6. Livrable Hacienda

Le livrable final sépare :

```text
Faits issus du dossier client
Grille Anno consultée
Sources internes Anno
Sources officielles Hacienda
Analyse juridique
Risques et incertitudes
Décisions proposées
Validation humaine requise
Annexes exportées
```

## Revue Tabulaire : Modèle De Données Attendu

Chaque cellule de revue doit exposer au minimum :

| Champ | Rôle |
|---|---|
| `review_id` | Identifiant de la grille |
| `row_id` | Ligne, souvent liée à un document ou actif |
| `col_id` | Colonne métier |
| `value` | Valeur extraite ou corrigée |
| `reasoning` | Justification interne si disponible |
| `citations` | Chunks, offsets, quote, page |
| `support_score` | Score de support citation / colonne |
| `confidence` | `High`, `Medium`, `Low` |
| `locked` | Protection contre l'écrasement automatique |
| `version` | Historique append-only |
| `author` | `System` ou `Human` |
| `updated_at` | Horodatage |
| `review_status` | non revu, en revue, revu, bloqué |
| `assignee` | responsable de revue |
| `reviewer_role` | avocat, juriste, expert technique, client |
| `last_reviewed_at` | dernière revue humaine |
| `decision_status` | accepté, à négocier, à régulariser, à exclure |
| `issue_owner` | responsable de l'action suivante |
| `action_deadline` | date limite interne |

Hacienda ne doit pas écraser une cellule humaine verrouillée. Si une extraction automatique contredit une cellule verrouillée, la contradiction devient un point d'attention.

## Collaboration Et Review Mode

La revue tabulaire doit fonctionner comme un espace de travail contrôlé :

- `Mark as Reviewed` Hacienda : une ligne ou cellule revue reçoit `review_status = reviewed` avec auteur et horodatage ;
- `Review Mode` : seules les cellules non revues, faibles, contradictoires ou assignées sont affichées ;
- `Lock Cells` : une correction humaine verrouillée bloque les réécritures automatiques ;
- `Batch Review` : un lot de documents peut être assigné à un reviewer ;
- `Second Review` : certains risques déclenchent une double validation ;
- `External Partner View` : toute vue partagée à un tiers exclut les secrets, mémoires internes et sources non autorisées.

Les statuts de collaboration sont des données de gouvernance. Ils ne doivent pas être déduits librement par le modèle sans action explicite de l'utilisateur.

## Spécialisation Recherche Documentaire

### Usage Anno

- ingestion explicite de corpus client ;
- recherche locale dans les pièces ;
- graphe de dossier ;
- extraction de références ;
- revue tabulaire des références trouvées ;
- vérification des citations dans la production finale.

### Grille Type

| Colonne | Description |
|---|---|
| `reference_candidate` | Référence juridique ou doctrinale mentionnée |
| `source_context` | Passage client où la référence apparaît |
| `source_type` | contrat, email, assignation, note, pièce |
| `official_source_needed` | source officielle à consulter |
| `official_source_status` | consultée, non consultée, introuvable |
| `hacienda_verification` | résultat sources officielles |
| `citation` | citation Anno interne |
| `validation_status` | validé, corrigé, rejeté, à vérifier |
| `assignee` | responsable de vérification |
| `decision_status` | exploiter, ignorer, vérifier source officielle |

### Règle Forte

Une référence découverte par Anno ne suffit jamais. Elle déclenche une vérification Hacienda auprès des sources officielles.

## Spécialisation Sources Officielles

### Usage Anno

Anno peut aider à :

- retrouver dans le dossier client le fait qui motive la recherche ;
- relier une pièce à une référence juridique mentionnée ;
- préparer les requêtes de vérification.

### Interdictions

Anno ne peut pas :

- remplacer Légifrance, BOFiP, JORF, KALI, Judilibre ou BOSS ;
- prouver l'état du droit ;
- produire une provenance officielle ;
- retirer le tag `[à vérifier]` si la source primaire n'a pas été consultée.

## Spécialisation Propriété Intellectuelle

Le plugin PI est le principal bénéficiaire de la revue tabulaire.

### 1. Revue De Clauses PI

Outils :

- `legal_extract_contract` ;
- `legal_risk_review` ;
- `legal_mandatory_clause_audit` ;
- `tabular_review_create` avec template contrat PI ;
- `tabular_review_refine_cell` pour les clauses ambiguës.

Grille :

| Colonne | Description |
|---|---|
| `clause_type` | cession, licence, confidentialité, garantie, indemnisation |
| `clause_text` | extrait cité |
| `rights_scope` | droits couverts |
| `territory` | territoire |
| `duration` | durée |
| `exclusivity` | oui/non/détail |
| `sub_license` | autorisée/interdite/incertaine |
| `warranty` | garantie donnée ou reçue |
| `risk_level` | élevé, moyen, faible |
| `recommended_action` | action de revue |
| `validation_status` | statut humain |
| `decision_status` | accepter, renégocier, bloquer, vérifier |
| `issue_owner` | responsable de l'action |

### 2. Contrats Logiciel Et Données

Outils :

- `legal_extract_contract` ;
- `legal_search` avec filtres clauses, obligations, parties ;
- `legal_graph_query` pour chaîne de droits ;
- revue tabulaire dédiée.

Grille :

| Colonne | Description |
|---|---|
| `asset` | logiciel, base, dataset, documentation |
| `contributor` | auteur, salarié, prestataire, tiers |
| `source_contract` | contrat support |
| `assignment_or_license` | cession, licence, absence |
| `scope_gap` | droit manquant ou incertain |
| `data_rights` | droits sur données |
| `open_source_dependency` | dépendance liée |
| `evidence` | citation |
| `action` | régulariser, vérifier, accepter |
| `decision_status` | closing blocker, remédiation, acceptable, à vérifier |

### 3. Revue Open Source

Outils :

- `legal_search` ;
- `legal_graph_query` ;
- `legal_risk_review` ;
- revue tabulaire de composants.

Anno ne remplace pas un scanner SCA. La grille sert à relier documents client, listes de composants, notices, contrats et obligations.

Colonnes :

- composant ;
- version ;
- licence annoncée ;
- usage ;
- obligation ;
- conflit potentiel ;
- source du fait ;
- action recommandée ;
- validation.

### 4. Contentieux Et Contrefaçon

Outils :

- `legal_extract_case_file` ;
- `legal_timeline` ;
- `legal_graph_query` avec intentions `party_dossier`, `procedural_timeline`, `citation_chain` ;
- `legal_prescription_check` ;
- revue tabulaire de faits allégués.

Grille :

| Colonne | Description |
|---|---|
| `alleged_fact` | fait allégué |
| `evidence_piece` | pièce support |
| `date` | date du fait |
| `right_invoked` | marque, brevet, droit d'auteur, dessin, logiciel |
| `party` | demandeur, défendeur, tiers |
| `weakness` | manque de preuve ou contradiction |
| `prescription_anchor` | point de départ possible |
| `prescription_result` | résultat calculé |
| `validation_status` | statut humain |
| `decision_status` | exploitable, faible, à exclure, à compléter |

### 5. Mise En Demeure PI

Outils :

- `legal_search` ;
- `legal_rehydrate_citation` ;
- `legal_risk_review` ;
- `legal_prescription_check` si temporalité pertinente ;
- revue tabulaire des faits à invoquer.

La lettre ne doit jamais affirmer une contrefaçon établie de manière définitive sur la seule base d'Anno.

### 6. Portefeuille PI

Outils :

- `legal_graph_query` ;
- `memory_recall` et `memory_graph_recall` pour préférences ou contexte approuvé ;
- `tabular_review_create` avec `ip-v1`.

Template `ip-v1` :

- actif ;
- type ;
- titulaire ;
- numéro d'enregistrement ;
- juridictions ;
- statut ;
- date de dépôt ;
- date de renouvellement ;
- chaîne de titularité ;
- sûretés ;
- licences entrantes ;
- licences sortantes ;
- réclamations de contrefaçon.

Hacienda ajoute les colonnes métier françaises :

- source officielle à vérifier ;
- INPI/EPO/EUIPO/WIPO consulté ;
- écart titre/contrat ;
- criticité business ;
- action recommandée ;
- validation avocat.

### 7. Preuve De Création

Outils :

- `legal_ingest` ;
- `legal_search` ;
- `legal_timeline` ;
- revue tabulaire des éléments de preuve.

Anno ne remplace jamais un dépôt officiel, un horodatage, un constat ou une preuve externe.

## Requêtes Décisionnelles PI

Chaque grille PI doit exposer une série de questions prêtes à l'emploi. Ces requêtes ne remplacent pas l'analyse juridique ; elles servent à transformer les cellules validées en points de décision.

### Audit PI / M&A

- Quels actifs PI sont des blockers de closing ?
- Quels actifs ont une chaîne de titularité incomplète ?
- Quels contrats contiennent une restriction de cession, change of control ou sublicence ?
- Quels actifs ont une source officielle non vérifiée ?
- Quelles actions doivent être closes avant signature ?

### Clauses PI

- Quelles clauses de cession ne couvrent pas les modes d'exploitation attendus ?
- Quelles clauses de garantie ou indemnisation sont déséquilibrées ?
- Quelles clauses sont contradictoires entre contrat, annexe et bon de commande ?
- Quelles cellules faibles nécessitent une seconde revue avocat ?

### Logiciel, Données Et Open Source

- Quelles dépendances créent une obligation de disclosure ou de redistribution ?
- Quels contributeurs n'ont pas de chaîne de droits documentée ?
- Quels datasets posent un risque de réutilisation ou d'entraînement non autorisé ?
- Quelles remédiations sont nécessaires avant livraison ou closing ?

### Contentieux Et Contrefaçon

- Quels faits allégués ont une preuve directe ?
- Quels faits reposent seulement sur une inférence ?
- Quels événements déclenchent un risque de prescription ?
- Quelles pièces sont contradictoires ou insuffisantes ?

## Livrables Générés Depuis Grille

Les livrables PI doivent indiquer leur source tabulaire quand ils utilisent Anno :

| Livrable | Source minimale |
|---|---|
| Note de due diligence PI | grille `ip-v1` ou dérivée, cellules critiques validées |
| Rapport portefeuille | grille actifs, sources officielles à jour, actions |
| Note revue clauses | grille clauses, risques, décisions de négociation |
| Projet mise en demeure | grille faits/preuves, citations, validation avocat |
| Note contentieux | grille dossier, timeline, prescription, pièces |
| Annexe client | export filtré, sans mémoire interne ni notes confidentielles |

Un livrable ne doit pas masquer les lignes `à vérifier`. Elles doivent être listées en annexe ou dans une section d'incertitudes.

## Mémoire Anno

La mémoire Anno est utile pour :

- préférences de cabinet ;
- conventions de rédaction ;
- contexte de dossier approuvé ;
- faits de portefeuille validés ;
- décisions de validation humaine.

Elle ne doit pas stocker :

- secrets ;
- passphrases ;
- contenu client massif sans demande explicite ;
- données personnelles inutiles ;
- conclusions juridiques finales présentées comme vérité.

Chaque usage mémoire doit avoir une sortie possible :

- `memory_list` pour audit ;
- `memory_forget` pour suppression ;
- `memory_invalidate` pour invalider une information obsolète.

## Erreurs Et Fallback

| Situation | Comportement |
|---|---|
| `anno_health` échoue | bascule `fallback_hacienda` |
| tool légal manquant | mode inférieur, signalement clair |
| tool tabulaire manquant | utiliser grille Markdown/HTML Hacienda, sans promettre MCP App |
| vault non initialisé | proposer setup, ne pas ingérer |
| modèles absents | proposer `download_models` seulement en setup |
| citation non réhydratable | marquer `[à vérifier]` |
| cellule confidence `Low` | validation humaine obligatoire |
| cellule verrouillée contredite | créer un point de contradiction, ne pas écraser |

## Artefacts À Produire Dans Hacienda

### Plugin Factory

- générer `engine-compat.json` par niveaux ;
- générer `ANNO-COORDINATOR.md` enrichi ;
- générer `ANNO-TABULAR.md` ;
- générer `ANNO-MATTER-VAULT.md` ;
- générer `ANNO-WORKFLOW-BLUEPRINTS.md` ;
- générer `ANNO-WORKFLOWS.md` par plugin ;
- générer des templates de revue Hacienda quand Anno Tabular est disponible.

### Plugins

Chaque plugin doit documenter :

- ses modes Anno ;
- ses outils autorisés ;
- ses grilles tabulaires ;
- ses workflow blueprints ;
- ses requêtes décisionnelles ;
- son pipeline `grid_to_work_product` ;
- ses règles de validation ;
- son fallback.

### Tests

Ajouter ou étendre les tests pour vérifier :

- les tiers de tools dans `engine-compat.json` ;
- les tools tabulaires dans la distribution ;
- la présence des objets `matter_vault`, `workflow_blueprint`, `hacienda_knowledge_base` et `grid_to_work_product` ;
- la présence des règles `legal_validate_field` ;
- la présence de `legal_prescription_check` dans les workflows contentieux ;
- la présence de statuts de revue, assignation, verrouillage et décision dans les grilles ;
- l'interdiction de présenter Anno comme source primaire ;
- le fallback tabulaire si les tools manquent ;
- l'absence d'écriture dans `C:\Users\NMarchitecte\anno`.

## Critères D'Acceptation

La spec est implémentée quand :

1. `npm run plugin:anno-dist` génère une distribution qui documente les modes `standalone_hacienda`, `anno_lite`, `anno_legal`, `anno_tabular`.
2. `engine-compat.json` déclare les outils par niveaux.
3. `ANNO-COORDINATOR.md` explique le health gate, le fallback, la validation humaine et la revue tabulaire.
4. Chaque plugin actif reçoit un `ANNO-WORKFLOWS.md` spécialisé.
5. Le plugin PI contient des workflows tabulaires pour clauses, contrats, logiciel/données, open source, contentieux, portefeuille et preuve.
6. Les grilles PI contiennent statuts de revue, assignation, décisions, actions et deadlines.
7. Les workflows Hacienda peuvent produire un livrable depuis une grille validée via `grid_to_work_product`.
8. Les sources officielles restent explicitement autoritaires face aux résultats Anno.
9. Les sorties Hacienda distinguent faits, droit, analyse, incertitudes, décisions et validation humaine.
10. Les tests passent : `npm test`, `npm run typecheck`, `npm run build`, `npm run branding:check`, `git diff --check`.
11. Aucune modification n'est faite dans le dépôt Anno.

## Non-Objectifs

- Ne pas modifier le dépôt Anno.
- Ne pas copier le code source Anno dans Hacienda.
- Ne pas ingérer automatiquement de dossier client.
- Ne pas forcer Anno dans les plugins Hacienda autonomes.
- Ne pas remplacer les sources officielles.
- Ne pas transformer une extraction tabulaire en conseil juridique final.

## Plan De Suite Recommandé

1. Mettre à jour `tools/hacienda-plugin-factory/src/anno-distribution.ts` pour refléter les tiers de tools et générer `ANNO-TABULAR.md`.
2. Ajouter les artefacts `ANNO-MATTER-VAULT.md` et `ANNO-WORKFLOW-BLUEPRINTS.md`.
3. Étendre `packages/core/test/hacienda-anno-distribution.test.ts` avec les assertions tabulaires, collaboration et livrables.
4. Enrichir les overlays PI pour utiliser la revue tabulaire comme étape centrale.
5. Enrichir recherche documentaire avec une grille de références et de vérification.
6. Garder sources officielles strictement limitées au croisement de faits client et sources primaires.
7. Générer la distribution et vérifier le contenu client.
8. Exécuter la suite complète avant commit.
