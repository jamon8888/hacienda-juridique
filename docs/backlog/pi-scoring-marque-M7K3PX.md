# Sparring scoring — `recherche-anteriorite-marque` — Code M7K3PX

> ⚠️ **`[scoring auto-référent — méthodologie pré-D.0]`** — ce scoring a été produit
> avant formalisation du protocole blind ([`docs/methodology/sparring-scoring-protocol.md`](../methodology/sparring-scoring-protocol.md)).
> L'auteur des datasets, de la vérité terrain et de l'orchestration du scoring est le même
> acteur (Claude Code en session unique). Les scores sont à traiter comme
> **borne supérieure indicative**, pas comme mesure release-grade. Re-validation
> blind prévue en D.3 (cf. `docs/superpowers/plans/2026-06-01-hacienda-pi-vague-d-release-readiness.md`).

---

**Date** : 2026-05-31
**Skill évalué** : `recherche-anteriorite-marque` v2.0.0 (post-vague-B PI v0.20.0)
**Scénario** : `tests/datasets/v2-marque/scenario.md` — lancement SaaS « HACIENDA » classes 9/35/42 FR+EU+Madrid (US/UK/CA/AU/CH)
**Méthode** : sparring scoring K7M2PX adapté domaine marques

---

## Score pondéré

| Dimension | Poids | Score | Pondéré | Justification |
|---|---|---|---|---|
| Couverture du périmètre | 30 % | 88 % | 26,4 % | Étapes 4-6 + tableau étape 9 forcent le triage des 5 antériorités sur 3 territoires ; Sabel/Canon/Lloyd explicitement nommés étape 6. |
| Détection nuances métier | 30 % | 62 % | 18,6 % | Étape 8 motifs absolus L.711-2 couvre la distinctivité ; étape 7 couvre notoriété/watchlist ; mais aucune mention de Matratzen Concord T-6/01 ni de la mécanique « hit Madrid ≠ couverture Madrid entière ». |
| Qualité arbitrage subjectif | 20 % | 90 % | 18,0 % | Échelle canonique 🔴🟠🟡🟢 explicite, plancher cross-skill nommé, étape 10 verrouille la recommandation sur 7 valeurs actionnables dont `abandon-or-rename`. |
| Lisibilité partner-ready | 10 % | 92 % | 9,2 % | Étape 12 impose résumé exécutif + tableau coté + marques notoires + motifs absolus + arbre 5 options + note relecteur ; format prêt à signer. |
| Résistance aux pièges | 10 % | 85 % | 8,5 % | Disclaimer en tête + § « Ce skill ne fait pas » + ton de mandataire bloquent piège 1 (disponibilité) et piège 5 (faible distinctivité). Piège 3 (classes 31/32) non explicité. |
| **Total pondéré** | **100 %** | — | **80,7 %** | **Verdict 🟢 (juste au seuil)** |

---

## Justification détaillée par dimension

### Couverture du périmètre (poids 30 %, score 88 %)

Le SKILL.md force explicitement le passage sur les 3 registres (INPI Data, EUIPO TMview, OMPI Madrid Monitor — étape 4) et l'appréciation globale Sabel C-251/95 / Canon C-39/97 / Lloyd C-342/97 (étape 6, citée nommément avec numéros). L'étape 5 impose phonétique/visuelle/conceptuelle, ce qui capte « HACIENDA DIY » et « HACIENDA CLOUD » comme similarité dominante + descriptif. L'étape 9 (tableau coté) garantit la remontée des 5 antériorités. Petit défaut : Madrid Monitor est signalé « à vérifier » sans connecteur direct, ce qui peut faire passer l'IR 1 456 789 en `[à vérifier]` plutôt qu'en finding 🔴 actionnable.

### Détection nuances métier critiques (poids 30 %, score 62 %)

