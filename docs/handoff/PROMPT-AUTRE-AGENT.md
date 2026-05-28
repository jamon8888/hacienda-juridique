# Prompt — Reprise par un autre agent de coding

> Usage : copier le bloc ci-dessous dans le premier message d'une nouvelle session avec un autre agent (Cursor, Aider, Windsurf, GPT-5 via API, Gemini, etc.) pour reprendre le dev de `hacienda-droit-affaires` sans re-expliquer le contexte.
>
> Plus défensif que le prompt Claude car les autres agents n'ont pas accès aux skills `superpowers:*` ni à la mémoire des conventions Hacienda.
>
> Phase courante : **V1.1** (V1 livrée en v0.1.0, tests personas en cours en parallèle).

---

```text
Tu reprends le projet hacienda-droit-affaires — phase V1.1 (repo hacienda-juridique).

ÉTAT DU PROJET
- V1 (v0.1.0) livrée et complète : 9 skills, 3 agents, 5 references, MCP wrapper, datasets de test. Tous les checks verts.
- V1 est en cours de validation par 2 personas réels. Cette validation gate le bump v1.0.0.
- V1.1 se développe EN PARALLÈLE des tests personas : 6 skills additifs, 2 clusters.
- Dev solo en local pour l'instant (harmonisation avec l'associé prévue plus tard).

CONTEXTE PROJET
- Plugin Hacienda pour cabinets droit des affaires français
- Architecture : monoplugin consommant packages/core (Légifrance via PISTE, Pappers, BODACC, Judilibre, Eurlex, BOFiP, BOSS)
- Credentials unifiés via ~/.config/Hacienda/credentials.json
- 2 personas testeurs réels : frère (cabinet M&A, managing partner, rare) + ami (indépendant, spécialité entreprises en difficulté, couvre tout le droit des sociétés, plus disponible)
- Plugin compagnon : hacienda-ghost (anonymisation PII), conversion via skill check-pii

DOCUMENTS À LIRE EN PREMIER (ordre obligatoire)
1. CLAUDE.md (racine) — conventions Hacienda + règles GitNexus
2. AGENTS.md (racine) — instructions globales
3. docs/superpowers/specs/2026-05-20-hacienda-droit-affaires-v1.1-design.md — design figé V1.1 (spec ACTIVE)
4. docs/superpowers/plans/2026-05-20-hacienda-droit-affaires-v1.1.md — plan V1.1 step-by-step
5. docs/handoff/latest.md — état au dernier arrêt (dernière task, prochaine, blockers)
6. docs/superpowers/specs/2026-05-18-hacienda-droit-affaires-design.md — design V1 (référence, déjà livré)
7. plugins/hacienda-droit-affaires/skills/ — skills V1 livrés, modèle de format à imiter

CONTRAINTE DIRECTRICE V1.1 — PARALLÉLISME SÛR (non-négociable)
- Mode strictement additif sur main : V1.1 n'AJOUTE que des fichiers neufs.
- INTERDIT de modifier un skill V1, un agent V1, ou packages/core tant que les personas testent.
- Exception unique : un bug V1 remonté par un persona se corrige immédiatement sur main, priorité absolue.
- Un skill V1.1 n'atterrit sur main que COMPLET et testé en interne — jamais de demi-skill.
- Workspaces de dossier : HORS V1.1 (chantier post-personas).

PÉRIMÈTRE V1.1 — 6 skills, 2 clusters
- Cluster vie sociale (validé par l'ami) : pacte-associes-review, constitution-societe, gouvernance-ag
- Cluster M&A deal-lifecycle (validé par le frère) : loi-term-sheet, due-diligence-dataroom, closing-checklist-fr
- Ordre : cluster ami D'ABORD, puis cluster M&A.

PRINCIPES NON-NÉGOCIABLES
- Le plan est la source de vérité. Tout ce qui n'y est pas = pas dans V1.1.
- Commits fréquents ; un skill = un commit complet.
- Format skills calqué strictement sur les skills V1 existants dans plugins/hacienda-droit-affaires/skills/ : frontmatter YAML / disclaimer / examples / Chargement profil / Intake / Étapes / Sortie (note du relecteur 5 champs en gras / arbre de décision 5 options / footer A PII en lien Markdown).
- Aucune position juridique inventée — tout article cité doit être vérifiable ; article hors index → tag [a verifier].
- Branding strict Hacienda — JAMAIS réintroduire références à claude-for-legal, Harvey, Legora, ni références juridiques US/common law.
- Confidentialité absolue : aucun secret dans .mcp.json ou CLAUDE.md, secrets uniquement dans ~/.config/Hacienda/credentials.json (mode 0600).

GITNEXUS — utilisation obligatoire
Le repo est indexé par GitNexus.
- En V1.1, on ne modifie PAS packages/core (additif pur). Avant chaque commit : vérifier qu'aucun fichier V1 ni core n'est touché.
  → mcp__gitnexus__detect_changes()
- Pour explorer le code : préférer GitNexus query au grep.
  → mcp__gitnexus__query({query: "concept ou symptôme"})
- Pour comprendre un symbole : mcp__gitnexus__context({name: "nomSymbole"})
- Si l'index est stale : npx gitnexus analyze

Si ton agent n'a pas accès aux outils MCP GitNexus : applique manuellement la discipline (git status + git diff avant chaque commit pour confirmer le périmètre additif).

WORKFLOW POUR CONTINUER
1. Lis les 7 documents listés ci-dessus
2. Identifie la dernière task V1.1 complétée : git log --oneline -10 + cat docs/handoff/latest.md
3. Propose la prochaine task à exécuter (avec ses steps du plan recopiés)
4. Exécute les steps, commit un skill complet à la fois
5. Avant chaque commit : vérifier que seuls des fichiers NEUFS sont ajoutés (périmètre additif)
6. À la fin de session : mettre à jour docs/handoff/latest.md (template dans docs/handoff/TEMPLATE-handoff.md)

DÉCISIONS HORS DE TON PÉRIMÈTRE
- Tout ce qui touche au scope produit (in/out V1.1, in/out v1.2, choix personas) → cf. spec V1.1, ne pas redécider seul.
- Si une décision design n'apparaît ni dans la spec ni dans le plan : noter dans handoff comme "décision prise hors spec" et signaler à l'utilisateur.

DÉCISIONS DE PRODUIT FIGÉES (ne pas rouvrir)
- V1.1 = exactement 6 skills. cgv-generator + financement-startup restent en v1.2.
- gouvernance-ag = 1 skill à 2 modes (--convocation / --pv).
- constitution-societe --draft = brouillon assisté [review]-tagué, jamais un document "prêt à déposer".
- Déprécation du squelette hacienda-societes = chantier v2, PAS V1.1.
- Justifications détaillées des arbitrages : dans la spec V1.1, raisonnement complet inaccessible. NE PAS rouvrir.
```
