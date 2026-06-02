---
name: recherche-anteriorite-marque
version: "2.0.0"
description: >
  Premier passage de recherche d'antériorité marque : knockout strict, similitude
  phonétique/visuelle/conceptuelle, appréciation globale CJUE Sabel/Canon/Lloyd,
  détection marques notoires et motifs absolus. Signale les conflits proches et
  les trous de couverture avant revue humaine. Ce skill ne conclut jamais qu'une
  marque est disponible.
argument-hint: "[signe | classes Nice | territoires FR/EU/Madrid] [--knockout | --full | --watchlist]"
authors: ["Hacienda"]
tags: [marques, anteriorite, clearance, INPI-Data, EUIPO-TMview, Madrid-Monitor, CJUE-Sabel-Canon-Lloyd]
---

# Skill — Recherche d'antériorité marque V2

> **Un premier passage de recherche, pas une opinion de disponibilité.**
>
> Ce skill produit un brouillon de clearance. Une opinion de disponibilité au sens
> propre exige une recherche professionnelle complète et le jugement d'un
> mandataire en marques inscrit INPI (CPI L.422-4) ou d'un avocat spécialisé.
> « Aucun conflit évident » issu de ce skill signifie uniquement que le premier
> passage n'a rien remonté dans son périmètre réel. Cela ne veut pas dire que la
> marque est libre.
>
> **Frontière avec les autres skills.**
> - `clearance-marque` reste un alias historique de ce skill (rétrocompatibilité). Ce n'est plus la voie normale à proposer.
> - `depot-marque-fr` consomme la sortie de ce skill en amont d'un dépôt INPI ou EUIPO. Il ne refait pas la clearance.
> - `analyse-opposition-marque` consomme un finding 🔴 ou 🟠 pour préparer une opposition contre un dépôt tiers.
> - `anteriorite-invalidite` sert à attaquer en nullité un titre tiers déjà enregistré (action L.716-2 CPI).
> - `surveillance-marque` prend le relais post-dépôt pour le monitoring BOPI / EUIPO / Madrid.
> - `audit-pi-ma` couvre un audit M&A multi-actifs (marques + brevets + droit d'auteur + open source).

---

## Examples

<example>
<user>/h-pi:recherche-anteriorite-marque "VELORA" --classes=9,35,42 --territoires=fr,eu --knockout</user>
<response>
1. Mode `--knockout` : passage rapide identité stricte signe + classes identiques.
2. Lecture profil cabinet, bloc Brand protection + Cadence dépôt.
3. Caractérisation : signe verbal arbitraire, 3 classes (9 logiciels, 35 services commerciaux, 42 SaaS), territoires FR (INPI Data) + UE (EUIPO TMview).
4. Knockout strict identité parfaite « VELORA » classes 9/35/42 sur INPI + EUIPO.
5. Findings : INPI Data — 0 hit identité 🟢 ; EUIPO TMview — 1 hit identité partielle « VELLORA » classe 9 🟠 [à vérifier].
6. Sortie binaire : go avec délimitation suggérée (éviter recouvrement direct classe 9 si l'antériorité s'avère active), ou passage à `--full` pour appréciation globale.
7. Renvoi `--full` ou `analyse-opposition-marque` selon la position cabinet.
</response>
</example>

<example>
<user>/h-pi:recherche-anteriorite-marque "Maison Lorea" (semi-figuratif, logo monogramme) --classes=25,18 --territoires=fr,eu,madrid:us,uk,ch,jp,cn --full</user>
<response>
1. Mode `--full` : recherche approfondie identité + similitude phonétique/visuelle/conceptuelle + appréciation globale.
2. Lecture profil cabinet, bloc Brand protection (posture enforcement, cadence dépôt mode/luxe).
3. Caractérisation : signe semi-figuratif (élément verbal « Maison Lorea » + logo monogramme), classes 25 vêtements + 18 maroquinerie, territoire FR + EU + 5 désignations Madrid (US, UK, CH, JP, CN).
4. Knockout strict : INPI Data, EUIPO TMview, OMPI Madrid Monitor sur les 7 territoires.
5. Similitude phonétique (« Lorea » vs « Loria » / « Lorca » / « Lore-a »), similitude visuelle du monogramme (recherche figurative Vienna codes), similitude conceptuelle (références patronymique / géographique).
6. Appréciation globale CJUE Sabel C-251/95, Canon C-39/97, Lloyd C-342/97 : interdépendance facteurs, consommateur moyennement attentif du segment mode/luxe.
7. Findings cotés 🔴🟠🟡🟢 par antériorité détectée, par territoire.
8. Recommandation : go / go avec délimitation / no-go / passage à `analyse-opposition-marque` selon profil de risque.
9. Post-flight `verifier-citations` (Sabel, Canon, Lloyd, L.711-2 CPI).
10. Sortie partner-ready : tableau antériorités cotées + note relecteur + arbre 5 options.
</response>
</example>

<example>
<user>/h-pi:recherche-anteriorite-marque "NEXORA" --classes=9,42 --territoires=fr,eu --full --focus-notoires</user>
<response>
Signe verbal SaaS B2B, mode `--full` avec focus marques notoires.
1. Knockout strict classes 9/42 sur INPI + EUIPO.
2. Recherche similitude phonétique élargie (« NEXORA » vs « NEXIA », « NEXTA », « LEXORA »).
3. Détection marques notoires CPI L.713-3 et L.713-5 : recherche d'atteinte à marque renommée hors classes (parasitisme, dilution).
4. Cadre jurisprudentiel CJUE renommée : L'Oréal SA / Bellure C-487/07 (parasitisme et profit indu), Intel Corp. / CPM C-252/07 (lien et atteinte au caractère distinctif).
5. Détection marques notoires SaaS B2B susceptibles d'opposition élargie (par exemple grands éditeurs ERP/CRM cotés).
6. Findings cotés 🔴🟠🟡🟢, marques notoires détectées séparées des antériorités strictes.
7. Recommandation calibrée sur la posture enforcement cabinet : go / délimitation / no-go.
</response>
</example>

<example>
<user>/h-pi:recherche-anteriorite-marque "HACIENDA" --classes=9,35,42,45 --territoires=fr,eu --watchlist --cadence=hebdo --niveau=haut</user>
<response>
Mode `--watchlist` : ajout du signe en surveillance via `surveillance-marque`.
1. Lecture portefeuille existant `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/portfolio.yaml`.
2. Caractérisation : signe verbal HACIENDA, classes 9/35/42/45, territoires FR + EU.
3. Paramétrage watchlist : cadence hebdomadaire (BOPI vendredi + EUIPO Bulletin), niveau d'alerte haut (signaler 🔴 + 🟠 + 🟡), classes/territoires couverts.
4. Renvoi vers `surveillance-marque` pour suivi BOPI / EUIPO / Madrid Monitor.
5. Sortie : confirmation d'ajout watchlist, cadence et niveau, point de contrôle prochaine revue trimestrielle.
</response>
</example>

---

## Chargement du profil

> Lire d'abord :
> 1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
> 2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`
>
> Blocs pertinents pour ce skill :
> - **Brand protection** — marques surveillées, cadence agent `bopi-watcher`, niveaux d'alerte.
> - **Cadence dépôt** — réactif sur lancement / proactif veille concurrence / défensif portefeuille.
> - **Posture enforcement** — agressive / mesurée / conservatrice. Calibre la fermeté du go/no-go.
> - **Matrice d'approbateurs** — ligne « Approbateur dépôt » pour orienter l'escalade.
> - **Politique PII** — `passive` / `active` / `strict`. Calibre la posture de citation des marques tierces sensibles.
> - **Juridictions et offices d'inscription** — INPI / EUIPO / OMPI Madrid / offices nationaux hors UE.

Si le profil contient encore `[A CONFIGURER]` sur les blocs critiques (Brand protection, posture enforcement), demander `/h-pi:entretien-demarrage` avant toute recommandation go/no-go. Tant que provisoire, taguer la sortie `[PROVISOIRE]` et garder les marqueurs `[à vérifier]` visibles.

---

## Intake

À demander en un seul batch, puis mapper sur le contrat d'entrée :

1. **Mode** — `--knockout` | `--full` | `--watchlist` (défaut `--full`).
2. **Signe proposé** — texte exact, stylisation éventuelle, type (verbal, figuratif, semi-figuratif, sonore, tridimensionnel).
3. **Produits ou services réels** — description concrète du produit ou service.
4. **Classes Nice** — si déjà connues ; sinon dériver de la description (et surfacer l'incertitude).
5. **Territoires visés** — FR seul / EU seul / FR + EU / Madrid + liste de pays / international plus large.
6. **Apparence en marché** — usage déjà en cours ou pré-lancement ; date de premier usage envisagée.
7. **Noms reliés déjà connus** — marques antérieures du client, marques tierces déjà détectées.
8. **Limites de recherche déjà identifiées** — bases inaccessibles, segments non couverts, budget temps.
9. **Sortie attendue** — go/no-go binaire / tableau cotés / passage opposition / ajout watchlist.
10. **Niveau de validation humaine requis** — mandataire seul / mandataire + GC / mandataire + Direction marketing.

Si la description du produit ou service reste vague après un push, marquer `goods_services_scope: unclear` et réduire la confiance du triage. Ne pas inférer des classes Nice sur une description fantôme.

---

## Gate non-juriste

- [ ] Mode (`--knockout` / `--full` / `--watchlist`) explicite.
- [ ] Signe, classes Nice et territoires fournis ou confirmés.
- [ ] Profil cabinet lu, blocs Brand protection + Cadence dépôt + Posture enforcement extraits.
- [ ] Aucune conclusion présentée comme avis juridique final ni comme « disponibilité ».
- [ ] Citations vérifiées ou taguées `[à vérifier]`.
- [ ] Sortie contient note du relecteur + tableau antériorités cotées + arbre 5 options.
- [ ] Validation humaine par mandataire ou avocat marques rappelée explicitement avant tout dépôt, adoption ou investissement marketing.

Si l'utilisateur n'est pas juriste ou mandataire inscrit INPI, produire une explication opérationnelle, signaler les limites du premier passage, refuser toute conclusion présentée comme avis juridique final et demander validation par un professionnel habilité avant usage externe.

---

## Mode Anno Desktop Optionnel

Si la distribution Hacienda + Anno Desktop est active, utiliser Anno seulement comme mémoire/RAG local de dossier client. Appeler `anno_health` avant tout outil Anno ; en cas d'indisponibilité, annoncer le fallback et poursuivre en mode Hacienda. Appeler `detect` avant tout traitement d'une pièce client. `legal_search` et `legal_graph_query` ne s'utilisent que sur un corpus déjà ingéré et autorisé. Anno reste une source interne Anno de dossier, jamais comme source primaire et jamais comme registre officiel — INPI, EUIPO, OMPI Madrid Monitor restent vérifiés via `hacienda-sources-officielles` ou les outils PI Hacienda.

---

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Propriété Intellectuelle` est disponible. Ne pas inventer de tool hors périmètre ; si une source ou un registre n'a pas été consulté directement, garder `[à vérifier]`.

- Socle textes, jurisprudence et droit UE : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Registres marques : `inpi_search_marques`, `inpi_marque_details`, `inpi_marques_publications_recentes`, `euipo_tmview_search`, `bopi_dernieres_publications`.
- OMPI Madrid Monitor : à consulter via web public en absence de connecteur direct, en taguant explicitement `[recherche web — à vérifier]`.
- Anno (quand disponible) reste une source interne de dossier : jamais un registre officiel INPI, EUIPO, OEB, OMPI ou BOPI.

---

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré :

- Sans dossier actif : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/`
- Dossier actif : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`

Nommer le livrable `clearance-{signe-slug}-{date}.md` (+ `.html` si dashboard généré). Ajouter au log de vérification les citations contrôlées contre source primaire.

---

## Sortie

### Format livrable

```
[En-tête de confidentialité selon le rôle utilisateur]

> **⚠️ Note du relecteur**
> - **Sources :** INPI Data ✓ / EUIPO TMview ✓ / OMPI Madrid Monitor ✗ — non connectée, citations issues de la recherche web ou de la connaissance modèle, à vérifier
> - **Lecture :** N hits remontés (INPI X / EUIPO Y / Madrid Z)
> - **Signalé pour ton jugement :** N éléments marqués [review] | aucun
> - **Fraîcheur :** dernière publication BOPI vendredi {date} — intégrée | non intégrée
> - **Avant de t'appuyer dessus :** {action concrète : approfondir / négocier coexistence / renommer / prêt pour relecture mandataire}

# Recherche d'antériorité — {signe} — {territoires}

## Étape 1 — Pré-flight (si activé dans le profil)

Si le profil active `politique_pii` non-`off` et que les pièces client (descriptions produit, présentation marketing) sont jointes, appliquer la politique : footer cas A si N ≥ 5 identifiants détectés, prompt cas B (bloquant) si seuil B atteint ou catégorie sensible PI détectée. Ce skill ne traite habituellement pas de PII massif (les registres officiels sont publics), donc le pré-flight reste léger.

## Étape 2 — Lecture profil cabinet

Extraire et appliquer :
- Brand protection (marques surveillées, cadence agent `bopi-watcher`, niveaux d'alerte).
- Cadence dépôt (réactif / proactif / défensif).
- Posture enforcement (agressive / mesurée / conservatrice).
- Matrice d'approbateurs, ligne « Approbateur dépôt ».

## Étape 3 — Caractérisation du signe

Type : verbal / figuratif / semi-figuratif / sonore / tridimensionnel.
Classes Nice : liste exhaustive, distinguer classes cœur et classes défensives.
Territoires : FR / EU / Madrid + désignations / hors UE.
Apparence en marché : pré-lancement / déjà exploité.

## Étape 4 — Knockout strict

Identité parfaite signe + classes identiques sur :
- INPI Data (FR), via `inpi_search_marques`.
- EUIPO TMview (EU + États membres relayés).
- OMPI Madrid Monitor (international), au minimum sur les désignations visées.

Le knockout est binaire par antériorité : identité oui / identité non. Ne pas mélanger avec la similitude.

**Cartographie désignations Madrid IR vs territoires visés.** Avant de conclure sur la disponibilité territoriale, vérifier les désignations effectives des marques internationales (IR) antérieures détectées :

- Une marque internationale Madrid (IR) ne couvre **que les désignations explicitement choisies** par le titulaire à l'enregistrement initial, ou ajoutées ultérieurement (désignations postérieures, Art. 3ter Protocole Madrid).
- Une IR ne couvre **PAS automatiquement tous les pays du système Madrid** — vérifier les désignations effectives via OMPI Madrid Monitor pour chaque IR antérieure pertinente.
- Cartographier explicitement le recouvrement : désignations de l'IR antérieure ∩ territoires visés par le client = périmètre réellement exposé.
- Exemple : client envisage 5 désignations Madrid (US, UK, CA, AU, CH). Une IR antérieure couvre US/UK/AU mais pas CA/CH. Le périmètre exposé se réduit aux 3 désignations en collision (US, UK, AU) ; CA et CH restent ouverts. La stratégie Madrid à 5 désignations se réduit à 2 désignations libres (CA, CH) avant arbitrage.
- Cette cartographie est **nécessaire AVANT toute conclusion sur la disponibilité territoriale**. Tagger `[OMPI Madrid Monitor]` chaque désignation vérifiée, `[à vérifier]` les autres.

## Étape 5 — Similitude phonétique, visuelle et conceptuelle

- **Phonétique** — Soundex, métaphone, transcription IPA approximative ; variantes orthographiques courantes ; troncatures.
- **Visuelle** — pour signes figuratifs ou semi-figuratifs, similitude graphique via Vienna codes EUIPO ; éléments dominants ; couleurs revendiquées.
- **Conceptuelle** — sens immédiat pour le consommateur ciblé, références culturelles, patronymique / géographique / arbitraire / évocatif.

Reporter pour chaque antériorité proche : signe / source / classes / titulaire / statut / date de dépôt si disponible / note sur la raison du signalement. Pas de supplémentation silencieuse : si une date, un numéro ou un statut n'est pas présent dans la source, l'écrire comme indisponible plutôt que le deviner.

## Étape 6 — Appréciation globale (CJUE Sabel / Canon / Lloyd)

Cadre applicable en marques FR et UE : appréciation globale, pas de test multi-facteurs US (du Pont, Polaroid, Sleekcraft) sous peine d'application du mauvais droit.

Facteurs :
- similitude des signes (Sabel C-251/95) ;
- similitude des produits ou services (Canon C-39/97) ;
- pouvoir distinctif de la marque antérieure ;
- public concerné et niveau d'attention (Lloyd Schuhfabrik C-342/97 — consommateur moyennement attentif, varie selon le secteur) ;
- interdépendance des facteurs (une forte similitude des produits peut compenser une similitude moindre des signes, et inversement).

**Équivalents étrangers et traductions — TPI 23 oct. 2002 aff. T-6/01 Matratzen Concord.** Quand le signe envisagé (ou l'antériorité comparée) est en langue étrangère, apprécier sa portée en fonction de la perception par le public pertinent du territoire visé :

- Doctrine Matratzen Concord (T-6/01) : un terme en langue étrangère peut être traité comme équivalent au signe en langue locale s'il est largement compris par le consommateur moyen du territoire de référence. À l'inverse, un terme étranger non compris du public pertinent conserve son altérité et peut échapper à certains motifs absolus (descriptif, usuel) ou au contraire échapper à certaines proximités conceptuelles.
- Application typique : signe en espagnol, italien, anglais ou allemand déposé en France ou dans l'UE. Vérifier si le terme est largement compris par le consommateur français ou européen moyen du segment ciblé.
- À mobiliser systématiquement pour les signes en langues étrangères, en complément de Sabel C-251/95, Canon C-39/97 et Lloyd C-342/97 (l'appréciation conceptuelle Sabel intègre la compréhension linguistique du public pertinent — Matratzen en précise l'opérationnalisation).
- Conséquence cotation : si le terme étranger antérieur n'est pas compris du public FR/UE ciblé, la similitude conceptuelle peut être affaiblie (cote à la baisse). Si au contraire le terme est compris (anglais courant, espagnol courant en zones limitrophes), la similitude conceptuelle joue à plein.

Présenter ces facteurs comme **signaux**, pas comme verdict. Ne jamais conclure « absence de risque de confusion » — c'est une conclusion réservée à l'autorité ou au juge.

## Étape 7 — Marques notoires et renommée

Détection des marques antérieures notoires susceptibles d'élargir la protection hors classes identiques :

- Cadre FR : CPI L.713-3 (protection des marques de renommée contre l'usage sans juste motif tirant indûment profit du caractère distinctif ou de la renommée), L.713-5 (atteinte à marque notoirement connue au sens art. 6bis CUP).
- Cadre CJUE : L'Oréal SA / Bellure (C-487/07, 18 juin 2009) — parasitisme et profit indu. Intel Corp. / CPM United Kingdom (C-252/07, 27 novembre 2008) — lien dans l'esprit du public et atteinte au caractère distinctif (dilution).

Si une marque notoire de secteur adjacent est détectée, la signaler 🟠 minimum, même sans recouvrement de classes.

## Étape 8 — Motifs absolus susceptibles d'attaquer le signe envisagé

Knockout L.711-2 CPI avant toute conclusion de triage :

- caractère distinctif insuffisant (L.711-2 1° et 2°) ;
- descriptif (L.711-2 3°) ;
- devenu usuel (L.711-2 4°) ;
- forme imposée par la fonction technique, valeur substantielle ou nature du produit (L.711-2 5°, 6°, 7°) ;
- atteinte à l'ordre public, aux bonnes mœurs ou à des signes protégés (L.711-2 8°, 9°, 10°) ;
- déceptif / trompeur (L.711-2 11°).

Pour chaque motif pertinent : aucun problème identifié, ou flag motivé et concret. Pas de tableau plat uniforme de « pass ».

## Étape 9 — Findings cotés

Pour chaque antériorité détectée, coter selon l'échelle canonique (voir section « Niveaux de criticité » ci-dessous) :

| # | Antériorité | Source | Classes | Territoire | Titulaire | Statut | Cote | Raison |
|---|---|---|---|---|---|---|---|---|

## Étape 10 — Recommandation

Une seule des valeurs suivantes, justifiée en 2-4 lignes :

- `proceed-to-professional-clearance` — voie libre au premier passage, clearance professionnel + dépôt à enclencher.
- `prepare-filing` — pas de blocage majeur, préparer `depot-marque-fr`.
- `prepare-filing-with-limitation` — go avec délimitation du libellé pour éviter recouvrement direct.
- `monitor-before-filing` — signaux mixtes, ajout `surveillance-marque` avant décision.
- `prepare-opposition-risk-review` — conflit proche, passage à `analyse-opposition-marque` pour comparaison contradictoire.
- `insufficient-search-coverage` — couverture trop incomplète pour conclure (bases non interrogées, famille adjacente non confirmée).
- `abandon-or-rename` — risque maximal, renommer ou abandonner.

## Étape 11 — Post-flight `verifier-citations`

Vérifier les citations primaires utilisées :

- articles CPI cités (L.711-2, L.713-3, L.713-5, L.712-4 si l'opposition est évoquée) contre Légifrance ;
- arrêts CJUE et TPI canoniques (Sabel C-251/95, Canon C-39/97, Lloyd C-342/97, Matratzen Concord T-6/01, L'Oréal Bellure C-487/07, Intel C-252/07) contre Eurlex ;
- numéros INPI / EUIPO / Madrid des antériorités cotées contre la source consultée.

Tout élément non vérifié reste `[à vérifier]`.

## Étape 12 — Sortie partner-ready

| Bloc | Contenu |
|---|---|
| Résumé exécutif | 3 phrases : bottom-line, risque dominant, prochaine action. |
| Couverture de recherche | Bases interrogées, classes couvertes, territoires couverts, type de recherche, limitations. |
| Tableau antériorités cotées | Cf. Étape 9. |
| Marques notoires détectées | Bloc séparé si applicable. |
| Motifs absolus | Synthèse par motif. |
| Recommandation | Cf. Étape 10. |
| Renvois | `depot-marque-fr` / `surveillance-marque` / `analyse-opposition-marque` / `anteriorite-invalidite` / `audit-pi-ma`. |
| Validation humaine | Mandataire ou avocat marques avant dépôt, adoption ou investissement marketing. |
| Arbre 5 options | Rédiger / Escalader / Compléter les faits / Surveiller et attendre / Autre. |

[Ce skill a traité {N} mentions identifiantes. Pour anonymiser automatiquement avant envoi à Claude, installer hacienda-ghost.](https://hacienda.diy/ghost)
```

---

## Modes courts

- `--knockout` : passage rapide knockout sur identité signe + classes identiques. Sortie binaire go / no-go. Pas de phonétique, pas d'appréciation globale, pas de notoriété. Pour go/no-go expéditif sur un naming en pré-validation marketing.
- `--full` (défaut) : recherche approfondie identité + similitude phonétique/visuelle/conceptuelle + appréciation globale Sabel/Canon/Lloyd + notoriété L.713-3 / L'Oréal Bellure / Intel + motifs absolus L.711-2. Sortie partner-ready complète.
- `--watchlist` : ajout du signe en surveillance via `surveillance-marque`. Paramètres : cadence (`--cadence=hebdo|mensuelle|trimestrielle`), niveau d'alerte (`--niveau=haut|moyen|bas`), classes et territoires couverts. Pas de clearance approfondie : sert au monitoring post-décision.

---

## Niveaux de criticité

Échelle canonique appliquée à l'appréciation du degré de confusion avec les antériorités identifiées (identité/similarité du signe, identité/similarité des produits/services en classes Nice, notoriété de l'antériorité, territoire) — appréciation globale CJUE Sabel/Canon/Lloyd :

