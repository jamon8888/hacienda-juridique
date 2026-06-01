---
name: contrats-pi
description: >
  Skill V2 de rédaction ou revue complète de contrats de propriété
  intellectuelle PI-centriques. Il structure l'analyse par familles fermées,
  stabilisé l'cadrage initial et la sortie, et maintient une frontiere nette avec
  `revue-clause-pi` pour les simples clauses dans des contrats plus larges.
version: "2.0.0"
argument-hint: "[draft|review|negotiate] [famille contrat | texte | objectifs | parties]"
authors: ["Hacienda"]
tags: [contrats, licence-brevet, coexistence, NDA, R&D, franchise, transfert-technologie]
---

# Skill - Contrats de propriété intellectuelle V2

> **BROUILLON DE CONTRAT PI COMPLET OU NOTE DE REVUE COMPLÈTE, PAS ACTE
> DÉFINITIF.**
>
> `contrats-pi` couvre les contrats dont l'objet principal est la propriété
> intellectuelle. Il sert à rédiger un projet complet ou à faire une revue
> complète d'un contrat PI autonome.
>
> Il ne remplace pas `revue-clause-pi`, qui traite les clauses PI inserees dans
> des contrats plus larges.
>
> Les sorties sont des brouillons de travail. Elles exigent une validation
> humaine avant signature, envoi ou exécution.

Référence de travail utile :
`references/contrats-pi-families-and-routing.md`

## Examples

<example>
<user>/h-pi:contrats-pi [draft|review|negotiate] [famille contrat | texte | objectifs | parties]</user>
<response>
Brouillon de travail structuré, avec faits, droit, analyse, incertitudes, sources consultées, points `[à vérifier]` et validation humaine obligatoire.
</response>
</example>

## Chargement du profil

Avant tout travail substantiel, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Si le profil est absent, incomplet ou contient `[A CONFIGURER]`, demander `/h-pi:entretien-demarrage` et garder les marqueurs `[à vérifier]` visibles.

Avant tout, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Rattacher ensuite :

- posture contractuelle par défaut ;
- juridiction par défaut ;
- modèles internes si disponibles ;
- approbateur contrats PI ;
- préférences de négo et seuils d'escalade si documentés.

Si le profil est absent, incomplet ou contient `[A CONFIGURER]`, garder les
marqueurs de brouillon visibles :

- `[PROVISOIRE]`
- `[à vérifier]`
- `[À COMPLÉTER]`

## Intake

Identifier au minimum : demande, actif ou droit concerné, parties, territoire, dates utiles, documents disponibles, source officielle à consulter, urgence, sortie attendue et niveau de validation humaine requis.

## Pré-flight `check-pii`

Avant toute analyse substantielle sur des pièces client : invoquer
`/h-pi:check-pii` sur le corpus fourni. Si le résultat déclenche le
prompt cas B (seuil B atteint ou catégorie sensible PI détectée),
attendre la décision utilisateur (anonymiser via `hacienda-ghost`,
ignorer, ou stopper) avant de poursuivre.

Si l'utilisateur choisit « ignorer », apposer un caveat
`[PII non traitée — décision utilisateur]` dans la note du relecteur.

## Gate non-juriste

Si l'utilisateur n'est pas juriste ou avocat, produire une explication opérationnelle, signaler les limites, refuser toute conclusion présentée comme avis juridique final et demander validation par un professionnel habilité avant usage externe.

## Mode Anno Desktop Optionnel

Si Anno Desktop est actif, l'utiliser comme aide locale de lecture et de
mémoire de dossier, jamais comme autorité juridique. Appeler `anno_health`
avant tout outil Anno ; si le moteur est indisponible, poursuivre en mode
Hacienda.

Règles spécifiques :

- appeler `detect` ou appliquer une gestion PII Anno équivalente avant toute
  pièce contractuelle client ;
- utiliser `legal_extract_contract` pour extraire structure, clauses,
  définitions et annexes d'un contrat fourni ou déjà ingéré ;
