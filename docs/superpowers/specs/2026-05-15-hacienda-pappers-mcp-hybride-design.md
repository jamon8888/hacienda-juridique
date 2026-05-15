# Hacienda Pappers MCP Hybride Design

## Objectif

Integrer Pappers dans Hacienda comme connecteur MCP externe pour les directions juridiques et les avocats d'affaires, sans le classer comme source officielle normative.

Pappers sert a enrichir les workflows d'affaires avec des donnees d'entreprise, dirigeants, beneficiaires effectifs, comptes, BODACC, procedures collectives, sanctions/PPE, cartographies et signaux de risque. Les sources juridiques normatives restent verifiees via `hacienda-sources-officielles`.

## Constat Technique

Le serveur MCP Pappers est distant et utilise uniquement le transport Streamable HTTP :

```text
https://mcp.pappers.fr/{PAPPERS_API_KEY}
```

Le SDK MCP installe dans Hacienda fournit `StreamableHTTPClientTransport`, donc Hacienda peut interroger le serveur Pappers pour decouvrir les tools et, avec une cle creditee, appeler les tools metier.

Les tests live realises avec deux cles non creditees confirment :

- `tools/list` fonctionne ;
- le serveur expose 30 tools ;
- les appels metier renvoient `credits insuffisants` avec ces cles ;
- `listPrompts` et `listResources` ne sont pas supportes.

## Tools Pappers Observes

### Entreprise Et KYC

- `sirenisateur`
- `informations-entreprise`
- `recherche-entreprises`
- `comptes-entreprise`
- `cartographie-entreprise`
- `recherche-dirigeants`
- `recherche-beneficiaires`
- `conformite-personne-physique`

### Documents Et Immobilier

- `lire-documents`
- `recherche-lieux`
- `recherche-parcelles`

### Justice

- `question-juridique`
- `recherche-decisions-justice`
- `details-decision-justice`
- `recherche-articles-loi`
- `details-article-loi`
- `sommaire-texte-loi`
- `recherche-textes-loi`

### Politique Et Territoire

- `recherche-documents-politiques`
- `details-document-politique`
- `details-dossier-politique`
- `recherche-amendements`
- `filtres-amendements`
- `recherche-acteurs-politiques`
- `details-acteur-politique`
- `recherche-interventions-politiques`
- `recherche-votes`
- `cartographie-politique`
- `details-document-territoire`
- `recherche-documents-territoire`

## Position Hacienda

Pappers n'est pas ajoute a `OFFICIAL_SOURCES`.

Hacienda ajoute une categorie separee :

```ts
export type BusinessDataSource = "PAPPERS";
```

Les livrables doivent distinguer :

- donnees Pappers lues ;
- source primaire sous-jacente mentionnee par Pappers quand disponible ;
- donnees recoupees via source officielle Hacienda ;
- donnees non recoupees marquees `[a verifier]`.

## Scope Hybride V1

La V1 ne cree pas encore de wrapper typed complet autour de chaque tool Pappers. Elle installe une integration hybride :

1. Declaration MCP externe Pappers dans les plugins metiers pertinents.
2. Skill et documentation d'usage par domaine.
3. Audit obligatoire via `hacienda-hub-confiance`.
4. Script de decouverte controle permettant de lister les tools sans stocker la cle.
5. Statut clair : cle absente, MCP joignable, tools visibles, credits insuffisants, appel metier valide.
6. Phase de validation creditee avant activation full power.

## Plugins Concernés

### `hacienda-societes`

Cas d'usage :

- due diligence societe ;
- cartographie groupe, filiales, dirigeants, beneficiaires ;
- verification d'actes, comptes, BODACC, procedures collectives ;
- preparation corporate / M&A.

Tools prioritaires :

- `sirenisateur`
- `informations-entreprise`
- `recherche-entreprises`
- `comptes-entreprise`
- `cartographie-entreprise`
- `recherche-dirigeants`
- `recherche-beneficiaires`
- `lire-documents`

### `hacienda-contrats`

Cas d'usage :

- verification cocontractant ;
- pouvoir du signataire ;
- solvabilite et signaux de risque ;
- clauses adaptees au profil de risque.

Tools prioritaires :

- `sirenisateur`
- `informations-entreprise`
- `recherche-dirigeants`
- `comptes-entreprise`
- `conformite-personne-physique`

### `hacienda-contentieux`

Cas d'usage :

- solvabilite adversaire ;
- procedures collectives ;
- dirigeants multi-societes ;
- actifs immobiliers ;
- decisions associees.

Tools prioritaires :

- `informations-entreprise`
- `comptes-entreprise`
- `cartographie-entreprise`
- `recherche-parcelles`
- `recherche-decisions-justice`
- `details-decision-justice`

