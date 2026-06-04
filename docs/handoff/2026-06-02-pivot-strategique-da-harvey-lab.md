# Pivot stratégique — DA priorité + Harvey LAB intégration

**Date** : 2026-06-02
**Audience** : associé Hacienda
**Objet** : re-prioriser les 4-8 prochaines semaines après livraison PI v0.21.0 (vague D.1)
**Statut** : décision à prendre

---

## 1. Où on en est

### Acquis solides (PI)

| Plugin | Version | Acquis |
|---|---|---|
| `hacienda-propriete-intellectuelle` | **v0.21.0** | 6 skills cœur durcis doctrinalement (vague D.1), protocole blind D.0 inscrit dans `main`, helper script Codex opérationnel, 39 SKILL.md avec frontmatter complet + échelle 🔴🟠🟡🟢 + pré-flight `check-pii` + post-flight `verifier-citations` |
| `hacienda-droit-affaires` | **v0.1.0** | Squelette V2 livré, 20 skills + 4 agents, **aucun ancrage doctrinal équivalent vague D**, aucun scoring blind |
| `hacienda-sources-officielles` | v0.1.0 | Stable, support transverse Légifrance / Judilibre / Eur-Lex / Pappers / BODACC |

**Sparring scoring PI vague C** : 6 rapports marqués `[scoring auto-référent]` (moyenne 69,6 % — borne supérieure indicative, pas release-grade). Diagnostic : squelette procédural correct, contenu doctrinal sous-spécifié. Comblé partiellement par vague D.1 sur 6 skills cœur.

### Coût restant pour finir vague D PI complète

| Sous-vague | Effort | Valeur ajoutée marginale |
|---|---|---|
| D.2 — audit blind 29 skills restants | ~30-40 h manip + ~12-22 h Codex GPT-5.5 HIGH | Faible vs D.1 — couvre les skills moins utilisés |
| D.3 — re-scoring blind 6 skills D.1 | ~10-15 h + ~6-10 h Codex | Validation chiffrée externe du gain D.1 (~82 % ciblé vs 69,6 % auto-référent) |
| D.4 — cleanup release v1.0.0 | ~6 h | Signal release marketing |
| **Total restant vague D PI** | **~45-60 h** | À pondérer contre coût d'opportunité |

---

## 2. Constat — D.1 a couvert le 80/20

La vague D.1 a ancré doctrinalement les **6 skills PI les plus utilisés** (`contentieux-pi`, `preparation-depot-brevet`, `cession-droit-auteur`, `revue-open-source`, `recherche-anteriorite-marque`, `depot-dessin-modele`).

Les **27 autres skills PI** restent au niveau post-vague-B :
- Squelette V2 complet (sections canoniques, modes courts, échelle, pré-flight check-pii).
- Doctrine ambiante non explicitement ancrée dans les SKILL.md.
- Volume d'usage attendu plus faible (skills de niche : CCP, droits voisins OGC, qualification-oeuvre, bases-de-donnees, etc.).

**Hypothèse de travail** : finir D.2 sur 29 skills à risque résiduel limité = mauvais ROI. Mieux vaut redéployer les ~45-60 h vers le plugin DA qui n'a eu **aucun équivalent vague A/B/C/D**.

---

## 3. Décision opérationnelle PI proposée

Garder **3-4 cibles D.2 PI à haut volume d'usage**, le reste reste backlog opportuniste :

| Skill | Justification |
|---|---|
| `audit-pi-ma` | Audit M&A multi-actifs — usage transverse avec DA |
| `contrats-pi` | Contrats PI autonomes (licence, cession, R&D, transfert tech, MTA, NDA) — haut volume |
| `saisie-contrefacon` | Procédure judiciaire critique — risque procès abusif si mal cadrée |
| `mise-en-demeure-pi` | ✅ **déjà fait** — rapport scoring D.2 livré |

Puis bump **PI v0.21.0 → v1.0.0** comme signal release. Le reste des 27 skills D.2 = backlog opportuniste.

---

## 4. DA — ce qu'il reste à auditer

### 4.1 Axe doctrinal (équivalent vague D.1 PI)

Aucun ancrage doctrinal vague D-équivalent n'a été fait sur DA. Les skills `spa-review` et `gap-review` ont eu un scoring K7M2PX/R4VN9W historiquement mais **pré-protocole D.0** (donc `[scoring auto-référent]`).

