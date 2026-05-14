# Hacienda Juridique

Hacienda est une place de marché de plugins juridiques français pour professionnels du droit et du chiffre.

Ce dépôt est la base propre du produit Hacienda. Il contient les spécifications et les plans d'implémentation qui serviront à construire la place de marché juridique.

## Positionnement

Hacienda organise trois couches :

- `hacienda-sources-officielles` : sources primaires françaises, notamment Légifrance, BOFiP, JORF, KALI et jurisprudence officielle.
- `hacienda-recherche-documentaire` : recherche supervisée dans les bases documentaires utilisées par les avocats, avec vérification des sources primaires.
- plugins métiers : fiscal, social, contrats, sociétés, contentieux, données personnelles, réglementaire, gouvernance IA, propriété intellectuelle, droit public et permanences juridiques.

## Règle De Preuve

Toute citation juridique doit être vérifiée par une source officielle. Si la source officielle n'a pas été consultée, la citation doit rester marquée `[à vérifier]`.

## Documents

- `docs/superpowers/specs/` : spécifications produit.
- `docs/superpowers/plans/` : plans d'implémentation exécutables par étapes.

## Priorité De Construction

1. `hacienda-sources-officielles`
2. `hacienda-fiscal`
3. `hacienda-recherche-documentaire`
4. `hacienda-social`
5. `hacienda-contentieux`
6. `hacienda-contrats`
