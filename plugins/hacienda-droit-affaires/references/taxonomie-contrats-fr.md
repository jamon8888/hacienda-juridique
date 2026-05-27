# Taxonomie des contrats — droit français

Référence de tri pour orienter rapidement un document vers le bon skill
`hacienda-droit-affaires` ou, si nécessaire, vers le plugin compagnon
`hacienda-propriete-intellectuelle`.

---

## Légende skill recommandé

- `🟢 droit-affaires:reviser-contrat` — workflow contrat commercial standard
- `🟠 PI:contrats-pi` — workflow contrat PI ou à dominante PI
- `🔵 droit-affaires:gap-review` — workflow garantie d'actif et de passif / sujet M&A
- `🟣 droit-affaires:declaration-creance` — workflow procédure collective côté créancier
- `⚪ v1.1+` — hors périmètre v1, ne pas improviser

---

## Contrats commerciaux standards

| Type | Caractéristiques principales | Skill recommandé |
|---|---|---|
| CGV / CGA | Conditions générales de vente / d'achat, délais de paiement, pénalités, limitation de responsabilité | 🟢 `reviser-contrat` |
| Distribution exclusive | Exclusivité territoriale, clientèle, gamme ; vigilance concurrence | 🟢 `reviser-contrat` |
| Distribution sélective | Réseau de revendeurs selon critères qualitatifs ; articulation droit UE | 🟢 `reviser-contrat` |
| Distribution non exclusive | Cadre commercial standard, obligations de volume et de promotion | 🟢 `reviser-contrat` |
| Franchise | Volet commercial + DIP ; souvent composante marque / savoir-faire | 🟢 `reviser-contrat` pour le tronc commercial, 🟠 `PI:contrats-pi` si le coeur du débat porte sur la marque ou le savoir-faire |
| Prestation de services | Obligation de moyens / résultat, livrables, recette, support | 🟢 `reviser-contrat` |
| Contrat-cadre fournisseur | Conditions générales de relation, commandes, SLA, pénalités | 🟢 `reviser-contrat` |
| Mandat | Représentation, pouvoirs, rémunération, responsabilité | 🟢 `reviser-contrat` |
| Agence commerciale | Statut protecteur spécifique de l'agent, indemnité de fin | 🟢 `reviser-contrat` |
| Bail commercial | Durée, destination, loyer, travaux, cession, renouvellement | 🟢 `reviser-contrat` |
| MSA / SaaS B2B standard | Contrat de services numériques sans enjeu PI central | 🟢 `reviser-contrat` |
| Accord de services intragroupe | Prestations entre sociétés liées, gouvernance, prix, responsabilité | 🟢 `reviser-contrat` |

---

## Contrats M&A et corporate

| Type | Caractéristiques principales | Skill recommandé |
|---|---|---|
| SPA / protocole de cession | Cession de titres, déclarations et garanties, conditions suspensives | 🟢 `reviser-contrat` pour la revue générale ; 🔵 `gap-review` si le focus porte sur la GAP |
| APA / cession de fonds ou d'actifs | Transfert d'actifs, contrats, salariés, passifs repris / exclus | 🟢 `reviser-contrat` |
| GAP / garantie d'actif et de passif | Plafond, franchise, seuils, durée, panier, exclusions, notification | 🔵 `gap-review` |
| Convention de séquestre | Sécurisation prix / garantie, libération conditionnelle | 🟢 `reviser-contrat` |
| Pacte d'associés | Gouvernance, agrément, préemption, tag / drag, sortie | ⚪ `v1.1+` |
| LOI / term sheet | Précontractuel, exclusivité, confidentialité, répartition des coûts | ⚪ `v1.1+` |
| Closing checklist | Pilotage closing, pièces, conditions suspensives | ⚪ `v1.1+` |
| Convention de management package | Instruments, leaver clauses, liquidité, fiscalité | ⚪ `v1.1+` |

---

## NDA / Confidentialité

| Type | Caractéristiques principales | Skill recommandé |
|---|---|---|
| NDA commercial pur | Confidentialité précontractuelle ou opérationnelle sans composante PI majeure | 🟢 `reviser-nda` |
| NDA bilatéral M&A | Data room, due diligence, accès informations sensibles, clean teams | 🟢 `reviser-nda` |
| NDA partenariat R&D | Savoir-faire, résultats, inventions, divulgations techniques | 🟠 `PI:contrats-pi` |
| NDA transfert de technologie | Secret technique, licence implicite, exploitations futures | 🟠 `PI:contrats-pi` |

---

## Procédures collectives

| Type | Caractéristiques principales | Skill recommandé |
|---|---|---|
| Déclaration de créance | Délai de deux mois, pièces justificatives, montant, nature de la créance | 🟣 `declaration-creance` |
| Déclaration rectificative / complémentaire | Ajustement de montant ou de qualification | 🟣 `declaration-creance` si dans le même dossier, sinon ⚪ `v1.2+` |
| Contestation de créance | Réponse au mandataire / juge-commissaire, stratégie contentieuse | ⚪ `v1.2+` |
| Relevé de forclusion | Demande de réintégration hors délai | ⚪ `v1.2+` |
| Suivi plan de continuation / cession | Portefeuille débiteurs, échéances, incidents | ⚪ `v2` |

---

## Contrats PI — renvoi obligatoire vers le plugin PI

| Type | Raison du renvoi | Skill recommandé |
|---|---|---|
| Licence de brevet | Régime CPI, opposabilité, exclusivité, grant-back | 🟠 `PI:contrats-pi` |
| Licence de marque | Distinctivité, contrôle qualité, risque de déchéance | 🟠 `PI:contrats-pi` |
| Accord de coexistence marques | Risque de confusion, frontières de signe, coexistence UE / FR | 🟠 `PI:contrats-pi` |
| Cession de brevet / marque / D&M | Formalités et opposabilité spécifiques | 🟠 `PI:contrats-pi` |
| Contrat R&D collaborative | Background / foreground IP, publication, inventions | 🟠 `PI:contrats-pi` |
| Transfert de technologie | Brevet + savoir-faire + concurrence UE | 🟠 `PI:contrats-pi` |
| Franchise à dominante marque / savoir-faire | Le centre du risque est PI plutôt que commercial pur | 🟠 `PI:contrats-pi` |
| Licence logiciel / données / OSS | Enjeu PI ou logiciel central | 🟠 `PI:contrats-pi` ou skill PI dédié |

---

## Heuristiques de tri rapide

1. Si le document parle surtout de prix, délais, responsabilité, résiliation, volumes, SLA ou gouvernance contractuelle : partir sur `reviser-contrat`.
2. Si le coeur du document est la garantie d'actif et de passif ou une annexe d'acquisition liée : basculer sur `gap-review`.
3. Si le sujet est une créance dans une sauvegarde, un redressement ou une liquidation : utiliser `declaration-creance`.
4. Si les termes dominants sont brevet, marque, licence, coexistence, invention, savoir-faire, R&D, transfert de technologie : renvoyer vers `PI:contrats-pi`.
5. Si le document mélange commercial et PI, commencer par qualifier le centre de gravité ; ne pas dupliquer l'analyse PI dans `droit-affaires`.

---

## Frontières v1 à respecter

- Les pactes d'associés, term sheets, closing checklists et contentieux de créance restent hors v1 sauf usage accessoire.
- Les sujets cotés / AMF ne doivent pas être développés au-delà d'un simple signalement.
- La taxonomie sert au routage, pas à élargir le scope produit au-delà du plan.
