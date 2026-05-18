# Chaine de droits logiciel et data

Ce memo sert de reference pratique pour une revue de titularite et de chaine de
droits. Il ne remplace pas la lecture des pieces ni la validation humaine.

Les licences n'y sont lues qu'au titre de la chaine de droits et de
l'exploitabilite d'un actif logiciel ou data donne. L'inventaire des
composants, les obligations OSS et les conflits licence par composant relevent
de `revue-open-source`.

## 1. Salarie vs prestataire

### Salarie

- verifier si la creation logicielle a ete realisee dans l'exercice des
  fonctions ou d'apres les instructions de l'employeur ;
- verifier les fonctions reelles, la fiche de poste, les consignes et la
  chronologie ;
- ne pas supposer que tout ce qu'un salarie a touche appartient a la societe ;
- pour les autres actifs que le logiciel au sens strict, ne pas extrapoler sans
  piece ni analyse complementaire `[a verifier]`.

### Prestataire, freelance, agence

- exiger un contrat ecrit identifiant clairement les livrables ;
- verifier l'existence d'une cession ou licence suffisamment precise ;
- verifier les garanties d'eviction, sous-traitance, reutilisation d'assets
  tiers et droits sur les outils ou briques preexistantes ;
- traiter comme trou de chaine toute livraison payee sans cession lisible.

## 2. Apport fondateur

- identifier les actifs crees avant constitution ou hors societe ;
- verifier s'il existe un apport, une cession, une licence ou une mise a
  disposition documentee au benefice de la societe ;
- verifier la coherence entre pacte, cap table, PV, documentation investisseur
  et contrats de travail ulterieurs ;
- relever tout ecart entre la narration produit et la preuve de transfert.

## 3. Datasets tiers

- identifier la source de chaque dataset : open data, client, achat, scraping,
  partenariat, fournisseur API, communaute ;
- lire les termes applicables a l'acces, a la copie, a l'entrainement, a la
  redistribution, a la revente et a la creation de datasets derives ;
- verifier la tracabilite des imports, nettoyages, annotations et melanges ;
- noter `[a verifier]` toute origine de donnees seulement decrite oralement ;
- demander la preuve de consentement ou d'autorisation quand la source n'est
  pas autoportante.

## 4. Base auteur vs base sui generis

### Base auteur

- regarder si la structure ou la selection des elements revele un effort
  original ;
- documenter les choix d'organisation, taxonomie, categorisation, schema,
  filtres ou presentation ;
- ne pas confondre valeur economique de la base et originalite de sa structure.

### Base sui generis

- regarder si un investissement substantiel a ete consacre a la constitution,
  verification ou presentation du contenu ;
- demander des indices concrets : budget, temps, equipe, process de collecte,
  nettoyage, maintenance, infrastructure ;
- ne pas affirmer la protection sui generis sans elements serieux `[a verifier]`.

## 5. Elements a exiger en due diligence

Exiger au minimum, selon le dossier :

- liste des contributeurs code et data avec statut et periode ;
- contrats de travail, fiches de poste, avenants IP ;
- contrats de prestation, cessions, licences, bons de commande et factures ;
- documents d'apport fondateur, PV, pactes et cap table utile ;
- historique Git, journaux d'import, tickets, dossiers de livraison ;
- licences et termes des datasets, API, briques ou contenus tiers utiles a la
  preuve d'origine, d'autorisation ou de transfert ;
- politiques internes sur reutilisation open source et donnees ;
- tableau des actifs critiques avec piece justificative par actif.

## 6. Garde-fous de restitution

Le livrable final doit distinguer :

- faits constates ;
- pieces lues ;
- hypotheses ;
- incertitudes ;
- trous de chaine ;
- decisions soumises a validation humaine.

Toute source non consultee ou piece annoncee mais non lue reste marquee
`[a verifier]`.
