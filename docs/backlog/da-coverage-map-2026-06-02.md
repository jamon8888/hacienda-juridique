# Cartographie de couverture réelle — hacienda-droit-affaires v0.1.0

**Date** : 2026-06-02
**Méthode** : lecture de la surface réelle des 20 SKILL.md (description, modes, sections, hors-scope explicites, renvois), pas des seules descriptions.
**Objet** : matrice définitive « workflows d'un avocat corporate / droit des affaires FR » vs couverture Hacienda, gaps priorisés.
**Statut** : backlog — alimente la décision de vague d'ancrage DA et la spec du futur harness de scoring.

---

## 1. Classification des 20 skills

### 1.1 Infrastructure / composables (6) — pas des workflows métier

| Skill | Rôle | Modes |
|---|---|---|
| `check-pii` | Pré-flight PII pour tout skill | — |
| `verifier-citations` | Post-flight validation Légifrance/Judilibre | — |
| `entretien-demarrage` | Onboarding profil cabinet | `--redo`, `--check-integrations` |
| `consulter-digest` | Lecture du digest de veille (lecture seule) | filtres |
| `revue-tabulaire` | Brique atomique d'extraction multi-docs | — |
| `liste-de-points` | Issues list standardisée (composable) | standalone / composant |

### 1.2 Skills de workflow métier (14) — par cycle

| Cycle | Skills | Modes |
|---|---|---|
| **M&A** | `loi-term-sheet`, `due-diligence-dataroom`, `spa-review`, `gap-review`, `closing-checklist-fr` | LOI: review+draft ; les autres: review/analyse |
| **Vie sociale** | `constitution-societe`, `gouvernance-ag`, `pacte-associes-review` | constitution: comparer+draft ; AG: convocation+pv ; pacte: review |
| **Procédures collectives** | `declaration-creance` | — |
| **Contrats commerciaux** | `cgv-generator`, `reviser-contrat`, `reviser-nda`, `analyser-rupture-brutale` | cgv: draft ; les autres: review |
| **Financement** | `financement-startup` | comparer+review |

---

## 2. Couverture par cycle métier

### 2.1 Cycle M&A (cœur — persona « frère M&A »)

| Étape | Skill | Statut |
|---|---|---|
| LOI / term sheet | `loi-term-sheet` (review + **draft**) | ✅ solide |
| Due diligence data-room (7 thèmes) | `due-diligence-dataroom` + `revue-tabulaire` | ✅ solide |
| SPA / protocole de cession (revue) | `spa-review` | ✅ solide |
| **SPA — rédaction depuis zéro / markup redlines** | — | ❌ **gap mode** (spa-review est review-only) |
| GAP (revue) | `gap-review` | ✅ solide, FR-native |
| **GAP — rédaction depuis zéro** | — | ❌ gap mode |
| Closing checklist + formalités | `closing-checklist-fr` | ✅ solide |
| **Contrôle des concentrations (Aut. concurrence L.430)** | — *(renvoi explicite hors plugin)* | ❌ **gap, voir §4**|
| **Post-closing intégration / TSA** | — | ❌ gap |
| **Negotiation playbook M&A transverse** | — | ❌ gap |
| **Financement d'acquisition (dette, commitment letter, sûretés)** | — | ❌ gap |

La chaîne LOI → DD → SPA → GAP → closing est **cohérente et chaînée** (renvois croisés explicites entre skills). C'est la vraie force du plugin.

### 2.2 Cycle vie sociale

| Étape | Skill | Statut |
|---|---|---|
| Choix de forme + statuts | `constitution-societe` (comparer + draft) | ✅ |
| Convocation + PV d'assemblée | `gouvernance-ag` | ✅ |
| Pacte d'associés (revue) | `pacte-associes-review` | ✅ |
| **Modifications statutaires extraordinaires** (augmentation capital, changement OS) | — | 🟡 partiel (gouvernance-ag fait le PV, pas le process) |
| **Conventions réglementées L.225-38 / L.227-10** | — | ❌ gap |
| **Cession de parts/actions intra-sociétaire (agrément, préemption)** | — | ❌ gap |

### 2.3 Cycle procédures collectives (persona « ami ») — **le plus faible**

| Étape | Skill | Statut |
|---|---|---|
| Déclaration de créance L.622-24 | `declaration-creance` | ✅ |
| **Relevé de forclusion L.622-26** | — *(trame minimale seulement, « v1.1+ »)* | ❌ gap mode |
| **Prévention (mandat ad hoc, conciliation)** | — | ❌ gap |
| **Période d'observation / plan de redressement** | — | ❌ gap |
| **Plan de cession L.642-1** | — *(renvoi avocat restructuring)* | ❌ gap |
| **Liquidation judiciaire** | — | ❌ gap |
| **Action en responsabilité dirigeant L.651-2 / L.653-1** | — | ❌ gap |

**Un seul skill pour tout un cycle.** Le persona « ami procédures collectives » est quasi non servi.

### 2.4 Cycle contrats commerciaux

