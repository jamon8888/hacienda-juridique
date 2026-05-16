# Hacienda PI — V4.0 Droit d'auteur Qualification — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development.

**Goal:** Livrer `qualification-oeuvre` + `logiciels-pi` + 4 références dans le plugin `hacienda-propriete-intellectuelle` v0.9.0. Pure Markdown FR. Démarrage du bloc droit d'auteur (V4.1 contrats + V4.2 enforcement suivront).

**Architecture:** Extension de main (post V2.2). Pas de nouveau TS. Skills inédits (workflow inédit pour qualification-oeuvre, calque qualification-oeuvre adapté logiciel pour logiciels-pi).

**Tech Stack:** Markdown FR. Aucun TS nouveau.

**Spec:** [docs/superpowers/specs/2026-05-16-hacienda-pi-auteur-v4.0-qualification-design.md](../specs/2026-05-16-hacienda-pi-auteur-v4.0-qualification-design.md)

**Total prévu :** ~20 commits, 3 phases.

---

## Phase 1 — Skill `qualification-oeuvre`

8 sous-tâches.

### Task 1.1: Frontmatter + garde-fou + Examples + reformulation
Create `plugins/hacienda-propriete-intellectuelle/skills/qualification-oeuvre/SKILL.md`. Frontmatter cf. spec §4.1. Garde-fou loud (qualification ≠ avis opportunité ; droit naît à création L.111-1 sans formalité ; preuve date critique). 3 Examples. Reformulation longue "QUALIFICATION JURIDIQUE, PAS AVIS D'OPPORTUNITÉ".
Commit: `feat(plugin-pi): qualification-oeuvre — frontmatter + garde-fou`

### Task 1.2: Charger profil + Intake (5 questions)
Section profil : rôle, secteurs (édition / audiovisuel / logiciel / design / mode / publicité / multimedia), posture (préventif vs réactif). Mode provisoire.
Intake 5 questions : description œuvre (nature + forme tangible), contexte création (personne(s) physique(s), commande, salariat, collaboration, collective), date création + preuves, catégorie suspectée L.112-2, objectif qualification (préventif / défensif / contentieux).
Commit: `feat(plugin-pi): qualification-oeuvre — chargement profil + intake`

### Task 1.3: Étape 1 — Analyse originalité (L.111-1 + CJUE Infopaq)
Section critère central "marque de la personnalité" (Cour de cass) reformulé "création intellectuelle propre à son auteur" (CJUE Infopaq C-5/08). Tests pratiques : choix libres vs imposés / identifiable / effort intellectuel. Verdict 🟢/🟡/🔴.
Commit: `feat(plugin-pi): qualification-oeuvre — analyse originalité L.111-1`

### Task 1.4: Étape 2 + 3 — Catégorie L.112-2 + Titularité initiale (7 cas A-G)
Section catégories L.112-2 (liste non exhaustive : littéraires, artistiques, musicales, audiovisuelles, graphiques, arts appliqués, logiciels, multimedia, bases données).
Section titularité initiale 7 cas :
- A. Créateur physique unique (L.113-1 présomption)
- B. Collaboration L.113-2 al.1 (cotitularité unanimité)
- C. Collective L.113-2 al.3 (commanditaire titulaire)
- D. Composite L.113-2 al.2 (auteur composite sous réserve préexistant)
- E. Commande (cession écrite L.131-3 obligatoire)
- F. Salariat (régime général : salarié reste titulaire ; exceptions L.113-9 logiciels, L.132-36 journalistes, agents publics)
- G. Posthume (ayants droit, L.123-4 25 ans si divulgation post mortem)
Commit: `feat(plugin-pi): qualification-oeuvre — catégorie L.112-2 + titularité 7 cas`

### Task 1.5: Étape 4 + 5 — Patrimoniaux vs moral + Durée
Section droits patrimoniaux L.122-1 à 12 (reproduction, représentation, adaptation, distribution) + exceptions L.122-5 (copie privée, courte citation, parodie, pédagogique, handicap).
Section droit moral L.121-1 (perpétuel, inaliénable, imprescriptible) — 4 droits : divulgation L.121-2, paternité, intégrité, repentir/retrait L.121-4. Point friction critique : cessionnaire ne peut modifier sans accord auteur.
Section durée L.123-1 : 70 ans post mortem standard. Variantes : L.123-2 collaboration (dernier coauteur), L.123-3 collective/pseudonyme/anonyme, L.123-4 posthume 25 ans, bases sui generis 15 ans L.342-5.
Commit: `feat(plugin-pi): qualification-oeuvre — patrimoniaux + moral + durée`

