# Handoff — état courant (entrée de session)

**Dernière mise à jour :** 2026-10-06
**Branche de travail :** `main`, à jour avec `origin/main`. Aucune branche en attente.
**Périmètre actif : `hacienda-droit-affaires` UNIQUEMENT.** PI et Sources officielles
sont **en pause** (décision Candy 2026-09-25) : ne rien lancer sur ces plugins.

> Point d'entrée d'une nouvelle session. Les handoffs datés
> (`docs/handoff/handoff-YYYY-MM-DD-*.md`) restent les enregistrements détaillés.

---

## Où on en est

### Évaluation du plugin avec `claude plugin eval` (nouveau, 2026-09-24/25)

Suite d'éval dans `plugins/hacienda-droit-affaires/evals/` : 4 cas phares construits
depuis les datasets de scoring (`01-spa-review`, `02-distress-cedant`,
`03-declaration-creance`, `04-dd-pe-red-flags`) + 1 cas négatif
(`05-neg-rupture-conventionnelle`, aucun skill DA ne doit se déclencher).

- **Critères pièges** = critères CRITIQUE des ground-truth, reformulés « traite le
  sujet ET évite l'erreur ».
- **Critères différenciants `d*`** (pour B, validés par Candy) : d1 citations de
  textes signalées, d2 jurisprudence non inventée, d3 statut de brouillon, + 1-2
  propres par cas (disclosure letter, garanties hors plafond, escalade Me Verdière,
  revendication 3 mois, aucune compensation inventée, renvoi aux validateurs).
- Résultats bruts dans `evals/results/` (ignoré par git).

**Deux usages décidés :**
- **A — contrôle qualité** : plugin seul (`--ablation none`), 3 passages, vraies
  sources. Filet anti-régression après modification d'un skill.
- **B — argument de valeur** : avec vs sans plugin (Δ). **À étaler, un cas par
  session**, forfait Pro de Candy limité (limite atteinte le 2026-09-25 la nuit).

**Commande A (depuis la racine du repo) :**
```bash
claude plugin eval plugins/hacienda-droit-affaires --runs 3 --ablation none --allow-real-servers --allow-tools "mcp__plugin_hacienda-droit-affaires_Hacienda_Droit_des_Affaires" --keep-temp --model sonnet --judge-model sonnet --no-publish --max-cost-usd 12
```
**Commande B, un cas à la fois (ex. spa-review) :**
```bash
claude plugin eval plugins/hacienda-droit-affaires --case 01-spa-review --runs 3 --allow-real-servers --allow-tools "mcp__plugin_hacienda-droit-affaires_Hacienda_Droit_des_Affaires" --keep-temp --model sonnet --judge-model sonnet --no-publish --max-cost-usd 5
```
(sans `--ablation none` → comparaison avec/sans automatique ; lire le Δ par critère.)

**Réflexes éval :** toujours lire la **trace** (`<kept temp>/out/trace.jsonl`) avant
de conclure — vérifier que le skill complet est chargé (`Skill→hacienda-droit-affaires:<skill>`),
que Légifrance répond, et lire la réponse de chaque échec (plusieurs faux échecs
venaient des critères, pas du plugin). Syntaxe `--allow-tools` : nom du serveur,
pas de joker (`mcp__*` refusé). Code de sortie 1 = seuil 1,0 non atteint, pas un
plantage.

**Historique A :** 1er passage (avant corrections) : 14/14 analyses sans piège
raté, cas négatif 3/3. **Relance A du 2026-09-25 (matin) : incomplète**, limite de
session du forfait atteinte au 2e cas (2,75 $). Résultats exploitables :
- `01-spa-review` : **3/3 à 1,00** (toutes les grilles, pièges + `d*`).
- `03-declaration-creance` (mesuré seul juste avant, après correctif des commandes) :
  **3/3 à 1,00**.
- `02-distress-cedant` : le matin, bloqué par la question de `check-pii` (depuis
  **retiré du plugin**, avec la gate d'anonymisation de `cas` et le mode Anno
  Desktop — décision produit 2026-09-25). Relancé l'après-midi : **3/3 à 1,00**
  (2,10 $, 10 min). Traces : passage 3 sans aucun appel Légifrance (dit
  honnêtement dans la note du relecteur) — variabilité à surveiller sur les autres
  cas ; passage 1 : 16 articles refusés au format `L. 611-3` → défaut n°6 ci-dessous.
