# Hacienda PI — V4.1 Contrats droit d'auteur — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development.

**Goal:** Livrer 3 skills contractuels droit d'auteur (`cession-droit-auteur`, `licence-droit-auteur`, `bases-de-donnees`) + 6 références dans le plugin v0.10.0. Pure Markdown FR.

**Architecture:** Extension de main (post V4.0). Pas de TS nouveau. Skills inédits, structure contrat-projet (Articles 1 à N) avec checklist L.131-3.

**Tech Stack:** Markdown FR.

**Spec:** [docs/superpowers/specs/2026-05-16-hacienda-pi-auteur-v4.1-contrats-design.md](../specs/2026-05-16-hacienda-pi-auteur-v4.1-contrats-design.md)

**Total prévu :** ~25 commits, 4 phases.

---

## Phase 1 — Skill `cession-droit-auteur`

8 sous-tâches. Le plus dense (le contrat cession est le pivot du bloc V4).

### Task 1.1: Frontmatter + garde-fou + Examples + reformulation
Create `plugins/hacienda-propriete-intellectuelle/skills/cession-droit-auteur/SKILL.md`. Frontmatter cf. spec §4.1. Garde-fou loud (préparation projet ≠ signature ; L.131-3 conditions cumulatives sous peine de nullité ; droit moral L.121-1 inaliénable). 3 Examples. Reformulation longue "PRÉPARATION PROJET, PAS SIGNATURE".
Commit: `feat(plugin-pi): cession-droit-auteur — frontmatter + garde-fou`

### Task 1.2: Chargement profil + Intake
Section profil : rôle, secteurs, position défaut cession auteur de commande, position défaut clauses droit moral. Mode provisoire.
Intake : œuvre concernée (référence qualification-oeuvre V4.0), cédant (physique unique/multiple/morale), cessionnaire, type cession (totale/partielle, exclusive/non-exclusive, présente/future), contexte (commande/salarié/édition/audiovisuel/standard), rémunération envisagée.
Commit: `feat(plugin-pi): cession-droit-auteur — chargement profil + intake`

### Task 1.3: Étape 1 — Vérification éligibilité L.131-1 et 2
Section L.131-1 interdiction cession globale œuvres futures (NULLE sauf exception contrat édition L.132-4). L.131-2 forme écrite obligatoire. L.131-4 principe rémunération proportionnelle aux recettes. L.131-5 lésion (révision si forfait préjudiciable 7/12).
Commit: `feat(plugin-pi): cession-droit-auteur — éligibilité L.131-1 et 2`

### Task 1.4: Étape 2 + 3 — Identification parties + Énumération L.131-3 (cœur)
Section identification parties (cédant + cessionnaire + œuvre + garanties éviction).
Section L.131-3 CONDITIONS CUMULATIVES OBLIGATOIRES :
(a) Droits cédés énumérés précisément (reproduction L.122-3, représentation L.122-2, adaptation L.122-4, distribution, exploitation numérique)
(b) Domaines d'exploitation listés explicitement (édition imprimée, audiovisuel, numérique, spectacle, phonogramme, merchandising, publicité)
(c) Territoires (France, EU, monde, pays spécifiques)
(d) Durée (légale 70 ans post mortem max, ou limitée déterminée/déterminable)
(e) Rémunération : proportionnelle (principe L.131-4) ou forfaitaire (cas exceptionnels limités L.131-4 al.2)
Note critique : omission UNE condition = nullité partielle ou totale.
Commit: `feat(plugin-pi): cession-droit-auteur — identification + énumération L.131-3`

### Task 1.5: Étape 4 + 5 — Clauses recommandées + Cas particuliers
Section clauses recommandées (garantie, droit moral, audit, résiliation, sous-cession, juridiction TJ Paris, droit applicable FR).
Section cas particuliers : commande (cession écrite obligatoire), salariat hors logiciel (régime général, contrat travail recommandé), contrat édition L.132-1+ (régime spécifique + cession œuvres futures L.132-4), audiovisuel L.132-23+ (présomption cession producteur L.132-24).
Commit: `feat(plugin-pi): cession-droit-auteur — clauses recommandées + cas particuliers`

### Task 1.6: Format de sortie — projet contrat 15 articles
Format Markdown inline (quadruple fence). Structure projet contrat 15 articles :
1. Identification parties
2. Œuvre cédée
3. Garanties cédant
4. Droits cédés (L.131-3.a)
5. Domaines (L.131-3.b)
6. Territoires (L.131-3.c)
7. Durée (L.131-3.d)
8. Rémunération (L.131-3.e + L.131-4)
9. Respect droit moral L.121-1
10. Cession tiers
11. Audit reddition comptes
12. Résiliation
13. Droit applicable + juridiction
14. Notification
15. Dispositions diverses
Note : ce projet est un canevas — avocat adapte.
Commit: `feat(plugin-pi): cession-droit-auteur — format sortie projet contrat 15 articles`

