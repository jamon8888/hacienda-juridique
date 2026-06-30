# Backlog — Scorer Phase 4 : faux négatifs sur grilles denses (diagnostic + plan de fix)

**Date diagnostic :** 2026-06-29 (session closing-pe / CLOPE1-3)
**Statut :** **Fix A + B exécutés** le 2026-06-30 (branche `fix/scorer-phase4-preuve`). Fix C = politique déjà en place.
**Branche :** `fix/scorer-phase4-preuve` (depuis `main` post-#66).

---

## Symptôme

Le scorer Codex Phase 4 (`phase4-criteria`) marque des critères **FAIL alors que le
contenu attendu est présent verbatim** dans `live-output.md`. Reproduit sur 3 passes
indépendantes du cycle closing-pe (CLOPE1/2/3) — donc **pas du bruit** :
- **C-043** (registre BidCo) : présent mot pour mot (`live-output.md` P-02 : « Inscription
  RMT BidCo + comptes Alturas III + rollover Kervran + managers — absent du protocole 🔴 »)
  mais FAIL ×3.
- C-042 idem (FAIL faute du mot « débit »). 8/8 MAJEUR FAIL sondés contenaient le sujet.
- Effet : score agrégé effondré (CLOPE3 = 0,28 / majeur 0,35) **gate-clean** — score ininformatif.

## Root cause (établie, pas devinée)

**Ce n'est PAS un bug d'assemblage du prompt.** `scripts/codex-blind-scoring.py`
`cmd_phase4_criteria` lit `live-output.md` **intégralement** (`live_path.read_text()`) et
l'injecte verbatim dans le template `## Phase 4 criteria — Scoring tiered-gated`
(`docs/methodology/codex-prompt-templates.md`) entre des `---`. Le scorer reçoit tout.

Le faux négatif = **erreur de lecture du LLM sous charge**, avec **deux failles structurelles
du tooling** qui la rendent plus probable ET indiagnostiquable :

1. **Pas de citation forcée ni persistée.** Le template demande « un verdict + une
   justification citant le passage », mais le bloc JSON contraignant n'impose que
   `{id, niveau, verdict}`, et `scripts/extract-verdicts.py` **jette** toute autre clé
   (reconstruit `{id: verdict}`). Le scorer peut donc rendre un `FAIL` **nu**, sans jamais
   localiser de passage, et c'est inauditable a posteriori. Forcer une citation par verdict
   est l'anti-hallucination standard (oblige à regarder) ; ici on ne la force pas et on la jette.
2. **Charge par passe excessive.** 50 critères hyper-conjonctifs en **une seule passe**, avec
   ~60 % du prompt consacré aux règles de format JSON → la lecture fine est écrasée. Le spec
   visait ~25.

> Limite inhérente : on ne « répare » pas la lecture de Codex en code, et l'A/B-test exige de
> relancer Codex (commandes lancées par Candy). Mais les deux failles structurelles sont
> corrigeables et **déterministiquement testables** (fix A).

## Plan de fix

### Fix A — Forcer + persister une « preuve » par verdict (haut levier, testable sans Codex)

1. **Template** `docs/methodology/codex-prompt-templates.md`, section
   `## Phase 4 criteria — Scoring tiered-gated` :
   - Passer l'objet verdict de 3 à **4 clés** : `{"id","niveau","verdict","preuve"}`.
   - Règle `preuve` : pour un **PASS**, courte citation (≤ ~15 mots) du livrable qui établit le
     critère ; pour un **FAIL**, soit la phrase du livrable qui le contredit, soit le mot
     `absent` si le livrable ne traite pas le point. **Un FAIL dont la `preuve` est une citation
     réelle du livrable traitant le point = signal d'auto-contradiction à revoir.**
   - Mettre à jour le bloc d'EXEMPLE EXACT pour inclure `preuve`.
2. **`scripts/extract-verdicts.py`** : `parse_verdicts` renvoie aujourd'hui `{id: verdict}` —
   le faire préserver `preuve` (ex. `{id: {"verdict":..., "preuve":...}}`), et l'écrire dans
   `verdicts-<code>.json` à côté de `verdict`. Conserver le fallback table markdown (preuve
   vide si absente). Niveau toujours repris du ground-truth (autoritatif) — inchangé.
3. **`scripts/tiered_scoring.py`** : **aucun changement** — `load_verdicts` ne lit que
   `id/niveau/verdict` (vérifié l.75), il ignore les clés en plus.
4. **Test** (TDD, déterministe, pas de Codex) :
   - round-trip : un bloc `===VERDICTS_JSON===` avec `preuve` → `extract-verdicts` conserve
     `preuve` dans le JSON écrit ;
   - régression : `tiered_scoring.aggregate` sur un verdicts avec `preuve` donne le même
     gate/score qu'avec 3 clés (clé ignorée) ;
   - vérifier le test existant des scripts scoring (chercher sous `packages/core/test` ou
     `scripts/`/`test`) et y ajouter ces cas.

### Fix B — Borner la densité de grille (réduit la charge)

- Template `## Phase 2 criteria — Vérité terrain criteria atomiques` : instruire **20-30
  critères max** ; privilégier les critères discriminants (pièges, gates) ; ne pas fragmenter
  un même point en multiples sous-items conjonctifs. N'affecte que les grilles futures.
- Alternative plus lourde : batcher le scoring phase4 par lots de ~25 critères.

### Fix C — Releaser sur gate-clean (déjà la politique)

Le gate (peu de CRITIQUE, binaire, vérifiable à la main) résiste au bruit du scorer ; le score
agrégé sur grille dense, non. Documenté — rien à coder.

## Garde-fou opérationnel (en attendant le fix)

Toujours **spot-checker les FAIL contre `live-output.md`** (lecture au fond) avant de conclure
à un déficit skill. Voir mémoire `feedback-phase4-scorer-false-negatives`.

## Fichiers concernés

- `docs/methodology/codex-prompt-templates.md` (templates Phase 4 criteria + Phase 2 criteria)
- `scripts/extract-verdicts.py`
- `scripts/tiered_scoring.py` (lecture seule — confirmer inchangé)
- test des scripts scoring (à localiser)
- `scripts/README-codex-blind-scoring.md` (documenter la clé `preuve`)
