---
name: contentieux-pi
description: >
  Playbook judiciaire PI V2 pour cadrer une attaque, une défense ou un appel
  devant les juridictions compétentes (TJ Paris brevets/MUE/DMC, CA Paris pôle 5),
  du pré-dépôt à l'appel. Produit un mémo de décision partner-ready, signale les
  paris (probabilités), chiffre l'exposition pour go/no-go sponsor business.
  Ne rédige pas les actes de procédure. Brouillon soumis à validation avocat
  contentieux PI.
version: "2.0.0"
argument-hint: "[attack|défense|appeal|urgent] [--recevabilite-only|--budget-only|--strategie-only] [faits | pièces | titre | juridiction | calendrier]"
authors: ["Hacienda"]
tags: [contentieux, PI, judiciaire, contrefacon, nullite, appel, TJ-Paris, CA-Paris, refere, mesures-provisoires]
---

# Skill — Contentieux PI V2

> **BROUILLON, VALIDATION AVOCAT CONTENTIEUX PI OBLIGATOIRE.**
>
> Ce skill cadre une stratégie judiciaire PI déjà orientée contentieux. Il
> produit un mémo de décision (recevabilité, moyens, défenses, mesures
> provisoires, budget, exposition) et un arbre de décision 5 options. Il ne
> rédige PAS l'assignation, les conclusions, la requête en saisie ou la
> déclaration d'appel. Il ne se substitue PAS à l'avocat plaidant. Validation
> avocat OBLIGATOIRE avant toute saisine, choix de forum, demande de mesure
> provisoire, transaction engageante ou décision d'appel.
>
> **Frontière avec les autres skills PI.**
> - `mise-en-demeure-pi` : pré-contentieux amiable (lettres, réponses).
> - `tri-contrefacon` : pré-qualification des signaux faibles (scoring,
>   priorisation enforcement).
> - `saisie-contrefacon` : requête ex parte et préparation huissier.
> - `strategie-defense-pi` : posture défensive amont quand le contentieux
>   n'est qu'une hypothèse parmi d'autres.
> - `tableau-contrefacon-brevet` : matrice d'atteinte revendication par
>   revendication.
> - `depot-preuve-creation` : structuration probatoire d'antériorité.
>
> `contentieux-pi` est le point d'entrée judiciaire **uniquement** : pas
> amiable, pas exploratoire, pas pré-qualification.

---

## Examples

<example>
<user>/h-pi:contentieux-pi attack ./constat-huissier.pdf ./marque-FR-12345.pdf ./brevet-EP-9876.pdf --forum=TJ-Paris --prix-licence=500000</user>
<response>
Mode `attack` côté titulaire. Cumul marque FR + brevet EP, atteinte caractérisée par PV de constat huissier et captures plateforme contrefaisante.
1. Pré-flight `check-pii` sur PV constat + captures.
2. Lecture profil cabinet — bloc Contentieux PI (TJ Paris pôle 5, posture agressive, budget 50-200k€, mode judiciaire préféré).
3. Qualification : `attack`, cumul `brevet-infringement` + `marque-infringement`, stade `pre-filing`.
4. Recevabilité : compétence TJ Paris exclusive brevets `L.615-17 CPI` `[stable — vérifié le 2026-06-01]` et MUE `art. 123 RMUE` `[stable — vérifié le 2026-06-01]` ; qualité du titulaire vérifiée registre INPI + EUIPO ; prescription `L.615-8 CPI` (5 ans brevets) et `L.716-5 CPI` (5 ans marques) — non écoulées.
5. Calendrier : assignation puis mise en état ~12-18 mois ; référé `L.615-3 CPI` envisageable si urgence démontrable.
6. Moyens : reproduction revendications 1, 3 et 7 du brevet ; reproduction servile de la marque ; cumul avec parasitisme `[review]`.
7. Mesures provisoires : référé interdiction `L.615-3` + référé marque `L.716-4-6` (probable selon constat — 🟡 pari assumé).
8. Préjudice indicatif : masse contrefaisante × marge + redevance forcée 500k€ (prix licence) — fourchette 800k-1,5M€ `[connaissance modèle — à vérifier expert]`.
9. Budget contentieux : 80-150k€ frais avocat, expertise possible 20-40k€, durée 18-24 mois fond ; transaction alternative chiffrée.
10. Findings cotés : disclosure adverse manquant 🟠 ; risque nullité reconventionnelle du brevet 🟠 ; forum compétent 🟢.
11. Post-flight `verifier-citations` sur articles cités.
12. Sortie partner-ready + note relecteur + arbre 5 options.
</response>
</example>