Points forts : étape 8 traite L.711-2 (distinctivité, descriptif, usuel) — un assistant suivant le skill caractérisera « HACIENDA » comme mot du langage courant. Étape 7 (notoriété L.713-3 + Intel C-252/07) cadre proprement la recommandation watchlist HACIENDA DIY. Gaps significatifs :
- **Matratzen Concord T-6/01 absent** — pourtant la vérité terrain le cite explicitement pour les équivalents étrangers, et « HACIENDA » est un mot espagnol par construction. Le skill ne pousse pas vers cette analyse.
- **Mécanique Madrid IR** — le skill n'enforce pas la règle « un hit Madrid couvre uniquement les désignations explicites » ; la dégradation 5→2 désignations utiles (CA+CH) n'est pas garantie.
- **Plancher de distinctivité faible** — le rappel « même un signe faiblement distinctif enregistré protège son territoire » manque dans la section motifs absolus.

### Qualité arbitrage subjectif (poids 20 %, score 90 %)

Échelle canonique 🔴🟠🟡🟢 reprise verbatim avec définitions adaptées au domaine marques. Étape 10 verrouille 7 recommandations actionnables incluant `abandon-or-rename` et `prepare-filing-with-limitation` — exactement les deux pistes que la vérité terrain attend. Le plancher cross-skill est rappelé explicitement avec la formule de dégradation. La cote 🔴 pour HACIENDA DIY et HACIENDA CLOUD tombe naturellement des étapes 4-6.

### Lisibilité partner-ready (poids 10 %, score 92 %)

Étape 12 fournit un template de sortie avec 9 blocs (résumé exécutif, couverture, tableau coté, notoriété, motifs absolus, recommandation, renvois, validation humaine, arbre 5 options). Note du relecteur unique en tête, mode silencieux pour livrables externes documenté, en-tête de confidentialité différencié par rôle. Un livrable produit selon ces étapes est directement signable.

### Résistance aux pièges (poids 10 %, score 85 %)

Le disclaimer d'ouverture (« ce skill ne conclut jamais qu'une marque est disponible ») + le § « Ce skill ne fait pas » bloquent piège 1. La section « Ton » et l'étape 8 traitent piège 5 (faible distinctivité). Piège 2 (territoires Madrid) partiellement couvert via § Reconnaissance des juridictions (CLAUDE.md) mais pas dans le SKILL lui-même. Piège 3 (suggérer classes 31/32) — aucune barrière explicite : un assistant zélé pourrait proposer un dépôt défensif hors business. Piège 4 (Matratzen Concord) — non couvert.

---

## Gaps DESIGN du skill identifiés (mini-backlog)

🟠 **Matratzen Concord T-6/01 absent** — le skill ne mentionne pas l'arrêt TPI qui traite explicitement le risque de confusion pour un signe constitué d'un mot étranger. Pour des signes comme « HACIENDA » (mot espagnol), ce cadre est central. À ajouter en étape 6 comme co-référence à Sabel/Canon/Lloyd.

🟠 **Mécanique Madrid IR sous-spécifiée** — l'étape 4 cite Madrid Monitor mais n'enforce pas la règle « hit IR ≠ couverture Madrid entière ». Ajouter une note explicite : « un IR identifié ne préempte que les désignations qu'il revendique ; recalculer le périmètre Madrid résiduel ».

🟡 **Garde-fou anti-pivot classes hors business** — rien n'empêche l'assistant de proposer un dépôt défensif classes 31/32 face à un blocage 9/35/42. Ajouter à « Ce skill ne fait pas » : « ne suggère pas de dépôt dans des classes étrangères au business pour contourner une antériorité ».

🟡 **Plancher distinctivité faible** — l'étape 8 traite la distinctivité du signe envisagé mais pas la règle « antériorité faiblement distinctive mais enregistrée reste opposable ». À ajouter étape 6 ou 9.

`[bonus]` Le skill enforce mieux que la vérité terrain la **séparation des modes** `--knockout` / `--full` / `--watchlist` et le **plancher cross-skill** (formule de dégradation explicite). Le verrouillage de la recommandation sur 7 valeurs actionnables est plus disciplinant que ce que la vérité terrain attendait.

## Recommandations pour vague ultérieure

1. Ajouter Matratzen Concord T-6/01 à l'étape 6 + à la liste `tags:` du frontmatter.
2. Ajouter sous l'étape 4 un sous-paragraphe « Madrid Monitor — granularité désignations » avec la règle de recalcul du périmètre résiduel.
3. Étendre « Ce skill ne fait pas » avec le garde-fou anti-pivot classes hors business + le rappel « antériorité faiblement distinctive reste opposable ».
