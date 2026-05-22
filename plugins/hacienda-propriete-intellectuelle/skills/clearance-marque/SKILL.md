---
name: clearance-marque
version: "2.0.0"
description: Alias de compatibilité historique vers recherche-anteriorite-marque. Ne fournit pas de revue autonome ni d'opinion de disponibilité.
argument-hint: "[signe | classes Nice | territoires FR/EU/intl]"
---

# Clearance Marque

> **Maintenu pour compatibilité historique uniquement.**
>
> Utiliser `recherche-anteriorite-marque` pour tout nouveau dossier.
> `clearance-marque` est conserve comme point d'entrée heritage afin de
> rediriger explicitement les anciens usages. Il ne doit pas être présenté
> comme un flux de travail autonome équivalent.

## Rôle

Ce skill ne fait plus de revue autonome. Il sert uniquement à :

- reconnaitre un ancien appel `clearance-marque` ;
- rappeler les limites du terme "vérification" ;
- rerouter vers `recherche-anteriorite-marque` avec le même paquet d'entrée.

## Ce skill ne fait pas

- Ne conclut jamais qu'une marque est disponible.
- Ne produit pas d'opinion de disponibilité.
- Ne remplace pas `recherche-anteriorite-marque`.
- Ne laissé pas entendre qu'une compatibilité historique offre le même niveau d'analyse qu'une recherche complète ou un avis de mandataire / avocat.

## Redirection obligatoire

Quand `clearance-marque` est invoqué, la sortie doit :

1. indiquer explicitement que le skill est obsolete ;
2. conserver les entrées recues ;
3. rediriger vers `recherche-anteriorite-marque` ;
4. rappeler que même `recherche-anteriorite-marque` reste un premier passage et non une opinion de disponibilité.

## Entrées transmises

Transmettre telles quelles, sans réinterprétation silencieuse :

- signe
- type de signe si connu
- produits ou services
- classes Nice si connues
- territoires
- usage constate sur le marché ou éléments de presentation du signe si fournis

Tout élément manquant doit être liste, pas invente.

## Sortie

La sortie doit rester courte et produire exactement ces quatre blocs :

1. `Avis de compatibilite`
2. `Entrees transmises`
3. `Limites`
4. `Prochaine étape`

Contraintes :

- `Avis de compatibilite` : dire que `clearance-marque` est obsolete et
  maintenu pour compatibilité historique uniquement.
- `Entrees transmises` : recopier les informations d'entrée utiles vers
  `recherche-anteriorite-marque`.
- `Limites` : rappeler explicitement qu'il ne s'agit ni d'une revue autonome,
  ni d'une opinion de disponibilité, ni d'une conclusion "marque libre".
- `Prochaine étape` : pointer vers `recherche-anteriorite-marque` et, si
  nécessaire, vers validation humaine par avocat ou mandataire.

## Gardes-fous Hacienda

- Ne jamais présenter une sortie comme conseil juridique final.
- Toute source non consultée reste `[à vérifier]`.
- Toute citation doit indiquer sa provenance réelle.
- Les livrables doivent distinguer faits, analyse, incertitudes et validation humaine.

## Formulation de redirection recommandée

Utiliser une formulation de ce type :

> `clearance-marque` est un alias heritage. Je transfère ce dossier vers
> `recherche-anteriorite-marque`, qui reste elle-même un premier passage
> de recherche et non une opinion de disponibilité. Aucune conclusion
> autonome sur la disponibilité du signe ne doit être tiree de cet alias.