<example>
<user>/h-pi:contentieux-pi défense ./assignation-TJ-Paris.pdf ./brevet-attaque-EP-7777.pdf --recevabilite-only</user>
<response>
Mode `défense` avec mode court `--recevabilite-only`. Attaqué en contrefaçon brevet pharma. Focus gate recevabilité avant développement du fond.
1. Pré-flight `check-pii` sur assignation et brevet attaqué.
2. Lecture profil — posture défensive : transaction privilégiée selon profil cabinet.
3. Recevabilité de l'attaque adverse : compétence TJ Paris confirmée `L.615-17 CPI` ; qualité à agir du demandeur — chaîne de titularité à vérifier `[à vérifier registre INPI]` ; prescription `L.615-8 CPI` — point de départ glissant, à confronter au premier acte allégué.
4. Stratégie de défense par nullité reconventionnelle : antériorité publication X 🟠 ; insuffisance de description revendication 1 🟡 ; absence d'activité inventive `[review]`.
5. FTO documentée : produit défendeur antérieur à la priorité du brevet — 🟢 si confirmé.
6. PAS de développement du fond ni du quantum (mode `--recevabilite-only`).
7. Sortie : verdict recevabilité (recevable / contestable / bloquant) + 3 axes de défense + recommandation expertise technique avant conclusions au fond.
</response>
</example>

<example>
<user>/h-pi:contentieux-pi appeal ./jugement-TJ-Paris-3eme-ch.pdf --strategie-only --delai-appel=2026-07-15</user>
<response>
Mode `appeal` avec mode court `--strategie-only`. CA Paris pôle 5 chambre 1 ou 2. Mémoire d'appelant après jugement TJ Paris.
1. Pré-flight `check-pii` sur jugement et pièces annexes.
2. Lecture profil — posture appel : seuil go/no-go à vérifier vs profil cabinet.
3. Délai d'appel : 1 mois à compter de la signification `art. 538 CPC` `[stable — vérifié le 2026-06-01]` ; fenêtre fermée le 2026-07-15 🟠.
4. Périmètre dévolutif : appel total / partiel à arbitrer ; chefs critiques identifiés (rejet contrefaçon revendication 3, déchéance partielle marque, refus mesures provisoires).
5. Moyens d'appel priorisés :
   - Moyen 1 (fort) : interprétation erronée revendication 3 — 🟢 jurisprudence CA Paris constante.
   - Moyen 2 (moyen) : caractère distinctif de la marque mal apprécié 🟠 pari assumé.
   - Moyen 3 (faible) : quantum du préjudice — risque d'aggravation côté défendeur 🔴 `[review]`.
6. PAS de calendrier procédural détaillé ni de budget (mode `--strategie-only`).
7. Effet dévolutif et risque d'incident d'exécution provisoire à signaler.
8. Sortie : architecture mémoire appelant + chefs contestés + 3 moyens hiérarchisés + question hors checklist.
</response>
</example>

<example>
<user>/h-pi:contentieux-pi urgent ./captures-marketplace.pdf ./marque-EUTM-555.pdf --budget-only --prejudice-mensuel=80000</user>
<response>
Mode `urgent` avec mode court `--budget-only`. Contrefaçon en ligne (marketplace), préjudice mensuel allégué 80k€, décision sponsor business attendue sous 48h.
1. Pré-flight `check-pii` sur captures et factures internes.
2. Lecture profil — seuil go/no-go contentieux du profil cabinet (par défaut 25/40 si non configuré).
3. Cadrage urgence : marketplace activement vendeur, préjudice s'aggrave ; référé EUTM `art. 130 RMUE` ou `L.716-4-6 CPI` envisageable.
4. Chiffrage budget pour go/no-go :
   - Frais avocat référé : 15-25k€.
   - Frais avocat fond : 60-100k€.
   - Saisie-contrefaçon huissier : 3-8k€ + expertise éventuelle 15-30k€.
   - Durée référé : 6-12 semaines ; fond 18-24 mois.
   - Plage indemnités estimée : 200k-600k€ (préjudice mensuel × durée + redevance forcée) `[connaissance modèle — à vérifier expert]`.
   - Risque condamnation `art. 700 CPC` adverse si rejet : 10-25k€ référé.
5. Seuil go/no-go : score ~30/40 estimé (preuves solides, forum compétent, posture cabinet agressive, ROI > 3x si gain).
6. Chemin transaction alternatif : notice-and-takedown plateforme + lettre transactionnelle 50-100k€ — délai 2-4 semaines, ROI immédiat mais sans précédent dissuasif.
7. PAS de stratégie procédurale détaillée ni de moyens (mode `--budget-only`).
8. Sortie : recommandation go/no-go chiffrée + arbre 5 options + escalade sponsor business.
</response>
</example>

---

