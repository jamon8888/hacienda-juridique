---
name: revue-logiciel-donnees
version: "2.0.0"
description: Revue de chaine de droits logiciel et donnees pour produit, repo, dataset ou due diligence.
argument-hint: "[produit | repo | dataset | due diligence | contrats contributeurs]"
---

# Revue Logiciel Donnees

## Role

Ce skill sert a verifier qui detient quoi sur un actif logiciel ou data, sous
quel regime, avec quelles pieces, et ou la chaine de droits est incomplete.

Il couvre en priorite :

- titularite sur le code source, code objet et elements preparatoires ;
- contributions de salaries, freelances, fondateurs et autres tiers ;
- datasets, bases de donnees et droits sur leur structure ou leur contenu ;
- licences entrantes proprietaires, open source ou data ;
- trous de chaine de droits a combler avant lancement, audit, cession ou levee.

Les licences n'y sont examinees qu'au titre de la chaine de droits et de
l'exploitabilite de l'actif : qui peut utiliser, integrer, entrainer, ceder,
sous-licencier ou redistribuer l'actif considere.

## Ne fait pas

Ce skill ne fait pas :

- l'audit open source composant par composant ;
- l'analyse exhaustive d'une SBOM ou d'un manifest ;
- la qualification oeuvre par oeuvre de l'originalite ;
- le conseil juridique final sans validation humaine.

Toute question d'inventaire, d'obligations ou de conflits par composant,
dependance, paquet, image ou SBOM releve de `revue-open-source`.

## Intake

Demander et separer des le depart :

### Faits

- description du produit, repo, dataset ou perimetre de due diligence ;
- liste des contributeurs : salarie, freelance, fondateur, agence, prestataire,
  partenaire, communaute ;
- chronologie de creation, apports, reprises de code ou enrichissements data ;
- mode d'exploitation : SaaS, on-premise, API, entrainement IA, vente de donnees,
  licence ou cession ;
- reutilisations de jeux de donnees, bases, briques logicielles ou contenus
  tiers strictement utiles a la preuve d'origine, de droits ou de transfert.

### Pieces

- contrats de travail, fiches de poste, avenants IP, NDA, BSPCE ou pacte
  d'associes, contrats de prestation, cessions, apports en nature, factures ;
- historique Git, tickets, commits, bons de commande, livrables, emails,
  attestations, tableaux de cap table ou d'incorporation ;
- CGU, EULA, data terms, licences de dataset, policy interne, preuves
  d'origine des donnees, documentation d'import ou de scraping ;
- tout document manquant est note `[a verifier]`.

### Hypotheses et incertitudes

- qualifier explicitement toute hypothese de titularite non prouvee ;
- distinguer ce qui est affirme par le client de ce qui est documente ;
- marquer `[a verifier]` tout point non soutenu par une piece lisible.

## Mode d'analyse

1. Cartographier les actifs : code, docs techniques, schemas, datasets, bases,
   et elements strictement utiles a la preuve d'origine ou de transfert.
2. Identifier pour chaque actif le createur initial, le regime applicable et le
   titulaire apparent.
3. Tester la chaine de droits selon le profil du contributeur :
   - salarie ;
   - freelance ou agence ;
   - fondateur avant ou apres constitution ;
   - tiers fournisseur de donnees ou de composants.
4. Verifier les licences entrantes qui limitent l'usage, la redistribution, le
   fine-tuning, la sous-licence, le partage source ou la reutilisation des
   donnees, uniquement pour mesurer la chaine de droits et l'exploitabilite de
   l'actif.
5. Distinguer les droits possibles sur la base :
   - droit d'auteur sur la structure originale ;
   - droit sui generis du producteur en cas d'investissement substantiel ;
   - absence de preuve suffisante si la qualification n'est pas documentee.
6. Sortir une carte de chaine de droits, les trous, et les pieces a exiger.

## Axes de controle

### Titularite code

- logiciel salarie dans l'exercice des fonctions ou d'apres instructions ;
- code cree hors mission ou avant embauche ;
- forks, reprises de snippets, apports communautaires, plugins tiers ;
- preuves d'assignation ou cession quand la titularite n'est pas automatique.

### Contributions salaries, freelances, founders

- salarie : fonction, instructions, moment de creation, moyens utilises ;
- freelance ou agence : cession expresse, perimetre, exclusivite, garanties ;
- fondateur : apport personnel pre-incorporation, cession a la societe,
  documentation board ou cap table ;
- co-developpement ou partenariat : repartition des droits, restrictions
  d'usage, droit de sortie, droit de reexploitation.

### Datasets et bases de donnees

- origine des donnees : interne, client, licence tierce, open data, scraping,
  crowdsourcing, achat ou partenariat ;
- droits sur la structure, les annotations, le nettoyage et l'enrichissement ;
- restrictions contractuelles, reutilisation interdite, obligations
  d'attribution, interdictions IA ou de revente ;
- distinction base auteur / base sui generis / simple agregat `[a verifier]`.

### Licences entrantes

- licence logicielle ou data applicable ;
- portee territoriale, duree, sous-licence, redistribution, partage source ;
- compatibilite avec le modele produit au niveau de l'actif examine ;
- ne pas deriver vers un inventaire composant par composant ;
- point de bascule vers `revue-open-source` des qu'il faut inventorier des
  dependances, mesurer des obligations OSS par composant ou analyser une SBOM.

## Sortie

Produire un livrable en sections distinctes :

### Facts

- faits recus et perimetre de revue.

### Pieces Review

- pieces lues ;
- pieces absentes ;
- pieces annoncees mais non consultees `[a verifier]`.

### Chain of Title Map

- actif ;
- createur initial ;
- regime apparent ;
- titulaire apparent ;
- piece de support ;
- trou de chaine ou reserve.

### Rights Gaps

- manques critiques de cession, apport, autorisation ou preuve ;
- restrictions dataset ou base de donnees ;
- hypotheses a confirmer.

### Due Diligence Requests

- liste des documents a exiger immediatement ;
- priorites rouge / orange / vert ;
- decisions bloquees tant que la validation humaine n'est pas faite.

## Validation humaine

Toujours conclure par :

- ce qui releve du fait etabli ;
- ce qui releve d'une hypothese ;
- ce qui doit etre verifie sur source primaire ou piece contractuelle ;
- la decision qui requiert validation humaine.

Ne jamais presenter le resultat comme un avis juridique definitif. Toute piece
non lue, toute qualification non documentee et toute titularite seulement
alleguee restent marquees `[a verifier]`.

## References

- `references/chaine-droits-logiciel-data.md`