- utiliser `legal_risk_review` pour préparer une matrice de risques
  contractuels, sans la présenter comme avis final ;
- utiliser `legal_search` seulement sur le corpus déjà ingéré et autorisé ;
- utiliser `legal_rehydrate_citation` uniquement pour une citation locale
  destinée à l'utilisateur autorisé.

Tout passage Anno est une source interne Anno, jamais comme source primaire.
Les textes, registres et références opposables restent contrôlés via
`hacienda-sources-officielles` et les outils PI Hacienda.

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Propriété Intellectuelle` est disponible. Ne pas inventer de tool hors périmètre ; si une source ou un registre n'a pas été consulté directement, garder `[à vérifier]`.

- Socle textes, jurisprudence et droit UE : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Marques, BOPI et EUIPO : `inpi_search_marques`, `inpi_marque_details`, `inpi_marques_publications_recentes`, `euipo_tmview_search`, `bopi_dernieres_publications`.
- Brevets et Espacenet : `inpi_search_brevets`, `inpi_brevet_details`, `espacenet_search`, `espacenet_brevet_details`.
- Anno, quand disponible, reste une source interne de dossier : jamais un registre officiel INPI, EUIPO, OEB, OMPI ou BOPI.

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/` ou `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`.

```text
outputs/contrat-pi-<contract-family>-<parties-slug>-YYYY-MM-DD.md
```

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

## Rôle

Ce skill sert quand il faut traiter un **contrat PI centré sur la PI elle-même** :

- licence ou cession de brevet ;
- NDA / confidentialité avec fort enjeu PI ou secret d'affaires ;
- transfert de technologie et licence de savoir-faire ;
- R&D collaborative et partage de résultats ;
- coexistence de marques ou franchise avec volet PI structurant ;
- MTA biotech/pharma avec regime d'usage et de résultats sensible.

Il ne sert pas à commenter quelques clauses isolées au milieu d'un MSA, d'un
SOW, d'un contrat commercial, d'un procurement ou d'un contrat de travail.

## Frontiere avec les skills voisins

### Basculer vers `revue-clause-pi` quand

- la PI n'est qu'un bloc d'un contrat plus large ;
- la demande porte sur quelques clauses PI, un article PI, un extrait ou un
  bloc ownership / licence / inventions / OSS / data ;
- la sortie attendue est une note de revue ciblee, une issue list ou une
  solution de repli redline.

### Basculer vers les skills specialises quand

- cession de droits d'auteur pure -> `cession-droit-auteur` ;
- licence de droits d'auteur -> `licence-droit-auteur` ;
- base de données ou droit sui generis -> `bases-de-donnees` ;
- chaîne de droits logiciel / data -> `revue-logiciel-donnees` ;
- revue de clause PI dans un contrat large -> `revue-clause-pi`.

### Rester dans `contrats-pi` quand

- le contrat est un contrat PI autonome ;
- la PI est l'objet principal du deal ;
- la sortie attendue est une architecture contractuelle complète ou une revue
  complète du document.

## Inputs minimaux

Ne pas démarrer l'analyse sans demander le minimum suivant.

1. **Mode** - `draft` ou `review`
2. **Famille contractuelle** - une seule parmi :
   - `patent-tech-transfer`
   - `nda-secret-knowhow`
   - `rnd-collaboration`
   - `trademark-coexistence-franchise`
   - `mta-life-sciences`
3. **Parties** - identité et pays
4. **Notre rôle** - titulaire, concédant, licencié, franchisé, franchisor,
   partenaire R&D, destinataire du matériel, autre
5. **Périmètre PI** - titres, savoir-faire, marques, résultats, matériel, logiciel,
   data, ou combinaison
6. **Territory**
7. **Duration**
8. **Financial model** - forfait, royalties, mixte, gratuit, autre
9. **Business context** - exploitation, partenariat, due diligence, précontentieux,
   franchise, recherche, autre
10. **Jurisdiction**

Compléments utiles :