- `04-dd-pe-red-flags` : **3/3 à 1,00** (2 passages notés l'après-midi, le 3e coupé
  par la limite à la notation puis refait seul ; 3,53 $ + 1,34 $).
- `05-neg-rupture-conventionnelle` : **3/3 à 1,00** (0,35 $) — aucun skill DA déclenché,
  réponse jugée utile.
- **A TERMINÉ le 2026-09-25 : les 5 cas à 1,00** (~16 $ sur la journée, dont une
  partie perdue aux limites de forfait).
- **Tendance vue 2 fois** (distress passage 3, dd-pe passage refait) : aucun appel
  Légifrance, « dossier fictif » invoqué dans la note du relecteur. Cause probable :
  la bannière « Dossier strictement fictif » ajoutée en tête des prompts pour
  `check-pii` (absente des prompts de scoring, où les textes étaient vérifiés).
  → bannière retirée des 4 prompts + règle « Dossier fictif : les faits sont
  inventés, le droit ne l'est pas » dans le CLAUDE.md du plugin (§4) (9fbd7a1).
  **Contrôle** (`02`, 1 passage, 0,67 $) : 1,00, Légifrance appelé, 12 articles
  vérifiés **du premier coup** (confirme aussi le défaut n°6 corrigé). À surveiller
  sur les passages suivants (un seul passage ≠ preuve). Détail : BODACC interrogé
  sur le SIREN fictif (« aucune procédure ») — sans effet, laissé de côté.

### Défauts réels trouvés par l'éval de bout en bout (tous corrigés, sur main)

1. **Fichiers de référence introuvables** (22 skills) : chemins `references/…`
   résolus depuis le dossier du skill → `${CLAUDE_SKILL_DIR}/../../references/…`
   (738811e).
2. **Identifiants PISTE introuvables quand HOME est détourné** (bac à sable éval,
   lanceurs GUI) → repli sur le vrai dossier personnel (`os.userInfo()`),
   module `packages/core/src/credentials-path.ts` (8bc6159).
3. **Défaut dormant `dotenv` 17** : écrivait sur stdout = corruption du JSON-RPC
   MCP ; activé au prochain rebuild → `quiet: true` + test (9b8f6ee). Serveur
   compilé DA reconstruit (9dd55a2).
4. **Déclarations rendues en version épurée par défaut** (sans note ni marqueurs,
   citations non vérifiées affirmées) : `declaration-creance` et
   `declaration-cessation-paiements` → version interne par défaut (a9ee134).
5. **Commandes `/h-da:` qui ne chargeaient pas le skill** (coquilles minces, même
   description que le skill) → corps explicatif qui fait charger
   `hacienda-droit-affaires:<skill>` ; une version impérative avait été prise pour
   une injection (733b33f). Mesure : 3/3.
