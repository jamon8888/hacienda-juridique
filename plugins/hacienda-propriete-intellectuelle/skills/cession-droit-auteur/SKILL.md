---
name: cession-droit-auteur
version: "2.0.0"
description: >
  Skill V2 strict de préparation d'une cession de droits patrimoniaux
  d'auteur. Il fixe un contrat d'entrée fermé, un seuil de préparation de
  cession, une branche bornée de title-chain cleanup, une sortie stabilisée en
  9 blocs, un routage fermé vers la bonne voie PI, et des modes courts métier
  `--chain-of-title`, `--clause-only`, `--remuneration-only`. Brouillon de
  travail soumis à validation avocat PI.
argument-hint: "[full-assignment|partial-assignment|exclusive-assignment|non-exclusive-assignment] [--chain-of-title|--clause-only|--remuneration-only]"
authors: ["Hacienda"]
tags: [droit-auteur, cession, L131-3, L131-4, L131-1, L121-1, L113-9, patrimonial]
---

# Skill — cession-droit-auteur

> **BROUILLON DE PRÉPARATION PATRIMONIALE, VALIDATION AVOCAT PI OBLIGATOIRE.**
>
> Ce skill prépare un brouillon de cession de droits patrimoniaux d'auteur de
> droit français. Il ne produit pas un contrat final signable, ne signe pas la
> cession, et ne remplace pas une validation humaine par un avocat PI inscrit.
>
> **Frontière avec les autres skills.**
> - `qualification-oeuvre` : en amont si le statut d'auteur, l'originalité ou
>   la titularité initiale restent litigieux.
> - `licence-droit-auteur` : alternative si un transfert de titularité n'est
>   pas nécessaire (autorisation d'exploitation).
> - `revue-logiciel-donnees` : si l'œuvre est un logiciel, régime spécial
>   `L.113-9` (présomption employeur).
> - `contrats-pi` : si la cession est imbriquée dans un contrat plus large
>   (édition, production audiovisuelle, contrat de commande complexe).
> - `contentieux-pi` : si un conflit de chaîne de titularité est en cours
>   (action en revendication, opposition de coauteur, contestation d'ayant
>   droit).

---

## Examples

<example>
<user>/h-pi:cession-droit-auteur ./scenario-audiovisuel.pdf --mode=full-assignment --duree=70-ans-pma --territoire=monde --auteur=commande</user>
<response>
1. Pré-flight `check-pii` sur le scénario, le contrat de commande et la fiche
   auteur (IBAN ayant droits, montants > 10k€ activent le seuil B).
2. Lecture profil cabinet, bloc Droit d'auteur (position défaut cession auteur
   de commande, posture conseil, approbateur cession droits).
3. Qualification : œuvre audiovisuelle, auteur unique de commande, cession
   totale envisagée, durée 70 ans post mortem auctoris, monde entier, tous
   médias connus et inconnus.
4. Audit titre auteur initial (`L.111-1`, originalité, date) et chaîne
   (contrat de commande signé, pas de coauteur revendiqué).
5. Rédaction clause `L.131-3` conforme : énumération distincte de chaque
   droit cédé (reproduction, représentation, adaptation, traduction,
   merchandising), durée, territoire, supports.
6. Rémunération `L.131-4` proportionnelle (% recettes nettes producteur) ;
   forfait écarté car cas exceptionnels non remplis.
7. Findings cotés 🔴🟠🟡🟢 ; mention `L.121-1` droit moral inaliénable
   articulé avec la cession.
8. Post-flight `verifier-citations` sur `L.131-3`, `L.131-4`, `L.111-1`,
   `L.121-1`.
9. Sortie 9 blocs + note du relecteur + arbre 5 options.
</response>
</example>