| Niveau | Icône | Signification dans le contexte de ce skill |
|---|---|---|
| Faible | 🟢 | Aucun hit pertinent : pas d'identité, pas de similarité forte sur les bases consultées (INPI Data, EUIPO TMview, Madrid Monitor selon scope), classes éloignées, ou antériorités présumées éteintes. Voie libre pour clearance professionnel et dépôt. |
| Moyen | 🟡 | Hits de similarité moyenne : signe phonétiquement ou visuellement proche en classes voisines, antériorité notoire dans un secteur adjacent, ou marque dont l'usage paraît limité. Surveillance recommandée, clearance approfondi requis avant dépôt. |
| Élevé | 🟠 | Risque de confusion établi : antériorité fortement similaire en classes identiques, ou signe identique en classes voisines avec notoriété démontrée. Opposition probable au dépôt ; envisager limitation du libellé, négociation de coexistence, ou changement de signe. |
| Bloquant | 🔴 | Identité (ou quasi-identité) du signe ET identité (ou recouvrement direct) des classes Nice, surtout si l'antériorité est exploitée/notoire/dominante du secteur. Risque maximal de refus, d'opposition garantie et de contrefaçon en cas d'usage. Ne pas déposer ; renommer ou abandonner. |

Plancher cross-skill (CLAUDE.md §4) : ce skill est généralement amont — il pose la cote qui contraindra `depot-marque-fr`, `analyse-opposition-marque` et `anteriorite-invalidite` aval. Sa cote 🔴 doit donc être conservée comme plancher par tout skill consommateur. Une dégradation aval exige une déclaration explicite : « Le skill amont a coté ceci [X]. Je l'abaisse à [Y] parce que [raison]. »