**6 skills DA cœur métier à auditer en priorité** :

| Skill | Doctrine probablement sous-spécifiée |
|---|---|
| `spa-review` | art. 1240 C.civ procès abusif, jurisprudence MAC, garantie d'éviction art. 1626 C.civ |
| `gap-review` | TTBER UE 316/2014 si licence-back, art. 1626/1641 C.civ, plafonds usuels par taille deal |
| `declaration-creance` | délais L.622-24 (2 mois publication BODACC + 4 mois ressortissants), restauration L.622-26, bordereau d'admission L.624-2 |
| `reviser-contrat` | L.442-1 II rupture brutale, clauses sensibles transversales (limitation responsabilité 1231-1, pénalité 1231-5, non-concurrence avec contrepartie) |
| `pacte-associes-review` | clauses d'agrément, tag/drag-along, anti-dilution, leaver clauses (good/bad/early), exit waterfall |
| `analyser-rupture-brutale` | L.442-1 II préavis usuel, jurisprudence sur durée relation, exceptions (force majeure, faute grave) |

### 4.2 Axe UX — workflows manquants (pattern `spa-review`)

Le pattern `spa-review` : persona M&A direct (frère cabinet) a identifié que la SPA review n'était **pas bien servie** par `reviser-contrat`. Création d'un skill dédié `spa-review` a comblé le gap.

**Application du même pattern à DA** — cartographier les workflows métier et identifier les gaps :

#### Cycle M&A complet (priorité haute — frère M&A)

| Étape | Skill | Statut |
|---|---|---|
| LOI / Term Sheet | `loi-term-sheet` | ✅ |
| Due Diligence | `due-diligence-dataroom` | ✅ |
| SPA | `spa-review` | ✅ |
| GAP | `gap-review` | ✅ |
| Closing | `closing-checklist-fr` | ✅ |
| **Post-closing intégration** (consolidation comptable, harmonisation contrats fournisseurs, employés clés, IT) | — | ❌ **gap** |
| **Negotiation playbook M&A** transverse (jeu côté acquéreur/cédant, concessions calibrées, escalade) | — | ❌ **gap** |

#### Cycle vie sociale

| Étape | Skill | Statut |
|---|---|---|
| Création | `constitution-societe` | ✅ |
| AGO | `gouvernance-ag` | ✅ |
| Pacte | `pacte-associes-review` | ✅ |
| **Modifications statutaires extraordinaires** (changement OS, augmentation capital, gouvernance) | — | ❌ partiel |
| **Conventions réglementées L.225-38+ / L.227-10** | — | ❌ **gap** |
| **Cessions parts/actions intra-societaires** (agrément, préemption) | — | ❌ **gap** |

#### Cycle procédures collectives (priorité haute — ami procédures collectives)

| Étape | Skill | Statut |
|---|---|---|
| Déclaration créance | `declaration-creance` | ✅ |
| **Prévention difficultés** (mandat ad hoc, conciliation) | — | ❌ **gap** |
| **Période d'observation / plan de redressement** | — | ❌ **gap** |
| **Cession d'entreprise en procédure** (offre, audience, ordonnance) | — | ❌ **gap** |
| **Liquidation judiciaire** (déroulement, contestation) | — | ❌ **gap** |
| **Action en responsabilité dirigeant** (L.651-2 insuffisance actif, L.653-1 sanctions) | — | ❌ **gap** |

#### Cycle contrats commerciaux

| Étape | Skill | Statut |
|---|---|---|
| CGV | `cgv-generator` | ✅ |
| NDA | `reviser-nda` | ✅ |
| Revue contrat | `reviser-contrat` | ✅ |
| Rupture brutale | `analyser-rupture-brutale` | ✅ |
| **Mise en demeure commerciale** (équivalent `mise-en-demeure-pi` mais B2B contrats) | — | ❌ **gap récurrent** |
| **Sommation de payer / actions en recouvrement** | — | ❌ **gap** |
| **Négociation contractuelle assistée** (concessions, redlines structurés) | — | ❌ **gap** |

### 4.3 Récap gaps workflow DA (priorisés)

