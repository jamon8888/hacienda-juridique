---
name: depot-preuve-creation
version: "2.0.0"
description: Organise un dossier de preuve de création, d'antériorité d'usage ou de titularité avec registre, chronologie et lacunes probatoires.
argument-hint: "[open | add-evidence | timeline | bundle | review]"
authors: ["Hacienda"]
tags: [droit-auteur, preuve, enveloppe-Soleau, horodatage, antériorité]
---

# Dépôt Preuve Création

## Examples

<example>
<user>/h-pi:depot-preuve-creation [open | add-evidence | timeline | bundle | review]</user>
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

Si Anno Desktop est disponible, l'utiliser pour indexer et relier localement les
pièces de preuve du dossier, uniquement sur demande explicite. Appeler
`anno_health` avant tout outil Anno ; en cas d'échec, poursuivre en mode
Hacienda.

Règles spécifiques :

- appeler `detect` ou appliquer une gestion PII Anno équivalente avant toute
  pièce client ;
- n'utiliser `legal_ingest` qu'après confirmation explicite du périmètre local
  à indexer ;
- utiliser `legal_search` pour retrouver les pièces déjà ingérées ;
- utiliser `legal_timeline` pour construire une chronologie probatoire ;
- utiliser `legal_rehydrate_citation` uniquement pour une citation locale
  destinée à l'utilisateur autorisé.

Les résultats Anno sont une source interne Anno, jamais comme source primaire.
Anno ne remplace jamais un dépôt officiel, un constat, un horodatage ou un
registre officiel.

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Propriété Intellectuelle` est disponible. Ne pas inventer de tool hors périmètre ; si une source ou un registre n'a pas été consulté directement, garder `[à vérifier]`.

- Socle textes, jurisprudence et droit UE : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Dessins et modèles, droit d'auteur, logiciels, bases de données et droits voisins : utiliser le socle officiel ci-dessus ; les registres spécialisés non exposés par le serveur restent `[à vérifier]` ou traités via preuve/document client autorisé.
- Anno, quand disponible, reste une source interne de dossier : jamais un registre officiel INPI, EUIPO, OEB, OMPI ou BOPI.

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/` ou `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`.

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

Les noms `Evidence Register`, `Timeline`, `Proof Gaps`, `Liste de contrôle du bundle`, `Reviewer Note` sont des labels techniques normalisés inter-skills. Ils ne doivent pas être traduits ni renommés.

Selon le mode, produire les sorties nommées suivantes :

### Evidence Register

Structure minimale fixe :

- `dossier_id`
- `objet`
- `mode`
- `date_mise_a_jour`
- `pieces`

Chaque entrée de `pieces` doit contenir au minimum :

- `piece_id`
- `categorie`
- `description`
- `date_alleguee`
- `source_detenteur`
- `fait_vise`
- `statut_piece` : `consultee` | `mentionnee_non_consultee` | `manquante`
- `fiabilite_apparente` : `faible` | `moyenne` | `elevee`
- `reserve`

### Timeline

Structure minimale fixe :

- `dossier_id`
- `objet`
- `periode_couverte`
- `evenements`

Chaque entrée de `evenements` doit contenir au minimum :

- `event_id`
- `date_ou_plage`
- `type_evenement`
- `description`
- `piece_ids`
- `acteur_ou_entite`
- `niveau_certitude`
- `contradictions_ou_reserves`

### Proof Gaps

Structure minimale fixe :

- `dossier_id`
- `objet`
- `gaps`

Chaque entrée de `gaps` doit contenir au minimum :

- `gap_id`
- `niveau` : `critique` | `important` | `coherence` | `forme`
- `constat`
- `fait_impacte`
- `piece_cible`
- `detenteur_probable`
- `action_attendue`
- `urgence`
- `validation_humaine_requise`

### Liste de contrôle du bundle

Structure minimale fixe :

- `dossier_id`
- `objectif`
- `destinataire`
- `pieces_indexees`
- `pieces_manquantes`
- `contraintes_confidentialite`
- `validations_humaines_requises`

Liste de contrôle du dossier à transmettre ou relire : index des pièces, nommage, pagination, source, confidentialité, doublons, pièces manquantes, validations humaines requises.

### Reviewer Note

Note de revue courte indiquant :
- ce que le dossier permet de soutenir à ce stade ;
- ce qui demeure incertain ;
- quelles vérifications humaines ou sources primaires doivent encore être faites ;
- quel usage prudent est envisageable en interne.

## Rôle

Structurer, pour revue interne, un dossier de preuve de création, d'antériorité d'usage ou de titularité sur une œuvre, un logiciel, un usage de marque ou un dossier précontentieux. Le skill inventorie les faits allégués, les pièces disponibles, les incertitudes et les manques, puis produit des livrables normalisés inter-skills en attente de validation humaine.