6. **`legifrance_get_article` refusait `L. 611-3`** (format courant, et même
   l'exemple de sa propre description) → « Article introuvable », le modèle devait
   tout redemander au format `L611-3`. Numéro normalisé (`normalizeArticleNum`,
   `packages/core/src/codes-legitext.ts`) + tests ; serveur DA reconstruit, vérifié
   en réel. PI/SO en bénéficieront à leur prochaine reconstruction.
7. **Faux « vérifié »** (éval B 01, 03) : étiquettes `[Légifrance]` en dur dans les
   SKILL.md et règles « présent dans l'index → `[Légifrance]` » recopiées comme preuve.
   Règle CLAUDE.md §2 « vérifié = lu dans cette session » (0c26ecb), balayage des
   22 skills (PR #69), règles d'index des post-flight réécrites (ed5202c). Contrôle
   scripté : `evals/check-verified-citations.mjs <trace.jsonl>`.
8. **Jeton OAuth PISTE demandé en parallèle** → échecs « invalid_client » : une seule
   demande partagée + un nouvel essai (PR #70).
9. **Articles `ABROGE_DIFF` introuvables** (L441-10/11 C.com., en vigueur jusqu'au
   2027-01-01) : repli par `/search` + `getArticle` (PR #71, corrigé en réel : borne
   après filtrage des statuts morts, LEGITEXT via `textTitles`). Limite : L441-9.
10. **Recherche `/search` non déterministe figée en cache** : repli sans cache + second
   essai (04eac2b). Réflexe : tester le serveur DA à la main avec `CLAUDE_PLUGIN_ROOT`
   défini (cache `plugins/hacienda-droit-affaires/.cache`, comme l'éval).
11. **Articles cités sans être lus** (Légifrance lu 17/4/0 fois selon le passage) :
   étape de lecture des articles clés dans `declaration-creance` (4 bis) et
   `distress-cedant` (1 bis) ; tout article du tableau cité est lu, note à deux lignes
   « lus » / « cités non lus » (bf4da51). Contrôle 02 du 2026-09-29 : 10 cités = 10 lus.

Autres corrections de la période : `distress-cedant` (cohérence cessation des
paiements / sauvegarde, caution signalée sans analyse — cd4a29f) ;
`responsabilite-dirigeant` (L.626-11 au texte, caution en RJ : suspension des
poursuites oui, arrêt du cours des intérêts non, bénéfice du plan selon date
d'ouverture ±1er oct. 2021 — **confirmé par l'avocat de Candy** ; marquage des
citations non vérifiées) ; description du plugin rafraîchie (fb5632b).

### PISTE (Légifrance + Judilibre) opérationnel

Identifiants dans `~/.config/Hacienda/credentials.json` (Mac de Candy). Vérifié en
usage réel (session neuve : lecture de L.622-24 en vigueur) et dans l'éval.
Le serveur lit la config **au démarrage** : nouvelle session après tout changement.

### B — `01-spa-review` FAIT (2026-09-25 soir, 3,43 $, 6 passages)

Avec 1,00 / sans 0,83 / **Δ +0,17**. Tout le Δ vient de **d1 citations signalées
(3/3 vs 0/3)** et d3 statut brouillon (3/3 vs 2/3, écart fragile : le sans-plugin
s'adresse à « l'associé » sans dire « brouillon »). Les 4 pièges + d2/d4/d5 : 3/3 des
deux côtés — Sonnet nu repère déjà les pièges de ce cas.

**DÉFAUT TROUVÉ, fix étapes 1-3 FAITES (non commitées) : faux « vérifié ».** Trace vs
réponse : passage 2 déclare 1130/1137 « vérifiés en vigueur » sans aucun appel ;
passage 3 écrit « art. 1591 … (vérifiés en vigueur) » sans avoir lu 1591 ; passage 1
ouvre sur « Toutes les citations sont vérifiées » puis avoue 1130/1137 non interrogés.
d1 ne le voit pas (juge le texte, pas la trace).
Cause : étiquettes `[Légifrance]` en dur dans le corps des SKILL.md (spa-review l.192-323,
dont 1130/1137 l.289), recopiées comme preuve ; gabarit « Sources : Légifrance ✓ »
(CLAUDE.md plugin §2 l.118, spa-review l.128) confond base connectée / article lu.
**Plan validé par Candy (« traite le ») :**
1. CLAUDE.md plugin §2 : règle « ✓ / vérifié = article lu par un appel outil dans
   CETTE session ; tout le reste `[à vérifier]` ; une étiquette dans le skill n'est
   pas une vérification » ; note Sources = liste des articles réellement lus.
2. spa-review SKILL.md : retirer les `[Légifrance]` en dur (10) + ajuster l.128.
   Puis même balayage sur les 21 autres skills (≈150 occurrences, `grep -rc
   '\`\[Légifrance\]\`' skills/*/SKILL.md`) = la tâche « citations marquées
   [Légifrance] à tort » ci-dessous.
3. Script `evals/check-verified-citations.mjs <trace.jsonl>` : compare les
   « vérifié » de la réponse finale aux `legifrance_get_article` de la trace.
   Traces de test (tant qu'elles existent) : /private/tmp/e-wxZwvy, e-Ctotl1,
   e-QqczE9 (bras avec plugin).
4. Relancer A sur 01 (1 passage, ~0,80 $) pour contrôle, puis passer le script sur la trace.
**État :** 1 (CLAUDE.md §2 règle « vérifié = lu dans cette session » + gabarit Sources),
2 pour spa-review seulement (10 étiquettes retirées, gabarit, étape 11), 3 (script testé :
retrouve les 3 défauts + 1 nouveau, L.2312-37 « vérifié » non lu au passage 3 ; heuristique,
1 cas limite L.23-10-1 « s. »). npm test / branding / diff --check OK. **Contrôle 4 FAIT** (0,69 $) : 1,00,
12 articles lus dont 1130/1137, note « articles lus dans cette session : … — autres `[à vérifier]` »,
script : aucune citation dite vérifiée sans lecture. Balayage des 21 autres skills : PR #69 (session cloud + complément règle d'index), fusionnée 2026-09-28.
**Contrôle 03-declaration-creance (2026-09-28, 1,00 $) : score 1,00 MAIS le script trouve 4 faux
« vérifié »** (L.622-28, L.622-29, L.624-16, 1231-5 étiquetés `[Légifrance]` + LEGIARTI recopié de l'index,
0 appel `legifrance_get_article`). Cause : règle « présent dans l'index → `[Légifrance]` » dans les
post-flight de 6 skills (declaration-creance, mise-en-demeure, defense-/responsabilite-dirigeant,
declaration-cessation-paiements, prevention-difficultes) → corrigée. Script : faux positifs n° de
facture/années retirés. **Relance 03 (1,06 $) : 1,00, script 0 faux « vérifié »** — confirmé. MAIS aucun
`legifrance_get_article` : les articles sont cités sans marquage individuel, la note renvoie seulement
à « lancer `verifier-citations` sur la version finale ». Le post-flight « appel automatique » de
declaration-creance ne s'exécute pas → prochaine piste (faire lire les articles clés, ou marquer
explicitement « articles non vérifiés en session » dans la note).
→ **Étape 4 bis ajoutée (1daed54). Contrôle 03 (1,04 $) : 1,00, 10 articles lus, 0 faux « vérifié ».**
**Deux défauts serveur vus dans la trace (non corrigés) :** (a) 3 appels `legifrance_get_article`
en échec « Échec de l'authentification PISTE (HTTP 400) invalid_client » au début, réussis au
retry — probable course sur l'obtention du jeton OAuth quand plusieurs appels partent en parallèle ;
(b) `L441-10` Code de commerce → « Article introuvable » (2 fois), alors que l'article existe.
→ **Corrigés et fusionnés (2026-09-28)** : PR #70 (jeton OAuth partagé + pas de cache sur « introuvable »)
et PR #71 (repli `ABROGE_DIFF`). Cause réelle de (b) : L441-9/10/11 C.com. sont au statut **`ABROGE_DIFF`**
(en vigueur jusqu'au **2027-01-01**), que `getArticleWithIdAndNum` ne renvoie pas. Repli vérifié en réel de
bout en bout (serveur DA) : L441-10 et L441-11 trouvés avec « ⚠️ Abrogation différée ». **Limite** : L441-9
reste introuvable (sa version 2019→2027 absente de `/search` ; piste : table des matières du code).
Script `scripts/diagnose-legifrance-article.mjs` pour rejouer.
**Complément PR #72 (fusionnée 2026-10-05, 01448eb)** — revue Sourcery de #71 : le repli
ne confirmait que 5 candidats `/search`, même après filtrage des statuts morts ; un numéro
présent dans plus de 5 autres codes avant le code cible pouvait donc être écarté à tort
(« introuvable »). La confirmation couvre désormais toute la page `/search` (20 résultats,
toujours borné : 1 `/search` + 20 `/consult/getArticle` au plus). Test de régression
(8 versions VIGUEUR d'autres codes avant la version ABROGE_DIFF). Serveur DA reconstruit.
**Point de fond pour l'avocat de Candy** : L441-9 à L441-11 (délais de paiement, pénalités, indemnité 40 €)
réécrits au 1er janvier 2027 (une version `VIGUEUR_DIFF` de L441-9 existe déjà) ; texte modificatif
`[à vérifier]`. Impacte `cgv-generator`, `mise-en-demeure-commerciale`, `declaration-creance`.

### B — `02-distress-cedant` FAIT (2026-09-28, 3,18 $, 6 passages)

Avec 1,00 / sans 0,89 / **Δ +0,11**, entièrement porté par **d1 citations signalées (3/3 vs 0/3)** :
sans plugin, 9 à 12 articles cités sans aucune mention de vérification. Les 5 pièges + d2/d3/d4
(escalade Me Verdière) : 3/3 des deux côtés.
Script `check-verified-citations` sur les 3 passages avec plugin : **0 faux « vérifié »** (après
correction de 2 faux positifs du script : « L.611 s. » = série, « ord. 2014-326 » = n° de texte).
Variabilité Légifrance : passage 1 = 17 articles lus (+ `verifier-citations` chargé), passage 3 = 4,
**passage 2 = aucun** (honnête : « Légifrance ✗ non interrogé », tout en `[à vérifier]`).
→ piste : étape « lecture des articles clés » comme dans `declaration-creance` (étape 4 bis).
**Erreur de fond du bras sans plugin (non notée par les critères)** : « en RJ, cette protection
n'existe pas pour la caution (L622-28 ne la prévoit que pour la sauvegarde), les créanciers peuvent
poursuivre M. Tessier » — contraire au point confirmé par l'avocat (caution en RJ : suspension des
poursuites oui). Argument de valeur qualitatif, à faire valider.

### B — `03-declaration-creance` FAIT (2026-09-29, 5,10 $, 6 passages, 28 min)

Avec 1,00 / sans 0,93 / **Δ +0,07**, porté par **d1 (3/3 vs 1/3)**. Le d1 PASS du passage 1 sans
plugin est probablement une indulgence du juge (6 articles cités, aucune mention de vérification des
textes ; seul le taux d'intérêt est « à vérifier ») → Δ réel sur d1 vraisemblablement 3/3 vs 0/3.
Les 6 pièges + d2/d3/d4/d5 : 3/3 des deux côtés. Coût plus élevé (1,07-1,50 $ par passage avec plugin :
l'étape 4 bis lit 11-13 articles).
**Défaut trouvé et corrigé (04eac2b, non poussé)** : L441-10 de nouveau « introuvable » dans les 3 passages
malgré PR #71. Cause : `/search` NUM_ARTICLE non déterministe, une réponse sans la version ABROGE_DIFF
mise en cache dans `plugins/hacienda-droit-affaires/.cache` (cache utilisé sous `CLAUDE_PLUGIN_ROOT`, ≠
`~/.cache/Hacienda` des tests à la main). Recherche du repli désormais non mise en cache + second essai.
Vérifié en réel avec le cache du plugin : L441-10/L441-11 trouvés 3/3. Conséquence dans les passages :
« art. L.441-10, II et D.441-5 `[Légifrance]` » — étiquette groupée couvrant L441-10 non lu (limite).
Script : limites connues (série « L.622-24 à L.622-27 », dénégation placée avant l'article).
**Réflexe** : pour tester le serveur DA à la main comme l'éval, définir `CLAUDE_PLUGIN_ROOT`.

### B — `04-dd-pe-red-flags` FAIT (2026-09-29, 6,95 $, 6 passages) — **B TERMINÉ**

Avec 1,00 / sans 1,00 / **Δ 0,00**. Les 10 critères passent 3/3 des deux côtés. d1 passe sans plugin
parce que les 3 réponses **ne citent aucun article** (règle « aucun article cité → PASS ») : ce cas de
DD factuelle ne mesure pas la traçabilité des sources. Avec plugin : 3-4 articles cités et lus
(CPI L.113-9, L.131-3 ; 1104 C.civ.), script 0 faux « vérifié ».
**Tendance « dossier fictif » revue (passage 3 avec plugin)** : aucune base interrogée, Légifrance
comprise, « le dossier étant explicitement fictif… sans objet » — malgré la règle CLAUDE.md §4 ; le
prompt du cas dit « Dossier ci-dessous (fictif) ». Sans effet ici (aucun article cité), 1/3.

**Synthèse B (4 cas, ~18,6 $)** : Δ +0,17 / +0,11 / +0,07 / 0,00. Sonnet nu évite **tous** les
pièges des 4 cas ; le Δ mesuré vient uniquement de d1 (citations signalées), + d3 fragile sur 01.
Les valeurs non notées par les grilles : lecture réelle des textes (10-17 articles lus quand l'étape
existe), défauts serveur trouvés en chemin (faux « vérifié », ABROGE_DIFF, cache), et une erreur de
fond du bras nu sur 02 (caution en RJ). → Pour un argument de valeur plus fort : critères qui
vérifient l'exactitude du droit cité (ex. caution en RJ), pas seulement les pièges du dossier.

## Ouvert / prochaines pistes (droit-affaires)

- Plus d'abonnement Codex (2026-09-25) : tâches mécaniques → sous-agent Sonnet,
  relu par la session principale. Le protocole blind Codex n'est plus exécutable tel quel.
- `plugins/registry.json` : liste des skills DA incomplète (19/31), à réconcilier.
- **B terminé** (4 cas, 2026-09-25 → 29) — voir synthèse ci-dessus.
- **Wording ghost** : `[review]` dans `README_UTILISATEUR.md` (section
  Confidentialité) — Candy y réfléchit.
- **Étape de lecture des articles** : faite pour `declaration-creance` et
  `distress-cedant`. À étendre aux autres skills qui citent beaucoup de textes
  (`spa-review`, `gap-review`, `mise-en-demeure-commerciale`, `cgv-generator`…) si
  les contrôles le justifient. Non vu encore : la ligne « Articles cités non lus :
  aucun » (absente quand tout a été lu — à vérifier le jour où un article reste non lu).
- **Pour l'avocat de Candy** (non tranché, `[à vérifier]`) : (1) L441-9 à L441-11 C.com.
  (délais de paiement, pénalités, indemnité 40 €) réécrits au 1er janvier 2027 — texte
  modificatif à identifier ; impacte `cgv-generator`, `mise-en-demeure-commerciale`,
  `declaration-creance`. (2) Argument de valeur : sur B 02, le bras sans plugin affirme
  qu'en RJ la caution n'est pas protégée (contraire au point confirmé par l'avocat).
- **Grilles d'éval** : le Δ B ne mesure que d1 ; ajouter des critères d'exactitude du droit
  cité (ex. caution en RJ) pour un argument de valeur plus fort.
  → **Cas `06-caution-rj` rédigé (2026-10-06), NON LANCÉ** : 5 critères d'exactitude
  (e1-e5) à réponse de référence écrite + d1-d3. **En attente de validation avocat**
  (e4 holding personne morale, e5 liquidation ; e1-e3 à reconfirmer sur ce dossier) :
  `docs/backlog/eval-06-caution-rj-validation-avocat.md`. Règle : critères figés avant
  lancement. Puis (1) A Sonnet + plugin, (2) `--model opus` avec/sans, ne garder que le
  bras sans plugin → **Sonnet + plugin contre Opus nu**. Pistes suivantes : cas « droit
  qui change » (L441-10 ABROGE_DIFF), cas « registre réel » (forclusion depuis une vraie
  publication BODACC).
- **Script `check-verified-citations`** : limites connues (série « L.622-24 à L.622-27 »,
  dénégation placée avant l'article) → relire chaque écart.
- **Tâche proposée, non lancée :** masquer le jeton OAuth dans `piste_status`
  (`packages/core/src/tools/status.ts`, `bodyPreview`).
- `fonds-pe-fr-triage` (#7) : différé.

## En pause (ne pas toucher)

- PI et Sources officielles, y compris la reconstruction de leurs serveurs
  compilés (en retard sur `packages/core`, ajouteraient des outils BODACC imprévus).

## Réflexes scoring (mémoire)

- Lire le **rapport backlog** `docs/backlog/da-scoring-<skill>-<CODE>.md`, pas le seul JSON.
- **Code de cycle = 6 caractères**. **Release sur gate-clean** ; spot-checker les FAIL.
- **Module depth ≠ live depth** — hypothèse : en partie expliqué par le défaut n°1
  (modules jamais lus), à revérifier maintenant que les chemins sont corrigés.
- **Candy pilote les runs Codex** ; les évals `claude plugin eval` consomment son
  forfait Claude Pro → toujours annoncer le coût et étaler.
