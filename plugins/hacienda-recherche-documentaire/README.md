# Hacienda Recherche Documentaire

## Positionnement

`hacienda-recherche-documentaire` est le plugin transversal de recherche
documentaire juridique. Il aide un avocat, juriste ou legal ops à préparer une
recherche, interroger des bases éditoriales autorisées, comparer les résultats,
extraire les références utiles et renvoyer les sources primaires vers
`hacienda-sources-officielles`.

Le plugin ne remplace pas les bases documentaires, ne contourne pas leurs
conditions d'accès et ne copie pas massivement de contenu protégé. Il sert à
organiser la méthode de recherche, conserver la traçabilité et produire un
dossier documentaire vérifiable.

## Ce Que Le Plugin Fait

- prépare des requêtes adaptées à plusieurs bases ;
- guide une recherche supervisée dans les plateformes auxquelles le cabinet a
  accès ;
- compare les résultats, doublons, divergences et lacunes ;
- extrait les métadonnées et références utiles sans reproduction longue ;
- contrôle les contraintes de droit d'auteur et de licence éditeur ;
- construit un dossier documentaire avec provenance, date de consultation et
  points `[à vérifier]` ;
- renvoie les textes, décisions et sources primaires vers le socle
  `hacienda-sources-officielles`.

## Plateformes Ciblées

- Doctrine ;
- Lefebvre Dalloz / GenIA-L ;
- Lexis 360 / Lexis+ AI ;
- Lextenso ;
- Lexbase ;
- Dalloz ;
- Navis ;
- Elnet ;
- Lamyline.

Ces plateformes sont des environnements de travail ou de recherche, pas des
sources primaires suffisantes pour une conclusion juridique finale.

## Modes D'usage

1. **Mode manuel sécurisé** : l'utilisateur consulte lui-même la base et donne
   uniquement les références ou extraits autorisés.
2. **Mode navigation supervisée** : le plugin guide la recherche sans extraction
   massive ni contournement.
3. **Mode connecteur officiel** : utilisé seulement si un connecteur autorisé et
   conforme est disponible.
4. **Mode Anno Desktop optionnel** : utilisé seulement dans la distribution
   Hacienda + Anno Desktop pour rechercher dans un corpus client local déjà
   ingéré, après `anno_health`, gestion PII et validation explicite.

## Skills

| Skill | Usage |
| --- | --- |
| `entretien-demarrage` | Configure les bases disponibles, les règles éditeur et les seuils de validation. |
| `preparation-requete` | Prépare les requêtes multi-bases avant navigation ou recherche. |
| `recherche-doctrine` | Guide une recherche supervisée dans Doctrine. |
| `recherche-lefebvre-dalloz` | Guide une recherche supervisée dans Lefebvre Dalloz ou GenIA-L. |
| `recherche-lexis` | Guide une recherche supervisée dans Lexis 360 ou Lexis+ AI. |
| `recherche-lextenso` | Guide une recherche supervisée dans Lextenso. |
| `comparaison-bases` | Compare les résultats issus de plusieurs bases documentaires. |
| `controle-copyright` | Vérifie droits éditeurs, accès autorisés et limites d'extraction. |
| `dossier-documentaire` | Produit le dossier documentaire Hacienda. |
| `extraction-references` | Extrait les métadonnées utiles sans copie longue de contenu protégé. |
| `verification-sources-primaires` | Transfère les sources citées vers Hacienda Sources Officielles. |

## Agents

| Agent | Rôle |
| --- | --- |
| `consolidateur-recherche` | Consolide résultats, doublons, références, lacunes et pistes de recherche. |
| `controleur-sources` | Contrôle provenance, statut de vérification et points `[à vérifier]`. |
| `veilleur-documentaire` | Surveille un périmètre documentaire validé et prépare des alertes relisibles. |

## Livrables

- plan de recherche ;
- journal de recherche ;
- tableau comparatif des bases consultées ;
- liste de références ;
- dossier documentaire ;
- note de synthèse ;
- points `[à vérifier]` ;
- demandes de validation humaine.

## Règle De Preuve

Toute source primaire citée doit être vérifiée via
`hacienda-sources-officielles`. Une référence issue d'une base éditoriale peut
orienter l'analyse, mais ne suffit pas seule pour une conclusion normative.

Les résultats Anno sont des sources internes de dossier client. Ils peuvent
orienter la recherche documentaire, mais ne remplacent ni les bases éditoriales
autorisées ni les sources primaires vérifiées.

## Limites

Le plugin ne fournit pas de conseil juridique final, ne contourne pas les accès
éditeur, ne collecte pas de contenu en masse et ne remplace pas la relecture
humaine.