| Gap workflow | Persona | Priorité | Effort skill |
|---|---|---|---|
| Mise en demeure commerciale | Tout cabinet droit affaires | 🔴 | ~1 skill |
| Prévention difficultés (mandat ad hoc, conciliation) | Ami procédures collectives | 🔴 | ~1 skill |
| Post-closing intégration M&A | Frère M&A cabinet | 🟠 | ~1 skill |
| Plan redressement / cession procédure | Ami procédures collectives | 🟠 | ~1 skill |
| Conventions réglementées L.227-10 | Cabinet vie sociale | 🟡 | ~1 skill |
| Cession parts intra-societaires (agrément) | Cabinet vie sociale | 🟡 | ~1 skill |
| Negotiation playbook M&A | Frère M&A | 🟡 | ~1 skill transverse |

**~7 skills DA potentiellement à créer**. Sélection finale guidée par le persona prioritaire.

---

## 5. Harvey LAB — option externe benchmark

### Contexte

Harvey AI vient de publier en open-source son benchmark **Legal Agent Benchmark (LAB)** : 1251 tasks réparties sur 24 practice areas, format `task.yml` + rubric.md + execution harness. Référence : `https://github.com/harveyai/harvey-labs`.

Adresse le même problème que notre protocole D.0 (évaluer la qualité d'agents juridiques sur des tâches réalistes) mais avec une **méthodologie mature et publique**, déjà validée par la communauté.

### Ce qui est exploitable directement

- **Méthodologie rubric-based scoring** : leurs rubriques structurent agent instructions + documents + grille de notation. Format proche de notre `scenario.md` + `ground-truth.md`, mais plus mature.
- **Format task.yml** : structure normalisée, exécutable via leur harness, score reproductible.
- **Validation publique** : si on score nos plugins contre une partie de leur dataset adaptée, on a un benchmark **comparable** à ce que d'autres font.
- **Crédibilité externe** : Harvey est la référence industrie post-août 2025. Position publique vs sparring scoring interne = niveau de crédibilité différent.

### Ce qui ne l'est pas directement

- **Jurisdiction** : Harvey LAB est très US-centric (24 practice areas mais largement US, UK, common law). Articles cités = US Code / Delaware corporate law / UK Companies Act.
- **Adaptation FR non triviale** : remplacer Delaware par SAS/SARL, USPTO par INPI, UK Companies Act par C.com français demande un juriste FR senior pour valider les rubriques adaptées.
- **Risque faux référentiel** : si l'adaptation est mal faite, c'est pire que sparring interne.

### Stratégie d'adaptation recommandée

**Pilote — 5 tasks Harvey adaptées au droit français** (~15-20 h effort) :

1. Choisir 5 tasks Harvey dont le **squelette d'analyse** est transposable :
   - 1 M&A DD (vers `due-diligence-dataroom` / `audit-pi-ma`)
   - 1 SPA review (vers `spa-review`)
   - 1 contrat commercial (vers `reviser-contrat`)
   - 1 NDA (vers `reviser-nda`)
   - 1 trademark opposition (vers `analyse-opposition-marque`)
2. Pour chaque task : remplacer les références US par références FR équivalentes.
3. Adapter les documents fictifs (parties / SIREN / montants / juridictions).
4. Garder leur structure rubric mais traduire les expected findings en doctrine FR.
5. Faire tourner nos skills DA + PI sur ces 5 tasks adaptées.
6. Comparer nos sorties aux rubriques adaptées.

### Trois options d'intégration

**Option A — Harvey LAB en remplacement de D.3 PI** : skipper le re-scoring blind D.3 + tester les 6 skills D.1 contre 6 tasks Harvey FR-adapted. Externe > interne.

**Option B — Harvey LAB en complément ciblé** : faire D.3 minimum sur 2 skills critiques (contentieux + cession-droit-auteur), PLUS Harvey FR-adapted pile sur 4-6 workflows DA + PI les plus visibles.

**Option C — Harvey LAB comme méthodologie standard future** : remplacer définitivement notre protocole D.0 par adaptation du leur (leur format `task.yml` + rubric.md est ouvert et exécutable). Tout futur scoring suit Harvey, pas D.0.

---

## 6. Séquencement proposé sur 4-8 semaines

| Sprint | Sortie | Effort |
|---|---|---|
| **S1** (1 sem) | Terminer PI D.2 ciblé : `audit-pi-ma` + `contrats-pi` + `saisie-contrefacon`. Bump PI v0.21.0 → **v1.0.0**. | ~10 h |
| **S2** (1 sem) | Identifier 4-6 workflows DA critiques avec persona (frère M&A + ami procédures). Brainstorming guidé. | ~5 h |
| **S3-S4** (2 sem) | **DA vague A équivalent** : ancrage doctrinal sur 4-6 skills cœur DA + ajout 1-2 skills manquants identifiés en S2. Bump DA v0.1.0 → **v0.2.0**. | ~25-30 h |
| **S5** (1 sem) | Adapter 5 tasks Harvey LAB FR + faire tourner DA et PI dessus. Rapport public. | ~15-20 h |
| **S6** (1 sem) | Cleanup + DA **v0.5.0 stable** + paquet Cowork DA + handoff persona réel. | ~10 h |
| **Total** | **PI v1.0.0 + DA v0.5.0 stables, benchmark public Harvey** | **~65-85 h** |

**Versions livrables** :
- Fin S1 : PI v1.0.0 (release marketing-friendly).
- Fin S4 : DA v0.2.0 (rattrapage doctrinal).
- Fin S5 : Rapport benchmark Harvey FR-adapted (positionnement public).
- Fin S6 : DA v0.5.0 stable + paquet Cowork prêt à installer par un persona réel.

---

## 7. Questions à trancher avec l'associé

### Q1 — Persona prioritaire pour S2

Frère M&A cabinet **ou** ami procédures collectives **en premier** ?

Détermine les workflows à identifier d'abord (cycle M&A vs cycle procédures collectives). Impact direct sur les skills à créer en S3-S4.

### Q2 — Harvey LAB intégration

| Option | Avantage | Inconvénient |
|---|---|---|
| **A** Remplace D.3 PI | Externe > interne, coût comparable | Skipping D.3 = pas de validation chiffrée du gain D.1 |
| **B** Complément ciblé | Best of both worlds | Effort cumulé plus élevé |
| **C** Méthodologie future | Adopte standard industrie | Demande de revoir D.0 (effort méthodo) |

### Q3 — Personas réels en S6

Y a-t-il une **fenêtre disponible** avec frère M&A et/ou ami procédures collectives dans 4-6 semaines pour tester DA v0.5.0 en environnement réel ?

Si oui : S6 calé sur leur disponibilité.
Si non : S6 décale au moment du persona dispo.

### Q4 — Profondeur vs largeur (méta-question)

Préférence stratégique pour les 4-8 prochaines semaines :

| Option | Effort | Sortie |
|---|---|---|
| **Profondeur** : PI très polish + DA polish + benchmark | ~65-85 h | 2 plugins stables release-grade + position publique Harvey |
| **Largeur** : pivot vers un 4ème plugin (social, immobilier, fiscal) | similaire | 4 plugins en v0.1.0 mais aucun à v1.0.0 |

Détermine la dynamique commerciale (1-2 plugins très stables vs 4 plugins en chantier).

---

## 8. Recommandation neutre du planner

Sans connaître la roadmap business complète, mon avis :

**Profondeur > largeur sur ce cycle** : un plugin DA stable est plus exploitable commercialement qu'un 4ème plugin en gestation. Le benchmark Harvey LAB est un signal externe rare qui amplifie la valeur des 2 plugins stables.

**Option B (Harvey LAB en complément)** semble le meilleur compromis : D.3 reste minimum (2 skills critiques re-scorés blind), + 5 tasks Harvey FR-adapted donnent une position publique. Si l'effort Harvey s'avère plus lourd que prévu, repli sur option A possible.

**Persona prioritaire** : à arbitrer entre frère M&A (impact business — clients potentiels cabinets M&A) et ami procédures collectives (couverture juridique d'un cycle complet non encore servi par Hacienda).

---

## Annexes

- Plan vague D PI complet : `docs/superpowers/plans/2026-06-01-hacienda-pi-vague-d-release-readiness.md`
- Protocole blind sparring scoring : `docs/methodology/sparring-scoring-protocol.md`
- Backlog gap analysis PI vs DA initial : `docs/backlog/pi-vs-da-gap-analysis.md`
- Backlog vague C PI (gaps doctrinaux consolidés) : `docs/backlog/pi-content-improvements-vague-c.md`
- Harvey LAB : `https://github.com/harveyai/harvey-labs`