### Task 1.6: Étape 6 — Enjeux + Format de sortie + Recommandations
Section enjeux selon objectif (préventif / défensif / contentieux).
Format sortie Markdown inline (quadruple fence) : en-tête confidentialité, garde-fou, reviewer note, triage 🟢/🟡/🔴, œuvre analysée, originalité, catégorie, titularité, droits, durée, enjeux, recommandations bucketées, "Une question hors checklist", "Que veux-tu faire ?" (Rédiger cession / Escalader / Compléter faits / Préparer preuves / Autre).
Commit: `feat(plugin-pi): qualification-oeuvre — enjeux + format sortie + recommandations`

### Task 1.7: Gate non-juriste + Emplacement + Ne fait pas + Ton
Gate non-juriste : brief avocat spécialisé PI (qualification + titularité + droits + 3 questions).
Emplacement : `~/.claude/plugins/config/.../outputs/qualification-oeuvre-<slug>-YYYY-MM-DD.md`.
"Ne fait pas" : conclure définitivement existence droit auteur (= juge), rédiger cession (= V4.1), rédiger licence (= V4.1), qualifier contrefaçon (= V4.2), déposer preuve (= v0.1), évaluer préjudice (= V4.2), succession ayants droit, droits voisins.
Ton : analytique, précis, équilibré.
Commit: `feat(plugin-pi): qualification-oeuvre — gate + ne fait pas + ton`

### Task 1.8: Références `articles-cpi-droit-auteur.md` + `jurisprudence-originalite.md`

Create `plugins/hacienda-propriete-intellectuelle/skills/qualification-oeuvre/references/articles-cpi-droit-auteur.md` (~120-150 lignes) :
- Articles CPI Livre I référencés (L.111-1, L.112-2, L.113-1/2/7/9, L.121-1/2/4, L.122-1 à 12, L.122-5, L.122-6/-6-1, L.122-7, L.123-1/2/3/4, L.131-1 à 8, L.131-3, L.132-36+)
- Pour chaque article : libellé + résumé 2-3 lignes + skill consommateur
- Articles CPI Livre III : L.341-1 (sui generis), L.342-5 (durée 15 ans)
- Articles Code travail pertinents : L.4111-1 et L.1221-1 (lien subordination)

Create `plugins/hacienda-propriete-intellectuelle/skills/qualification-oeuvre/references/jurisprudence-originalite.md` (~100-130 lignes) :
- Cour de cass. 1re civ. 7 mars 1986 (Pachot) : critère originalité logiciel
- CJUE Infopaq C-5/08 (2009) : reformulation "création intellectuelle propre à son auteur"
- CJUE Painer C-145/10 (2011) : photographie originale même documentaire
- CJUE BSA C-393/09 (2010) : interface graphique non protégée par droit auteur logiciel
- TGI Paris 28 mars 2007 : Free vs Welte (GPL applicable en droit FR)
- TGI Paris 13 fév 2018 : précédent NFT (à vérifier)
- Exemples œuvres avec/sans originalité par secteur (édition, design, musique, photo, audiovisuel, multimedia)
- Note : citations à vérifier Légifrance / EUR-Lex / Base jurisprudence Cour de cass avant transmission

Commit: `docs(plugin-pi): références articles CPI droit auteur + jurisprudence originalité`

---

## Phase 2 — Skill `logiciels-pi`

8 sous-tâches.

### Task 2.1: Frontmatter + garde-fou + Examples + reformulation
Create `plugins/hacienda-propriete-intellectuelle/skills/logiciels-pi/SKILL.md`. Frontmatter cf. spec §5.1. Garde-fou loud (analyse régime ≠ rédaction contractuelle ; L.113-9 régime dérogatoire INVERSE du droit commun → source erreurs récurrentes startups SaaS). 3 Examples. Reformulation longue.
Commit: `feat(plugin-pi): logiciels-pi — frontmatter + garde-fou`

