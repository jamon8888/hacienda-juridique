# Hacienda PI — V2.1 Refus INPI + Invalidité — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development.

**Goal:** Livrer `analyse-refus-inpi` + `anteriorite-invalidite` + 4 références, dans le plugin `hacienda-propriete-intellectuelle` v0.7.0. Pure Markdown FR, pas de TS nouveau.

**Architecture:** Extension de main (post V1.1.2 + V2.0). Réutilise les 4 tools brevets V2.0 (`inpi_search_brevets`, `inpi_brevet_details`, `espacenet_search`, `espacenet_brevet_details`).

**Tech Stack:** Markdown FR. Aucune modification TS.

**Spec:** [docs/superpowers/specs/2026-05-16-hacienda-pi-brevets-v2.1-refus-invalidite-design.md](../specs/2026-05-16-hacienda-pi-brevets-v2.1-refus-invalidite-design.md)

**Total prévu :** ~18 commits, 3 phases.

---

## Phase 1 — Skill `analyse-refus-inpi`

Calque sur `tableau-contrefacon-brevet` V2.0 (structure analyse argumentaire) + `analyse-opposition-marque` V1.1.2 (bi-mode + calcul délai). 8 sous-tâches.

### Task 1.1: Frontmatter + garde-fou + Examples + reformulation
Create `plugins/hacienda-propriete-intellectuelle/skills/analyse-refus-inpi/SKILL.md`. Frontmatter cf. spec §4.1. Garde-fou loud mentionnant délais fermes INPI (~2-4 mois R.612-66) + OEB Règle 132 EPC (4 mois prorogeable). 3 Examples. Reformulation longue "ANALYSE ARGUMENTAIRE, PAS RÉPONSE OFFICIELLE".
Commit: `feat(plugin-pi): analyse-refus-inpi — frontmatter + garde-fou`

### Task 1.2: Chargement profil + Intake
Section "Charger le profil pratique" : rôle (avocat / mandataire EQE / non-juriste), juridictions inscrites (INPI/OEB), partenaire annuités, posture prosecution, approbateurs. Mode provisoire si `[A CONFIGURER]`.
Section "Intake" : numéro brevet (déclencher `inpi_brevet_details` ou `espacenet_brevet_details`), notification reçue (type + texte), délai restant (calcul auto sévérité 🔴/🟠/🟡), posture (défendre / accepter limitations / abandonner).
Commit: `feat(plugin-pi): analyse-refus-inpi — chargement profil + intake`

### Task 1.3: Classification des citations X/Y/A/E
Section table classification OEB (X destructrice nouveauté / Y combinaison activité inventive / A contexte / E antériorité relative Art. 54(3) CBE). Référence : `references/classification-citations-oeb.md`.
Commit: `feat(plugin-pi): analyse-refus-inpi — classification citations X/Y/A/E`

### Task 1.4: Analyse élément par élément + Stratégies amendement
Section mapping caractéristiques revendications × citations (matrice statut).
Section 4 stratégies amendement par revendication objectée :
- Option A : Limitation par incorporation (caractéristique dépendante → indépendante)
- Option B : Reformulation sans modification étendue (risqué, justifier interprétation)
- Option C : Abandon / repli sur dépendantes
- Option D : Continuation en demande divisionnaire (CPI L.612-4)
Pour chaque option : étendue résiduelle, risque, coût.
Référence : `references/strategies-amendement.md`.
Commit: `feat(plugin-pi): analyse-refus-inpi — analyse + stratégies amendement`

### Task 1.5: Argumentation problème-solution OEB + Délais
Section problème-solution OEB pour amendements activité inventive (state of the art le plus proche, caractéristiques distinctives, problème objectif, non-évidence homme du métier).
Section délais et procédure :
- INPI ~2-4 mois (R.612-66), prorogation 2 mois sur demande motivée
- OEB Règle 132 EPC : 4 mois standard, prorogation 2 mois, pas de réponse = réputée retirée Art. 94(4) EPC
Calcul automatique sévérité 🔴 <30j / 🟠 30-60j / 🟡 >60j.
Commit: `feat(plugin-pi): analyse-refus-inpi — problème-solution OEB + délais`

