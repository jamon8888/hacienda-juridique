# Prompt — Reprise de session Claude Code

> Usage : copier le bloc ci-dessous dans le premier message d'une nouvelle session Claude Code (Claude Cowork ou CLI) pour reprendre le dev de `hacienda-droit-affaires` sans re-expliquer le contexte.
>
> Phase courante : **PR #16 ouverte** — V2a livrée et intégrée, en attente de review associé. Étape 2 (spa-review Codex) exécutable en parallèle.

---

```text
Reprise du projet hacienda-droit-affaires — PR #16 en review (Hacienda — repo jamon8888/hacienda-juridique).

ÉTAT DU PROJET

Plugin hacienda-droit-affaires v2a intégré et pushé sur la branche
droit-affaires/v1-to-v2a-consolidated. PR ouverte :
https://github.com/jamon8888/hacienda-juridique/pull/16

Ce qui est dans la PR :
- 19 skills (M&A, procédures collectives, contrats commerciaux, vie sociale)
- 4 agents (bodacc-watcher, bodacc-procedures-watcher, echeances-societaires, veille-jurisprudence)
- MCP server stdio déclaré
- Enregistré dans plugins/registry.json + .claude-plugin/marketplace.json racine
- Conforme au contrat Plugin Factory (validation humaine dans tous les skills,
  [à vérifier] dans tous les skills, limites opérationnelles dans les agents,
  CLAUDE.md migré company-profile, .mcp.json avec command + args)
- Tests : 68/70 verts. 1 échec pré-existant hors scope :
  hacienda-pi-cowork-structure (PISTE OAuth 401, credentials absents en env de test).

Méthode d'intégration employée (pour comprendre l'historique) :
Rebase multi-commit abandonné (~15 conflits avec les nettoyages de l'associé
côté origin/main). Stratégie propre : reset sur origin/main + copie bloc du
plugin depuis tag backup/droit-affaires-v2a-before-rebase. 0 conflit, 101
fichiers en 1 commit.

Contexte essentiel — lire dans CET ordre avant toute action :
1. CLAUDE.md (racine du repo) — conventions Hacienda + GitNexus obligatoire
2. plugins/hacienda-droit-affaires/CLAUDE.md — profil cabinet + garde-fous du plugin
3. docs/superpowers/specs/2026-05-26-hacienda-droit-affaires-v2a-design.md — design V2a livré
4. docs/superpowers/plans/2026-05-26-hacienda-droit-affaires-v2a.md — plan V2a exécuté
5. docs/superpowers/specs/2026-05-26-hacienda-droit-affaires-spa-review-design.md — spec étape 2 (Codex review)
6. docs/superpowers/plans/2026-05-26-hacienda-droit-affaires-spa-review.md — plan étape 2

SÉQUENÇAGE DES ÉTAPES

Étape 1 — FAITE : Rebase + intégration + PR ouverte (#16) sur main.

Étape 2 — EN COURS (exécutable maintenant, en parallèle de la review PR) :
Codex spa-review — revue systématique des skills droit-affaires (guardrails,
cohérence inter-skills, couverture légale). Specs et plan déjà prêts (voir ci-dessus).
Résultat : 2e PR petite OU intégrée à la PR #16 si pas encore mergée.

Étape 3 — BLOQUÉE sur merge PR #16 :
V2b distribution — intégrer droit-affaires à anno-distribution.ts +
migration profil-cabinet → company-profile. Plus simple qu'on pensait car
anno = ghost, et ghost guide l'utilisateur via ses propres plugins. Notre
droit-affaires fait déjà son propre check-pii (pattern différent mais même intention).

Étape 4 — APRÈS V2b livré :
Update brief frère pour pointer spa-review + envoi plugin + briefs aux 2 personas :
- Frère — managing partner cabinet M&A (rare, beaucoup de travail).
  Brief calibré ~1h30 : docs/personas/frere-test-brief.md
- Ami — indépendant droit des sociétés / entreprises en difficulté.
  Brief : docs/personas/ami-test-brief.md

POINTS DE CONTEXTE IMPORTANTS

anno vs ghost :
"anno" (= le projet anonymisation) s'appelle en réalité ghost. "anonymisation"
prend un seul "n" (anon, pas anno) — coquille existante dans le repo, pas notre
PR à corriger. L'anno-awareness des skills PI est essentiellement : être écrits
pour bien guider l'usage de ghost. Notre droit-affaires fait ça via check-pii
avec lead magnet inversé (skill utile seul, révèle ghost si besoin d'aller plus loin).

Lead magnet inversé check-pii :
Apport propre de droit-affaires, apprécié par l'associé. Extension aux autres
plugins hacienda est une idée validée mais hors scope de notre PR.

Registre source de vérité :
plugins/registry.json est la source de vérité Plugin Factory (pas marketplace.json).
Le test hacienda-plugin-contract lit registry.json pour valider la structure de
chaque plugin déclaré.

GitNexus :
Index probablement stale après le gros commit. Si un outil GitNexus avertit
que l'index est stale : npx gitnexus analyze (ou npx gitnexus analyze --embeddings
si meta.json montre stats.embeddings > 0).

PROCHAINE ACTION ATTENDUE

1. Lire les specs de l'étape 2 (spa-review) :
   docs/superpowers/specs/2026-05-26-hacienda-droit-affaires-spa-review-design.md
2. Me proposer comment on l'exécute (subagent Codex ? direct ici ?)
3. Attendre ma validation avant de lancer

DÉCISIONS FIGÉES (NE PAS REDISCUTER)

- La PR #16 cible main. L'associé fait la review ; ne pas modifier le contenu du
  plugin sans qu'il demande des changements.
- V2b distribution : chantier séparé, commence après merge PR #16.
- Le test PISTE OAuth 401 est pré-existant (PI plugin, credentials absents) —
  pas notre bug, pas à corriger dans cette PR.
- Sonnet 4.6 effort normal suffit pour l'étape 2 (scripting/linting systématique).
  Opus uniquement si révision de substance juridique.

Si tu hésites sur quelque chose qui touche au produit : NE TRANCHE PAS SEUL, demande.
Si tu hésites sur l'implémentation : trancher seul si la spec a la réponse, sinon demander.
```