- exclusivité ;
- titres exacts concernes ;
- contexte précontentieux ou transactionnel ;
- dépendance à des registres d'opposabilité ;
- contraintes export / concurrence / RGPD ;
- calendrier de signature ou de closing.

Si un bloc critique manque, continuer seulement avec hypothèse explicite et
marquage `[à vérifier]`.

## Familles contractuelles

### `patent-tech-transfer`

Usage :

- licence de brevet ;
- cession de brevet ;
- licence de savoir-faire ;
- transfert de technologie.

Enjeux dominants :

- périmètre exact des titres et revendications ;
- exclusivité ;
- royalties et assiette ;
- sous-licence ;
- grant-back et perfectionnements ;
- registres d'opposabilité ;
- TTBER / art. 101 TFUE.

### `nda-secret-knowhow`

Usage :

- NDA ;
- accord de confidentialité ;
- partage de savoir-faire non titre ;
- discussions prealables à un deal PI ou technologique.

Enjeux dominants :

- definition des informations ;
- exceptions ;
- durée ;
- usage autorisé ;
- residuals ;
- PI generee pendant les discussions ;
- protection secret des affaires.

### `rnd-collaboration`

Usage :

- contrat de R&D collaborative ;
- recherche conjointe ;
- innovation commune ;
- partage background / foreground / sideground.

Enjeux dominants :

- attribution des résultats ;
- accès croises ;
- exploitation commerciale ;
- publication ;
- couts de protection ;
- sortie / retrait / défaillance ;
- exemption R&D.

### `trademark-coexistence-franchise`

Usage :

- accord de coexistence de marques ;
- licence de marque avec forte composante PI ;
- franchise avec savoir-faire et signes distinctifs structurants.

Enjeux dominants :

- delimination du périmètre ;
- non-opposition ;
- anti-confusion ;
- cession / changement de contrôle ;
- DIP et savoir-faire ;
- antitrust.

### `mta-life-sciences`

Usage :

- MTA biotech/pharma ;
- transfert de matériel biologique ou chimique ;
- usage recherche / commercial sous contraintes PI.

Enjeux dominants :

- usage permis ;
- matériel et produits dérivés ;
- propriété sur les résultats ;
- publication ;
- retour / destruction ;
- limites d'exploitation.

## Listes de contrôle par famille

### `patent-tech-transfer`

Clauses critiques :

| Clause | Points d'attention | Risque si absente/mal rédigée |
|--------|-------------------|-------------------------------|
| Objet et revendications licenciees | Lister precisement les titres et le périmètre | Litige sur le champ |
| Territoire | Pays ou zones couverts | Exploitation hors champ = contrefaçon |
| Exclusivité | Exclusive / sole / non-exclusive | Perte de contrôle ou ambiguïté |
| Durée | Fixe ou vie du titre | Risque antitrust / durée floue |
| Redevances | Assiette, base, échéances | Litige financier |
| Sous-licence | Autorisee / interdite / encadrée | Perte de maitrise |
| Perfectionnements | Grant-back, licences retour | Risque art. 101 TFUE |
| Non-contestation | Limites post-Windsurfing | Clauses fragiles |
| Garanties | Titularité, validité, non-atteinte tiers | Responsabilité du concédant |
| Formalités | Inscription RNB / registre EP / national | Inopposabilité |

### `nda-secret-knowhow`

Clauses critiques :

| Clause | Points d'attention |
|--------|-------------------|
| Definition des infos confidentielles | Trop large ou trop etroite |
| Exceptions | Domaine public, développement indépendant, obligation légale |
| Durée | Standard 2-5 ans ou tant que secret maintenu |
| Usage autorisé | Évaluation seulement ou exploitation encadrée |
| Restitution / destruction | Sort des copies et dérivés |
| Residuals | Risque de vidage du NDA |
| PI generee | Sort des résultats pendant les discussions |
| Juridiction | Loi + tribunal ou arbitrage |

### `rnd-collaboration`

Clauses critiques :