<example>
<user>/h-pi:cession-droit-auteur ./photo-campagne.pdf --mode=partial-assignment --chain-of-title</user>
<response>
Mode `--chain-of-title`, cession partielle de droits sur une photographie de
campagne publicitaire. Focus exclusif sur la reconstitution de la chaîne :
photographe freelance (auteur initial `L.111-1`) → agence (cessionnaire
intermédiaire, contrat de prestation à produire) → annonceur (cessionnaire
actuel). Maillon manquant identifié : contrat freelance photographe / agence
introuvable. Sortie : carte de la chaîne, point de rupture 🔴, régularisation
requise avant cession utile, route `route-to-title-chain-cleanup`. Pas de
rédaction de clause tant que la chaîne n'est pas propre.
</response>
</example>

<example>
<user>/h-pi:cession-droit-auteur --mode=exclusive-assignment --clause-only --droits="reproduction,representation" --territoire=UE --duree=10-ans</user>
<response>
Mode `--clause-only`, cession exclusive. Focus sur la rédaction d'une clause
`L.131-3` conforme : énumération distincte des deux droits cédés
(reproduction et représentation), territoire UE délimité, durée 10 ans à
compter de la signature, modes d'exploitation énumérés (édition papier,
édition numérique, streaming, podcast). Clause `L.131-4` de rémunération
proportionnelle accolée. Pas de revue du reste du contrat. Marqueurs
`[à vérifier]` sur les supports émergents non visés (métavers, IA
générative). Routage `prepare-exclusive-assignment-draft`.
</response>
</example>

