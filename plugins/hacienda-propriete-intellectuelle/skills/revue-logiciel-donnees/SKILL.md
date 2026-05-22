---
name: revue-logiciel-donnees
version: "2.0.0"
description: Revue de chaîne de droits logiciel et données pour produit, repo, dataset ou due diligence.
argument-hint: "[produit | repo | dataset | due diligence | contrats contributeurs]"
---

# Revue Logiciel Données

## Rôle

Ce skill sert à vérifier qui détient quoi sur un actif logiciel ou data, sous
quel régime, avec quelles pièces, et où la chaîne de droits est incomplète.

Il couvre en priorité :

- titularité sur le code source, code objet et éléments préparatoires ;
- contributions de salariés, freelances, fondateurs et autres tiers ;
- datasets, bases de données et droits sur leur structure ou leur contenu ;
- licences entrantes propriétaires, open source ou data ;
- trous de chaîne de droits à combler avant lancement, audit, cession ou levée.

Les licences n'y sont examinées qu'au titre de la chaîne de droits et de
l'exploitabilité de l'actif : qui peut utiliser, intégrer, entraîner, céder,
sous-licencier ou redistribuer l'actif considéré.

## Ne fait pas

Ce skill ne fait pas :

- l'audit open source composant par composant ;
- l'analyse exhaustive d'une SBOM ou d'un manifest ;
- la qualification œuvre par œuvre de l'originalité ;
- le conseil juridique final sans validation humaine.

Toute question d'inventaire, d'obligations ou de conflits par composant,
dépendance, paquet, image ou SBOM relève de `revue-open-source`.

## Cadrage initial

Demander et séparer dès le départ :

### Faits

- description du produit, repo, dataset ou périmètre de due diligence ;
- liste des contributeurs : salarié, freelance, fondateur, agence, prestataire,
  partenaire, communauté ;
- chronologie de création, apports, reprises de code ou enrichissements data ;
- mode d'exploitation : SaaS, on-premise, API, entraînement IA, vente de données,
  licence ou cession ;
- réutilisations de jeux de données, bases, briques logicielles ou contenus
  tiers strictement utiles à la preuve d'origine, de droits ou de transfert.

### Pièces

- contrats de travail, fiches de poste, avenants IP, NDA, BSPCE ou pacte
  d'associés, contrats de prestation, cessions, apports en nature, factures ;
- historique Git, tickets, commits, bons de commande, livrables, emails,
  attestations, tableaux de cap table ou d'incorporation ;
- CGU, EULA, data terms, licences de dataset, policy interne, preuves
  d'origine des données, documentation d'import ou de scraping ;
- tout document manquant est noté `[à vérifier]`.

### Hypothèses et incertitudes

- qualifier explicitement toute hypothèse de titularité non prouvée ;
- distinguer ce qui est affirmé par le client de ce qui est documenté ;
- marquer `[à vérifier]` tout point non soutenu par une pièce lisible.

## Mode d'analyse

1. Cartographier les actifs : code, docs techniques, schémas, datasets, bases,
   et éléments strictement utiles à la preuve d'origine ou de transfert.
2. Identifier pour chaque actif le créateur initial, le régime applicable et le
   titulaire apparent.
3. Tester la chaîne de droits selon le profil du contributeur :
   - salarié ;
   - freelance ou agence ;
   - fondateur avant ou après constitution ;
   - tiers fournisseur de données ou de composants.
4. Vérifier les licences entrantes qui limitent l'usage, la redistribution, le
   fine-tuning, la sous-licence, le partage source ou la réutilisation des
   données, uniquement pour mesurer la chaîne de droits et l'exploitabilité de
   l'actif.
5. Distinguer les droits possibles sur la base :
   - droit d'auteur sur la structure originale ;
   - droit sui generis du producteur en cas d'investissement substantiel ;
   - absence de preuve suffisante si la qualification n'est pas documentée.
6. Sortir une carte de chaîne de droits, les trous, et les pièces à exiger.

## Axes de contrôle

### Titularité code

- logiciel salarié dans l'exercice des fonctions ou d'après instructions ;
- code créé hors mission ou avant embauche ;
- forks, reprises de snippets, apports communautaires, extensions tiers ;
- preuves d'assignation ou cession quand la titularité n'est pas automatique.

### Contributions salariés, freelances, founders

- salarié : fonction, instructions, moment de création, moyens utilisés ;
- freelance ou agence : cession expresse, périmètre, exclusivité, garanties ;
- fondateur : apport personnel pré-incorporation, cession à la société,
  documentation board ou cap table ;
- co-développement ou partenariat : répartition des droits, restrictions
  d'usage, droit de sortie, droit de réexploitation.

### Datasets et bases de données

- origine des données : interne, client, licence tierce, open data, scraping,
  crowdsourcing, achat ou partenariat ;
- droits sur la structure, les annotations, le nettoyage et l'enrichissement ;
- restrictions contractuelles, réutilisation interdite, obligations
  d'attribution, interdictions IA ou de revente ;
- distinction base auteur / base sui generis / simple agrégat `[à vérifier]`.

### Licences entrantes

- licence logicielle ou data applicable ;
- portée territoriale, durée, sous-licence, redistribution, partage source ;
- compatibilité avec le modèle produit au niveau de l'actif examiné ;
- ne pas dériver vers un inventaire composant par composant ;
- point de bascule vers `revue-open-source` dès qu'il faut inventorier des
  dépendances, mesurer des obligations OSS par composant ou analyser une SBOM.

## Sortie

Produire un livrable en sections distinctes :

### Faits

- faits reçus et périmètre de revue.

### Revue des pièces

- pièces lues ;
- pièces absentes ;
- pièces annoncées mais non consultées `[à vérifier]`.

### Carte de chaîne de titres

- actif ;
- créateur initial ;
- régime apparent ;
- titulaire apparent ;
- pièce de support ;
- trou de chaîne ou réserve.

### Lacunes de droits

- manques critiques de cession, apport, autorisation ou preuve ;
- restrictions dataset ou base de données ;
- hypothèses à confirmer.

### Demandes de due diligence

- liste des documents à exiger immédiatement ;
- priorités rouge / orange / vert ;
- décisions bloquées tant que la validation humaine n'est pas faite.

## Validation humaine

Toujours conclure par :

- ce qui relève du fait établi ;
- ce qui relève d'une hypothèse ;
- ce qui doit être vérifié sur source primaire ou pièce contractuelle ;
- la décision qui requiert validation humaine.

Ne jamais présenter le résultat comme un avis juridique définitif. Toute pièce
non lue, toute qualification non documentée et toute titularité seulement
alléguée restent marquées `[à vérifier]`.

## Références

- `references/chaine-droits-logiciel-data.md`