### `hacienda-fiscal`

Cas d'usage :

- contexte groupe ;
- comptes et ratios ;
- filiales, actionnaires, maison mere ;
- verification identite entreprise.

Tools prioritaires :

- `informations-entreprise`
- `comptes-entreprise`
- `cartographie-entreprise`
- `recherche-entreprises`

### `hacienda-hub-confiance`

Cas d'usage :

- audit MCP Pappers ;
- classification des tools par risque ;
- validation humaine des champs PPE, sanctions, scoring, donnees personnelles et credits payants.

## Profils D'Activation

### `pappers-core-business`

Active pour les workflows affaires standards :

- `sirenisateur`
- `informations-entreprise`
- `recherche-entreprises`
- `comptes-entreprise`
- `cartographie-entreprise`
- `recherche-dirigeants`
- `recherche-beneficiaires`
- `lire-documents`

### `pappers-risk-compliance`

Active seulement avec validation explicite :

- `conformite-personne-physique`
- champs `sanctions`
- champs `personne_politiquement_exposee`
- champs `scoring_financier`
- champs `scoring_non_financier`

### `pappers-litigation`

Active pour contentieux et precontentieux :

- `recherche-decisions-justice`
- `details-decision-justice`
- `recherche-parcelles`

### `pappers-public-affairs`

Desactive par defaut. Active seulement pour droit public, reglementaire ou affaires publiques :

- tools politiques ;
- tools territoire ;
- amendements, dossiers politiques, votes.

## BODACC

Le MCP observe ne fournit pas de tool separe `bodacc`.

Le BODACC est accessible via :

- `informations-entreprise` avec `return_fields: ["publications_bodacc"]` ;
- `recherche-entreprises` avec filtres :
  - `type_publication` ;
  - `date_publication_min` ;
  - `date_publication_max`.

Types de publication observes :

- `Creation`
- `Immatriculation`
- `Modification`
- `Vente`
- `Radiation`
- `Procedure collective`
- `Depot des comptes`

Les livrables Hacienda doivent appeler ce flux `Pappers/BODACC` et indiquer si la publication BODACC sous-jacente n'a pas ete recoupee directement.

## Livrables Prioritaires

- Dossier KYC societe.
- Note de solvabilite cocontractant.
- Memo pouvoirs du signataire.
- Cartographie groupe / dirigeants / beneficiaires.
- Dossier pre-contentieux recouvrement.
- Note adverse party litigation.
- Alerte BODACC / procedure collective.
- Vendor or customer due diligence.

## Garde-Fous

1. Ne jamais stocker `PAPPERS_API_KEY` dans le depot.
2. Ne jamais afficher la cle dans logs, specs ou erreurs.
3. Les tools PPE, sanctions et scoring exigent une intention explicite.
4. Les donnees de personnes physiques sont minimisees dans les livrables.
5. Les donnees Pappers ne remplacent pas la verification juridique primaire.
6. Toute citation normative trouvee via Pappers Justice doit etre recoupee via `hacienda-sources-officielles`.
7. Les appels live metier sont conditionnes par une cle creditee.
8. Le statut `credits insuffisants` est un etat normal et documente, pas une panne.

## Validation Creditee Requise

Avant activation full power, executer une matrice live avec une cle creditee :

| Tool | Test minimal | Statut attendu |
| --- | --- | --- |
| `sirenisateur` | LVMH -> SIREN | retourne au moins un resultat |
| `informations-entreprise` | SIREN `552100554` | retourne nom, siege, forme |
| `comptes-entreprise` | SIREN `552100554` | retourne au moins un exercice |
| `cartographie-entreprise` | SIREN `552100554` | retourne noeuds/liens |
| `recherche-dirigeants` | dirigeant connu | retourne au moins un resultat |
| `recherche-beneficiaires` | filtre minimal | retourne schema exploitable |
| `conformite-personne-physique` | personne test validee | retourne statut PPE/sanctions |
| `informations-entreprise` BODACC | `publications_bodacc` | retourne publications ou liste vide structuree |
| `recherche-decisions-justice` | requete contentieux | retourne decisions |

Chaque test doit conserver :

- date ;
- tool ;
- arguments non sensibles ;
- statut ;
- resume des champs recus ;
- cout ou absence d'information de cout ;
- decision d'activation.

## Critères D'Acceptation

- Les plugins metiers declarent Pappers uniquement comme MCP externe optionnel.
- Le hub confiance sait auditer Pappers comme connecteur medium/high selon profil.
- Les skills metiers decrivent quand appeler Pappers et quand recouper.
- Le statut Pappers distingue absence de cle, tools visibles, credits insuffisants et appel valide.
- Aucun secret n'est commite.
- Aucun workflow ne promet un livrable full power sans validation creditee.
