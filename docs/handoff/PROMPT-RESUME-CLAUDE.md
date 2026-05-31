# Prompt — Reprise de session Claude Code

> Usage : copier le bloc ```text``` ci-dessous dans le premier message d'une nouvelle session Claude Code (Claude Cowork ou CLI) pour démarrer le chantier "review du plugin hacienda-propriete-intellectuelle (PI) en l'alignant sur les patterns du plugin hacienda-droit-affaires (DA)".
>
> Phase courante : **DA validé en interne + envoyé aux personas**. Phase suivante : **gap analysis PI vs DA**.

---

```text
Reprise du repo Hacienda — chantier review plugin `hacienda-propriete-intellectuelle` vs `hacienda-droit-affaires` (jamon8888/hacienda-juridique sur main, branche `main` à jour).

CONTEXTE PRODUIT

- Hacienda = marketplace de plugins juridiques français pour avocats / juristes in-house / direction juridique / notaires corporate / mandataires INPI / indépendants procédures collectives.
- Site : https://hacienda.diy. Licence : AGPL-3.0-or-later. Langue produit : français.
- Plugins métiers actuels dans `plugins/registry.json` : `hacienda-sources-officielles`, `hacienda-recherche-documentaire`, `hacienda-droit-affaires` (v0.1.0, 20 skills, 4 agents), `hacienda-propriete-intellectuelle` (v0.18.14, 37 skills, 6 agents).
- Les utilisateurs finaux non-techniques installent les plugins dans **Claude Cowork** (pas Claude Code direct). Toi tu travailles dans Claude Code.

MISSION DE CETTE SESSION

Faire la **review de hacienda-propriete-intellectuelle (PI)** en utilisant **hacienda-droit-affaires (DA)** comme référentiel de patterns. DA a été refondu récemment (PR #16 à #23 mergées en mai 2026) et porte les conventions canoniques actuelles. PI est plus ancien (v0.18.14) et a probablement des écarts.

Deux axes à couvrir :

1. **Structure du plugin** — architecture, conventions de nommage, organisation de fichiers, manifest, .mcp.json, hooks, registry, marketplace.json, version, alias court (`h-pi` vs `hacienda-propriete-intellectuelle:`), tests dans packages/core, dataset interne, présence d'un CHANGELOG, etc.

2. **Contenu juridique** — qualité et cohérence des workflows par skill : présence/absence des patterns canoniques DA (cf. RÉFÉRENTIEL ci-dessous), formulations « validation humaine », tag `[à vérifier]`, échelle 🟢🟡🟠🔴, gate non-juriste, mode silencieux livrable externe.

Output attendu : **rapport de gap analysis** au format Markdown avec, par axe et par dimension : (a) ce que DA fait, (b) ce que PI fait, (c) écart, (d) recommandation. Suivi d'une **liste priorisée d'actions** (🔴 bloquant / 🟠 important / 🟡 nice-to-have) pour aligner PI sur les standards DA. Pas d'implémentation côté code dans cette session — on livre le rapport, l'implémentation viendra dans une session ultérieure éventuellement subagent.

RÉFÉRENTIEL DA — patterns canoniques à vérifier dans PI

Lire dans cet ordre :

1. `plugins/hacienda-droit-affaires/CLAUDE.md` — structure 11 sections : profil cabinet + blocs métier (M&A/Corporate, vie sociale, procédures collectives, contrats commerciaux) + matrice approbateurs + politique PII + sorties standardisées + posture jugements subjectifs + garde-fous transversaux + reconnaissance juridictions + confiance contenu récupéré + échafaudage pas œillères + questions ad-hoc + proportionnalité + sources prioritaires + workspaces de dossier.
2. `plugins/hacienda-droit-affaires/skills/spa-review/SKILL.md` — skill de référence M&A (372 lignes). Patterns clés à éprouver : frontmatter YAML version/authors/tags, disclaimer en citation, 4 examples, Chargement du profil, Intake, Gate non-juriste, Outils MCP à privilégier, Emplacement des sorties, 11 Étapes, Sortie avec format livrable, modes courts (`--red-flags` / `--issues-list` / `--signing-ready`), Mode silencieux, Ce skill ne fait pas, Ton.
3. `plugins/hacienda-droit-affaires/skills/check-pii/SKILL.md` — skill transversal de gate PII. Pattern lead magnet inversé `hacienda-ghost` (footer A + prompt B avec CTA marketplace), apport propre de DA apprécié par l'associé, à étendre à PI si pas déjà présent.
4. `plugins/hacienda-droit-affaires/skills/gap-review/SKILL.md` — pattern d'analyse à 5 axes side-dependent (Périmètre / Mécanique financière / Procédure de mise en œuvre / Clauses sensibles / Confrontation DD), avec matrice acquéreur vs cédant en miroir. Modèle pour des skills PI à dimension contractuelle (cession-droit-auteur, contrats-pi, licence-droit-auteur).
5. `plugins/hacienda-droit-affaires/CHANGELOG.md` — historique structuré par vagues (V1, V1.1, V1.2, V2a, V2b, M&A UX + SPA review). PI a-t-il un CHANGELOG comparable ?
6. `plugins/hacienda-droit-affaires/.mcp.json` — pattern `${CLAUDE_PLUGIN_ROOT}/mcp-server/dist/...` (PR #18/19/21). Vérifier que PI suit ce pattern.
7. `tools/hacienda-plugin-factory/src/anno-distribution.ts` — bloc `if (pluginName === "hacienda-droit-affaires")` dans `buildPluginAnnoWorkflowMarkdown()` avec 8 workflows mappés vers les outils Anno (revue contrat / NDA-LOI / DD / GAP-SPA-closing / procédures collectives / rupture brutale / pacte / veille). PI a-t-il son bloc équivalent ?
8. `docs/backlog/spa-review-improvements.md` + `docs/backlog/check-pii-improvements.md` — backlogs d'améliorations DA post-validation interne. Modèle pour le backlog PI à produire en fin de cette session.

PATTERN « lead magnet inversé `hacienda-ghost` » (apport DA central)

Le skill `check-pii` détecte la PII en pré-flight et propose `hacienda-ghost` au moment où l'utilisateur en a besoin (PII détectée dans son dossier client). Deux modes :
- **Cas A discret** : footer en fin de sortie du skill appelant → « Ce skill a traité N mentions identifiantes. Pour anonymiser automatiquement, installer hacienda-ghost. »
- **Cas B prompt bloquant** : prompt complet avec 3 options dont CTA marketplace `marketplace://hacienda-ghost`.