### Task 1.6: Format de sortie + projet de réponse
Format Markdown inline (quadruple fence). Sections : en-tête confidentialité, garde-fou, reviewer note (délai + sévérité), triage 🔴/🟠/🟡, brevet récap, notification analysée, classification citations (table), analyse élément par élément (matrice), stratégies amendement par revendication, argumentation problème-solution, **projet de réponse INPI/OEB structuré** (identification + dossier, réponse par citation et revendication, amendements proposés, demande finale), calendrier, "Une question hors checklist", "Que veux-tu faire ?" (Itérer / Escalader / Compléter / Diviser / Autre).
Commit: `feat(plugin-pi): analyse-refus-inpi — format sortie + projet réponse`

### Task 1.7: Gate non-juriste + Emplacement + Ne fait pas + Ton
Gate non-juriste : brief mandataire EQE (revendications + citations + stratégie amendement préliminaire + délai + 3 questions). Annuaires INPI mandataires + OEB Liste Mandataires Européens (EQE) + CNB.
Emplacement : `~/.claude/plugins/config/.../outputs/refus-inpi-<brevet>-YYYY-MM-DD.md`.
"Ce que ce skill NE fait PAS" : répondre officiellement INPI/OEB, rédiger revendications définitives, plaider audition orale OEB chambres recours, déposer divisionnaire formelle, calculer taxes, gérer recours administratif.
Ton : technique, précis, équilibré forces/faiblesses chaque stratégie.
Commit: `feat(plugin-pi): analyse-refus-inpi — gate + ne fait pas + ton`

### Task 1.8: Références `classification-citations-oeb.md` + `strategies-amendement.md`

Create `plugins/hacienda-propriete-intellectuelle/skills/analyse-refus-inpi/references/classification-citations-oeb.md` (~80-120 lignes) :
- Codes X/Y/A/E détaillés avec exemples concrets
- Distinction OEB vs INPI (alignés mais nuances pratiques)
- Citation pour antériorité relative E : Art. 54(3) CBE — pas d'application activité inventive
- Erreurs courantes : confondre X et Y (Y nécessite COMBINAISON), traiter A comme problématique
- Renvoi vers `recherche-anteriorite-brevet` V2.0 pour le côté offensif (recherche prior art)

Create `plugins/hacienda-propriete-intellectuelle/skills/analyse-refus-inpi/references/strategies-amendement.md` (~100-150 lignes) :
- Options A/B/C/D détaillées avec exemples par domaine technique (mécanique, chimie, logiciel embarqué)
- Garde-fou L.612-6 non-extension (support amendement dans description originale OBLIGATOIRE)
- Garde-fou Art. 123(2) EPC (équivalent OEB de L.612-6)
- Coûts indicatifs 2026 : amendement standard inclus, divisionnaire ~600€ FR / ~250€ OEB
- Précédent jurisprudentiel OEB sur amendements : G 1/93 (non-extension)
- Lien avec `preparation-depot-brevet` V2.0 (préventif) et `tableau-contrefacon-brevet` V2.0 (offensif)

Commit: `docs(plugin-pi): références classification citations OEB + stratégies amendement`

---

## Phase 2 — Skill `anteriorite-invalidite`

Workflow inédit, bi-mode `--attack`/`--defense`. 8 sous-tâches.

### Task 2.1: Frontmatter + garde-fou + Examples + reformulation
Create `plugins/hacienda-propriete-intellectuelle/skills/anteriorite-invalidite/SKILL.md`. Frontmatter cf. spec §5.1. Garde-fou loud (action nullité ratée = dépens CPC 696 + risque concurrence déloyale ; défense nullité ratée = condamnation L.615-7). 3 Examples (`--attack`, `--defense`, sans flag). Reformulation longue "PRÉPARATION ARGUMENTAIRE, PAS PROCÉDURE JUDICIAIRE".
Commit: `feat(plugin-pi): anteriorite-invalidite — frontmatter + garde-fou`