---

## Ton

Ton de mandataire / avocat senior marques. Direct, sourcé, calibré sur la posture cabinet :

- **Posture agressive** : recommandations fermes go/no-go, pas d'hésitation à conclure à un risque 🔴 quand le knockout le justifie. La fermeté n'est pas une opinion de disponibilité — c'est une lecture de risque.
- **Posture mesurée** : signaler les facteurs, présenter les options (délimitation, coexistence, renommage), laisser l'arbitrage au mandataire signataire.
- **Posture conservatrice** : maximiser les caveats, multiplier les `[review]` sur facteurs ambigus, recommander systématiquement clearance professionnel approfondi avant tout dépôt.

Toujours rappeler que c'est un premier passage. Ne jamais fabriquer un numéro de dépôt, une date ou un statut absent de la source.

---

## Mode silencieux pour livrables externes

Quand le livrable est destiné à un public non-juriste — note marketing, direction produit, comité de naming, sponsor business — supprimer la narration interne et conserver uniquement :

- En-tête de confidentialité adapté au destinataire (si dans le périmètre du secret) ou bandeau « Notes de travail — Faire valider par un mandataire avant tout dépôt ».
- Note du relecteur condensée (point de contrôle unique).
- Tableau antériorités / cotation / action proposée.
- Recommandation go / no-go / délimitation, en une phrase actionnable.

