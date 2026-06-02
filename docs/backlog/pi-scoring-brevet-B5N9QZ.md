# Sparring scoring — `preparation-depot-brevet` — Code B5N9QZ

> ⚠️ **`[scoring auto-référent — méthodologie pré-D.0]`** — ce scoring a été produit
> avant formalisation du protocole blind ([`docs/methodology/sparring-scoring-protocol.md`](../methodology/sparring-scoring-protocol.md)).
> L'auteur des datasets, de la vérité terrain et de l'orchestration du scoring est le même
> acteur (Claude Code en session unique). Les scores sont à traiter comme
> **borne supérieure indicative**, pas comme mesure release-grade. Re-validation
> blind prévue en D.3 (cf. `docs/superpowers/plans/2026-06-01-hacienda-pi-vague-d-release-readiness.md`).

---

**Date** : 2026-05-31
**Skill évalué** : `preparation-depot-brevet` v2.0.0 (post-vague-B PI v0.20.0)
**Scénario** : `tests/datasets/v2-brevet/scenario.md` — OCTOPUS LABS chiffrement homomorphe à seuil
**Méthode** : sparring scoring K7M2PX adapté domaine brevets
**Évaluateur** : critique design (non runtime)

---

## Score pondéré

| Dimension | Poids | Score | Pondéré | Justification courte |
|---|---|---|---|---|
| Couverture du périmètre | 30 % | 70 % | 21,0 % | Tous les axes structurels existent (divulgation, inventorship, prior art, voie de dépôt, brief), mais la profondeur juridique (Art. 54/55 CBE, L.611-8) reste implicite — le skill compte sur le bon sens du mandataire pour l'invoquer. |
| Détection nuances métier | 30 % | 55 % | 16,5 % | Le skill liste `disclosure_status: already-disclosed` mais ne nomme jamais le délai de grâce, ni l'asymétrie FR/US, ni L.611-8 (revendication 5 ans), ni Art. 4/22 PCT, ni le multi-claiming procédé/produit. La nuance est en dehors du gabarit. |
| Qualité arbitrage subjectif | 20 % | 70 % | 14,0 % | Échelle 🔴/🟠/🟡/🟢 explicite et mappée aux statuts. Routage `hold-due-to-disclosure-risk` + `fill-readiness-gaps` permet le verdict NON-prêt. Mais le plan d'action 3 sprints n'est pas demandé en sortie ; le skill suggère 2-4 actions concrètes, pas une séquence temporelle. |
| Lisibilité partner-ready | 10 % | 75 % | 7,5 % | Contrat de sortie en 9 sections clair, garde-fou « préparation, pas dépôt » visible, note du relecteur héritée du CLAUDE.md. Brief de rédaction structuré. Reste générique : pas de modèle de revendication, pas de formulation type « delta divulgué vs non divulgué ». |
| Résistance aux pièges | 10 % | 65 % | 6,5 % | Garde-fous explicites : « pas d'opinion finale de brevetabilité », « divulgation déjà intervenue = blocage majeur visible », plancher de sévérité cross-skill. Mais aucune mention nominative du piège délai-de-grâce-FR-large-comme-US (le piège n°1 du scénario), ni rappel L.611-7 inventions de mission systématique. |
| **Total pondéré** | **100 %** | — | **65,5 %** | **Verdict 🟠 Élevé — exploitable mais sous-arme le mandataire sur la doctrine. Risque que la sortie soit formellement « bonne » et substantiellement insuffisante.** |

---

## Justification détaillée par dimension

### Couverture du périmètre — 70 %

Le contrat d'entrée V2 du skill expose `disclosure_status`, `inventorship_status`, `known_prior_art_status`, `territories_targeted` — donc les 5 findings critiques du scénario ont chacun une case où atterrir :

- divulgation ACM CCS 2024 → `disclosure_status: already-disclosed` → section 3 « Contrôle du risque de divulgation »
- co-titularité INRIA → `inventorship_status: contested-or-unclear` → section 2 « Contrôle inventeurs et titularité »
- prior art US 11,234,567 → section 5 « Architecture candidate des revendications » (points à ne pas sur-figer)
- arbitrage EP/PCT → section 8 « Priorité et voie de dépôt »
- inventeur Garnier → section 2