### Task 2.2: Chargement profil + Intake bi-mode
Section "Charger le profil" : rôle, posture, approbateurs, domaines techniques.
Section "Intake" 2 modes :
- `--attack` : numéro brevet cible, contexte (brevet bloque activité / frauduleux / barrière concurrentielle excessive), posture (nullité totale vs partielle), budget action (ciblé 1 motif vs étendu multi-motifs)
- `--defense` : numéro brevet cible (qu'on nous oppose), notre produit incriminé (link `tableau-contrefacon-brevet`), argumentaire contrefaçon adverse, stratégie (nullité + non-contrefaçon littérale + non-équivalence)
Commit: `feat(plugin-pi): anteriorite-invalidite — chargement profil + intake bi-mode`

### Task 2.3: Recherche art antérieur destructeur
Section recherche multi-sources :
- `espacenet_search` avec mots-clés + CIB + date pub < date priorité brevet cible
- `inpi_search_brevets` pour antériorités FR/EP
- Filtrer strict par date publication
- Classification trouvée : potentielles X (nouveauté) ou Y (activité inventive combinaison)
- Bucket "Aucune base interrogée" si pas de connecteur — recommandation recherche professionnelle (Espacenet + Google Patents V2.1.1 + NPL Google Scholar / IEEE)
Commit: `feat(plugin-pi): anteriorite-invalidite — recherche art antérieur destructeur`

### Task 2.4: Motifs de nullité L.613-25 (a/b/c/d/e)
Section motifs nullité avec table par branche :
- L.613-25 a) défaut brevetabilité (L.611-10 exclusions, L.611-11 nouveauté, L.611-15 application industrielle)
- L.613-25 b) défaut suffisance description (L.612-5)
- L.613-25 c) extension portée au-delà demande initiale (L.612-6)
- L.613-25 d) défaut unité invention (L.612-4)
- L.613-25 e) défaut qualité déposant (titularité)
Pour chaque motif : force 🟢/🟡/🔴, pièces requises, précédent jurisprudentiel.
Référence : `references/motifs-nullite-brevet.md`.
Commit: `feat(plugin-pi): anteriorite-invalidite — motifs nullité L.613-25`

### Task 2.5: Argumentation problème-solution inverse + prescription
Section "Argumentation problème-solution inverse" : démontrer que les caractéristiques du brevet attaqué étaient évidentes pour l'homme du métier (inverse de la défense en prosecution). Citer documents Y combinés (≥2). Anticiper défense du titulaire (effet technique inattendu, problème non posé).
Section "Prescription" :
- Action en nullité : **imprescriptible** tant que brevet en vigueur (CPI L.613-25)
- Défense en nullité dans action contrefaçon : valable tant que l'action en contrefaçon recevable (prescription 5 ans L.615-8)
- Sévérité délai pour `--defense` : audience TJ Paris 6-18 mois post-assignation
Commit: `feat(plugin-pi): anteriorite-invalidite — problème-solution inverse + prescription`

### Task 2.6: Format de sortie + projet écritures
Format Markdown inline (quadruple fence). Sections : en-tête confidentialité, garde-fou, reviewer note (mode, motifs, force), triage 🟢/🟡/🔴, brevet cible récap (revendications, déposant, date priorité, statut), art antérieur destructeur (table par doc), motifs nullité par branche (force/pièces/précédent), argumentation problème-solution inverse, **projet d'écritures** :
- Mode `--attack` : conclusions en nullité TJ Paris (compétence L.615-1)
- Mode `--defense` : conclusions de défense + demande reconventionnelle en nullité
Calendrier procédural (TJ Paris ~12-24 mois + recours possible Cour appel Paris L.411-4). "Une question hors checklist". "Que veux-tu faire ?" (Itérer / Escalader / Compléter recherche / Négocier transaction / Autre).
Commit: `feat(plugin-pi): anteriorite-invalidite — format sortie + projet écritures`