Utiliser en priorité avec les références locales :
- `references/preuve-creation-fr.md`
- `references/grille-pieces-par-type.md`

## Ne fait pas

- Ne rend pas un avis juridique définitif sur la titularité, la validité d'un droit ou l'issue d'un contentieux.
- Ne présente pas une preuve préparée comme une force probante définitivement acquise.
- Ne remplace pas un dépôt officiel, un constat, une vérification de source primaire ou une validation humaine.
- Ne transforme pas des allégations client en faits établis sans pièce associée.
- Ne masque pas les incertitudes : tout élément non documenté reste indiqué `[à vérifier]`.

## Cadrage initial

Recueillir et séparer clairement :

- **Objet** : œuvre graphique, logiciel, marque / usage, opposition / nullité, dossier précontentieux.
- **Question posée** : création, antériorité, usage, chaîne de droits, préparation de dossier.
- **Faits allégués** : dates, auteurs, contributeurs, contexte de création, diffusion, exploitation.
- **Pièces disponibles** : emails, commits, exports, contrats, factures, tickets, captures, constats, enveloppe Soleau / e-Soleau, horodatages techniques.
- **Pièces manquantes** : ce qui est attendu mais absent.
- **Incertitudes** : identité auteur, date exacte, version pertinente, périmètre des droits, source secondaire non consultée.
- **Contrainte de sortie** : usage interne, revue contradictoire, préparation d'envoi, préparation précontentieuse.

## Mode d'analyse

Le skill opère uniquement dans l'un de ces cinq modes :

- `open` : ouvre le dossier, qualifie l'objet, structure les faits et produit un premier `Evidence Register`.
- `add-evidence` : ajoute une ou plusieurs pièces, met à jour le `Evidence Register` et complète `Proof Gaps`.
- `timeline` : ordonne les événements et versions dans une `Timeline`.
- `bundle` : prépare un paquet de revue ou de transmission et produit une `Liste de contrôle du bundle`.
- `review` : relit un dossier existant, teste la cohérence entre faits et pièces, puis produit une `Reviewer Note`.

Pour chaque mode :
- distinguer **faits allégués**, **pièces vérifiées**, **pièces mentionnées non consultées**, **incertitudes** ;
- indiquer la source immédiate de chaque pièce ;
- signaler toute contradiction de date, d'auteur, de version ou de titularité.

Contrat explicite `mode -> entrées minimales -> sorties obligatoires` :

- `open`
  - **Entrées minimales** : objet, question posée, faits allégués initiaux, au moins une pièce disponible ou une liste de pièces attendues, contrainte de sortie.
  - **Sorties obligatoires** : `Evidence Register`, `Proof Gaps`.
- `add-evidence`
  - **Entrées minimales** : identifiant du dossier, au moins une nouvelle pièce ou une correction de pièce, fait visé, source / détenteur.
  - **Sorties obligatoires** : `Evidence Register`, `Proof Gaps`.
- `timeline`
  - **Entrées minimales** : identifiant du dossier, au moins deux événements ou versions, dates ou plages de dates, pièces rattachées si disponibles.
  - **Sorties obligatoires** : `Timeline`, `Proof Gaps`.
- `bundle`
  - **Entrées minimales** : identifiant du dossier, liste des pièces à transmettre ou relire, objectif du paquet, contraintes de confidentialité ou de destinataire si connues.
  - **Sorties obligatoires** : `Liste de contrôle du bundle`.
- `review`
  - **Entrées minimales** : identifiant du dossier, un `Evidence Register` existant ou équivalent, objectif de revue, question(s) de validation humaine.
  - **Sorties obligatoires** : `Reviewer Note`, `Proof Gaps`.

## Grille des pièces

Appliquer la grille adaptée à l'objet dans `references/grille-pieces-par-type.md`, puis classer les pièces par catégorie :

1. **Preuves de création** : brouillons, maquettes, versions, exports, cahier de laboratoire, tickets, journaux de build.
2. **Preuves de date** : enveloppe Soleau / e-Soleau, horodatage technique, email daté, dépôt Git, constats, accusés de réception.
3. **Preuves de contribution** : auteurs identifiés, contrats, cessions, clauses salarié / freelance, bons de commande, livrables agence.
4. **Preuves d'exploitation ou d'usage** : publication, mise en ligne, distribution, facture, campagne, packaging, captures de diffusion.
5. **Preuves de contexte contentieux** : mise en demeure, captures adverses, comparatifs, rapports internes, constat.

Chaque entrée du registre doit préciser :
- identifiant de pièce ;
- description courte ;
- date alléguée ;
- source / détenteur ;
- lien avec le fait à prouver ;
- niveau de fiabilité apparent ;
- réserve ou limite `[à vérifier]` le cas échéant.

