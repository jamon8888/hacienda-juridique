# Handoff — état courant (entrée de session)

**Dernière mise à jour :** 2026-09-25
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
- `02-distress-cedant` run 1 : **pas un échec de fond** — le skill s'est chargé, puis
  `check-pii` a posé sa question (continuer / ne plus demander / installer ghost)
  malgré la mention « dossier fictif » ; la réponse s'arrête là, d'où les FAIL. Runs
  2-3 et cas 03-05 : coupés par la limite (`grader threw` / `exit 1`), sans valeur.
- **À faire** : relancer uniquement `02`, `04`, `05` (`--case`), un par créneau.
- **Point ouvert (décision Candy)** : `check-pii` interrompt même un dossier déclaré
  fictif. Déjà vu au pilote. Soit on accepte (comportement voulu en Cowork, l'éval
  en un seul tour ne peut pas répondre), soit `check-pii` ne pose plus la question
  quand l'utilisateur déclare explicitement le dossier fictif.

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

## Ouvert / prochaines pistes (droit-affaires)

- **Finir A** : `02-distress-cedant`, `04-dd-pe-red-flags`, `05-neg-…` (un `--case`
  par créneau) + trancher le point `check-pii` ci-dessus.
- **B, un cas par session**, dans l'ordre : spa-review → distress-cedant →
  declaration-creance → dd-pe. Spot-checker chaque écart avant de conclure.
- **Wording ghost** : `[review]` dans `README_UTILISATEUR.md` (section
  Confidentialité) — Candy y réfléchit.
- **Tâches proposées, non lancées :** citations marquées `[Légifrance]` à tort dans
  ~15 skills DA ; masquer le jeton OAuth dans `piste_status`
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
