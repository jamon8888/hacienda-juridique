---
name: droits-voisins-ogc
description: >
  Skill V2 strict de qualification droits voisins et OGC : artistes-interprètes,
  producteurs de phonogrammes, producteurs de videogrammes, entreprises de
  communication audiovisuelle, editeurs de presse quand reellement pertinents,
  gestion collective et rémunération equitable. `gen-ai-signal` et `nft-signal`
  restent secondaires et bornés. Brouillon soumis à validation humaine.
version: "2.0.0"
authors: ["Hacienda"]
argument-hint: "[performer-rights|phonogram-producer|videogram-producer|broadcast-organization|press-publisher|mixed]"
tags: [droits-voisins, ogc, remuneration-equitable, artistes-interpretes, producteurs, gestion-collective]
---

# Skill - Droits voisins et OGC V2

> **ANALYSE PREPARATOIRE, PAS AVIS JURIDIQUE FINAL.**
>
> Ce skill fait une analyse de préparation en droits voisins et OGC.
> Il ne remplace pas la revue finale par un avocat ou un juriste spécialisé.
> Il ne devient ni un mémo AI Act autonome, ni une note blockchain/NFT generaliste.
> Les branches `gen-ai-signal` et `nft-signal` restent bornées et secondaires.

## Examples

<example>
<user>/h-pi:droits-voisins-ogc [performer-rights|phonogram-producer|videogram-producer|broadcast-organization|press-publisher|mixed]</user>
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
- Dessins et modèles, droit d'auteur, logiciels, bases de données et droits voisins : utiliser le socle officiel ci-dessus ; les registres spécialisés non exposés par le serveur restent `[à vérifier]` ou traités via preuve/document client autorisé.
- Anno, quand disponible, reste une source interne de dossier : jamais un registre officiel INPI, EUIPO, OEB, OMPI ou BOPI.

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/` ou `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`.

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

## Rôle

Le coeur du skill reste strictement :

- la qualification du titulaire ou de la catégorie de titulaire de droits voisins ;
- la cartographie de l'acte d'exploitation visé ;
- la posture de gestion directe, OGC ou rémunération equitable ;
- la qualité minimale de la chaîne de droits ;
- la préparation d'un brouillon relisible avec routage fermé.

Le skill reste distinct de :

- `qualification-oeuvre` si la question dominante devient l'originalité ou la qualification auteur ;
- `licence-droit-auteur` si le besoin réel devient une licence d'exploitation ;
- `cession-droit-auteur` si le besoin réel devient un transfert patrimonial ou un cleanup de chaîne de titre ;
- `contrefacon-droit-auteur` si le sujet principal devient une atteinte auteur au fond ;
- `contentieux-pi` si le sujet principal devient la stratégie judiciaire ou pre-judiciaire ;
- `contrats-pi` si la question releve d'un montage contractuel PI plus large.

## Contrat de cadrage fermé

Renseigner exactement ces champs :

- `primary_track`: `performer-rights` | `phonogram-producer` | `videogram-producer` | `broadcast-organization` | `press-publisher` | `mixed`
- `management_posture`: `direct-licensing` | `ogc-membership` | `equitable-remuneration` | `mixed`
- `rights_chain_status`: `clear` | `mixed` | `uncertain` | `blocked`
- `exploitation_mode`: `fixation` | `reproduction` | `communication-public` | `streaming` | `platform-use` | `mixed`
- `emerging_signal`: `none` | `gen-ai` | `nft` | `both`
- `territory_scope`: `fr` | `eu` | `international`

## Faits minimaux

Le skill ne doit pas sortir un brouillon exploitable sans au moins :

- titulaire ou catégorie de titulaire identifié ;
- prestation, enregistrement ou publication identifié ;
- acte d'exploitation cible identifié ;
- rôle du producteur, diffuseur, plateforme ou OGC si pertinent ;
- territoire minimal ;
- sources consultées et datées.

Ajouter selon les cas :

- contrat ou clause disponible ;
- preuve de fixation, publication ou première communication ;
- adhesion OGC, organisme et posture de répartition ;
- signal IA ou NFT documenté ;
- indices de rémunération equitable.

Tout élément manquant reste `[à vérifier]`.

## Seuil de préparation des droits voisins

Le skill conclut toujours sur une seule valeur :

- `ready`
- `partial`
- `blocked`

### Logique du seuil

- `ready` : le dossier permet un brouillon voisins/OGC exploitable avec titulaire, acte et posture de gestion suffisamment identifiés.
- `partial` : le dossier permet un brouillon structuré, mais avec trous ou fragilités.
- `blocked` : le skill s'arrête si la base factuelle ne permet pas une analyse voisins/OGC sérieuse.

Bloquer si :

- `rights_chain_status = blocked` ;
- aucun titulaire ou catégorie de titulaire ne peut être identifié ;
- aucun acte d'exploitation cible ne peut être formule ;
- le sujet réel devient principalement auteur, contrat global ou contentieux ;
- aucune source consultée et datée ne peut être documentée.

Si le seuil est `partial`, la sortie garde obligatoirement :

- `[PROVISOIRE]`
- `[à vérifier]`
- `[À COMPLÉTER]`

## Core Logic

### Noyau titulaire des droits

Structurer l'analyse autour de :

- artistes-interprètes ;
- producteurs de phonogrammes ;
- producteurs de videogrammes ;
- entreprises de communication audiovisuelle ;
- editeurs de presse quand ils sont reellement en cause.

### Exploitation and consent core

Vérifier au minimum :

- l'acte d'exploitation cible ;
- le consentement ou l'autorisation nécessaire ;
- la durée apparente de protection ;
- la posture de rémunération equitable si un phonogramme publié à des fins de commerce est en cause ;
- la place d'un OGC, d'un mandat, d'une répartition ou d'un direct licensing.

## Secondary Signals

### `gen-ai-signal`

Cette branche reste secondaire. Elle peut seulement :

- signaler un doute sur la protégeabilité d'une sortie IA ;
- signaler un risque training, opt-out ou style mimicry ;
- rerouter si le sujet dominant devient la conformité IA ou le contracting IA.

Elle ne transforme pas le skill en audit AI Act autonome.

### `nft-signal`

Cette branche reste secondaire. Elle peut seulement :

- rappeler qu'un NFT ne transfère pas les droits ;
- signaler un risque de mint sans autorisation ;
- signaler une confusion de titularité ;
- rerouter si le sujet dominant devient principalement contractuel ou contentieux.

Elle ne transforme pas le skill en mémo blockchain generaliste.

## Frontières de décision

- Si la question dominante porte sur l'originalité ou la qualification auteur de l'œuvre : route vers `qualification-oeuvre`.
- Si le besoin réel devient la structuration d'une licence : route vers `licence-droit-auteur`.
- Si le besoin réel devient un transfert patrimonial ou un cleanup de title chain : route vers `cession-droit-auteur`.
- Si le sujet principal devient une atteinte auteur au fond : route vers `contrefacon-droit-auteur`.
- Si le sujet principal devient une stratégie judiciaire ou pre-judiciaire : route vers `contentieux-pi`.
- Si la question releve d'un montage contractuel PI plus large : route vers `contrats-pi`.

## Sortie stable en 9 blocs

La sortie doit toujours utiliser exactement ces 9 blocs :

1. `Synthèse du dossier`
2. `Seuil de préparation des droits voisins`
3. `Rights Holder And Title Chain`
4. `Exploitation And Consent Map`
5. `Duration And Remuneration Posture`
6. `OGC And Collective Management Posture`
7. `Emerging Signal`
8. `Routage de décision`
9. `Validation humaine`

## Closed Routage de décision

Une seule route finale est autorisee :

- `proceed-with-neighboring-rights-brief`
- `clarify-title-chain`
- `clarify-exploitation-scope`
- `review-ogc-membership-and-remuneration`
- `route-to-work-qualification`
- `route-to-copyright-license`
- `route-to-copyright-assignment`
- `route-to-copyright-infringement`
- `route-to-pi-litigation`
- `hold-insufficient-basis`

## Modèle de sortie

```markdown
# Neighboring Rights And OGC Brief - [DOSSIER]