### Task 2.2: Charger profil + Intake (5 questions)
Section profil : rôle, secteurs (SaaS B2B/B2C / open source / éditeur / agence dev / fintech / e-commerce). Mode provisoire.
Intake 5 questions : nom projet, contexte développement (salariés / prestataires externes / mixte / open source community), statut (initial / extension / fork / dérivation), type utilisation (interne / propriétaire / SaaS / open source / dual), dépendances open source connues.
Commit: `feat(plugin-pi): logiciels-pi — chargement profil + intake`

### Task 2.3: Étape 1 — Titularité initiale L.113-9 régime dérogatoire
Section règle L.113-9 verbatim + conditions cumulatives (salarié + fonctions/instructions + pas convention contraire).
Cas analysés : salarié dans fonctions / salarié hors fonctions / prestataire externe (cession écrite obligatoire) / stagiaire / contributeur open source bénévole.
2 erreurs fréquentes détaillées :
- Startup SaaS : CTO co-fondateur dev MVP avant contrat → titulaire personnel → risque DD pré-levée
- Agence dev : "code livré = propriété client" → faux par défaut, cession écrite contrat prestation obligatoire
Commit: `feat(plugin-pi): logiciels-pi — titularité L.113-9 régime dérogatoire`

### Task 2.4: Étape 2 — Droit d'utilisation L.122-6 + exceptions L.122-6-1
Section droit utilisation L.122-6 : reproduction permanente/provisoire (téléchargement, installation, exécution RAM), adaptation/traduction/transformation, distribution public.
Section exceptions L.122-6-1 : copie sauvegarde (1), test utilisateur légitime, décompilation interopérabilité (strictement encadrée), correction erreurs.
Exceptions d'ordre public → clauses contractuelles contraires nulles.
Commit: `feat(plugin-pi): logiciels-pi — droit utilisation L.122-6 + exceptions`

### Task 2.5: Étape 3 + 4 — Typologie licences + Compatibilité
Section typologie 4 catégories : permissives (MIT/BSD/Apache/ISC), copyleft fort (GPL v2/v3/AGPL v3), copyleft faible (LGPL/MPL/EPL), spécifiques (Creative Commons + custom).
Section compatibilité — matrices simplifiées :
- MIT + propriétaire : ✅
- GPL + propriétaire : ❌ contamination virale
- LGPL + propriétaire (liaison dynamique) : ✅
- LGPL + propriétaire (liaison statique) : ⚠️ contesté
- AGPL + SaaS propriétaire : ❌ (utilisation serveur = distribution)
Recommandations cabinet : whitelist permissives, validation case par case LGPL, blacklist GPL/AGPL (sauf isolation).
Référence : `references/licences-open-source.md`.
Commit: `feat(plugin-pi): logiciels-pi — typologie licences + compatibilité`

### Task 2.6: Étape 5 + 6 — SaaS / Bases données + Recommandations situation
Section SaaS : code serveur soumis L.122-6, AGPL piégeuse (serveur = distribution).
Section bases de données : double protection (droit auteur structure + sui generis L.341-1 investissement), durée sui generis 15 ans L.342-5 renouvelable.
Section recommandations 4 situations : startup early stage dev internes / agence dev / projet open source à publier (CLA obligatoire) / SaaS dépendances mixed (audit SBOM via SCA).
Format de sortie template Markdown (calque qualification-oeuvre adapté logiciel).
Commit: `feat(plugin-pi): logiciels-pi — SaaS + bases données + recommandations`

### Task 2.7: Gate non-juriste + Emplacement + Ne fait pas + Ton
Gate non-juriste : brief avocat spécialisé tech (régime + risques licences + recommandations + 3 questions).
Emplacement : `~/.claude/plugins/config/.../outputs/logiciels-pi-<projet-slug>-YYYY-MM-DD.md`.
"Ne fait pas" : rédiger cession (= V4.1), rédiger licence (= V4.1), scanner dépendances (= outils SCA + `revue-open-source` v0.1), évaluer contrefaçon (= V4.2), gérer brevet logiciel, négocier licence commerciale.
Ton : technique, pédagogique (régime complexe et mal connu).
Commit: `feat(plugin-pi): logiciels-pi — gate + ne fait pas + ton`

### Task 2.8: Références `regime-logiciel-cpi.md` + `licences-open-source.md`