**Mais** : aucune des cinq sections n'oblige à citer le texte juridique applicable (Art. 54/55 CBE, Art. L.611-11/-13/-8 CPI, Art. 4/22 PCT). La section 2 mentionne « points de vigilance sur L.611-7, cessions ou chaîne de droits » mais omet L.611-8 (revendication de propriété 5 ans) et L.611-9 (mention nominative de l'inventeur). Un mandataire EQE peut combler ; un junior risque la coquille.

### Détection nuances métier — 55 %

C'est la dimension la plus faible. Le skill est un cadre **procédural** plus que doctrinal. Les nuances clés du scénario sont absentes du SKILL.md :

- **Délai de grâce CBE Art. 55 vs grâce US 1 an** : la mécanique « divulgation volontaire par inventeur = NON couverte par Art. 55 » n'apparaît nulle part. Le skill se contente de dire « la nouveauté peut être compromise ». C'est vrai mais insuffisamment opérationnel.
- **L.611-8 CPI — action en revendication 5 ans** : pas mentionné. Le skill parle de « chaîne de droits » sans nommer la prescription.
- **PCT Art. 4 (gel 12 mois)** et **Art. 22 (entrée nationale 30 mois)** : pas explicités. La voie `pct` est listée sans rappel de ces deux ancrages temporels.
- **Multi-claiming procédé/produit/système** : section 5 mentionne « sous-combinaisons plausibles » mais ne suggère pas la matrice procédé × produit × système.
- **L.611-7 inventions de mission** : présent en section 2 mais sans rappel de la vérification documentaire (contrats de travail) — le skill ne demande pas la pièce.

Le risque design : la sortie sera structurellement conforme et substantiellement creuse.

### Qualité arbitrage subjectif — 70 %

L'échelle canonique 🔴/🟠/🟡/🟢 est définie en clair, et le mapping vers `readiness_status` est explicite. La règle « si `disclosure_status = already-disclosed`, le skill doit faire remonter un blocage majeur » force le 🔴 attendu. Le plancher cross-skill empêche de dégrader silencieusement une cote amont.

Manquements :

- Le routage « next step » liste 8 valeurs (`prepare-drafting-brief`, `hold-due-to-disclosure-risk`, etc.) mais n'autorise pas la combinaison (le scénario réclame `fill-readiness-gaps` ET `hold-due-to-disclosure-risk` simultanément — divulgation + INRIA).
- Pas de structure « plan d'action multi-sprints » ; le skill demande 2-4 actions concrètes, sans temporalité. Le scénario réclame une séquence 3 sprints calibrée temps.
- Pas d'exigence d'estimer le coût/risque d'un dépôt prématuré vs régularisation INRIA (arbitrage business du scénario).

### Lisibilité partner-ready — 75 %

Le contrat de sortie est structuré et lisible. La note du relecteur (héritée du CLAUDE.md PI) tient le cap. L'arbre de décision 5 options et la « question hors checklist » apportent une couche partner-ready.

Manquements :

- Aucun template de revendication indépendante candidate (« procédé de [X] caractérisé en ce que [Y] »). Le mandataire doit improviser.
- Pas de format imposé pour le delta « ce qui est divulgué vs ce qui ne l'est pas » — qui est pourtant le livrable opérationnel le plus utile dans ce scénario.
- Pas de checklist pré-dépôt (CBI/CPC, désignation inventeurs L.611-9, déclaration co-titularité).

### Résistance aux pièges — 65 %

Garde-fous explicites présents :

