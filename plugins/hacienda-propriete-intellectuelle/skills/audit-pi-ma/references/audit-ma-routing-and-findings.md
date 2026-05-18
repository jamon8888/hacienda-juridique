# Audit M&A - routing and findings

Reference courte PI V2 pour le skill `audit-pi-ma`.

## 1. Quand ouvrir chaque branche

- `portefeuille-pi` : lecture consolidee marques + brevets, echeances, trous
  de couverture, verification portefeuille interne.
- `revue-open-source` : SBOM, dependances, risque AGPL ou copyleft fort,
  obligations notice/source, policy OSS.
- `revue-logiciel-donnees` : titularite logiciel/data, contributeurs,
  datasets, bases de donnees, restrictions de reuse.
- `depot-preuve-creation` : pieces absentes, dates non raccordees, chaine
  documentaire lacunaire, data room PI mal structuree.
- `contrats-pi` : regularisation contractuelle, clause PI, licence, transfert,
  protection transactionnelle.

## 2. Champs minimaux d'un finding

| Field | Meaning |
| --- | --- |
| id | identifiant stable du finding |
| severity | `Critical`, `High`, `Medium`, `Low` |
| asset_type | type d'actif concerne |
| asset_name | nom ou reference de l'actif |
| issue_category | titularite, OSS, registre, contentieux, etc. |
| summary | resume court du probleme |
| evidence_seen | pieces ou sources lues |
| missing_inputs | pieces ou donnees manquantes |
| deal_impact | impact transactionnel |
| recommended_action | action recommandee |
| timing | `pre-closing`, `closing`, `post-closing` |
| owner | responsable propose |
| status | `open`, `mitigable`, `blocked`, `validated` |

## 3. Timing transactionnel

- `pre-closing`
- `closing`
- `post-closing`