Format stable d'identifiant de pièce :

- Utiliser `PC-AAAA-NNN`.
- `AAAA` = année d'entrée de la pièce dans le dossier.
- `NNN` = numéro séquentiel sur trois chiffres, incrémenté sans réutilisation.
- Exemple : `PC-2026-001`.
- Si une pièce remplace une version précédente, conserver l'identifiant initial et indiquer la version en métadonnée, par exemple `v2`, sans changer l'identifiant principal.

## Chronologie

Produire une `Timeline` avec une ligne par événement probatoire :

- date ou plage de dates ;
- événement de création, modification, livraison, publication, usage ou contestation ;
- pièce(s) rattachée(s) ;
- personne ou entité associée ;
- commentaire sur la solidité du point de preuve.

Ordre de lecture recommande :
1. naissance du projet ou du signe ;
2. itérations et versions intermédiaires ;
3. livraisons ou publications ;
4. actes de dépôt ou d'horodatage ;
5. exploitation, diffusion ou usage opposé ;
6. contestation, opposition ou précontentieux.

## Trous probatoires

Produire `Proof Gaps` en distinguant :

- **Trou critique** : impossible, en l'état, d'étayer date, auteur, titulaire ou usage principal.
- **Trou important** : la preuve existe peut-être mais n'est pas localisée, complète ou lisible.
- **Trou de cohérence** : dates incompatibles, version non tracée, auteur non raccordé à une cession.
- **Trou de forme** : pièce exploitable en interne mais peu robuste seule en contradiction ou contentieux.

Pour chaque trou, proposer :
- la pièce cible attendue ;
- le détenteur probable ;
- le canal de récupération ;
- l'urgence ;
- la mention explicite qu'une validation humaine reste requise avant usage externe.

## Validation humaine

Validation humaine obligatoire avant :

- dépôt ou déclaration externe ;
- courrier contradictoire ou précontentieux ;
- affirmation de titularité non documentée ;
- qualification d'une pièce comme déterminante ;
- arbitrage final sur la suffisance probatoire.

Toujours rappeler en conclusion :
- ceci est un travail de structuration probatoire et non un conseil juridique définitif ;
- les sources non consultées restent `[à vérifier]` ;
- la force probante finale dépend du contexte, de la contradiction et de l'appréciation humaine.

## Niveaux de criticité

Échelle canonique appliquée à toute appréciation subjective de ce skill :

| Niveau | Icône | Signification dans le contexte de ce skill |
|---|---|---|
| Faible | 🟢 | Enveloppe Soleau, horodatage électronique qualifié ou constat d'huissier en bonne et due forme ; identification de l'œuvre claire et non équivoque ; antériorité opposable. |
| Moyen | 🟡 | Preuve datée mais identification de l'œuvre imprécise ou périmètre des éléments protégés à clarifier ; antériorité utilisable sous réserve de précisions. |
| Élevé | 🟠 | Preuve dégradée (capture d'écran datée mais non certifiée, mail à soi-même, dépôt non qualifié) ; antériorité fragile contestable en contradictoire. |
| Bloquant | 🔴 | Aucune preuve d'antériorité sur une œuvre clé exploitée commercialement alors qu'un conflit est imminent ou déjà ouvert : risque de ne pas pouvoir établir la date de création face à un tiers. |

Rappel : le dépôt ne crée pas de droit ; l'auteur est protégé dès la création par le seul fait de la création (`L.111-1`). Le dépôt vise uniquement à dater l'antériorité.

Plancher cross-skill (CLAUDE.md §4) : ce skill ne peut pas dégrader silencieusement une cote 🔴 amont sans déclaration explicite.

## Mode Anno Tabular optionnel

Si la distribution Hacienda + Anno Desktop est active, `depot-preuve-creation`
utilise Anno pour organiser localement pièces, dates, auteurs et supports,
jamais comme source primaire et jamais comme dépôt officiel, constat ou
horodatage. Appeler `anno_health` avant tout outil Anno ; si Anno est
indisponible, poursuivre en `fallback_hacienda`.

Le dossier probatoire doit être borné par le `matter_vault` et le
`workflow_blueprint` `creation-evidence-file-v1`. Utiliser `legal_ingest`,
`legal_search`, `legal_timeline` et une revue tabulaire avec
`tabular_review_create` pour suivre preuve, date, auteur, fait prouvé,
fiabilité, lacune, `review_status`, `decision_status` et `validation_status`.

Utiliser `grid_to_work_product` pour produire une annexe probatoire ou un plan
de régularisation depuis les cellules validées. Tout résultat Anno reste une
source interne Anno, jamais comme source primaire ; les sources officielles,
dépôts, constats et horodatages restent vérifiés via
`hacienda-sources-officielles`. Les pièces non lues ou non validées restent
`[à vérifier]`.