| Clause | Points d'attention |
|--------|-------------------|
| Background IP | Description exhaustive des apports |
| Foreground IP | Attribution, copropriété, répartition |
| Sideground IP | Developpements paralleles |
| Accès croisés | Licences sur background / foreground |
| Publication | Délai de revue avant divulgation |
| Exploitation commerciale | Qui exploité quoi, ou, quand |
| Financement | Dépôts, annuités, maintien |
| Sortie / défaillance | Sort des résultats si un partenaire sort |

### `trademark-coexistence-franchise`

Clauses critiques :

| Clause | Points d'attention |
|--------|-------------------|
| Delimitation | Territoire, classes, canaux, visuel |
| Non-opposition | Portée temporelle et matérielle |
| Mesures anti-confusion | Packaging, logo, communication |
| Durée / résiliation | Vie des marques ou durée fixe |
| Cession / changement contrôle | Préemption ou consentement |
| Savoir-faire / DIP | Franchise et obligations precontractuelles |
| Antitrust | Pas de partition de marché deguisee |

### `mta-life-sciences`

Clauses critiques :

| Clause | Points d'attention |
|--------|-------------------|
| Matériel transféré | Identification et quantités |
| Usage permis | Recherche seule ou usage mixte |
| Produits dérivés | Régime de propriété et usage |
| Résultats | Titularité, licences, publication |
| Retour / destruction | Fin de projet ou breach |
| Responsabilité / biosafety | Conformité et risques |

## Competition and regulatory issues

### TTBER (UE 316/2014) - Transfert de technologie

| Critere | Seuil | Effet |
|---------|-------|-------|
| Parts de marché combinées (concurrents) | <= 20% | Exemption par catégorie |
| Parts de marché de chaque partie (non-concurrents) | <= 30% | Exemption par catégorie |
| Au-dela des seuils | > 20% / 30% | Analyse individuelle art. 101(3) TFUE |

Clauses noires :

- fixation de prix de revente ;
- répartition de marchés ou clientèles entre concurrents ;
- restriction de ventes passives ;
- limitation de production hors cadres permis.

Clauses grises :

- grant-back exclusif ;
- non-contestation du titre ;
- restriction R&D hors domaine couvert.

### R&D collaborative

Vérifier si le montage releve d'une logique d'exemption R&D ou s'il faut une
analyse plus fine des parts de marché et restrictions concurrentielles.

### Franchise / coexistence

Vérifier l'absence de partage de marché deguise, surtout si la delimitation
territoriale ou de clientele devient trop rigide.

## Registration and opposability actions

| Droit | Formalite | Registre | Effet |
|-------|-----------|----------|-------|
| Brevet FR | Inscription au RNB | INPI | Inopposable aux tiers si non inscrit |
| Brevet EP | Registre EP ou registre national selon validation | OEB / offices nationaux | Opposabilite par pays |
| Marque FR | Inscription au RNM | INPI | Inopposable aux tiers |
| Marque UE | Inscription au registre EUIPO | EUIPO | Inopposable aux tiers |
| D&M FR | Inscription au registre D&M | INPI | Inopposable |
| Savoir-faire | Pas de registre | - | Protection contractuelle seule |

## Règles communes de sortie

Toute sortie doit distinguer :

1. faits lus ;
2. hypothèses ;
3. clauses ou informations manquantes ;
4. risques juridiques ;
5. arbitrages business ;
6. formalités / actions post-signature ;
7. validation humaine obligatoire.

Toute source ou pièce non consultée reste `[à vérifier]`.

## Contrat de sortie

### Mode `draft`

Produire exactement les huit blocs suivants, dans cet ordre :

1. `Contract Snapshot`
2. `Clause Architecture`
3. `Critical PI Terms`
4. `Registration and Opposability Actions`
5. `Competition and Regulatory Issues`
6. `Negotiation Variables`
7. `Draft Contract`
8. `Validation humaine`

### Mode `review`

Produire exactement les huit blocs suivants, dans cet ordre :