## Chargement du profil

> Lire `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`, bloc Contentieux PI :
> - **Tribunal habituel** — TJ Paris 3e chambre par défaut (compétence exclusive brevets L.615-17, MUE art. 123 RMUE, DMC art. 80 RDMC).
> - **Avocat contentieux PI** — nom / cabinet / spécialité.
> - **Huissier/commissaire de justice PI** — pour saisie-contrefaçon.
> - **Expert technique brevets** — liste experts TJ Paris.
> - **Posture contentieuse** — agressive / mesurée / défensive.
> - **Budget contentieux annuel** — pour calibrer go/no-go.
> - **Seuil go/no-go** — score matrice minimum pour engager une action.
> - **Mode de résolution préféré** — judiciaire / médiation CMAP / arbitrage CCI / transaction.
> - **Politique PII** — `passive` / `active` / `strict` + seuil B.

Lire également `~/.claude/plugins/config/hacienda-juridique/company-profile.md` pour le profil cabinet général.

Si le profil n'est pas encore peuplé (`[A CONFIGURER]` présent), stopper et
demander `/h-pi:entretien-demarrage` avant toute analyse contentieuse
substantielle. Conserver les marqueurs `[à vérifier]` visibles tant que le
profil est incomplet.

---

## Intake

1. **Mode** — `attack` | `défense` | `appeal` | `urgent` (**obligatoire**).
2. **Fichiers dossier** — PV constat, captures contrefaçon, contrats opposés, assignation, jugement (selon mode).
3. **Titre invoqué ou attaqué** — numéro INPI / EUIPO / OEB ; territoire ; statut.
4. **Parties** — qualité à agir, rôles procéduraux, avocat ou conseil déjà saisi.
5. **Forum envisagé ou saisi** — TJ Paris par défaut brevets/MUE/DMC ; vérifier compétence exclusive.
6. **Calendrier** — assignation, audience, mise en état, fenêtre d'appel, urgence alléguée.
7. **Findings DD ou audit** — si disponibles, confronter aux protections contentieuses attendues.
8. **Mode court** — `--recevabilite-only` | `--budget-only` | `--strategie-only` selon besoin.

Si `mode`, `track` (branche contentieuse) ou `stade procédural` manque, la sortie doit se limiter à un cadrage prudent et bloquer toute recommandation trop affirmative. Si `forum`, `stade` ou `statut des preuves` est flou ou contradictoire, indiquer explicitement une confiance réduite.

---

## Pré-flight `check-pii`