<example>
<user>/h-pi:cession-droit-auteur ./contrat-illustrateur.pdf --mode=non-exclusive-assignment --remuneration-only</user>
<response>
Mode `--remuneration-only`, cession non exclusive à un illustrateur.
Arbitrage `L.131-4` : proportionnelle par défaut vs forfaitaire au titre des
cas exceptionnels (al. 2 — base de calcul impraticable, utilisation
accessoire, nature ou conditions d'exploitation rendant impossible
l'application de la règle proportionnelle). Analyse des conditions de fait :
diffusion B2B confidentielle, pas de mesure d'audience, illustration
accessoire à un produit logiciel. Le forfait est défendable mais doit être
motivé dans le contrat. Périodicité de reddition de comptes proposée si
proportionnelle maintenue. Findings cotés. Routage
`prepare-non-exclusive-assignment-draft`.
</response>
</example>

---

## Chargement du profil

Avant tout travail substantiel, lire :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

> Lire en particulier le bloc **Droit d'auteur** :
> - **Pratique droit d'auteur** — édition / audiovisuel / logiciel SaaS /
>   design / mode / publicité / multimedia / transversal.
> - **Posture conseil** — préventif / réactif / contentieux.
> - **Position défaut cession auteur de commande** — totale étendue 70 ans /
>   limitée durée+territoire+médias / case par case.
> - **Position défaut rémunération cession** — proportionnelle `L.131-4` /
>   forfaitaire cas exceptionnels.
> - **Approbateur cession droits** — avocat seul / + Direction marketing /
>   + GC.
> - **Politique PII** — `passive` / `active` / `strict` + seuil B.

Si le profil est absent, incomplet ou contient `[A CONFIGURER]`, demander
`/h-pi:entretien-demarrage` et garder les marqueurs `[à vérifier]`,
`[PROVISOIRE]` et `[À COMPLÉTER]` visibles.

---

## Intake

Identifier au minimum :

1. **Mode principal** — `full-assignment` | `partial-assignment` |
   `exclusive-assignment` | `non-exclusive-assignment`.
2. **Mode court métier** (optionnel) — `--chain-of-title` | `--clause-only` |
   `--remuneration-only`.
3. **Œuvre ou corpus visé** — type, date de création, support, titre si
   pertinent.
4. **Qualité auteur** — personne physique seule / collaboration / collective /
   audiovisuelle / logiciel `L.113-9`.
5. **Identité cédant et cessionnaire** — personne physique ou morale, base de
   titularité revendiquée.
6. **Droits visés** — reproduction, représentation, adaptation, traduction,
   merchandising, autres.
7. **Territoire, durée, supports, usages exclus**.
8. **Modèle économique** — proportionnel, forfaitaire, avance + royalty,
   mixte.
9. **Documents disponibles** — contrats antérieurs, contrats de commande,
   bulletins de salaire si salarié, fiches contributeurs.
10. **Urgence et sortie attendue** — préparation, négociation, brouillon
    partiel, blocage.

---

## Pré-flight `check-pii`

Avant toute analyse substantielle sur des pièces client : invoquer
`/h-pi:check-pii` sur le corpus fourni. Corpus typique d'une cession de
droits d'auteur :

- contrats de commande, contrats de prestation ;
- bulletins de salaire / contrats de travail (si question `L.113-9`) ;
- factures, échanges sur la rémunération (montants > 10k€ activent une
  catégorie sensible) ;
- IBAN ayant droits, NIR créateur (catégorie sensible PI) ;
- annexes œuvres (scénarios, maquettes, code source).

Si le résultat déclenche le prompt cas B (seuil B atteint ou catégorie
sensible PI détectée), attendre la décision utilisateur (anonymiser via
`hacienda-ghost`, ignorer, ou stopper) avant de poursuivre.

Si l'utilisateur choisit « ignorer », apposer un caveat
`[PII non traitée — décision utilisateur]` dans la note du relecteur.

---

## Gate non-juriste

- [ ] Mode principal confirmé.
- [ ] Mode court métier identifié si fourni.
- [ ] `check-pii` exécuté.
- [ ] Profil Droit d'auteur lu.
- [ ] Qualification œuvre stabilisée ou renvoi `qualification-oeuvre` posé.
- [ ] Chaîne de titularité auditée ou renvoi `route-to-title-chain-cleanup`
      posé.
- [ ] Clause `L.131-3` examinée pour chaque droit cédé.
- [ ] Rémunération `L.131-4` proportionnelle vs forfait tranchée et motivée.
- [ ] Droit moral `L.121-1` mentionné comme inaliénable.
- [ ] Findings cotés 🔴🟠🟡🟢 sans dégradation silencieuse.
- [ ] Citations vérifiées ou taguées `[à vérifier]`.
- [ ] Sortie 9 blocs + note du relecteur + arbre 5 options.

Si l'utilisateur n'est pas juriste ou avocat, produire une explication
opérationnelle, signaler les limites, refuser toute conclusion présentée
comme avis juridique final et demander validation par un professionnel
habilité avant usage externe.

---

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Propriété
Intellectuelle` est disponible. Ne pas inventer de tool hors périmètre ; si
une source ou un registre n'a pas été consulté directement, garder
`[à vérifier]`.

- Socle textes, jurisprudence et droit UE : `piste_status`,
  `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`,
  `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Articles à privilégier : `L.111-1`, `L.121-1` (droit moral), `L.131-1`
  (interdiction cession globale œuvres futures), `L.131-3` (mentions
  obligatoires), `L.131-4` (rémunération proportionnelle et forfait),
  `L.113-2` à `L.113-9` (collaboration, collective, audiovisuelle, logiciel).
- Droit UE applicable : directives 2001/29 (InfoSoc) et 2019/790 (DSM), à
  vérifier via `eurlex_recherche` quand l'exploitation est UE.
- Anno, quand disponible, reste une source interne de dossier : jamais un
  registre officiel INPI, EUIPO, OEB, OMPI ou BOPI.

Ce skill prépare un brouillon de cession patrimoniale stricte. Il ne produit
pas un contrat final signable, ne remplace pas l'avocat, ne remplace pas la
qualification de l'œuvre, ne remplace pas une licence quand un transfert de
titularité est inutile, ne remplace pas le régime logiciel, et ne se
transforme pas en orchestrateur de portefeuille.

---

## Modes courts

### `--chain-of-title`

Focus exclusif sur la reconstitution de la chaîne de titularité (auteur
initial → cédants successifs → cédant actuel). Ne rédige pas la clause de
cession. Sortie : carte de la chaîne, point de rupture identifié, personne
ou document manquant, régularisation requise, route
`route-to-title-chain-cleanup` si la chaîne n'est pas propre.

### `--clause-only`

Focus rédaction d'une clause `L.131-3` conforme (énumération distincte de
chaque droit cédé, durée, territoire, modes et étendue d'exploitation) et
clause `L.131-4` de rémunération accolée. Pas de revue du reste du contrat,
pas d'audit DD, pas de chaîne de titularité au-delà du strict minimum
permettant d'identifier le cédant.

### `--remuneration-only`

Focus arbitrage `L.131-4` : proportionnelle par défaut vs forfaitaire (al. 2
cas exceptionnels — base de calcul impraticable, utilisation accessoire,
contribution non individualisable, nature ou conditions d'exploitation
spécifiques). Montants, modalités de calcul, périodicité de reddition des
comptes, audit. Ne rédige ni la clause `L.131-3` complète ni le reste du
contrat.

---

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré :
`~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/`
ou
`~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`.

---

## Contrat d'entrée fermé

Le skill doit dériver ou expliciter un des statuts fermés suivants pour
chaque dossier :

- `transfer_track` : `full-assignment` | `partial-assignment` |
  `exclusive-assignment` | `non-exclusive-assignment`
- `creation_context` : `independent-author` | `commissioned-work` |
  `employee-non-software` | `collective-work-claim` | `collaborative-work` |
  `audiovisual` | `publishing`
- `title_chain_status` : `clear` | `mixed` | `uncertain` | `blocked`
- `work_status` : `qualified` | `partially-qualified` | `uncertain`
- `economic_model` : `royalty` | `flat-fee` | `advance-plus-royalty` | `mixed`
- `scope_posture` : `narrow` | `standard` | `broad` | `all-current-uses`
- `counterparty_profile` : `publisher` | `producer` | `brand` | `platform` |
  `customer` | `internal-group` | `mixed`

Les statuts sont fermés. Le skill ne doit pas inventer de semi-vrai centré
ou de prose libre à la place du contrat d'entrée.

---

## Faits minimums requis

Ne pas produire une sortie propre si manquent :

- l'œuvre ou le corpus visé ;
- l'identité du cédant ;
- l'identité du cessionnaire ;
- la base de titularité du cédant ;
- les droits visés ;
- le territoire ;
- la durée ;
- le modèle économique ;
- le contexte de création ;
- le statut coauteur / employeur / prestataire si pertinent.

Si les faits sont incomplets mais que le dossier reste exploitable, produire
un brouillon `partial` et garder les marqueurs `[PROVISOIRE]`,
`[à vérifier]` et `[À COMPLÉTER]` visibles dans la sortie.

---

## Seuil de préparation de la cession

Le skill applique un seuil fermé avec trois issues : `ready`, `partial`,
`blocked`.

- `ready` — base de titularité suffisante, contexte lisible, branche cohérente
  avec la demande.
- `partial` — brouillon exploitable, certains points restent à confirmer,
  marqueurs `[PROVISOIRE]`, `[à vérifier]`, `[À COMPLÉTER]` conservés.
- `blocked` — chaîne de titularité trop incertaine, cession globale d'œuvres
  futures hors exception, licence suffisante, personne morale sans base de
  titularité claire, coauteurs ou ayants droit non sécurisés.

Quand le seuil est bloqué, le skill oriente vers la bonne branche ou arrête
proprement avec les régularisations à faire.

---

## Sortie

### Format livrable

```
[En-tête de confidentialité selon le rôle utilisateur]

> **⚠️ Note du relecteur**
> - **Sources :** Légifrance ✓ / Judilibre ✓ / Eurlex ✓ (cocher ✗ si non connectée)
> - **Lecture :** intégrale ({N} pages contrat + {M} annexes) | partielle (pages X à Y)
> - **Signalé pour ton jugement :** {N} éléments marqués [review] | aucun
> - **Fraîcheur :** recherche juridique post-{date} — {N} mises à jour intégrées | rien trouvé
> - **Avant de t'appuyer dessus :** {action concrète : négocier / compléter / escalader / prêt pour relecture}

# Cession droits d'auteur — {œuvre} — {mode}

## Étape 1 — Pré-flight `check-pii` + identification

1. Invoquer `check-pii` sur le corpus (contrats, échanges, IBAN, NIR,
   montants > 10k€, scénarios, maquettes).
2. Lire le profil cabinet et bloc Droit d'auteur.
3. Identifier l'œuvre, le cédant, le cessionnaire, la date de création, le
   contexte de création.

## Étape 2 — Lecture profil bloc Droit d'auteur

- Position défaut cession auteur de commande.
- Posture conseil (préventif / réactif / contentieux).
- Approbateur cession droits.
- Position rémunération (proportionnelle vs forfait).

## Étape 3 — Qualification mode + œuvre + qualité auteur

- Mode : full / partial / exclusive / non-exclusive.
- Type d'œuvre : littéraire, graphique, audiovisuelle, musicale, logiciel,
  base de données.
- Qualité auteur : personne physique seule, collaboration `L.113-2`,
  collective `L.113-2` al. 3, audiovisuelle `L.113-7`, logiciel `L.113-9`.

## Étape 4 — Audit titre auteur initial

- Présomption `L.111-1` (qualité d'auteur naît du seul fait de la création).
- Originalité — empreinte de la personnalité.
- Date de création — preuves disponibles.
- Statut salarié : pas de cession automatique en droit français hors
  `L.113-9` logiciel.

## Étape 5 — Chaîne de titularité historique

- Auteur initial → cédants successifs → cédant actuel.
- Employeur `L.113-9` si logiciel (présomption au profit de l'employeur).
- Contrats freelance et prestataires : cession écrite expresse requise.
- Contributeurs externes : coauteurs `L.113-2`, contributions à œuvre
  audiovisuelle `L.113-7`.

## Étape 6 — Rédaction clause `L.131-3` conforme

Chaque droit cédé doit être mentionné distinctement, avec :

- droits cédés (reproduction, représentation, adaptation, traduction,
  merchandising, etc.) ;
- modes d'exploitation (édition papier, numérique, streaming, podcast,
  audiovisuel, merchandising) ;
- étendue (exclusif / non-exclusif, supports connus / inconnus à la date du
  contrat) ;
- territoire (FR / UE / monde / autre, délimitation précise) ;
  durée (jusqu'à 70 ans post mortem auctoris pour cession totale,
  délimitée pour cession partielle).

L'omission d'une mention obligatoire est sanctionnée par la nullité du
transfert sur le périmètre concerné.

## Étape 7 — Rémunération `L.131-4`

- Principe : rémunération proportionnelle aux recettes provenant de la
  vente ou de l'exploitation.
- Exceptions (al. 2) : base de calcul impraticable, contribution non
  individualisable, utilisation accessoire, nature ou conditions
  d'exploitation rendant impossible l'application de la règle
  proportionnelle, cession par l'auteur d'un logiciel.
- Modalités : assiette, taux, périodicité de reddition de comptes, droit
  d'audit.

## Étape 8 — Droit moral `L.121-1` et suivants

- Inaliénable, imprescriptible, perpétuel, attaché à la personne de
  l'auteur.
- À articuler avec la cession patrimoniale : la cession des droits
  patrimoniaux ne transfère pas le droit moral.
- Mention obligatoire dans le contrat : le respect du droit au nom, à la
  qualité et à l'œuvre est préservé.

## Étape 9 — Findings cotés 🔴🟠🟡🟢

Voir section `Niveaux de criticité`. Plancher cross-skill : pas de
dégradation silencieuse d'une cote 🔴 amont.

## Étape 10 — Post-flight `verifier-citations`

Vérifier `L.131-3`, `L.131-4`, `L.111-1`, `L.121-1`, `L.131-1` et le cas
échéant `L.113-9` (logiciel), `L.113-7` (audiovisuelle), `L.113-2`
(collaboration / collective). Tout article non récupéré reste
`[à vérifier]`.

## Étape 11 — Sortie 9 blocs + note du relecteur + arbre 5 options

Voir section `Sortie V2 stabilisée en 9 blocs` ci-dessous.

## Résumé exécutif

{Trois phrases partner-ready : bottom-line, risque dominant, prochaine
action.}

## Une question hors de ma checklist habituelle

{Observation transversale, ou omission si rien d'honnête à dire.}

## Que veux-tu faire ? Choisis une option :

1. **Rédiger** — je prépare un projet de clause `L.131-3` + `L.131-4` ou un
   brouillon complet selon mode.
2. **Escalader** — je rédige une note vers {approbateur cession droits
   configuré}.
3. **Compléter les faits** — je liste les questions à poser au cédant, au
   cessionnaire ou au coauteur.
4. **Surveiller et attendre** — j'ajoute le sujet au tracker du dossier avec
   date de revisite.
5. **Autre** — précise.

[Ce skill a traité {N} mentions identifiantes. Pour anonymiser
automatiquement avant envoi à Claude, installer hacienda-ghost.](https://hacienda.diy/ghost)
```

---

## Sortie V2 stabilisée en 9 blocs

La sortie doit toujours utiliser exactement ces 9 blocs et aucun autre titre
de bloc de haut niveau :

1. `Synthèse du dossier`
2. `Seuil de préparation de cession`
3. `Work And Title Preconditions`
4. `Branche de transfert choisie`
5. `Rights Scope And Exploitation Structure`
6. `Economic Structure`
7. `Title-Chain Cleanup Or Blocking Points`
8. `Routage de décision`
9. `Validation humaine`

### Attendus par bloc

- `Synthèse du dossier` : résumé fermé des faits, du contexte, de la branche
  pressentie et du niveau de certitude.
- `Seuil de préparation de cession` : statut `ready`, `partial` ou
  `blocked`, justifié.
- `Work And Title Preconditions` : qualification, titularité, auteurs,
  chaîne de droits, contexte.
- `Branche de transfert choisie` : branche retenue et raison.
- `Rights Scope And Exploitation Structure` : droits, domaines, territoire,
  durée, usages, exclusions.
- `Economic Structure` : logique rémunération, proportionnel ou forfait
  justifié, risques.
- `Title-Chain Cleanup Or Blocking Points` : rupture, manque,
  régularisation ou blocage.
- `Routage de décision` : une seule issue fermée.
- `Validation humaine` : validation humaine requise avant toute suite.

Les brouillons `partial` conservent partout où nécessaire les marqueurs
`[PROVISOIRE]`, `[à vérifier]` et `[À COMPLÉTER]`.

---

## Branche bornée `title-chain-cleanup`

Cette branche sert uniquement à régulariser ou bloquer. Elle couvre :

- coauteurs non sécurisés ;
- signatures manquantes ;
- prestation commandée sans cession valable ;
- salarié hors logiciel mal compris ;
- personne morale sans base de titularité ;
- œuvre collective revendiquée sans base suffisante ;
- cession antérieure non documentée ;
- ayants droit non identifiés.

Elle ne devient pas un audit général du portefeuille. Elle ne remplace pas
le skill `contrats-pi`, ni `qualification-oeuvre`, ni `licence-droit-auteur`.

---

## Routage de décision fermé

Le skill doit terminer par une seule route principale parmi :

- `prepare-full-assignment-draft`
- `prepare-partial-assignment-draft`
- `prepare-exclusive-assignment-draft`
- `prepare-non-exclusive-assignment-draft`
- `route-to-work-qualification`
- `route-to-license-instead`
- `route-to-title-chain-cleanup`
- `route-to-software-regime-review`
- `route-to-broader-pi-contract`
- `hold-insufficient-basis`

Ne pas inventer de sémantique de routage supplémentaire.

---

## Niveaux de criticité

Échelle canonique appliquée à toute appréciation subjective de ce skill :

| Niveau | Icône | Signification dans le contexte de ce skill |
|---|---|---|
| Faible | 🟢 | Cession conforme `L.131-3` (durée, territoire, médias, étendue mentionnés), rémunération proportionnelle calibrée `L.131-4`, chaîne de titularité propre et documentée. |
| Moyen | 🟡 | Chaîne de titularité comporte un maillon à documenter mais traçable ; mentions `L.131-3` présentes mais à préciser ponctuellement. |
| Élevé | 🟠 | Clauses ambiguës sur territoire ou modes d'exploitation à compléter ; structure économique discutable sans non-conformité manifeste ; titularité fragile mais défendable. |
| Bloquant | 🔴 | Cession sans mention obligatoire `L.131-3` (nullité encourue), ou portant sur œuvre future indéterminée (`L.131-1`), ou rémunération forfaitaire injustifiée au regard de `L.131-4` al.2. |

Plancher cross-skill (CLAUDE.md §4) : ce skill ne peut pas dégrader
silencieusement une cote 🔴 amont sans déclaration explicite.

---

## Mode silencieux pour livrables externes

Pour la version destinée au cocontractant (non couvert par le secret
professionnel) :

- En-tête de confidentialité : RETIRER (ou remplacer par mention neutre de
  brouillon contractuel).
- Note du relecteur : RETIRER (mémo interne uniquement).
- Tags `[review]`, `[à vérifier]`, `[connaissance modèle — à vérifier]` :
  RETIRER ou consolider en note finale unique.
- Narration de skill (« j'utilise le skill X… ») : COUPER.
- Renvois inter-skills (`/h-pi:...`) : COUPER et placer dans un message
  séparé au sponsor interne.
- Clauses `L.131-3` et `L.131-4` : CONSERVER propres, prêtes à signer une
  fois validées par avocat.
- Mention `L.121-1` droit moral : CONSERVER.

Le livrable externe doit se lire comme un projet de contrat rédigé par un
associé. Le méta-commentaire va dans un mémo interne séparé.

---

## Ton

Ton d'avocat PI sénior orienté édition / audiovisuel / mode / SaaS selon le
profil cabinet. Technique, direct, précis sur les mentions `L.131-3` et
sur l'arbitrage `L.131-4`. Rappeler systématiquement que le droit moral
`L.121-1` est inaliénable. Distinguer faits, droit, analyse, risques,
décision et validation humaine. Assumer un brouillon structuré, jamais un
contrat final valide. Ne pas fabriquer de findings de remplissage.

---

## Ce skill ne fait pas

- Signer la cession ni la valider définitivement.
- Remplacer l'avocat PI inscrit au barreau pour la validation finale.
- Faire la qualification d'œuvre : utiliser `qualification-oeuvre` en amont
  si statut auteur, originalité ou titularité initiale litigieux.
- Couvrir le droit moral `L.121-1` en détail (mention obligatoire seulement,
  pas d'analyse de violation ou de mise en œuvre).
- Faire la licence : utiliser `licence-droit-auteur` si un transfert de
  titularité n'est pas nécessaire.
- Traiter le régime logiciel `L.113-9` : renvoyer vers
  `revue-logiciel-donnees`.
- Valoriser financièrement la cession (pas de valorisation d'actif, pas de
  modèle de revenu prévisionnel).
- Piloter un portefeuille de droits d'auteur ou un catalogue éditorial.
- Faire un audit fiscal de la cession (régime BNC, TVA, retenue à la
  source).

---

## Validation humaine

La validation humaine est obligatoire à la fin de chaque sortie. Tout
brouillon produit par ce skill est soumis à validation par un avocat PI
inscrit au barreau avant signature ou usage externe.