1. `Contract Snapshot`
2. `Critical PI Terms`
3. `Issue List`
4. `Registration and Opposability Actions`
5. `Competition and Regulatory Issues`
6. `Negotiation Position`
7. `Red Flags and Missing Inputs`
8. `Validation humaine`

## Error handling and guardrails

Limiter l'analyse si l'un des points suivants manque :

- titres ou actif PI non identifiés ;
- territoire inconnu ;
- rôle exact des parties non établi ;
- texte contractuel incomplet en `review` ;
- structure financière non connue alors qu'elle conditionne le montage ;
- contrainte concurrence plausible mais parts de marché inconnues.

Dans ces cas :

1. expliciter l'hypothèse ;
2. marquer la zone `[à vérifier]` ;
3. reduire toute recommandation agressive ou définitive.

## Seuil non-juriste

- [ ] Contrat PI autonome ou bloc de clauses seulement correctement qualifiés
- [ ] `contract_family` correctement choisie
- [ ] Objet PI precisement delimite
- [ ] Exclusivité / territoire / durée clarifies
- [ ] Conditions financières lisibles
- [ ] Risque concurrence / TTBER examine si pertinent
- [ ] Formalités d'opposabilité identifiées
- [ ] Sort des droits post-contrat traite
- [ ] Validation humaine requise visible

## Niveaux de criticité

Échelle canonique appliquée à toute appréciation subjective de ce skill :

| Niveau | Icône | Signification dans le contexte de ce skill |
|---|---|---|
| Faible | 🟢 | Contrat conforme : périmètre cession/licence clair, durée et territoire bornés, formalités d'opposabilité prêtes ou faites. |
| Moyen | 🟡 | Formalités d'opposabilité non finalisées (inscription au Registre national des brevets ou des marques) — opposabilité aux tiers fragilisée tant que non inscrites. |
| Élevé | 🟠 | Clause ambiguë sur la portée, le territoire, l'exclusivité, la sous-licence ou les améliorations — risque contentieux d'interprétation. |
| Bloquant | 🔴 | Clause portant nullité (cession L.131-3 incomplète : mention obligatoire de chaque droit cédé, durée, territoire et destination manquante) OU clause manifestement contraire au règlement TTBER (UE 316/2014) sur les accords de transfert de technologie. |

Plancher cross-skill (CLAUDE.md §4) : ce skill ne peut pas dégrader silencieusement une cote 🔴 amont sans déclaration explicite.

## Ce skill ne fait pas

- signer ou executer le contrat ;
- reviser quelques clauses PI dans un contrat large ;
- rédiger les contrats auteur purs ;
- rédiger ou revoir la chaîne de droits logiciel/data ;
- gerer l'inscription effective aux registres ;
- rendre un avis final de concurrence hors cadrage de premier niveau.

## Ton

Technique, structuré, orienté décision. Toujours distinguer faits, hypothèse,
risques, actions post-signature et validation humaine.

## Mode Anno Tabular optionnel

Si la distribution Hacienda + Anno Desktop est active, `contrats-pi` utilise
Anno comme aide locale de dossier, jamais comme source primaire. Appeler
`anno_health` avant tout outil Anno ; si Anno est indisponible, poursuivre en
`fallback_hacienda`.

Rattacher le contrat au `matter_vault` et sélectionner un `workflow_blueprint`
adapté au contrat. Utiliser `legal_extract_contract`, `legal_search` et
`legal_graph_query`, puis une revue tabulaire avec `tabular_review_create` pour
suivre droits, durée, territoire, exclusivité, garanties, indemnités,
restrictions et obligations. Chaque ligne de risque doit porter
`review_status`, `decision_status`, responsable, action et `validation_status`.

Utiliser `grid_to_work_product` pour produire une note, une liste de points de
négociation ou un projet contractuel depuis les cellules validées. Tout passage
Anno reste une source interne Anno, jamais comme source primaire ; les textes,
registres et sources officielles restent vérifiés via
`hacienda-sources-officielles`. Les points non validés restent `[à vérifier]`.
