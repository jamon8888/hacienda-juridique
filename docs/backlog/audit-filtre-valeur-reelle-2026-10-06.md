# Audit « filtre ou valeur codée ≠ valeur réelle de l'API » — droit-affaires

**Date :** 2026-10-06 · **Périmètre :** `packages/core/src` + agents/skills du plugin `hacienda-droit-affaires`
**Statut (mis à jour le 2026-10-06, fin de journée) :** les écarts G1, G3, G4, G5, M1-M7, M9 et G2 (version honnête) sont **corrigés,
test d'abord puis contrôle en réel** (`node scripts/check-sources-live.mjs` : 22/22 ; `node scripts/check-bodacc-live.mjs`).
Non commité. Restent ouverts : **M8** (délai « hors UE/EEE », validation avocat), **G2 bis** (vraie source BOFiP à intégrer :
jeu de données en vrac `bofip-impots-publications-en-vigueur` sur data.gouv.fr, pas d'API de recherche — chantier à part),
écarts faibles (§3), sécurité BOSS (`rejectUnauthorized: false`).

| Écart | Correction |
|---|---|
| G1 EUR-Lex plante | CELEX non conformes écartés + filtre SPARQL ; 0 plantage sur 40 requêtes en réel (19 avant) |
| G3 forclusion BODACC | `bodacc_procedures` renvoie `avis_ouverture` (parution, nature, date du jugement, tribunal, mandataire dans `complement`) ; `jugement` parsé ; skill + 2 agents alignés |
| G4 dates Judilibre | `decision_date` affichée (recherche et consultation) ; chambre/juridiction en clair |
| G5 état LODA | `jurisState`, `dateDebutVersion`, `dateFinVersion`, `textAbroge` lus ; abrogé / abrogation différée signalés ; aussi `get_code` |
| G2 BOFiP | avertissement dans chaque résultat + descriptions + 7 skills, README, CLAUDE.md, sources-fr : « n'est pas la base BOFiP-Impôts » |
| M1 nom de code | nom officiel envoyé (`canonicalCodeName`) : 25/25 en réel |
| M2 dates | refusées explicitement sur ALL, LODA_ETAT, CODE_*, CNIL, JUFI |
| M3-M6 EUR-Lex | EuroVoc (prédicat + langue `fr` + liaison directe), type d'acte, relations (`amends`/`cites` + vrais `amended_by`), consolidations de l'acte seul |
| M7 filtres Judilibre | `chamber`, `jurisdiction`, `publication`, `dateStart`, `dateEnd` exposés (valeurs de la taxonomie) ; agent `veille-jurisprudence` aligné |
| M9 Pappers | « a échoué (raison) » distinct de « non configuré » ; clé jamais renvoyée (non vérifié en réel : pas de clé) |

Bonus trouvé en corrigeant : la requête EuroVoc, une fois le prédicat corrigé, dépassait le délai (balayage de tous les actes) ;
et le filtre de langue comparait `fra` à `fr`. Corrigés dans la même passe.

**Méthode.** Inventaire de chaque filtre, enum, facette, tri et nom de champ lu dans le code, puis appel des
vraies API (Légifrance/PISTE et Judilibre avec les identifiants de `~/.config/Hacienda/credentials.json`,
BODACC, EUR-Lex SPARQL, BOSS). Les scripts de contrôle sont dans le répertoire temporaire de la session
(`probe-*.mjs`) ; à consolider dans `scripts/` si tu valides la suite.

**Non vérifié en réel :** Pappers (aucune clé dans le fichier d'identifiants) ; filtre `rubrique` de BOSS
(le portail a cessé de répondre pendant le test : « Headers Timeout » sur toutes les requêtes) ; proxy
d'entreprise (`fetch` de Node ne suit pas `HTTP(S)_PROXY`, déjà noté au handoff) ; `legifrance_get_loda`
sur un texte réellement abrogé (écart établi par les noms de champs, pas par un cas abrogé).

---

## 1. Écarts graves (résultat faux ou outil inutilisable)

### G1 — `eurlex_recherche` plante sur près d'une requête sur deux
- **Code :** `eurlex/client.ts` `search()` appelle `eurlexDocumentUrl(celexId)` qui valide le CELEX avec
  `/^[0-9][0-9A-Z]{4,}(?:-[0-9]{8})?$/`. Une seule valeur non conforme dans la page fait échouer **toute** la recherche.
- **Preuve (réel) :** 40 requêtes (10 sujets × `any`/`regulation`/`directive`/`case-law`) : **19 plantent**, 50 CELEX sur 200
  sont non conformes. Exemples renvoyés par EUR-Lex : `32016R0679R%2802%29` (rectificatif), `62024CJ0798_RES`,
  `62018TJ0161_RES`, `62024TJ0585_INF`, `72019L1023LUX_202606116`, `C%2F2026%2F04668`.
  Message vu : « CELEX invalide: 62024CJ0798_RES ».
- **Gravité : élevée.** L'erreur est visible (pas de faux résultat), mais l'outil est dans le socle de tous les skills.
- **Correction proposée :** écarter (ou normaliser) les CELEX non conformes dans `search()` au lieu de lever ; test avec
  des liaisons SPARQL contenant ces valeurs.

### G2 — `bofip_rechercher` / `bofip_consulter` ne renvoient pas du BOFiP
- **Code :** `tools/bofip.ts` interroge le fonds `CIRC` de Légifrance en le présentant comme « le BOFiP ».
- **Preuve (réel) :** 508 résultats `CIRC` examinés (requêtes « TVA », « impôt sur les sociétés », « BOI », « bulletin officiel des
  finances publiques », 3 pages de 50) : **0** mentionne `BOI-` ou BOFiP. La requête `BOI-TVA-DED-10` renvoie « Organisation des
  élections sénatoriales… » ; `ALL` + `BOI-TVA-DED-10-10-10` en expression exacte : 0 résultat. Les circulaires `CIRC` sont des
  circulaires ministérielles générales (dont fiscales éventuellement), pas la base BOFiP-Impôts.
- **Impact :** des documents hors sujet sont présentés comme du BOFiP. Skills qui l'appellent : `due-diligence-dataroom`,
  `closing-checklist-fr` (points fiscaux de DD).
- **Gravité : élevée** (résultat faux sans erreur).
- **Correction à arbitrer :** soit brancher une vraie source BOFiP (hors Légifrance ; à instruire), soit retirer/renommer l'outil
  et la mention dans les skills en attendant (`[à vérifier]` sur toute doctrine fiscale). Décision produit à prendre.

### G3 — `declaration-creance` et agents BODACC : « type de procédure » et choix de l'avis
- **Preuve (réel) :** `typeavis` renvoyé par le client vaut `Avis initial` pour 100 % des 40 avis collectifs récents ; les valeurs
  possibles sont `annonce` / `annulation` / `rectificatif`. La nature de la procédure est dans `raw.jugement` (JSON **en chaîne**) :
  `{type, famille, nature, date, complementJugement}`, p. ex. `nature = « Jugement d'ouverture d'une procédure de redressement judiciaire »`.
- **Le mandataire est extractible** : pour un avis d'ouverture, `jugement.complementJugement` contient « désignant mandataire judiciaire
  SELARL … représentée par Maître … adresse … », « Les créances sont à adresser, dans les deux mois… ». Le skill dit pourtant de
  le chercher « dans `raw` (non parsé) » avec repli `[à vérifier]` : il le marquera quasi toujours à tort.
- **Choix de l'avis (le plus grave) :** `bodacc_procedures` renvoie tous les avis « Procédures collectives » triés par date décroissante.
  Sur les 100 plus récents, **25 seulement** sont des ouvertures ; les autres sont des clôtures pour insuffisance d'actif, plans,
  « Dépôt de l'état des créances », conversions… Le skill prend `dateparution` comme point de départ du délai L.622-24 **sans dire de
  sélectionner l'avis d'ouverture** (`jugement.famille = « Jugement d'ouverture »`) : un modèle qui prend le premier résultat calcule
  la forclusion à partir d'un avis de clôture ou de plan.
- **Mêmes défauts dans les agents :**
  - `bodacc-procedures-watcher` : gabarit d'alerte `Procédure : {typeavis} ouverte le …` → afficherait « Avis initial ouverte le … » ;
    la « nouvelle procédure » = tout nouvel `id` de la famille (une clôture ou un plan déclencherait une alerte « nouvelle procédure »).
  - `bodacc-watcher` : ligne « Procédure collective ouverte → 🔴 Immédiat » sur la seule `familleavis`, sans lire `jugement.nature`
    (une clôture serait alertée comme une ouverture).
- **Gravité : élevée** (date de forclusion potentiellement fausse ; c'est la règle dure du plugin).
- **Correction proposée :** instruction explicite dans le skill et les 2 agents (filtrer sur `raw.jugement.famille`/`nature`, lire
  `date`, `complementJugement`) ; mieux, ajouter à `parseAnnonce` un champ `jugement` déjà parsé (`nature`, `date`,
  `complementJugement`) pour ne plus dépendre de la lecture d'un JSON en chaîne par le modèle. Tests + contrôle en réel.

### G4 — Judilibre : date de décision absente en recherche, décalée d'un jour en consultation
- **Code :** `judilibre/format.ts` lit `decision_datetime`.
- **Preuve (réel) :** les résultats de `/search` portent `decision_date` (« 2021-09-29 ») et **pas** `decision_datetime` → aucune date
  affichée dans la liste. `/decision` porte `decision_datetime = "2021-09-28T23:00:00.000Z"` (UTC) pour une décision du **29 septembre
  2021** : l'outil affiche « Date : 2021-09-28T23:00:00.000Z », qu'un modèle citera au 28.
- **Gravité : élevée** (date d'arrêt fausse d'un jour dans une citation).
- **Correction proposée :** afficher `decision_date` en priorité (repli sur `decision_datetime` converti en date locale Europe/Paris) ;
  test avec les deux formes.

### G5 — `legifrance_get_loda` : état et dates de vigueur jamais affichés
- **Code :** `tools/get-loda.ts` lit `etat`, `dateDebut`, `dateFin` (schéma `ConsultTextResponseSchema`).
- **Preuve (réel, loi 78-17) :** `etat = null`, `dateDebut`/`dateFin` absents ; les champs réels sont `jurisState = "Vigueur"`,
  `dateDebutVersion = "2026-10-01"`, `dateFinVersion = "2027-11-26"`, `textAbroge = false`. L'outil, dont la description promet
  « état (VIGUEUR/ABROGE…), dates clés », n'affiche que la nature : un texte abrogé ou à abrogation différée ne serait pas signalé.
- **Gravité : élevée** (même famille que L441-10 ABROGE_DIFF). Non testé sur un texte abrogé réel.
- **Correction proposée :** lire `jurisState`, `dateDebutVersion`, `dateFinVersion`, `textAbroge` ; test avec les 3 cas.

---

## 2. Écarts moyens

| # | Écart | Preuve (réel) | Correction proposée |
|---|---|---|---|
| M1 | `legifrance_recherche` `fond=CODE_DATE/CODE_ETAT` : le nom du code est **sensible à la casse** et passé tel quel | « Code de commerce » → 1 ; « code de commerce », « Code de Commerce », « CGI », « code de la propriété intellectuelle » → **0, sans erreur** (le LEGITEXT est déjà résolu, mais pas les noms) | résoudre `code` via `resolveLegitext` puis envoyer le nom canonique ; erreur claire si inconnu |
| M2 | `dateDebut`/`dateFin` : **sans effet sur `LODA_ETAT`** (9659 = 9659 avec la plage 2026-01-01→02-01 ; essais `DATE_SIGNATURE/PUBLICATION/VERSION`) ; **HTTP 500 sur `fond=ALL`** (3 facettes essayées) | LODA_DATE réagit (1078 / 36) ; LODA_ETAT et ALL non | refuser explicitement le filtre de date sur ces deux fonds (message) ou orienter vers `LODA_DATE` |
| M3 | EUR-Lex : **EuroVoc toujours vide** (`eurlex_eurovoc` = 0 ; métadonnées `eurovoc = 0`, `directoryCodes = []`) | prédicat codé `cdm:resource_legal_is_about_concept_eurovoc` ; le réel est `cdm:work_is_about_concept_eurovoc` (3 concepts pour le RGPD) ; code répertoire : `cdm:resource_legal_is_about_concept_directory-code` | corriger les prédicats, test + contrôle en réel |
| M4 | EUR-Lex : **type d'acte toujours « any »** | `cdm:resource_type` n'existe pas ; réel `cdm:work_has_resource-type` → `.../resource-type/REG` (le code cherche « regulation » dans l'URI, qui ne le contient pas) | corriger prédicat + mapping `REG/DIR/DEC/…` |
| M5 | EUR-Lex : **relations** trompeuses | filtres `amends` et `cites` : 0 résultat (aucun prédicat ne les produit) ; `amended_by` renvoie des **versions consolidées** (RGPD : `02016R0679-20160504`, `01995L0046-20180525`), pas des actes modificatifs | prédicat `…amends_resource_legal` pour `amended_by`/`amends` ; ou retirer les types qui ne marchent pas |
| M6 | EUR-Lex : **versions consolidées** polluées | `32017L1132` : la liste contient `02014L0059-…`, `02012L0030-…`, `1982L0891`, `2005L0056` (consolidations d'autres actes) → `mode=nearest` peut désigner la mauvaise | ne garder que les CELEX `0<base>-AAAAMMJJ` de l'acte demandé |
| M7 | Agent `veille-jurisprudence` : **filtre promis non exécutable** | l'agent demande `JudilibreClient.search({ chamber, dateStart, query })` mais l'outil MCP `judilibre_recherche` n'expose que `query/pageSize/page`. Les valeurs réelles existent (`chamber=comm` → 35 346 ; `dateStart=2026-09-01` → 266 ; combiné → 43 ; « chambre commerciale » → HTTP 400) | exposer `chamber`, `dateStart`, `dateEnd` (et `jurisdiction`, `publication`, `solution`) dans l'outil, avec la liste des valeurs réelles dans la description ; adapter l'agent |
| M8 | `declaration-creance` : « 4 mois si créancier **hors UE/EEE** » | R.622-24 (lu en réel, en vigueur depuis 2014-07-02) : +2 mois pour les créanciers qui **ne demeurent pas sur le territoire** de la juridiction (France métropolitaine, ou le département/la collectivité d'outre-mer du siège) — un créancier belge ou allemand a donc 4 mois ; le skill lui en donne 2 | reformuler ; **à valider par l'avocat** (hors famille « filtre », mais même type : valeur du skill ≠ source) |
| M9 | Pappers `company_full_profile` : échec traité comme « non configuré » | `tryPappers` renvoie `null` sur toute erreur (clé invalide, 401, 5xx, réseau) et le message dit « Pappers non configuré — données via BODACC public uniquement » ; même famille que le défaut 13 | distinguer « non configuré » / « erreur Pappers (HTTP …) » ; non vérifié en réel faute de clé |

---

## 3. Écarts faibles

- **Tri `SIGNATURE_DATE_DESC` ignoré sur `JURI` et `CETAT`** : ordre identique à `PERTINENCE`, `ASC` et à une valeur bidon. La valeur réelle est
  `DATE_DESC` / `DATE_ASC` (vérifié : 17 septembre 2026 en tête). **Ne pas changer le défaut** (la pertinence est le bon tri pour chercher une
  jurisprudence) ; exposer un paramètre `sort` si besoin, et corriger le commentaire du code.
- `legifrance_get_circulaire` : pas de texte (la réponse porte un PDF en base64 + `attachmentUrl`, pas `texteHtml`) ; le ministère est lu dans
  `ministeresDeposants` (vide) alors que le champ réel est `utilisateurDeposantMinistere`. La description promet le « texte intégral ».
- `legifrance_get_code` : « En vigueur depuis » jamais affiché (`dateDebut` absent ; réel `dateDebutVersion`).
- Hits `JURI` : aucune date dans la liste (elle n'est que dans le titre).
- BODACC `publicationavis` toujours vide : le client lit `publicationavis_facette`, absent du jeu de données (réel : `publicationavis = "A"`).
- BOSS : entité HTML `&ucirc;` non décodée (« ao&ucirc;t » dans un titre) ; `rubrique` filtre sur titre + extrait (non vérifié en réel).
- **Sécurité (hors famille)** : `boss/client.ts` rejoue la requête avec `rejectUnauthorized: false` sur toute erreur TLS/certificat
  (vulnérable à un homme-du-milieu) ; à traiter séparément.
- `legifrance_suggest` : `supplies` = `JURI`, `CETAT`, `KALI`, `ARTICLE` ont renvoyé 0 pour une seule requête test (« code de commerce »),
  test non concluant (la requête ne correspond pas à ces fonds).

## 4. Vérifié conforme (aucun écart)

- Légifrance `/search` : les 12 valeurs de `fond` renvoient des résultats ; facette `NATURE` (`LOI`, `ORDONNANCE`, `DECRET`, `ARRETE` : tous > 0
  sur `LODA_DATE`, `LODA_ETAT`, `JORF`) ; filtres de date `JURI`, `CETAT`, `CONSTIT`, `JORF`, `CIRC`, `LODA_DATE` réduisent bien le total ;
  tri `PUBLICATION_DATE_DESC` (JORF) et `SIGNATURE_DATE_DESC` (LODA, CIRC) effectifs.
- Les 23 LEGITEXT de `codes-legitext.ts` renvoient le bon code (nom = titre), `Code de commerce` y compris (un timeout isolé, puis OK).
- `getArticle`, `consult/juri`, `consult/jorf` (identifiant normalisé), `consult/legi/tableMatieres` : champs lus présents.
- Judilibre : `jurisdiction=cc`, `chamber=comm`, `publication=b`, `date_start` acceptés avec les vraies valeurs (taxonomie lue sur `/taxonomy`).
- BODACC : `familleavis = "collective"` (corrigé), `registre LIKE`, `typeavis_lib`, `familleavis_lib` ; les 4 libellés du tableau de
  `bodacc-watcher` (« Procédures collectives », « Ventes et cessions », « Modifications diverses », « Dépôts des comptes ») existent.
- EUR-Lex : filtre de type par motif CELEX (`R`, `D`, `L`, `6…`) retourne bien des actes du bon type ; langue `FRA` ; `fetchDocument` ;
  versions consolidées du RGPD / CRR.
- BOSS : la recherche et `boss_get_document` fonctionnent (avant la panne du portail).

## 5. Ordre de correction suggéré (si tu valides)

1. G3 (forclusion BODACC) — c'est la règle dure du plugin.
2. G4 (dates Judilibre), G5 (état LODA), G1 (EUR-Lex qui plante).
3. G2 : décision produit avant tout code (source BOFiP réelle ou retrait).
4. M1, M2, M7 (Légifrance code/dates, filtres Judilibre pour la veille), puis M3-M6 (EUR-Lex), M9.
5. M8 : validation avocat avant de toucher au texte.
6. Un script `scripts/check-sources-live.mjs` unique (Légifrance, Judilibre, BODACC, EUR-Lex) pour rejouer ces contrôles.

Non touchés : PI et Sources officielles (en pause). Les serveurs compilés de ces plugins ne sont pas reconstruits.