- « ne rend pas d'opinion finale de brevetabilité » → piège 4 du scénario couvert
- « divulgation déjà intervenue = blocage majeur » → piège 1 partiellement couvert (le skill bloque mais ne nomme pas l'asymétrie FR/US)
- « titularité ou inventorship incertaine reste un frein visible » → piège 2 partiellement couvert (frein visible mais pas « attendre la régularisation 2-4 semaines »)
- plancher cross-skill → piège 5 couvert

Manquements :

- **Piège n°1 (croire au délai de grâce FR large)** : non nommé. Le risque est qu'un junior rédige « le délai de grâce s'applique » sans déclencher d'alerte.
- **Piège 3 (oublier convention INRIA)** : le skill demande « inventeurs et déposant » mais ne demande pas explicitement « contrats / conventions tiers couvrant la période de gestation ». Lecture en diagonale possible.
- **Piège 6 (Brexit / UK post-validation EP)** : non couvert.

---

## Gaps DESIGN du skill identifiés (mini-backlog)

### 🔴 Bloquants design

1. **Absence du rappel doctrinal délai de grâce CBE Art. 55 vs grâce US 1 an**.
   *Fix* : ajouter dans la section « Contrôle du risque de divulgation » un sous-bloc obligatoire « Analyse du délai de grâce applicable » avec questions checklist (qui a divulgué ? abus tiers ? exposition internationale reconnue ?) et rappel explicite Art. 55 CBE / L.611-13 CPI ≠ 35 USC § 102(b)(1).

2. **Absence de L.611-8 CPI (action en revendication 5 ans)** dans le contrôle de titularité.
   *Fix* : enrichir section 2 par bullet « risque revendication propriété L.611-8 — prescription 5 ans post-publication » à intégrer dans tout `inventorship_status` non-`clear`.

3. **Pas d'exigence de pièces tiers (conventions de recherche, contrats consultants, NDA)**.
   *Fix* : ajouter au bloc faits minimum un champ `third_party_agreements_status` avec énumération (convention recherche académique, freelance, JV, consortium).

### 🟠 Élevés design

4. **Routage `next_step` mono-valeur empêche les blocages composites**.
   *Fix* : autoriser un tuple `[primary, secondary]` (ex. `hold-due-to-disclosure-risk` + `fill-readiness-gaps`).

5. **Pas de structure plan d'action multi-sprints**.
   *Fix* : ajouter section 10 optionnelle « Séquence opérationnelle » avec sprints datés quand `readiness_status ∈ {partial, blocked}`.

6. **Pas de rappel Art. 4 PCT (12 mois) et Art. 22 PCT (30 mois)** dans la voie `pct`.
   *Fix* : enrichir section 8 par sous-bloc temporel avec ancrages CBE/PCT/RMUE.

7. **Pas de template revendication indépendante** + matrice multi-claiming procédé/produit/système.
   *Fix* : ajouter à `references/preparation-depot-brevet-routing-and-output.md` un mini-pattern.

### 🟡 Moyens design

8. **L.611-7 inventions de mission présent mais sans demande de pièce** (contrats de travail).
   *Fix* : pousser une question d'intake « contrats de travail des inventeurs salariés vérifiés ? ».

9. **Brexit / UK post-validation EP non couvert** pour les voies `ep` et `sequenced`.

10. **Pas de checklist pré-dépôt formelle** (CBI/CPC, L.611-9 mention nominative inventeur, formulaire 1001 INPI).

### `[bonus]`

11. Intégration avec `recherche-anteriorite-brevet` pour réinjecter un rapport d'antériorité existant comme entrée typée plutôt qu'à reformuler à la main.

12. Heuristique « delta divulgué vs non divulgué » formalisée comme livrable (tableau à 2 colonnes : caractéristique technique × statut divulgation).

---

## Recommandations pour vague ultérieure

- **Vague C priorité 1** : intégrer les 3 gaps 🔴 (délai de grâce CBE, L.611-8, pièces tiers) directement dans SKILL.md — pas dans une référence externe. Ce sont des doctrines structurantes que le skill doit invoquer nominativement.
- **Vague C priorité 2** : refactoriser le routage `next_step` en tuple pour gérer les blocages composites (cas le plus fréquent en pratique startup).
- **Vague D** : enrichir `references/preparation-depot-brevet-routing-and-output.md` avec les templates revendication et la matrice multi-claiming.
- **Mesure d'impact** : rejouer ce scénario après chaque vague et viser ≥ 80 % global avant publication v2.1.

---

**Verdict final** : 🟠 **65,5 %** — le skill est un échafaudage procédural solide mais sous-armé doctrinalement. Un mandataire EQE expérimenté (comme Sarah Bernard dans le scénario) comblera les trous ; un profil moins senior produira une sortie creuse qui passe le contrat de format. Le risque design n'est pas un faux positif, c'est un **faux négatif silencieux** sur la doctrine délai de grâce.