## 1. Synthèse du dossier
- `primary_track`:
- `management_posture`:
- `rights_chain_status`:
- `exploitation_mode`:
- `emerging_signal`:
- `territory_scope`:
- Sources consultées :

## 2. Neighboring Rights Readiness Gate
- Gate :
- Motif principal :
- Niveau de fiabilité :

## 3. Rights Holder And Title Chain
- Titulaire ou categorie de titulaire :
- Chaine de droits :
- Elements manquants :

## 4. Exploitation And Consent Map
- Acte d'exploitation vise :
- Consentement/autorisation :
- Operateurs impliques :

## 5. Duration And Remuneration Posture
- Duree apparente :
- Remuneration equitable :
- Fragilites :

## 6. OGC And Collective Management Posture
- OGC / mandat / adhesion :
- Gestion directe vs collective :
- Repartition ou perception :

## 7. Emerging Signal
- `emerging_signal` :
- Impact reel sur le dossier :
- Limite du signal secondaire :

## 8. Decision Routing
- Route finale :
- Pourquoi cette route :
- Routes ecartees :

## 9. Human Validation
- Points à confirmer :
- Sources à relire :
- Validation humaine requise avant usage externe.
```

## Exemples

<example>
<user>Un artiste-interprete veut vérifier ses droits sur un phonogramme exploité en streaming et la place de l'ADAMI.</user>
<response>Je traite le dossier comme `primary_track=performer-rights`, `management_posture=ogc-membership`, `exploitation_mode=streaming`, `emerging_signal=none`. Je vérifie d'abord le titulaire, l'enregistrement, l'acte d'exploitation, la posture OGC et les sources consultées. La sortie reste bornée aux 9 blocs V2 avec `Seuil de préparation des droits voisins`, cartographie consentement/rémunération et routage final fermé.</response>
</example>

<example>
<user>Un producteur veut mint un NFT d'un enregistrement et demande si le token transfère les droits.</user>
<response>Je garde le coeur du dossier en droits voisins si l'enregistrement, le titulaire et l'acte d'exploitation sont identifiés. Le `nft-signal` reste secondaire : il rappelle qu'un NFT ne transfère pas les droits, signalé le risque de mint sans autorisation et reroute vers contrat ou contentieux si le sujet principal sort du couloir voisins/OGC.</response>
</example>

## Working Référence

Utiliser aussi la note compacte :

`references/droits-voisins-ogc-routing-and-output.md`

## Niveaux de criticité

Échelle canonique appliquée à toute appréciation subjective de ce skill :

| Niveau | Icône | Signification dans le contexte de ce skill |
|---|---|---|
| Faible | 🟢 | OGC compétent identifié (SACEM/SACD/SCPP/SPPF/ADAMI/SPEDIDAM/CFC selon le cas), barème applicable connu, autorisations en règle ou licence légale couvrant l'usage. |
| Moyen | 🟡 | Répertoire de l'œuvre, de l'interprétation, du phonogramme/vidéogramme ou de la publication de presse à clarifier ; rattachement OGC à confirmer avant exploitation. |
| Élevé | 🟠 | OGC compétent ambigu (cumul de droits voisins, contrats croisés artistes-interprètes / producteur, presse `L.218-1+`) ; périmètre de l'autorisation à reconstituer. |
| Bloquant | 🔴 | Exploitation sans autorisation de l'OGC compétent ni couverture par licence légale, ou hors barème applicable : engagement de responsabilité civile et risque pénal `L.335-4`. |

Bases types : artistes-interprètes `L.212-1+`, producteurs de phonogrammes `L.213-1`, producteurs de vidéogrammes `L.215-1`, entreprises de communication audiovisuelle `L.216-1`, éditeurs de presse `L.218-1+` (post-2019).

Plancher cross-skill (CLAUDE.md §4) : ce skill ne peut pas dégrader silencieusement une cote 🔴 amont sans déclaration explicite.

## Non-goals

Le skill ne fait pas :

- un audit AI Act détaillé ;
- une note blockchain/NFT generaliste ;
- une licence auteur complète ;
- une cession auteur complète ;
- une stratégie contentieuse complète ;
- une qualification auteur principale de l'œuvre ;
- un avis juridique final utilisable sans validation humaine.