Create `plugins/hacienda-propriete-intellectuelle/skills/logiciels-pi/references/regime-logiciel-cpi.md` (~100-130 lignes) :
- L.113-9 verbatim + commentaires
- L.122-6 / L.122-6-1 / L.122-6-2 droit utilisation + exceptions
- L.331-1 et suiv. (mesures techniques de protection)
- Jurisprudence : Cour de cass. com. 30 mars 2010 (interface utilisateur), Cour de cass. com. 17 mars 2015 (suffisance description logiciel), CJUE BSA C-393/09
- Distinction logiciel "stricto sensu" vs interface utilisateur (BSA) vs algorithme (en tant que tel exclu de brevetabilité L.611-10 mais protégé par droit auteur)
- Note : pas de brevet logiciel pur en France (≠ USA "software patent")
- Lien `qualification-oeuvre` (régime général) et `logiciels-pi` (cas particulier)

Create `plugins/hacienda-propriete-intellectuelle/skills/logiciels-pi/references/licences-open-source.md` (~130-170 lignes) :
- Matrices compatibilité détaillées par paire de licences (15+ licences populaires)
- Pour chaque licence : permissions / conditions / limitations
- Risques typiques par licence (contamination, obligation source, attribution, patent grant)
- Outils SCA recommandés : Snyk, FOSSA, Black Duck, GitHub Dependabot, OWASP Dependency-Check
- Modèle CLA (Contributor License Agreement) — référence aux modèles Apache CLA, FSF CA, etc.
- Politique cabinet type : whitelist / validation / blacklist
- Jurisprudence open source FR : TGI Paris 28 mars 2007 Free vs Welte, TGI Paris 16 sept 2009 Edu4 vs AFPA (GPL applicable contrats commerciaux)

Commit: `docs(plugin-pi): références régime logiciel CPI + licences open source`

---

## Phase 3 — Patches plugin + bump + PR + merge

### Task 3.1: Patch CLAUDE.md — section Droit d'auteur (nouvelle)
Ajouter section "## Droit d'auteur" (nouvelle, placez logiquement après "## Brevets") :
```markdown
## Droit d'auteur

**Pratique droit d'auteur :** [A CONFIGURER — édition / audiovisuel / logiciel SaaS / design / mode / publicité / multimedia / transversal]
**Posture conseil :** [A CONFIGURER — préventif (avant exploitation) / réactif (sur contestation) / contentieux (action en cours)]
**Position défaut cession auteur de commande :** [A CONFIGURER — cession totale étendue 70 ans / cession limitée par durée+territoire+médias / case par case]
**Position défaut clauses droit moral :** [A CONFIGURER — adaptation autorisée signaler / modifications soumises validation / strictement préservé]
**Politique logiciel L.113-9 :** [A CONFIGURER — mention contrat travail systématique / vérification rétroactive co-fondateurs / cession freelance contrat type]
**Politique licences open source :** [A CONFIGURER — whitelist permissives (MIT/BSD/Apache) seulement / validation case par case LGPL/MPL / interdiction GPL/AGPL sauf isolation]
**Approbateur cession droits :** [A CONFIGURER — avocat seul / avocat + Direction marketing / avocat + GC]
**Approbateur licence logiciel :** [A CONFIGURER — Direction tech + avocat / juriste interne + avocat externe]
```
`npm run branding:check`.
Commit: `feat(plugin-pi): CLAUDE.md template — section Droit d'auteur (V4.0)`

