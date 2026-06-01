---
name: revue-logiciel-donnees
version: "2.0.0"
description: Revue de chaîne de droits logiciel et données pour produit, repo, dataset ou due diligence.
argument-hint: "[produit | repo | dataset | due diligence | contrats contributeurs]"
authors: ["Hacienda"]
tags: [logiciel, donnees, L113-9, titularite, chaine-cession]
---

# Revue Logiciel Données

## Examples

<example>
<user>/h-pi:revue-logiciel-donnees [produit | repo | dataset | due diligence | contrats contributeurs]</user>
<response>
Brouillon de travail structuré, avec faits, droit, analyse, incertitudes, sources consultées, points `[à vérifier]` et validation humaine obligatoire.
</response>
</example>

## Chargement du profil

Avant tout travail substantiel, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Si le profil est absent, incomplet ou contient `[A CONFIGURER]`, demander `/h-pi:entretien-demarrage` et garder les marqueurs `[à vérifier]` visibles.

## Intake

Identifier au minimum : demande, actif ou droit concerné, parties, territoire, dates utiles, documents disponibles, source officielle à consulter, urgence, sortie attendue et niveau de validation humaine requis.

## Gate non-juriste

Si l'utilisateur n'est pas juriste ou avocat, produire une explication opérationnelle, signaler les limites, refuser toute conclusion présentée comme avis juridique final et demander validation par un professionnel habilité avant usage externe.

## Mode Anno Desktop Optionnel

Si Anno Desktop est disponible, l'utiliser pour relier localement contrats,
commits, tickets, datasets, factures et historiques de contribution déjà
fournis. Avant tout outil Anno, appeler `anno_health`; en cas d'échec,
poursuivre en mode Hacienda.

Règles spécifiques :

- appeler `detect` ou appliquer une gestion PII Anno équivalente avant toute
  pièce client ;
- utiliser `legal_extract_contract` pour extraire les clauses de cession,
  licence, contribution, confidentialité ou data des contrats fournis ;
- utiliser `legal_risk_review` pour prioriser les trous de chaîne de droits ;
- utiliser `legal_search` et `legal_graph_query` uniquement sur un corpus déjà
  ingéré et autorisé ;
- traiter chaque passage Anno comme source interne Anno, jamais comme source
  primaire.

Les registres, textes et pièces officielles restent vérifiés via
`hacienda-sources-officielles` ou les outils PI Hacienda. Toute titularité ou
pièce non lue reste `[à vérifier]`.

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Propriété Intellectuelle` est disponible. Ne pas inventer de tool hors périmètre ; si une source ou un registre n'a pas été consulté directement, garder `[à vérifier]`.

- Socle textes, jurisprudence et droit UE : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Anno, quand disponible, reste une source interne de dossier : jamais un registre officiel INPI, EUIPO, OEB, OMPI ou BOPI.

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/` ou `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`.

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

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

## Niveaux de criticité

Échelle canonique appliquée à toute appréciation subjective de ce skill :

| Niveau | Icône | Signification dans le contexte de ce skill |
|---|---|---|
| Faible | 🟢 | Chaîne de titularité propre : cessions documentées, contrats freelance conformes, mention L.113-9 explicite pour le code salarié, datasets avec licences entrantes lisibles. |
| Moyen | 🟡 | Clauses ambiguës sur dérivés, fine-tuning, sous-licence ou exploitation des modèles entraînés ; périmètre de cession freelance imprécis sur module non critique ; preuves de transfert partielles. |
| Élevé | 🟠 | Cession L.113-9 invoquée implicitement sans mention dans le contrat de travail ; freelance ou agence sur module exploité sans cession écrite explicite ; dataset tiers avec restrictions IA non vérifiées. |
| Bloquant | 🔴 | Chaîne de titularité rompue sur module critique exploité : freelance non cédé, contributeur externe non couvert, fondateur pré-incorporation sans apport documenté, dataset à statut sui generis revendiqué sans investissement prouvé et exploité en aval. |

Plancher cross-skill (CLAUDE.md §4) : ce skill ne peut pas dégrader silencieusement une cote 🔴 amont sans déclaration explicite.

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

## Mode Anno Tabular optionnel

Si la distribution Hacienda + Anno Desktop est active, `revue-logiciel-donnees`
utilise Anno pour relier localement contrats, contributeurs, logiciels,
datasets et preuves, jamais comme source primaire. Appeler `anno_health` avant
tout outil Anno ; si Anno est indisponible, poursuivre en `fallback_hacienda`.

Le périmètre doit être inscrit dans le `matter_vault` et le
`workflow_blueprint` `software-data-chain-v1`. Utiliser `legal_search`,
`legal_graph_query` et une revue tabulaire avec `tabular_review_create` pour
suivre actifs, contributeurs, contrats sources, cessions/licences, trous de
chaîne de droits, dépendances et preuves. Les gaps doivent porter
`review_status`, `decision_status`, responsable, action et `validation_status`.

Utiliser `grid_to_work_product` pour produire une note de chaîne de droits ou
une annexe de remédiation depuis les cellules validées. Tout résultat Anno reste
une source interne Anno, jamais comme source primaire ; les sources officielles
et registres restent vérifiés via `hacienda-sources-officielles`. Les points
non documentés restent `[à vérifier]`.