À éprouver dans PI : ce pattern y est-il présent ? Sous quelle forme ? Calibrage seuils (catégorie A > 50, catégories B sensibles) ? Si absent, c'est une recommandation 🔴.

MÉTHODOLOGIE ATTENDUE

1. **Vérifier l'état du repo GitHub AVANT toute analyse** : `git fetch && git log --oneline origin/main -5 && gh pr list --state open`. Si PRs ouvertes pertinentes, prendre en compte.
2. **Lire le référentiel DA** dans l'ordre listé ci-dessus avant de toucher à PI. Construire une grille de comparaison en interne.
3. **Survoler PI** : `ls plugins/hacienda-propriete-intellectuelle/skills/` et inventorier les 37 skills + 6 agents + 10 references.
4. **Échantillonner** : ne pas tenter de lire les 37 SKILL.md PI. Choisir 4-6 skills représentatifs couvrant la variété (un par domaine : marque, brevet, dessin et modèle, droit d'auteur, logiciel, contentieux). Lire ceux-là intégralement et en déduire les patterns présents/absents par extrapolation.
5. **Comparer axe par axe** : structure plugin (.mcp.json, manifest, CLAUDE.md, registry, anno-overlay) puis contenu juridique (workflows skills, échelle, gate, mode silencieux, garde-fous transversaux).
6. **Produire le rapport** dans `docs/backlog/pi-vs-da-gap-analysis.md` (nouveau fichier) avec une PR docs-only sur même pattern que `docs/backlog/spa-review-improvements.md` (cf. exemple repo).
7. **Ne pas modifier PI** dans cette session — uniquement le rapport. L'implémentation des recommandations sera un chantier séparé.

CALIBRAGE MODÈLE

**Opus 4.7 effort normal en main session.** Justification :

- **Axe 1 (structure plugin)** seul aurait suffi en Sonnet — c'est de la comparaison de patterns visibles (.mcp.json, manifest, sections CLAUDE.md, anno-overlay, etc.), mécanique.
- **Axe 2 (contenu juridique des workflows PI)** demande du jugement nuancé que Sonnet a tendance à survoler. Exemples concrets : apprécier si un workflow marque INPI capte correctement les motifs absolus L.711-2 et l'opposition L.712-4 / sa restauration L.712-4-1 ; si un workflow brevet calibre correctement les délais OEB (Règle 132 EPC) / PCT (30 mois) / INPI (R.612-66) ; si la cession L.131-3 traite la durée + territoire + médias avec la nuance jurisprudentielle ; si les workflows open source distinguent permissives (MIT/BSD/Apache) vs copyleft contamination (GPL/AGPL) ; si les workflows contentieux PI captent la compétence exclusive TJ Paris L.615-17 / MUE art. 123 RMUE / DMC art. 80 RDMC.
- **Calibrage empirique du test K7M2PX** sur DA : en aveugle, Opus a capté des nuances que Sonnet aurait probablement loupées (CP IEF Bercy + MDR Notified Body sur cible classe II, double knowledge defense disclosure + constructive knowledge, plafond fiscal absorbé par plafond global). Pour PI avec son spectre plus large (marques + brevets + D&M + droit d'auteur + logiciel + contentieux), la même profondeur est requise.
- **Cohérence avec la session DA précédente** : Opus en main session pour spa-review et gap-review scoring.

**Pas de superpowers obligatoires** pour cette session. Le PROMPT est suffisamment cadré. Optionnel : si tu veux paralléliser les 4-6 skills PI échantillonnés (un Opus subagent par domaine : marque / brevet / D&M / droit d'auteur / logiciel / contentieux), utiliser `superpowers:dispatching-parallel-agents`. Mais le travail séquentiel en main session est tout aussi propre.

DÉCISIONS FIGÉES (NE PAS REDISCUTER)

- Pas de modification de PI dans cette session — rapport uniquement.
- Output dans `docs/backlog/pi-vs-da-gap-analysis.md`. PR docs-only mergeable nous-mêmes (l'associé ne review pas si ça ne bouge pas main du repo ni les autres plugins).
- DA = référentiel de patterns récents. Si tu détectes qu'un pattern PI est en fait meilleur que celui de DA (par ex. agent-audit-grid.md PI est plus mature), le signaler dans le rapport en `[bonus PI]` plutôt que recommander de l'aligner sur DA.
- Anno overlay : PI a peut-être déjà son bloc dans `anno-distribution.ts` (pré-existant). Vérifier avant de recommander.
- Alias court `h-pi:` est déjà déployé dans PI (cf. `hacienda-plugin-factory` test factory). Pas un sujet.
- L'associé travaille en parallèle sur une branche `claude/pi-remaining-v1.2-v2.3` (visible sur origin) — vérifier son état pour éviter doublons. Si son travail recoupe ta gap analysis, signaler dans le rapport.

GARDE-FOUS GIT (LEÇONS DE LA SESSION PRÉCÉDENTE)

- Avant tout merge / push / suggestion qui dépend de l'état repo : `git fetch && git log --oneline origin/main -5 && gh pr list --state open`. C'est un réflexe à appliquer systématiquement, pas une option.
- L'associé fait parfois des force-push sur main (commit auteur "Your Name <user@example.com>") qui peuvent éjecter accidentellement des merges. Vérifier `git merge-base --is-ancestor <commit> HEAD` si doute sur la lignée.
- Ignorer les hooks GitNexus "stale" et les auto-modifications de CLAUDE.md / AGENTS.md par `npx gitnexus analyze` — l'utilisateur a explicitement choisi de discarder pour ne pas polluer les PRs.

CONTEXTE — où en est DA aujourd'hui

- v0.1.0, 20 skills, 4 agents, 1 MCP server stdio (4 toolGroups : `legal_research`, `company_registries`, `fiscal_sources`, `social_sources`).
- Validation interne complète : test 1 (install Claude Code ✓), test 2 (MCP boot ✓), test 3 (spa-review scoring K7M2PX = 🟢 87 % pondéré, 0 FP pur, 2/2 pièges résistés), test 4-5 (check-pii prompt B + footer A ✓), test 7 (BODACC réel ✓), test 10 (anno overlay ✓), gap-review scoring R4VN9W (en attente vérité terrain au moment de la rédaction de ce prompt).
- 3 backlogs d'améliorations DA documentés dans `docs/backlog/` : spa-review-improvements.md, check-pii-improvements.md (+ tester PI en parallèle).
- ZIP installable : `dist-pkg/cowork-marketplace/zips/hacienda-droit-affaires.zip` (686 KB, 50 fichiers).
- 2 briefs personas (frère cabinet M&A, ami droit des sociétés / procédures collectives) dans `docs/personas/` — peut-être envoyés ou en cours d'envoi par l'utilisateur.

QUAND TU LIVRES LE RAPPORT

Format Markdown structuré :

```
# Gap analysis PI vs DA — [date]

## Synthèse

[Bottom-line en 3-5 phrases. Score global d'alignement, gros écarts.]

## Axe 1 — Structure du plugin

### Dimension X (par ex. .mcp.json)
- **DA** : ...
- **PI** : ...
- **Écart** : ...
- **Recommandation** : 🔴/🟠/🟡 ...

### Dimension Y (CLAUDE.md du plugin)
[...]

## Axe 2 — Contenu juridique

### Pattern : note du relecteur 5 champs
[...]

### Pattern : arbre de décision 5 options
[...]

### Pattern : gate non-juriste
[...]

### Pattern : mode silencieux livrable externe
[...]

### Pattern : tag [à vérifier] systématique
[...]

### Pattern : footer PII (lead magnet inversé hacienda-ghost)
[...]

### Échelle de sévérité 🟢🟡🟠🔴
[...]

## Liste d'actions priorisée

| # | Action | Sévérité | Effort | Skill/fichier concerné |
|---|---|---|---|---|
| 1 | ... | 🔴 | ... | ... |

## Bonus PI (patterns PI meilleurs que DA)

[Si applicable.]

## Méta-observations

[Méthodologie utilisée, échantillon des skills lus, limites de la gap analysis.]
```

Ouvre une PR `docs(backlog): gap analysis PI vs DA` qui ajoute ce fichier, pas plus. Tu peux merger toi-même (docs-only, autonome).

BONNE SESSION — Opus effort normal, vérification GitHub avant chaque action, focus sur le rapport pas l'implémentation.
```

---

## Mode d'emploi

1. Ouvrir une nouvelle session Claude Code (interface Cowork ou `claude code` en CLI).
2. Coller le bloc ```text``` ci-dessus comme premier message.
3. **Garder Opus 4.7 effort normal** (modèle par défaut typiquement). La review du contenu juridique PI exige le calibrage Opus, cf. section CALIBRAGE MODÈLE du prompt. Sonnet 4.6 risque un rapport de surface.
4. Laisser la session produire le rapport et la PR.

## Archives

Le précédent contenu de ce fichier (chantier `hacienda-droit-affaires` v2a / spa-review) est archivé dans `docs/handoff/archive/PROMPT-RESUME-CLAUDE-2026-05-26-droit-affaires-v2a.md`.