| Étape | Skill | Statut |
|---|---|---|
| CGV / CGU (génération) | `cgv-generator` | ✅ |
| NDA (triage) | `reviser-nda` | ✅ |
| Revue de contrat entrant | `reviser-contrat` | ✅ |
| Rupture brutale L.442-1 II (analyse) | `analyser-rupture-brutale` | ✅ |
| **Mise en demeure commerciale / sommation de payer** | — | ❌ **gap 🔴 récurrent** |
| **Markup / redlines structurés d'un contrat** | — | ❌ gap (sortie = issues list, pas document redliné) |

---

## 3. Constats transversaux

1. **Plugin review-lourd, draft-léger sur les docs M&A à forte valeur.** Draftables : term sheet, statuts, CGV, convocation/PV. Review-only : SPA, GAP, pacte. Or un avocat M&A *rédige* autant qu'il relit. Le `--draft` manque là où il rapporterait le plus.

2. **Aucune production de markup/redlines.** Harvey a ~15 tâches « draft-markup-of-X ». Côté Hacienda, la sortie de revue est une *issues list*, jamais un document redliné prêt à renvoyer à la contrepartie.

3. **Procédures collectives = le cycle le plus creux** (1 skill / 7 étapes). Décalage avec le poids du persona « ami ».

4. **Asymétrie mise-en-demeure PI vs DA.** `mise-en-demeure-pi` existe côté PI ; aucun équivalent commercial B2B côté DA. Trou visible et peu coûteux à combler (miroir).

5. **Les renvois fiscal / concurrence / réglementaire pointent vers des plugins qui n'existent pas.** `closing-checklist-fr`, `gap-review`, `constitution-societe` renvoient vers `hacienda-fiscal` et `hacienda-reglementaire`. **Or seuls 4 plugins existent** (droit-affaires, propriete-intellectuelle, recherche-documentaire, sources-officielles). Ces renvois sont du vapor : tant que ces plugins n'existent pas, la formulation doit dégrader proprement vers « consulter un expert-comptable / un conseil concurrence », pas vers une commande fantôme.

---

## 4. Gaps priorisés

Distinguer trois natures de gap :
- **[SKILL]** nouveau skill à créer
- **[MODE]** skill existant à étendre (ex: ajouter `--draft`)
- **[BORD]** frontière d'écosystème — décider si DA absorbe une version minimale ou si le renvoi reste humain

| # | Gap | Nature | Persona | Priorité | Effort |
|---|---|---|---|---|---|
| 1 | Mise en demeure commerciale / sommation de payer | [SKILL] | tout cabinet | 🔴 | ~1 skill (miroir `mise-en-demeure-pi`) |
| 2 | Relevé de forclusion L.622-26 (dossier complet) | [MODE] sur `declaration-creance` | ami | 🔴 | extension |
| 3 | Prévention difficultés (mandat ad hoc, conciliation) | [SKILL] | ami | 🔴 | ~1 skill |
| 4 | SPA `--draft` + markup/redlines | [MODE] sur `spa-review` | frère M&A | 🟠 | extension lourde |
| 5 | Post-closing intégration / TSA | [SKILL] | frère M&A | 🟠 | ~1 skill |
| 6 | Plan de redressement / plan de cession L.642-1 | [SKILL] | ami | 🟠 | ~1 skill |
| 7 | Conventions réglementées L.227-10 / L.225-38 | [SKILL] | vie sociale | 🟡 | ~1 skill |
| 8 | Cession de parts intra-sociétaire (agrément) | [SKILL] | vie sociale | 🟡 | ~1 skill |
| 9 | Contrôle des concentrations (Aut. concurrence L.430) | [BORD] | frère M&A | 🟡 | décision périmètre |
| 10 | Financement d'acquisition (dette / sûretés) | [SKILL] | frère M&A | 🟡 | ~1 skill |
| 11 | Negotiation playbook M&A transverse | [SKILL] | frère M&A | 🟡 | ~1 skill transverse |

---

## 5. Lecture stratégique

- **Le cœur M&A est professionnel** sur le chemin review (LOI→DD→SPA→GAP→closing). Ce n'est pas là qu'il faut investir d'abord.
- **Les deux trous qui font le plus mal pour un usage cabinet réel** : mise en demeure commerciale (#1, transversal, cheap) et la maigreur du cycle procédures collectives (#2-3-6).
- **Le levier qualité, pas couverture** : les 6 skills cœur n'ont aucun ancrage doctrinal vague-D-équivalent (cf. handoff §4.1). Combler les gaps de couverture sans ancrer le cœur = élargir une base non durcie.
- **Décision de bord à prendre** : DA absorbe-t-il un minimum fiscal/concurrence, ou assume-t-il le renvoi humain ? Tant que `hacienda-fiscal` / `hacienda-reglementaire` n'existent pas, les renvois actuels sont à reformuler.

### Ordre suggéré (à arbitrer selon persona prioritaire)

1. Ancrage doctrinal des 6 skills cœur (qualité) — chacun né avec ses criteria atomiques.
2. Gap #1 (mise en demeure commerciale) — cheap, transversal, miroir PI.
3. Gaps procédures collectives #2-3 si persona « ami » prioritaire ; SPA `--draft` #4 si persona « frère » prioritaire.
4. Reformuler les renvois vapor (#5 du §3) — correctif d'hygiène, non additif.