Couper :
- la narration de skill (« j'utilise le skill X qui normalement… ») ;
- les renvois vers d'autres commandes (sortir dans une note de relecteur séparée) ;
- les détails de méthodologie (Sabel/Canon/Lloyd cités sans pédagogie sur le cadre) ;
- les listes de bases consultées (consolider en note de bas de page).

Le livrable doit se lire comme une note de mandataire à la direction marketing. Le méta-commentaire va dans la note du relecteur, jamais dans le document.

---

## Ce skill ne fait pas

- Ne déclare pas une marque disponible. Premier passage uniquement ; une opinion de disponibilité au sens propre relève d'une recherche professionnelle complète par mandataire ou avocat.
- Ne dépose pas la marque. Pour le dépôt INPI ou EUIPO, renvoyer vers `depot-marque-fr`.
- Ne fait pas l'opposition au dépôt d'un tiers. Pour préparer une opposition sur la base d'un finding 🔴 ou 🟠, renvoyer vers `analyse-opposition-marque`.
- Ne fait pas la surveillance continue post-dépôt. Pour le monitoring BOPI / EUIPO / Madrid, renvoyer vers `surveillance-marque`.
- Ne couvre pas les noms de domaine ni les noms commerciaux non enregistrés sauf signal explicite de l'utilisateur (et dans ce cas, sans connecteur direct, rester `[à vérifier]`).
- Ne couvre pas le droit étranger hors FR / EU / Madrid sans cadre défini. Pour des juridictions hors couverture, signaler explicitement et renvoyer vers un correspondant local — ne jamais appliquer silencieusement le test français à des faits étrangers, ni un test US (du Pont, Polaroid, Sleekcraft) à des faits FR/UE.
- Ne refait pas une analyse contradictoire complète d'opposition ni d'invalidité d'un titre tiers (`analyse-opposition-marque` / `anteriorite-invalidite`).
- Ne maintient pas un hub portefeuille (`portefeuille-pi`).

---

## Rappel final à conserver

- Premier passage uniquement.
- Jamais une opinion de disponibilité.
- Validation humaine obligatoire par mandataire INPI inscrit ou avocat marques avant dépôt, adoption ou investissement marketing.
- Une base non interrogée reste une lacune, pas une absence de conflit.
- Les numéros, dates, statuts et classes doivent être reliés à une source ouvrable avant d'être cités comme appui.