### Task 3.2: Patch `references/ressources-pi-fr.md` — section Droit d'auteur
Ajouter section "## Droit d'auteur — sources et juridictions" :
```markdown
## Droit d'auteur — sources et juridictions

| Source / juridiction | Domaine | URL / accès |
|---|---|---|
| CPI Livre I (L.111-1 à L.139) | Code source droit auteur | Légifrance (consulté via `hacienda-sources-officielles`) |
| CPI Livre III (L.341-1 à L.343-7) | Bases de données sui generis | Légifrance |
| Cour de cass. 1re ch. civile | Cassation droit auteur (sauf logiciel = ch. com.) | Légifrance + Judilibre |
| Cour de cass. com. | Logiciel + bases de données | Légifrance + Judilibre |
| CJUE (Cour de justice UE) | Harmonisation droit auteur européen | EUR-Lex (consulté via `hacienda-sources-officielles` Eurlex tools) |
| TJ Paris (3e ch. PI) | 1re instance droit auteur (compétence concurrente) | greffe TJ Paris |
| INPI (enveloppe Soleau) | Dépôt preuve de création | https://www.inpi.fr/enveloppe-soleau |
| Copyright.fr / huissier | Preuve de date alternative | privée |
| SACEM / SCAM / SACD / SDRM | Organismes de gestion collective | privée |

**Pas de formalité de dépôt en France** : le droit d'auteur naît automatiquement à la création (CPI L.111-1) sans formalité (≠ USA Copyright Office). Seule la **preuve de la date de création et de l'identité de l'auteur** est critique en litige.

**Préemption juridiction** :
- Action droit auteur classique : TJ Paris 3e ch. PI (compétence concurrente) ou TJ régional du défendeur
- Action logiciel commercial : Tribunal de commerce souvent privilégié
- Action OGC (SACEM, etc.) : selon clauses des statuts OGC

**Délai prescription** : 5 ans (Code civil art. 2224) à compter du jour où le titulaire a connu ou aurait dû connaître les faits.
```
Commit: `docs(plugin-pi): ressources — section Droit d'auteur (sources + juridictions)`

### Task 3.3: Bump version 0.8.0 → 0.9.0
- `plugin.json` : version 0.9.0, description étendue ("droit d'auteur : qualification œuvre + régime logiciel L.113-9 + licences open source"), keywords +droit-auteur +oeuvre +logiciel-pi +open-source-licences
- `mcp-server/package.json` : 0.9.0
- Rebuild MCP : `npm run build --workspace plugins/hacienda-propriete-intellectuelle/mcp-server`
Commit: `chore(plugin-pi): bump 0.8.0 → 0.9.0 (V4.0 droit d'auteur qualification)`

### Task 3.4: CHANGELOG + README v0.9.0
CHANGELOG section 0.9.0 au top :
```markdown
## 0.9.0 — 2026-05-16

### Ajouts — Droit d'auteur Qualification (démarrage bloc V4)
- Skill `qualification-oeuvre` (originalité L.111-1 + CJUE Infopaq, catégories L.112-2, titularité 7 cas, droits patrimoniaux vs moral L.121-1, durée 70 ans post mortem, ~650 lignes)
- Skill `logiciels-pi` (régime dérogatoire L.113-9 employeur titulaire, droit utilisation L.122-6, exceptions L.122-6-1, typologie licences open source + matrices compatibilité, ~600 lignes)
- Références : `articles-cpi-droit-auteur`, `jurisprudence-originalite`, `regime-logiciel-cpi`, `licences-open-source`
- Section CLAUDE.md template "Droit d'auteur" (8 placeholders pratique)
- Section `references/ressources-pi-fr.md` "Droit d'auteur — sources et juridictions"

### À venir (V4.1 / V4.2)
- V4.1 : `cession-droit-auteur` + `licence-droit-auteur` + `bases-de-donnees` (contrats)
- V4.2 : `contrefacon-droit-auteur` (enforcement)
- V4.3 : droits voisins (artistes-interprètes, producteurs) + SACEM/OGC + NFT/IA générative

### Distinction critique avec régime US
- Droit FR : pas de formalité (≠ US Copyright Office), droit moral central perpétuel inaliénable (vs VARA US limité), L.113-9 logiciel = inverse du US work-for-hire général
```
README "Quoi de neuf en V0.9" au top.
Commit: `docs(plugin-pi): CHANGELOG + README v0.9.0`

### Task 3.5: Vérifications + Push + PR + Merge
- `npm test` (269)
- `npm run typecheck`, `npm run build`, `npm run branding:check`, `git diff --check`
- `git push -u origin claude/pi-auteur-v4.0-qualification`
- `gh pr create --base main --title "PI droit d'auteur V4.0 : qualification œuvre + logiciels (démarrage bloc V4)" --body "..."` body adapté
- `gh pr merge <num> --merge --delete-branch=false`
Report PR URL + merge status + total commits V4.0.

---

## Self-review

- [x] Spec §4 → Phase 1 (8 tasks)
- [x] Spec §5 → Phase 2 (8 tasks)
- [x] Spec §3 + §6 → Phase 3 (5 tasks)
- [x] Pas de placeholder
- [x] Pas de TS modifié

---

**Plan complet.** Subagent-driven en 3 dispatches.
