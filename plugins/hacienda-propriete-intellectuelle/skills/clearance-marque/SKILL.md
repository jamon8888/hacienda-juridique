---
name: clearance-marque
version: "2.0.0"
description: Alias de compatibilité historique vers recherche-anteriorite-marque. Ne fournit pas de revue autonome ni d'opinion de disponibilité.
argument-hint: "[signe | classes Nice | territoires FR/EU/intl]"
authors: ["Hacienda"]
tags: [marques, clearance, compatibilite-historique, redirect]
---

# Clearance Marque

> **Maintenu pour compatibilité historique uniquement.**
>
> Utiliser `recherche-anteriorite-marque` pour tout nouveau dossier.
> `clearance-marque` est conserve comme point d'entrée heritage afin de
> rediriger explicitement les anciens usages. Il ne doit pas être présenté
> comme un flux de travail autonome équivalent.

## Examples

<example>
<user>/h-pi:clearance-marque [signe | classes Nice | territoires FR/EU/intl]</user>
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

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Propriété Intellectuelle` est disponible. Ne pas inventer de tool hors périmètre ; si une source ou un registre n'a pas été consulté directement, garder `[à vérifier]`.

- Socle textes, jurisprudence et droit UE : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Marques, BOPI et EUIPO : `inpi_search_marques`, `inpi_marque_details`, `inpi_marques_publications_recentes`, `euipo_tmview_search`, `bopi_dernieres_publications`.
- Anno, quand disponible, reste une source interne de dossier : jamais un registre officiel INPI, EUIPO, OEB, OMPI ou BOPI.

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/` ou `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`.

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

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