### Task 2.7: Gate non-juriste + Emplacement + Ne fait pas + Ton
Gate non-juriste : brief mandataire EQE ou avocat spécialisé (brevet + motifs + art antérieur + force + 3 questions critiques).
Emplacement : `~/.claude/plugins/config/.../outputs/invalidite-<brevet>-YYYY-MM-DD.md`.
"Ce que ce skill NE fait PAS" : former l'action TJ Paris (démarche formelle avocat habilité), plaider audience, négocier transaction (licence/rachat/coexistence), évaluer dommages-intérêts (avocat), gérer recours Cour d'appel / Cour de cass.
Ton : technique, rigoureux, équilibré (forces du brevet attaqué AVANT faiblesses — anticiper défense titulaire).
Commit: `feat(plugin-pi): anteriorite-invalidite — gate + ne fait pas + ton`

### Task 2.8: Références `motifs-nullite-brevet.md` + `procedure-nullite-tj-paris.md`

Create `plugins/hacienda-propriete-intellectuelle/skills/anteriorite-invalidite/references/motifs-nullite-brevet.md` (~120-150 lignes) :
- Détail des 5 motifs L.613-25 avec exemples concrets
- Jurisprudence TJ Paris brevets récente (2023-2025) : ~3 décisions par motif
- Cour de cass. com. brevets pertinentes
- Articles CBE équivalents : Art. 54/56/83/123(2)/(3) EPC
- Erreurs courantes : confondre nullité totale vs partielle, oublier la défense reconventionnelle
- Lien `tableau-contrefacon-brevet` V2.0 (offensive contrefaçon) et `recherche-anteriorite-brevet` V2.0 (méthodologie recherche)

Create `plugins/hacienda-propriete-intellectuelle/skills/anteriorite-invalidite/references/procedure-nullite-tj-paris.md` (~100-130 lignes) :
- Compétence TJ Paris **exclusive** brevets (CPI L.615-1) — pas d'autres juridictions FR
- Procédure : assignation, échange écritures (conclusions + pièces), audience, jugement, recours
- Délais : assignation - audience 6-18 mois, jugement 1-3 mois post-audience, recours Cour appel Paris 1 mois
- Taxes : frais avocat (très variables), frais d'expertise technique (souvent ordonnée), dépens CPC art. 696
- Mode "défense" : demande reconventionnelle en nullité greffée sur l'action en contrefaçon adverse
- Conséquences décision : nullité totale = brevet effacé erga omnes / nullité partielle = revendications affectées seulement
- Recours : Cour d'appel Paris (effet suspensif), puis Cour de cass. com. (cassation sur points de droit)
- Précédent procédural : ordonnance JME (juge mise en état), tri-mensuel des dossiers brevets

Commit: `docs(plugin-pi): références motifs nullité brevet + procédure TJ Paris`

---

## Phase 3 — Patches plugin + bump + PR + merge

### Task 3.1: Patch CLAUDE.md — section Brevets enrichie
Ajouter dans la section "## Brevets" existante (V2.0) :
```markdown
**Posture refus INPI/OEB :** [A CONFIGURER — défense systématique / abandon rapide si coût > valeur]
**Posture nullité :** [A CONFIGURER — attaque préventive sur brevets bloquants / défense en contrefaçon uniquement]
**Délais clés réponse refus :** INPI ~2-4 mois (R.612-66) / OEB 4 mois prorogeable 2 mois (Règle 132 EPC)
**Approbateur réponse refus :** [A CONFIGURER — mandataire EQE seul / mandataire + GC]
**Approbateur action nullité :** [A CONFIGURER — avocat spécialisé brevets + GC + Direction R&D]
**Taxes indicatives 2026 :** divisionnaire ~600€ FR INPI / ~250€ OEB ; action nullité TJ Paris : frais avocat (variables, souvent > 30k€)
```
`npm run branding:check`.
Commit: `feat(plugin-pi): CLAUDE.md template — section Brevets enrichie (refus + nullité)`