Avant toute analyse substantielle sur des pièces client : invoquer
`/h-pi:check-pii` sur le corpus fourni (PV constat huissier, captures
contrefaçon, contrats opposés, assignation, jugement, pièces adverses). Si le
résultat déclenche le prompt cas B (seuil B atteint ou catégorie sensible PI
détectée — IBAN ayant droits, NIR créateur, montants cession > 10k€, brevets
pré-publication R.612-39 CPI, inventeurs non publiés, secrets d'affaires),
attendre la décision utilisateur (anonymiser via `hacienda-ghost`, ignorer, ou
stopper) avant de poursuivre.

Si l'utilisateur choisit « ignorer », apposer un caveat
`[PII non traitée — décision utilisateur]` dans la note du relecteur.

---

## Gate non-juriste

Si l'utilisateur n'est pas avocat ou mandataire habilité, produire une
explication opérationnelle, signaler les limites, refuser toute conclusion
présentée comme avis juridique final et demander validation par un avocat
contentieux PI inscrit au barreau avant tout usage externe ou tout acte
procédural.

Check-list :
- [ ] Mode fourni (`attack` / `défense` / `appeal` / `urgent`).
- [ ] `check-pii` exécuté sur pièces dossier.
- [ ] Profil Contentieux PI lu.
- [ ] Forum identifié et compétence vérifiée.
- [ ] Prescription contrôlée.
- [ ] Renvois `tri-contrefacon` / `mise-en-demeure-pi` / `saisie-contrefacon` / `strategie-defense-pi` / `tableau-contrefacon-brevet` faits quand pertinents.
- [ ] Findings cotés par sévérité (🔴🟠🟡🟢).
- [ ] Sortie contient note relecteur + arbre 5 options + footer PII.

---

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Propriété Intellectuelle` est disponible. Ne pas inventer de tool hors périmètre ; si une source ou un registre n'a pas été consulté directement, garder `[à vérifier]`.

- Socle textes, jurisprudence et droit UE : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Marques, BOPI et EUIPO : `inpi_search_marques`, `inpi_marque_details`, `inpi_marques_publications_recentes`, `euipo_tmview_search`, `bopi_dernieres_publications`.
- Brevets et Espacenet : `inpi_search_brevets`, `inpi_brevet_details`, `espacenet_search`, `espacenet_brevet_details`.
- Anno, quand disponible, reste une source interne de dossier : jamais un registre officiel INPI, EUIPO, OEB, OMPI ou BOPI.

---

## Niveaux de criticité

Échelle canonique appliquée à toute appréciation subjective de ce skill :

| Niveau | Icône | Signification dans le contexte de ce skill |
|---|---|---|
| Faible | 🟢 | Action solide : titres valides, preuves convergentes, forum compétent, calendrier maîtrisé. |
| Moyen | 🟡 | Stratégie à arbitrer (référé vs fond, urgence vs profondeur, attaque vs transaction). |
| Élevé | 🟠 | Recevabilité défendable mais titre attaquable en nullité reconventionnelle ou preuve fragile. |
| Bloquant | 🔴 | Action engagée avec moyen prescrit, forum incompétent (TJ Paris compétence exclusive brevets L.615-17, MUE art. 123 RMUE, DMC art. 80 RDMC) ou pièces inopposables. |

Plancher cross-skill (CLAUDE.md §4) : ce skill ne peut pas dégrader silencieusement une cote 🔴 amont sans déclaration explicite. Une cote 🔴 reçue d'un skill amont (`tri-contrefacon`, `tableau-contrefacon-brevet`, `strategie-defense-pi`) reste 🔴 sauf rétrogradation justifiée et tracée.

---

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/` ou `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`.

---

## Sortie

### Format livrable

```
[En-tête de confidentialité selon le rôle utilisateur — voir CLAUDE.md §2]

> **⚠️ Note du relecteur**
> - **Sources :** Légifrance ✓ / Judilibre ✓ / INPI Data ✓ / EUIPO TMview ✓ / Espacenet ✓ / Eurlex ✓ (cocher ✗ si non connectée)
> - **Lecture :** intégrale ({N} pages dossier + {M} pièces) | partielle (pages X à Y)
> - **Signalé pour ton jugement :** {N} éléments marqués [review] | aucun
> - **Fraîcheur :** recherche jurisprudence CA Paris pôle 5 + CJUE post-{date} — {N} décisions intégrées | rien trouvé
> - **Avant de t'appuyer dessus :** {action concrète : saisir / défendre / appeler / transiger / compléter / escalader}

# Contentieux PI — {dossier} — {mode}

## Étape 1 — Pré-flight `check-pii`

1. Invoquer `check-pii` sur PV constat, captures contrefaçon, contrats opposés, assignation, jugement.
2. Si seuil B ou catégorie sensible PI atteinte : attendre décision utilisateur.
3. Caveat `[PII non traitée]` dans note relecteur si « ignorer ».

---

## Étape 2 — Lecture profil cabinet (bloc Contentieux PI)

- Tribunal habituel, avocat contentieux PI, huissier PI, expert technique.
- Posture contentieuse (agressive / mesurée / défensive).
- Budget contentieux annuel et seuil go/no-go.
- Mode de résolution préféré (judiciaire / médiation / arbitrage / transaction).

---

## Étape 3 — Qualification du mode

- Mode : `attack` / `défense` / `appeal` / `urgent`.
- Branche contentieuse : `brevet-infringement` / `marque-infringement` / `dm-infringement` / `copyright-infringement` / `nullity-revocation` / `unfair-competition` / `appeal`.
- Stade procédural : `pre-filing` / `urgent-relief` / `on-the-merits` / `pending-case` / `appeal-window` / `appeal-ongoing`.

---

## Étape 4 — Recevabilité (gate)

- **Compétence** :
  - Brevets : TJ Paris compétence exclusive `L.615-17 CPI`.
  - MUE (marque de l'Union européenne) : `art. 123 RMUE` — tribunaux des marques de l'UE.
  - DMC (dessin ou modèle communautaire) : `art. 80 RDMC`.
  - Marques nationales FR : TJ compétent territorialement (TJ Paris en pratique pour beaucoup d'enjeux).
  - Droit d'auteur : TJ compétent (`L.331-1 CPI`).
- **Intérêt à agir** : qualité de titulaire vérifiée registre INPI / EUIPO / OEB ; chaîne de titularité documentée ; licence exclusive donnant qualité ou non.
- **Prescription** :
  - Marques : `L.716-5 CPI` — 5 ans à compter de chaque acte.
  - Brevets : `L.615-8 CPI` — 5 ans à compter de chaque acte.
  - Dessins et modèles : `L.521-3 CPI` — 5 ans.
  - Droit d'auteur : prescription civile de droit commun (5 ans `art. 2224 C.civ`).

Une action engagée avec moyen prescrit, forum incompétent ou pièces inopposables est cotée 🔴 bloquant.

---

## Étape 5 — Calendrier procédural et délais critiques

- Signification de l'assignation (`art. 656 CPC`).
- Constitution d'avocat adverse, échange de conclusions, mise en état.
- Délais d'incident, communication des pièces (`art. 132 CPC`).
- Audience de plaidoirie, délibéré, signification du jugement.
- Délai d'appel : 1 mois à compter de la signification (`art. 538 CPC`) — fenêtre à protéger absolument.
- Référé : audience sous quelques semaines, décision sous 1-2 semaines généralement.

---

## Étape 6 — Moyens (au fond) et défenses

**Côté attaquant :**
- Reproduction des revendications (brevet) — atteinte littérale ou par équivalence.
- Usage à titre de marque, risque de confusion, atteinte à la marque renommée.
- Impression visuelle d'ensemble (dessins et modèles).
- Originalité et matérialité de la reprise (droit d'auteur).
- Cumul avec concurrence déloyale / parasitisme (filet subsidiaire).

**Côté défenseur :**
- Nullité reconventionnelle du titre (antériorité, défaut de nouveauté, défaut d'activité inventive, défaut de distinctivité, déchéance pour non-usage).
- Prescription d'une partie ou totalité des actes allégués.
- Épuisement des droits, usage descriptif, usage référentiel.
- Prior user (`art. L.613-7 CPI` brevets).
- FTO documentée (liberté d'exploitation antérieure).

---

## Étape 7 — Mesures provisoires

- **Brevet** : référé interdiction `L.615-3 CPI` (probabilité de contrefaçon + urgence).
- **Marque** : référé `L.716-4-6 CPI` + MUE `art. 131 RMUE`.
- **Dessins et modèles** : référé `L.521-4 CPI`.
- **Droit d'auteur** : référé `L.332-1 CPI` (saisie-contrefaçon de droit d'auteur).
- **Saisie-contrefaçon** : requête ex parte au Président du TJ — renvoyer `saisie-contrefacon` pour la préparation.

Chaque mesure provisoire demande : titre vraisemblablement valable, atteinte vraisemblablement caractérisée, urgence et proportionnalité.

---

## Étape 8 — Calcul indicatif des chefs de préjudice

`L.615-7 CPI` (brevets), `L.716-4-10 CPI` (marques), `L.521-7 CPI` (dessins et modèles), `L.331-1-3 CPI` (droit d'auteur) — méthodes alternatives :

- **Manque à gagner** : ventes perdues × marge unitaire.
- **Masse contrefaisante** : volumes contrefaisants × marge.
- **Prix d'une licence forcée** : redevance qui aurait été perçue.
- **Bénéfices réalisés par le contrefacteur** : récupération des profits indus.
- **Préjudice moral** : atteinte à la marque, à l'image, à la créativité.

Le chiffrage final relève de l'expert ; le skill produit une fourchette indicative `[connaissance modèle — à vérifier expert]`.

---

## Étape 9 — Budget contentieux et seuil go/no-go

Confronter au profil cabinet :

| Poste | Fourchette |
|---|---|
| Frais avocat fond | 60-200k€ selon complexité et durée |
| Frais avocat référé | 15-30k€ |
| Saisie-contrefaçon (huissier) | 3-10k€ |
| Expertise technique | 15-50k€ |
| Frais d'enregistrement et signification | 1-3k€ |
| Risque `art. 700 CPC` adverse si rejet | 10-50k€ |

Calcul go/no-go vs seuil profil cabinet (par défaut 25/40) : score sur preuves, forum, posture, ROI estimé, sponsor business.

**Chemin transaction alternatif** : toujours chiffrer et comparer (lettre transactionnelle, médiation CMAP, arbitrage CCI selon profil).

---

## Étape 10 — Findings cotés par sévérité

Tableau récapitulatif :

| # | Sujet | Sévérité | Pourquoi ça compte | Action |
|---|---|---|---|---|
| 1 | ... | 🔴/🟠/🟡/🟢 | ... | ... |

Plancher cross-skill respecté : aucune dégradation silencieuse d'une cote amont.

---

## Étape 11 — Post-flight `verifier-citations`

Vérifier les citations d'articles CPI, CPC, RMUE, RDMC et arrêts (Cour de cassation, CA Paris pôle 5, CJUE, Tribunal UE). Les points non vérifiés restent `[à vérifier]`. Les sources non consultées directement restent `[à vérifier]` ou `[connaissance modèle — à vérifier]`.

---

## Étape 12 — Sortie partner-ready

### Résumé exécutif

{Trois phrases partner-ready : bottom-line, pari dominant (avec probabilité explicite), prochaine action.}

### Deal facts contentieux

| Champ | Lecture |
|---|---|
| Mode | attack / défense / appeal / urgent |
| Branche | brevet / marque / D&M / droit d'auteur / nullité / concurrence déloyale / appel |
| Stade procédural | pre-filing / urgent-relief / on-the-merits / pending-case / appeal-window / appeal-ongoing |
| Forum | TJ Paris 3e ch. / CA Paris pôle 5 / autre |
| Titre invoqué | numéro INPI / EUIPO / OEB |
| Parties | demandeur / défendeur / qualité à agir |
| Urgence | oui / non — motif |
| Calendrier critique | prochaine échéance et délai |

### Red flags

| # | Sujet | Sévérité | Pourquoi ça compte | Action |
|---|---|---|---|---|

### Analyse par axes

1. Recevabilité (compétence / qualité / prescription)
2. Calendrier procédural
3. Moyens et défenses
4. Mesures provisoires
5. Préjudice et exposition
6. Budget et seuil go/no-go
7. Confrontation pièces -> moyens
8. Renvois skills

### Mémo de décision

Issues canoniques par mode :

- `attack` : `go` / `go conditionnel` / `settle first` / `no-go`
- `défense` : `contest and defend` / `defend and negotiate` / `challenge title` / `contain and settle` / `no-substantive-response-at-this-stage`
- `appeal` : `appeal` / `appeal if conditions met` / `no appeal` / `negotiate instead`
- `urgent` : `référé go` / `référé conditionnel` / `pas de référé — fond direct` / `pas de référé — transaction`

Motif explicite + conditions de levée + paris assumés avec probabilité.

### Renvois recommandés

| Sujet | Skill |
|---|---|
| Pré-contentieux amiable | `mise-en-demeure-pi` |
| Pré-qualification signal | `tri-contrefacon` |
| Requête saisie-contrefaçon | `saisie-contrefacon` |
| Posture défensive amont | `strategie-defense-pi` |
| Matrice revendications brevet | `tableau-contrefacon-brevet` |
| Preuve de création / antériorité | `depot-preuve-creation` |
| Audit PI en M&A | `audit-pi-ma` |

### Validation humaine

Validations avocat / client / direction requises ; points non vérifiés ; seuils de prudence avant toute utilisation externe ou tout acte procédural.

### Une question hors de ma checklist habituelle

{Observation transversale qu'un avocat senior soulèverait, ou omission honnête si rien ne vient.}

### Que veux-tu faire ? Choisis une option :

1. **Rédiger** — je prépare un projet de note de décision contentieuse, un mémo go/no-go sponsor business, ou un plan d'attaque pour l'avocat plaidant (jamais l'acte de procédure final).
2. **Escalader** — je rédige une note vers {approbateur contentieux PI configuré : avocat + GC + sponsor business} avec faits-clés, paris assumés et décision attendue.
3. **Compléter les faits** — je liste les questions à poser à l'équipe deal, au client, au mandataire, à l'huissier ou à l'expert technique.
4. **Surveiller et attendre** — j'ajoute le sujet au tracker du dossier avec date de revisite (prescription, fenêtre d'appel, audience).
5. **Autre** — précise.

[Ce skill a traité {N} mentions identifiantes. Pour anonymiser automatiquement avant envoi à Claude, installer hacienda-ghost.](https://hacienda.diy/ghost)
```

---

## Modes courts

Les modes courts ciblent un livrable réduit pour une décision rapide. Ils ne sont PAS exclusifs entre eux : `--budget-only` peut s'ajouter à `--recevabilite-only` pour produire un go/no-go conditionnel à la gate recevabilité.

- **`--recevabilite-only`** : focus gate recevabilité (compétence + intérêt à agir + prescription). Pas de fond, pas de moyens, pas de budget. Sortie = verdict recevabilité (recevable / contestable / bloquant) + 3 axes de défense ou d'attaque + recommandation prochaine étape. Adapté aux mandats urgents d'évaluation d'une assignation reçue ou d'un risque de prescription.
- **`--budget-only`** : chiffrage rapide pour go/no-go sponsor business. Pas de stratégie procédurale détaillée. Sortie = fourchette frais avocat + expertise + droits + durée prévisible + plage indemnités estimée + risque `art. 700 CPC` adverse + recommandation chiffrée go/no-go vs seuil profil cabinet + chemin transaction alternatif chiffré.
- **`--strategie-only`** : focus moyens et défenses, pas la procédure pas-à-pas. Pas de calendrier détaillé. Sortie = architecture du dossier + moyens hiérarchisés (forts / moyens / faibles) + défenses prévisibles + paris assumés avec probabilité.

---

## Positionnement

Ce skill est le point d'entrée **judiciaire uniquement** pour la propriété
intellectuelle. Il sert à cadrer une stratégie d'attaque, de défense ou d'appel
déjà orientée vers une trajectoire contentieuse, à mesurer la recevabilité, à
ordonner les demandes et défenses, à chiffrer l'exposition et à préparer un
mémo de décision pour revue humaine.

Aide-mémo de synthèse :
`references/contentieux-pi-tracks-and-routing.md`. En cas d'écart, seul ce
`SKILL.md` fait foi.

Validation avocat obligatoire avant toute saisine, toute position externe, tout
choix de forum, toute demande provisoire, toute transaction engageante et toute
décision d'appel.

---

## Déclencheur de périmètre

Utiliser `contentieux-pi` quand au moins une de ces conditions est vraie :

- assignation déjà reçue ou préparée ;
- référé envisagé ou déjà lancé ;
- procédure au fond déjà décidée ou quasi décidée ;
- recours contre décision déjà dans la fenêtre procédurale ;
- besoin d'un pilotage judiciaire, budgétaire et calendaire d'affaire ;
- besoin d'un mémo go/no-go contentieux pour sponsor business.

Ne pas utiliser ce skill comme voie normale pour :

- une simple mise en demeure ou réponse amiable → `mise-en-demeure-pi` ;
- un cadrage initial de signal faible encore mal qualifié → `tri-contrefacon` ;
- une matrice d'atteinte revendication par revendication → `tableau-contrefacon-brevet` ;
- une collecte de preuve de création ou d'antériorité non rattachée à une stratégie judiciaire immédiate → `depot-preuve-creation` ;
- une médiation ou négociation précontentieuse qui ne demande pas encore de choix procéduraux → `strategie-defense-pi`.

---

## Limites de routage

### Router vers `tri-contrefacon`

Si le dossier est encore au stade du signal, d'une suspicion, d'un besoin de qualification initiale ou d'une priorisation enforcement sans orientation judiciaire suffisamment mature.

### Router vers `mise-en-demeure-pi`

Si la meilleure suite est une lettre, une relecture de lettre, une réponse amiable encadrée, ou une escalade formelle hors saisine.

### Router vers `saisie-contrefacon`

Si le besoin immédiat est la préparation de la requête ex parte au Président du TJ et la coordination huissier / commissaire de justice.

### Router vers `strategie-defense-pi`

Si l'équipe reçoit une allégation, une lettre, une menace de procédure ou un dossier incomplet et doit encore choisir entre réponse, collecte de preuves, contestation de titre ou escalade — sans que la branche judiciaire soit encore tranchée.

### Router vers `tableau-contrefacon-brevet`

Si le besoin est la matrice technique d'atteinte revendication par revendication avant ou pendant le contentieux brevet.

### Router vers `depot-preuve-creation`

Si la faiblesse déterminante est la preuve de création, d'antériorité, de titularité ou la cohérence chronologique des pièces.

### Rester dans `contentieux-pi`

Si le dossier est déjà, ou de façon crédible sur le point d'être, judiciaire ; si les questions dominantes portent sur compétence, recevabilité, demandes, défenses, preuve utilisable en justice, calendrier, budget, exposition ; si la recommandation attendue est une trajectoire contentieuse.

---

## Mode silencieux pour livrables externes

Quand le livrable est destiné à un sponsor business non-juriste ou à une direction métier (mémo go/no-go, note d'escalade, alerte stratégique) :

- **CONSERVER** : en-tête de confidentialité (si destinataire dans périmètre secret), note du relecteur, chiffrage budget, fourchette préjudice, recommandation go/no-go, une question hors checklist, arbre 5 options.
- **SUPPRIMER** : narration procédurale interne (« j'utilise le skill X qui normalement… »), pas-à-pas calendrier procédural détaillé, renvois inter-skills (les sortir en annexe relecteur), méta-commentaire « j'ai lu les fichiers suivants… ».
- **CONSOLIDER** : tags de provenance en note de bas de page.

Le mémo doit se lire comme une note d'associé contentieux PI senior à un sponsor business : bottom-line, paris assumés avec probabilité, chiffrage, recommandation, question, options. Pas de narration de skill.

---

## Ton

Avocat contentieux PI senior, partner-ready. Direct, technique, calibré au mode (attack / défense / appeal / urgent). Toujours rappeler le mode et le stade procédural.

- **Signaler les paris explicitement.** Une probabilité de succès, une compétence ou une recevabilité n'est jamais présentée comme certaine. Formulations attendues : « probable », « pari assumé », « jurisprudence convergente mais minoritaire », « risque assumé que ».
- **Ne pas fabriquer de findings de remplissage.** Mieux vaut un mémo court qu'une liste artificielle de risques mineurs.
- **Prioriser les points qui changent la décision** : saisir / ne pas saisir, défendre au fond / transiger, appel / pas d'appel, référé / pas de référé.
- **Une attaque faible sur la preuve ou la validité ne doit pas être maquillée par un ton plus assertif.**

---

## Doctrine utile à conserver

- Raisonner systématiquement sur : compétence, qualité à agir, validité ou statut du titre, prescription, articulation des demandes principales et subsidiaires, risque reconventionnel.
- En matière PI, toujours mettre en face : le fond, la preuve, le calendrier et le rapport coût / exposition / intérêt business.
- Distinguer les hypothèses judiciaires robustes des pistes spéculatives.
- Préférer une issue conditionnelle (`go conditionnel`, `appeal if conditions met`) à une conclusion tranchée quand le dossier est incomplet.

---

## Règles communes de sortie

Quelle que soit la configuration du dossier, la sortie doit séparer
explicitement :

- `faits établis` (rattachés à une pièce consultée) ;
- `allégations ou hypothèses` (clairement étiquetées) ;
- `pièces consultées` et `pièces manquantes` (avec impact judiciaire) ;
- `risques procéduraux` et `risques business` (même s'ils convergent) ;
- `validation humaine obligatoire` (contrainte opérative, pas note cosmétique).

---

## Error Handling and Guardrails

- Toute source primaire non consultée reste `[à vérifier]`.
- Toute allégation, même vraisemblable, reste une allégation tant qu'elle n'est pas rattachée à une pièce exploitable.
- Si la compétence, la recevabilité, le titre ou la preuve sont trop incertains, la sortie doit abaisser sa confiance et recommander une validation humaine ou un routage complémentaire avant toute position fermée.
- Ne jamais présenter une probabilité de succès, un quantum de préjudice ou un délai comme garanti.

Déclencheurs explicites de limitation :

- forum non identifié ou contesté
- titre ou droit invoqué flou
- pièces probatoires trop faibles
- stade procédural incertain
- business_objective non clarifié
- calendrier ou urgence inconnus alors qu'ils conditionnent le choix

Règle de réponse sûre :

1. expliciter l'hypothèse ;
2. marquer `[à vérifier]` ;
3. réduire les recommandations offensives ou irréversibles ;
4. router en amont si le dossier n'est pas encore réellement contentieux.

---

## Ce skill ne fait pas

- Ne rédige pas l'assignation, les conclusions, la requête en saisie, la déclaration d'appel, le jeu de pièces final ou tout autre acte de procédure.
- Ne se substitue pas à l'avocat plaidant ni à l'avocat postulant.
- Ne fait pas la médiation ni la négociation transactionnelle directe.
- Ne couvre pas le pré-contentieux amiable (lettres, réponses) → `mise-en-demeure-pi`.
- Ne valorise pas définitivement le préjudice : produit une fourchette indicative — le quantum final relève de l'expert.
- Ne traite pas le droit étranger sans cadre adapté : si les faits sont hors FR/UE, signaler et router vers un correspondant local.
- Ne décide pas de transiger : produit le chemin transaction alternatif chiffré et l'arbitrage va au sponsor.
- Ne remplace pas `tri-contrefacon`, `mise-en-demeure-pi`, `saisie-contrefacon`, `tableau-contrefacon-brevet`, `strategie-defense-pi` ou `depot-preuve-creation` quand le vrai besoin reste en amont du judiciaire.

---

## Mode Anno Tabular optionnel

Si la distribution Hacienda + Anno Desktop est active, `contentieux-pi` utilise
Anno pour organiser localement pièces, parties, événements, risques et preuves,
jamais comme source primaire. Appeler `anno_health` avant tout outil Anno ; si
Anno est indisponible, poursuivre en `fallback_hacienda`.

Le dossier doit être limité au `matter_vault` et rattaché à un
`workflow_blueprint` contentieux. Utiliser `legal_extract_case_file`,
`legal_timeline`, `legal_graph_query`, `legal_prescription_check` et
`legal_validate_field`, puis une revue tabulaire avec `tabular_review_create`
pour suivre faits allégués, pièces, dates, droit invoqué, faiblesse probatoire,
prescription et contradictions. Chaque fait doit porter `review_status`,
`decision_status`, responsable, citation et `validation_status`.

Utiliser `grid_to_work_product` seulement pour produire une note contentieux,
une chronologie ou une annexe depuis les cellules validées. Tout extrait Anno
reste une source interne Anno, jamais comme source primaire ; les textes,
jurisprudences et sources officielles restent vérifiés via
`hacienda-sources-officielles`. Les faits non validés restent `[à vérifier]`.