### Task 1.7: Gate non-juriste + Emplacement + Ne fait pas + Ton
Gate : brief avocat (œuvre + cession + conditions L.131-3 checklist + cas particulier + 3 questions).
Emplacement : `outputs/cession-auteur-<oeuvre-slug>-YYYY-MM-DD.md`.
"Ne fait pas" : signer, garantir validité finale, remplacer avocat, évaluer rémunération adéquate, cession œuvres futures globalement, traiter licences (V4.1 autre skill), traiter bases données (V4.1 autre skill).
Ton : juridique précis, formel, équilibré.
Commit: `feat(plugin-pi): cession-droit-auteur — gate + ne fait pas + ton`

### Task 1.8: Références `clauses-cession-L131-3.md` + `jurisprudence-cession.md`

Create `references/clauses-cession-L131-3.md` (~100-130 lignes) : clauses obligatoires (5 conditions L.131-3 détaillées + exemples rédaction) + clauses recommandées (garantie, droit moral, audit, résiliation) + clauses à éviter ("tous droits" générique nul + cession œuvres futures globale nulle).

Create `references/jurisprudence-cession.md` (~80-110 lignes) :
- Cour de cass. 1re civ. 21 nov. 2006 (conditions L.131-3 aussi pour licences)
- Cour de cass. 1re civ. 13 nov. 2008 (interprétation stricte "tous droits")
- Cour de cass. 1re civ. 12 fév. 2014 (cession œuvres futures contrat édition limite)
- Cour de cass. com. 17 fév. 2015 (cession audiovisuelle producteur L.132-24)
- Cour de cass. soc. 6 mai 2014 (cession œuvres salarié — pas d'automaticité hors L.113-9)

Commit: `docs(plugin-pi): références clauses L.131-3 + jurisprudence cession`

---

## Phase 2 — Skill `licence-droit-auteur`

7 sous-tâches.

### Task 2.1: Frontmatter + garde-fou + Examples + reformulation
Create `plugins/hacienda-propriete-intellectuelle/skills/licence-droit-auteur/SKILL.md`. Frontmatter cf. spec §5.1. Garde-fou loud (préparation ≠ signature ; licence ≠ cession — distinction critique ; conditions L.131-3 s'appliquent aussi licences jurisprudence). 3 Examples (exclusive / Creative Commons / SaaS). Reformulation longue.
Commit: `feat(plugin-pi): licence-droit-auteur — frontmatter + garde-fou`

### Task 2.2: Charger profil + Intake bi-mode
Section profil. Intake : œuvre, type licence (exclusive / non-exclusive / libre / EULA / SaaS), parties, périmètre.
Commit: `feat(plugin-pi): licence-droit-auteur — chargement profil + intake`

### Task 2.3: Étape 1 — Distinction Cession vs Licence
Table comparative (titularité, durée, réversibilité, conditions L.131-3, cas usage). Tests pour éviter requalification licence → cession.
Commit: `feat(plugin-pi): licence-droit-auteur — distinction cession vs licence`

### Task 2.4: Étape 2 — Typologie 5 types licences détaillée
Pour chaque type (exclusive / non-exclusive / libre / EULA / SaaS) : caractéristiques, cas usage, clauses spécifiques, risques particuliers.
Référence Creative Commons : 6 combinaisons + CC0 + recommandations par contexte.
Référence : `references/typologie-licences-auteur.md`.
Commit: `feat(plugin-pi): licence-droit-auteur — typologie 5 types licences`

### Task 2.5: Étape 3 + 4 — Clauses critiques + Cas particuliers
Pour chaque type, lister clauses critiques (durée + reconduction, périmètre usage, mise à jour, LRC, garanties, RGPD si applicable, résiliation + sort données).
Cas particuliers : Creative Commons (4.0 international, BY+SA/NC/ND, marquage irrévocable), open source logiciel (renvoi `logiciels-pi`), SaaS B2B (CGU + DPA RGPD + SLA).
Référence : `references/modeles-clauses-licence.md`.
Commit: `feat(plugin-pi): licence-droit-auteur — clauses critiques + cas particuliers`

### Task 2.6: Format de sortie + Gate + Ne fait pas + Ton
Format Markdown projet licence structurée (similaire cession mais articles spécifiques licence : durée renouvellement, périmètre usage, conditions accès, etc.).
Gate non-juriste : brief avocat.
Emplacement : `outputs/licence-auteur-<oeuvre-slug>-YYYY-MM-DD.md`.
"Ne fait pas" : signer, garantir validité, remplacer avocat, traiter cession (V4.1 autre skill), traiter bases données (V4.1 autre skill).
Ton : juridique précis.
Commit: `feat(plugin-pi): licence-droit-auteur — format sortie + gate + ne fait pas`

### Task 2.7: Références `typologie-licences-auteur.md` + `modeles-clauses-licence.md`

Create `references/typologie-licences-auteur.md` (~120-150 lignes) : table comparative 5 types licences + 7 variantes Creative Commons (CC-BY/CC-BY-SA/CC-BY-NC/CC-BY-ND/CC-BY-NC-SA/CC-BY-NC-ND/CC0) + recommandations par contexte (photo, musique, contenu éditorial, logiciel, SaaS).

Create `references/modeles-clauses-licence.md` (~100-130 lignes) : clauses standard par type avec variations. Modèles : durée + reconduction tacite, périmètre utilisateurs, limitation responsabilité plafonnée, garanties éviction, RGPD article DPA, résiliation + sort données.

Commit: `docs(plugin-pi): références typologie licences auteur + modèles clauses`

---

## Phase 3 — Skill `bases-de-donnees`

6 sous-tâches (plus court car régime focalisé).

### Task 3.1: Frontmatter + garde-fou + Examples + reformulation
Create `plugins/hacienda-propriete-intellectuelle/skills/bases-de-donnees/SKILL.md`. Frontmatter cf. spec §6.1. Garde-fou loud (analyse ≠ rédaction ; double protection L.111-1 + L.341-1 indépendantes ; sui generis 15 ans renouvelable = protection quasi-illimitée ; RGPD si données personnelles). 3 Examples. Reformulation longue.
Commit: `feat(plugin-pi): bases-de-donnees — frontmatter + garde-fou`

### Task 3.2: Charger profil + Intake
Section profil. Intake : nom base, contenu, structure, type accès (interne / SaaS / open data / scraping), RGPD applicable.
Commit: `feat(plugin-pi): bases-de-donnees — chargement profil + intake`

### Task 3.3: Étape 1 — Double protection L.111-1 + L.341-1
Section droit auteur sur structure (L.111-1 + critère CJUE Infopaq, 70 ans post mortem).
Section droit sui generis L.341-1 (investissement substantiel financier/matériel/humain, producteur titulaire, 15 ans renouvelable L.342-5).
Cas combinés : 4 scénarios (double, droit auteur seul, sui generis seul, aucune protection).
Référence : `references/regime-sui-generis-L341.md`.
Commit: `feat(plugin-pi): bases-de-donnees — double protection L.111-1 + L.341-1`

### Task 3.4: Étape 2 + 3 — Régimes d'accès + RGPD
Section 4 régimes accès :
- Interne (politique interne, RGPD si données perso)
- SaaS (licence + CGU + DPA RGPD + SLA — renvoi licence-droit-auteur)
- Open data (Licence Ouverte Etalab 2.0, ODbL, décret 2017-331 pour public)
- Scraping autorisé (CGU API, contrat licence accès, jurisprudence Cour de cass. com. 5 mars 2019 PMU vs Stanleybet sur scraping non autorisé)
Section RGPD si données personnelles : base légale (art. 6), finalités, minimisation, conservation, droits personnes, DPO/DPIA, cookies, transfert hors UE. Note : ce skill introduit, ne rédige pas DPA (renvoi plugin RGPD futur).
Commit: `feat(plugin-pi): bases-de-donnees — régimes accès + RGPD`

### Task 3.5: Étape 4 — Modèles contractuels + Format de sortie
Section modèles : licence BDD propriétaire commercial, Open Data LO 2.0 / ODbL, contrat scraping autorisé B2B, CGU API publique.
Référence : `references/modeles-licence-bdd.md`.
Format de sortie Markdown : analyse régime + flag RGPD + recommandation type contrat + clauses critiques.
Commit: `feat(plugin-pi): bases-de-donnees — modèles contractuels + format sortie`

### Task 3.6: Gate + Ne fait pas + Ton + Références

Gate non-juriste : brief avocat tech.
Emplacement : `outputs/bases-donnees-<projet-slug>-YYYY-MM-DD.md`.
"Ne fait pas" : rédiger contrat final (= `licence-droit-auteur`), gérer conformité RGPD complète (= plugin RGPD futur), évaluer valeur économique BDD, gérer scraping non autorisé contentieux (= V4.2).
Ton : technique, équilibré protection + risque.

Create `references/regime-sui-generis-L341.md` (~100-130 lignes) :
- L.341-1 à L.343-7 verbatim + commentaires
- Critère investissement substantiel : jurisprudence CJUE BHB C-203/02 (2004), CJUE Innoweb C-202/12 (2013)
- Jurisprudence FR : Cour de cass. com. 5 mars 2019 PMU vs Stanleybet
- Distinction investissement constitution vs vérification vs présentation
- Note investissement "obtention contenu" vs "création contenu" (CJUE BHB)

Create `references/modeles-licence-bdd.md` (~100-130 lignes) :
- Modèle licence BDD propriétaire (clauses utilisation, durée, redevances)
- Licence Ouverte Etalab 2.0 (open data administratif FR)
- ODbL (Open Database License — communauté open data internationale)
- CGU API publique (rate limit, citation, redistribution)
- Contrat scraping autorisé B2B (rare mais existe — clauses fréquence, volume, redistribution)
- Marquage des licences (mentions obligatoires, URL canoniques)

Commit: `feat(plugin-pi): bases-de-donnees — gate + références sui generis + modèles`

---

## Phase 4 — Patches plugin + bump + PR + merge

### Task 4.1: Patch CLAUDE.md — section Droit d'auteur enrichie
Ajouter dans la section "## Droit d'auteur" existante :
```markdown
**Stratégie type licence/cession :** [A CONFIGURER — cession préférée (transfert titularité, long terme) / licence préférée (conservation titularité, flexibilité) / case par case selon œuvre et contexte]
**Position défaut rémunération cession :** [A CONFIGURER — proportionnelle aux recettes (principe L.131-4) / forfaitaire si cas exceptionnel L.131-4 al.2]
**Approbateur contrats droit d'auteur :** [A CONFIGURER — avocat seul / avocat + Direction métier / avocat + GC]
**Politique bases de données :** [A CONFIGURER — propriétaire stricte / open data privilégié si public / mixte selon valeur commerciale]
**RGPD pour bases de données :** [A CONFIGURER — DPO interne / DPO externe / cabinet conseil RGPD dédié]
```
`npm run branding:check`.
Commit: `feat(plugin-pi): CLAUDE.md template — section Droit d'auteur enrichie (V4.1)`

### Task 4.2: Patch `references/ressources-pi-fr.md` — section Contrats droit d'auteur
Ajouter section "## Contrats droit d'auteur" : table modèles type (cession, licence exclusive, licence libre CC, EULA, SaaS, BDD propriétaire, BDD open data) avec URL modèles publics + cas d'usage typiques.
Commit: `docs(plugin-pi): ressources — section Contrats droit d'auteur`

### Task 4.3: Bump version 0.9.0 → 0.10.0
- `plugin.json` : version 0.10.0, description étendue (cession + licence + bases données), keywords +cession-auteur +licence-auteur +bases-donnees +sui-generis +creative-commons
- `mcp-server/package.json` : 0.10.0
- Rebuild MCP (si disque dispo, sinon skip — V4.1 = Markdown only, pas critique)
Commit: `chore(plugin-pi): bump 0.9.0 → 0.10.0 (V4.1 contrats droit d'auteur)`

### Task 4.4: CHANGELOG + README v0.10.0
CHANGELOG section 0.10.0 au top : liste 3 skills + 6 références + bloc V4 quasi-complet (qualification V4.0 + contrats V4.1 ; V4.2 contrefaçon reste).
README "Quoi de neuf en V0.10" au top.
Commit: `docs(plugin-pi): CHANGELOG + README v0.10.0`

### Task 4.5: Vérifications + Push + PR + Merge
- `npm test` (269), `npm run typecheck`, `npm run branding:check`, `git diff --check`
- `git push -u origin claude/pi-auteur-v4.1-contrats`
- `gh pr create --base main --title "PI droit d'auteur V4.1 : contrats (cession + licence + bases données)" --body "..."`
- `gh pr merge <num> --merge --delete-branch=false`
Report PR URL + merge status + total commits V4.1.

---

## Self-review

- [x] Spec §4 → Phase 1 (8 tasks)
- [x] Spec §5 → Phase 2 (7 tasks)
- [x] Spec §6 → Phase 3 (6 tasks)
- [x] Spec §3 + §7 → Phase 4 (5 tasks)
- [x] Pas de placeholder
- [x] Pas de TS modifié

---

**Plan complet.** Subagent-driven en 4 dispatches.