### Task 3.2: Patch `references/ressources-pi-fr.md` — section Procédures brevets
Ajouter section "## Procédures brevets INPI / OEB / TJ Paris" : tables (dépôt, examen, réponse refus, divisionnaire, opposition OEB, nullité TJ Paris, recours) avec délais clés, taxes 2026, compétence.
Commit: `docs(plugin-pi): ressources — section Procédures brevets`

### Task 3.3: Bump version 0.6.0 → 0.7.0
- `plugin.json` : version 0.7.0, description étendue ("réponse refus + nullité"), keywords +refus +nullité +OEB
- `mcp-server/package.json` : 0.7.0
- Rebuild MCP : `npm run build --workspace plugins/hacienda-propriete-intellectuelle/mcp-server`
Commit: `chore(plugin-pi): bump 0.6.0 → 0.7.0 (V2.1 refus INPI + invalidité)`

### Task 3.4: CHANGELOG + README v0.7.0
CHANGELOG section 0.7.0 au top :
```markdown
## 0.7.0 — 2026-05-16

### Ajouts — Refus INPI + Invalidité brevets (workflow brevets défensif complet)
- Skill `analyse-refus-inpi` (analyse notifications INPI R.612-66 / OEB Règle 132 EPC, classification citations X/Y/A/E, stratégies amendement A/B/C/D, problème-solution OEB, projet de réponse FR/EN, ~600 lignes)
- Skill `anteriorite-invalidite` (argumentation nullité L.613-25, bi-mode `--attack`/`--defense`, recherche art antérieur destructeur, projet écritures TJ Paris, ~700 lignes)
- Références : `classification-citations-oeb`, `strategies-amendement`, `motifs-nullite-brevet`, `procedure-nullite-tj-paris`
- Section CLAUDE.md template "Brevets" enrichie (postures refus + nullité, délais clés, approbateurs)
- Section `references/ressources-pi-fr.md` "Procédures brevets INPI / OEB / TJ Paris" ajoutée

### Workflow brevets complet (V2.0 + V2.1)
- Recherche antériorité → Préparation dépôt → Réponse refus → Claim chart → Nullité défensive = **boucle fermée**

### À venir (V2.1.1 / V2.2)
- Connecteur Google Patents (complément Espacenet)
- `strategie-extension-internationale` (arbre EP/PCT/national)
- `revue-portefeuille-brevets` (réutilise dashboard HTML V1.1.1)
```
README "Quoi de neuf en V0.7" au top.
Commit: `docs(plugin-pi): CHANGELOG + README v0.7.0`

### Task 3.5: Vérifications + Push + PR + Merge
- `npm test` (269)
- `npm run typecheck`, `npm run build`, `npm run branding:check`, `git diff --check`
- `git push -u origin claude/pi-brevets-v2.1-refus-invalidite`
- `gh pr create --base main --title "PI brevets V2.1 : refus INPI + invalidité (workflow brevets défensif complet)" --body "..."` avec body adapté
- `gh pr merge <num> --merge --delete-branch=false`
Report PR URL + merge status + total commits V2.1.

---

## Self-review

- [x] Spec §4 → Phase 1 (8 tasks)
- [x] Spec §5 → Phase 2 (8 tasks)
- [x] Spec §3 + §6 + §7 → Phase 3 (5 tasks)
- [x] Pas de placeholder
- [x] Pas de TS modifié
- [x] Type consistency : skills appellent les 4 tools V2.0 inchangés

---

**Plan complet.** Subagent-driven en 3 dispatches : Phase 1 / Phase 2 / Phase 3.
