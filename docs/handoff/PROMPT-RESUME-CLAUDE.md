# Prompt — Reprise de session Claude Code

> Usage : copier le bloc ci-dessous dans le premier message d'une nouvelle session Claude Code (Claude Cowork ou CLI) pour reprendre le dev de `hacienda-droit-affaires` sans re-expliquer le contexte.
>
> Phase courante : **V2a** (V1 + V1.1 + V1.2 livrées, tests personas en cours en parallèle, V2b distribution bloquée sur ghost).

---

```text
Reprise du projet hacienda-droit-affaires — phase V2a (Hacienda — repo hacienda-juridique).

ÉTAT DU PROJET
- V1 + V1.1 + V1.2 livrées et complètes. Le plugin compte 18 skills, 4 agents. Tous les checks verts.
- V1/V1.1/V1.2 sont en cours de validation par 2 personas réels :
  - Frère — managing partner cabinet M&A (rare, beaucoup de travail). Brief de test minimal calibré ~1h30 disponible à docs/personas/frere-test-brief.md, à envoyer dès que la distribution Cowork est résolue (V2b).
  - Ami — indépendant droit des sociétés / entreprises en difficulté (plus disponible).
  - Validation gate les bumps de version.
- V2a se développe EN PARALLÈLE des tests personas : suppression du squelette hacienda-contrats + UN SEUL skill pull-forward (analyser-rupture-brutale).
- V2b — distribution Cowork-ready — est BLOQUÉE sur la finalisation du pattern packaging/install par hacienda-ghost (en cours côté associé). Pattern hérité dès que ghost a validé.
- Dev solo en local pour l'instant.

Contexte essentiel — lis dans CET ordre avant toute action :
1. CLAUDE.md (racine du repo) — conventions Hacienda + GitNexus obligatoire
2. AGENTS.md (racine) — instructions globales
3. docs/superpowers/specs/2026-05-26-hacienda-droit-affaires-v2a-design.md — design figé V2a (spec ACTIVE)
4. docs/superpowers/plans/2026-05-26-hacienda-droit-affaires-v2a.md — plan d'implémentation V2a (3 tasks)
5. docs/handoff/latest.md — état au dernier arrêt de dev
6. docs/superpowers/specs/2026-05-18-hacienda-droit-affaires-design.md + 2026-05-20-...-v1.1-design.md + 2026-05-21-...-v1.2-design.md — designs V1/V1.1/V1.2 (référence, livrés)
7. plugins/hacienda-droit-affaires/skills/reviser-contrat/SKILL.md — patron de format pour analyser-rupture-brutale

CONTRAINTE DIRECTRICE V2a — PARALLÉLISME SÛR (non-négociable)
- Mode strictement additif sur main côté plugin droit-affaires : V2a n'AJOUTE qu'UN seul fichier de skill + son dataset.
- INTERDIT de modifier un skill/agent V1/V1.1/V1.2 ou packages/core tant que les personas testent.
- Exception unique : un bug V1/V1.1/V1.2 remonté par un persona se corrige immédiatement sur main, priorité absolue.
- Le skill V2a n'atterrit sur main que COMPLET et testé en interne — jamais de demi-skill.
- Exception assumée — Tâche 0 : la suppression de hacienda-contrats est non-additive (retrait d'un dossier + entrée marketplace + test core) MAIS ne touche pas le plugin droit-affaires → sans impact personas. Commit dédié.
- Workspaces de dossier : HORS V2a (chantier post-personas).

PÉRIMÈTRE V2a — 1 skill + suppression du squelette
- Tâche 0 : ménage worktree + tag v2a-base + suppression du squelette hacienda-contrats. Pattern identique à V1.2 (retrait hacienda-societes). Renvoyer toute mention restante de skills du squelette vers les équivalents V1/V1.1/V1.2 quand ils existent (reviser-contrat, reviser-nda, cgv-generator, analyser-rupture-brutale), retirer/commenter v3+ sinon.
- Wave 1 : skill analyser-rupture-brutale (L.442-1, II C.com., issu de l'ord. 2019-359 — ex-L.442-6, I, 5°). Mode --review. Couvre qualification de la « relation commerciale établie », évaluation du préavis raisonnable, safe harbor 18 mois (protection défensive — pas un plafond), estimation du préjudice (marge brute), cas de dispense. Renvois vers declaration-creance (procédure collective) et PI:contrats-pi (distribution PI-centric).
- Tâche finale : vérification périmètre + CHANGELOG + handoff.

Mode d'exécution : superpowers:subagent-driven-development
- Pour chaque task du plan : dispatcher un subagent frais avec prompt auto-contenu
- Review entre tasks : git diff + rapport du subagent
- Un skill = un commit complet

Choix de modèle conseillé :
- Tâche 0 (mécanique, retrait squelette + tag) : Sonnet, effort standard.
- analyser-rupture-brutale (sujet jurisprudentiel vif, ch. com. évolue) : Opus effort ÉLEVÉ + brief de revue qui demande contrôle de SUBSTANCE juridique, pas seulement format. Le safe harbor 18 mois doit être présenté comme protection défensive de l'auteur d'une rupture qui aurait accordé 18 mois — JAMAIS comme plafond légal du préavis dû. Toute conclusion qui s'y appuie taguée [review].
- Tâche finale (CHANGELOG + handoff) : Sonnet.
- Ne pas compter sur la validation personas comme filet de correction — leur disponibilité est incertaine.

GitNexus (utilisation obligatoire) :
- En V2a on ne modifie PAS le plugin droit-affaires existant ni packages/core (sauf Tâche 0). Surtout : gitnexus_detect_changes() avant chaque commit pour CONFIRMER qu'aucun fichier V1/V1.1/V1.2 n'est touché.
- Pour explorer : préférer gitnexus_query au grep.
- Si index stale après commit : npx gitnexus analyze

Première action attendue :
1. Lire les documents ci-dessus
2. Identifier la dernière task V2a complétée (git log + docs/handoff/latest.md)
3. Me proposer la task suivante du plan V2a + le prompt subagent
4. Attendre ma validation avant de lancer

Décisions de produit figées (NE PAS REDISCUTER, redirection vers spec V2a) :
- V2a = UN SEUL skill (analyser-rupture-brutale) + suppression du squelette hacienda-contrats. Les 7 autres skills du squelette (reviser-saas, reviser-bail-commercial, analyser-distribution, proposer-redlines, verification-pouvoir-signataire, recherche-contractuelle, resume-operationnel) → v3+, hors scope V2a.
- analyser-rupture-brutale fonde sur L.442-1, II (depuis ord. 2019-359). Mentionner systématiquement l'ex-L.442-6, I, 5° pour les sources antérieures à 2019. Distinguer L.442-1, I (déséquilibre significatif) de L.442-1, II (rupture brutale) — deux fondements dans le même article.
- Safe harbor 18 mois = protection défensive, pas un plafond. Toute conclusion l'utilisant taguée [review].
- Validateur principal = ami (entreprises en difficulté), secondaire = frère (contentieux M&A).
- V2b — distribution Cowork-ready — chantier SÉPARÉ, bloqué sur ghost. NE PAS commencer V2b dans cette phase.
- Out définitif : RGPD (hacienda-ghost), Sapin II, devoir de vigilance.

Si tu hésites sur quoi que ce soit qui touche au produit : NE TRANCHE PAS SEUL, demande-moi.
Si tu hésites sur l'implémentation : trancher seul si le plan a la réponse, sinon demander.
```
