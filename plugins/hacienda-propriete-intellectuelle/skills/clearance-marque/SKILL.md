---
name: clearance-marque
description: Alias de compatibilite historique vers recherche-anteriorite-marque. Ne fournit pas de revue autonome ni d'opinion de disponibilite.
argument-hint: "[signe | classes Nice | territoires FR/EU/intl]"
---

# Clearance Marque

> **Maintenu pour compatibilite historique uniquement.**
>
> Utiliser `recherche-anteriorite-marque` pour tout nouveau dossier.
> `clearance-marque` est conserve comme point d'entree heritage afin de
> rediriger explicitement les anciens usages. Il ne doit pas etre presente
> comme un workflow autonome equivalent.

## Role

Ce skill ne fait plus de revue autonome. Il sert uniquement a :

- reconnaitre un ancien appel `clearance-marque` ;
- rappeler les limites du terme "clearance" ;
- rerouter vers `recherche-anteriorite-marque` avec le meme paquet d'entree.

## Ce skill ne fait pas

- Ne conclut jamais qu'une marque est disponible.
- Ne produit pas d'opinion de disponibilite.
- Ne remplace pas `recherche-anteriorite-marque`.
- Ne laisse pas entendre qu'une compatibilite historique offre le meme niveau d'analyse qu'une recherche complete ou un avis de mandataire / avocat.

## Redirection obligatoire

Quand `clearance-marque` est invoque, la sortie doit :

1. indiquer explicitement que le skill est obsolete ;
2. conserver les entrees recues ;
3. rediriger vers `recherche-anteriorite-marque` ;
4. rappeler que meme `recherche-anteriorite-marque` reste un premier passage et non une opinion de disponibilite.

## Entrees transmises

Transmettre telles quelles, sans reinterpretation silencieuse :

- signe
- type de signe si connu
- produits ou services
- classes Nice si connues
- territoires
- usage constate sur le marche ou elements de presentation du signe si fournis

Tout element manquant doit etre liste, pas invente.

## Sortie

La sortie doit rester courte et produire exactement ces quatre blocs :

1. `Avis de compatibilite`
2. `Entrees transmises`
3. `Limites`
4. `Prochaine etape`

Contraintes :

- `Avis de compatibilite` : dire que `clearance-marque` est obsolete et
  maintenu pour compatibilite historique uniquement.
- `Entrees transmises` : recopier les informations d'entree utiles vers
  `recherche-anteriorite-marque`.
- `Limites` : rappeler explicitement qu'il ne s'agit ni d'une revue autonome,
  ni d'une opinion de disponibilite, ni d'une conclusion "marque libre".
- `Prochaine etape` : pointer vers `recherche-anteriorite-marque` et, si
  necessaire, vers validation humaine par avocat ou mandataire.

## Gardes-fous Hacienda

- Ne jamais presenter une sortie comme conseil juridique final.
- Toute source non consultee reste `[a verifier]`.
- Toute citation doit indiquer sa provenance reelle.
- Les livrables doivent distinguer faits, analyse, incertitudes et validation humaine.

## Formulation de redirection recommandee

Utiliser une formulation de ce type :

> `clearance-marque` est un alias heritage. Je transfere ce dossier vers
> `recherche-anteriorite-marque`, qui reste elle-meme un premier passage
> de recherche et non une opinion de disponibilite. Aucune conclusion
> autonome sur la disponibilite du signe ne doit etre tiree de cet alias.
